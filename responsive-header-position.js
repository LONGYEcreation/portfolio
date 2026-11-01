// Preview only. Explicitly approved scope: center PORTFOLIO on narrow widths; retain typography.
(()=>{
 const header=document.querySelector('header'),brand=header?.querySelector('.brand');
 const corners=[...header?.querySelectorAll(':scope>.corner')||[]];
 if(!header||!brand||corners.length!==2)return;
 let case03Style=null;
 if(header.classList.contains('case03-header')){
  const style=document.createElement('style');style.textContent="@media(max-width:430px){header.case03-header>.corner:first-child{line-height:1.4!important;letter-spacing:.05em!important;gap:5px!important}header.case03-header>.corner.right{line-height:1.4!important;gap:5px!important;margin-top:2px!important}header.case03-header .preview-case03-circle{font-family:'Big Caslon',Baskerville,'Times New Roman',serif!important;font-size:.65em!important;line-height:1!important;vertical-align:.1em!important;font-weight:400!important}}";document.head.append(style);case03Style=style;case03Style.disabled=true;
  const label=corners[0].lastElementChild,first=label?.firstChild;
  if(first?.nodeType===3&&first.nodeValue.startsWith('○')){const mark=document.createElement('span');mark.className='preview-case03-circle';mark.textContent='○';first.nodeValue=first.nodeValue.slice(1);label.insertBefore(mark,first);}
 }

 const properties=['width','min-width','max-width','translate'];
 const originalCorners=corners.map(n=>Object.fromEntries(properties.map(p=>[p,[n.style.getPropertyValue(p),n.style.getPropertyPriority(p)]])));
 const originalHeader=Object.fromEntries(['height','grid-template-columns'].map(p=>[p,[header.style.getPropertyValue(p),header.style.getPropertyPriority(p)]]));
 const originalBrandTranslate=[brand.style.getPropertyValue('translate'),brand.style.getPropertyPriority('translate')];
 let frame=0,applied=false;
 function restore(){if(!applied)return;if(originalBrandTranslate[0])brand.style.setProperty('translate',originalBrandTranslate[0],originalBrandTranslate[1]);else brand.style.removeProperty('translate');corners.forEach((n,i)=>{for(const[p,[v,priority]]of Object.entries(originalCorners[i]))if(v)n.style.setProperty(p,v,priority);else n.style.removeProperty(p);});for(const[p,[v,priority]]of Object.entries(originalHeader))if(v)header.style.setProperty(p,v,priority);else header.style.removeProperty(p);applied=false;}
 function ink(n){const range=document.createRange();range.selectNodeContents(n);return range.getBoundingClientRect();}
 function fit(){
  frame=0;if(case03Style)case03Style.disabled=true;restore();
  if(!matchMedia('(max-width:430px)').matches)return;
  const naturalHeaderHeight=header.getBoundingClientRect().height;
  if(case03Style){case03Style.disabled=false;header.style.setProperty('height',naturalHeaderHeight+'px','important');applied=true;}
  const width=document.documentElement.clientWidth;
  const overflowing=corners.some(n=>{const b=ink(n);return b.right>width-10||b.left<10;});
  const currentBrand=brand.getBoundingClientRect();
  const centerShift=width/2-(currentBrand.left+currentBrand.width/2);
  if(!overflowing&&Math.abs(centerShift)<.5&&!/\/(case-chatcut|case-nitunxiang|case03-nitunxiang|case04-v3|case05|case06)\.html$/.test(location.pathname))return;
  const h=header.getBoundingClientRect(),b=brand.getBoundingClientRect(),rects=corners.map(n=>n.getBoundingClientRect());
  // Fix the current grid tracks and header height before changing corner widths.
  // This preserves brand size and all subsequent content positions; only its horizontal center changes.
  header.style.setProperty('grid-template-columns',getComputedStyle(header).gridTemplateColumns,'important');
  header.style.setProperty('height',h.height+'px','important');
  brand.style.setProperty('translate',`${centerShift}px 0px`,'important');
  const inset=14,gap=16,column=(width-inset*2-gap)/2,top=b.bottom+12;
  corners.forEach((n,i)=>{
   n.style.setProperty('width',column+'px','important');n.style.setProperty('min-width','0','important');n.style.setProperty('max-width',column+'px','important');
   const targetX=i===0?inset:width-inset-column;
   n.style.setProperty('translate',`${targetX-rects[i].left}px ${top-rects[i].top}px`,'important');
  });
  if(/\/(case-chatcut|case-nitunxiang|case03-nitunxiang|case04-v3|case05|case06)\.html$/.test(location.pathname)){
   function firstInk(n){const span=n.firstElementChild,walker=document.createTreeWalker(span,NodeFilter.SHOW_TEXT);let x;while(x=walker.nextNode()){const at=x.nodeValue.search(/\S/);if(at>=0){const r=document.createRange();r.setStart(x,at);r.setEnd(x,at+1);return r.getBoundingClientRect().top;}}return n.getBoundingClientRect().top;}
   const delta=firstInk(corners[1])-firstInk(corners[0]);
   if(Math.abs(delta)>.05){const raw=corners[0].style.getPropertyValue('translate').split(/\s+/);corners[0].style.setProperty('translate',raw[0]+' '+(parseFloat(raw[1])+delta)+'px','important');}
  }applied=true;
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(fit);}
 addEventListener('resize',schedule);document.fonts.ready.then(schedule);schedule();
})();
