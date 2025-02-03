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
  logout
} = require("../controllers/userAuthController");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);


router.post("/register", register);
router.post("/login",login);
router.get("/logout", logout);
router.get("/getBalance", getBalance);
router.route("/:id").get(getSingleUser);

module.exports = router;
