var debug = "";
window.onload = function()
{
	//alert("Hola");
	var color = "#FF0000";
	var dibujar = SVG('divsvg').size("100%", 400);
	var image = dibujar.image('anonymous.png');
    image.size("100%", "100%");
    image.hide();


	var letraM = [[0, 0], [0, 300], [30, 300], [30, 90], [90, 180], [150, 90], [150, 300], [180, 300], [180, 0], [90, 130], [0, 0]];
	var letraE = [[0, 0], [0, 300], [200, 300], [200, 270], [30, 270], [30, 160], [160, 160], [160, 130], [30, 130], [30, 30], [200, 30], [200, 0], [0, 0]]; 

	var continua = dibujar.polyline(letraM).fill("none").stroke({width : 4, color: '#000011'}).attr({ fill: color });
	continua.animate(1000).plot(letraE).loop();

	for(var i = 1; i <= 7; i++)
	{
		nom_div("opcion_" + i).addEventListener('change', function(event)
		{
			//console.debug(event);
			var ind = event.target.id.split("_");
			switch(Number(ind[1]))
			{
				case 1: continua.attr({fill: this.value}); break;
				case 2: continua.stroke({color : this.value}); break;
				case 3: continua.stroke({width : this.value}); break;
				case 4: continua.attr({opacity: this.value}); break;
				case 5: continua.rotate(this.value); break;
				case 6: continua.scale(this.value); break;
				case 7: //Mostra máscara..
						if(this.value == 1)
						{
							image.show();
							//image.maskWith(continua);
							continua.maskWith(image);
						}
						else
						{
							//continua.remove()
							//image.hide();
							continua.unmask();
							//mask.remove()
						}
						break;
			}
		});
	}

	var animo = true;
	nom_div("controla").addEventListener('click', function(event)
	{
		if(animo)
		{
			this.value = "Continuar";
			continua.pause();
		}
		else
		{
			this.value = "Detener";
			continua.play();
		}
		animo = !animo;
	});
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}