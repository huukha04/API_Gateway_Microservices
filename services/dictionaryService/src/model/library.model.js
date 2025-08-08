import mongoose from 'mongoose'

const librarySchema = new mongoose.Schema(
  {
    title: String,
    user: {
      id: String,
      name: String,
    },
    language: String,
    isPublic: {
      type: Boolean,
      default: false,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Tránh ghi đè model khi dùng ở môi trường dev (Next.js, Vite, v.v.)
export default mongoose.models.Library || mongoose.model('Library', librarySchema)
