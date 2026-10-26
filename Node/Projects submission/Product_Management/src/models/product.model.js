const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: [String],
      default: [
        "https://img.magnific.com/free-photo/shirt_1203-8194.jpg?semt=ais_hybrid&w=740&q=80",
      ],
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
      required: [true, "Price is required"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      default: 0,
    },
    category: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      default: "Men",
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL"],
    },
    colors: {
      type: [String],
      default: ["Red", "Green", "Blue"],
    },
    stock: {
      type: Number,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    sku: {
      type: String,
      default: "TSHIRT-001",
    },
    publicImageID: {
      type: [String],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
