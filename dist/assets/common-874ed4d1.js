const c={required:(e,{label:n})=>`必须填写${n}`,string:{length:"字符数必须是 #{length}",match:"不匹配正则 #{pattern}"},number:{min:"最小值为 #{min}",max:"最大值为 #{max}"}},m=(e,n)=>n.props.children.indexOf(e)>=0,p=(e,n)=>{var r,t,s,a,i,l;e[n]=((r=e[n])==null?void 0:r.length)>0?[{uid:(t=e[n][0])==null?void 0:t.uid,name:(s=e[n][0])==null?void 0:s.name,url:((i=(a=e[n][0])==null?void 0:a.response)==null?void 0:i.src)||((l=e[n][0])==null?void 0:l.url)}]:[]};export{m as f,p,c as v};
