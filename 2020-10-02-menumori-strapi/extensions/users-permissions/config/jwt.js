module.exports = {
  jwtSecret: process.env.JWT_SECRET || "9a96c4e7-8976-4463-8570-30a4f8cd9560",
  jwt: {
    expiresIn: "3000d",
  },
};
