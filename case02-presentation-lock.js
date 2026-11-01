// Apply after saved copy/styles load; presentation mode preserves viewing interactions.
(()=>{
 const selectors='.text-toggle,.text-editor,.shared-body-toggle,.shared-body-panel,.comparison-type-toggle,.comparison-type-panel,.evaluation-edit-toggle,.evaluation-edit-panel,.case02-prototype-toggle,.copy-tools';
 function lock(){for(const node of document.querySelectorAll('[contenteditable]'))if(node.getAttribute('contenteditable')!=='false')node.setAttribute('contenteditable','false');for(const node of document.querySelectorAll(selectors)){if(!node.hidden)node.hidden=true;if(!node.inert)node.inert=true;if(node instanceof HTMLButtonElement&&!node.disabled)node.disabled=true}}
 lock();new MutationObserver(lock).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['contenteditable','hidden','inert','disabled']});
 document.addEventListener('beforeinput',event=>{if(event.target.closest('[contenteditable],'+selectors))event.preventDefault()},true);
})();
