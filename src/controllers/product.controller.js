const Product = require("../models/Product.model");

const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            image,
            category,
            countInStock,
        } = req.body;

        const product = await Product.create({
            name,
            price,
            description,
            image,
            category,
            countInStock,
            createdBy: req.user._id,
        });

        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Invalid product ID",
            error: error.message,
        });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
};
