const User = require("../models/user.model");

module.exports.createUser = catchAsyncErrors(
  async (name, email, phone, password) => {
    if (!name || !email || !phone || !password) {
      return next(new ErrorHandler("please fill all fields", 400));
    }
    const user = await User.create(req.body);
    sendtoken(user, 200, res);
  }
);

