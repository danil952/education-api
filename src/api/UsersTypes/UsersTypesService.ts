import BaseService from "../../system/base/BaseService";
import UsersTypesModel from "./UsersTypesModel";

export default class UsersTypesService {
  public static UsersTypesServiceModel = new BaseService(new UsersTypesModel());
}
