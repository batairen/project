if(sessionStorage['loginUname']){
    $('#header').load('header.html',function(){
        $('#welcome').html('user: '+sessionStorage['loginUname']);
    });
}else{
    $("#header").load("header.html");
}
$("#footer").load("footer.html");
$(document.body).on('click','#login',function(){
    location.href='login.html';
});
$(document.body).on('click','#register',function(){
    location.href='register.html';
});
$(function(){
	//product list
	loadPage(1);
	function loadPage(page){		
	$.ajax({
		type:'GET',
		url:'/index',
		data:{pageNo:page},
		success:function(data){
			var html="";
			for(var i=0;i<data.length;i++){
				var obj = data[i];
				var price=Math.ceil(obj.price/5);
				html +=`<li><a href="${obj.pid}" id="a-click"><img src='${obj.pic}' alt''></a>
				<p>$${price}</p>
				<h1><a href=''>${obj.pname}</a></h1>
					<div>
                               <a href="" class='p-operate'><i></i>save</a>
                               <a href="${obj.pid}" class='addcart'><i></i>add to cart</a>
                           </div>
                        </li>`;
			}
			$("#plist ul").html(html);
		},
			error:function(){
				alert ("error");
		}
	});
	}
    $(document.body).on('click','#a-click',function(e){
    	e.preventDefault();
        var PID=$(this).attr("href");
        console.log(PID);
        location.href="detail.html?pid="+PID;
    });
    //add cart
	$("#plist").on('click','a.addcart',function(e){
		e.preventDefault();
		var pid= $(this).attr("href");
		$.ajax({
			'type':'POST',
			'url':'/addCart',
			data:{uid:sessionStorage['loginUid'],pid:pid},
			success:function(data){
					alert(data.msg);
			},
			error:function(){
				alert("you have to login first");
			},
		});
	});
	$("ol.pager a").click(function(e){
		e.preventDefault();
		var page = $(this).html();
		loadPage(page);
		$("ol.pager li.active").removeClass("active");
		$(this).parent().addClass("active");
	});

});

$(document.body).on('click','#settle_up',function(){
	location.href='usercenter.html';
});

	