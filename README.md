# Circle.so Dynamic Translation Script

This project enables dynamic, in-place language translation of a Circle.so community website using OpenAI GPT (via a proxy API).

## 🎯 Goal

To allow users to:
- Select their preferred language (e.g. English, Dutch, Italian, Portuguese)
- View all site content translated into their selected language
- Write posts/comments in any language and have them translated for others

## 📁 Files

| File          | Description |
|---------------|-------------|
| `index.html`  | Contains the language switcher UI (HTML) to be injected into Circle.so Head Code |
| `translate.js`| Main JavaScript logic to detect visible text and translate it using a GPT-powered API proxy |
| `style.css`   | Optional stylesheet to style the switcher widget |
| `.nojekyll`   | Optional file to ensure GitHub Pages serves all files correctly |

Note: By placing a blank file named .nojekyll at the root of your GitHub repo, we tell GitHub Pages: ❌ “Do NOT run Jekyll on this repo. Just serve the files exactly as they are.”
This makes sure:
1. JS/CSS/HTML files aren't skipped or changed
2. Folder names like _scripts, _data work
3. You don’t get weird 404s for valid files

## 🌍 Usage

1. Enable GitHub Pages in this repo (`main` branch, root).
2. In Circle.so > Pages > Settings > Head Code, link to `index.html` for the language switcher.
3. In Circle.so > JavaScript Code, embed a script tag that loads `translate.js` from GitHub Pages.
4. Ensure you have a serverless proxy (e.g., on Vercel) that forwards translation prompts securely to the OpenAI API.

## ⚙️ Technologies

- 🧠 OpenAI GPT (via proxy)
- ⚙️ JavaScript (DOM text replacement)
- 🔒 Safe for Circle.so’s CSP (Content Security Policy)
- 🎯 Works with dynamic content like comments and threads

## 🧪 Status

This project is currently in development. Next step: setup of backend proxy (`/translate` endpoint) via Vercel.

---
Created by [NicPeer](https://github.com/NicPeer)
