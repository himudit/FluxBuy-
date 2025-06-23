const mongoose = require('mongoose');

// --- Subdocument: Review
const reviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
    date: Date,
    reviewerName: String,
    reviewerEmail: String
}, { _id: false });

// --- Subdocument: Dimensions
const dimensionsSchema = new mongoose.Schema({
    width: Number,
    height: Number,
    depth: Number
}, { _id: false });

// --- Subdocument: Meta
const metaSchema = new mongoose.Schema({
    createdAt: Date,
    updatedAt: Date,
    barcode: String,
    qrCode: String
}, { _id: false });

// --- Main Product Schema
const productSchema = new mongoose.Schema({
    apiId: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    sku: String,
    weight: Number,
    dimensions: dimensionsSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    returnPolicy: String,
    minimumOrderQuantity: Number,
    thumbnail: String,
    images: [String],
    reviews: [reviewSchema],
    meta: metaSchema
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
// export default Product;
