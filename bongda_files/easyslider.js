/*
 * 	Easy Slider 1.5 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
/*
 *	markup example for $("#slider").easySlider();
 *	
 * 	<div id="slider">
 *		<ul>
 *			<li><img src="images/01.jpg" alt="" /></li>
 *			<li><img src="images/02.jpg" alt="" /></li>
 *			<li><img src="images/03.jpg" alt="" /></li>
 *			<li><img src="images/04.jpg" alt="" /></li>
 *			<li><img src="images/05.jpg" alt="" /></li>
 *		</ul>
 *	</div>
 *
 */

(function($) {

	$.fn.easySlider = function(options){
		
		
		
				
		this.each(function() {  
			var obj = $(this); 
			var text=$(this).attr('id');
			var width_div=$(this).attr('lang');
			var ts1=$(this).attr('ts');
			// default configuration properties
			var defaults = {			
				prevId: 		'prevBtn_'+text,
				prevText: 		'Previous',
				nextId: 		'nextBtn_'+text,	
				nextText: 		'Next',
				controlsShow:	true,
				controlsBefore:	'',
				controlsAfter:	'',	
				controlsFade:	true,
				firstId: 		'firstBtn',
				firstText: 		'First',
				firstShow:		false,
				lastId: 		'lastBtn',	
				lastText: 		'Last',
				lastShow:		false,				
				vertical:		false,
				speed: 			1000,
				auto:			true,
				pause:			5000,
				continuous:		true
			}; 
			var options = $.extend(defaults, options);
			var s = $("li", obj).length;
			var w = $("li", obj).width(); 
			var h = $("li", obj).height();
			if(w==0){
				w=186;
			}
			if(h==0){
				h=220;
			}
			if(width_div){
				obj.width(width_div); 
			}else{
				obj.width(w);
			}
			obj.height(h); 
			obj.css("overflow","hidden");
			if(ts1){
				var ts = s-ts1;
				var w=w+1;
			}else{
				var ts = s-1;
			}
			var t = 0;
			if(w == 169){
				w=190;
			}
			$("ul", obj).css('width',s*w);			
			if(!options.vertical) $("li", obj).css('float','left');
			$("li", obj).show();
//			if(options.controlsShow){
//				var html = options.controlsBefore;
//				if(options.firstShow) html += '<span id="'+ options.firstId +'"><a href=\"javascript:void(0);\">'+ options.firstText +'</a></span>';
//				html += ' <span id="'+ options.prevId +'"><a href=\"javascript:void(0);\">'+ options.prevText +'</a></span>';
//				html += ' <span id="'+ options.nextId +'"><a href=\"javascript:void(0);\">'+ options.nextText +'</a></span>';
//				if(options.lastShow) html += ' <span id="'+ options.lastId +'"><a href=\"javascript:void(0);\">'+ options.lastText +'</a></span>';
//				html += options.controlsAfter;						
//				$(obj).after(html);										
//			};
//	
			$("a","#"+options.nextId).click(function(){		
				animate("next",true,0);
			});
			$("a","#"+options.prevId).click(function(){		
				animate("prev",true,0);				
			});	
			$("a","#"+options.firstId).click(function(){		
				animate("first",true,0);
			});				
			$("a","#"+options.lastId).click(function(){		
				animate("last",true,0);				
			});		
			
			function animate(dir,clicked,page){
				var ot = t;	
				if(dir){
					switch(dir){
						case "next":
							t = (ot>=ts) ? (options.continuous ? 0 : ts) : parseInt(t)+1;						
							break; 
						case "prev":
							t = (t<=0) ? (options.continuous ? ts : 0) : parseInt(t)-1;
							break; 
						case "first":
							t = 0;
							break; 
						case "last":
							t = ts;
							break; 
						default:
							break; 
					};	
				}
				if(page){
					t=page;
				}
				$('.wapper-page-dot').find('.dot-active').removeClass('dot-active');
				$('#dot-page-'+t).addClass('dot-active');
				var diff = Math.abs(ot-t);
				var speed = diff*options.speed;						
				if(!options.vertical) {
					p = (t*w*-1);
					$("ul",obj).animate(
						{ marginLeft: p }, 
						speed
					);				
				} else {
					p = (t*h*-1);
					$("ul",obj).animate(
						{ marginTop: p }, 
						speed
					);					
				};
				
				if(!options.continuous && options.controlsFade){					
					if(t==ts){
						$("a","#"+options.nextId).hide();
						$("a","#"+options.lastId).hide();
					} else {
						$("a","#"+options.nextId).show();
						$("a","#"+options.lastId).show();					
					};
					if(t==0){
						$("a","#"+options.prevId).hide();
						$("a","#"+options.firstId).hide();
					} else {
						$("a","#"+options.prevId).show();
						$("a","#"+options.firstId).show();
					};					
				};				
				
//				if(clicked) clearTimeout(timeout);
				if(options.auto && dir=="next" && !clicked){;
					timeout = setTimeout(function(){
						animate("next",false,0);
					},
				diff*options.speed+options.pause);
				};
				
			};
			$(".dot-slide-page").click(function(){
				$('.wapper-page-dot').find('.dot-active').removeClass('dot-active');
				$(this).addClass('dot-active');
				var page=$(this).attr('lang');
				animate(0,true,page);
			});
			
			// init
			var timeout;
			if(options.auto){;
				timeout = setTimeout(function(){
					animate("next",false,0);
				},options.pause);
			};		
		
			if(!options.continuous && options.controlsFade){					
				$("a","#"+options.prevId).hide();
				$("a","#"+options.firstId).hide();				
			};				
			
		});
	  
	};

})(jQuery);



