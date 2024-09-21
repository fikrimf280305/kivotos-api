const { MongoClient } = require('mongodb')

const express = require('express')

const cors = require('cors')

require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL

const PORT = process.env.PORT

const HOST = process.env.HOST

const client = new MongoClient(DATABASE_URL)

const app = express()

app.use(cors(), (req, res, next) => {

    next()

})

// Contoh route
app.get('/api/v1', (req, res) => {

    res.json({ status: 200, message: "OK", data: { school: [`http://${HOST}:${PORT}/api/v1/school`, `http://${HOST}:${PORT}/api/v1/school/:id`] } })

})

app.get('/api/v1/school', async (req, res) => {

    try {

        const school = await client.db('kivotos').collection('school').find({}, { projection: { _id: true, name: true } }).toArray()

        if (school) {

            await JSON.stringify(school)

            res.json({ status: 200, message: "OK", data: { school } })

        } else {

            res.json({ status: 404, message: "NOT FOUND", data: null })

        }

    } catch (error) {

        res.json({ status: 500, message: "INTERNAL SERVER ERROR", data: null })

    }

})

app.get('/api/v1/school/:id', async (req, res) => {

    try {

        const id = parseInt(req.params.id)

        const schoolId = await client.db('kivotos').collection('school').findOne({ _id: id })

        if (schoolId) {

            res.json({ status: 200, message: "OK", data: [schoolId] })

        } else {

            res.json({ status: 404, message: "NOT FOUND", data: null })

        }

    } catch (error) {

        res.json({ status: 500, message: "INTERNAL SERVER ERROR", data: null })

    }

})

app.use((req, res, next) => {

    res.json({ status: 404, message: "NOT FOUND", data: null })

    next()

})

// Jalankan server
app.listen(PORT, () => {

    console.log(`Server is listening at port ${PORT}`)

})
