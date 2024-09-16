import tesseract from 'tesseract.js'; // Use default import
import PSM from 'tesseract.js'; // Use default import
import { log } from '../log.js';

export async function extractText(bot, screenshot_name) {
     /**
     * Image-to-Text - "extracts" text from a screenshot by its given name.
     * @param {MinecraftBot} bot, reference to the Minecraft bot.
     * @param {string} screenshot_name, the name of the screenshot.
     * @returns {Promise<boolean>} true if text was found, false otherwise.
     */

    // Check if a screenshot name is provided; if not, log an error message and return false    
    if (!screenshot_name) {
        log(bot, 'Failed. Provide a name for the screenshot');
        return false;
    }      

    const imagePath = `./screenshots/${screenshot_name}.png`;

    try {        

        // Use the Tesseract.js library to convert the image to text
        const worker = await tesseract.createWorker(['eng', 'deu']); 
        
        (async () => {
            await worker.setParameters({
              tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
            });
            const { data: { text } } = await worker.recognize(imagePath);
            console.log(`Text extraction result: ${text}`);
            log(bot, `Text extraction result: ${text}`);
            await worker.terminate();
          })();

        //const { data: { text } } = await worker.recognize(imagePath);
        return true;      
      
    } catch (error) {
        console.error('Error during text extraction:', error);
        log(bot, `Error during text extraction: ${error.message}`);
        return false;
    }
}