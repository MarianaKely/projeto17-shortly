
export default function middlewareSchema (schema) {

    return function (req, res, next) {

      const { invalid, analysis } = schema.validate(req.body, { abortEarly: false, convert: true, });

      if (invalid) {

        const message = invalid.details.map((err) => err.message);

        console.log('error'); 
        return res.status(422).send(message);

      }

      res.locals.value = analysis;

      next();
      console.log('ok');

    };

  }