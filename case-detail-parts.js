(()=>{function split(raw){const goalMatch=[...raw.matchAll(/(?:^|\n)[ \t]*核心目标[：:]/g)].pop();const goalStart=goalMatch?goalMatch.index:raw.length;let headerEnd=raw.search(/\n[ \t]*\n/);if(headerEnd<0){const lines=[...raw.matchAll(/\n/g)];headerEnd=lines.length>1?lines[1].index:lines[0]?.index??raw.length}headerEnd=Math.min(headerEnd,goalStart);return {title:raw.slice(0,headerEnd),body:raw.slice(headerEnd,goalStart),goal:raw.slice(goalStart)}}function read(el){return original(el)}function render(el,styles={}){if(['developedValueBody','futureValueBody'].includes(el.id))return renderValue(el,styles);const raw=read(el),parts=split(raw);if(el.dataset.preserveEditedLayout==='1'){for(const span of el.querySelectorAll('[data-detail-part]')){for(const [k,v]of Object.entries(styles[span.dataset.detailPart]||{}))span.style[k]=v+(k==='fontSize'?'px':k==='letterSpacing'?'em':k==='marginTop'||k==='marginBottom'?'px':'')}return parts}el.replaceChildren();for(const id of ['title','body','goal']){const span=document.createElement('span');span.className='detail-copy-part';span.dataset.detailPart=id;span.textContent=parts[id];for(const [k,v]of Object.entries(styles[id]||{}))span.style[k]=v+(k==='fontSize'?'px':k==='letterSpacing'?'em':k==='marginTop'||k==='marginBottom'?'px':'');el.append(span)}el.dataset.partsReady='1';return parts}function renderValue(el,styles){
 const storage='jiali-case01-value-independent-blocks-v1';
 function records(){try{return JSON.parse(localStorage.getItem(storage)||'{}')}catch{return {}}}
 if(el.dataset.independentBlocks!=='1'){
  const raw=read(el),record=records()[el.id];
  const parts=split(raw);if(el.id==='developedValueBody'){const boundary=raw.indexOf('从现有产品能力');if(boundary>=0){const end=raw.length-parts.goal.length;parts.title=raw.slice(0,boundary);parts.body=raw.slice(boundary,end)}}el.replaceChildren();el.contentEditable='false';el.removeAttribute('role');
  for(const id of ['title','body','goal']){
   const block=document.createElement('div');block.className='detail-copy-part value-independent-block';block.dataset.detailPart=id;
   block.contentEditable='true';block.spellcheck=false;block.setAttribute('role','textbox');block.setAttribute('aria-multiline','true');
   block.setAttribute('aria-label',({title:'标题与副标题',body:'正文',goal:'核心目标'})[id]);
   if(record&&record.version===2&&record.text===raw&&typeof record.parts?.[id]==='string')block.innerHTML=record.parts[id];
   else block.textContent=(parts[id]||'').replace(/^\n+|\n+$/g,'');
   el.append(block);
  }
  el.dataset.independentBlocks='1';
 }
 for(const block of el.querySelectorAll(':scope > [data-detail-part]')){
  const style=styles[block.dataset.detailPart]||{};
  for(const k of ['fontSize','fontWeight','lineHeight','letterSpacing','textAlign','marginTop','marginBottom']){
   block.style[k]=style[k]!==undefined?style[k]+(k==='fontSize'?'px':k==='letterSpacing'?'em':k==='marginTop'||k==='marginBottom'?'px':''):'';
  }
 }
 if(!el.dataset.independentSave){el.dataset.independentSave='1';el.addEventListener('input',()=>{
  const all=records(),parts={};for(const block of el.querySelectorAll(':scope > [data-detail-part]'))parts[block.dataset.detailPart]=block.innerHTML;
  all[el.id]={version:2,text:window.case01ReadText(el),parts};try{localStorage.setItem(storage,JSON.stringify(all))}catch{}
 })}
 return split(read(el));
}
window.case01DetailParts={split,read,render};const original=window.case01ReadText;window.case01ReadText=function(el){return original(el)}})();

(()=>{const section=document.querySelector('.case-research'),copy=section?.querySelector('.research-detail-copy');if(!copy)return;const key='jiali-case01-insight-edited-layout-v1',textKey='jiali-case01-research-insight-details-v1';function records(){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}}copy.addEventListener('input',()=>{const active=section.querySelector('.research-option.research-active');if(!active)return;const clone=copy.cloneNode(true);clone.querySelectorAll('.value-subsection-trigger').forEach(n=>n.replaceWith(document.createTextNode(n.textContent)));for(const n of [...clone.querySelectorAll('*')]){if(!['SPAN','DIV','P','BR','B','I','STRONG','EM'].includes(n.tagName)){n.replaceWith(document.createTextNode(n.textContent));continue}for(const a of [...n.attributes])if(!['style','class','data-detail-part'].includes(a.name))n.removeAttribute(a.name)}const all=records();all[active.dataset.problem]={text:window.case01ReadText(copy),html:clone.innerHTML};try{localStorage.setItem(key,JSON.stringify(all))}catch{}copy.dataset.preserveEditedLayout='1'});section.addEventListener('case01-detail-before-show',event=>{delete copy.dataset.preserveEditedLayout;const index=event.detail.index,record=records()[index];let text;try{text=JSON.parse(localStorage.getItem(textKey)||'{}')[index]}catch{}if(record&&record.text===text){copy.innerHTML=record.html;copy.dataset.preserveEditedLayout='1'}});})();

// Preserve the two value subpages exactly as edited, independently of plain-text storage.
(()=>{
 const key='jiali-case01-value-edited-layout-v1',textKey='jiali-case01-value-subsections-v1';
 function readRecords(storageKey){try{return JSON.parse(localStorage.getItem(storageKey)||'{}')}catch{return {}}}
 for(const id of ['developedValueBody','futureValueBody']){
  const body=document.getElementById(id);if(!body)continue;
  const record=readRecords(key)[id],text=readRecords(textKey)[id];
  if(record&&record.text===text){body.innerHTML=record.html;body.dataset.preserveEditedLayout='1'}
  body.addEventListener('input',()=>{
   const clone=body.cloneNode(true);
   for(const n of [...clone.querySelectorAll('*')]){
    if(!['SPAN','DIV','P','BR','B','I','STRONG','EM'].includes(n.tagName)){n.replaceWith(document.createTextNode(n.textContent));continue}
    for(const a of [...n.attributes])if(!['style','class','data-detail-part'].includes(a.name))n.removeAttribute(a.name);
   }
   const all=readRecords(key);all[id]={text:window.case01ReadText(body),html:clone.innerHTML};
   try{localStorage.setItem(key,JSON.stringify(all))}catch{}
   body.dataset.preserveEditedLayout='1';
  });
 }
})();
