// Import necessary modules for taking screenshots and handling HTTP requests
import puppeteer from 'puppeteer';
import { join } from 'path';
import { log } from '../log.js';
import { classifyScreenshot } from './classifyScreenshot.js'; // Module to classify the screenshot
import { segmentScreenshot } from './segmentScreenshot.js'; // Module to segment the screenshot
import { extractText } from './extractText.js'; // Module to extract text from the screenshot

// Export an asynchronous function that takes a bot and a screenshot name as parameters
export async function takeScreenshot(bot, screenshot_name) {
    /**
     * Take a screenshot of what the bot is seeing.
     * @param {MinecraftBot} bot, reference to the Minecraft bot.
     * @param {string} screenshot_name, the name of the screenshot.
     * @returns {Promise<boolean>} true if the screenshot was taken successfully, false otherwise.
     */

    // Check if a screenshot name is provided; if not, log an error message and return false
    if (!screenshot_name) {
        log(bot, 'Failed to take screenshot. Provide a name for the screenshot');
        return false;
    }

    // Launch a headless browser using puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let screenshot = null;

    try {
        // Navigate to the local development server's URL, wait until the network is idle for a while, and set a timeout if needed
        await page.goto(`http://localhost:3007`, { waitUntil: 'networkidle2', timeout: 1000000 });
        
        // Define the path where the screenshot will be saved, appending the screenshot name with '.png' extension
        const screenshotPath = join('./screenshots/', screenshot_name + '.png');
        
        // Take a full-page screenshot and save it to the defined path
        screenshot = await page.screenshot({ path: screenshotPath, fullPage: true });
        //console.log("Screenshot taken and saved to:", screenshotPath);
        
        // Log a message indicating that the screenshot has been taken and classification is starting
        log(bot, 'Screenshot taken. Starting classification, segmentation and text extraction...');
        
    } catch (error) {
        // If an error occurs during any step above, log the error message and return false
        //console.error("Failed to take screenshot:", error);
        log(bot, 'Failed to take screenshot.');
        return false;
    } finally {
        // Close the browser regardless of whether an error occurred or not
        await browser.close();
    }

    // Call another function to classify the screenshot using the bot and the screenshot name as parameters
    try {
        await classifyScreenshot(bot, screenshot_name);
    } catch (error) {
        //console.error("Failed to classify screenshot:", error);
        log(bot, 'Failed to classify screenshot.');
        return false;
}

    // Call another function to segment the screenshot using the bot and the screenshot name as parameters
    try {
        await segmentScreenshot(bot, screenshot_name);
    } catch (error) {
        //console.error("Failed to segment screenshot:", error);
        log(bot, 'Failed to segment screenshot.');
        return false;
    }

    // Call another function to extract text(playernames) from the screenshot using the bot and the screenshot name as parameters
    try {
        await extractText(bot, screenshot_name);
    } catch (error) {
        //console.error("Failed to extract text from screenshot:", error);
        log(bot, 'Failed to extract text from screenshot.');
        return false;
    }

    // If everything goes well, return true indicating success
    return true;
}