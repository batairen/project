$('#bt-login').click(function(){
    var n =$('#uname').val();
    var p =$('#upwd').val();
    $.ajax({
        type:'POST',
        url:'/user/login',
        data:{uname:n, upwd:p},
        success:function(result){
            console.log('ajax success'+result);
            if(result.code===0){
                alert(result.message);
            }else if(result.code===1){
                alert(result.message);
                sessionStorage['loginUname']=n;
                sessionStorage['loginUid']=result.uid;
                setTimeout(function(){
                    location.href='productlist.html';
                },2000);
            }
        }
    });
});