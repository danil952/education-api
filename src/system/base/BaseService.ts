import BaseModel from "./BaseModel";

export default class BaseService {
  constructor(model: BaseModel) {
    this.model = model;
  }
  private readonly model: any;
  async insertData(data: object, options: object = {}) {
    return await this.model.insert(data, options);
  }
  async getData(query: object, sort: object, size: number, skip: number) {
    const result = await this.model.find(query, size, sort, skip);
    return result.length ? result : null;
  }
  async getDataByQuery(query: object) {
    const result = await this.model.find(query);
    return result.length ? result : null;
  }
  async updateData(_id: string, data: object, options: object = {}) {
    return await this.model.update(_id, data, options);
  }
  async dataExists(query?: object): Promise<boolean> {
    const count = await this.model.count(query);
    return count > 0;
  }
  async deleteData(_id: string) {
    return await this.model.removeOne(_id);
  }
  async deleteMany(query: object) {
    return await this.model.removeMany(query);
  }
  async findById(_id: string) {
    return await this.model.findById(_id);
  }
  async groupBy(query: object) {
    return await this.model.groupBy(query);
  }
  async insertMany(data: object[]) {
    return await this.model.insertMany(data);
  }
  async findOne(query: object) {
    return await this.model.findOne(query);
  }
  async find(query: object) {
    return await this.model.find(query);
  }
  async findOneAndUpdate(query: object, data: object, options: object = {}) {
    return await this.model.findOneAndUpdate(query, data, options);
  }
  async dataCount(query?: object): Promise<number> {
    return await this.model.count(query);
  }
  async unsetField(_id: string, data?: object, options: object = {}) {
    return await this.model.unsetField(_id, data, options);
  }
  async updateMany(query: object, data: object) {
    return await this.model.updateMany(query, data);
  }
  async getDefault() {
    return await this.model.findOne({ default: true });
  }
}
