const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const getHomePageData = async (req, res) => {
  const { user } = req;
  

  const response = {
    message: "CBDC wallet",
    user: user,
  };
  
  res.status(200).json(response);
};

const getSystemStats = async (req, res) => {

  res.status(200).json({
    activeUsers: 0,
    totalTransactions: 0,
    systemStatus: "operational"
  });
};

router.get("/", authenticateUser, getHomePageData);
router.get("/stats", authenticateUser, getSystemStats);

module.exports = router;