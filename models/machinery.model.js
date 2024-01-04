const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const machinerySchema = mongoose.Schema(
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
        description: {
            type: String,
            required: false,
            trim: true
        },
        hours: {
            type: Number,
            required: false,
            trim: true
        },
        kiloMeter: {
            type: Number,
            required: false,
            trim: true
        },

        fuelQty: {
            type: Number,
            required: false,
            trim: true
        },
        noOfMachines: {
            type: Number,
            required: false,
            trim: true

        },
        total: {
            type: Number,
            required: false,
            trim: true
        },

        rate: {
            type: Number,
            required: false,
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
machinerySchema.plugin(toJSON);
machinerySchema.plugin(paginate)


const Machinery = mongoose.model('Machinery', machinerySchema);
module.exports = Machinery;