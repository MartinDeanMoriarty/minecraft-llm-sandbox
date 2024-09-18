// Import necessary modules for image classification and handling HTTP requests
import { pipeline } from '@xenova/transformers'; // Module for image classification using a pre-trained model
import { log } from '../log.js';

export async function classifyScreenshot(bot, screenshot_name) {
    /**
     * Classifies a screenshot by its given name.
     * @param {MinecraftBot} bot, reference to the Minecraft bot.
     * @param {string} screenshot_name, the name of the screenshot.
     * @returns {Promise<boolean>} true if classification succeeded, false otherwise.
     */

    // Check if a screenshot name is provided; if not, log an error message and return false
    if (!screenshot_name) {
        log(bot, 'Failed to classify. Provide a name for the screenshot');
        return false;
    }

    try {
        // Load the pre-trained image classification model from @xenova/transformers
        let pipe = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');

        // Use the loaded model to classify the local screenshot file, specifying its path
        const result = await pipe(`./screenshots/${screenshot_name}.png`);

        // Check if the classification result is an array with at least one element
        if (Array.isArray(result) && result.length > 0) {
            // Extract the first element of the result array for easier handling
            const classificationResult = result[0];
            
            // Log the classification result, including the label and score, using the bot's logger
            log(bot, `Classification result: ${JSON.stringify({ label: classificationResult.label, score: classificationResult.score })}`);
                        
            // Print the classification result to the console for debugging purposes
            //console.log(`Classification result: ${JSON.stringify({ label: classificationResult.label, score: classificationResult.score })}`);
            
            // Print the top K classification results to the console for debugging purposes
            // console.log(`Top ${topKResults.length} Classification Results:`, JSON.stringify(topKResults, null, 2));
                        
            // For deeper inspection if needed, uncomment and use this line:
            // console.log('Full Classification Result:', JSON.stringify(classificationResult, null, 2));
            
            // If the classification was successful, return true
            return true;
        } else {
            // Log an error message if the result format is unexpected
            //log(bot, 'Unexpected classification result format');
            console.error('Unexpected classification result format:', result);
            return false;
        }
    } catch (error) {
        // If an error occurs during any step above, log the error message and return false
        //log(bot, `Error during classification: ${error.message}`);
        console.error('Error during classification:', error);
        return false;
    }
}