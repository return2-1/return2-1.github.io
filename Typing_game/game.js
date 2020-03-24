
var oo = (function(){
	var grade = {
gradeboard:document.getElementsByClassName("gradeboard")[0],
over : document.getElementsByClassName("over")[0],
score:0,
lostletter:0,
maxlost:15,
//成绩内容函数
gradecontent:function(){
     
	this.gradeboard.innerHTML = `<p>得分：${this.score}</p>
<p>丢失：${this.lostletter}/${this.maxlost}</p>`
},
//得分功能
addScore:function(){
if(this.lostletter >= this.maxlost){return;}
	this.score += 10;
	this.gradecontent();
},

//丢失字母时计数功能
lostLetter:function(){
	this.lostletter += 1;
	if(this.lostletter > this.maxlost){return;};
	if(this.lostletter == this.maxlost){this.over.style.display = "block";go.addLock = 1;};
	this.gradecontent();
},
}
//困难级别功能
var fallspeed = 3;
var createspeed = 2;
var gameDeploy = document.getElementsByClassName("gameDeploy")[0];
var degreeDom = document.getElementsByClassName("degree")[0];
function degree(){
var lis = degreeDom.getElementsByClassName("di");
let len = lis.length;
for(let i = 0; i < len; i ++){
	lis[i].addEventListener('click',function(){
		if(i == 0){
			grade.maxlost = 15;
			

		}else if(i == 1){
			grade.maxlost = 10;
			fallspeed = 2;
			createspeed = 2;
		}else if(i == 2){
			grade.maxlost = 5;
			fallspeed= 2;
			createspeed = 1.5;
		}
	},false)
}

grade.gradecontent();
};
gameDeploy.addEventListener('click',degree,false);
grade.gradecontent();



var letterImgs = document.getElementsByClassName("letter-container")[0];
var letters = []
var duration = 0.016;
var imgSpeed = 50;
//生成一个随机的字母 ，并且将其以一个变量的格式添加进数组里，这个变量里又属于对自身的操作的方法。
 function createLetter(){
    var img = document.createElement("img");
	img.className = "letter";
	var char = randomLetter();
    img.src = "./img/letter/" + char + ".png";
    letterImgs.appendChild(img);
    var lef = random(0,letterImgs.clientWidth - img.width);//为什么不能用window.getComputedStyle(letterImgs,null).width方法。
    img.style.left = lef + "px";
    
    
   //随机数功能
  function random(min,max){
return Math.floor(Math.random()*(max - min)) + min; 
};

//随机大写字母功能
  function randomLetter(){
var randomNum = random(65,65+26) //随机出A-Z的asc码，
var Letter = String.fromCharCode(randomNum);//随机出相应的大写字母
return Letter;
};
 
var letter = {
dom: img,
char: char,
speed: random(100,300),
top: -img.offsetHeight,
render : function (){
 this.dom.style.top = this.top + "px";
},
move : function (duration){
 var di = duration * this.speed;//duration是时间，单位：秒。每秒移动this.speed的距离。
 this.top += di;
 this.render();
},
kill : function(){

     var index = letters.indexOf(this);//可以选出该对象在数组中的位置。
     if(index >= 0){
     	letters.splice(index,1);//从数组中移除该对象
     };
      	this.dom.remove();//删除自身。
      
},

};
letter.render(); 
letters.push(letter);
};

//组装游戏功能
var go ={
addLock : null,
fallLock : null,
//持续生产字母功能
add: function (){
	var self =this;
    
   var addletter = setInterval(function(){
     if(self.addLock){clearInterval(addletter);}
   	createLetter();},createspeed * 500);
},

//字母下落功能
fall : function (){
var self = this;

var time = setInterval(function(){
	if(grade.lostletter == grade.maxlost){clearInterval(time)};
	if(self.addLock){ return;};
		for(var i = 0; i < letters.length; i ++){
			var letter = letters[i];
            if(parseInt( window.getComputedStyle(letter.dom,null).top) >= parseInt( window.getComputedStyle(letterImgs,null).height)){
		        letter.kill();
		       i --;
	            grade.lostLetter(); //丢失加一；
	};
	letter.move(duration);
};
			
			
		
	},16 * fallspeed
);

},
//字母消失功能
Kill : function (){
for(var i = 0; i < letters.length; i ++){
	var letter = letters[i];
	};
},

start : function (){
	this.add();
	this.fall();
    },
};
var rebirth = document.getElementsByClassName("rebirth")[0];
var startButton = document.getElementsByClassName("button")[0];//将游戏开关放入这个点击事件内。
var gameMethod = function(){
	startButton.addEventListener ('click',function(){
	go.start();
	gameDeploy.style.display = "none";
},false);
rebirth.addEventListener('click',function(){
for(var i = 0; i < letters.length; i++){
	var letter = letters[i];
	if(letter.top >= -parseInt(window.getComputedStyle(letter.dom,null).height)){
		letter.kill();
		i --;
	}
}
grade.score = 0;
grade.lostletter = 0;
grade.over.style.display = "none";
grade.gradecontent();
go.addLock = false;
go.start();
	
})
setTimeout(go.fall,10)
//注册键盘监听事件
window.onkeydown = function(e){
	if(go.addLock){return;};
	for(var i = 0; i < letters.length; i ++){
		var letter = letters[i];
		
if( e.key.toUpperCase() == letter.char){
	letter.kill();//删除自身
	grade.addScore();//分数++。
};

}
}}
return gameMethod;
}());
oo();