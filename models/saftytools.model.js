const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const saftyToolsSchema = mongoose.Schema(
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
        quantity: {
            type: Number,
            required: false,
            trim: true
        },
        price: {
            type: Number,
            required: false,
            trim: true
        },
        total: {
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
saftyToolsSchema.plugin(toJSON);
saftyToolsSchema.plugin(paginate)


const SaftyTools = mongoose.model('SaftyTools', saftyToolsSchema);
module.exports = SaftyTools;