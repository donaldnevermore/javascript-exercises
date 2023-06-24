import events from "events";

const eventEmitter = new events.EventEmitter();

const connectHandler = () => {
  console.log("Connected.");

  eventEmitter.emit("data_received");
};

eventEmitter.on("connection", connectHandler);

eventEmitter.on("data_received", () => {
  console.log("Received.");
});

eventEmitter.emit("connection");

console.log("Done.");
