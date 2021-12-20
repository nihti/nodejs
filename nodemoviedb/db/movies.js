const db = require('./dbconfig');

// hae kaikki leffat
const getMovies = (req, res) => {
    db.query('SELECT * FROM movies', (err, result) => {
        if (err) console.log(err);
        else res.json(result.rows);
    })
}

// lisää leffa
const addMovie = (req, res) => {
    // uusi leffa lähetetään bodyssä 
    const newMovie = req.body;
    const query = {
        // SQL lauseke
        text: 'INSERT INTO movies (title, director, year) VALUES ($1, $2, $3)',
        // req body olion attribuutit title, director ja year
        values: [newMovie.title, newMovie.director, newMovie.year],
    }
    // kysely (yllä luotu muuttuja), parametrit 
    db.query(query, (err,res) => {
        if (err) console.error('Error executing query', err.stack);
    })
    // palauttaa vastauksena lisätyn leffan 
    res.json(newMovie);
}

// poista leffa
const delMovie = (req, res) => {
    const query = {
        // tarkkana taulun nimen kanssa, ohjeissa toistuvasti väärin tietokannan nimi
        text: 'DELETE FROM movies WHERE id = $1',
        values: [req.params.id],
    }
    db.query(query, (err,res) => {
        if (err) console.log('Error executing query', err.stack)
    })
    res.status(204).end();
}

// muokkaa leffaa
const update = (req, res) => {
    // bodyssa lähetetään uudet arvot
    const editedMovie = req.body;
    const query = {
        text: 'UPDATE movies SET title=$1, director=$2, year=$3 WHERE id = $4',
        // Requestilla on sekä body (JSON:na lähetettävä leffa) että parametrina lähetettävä id
        values: [editedMovie.title, editedMovie.director, editedMovie.year, req.params.id],
    }
    db.query(query, (err,res) => {
        if (err) console.error('Error executing query', err.stack);
    })
    res.json(editedMovie);
}


// hae leffa id:llä
const getMovie = (req, res) => {
    const query = {
        text: 'SELECT * FROM movies WHERE id = $1',
        values: [req.params.id],
    }
    db.query(query, (err, result) => {
        if (err) console.log('Error executing query', err.stack);
        else {
            if (result.rows.length > 0) res.json(result.rows);
            else res.status(404).end();
        }
    })
}

module.exports = {
    getMovies: getMovies,
    getMovie: getMovie,
    addMovie: addMovie,
    delMovie: delMovie,
    update: update,
}