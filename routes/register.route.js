import express from "express";
import * as users from "../controllers/users.controller";
import { genSaltSync, hashSync } from "bcryptjs";
import { join } from "path";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.render(join(__dirname, "../public/register.html"));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const address =
      req.body.street + " " + req.body.city + ", " + req.body.state;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    let password = req.body.password;

    const salt = genSaltSync(10);
    password = hashSync(password, salt);

    const newUserCheck = await users.findOneUser(email);

    if (newUserCheck.length > 0) {
      return res.render(join(__dirname, "../public/register.html"), {
        message: "Email already in use, please login or use a different email.",
        messageClass: "danger",
      });
    }

    const user = await users.newUser(
      first_name,
      last_name,
      address,
      phone_number,
      email,
      password
    );
    sessionStored = req.session;
    sessionStored.userId = user[0].user_id;
    sessionStored.name = user[0].name;
    sessionStored.admin = user[0].admin;
    sessionStored.message = "Account was successfully registered. Welcome, !";
    req.session.save();
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
});

export default router;
