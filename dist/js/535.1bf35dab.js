"use strict";(self["webpackChunkbypixel"]=self["webpackChunkbypixel"]||[]).push([[535],{8535:function(e,a,o){o.r(a),o.d(a,{default:function(){return pe}});var l=o(3396),t=o(4870),s=o(3194),n=o(6963),c=o(4336),u={__name:"mainCanvas",props:{mode:{type:Number,default:0},refresh:{type:Boolean}},emits:["changeMode","changeRefresh"],setup(e,{emit:a}){const o=e,{mode:u,refresh:i}=(0,t.BK)(o);console.log("mode.value:",u.value);let r=(0,t.qj)({scaleX:1,scaleY:1});console.log("进入主页面且开始初始化数据"),n.Z.initCanvasData();let d=n.Z.configKonva;n.Z.fillConfigKonva();let g=n.Z.configField;n.Z.fillconfigField();let v=n.Z.configSquares;n.Z.fillConfigSquares();let f,p,Z=(0,t.iH)(null),m=(0,t.iH)(null),h=(0,t.iH)(null),S=e=>{f=e.target.parent.attrs.x,p=e.target.parent.attrs.y},_=(0,t.qj)({scale:1,centerX0:0,centerY0:0,centerXf:0,centerYf:0,oldDistance:0}),y=(e,a)=>Math.hypot(e.x-a.x,e.y-a.y),q=(e,a)=>({x:(e.x+a.x)/2,y:(e.y+a.y)/2}),k=e=>{if(void 0==e.evt&&(console.log("touchstart",e),2==e.touches.length)){let a={x:e.touches[0].clientX,y:e.touches[0].clientY},o={x:e.touches[1].clientX,y:e.touches[1].clientY},l=y(a,o);_.oldDistance=l;let t=q(a,o),s=document.querySelector("#canvasContainer").getBoundingClientRect().x,c=document.querySelector("#canvasContainer").getBoundingClientRect().y;_.centerX0=t.x-s,_.centerY0=t.y-c,_.centerXf=(_.centerX0-f)/_.scale*n.Z.fieldScale0,_.centerYf=(_.centerY0-p)/_.scale*n.Z.fieldScale0}},C=e=>{console.log("end:",e),void 0==e.evt&&(_.oldDistance=0)},w=e=>{if(void 0==e.evt){if(0!=_.oldDistance&&2==e.changedTouches.length){let a={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY},o={x:e.changedTouches[1].clientX,y:e.changedTouches[1].clientY},l=y(a,o),t=.08,s=l/_.oldDistance*t;s>1.5*t?s=1.5*t:s<.7*t&&(s=.7*t),s>1*t?_.scale=_.scale+s>4?4:_.scale+s:s<1*t&&(_.scale=_.scale-s>4?4:_.scale-s),_.scale<1&&(_.scale=1),_.scale>4&&(_.scale=4),1==_.scale?(n.Z.configField.scaleX=n.Z.fieldScale0,n.Z.configField.scaleY=n.Z.fieldScale0,n.Z.configField.x=n.Z.fieldX0,n.Z.configField.y=n.Z.fieldY0,n.Z.configField.draggable=!0,n.Z.configField.dragBoundFunc=function(){return{x:n.Z.fieldX0,y:n.Z.fieldY0}}):_.scale>1&&(n.Z.configField.draggable=!1,n.Z.configField.scaleX=_.scale*n.Z.fieldScale0,n.Z.configField.scaleY=_.scale*n.Z.fieldScale0,n.Z.configField.x=_.centerX0-_.centerXf*_.scale*n.Z.fieldScale0,n.Z.configField.y=_.centerY0-_.centerYf*_.scale*n.Z.fieldScale0),_.oldDistance=l}1==e.changedTouches.length&&(1==_.scale?(n.Z.configField.draggable=!0,n.Z.configField.dragBoundFunc=function(){return{x:n.Z.fieldX0,y:n.Z.fieldY0}}):_.scale>1&&(n.Z.configField.draggable=!0,n.Z.configField.dragBoundFunc=function(e){let a=e.y;a=e.y>.3*n.Z.stageHeight?.3*n.Z.stageHeight:e.y<n.Z.stageHeight-n.Z.fieldHeight*n.Z.configField.scaleY-.3*n.Z.stageHeight?n.Z.stageHeight-n.Z.fieldHeight*n.Z.configField.scaleY-.3*n.Z.stageHeight:e.y;let o=e.x;return o=e.x>.3*n.Z.stageWidth?.3*n.Z.stageWidth:e.x<n.Z.stageWidth-n.Z.fieldWidth*n.Z.configField.scaleX-.3*n.Z.stageWidth?n.Z.stageWidth-n.Z.fieldWidth*n.Z.configField.scaleX-.3*n.Z.stageWidth:e.x,{x:o,y:a}}))}},U=()=>{console.log("into drawCanvas更新画布");for(let e=0;e<n.Z.squareYnum;e++)for(let a=0;a<n.Z.squareXnum;a++)n.Z.configSquares[e*n.Z.squareXnum+a].fill=n.Z.squareColor(e,a),n.Z.configSquares[e*n.Z.squareXnum+a].occupy=n.Z.setOccupy(e,a);-1!=n.Z.latestPosition.value[0]&&-1!=n.Z.latestPosition.value[1]&&(-1!=n.Z.lastPosition.value[0]&&-1!=n.Z.lastPosition.value[1]&&(console.log("canvas.lastPosition存在"),n.Z.configSquares[n.Z.lastPosition.value[0]*n.Z.squareXnum+n.Z.lastPosition.value[1]].stroke="rgb(200, 200, 200)"),n.Z.configSquares[n.Z.latestPosition.value[0]*n.Z.squareXnum+n.Z.latestPosition.value[1]].stroke="black",m.value.getStage().find(`.square${n.Z.latestPosition.value[0]*n.Z.squareXnum+n.Z.latestPosition.value[1]}`)[0].moveToTop())},X=()=>{c.Z.get("/canvas").then((e=>{console.log("get canvas数据:",e),n.Z.canvasState.value=e.data.data.canvas,n.Z.lastPosition.value=n.Z.latestPosition.value,n.Z.group1Num.value=e.data.data.pixels_num.group_1,n.Z.group2Num.value=e.data.data.pixels_num.group_2,null==e.data.data.last_paint?n.Z.latestPosition.value=[-1,-1]:n.Z.latestPosition.value=e.data.data.last_paint.pixel_position,console.log("canvas.canvasState.value:",n.Z.canvasState.value),U(),console.log("成功刷新画布")})).catch((e=>{console.log("请求canvas发生错误：",e)}))};setInterval(X,2e4),(0,l.YP)(i,(e=>{1==e&&(X(),a("changeRefresh",!1))}));let b={squareName:"square0",squareId:-1,stroke:"#c8c8c8",strokeWidth:2},T=()=>{1==u.value&&a("changeMode",2)};(0,l.YP)(u,((e,a)=>{if(1==e)for(let o=0;o<n.Z.squareYnum;o++)for(let e=0;e<n.Z.squareXnum;e++)3!=n.Z.configSquares[o*n.Z.squareXnum+e].occupy?n.Z.configSquares[o*n.Z.squareXnum+e].strokeWidth=1:3==n.Z.configSquares[o*n.Z.squareXnum+e].occupy&&m.value.getStage().find(`.square${o*n.Z.squareXnum+e}`)[0].moveToBottom();else if(0==e)for(let o=0;o<n.Z.squareYnum;o++)for(let e=0;e<n.Z.squareXnum;e++)3!=n.Z.configSquares[o*n.Z.squareXnum+e].occupy&&(n.Z.configSquares[o*n.Z.squareXnum+e].strokeWidth=0);if(1==e&&2==a){let e=m.value.getStage().find(`.${b.squareName}`)[0];e.attrs.strokeWidth=b.strokeWidth,e.attrs.stroke=b.stroke,e.moveToBottom()}}));let x=function(e){if(console.log("点击了这个格子",e.target.attrs.occupy),s.Z.group.value!=e.target.attrs.occupy&&3!=e.target.attrs.occupy)if(1==u.value||2==u.value){let a=e.target.attrs.name,o=a.slice(6);console.log("click this ",o);let l=Math.floor(o/n.Z.squareXnum),t=o%n.Z.squareXnum,s=[];s.push(l),s.push(t),console.log(s),n.Z.targetSquare.value=s,T();let c=m.value.getStage();if(-1!=b.squareId){console.log("恢复上一个");let e=c.find(`.${b.squareName}`)[0];console.log("lastTarget.attrs",e.attrs),console.log("saveSquare.squareName"),e.attrs.strokeWidth=b.strokeWidth,e.attrs.stroke=b.stroke,"black"!=e.attrs.stroke&&e.moveToBottom();let a=Number(b.squareId)+Number(n.Z.squareXnum);a<n.Z.squareXnum*n.Z.squareYnum&&3==c.find(`.square${a}`)[0].attrs.occupy&&c.find(`.square${a}`)[0].moveToBottom();let o=Number(b.squareId)-Number(n.Z.squareXnum);o>=0&&3==c.find(`.square${o}`)[0].attrs.occupy&&c.find(`.square${o}`)[0].moveToBottom();let l=Number(b.squareId)-1;l>=0&&3==c.find(`.square${l}`)[0].attrs.occupy&&c.find(`.square${l}`)[0].moveToBottom();let t=Number(b.squareId)+1;t<n.Z.squareXnum*n.Z.squareYnum&&3==c.find(`.square${t}`)[0].attrs.occupy&&c.find(`.square${t}`)[0].moveToBottom()}else console.log("初次选择");let u=c.find(`.${a}`)[0];b.squareName=u.attrs.name,b.squareId=o,b.stroke=u.attrs.stroke,b.strokeWidth=u.attrs.strokeWidth,console.log("保存当前的stroke",b.stroke),u.moveToTop(),u.attrs.strokeWidth=3,u.attrs.stroke="#c8c8c8"}else 0==u.value&&console.log("modevalue is 0 fail to draw")};return(0,l.bv)((()=>{-1!=n.Z.latestPosition.value[0]&&-1!=n.Z.latestPosition.value[1]&&(m.value.getStage().find(`.square${n.Z.latestPosition.value[0]*n.Z.squareXnum+n.Z.latestPosition.value[1]}`)[0].moveToTop(),console.log(n.Z.configSquares))})),(e,a)=>{const o=(0,l.up)("v-rect"),s=(0,l.up)("v-group"),n=(0,l.up)("v-layer"),c=(0,l.up)("v-stage");return(0,l.wg)(),(0,l.iD)("div",{ref_key:"cc",ref:Z,id:"canvasContainer"},[(0,l.Wm)(c,{ref_key:"stage",ref:m,config:(0,t.SU)(d),onTouchmove:(0,t.SU)(w),onTouchstart:(0,t.SU)(k),onTouchend:(0,t.SU)(C)},{default:(0,l.w5)((()=>[(0,l.Wm)(n,{ref:"layer",config:(0,t.SU)(r)},{default:(0,l.w5)((()=>[(0,l.Wm)(s,{ref_key:"Field",ref:h,config:(0,t.SU)(g),onTouchstart:(0,t.SU)(S)},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,t.SU)(v),((e,a)=>((0,l.wg)(),(0,l.j4)(o,{key:a,config:e,onTouchend:(0,t.SU)(x)},null,8,["config","onTouchend"])))),128))])),_:1},8,["config","onTouchstart"])])),_:1},8,["config"])])),_:1},8,["config","onTouchmove","onTouchstart","onTouchend"])],512)}}},i=o(89);const r=(0,i.Z)(u,[["__scopeId","data-v-17572609"]]);var d=r,g=o(7139),v=o(9242),f=o(6265),p=o.n(f),Z=o(7816),m=o(463),h=o(4462);const S=e=>((0,l.dD)("data-v-53d6cdac"),e=e(),(0,l.Cn)(),e),_={class:"situation"},y={class:"scoreBar"},q=S((()=>(0,l._)("div",{class:"gridBorder"},null,-1))),k=S((()=>(0,l._)("div",{class:"scoreTitle"},"已涂色块数目",-1))),C={class:"scoreBox"},w={class:"scoreGroup"},U=S((()=>(0,l._)("div",{class:"groupName"},"射日队",-1))),X=S((()=>(0,l._)("div",{class:"groupImg"},[(0,l._)("img",{src:Z})],-1))),b={class:"groupNum"},T=S((()=>(0,l._)("div",{class:"vs"},"VS",-1))),x={class:"scoreGroup"},Y=S((()=>(0,l._)("div",{class:"groupName"},"偷瓜队",-1))),F=S((()=>(0,l._)("div",{class:"groupImg"},[(0,l._)("img",{src:m})],-1))),B={class:"groupNum"},W=S((()=>(0,l._)("div",{class:"gridBorder"},null,-1))),D={class:"wholeView"},H={id:"canvasContainer"},P=(0,l.uE)('<div class="bottomBar" data-v-53d6cdac><div class="gridBorder" data-v-53d6cdac></div><div class="scrollBar" data-v-53d6cdac><p class="animate" data-v-53d6cdac>射日队已完成拼图!</p></div><div class="gridBorder" data-v-53d6cdac></div></div>',1);var I={__name:"situation",props:{showSit:{type:Boolean}},emits:["changeShowSit"],setup(e,{emit:a}){const o=e;let{showSit:s}=(0,t.BK)(o),c=(0,t.qj)({scaleX:1,scaleY:1}),u=[];for(let l of n.Z.configSquares)u.push((0,t.qj)({x:l.x,y:l.y,width:l.width,height:l.height,fill:l.fill}));let i=()=>{for(let e of n.Z.configSquares)u.fill=e.fill,console.log("战况页 每个格子",u.fill,e.fill)},r={x:0,y:0,scaleX:n.Z.configField.scaleX,scaleY:n.Z.configField.scaleX},d={width:n.Z.fieldWidth*n.Z.fieldScale0,height:n.Z.fieldHeight*n.Z.fieldScale0};(0,l.YP)(s,(e=>{if(1==e){i(),console.log("战况页面更新");let e=document.querySelector(".popupSituation");e.style.display="flex",a("changeShowSit",!1)}}));let v=()=>{let e=document.querySelector(".popupSituation");e.style.display="none"};return(e,a)=>{const o=(0,l.up)("v-rect"),s=(0,l.up)("v-group"),i=(0,l.up)("v-layer"),f=(0,l.up)("v-stage");return(0,l.wg)(),(0,l.iD)("div",_,[(0,l._)("div",y,[q,k,(0,l._)("div",C,[(0,l._)("div",w,[U,X,(0,l._)("div",b,(0,g.zw)((0,t.SU)(n.Z).group2Num),1)]),T,(0,l._)("div",x,[Y,F,(0,l._)("div",B,(0,g.zw)((0,t.SU)(n.Z).group1Num),1)])]),W]),(0,l._)("div",D,[(0,l._)("div",H,[(0,l.Wm)(f,{ref:"stage",config:(0,t.SU)(d)},{default:(0,l.w5)((()=>[(0,l.Wm)(i,{ref:"layer",config:(0,t.SU)(c)},{default:(0,l.w5)((()=>[(0,l.Wm)(s,{ref:"Field",config:(0,t.SU)(r)},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,t.SU)(u),((e,a)=>((0,l.wg)(),(0,l.j4)(o,{key:a,config:e},null,8,["config"])))),128))])),_:1},8,["config"])])),_:1},8,["config"])])),_:1},8,["config"])]),(0,l._)("div",{class:"clickToFade",onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(v)&&(0,t.SU)(v)(...e))})]),P,(0,l.Wm)(h.Z)])}}};const N=(0,i.Z)(I,[["__scopeId","data-v-53d6cdac"]]);var $=N,M={getCDtime(){c.Z.get("/user/state").then((e=>{if(console.log("get 能否draw",e),1==e.data.data.state)console.log("能draw"),s.Z.CDtime.value=0;else if(0==e.data.data.state){console.log("不能draw");let a=e.data.data.last_paint_time;a>16e11&&(a=Math.ceil(a/1e3));let o=60,l=a+o,t=Math.floor(Date.now()/1e3);console.log("下一次",l),console.log("现在",t),s.Z.CDtime.value=l-t<0?0:l-t,s.Z.timeGoes()}})).catch((e=>{console.log(e)}))}};const L=e=>((0,l.dD)("data-v-73566bc0"),e=e(),(0,l.Cn)(),e),R={class:"bar"},K={class:"btnBox"},j={id:"drawBtn",class:"btncenterChange"},z=["onClick"],V=L((()=>(0,l._)("h2",null,"任务",-1))),G={class:"popupTips"},E={class:"tipsText"};var O={__name:"bottomBar",props:{mode:{type:Number},refresh:{type:Boolean}},emits:["changeMode","changeRefresh"],setup(e,{emit:a}){const o=e;let c,{mode:u}=(0,t.BK)(o);1==s.Z.group.value?c="#00d599":2==s.Z.group.value&&(c="#ffc500");let i=(0,t.iH)("");if(s.Z.CDtime.value<=0)i.value="涂色";else if(s.Z.CDtime.value>0){let e=(0,t.iH)(Math.floor(s.Z.CDtime.value/60)),a=(0,t.iH)(s.Z.CDtime.value%60);a.value<10&&(a.value=`0${a.value}`),i.value=`${e.value}:${a.value}`}(0,l.YP)(s.Z.CDtime,(e=>{if(console.log("cd时间更新"),0==e||e<0)i.value="涂色";else{let e=(0,t.iH)(Math.floor(s.Z.CDtime.value/60)),a=(0,t.iH)(s.Z.CDtime.value%60);a.value<10&&(a.value=`0${a.value}`),i.value=`${e.value}:${a.value}`}}));let r=(0,t.iH)(""),d=function(e){r.value=e;let a=document.querySelector(".popupTips");a.className="popupTips scale-in-center",setTimeout((()=>{a.className="popupTips scale-out-center"}),2e3)},f=()=>{if(1==u.value)a("changeMode",0);else if(0==u.value)p().get("/user/state").then((e=>{console.log(e),1==e.data.data.state&&s.Z.CDtime.value<=0?a("changeMode",1):d("每位玩家每小时只能涂色一次！")})).catch((e=>{console.log(e)}));else if(2==u.value){let e={position:n.Z.targetSquare.value},o="/canvas";0,p().post(o,e).then((e=>{console.log(e),0==e.data.data.conflicting&&0==e.data.data.cooling?(d("涂色成功！"),console.log("涂色成功！"),a("changeMode",0),a("changeRefresh",!0),M.getCDtime(),1==e.data.data.is_user_upgraded&&(console.log("user升级了"),s.Z.level.value=e.data.data.user_level),1==e.data.data.is_group_upgraded&&(console.log("group升级了"),1==s.Z.group.value&&(n.Z.group1Level.value=e.data.data.group_level),2==s.Z.group.value&&(n.Z.group2Level.value=e.data.data.group_level),s.Z.groupLevel.value=e.data.data.group_level)):(1==e.data.data.conflicting?(d("你选择的方格已被你的阵营涂色，请重新选择！"),console.log("涂色失败，你选择的方格已被你的阵营涂色")):1==e.data.data.cooling&&(d("涂色失败，请重试！"),console.log("涂色失败，同用户一小时内只能涂色一次")),a("changeMode",1),a("changeRefresh",!0))})).catch((e=>{console.log(e)}))}};(0,l.YP)(u,((e,a)=>{const o=document.querySelector("#drawBtn");console.log("mode change ",e),1==e&&0==a?(o.style.backgroundColor=c,i.value="涂色"):0==e&&1==a?(o.style.backgroundColor="rgb(225, 225, 225)",i.value="涂色"):2==e?i.value="确认":0==e&&2==a?(o.style.backgroundColor="rgb(225, 225, 225)",i.value="涂色"):1==e&&2==a&&(i.value="涂色")}));let Z=()=>{let e=document.querySelector(".popupTask");e.style.display="flex"},m=()=>{let e=document.querySelector(".popupTask");e.style.display="none"},h=(0,t.iH)("默认文字");p().get("/task").then((e=>{console.log("获取任务：",e),h.value=e.data.data.task})).catch((e=>{console.log(e)}));let S=(0,t.iH)(!1),_=e=>{S.value=e},y=()=>{_(!0)},q=()=>{let e=document.querySelector(".popupSituation");e.style.display="none"};return(e,a)=>((0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",R,[(0,l._)("div",K,[(0,l._)("div",{class:"btn btnleft",onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(y)&&(0,t.SU)(y)(...e))},"战况"),(0,l._)("div",{class:"btncenter",onClick:a[1]||(a[1]=(...e)=>(0,t.SU)(f)&&(0,t.SU)(f)(...e))},[(0,l._)("div",j,(0,g.zw)((0,t.SU)(i)),1)]),(0,l._)("div",{class:"btn btnright",onClick:a[2]||(a[2]=(...e)=>(0,t.SU)(Z)&&(0,t.SU)(Z)(...e))},"任务")])]),(0,l._)("div",{class:"popupTask",onClick:a[3]||(a[3]=(...e)=>(0,t.SU)(m)&&(0,t.SU)(m)(...e))},[(0,l._)("div",{class:"taskWindow",onClick:(0,v.iM)((e=>null),["stop"])},[V,(0,l._)("p",null,(0,g.zw)((0,t.SU)(h)),1)],8,z)]),(0,l._)("div",{class:"popupSituation",onClick:a[4]||(a[4]=(...e)=>(0,t.SU)(q)&&(0,t.SU)(q)(...e))},[(0,l.Wm)($,{showSit:(0,t.SU)(S),onChangeShowSit:(0,t.SU)(_)},null,8,["showSit","onChangeShowSit"])]),(0,l._)("div",G,[(0,l._)("div",E,(0,g.zw)((0,t.SU)(r)),1)])],64))}};const A=(0,i.Z)(O,[["__scopeId","data-v-73566bc0"]]);var J=A;const Q={class:"infoBox"},ee={class:"userInfo"},ae={class:"infoImg"},oe={class:"headFrame"},le=["src"],te={class:"groupLogo"},se=["src"],ne=["onClick"];var ce={__name:"topUserInfo",props:{logo:{},img:{}},setup(e){const a=e,{logo:o,img:c}=(0,t.BK)(a);console.log(c.value);let u=()=>{let e=document.querySelector(".popup");e.style.display="flex"},i=()=>{let e=document.querySelector(".popup");e.style.display="none"};return 1==s.Z.group.value?s.Z.groupLevel.value=n.Z.group1Level.value:2==s.Z.group.value&&(s.Z.groupLevel.value=n.Z.group2Level.value),console.log("设置user.groupLevel",s.Z.groupLevel.value),(0,l.bv)((()=>{if(1==s.Z.group.value)try{document.querySelector(".headFrame").style.backgroundImage="url(green_frame.png)"}catch(e){console.log(e)}else if(2==s.Z.group.value)try{document.querySelector(".headFrame").style.backgroundImage="url(yellow_frame.png)"}catch(e){console.log(e)}})),(0,l.YP)(s.Z.groupLevel,(e=>{e>1&&(2==s.Z.group.value?document.querySelector(".headFrame").style.backgroundImage="url(green_frame.png)":1==s.Z.group.value&&(document.querySelector(".headFrame").style.backgroundImage="url(yellow_frame.png)"))})),(e,a)=>((0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",Q,[(0,l._)("div",ee,[(0,l._)("div",ae,[(0,l._)("div",oe,[(0,l._)("img",{class:"userImg",src:(0,t.SU)(s.Z).userImg},null,8,le)])]),(0,l._)("div",{class:"infoText",onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(u)&&(0,t.SU)(u)(...e))},[(0,l._)("p",null,(0,g.zw)((0,t.SU)(s.Z).userName.value),1)])]),(0,l._)("div",te,[(0,l._)("img",{src:(0,t.SU)(o)},null,8,se)])]),(0,l._)("div",{class:"popup",onClick:a[1]||(a[1]=(...e)=>(0,t.SU)(i)&&(0,t.SU)(i)(...e))},[(0,l._)("div",{class:"window",onClick:(0,v.iM)((e=>null),["stop"])},null,8,ne)])],64))}};const ue=(0,i.Z)(ce,[["__scopeId","data-v-f2981118"]]);var ie=ue,re=o(7312);const de={class:"gameView"},ge={class:"game fade-in"};var ve={__name:"gameView",setup(e){let a=(0,t.iH)(0),n=(0,t.iH)(!1),c=e=>{a.value=e,console.log("change mode to ",a.value)},u=e=>{n.value=e},i=(0,t.iH)(null);return console.log("在gameView时的group",s.Z.group.value),0==s.Z.group.value?(console.log("到game主页面，但是没选择group"),re.Z.replace("/loading")):1==s.Z.group.value?i.value=o(463):2==s.Z.group.value&&(i.value=o(7816)),(e,s)=>((0,l.wg)(),(0,l.iD)("div",de,[(0,l._)("div",ge,[(0,l.Wm)(ie,{logo:(0,t.SU)(i),img:o(463)},null,8,["logo","img"]),(0,l.Wm)(d,{mode:(0,t.SU)(a),refresh:(0,t.SU)(n),onChangeMode:(0,t.SU)(c),onChangeRefresh:(0,t.SU)(u)},null,8,["mode","refresh","onChangeMode","onChangeRefresh"]),(0,l.Wm)(J,{mode:(0,t.SU)(a),refresh:(0,t.SU)(n),onChangeMode:(0,t.SU)(c),onChangeRefresh:(0,t.SU)(u)},null,8,["mode","refresh","onChangeMode","onChangeRefresh"])]),(0,l.Wm)(h.Z,{class:"fade-in"})]))}};const fe=(0,i.Z)(ve,[["__scopeId","data-v-16be16d5"]]);var pe=fe}}]);
//# sourceMappingURL=535.1bf35dab.js.map