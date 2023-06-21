const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');

function Calculadora() {
    this.sumar = function (num1,num2) {
        return num1 + num2;
    }
    
    this.restar = function(num1,num2) {
        return num1 - num2;
    }
    
    this.multiplicar = function (num1,num2) {
        return num1 * num2;
    }
    
    this.dividir = function(num1,num2) {
        return num1 / num2;
    }
};



// display Constructor - includes properties and methods - usamos un constructor porque vamos a pasarle valores al instanciarla
function Display(displayValorAnterior,displayValorActual) { // va a trabajar con el displayAnterior y displayActual para actualizarlos
    this.displayValorAnterior = displayValorAnterior;
    this.displayValorActual = displayValorActual;
    this.calculador = new Calculadora();
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;

    this.borrar = function() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    this.borrarTodo = function() {
        this.valorActual = "";
        this.valorAnterior = "";
        this.tipoOperacion = undefined; // como un FLAG
        this.imprimirValores();
    }

    this.agregarNumero = function(numero) {// recibe un numero como parametro
        if(numero === '.' && this.valorActual.includes('.')) return;
        this.valorActual = this.valorActual.toString() + numero.toString(); // el valor actual se igual al numero que recibimos
        this.imprimirValores(); // imprimir los valores al hacer click en el boton
    }

    this.imprimirValores = function() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = this.valorAnterior;
    } 

    this.calcular = function() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual) || isNaN(valorAnterior) ) return;
        // esta es la magia
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);

    }

    this.computar = function(tipo) {
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual="";
        this.imprimirValores();
    }

    
};

// creamos una instancia de Display
const display = new Display(displayValorAnterior,displayValorActual); // necesita como parametros el valor actual y el valor anterior para que los vaya actualizando

// agregamos un eventlister para agregarnumeros
botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () =>  display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value) )
} )