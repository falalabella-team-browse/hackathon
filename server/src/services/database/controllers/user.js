const { digest } = require("../../../utils");

const userController = (fastify, User) => ({
  async register({ name, email, pwd, confirmPwd }) {
    if (pwd !== confirmPwd) {
      return {
        success: false,
        message: "Password doesn't match",
      };
    }

    try {
      await User.create({ name, email, pwd: digest(pwd) });

      return {
        success: true,
        data: null,
        message: "",
      };
    } catch (e) {
      if (e.name === "MongoError" && e.code === 11000) {
        return {
          success: false,
          data: e,
          message: "Email Already Exists",
        };
      }

      return {
        success: false,
        data: e,
        message: e.message,
      };
    }
  },
  async login({ email, pwd }) {
    try {
      const user = await User.findOne({ email, pwd: digest(pwd) });

      if (!user) {
        throw new Error("Wrong Credentials");
      }

      return {
        success: true,
        message: "",
        data: { token: fastify.jwt.sign({ email, id: user._id }) },
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
        data: e,
      };
    }
  },
  async validate(token) {
    try {
      const res = fastify.jwt.verify(token);

      return {
        success: !!res,
        data: null,
        message: res ? "" : "Unauthorized",
      };
    } catch (e) {
      return {
        success: false,
        data: e,
        message: "Unauthorized",
      };
    }
  },
});

module.exports = userController;
