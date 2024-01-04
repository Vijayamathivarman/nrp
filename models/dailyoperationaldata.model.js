
const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { string, number } = require("joi");


const dailyOperationalDataSchema = mongoose.Schema(
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
        projectCompany: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        date:
        {
            type: Date,
            required: true,
            trim: true,
        },
        projectMaster: {
            type: String,
            required: true,
            trim: true
        },
        projectActivity: {
            type: String,
            required: true,
            trim: true
        },
        chainage: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/,
        },
        jobidentification: {
            type: String,
            required: true,
            trim: true,
        },
        // manpowerId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'ManPower', // Replace 'AnotherTable' with the actual name of the referenced collection
        //     required: false,
        // },,


        manpower: [
            {
                 manpowerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
        },

                name: {
                    type: String,
                    required: false,
                    trim: true,
                },
                category: {
                    type: String,
                    required: false,
                    trim: true,
                },
                workinginTime: {
                    type: String,
                    required: false,
                    trim: true,
                },
                workingoutTime: {
                    type: String,
                    required: false,
                    trim: true,
                },
                manpowerDetails: {
                    projectCode: {
                        type: Number,
                        required: false,
                        trim: true,
                    },
                    projectActivity: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                    projectMaster: {
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
                    createTime: {
                        type: Date,
                        required: false
                    },
                    id: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: false
                    },

                },



            },
        ],

        comsumables: [
            {
                descriprtion: {
                    type: String,
                    required: false,
                    trim: true,
                },
                specification: {
                    type: String,
                    required: false,
                    trim: true,
                },
                quantity: {
                    type: Number,
                    required: false,
                    trim: true,
                },

                consumablesDetails: {
                    projectCode: {
                        type: Number,
                        required: false,
                        trim: true,
                    },
                    projectActivity: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                    projectMaster: {
                        type: String,
                        required: false,
                        trim: true
                    },
                    description: {
                        type: String,
                        required: false,
                        trim: true
                    },
                    specification: {
                        type: String,
                        required: false,
                        trim: true
                    },
                    uom: {
                        type: String,
                        required: false,
                        trim: true

                    },
                    thickness: {
                        type: Number,
                        required: false,
                        trim: true
                    },
                    quantity: {
                        type: String,
                        required: false,
                        trim: true
                    },
                    pricePerUnit: {
                        type: Number,
                        required: false,
                        trim: true

                    },
                    createTime: {
                        type: Date,
                        required: false
                    },
                    updatedTime: {
                        type: Date,
                        required: false
                    }
                },
            }
        ],


            toolandTackles: [
                {
                    description: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                    quantity: {
                        type: Number,
                        required: false,
                        trim: true,
                    },
                   
                    toolandTacklesDetails:{
                        projectCode: {
                            type: Number,
                            required: false,
                            trim: true,
                        },
                        projectActivity: {
                            type: String,
                            required: false,
                            trim: true,
                        },
                        projectMaster: {
                            type: String,
                            required: false,
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
                        createTime: {
                            type: Date,
                            required: false
                        },
                        updatedTime: {
                            type: Date,
                            required: false
                        }
        
                }
            },
            ],
            instruments: [
                {
                    description: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                    quantity: {
                        type: Number,
                        required: false,
                        trim: true,
                    },
                    instrumentsDetails:{
                        projectCode: {
                            type: Number,
                            required: false,
                            trim: true,
                        },
                        projectActivity: {
                            type: String,
                            required: false,
                            trim: true,
                        },
                        projectMaster: {
                            type: String,
                            required: false,
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
                        createTime: {
                            type: Date,
                            required: false
                        },
                        updatedTime: {
                            type: Date,
                            required: false
                        }
                    },
                }
            ],
           
            saftytools: [
                {
                    description: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                    quantity: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                   
                    saftytoolsDetails:{
                        projectCode: {
                            type: Number,
                            required: false,
                            trim: true,
                        },
                        projectActivity: {
                            type: String,
                            required: false,
                            trim: true,
                        },
                        projectMaster: {
                            type: String,
                            required: false,
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
                        createTime: {
                            type: Date,
                            required: false
                        },
                        updatedTime: {
                            type: Date,
                            required: false
                        },
                    }
                }
            ],
            
            machinery: [
                {
                    machine: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                    openingkm: {
                        type: Number,
                        required: false,
                        trim: true,
                    },
                    closingkm: {
                        type: Number,
                        required: false,
                        trim: true,
                    },
                    fuelQty: {
                        type: Number,
                        required: false,
                        trim: true,
                    },

                    fuelcost: {
                        type: Number,
                        required: false,
                        trim: true,

                    }, 
                    machineryDetails:{
                        projectCode: {
                            type: Number,
                            required: false,
                            trim: true,
                        },
                        projectActivity: {
                            type: String,
                            required: false,
                            trim: true,
                        },
                        projectMaster: {
                            type: String,
                            required: false,
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
                        createTime: {
                            type: Date,
                            required: false
                        },
                        updatedTime: {
                            type: Date,
                            required: false
                        }
                    },
                    
                }
            ]
       
    
    },


    {
        timestamps: true,
    }

);


dailyOperationalDataSchema.plugin(toJSON);
dailyOperationalDataSchema.plugin(paginate)


const Dailyoperationldata = mongoose.model('Dailyoperationldata', dailyOperationalDataSchema);
module.exports = Dailyoperationldata;
///////