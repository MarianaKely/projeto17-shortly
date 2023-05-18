
import { db } from "../config/database.js";
import bcrypt from "bcrypt";


export async function register (_, res) {

    const { email, password, name } = res.locals.value;

    try {

      const invalid = await db.query('SELECT * FROM "users" where "email" = $1', [email] );

      if (invalid.rowCount !== 0) return res.sendStatus(409);
      console.log('invalid');

      const myPass = bcrypt.hashSync(password, 10);

      await db.query( `    INSERT INTO "users" ("email", "name", "password") values($1, $2, $3)`,[email, name, myPass] );
      
      console.log('ok');
      return res.sendStatus(201);

    } catch {

      console.log('error');
      return res.sendStatus(500);
    }
  }

