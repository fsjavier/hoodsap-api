(this.webpackJsonpmoments=this.webpackJsonpmoments||[]).push([[0],{103:function(e,a,t){"use strict";t.r(a);var s=t(0),n=t.n(s),c=t(26),r=t.n(c),o=(t(72),t(23)),i=t(14),l=t.n(i),d=t(40),j=t(67),u=t(39),m=t(8),b=t(47),p=t(45),x=t.p+"static/media/hoodsap_logo.4deabc4a.webp",h=t(65),v=t.n(h),O=t(2);var g=e=>{let{src:a,height:t=45,text:s}=e;return Object(O.jsxs)("span",{children:[Object(O.jsx)("img",{className:v.a.Avatar,src:a,height:t,width:t,alt:"avatar"}),s]})},N=t(107),w=t(108),_=t(109),f=t(110),C=t(111),y=t(112),S=t(113),k=t(19),I=t.n(k),L=t(16),B=t(11),P=t.n(B);P.a.defaults.baseURL="/api",P.a.defaults.headers.post["Content-Type"]="multipart/form-data",P.a.defaults.withCredentials=!0;const A=P.a.create(),F=P.a.create();var U=t(7);const R=Object(s.createContext)(),E=Object(s.createContext)(),D=()=>Object(s.useContext)(E),H=e=>{let{children:a}=e;const[t,n]=Object(s.useState)(null),c=Object(U.useHistory)();return Object(s.useEffect)((()=>{(async()=>{try{const{data:e}=await F.get("dj-rest-auth/user/");n(e)}catch(e){console.log(e)}})()}),[]),Object(s.useMemo)((()=>{A.interceptors.request.use((async e=>{try{await P.a.post("/dj-rest-auth-token/refresh/")}catch(a){return n((e=>(e&&c.push("/signin"),null))),e}return e}),(e=>Promise.reject(e))),F.interceptors.response.use((e=>e),(async e=>{var a;if(401===(null===(a=e.response)||void 0===a?void 0:a.status)){try{await P.a.post("/dj-rest-auth/token/refresh/")}catch(e){n((e=>(e&&c.push("/signin"),null)))}return P()(e.config)}return Promise.reject(e)}))}),[c]),Object(O.jsx)(R.Provider,{value:t,children:Object(O.jsx)(E.Provider,{value:n,children:a})})};var G=()=>{const[e,a]=Object(s.useState)(!1),t=Object(s.useRef)(null);return Object(s.useEffect)((()=>{const e=e=>{t.current&&!t.current.contains(e.target)&&a(!1)};return document.addEventListener("mouseup",e),()=>{document.removeEventListener("mouseup",e)}})),{expanded:e,setExpanded:a,ref:t}};var M=function(){const e=Object(s.useContext)(R),a=D(),{expanded:t,setExpanded:n,ref:c}=G(),r=Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)(L.c,{exact:!0,to:"/",className:I.a.NavLink,activeClassName:I.a.Active,children:[Object(O.jsx)(N.a,{className:l.a.Icon}),"Home"]}),Object(O.jsxs)(L.c,{exact:!0,to:"/events",className:I.a.NavLink,activeClassName:I.a.Active,children:[Object(O.jsx)(w.a,{className:l.a.Icon}),"Events"]}),Object(O.jsxs)(L.c,{exact:!0,to:"/feed",className:I.a.NavLink,activeClassName:I.a.Active,children:[Object(O.jsx)(_.a,{className:l.a.Icon}),"Feed"]}),Object(O.jsxs)(u.a,{title:Object(O.jsx)(g,{src:null===e||void 0===e?void 0:e.profile_image,height:40,text:"Hi ".concat(null===e||void 0===e?void 0:e.username)}),id:"basic-nav-dropdown",children:[Object(O.jsxs)(u.a.Item,{as:L.c,to:"/profiles/".concat(null===e||void 0===e?void 0:e.profile_id),children:[Object(O.jsx)(f.a,{className:l.a.Icon})," Profile"]}),Object(O.jsx)(u.a.Divider,{}),Object(O.jsxs)(u.a.Item,{onClick:async()=>{try{await P.a.post("/dj-rest-auth/logout/"),a(null)}catch(e){console.log(e)}},children:[Object(O.jsx)(C.a,{className:l.a.Icon}),"Sign out"]})]})]}),i=Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)(L.c,{to:"/signup",className:I.a.NavLink,activeClassName:I.a.Active,children:[Object(O.jsx)(y.a,{className:l.a.Icon}),"Sign up"]}),Object(O.jsxs)(L.c,{to:"/signin",className:I.a.NavLink,activeClassName:I.a.Active,children:[Object(O.jsx)(S.a,{className:l.a.Icon}),"Sign in"]})]});return Object(O.jsx)(d.a,{expanded:t,expand:"md",fixed:"top",className:I.a.NavBar,children:Object(O.jsxs)(o.a,{fluid:!0,children:[Object(O.jsx)(L.c,{to:"/",children:Object(O.jsx)(d.a.Brand,{href:"#home",children:Object(O.jsx)("img",{src:x,height:45,alt:"logo"})})}),Object(O.jsxs)(m.a,{inline:!0,className:"mx-auto",children:[Object(O.jsx)(b.a,{type:"text",placeholder:"Search",className:"mr-sm-2"}),Object(O.jsx)(p.a,{variant:"outline-success",children:"Search"})]}),Object(O.jsx)(d.a.Toggle,{ref:c,onClick:()=>n(!t),"aria-controls":"basic-navbar-nav"}),Object(O.jsx)(d.a.Collapse,{id:"basic-navbar-nav",className:"flex-grow-0",children:Object(O.jsx)(j.a,{className:"ml-auto align-items-center",children:e?r:i})})]})})},T=t(48),Z=t(36),q=t(27),J=t(52),V=t.n(J);var K=function(e){let{children:a,type:t,variant:s,disabled:n,onClick:c}=e;const r=V.a[s]||V.a.Primary;return Object(O.jsx)("button",{type:t,onClick:c,disabled:n,className:"".concat(V.a.Button," ").concat(r),children:a})},Q=t(30),W=t.n(Q),X=t(56);var Y=()=>{var e,a,t,n;const[c,r]=Object(s.useState)({username:"",password1:"",password2:""}),[i,d]=Object(s.useState)({}),j=Object(X.useHistory)(),{username:u,password1:b,password2:p}=c,x=u&&b&&p;function h(e){r({...c,[e.target.name]:e.target.value})}return Object(O.jsx)(o.a,{children:Object(O.jsx)(T.a,{className:"".concat(W.a.Row," ").concat(W.a.Background),children:Object(O.jsx)(Z.a,{className:"my-auto mx-auto",md:6,xl:4,children:Object(O.jsxs)(o.a,{className:"".concat(W.a.FormContainer),children:[Object(O.jsx)("h2",{children:"Sign Up"}),Object(O.jsxs)(m.a,{onSubmit:async e=>{e.preventDefault();try{await P.a.post("/dj-rest-auth/registration/",c),j.push("/signin")}catch(t){var a;d(null===(a=t.response)||void 0===a?void 0:a.data)}},children:[Object(O.jsxs)(m.a.Group,{controlId:"username",children:[Object(O.jsx)(m.a.Label,{className:"d-none",children:"Username"}),Object(O.jsx)(m.a.Control,{type:"text",name:"username",placeholder:"Username",value:u,onChange:h,className:"mt-3"})]}),null===(e=i.username)||void 0===e?void 0:e.map(((e,a)=>Object(O.jsx)(q.a,{variant:"warning",children:e},a))),Object(O.jsxs)(m.a.Group,{controlId:"password1",children:[Object(O.jsx)(m.a.Label,{className:"d-none",children:"Password"}),Object(O.jsx)(m.a.Control,{type:"password",name:"password1",placeholder:"Password",value:b,onChange:h,className:"mt-3"})]}),null===(a=i.password1)||void 0===a?void 0:a.map(((e,a)=>Object(O.jsx)(q.a,{variant:"warning",children:e},a))),Object(O.jsxs)(m.a.Group,{controlId:"password2",children:[Object(O.jsx)(m.a.Label,{className:"d-none",children:"Confirm password"}),Object(O.jsx)(m.a.Control,{type:"password",name:"password2",placeholder:"Confirm password",value:p,onChange:h,className:"mt-3"})]}),null===(t=i.password2)||void 0===t?void 0:t.map(((e,a)=>Object(O.jsx)(q.a,{variant:"warning",children:e},a))),Object(O.jsxs)("p",{className:"small",children:["Do you already have an acount?"," ",Object(O.jsx)(X.Link,{to:"/signin",className:l.a.Link,children:"Sign in"})]}),Object(O.jsx)(K,{variant:"Primary",type:"submit",disabled:!x,className:"mx-auto",children:"Sign Up Now"}),null===(n=i.non_field_errors)||void 0===n?void 0:n.map(((e,a)=>Object(O.jsx)(q.a,{variant:"warning",className:"mt-3",children:e},a)))]})]})})})})};var z=()=>{var e,a,t;const n=D(),[c,r]=Object(s.useState)({username:"",password:""}),[i,d]=Object(s.useState)({}),j=Object(U.useHistory)(),{username:u,password:b}=c,p=u&&b;function x(e){r({...c,[e.target.name]:e.target.value})}return Object(O.jsx)(o.a,{children:Object(O.jsx)(T.a,{className:"".concat(W.a.Row," ").concat(W.a.Background),children:Object(O.jsx)(Z.a,{className:"my-auto mx-auto",md:6,xl:4,children:Object(O.jsxs)(o.a,{className:"".concat(W.a.FormContainer),children:[Object(O.jsx)("h2",{children:"Sign In"}),Object(O.jsxs)(m.a,{onSubmit:async e=>{e.preventDefault();try{const{data:e}=await P.a.post("/dj-rest-auth/login/",c);n(e.user),j.push("/")}catch(t){var a;d(null===(a=t.response)||void 0===a?void 0:a.data)}},children:[Object(O.jsxs)(m.a.Group,{controlId:"username",children:[Object(O.jsx)(m.a.Label,{className:"d-none",children:"Username"}),Object(O.jsx)(m.a.Control,{type:"text",name:"username",placeholder:"Username",value:u,onChange:x,className:"mt-3"})]}),null===(e=i.username)||void 0===e?void 0:e.map(((e,a)=>Object(O.jsx)(q.a,{variant:"warning",children:e},a))),Object(O.jsxs)(m.a.Group,{controlId:"password",children:[Object(O.jsx)(m.a.Label,{className:"d-none",children:"Password"}),Object(O.jsx)(m.a.Control,{type:"password",name:"password",placeholder:"Password",value:b,onChange:x,className:"mt-3"})]}),null===(a=i.password)||void 0===a?void 0:a.map(((e,a)=>Object(O.jsx)(q.a,{variant:"warning",children:e},a))),Object(O.jsxs)("p",{className:"small",children:["Don't have an acount?"," ",Object(O.jsx)(L.b,{to:"/signup",className:l.a.Link,children:"Sign up"})]}),Object(O.jsx)(K,{variant:"Primary",type:"submit",disabled:!p,className:"mx-auto",children:"Sign In"}),null===(t=i.non_field_errors)||void 0===t?void 0:t.map(((e,a)=>Object(O.jsx)(q.a,{variant:"warning",className:"mt-3",children:e},a)))]})]})})})})};var $=function(){return Object(O.jsxs)("div",{className:l.a.App,children:[Object(O.jsx)(M,{}),Object(O.jsx)(o.a,{className:l.a.Main,children:Object(O.jsxs)(U.Switch,{children:[Object(O.jsx)(U.Route,{exact:!0,path:"/",render:()=>Object(O.jsx)("h1",{children:"Home page"})}),Object(O.jsx)(U.Route,{exact:!0,path:"/signup",render:()=>Object(O.jsx)(Y,{})}),Object(O.jsx)(U.Route,{exact:!0,path:"/signin",render:()=>Object(O.jsx)(z,{})}),Object(O.jsx)(U.Route,{render:()=>Object(O.jsx)("p",{children:"Page not found!"})})]})})]})};var ee=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,114)).then((a=>{let{getCLS:t,getFID:s,getFCP:n,getLCP:c,getTTFB:r}=a;t(e),s(e),n(e),c(e),r(e)}))};r.a.render(Object(O.jsx)(n.a.StrictMode,{children:Object(O.jsx)(L.a,{children:Object(O.jsx)(H,{children:Object(O.jsx)($,{})})})}),document.getElementById("root")),ee()},14:function(e,a,t){e.exports={App:"App_App__16ZpL",Main:"App_Main__HQkvd",Icon:"App_Icon__Zp3GY",Link:"App_Link__K7VoX"}},19:function(e,a,t){e.exports={NavBar:"NavBar_NavBar__1amC6",NavLink:"NavBar_NavLink__34ons",Active:"NavBar_Active__3PBZb"}},30:function(e,a,t){e.exports={Row:"SignInUpForm_Row__3PbVy",Background:"SignInUpForm_Background__2UCxs",FormContainer:"SignInUpForm_FormContainer__2i1tx"}},52:function(e,a,t){e.exports={Button:"CustomButton_Button__3fNIc",Primary:"CustomButton_Primary__2tgr9",Secondary:"CustomButton_Secondary__gDqme"}},65:function(e,a,t){e.exports={Avatar:"Avatar_Avatar__196lW"}},72:function(e,a,t){}},[[103,1,2]]]);
//# sourceMappingURL=main.489e646c.chunk.js.map