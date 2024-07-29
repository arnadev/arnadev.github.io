let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-button");
let xvalue=0;
let yvalue=0;

let turn='X';
const winPatterns=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn==='X'){
            box.innerText='X';
            turn='O';
            box.style.color='#FFFFFF'
            box.style.textShadow= '4px 4px 3px #000000';
        }
        else{
            box.innerText='O';
            turn='X';
            box.style.color='#000000'
            box.style.textShadow= '4px 4px 3px gray';
        }
        box.disabled=true;

        checkWinner();
    });
});

const checkWinner=()=>{
    for(pattern of winPatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!='' && pos1===pos2 && pos2===pos3){
            boxes.forEach((box)=>{box.disabled=true;})
            if(pos1==='X'){
                document.querySelector("#x-value").innerText=Number(document.querySelector("#x-value").innerText)+1;
            }
            else{
                document.querySelector("#y-value").innerText=Number(document.querySelector("#y-value").innerText)+1;
            }
            
            boxes[pattern[0]].style.backgroundColor=(pos1==='X')?'rgb(255,255,255,.3)':'rgb(0,0,0,.3)';
            boxes[pattern[1]].style.backgroundColor=(pos1==='X')?'rgb(255,255,255,.3)':'rgb(0,0,0,.3)';
            boxes[pattern[2]].style.backgroundColor=(pos1==='X')?'rgb(255,255,255,.3)':'rgb(0,0,0,.3)';
            break;
            }
        }
    }

resetBtn.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerText='';
        box.disabled=false;
        box.style.backgroundColor='rgb(0,0,0,0)';
    });
    turn='X';
})