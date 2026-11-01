(()=>{
const map=document.querySelector('svg.map');if(!map)return;
const ns='http://www.w3.org/2000/svg';
function el(tag,attrs,parent){const node=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,value);parent?.append(node);return node}
const details=el('svg',{class:'overview-details',viewBox:'0 0 1400 720',role:'group','aria-label':'项目页面细分内容'});map.after(details);
const style=document.createElement('style');style.textContent='.overview-details{display:block;height:auto;margin-left:auto;margin-right:auto;overflow:visible}.overview-details rect{fill:#fff;stroke:#111;stroke-width:1.1}.overview-details .wire{fill:none;stroke:#777;stroke-width:.65;stroke-dasharray:3 5}.overview-details text{fill:#111;font-family:Latin,CJK,serif;text-anchor:middle;dominant-baseline:central;font-size:16px;font-weight:400}.overview-details a:hover rect,.overview-details a:focus-visible rect{fill:#111}.overview-details a:hover text,.overview-details a:focus-visible text{fill:#fff}@media(max-width:700px){.overview-details{display:none}}';document.head.append(style);
function branch(x,width,rows,href,projectIndex){
const mobileProject=document.querySelector('.mobile-map [data-project="'+(projectIndex??(x===20?'0':'2'))+'"]');
if(mobileProject){
const list=document.createElement('div');list.className='mobile-project-details';list.setAttribute('aria-label',(projectIndex===3?'品牌视觉体系构建':x===20?'ChatCut 优化洞察':'泥吞象品牌官网')+'细分内容');
rows.forEach(([label,sub],i)=>{const link=document.createElement('a');link.href=href;const title=document.createElement('span');title.className='title';title.textContent=label;link.append(title);window.registerOverviewText?.(title,href+'|detail-'+i+'|title');if(sub){const caption=document.createElement('small');caption.className='sub';caption.textContent=sub;link.append(caption);window.registerOverviewText?.(caption,href+'|detail-'+i+'|sub')}list.append(link)});
mobileProject.after(list);
}
const center=x+width/2;el('path',{class:'wire',d:`M${center} 0V28H${x+12}V${44+(rows.length-1)*112+32}`},details);
rows.forEach((row,i)=>{
const y=44+i*112;el('path',{class:'wire',d:`M${x+12} ${y+32}H${x+24}`},details);
const a=el('a',{href},details);el('rect',{x:x+24,y,width:width-36,height:64},a);
const frame=el('foreignObject',{x:x+24,y,width:width-36,height:64},a);
const group=document.createElementNS('http://www.w3.org/1999/xhtml','div');group.className='detail-label-group';frame.append(group);
for(const [part,copy] of [['title',row[0]],['sub',row[1]]]){if(!copy)continue;const text=document.createElementNS('http://www.w3.org/1999/xhtml','span');text.className=part;text.textContent=copy;group.append(text);window.registerOverviewText?.(text,href+'|detail-'+i+'|'+part)}
});
}branch(20,226.666667,[['产品价值传达','当下价值 · 未来价值'],['交互体验门槛','功能寻找 · 功能理解'],['用户预期管理','成本预期 · 效果预期'],['成片局部编辑','AI 生成 · 人工操作']], 'case-chatcut.html');
branch(473.333333,226.666667,[['问题验证','业务需求'],['解法可行性验证','工作流对比'],['产品验证','可复用工作流 · 产品化判断'],['商品验证','供给评估 · 需求评估'],['产品假设'],['商品假设']], 'case03-nitunxiang.html');
branch(700,226.666667,[['品牌内核','器物 · 自然 · 文化意象'],['视觉规则','色彩结构 · 材质表达 · 光影秩序'],['创意落地','产品影像 · 系列海报'],['器物视觉','叠放组合 · 日常意象'],['品牌／产品手册','信息层级 · 产品体系'],['详情页／寄售','产品说明 · 场景与触点']], 'case04-v3.html',3);
const mobileStyle=document.createElement('style');mobileStyle.textContent='.mobile-project-details{position:relative;display:grid;gap:12px;border-left:0;margin-left:15.5px;margin-right:15.5px;padding-left:0}.mobile-project-details:before{content:"";position:absolute;top:0;bottom:0;left:-18.5px;border-left:1px dashed #aaa;pointer-events:none}.mobile-project-details>a{height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid #555;padding:0 8px;font-size:16px;text-align:center}';document.head.append(mobileStyle);
const detailTypeStyle=document.createElement('style');detailTypeStyle.textContent='.detail-label-group{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;text-align:center;color:#111;font-family:Latin,CJK,serif}.detail-label-group .title,.mobile-project-details .title{font-size:13px;font-weight:500;line-height:1.35;margin:0;padding:0}.detail-label-group .sub,.mobile-map .mobile-project-details .sub{display:block;font-size:10px;font-weight:400;line-height:1.3;margin:0;padding:0}.overview-details a:hover .detail-label-group,.overview-details a:focus-visible .detail-label-group{color:#fff}@media(max-width:700px){.mobile-project-details>a>.title,.mobile-project-details>a>.sub{position:relative;top:1px}}';document.head.append(detailTypeStyle);
function fit(){const r=map.getBoundingClientRect(),scale=Math.min(r.width/1400,r.height/720);details.style.width=(1400*scale)+'px';details.style.marginTop=(-(r.height-720*scale)/2-55*scale)+'px'}
new ResizeObserver(fit).observe(map);document.fonts.ready.then(fit);fit();
})();