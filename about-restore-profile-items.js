// Restore only the two requested profile subitems from the pre-resume backup.
(()=>{
 const marker='jiali-about-restore-portfolio-positioning-20261031-v1',backupKey='jiali-about-resume-import-20261031-v1-backup';
 try{
  if(localStorage.getItem(marker))return;
  const backup=JSON.parse(localStorage.getItem(backupKey)||'{}'),keys=['jiali-about-subnavigation-v1','jiali-about-subnavigation-mobile-v1'];let changed=false;
  for(const key of keys){
   const old=JSON.parse(backup[key]||backup[keys[0]]||'{}'),current=JSON.parse(localStorage.getItem(key)||'{}');
   if(!old.profile?.items||!current.profile?.items)continue;
   for(const [index,pattern]of [[2,/作品结构|Portfolio Structure/i],[3,/求职定位|Job Positioning/i]]){
    const original=old.profile.items.find(item=>pattern.test(item.name))||old.profile.items[index];
    const target=current.profile.items.findIndex(item=>pattern.test(item.name));
    if(original&&target>=0){current.profile.items[target]=JSON.parse(JSON.stringify(original));changed=true}
   }
   localStorage.setItem(key,JSON.stringify(current));
  }
  if(changed)localStorage.setItem(marker,'1');
 }catch{}
})();
