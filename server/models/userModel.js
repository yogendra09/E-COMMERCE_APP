import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   required: [true, "First Name is required"],
      //   minLength: [4, "First Name must not contain more than 14 characters"],
    },
    contact: {
      type: String,
      //   required: [true, "Contact is required"],
      //   maxLength: [10, "Contact must contain 10 characters"],
      //   minLength: [10, "Contact must contain  10 characters"],
    },
    city: {
      type: String,
      //   required: [true, "First Name is required"],
      //   minLength: [3, "city contain atleast 3 characters"],
    },

    image: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1682685797406-97f364419b4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      },
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      //   match: [
      //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //     "Please fill a valid email address",
      //   ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      //   select: false,
      //   maxLength: [15, "password should not exeed more than 15 charcters"],
      //   minLength: [6, "password should have atleast 6 charcters"],
      //    match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,""]
    },

    resetPasswordToken: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
