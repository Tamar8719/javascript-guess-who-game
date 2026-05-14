const board = document.querySelector("#board")
const quetionList = document.querySelector(".quetionList")
const subQuetionList = document.querySelector(".subQuetionList")
const main = document.querySelector("main")
const Audiofailed = new Audio('../audio/wrong.mp3')
const Audiowin = new Audio('../audio/WOW.WAV')
const AudioGameover = new Audio('../pic/game_over.mp3')
const AudioHidden = new Audio('../audio/click.mp3')
const AudioGuess = new Audio('../audio/check.mp3')



let count = 5
let tryCount = document.createElement("div")
main.appendChild(tryCount)
tryCount.className = 'tryCount'
tryCount.innerText = "נותרו לך: " + count + " שאלות  "
//השחקן מתחיל עם 40 נקודות
let zover = 40
//דיב שצובר את נקודות הניצחון
let victoryPoints = document.createElement("div")
main.appendChild(victoryPoints)
victoryPoints.className = 'victoryPoints'
victoryPoints.innerText = "יש לך: " + zover + " נקודות  "

//יצירת מערך של כל תתי השאלות על מנת לזהות שאלה שנלחצה
const subQuetionIdArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


const person2 = [
    //[id, name, gender, color_hair, glasses, headCover, beard, moreDatales, image]
    ["people1", "יוסף", "בן", "ג'ינג'י", "יש משקפיים", "כיפה", "אין זקן", "חולצת צווארון", "../images/1.jpg"],
    ["people2", "יהודה", "בן", "חום", "יש משקפיים", "כובע", "אין זקן", "חולצת צווארון", "../images/2.jpg"],
    ["people3", "ריקי", "בת", "חום", "יש משקפיים", "סרט", "אין זקן", "נמשים", "../images/3.jpg"],
    ["people4", "בת שבע", "בת", "ג'ינג'י", "אין משקפיים", "סרט", "אין זקן", "תלתלים", "../images/4.jpg"],
    ["people5", "רותי", "בת", "חום", "יש משקפיים", "אין", "אין זקן", "חולצת צווארון", "../images/5.jpg"],
    ["people6", "גבריאל", "בן", "שחור", "יש משקפיים", "כובע", "יש זקן", "חולצת צווארון", "../images/6.jpg"],
    ["people7", "מטילדה", "בת", "לבן", "יש משקפיים", "כובע", "אין זקן", "פרח על המטפחת", "../images/7.jpg"],
    ["people8", "שפרה", "בת", "לא ידוע", "יש משקפיים", "מטפחת", "אין זקן", "סינר", "../images/8.jpg"],
    ["people9", "מנחם", "בן", "בלונדיני", "יש משקפיים", "כיפה", "אין זקן", "חולצת צווארון", "../images/9.jpg"],
    ["people10", "בנימין", "בן", "חום", "אין משקפיים", "כיפה", "אין זקן", "חולצת צווארון", "../images/10.jpg"],
    ["people11", "אלי", "בן", "בלונדיני", "אין משקפיים", "אין", "אין זקן", "מוצץ", "../images/11.jpg"],
    ["people12", "חנן", "בן", "שחור", "אין משקפיים", "כיפה", "אין זקן", "תלתלים", "../images/12.jpg"],
    ["people13", "אילה", "בת", "בלונדיני", "אין משקפיים", "אין", "אין זקן", "חולצת צווארון", "../images/13.jpg"],
    ["people14", "ג'ייקוב", "בן", "חום", "יש משקפיים", "כיפה", "יש זקו", "חולצת צווארון", "../images/14.jpg"],
    ["people15", "יעקב מנחם", "בן", "אפור", "יש משקפיים", "כובע", "יש זקן", "חולצת צווארון", "../images/15.jpg"],
]

//מגריל אינדקס של כרטיס במערך
const chooseCardIndex = Math.floor(Math.random() * person2.length);

//יצירת לוח הדמיות + תמונות
for (let i = 0; i < person2.length; i++) {
    let person = document.createElement("div")
    board.appendChild(person)
    person.setAttribute("id", `people${i + 1}`)
    person.className = 'person'
    person.style.backgroundImage = `url(${person2[i][person2[i].length - 1]})`
    let mone = 0;
    person.addEventListener("click", () => {
        mone++
        if (mone == 1) {
            //תפיסת השם למשתנה
            const name = person2[i][1]
            //יצירת תיבת טקסט המאפשרת לנחש את הדמות
            const guessdiv = document.createElement("div")
            person.appendChild(guessdiv)
            guessdiv.className = 'guessdiv'
            guessdiv.innerText = ("אני רוצה לנחש את - " + name)

            //יצירת כפתור המאפשר ניחוש
            const buttonGuess = document.createElement("button")
            guessdiv.appendChild(buttonGuess)
            buttonGuess.className = 'buttonGuess'
            buttonGuess.innerText = ("אישור")
            buttonGuess.addEventListener("click", () => {
                buttonGuess.style.visibility = "hidden"
                const selectUser = JSON.parse(localStorage.getItem("selectUser"))
                if (person2[i][0] === person2[chooseCardIndex][0]) {

                    selectUser.win++
                    selectUser.try++
                    if (zover > selectUser.bestscore)
                        selectUser.bestscore = zover

                    const usersArr = JSON.parse(localStorage.getItem("users"))
                    const index = usersArr.findIndex(user => user.name === selectUser.name)
                    usersArr[index] = selectUser
                    localStorage.setItem("users", JSON.stringify(usersArr))

                    const WinDiv = document.createElement("div")
                    main.appendChild(WinDiv)
                    WinDiv.className = 'WinDiv'
                    Audiowin.play()

                    const NewGame = document.createElement("button")
                    WinDiv.appendChild(NewGame)
                    NewGame.className = 'NewGame'
                    NewGame.innerText = "NewGame"

                    NewGame.addEventListener("click", () => {
                        window.location.href = "../html/index.html"
                    })

                    const Home = document.createElement("button")
                    WinDiv.appendChild(Home)
                    Home.className = 'Home'
                    Home.innerText = "Home"


                    Home.addEventListener("click", () => {
                        window.location.href = "../html/games.html"
                    })



                    Home.addEventListener("click", () => {
                        window.location.href = "../html/games.html"
                    })
                }
             
                else {
                    selectUser.lose++
                    selectUser.try++
                    const usersArr = JSON.parse(localStorage.getItem("users"))
                    const index = usersArr.findIndex(user => user.name === selectUser.name)
                    usersArr[index] = selectUser
                    localStorage.setItem("users", JSON.stringify(usersArr))
                    const failedDiv = document.createElement("div")
                    main.appendChild(failedDiv)
                    failedDiv.className = 'failedDiv'
                    Audiofailed.play()

                    const NewGame = document.createElement("button")
                    failedDiv.appendChild(NewGame)
                    NewGame.className = 'NewGame'
                    NewGame.innerText = "NewGame"

                    NewGame.addEventListener("click", () => {
                        window.location.href = "../html/index.html"
                    })

                    const Home = document.createElement("button")
                    failedDiv.appendChild(Home)
                    Home.className = 'Home'
                    Home.innerText = "Home"

                    Home.addEventListener("click", () => {
                        window.location.href = "../html/games.html"
                    })



                }

            })
        }
    })
}
  
//הגדרת מערכים עבור כל קטגורית שאלות
const ArrQuetion =
    [
        ["false", "מין", "בן", "בת"],
        ["false", "צבע שיער", "שחור", "חום", "בלונדיני", "ג'ינג'י", "לבן", "אפור"],
        ["false", "משקפיים", "יש משקפיים", "אין משקפיים"],
        ["false", "כיסוי ראש", "כיפה", "כובע", "מטפחת", "סרט"],
        ["false", "זקן", "יש זקן", "אין זקן"],
        ["false", "פרטים נוספים", "חולצת צווארון", "נמשים", "תלתלים", "סינר", "מוצץ"]
    ]
//יצירת כפתורי שאלות חיצוניים
for (let i = 0; i < ArrQuetion.length; i++) {

    let buttonsDiv = document.createElement("div")
    const quetionDiv = document.createElement("div")
    quetionDiv.className = "quetionDiv"

    const quetion = document.createElement("button")

    //יצירת ID לקטגורית השאלות
    quetion.setAttribute("id", `${i + 1}`)
    let quetionId = `${i + 1}`
    quetionDiv.appendChild(quetion)
    quetion.className = 'quetion'
    quetion.innerText = ArrQuetion[i][1];

    //יצירת אירוע בעת לחיצה
    quetion.addEventListener("click", () => {
        //איפוס המקום במערך תתי השאלות 
        let countInd = 0

        //יצירת כפתורי שאלות
        for (let j = 2; j < ArrQuetion[i].length; j++) {
            let subQuetion = document.createElement("button")
            subQuetion.className = "subQuetion";
            //יוצר ID לתתי השאלות
            subQuetion.setAttribute("id", `${countInd}`)
            let subQuetionId = `${countInd}`
            //שהאינדקס יתקדם
            countInd++;
            subQuetion.innerText = ArrQuetion[i][j];
            //אם הכפתור נלחץ שישתנה לאפור גם לפתיחה הבאה
            if (subQuetionIdArr[quetionId + subQuetionId] == -1) {
                subQuetion.style.backgroundColor = "lightgray"
                subQuetion.style.opacity = "50%"
            }
            //יצירת אירוע בעת לחיצה
            subQuetion.addEventListener("click", () => {
                if (count > 0 && subQuetionIdArr[quetionId + subQuetionId] != -1) {
                    count--
                    subQuetionIdArr[quetionId + subQuetionId] = -1
                    subQuetion.style.backgroundColor = "lightgray"
                    subQuetion.style.opacity = "50%"
                    tryCount.innerText = "נותרו לך: " + count + " נסיונות"

                    //flag1-נדלק כשמוצא התאמה בין הכפתור עליו לחץ השחקן לבין מערך התמונה שהחשב הגריל
                    let flag1 = false
                    //flag2-נדלק כאשר נמצא התאמה בין כפתור שנלחץ לבין כל מערך של תמונה 
                    let flag2 = false
                    //ריצה על מערך התמונה אותה המחשב הגריל והשוואה לכפתור שנלחץ
                    for (let x = 0; x < person2[chooseCardIndex].length; x++) {
                        if (person2[chooseCardIndex][x] === subQuetion.textContent) {
                            flag1 = true
                            console.log(flag1)
                            //    subQuetion.textContent
                        }

                    }

                    for (let k = 0; k < person2.length; k++) {
                        for (let s = 0; s < person2[k].length; s++) {
                            if (flag1 == false && person2[k][s] === subQuetion.textContent) {
                                let ID = person2[k][0]
                                let CardID = document.getElementById(`${ID}`)
                                CardID.style.visibility = "hidden"
                                AudioHidden.play()


                            }
                        }
                    }
                    //בדיקה האם יש התאמה בין הכפתור שנלחץ לבין התמונה שהמחשב הגריל
                    if (flag1 === true) {
                        //מעלה 20 נקודות בכל שאלה נכונה
                        zover += 20
                        for (let i = 0; i < person2.length; i++) {
                            flag2 = false
                            for (let j = 0; j < person2[i].length; j++) {
                                if (person2[i][j] === subQuetion.textContent) {
                                    //נדלק כשמצא התאמה בין הכתור הנלחץ לבין אחת מהתמונות במערך הגדול שהדמיות
                                    flag2 = true
                                }
                            }

                            //מה קורה כאשר אין התאמה בין הכפתור הנלחץ לבין הדמות שנבחרה
                            if (flag2 == false) {
                                //pId-מקבל את הקוד של התמונה שצריכה להמחק מהלוח
                                let pId = person2[i][0]
                                //תפיסת התמונה ע"פ הקוד הרצוי
                                let Card = document.getElementById(`${pId}`)
                                //מחיקת התמונה מהלוח
                                Card.style.visibility = "hidden"
                                AudioHidden.play()
                            }
                        }
                    }
                    //מוריד נקודות במידה ולא הצליח
                    else {
                        zover -= 10
                    }
                    victoryPoints.innerText = "יש לך: " + zover + " נקודות  "
                    console.log(zover)

                }
                else
                    count--
                //נגמרו מספר שאלות
                if (count < 0) {
                    const selectUser = JSON.parse(localStorage.getItem("selectUser"))
                    selectUser.lose++
                    selectUser.try++
                    localStorage.setItem("selectUser", JSON.stringify(selectUser))
                    const usersArr = JSON.parse(localStorage.getItem("users"))
                    const index = usersArr.findIndex(user => user.name === selectUser.name)
                    usersArr[index] = selectUser
                    localStorage.setItem("users", JSON.stringify(usersArr))
                    const FinishDiv = document.createElement("div")
                    main.appendChild(FinishDiv)
                    FinishDiv.className = 'FinishDiv'
                    AudioGameover.play()

                    const NewGame = document.createElement("button")
                    FinishDiv.appendChild(NewGame)
                    NewGame.className = 'NewGame'
                    NewGame.innerText = "NewGame"

                    NewGame.addEventListener("click", () => {
                        window.location.href = "../html/index.html"
                    })

                    const Home = document.createElement("button")
                    FinishDiv.appendChild(Home)
                    Home.className = 'Home'
                    Home.innerText = "Home"

                    Home.addEventListener("click", () => {
                        window.location.href = "../html/games.html"
                    })


                }
            })

            if (ArrQuetion[i][0] === "false") {
                buttonsDiv.appendChild(subQuetion)
                if (j == ArrQuetion[i].length - 1) {
                    ArrQuetion[i][0] = "true"
                }
            }
            else {
                buttonsDiv.childNodes[j]
                if (j == ArrQuetion[i].length - 1) {
                    ArrQuetion[i][0] = "false"
                    while (buttonsDiv.childNodes.length > 0) {
                        buttonsDiv.childNodes[0].remove();
                    }
                }
            }
        }
        quetionDiv.appendChild(buttonsDiv)
        //quetion.removeEventListener("click",)
    })
    quetionList.appendChild(quetionDiv)
}




