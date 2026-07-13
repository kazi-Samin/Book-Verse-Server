import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress extends Document {
  userId: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>({
  userId: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, {
  timestamps: true
});

export const AddressModel = mongoose.model<IAddress>('Address', AddressSchema);
