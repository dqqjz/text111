var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

var search = document.getElementById("search_input");
search.addEventListener("keyup",function(event) {
    if(event.keyCode == "13") {
    	
    		
        document.activeElement.blur();//收起虚拟键盘
        searchKeywordAll();
        	event.preventDefault(); // 阻止默认事件---阻止页面刷新
//      	if (search !='') {
//      		alert(1);
//
//      	} else{
//      		alert(2);
//      	}
    }
});

//var jq=$.noConflict();

mui(document).on("change", "#search_ready", function(e) {

alert("Strange");
});

//mui(document).ajaxComplete(function( event, xhr, settings ) {
//  var cwRes = 	document.getElementById("cw_result").val();
//  var mcRes = document.getElementById("mc_result").val();
//  var twRes = document.getElementById("tw_result").val();
//  
//  if(cwRes.length > 0 && mcRes.length >0 && twRes.length >0 ) {
//      
//      showResult();
//  }
//  
// 
//
//});
function resetSearchResultHolder(){
    	document.getElementById("cw_result").value='';
    document.getElementById("mc_result").value='';
    document.getElementById("tw_result").value='';
    
}

function searchKeywordAll(keyword,searchList){
    resetSearchResultHolder();
    searchCW(keyword,"","");
   	searchMC(keyword,"","");
    searchTW(keyword,"","");
}

//function searchColes(){
//  var url = 'https://shop.coles.com.au/online/SearchDisplay?storeId=10601&catalogId=10576&langId=-1&beginIndex=0&browseView=false&searchSource=Q&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&pageView=image&supermarketRefer=yes&searchTerm=swiss+zinc';
// //
// var url = 'https://www.woolworths.com.au/apis/ui/Search/products?IsSpecial=false&PageNumber=1&PageSize=24&SearchTerm=swiss+zinc&SortType=Personalised';
// $.ajax({
//      'url':url,
//      'type': 'GET',
//      'cache': false,
//  })
//  .done(function(msg){
//      var ht = msg;
//    alert(msg);
//    // swal("good",ht,"success");
//     //sendAndAnalysis(ht);
//     
//  })
//  .fail(function(jqXHR, textStatus, errorThrown) {
//      // Handle error
//      alert("wrong");
//  }); 
//  
//}

function searchCW(keyword,searchUrl,searchAttribute){
    
    var url = "http://www.chemistwarehouse.com.au/search";
    var searchKeyword = encodeURI(keyword);
    var fullUrl = url + '?searchtext=' +searchKeyword +'&searchmode=allwords'; 
     mui.ajax({
        url:fullUrl,
        type: 'GET',
        cache: false,
    
   success:function(msg){
        var ht = msg;
       //swal("good",ht,"success");
       sendAndAnalysisCW(ht);
       
   },

   error:function(jqXHR, textStatus, errorThrown) {
        // Handle error
        alert("wrong");
    }
   }); 
}

function searchMC(keyword,searchurl,searchAttribute){
    var url = 'http://www.mychemist.com.au/searchresult.asp';
    var searchKeyword = encodeURI(keyword);
    var fullUrl = url + '?terms='+ searchKeyword +'&SearchSection=products&requery=1';
      mui.ajax({
        url:fullUrl,
        type: 'GET',
        cache: false,
    })
    mui.done(function(msg){
        var ht = msg;
     //  swal("good",ht,"success");
       sendAndAnalysisMC(ht);
       
    })
    mui.fail(function(jqXHR, textStatus, errorThrown) {
        // Handle error
        alert("wrong");
    });
    
}
function searchTW(keyword,searchurl,searchAttribute){

    var url = 'https://www.terrywhitechemists.com.au/catalogsearch/result/?cat=0&q=';
    var searchKeyword = encodeURI(keyword);
    var fullUrl = url + searchKeyword;
      mui.ajax({
        url:fullUrl,
        type: 'GET',
        cache: false,
    })
    mui.done(function(msg){
        var ht = msg;
       //swal("good",ht,"success");
       sendAndAnalysisTW(ht);
       
    })
    mui.fail(function(jqXHR, textStatus, errorThrown) {
        // Handle error
        alert("wrong");
    });   
    
}