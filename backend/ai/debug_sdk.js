import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

import fs from "fs";

async function run() {
    console.log("Testing Multimodal generation...");
    try {
        const imageBase64 = fs.readFileSync("dummy_screenshot.png").toString("base64");
        const result = await model.generateContent([
            { text: "Describe this image" },
            { inlineData: { mimeType: "image/png", data: imageBase64 } }
        ]);
        console.log("Success:", result.response.text());
    } catch (e) {
        console.error("Failure:", e);
    }
}
run();
