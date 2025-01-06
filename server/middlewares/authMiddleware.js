const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await userModel.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


// const authenticate = async (req, res, next) => {
//   try {
//     let token = req.headers["authorization"];
//     if (token?.startsWith("Bearer ")) token = token.slice(7);
//     if (!token) {
//       return res.status(403).json({ message: "No token provided." });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: "Failed to authenticate token." });
//       }

//       req.userId = decoded.userId;
//       req.organizationId = decoded.organizationId;

//       const url = req.originalUrl.toLowerCase();
//       const method = req.method.toLowerCase();

//       // Determine if the request is for PMS, HRMS, or another module
//       let requiredPermission = null;

//       if (url.includes("project") || url.includes("projects")) {
//         // Permission checks for PMS module
//         if (method === "get") requiredPermission = "readPMS";
//         else if (method === "post") requiredPermission = "writePMS";
//         else if (method === "put") requiredPermission = "updatePMS";
//         else if (method === "delete") requiredPermission = "deletePMS";
//       } else if (url.includes("hrms")) {
//         // Permission checks for HRMS module
//         if (method === "get") requiredPermission = "readHRMS";
//         else if (["post", "put", "delete"].includes(method)) requiredPermission = "writeHRMS";
//       }

//       // If the request does not require specific permissions, bypass the check
//       if (!requiredPermission) {
//         return next(); // Proceed to the next middleware or controller
//       }

//       // Fetch the user and their permissions
//       const user = await User.findByPk(req.userId, { attributes: ["id", "permissionId"] });
//       if (!user) {
//         return res.status(404).json({ message: "User not found." });
//       }

//       const userPermissions = await UserPermission.findByPk(user.permissionId, {
//         attributes: ["permissions"],
//       });

//       if (!userPermissions) {
//         return res.status(404).json({ message: "Permissions not found." });
//       }

//       const { permissions } = userPermissions;

//       // Check if the user has the required permission
//       if (!Array.isArray(permissions) || !permissions.includes(requiredPermission)) {
//         return res
//           .status(401)
//           .json({ message: "You do not have permission to access this module." });
//       }

//       next();
//     });
//   } catch (error) {
//     console.error("Error in authentication middleware:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };


export { protect };
