import express from "express";
import cors from "cors";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.get("/api/test", (req, res) => {
    res.status(200).json({
        mensagem: "🏆 API Champions League (Ritmo Copa do Mundo) com Express iniciada com sucesso!"
    });
});

export default app;