import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    // Add React bindings as a plugin.
    .use(initReactI18next)
    // Initialize the i18next instance.
    .init({
        // Config options

        // Fallback locale used when a translation is
        // missing in the active locale. Again, use your
        // preferred locale here. 
        fallbackLng: "en",

        // Enables useful output in the browser’s
        // dev console.
        debug: true,

        // Normally, we want `escapeValue: true` as it
        // ensures that i18next escapes any code in
        // translation messages, safeguarding against
        // XSS (cross-site scripting) attacks. However,
        // React does this escaping itself, so we turn 
        // it off in i18next.
        interpolation: {
            escapeValue: false,
        },

        // Translation messages. Add any languages
        // you want here.
        resources: {
            // English
            en: {
                // `translation` is the default namespace.
                // More details about namespaces shortly.
                translation: {
                    hello_world: "Hello, World!",
                    count_messages: "{{count}} messages",
                    chatbot_title: "K!mpuls, the privacy-friendly chatbot of FH Südwestfalen",
                    system_welcome: "Hello, I'm K!mpuls, your university chatbot. How can I help you?",
                    new_conversation: "This is a New Conversation",
                    top_p_help: "Top_p is a parameter that controls the randomness in the model's output by limiting the token pool, specifying that only those tokens with a cumulative probability that adds up to the top_p value can be considered for selection.",
                    temperature_help: "Temperature is a parameter that controls the randomness in the model's output by scaling the logits before applying softmax.",
                    theme_help: "Select a color scheme for the user interface.",
                    language_help: "Select a language for the user interface.",
                    send_help: "Select a button for sending messages.",
                    fontsize_help: "Select the font size of the user interface.",
                    openai_model_help: "Select a model for AI support.",
                    custom_endpoint_desc: "If you don't want to use our proxy server, you can configure a different endpoint, e.g. api.openai.com",
                },
            },
            // German
            de: {
                translation: {
                    hello_world: "Hallo, Welt!",
                    chatbot_title: "K!mpuls, der datenschutzfreundliche Chatbot der FH Südwestfalen",
                    system_welcome: "Hallo, ich bin K!mpuls, Dein FH-Chatbot. Wie kann ich Dir helfen?",
                    "copy": "Kopieren",
                    "Enter something....": "Geben Sie etwas ein …",
                    "Remove Messages": "Nachrichten entfernen",
                    "Remove Message": "Nachricht entfernen",
                    "Search...": "Suche …",
                    count_messages_one: "Eine Nachricht",
                    count_messages_other: "{{count}} Nachrichten",
                    new_conversation: "Dies ist ein neues Gespräch",
                    "New Conversation": "Neues Gespräch",
                    "Start a new conversation to begin storing them locally.": "Beginnen Sie ein neues Gespräch. Die Nachrichten werden lokal gespeichert.",
                    top_p_help: "Top_p ist ein Parameter, der die Zufälligkeit in der Ausgabe des Modells steuert, indem der Token-Pool begrenzt wird und festgelegt wird, dass nur diejenigen Token mit einer kumulativen Wahrscheinlichkeit, die sich auf den top_p-Wert addiert, für die Auswahl in Betracht gezogen werden können.",
                    temperature_help: "Die Temperatur ist ein Parameter, der die Zufälligkeit in der Ausgabe des Modells steuert, indem die Logits skaliert werden, bevor die Softmax-Funktion angewendet wird. Eine höhere Temperatur führt zu zufälligeren Ausgaben.",
                    theme_help: "Wählen Sie ein Farbschema für die Benutzeroberfläche aus.",
                    language_help: "Wählen Sie eine Sprache für die Benutzeroberfläche aus.",
                    send_help: "Wählen Sie eine Taste für das Senden von Nachrichten aus.",
                    fontsize_help: "Wählen Sie die Schriftgröße der Benutzeroberfläche aus.",
                    openai_model_help: "Wählen Sie ein Modell für die KI-Unterstützung aus.",
                    custom_endpoint_desc: "Wenn Sie unseren Proxy-Server nicht verwenden möchten, können Sie einen anderen Endpunkt konfigurieren, z.B. api.openai.com",
                },
            },
        },
    });

export default i18n;