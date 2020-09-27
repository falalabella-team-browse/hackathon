const { statSync, createReadStream, existsSync } = require("fs");
const { join } = require("path");
const mime = require("mime");

const NOT_FOUND_STATUS_CODE = 404;
const PUBLIC_DIR = join(__dirname, "..", "..", "public");

console.log("PUBLIC_DIR", PUBLIC_DIR);

const resolvePath = (path) => {
  const exist = existsSync(path);

  if (!exist) {
    return join(PUBLIC_DIR, "index.html");
  }

  const stat = statSync(path);

  if (stat.isDirectory()) {
    return resolvePath(join(path, "index.html"));
  }

  if (stat.isFile()) {
    return path;
  }

  return join(PUBLIC_DIR, "index.html");
};

const publicHandler = async (fastify, _, next) => {
  fastify.get("/*", { schema : { hide: true }}, async (req, res) => {
    const { "*": path } = req.params;

    const absPath = resolvePath(join(PUBLIC_DIR, path || "index.html"));

    if (absPath && absPath.startsWith(PUBLIC_DIR)) {
      const mimeType = mime.getType(absPath);

      res.header("Content-Type", mimeType).send(createReadStream(absPath));

      return;
    }

    res.status(NOT_FOUND_STATUS_CODE).send({
      message: "File Not Found",
      success: false,
    });
  });

  next();
};

module.exports = publicHandler;
