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

    res.status(200).json({ status: 200, message: "OK", data: { school: [`http://${HOST}:${PORT}/api/v1/school`, `http://${HOST}:${PORT}/api/v1/school/:id`], club: [`http://${HOST}:${PORT}/api/v1/club`, `http://${HOST}:${PORT}/api/v1/club/:id`] } })

})

app.get('/api/v1/school', async (req, res) => {

    try {

        const school = await client.db('kivotos').collection('school').find({}, { projection: { _id: true, name: true } }).toArray()

        if (school) {

            await JSON.stringify(school)

            res.status(200).json({ status: 200, message: "OK", data: { school } })

        } else {

            res.status(404).json({ status: 404, message: "NOT FOUND", data: null })

        }

    } catch (error) {

        res.status(500).json({ status: 500, message: "INTERNAL SERVER ERROR", data: null })

    }

})

app.get('/api/v1/club', async (req, res) => {

    try {

        const club = await client.db('kivotos').collection('club').find({}, { projection: { _id: true, name: true } }).toArray()

        if (club) {

            await JSON.stringify(club)

            res.status(200).json({ status: 200, message: "OK", data: { club } })

        } else {

            res.status(404).json({ status: 404, message: "NOT FOUND", data: null })

        }

    } catch (error) {

        res.status(500).json({ status: 500, message: "INTERNAL SERVER ERROR", data: null })

    }

})

app.get('/api/v1/school/:id', async (req, res) => {

    try {

        const id = parseInt(req.params.id)

        const schoolId = await client.db('kivotos').collection('school').findOne({ _id: id })

        if (schoolId) {

            res.status(200).json({ status: 200, message: "OK", data: [schoolId] })

        } else {

            res.status(404).json({ status: 404, message: "NOT FOUND", data: null })

        }

    } catch (error) {

        res.status(500).json({ status: 500, message: "INTERNAL SERVER ERROR", data: null })

    }

})

app.get('/api/v1/club/:id', async (req, res) => {

    try {

        const id = parseInt(req.params.id)

        const clubId = await client.db('kivotos').collection('club').findOne({ _id: id })

        if (clubId) {

            res.status(200).json({ status: 200, message: "OK", data: [clubId] })

        } else {

            res.status(404).json({ status: 404, message: "NOT FOUND", data: null })

        }

    } catch (error) {

        res.status(500).json({ status: 500, message: "INTERNAL SERVER ERROR", data: null })

    }

})

app.use((req, res, next) => {

    res.status(404).json({ status: 404, message: "NOT FOUND", data: null })

    next()

})

// Jalankan server
app.listen(PORT, () => {

    console.log(`Server is listening at port ${PORT}`)

})
