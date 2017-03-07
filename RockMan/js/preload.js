		var CommonTools={
			preLoadImg:function(urlArr,fn){
				var imgArr=[];
				var loadSuccessIndex=0;
				for (var i = 0; i < urlArr.length; i++) {
					imgArr[i] = new Image();
					imgArr[i].src=urlArr[i];
					imgArr[i].onload=function(){
						loadSuccessIndex++;
						var percentage=loadSuccessIndex/urlArr.length*100+"%";
							console.log(percentage);
						checkAll();
					}
				};
				function checkAll(){
					if (loadSuccessIndex==urlArr.length) {
						if (fn) {
							fn();
						};
					};
				}
			}
		};
		var ImgData=[
			"img/boss.png",
			"img/final1.png",
			"img/megaManGround.png",
			"img/megaManWall.png",
			"img/story00.png",
			"img/story01.png",
		];
		CommonTools.preLoadImg(ImgData,function(){
			var img2=new Image();
			img2.src="img/boss.png";
		});