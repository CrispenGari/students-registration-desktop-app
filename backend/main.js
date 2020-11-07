
const app = require('./server/server')
const PORT = 3001 || process.env.PORT
const HOST = "localhost" || "127.0.0.1"

app.listen(PORT, HOST, (error)=>{
    if(error){
        console.log(error)
        return
    }
    console.log(`The server is running on : http://${HOST}:${PORT}`)
})