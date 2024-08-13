
const getToday=()=>{
    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];
}
let day=getToday();
let section=localStorage.getItem('section');
document.querySelector(`#${day.toLowerCase()}`).style.backgroundColor='#59C9A5';
if(section!==null){
document.querySelector(`#${section.toLowerCase()}`).style.backgroundColor='#59C9A5';
}

const getSlot=()=>{
    const hrmin = new Date().toTimeString().slice(0, 5);
    if(hrmin)
    if(hrmin<'09:20'){
        return 1;
    }
    else if(hrmin<'10:20'){
        return 2;
    }
    else if(hrmin<'11:30'){
        return 3;
    }
    else if(hrmin<'12:30'){
        return 4;
    }
    else if(hrmin<'13:30'){
        return 5;
    }
    else if(hrmin<'14:30'){
        return 6;
    }
    else if(hrmin<'15:30'){
        return 7;
    }
    else if(hrmin<'16:30'){
        return 8;
    }
    else if(hrmin<'17:30'){
        return 9;
    }
    else if(hrmin<'18:30'){
        return 10;
    }
    else{
        return -1;
    }
}

const getData=async ()=>{
    let response= await fetch('timetable.json');
    let data= await response.json();
    return data;
}

const setSlots=async ()=>{
    if(section===null){
        return;
    }
    let data=await getData();
    let curSlot=getSlot();
    const iterableslots=data[section][day];
    const timingList=document.querySelectorAll('.timings');
    for(idx in iterableslots){
        document.querySelector(`#slot${Number(idx)+1}`).innerText=iterableslots[idx].text;
        document.querySelector(`#slot${Number(idx)+1}`).prepend(timingList[idx]);
        if(curSlot===-1 || day!==getToday()){
            continue;
        }
        if(Number(idx)+1<curSlot){
            document.querySelector(`#slot${Number(idx)+1}`).style.opacity='.5';
        }
        if(Number(idx)+1===curSlot){
            document.querySelector(`#slot${Number(idx)+1}`).classList.add('current-slot');
            document.querySelector(`#slot${Number(idx)+1}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

setSlots();



document.querySelectorAll('.section-buttons').forEach((sectionBtn)=>{
    sectionBtn.addEventListener('click',()=>{
        if(section!==null){
        document.querySelector(`#${section.toLowerCase()}`).style.backgroundColor='#00000033';
        }
        section=sectionBtn.id.toUpperCase();
        document.querySelector(`#${section.toLowerCase()}`).style.backgroundColor='#59C9A5';
        localStorage.setItem('section',section);
        setSlots();
    })
});

document.querySelectorAll('.day-button').forEach((dayBtn)=>{
    dayBtn.addEventListener('click',()=>{
        document.querySelector(`#${day.toLowerCase()}`).style.backgroundColor='white';
        if(document.querySelector('.current-slot')!==null){
        document.querySelector('.current-slot').classList.remove('current-slot');
        }
        document.querySelectorAll('.slot').forEach((slot)=>{slot.style.opacity=1});
        day=dayBtn.id;
        day=day.charAt(0).toUpperCase()+day.slice(1);
        document.querySelector(`#${day.toLowerCase()}`).style.backgroundColor='#59C9A5';
        setSlots();
    });
});

document.querySelector('#to-the-top-button').addEventListener('click',()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
})
