document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });

const sidebarList=document.querySelector('#sidebar-list');

//need a variable to know which is in view in sidebarlist children

Array.from(sidebarList.children).forEach(child => {
    child.addEventListener('click', () => {
        const myChildName=child.innerText.substring(2);
        const target = document.querySelector(`#${myChildName.toLowerCase()}`);
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Get all the topic divs
const topicDivs = document.querySelectorAll('.topic-div');
let currentDiv = 0;
let isScrolling = false;

// Function to get the div at the middle of the viewport
function getCurrentDiv() {
    const viewportHeight = window.innerHeight;
    const viewportMid = viewportHeight / 2;

    for (let i = 0; i < topicDivs.length; i++) {
        const div = topicDivs[i];
        const rect = div.getBoundingClientRect();
        
        if (rect.top <= viewportMid && rect.bottom > viewportMid) {
            console.log(i);
            return i;
        }
    }
    
    // If no div is at the midpoint, return the closest div
    let closestDiv = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < topicDivs.length; i++) {
        const div = topicDivs[i];
        const rect = div.getBoundingClientRect();
        const distance = Math.min(
            Math.abs(rect.top - viewportMid),
            Math.abs(rect.bottom - viewportMid)
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            closestDiv = i;
        }
    }
    
    return closestDiv;
}

// Function to scroll to a specific div
function scrollToDiv(index) {
    if (index >= 0 && index < topicDivs.length && !isScrolling) {
        isScrolling = true;
        currentDiv = index;
        topicDivs[currentDiv].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 1000); // Adjust timeout as needed
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Scroll event handler
const handleScroll = debounce(() => {
    if (isScrolling) return;
    
    const newCurrentDiv = getCurrentDiv();
    if (newCurrentDiv !== currentDiv) {
        scrollToDiv(newCurrentDiv);
    }
}, 100);

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Initialize
scrollToDiv(getCurrentDiv());

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentDiv < topicDivs.length - 1) {
        scrollToDiv(currentDiv + 1);
    } else if (e.key === 'ArrowUp' && currentDiv > 0) {
        scrollToDiv(currentDiv - 1);
    }
});



document.querySelector('#email-logo').addEventListener('click', () => {

    
    navigator.clipboard.writeText('arnadev.challa@gmail.com').then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });

    window.location.href = "mailto:arnadev.challa@gmail.com";
});