import{aP as e,w as s}from"./index-2fe9f87b.js";var o=globalThis&&globalThis.__assign||function(){return o=Object.assign||function(a){for(var r,n=1,l=arguments.length;n<l;n++){r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(a[t]=r[t])}return a},o.apply(this,arguments)};function u(a,r){if(a){e(a,o({block:"start",behavior:"instant",scrollMode:"if-needed"},r));var n=a.offsetHeight,l=a.getBoundingClientRect().height;if(r&&r.boundary&&n!==l){var t=s(r.boundary)?r.boundary(a):r.boundary;t.scrollTop=Math.round(t.scrollTop*(n/l))}}}export{u as s};