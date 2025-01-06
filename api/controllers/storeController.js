const Store = require("../models/Store")

const getAllStores = async (req, res) =>{
    try {
        const stores = await Store.find({})
        res.status(200).json(stores)
    } catch (error) {
        res.status(500).json({message : error.message })
    }
}

const getStore = async(req, res) => {
    try {
        const storeId = req.params.id 
        const store = await Store.findById(storeId)
        if(!store){
            return res.status(404).json({message : "Store is not found!"})
        }
        res.status(200).json(store)
    } catch (error) {
        res.status(500).json({message : error.message })
    }
}

module.exports = {
    getAllStores,
    getStore

}