const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${new Date().toISOString()} | ${req.method} | ${req.path}\n`,
      (err) => {
        if (err) console.error("Logger error:", err);
        next();
      }
    );
  };
}

module.exports = { logReqRes };
