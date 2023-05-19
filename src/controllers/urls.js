
import { db } from "../config/database.js";
import { nanoid } from "nanoid";


export async function shortShorten (req, res) {

  const { url } = req.body;
  const { token } = res.locals;

  try {

    const logins = await db.query(`SELECT * FROM logins WHERE token = $1;`,[token]);

    if (!logins.rowCount) return res.sendStatus(401);
    console.log('not found');

    const account = logins.rows[0];
    const num = 8;
    const id = nanoid(num);

    await db.query( `INSERT INTO url ("shortUrl", url, "userId") VALUES ($1, $2, $3);`,[id, url, account.userId]);

    const registre = await db.query(`SELECT * FROM url WHERE "shortUrl" = $1;`,[id]);
    const urls = registre.rows[0];

    console.log('ok');
    return res.status(201).send({ id: urls.id, shortUrl: urls.shortUrl });

  } catch (err) {

    console.log('error');
    res.status(500).send(err.message);

  }

}



