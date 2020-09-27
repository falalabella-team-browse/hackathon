const schema = {
  type: "object",
  properties: {
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
