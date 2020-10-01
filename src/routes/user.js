const router = require("express").Router();
const {
  //   getAllUser,
  //   getUserById,
  loginUser,
  register,
  forgotPassword,
  changePass,
} = require("../controller/user");

// router.get("/", getAllUser);
// router.get("/:id", getUserById);
router.post("/login", loginUser);
router.post("/register", register);
router.post("/forgot", forgotPassword);
router.patch("/change", changePass);

module.exports = router;
