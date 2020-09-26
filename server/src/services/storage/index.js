const { statSync, writeFileSync, existsSync } = require("fs");
const { join } = require("path");
const fp = require("fastify-plugin");
const mime = require("mime");
const { v4: uuidv4 } = require("uuid");

const saveImage = (baseDir) => (data) => {
  if (!data.startsWith("data")) {
    return data;
  }

  const index = data.indexOf(",");
  const buffer = Buffer.from(data.substring(index), "base64");
  const type = data.substring(5, data.indexOf(";"));

  const ext = mime.getExtension(type);
  const id = `${uuidv4()}.${ext}`;

  writeFileSync(join(baseDir, id), buffer);

  return id;
};

const getImage = (baseDir) => (id) => {
  const filePath = join(baseDir, id);

  if (existsSync(filePath) && statSync(filePath).isFile) {
    return filePath;
  }

  return "";
};

const storage = fp((fastify, _, next) => {
  const { DATA_PATH } = fastify.config;

  if (!statSync(DATA_PATH).isDirectory) {
    fastify.log.error(`${DATA_PATH} is not a folder, Exiting...`);
    process.exit(100);
  }

  fastify.decorate("storage", {
    getImage: getImage(DATA_PATH),
    saveImage: saveImage(DATA_PATH),
  });

  next();
});

module.exports = storage;
