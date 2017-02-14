		var CVModel={
			Obj:{
				oMainFrame:document.getElementsByClassName('mainFrame')[0],
				oMain:document.getElementsByClassName("center")[0],
				oSelector:document.getElementById('Selector'),
				oPicture:document.getElementById('icon'),
				oImgBg:document.getElementById('img'),
				oMainTitle:document.getElementsByClassName('mainTitle')[0],
				oPicture:document.getElementById('icon'),
				oInfoShowArea:document.getElementById('infoShowArea'),
				oPopK1:document.getElementById('popAreaK1'),
				oPopK3:document.getElementById('popAreaK3'),
				oPopK4:document.getElementById('popArea25'),
				oPopK5:document.getElementById('popArea35'),
				popAreaK1Content:document.getElementById("popAreaK1Content"),
				oPopTings1:document.getElementsByClassName('popArea3'),
				oPopTings2:document.getElementsByClassName('popArea2'),
				oPopContent4:document.getElementById('popAreaK4'),
				oPopContent2:document.getElementsByClassName('popArea'),
				oContent1:document.getElementsByClassName("c1"),
				oContent5:document.getElementsByClassName("c5"),
				oContent6:document.getElementsByClassName("c6"),
				
				oBigPopOpen:document.getElementsByClassName("detailPop"),
				oBigPopArea:document.getElementsByClassName("BigPop"),
				oBigPopCloseBtn:document.getElementsByClassName("BigPopCloseBtn"),

				oPlayPause:document.getElementById('PlayPause'),
				oReset:document.getElementById('Reset'),
				oBar:document.getElementById('bar'),
				oMusicFilter:document.getElementById('musicFilter'),
			},
			Data:{
				centerColor:[
					"#9c9b2b",
					"#172590",
					"#5a6d26",
					"#72297b",
					"#B98D10",
					"#a22b22"
				],
				bgColor:[
					"#6d9332",
					"#4857BF",
					"#9c9b2b",
					"#9c2b93",
					"#d7a01e",
					"#ce3c31"				
				],
				title:[
					"职业技能",
					"过往作品",
					"期望工作",
					"联系方式",
					"兴趣爱好",
					"福利赠送"				
				],
				info1:[
					"只有想不到没有做不到",
					"其实我在想以后项目经验再多了咋办？",
					"想做的太多但要做的却只能一个",
					"对我感兴趣请联系我，一定要联系我",
					"业余生活很丰富，但到底来说还是宅男，只能自嗨",
					"如此具有冲击力的选项（色彩）切换有没有亮瞎你的眼？"
				]
			},
			Property:{
				ableToClick:true,
				switchStatus:true,
				wheelSpeed:3,
				status:0,
				oSelectordeg:0,
				tabWidth:500, //MAX 500 MIN 350
				tabChangeSpeed:10,
				centerRotation:0,
				pop3Rotation:270,
				pop2Left:260,
				pop2Top:470,
				pop2xSpeed:47,//方框缩放速度
				pop2ySpeed:26,//方框缩放速度
			},
			init:function(){
				//主题内容位置确定
				var ScreenHeight=document.body.scrollHeight;
				if (ScreenHeight>500) {
					CVModel.Obj.oMainFrame.style.marginTop=(ScreenHeight-CVModel.Obj.oMainFrame.offsetHeight)/2+'px';
				}
				var oRound=document.getElementById('imgBg');
				var rotation=0;
				var b=0;
				setInterval(function(){
					if (rotation==360) {
						rotation=0;
					}
					else{
						rotation=rotation+1.5;
					}
					document.getElementsByClassName("loadingBg")[0].style.transform=oRound.style.transform='rotate('+rotation+'deg)';

				},30);		
			},
			main:{
				//主体程序
				run:function(){
					CVModel.Obj.oMain.addEventListener('touchmove', function(ev){
						if (CVModel.Property.switchStatus) {
							CVModel.main.statusChange(ev);
						};
						return false;
					}, false);					
					CVModel.Obj.oMain.addEventListener('DOMMouseScroll', function(ev){
						if (CVModel.Property.switchStatus) {
							CVModel.main.statusChange(ev);
						};
						return false;
					}, false);
					CVModel.Obj.oMain.onmousewheel=function(ev){
						if (CVModel.Property.switchStatus) {
							CVModel.main.statusChange(ev);
						};
						return false;
					}
					CVModel.Obj.oMain.onclick=function(){
						if (CVModel.Property.ableToClick) {

							if (!CVModel.Property.switchStatus) {
								switch(CVModel.Property.status){
									case 0:CVModel.main.contentSwitch.switch0A(); break;
									case 1:CVModel.main.contentSwitch.switch1A(); break;
									case 2: break;
									case 3:CVModel.main.contentSwitch.switch3A(); break;
									case 4: break;
									case 5: break;
								}
							}
							else{
								switch(CVModel.Property.status){
									case 0:CVModel.main.contentSwitch.switch0B(); break;
									case 1:CVModel.main.contentSwitch.switch1B(); break;
									case 2:CVModel.main.contentSwitch.switch2B(); break;
									case 3:CVModel.main.contentSwitch.switch3B(); break;
									case 4:CVModel.main.contentSwitch.switch4B(); break;
									case 5:CVModel.main.contentSwitch.switch5B(); break;
								}
							}							
						};
					}
					CVModel.Obj.oPopK3.onclick=function(){
						if (CVModel.Property.ableToClick) {
							CVModel.main.contentSwitch.switch2A();
						};
					}
					CVModel.Obj.oPopK4.onclick=function(){
						if (CVModel.Property.ableToClick) {
							CVModel.main.contentSwitch.switch4A();
						};
					}					
					CVModel.Obj.oPopK5.onclick=function(){
						if (CVModel.Property.ableToClick) {
							CVModel.main.contentSwitch.switch5A();
						};
					}
					for (var i = 0; i < CVModel.Obj.oBigPopOpen.length; i++) {
						CVModel.Obj.oBigPopOpen[i].onclick=function(){
							var id="p"+this.id;
							var popContent=document.getElementById(id);
							if (popContent) {
								var opacity=0;
								popContent.style.opacity=opacity;
								popContent.style.display="block";
								var timer1 = setInterval(function(){
									if (opacity<1) {
										opacity+=0.1;
										popContent.style.opacity=opacity;
									}
									else{
										clearInterval(timer1);
										CVModel.Property.ableToClick=false;
										if (id=="p53") {
											CVModel.main.addPainter();
										};
									}
								},30);								
							};
						}						
					};
					for (var i = 0; i < CVModel.Obj.oBigPopCloseBtn.length; i++) {
						CVModel.Obj.oBigPopCloseBtn[i].onclick=function(){
							var vId;
							if (this.parentNode.className=="BigPop") {
								this.parentNode.style.display="none";
								vId=this.parentNode.id.replace("p","v");
							}
							else if(this.parentNode.parentNode.className=="BigPop"){
								this.parentNode.parentNode.style.display="none";
								vId=this.parentNode.parentNode.id.replace("p","v");
							}
							var tempContainer=null;
							var tempContainer =document.getElementById(vId);
							if (tempContainer!=null) {
								var tempSrc =tempContainer.src;
								tempContainer.src="";
								tempContainer.src=tempSrc;
							};
							CVModel.Property.ableToClick=true;
						}						
					};	
					CVModel.main.popContentFunction();
					document.getElementById("loading").style.display="none";
				},
				//状态转换
				statusChange:function(ev){
					var wheelSpeed;
					var tempStatus=CVModel.Property.status;
					if (CVModel.Property.ableToClick) {
						if (ev.wheelDelta>0) {
							wheelSpeed=CVModel.Property.wheelSpeed;
						}
						else{
							wheelSpeed=-CVModel.Property.wheelSpeed;
						}
						for (var i = 0; i < 6; i++) {
							var timer =setTimeout(function(){
								CVModel.Property.oSelectordeg+=wheelSpeed;
								CVModel.Obj.oSelector.style.transform='rotate('+(CVModel.Property.oSelectordeg)+'deg)';
								CVModel.Obj.oSelector.style.webkitTransform='rotate('+(CVModel.Property.oSelectordeg)+'deg)';
								//alert(CVModel.Obj.oSelector.style.webkitTransform);
								typeSwitch();
								if (CVModel.Property.oSelectordeg>=360) {
									CVModel.Property.oSelectordeg-=360;
								};
								if (CVModel.Property.oSelectordeg<=0) {
									CVModel.Property.oSelectordeg+=360;
								};
							}, 10);
						};
					};
					function typeSwitch(){
						if (CVModel.Property.oSelectordeg<30||CVModel.Property.oSelectordeg>=330) {
							tempStatus=0;
						}else if(CVModel.Property.oSelectordeg>=270&&CVModel.Property.oSelectordeg<330){
							tempStatus=1;
						}
						else if(CVModel.Property.oSelectordeg>=210&&CVModel.Property.oSelectordeg<270){
							tempStatus=2;
						}
						else if(CVModel.Property.oSelectordeg>=150&&CVModel.Property.oSelectordeg<210){
							tempStatus=3;
						}
						else if(CVModel.Property.oSelectordeg>=90&&CVModel.Property.oSelectordeg<150){
							tempStatus=4;
						}
						else if(CVModel.Property.oSelectordeg>=30&&CVModel.Property.oSelectordeg<90){
							tempStatus=5;
						}
						if (CVModel.Property.status!=tempStatus) {
							CVModel.Property.status=tempStatus;
							//状态切换
							//01 中心内容的切换
							CVModel.Obj.oPicture.src="img/"+CVModel.Property.status+".png";
							CVModel.Obj.oPicture.style.left=(350-CVModel.Obj.oPicture.offsetWidth)/2+'px';
							CVModel.Obj.oPicture.style.top=(350-CVModel.Obj.oPicture.offsetHeight)/2+'px';
							CVModel.Obj.oImgBg.style.backgroundColor=CVModel.Data.centerColor[CVModel.Property.status];
							//02 标题，信息提示的切换
							CVModel.Obj.oMainTitle.style.backgroundColor=CVModel.Data.centerColor[CVModel.Property.status];
							CVModel.Obj.oMainTitle.innerHTML=CVModel.Data.title[CVModel.Property.status];
							CVModel.Obj.oInfoShowArea.innerHTML=CVModel.Data.info1[CVModel.Property.status];
							//03 底色的切换
							document.getElementById("holeBackground").style.backgroundColor=CVModel.Data.bgColor[CVModel.Property.status];
						}					
					}
					return false;					
				},
				//分类切换
				contentSwitch:{
					selectorSwitch:function(fn){
						var timer1 = setInterval(function(){
						if (!CVModel.Property.switchStatus) {
							if (CVModel.Property.tabWidth<500) {
								
								CVModel.Property.tabWidth+=CVModel.Property.tabChangeSpeed;
								CVModel.Obj.oSelector.style.width=CVModel.Property.tabWidth+"px";
								CVModel.Obj.oSelector.style.height=CVModel.Property.tabWidth+"px";
								CVModel.Obj.oSelector.style.left=(500-CVModel.Property.tabWidth)/2+'px';
								CVModel.Obj.oSelector.style.top=CVModel.Obj.oSelector.style.left;
							}
							else{
								clearInterval(timer1);
								if (fn) {
									fn();
								};
							};
						}
						else{
							if (CVModel.Property.tabWidth>350) {
								CVModel.Property.tabWidth-=CVModel.Property.tabChangeSpeed;
								CVModel.Obj.oSelector.style.width=CVModel.Property.tabWidth+"px";
								CVModel.Obj.oSelector.style.height=CVModel.Property.tabWidth+"px";
								CVModel.Obj.oSelector.style.left=(500-CVModel.Property.tabWidth)/2+'px';
								CVModel.Obj.oSelector.style.top=CVModel.Obj.oSelector.style.left;
							}
							else{
								clearInterval(timer1);
								if (fn) {
									fn();
								};
							}	
						}
						}, 10);
					},
					switch0A:function(){
						CVModel.Property.ableToClick=false;
						var popWith=470;
						CVModel.Obj.popAreaK1Content.style.display="none";
						var timer1 = setInterval(function(){
							if (popWith>0) {
								popWith-=10;
								CVModel.Obj.oPopK1.style.width=popWith+"px";
							}
							else{
								clearInterval(timer1);
								CVModel.Obj.oPopK1.style.display="none";
								var centerLeft=0;
								var timer2= setInterval(function(){
									if (centerLeft<230) {
										centerLeft+=10;
										CVModel.Obj.oMain.style.left=centerLeft+"px";
									}
									else{
										clearInterval(timer2);
										CVModel.main.contentSwitch.selectorSwitch(function(){
											CVModel.Property.ableToClick=true;
											CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
										});
									}									
								}, 15);
							}
						},10);
					},
					switch0B:function(){
						CVModel.Property.ableToClick=false;
						var centerLeft=230;
						CVModel.main.contentSwitch.selectorSwitch(action1);
						function action1(){
							var timer1 = setInterval(function(){
								centerLeft-=10;
								if (centerLeft>=0) {
									CVModel.Obj.oMain.style.left=centerLeft+'px';
								}
								else{
									clearInterval(timer1);
									CVModel.Obj.oPopK1.style.display="block";
									var popWith=0;
									var timer2 =setInterval(function(){
										if (popWith<470) {
											popWith+=10;
											CVModel.Obj.oPopK1.style.width=popWith+"px";
										}
										else{
											clearInterval(timer2);
											CVModel.Obj.popAreaK1Content.style.display="block";
											CVModel.Property.ableToClick=true;
											CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
										}
									}, 10);
								}
							}, 15);
						}
					},
					switch1A:function(){
						var Status1 =false;
						var Status2 =false;
						CVModel.Property.ableToClick=false;
						CVModel.main.contentSwitch.selectorSwitch(function(){
							Status1 =true;
							endCheck();
						});
						for (var i = 0; i < CVModel.Obj.oContent1.length; i++) {
							CVModel.Obj.oContent1[i].style.display="none";
						};
						var timer1 = setInterval(function(){
							if (CVModel.Obj.oPopContent2[0].offsetHeight>0) {
								CVModel.Property.pop2Left+=CVModel.Property.pop2ySpeed;
								CVModel.Property.pop2Top+=CVModel.Property.pop2xSpeed;

								CVModel.Obj.oPopContent2[0].style.top=CVModel.Property.pop2Left+'px';
								CVModel.Obj.oPopContent2[0].style.height=(CVModel.Obj.oPopContent2[0].offsetHeight-CVModel.Property.pop2ySpeed)+'px';
								CVModel.Obj.oPopContent2[0].style.left=CVModel.Property.pop2Top+'px';
								CVModel.Obj.oPopContent2[0].style.width=(CVModel.Obj.oPopContent2[0].offsetWidth-CVModel.Property.pop2xSpeed)+'px';

								CVModel.Obj.oPopContent2[1].style.top=CVModel.Property.pop2Left+'px';
								CVModel.Obj.oPopContent2[1].style.height=(CVModel.Obj.oPopContent2[1].offsetHeight-CVModel.Property.pop2ySpeed)+'px';
								CVModel.Obj.oPopContent2[1].style.right=CVModel.Property.pop2Top+'px';
								CVModel.Obj.oPopContent2[1].style.width=(CVModel.Obj.oPopContent2[1].offsetWidth-CVModel.Property.pop2xSpeed)+'px';

								CVModel.Obj.oPopContent2[2].style.bottom=CVModel.Property.pop2Left+'px';
								CVModel.Obj.oPopContent2[2].style.height=(CVModel.Obj.oPopContent2[2].offsetHeight-CVModel.Property.pop2ySpeed)+'px';
								CVModel.Obj.oPopContent2[2].style.left=CVModel.Property.pop2Top+'px';
								CVModel.Obj.oPopContent2[2].style.width=(CVModel.Obj.oPopContent2[2].offsetWidth-CVModel.Property.pop2xSpeed)+'px';

								CVModel.Obj.oPopContent2[3].style.bottom=CVModel.Property.pop2Left+'px';
								CVModel.Obj.oPopContent2[3].style.height=(CVModel.Obj.oPopContent2[3].offsetHeight-CVModel.Property.pop2ySpeed)+'px';
								CVModel.Obj.oPopContent2[3].style.right=CVModel.Property.pop2Top+'px';
								CVModel.Obj.oPopContent2[3].style.width=(CVModel.Obj.oPopContent2[3].offsetWidth-CVModel.Property.pop2xSpeed)+'px';	
							}
							else{
								clearInterval(timer1);
								for (var i = 0; i < CVModel.Obj.oPopContent2.length; i++) {
									CVModel.Obj.oPopContent2[i].style.display="none";
								};
								Status2 =true;
								endCheck();
							}
						}, 10);
						function endCheck (){
							if (Status1&&Status2) {
								CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
								CVModel.Property.ableToClick=true;
							}
						}
					},
					switch1B:function(){
						var Status1 =false;
						var Status2 =false;
						CVModel.Property.ableToClick=false;
						CVModel.main.contentSwitch.selectorSwitch(function(){
							Status1 =true;
							endCheck();
						});
						for (var i = 0; i < CVModel.Obj.oPopContent2.length; i++) {
							CVModel.Obj.oPopContent2[i].style.display="block";
						};
						var timer1 = setInterval(function(){
							if (CVModel.Obj.oPopContent2[0].offsetHeight<260) {
								CVModel.Property.pop2Left-=CVModel.Property.pop2ySpeed;
								CVModel.Property.pop2Top-=CVModel.Property.pop2xSpeed;

								CVModel.Obj.oPopContent2[0].style.top=CVModel.Property.pop2Left+'px';
								CVModel.Obj.oPopContent2[0].style.height=(CVModel.Obj.oPopContent2[0].offsetHeight+CVModel.Property.pop2ySpeed)+'px';
								CVModel.Obj.oPopContent2[0].style.left=CVModel.Property.pop2Top+'px';
								CVModel.Obj.oPopContent2[0].style.width=(CVModel.Obj.oPopContent2[0].offsetWidth+CVModel.Property.pop2xSpeed)+'px';

								CVModel.Obj.oPopContent2[1].style.top=CVModel.Property.pop2Left+'px';
								CVModel.Obj.oPopContent2[1].style.height=(CVModel.Obj.oPopContent2[1].offsetHeight+CVModel.Property.pop2ySpeed)+'px';
								CVModel.Obj.oPopContent2[1].style.right=CVModel.Property.pop2Top+'px';
								CVModel.Obj.oPopContent2[1].style.width=(CVModel.Obj.oPopContent2[1].offsetWidth+CVModel.Property.pop2xSpeed)+'px';

								CVModel.Obj.oPopContent2[2].style.bottom=CVModel.Property.pop2Left+'px';
								CVModel.Obj.oPopContent2[2].style.height=(CVModel.Obj.oPopContent2[2].offsetHeight+CVModel.Property.pop2ySpeed)+'px';
								CVModel.Obj.oPopContent2[2].style.left=CVModel.Property.pop2Top+'px';
								CVModel.Obj.oPopContent2[2].style.width=(CVModel.Obj.oPopContent2[2].offsetWidth+CVModel.Property.pop2xSpeed)+'px';

								CVModel.Obj.oPopContent2[3].style.bottom=CVModel.Property.pop2Left+'px';
								CVModel.Obj.oPopContent2[3].style.height=(CVModel.Obj.oPopContent2[3].offsetHeight+CVModel.Property.pop2ySpeed)+'px';
								CVModel.Obj.oPopContent2[3].style.right=CVModel.Property.pop2Top+'px';
								CVModel.Obj.oPopContent2[3].style.width=(CVModel.Obj.oPopContent2[3].offsetWidth+CVModel.Property.pop2xSpeed)+'px';								
							}
							else{
								clearInterval(timer1);
								for (var i = 0; i < CVModel.Obj.oContent1.length; i++) {
									CVModel.Obj.oContent1[i].style.display="block";
								};
								Status2=true;
								endCheck();
							}
						}, 10);
						function endCheck (){
							if (Status1&&Status2) {
								CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
								CVModel.Property.ableToClick=true;
							}
						}
					},
					switch2A:function(){
						CVModel.Property.ableToClick=false;
						var timer1 = setInterval(function(){
							if (CVModel.Property.pop3Rotation<90) {
								CVModel.Property.pop3Rotation+=6;
								CVModel.Obj.oPopK3.style.transform="rotateX("+CVModel.Property.pop3Rotation+"deg)";
								CVModel.Obj.oPopK3.style.webkitTransform="rotateX("+CVModel.Property.pop3Rotation+"deg)";
							}
							else{
								clearInterval(timer1);
								CVModel.Property.pop3Rotation=270;
								CVModel.Obj.oPopK3.style.transform="rotateX(270deg)";
								var timer2 =setInterval(function(){
									if (CVModel.Property.centerRotation<360) {
										CVModel.Property.centerRotation+=6;
										CVModel.Obj.oMain.style.transform="rotateX("+CVModel.Property.centerRotation+"deg)";
										CVModel.Obj.oMain.style.webkitTransform="rotateX("+CVModel.Property.centerRotation+"deg)";
									}
									else{
										clearInterval(timer2);
										CVModel.Property.centerRotation=0;
										CVModel.Obj.oMain.style.transform="rotateX(0deg)";
										CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
										CVModel.Property.ableToClick=true;
									}
								}, 30);
							}
						}, 30);
					},
					switch2B:function(){
						CVModel.Property.ableToClick=false;
						var timer1 = setInterval(function(){
							if (CVModel.Property.centerRotation<90) {
								CVModel.Property.centerRotation+=6;
								CVModel.Obj.oMain.style.transform="rotateX("+CVModel.Property.centerRotation+"deg)";
								CVModel.Obj.oMain.style.webkitTransform="rotateX("+CVModel.Property.centerRotation+"deg)";
							}
							else{
								clearInterval(timer1);
								CVModel.Property.centerRotation=270;
								CVModel.Obj.oMain.style.transform="rotateX(270deg)";
								var timer2 =setInterval(function(){
									if (CVModel.Property.pop3Rotation<360) {
										CVModel.Property.pop3Rotation+=6;
										CVModel.Obj.oPopK3.style.transform="rotateX("+CVModel.Property.pop3Rotation+"deg)";
										CVModel.Obj.oPopK3.style.webkitTransform="rotateX("+CVModel.Property.pop3Rotation+"deg)";
									}
									else{
										clearInterval(timer2);
										CVModel.Property.pop3Rotation=0;
										CVModel.Obj.oPopK3.style.transform="rotateX(0deg)";
										CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
										CVModel.Property.ableToClick=true;
									}
								}, 30);
							}
						}, 30);
					},
					switch3A:function(){
						CVModel.Property.ableToClick=false;
						var opacity=1;
						var timer1 = setInterval(function(){
							if (opacity>0) {
								opacity-=0.05;
								CVModel.Obj.oPopContent4.style.opacity=opacity;
							}
							else{
								clearInterval(timer1);
								CVModel.Obj.oPopContent4.style.display="none";
								var top=-50;
								var timer2 = setInterval(function(){
									if (top<=20) {
										top+=5;
										CVModel.Obj.oMain.style.top=top+'px';
									}
									else{
										clearInterval(timer2);
										CVModel.main.contentSwitch.selectorSwitch(function(){
											CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
											CVModel.Property.ableToClick=true;
										});
									}
								}, 30)
							}
						}, 30)
					},
					switch3B:function(){
						CVModel.Property.ableToClick=false;
						var top=20;
						CVModel.main.contentSwitch.selectorSwitch(action1);
						function action1(){
							var timer1 = setInterval(function(){
								top-=5;
								if (top>=-50) {
									CVModel.Obj.oMain.style.top=top+'px';
								}
								else{
									clearInterval(timer1);
									var opacity=0;
									CVModel.Obj.oPopContent4.style.display="block";
									var timer2 =setInterval(function(){
										if(opacity<1){
											opacity+=0.05;
											CVModel.Obj.oPopContent4.style.opacity=opacity;
										}
										else{
											clearInterval(timer2);
											CVModel.Property.ableToClick=true;
											CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
										}
									},30);
								}
							},30);							
						}
					},
					switch4A:function(){
						CVModel.Property.ableToClick=false;
						var opacity=1;
						for (var i = 0; i < CVModel.Obj.oContent5.length; i++) {
							CVModel.Obj.oContent5[i].style.display="none";
						};							
						var timer1 = setInterval(function(){
							if (opacity>0) {
								opacity-=0.1;
								for (var i = 0; i < 4; i++) {
									CVModel.Obj.oPopTings2[i].style.opacity=opacity2;
								};
								CVModel.Obj.oPopK4.style.opacity=opacity2;
							}
							else{
								clearInterval(timer1)
								CVModel.Obj.oPopK4.style.display="none";
								for (var i = 0; i < 4; i++) {
									CVModel.Obj.oPopTings2[i].style.display="none";
								};
								var opacity2=0;
								CVModel.Obj.oMain.style.display="block";
								var timer2 = setInterval(function(){
									if (opacity2<1) {
										opacity2+=0.1;
										CVModel.Obj.oMain.style.opacity=opacity2;
									}
									else{
										clearInterval(timer2);
										CVModel.Property.ableToClick=true;
										CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
									}
								}, 10)
							}
						}, 10);						
					},
					switch4B:function(){
						CVModel.Property.ableToClick=false;
						var opacity=1;
						var timer1 = setInterval(function(){
							if (opacity>0) {
								opacity-=0.1;
								CVModel.Obj.oMain.style.opacity=opacity;
							}
							else{
								clearInterval(timer1)
								CVModel.Obj.oMain.style.display="none";
								CVModel.Obj.oPopK4.style.display="block";
								for (var i = 0; i < 4; i++) {
									CVModel.Obj.oPopTings2[i].style.display="block";
								};
								var opacity2 = 0;
								var timer2 = setInterval(function(){
									if (opacity2<1) {
										opacity2+=0.1;
										for (var i = 0; i < 4; i++) {
											CVModel.Obj.oPopTings2[i].style.opacity=opacity2;
										};
										CVModel.Obj.oPopK4.style.opacity=opacity2;
									}
									else{
										clearInterval(timer2);
										CVModel.Property.ableToClick=true;
										CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
										for (var i = 0; i < CVModel.Obj.oContent5.length; i++) {
											CVModel.Obj.oContent5[i].style.display="block";
										};										
									}
								}, 10)
							}
						}, 10);
					},
					switch5A:function(){
						CVModel.Property.ableToClick=false;
						var opacity=1;
						for (var i = 0; i < CVModel.Obj.oContent6.length; i++) {
							CVModel.Obj.oContent6[i].style.display="none";
						};						
						var timer1 = setInterval(function(){
							if (opacity>=0) {
								opacity-=0.1;
								for (var i = 0; i < 4; i++) {
									CVModel.Obj.oPopTings1[i].style.opacity=opacity;
								};	
							}
							else{
								clearInterval(timer1);
								for (var i = 0; i < 4; i++) {
									CVModel.Obj.oPopTings1[i].style.display="none";
								};
								CVModel.Obj.oMain.style.display="block";
								var opacity2=0;
								var timer2= setInterval(function(){
									if (opacity2<1) {
										opacity2+=0.1;
										CVModel.Obj.oMain.style.opacity=opacity2;	
									}
									else{
										clearInterval(timer2);
										CVModel.Obj.oPopK5.style.display="none";
										CVModel.Property.ableToClick=true;
										CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
									}
								}, 10);	
							}
						}, 10);
					},
					switch5B:function(){
						CVModel.Property.ableToClick=false;
						CVModel.Obj.oPopK5.style.display="block";
						var opacity=1;
						var timer1 = setInterval(function(){
							if (opacity>0) {
								opacity-=0.1;
								CVModel.Obj.oMain.style.opacity=opacity;
							}
							else{
								clearInterval(timer1);
								CVModel.Obj.oMain.style.display="none";
								for (var i = 0; i < 4; i++) {
									CVModel.Obj.oPopTings1[i].style.display="block";
								};
								var opacity2=0;
								var timer2 =setInterval(function(){
									if (opacity2<1) {
										opacity2+=0.1;
										for (var i = 0; i < 4; i++) {
											CVModel.Obj.oPopTings1[i].style.opacity=opacity2;
										};
									}
									else{
										clearInterval(timer2);
										CVModel.Property.ableToClick=true;
										CVModel.Property.switchStatus=!CVModel.Property.switchStatus;
										for (var i = 0; i < CVModel.Obj.oContent6.length; i++) {
											CVModel.Obj.oContent6[i].style.display="block";
										};
									}
								}, 10);
							}
						}, 10);
					},
				},
				popContentFunction:function(){
					var au =document.createElement("audio");
					au.preload="auto";
					au.src="sfx/黄昏.mp3";
					au.volume=0.6;
					var status=true;
					CVModel.Obj.oPlayPause.onclick=function(){
						if (status) {
							au.play();
							CVModel.Obj.oPlayPause.innerHTML="暂停";
						}
						else{
							au.pause();
							CVModel.Obj.oPlayPause.innerHTML="播放";
						}
						status=!status;
					}
					CVModel.Obj.oReset.onclick=function(){
						au.src="";
						au.src="sfx/黄昏.mp3";
						CVModel.Obj.oPlayPause.innerHTML="开始";
						status=true;
					}
					var volume;
					CVModel.Obj.oBar.onmousedown=function (ev)
					{
						var oEvent=ev||event;
						var disX=oEvent.clientX-CVModel.Obj.oBar.offsetLeft;
						document.onmousemove=function (ev)
						{
							var oEvent=ev||event;
							var l=oEvent.clientX-disX;
							var objLeft=Number(CVModel.Obj.oBar.style.left.replace("px",""));
							
							if (l<=90&&l>=-10) {
								CVModel.Obj.oBar.style.left=l+'px';
								CVModel.Obj.oMusicFilter.style.width=l+10+"px";
								volume=(l+10)/100;
								au.volume=volume;
							};
						};
						document.onmouseup=function ()
						{
							document.onmousemove=null;
							document.onmouseup=null;
						};
					};				
				},
				addPainter:function(){
					function getStyle(obj,attr){
						if (obj.currentStyle) {
							return obj.currentStyle[attr];
						}
						else{
							return getComputedStyle(obj, false)[attr];
						}
					}					
					var gallerys = document.getElementsByClassName("imgContainer");
					for (var i = 0; i < gallerys.length; i++) {
						var tempImg =document.createElement('img')
						tempImg.className="picture";
						tempImg.src="img/paint"+i+".jpg";
						tempImg.id="picture"+i;
						gallerys[i].appendChild(tempImg);
					};
					var p0 = document.getElementById("picture0");
					var p1 = document.getElementById("picture1");
					var p2 = document.getElementById("picture2");
					var timer1 = setInterval(function(){
						if (gallerys[0].offsetHeight!=0&&gallerys[1].offsetHeight!=0&&gallerys[2].offsetHeight!=0) {
							clearInterval(timer1);
							addPicture(3);
						};
					}, 10);
					var paintIndex=3;
					var tempHeight=0;
					var adderIndex=0;
					function addPicture(index){
						//var index=index;
						if (index<25) {
							tempHeight=gallerys[0].offsetHeight;
							adderIndex=0;
							for (var i = 0; i < gallerys.length; i++) {
								if (tempHeight>gallerys[i].offsetHeight) {
									tempHeight=gallerys[i].offsetHeight;
									adderIndex=i;
								};
							};

							var tempContainerHeight=gallerys[adderIndex].offsetHeight;
							var tempImg =document.createElement('img')
							tempImg.className="picture";
							tempImg.src="img/paint"+index+".jpg";
							tempImg.id="picture"+index;								
							gallerys[adderIndex].appendChild(tempImg);
							var timer1 = setInterval(function(){
								if (gallerys[adderIndex].offsetHeight!=tempContainerHeight) {
									clearInterval(timer1);
									kkk(index);
								};
							}, 10);							
						}
						else{
							var oImg=document.getElementsByClassName("picture");
							var oShowArea=document.getElementById("p531");
							var oImgShow=document.getElementById("paintShow");
							var oP531CloseBtn=document.getElementById("p531CloseBtn");
							for (var i = 0; i < oImg.length; i++) {
								oImg[i].onclick=function(){
									oImgShow.src=this.src;
									oShowArea.style.display="block";
									if (oImgShow.offsetHeight>520) {
										oImgShow.style.height="520px";
										oImgShow.style.display="block";
										oImgShow.style.margin="0 auto";
									}
									else if (oImgShow.offsetWidth>940){
										oImgShow.style.width="940px";
									}
								}
							};
							oP531CloseBtn.onclick=function(){
								oShowArea.style.display="none";
							}
						}
					}
					function kkk(index){
						addPicture(index+1);
					}
				}
			}
		};
		jQuery(document).ready(function($) {
			CVModel.init();
			CVModel.main.run();
		});