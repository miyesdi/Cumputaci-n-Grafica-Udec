window.onload = function()
{
	inicio();
}

function inicio()
{
	/*
	Tamaño/tomaño del sol = %
	*/
	function movimiento(path, obj, vel)
    {
        //console.log("Vel de: "  + obj + " es: " + vel);
        var pathLength = path.getTotalLength();
        var tween = new TWEEN.Tween({ length: 0  })
        .to({ length: pathLength }, vel)
        .onUpdate(function()
        {
            var point = path.getPointAtLength(this.length);
            obj.style.webkitTransform = 'translate('+ point.x + 'px,'+ point.y +'px)';
        }).repeat(999999999).start();
        animate = function()
        {
            requestAnimationFrame(animate)
            TWEEN.update()
        }
        animate();
    }
    var tamReal = false;
	var crealunas = function(objeto, lunas)
    {
        var tamanolunas = lunas.porcentaje;
        //var tamanolunas = lunas.tamano;
        if(tamReal)
        {
            
            tamanolunas = Math.round(jupiter.tamano * (lunas.porcentaje / 100));
            
        }
        objeto.style.width = tamanolunas + "px";
        objeto.style.height = tamanolunas + "px";
        objeto.style.backgroundImage = "url('img/"+ lunas.imagen+"')";
        objeto.style.backgroundSize = tamanolunas + "px " + tamanolunas + "px";
        var margen = (Math.round(tamanolunas / 2)) * -1;
        objeto.style.marginTop = margen + "px";
        objeto.style.marginLeft = margen + "px";
        objeto.style.borderRadius = "50%";
        objeto.style.position = "absolute";
        
    }
	var lunas = [
                {nombre: "callisto", 
                 imagen: "callisto.png",
                 porcentaje: 3.3,
                 tamano: 15 
                },
                {nombre: "ganimede", 
                 imagen: "ganimede.png",
                 porcentaje: 3.6,
                 tamano: 20 
                },
                {nombre: "europa", 
                 imagen: "europa.png",
                 porcentaje: 2.1,
                 tamano: 20 
                },
                {nombre: "io", 
                 imagen: "io.png",
                 porcentaje: 2.5,
                 tamano: 10 
                },];
    var objJup = nom_div('Jupiter_svg');
    var jupiter = {
        tamano: objJup.height.baseVal.value, 
        x : objJup.x.baseVal.value, 
        y : objJup.y.baseVal.value
    };
    var objeto = "";
    var ruta = "";
    var velInicia = 3000;
    for(var i = 1; i <= lunas.length; i++)
    {
    	objeto = nom_div("objeto_" + i);
    	ruta = nom_div("svg_" + i);
    	crealunas(objeto, lunas[i - 1]);
    	movimiento(ruta, objeto, velInicia);
    	velInicia += 4000;
    }
    console.log("Hola mundo");
    function nom_div(div)
    {
        return document.getElementById(div);
    }
}