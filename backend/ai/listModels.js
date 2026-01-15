import "dotenv/config";

// The @google/generative-ai SDK does not expose a listModels method.
// We use the REST API directly to verify the API key and available models.
const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.models) {
            console.log(data.models.map(m => m.name));
        } else {
            console.log("No models found or unexpected format:", data);
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
