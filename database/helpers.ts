import { Connection } from "mongoose";

export const cleanUpThings = async (conn: Connection): Promise<void> => {
  console.log("---- Cleaning up old database ----");
  return await conn.dropDatabase();
};
