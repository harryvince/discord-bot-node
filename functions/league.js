// Importing Modules
const puppeteer = require('puppeteer');

// Code
async function runes (champ) {
    const url = `https://u.gg/lol/champions/${champ}/build`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    for(let i = 0; i!=5; i++){
        await page.keyboard.press('Tab'); // Tab Key
    }
    await page.keyboard.press('Enter'); // Enter Key
    await page.waitForSelector('#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.content-section.content-section_no-padding.grid-1 > div.content-section_content.recommended-build_runes');
    const element = await page.$('#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.content-section.content-section_no-padding.grid-1 > div.content-section_content.recommended-build_runes')
    await element.screenshot({path: 'screenshot.jpg'});
    browser.close();
}

module.exports = { runes };