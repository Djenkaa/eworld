
// POST MESSAGE 
$('#sendMessage').on('click',function(){
    var btn = $(this);
    btn.text('Sending ...');
    var token = btn.parents(0).children(0).val();
    var id = btn.parent().children().eq(1).val();
    var message = btn.parents().eq(1).children().eq(0).children().eq(0).children().eq(0).val();
    console.log(id);
    console.log(token);
    console.log(message);
   $.ajax({
    url:'/message',
    method:"POST",
    data:{
        id:id,
        message:message
    },
    dataType:'json',
    beforeSend: function(request) {
        return request.setRequestHeader('X-CSRF-Token', token);
    },
    success:function(doc){
        console.log(doc);
        btn.text('Send');
        $('#exampleFormControlTextarea1').val('');
        $('#messageAlert').css('display','block');
    },
    error:function(){
        console.log('nece da se poveze sa serverom !');
    }
   });
 
});
