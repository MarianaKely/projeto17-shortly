
import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export async function shortSignUp (req, res) {

  const { name, email, password } = req.body;
  const personalPass = bcrypt.hashSync(password, 10);

  try {

    const analysis = await db.query(`SELECT * FROM users WHERE email = $1;`, [email,]);

    console.log('invalid');
    if (analysis.rowCount) return res.sendStatus(409);
    
    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,[name, email, personalPass]);
 
    console.log('ok');
    return res.sendStatus(201);

  } catch (err) {

    console.log('error');
    return res.status(500).send(err.message);

  }

}



export async function shortSignIn (req, res) {

  const { email, password } = req.body;

  try {

    const analysis = await db.query(`SELECT * FROM users WHERE email = $1;`, [email,]);
    const user = analysis.rows[0];

    if (!analysis.rowCount || !bcrypt.compareSync(password, user.password)) return res.sendStatus(401);
    console.log('not found');

    const token = uuid();

    await db.query(`INSERT INTO logins ("userId", token) VALUES ($1, $2);`, [user.id, token,]);

    res.status(200).send({ token });
    console.log('your token');

  } catch (err) {
 
    console.log('error');
    return res.status(500).send(err.message);

  }

}



export async function shortUsers (req, res) {

  const { token } = res.locals;

  try {

    const logins = await db.query(`SELECT * FROM logins WHERE token = $1;`,[token]);

    if (!logins.rowCount) return res.sendStatus(401);
    console.log('error found');

    const userId = logins.rows[0].userId;
    const info = await db.query(
      `
      SELECT users.id AS id, users.name as name, SUM(url."visitCount") AS "visitCount" FROM users 
      JOIN url ON users.id = url."userId" WHERE users.id = $1 GROUP BY users.id;`,[userId]);

    const user = info.rows[0];

    const mainRequest = await db.query(`SELECT id, "shortUrl", url, "visitCount" FROM url WHERE "userId" = $1;`,[userId]);
    const url = mainRequest.rows;
 
    console.log('ok');
    return res.status(200).send({...user, visitCount: Number(user.visitCount), shortenedUrls: url,});

  } catch  {

    console.log('error');
    return res.status(500).send(err.message);

  }

}



export async function shortRankings(req, res) {

  try {

    const personalRank = await db.query(
    ` SELECT users.id AS id, users.name AS name,
    COUNT(CASE WHEN url."userId" = users.id THEN 1 END) AS "linksCount",
    SUM(CASE WHEN url."userId" = users.id THEN url."visitCount" END) AS "visitCount"
    FROM users JOIN url ON users.id = url."userId" GROUP BY users.id, users.name
    ORDER BY "visitCount" DESC LIMIT 10;`);

    const ranking = personalRank.rows.map((param) => {

      return { ...param, linksCount: Number(param.linksCount), visitCount: Number(param.visitCount),};

    });

    console.log('ok');
    return res.status(200).send(ranking);

  } catch (err) {

    return res.status(500).send(err.message);

  }

}
