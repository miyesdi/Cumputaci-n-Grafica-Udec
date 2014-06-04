window.onload = function()
{
	inicio();
}

function inicio()
{
	canvas = nom_div("canvas");
	var ctx = canvas.getContext("2d");
	var w = 450;
	var h = 450;
	var dc = 15; //La dimensión que tendrá la culebrita...
	var direccion = 0; //Por defecto inciará hacia la derecha...
	var posMueve = [[-1, 0], [0, -1], [1, 0], [0, 1]];
	var culebrita;
	var cilcloJuego = "";
	var pause = false;
	var score = 0;
	var colores = {
		fondo : "black",
		culebrita : "green", 
		comida : "blue"
	}
	var comida = "";
	var comidaCulebrita = function()
	{
		//Generar puntos aletorios entre 0 - 44
		comida = {
					x: Math.round(Math.random()*(w - dc) / dc), 
					y: Math.round(Math.random()*(h-dc)/dc)
				 };
	}

	function velocidad ()
	{

			cilcloJuego = setInterval(dibujarCulebrita,180);			

	}

	function iniciaJuego()
	{
		pause = false;
		score = 0;
		direccion = 2;
		comidaCulebrita();
		nom_div("puntua").innerHTML = "Score: " + score;
		creaCulebrita();
		if(cilcloJuego != "")
		{
			clearInterval(cilcloJuego);
		}
		cilcloJuego = setInterval(function(){
			if(!pause)
			{
				dibujarCulebrita();
			}
		}, 200);
		velocidad();			
	}
	iniciaJuego();


	var dibujaCanvas = function()
	{
		ctx.fillStyle = colores.fondo;
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, w, h);	
	}
	
	var colisionCulebrita = function(x, y, cuerpo)
	{
		//Detectar si la posición x, y está en el cuerpo de la culebrita...
		var hayColision = false;
		for(var i in cuerpo)
		{
			if(cuerpo[i].x === x && cuerpo[i].y === y)
			{
				hayColision = true;
				break;
			}
		}
		return hayColision;
	}
	
	function creaCulebrita()
	{
		var largoCulebrita = 5; 
		culebrita = []; //Vaciar el array...
		for(var i = largoCulebrita - 1; i >= 0; i--)
		{
			culebrita.push({x: i, y:0});
		}	
	}

	function dibujarCulebrita()
	{
		dibujaCanvas();
		var cabezaX = culebrita[0].x;
		var cabezaY = culebrita[0].y;
		cabezaX += posMueve[direccion][0];
		cabezaY += posMueve[direccion][1];
		var colisionaCuerpo = colisionCulebrita(cabezaX, cabezaY, culebrita);
		if(cabezaX == -1 || cabezaX == w/dc || cabezaY == -1 || cabezaY == h/dc || colisionaCuerpo)
		{
			audios("muere.mp3");
			iniciaJuego();
			return;
		}
		if(cabezaX == comida.x && cabezaY == comida.y)
		{
			audios("moneda.mp3");
			score++;
			nom_div("puntua").innerHTML = "Score: " + score;
			var cola = {x: cabezaX, y : cabezaY};
			comidaCulebrita();
		}
		else
		{
			var cola = culebrita.pop();
			cola.x = cabezaX;
			cola.y = cabezaY;
		}
		culebrita.unshift(cola);
		for(var i = 0; i < culebrita.length; i++)
		{
			var c = culebrita[i];
			dibujarCelda(c.x, c.y, colores.culebrita);
		}
		dibujarCelda(comida.x, comida.y, colores.comida,);
	}

	function dibujarCelda(x, y, color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x * dc, y * dc, dc, dc);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * dc, y * dc, dc, dc);
	}
	var presionado = false;
	window.onkeydown = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(!presionado)
		{
			if(code >= 37 && code <= 40)
			{
				var reversa = false;
				switch(code)
				{
					case 37: if(direccion == 2) reversa = true;
							 break;
					case 38: if(direccion == 3) reversa = true;
							 break;
					case 39: if(direccion == 0) reversa = true;
							 break;
					case 40: if(direccion == 1) reversa = true;
							 break;
				}
				if(!reversa)
				{
					direccion = code - 37;
					console.log(direccion);
				}
			}
			presionado = true;
		}
	}
	window.onkeyup = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(presionado)
		{
			presionado = false;
		}
	}

	for(var i = 1; i <= 3; i++)
	{
		nom_div("opcion_" + i).addEventListener('change', function(event)
		{
			var ind = event.target.id.split("_");
			switch(Number(ind[1]))
			{
				case 1: colores.fondo = this.value; break;
				case 2: colores.culebrita = this.value; break;
				case 3: colores.comida = this.value; break;
			}
		});
	}
	nom_div("detiene").addEventListener('click', function(event)
	{
		pause = !pause;
		if(pause)
		{
			this.value = "Continuar";
		}
		else
		{
			this.value = "Pause";
		}
	});

	nom_div("descarga").addEventListener('click', function(event)
    {
        var nomfoto = prompt("Nombre de la Imagen", "Culebrita");
        this.download = nomfoto + ".png";
        this.href = canvas.toDataURL();
    });
	function audios(audio)
	{
		var txt = "<audio autoplay>";
		txt += "<source src = '"+(audio)+"' type = 'audio/mpeg'></audio>";
		nom_div("sonido").innerHTML = txt;
	}

	function nom_div(div)
	{
		return document.getElementById(div);
	}
}