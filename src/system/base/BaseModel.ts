import mongoose from "mongoose";

export default class BaseModel {
  private readonly _name: string;
  private readonly _structure: any;
  private _options: any;
  private _indexes: any;
  private model: any;
  constructor(name: string, structure: object, options: object, indexes: any) {
    this._name = name;
    this._structure = structure;
    this._options = options;
    this._indexes = indexes;
    this.init();
    return this;
  }
  init() {
    this._options.timestamps = true;
    try {
      const schema = new mongoose.Schema(this._structure, { ...this._options });
      this._indexes.forEach((indexParam: any) => {
        schema.index(indexParam);
      });
      this.model = mongoose.model(this._name, schema, this._name);
    } catch (e) {
      this.model = mongoose.model(this._name);
    }
  }
  async find(query: object = {}, limit?: number, sort?: object, skip?: number) {
    return await this.model
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }
  async findOne(
    query: object = {},
    limit?: number,
    sort?: object,
    skip?: number
  ) {
    return await this.model
      .findOne(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }
  async insert(data: object) {
    return await this.model(data).save();
  }
  async insertMany(data: object[]) {
    return await this.model.insertMany(data);
  }
  async update(_id: string, data: object, options: object = {}) {
    return await this.model
      .findOneAndUpdate({ _id }, { $set: data }, options)
      .exec();
  }
  async findOneAndUpdate(query: object, data: object, options: object = {}) {
    return await this.model
      .findOneAndUpdate(query, { $set: data }, options)
      .exec();
  }
  async updateMany(query: object, data: object) {
    return await this.model.updateMany(query, { $set: data }).exec();
  }
  async count(query: object) {
    return await this.model.countDocuments(query);
  }
  async removeMany(query: object) {
    return await this.model.deleteMany(query);
  }
  async removeOne(_id: string) {
    return await this.model.deleteOne({ _id });
  }
  async findById(_id: string) {
    return await this.model.findById({ _id });
  }
  async unsetField(_id: string, data: object, options: object = {}) {
    return await this.model
      .findOneAndUpdate({ _id }, { $unset: data }, options)
      .exec();
  }
  async groupBy(query: object) {
    try {
      return await this.model.aggregate(query).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
