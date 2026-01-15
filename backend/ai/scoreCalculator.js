import { SEVERITY_IMPACT, DIMENSIONS } from "./scoring.config.js";

export function calculateScores(issues) {
    // Initialize all dimensions to 100
    const breakdown = {};
    for (const dim of DIMENSIONS) {
        breakdown[dim] = 100;
    }

    if (issues && Array.isArray(issues)) {
        for (const issue of issues) {
            // Case insensitive match
            const category = issue.category ? issue.category.toLowerCase() : "";
            const severity = issue.severity; // Case sent by AI should match config, but let's be safe

            // Normalize inputs
            const impact = SEVERITY_IMPACT[severity] || SEVERITY_IMPACT[severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase()] || 5;

            // Find matching dimension (handle casing)
            const dimKey = DIMENSIONS.find(d => d.toLowerCase() === category);

            if (dimKey) {
                breakdown[dimKey] -= impact;
            } else {
                // If AI returns a category not in our list, penalize 'usability' or 'clarity' as fallback? 
                // Or just ignore. Let's penalize 'usability' slightly as a catch-all if critical.
                if (severity === 'Critical') breakdown['usability'] -= 5;
            }
        }
    }

    // Clamp scores to 0-100
    let total = 0;
    let count = 0;
    for (const key in breakdown) {
        breakdown[key] = Math.max(0, Math.round(breakdown[key]));
        total += breakdown[key];
        count++;
    }

    const overall = count > 0 ? Math.round(total / count) : 100;

    return { breakdown, overall };
}
