const backButton= document.querySelector('#back-button');
const openUp= document.querySelector('#open-up');

backButton.addEventListener('click', () => {
    openUp.style.animation = 'closedown 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 600);
});