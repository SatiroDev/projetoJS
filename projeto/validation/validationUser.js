import Joi from "joi";

// validação dos dados na hora de adicionar um novo usuário
const validation = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required()
})

export const validarCadastroUsuario = (req, res, next) => {
    try {
        const { error } = validation.validate(req.body)
        if (error) {
            const err = new Error(error.details[0].message)
            err.status = 400
            throw err
        }
        next()
    } catch (error) {
        next(error)
    }
}

// validação dos dados na hora de atualizar as informações de um usuário existente
const validationUpdate = Joi.object({
    name: Joi.string().trim().min(3),
    email: Joi.string().trim().email(),
    password: Joi.string().trim().min(6)
})

export const validarAtualizacaoUsuario = (req, res, next) => {
    try {
        const { error } = validationUpdate.validate(req.body)
        if (error) {
            const err = new Error(error.details[0].message)
            err.status = 400
            throw err
        }
        next()
    } catch (error) {
        next(error)
    }
}
