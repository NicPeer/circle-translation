const proxyURL = "https://gpt-translate-proxy.vercel.app/translate"; // replace with your own real endpoint
let selectedLang = "en";

// Wait until page is ready
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("languageSelect");
  if (!selector) return;
  selectedLang = selector.value;
  selector.addEventListener("change", () => {
    selectedLang = selector.value;
    translateVisibleText();
  });
  translateVisibleText();
});

// Collect visible text nodes
function getTextNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  let node;
  while (node = walker.nextNode()) {
    const text = node.nodeValue.trim();
    if (text && text.length < 400 && !node.parentElement.closest("#lang-switcher")) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Call GPT proxy to translate text
async function translateText(text, toLang) {
  const prompt = `Translate this to ${toLang}: ${text}`;
  const res = await fetch(proxyURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  return data.translation || text;
}

// Translate visible page text
async function translateVisibleText() {
  const nodes = getTextNodes();
  for (let node of nodes) {
    const original = node.nodeValue.trim();
    if (!original) continue;
    const translated = await translateText(original, selectedLang);
    node.nodeValue = translated;
  }
}
