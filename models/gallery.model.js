module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          title: String,
          description: String,
          pic: String,
          id_product: String,
          is_profile: Number,
          published: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Gallery = mongoose.model("galleries", schema);
    return Gallery;
};