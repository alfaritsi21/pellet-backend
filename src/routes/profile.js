const router = require("express").Router();
const {
  getAllUsers,
  getUsersById,
  patchProfile,
  patchImageUser,
  searchByUserName,
} = require("../controller/profile");
const uploadImage = require("../middleware/multer");

router.get("/", getAllUsers);
router.get("/:id", getUsersById);

router.patch("/patch/:id", patchProfile);
router.patch("/image/:id", uploadImage, patchImageUser);

router.post("/search", searchByUserName);

module.exports = router;
