
import Joi from "joi";

const shortSignUpSchema = Joi.object({

  name: Joi.string().required().messages({

    "any.required": 'Obrigatório preeencher "name"',
    "string.empty": '"name" não pode estar vazio.',

  }),

  email: Joi.string().email().required().messages({

    "any.required": 'Obrigatório preencher "email"',
    "string.empty": '"email" não pode estar vazio.',
    "string.email": 'Opa! "email" inválido!',

  }),

  password: Joi.string().required().messages({

    "any.required": 'Obrigatório preencher "password".',
    "string.empty": '"password" pode estar vazio.',

  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({

    "any.required": 'Obrigatório preencher "confirmPassword".',
    "string.empty": '"confirmPassword" não pode estar vazio.',
    "any.only": 'Opa! "confirmPassword" não está igual a "password"!.',
    
  }),

});

export default shortSignUpSchema;