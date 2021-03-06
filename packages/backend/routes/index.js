const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async");
const { encryptToken, decryptToken } = require("../utils/cryptograph");
const { Octokit } = require("@octokit/rest");
const {
  createOAuthAppAuth,
  createOAuthUserAuth,
} = require("@octokit/auth-oauth-app");
const router = Router();

router.get(
  "/cb",
  asyncHandler(async (req, res, next) => {
    const appAuth = createOAuthAppAuth({
      clientType: "oauth-app",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRETE,
    });
    // exchange code for access token
    const userAuth = await appAuth({
      type: "oauth-user",
      code: req.query.code,
      factory: createOAuthUserAuth,
    });
    const authentication = await userAuth();
    const { token } = authentication;
    const encryptedToken = encryptToken(
      token,
      process.env.SECRETE_KEY
    ).toString("utf8");
    res.cookie("session_id", encryptedToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  })
);

router.get(
  "/github",
  asyncHandler((req, res, next) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user%20public_repo`
    );
  })
);

router.get(
  "/logout",
  asyncHandler(async (req, res, next) => {
    // get the encrypted toke from the req cookies
    const encryptedToken = req.cookies.session_id;
    const token = decryptToken(encryptedToken, process.env.SECRETE_KEY);

    // app authentication
    const appOctokit = new Octokit({
      authStrategy: createOAuthAppAuth,
      auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRETE,
      },
    });

    // revoke user's access token
    await appOctokit.request("DELETE /applications/{client_id}/grant", {
      client_id: process.env.CLIENT_ID,
      access_token: token,
    });
    res.cookie("session_id", encryptedToken, {
      maxAge: 10,
      httpOnly: true,
    });
    // redirect user to home page
    res.redirect(`${process.env.CLIENT_URL}`);
  })
);

module.exports = router;
