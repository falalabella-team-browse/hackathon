const { REGISTER, LOGIN, VALIDATE } = require("./endpoint");
const { post, get } = require("./request");

const register = async (data) => {
  return post(REGISTER, data);
};

const login = async (data) => {
  return post(LOGIN, data);
};

const validate = async () => {
  return get(VALIDATE, { auth: true });
};

module.exports = {
  register,
  login,
  validate,
};
