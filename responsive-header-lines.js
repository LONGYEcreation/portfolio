// Preview only: requested narrow-header line breaks and CASE03 title break.
(()=>{
 const media=matchMedia('(max-width:430px)'),path=location.pathname;
 const isVisual=/\/(case04-v3|case05|case06)\.html$/.test(path),is03=/\/case03-nitunxiang\.html$/.test(path);
 const isProduct=/\/(case-chatcut|case-nitunxiang|case03-nitunxiang)\.html$/.test(path);
 if(!isVisual&&!isProduct)return;
 const left=document.querySelector('header>.corner:not(.right)'),labels=(isVisual||isProduct)?[...left.children]:[];
 const title=is03?document.querySelector('#case03Title'):null;
 const originalLabels=labels.map(n=>[...n.childNodes].map(x=>x.cloneNode(true))),originalTitle=title?[...title.childNodes].map(x=>x.cloneNode(true)):null;
 const style=document.createElement('style');style.textContent='@media(max-width:430px){html.narrow-visual-label-lines header>.corner:not(.right)>span{white-space:pre-wrap!important;overflow-wrap:normal!important}html.narrow-visual-label-lines header>.corner:not(.right) .visual-header-mobile-break{display:block!important}html.narrow-case03-title-lines #case03Title{white-space:pre-wrap!important}}';document.head.append(style);
 function apply(){
  document.documentElement.classList.toggle('narrow-visual-label-lines',(isVisual||isProduct)&&media.matches);
  document.documentElement.classList.toggle('narrow-case03-title-lines',is03&&media.matches);
  if(isVisual||isProduct){if(media.matches){labels[0].textContent=isVisual?'AESTHETIC JUDGMENT\n& VISUAL SYSTEMS':'PRODUCT THINKING\n& AI BUILDING';const br=document.createElement('br');br.className='visual-header-mobile-break';labels[1].replaceChildren(document.createTextNode(isVisual?'○ BRAND & VISUAL ':'○ AI PRODUCT '),br,document.createTextNode(isVisual?'CONSTRUCTION':'FUNDAMENTALS'));}else labels.forEach((n,i)=>n.replaceChildren(...originalLabels[i].map(x=>x.cloneNode(true))));}
  if(title){if(media.matches)title.textContent='泥吞象\nAI编程实践与产品推演';else title.replaceChildren(...originalTitle.map(n=>n.cloneNode(true)));}
 }
 apply();media.addEventListener('change',apply);
})();
