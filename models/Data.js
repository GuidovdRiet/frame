const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
    {
        type: {
            type: String
        },
        value: {
            type: Number
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

module.exports = mongoose.model('Data', dataSchema);
