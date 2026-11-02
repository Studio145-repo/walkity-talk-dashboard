/* ECharts charts. Uses data/live.json values only (strings like "1,386" parsed as-is, no maths on them). */
(function(){
const done=()=>{const l=document.getElementById('wtl');if(l)l.classList.add('done')};
if(!window.echarts){done();return;}
const css=k=>getComputedStyle(document.documentElement).getPropertyValue(k).trim();
const N=v=>typeof v==='number'?v:Number(String(v).replace(/,/g,''));
const charts=[];
function mk(afterId,id,h,opt){const a=document.getElementById(afterId);if(!a)return;const d=document.createElement('div');d.id=id;d.className='echart';d.style.cssText='width:100%;height:'+h+'px;margin:12px 0';a.insertAdjacentElement('afterend',d);const c=echarts.init(d,null,{renderer:'svg'});c.setOption(opt());charts.push([c,opt]);}
const base=()=>({color:[css('--acc')||'#B01E23','#8a8a8a','#000'],textStyle:{color:css('--tx'),fontFamily:'inherit'},tooltip:{trigger:'axis'},grid:{left:40,right:16,top:28,bottom:40,containLabel:true},legend:{textStyle:{color:css('--mut')}}});
const ax=()=>({axisLine:{lineStyle:{color:css('--line')}},axisLabel:{color:css('--mut')},splitLine:{lineStyle:{color:css('--line')}}});
fetch('data/live.json?v=4').then(r=>r.json()).then(L=>{
 const T=L.traffic||[];
 if(T.length){const sv=document.getElementById('tchart');
  mk('tchart','ec-traffic',260,()=>Object.assign(base(),{xAxis:Object.assign({type:'category',data:T.map(r=>r.date)},ax()),yAxis:Object.assign({type:'value'},ax()),dataZoom:[{type:'inside'}],series:[{name:'Sessions',type:'line',smooth:false,showSymbol:false,data:T.map(r=>r.visits)},{name:'Unique visitors',type:'line',showSymbol:false,data:T.map(r=>r.unique)}]}));
  if(sv&&document.getElementById('ec-traffic'))sv.style.display='none';}
 const S=(L.sources||[]).filter(s=>s.window==='90d');
 if(S.length)mk('src','ec-sources',Math.max(160,S.length*28),()=>Object.assign(base(),{tooltip:{trigger:'item'},xAxis:Object.assign({type:'value'},ax()),yAxis:Object.assign({type:'category',inverse:true,data:S.map(s=>s.source)},ax()),series:[{name:'Sessions (90d)',type:'bar',data:S.map(s=>s.sessions),label:{show:true,position:'right',color:css('--tx')}}]}));
 const C=(L.content||[]).slice().sort((a,b)=>a.date<b.date?-1:1);
 const cAnchor=document.querySelector('#content .sub');
 if(C.length&&cAnchor){cAnchor.id=cAnchor.id||'csub';mk(cAnchor.id,'ec-content',260,()=>Object.assign(base(),{tooltip:{trigger:'axis',formatter:p=>{const r=C[p[0].dataIndex];return r.date+'<br>'+r.post+'<br>Views '+r.views+' · RR '+r.rr}},xAxis:Object.assign({type:'category',data:C.map(r=>r.date)},ax()),yAxis:[Object.assign({type:'value',name:'Views'},ax()),Object.assign({type:'value',name:'RR v2'},ax())],series:[{name:'Views',type:'bar',data:C.map(r=>r.views)},{name:'RR v2',type:'line',yAxisIndex:1,data:C.map(r=>r.rr)}]}));}
 const G=(L.ga4&&L.ga4.channels)||[];
 if(G.length){const sites=[...new Set(G.map(g=>g.site))],chs=[...new Set(G.map(g=>g.channel))];
  mk('wch','ec-ga4',Math.max(200,chs.length*30),()=>Object.assign(base(),{xAxis:Object.assign({type:'value'},ax()),yAxis:Object.assign({type:'category',inverse:true,data:chs},ax()),series:sites.map(s=>({name:s+' sessions',type:'bar',data:chs.map(c=>{const r=G.find(g=>g.site===s&&g.channel===c);return r?N(r.sessions):null})}))}));}
 window.addEventListener('resize',()=>charts.forEach(([c])=>c.resize()));
 new MutationObserver(()=>charts.forEach(([c,o])=>c.setOption(o()))).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
done();
}).catch(e=>{done();console.error('charts',e)});
})();
