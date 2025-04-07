const { Client } = require('pg')

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Tavonda0122****",
    database: "WeatherDB"
})

con.connect().then(()=> console.log("connected"))