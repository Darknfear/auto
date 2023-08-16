import { genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  if (!password) {
    return password;
  }

  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const generateTokenVerifyPractitioner = (data: {
  [key: string]: string;
}) => {
  const token = Object.keys(data)
    .map((key) => encodeURI(`${key}=${data[key]}`))
    .join(',');

  return Buffer.from(token).toString('base64');
};
