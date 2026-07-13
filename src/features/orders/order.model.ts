import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  bookId: mongoose.Types.ObjectId;
  title: string;
  price: number;
  quantity: number;
  coverImage?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  userId: string;
  userEmail: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  shippingAddress: {
    fullName: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  coverImage: { type: String }
});

const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  items: { type: [OrderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  }
}, {
  timestamps: true
});

OrderSchema.pre('validate', function(next: any) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `ORD-${year}${randomNum}`;
  }
  next();
});

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
