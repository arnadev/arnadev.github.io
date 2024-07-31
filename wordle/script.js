
let word;
let getWord=async ()=>{
    let response=await fetch('https://random-word-api.vercel.app/api?words=1&length=5');
    let data=await response.json();
    return data[0];
}


(async ()=>{
word=await getWord();
word=word.toUpperCase();
})();


const boxes=document.querySelectorAll('.attempt');
boxes[0].focus();
boxes.forEach((box,index)=>{
    box.addEventListener('input',()=>{
        box.value=box.value.toUpperCase();
        if(box.value.length===1 && index<boxes.length-1){
            boxes[index+1].focus();
        }
    })

    box.addEventListener('keydown',(event)=>{
        if(event.key==='Backspace' && box.value==='' && index>0){
            boxes[index-1].focus();
        }
    })
})

const applyReadonly=()=>{
    boxes.forEach((box)=>{
        box.setAttribute('readonly',true);
    })
}

(()=>{if(window.innerWidth<=600){
    applyReadonly();
}})();



const addLetter=(letter)=>{
    curAttempt=document.querySelectorAll(`.attempt${attemptNo}`);
    
    for(idx=0;idx<curAttempt.length;idx++){
        if(curAttempt[idx].value===''){
            curAttempt[idx].value=letter;
            if(idx%5!==4){
                curAttempt[idx+1].focus();
            }
            return 1;
        }
    }

}

const remLetter=()=>{
    curAttempt=document.querySelectorAll(`.attempt${attemptNo}`);
    for(idx=curAttempt.length-1;idx>=0;idx--){
        if(curAttempt[idx].value!==''){
            curAttempt[idx].value=null;
            if(idx>0){
            curAttempt[idx-1].focus();
            }
            return 0;
        }
    }
}

let digitalKeys=document.querySelectorAll('.digital-keys');
digitalKeys.forEach((digitalKey)=>{
    digitalKey.addEventListener('click',()=>{
        if(digitalKey.innerText!=='⌫'){
        addLetter(digitalKey.innerText);
        }

        else{
            remLetter();
        }
    })
})





let checkWord=async (word)=>{
    let response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let data=await response.json();
    if(data.title=='No Definitions Found'){
        return false;
    }
    else{
        return true;
    }
}

let flip=(x)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            x.classList.add('flip-class');
            resolve('success');
        },400);
    })
}

let getCount=(word,letter)=>{
    return word.split('').filter(char=>char===letter).length;
}

let getMatch=(string1,string2,letter)=>{
    return string1.split('').filter((char,index)=>char==string2[index] && char===letter).length;
}

let alertMsg=(msg)=>{
    let alertMessage=document.querySelector('#alert-message');
    alertMessage.innerText=msg;
    alertMessage.style.visibility='visible';
    alertMessage.classList.remove('alert-class');
    alertMessage.offsetHeight;
    alertMessage.classList.add('alert-class');
}

let finalMsg=(msg)=>{
    let finalMsg=document.querySelector('#final-message');
    finalMsg.innerText=`${msg}`;
    finalMsg.style.display='block';
    finalMsg.classList.remove('alert-class');
    finalMsg.offsetHeight;
    finalMsg.classList.add('alert-class');
}




let enterBtn=document.querySelector('#enter-button');
let attemptNo=1;
enterBtn.addEventListener('click',async function enterEvent(){
    let letterCount=new Object;
    let curAttempt=document.querySelectorAll(`.attempt${attemptNo}`);
    let winflag=1;
    let enteredString = Array.from(curAttempt).map(box => box.value).join('');


    if(enteredString.length!==5){
        alertMsg('PLEASE ENTER A COMPLETE WORD');
        return 0;
    }
    let isValid=await checkWord(enteredString);
    if(!isValid){
        alertMsg(`'${enteredString}' IS NOT A VALID WORD`);
        return 0;
    }
    attemptNo++;


    curAttempt.forEach((attemptBox)=>{
        attemptBox.disabled='true';
    })
    for(let i=0;i<curAttempt.length;i++){
        let attemptBox=curAttempt[i];
        let letter=attemptBox.value;
        if(letter==word[i]){
            await flip(attemptBox);
            attemptBox.style.backgroundColor='green';
            document.querySelector(`#${letter}`).style.backgroundColor='rgb(0,255,0,.4)';

        }

        else if(word.includes(letter)){
            letterCount[letter]=(letterCount[letter]==null)?1:letterCount[letter]+1;
            await flip(attemptBox);
            if(letterCount[letter]<=getCount(word,letter)-getMatch(word,enteredString,letter)){
                attemptBox.style.backgroundColor='yellow';
                if(document.querySelector(`#${letter}`).style.backgroundColor!=='green'){
                    document.querySelector(`#${letter}`).style.backgroundColor='rgb(255,255,0,.4)';
                }
            }
            winflag=0;
        }
        else{
            document.querySelector(`#${letter}`).style.backgroundColor='rgb(0, 0, 0,.6)'
            await flip(attemptBox);
            winflag=0;
        }

    }

    if(winflag==1){
        finalMsg('YOUR GUESS WAS CORRECT!');
        document.querySelector('#final-message').style.backgroundColor='green';
        enterBtn.style.visibility='hidden';
        return 0;
    }

    if(attemptNo<=6)
    {
    curAttempt=document.querySelectorAll(`.attempt${attemptNo}`);
    curAttempt.forEach((attemptBox)=>{
        attemptBox.removeAttribute('disabled');
    })
    curAttempt[0].focus();
    }
    else{
        finalMsg(`THE ANSWER WAS ${word}`);
        enterBtn.style.visibility='hidden';
        document.querySelector('#final-message').style.backgroundColor='red';
        return 0;
    }
})

document.addEventListener('keydown',(event)=>{
    if(event.key=='Enter'){
        enterBtn.click();
    }
})

document.querySelector('#reset-button').addEventListener('click',()=>{

    enterBtn.style.visibility='visible';

    boxes.forEach((box)=>{
        box.value=null;
        box.style.backgroundColor='gray';
        box.disabled='true';
        box.classList.remove('flip-class');
    })


    firstAttempt=document.querySelectorAll(`.attempt1`);
    firstAttempt.forEach((attemptBox)=>{
        attemptBox.removeAttribute('disabled');
    })

    attemptNo=1;

    (async ()=>{
        word=await getWord();
        word=word.toUpperCase();
        console.log(word);
    })();


})



