/**
 * HTTP-requestilla on 
 * päätepiste tai reitti (endpoint/route) 
 * menetelmä (method), 
 * otsikkotiedot (header) ja 
 * sisältö (body)
 */

/**
 * RESTillä on menetelmät
 * GET, POST, DELETE ja PUT
 * julkiset REST APIt lista https://github.com/public-apis/public-apis 
 */

// CommonJS importit
 const express = require('express');
 const bodyParser = require('body-parser');
 // muuttujat
 const app = express();
 //
 app.use(bodyParser.json());
 const port = 3000;
 // leffalista
 let movies = [
    {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams'},
    {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese'},
    {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus'}
  ];
// Käy kaikki elokuvat GET:llä ja palauta JSONina
app.get("/api/movies", (req, res) => {
    res.json(movies);
  })
// Lisää uusi leffa POST
app.post("/api/movies", (req, res) => {
    // lisätään elokuva oliolle id luomisajankohdan perusteella
    const newMovie = {'id': Date.now(), ...req.body};
    // lisätään uusi olio listaan 
    movies = [...movies, newMovie];
    // palautetaan uusi elokuva 
    res.json(newMovie);
  });
// Käy elokuva id:llä
app.get("/api/movies/:id", (req, res) => {
    const movieid = req.params.id;
    // luuppaa movies-listan ja 
    // kokeilee jokaiseen listan olioon vastaako parametrina lähetetty id olion id:tä
    // ja jos niin lisää olion uuteen muuttujaan movie
    const movie = movies.filter(movie => movie.id === movieid);
    // palautetaan jos moviessa on dataa, jos ei 404:sta
    if (movie.length > 0) res.json(movie);
    else res.status(404).end();
  })
// Poista leffa id:llä
app.delete("/api/movies/:id", (req, res) => { 
    // poistetaan movies-listasta, eli lisätään listalle muut kuin samalla id:llä olevat
    movies = movies.filter(mov => mov.id !== req.params.id);
    // tyhjä onnistunut vastaus
    res.status(204).end(); 
})
// Päivitä leffa
app.put("/api/movies/:id", (req, res) => { 
    const id = req.params.id;
    // pidä id samana mutta päivitä elokuvan bodyssa tulleet arvot
    // bodyssa ei lähetetä id:tä huom
    const updMov = { 'id': id, ...req.body };
    // etsi 
    const i = movies.findIndex(movie => movie.id === id);
    // splice lisää ja/tai poistaa elementtejä listalta 
    // ja ylikirjoittaa alkuperäisen listan
    // paikka listalla (i), poistettava määrä (1), lisättävä elementti (updMov)
    movies.splice(i, 1, updMov);
    res.json(updMov);
})

 // käynnistetään palvelin, kuunnellaan porttia
 app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
 });