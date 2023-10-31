import{F as T,G as j,d as w,l as L,r as s,g as R,a as c,S as q,j as t,B as D,h as C,m as O,p as Y,D as _,n as V,M as z}from"./index-2fe9f87b.js";import{U as H}from"./index-a3018368.js";import"./index-ed7d1e53.js";import{D as J}from"./index-46012c63.js";import"./index-051f16ed.js";/* empty css              */import{S as o}from"./index-99f088e0.js";import{g as K,u as X,a as Z}from"./service-735e5b75.js";import{b as $}from"./service-1a26ac09.js";import ee from"./editableTable-b4514282.js";import{b as N,v as te}from"./common-26ce2b19.js";import{n as I}from"./index.browser-7e542916.js";import"./index-36185895.js";import"./index-6b64cf7e.js";import"./index-18b86337.js";import"./index-a8984739.js";import"./select-view-e3752154.js";import"./index-26e1abb8.js";import"./pictureUpload-b2c3a753.js";import"./rotate-c57d4b9d.js";import"./service-39d851c5.js";import"./findStyle-b646b788.js";import"./StyleFilter-967f201e.js";import"./index-1c0548d1.js";import"./scrollIntoView-eed899c1.js";import"./index-ed740d17.js";import"./form-de005383.js";import"./service-82e768f3.js";import"./index-5c024e38.js";import"./constants-filter-c5ec6bba.js";import"./image-d5b95c01.js";import"./edit-aacc2711.js";import"./index-e5c443e4.js";import"./mobileFilter-588aaca9.js";const p=T.Item,ae=j.Row,u=j.Col;function je({data:n,onClose:S}){const[d]=T.useForm(),{data:F}=w($),{data:f,loading:B}=w(()=>n.id&&K(n.id)),{data:m}=w(()=>L("FONT_PRINT")),{data:b}=w(()=>L("CATEGORY")),[U,k]=s.useState(!1),[h,g]=s.useState([]),[x,E]=s.useState([]),[i,v]=s.useState({type:"category",value:""}),W=()=>{let e=0,r=0;h.forEach(l=>{e+=Number(l==null?void 0:l.totalWeight),r+=Number(l==null?void 0:l.quantity)}),d.setFieldValue("orderTotalWeight",Number(e.toFixed(2))),d.setFieldValue("orderTotalQuantity",Number(r.toFixed(2)))};s.useEffect(()=>{n.id&&d.setFieldsValue({orderDate:R().format()})},[]),s.useEffect(()=>{f==null||f.forEach(e=>e.nanoid=I()),f&&g(f)},[f]),s.useEffect(()=>{W()},[h]);async function G(){try{await d.validate();const e=d.getFieldsValue();e.charactersId&&(e.charactersTitle=m==null?void 0:m.find(a=>a.id===e.charactersId).title);const r=V.cloneDeep(h);r.forEach(a=>{a.orderId=n.id,delete a.nanoid,delete a.style});const l={orderData:e,orderDetailData:r};k(!0),n.id?await X(n.id,l):await Z(l),z.success("提交成功 !"),S()}catch{}finally{k(!1)}}const[M,Q]=s.useState([]),A=()=>{const{type:e,value:r}=i,l=V.cloneDeep(h);l.forEach(a=>{x.find(y=>y.nanoid===a.nanoid)&&(a[e]=r,e==="category"&&(a.categoryName=b.find(y=>y.key===r).title),(e==="quantity"||e==="singleWeight")&&(a.totalWeight=a.quantity&&a.singleWeight&&Number((Number(a.quantity)*Number(a.singleWeight)).toFixed(2))),W())}),g(l)},P=c("div",{style:{display:"flex",justifyContent:"space-between"},children:[c(q,{children:[t(D,{type:"primary",onClick:()=>g([...h,{nanoid:I()}]),children:"新增"}),t(H,{multiple:!0,fileList:M,action:"/api/picture/upload",showUploadList:!1,onChange:e=>{if(e.filter(a=>a.status==="done").length!==e.length)return;const l=e.map(a=>{var y;return{imgSrc:(y=a==null?void 0:a.response)==null?void 0:y.src,nanoid:I(),category:"DEFAULT"}});E(l),g([...h,...l]),Q([])}}),c("div",{style:{display:"flex"},children:[c(o,{value:i.type,showSearch:!0,placeholder:"请选择列",style:{marginRight:10,width:100},onChange:e=>v({type:e,value:""}),children:[t(o.Option,{value:"category",children:"品名"}),t(o.Option,{value:"circle",children:"圈号"}),t(o.Option,{value:"singleWeight",children:"件重"}),t(o.Option,{value:"quantity",children:"数量"})]}),i.type==="category"&&t(o,{placeholder:"请选择品名",style:{width:160},value:i.value,showSearch:!0,filterOption:N,onChange:e=>v({type:i.type,value:e}),children:b==null?void 0:b.map(e=>t(o.Option,{value:e.key,children:e.title},e.id))}),i.type==="circle"&&t(C,{value:i.value,placeholder:"值",style:{width:160},onChange:e=>v({type:i.type,value:e})}),i.type!=="circle"&&i.type!=="category"&&t(O,{value:i.value,placeholder:"值",style:{width:160},onChange:e=>v({type:i.type,value:e})}),t(D,{type:"primary",onClick:()=>A(),children:"分配"})]})]}),c(q,{children:[t(D,{onClick:S,children:"取消"}),t(D,{type:"primary",onClick:G,children:"确定"})]})]});return t(Y,{tip:"加载中...",loading:B,children:c(_,{height:"100%",placement:"bottom",title:n.id?"编辑":"新增",visible:!0,footer:P,autoFocus:!1,focusLock:!1,onCancel:S,confirmLoading:U,children:[t(T,{labelCol:{span:6},wrapperCol:{span:17},form:d,initialValues:n.id&&n||{orderDate:R().toISOString()},validateMessages:te,children:c(ae,{className:"grid-demo",style:{marginBottom:16},children:[t(u,{span:6,children:t(p,{label:"客户名称",field:"customerId",rules:[{required:!0}],children:t(o,{placeholder:"请选择",allowClear:!0,showSearch:!0,filterOption:N,children:F==null?void 0:F.map(e=>t(o.Option,{value:e.id,children:e.name},e.id))})})}),t(u,{span:6,children:t(p,{label:"订单号",field:"orderNumber",children:t(C,{placeholder:"请输入订单号"})})}),c(u,{span:6,children:[t(p,{label:"字印",field:"fontPrint",children:t(o,{placeholder:"请选择",allowClear:!0,showSearch:!0,filterOption:N,onChange:(e,r)=>{d.setFieldValue("fontPrintName","children"in r?r==null?void 0:r.children:"")},children:m==null?void 0:m.map(e=>t(o.Option,{value:e.key,children:e.title},e.id))})}),t(p,{hidden:!0,label:"字印",field:"fontPrintName",children:t(C,{placeholder:"请输入字印",disabled:!0})})]}),t(u,{span:6,children:t(p,{label:"下单日期",field:"orderDate",children:t(J,{onChange:(e,r)=>d.setFieldValue("orderDate",r.toISOString()),placeholder:"请选择下单日期",style:{width:"100%"}})})}),t(u,{span:6,children:t(p,{label:"备注",field:"remark",children:t(C,{placeholder:"请输入备注"})})}),t(u,{span:6,children:t(p,{label:"总件数",field:"orderTotalQuantity",disabled:!0,children:t(O,{placeholder:"总件数"})})}),t(u,{span:6,children:t(p,{label:"总重",field:"orderTotalWeight",disabled:!0,children:t(O,{placeholder:"总重"})})})]})}),t(ee,{detailData:h,selectedRow:x,setDetailData:g,setSelectedRow:E})]})})}export{je as default};
