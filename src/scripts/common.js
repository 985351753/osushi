'use strict';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


const ham = $('.js-hamburger-button');
const nav = $('.js-header__nav');
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

const a = $('.js-footerlink');
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

  $('.js-fadeUpTrigger').each(function(){
    var elemPos = $(this).offset().top-0;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeUp');
    }
  });//.fadeUpTrigger

  $('.js-fadeRightTrigger').each(function(){
    var elemPos = $(this).offset().top-0;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeRight');
    }
  });//.fadeRightTrigger

  $('.js-blurTrigger').each(function(){
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

gsap.utils.toArray(".js-title").forEach((title) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: title,
      start: "top 80%", 
      markers: false
    }
  });

  gsap.utils.toArray(title.querySelectorAll(".js-appears")).forEach((el, i) => {
  tl.from(el, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
    delay: i * 0.2
  }, "<");
  });
  
  tl.from(title.querySelector(".js-text"), { opacity: 0, y: 40, duration: 1, ease: "power3.out" })
    .from(title.querySelector(".js-thumb"), { opacity: 0, y: 40, duration: 1 }, "-=0.8")
    .from(title.querySelector(".js-button"), { opacity: 0, y: 40, duration: 0.5 }, "-=1");
});


function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 300){
    $('.js-header__sidenav').removeClass('RightMove');
    $('.js-header__sidenav').addClass('LeftMove');
  }else{
    if(
      $('.js-header__sidenav').hasClass('LeftMove')){
      $('.js-header__sidenav').removeClass('LeftMove');
      $('.js-header__sidenav').addClass('RightMove');
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

class InView {
  constructor(elTarget) {
    this.elTarget = elTarget;
    this._setEventListeners();
  }

  _setEventListeners() {
    setTimeout(() => {
      const rootMargin = this.elTarget.dataset.rootMargin || '0px';
      const iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.elTarget.classList.add('is-active');
              iObserver.unobserve(this.elTarget);
            }
          });
        },
        { rootMargin: rootMargin }
      );
      iObserver.observe(this.elTarget);
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.js-inview');
  elements.forEach(element => new InView(element));
});