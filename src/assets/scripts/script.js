'use strict';

import Splide from '@splidejs/splide';
new Splide( '.splide',{
  autoplay: true,
  type: 'fade',
  arrows: false,
  interval: 6000,
  speed: 4000,
  rewind: true,
  pauseOnFocus: false,
  pauseOnHover: false,
}).on('active', (Slide) => {
  const targets = Slide.slide.querySelectorAll('.hero__picture, .hero__img');
  targets.forEach((el) => {
    el.classList.remove('zoomUp');
    void el.offsetWidth;
    el.classList.add('zoomUp');
  });
}).mount();


const ham = $('.header__menu-button');
const nav = $('.header__nav');
var state = false;
var scrollpos;
ham.on('click', function () {
  ham.toggleClass('active');
  nav.toggleClass('active');
  if(state == false) {
    scrollpos = $(window).scrollTop();
    $('body').addClass('fixed').css({'top': -scrollpos});
    state = true;
  } else {
    $('body').removeClass('fixed').css({'top': 0});
    $(window).scrollTop(scrollpos);
    state = false;
  }
});//スクロール固定

const a = $('.footerlink a');
a.on ('click', function() {
ham.toggleClass('active');
nav.toggleClass('active');
$('body').removeClass('fixed').css({'top': 0});
$(window).scrollTop(scrollpos);
state = false;
});/* 子ページfooter飛ばし */


$(function(){
  $('a[href^="#"]').click(function(){
    var adjust = 0;
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top + adjust;
    $('body,html').animate({scrollTop:position}, speed, 'swing');//スムーズスクロール
    return false;
  });
});

  function fadeAnime(){

  $('.fadeUpTrigger').each(function(){
    var elemPos = $(this).offset().top-0;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeUp');
    }
  });//.fadeUpTrigger

  $('.fadeRightTrigger').each(function(){
    var elemPos = $(this).offset().top-0;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeRight');
    }
  });//.fadeRightTrigger

  $('.blurTrigger').each(function(){
    var elemPos = $(this).offset().top-0;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('blur');
    }
  });//.blurTrigger
}//function fadeAnime

$(window).scroll(function (){
  fadeAnime();
});

$(window).on('load', function () {
  fadeAnime();
});

gsap.utils.toArray(".title").forEach((title) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: title,
      start: "top 80%", 
      markers: false
    }
  });

  gsap.utils.toArray(title.querySelectorAll(".appears")).forEach((el, i) => {
  tl.from(el, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
    delay: i * 0.2
  }, "<");
  });
  
  tl.from(title.querySelector(".text"), { opacity: 0, y: 40, duration: 1, ease: "power3.out" })
    .from(title.querySelector(".thumb"), { opacity: 0, y: 40, duration: 1 }, "-=0.8")
    .from(title.querySelector(".button"), { opacity: 0, y: 40, duration: 0.5 }, "-=1");
});


function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 300){
    $('.appBtn').removeClass('RightMove');
    $('.appBtn').addClass('LeftMove');
  }else{
    if(
      $('.appBtn').hasClass('LeftMove')){
      $('.appBtn').removeClass('LeftMove');
      $('.appBtn').addClass('RightMove');
    }
  }
}

$(window).scroll(function () {
  PageTopAnime();
});

$(window).on('load', function () {
  PageTopAnime();
});


$('#page-top').click(function () {
  $('body,html').animate({
      scrollTop: 0 }, 500);
  return false;
});/* totop */


let ua = navigator.userAgent;
if(ua.indexOf("iPhone") === -1 && ua.indexOf("Android") === -1) {
  jQuery('a[href^="tel:"]')
    .css("cursor", "default")
    .on("click", function(e) {
      e.preverntDefault();
    });
}/* tel */