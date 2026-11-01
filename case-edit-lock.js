// Load after each page's existing editor so saved copy and styles remain intact.
(()=>{
 const lock=()=>{
  document.querySelectorAll('[contenteditable]').forEach(node=>{if(node.getAttribute('contenteditable')!=='false')node.setAttribute('contenteditable','false')});
  document.querySelectorAll('.copy-editor').forEach(node=>{if(!node.hidden)node.hidden=true;node.inert=true});
  document.querySelectorAll('.edit-toggle').forEach(node=>{if(!node.hidden)node.hidden=true;node.inert=true;node.disabled=true});
 };
 lock();
 new MutationObserver(records=>{if(records.some(record=>record.type==='childList'||record.attributeName==='contenteditable'||record.attributeName==='hidden'))lock()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['contenteditable','hidden']});
 document.addEventListener('beforeinput',event=>{if(event.target.closest('[data-v3-edit],.copy-editor'))event.preventDefault()},true);
})();
