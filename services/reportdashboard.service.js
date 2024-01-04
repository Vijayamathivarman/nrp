const { Consumables } = require("../models");
const Dailyoperationldata = require("../models/dailyoperationaldata.model");
const Intruments = require("../models/instruments.model");
const Machinery = require("../models/machinery.model");
const SaftyTools = require("../models/saftytools.model");
const Toolsandtackles = require("../models/toolsandtackles.model");


const calculateConsumableExpenses = async (filter) => {
    const consumables = await Consumables.find(filter); // Assuming there's a Consumables model

    
    const Consumablesplanned = consumables.map(item => {

        const projectMaster=item.projectMaster;
       const  projectCode=item.projectCode;
        const description = item.description;
        const total = item.pricePerUnit * item.quantity;
console.log("plannes"+JSON.stringify(total))
        // Include other properties from 'item' if needed
        return {
            projectMaster,
            projectCode,
            description,
            total,
        };
    });
    const dailyOperationData = await Dailyoperationldata.find(filter);

    // Extract consumable details from consumables array in dailyOperationData
    const consumableActual= dailyOperationData
        .flatMap(item => item.comsumables.map(consumableItem => ({
            date:item.date,
            projectCode:item.projectCode,
            // projectCode: consumableItem.consumablesDetails.projectCode,
            description: consumableItem.descriprtion,
            totalPrice: consumableItem.consumablesDetails.pricePerUnit * consumableItem.quantity,
            projectMaster: item.projectMaster
        })))
        .flat(); // Flatten the array
    
    // Calculate the sum of all totalPrice values
    const actualExpense = consumableActual.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    
    // Calculate the sum of all consumables' prices * quantity
    const plannedTotalSum = consumables.reduce((sum, item) => sum + item.pricePerUnit * parseFloat(item.quantity), 0);
    
    return {
        
        Consumablesplanned,
        consumableActual,
        actualExpense,
        plannedTotalSum
    };
    
    
};







//         // const calculateConsumableExpenses = async (filter) => {
//         //     const consumables = await Consumables.find(filter); // Assuming there's a Consumables model
//         //     const dailyOperationData = await Dailyoperationldata.find(filter); // Assuming there's a Dailyoperationldata model
        
//         //     // Extract consumable details from consumables array in dailyOperationData
//         //     const consumableDetails = dailyOperationData
//         //         .flatMap(item => item.comsumables)
//         //         .map(consumableItem => ({
//         //             projectCode:consumableItem.consumablesDetails.projectCode,
//         //             description: consumableItem.descriprtion,
//         //             totalPrice: consumableItem.consumablesDetails.pricePerUnit * consumableItem.quantity
//         //         }));
        
//         //     // Calculate the sum of all totalPrice values
//         //     const actualExpense = consumableDetails.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
        
//         //     // Calculate the sum of all consumables' prices * quantity
//         //     const plannedTotalSum = consumables.reduce((sum, item) => sum + item.pricePerUnit * parseFloat(item.quantity), 0);
        
//         //     return {
//         //         consumableDetails,
//         //         actualExpense,
//         //         plannedTotalSum
//         //     };
//         // };

      
   
   



const machineryexpense = async (filter) => {
    // Planned Expenses
    const machineryPlanned = await Machinery.find(filter);
    
    const plannedDetails = machineryPlanned.map(item => {
        const projectMaster=item.projectMaster;
       const  projectCode=item.projectCode;
        const total = item.rate * item.fuelQty;

        // Include other properties from 'item' if needed
        return {
            projectMaster,
            projectCode,
            total,
        };
    });

    const plannedQty = plannedDetails.reduce((sum, item) => sum + item.total, 0);

    // Actual Expenses
    const machineryActualData = await Dailyoperationldata.find(filter);

    const actualDetails = machineryActualData.flatMap(item => {
        return item.machinery.map(machineItem => {
            const  date= item.date;
          const  projectMaster= item.projectMaster
            const  projectCode=item.projectCode;
            const total = machineItem.fuelQty * machineItem.fuelcost;
            
            // Include other properties from 'machineItem' if needed
            return {
                date,
                projectMaster,
                projectCode,
                total,
            };
        });
    });


    const actualQty = actualDetails.reduce((sum, item) => sum + item.total, 0);

    return { plannedDetails, plannedQty, actualDetails, actualQty };
};





const ToolsandtacklesExpenses = async (filter) => {
   
    const Toolsandtacklesplanned = await Toolsandtackles.find(filter);
    console.log("tools planned" + JSON.stringify(Toolsandtacklesplanned));


    const plannedExpense = Toolsandtacklesplanned.map(item => ({
        projectMaster:item.projectMaster,
        projectCode: item.projectCode,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        plannedExpense: item.price * item.quantity
    }));
    console.log("tools planned" + JSON.stringify(plannedExpense));

    const Toolsandtacklesactual = await Dailyoperationldata.find(filter);

    const actualDetails = Toolsandtacklesactual.flatMap(item => {
        return item.toolandTackles.map(toolandTacklesItem => {
            projectMaster= item.projectMaster;
            // projectCode=  toolandTacklesItem.toolandTacklesDetails.projectCode;
            date= item.date;
            projectCode=  item.projectCode;
            const quantity = toolandTacklesItem.quantity;
            const price = toolandTacklesItem.toolandTacklesDetails.price;

            return {
                date,
                projectMaster,
                projectCode,
                description: toolandTacklesItem.description,
                price: toolandTacklesItem.toolandTacklesDetails.price,
                quantity: toolandTacklesItem.quantity,
               actualExpenseExpense: quantity * price,
               
              
            };
        });
    });

    console.log("tools actual" + JSON.stringify(actualDetails));

   
    return {
        plannedExpense,
        actualDetails,
   
    };
};

const instrumentsExpenses = async (filter) => {
   
    const Intrumentsplanned = await Intruments.find(filter);
    // console.log("tools planned" + JSON.stringify(Toolsandtacklesplanned));


    const plannedExpense = Intrumentsplanned.map(item => ({
        projectMaster:item.projectMaster,
        projectCode: item.projectCode,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        plannedExpense: item.price * item.quantity
    }));
    console.log("tools planned" + JSON.stringify(plannedExpense));

    const Intrumentsactual = await Dailyoperationldata.find(filter);

    const actualDetails = Intrumentsactual.flatMap(item => {
        return item.instruments.map(instrumentsItem => {
           const projectMaster= item.projectMaster;
            // const projectCode = instrumentsItem.instrumentsDetails.projectCode;
            date= item.date;
            projectCode=  item.projectCode;
            const quantity = instrumentsItem.quantity;
            const price = instrumentsItem.instrumentsDetails.price;

            return {
                date,
                projectMaster,
                projectCode,
                description: instrumentsItem.description,
                price: instrumentsItem.instrumentsDetails.price,
                quantity: instrumentsItem.quantity,
               actualExpenseExpense: quantity * price,
               
              
            };
        });
    });

    console.log("tools actual" + JSON.stringify(actualDetails));

   
    return {
        plannedExpense,
        actualDetails,
   
    };
};

const saftytoolsExpenses = async (filter) => {
   
    const saftytoolsplanned = await SaftyTools.find(filter);
    // console.log("tools planned" + JSON.stringify(Toolsandtacklesplanned));
    

    const plannedExpense = saftytoolsplanned.map(item => ({
        projectMaster:item.projectMaster,
        projectCode:item.projectCode,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        plannedExpense: item.price * item.quantity
    }));
    console.log("tools planned" + JSON.stringify(plannedExpense));

    const saftytoolsactual = await Dailyoperationldata.find(filter);

    const actualDetails = saftytoolsactual.flatMap(item => {
        return item.saftytools.map(saftytoolsItem => {
            const date= item.date;
            const projectMaster= item.projectMaster;
          const  projectCode=  item.projectCode;
            // projectCode=saftytoolsItem.saftytoolsDetails.projectCode;
            const quantity = saftytoolsItem.quantity;
            const price = saftytoolsItem.saftytoolsDetails.price;

            return {
                date,
                projectMaster,
                projectCode,
                description: saftytoolsItem.description,
                price: saftytoolsItem.saftytoolsDetails.price,
                quantity: saftytoolsItem.quantity,
               actualExpenseExpense: quantity * price,
               
              
            };
        });
    });

    console.log("tools actual" + JSON.stringify(actualDetails));

   
    return {
        plannedExpense,
        actualDetails,
   
    };
};

// module.exports={calculateConsumableExpenses,machineryexpense,ToolsandtacklesExpenses,instrumentsExpenses,saftytoolsExpenses}


////////////////////////////////////////////////////////////////////////




module.exports={calculateConsumableExpenses,machineryexpense,ToolsandtacklesExpenses,instrumentsExpenses,saftytoolsExpenses}