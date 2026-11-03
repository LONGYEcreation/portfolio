(()=>{
const section=document.querySelector('#case03Reasoning');if(!section)return;
section.classList.add('reasoning-simple');
const head=document.createElement('h2');head.className='reasoning-simple-heading';head.innerHTML='<span>产品推演</span><span>PRODUCT EXPLORATION</span>';
const figure=document.createElement('figure');figure.className='reasoning-simple-figure';const image=document.createElement('img');image.loading='lazy';image.decoding='async';image.alt='产品推演 PDF 第 6 页';image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label','放大产品推演图片');figure.append(image);
const arrowSVG='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M12 50H88M49 12C56 31 71 46 88 50M49 88C56 69 71 54 88 50"/></svg>';
function arrow(back){const button=document.createElement('button');button.type='button';button.className='reasoning-simple-arrow '+(back?'is-previous':'is-next');button.innerHTML=arrowSVG;return button}
const previous=arrow(true),next=arrow(false);section.append(head,figure,previous,next);
let current=6;const key='jiali-case03-nitunxiang-refresh-v1',reload=performance.getEntriesByType('navigation')[0]?.type==='reload';
new IntersectionObserver(entries=>{if(entries[0].intersectionRatio<.01)select(6)},{threshold:[0,.01]}).observe(section);
function fit(){const reference=document.querySelector('#case03Website .practice-home-heading');head.style.top=reference.offsetTop+'px';
for(let i=0;i<2;i++){const css=getComputedStyle(reference.children[i]);for(const prop of ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing'])head.children[i].style[prop]=css[prop]}
const source=document.querySelector('#case03Website .practice-home-image'),desktop=matchMedia('(min-width:701px)').matches;figure.style.top=desktop?(reference.offsetTop+head.offsetHeight+36)+'px':getComputedStyle(source).top;figure.style.bottom=desktop?'75px':getComputedStyle(source).bottom;
// Keep the full third screen; align the mobile document with CASE06.
section.style.removeProperty('min-height');section.style.removeProperty('height');
if(!desktop){figure.style.top=(reference.offsetTop+head.offsetHeight+36)+'px';figure.style.bottom='auto';figure.style.height=(image.naturalWidth?figure.clientWidth*image.naturalHeight/image.naturalWidth:0)+'px'}else{figure.style.removeProperty('height')}
const r=image.getBoundingClientRect(),s=section.getBoundingClientRect();const center=r.height?r.top+r.height/2-s.top:figure.offsetTop+figure.clientHeight/2;for(const button of [previous,next])button.style.top=center+'px';
}
function render(){image.src=current===6?'assets/case03-simple-06-centered.svg':'assets/case03-simple-'+String(current).padStart(2,'0')+'.png';image.alt='产品推演 PDF 第 '+current+' 页';previous.setAttribute('aria-label','上一页：PDF 第 '+(current===6?14:current-1)+' 页');next.setAttribute('aria-label','下一页：PDF 第 '+(current===14?6:current+1)+' 页');if(dialog.open&&matchMedia('(max-width:700px)').matches){sourceImage.src=image.src;sourceImage.alt=image.alt;document.querySelector('#sourceTitle').textContent='产品推演';document.querySelector('#sourceScroll').scrollTo(0,0)}fit()}
let turnRevision=0,desktopTarget=null;
function select(page){
 if(matchMedia('(min-width:701px)').matches){
  const target=page<6?14:page>14?6:page,revision=++turnRevision;desktopTarget=target;
  const ready=new Image();ready.src=target===6?'assets/case03-simple-06-centered.svg':'assets/case03-simple-'+String(target).padStart(2,'0')+'.png';
  ready.decode().then(()=>{if(revision!==turnRevision)return;current=target;desktopTarget=null;image.loading='eager';render()}).catch(()=>{if(revision===turnRevision)desktopTarget=null});return;
 }

 const nextPage=page<6?14:page>14?6:page;if(nextPage===current)return;
 const direction=page>current?1:-1,revision=++turnRevision;
 const src=nextPage===6?'assets/case03-simple-06-centered.svg':'assets/case03-simple-'+String(nextPage).padStart(2,'0')+'.png';
 const preload=new Image();preload.src=src;
 const turn=()=>{
  if(revision!==turnRevision)return;
  figure.querySelectorAll('.reasoning-turn-old').forEach(node=>node.remove());
  image.getAnimations().forEach(animation=>animation.cancel());
  if(matchMedia('(min-width:701px)').matches||dialog.open){current=nextPage;render();return}
  const old=image.cloneNode();old.removeAttribute('id');old.className='reasoning-turn-old';old.removeAttribute('tabindex');old.removeAttribute('role');old.setAttribute('aria-hidden','true');
  const rect=image.getBoundingClientRect(),frame=figure.getBoundingClientRect();
  old.style.cssText='position:absolute;left:'+(rect.left-frame.left)+'px;top:'+(rect.top-frame.top)+'px;width:'+rect.width+'px;height:'+rect.height+'px;max-width:none;max-height:none;object-fit:contain;object-position:center;pointer-events:none';
  current=nextPage;render();
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  figure.append(old);
  image.animate([{transform:'translateX('+(direction*100)+'%)'},{transform:'translateX(0)'}],{duration:420,easing:'cubic-bezier(.22,.61,.36,1)'});
  const animation=old.animate([{transform:'translateX(0)'},{transform:'translateX('+(-direction*100)+'%)'}],{duration:420,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});
  animation.onfinish=()=>old.remove();
 };
 if(preload.complete)turn();else preload.onload=turn;
}
previous.onclick=()=>select((desktopTarget??current)-1);next.onclick=()=>select((desktopTarget??current)+1);
const dialog=document.querySelector('#sourceDialog'),sourceImage=document.querySelector('#sourceImage'),wrap=document.querySelector('#sourceImageWrap');
function open(){sourceImage.src=image.src;document.querySelector('#sourceTitle').textContent=matchMedia('(max-width:700px)').matches?'产品推演':'产品推演 · '+current+' / 14';wrap.classList.add('original','full-page');dialog.showModal();document.querySelector('#sourceScroll').scrollTo(0,0)}
let modalSwipe=null;function zoomed(){const m=sourceImage.style.transform.match(/scale\(([^)]+)\)/);return m&&parseFloat(m[1])>1.01}
dialog.addEventListener('touchstart',e=>{modalSwipe=null;if(!matchMedia('(max-width:700px)').matches||!dialog.open||e.touches.length!==1||zoomed()||e.target.closest('button'))return;modalSwipe={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
dialog.addEventListener('touchmove',e=>{if(e.touches.length!==1)modalSwipe=null},{passive:true});
dialog.addEventListener('touchend',e=>{if(!modalSwipe)return;const point=e.changedTouches[0],dx=point.clientX-modalSwipe.x,dy=point.clientY-modalSwipe.y;modalSwipe=null;if(!zoomed()&&Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))select(current+(dx<0?1:-1))},{passive:true});
dialog.addEventListener('touchcancel',()=>modalSwipe=null,{passive:true});dialog.addEventListener('close',()=>modalSwipe=null);
let swipeStart=null,suppressClickUntil=0;
figure.addEventListener('touchstart',event=>{if(!matchMedia('(max-width:700px)').matches||event.touches.length!==1)return;swipeStart={x:event.touches[0].clientX,y:event.touches[0].clientY}},{passive:true});
figure.addEventListener('touchend',event=>{if(!swipeStart)return;const point=event.changedTouches[0],dx=point.clientX-swipeStart.x,dy=point.clientY-swipeStart.y;swipeStart=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){suppressClickUntil=performance.now()+700;select(current+(dx<0?1:-1))}},{passive:true});
figure.addEventListener('touchcancel',()=>swipeStart=null,{passive:true});
figure.addEventListener('click',event=>{if(performance.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation()}},true);
image.onclick=open;image.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}};document.querySelector('#sourceClose').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.querySelector('#sourceMode').hidden=true;
let lastHalfTapTouch=-Infinity;section.addEventListener('touchend',()=>lastHalfTapTouch=performance.now(),{passive:true});section.addEventListener('click',event=>{if(!matchMedia('(max-width:700px)').matches||!(event.pointerType==='touch'||event.sourceCapabilities?.firesTouchEvents||performance.now()-lastHalfTapTouch<900)||performance.now()<suppressClickUntil)return;const target=event.target instanceof Element?event.target:event.target?.parentElement;if(!target||target.closest('img,a,button,input,textarea,select,.text-editor,[contenteditable]:not([contenteditable="false"])')||document.querySelector('dialog[open]'))return;event.preventDefault();event.stopImmediatePropagation();select(current+(event.clientX<document.documentElement.clientWidth/2?-1:1))},true);
section.addEventListener('click',event=>{if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;const target=event.target instanceof Element?event.target:event.target?.parentElement;if(!target||target.closest('img,a,button,input,textarea,select,label,[contenteditable]:not([contenteditable="false"]),.text-editor'))return;if(document.querySelector('dialog[open],.text-editor:not([hidden])')||!document.querySelector('#case03OverviewModal').hidden||!getSelection()?.isCollapsed)return;const bounds=section.getBoundingClientRect();(event.clientX<bounds.left+bounds.width/2?previous:next).click()});
addEventListener('pagehide',()=>{try{sessionStorage.setItem(key,JSON.stringify({page:current,second:scrollY>24,y:scrollY,screen:section.getBoundingClientRect().top<innerHeight/2?3:document.querySelector('#case03Website').getBoundingClientRect().top<innerHeight/2?2:1}))}catch{}});
window.case03OpenReasoning=page=>{select(Number.isInteger(page)&&page>=6&&page<=14?page:6);section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})};
image.addEventListener('load',fit);new ResizeObserver(fit).observe(image);new MutationObserver(fit).observe(document.querySelector('#case03Website .practice-home-heading'),{attributes:true,subtree:true,attributeFilter:['style']});new MutationObserver(fit).observe(document.querySelector('#case03Website .practice-home-image'),{attributes:true,attributeFilter:['style']});addEventListener('resize',fit);document.fonts.ready.then(fit);render();
})();