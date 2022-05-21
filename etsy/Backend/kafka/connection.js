var kafka = require("kafka-node");
function ConnectionProvider() {
  this.getConsumer =  (topic_name)=> {
    // if (!this.kafkaConsumerConnection) {
    this.client = new kafka.KafkaClient(`54.82.11.107:2181`);
    //this.client = new kafka.Client("54.82.11.107:2181");
   
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on("ready", function () {
      console.log("client is  ready!");
    });
    // }
    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer =  ()=> {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient(`54.82.11.107:2181`);
      
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      //this.kafkaConnection = new kafka.Producer(this.client);
      console.log("producer is  ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
