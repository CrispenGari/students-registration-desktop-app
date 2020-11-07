const express = require("express")
const database = require('./databaseConfig')
const http = require('http')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const Pusher = require('pusher')
const pusher = new Pusher({
    appId: "1103649",
    key: "e6239a0ceef73e73f5af",
    secret: "741565a18874510bebe4",
    cluster: "ap2",
    useTLS: true
});
// Midleways
app.use(express.json())
app.use(cors())
app.use(helmet())
// App routes
app.get('/', async (req, res)=>{
    return await res.status(200).send(http.STATUS_CODES[200])
})
// getting all the students
app.get('/students/all/yes', async(req, res)=>{
    try{
         const students = await database("students").timeout(1000)
         if(students.length ===0 ){
            return res.status(404).json({"code": 404, "message": http.STATUS_CODES[404],
        "description": "No students in the database"})
        }
         res.status(200).json(students)
    }catch(error){
        res.status(500).json({"code": 500, "message": http.STATUS_CODES[500]})
    }
})
// getting one student by stud #
app.get('/students/one/:studentNumber',async (req, res)=>{
    const {studentNumber} = req.params
    try{
        const student = await database("students").where("student_number", "=", studentNumber).timeout(1000)
        if(student.length ===0 ){
           return res.status(404).json({"code": 404, "message": http.STATUS_CODES[404]})
        }
        res.status(200).json(student)
   }catch(error){
       res.status(500).json({"code": 500, "message": http.STATUS_CODES[500]})
   }
})
// posting a new student
app.post('/students/add', async (req, res)=>{
    const data = req.body
    try {
        if(Object.keys(data).length===0 && data.constructor == Object){
            return res.status(304).json({"code": 304, "message": http.STATUS_CODES[304]})
        }
        await database("students").insert(data).timeout(1000)
        // trigger pusher on new insert
        pusher.trigger("insert-channel", "insert", {
            message: data
        });
        return res.status(201).json({"code": 201, "message": http.STATUS_CODES[201], "description": "A student has been added in the database", "data": data})
    } catch (error) {
        res.status(500).json({"code": 500, "message": http.STATUS_CODES[500]})
    }

})
// deleting a student
app.delete('/students/delete/one/:studentNumber', async (req, res)=>{
    const {studentNumber} = req.params
    try{
        await database("students").del().where("student_number", "=", studentNumber).timeout(1000)
        return res.status(304).json({"code": 304, "message": http.STATUS_CODES[304]})
   }catch(error){
       res.status(500).json({"code": 500, "message": http.STATUS_CODES[500]})
   }
})
// upading exsting student
app.put('/students/update/one/:studentNumber', async (req, res)=>{
    const {studentNumber} = req.params
    const data = req.body
    try{
        if(Object.keys(data).length===0 && data.constructor == Object){
            return res.status(304).json({"code": 304, "message": http.STATUS_CODES[304]})
        }
        await database("students").update(data).where("student_number", "=", studentNumber).timeout(1000)
        return res.status(202).json({"code": 202, "message": http.STATUS_CODES[202]})
   }catch(error){
       res.status(500).json({"code": 500, "message": http.STATUS_CODES[500]})
   }
})
// app export
module.exports = app