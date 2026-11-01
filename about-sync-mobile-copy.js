// One-time mobile-to-desktop copy sync; desktop manual line breaks remain independent.
(()=>{
 const marker='jiali-about-sync-mobile-copy-20261101-v1',desktopKey='jiali-about-subnavigation-v1',mobileKey='jiali-about-subnavigation-mobile-v1';
 function keepBreaks(previous,incoming){
  const old=Array.from(previous.replace(/\r\n?/g,'\n')),next=Array.from(incoming.replace(/\r\n?/g,'\n')).filter(c=>c!=='\n'),flat=[],breaks=[];
  for(const c of old){if(c==='\n')breaks.push(flat.length);else flat.push(c)}
  if(!breaks.length)return next.join('');if(flat.join('')===next.join(''))return previous;
  const n=flat.length,m=next.length,rows=Array.from({length:n+1},()=>new Uint16Array(m+1));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)rows[i][j]=flat[i]===next[j]?rows[i+1][j+1]+1:Math.max(rows[i+1][j],rows[i][j+1]);
  const map=new Map();let i=0,j=0;while(i<n&&j<m){if(flat[i]===next[j]){map.set(i,j);i++;j++}else if(rows[i+1][j]>=rows[i][j+1])i++;else j++}
  const positions=new Map();for(const at of breaks){let mapped;if(at===0)mapped=0;else if(at===n)mapped=m;else if(map.has(at))mapped=map.get(at);else{let before=at-1;while(before>=0&&!map.has(before))before--;let after=at;while(after<n&&!map.has(after))after++;mapped=after<n?map.get(after):before>=0?map.get(before)+1:Math.min(at,m)}positions.set(mapped,(positions.get(mapped)||0)+1)}
  let result='';for(let k=0;k<=m;k++){result+='\n'.repeat(positions.get(k)||0);if(k<m)result+=next[k]}return result;
 }
 window.aboutKeepIndependentBreaks=keepBreaks;
 try{
  if(localStorage.getItem(marker))return;
  const mobileRaw=localStorage.getItem(mobileKey),desktopRaw=localStorage.getItem(desktopKey);if(!mobileRaw||!desktopRaw)return;
  const mobile=JSON.parse(mobileRaw),desktop=JSON.parse(desktopRaw);
  localStorage.setItem(marker+'-backup',JSON.stringify({desktop:desktopRaw,mobile:mobileRaw}));
  for(const [key,group]of Object.entries(mobile)){if(!Array.isArray(group.items))continue;const old=desktop[key]||{active:0,items:[]};desktop[key]={...old,items:group.items.map((item,index)=>{const prior=old.items[index];return {...item,name:prior?keepBreaks(prior.name||'',item.name||''):item.name,body:prior?keepBreaks(prior.body||'',item.body||''):item.body}})};desktop[key].active=Math.min(old.active||0,Math.max(0,group.items.length-1))}
  localStorage.setItem(desktopKey,JSON.stringify(desktop));localStorage.setItem(marker,'1');
 }catch{}
})();
