const debug = require("debug")("server");
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
const app = require("./app");
require("./config/dbConnection");

app.listen(PORT, () => debug(`Listening on port ${PORT} `));
