var elapsedtime = 0;
var time;
$.fn.idle = function(){
    return this.each(function(){
        var interval  = 5 //set 2 seconds max timeout
        time = setInterval(function(){
                  elapsedtime++;
                  if(elapsedtime == interval)
                    $('#toolbar').animate({opacity:1},
                   {duration: 'slow', queue: false},'easeout');
        },3000);

    });

};

$.fn.toolbar = function(){
    return this.each(function(){
        $('#toolbar').mousemove(function(event){
            window.clearInterval(time);
            $('#toolbar').animate({opacity: 1},
               {duration: 'slow', queue: false});
        });
        $('#toolbar').mouseout(function(event){
            elapsedtime = 0;
            $(this).idle();
            $('#toolbar').animate({opacity:1},
                {duration: 'slow', queue: false});
        });
    });

};

$(window).scroll(function(){
     elapsedtime = 0;
     $('#toolbar').animate({opacity: 1},
           {duration: 'slow', queue: false});
});

$(function(){    
    $(this).idle();
    $('#toolbar').animate({opacity:1},
           {duration: 'slow', queue: false});
    $(this).mousemove(function(event){
            elapsedtime = 0;
            $('#toolbar').animate({opacity: 1},
               {duration: 'slow', queue: false});
    });
    $('#toolbar').toolbar();
});