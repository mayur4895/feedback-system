import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback-system';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log('[v0] Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('[v0] Creating new MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URI)
      .then((mongoose) => {
        console.log('[v0] MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('[v0] MongoDB connection error:', error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
