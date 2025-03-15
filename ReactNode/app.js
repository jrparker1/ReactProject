const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const https = require('https');

const url = 'https://www.champssports.com/en/category/mens/shoes.html';

async function getHTML() {
    const instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });

    const { data: html } = await instance.get(url);
    return html;
}

async function extractData(html) {
    try {
        const $ = cheerio.load(html);

        const products = [];
        $('li.product-container').each((index, element) => {
            const product = {};

            let productName = $(element).find('.ProductName-primary').text().trim();
            if (productName === '') {
                return;
            }
            product.name = productName;

            const productUrl = $(element).find('.ProductCard-link').attr('href');
            product.url = `https://www.champssports.com${productUrl}`;

            let productPrice = $(element).find('.ProductPrice span').text();
            if (productPrice === '') {
                productPrice = $(element).find('.ProductPrice').text();
            }
            product.price = productPrice.trim();

            const colors = [];
            $(element).find('.ProductCard-variants button').each((index, colorElement) => {
                let color = $(colorElement).attr('aria-label');
                color = color.split(' - ').pop().trim();
                colors.push(color);
            });
            if (colors.length === 0) {
                let color = $(element).find('.ProductName-alt').text().split(' - ').pop().trim();
                colors.push(color);
            }
            product.colors = colors;

            products.push(product);
        });

        return products;
    } catch (error) {
        console.error('Error extracting data:', error);
        throw error;
    }
}

async function writeToFile(data, filename) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`Data written to ${filename} successfully`);
    } catch (error) {
        console.error(`Error writing to file: ${error}`);
    }
}

async function main() {
    try {
        const html = await getHTML();
        const products = await extractData(html);
        await writeToFile(products, 'shoeData.json');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();