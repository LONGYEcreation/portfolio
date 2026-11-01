// Apply the approved wording once, preserving each viewport's line breaks.
(()=>{
 const marker='jiali-about-brand-visual-wording-20261101-v1';
 try{
  if(localStorage.getItem(marker))return;
  for(const key of ['jiali-about-subnavigation-v1','jiali-about-subnavigation-mobile-v1']){
   const raw=localStorage.getItem(key);if(!raw)continue;
   const data=JSON.parse(raw);let changed=false;
   for(const item of data.profile?.items||[]){
    if(typeof item.body!=='string')continue;
    const next=item.body.replace(/成熟品牌组织的视觉与创意实践/g,'成熟组织的品牌视觉与创意实践');
    if(next!==item.body){item.body=next;changed=true;}
   }
   if(changed){localStorage.setItem(key+'-before-brand-visual-wording',raw);localStorage.setItem(key,JSON.stringify(data));}
  }
  localStorage.setItem(marker,'1');
 }catch{}
})();
