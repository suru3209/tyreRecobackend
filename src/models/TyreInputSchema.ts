import mongoose, { Schema, Document, Model } from "mongoose";

// Step 1: Interface for Type Safety
export interface ITyre extends Document {
  billDate: string;
  fitmentDate?: string;
  truckNo: string;
  newTyreModel: string;
  newTyreNo: string;
  oldTyreModel?: string;
  oldTyreNo?: string;
  reasonOfRemove?: string;
  fitmentKM?: string;
  mileage?: string;
  dealerName: string;
  billNo: string;
  payment: string;
  withoutGstPay?: string;
}

// Step 2: Schema
const tyreSchema: Schema = new Schema<ITyre>({
  billDate: { type: String, required: true },
  fitmentDate: { type: String, default: "STOCK" },
  truckNo: { type: String, required: true },
  newTyreModel: { type: String, required: true },
  newTyreNo: { type: String, required: true },
  oldTyreModel: { type: String },
  oldTyreNo: { type: String },
  reasonOfRemove: { type: String },
  fitmentKM: { type: String },
  mileage: { type: String },
  dealerName: { type: String, required: true },
  billNo: { type: String, required: true },
  payment: { type: String, required: true },
  withoutGstPay: { type: String },
});

// Step 3: Model
export const TyreModel: Model<ITyre> =
  mongoose.models.TyreModel || mongoose.model<ITyre>("TyreModel", tyreSchema);
