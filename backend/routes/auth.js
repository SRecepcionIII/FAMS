const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();
const client = new OAuth2Client("399508609836-lqndi02ikk41h1rdg9t6te508r3grrgf.apps.googleusercontent.com");

router.post("/google", async (req, res) => {
  const { token } = req.body;
  console.log(token)
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload(); 
    res.json({
        success: true,
        user: {
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
        },
      });
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }
  });
  
  module.exports = router;