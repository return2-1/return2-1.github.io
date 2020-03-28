

var searches = {
   content : ``,
   valuesAgo : "",//输入框之前值。
   arr_content : [],//搜索框列表
   ul : null,//搜索列表dom元素
   inp : null,//搜索框dom元素
  



   init : function(){
   	this.initData();    
   	this.onfoucs()
   

   },

 initData : function(){
this.ul = document.getElementsByClassName("search-list")[0];
this.inp = document.getElementsByClassName("inp-text")[0];
 },

 
//输入框监听事件oninput
onfoucs: function(){
	var self = this;
	this.ul.style.display = "block";
    this.inp.oninput = function(e){
    	 var  t_values = e.target.value.trim();//获取输入框内文字
    	 self.traverse(t_values,searchObj);//执行匹配数据
       if(t_values == self.valuesAgo){return;}//如果当前值与之前的相等。则停止动作
       self.addmovie();//输出对应的列表；
        self.valuesAgo = t_values; 
       
    }
},
 // 搜索框状态判断
 onblur : function(){
 	this.ul.style.display = "none";

        
 },

//传入输入框value值，执行从给定的对象里遍历出对应的数组并赋给。。。
   traverse : function(text,obj){
   	if(!obj){return;}
   	this.arr_content = [];
	   	// if(!text){this.ul.innerHTML = null;};
   	for(var key in obj){
   		if(key === text){
             // this.ul.innerHTML = null;
             
             
   			this.arr_content = obj[key];
   			
   			return;
   		}
   	}
   	this.ul.innerHTML = null;//如果以上没有匹配到值，则清空列表。
   },
   // 将遍历出来的数组内容添加到HTML里面
   addmovie : function(){
   	console.log(this.arr_content)
   	 var len = this.arr_content.length;
   	 // if(!len){ return;};
   	 this.content = '';//初始化列表
   	for(var i = 0; i < len; i ++){

   		this.content += `<li class="movie">
				<div class="m-poster"><img src="${this.arr_content[i].img}" url = "${this.arr_content[i].url}"></div>
				<div class="m-intro">
					<div class="title">
						<span class="m-name">${this.arr_content[i].title}</span>
					<span class="time">${this.arr_content[i].year}</span>
					</div>
					
					<div class="sub-title">${this.arr_content[i].sub_title}</div>
					<div class="episode">共${this.arr_content[i].episode}集</div>
				</div>
			</li>`;
   	}
      this.ul.innerHTML = this.content;
      this.ul.style.display = len == 0 ? "none" : "block";
   },

};


