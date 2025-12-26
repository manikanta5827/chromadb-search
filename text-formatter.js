
import fs from "fs";

export const getFileData = async (fileName, chunkSize = 200, overlap= 40) => {
    // let text = await fs.readFile(fileName, 'utf8');
    const rawText = fs.readFileSync(fileName, "utf8");

    const cleanText = normalizeText(rawText);

    const chunks = chunkTextByWords(
        cleanText,
        chunkSize,   // chunk size (words)
        overlap     // overlap (words)
    );
    // console.log(policies);
    return chunks;
}

function normalizeText(text) {
    let result = "";
    let prevWasSpace = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        // Treat newline, tab, carriage return as space
        if (ch === "\n" || ch === "\r" || ch === "\t" || ch === " ") {
            if (!prevWasSpace) {
                result += " ";
                prevWasSpace = true;
            }
        } else {
            result += ch;
            prevWasSpace = false;
        }
    }

    return result.trim();
}
function chunkTextByWords(text, chunkSize, overlap) {
    const words = text.split(" ");
    const chunks = [];

    let start = 0;

    while (start < words.length) {
        const end = start + chunkSize;
        const chunkWords = words.slice(start, end);
        chunks.push(chunkWords.join(" "));

        // move forward with overlap
        start = end - overlap;

        if (start < 0) {
            start = 0;
        }
    }

    return chunks;
}
