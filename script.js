onload = () => {
    if (isOnMobile()) document.getElementById("lien_pc").style.visibility="visible";
    go("jeux","jeux");
    resetChrono();
}

/* Gestion de la navigation */
onpopstate = (event) => {
    let [ecran, section] = event.state;
    directGo(ecran, section)
}

let currentSection;
function go(ecran,section){
    directGo(ecran, section);
    history.pushState([ecran, currentSection], "");
}
function directGo(ecran,section) {
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

/* formatage JS  */
function isOnMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
 };
