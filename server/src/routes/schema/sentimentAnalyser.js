const analyserSchema = {
  schema: {
    description:
      "This API is to get sentiment analysis of the description posted by the user",
    tags: ["In House Algorithm"],
    body: {
      type: "object",
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: {
            type: "object",
          },
        },
      },
    },
  },
};

const imageSchema = {
  schema: {
    description:
      "This API is to get the image upload support for the reviews and ratings",
    tags: ["In House Algorithm"],

    response: {
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: {
            type: "object",
          },
        },
      },
    },
  },
};

module.exports = {
  analyserSchema,
  imageSchema,
};
