let navSquares=document.querySelectorAll(".nav-squares");



navSquares.forEach((sqr)=>{
    sqr.addEventListener("mouseenter",()=>{
        sqr.style.backdropFilter="blur(1px)";
        sqr.style.backgroundColor='rgb(0,0,0,.2)';
    })
})

navSquares.forEach((sqr)=>{
    sqr.addEventListener("mouseleave",()=>{
        sqr.style.backdropFilter="blur(3px)";
        sqr.style.backgroundColor='rgb(0,0,0,0)'
    })
})

const apiURL='https://api.api-ninjas.com/v1/quotes?category=life';
const apiKEY='8mNk/e83d8RbbqzDCd+FEg==XLlkAOqnHW8O0iAP';


const storedQuote = localStorage.getItem('quote');
const storedDate = localStorage.getItem('quoteDate');
const today = new Date().toISOString().split('T')[0];

(async ()=>{

    if(storedQuote && storedDate===today){
        document.querySelector('#quote').innerText= storedQuote;

    }
    else{
    let response = await fetch(apiURL,{headers: {'X-Api-Key': apiKEY}});
    let data = await response.json();
    const newQuote=`"${data[0].quote}" ~${data[0].author}`;
    document.querySelector('#quote').innerText=newQuote;
    localStorage.setItem('quote', newQuote);
    localStorage.setItem('quoteDate', today);
    }
})();




document.addEventListener('click',()=>{
    document.querySelector('#quote').classList.add('fadeout-class');
})

// class human{
//     constructor(){
//     }

//     speak(name){
//         alert("ooga booga my name is "+ this.name);
//     }
// }

// class student extends human{
//     constructor(college){
//         this.college=college;
//     }

//     speak2(college){
//         alert("I study at "+ this.college);
//     }
    
// }



//CALL BACK HELL=TOO MANY NESTED CALLBACKS!!!
// function display(a,myfunc){
//     setTimeout(()=>{
//         alert(a);
//         if(myfunc){
//             myfunc();
//         }
//     },3000);

// }

// display(1,()=>{
//     display(2,()=>{
//         display(3);
//     });
// })



//PROMISES
// function display(a){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             alert(a);
//             resolve("success");
//         },3000)
//     })
// }

// display('1').then((res)=>{
//     display(2).then((res)=>{
//         display(3);
//     })
// })

//BETTER METH0D: PROMISE CHAIN
// display('1').then((res)=>{
//     return display('2');
// }).then((res)=>{
//     return display('3');
// })



//ASYNC AWAIT
// function display(a){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             alert(a);
//             resolve("success");
//         },3000)
//     })
// }

// async function displayAll(){
//     await display('1');
//     await display('2');
//     await display('3');
// }

// displayAll();


//WHY A SEPERATE CALL RIGHT AFTER DEFINING? BUT A "wRAPPER"/EXTRA FUNCTION IS NEEDED FOR ASYNC AWAIT
//USE IIFE: IMMEDIATELY EXECUTED FUNCTION EXPRESSION=FUNCTION THAT IS CALLED AS SOON AS IT IS DEFINED
//SYNTAX: (func)(); no function name

// function display(a){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             alert(a);
//             resolve("success");
//         },3000)
//     })
// }

// (async function(){
//     await display('1');
//     await display('2');
//     await display('3');
// })();

// let URL='https://catfact.ninja/fact?max_length=140';

//USING ASYNC AWAIT
// const getFacts= async ()=>{
//     console.log("fetching...");
//     let response= await fetch(URL);
//     console.log(response); //response is a JSON object, use async method .json whcih returns a promise which resolves JS object
//     let data=await response.json();
//     console.log(data.fact);
// }

//USING PROMISE CHAIN
// function getFacts(){
//     fetch(URL).then((response)=>{
//         return response.json();
//     }).then((data)=>{
//         console.log(data.fact);
//     })
// }





