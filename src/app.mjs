import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { getSchool, getSchoolById } from './school.mjs'
import { getClub, getClubById } from './club.mjs'
import { getCharacter, getCharacterById } from './character.mjs'

const HOST = process.env.HOST
const PORT = process.env.PORT

const app = express()

app.use(cors(), (req, res, next) => {
    next()
})

app.get('/api/v1', (req, res) => {
    try {
        res.status(200).json({
            "status": "OK",
            "code": 200,
            "data": {
                school: [
                    `http://${HOST}:${PORT}/api/v1/school`,
                    `http://${HOST}:${PORT}/api/v1/school/:id`,
                ],
    
                club: [
                    `http://${HOST}:${PORT}/api/v1/club`,
                    `http://${HOST}:${PORT}/api/v1/club/:id`
                ],

                character: [
                    `http://${HOST}:${PORT}/api/v1/character`,
                    `http://${HOST}:${PORT}/api/v1/character/:id`
                ]
            }
        })
    } catch (error) {
        res.status(500).json({
            "status": "INTERNAL SERVER ERROR",
            "code": 500,
            "data": null
        })
    }
})

app.get('/api/v1/school', getSchool)

app.get('/api/v1/school/:id', getSchoolById)

app.get('/api/v1/club', getClub)

app.get('/api/v1/club/:id', getClubById)

app.get('/api/v1/character', getCharacter)

app.get('/api/v1/character/:id', getCharacterById)

app.use((req, res, next) => {
    try {
        res.status(404).json({
            "status": "NOT FOUND",
            "code": 404,
            "data": null
        })
    } catch (error) {
        res.status(500).json({
            "status": "INTERNAL SERVER ERROR",
            "code": 500,
            "data": null
        })
    }
})

app.listen(PORT, HOST, () => {
    console.log(`App is listening at http://${HOST}:${PORT}/`)
})