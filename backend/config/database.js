import mongoose from "mongoose";

const connectDatabase = () => {
  const NODE_ENV = process.env.NODE_ENV;
  let MONGO_DB_URI = "";

  if (NODE_ENV === "LOCAL") {
    MONGO_DB_URI = process.env.MONGO_DB_URI_LOCAL;
  } else if (NODE_ENV === "PRODUCTION") {
    MONGO_DB_URI = process.env.MONGO_DB_URI_PRODUCTION;
  }

  mongoose
    .connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectDatabase;
