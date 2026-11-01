(()=>{
const bodyCopy=document.querySelector('#caseBody'),main=document.querySelector('body>main');if(!bodyCopy||!main)return;
const section=document.querySelector('#case02Prototypes'),comparison=document.querySelector('#case02Comparison');if(!section||!comparison)return;
let frame=0;function fit(){frame=0;const top=Math.ceil(Math.max(innerHeight,bodyCopy.getBoundingClientRect().bottom+scrollY+40,main.getBoundingClientRect().bottom+scrollY));comparison.style.top=top+'px';section.style.top=(top+comparison.offsetHeight)+'px';const evaluation=document.querySelector('#case02Evaluation');if(evaluation)evaluation.style.top=(top+comparison.offsetHeight)+'px';document.body.style.minHeight=(top+comparison.offsetHeight+(evaluation?evaluation.offsetHeight:section.offsetHeight))+'px'}
function schedule(){if(!frame)frame=requestAnimationFrame(fit)}new ResizeObserver(schedule).observe(bodyCopy);new ResizeObserver(schedule).observe(main);new ResizeObserver(schedule).observe(comparison);addEventListener('resize',schedule);document.fonts.ready.then(schedule);addEventListener('case02-prototypes-layout',schedule);schedule();
// Give CASE02 a slower 1400ms smooth screen transition.
let busy=false,animating=false,release,tween=0;
function screenPoints(){const evaluation=document.querySelector('#case02Evaluation');return evaluation?[0,comparison.offsetTop,evaluation.offsetTop]:[0,comparison.offsetTop]}
function snap(index){const points=screenPoints(),top=points[Math.max(0,Math.min(points.length-1,index))];if(Math.abs(scrollY-top)<2)return;cancelAnimationFrame(tween);clearTimeout(release);busy=true;animating=true;
const html=document.documentElement,behavior=html.style.scrollBehavior,snapType=html.style.scrollSnapType,start=scrollY,time=performance.now(),duration=matchMedia('(prefers-reduced-motion:reduce)').matches?0:1400;
html.style.scrollBehavior='auto';html.style.scrollSnapType='none';
function tick(now){const progress=duration===0?1:Math.min(1,(now-time)/duration),ease=progress*progress*(3-2*progress);scrollTo(0,start+(top-start)*ease);if(progress<1)tween=requestAnimationFrame(tick);else{animating=false;html.style.scrollBehavior=behavior;html.style.scrollSnapType=snapType;release=setTimeout(()=>busy=false,300)}}tween=requestAnimationFrame(tick)}
function editing(target){return target?.closest('input,textarea,select,.text-editor,.shared-body-panel,.research-editor')||(document.activeElement?.isContentEditable&&target?.closest('[contenteditable="true"],[contenteditable="plaintext-only"]'))||document.querySelector('dialog[open],.text-editor:not([hidden]),.shared-body-panel:not([hidden])')}
addEventListener('wheel',event=>{if(event.ctrlKey||Math.abs(event.deltaY)<Math.abs(event.deltaX)||!event.deltaY||editing(event.target))return;
if(matchMedia('(max-width:700px)').matches){
 if(busy){event.preventDefault();return}
 fit();const points=screenPoints();let current=0;for(let i=1;i<points.length;i++)if(points[i]<=scrollY+innerHeight*.35)current=i;
 // The cover-to-second-screen wheel transition is handled by shared navigation.
 if(current===0)return;
 const next=current+(event.deltaY>0?1:-1);if(next>=0&&next<points.length){event.preventDefault();event.stopImmediatePropagation();snap(next)}return;
}
if(!busy)fit();const points=screenPoints();let next=-1;if(event.deltaY>0)next=points.findIndex(top=>top>scrollY+8);else for(let i=points.length-1;i>=0;i--)if(points[i]<scrollY-8){next=i;break}if(!busy&&next<0)return;
event.preventDefault();if(busy){if(!animating){clearTimeout(release);release=setTimeout(()=>busy=false,300)}return}snap(next)
},{passive:false});
addEventListener('keydown',event=>{if(editing(event.target)||event.target?.closest('button,a')||!['PageDown','PageUp'].includes(event.key))return;event.preventDefault();if(!busy){fit();const points=screenPoints(),closest=points.reduce((best,top,i)=>Math.abs(top-scrollY)<Math.abs(points[best]-scrollY)?i:best,0);snap(closest+(event.key==='PageDown'?1:-1))}});
fit();
if(location.hash==='#case02Comparison'){function direct(){document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{fit();scrollTo({top:comparison.offsetTop,behavior:'instant'});requestAnimationFrame(()=>{fit();scrollTo({top:comparison.offsetTop,behavior:'instant'});history.replaceState(history.state,'',location.pathname+location.search);document.documentElement.classList.remove('comparison-direct-entry')})})))}if(document.readyState==='complete')direct();else addEventListener('load',direct,{once:true})}
})();
(()=>{const media=matchMedia('(max-width:700px)'),background=document.createElement('div');background.className='case02-mobile-background';background.setAttribute('aria-hidden','true');document.body.prepend(background);const image=new Image();image.src='assets/product-entry.png';let frame=0;
function fit(){frame=0;if(!media.matches||!image.naturalWidth)return;const tileHeight=document.documentElement.clientWidth*image.naturalHeight/image.naturalWidth,height=document.body.scrollHeight,count=Math.max(1,Math.ceil(height/tileHeight));while(background.children.length<count){const tile=document.createElement('div');tile.className='case02-mobile-background-tile';background.append(tile)}while(background.children.length>count)background.lastChild.remove();[...background.children].forEach((tile,i)=>{tile.style.top=i*tileHeight+'px';tile.style.height=tileHeight+'px';tile.style.backgroundImage="linear-gradient(#000000bf,#000000bf),url('assets/"+(i?'product-entry-mirrored-vertical.svg':'product-entry.png')+"')"});background.style.height=height+'px'}
function schedule(){if(!frame)frame=requestAnimationFrame(fit)}image.onload=schedule;addEventListener('resize',schedule);media.addEventListener('change',schedule);addEventListener('case02-prototypes-layout',schedule);new ResizeObserver(schedule).observe(document.body);for(const id of ['case02Comparison','case02Prototypes']){const section=document.getElementById(id);if(section)new ResizeObserver(schedule).observe(section)}if(image.complete)schedule();
})();
