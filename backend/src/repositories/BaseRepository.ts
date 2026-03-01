import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}
