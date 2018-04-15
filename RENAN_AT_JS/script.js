(function (){

$(document).ready(function(){

	console.log('teste1');

var imagens = ['img/facebook.png',
'img/android.png','img/chrome.png',
'img/firefox.png','img/html5.png',
'img/googleplus.png','img/twitter.png',
'img/windows.png'];  /* <-- 'img/cross.png' */ 

	var app = function(){   // I never understood this app global variable
		var cartasClicadas = '';
		var cartasAcertadas = []; 
		var imagensPares = [];

		
		// Put in pairs
		$.each(imagens,function(index, value){

			for(let i = 0; i <2; i++){  // Ugly but works
				imagensPares.push(value);
		}
		});

		$("#tabuleiro").append("<h1 id='title'>Bem vindo ao jogo da memoria!</h1>");

		$("#tabuleiro").append("<button id='btnStart'>Começar novo jogo!</button>");

		$("#tabuleiro").append("<div id='jogo'></div>");

		var jogo = $("#jogo");
		

		var preLoad = function(){

			$.each(imagensPares, function(index, value) {  
				jogo.append("<div class ='imgFundo' id='card" + index + "'><img class='imgclass' id='img" + index + "' src='" + value + "' />");
			});
			
			$('#btnStart').on("click", iniciarJogo);
		}


		var iniciarJogo = function (){

			cartasClicadas=''

			imagensPares.sort(function(a,b){return 0.5 - Math.random()});


			jogo.empty();
			
			$.each(imagensPares, function(index, value) {  
				jogo.append("<div class ='imgFundo' id='card" + index + "'><img class='imgclass' id='" + index +"_"+ value + "' src='" + value + "' />");
			});

			setTimeout(function(){

				$('.imgclass').attr("src","img/cross.png");
			}, 3000);
		
			

			$.each(imagensPares, function(index, value) {  
				$(document.getElementById(index +"_"+ value)).on("click", verificaCarta);
			});

			
		}


		var verificaCarta = function(x){   // This is an event handler, so x is the event.
			
			$(x.target).fadeIn( "slow", function() {
    		$(x.target).attr("src",x.target.id.substring(x.target.id.indexOf("_") + 1)); 

  			});
			
			if (cartasClicadas == '') {
				// NEW CARD
				cartasClicadas = x.target.id; // Temporary saved card.
				
			}else{

				if (x.target.id.split('_', 1)[0] === cartasClicadas.split('_', 1)[0]){
					return;
				}


				if (x.target.id.substring(x.target.id.indexOf("_") + 1) === cartasClicadas.substring(cartasClicadas.indexOf("_") + 1)){ 
					console.log('ACERTOU');
					cartasAcertadas.push(x.target.src);
					cartasAcertadas.push(cartasClicadas);

					$(x.target).off("click");
					$(document.getElementById(cartasClicadas)).off("click");
					

					if (cartasAcertadas.length == imagensPares.length) {
						window.alert("Fim do jogo, parabéns!");
					}

				}else{
					console.log('ERROU');

					setTimeout(function(){
						$(x.target).fadeIn( "fast", function() {
    					$(x.target).attr("src", "img/cross.png");

  					});
					}, 1000);
					

  					$(document.getElementById(cartasClicadas)).fadeIn( "fast", function() {
    					$(document.getElementById(cartasClicadas)).attr("src", "img/cross.png");

  					});


				}
				cartasClicadas='';
			}


		}

		return {
			preLoad: preLoad()
		}
	}

	return app();
});


})();