function ibg(){$.each($(".ibg"),(function(e,t){$(this).find("img").length>0&&$(this).css("background-image",'url("'+$(this).find("img").attr("src")+'")')}))}ibg();const iconMenu=document.querySelector(".menu__icon"),menuBody=document.querySelector(".menu__body");function getPaddingHeader(){let e=0;return e=window.innerWidth>800?40:20,e}function setPaddingHeader(){let e=getPaddingHeader();document.querySelector(".header__body").style.paddingTop=e+"px",document.querySelector(".header__body").style.paddingBottom=e+"px"}iconMenu&&iconMenu.addEventListener("click",(function(e){document.body.classList.toggle("_lock"),iconMenu.classList.toggle("_active"),menuBody.classList.toggle("_active")})),setPaddingHeader();let headerPadDown=getPaddingHeader();document.addEventListener("DOMContentLoaded",(function(e){window.onresize=function(){setPaddingHeader(),headerPadDown=getPaddingHeader()}}));let headerPadUp=10,nowPad=headerPadDown;const menuLinks=Array.prototype.slice.call(document.querySelectorAll(".menu__list, .scroll-button"));let allLinks=[];if(menuLinks.forEach((e=>{e.querySelectorAll("a").forEach((e=>{allLinks.push(e)}))})),menuLinks.length>0){function onMenuLinkClick(e){let t=e.target;t.getAttribute("href")||(t=t.parentNode),e.preventDefault();let o=t.getAttribute("href").replace("#",".");if(o&&document.querySelector(o)){const e=document.querySelector(t.getAttribute("href").replace("#",".")).getBoundingClientRect().top+pageYOffset+2*nowPad-document.querySelector(".header__body").offsetHeight;window.scrollTo({top:e,behavior:"smooth"}),iconMenu.classList.contains("_active")&&(document.body.classList.remove("_lock"),iconMenu.classList.toggle("_active"),menuBody.classList.toggle("_active"))}}menuLinks.forEach((e=>{e.addEventListener("click",onMenuLinkClick)}))}const animItems=document.querySelectorAll(".animItems"),hoverItems=document.querySelectorAll(".noHover"),header=document.querySelector(".header__body");let scrollPos=0;function animOnScroll(e){for(let e=0;e<animItems.length;e++){const t=animItems[e],o=t.offsetHeight,n=offset(t).top,i=4;let d=window.innerHeight-o/i;o>window.innerHeight&&(d=window.innerHeight-window.innerHeight/i),pageYOffset>n-d&&pageYOffset<n+o&&(t.classList.add("animActive"),t.classList.contains("disableHover")&&setTimeout((()=>{t.classList.remove("disableHover"),t.classList.add("activeHover")}),900),t.classList.contains("hoverAnim")&&setTimeout((()=>{t.classList.remove("animActive")}),1e3))}header.offsetHeight;pageYOffset>scrollPos&&pageYOffset>90?(document.querySelector(".header__body").style.paddingTop=headerPadUp+"px",document.querySelector(".header__body").style.paddingBottom=headerPadUp+"px",document.querySelector(".header__container").classList.add("styleActive"),nowPad=headerPadUp,document.querySelector(".header__logo").classList.add("_diff-size"),document.querySelector(".menu__list").classList.add("_active")):pageYOffset<90&&(document.querySelector(".header__body").style.paddingTop=headerPadDown+"px",document.querySelector(".header__body").style.paddingBottom=headerPadDown+"px",document.querySelector(".header__container").classList.remove("styleActive"),nowPad=headerPadDown,document.querySelector(".header__logo").classList.remove("_diff-size"),document.querySelector(".menu__list").classList.remove("_active")),scrollPos=pageYOffset}function offset(e){const t=e.getBoundingClientRect(),o=window.pageXOffset||document.documentElement.scrollLeft,n=window.pageYOffset||document.documentElement.scrollTop;return{top:t.top+n,left:t.left+o}}window.addEventListener("scroll",animOnScroll),setTimeout((()=>{animOnScroll()}),300);const adaptItems=document.querySelectorAll(".amh");let newAdaptItems=[];function amh(e){let t=0;e.forEach((e=>{let o=document.querySelectorAll("."+e);Number(o[0].classList[2])<window.innerWidth?(o.forEach((e=>{e.style.minHeight="auto",e.offsetHeight>t&&(t=e.offsetHeight)})),o.forEach((e=>{e.style.minHeight=t+"px"}))):o.forEach((e=>{e.style.minHeight="auto"}))}))}function adaptivElementsHeight(){const e=document.querySelector(":root");let t=document.querySelector(".our-menu__list").clientHeight,o=document.querySelector(".our-menu__footer").clientHeight;e.style.setProperty("--base-menu-height",t),e.style.setProperty("--base-menu-footer-height",o)}adaptItems.forEach((e=>{newAdaptItems.includes(e.classList[0])||newAdaptItems.push(e.classList[0])})),amh(newAdaptItems),document.addEventListener("DOMContentLoaded",(function(e){window.onresize=function(){amh(newAdaptItems)}})),adaptivElementsHeight();