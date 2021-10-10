import Server from "./Server";
import Database from "./Database";

export default class App {
  private readonly _name: string;
  private readonly _port: number;
  private readonly _apiEndPoint: string;
  private readonly _dbHost: string;
  private readonly _dbPort: number;
  private readonly _dbUser: string;
  private readonly _dbPassword: string;
  private readonly _dbDatabase: string;

  constructor(
    name: string,
    port: number,
    apiEndPoint: string,
    dbHost: string,
    dbPort: number,
    dbUser: string,
    dbPassword: string,
    dbDatabase: string
  ) {
    this._name = name;
    this._port = port;
    this._apiEndPoint = apiEndPoint;
    this._dbHost = dbHost;
    this._dbPort = dbPort;
    this._dbUser = dbUser;
    this._dbPassword = dbPassword;
    this._dbDatabase = dbDatabase;
  }
  async init() {
    Server.start(this._name, this._port, this._apiEndPoint);
    Database.connect(
      this._dbHost,
      this._dbPort,
      this._dbUser,
      this._dbPassword,
      this._dbDatabase
    );
  }
}
