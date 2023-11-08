const puppeteer = require('puppeteer');
const { directions } = require('./directions');

const geo = async () => {
    const browser = await puppeteer.launch({ headless: true});
    for (const dir of directions) {
        const page = await browser.newPage();
        await page.goto('https://www.google.cl/maps/preview');
        const input = await page.$('#searchboxinput')
        await input.type(dir)

        await page.click('#searchbox-searchbutton');
        await page.waitForTimeout(5000);
        const url = await page.url().split('@');
        const coord = {
            x: url[1].split('/')[0].split(',')[0],
            y: url[1].split('/')[0].split(',')[1]
        };
        console.log(`Coordenadas para "${dir}": x=${coord.x}, y=${coord.y}`);

        await page.close();
    }

    await browser.close();
}

geo()