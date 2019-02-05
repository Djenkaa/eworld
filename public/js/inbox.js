$(document).ready(function(){
    console.log('hello from inbox');
});

// SHOW REPLAY BOX
$('.sendReplayMessage').on('click',function(){
   
    $('.replay').css('display','block');
});

// POST REPLAY MESSAGE
$('.sendReplay').on('click',function(){
    var btn = $(this);
    btn.text('Sending ...');
    var token = btn.parents().eq(0).children().eq(2).val();
    var messageID = btn.parents().eq(0).children().eq(3).val();
    var userEmail = btn.parents().eq(0).children().eq(4).val();
    var mentionedTtext = btn.parents().eq(0).children().eq(5).val();
    var replayMess = btn.parents().eq(0).children().eq(1).val();
   
    
   $.ajax({
    url:'/replay',
    method:"POST",
    data:{
        messageID,
        userEmail,
        mentionedTtext,
        replayMess
        
    },
    dataType:'json',
    beforeSend: function(request) {
        return request.setRequestHeader('X-CSRF-Token', token);
    },
    success:function(doc){
        btn.text('Send');
        $('.replayMessage').css('display','block');
    },
    error:function(){
        console.log('nece da se poveze sa serverom !');
    }
   });
 
});