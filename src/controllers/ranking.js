

import { db } from "../config/database.js";

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