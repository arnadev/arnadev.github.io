let container=document.querySelector('#container');
let submitBtn=document.querySelector('#submit-button');
let searchBtn=document.querySelector('#search-button');
let confirmEditBtn=document.querySelector('#confirm-edit-button');
let searchResetBtn=document.querySelector('#search-reset-button');
let textArea=document.querySelector('#input-field');
let i=0;

textArea.addEventListener('input',()=>{
    textArea.style.height='auto';
    textArea.style.height=(textArea.scrollHeight)+'px';
})

const addNote = ()=>{
    if(isNaN(localStorage.key(i))){
        i++;
        return 0;
    }
    let newnote=document.createElement('div');
    newnote.innerHTML=`<p>${localStorage.getItem(i)}</p>`;
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
        indx=delBtn.parentNode.children[2].innerText[0]-1;
        localStorage.removeItem(indx);
        i--;
        delBtn.parentNode.remove();
    })

    editBtn.addEventListener('click',()=>{
        
        indx=editBtn.parentNode.children[2].innerText[0]-1;
        confirmEditBtn.style.visibility='visible';
        textArea.value=editBtn.parentNode.children[2].innerText;
        textArea.focus();
        confirmEditBtn.addEventListener('click',()=>{
            editBtn.parentNode.children[2].innerHTML=`<p>${textArea.value}</p>`;
            localStorage.setItem(`${indx}`,textArea.value)
            confirmEditBtn.style.visibility='hidden';
            
        })
    })
    i++;
    textArea.focus();
};

(()=>{
    while(i<localStorage.length){
        addNote();
    }
})();

submitBtn.addEventListener('click',()=>{
    inputText=textArea.value;
    if(inputText!='')
    {
    textArea.value=null;
    localStorage.setItem(i,inputText);
    addNote();
    }
})

searchBtn.addEventListener('click',()=>{
    inputText=textArea.value;
    if(inputText!='')
    {
    textArea.value=null;
    let divs=document.querySelector('#container').children;
    for(divv of divs){
        if(!(divv.childNodes[2].innerText.includes(inputText))){
            divv.style.display='none';
        }
    }
    }
})

searchResetBtn.addEventListener('click',()=>{
    let divs=document.querySelector('#container').children;
    for(divv of divs){
        divv.style.display='block';  
    }
})