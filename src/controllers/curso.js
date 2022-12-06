const models = require("../models/index");
const Curso = models.Curso;

async function index(req, res) {
	const cursos = await Curso.findAll();
	res.render("curso/index", {
		cursos: cursos.map((curso) => curso.toJSON()),
	});
}

async function create(req, res) {
	if (req.route.methods.get) {
		res.render("curso/create");
	} else {
		await Curso.create({
			sigla: req.body.sigla,
			nome: req.body.nome,
			descricao: req.body.descricao,
			areaId: req.body.area,
		});
		res.redirect("/curso");
	}
}

async function read(req, res) {
	const curso = await Curso.findOne({ where: { id: req.params.id } });
	res.render("curso/read", {
		curso: curso.toJSON(),
	});
}

async function update(req, res) {
	const curso = await Curso.findOne({ where: { id: req.params.id } });
	if (req.route.methods.get) {
		res.render("curso/update", {
			curso: curso.toJSON(),
		});
	} else {
		await Curso.update(
			{
				sigla: req.body.sigla,
				nome: req.body.nome,
				descricao: req.body.descricao,
				areaId: req.body.area,
			},
			{ where: { id: req.params.id } }
		);
		res.redirect("/curso/" + req.params.id);
	}
}

async function remove(req, res) {
	const { id } = req.params;
	try {
		await Curso.destroy({ where: { id: id } });
		res.send("Curso apagado com sucesso");
	} catch (error) {
		console.log(error);
		res.stataus(500).send(error);
	}
}

export default { index, create, read, update, remove };
