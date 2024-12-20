import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  const { token } = req.body;

  //console.log(token);

  if (!token) {
    console.log("unauth1");
    res.status(401).json({ message: "Unauthorized access!" });
    return;
  }

  try {
    const response = jwt.verify(token, process.env.JWT_SECRET);
    console.log("success");
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log("unauth");
    res.status(401).json({ message: "Unauthorized access!" });
    console.log(err);
  }

  //if (!response) return res.json({ message: "responededdd" });
});

export default router;
