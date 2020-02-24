const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const client = require("jsreport-client")(
  "https://rogerioreport.jsreportonline.net",
  "silva.rogerio17@gmail.com",
  "Gerim@123"
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/report/:name", (req, res, next) => {
  client
    .render({
      template: {
        content: "<h1> Hello {{name}}!! </h1>",
        recipe: "chrome-pdf",
        engine: "handlebars"
      },
      data: { name: req.params.name }
    })
    .then(response => response.pipe(res))
    .catch(next);
});

app.listen(process.env.PORT || 4000, function() {
  console.log("server runnning on port 4000");
});
