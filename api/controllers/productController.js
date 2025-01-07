const { default: mongoose } = require("mongoose")
const Product = require("../models/Product")
const Store = require("../models/Store")

// get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get single product
const getProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// post a product 
const postProduct = async (req, res) => {
    try {
        const { name, price, isOnOffer, discountPrice, brand, stock, category, storeId, image, description } = req.body;

        // Check if the store exists before creating the product
        const store = await Store.findById(storeId);
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }

        // Create the product after confirming store exists
        const product = new Product({ name, price, isOnOffer, discountPrice, brand, stock, category, storeId, image, description, });

        // Save the product first to generate _id
        await product.save();

        // Update the store with the product ID
        store.products.push(product._id);
        await store.save();

        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// delete a product 
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find and delete the product
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the associated store's products list
        const storeId = deletedProduct.storeId;
        if (storeId) {
            await Store.findByIdAndUpdate(
                storeId,
                { $pull: { products: productId } },
                { new: true }
            );
        }

        res.status(200).json({ message: `${deletedProduct.name} deleted successfully!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update a product 
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const { brand, category, description, discountPrice, image, isOnOffer, name, price, stock, storeId } = req.body
        const updatedProduct = await Product.findByIdAndUpdate(productId,
            { brand, category, description, discountPrice, image, isOnOffer, name, price, stock, storeId },
            { new: true, runValidators: true }
        )
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getAllProducts,
    getProduct,
    postProduct,
    deleteProduct,
    updateProduct
}