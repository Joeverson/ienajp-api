/**
 * -------------------------------
 * middleware
 * -------------------------------
 * * */
import pool from '../../db/database';

// preparing the database connection
export default (req, res, next) => {
  req.connection = pool;
  next();
};
