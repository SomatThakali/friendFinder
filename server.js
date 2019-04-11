const express = require("express");
const app = express();

const PORT = process.env.PORT || 7100;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log("App listening on PORT localhost:" + PORT);
});
