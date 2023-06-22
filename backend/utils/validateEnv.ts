import { cleanEnv } from "envalid"; // this is a library that helps us validate our environment variables and make sure that they are present and of the correct type
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port(),
});
