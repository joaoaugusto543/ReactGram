import App from "./app";
require('dotenv/config')

const port=process.env.PORT

App.listen(port,()=>{
    console.log(port)
})