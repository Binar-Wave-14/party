const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const Dorms = require("../models/dorms.model");

const { APP_SECRET } = process.env;

const createToken = (id) => {
  return jwt.sign({ id }, APP_SECRET, { expiresIn: "7 days" });
};

const viewRegister = (req, res) => {
  return res.render("register");
};

const viewLogin = (req, res) => {
  return res.render("login");
};

const viewDashboard = async (req, res) => {
  const dorms = await  Dorms.findAll()
  
  return res.render("dashboard", {
    dorms
  });
};

const viewDorms = (req, res) => {
  return res.render("dorms");
};

const createDorm = async (req, res) => {
  const { name, address, owner, facilities } = req.body;
  const arrOfFacilities = facilities.split(',')

  await Dorms.create({
    name,
    address,
    owner,
    facilities: arrOfFacilities,
  });

  return res.status(301).redirect('/dashboard')
}
const createRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email) {
      throw {
        message: `email must be valid`,
        code: 400,
        error: `bad request`,
      };
    }

    if (!password || password.length < 8) {
      throw {
        message: `password min length 8 character`,
        code: 400,
        error: `bad request`,
      };
    }

    const isExist = await User.findOne({
      where: {
        email,
      },
    });

    if (isExist) {
      throw {
        message: `users already exists`,
        code: 400,
        error: `bad request`,
      };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: passwordHash,
    });

    const token = await createToken(user.id);

    return res.status(301).redirect('/login');
  } catch (error) {
    next(error);
  }
};
const createLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email) {
      throw {
        message: `email must be valid`,
        code: 400,
        error: `bad request`,
      };
    }

    if (!password || password.length < 8) {
      throw {
        message: `password min length 8 character`,
        code: 400,
        error: `bad request`,
      };
    }

    const isExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!isExist) {
      throw {
        message: `User Not Found`,
        code: 404,
        error: `bad request`,
      };
    }

    const isMatch = await bcrypt.compare(password, isExist.password);

    if (!isMatch) {
      throw {
        message: `Wrong Password`,
        code: 404,
        error: `bad request`,
      };
    }

    const token = await createToken(isExist.id);

    return res.status(301).redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

module.exports = { viewRegister, viewLogin, viewDashboard, viewDorms, createRegister, createLogin, createDorm };
