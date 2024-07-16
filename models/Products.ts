const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    },
    transmission: {
      type: String,
      required: true,
      enum: ['Manual', 'Automatic'],
    },
    engineSize: {
      type: Number,
      required: true,
    },
    horsepower: {
      type: Number,
      required: true,
    },
    torque: {
      type: Number,
      required: true,
    },
    drivetrain: {
      type: String,
      required: true,
      enum: ['FWD', 'RWD', 'AWD', '4WD'],
    },
    doors: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Products = mongoose.models.Products || mongoose.model('Products', productSchema);

export default Products;
