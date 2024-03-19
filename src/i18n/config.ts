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
                },
            },
        },
    });

export default i18n;