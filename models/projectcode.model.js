const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectcodeSchema = mongoose.Schema(
    {

        projectCode: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/, // Allow alphanumeric and special characters
        },


        projectCompany: {
            type: String,
            required: true,
            trim: true,
        },

        periodStart: {
            type: Date,
            required: true
        },
        periodEnd: {
            type: Date,
            required: true
        },
        chainage: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/,
        },
        projectMaster: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
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


projectcodeSchema.plugin(toJSON);
projectcodeSchema.plugin(paginate);

/**
 * @typedef ProjectCode
 */
projectcodeSchema.statics.isprojectCodeTaken = async function (projectCode, excludeUserId) {
    const user = await this.findOne({ projectCode, _id: { $ne: excludeUserId } });
    return !!user;
};
const ProjectCode = mongoose.model('ProjectCode', projectcodeSchema);
module.exports = ProjectCode;