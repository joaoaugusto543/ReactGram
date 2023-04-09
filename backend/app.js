require('dotenv/config')
require('./src/config/db')
const cors=require('cors')
const express=require('express')
const path=require('path')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(require('./src/routes/Router'))

const port=process.env.PORT

app.listen(port,()=>{
    console.log(`Está rodando na porta ${port}`)
})