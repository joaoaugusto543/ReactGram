const {validationResult} = require('express-validator')

function validator(req,res,next){

    const erros=validationResult(req)

    if(erros.isEmpty()){
        return next()
    }

    const extractErros=[]

    erros.array().map(err=>extractErros.push(err.msg))

    return res.status(422).json({
        errors:extractErros
    })
}

module.exports=validator