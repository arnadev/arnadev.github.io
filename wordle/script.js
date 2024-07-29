const boxes1=document.querySelectorAll('.attempt1');

boxes1.forEach((box,index)=>{
    box.addEventListener('input',()=>{
        if(box.value.length===1 && index<boxes1.length-1){
            boxes1[index+1].focus();
        }
    })

    box.addEventListener('keydown',(event)=>{
        if(event.key==='Backspace' && box.value==='' && index>0){
            boxes1[index-1].focus();
        }
    })
})