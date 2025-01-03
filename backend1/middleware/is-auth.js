import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    req.isAdmin = decodedToken.isAdmin;
  } catch (err) {
    console.log("Unable to decode token");
  }

  next();
};
