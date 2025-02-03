const express = require("express");
const router = express.Router();
const {authenticateUser} = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  getBalance,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");
const {
  register,
  login,
  logout,
  getBalance,
} = require("../controllers/userAuthController");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);


router.post("/register", authenticateUser,register);
router.post("/login", authenticateUser, login);
router.get("/logout", authenticateUser, logout);
router.get("/getBalance", getBalance);
router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
