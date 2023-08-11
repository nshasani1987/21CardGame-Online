const discriptionBtn = document.getElementById("discription-btn")
const gameDiscription = document.getElementById("game-discription")

discriptionBtn.addEventListener("click" , function showRules(){
    if(gameDiscription.style.display === "none"){
        gameDiscription.style.display = "block"
    }else{
        gameDiscription.style.display = "none"
    }
})