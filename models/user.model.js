module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
			username: String,
			fullname: String,
			email: String,
			password: String,
			published: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("users", schema);
    return User;
};