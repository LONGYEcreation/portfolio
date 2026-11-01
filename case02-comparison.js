(()=>{
const third=document.querySelector('#case02Prototypes');if(!third)return;
const section=document.createElement('section');section.id='case02Comparison';section.className='case02-comparison';section.setAttribute('aria-label','交互原型对比');
section.innerHTML='<h2><span>交互原型</span><span>INTERACTIVE PROTOTYPES</span></h2><div class="comparison-layout"><div class="comparison-left"><a class="comparison-main" target="_blank" rel="noopener noreferrer"><img></a><p class="comparison-caption"></p></div><div class="comparison-right"><div class="comparison-options"></div><div class="comparison-detail" hidden><h3></h3><div class="comparison-copy" contenteditable="plaintext-only" role="textbox" aria-label="方案介绍" data-placeholder="点击这里填写这个版本的介绍"></div><button class="comparison-back" type="button">返回三个版本</button><output aria-live="polite"></output></div></div></div>';
document.body.insertBefore(section,third);
const researchLink=document.createElement('a');researchLink.className='comparison-case01-arrow';researchLink.href='case-chatcut.html#product-research';researchLink.setAttribute('aria-label','前往 CASE01 第二页');researchLink.title='前往 CASE01 第二页';researchLink.innerHTML='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M88 50H12M51 12C44 31 29 46 12 50M51 88C44 69 29 54 12 50"/></svg>';section.append(researchLink);

const defaults=[{title:'转化优先',url:'chatcut-homepage-concepts.html?concept=conversion',image:'assets/case02-concept-conversion.png'},{title:'品牌优先',url:'chatcut-homepage-concepts.html?concept=brand',image:'assets/case02-concept-brand.png'},{title:'混合推荐',url:'chatcut-homepage-concepts.html?concept=hybrid',image:'assets/case02-concept-hybrid.png'}];
const key='jiali-case02-comparison-introductions-v1';let notes={};try{notes=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
let entries=defaults,active=-1;const link=section.querySelector('.comparison-main'),image=link.querySelector('img'),caption=section.querySelector('.comparison-caption'),options=section.querySelector('.comparison-options'),detail=section.querySelector('.comparison-detail'),copy=section.querySelector('.comparison-copy'),status=detail.querySelector('output');
function loadEntries(){try{const saved=JSON.parse(localStorage.getItem('jiali-case02-prototypes-v1'));entries=defaults.map((d,i)=>({...d,...saved?.[i]}))}catch{entries=defaults}}
function original(){active=-1;image.src='assets/case02-chatcut-current.png';image.alt='ChatCut 现有版本';link.href='https://chatcut.io/zh';link.setAttribute('aria-label','打开 ChatCut 现有版本');caption.textContent='ChatCut 现有版本 ↑';options.hidden=false;detail.hidden=true;loadEntries();options.replaceChildren();entries.forEach((entry,i)=>{const button=document.createElement('a');button.className='comparison-option';button.href=entry.url;button.target='_blank';button.rel='noopener noreferrer';button.setAttribute('aria-label','打开 '+entry.title+' 原型');const img=document.createElement('img');img.src=entry.image;img.alt=entry.title+'预览';const label=document.createElement('span');label.textContent=entry.title;button.append(img);const card=document.createElement('article');card.className='comparison-version-card';card.dataset.version=String(i+1);label.className='comparison-tier comparison-tier-1';card.append(button,label);for(let tier=2;tier<=3;tier++){const text=document.createElement('p');text.className='comparison-tier comparison-tier-'+tier;text.dataset.placeholder=tier===2?'填写说明':'填写补充内容';card.append(text)}options.append(card)})}
function choose(i,source){const before=source.getBoundingClientRect(),entry=entries[i];active=i;image.src=entry.image;image.alt=entry.title;link.href=entry.url;link.setAttribute('aria-label','打开 '+entry.title+' 原型');caption.textContent=entry.title+' ↑';options.hidden=true;detail.hidden=false;detail.querySelector('h3').textContent=entry.title;copy.textContent=notes[i]||'';status.textContent='';const after=image.getBoundingClientRect();if(!matchMedia('(prefers-reduced-motion:reduce)').matches)image.animate([{transform:'translate('+ (before.left-after.left)+'px,'+(before.top-after.top)+'px) scale('+(before.width/after.width)+','+(before.height/after.height)+')'},{transform:'none'}],{duration:650,easing:'cubic-bezier(.22,.61,.36,1)'});}
copy.addEventListener('input',()=>{if(active<0)return;notes[active]=copy.innerText;try{localStorage.setItem(key,JSON.stringify(notes));status.textContent='已自动保存'}catch{status.textContent='保存失败，请复制备份'}});section.querySelector('.comparison-back').onclick=original;
new IntersectionObserver(records=>{if(!records[0].isIntersecting&&active!==-1)original()},{threshold:0}).observe(section);original();
})();

// Match the second-screen heading and context to the third-screen reference.
(()=>{
 const second=document.querySelector('#case02Comparison'),third=document.querySelector('#case02Prototypes');if(!second||!third)return;
 const target=second.querySelector('h2'),source=third.querySelector('.case02-analysis-heading'),reference=third.querySelector('.case02-prototype-context');
 if(!target||!source||!reference)return;
 const context=document.createElement('p');context.className='comparison-heading-context';target.after(context);
 const properties=['font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-align'];
 let frame=0;
 function sync(){frame=0;
  [...target.children].forEach((node,i)=>{const original=source.children[i];if(!original)return;const css=getComputedStyle(original);for(const prop of properties)node.style.setProperty(prop,css.getPropertyValue(prop));});
  context.textContent=reference.textContent;const css=getComputedStyle(reference);for(const prop of properties)context.style.setProperty(prop,css.getPropertyValue(prop));
  target.style.marginBottom='0';context.style.marginTop=css.marginTop;context.style.marginBottom='36px';
  const layout=second.querySelector('.comparison-layout');if(matchMedia('(min-width:701px)').matches){const range=document.createRange();range.selectNodeContents(target.firstElementChild||target);const topGap=Math.max(0,range.getBoundingClientRect().top-second.getBoundingClientRect().top);layout.style.height=Math.max(0,second.clientHeight-topGap-(layout.getBoundingClientRect().top-second.getBoundingClientRect().top))+'px'}else layout.style.removeProperty('height');
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(sync)}
 new MutationObserver(schedule).observe(source,{subtree:true,attributes:true,childList:true,characterData:true});new MutationObserver(schedule).observe(reference,{subtree:true,attributes:true,childList:true,characterData:true});
 addEventListener('resize',schedule);document.fonts.ready.then(schedule);schedule();
})();

// Editable centered three-tier captions, independent from preview click controls.
(()=>{
 const section=document.querySelector('#case02Comparison');if(!section)return;
 const key='jiali-case02-comparison-caption-tiers-v1';let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
 const left=section.querySelector('.comparison-left');left.dataset.version='0';
 const title=left.querySelector('.comparison-caption');title.classList.add('comparison-tier','comparison-tier-1');
 
 function bind(){section.querySelectorAll('.comparison-tier').forEach(node=>{
  if(node.dataset.tierBound)return;
  node.dataset.tierBound='1';node.contentEditable='plaintext-only';node.spellcheck=false;node.setAttribute('role','textbox');node.setAttribute('aria-multiline','true');
  const version=node.closest('[data-version]').dataset.version,tier=[1,2,3].find(n=>node.classList.contains('comparison-tier-'+n)),id=version+'-'+tier;
  node.setAttribute('aria-label','版本 '+(Number(version)+1)+' 第 '+tier+' 级文字');if(typeof saved[id]==='string')node.textContent=saved[id];
  node.addEventListener('input',()=>{saved[id]=window.case01ReadText?window.case01ReadText(node):node.innerText;try{localStorage.setItem(key,JSON.stringify(saved))}catch{}});
  node.addEventListener('click',event=>event.stopPropagation());
 })}
 new MutationObserver(bind).observe(section.querySelector('.comparison-options'),{childList:true});bind();
})();

// Budget only the preview area; the heading and context retain their typography and position.
(()=>{
 const section=document.querySelector('#case02Comparison'),layout=section?.querySelector('.comparison-layout');if(!layout)return;let frame=0;
 function fit(){frame=0;if(!matchMedia('(max-width:700px)').matches)return;const heading=section.querySelector('h2 span'),range=document.createRange();range.selectNodeContents(heading);const topGap=Math.max(0,range.getBoundingClientRect().top-section.getBoundingClientRect().top);const layoutShift=parseFloat((getComputedStyle(layout).translate||'0 0').split(/\s+/)[1])||0;const space=Math.max(0,innerHeight-(layout.getBoundingClientRect().top-section.getBoundingClientRect().top-layoutShift)-topGap);section.style.setProperty('--mobile-comparison-space',space+'px');
 let textHeight=0;for(const card of section.querySelectorAll('.comparison-left,.comparison-version-card')){let height=0;for(const node of card.querySelectorAll('.comparison-tier')){const css=getComputedStyle(node);height+=node.getBoundingClientRect().height+(parseFloat(css.marginTop)||0)+(parseFloat(css.marginBottom)||0)}textHeight=Math.max(textHeight,height)}section.style.setProperty('--mobile-comparison-image',Math.max(1,(space-16)/2-textHeight)+'px');
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(fit)}
 for(const node of section.querySelectorAll('h2,.comparison-heading-context'))new ResizeObserver(schedule).observe(node);
 new MutationObserver(schedule).observe(section,{subtree:true,childList:true,characterData:true});section.addEventListener('input',schedule);addEventListener('resize',schedule);addEventListener('load',schedule);document.fonts.ready.then(schedule);schedule();
})();

// Mirror the CASE01 research navigation arrow using its heading and edge geometry.
(()=>{
 const section=document.querySelector('#case02Comparison'),arrow=section?.querySelector('.comparison-case01-arrow');if(!arrow)return;
 const measure=document.createElement('div');measure.setAttribute('aria-hidden','true');measure.style.cssText='position:fixed;left:-10000px;top:0;visibility:hidden;pointer-events:none;width:50%;font-weight:400;line-height:1.4;text-align:center';
 document.body.append(measure);
 function fit(){let saved={};try{saved=JSON.parse(localStorage.getItem('jiali-case01-research-layout-v1')||'{}')}catch{}
 const mobile=matchMedia('(max-width:700px)').matches,w=document.documentElement.clientWidth,h=mobile?innerHeight:Math.max(650,innerHeight),font=mobile?Math.max(15,Math.min(w*.032,22)):Math.max(22,Math.min(w*.022222,h*.035556,48));
 measure.style.fontSize=font+'px';measure.replaceChildren();
 for(const [id,fallback]of [['rightCN','优化方案'],['rightEN','OPTIMIZATION']]){const span=document.createElement('span');span.style.display='block';span.textContent=saved[id]?.copy?.[0]||fallback;for(const [key,value]of Object.entries(saved[id]?.style||{}))if(['fontSize','fontWeight','lineHeight','letterSpacing','textAlign'].includes(key))span.style[key]=value+(key==='fontSize'?'px':key==='letterSpacing'?'em':'');measure.append(span)}
 const y=h*.066667+(Number(saved.rightPosition?.style?.y)||0)+measure.getBoundingClientRect().height/2;
 arrow.style.top=y+'px';const svgWidth=arrow.querySelector('svg').getBoundingClientRect().width;
 arrow.style.left=Math.max(0,w*.042361-(arrow.offsetWidth-svgWidth)/2-svgWidth*.12)+'px';
 }
 addEventListener('resize',fit);addEventListener('storage',fit);document.fonts.ready.then(fit);fit();
})();

// Shared typography controls for the three caption tiers across all four versions.
(()=>{
 const section=document.querySelector('#case02Comparison');if(!section)return;
 const media=matchMedia('(max-width:700px)'),desktopKey='jiali-case02-caption-tier-styles-v1',mobileKey='jiali-case02-caption-tier-styles-mobile-v1';let key=media.matches?mobileKey:desktopKey,saved={};function readStyles(){key=media.matches?mobileKey:desktopKey;try{const stored=localStorage.getItem(key);saved=JSON.parse(stored||localStorage.getItem(desktopKey)||'{}');if(media.matches&&!stored)localStorage.setItem(mobileKey,JSON.stringify(saved))}catch{saved={}}}readStyles();
 const toggle=document.createElement('button');toggle.type='button';toggle.className='comparison-type-toggle';toggle.textContent='调整层级文字';
 const panel=document.createElement('aside');panel.className='comparison-type-panel';panel.hidden=true;
 panel.innerHTML='<h2>同层级文字统一调整</h2><label>信息层级<select data-tier><option value="1">第一级 · 标题</option><option value="2">第二级 · 说明</option><option value="3">第三级 · 补充</option></select></label><label>修改哪一栏文案<select data-version><option value="0">ChatCut 官网</option><option value="1">转化优先</option><option value="2">品牌优先</option><option value="3">混合策略</option></select></label><label>该栏文字<textarea data-copy rows="4"></textarea></label><p>下面的排版设置同步应用到四栏的同一层级。</p><label>字号 px<input data-prop="fontSize" type="number" min="8" max="100" step="1"></label><label>字重<select data-prop="fontWeight"><option>100</option><option>200</option><option>300</option><option>400</option><option>500</option><option>600</option><option>700</option><option>800</option><option>900</option></select></label><label>行距（倍）<input data-prop="lineHeight" type="number" min="0.8" max="4" step="0.05"></label><label>字距 em<input data-prop="letterSpacing" type="number" min="-0.1" max="1" step="0.01"></label><label>上方间距 px<input data-prop="marginTop" type="number" min="0" max="150" step="1"></label><button data-reset type="button">恢复此层级排版</button><button data-close type="button">完成</button><output></output>';
 document.body.append(toggle,panel);
 const handle=panel.querySelector('h2');handle.title='拖动工具栏';let drag=null;
 handle.addEventListener('pointerdown',event=>{if(event.button!==0)return;const rect=panel.getBoundingClientRect();drag={x:event.clientX,y:event.clientY,left:rect.left,top:rect.top};handle.setPointerCapture(event.pointerId);event.preventDefault()});
 handle.addEventListener('pointermove',event=>{if(!drag)return;panel.style.left=Math.max(0,Math.min(innerWidth-panel.offsetWidth,drag.left+event.clientX-drag.x))+'px';panel.style.top=Math.max(0,Math.min(innerHeight-panel.offsetHeight,drag.top+event.clientY-drag.y))+'px'});
 const stopDrag=()=>drag=null;handle.addEventListener('pointerup',stopDrag);handle.addEventListener('pointercancel',stopDrag);
 const tierButtons=document.createElement('div');tierButtons.className='comparison-tier-buttons';tierButtons.setAttribute('role','group');tierButtons.setAttribute('aria-label','选择同层级信息');
 for(const [value,label]of [['1','一级 · 标题'],['2','二级 · 说明'],['3','三级 · 补充']]){const button=document.createElement('button');button.type='button';button.textContent=label;button.dataset.tierButton=value;tierButtons.append(button)}panel.querySelector('h2').after(tierButtons);
 const tier=panel.querySelector('[data-tier]'),version=panel.querySelector('[data-version]'),copy=panel.querySelector('[data-copy]'),fields=[...panel.querySelectorAll('[data-prop]')];
 function nodes(){return [...section.querySelectorAll('.comparison-tier-'+tier.value)]}
 function current(){return section.querySelector('[data-version="'+version.value+'"] .comparison-tier-'+tier.value)}
 function apply(){for(let i=1;i<=3;i++)for(const node of section.querySelectorAll('.comparison-tier-'+i)){for(const prop of ['fontSize','fontWeight','lineHeight','letterSpacing','marginTop']){const value=saved[i]?.[prop];if(value===undefined)node.style.removeProperty(prop.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()));else node.style[prop]=value+(prop==='fontSize'||prop==='marginTop'?'px':prop==='letterSpacing'?'em':'')}}dispatchEvent(new Event('resize'))}
 function load(){for(const button of tierButtons.children)button.setAttribute('aria-pressed',String(button.dataset.tierButton===tier.value));panel.querySelector('h2').textContent=media.matches?'手机端 · 同层级文字':'电脑端 · 同层级文字';const official=version.querySelector('option[value="0"]');official.disabled=tier.value!=='1';if(official.disabled&&version.value==='0')version.value='1';const node=current();if(!node)return;copy.value=window.case01ReadText?window.case01ReadText(node):node.innerText;const css=getComputedStyle(node);fields.forEach(field=>{const prop=field.dataset.prop;field.value=saved[tier.value]?.[prop]??(prop==='lineHeight'?+(parseFloat(css.lineHeight)/parseFloat(css.fontSize)).toFixed(2):prop==='letterSpacing'?+(parseFloat(css.letterSpacing)/parseFloat(css.fontSize)||0).toFixed(3):parseFloat(css[prop]))})}
 function persist(){try{localStorage.setItem(key,JSON.stringify(saved));panel.querySelector('output').textContent='已自动保存，同层级四栏同步'}catch{panel.querySelector('output').textContent='保存失败，请复制备份'}}
 for(const button of tierButtons.children)button.onclick=()=>{tier.value=button.dataset.tierButton;load()};tier.closest('label').hidden=true;
 toggle.onclick=()=>{panel.hidden=!panel.hidden;if(!panel.hidden)load()};panel.querySelector('[data-close]').onclick=()=>panel.hidden=true;tier.onchange=load;version.onchange=load;
 copy.oninput=()=>{const node=current();if(!node)return;node.textContent=copy.value;node.dispatchEvent(new Event('input',{bubbles:true}))};
 fields.forEach(field=>field.oninput=()=>{if(field.value==='')return;const value=Number(field.value);if(!Number.isFinite(value))return;const min=Number(field.min),max=Number(field.max);saved[tier.value]={...(saved[tier.value]||{}),[field.dataset.prop]:field.tagName==='SELECT'?value:Math.max(min,Math.min(max,value))};apply();persist()});
 panel.querySelector('[data-reset]').onclick=()=>{delete saved[tier.value];apply();persist();load()};
 section.addEventListener('focusin',event=>{const node=event.target.closest('.comparison-tier');if(!node)return;tier.value=String([1,2,3].find(i=>node.classList.contains('comparison-tier-'+i)));version.value=node.closest('[data-version]').dataset.version;if(!panel.hidden)load()});
 new MutationObserver(apply).observe(section.querySelector('.comparison-options'),{childList:true});
 new IntersectionObserver(records=>{toggle.hidden=!records[0].isIntersecting;if(toggle.hidden)panel.hidden=true},{threshold:.1}).observe(section);media.addEventListener('change',()=>{readStyles();apply();if(!panel.hidden)load()});apply();
})();

// Optically center circle glyphs without changing caption text or line geometry.
(()=>{
 const section=document.querySelector('#case02Comparison');if(!section)return;let frame=0;const context=document.createElement('canvas').getContext('2d');
 function decorate(){frame=0;observer.disconnect();try{for(const node of section.querySelectorAll('.comparison-tier')){
 if(node===document.activeElement)continue;
 for(const span of node.querySelectorAll('.comparison-optical-circle'))span.replaceWith(document.createTextNode(span.textContent));node.normalize();
 const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT),texts=[];let text;while(text=walker.nextNode())if(/[⌾◎]/.test(text.nodeValue))texts.push(text);
 for(const text of texts){const fragment=document.createDocumentFragment();for(const part of text.nodeValue.split(/([⌾◎])/)){if(!part)continue;if(!/^[⌾◎]$/.test(part)){fragment.append(document.createTextNode(part));continue}const span=document.createElement('span');span.className='comparison-optical-circle';span.textContent=part;fragment.append(span)}text.replaceWith(fragment)}
 const css=getComputedStyle(node);context.font=css.fontStyle+' '+css.fontWeight+' '+css.fontSize+' '+css.fontFamily;const reference=context.measureText((node.textContent.match(/[\u3400-\u9fff]/g)||['转化优先']).join(''));
 for(const span of node.querySelectorAll('.comparison-optical-circle')){const symbol=context.measureText(span.textContent);const offset=((symbol.actualBoundingBoxAscent-symbol.actualBoundingBoxDescent)-(reference.actualBoundingBoxAscent-reference.actualBoundingBoxDescent))/2;span.style.position='relative';span.style.top=offset+'px'}
 }}finally{observer.observe(section,{subtree:true,childList:true,characterData:true})}}
 function schedule(){if(!frame)frame=requestAnimationFrame(decorate)}const observer=new MutationObserver(schedule);
 section.addEventListener('focusout',schedule);section.addEventListener('input',schedule);addEventListener('resize',schedule);document.fonts.ready.then(schedule);observer.observe(section,{subtree:true,childList:true,characterData:true});schedule();
})();

// A plain exploration cue below the context, with one shared motion clock.
(()=>{
 const section=document.querySelector('#case02Comparison'),context=section?.querySelector('.comparison-heading-context');if(!context)return;
 const cue=document.createElement('button');cue.type='button';cue.className='comparison-explore-cue';cue.innerHTML='<span>点击开始探索</span><span class="comparison-explore-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2V22M3 12C7.2 13.5 10.4 17.2 12 22C13.6 17.2 16.8 13.5 21 12"/></svg></span>';context.after(cue);
 cue.onclick=()=>section.querySelector('.comparison-main')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'center'});
 dispatchEvent(new Event('resize'));
})();

// Mobile: shift the complete card group only, matching bottom visible-text air to title top air.
(()=>{
 const section=document.querySelector('#case02Comparison'),layout=section?.querySelector('.comparison-layout');if(!layout)return;let frame=0;
 function fit(){frame=0;if(!matchMedia('(max-width:700px)').matches){layout.style.removeProperty('translate');return}
 const heading=section.querySelector('h2 span'),cards=[...section.querySelectorAll('.comparison-left,.comparison-version-card')];if(!heading||!cards.length)return;
 const css=getComputedStyle(heading),r=heading.getBoundingClientRect(),ctx=document.createElement('canvas').getContext('2d');ctx.font=css.fontStyle+' '+css.fontWeight+' '+css.fontSize+' '+css.fontFamily;
 const m=ctx.measureText(heading.textContent.trim()),asc=m.fontBoundingBoxAscent??m.actualBoundingBoxAscent,desc=m.fontBoundingBoxDescent??m.actualBoundingBoxDescent;
 const inkTop=r.top+(r.height-asc-desc)/2+asc-m.actualBoundingBoxAscent,sectionRect=section.getBoundingClientRect(),gap=inkTop-sectionRect.top;
 let bottom=-Infinity;for(const card of cards)for(const node of card.querySelectorAll('.comparison-tier')){if(!node.textContent.trim())continue;const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);let text;while(text=walker.nextNode()){if(!text.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(text);for(const rect of range.getClientRects())if(rect.width&&rect.height)bottom=Math.max(bottom,rect.bottom)}}
 if(!Number.isFinite(bottom))return;const current=parseFloat((getComputedStyle(layout).translate||'0 0').split(/\s+/)[1])||0,delta=sectionRect.bottom-gap-bottom;
 if(Math.abs(delta)>.25)layout.style.translate='0 '+(current+delta)+'px';
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(fit)}
 new MutationObserver(schedule).observe(section,{subtree:true,childList:true,characterData:true});new ResizeObserver(schedule).observe(layout);section.addEventListener('input',schedule);addEventListener('resize',schedule);addEventListener('load',schedule);document.fonts.ready.then(schedule);schedule();
})();
