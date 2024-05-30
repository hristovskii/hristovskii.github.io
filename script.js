let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick= () =>{
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');



window.onscroll = () => {
  sections.forEach(sec =>{
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*='+ id +']').classList.add('active');
      });
    };
  } );


  let header = document.querySelector(".header");

  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');

};



var swiper = new Swiper(".mySwiper", {
  autoplay: {
  delay: 5000,
  },
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
};

ScrollReveal({ 
  // reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });


function openPopup(i) {
  document.getElementById("popup"+i).classList.add("open-popup"+i);
}
function closePopup(i) {
document.getElementById("popup"+i).classList.remove("open-popup"+i);
}

        function send(){

            var templateParams = {
              from_name: document.getElementById("Name").value,
              message: document.getElementById("Message").value,
              contact_info: document.getElementById("Email").value,
            };
            emailjs.send('service_qhz0c99', 'template_9t33m4j', templateParams) //use your Service ID and Template ID
              .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
              }, function (error) {
                console.log('FAILED...', error);
              });

              alert("Your message has been sent successfully!");

              document.getElementById("Name").value = "";
              document.getElementById("Message").value = "";
              document.getElementById("Email").value = "";
        }
        

        