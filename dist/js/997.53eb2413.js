"use strict";(self["webpackChunkbypixel"]=self["webpackChunkbypixel"]||[]).push([[997],{1997:function(e,a,l){l.r(a),l.d(a,{default:function(){return Ue}});var o=l(3396),t=l(4870),s=l(3194),n=l(1853),i=l(6963),c=l(4336),u={__name:"mainCanvas",props:{mode:{type:Number,default:0},refresh:{type:Boolean}},emits:["changeMode","changeRefresh"],setup(e,{emit:a}){const l=e,{mode:u,refresh:r}=(0,t.BK)(l);console.log("mode.value:",u.value);let d=(0,t.qj)({scaleX:1,scaleY:1});console.log("进入主页面且开始初始化数据"),i.Z.initCanvasData();let g=i.Z.configKonva;i.Z.fillConfigKonva();let v=i.Z.configField;i.Z.fillconfigField();let f=i.Z.configSquares;i.Z.fillConfigSquares();let p,Z,m=(0,t.iH)(null),h=(0,t.iH)(null),S=(0,t.iH)(null),_={squareName:"square0",squareId:-1,stroke:"#c8c8c8",strokeWidth:1},y=e=>{p=e.target.parent.attrs.x,Z=e.target.parent.attrs.y},q=(0,t.qj)({scale:1,centerX0:0,centerY0:0,centerXf:0,centerYf:0,oldDistance:0}),k=(e,a)=>Math.hypot(e.x-a.x,e.y-a.y),w=(e,a)=>({x:(e.x+a.x)/2,y:(e.y+a.y)/2}),C=e=>{if(void 0==e.evt&&(console.log("touchstart",e),2==e.touches.length)){let a={x:e.touches[0].clientX,y:e.touches[0].clientY},l={x:e.touches[1].clientX,y:e.touches[1].clientY},o=k(a,l);q.oldDistance=o;let t=w(a,l),s=document.querySelector("#canvasContainer").getBoundingClientRect().x,n=document.querySelector("#canvasContainer").getBoundingClientRect().y;q.centerX0=t.x-s,q.centerY0=t.y-n,q.centerXf=(q.centerX0-p)/q.scale*i.Z.fieldScale0,q.centerYf=(q.centerY0-Z)/q.scale*i.Z.fieldScale0}},b=e=>{console.log("end:",e),void 0==e.evt&&(q.oldDistance=0)},U=e=>{if(void 0==e.evt){if(0!=q.oldDistance&&2==e.changedTouches.length){let a={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY},l={x:e.changedTouches[1].clientX,y:e.changedTouches[1].clientY},o=k(a,l),t=.08*i.Z.squareXnum/25,s=o/q.oldDistance*t;s>1.5*t?s=1.5*t:s<.7*t&&(s=.7*t),s>1*t?q.scale=q.scale+s>4?4:q.scale+s:s<1*t&&(q.scale=q.scale-s>4?4:q.scale-s),q.scale<1&&(q.scale=1),q.scale>4*i.Z.squareXnum/25&&(q.scale=4*i.Z.squareXnum/25),1==q.scale?(i.Z.configField.scaleX=i.Z.fieldScale0,i.Z.configField.scaleY=i.Z.fieldScale0,i.Z.configField.x=i.Z.fieldX0,i.Z.configField.y=i.Z.fieldY0,i.Z.configField.draggable=!0,i.Z.configField.dragBoundFunc=function(){return{x:i.Z.fieldX0,y:i.Z.fieldY0}}):q.scale>1&&(i.Z.configField.draggable=!1,i.Z.configField.scaleX=q.scale*i.Z.fieldScale0,i.Z.configField.scaleY=q.scale*i.Z.fieldScale0,i.Z.configField.x=q.centerX0-q.centerXf*q.scale*i.Z.fieldScale0,i.Z.configField.y=q.centerY0-q.centerYf*q.scale*i.Z.fieldScale0),q.oldDistance=o}1==e.changedTouches.length&&(1==q.scale?(i.Z.configField.draggable=!0,i.Z.configField.dragBoundFunc=function(){return{x:i.Z.fieldX0,y:i.Z.fieldY0}}):q.scale>1&&(i.Z.configField.draggable=!0,i.Z.configField.dragBoundFunc=function(e){let a=e.y;a=e.y>.3*i.Z.stageHeight?.3*i.Z.stageHeight:e.y<i.Z.stageHeight-i.Z.fieldHeight*i.Z.configField.scaleY-.3*i.Z.stageHeight?i.Z.stageHeight-i.Z.fieldHeight*i.Z.configField.scaleY-.3*i.Z.stageHeight:e.y;let l=e.x;return l=e.x>.3*i.Z.stageWidth?.3*i.Z.stageWidth:e.x<i.Z.stageWidth-i.Z.fieldWidth*i.Z.configField.scaleX-.3*i.Z.stageWidth?i.Z.stageWidth-i.Z.fieldWidth*i.Z.configField.scaleX-.3*i.Z.stageWidth:e.x,{x:l,y:a}}))}},X=()=>{console.log("into drawCanvas更新画布");for(let e=0;e<i.Z.squareYnum;e++)for(let a=0;a<i.Z.squareXnum;a++)i.Z.configSquares[e*i.Z.squareXnum+a].fill=i.Z.squareColor(e,a),i.Z.configSquares[e*i.Z.squareXnum+a].occupy=i.Z.setOccupy(e,a);-1!=i.Z.latestPosition.value[0]&&-1!=i.Z.latestPosition.value[1]&&(-1!=i.Z.lastPosition.value[0]&&-1!=i.Z.lastPosition.value[1]&&(console.log("canvas.lastPosition存在"),i.Z.configSquares[i.Z.lastPosition.value[0]*i.Z.squareXnum+i.Z.lastPosition.value[1]].stroke="rgb(200, 200, 200)"),i.Z.configSquares[i.Z.latestPosition.value[0]*i.Z.squareXnum+i.Z.latestPosition.value[1]].stroke="black",h.value.getStage().find(`.square${i.Z.latestPosition.value[0]*i.Z.squareXnum+i.Z.latestPosition.value[1]}`)[0].moveToTop())},x=()=>{c.Z.get("/canvas").then((e=>{console.log("get canvas数据:",e),i.Z.canvasState.value=e.data.data.canvas,i.Z.canvasState.value.length!=i.Z.squareYnum&&(n.Z.replace("/loading"),location.reload(!0)),i.Z.lastPosition.value=i.Z.latestPosition.value,i.Z.group1Num.value=e.data.data.pixels_num.group_1,i.Z.group2Num.value=e.data.data.pixels_num.group_2,null==e.data.data.last_paint?i.Z.latestPosition.value=[-1,-1]:i.Z.latestPosition.value=e.data.data.last_paint.pixel_position,console.log("canvas.canvasState.value:",i.Z.canvasState.value),X(),console.log("成功刷新画布")})).catch((e=>{console.log("请求canvas发生错误：",e)}))};setInterval(x,2e4),(0,o.YP)(r,(e=>{1==e&&(x(),_.squareId=-1,_.squareName="square0",a("changeRefresh",!1))}));let T=()=>{1==u.value&&a("changeMode",2)};(0,o.YP)(u,((e,a)=>{if(1==e)for(let l=0;l<i.Z.squareYnum;l++)for(let e=0;e<i.Z.squareXnum;e++)3!=i.Z.configSquares[l*i.Z.squareXnum+e].occupy?i.Z.configSquares[l*i.Z.squareXnum+e].strokeWidth=1:3==i.Z.configSquares[l*i.Z.squareXnum+e].occupy&&h.value.getStage().find(`.square${l*i.Z.squareXnum+e}`)[0].moveToBottom();else if(0==e)for(let l=0;l<i.Z.squareYnum;l++)for(let e=0;e<i.Z.squareXnum;e++)3!=i.Z.configSquares[l*i.Z.squareXnum+e].occupy&&(i.Z.configSquares[l*i.Z.squareXnum+e].strokeWidth=0);if(1==e&&2==a){let e=h.value.getStage().find(`.${_.squareName}`)[0];e.attrs.strokeWidth=_.strokeWidth,e.attrs.stroke=_.stroke,e.moveToBottom()}}));let W=function(e){if(console.log("点击了这个格子",e.evt),1==u.value||2==u.value){if(s.Z.group.value!=e.target.attrs.occupy&&3!=e.target.attrs.occupy){let a=e.target.attrs.name,l=a.slice(6);console.log("click this ",l);let o=Math.floor(l/i.Z.squareXnum),t=l%i.Z.squareXnum,s=[];s.push(o),s.push(t),console.log(s),i.Z.targetSquare.value=s,T();let n=h.value.getStage();if(-1!=_.squareId){console.log("恢复上一个");let e=n.find(`.${_.squareName}`)[0];console.log("lastTarget.attrs",e.attrs),console.log("saveSquare.squareName"),e.attrs.strokeWidth=_.strokeWidth,e.attrs.stroke=_.stroke,"black"!=e.attrs.stroke&&e.moveToBottom();let a=Number(_.squareId)+Number(i.Z.squareXnum);a<i.Z.squareXnum*i.Z.squareYnum&&3==n.find(`.square${a}`)[0].attrs.occupy&&n.find(`.square${a}`)[0].moveToBottom();let l=Number(_.squareId)-Number(i.Z.squareXnum);l>=0&&3==n.find(`.square${l}`)[0].attrs.occupy&&n.find(`.square${l}`)[0].moveToBottom();let o=Number(_.squareId)-1;o>=0&&3==n.find(`.square${o}`)[0].attrs.occupy&&n.find(`.square${o}`)[0].moveToBottom();let t=Number(_.squareId)+1;t<i.Z.squareXnum*i.Z.squareYnum&&3==n.find(`.square${t}`)[0].attrs.occupy&&n.find(`.square${t}`)[0].moveToBottom()}else console.log("初次选择");let c=n.find(`.${a}`)[0];_.squareName=c.attrs.name,_.squareId=l,_.stroke=c.attrs.stroke,_.strokeWidth=c.attrs.strokeWidth,console.log("保存当前的stroke",_.stroke),c.moveToTop(),c.attrs.strokeWidth=3,c.attrs.stroke="#c8c8c8"}}else 0==u.value&&e.evt.changedTouches.length<=1&&0==e.evt.targetTouches.length&&0==s.Z.CDtime.value&&a("changeMode",1)};return(0,o.bv)((()=>{console.log("mainCanvas onMounted"),-1!=i.Z.latestPosition.value[0]&&-1!=i.Z.latestPosition.value[1]&&(h.value.getStage().find(`.square${i.Z.latestPosition.value[0]*i.Z.squareXnum+i.Z.latestPosition.value[1]}`)[0].moveToTop(),console.log(i.Z.configSquares))})),(e,a)=>{const l=(0,o.up)("v-rect"),s=(0,o.up)("v-group"),n=(0,o.up)("v-layer"),i=(0,o.up)("v-stage");return(0,o.wg)(),(0,o.iD)("div",{ref_key:"cc",ref:m,id:"canvasContainer"},[(0,o.Wm)(i,{ref_key:"stage",ref:h,config:(0,t.SU)(g),onTouchmove:(0,t.SU)(U),onTouchstart:(0,t.SU)(C),onTouchend:(0,t.SU)(b)},{default:(0,o.w5)((()=>[(0,o.Wm)(n,{ref:"layer",config:(0,t.SU)(d)},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{ref_key:"Field",ref:S,config:(0,t.SU)(v),onTouchstart:(0,t.SU)(y)},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,t.SU)(f),((e,a)=>((0,o.wg)(),(0,o.j4)(l,{key:a,config:e,onTouchend:(0,t.SU)(W)},null,8,["config","onTouchend"])))),128))])),_:1},8,["config","onTouchstart"])])),_:1},8,["config"])])),_:1},8,["config","onTouchmove","onTouchstart","onTouchend"])],512)}}},r=l(89);const d=(0,r.Z)(u,[["__scopeId","data-v-729898af"]]);var g=d,v=l(7139),f=l(9242),p=l(6265),Z=l.n(p),m=l(7816),h=l(463),S=l(1299);const _=e=>((0,o.dD)("data-v-7c33bd34"),e=e(),(0,o.Cn)(),e),y={class:"situation"},q={class:"scoreBar"},k=_((()=>(0,o._)("div",{class:"gridBorder"},null,-1))),w=_((()=>(0,o._)("div",{class:"scoreTitle"},"已涂色块数目",-1))),C={class:"scoreBox"},b={class:"scoreGroup"},U=_((()=>(0,o._)("div",{class:"groupName"},"射日队",-1))),X=_((()=>(0,o._)("div",{class:"groupImg"},[(0,o._)("img",{src:m})],-1))),x={class:"groupNum"},T=_((()=>(0,o._)("div",{class:"vs"},"VS",-1))),W={class:"scoreGroup"},Y=_((()=>(0,o._)("div",{class:"groupName"},"偷瓜队",-1))),B=_((()=>(0,o._)("div",{class:"groupImg"},[(0,o._)("img",{src:h})],-1))),D={class:"groupNum"},H=_((()=>(0,o._)("div",{class:"gridBorder"},null,-1))),F={class:"wholeView"},P={id:"canvasContainer"},M=(0,o.uE)('<div class="bottomBar" data-v-7c33bd34><div class="gridBorder" data-v-7c33bd34></div><div class="scrollBar" data-v-7c33bd34><p class="animate" data-v-7c33bd34>射日队已完成拼图!</p></div><div class="gridBorder" data-v-7c33bd34></div></div>',1);var N={__name:"situation",props:{showSit:{type:Boolean}},emits:["changeShowSit"],setup(e,{emit:a}){const l=e;let{showSit:s}=(0,t.BK)(l),n=(0,t.qj)({scaleX:1,scaleY:1}),c=[];for(let o of i.Z.configSquares)c.push((0,t.qj)({x:o.x,y:o.y,width:o.width,height:o.height,fill:o.fill}));let u=()=>{for(let e=0;e<i.Z.squareYnum;e++)for(let a=0;a<i.Z.squareXnum;a++)c[e*i.Z.squareXnum+a].fill=i.Z.configSquares[e*i.Z.squareXnum+a].fill},r=(0,t.qj)({x:0,y:0,scaleX:i.Z.configField.scaleX,scaleY:i.Z.configField.scaleX}),d=(0,t.qj)({width:i.Z.fieldWidth*i.Z.fieldScale0,height:i.Z.fieldHeight*i.Z.fieldScale0});(0,o.YP)(s,(e=>{if(1==e){u(),console.log("战况页面更新");let e=document.querySelector(".popupSituation");e.style.display="flex",a("changeShowSit",!1)}}));let g=()=>{let e=document.querySelector(".popupSituation");e.style.display="none"};return(e,a)=>{const l=(0,o.up)("v-rect"),s=(0,o.up)("v-group"),u=(0,o.up)("v-layer"),f=(0,o.up)("v-stage");return(0,o.wg)(),(0,o.iD)("div",y,[(0,o._)("div",q,[k,w,(0,o._)("div",C,[(0,o._)("div",b,[U,X,(0,o._)("div",x,(0,v.zw)((0,t.SU)(i.Z).group2Num),1)]),T,(0,o._)("div",W,[Y,B,(0,o._)("div",D,(0,v.zw)((0,t.SU)(i.Z).group1Num),1)])]),H]),(0,o._)("div",F,[(0,o._)("div",P,[(0,o.Wm)(f,{ref:"stage",config:(0,t.SU)(d)},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{ref:"layer",config:(0,t.SU)(n)},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{ref:"Field",config:(0,t.SU)(r)},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,t.SU)(c),((e,a)=>((0,o.wg)(),(0,o.j4)(l,{key:a,config:e},null,8,["config"])))),128))])),_:1},8,["config"])])),_:1},8,["config"])])),_:1},8,["config"])]),(0,o._)("div",{class:"clickToFade",onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(g)&&(0,t.SU)(g)(...e))})]),M,(0,o.Wm)(S.Z)])}}};const I=(0,r.Z)(N,[["__scopeId","data-v-7c33bd34"]]);var $=I,R={getCDtime(){c.Z.get("/user/state").then((e=>{if(console.log("get 能否draw",e),1==e.data.data.state)console.log("能draw"),s.Z.CDtime.value=0;else if(0==e.data.data.state){console.log("不能draw");let a=e.data.data.last_paint_time;a>16e11&&(a=Math.ceil(a/1e3));let l=60,o=a+l,t=Math.floor(Date.now()/1e3);console.log("下一次",o),console.log("现在",t);let n=o-t<0?0:o-t;(n>=l||n<l-2)&&(n=l-1),s.Z.CDtime.value=n,s.Z.timeGoes()}})).catch((e=>{console.log(e)}))}};const j=e=>((0,o.dD)("data-v-5f006393"),e=e(),(0,o.Cn)(),e),K={class:"bar"},L={class:"btnBox"},V={id:"drawBtn",class:"btncenterChange"},z=["onClick"],G=j((()=>(0,o._)("h2",null,"任务",-1))),O={class:"popupTips"},A={class:"tipsText"};var E={__name:"bottomBar",props:{mode:{type:Number},refresh:{type:Boolean}},emits:["changeMode","changeRefresh"],setup(e,{emit:a}){const l=e;let n,{mode:c}=(0,t.BK)(l);1==s.Z.group.value?n="#00d599":2==s.Z.group.value&&(n="#ffc500");let u=(0,t.iH)("");if(s.Z.CDtime.value<=0)u.value="填色";else if(s.Z.CDtime.value>0){let e=(0,t.iH)(Math.floor(s.Z.CDtime.value/60)),a=(0,t.iH)(s.Z.CDtime.value%60);a.value<10&&(a.value=`0${a.value}`),u.value=`${e.value}:${a.value}`}(0,o.YP)(s.Z.CDtime,(e=>{if(console.log("cd时间更新"),0==e||e<0)u.value="填色";else{let e=(0,t.iH)(Math.floor(s.Z.CDtime.value/60)),a=(0,t.iH)(s.Z.CDtime.value%60);a.value<10&&(a.value=`0${a.value}`),u.value=`${e.value}:${a.value}`}}));let r=(0,t.iH)(""),d=function(e){r.value=e;let a=document.querySelector(".popupTips");a.className="popupTips scale-in-center",setTimeout((()=>{a.className="popupTips scale-out-center"}),2e3)},g=()=>{if(1==c.value)a("changeMode",0);else if(0==c.value)Z().get("/user/state").then((e=>{console.log(e),1==e.data.data.state&&s.Z.CDtime.value<=0?a("changeMode",1):d("每位玩家每小时只能填色一次！")})).catch((e=>{console.log(e)}));else if(2==c.value){let e={position:i.Z.targetSquare.value},l="/canvas";0,Z().post(l,e).then((e=>{console.log(e),0==e.data.data.conflicting&&0==e.data.data.cooling?(d("填色成功！"),console.log("填色成功！"),a("changeMode",0),a("changeRefresh",!0),R.getCDtime(),1==e.data.data.is_user_upgraded&&(console.log("user升级了"),s.Z.level.value=e.data.data.user_level),1==e.data.data.is_group_upgraded&&(console.log("group升级了"),1==s.Z.group.value&&(i.Z.group1Level.value=e.data.data.group_level),2==s.Z.group.value&&(i.Z.group2Level.value=e.data.data.group_level),s.Z.groupLevel.value=e.data.data.group_level)):(1==e.data.data.conflicting?(d("你选择的方格已被你的阵营填色，请重新选择！"),console.log("填色失败，你选择的方格已被你的阵营填色")):1==e.data.data.cooling&&(d("填色失败，请重试！"),console.log("填色失败，同用户一小时内只能填色一次")),a("changeMode",1),a("changeRefresh",!0))})).catch((e=>{console.log(e)}))}};(0,o.YP)(c,((e,a)=>{const l=document.querySelector("#drawBtn");console.log("mode change ",e),1==e&&0==a?(l.style.backgroundColor=n,u.value="填色"):0==e&&1==a?(l.style.backgroundColor="rgb(225, 225, 225)",u.value="填色"):2==e?u.value="确认":0==e&&2==a?(l.style.backgroundColor="rgb(225, 225, 225)",u.value="填色"):1==e&&2==a&&(u.value="填色")}));let p=()=>{let e=document.querySelector(".popupTask");e.style.display="flex"},m=()=>{let e=document.querySelector(".popupTask");e.style.display="none"},h=(0,t.iH)("默认文字");Z().get("/task").then((e=>{console.log("获取任务：",e),h.value=e.data.data.task})).catch((e=>{console.log(e)}));let S=(0,t.iH)(!1),_=e=>{S.value=e},y=()=>{_(!0)},q=()=>{let e=document.querySelector(".popupSituation");e.style.display="none"};return(e,a)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",K,[(0,o._)("div",L,[(0,o._)("div",{class:"btn btnleft",onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(y)&&(0,t.SU)(y)(...e))},"战况"),(0,o._)("div",{class:"btncenter",onClick:a[1]||(a[1]=(...e)=>(0,t.SU)(g)&&(0,t.SU)(g)(...e))},[(0,o._)("div",V,(0,v.zw)((0,t.SU)(u)),1)]),(0,o._)("div",{class:"btn btnright",onClick:a[2]||(a[2]=(...e)=>(0,t.SU)(p)&&(0,t.SU)(p)(...e))},"任务")])]),(0,o._)("div",{class:"popupTask",onClick:a[3]||(a[3]=(...e)=>(0,t.SU)(m)&&(0,t.SU)(m)(...e))},[(0,o._)("div",{class:"taskWindow",onClick:(0,f.iM)((e=>null),["stop"])},[G,(0,o._)("p",null,(0,v.zw)((0,t.SU)(h)),1)],8,z)]),(0,o._)("div",{class:"popupSituation",onClick:a[4]||(a[4]=(...e)=>(0,t.SU)(q)&&(0,t.SU)(q)(...e))},[(0,o.Wm)($,{showSit:(0,t.SU)(S),onChangeShowSit:(0,t.SU)(_)},null,8,["showSit","onChangeShowSit"])]),(0,o._)("div",O,[(0,o._)("div",A,(0,v.zw)((0,t.SU)(r)),1)])],64))}};const J=(0,r.Z)(E,[["__scopeId","data-v-5f006393"]]);var Q=J,ee=l(6576);const ae=e=>((0,o.dD)("data-v-61224f20"),e=e(),(0,o.Cn)(),e),le={class:"winPageWarp"},oe={class:"winpageWarp-AD"},te={class:"winCardWarp"},se={class:"card0"},ne=["src"],ie=ae((()=>(0,o._)("div",null,"青铜哦，再接再厉！",-1))),ce={class:"card0"},ue=["src"],re=ae((()=>(0,o._)("div",null,"太棒啦，白银能手！",-1))),de={class:"card0"},ge=["src"],ve=ae((()=>(0,o._)("div",null,"OMG！已经是黄金啦！",-1))),fe={class:"backToMain"},pe={class:"toMainBtn"};var Ze={__name:"winnerPage",props:{logo:{}},setup(e){const a=e,{logo:l}=(0,t.BK)(a);let n=(0,t.iH)("");1==s.Z.group.value?(console.log("设置winpage 涂色框的颜色"),n.value="#00d599"):2==s.Z.group.value&&(console.log("设置winpage 涂色框的颜色"),n.value="#ffc500");let i=(0,t.iH)(null),c=(0,t.iH)(null),u=(0,t.iH)(null);(0,o.bv)((()=>{console.log("winner page mounted"),s.Z.groupLevel.value>=1&&(i.value.style.display="flex"),s.Z.groupLevel.value>=2&&(c.value.style.display="flex"),s.Z.groupLevel.value>=4&&(u.value.style.display="flex")})),(0,o.YP)(s.Z.groupLevel,(e=>{1==e?i.value.style.display="flex":2==e||3==e?(i.value.style.display="flex",c.value.style.display="flex"):4!=e&&5!=e||(i.value.style.display="flex",c.value.style.display="flex",u.value.style.display="flex")}));let r=()=>{document.querySelector(".popupWinerPage").style.display="none"};return(e,a)=>((0,o.wg)(),(0,o.iD)("div",le,[(0,o._)("div",oe,[(0,o.Wm)(ee.Z,{logo:(0,t.SU)(l),clickable:!1},null,8,["logo"]),(0,o._)("section",te,[(0,o._)("div",se,[(0,o._)("div",{ref_key:"card1",ref:i,class:"card1"},[(0,o._)("img",{class:"userimg",src:(0,t.SU)(s.Z).userImg},null,8,ne),ie],512)]),(0,o._)("div",ce,[(0,o._)("div",{ref_key:"card2",ref:c,class:"card2"},[(0,o._)("img",{class:"userimg",src:(0,t.SU)(s.Z).userImg},null,8,ue),re],512)]),(0,o._)("div",de,[(0,o._)("div",{ref_key:"card3",ref:u,class:"card3"},[(0,o._)("img",{class:"userimg",src:(0,t.SU)(s.Z).userImg},null,8,ge),ve],512)])]),(0,o._)("div",fe,[(0,o._)("div",pe,[(0,o._)("div",{class:"btnColor",style:(0,v.j5)({backgroundColor:(0,t.SU)(n)}),onClick:a[0]||(a[0]=(...e)=>(0,t.SU)(r)&&(0,t.SU)(r)(...e))},"填色",4)])])]),(0,o.Wm)(S.Z)]))}};const me=(0,r.Z)(Ze,[["__scopeId","data-v-61224f20"]]);var he=me;const Se={class:"popupWinerPage"};var _e={__name:"topUserInfo",props:{logo:{}},setup(e){const a=e,{logo:l}=(0,t.BK)(a);return(e,a)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(ee.Z,{logo:(0,t.SU)(l),clickable:!0},null,8,["logo"]),(0,o._)("div",Se,[(0,o.Wm)(he,{logo:(0,t.SU)(l)},null,8,["logo"])])],64))}};const ye=(0,r.Z)(_e,[["__scopeId","data-v-e714d162"]]);var qe=ye;const ke={class:"gameView"},we={class:"game fade-in"};var Ce={__name:"gameView",setup(e){let a=(0,t.iH)(0),i=(0,t.iH)(!1),c=e=>{a.value=e,console.log("change mode to ",a.value)},u=e=>{i.value=e},r=(0,t.iH)(null);console.log("在gameView时的group",s.Z.group.value),0==s.Z.group.value?(console.log("到game主页面，但是没选择group"),n.Z.replace("/loading")):1==s.Z.group.value?r.value=l(463):2==s.Z.group.value&&(r.value=l(7816));let d=new Image;d.src=l(5611);let v=new Image;return v.src=l(2912),(0,o.bv)((()=>{console.log("gameView onMounted")})),(e,l)=>((0,o.wg)(),(0,o.iD)("div",ke,[(0,o._)("div",we,[(0,o.Wm)(qe,{logo:(0,t.SU)(r)},null,8,["logo"]),(0,o.Wm)(g,{mode:(0,t.SU)(a),refresh:(0,t.SU)(i),onChangeMode:(0,t.SU)(c),onChangeRefresh:(0,t.SU)(u)},null,8,["mode","refresh","onChangeMode","onChangeRefresh"]),(0,o.Wm)(Q,{mode:(0,t.SU)(a),refresh:(0,t.SU)(i),onChangeMode:(0,t.SU)(c),onChangeRefresh:(0,t.SU)(u)},null,8,["mode","refresh","onChangeMode","onChangeRefresh"]),(0,o.Wm)(S.Z)])]))}};const be=(0,r.Z)(Ce,[["__scopeId","data-v-62b07323"]]);var Ue=be},5611:function(e,a,l){e.exports=l.p+"img/situation_border.a6fe45a2.png"},2912:function(e,a,l){e.exports=l.p+"img/win_card0.1e8e8f6c.png"}}]);
//# sourceMappingURL=997.53eb2413.js.map