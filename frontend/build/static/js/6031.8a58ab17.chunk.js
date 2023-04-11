"use strict";(self.webpackChunkplan_her=self.webpackChunkplan_her||[]).push([[6031],{96031:function(e,t,n){n.r(t),n.d(t,{default:function(){return ke}});var r=n(87781),a=n(26067),i=n(72791),o=n(16030),s=n(15861),c=n(70885),u=n(4942),l=n(87757),d=n.n(l),m=n(72455),p=n(16871),f=n(42982),x=n(61889),g=n(94721),h=n(1413),v=n(93044),y=n(72426),Z=n.n(y),k=n(71777),w=n(80184),A=(0,m.Z)((function(e){return{personCard:{width:"98%",height:"74px",display:"flex",gap:"10px",padding:"5px 8px 5px 8px"},avatar:{width:"42px",height:"42px",marginLeft:"0px",marginRight:"0px",margin:"auto"},rightContainer:{marginLeft:"0px",marginRight:"0px",margin:"auto",flexGrow:1},name:{fontSize:"14px",fontWeight:600,fontStretch:"normal",fontStyle:"normal",lineHeight:"normal",letterSpacing:"0.1px",textAlign:"left",color:"#171725",marginLeft:"0px",margin:"auto"},lastMsg:{fontSize:"14px",fontWeight:"normal",fontStretch:"normal",fontStyle:"normal",lineHeight:"normal",letterSpacing:"0.1px",textAlign:"left",color:"#92929d",whiteSpace:"nowrap",wordBreak:"break-all"},lastTime:{fontSize:"12px",fontWeight:"normal",fontStretch:"normal",fontStyle:"normal",lineHeight:1.83,letterSpacing:"normal",textAlign:"right",color:"#92929d",marginRight:"0px",margin:"auto"},upperDiv:{display:"flex",justifyContent:"space-between"},active:{backgroundColor:"#7dbaaf",borderRadius:"15px"},outerContainer:{marginBottom:"10px",cursor:"pointer"},activeCardText:{color:"#fff !important"},unread:{backgroundColor:"#f2f7ff",borderRadius:"15px"}}})),C=function(e){var t=e.name,n=e.id,r=e.lastTime,a=e.lastMsg,i=e.status,s=e.selRoom,c=A(),u=(0,o.v9)((function(e){return e.msg.selRoom})),l=u&&u.roomName&&u.roomName===e.room?c.active:"unread"===i?c.unread:"",d=u&&u.roomName&&u.roomName===e.room?"".concat(c.activeCardText," "):"";return(0,w.jsx)(x.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,className:c.outerContainer,children:(0,w.jsxs)("div",{className:c.personCard+" "+l,onClick:s,children:[(0,w.jsx)(v.Z,{src:t&&t[0]&&t[0].image||k,className:c.avatar}),(0,w.jsxs)("div",{className:c.rightContainer,children:[(0,w.jsxs)("div",{className:d+c.upperDiv,children:[(0,w.jsx)("div",{className:d+c.name,children:function(e){var t="";return e&&e.length&&e.forEach((function(n,r){t=t+n.name+"".concat(e.length>1&&r!==e.length-1?", ":"")})),t}(t)}),(0,w.jsxs)("div",{className:d+c.lastTime,children:[r?Z()(r).format("hh:mm a"):"-"," ",(0,w.jsx)("br",{}),r?Z()(r).format("MMM, DD yyyy"):"-"]})]}),(0,w.jsx)("div",{className:d+c.lastMsg,children:a?a.slice(0,25):"-"})]})]})},n)},b=n(56960),j=n(59089),S=n(46721),N=function(){return function(){var e=(0,s.Z)(d().mark((function e(t){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:S.xe,payload:{data:{msgs:[],id:"",name:"",roomName:"",img:"",sid:"",group:!1,active:!1}}});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},M=function(e,t,n,r,a,i,o){var c=arguments.length>7&&void 0!==arguments[7]&&arguments[7],u=arguments.length>8&&void 0!==arguments[8]?arguments[8]:"";return function(){var l=(0,s.Z)(d().mark((function s(l){var m;return d().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,(0,j.h)("message?roomName=".concat(e),{},"get");case 3:(m=s.sent)&&m.code&&200===m.code&&m.success?l({type:S.xe,payload:{data:{msgs:m.data,id:t,name:n,roomName:e,img:r,sid:a,group:i,active:o,hippa:c,role:u}}}):b.Am.error(m&&m.message||S.VQ),s.next=10;break;case 7:s.prev=7,s.t0=s.catch(0),b.Am.error(S.VQ);case 10:case"end":return s.stop()}}),s,null,[[0,7]])})));return function(e){return l.apply(this,arguments)}}()},E=function(){return function(){var e=(0,s.Z)(d().mark((function e(t){var n;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,j.h)("message-allRoom",{},"get");case 3:if(!((n=e.sent)&&n.code&&200===n.code&&n.success)){e.next=9;break}return t({type:S.tM,payload:{data:n.data}}),e.abrupt("return",n.data);case 9:b.Am.error(n&&n.message||S.VQ);case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),b.Am.error(S.VQ);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}()},R=function(e){return function(){var t=(0,s.Z)(d().mark((function t(n){var r;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,j.h)("message_room",e,"post");case 3:if(!((r=t.sent)&&r.code&&200===r.code&&r.success)){t.next=8;break}return t.abrupt("return",r.data);case 8:b.Am.error(r&&r.message||S.VQ);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),b.Am.error(S.VQ);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},I=function(e){return function(){var t=(0,s.Z)(d().mark((function t(n){var r;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,j.h)("update-readStatus",e,"put");case 3:(r=t.sent)&&r.code&&200===r.code&&r.success||b.Am.error(r&&r.message||S.VQ),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),b.Am.error(S.VQ);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},W=function(e){return function(){var t=(0,s.Z)(d().mark((function t(n){var r;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,j.h)("leave-delete-chat",e,"put");case 3:(r=t.sent)&&r.code&&200===r.code&&r.success||b.Am.error(r&&r.message||S.VQ),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),b.Am.error(S.VQ);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},z=function(e){return function(){var t=(0,s.Z)(d().mark((function t(n){var r;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,j.h)("socket-upload",e,"postMultipart");case 3:if(!((r=t.sent)&&r.code&&200===r.code&&r.success)){t.next=8;break}return t.abrupt("return",r.data);case 8:b.Am.error(r&&r.message||S.VQ);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),b.Am.error(S.VQ);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},D=function(e){return function(){var t=(0,s.Z)(d().mark((function t(n){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{n({type:"GET_NEW_SEARCH_STRING",payload:{data:e}})}catch(r){}case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},H=function(e){return function(){var t=(0,s.Z)(d().mark((function t(n){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{n({type:"CLEAR_MSG_SEARCH",payload:{data:e}})}catch(r){}case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},T=(0,m.Z)((function(e){return{chatHbody:{textAlign:"left",padding:"10px",width:"100%",minHeight:"500px",maxHeight:"880px",overflowX:"auto"}}})),V=function(){var e=(0,o.v9)((function(e){return e.msg.rooms})),t=T(),n=(0,o.I0)(),a=(0,r.DE)({getMsgs:M},n),c=function(){var e=(0,s.Z)(d().mark((function e(t){var n;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="",t.name&&t.name.length&&t.name.forEach((function(e,r){n=n+e.name+"".concat(t.name.length>1&&r!==t.name.length-1?", ":"")})),e.next=4,a.getMsgs(t.room,t.id||"",n,t&&t.name&&t.name[0]&&t.name[0].image||"",t.group?"":t.rid||"",t.group||!1,t.active||!1,!!(t&&t.name&&t.name[0])&&t.name[0].hippa,t&&t.name&&t.name[0]?t.name[0].role:"");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,w.jsx)(x.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,className:t.chatHbody,children:e&&e.length&&e.map((function(e){return(0,i.createElement)(C,(0,h.Z)((0,h.Z)({},e),{},{key:e.id,selRoom:function(){return c(e)}}))}))})},L=n(27391),Q=(0,m.Z)((function(e){return{pluseIcon:{height:"18px",width:"18px",marginRight:"2px",marginTop:"2px"},pluseButtonContainer:{display:"inline-flex",fontSize:"14px",fontWeight:600},headerMsgDiv:{fontSize:"24px",fontWeight:600,fontStretch:"normal",fontStyle:"normal",lineHeight:1.5,letterSpacing:"0.1px",textAlign:"center",color:"#171725"},leftHeaderDiv:{display:"flex",justifyContent:"space-between"}}})),B=function(){var e=Q(),t=(0,i.useState)(""),n=(0,c.Z)(t,2),a=n[0],s=n[1],u=(0,o.I0)(),l=(0,r.DE)({searchMsg:D,setResetSearch:H},u);return(0,i.useEffect)((function(){l.searchMsg(a),a?l.setResetSearch(!1):l.setResetSearch(!0)}),[a]),(0,w.jsxs)(x.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,marginBottom:2,children:[(0,w.jsx)("div",{className:e.leftHeaderDiv,children:(0,w.jsx)("div",{className:e.headerMsgDiv,children:"Message"})}),(0,w.jsx)(L.Z,{type:"text",variant:"outlined",fullWidth:!0,placeholder:"Search Messages",value:a,onChange:function(e){return s(e.target.value)}})]})},_=n(13400),U=n(65117),O=n(23786),P=n(7607),F=n(80761),G=n(91874),K={overflow:"visible",filter:"drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",mt:1,"& .MuiAvatar-root":{width:32,height:32,ml:-.5,mr:1},"&:before":{content:'""',display:"block",position:"absolute",top:0,right:14,width:10,height:10,bgcolor:"background.paper",zIndex:0}},J=(0,m.Z)((function(e){return{headerContainer:{display:"flex",justifyContent:"space-between",textAlign:"center"},innerContainer:{display:"flex",gap:"10px"},icon:{width:"19.1px",height:"20px",color:"#92929d",margin:"auto",marginRight:"15px"},avatar:{width:"36px",height:"36px",margin:"auto"},name:{fontSize:"18px",fontWeight:600,fontStretch:"normal",fontStyle:"normal",lineHeight:"normal",letterSpacing:"normal",textAlign:"left",color:"#171725",margin:"auto"},statusDiv:{fontSize:"14px",fontWeight:"normal",fontStretch:"normal",fontStyle:"normal",lineHeight:"normal",letterSpacing:"0.1px",textAlign:"left",color:"#696974",margin:"auto"},separator:{width:"1px",height:"20px",backgroundColor:"#d8d8d8",margin:"auto"}}})),Y=function(e){var t=e.handleReload,n=e.online,a=J(),u=(0,o.v9)((function(e){return e.msg.selRoom})),l=(0,o.v9)((function(e){return e.auth.user.role})),m=(0,o.v9)((function(e){return e.msg.clients})),p=(0,i.useState)([]),f=(0,c.Z)(p,2),g=f[0],y=f[1],Z=(0,o.I0)(),A=(0,r.DE)({leaveOrdelete:W,clearMsgs:N,getClients:F.ZL,addClient:F.ZF,deleteClient:F.Nu},Z),C=(0,i.useState)(null),b=(0,c.Z)(C,2),j=b[0],S=b[1],M=(0,i.useState)(!1),E=(0,c.Z)(M,2),R=E[0],I=E[1];(0,i.useEffect)((function(){if(m){for(var e=[],t=0;t<m.length;t++)m[t]&&m[t].userId&&m[t].userId._id&&e.push(m[t].userId._id);y((function(){return e}))}}),[m]);var z=function(){var e=(0,s.Z)(d().mark((function e(t,n){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D(),!n){e.next=11;break}if(!t){e.next=7;break}return e.next=5,A.addClient(n);case 5:e.next=9;break;case 7:return e.next=9,A.deleteClient(n);case 9:return e.next=11,A.getClients();case 11:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),D=function(){S(null),I(!1)},H=function(){var e=(0,s.Z)(d().mark((function e(n){var r;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(),r={roomName:u.roomName,delete:n},e.next=4,A.leaveOrdelete(r);case 4:return e.next=6,A.clearMsgs();case 6:t(!1);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,w.jsx)(x.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,marginBottom:4,marginLeft:2,children:(0,w.jsxs)("div",{className:a.headerContainer,children:[(0,w.jsxs)("div",{className:a.innerContainer,children:[(0,w.jsx)(v.Z,{className:a.avatar,src:u&&u.img||k}),(0,w.jsxs)("div",{className:a.name,children:[" ",u&&u.name||"-"," ",u.hippa?(0,w.jsx)("img",{src:G,style:{margin:"auto",marginLeft:"0px",marginRight:"0"}}):null," "]}),(0,w.jsx)("div",{className:a.separator}),(0,w.jsx)("div",{className:a.statusDiv,children:u.sid?n&&n.length&&n.find((function(e){return e===u.sid}))?"Online":"Offline":""})]}),u?(0,w.jsxs)("div",{className:a.innerContainer,children:[(0,w.jsx)(_.Z,{onClick:function(e){S(e.currentTarget),I(!0)},children:(0,w.jsx)(P.Z,{className:a.icons})}),(0,w.jsxs)(U.Z,{open:R,anchorEl:j,onClose:D,PaperProps:{elevation:0,sx:(0,h.Z)({},K)},transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:[u.group&&u.active?(0,w.jsx)(O.Z,{onClick:function(){return H(!1)},children:"Leave Chat"}):null,!u.group&&l&&"provider"===l&&u.sid&&"provider"!==u.role&&"string"===typeof u.sid&&(0,w.jsx)(O.Z,{onClick:function(){return z(!g.find((function(e){return e===u.sid})),u.sid)},children:g&&g.length&&g.find((function(e){return e===u.sid}))?"Remove Client":"Add Client"}),(0,w.jsx)(O.Z,{onClick:function(){return H(!!u.group)},children:"Delete Chat"})]})]}):null]})})},q=n(80813),X=(0,m.Z)((function(e){var t;return{senderCotainer:{display:"flex",justifyContent:"flex-end",marginRight:"10px"},sendAvatar:{width:"32px",height:"32px",position:"relative",left:15,top:15},senderMessageContainer:{margin:"15px 0px 15px 0px",textAlign:"left",padding:"15px 19px 15px 19.1px",border:"solid 1px #e2e2ea",backgroundColor:"#fff",borderRadius:"20px",fontSize:"14px",fontWeight:"normal",fontStretch:"normal",fontStyle:"normal",lineHeight:"1.71",letterSpacing:"0.1px",color:"#44444f",maxWidth:"80%",overflow:"auto",wordBreak:"break-all"},senderTime:{margin:"auto",marginLeft:"2px",marginRight:0},reCotainer:{display:"flex"},reAvatar:{width:"32px",height:"32px",position:"relative",left:15,top:15},reMessageContainer:(t={margin:"15px 0px 15px 0px",textAlign:"left",padding:"15px 19px 15px 19.1px",border:"solid 1px #e2e2ea",backgroundColor:"#fff",borderRadius:"20px",fontSize:"14px",fontWeight:"normal",fontStretch:"normal",fontStyle:"normal",lineHeight:"1.71",letterSpacing:"0.1px"},(0,u.Z)(t,"textAlign","left"),(0,u.Z)(t,"color","#44444f"),(0,u.Z)(t,"maxWidth","80%"),(0,u.Z)(t,"overflow","auto"),t),reTime:{fontSize:"10px",marginLeft:"auto",textAlign:"right",color:"black",fontWeight:600}}})),$=function(e){var t=X();return(0,w.jsx)("div",{className:t.senderCotainer,children:(0,w.jsx)("div",{className:t.senderCotainer,children:(0,w.jsxs)("div",{className:t.senderMessageContainer,children:[e.imageFlag?/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(e.text)?(0,w.jsx)("img",{src:e.text,style:{maxHeight:"400px",maxWidth:"400px",cursor:"pointer"},onClick:function(){return window.open(e.text)}}):(0,w.jsx)(q.Z,{fontSize:"large",style:{cursor:"pointer"},onClick:function(){return window.open(e.text)}}):e.text," ",(0,w.jsxs)("div",{className:t.reTime,children:[e.time?Z()(e.time).format("MMM, DD yyyy"):""," ",(0,w.jsx)("br",{}),e.time?Z()(e.time).format("hh:mm a"):""]})]})})})},ee=(0,m.Z)((function(e){var t;return{reCotainer:{display:"flex",marginLeft:"10px"},reAvatar:{width:"32px",height:"32px",position:"relative",right:15,top:15},reMessageContainer:(t={margin:"0px 0px 15px 0px",textAlign:"left",padding:"15px 19px 15px 19.1px",border:"solid 1px #e2e2ea",backgroundColor:"#f1f1f5",borderRadius:"20px",fontSize:"14px",fontWeight:"normal",fontStretch:"normal",fontStyle:"normal",lineHeight:"1.71",letterSpacing:"0.1px"},(0,u.Z)(t,"textAlign","left"),(0,u.Z)(t,"color","#44444f"),(0,u.Z)(t,"maxWidth","80%"),(0,u.Z)(t,"wordBreak","break-all"),(0,u.Z)(t,"overflow","auto"),t),reTime:{fontSize:"10px",marginLeft:"auto",textAlign:"right",color:"black",fontWeight:600},reMsg:{marginLeft:"8px",fontSize:"10px",marginRight:"auto",textAlign:"left",color:"green",fontWeight:600}}})),te=function(e){var t=ee();return(0,w.jsx)("div",{className:t.reCotainer,children:(0,w.jsx)("div",{className:t.reCotainer,children:(0,w.jsxs)("div",{children:[(0,w.jsx)("div",{className:t.reMsg,children:e.senderId&&e.senderId.name}),(0,w.jsxs)("div",{className:t.reMessageContainer,children:[e.imageFlag?/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(e.text)?(0,w.jsx)("img",{src:e.text,style:{maxHeight:"400px",maxWidth:"400px",cursor:"pointer"},onClick:function(){return window.open(e.text)}}):(0,w.jsx)(q.Z,{fontSize:"large",style:{cursor:"pointer"},onClick:function(){return window.open(e.text)}}):e.text," ",(0,w.jsxs)("div",{className:t.reTime,children:[e.time?Z()(e.time).format("MMM, DD yyyy"):""," ",(0,w.jsx)("br",{}),e.time?Z()(e.time).format("hh:mm a"):""]})]})]})})})},ne=n(89701),re=function(e){var t=e.message,n=e.cu,r=(0,o.v9)((function(e){return e.msg.searchString})),a=(0,i.useState)([]),s=(0,c.Z)(a,2),u=s[0],l=s[1],d=(0,i.useState)(!1),m=(0,c.Z)(d,2),p=m[0],f=m[1],v=(0,o.v9)((function(e){return e.msg.clear})),y=new ne.Z({fields:["text"],storeFields:["_id","text","activeUserId","imageFlag","room","senderId","socketId","status","time"],searchOptions:{prefix:!0,fuzzy:.2}}),Z=t.map((function(e){return(0,h.Z)((0,h.Z)({},e),{},{id:e._id})}));y.addAll(Z),(0,i.useEffect)((function(){k()}),[e]);var k=function(){var e=document.getElementById("needScroll");e.scrollTop=e.scrollHeight};return(0,i.useEffect)((function(){if(r&&r.length&&t&&t.length){var e=y.search(r);l((function(){return e})),f(!0)}}),[r]),(0,i.useEffect)((function(){v&&(l([]),f(!1))}),[v]),(0,i.useEffect)((function(){k()}),[p]),(0,w.jsxs)(x.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,marginTop:2,children:[(0,w.jsx)("div",{id:"needScroll",style:{height:"850px",overflow:"auto"},children:p?u&&u.length?u.map((function(e){return e.senderId?e.senderId._id===n.id?(0,i.createElement)($,(0,h.Z)((0,h.Z)({},e),{},{key:e._id})):(0,i.createElement)(te,(0,h.Z)((0,h.Z)({},e),{},{key:e._id})):null})):(0,w.jsx)("h5",{children:"No Message"}):t&&t.length?t.map((function(e){return e.senderId?e.senderId._id===n.id?(0,i.createElement)($,(0,h.Z)((0,h.Z)({},e),{},{key:e._id})):(0,i.createElement)(te,(0,h.Z)((0,h.Z)({},e),{},{key:e._id})):null})):(0,w.jsx)("h5",{children:"No Message"})}),(0,w.jsx)(g.Z,{})]})},ae=n(76526),ie=n(45644),oe=n(4110),se=n(63466),ce=n(23701),ue=n(48205),le=function(e){var t=e.socket,n=e.cu,a=e.ms,u=(0,i.useState)(""),l=(0,c.Z)(u,2),m=l[0],p=l[1],f=(0,i.useState)(!1),g=(0,c.Z)(f,2),v=g[0],y=g[1],Z=(0,o.I0)(),k=(0,r.DE)({sendFileApi:z},Z),A=function(e){if(e&&e.preventDefault(),m){var r={senderId:n.id,text:m,room:a.roomName,time:(new Date).toString(),imageFlag:!1};p(""),t.emit("sendMessage",r,(function(){return p("")}))}};(0,i.useEffect)((function(){var e=document.getElementById("my-file");return e&&e.addEventListener("change",C),function(){e&&e.removeEventListener("change",C)}}),[a,v]);var C=function(){var e=(0,s.Z)(d().mark((function e(r){var i,o,s,c;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=r&&r.target.files[0]||"",o=!!i.size&&i.size/1024/1024,!(i&&o&&o<25)){e.next=18;break}return y(!0),(s=new FormData).append("image",i),s.append("senderId",n.id),s.append("text",""),s.append("room",a.roomName),s.append("time",(new Date).toString()),s.append("imageFlag",!0),e.next=13,k.sendFileApi(s);case 13:(c=e.sent)&&t.emit("sendMessage",(0,h.Z)((0,h.Z)({},c),{},{alreadySaved:!0}),(function(e){})),y(!1),e.next=19;break;case 18:b.Am.error("You Only Upload Upto 25Mb Document");case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,w.jsx)(x.ZP,{item:!0,lg:12,md:12,sm:12,xs:12,marginTop:2,children:(0,w.jsx)("div",{style:{display:"flex",gap:"10px",margin:"10px"},children:a.active?v?(0,w.jsx)(ue.Z,{}):(0,w.jsx)(oe.Z,{id:"standard-adornment-amount",placeholder:"Write messages down here\u2026",fullWidth:!0,endAdornment:(0,w.jsxs)(se.Z,{position:"end",children:[(0,w.jsxs)(ce.Z,{onClick:function(){document.getElementById("my-file").click()},children:[(0,w.jsx)(ae.Z,{}),(0,w.jsx)("input",{type:"file",hidden:!0,multiple:!1,id:"my-file"})]}),(0,w.jsx)(ce.Z,{onClick:function(){return A()},children:(0,w.jsx)(ie.Z,{})})]}),style:{borderRadius:"3px",border:"solid 1px #d5d5dc",backgroundColor:"#fafafb",paddingLeft:"8px"},color:"success",value:m,onChange:function(e){return p(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?A(e):null}}):(0,w.jsx)("h2",{style:{margin:"auto"},children:"You have already left this group."})})})},de=(0,m.Z)((function(e){return{msgCard:{background:"white",borderRadius:"5px",padding:"21px 10px 21px 10px",minWidth:"800px",overflow:"auto"},pluseIcon:{height:"18px",width:"18px",marginRight:"2px",marginTop:"2px"},pluseButtonContainer:{display:"inline-flex",fontSize:"14px",fontWeight:600},headerMsgDiv:{fontSize:"24px",fontWeight:600,fontStretch:"normal",fontStyle:"normal",lineHeight:1.5,letterSpacing:"0.1px",textAlign:"center",color:"#171725"}}})),me=function(e){var t=e.socket,n=e.cu,a=e.handleReload,s=e.online,u=de(),l=(0,o.I0)(),d=(0,r.DE)({readStatus:I},l),m=(0,o.v9)((function(e){return e.msg.selRoom})),p=(0,i.useState)(""),h=(0,c.Z)(p,2),v=h[0],y=h[1],Z=(0,i.useState)([]),k=(0,c.Z)(Z,2),A=k[0],C=k[1];return(0,i.useEffect)((function(){m&&v!==m.id&&(y(m.id),C((function(){return m.msgs})),m.roomName&&d.readStatus({roomName:m.roomName}),m.active&&t.emit("CLIENT_JOINED",{room:m.roomName}))}),[m]),(0,i.useEffect)((function(){m.active&&t.on("new_message",(function(e){C((function(t){return[].concat((0,f.Z)(t),[e])}))}))}),[]),(0,w.jsx)("div",{className:u.msgCard,children:(0,w.jsxs)(x.ZP,{container:!0,className:u.msgContainer,children:[(0,w.jsxs)(x.ZP,{item:!0,lg:3.5,md:3.5,xs:3.5,sm:3.5,children:[(0,w.jsx)(B,{}),(0,w.jsx)(V,{})]}),(0,w.jsx)(x.ZP,{item:!0,lg:.1,md:.1,xs:.1,sm:.1,children:(0,w.jsx)("div",{style:{height:"100%"},children:(0,w.jsx)(g.Z,{orientation:"vertical",variant:"fullWidth"})})}),(0,w.jsxs)(x.ZP,{item:!0,lg:8.4,md:8.4,xs:8.4,sm:8.4,justifyContent:"flex-start",children:[(0,w.jsx)(Y,{handleReload:a,online:s}),(0,w.jsx)(re,{message:A,cu:n}),(0,w.jsx)(le,{socket:t,cu:n,ms:m})]})]})})},pe=(0,i.memo)(me),fe=n(23197),xe=n(13623),ge=n(21584),he=n(27705),ve=(0,m.Z)((function(e){return{mainContianer:{height:"100%",width:"100%",background:"#fafafb",fontFamily:"Montserrat"},subContainer:(0,u.Z)({padding:"4em 0px 2em 0px",width:"90%",textAlign:"center",margin:"auto",overflow:"auto"},e.breakpoints.down("lg"),{width:"99%"})}})),ye=xe.io.connect(fe.Z.socketUrl),Ze=function(){var e=ve(),t=(0,p.UO)(),n=(0,i.useState)(!0),a=(0,c.Z)(n,2),u=a[0],l=a[1],m=(0,i.useState)(""),f=(0,c.Z)(m,2),x=f[0],g=f[1],h=(0,i.useState)([]),v=(0,c.Z)(h,2),y=v[0],Z=v[1],k=(0,o.I0)(),A=(0,r.DE)({getMsgs:M,getRooms:E,checkRoom:R,getIdRole:ge._t,getClients:F.ZL},k),C=(0,o.v9)((function(e){return e.auth.user})),b=function(e){var t="";return e&&e.length&&e.forEach((function(n,r){t=t+n.name+"".concat(e.length>1&&r!==e.length-1?", ":"")})),t},j=function(){var e=(0,s.Z)(d().mark((function e(n){var r,a,i,o,s,u,m,p;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l(!0),r=A.getIdRole(),g((function(){return r})),a=t.id.split("-"),i=(0,c.Z)(a,2),o=i[0],s=i[1],u={},!(o&&s&&n)){e.next=9;break}return e.next=8,A.checkRoom({userId:[s],group:!1,roomName:"".concat(o,"-").concat(s)});case 8:u=e.sent;case 9:return e.next=11,A.getRooms();case 11:if(m=e.sent,!(o&&s&&u&&u.room)){e.next=17;break}return e.next=15,A.getMsgs(u.room,u.userId[0]._id||"",u.userId[0].name||"",u.image||"",u.userId[0]._id||"",u.group||!1,u.active||!1,u.userId[0].hippa||!1,u.userId[0].role||"");case 15:e.next=31;break;case 17:if(!(m&&m.length&&m[0]&&m[0].room)){e.next=31;break}if("xyz"!==t.id&&n){e.next=23;break}return e.next=21,A.getMsgs(m[0].room,m[0].id,b(m[0].name),m[0].name&&m[0].name[0]&&m[0].name[0].image||"",m[0].group?"":m[0].rid||"",m[0].group||!1,m[0].active||!1,!(!m[0].name||!m[0].name[0])&&m[0].name[0].hippa,m[0].name&&m[0].name[0]?m[0].name[0].name:"");case 21:e.next=31;break;case 23:if(!(p=m.find((function(e){return e.room===t.id})))){e.next=29;break}return e.next=27,A.getMsgs(p.room,p.id,b(p.name),p.name&&p.name[0]&&p.name[0].image||"",p.group?"":p.rid||"",p.group||!1,p.active||!1,!(!p.name||!p.name[0])&&p.name[0].hippa,p.name&&p.name[0]?p.name[0].role:"");case 27:e.next=31;break;case 29:return e.next=31,A.getMsgs(m[0].room,m[0].id,b(m[0].name),m[0].name&&m[0].name[0]&&m[0].name[0].image||"",m[0].group?"":m[0].rid||"",m[0].group||!1,m[0].active||!1,!(!m[0].name||!m[0].name[0])&&m[0].name[0].hippa,m[0].name&&m[0].name[0]?m[0].name[0].role:"");case 31:l(!1);case 32:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){C&&j(!0)}),[t]),(0,i.useEffect)((function(){var e=A.getIdRole().id;e&&(ye.emit("newUser",{senderId:e}),ye.on("allUser",(function(e){Z((function(){return Object.keys(e)}))}))),C&&"provider"===C.role&&S()}),[]);var S=function(){var e=(0,s.Z)(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.getClients();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,w.jsx)("div",{className:e.mainContianer,children:(0,w.jsx)("div",{className:e.subContainer,children:u?(0,w.jsx)(he.Z,{}):(0,w.jsx)(pe,{socket:ye,cu:x,handleReload:C?j:null,online:y||[]})})})},ke=function(e){var t=(0,o.I0)(),n=(0,r.DE)({setTitle:a.T},t);return(0,i.useEffect)((function(){n.setTitle({title:e.title})}),[]),(0,w.jsx)(Ze,{})}},80761:function(e,t,n){n.d(t,{Nu:function(){return d},ZF:function(){return m},ZL:function(){return u},ud:function(){return l}});var r=n(15861),a=n(87757),i=n.n(a),o=n(56960),s=n(59089),c=n(46721),u=function(e){return function(){var t=(0,r.Z)(i().mark((function t(n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,s.h)("saved-client",{},"get",e);case 3:if(!((r=t.sent)&&r.code&&200===r.code&&r.success)){t.next=9;break}return n({type:"GET_NEW_Clients",payload:{data:r.data}}),t.abrupt("return",r.data);case 9:o.Am.error(r&&r.message||c.VQ);case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),o.Am.error(c.VQ);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e){return t.apply(this,arguments)}}()},l=function(e,t){return function(){var n=(0,r.Z)(i().mark((function n(r){var a;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,s.h)("search-savedClient?keyword=".concat(e),{},"get",t);case 3:if(!((a=n.sent)&&a.code&&200===a.code&&a.success)){n.next=8;break}return n.abrupt("return",a.data);case 8:o.Am.error(a&&a.message||c.VQ);case 9:n.next=14;break;case 11:n.prev=11,n.t0=n.catch(0),o.Am.error(c.VQ);case 14:case"end":return n.stop()}}),n,null,[[0,11]])})));return function(e){return n.apply(this,arguments)}}()},d=function(e){return function(){var t=(0,r.Z)(i().mark((function t(n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,s.h)("saved-client/".concat(e),{},"delete");case 3:(r=t.sent)&&r.code&&200===r.code&&r.success?o.Am.success(r.message):o.Am.error(r&&r.message||c.VQ),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),o.Am.error(c.VQ);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},m=function(e){return function(){var t=(0,r.Z)(i().mark((function t(n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,s.h)("saved-client?clientId=".concat(e),{},"post");case 3:(r=t.sent)&&r.code&&200===r.code&&r.success?o.Am.success(r.message):o.Am.error(r&&r.message||c.VQ),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),o.Am.error(c.VQ);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}},91874:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAUCAMAAABiW0k1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUdwTCtMWyxMXCtMWytMWitMWypMWytMWytMWypKWuXp68rS1mF6hYGVnkVib5Wlrf///zhXZfL09a+8wtfd4FNueqKwt73HzOTo6p2ttNbc35afUdkAAAAKdFJOUwC+gP9A73/+v1+DWIbtAAABT0lEQVRIx9WV626DMAyF251SWl9yIwlR3/9B59BuEv1RVZVAmyUsiCN/PjHgw+HHTpcBm9nleni2Mza18fzEu2JjG09r4GVrII5r4OY8DHsDx78BrArJMYE4K7TZikvuHklJHafsZgWaZOZom7w5Lkw0RUAzT3KLaEpEc+2e/A06vwBOHtJcQEBpaCy2kmsPKEVEVlQWhnaHvim5XlRzkT3g7ZJQbd0q6qnUdvHU3CtgCGEBTjzrZGkdxRadOD9ZlASSujyRxDMC5+qCSbWUPe6JqzDrCuiSxzsKpYAzJ/GJyYtXzV2h5cjQRLgrdKwPhZjrQyG7tgL221c99Ch5OVIUsoOcLZe1tJdiPSyNqD8rSrC7YHpdoFYyEfceJpoLWwzIC3ApK8uHb2mM3f37z2I/4LA3cPef92lzgc8j+GvnAWwj+INTHd+04fg7fr8BGAwn68jiEwcAAAAASUVORK5CYII="},71777:function(e,t,n){e.exports=n.p+"static/media/person-img.48634df990cb44a7c13e.png"}}]);
//# sourceMappingURL=6031.8a58ab17.chunk.js.map