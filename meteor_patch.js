(function(){
  const old = document.querySelector('.meteor'); if(old) old.remove();
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  const c=document.createElement('canvas'); c.id='meteorCanvas';
  c.setAttribute('aria-hidden','true');
  Object.assign(c.style,{position:'fixed',inset:'0',width:'100%',height:'100%',pointerEvents:'none',zIndex:'-1'});
  document.body.appendChild(c);
  const ctx=c.getContext('2d'); let w=0,h=0,dpr=1,meteors=[],last=0,spawn=0;
  function resize(){dpr=Math.min(devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',resize,{passive:true}); resize();
  function make(){
    const angle=Math.PI*(0.18+Math.random()*0.10); // mostly downward-right
    const speed=520+Math.random()*380;
    const life=0.65+Math.random()*0.65;
    meteors.push({x:Math.random()*w*1.05-w*.05,y:Math.random()*h*.38-h*.06,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life,age:0,len:70+Math.random()*90,width:1+Math.random()*1.3,phase:Math.random()*6.28});
  }
  function draw(t){
    const dt=Math.min((t-last)/1000,.04)||0; last=t;
    ctx.clearRect(0,0,w,h);
    if(!document.hidden){
      spawn+=dt;
      if(spawn>.72){spawn=0;make(); if(Math.random()<.12) setTimeout(make,120)}
    }
    for(let i=meteors.length-1;i>=0;i--){
      const m=meteors[i];m.age+=dt;m.x+=m.vx*dt;m.y+=m.vy*dt;
      const p=m.age/m.life;if(p>=1||m.x>w+250||m.y>h+250){meteors.splice(i,1);continue}
      const fade=Math.sin(Math.min(p,1)*Math.PI);
      const nx=m.vx/Math.hypot(m.vx,m.vy),ny=m.vy/Math.hypot(m.vx,m.vy);
      const tx=m.x-nx*m.len,ty=m.y-ny*m.len;
      const g=ctx.createLinearGradient(m.x,m.y,tx,ty);
      g.addColorStop(0,`rgba(255,255,255,${.9*fade})`);g.addColorStop(.12,`rgba(120,220,255,${.55*fade})`);g.addColorStop(1,'rgba(120,220,255,0)');
      ctx.strokeStyle=g;ctx.lineWidth=m.width;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(tx,ty);ctx.stroke();
      ctx.shadowBlur=12;ctx.shadowColor='rgba(130,225,255,.9)';ctx.fillStyle=`rgba(255,255,255,${fade})`;ctx.beginPath();ctx.arc(m.x,m.y,2.2,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
