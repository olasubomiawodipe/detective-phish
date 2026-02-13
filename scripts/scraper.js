/*
 * Detect if an email is open
 * If so:
     * Extract the following info:
         * Sender email address (string)
         * Links (array of strings)
         * Subject (string)
         * Body (string)
     * Create JSON object
     * Send to backend API
 */

function isEmailOpen() {
    return document.querySelector('h2.hP') !== null;
}

function getSenderEmailAddress() {
    const senderElement = document.querySelector('span[email]');
    return senderElement ? senderElement.getAttribute('email') : '';
}

function getEmailSubject() {
    const subjectElement = document.querySelector('h2.hP');
    return subjectElement ? subjectElement.textContent.trim() : '';
}

function getEmailBody() {
    //
}

function getLinks() {
    //
}

function sendToAPI(emailInfo) {
    console.log("Data to be sent: ", emailInfo)
}

/**
 * Entry point method.
 * Orchestrates the scraping flow:
 * 1. Checks if email is open
 * 2. Scrape email for info
 * 3. Send info to API
 */
function scrapeEmail() {
    if (isEmailOpen()) {
        const emailInfo = {
            sender: getSenderEmailAddress(),
            subject: getEmailSubject()
            // body: getEmailBody(),
            // links: getLinks()
        }

        sendToAPI(emailInfo);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        scrapeEmail();
    }
});
