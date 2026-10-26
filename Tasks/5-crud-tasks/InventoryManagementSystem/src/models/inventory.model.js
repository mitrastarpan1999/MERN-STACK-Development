const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    itemName: {
        type: String,
        required: [true, 'Itemname is required']
    },
    sku: {
        type: String,
        required: [true, 'sku is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    supplier: {
        type: String,
        required: [true, 'supplier is required']
    },
    purchasePrice: {
        type: Number,
        required: [true, 'purchasePrice is required']
    },
    sellingPrice: {
        type: Number,
        required: [true, 'sellingPrice is required']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required']
    },
    image: {
        type: String,
        // required: [true, 'image is required']
        default: 'Image'
    },
    
    warehouseLocation: {
        type: String,
        required: [true, 'warehouseLocation is required']
    },
    status: {
        type: String,
        default: 'available'
    } ,
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
})


const inventoryModel = mongoose.model('inventory', InventorySchema);

module.exports = inventoryModel