import jwt from "jsonwebtoken";

export default function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}
