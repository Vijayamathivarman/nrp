const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectmasterSchema = mongoose.Schema(
    {
        projectMaster: {
            type: String,
            required: true,
            trim: true,
        },
        projectMasterActivity: {
            type: Array,
            required: true,
            trim: true,
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

projectmasterSchema.plugin(toJSON);
projectmasterSchema.plugin(paginate);




/**
 * @typedef ProjectMaster
 */
const ProjectMaster = mongoose.model('ProjectMaster', projectmasterSchema);

module.exports = ProjectMaster;
