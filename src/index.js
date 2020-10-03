const route = require("express").Router();

// const product = require("./routes/product");
// const category = require("./routes/category");
// const history = require("./routes/history");
const profile = require("./routes/profile");
const user = require("./routes/user");
const payment = require("./routes/payment");
const topup = require("./routes/topup");
const transfer = require("./routes/transfer");

// route.use("/product", product);
// route.use("/category", category);
// route.use("/history", history);
route.use("/profile", profile);
route.use("/user", user);
route.use("/payment", payment);
route.use("/topup", topup);
route.use("/transfer", transfer);

module.exports = route;
