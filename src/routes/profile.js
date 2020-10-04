const router = require("express").Router();
const {
  getAllUsers,
  getUsersById,
  patchProfile,
  patchImageUser,
  searchByUserName,
  addPhone,
  deleteOptPhone,
} = require("../controller/profile");
const uploadImage = require("../middleware/multer");

router.get("/", getAllUsers);
router.get("/:id", getUsersById);

router.patch("/patch/:id", patchProfile);
router.patch("/image/:id", uploadImage, patchImageUser);

router.post("/search", searchByUserName);
router.patch("/optphone/:id", addPhone);

router.delete("/delOpt/:id", deleteOptPhone);

module.exports = router;
