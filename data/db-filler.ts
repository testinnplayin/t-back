import { Connection } from "mongoose";
import dbConnector from "../database/connection";

import faker from "faker";

import { ThingSchema } from "../src/models/thing-schema";
import { ThingInterface } from "../src/interfaces/thing-interface";
import { cleanUpThings } from "../database/helpers";

// Number of MongoDB documents of type "Thing" is arbitrarily capped at 10
const NUM_OF_DOCS = 10;

// ProtoThingDocument -> what will become a Mongoose Thing
interface ProtoThingDoc {
  prop1: string;
  prop2: string;
  prop3: string;
}

function createData() {
  const newProtoThings: ProtoThingDoc[] = [];

  for (let i = 0; i < NUM_OF_DOCS; i++) {
    const newProtoThing: ProtoThingDoc = {
      prop1: faker.random.word(),
      prop2: faker.random.word(),
      prop3: faker.random.word(),
    };
    newProtoThings.push(newProtoThing);
  }

  return newProtoThings;
}

async function runScripts(): Promise<void> {
  console.log("---- Running scripts to fill database ----");
  const newDocs = createData();

  const conn: Connection = await dbConnector.openDBConnection();
  await cleanUpThings(conn);

  const Thing = conn.model<ThingInterface>("Thing", ThingSchema);
  await Thing.bulkWrite(
    newDocs.map((newDoc) => {
      return {
        insertOne: {
          document: newDoc,
        },
      };
    })
  );

  console.log("---- Database filled, closing connection to database ----");
  await dbConnector.closeDBConnection(conn);
}

export { runScripts };
