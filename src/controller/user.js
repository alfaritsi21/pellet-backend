const bcrypt = require("bcrypt");
const helper = require("../helper");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const qs = require("querystring");
const {
  postUser,
  checkUser,
  checkNumber,
  checkKey,
  checkPinById,
  changePassword,
  searchUserName,
} = require("../model/user");
const { patchUser, checkPassById, getUserById } = require("../model/profile");

module.exports = {
  register: async (request, response) => {
    const { user_email, user_password, user_name, user_phone } = request.body;
    const salt = bcrypt.genSaltSync(8);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    const checkEmail = await checkUser(request.body.user_email);
    const checkPhone = await checkNumber(request.body.user_phone);
    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_phone,
      first_name: "",
      last_name: "",
      user_saldo: 0,
      user_pin: 0,
      user_img: "blank-profile.jpg",
      user_created_at: new Date(),
      user_status: 0,
      user_key: 0,
    };
    try {
      if (checkEmail.length > 0) {
        return helper.response(response, 400, "Email is already registered");
      } else if (checkPhone.length > 0) {
        return helper.response(
          response,
          400,
          "Phone Number is already registered"
        );
      } else if (!user_email.match("@")) {
        return helper.response(response, 400, "Invalid,Missing Character('@')");
      } else if (
        setData.user_phone.length < 10 ||
        setData.user_phone.length > 12
      ) {
        return helper.response(response, 400, "Invalid phone number");
      } else if (
        request.body.user_password.length < 8 ||
        request.body.user_password.length > 16
      ) {
        return helper.response(
          response,
          400,
          "Password must be 8-16 characters"
        );
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match");
      } else {
        const result = await postUser(setData);
        console.log(result);
        return helper.response(response, 200, "Success Register User", result);
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request");
    }
  },
  loginUser: async (request, response) => {
    if (
      request.body.user_email === undefined ||
      request.body.user_email === ""
    ) {
      return helper.response(response, 400, "Email must be filled");
    } else if (
      request.body.user_password === undefined ||
      request.body.user_password === ""
    ) {
      return helper.response(response, 400, "Password must be filled");
    }
    try {
      const checkDataUser = await checkUser(request.body.user_email);
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          request.body.user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          let payload = {
            user_id: checkDataUser[0].user_id,
            user_email: checkDataUser[0].user_email,
            user_name: checkDataUser[0].user_name,
            user_img: checkDataUser[0].user_img,
            user_pin: checkDataUser[0].user_pin,
            user_phone: checkDataUser[0].user_phone,
            user_status: checkDataUser[0].user_status,
            user_key: checkDataUser[0].user_key,
          };
          //   if (payload.user_status === 0) {
          //     return helper.response(
          //       response,
          //       400,
          //       "Your account is not activated"
          //     );
          //   } else {
          const token = jwt.sign(payload, "RAHASIA", { expiresIn: "24h" });
          payload = { ...payload, token };
          return helper.response(response, 200, "Success login", payload);
          //   }
        } else {
          return helper.response(response, 400, "Wrong password !");
        }
      } else {
        return helper.response(response, 400, "Email is not registered !");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { user_email } = request.body;
      const keys = Math.round(Math.random() * 100000);
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length >= 1) {
        const data = {
          user_key: keys,
          user_updated_at: new Date(),
        };
        await changePassword(data, user_email);
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "oriza.sativa.matang@gmail.com",
            pass: "Oriza.sativa8",
          },
        });
        await transporter.sendMail({
          from: '"Pellet"',
          to: user_email,
          subject: "Pellet - Forgot Password",
          html: `<a href="http://localhost:8080/reset?keys=${keys}">Click Here To Change Password</a>`,
        }),
          function (error) {
            if (error) {
              return helper.response(response, 400, "Email not sent !");
            }
          };
        return helper.response(response, 200, "Email has been sent !");
      } else {
        return helper.response(response, 400, "Email is not registered !");
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  changePass: async (request, response) => {
    try {
      const { keys } = request.query;
      const { user_password } = request.body;
      const checkDataUser = await checkKey(keys);
      if (
        request.query.keys === undefined ||
        request.query.keys === null ||
        request.query.keys === ""
      ) {
        return helper.response(response, 400, "Invalid Key");
      }
      if (checkDataUser.length > 0) {
        const email = checkDataUser[0].user_email;
        let setData = {
          user_key: keys,
          user_password,
          user_updated_at: new Date(),
        };
        const difference =
          setData.user_updated_at - checkDataUser[0].user_updated_at;
        const minutesDifference = Math.floor(difference / 1000 / 60);
        if (minutesDifference > 5) {
          const data = {
            user_key: 0,
            user_updated_at: new Date(),
          };
          await changePassword(data, email);
          return helper.response(response, 400, "Key has expired");
        } else if (
          request.body.user_password === undefined ||
          request.body.user_password === null ||
          request.body.user_password === ""
        ) {
          return helper.response(response, 400, "Password must be filled !");
        } else if (
          request.body.confirm_password === undefined ||
          request.body.confirm_password === null ||
          request.body.confirm_password === ""
        ) {
          return helper.response(
            response,
            400,
            "Confirm Password must be filled !"
          );
        } else if (
          request.body.user_password.length < 8 ||
          request.body.user_password.length > 16
        ) {
          return helper.response(
            response,
            400,
            "Password must be 8-16 characters"
          );
        } else if (
          request.body.confirm_password !== request.body.user_password
        ) {
          return helper.response(response, 400, "Password didn't match");
        } else {
          const salt = bcrypt.genSaltSync(10);
          const encryptPassword = bcrypt.hashSync(user_password, salt);
          setData.user_password = encryptPassword;
          setData.user_key = 0;
        }
        const result = await changePassword(setData, email);
        return helper.response(
          response,
          200,
          "Success Password Updated",
          result
        );
      } else {
        return helper.response(response, 404, `Invalid key`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  patchNewPin: async (request, response) => {
    try {
      const { id } = request.params;
      const { pin } = request.body;
      const setData = {
        user_pin: pin,
      };
      const result = await patchUser(setData, id);
      return helper.response(response, 200, "Pin created", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  checkUserPin: async (request, response) => {
    try {
      const { id } = request.params;
      const { user_pin } = request.body;
      const checkUser = await getUserById(id);
      const result = await checkPinById(id);
      console.log(result[0].user_pin);
      if (checkUser.length > 0) {
        if (user_pin == result[0].user_pin) {
          return helper.response(
            response,
            200,
            `You can change your pin`,
            result
          );
        } else {
          return helper.response(response, 400, "Your pin isn't match");
        }
      } else {
        return helper.response(
          response,
          404,
          `User Pin By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  newPin: async (request, response) => {
    try {
      const { id } = request.params;
      const { user_pin } = request.body;
      if (request.body.user_pin === "") {
        return helper.response(response, 404, "Input your new pin");
      } else if (user_pin.length < 6) {
        return helper.response(response, 404, "Pin must be 6 characters");
      }
      const checkUser = await getUserById(id);
      if (checkUser.length > 0) {
        const setData = {
          user_pin,
        };
        const result = await patchUser(setData, id);
        return helper.response(response, 200, "Success Pin Updated", result);
      } else {
        return helper.response(response, 400, `User By Id: ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  newPassword: async (request, response) => {
    try {
      const { id } = request.params;
      const { current_password, user_password } = request.body;
      if (request.body.current_password === "") {
        return helper.response(response, 404, "Input your current password");
      } else if (request.body.user_password === "") {
        return helper.response(response, 404, "Input your new password");
      } else if (user_password.length < 8 || user_password.length > 16) {
        return helper.response(
          response,
          400,
          "Password Must be include 8-16 characters"
        );
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match");
      }
      const checkUser = await getUserById(id);
      if (checkUser.length > 0) {
        const getPass = await checkPassById(id);
        // console.log(getPass[0].user_password);
        if (getPass[0].user_password.length > 0) {
          const checkPass = bcrypt.compareSync(
            current_password,
            getPass[0].user_password
          );
          if (checkPass) {
            const salt = bcrypt.genSaltSync(10);
            const encryptPassword = bcrypt.hashSync(user_password, salt);
            const setData = {
              user_password: encryptPassword,
            };
            const result = await patchUser(setData, id);
            return helper.response(
              response,
              200,
              "Success Password Updated",
              result
            );
          } else {
            return helper.response(response, 400, "Wrong Password !");
          }
        } else {
          return helper.response(response, 404, "Check your password again");
        }
      } else {
        return helper.response(response, 404, `User By Id: ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
