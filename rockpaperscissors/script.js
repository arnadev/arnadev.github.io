let picked=null;
let selected=null;
let playBtn=document.querySelector("#confirm");
let resetBtn=document.querySelector("#reset");


let hands=document.querySelectorAll(".hand");

hands.forEach((hand)=>{
    hand.addEventListener('click',()=>{
        playBtn.style.visibility='visible';
        if(selected!=null)
        {
        selected.style.filter='none';
        }
        selected=hand;
        hand.style.filter='invert()';
    });
});

playBtn.addEventListener('click',()=>{
    hands.forEach((hand)=>{hand.style.visibility='hidden';});
    playgame();
})

const playgame=()=>{
    playBtn.style.visibility='hidden';
    let comp=hands[Math.floor(Math.random()*3)];
    let battle=document.querySelector('#battle');
    let user=selected.getAttribute("id").toUpperCase();
    let opp=comp.getAttribute("id").toUpperCase();


    battle.innerHTML=`${user}&nbsp;&nbsp;<br>VS<br>&nbsp;&nbsp;${opp}`;
    battle.style.visibility='visible';
    battle.classList.add('dropin');
    setTimeout(()=>{
        battle.classList.remove('dropin');
    },1000);
    setTimeout(()=>{
        battle.classList.add('dropin');
    },2000);

    setTimeout(()=>{
        battle.innerHTML=message;
    },2000)

    setTimeout(()=>{
        resetBtn.style.visibility='visible';
    },3000)

    let res,message;
    if(user==opp){
        message='TIE: SAME HAND';
    }

    else if(user=='ROCK'){
        if(opp=='PAPER'){
            res='LOSE';
        }
        else{
            res='WIN';
        }
    }
    else if(user=='PAPER'){
        if(opp=='SCISSORS'){
            res='LOSE';
        }
        else{
            res='WIN';
        }
    }
    else{
        if(opp=='ROCK'){
            res='LOSE';
        }
        else{
            res='WIN';
        }
    }
    if(user!=opp){
    message=(res=='WIN')?`WIN: ${user} BEATS ${opp}`:`LOSE: ${opp} BEATS ${user}`;
    }
}

resetBtn.addEventListener('click',()=>{
    hands.forEach((hand)=>{hand.style.visibility='visible';});
    resetBtn.style.visibility='hidden';
    battle.classList.remove('dropin');
    battle.style.visibility='hidden';
    selected.style.filter='none';
})
