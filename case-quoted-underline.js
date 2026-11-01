(()=>{
const body=document.querySelector('#case03Body,#caseBody');if(!body)return;
const style=document.createElement('style');style.textContent='#caseBody .case-quoted-underline,#case03Body .case-quoted-underline{text-decoration:underline;text-decoration-color:transparent;text-underline-offset:5px;text-decoration-thickness:.5px;text-decoration-skip-ink:none;transition:text-decoration-color .45s ease}#caseBody:hover .case-quoted-underline,#case03Body:hover .case-quoted-underline{text-decoration-color:currentColor}';document.head.append(style);
let frame=0;const observer=new MutationObserver(schedule);
function observe(){observer.observe(body,{subtree:true,childList:true,characterData:true})}
function decorate(){frame=0;if(document.activeElement===body)return;observer.disconnect();
try{
for(const mark of body.querySelectorAll('.case-quoted-underline'))mark.replaceWith(...mark.childNodes);body.normalize();
const nodes=[],walker=document.createTreeWalker(body,NodeFilter.SHOW_TEXT);let node,text='';while(node=walker.nextNode()){nodes.push({node,start:text.length,end:text.length+node.nodeValue.length});text+=node.nodeValue}
const matches=[...text.matchAll(/「([^」]+)」/g)].reverse();
for(const match of matches){const start=match.index+1,end=match.index+match[0].length-1,a=nodes.find(n=>n.start<=start&&n.end>start),b=nodes.find(n=>n.start<end&&n.end>=end);if(!a||!b)continue;const range=document.createRange();range.setStart(a.node,start-a.start);range.setEnd(b.node,end-b.start);const mark=document.createElement('span');mark.className='case-quoted-underline';mark.append(range.extractContents());range.insertNode(mark)}
}finally{observe()}}
function schedule(){if(!frame)frame=requestAnimationFrame(decorate)}
body.addEventListener('blur',schedule);addEventListener('pageshow',schedule);observe();schedule();
})();
// First-screen finger contact reveals the same underline decoration as body hover.
(()=>{
 if(!/\/(case-chatcut|case-nitunxiang|case03-nitunxiang)\.html$/.test(location.pathname))return;
 const copy=document.querySelector('#case03Body,#caseBody');if(!copy)return;
 const style=document.createElement('style');style.textContent='@media(max-width:700px){html.case-cover-touch-underline #caseBody .case-quoted-underline,html.case-cover-touch-underline #case03Body .case-quoted-underline,html.case-cover-touch-underline #caseBody .linked-phrase,html.case-cover-touch-underline #case03Body .linked-phrase{text-decoration-color:currentColor}}';document.head.append(style);
 let timer;const root=document.documentElement;
 function clear(){clearTimeout(timer);root.classList.remove('case-cover-touch-underline')}
 function firstScreen(){const next=document.querySelector('.case-research,#case02Comparison,#case03Website');return !next||scrollY<next.getBoundingClientRect().top+scrollY-4}
 addEventListener('touchstart',event=>{
  clear();if(!matchMedia('(max-width:700px)').matches||event.touches.length!==1||!firstScreen())return;
  const target=event.target;if(!(target instanceof Element)||target.closest('a,button,input,textarea,select,dialog,[role="button"],[role="link"],.text-editor,.research-editor,.shared-body-panel,.copy-editor,.case-overview-modal'))return;
  if(document.querySelector('dialog[open],.text-editor:not([hidden]),.research-editor:not([hidden]),.shared-body-panel:not([hidden])'))return;
  const editable=target.closest('[contenteditable="true"],[contenteditable="plaintext-only"]');if(editable&&editable!==copy)return;
  if(document.activeElement===copy)return;
  root.classList.add('case-cover-touch-underline');
 },{passive:true});
 addEventListener('touchend',()=>{timer=setTimeout(clear,700)},{passive:true});addEventListener('touchcancel',clear,{passive:true});
 addEventListener('scroll',()=>{if(!firstScreen())clear()},{passive:true});addEventListener('pageshow',clear);
})();
