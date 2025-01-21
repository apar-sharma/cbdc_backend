const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

// Define route handlers
const getHomePageData = async (req, res) => {
  const { user } = req;
  
  // Return different data based on user role
  const response = {
    message: "CBDC wallet",
    user: user,
  };

  res.status(200).json(response);
};

const getSystemStats = async (req, res) => {
  // add some home page data here
  res.status(200).json({
    activeUsers: 0,
    totalTransactions: 0,
    systemStatus: "operational"
  });
};

// Define routes
router.get("/", authenticateUser, getHomePageData);
router.get("/stats", authenticateUser, getSystemStats);

module.exports = router;