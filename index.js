import express from "express";
import router from "./src/router/router";
import { engine } from "express-handlebars";
import sass from "node-sass-middleware";

const morgan = require("morgan");

const app = express();
const PORT = 5500;

app.engine(
	"handlebars",
	engine({
		helpers: require(`${__dirname}/src/views/helpers/helpers`),
		layoutsDir: `${__dirname}/src/views/layouts`,
		defaultLayout: "main",
	})
);
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/src/views`);

app.use(
	sass({
		src: `${__dirname}/public/scss`,
		dest: `${__dirname}/public/css`,
		outputStyle: "compressed",
		prefix: "/css",
	})
);

app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/audio", express.static(`${__dirname}/public/audio`));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use(
	"/webfonts",
	express.static(
		`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`
	)
);
app.use("/js", [
	express.static(`${__dirname}/public/js`),
	express.static(`${__dirname}/node_modules/bootstrap/dist/js`),
]);

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
	console.log(`Escutando a porta ${PORT}`);
});
