
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

