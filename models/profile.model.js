module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          name: String,
          address: String,
          email: String,
          phone: String,
          opening_hours: String,
          wa: String,
          fb: String,
          twitter: String,
          instagram: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Profile = mongoose.model("profile", schema);
    return Profile;
};