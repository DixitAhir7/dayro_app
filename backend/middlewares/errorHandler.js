const fs = require('fs');
const path = require("path");

const adderrtoLogs = (fun, error) => {
  if (typeof fun === "function") {
    fs.readdir(".", (err, f) => {
      f.forEach(file => {
        if (path.extname(file) === ".js") {
          if (error >= 400) {
            fs.appendFile("errlogs.txt", `${error}\n`, (err) => {
              if (err) return "couldn't do it";
            })
          }
        }
      })
    })
  }
};


// whatever response saved into message and that messgae logged into file with function name
const errorHandler = (req, res, next) => {
  res.fail = (statusCode = 400, message = "error") => {
    res.status(statusCode).json({
      statusCode,
      success: false,
      message
    });
  };
  next();
};


module.exports = errorHandler;