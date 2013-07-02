//Alert MsgAd
clicksor_enable_MsgAlert = true;
//default pop-under house ad url
clicksor_enable_pop = true; clicksor_frequencyCap = 0.1;
durl = '';
//default banner house ad url
clicksor_default_url = '';
clicksor_banner_border = '#000f30'; clicksor_banner_ad_bg = '#FFFFFF';
clicksor_banner_link_color = '#0c15ff'; clicksor_banner_text_color = '#da0041';
clicksor_banner_image_banner = true; clicksor_banner_text_banner = true;
clicksor_layer_border_color = '';
clicksor_layer_ad_bg = ''; clicksor_layer_ad_link_color = '';
clicksor_layer_ad_text_color = ''; clicksor_text_link_bg = '';
clicksor_text_link_color = '#0c59ff'; clicksor_enable_text_link = true;
clicksor_enable_VideoAd = true;



pf204652bottomLayer = document.getElementById('fl813691');
if(pf204652bottomLayer){
	var pf204652IntervalId = 0;
	var pf204652maxHeight = $('#co453569').css('height');
	pf204652maxHeight= pf204652maxHeight.replace("px","");
	pf204652maxHeight=parseInt(pf204652maxHeight)+20;
	var pf204652minHeight = 20;
	var pf204652curHeight = 0;
	function pf204652show( ){
	  pf204652curHeight += 2;
	  if (pf204652curHeight > pf204652maxHeight){
		clearInterval ( pf204652IntervalId );
	  }
	  pf204652bottomLayer.style.height = pf204652curHeight+'px';
	}
	function pf204652hide( ){
	  pf204652curHeight -= 3;
	  if (pf204652curHeight < pf204652minHeight){
		clearInterval ( pf204652IntervalId );
	  }
	  pf204652bottomLayer.style.height = pf204652curHeight+'px';
	}
	pf204652IntervalId = setInterval ( 'pf204652show()', 5 );
	function pf204652clickhide(){
		document.getElementById('pf204652hide').style.display='none';
		document.getElementById('pf204652show').style.display='inline';
		pf204652IntervalId = setInterval ( 'pf204652hide()', 5 );
	}
	function pf204652clickshow(){
		document.getElementById('pf204652hide').style.display='inline';
		document.getElementById('pf204652show').style.display='none';
		pf204652IntervalId = setInterval ( 'pf204652show()', 5 );
	}
	function pf204652clickclose(){
		document.body.style.marginBottom = '0px';
		pf204652bottomLayer.style.display = 'none';
	}
}

pf204653bottomLayer = document.getElementById('fl813692');
if(pf204653bottomLayer){
	var pf204653IntervalId = 0;
	var pf204653maxHeight = $('#co453570').css('height');
	pf204653maxHeight= pf204653maxHeight.replace("px","");
	pf204653maxHeight=parseInt(pf204653maxHeight)+20;
	var pf204653minHeight = 20;
	var pf204653curHeight = 0;
	function pf204653show( ){
	  pf204653curHeight += 2;
	  if (pf204653curHeight > pf204653maxHeight){
		clearInterval ( pf204653IntervalId );
	  }
	  pf204653bottomLayer.style.height = pf204653curHeight+'px';
	}
	function pf204653hide( ){
		pf204653curHeight -= 3;
	  if (pf204653curHeight < pf204653minHeight){
		clearInterval ( pf204653IntervalId );
	  }
	  pf204653bottomLayer.style.height = pf204653curHeight+'px';
	}
	pf204653IntervalId = setInterval ( 'pf204653show()', 5 );
	function pf204653clickhide(){
		document.getElementById('pf204653hide').style.display='none';
		document.getElementById('pf204653show').style.display='inline';
		pf204653IntervalId = setInterval ( 'pf204653hide()', 5 );
	}
	function pf204653clickshow(){
		document.getElementById('pf204653hide').style.display='inline';
		document.getElementById('pf204653show').style.display='none';
		pf204653IntervalId = setInterval ( 'pf204653show()', 5 );
	}
	function pf204653clickclose(){
		document.body.style.marginBottom = '0px';
		pf204653bottomLayer.style.display = 'none';
	}
}
