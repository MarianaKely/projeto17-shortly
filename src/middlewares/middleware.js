
export default function middlewareSchema (schema) {

    return (req, res, next) => {

      const analysis = schema.validate(req.body, { abortEarly: false });

      if (analysis.error) {
  
        console.log('found error');
        return res.status(422).send(analysis.error.details.map((param) => param.message));

      }

      next();
      console.log('ok');

    };

  }