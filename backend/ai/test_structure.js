import { analyzeScreenshot } from "./gemini.js";
import path from "path";
import "dotenv/config";

// Function to simulate a run (or use a real image if available)
// ideally we need a real image path.
// Assuming there is a 'screenshot.png' or similar from previous runs? 
// The user has 'scraper.js', maybe I can assume there is a file?
// I'll create a dummy file if needed, or point to a known location.
// For now, I'll assume usage: node test_structure.js <path_to_image>

const imagePath = process.argv[2];

console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "Yes (" + process.env.GEMINI_API_KEY.slice(0, 5) + "...)" : "No");

if (!imagePath) {
    console.error("Please provide an image path: node test_structure.js <path>");
    process.exit(1);
}

console.log(`Analyzing ${imagePath}...`);

try {
    const result = await analyzeScreenshot(imagePath);
    console.log("Analysis Result Type:", typeof result);
    console.log("Is Object?", typeof result === 'object' && result !== null);

    if (result.scores) {
        console.log("Scores present:", result.scores);
    } else {
        console.error("Missing 'scores' in result.");
    }

    if (result.issues && Array.isArray(result.issues)) {
        console.log(`Found ${result.issues.length} issues.`);
        if (result.issues.length > 0) {
            console.log("Sample Issue:", result.issues[0]);
        }
    } else {
        console.error("Missing 'issues' array.");
    }

    console.log("Full Result preview:", JSON.stringify(result, null, 2).slice(0, 500) + "...");

} catch (error) {
    console.error("Test Failed:", error);
}
