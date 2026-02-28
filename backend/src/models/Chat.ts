import { Schema, model, Document, Types } from 'mongoose';

export interface ChatSessionDocument extends Document {
  userId: Types.ObjectId;
  title: string;
  startedAt: Date;
}

export interface ChatMessageDocument extends Document {
  sessionId: Types.ObjectId;
  senderType: 'user' | 'ai';
  messageContent: string;
  sentAt: Date;
}

const chatSessionSchema = new Schema<ChatSessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'New Chat' },
    startedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const chatMessageSchema = new Schema<ChatMessageDocument>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: 'ChatSession', required: true },
    senderType: { type: String, enum: ['user', 'ai'], required: true },
    messageContent: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ChatSession = model<ChatSessionDocument>('ChatSession', chatSessionSchema);
export const ChatMessage = model<ChatMessageDocument>('ChatMessage', chatMessageSchema);
