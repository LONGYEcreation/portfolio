(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;document.documentElement.classList.add('soft-nav-loading');function ready(){if(/\/(?:case-[^/]+|case0[1-6][^/]*)\.html$/.test(location.pathname))document.documentElement.classList.add('case-soft-nav');document.documentElement.classList.add('soft-nav-ready');requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove('soft-nav-loading')))}function background(){const urls=[...document.querySelectorAll('.split-panels img')].map(img=>img.currentSrc||img.src);if(document.querySelector('#case03Cover')){const coverImage=document.querySelector('link[rel=preload][as=image]');if(coverImage)urls.push(coverImage.href)}for(const pseudo of ['::before','::after']){const bg=getComputedStyle(document.body,pseudo).backgroundImage;for(const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g))urls.push(m[1])}return Promise.all(urls.map(url=>new Promise(resolve=>{const img=new Image();img.onload=resolve;img.onerror=resolve;img.src=url;if(img.complete)resolve()})))}function start(){Promise.all([document.fonts.ready,background()]).then(ready);setTimeout(ready,2500)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download')||a.classList.contains('case-work-link')||a.closest('header')&&a.classList.contains('corner'))return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||!url.pathname.endsWith('.html')||url.pathname===location.pathname)return;e.preventDefault();if(document.body.classList.contains('soft-nav-leaving'))return;document.body.classList.add('soft-nav-leaving');setTimeout(()=>location.href=url.href,250)});window.addEventListener('pageshow',e=>{if(e.persisted){document.body.classList.remove('soft-nav-leaving');document.documentElement.classList.remove('soft-nav-loading')}})})();
(()=>{function syncBreathing(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;for(const animation of document.getAnimations()){const name=animation.animationName||'';if(name==='breathe'||!(/breathe|breathing|research-headings-synced/.test(name)))continue;animation.effect?.updateTiming({duration:2800});animation.startTime=0}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',syncBreathing,{once:true});else syncBreathing();addEventListener('pageshow',syncBreathing);document.fonts.ready.then(syncBreathing)})();

/* Keep the shared navigation wording consistent with browser-saved layouts. */
(()=>{function update(root){if(root.nodeType===3){const parent=root.parentElement;if(!parent||parent.closest('script,style,textarea,input,[contenteditable="true"],[contenteditable="plaintext-only"],[data-nit-copy],[data-v3-edit],.layout-editor,.work-editor'))return;const value=root.nodeValue.replace(/AI(\s*)原生构建/g,'AI$1构建').replace(/AI-NATIVE/g,'AI').replace(/创意指导(\s*)(?:&|＆|与|和)(\s*)审美评测/g,'审美判断$1与$2视觉体系').replace(/CREATIVE DIRECTION/g,'AESTHETIC JUDGMENT').replace(/AESTHETIC EVALUATION/g,'VISUAL SYSTEMS').replace(/审美标准/g,'审美判断').replace(/AESTHETIC CRITERIA/g,'AESTHETIC JUDGMENT');const categoryValue=parent.closest('.creative-panel')?value.replace(/创作判断/g,'审美判断').replace(/CREATIVE JUDGMENT/g,'AESTHETIC JUDGMENT'):value;if(categoryValue!==root.nodeValue)root.nodeValue=categoryValue;return}if(root.nodeType!==1&&root.nodeType!==9)return;const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while(node=walk.nextNode())update(node)}function start(){update(document.body);new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')update(record.target);else record.addedNodes.forEach(update)}}).observe(document.body,{subtree:true,childList:true,characterData:true})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start()})();

// Update the wording while preserving uppercase, title case or lowercase.
(()=>{function update(node){if(node.nodeType!==3)return;const parent=node.parentElement;if(!parent||parent.closest('script,style,textarea,input,.layout-editor,.work-editor,.text-editor,.research-editor'))return;const value=node.nodeValue.replace(/product\s+(?:reasoning|inference)/gi,original=>{if(original===original.toUpperCase())return 'PRODUCT EXPLORATION';if(original===original.toLowerCase())return 'product exploration';return 'Product Exploration'});if(value!==node.nodeValue)node.nodeValue=value}
function walk(root){if(root.nodeType===3){update(root);return}const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode())update(node)}
function start(){walk(document.body);new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')update(record.target);else record.addedNodes.forEach(walk)}}).observe(document.body,{subtree:true,childList:true,characterData:true})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start()})();
// Shared mobile content expansion, loaded after the page is ready.
(()=>{function start(){if(document.querySelector('script[data-mobile-expansion]'))return;const script=document.createElement('script');script.src='mobile-expanded-content.js';script.dataset.mobileExpansion='';document.body.append(script)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start()})();
/* Keep aesthetic-series corner labels consistent after browser-saved copy is applied. */
(()=>{function start(){const header=document.querySelector('.case04-header');if(!header)return;const left=header.querySelector('.corner:not(.right)>span:nth-child(2)'),right=header.querySelector('.corner.right>span:nth-child(2)');if(!left||!right)return;function sync(){if(left.textContent!=='○ BRAND & VISUAL CONSTRUCTION')left.textContent='○ BRAND & VISUAL CONSTRUCTION';if(right.textContent!=='品牌与视觉建构 ○')right.textContent='品牌与视觉建构 ○'}sync();new MutationObserver(sync).observe(header,{subtree:true,childList:true,characterData:true})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()})();
// Mobile lightboxes: pinch to inspect details, then drag the enlarged image.
(()=>{
function setup(){document.querySelectorAll('dialog.image-dialog,dialog#sourceDialog').forEach(dialog=>{
 const image=dialog.querySelector('#sourceImage')||dialog.querySelector('img');if(!image)return;
 let scale=1,x=0,y=0,start=null,moved=false,saved='';
 const mobile=()=>matchMedia('(max-width:700px)').matches;
 const center=t=>({x:(t[0].clientX+t[1].clientX)/2,y:(t[0].clientY+t[1].clientY)/2});
 const distance=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
 function paint(){image.style.transform=`translate(${x}px,${y}px) scale(${scale})`;image.style.transformOrigin='50% 50%'}
 function reset(){scale=1;x=y=0;start=null;moved=false;image.setAttribute('style',saved)}
 new MutationObserver(()=>{if(dialog.open&&mobile()){saved=image.getAttribute('style')||'';scale=1;x=y=0;image.style.touchAction='none'}else reset()}).observe(dialog,{attributes:true,attributeFilter:['open']});
 dialog.addEventListener('touchstart',e=>{if(!mobile()||e.target.closest('button'))return;moved=false;
 if(e.touches.length===2){const c=center(e.touches);start={distance:distance(e.touches),scale,x,y,c};e.preventDefault()}
 else if(e.touches.length===1&&scale>1){start={x,y,point:{x:e.touches[0].clientX,y:e.touches[0].clientY}}}
 },{passive:false});
 dialog.addEventListener('touchmove',e=>{if(!mobile()||!start)return;
 if(e.touches.length===2&&start.distance){const c=center(e.touches);scale=Math.min(6,Math.max(1,start.scale*distance(e.touches)/start.distance));x=start.x+c.x-start.c.x;y=start.y+c.y-start.c.y;moved=true;e.preventDefault();paint()}
 else if(e.touches.length===1&&start.point&&scale>1){x=start.x+e.touches[0].clientX-start.point.x;y=start.y+e.touches[0].clientY-start.point.y;moved=true;e.preventDefault();paint()}
 },{passive:false});
 dialog.addEventListener('touchend',e=>{start=null;if(scale<=1){x=y=0;paint()}if(e.touches.length===1&&scale>1)start={x,y,point:{x:e.touches[0].clientX,y:e.touches[0].clientY}}});
 dialog.addEventListener('click',e=>{if(moved&&!e.target.closest('button')){e.preventDefault();e.stopImmediatePropagation();moved=false}},true);
 image.addEventListener('load',()=>{if(dialog.open&&mobile()){scale=1;x=y=0;paint()}});
})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();

// Mobile CASE04–06: one deliberate transition from the cover to its next section.
(()=>{
if(!/\/(case-chatcut|case-nitunxiang|case04-v3|case05|case06)\.html$/.test(location.pathname))return;
function setup(){
 const productCase=/\/(case-chatcut|case-nitunxiang)\.html$/.test(location.pathname);
 const cover=document.querySelector('#case03Cover')||document.querySelector('#overview'),next=productCase?(document.querySelector('.case-research')||document.querySelector('#case02Comparison')):(document.querySelector('#case03Website')||cover?.nextElementSibling);if(!next)return;
 const media=matchMedia('(max-width:700px)');let touch=null,busy=false;
 const excluded=target=>target instanceof Element&&!!target.closest('a,button,input,textarea,select,dialog,.copy-editor');
 const eligible=()=>media.matches&&scrollY<next.offsetTop-4&&scrollY>=next.offsetTop-innerHeight-4&&!document.querySelector('dialog[open],.copy-editor:not([hidden])');
 function move(){if(busy)return;busy=true;touch=null;const root=document.documentElement,old=root.style.scrollBehavior,start=scrollY,top=next.getBoundingClientRect().top+scrollY,time=performance.now(),duration=matchMedia('(prefers-reduced-motion:reduce)').matches?0:1400;root.style.scrollBehavior='auto';function tick(now){const t=duration?Math.min(1,(now-time)/duration):1,e=t*t*(3-2*t);scrollTo(0,start+(top-start)*e);if(t<1)requestAnimationFrame(tick);else{root.style.scrollBehavior=old;setTimeout(()=>busy=false,300)}}requestAnimationFrame(tick)}
 addEventListener('touchstart',e=>{if(productCase)return;touch=eligible()&&!busy&&e.touches.length===1&&!excluded(e.target)?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:true});
 addEventListener('touchmove',e=>{if(!media.matches||e.touches.length!==1)return;if(busy){e.preventDefault();return}if(!touch)return;const dx=e.touches[0].clientX-touch.x,dy=e.touches[0].clientY-touch.y;if(Math.abs(dx)>Math.abs(dy)||dy>0){touch=null;return}if(dy<0)e.preventDefault();if(dy<-3)move()},{passive:false});
 addEventListener('touchend',()=>{touch=null},{passive:true});addEventListener('touchcancel',()=>{touch=null},{passive:true});
 addEventListener('wheel',e=>{if(document.querySelector('#case03Cover'))return;if(!media.matches||e.ctrlKey||excluded(e.target)||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;if(busy){e.preventDefault();return}if(e.deltaY>0&&eligible()){e.preventDefault();move()}},{passive:false});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();

// The second header row opens the visual landing page, like the product header.
(()=>{function setup(){document.querySelectorAll('.case04-header .corner>span:nth-child(2)').forEach(row=>{row.setAttribute('role','link');row.tabIndex=0;row.style.cursor='pointer';const go=e=>{e.preventDefault();e.stopPropagation();location.href='visual-systems.html'};row.addEventListener('click',go);row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){go(e)}})})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup()})();

// On mobile, underline only the width of the first wrapped header line.
(()=>{function setup(){const row=document.querySelector('.case04-header .corner:not(.right)>span:nth-child(2)');if(!row)return;function fit(){const range=document.createRange();range.selectNodeContents(row);const rects=[...range.getClientRects()].filter(r=>r.width>0);if(rects.length){const top=rects[0].top,line=rects.filter(r=>Math.abs(r.top-top)<2),edge=Math.max(...line.map(r=>r.right));row.style.setProperty('--visual-first-line-width',(edge-row.getBoundingClientRect().left)+'px')}}new ResizeObserver(fit).observe(row);new MutationObserver(fit).observe(row,{childList:true,characterData:true,subtree:true});addEventListener('resize',fit);document.fonts.ready.then(fit);fit()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup()})();

// Re-center mobile entry text by its visible glyph bounds after spacing edits.
(()=>{if(!/\/(case05|case06)\.html$/.test(location.pathname))return;function setup(){const nav=document.querySelector('.brand-entries');if(!nav)return;const mobile=matchMedia('(max-width:700px)'),flow=!!nav.querySelector('.case06-flow-block'),style=document.createElement('style');style.textContent='@media(max-width:700px){.brand-entries a>.case04-number,.brand-entries a>strong,.brand-entries a>small{position:relative;top:var(--mobile-entry-ink-offset,0px)}}.brand-entries .case06-flow-block{position:relative;top:var(--mobile-entry-ink-offset,0px)}';document.head.append(style);let frame=0;
function ink(node){const rect=node.getBoundingClientRect(),css=getComputedStyle(node),ctx=document.createElement('canvas').getContext('2d');ctx.font=css.fontStyle+' '+css.fontWeight+' '+css.fontSize+' '+css.fontFamily;const m=ctx.measureText(node.textContent.trim()),a=m.fontBoundingBoxAscent??m.actualBoundingBoxAscent,d=m.fontBoundingBoxDescent??m.actualBoundingBoxDescent,line=parseFloat(css.lineHeight)||a+d,leading=(line-a-d)/2;return {top:rect.top+leading+a-m.actualBoundingBoxAscent,bottom:rect.bottom-leading-d+m.actualBoundingBoxDescent}}
function fit(){frame=0;for(const entry of nav.querySelectorAll('a')){if(!mobile.matches&&!flow){entry.style.removeProperty('--mobile-entry-ink-offset');continue}const nodes=[...entry.querySelectorAll('.case04-number,strong,small')].filter(n=>n.getBoundingClientRect().height);if(!nodes.length)continue;const bounds=nodes.map(ink),top=Math.min(...bounds.map(b=>b.top)),bottom=Math.max(...bounds.map(b=>b.bottom)),box=entry.getBoundingClientRect(),old=parseFloat(entry.style.getPropertyValue('--mobile-entry-ink-offset'))||0,delta=(box.top+box.bottom-top-bottom)/2-(flow&&!mobile.matches?1.5:0);if(Math.abs(delta)>.1)entry.style.setProperty('--mobile-entry-ink-offset',(old+delta)+'px')}}
function schedule(){if(!frame)frame=requestAnimationFrame(fit)}new ResizeObserver(schedule).observe(nav);for(const node of nav.querySelectorAll('.case04-number,strong,small'))new ResizeObserver(schedule).observe(node);new MutationObserver(schedule).observe(nav,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['style']});document.fonts.ready.then(schedule);addEventListener('resize',schedule);document.addEventListener('input',schedule);document.addEventListener('change',schedule);schedule()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup()})();

// Keep the visual landing's mobile second row wrapped exactly like the CASE header.
(()=>{function setup(){if(!document.body.classList.contains('visual-systems-page'))return;const row=document.querySelector('.case04-header .corner:not(.right)>span:nth-child(2)');if(!row)return;function wrap(){if(row.querySelector('.visual-header-mobile-break'))return;const br=document.createElement('br');br.className='visual-header-mobile-break';row.replaceChildren(document.createTextNode('○ BRAND & VISUAL '),br,document.createTextNode('CONSTRUCTION'))}wrap();new MutationObserver(wrap).observe(row,{childList:true,characterData:true,subtree:true})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup()})();

// Site-wide PORTFOLIO editing lock: retain saved appearance and normal link behavior.
(()=>{
 const isBrand=node=>node instanceof Element&&(node.matches('header .brand,.case04-header .brand,.portfolio-word')||node.hasAttribute('contenteditable')&&node.textContent.trim()==='PORTFOLIO');
 function lock(){
  document.querySelectorAll('header .brand,.case04-header .brand,.portfolio-word,[contenteditable]').forEach(node=>{if(isBrand(node)&&node.getAttribute('contenteditable')!=='false')node.setAttribute('contenteditable','false')});
  document.querySelectorAll('select option').forEach(option=>{if(option.value==='portfolio'||option.value==='brand'||/PORTFOLIO/i.test(option.textContent)){if(!option.disabled)option.disabled=true;}});
 }
 function start(){lock();new MutationObserver(lock).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['contenteditable']})}
 document.addEventListener('beforeinput',event=>{if(isBrand(event.target))event.preventDefault()},true);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();

// Bypass legacy editors; finger taps finish the existing wordmark glow before navigating.
let portfolioLastTouch=-Infinity,portfolioTouchBusy=false;
window.addEventListener('touchend',()=>portfolioLastTouch=performance.now(),{passive:true});
window.addEventListener('pageshow',()=>{portfolioTouchBusy=false;document.querySelectorAll('.portfolio-touch-glow').forEach(node=>node.classList.remove('portfolio-touch-glow'))});
window.addEventListener('click',event=>{
 const node=event.target instanceof Element?event.target:null;
 const anchor=node?.closest('a');
 if(anchor&&anchor.textContent.trim()==='PORTFOLIO'){
  event.stopImmediatePropagation();
  const touch=event.pointerType==='touch'||event.sourceCapabilities?.firesTouchEvents||performance.now()-portfolioLastTouch<800;
  if(touch&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey){event.preventDefault();if(portfolioTouchBusy)return;portfolioTouchBusy=true;anchor.classList.add('portfolio-touch-glow');setTimeout(()=>{location.href=anchor.href},360)}
 }
},true);
