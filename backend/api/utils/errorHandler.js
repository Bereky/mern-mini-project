import { UnauthorizedError } from "express-jwt";

const errorHandler = (err, req, res, next) => {
  if (err instanceof UnauthorizedError) {
    return res
      .status(err.status || 401)
      .json({ status: err.status || 401, message: "Unauthorized!" });
  }

  return res
    .status(err.status || 400)
    .json({ status: err.status || 400, message: "Error occured!" });
};

export default errorHandler;
