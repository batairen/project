$('#bt-register').click(function(){
    var n = $('#uname').val();
    var p = $('#upwd').val();
    $.ajax({
        type:'POST',
        url:'/user/register',
        data:{uname:n,upwd:p},
        success:function(result){
            console.log('ajax success'+result);
            if(result.code===1){
                alert('register success');
                setTimeout(function(){
                    location.href='login.html';
                },2000);
            }else{
                alert('fail to register');
            }
        },
    });
})