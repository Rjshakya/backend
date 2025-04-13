import { verifyToken } from "../services/authentication.js";

const checkUserAuthenticated = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
 
  

  if (!accessToken || accessToken?.length < 1) {
    return res.status(401).json({
      success: false,
      msg: "No token found",
    });
  }

  try {
    const verify = verifyToken(accessToken);
    req.user = verify;
    return next();
  } catch (error) {
    if (error) {
      return res.status(401).json({
        success: false,
        msg: "user not authenticated ok",
      });
    }
  }
};

export { checkUserAuthenticated };
