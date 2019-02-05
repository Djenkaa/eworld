// POST LOGOUT
// $('#logout').on('click',function(){
//     var btn = $(this);
//     var token = btn.parents().eq(0).children().eq(0).val();
//     console.log(token);
//     $.ajax({
//         url:'/logout',
//         method:"POST",
//         // data:{
           
//         // },
//         dataType:'json',
//         beforeSend: function(request) {
//             return request.setRequestHeader('X-CSRF-Token', token);
//         },
//         success:function(doc){
//             console.log(doc);
//             location.href = '/login';
           
//         },
//         error:function(){
//             console.log('nece da se poveze sa serverom !');
//         }
//        });
// });     
