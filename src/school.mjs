import { MongoClient } from 'mongodb'
import 'dotenv/config'

const DATABASE_URL = process.env.DATABASE_URL

export const client = new MongoClient(DATABASE_URL)

export const getSchool = async (req, res) => {
    try {
        const school = await client.db('kivotos').collection('school').find({}, {
            projection: {
                "_id": true,
                "name": true
            }
        }).toArray()

        if (school) {
            res.status(200).json({
                "status": "OK",
                "code": 200,
                "data": {
                    school
                }
            })
        } else {
            res.status(404).json({
                "status": "NOT FOUND",
                "code": 404,
                "data": null
            })
        }
    } catch (error) {
        res.status(500).json({
            "status": "INTERNAL SERVER ERROR",
            "code": 500,
            "data": null
        })
    }
}

export const getSchoolById = async (req, res) => {
    try {
        const schoolId = await parseInt(req.params.id)

        const school = await client.db('kivotos').collection('school').findOne({
            "_id": schoolId
        })

        if (school) {
            res.status(200).json({
                "status": "OK",
                "code": 200,
                "data": [
                    school
                ]
            })
        } else {
            res.status(404).json({
                "status": "NOT FOUND",
                "code": 404,
                "data": null
            })
        }
    } catch (error) {
        res.status(500).json({
            "status": "INTERNAL SERVER ERROR",
            "code": 500,
            "data": null
        })
    }
}