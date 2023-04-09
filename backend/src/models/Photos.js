
const {Schema}=require('mongoose')
const mongoose=require('mongoose')

const photoSchema=new Schema({
    image:String,
    title:String,
    likes:Array,
    comments:Array,
    userId: mongoose.ObjectId,
    userImage:String,
    userName:String
},{
    timestamps:true
})

const Photos=mongoose.model('photos',photoSchema)

module.exports=Photos