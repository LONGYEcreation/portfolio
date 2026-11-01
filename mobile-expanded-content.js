(()=>{
const media=matchMedia('(max-width:700px)'),style=document.createElement('style');
style.textContent='@media(max-width:700px){html{overflow-y:auto!important}body{overflow-y:visible!important}[data-mobile-expanded-scroll]{overflow:visible!important;overflow-x:visible!important;overflow-y:visible!important;height:auto!important;max-height:none!important;overscroll-behavior:auto!important}[data-mobile-expanded-panel]{position:absolute!important;top:var(--mobile-panel-document-top)!important;bottom:auto!important;margin-top:0!important;max-height:none!important;height:auto!important;overflow:visible!important}textarea[data-mobile-expanded-input]{height:var(--mobile-input-height)!important;max-height:none!important;overflow:hidden!important;resize:none!important}.source-image,.source-image.original,.source-image.full-page{width:100%!important;min-width:0!important}.source-scroll{padding:16px!important}.source-image img{max-width:100%!important;height:auto!important}.chatcut-search-comparison{max-height:none!important;overflow:visible!important}.reader{height:auto!important;max-height:none!important;overflow:visible!important}}';document.head.append(style);
let frame=0;const marked=new Set();
function update(){frame=0;if(!media.matches){for(const node of marked){node.removeAttribute('data-mobile-expanded-scroll');node.removeAttribute('data-mobile-expanded-panel');node.removeAttribute('data-mobile-expanded-input')}marked.clear();return}
for(const node of document.querySelectorAll('body *')){
if(node.closest('.comparison-type-panel,.evaluation-edit-panel')){node.removeAttribute('data-mobile-expanded-scroll');node.removeAttribute('data-mobile-expanded-panel');node.removeAttribute('data-mobile-expanded-input');marked.delete(node);continue}
if(['SCRIPT','STYLE','LINK','META','SVG','PATH','OPTION'].includes(node.tagName)||node.closest('[hidden]'))continue;
if(node.tagName==='TEXTAREA'){if(!node.getClientRects().length)continue;node.setAttribute('data-mobile-expanded-input','');const height=Math.max(80,node.scrollHeight+4);if(node.style.getPropertyValue('--mobile-input-height')!==height+'px')node.style.setProperty('--mobile-input-height',height+'px');marked.add(node);continue}
if(node.hasAttribute('data-mobile-expanded-scroll')||!node.getClientRects().length)continue;
const css=getComputedStyle(node);if(!/^(auto|scroll)$/.test(css.overflowY))continue;
node.setAttribute('data-mobile-expanded-scroll','');marked.add(node);
if(css.position==='fixed'||node.tagName==='DIALOG'){node.setAttribute('data-mobile-expanded-panel','');node.style.setProperty('--mobile-panel-document-top',(scrollY+18)+'px')}
}
}
function schedule(){if(!frame)frame=requestAnimationFrame(update)}
new MutationObserver(records=>{if(records.some(record=>record.type==='childList'||record.type==='characterData'||['hidden','class','open'].includes(record.attributeName)))schedule()}).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','class','open']});
addEventListener('input',schedule);addEventListener('resize',schedule);media.addEventListener('change',schedule);document.fonts.ready.then(schedule);schedule();
})();