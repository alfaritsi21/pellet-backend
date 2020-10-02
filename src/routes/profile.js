const router = require("express").Router();
const {
  getAllUsers,
  getUsersById,
  patchProfile,
  patchImageUser,
} = require("../controller/profile");
const uploadImage = require("../middleware/multer");

router.get("/", getAllUsers);
router.get("/:id", getUsersById);

router.patch("/patch/:id", patchProfile);
router.patch("/image/:id", uploadImage, patchImageUser);

module.exports = router;
