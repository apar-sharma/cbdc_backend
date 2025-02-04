const Transaction = require("../models/transaction");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const mongoose = require("mongoose");

const createTransaction = async (req, res) => {
  const {
    senderId,
    receiverId,
    amount,
    transactionType,
    description,
    transactionPin,
  } = req.body;

  // Start session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      throw new CustomError.NotFoundError("Receiver not found");
    }
    const isTransactionPinCorrect = await sender.compareTransactionPin(
      transactionPin
    );
    if (!isTransactionPinCorrect) {
      throw new CustomError.BadRequestError("Invalid transaction pin");
    }
    if (transactionType === "transfer") {
      // Check sufficient balance
      if (sender.balance < amount) {
        throw new CustomError.BadRequestError("Insufficient balance");
      }

      // Update balances
      sender.balance -= amount;
      receiver.balance += amount;

      await sender.save({ session });
      await receiver.save({ session });
    }

    const transaction = await Transaction.create(
      [
        {
          sender: senderId,
          receiver: receiverId,
          amount,
          transactionType,
          description,
          status: "completed",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.status(StatusCodes.CREATED).json({ transaction: transaction[0] });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllTransactions = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const transactions = await Transaction.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .sort({ createdAt: -1 })
    .populate("sender", "name email")
    .populate("receiver", "name email");

  res.status(StatusCodes.OK).json({ transactions });
};

const getSingleTransaction = async (req, res) => {
  const transactionId = req.params.id;
  console.log(transactionId);

  const transaction = await Transaction.findOne({ _id: transactionId })
    .populate("sender", "name email")
    .populate("receiver", "name email");

  if (!transaction) {
    throw new CustomError.NotFoundError(
      `No transaction with id: ${transactionId}`
    );
  }

  res.status(StatusCodes.OK).json({ transaction });
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
};
