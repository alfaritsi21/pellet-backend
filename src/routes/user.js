const router = require("express").Router();
const {
  //   getAllUser,
  //   getUserById,
  loginUser,
  register,
  forgotPassword,
  changePass,
  patchNewPin,
  newPassword,
  newPin,
  checkUserPin,
} = require("../controller/user");

// router.get("/", getAllUser);
router.get("/checkpin/:id", checkUserPin);
router.post("/login", loginUser);
router.post("/register", register);
router.post("/forgot", forgotPassword);
router.patch("/change", changePass);
router.patch("/:id", patchNewPin);
router.patch("/newpass/:id", newPassword);
router.patch("/newpin/:id", newPin);

module.exports = router;
