import express from "express";
import mainController from "../controllers/main";
import areaController from "../controllers/area";
import cursoController from "../controllers/curso";
import jogoController from "../controllers/jogo";

const router = express.Router();

// Main Controller
router.get("/", mainController.index);
router.get("/about", mainController.about);
router.get("/ui", mainController.ui);
router.get("/signup", mainController.signup);
router.post("/signup", mainController.signup);

// Area Controller
router.get("/areas", areaController.index);

// Curso Controller
router.get("/curso", cursoController.index);
router.get("/curso/create", cursoController.create);
router.post("/curso/create", cursoController.create);
router.get("/curso/update/:id", cursoController.update);
router.post("/curso/update/:id", cursoController.update);
router.delete("/curso/:id", cursoController.remove);
router.get("/curso/:id", cursoController.read);

// jogo
router.get("/jogo", jogoController.jogo);

// Rota Não Encontrada
router.use(function (req, res) {
	res.statusCode = 404;
	res.end("404!");
});

export default router;
