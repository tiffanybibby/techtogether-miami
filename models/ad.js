import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Ad = new Schema(
  {
    organization_id: {
      type: Schema.Types.ObjectId,
      ref: 'organizations',
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true
    },
    volunteer_amount: {
      type: Number,
      required: true,
      select: false
    },
  },
  { timestamps: true }
)
export default mongoose.model('ads', Ad)
