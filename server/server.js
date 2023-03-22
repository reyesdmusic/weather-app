const express = require('express');
const app = express();
const axios = require('axios');

// const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=ff3af498ead27371a1dcb730a1c7e5a7';
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=miami&appid=ff3af498ead27371a1dcb730a1c7e5a7';
const API_KEY = 'ff3af498ead27371a1dcb730a1c7e5a7';
app.get("/api/weather", (req, res) => {

    const location = req.query.location;

    if (!location) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;

    axios.get(url).then((response) => {
        if (response?.data) {
            res.json(response.data)
        }
    }).catch(e => {
        if (e?.response?.status) {
            res.status(e.response.status).send()
        }
    })
    
})

app.listen(5001, () => { console.log("Server started on port 5001") })