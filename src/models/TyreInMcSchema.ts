import mongoose from "mongoose";

// Schema
const tyresSchema = new mongoose.Schema({
  billDate: String,
  fitmentDate: {
    type: String,
    default: "STOCK",
  },
  truckNo: String,
  newTyreModel: String,
  newTyreNo: String,
  billingFirm: String,
  dealerName: String,
  billNo: String,
  payment: String,
  withoutGstPay: String,
});

export const TyreMcModel = mongoose.model("TyreMcModel", tyresSchema);
