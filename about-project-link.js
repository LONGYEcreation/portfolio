// Decorate saved plain-text entry labels without altering their stored content.
(()=>{
 const nodes=[...document.querySelectorAll('#aboutBody,.profile-panel>.note-text')];if(!nodes.length)return;let frame=0,busy=false;
 const routes={1:'case-chatcut.html',2:'case-nitunxiang.html',3:'case03-nitunxiang.html'};
 const pattern=/进入\s*CASE\s*0?([123])(?:[ \t]*↗)?|进入视觉主页(?:[ \t]*↗)?|进入项目主页(?:[ \t]*↗)?/gi;
 const observer=new MutationObserver(schedule);
 function watch(){for(const node of nodes)observer.observe(node,{subtree:true,childList:true,characterData:true})}
 function decorate(){frame=0;observer.disconnect();try{for(const body of nodes){if(document.activeElement===body)continue;
  const texts=[],walker=document.createTreeWalker(body,NodeFilter.SHOW_TEXT);let text;while(text=walker.nextNode()){pattern.lastIndex=0;if(!text.parentElement.closest('a')&&pattern.test(text.nodeValue))texts.push(text)}
  for(const text of texts){const fragment=document.createDocumentFragment(),value=text.nodeValue;let last=0;pattern.lastIndex=0;for(const match of value.matchAll(pattern)){fragment.append(document.createTextNode(value.slice(last,match.index)));const link=document.createElement('a');link.href=match[1]?routes[Number(match[1])]:match[0].includes('视觉')?'visual-systems.html':'work.html';link.className='about-projects-inline-link';link.contentEditable='false';link.dataset.originalLabel=match[0];link.textContent=match[0];fragment.append(link);last=match.index+match[0].length}fragment.append(document.createTextNode(value.slice(last)));text.replaceWith(fragment)}
 for(const link of body.querySelectorAll('a.about-projects-inline-link')){const raw=link.dataset.originalLabel??link.textContent;link.dataset.originalLabel=raw;const label=matchMedia('(min-width:701px)').matches?raw.replace(/\s+/g,''):raw;if(link.textContent!==label)link.textContent=label;
 if(matchMedia('(min-width:701px)').matches){let previous=link.previousSibling;while(previous){const before=previous.previousSibling;if(previous.nodeType===Node.TEXT_NODE){const clean=previous.nodeValue.replace(/[\s\u00a0]+$/,'');if(clean){if(clean!==previous.nodeValue)previous.nodeValue=clean;break}previous.remove()}else if(previous.nodeName==='BR')previous.remove();else break;previous=before}}
 }
 }}finally{watch()}}
 function schedule(){if(!frame)frame=requestAnimationFrame(decorate)}for(const node of nodes){node.addEventListener('blur',schedule);node.addEventListener('subnavchange',schedule)}
 window.addEventListener('click',event=>{const link=event.target.closest?.('a.about-projects-inline-link');if(!link||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;event.preventDefault();event.stopImmediatePropagation();if(busy)return;busy=true;link.classList.add('about-entry-opening');setTimeout(()=>location.href=link.href,380)},true);
 addEventListener('pageshow',()=>{busy=false;document.querySelectorAll('.about-entry-opening').forEach(node=>node.classList.remove('about-entry-opening'))});addEventListener('resize',schedule);watch();schedule();
})();
