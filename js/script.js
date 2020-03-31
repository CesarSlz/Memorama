var numeroCartas = 0;
const cartaVolteada = "https://media.giphy.com/media/lD76yTC5zxZPG/giphy.gif";
var cartas = [
	{
		contenido: "Bugs Bunny",
		url: "https://media0.giphy.com/media/l49K0pPIf3YYv5yMg/source.gif",
		volteada: false,
	},
	
	{
		contenido:"Pato Lucas",
		url: "https://66.media.tumblr.com/9fb1d3c20e32dde8fef7a591a6dbb4c3/tumblr_mr8lk0AKla1sborufo1_400.gif",
		volteada: false,
	},
	
	{
		contenido:"Sam Bigotes",
		url: "https://media1.giphy.com/media/3oFzmqXMDtHH8vEVhe/giphy.gif",
		volteada: false,
	},
	
	{
		contenido:"Coyote",
		url: "https://i.pinimg.com/originals/76/37/79/7637798533a114d62904981d098b40c2.gif",
		volteada: false,
	},
	
	{
		contenido:"Porky",
		url: "https://media1.tenor.com/images/56a53a34e19763f7d212e39ca392218e/tenor.gif?itemid=5935097",
		volteada: false,
	},
	
	{
		contenido: "Marvin el Marciano",
		url: "https://media0.giphy.com/media/5h7nwwMJdNpxoWxmlh/giphy.gif",
		volteada: false,
	}
	
];

var contenedorCartas = document.getElementById("contenedor-cartas");

var cartaMostrada = "";
var pares = 0;
var vidas = cartas.length-1;

numeroCartas = cartas.length;

function crearCartas(list) {
	let cartas = list.concat(list);
	cartas = shuffle(cartas);
	for(let i = 0; i < cartas.length; i++){
		crearElemento(cartas[i]);
	}
	refrescarMarcador();
}



function crearElemento(carta){
	//Crear elemento por nombre de elemento(div)
	var divCarta = document.createElement("div");
	var texto = document.createElement("h6");
	
	// Configuracion
	texto.innerText = carta.contenido;
	texto.style.display = "none";
	divCarta.style.backgroundImage = "url(" + cartaVolteada + ")";
	divCarta.classList.add("carta", "carta-hover", "carta-grande", "carta-blanca", "carta-nomostrada");
	divCarta.dataset.contenido = carta.contenido;
	divCarta.dataset.url = carta.url;
	
	// Agreagarlos al DOM
	divCarta.appendChild(texto);
	contenedorCartas.appendChild(divCarta);
}

function agregarClicks() {
	let divCartas = contenedorCartas.children;
	for(let i= 0; i < divCartas.length; i++) {
		divCartas[i].onclick = clickCarta;
	}
}

function clickCarta(event) {
	// Obtener elemento que produce el evento(click)
	let divCarta = event.target;
	// Obtener del atributo dataset el valor de contenido
	let contenido = divCarta.dataset.contenido;

	divCarta.classList.remove("carta-nomostrada");
	divCarta.classList.add("carta-mostrada");
	divCarta.classList.add("carta-animacion");
	divCarta.classList.remove("carta-hover");
	divCarta.style.backgroundImage = "url(" + divCarta.dataset.url + ")";
	divCarta.dataset.volteada = true;
	if(cartaMostrada != "") {
		revisar(contenido);

	} else {
		cartaMostrada = contenido;
	}
}

function cambiarFondo(carta){
	carta.style.backgroundImage = "url(" + cartaVolteada + ")";
}

function revisar(valor) {
	console.log(valor);
	console.log(cartaMostrada);
	if(valor == cartaMostrada) {
		pares ++;
		let divCartas = obtenerParVolteado();
		delete divCartas[0].dataset.volteada;
		delete divCartas[1].dataset.volteada;
	} else {
		--vidas;
		 
			if(vidas == 0) {
				perder();
			}
		
		regresarPar();
	}
	
	cartaMostrada = "";
	refrescarMarcador();
	if(pares == numeroCartas) {
		ganar();
	}
}

function obtenerParVolteado() {
	return contenedorCartas.querySelectorAll('[data-volteada="true"]');
}

function regresarPar() {
	let divCartas = contenedorCartas.querySelectorAll('[data-volteada="true"]');
	setTimeout (function() { 
  	divCartas[0].dataset.volteada = false;
  	divCartas[1].dataset.volteada = false;
	divCartas[0].classList.remove("carta-mostrada");
	divCartas[0].classList.add("carta-nomostrada");
	divCartas[0].classList.remove("carta-animacion");
	divCartas[0].classList.add("carta-hover");
	cambiarFondo(divCartas[0]);
	cambiarFondo(divCartas[1]);
	divCartas[1].classList.remove("carta-mostrada");
	divCartas[1].classList.add("carta-nomostrada");
	divCartas[1].classList.remove("carta-animacion");
	divCartas[1].classList.add("carta-hover");
	}, 1000);

}

function shuffle(list) {
	for(let i = list.length - 1; i >= 0; i--) {
		let numero = Math.floor(Math.random() * (i + 1));
		[list[i], list[numero]] = [list[numero], list[i]]
	}
	
	return list;
}

function ganar() {
	let hiddendialogue = document.getElementsByClassName("dialogo-oculto");
	let contcartas = document.getElementById("contenedor-cartas");
	hiddendialogue[0].style.display = "block";
	contcartas.style.display="none";
	setTimeout(function(){
    	location.reload();
	}, 5000);


}
function perder() {
	let hiddendialogue = document.getElementsByClassName("dialogo-oculto-2");
	let contcartas = document.getElementById("contenedor-cartas");
	hiddendialogue[0].style.display = "block";
	contcartas.style.display="none";
	setTimeout(function(){
    	location.reload();
	}, 5000);
}

function refrescarMarcador() {
	let contenedorMarcador = document.getElementById("contenedor-marcador");
	contenedorMarcador.children[0].children[0].innerText = pares;
	contenedorMarcador.children[1].children[0].innerText = vidas;
}

crearCartas(cartas);
agregarClicks();

