const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const getHomePageData = async (req, res) => {
  const response = {
    message: "CBDC wallet",
  };
  res.status(200).json(response);
};

const getSystemStats = async (req, res) => {

  res.status(200).json({
    activeUsers: 0,
    totalTransactions: 0,
    systemStatus: "operational?"
  });
};

router.get("/", authenticateUser, getHomePageData);
router.get("/stats", authenticateUser, getSystemStats);

module.exports = router;