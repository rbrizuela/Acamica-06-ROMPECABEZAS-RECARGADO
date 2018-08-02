var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{
        done();
      }
    });
});

describe('Tamaño de la grilla', function() {
    it('La grilla piezas tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadPiezasPorLado = 5;
      Juego.construirPiezas();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.piezas.length).to.equal(Juego.cantidadPiezasPorLado);
      expect(Juego.piezas[0].length).to.equal(Juego.cantidadPiezasPorLado);
    });
  });

//-------------------------------------------------------------------------
//  Validacion de fx posicionValida
//  Juego.posicionValida = function (fila, columna)
//-------------------------------------------------------------------------
describe('Validacion de fx posicionValida()', function() {

	it('posicion VALIDA (0,0) Limite Inferior', function(){
    var fila = 0;
    var columna = 0;
    var esPosValida = Juego.posicionValida (fila, columna);
		expect(esPosValida).to.equal.true;
	})
  it('posicion VALIDA (5,5) Limite Superior', function(){
    var fila = 5;
    var columna = 5;
    var esPosValida = Juego.posicionValida (fila, columna);
		expect(esPosValida).to.equal.true;
	})
  it('posicion VALIDA (2,4) Posicion Intermedia', function(){
    var fila = 2;
    var columna = 4;
    var esPosValida = Juego.posicionValida (fila, columna);
		expect(esPosValida).to.equal.true;
	})
  it('posicion NO VALIDA (-1,1) Negativo(-) y Positivo(+)', function(){
    var fila = -1;
    var columna = 1;
    var esPosValida = Juego.posicionValida (fila, columna);
		expect(esPosValida).to.equal.false;
	})
  it('posicion NO VALIDA (2,-2) Positivo(+) y Negativo(-)', function(){
    var fila = 2;
    var columna = -2;
    var esPosValida = Juego.posicionValida (fila, columna);
		expect(esPosValida).to.equal.false;
	})
  it('posicion NO VALIDA (-3,-3) Negativo(-) y Negativo(-)', function(){
    var fila = -3;
    var columna = -3;
    var esPosValida = Juego.posicionValida (fila, columna);
		expect(esPosValida).to.equal.false;
	})
});

});
