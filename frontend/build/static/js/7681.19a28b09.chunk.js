"use strict";(self.webpackChunkplan_her=self.webpackChunkplan_her||[]).push([[7681],{87268:function(e,t,n){var r=n(5289),a=n(65661),i=n(94721),o=n(39157),c=n(97123),s=n(56889),u=n(80184);t.Z=function(e){return(0,u.jsxs)(r.Z,{open:e.open,onClose:e.handleClose,fullWidth:!0,maxWidth:"xs",style:{textAlign:"center",fontFamily:"Montserrat",margin:"16px",borderRadius:"8px"},children:[(0,u.jsx)(a.Z,{id:"alert-dialog-title",style:{backgroundColor:"#fafafb"},children:(0,u.jsxs)("div",{style:{fontFamily:"Montserrat",fontSize:"22px",fontWeight:"bold",fontStretch:"normal",fontStyle:"normal",lineHeight:1.71,letterSpacing:"0.1px",textAlign:"left",color:"#92929d"},children:["Delete ",e.title," ?"]})}),(0,u.jsx)(i.Z,{}),(0,u.jsxs)(o.Z,{children:["Are you sure you want to delete this"," ",(0,u.jsx)("span",{style:{textTransform:"lowercase"},children:e.title}),"?"]}),(0,u.jsxs)(c.Z,{children:[(0,u.jsx)(s.Z,{varient:"contained",onclick:e.handleClose,name:"Cancel",styled:{backgroundColor:"red"},size:"large",fullWidth:!0}),(0,u.jsx)(s.Z,{varient:"outlined",onclick:e.handleDelete,name:"Ok",size:"large",fullWidth:!0})]})]})}},17681:function(e,t,n){n.r(t),n.d(t,{default:function(){return P}});var r=n(87781),a=n(26067),i=n(72791),o=n(16030),c=n(42982),s=n(1413),u=n(15861),l=n(70885),d=n(87757),f=n.n(d),p=n(82167),h=n(53767),m=n(27391),x=n(36151),g=n(61889),v=n(72455),Z=n(763);var b=n.p+"static/media/ic_Plus.22a6a1616d50778a4e813510f74e60f2.svg",j=n(61306),y=n(80761),C=n(21584),k=n(42836),w=n(87268),A=n(27705),S=n(5289),T=n(65661),N=n(94721),R=n(56889),z=n(80184),I=function(e){var t=e.open,n=e.handleClose,r=e.data,a=e.addToClient;return(0,z.jsxs)(S.Z,{open:t,onClose:n,fullWidth:!0,maxWidth:"xs",style:{textAlign:"center",fontFamily:"Montserrat",margin:"16px",borderRadius:"8px"},children:[(0,z.jsx)(T.Z,{id:"alert-dialog-title",style:{backgroundColor:"#fafafb"},children:(0,z.jsx)("div",{style:{fontFamily:"Montserrat",fontSize:"22px",fontWeight:"bold",fontStretch:"normal",fontStyle:"normal",lineHeight:1.71,letterSpacing:"0.1px",textAlign:"left",color:"#92929d"},children:"Add Client From Appointment"})}),(0,z.jsx)(N.Z,{}),(0,z.jsx)("div",{style:{maxHeight:"400px",overflow:"auto"},children:(0,z.jsx)(h.Z,{direction:"column",margin:"10px",children:r&&r.length?r.map((function(e){return(0,z.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",borderBottom:"1px solid grey",padding:"5px"},children:[(0,z.jsxs)("div",{children:[(0,z.jsx)("div",{style:{fontSize:"18px",fontWeight:500,textAlign:"left"},children:e.name||"-"}),(0,z.jsx)("div",{style:{fontSize:"15px",fontWeight:500,textAlign:"left"},children:e.email||"-"})]}),(0,z.jsx)(R.Z,{name:"add",varient:"contained",onclick:function(){return a(e._id)}})]},e._id)})):(0,z.jsx)("div",{style:{textAlign:"center",fontSize:"18px",fontWeight:600,margin:"auto"},children:"No clients to add!"})})})]})},D=n(57621),F=n(93044),M=n(16871),Q=function(e){var t,n=e.classes,r=e.data,a=e.cu,i=e.removeClient,o=(0,M.s0)();return(0,z.jsx)(g.ZP,{item:!0,lg:3,md:5,sm:6,xs:12,textAlign:"center",children:(0,z.jsxs)(D.Z,{className:n.cardContainer,children:[(0,z.jsxs)(h.Z,{className:n.cardHeader,children:[(0,z.jsx)(F.Z,{src:r.userId&&r.userId.image||"","aria-label":"recipe",className:n.cardAvatar}),(0,z.jsx)("div",{className:n.cardHeaderTitle,children:r.name}),(0,z.jsx)("div",{className:n.cardSubTitle,children:r.userId&&r.userId.email||"-"})]}),(0,z.jsxs)(h.Z,{direction:"row",justifyContent:"space-between",margin:3,marginTop:0,marginBottom:5,textAlign:"center",children:[(0,z.jsxs)("div",{children:[(0,z.jsx)("div",{className:n.cardContentTitle,children:"Phone"}),(0,z.jsx)("div",{className:n.cardContentSubTitle,children:r.contact||"-"})]}),(0,z.jsxs)("div",{children:[(0,z.jsx)("div",{className:n.cardContentTitle,children:"age"}),(0,z.jsx)("div",{className:n.cardContentSubTitle,children:r.dob?(t=r.dob,(new Date).getFullYear()-new Date(t).getFullYear()):"-"})]}),(0,z.jsxs)("div",{children:[(0,z.jsx)("div",{className:n.cardContentTitle,children:"Gender"}),(0,z.jsx)("div",{className:n.cardContentSubTitle,children:r.gender||"-"})]})]}),(0,z.jsxs)(h.Z,{justifyContent:"space-between",marginLeft:2,marginRight:2,direction:"row",children:[(0,z.jsx)(x.Z,{variant:"contained",size:"large",className:n.messageButton,onClick:function(){return o("/message/".concat(a.id||"","-").concat(r.userId&&r.userId._id||""))},children:"Message"}),(0,z.jsx)(x.Z,{variant:"outlined",size:"large",className:n.meetingButton,onClick:function(){return i(r.userId&&r.userId._id||"")},children:"Remove Client"})]})]})})},W=new k.Z,_=(0,v.Z)((function(e){return{clientContainer:{paddingTop:"8em",width:"90%",textAlign:"center",margin:"auto",paddingBottom:"10em",fontFamily:"Montserrat"},cardContainer:{borderRadius:"20px",backgroundColor:"#fff",height:"355px",textAlign:"center"},cardHeader:{paddingTop:"30px",paddingBottom:"30px"},cardAvatar:{width:"80px",margin:"auto",height:"80px"},cardHeaderTitle:{paddingTop:"15px",paddingBottom:"7px",fontSize:"18px",fontWeight:600,color:"#171725"},cardSubTitle:{color:"#92929d",fontSize:"14px"},cardContentTitle:{fontSize:"12px",color:"#d5d5dc",paddingBottom:"5px"},cardContentSubTitle:{color:"#171725",fontSize:"18px",fontWeight:600},messageButton:{borderRadius:"5px",backgroundColor:"#7dbaaf",textTransform:"none"},meetingButton:{borderRadius:"5px",borderColor:"#7dbaaf",textTransform:"none",color:"#7dbaaf"}}})),B=function(){var e=_(),t=(0,i.useState)(!0),n=(0,l.Z)(t,2),a=n[0],d=n[1],v=(0,i.useState)([]),k=(0,l.Z)(v,2),S=k[0],T=k[1],N=(0,i.useState)(""),R=(0,l.Z)(N,2),D=R[0],F=R[1],M=(0,i.useState)([]),B=(0,l.Z)(M,2),P=B[0],V=B[1],H=(0,i.useState)(!1),E=(0,l.Z)(H,2),L=E[0],O=E[1],q=(0,i.useState)(""),G=(0,l.Z)(q,2),Y=G[0],J=G[1],K=(0,i.useState)(""),U=(0,l.Z)(K,2),X=U[0],$=U[1],ee=(0,i.useState)(!1),te=(0,l.Z)(ee,2),ne=te[0],re=te[1],ae=(0,i.useCallback)((0,Z.debounce)((function(e){return e?se(e):ue()}),1e3),[]),ie=(0,o.I0)(),oe=(0,r.DE)({getClients:y.ZL,deleteClient:y.Nu,addClient:y.ZF,getIdRole:C._t,getAllAppointment:j.Qe,getClientsByname:y.ud},ie),ce=function(){var e=(0,u.Z)(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(re(!1),d(!0),!X){e.next=8;break}return e.next=5,oe.deleteClient(X);case 5:return e.next=7,ue();case 7:$("");case 8:d(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),se=function(){var e=(0,u.Z)(f().mark((function e(t){var n;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),W.createToken(),e.next=4,oe.getClientsByname(t,W.getToken());case 4:(n=e.sent)&&n.length?T((function(){return n})):T((function(){return[]})),d(!1);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ue=function(){var e=(0,u.Z)(f().mark((function e(){var t,n;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d((function(){return!0})),W.createToken(),e.next=4,oe.getClients(W.getToken());case 4:return(t=e.sent)&&t.length?T((function(){return t})):T((function(){return[]})),d((function(){return!1})),W.createToken(),e.next=10,oe.getAllAppointment(W.getToken());case 10:(n=e.sent)&&n.length?function(){for(var e={},r=0;r<n.length;r++)n[r].profileData&&n[r].clientData&&(e[n[r].profileData._id]=(0,s.Z)({},n[r].clientData));var a=Object.values(e),i=[];if(t&&t.length)for(var o=function(e){t.find((function(t){return t.userId&&t.userId._id===a[e]._id}))||i.push(a[e])},u=0;u<a.length;u++)o(u);else i.push.apply(i,(0,c.Z)(a));V((function(){return i}))}():V((function(){return[]}));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),le=function(){var e=(0,u.Z)(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O((function(){return!1})),d((function(){return!0})),e.next=4,oe.addClient(t);case 4:return e.next=6,ue();case 6:d((function(){return!1}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){var e=oe.getIdRole();return F((function(){return e})),ue(),function(){return W.cancelTheApi()}}),[]);return(0,z.jsxs)("div",{style:{background:"#fafafb"},children:[(0,z.jsxs)("div",{className:e.clientContainer,children:[(0,z.jsxs)(h.Z,{direction:"row",justifyContent:"space-between",style:{marginBottom:"50px"},children:[(0,z.jsxs)("div",{children:[(0,z.jsx)(p.Z,{style:{marginTop:"4px",marginRight:"3px"}}),(0,z.jsx)(m.Z,{variant:"standard",placeholder:"search client",value:Y,onChange:function(e){return t=e.target.value,ae(t),void J(t);var t}})]}),(0,z.jsx)("div",{children:(0,z.jsxs)(x.Z,{variant:"contained",style:{marginLeft:"15px",borderRadius:"10px",backgroundColor:"#7dbaaf"},onClick:function(){return O(!0)},children:[(0,z.jsx)("img",{src:b,height:18,width:18,style:{paddingRight:"10px"}})," ","Add Client"]})})]}),a?(0,z.jsx)(A.Z,{}):(0,z.jsx)(g.ZP,{container:!0,spacing:8,children:S&&S.length?S.map((function(t){return(0,z.jsx)(Q,{classes:e,data:t,cu:D,removeClient:function(e){return function(e){$((function(){return e})),re((function(){return!0}))}(e)}},t._id)})):(0,z.jsx)(g.ZP,{item:!0,lg:12,md:12,xs:12,sm:12,textAlign:"center",children:"No client found!"})})]}),(0,z.jsx)(I,{open:L,handleClose:function(){return O(!1)},data:P,addToClient:function(e){return le(e)}}),(0,z.jsx)(w.Z,{open:ne,title:"Client",handleClose:function(){return re(!1)},handleDelete:function(){return ce()}})]})},P=function(e){var t=(0,o.I0)(),n=(0,r.DE)({setTitle:a.T},t);return(0,i.useEffect)((function(){n.setTitle({title:e.title})}),[]),(0,z.jsx)(B,{})}},61306:function(e,t,n){n.d(t,{Nf:function(){return l},Qe:function(){return d},gV:function(){return u}});var r=n(15861),a=n(87757),i=n.n(a),o=n(56960),c=n(59089),s=n(46721),u=function(e){return function(){var t=(0,r.Z)(i().mark((function t(n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,c.h)("appointment",e,"post");case 3:(r=t.sent)&&r.code&&200===r.code&&r.success?o.Am.success(r.message):o.Am.error(r&&r.message||s.VQ),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),o.Am.error("Something went wrong.!");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},l=function(e,t){return function(){var n=(0,r.Z)(i().mark((function n(r){var a;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,c.h)("appointment/".concat(e),t,"put");case 3:(a=n.sent)&&a.code&&200===a.code&&a.success?o.Am.success(a.message):o.Am.error(a&&a.message||s.VQ),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),o.Am.error("Something went wrong.!");case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(e){return n.apply(this,arguments)}}()},d=function(e){return function(){var t=(0,r.Z)(i().mark((function t(n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,c.h)("allAppointment",{},"get",e);case 3:if(!((r=t.sent)&&r.code&&200===r.code&&r.success)){t.next=8;break}return t.abrupt("return",r.data);case 8:o.Am.error(r&&r.message||s.VQ);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),o.Am.error(s.VQ);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()}},80761:function(e,t,n){n.d(t,{Nu:function(){return d},ZF:function(){return f},ZL:function(){return u},ud:function(){return l}});var r=n(15861),a=n(87757),i=n.n(a),o=n(56960),c=n(59089),s=n(46721),u=function(e){return function(){var t=(0,r.Z)(i().mark((function t(n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,c.h)("saved-client",{},"get",e);case 3:if(!((r=t.sent)&&r.code&&200===r.code&&r.success)){t.next=9;break}return n({type:"GET_NEW_Clients",payload:{data:r.data}}),t.abrupt("return",r.data);case 9:o.Am.error(r&&r.message||s.VQ);case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),o.Am.error(s.VQ);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e){return t.apply(this,arguments)}}()},l=function(e,t){return function(){var n=(0,r.Z)(i().mark((function n(r){var a;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,c.h)("search-savedClient?keyword=".concat(e),{},"get",t);case 3:if(!((a=n.sent)&&a.code&&200===a.code&&a.success)){n.next=8;break}return n.abrupt("return",a.data);case 8:o.Am.error(a&&a.message||s.VQ);case 9:n.next=14;break;case 11:n.prev=11,n.t0=n.catch(0),o.Am.error(s.VQ);case 14:case"end":return n.stop()}}),n,null,[[0,11]])})));return function(e){return n.apply(this,arguments)}}()},d=function(e){return function(){var t=(0,r.Z)(i().mark((function t(n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,c.h)("saved-client/".concat(e),{},"delete");case 3:(r=t.sent)&&r.code&&200===r.code&&r.success?o.Am.success(r.message):o.Am.error(r&&r.message||s.VQ),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),o.Am.error(s.VQ);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},f=function(e){return function(){var t=(0,r.Z)(i().mark((function t(n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,c.h)("saved-client?clientId=".concat(e),{},"post");case 3:(r=t.sent)&&r.code&&200===r.code&&r.success?o.Am.success(r.message):o.Am.error(r&&r.message||s.VQ),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),o.Am.error(s.VQ);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}},82167:function(e,t,n){var r=n(76189),a=n(80184);t.Z=(0,r.Z)((0,a.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search")},93044:function(e,t,n){n.d(t,{Z:function(){return b}});var r=n(70885),a=n(63366),i=n(87462),o=n(72791),c=n(28182),s=n(90767),u=n(66934),l=n(31402),d=n(76189),f=n(80184),p=(0,d.Z)((0,f.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),h=n(95159);function m(e){return(0,h.Z)("MuiAvatar",e)}(0,n(30208).Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);var x=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],g=(0,u.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.variant],n.colorDefault&&t.colorDefault]}})((function(e){var t=e.theme,n=e.ownerState;return(0,i.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===n.variant&&{borderRadius:t.shape.borderRadius},"square"===n.variant&&{borderRadius:0},n.colorDefault&&{color:t.palette.background.default,backgroundColor:"light"===t.palette.mode?t.palette.grey[400]:t.palette.grey[600]})})),v=(0,u.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:function(e,t){return t.img}})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Z=(0,u.ZP)(p,{name:"MuiAvatar",slot:"Fallback",overridesResolver:function(e,t){return t.fallback}})({width:"75%",height:"75%"});var b=o.forwardRef((function(e,t){var n=(0,l.Z)({props:e,name:"MuiAvatar"}),u=n.alt,d=n.children,p=n.className,h=n.component,b=void 0===h?"div":h,j=n.imgProps,y=n.sizes,C=n.src,k=n.srcSet,w=n.variant,A=void 0===w?"circular":w,S=(0,a.Z)(n,x),T=null,N=function(e){var t=e.crossOrigin,n=e.referrerPolicy,a=e.src,i=e.srcSet,c=o.useState(!1),s=(0,r.Z)(c,2),u=s[0],l=s[1];return o.useEffect((function(){if(a||i){l(!1);var e=!0,r=new Image;return r.onload=function(){e&&l("loaded")},r.onerror=function(){e&&l("error")},r.crossOrigin=t,r.referrerPolicy=n,r.src=a,i&&(r.srcset=i),function(){e=!1}}}),[t,n,a,i]),u}((0,i.Z)({},j,{src:C,srcSet:k})),R=C||k,z=R&&"error"!==N,I=(0,i.Z)({},n,{colorDefault:!z,component:b,variant:A}),D=function(e){var t=e.classes,n={root:["root",e.variant,e.colorDefault&&"colorDefault"],img:["img"],fallback:["fallback"]};return(0,s.Z)(n,m,t)}(I);return T=z?(0,f.jsx)(v,(0,i.Z)({alt:u,src:C,srcSet:k,sizes:y,ownerState:I,className:D.img},j)):null!=d?d:R&&u?u[0]:(0,f.jsx)(Z,{className:D.fallback}),(0,f.jsx)(g,(0,i.Z)({as:b,ownerState:I,className:(0,c.Z)(D.root,p),ref:t},S,{children:T}))}))}}]);
//# sourceMappingURL=7681.19a28b09.chunk.js.map