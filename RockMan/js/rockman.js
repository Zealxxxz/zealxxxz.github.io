		function getStyle(obj,attr){
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			}
			else{
				return getComputedStyle(obj, false)[attr];
			}
		}
		function collision(obj1,obj2,fn){
			var obj1L=parseInt(getStyle(obj1,"left"));
			var obj1R=parseInt(getStyle(obj1,"left"))+parseInt(getStyle(obj1,"width"));
			var obj1T=parseInt(getStyle(obj1,"top"));
			var obj1B=parseInt(getStyle(obj1,"top"))+parseInt(getStyle(obj1,"height"));

			var obj2L=parseInt(getStyle(obj2,"left"));
			var obj2R=parseInt(getStyle(obj2,"left"))+parseInt(getStyle(obj2,"width"));
			var obj2T=parseInt(getStyle(obj2,"top"));
			var obj2B=parseInt(getStyle(obj2,"top"))+parseInt(getStyle(obj2,"height"));
			if (obj1.style.display=="block"&&obj2.style.display=="block") {

			};
			if (obj1R<obj2L||obj1L>obj2R||obj1B<obj2T||obj1T>obj2B) {
				return false;
			}
			else{
				if (fn) {fn();};
				return true;
			}
		}
		//Dom Object Storage Area  Dom对象存储区
		var Obj={
			RestartBtn:document.getElementById("restartBtn"),
			Message:document.getElementById("message"),
			Message1:document.getElementById("message1"),
			Info:document.getElementById("sss"),
			Player:document.getElementById("mc"),
			PlayerSprite:document.getElementById("mcImg"),
			PlayerHP:document.getElementById("mcFilter"),
			
			EnemyHP:document.getElementById("enemyFilter"),
			Ground:document.getElementById("ground"),
			Bullet:document.getElementsByClassName("bullet"),
			GameArea:document.getElementById("gameArea"),

			Enemy:document.getElementById("enemy"),
			EnemyBullet:document.getElementById("enemyBullet"),
			EnemySprite:document.getElementById("enemyImg"),
			EnemyStone:document.getElementsByClassName("EnemyStone")[0],
			StoneFragment1:document.getElementsByClassName("StoneFragment1")[0],
			StoneFragment2:document.getElementsByClassName("StoneFragment2")[0],
			StoneFragment3:document.getElementsByClassName("StoneFragment3")[0],
			StoneFragment4:document.getElementsByClassName("StoneFragment4")[0],


		}
		//KeyBoard State Storage Area  键盘输入状态存储区
		var Input={
			Left:false,
			Right:false,
			Shoot:false,
			Jump:false
		}		
		var Mc={
			//MainCharacter State Storage Area  MC状态对象存储区
			status:{
				isOnGround:false,//在地上
				isMoving:false,//在左右移动的状态
				isShooting:false,//在射击
				ableToShoot:true,
				orientation:true,//方向
				touchingWithEnemy:false,//在受伤
				ableToChangeHP:true,
				hurtStatus:false,
				loseControl:false,
				getHurtTimer:null,
				gravity:4,
				Hp:20,
				moveSpeed:4,
				jumpSpeed:16,
				i:1,
				i1:true,
				i2:1
			},
			//MainCharacter State Status Machine  MC状态机
			statusController:function(){
				if (collision(Obj.Player,Obj.Ground)) {
					Mc.status.isOnGround=true;
					
				}
				else{
					Mc.status.isOnGround=false;
					System.MusicController.mcSfxRun(4);
				};
				if (Input.Left&&!Input.Right) {
					Mc.status.isMoving=true;
					Mc.status.orientation=true;
				}
				else if(Input.Right&&!Input.Left){
					Mc.status.isMoving=true;
					Mc.status.orientation=false;
				}
				else{
					Mc.status.isMoving=false;
				}
				if (Input.Shoot) {
					Mc.status.isShooting = true;
				}
				else{
					Mc.status.isShooting = false;
				}
			},
			//MainCharacter ActionController Machine  MC行为控制器
			ActionController:function(){
					//受伤
					if (collision(Obj.Player,Obj.Enemy)) {
						Mc.GetHurt();
					}
					//自由落体
					if(!Mc.status.isOnGround&&!Mc.status.loseControl) {
						Obj.Player.style.top=parseInt(getStyle(Obj.Player,"top"))+Mc.status.gravity+"px";
					}
					//移动
					if (Mc.status.isMoving&&!Mc.status.loseControl) {
						var ObjPosition=parseInt(getStyle(Obj.Player,"left"));
						if (ObjPosition>=0&&ObjPosition<=760) {
							if (Mc.status.orientation) {
								if (ObjPosition>(760-Mc.status.moveSpeed)) {
									Obj.Player.style.left="760px";
								}
								else{
									Obj.Player.style.left=ObjPosition+Mc.status.moveSpeed+"px";
								}
							}
							else{
								if (ObjPosition<Mc.status.moveSpeed) {
									Obj.Player.style.left="0px";
								}
								else{
									Obj.Player.style.left=parseInt(getStyle(Obj.Player,"left"))-Mc.status.moveSpeed+"px";
								}
							}							
						};
					}
					//跳跃
					if (Input.Jump&&Mc.status.isOnGround&&!Mc.status.loseControl) {
						Mc.status.isOnGround=false;
						jumpSpeed=Mc.status.jumpSpeed;
						var timer = setInterval(function(){
							jumpSpeed=jumpSpeed-0.4;
							if (!Mc.status.loseControl) {
								Obj.Player.style.top=parseInt(getStyle(Obj.Player,"top"))-jumpSpeed+"px";
								var a=parseInt(getStyle(Obj.Player,"top"))+parseInt(getStyle(Obj.Player,"height"));
								var b=parseInt(getStyle(Obj.Ground,"top"));
								if (b-a<-jumpSpeed) {
									clearInterval(timer);
									jumpSpeed=0;
									Obj.Player.style.top=parseInt(getStyle(Obj.Ground,"top"))-parseInt(getStyle(Obj.Player,"height"))+"px";
								}								
							};							
						}, 30);
					}					
					//射击
					if (Input.Shoot&&Obj.Bullet.length<3&&!Mc.status.loseControl) {
							if (Mc.status.ableToShoot) {
								Mc.status.ableToShoot=false;
								var bullet=document.createElement("div");
								bullet.className+="bullet";
								var bulletX=parseInt(getStyle(Obj.Player,"left"))+parseInt(getStyle(Obj.Player,"width"))/2;
								var bulletY=parseInt(getStyle(Obj.Player,"top"))+parseInt(getStyle(Obj.Player,"height"))/2-6;
								var bulletSpeed=20;
								bullet.style.left=bulletX+33+"px";
								if (!Mc.status.orientation) {
									bullet.style.left=bulletX-33+"px";
									bulletSpeed=-20;
								}
								bullet.style.top=bulletY+"px";
								Obj.GameArea.appendChild(bullet);
								System.MusicController.mcSfxRun(5);
								var timer= setInterval(function(){
									bullet.style.left=parseInt(getStyle(bullet,"left"))+bulletSpeed+"px";
									if (parseInt(getStyle(bullet,"left"))>800||parseInt(getStyle(bullet,"left"))<0) {
										clearInterval(timer);
										Obj.GameArea.removeChild(bullet);
									};
								},30);
								var timer2 =setTimeout(function(){
									Mc.status.ableToShoot=true;
									clearInterval(timer2);
								}, 100)

							}
					};
			},
			//MainCharacter AnimationController Machine  MC动画控制器
			AnimationController1:function(){
					if(Mc.status.ableToChangeHP){
						Obj.PlayerSprite.style.display="block";
					}
					else{
						if (Mc.status.i1) {
							Obj.PlayerSprite.style.display="none";
							Mc.status.i1=!Mc.status.i1;
						}
						else{
							Obj.PlayerSprite.style.display="block";
							Mc.status.i1=!Mc.status.i1;
						}
					}
					if (Mc.status.orientation) {
						Obj.PlayerSprite.style.transform="rotateY(0deg)";
					}
					else{
						Obj.PlayerSprite.style.transform="rotateY(180deg)";
					}

					if (Mc.status.loseControl) {
						Obj.PlayerSprite.className="PlayerHurt";
					}
					else{
						if (Mc.status.isOnGround) {
							if (Mc.status.isMoving) {
							}
							else{
								if (Input.Shoot) {
									Obj.PlayerSprite.className="PlayerShootStand";
								}
								else{
									Obj.PlayerSprite.className="PlayerStand";
								}
							};
						}
						else{
							if (Input.Shoot) {
								Obj.PlayerSprite.className="PlayerShootJump";
							}
							else{
								Obj.PlayerSprite.className="PlayerJump";
							}
						}
					}	
			},
			AnimationController2:function(){
				if (!Mc.status.loseControl&&Mc.status.isOnGround&&Mc.status.isMoving) {
					if (Input.Shoot) {
						Mc.status.i2++;
						if (Mc.status.i2==5) {
							Mc.status.i2=1;
						}
						Obj.PlayerSprite.className="PlayerShootRun"+Mc.status.i2+"";
					}
					else{
						Mc.status.i++;
						if (Mc.status.i==5) {
							Mc.status.i=1;
						}
						Obj.PlayerSprite.className="PlayerRun"+Mc.status.i+"";
					}
				}
			},
			Reset:function(){
				//位置复位
				Obj.Player.style.top="-70px";
				Obj.Player.style.left="100px";
				Obj.PlayerSprite.style.transform="rotateY(0deg)";
				Obj.PlayerHP.style.background="green";
				//血条复位
				Mc.status.Hp=20;
				Mc.status.orientation=true;
				//状态复位
				Mc.status.ableToChangeHP=true;
				Mc.status.hurtStatus=false;
				Mc.status.li=true;
				Obj.PlayerSprite.className="PlayerFall";
				Obj.PlayerSprite.style.display="block";
				Obj.PlayerHP.style.height="100px";
			},
			GetHurt:function(){
						if (Mc.status.ableToChangeHP) {
							Mc.status.Hp-=2;
							if (Mc.status.Hp>=0) {
								System.MusicController.mcSfxRun(3);
							};
							Mc.status.loseControl=true;
							var a=parseInt(getStyle(Obj.Player,"left"))+parseInt(getStyle(Obj.Player,"width"))/2;
							var b=parseInt(getStyle(Obj.Enemy,"left"))+parseInt(getStyle(Obj.Enemy,"width"))/2;
							var timer;
							if (a<b) {
								if (parseInt(getStyle(Obj.Player,"left"))<2) {
									Obj.Player.style.left="0px";
								}
								else{
									Obj.Player.style.left=parseInt(getStyle(Obj.Player,"left"))-2+"px";
									timer=setInterval(function(){
										if (parseInt(getStyle(Obj.Player,"left"))<2) {
											Obj.Player.style.left="0px";
										}
										else{
											Obj.Player.style.left=parseInt(getStyle(Obj.Player,"left"))-2+"px";
										}
									}, 10);										
								}
							}
							else{
								if (parseInt(getStyle(Obj.Player,"left"))>758) {
									Obj.Player.style.left="760px";
								}
								else{
									Obj.Player.style.left=parseInt(getStyle(Obj.Player,"left"))+2+"px";
									timer=setInterval(function(){
										if (parseInt(getStyle(Obj.Player,"left"))>758) {
											Obj.Player.style.left="760px";
										}
										else{
											Obj.Player.style.left=parseInt(getStyle(Obj.Player,"left"))+2+"px";
										}
									}, 10);										
								}
							}
							Mc.status.hurtStatus=true;
							Mc.status.ableToChangeHP=false;
							var timer2= setTimeout(function(){
								Mc.status.loseControl=false;
								clearInterval(timer);
								clearTimeout(timer2);
							}, 300);
							var timer3= setTimeout(function(){
								Mc.status.ableToChangeHP=true;
								clearTimeout(timer3);
							}, 1500);
						}
			}
		}
		var Enemy={
			status:{
				Hp:20,
				ableToChangeHP:true,
				i1:true,
				AiTimer:null,
				bossOrientation:true,
				bossAIKeeper:1,
			},
			ActionController:function(){
				if (Enemy.status.ableToChangeHP) {
					for (var i = 0; i < Obj.Bullet.length; i++) {
						if (collision(Obj.Bullet[i],Obj.Enemy)) {
							Enemy.status.ableToChangeHP=false;
							Enemy.status.Hp-=1;
							System.MusicController.systemSfxRun(0);
							var timer3= setTimeout(function(){
								Enemy.status.ableToChangeHP=true;
								clearTimeout(timer3);
							}, 1000);
						}
					};					
				};
			},
			AnimationController:function(){
				if(Enemy.status.ableToChangeHP){
					Obj.EnemySprite.style.display="block";
				}
				else{
					if (Enemy.status.i1) {
						Obj.EnemySprite.style.display="none";
					}
					else{
						Obj.EnemySprite.style.display="block";
					}
					Enemy.status.i1=!Enemy.status.i1;
				}
			},
			Reset:function(){

				Obj.EnemyStone.style.display="block";
				Obj.EnemyStone.style.top="-150px";
				Obj.StoneFragment1.style.display="none";
				Obj.StoneFragment1.style.top="420px";
				Obj.StoneFragment1.style.left="660px";
				Obj.StoneFragment2.style.display="none";
				Obj.StoneFragment2.style.top="420px";
				Obj.StoneFragment2.style.left="720px";
				Obj.StoneFragment3.style.display="none";
				Obj.StoneFragment3.style.top="480px";
				Obj.StoneFragment3.style.left="660px";
				Obj.StoneFragment4.style.display="none";
				Obj.StoneFragment4.style.top="480px";
				Obj.StoneFragment4.style.left="720px";

				Obj.EnemyHP.style.height="0px";
				
				Obj.Enemy.style.left="700px";
				Obj.EnemySprite.style.transform="rotateY(0deg)";
				Enemy.status.bossOrientation=true;
				Enemy.status.Hp=20;
				Enemy.status.i1=true;
				Obj.Enemy.style.display="none";
			},
			AIController:function(){
				if (System.GameControllerSwitch) {
					ActionSwitchController();
				}
				else{
					Enemy.Reset();
				}
				function ActionSwitchController(){
					var i=parseInt(Math.floor(Math.random()*4+1));
					//var i=1;
					//Action01();

					while(Enemy.status.bossAIKeeper==i){
						i=parseInt(Math.floor(Math.random()*4+1));
					}
					Enemy.status.bossAIKeeper=i;
					switch(Enemy.status.bossAIKeeper){
						case 1:Action01();break;
						case 2:Action02();break;
						case 3:Action03();break;
						case 4:Action04();break;
					}
					//Enemy.AIController();
				}
				function Action01(){
					var i =0;
					var timer1 = setInterval(function(){
						i++;
						if (i<5) {
							Obj.EnemySprite.className="EnemyShoot"+i;
							if (i==3) {
								var bullet =document.createElement("div");
								bullet.className="EnemyBullet0";
								if (Enemy.status.bossOrientation==true) {
									bullet.style.left="550px";
								}
								else{
									bullet.style.left="250px";
								}
								bullet.style.top="470px";
								bullet.id="enemyBullet";
								Obj.GameArea.appendChild(bullet);
								var j=0;
								var timer2 = setInterval(function(){
									function bulltetStyleChange(){
										j++;
										if (j%10==0) {
											if (j==30) {
												j=0;
											};
											bullet.className="EnemyBullet"+j/10;
										}										
									}
									var bulletLeft=parseInt(getStyle(bullet,"left"));

									if (Enemy.status.bossOrientation) {
										if (bulletLeft>=0) {
											bullet.style.left=parseInt(getStyle(bullet,"left"))-4+"px";
											if (collision(Obj.Player,bullet)) {
												Mc.GetHurt();									
											}											
											bulltetStyleChange();
										}
										else{
											clearInterval(timer2);
											Obj.GameArea.removeChild(bullet);
											var timer3 = setTimeout(function(){
												clearTimeout(timer3);
												Enemy.AIController();
											}, 500);
										}
									}
									else{
										if (bulletLeft<=600) {
											bullet.style.left=parseInt(getStyle(bullet,"left"))+4+"px";
											if (collision(Obj.Player,bullet)) {
												Mc.GetHurt();									
											}	
											bulltetStyleChange();
										}
										else{
											clearInterval(timer2);
											Obj.GameArea.removeChild(bullet);
											var timer3 = setTimeout(function(){
												clearTimeout(timer3);
												Enemy.AIController();
											}, 500);
										}
									}
								}, 10);
							}
						}
						else{
							Obj.EnemySprite.className="EnemyStand0";
							clearInterval(timer1);
						}
					}, 200);
				}
				function Action02(){
					var SpeedA = 25;
					var SpeedB = 1;
					var single=true;
					var timer1 = setInterval(function(){
						SpeedA=SpeedA-SpeedB;
						Obj.EnemySprite.className="EnemyJump0";
						if (SpeedA>0) {
							Obj.Enemy.style.top=parseInt(getStyle(Obj.Enemy,"top"))-SpeedA+"px";
						}
						else {
							clearInterval(timer1);
							timer1=null;
							SpeedA=25;
							//alert("message");
							StoneFailing();
						}
					}, 30);
					function StoneFailing(){
						//设置掉落顺序 创建元素 
						var position1 =100;
						var position2 =300;
						var position3 =500;
						var groundposition =423;
						var stone=[];
						var positionValue;
						for (var i = 0; i < 3; i++) {
							switch(i){
								case 0: positionValue=position1; break;
								case 1: positionValue=position2; break;
								case 2: positionValue=position3; break;
							}
							//stone[i] = '<div class="EnemyStone EnemyStone'+i+' EnemyStoneForJs" style="left:'+positionValue+'px;"></div>';
							//Obj.GameArea.innerHTML+=stone[i];
							stone[i] =document.createElement("div");
							stone[i].className="EnemyStone EnemyStone'+i+' EnemyStoneForJs";
							stone[i].style.left=positionValue+"px";
							Obj.GameArea.appendChild(stone[i]);
						};
						var FallingStong= document.getElementsByClassName("EnemyStoneForJs");
						var timer11 = setInterval(function(){
							if (parseInt(getStyle(FallingStong[0],"top"))<423) {
								for (var i = 0; i < 3; i++) {
									FallingStong[i].style.top=parseInt(getStyle(FallingStong[i],"top"))+20+"px";
									if (collision(Obj.Player,FallingStong[i])) {
										Mc.GetHurt();
									}									
								};	
							}
							else{
								clearInterval(timer11);
								for (var i = 0; i < 3; i++) {
									//FallingStong[i].style.display="none";
									Obj.GameArea.removeChild(stone[i]);
								};
								var timer21 = setInterval(function(){
									var EnemyTop=parseInt(getStyle(Obj.Enemy,"top"));
									if (EnemyTop<460) {
										Obj.Enemy.style.top=EnemyTop+10+"px";
									}
									else{
										clearInterval(timer21);
										Obj.EnemySprite.className="EnemyStand0";
										var timer31 = setTimeout(function(){
											Enemy.AIController();
											clearTimeout(timer31);
										}, 1000)
									}
								}, 20)
							}
						}, 10);
					}
				}
				function Action03(){
					var midPosition=327.5;
					var headRoll=document.createElement("div");
					var footRoll=document.createElement("div");
					headRoll.className="EnemyRoll0 EnemyBody";
					footRoll.className="EnemyFoot0 EnemyBody";
					headRoll.style.top="460px";
					footRoll.style.top="508px";
					if (Enemy.status.bossOrientation==true) {
						Obj.EnemySprite.transform="rotateY(0deg)";
						headRoll.style.left="655px";
						footRoll.style.left="655px";
					}
					else{
						Obj.EnemySprite.transform="rotateY(180deg)";
						headRoll.style.left="45px";
						footRoll.style.left="45px";
					}
					Obj.GameArea.appendChild(headRoll);
					Obj.GameArea.appendChild(footRoll);
					var i=0;
					var rollSwitch=true;
					Obj.Enemy.style.display="none";
					var timer1=setInterval(function(){
						var rollLeft=parseInt(getStyle(headRoll,"left"));
						var rollTop=parseInt(getStyle(headRoll,"top"));
						i++;
						if (i==8) {
							i=0;
						}
						if (i%2==0) {
							headRoll.className="EnemyBody EnemyRoll"+i/2;
						};
						if (collision(Obj.Player,headRoll)) {
							Mc.GetHurt();
						};

						if (Enemy.status.bossOrientation) {
							if (rollSwitch) {
								if (rollLeft>=0) {
									headRoll.style.left=rollLeft-15+"px";
									if (rollLeft>midPosition) {
										headRoll.style.top=rollTop+1+"px";
									}
									else{
										headRoll.style.top=rollTop-1+"px";
									}
								}
								else{
									rollSwitch=false;
								}
							}
							else{
								if (rollLeft<=655) {
									headRoll.style.left=rollLeft+15+"px";
									if (rollLeft<midPosition) {
										headRoll.style.top=rollTop-1+"px";
									}
									else{
										headRoll.style.top=rollTop+1+"px";
									}
								}
								else{
									clearInterval(timer1);
									Obj.GameArea.removeChild(headRoll);
									Obj.GameArea.removeChild(footRoll);
									Obj.Enemy.style.display="block";
									var timer2 = setTimeout(function(){
										clearTimeout(timer2);
										Enemy.AIController();
									}, 1000);
								}
							};
						}
						else{
							if (rollSwitch) {
								if (rollLeft<=700) {
									headRoll.style.left=rollLeft+15+"px";
									if (rollLeft>midPosition) {
										headRoll.style.top=rollTop+1+"px";
									}
									else{
										headRoll.style.top=rollTop-1+"px";
									}
								}
								else{
									rollSwitch=false;
								}
							}
							else{
								if (rollLeft>=85) {
									headRoll.style.left=rollLeft-15+"px";
									if (rollLeft<midPosition) {
										headRoll.style.top=rollTop-1+"px";
									}
									else{
										headRoll.style.top=rollTop+1+"px";
									}
								}
								else{
									clearInterval(timer1);
									Obj.GameArea.removeChild(headRoll);
									Obj.GameArea.removeChild(footRoll);
									Obj.Enemy.style.display="block";
									var timer2 = setTimeout(function(){
										clearTimeout(timer2);
										Enemy.AIController();
									}, 1000);
								}
							};
						}

					}, 30);
				}
				function Action04(){
					var headFly = document.createElement("div");
					var footFly = document.createElement("div");
					var midPosition = 328.5;
					headFly.className="EnemyFly";
					footFly.className="EnemyFoot0";
					if (Enemy.status.bossOrientation==true) {
						headFly.style.left="657px";
						footFly.style.left="659px";
						headFly.style.transform="rotateY(0deg)";
						footFly.style.transform="rotateY(0deg)";
					}
					else{
						headFly.style.left="40px";
						footFly.style.left="40px";
						headFly.style.transform="rotateY(180deg)";
						footFly.style.transform="rotateY(180deg)";
					}
					headFly.style.top="423px";
					footFly.style.top="508px";
					Obj.GameArea.appendChild(headFly);
					Obj.GameArea.appendChild(footFly);
					Obj.Enemy.style.display="none";
					var footAnimationTimer = 0;
					var timer1 = setInterval(function(){
						footAnimationTimer++;
						if (footAnimationTimer==15) {
							footAnimationTimer=0;
						}
						if (footAnimationTimer%5==0) {
							footFly.className="EnemyFoot"+footAnimationTimer/5;
						}

						if (collision(Obj.Player,headFly)) {
							Mc.GetHurt();
						};
						if (collision(Obj.Player,footFly)) {
							Mc.GetHurt();
						};

						var headFlyLeft=parseInt(getStyle(headFly,"left"));
						var headFlyTop=parseInt(getStyle(headFly,"top"));
						var footFlyLeft=parseInt(getStyle(footFly,"left"));
						if (Enemy.status.bossOrientation) {
							if (headFlyLeft>midPosition) {
								headFly.style.top=headFlyTop-10+"px";
							}
							else{
								headFly.style.top=headFlyTop+10+"px";
							};

							if (headFlyLeft>0) {
								headFly.style.left=headFlyLeft-10+"px";
								footFly.style.left=footFlyLeft-10+"px";
							}
							else{
								clearInterval(timer1);
								Obj.Enemy.style.left="80px";
								Obj.EnemySprite.style.transform="rotateY(180deg)";
								Obj.Enemy.style.display="block";
								Obj.GameArea.removeChild(headFly);
								Obj.GameArea.removeChild(footFly);

								Enemy.status.bossOrientation=false;
								var timer2 = setTimeout(function(){
									Enemy.AIController();
									clearTimeout(timer2);
								}, 1000)
								
								//Enemy.AIController();
							}
						}
						else{
							if (headFlyLeft>midPosition) {
								headFly.style.top=headFlyTop+10+"px";
							}
							else{
								headFly.style.top=headFlyTop-10+"px";
							};
							if (headFlyLeft<657) {
								headFly.style.left=headFlyLeft+10+"px";
								footFly.style.left=footFlyLeft+10+"px";
							}
							else{
								clearInterval(timer1);
								Obj.Enemy.style.left="700px";
								Obj.EnemySprite.style.transform="rotateY(0deg)";
								Obj.Enemy.style.display="block";
								Obj.GameArea.removeChild(headFly);
								Obj.GameArea.removeChild(footFly);
								Enemy.status.bossOrientation=true;
								var timer2 = setTimeout(function(){
									Enemy.AIController();
									clearTimeout(timer2);
								}, 1000);
							}
						}
					}, 30)
				}
			}
		}
		var System={
			GameStartSwitch:false,
			GameControllerSwitch:false,
			timerQuickCheck:null,
			timerSlowCheck:null,
			//KeyBoard Input Controller & GameFrame Controller 键盘输入控制器 + 游戏帧控制器
			GameController:function(){
				document.onkeydown=function(ev){
					var oEvent=ev||window.event;
					switch (oEvent.keyCode){
						case 68: Input.Left=true; break;
						case 65: Input.Right=true; break;
						case 74: Input.Shoot=true; break;
						case 75: Input.Jump=true;  break;
						case 13: System.startFunction(); break;
						case 72: System.startFunction(); break;
					}
				}
				document.onkeyup=function(ev){
					var oEvent=ev||window.event;
					switch (oEvent.keyCode){
						case 68: Input.Left=false; break;
						case 65: Input.Right=false; break;
						case 74: Input.Shoot=false; break;
						case 75: Input.Jump=false;  break;						
					}
				}				
				System.timerQuickCheck=setInterval(function(){
					if (System.GameControllerSwitch) {
						Mc.statusController();
						Mc.ActionController();
						Mc.AnimationController1();
						Enemy.ActionController();
						Enemy.AnimationController();
						System.GlobalController();
					};
				}, 10);
				System.timerSlowCheck=setInterval(function(){
					Mc.AnimationController2();
				}, 110);
				//alert(System.timerQuickCheck);
			},
			//Game State Controller 游戏状态控制器:Message, State, 
			GlobalController:function(){
				Obj.PlayerHP.style.height=Mc.status.Hp*5+"px";
				Obj.EnemyHP.style.height=Enemy.status.Hp*5+"px";
				if (Mc.status.Hp<7) {
					Obj.PlayerHP.style.background="red";
				}
				else if(Mc.status.Hp<=14&&Mc.status.Hp>=7){
					Obj.PlayerHP.style.background="yellow";
				};

				if (Mc.status.Hp<0||Enemy.status.Hp<0) {
					//
					System.MusicController.systemSfxRun(2);//死亡音效
					System.GameStartSwitch=true;//开启restart开关
					
					Obj.Message1.style.display="block";
					System.GameControllerSwitch=false;

					clearInterval(System.timerQuickCheck);
					clearInterval(System.timerSlowCheck);
					System.timerQuickCheck=null;
					System.timerSlowCheck=null;
					//Obj.Message.style.display="none";
					//Obj.RestartBtn.style.display="block";
					Mc.Reset();
					Enemy.Reset();
				};
			},			
			Restart:function(){
				//BOSS和石头复位
				//MC复位
				//开始功能
				Obj.Message.style.display="none";
				Obj.Message1.style.display="none";
				System.MusicController.BgStart();
				//游戏重置
				//Obj.RestartBtn.style.display="block";
				//mc掉落， 石头掉落， boss充血，开启开关

				var timer1=setInterval(function(){
					var PlayerTop=parseInt(getStyle(Obj.Player,"top"));
					if (PlayerTop<480) {
						Obj.Player.style.top=parseInt(getStyle(Obj.Player,"top"))+20+"px";
					}
					else if(PlayerTop>480&&PlayerTop<500){
						Obj.Player.style.top="500px";
					}
					else if(PlayerTop>=500){
						clearInterval(timer1);
						Obj.PlayerSprite.className="PlayerStand";
						var timer2 = setInterval(function(){
							var StoneTop=parseInt(getStyle(Obj.EnemyStone,"top"));
							if (StoneTop<423) {
								Obj.EnemyStone.style.top=parseInt(getStyle(Obj.EnemyStone,"top"))+10+"px";
							}
							else if(StoneTop>413&&StoneTop<423){
								Obj.EnemyStone.style.top="423px";
							}
							else if(StoneTop>=423){
								clearInterval(timer2);
								Obj.EnemyStone.style.display="none";
								Obj.StoneFragment1.style.display="block";
								Obj.StoneFragment2.style.display="block";
								Obj.StoneFragment3.style.display="block";
								Obj.StoneFragment4.style.display="block";
								Obj.Enemy.style.display="block";
								var StoneFragment1Timer=0;
								var timer3 = setInterval(function(){
									StoneFragment1Timer++;
									if (StoneFragment1Timer<10) {
										Obj.StoneFragment1.style.top=parseInt(getStyle(Obj.StoneFragment1,"top"))-10+"px";
										Obj.StoneFragment1.style.left=parseInt(getStyle(Obj.StoneFragment1,"left"))-10+"px";
										Obj.StoneFragment2.style.top=parseInt(getStyle(Obj.StoneFragment2,"top"))-10+"px";
										Obj.StoneFragment2.style.left=parseInt(getStyle(Obj.StoneFragment2,"left"))+10+"px";
										Obj.StoneFragment3.style.top=parseInt(getStyle(Obj.StoneFragment3,"top"))+10+"px";
										Obj.StoneFragment3.style.left=parseInt(getStyle(Obj.StoneFragment3,"left"))-10+"px";
										Obj.StoneFragment4.style.top=parseInt(getStyle(Obj.StoneFragment4,"top"))+10+"px";
										Obj.StoneFragment4.style.left=parseInt(getStyle(Obj.StoneFragment4,"left"))+10+"px";
									}
									else{
										clearInterval(timer3);
										Obj.StoneFragment1.style.display="none";
										Obj.StoneFragment2.style.display="none";
										Obj.StoneFragment3.style.display="none";
										Obj.StoneFragment4.style.display="none";
										var BossCharge=0;
										var timer4 = setInterval(function(){
											BossCharge++;
											if (BossCharge<7) {
												Obj.EnemySprite.className="EnemyStand"+BossCharge;
											}
											else{
												clearInterval(timer4);
												var filterValue=0;
												var timer5=setInterval(function(){
													filterValue++;
													if (filterValue<100) {
														Obj.EnemyHP.style.height=filterValue+"px";
													}
													else{
														clearInterval(timer5);
														Obj.EnemySprite.className="EnemyStand0";
														System.GameControllerSwitch=true;
														if (System.GameControllerSwitch) {
															System.GameController();
															Enemy.AIController();
														};								
													}
												}, 10);												
											}
										}, 200);
										System.GameControllerSwitch=true;
									}
								}, 20);
							}
						}, 10);
					}
				}, 10);
			},
			MusicController:function(){
				var Bg = document.createElement("audio");
				var mcSfx = document.createElement("audio");
				var EnemySfx = document.createElement("audio");

			},
			MusicController:{
				Bg:document.createElement("audio"),
				mcSfx:document.createElement("audio"),
				systemSfx:document.createElement("audio"),
				BgStart:function(){
					this.Bg.preload="auto";
					this.Bg.src="sfx/bg.mp3";
					this.Bg.play();
					var timer1 =setInterval(function(){
						if (System.MusicController.Bg.ended) {
							System.MusicController.Bg.play();
							System.MusicController.BgStart();
							clearInterval(timer1);
						}
					}, 1000);
				},
				sfxIndex:[
					"sfx/AttackEffective.mp3",
					"sfx/AudioAddHp.mp3",
					"sfx/Die.mp3",
					"sfx/Hurt.mp3",
					"sfx/Jump.mp3",
					"sfx/shoot.mp3",
				],
				mcSfxRun:function(index){
					this.mcSfx.preload="auto";
					this.mcSfx.src="";
					this.mcSfx.src=this.sfxIndex[index];
					this.mcSfx.play();
				},
				systemSfxRun:function(index){

					this.systemSfx.preload="auto";
					this.systemSfx.src="";
					this.systemSfx.src=this.sfxIndex[index];
					this.systemSfx.play();
				}
			},
			//System.MusicController.mcSfxRun();
			startFunction:function(){
				if (System.GameStartSwitch==true) {
					Story.obj.oControllerInfoShower.innerHTML=Story.infoData[3];
					System.Restart();
					System.GameStartSwitch=false;
				};
			}
		}
		var Story={
			obj:{
				TimerI:0,
				oNextBtn:document.getElementById("nextBtn"),
				oStoryScreen:document.getElementById("storyArea"),
				oStoryImg:document.getElementById("storyImg"),
				oControllerInfoShower:document.getElementById("controllerInfoShower"),			
			},
			infoData:[
				"公元21XX年，世界和平安定，人民生活繁荣",
				"但是威利博士，却要打算摧毁这一切，数以万计的平民死亡",
				"好了我编不下去了，直接开搞",
				"向左移动：“D键”，向右移动：“A键”，攻击:“J键”，跳跃：“K键”",				
			],
			imgData:[
				"img/story00.png",
				"img/story01.png",
			],
			TimerI:0,
			Run:function(){
				Story.obj.oControllerInfoShower.innerHTML=Story.infoData[0];
				Story.obj.oStoryImg.src=Story.imgData[0];
				Story.obj.oStoryScreen.style.display="block";
				Story.obj.oNextBtn.onclick=function(){
					Story.obj.TimerI++;
					if (Story.obj.TimerI==1) {
						Story.obj.oControllerInfoShower.innerHTML=Story.infoData[1];
						Story.obj.oStoryImg.src=Story.imgData[1];				
					};
					if (Story.obj.TimerI==2) {
						Story.obj.oStoryScreen.style.display="none";
						Story.obj.oControllerInfoShower.innerHTML=Story.infoData[2];
						Story.obj.TimerI=0;
						System.GameStartSwitch=true;
					};
				}
			}
		}
		window.onload=function(){
			Story.Run();
			document.onkeydown=function(ev){
				var oEvent=ev||window.event;
				if (oEvent.keyCode==13||oEvent.keyCode==72) {
					System.startFunction();
				};
			}
		}