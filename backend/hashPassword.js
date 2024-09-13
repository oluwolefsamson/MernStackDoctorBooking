import bcrypt from "bcryptjs";

const password = "Oluwole7710"; // Replace with your actual password

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

hashPassword(password)
  .then((hashedPassword) => {
    console.log("Hashed Password:", hashedPassword);
    // You can now copy this hashed password and use it in your MongoDB Atlas Data Explorer or MongoDB Compass
  })
  .catch((err) => console.error("Error hashing password:", err));
