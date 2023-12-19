function locomotive_animation(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadingAnimation(){
  var tl = gsap.timeline();
tl.from(".line h1", {
  y: 100,
  // opacity: 0,
  stagger: 0.25,
  duration: 0.6,
  delay: 0.5,
});
tl.from("#line1-part1, .line h2", {
  opacity: 0,
  onStart: function () {
    var i = 0;
    var h5_timer = document.querySelector("#line1-part1 h5");
    var timer = setInterval(function () {
      h5_timer.textContent = ++i;
      console.log(i);
      if (i == 100) {
        clearInterval(timer);
      }
    }, 20);
  },
});
tl.to(".line h2",{
    animationName: "animation",
    opacity: 1,
});

tl.to("#loader", {
  opacity: 0,
  duration: 0.4,
  delay: 2,
});
tl.from("#page1",{
    delay: 0.2,
    y: 1600,
    opacity: 0,
    ease: Power4,
    duration : 0.5,
});
tl.to("#loader",{
    diaplay: "none",
    zIndex: -1
});
tl.from("#nav",{
  opacity: 0
})
tl.from(".page1-center h1, #third_text h2",{
  y: 150,
  stagger:0.2
})
};


function cursorAnimation(){
  document.addEventListener("mousemove",function(details){
    gsap.to("#cursor",{
      left : details.x,
      top: details.y, 
    });
  });
  Shery.makeMagnet("#nav-part2 h1");
};

cursorAnimation();

function page2Animation(){
  Shery.imageEffect(".image-div",{
    style:5,
    config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7241195453907675},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.23,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.5,"range":[0,10]},"metaball":{"value":0.33,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    gooey: true,
  })
}
function cursor_animation(){
  var video_container = document.querySelector("#video-container");
  video = document.querySelector("#video-container video");
  video_container.addEventListener("mouseenter", function(){

    video_container.addEventListener("mousemove", function(details){
      gsap.to("#cursor", {
        opacity: 0
      })
      gsap.to("#video-cursor",{
        left: details.x - 570,
        top: details.y - 300,
        
      })
    })
  });
  video_container.addEventListener("mouseleave", function(){
    console.log("hey")
    gsap.to("#cursor",{
      opacity: 1
    })
    gsap.to("#video-cursor",{
      top:-10+"%",
    left: 80+"%",
    duration: 1
    })
  });

  var flag= 0;
  video_container.addEventListener("click", function(){
    ++flag;
    if(flag % 2 == 1){
      video.play();
      video.style.opacity = 1;
      document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-line"></i>`;
      gsap.to("#video-cursor",{
      scale: 0.5
    })
  }
    else{
      document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-fill"></i>`;
      video.pause();
      video.style.opacity = 0;
      gsap.to("#video-cursor",{
        scale: 1
      })
    }
  
    
  });
 };
 function displaying_page1Image(){
  var third_text = document.querySelector("#third_text");
third_text.addEventListener("mouseenter",function(){

  third_text.addEventListener("mousemove", function(details){
    gsap.to("#flag",{
      opacity: 0.8,
      left : details.x,
      top: details.y,
    })

  }) 

    third_text.addEventListener("mouseleave", function(){
      gsap.to("#flag",{
        opacity: 0
      })
    })
  
})
};
function footer_text(){
  var footer_text = document.querySelector("#footer > h1");
footer_text.addEventListener("mousemove", function(){

  gsap.to("#footer h1",{
  webkitTextStroke: "1px #fff",
  fontStyle: "italic",
  webkitTextStroke : "2px #fff",
  color: "transparent",
})
})
footer_text.addEventListener("mouseleave",function(){
  console.log("mouse_left")
  gsap.to("#footer h1",{
    fontFamily: "Plain Light",
    fontStyle: "normal",
    webkitTextStroke: "0px",
    color: "white"
  })
})
};
locomotive_animation();
loadingAnimation();
page2Animation();

 cursor_animation();


displaying_page1Image();

footer_text();

