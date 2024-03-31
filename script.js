onload = () => {
    go("jeux","jeux");
    resetChrono();
}

/* Gestion de la navigation */
onpopstate = (event) => {
    let [ecran, section] = event.state;
    go(ecran, section)
}

let currentSection;
function go(ecran,section) {
    if (section) currentSection = section; 
    
    for (divEcran of document.querySelectorAll(".ecran")) {
        if (divEcran.id == ecran) {
            divEcran.style.display = "flex";
            divEcran.className = "ecran "+ currentSection;
        } 
        else {
            divEcran.style.display = "none";
        }
    }
    history.pushState([ecran, currentSection], "")
}
let liensMiniJeux = [
    "https://wordwall.net/fr/resource/31172804/tap-h%c3%a9-1",
    "https://wordwall.net/fr/resource/65660529/tape-h%c3%a9-3",
    "https://wordwall.net/fr/resource/65660297/tap%c3%a9-h%c3%a9-2",
    "https://wordwall.net/fr/resource/65660878/tape-h%c3%a9-4",
    "https://wordwall.net/fr/resource/65661228/tap-h%c3%a9-5",
    "https://wordwall.net/fr/resource/65661625"
]
function minijeu(i){
    location = liensMiniJeux[i-1];
}

/* Gestion du Chonomètre */
let bip = new Audio("media/bip.mp3");
let valeurChono = 12;
let timer;
function resetChrono(){
    let temps = document.getElementById("temps-chrono");
    temps.classList.remove("en-cours");  
    if (timer) {
        clearTimeout(timer);
    }
    let limite = document.getElementById("limite-chrono").value|0;
    valeurChono = limite;
    refreshChrono();
}
function startChrono(){
    resetChrono();
    let temps = document.getElementById("temps-chrono");
    temps.classList.add("en-cours");  
    timer = setInterval(tickChrono,1000);
}

function stopChrono(){
    clearTimeout(timer);
    let temps = document.getElementById("temps-chrono");
    temps.classList.remove("en-cours");  
    bip.play();
}
function tickChrono(){
    valeurChono -= 1;
    if (valeurChono <= 0) {
        stopChrono();
    }    
    refreshChrono();
}
function refreshChrono(){
    let temps = document.getElementById("temps-chrono");
    let minutes = (valeurChono/60)|0;
    let secondes = valeurChono%60;
    temps.textContent = (minutes<10?"0":"") + minutes + ":" + (secondes<10?"0":"") + secondes;
}
function changeChrono(){
    resetChrono();
}