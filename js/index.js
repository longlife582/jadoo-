const tl = gsap.timeline()

const signUp = document.querySelector('.lastChild')
const getStarted = document.querySelector('.started')
const main = document.querySelector('.pages')

const signs = [signUp, getStarted]

signs.forEach(sign => {
    sign.addEventListener('click', () => {
        tl.to('.right', .4, {opacity: 0, y: '30px'})
            .to('.left', .3, {opacity: 0, x: '30px'}, '-=.3')
            .to('.pages', 1.3, {y: '100%', ease: Power2.easeInOut}, '-=.4')
            .fromTo('.pages2', .5, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, ease: Power2.easeInOut}, '-=.6')
    })
});