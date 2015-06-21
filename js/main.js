// Toggle EN/JP/KR for about section
$("div.action").click (function(){
    var $this = $(this);
    var target = $this.data('language');
    $('div.action').not($this).each(function(){
       var $other = $(this);
       var otherTarget = $other.data('language');
       $(otherTarget).hide();        
    });
    
    $(target).show();
});
