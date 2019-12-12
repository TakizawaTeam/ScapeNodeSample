const MongoClient = require('mongodb').MongoClient;

exports = exports={
  connection: null,
  settings: {
    host: "localhost",
    port: "27017",
    option: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  connect: async function(_collback){
    const url = `mongodb://${this.settings.host}:${this.settings.port}/`;
    this.connection = await MongoClient.connect(url, this.settings.option);
    const result = await _collback(this.connection);

    this.connection.close();
    this.connection = null;
    return result;
  },
  get_collection: async function(name){
    const db_name = name.split("/")[0];
    const collection_name = name.split("/")[1];

    if(!this.connection) return "not connected...";
    let db = this.connection.db(db_name);
    let collection = db.collection(collection_name);
    return collection;
  }
}
module.exports = exports;
