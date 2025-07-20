import mongoose from 'mongoose'

const typeSchema = new mongoose.Schema({
  type: String,
  meanings: String,
  notes: [String],
}, { _id: false }); 

const wordSchema = new mongoose.Schema(
  {
    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Library',
      required: true,
    },
    word: { type: String, required: true },
    pronunciation: String,
    types: [typeSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)


export default mongoose.models.Word || mongoose.model('Word', wordSchema)
