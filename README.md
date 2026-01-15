# Node.js Playwright Scraper

A robust web scraper built with Playwright that captures screenshots, improved accessibility metrics (contrast), and DOM elements.

## Prerequisites

- Node.js (v14 or higher)
- npm (usually comes with Node.js)

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

    *Note: This will install `playwright`.*

2.  (Optional) Install browser binaries if they are missing:
    ```bash
    npx playwright install chromium
    ```

## Usage

Run the scraper by providing a target URL:

```bash
node scraper.js <URL>
```

Example:
```bash
node scraper.js https://example.com
```

## Output

The script generates two files in the current directory:
- `screenshot.png`: A full-page screenshot of the website.
- `data.json`: A JSON file containing extracted data (links, buttons, images, forms, text samples with contrast ratios).
