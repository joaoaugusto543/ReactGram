const {Schema}=require('mongoose')

const mongoose=require('mongoose')

const userSchema=new Schema({
    name:String,
    email:{
        type:String,
        require:true,
        index:{
            unique:true
        }
    },
    noPhoto:Boolean,
    profileImage:String,
    password:String,
    followers:Array,
    following:Array,
    confirmPassword:String,
    bio:String
},{
    timestamps:true

})

const User=mongoose.model('user',userSchema)

module.exports=User