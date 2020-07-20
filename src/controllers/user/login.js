import User from "../../models/User";
import bc from "bcrypt";

import generateToken from "../../utils/generateToken.js";
import { ErrorHandler } from "../../utils/error.js";

//Fix RegeneratorRuntime error
import "babel-polyfill";

export default async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const _user = await User.findOne({ email });
    if (!_user) throw new ErrorHandler(422, "Invalid password or email");

    let correctPassword = false;
    if (_user) correctPassword = await bc.compare(password, _user.password);

    if (correctPassword) {
      const { _id, name, surname, email } = _user;
      const token = generateToken({ id: _id, name, surname, email });
      res.status(201).json({
        id: _id,
        name,
        surname,
        email,
        token,
      });
    } else {
      throw new ErrorHandler(422, "Invalid password or email");
    }
    next();
  } catch (err) {
    next(err);
  }
};
