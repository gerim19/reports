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

app.post("/reportTestA/", (req, res, next) => {
  var nf = {
    nroNf: "1234",
    serie: "5",
    dtEmiss: "24/02/2020",
    itens: [
      { nro: "1", descr: "Chocolate", qtde: "2" },
      { nro: "2", descr: "bolo de cenoura", qdte: "1" }
    ]
  };

  console.log(nf.itens[0].nro);

  var tableBegin = '<table border="1">';
  var tableEnd = "</table>";

  var tHeadNf =
    "<tr><td>Numero da NFe</td><td>Serie</td><td>Data de emissão</td></tr>";
  var tBodyNf =
    "<tr><td>{{nf.nroNf}}</td><td>{{nf.serie}}</td><td>{{nf.dtEmiss}}</td></tr>";

  var tHeadItNf =
    "<tr><td>Numero do item</td><td>Descrição</td><td>Quantidade</td></tr>";
  var tBodyItNf =
    "<tr><td>" +
    nf.itens[0].nro +
    "</td><td>" +
    nf.itens[0].descr +
    "</td><td>" +
    nf.itens[0].qtde +
    "</td></tr>";

  var content =
    tableBegin + tHeadNf + tBodyNf + tHeadItNf + tBodyItNf + tableEnd;

  client
    .render({
      template: {
        content: content,
        recipe: "chrome-pdf",
        engine: "handlebars"
      },
      data: { nf: nf }
    })
    .then(response => response.pipe(res))
    .catch(next);
});

app.listen(process.env.PORT || 4000, function() {
  console.log("server runnning on port 4000");
});
