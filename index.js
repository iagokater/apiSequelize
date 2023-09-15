const express = require("express");
const cors = require("cors");


const CargoRouter = require('./route/Cargo');
const NegocioRouter = require('./route/Negocio');
const PipelineRouter = require('./route/Pipeline');
const DemografiaRouter = require('./route/Demografia');
const EntrevistaRouter = require('./route/Entrevista');
const UsuarioRouter = require('./route/Usuario');

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use('/cargo', CargoRouter);
app.use('/negocio', NegocioRouter);
app.use('/pipeline', PipelineRouter);
app.use('/demografia', DemografiaRouter);
app.use('/entrevista', EntrevistaRouter);
app.use('/usuario', UsuarioRouter);


app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
   error: {
    message: error.message || "Internal Server Error",
    },
 });
});

let port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => console.log(`Servidor Subiu!\nPara acessar a documentação do Swagger entre em: http://localhost:${port}/`));