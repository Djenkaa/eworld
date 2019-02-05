$(document).ready(function(){
    console.log('document je spreman broj 2 :) !');
    fight();
});

// fight dugme radi kako treba
function fight(){
    $('#fight').on('click',function(){
        var btn = $(this);
        var token = btn.parent().children().eq(1).val();
        console.log(token);
        $.ajax({
            url:'/fight',
            method:"POST",
            // data:{
               
            // },
            dataType:'json',
            beforeSend: function(request) {
                return request.setRequestHeader('X-CSRF-Token', token);
            },
            success:function(doc){
                console.log(doc);
                console.log(doc.battle.battle.score);
                $('#displayDmg').text(doc.battle.battle.score);
               
            },
            error:function(){
                console.log('nece da se poveze sa serverom !');
            }
           });

    });
}