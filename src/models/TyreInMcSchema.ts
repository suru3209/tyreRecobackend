import type { Document, Model, Schema as SchemaType } from 'mongoose';
import mongoose from 'mongoose';

const Schema = mongoose.Schema

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

const TyreMcSchema: SchemaType<ITyreMc> = new Schema(
  {
    billDate: { type: String, required: true, trim: true },
    fitmentDate: { type: String, default: "STOCK", trim: true },
    truckNo: { type: String, required: true, trim: true },
    newTyreModel: { type: String, required: true, trim: true },
    newTyreNo: { type: String, required: true, trim: true, unique: true },
    billingFirm: { type: String, required: true, trim: true },
    dealerName: { type: String, required: true, trim: true },
    billNo: { type: String, required: true, trim: true },
    payment: { type: String, required: true, trim: true },
    withoutGstPay: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const TyreMcModel: Model<ITyreMc> = mongoose.model<ITyreMc>(
  "TyreMcModel",
  TyreMcSchema
);
