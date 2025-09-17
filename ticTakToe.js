let boxes=document.querySelectorAll('.box');
let resetBtn=document.querySelector('#reset-btn');
let newGameBtn=document.querySelector('#new-btn');
let msgContainer=document.querySelector('.msg-container');
let msg=document.querySelector('#msg');

let turnO=true; // playerO starts
let moveCount=0;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const disableBoxes=()=>{
    boxes.forEach((box)=> box.disabled=true);
};

const enableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
        box.classList.remove('win');
    });
};

const showMessage=(text)=>{
    if(msg) msg.innerText=text;
    if(msgContainer) msgContainer.classList.remove('hide');
};

const hideMessage=()=>{
    if(msgContainer) msgContainer.classList.add('hide');
    if(msg) msg.innerText="";
};

const highlightPattern=(pattern)=>{
    pattern.forEach((idx)=> boxes[idx].classList.add('win'));
};

const checkwinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!=="" && pos2Val!=="" && pos3Val!==""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                highlightPattern(pattern);
                showMessage(`Winner: ${pos1Val}`);
                disableBoxes();
                return true;
            }
        }
    }
    if(moveCount===9){
        showMessage("It's a Draw!");
        return true;
    }
    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        moveCount++;
        checkwinner();
    });
});

const resetGame=()=>{
    turnO=true;
    moveCount=0;
    hideMessage();
    enableBoxes();
};

resetBtn.addEventListener('click', resetGame);
if(newGameBtn) newGameBtn.addEventListener('click', resetGame);