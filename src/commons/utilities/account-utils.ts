import { genSalt, hash, compare } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compare(password, hash);
};

export const generateTokenVerifyPractitioner = (data: {
  [key: string]: string;
}) => {
  const token = Object.keys(data)
    .map((key) => encodeURI(`${key}=${data[key]}`))
    .join(',');

  return Buffer.from(token).toString('base64');
};
