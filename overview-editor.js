(()=>{
const key='jiali-site-overview-typography-v1';let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
// Restore only the cleared ABOUT label; keep every saved typography value.
const aboutTitle=saved['about.html|title'];
if(aboutTitle&&typeof aboutTitle.text==='string'&&!aboutTitle.text.trim()){
aboutTitle.text='ABOUT';
try{localStorage.setItem(key,JSON.stringify(saved))}catch{}
}
// Apply the explicitly supplied detail typography once, keeping a rollback copy.
try{const marker='jiali-overview-detail-leading-135-130-v1';if(!localStorage.getItem(marker)){
localStorage.setItem(marker+'-backup',JSON.stringify(saved));
for(const [href,count] of [['case-chatcut.html',4],['case03-nitunxiang.html',6]])for(let i=0;i<count;i++)for(const part of ['title','sub']){
const id=href+'|detail-'+i+'|'+part;saved[id]={...(saved[id]||{}),fontSize:part==='title'?13:10,fontWeight:part==='title'?500:400,lineHeight:part==='title'?1.35:1.3};
}
localStorage.setItem(key,JSON.stringify(saved));localStorage.setItem(marker,'1');
}}catch{}
let panel,selected;const targets=[];
function add(node,id){if(!node)return;node.dataset.overviewType=id;targets.push(node);const value=saved[id];if(value){if(typeof value.text==='string')node.textContent=value.text;if(value.fontSize!==undefined)node.style.fontSize=value.fontSize+'px';if(value.fontWeight!==undefined)node.style.fontWeight=value.fontWeight;if(value.lineHeight!==undefined)node.style.lineHeight=value.lineHeight}node.style.cursor=node.closest('a')?'pointer':'default';/* Formal mode: apply saved content and typography without attaching editing handlers. */}
window.registerOverviewText=add;
add(document.querySelector('.overview-title'),'heading');
document.querySelectorAll('.map a').forEach(anchor=>{for(const part of ['title','sub'])add(anchor.querySelector('.'+part),(anchor.dataset.overviewKey||anchor.getAttribute('href'))+'|'+part)});
document.querySelectorAll('.mobile-map a').forEach(anchor=>{const title=anchor.querySelector('.title');if(title){add(title,anchor.getAttribute('href')+'|title');add(anchor.querySelector('.sub'),anchor.getAttribute('href')+'|sub')}else add(anchor,anchor.getAttribute('href')+'|title')});
// Mobile category headings use the same editor as the existing overview text.
document.querySelectorAll('.mobile-map section>h2').forEach((heading,i)=>{
const href=i===0?'product-fundamentals.html':'portfolio-content.html#advantage';
add(heading,href+'|mobile-category');
});
function close(){panel?.remove();panel=null;selected?.classList.remove('overview-type-selected');selected=null}
function persist(){try{localStorage.setItem(key,JSON.stringify(saved))}catch{}}
function open(node,id){return;/* Presentation lock */close();selected=node;node.classList.add('overview-type-selected');panel=document.createElement('div');panel.className='overview-inline-editor';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','概览文字排版');panel.innerHTML='<label class="overview-copy-field">文字<textarea aria-label="当前文字内容" spellcheck="false"></textarea></label><label>字号<input data-type="fontSize" type="number" min="8" max="120" step="1" aria-label="当前文字字号"></label><label>字重<select data-type="fontWeight" aria-label="当前文字字重">'+[100,200,300,400,500,600,700,800,900].map(w=>'<option value="'+w+'">'+w+'</option>').join('')+'</select></label><label>行间距<input data-type="lineHeight" type="number" min=".8" max="4" step=".05" aria-label="当前文字行间距"></label><footer><span>自动保存</span><button type="button">完成</button></footer>';document.body.append(panel);
const copyInput=panel.querySelector('textarea');copyInput.value=node.textContent;copyInput.addEventListener('input',()=>{saved[id]={...(saved[id]||{}),text:copyInput.value};targets.filter(t=>t.dataset.overviewType===id).forEach(t=>t.textContent=copyInput.value);persist();place()});const css=getComputedStyle(node),size=parseFloat(css.fontSize);panel.querySelector('[data-type="fontSize"]').value=size;panel.querySelector('[data-type="fontWeight"]').value=css.fontWeight==='normal'?'400':css.fontWeight;panel.querySelector('[data-type="lineHeight"]').value=css.lineHeight==='normal'?1.35:Number((parseFloat(css.lineHeight)/size).toFixed(2));
function place(){if(!panel)return;const r=node.getBoundingClientRect(),width=175;panel.style.width=width+'px';panel.style.left=Math.max(8,Math.min(innerWidth-width-8,r.right+10))+'px';panel.style.top=Math.max(8,Math.min(innerHeight-panel.offsetHeight-8,r.top))+'px'}place();
panel.querySelectorAll('[data-type]').forEach(input=>input.addEventListener('input',()=>{if(input.value==='')return;const prop=input.dataset.type,limits={fontSize:[8,120],fontWeight:[100,900],lineHeight:[.8,4]},value=Math.max(limits[prop][0],Math.min(limits[prop][1],Number(input.value)));if(!Number.isFinite(value))return;saved[id]={...(saved[id]||{}),[prop]:value};targets.filter(t=>t.dataset.overviewType===id).forEach(t=>t.style[prop]=value+(prop==='fontSize'?'px':''));persist();place()}));panel.querySelector('button').onclick=close}
function restoreCopy(){for(const node of targets){const value=saved[node.dataset.overviewType];if(typeof value?.text==='string')node.textContent=value.text}}addEventListener('pageshow',restoreCopy);addEventListener('storage',event=>{if(event.key==='jiali-work-content-style-v1')restoreCopy();if(event.key===key){try{saved=JSON.parse(event.newValue||'{}')}catch{}restoreCopy()}});
document.addEventListener('click',event=>{if(panel&&!panel.contains(event.target))close()});document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});addEventListener('resize',close);
})();
