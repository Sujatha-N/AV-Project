const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Joi = require("Joi");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

// const Joi = require("../node_modules/joi");

const { User } = require("../models/user");

router.post("/", async (req, res) => {
  Users.findOne({ email: req.body.email }, (error, user) => {
    if (!user) return res.status(400).send("Invalid username ");
    const validPassword =  bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validPassword) return res.status(400).send("Invalid  password");

  // const token = generateAuthToken(user.name, req.body.email,user.isAdmin);
  //   var response ={
  //     name: user.name,
  //     token,
  //     idadmin:user.isAdmin

  //   }
  // res.send(token);

  const token = generateAuthToken(user.name,user.email, user.isadmin);

  res.header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["name", "email"]));
          })});
  
  
  

  // const result = validate(req.body);
  // if (result.error)
  //   return res.status(400).send(result.error.details[0].message);

  // let user = await User.findByEmail(req.body.email);
  // if (!user) return res.status(400).send("Invalid username ");

  // const validPassword = await bcrypt.compare(
  //   req.body.password,
  //   user.userpassword
  // );
  // if (!validPassword) return res.status(400).send("Invalid  password");

  // const { name, email, isadmin } = user;

  // const token = User.generateAuthToken(name, email, isadmin);

  // res.send(token);
// )});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

function generateAuthToken(name, email, isadmin) {
  const isAdmin = isadmin == "true" ? true : false;
  const token = jwt.sign(
    {
      name: name,
      email: email,
      isadmin: isAdmin,
    },
    "unsecure"
  );
  return token;
}

module.exports = router;
