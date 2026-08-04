document.addEventListener('DOMContentLoaded',function(){"use strict";
var h=document.querySelector('.site-header'),mb=document.querySelector('.mobile-menu-btn'),nl=document.querySelector('.nav-links'),b=document.body;
if(h){window.addEventListener('scroll',function(){h.classList.toggle('scrolled',window.pageYOffset>80)},{passive:true})}
if(mb&&nl){mb.addEventListener('click',function(){this.classList.toggle('active');nl.classList.toggle('open');b.style.overflow=nl.classList.contains('open')?'hidden':''});
nl.querySelectorAll('.nav-link').forEach(function(l){l.addEventListener('click',function(){mb.classList.remove('active');nl.classList.remove('open');b.style.overflow=''})})}
document.querySelectorAll('.before-after-container').forEach(function(c){var w=c.querySelector('.before-after-wrapper'),a=c.querySelector('.after-image'),h2=c.querySelector('.slider-handle'),d=false;
function u(x){var r=w.getBoundingClientRect(),p=Math.max(0,Math.min(1,(x-r.left)/r.width)),pct=p*100;a.style.clipPath='inset(0 '+(100-pct)+'% 0 0)';h2.style.left=pct+'%'}
if(h2){h2.addEventListener('mousedown',function(e){d=true;e.preventDefault()})}
w.addEventListener('mousemove',function(e){if(d)u(e.clientX)});
document.addEventListener('mouseup',function(){d=false});
w.addEventListener('touchstart',function(e){d=true;u(e.touches[0].clientX)},{passive:true});
w.addEventListener('touchmove',function(e){if(d)u(e.touches[0].clientX)},{passive:true});
w.addEventListener('touchend',function(){d=false})});
document.querySelectorAll('form[data-validate]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var v=true;
f.querySelectorAll('[required]').forEach(function(fd){var er=fd.closest('.form-group').querySelector('.form-error');fd.classList.remove('error');
if(!fd.value.trim()){fd.classList.add('error');if(er)er.textContent='This field is required';v=false}
else if(fd.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.value)){fd.classList.add('error');if(er)er.textContent='Please enter a valid email';v=false}
else if(fd.type==='tel'){var cl=fd.value.replace(/[\s\-\(\)\.]+/g,'');if(!/^\+?\d{7,15}$/.test(cl)){fd.classList.add('error');if(er)er.textContent='Please enter a valid phone number';v=false}}});
if(!v)return;var btn=f.querySelector('[type="submit"]');if(btn){btn.disabled=true;btn.textContent='Sending...'}
var fd2=new FormData(f),data={};fd2.forEach(function(v2,k){data[k]=data[k]?(Array.isArray(data[k])?[...data[k],v2]:[data[k],v2]):v2});
setTimeout(function(){var s=f.querySelector('.form-success'),fl=f.querySelector('.form-fields');
if(s){fl.style.display='none';s.classList.add('show')}else{f.innerHTML='<div class="form-success show"><div class="form-success-icon">✓</div><h3>Thank You</h3><p>Your message has been received.</p></div>'}
if(btn){btn.disabled=false;btn.textContent='Send Message'}},(navigator.userAgent.includes('Chrome')?1:500))});
f.querySelectorAll('[required]').forEach(function(fd){fd.addEventListener('blur',function(){var er=fd.closest('.form-group').querySelector('.form-error');
if(!fd.value.trim()){fd.classList.add('error');if(er)er.textContent='This field is required'}else{fd.classList.remove('error')}});
fd.addEventListener('input',function(){fd.classList.remove('error')})})});
var ae=document.querySelectorAll('.fade-in,.fade-in-left,.fade-in-right');
if(ae.length&&'IntersectionObserver'in window){var ob=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target)}})},{threshold:0.15,rootMargin:'0px 0px -50px 0px'});
ae.forEach(function(el){ob.observe(el)})}else{ae.forEach(function(el){el.classList.add('visible')})}
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=this.getAttribute('href');if(id==='#')return;var t=document.querySelector(id);
if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-(h?h.offsetHeight:80),behavior:'smooth'})}})})
});
