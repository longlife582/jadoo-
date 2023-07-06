// const cursor = document.querySelector('.cursor')
// const Images = document.querySelectorAll('img')

// window.addEventListener('mousemove', mouse)

// function mouse(e){
//     cursor.style.top = e.pageY + 'px'
//     cursor.style.left = e.pageX + 'px'
// }

// Images.forEach(image => {
//     image.addEventListener('mouseover', () => {
//         cursor.classList.add('expand')
//     })
//     image.addEventListener('mouseleave', () => {
//         cursor.classList.remove('expand')
//     })
// })

// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
  
      const target = document.querySelector(this.getAttribute('href'));
      const offset = 60; // Adjust this value to offset the scroll position if you have a fixed header/navigation bar
  
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
  
      // Update the active link style
      document.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  