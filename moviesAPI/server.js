/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Erkam Yildirim Student ID: 160235206 Date: 15-01-2024
*  Cyclic Link: _______________________________________________________________
*
********************************************************************************/

require('dotenv').config();
const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// req.body
app.use(express.urlencoded({ extended: false }));

// enable server to receive data as JSON
app.use(express.json());

const cors = require('cors')
app.use(cors());

app.set("view engine", "ejs");

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();


db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});


/* Routes */

app.get("/", (req, res) => {
    res.render("index")
})


app.post("/api/movies/add", async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({ message: "Body of the request is empty!"})
        }
        const newMovie = await db.addNewMovie(req.body);
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.get('/api/movies/:page/:perPage/:title?', async (req, res) => {
    const pageFromParam = req.params.page;
    const perPageFromParam = req.params.perPage;
    const titleFromParam = req.params.title;

    try {
        const movies = await db.getAllMovies(pageFromParam, perPageFromParam, titleFromParam);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.get("/api/movies/:id", async (req, res) => {
    const idFromParam = req.params.id;

    try {
        const movie = await db.getMovieById(idFromParam);
        if( movie === null){
            return res.status(404).json({ message: "Nothing found!"})
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.put("/api/movies/:id", async (req, res) => {
    const idFromParam = req.params.id;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Body of the request is empty!" })
    }
    try {
        const info = await db.updateMovieById(req.body, idFromParam);
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.delete("/api/movies/:id", async (req, res) => {
    const idFromParam = req.params.id;

    try {
        const info = await db.deleteMovieById(idFromParam);
        res.status(204).json(info);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});