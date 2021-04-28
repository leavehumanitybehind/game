const playField = document.querySelector(".play-field");
const btns = playField.querySelector('.btns');
const allBtns = playField.querySelectorAll('button');
const playFieldTemplate = document.getElementById("tpl").content.querySelector('.play');
const rulesBtn = document.querySelector('.rules-btn')
const modal = document.querySelector(".modal-rules");
const modalCloseBtn = document.querySelector('.modal-close-btn');
const rules = { 'rock': 'scissors', "paper": "rock", "scissors": "paper" };
const choices = Object.keys(rules);
let score = 0;
let enemyId = '';
let newT = '';

const hideField = () => {
    btns.style = "display:none";
}

const showField = () => {
    btns.style = "display:grid";
}

const toggleModal = () => {
modal.classList.toggle("modal-rules-show")
}

rulesBtn.addEventListener('click',toggleModal);
modalCloseBtn.addEventListener('click', toggleModal)

const createNewField = (id) => {
    let newTemplate = playFieldTemplate.cloneNode(true);
    newT = newTemplate;
    playField.appendChild(newTemplate);
    let btn = document.querySelector(".your-btn");
    btn.id = id;
}

const chooseRandomElem = (array) => {
    let rand = array[Math.floor(Math.random() * array.length)];
    return rand;
}

const changeRandomBtnId = (m) => {
    let randomBtn = document.querySelector('.random-btn');
    randomBtn.id = chooseRandomElem(choices);
    let newVariants = choices.filter(elem => elem !== m);
    randomBtn.id = chooseRandomElem(newVariants);
    enemyId = randomBtn.id;
    return enemyId;
}

const editAgainBlock = (text) => {
    const againBlock = newT.querySelector('.again');
    const againText = newT.querySelector('.again-text');
    againBlock.style = "display:block";
    againText.innerText = text;

}

const addWinAnimation = (btn) => {
    btn.classList.add("btn-win");
    setTimeout(function () {
        btn.classList.remove("btn-win");
    }, 5000)
}

const checkTheWinner = (yourId) => {
    const btn = document.querySelector('.your-btn');
    const enemyBtn = document.querySelector('.random-btn');
    const userWin = rules[yourId];
    if (userWin === enemyId) {
        editAgainBlock("You win!");
        addWinAnimation(btn);
        score++;
        document.querySelector('.score-count').innerText = score;
    } else {
        editAgainBlock("You loose!");
        addWinAnimation(enemyBtn);
    }
    playAgain();
}

const initGame = (e) => {
    let targ = '';
    for (let i = 0; i <= allBtns.length; i++) {
        if (allBtns[i] === e.target) {
            targ = e.target.id;
            hideField();
        }
    }
    createNewField(targ);
    setTimeout(function () {
        changeRandomBtnId(targ)
    }, 1000);
    setTimeout(function () {
        checkTheWinner(targ);
    }, 2500)
}

const playAgain = () => {
    const playAgainBtn = newT.querySelector('.again-btn');
    const play = document.querySelector('.play')
    playAgainBtn.addEventListener('click', function () {
        playField.removeChild(play);
        showField();
    });
}

btns.addEventListener('click', initGame);

