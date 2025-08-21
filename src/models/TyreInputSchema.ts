import mongoose from "mongoose";

// Schema
const tyreSchema = new mongoose.Schema({
  billDate: String,
  fitmentDate: {
    type: String,
    default: "STOCK",
  },
  truckNo: String,
  newTyreModel: String,
  newTyreNo: String,
  oldTyreModel: String,
  oldTyreNo: String,
  reasonOfRemove: String,
  fitmentKM: String,
  mileage: String,
  dealerName: String,
  billNo: String,
  payment: String,
  withoutGstPay: String,
});

export const TyreModel = mongoose.model("TyreModel", tyreSchema);
