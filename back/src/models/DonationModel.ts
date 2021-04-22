const Mongoose = require('mongoose');

const modelName = 'Donation'

const schema = new Mongoose.Schema(
    {
        currency: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "Donations"
    }
);

schema.method('mapToRest', function() {
    const obj = this.toObject();

    // Delete fields
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;

    return obj;
});

Mongoose.model(modelName, schema);

const donationModel = Mongoose.model(modelName);
export default donationModel;
