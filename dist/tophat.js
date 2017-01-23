/*!
@name NICE.TopHat
@version 0.1.0-rc.2 | 2017-01-23
*/
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a,b,c){var d=a.getElementById(b);if(d)c(d);else{var e=a.getElementsByTagName("head")[0];d=a.createElement("style"),null!=b&&(d.id=b),c(d),e.appendChild(d)}return d}b.exports=function(a,b,c){var e=b||document;if(e.createStyleSheet){var f=e.createStyleSheet();return f.cssText=a,f.ownerNode}return d(e,c,function(b){b.styleSheet?b.styleSheet.cssText=a:b.innerHTML=a})},b.exports.byUrl=function(a){if(document.createStyleSheet)return document.createStyleSheet(a).ownerNode;var b=document.getElementsByTagName("head")[0],c=document.createElement("link");return c.rel="stylesheet",c.href=a,b.appendChild(c),c}},{}],2:[function(a,b,c){function d(){var a={},b=e();if(b)for(var c=0,d=h.length;c<d;c++){var i=h[c],j=b.getAttribute("data-"+i);j&&""!==j&&(a[i]=j)}return a.evidence&&(a.service="evidence"),a.accountsUrl=f(a),a.legacy=g(),a}function e(){var a=document.currentScript;if(a)return a;for(var b=document.getElementsByTagName("script"),c=0,d=b.length;c<d;c++){var e=b[c].src.toLowerCase();if(~e.indexOf("tophat.js")||~e.indexOf("tophat.dev.js"))return b[c]}}function f(a){var b=(a.environment||"live").toLowerCase(),c=i[b]||"https://"+("live"!==b?b+"-":"")+"accounts.nice.org.uk";return c}function g(){if("Microsoft Internet Explorer"==navigator.appName){var a=navigator.userAgent,b=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(null!==b.exec(a))return 7===parseFloat(RegExp.$1)}return!1}var h=["service","evidence","environment","timestamp","search","typeaheadtype","typeaheadsource","internal","home","wtrealm"],i={local:"http://nice.sts.local"};b.exports=d},{}],3:[function(a,b,c){b.exports={search:{href:"https://www.evidence.nhs.uk",label:"Evidence search",title:"Evidence search"},bnf:{href:"https://www.evidence.nhs.uk/formulary/bnf/current",label:"BNF",title:"British National Formulary"},bnfc:{href:"https://www.evidence.nhs.uk/formulary/bnfc/current",label:"BNFC",title:"British National Formulary for Children"},cks:{href:"https://cks.nice.org.uk",label:"CKS",title:"Clinical Knowledge Summaries"},journals:{href:"https://www.nice.org.uk/about/what-we-do/evidence-services/journals-and-databases",label:"Journals and databases",title:"Journals and databases"}}},{}],4:[function(a,b,c){b.exports={pathways:{href:"https://pathways.nice.org.uk/",label:"NICE Pathways"},guidance:{href:"https://www.nice.org.uk/guidance",label:"NICE Guidance"},standards:{href:"https://www.nice.org.uk/standards-and-indicators",label:"Standards and&nbsp;indicators"}}},{}],5:[function(a,b,c){function d(a,b,c,d){v=a.addEventListener?"addEventListener":"attachEvent",w=a.addEventListener?"":"on",d.internal&&(z+=" nice-internal"),y.forElement(b),e(a,b)}function e(a,b){s(b,"click",t(b,h)),s(a,"click",t(b,j)),s(b,"click",t(b,f)),s(b,"submit",t(b,l))}function f(a){for(var b=a.target||a.srcElement;!g(b);){if(~b.className.indexOf("nice-tophat")){b=void 0;break}b=b.parentNode}var c=b&&(b.href||b.getElementsByTagName("a")[0].href);if(b&&c){var d="tophat",e=x.find(b,"menu-label")[0]||b,f=e.textContent||e.innerText||e.innerHTML,h=window.location.href;switch(r(b.className)){case"menu-profile":f="Your Profile"+(~this.className.indexOf(b.className+"-open")?" expanded":" collapased"),c=!1;break;case"menu-evidence":case"menu-search":f+=~this.className.indexOf(b.className+"-open")?" expanded":" collapased",c=!1}a.preventDefault(),m(d,f,h,function(){c&&(window.location.href=c)})}}function g(a){var b=a&&"li"===a.nodeName.toLowerCase()&&(~a.className.indexOf("menu-")||~a.className.indexOf("evidence-"));return!!b}function h(a){for(var b=a.target||a.srcElement;i(b);){if(~b.className.indexOf("nice-tophat")){b=void 0;break}b=b.parentNode}var c=!(b&&!~b.className.indexOf("nice-tophat"));if(!c)switch(a.preventDefault(),(a.target||a.srcElement).blur(),r(b.className)){case"menu-evidence":this.state.toggleEvidence();break;case"menu-profile":this.state.toggleProfile();break;case"menu-mobile":this.state.toggleMobileMenu()}}function i(a){var b=a&&!~a.className.indexOf("menu-evidence")&&!~a.className.indexOf("menu-mobile")&&!~a.className.indexOf("menu-profile");return!!b}function j(a){var b=a.target||a.srcElement;k(b)||this.state.unfocus()}function k(a){for(var b=!1,c=a;c;){if(c.className&&~c.className.indexOf("nice-tophat")){b=!0;break}c=c.parentNode}return b}function l(a){var b=a.target||a.srcElement;if(b.className&&~b.className.indexOf("nice-search")&&~b.action.search(/%(25)?term/gi)&&b.q){var c=b.q.getAttribute("placeholder"),d=b.q.value,e=d!==c?escape(d.replace(/\s/g,"+")):"",f=b.action.replace(/%(25)?term/gi,e);m("Search",e,f,function(){window.location.href=f}),a.preventDefault()}}function m(a,b,c,d){return d&&window.setTimeout(d,50),window.dataLayer&&"function"==typeof window.dataLayer.push?n(a,b,c):window._gaq&&"function"==typeof window._gaq.push?o(a,b,c):"function"==typeof window.ga?p(a,b,c):void q(a,b,c)}function n(a,b,c){var d={event:"GAevent",eventCategory:a,eventAction:b,eventLabel:c};window.dataLayer.push(d)}function o(a,b,c){var d=["_trackEvent",a,b,c];window._gaq.push(d)}function p(a,b,c){var d={category:a,action:b,label:c};window.ga("send","event",d)}function q(a,b,c){var d=window.console;d&&d.log&&d.log("track",a,b,c)}function r(a){return a.replace(" active","")}function s(a,b,c){a[v](w+b,function(a){c(u(a))},!0)}function t(a,b){return function(c){b.call(a,c)}}function u(a){var b=a.stopPropagation,c=a.preventDefault;return a.stopPropagation=function(){return b?b.call(a):a.cancelBubble=!0,a},a.preventDefault=function(){return c?c.call(a):a.returnValue=!1,a},a}var v,w,x=a("../utils/dom"),y=a("./states"),z="nice-tophat";b.exports=d},{"../utils/dom":25,"./states":6}],6:[function(a,b,c){function d(a){this.element=a,this.classname=f(a.className),this.data=e(a.className),a.state=this}function e(a){return{evidence:~a.indexOf(g),profile:~a.indexOf(h),mobile:~a.indexOf(i)}}function f(a){return a.replace(" "+g,"").replace(" "+h,"").replace(" "+i,"")}var g="menu-evidence-open",h="menu-profile-open",i="menu-mobile-open";d.prototype={updateState:function(){var a=this.classname+(this.data.evidence?" "+g:"")+(this.data.profile?" "+h:"")+(this.data.mobile?" "+i:"");this.element.className=a},toggleEvidence:function(){this.data.evidence=!this.data.evidence,this.data.evidence&&(this.data.profile=!1,this.data.mobile=!1),this.updateState()},toggleProfile:function(){this.data.profile=!this.data.profile,this.data.profile&&(this.data.mobile=!1,this.data.evidence=!1),this.updateState()},toggleMobileMenu:function(){this.data.mobile=!this.data.mobile,this.data.mobile&&(this.data.profile=!1,this.data.evidence=!1),this.updateState()},unfocus:function(){this.data.profile=!1,this.data.mobile=!1,this.data.evidence=!1,this.updateState()}},b.exports={forElement:function(a){new d(a)}}},{}],7:[function(a,b,c){function d(a,b,c){if(!c.internal){g.appendElement(g.create(j),g.find(b,"menu")[0]);var d=e(h,"beta"===c.environment),f=g.create(i.replace("{{menu}}",d));if(c.evidence){var k=g.find(f,"evidence-"+c.evidence)[0];k.className=k.className+" active"}return f}}function e(a,b){var c=[];for(var d in a){var e=a[d];c.push(f(d,e,b))}return c.join("")}function f(a,b,c){var d=k.replace(/{{id}}/gi,a).replace(/{{label}}/gi,b.label).replace(/{{title}}/gi,b.title).replace(/{{href}}/gi,(c?b.beta:void 0)||b.href);return d}var g=a("../utils/dom"),h=a("../config/evidence"),i=a("../templates/evidence/menu.html"),j=a("../templates/evidence/service.html"),k=a("../templates/evidence/links.html");b.exports=d},{"../config/evidence":3,"../templates/evidence/links.html":12,"../templates/evidence/menu.html":13,"../templates/evidence/service.html":14,"../utils/dom":25}],8:[function(a,b,c){function d(a){var b=e.find(a,"nice-global")[0];return b||(b=e.create(f)),b}var e=a("../utils/dom"),f=a("../templates/global/menu.html");b.exports=d},{"../templates/global/menu.html":15,"../utils/dom":25}],9:[function(a,b,c){function d(a,b,c){"none"!==c.profile&&(j.insertBeforeElement(j.create(n.replace("{{root}}",c.accountsUrl)),j.find(b,"menu")[0]),k.get(c.accountsUrl+p+(c.wtrealm?"?wtrealm="+c.wtrealm:""),function(b){return b?b.display_name?void e(a,b):void f(a,b):void g(a)}))}function e(a,b){var c=j.find(a,"menu-anonymous")[0],d=j.create(m);d.setAttribute("title",b.display_name),b.thumbnail&&b.thumbnail.length&&(d.innerHTML='<img src="'+b.thumbnail+'" class="profile-avatar" alt="Your profile image" />');var e=h(b.links),f=j.create(l.replace("{{menu}}",e));j.insertBeforeElement(d,c),j.remove(c),j.insertBeforeElement(f,a.lastChild)}function f(a,b){var c=j.find(a,"menu-anonymous")[0];b.links&&b.links["Sign in"]&&c.setAttribute("href",b.links["Sign in"])}function g(a){var b=j.find(a,"menu-profile")[0];j.remove(b)}function h(a){var b=[];for(var c in a){var d=a[c];b.push(i(c,d))}return b.join("")}function i(a,b){var c=o.replace(/{{label}}/gi,a).replace(/{{href}}/gi,b);return c}var j=a("../utils/dom"),k=a("../utils/xhr"),l=a("../templates/profile/menu.html"),m=a("../templates/profile/service.html"),n=a("../templates/profile/anon.html"),o=a("../templates/profile/links.html"),p="/tophat";b.exports=d},{"../templates/profile/anon.html":16,"../templates/profile/links.html":17,"../templates/profile/menu.html":18,"../templates/profile/service.html":19,"../utils/dom":25,"../utils/xhr":26}],10:[function(a,b,c){function d(a,b,c){if(c.search){var d=h(window.location.search),f=j.replace("{{method}}","get").replace("{{action}}",c.search.replace(/"/g,"&quot;")).replace("{{typeaheadtype}}",c.typeaheadtype||"").replace("{{typeaheadsource}}",c.typeaheadsource||"").replace("{{q}}",(d.q||"").replace(/"/g,"&quot;")),g=i.create(f);return e(a,g),g}}function e(a,b){var c=i.find(a,"menu")[0];return c?i.insertBeforeElement(b,c):void i.appendElement(b,a.firstChild)}function f(a){return decodeURIComponent(unescape((a||"").replace(/\+/g," ")))}function g(a,b,c){var d=f(b),e=f(c),g=a[d];return"undefined"==typeof g?void(a[d]=e):("object"==typeof g&&g.length||(a[d]=[g]),void a[d].push(e))}function h(a){for(var b,c=/([^&=]+)=?([^&]*)/g,d=a.substring(1),e={};b=c.exec(d);)g(e,b[1],b[2]);return e}var i=a("../utils/dom"),j=a("../templates/search/form.html");b.exports=d},{"../templates/search/form.html":20,"../utils/dom":25}],11:[function(a,b,c){function d(a,b){h(a);var c="";return b.internal||(c=f(j,"beta"===b.environment)),e(c,b)}function e(a,b){var c=k.replace("{{menu}}",a).replace("{{homelink}}",b.home||"http://www.nice.org.uk"),d=i.create(c);return b.internal&&(i.find(d,"logo")[0].getElementsByTagName("small")[0].innerHTML=b.internal),d}function f(a,b){var c=[];for(var d in a){var e=a[d];c.push(g(d,e,b))}return c.join("")}function g(a,b,c){var d=l.replace(/{{id}}/gi,a).replace(/{{label}}/gi,b.label).replace(/{{title}}/gi,b.title).replace(/{{href}}/gi,(c?b.beta:void 0)||b.href);return d}function h(a){var b=i.find(a,"nice-services")[0];b&&b.parentNode.removeChild(b)}var i=a("../utils/dom"),j=a("../config/services"),k=a("../templates/services/menu.html"),l=a("../templates/services/links.html");b.exports=d},{"../config/services":4,"../templates/services/links.html":21,"../templates/services/menu.html":22,"../utils/dom":25}],12:[function(a,b,c){b.exports='<li class="evidence-{{id}}"><a href="{{href}}" title="{{title}}">{{label}}</a></li>'},{}],13:[function(a,b,c){b.exports='<div class="nice-evidence" id="nice-evidence"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>'},{}],14:[function(a,b,c){b.exports='<li class="menu-evidence"><a href="#nice-evidence">Evidence services</a></li>'},{}],15:[function(a,b,c){b.exports='<div class="nice-global" id="nice-global"><div class="tophat-inner"></div></div>'},{}],16:[function(a,b,c){b.exports='<a href="{{root}}/signin" class="menu-anonymous">Sign in</a>'},{}],17:[function(a,b,c){b.exports='<li><a href="{{href}}">{{label}}</a></li>'},{}],18:[function(a,b,c){b.exports='<div class="nice-profile" id="nice-profile"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>'},{}],19:[function(a,b,c){b.exports='<a href="#nice-profile" class="menu-profile"><span class="profile-avatar"></span></a>'},{}],20:[function(a,b,c){b.exports='<form class="nice-search" method="{{method}}" action="{{action}}" data-track="search"><div class="controls"><input name="q" value="{{q}}" autocomplete="off" spellcheck="false" placeholder="Search..." maxlength="250" data-provide="typeahead" data-source-type="{{typeaheadtype}}" data-source="{{typeaheadsource}}"> <button type="submit"><i class="icon-search"></i> <span class="menu-label">Search</span></button></div></form>'},{}],21:[function(a,b,c){b.exports='<li class="menu-{{id}}"><a href="{{href}}">{{label}}</a></li>'},{}],22:[function(a,b,c){b.exports='<div class="nice-services"><div class="tophat-inner"><a href="#" class="menu-mobile">Menu</a> <a href="{{homelink}}" class="logo">NICE <small>National Institute for<br>Health and Care Excellence</small></a><ul class="menu">{{menu}}</ul></div></div>'},{}],23:[function(a,b,c){var d=a("./../node_modules/cssify"),e="@font-face{font-family:\"NICE.Glyphs\";src:url('//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.eot?#iefix&v=1.3') format('embedded-opentype'),url('//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.woff?v=1.3') format('woff'),url('//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.ttf?v=13') format('truetype'),url('//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.svg#niceglyphregular?v=1.3') format('svg');font-weight:normal;font-style:normal}.nice-tophat{min-height:60px;margin-bottom:24px;*position:relative;*z-index:2001;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:16px;font-weight:400;line-height:24px}.nice-tophat *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.nice-tophat .tophat-inner{width:95.74468085%;max-width:1170px;margin:0 auto;*zoom:1}.nice-tophat .tophat-inner:before,.nice-tophat .tophat-inner:after{display:table;content:\"\";line-height:0}.nice-tophat .tophat-inner:after{clear:both}.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 24px}@media (max-width:979px){.nice-tophat .tophat-inner,.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 12px}}.nice-tophat a{text-decoration:none;font-weight:normal}.nice-tophat a:focus,.nice-tophat a:hover,.nice-tophat a:active{text-decoration:none}.nice-tophat .menu-mobile{display:none;top:0;left:0;position:absolute;margin:8px 12px;padding:3px 6px}.nice-tophat .menu-mobile,.nice-tophat .menu-mobile:hover,.nice-tophat .menu-mobile:focus{color:#0E0E0E;font-weight:600}.nice-tophat .menu{position:relative;left:0;display:block;float:right;margin:0;padding:0;list-style:none}.nice-tophat .menu li{list-style:none;float:left;margin:0}.nice-tophat .menu a{display:block;padding:12px;color:#0E0E0E}.nice-tophat .menu a:focus,.nice-tophat .menu a:hover,.nice-tophat .menu a:active{color:#0E0E0E}@media (max-width:767px){.nice-tophat .menu{margin:0 -12px;clear:left}.nice-tophat .menu,.nice-tophat .menu li{position:relative;display:block;float:none}.nice-tophat .menu a{padding:0 12px;line-height:24px}}.nice-tophat .logo,.nice-tophat .icon-offcanvas{color:#0E0E0E;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-tophat .logo{float:left;display:block;padding:12px 24px;margin-left:-24px;font-size:0;line-height:0;border:0}.nice-tophat .logo small{display:none}.nice-tophat .logo:before{content:\"\\e01a\\e01b\";font-size:48px;line-height:48px;letter-spacing:-0.6em}.nice-tophat .icon-offcanvas:before{content:\"\\e03d\"}.tophat-legacy .logo{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01a;&#xe01b;');font-size:48px;line-height:48px;letter-spacing:-0.6em}.tophat-legacy .icon-offcanvas:before{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe03d;')}@media (max-width:1059px){.nice-tophat .logo:before{content:\"\\e01a\"}}@media (max-width:829px){.nice-tophat{min-height:48px;background-color:rgba(0,0,0,0.075);padding-bottom:2px;margin-bottom:-2px}.nice-tophat .logo{padding:0 0 0 24px}.nice-tophat .logo:before{font-size:38px}.nice-tophat .logo small{display:none}}@media (max-width:767px){.nice-tophat .logo{text-align:center;width:auto;margin:0 84px;padding:0 24px;float:none}}.nice-tophat .nice-services{background-color:#fff}.nice-tophat .nice-services .menu{border-right:1px solid #adadad}.nice-tophat .nice-services .menu a{width:84px;padding:12px 4.5px 20px 12px;border-left:1px solid #adadad;line-height:20px;font-size:16px}.nice-tophat .nice-services .menu a:hover,.nice-tophat .nice-services .menu a:focus{background-color:#e9e9e9}.nice-tophat .nice-services .menu .menu-standards a{width:120px}.nice-tophat .nice-services .menu .menu-evidence{position:relative}.nice-tophat .nice-services .menu .menu-evidence a:before{border:6px solid transparent;content:'';position:absolute;bottom:0;left:50%;border-top-color:#0e0e0e;margin-left:-7px}.nice-tophat .nice-services .menu .active a,.nice-tophat .nice-services .menu .active a:hover,.nice-tophat .nice-services .menu .active a:focus{background-color:#004650;color:#fff}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a{border-bottom:0;padding-bottom:20px}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a,.menu-evidence-open .nice-services .menu .menu-evidence a:hover,.menu-evidence-active .nice-services .menu .menu-evidence a:hover,.menu-evidence-open .nice-services .menu .menu-evidence a:focus,.menu-evidence-active .nice-services .menu .menu-evidence a:focus{background-color:#e9e9e9;color:#0E0E0E}.menu-evidence-open .nice-services .menu .menu-evidence a:before,.menu-evidence-active .nice-services .menu .menu-evidence a:before{display:none}@media (max-width:979px){.nice-tophat .nice-services .menu a{padding-top:12px;padding-bottom:20px}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a{padding-bottom:20px}}@media (max-width:767px){.nice-tophat .nice-services .menu{display:none}.nice-tophat .nice-services .menu a{padding-bottom:12px}.nice-tophat .nice-services .menu li a,.nice-tophat .nice-services .menu .menu-standards a{border-left:0;line-height:24px;width:auto}.nice-tophat .nice-services .menu .menu-evidence a,.nice-tophat .nice-services .menu .menu-evidence a:hover,.nice-tophat .nice-services .menu .menu-evidence a:focus{padding-bottom:3px;background-color:#e9e9e9;border:0}.nice-tophat .nice-services .menu .menu-evidence a:before{display:none}.nice-tophat .menu-mobile{display:block}.menu-mobile-open .nice-services .menu{display:block}}@media (max-width:480px){.nice-tophat .nice-services .menu li a{padding:6px 12px}}.nice-tophat .nice-evidence{background-color:#e9e9e9;display:none}.nice-tophat .nice-evidence .menu{border-right:1px solid #d6d6d6}.nice-tophat .nice-evidence .menu a{padding-left:12px;padding-right:12px;border-left:1px solid #d6d6d6;font-size:16px}.nice-tophat .nice-evidence .menu a:hover,.nice-tophat .nice-evidence .menu a:focus{background-color:#d6d6d6}.nice-tophat .nice-evidence .menu .active a:hover,.nice-tophat .nice-evidence .menu .active a:focus,.nice-tophat .nice-evidence .menu .active a{color:#fff;background-color:#004650}.menu-evidence-open .nice-evidence,.menu-evidence-active .nice-evidence{display:block}@media (max-width:767px){.nice-tophat .nice-evidence{display:none}.nice-tophat .nice-evidence .menu{border:0}.nice-tophat .nice-evidence .menu li a{padding:12px 12px 12px 36px;border:0;border-top:1px solid #d6d6d6;line-height:24px}.nice-tophat .nice-evidence .menu li:first-child a{border-top:0}.menu-mobile-open .nice-evidence{display:block}}@media (max-width:480px){.nice-tophat .nice-evidence .menu li a{padding:6px 6px 6px 24px}}.nice-tophat .nice-global{background-color:#004650;color:#fff}.nice-tophat .nice-global .menu a{color:#fff;padding:19px 12px 20px;line-height:24px}.nice-tophat .nice-global .menu a:hover,.nice-tophat .nice-global .menu a:focus{color:#fff;background-color:#18646e}.nice-tophat .nice-global .menu .active a,.nice-tophat .nice-global .menu .active a:hover,.nice-tophat .nice-global .menu .active a:focus{color:#000;background-color:#fff}.nice-tophat .nice-global .tool-brand{display:block;font-size:36px;line-height:36px;margin:0 0 -24px;padding:12px 0 0}.nice-tophat .nice-global .tool-brand small{font-size:24px;color:#777}.nice-tophat .nice-global .publication-date{float:right;font-size:16px;margin-top:-4px;margin-right:12px;color:#666}@media (max-width:979px){.nice-tophat .nice-global{position:relative}.nice-tophat .nice-global .tool-brand{margin-bottom:0;padding:6px 0}.nice-tophat .nice-global .menu{display:none;visibility:hidden;speak:none}}@media (max-width:768px){.nice-tophat .nice-global{background-image:none !important}.nice-tophat .nice-global .tool-brand{margin:0;width:100%;text-align:center}}.nice-search{color:#0E0E0E;float:left;position:relative;width:40%;margin:12px 0}.nice-search .controls{margin-right:40px}.nice-search input{display:block;width:100%;height:36px;padding:0 12px;margin:0;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:36px;color:#0E0E0E;border:1px solid #ccc;border-radius:0;vertical-align:middle;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:none}.nice-search input:focus{outline:none}.nice-search button{display:inline-block;color:#0E0E0E;background-color:#d6d6d6;overflow:hidden;position:absolute;height:36px;width:36px;margin:0;padding:0;top:0;right:0;border:1px solid #d6d6d6;font-size:0;line-height:normal}.nice-search button:hover{background-color:#adadad;border-colour:#adadad}.nice-search .icon-search{font-size:24px;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-search .icon-search:before{content:\"\\e004\"}.nice-search .twitter-typeahead{width:100%}.nice-search .tt-dropdown-menu{width:100%}.tophat-legacy .icon-search{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe004;')}@media (max-width:979px){.nice-search{float:none;width:100%}.nice-partner .nice-search .controls{margin-left:110px}}.nice-tophat .nice-partner .partner-logo{float:left;display:block;margin:22px 24px 0 0}.nice-tophat .nice-partner .partner-logo:hover,.nice-tophat .nice-partner .partner-logo:focus,.nice-tophat .nice-partner .partner-logo:active{background-color:transparent;padding-bottom:0;border-bottom:none}.nice-tophat .nice-partner .partner-logo img{height:72px}.nice-tophat .nice-partner .partner-brand{display:block;font-size:24px;line-height:36px;margin:0 0 -6px;padding:12px 0 0;color:#fff}.nice-tophat .nice-partner .partner-brand small{float:right;margin:-10px 10px 0 0}@media (max-width:979px){.nice-tophat .nice-partner .partner-brand{display:none;visibility:hidden;speak:none}.nice-tophat .nice-partner .partner-logo{position:absolute;top:12px;left:12px;padding:0;margin:0;z-index:2002}.nice-tophat .nice-partner .partner-logo img{height:38px}}.nice-internal{min-height:50px;width:100%}.nice-internal .logo{font-size:0;line-height:36px;*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe019;')}.nice-internal .logo,.nice-internal .logo:hover,.nice-internal .logo:focus,.nice-internal .logo:active{color:#263238}.nice-internal .logo small{font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;display:inline;font-size:32px;line-height:46px}.nice-internal .logo:before{float:none;margin-right:.5em;font-size:32px;content:\"\\e01a\";vertical-align:top}.nice-internal .nice-services{background-color:#fff}.nice-internal .nice-services .menu a{color:#263238;border-left:none;padding-top:5px;padding-bottom:5px}.nice-internal .nice-services .menu a:hover,.nice-internal .nice-services .menu a:focus,.nice-internal .nice-services .menu a:active{color:#263238;background-color:transparent}.active .nice-internal .nice-services .menu a,.active .nice-internal .nice-services .menu a:hover,.active .nice-internal .nice-services .menu a:focus,.active .nice-internal .nice-services .menu a:active{color:#263238;background-color:transparent}.nice-internal .nice-services .menu-mobile{display:none}.nice-internal .nice-global a{padding-top:9px;padding-bottom:10px}.nice-internal .nice-global a:hover,.nice-internal .nice-global a:focus{padding-bottom:8px;border-bottom-width:2px}.menu .nice-internal .nice-global a{padding-top:19px;padding-bottom:20px;line-height:24px}.menu .nice-internal .nice-global a:hover,.menu .nice-internal .nice-global a:focus{padding-bottom:16px;border-bottom-width:4px}.active .nice-internal .nice-global a,.active .nice-internal .nice-global a:hover,.active .nice-internal .nice-global a:focus{padding-bottom:8px;border-bottom-width:2px}.menu .active .nice-internal .nice-global a,.menu .active .nice-internal .nice-global a:hover,.menu .active .nice-internal .nice-global a:focus{padding-bottom:16px;border-bottom-width:4px}@media (max-width:767px){.nice-internal .logo{margin:0;padding:0}}.nice-tophat .menu-anonymous,.nice-tophat .menu-profile{float:right}.nice-tophat .menu-anonymous,.nice-tophat .menu-profile,.nice-tophat .menu-anonymous:hover,.nice-tophat .menu-profile:hover,.nice-tophat .menu-anonymous:focus,.nice-tophat .menu-profile:focus{color:#0E0E0E;font-weight:600}.nice-tophat .menu-anonymous{margin:15px 0 0 12px;padding:6px 12px;border:2px solid #0E0E0E}.nice-tophat .menu-profile{position:relative;width:36px;height:36px;padding:9px;line-height:36px}.nice-tophat .menu-profile,.nice-tophat .menu-profile:hover,.nice-tophat .menu-profile:focus{background-color:transparent}.nice-tophat .menu-profile:hover{color:#999}.nice-tophat .profile-avatar{position:absolute;width:100%;height:100%;vertical-align:-35%;text-align:center;font-size:20px;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;line-height:inherit;*line-height:40px}.nice-tophat .profile-avatar:before{content:\"\\e01f\"}.nice-tophat .nice-profile{position:absolute;z-index:2003;width:250px;left:50%;margin-left:340px;top:50px;background-color:#e9e9e9;display:none;border:1px solid #adadad}.nice-tophat .nice-profile:before{border:6px solid transparent;content:'';position:absolute;bottom:100%;right:18px;border-bottom-color:#0E0E0E}.nice-tophat .nice-profile .tophat-inner{margin-left:0;width:100%}.nice-tophat .nice-profile .menu{border-right:1px solid #d6d6d6}.nice-tophat .nice-profile .menu,.nice-tophat .nice-profile .menu li{float:none;display:block;margin-left:0;border-right:0}.nice-tophat .nice-profile .menu a{padding-left:12px;padding-right:12px;border-top:1px solid #d6d6d6}.nice-tophat .nice-profile .menu a:hover,.nice-tophat .nice-profile .menu a:focus{background-color:#d6d6d6}.active .nice-tophat .nice-profile .menu a,.active .nice-tophat .nice-profile .menu a:hover,.active .nice-tophat .nice-profile .menu a:focus{color:#fff;background-color:#004650}li:first-child .nice-tophat .nice-profile .menu a{border-top:0}.nice-tophat .nice-profile .menu li:first-child a{border-top:0}.tophat-legacy .profile-avatar{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01f;')}.menu-profile-open .nice-profile{display:block}.layout-fill .nice-tophat .nice-profile{left:auto;right:16px;margin-left:0}.layout-fill .nice-tophat .nice-profile .tophat-inner{margin-left:0}@media (max-width:1220px){.nice-tophat .nice-profile{left:auto;right:1.5%}}@media (max-width:979px){.nice-tophat .menu-anonymous{margin-top:12px}.nice-tophat .nice-profile{right:5px}.layout-fill .nice-tophat .nice-profile{right:5px}}@media (max-width:767px){.nice-tophat .menu-anonymous,.nice-tophat .menu-profile{top:0;right:0;position:absolute}.nice-tophat .menu-anonymous{margin:8px 12px;padding:3px 6px;border:0}.nice-tophat .nice-profile{position:relative;left:0;top:0;width:auto;margin:0;padding:0}.nice-tophat .nice-profile:before{right:21px}.nice-tophat .nice-profile .menu{border:0;margin:0}.nice-tophat .nice-profile .menu li a{padding:12px;border:0;border-top:1px solid #d6d6d6;line-height:24px}.nice-tophat .nice-profile .menu li:first-child a{border-top:0}.nice-tophat .profile-avatar{font-size:16px;line-height:32px;height:32px;width:32px}.nice-tophat .profile-avatar:before{height:32px;width:32px}.layout-fill .nice-tophat .nice-profile{right:auto}}@media (max-width:480px){.nice-tophat .nice-profile .menu li a{padding:6px 12px}}";d(e,void 0,"_mc6cil"),b.exports=e},{"./../node_modules/cssify":1}],24:[function(a,b,c){function d(a,b){var c=f.find(g,a)[0];return c||(c=f.create('<div class="'+a+'"/>')),c.className=a+(b.internal?" nice-internal":"")+(b.legacy?" tophat-legacy":""),c}function e(a,b,c,d,e){if(f.appendElement(b,a),c&&f.appendElement(c,a),d&&f.appendElement(d,a),e.service){var h="menu-"+e.service,j=f.find(a,h)[0];j.className+=" active",a.className+=" "+h+"-active"}f.prependElement(i,g)}a("./tophat.css");var f=a("./utils/dom"),g=document.body,h=a("./config")(),i=d("nice-tophat",h),j=a("./services")(i,h),k=a("./evidence")(i,j,h);a("./profile")(i,j,h);var l=a("./global")(i);a("./search")(l,j,h);e(i,j,k,l,h),a("./events")(document,i,j,h),document.onTophatReady&&document.onTophatReady()},{"./config":2,"./events":5,"./evidence":7,"./global":8,"./profile":9,"./search":10,"./services":11,"./tophat.css":23,"./utils/dom":25}],25:[function(a,b,c){var d={};d.find=function(a,b){function c(a,b){return a.getElementsByClassName(b)}function e(a,b){var c,d,e,f=a,g=[];if(a.querySelectorAll)return a.querySelectorAll("."+b);if(a.evaluate)for(d=".//*[contains(concat(' ', @class, ' '), ' "+b+" ')]",c=a.evaluate(d,f,null,0,null);e=c.iterateNext();)g.push(e);else{c=a.getElementsByTagName("*"),d=new RegExp("(^|\\s)"+b+"(\\s|$)");var h=c.length;for(e=0;e<h;e++)d.test(c[e].className)&&g.push(c[e])}return g}var f=document.getElementsByClassName?c:e;return d.find=f,f(a,b)},d.create=function(a){if(!~a.indexOf("<"))return document.createElement(a);var b=document.createElement("div");return b.innerHTML=a,b.firstChild},d.remove=function(a){a.parentNode.removeChild(a)},d.prependElement=function(a,b){b.insertBefore(a,b.firstChild)},d.insertBeforeElement=function(a,b){var c=b.parentNode;c.insertBefore(a,b)},d.appendElement=function(a,b){b.appendChild(a)},b.exports=d},{}],26:[function(a,b,c){var d=a("./dom"),e={};e.get=function(a,b){var c=document.body,e=document.createElement("script");e.src=a+(~a.indexOf("?")?"&":"?")+Math.floor(1e10*Math.random());var f=!1;e.onload=e.onreadystatechange=function(){f||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(f=!0,b(window._na),e.onload=e.onreadystatechange=null,c&&e.parentNode&&c.removeChild(e))},d.prependElement(e,c)},b.exports=e},{"./dom":25}]},{},[24]);
//# sourceMappingURL=tophat.map