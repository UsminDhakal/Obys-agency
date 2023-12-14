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
tl.from(".page1-center h1, #third_text h2, #third_text h3",{
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
