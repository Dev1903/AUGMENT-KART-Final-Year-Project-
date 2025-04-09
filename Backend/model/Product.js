const productSchema = mongoose.Schema({
    name: String,
    price: String,
    description: String,
    image: String,
    sold: {type: Number, default: 0},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    brand: String,
    stockQuantity: String,
    rating: Number,
    sku: String,


});

const Product = mongoose.model('Product', productSchema);

export default Product;