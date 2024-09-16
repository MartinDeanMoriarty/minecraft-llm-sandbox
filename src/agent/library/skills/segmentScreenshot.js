// Import necessary modules for image classification and handling HTTP requests
import { pipeline } from '@xenova/transformers'; 
import { log } from '../log.js';

export async function segmentScreenshot(bot, screenshot_name) {
    /**
     * Segment a screenshot by its given name.
     * @param {MinecraftBot} bot, reference to the Minecraft bot.
     * @param {string} screenshot_name, the name of the screenshot.
     * @returns {Promise<boolean>} true if segmentation succeeded, false otherwise.
     */

    // Check if a screenshot name is provided; if not, log an error message and return false
    if (!screenshot_name) {
        log(bot, 'Segmentation failed. Provide a name for the screenshot');
        return false;
    }

    // Perform image segmentation with Xenova/detr-resnet-50-panoptic
    const segmenter = await pipeline('image-segmentation', 'Xenova/detr-resnet-50-panoptic');
    const url = `./screenshots/${screenshot_name}.png`;
    let output = await segmenter(url);

    // Replace labels containing "LABEL" with "No Clear Result"
    output = output.map(item => {
        return { 
            ...item, 
            label: item.label.includes('LABEL') ? 'No Clear Result' : item.label 
        };
    });
    
    // Log the formatted output for better readability and handling
    logFormattedOutput(bot, output);

    return true;
}

// Function to log formatted output
function logFormattedOutput(bot, output) {
    if (Array.isArray(output)) {
        const labels = output.map(item => `${item.label}: ${item.score}`);
        
        log(bot, `Segmentation result: [${labels.join(', ')}]`);
        console.log(`Segmentation result: [${labels.join(', ')}]`);
    } else {
        log(bot, 'No segmentation results found.');
        console.log('No segmentation results found.');
    }
}