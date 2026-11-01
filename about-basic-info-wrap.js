// Keep the closing phrase together on mobile without rewriting saved copy.
(()=>{
 const body=document.querySelector('#aboutBody');if(!body)return;
 function apply(){
  if(body.isContentEditable)return;
  const walker=document.createTreeWalker(body,NodeFilter.SHOW_TEXT);const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){
   if(node.parentElement.closest('.about-experience-phrase'))continue;
   const match=/AI[ \t]*创作经验。/.exec(node.data);if(!match)continue;
   const fragment=document.createDocumentFragment();
   fragment.append(document.createTextNode(node.data.slice(0,match.index)));
   const phrase=document.createElement('span');phrase.className='about-experience-phrase';phrase.textContent=match[0];fragment.append(phrase);
   fragment.append(document.createTextNode(node.data.slice(match.index+match[0].length)));node.replaceWith(fragment);
  }
 }
 new MutationObserver(apply).observe(body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['contenteditable']});apply();
})();
