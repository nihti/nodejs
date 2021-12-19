// https://expressjs.com/ 
// CommonJS moduulijärjestelmä tuo express-moduulin
const express = require('express');
const app = express();
const port = 3000;
// kuuntelee get-pyyntöjä, myös
// .post, .put, .delete jne. 
// .all kuuntelee kaikkia 
app.get("/", (req, res) => {
  res.send("Hello Express! Hello nodemon! Test. heti");
})
// Parametrien käsittely
app.get("/home/:fn/:ln", (req, res) => {
  res.send(`Welcome to our page ${req.params.fn} ${req.params.ln}`);
})
// JSON response
app.get("/home/user/", (req, res) => {
  res.json({username: 'John'})
})
// if else 
app.get("/home/user/:name/:age", (req, res) => {
  if (req.params.age >= 18) {
    res.send(`Welcome ${req.params.name}, you're ${req.params.ln} years old`);
  } else {
    res.send(`Hello ${req.params.name}, you're too young`);
  }
})

// res.status(404).end(); asettaisi vain tilan
// res.sendStatus(404); lähettää myös vastauksen 
app.get("/*", (req, res) => {
  res.sendStatus(404);
})
app.get("/about", (req, res) => {
  res.send("About us...");
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

