import Schema from "mongoose";
import BaseModel from "../../system/base/BaseModel";

export default class CoursesModel extends BaseModel {
  constructor() {
    super(
      "courses",
      {
        name: String,
        description: String,
        teacherId: { ref: "users", type: Schema.Types.ObjectId }
      },
      { timestamps: true },
      [{ name: -1 }]
    );
  }
}
