import{l as C,r as u,m as d,a as m,D as j,S as R,j as r,n as B,B as M,M as O}from"./index-f50a7ad4.js";import"./index-862429a3.js";import"./index-f26404de.js";/* empty css              */import"./index-4a89bbe3.js";import{T as s}from"./index-13195c7d.js";import"./index-6dc1a68d.js";import{n as y}from"./index.browser-7e542916.js";import{I as v}from"./image-15044190.js";const H=n=>C.get("/api/order/details",{params:n}),_=n=>C.post("/api/transfer/batch",n);function $({data:n,onClose:f}){const S=[{title:"客户",dataIndex:"order.customer.name"},{title:"品名",dataIndex:"categoryName"},{title:"款号",dataIndex:"style.styleCode"},{title:"图片",render:(a,e)=>{var t,o;return r(v,{src:(o=(t=e==null?void 0:e.style)==null?void 0:t.realitySrc[0])==null?void 0:o.url})}},{title:"件重",dataIndex:"singleWeight"},{title:"圈号",dataIndex:"circle"},{title:"合计",dataIndex:"typeCount"}],[p,h]=u.useState([]),[x,b]=u.useState([]),[k,w]=u.useState([]),[i,E]=u.useState(100);u.useEffect(()=>{const a=d.groupBy(n,t=>`${t.category}-${t.singleWeight}-${t.circle}-${t.order.customer.name}`),e=Object.keys(a).map(t=>{const o=a[t];let c=0;return o.forEach(l=>c+=l.quantity),{key:y(),...o[0],typeCount:c}});console.log(e),h(e)},[]);async function I(){L()}function T(a){return m(s.Summary.Row,{children:[r(s.Summary.Cell,{children:"总计"}),r(s.Summary.Cell,{}),r(s.Summary.Cell,{}),r(s.Summary.Cell,{}),r(s.Summary.Cell,{}),r(s.Summary.Cell,{}),r(s.Summary.Cell,{children:a.reduce((e,t)=>e+t.typeCount,0)})]})}const D=()=>{const a=d.cloneDeep(p);a.forEach(t=>{const o=Math.floor(t.typeCount/i),c=Math.floor(t.typeCount%i),l=[];if(t.children=[],o===0)l.push({...t,key:y()});else{for(let g=0;g<o;g++)l.push({...t,typeCount:i,key:y()});c!==0&&l.push({...t,typeCount:c,key:y()})}t.children=l});const e=[];a.forEach(t=>t.children.forEach(o=>{e.push(o)})),b(e),w(a.map(t=>t.key)),h(a)},L=()=>{const a=d.cloneDeep(x);a.forEach(e=>{delete e.id,delete e.key,delete e.order,delete e.unitPrice,delete e.totalPrice,delete e.totalWeight,delete e.typeCount,delete e.children,delete e.imgSrc,delete e.style,delete e.category,delete e.categoryName}),_({orderDetails:n,transfers:a}).then(()=>{O.success("生成流程单成功！"),f()})};return m(j,{height:"100%",placement:"bottom",title:"生产单",visible:!0,onOk:I,autoFocus:!1,focusLock:!1,onCancel:f,children:[m(R,{style:{marginBottom:10},children:[r(B,{min:0,value:i,onChange:a=>{E(a)},style:{width:160}}),r(M,{type:"primary",onClick:D,children:"分单"})]}),p.length>0&&r(s,{summary:T,rowKey:"key",pagination:!1,expandedRowKeys:k,columns:S,data:d.sortBy(p,["category","customerId"]),defaultExpandAllRows:!0,indentSize:60,border:!0,borderCell:!0})]})}const J=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));export{$ as A,H as g,J as i};
