
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




export async function shortIdUrl (req, res) {

  const { id } = req.params;

  try {

    const theUrl = await db.query(`SELECT * FROM url WHERE id = $1;`, [id]);

    if (!theUrl.rowCount) return res.sendStatus(404);

    const url = theUrl.rows[0];

    console.log('ok');
    return res.status(200).send({ id: url.id, shortUrl: url.shortUrl, url: url.url });

  } catch (err) {

    console.log('error');
    return res.status(500).send(err.message);

  }

}



export async function shortOpen (req, res) {

  const { shortUrl } = req.params;

  try {

    const theUrl = await db.query(`SELECT * FROM url WHERE "shortUrl" = $1;`,[shortUrl]);

    if (!theUrl.rowCount) return res.sendStatus(404);

    const url = theUrl.rows[0].url;

    await db.query(`UPDATE url SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`,[shortUrl]);

    return res.redirect(url);

  } catch (err) {

    console.log('error');
    return res.status(500).send(err.message);

  }

}




