require('dotenv/config')
const mongoose=require('mongoose')



async function coon(){

    try {
        const dbCoon=await mongoose.connect(process.env.DB_MONGOOSE)
        console.log('conectado')
        return dbCoon       
    } catch (error) {
        console.log(error)
    }

}

coon()