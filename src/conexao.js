const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/market_cubos',
  ssl: process.env.DATABASE_URL ? true : false
})

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
};
