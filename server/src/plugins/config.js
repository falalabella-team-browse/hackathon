const schema = {
  type: "object",
  required: ["DB_USERNAME", "DB_PASSWORD"],
  properties: {
    DB_PASSWORD: {
      type: "string",
      default: "",
    },
    DB_USERNAME: {
      type: "string",
      default: "",
    },
    DB_NAME: {
      type: "string",
      default: "hackathon",
    },
    DB_HOST: {
      type: "string",
      default: "127.0.0.1",
    },
    DB_PORT: {
      type: "number",
      number: 27017,
    },
    AUTH_DB: {
      type: "string",
      default: "admin",
    },
    DATA_PATH: {
      type: "string",
      default: "/tmp",
    },
  },
};

const options = {
  dotenv: true,
  schema: schema,
};

module.exports = options;
