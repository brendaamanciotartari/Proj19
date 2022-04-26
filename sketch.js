var torre;
var torreImg;

var portaImg;
var porta;
var portaGrupo;

var gradeImg;
var grade;
var gradeGrupo;

var fantasma;
var fantasmaImg;

var blocoInv;
var blocoGrupo;

var estado = "JOGAR";

var somAssustador;

var score = 0

function preload(){
  torreImg = loadImage("tower.png");
  portaImg = loadImage("door.png");
  gradeImg = loadImage("climber.png");
  fantasmaImg = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
}



function setup() {
  createCanvas(600,600);
  somAssustador.loop();

    torre = createSprite(300,300);
    torre.addImage(torreImg);
    torre.velocityY = 1;

    portaGrupo = new Group();
    gradeGrupo = new Group();
    blocoGrupo = new Group();

    fantasma = createSprite(200,200,50,50);
    fantasma.scale = 0.3;
    fantasma.addImage("fantasma", fantasmaImg);
}



function draw() {
 background("black");
 drawSprites();

 if(estado === "JOGAR"){

    score = score + Math.round(frameRate()/60);

    if (torre.y > 590){
        torre.y = 300;
    }
   
       if(keyDown("right")){
         fantasma.x = fantasma.x + 3;
        }
   
       if(keyDown("left")){
           fantasma.x = fantasma.x - 3;
       }
   
    if(keyDown("space")){
        fantasma.velocityY = -10;
    }
   fantasma.velocityY = fantasma.velocityY + 0.8;
   
       if(gradeGrupo.isTouching(fantasma)){
           fantasma.velocityY = 0;
       }
       if(blocoGrupo.isTouching(fantasma)||fantasma.y>600){
           estado = "ENCERRAR";
       }

       gerarPortas();
 }

 if(estado === "ENCERRAR"){
     stroke("yellow");
     fill("yellow");
     textSize(30);
     text("Game Over", 230, 250);
     torre.velocityY = 0;
     portaGrupo.setVelocityYEach(0);
     gradeGrupo.setVelocityYEach(0);
     blocoGrupo.setVelocityYEach(0);
 }
 stroke("yellow");
 fill("yellow");
 textSize(30);
 text("Score: "+score,20,30);




}
    function gerarPortas(){
        if (frameCount % 240 === 0){
             porta = createSprite(200,-50);
              porta.addImage("porta", portaImg);

             grade = createSprite(200,10);
             grade.addImage("grade",gradeImg);

             porta.x = Math.round(random(120,400));
             porta.velocityY = 1;

             grade.x = porta.x;
             grade.velocityY = 1;

             blocoInv = createSprite(200, 15, grade.width, 2);

             blocoInv.x = porta.x;
             blocoInv.velocityY = 1;
             blocoInv.visible = false;

             fantasma.depth = porta.depth;
             fantasma.depth = fantasma.depht + 1;

             porta.lifetime = 800;
             grade.lifetime = 800;

              portaGrupo.add(porta);
              gradeGrupo.add(grade);
              blocoGrupo.add(blocoInv);

        }
    }


