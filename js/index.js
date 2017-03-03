//requestAnimationFrame封装
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
//

var CommonTools={
	ready:function(fn){
        if(document.addEventListener){  //标准浏览器
            document.addEventListener('DOMContentLoaded',function(){
                //注销事件，避免反复触发
                document.removeEventListener('DOMContentLoaded',arguments.callee,false);
                fn();
            },false)
        }
        else if(document.attachEvent){    //IE，两个条件
            document.attachEvent('onreadystatechange',function(){
                if(document.readyState=='complete'){
                    //注销事件，避免反复触发
                    document.detachEvent('onreadystatechange',arguments.callee);
                    fn();
                }
            });
        }
	},
	checkDeviceLanguage:function(){

	},
    animator:function(){

    },
    getStyle:function(obj,attr){
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        else{
            return getComputedStyle(obj, false)[attr];
        }
    },
    ImageLoader:function(images,callback/*images是数组数组对象，callback是要执行的函数*/){
        var loadingSwitcher=[];
        var length=images.length;
        for (var i = 0; i < length; i++) {
            loadingSwitcher[i]=false;
        }
        for (var j = 0; j < length; j++) {
            if (loadingSwitcher[j]==false) {
                var img =new Image();
                img.src=images[j];
                img.setAttribute('sid', j);
                img.onload=function(a){
                    loadingSwitcher[this.getAttribute('sid')]=true;
                    finishLoading();
                }                
            };
        }
        function finishLoading(){
            for (var i = 0; i < length; i++) {
                if (loadingSwitcher[i]==false) {
                    return;
                }
            }
            if (callback) {
                callback();
            };
        }
    }
}
var ResumeData={
	cn:{
        centerColor:[
            "#9c9b2b",
            "#172590",
            "#5f802d",
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
        docTitle:'Zealxxxz的个人简历',
        title:[
            "职业技能",
            "项目经历",
            "工作经验",
            "联系方式",
            "软技能",
            "关于",             
        ],
        info:[
            "你见，或者不见我  我就在那里 不悲不喜",
            "你念，或者不念我  情就在那里 不来不去",
            "你爱，或者不爱我  爱就在那里 不增不减",
            "你跟，或者不跟我  我的手就在你手里 不舍不弃",
            "来我的怀里 或者 让我住进你的心里",
            "默然 相爱 寂静 欢喜",
        ],
        page0info:{

        },
        page1desinfo1:[
            "荔枝直播（原创星工场）是一个直播平台",
            "PC端：Jquery",
            "手机端：混合应用，SUI mobile, Jquery",
        ],
        page1desinfo2:[
            "混沌与秩序 : 大型3D手机MMO网游，主要成就为烈焰岛的关卡设计，烈焰骑士的任务设计",
            "奇异动物园 ：模拟养成类游戏,数值，商店系统，部分UI",
        ],
        page1desinfo3:[
            "自制洛克人Demo，Unity3D版为完整关卡+boss战，除美术外全部为重新设计,H5版仅为BOSS战，BOSS AI 遵循原设计，可在GITHUB上<a href='https://github.com/Zealxxxz'>下载</a>",
            "此外SwingSwing Demo的设计较为精妙，但仅剩部分片段视频<a href='http://v.youku.com/v_show/id_XNTU1NzE1OTUy.html?from=s1.8-1-1.2&spm=a2h0k.8191407.0.0'>感兴趣请点击</a>",
        ],
        page2info0:[
            "负责公司前端业务的开发",
            "态势感知项目",
            "威胁情报项目",
        ],
        page2info1:[
            "直播项目：PC端工具库，登录功能，首页的制作，手机端个人中心的制作",
            "商城项目：商品详情页，店铺详情页，分类页面的代码重构",
        ],
        page2info2:[
            "混沌与秩序项目，负责任务和音效",
            "奇异动物园项目，负责数据和商城，多语言设计",
            "World of war 1941 项目，负责建筑系统和UI设计",
        ],
        page2info3:[
            "SwingSwing Demo的关卡制作",
        ],
        page3info:[
            "电话: ",
            "邮箱: ",
        ],
        page4info:{


        },
        title4:[
            "指弹",
            "画廊",
            "视频",
            "N/A",
        ],
        musicBox:[
            "翻弹 Kotaro oshio -Twilight",
            "开始",
            "暂停",
            "音量",
            "重置",
        ],             
        page5info:"<p>一年web前端开发，三年游戏策划</p><p>代码风骚（未加密请F12直接观看），性格开朗</p><p>希望我能成为你新的伙伴! <a href='asset/web前端-李雪辰.pdf'>点此下载简历</a></p>",
    },
	en:{
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
        docTitle:"Zealxxxz's Resume",
        title:[
            "Professional skills",
            "Project",
            "Working Experence",
            "Contact",
            "Soft Skills",
            "About",             
        ],
        info:[
            "It’s doesn’t matter if you see me or not, I am standing right there, With no emotion",
            "It’s doesn’t matter if you miss me or not, The feeling is right there, And it isn’t going anywhere",
            "It’s doesn’t matter if you love me or not, Love is right there, It is not going to change",
            "It’s doesn’t matter if you are with me or not, My hand is in your hand, And I am not going to let go",
            "Let me embrace you, or, Let me live in your heart to entirely",
            "Silence Love, Calmness Joy",
        ],
        page0info:{

        },
        page1desinfo1:[
            "LiZhi TV, an online video platform",
            "PC client：Jquery",
            "Mobile client：SUI mobile, Jquery",
        ],
        page1desinfo2:[
            "Order & Chaos :  A fantasy MMORPG video game，mainly achieved Flare island level design",
            "Wonder Zoo ：A simulation game",
        ],
        page1desinfo3:[
            "Mega man Demo of unity3D and H5, find source in <a href='https://github.com/Zealxxxz'>github</a>",
            "Swing Swing Demo video <a href='http://v.youku.com/v_show/id_XNTU1NzE1OTUy.html?from=s1.8-1-1.2&spm=a2h0k.8191407.0.0'>click here</a>",
        ],
        page2info0:[
            "负责公司前端业务的开发",
            "态势感知项目",
            "威胁情报项目",
        ],
        page2info0:[
            "Leader of web front-end develop in company",
            "态势感知Project,a big data based security management system",
            "威胁情报Project,a security info display system",
        ],
        page2info1:[
            "荔枝直播：Common library, login system, index, home page etc develop",
            "An online shopping project on Mobile：Category, Commodity, Store details page code-refactoring",
        ],
        page2info2:[
            "Order & Chaos: Level and Sound design, mainly achieved Flare island level design ",
            "Wonder Zoo: Numerical and Shop design",
            "World of war 1941: Building system and UI design",
        ],
        page2info3:[
            "SwingSwing Demo: Level design",
        ],
        page3info:[
            "Phone: ",
            "E-mail: ",
        ],
        page4info:{
            title4:[
                "FingerStyle",
                "Gallery",
                "Video",
                "N/A",
            ],

        },
        title4:[
            "FingerStyle",
            "Gallery",
            "Video",
            "N/A",
        ], 
        musicBox:[
            "Kotaro oshio -Twilight Cover",
            "Start",
            "Pause",
            "Volume",
            "Restart",
        ],
        page5info:"<p>3 years Game Designer and 1 year Web-front-end developer</p><p>Throughout my career,I tend to share my work to more people</p><p>I changed a lot, but one thing never change is I like to create, like to share</p><p>With to be your partner! <a href='asset/web-front-end Li Xuechen.pdf'>Download Resume</a></p>",
    },
}
var CVModel={
    data:{
        preLoadImg:[
            'img/menu/menu0.png',
            'img/menu/menu1.png',
            'img/menu/menu2.png',
            'img/menu/menu3.png',
            'img/menu/menu4.png',
            'img/menu/menu5.png',
            'img/menu/selector.png',
            'img/menu/圆环.png',
        ],
    },//信息存储区
	obj:{
        docTitle:document.getElementById("docTitle"),
        background:document.getElementById("background"),
        content:document.getElementById("content"),
        menuFx:document.getElementById("menuFx"),
        menu:document.getElementById("menu"),
        menuSelector:document.getElementById("menuSelector"),
        menuCenter:document.getElementById("menuCenter"),
        title:document.getElementById("title"),
        menuIcon:document.getElementById("menuIcon"),
        language_btn:document.getElementsByClassName("language_btn"),
        menuIcon:document.getElementById("menuIcon"),
        info:document.getElementById("info"),
        pages:document.getElementsByClassName('page'),
        box00:document.getElementById("box00"),

        box10:document.getElementById("box10"),
        box11:document.getElementById("box11"),
        box12:document.getElementById("box12"),
        box13:document.getElementById("box13"),

        box2s:document.getElementsByClassName('box2'),
        box2close:document.getElementById("box2close"),

        box30:document.getElementById("box30"),

        box4s:document.getElementsByClassName('box4'),
        box4close:document.getElementById("box4close"),

        box50:document.getElementById("box50"),

        page2:document.getElementById("page2"),
        page4:document.getElementById("page4"),

        oPlayPause:document.getElementById('PlayPause'),
        oReset:document.getElementById('Reset'),
        oBar:document.getElementById('bar'),
        oMusicFilter:document.getElementById('musicFilter'),        
	},
	property:{
        switchStatus:true,//菜单切换开关
	},
	init:function(){
        //内容居中显示
        function setCss(){
            var docHeight=document.documentElement.clientHeight;
            //alert(docHeight)
            if (docHeight>700) {
                var top=(docHeight-700)/2;
                CVModel.obj.content.style.marginTop=top+'px';
            };            
        }
        setCss();
        window.onresize=function(){
            setCss();
        }
	},
	run:function(){
        CommonTools.ImageLoader(CVModel.data.preLoadImg,CVModel.actionAfterLoading);
        CVModel.consoleInfo();
        CVModel.dataImport();
        CVModel.init();
        CVModel.controller();
        CVModel.camera();
        CVModel.musicBox();
	},
    dataImport:function(){
        CVModel.data=ResumeData.cn;
    },
    camera:function(){
        //animation added here
        CVModel.animate.menuBgFx();
        CVModel.animate.commonAnim01.main();

        CVModel.animate.page0Anim01.main();
        CVModel.animate.page0Anim02.main();

        CVModel.animate.page1Anim00.main();

        CVModel.animate.page2Anim00.main();
        CVModel.animate.page2Anim01.main();

        CVModel.animate.page3Anim01.main();
        CVModel.animate.page3Anim02.main();

        CVModel.animate.page4Anim00.main();
        CVModel.animate.page4Anim01.main();        

        CVModel.animate.page5Anim00.main();
        CVModel.animate.page5Anim01.main();        
        
        requestAnimationFrame(CVModel.camera);
    },
    animate:{
        data:{
            menuFxReg:0,
            menuScrollReg:0,
            menuScrollSpeed:10,
            menuScrollState:0,

            readyForClick:true,//true表示menu能够点击，false表示menu不能点击
            switchStatus:true,//true表示menu处于可转动的状态，flase表示展开的状态
        },
        menuBgFx:function(){
            CVModel.animate.data.menuFxReg+=1;
            if (CVModel.animate.data.menuFxReg==360) {
                CVModel.animate.data.menuFxReg=0;
            };
            CVModel.obj.menuFx.style.transform='rotate('+CVModel.animate.data.menuFxReg+'deg)';
            CVModel.obj.menuFx.style.webkitTransform='rotate('+CVModel.animate.data.menuFxReg+'deg)';
        },
        statusChange:function(ev){
            var wheelSpeed=CVModel.animate.data.menuScrollSpeed;
            if (ev.wheelDelta<0) {
                wheelSpeed=-wheelSpeed;
            };
            CVModel.animate.data.menuScrollReg+=wheelSpeed;

            if (CVModel.animate.data.menuScrollReg>=360) {
                CVModel.animate.data.menuScrollReg=CVModel.animate.data.menuScrollReg-360;
            }
            else if(CVModel.animate.data.menuScrollReg<0){
                CVModel.animate.data.menuScrollReg=CVModel.animate.data.menuScrollReg+360;
            }

            CVModel.obj.menuSelector.style.transform='rotate('+CVModel.animate.data.menuScrollReg+'deg)';
            CVModel.obj.menuSelector.style.webkitTransform='rotate('+CVModel.animate.data.menuScrollReg+'deg)';
            

            //计算转盘现在处于哪个状态
            var state=6-Math.floor(CVModel.animate.data.menuScrollReg/60+0.5);
            if (state==6) {
                state=0;
            };
            //当发现状态改变时就执行变化
            if (CVModel.animate.data.menuScrollState!=state) {
                CVModel.animate.data.menuScrollState=state;
                
                CVModel.obj.menuIcon.src="img/menu/menu"+CVModel.animate.data.menuScrollState+".png";
                CVModel.obj.background.style.backgroundColor=CVModel.data.bgColor[CVModel.animate.data.menuScrollState];
                CVModel.obj.menuCenter.style.backgroundColor=CVModel.data.centerColor[CVModel.animate.data.menuScrollState];
                CVModel.obj.title.innerHTML=CVModel.data.title[CVModel.animate.data.menuScrollState];
                CVModel.obj.title.style.backgroundColor=CVModel.data.centerColor[CVModel.animate.data.menuScrollState];
                CVModel.obj.info.innerHTML=CVModel.data.info[CVModel.animate.data.menuScrollState];

                var pageIdStr='page'+CVModel.animate.data.menuScrollState;
                for (var i = 0; i < CVModel.obj.pages.length; i++) {

                    if (CVModel.obj.pages[i].id==pageIdStr) {
                        if (CVModel.obj.pages[i].id=='page2'||CVModel.obj.pages[i].id=='page4') {
                            CVModel.obj.pages[i].style.zIndex=3;
                        }
                        else{
                            CVModel.obj.pages[i].style.zIndex=1;
                        }
                    }
                    else{
                        CVModel.obj.pages[i].style.zIndex=0;
                    }
                };
            };
        },
        togglePage:function(){
            
            switch (CVModel.animate.data.menuScrollState){
                case 0:page0AnimationController();break;
                case 1:page1AnimationController();break;
                case 2:page2AnimationController();break;
                case 3:page3AnimationController();break;
                case 4:page4AnimationController();break;
                case 5:page5AnimationController();break;
            }
            CVModel.animate.data.readyForClick=false;
            CVModel.animate.data.switchStatus=false;
            function page0AnimationController(){
                if (CVModel.animate.data.switchStatus==true) {
                    animController(CVModel.animate.commonAnim01,'a',function(){
                        CVModel.obj.box00.style.display='block';
                        animController(CVModel.animate.page0Anim01,'a',function(){
                            animController(CVModel.animate.page0Anim02,'b',function(){
                                CVModel.animate.data.readyForClick=true;
                            });
                        })
                    });
                }
                else{
                    animController(CVModel.animate.page0Anim02,'a',function(){
                        CVModel.obj.box00.style.display='none';
                        animController(CVModel.animate.page0Anim01,'b',function(){
                            animController(CVModel.animate.commonAnim01,'b',function(){
                                CVModel.animate.data.switchStatus=true;
                                CVModel.animate.data.readyForClick=true;                                
                            });
                            
                        })
                    });                    
                }
            }
            function page1AnimationController(){
                var contents=document.getElementsByClassName("box1content");
                if (CVModel.animate.data.switchStatus==true) {
                    animController(CVModel.animate.commonAnim01,'a',function(){

                        animController(CVModel.animate.page1Anim00,'b',function(){
                            CVModel.animate.data.readyForClick=true;
                            for (var i = 0; i < contents.length; i++) {
                                contents[i].style.display="block";
                            };                            
                        })
                    });
                }
                else{
                    for (var i = 0; i < contents.length; i++) {
                        contents[i].style.display="none";
                    };                    
                    animController(CVModel.animate.page1Anim00,'a',function(){
                        animController(CVModel.animate.commonAnim01,'b',function(){
                            CVModel.animate.data.switchStatus=true;
                            CVModel.animate.data.readyForClick=true; 
                        })
                    });
                }
            }

            function page2AnimationController(){
                if (CVModel.animate.data.switchStatus==true) {
                    CVModel.obj.page2.style.display='block';
                    animController(CVModel.animate.page2Anim00,'a',function(){
                        for (var i = 0; i < CVModel.obj.box2s.length; i++) {
                            CVModel.obj.box2s[i].style.display='block';
                            CVModel.obj.box2close.style.display='block';
                        };
                        animController(CVModel.animate.page2Anim01,'b',function(){
                            //CVModel.animate.data.readyForClick=true;
                        });    
                    });
                }
                else{
                    
                    animController(CVModel.animate.page2Anim01,'a',function(){
                        for (var i = 0; i < CVModel.obj.box2s.length; i++) {
                            CVModel.obj.box2s[i].style.display='none';
                        };
                        CVModel.obj.box2close.style.display='none';
                        animController(CVModel.animate.page2Anim00,'b',function(){
                            CVModel.obj.page2.style.display='none';
                            
                            CVModel.animate.data.switchStatus=true;
                            CVModel.animate.data.readyForClick=true;
                        });    
                    });
                }
            }

            function page3AnimationController(){
                if (CVModel.animate.data.switchStatus==true) {
                    animController(CVModel.animate.commonAnim01,'a',function(){
                        animController(CVModel.animate.page3Anim01,'a',function(){
                            CVModel.obj.box30.style.display='block';
                            animController(CVModel.animate.page3Anim02,'b',function(){
                                CVModel.animate.data.readyForClick=true;
                            })
                        })                        
                    });
                }
                else{
                    animController(CVModel.animate.page3Anim02,'a',function(){
                        CVModel.obj.box30.style.display='none';
                        animController(CVModel.animate.page3Anim01,'b',function(){
                            animController(CVModel.animate.commonAnim01,'b',function(){
                                CVModel.animate.data.switchStatus=true;
                                CVModel.animate.data.readyForClick=true; 
                            })
                        })                        
                    });
                }
            }

            function page4AnimationController(){
                if (CVModel.animate.data.switchStatus==true) {
                    CVModel.obj.page4.style.display='block';
                    
                    animController(CVModel.animate.page4Anim00,'a',function(){
                        for (var i = 0; i < CVModel.obj.box4s.length; i++) {
                            CVModel.obj.box4s[i].style.display='block';
                        };
                        CVModel.obj.box4close.style.display='block';
                        animController(CVModel.animate.page4Anim01,'b',function(){
                            CVModel.animate.data.readyForClick=true;
                        });    
                    });
                }
                else{
                    
                    animController(CVModel.animate.page4Anim01,'a',function(){
                        for (var i = 0; i < CVModel.obj.box4s.length; i++) {
                            CVModel.obj.box4s[i].style.display='none';
                        };
                        box4close.style.display='none';
                        animController(CVModel.animate.page4Anim00,'b',function(){
                            CVModel.obj.page4.style.display='none';
                            
                            CVModel.animate.data.switchStatus=true;
                            CVModel.animate.data.readyForClick=true;
                        });    
                    });
                }
            }

            function page5AnimationController(){//这里注意，原PAGE2的动画放到了page5了
                if (CVModel.animate.data.switchStatus==true) {
                    animController(CVModel.animate.page5Anim00,'b',function(){
                        animController(CVModel.animate.page5Anim01,'b',function(){
                            CVModel.animate.data.readyForClick=true;                            
                        })
                    });
                }
                else{
                    animController(CVModel.animate.page5Anim01,'a',function(){
                        animController(CVModel.animate.page5Anim00,'a',function(){
                            CVModel.animate.data.switchStatus=true;
                            CVModel.animate.data.readyForClick=true;                            
                        })
                    });
                }
            }            
            function animController(target,type,callback){
                target.type=type;
                target.trigger=true;
                target.callback=callback;
            }
        },
        commonAnimToggle:function(prop,anim){
            if (prop.trigger==false) {
                return;
            };
            prop.type=='a'?prop.targetData-=prop.speed:prop.targetData+=prop.speed;
            if (prop.targetData==prop.rangeB||prop.targetData==prop.rangeA) {
                prop.trigger=false;
                if (prop.callback) {
                    prop.callback();
                };
            };
            if (anim) {
                anim();
            };
        },
        commonAnim01:{
            //开关
            trigger:false,
            //运动类型
            type:'a',//"a","b"
            //回调函数
            callback:null,
            //属性
            rangeA:500,
            rangeB:350,
            targetData:500,
            speed:10,
            main:function(){

                var prop=this;
                function anim(){
                    var target=CVModel.obj.menuSelector.style;
                    target.width=prop.targetData+'px';
                    target.height=prop.targetData+'px';
                    target.left=(500-prop.targetData)/2+'px';
                    target.top=(500-prop.targetData)/2+'px';                    
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }
        },
        page0Anim01:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:230,
            targetData:230,
            speed:10,
            main:function(){
                var prop=this;
                function anim(){
                    var target=CVModel.obj.menu.style;
                    target.left=prop.targetData+'px';                   
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }
        },
        page0Anim02:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:470,
            targetData:0,
            speed:23.5,
            main:function(){
                var prop=this;
                
                function anim(){
                    var target=CVModel.obj.box00.style;
                    target.width=prop.targetData+'px';
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }
        },
        page1Anim00:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:260,
            targetData:0,
            speed:10,
            main:function(){
                var prop=this;
                function anim(){
                    var xData=prop.targetData*47/26;
                    var yData=prop.targetData;

                    var target0=CVModel.obj.box10.style;
                    target0.width=xData+'px';
                    target0.height=yData+'px';
                    target0.left=(470-xData)+'px';
                    target0.top=(260-yData)+'px';

                    var target1=CVModel.obj.box11.style;
                    target1.width=xData+'px';
                    target1.height=yData+'px';
                    target1.right=(470-xData)+'px';
                    target1.top=(260-yData)+'px';

                    var target2=CVModel.obj.box12.style;
                    target2.width=xData+'px';
                    target2.height=yData+'px';
                    target2.left=(470-xData)+'px';
                    target2.bottom=(260-yData)+'px';

                    var target3=CVModel.obj.box13.style;
                    target3.width=xData+'px';
                    target3.height=yData+'px';
                    target3.right=(470-xData)+'px';
                    target3.bottom=(260-yData)+'px';
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }
        },
        page2Anim00:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:10,
            targetData:10,
            speed:1,
            main:function(){
                var prop=this;
                function anim(){
                    var target=CVModel.obj.menu.style;
                    target.opacity=prop.targetData/10;
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }            
        },        
        page2Anim01:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:10,
            targetData:0,
            speed:1,
            main:function(){
                var prop=this;
                function anim(){
                    var opacity=prop.targetData/10;
                    for (var i = 0; i < CVModel.obj.box2s.length; i++) {
                        CVModel.obj.box2s[i].style.opacity=opacity;
                    };
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }            
        },
        page3Anim01:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:70,
            targetData:70,
            speed:5,
            main:function(){
                var prop=this;
                function anim(){
                    var target=CVModel.obj.menu.style;
                    target.top=prop.targetData+'px';
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }
        },
        page3Anim02:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:10,
            targetData:0,
            speed:1,
            main:function(){
                var prop=this;
                function anim(){
                    var target=CVModel.obj.box30.style;
                    target.opacity=prop.targetData/10;
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }
        },
        page4Anim00:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:10,
            targetData:10,
            speed:1,
            main:function(){
                var prop=this;
                function anim(){
                    var target=CVModel.obj.menu.style;
                    target.opacity=prop.targetData/10;
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }            
        },        
        page4Anim01:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:10,
            targetData:0,
            speed:1,
            main:function(){
                var prop=this;
                function anim(){
                    var opacity=prop.targetData/10;
                    for (var i = 0; i < CVModel.obj.box4s.length; i++) {
                        CVModel.obj.box4s[i].style.opacity=opacity;
                    };
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }            
        },        
        page5Anim00:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:0,
            rangeB:90,
            targetData:0,
            speed:5,
            main:function(){
                var prop=this;
                function anim(){
                    var target=CVModel.obj.menu.style;
                    // if (prop.targetData==360) {
                    //     prop.targetData=0;
                    // };
                    target.transform="rotateX("+prop.targetData+"deg)";
                    target.webkitTransform="rotateX("+prop.targetData+"deg)";
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }
        },
        page5Anim01:{
            trigger:false,
            type:'a',//"a","b"
            callback:null,
            rangeA:270,
            rangeB:360,
            targetData:270,
            speed:5,
            main:function(){
                var prop=this;
                function anim(){
                    var target=CVModel.obj.box50.style;
                    // if (prop.targetData==360) {
                    //     prop.targetData=0;
                    // };
                    target.transform="rotateX("+prop.targetData+"deg)";
                    target.webkitTransform="rotateX("+prop.targetData+"deg)";
                }
                CVModel.animate.commonAnimToggle(prop,anim);
            }
        },        
    },
    controller:function(){
        //语言切换
        function changeLanguage(target,index/*target是被点击的dom元素,index是第几个按钮*/){
            var classArr=target.className.split(' ');
            if (classArr.length==1) {
                if (index==0) {
                    target.className='language_btn language_btnActive';
                    CVModel.obj.language_btn[1].className='language_btn';
                    CVModel.languageChange('en');
                }
                else{
                    target.className='language_btn language_btnActive';
                    CVModel.obj.language_btn[0].className='language_btn';
                    CVModel.languageChange('cn');                   
                }
            }
            else{
                return;
            }
        }
        CVModel.obj.language_btn[0].onclick=function(){
            changeLanguage(this,0);
        }
        CVModel.obj.language_btn[1].onclick=function(){
            changeLanguage(this,1);
        }

        //菜单滚动
        function goWheel(ev){
            if (CVModel.property.switchStatus) {
                CVModel.animate.statusChange(ev);
            };
            return false;
        } 
        CVModel.obj.menu.onmousewheel=function(ev){
            //readyForClick:true,//true表示menu能够点击，false表示menu不能点击
            //switchStatus:true,//true表示menu处于可以关闭的状态，flase表示展开的状态

            if (CVModel.animate.data.switchStatus==true) {
                textInitStart();
                goWheel(ev);
            };
            return false;
        }
        CVModel.obj.menu.addEventListener('touchmove', function(ev){
            if (CVModel.animate.data.switchStatus==true) {
                textInitStart();
                goWheel(ev);
            };
            return false;
        }, false);                  
        CVModel.obj.menu.addEventListener('DOMMouseScroll', function(ev){
            if (CVModel.animate.data.switchStatus==true) {
                textInitStart();
                goWheel(ev);
            };
            return false;
        }, false);        
        //菜单点击
        CVModel.obj.menu.onclick=function(){
            if (CVModel.animate.data.readyForClick==true) {
                textInitStart();
                CVModel.animate.togglePage();
            };
        }
        CVModel.obj.box50.onclick=function(){
            if (CVModel.animate.data.readyForClick==true) {
                CVModel.animate.togglePage();
            };
        }
        CVModel.obj.box2close.onclick=function(){
            CVModel.animate.togglePage();
        }
        CVModel.obj.box4close.onclick=function(){
            CVModel.animate.togglePage();
        }
        //在用户操作界面的时候载入文字
        var startSwitch=true;
        function textInitStart(){
            if (startSwitch) {
                startSwitch=false;
                var activeElement=document.getElementsByClassName('language_btnActive')[0];
                if (activeElement.id=='btn_en') {
                    CVModel.languageChange('cn');
                }
                else{
                    CVModel.languageChange('en');
                }
            };
        }
        //boxHover上的效果
        var hoverBox=document.getElementsByClassName('hasHover');
        var hoverShadow=document.getElementsByClassName('boxShadow');
        for (var i = 0; i < hoverBox.length; i++) {
            hoverBox[i].onmouseover=function(){
                this.getElementsByClassName('boxShadow')[0].style.display='block';
            }
            hoverBox[i].onmouseout=function(){
                this.getElementsByClassName('boxShadow')[0].style.display='none';
            }
        };

        //详情弹出框
        var hasPop=document.getElementsByClassName('hasPop');
        for (var i = 0; i < hasPop.length; i++) {
            hasPop[i].onclick=function(){
                console.log(this.id);
                if (this.id=='box41') {
                    CVModel.galleryCreate();
                };
                var str=this.id+'Pop';
                document.getElementById(str).style.display='block';
                var opacity=0;
                var timer=setInterval(function(){
                    
                    if (opacity<15) {
                        opacity+=1;
                    }
                    else{
                        clearInterval(timer);
                    }
                    document.getElementById(str).style.opacity=opacity/15;
                }, 16);
            }
        };
        var bigPopCloseBtn=document.getElementsByClassName('BigPopCloseBtn');
        for (var i = 0; i < bigPopCloseBtn.length; i++) {
            bigPopCloseBtn[i].onclick=function(){
                this.parentNode.style.display='none';
                this.parentNode.style.opacity=0;
            }
        };        
    },
    languageChange:function(language){
        CVModel.data=ResumeData[language];
        //这里开始文本替换工作
        var BindingDataobjs=document.getElementsByClassName('dataBinding');
        for (var i = 0; i < BindingDataobjs.length; i++) {
            if (BindingDataobjs[i].getAttribute('bindingIndex')!=null) {
                BindingDataobjs[i].innerHTML=CVModel.data[BindingDataobjs[i].getAttribute('bindingData')][eval(BindingDataobjs[i].getAttribute('bindingIndex'))];
            }
            else{
                BindingDataobjs[i].innerHTML=CVModel.data[BindingDataobjs[i].getAttribute('bindingData')];
            }
        };
    },
    musicBox:function(){
        var au =document.createElement("audio");
        au.preload="auto";
        au.src="sfx/黄昏.mp3";
        au.volume=0.6;
        var status=true;
        CVModel.obj.oPlayPause.onclick=function(){
            if (status) {
                au.play();
                CVModel.obj.oPlayPause.innerHTML="暂停";
            }
            else{
                au.pause();
                CVModel.obj.oPlayPause.innerHTML="播放";
            }
            status=!status;
        }
        CVModel.obj.oReset.onclick=function(){
            au.src="";
            au.src="sfx/黄昏.mp3";
            CVModel.obj.oPlayPause.innerHTML="开始";
            status=true;
        }
        var volume;
        CVModel.obj.oBar.onmousedown=function (ev)
        {
            var oEvent=ev||event;
            var disX=oEvent.clientX-CVModel.obj.oBar.offsetLeft;
            document.onmousemove=function (ev)
            {
                var oEvent=ev||event;
                var l=oEvent.clientX-disX;
                var objLeft=Number(CVModel.obj.oBar.style.left.replace("px",""));
                
                if (l<=90&&l>=-10) {
                    CVModel.obj.oBar.style.left=l+'px';
                    CVModel.obj.oMusicFilter.style.width=l+10+"px";
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
    galleryCreate:function(){

        var trigger=true;
        if (trigger) {
            trigger=false;
            var a=[];
            for (var i = 0; i < 25; i++) {
                var img =new Image();
                img.src='img/art/paint'+i+'.jpg';
                img.id="picture"+i;
                img.onload=function(){
                    img.width=300;
                    appendImg(this);
                } 
            };
            var gallerys = document.getElementsByClassName("imgContainer");
            var oShowArea=document.getElementById("p531");
            var oImgShow=document.getElementById("paintShow");           
            var gallerysHeight=[0,0,0];
            function appendImg(img){
                //console.log(img.width);
                var cHeight=300*img.height/img.width;
                img.width=300;
                img.height=cHeight;
                img.style.cursor='pointer';
                img.onclick=function(){
                    oImgShow.src=this.src;
                     var opacity=0;
                     var timer =setInterval(function(){
                         if (opacity<15) {
                             opacity+=1;
                         }
                         else{
                             clearInterval(timer);
                         }
                         oShowArea.style.opacity=opacity/15;
                     }, 16);
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
                var index =getMinHeightIndex();
                gallerys[index].appendChild(img);
                gallerysHeight[index]+=cHeight;
                function getMinHeightIndex(){
                    var index=0;
                    var tempHeight=gallerysHeight[0];
                    for (var i = 1; i < gallerysHeight.length; i++) {
                        if (gallerysHeight[i]<tempHeight) {
                            index=i
                        };
                    };
                    return index;
                }
            }

            var oP531CloseBtn=document.getElementById("p531CloseBtn");
            oP531CloseBtn.onclick=function(){
                oShowArea.style.display="none";
                oShowArea.style.opacity=0;
            }
        };      
    },
    actionAfterLoading:function(){
        document.getElementById('Loading').style.display='none';
        var images=document.getElementsByTagName('img');
        var length=images.length;
        for (var i = 0; i < length; i++) {
            images[i].src=images[i].getAttribute('imgsrc');
        };
    },
    consoleInfo:function(){
        var message='一张网页，要经历怎样的过程，才能让你找到这里？\n一位雇员，要经历怎样的磨炼，才能进去你的公司？\n追求未知真理\n携手迎接挑战\n共创美好未来\n请拨打电话至：13269013574';
        var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;

        if (isChrome) {
            console.log('%c'+message+'', 'font-size:12px;color:#000;text-shadow:0 1px 0#ccc,0 1px 0 #c9c9c9,0 1px 0 #bbb,0 4px 0 #b9b9b9,0 1px 0 #aaa,0 1px 1px rgba(0,0,0,.1),0 0 1px rgba(0,0,0,.1),0 1px 1px rgba(0,0,0,.3),0 1px 1px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 1px 1px rgba(0,0,0,.2),0 1px 1px rgba(0,0,0,.15);');
        } else {
            console.log(message);
        }
    }
}
CommonTools.ready(CVModel.run);