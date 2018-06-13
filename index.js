const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json());

const client = new Client({
    database: 'social-media'
});

app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    })
})

app.get(`/users/${id}`, (req, res) => {
    client.query('SELECT id FROM users', (err, result) => {
        res.send(result.rows.id)
    })
})

app.post('/users', (req, res) => {
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = ['kenzie', 'Kenzie Academy is a user experience design and coding school in Indianapolis, Indiana. Our 6-month to 2-year program with 1-year paid apprenticeship is a new alternative to traditional colleges and short-term coding bootcamps.'];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
    });
})

app.listen(3000, () => {
    client.connect();
})