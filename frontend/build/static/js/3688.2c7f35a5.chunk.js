"use strict";(self.webpackChunkplan_her=self.webpackChunkplan_her||[]).push([[3688,8649],{16504:function(e,n,t){var r=t(4942),o=t(1413),a=t(15861),i=t(70885),c=t(87757),l=t.n(c),s=t(61889),d=t(85523),u=t(94454),p=t(9928),m=t(18680),f=t(72791),g=t(16871),x=t(43504),h=t(16169),b=t(15901),Z=t(21885),v=t.n(Z),k=t(62045),w=t(20929),y=t.n(w),j=t(23197),P=t(87210),S=t.n(P),C=t(59973),I=t(16030),F=t(87781),R=t(56889),z=t(82181),B=t(27705),N=t(5198),M=t(80184),T=t(89704);n.Z=function(e){var n=e.page,t=e.close,c=(0,k.X)(),Z=(0,g.s0)(),w=(0,f.useRef)(new(v())),P=(0,f.useState)(""),L=(0,i.Z)(P,2),E=L[0],O=L[1],q=function(){var e=(0,a.Z)(l().mark((function e(){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Notification.requestPermission(function(){var e=(0,a.Z)(l().mark((function e(n){var t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,z.i)();case 2:(t=e.sent)&&(O((function(){return t})),(0,z.B)(Z));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=(0,f.useState)({email:"",pass:"",re:!1}),D=(0,i.Z)(A,2),W=D[0],H=D[1],V=(0,f.useState)(!1),_=(0,i.Z)(V,2),U=_[0],G=_[1],X=(0,f.useState)(!1),K=(0,i.Z)(X,2)[1],J=(0,I.I0)(),Q=(0,F.DE)({login:C.x4},J),Y=function(e,n){return H((function(t){return(0,o.Z)((0,o.Z)({},t),{},(0,r.Z)({},e,n))}))};(0,f.useEffect)((function(){if(q(),localStorage.getItem("reme")&&"true"==localStorage.getItem("reme")&&localStorage.getItem("pwd")&&localStorage.getItem("email")){var e=T.AES.decrypt(localStorage.getItem("pwd"),j.Z.passKeyForSave).toString(T.enc.Utf8);H((function(){return{email:localStorage.getItem("email"),pass:e,re:!0}}))}}),[]);var $=function(){var e=(0,a.Z)(l().mark((function e(n){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K((function(){return!1}));case 2:return w.current.showMessageFor(n),e.next=5,K((function(){return!0}));case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),ee=function(){var e=(0,a.Z)(l().mark((function e(){var r;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K((function(){return!1}));case 2:if(!w.current.allValid()){e.next=10;break}return G(!0),r={email:W.email,password:W.pass,type:"web",socialToken:"",fcmToken:E},e.next=7,Q.login(r,Z,n,t,W.re);case 7:G(!1),e.next=13;break;case 10:return w.current.showMessages(),e.next=13,K((function(){return!0}));case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ne=function(){var e=(0,a.Z)(l().mark((function e(r){var o;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(G(!0),!(r&&r.profileObj&&r.profileObj.email&&r.googleId)){e.next=5;break}return o={email:r.profileObj.email,password:"",type:"google",socialToken:r.googleId,fcmToken:E},e.next=5,Q.login(o,Z,n,t);case 5:G(!1);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),te=function(){var e=(0,a.Z)(l().mark((function e(r){var o;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(G(!0),!r.id||!r.email){e.next=5;break}return o={email:r.email,password:"",type:"facebook",socialToken:r.id,fcmToken:E},e.next=5,Q.login(o,Z,n,t);case 5:G(!1);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,M.jsx)("div",{className:n?c.register:"",children:U?(0,M.jsx)(B.Z,{}):(0,M.jsxs)(s.ZP,{container:!0,spacing:3,children:[(0,M.jsxs)(s.ZP,{item:!0,lg:n?6:12,md:12,sm:12,xs:12,textAlign:"center",children:[(0,M.jsx)(s.ZP,{item:!0,lg:12,children:(0,M.jsx)("img",{src:N,className:c.logo,style:n?{marginTop:"124px"}:{},alt:"logo"})}),(0,M.jsx)(s.ZP,{item:!0,lg:12,children:(0,M.jsx)("div",{className:c.title,children:"Welcome Back"})}),(0,M.jsx)(s.ZP,{item:!0,lg:12,children:(0,M.jsxs)(s.ZP,{container:!0,spacing:2,marginTop:"10px",children:[(0,M.jsx)(s.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,children:(0,M.jsx)(h.Z,{label:"Email Address",required:!0,type:"email",value:W.email,onChange:function(e){return Y("email",e)},onBlur:function(){return $("email")},validator:w.current.message("email",W.email,"required|email",{className:"errorClass"})})}),(0,M.jsx)(s.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,children:(0,M.jsx)(b.Z,{label:"Password",required:!0,value:W.pass,onChange:function(e){return Y("pass",e)},onBlur:function(){return $("password")},validator:w.current.message("password",W.pass,"required",{className:"errorClass"})})}),(0,M.jsx)(s.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,children:(0,M.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[(0,M.jsx)(d.Z,{control:(0,M.jsx)(u.Z,{checked:W.re,onChange:function(e){return Y("re",e.target.checked)}}),label:(0,M.jsx)("div",{style:{fontSize:"14px",fontWeight:"700",fontFamily:"Montserrat"},children:"Remember me"})}),(0,M.jsx)("div",{style:{paddingTop:"8px"},children:(0,M.jsx)(x.OL,{to:"/forgot-password",style:{textDecoration:"none",color:m.Z.color1,fontSize:"14px",fontWeight:"900",fontFamily:"Montserrat"},children:"Forgot password?"})})]})}),(0,M.jsx)(s.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,children:(0,M.jsx)(R.Z,{className:c.signUpButton,varient:"contained",name:"Login",onclick:ee,size:"large"})}),(0,M.jsxs)(s.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,children:[(0,M.jsx)(y(),{clientId:j.Z.googleClientId,onSuccess:function(e){return ne(e)},cookiePolicy:"single_host_origin",className:c.googlebtn}),(0,M.jsx)(S(),{appId:j.Z.facebookAppId,fields:"name,email,picture",textButton:"Sign in with Facebook",callback:te,size:"medium",icon:"fa-facebook",buttonStyle:{backgroundColor:"#7dbaaf",textTransform:"none",padding:"13px 10px 10px 10px",fontWeight:500,fontFamily:"Montserrat",fontSize:"14px",borderColor:"#7dbaaf"}})]}),(0,M.jsx)(s.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,children:(0,M.jsxs)("div",{style:{color:m.Z.color4,margin:"10px 0px 80px 0px"},children:["Don't have account ?"," ",(0,M.jsx)(x.OL,{color:m.Z.color1,to:"/register",children:"Create an account"})]})})]})})]}),n&&(0,M.jsx)(s.ZP,{item:!0,lg:6,md:6,sm:6,xs:6,className:c.gridImg,children:(0,M.jsx)("img",{src:p,alt:"create account image1",style:{height:"100%"}})})]})})}},62045:function(e,n,t){t.d(n,{X:function(){return i}});var r=t(4942),o=t(72455),a=t(18680),i=(0,o.Z)((function(e){return{register:(0,r.Z)({padding:"8em 0px 22em 0px",width:"80%",textAlign:"center",margin:"auto"},e.breakpoints.down("md"),{width:"95%"}),logo:{margin:"20px 0px 10px 0px",height:"10em"},title:{fontWeight:700,fontSize:35,color:a.Z.color1,fontFamily:"Montserrat",margin:"10px 0px 20px 0px"},tabsContainer:{width:"100%",textAlign:"center",margin:"auto"},tabs:{background:"#EAECED",borderRadius:"12px"},activeTab:{background:"".concat(a.Z.color1," !important"),color:"white !important",margin:"5px !important",borderRadius:"12px !important"},signUpButton:{margin:"20px 0px 10px 0px !important",width:"80%",fontSize:"14px"},gridImg:(0,r.Z)({},e.breakpoints.down("lg"),{display:"none"}),googlebtn:{background:"#7dbaaf !important",color:"white !important",marginRight:"10px",marginBottom:"10px",boxShadow:"none",border:"0px","&:hover":{background:"".concat(a.Z.color1," !important")}},formGroupContainer:{textAlign:"left !important"},labelName:{marginBottom:"12px",fontWeight:500,fontSize:"18px !important"}}}))},13688:function(e,n,t){t.r(n);var r=t(16504),o=t(80184);n.default=function(){return(0,o.jsx)(r.Z,{page:!0})}},94454:function(e,n,t){t.d(n,{Z:function(){return S}});var r=t(4942),o=t(63366),a=t(87462),i=t(72791),c=t(90767),l=t(12065),s=t(97278),d=t(76189),u=t(80184),p=(0,d.Z)((0,u.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),m=(0,d.Z)((0,u.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),f=(0,d.Z)((0,u.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),g=t(14036),x=t(31402),h=t(66934),b=t(95159);function Z(e){return(0,b.Z)("MuiCheckbox",e)}var v=(0,t(30208).Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),k=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],w=(0,h.ZP)(s.Z,{shouldForwardProp:function(e){return(0,h.FO)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,n){var t=e.ownerState;return[n.root,t.indeterminate&&n.indeterminate,"default"!==t.color&&n["color".concat((0,g.Z)(t.color))]]}})((function(e){var n,t=e.theme,o=e.ownerState;return(0,a.Z)({color:t.palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:(0,l.Fq)("default"===o.color?t.palette.action.active:t.palette[o.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==o.color&&(n={},(0,r.Z)(n,"&.".concat(v.checked,", &.").concat(v.indeterminate),{color:t.palette[o.color].main}),(0,r.Z)(n,"&.".concat(v.disabled),{color:t.palette.action.disabled}),n))})),y=(0,u.jsx)(m,{}),j=(0,u.jsx)(p,{}),P=(0,u.jsx)(f,{}),S=i.forwardRef((function(e,n){var t,r,l=(0,x.Z)({props:e,name:"MuiCheckbox"}),s=l.checkedIcon,d=void 0===s?y:s,p=l.color,m=void 0===p?"primary":p,f=l.icon,h=void 0===f?j:f,b=l.indeterminate,v=void 0!==b&&b,S=l.indeterminateIcon,C=void 0===S?P:S,I=l.inputProps,F=l.size,R=void 0===F?"medium":F,z=(0,o.Z)(l,k),B=v?C:h,N=v?C:d,M=(0,a.Z)({},l,{color:m,indeterminate:v,size:R}),T=function(e){var n=e.classes,t=e.indeterminate,r=e.color,o={root:["root",t&&"indeterminate","color".concat((0,g.Z)(r))]},i=(0,c.Z)(o,Z,n);return(0,a.Z)({},n,i)}(M);return(0,u.jsx)(w,(0,a.Z)({type:"checkbox",inputProps:(0,a.Z)({"data-indeterminate":v},I),icon:i.cloneElement(B,{fontSize:null!=(t=B.props.fontSize)?t:R}),checkedIcon:i.cloneElement(N,{fontSize:null!=(r=N.props.fontSize)?r:R}),ownerState:M,ref:n},z,{classes:T}))}))},85523:function(e,n,t){t.d(n,{Z:function(){return k}});var r=t(4942),o=t(63366),a=t(87462),i=t(72791),c=t(28182),l=t(90767),s=t(52930),d=t(20890),u=t(14036),p=t(66934),m=t(31402),f=t(95159);function g(e){return(0,f.Z)("MuiFormControlLabel",e)}var x=(0,t(30208).Z)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]),h=t(76147),b=t(80184),Z=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","value"],v=(0,p.ZP)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:function(e,n){var t=e.ownerState;return[(0,r.Z)({},"& .".concat(x.label),n.label),n.root,n["labelPlacement".concat((0,u.Z)(t.labelPlacement))]]}})((function(e){var n=e.theme,t=e.ownerState;return(0,a.Z)((0,r.Z)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16},"&.".concat(x.disabled),{cursor:"default"}),"start"===t.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===t.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===t.labelPlacement&&{flexDirection:"column",marginLeft:16},(0,r.Z)({},"& .".concat(x.label),(0,r.Z)({},"&.".concat(x.disabled),{color:n.palette.text.disabled})))})),k=i.forwardRef((function(e,n){var t=(0,m.Z)({props:e,name:"MuiFormControlLabel"}),r=t.className,p=t.componentsProps,f=void 0===p?{}:p,x=t.control,k=t.disabled,w=t.disableTypography,y=t.label,j=t.labelPlacement,P=void 0===j?"end":j,S=(0,o.Z)(t,Z),C=(0,s.Z)(),I=k;"undefined"===typeof I&&"undefined"!==typeof x.props.disabled&&(I=x.props.disabled),"undefined"===typeof I&&C&&(I=C.disabled);var F={disabled:I};["checked","name","onChange","value","inputRef"].forEach((function(e){"undefined"===typeof x.props[e]&&"undefined"!==typeof t[e]&&(F[e]=t[e])}));var R=(0,h.Z)({props:t,muiFormControl:C,states:["error"]}),z=(0,a.Z)({},t,{disabled:I,labelPlacement:P,error:R.error}),B=function(e){var n=e.classes,t=e.disabled,r=e.labelPlacement,o=e.error,a={root:["root",t&&"disabled","labelPlacement".concat((0,u.Z)(r)),o&&"error"],label:["label",t&&"disabled"]};return(0,l.Z)(a,g,n)}(z),N=y;return null==N||N.type===d.Z||w||(N=(0,b.jsx)(d.Z,(0,a.Z)({component:"span",className:B.label},f.typography,{children:N}))),(0,b.jsxs)(v,(0,a.Z)({className:(0,c.Z)(B.root,r),ownerState:z,ref:n},S,{children:[i.cloneElement(x,F),N]}))}))},97278:function(e,n,t){t.d(n,{Z:function(){return v}});var r=t(70885),o=t(63366),a=t(87462),i=t(72791),c=t(28182),l=t(90767),s=t(14036),d=t(66934),u=t(98278),p=t(52930),m=t(23701),f=t(95159);function g(e){return(0,f.Z)("PrivateSwitchBase",e)}(0,t(30208).Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var x=t(80184),h=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],b=(0,d.ZP)(m.Z)((function(e){var n=e.ownerState;return(0,a.Z)({padding:9,borderRadius:"50%"},"start"===n.edge&&{marginLeft:"small"===n.size?-3:-12},"end"===n.edge&&{marginRight:"small"===n.size?-3:-12})})),Z=(0,d.ZP)("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),v=i.forwardRef((function(e,n){var t=e.autoFocus,i=e.checked,d=e.checkedIcon,m=e.className,f=e.defaultChecked,v=e.disabled,k=e.disableFocusRipple,w=void 0!==k&&k,y=e.edge,j=void 0!==y&&y,P=e.icon,S=e.id,C=e.inputProps,I=e.inputRef,F=e.name,R=e.onBlur,z=e.onChange,B=e.onFocus,N=e.readOnly,M=e.required,T=e.tabIndex,L=e.type,E=e.value,O=(0,o.Z)(e,h),q=(0,u.Z)({controlled:i,default:Boolean(f),name:"SwitchBase",state:"checked"}),A=(0,r.Z)(q,2),D=A[0],W=A[1],H=(0,p.Z)(),V=v;H&&"undefined"===typeof V&&(V=H.disabled);var _="checkbox"===L||"radio"===L,U=(0,a.Z)({},e,{checked:D,disabled:V,disableFocusRipple:w,edge:j}),G=function(e){var n=e.classes,t=e.checked,r=e.disabled,o=e.edge,a={root:["root",t&&"checked",r&&"disabled",o&&"edge".concat((0,s.Z)(o))],input:["input"]};return(0,l.Z)(a,g,n)}(U);return(0,x.jsxs)(b,(0,a.Z)({component:"span",className:(0,c.Z)(G.root,m),centerRipple:!0,focusRipple:!w,disabled:V,tabIndex:null,role:void 0,onFocus:function(e){B&&B(e),H&&H.onFocus&&H.onFocus(e)},onBlur:function(e){R&&R(e),H&&H.onBlur&&H.onBlur(e)},ownerState:U,ref:n},O,{children:[(0,x.jsx)(Z,(0,a.Z)({autoFocus:t,checked:i,defaultChecked:f,className:G.input,disabled:V,id:_&&S,name:F,onChange:function(e){if(!e.nativeEvent.defaultPrevented){var n=e.target.checked;W(n),z&&z(e,n)}},readOnly:N,ref:I,required:M,ownerState:U,tabIndex:T,type:L},"checkbox"===L&&void 0===E?{}:{value:E},C)),D?d:P]}))}))},9928:function(e,n,t){e.exports=t.p+"static/media/login-img1.c3e657f15a4160c4ec5d.PNG"}}]);
//# sourceMappingURL=3688.2c7f35a5.chunk.js.map