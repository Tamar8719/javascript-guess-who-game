const buuton = document.querySelector(".enterbutton")
let userarr = []
const userStr = localStorage.getItem("users")
if (userStr != undefined && userStr != null) {
    userarr = JSON.parse(userStr)
}
const userobj = {
    name: name,
    password: pass,
    bestscore: 300,
    win: 0,
    lose: 0,
    try: 0

}
buuton.addEventListener("click", () => {
    const name = document.getElementById("name").value
    const pass = document.getElementById("pass").value
    let boolean = false
    for (let i = 0; i < userarr.length; i++) {
        if (userarr[i].name === name && userarr[i].password === pass) {
            userobj.name = userarr[i].name
            userobj.password = userarr[i].password
            userobj.bestscore=userarr[i].bestscore
            userobj.win = userarr[i].win
            userobj.lose = userarr[i].lose
            userobj.try=userarr[i].try
            localStorage.setItem("selectUser", JSON.stringify(userobj))
            h2.innerHTML = "welcome to " + userobj.name
            window.location.href = "../html/games.html"
            boolean = true
            break
        }
    }
    if (!boolean) {
        h2.innerHTML = "שם משתמש או סיסמא שגויים"
    }
    document.getElementById("name").value = ""; // מוחק את השם
    document.getElementById("pass").value = ""; // מוחק את הסיסמה
})