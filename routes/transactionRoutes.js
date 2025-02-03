const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
} = require('../controllers/transactionController');

router.route('/')
  .post(createTransaction)
  .get(getAllTransactions);

router.route('/getSingleTransaction')
  .get(getSingleTransaction);

module.exports = router;