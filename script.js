const qs=s=>document.querySelector(s);
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
setTimeout(()=>qs('#loader')?.classList.add('hide'),1250);
document.addEventListener('click',e=>{if(e.target.matches('.maker'))qs('#egg')?.classList.add('show');if(e.target.matches('[data-close]'))qs('#egg')?.classList.remove('show')});
const questions=[
['Planet terbesar di Tata Surya adalah?',['Bumi','Mars','Jupiter','Venus'],2,'Jupiter adalah planet terbesar di Tata Surya. Diameternya sekitar 11 kali diameter Bumi dan massanya lebih dari dua kali gabungan seluruh planet lainnya.'],
['Galaksi tempat Tata Surya berada disebut?',['Andromeda','Bima Sakti','Sombrero','Triangulum'],1,'Tata Surya berada di Galaksi Bima Sakti. Matahari terletak di salah satu lengan spiral galaksi, sekitar puluhan ribu tahun cahaya dari pusatnya.'],
['Satelit alami Bumi adalah?',['Titan','Europa','Bulan','Phobos'],2,'Bulan adalah satelit alami Bumi. Gravitasi Bulan membantu menghasilkan pasang-surut laut dan siklus fasenya terjadi karena posisi relatif Bulan, Bumi, dan Matahari.'],
['Bintang yang menjadi pusat Tata Surya adalah?',['Sirius','Matahari','Betelgeuse','Proxima Centauri'],1,'Matahari adalah bintang pusat Tata Surya. Energinya berasal dari fusi nuklir hidrogen menjadi helium di inti Matahari.'],
['Planet yang terkenal dengan cincin paling mencolok adalah?',['Saturnus','Merkurius','Neptunus','Mars'],0,'Saturnus memiliki sistem cincin yang sangat terang dan luas. Cincin tersebut tersusun terutama dari partikel es, batuan, dan debu dengan ukuran beragam.'],
['Planet terdekat dengan Matahari adalah?',['Venus','Bumi','Merkurius','Mars'],2,'Merkurius adalah planet terdekat dengan Matahari. Karena atmosfernya sangat tipis, perubahan suhu antara siang dan malam sangat ekstrem.'],
['Planet yang dikenal sebagai Planet Merah adalah?',['Mars','Jupiter','Uranus','Venus'],0,'Mars tampak kemerahan karena permukaannya kaya mineral besi yang mengalami oksidasi. Mars juga memiliki gunung berapi dan lembah raksasa.'],
['Apa yang dimaksud tahun cahaya?',['Satuan waktu','Satuan jarak','Satuan massa','Satuan suhu'],1,'Tahun cahaya adalah satuan jarak, bukan waktu. Ini adalah jarak yang ditempuh cahaya dalam ruang hampa selama satu tahun, sekitar 9,46 triliun kilometer.'],
['Lapisan Matahari yang terlihat sebagai permukaan terang disebut?',['Korona','Fotosfer','Inti','Kromosfer'],1,'Fotosfer adalah lapisan Matahari yang tampak seperti permukaan. Sebagian besar cahaya tampak yang kita terima berasal dari wilayah ini.'],
['Ledakan dahsyat pada akhir kehidupan beberapa bintang disebut?',['Gerhana','Supernova','Transit','Aurora'],1,'Supernova adalah ledakan bintang yang sangat energik. Peristiwa ini dapat menyebarkan unsur-unsur berat ke ruang antarbintang dan memengaruhi lingkungan galaksi.'],
['Objek yang gravitasinya begitu kuat sehingga cahaya tidak dapat lolos dari horizon peristiwanya disebut?',['Nebula','Komet','Lubang hitam','Asteroid'],2,'Lubang hitam adalah wilayah ruang-waktu dengan gravitasi ekstrem. Batas yang disebut horizon peristiwa menandai wilayah yang tidak dapat dilalui kembali oleh cahaya setelah melewatinya.'],
['Awan gas dan debu antarbintang disebut?',['Nebula','Orbit','Meteor','Quasar'],0,'Nebula adalah kumpulan gas dan debu di ruang antarbintang. Sebagian nebula menjadi tempat kelahiran bintang, sedangkan lainnya merupakan sisa dari bintang yang telah berevolusi.'],
['Benda langit berbatu yang banyak ditemukan di sabuk antara Mars dan Jupiter disebut?',['Asteroid','Komet','Bintang','Pulsar'],0,'Asteroid adalah benda kecil berbatu atau logam yang mengorbit Matahari. Banyak asteroid berada di sabuk asteroid utama antara orbit Mars dan Jupiter.'],
['Ekor komet biasanya menjadi lebih jelas ketika komet mendekati?',['Bulan','Matahari','Jupiter','Bumi'],1,'Ketika mendekati Matahari, es pada inti komet memanas dan melepaskan gas serta debu. Tekanan radiasi dan angin Matahari membantu membentuk ekor yang menjauhi Matahari.'],
['Planet dengan suhu permukaan rata-rata tertinggi adalah?',['Merkurius','Venus','Mars','Jupiter'],1,'Venus memiliki suhu permukaan rata-rata tertinggi karena atmosfernya sangat tebal dan kaya karbon dioksida. Efek rumah kaca yang kuat memerangkap panas.'],
['Apa penyebab utama pergantian siang dan malam di Bumi?',['Revolusi Bumi','Rotasi Bumi','Fase Bulan','Gerhana'],1,'Siang dan malam terjadi karena Bumi berotasi pada porosnya. Satu kali rotasi relatif terhadap Matahari menghasilkan siklus siang-malam sekitar 24 jam.'],
['Planet yang memiliki kemiringan sumbu ekstrem sehingga tampak seperti menggelinding adalah?',['Uranus','Neptunus','Saturnus','Venus'],0,'Uranus memiliki kemiringan sumbu sekitar 98 derajat. Akibatnya, perubahan musim di Uranus sangat ekstrem dan berlangsung dalam periode orbitnya yang panjang.'],
['Sistem yang terdiri dari Matahari dan semua benda yang mengorbitnya disebut?',['Galaksi','Tata Surya','Konstelasi','Nebula'],1,'Tata Surya terdiri dari Matahari dan berbagai benda yang terikat gravitasi dengannya, termasuk planet, planet katai, asteroid, komet, dan objek kecil lainnya.'],
['Galaksi Andromeda termasuk jenis galaksi?',['Spiral','Elips','Tidak beraturan','Cincin'],0,'Andromeda adalah galaksi spiral besar yang merupakan salah satu galaksi utama di lingkungan kosmik dekat Bima Sakti. Galaksi ini berjarak sekitar 2,5 juta tahun cahaya.'],
['Alat yang digunakan astronom untuk mengumpulkan dan mengamati cahaya dari objek jauh disebut?',['Seismograf','Teleskop','Barometer','Mikroskop'],1,'Teleskop mengumpulkan dan memfokuskan cahaya atau radiasi dari objek langit yang jauh. Teleskop modern dapat mengamati bukan hanya cahaya tampak, tetapi juga gelombang radio, inframerah, ultraviolet, dan sinar-X.']
];
function buildQuiz(){const root=qs('#quiz');if(!root)return;root.innerHTML=questions.map((q,i)=>`<div class="q"><b>${i+1}. ${q[0]}</b>${q[1].map((a,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${a}</label>`).join('')}</div>`).join('')+`<button class="btn" id="check">Cek Jawaban</button><div id="score" class="result"></div>`;qs('#check').onclick=grade}function grade(){let correct=0;const out=qs('#score');out.innerHTML='';questions.forEach((q,i)=>{const picked=document.querySelector(`input[name=q${i}]:checked`);const val=picked?Number(picked.value):-1;const ok=val===q[2];if(ok)correct++;const box=document.createElement('div');box.className='result-item '+(ok?'correct':'wrong');box.innerHTML=`<b>Soal ${i+1} — ${ok?'BENAR':'SALAH'}</b><p class="small">Jawaban kamu: <b>${val>=0?q[1][val]:'Belum dijawab'}</b><br>Jawaban benar: <b>${q[1][q[2]]}</b></p><p>${q[3]}</p>`;out.appendChild(box)});const head=document.createElement('div');head.className='card';head.innerHTML=`<h2>Skor: ${correct}/20 — ${Math.round(correct/20*100)}</h2><p class="muted">Benar: ${correct} • Salah: ${20-correct}</p>`;out.prepend(head);window.scrollTo({top:out.offsetTop-80,behavior:'smooth'})}buildQuiz();
