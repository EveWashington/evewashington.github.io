import fs from "fs";
import archieml from "archieml";
import { JSDOM } from "jsdom";
import docs from "../google.config.js";

//from ai... not currently used bc I didn't wanna test it all but could add in the future. 

const CWD = process.cwd();

const extractLinksFromHtml = (htmlContent) => {
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    
    // Find all links and replace them with markdown-style links
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent;
        const markdownLink = `[${text}](${href})`;
        link.outerHTML = markdownLink;
    });
    
    return document.body.textContent || document.body.innerText || '';
};

const retrieveGoogleContent = async ({ id, gid }) => {
    console.log(`retrieving content from...${id}`);

    const baseUrl = "https://docs.google.com";
    const endpoint = gid
        ? `spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`
        : `document/d/${id}/export?format=html`;  // Changed to HTML format
    const requestUrl = `${baseUrl}/${endpoint}`;

    try {
        const response = await fetch(requestUrl);
        // ...existing code...
        
        if (gid) return text;

        // Process HTML to preserve links before parsing with ArchieML
        const processedText = extractLinksFromHtml(text);
        const parsedData = archieml.load(processedText);
        const jsonString = JSON.stringify(parsedData, null, 2);
        return jsonString;
    } catch (error) {
        throw new Error(`Failed to retrieve content: ${error.message}`);
    }
};

(async () => {
    for (let document of docs) {
        try {
            const content = await retrieveGoogleContent(document);
            const outputPath = `${CWD}/${document.filepath}`;
            fs.writeFileSync(outputPath, content);
            console.log(`✓ Saved ${document.filepath}`);
        } catch (error) {
            console.error(`✗ Error processing ${document.filepath}:`, error.message);
        }
    }
})();