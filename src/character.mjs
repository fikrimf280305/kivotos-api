import { client } from './school.mjs'

export const getCharacter = async (req, res) => {
    try {
        const character = await client.db('kivotos').collection('character').find({}, {
            projection: {
                "_id": true,
                "firstName": true,
                "lastName": true
            }
        }).toArray()

        if (character) {
            res.status(200).json({
                "status": "OK",
                "code": 200,
                "data": {
                    character
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

export const getCharacterById = async (req, res) => {
    try {
        const characterId = parseInt(req.params.id)

        const character = await client.db('kivotos').collection('character').findOne({
            "_id": characterId
        })

        if (character) {
            res.status(200).json({
                "status": "OK",
                "code": 200,
                "data": [
                    character
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
