const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.role, balance: user.balance };
};

module.exports = createTokenUser;
