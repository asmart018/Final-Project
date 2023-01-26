import express from "express";
import homeRoute from "./home.route";
import registerRoute from "./register.route";
import loginRoute from "./login.route";
import logoutRoute from "./logout.route";
import adminRoute from "./admin.route";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.use("/", homeRoute);

router.use("/register", registerRoute);

router.use("/login", loginRoute);

router.use("/logout", logoutRoute);

router.use("/admin", verifyToken, adminRoute);

router.use((req, res, next) => {
  next({
    status: 404,
    message: "Not Found",
  });
});

export default router;
