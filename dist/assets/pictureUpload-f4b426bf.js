import{r as l,j as e,a as u,k as h}from"./index-2fe9f87b.js";import{U as f}from"./index-a3018368.js";import"./index-ed7d1e53.js";import{n as g}from"./index.browser-7e542916.js";import{J as U,R as C,a as R,b,Q as x}from"./rotate-c57d4b9d.js";import"./index-36185895.js";import"./index-6b64cf7e.js";function I({url:i,onChange:c}){const[m,a]=l.useState([]);return l.useEffect(()=>{i&&a([{url:i,uid:g()}])},[]),e("div",{children:e(f,{imagePreview:!0,action:"/api/upload/image",listType:"picture-card",limit:1,fileList:m,showUploadList:{removeIcon:null},onChange:(t,o)=>{o.status==="done"&&(a(t),c(t))},renderUploadList:t=>e("div",{style:{display:"flex",textAlign:"center"},children:t.map(o=>{const r=o.url||URL.createObjectURL(o.originFile);return e(U,{toolbarRender:({onScale:n,scale:s,rotate:d,onRotate:p})=>u(h,{children:[e(C,{className:"PhotoView-Slider__toolbarIcon",onClick:()=>n(s+1)}),e(R,{className:"PhotoView-Slider__toolbarIcon",onClick:()=>n(s-1)}),e(b,{className:"PhotoView-Slider__toolbarIcon",onClick:()=>p(d+90)})]}),children:e(x,{src:r,children:e("img",{src:r,alt:"",style:{height:100,margin:"auto"}})})},r)})})})})}export{I as default};
