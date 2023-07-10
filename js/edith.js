const btn = document.querySelector('#edith')
const popup = document.querySelector('.profile-modal')
const remove = document.querySelector('.close-button')

// console.log(btn)
// console.log(popup)

btn.addEventListener('click',()=>{
    popup.style.display = 'block'
})

remove.addEventListener('click', ()=>{
    popup.style.display ='none'
})

