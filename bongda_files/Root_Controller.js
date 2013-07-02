if(typeof(Controller) != 'undefined'){
	var Root_Controller =  Controller.extend({
		currentSlideNews:1,
		run:function(success){// Khởi động
			this.configSlideShow();
			this.configLoadNewsByDate();
			this.configDateTime();
			this.configSlideshowNews();
			this.configClickCatNews();
			this.configAutoPlayNews();
			this.ClickTabHotNews();
//			this.ClickTabNews();
//			this.ClickTabImage();
//			this.ClickTabVideo();
			this.configHoverSlider();
			this.configActiveMenu();
			this.configMenuTop();
			this.configReloadSchedule();
			this.configReloadResult();
			this.configLoadAllSeasonRanking();
			this.configLoadTodayResult();
			this.configHoverRow();
			Controller.prototype.run.call(success);
		},
		configSlideShow:function(){
			var count_page=$('#hidden-count-page').val();
			var width_dot=count_page*40;
			$('.wapper-page-dot').css({'width':width_dot});
			$(document).ready(function(){
				$("#slider_main").easySlider();
				var width=$('#slider_main li').width();
				var height=$('#slider_main li').height();
				var text=$('#slider_main').attr('id');
				$('#slider_main').css({'margin':'0px auto'});
			});	
			
		},
		configLoadNewsByDate:function(){
			if($('#for-loading-matches-by-date').length){
				$('#for-loading-matches-by-date').change(function(){
					var selectedDate = $('#for-loading-matches-by-date').val();
					$.get(baseURL + '?c=root&m=reload_news_on_date&date=' +selectedDate,function(response){
						if(response == 'FAIL'){
							alert('Bạn hãy lựa chọn ngày hợp lệ !');
						}else {
							$('#news-on-date').html(response);
						}
					});
				});
			}
		},
		configDateTime:function(){
			if($('.input-datetime').length){
				$('.input-datetime').dynDateTime({
					ifFormat: "%d-%m-%Y",
					button: ".next()",
					debug:  false,
					step:1
				});
			}
		},
		configSlideshowNews:function(){
			$('.tab-container .tab').mouseover(function(){
				$(this).addClass('hover');
				var tab_num=$(this).html();
				$('.hover-tab-'+tab_num).css({'display':'block'})
			});
			$('.tab-container .tab').mouseout(function(){
				$(this).removeClass('hover');
				var tab_num=$(this).html();
				$('.hover-tab-'+tab_num).css({'display':'none'})
			});
			$('.tab-container .tab').click(function(){
				$('.tab-container').find('.selected').removeClass('selected');
				$(this).addClass('selected');
				var num=$(this).html();
				num=parseInt(num);
				$('#num-slider').val(num);
				$('.wapper-big-news').find('.news-actived ').removeClass('news-actived');
				$('#news-slider-'+num).addClass('news-actived');
			});
			
		},
		configClickCatNews:function(){
			var that=this;
			$('.cat-list ul li').click(function(){
				var directory=$(this).attr('id');
				$('.wapper-big-news').load('/?c=root&m=load_slide_js&d='+directory,function(){
					that.configSlideshowNews();
					that.clickNewsSlide();
				});
			});
		},
		clickNewsSlide:function(){
				var num=$('#num-slider').val();
				var total=$('#total-slider').val();
				if(total>1){
					num=parseInt(num)+1;
					if(num>total){
						num=1;
					}
					$('.tab-container').find('.selected').removeClass('selected');
					$('#tab-'+num).addClass('selected');
					$('#num-slider').val(num);
					$('.wapper-big-news').find('.news-actived ').removeClass('news-actived');
					$('#news-slider-'+num).addClass('news-actived');
				}
		},
		configAutoPlayNews:function(){
			var that = this;
			if($('.wapper-big-news').length){
				setTimeout(function(){
					that.clickNewsSlide();
					that.configAutoPlayNews();
				},5000);
			}
		},
		configHoverRow:function(){
			$('.column-data').hover(function () {
				$(this).css("background","#D2D2D2");
			  }, 
			  function () {
			  	$(this).css("background","");
			  });
			  $('.league-match').hover(function () {
				$(this).find('div').css("background","#D2D2D2");
			  }, 
			  function () {
			  	$(this).find('div').css("background","");
			  });
		},
		ClickTabHotNews:function(){
			$('.hot-text').click(function(){
				$('#hot-click').find('.hot-text-active').removeClass('hot-text-active');
				$(this).addClass('hot-text-active');
				var id=$(this).attr('id');
				$('#hot-list').find('.list-active').removeClass('list-active');
				$('#'+id+'-list').addClass('list-active');
			});
		},
		ClickTabNews:function(){
			$('#zone-news-category .cat-name ul li').click(function(){
				var id=$(this).attr('id');
				var zone=$(this).attr('lang');
				$('#zone-'+zone+' .cat-name').find('.cat-active').removeClass('cat-active');
				$(this).addClass('cat-active');
				$('#zone-'+zone+' .cat-content').load('/index.php?c=root&m=load_home_news&d='+id);
//				$('#vertical-'+cat+' .category-content').load(BaseUrl+'index.php?c=home&m=load_home_news&d='+id);
			});
		},
		ClickTabImage:function(){
			$('#zone-html-image .cat-name li').click(function(){
				var id=$(this).attr('id');
				$('#zone-html-image .cat-name').find('.cat-active').removeClass('cat-active');
				$(this).addClass('cat-active');
				$('#zone-html-image .cat-content').load('/index.php?c=root&m=load_home_image&d='+id);
//				$('#vertical-'+cat+' .category-content').load(BaseUrl+'index.php?c=home&m=load_home_news&d='+id);
			});
		},
		ClickTabVideo:function(){
			$('#zone-html-video .cat-name li').click(function(){
				var id=$(this).attr('id');
				$('#zone-html-video .cat-name').find('.cat-active').removeClass('cat-active');
				$(this).addClass('cat-active');
				$('#zone-html-video .cat-content').load('/index.php?c=root&m=load_home_video&d='+id);
//				$('#vertical-'+cat+' .category-content').load(BaseUrl+'index.php?c=home&m=load_home_news&d='+id);
			});
		},
		configHoverSlider:function(){
			$('.hover-news .news-item').hover(function(){
				var num=$(this).attr('lang');
				$('.wapper-big-news').find('.news-actived').removeClass('news-actived');
				$('#news-slider-'+num).addClass('news-actived');
				$('.hover-news').find('.actived').removeClass('actived');
				$(this).addClass('actived');
			});
		},
		configActiveMenu:function(){
			var width_top=0;
			$(".globalMenu-normal").each(function(){
				width_top=width_top + $(this).width()+30;
			});
			$('.menu-global .center').css({'width':width_top+'px'});
			var wd_width=$(window).width();
			var doc_width=$('#main-menu-site').width();
			$('.center-main-menu').find('.active-menu').removeClass('active-menu').addClass('normal-menu');
			if(activeRootCategory){
				$('#'+activeRootCategory).removeClass('normal-menu').addClass('active-menu');
			}
			if(activeChildSitemap.length){
				$('#'+activeChildSitemap).css({'color':'#BE1F19','font-weight':'bold'});
			}
			if(activeRootCategory=='home'){
				$('#trang-chu').removeClass('normal-menu').addClass('active-menu');
			}
			if(!$('.active-menu').length)
				{
					if(activeRootCategory!="live-tv"){
					activeRootCategory='home';
					if(activeRootCategory=='home'){
					$('#trang-chu').removeClass('normal-menu').addClass('active-menu');
					}
				}
			}else{
				var pos=$('.active-menu').position().left;
				var active_width=$('.active-menu').width();
				first_pos=(wd_width-doc_width)/2;
				menu_pos=pos-first_pos;
				var dWidth=0;
				$('ul.'+activeRootCategory+"-child > li").each(function(){
					dWidth=dWidth + $(this).width()+46;
				});
				if(dWidth > doc_width){
					dWidth=doc_width;
				}
				if(dWidth){
					if((menu_pos + dWidth/2) < (doc_width)){
						if(menu_pos < (dWidth/2)){
						var left=-menu_pos;	
						var dWidth=dWidth;
						$('.'+activeRootCategory+'-child').css({'display':'block','width':dWidth,'left':left});
						$('#warrper-body').css('padding-top','25px');
						}
						if(menu_pos > (dWidth/2)){
						var left=-dWidth/2;	
						$('.'+activeRootCategory+'-child').css({'display':'block','width':dWidth,'left':left});
						$('#warrper-body').css('padding-top','25px');	
						}
					}else{
						var a= first_pos + doc_width - dWidth;
						var left = -(pos -a) ;
						$('.'+activeRootCategory+'-child').css({'display':'block','width':dWidth,'left':left});
						$('#warrper-body').css('padding-top','25px');	
					}
				}	
			}
		},
		configReloadResult:function(){
			var that = this;
			$('#table-result .league-name li').click(function(){
				var seasonID = $(this).attr('rev');
				$('#table-result .league-name').find('.actived').removeClass('actived');
				$(this).addClass('actived');
				var seasonResultLink = $(this).attr('lang');
				$('#link-to-result-season').attr('href',seasonResultLink);
				$('#zone-bound-listing-result-season').load(BaseUrl+'index.php?c=root&m=one_season_result&season_id='+seasonID,function(){
					that.configHoverRow();
				});
			});
		},
		configReloadSchedule:function(){
			var that = this;
			$('#zone-html-match-schedule .cat-title li').click(function(){
				var seasonID = $(this).attr('rev');
				$('#zone-html-match-schedule .cat-title').find('.active-cat').removeClass('active-cat');
				$(this).addClass('active-cat');
				$('#zone-content-html-schedule').load(BaseUrl+'index.php?c=root&m=load_schedule&season_id='+seasonID,function(){
					that.configHoverRow();
				});
			});
		},
		configLoadTodayResult:function(){
			var that = this;
			$('#reload-today-result').click(function(){
				$('#zone-content-html-all-season-ranking').load(BaseUrl+'index.php?c=root&m=today_result',function(){
					that.configReloadResult();
					that.configHoverRow();
				});
			});
		},
		configLoadAllSeasonRanking:function(){
			var that = this;
			$('#zone-html-table-result .cat-title li').click(function(){
				$('#zone-html-table-result .cat-title').find('.active-cat').removeClass('active-cat');
				$(this).addClass('active-cat');
			});
			$('#reload-season-ranking').click(function(){
				$('#zone-content-html-all-season-ranking').load(BaseUrl+'index.php?c=root&m=season_ranking',function(){
					that.configLoadOneSeasonRaking();
					that.configHoverRow();
				});
			});
		},
		configLoadOneSeasonRaking:function(){
			var that = this;
			$('.reload-one-season-ranking').click(function(){
				$('.name-rankings .actived').removeClass('actived');
				$(this).addClass('actived');
				var seasonID = $(this).attr('rev');
				$('#zone-content-ranking-one-season').load(BaseUrl+'index.php?c=root&m=one_season_ranking&season_id='+seasonID,function(){
					that.configHoverRow();
				});
			});
		},
		configLoadOneSeasonResult:function(){
			$('.reload-one-season-result').click(function(){
				var seasonID = $(this).attr('rev');
				$('#zone-content-html-one-season-result').load(BaseUrl+'index.php?c=root&m=one_season_result&season_id='+seasonID);
			});
		},
		configMenuTop:function(){
			$('.normal-menu').mouseover(function(){
				var wd_width=$(window).width();
				var doc_width=$('#main-menu-site').width();
				var active_id=$('.active-menu').attr('id');
				var id=$(this).attr('id');
				$('.'+active_id+'-child').css({'display':'none'});
				$('.center-main-menu').find('.active-menu').removeClass('active-menu').addClass('normal-menu');
				$(this).removeClass('normal-menu').addClass('active-menu');
				var pos=$(this).position().left;
				var active_width=$(this).width();
				var dWidth=0;
				$('ul.'+id+"-child > li").each(function(){
					dWidth= dWidth + $(this).width()+46;
				});
				first_pos=(wd_width-doc_width)/2;
				menu_pos=pos-first_pos;
				if(dWidth > doc_width){
					dWidth=doc_width;
				}
				if(dWidth){
				if((menu_pos + dWidth/2) < (doc_width)){
					if(menu_pos < (dWidth/2)){
						var left=-menu_pos;	
						var dWidth=dWidth;
						$('.'+id+'-child').css({'display':'block','width':dWidth,'left':left});
						$('#warrper-body').css('padding-top','25px');	
						}
						if(menu_pos > (dWidth/2)){
						var left=-dWidth/2;	
						$('.'+id+'-child').css({'display':'block','width':dWidth,'left':left});	
						$('#warrper-body').css('padding-top','25px');	
						}
					}else{
						var a= first_pos + doc_width - dWidth;
						var left = -(pos -a) ;
						$('.'+id+'-child').css({'display':'block','width':dWidth,'left':left});	
						$('#warrper-body').css('padding-top','25px');	
					}
				}	
				$('.'+id+'-child').css({'display':'block'});
				$('.child-menu-livetv').css({'display':'none'});
			});
			$('.normal-menu').mouseout(function(){
				var id=$(this).attr('id');
				$(this).removeClass('active-menu').addClass('normal-menu');
				if(activeRootCategory){
					$('#'+activeRootCategory).removeClass('normal-menu').addClass('active-menu');
				}
				if(activeRootCategory=='home'){
					$('#trang-chu').removeClass('normal-menu').addClass('active-menu');
					
				}
				$('.'+id+'-child').css({'display':'none'});
				$('.'+id+'-child').removeAttr("style");
				if(activeRootCategory=='home'){
				$('#warrper-body').removeAttr("style");
				}
				var active_id=$('.active-menu').attr('id');
				$('.'+active_id+'-child').css({'display':'block'});
				
				if(activeRootCategory=='live-tv'){
				$('.trang-chu-child').css({'display':'none'});
				}
				$('.child-menu-livetv').css({'display':'block'});
			});
		}
	});
}
