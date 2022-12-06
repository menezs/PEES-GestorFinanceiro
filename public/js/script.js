(function () {
	let FPS = 80;
	const TAMX = 400;
	const TAMY = 500;
	const PROB_ARVORE = 0.5;
	const PROB_ARVORE_FOGO = 0.3;
	const PROB_PEDRA = 0.5;
	const PROB_TOCO_ARVORE = 0.3;
	const PROB_ARVORE_GRANDE = 0.5;
	const PROB_CACHORRO = 0.1;
	const PROB_COGUMELO = 0.05;

	let montanha;
	let skier;
	let painel;

	let pontuacao = 0;
	let vidas = 3;
	let arvores = [];
	let cachorros = [];
	let arvores_grandes = [];
	let arvores_fogo = [];
	let pedras = [];
	let tocos_arvores = [];
	let cogumelos = [];

	function init() {
		montanha = new Montanha();
		skier = new Skier();
		painel = new Painel();
		myInterval = setInterval(run, 1000 / FPS);
	}

	window.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") {
			skier.mudarDirecao(-1);
		} else if (e.key === "ArrowRight") {
			skier.mudarDirecao(+1);
		} else if (e.key === "f") {
			skier.velocidade();
		}
	});

	class Montanha {
		constructor() {
			this.element = document.getElementById("montanha");
			this.element.style.width = TAMX + "px";
			this.element.style.height = TAMY + "px";
		}
	}

	class Skier {
		constructor() {
			this.element = document.getElementById("skier");
			this.direcoes = ["para-esquerda", "para-frente", "para-direita"];
			this.direcao = 1;
			this.element.className = this.direcoes[this.direcao];
			this.element.style.top = "20px";
			this.element.style.left = parseInt(TAMX / 2) - 8 + "px";
			this.bateu = false;
		}
		semVida() {
			this.element.className = "perdeu";
		}
		colidiu() {
			this.element.className = "bateu";
		}
		mudarDirecao(giro) {
			if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
				this.direcao += giro;
				this.element.className = this.direcoes[this.direcao];
			}
		}
		andar() {
			if (this.direcao === 0) {
				if (parseInt(this.element.style.left) >= 0) {
					this.element.style.left =
						parseInt(this.element.style.left) - 1 + "px";
				}
			} else if (this.direcao === 2) {
				if (parseInt(this.element.style.left) <= TAMX - 20) {
					this.element.style.left =
						parseInt(this.element.style.left) + 1 + "px";
				}
			}
		}
		encontrou_obstaculo(obs) {
			if (
				parseInt(this.element.style.top) + 27 ==
				parseInt(obs.element.style.top)
			) {
				if (
					parseInt(this.element.style.top) + 27 >=
					parseInt(obs.element.style.top)
				) {
					if (
						parseInt(this.element.style.left) + 15 >=
						parseInt(obs.element.style.left)
					) {
						if (
							parseInt(this.element.style.left) - 15 <=
							parseInt(obs.element.style.left)
						) {
							console.log("Colidiu");
							vidas -= 1;
							this.bateu = true;
							return true;
						}
					}
				}
			}
			return false;
		}
		recuperou_vida(cogumelo) {
			if (
				parseInt(this.element.style.top) + 27 ==
				parseInt(cogumelo.element.style.top)
			) {
				if (
					parseInt(this.element.style.top) + 27 >=
					parseInt(cogumelo.element.style.top)
				) {
					if (
						parseInt(this.element.style.left) + 15 >=
						parseInt(cogumelo.element.style.left)
					) {
						if (
							parseInt(this.element.style.left) - 15 <=
							parseInt(cogumelo.element.style.left)
						) {
							console.log("Recuperou Vida");
							vidas += 1;
						}
					}
				}
			}
		}
		velocidade() {
			myInterval = setInterval(run, 1000 / 150);
		}
	}

	class Arvore {
		constructor() {
			this.element = document.createElement("div");
			this.element.className = "arvore";
			montanha.element.appendChild(this.element);
			this.element.style.top = TAMY + "px";
			this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
		}
	}

	class ArvoreDeFogo {
		constructor() {
			this.element = document.createElement("div");
			this.element.className = "arvore-fogo";
			montanha.element.appendChild(this.element);
			this.element.style.top = TAMY + "px";
			this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
		}
	}

	class Pedra {
		constructor() {
			this.element = document.createElement("div");
			this.element.className = "pedra";
			montanha.element.appendChild(this.element);
			this.element.style.top = TAMY + "px";
			this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
		}
	}

	class Cogumelo {
		constructor() {
			this.element = document.createElement("div");
			this.element.className = "cogumelo";
			montanha.element.appendChild(this.element);
			this.element.style.top = TAMY + "px";
			this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
		}
	}

	class TocoDeArvore {
		constructor() {
			this.element = document.createElement("div");
			this.element.className = "toco-arvore";
			montanha.element.appendChild(this.element);
			this.element.style.top = TAMY + "px";
			this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
		}
	}

	class Cachorro {
		constructor() {
			this.element = document.createElement("div");
			this.element.className = "cachorro";
			montanha.element.appendChild(this.element);
			this.element.style.top = TAMY + "px";
			this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
		}
	}

	class ArvoreGrande {
		constructor() {
			this.element = document.createElement("div");
			this.element.className = "arvore-grande";
			montanha.element.appendChild(this.element);
			this.element.style.top = TAMY + "px";
			this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
		}
	}

	class Painel {
		constructor() {
			this.element = document.getElementById("painel");
			this.element.style.width = 150 + "px";
			this.element.style.height = 50 + "px";
			this.element.style.left = TAMX + 110 + "px";
		}
		escreveNoPainel() {
			pontuacao += 0.02;
			this.element.innerHTML =
				"Distância: " + pontuacao.toFixed(0) + "m" + "<br>Vidas: " + vidas;
		}
	}

	function run() {
		const random1 = Math.random() * 100;
		if (random1 <= PROB_ARVORE) {
			const arvore = new Arvore();
			arvores.push(arvore);
		}
		arvores.forEach((a) => {
			a.element.style.top = parseInt(a.element.style.top) - 1 + "px";
			if (skier.encontrou_obstaculo(a) && skier.bateu) {
				clearInterval(myInterval);
				skier.colidiu();
				if (vidas >= 0) {
					setTimeout(function () {
						skier.bateu = false;
						skier.direcao = 0;
						skier.mudarDirecao(+1);
						skier.andar();
						myInterval = setInterval(run, 1000 / FPS);
					}, 3000);
				}
			}
		});

		const random2 = Math.random() * 100;
		if (random2 <= PROB_ARVORE_FOGO) {
			const arvorePegandoFogo = new ArvoreDeFogo();
			arvores_fogo.push(arvorePegandoFogo);
		}
		arvores_fogo.forEach((a) => {
			a.element.style.top = parseInt(a.element.style.top) - 1 + "px";
			if (skier.encontrou_obstaculo(a) && skier.bateu) {
				clearInterval(myInterval);
				skier.colidiu();
				if (vidas >= 0) {
					setTimeout(function () {
						skier.bateu = false;
						skier.direcao = 0;
						skier.mudarDirecao(+1);
						skier.andar();
						myInterval = setInterval(run, 1000 / FPS);
					}, 3000);
				}
			}
		});

		const random3 = Math.random() * 100;
		if (random3 <= PROB_PEDRA) {
			const obs_pedra = new Pedra();
			pedras.push(obs_pedra);
		}
		pedras.forEach((a) => {
			a.element.style.top = parseInt(a.element.style.top) - 1 + "px";
			if (skier.encontrou_obstaculo(a) && skier.bateu) {
				clearInterval(myInterval);
				skier.colidiu();
				if (vidas >= 0) {
					setTimeout(function () {
						skier.bateu = false;
						skier.direcao = 0;
						skier.mudarDirecao(+1);
						skier.andar();
						myInterval = setInterval(run, 1000 / FPS);
					}, 3000);
				}
			}
		});

		const random4 = Math.random() * 100;
		if (random4 <= PROB_TOCO_ARVORE) {
			const toco_arvore = new TocoDeArvore();
			tocos_arvores.push(toco_arvore);
		}
		tocos_arvores.forEach((a) => {
			a.element.style.top = parseInt(a.element.style.top) - 1 + "px";
			if (skier.encontrou_obstaculo(a) && skier.bateu) {
				clearInterval(myInterval);
				skier.colidiu();
				if (vidas >= 0) {
					setTimeout(function () {
						skier.bateu = false;
						skier.direcao = 0;
						skier.mudarDirecao(+1);
						skier.andar();
						myInterval = setInterval(run, 1000 / FPS);
					}, 3000);
				}
			}
		});

		const random5 = Math.random() * 100;
		if (random5 <= PROB_ARVORE_GRANDE) {
			const arvore_grande = new ArvoreGrande();
			arvores_grandes.push(arvore_grande);
		}
		arvores_grandes.forEach((a) => {
			a.element.style.top = parseInt(a.element.style.top) - 1 + "px";
			if (skier.encontrou_obstaculo(a) && skier.bateu) {
				clearInterval(myInterval);
				skier.colidiu();
				if (vidas >= 0) {
					setTimeout(function () {
						skier.bateu = false;
						skier.direcao = 0;
						skier.mudarDirecao(+1);
						skier.andar();
						myInterval = setInterval(run, 1000 / FPS);
					}, 3000);
				}
			}
		});

		const random6 = Math.random() * 100;
		if (random6 <= PROB_CACHORRO) {
			const cachorro = new Cachorro();
			cachorros.push(cachorro);
		}
		cachorros.forEach((a) => {
			a.element.style.top = parseInt(a.element.style.top) - 1 + "px";
			if (skier.encontrou_obstaculo(a) && skier.bateu) {
				clearInterval(myInterval);
				skier.colidiu();
				if (vidas >= 0) {
					setTimeout(function () {
						skier.bateu = false;
						skier.direcao = 0;
						skier.mudarDirecao(+1);
						skier.andar();
						myInterval = setInterval(run, 1000 / FPS);
					}, 3000);
				}
			}
		});

		const random7 = Math.random() * 100;
		if (random7 <= PROB_COGUMELO) {
			const nova_vida = new Cogumelo();
			cogumelos.push(nova_vida);
		}
		cogumelos.forEach((a) => {
			a.element.style.top = parseInt(a.element.style.top) - 1 + "px";
			skier.recuperou_vida(a);
		});

		if (vidas < 0) {
			clearInterval(myInterval);
			skier.semVida();
		}
		painel.escreveNoPainel();
		skier.andar();
	}

	init();
})();
