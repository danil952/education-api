import BaseModel from "../../system/base/BaseModel";

export default class UsersTypesModel extends BaseModel {
  constructor() {
    super(
      "usersTypes",
      {
        type: String
      },
      { timestamps: true },
      [{ name: -1 }]
    );
  }
}
