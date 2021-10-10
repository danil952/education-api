// tslint:disable-next-line:no-var-requires
const tsNode = require("ts-node");

tsNode.register({
  files: true,
  transpileOnly: true,
  project: "./tsconfig.json"
});
