// One-time repair: remove the automatic mobile break that overrode the user's edit.
(()=>{
 const marker='jiali-about-stop-forced-experience-break-20261101-v1';
 const key='jiali-about-subnavigation-mobile-v1';
 try{
  if(localStorage.getItem(marker))return;
  const raw=localStorage.getItem(key);
  if(raw){
   const data=JSON.parse(raw);let changed=false;
   for(const item of data.profile?.items||[]){
    if(typeof item.body!=='string')continue;
    const updated=item.body.replace(/(具有设计品牌[^。]*视觉与创意实践及)[ \t]*\r?\n[ \t]*(AI\s*创作经验。)/g,'$1 $2');
    if(updated!==item.body){item.body=updated;changed=true;}
   }
   if(changed){localStorage.setItem(key+'-before-forced-break-repair',raw);localStorage.setItem(key,JSON.stringify(data));}
  }
  localStorage.setItem(marker,'1');
 }catch{}
})();
