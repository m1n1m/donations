const Mongoose = require('mongoose');

const modelName = 'Currency'

const schema = new Mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
        },
        code: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
        },
        symbol: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
        },
        rates: [{
            code: {type: String, required: true},
            rate: {type: Number, required: true}
        }]
    },
    {
        timestamps: true,
        collection: "Currencies"
    },
);

schema.method('mapToRest', function() {
    const obj = this.toObject();

    // Delete fields
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;

    if (obj.rates) {
        obj.rates.forEach(rate => {
            delete rate._id
        })
    }

    return obj;
});

Mongoose.model(modelName, schema);

const currencyModel = Mongoose.model(modelName);
export default currencyModel;
