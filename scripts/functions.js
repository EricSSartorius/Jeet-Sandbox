
/*$('.english').on('click',function(){
    if($('#en').css('display')!='none'){
    $('#2').html($('#jp').html()).show().siblings('div').hide();
    }else if($('#2').css('display')!='none'){
        $('#en').show().siblings('div').hide();
    }
});*/


$("div.action").click (function(){
    var $this = $(this);
    var target = $this.data('content');
    $('div.action').not($this).each(function(){
       var $other = $(this);
       var otherTarget = $other.data('content');
       $(otherTarget).hide();        
    });
    
    $(target).animate({width: "toggle"}, 200);
    
});
