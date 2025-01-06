const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required : false,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true, // e.g., "Electronics", "Fashion", etc.
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    bannerImage: {
        type: String, // URL or file path for the banner image
        required: true, // Optional if some stores may not have a banner
    },
    iconImage: {
        type: String, // URL or file path for the store icon
        required: true, // Optional if some stores may not have an icon
    },
    floor: {
        type: Number, // Store's floor number in the mall
        required: true,
    },
    contact : {
        type : String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Store', storeSchema);
