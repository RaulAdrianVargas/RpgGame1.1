document.addEventListener('DOMContentLoaded', function(){
let exp = 0;
let salud = 100;
let oro = 50;
let armaActual = 0;
let luchando;
let saludMonstruo;
let inventario = ['palo'];

let eleccionJugador;
const boton1 = document.querySelector('#button1');
const boton2 = document.querySelector('#button2');
const boton3 = document.querySelector('#button3');
const texto = document.querySelector('#text');
const textoXp = document.querySelector('#xpText');
const textoSalud = document.querySelector('#healthText');
const textoOro = document.querySelector('#goldText');
const statsMonstruos = document.querySelector('#monsterStats');
const nombreDelMonstruo = document.querySelector('#monsterName');
const saludDelMonstruo = document.querySelector('#monsterHealth');

const weapons = [
    {
        name: "palo",
        power: 5,
    },
    {
        name: "daga",
        power: 30,
    },
    {
        name: "hacha de batalla",
        power: 50,
    },
    {
        name: "espada epica",
        power: 100,
    }
];

const monsters = [
    {
        name:"slime",
        level: 2,
        health:15, 
    },
    {
        name:"Bestia Peligrosa",
        level: 8,
        health:60, 
    },
    {
        name:"Dragon",
        level: 20,
        health: 300, 
    },
]

const locations = [
    {
        name: "plaza del pueblo",
        "button text":["Ir a la tienda","Aventurarse en la cueva","Pelearle al jefe."],
        "button functions": [goStore, goCave, fightBoss],
        text: "Estas en la plaza del pueblo. Ves un signo que dice 'Tienda'. ¿Que deseas hacer?."
    },
    {
        name: "store",
        "button text": ["Curar 10 de salud (10 oro)","Comprar armita nueva (30 oro)","Volver a la plaza."],
        "button functions": [buyHealth,buyWeapon,goTown],
        text: "Estas en la tienda. ¿Que te gustaria comprar?"
    },
    {
        name: "cave",
        "button text": ["Pelear slime","Pelear bestia intimidante","Volver a la plaza."],
        "button functions":[figthSlime, fightBeast, goTown],
        text: "Entraste a la cueva. Ves unos cuantos monstruos. ¿Que hacemos?."
    },
    {
        name: "fight",
        "button text": ["Atacar","Esquivar","Correr"],
        "button functions":[attack, dodge, goTown],
        text: "Estas peleando con un enemigo."
    },
    {
        name: "Kill Monster",
        "button text": ["Volver a la plaza","Volver a la plaza","Opa, te gusta apostar?"],
        "button functions":[goTown, goTown, tirarMoneda],
        text: "Derrotaste al monstruo! Se escucha un 'Argh!' a traves de las paredes de la cueva. Ganaste experiencia y oro."
    },
    {
        name: "lose",
        "button text": ["Volver a intentar?","Volver a intentar?","Volver a intentar?"],
        "button functions":[restart, restart, restart],
        text: "Te derrotaron..."
    },
    {
        name: "win",
        "button text": ["Volver a jugar?","Volver a jugar?","Volver a jugar?"],
        "button functions":[restart, restart, restart],
        text: "Mataste al jefe final! GANASTE!! "
    },
    { 
        name: "cara o cruz", 
        "button text": ["Cara?","Cruz?","No gracias, soy malo en el azar"], 
        "button functions":[cara, cruz, goTown], 
        text: "Queres jugar al cara o cruz? La apuesta vale 10 monedas. Si ganas te llevas 50. Y si perdes, perdes 20 de vida." 
    },
];

// botones de inicializacion

boton1.onclick= goStore;
boton2.onclick= goCave;
boton3.onclick= fightBoss;

function update(location){
    statsMonstruos.style.display = "none";
    boton1.innerText = location["button text"][0];
    boton2.innerText = location["button text"][1];
    boton3.innerText = location["button text"][2];
    texto.innerText= location.text
    boton1.onclick= location["button functions"][0];
    boton2.onclick= location["button functions"][1];
    boton3.onclick= location["button functions"][2];
}

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);

}

function goCave(){
    update(locations[2])
    console.log("Going to cave.")
}



function buyHealth(){
    if(oro >= 10){
        oro -= 10;
        salud += 10;
        textoOro.innerText = oro;
        textoSalud.innerText = salud;
    }   
    else {
        texto.innerText = "No tenes suficientes monedas de oro para comprar."
    }

}

function buyWeapon(){
    if(armaActual < weapons.length - 1){
        if(oro >= 30){
            oro -= 30;
            armaActual++;
            textoOro.innerText = oro;
            let newWeapon = weapons[armaActual].name;
            texto.innerText = "Compraste una nueva arma: " + newWeapon + ". ";
            inventario.push(newWeapon);
            texto.innerText += "Ahora tenes: "+ inventario;
        }else{
            texto.innerText= "No tenes suficientes monedas para comprar un armita."
        }
    }else{
        texto.innerText= "Ya tenes el arma mas poderosa del jueguito.";
        boton2.innerText = "Vender arma por 15 monedas.";
        boton2.onclick= sellWeapon;
    }
}


function sellWeapon(){
    if(inventario.length > 1){
        oro += 15;
        textoOro.innerText = oro;
        let armaActual = inventario.shift();
        texto.innerText= "Vendiste: "+ armaActual;
        texto.innerText+= "Ahora tenes: " + inventario;
    }else{
        texto.innerText="No vendas tu unica arma!.";
    }
}


function figthSlime(){
    luchando = 0;
    goFight();
}

function fightBeast(){
    luchando = 1;
    goFight();
}

function fightBoss(){
    luchando = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    saludMonstruo = monsters[luchando].health;
    statsMonstruos.style.display = "block";
    console.log(monsters[luchando].name);
    nombreDelMonstruo.innerText = monsters[luchando].name;
    saludDelMonstruo.innerText = saludMonstruo;
}

function attack(){
    texto.innerText = "El "+ monsters[luchando].name + " ataca. ";
    texto.innerText += "Y vos lo atacas con tu: " + weapons[armaActual].name + ".";
    salud -= monsters[luchando].level;
    saludMonstruo -= weapons[armaActual].power + Math.floor(Math.random()* exp)+1;
    textoSalud.innerText = salud;
    saludDelMonstruo.innerText = saludMonstruo;
    if( salud <= 0 ){
        perdiste();
    }else if ( saludMonstruo <= 0){
        luchando === 2 ? ganaste() : matarMonstruo();
    }                                
}

function dodge(){
    texto.innerText = "Esquivaste el ataque del " + monsters[luchando].name;
}

function matarMonstruo(){
    oro += Math.floor(monsters[luchando].level *6.7);
    exp += monsters[luchando].level;
    textoOro.innerText= oro;
    textoXp.innerText= exp;
    update(locations[4]);
}


function cara(){
    jugarCaraCruz("cara")
}

function cruz(){
    jugarCaraCruz("cruz")
}

function jugarCaraCruz(eleccionJugador){
    boton1.disabled = true;
    boton2.disabled = true;
    boton3.disabled = true;
    if (oro < 10) {
        texto.innerText = "No tienes suficiente oro para jugar a cara o cruz.";
        return;
    }
    
    oro -= 10;
    textoOro.innerText = oro;

    const resultado = Math.random() < 0.5 ? "cara" : "cruz";
    texto.innerText = `Lanzaste la moneda... ¡Salió ${resultado}!`;

    if (eleccionJugador === resultado) {
        oro += 50;
        texto.innerText += " ¡Ganaste 50 monedas de oro!";
    } else {
        salud-= 20;
        texto.innerText += " Que mal, perdiste...";
    }
    textoSalud.innerText = salud;
    textoOro.innerText = oro;
    setTimeout(() => {
        boton1.disabled = false;
        boton2.disabled = false;
        boton3.disabled = false;
    }, 3500);
    setTimeout(goTown, 3500);
}

function tirarMoneda(){
    update(locations[7]);
}

function perdiste(){
    update(locations[5]);
}

function ganaste(){
    update(locations[6]);
}

function restart(){
    exp = 0;
    salud = 100;
    oro = 50;
    armaActual = 0;
    inventario = ['palo'];
    textoOro.innerText = oro;
    textoSalud.innerText = salud;
    textoXp.innerText = exp;
    goTown();
}
});