import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { asyncError } from "../middleware/error.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";

//Register user
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
      ...req.body,
      password,
    });

    await user.save();
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT
    );

    res.cookie("token", token).status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

//User login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credential",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(new ErrorHandler("Invalid Crential", 401));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res.cookie("token", token).status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = asyncError(async (req, res, next) => {
  res
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({
      sucess: true,
      message: "Logged out",
    });
  const token = req.cookies("token");
  if (!token) return next(new ErrorHandler("you are not logged in", 401));
});

//Update User
export const updateUser = asyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

//Delete User
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deleted Successfully",
  });
};

//Get user details
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
};

//Get All User  --Admin
export const getAllUser = async (req, res, next) => {
  try {
    // const { page } = req.query;
    // const resultperpage = 2;
    // const pagination = resultperpage * (page - 1);
    // console.log(page, pagination);
    const users = await User.find(req.query);
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//find single user by name or something by or operator
// export const getUserOne = async (req,res,next)=>{
//   const user = await User.find($or:{[{name:req.body.name},{isAdmin:req.body.isAdmin}]})
//   if(!user) return res.status(404).json({success:false,message:"User not found"})
//   res.status(200).json({
//     success:true,
//     user
//   })
// }

//Get login user

export const myProfile = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
