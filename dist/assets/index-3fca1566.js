import{R as u,r as O,I as d,j as i,_ as h}from"./index-f50a7ad4.js";function f(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?f(Object(t),!0).forEach(function(r){h(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function m(e,n){var t=O.useContext(d),r=t.prefixCls,o=r===void 0?"arco":r,l=e.spin,a=e.className,s=p(p({"aria-hidden":!0,focusable:!1,ref:n},e),{},{className:"".concat(a?a+" ":"").concat(o,"-icon ").concat(o,"-icon-refresh")});return l&&(s.className="".concat(s.className," ").concat(o,"-icon-loading")),delete s.spin,delete s.isIcon,i("svg",{fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48",...s,children:i("path",{d:"M38.837 18C36.463 12.136 30.715 8 24 8 15.163 8 8 15.163 8 24s7.163 16 16 16c7.455 0 13.72-5.1 15.496-12M40 8v10H30"})})}var c=u.forwardRef(m);c.defaultProps={isIcon:!0};c.displayName="IconRefresh";const j=c;export{j as I};
