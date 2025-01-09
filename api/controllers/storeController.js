const Store = require("../models/Store")

// Get all Stores
const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find({}).sort({createdAt : -1});
        res.status(200).json(stores)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get a store
const getStore = async (req, res) => {
    try {
        const storeId = req.params.id
        const store = await Store.findById(storeId)
        if (!store) {
            return res.status(404).json({ message: "Store is not found!" })
        }
        res.status(200).json(store)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Create a new store
const createStore = async (req, res) => {
    try {
        const { name, description, location, category, products, bannerImage, iconImage, floor, contact } = req.body;

        const newStore = new Store({
            name,
            description,
            location,
            category,
            bannerImage,
            iconImage,
            floor,
            contact,
        });

        const store = await newStore.save();

        res.status(201).json({
            message: 'Store created successfully',
            store,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating store',
            error: error.message,
        });
    }
};



// Delete a store by ID
const deleteStore = async (req, res) => {
    const storeId  = req.params.id;

    try {
        const store = await Store.findByIdAndDelete(storeId);

        if (!store) {
            return res.status(404).json({
                message: 'Store not found',
            });
        }

        res.status(200).json({
            message: 'Store deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting store',
            error: error.message,
        });
    }
};


// Update store details by ID
const updateStore = async (req, res) => {
    const storeId = req.params.id;
    const { name, description, location, category, bannerImage, iconImage, floor, contact } = req.body;
    try {
        const store = await Store.findByIdAndUpdate(
            storeId,
            {
                name,
                description,
                location,
                category,
                bannerImage,
                iconImage,
                floor,
                contact,
            },
            { new: true } // Return the updated store
        );
        if (!store) {
            return res.status(404).json({
                message: 'Store not found',
            });
        }
        res.status(200).json({
            message: 'Store updated successfully',
            store,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating store',
            error: error.message,
        });
    }
};



module.exports = {
    getAllStores,
    getStore,
    createStore,
    deleteStore,
    updateStore
}