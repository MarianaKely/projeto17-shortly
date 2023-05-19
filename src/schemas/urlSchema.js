
import Joi from "joi";

const shortUrlSchema = Joi.object({

  url: Joi.string().uri().required().messages({
    "any.required": 'Obrigatório preencher "url".',
    "string.empty": '"url" não pode estar vazio.',
    "string.uri": 'Opa! "confirmPassword" não está igual a "url"!',

  }),
  
});

export default shortUrlSchema;