// Preview-only: keep the first-screen body clear of its title on short desktops.
// Does not write localStorage, change copy, change typography, or move PORTFOLIO.
(()=>{
 if(!/\/(case-chatcut|case-nitunxiang)\.html$/.test(location.pathname))return;
 const body=document.querySelector('#caseBody'),title=document.querySelector('#caseTitle');
 if(!body||!title)return;
 const original={value:body.style.getPropertyValue('translate'),priority:body.style.getPropertyPriority('translate')};
 let applied=0,frame=0;
 function restore(){if(!applied)return;if(original.value)body.style.setProperty('translate',original.value,original.priority);else body.style.removeProperty('translate');applied=0;}
 function ink(node){const range=document.createRange();range.selectNodeContents(node);return range.getBoundingClientRect();}
 function fit(){
  frame=0;
  if(matchMedia('(max-width:700px)').matches||!body.textContent.trim()){restore();return;}
  const t=ink(title),b=ink(body);
  const naturalTop=b.top-applied,naturalBottom=b.bottom-applied;
  const gap=naturalTop-t.bottom;
  if(gap>=0){restore();return;}
  // Prefer a 32px text gap; retain 20px above the existing bottom navigation.
  const footer=document.querySelector('.case01-shortcuts');
  const limit=footer?footer.getBoundingClientRect().top:innerHeight-25;
  const wanted=32-gap,available=Math.max(0,limit-20-naturalBottom);
  const shift=Math.min(wanted,available);
  if(shift<=0){restore();return;}
  const value=Math.round(shift*100)/100;
  if(Math.abs(value-applied)>.05){body.style.setProperty('translate',`0px ${value}px`,'important');applied=value;}
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(fit);}
 new ResizeObserver(schedule).observe(title);
 new ResizeObserver(schedule).observe(body);
 new MutationObserver(schedule).observe(body,{subtree:true,childList:true,characterData:true});
 addEventListener('resize',schedule);
 document.fonts.ready.then(schedule);
 schedule();
})();
