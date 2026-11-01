// ABOUT formal presentation mode on desktop and mobile.
(()=>{
 const selector='.about-text-toggle,.about-text-editor,.subnav-settings,.profile-subadd';
 function lock(){
  for(const node of document.querySelectorAll('#aboutLayout [contenteditable]'))if(node.getAttribute('contenteditable')!=='false')node.setAttribute('contenteditable','false');
  for(const node of document.querySelectorAll(selector)){if(!node.hidden)node.hidden=true;if(!node.inert)node.inert=true;if('disabled'in node&&!node.disabled)node.disabled=true}
 }
 lock();new MutationObserver(lock).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['contenteditable','hidden','inert','disabled']});
 document.addEventListener('beforeinput',event=>{if(event.target.closest('#aboutLayout [contenteditable],'+selector))event.preventDefault()},true);
})();
