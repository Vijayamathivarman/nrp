const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const { required } = require("joi");

const consumablesSchema = mongoose.Schema(
    {
        // projectCode: {
        //     type: Number,
        //     required: true,
        //     trim: true,
        // },
        projectCode: {
            type: String,
            required: true,
            trim: true,
            match: /^[a-zA-Z0-9]*$/, // Enforce alphanumeric constraint
        },
        projectActivity: {
            type: String,
            required: true,
            trim: true,
        },
        projectMaster: {
            type: String,
            required: true,
            trim: true
        },
         projectCompany: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        specification: {
            type: String,
            required: false,
            trim: true
        },
        uom: {
            type: String,
            required: true,
            trim: true

        },
        thickness: {
            type: Number,
            required: true,
            trim: true
        },
        quantity: {
            type: String,
            required: true,
            trim: true
        },
        pricePerUnit: {
            type: Number,
            required: true,
            trim: true

        },
        createAt: {
            type: Date,
            required: false
        },
        updateAt: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true,
    }
);
consumablesSchema.plugin(toJSON);
consumablesSchema.plugin(paginate)


const Consumables = mongoose.model('Consumables', consumablesSchema);
module.exports = Consumables;