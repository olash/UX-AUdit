import path from "path";
import { URL } from "url";
import fs from "fs";

export const OUTPUT_DIR = path.resolve(process.cwd(), "screenshots");

export function ensureScreenshotDir() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
}

export function normalizeUrl(url) {
    try {
        return new URL(url).href.split("#")[0];
    } catch {
        return null;
    }
}

export function isInternalLink(baseUrl, link) {
    try {
        const base = new URL(baseUrl);
        const target = new URL(link, base);
        return base.hostname === target.hostname;
    } catch {
        return false;
    }
}

export function getSafeFilename(url) {
    return url.replace(/https?:\/\//, "").replace(/[\/:?<>|"]/g, "_");
}
