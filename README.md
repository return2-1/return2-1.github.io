# return2-1.github.os


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>mine</title>

</head>
<body>


<script>
function Map(wh,ht,mines){
this.wh = wh;
this.ht = ht;
this.mine = [];
this.square = [];
this.mines = mines;
this.map = document.createElement('div');
this.map.style.width=this.wh*20+"px";
this.map.style.height=this.ht*20+"px";
this.map.style.border="2px solid red";
this.map.style.position="absolute";
document.body.appendChild(this.map);
};

Map.prototype.rank=function(){
for(var i=0; i<this.ht; i++){
this.square.push([]);
this.row=document.createElement('div');
this.row.style.width=this.wh*20+"px";
this.row.style.height="20px";
this.map.appendChild(this.row);
for(var j = 0; j < this.wh; j++){
this.div = document.createElement('div');
this.div.style.width="20px";
this.div.style.height="20px";
this.div.style.float="left";
this.div.style.border="2px solid black";
this.div.style.boxSizing="border-box";
this.div.style.textAlign = "center";
this.div.style.lineHeight = "20px";
this.div.style.color = "#fff";
this.row.appendChild(this.div);
this.div.x=j;
this.div.y=i;
this.square[i].push(this.div);
};
};
};

Map.prototype.buryMine = function(){
      var x,y;
      for(var i=0; i < this.mines; i ++){       
          x=Math.floor(Math.random()*this.wh);
            y=Math.floor(Math.random()*map.ht);
           if(this.mine.length){
               for(var j=0; j<this.mine.length; j++){
                       if(x == this.mine[j][0] && y == this.mine[j][1]){
                                 i --;
                                break;
};
};
};
              this.square[y][x].mine=1;
               this.mine.push([x,y]);               
};

};

var scanner = function(target){
      var mine_count=0;
      var x = target.x,
          y = target.y,        
          mines = [];
       //    target.scanner = 1;
      if(target.mine){
           target.style.background="red";
          console.log("over");
          return;
};
     if(x>0 && map.square[y][x-1].style.background !== "green"){
          mines.push([x-1,y]);
         // map.square[y][x-1].scanner=1;
          if(map.square[y][x-1].mine){
           ++mine_count;
          
   };
};
    
     if(x > 0 && y < map.ht-1 && map.square[y+1][x-1].style.background !== "green"){ 
        mines.push([x-1,y+1]);
      //  map.square[y+1][x-1].scanner=1;
       if(map.square[y+1][x-1].mine){
           ++mine_count;
         
   };

};
     if(x > 0 && y > 0 && map.square[y-1][x-1].style.background !== "green"){
         mines.push([x-1,y-1]);
       //  map.square[y-1][x-1].scanner=1;
        if(map.square[y-1][x-1].mine){
           ++mine_count;
          
   };
};
     if(y < map.ht-1 && map.square[y+1][x].style.background !== "green"){
            mines.push([x,y+1]);
          //  map.square[y+1][x].scanner=1;
          if(map.square[y+1][x].mine){
           ++mine_count;
          
   };
};
     if(y > 0 && map.square[y-1][x].style.background !== "green"){
              mines.push([x,y-1]);
          //   map.square[y-1][x].scanner=1;
           if( map.square[y-1][x].mine){
           ++mine_count;
         
   };

};
     if(x<map.wh-1 && map.square[y][x+1].style.background !== "green"){
       mines.push([x+1,y]);
        //  map.square[y][x+1].scanner=1;
         if(map.square[y][x+1].mine){
          ++ mine_count;
         
   };
};
     if(x<map.wh-1 && y<map.ht-1 && map.square[y+1][x+1].style.background !== "green"){
            mines.push([x+1,y+1]);
           // map.square[y+1][x+1].scanner=1;
           if(map.square[y+1][x+1].mine){
           ++mine_count;
          
   };
};
     if(x<map.wh-1 && y>0 && map.square[y-1][x+1].style.background !== "green"){
          mines.push([x+1,y-1]);
         // map.square[y-1][x+1].scanner=1;
          if(map.square[y-1][x+1].mine){
           ++mine_count;
          
   };
};
   

   if(mine_count == 0){
       target.style.background = "green";
      for(var i=0; i<mines.length; i++){
           map.square[mines[i][1]][mines[i][0]].style.background = "green";
           
          
         };
     
     
     }else{
      target.innerHTML = mine_count;
      target.style.background = "blue";
     
     };

      
};

var map = new Map(10,10,50);
map.rank();
map.buryMine();
map.map.onclick=function(e){
      var target = e.target;
      console.log(target.mine);
      scanner(target);
      
};
</script>
</body>


</html>
