const proxyURL = "https://gpt-translate-proxy.vercel.app/translate";

/**
 * Translate text using your GPT proxy
 */
async function translateText(text, toLang) {
  if (!text || text.trim() === "") return text;

  const prompt = `Translate this to ${toLang}: ${text}`;
  
  try {
    const res = await fetch(proxyURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.translation || text;
  } catch (err) {
    console.error("Translation failed:", err);
    return text;
  }
}

/**
 * Translate the entire visible page
 */
async function translateWholePage(toLang) {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const promises = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const originalText = node.nodeValue.trim();

    if (originalText.length > 1) {
      const p = translateText(originalText, toLang).then(translated => {
        node.nodeValue = translated;
      });
      promises.push(p);
    }
  }

  await Promise.all(promises);
  console.log(`✅ Page translated to ${toLang}`);
}

/**
 * Hook up the language switcher
 */
document.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.getElementById("language-switcher");

  if (!langSwitcher) {
    console.warn("Language switcher not found");
    return;
  }

  langSwitcher.addEventListener("change", async (e) => {
    const selectedLang = e.target.value;
    console.log(`🌐 Translating page to ${selectedLang}...`);
    await translateWholePage(selectedLang);
  });
});
