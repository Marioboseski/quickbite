import { users } from "../data/users.js";
import { registerSchema } from "../schemas/registerSchema.js";
import { loginSchema } from "../schemas/loginSchema.js";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const validationResult = registerSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      errors: validationResult.error.flatten().fieldErrors
    });
  }

  const { name, email, password, city } = validationResult.data;

  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    city
  }

  users.push(newUser);

  return res.status(201).json({
    message: "User registered successfully",
    user: newUser
  })
}

export const login = (req, res) => {
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      errors: validationResult.error.flatten().fieldErrors
    });
  }

  const { email, password } = validationResult.data;

  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  if (user.password !== password) {
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    "secretkey",
    {
      expiresIn: "1d"
    }
  );

  return res.status(200).json({
    message: "Login successful",
    user,
    token
  });
}