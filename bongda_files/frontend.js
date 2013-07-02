if(typeof(Frontend)=='undefined'){	
	Frontend={		
		run:function(){			
			this.hoverMemberInfo();
			this.configMouseOverTopMenu();
			this.mouseOverMainMenu();
			this.makeShowMenuLevel2();
			this.makeShowMenuLevel3();
			this.configFormAjaxContact();
			this.configChooseBetTypeForOneMatch();
			this.configShowHideListMatchBySeason();
			this.configClickCollapseExpandAll();
			this.configPreviousNextDateCalendar();
			this.configShowHideMatchLinks();
			this.configLiveScore();
			this.configPopUp();
			this.configFormAjaxPostComment();
			this.configFilterSeasonByCountry();
		},
		configFilterSeasonByCountry:function(){
			if($('#filter-season-by-continent-country').length){
				$('#filter-season-by-continent-country').change(function(){
					var activeCountry = $(this).val();
					if(activeCountry){
						$('.one-country-season-flag').hide();
						$('.'+activeCountry).show();
					}else {
						$('.one-country-season-flag').show();
					}
				});
			}
		},
		configFormAjaxPostComment:function(){
			var  that = this;
			if($('#frm_ykbd_new').length){
				$('#frm_ykbd_new').validate({
					rules:{
						full_name:{
							required:true
						},
						email:{
							required:true,
							email:true
						},
						content:{
							required:true
						}
					},
					messages:{
						full_name:{
							required:'<br>Bạn phải nhập họ tên'
						},
						email:{
							required:'<br>Bạn phải nhập email',
							email:'<br>Email không đúng định dạng'
						},
						content:{
							required:'<br>Bạn phải nhập nội dung'
						}
					},
					submitHandler:function(form){
						jQuery(form).ajaxSubmit({
							clearForm:true,
							success:function(responseText){
								if(responseText == 'FAIL'){
									alert("Mã bảo mật không đúng !");
								}else {
									$(form).resetForm();
									alert('Cảm ơn bạn đã bình luận !');
								}
							}
						});
					}
				});
			}
		},
		configPopUp:function(){
			if($('#zone-home-pop-up').length){
				var popupID = $('#zone-home-pop-up').attr('title');
				var cookie = $.cookie('popup' + popupID);
				if(cookie != 'opened'){
					var expireTime = new Date();
					var destination = $('#inline_content').find('a').attr('href');
					expireTime.setTime(expireTime.getTime() + (720 * 60 * 1000));
					$(".inline").colorbox({inline:true, width:"50%",onClosed:function(){ $.cookie("popup" + popupID, "opened", {expires: expireTime, path:'/'}); }});
					$(".inline").click();
				}
			}
		},
		configLiveScore:function(){
			$('a.link-show-match-events').click(function(){
				$('tr.match-live-events-row').hide();
				var matchID =  $(this).attr('hreflang');
				$( '#row-events-for-match-' + matchID).find('.zone-content-match-events').load(baseURL+'index.php?c=livescore&m=load_match_events&id='+matchID,function(){
					$( '#row-events-for-match-' + matchID).fadeIn();
				});
			});
			$('a.link-show-match-stats').click(function(){
				$('tr.match-live-events-row').hide();
				var matchID =  $(this).attr('hreflang');
				$( '#row-events-for-match-' + matchID).find('.zone-content-match-events').load(baseURL+'index.php?c=livescore&m=load_match_stats&id='+matchID,function(){
					$( '#row-events-for-match-' + matchID).fadeIn();
				});
			});
			$('a.link-show-match-formation').click(function(){
				$('tr.match-live-events-row').hide();
				var matchID =  $(this).attr('hreflang');
				$( '#row-events-for-match-' + matchID).find('.zone-content-match-events').load(baseURL+'index.php?c=livescore&m=load_match_formation&id='+matchID,function(){
					$( '#row-events-for-match-' + matchID).fadeIn();
				});
			});
		},
		hoverMemberInfo:function(){
			var that=this;
			$('.member-name').mouseover(function(){
				$('.info-login').slideToggle('fast');
			});
			$('.info-login').mouseleave(function(){
				$(this).slideToggle('fast');
			});
		},
		getEval:function(response){
			if(response){
				eval('var response = ' + response + ';');
				return response;
			}
		},
		configFormAjaxContact:function(){		
			var  that = this;
			if($('#form_contact').length){
				that.messages = {
					name: {
						required: $('#input-contact-full-name').attr('title')
					},
					email: {
						required: $('#input-contact-email').attr('title'),
						email: $('#input-contact-email').attr('align')
					},
					phone: {
						required: $('#input-contact-phone').attr('title')
					},
					content: {
						required: $('#input-contact-content').attr('title')
					}
				};
				that.rules = {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					phone: {
						required: true
					},
					content: {
						required: true
					}
				};
				$('#form_contact').validate({
					rules:that.rules,
					messages:that.messages,
					clearForm:true,
					submitHandler:function(form){
						jQuery(form).ajaxSubmit({
							success : function(response){
								$(form).resetForm();
								that.changeCaptcha();
								alert('Gửi thành công!');
							} 
						});
					}
				});
			}
		},
		appendOption:function(options,selector){
			var html_options = '';
			for(var i in options){
				html_options += '<option value="'+options[i].id+'">'+options[i].name+'</option>';
			}
			$(selector).html(html_options);
			if($('#saved-province-id').length){
				$(selector).val($('#saved-province-id').val());
			}
		},
		
		changeCaptcha:function(hashType){
			var date = new Date();
			var captcha_time = date.getTime();
			$("#captcha-comment-image").attr({src:baseURL+'/extsource/captcha/simple/create_image.php?'+captcha_time + '&hash=' + hashType});
		},
		
	 	configMouseOverTopMenu:function(){
			$('.globalMenu-normal').bind('mouseover',function(){
				$('.globalMenu-selected').attr('class','globalMenu-normal');
				$(this).attr('class','globalMenu-selected');
			});
			$('.globalMenu-normal').mouseleave(function(){
				$('.globalMenu-selected').attr('class','globalMenu-normal');
			});
		},
		
		mouseOverMainMenu:function(){
			var that = this;
			$('.menu-top').bind('mouseover',function(){
				var menuID = $(this).attr('id');
				$('.menu-top-active').attr('class','menu-top');
				$(this).attr('class','menu-top-active');
				$('.child-of-menu-level-1').hide();
				$('#child-'+menuID).show();
			});
			$('#soocceer-main-menu-header').mouseleave(function(){
				that.makeDefaultActiveMenu();
			});
		},
		
		makeDefaultActiveMenu:function(){
			if(activeRootCategory){
				if(activeRootCategory != "live-tv"){
					var idActive = $('.menu-top-active').attr('id');
					var menuActive = 'menu-' + activeRootCategory;
					if(idActive != menuActive){
						$('#' + menuActive).mouseover();
					}
				}else{
					var idActive = $('.menu-top-active').attr('id');
					var menuActive = 'menu-' + activeRootCategory;
					if(idActive != menuActive){
						$('#'+idActive).removeClass('menu-top-active').addClass('menu-top');
						$('#child-' + idActive).hide();
						$('#child-menu-' + activeRootCategory).show();
					}
				}
			}else {
				var idActive = $('.menu-top-active').attr('id');
				$('.menu-top-active').attr('class','menu-top');
				$('#child-'+idActive).hide();
			}
		},
		
		makeShowMenuLevel2:function(){
			if(activeChildSitemap){
				var zoneParent = $('#main-menu-level2-' + activeChildSitemap).parent();
				$(zoneParent).show();
				activeRootCategory = $(zoneParent).attr('title');
			}
			if(activeRootCategory){
				if(activeRootCategory != "live-tv"){
					$('#menu-' +activeRootCategory).attr('class','menu-top-active');
					$('#child-menu-' + activeRootCategory).show();
				}else{
					$('#child-menu-' + activeRootCategory).show();
				}
			}
		},
		makeShowMenuLevel3:function(){
			$('.show-menu-level-3-link').toggle(function(){
				$(this).parent('li.main-menu-level2:first').find('ul.level-3-menu-parent:first').slideDown();															
			},
			function(){
				$(this).parent('li.main-menu-level2:first').find('ul.level-3-menu-parent:first').slideUp();															
			}
			);
		},
		configChooseBetTypeForOneMatch:function(){
			if($('.choose-bet-type-4-one-match').length){
				if($('#frm-member-bet-football-match-box').length){
					this.configChooseBetMatch();
				}	
				if($('#frm-member-sell-tip-football-match-box').length){
					this.configLinkChooseBetMatch();
				}			
			}
		},
		
		configChooseBetMatch:function(){
			var that = this;
			$('.choose-bet-type-4-one-match').click(function(){
				var matchID = $(this).attr('rel');
				var betType = $(this).attr('rev');
				if(matchID && betType){
					$.get(baseURL + '?c=home&m=bet&match_id=' + matchID + '&bet_type=' + betType,function(response){
						response = that.getEval(response);
						switch(response['status']){
							case 'error': alert('Có lỗi xảy ra! Không thể thực hiện thao tác này !'); break;
							case 'success': $('#zone-bet-game-reload').html(response['zone_html']); break;
						}
					});
				}
			});
			$('#frm-member-bet-football-match-box').ajaxForm({
				success:function(response){
					var response = eval('(' + response + ')');
					switch(response['status']){
						case 'point_error':
							alert('Điểm đặt không hợp lệ hoặc điểm đặt vượt quá số điểm bạn đang có !');
							break;
						case 'required_login':
							alert('Bạn cần đăng nhập để thực hiện thao tác !');
							break;
						case 'error':
							alert('Không thể thực hiện thao tác !');
							break;
						case 'match_required':
							alert('Chưa chọn trận đấu và cửa để dự đoán !');
							break;
						case 'success':
							alert('Dự đoán thành công !');
							location.reload();
					}
				}
			});
		},
		
		configLinkChooseBetMatch:function(){
			var that = this;
			$('.choose-bet-type-4-one-match').click(function(){
				var matchID = $(this).attr('rel');
				var betType = $(this).attr('rev');
				if(matchID && betType){
					$.get(baseURL + '?c=market&m=match&match_id=' + matchID + '&bet_type=' + betType,function(response){
						response = that.getEval(response);
						switch(response['status']){
							case 'error': alert('Có lỗi xảy ra! Không thể thực hiện thao tác này !'); break;
							case 'success': $('#zone-bet-game-reload').html(response['zone_html']); break;
						}
					});
				}
			});
		},
		
		configShowHideListMatchBySeason:function(){
			if($('.click-show-hide-list-match-by-season').length){
				$('.click-show-hide-list-match-by-season').click(function(){
					var currentShape = $(this).attr('shape');
					var newShape = (currentShape=='show')?'hide':'show';
					var target = $(this).attr('title');
					$(this).attr('shape',newShape);
					if(currentShape == 'show'){
						$(this).find('img').attr('src',baseURL + 'images/season-expand.png');
						$('.' + target).hide();
					}else {
						$(this).find('img').attr('src',baseURL + 'images/season-collapse.png');
						$('.' + target).show();
					}
				});
			}
		},
		configClickCollapseExpandAll:function(){
			if($('#click-collapse-expand-all').length){
				$('#click-collapse-expand-all').click(function(){
					var currentShape = $(this).attr('shape');
					var newShape = (currentShape=='show')?'hide':'show';
					$(this).attr('shape',newShape);
					if(currentShape == 'hide'){
						$(this).attr('title','Mở tất cả giải đấu');
						$(this).find('img').attr('src',baseURL + 'images/expand.png');
						$('.click-show-hide-list-match-by-season').attr('shape','show');
						$('.click-show-hide-list-match-by-season').click();
					}else {
						$(this).attr('title','Đóng tất cả giải đấu');
						$(this).find('img').attr('src',baseURL + 'images/collapse.png');
						$('.click-show-hide-list-match-by-season').attr('shape','hide');
						$('.click-show-hide-list-match-by-season').click();
					}
				});
			}
		},
		configPreviousNextDateCalendar:function(){
			$('.livescore_day_picker_previous').click(function(){
				var currentDate = $('#for-loading-matches-by-date').val();
				var elem = currentDate.split('-');
				var varDate = new Date(elem[2],parseInt(elem[1])-1,parseFloat(elem[0])-1);
				var stringDate = varDate.getDate() + '-' + (varDate.getMonth()+1) + '-' + varDate.getFullYear();
				$('#for-loading-matches-by-date').val(stringDate);
				$('#dv-span-date-text').html(stringDate);
				$('#for-loading-matches-by-date').change();
			});
			$('.livescore_day_picker_next').click(function(){
				var currentDate = $('#for-loading-matches-by-date').val();
				var elem = currentDate.split('-');
				var varDate = new Date(elem[2],parseInt(elem[1])-1,parseFloat(elem[0])+1);
				var stringDate = varDate.getDate() + '-' + (varDate.getMonth()+1) + '-' + varDate.getFullYear();
				$('#for-loading-matches-by-date').val(stringDate);
				$('#dv-span-date-text').html(stringDate);
				$('#for-loading-matches-by-date').change();
			});
		},
		
		configShowHideMatchLinks:function(){
			$('.match-links-collapse-expand').click(function(){
				var matchID = $(this).attr('name');
				var showOrHide = $(this).attr('rev');
				if(showOrHide == 'show'){
					$('#bound-links-' + matchID).find('.link-match-item-more').slideDown();
					$(this).attr('rev','hide');
					$(this).find('img').attr('src',baseURL + 'images/up.png');
				}else {
					$('#bound-links-' + matchID).find('.link-match-item-more').slideUp();
					$(this).attr('rev','show');
					$(this).find('img').attr('src',baseURL + 'images/down.png');
				}
			});
		}
	}
	
	Frontend.run();
}