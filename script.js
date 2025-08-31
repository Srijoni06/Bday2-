window.onload = function() {
  // Background Music
  const bgMusic = document.getElementById("bg-music");
  function playMusic() {
    bgMusic.play().catch(()=>{});
    document.removeEventListener("click", playMusic);
    document.removeEventListener("keydown", playMusic);
  }
  document.addEventListener("click", playMusic);
  document.addEventListener("keydown", playMusic);

  // Popup
  let popup = document.getElementById("popup");
  let span = document.getElementsByClassName("close")[0];
  setTimeout(() => popup.classList.add("show"), 2000);
  span.onclick = function() { popup.classList.remove("show"); setTimeout(()=>popup.style.display="none",500); };
  document.addEventListener("keydown", e => { if(e.key==="Enter"){ popup.classList.remove("show"); setTimeout(()=>popup.style.display="none",500); } });

  // Wizard Game
  const canvas = document.getElementById("wizardGame");
  const ctx = canvas.getContext("2d");
  let wizard = { x:270,y:350,width:60,height:40,color:"#7f00ff" }, stars=[], score=0;
  function drawWizard(){ ctx.fillStyle=wizard.color; ctx.fillRect(wizard.x,wizard.y,wizard.width,wizard.height); }
  function drawStars(){ ctx.fillStyle="#f5c518"; stars.forEach(s=>ctx.fillRect(s.x,s.y,15,15)); }
  function updateStars(){ stars.forEach(s=>s.y+=2); stars=stars.filter(s=>s.y<canvas.height); }
  function checkCollision(){ stars.forEach((s,i)=>{ if(s.x<wizard.x+wizard.width&&s.x+15>wizard.x&&s.y<wizard.y+wizard.height&&s.y+15>wizard.y){ stars.splice(i,1); score++; } }); }
  function drawScore(){ ctx.fillStyle="#fff"; ctx.font="16px Arial"; ctx.fillText("Score: "+score,10,20); }
  function gameLoop(){ ctx.clearRect(0,0,canvas.width,canvas.height); drawWizard(); drawStars(); drawScore(); updateStars(); checkCollision(); requestAnimationFrame(gameLoop); }
  setInterval(()=>stars.push({ x:Math.random()*(canvas.width-15), y:0 }), 1500);
  document.addEventListener("keydown", e=>{ if(e.key==="ArrowLeft"&&wizard.x>0)wizard.x-=20; if(e.key==="ArrowRight"&&wizard.x+wizard.width<canvas.width)wizard.x+=20; });
  gameLoop();

  // Starry Background Canvas
  const bgCanvas = document.getElementById("backgroundCanvas");
  const bgCtx = bgCanvas.getContext("2d");
  bgCanvas.width = window.innerWidth; bgCanvas.height = window.innerHeight;
  let starsBG=[];
  for(let i=0;i<150;i++) starsBG.push({x:Math.random()*bgCanvas.width, y:Math.random()*bgCanvas.height, size:Math.random()*2, speed:Math.random()*0.5+0.1});
  function drawBG(){
    bgCtx.fillStyle="#000"; bgCtx.fillRect(0,0,bgCanvas.width,bgCanvas.height);
    bgCtx.fillStyle="#fff";
    starsBG.forEach(s=>{
      bgCtx.globalAlpha=Math.random()*0.8+0.2;
      bgCtx.fillRect(s.x,s.y,s.size,s.size);
      s.y+=s.speed;
      if(s.y>bgCanvas.height) s.y=0;
    });
    bgCtx.globalAlpha=1;
    requestAnimationFrame(drawBG);
  }
  drawBG();

  // Hats floating
  const hatsContainer = document.querySelector(".hats");
  function createHat(){
    const hat = document.createElement("div");
    hat.classList.add("hat");
    hat.textContent="🎩";
    hat.style.left=Math.random()*window.innerWidth+"px";
    hat.style.fontSize=(Math.random()*1.5+1.5)+"rem";
    hat.style.animationDuration=(4+Math.random()*4)+"s";
    hatsContainer.appendChild(hat);
    setTimeout(()=>hat.remove(), parseFloat(hat.style.animationDuration)*1000);
  }
  setInterval(createHat, 600);

  // Birthday Cake Feature
  const candle = document.getElementById("candle");
  const cakeBody = document.getElementById("cakeBody");

  // Blow candle
  candle.addEventListener("click", ()=>{
    candle.classList.add("blowed");
  });

  // Cut cake on click
  cakeBody.addEventListener("click", ()=>{
    cakeBody.style.background = "#e07b5a";
    for(let i=0;i<15;i++){
      const sparkle = document.createElement("div");
      sparkle.style.position = "absolute";
      sparkle.style.width = sparkle.style.height = Math.random()*6+2+"px";
      sparkle.style.background = "yellow";
      sparkle.style.borderRadius = "50%";
      sparkle.style.left = (cakeBody.offsetLeft + Math.random()*cakeBody.offsetWidth) + "px";
      sparkle.style.top = (cakeBody.offsetTop + Math.random()*cakeBody.offsetHeight) + "px";
      sparkle.style.pointerEvents = "none";
      document.body.appendChild(sparkle);
      setTimeout(()=>sparkle.remove(), 800);
    }
  });
};
