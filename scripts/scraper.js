function isEmailOpen() {
    return document.querySelector(SELECTORS.SUBJECT) !== null;
}

function getSenderEmailAddress() {
    const senderElement = document.querySelector(SELECTORS.SENDER);
    return senderElement ? senderElement.getAttribute('email') : '';
}

function getEmailSubject() {
    const subjectElement = document.querySelector(SELECTORS.SUBJECT);
    return subjectElement ? subjectElement.textContent.trim() : '';
}

function getEmailBody() {
    const bodyElement = document.querySelector(SELECTORS.BODY);
    return bodyElement ? bodyElement.innerText.trim() : '';
}

function getLinks() {
    const bodyElement = document.querySelector(SELECTORS.BODY);
    if (!bodyElement) return [];

    const linkElements = bodyElement.querySelectorAll('a[href]');
    const links = [];
    linkElements.forEach(link => {
        links.push(link.href);
    });
    return links;
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
            subject: getEmailSubject(),
            body: getEmailBody(),
            links: getLinks()
        }

        sendToAPI(emailInfo);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === ACTIONS.SCRAPE) {
        scrapeEmail();
    }
});
