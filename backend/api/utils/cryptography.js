import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (p1, p2) => {
  return bcrypt.compare(p1, p2);
};