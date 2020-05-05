var Obj = {data : null}
console.log(233)
$(document).ready(function(){
	var value = document.getElementsByClassName("inp-text")[0];

$.ajax({
	type : "get",
	url : "https://movie.douban.com/j/subject_suggest?q=%E7%8E%84",
	dataType : "jsonp",
	// data : {
	// 	value : value.value,
	// },
	success : function(data){
     console.log(data)
     Obj.data = data;
     console.log(value.value.trim())
	},
});


})