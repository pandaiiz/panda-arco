import{l as r}from"./index-f50a7ad4.js";const a=e=>r.get(`/api/order/copy/${e}`),o=e=>r.get("/api/order/paging",{params:e}),s=e=>r.get(`/api/order/details/${e}`),p=e=>r.post("/api/order",e),i=(e,d)=>r.patch(`/api/order/${e}`,d),c=e=>r.delete(`/api/order/${e}`),g=e=>r.delete(`/api/order/detail/${e}`);export{p as a,o as b,a as c,g as d,c as e,s as g,i as u};
