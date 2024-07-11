const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const authControllers = {
  // Register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const newUser = await new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      // Save user
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Generate token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "3d" }
    );
  },

  // Refresh token
  generateRefeshToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1000d" }
    );
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await Users.findOne({ username: req.body.username });
      if (!user) {
        return res.status(403).json("Sai username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(403).json("Sai password");
      }

      if (user && validPassword) {
        //Generate access token
        const accessToken = authControllers.generateAccessToken(user);
        //Generate refresh token
        const refreshToken = authControllers.generateRefeshToken(user);
        refreshTokens.push(refreshToken);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Refresh token
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    //if (!refreshToken) return res.status(401).json('User not authenticated');
    if (!refreshTokens.includes(refreshToken))
      return res.status(403).json("Refresh token not valid");
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //Create new access token, refresh token
      const newAccessToken = authControllers.generateAccessToken(user);
      const newRefreshToken = authControllers.generateRefeshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/v1/auth/refreshToken",
        sameSite: "strict",
        secure: false,
      });
      res.status(200).json({ newAccessToken });
    });
  },
  // Userlogout
  logoutUser: async (req, res) => {
    // const refreshToken = req.cookies.refreshToken;
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("User has been logged out");
  },
  // Edit user not password
  editUser: async (req, res) => {
    try {
      const user = await Users.findByIdAndUpdate(
        req.user.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            isAdmin: req.body.isAdmin,
            fullName: req.body.fullName,
            address: req.body.address,
            avt: req.body.avt,
            birthday: req.body.birthday,
            phone: req.body.phone,
            gender: req.body.gender,
            prefer: req.body.prefer,
            accessToken: req.body.accessToken,
          },
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
};

module.exports = authControllers;
