const puppeteer = require('puppeteer');


const directions = [
    'Plaza Baquedano',
    'Pío Nono 150, Recoleta, Región Metropolitana',
    'San Pablo 6750'
    ]
const geo = async () => {
    const browser = await puppeteer.launch({ headless: false});
    for (const dir of directions) {
        const page = await browser.newPage();
        await page.goto('https://www.google.cl/maps/preview');
        // await page.$eval('#searchboxinput', (el, dir) => el.value = direction);
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