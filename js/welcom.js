const buuton = document.querySelector(".enterbutton")//קבלת כפתור הכניסה
//localStorage.clear()//למחוק את כל הנתונים ששמורים במחשב

buuton.addEventListener("click", () => {
    const name = document.getElementById("name").value
    const pass = document.getElementById("pass").value
    const checkpass = document.getElementById("checkpass").value
    let userarr = []
    const userStr = localStorage.getItem("users");
    if (userStr != undefined && userStr != null) {
        userarr = JSON.parse(userStr);
    }
    const userobj = {
        name: name,
        password: pass, 
        bestscore: 0,
        win: 0,
        lose: 0,
        try: 0
        
    }
    let newUser = false
    if (checkpasswords(pass, checkpass)) {
        for (let i = 0; i < userarr.length; i++) {
            if (userarr[i].name === name) {
                newUser = true
            }
        }
        if (newUser) {
            alert("שם קיים במערכת")
        }
        else {
            userarr.push(userobj)
            localStorage.setItem("users", JSON.stringify(userarr))
            window.location.href = "../html/enter.html"
        }
        document.getElementById("name").value = ""; // מוחק את השם
        document.getElementById("pass").value = ""; // מוחק את הסיסמה
        document.getElementById("checkpass").value = ""; // מוחק את הסיסמה
    }
    else {
        document.getElementById("pass").value = ""; // מוחק את הסיסמה
        document.getElementById("checkpass").value = ""; // מוחק את הסיסמה
    }

})
const checkpasswords = (pass, checkpass) => {
    let hasLetter = false;
    let isValid = true; // משתנה לבדיקת אם כל התוויים חוקיים (אותיות ומספרים)
    // אם הסיסמה קצרה מדי
    if (pass.length < 6) {
        alert("הסיסמה צריכה לכלול לפחות 6 תווים.");
        return false;
    }

    // בודק אם הסיסמה ואימות הסיסמה תואמות
    if (pass !== checkpass) {
        alert("הסיסמאות אינן תואמות.");
        return false;
    }

    // בודק את הסיסמה בלולאה אחת
    for (let i = 0; i < pass.length; i++) {
        // בודק אם הסיסמה מכילה רק תווים חוקיים (אותיות ומספרים)
        if (!((pass[i] >= 'a' && pass[i] <= 'z') || (pass[i] >= 'A' && pass[i] <= 'Z') || (pass[i] >= '0' && pass[i] <= '9'))) {
            isValid = false; // אם יש תו לא חוקי, הסיסמה לא חוקית
        }
        // בודק אם הסיסמה מכילה לפחות אות אחת באנגלית
        if ((pass[i] >= 'a' && pass[i] <= 'z') || (pass[i] >= 'A' && pass[i] <= 'Z')) {
            hasLetter = true;
        }
    }

    // אם יש תו לא חוקי
    if (!isValid) {
        alert("הסיסמה יכולה להכיל רק אותיות ומספרים.");
        return false;
    }

    // אם הסיסמה לא מכילה אות באנגלית
    if (!hasLetter) {
        alert("הסיסמה צריכה לכלול לפחות אות אחת באנגלית.");
        return false;
    }

    // אם כל התנאים מתקיימים
    return true;
}
