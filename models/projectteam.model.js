
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const projectteamSchema = mongoose.Schema(
    {
        // projectCode: {
        //     type: Number,
        //     required: true,
        // },
        projectCode: {
            type: String,
            required: true,
            trim: true,
            match: /^[a-zA-Z0-9]*$/, // Enforce alphanumeric constraint
        },
        projectCompany: {
            type: String,
            required: true,
        },

        projectTeam: [
            {

                name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                employeeCode: {
                    type: Number,
                    required: true,
                    trim: true,
                },
                category: {
                    type: String,
                    required: true,
                    trim: true,
                },

            },
        ],
    },
    {
        timestamps: true,
    }
);
//v

projectteamSchema.plugin(toJSON);
projectteamSchema.plugin(paginate);

const projectTeam = mongoose.model('projectTeam', projectteamSchema);

module.exports = projectTeam;
