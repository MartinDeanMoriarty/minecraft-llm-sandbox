import { log } from '../log.js';

export async function waitForIt(bot, seconds_to_wait) {
    /**
     * Let the LLM wait before continuing.
     * @param {MinecraftBot} bot - Reference to the Minecraft bot.
     * @param {number} seconds_to_wait - The amount of seconds to wait before continuing.
     * @returns {Promise<boolean>} true if waiting was successful, false otherwise.
     */
    return new Promise((resolve) => {
        setTimeout(() => {
            log(bot, `Continue where you left off.`);
            resolve(true);
        }, seconds_to_wait * 1000); // Convert seconds to milliseconds
    });
}