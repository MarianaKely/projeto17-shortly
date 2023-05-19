
export default function shortToken(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);
    console.log('not authorized');

    res.locals.token = token;

    next();
    console.log('ok');

  }