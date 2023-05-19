
import Joi from "joi";

const shortSignInSchema = Joi.object({

  email: Joi.string().email().required().messages({

    "any.required": 'Obrigatório preencher "email".',
    "string.empty": '"email" não pode estar vazio.',
    "string.email": 'opa! "email" inválido!',

  }),

  password: Joi.string().required().messages({

    "any.required": 'Obrigatório preencher "password".',
    "string.empty": '"password" pode estar vazio.',

  }),

});

export default shortSignInSchema;