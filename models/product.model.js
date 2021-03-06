module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          categoryId: String,
          title: String,
          description: String,
          price: mongoose.Decimal128,
          pic: String,
          published: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Product = mongoose.model("products", schema);
    return Product;
};