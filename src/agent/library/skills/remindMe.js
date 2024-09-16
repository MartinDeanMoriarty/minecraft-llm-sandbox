import moment from 'moment';
import { log } from '../log.js';

let reminders = []; // Array to store reminders

export async function setReminder(bot, description, time) {
    /**
     * Set a reminder with the given description and time.
     * @param {Object} bot - The MinecraftBot instance.
     * @param {string} description - Description of the reminder.
     * @param {string} time - Time at which to remind, in 'HH:mm' format.
     */
    const parsedTime = moment(time, 'HH:mm');
    if (!parsedTime.isValid()) {
        log(bot, "Invalid time format. Please use 'HH:mm'.");
        return;
    }
    reminders.push({ description, time: parsedTime });
    log(bot, `Reminder set: "${description}" at ${time}`);
    return true;
}

function checkAndNotifyReminders() {
    /**
     * Check the current time against all stored reminders and notify if it matches.
     */
    const now = moment();
    for (let reminder of reminders) {
        if (now.isSame(reminder.time, 'hour') && now.isSame(reminder.time, 'minute')) {
            log(bot, `You have a reminder: "${reminder.description}"`);
            //bot.chat(`You have a reminder: ${reminder.description}`); // Notify the player via chat
            removeReminder(reminder); // Remove the reminder after notifying
        }
    }
}

function removeReminder(reminder) {
    /**
     * Remove a specific reminder from the list.
     * @param {Object} reminder - The reminder object to be removed.
     */
    const index = reminders.indexOf(reminder);
    if (index > -1) {
        reminders.splice(index, 1);
    }    
}

// Example usage:
//setReminder(bot, "Remind player Elton332 to quit gaming and do homework.", "6:55 pm");

// To periodically check for reminders (e.g., every minute):
setInterval(checkAndNotifyReminders, 60000); // 60000 milliseconds = 1 minute