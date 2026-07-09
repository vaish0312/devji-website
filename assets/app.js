(function(){
  // sticky header
  const hdr=document.getElementById('hdr');
  if(hdr){const onScroll=()=>hdr.classList.toggle('scrolled',window.scrollY>40);onScroll();window.addEventListener('scroll',onScroll,{passive:true});}

  // mobile menu
  const hamb=document.getElementById('hamb'),mnav=document.getElementById('mnav');
  if(hamb&&mnav){hamb.addEventListener('click',()=>mnav.classList.toggle('open'));mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mnav.classList.remove('open')));}

  // hero parallax
  const heroPar=document.getElementById('heroPar');
  if(heroPar)window.addEventListener('scroll',()=>{heroPar.style.transform='translateY('+(window.scrollY*0.18)+'px)';},{passive:true});

  // reveal on scroll
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.14});
  document.querySelectorAll('.reveal,.clip').forEach(el=>io.observe(el));

  // rotating hero word
  const rw=document.getElementById('rotWord');
  if(rw){const words=['reliability','precision','castings','lifts','strength'];let wi=0;
    setInterval(()=>{rw.classList.add('out');setTimeout(()=>{wi=(wi+1)%words.length;rw.textContent=words[wi];rw.classList.remove('out');},400);},2600);}

  // gauges (count-up + ring fill)
  const fmt=n=>n.toLocaleString('en-IN');
  const gauges=document.querySelectorAll('.gauge');
  if(gauges.length){
    const gio=new IntersectionObserver((es)=>{es.forEach(e=>{
      if(!e.isIntersecting)return; gio.unobserve(e.target);
      const ring=e.target.querySelector('.prog'),val=e.target.querySelector('.val');
      if(ring)ring.style.strokeDashoffset=339*(1-parseFloat(ring.dataset.pct));
      if(val){const t=+val.dataset.count,suf=val.dataset.suffix||'';let s=null;const dur=1600;
        const step=(ts)=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);val.textContent=fmt(Math.floor((1-Math.pow(1-p,3))*t))+suf;if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);}
    })},{threshold:.5});
    gauges.forEach(el=>gio.observe(el));
  }

  // product category filter (products page)
  const chips=document.querySelectorAll('.chip');
  if(chips.length){
    chips.forEach(c=>c.addEventListener('click',()=>{
      chips.forEach(x=>x.classList.remove('active'));c.classList.add('active');
      const f=c.dataset.filter;
      document.querySelectorAll('.pcard').forEach(p=>{p.classList.toggle('hide',f!=='all'&&p.dataset.cat!==f);});
    }));
  }
})();
