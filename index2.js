const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017`;

(async function(){
  client = await MongoClient.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});
  db = client.db("scape_node");
  collection = db.collection("nodes");
  //console.log(collection);

  search = collection.find();
  data_arr = await search.toArray();
  console.log(data_arr);
})();
