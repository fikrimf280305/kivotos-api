import { client } from "./school.mjs"

export const getClub = async (req, res) => {
    try {
        const club = await client.db('kivotos').collection('club').find({}, {
            projection: {
                "_id": true,
                "name": true
            }
        }).toArray()

        if (club) {
            res.status(200).json({
                "status": "OK",
                "code": 200,
                "data": {
                    club
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

export const getClubById = async (req, res) => {
    try {
        const clubId = await parseInt(req.params.id)

        const club = await client.db('kivotos').collection('club').findOne({
            "_id": clubId
        })

        if (club) {
            res.status(200).json({
                "status": "OK",
                "code": 200,
                "data": [
                    club
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