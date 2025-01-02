import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.REACT_APP_DATA_USER,
  password: process.env.REACT_APP_DATA_PASSWORD,
  database: process.env.REACT_APP_DATA_BASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
