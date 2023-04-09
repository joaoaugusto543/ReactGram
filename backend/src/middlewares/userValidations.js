const {body}=require('express-validator')

function userCreateValidation(){
    return[
        body('name')
            .isString()
            .withMessage('O nome é obrigatório!')
            .isLength({min:3})
            .withMessage('O nome precisa ter no mínimo três caracteres.'),
        body('email')
            .isString()
            .withMessage('O e-mail é obrigatório!')
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('password')
            .isString()
            .withMessage('A senha é obrigatória!')
            .isLength({min:6})
            .withMessage('A senha precisa ter no mínimo seis caracteres.'),
        body('confirmPassword')
            .isString()
            .withMessage('A confirmação da senha é obrigatória!')
            .custom((value,{req})=>{
                if(value!=req.body.password){
                    throw new Error('As senhas não são iguais!')
                }

                return true
            })
    ]
}

function loginValidation(){
    return [
        body('email')
            .isString()
            .withMessage('O e-mail é obrigatório!')
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('password')
            .isString()
            .withMessage('A senha é obrigatória!')
    ]
}

function updateUserValidation(){
    return[
        body('name')
            .optional()
            .isLength({min:3})
            .withMessage('O nome precisa ter no mínimo três caracteres.'),
        body('password')
            .optional()
            .isLength({min:6})
            .withMessage('A senha precisa ter no mínimo seis caracteres.'),
    ]
}

const userValidations={
    userCreateValidation,
    loginValidation,
    updateUserValidation
}

module.exports=userValidations