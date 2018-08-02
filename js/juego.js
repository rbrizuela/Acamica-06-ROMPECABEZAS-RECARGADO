//defino el objeto juego
var Juego = {

  //declaracion del objeto canvas
  canvas: {},
  contexto: {},

  // Arreglo que contiene las intrucciones del juego
  instrucciones: ['Utilizar las flechas del teclado para mover las piezas del rompecabezas.',
                  'Puede utilizar el click del mouse para mover la pieza blanca.',
                  'Ordenar las piezas hasta alcanzar la imagen objetivo.'],

   //grilla ganadora, es estatica y sirve para comparar y saber cuando gano
   grillaGanadora: [],

  /* Estas dos variables son para guardar la posición de la pieza vacía.
  Esta posición comienza siendo la [5, 5]*/
  filaVacia: 3,
  columnaVacia: 3,
  nroPiezaBlanca: 9,

  /* codigosDireccion es un objeto que te permite reemplazar
  el uso de números confusos en tu código. Para referirte a la dir
  izquierda, en vez de usar el número 37, ahora podés usar:
  codigosDireccion.IZQUIERDA. Esto facilita mucho la lectura del código. */
  codigosDireccion: {IZQUIERDA: 37,
                    ARRIBA: 38,
                    DERECHA: 39,
                    ABAJO: 40},

  //Arreglo dinamico que contiene la cantidad de Piezas
  //Ej: 3 x 3, 4 x 4, 5 x 5
  piezas: [],

  cantidadPiezasPorLado: 3,

  anchoPiezas: 0,
  altoPiezas: 0,
  anchoDeRompecabezas: 0,
  altoDeRompecabezas: 0,

  movimientosTotales: 0,
  contadorDeMovimientos: 0,

  //objeto pieza que se usa para agregarlo al arreglo de piezas
  pieza : function(nro, xActual, yActual, xOriginal, yOriginal){
      this.nro = nro;   //cargo la pos logica para evitar crear un arreglo grilla (tengo todo aca)
      this.xActual = xActual;
      this.yActual = yActual;
      this.xOriginal = xOriginal;
      this.yOriginal = yOriginal;
  }

};

/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro.
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'.
Para eso deberás usar la función ya implementada mostrarInstruccionEnLista().
Podés ver su implementación en la ultima parte de este codigo. */
Juego.mostrarInstrucciones = function () {

    //remueve todas las instrucciones ya creadas
    //uso esto para que cuando vuelvo a mezclar no las agregue otra vez
    var list = document.getElementById("lista-instrucciones");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    for (var i = 0 ; i < this.instrucciones.length; i++) {

        this.mostrarInstruccionEnLista(this.instrucciones[i], "lista-instrucciones");

    }

};

/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora.
Existen diferentes formas de hacer este chequeo a partir de la grilla. */
Juego.chequearSiGano = function () {
var resultado = true;

for (var i = 0 ; i < this.piezas.length ; i++) {

    for (var j = 0 ; j < this.piezas[i].length ; j++) {

        if (this.piezas[i][j].nro !== this.grillaGanadora[i][j]) {
            // pieza fuera de lugar
            resultado = false;
            break;
            }

        }

        if (!resultado) {break;}
    }

return resultado;

}

// Implementar alguna forma de mostrar un cartel que avise que ganaste el juego
Juego.mostrarCartelGanador = function () {

if (this.chequearSiGano) {
  swal('Rompecabezas Recargado','Felicitaciones!!! Armaste el Rompecabezas!!',"success");
  }
};

// Actualiza la posición de la pieza vacía
Juego.actualizarPosicionVacia = function (nuevaFila, nuevaColumna) {

    this.filaVacia = nuevaFila;
    this.columnaVacia = nuevaColumna;

};

// Para chequear si la posicón está dentro de la grilla.
//de 0 a Cant - 1
Juego.posicionValida = function (fila, columna) {

    if (fila >= 0 && fila <= (this.cantidadPiezasPorLado-1) &&
        (columna >= 0 && columna <= (this.cantidadPiezasPorLado-1))) {
        return true;
        }
    else {
        return false;
        }

};

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
Juego.moverEnDireccion = function (direccion) {
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    // Mueve pieza hacia abajo, reemplazandola con la blanca
    if (direccion === Juego.codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = this.filaVacia - 1;
        nuevaColumnaPiezaVacia = this.columnaVacia;
    }

        // Mueve pieza hacia arriba, reemplazandola con la blanca
    else if (direccion === Juego.codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = this.filaVacia + 1;
        nuevaColumnaPiezaVacia = this.columnaVacia;
    }

        // Mueve pieza hacia la derecha, reemplazandola con la blanca
    else if (direccion === Juego.codigosDireccion.DERECHA) {
        nuevaFilaPiezaVacia = this.filaVacia;
        nuevaColumnaPiezaVacia = this.columnaVacia - 1;
    }

        // Mueve pieza hacia la izquierda, reemplazandola con la blanca
    else if (direccion === Juego.codigosDireccion.IZQUIERDA) {
        nuevaFilaPiezaVacia = this.filaVacia;
        nuevaColumnaPiezaVacia = this.columnaVacia + 1;
    }

    /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia.
    Para que esta parte del código funcione correctamente deberás haber implementado
    las funciones posicionValida, intercambiarPosiciones y actualizarPosicionVacia */

    if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {

        this.intercambiarPosiciones(this.filaVacia, this.columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        }

};

/* Funcion que realiza el intercambio logico (en la grilla)
y ademas en el arreglo piezas */
Juego.intercambiarPosiciones = function (fila1, columna1, fila2, columna2) {

  //intercambio en el arreglo piezas
  var piezaAux = this.piezas[fila1][columna1];
  this.piezas[fila1][columna1] = this.piezas[fila2][columna2];
  this.piezas[fila2][columna2] = piezaAux;

  //actualizo las posiciones actuales
  auxX = this.piezas[fila1][columna1].xActual;
  auxY = this.piezas[fila1][columna1].yActual;

  this.piezas[fila1][columna1].xActual = this.piezas[fila2][columna2].xActual;
  this.piezas[fila1][columna1].yActual = this.piezas[fila2][columna2].yActual;

  this.piezas[fila2][columna2].xActual = auxX;
  this.piezas[fila2][columna2].yActual = auxY;

  //  Dibujo la pieza 1
  Juego.dibujarPieza(fila1, columna1);

  //  Dibujo la pieza 2
  Juego.dibujarPieza(fila2, columna2);

};

// Dibujo la pieza, tanto si es una pieza o la pieza blanca
Juego.dibujarPieza = function (fila, columna) {


if (this.piezas[fila][columna].nro === this.nroPiezaBlanca) {

  //si es la pieza blanca, dibujo rectangulo
  this.contexto.beginPath();
  /*
  Parametros para crear un rectangulo
    x 	     The x-coordinate of the upper-left corner of the rectangle
    y 	     The y-coordinate of the upper-left corner of the rectangle
    width 	 The width of the rectangle, in pixels
    height 	 The height of the rectangle, in pixels
  */
  this.contexto.rect(this.piezas[fila][columna].xActual,
                    this.piezas[fila][columna].yActual,
                    this.anchoPiezas,
                    this.altoPiezas);
  this.contexto.fillStyle = '#ffffb3';
  this.contexto.fill();
  this.contexto.lineWidth = 1;
  this.contexto.strokeStyle = 'black';
  this.contexto.stroke();
  }

else {

/*
  drawImage(imagen,
      		posicionXDesdeDondeCortarLaImagen,
      		posicionYDesdeDondeCortarLaImagen,
      		anchoQueSeQuiereRecortar,
      		altoQueSeQuiereRecortar,
      		posicionXDondeColocarImagen,
      		posicionYDondeColocarImagen,
      		anchoImagen,
      		altoImagen);

          img       Specifies the image, canvas, or video element to use
          sx 	      Optional. The x coordinate where to start clipping
          sy 	      Optional. The y coordinate where to start clipping
          swidth 	  Optional. The width of the clipped image
          sheight   Optional. The height of the clipped image
          x 	      The x coordinate where to place the image on the canvas
          y 	      The y coordinate where to place the image on the canvas
          width 	  Optional. The width of the image to use (stretch or reduce the image)
          height 	  Optional. The height of the image to use (stretch or reduce the image)
          [cantidad argumentos obligatorios 3,5,9]
*/

  //no es la pieza blanca
  //recorto la porcion de la imagen
  this.contexto.drawImage(this.imagen,
                          this.piezas[fila][columna].xOriginal, this.piezas[fila][columna].yOriginal, //lugar donde inicio el corte
                          this.anchoPiezas, this.altoPiezas,                                          //tamaño del corte
                          this.piezas[fila][columna].xActual, this.piezas[fila][columna].yActual,     //lugar donde coloco la imagen
                          this.anchoPiezas, this.altoPiezas);                                         //tamaño de la imagen
  }

}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto
pasado con el parámetro "instrucción". */
Juego.mostrarInstruccionEnLista = function (instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

Juego.mezclarPiezas = function (veces) {
    if (veces <= 0) {
        return;
    }
    var direcciones = [Juego.codigosDireccion.ABAJO,
                       Juego.codigosDireccion.ARRIBA,
                       Juego.codigosDireccion.IZQUIERDA,
                       Juego.codigosDireccion.DERECHA
    ];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    this.moverEnDireccion(direccion);

    setTimeout(function() {
        Juego.mezclarPiezas(veces - 1);
    }, 50);
};

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora,
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
Juego.capturarTeclas = function () {

    document.body.onkeydown = (function(evento) {

        if (evento.which === Juego.codigosDireccion.ABAJO ||
            evento.which === Juego.codigosDireccion.ARRIBA ||
            evento.which === Juego.codigosDireccion.DERECHA ||
            evento.which === Juego.codigosDireccion.IZQUIERDA) {

            //tiene movimientos dispobibles - todavia no perdio
            if (Juego.contadorDeMovimientos !== 0){

              Juego.moverEnDireccion(evento.which);
              Juego.actualizaContMovRestantes();

              var gano = Juego.chequearSiGano();

              if (gano) {
                  setTimeout(function() {
                      Juego.mostrarCartelGanador();
                  }, 50);

              }

            }
            evento.preventDefault();
        }
    })
};


//creo la grilla grilla Ganadora
//es una grilla estatica que sirve para comparar y chequear si gano
Juego.crearGrillaGanadora = function() {

//blanqueo el arreglo para iniciarlo desde cero
this.grillaGanadora = [];

//fila vacia que luego se agrega al arreglo de piezas
var filaGrilla = [];

var contCorrelativo =0;

for (var i = 0 ; i < this.cantidadPiezasPorLado ; i++) { //recorre las filas

  //cuando cambio de fila , blanqueo la fila
  filaGrilla=[];

  for (var j = 0 ; j < this.cantidadPiezasPorLado ; j++) {//recorre las columnas

    contCorrelativo++;
    filaGrilla.push(contCorrelativo);

    }

    //agrego la fila de x piezas
    this.grillaGanadora.push(filaGrilla);

  }

}

//Funcion que crea arreglo (piezas[]) que contiene un objeto por cada pieza
Juego.construirPiezas = function() {

//blanqueo el arreglo para iniciarlo desde cero
this.piezas = [];

//fila vacia que luego se agrega al arreglo de piezas
var filaPieza = [];

var contCorrelativo =0;

for (var i = 0 ; i < this.cantidadPiezasPorLado ; i++) { //recorre las filas

  //cuando cambio de fila , blanqueo la fila
  filaPieza=[];

  for (var j = 0 ; j < this.cantidadPiezasPorLado ; j++) {//recorre las columnas

    contCorrelativo++;
    var xActual = this.anchoPiezas * j;
    var yActual = this.altoPiezas * i;
    var xOriginal = this.anchoPiezas * j;
    var yOriginal = this.altoPiezas * i;

    //genero una nueva pieza
    filaPieza.push(j);
    var piezaN = new this.pieza(contCorrelativo, xActual, yActual, xOriginal, yOriginal);
    filaPieza[j] = piezaN;

    }

    //agrego la fila de x piezas
    this.piezas.push(filaPieza);

  }

}

//configuracion inicial del canvas
Juego.configurarCanvas = function() {

this.canvas = document.getElementById("miCanvas");
this.contexto = this.canvas.getContext("2d");

}

//se carga la imagen del rompecabezas
Juego.cargarImagen = function (e) {
    //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600).
    this.anchoPiezas = Math.floor(600 / this.cantidadPiezasPorLado);
    this.altoPiezas = Math.floor(600 / this.cantidadPiezasPorLado);
    //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
    this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadPiezasPorLado;
    this.altoDeRompecabezas = this.altoPiezas * this.cantidadPiezasPorLado;
    this.configurarCanvas();

    this.contexto.drawImage(this.imagen,
                            0,
                            0,
                            this.imagen.width,
                            this.imagen.height,
                            0,
                            0,
                            this.anchoDeRompecabezas,
                            this.altoDeRompecabezas);
  };

//funcion que carga la imagen
Juego.iniciarImagen = function (callback) {
  this.imagen = new Image();
  var self = this;
  //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
  this.imagen.addEventListener('load', function () {
    self.cargarImagen.call(self);
    callback();
  }, false);
  this.imagen.src = "images/toyStory.jpg";
};

//una vez elegido el nivel, se inicia el juego
Juego.iniciar = function () {
  this.mostrarInstrucciones();
  this.seteoNivel();
  this.piezas = [];
  document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
  this.cantidadPiezasPorLado = document.getElementById("cantidadPiezasPorLado").value;
  //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
  var self = this;
  this.crearGrillaGanadora();

  //calculo y guardo la posicion de la pieza blanca
  this.nroPiezaBlanca = this.cantidadPiezasPorLado * this.cantidadPiezasPorLado;

  //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
  this.filaVacia = this.cantidadPiezasPorLado - 1;
  this.columnaVacia = this.cantidadPiezasPorLado - 1;
  //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas

  this.iniciarImagen(function () {
    self.construirPiezas();
    //la cantidad de veces que se mezcla es en funcion a la cantidad de piezas por lado que tenemos, para que sea lo mas razonable posible.
    //potencia de 2
    var cantidadDeMezclas = Math.pow(self.cantidadPiezasPorLado, 2);
    self.mezclarPiezas(cantidadDeMezclas);
    self.capturarTeclas();
  });

};

//evento que se dispara cuando hago click en canvas
//lo voy a utilizar para mover las piezas aydacentes con click
Juego.clickPieza = function(event) {

     var rect = this.canvas.getBoundingClientRect(); //funcion que obtiene el tamaño de un elemento y su posicion
     var x = event.clientX - rect.left;
     var y = event.clientY - rect.top;

     //obtener la fila y columna donde hice click
     var filaClick = parseInt (y / this.anchoPiezas);
     var columnaClick = parseInt (x / this.altoPiezas);

     //obtener el nro de pieza
     nroPiezaClick = this.piezas[filaClick][columnaClick].nro;

     //si hago click sobre la blanca no debo hacer nada
     if (nroPiezaClick !== this.nroPiezaBlanca) {

       var filaColBlanca = [];

       //obtengo fila y col de la pieza blanca
       filaColBlanca = this.obtenerPosPieza(this.nroPiezaBlanca);

       //si es adyacente a la pieza blanca hago el intercambio.
       //adyacentes diagonales no estan contempladas
       if (this.esAdyacenteABlanca(filaClick, columnaClick, filaColBlanca[0], filaColBlanca[1])){

         //tiene movimientos dispobibles - todavia no perdio
         if (this.contadorDeMovimientos !== 0){

           //intercambiar posiciones
           this.intercambiarPosiciones (filaClick, columnaClick, filaColBlanca[0], filaColBlanca[1]);
           this.actualizarPosicionVacia(filaClick, columnaClick);
           this.actualizaContMovRestantes();

           var gano = Juego.chequearSiGano();

           if (gano) {
               Juego.mostrarCartelGanador();
             }
          }
     }
   }

}

//Actualizar el contador de movimientos restantes
Juego.actualizaContMovRestantes = function () {

  this.contadorDeMovimientos--;
  document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;

  if (this.contadorDeMovimientos === 0) {
    swal('Rompecabezas Recargado','Perdiste!!! :(',"error");
  }

}

//segun el nro de pieza obtiene la fila y columna donde se encuentra
Juego.obtenerPosPieza = function (nroPieza) {

for (var i = 0 ; i < this.piezas.length ; i++) {

    for (var j = 0 ; j < this.piezas[i].length ; j++) {

        if (this.piezas[i][j].nro === nroPieza) {

            return [i,j];

          }
        }
    }
}

//funcion para verificar si 2 piezas son adyacentes
//recibe como parametros las filas y columnas de las 2 Piezas
Juego.esAdyacenteABlanca = function (filaClick, columnaClick, filaBlanca, columnaBlanca) {
//busco las situacionnes que no son adyacentes

//es diagonal, no es adyacente
if ((filaClick !== filaBlanca) && (columnaClick !== columnaBlanca)) {
  return false;
}

//no es adyacente, hay columna de por medio
if ((Math.abs(columnaClick - columnaBlanca))===2){
  return false;
}

//no es adyacente, hay fila de por medio
if ((Math.abs(filaClick - filaBlanca))===2){
    return false;
}

return true;

}

//seteo la opcion de nivel
//definir la cantidad de movimientos segun nivel
Juego.seteoNivel = function () {
var cantMovimientos = 0;

  //nivel facil
  if (document.getElementById("optFacil").checked){
    cantMovimientos = Math.pow(document.getElementById("cantidadPiezasPorLado").value, 4);
  }

  //nivel intermedio
  if (document.getElementById("optIntermedio").checked){
    cantMovimientos = Math.pow(document.getElementById("cantidadPiezasPorLado").value, 3);
  }

  //nivel dificil
  if (document.getElementById("optDificil").checked){
    cantMovimientos = Math.pow(document.getElementById("cantidadPiezasPorLado").value, 2);
  }

this.movimientosTotales = cantMovimientos;
this.contadorDeMovimientos = cantMovimientos;

}

// Ejecutamos la función iniciar
Juego.iniciar();


//-----------------------------------------------------------------------------
//    evento click del canvas
//-----------------------------------------------------------------------------
$("#miCanvas").click(function(e){
     Juego.clickPieza(e);
});

//-----------------------------------------------------------------------------
//    evento change de cantidad de piezas x lado
//    validacion que este entre 2 y 6
//-----------------------------------------------------------------------------
$("#cantidadPiezasPorLado").change(function(e){
  if ((document.getElementById("cantidadPiezasPorLado").value < 2) ||
      (document.getElementById("cantidadPiezasPorLado").value > 6)) {
        swal('Error de Validación','Valores válidos: 2 a 6',"error");
        document.getElementById("cantidadPiezasPorLado").value = 2;
  }
});
