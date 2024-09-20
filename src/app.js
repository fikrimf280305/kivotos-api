const express = require('express')

const http2 = require('http2')

const fs = require('fs')

const path = require('path')

const cors = require('cors')

const { MongoClient } = require('mongodb')

const app = express()

app.use(cors(), (req, res, next) => {

    next()

})

// Middleware untuk mengukur waktu eksekusi
app.use((req, res, next) => {

    const start = Date.now()
  
    // Menangkap metode res.json agar kita bisa memodifikasi respons
    const originalJson = res.json
  
    res.json = (data) => {

        const duration = Date.now() - start
    
        // Buat response baru dengan menaruh 'took' di bagian atas
        const responseBody = {

            took: duration, // Waktu eksekusi berada di atas

            ...data // Data asli di bawah

        }
    
        originalJson.call(res, responseBody)

    }
  
    next()

})

// Contoh route
app.get('/api/v1', (req, res) => {

    res.json({ status: "OK", code: 200, message: "REQUEST SUCCESS!" , data: null, errors: null })

})

app.use((req, res, next) => {

    res.json({ status: "NOT FOUND", code: 404, message: "PAGE NOT FOUND!", data: null, errors: ["The requested endpoint was not found"] })

    next()

})

// Jalankan server
app.listen(3000, () => {

    console.log('Server running on port 3000')

})
