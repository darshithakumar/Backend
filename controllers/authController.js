const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../m/db');

exports.signup = async (req, res) => {
  // Receive: name, email, password
  // Hash password, store in users table
};

exports.login = async (req, res) => {
  // Receive: email, password
  // Compare hash, issue JWT
};
