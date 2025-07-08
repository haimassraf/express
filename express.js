import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json())

app.listen(PORT, () => { console.log(`Server litnenig on port ${PORT}...`) })


// Part 1
app.get('/greet', (req, res) => { res.send(JSON.stringify({"msg": `hi from get method ${Date.now()}`})) })

// Part 2
app.get('/greet:name', (req, res) => {res.send()})