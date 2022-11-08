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


// save user

app.post('/user/save', (req, res) => {
    fs.readFile('data.json', function (err, data) {
        if (err) {
            res.end("problem reading")
        } else {
            const jsonData = JSON.parse(data.toString())
            const newData = req.body;
            const { id, gender, name, contact, address, photoUrl } = newData;
            if (id, gender, name, contact, address, photoUrl) {
                jsonData.push(newData)
                fs.writeFileSync("data.json", JSON.stringify(jsonData))
                res.end("Successfully saved")
            } else {
                res.end('Provide all data')
            }
        }
    })
})


// update specific user

app.patch('/user/update', (req, res) => {
    fs.readFile('data.json', function (err, data) {
        if (err) {
            res.end("problem reading")
        } else {
            const jsonData = JSON.parse(data.toString())
            const { id, gender, name, contact, address, photoUrl } = req.body;
            let newData = jsonData.find(el => el.id == id);
            if (newData?.id) {

                if (gender) {
                    newData.gender = gender;
                }
                if (name) {
                    newData.name = name;
                }
                if (contact) {
                    newData.contact = contact;
                }
                if (address) {
                    newData.address = address;
                }
                if (photoUrl) {
                    newData.photoUrl = photoUrl;
                }
                fs.writeFileSync('data.json', JSON.stringify(jsonData));
                res.end("successfully update")
            } else {
                res.end("This user not exist");
            }
        }
    })
})



app.patch('/user/bulk-update', (req, res) => {
    fs.readFile('data.json', function (err, data) {
        if (err) {
            res.end("problem reading")
        } else {
            const jsonData = JSON.parse(data.toString())
            let newData = req.body;
            const findData = newData.map(element => element.id);
            let existData = jsonData.filter(element => findData.includes(element.id))
                newData.forEach((data, index) => {
                    if (index == 0 || index == 1 || index == 2 || index == 3 || index == 4) {
                        existData[index].contact = data.contact
                    }
                    fs.writeFileSync('data.json', JSON.stringify(jsonData));
                    res.end("successfully update contact no")
                })
        }
    })
})


app.get('/', (req, res) => {
    res.send("Server running successfully");
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})