const express = require('express');
const bodyParser = require('body-parser');
// const db = require('./db/dbconfig');
const query = require('./db/movies');

const app = express();
app.use(bodyParser.json());
const port = 3000;

// Hae kaikki leffat kannasta
app.get("/api/movies", query.getMovies);
// Hae leffa
app.get("/api/movies/:id", query.getMovie);
// Lisää leffa
app.post("/api/movies", query.addMovie);
// Poista leffa
app.delete("/api/movies/:id", query.delMovie);
// Muokkaa leffaa
app.put("/api/movies/:id", query.update);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});