import{R as C,r as m,I as N,j as o,_ as j,d as v,e as P,a as R,S as k,B as T,T as D,i as W,h as _,g as q}from"./index-2fe9f87b.js";import"./index-ed7d1e53.js";import{C as A}from"./index-ed740d17.js";import"./index-051f16ed.js";/* empty css              */import"./index-99f088e0.js";import{T as B}from"./index-18b86337.js";import"./index-a8984739.js";import{S as E,s as y}from"./form-7313eef0.js";import{g as F,A as K}from"./index-35eb4e14.js";import{I as V}from"./image-d5b95c01.js";import"./select-view-e3752154.js";import"./index-26e1abb8.js";import"./common-26ce2b19.js";import"./index-5c024e38.js";import"./index.browser-7e542916.js";function w(a,c){var i=Object.keys(a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(a);c&&(s=s.filter(function(l){return Object.getOwnPropertyDescriptor(a,l).enumerable})),i.push.apply(i,s)}return i}function x(a){for(var c=1;c<arguments.length;c++){var i=arguments[c]!=null?arguments[c]:{};c%2?w(Object(i),!0).forEach(function(s){j(a,s,i[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(i)):w(Object(i)).forEach(function(s){Object.defineProperty(a,s,Object.getOwnPropertyDescriptor(i,s))})}return a}function H(a,c){var i=m.useContext(N),s=i.prefixCls,l=s===void 0?"arco":s,h=a.spin,u=a.className,d=x(x({"aria-hidden":!0,focusable:!1,ref:c},a),{},{className:"".concat(u?u+" ":"").concat(l,"-icon ").concat(l,"-icon-shrink")});return h&&(d.className="".concat(d.className," ").concat(l,"-icon-loading")),delete d.spin,delete d.isIcon,o("svg",{fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48",...d,children:o("path",{d:"M20 44V29c0-.552-.444-1-.996-1H4M28 4v15c0 .552.444 1 .996 1H44"})})}var p=C.forwardRef(H);p.defaultProps={isIcon:!0};p.displayName="IconShrink";const L=p,{Title:M}=D;function ie(){const[a,c]=m.useState(!1),[i,s]=m.useState([]),[l,h]=m.useState([]),[u,d]=m.useState({}),{data:S,loading:b,run:g}=v(()=>F({status:0,...u})),f=m.useRef(null),I=[{title:"客户",dataIndex:"order.customer.name",width:100,align:"center",filterIcon:o(W,{}),filterDropdown:({filterKeys:e,setFilterKeys:t,confirm:r})=>o("div",{className:y["arco-table-custom-filter"],children:o(_.Search,{ref:f,searchButton:!0,placeholder:"Please enter name",value:e[0]||"",onChange:n=>{t(n?[n]:[])},onSearch:()=>{r()}})}),onFilter:(e,t)=>e?t.order.customer.name.indexOf(e)!==-1:!0,onFilterDropdownVisibleChange:e=>{e&&setTimeout(()=>f.current.focus(),150)},sorter:(e,t)=>{var r,n;return((r=e.order.customer.name)==null?void 0:r.length)-((n=t.order.customer.name)==null?void 0:n.length)}},{title:"单号",dataIndex:"order.orderNumber",width:100,align:"center",sorter:(e,t)=>{var r;return e.order.orderNumber.length-((r=t.order.orderNumber)==null?void 0:r.length)}},{title:"款号",dataIndex:"style.styleCode",width:100,align:"center",sorter:(e,t)=>{var r,n;return((r=e.style.styleCode)==null?void 0:r.length)-((n=t.style.styleCode)==null?void 0:n.length)}},{title:"图片",width:100,align:"center",render:(e,t)=>{var r,n;return o(V,{src:(n=(r=t==null?void 0:t.style)==null?void 0:r.realitySrc[0])==null?void 0:n.url})}},{title:"规格",dataIndex:"style.specName",width:100,align:"center",sorter:(e,t)=>{var r,n;return((r=e.style.specName)==null?void 0:r.length)-((n=t.style.specName)==null?void 0:n.length)}},{title:"品名",dataIndex:"categoryName",width:100,align:"center",sorter:(e,t)=>{var r,n;return((r=e.categoryName)==null?void 0:r.length)-((n=t.categoryName)==null?void 0:n.length)}},{title:"圈号",dataIndex:"circle",width:100,align:"center",sorter:(e,t)=>e.circle-t.circle},{title:"件重",dataIndex:"singleWeight",width:100,align:"center",sorter:(e,t)=>e.singleWeight-t.singleWeight},{title:"数量",dataIndex:"quantity",width:100,align:"center",sorter:(e,t)=>e.quantity-t.quantity},{title:"合计",dataIndex:"totalWeight",width:100,align:"center",sorter:(e,t)=>e.totalWeight-t.totalWeight}];P(async()=>{g()},[JSON.stringify(u)]);function O(e){d({...e,unixTime:q().unix()})}return R(A,{children:[o(M,{heading:6,children:"排单"}),o(E,{onSearch:O}),o("div",{className:y["button-group"],children:o(k,{children:o(T,{type:"primary",icon:o(L,{}),onClick:()=>c(!0),children:"排单"})})}),o(B,{rowKey:"id",loading:b,pagination:!1,columns:I,data:S,rowSelection:{type:"checkbox",selectedRowKeys:i,onChange:(e,t)=>{s(e),h(t)}}}),a&&o(K,{data:l,onClose:()=>{c(!1),g()}})]})}export{ie as default};