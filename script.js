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


let popup = document.getElementById("popup");

        function openPopup(){
            popup.classList.add("open-popup");
        }
        function closePopup(){
            popup.classList.remove("open-popup");
        }

let popup1 = document.getElementById("popup1");

        function openPopup1(){
            popup1.classList.add("open-popup1");
        }
        function closePopup1(){
            popup1.classList.remove("open-popup1");
        }


let popup2 = document.getElementById("popup2");

        function openPopup2(){
            popup2.classList.add("open-popup2");
        }
        function closePopup2(){
            popup2.classList.remove("open-popup2");
        }


let popup3 = document.getElementById("popup3");

        function openPopup3(){
            popup3.classList.add("open-popup3");
        }
        function closePopup3(){
            popup3.classList.remove("open-popup3");
        }


let popup4 = document.getElementById("popup4");

        function openPopup4(){
            popup4.classList.add("open-popup4");
        }
        function closePopup4(){
            popup4.classList.remove("open-popup4");
        }


let popup5 = document.getElementById("popup5");

        function openPopup5(){
            popup5.classList.add("open-popup5");
        }
        function closePopup5(){
            popup5.classList.remove("open-popup5");
        }


let popup6 = document.getElementById("popup6");

        function openPopup6(){
            popup6.classList.add("open-popup6");
        }
        function closePopup6(){
            popup6.classList.remove("open-popup6");
        }

let popup7 = document.getElementById("popup7");

        function openPopup7(){
            popup7.classList.add("open-popup7");

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
        }
        function closePopup7(){
            popup7.classList.remove("open-popup7");
        }

        