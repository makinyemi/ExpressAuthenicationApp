import app from "./app.ts";
import { config } from "./config/config.ts";

app.listen(config.PORT, () => {
  console.log(`App started on: http://localhost:${config.PORT}`);
});
