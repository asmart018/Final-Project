import express from "express";
import config from "./db/envConfig";
import bodyParser from "body-parser";
import morgan from "morgan";
import ejs from "ejs";
import cors from "cors";
import session from "express-session";
import apiRouter from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.engine("html", ejs.renderFile);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

app.use(function (req, res, next) {
  //Lets EJS access variables stored on the session object locally
  res.locals.email = req.session.email;
  res.locals.name = req.session.name;
  res.locals.message = req.session.message;
  res.locals.admin = req.session.admin;
  next();
});

app.use("/", apiRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}...`);
});
