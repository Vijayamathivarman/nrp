const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const manpowerSchema = mongoose.Schema(
    {
        // manpowerId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: false,
        //     // Add any other options you need
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
         projectTeam: {
            type: Array,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: false,
            trim: true
        },
        nos: {
            type: Number,
            required: false,
            trim: true
        },
        day: {
            type: String,
            required: false,
            trim: true
        },

        hoursperDay: {
            type: Number,
            required: false,
            trim: true
        },
        salary: {
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

manpowerSchema.plugin(toJSON);
manpowerSchema.plugin(paginate);

const Manpower = mongoose.model('Manpower', manpowerSchema);
module.exports = Manpower;



// const mongoose = require("mongoose");
// const { paginate, toJSON } = require("./plugins");

// const manpowerSchema = mongoose.Schema(
//     {
//         projectCode: {
//             type: String,
//             required: true,
//             trim: true,
//             match: /^[a-zA-Z0-9]*$/, // Enforce alphanumeric constraint
//         },
//         projectActivity: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         projectMaster: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         nos: {
//             type: Number,
//             required: false,
//             trim: true,
//         },
//         day: {
//             type: String,
//             required: false,
//             trim: true,
//         },
//         hoursperDay: {
//             type: Number,
//             required: false,
//             trim: true,
//         },
//         salary: {
//             type: Number,
//             required: false,
//             trim: true,
//         },
//         total: {
//             type: Number,
//             required: false,
//             trim: true,
//         },
       
//                 projectTeamDetails: [
//                     {
//                         _id: {
//                             type: String,
//                             required: false,
//                             trim: true,
//                         },
//                         name: {
//                             type: String,
//                             required: false,
//                             trim: true,
//                         },
//                         employeeCode: {
//                             type: Number,
//                             required: false,
//                             trim: true,
//                         },
//                         category: {
//                             type: String,
//                             required: false,
//                             trim: true,
//                         },
//                     },
//                 ],
            
//         createdAt: {
//             type: Date,
//             required: false,
//         },
//         updatedAt: {
//             type: Date,
//             required: false,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// manpowerSchema.plugin(toJSON);
// manpowerSchema.plugin(paginate);

// const Manpower = mongoose.model('Manpower', manpowerSchema);
// module.exports = Manpower;
