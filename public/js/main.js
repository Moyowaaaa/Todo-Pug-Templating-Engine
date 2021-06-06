$(document).ready(function(){
    $('.delete-todo').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax ({
            type:'DELETE',
            url: '/'+id,
            success: function(response){
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        }) 
    })  
});