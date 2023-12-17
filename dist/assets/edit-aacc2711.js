import{G as R,r as C,a as O,j as e,h as s,f as P,S as U,B as _,F as I,d as y,l as S,n as B,M as D}from"./index-2fe9f87b.js";import"./index-051f16ed.js";/* empty css              */import{S as o}from"./index-99f088e0.js";import{a as L,U as w}from"./index-a3018368.js";import"./index-ed7d1e53.js";import{M}from"./index-e5c443e4.js";import{u as x,c as j,e as q}from"./service-39d851c5.js";import{v as G,b,p as N}from"./common-26ce2b19.js";import{g as A}from"./service-82e768f3.js";import{T as V}from"./index-26e1abb8.js";import{I as H}from"./image-d5b95c01.js";import"./select-view-e3752154.js";import"./index-36185895.js";import"./index-6b64cf7e.js";const J="_tag_7226e_1",v={tag:J,"add-tag":"_add-tag_7226e_4"},$=R.Row,F=R.Col;function z({tags:a,setTags:c}){const[i,d]=C.useState(!1),[p,h]=C.useState("");function m(){p&&(a=[...a,p],c(a),h("")),d(!1)}function g(n){const u=a.filter(f=>f!==n);c(u)}return O($,{children:[a==null?void 0:a.map((n,u)=>e(F,{span:6,style:{marginBottom:10},children:e(V,{closable:u!==0,onClose:()=>g(n),className:v.tag,children:n})},n+u)),i?e(F,{span:6,children:e(s,{autoFocus:!0,size:"mini",value:p,className:v.tag,onPressEnter:m,onBlur:m,onChange:h})}):e(F,{span:6,children:e(V,{icon:e(P,{}),className:v["add-tag"],tabIndex:0,onClick:()=>d(!0),onKeyDown:n=>{(n.keyCode||n.which)===13&&d(!0)},children:"新增"})})]})}const k=(a,c)=>{if(a.length===0)return;const i=a[0],d=(i==null?void 0:i.url)||URL.createObjectURL(i==null?void 0:i.originFile);return O(U,{children:[e(H,{src:d,width:300}),e(_,{iconOnly:!0,icon:e(L,{}),status:"danger",onClick:()=>c.onRemove(i)})]})},t=I.Item;function se({data:a,onClose:c}){var T;const[i]=I.useForm(),[d,p]=C.useState([]),{data:h}=y(()=>S("CATEGORY")),{data:m}=y(()=>S("SPEC")),{data:g}=y(()=>S("TECH")),{data:n}=y(()=>A("PROGRAM"));C.useEffect(()=>{a.id&&p(JSON.parse(a.tags)||[])},[]);async function u(){await i.validate();const r=i.getFieldsValue(),l=B.cloneDeep(r);delete l.programmerCode,l.tags=JSON.stringify(d),N(l,"designSrc"),N(l,"realitySrc"),N(l,"programSrc"),a.id?await x(a.id,l):await j(l),D.success("提交成功 !"),c()}async function f(){const r=i.getFieldsValue();if(!r.programmerCode||!r.specName||!r.techName||!r.categoryName)return;const l=r.category+r.programmerCode+r.spec+r.tech,E=await q(l);i.setFieldValue("baseStyleCode",l),i.setFieldValue("styleCode",`${l}-${E.length+1}`)}return e("div",{children:e(M,{title:a.id?"编辑":"新增",visible:!0,onOk:u,autoFocus:!1,focusLock:!1,onCancel:c,children:O(I,{labelCol:{span:5},wrapperCol:{span:17},form:i,initialValues:a.id?a:{enabled:!0,breadcrumb:!0},validateMessages:G,children:[e(t,{label:"品名",field:"category",rules:[{required:!0}],children:e(o,{disabled:a.id,placeholder:"请选择品名",showSearch:!0,filterOption:b,onChange:(r,l)=>{i.setFieldValue("categoryName","children"in l?l.children:""),f()},children:h==null?void 0:h.map(r=>e(o.Option,{value:r.key,children:r.title},r.id))})}),e(t,{label:"品名",field:"categoryName",hidden:!0,children:e(s,{})}),e(t,{disabled:a.id,label:"编程",field:"programmerId",children:e(o,{placeholder:"请选择编程",showSearch:!0,filterOption:b,onChange:(r,l)=>{i.setFieldValue("programmerCode","_key"in l?l._key:""),f()},children:(T=n==null?void 0:n.users)==null?void 0:T.map(r=>e(o.Option,{value:r.id,children:r.name},r.code))})}),e(t,{label:"编程",field:"programmerCode",hidden:!0,children:e(s,{})}),e(t,{label:"规格",field:"spec",rules:[{required:!0}],children:e(o,{disabled:a.id,placeholder:"请选择规格",showSearch:!0,filterOption:b,onChange:(r,l)=>{i.setFieldValue("specName","children"in l?l.children:""),f()},children:m==null?void 0:m.map(r=>e(o.Option,{value:r.key,children:r.title},r.id))})}),e(t,{label:"规格",field:"specName",hidden:!0,children:e(s,{})}),e(t,{label:"工艺",field:"tech",rules:[{required:!0}],children:e(o,{disabled:a.id,placeholder:"请选择工艺",showSearch:!0,filterOption:b,onChange:(r,l)=>{i.setFieldValue("techName","children"in l?l.children:""),f()},children:g==null?void 0:g.map(r=>e(o.Option,{value:r.key,children:r.title},r.id))})}),e(t,{label:"工艺",field:"techName",hidden:!0,children:e(s,{})}),e(t,{hidden:!0,label:"基础款号",field:"baseStyleCode",children:e(s,{placeholder:"基础款号自动生成"})}),e(t,{label:"款号",field:"styleCode",children:e(s,{disabled:!0,placeholder:"款号自动生成"})}),e(t,{label:"备注",field:"remark",children:e(s,{placeholder:"备注"})}),e(t,{label:"设计图",field:"designSrc",triggerPropName:"fileList",children:e(w,{listType:"picture-card",action:"/api/upload/image",limit:1,renderUploadList:k})}),e(t,{label:"编程图",field:"programSrc",triggerPropName:"fileList",children:e(w,{listType:"picture-card",action:"/api/upload/image",limit:1,renderUploadList:k})}),e(t,{label:"实拍图",field:"realitySrc",triggerPropName:"fileList",children:e(w,{listType:"picture-card",action:"/api/upload/image",limit:1,renderUploadList:k})}),e(t,{label:"标签",field:"contactsPhone",children:e(z,{tags:d,setTags:p})})]})})})}export{se as default};