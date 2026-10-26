const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ProductSchema = schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    brand: {
        type: String,
        required: [true, 'Brand is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    },
    image: {
      type: String,
      default: "https://media.bazaarvoice.com/Shutterstock_1875797686.png",
    },

    status: {
        type: String,
        default: 'is available'
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("productsTask", ProductSchema);

module.exports = productModel;
