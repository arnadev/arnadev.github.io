let container=document.querySelector('#container');
let submitBtn=document.querySelector('#submit-button');
let searchBtn=document.querySelector('#search-button');
let confirmEditBtn=document.querySelector('#confirm-edit-button');
let searchResetBtn=document.querySelector('#search-reset-button');
let textArea=document.querySelector('#input-field');
let notenum=0;
let currEdit=null;
let currKey=null;

textArea.addEventListener('input',()=>{
    textArea.style.height='auto';
    textArea.style.height=(textArea.scrollHeight)+'px';
})



const addNote = (myKey)=>{
    notenum++;
    let newnote=document.createElement('div');
    newnote.innerHTML=`<p>${notenum}-[${localStorage.getItem(myKey).split('///')[1]}]: ${localStorage.getItem(myKey).split('///')[0]}</p>`;
    newnote.classList.add('note-div');
    let delBtn=document.createElement('button');
    delBtn.classList.add('delete-button');
    delBtn.innerText='Delete';
    newnote.prepend(delBtn);
    let editBtn=document.createElement('button');
    editBtn.classList.add('edit-button');
    editBtn.innerText='Edit';
    newnote.prepend(editBtn);
    container.append(newnote);
    newnote.after(document.createElement('br'));
    
    delBtn.addEventListener('click',()=>{
        localStorage.removeItem(myKey);
        delBtn.parentNode.nextSibling.remove();
        delBtn.parentNode.remove();
        notenum--;
    })

    editBtn.addEventListener('click',()=>{
        confirmEditBtn.style.visibility='visible';
        textArea.value=editBtn.parentNode.children[2].innerText.substring(18);
        textArea.focus();
        currEdit=editBtn;
        currKey=myKey;
    })
};

confirmEditBtn.addEventListener('click',()=>{
    currEdit.parentNode.children[2].innerText=`${currEdit.parentNode.children[2].innerText[0]}-[${localStorage.getItem(currKey).split('///')[1]}]: ${localStorage.getItem(currKey).split('///')[0]}`;
    localStorage.setItem(currKey,textArea.value+'///'+Date().substring(4,10)+Date().substring(15,21));
    confirmEditBtn.style.visibility='hidden';
    currEdit.parentNode.remove();
    addNote(currKey);
});

(()=>{
    for(let i=0;i<localStorage.length;i++){
        if(!isNaN(localStorage.key(i))){
        addNote(localStorage.key(i));
        }
    }
})();

submitBtn.addEventListener('click',()=>{
    inputText=textArea.value;
    if(inputText!='')
    {
    textArea.value=null;
    let myKey=localStorage.length+1;
    localStorage.setItem(myKey,inputText+'///'+Date().substring(4,10)+Date().substring(15,21));
    addNote(myKey);
    }
    textArea.focus();
})

document.addEventListener('keydown',(event)=>{
    if(event.key=='Enter'){
        submitBtn.click();
    }
})

searchBtn.addEventListener('click',()=>{
    inputText=textArea.value;
    if(inputText!='')
    {
    textArea.value=null;
    let divs=Array.from(document.querySelector('#container').children).filter((child)=>child.tagName==='DIV');
    for(divv of divs){
        if(!(divv.children[2].innerText.includes(inputText))){
            divv.style.display='none';
        }
    }
    }
    searchResetBtn.style.visibility='visible';
})

searchResetBtn.addEventListener('click',()=>{
    let divs=document.querySelector('#container').children;
    for(divv of divs){
        divv.style.display='block';  
    }
    searchResetBtn.style.visibility='hidden';
})

document.querySelector('#open-input').addEventListener('click',()=>{
    document.querySelector('#input-field').style.visibility=document.querySelector('#input-field').style.visibility==='hidden'?'visible':'hidden';
});