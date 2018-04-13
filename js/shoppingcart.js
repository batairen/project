$(function(){
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	$.ajax({
		type:'GET',
		url:"cartlist.php",
		data:{uid:getCookieVal("uid")},
		success:function(data){
			var html="";
			for(var i=0;i<data.length;i++){
				var obj=data[i];
				html+=`<tr>
                    <td>
                        <input type="checkbox"/>
                        <input type="hidden" value="${obj.pid}" />
                        <div><img src="${obj.pic}" alt=""/></div>
                    </td>
                    <td><a href="">${obj.pname}</a></td>
                    <td>${obj.price}</td>
                    <td>
                        <button>-</button><input type="text" value="${obj.count}"/><button>+</button>
                    </td>
                    <td><span>${obj.price*obj.count}</span></td>
                    <td><a href="${obj.id}">删除</a></td>
                </tr>`
			
			}
			$('#cart tbody').html(html);
		},
		error:function(){}
	});
	//删除购物车
	$("#cart tbody").on("click","a:contains('删除')",function(e){
		e.preventDefault();
		var did=$(this).attr("href");
		var that = this;//保留this <a>
		$.ajax({
			type:"POST",
			url:"cart_del.php",
			data:{id:did},
			success:function(data){
				if(data.code<0){
					alert("fail to delete"+data.msg);
				}else{
					alert("success to delete"+data.msg);
					$(that).parent().parent().remove();
				}
			},
			error:function(){
				alert('fail to delete check your network');
			}
		});
	})
});
	function getCookieVal(key){
		var rs=null;
		var line = document.cookie;
		//'uname=xx; uid=xx';
		var arr= line.split(";");
		for(var i=0;i<arr.length;i++){
			var kv=arr[i];
			var option= kv.split("=");
			//uname=xx 去除前后空格
			var k=option[0].trim();
			//uname
			var v=option[1];
			//xx
			if(key===k){
				return v;
			}
		} 
		return rs;
	}