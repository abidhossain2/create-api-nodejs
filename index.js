const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");

app.use(express.json())



// Get all user & get user with query

app.get('/user/all', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.end("Problem loading data");
        } else {
            const { limit } = req.query;
            const parsedData = JSON.parse(data);
            res.json(parsedData.slice(0, limit));
        }
    })
})



// Get a random user

app.get('/user/random', (req, res) => {

    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.end("problem loading random data");
        } else {
            const parsedData = JSON.parse(data);
            const randomData = parsedData[Math.floor(Math.random() * parsedData.length)];
            res.json(randomData);
        }

    })
})



app.post('/user/save', (req, res) => {
    fs.readFile('data.json', function (err, data) {
        if (err) {
            res.end("problem")
        } else {
            const json = JSON.parse(data.toString())
            const newData = req.body;
            json.push(newData)
            fs.writeFileSync("data.json", JSON.stringify(json))
            res.end("saved")
        }
    })
})


app.get('/', (req, res) => {
    res.send("Server running successfully");
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})