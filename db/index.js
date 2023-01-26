import mysql from "mysql";
import config from "./envConfig";

const connection = mysql.createPool(config.mysql);

const query = (qryStr, values) => {
  return new Promise((resolve, reject) => {
    connection.query(qryStr, values, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export default query;
