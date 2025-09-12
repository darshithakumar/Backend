const db = require('./db');
const bcrypt = require('bcryptjs');

const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [name, email, hashedPassword]);
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
};

const validatePassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) return false;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : false;
};

module.exports = {
  createUser,
  getUserByEmail,
  validatePassword
};
