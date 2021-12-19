/** 
 * CommonJS moduulijärjestelmä tuo http-moduulin
 * Kurssilla käytetään CommonJS moduuleja
 * ES6 import ja export myös mahdollisia avainsanoja
 */
 const http = require('http');

const port = 3000;
// ei tarpeen määritellä jos localhost
const host = 'localhost';

/** 
 * createServer metodi 
 * request ja response
 * setHeader vastauksen otsikko  
 * */ 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

/**
 * Käynnistää palvelimen ja kuuntelee porttia 3000 
 * Muutoksien jälkeen käynnistettävä uudestaan ellei määritellä toisin 
 * Host oletuksena localhost, mutta määriteltiin ylhäällä huvikseen
 */
server.listen(port, host, () => {
  console.log('Server is running at port ' + port);
});