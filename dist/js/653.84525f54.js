"use strict";(self["webpackChunkbypixel"]=self["webpackChunkbypixel"]||[]).push([[653],{5653:function(e,a,l){l.r(a),l.d(a,{default:function(){return Ze}});var o=l(3396),t=l(4870),s=l(3194),n=l(6963),i=l(4336),c={__name:"mainCanvas",props:{mode:{type:Number,default:0},refresh:{type:Boolean}},emits:["changeMode","changeRefresh"],setup(e,{emit:a}){const l=e,{mode:c,refresh:u}=(0,t.BK)(l);console.log("mode.value:",c.value);let r=(0,t.qj)({scaleX:1,scaleY:1});n.Z.initCanvasData();let d=n.Z.configKonva;n.Z.fillConfigKonva();let g=n.Z.configField;n.Z.fillconfigField();let v=n.Z.configSquares;n.Z.fillConfigSquares();let f=(0,t.iH)(null),p=(0,t.iH)(null),Z=(0,t.iH)(null);(0,o.bv)((()=>{p.value.getStage().find(`.square${n.Z.latestPosition.value[0]*n.Z.squareXnum+n.Z.latestPosition.value[1]}`)[0].moveToTop(),console.log(n.Z.configSquares)}));let h=(0,t.qj)({scale:1,centerX0:0,centerY0:0,centerX:0,centerY:0,oldDistance:0}),m=(e,a)=>Math.hypot(e.x-a.x,e.y-a.y),S=(e,a)=>({x:(e.x+a.x)/2,y:(e.y+a.y)/2}),_=e=>{if(void 0==e.evt&&2==e.touches.length){let a={x:e.touches[0].clientX,y:e.touches[0].clientY},l={x:e.touches[1].clientX,y:e.touches[1].clientY},o=m(a,l);h.oldDistance=o;let t=S(a,l),s=document.querySelector("#canvasContainer").getBoundingClientRect().x,n=document.querySelector("#canvasContainer").getBoundingClientRect().y;h.centerX0=t.x-s,h.centerY0=t.y-n}},y=e=>{console.log("end:",e),void 0==e.evt&&(h.oldDistance=0,h.centerX0=0,h.centerY0=0,h.centerX=0,h.centerY=0)},q=e=>{if(void 0==e.evt){if(0!=h.oldDistance&&2==e.changedTouches.length){let a={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY},l={x:e.changedTouches[1].clientX,y:e.changedTouches[1].clientY},o=m(a,l),t=.04,s=o/h.oldDistance*t;s>1.5*t?s=1.5*t:s<.7*t&&(s=.7*t),s>1*t?h.scale=h.scale+s>4?4:h.scale+s:s<1*t&&(h.scale=h.scale-s>4?4:h.scale-s),h.scale<1&&(h.scale=1),h.scale>4&&(h.scale=4);let i=S(a,l),c=document.querySelector("#canvasContainer").getBoundingClientRect().x,u=document.querySelector("#canvasContainer").getBoundingClientRect().y;h.centerX=i.x-c,h.centerY=i.y-u,h.centerX=h.centerX0*h.scale*n.Z.fieldScale0,h.centerY=h.centerY0*h.scale*n.Z.fieldScale0,1==h.scale?(n.Z.configField.scaleX=n.Z.fieldScale0,n.Z.configField.scaleY=n.Z.fieldScale0,n.Z.configField.x=n.Z.fieldX0,n.Z.configField.y=n.Z.fieldY0,n.Z.configField.draggable=!0,n.Z.configField.dragBoundFunc=function(){return{x:n.Z.fieldX0,y:n.Z.fieldY0}}):h.scale>1&&(n.Z.configField.draggable=!1,n.Z.configField.scaleX=h.scale*n.Z.fieldScale0,n.Z.configField.scaleY=h.scale*n.Z.fieldScale0,n.Z.configField.x=h.centerX0-h.centerX,n.Z.configField.y=h.centerY0-h.centerY),h.oldDistance=o}1==e.changedTouches.length&&(1==h.scale?(n.Z.configField.draggable=!0,n.Z.configField.dragBoundFunc=function(){return{x:n.Z.fieldX0,y:n.Z.fieldY0}}):h.scale>1&&(n.Z.configField.draggable=!0,n.Z.configField.dragBoundFunc=function(e){let a=e.y;a=e.y>.3*n.Z.stageHeight?.3*n.Z.stageHeight:e.y<n.Z.stageHeight-n.Z.fieldHeight*n.Z.configField.scaleY-.3*n.Z.stageHeight?n.Z.stageHeight-n.Z.fieldHeight*n.Z.configField.scaleY-.3*n.Z.stageHeight:e.y;let l=e.x;return l=e.x>.3*n.Z.stageWidth?.3*n.Z.stageWidth:e.x<n.Z.stageWidth-n.Z.fieldWidth*n.Z.configField.scaleX-.3*n.Z.stageWidth?n.Z.stageWidth-n.Z.fieldWidth*n.Z.configField.scaleX-.3*n.Z.stageWidth:e.x,{x:l,y:a}}))}},k=()=>{for(let e=0;e<n.Z.squareYnum;e++)for(let a=0;a<n.Z.squareXnum;a++)n.Z.configSquares[e*n.Z.squareXnum+a].fill=n.Z.squareColor(e,a),n.Z.configSquares[e*n.Z.squareXnum+a].occupy=n.Z.setOccupy(e,a);n.Z.configSquares[n.Z.lastPosition.value[0]*n.Z.squareXnum+n.Z.lastPosition.value[1]].stroke="rgb(200, 200, 200)",n.Z.configSquares[n.Z.latestPosition.value[0]*n.Z.squareXnum+n.Z.latestPosition.value[1]].stroke="black",p.value.getStage().find(`.square${n.Z.latestPosition.value[0]*n.Z.squareXnum+n.Z.latestPosition.value[1]}`)[0].moveToTop()},C=()=>{i.Z.get("/canvas").then((e=>{n.Z.canvasState.value=e.data.canvas,n.Z.lastPosition.value=n.Z.latestPosition.value,n.Z.group1Num.value=e.data.pixels_num.group_1,n.Z.group2Num.value=e.data.pixels_num.group_2,n.Z.latestPosition.value=e.data.last_paint.pixel_position,console.log(n.Z.canvasState.value),k(),console.log("成功刷新画布")})).catch((e=>{console.log("发生错误",e)}))};setInterval(C,2e4),(0,o.YP)(u,(e=>{1==e&&(C(),a("changeRefresh",!1))}));let U={squareName:"square0",stroke:"rgb(200, 200, 200)",strokeWidth:2},w=()=>{1==c.value&&a("changeMode",2)};(0,o.YP)(c,((e,a)=>{if(1==e)for(let l=0;l<n.Z.squareYnum;l++)for(let e=0;e<n.Z.squareXnum;e++)3!=n.Z.configSquares[l*n.Z.squareXnum+e].occupy?n.Z.configSquares[l*n.Z.squareXnum+e].strokeWidth=2:3==n.Z.configSquares[l*n.Z.squareXnum+e].occupy&&p.value.getStage().find(`.square${l*n.Z.squareXnum+e}`)[0].moveToBottom();else if(0==e)for(let l=0;l<n.Z.squareYnum;l++)for(let e=0;e<n.Z.squareXnum;e++)3!=n.Z.configSquares[l*n.Z.squareXnum+e].occupy&&(n.Z.configSquares[l*n.Z.squareXnum+e].strokeWidth=0);if(1==e&&2==a){let e=p.value.getStage().find(`.${U.squareName}`)[0];e.attrs.strokeWidth=U.strokeWidth,e.attrs.stroke=U.stroke,e.moveToBottom()}}));let X=function(e){if(console.log("点击了这个格子",e.target.attrs.occupy),s.Z.group.value!=e.target.attrs.occupy&&3!=e.target.attrs.occupy)if(1==c.value||2==c.value){let a=e.target.attrs.name,l=a.slice(6);console.log("click this ",l);let o=Math.floor(l/n.Z.squareXnum),t=l%n.Z.squareXnum,s=[];s.push(o),s.push(t),console.log(s),n.Z.targetSquare.value=s,w();let i=p.value.getStage().find(`.${U.squareName}`)[0];i.attrs.strokeWidth=U.strokeWidth,i.attrs.stroke=U.stroke,"black"!=i.attrs.stroke&&i.moveToBottom();let c=p.value.getStage().find(`.${a}`)[0];U.squareName=c.attrs.name,U.stroke=c.attrs.stroke,U.strokeWidth=c.attrs.strokeWidth,console.log("保存当前的stroke",U.stroke),c.moveToTop(),c.attrs.strokeWidth=6,c.attrs.stroke="rgb(200, 200, 200)"}else 0==c.value&&console.log("modevalue is 0 fail to draw")};return(e,a)=>{const l=(0,o.up)("v-rect"),s=(0,o.up)("v-group"),n=(0,o.up)("v-layer"),i=(0,o.up)("v-stage");return(0,o.wg)(),(0,o.iD)("div",{ref_key:"cc",ref:f,id:"canvasContainer"},[(0,o.Wm)(i,{ref_key:"stage",ref:p,config:(0,t.SU)(d),onTouchmove:(0,t.SU)(q),onTouchstart:(0,t.SU)(_),onTouchend:(0,t.SU)(y)},{default:(0,o.w5)((()=>[(0,o.Wm)(n,{ref:"layer",config:(0,t.SU)(r)},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{ref_key:"Field",ref:Z,config:(0,t.SU)(g)},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,t.SU)(v),((e,a)=>((0,o.wg)(),(0,o.j4)(l,{key:a,config:e,onTouchend:(0,t.SU)(X)},null,8,["config","onTouchend"])))),128))])),_:1},8,["config"])])),_:1},8,["config"])])),_:1},8,["config","onTouchmove","onTouchstart","onTouchend"])],512)}}},u=l(89);const r=(0,u.Z)(c,[["__scopeId","data-v-8611dd9c"]]);var d=r,g=l(7139),v=l(9242),f=l(6265),p=l.n(f),Z=l(7816),h=l(463),m=l(4462);const S=e=>((0,o.dD)("data-v-9e097a94"),e=e(),(0,o.Cn)(),e),_={class:"situation"},y={class:"scoreBar"},q=S((()=>(0,o._)("div",{class:"gridBorder"},null,-1))),k=S((()=>(0,o._)("div",{class:"scoreTitle"},"已涂色块数目",-1))),C={class:"scoreBox"},U={class:"scoreGroup"},w=S((()=>(0,o._)("div",{class:"groupName"},"射日队",-1))),X=S((()=>(0,o._)("div",{class:"groupImg"},[(0,o._)("img",{src:Z})],-1))),x={class:"groupNum"},Y=S((()=>(0,o._)("div",{class:"vs"},"VS",-1))),T={class:"scoreGroup"},b=S((()=>(0,o._)("div",{class:"groupName"},"偷瓜队",-1))),W=S((()=>(0,o._)("div",{class:"groupImg"},[(0,o._)("img",{src:h})],-1))),B={class:"groupNum"},F=S((()=>(0,o._)("div",{class:"gridBorder"},null,-1))),H={class:"wholeView"},D={id:"canvasContainer"},N=(0,o.uE)('<div class="bottomBar" data-v-9e097a94><div class="gridBorder" data-v-9e097a94></div><div class="scrollBar" data-v-9e097a94><p class="animate" data-v-9e097a94>射日队已完成拼图!</p></div><div class="gridBorder" data-v-9e097a94></div></div>',1);var P={__name:"situation",props:{showSit:{type:Boolean}},emits:["changeShowSit"],setup(e,{emit:a}){const l=e;let{showSit:s}=(0,t.BK)(l),i=(0,t.qj)({scaleX:1,scaleY:1}),c=[];for(let o of n.Z.configSquares)c.push({x:o.x,y:o.y,width:o.width,height:o.height,fill:o.fill});let u=()=>{for(let e of n.Z.configSquares)c.fill=e.fill},r={x:0,y:0,scaleX:n.Z.configField.scaleX,scaleY:n.Z.configField.scaleX},d={width:n.Z.fieldWidth*n.Z.fieldScale0,height:n.Z.fieldHeight*n.Z.fieldScale0};(0,o.YP)(s,(e=>{if(1==e){u(),console.log("战况页面更新");let e=document.querySelector(".popupSituation");e.style.display="flex",a("changeShowSit",!1)}}));let v=()=>{let e=document.querySelector(".popupSituation");e.style.display="none"};return(e,a)=>{const l=(0,o.up)("v-rect"),s=(0,o.up)("v-group"),u=(0,o.up)("v-layer"),f=(0,o.up)("v-stage");return(0,o.wg)(),(0,o.iD)("div",_,[(0,o._)("div",y,[q,k,(0,o._)("div",C,[(0,o._)("div",U,[w,X,(0,o._)("div",x,(0,g.zw)((0,t.SU)(n.Z).group2Num),1)]),Y,(0,o._)("div",T,[b,W,(0,o._)("div",B,(0,g.zw)((0,t.SU)(n.Z).group1Num),1)])]),F]),(0,o._)("div",H,[(0,o._)("div",D,[(0,o.Wm)(f,{ref:"stage",config:(0,t.SU)(d)},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{ref:"layer",config:(0,t.SU)(i)},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{ref:"Field",config:(0,t.SU)(r)},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,t.SU)(c),((e,a)=>((0,o.wg)(),(0,o.j4)(l,{key:a,config:e},null,8,["config"])))),128))])),_:1},8,["config"])])),_:1},8,["config"])])),_:1},8,["config"])]),(0,o._)("div",{class:"clickToFade",onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(v)&&(0,t.SU)(v)(...e))})]),N,(0,o.Wm)(m.Z)])}}};const M=(0,u.Z)(P,[["__scopeId","data-v-9e097a94"]]);var I=M,R=l(1591);const $=e=>((0,o.dD)("data-v-43ba62a6"),e=e(),(0,o.Cn)(),e),L={class:"bar"},K={class:"btnBox"},V={id:"drawBtn",class:"btncenterChange"},z=["onClick"],j=$((()=>(0,o._)("h2",null,"任务",-1))),E={class:"popupTips"},A={class:"tipsText"};var G={__name:"bottomBar",props:{mode:{type:Number},refresh:{type:Boolean}},emits:["changeMode","changeRefresh"],setup(e,{emit:a}){const l=e;let i,{mode:c}=(0,t.BK)(l);1==s.Z.group.value?i="#00d599":2==s.Z.group.value&&(i="#ffc500");let u=(0,t.iH)("");if(s.Z.CDtime.value<=0)u.value="涂色";else if(s.Z.CDtime.value>0){let e=(0,t.iH)(Math.floor(s.Z.CDtime.value/60)),a=(0,t.iH)(s.Z.CDtime.value%60);a.value<10&&(a.value=`0${a.value}`),u.value=`${e.value}:${a.value}`}(0,o.YP)(s.Z.CDtime,(e=>{if(0==e||e<0)u.value="涂色";else{let e=(0,t.iH)(Math.floor(s.Z.CDtime.value/60)),a=(0,t.iH)(s.Z.CDtime.value%60);a.value<10&&(a.value=`0${a.value}`),u.value=`${e.value}:${a.value}`}}));let r=(0,t.iH)(""),d=function(e){r.value=e;let a=document.querySelector(".popupTips");a.className="popupTips scale-in-center",setTimeout((()=>{a.className="popupTips scale-out-center"}),2e3)},f=()=>{if(1==c.value)a("changeMode",0);else if(0==c.value)p().get("/user/state").then((e=>{console.log(e),1==e.data.state&&s.Z.CDtime.value<=0?a("changeMode",1):d("每位玩家每小时只能涂色一次！")})).catch((e=>{console.log(e)}));else if(2==c.value){let e={data:{position:n.Z.targetSquare.value}},l="/canvas";"true"=={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_develope&&(l="/canvaspost"),p().post(l,e).then((e=>{console.log(e),0==e.data.conflicting&&0==e.data.cooling?(d("涂色成功！"),a("changeMode",0),a("changeRefresh",!0),R.Z.getCDtime(),1==e.data.is_user_upgraded&&(s.Z.level.value=e.data.user_level),1==e.data.is_group_upgraded&&(1==s.Z.group.value&&(n.Z.group1Level.value=e.data.group_level),2==s.Z.group.value&&(n.Z.group2Level.value=e.data.group_level),s.Z.groupLevel.value=e.data.group_level)):(1==e.data.conflicting?d("你选择的方格已被你的阵营涂色，请重新选择！"):1==e.data.cooling&&d("涂色失败，请重试！"),a("changeMode",1),a("changeRefresh",!0))})).catch((e=>{console.log(e)}))}};(0,o.YP)(c,((e,a)=>{const l=document.querySelector("#drawBtn");console.log("mode change ",e),1==e&&0==a?(l.style.backgroundColor=i,u.value="涂色"):0==e&&1==a?(l.style.backgroundColor="rgb(225, 225, 225)",u.value="涂色"):2==e?u.value="确认":0==e&&2==a?(l.style.backgroundColor="rgb(225, 225, 225)",u.value="涂色"):1==e&&2==a&&(u.value="涂色")}));let Z=()=>{let e=document.querySelector(".popupTask");e.style.display="flex"},h=()=>{let e=document.querySelector(".popupTask");e.style.display="none"},m=(0,t.iH)("默认文字");p().get("/task").then((e=>{console.log("获取任务",e),m.value=e.data.task})).catch((e=>{console.log(e)}));let S=(0,t.iH)(!1),_=e=>{S.value=e},y=()=>{_(!0)},q=()=>{let e=document.querySelector(".popupSituation");e.style.display="none"};return(e,a)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",L,[(0,o._)("div",K,[(0,o._)("div",{class:"btn btnleft",onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(y)&&(0,t.SU)(y)(...e))},"战况"),(0,o._)("div",{class:"btncenter",onClick:a[1]||(a[1]=(...e)=>(0,t.SU)(f)&&(0,t.SU)(f)(...e))},[(0,o._)("div",V,(0,g.zw)((0,t.SU)(u)),1)]),(0,o._)("div",{class:"btn btnright",onClick:a[2]||(a[2]=(...e)=>(0,t.SU)(Z)&&(0,t.SU)(Z)(...e))},"任务")])]),(0,o._)("div",{class:"popupTask",onClick:a[3]||(a[3]=(...e)=>(0,t.SU)(h)&&(0,t.SU)(h)(...e))},[(0,o._)("div",{class:"taskWindow",onClick:(0,v.iM)((e=>null),["stop"])},[j,(0,o._)("p",null,(0,g.zw)((0,t.SU)(m)),1)],8,z)]),(0,o._)("div",{class:"popupSituation",onClick:a[4]||(a[4]=(...e)=>(0,t.SU)(q)&&(0,t.SU)(q)(...e))},[(0,o.Wm)(I,{showSit:(0,t.SU)(S),onChangeShowSit:(0,t.SU)(_)},null,8,["showSit","onChangeShowSit"])]),(0,o._)("div",E,[(0,o._)("div",A,(0,g.zw)((0,t.SU)(r)),1)])],64))}};const O=(0,u.Z)(G,[["__scopeId","data-v-43ba62a6"]]);var J=O;const Q={class:"infoBox"},ee={class:"userInfo"},ae={class:"infoImg"},le=["src"],oe={key:0,class:"headFrame"},te=["src"],se={class:"groupLogo"},ne=["src"],ie=["onClick"];var ce={__name:"topUserInfo",props:{logo:{},img:{}},setup(e){const a=e,{logo:l,img:i}=(0,t.BK)(a);console.log(i.value);let c=()=>{let e=document.querySelector(".popup");e.style.display="flex"},u=()=>{let e=document.querySelector(".popup");e.style.display="none"};(1==s.Z.group.value||2==s.Z.group.value)&&(s.Z.groupLevel.value=n.Z.group1Level.value);let r=(0,t.iH)(!1);return s.Z.groupLevel.value>1&&(r.value=!0),(0,o.YP)(s.Z.groupLevel,(e=>{e>1&&(r.value=!0)})),(e,a)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",Q,[(0,o._)("div",ee,[(0,o._)("div",ae,[(0,o._)("img",{class:"userImg",src:(0,t.SU)(s.Z).userImg},null,8,le),(0,t.SU)(r)?((0,o.wg)(),(0,o.iD)("div",oe,[(0,o._)("img",{class:"frameImg",src:(0,t.SU)(l)},null,8,te)])):(0,o.kq)("",!0)]),(0,o._)("div",{class:"infoText",onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(c)&&(0,t.SU)(c)(...e))},[(0,o._)("p",null,(0,g.zw)((0,t.SU)(s.Z).userName.value),1)])]),(0,o._)("div",se,[(0,o._)("img",{src:(0,t.SU)(l)},null,8,ne)])]),(0,o._)("div",{class:"popup",onClick:a[1]||(a[1]=(...e)=>(0,t.SU)(u)&&(0,t.SU)(u)(...e))},[(0,o._)("div",{class:"window",onClick:(0,v.iM)((e=>null),["stop"])},"文字文字文字文字文字",8,ie)])],64))}};const ue=(0,u.Z)(ce,[["__scopeId","data-v-52f43891"]]);var re=ue,de=l(2292);const ge={class:"gameView"},ve={class:"game"};var fe={__name:"gameView",setup(e){let a=(0,t.iH)(0),n=(0,t.iH)(!1),i=e=>{a.value=e,console.log("change mode to ",a.value)},c=e=>{n.value=e},u=(0,t.iH)(null);return console.log("在gameView时的group",s.Z.group.value),0==s.Z.group.value?de.Z.replace("/loading"):1==s.Z.group.value?u.value=l(463):2==s.Z.group.value&&(u.value=l(7816)),(e,s)=>((0,o.wg)(),(0,o.iD)("div",ge,[(0,o._)("div",ve,[(0,o.Wm)(re,{logo:(0,t.SU)(u),img:l(463)},null,8,["logo","img"]),(0,o.Wm)(d,{mode:(0,t.SU)(a),refresh:(0,t.SU)(n),onChangeMode:(0,t.SU)(i),onChangeRefresh:(0,t.SU)(c)},null,8,["mode","refresh","onChangeMode","onChangeRefresh"]),(0,o.Wm)(J,{mode:(0,t.SU)(a),refresh:(0,t.SU)(n),onChangeMode:(0,t.SU)(i),onChangeRefresh:(0,t.SU)(c)},null,8,["mode","refresh","onChangeMode","onChangeRefresh"])]),(0,o.Wm)(m.Z)]))}};const pe=(0,u.Z)(fe,[["__scopeId","data-v-2e7906b6"]]);var Ze=pe}}]);
//# sourceMappingURL=653.84525f54.js.map