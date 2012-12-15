// JavaScript Document

$(document).ready(function(e) {
    document.addEventListener("deviceready", llamarBD, false);
});

function llamarBD(){
		window.localStorage.setItem("llave", "Nombre");
		mostrarLocal();
		//SQL
		var bd = window.openDatabase("Nombres","1.0", "Prueba SQL", 2000, function(){
			navigator.modification.alert('La Base de Datos se ha cargado', function() { },
			'SQL Transactions', 'Aceptar');
		});
		
		bd.transaction(generarTransacciones, error, cargado);
		mostrarSQL();
	}
function cargado(){
	navigator.modification.alert('La Base de Datos se ha creado', function() { },
			'SQL Transactions', 'Aceptar');
}
function error(err){
	navigator.modification.alert('Error en las transacciones: '+err, function() { },
			'SQL Transactions', 'Aceptar');
}
function generarTransacciones(tx){
	tx.executeSql('DROP TABLE IF EXISTS TAB');
	tx.executeSql('CREATE TABLE TAB IF NOT EXISTS TAB (nombId unique, nombre)');
	tx.executeSql('INSERT INTO TAB (nombId, nombre) VALUES("1","Javier")');
}
function mostrarSQL(){
	$('#SQL').tap(function(){
		var bd = window.openDatabase("Nombres","1.0", "Prueba SQL", 2000);
		bd.transaction(function(tx){
			tx.executeSql('SELECT * FROM TAB', [], function (tx1, res){
					var largo = res.rows.length;
					alert('La tabla TAB: '+largo+'filas encontradas');
					for(i=0;i<largo;i++){
						alert('ID = '+res.rows.item(i).nombId+'\nNombre = '+res.rows.item(i).nombre);	
					}
			}, function(err){
				alert(err);
				});
			});
		
	});
}
	
function mostrarLocal(){
	$('#local').tap(function(){
		var key = window.localStorage.key(0);
		var name = window.localStorage.getItem("llave");
		navigator.notification.confirm('Llave: '+ key+ '\nNombre: '+ name, function(btn){
				if(btn==1){
					window.localStorage.clear();
					}
			}, 'LocalStorage', 'Borrar BD, Cancelar');
		});
	}