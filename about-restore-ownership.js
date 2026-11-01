// Restore only the omitted responsibilities in the capability Ownership paragraph.
(()=>{
 const marker='jiali-about-restore-ownership-responsibilities-20261101-v1';
 try{
  if(localStorage.getItem(marker))return;
  for(const key of ['jiali-about-subnavigation-v1','jiali-about-subnavigation-mobile-v1']){
   const raw=localStorage.getItem(key);if(!raw)continue;const data=JSON.parse(raw);
   const item=data.profile?.items?.find(item=>/能力结构|Competency Structure/i.test(item.name));if(!item||typeof item.body!=='string')continue;
   if(!/Ownership/i.test(item.body))continue;
   const split=item.body.search(/业务判断与项目\s*Ownership/i);if(split<0)continue;
   const before=item.body.slice(0,split),section=item.body.slice(split);
   if(/主导品牌建设/.test(section))continue;
   const updated=section.replace(/具有品牌创始人经验([，,])/,'具有品牌创始人经验$1主导品牌建设、产品规划、研发生产、传播及渠道商业化，');
   if(updated!==section){localStorage.setItem(key+'-before-ownership-restore',raw);item.body=before+updated;localStorage.setItem(key,JSON.stringify(data))}
  }
  localStorage.setItem(marker,'1');
 }catch{}
})();
