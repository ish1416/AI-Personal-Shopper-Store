import mongoose from 'mongoose';

class Database {
  private static instance: Database;
  private isConnected = false;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(): Promise<void> {
    if (this.isConnected) return;

    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
    this.isConnected = true;
    console.log('✅ MongoDB connected');
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.isConnected = false;
  }
}

export default Database.getInstance();
