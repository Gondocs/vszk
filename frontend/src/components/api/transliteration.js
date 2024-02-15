export function transliterate(text) {
  const transliterationMap = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ö: "o",
    ő: "o",
    ú: "u",
    ü: "u",
    ű: "u",
  };

  text = text.replace(/[,.]/g, "");

  return text
    .toLowerCase()
    .split("")
    .map((char) => transliterationMap[char] || char)
    .join("")
    .replace(/\s+/g, "-");
}
