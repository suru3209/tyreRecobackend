// import mongoose from "mongoose";

// // Schema
// const tyresSchema = new mongoose.Schema({
//   billDate: String,
//   fitmentDate: {
//     type: String,
//     default: "STOCK",
//   },
//   truckNo: String,
//   newTyreModel: String,
//   newTyreNo: String,
//   billingFirm: String,
//   dealerName: String,
//   billNo: String,
//   payment: String,
//   withoutGstPay: String,
// });

// export const TyreMcModel = mongoose.model("TyreMcModel", tyresSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

// Interface define karo
export interface ITyreMc extends Document {
  billDate: string;
  fitmentDate?: string;
  truckNo: string;
  newTyreModel: string;
  newTyreNo: string;
  billingFirm: string;
  dealerName: string;
  billNo: string;
  payment: string;
  withoutGstPay: string;
}

// Schema
const TyreMcSchema: Schema<ITyreMc> = new Schema(
  {
    billDate: { type: String, required: true },
    fitmentDate: { type: String, default: "STOCK" },
    truckNo: { type: String, required: true },
    newTyreModel: { type: String, required: true },
    newTyreNo: { type: String, required: true },
    billingFirm: { type: String, required: true },
    dealerName: { type: String, required: true },
    billNo: { type: String, required: true },
    payment: { type: String, required: true },
    withoutGstPay: { type: String, required: true },
  },
  { timestamps: true } // automatic createdAt & updatedAt
);

// Model
export const TyreMcModel: Model<ITyreMc> = mongoose.model<ITyreMc>(
  "TyreMcModel",
  TyreMcSchema
);
