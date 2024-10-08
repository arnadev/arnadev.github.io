const pageSections=document.querySelectorAll('.page-sections-class');
const closeUpDiv=document.querySelector('#close-up-div');
const container=document.querySelector('#container');

pageSections.forEach((section)=>{
    section.addEventListener('click',()=>{
        const closeDiv=document.createElement('div');
        closeDiv.classList.add('close-div');
        container.prepend(closeDiv);
        closeDiv.style.transform='scaleY(1)';
        closeDiv.innerText=section.innerText;

        setTimeout(()=>{
            if(section.id==='arnavchalla-text'){
                return location.href='';
            }
            location.href=`/${section.id.split('-')[0]}/${section.id.split('-')[0]}.html`;
        },500);
        });
});
