$('#header').load('header.html',function(){
    $('#welcome').html('user: '+sessionStorage['loginUname']);
});
$('#footer').load('footer.html');
$('.affix').on('click','li a',function(e){
    e.preventDefault();
    $(this).parent().addClass('active').siblings('.active').removeClass('active');
    var id=$(this).attr('href');
    $(id).addClass('active').siblings('.active').removeClass('active');
});
$.ajax({
    type:'GET',
    url:'/uc/myorder',
    data:{uid:sessionStorage['loginUid']},
    success:function(list){
        //console.log('ajax get myorder');
        //console.log(list);
        var html='';
        var rcvName=null;
        var price=null;
        var payment=null;
        var orderTime=null;
        var status=null;
        var products=null;

        for(var i=0;i<list.length;i++){
            rcvName=list[i].rcvName;
            price=list[i].price;
            //payment=list[i].payment;
            orderTime=list[i].orderTime;
            status=list[i].status;
            products=list[i].products;
            //console.log(products[0].pic);
            var d =new Date(orderTime);
            d.getTime();
            //console.log(d);
            html+=`
                <thead>
                    <th>orderId</th>
                    <th></th>
                    <th>name</th>
                    <th>price</th>
                    <th>orderTime</th>
                    <th>orderStatus</th>
                </thead>
                <tbody>
                <tr>
                    <td>${list[i].oid}</td>
                    <td>
                        <img src="${products[0].pic}">
                    </td>
                    <td>${rcvName}</td>
                    <td>${price}</td>
                    <td>${d}</td>
                    <td>${status}</td>
                    
                </tr>
                </tbody>
            `;
            $('#order-table').html(html);
        }
    }
});
console.log(sessionStorage['loginUid']);
$.ajax({
    type:'GET',
    url:"/uc/shoppingCart",
    data:{uid:sessionStorage['loginUid']},
    success:function(data){
        console.log(data);
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
                    <td><a href="${obj.id}">delete</a></td>
                </tr>`

        }
        $('#cart tbody').html(html);
    },
    error:function(){}
});
//delete cart

$("#cart tbody").on("click","a:contains('delete')",function(e){
    e.preventDefault();
    var did=$(this).attr("href");
    var that = this;//保留this <a>
    $.ajax({
        type:"POST",
        url:"/uc/cartDel",
        data:{id:did},
        success:function(data){
            console.log(data);
            if(data.code<0){
                alert("fail to delete");
            }else{
                alert("success to delete");
                $(that).parent().parent().remove();
            }
        },
        error:function(){
            alert('fail to delete check your network');
        }
    });
})