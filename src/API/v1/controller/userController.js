const jwt = require("jsonwebtoken");
const { users } = require("../../../models");

const { handleError } = require("../util/handleError");
const { handleFieldsValidation } = require("../util/usersValidate");

module.exports = {
  createUsers: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await users.create({ username, email, password });

      res.status(201).json({ ok: true, user: newUser });
    } catch (error) {
      console.log(error);
      const err = handleFieldsValidation(error);
      handleError(res, err, 400);
    }
  },
  loginUsers: async (req, res) => {
    try {
      const { email, password } = req.body;
      const User = await users.findOne({ where: { email, password } });
      const error = { path: "", message: "" };
      if (!User) {
        error.path = "email";
        error.message = "Email or Password incorrect";
        return handleError(res, error, 404);
      }

      const token = jwt.sign({ id: User.id }, "x.LT23@YYR", {
        expiresIn: "7d",
      });
      res.header("Authorization", token);
      // res.cookie("jwt", token);

      res.status(200).json({ ok: true, user: User });
    } catch (error) {
      const err = handleFieldsValidation(error);
      handleError(res, err, 400);
    }
  },
};
