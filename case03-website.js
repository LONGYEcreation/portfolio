(()=>{
const section=document.querySelector('#case03Website'),heading=section.querySelector('.practice-home-heading'),cn=heading.children[0],en=heading.children[1],kicker=section.querySelector('.practice-home-context'),band=section.querySelector('.practice-home-band'),index=band.querySelector('.chatcut-search-index'),title=band.querySelector('h3'),figure=section.querySelector('.practice-home-image');
let layout={},search={};try{layout=JSON.parse(localStorage.getItem('jiali-case01-research-layout-v1')||'{}');search=JSON.parse(localStorage.getItem('jiali-case01-search-page-style-v1')||'{}')}catch{}
function apply(node,data){for(const [k,v]of Object.entries(data||{})){if(['fontSize','fontWeight','lineHeight','letterSpacing','marginTop','marginBottom'].includes(k))node.style[k]=v+(k==='fontSize'||k==='marginTop'||k==='marginBottom'?'px':k==='letterSpacing'?'em':'')}}
apply(cn,layout.leftCN?.style);apply(en,layout.leftEN?.style);apply(kicker,{...layout.researchIntro?.style,...layout.researchKicker?.style});apply(index,search.index);apply(title,search.title);kicker.style.marginTop=(layout.kickerGaps?.researchKicker??14)+'px';
function place(){const h=section.clientHeight;heading.style.top=(h*.066667+(layout.leftPosition?.style?.y||0))+'px';kicker.style.top=(heading.offsetTop+heading.offsetHeight+(layout.researchKickerPosition?.style?.y||0))+'px';const ruleTop=Math.ceil(Math.max(heading.offsetTop+heading.offsetHeight,kicker.offsetTop+kicker.offsetHeight)+10);let textHeight=0;for(const n of [index,title]){const css=getComputedStyle(n);textHeight+=n.offsetHeight+(parseFloat(css.marginTop)||0)+(parseFloat(css.marginBottom)||0)}const maskHeight=Math.max(76,Math.ceil(textHeight+24));band.style.top=ruleTop+'px';band.style.setProperty('--search-mask-height',maskHeight+'px');figure.style.top=(ruleTop+maskHeight+36)+'px';
// Match desktop image-bottom space to the Chinese heading's visible top edge.
if(!matchMedia('(max-width:700px)').matches){
const css=getComputedStyle(cn),ctx=document.createElement('canvas').getContext('2d');
ctx.font=css.fontStyle+' '+css.fontWeight+' '+css.fontSize+' '+css.fontFamily;
const metrics=ctx.measureText(cn.textContent.trim()),ascent=metrics.fontBoundingBoxAscent??metrics.actualBoundingBoxAscent,descent=metrics.fontBoundingBoxDescent??metrics.actualBoundingBoxDescent;
const headingBox=cn.getBoundingClientRect(),sectionBox=section.getBoundingClientRect();
const inkTop=headingBox.top+(headingBox.height-ascent-descent)/2+ascent-metrics.actualBoundingBoxAscent;
figure.style.bottom='75px';
}else figure.style.removeProperty('bottom');
const content=band.querySelector('.chatcut-search-content'),ctx=document.createElement('canvas').getContext('2d');let inkTop=Infinity,inkBottom=-Infinity;for(const n of [index,title]){n.style.transform='none';const css=getComputedStyle(n);ctx.font=css.fontStyle+' '+css.fontWeight+' '+css.fontSize+' '+css.fontFamily;const m=ctx.measureText(n===title?'ChatCut 搜索页':'01'),a=m.fontBoundingBoxAscent??m.actualBoundingBoxAscent,d=m.fontBoundingBoxDescent??m.actualBoundingBoxDescent,baseline=n.offsetTop+(n.offsetHeight-a-d)/2+a;inkTop=Math.min(inkTop,baseline-m.actualBoundingBoxAscent);inkBottom=Math.max(inkBottom,baseline+m.actualBoundingBoxDescent)}if(Number.isFinite(inkTop)&&Number.isFinite(inkBottom))for(const n of [index,title])n.style.transform='translateY('+((content.clientHeight-inkTop-inkBottom)/2)+'px)';
const image=section.querySelector('#websiteCaptureImage');
if(image){const imageRect=image.getBoundingClientRect(),bandRect=band.getBoundingClientRect();const center=imageRect.top+imageRect.height/2-bandRect.top;band.querySelectorAll('.practice-series-arrow').forEach(arrow=>arrow.style.top=center+'px')}
}
addEventListener('resize',place);document.fonts.ready.then(place);place();
const dialog=document.querySelector('#websiteCaptureDialog');document.querySelector('#websiteCaptureOpen').onclick=event=>{if(event.target===section.querySelector('#websiteCaptureImage')||event.detail===0)dialog.showModal()};document.querySelector('#websiteCaptureClose').onclick=()=>dialog.close();dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
// Switch only the website capture within the second screen.
const capture=section.querySelector('#websiteCaptureImage'),fullCapture=dialog.querySelector('img'),openCapture=section.querySelector('#websiteCaptureOpen');
const pages=[{index:'01',title:'总起栏',src:capture.getAttribute('src'),alt:capture.alt},{index:'02',title:'产品系列',src:'assets/case03-product-series-v2.png',alt:'泥吞象官网产品系列：NOMADIC POEM、THE SUN OF DAYBREAK、THE BREATH OF THE THIRSTY'},{index:'03',title:'品牌宣言栏',src:'assets/case03-brand-manifesto.png',alt:'泥吞象官网品牌宣言：FREEDOM WITH WISDOM'},{index:'04',title:'品牌基因栏',src:'assets/case03-brand-gene.png',alt:'泥吞象官网品牌基因：中国文化与非遗、当代艺术与设计'},{index:'05',title:'品牌哲学栏',src:'assets/case03-brand-philosophy.png',alt:'泥吞象官网品牌哲学：游牧系列与当代游牧精神'},{index:'06',title:'商品页',src:'assets/case03-catalog.png',alt:'泥吞象官网商品目录 Catalog：三款不同釉色的高足杯'},{index:'07',title:'文章页',src:'assets/case03-articles.png',alt:'泥吞象官网 Articles 文章列表与栏目导航'}];
capture.addEventListener('load',place);new ResizeObserver(place).observe(capture);
let current=0;
const arrowMarkup='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M12 50H88M49 12C56 31 71 46 88 50M49 88C56 69 71 54 88 50"/></svg>';
function makeArrow(back){const button=document.createElement('button');button.type='button';button.className='practice-series-arrow'+(back?' practice-series-previous is-back':'');button.setAttribute('aria-controls','websiteCaptureImage');button.innerHTML=arrowMarkup;band.append(button);return button}
const previous=makeArrow(true),next=makeArrow(false);
const preparedCaptures=new Map();let mobileCaptureRequest=0,mobileCaptureTarget=null;
function prepareCapture(src){if(!preparedCaptures.has(src)){const image=new Image();image.decoding='async';const ready=new Promise((resolve,reject)=>{image.onload=()=>image.decode().then(()=>resolve(image),reject);image.onerror=()=>reject(new Error('Capture image failed to load'));image.src=src});preparedCaptures.set(src,ready);ready.catch(()=>preparedCaptures.delete(src))}return preparedCaptures.get(src)}
function renderCapture(){const page=pages[current];index.textContent=page.index;title.textContent=page.title;capture.src=page.src;capture.alt=page.alt;fullCapture.src=page.src;fullCapture.alt=page.alt;openCapture.setAttribute('aria-label','放大泥吞象主页'+page.title+'图片');dialog.setAttribute('aria-label','泥吞象官网'+page.title+'截图');previous.hidden=false;previous.disabled=false;next.hidden=false;next.disabled=false;const before=pages[(current-1+pages.length)%pages.length],after=pages[(current+1)%pages.length];previous.setAttribute('aria-label','返回 '+before.index+' '+before.title);next.setAttribute('aria-label','进入 '+after.index+' '+after.title);next.title='进入 '+after.index+' '+after.title;place();if(matchMedia('(max-width:700px)').matches)prepareCapture(after.src).catch(()=>{})}
async function switchMobileCapture(delta){const target=((mobileCaptureTarget??current)+delta+pages.length)%pages.length,request=++mobileCaptureRequest;mobileCaptureTarget=target;try{await prepareCapture(pages[target].src);if(request!==mobileCaptureRequest)return false;capture.loading='eager';capture.decoding='sync';capture.src=pages[target].src;await capture.decode();if(request!==mobileCaptureRequest)return false;current=target;mobileCaptureTarget=null;renderCapture();applyEdits();if(!editor.hidden)loadEditor();return true}catch{if(request===mobileCaptureRequest){mobileCaptureTarget=null;capture.src=pages[current].src}return false}}
previous.addEventListener('click',()=>{switchMobileCapture(-1)});
next.addEventListener('click',()=>{switchMobileCapture(1)});
// Mobile finger swipes use the same page controls, with visible motion inside the frame.
let websiteTouch=null,suppressWebsiteClickUntil=0;
openCapture.addEventListener('touchstart',event=>{if(!matchMedia('(max-width:700px)').matches||event.touches.length!==1)return;websiteTouch={x:event.touches[0].clientX,y:event.touches[0].clientY}},{passive:true});
openCapture.addEventListener('touchend',async event=>{
 if(!websiteTouch)return;
 const point=event.changedTouches[0],dx=point.clientX-websiteTouch.x,dy=point.clientY-websiteTouch.y;websiteTouch=null;
 if(Math.abs(dx)<=45||Math.abs(dx)<=Math.abs(dy))return;
 suppressWebsiteClickUntil=performance.now()+700;
 const direction=dx<0?1:-1,old=capture.cloneNode(),rect=capture.getBoundingClientRect(),parent=openCapture.getBoundingClientRect();
 old.removeAttribute('id');old.className='website-touch-old';old.setAttribute('aria-hidden','true');old.style.cssText='position:absolute;left:'+(rect.left-parent.left)+'px;top:'+(rect.top-parent.top)+'px;width:'+rect.width+'px;height:'+rect.height+'px;max-width:none;max-height:none;pointer-events:none';
 if(!await switchMobileCapture(direction))return;
 suppressWebsiteClickUntil=performance.now()+700;
 openCapture.querySelectorAll('.website-touch-old').forEach(n=>n.remove());capture.getAnimations().forEach(a=>a.cancel());
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 openCapture.append(old);
 capture.animate([{transform:'translateX('+(direction*100)+'%)'},{transform:'translateX(0)'}],{duration:420,easing:'cubic-bezier(.22,.61,.36,1)'});
 const animation=old.animate([{transform:'translateX(0)'},{transform:'translateX('+(-direction*100)+'%)'}],{duration:420,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});animation.onfinish=()=>old.remove();
},{passive:true});
openCapture.addEventListener('touchcancel',()=>websiteTouch=null,{passive:true});
openCapture.addEventListener('click',event=>{if(performance.now()<suppressWebsiteClickUntil){event.preventDefault();event.stopImmediatePropagation()}},true);

// Empty space on each half of the second screen activates its available arrow.
section.addEventListener('click',event=>{
if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
const target=event.target instanceof Element?event.target:event.target?.parentElement;
if(!target||target.closest('a,button,input,textarea,select,label,summary,[role="button"],[role="tab"],[contenteditable]:not([contenteditable="false"]),.text-editor,.research-editor'))return;
if(document.querySelector('dialog[open],.text-editor:not([hidden]),.research-editor:not([hidden])')||!document.querySelector('#case03OverviewModal').hidden)return;
if(!getSelection()?.isCollapsed)return;
const bounds=section.getBoundingClientRect();
const direction=event.clientX<bounds.left+bounds.width/2?previous:next;
if(direction.hidden||direction.disabled)return;
direction.click();
});
renderCapture();
const captureStateKey='jiali-case03-website-capture-v1';
addEventListener('pagehide',()=>{try{sessionStorage.setItem(captureStateKey,String(current))}catch{}});

// Second-screen controls reuse the existing adjustment panel styling.
const shortcut=document.createElement('footer');shortcut.className='case03-shortcuts practice-shortcuts';shortcut.innerHTML='<div><a href="case04-v3.html#nitunxiang">泥吞象品牌视觉</a><span>← 直通CASE04页</span></div><div><span>直通AI CODING实践页 →</span><a href="https://nitunxiang.com/" target="_blank" rel="noopener">泥吞象官网</a></div>';document.body.append(shortcut);
const editButton=document.createElement('button');editButton.type='button';editButton.className='text-toggle';editButton.textContent='调整文字';editButton.hidden=true;document.body.append(editButton);
const editor=document.querySelector('#case03TextEditor').cloneNode(true);editor.id='case03WebsiteEditor';editor.setAttribute('aria-label','CASE03 第二页文字编辑');editor.hidden=true;
for(const element of editor.querySelectorAll('[id]'))element.removeAttribute('id');
editor.querySelector('p').textContent='修改当前栏目文字与排版，自动保存在当前浏览器。';
const editTarget=editor.querySelector('select'),editCopy=editor.querySelector('textarea'),editStatus=editor.querySelector('output');
const editNodes={cn,en,context:kicker,index,title,hint:shortcut.querySelector('div:last-child span'),link:shortcut.querySelector('div:last-child a')};
const names={cn:'中文标题',en:'英文标题',context:'页面说明',index:'栏目编号',title:'栏目标题',hint:'官网入口提示',link:'官网入口文字'};
editTarget.replaceChildren();for(const [value,label]of Object.entries(names)){const option=document.createElement('option');option.value=value;option.textContent=label;editTarget.append(option)}
document.body.append(editor);let edits={};const editKey='jiali-case03-website-edits-v1';try{edits=JSON.parse(localStorage.getItem(editKey)||'{}')}catch{}
const fields=[...editor.querySelectorAll('[data-cover-style]')],units={fontSize:'px',letterSpacing:'em',marginTop:'px',marginBottom:'px'};
function editId(name){return ['index','title'].includes(name)?current+'|'+name:name}
const originalEditStyles=Object.fromEntries(Object.entries(editNodes).map(([name,node])=>[name,Object.fromEntries(fields.map(input=>[input.dataset.coverStyle,node.style[input.dataset.coverStyle]]))]));
function applyEdits(){if(typeof edits.hint?.text==='string'&&!edits.hint.text.trimEnd().endsWith('→'))edits.hint.text=edits.hint.text.trimEnd()+' →';for(const [name,node]of Object.entries(editNodes)){for(const [prop,value]of Object.entries(originalEditStyles[name]))node.style[prop]=value;const value=edits[editId(name)];if(!value)continue;if(typeof value.text==='string')node.textContent=value.text;for(const [prop,val]of Object.entries(value.style||{}))node.style[prop]=val+(units[prop]||'')}place()}
function loadEditor(){const node=editNodes[editTarget.value],css=getComputedStyle(node),size=parseFloat(css.fontSize);editCopy.value=node.textContent;fields.forEach(input=>{const prop=input.dataset.coverStyle;input.value=prop==='textAlign'?(css.textAlign==='start'?'left':css.textAlign):prop==='lineHeight'?(css.lineHeight==='normal'?1.5:Number((parseFloat(css.lineHeight)/size).toFixed(2))):prop==='letterSpacing'?(css.letterSpacing==='normal'?0:Number((parseFloat(css.letterSpacing)/size).toFixed(3))):parseFloat(css[prop])||0})}
function saveEdits(){try{localStorage.setItem(editKey,JSON.stringify(edits));editStatus.textContent='已保存到当前浏览器'}catch{editStatus.textContent='浏览器保存失败'}}
editButton.onclick=()=>{editor.hidden=!editor.hidden;if(!editor.hidden)loadEditor()};editTarget.onchange=loadEditor;editor.querySelector('button').onclick=()=>editor.hidden=true;
editCopy.oninput=()=>{const id=editId(editTarget.value);edits[id]={...(edits[id]||{}),text:editCopy.value};applyEdits();saveEdits()};
fields.forEach(input=>input.addEventListener('input',()=>{if(input.value==='')return;const prop=input.dataset.coverStyle;let value=prop==='textAlign'?input.value:Number(input.value);if(typeof value==='number'){if(!Number.isFinite(value))return;if(input.min)value=Math.max(Number(input.min),value);if(input.max)value=Math.min(Number(input.max),value)}const id=editId(editTarget.value);edits[id]={...(edits[id]||{}),style:{...(edits[id]?.style||{}),[prop]:value}};applyEdits();saveEdits()}));
for(const button of [previous,next])button.addEventListener('click',()=>{applyEdits();if(!editor.hidden)loadEditor()});applyEdits();
new IntersectionObserver(entries=>{const visible=entries[0].isIntersecting;editButton.hidden=!visible;shortcut.hidden=!visible;if(!visible){mobileCaptureRequest++;mobileCaptureTarget=null;editor.hidden=true;current=0;renderCapture();applyEdits()}},{threshold:.5}).observe(section);
shortcut.hidden=true;
})();