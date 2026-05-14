// localStorage.clear()//למחוק את כל הנתונים ששמורים במחשב
const h1 = document.getElementById("h1")
const user = JSON.parse(localStorage.getItem("selectUser"))
// localStorage.setItem("selectUser",user.name)
h1.textContent = `welcome ${user.name}`

const g2=document.querySelector("#myGame")
g2.addEventListener("mouseover",()=>{
    const bestscore = document.getElementById("ah1")
    const win = document.getElementById("bh1")
    const lose = document.getElementById("ch1")
    // const tries = document.getElementById("dh1")
    bestscore.textContent = `best score: ${user.bestscore} points`
    win.textContent = `win: ${user.win}`
    lose.textContent = `lose: ${user.lose}`
    g2.addEventListener("mouseleave",()=>{
        bestscore.textContent=""
        win.textContent=""
        lose.textContent=""
    })
})
// tries.textContent = `you try ${user.try} times in the last time you win`