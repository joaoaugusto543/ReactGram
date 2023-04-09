require('dotenv/config')
const mongoose=require('mongoose')



async function coon(){

    try {
        const dbCoon=await mongoose.connect(process.env.MONGOOSE)
        console.log('conectado')
        return dbCoon       
    } catch (error) {
        console.log(error)
    }

}

coon()