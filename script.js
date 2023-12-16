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
loadingAnimation();


function cursorAnimation(){
  document.addEventListener("mousemove",function(details){
    gsap.to("#cursor",{
      left : details.x,
      top: details.y, 
    });
  });
  Shery.makeMagnet("nav-part2 h1");
};

cursorAnimation();
locomotive_animation();