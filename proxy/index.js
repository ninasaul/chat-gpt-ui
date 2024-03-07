const express = require('express');
const httpProxy = require('http-proxy');
const cookieParser = require('cookie-parser');
const { Issuer, Strategy } = require('openid-client');
const jwt = require('jsonwebtoken');

const app = express();
const proxy = httpProxy.createProxyServer();

const PREFIX = '/api';
const CLIENT_ID = 'your_client_id';
const CLIENT_SECRET = 'your_client_secret';
const REDIRECT_URI = 'http://localhost:3000/callback';

app.use(express.json());
app.use(cookieParser());

let client;

app.get('/login', async (req, res) => {
    if (!client) {
        const issuer = await Issuer.discover('https://openid-provider-url');
        client = new issuer.Client({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uris: [REDIRECT_URI],
            response_types: ['code']
        });
    }

    const authorizationUrl = client.authorizationUrl({
        scope: 'openid profile email',
        redirect_uri: REDIRECT_URI
    });

    res.redirect(authorizationUrl);
});

app.get('/callback', async (req, res) => {
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(REDIRECT_URI, params, { code_verifier: client.code_verifier });

    const user = jwt.decode(tokenSet.id_token);
    const token = jwt.sign({ user }, 'your_secret_key');

    res.cookie('token', token);
    res.redirect('/dashboard');
});

app.use((req, res, next) => {
    const token = req.headers.authorization || req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

app.all(`${PREFIX}*`, (req, res) => {
    proxy.web(req, res, { target: 'http://api.example.com' });
});

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});