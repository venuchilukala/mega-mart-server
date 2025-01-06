const Cart = require('../models/Cart');
const User = require('../models/User');

// get cart by email
const getCartByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email }
        const result = await Cart.findOne(query).exec()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// post and update a cart 
const addAndUpdateCart = async (req, res) => {
    const { productId, quantity, email } = req.body;

    try {
        let cart = await Cart.findOne({ email });

        if (!cart) {
            cart = new Cart({
                email,
                products: [{ product: productId, quantity }],
            });
            await cart.save();
            return res.status(201).json(cart); // Cart created
        } else {
            const productIndex = cart.products.findIndex(
                (item) => item.product.toString() === productId
            );

            if (productIndex !== -1) {
                const updatedQuantity = cart.products[productIndex].quantity + quantity;

                if (updatedQuantity <= 0) {
                    cart.products.splice(productIndex, 1);
                } else {
                    cart.products[productIndex].quantity = updatedQuantity;
                }
            } else {
                cart.products.push({ product: productId, quantity });
            }
            cart.updatedAt = Date.now();
            await cart.save();
            return res.status(200).json(cart); // Cart updated
        }
    } catch (error) {
        console.error("Error in addAndUpdateCart:", error);
        res.status(500).json({ message: error.message });
    }
};


// delete a product 
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const email = req.query.email;

        const cart = await Cart.findOne({ email: email });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this email' });
        }

        const productIndex = cart.products.findIndex(product => product.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.products.splice(productIndex, 1);

        const updatedCart = await cart.save();

        return res.status(200).json({ message: "deleted product " });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




const clearCart = async (req, res) => {
    const cartId = req.params.id; // Or use req.body.email if preferred
    console.log(`Clearing cart for email: ${cartId}`);

    try {
        // Delete all cart items associated with the email
        const result = await Cart.findByIdAndDelete(cartId);

        console.log(result);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No cart items found for the given email." });
        }

        res.status(200).json({ message: `Successfully cleared ${result.deletedCount} cart items.` });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: error.message || "An unexpected error occurred." });
    }
};



// // delete a cart 
// const deleteCart = async (req, res) => {
//     const cartId = req.params.id 
//     try {
//         const deletedCart = await Cart.findByIdAndDelete(cartId)
//         if(!deletedCart){
//             return res.status(401).json({message : "Cart Item not found"})
//         }
//         res.status(200).json({message : "Cart Item deleted successfully!"})
//     } catch (error) {
//         res.status(500).json({message : error.message})
//     }

// }


module.exports = {
    getCartByEmail,
    addAndUpdateCart,
    deleteProduct,
    clearCart,
}