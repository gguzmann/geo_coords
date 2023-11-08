const puppeteer = require('puppeteer');
const { directions } = require('./directions');

const geo = async () => {
    console.log('Abriendo navegador')
    const browser = await puppeteer.launch({ headless: true});

    for (const dir of directions) {
        console.log('nueva pagina')
        const page = await browser.newPage();

        console.log('ingresar a google map')
        await page.goto('https://www.google.cl/maps/preview');
        const input = await page.$('#searchboxinput')

        console.log('tipear direccion', dir)
        await input.type(dir)
        await page.click('#searchbox-searchbutton');
        
        console.log('Esperar 5 seg')
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