// Importing Modules
const puppeteer = require('puppeteer');

// Runes Function
async function runes (page) {
    try {
        await page.waitForSelector('#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.content-section.content-section_no-padding.grid-1 > div.content-section_content.recommended-build_runes');
        const element = await page.$('#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.content-section.content-section_no-padding.grid-1 > div.content-section_content.recommended-build_runes')
        await element.screenshot({path: 'runes.jpg'});
    } catch (err) {
        console.log(`Unable to complete the following operation, the request timed out`);
    }
}

// Skills Function
async function skills (page) {
    try {
        await page.waitForSelector('#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.content-section.content-section_no-padding.recommended-build_skills > div.content-section_content.skill-path-block');
        const element = await page.$('#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.content-section.content-section_no-padding.recommended-build_skills > div.content-section_content.skill-path-block');
        await element.screenshot({path: 'skills.jpg'});
    } catch (err) {
        console.log(`Unable to complete the following operation, the request timed out. The error => ${err}`);
    }
}

// Items Function
async function items (page) {
    try {
        await page.waitForSelector('#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.content-section.content-section_no-padding.recommended-build_items.media-query.media-query_DESKTOP_MEDIUM__DESKTOP_LARGE');
        const element = await page.$('#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.content-section.content-section_no-padding.recommended-build_items.media-query.media-query_DESKTOP_MEDIUM__DESKTOP_LARGE');
        await element.screenshot({path: 'items.jpg'});
    } catch (err) {
        console.log(`Unable to complete the following operation, the request timed out. The error => ${err}`);
    }
}

async function gatherChampDetails (champ, role){
    try {
        const url = `https://u.gg/lol/champions/${champ}/build?role=${role}`;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
          });
        await page.goto(url, { waitUntil: 'networkidle2' });
        for(let i = 0; i!=5; i++){
            await page.keyboard.press('Tab'); // Tab Key
        }
        await page.keyboard.press('Enter'); // Enter Key
        await runes(page);
        await skills(page);
        await items(page);
        browser.close();
        return true;
    } catch (err) {
        console.log(`Error detected => ${err}`);
        return false;
    }
}

module.exports = { gatherChampDetails };