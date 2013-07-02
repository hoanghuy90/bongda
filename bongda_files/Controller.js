if(typeof(Controller)=='undefined'){	
	var Controller = Base.extend({
		baseURL:false,
		appURL:false,
		controller:false,
		action:false,
		loadControllerDone:false,
		
		constructor: function(baseInfo, options, success) {
			$.extend(this, baseInfo);
			if(options) {
				$.extend(this, options);
			}
			this.startController(success);
  		},
  		
  		startController:function(success){// Tự động khởi tạo 1 controller
			this.configAjaxStart();
			this.run(success);
		},
		
		run:function(success){
			if(success && typeof(success) == 'function'){
				success.call(this);
			}
			this.loadControllerDone = true;
		},
		
		getQueryStringURL:function(controller,action){
			return this.appURL + '?c=' + controller + '&m=' + action; 
		},
		
		configAjaxStart:function(){
			$('#show-ajax-start').ajaxStart(function(){
				var top = document.body.scrollTop|| window.pageYOffset || (document.body.parentElement? document.body.parentElement.scrollTop: 0);
				$(this).css('top',top + 'px').css('right',0);
				$(this).show();
				}).ajaxStop(function() {
					$(this).fadeOut(2500);
			});
		},
		
		getEval:function(response){
			if(response){
				eval('var response = ' + response + ';');
				return response;
			}
		}
		
	});
}