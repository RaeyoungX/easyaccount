import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  key: { type: String, required: true },
});
const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;