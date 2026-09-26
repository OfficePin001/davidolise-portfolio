let isDark = false; // start light like video
const btn = document.getElementById('themeBtn');
const icon = document.getElementById('themeIcon');

btn.onclick = () => {
  const nextDark =!isDark;
  const wipe = document.createElement('div');
  wipe.className = 'wipe';
  wipe.style.background = nextDark? '#ffffff' : '#060a14';
  document.body.appendChild(wipe);

  // expand circle - exactly like 0:05 in video
  wipe.animate([
    { clipPath: 'circle(0% at 50% 50%)' },
    { clipPath: 'circle(140% at 50% 0%)' }
  ], { duration: 100, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'forwards' }).onfinish = () => {
    document.body.classList.toggle('dark', nextDark);
    isDark = nextDark;
    icon.textContent = isDark? '🌒' : '🔆';
    setTimeout(() => wipe.remove(), 50);
  };
};

// auto glow like in video
let i = 0;
setInterval(() => {
  document.querySelectorAll('.tech-card').forEach(c => c.style.boxShadow = '');
  const cards = document.querySelectorAll('.tech-card');
  if(cards[i]){
    cards[i].style.boxShadow = '0 0 0 1px #2563eb, 0 0 20px rgba(37,99,235,.4)';
  }
  i = (i + 1) % cards.length;
}, 900);

// typing roles like video
const roles=["Problem Solver","Full Stack Developer","UI/UX Designer","Python Programmer"];
let r=0, c=0, del=false;
const el=document.getElementById('role');
function type(){
  const word=roles[r];
  if(!del){ el.textContent=word.slice(0,c+1); c++; if(c===word.length){ setTimeout(()=>del=true,1200); } }
  else{ el.textContent=word.slice(0,c-1); c--; if(c===0){ del=false; r=(r+1)%roles.length; } }
  setTimeout(type, del? 40 : 90);
}
type();

// RK reveal on scroll
const rkCenter=document.getElementById('rkCenter');
const rkDefault=document.getElementById('rkDefault');
const rkImg=document.getElementById('rkImg');
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  if(y>180){ rkCenter.classList.add('active'); rkDefault.style.display='none'; }
  else{ rkCenter.classList.remove('active'); rkDefault.style.display='block'; }
});

// filter
document.querySelectorAll('.f').forEach(f=>{
  f.addEventListener('click',()=>{
    document.querySelectorAll('.f').forEach(x=>x.classList.remove('active'));
    f.classList.add('active');
    const cat=f.dataset.filter;
    document.querySelectorAll('.proj').forEach(p=>{
      p.style.display = cat==='all' || p.dataset.cat.includes(cat)? 'block':'none';
    });
  });
});