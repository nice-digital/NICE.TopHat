!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){b.exports=function(a,b){var c=b||document;if(c.createStyleSheet)c.createStyleSheet().cssText=a;else{var d=c.getElementsByTagName("head")[0],e=c.createElement("style");e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(c.createTextNode(a)),d.appendChild(e)}},b.exports.byUrl=function(a){if(document.createStyleSheet)document.createStyleSheet(a);else{var b=document.getElementsByTagName("head")[0],c=document.createElement("link");c.rel="stylesheet",c.href=a,b.appendChild(c)}}},{}],2:[function(a,b){function c(){var a={},b=d();if(b)for(var c=0,h=g.length;h>c;c++){var i=g[c],j=b.getAttribute("data-"+i);j&&""!==j&&(a[i]=j)}return a.evidence&&(a.service="evidence"),a.accountsUrl=e(a),a.legacy=f(),a}function d(){var a=document.currentScript;if(a)return a;for(var b=document.getElementsByTagName("script"),c=0,d=b.length;d>c;c++){var e=b[c].src.toLowerCase();if(~e.indexOf("tophat.js")||~e.indexOf("tophat.dev.js"))return b[c]}}function e(a){var b=(a.environment||"live").toLowerCase(),c=h[b]||"https://"+("live"!==b?b+"-":"")+"accounts.nice.org.uk";return c}function f(){if("Microsoft Internet Explorer"==navigator.appName){var a=navigator.userAgent,b=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(null!==b.exec(a))return 7===parseFloat(RegExp.$1)}return!1}var g=["service","evidence","environment","timestamp","search","typeaheadtype","typeaheadsource","internal","home","wtrealm"],h={local:"http://nice.sts.local"};b.exports=c},{}],3:[function(a,b){b.exports={search:{href:"http://www.evidence.nhs.uk",label:"Evidence search",title:"Evidence search"},bnf:{href:"http://www.evidence.nhs.uk/formulary/bnf/current",label:"BNF",title:"British National Formulary"},bnfc:{href:"http://www.evidence.nhs.uk/formulary/bnfc/current",label:"BNFC",title:"British National Formulary for Children"},cks:{href:"http://cks.nice.org.uk",label:"CKS",title:"Clinical Knowledge Summaries"},journals:{href:"http://www.nice.org.uk/about/what-we-do/evidence-services/journals-and-databases",label:"Journals and databases",title:"Journals and databases"}}},{}],4:[function(a,b){b.exports={pathways:{href:"http://pathways.nice.org.uk",label:"NICE Pathways"},guidance:{href:"http://www.nice.org.uk/Guidance",label:"NICE Guidance"},standards:{href:"http://www.nice.org.uk/standards-and-indicators",label:"Standards and&nbsp;indicators"}}},{}],5:[function(a,b){function c(a,b,c,e){u=a.addEventListener?"addEventListener":"attachEvent",v=a.addEventListener?"":"on",e.internal&&(y+=" nice-internal"),x.forElement(b),d(a,b)}function d(a,b){r(b,"click",s(b,g)),r(a,"click",s(b,i)),r(b,"click",s(b,e)),r(b,"submit",s(b,k))}function e(a){for(var b=a.target||a.srcElement;!f(b);){if(~b.className.indexOf("nice-tophat")){b=void 0;break}b=b.parentNode}var c=b&&(b.href||b.getElementsByTagName("a")[0].href);if(b&&c){var d="tophat",e=w.find(b,"menu-label")[0]||b,g=e.textContent||e.innerText||e.innerHTML,h=window.location.href;switch(q(b.className)){case"menu-profile":g="Your Profile"+(~this.className.indexOf(b.className+"-open")?" expanded":" collapased"),c=!1;break;case"menu-evidence":case"menu-search":g+=~this.className.indexOf(b.className+"-open")?" expanded":" collapased",c=!1}a.preventDefault(),l(d,g,h,function(){c&&(window.location.href=c)})}}function f(a){var b=a&&"li"===a.nodeName.toLowerCase()&&(~a.className.indexOf("menu-")||~a.className.indexOf("evidence-"));return!!b}function g(a){for(var b=a.target||a.srcElement;h(b);){if(~b.className.indexOf("nice-tophat")){b=void 0;break}b=b.parentNode}var c=!(b&&!~b.className.indexOf("nice-tophat"));if(!c)switch(a.preventDefault(),(a.target||a.srcElement).blur(),q(b.className)){case"menu-evidence":this.state.toggleEvidence();break;case"menu-profile":this.state.toggleProfile();break;case"menu-mobile":this.state.toggleMobileMenu()}}function h(a){var b=a&&!~a.className.indexOf("menu-evidence")&&!~a.className.indexOf("menu-mobile")&&!~a.className.indexOf("menu-profile");return!!b}function i(a){var b=a.target||a.srcElement;j(b)||this.state.unfocus()}function j(a){for(var b=!1,c=a;c;){if(c.className&&~c.className.indexOf("nice-tophat")){b=!0;break}c=c.parentNode}return b}function k(a){var b=a.target||a.srcElement;if(b.className&&~b.className.indexOf("nice-search")&&~b.action.search(/%(25)?term/gi)&&b.q){var c=b.q.getAttribute("placeholder"),d=b.q.value,e=d!==c?escape(d.replace(/\s/g,"+")):"",f=b.action.replace(/%(25)?term/gi,e);l("Search",e,f,function(){window.location.href=f}),a.preventDefault()}}function l(a,b,c,d){return d&&window.setTimeout(d,50),window.dataLayer&&"function"==typeof window.dataLayer.push?m(a,b,c):window._gaq&&"function"==typeof window._gaq.push?n(a,b,c):"function"==typeof window.ga?o(a,b,c):void p(a,b,c)}function m(a,b,c){var d={event:"GAevent",eventCategory:a,eventAction:b,eventLabel:c};window.dataLayer.push(d)}function n(a,b,c){var d=["_trackEvent",a,b,c];window._gaq.push(d)}function o(a,b,c){var d={category:a,action:b,label:c};window.ga("send","event",d)}function p(a,b,c){var d=window.console;d&&d.log&&d.log("track",a,b,c)}function q(a){return a.replace(" active","")}function r(a,b,c){a[u](v+b,function(a){c(t(a))},!0)}function s(a,b){return function(c){b.call(a,c)}}function t(a){var b=a.stopPropagation,c=a.preventDefault;return a.stopPropagation=function(){return b?b.call(a):a.cancelBubble=!0,a},a.preventDefault=function(){return c?c.call(a):a.returnValue=!1,a},a}var u,v,w=a("../utils/dom"),x=a("./states"),y="nice-tophat";b.exports=c},{"../utils/dom":25,"./states":6}],6:[function(a,b){function c(a){this.element=a,this.classname=e(a.className),this.data=d(a.className),a.state=this}function d(a){return{evidence:~a.indexOf(f),profile:~a.indexOf(g),mobile:~a.indexOf(h)}}function e(a){return a.replace(" "+f,"").replace(" "+g,"").replace(" "+h,"")}var f="menu-evidence-open",g="menu-profile-open",h="menu-mobile-open";c.prototype={updateState:function(){var a=this.classname+(this.data.evidence?" "+f:"")+(this.data.profile?" "+g:"")+(this.data.mobile?" "+h:"");this.element.className=a},toggleEvidence:function(){this.data.evidence=!this.data.evidence,this.data.evidence&&(this.data.profile=!1,this.data.mobile=!1),this.updateState()},toggleProfile:function(){this.data.profile=!this.data.profile,this.data.profile&&(this.data.mobile=!1,this.data.evidence=!1),this.updateState()},toggleMobileMenu:function(){this.data.mobile=!this.data.mobile,this.data.mobile&&(this.data.profile=!1,this.data.evidence=!1),this.updateState()},unfocus:function(){this.data.profile=!1,this.data.mobile=!1,this.data.evidence=!1,this.updateState()}},b.exports={forElement:function(a){new c(a)}}},{}],7:[function(a,b){function c(a,b,c){if(!c.internal){f.appendElement(f.create(i),f.find(b,"menu")[0]);var e=d(g,"beta"===c.environment),j=f.create(h.replace("{{menu}}",e));if(c.evidence){var k=f.find(j,"evidence-"+c.evidence)[0];k.className=k.className+" active"}return j}}function d(a,b){var c=[];for(var d in a){var f=a[d];c.push(e(d,f,b))}return c.join("")}function e(a,b,c){var d=j.replace(/{{id}}/gi,a).replace(/{{label}}/gi,b.label).replace(/{{title}}/gi,b.title).replace(/{{href}}/gi,(c?b.beta:void 0)||b.href);return d}var f=a("../utils/dom"),g=a("../config/evidence"),h=a("../templates/evidence/menu.html"),i=a("../templates/evidence/service.html"),j=a("../templates/evidence/links.html");b.exports=c},{"../config/evidence":3,"../templates/evidence/links.html":12,"../templates/evidence/menu.html":13,"../templates/evidence/service.html":14,"../utils/dom":25}],8:[function(a,b){function c(a){var b=d.find(a,"nice-global")[0];return b||(b=d.create(e)),b}var d=a("../utils/dom"),e=a("../templates/global/menu.html");b.exports=c},{"../templates/global/menu.html":15,"../utils/dom":25}],9:[function(a,b){function c(a,b,c){"none"!==c.profile&&(i.insertBeforeElement(i.create(l.replace("{{root}}",c.accountsUrl)),i.find(b,"menu")[0]),j.get(c.accountsUrl+n+(c.wtrealm?"?wtrealm="+c.wtrealm:""),function(b){return b?b.display_name?void d(a,b):void e(a,b):void f(a)}))}function d(a,b){var c=i.find(a,"menu-anonymous")[0];c.setAttribute("title",b.display_name),b.thumbnail&&b.thumbnail.length&&(c.innerHTML='<img src="'+b.thumbnail+'" class="profile-avatar" alt="Your profile image" />');var d=g(b.links),e=i.create(k.replace("{{menu}}",d));i.insertBeforeElement(c,anonitem),i.remove(anonitem),i.insertBeforeElement(e,a.lastChild)}function e(a,b){var c=i.find(a,"menu-anonymous")[0];b.links&&b.links["Sign in"]&&c.setAttribute("href",b.links["Sign in"])}function f(a){var b=i.find(a,"menu-profile")[0];i.remove(b)}function g(a){var b=[];for(var c in a){var d=a[c];b.push(h(c,d))}return b.join("")}function h(a,b){var c=m.replace(/{{label}}/gi,a).replace(/{{href}}/gi,b);return c}var i=a("../utils/dom"),j=a("../utils/xhr"),k=a("../templates/profile/menu.html"),l=(a("../templates/profile/service.html"),a("../templates/profile/anon.html")),m=a("../templates/profile/links.html"),n="/tophat";b.exports=c},{"../templates/profile/anon.html":16,"../templates/profile/links.html":17,"../templates/profile/menu.html":18,"../templates/profile/service.html":19,"../utils/dom":25,"../utils/xhr":26}],10:[function(a,b){function c(a,b,c){if(c.search){var e=g(window.location.search),f=i.replace("{{method}}","get").replace("{{action}}",c.search.replace(/"/g,"&quot;")).replace("{{typeaheadtype}}",c.typeaheadtype||"").replace("{{typeaheadsource}}",c.typeaheadsource||"").replace("{{q}}",(e.q||"").replace(/"/g,"&quot;")),j=h.create(f);return d(a,j),j}}function d(a,b){var c=h.find(a,"menu")[0];return c?h.insertBeforeElement(b,c):void h.appendElement(b,a.firstChild)}function e(a){return decodeURIComponent((a||"").replace(/\+/g," "))}function f(a,b,c){var d=e(b),f=e(c),g=a[d];return"undefined"==typeof g?void(a[d]=f):("object"==typeof g&&g.length||(a[d]=[g]),void a[d].push(f))}function g(a){for(var b,c=/([^&=]+)=?([^&]*)/g,d=a.substring(1),e={};b=c.exec(d);)f(e,b[1],b[2]);return e}var h=a("../utils/dom"),i=a("../templates/search/form.html");b.exports=c},{"../templates/search/form.html":20,"../utils/dom":25}],11:[function(a,b){function c(a,b){g(a);var c="";return b.internal||(c=e(i,"beta"===b.environment)),d(c,b)}function d(a,b){var c=j.replace("{{menu}}",a).replace("{{homelink}}",b.home||"http://www.nice.org.uk"),d=h.create(c);return b.internal&&(h.find(d,"logo")[0].getElementsByTagName("small")[0].innerHTML=b.internal),d}function e(a,b){var c=[];for(var d in a){var e=a[d];c.push(f(d,e,b))}return c.join("")}function f(a,b,c){var d=k.replace(/{{id}}/gi,a).replace(/{{label}}/gi,b.label).replace(/{{title}}/gi,b.title).replace(/{{href}}/gi,(c?b.beta:void 0)||b.href);return d}function g(a){var b=h.find(a,"nice-services")[0];b&&b.parentNode.removeChild(b)}var h=a("../utils/dom"),i=a("../config/services"),j=a("../templates/services/menu.html"),k=a("../templates/services/links.html");b.exports=c},{"../config/services":4,"../templates/services/links.html":21,"../templates/services/menu.html":22,"../utils/dom":25}],12:[function(a,b){b.exports='<li class="evidence-{{id}}"><a href="{{href}}" title="{{title}}">{{label}}</a></li>'},{}],13:[function(a,b){b.exports='<div class="nice-evidence" id="nice-evidence"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>'},{}],14:[function(a,b){b.exports='<li class="menu-evidence"><a href="#nice-evidence">Evidence services</a></li>'},{}],15:[function(a,b){b.exports='<div class="nice-global" id="nice-global"><div class="tophat-inner"></div></div>'},{}],16:[function(a,b){b.exports='<a href="{{root}}/signin" class="menu-anonymous">Sign in</a>'},{}],17:[function(a,b){b.exports='<li><a href="{{href}}">{{label}}</a></li>'},{}],18:[function(a,b){b.exports='<div class="nice-profile" id="nice-profile"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>'},{}],19:[function(a,b){b.exports='<a href="#nice-profile" class="menu-profile"><span class="profile-avatar"></span></a>'},{}],20:[function(a,b){b.exports='<form class="nice-search" method="{{method}}" action="{{action}}" data-track="search"><div class="controls"><input name="q" value="{{q}}" autocomplete="off" spellcheck="false" placeholder="Search..." maxlength="250" data-provide="typeahead" data-source-type="{{typeaheadtype}}" data-source="{{typeaheadsource}}"> <button type="submit"><i class="icon-search"></i> <span class="menu-label">Search</span></button></div></form>'},{}],21:[function(a,b){b.exports='<li class="menu-{{id}}"><a href="{{href}}">{{label}}</a></li>'},{}],22:[function(a,b){b.exports='<div class="nice-services"><div class="tophat-inner"><a href="#" class="menu-mobile">menu</a> <a href="{{homelink}}" class="logo">NICE <small>National Institute for<br>Health and Care Excellence</small></a><ul class="menu">{{menu}}</ul></div></div>'},{}],23:[function(a,b){var c="@font-face{font-family:\"NICE.Glyphs\";src:url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.eot?#iefix&v=1.3) format('embedded-opentype'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.woff?v=1.3) format('woff'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.ttf?v=13) format('truetype'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.svg#niceglyphregular?v=1.3) format('svg');font-weight:400;font-style:normal}.nice-tophat{min-height:60px;margin-bottom:24px;*position:relative;*z-index:2001;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:16px;font-weight:400;line-height:24px;-moz-box-shadow:0 0 6px 0 rgba(0,0,0,.2);box-shadow:0 0 6px 0 rgba(0,0,0,.2)}.nice-tophat *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.nice-tophat .tophat-inner{width:95.74468085%;max-width:1170px;margin:0 auto;*zoom:1}.nice-tophat .tophat-inner:before,.nice-tophat .tophat-inner:after{display:table;content:\"\";line-height:0}.nice-tophat .tophat-inner:after{clear:both}.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 24px}@media (max-width:979px){.nice-tophat .tophat-inner,.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 12px}}.nice-tophat a{text-decoration:none;font-weight:400}.nice-tophat a:focus,.nice-tophat a:hover,.nice-tophat a:active{text-decoration:none}.nice-tophat .menu-mobile{display:none;top:0;left:0;position:absolute;margin:8px 12px;padding:3px 6px}.nice-tophat .menu-mobile,.nice-tophat .menu-mobile:hover,.nice-tophat .menu-mobile:focus{color:#fff}.nice-tophat .menu{position:relative;left:0;display:block;float:right;margin:0;padding:0;list-style:none}.nice-tophat .menu li{list-style:none;float:left;margin:0}.nice-tophat .menu a{display:block;padding:6px 12px;color:#fff}.nice-tophat .menu a:focus,.nice-tophat .menu a:hover,.nice-tophat .menu a:active{color:#fff}@media (max-width:767px){.nice-tophat .menu{margin:0 -12px;clear:left}.nice-tophat .menu,.nice-tophat .menu li{position:relative;display:block;float:none}.nice-tophat .menu a{padding:0 12px;line-height:24px}}.nice-tophat .logo,.nice-tophat .icon-offcanvas{color:#fff;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-tophat .logo{float:left;display:block;padding:6px 24px;margin-left:-24px;font-size:0;line-height:0;border:0}.nice-tophat .logo small{display:none}.nice-tophat .logo:before{content:\"\\e01a\\e01b\";font-size:48px;line-height:48px;letter-spacing:-.6em}.nice-tophat .icon-offcanvas:before{content:\"\\e03d\"}.tophat-legacy .logo{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01a;&#xe01b;');font-size:48px;line-height:48px;letter-spacing:-.6em}.tophat-legacy .icon-offcanvas:before{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe03d;')}@media (max-width:1059px){.nice-tophat .logo:before{content:\"\\e01a\"}}@media (max-width:829px){.nice-tophat{min-height:48px;background-color:rgba(0,0,0,.075);padding-bottom:2px;margin-bottom:-2px}.nice-tophat .logo{padding:0 0 0 24px}.nice-tophat .logo:before{font-size:38px}.nice-tophat .logo small{display:none}}@media (max-width:767px){.nice-tophat .logo{text-align:center;width:auto;margin:0 84px;padding:0 24px;float:none}}.nice-tophat .nice-services{background-color:#333;font-size:17.6px}.nice-tophat .nice-services .menu{border-right:1px solid #343c41}.nice-tophat .nice-services .menu a{width:84px;padding:12px 4.5px 19px 12px;border-left:1px solid #343c41;border-bottom:1px solid #333;line-height:20px;font-size:17.6px}.nice-tophat .nice-services .menu a:hover,.nice-tophat .nice-services .menu a:focus{background-color:#234e5b}.nice-tophat .nice-services .menu .menu-standards a{width:120px}.nice-tophat .nice-services .menu .menu-evidence{position:relative}.nice-tophat .nice-services .menu .menu-evidence a:before{border:6px solid transparent;content:'';position:absolute;bottom:0;left:50%;border-bottom-color:#eff1f3;margin-left:-7px}.nice-tophat .nice-services .menu .active a,.nice-tophat .nice-services .menu .active a:hover,.nice-tophat .nice-services .menu .active a:focus{background-color:#316e80}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a{border-bottom:0;padding-bottom:20px}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a,.menu-evidence-open .nice-services .menu .menu-evidence a:hover,.menu-evidence-active .nice-services .menu .menu-evidence a:hover,.menu-evidence-open .nice-services .menu .menu-evidence a:focus,.menu-evidence-active .nice-services .menu .menu-evidence a:focus{background-color:#2a5e6e}.menu-evidence-open .nice-services .menu .menu-evidence a:before,.menu-evidence-active .nice-services .menu .menu-evidence a:before{display:none}@media (max-width:767px){.nice-tophat .nice-services .menu{display:none}.nice-tophat .nice-services .menu a{padding-bottom:12px}.nice-tophat .nice-services .menu li a,.nice-tophat .nice-services .menu .menu-standards a{border-left:0;line-height:24px;width:auto}.nice-tophat .nice-services .menu .menu-evidence a,.nice-tophat .nice-services .menu .menu-evidence a:hover,.nice-tophat .nice-services .menu .menu-evidence a:focus{padding-bottom:3px;background-color:#2a5e6e;border:0}.nice-tophat .nice-services .menu .menu-evidence a:before{display:none}.nice-tophat .menu-mobile{display:block}.menu-mobile-open .nice-services .menu{display:block}}@media (max-width:415px){.nice-tophat .nice-services .logo{padding-left:6px;margin-left:-12px}.nice-tophat .nice-services .logo:before{font-size:38px;line-height:38px}}.nice-tophat .nice-evidence{background-color:#2a5e6e;display:none}.nice-tophat .nice-evidence .menu{border-right:1px solid #2d6475}.nice-tophat .nice-evidence .menu a{padding-left:12px;padding-right:12px;border-left:1px solid #2d6475;font-size:16px}.nice-tophat .nice-evidence .menu a:hover,.nice-tophat .nice-evidence .menu a:focus{background-color:#387e92}.nice-tophat .nice-evidence .menu .active a:hover,.nice-tophat .nice-evidence .menu .active a:focus,.nice-tophat .nice-evidence .menu .active a{color:#000;background-color:#ffc100}.menu-evidence-open .nice-evidence,.menu-evidence-active .nice-evidence{display:block}@media (max-width:767px){.nice-tophat .nice-evidence{display:none}.nice-tophat .nice-evidence .menu{border:0}.nice-tophat .nice-evidence .menu li a{padding:12px 12px 12px 36px;border:0;border-top:1px solid #2d6475;line-height:24px}.nice-tophat .nice-evidence .menu li:first-child a{border-top:0}.menu-mobile-open .nice-evidence{display:block}}.nice-tophat .nice-global{background-color:#eff1f3}.nice-tophat .nice-global .menu a{color:#000;padding:19px 12px 20px;line-height:24px}.nice-tophat .nice-global .menu a:hover,.nice-tophat .nice-global .menu a:focus{color:#000;background-color:rgba(255,255,255,.4);padding-bottom:16px;border-bottom:4px solid #ffc100}.nice-tophat .nice-global .menu .active a,.nice-tophat .nice-global .menu .active a:hover,.nice-tophat .nice-global .menu .active a:focus{color:#000;background-color:rgba(255,255,255,.6);padding-bottom:16px;border-bottom:4px solid #ffc100}.nice-tophat .nice-global .tool-brand{display:block;font-size:36px;line-height:36px;margin:0 0 -24px;padding:12px 0 0}.nice-tophat .nice-global .tool-brand small{font-size:24px;color:#777}.nice-tophat .nice-global .publication-date{float:right;font-size:16px;margin-top:-4px;margin-right:12px;color:#666}@media (max-width:979px){.nice-tophat .nice-global{position:relative}.nice-tophat .nice-global .menu{display:none;visibility:hidden;speak:none}}@media (max-width:768px){.nice-tophat .nice-global{background-image:none!important}.nice-tophat .nice-global .tool-brand{margin:0;width:100%;text-align:center}}.nice-search{float:left;position:relative;width:40%;margin:12px 0}.nice-search .controls{margin-right:40px}.nice-search input{display:block;width:100%;height:36px;padding:0 12px;margin:0;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:36px;color:#333;border:1px solid #ccc;border-radius:0;vertical-align:middle;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:none}.nice-search input:focus{outline:0}.nice-search button{display:inline-block;color:#fff;background-color:#1167b7;overflow:hidden;position:absolute;height:36px;width:36px;margin:0;padding:0;top:0;right:0;border:1px solid #1167b7;font-size:0;line-height:normal}.nice-search .icon-search{font-size:24px;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-search .icon-search:before{content:\"\\e004\"}.nice-search .twitter-typeahead{width:100%}.nice-search .tt-dropdown-menu{width:100%}.tophat-legacy .icon-search{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe004;')}@media (max-width:979px){.nice-search{float:none;width:100%}.nice-partner .nice-search .controls{margin-left:110px}}.nice-tophat .nice-partner .partner-logo{float:left;display:block;margin:22px 24px 0 0}.nice-tophat .nice-partner .partner-logo:hover,.nice-tophat .nice-partner .partner-logo:focus,.nice-tophat .nice-partner .partner-logo:active{background-color:transparent;padding-bottom:0;border-bottom:none}.nice-tophat .nice-partner .partner-logo img{height:72px}.nice-tophat .nice-partner .partner-brand{display:block;font-size:24px;line-height:36px;margin:0 0 -6px;padding:12px 0 0;color:#888}.nice-tophat .nice-partner .partner-brand small{float:right;margin:-10px 10px 0 0}@media (max-width:979px){.nice-tophat .nice-partner .partner-brand{display:none;visibility:hidden;speak:none}.nice-tophat .nice-partner .partner-logo{position:absolute;top:12px;left:12px;padding:0;margin:0;z-index:2002}.nice-tophat .nice-partner .partner-logo img{height:38px}}.nice-internal{min-height:50px;width:100%}.nice-internal .logo{font-size:0;line-height:36px;*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe019;')}.nice-internal .logo,.nice-internal .logo:hover,.nice-internal .logo:focus,.nice-internal .logo:active{color:#263238}.nice-internal .logo small{font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;display:inline;font-size:32px;line-height:46px}.nice-internal .logo:before{float:none;margin-right:.5em;font-size:32px;content:\"\\e01a\";vertical-align:top}.nice-internal .nice-services{background-color:#fff}.nice-internal .nice-services .menu a{color:#263238;border-left:none;padding-top:5px;padding-bottom:5px}.nice-internal .nice-services .menu a:hover,.nice-internal .nice-services .menu a:focus,.nice-internal .nice-services .menu a:active{color:#263238;background-color:transparent}.active .nice-internal .nice-services .menu a,.active .nice-internal .nice-services .menu a:hover,.active .nice-internal .nice-services .menu a:focus,.active .nice-internal .nice-services .menu a:active{color:#263238;background-color:transparent}.nice-internal .nice-services .menu-mobile{display:none}.nice-internal .nice-global a{padding-top:9px;padding-bottom:10px}.nice-internal .nice-global a:hover,.nice-internal .nice-global a:focus{padding-bottom:8px;border-bottom-width:2px}.menu .nice-internal .nice-global a{padding-top:19px;padding-bottom:20px;line-height:24px}.menu .nice-internal .nice-global a:hover,.menu .nice-internal .nice-global a:focus{padding-bottom:16px;border-bottom-width:4px}.active .nice-internal .nice-global a,.active .nice-internal .nice-global a:hover,.active .nice-internal .nice-global a:focus{padding-bottom:8px;border-bottom-width:2px}.menu .active .nice-internal .nice-global a,.menu .active .nice-internal .nice-global a:hover,.menu .active .nice-internal .nice-global a:focus{padding-bottom:16px;border-bottom-width:4px}@media (max-width:767px){.nice-internal .logo{margin:0;padding:0}}.nice-tophat .menu-anonymous,.nice-tophat .menu-profile{float:right}.nice-tophat .menu-anonymous,.nice-tophat .menu-profile,.nice-tophat .menu-anonymous:hover,.nice-tophat .menu-profile:hover,.nice-tophat .menu-anonymous:focus,.nice-tophat .menu-profile:focus{color:#fff}.nice-tophat .menu-anonymous{margin:15px 0 0 12px;padding:6px 12px;border:1px solid #fff}.nice-tophat .menu-profile{position:relative;width:36px;height:36px;padding:9px;line-height:36px}.nice-tophat .menu-profile,.nice-tophat .menu-profile:hover,.nice-tophat .menu-profile:focus{background-color:transparent}.nice-tophat .profile-avatar{position:absolute;width:100%;height:100%;vertical-align:-35%;color:#263238;text-align:center;font-size:20px;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;line-height:inherit;*line-height:40px}.nice-tophat .profile-avatar:before{content:\"\\e01f\"}.nice-tophat .nice-profile{position:absolute;z-index:2003;width:250px;padding:6px 0;left:50%;margin-left:340px;top:50px;background-color:#2a5e6e;display:none}.nice-tophat .nice-profile .menu{border-right:1px solid #2d6475}.nice-tophat .nice-profile .menu,.nice-tophat .nice-profile .menu li{float:none;display:block;margin-left:0;border-right:0}.nice-tophat .nice-profile .menu a{padding-left:12px;padding-right:12px;border-top:1px solid #2d6475}.nice-tophat .nice-profile .menu a:hover,.nice-tophat .nice-profile .menu a:focus{background-color:#387e92}.active .nice-tophat .nice-profile .menu a,.active .nice-tophat .nice-profile .menu a:hover,.active .nice-tophat .nice-profile .menu a:focus{color:#000;background-color:#ffc100}li:first-child .nice-tophat .nice-profile .menu a{border-top:0}.tophat-legacy .profile-avatar{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01f;')}.menu-profile-open .nice-profile{display:block}.layout-fill .nice-tophat .nice-profile{left:auto;right:12px;margin-left:0}@media (max-width:767px){.nice-tophat .menu-anonymous,.nice-tophat .menu-profile{top:0;right:0;position:absolute}.nice-tophat .menu-anonymous{margin:8px 12px;padding:3px 6px;border:0}.nice-tophat .nice-profile{position:relative;left:0;top:0;width:auto;margin:0;padding:0}.nice-tophat .nice-profile .menu{border:0;margin:0 -12px}.nice-tophat .nice-profile .menu li a{padding:12px;border:0;border-top:1px solid #2d6475;line-height:24px}.nice-tophat .nice-profile .menu li:first-child a{border-top:0}.nice-tophat .profile-avatar{font-size:16px;line-height:32px;height:32px;width:32px}.nice-tophat .profile-avatar:before{height:32px;width:32px}}";a("/Users/matt/Documents/branches/NICE.Tophat/node_modules/cssify")(c),b.exports=c},{"/Users/matt/Documents/branches/NICE.Tophat/node_modules/cssify":1}],24:[function(a){function b(a,b){var c=d.find(e,a)[0];return c||(c=d.create('<div class="'+a+'"/>')),c.className=a+(b.internal?" nice-internal":"")+(b.legacy?" tophat-legacy":""),c}function c(a,b,c,f,h){if(d.appendElement(b,a),c&&d.appendElement(c,a),f&&d.appendElement(f,a),h.service){var i="menu-"+h.service,j=d.find(a,i)[0];j.className+=" active",a.className+=" "+i+"-active"}d.prependElement(g,e)}a("./tophat.css");var d=a("./utils/dom"),e=document.body,f=a("./config")(),g=b("nice-tophat",f),h=a("./services")(g,f),i=a("./evidence")(g,h,f);a("./profile")(g,h,f);{var j=a("./global")(g);a("./search")(j,h,f)}c(g,h,i,j,f),a("./events")(document,g,h,f),document.onTophatReady&&document.onTophatReady()},{"./config":2,"./events":5,"./evidence":7,"./global":8,"./profile":9,"./search":10,"./services":11,"./tophat.css":23,"./utils/dom":25}],25:[function(a,b){var c={};c.find=function(a,b){function d(a,b){return a.getElementsByClassName(b)}function e(a,b){var c,d,e,f=a,g=[];if(a.querySelectorAll)return a.querySelectorAll("."+b);if(a.evaluate)for(d=".//*[contains(concat(' ', @class, ' '), ' "+b+" ')]",c=a.evaluate(d,f,null,0,null);e=c.iterateNext();)g.push(e);else{c=a.getElementsByTagName("*"),d=new RegExp("(^|\\s)"+b+"(\\s|$)");var h=c.length;for(e=0;h>e;e++)d.test(c[e].className)&&g.push(c[e])}return g}var f=document.getElementsByClassName?d:e;return c.find=f,f(a,b)},c.create=function(a){if(!~a.indexOf("<"))return document.createElement(a);var b=document.createElement("div");return b.innerHTML=a,b.firstChild},c.remove=function(a){a.parentNode.removeChild(a)},c.prependElement=function(a,b){b.insertBefore(a,b.firstChild)},c.insertBeforeElement=function(a,b){var c=b.parentNode;c.insertBefore(a,b)},c.appendElement=function(a,b){b.appendChild(a)},b.exports=c},{}],26:[function(a,b){var c=a("./dom"),d={};d.get=function(a,b){var d=document.body,e=document.createElement("script");e.src=a+(~a.indexOf("?")?"&":"?")+Math.floor(1e10*Math.random());var f=!1;e.onload=e.onreadystatechange=function(){f||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(f=!0,b(window._na),e.onload=e.onreadystatechange=null,d&&e.parentNode&&d.removeChild(e))},c.prependElement(e,d)},b.exports=d},{"./dom":25}]},{},[24]);
//# sourceMappingURL=tophat.map