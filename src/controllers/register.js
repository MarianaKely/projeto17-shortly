
import { db } from "../config/database.js";
import bcrypt from "bcrypt";


export async function register (req, res) {

  const { name, email, password } = req.body;
  const personalPass = bcrypt.hashSync(password, 10);

  try {

    const analysis = await db.query(`SELECT * FROM users WHERE email = $1;`, [email,]);

    if (analysis.rowCount) 

    return res.sendStatus(409);
    console.log('invalid');

    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,[name, email, personalPass]);

    return res.sendStatus(201);
    console.log('ok');

  } catch (err) {

    return res.sendStatus(500);
    console.log('error');

  }

}
