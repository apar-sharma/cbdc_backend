const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
} = require('../controllers/transactionController');

router.route('/')
  .post(authenticateUser, createTransaction)
  .get(authenticateUser, getAllTransactions);

router.route('/getSingleTransaction')
  .get(authenticateUser, getSingleTransaction);

module.exports = router;