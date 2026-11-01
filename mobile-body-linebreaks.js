(()=>{
const body=document.querySelector('#case03Body,#caseBody'),panel=document.querySelector('.shared-body-panel');if(!body||!panel)return;
const media=matchMedia('(max-width:700px)'),page=location.pathname.split('/').pop(),key='jiali-mobile-body-copy-v2-'+page,oldKey='jiali-mobile-body-breaks-'+page;
function raw(el){function visit(n){if(n.nodeType===3)return n.nodeValue;if(n.nodeType!==1||n.classList.contains('mobile-only-body-break'))return '';if(n.tagName==='BR')return '\n';let text='';for(const child of n.childNodes){const block=['DIV','P'].includes(child.nodeName);if(block&&text&&!text.endsWith('\n'))text+='\n';text+=visit(child);if(block&&child.nextSibling&&!text.endsWith('\n'))text+='\n'}return text}return visit(el)}
body.querySelectorAll('.mobile-only-body-break').forEach(n=>n.remove());
let desktopText=raw(body),desktopNodes=[...body.childNodes].map(n=>n.cloneNode(true)),mobileText=desktopText,phone=media.matches;
try{const existing=localStorage.getItem(key);if(existing!==null)mobileText=JSON.parse(existing).text;else{const old=JSON.parse(localStorage.getItem(oldKey)||'null');if(typeof old?.text==='string')mobileText=old.text;localStorage.setItem(key,JSON.stringify({text:mobileText}))}}catch{}
if(typeof mobileText!=='string')mobileText=desktopText;
const originalRead=window.case01ReadText;
if(originalRead)window.case01ReadText=function(el){return el===body&&media.matches?desktopText:originalRead(el)};
window.readCaseBodyDesktopText=()=>media.matches?desktopText:raw(body);
const field=document.createElement('div');field.className='mobile-break-field';field.innerHTML='<label>手机端独立正文与换行<textarea aria-label="手机端正文换行" spellcheck="false"></textarea></label><p>电脑端与手机端分别保存，修改文字或换行均互不覆盖。</p><button type="button">用电脑端正文重新初始化手机端</button><output aria-live="polite"></output>';panel.insertBefore(field,panel.querySelector('footer'));
const style=document.createElement('style');style.textContent='@media(max-width:700px){.mobile-break-field textarea{box-sizing:border-box;width:100%;min-height:180px;padding:8px;background:#222;color:#fff;border:1px solid #777;font:inherit;line-height:1.7}.mobile-break-field p{font-size:11px;color:#bbb}.mobile-break-field output{display:block;margin:8px 0}}';document.head.append(style);
const input=field.querySelector('textarea'),status=field.querySelector('output');
function saveMobile(){try{localStorage.setItem(key,JSON.stringify({text:mobileText}));status.textContent='已保存手机端正文，电脑端未修改'}catch{status.textContent='浏览器保存失败'}}
function displayPhone(){if(raw(body)!==mobileText)body.textContent=mobileText;input.value=mobileText}
function displayDesktop(){body.replaceChildren(...desktopNodes.map(n=>n.cloneNode(true)))}
function bodyEditorTarget(target){return target===body||target.id==='editTextCopy'&&document.querySelector('#editTextTarget')?.value==='caseBody'||target.id==='case03EditCopy'&&document.querySelector('#case03EditTarget')?.value==='case03Body'}
document.addEventListener('input',event=>{const target=event.target;if(!bodyEditorTarget(target))return;
if(media.matches){event.stopImmediatePropagation();mobileText=target===body?raw(body):target.value;saveMobile();if(target!==body)displayPhone();else input.value=mobileText;
const copy=document.querySelector('#editTextCopy,#case03EditCopy');if(copy&&bodyEditorTarget(copy))copy.value=mobileText;
}else queueMicrotask(()=>{desktopText=raw(body);desktopNodes=[...body.childNodes].map(n=>n.cloneNode(true))});
},true);
input.addEventListener('input',()=>{mobileText=input.value;saveMobile();if(media.matches)displayPhone()});
field.querySelector('button').onclick=()=>{mobileText=desktopText;saveMobile();if(media.matches)displayPhone();else input.value=mobileText};
document.querySelector('.shared-body-toggle').addEventListener('click',()=>{input.value=mobileText});
media.addEventListener('change',()=>{if(media.matches&&!phone){desktopText=raw(body);desktopNodes=[...body.childNodes].map(n=>n.cloneNode(true));phone=true;displayPhone()}else if(!media.matches&&phone){phone=false;displayDesktop()}});
addEventListener('storage',event=>{if(event.key===key&&event.newValue){try{const record=JSON.parse(event.newValue);if(typeof record.text==='string'){mobileText=record.text;if(media.matches)displayPhone();else input.value=mobileText}}catch{}}});
input.value=mobileText;if(phone)displayPhone();
})();