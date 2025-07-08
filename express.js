import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json())

app.listen(PORT, () => { console.log(`Server litnenig on port ${PORT}...`) })


function loggin(req, res, next) {
    console.log(`request: ${req.method}, url: ${req.url}, start time: ${new Date().toLocaleString()}`);
    next();
}

app.use(loggin)

// Part 1
app.get('/greet', (req, res) => { res.send(JSON.stringify({ "msg": `hi from get method ${new Date().toLocaleString()}` })) })

// Part 2
app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    console.log(`I got name: ${name}`)
    res.send(JSON.stringify({ "name": name }))
})

app.get('/test', async (req, res) => {
    try {
        const file = await fetch('http://localhost:3000/greet/bob').then((res) => res.json());
        if (file.name === 'bob') {
            console.log(`The name is: ${file.name}`);
            res.send(JSON.stringify({ "name": file.name }))
        } else {
            throw new Error('name not found');
        }
    } catch (err) {
        console.log("Error: ", err.message);

    }
})

// Part 3
app.post('/action', async (req, res) => {
    const validActionType = ['joke', 'cat fact'];
    const body = req.body;
    if (body.action && validActionType.includes(body.action)) {
        res.status(200)
        switch (body.action) {
            case 'joke':
                const file = await fetch("https://official-joke-api.appspot.com/random_joke").then((res) => res.json())
                console.log(file);
                const data = JSON.stringify(file.setup).toUpperCase() + JSON.stringify(file.punchline).toUpperCase();
                res.end(data)
                break;
            case 'cat fact':
                const catFile = await fetch("https://api.thecatapi.com/v1/images/search?limit=11", {
                    headers: {
                        "x-api-key": "live_kmxpxrc9eODCcRLtZB9qKm4nGYyTiuuluipAc0nLpzEHMzUOcNG6FSahFLERxFDH"
                    }
                }).then((res) => res.json())
                if (catFile.length === 11) {
                    res.end(JSON.stringify({ "secces": catFile.length }))
                } else {
                    res.end(JSON.stringify({ "field": catFile.length }))
                }
                break;
            default:
                break;
        }
    }
    else {
        res.status(404)
        res.end(JSON.stringify({ "msg": "body is malformed" }))
    }

})