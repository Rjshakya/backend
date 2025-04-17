import { OAuth2Client } from "google-auth-library";
import User from "../models/user.js";
import { createToken } from "../services/authentication.js";

const clientID = process.env.CLIENT_ID;
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const googleRegistration = async (req, res) => {
  const { code } = req?.body;
  

  try {
    // get access token for the code that u received from frontend
    const { tokens } = await oAuth2Client.getToken(code);
    // verify that token
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: clientID,
    });

    // get user info for that token
    const { email, email_verified, name, picture } = ticket.getPayload();

    const user = await User.findOne({ email: email });

    if (!user) {
      const newUser = await User.create({
        email: email,
        name: name,
        OauthProvider: "google",
        verifiedEmail: email_verified,
        role: "normal",
        picture: picture,
      });

      const { accessToken, refreshToken } = createToken(newUser);

      return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "lax",
          domain: "localhost",
          path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          msg: "User registration Success",
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            email_verified: newUser.verifiedEmail,
            picture: newUser.picture,
          },
          accessToken,
        });
    }

    const { accessToken, refreshToken } = createToken(user);

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        domain: "localhost",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        msg: "User registration Success",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          email_verified: user.verifiedEmail,
          picture: user.picture,
        },
        accessToken,
      });


  } catch (error) {
    if (error) {
        console.log(error);
        
      res.status(406).json({
        success: false,
        msg: "failed to verify user",
      });
    }
  }
};

export { googleRegistration };
