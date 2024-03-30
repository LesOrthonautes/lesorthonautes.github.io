function go(ecran) {
    for (divEcran of document.querySelectorAll(".ecran")) {
        divEcran.style.display = divEcran.id == ecran 
            ? 'flex'
            : 'none'
    }
    history.pushState(ecran, "")
}

onpopstate = (event) => {
    console.log("back to '" + event.state + "'")
    go(event.state)
}

go("jeux");
/*
setTimeout(() => {
    document.querySelectorAll('.jeu').forEach(gridItem => {
        gridItem.classList.remove('apparition');
        gridItem.classList.add('secoue');
        gridItem.onclick = () => {
            gridItem.classList.remove('secoue');
            gridItem.classList.add('zoom');
            setTimeout(() => location = "taphe.html",400); 
        }
    })
    }, 500
)
*/