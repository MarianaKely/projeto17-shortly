
export default function middleware (schema) {

    return (req, res, next) => {

      const analysis = schema.validate(req.body, { abortEarly: false });

      if (analysis.error) {

        return res.status(422).send(analysis.error.details.map((param) => param.message));

      }

      next();
      console.log('ok');

    };

  }