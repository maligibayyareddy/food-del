import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers; // Extract token from headers
  if (!token) {
    return res.json({ success: false, message: "not authorized login again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "error" }); // Corrected spelling of 'message'
  }
};

export default authMiddleware;
