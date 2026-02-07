const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product.model");
const User = require("../models/User.model");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const products = [
  {
    name: "iPhone 15",
    price: 79999,
    description: "Latest Apple iPhone with A17 chip",
    image: "iphone15.jpg",
    category: "Mobiles",
    countInStock: 15,
  },
  {
    name: "Samsung Galaxy S24",
    price: 69999,
    description: "Flagship Samsung smartphone",
    image: "galaxyS24.jpg",
    category: "Mobiles",
    countInStock: 20,
  },
  {
    name: "MacBook Air M2",
    price: 114999,
    description: "Apple laptop with M2 chip",
    image: "macbookair.jpg",
    category: "Laptops",
    countInStock: 8,
  },
  {
    name: "Sony WH-1000XM5",
    price: 29999,
    description: "Noise cancelling headphones",
    image: "sonyXM5.jpg",
    category: "Accessories",
    countInStock: 25,
  },
];

const seedProducts = async () => {
  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      console.log("Admin user not found ❌");
      process.exit(1);
    }

    await Product.deleteMany();

    const sampleProducts = products.map((product) => ({
      ...product,
      createdBy: adminUser._id,
    }));

    await Product.insertMany(sampleProducts);

    console.log("Products seeded successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
