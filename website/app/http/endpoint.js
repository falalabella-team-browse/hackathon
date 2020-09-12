const BASE_URL = process.env.BASE_URL + "/api/v1";

const ENDPOINTS = {
  REGISTER: BASE_URL + "/auth/register",
  LOGIN: BASE_URL + "/auth/login",
  VALIDATE: BASE_URL + "/auth/validate",
};

module.exports = ENDPOINTS;
