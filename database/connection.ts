import mongoose, { Connection, ConnectOptions } from "mongoose";

const LOCAL_HOST = "mongodb://127.0.0.1:27017/rachelle-test";

export default {
  openDBConnection(): Connection & Promise<Connection> {
    const options: ConnectOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    return mongoose.createConnection(LOCAL_HOST, options);
  },
  closeDBConnection(conn: Connection): Promise<void> {
    return conn.close();
  },
};
