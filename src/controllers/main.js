import { Curso, Usuario } from "../models/index";

const index = (req, res) => {
	res.render("main/index", {});
};

const about = (req, res) => {
	res.render("main/about", {});
};

const ui = (req, res) => {
	res.render("main/ui", {});
};

const signup = async (req, res) => {
	const cursos = await Curso.findAll();
	if (req.route.methods.get) {
		res.render("main/signup", {
			cursos: cursos.map((c) => c.toJSON()),
		});
	} else {
		const usuario = req.body;
		try {
			await Usuario.create(usuario);
			res.redirect("/");
		} catch (error) {
			console.log(error);
		}
	}
};

export default { index, about, ui, signup };
