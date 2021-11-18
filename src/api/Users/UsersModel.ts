import Schema from "mongoose";
import BaseModel from "../../system/base/BaseModel";

export default class UsersModel extends BaseModel {
  constructor() {
    super(
      "users",
      {
        fio: String,
        login: String,
        password: String,
        type: { ref: "usersTypes", type: Schema.Types.ObjectId }
      },
      { timestamps: true },
      [{ name: -1 }]
    );
  }
}
