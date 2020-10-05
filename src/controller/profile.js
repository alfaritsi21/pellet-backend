const {
  getAllUsers,
  getUserById,
  getUserCount,
  patchUser,
  searchUserName,
  deletePhone,
} = require("../model/profile");

// const { checkNumber } = require("../model/user");
const fs = require("fs");
const helper = require("../helper/index");
const qs = require("querystring");

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatePage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatePage };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatePage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatePage };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};

module.exports = {
  getAllUsers: async (request, response) => {
    try {
      let { search, sort, page, limit } = request.query;
      if (search === undefined || search === "") {
        search = "%";
      } else {
        search = "%" + search + "%";
      }
      if (sort === undefined || sort === null || sort === "") {
        sort = `user.user_id`;
      }
      if (page === undefined || page === null || page === "") {
        page = parseInt(1);
      } else {
        page = parseInt(page);
      }
      if (limit === undefined || limit === null || limit === "") {
        limit = parseInt(9);
      } else {
        limit = parseInt(limit);
      }
      let totalData = await getUserCount();
      let totalPage = Math.ceil(totalData / limit);
      let offset = page * limit - limit;
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await getAllUsers(search, sort, limit, offset);
      return helper.response(
        response,
        200,
        "Success get Users Profile",
        result,
        pageInfo
      );
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getUsersById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getUserById(id);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Succes get user profile By Id : ${id}`,
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `User Profile By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchProfile: async (request, response) => {
    try {
      const { id } = request.params;
      const { user_name, first_name, last_name, user_phone } = request.body;
      const setData = {
        user_name,
        first_name,
        last_name,
        user_phone,
      };
      const checkUser = await getUserById(id);
      if (setData.user_phone.length < 10 || setData.user_phone.length > 12) {
        return helper.response(
          response,
          400,
          "Phone number must be 10-12 characters"
        );
      } else if (setData.first_name === "") {
        return helper.response(response, 400, "Input your first name");
      } else if (setData.last_name === "") {
        return helper.response(response, 400, "Input your last name");
      } else if (checkUser.length > 0) {
        const result = await patchUser(setData, id);
        return helper.response(response, 200, "Profile updated", result);
      } else {
        return helper.response(response, 404, `Profile By Id: ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchImageUser: async (request, response) => {
    const { id } = request.params;
    try {
      const setData = {
        user_img: request.file.filename,
      };
      const checkId = await getUserById(id);
      if (checkId.length > 0) {
        if (
          checkId[0].user_img === "blank-profile.jpg" ||
          request.file == undefined
        ) {
          const result = await patchUser(setData, id);
          return helper.response(response, 201, "Profile Updated", result);
        } else {
          fs.unlink(`./uploads/${checkId[0].user_img}`, async (error) => {
            if (error) {
              throw error;
            } else {
              const result = await patchUser(setData, id);
              return helper.response(response, 201, "Profile Updated", result);
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  searchByUserName: async (request, response) => {
    try {
      const { search_name } = request.body;
      const result = await searchUserName(search_name);

      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Search Username",
          result
        );
      } else {
        return helper.response(response, 404, `${search_name} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  addPhone: async (request, response) => {
    try {
      const { id } = request.params;
      const { opt_phone } = request.body;
      const setData = {
        opt_phone,
      };
      if (setData.opt_phone === "") {
        return helper.response(response, 404, ` input your phone number`);
      } else if (
        setData.opt_phone.length < 10 ||
        setData.opt_phone.length > 12
      ) {
        return helper.response(response, 400, "Invalid phone number");
      } else {
        const result = await patchUser(setData, id);
        return helper.response(
          response,
          201,
          "Success add optional phone number",
          result
        );
      }
    } catch (error) {
      console.log;
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteOptPhone: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await getUserById(id);
      if (checkId.length > 0) {
        const result = await deletePhone(id);
        return helper.response(
          response,
          201,
          "Your phone number deleted",
          result
        );
      } else {
        return helper.response(response, 404, ` Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
