// Return the skills navigation to AI tools and design tools on both viewports.
(()=>{
 const marker='jiali-about-restore-tools-two-groups-20261031-v1';
 try{if(localStorage.getItem(marker))return;for(const key of ['jiali-about-subnavigation-v1','jiali-about-subnavigation-mobile-v1']){
  const data=JSON.parse(localStorage.getItem(key)||'{}');if(!data.now)continue;
  localStorage.setItem(key+'-before-tools-restore',JSON.stringify(data.now));
  data.now={active:0,items:[{name:'AI工具 AI Tools',body:'ChatGPT · Codex · Recraft · TapNow'},{name:'设计工具 Design Tools',body:'Photoshop · Illustrator · InDesign\nAfter Effects · Lightroom · Final Cut Pro'}]};localStorage.setItem(key,JSON.stringify(data));
 }localStorage.setItem(marker,'1')}catch{}
})();
