import mongoose from "mongoose";

export default class Database {
  static connect(
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
  ) {
    mongoose.connect("mongodb://" + host + ":" + port, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      user,
      pass: password,
      dbName: database
    });
  }
}
