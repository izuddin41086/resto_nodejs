module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          name: String,
          moto: String,
          submoto: String,
          description: String,
          address: String,
          email: String,
          phone: String,
          opening_hours: { type: String },
          wa: String,
          fb: String,
          twitter: String,
          instagram: String,
        },
        { timestamps: true , typeKey: '$type'}
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Profile = mongoose.model("profile", schema);
    return Profile;
};