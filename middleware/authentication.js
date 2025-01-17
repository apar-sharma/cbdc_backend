const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  let {name, userId} = req.body;
  req.user = { name, userId };
  console.log(req.body);
  if (!req.user) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
    next();
};

// const authorizePermissions = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       throw new CustomError.UnauthorizedError(
//         'Unauthorized to access this route'
//       );
//     }
//     next();
//   };
// };

module.exports = {
  authenticateUser,
};
