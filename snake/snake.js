(function(){
    var sw = 20, //一个方块宽度
    sh = 20, //一个方块高度
    tr = 30, //行数
    td = 50; //列数

var start_btn = document.getElementsByTagName('button')[0],
    pause_btn = document.getElementsByTagName('button')[1],
    start_game = document.getElementsByClassName('start')[0],
    pause = document.getElementsByClassName('pause')[0],
    view = document.getElementsByClassName('viewport')[0],
    rethink = document.getElementsByClassName("rethink")[0],
    snake_box = document.getElementsByClassName('snake')[0],
    rethink_btn = rethink.getElementsByTagName('button')[0];


function Square(x,y,classname){//方块创建构造函数
    this.x = sw*x;
    this.y = sh*y;
    this.class = classname;
    this.viewContent = document.createElement('div');
    this.viewContent.className = this.class;
    this.parent = document.getElementsByClassName('snake')[0];
    
};

 
Square.prototype.create = function(){//方块添加功能；
       this.viewContent.style.position = "absolute";
       this.viewContent.style.left = this.x + "px";
       this.viewContent.style.top = this.y + "px";
       this.parent.appendChild(this.viewContent);



};

Square.prototype.remove=function(){//方块删除功能；
    this.parent.removeChild(this.viewContent);
};

function Snake(){//蛇蛇构造函数；
    this.head = null;
    this.tail = null;
    this.pos=[];//蛇每一节的坐标存储；
    this.timer = null;//计时器实例
    this.foodes = null;//食物实例
    this.eating = false;//吃了吗？
    this.food_zb = null;//食物坐标实例
    this.count = 0;
   
    this.head = new Square(2,0,'head');
    this.head.create();
    this.pos.push([this.head.x/20,this.head.y/20]);
   
     
    this.body1 = new Square(1,0,'');
    this.body1.create();
    this.pos.push([this.body1.x/20,this.body1.y/20]);
    this.body1.next = this.head;
    this.body1.last = this.body;

    this.body = new Square(0,0,'');
    this.body.create();
    this.tail = this.body;
    this.pos.push([this.body.x/20,this.body.y/20]);
    this.body.next = this.body1;
    this.body.last = null;
    this.head.next = null;
    this.head.last = this.body1;


    
    this.movedirection = {//移动方向数据；
        left:{
            x:-1,
            y:0,
    
        },
        right:{
            x:1,
            y:0,
        },
        up:{
            x:0,
            y:-1
        },
        down:{
            x:0,
            y:1,
        }

    }
    this.direction = this.movedirection.right;//蛇的移动方向；
// console.log(this.direction)
};
 
Snake.prototype.move=function(x,y){//蛇移动函数，参数为蛇头下一步的位置。

    //撞墙之后
    if(x < 0 || x > 49 || y < 0 || y > 29){
        console.log("游戏结束");
        this.over();
        return;
    }


    //咬到自己之后，需要对比下一步蛇头的位置坐标在不在自己身上，   
        this.pos.forEach(function(value){
            if(x == value[0] && y == value[1]){
                console.log('游戏结束');
                snake.over();
                return;
            };
        });  
    var nx = this.head.x/20;//移动前头位置的x坐标
    var ny = this.head.y/20;//移动前头位置的y坐标
    var n_last = this.head.last;//将头部移动前的上一个方块链接记录下来
    this.head.remove();//删除现在的头
    this.head = new Square(x,y,'head')//在新的位置创建一个新的头
    this.head.create();
    this.pos.push([this.head.x/20,this.head.y/20]);
    
    

    this.newbody = new Square(nx,ny,'');//在原来头的位置创建一节身体，造成蛇移动/转向的视觉效果；
    this.newbody.create();
    n_last.next = this.newbody;//让新建立的一节身体与前一节身体建立联系
    this.newbody.last = n_last;//将这两个新创建的部分与整体建立链接关系；
    this.newbody.next = this.head;
    this.head.last = this.newbody;
    this.head.next = null;
    

    this.eat = function(){//如果蛇吃到食物了，就不执行该删除尾部的代码；
        if(!this.eating){
        var tail_next = this.tail.next;
        var tx = this.tail.x/20;
        var ty = this.tail.y/20;
        for(var i = 0; i<this.pos.length; i++){
            if(tx == this.pos[i][0]&& ty == this.pos[i][1]){
                this.pos.splice(i,1);
            };
        };
        this.tail.remove();
        // console.log(this.pos);
        this.tail = tail_next;
        this.tail.last = null;
        // console.log(this.pos);

    };
        };
        
     //吃到食物之后
    // 
    if(this.food_zb[0] == x && this.food_zb[1] ==y){
        this.eating =true;
        this.eat.call(this);
        this.eating = false;
        this.food();
        this.count ++;
        return;


    }
    //正常移动时
    this.eat();
};

Snake.prototype.food = function(){

    var x = Math.floor( Math.random()*50);
    var y =Math.floor( Math.random()*30);
    for(var i = 0; i < this.pos.length; i ++){
        if(x == this.pos[i][0] && y == this.pos[i][1]){
            snake.food();
            return;
        }
    }
    // console.log(this.foodes)
    if(this.foodes){
        this.foodes.viewContent.style.left = x*20 + "px";
        this.foodes.viewContent.style.top = y*20 + "px";
        this.food_zb = [x,y];
        return;
    };

    this.foodes = new Square(x,y,'food');
    this.foodes.viewContent.style.borderRadius = 10 + 'px';
    this.foodes.create();
    // this.food.parent.appendChild(this.food);
    this.food_zb = [x,y];
    // console.log(this.foodes)
}

Snake.prototype.keydown=function(){//按上下左右后，改变蛇的移动方向；
      document.addEventListener('keydown',function(e){
          var keycode = e.keyCode;
        //   console.log(snake.direction)
          if(keycode == 38 && snake.direction !==snake.movedirection.down){
              snake.direction = snake.movedirection.up;
            //   console.log("up")
          };
          if(keycode == 40 && snake.direction !=snake.movedirection.up){
            snake.direction = snake.movedirection.down;
            // console.log("down")
        };
        if(keycode == 37 && snake.direction !=snake.movedirection.right){
            snake.direction = snake.movedirection.left;
            // console.log('left')
        };
        if(keycode == 39 && snake.direction !=snake.movedirection.left){
            snake.direction = snake.movedirection.right;
            // console.log("right")
        };

      });
};

Snake.prototype.start = function(){
    this.keydown.call(this);
    this.food();
    this.timer = setInterval(function(){
        snake.move(snake.head.x/20+snake.direction.x,snake.head.y/20+snake.direction.y);
    },100);
};

Snake.prototype.over = function(){
    alert('得分：'+this.count)
    rethink.style.display = "block";
    clearInterval(snake.timer);
    this.timer = null;
    
}

var snake = new Snake();
var start = function(){   
    snake.start();
};

var begin = function(){
    rethink_btn.onclick = function(){//重新开始按钮
        rethink.style.display = "none";
        snake_box.innerHTML = "";//清除之前的蛇
        snake = new Snake();//创建新的蛇
        start();
    event.stopPropagation();//取消事件冒泡
    
    };
    
    start_btn.onclick = function(){//开始游戏按钮
        start_game.style.display = "none";
        start();
        event.stopPropagation();
    
    };
    
    pause_btn.onclick = function(){//暂停后的开始按钮。
        pause.style.display = 'none';
        snake.timer = setInterval(function(){
            snake.move(snake.head.x/20+snake.direction.x,snake.head.y/20+snake.direction.y);
        },100);
        event.stopPropagation();
    };
    
    view.onclick = function(){//游戏时点击游戏屏幕，游戏暂停；
        pause.style.display = "block";
        clearInterval(snake.timer)
        snake.timer = null;
    }

}
return begin();
}());



