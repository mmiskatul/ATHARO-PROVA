import mongoose from "mongoose";
import { env } from "@/lib/utils/env";

declare global {
  var mongooseCache:
    | {
        connection: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const globalCache = globalThis.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalThis.mongooseCache = globalCache;

export async function connectToDatabase() {
  if (globalCache.connection) {
    return globalCache.connection;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(env.MONGODB_URI, {
      bufferCommands: false,
    });
  }

  globalCache.connection = await globalCache.promise;
  return globalCache.connection;
}
