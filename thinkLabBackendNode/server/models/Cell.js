const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const cellModel=Schema({
    cellId: {
        type: String,
        required: true,
        ref: "Cell",
    },
    manufacturer:{
        type: String,
        required: true,
    },
    model:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    formFactor:{
        type: String,
        required: true,
    },
    height:{
        type: String,
        required: true,
    },
    diameter:{
        type: String,
        required: true,
    },
    mass:{
        type: String,
        required: true,
    },
    volume:{
        type: String,
        required: true,
    },
    cellImage: {
        type: String,
        required: true,
    },
    parameters:{
        type: Schema.Types.Array,
        required: true,
    },
    soh:{
        type: Schema.Types.Decimal128,
        required: true
    },
    plot:{
        type: String,
        required: true,
    }

})
const CellModel = mongoose.model('Cell', cellModel);

module.exports = CellModel;