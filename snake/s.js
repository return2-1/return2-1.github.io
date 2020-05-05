
var name = (function(){
var viewport = null,
    lis = null,
    ul = null,
    head = null,
    li_arr =null,
    row = null,//此时是否横向移动
    left_m =null,
    top_m = null,
    speed = null,
    lastcode=null,
    lsTop=null,
    lsleft=null,
    // bh_t = 
    time = null;

var initData = function(){
    // viewport = document.getElementsByClassName("viewport")[0],
    // lis = viewport.getElementsByTagName('li'),
    // ul = viewport.getElementsByTagName('ul')[0],
    // head = document.getElementsByClassName('head')[0],
    // li_arr = [head],
    row = false,//此时是否横向移动
    lastrow = row,
    left_m = true,
    top_m = false,
    speed = 1,
    lastcode=null,
    lstop=null,
    lsleft=null,
    time = null,
    t = null,
    l = null;
};    


var headmove = function(){//蛇头移动函数
    var ul = document.getElementsByTagName('ul')[0];
    // var  head = ul.children[ul.children.length-1];
    var head = ul.getElementsByClassName("head")[0];
    
    lstop = head.offsetTop;
    lsleft = head.offsetLeft;
     
   console.log(lstop);
   if(row){
       if(left_m){
        head.style.left =head.offsetLeft - speed + "px";
       }else{
        head.style.left =head.offsetLeft + speed + "px";
       };
      
   }else{
    if(top_m){
        head.style.top =head.offsetTop- speed + "px";
       }else{
        head.style.top =head.offsetTop+ speed + "px";
       };
   };
if(lastrow === row){
      //没变向
}else{
    //变向了
    if(lstop!==head.offsetTop){//上下位置没变。
        bh_l = lsleft;
        return;
    }else{
        bh_l = false;
    };
 
    if(lsleft!==head.offsetLeft){//左右位置变了。
        bh_t = lstop;
    }else{
        bh_t = false;
    };

}
   

};

var grow = function(){
    var ul = document.getElementsByTagName('ul')[0];
if(ul.children.length === 0){
    var li = document.createElement("li");
    li.setAttribute('class','head');
    ul.appendChild(li);
}
console.log(ul.children[0])
 
    for(var i = 0 ; i < 4; i++){
       
        var li = document.createElement("li");
       ul.appendChild(li);
    //    if(i === 0){
    //     // console.log(ul.children)
    // };
    // console.log(ul.children)
    };
    console.log(ul.children);
   };


var bodymove = function(){
   var li = document.getElementsByTagName("li");
   var ul = document.getElementsByTagName('ul')[0];
//    console.log(ul.children)
    var len = ul.children.length;
  if(len>0){
    //   console.log(li[1].offsetTop);

      for(var i = 1; i < len; i++){
         
    //     // console.log("1");
    if(i == 1){
    li[1].style.left=lsleft + 'px';
    li[1].style.top=lstop + 'px';
    }else{
    li[i].style.left=l + 'px';
    li[i].style.top=t + 'px';
    }
    t=li[i].offsetTop;
    l=li[i].offsetLeft;
    
    // console.log(l);
    
    };

    };
   
    // // console.log(1);

   
    

};

var snake_m = function(){
       headmove();
       bodymove();


};


var bandle = function(){
    document.addEventListener("keydown",function(e){
        var keycode = e.keyCode;
        lastrow = row;
        if(row){           
            if(keycode === 38 && lastcode !== 38){
                row = false;
                  top_m = true;
            }else if(keycode ===  40 && lastcode !== 40){
                row = false;
                  top_m = false;   
            };
        }else{
               if(keycode === 37&& lastcode !== 37){      
                row = true;          
                left_m = true;
            }else if(keycode === 39 && lastcode !==39){
                row = true;
                left_m = false;
            };
        }
        lastcode = keycode;

    });  


};






// return;
var start = function(){
    grow();
    initData();    
    bandle();
    time = setInterval(snake_m,16);

}

return start();


}());
