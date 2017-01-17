function Planet(name, top, left, translacao, altura, speedTrans, rotacao, pai, indexZ){
  this.name = name;
  this.topProp = top;
  this.leftProp = left;
  this.translacao = translacao;
  this.altura = altura;
  this.speedTrans = speedTrans;
  this.rotacao = rotacao;
  this.pai = pai;
  this.indexZ = indexZ;
  this.ident = document.getElementById(name);

  var anguloRot = 1;
  this.ident.style.zIndex = this.indexZ*-1;
  var troca = 0;

  this.setTopStyle = function(angle){      
    if(this.pai!=null){
      this.topProp = (Math.sin(angle*speedTrans) * this.altura) + this.pai.topProp;
      
      if (this.topProp>=this.pai.topProp && troca==0){
        this.ident.style.zIndex *= -1;

        if (this.pai.pai!=null){
          this.ident.style.zIndex = +this.pai.ident.style.zIndex + 1;
        }
        troca=1;
      }
      else if(this.topProp<this.pai.topProp && troca==1){
        this.ident.style.zIndex *= -1;

        if (this.pai.pai!=null){
          this.ident.style.zIndex = +this.pai.ident.style.zIndex - 1;
        }
        troca=0;
      }
    }
    else{
      this.topProp = (Math.sin(angle*speedTrans) * this.altura);
    }
    
    this.ident.style.top = this.topProp + "px";
  }
  this.setLeftStyle = function(angle){
    if(this.pai!=null){
      this.leftProp = (Math.cos(angle*speedTrans) * this.translacao) + this.pai.leftProp;
    }
    else{
      this.leftProp = (Math.cos(angle*speedTrans) * this.translacao);
    }
    
    this.ident.style.left = this.leftProp + "px";
  }

  this.setRotacao = function(){
    this.ident.style.transform = "rotateY(" + (anguloRot*rotacao) + "deg )";
    anguloRot++;
    if (anguloRot*rotacao>360) {anguloRot=1;}
  }
}

var planets = [];

// name, top, left, translacao, altura, speedTrans, rotacao, pai, indexZ
var sol = new Planet("Sun", 0, 0, 0, 0, 0, 0, null, 1);
var earth = new Planet("Earth", 0, 0, 300, (300/3.75), 1, 8, sol, 30);
var lua = new Planet("Moon", 0, 0, 50, 30, (earth.speedTrans/0.166), 12, earth, 30);
var saturno = new Planet("Saturn", 0, 0, 500, (500/3.75), (earth.speedTrans/29.46), 4, sol, 60);
var urano = new Planet("Uranus", 0, 0, 725, (725/3.75), (earth.speedTrans/84.01), 2, sol, 70);
var netuno = new Planet("Neptune", 0, 0, 950, (950/3.75), (earth.speedTrans/164.8), .5, sol, 80);

planets.push(sol,earth,lua, saturno, urano, netuno);

// ctrl.innerHTML="Teste";
var angle = 180, lastTime = null;
function animate(time) {
  if (lastTime !== null)
    angle += (time - lastTime) * 0.001;
  lastTime = time;

  for (x=0; x<planets.length; x++){
    planets[x].setTopStyle(angle);
    planets[x].setLeftStyle(angle);
    planets[x].setRotacao();

  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);


$(document).ready(function(){
  $('#innerContent').html($("#planetSun").html());
});

$(".navbar a").on("click", function(){

  $(".shadowed").removeClass("shadowed");

  var selectedPlanet = $(this).attr("data-selected-id");
  // $(selectedPlanet).css("background-color","red");
  $("#" + selectedPlanet).addClass("shadowed");

  $('#innerContent').html($("#planet"+selectedPlanet).html());
});

$(".closeInfo").on("click", function(){
  $(".shadowed").removeClass("shadowed");
});