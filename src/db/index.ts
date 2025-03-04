import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  try {
    // for query purposes
    const queryClient = postgres(process.env.DATABASE_URL || '');
    const db = drizzle(queryClient);
    return db;
  }
  catch (error) {
    throw new Error(`Could not connect to DB: ${error}`)
  }
};

export default setup();
