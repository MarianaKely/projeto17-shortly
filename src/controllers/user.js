
import { db } from "../config/database.js";

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