(()=>{
const key='jiali-case04-v3-copy-v1',styleKey='jiali-case04-v3-layout-v1',media=matchMedia('(max-width:700px)');let copies={},styles={};try{copies=JSON.parse(localStorage.getItem(key)||localStorage.getItem('jiali-case04-brand-systems-copy-v1')||'{}');styles=JSON.parse(localStorage.getItem(styleKey)||'{}')}catch{}
const targets=[];function add(node,id,label){if(!node)return;node.dataset.v3Edit=id;targets.push({node,id,label,original:node.getAttribute('style')||''});if(id==='intro'||id==='ethos-core-note'){const initial=typeof copies[id]==='string'?copies[id]:read(node),deviceKey=id==='intro'?'introByDevice':id+'ByDevice';copies[deviceKey]??={desktop:initial,mobile:initial};for(const d of ['desktop','mobile'])if(typeof copies[deviceKey][d]!=='string')copies[deviceKey][d]=initial;node.textContent=copies[deviceKey][device()]}else if(typeof copies[id]==='string')node.textContent=copies[id];node.contentEditable='plaintext-only';node.spellcheck=false;node.addEventListener('input',()=>{const text=read(node);storeCopy(id,text);save();if(select.value===id)copy.value=text})}
function read(node){function walk(n){if(n.nodeType===3)return n.nodeValue;if(n.nodeName==='BR')return '\n';let text='';for(const child of n.childNodes){const block=['DIV','P'].includes(child.nodeName);if(block&&text&&!text.endsWith('\n'))text+='\n';text+=walk(child);if(block&&child.nextSibling&&!text.endsWith('\n'))text+='\n'}return text}return walk(node)}
const index=document.querySelector('.case-index'),caseLabel=document.createElement('span');caseLabel.textContent='CASE ';index.firstChild.replaceWith(caseLabel);add(caseLabel,'caseLabel','CASE 标签');add(index.querySelector('.case04-number'),'caseNumber','CASE 数字');
for(const [id,label]of [['title','中文标题'],['english','英文标题'],['intro','正文']])add(document.querySelector('[data-copy="'+id+'"]'),id,label);
document.querySelectorAll('.brand-entries a').forEach((link,i)=>{add(link.querySelector('.case04-number'),'entry'+i+'Number','品牌 '+(i+1)+' 编号');add(link.querySelector('strong'),'entry'+i+'Title','品牌 '+(i+1)+' 名称');add(link.querySelector('small'),'entry'+i+'Description','品牌 '+(i+1)+' 说明');link.addEventListener('click',event=>{if(!document.querySelector(link.getAttribute('href'))||!editor.hidden)event.preventDefault()})});
add(document.querySelector('header .brand'),'portfolio','顶部 PORTFOLIO');document.querySelectorAll('header .corner span').forEach((node,i)=>add(node,'header'+i,'顶部角标 '+(i+1)));
const narrativeRevision='jiali-case04-narrative-20261029';try{if(!localStorage.getItem(narrativeRevision)){for(const id of ["gallery-intent-label", "gallery-nit-note", "gallery-series-intent-label", "gallery-series-intent-note", "gallery-mobile-series-note-label", "gallery-mobile-series-note"]){delete copies[id]}localStorage.setItem(key,JSON.stringify(copies));localStorage.setItem(narrativeRevision,'1')}}catch{}
try{const marker='jiali-case04-creative-direction-copy-v1';if(!localStorage.getItem(marker)){const id='gallery-language-label';if(typeof copies[id]==='string')copies[id]=copies[id].replace(/AESTHETIC JUDGMENT/g,'CREATIVE DIRECTION');localStorage.setItem(key,JSON.stringify(copies));localStorage.setItem(marker,'1')}}catch{}
try{const marker='jiali-case04-object-description-keywords-v1';if(!localStorage.getItem(marker)){delete copies['gallery-object-description'];localStorage.setItem(key,JSON.stringify(copies));localStorage.setItem(marker,'1')}}catch{}
try{const marker='jiali-case04-rules-creative-split-v1';if(!localStorage.getItem(marker)){delete copies['gallery-series-intent-note'];localStorage.setItem(key,JSON.stringify(copies));localStorage.setItem(marker,'1')}}catch{}
document.querySelectorAll('[data-nit-copy]').forEach((node,i)=>add(node,node.dataset.nitCopy,({'nit-page-heading':'第二页 · 栏目标题','nit-page-description':'第二页 · 右侧栏目说明','nit-section':'泥吞象介绍 · 编号','nit-cn':'泥吞象介绍 · 中文品牌名','nit-en':'泥吞象介绍 · 英文品牌名','nit-tagline':'泥吞象介绍 · 品牌文案','nit-footer':'泥吞象介绍 · 页脚说明','gallery-intent-label':'下方 · 品牌目标标题','gallery-nit-note':'下方 · 品牌目标正文','gallery-creative-guidance-label':'创意落地 · 标题','gallery-creative-guidance-note':'创意落地 · 正文','gallery-book-application-label':'手册应用延展 · 标题','gallery-book-application-note':'手册应用延展 · 正文','gallery-book-title':'品牌／产品手册 · 标题','gallery-book-description':'品牌／产品手册 · 说明','gallery-retail-application-label':'渠道应用延展 · 标题','gallery-retail-application-note':'渠道应用延展 · 正文','gallery-retail-title':'详情页／寄售 · 标题','gallery-retail-description':'详情页／寄售 · 说明','ethos-core-label':'ETHOS AROMA · 品牌内核标题','ethos-core-note':'ETHOS AROMA · 品牌内核正文','ethos-rule-application-title':'ETHOS AROMA · 规则应用标题','ethos-tone-label':'ETHOS · 视觉调性标题','ethos-tone-note':'ETHOS · 视觉调性正文','ethos-scene-label':'ETHOS · 叙事场景标题','ethos-scene-note':'ETHOS · 叙事场景正文','ethos-atmosphere-label':'ETHOS · 品牌氛围标题','ethos-atmosphere-note':'ETHOS · 品牌氛围正文','ethos-use-title':'ETHOS · 使用氛围标题','ethos-use-description':'ETHOS · 使用氛围说明','ethos-user-narrative-label':'ETHOS · 用户叙事标题','ethos-user-narrative-note':'ETHOS · 用户叙事正文','ethos-page-heading':'ETHOS AROMA · 栏目标题','ethos-page-description':'ETHOS AROMA · 栏目说明','gallery-object-title':'器物视觉 · 栏目标题','gallery-object-description':'器物视觉 · 栏目说明','gallery-language-label':'下方 · 视觉语言标题','gallery-nit-language':'下方 · 视觉语言说明'})[node.dataset.nitCopy]));
const editor=document.querySelector('.copy-editor');editor.innerHTML='<h2>第三版 · 内容与排版</h2><p class="v3-device"></p><label>编辑对象<select data-v3-target></select></label><label>内容<textarea data-v3-copy></textarea></label><div class="v3-fields"></div><div class="v3-editor-actions"><button type="button" data-v3-reset>恢复此项排版</button><button type="button" data-v3-close>完成</button></div><p>首页正文内容与换行、排版按电脑端和手机端分别保存。面板打开时点击页面文字可选中该项。</p><output aria-live="polite"></output>';
const select=editor.querySelector('[data-v3-target]'),copy=editor.querySelector('textarea'),zone=editor.querySelector('.v3-fields');targets.forEach(target=>{const option=document.createElement('option');option.value=target.id;option.textContent=target.label;select.append(option)});
const definitions=[['fontSize','字号 px',8,150,1],['fontWeight','字重',100,900,100],['lineHeight','行距（倍）',.8,5,.05],['letterSpacing','字距 em',-.2,1,.01],['marginTop','上方间距 px',-200,300,1],['marginBottom','下方间距 px',-200,300,1],['paddingLeft','左内边距 px',0,200,1],['paddingRight','右内边距 px',0,200,1],['x','水平偏移 px',-600,600,1],['y','垂直偏移 px',-600,600,1]];
for(const [prop,label,min,max,step]of definitions){const field=document.createElement('label');field.textContent=label;const input=document.createElement('input');input.type='number';input.min=min;input.max=max;input.step=step;input.dataset.prop=prop;field.append(input);zone.append(field)}const alignLabel=document.createElement('label');alignLabel.textContent='文字对齐';alignLabel.innerHTML+='<select data-prop="textAlign"><option value="left">居左</option><option value="center">居中</option><option value="right">居右</option><option value="justify">两端对齐</option></select>';zone.append(alignLabel);
const fields=[...zone.querySelectorAll('[data-prop]')],units={fontSize:'px',letterSpacing:'em',marginTop:'px',marginBottom:'px',paddingLeft:'px',paddingRight:'px'};function device(){return media.matches?'mobile':'desktop'}function current(){return targets.find(t=>t.id===select.value)}function storeCopy(id,text){if(id==='intro'||id==='ethos-core-note'){const deviceKey=id==='intro'?'introByDevice':id+'ByDevice';copies[deviceKey]??={};copies[deviceKey][device()]=text;if(device()==='desktop')copies[id]=text}else copies[id]=text}function apply(){for(const id of ['intro','ethos-core-note']){const target=targets.find(t=>t.id===id),deviceKey=id==='intro'?'introByDevice':id+'ByDevice';if(target&&typeof copies[deviceKey]?.[device()]==='string')target.node.textContent=copies[deviceKey][device()]};for(const target of targets){target.node.setAttribute('style',target.original);const settings=styles[device()]?.[target.id]||{};for(const [prop,value]of Object.entries(settings))if(prop!=='x'&&prop!=='y')target.node.style.setProperty(prop.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),value+(units[prop]||''),'important');if(settings.x!==undefined||settings.y!==undefined)target.node.style.translate=(settings.x||0)+'px '+(settings.y||0)+'px'}editor.querySelector('.v3-device').textContent=media.matches?'当前调整：手机端排版':'当前调整：电脑端排版'}
function load(){const target=current(),css=getComputedStyle(target.node),size=parseFloat(css.fontSize),settings=styles[device()]?.[target.id]||{};copy.value=read(target.node);fields.forEach(input=>{const prop=input.dataset.prop;input.value=prop==='x'||prop==='y'?settings[prop]||0:prop==='textAlign'?(css.textAlign==='start'?'left':css.textAlign):prop==='lineHeight'?(css.lineHeight==='normal'?1.4:Number((parseFloat(css.lineHeight)/size).toFixed(2))):prop==='letterSpacing'?(css.letterSpacing==='normal'?0:Number((parseFloat(css.letterSpacing)/size).toFixed(3))):parseFloat(css[prop])||0})}
function save(){try{localStorage.setItem(key,JSON.stringify(copies));localStorage.setItem(styleKey,JSON.stringify(styles));editor.querySelector('output').textContent='已自动保存'}catch{editor.querySelector('output').textContent='保存失败，请复制备份'}}copy.oninput=()=>{const target=current();target.node.textContent=copy.value;storeCopy(target.id,copy.value);save()};select.onchange=load;for(const input of fields)input.oninput=()=>{if(input.value==='')return;const prop=input.dataset.prop,value=prop==='textAlign'?input.value:Math.max(Number(input.min),Math.min(Number(input.max),Number(input.value)));if(typeof value==='number'&&!Number.isFinite(value))return;const d=device(),id=current().id;styles[d]??={};styles[d][id]??={};styles[d][id][prop]=value;apply();save()};editor.querySelector('[data-v3-reset]').onclick=()=>{if(styles[device()])delete styles[device()][current().id];apply();load();save()};document.querySelector('.edit-toggle').onclick=()=>{editor.hidden=!editor.hidden;if(!editor.hidden)load()};editor.querySelector('[data-v3-close]').onclick=()=>editor.hidden=true;document.addEventListener('click',event=>{if(editor.hidden||event.target.closest('.copy-editor,.edit-toggle'))return;const node=event.target.closest('[data-v3-edit]');if(node){if(node.closest('a'))event.preventDefault();select.value=node.dataset.v3Edit;load()}},true);media.addEventListener('change',()=>{apply();if(!editor.hidden)load()});apply();load();
})();
(()=>{const cover=document.querySelector('.case04-cover'),brand=document.querySelector('header .brand'),media=matchMedia('(min-width:701px)'),group=document.createElement('div');group.className='v3-cover-content';while(cover.firstChild)group.append(cover.firstChild);cover.append(group);const index=group.querySelector('.case-index');let frame=0;
function glyph(node,edge){const rect=node.getBoundingClientRect(),css=getComputedStyle(node),ctx=document.createElement('canvas').getContext('2d');ctx.font=css.fontStyle+' '+css.fontWeight+' '+css.fontSize+' '+css.fontFamily;const m=ctx.measureText(node.textContent.trim()),a=m.fontBoundingBoxAscent??m.actualBoundingBoxAscent,d=m.fontBoundingBoxDescent??m.actualBoundingBoxDescent,baseline=rect.top+(rect.height-a-d)/2+a;return edge==='top'?baseline-m.actualBoundingBoxAscent:baseline+m.actualBoundingBoxDescent}
function place(){frame=0;cover.style.removeProperty('--v3-content-top');if(!media.matches){const brandBottom=glyph(brand,'bottom')+scrollY,inkOffset=glyph(index,'top')-group.getBoundingClientRect().top,visibleHeight=group.offsetHeight-inkOffset,screenHeight=Math.max(innerHeight,brandBottom+visibleHeight+48);cover.style.height=screenHeight+'px';group.style.top=((screenHeight+brandBottom-group.offsetHeight-inkOffset)/2)+'px';return}cover.style.removeProperty('height');const brandBottom=glyph(brand,'bottom')+scrollY,inkOffset=glyph(index,'top')-group.getBoundingClientRect().top;group.style.top=((innerHeight+brandBottom-group.offsetHeight-inkOffset)/2-16)+'px'}function schedule(){if(!frame)frame=requestAnimationFrame(place)}addEventListener('resize',schedule);media.addEventListener('change',schedule);document.fonts.ready.then(schedule);for(const node of [brand,group])new ResizeObserver(schedule).observe(node);new MutationObserver(records=>{if(records.some(record=>record.target!==group))schedule()}).observe(group,{subtree:true,attributes:true,attributeFilter:['style'],childList:true,characterData:true});new MutationObserver(schedule).observe(document.querySelector('header'),{subtree:true,attributes:true,childList:true,characterData:true});schedule()})();

(()=>{const entries=[...document.querySelectorAll('.brand-entries a')];if(entries.length!==2)return;const media=matchMedia('(min-width:701px)'),pairs=['.case04-number','strong','small'].map(selector=>entries.map(entry=>entry.querySelector(selector)));let frame=0;
function bottom(node,top=false){const rect=node.getBoundingClientRect(),css=getComputedStyle(node),ctx=document.createElement('canvas').getContext('2d');ctx.font=css.fontStyle+' '+css.fontWeight+' '+css.fontSize+' '+css.fontFamily;const m=ctx.measureText(node.textContent.trim()),ascent=m.fontBoundingBoxAscent??m.actualBoundingBoxAscent,descent=m.fontBoundingBoxDescent??m.actualBoundingBoxDescent,baseline=rect.top+(rect.height-ascent-descent)/2+ascent;return top?baseline-m.actualBoundingBoxAscent:baseline+m.actualBoundingBoxDescent}
function align(){frame=0;for(const [left,right]of pairs){if(!left||!right)continue;const current=parseFloat(right.style.getPropertyValue('--v3-row-alignment'))||0;const offset=0;right.style.setProperty('--v3-row-alignment',offset+'px')}const nav=document.querySelector('.brand-entries');if(media.matches){const nodes=pairs.flat(),inkTop=Math.min(...nodes.map(node=>bottom(node,true))),inkBottom=Math.max(...nodes.map(node=>bottom(node))),box=nav.getBoundingClientRect(),current=parseFloat(nav.style.getPropertyValue('--v3-optical-offset'))||0;nav.style.setProperty('--v3-optical-offset',(current+(box.top+box.bottom-inkTop-inkBottom)/2-3)+'px')}else nav.style.removeProperty('--v3-optical-offset')}function schedule(){if(!frame)frame=requestAnimationFrame(align)}for(const pair of pairs)for(const node of pair)new ResizeObserver(schedule).observe(node);new MutationObserver(schedule).observe(document.querySelector('.brand-entries'),{subtree:true,childList:true,characterData:true});document.addEventListener('input',schedule);document.addEventListener('change',schedule);addEventListener('resize',schedule);media.addEventListener('change',schedule);document.fonts.ready.then(schedule);schedule()})();

(()=>{const section=document.querySelector('#nitunxiang'),heading=section.querySelector('.v3-nitunxiang-heading>span');let frame=0;function place(){frame=0;const css=getComputedStyle(heading),rect=heading.getBoundingClientRect(),outer=section.getBoundingClientRect(),ctx=document.createElement('canvas').getContext('2d');ctx.font=css.fontStyle+' '+css.fontWeight+' '+css.fontSize+' '+css.fontFamily;const m=ctx.measureText(heading.textContent.trim()),a=m.fontBoundingBoxAscent??m.actualBoundingBoxAscent,d=m.fontBoundingBoxDescent??m.actualBoundingBoxDescent,inkTop=rect.top+(rect.height-a-d)/2+a-m.actualBoundingBoxAscent;section.style.setProperty('--nit-bottom-gap',Math.max(0,inkTop-outer.top)+'px');const panel=section.querySelector('.v3-nitunxiang-panel'),image=section.querySelector('.v3-nitunxiang-visual img'),panelRatio=3*(image.naturalWidth&&image.naturalHeight?image.naturalWidth/image.naturalHeight:.75),style=getComputedStyle(section),head=section.querySelector('.v3-nitunxiang-heading'),headStyle=getComputedStyle(head),contentWidth=section.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);let width=contentWidth;panel.style.removeProperty('column-gap');let gap=parseFloat(getComputedStyle(panel).columnGap)||0,height=Math.max(1,(width-2*gap)/panelRatio);section.style.height='auto';panel.style.width=Math.max(1,width)+'px';panel.style.height=height+'px'}function schedule(){if(!frame)frame=requestAnimationFrame(place)}addEventListener('resize',schedule);document.addEventListener('input',schedule);document.fonts.ready.then(schedule);new ResizeObserver(schedule).observe(heading);new ResizeObserver(schedule).observe(section.querySelector('.gallery-brand-note'));const account=section.querySelector('.brand-official-link');if(account)new ResizeObserver(schedule).observe(account);section.querySelector('img').addEventListener('load',schedule);schedule()})();

// Match the CASE02 screen transition timing while keeping tall gallery pages readable.
(()=>{const media=matchMedia('(min-width:701px)');let busy=false,animating=false,release,tween=0;
function editing(target){return target?.closest('input,textarea,select,.copy-editor,[contenteditable="true"],[contenteditable="plaintext-only"]')||document.querySelector('.copy-editor:not([hidden]),dialog[open]')}
function sections(){return [...document.querySelectorAll('main>section')]}
function move(top){top=Math.max(0,Math.min(top,document.documentElement.scrollHeight-innerHeight));if(Math.abs(top-scrollY)<2)return;cancelAnimationFrame(tween);clearTimeout(release);busy=true;animating=true;const root=document.documentElement,behavior=root.style.scrollBehavior,snap=root.style.scrollSnapType,start=scrollY,time=performance.now(),duration=matchMedia('(prefers-reduced-motion:reduce)').matches?0:1400;root.style.scrollBehavior='auto';root.style.scrollSnapType='none';function tick(now){const p=duration?Math.min(1,(now-time)/duration):1,e=p*p*(3-2*p);scrollTo(0,start+(top-start)*e);if(p<1)tween=requestAnimationFrame(tick);else{animating=false;root.style.scrollBehavior=behavior;root.style.scrollSnapType=snap;release=setTimeout(()=>busy=false,300)}}tween=requestAnimationFrame(tick)}
function destination(direction){const list=sections(),y=scrollY;let index=0;list.forEach((node,i)=>{if(node.offsetTop<=y+8)index=i});const current=list[index];if(!current||index>1||(index===1&&direction>0))return null;const top=current.offsetTop,bottom=top+current.offsetHeight;if(direction>0){if(y+innerHeight<bottom-8)return null;return list[index+1]?.offsetTop??null}if(y>top+8)return null;const previous=list[index-1];return previous?Math.max(previous.offsetTop,previous.offsetTop+previous.offsetHeight-innerHeight):null}
addEventListener('wheel',event=>{if(!media.matches||event.ctrlKey||!event.deltaY||Math.abs(event.deltaY)<Math.abs(event.deltaX)||editing(event.target))return;if(busy){event.preventDefault();if(!animating){clearTimeout(release);release=setTimeout(()=>busy=false,300)}return}const top=destination(Math.sign(event.deltaY));if(top===null)return;event.preventDefault();move(top)},{passive:false});
addEventListener('keydown',event=>{if(!media.matches||editing(event.target)||event.target?.closest('button,a')||!['PageDown','PageUp'].includes(event.key))return;const top=destination(event.key==='PageDown'?1:-1);if(top===null)return;event.preventDefault();if(!busy)move(top)});
})();
(()=>{const dialog=document.querySelector('.image-dialog');if(!dialog)return;dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});document.querySelectorAll('[data-gallery-image]').forEach(button=>button.addEventListener('click',()=>{const image=button.querySelector('img');dialog.querySelector('img').src=button.dataset.galleryImage;dialog.querySelector('img').alt=image.alt;dialog.showModal()}))})();
(()=>{const nav=document.querySelector('.case-navigation'),cover=document.querySelector('#overview');if(!nav||!cover)return;function update(){const hidden=scrollY>cover.offsetTop+8;nav.classList.toggle('is-hidden',hidden);nav.inert=hidden;nav.setAttribute('aria-hidden',String(hidden))}addEventListener('scroll',update,{passive:true});addEventListener('resize',update);addEventListener('pageshow',update);addEventListener('hashchange',update);update()})();

// Start the mobile five-image guide at its first pair after reload or history restoration.
(()=>{
 const resetGuide=()=>{
  if(!matchMedia('(max-width:700px)').matches)return;
  const guide=document.querySelector('.v3-brandbook-section .new-book-grid');
  if(guide)guide.scrollTo({left:0,behavior:'instant'});
 };
 window.addEventListener('pageshow',()=>{resetGuide();requestAnimationFrame(()=>{resetGuide();requestAnimationFrame(resetGuide)});setTimeout(resetGuide,150)});
 if(document.readyState==='complete')resetGuide();
 else window.addEventListener('load',resetGuide,{once:true});
})();

// Match the product narrative to the established rules/direction typography, including saved edits.
(()=>{
 const pairs=[
 ['gallery-series-intent-label','gallery-product-rule-label'],
 ['gallery-series-intent-note','gallery-product-rule-note'],
 ['gallery-creative-guidance-label','gallery-product-creative-label'],
 ['gallery-creative-guidance-note','gallery-product-creative-note'],
 ['gallery-series-intent-label','gallery-object-rule-label'],
 ['gallery-series-intent-note','gallery-object-rule-note'],
 ['gallery-creative-guidance-label','gallery-object-creative-label'],
 ['gallery-creative-guidance-note','gallery-object-creative-note'],
 ['gallery-series-intent-label','gallery-book-application-label'],
 ['gallery-series-intent-note','gallery-book-application-note'],
 ['gallery-series-intent-label','gallery-retail-application-label'],
 ['gallery-series-intent-note','gallery-retail-application-note'],
 ['gallery-intent-label','ethos-core-label'],
 ['gallery-nit-note','ethos-core-note'],
 ['gallery-series-intent-label','ethos-tone-label'],
 ['gallery-series-intent-note','ethos-tone-note'],
 ['gallery-creative-guidance-label','ethos-scene-label'],
 ['gallery-creative-guidance-note','ethos-scene-note'],
 ['gallery-creative-guidance-label','ethos-atmosphere-label'],
 ['gallery-creative-guidance-note','ethos-atmosphere-note'],
 ['gallery-creative-guidance-label','ethos-user-narrative-label'],
 ['gallery-creative-guidance-note','ethos-user-narrative-note']
 ];
 const props=['font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-align'];
 const sync=()=>{for(const [from,to] of pairs){
  const source=document.querySelector('[data-nit-copy="'+from+'"]');
  const target=document.querySelector('[data-nit-copy="'+to+'"]');
  if(!source||!target)continue;
  const css=getComputedStyle(source);
  for(const prop of props)target.style.setProperty(prop,css.getPropertyValue(prop),'important');
 }};
 for(const [from] of pairs){const source=document.querySelector('[data-nit-copy="'+from+'"]');if(source)new MutationObserver(sync).observe(source,{attributes:true,attributeFilter:['style','class']});}
 addEventListener('resize',sync);addEventListener('pageshow',sync);document.fonts.ready.then(sync);sync();
})();

// Advance the forest carousel from its visible arrow control.
(()=>{
 const button=document.querySelector('.ethos-forest-hint'),track=document.querySelector('.ethos-forest-carousel');
 if(!button||!track)return;
 let destination=null,timer;
 button.addEventListener('click',()=>{
  const width=track.clientWidth;if(!width)return;
  const current=destination??Math.round(track.scrollLeft/width);
  destination=(current+1)%track.children.length;
  track.scrollTo({left:destination*width,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  clearTimeout(timer);timer=setTimeout(()=>destination=null,600);
 });
})();
// Restore desktop reading position on reload rather than jumping to the URL hash.
(()=>{
 if(!matchMedia('(min-width:701px)').matches)return;
 const key='case04-desktop-reading-position:'+location.pathname;
 const reload=performance.getEntriesByType('navigation')[0]?.type==='reload';
 let saved=null,interacted=false;
 try{saved=JSON.parse(sessionStorage.getItem(key)||'null')}catch{}
 const sections=[...document.querySelectorAll('main>section')];
 const save=()=>{const index=sections.reduce((best,node,i)=>node.getBoundingClientRect().top<=0?i:best,0);try{sessionStorage.setItem(key,JSON.stringify({index,offset:scrollY-(sections[index]?.offsetTop||0),y:scrollY}))}catch{}};
 addEventListener('pagehide',save);addEventListener('beforeunload',save);
 if(!reload||!saved)return;
 history.scrollRestoration='manual';
 const cancel=()=>interacted=true;
 for(const type of ['wheel','touchstart','pointerdown','keydown'])addEventListener(type,cancel,{once:true,passive:true});
 const restore=()=>{if(interacted)return;const section=sections[saved.index],top=section?section.offsetTop+saved.offset:saved.y;if(Math.abs(scrollY-top)>2)scrollTo({top,behavior:'instant'})};
 // Restore immediately against reserved image dimensions; correct only if font metrics change.
 restore();
 document.fonts.ready.then(()=>requestAnimationFrame(restore));
})();
