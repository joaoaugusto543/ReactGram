import express from "express"
import cors from 'cors'
import routes from "./routes"

const path=require('path')

class App{
    constructor(){
        this.server=express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.server.use(express.json())
        this.server.use(cors())
        this.server.use('/uploads',express.static(path.join(__dirname,"/uploads")))
    }

    routes(){
        this.server.use(routes)
    }
}

export default new App().server