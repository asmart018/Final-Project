export const verifyToken = async (req, res, next) => {
  try {
    if (req.session.admin == 1) {
      next();
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    next(err);
  }
};
