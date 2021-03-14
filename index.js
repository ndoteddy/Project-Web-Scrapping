const express = require('express')
const axios = require("axios")
const cheerio = require("cheerio")
const { json } = require('body-parser')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/newarrivals", async function(req, res) {  
    let newArrival = await ExtractData('newArrival'); 
    res.send(newArrival);
});

app.get("/featureproducts", async function(req, res) {       
    let newArrival = await ExtractData('featureProducts'); 
    res.send(newArrival);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



async function ExtractData(type)
{
    let website = await axios.get('https://technext.github.io/furn./');
    let data=[];
    var $ = cheerio.load(website.data);
    switch (type) {
        case 'newArrival':               
            $('.single-new-arrival').each(function (index, element) {
                let product = $(this).find('h4 >a ');
                let price = $(this).find('.arrival-product-price');
                data.push({
                    'product' : $(product).text(),
                    'price' : $(price).text()
                });
            });   
            break;
        case 'featureProducts':               
            $('.single-feature-txt').each(function (index, element) {
                let product = $(this).find('h3 >a ');
                let price = $(this).find('h5');

                data.push({
                    'product' : $(product).text(),
                    'price' : $(price).text()
                });
            });   
            break;            
    }
    return data;
}