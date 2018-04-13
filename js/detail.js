if(sessionStorage['loginUname']){
    $('#header').load('header.html',function(){
        $('#welcome').html('user: '+sessionStorage['loginUname']);
    });
}else{
    $("#header").load("header.html");
}
$('#footer').load('footer.html');
$(document.body).on('click','#login',function(){
    location.href='login.html';
});
$(document.body).on('click','#register',function(){
    location.href='register.html';
});
$(function(){
    var url=location.search;
    if(url.indexOf("?")!=-1){
        var str = url.substr(1);
        var strs = str.split("=");
        var pid= strs[1];
    }
    //console.log(pid);
    $.ajax({
        type:'GET',
        url:'/detail',
        data:{pid:pid},
        success:function(data){
            //console.log(data[0]);
            var obj = data[0];
            var html='';
            var price=Math.ceil(obj.price/5);
            html+=`
               <div class="detail-pic">
                <p><img src="${obj.pic}"></p>
                    <div>
                        <a href="#" class="previous"><</a>
						<ul>
							<li>
								<img src="">
							</li>
							<li>
								<img src="">
							</li>
							<li>
								<img src="">
							</li>
							<li>
								<img src="">
							</li>
						</ul>
						<a href="#" class="next"> ></a>
                    </div>
               </div> 
               <div class="detail-order">
                    <h3>${obj.pname}</h3>
                    <ul id="summary">
                        <li>quantity:<input value="1" maxlength="8" id="count" style="width:20px;"></li>
                        <li>price:$${price}</li>
                        <li><button class="btn btn-danger" id="addCart">add to cart</button></li>
                    </ul>
                </div>
            `;
            $("#center").html(html);
        },
        error:function(){
            alert('ajax error');
        }

    })
    $("#detail-container").on('click','#addCart',function(){
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
});
$('.mt a').click(function(e){
    e.preventDefault();
    $(".mt>li.currentPage").removeClass("currentPage");
    $(this).parent().addClass("currentPage");
    var href=$(this).attr('href');
    document.getElementById(href).style.display="block";
    if(document.getElementById(href).nextElementSibling){
        document.getElementById(href).nextElementSibling.style.display="none";
    }else{
        document.getElementById(href).previousElementSibling.style.display="none";
    }
});
