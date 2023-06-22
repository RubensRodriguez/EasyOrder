import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productMeasure: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: false,
    default: "No description available"
  }
});


const SupplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  supplierEmail: {
    type: String,
    required: true,
  },
  supplierPhoneNumber: {
    type: Number,
    required: false,
  },
  products: {
    type: [ProductSchema],
    required: false,
    default: [],
  },
});


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  suppliers: {
    type: [SupplierSchema],
    required: false,
    default: []
  }
});


const User = mongoose.model("User", UserSchema);

export default User;
