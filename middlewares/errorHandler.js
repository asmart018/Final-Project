import { join } from "path";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.log(err);
  return res
    .status(status)
    .sendFile(join(__dirname, "../public/notFound.html"));
};
