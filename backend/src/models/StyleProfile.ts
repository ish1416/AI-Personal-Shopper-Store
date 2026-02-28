import { Schema, model, Document, Types } from 'mongoose';

export interface StyleProfileDocument extends Document {
  userId: Types.ObjectId;
  preferences: string[];
  sizeDetails: string;
  aestheticType: string;
  favoriteColors: string[];
  budget: { min: number; max: number };
}

const styleProfileSchema = new Schema<StyleProfileDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    preferences: [{ type: String }],
    sizeDetails: { type: String, default: '' },
    aestheticType: { type: String, default: 'casual' },
    favoriteColors: [{ type: String }],
    budget: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 10000 },
    },
  },
  { timestamps: true }
);

export const StyleProfile = model<StyleProfileDocument>('StyleProfile', styleProfileSchema);
