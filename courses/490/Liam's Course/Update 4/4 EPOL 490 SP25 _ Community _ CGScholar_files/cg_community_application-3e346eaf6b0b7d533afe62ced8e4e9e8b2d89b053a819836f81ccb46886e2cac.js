(function(o,c){var j="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color outlineColor".split(" "),g=/^([\-+])=\s*(\d+\.?\d*)/,f=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(p){return[p[1],p[2],p[3],p[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(p){return[2.55*p[1],2.55*p[2],2.55*p[3],p[4]]}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(p){return[parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16)]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(p){return[parseInt(p[1]+p[1],16),parseInt(p[2]+p[2],16),parseInt(p[3]+p[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(p){return[p[1],p[2]/100,p[3]/100,p[4]]}}],d=o.Color=function(q,r,p,s){return new o.Color.fn.parse(q,r,p,s)},i={rgba:{cache:"_rgba",props:{red:{idx:0,type:"byte",empty:true},green:{idx:1,type:"byte",empty:true},blue:{idx:2,type:"byte",empty:true},alpha:{idx:3,type:"percent",def:1}}},hsla:{cache:"_hsla",props:{hue:{idx:0,type:"degrees",empty:true},saturation:{idx:1,type:"percent",empty:true},lightness:{idx:2,type:"percent",empty:true}}}},n={"byte":{floor:true,min:0,max:255},percent:{min:0,max:1},degrees:{mod:360,floor:true}},l=i.rgba.props,m=d.support={},a,k=o.each;i.hsla.props.alpha=l.alpha;function h(r,t,q){var p=n[t.type]||{},s=t.empty||q;if(s&&r==null){return null}if(t.def&&r==null){return t.def}if(p.floor){r=~~r}else{r=parseFloat(r)}if(r==null||isNaN(r)){return t.def}if(p.mod){r=r%p.mod;return r<0?p.mod+r:r}return p.min>r?p.min:p.max<r?p.max:r}function e(p){var r=d(),q=r._rgba=[];p=p.toLowerCase();k(f,function(x,y){var w=y.re.exec(p),v=w&&y.parse(w),u,t=y.space||"rgba",s=i[t].cache;if(v){u=r[t](v);r[s]=u[s];q=r._rgba=u._rgba;return false}});if(q.length!==0){if(Math.max.apply(Math,q)===0){o.extend(q,a.transparent)}return r}if(p=a[p]){return p}}d.fn=d.prototype={constructor:d,parse:function(w,u,p,v){if(w===c){this._rgba=[null,null,null,null];return this}if(w instanceof o||w.nodeType){w=w instanceof o?w.css(u):o(w).css(u);u=c}var t=this,r=o.type(w),q=this._rgba=[],s;if(u!==c){w=[w,u,p,v];r="array"}if(r==="string"){return this.parse(e(w)||a._default)}if(r==="array"){k(l,function(x,y){q[y.idx]=h(w[y.idx],y)});return this}if(r==="object"){if(w instanceof d){k(i,function(x,y){if(w[y.cache]){t[y.cache]=w[y.cache].slice()}})}else{k(i,function(x,y){k(y.props,function(A,B){var z=y.cache;if(!t[z]&&y.to){if(w[A]==null||A==="alpha"){return}t[z]=y.to(t._rgba)}t[z][B.idx]=h(w[A],B,true)})})}return this}},is:function(r){var q=d(r),s=true,p=this;k(i,function(t,v){var u=q[v.cache],w;if(u){w=p[v.cache]||v.to&&v.to(p._rgba)||[];k(v.props,function(x,y){if(u[y.idx]!=null){s=(u[y.idx]==w[y.idx]);return s}})}return s});return s},_space:function(){var p=[],q=this;k(i,function(r,s){if(q[s.cache]){p.push(r)}});return p.pop()},transition:function(q,v){var r=d(q),s=r._space(),t=i[s],u=this[t.cache]||t.to(this._rgba),p=u.slice();r=r[t.cache];k(t.props,function(z,B){var y=B.idx,x=u[y],w=r[y],A=n[B.type]||{};if(w===null){return}if(x===null){p[y]=w}else{if(A.mod){if(w-x>A.mod/2){x+=A.mod}else{if(x-w>A.mod/2){x-=A.mod}}}p[B.idx]=h((w-x)*v+x,B)}});return this[s](p)},blend:function(s){if(this._rgba[3]===1){return this}var r=this._rgba.slice(),q=r.pop(),p=d(s)._rgba;return d(o.map(r,function(t,u){return(1-q)*p[u]+q*t}))},toRgbaString:function(){var q="rgba(",p=o.map(this._rgba,function(r,s){return r==null?(s>2?1:0):r});if(p[3]===1){p.pop();q="rgb("}return q+p.join(",")+")"},toHslaString:function(){var q="hsla(",p=o.map(this.hsla(),function(r,s){if(r==null){r=s>2?1:0}if(s&&s<3){r=Math.round(r*100)+"%"}return r});if(p[3]==1){p.pop();q="hsl("}return q+p.join(",")+")"},toHexString:function(p){var q=this._rgba.slice(),r=q.pop();if(p){q.push(~~(r*255))}return"#"+o.map(q,function(s,t){s=(s||0).toString(16);return s.length==1?"0"+s:s}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}};d.fn.parse.prototype=d.fn;function b(t,s,r){r=(r+1)%1;if(r*6<1){return t+(s-t)*6*r}if(r*2<1){return s}if(r*3<2){return t+(s-t)*((2/3)-r)*6}return t}i.hsla.to=function(t){if(t[0]==null||t[1]==null||t[2]==null){return[null,null,null,t[3]]}var p=t[0]/255,w=t[1]/255,x=t[2]/255,z=t[3],y=Math.max(p,w,x),u=Math.min(p,w,x),A=y-u,B=y+u,q=B*0.5,v,C;if(u===y){v=0}else{if(p===y){v=(60*(w-x)/A)+360}else{if(w===y){v=(60*(x-p)/A)+120}else{v=(60*(p-w)/A)+240}}}if(q===0||q===1){C=q}else{if(q<=0.5){C=A/B}else{C=A/(2-B)}}return[Math.round(v)%360,C,q,z==null?1:z]};i.hsla.from=function(v){if(v[0]==null||v[1]==null||v[2]==null){return[null,null,null,v[3]]}var y=v[0]/360,C=v[1],x=v[2],B=v[3],u=x<=0.5?x*(1+C):x+C-x*C,w=2*x-u,t,z,A;return[Math.round(b(w,u,y+(1/3))*255),Math.round(b(w,u,y)*255),Math.round(b(w,u,y-(1/3))*255),B]};k(i,function(q,s){var r=s.props,p=s.cache,u=s.to,t=s.from;d.fn[q]=function(z){if(u&&!this[p]){this[p]=u(this._rgba)}if(z===c){return this[p].slice()}var y=o.type(z),v=(y==="array"||y==="object")?z:arguments,x=this[p].slice(),w;k(r,function(A,C){var B=v[y==="object"?A:C.idx];if(B==null){B=x[C.idx]}x[C.idx]=h(B,C)});if(t){w=d(t(x));w[p]=x;return w}else{return d(x)}};k(r,function(v,w){if(d.fn[v]){return}d.fn[v]=function(A){var C=o.type(A),z=(v==="alpha"?(this._hsla?"hsla":"rgba"):q),y=this[z](),B=y[w.idx],x;if(C==="undefined"){return B}if(C==="function"){A=A.call(this,B);C=o.type(A)}if(A==null&&w.empty){return this}if(C==="string"){x=g.exec(A);if(x){A=B+parseFloat(x[2])*(x[1]==="+"?1:-1)}}y[w.idx]=A;return this[z](y)}})});k(j,function(p,q){o.cssHooks[q]={set:function(u,v){var s;if(o.type(v)!=="string"||(s=e(v))){v=d(s||v);if(!m.rgba&&v._rgba[3]!==1){var r,t=q==="backgroundColor"?u.parentNode:u;do{r=o.curCSS(t,"backgroundColor")}while((r===""||r==="transparent")&&(t=t.parentNode)&&t.style);v=v.blend(r&&r!=="transparent"?r:"_default")}v=v.toRgbaString()}u.style[q]=v}};o.fx.step[q]=function(r){if(!r.colorInit){r.start=d(r.elem,q);r.end=d(r.end);r.colorInit=true}o.cssHooks[q].set(r.elem,r.start.transition(r.end,r.pos))}});o(function(){var q=document.createElement("div"),p=q.style;p.cssText="background-color:rgba(1,1,1,.5)";m.rgba=p.backgroundColor.indexOf("rgba")>-1});a=o.Color.names={aqua:"#00ffff",azure:"#f0ffff",beige:"#f5f5dc",black:"#000000",blue:"#0000ff",brown:"#a52a2a",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkviolet:"#9400d3",fuchsia:"#ff00ff",gold:"#ffd700",green:"#008000",indigo:"#4b0082",khaki:"#f0e68c",lightblue:"#add8e6",lightcyan:"#e0ffff",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightyellow:"#ffffe0",lime:"#00ff00",magenta:"#ff00ff",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#ffa500",pink:"#ffc0cb",purple:"#800080",violet:"#800080",red:"#ff0000",silver:"#c0c0c0",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}})(jQuery);
/*!
 * jQuery UI 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */

(function(c,j){function k(a,b){var d=a.nodeName.toLowerCase();if("area"===d){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&l(a)}return(/input|select|textarea|button|object/.test(d)?!a.disabled:"a"==d?a.href||b:b)&&l(a)}function l(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.14",
keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();
b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,
"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",
function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,m,n){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(m)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(n)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,
outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){return k(a,!isNaN(c.attr(a,"tabindex")))},tabbable:function(a){var b=c.attr(a,"tabindex"),d=isNaN(b);
return(d||b>=0)&&k(a,!d)}});c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=
0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b){var d=false;b(document).mousedown(function(){d=false});b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+
this.widgetName)},_mouseDown:function(a){if(!d){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,f=a.which==1,g=typeof this.options.cancel=="string"?b(a.target).closest(this.options.cancel).length:false;if(!f||g||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==
false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(e){return c._mouseMove(e)};this._mouseUpDelegate=function(e){return c._mouseUp(e)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return d=true}},_mouseMove:function(a){if(b.browser.msie&&
!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=
false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*
 * jQuery UI Position 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,
left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=
k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=
m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=
d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=
a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),
g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);
;/*
 * jQuery UI Sortable 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.sortable",d.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){var a=this.options;this.containerCache={};this.element.addClass("ui-sortable");
this.refresh();this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(a,b){if(a===
"disabled"){this.options[a]=b;this.widget()[b?"addClass":"removeClass"]("ui-sortable-disabled")}else d.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(a,b){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(a);var c=null,e=this;d(a.target).parents().each(function(){if(d.data(this,"sortable-item")==e){c=d(this);return false}});if(d.data(a.target,"sortable-item")==e)c=d(a.target);if(!c)return false;if(this.options.handle&&
!b){var f=false;d(this.options.handle,c).find("*").andSelf().each(function(){if(this==a.target)f=true});if(!f)return false}this.currentItem=c;this._removeCurrentsFromItems();return true},_mouseStart:function(a,b,c){b=this.options;var e=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,
left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();b.containment&&this._setContainment();if(b.cursor){if(d("body").css("cursor"))this._storedCursor=d("body").css("cursor");d("body").css("cursor",b.cursor)}if(b.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",b.opacity)}if(b.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",b.zIndex)}if(this.scrollParent[0]!=
document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",a,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!c)for(c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("activate",a,e._uiHash(this));if(d.ui.ddmanager)d.ui.ddmanager.current=this;d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(a);
return true},_mouseDrag:function(a){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var b=this.options,c=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+b.scrollSpeed;else if(a.pageY-this.overflowOffset.top<
b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed}else{if(a.pageY-d(document).scrollTop()<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()-
b.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()+b.scrollSpeed);if(a.pageX-d(document).scrollLeft()<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()-b.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()+b.scrollSpeed)}c!==false&&d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,
a)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(b=this.items.length-1;b>=0;b--){c=this.items[b];var e=c.item[0],f=this._intersectsWithPointer(c);if(f)if(e!=this.currentItem[0]&&this.placeholder[f==1?"next":"prev"]()[0]!=e&&!d.ui.contains(this.placeholder[0],e)&&(this.options.type=="semi-dynamic"?!d.ui.contains(this.element[0],
e):true)){this.direction=f==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(c))this._rearrange(a,c);else break;this._trigger("change",a,this._uiHash());break}}this._contactContainers(a);d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(a,b){if(a){d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);if(this.options.revert){var c=this;b=c.placeholder.offset();
c.reverting=true;d(this.helper).animate({left:b.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:b.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(a)})}else this._clear(a,b);return false}},cancel:function(){var a=this;if(this.dragging){this._mouseUp({target:null});this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):
this.currentItem.show();for(var b=this.containers.length-1;b>=0;b--){this.containers[b]._trigger("deactivate",null,a._uiHash(this));if(this.containers[b].containerCache.over){this.containers[b]._trigger("out",null,a._uiHash(this));this.containers[b].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();d.extend(this,{helper:null,
dragging:false,reverting:false,_noFinalSort:null});this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):d(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};d(b).each(function(){var e=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);if(e)c.push((a.key||e[1]+"[]")+"="+(a.key&&a.expression?e[1]:e[2]))});!c.length&&a.key&&c.push(a.key+"=");return c.join("&")},
toArray:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};b.each(function(){c.push(d(a.item||this).attr(a.attribute||"id")||"")});return c},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,e=this.positionAbs.top,f=e+this.helperProportions.height,g=a.left,h=g+a.width,i=a.top,k=i+a.height,j=this.offset.click.top,l=this.offset.click.left;j=e+j>i&&e+j<k&&b+l>g&&b+l<h;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||
this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?j:g<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<h&&i<e+this.helperProportions.height/2&&f-this.helperProportions.height/2<k},_intersectsWithPointer:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width);b=b&&a;a=this._getDragVerticalDirection();
var c=this._getDragHorizontalDirection();if(!b)return false;return this.floating?c&&c=="right"||a=="down"?2:1:a&&(a=="down"?2:1)},_intersectsWithSides:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width);var c=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();return this.floating&&e?e=="right"&&a||e=="left"&&!a:c&&(c=="down"&&b||c=="up"&&!b)},
_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(a){var b=[],c=[],e=this._connectWith();
if(e&&a)for(a=e.length-1;a>=0;a--)for(var f=d(e[a]),g=f.length-1;g>=0;g--){var h=d.data(f[g],"sortable");if(h&&h!=this&&!h.options.disabled)c.push([d.isFunction(h.options.items)?h.options.items.call(h.element):d(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}c.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
this]);for(a=c.length-1;a>=0;a--)c[a][0].each(function(){b.push(this)});return d(b)},_removeCurrentsFromItems:function(){for(var a=this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(a){this.items=[];this.containers=[this];var b=this.items,c=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{item:this.currentItem}):d(this.options.items,this.element),
this]],e=this._connectWith();if(e)for(var f=e.length-1;f>=0;f--)for(var g=d(e[f]),h=g.length-1;h>=0;h--){var i=d.data(g[h],"sortable");if(i&&i!=this&&!i.options.disabled){c.push([d.isFunction(i.options.items)?i.options.items.call(i.element[0],a,{item:this.currentItem}):d(i.options.items,i.element),i]);this.containers.push(i)}}for(f=c.length-1;f>=0;f--){a=c[f][1];e=c[f][0];h=0;for(g=e.length;h<g;h++){i=d(e[h]);i.data("sortable-item",a);b.push({item:i,instance:a,width:0,height:0,left:0,top:0})}}},refreshPositions:function(a){if(this.offsetParent&&
this.helper)this.offset.parent=this._getParentOffset();for(var b=this.items.length-1;b>=0;b--){var c=this.items[b];if(!(c.instance!=this.currentContainer&&this.currentContainer&&c.item[0]!=this.currentItem[0])){var e=this.options.toleranceElement?d(this.options.toleranceElement,c.item):c.item;if(!a){c.width=e.outerWidth();c.height=e.outerHeight()}e=e.offset();c.left=e.left;c.top=e.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(b=
this.containers.length-1;b>=0;b--){e=this.containers[b].element.offset();this.containers[b].containerCache.left=e.left;this.containers[b].containerCache.top=e.top;this.containers[b].containerCache.width=this.containers[b].element.outerWidth();this.containers[b].containerCache.height=this.containers[b].element.outerHeight()}return this},_createPlaceholder:function(a){var b=a||this,c=b.options;if(!c.placeholder||c.placeholder.constructor==String){var e=c.placeholder;c.placeholder={element:function(){var f=
d(document.createElement(b.currentItem[0].nodeName)).addClass(e||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!e)f.style.visibility="hidden";return f},update:function(f,g){if(!(e&&!c.forcePlaceholderSize)){g.height()||g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10));g.width()||g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||
0,10))}}}}b.placeholder=d(c.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);c.placeholder.update(b,b.placeholder)},_contactContainers:function(a){for(var b=null,c=null,e=this.containers.length-1;e>=0;e--)if(!d.ui.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(!(b&&d.ui.contains(this.containers[e].element[0],b.element[0]))){b=this.containers[e];c=e}}else if(this.containers[e].containerCache.over){this.containers[e]._trigger("out",
a,this._uiHash(this));this.containers[e].containerCache.over=0}if(b)if(this.containers.length===1){this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}else if(this.currentContainer!=this.containers[c]){b=1E4;e=null;for(var f=this.positionAbs[this.containers[c].floating?"left":"top"],g=this.items.length-1;g>=0;g--)if(d.ui.contains(this.containers[c].element[0],this.items[g].item[0])){var h=this.items[g][this.containers[c].floating?"left":"top"];if(Math.abs(h-
f)<b){b=Math.abs(h-f);e=this.items[g]}}if(e||this.options.dropOnEmpty){this.currentContainer=this.containers[c];e?this._rearrange(a,e,null,true):this._rearrange(a,null,this.containers[c].element,true);this._trigger("change",a,this._uiHash());this.containers[c]._trigger("change",a,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}}},_createHelper:function(a){var b=
this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a,this.currentItem])):b.helper=="clone"?this.currentItem.clone():this.currentItem;a.parents("body").length||d(b.appendTo!="parent"?b.appendTo:this.currentItem[0].parentNode)[0].appendChild(a[0]);if(a[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(a[0].style.width==
""||b.forceHelperSize)a.width(this.currentItem.width());if(a[0].style.height==""||b.forceHelperSize)a.height(this.currentItem.height());return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=
this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a=
{top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),
10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?
document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)){var b=d(a.containment)[0];a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),
10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(a,b){if(!b)b=
this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&
this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();
var f=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])f=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])f=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-
this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;f=this.originalPageX+Math.round((f-this.originalPageX)/b.grid[0])*b.grid[0];f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-b.grid[0]:f+b.grid[0]:f}}return{top:g-
this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())}},_rearrange:function(a,b,c,e){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],
this.direction=="down"?b.item[0]:b.item[0].nextSibling);this.counter=this.counter?++this.counter:1;var f=this,g=this.counter;window.setTimeout(function(){g==f.counter&&f.refreshPositions(!e)},0)},_clear:function(a,b){this.reverting=false;var c=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var e in this._storedCSS)if(this._storedCSS[e]=="auto"||this._storedCSS[e]=="static")this._storedCSS[e]=
"";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!b&&c.push(function(f){this._trigger("receive",f,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!b)c.push(function(f){this._trigger("update",f,this._uiHash())});if(!d.ui.contains(this.element[0],this.currentItem[0])){b||c.push(function(f){this._trigger("remove",
f,this._uiHash())});for(e=this.containers.length-1;e>=0;e--)if(d.ui.contains(this.containers[e].element[0],this.currentItem[0])&&!b){c.push(function(f){return function(g){f._trigger("receive",g,this._uiHash(this))}}.call(this,this.containers[e]));c.push(function(f){return function(g){f._trigger("update",g,this._uiHash(this))}}.call(this,this.containers[e]))}}for(e=this.containers.length-1;e>=0;e--){b||c.push(function(f){return function(g){f._trigger("deactivate",g,this._uiHash(this))}}.call(this,
this.containers[e]));if(this.containers[e].containerCache.over){c.push(function(f){return function(g){f._trigger("out",g,this._uiHash(this))}}.call(this,this.containers[e]));this.containers[e].containerCache.over=0}}this._storedCursor&&d("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!b){this._trigger("beforeStop",
a,this._uiHash());for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}return false}b||this._trigger("beforeStop",a,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!b){for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){d.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},
_uiHash:function(a){var b=a||this;return{helper:b.helper,placeholder:b.placeholder||d([]),position:b.position,originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:a?a.element:null}}});d.extend(d.ui.sortable,{version:"1.8.14"})})(jQuery);
;/*
 * jQuery UI Slider 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var b=this,a=this.options,c=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f=a.values&&a.values.length||1,e=[];this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+
this.orientation+" ui-widget ui-widget-content ui-corner-all"+(a.disabled?" ui-slider-disabled ui-disabled":""));this.range=d([]);if(a.range){if(a.range===true){if(!a.values)a.values=[this._valueMin(),this._valueMin()];if(a.values.length&&a.values.length!==2)a.values=[a.values[0],a.values[0]]}this.range=d("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(a.range==="min"||a.range==="max"?" ui-slider-range-"+a.range:""))}for(var j=c.length;j<f;j+=1)e.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
this.handles=c.add(d(e.join("")).appendTo(b.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(g){g.preventDefault()}).hover(function(){a.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(a.disabled)d(this).blur();else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(g){d(this).data("index.ui-slider-handle",
g)});this.handles.keydown(function(g){var k=true,l=d(this).data("index.ui-slider-handle"),i,h,m;if(!b.options.disabled){switch(g.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:k=false;if(!b._keySliding){b._keySliding=true;d(this).addClass("ui-state-active");i=b._start(g,l);if(i===false)return}break}m=b.options.step;i=b.options.values&&b.options.values.length?
(h=b.values(l)):(h=b.value());switch(g.keyCode){case d.ui.keyCode.HOME:h=b._valueMin();break;case d.ui.keyCode.END:h=b._valueMax();break;case d.ui.keyCode.PAGE_UP:h=b._trimAlignValue(i+(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(i-(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(i===b._valueMax())return;h=b._trimAlignValue(i+m);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(i===b._valueMin())return;h=b._trimAlignValue(i-
m);break}b._slide(g,l,h);return k}}).keyup(function(g){var k=d(this).data("index.ui-slider-handle");if(b._keySliding){b._keySliding=false;b._stop(g,k);b._change(g,k);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy();
return this},_mouseCapture:function(b){var a=this.options,c,f,e,j,g;if(a.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:b.pageX,y:b.pageY});f=this._valueMax()-this._valueMin()+1;j=this;this.handles.each(function(k){var l=Math.abs(c-j.values(k));if(f>l){f=l;e=d(this);g=k}});if(a.range===true&&this.values(1)===a.min){g+=1;e=d(this.handles[g])}if(this._start(b,g)===false)return false;
this._mouseSliding=true;j._handleIndex=g;e.addClass("ui-state-active").focus();a=e.offset();this._clickOffset=!d(b.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:b.pageX-a.left-e.width()/2,top:b.pageY-a.top-e.height()/2-(parseInt(e.css("borderTopWidth"),10)||0)-(parseInt(e.css("borderBottomWidth"),10)||0)+(parseInt(e.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(b,g,c);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(b){var a=
this._normValueFromMouse({x:b.pageX,y:b.pageY});this._slide(b,this._handleIndex,a);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(b){var a;if(this.orientation==="horizontal"){a=
this.elementSize.width;b=b.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{a=this.elementSize.height;b=b.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}a=b/a;if(a>1)a=1;if(a<0)a=0;if(this.orientation==="vertical")a=1-a;b=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+a*b)},_start:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);
c.values=this.values()}return this._trigger("start",b,c)},_slide:function(b,a,c){var f;if(this.options.values&&this.options.values.length){f=this.values(a?0:1);if(this.options.values.length===2&&this.options.range===true&&(a===0&&c>f||a===1&&c<f))c=f;if(c!==this.values(a)){f=this.values();f[a]=c;b=this._trigger("slide",b,{handle:this.handles[a],value:c,values:f});this.values(a?0:1);b!==false&&this.values(a,c,true)}}else if(c!==this.value()){b=this._trigger("slide",b,{handle:this.handles[a],value:c});
b!==false&&this.value(c)}},_stop:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("stop",b,c)},_change:function(b,a){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("change",b,c)}},value:function(b){if(arguments.length){this.options.value=
this._trimAlignValue(b);this._refreshValue();this._change(null,0)}else return this._value()},values:function(b,a){var c,f,e;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(a);this._refreshValue();this._change(null,b)}else if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;f=arguments[0];for(e=0;e<c.length;e+=1){c[e]=this._trimAlignValue(f[e]);this._change(null,e)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(b):
this.value();else return this._values()},_setOption:function(b,a){var c,f=0;if(d.isArray(this.options.values))f=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(b){case "disabled":if(a){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(c=0;c<f;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var b=this.options.value;return b=this._trimAlignValue(b)},_values:function(b){var a,c;if(arguments.length){a=this.options.values[b];
return a=this._trimAlignValue(a)}else{a=this.options.values.slice();for(c=0;c<a.length;c+=1)a[c]=this._trimAlignValue(a[c]);return a}},_trimAlignValue:function(b){if(b<=this._valueMin())return this._valueMin();if(b>=this._valueMax())return this._valueMax();var a=this.options.step>0?this.options.step:1,c=(b-this._valueMin())%a;alignValue=b-c;if(Math.abs(c)*2>=a)alignValue+=c>0?a:-a;return parseFloat(alignValue.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},
_refreshValue:function(){var b=this.options.range,a=this.options,c=this,f=!this._animateOff?a.animate:false,e,j={},g,k,l,i;if(this.options.values&&this.options.values.length)this.handles.each(function(h){e=(c.values(h)-c._valueMin())/(c._valueMax()-c._valueMin())*100;j[c.orientation==="horizontal"?"left":"bottom"]=e+"%";d(this).stop(1,1)[f?"animate":"css"](j,a.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(h===0)c.range.stop(1,1)[f?"animate":"css"]({left:e+"%"},a.animate);
if(h===1)c.range[f?"animate":"css"]({width:e-g+"%"},{queue:false,duration:a.animate})}else{if(h===0)c.range.stop(1,1)[f?"animate":"css"]({bottom:e+"%"},a.animate);if(h===1)c.range[f?"animate":"css"]({height:e-g+"%"},{queue:false,duration:a.animate})}g=e});else{k=this.value();l=this._valueMin();i=this._valueMax();e=i!==l?(k-l)/(i-l)*100:0;j[c.orientation==="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[f?"animate":"css"](j,a.animate);if(b==="min"&&this.orientation==="horizontal")this.range.stop(1,
1)[f?"animate":"css"]({width:e+"%"},a.animate);if(b==="max"&&this.orientation==="horizontal")this.range[f?"animate":"css"]({width:100-e+"%"},{queue:false,duration:a.animate});if(b==="min"&&this.orientation==="vertical")this.range.stop(1,1)[f?"animate":"css"]({height:e+"%"},a.animate);if(b==="max"&&this.orientation==="vertical")this.range[f?"animate":"css"]({height:100-e+"%"},{queue:false,duration:a.animate})}}});d.extend(d.ui.slider,{version:"1.8.14"})})(jQuery);
;/*
 * jQuery UI Datepicker 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function(d,C){function M(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass=
"ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",
minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};d.extend(this._defaults,this.regional[""]);this.dpDiv=N(d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function N(a){return a.bind("mouseout",function(b){b=
d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");b.length&&b.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(b){b=d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");if(!(d.datepicker._isDisabledDatepicker(J.inline?a.parent()[0]:J.input[0])||!b.length)){b.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");b.addClass("ui-state-hover");
b.hasClass("ui-datepicker-prev")&&b.addClass("ui-datepicker-prev-hover");b.hasClass("ui-datepicker-next")&&b.addClass("ui-datepicker-next-hover")}})}function H(a,b){d.extend(a,b);for(var c in b)if(b[c]==null||b[c]==C)a[c]=b[c];return a}d.extend(d.ui,{datepicker:{version:"1.8.14"}});var A=(new Date).getTime(),J;d.extend(M.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){H(this._defaults,
a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=f}}}e=a.nodeName.toLowerCase();f=e=="div"||e=="span";if(!a.id){this.uuid+=1;a.id="dp"+this.uuid}var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{});if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,
selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:N(d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(a,b){var c=d(a);b.append=d([]);b.trigger=d([]);if(!c.hasClass(this.markerClassName)){this._attachments(c,b);c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=
h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});this._autoSize(b);d.data(a,"datepicker",b)}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&b.append.remove();if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");a[e?"before":"after"](b.append)}a.unbind("focus",this._showDatepicker);b.trigger&&b.trigger.remove();c=this._get(b,"showOn");if(c=="focus"||c=="both")a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=
this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==""?c:d("<img/>").attr({src:f,alt:c,title:c})));a[e?"before":"after"](b.trigger);b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return false})}},_autoSize:function(a){if(this._get(a,
"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){h=f[g].length;i=g}return i};b.setMonth(e(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",
function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});d.data(a,"datepicker",b);this._setDate(b,this._getDefaultDate(b),true);this._updateDatepicker(b);this._updateAlternate(b);b.dpDiv.show()}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;if(!a){this.uuid+=1;this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);d("body").append(this._dialogInput);
a=this._dialogInst=this._newInst(this._dialogInput,false);a.settings={};d.data(this._dialogInput[0],"datepicker",a)}H(a.settings,e||{});b=b&&b.constructor==Date?this._formatDate(a,b):b;this._dialogInput.val(b);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",
this._pos[0]+20+"px").css("top",this._pos[1]+"px");a.settings.onSelect=c;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);d.blockUI&&d.blockUI(this.dpDiv);d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker");if(e=="input"){c.append.remove();c.trigger.remove();b.removeClass(this.markerClassName).unbind("focus",
this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)}else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=false;c.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span"){b=
b.children("."+this._inlineClass);b.children().removeClass("ui-state-disabled");b.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f})}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=true;c.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",
cursor:"default"})}else if(e=="div"||e=="span"){b=b.children("."+this._inlineClass);b.children().addClass("ui-state-disabled");b.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f});this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return false;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},
_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},e.settings):this._get(e,b):null;var f=b||{};if(typeof b=="string"){f={};f[b]=c}if(e){this._curInst==e&&this._hideDatepicker();var h=this._getDateDatepicker(a,true),i=this._getMinMaxDate(e,"min"),g=this._getMinMaxDate(e,
"max");H(e.settings,f);if(i!==null&&f.dateFormat!==C&&f.minDate===C)e.settings.minDate=this._formatDate(e,i);if(g!==null&&f.dateFormat!==C&&f.maxDate===C)e.settings.maxDate=this._formatDate(e,g);this._attachments(d(a),e);this._autoSize(e);this._setDate(e,h);this._updateAlternate(e);this._updateDatepicker(e)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,
b);this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=true;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker();c=false;break;case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv);
c[0]?d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();return false;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);
c=a.ctrlKey||a.metaKey;break;case 36:if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);c=a.ctrlKey||a.metaKey;break;case 37:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");c=a.ctrlKey||a.metaKey;break;case 39:if(a.ctrlKey||
a.metaKey)d.datepicker._adjustDate(a.target,e?-1:+1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,+7,"D");c=a.ctrlKey||a.metaKey;break;default:c=false}else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;if(c){a.preventDefault();a.stopPropagation()}},_doKeyPress:function(a){var b=
d.datepicker._getInst(a.target);if(d.datepicker._get(b,"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));var c=String.fromCharCode(a.charCode==C?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);if(a.input.val()!=a.lastVal)try{if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){d.datepicker._setDateFromField(a);
d.datepicker._updateAlternate(a);d.datepicker._updateDatepicker(a)}}catch(b){d.datepicker.log(b)}return true},_showDatepicker:function(a){a=a.target||a;if(a.nodeName.toLowerCase()!="input")a=d("input",a.parentNode)[0];if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){var b=d.datepicker._getInst(a);if(d.datepicker._curInst&&d.datepicker._curInst!=b){d.datepicker._datepickerShowing&&d.datepicker._triggerOnClose(d.datepicker._curInst);d.datepicker._curInst.dpDiv.stop(true,true)}var c=
d.datepicker._get(b,"beforeShow");H(b.settings,c?c.apply(a,[a,b]):{});b.lastVal=null;d.datepicker._lastInput=a;d.datepicker._setDateFromField(b);if(d.datepicker._inDialog)a.value="";if(!d.datepicker._pos){d.datepicker._pos=d.datepicker._findPos(a);d.datepicker._pos[1]+=a.offsetHeight}var e=false;d(a).parents().each(function(){e|=d(this).css("position")=="fixed";return!e});if(e&&d.browser.opera){d.datepicker._pos[0]-=document.documentElement.scrollLeft;d.datepicker._pos[1]-=document.documentElement.scrollTop}c=
{left:d.datepicker._pos[0],top:d.datepicker._pos[1]};d.datepicker._pos=null;b.dpDiv.empty();b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});d.datepicker._updateDatepicker(b);c=d.datepicker._checkOffset(b,c,e);b.dpDiv.css({position:d.datepicker._inDialog&&d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});if(!b.inline){c=d.datepicker._get(b,"showAnim");var f=d.datepicker._get(b,"duration"),h=function(){var i=b.dpDiv.find("iframe.ui-datepicker-cover");
if(i.length){var g=d.datepicker._getBorders(b.dpDiv);i.css({left:-g[0],top:-g[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex(d(a).zIndex()+1);d.datepicker._datepickerShowing=true;d.effects&&d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,h):b.dpDiv[c||"show"](c?f:null,h);if(!c||!f)h();b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();d.datepicker._curInst=b}}},_updateDatepicker:function(a){this.maxRows=4;var b=d.datepicker._getBorders(a.dpDiv);
J=a;a.dpDiv.empty().append(this._generateHTML(a));var c=a.dpDiv.find("iframe.ui-datepicker-cover");c.length&&c.css({left:-b[0],top:-b[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()});a.dpDiv.find("."+this._dayOverClass+" a").mouseover();b=this._getNumberOfMonths(a);c=b[1];a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");c>1&&a.dpDiv.addClass("ui-datepicker-multi-"+c).css("width",17*c+"em");a.dpDiv[(b[0]!=1||b[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var e=a.yearshtml;setTimeout(function(){e===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);e=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(c){return{thin:1,medium:2,thick:3}[c]||
c};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),j=document.documentElement.clientHeight+d(document).scrollTop();b.left-=this._get(a,"isRTL")?e-h:0;b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;b.top-=c&&b.top==a.input.offset().top+
i?d(document).scrollTop():0;b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-g):0);b.top-=Math.min(b.top,b.top+f>j&&j>f?Math.abs(f+i):0);return b},_findPos:function(a){for(var b=this._get(this._getInst(a),"isRTL");a&&(a.type=="hidden"||a.nodeType!=1||d.expr.filters.hidden(a));)a=a[b?"previousSibling":"nextSibling"];a=d(a).offset();return[a.left,a.top]},_triggerOnClose:function(a){var b=this._get(a,"onClose");if(b)b.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a])},_hideDatepicker:function(a){var b=
this._curInst;if(!(!b||a&&b!=d.data(a,"datepicker")))if(this._datepickerShowing){a=this._get(b,"showAnim");var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b);this._curInst=null};d.effects&&d.effects[a]?b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?"fadeOut":"hide"](a?c:null,e);a||e();d.datepicker._triggerOnClose(b);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",
left:"0",top:"-100px"});if(d.blockUI){d.unblockUI();d("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(d.datepicker._curInst){a=d(a.target);a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&
d.blockUI)&&d.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){a=d(a);var e=this._getInst(a[0]);if(!this._isDisabledDatepicker(a[0])){this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c);this._updateDatepicker(e)}},_gotoToday:function(a){a=d(a);var b=this._getInst(a[0]);if(this._get(b,"gotoCurrent")&&b.currentDay){b.selectedDay=b.currentDay;b.drawMonth=b.selectedMonth=b.currentMonth;b.drawYear=b.selectedYear=b.currentYear}else{var c=new Date;b.selectedDay=c.getDate();b.drawMonth=
b.selectedMonth=c.getMonth();b.drawYear=b.selectedYear=c.getFullYear()}this._notifyChange(b);this._adjustDate(a)},_selectMonthYear:function(a,b,c){a=d(a);var e=this._getInst(a[0]);e._selectingMonthYear=false;e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);this._notifyChange(e);this._adjustDate(a)},_clickMonthYear:function(a){var b=this._getInst(d(a)[0]);b.input&&b._selectingMonthYear&&setTimeout(function(){b.input.focus()},0);b._selectingMonthYear=
!b._selectingMonthYear},_selectDay:function(a,b,c,e){var f=d(a);if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);f.selectedDay=f.currentDay=d("a",e).html();f.selectedMonth=f.currentMonth=b;f.selectedYear=f.currentYear=c;this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){a=d(a);this._getInst(a[0]);this._selectDate(a,"")},_selectDate:function(a,b){a=this._getInst(d(a)[0]);b=b!=null?b:this._formatDate(a);
a.input&&a.input.val(b);this._updateAlternate(a);var c=this._get(a,"onSelect");if(c)c.apply(a.input?a.input[0]:null,[b,a]);else a.input&&a.input.trigger("change");if(a.inline)this._updateDatepicker(a);else{this._hideDatepicker();this._lastInput=a.input[0];typeof a.input[0]!="object"&&a.input.focus();this._lastInput=null}},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));
d(b).each(function(){d(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime());a.setDate(a.getDate()+4-(a.getDay()||7));var b=a.getTime();a.setMonth(0);a.setDate(1);return Math.floor(Math.round((b-a)/864E5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;e=typeof e!="string"?e:(new Date).getFullYear()%
100+parseInt(e,10);for(var f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,j=c=-1,l=-1,u=-1,k=false,o=function(p){(p=B+1<a.length&&a.charAt(B+1)==p)&&B++;return p},m=function(p){var D=o(p);p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"&&D?4:p=="o"?3:2)+"}");p=b.substring(q).match(p);if(!p)throw"Missing number at position "+q;q+=
p[0].length;return parseInt(p[0],10)},n=function(p,D,K){p=d.map(o(p)?K:D,function(w,x){return[[x,w]]}).sort(function(w,x){return-(w[1].length-x[1].length)});var E=-1;d.each(p,function(w,x){w=x[1];if(b.substr(q,w.length).toLowerCase()==w.toLowerCase()){E=x[0];q+=w.length;return false}});if(E!=-1)return E+1;else throw"Unknown name at position "+q;},s=function(){if(b.charAt(q)!=a.charAt(B))throw"Unexpected literal at position "+q;q++},q=0,B=0;B<a.length;B++)if(k)if(a.charAt(B)=="'"&&!o("'"))k=false;
else s();else switch(a.charAt(B)){case "d":l=m("d");break;case "D":n("D",f,h);break;case "o":u=m("o");break;case "m":j=m("m");break;case "M":j=n("M",i,g);break;case "y":c=m("y");break;case "@":var v=new Date(m("@"));c=v.getFullYear();j=v.getMonth()+1;l=v.getDate();break;case "!":v=new Date((m("!")-this._ticksTo1970)/1E4);c=v.getFullYear();j=v.getMonth()+1;l=v.getDate();break;case "'":if(o("'"))s();else k=true;break;default:s()}if(q<b.length)throw"Extra/unparsed characters found in date: "+b.substring(q);
if(c==-1)c=(new Date).getFullYear();else if(c<100)c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100);if(u>-1){j=1;l=u;do{e=this._getDaysInMonth(c,j-1);if(l<=e)break;j++;l-=e}while(1)}v=this._daylightSavingAdjust(new Date(c,j-1,l));if(v.getFullYear()!=c||v.getMonth()+1!=j||v.getDate()!=l)throw"Invalid date";return v},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",
TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(a,b,c){if(!b)return"";var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var i=function(o){(o=k+1<a.length&&a.charAt(k+1)==o)&&k++;return o},g=function(o,m,n){m=""+m;if(i(o))for(;m.length<
n;)m="0"+m;return m},j=function(o,m,n,s){return i(o)?s[m]:n[m]},l="",u=false;if(b)for(var k=0;k<a.length;k++)if(u)if(a.charAt(k)=="'"&&!i("'"))u=false;else l+=a.charAt(k);else switch(a.charAt(k)){case "d":l+=g("d",b.getDate(),2);break;case "D":l+=j("D",b.getDay(),e,f);break;case "o":l+=g("o",Math.round(((new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864E5),3);break;case "m":l+=g("m",b.getMonth()+1,2);break;case "M":l+=j("M",b.getMonth(),h,
c);break;case "y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case "@":l+=b.getTime();break;case "!":l+=b.getTime()*1E4+this._ticksTo1970;break;case "'":if(i("'"))l+="'";else u=true;break;default:l+=a.charAt(k)}return l},_possibleChars:function(a){for(var b="",c=false,e=function(h){(h=f+1<a.length&&a.charAt(f+1)==h)&&f++;return h},f=0;f<a.length;f++)if(c)if(a.charAt(f)=="'"&&!e("'"))c=false;else b+=a.charAt(f);else switch(a.charAt(f)){case "d":case "m":case "y":case "@":b+=
"0123456789";break;case "D":case "M":return null;case "'":if(e("'"))b+="'";else c=true;break;default:b+=a.charAt(f)}return b},_get:function(a,b){return a.settings[b]!==C?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),e=a.lastVal=a.input?a.input.val():null,f,h;f=h=this._getDefaultDate(a);var i=this._getFormatConfig(a);try{f=this.parseDate(c,e,i)||h}catch(g){this.log(g);e=b?"":e}a.selectedDay=f.getDate();a.drawMonth=a.selectedMonth=
f.getMonth();a.drawYear=a.selectedYear=f.getFullYear();a.currentDay=e?f.getDate():0;a.currentMonth=e?f.getMonth():0;a.currentYear=e?f.getFullYear():0;this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var e=function(h){var i=new Date;i.setDate(i.getDate()+h);return i},f=function(h){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))}catch(i){}var g=
(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,j=g.getFullYear(),l=g.getMonth();g=g.getDate();for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,k=u.exec(h);k;){switch(k[2]||"d"){case "d":case "D":g+=parseInt(k[1],10);break;case "w":case "W":g+=parseInt(k[1],10)*7;break;case "m":case "M":l+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break;case "y":case "Y":j+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break}k=u.exec(h)}return new Date(j,
l,g)};if(b=(b=b==null||b===""?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):new Date(b.getTime()))&&b.toString()=="Invalid Date"?c:b){b.setHours(0);b.setMinutes(0);b.setSeconds(0);b.setMilliseconds(0)}return this._daylightSavingAdjust(b)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var e=!b,f=a.selectedMonth,h=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=
a.currentDay=b.getDate();a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();if((f!=a.selectedMonth||h!=a.selectedYear)&&!c)this._notifyChange(a);this._adjustInstDate(a);if(a.input)a.input.val(e?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),
b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),j=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),k=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");g=a.drawMonth-g;var m=a.drawYear;if(g<0){g+=12;m--}if(o){var n=
this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));for(n=k&&n<k?k:n;this._daylightSavingAdjust(new Date(m,g,1))>n;){g--;if(g<0){g=11;m--}}}a.drawMonth=g;a.drawYear=m;n=this._get(a,"prevText");n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-j,1)),this._getFormatConfig(a));n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+A+".datepicker._adjustDate('#"+a.id+"', -"+j+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";var s=this._get(a,"nextText");s=!h?s:this.formatDate(s,this._daylightSavingAdjust(new Date(m,g+j,1)),this._getFormatConfig(a));f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+A+".datepicker._adjustDate('#"+a.id+"', +"+j+", 'M');\" title=\""+s+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"w":"e")+'">'+s+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>";j=this._get(a,"currentText");s=this._get(a,"gotoCurrent")&&a.currentDay?u:b;j=!h?j:this.formatDate(j,s,this._getFormatConfig(a));h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+A+'.datepicker._hideDatepicker();">'+this._get(a,
"closeText")+"</button>":"";e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,s)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+A+".datepicker._gotoToday('#"+a.id+"');\">"+j+"</button>":"")+(c?"":h)+"</div>":"";h=parseInt(this._get(a,"firstDay"),10);h=isNaN(h)?0:h;j=this._get(a,"showWeek");s=this._get(a,"dayNames");this._get(a,"dayNamesShort");var q=this._get(a,"dayNamesMin"),B=
this._get(a,"monthNames"),v=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),D=this._get(a,"showOtherMonths"),K=this._get(a,"selectOtherMonths");this._get(a,"calculateWeek");for(var E=this._getDefaultDate(a),w="",x=0;x<i[0];x++){var O="";this.maxRows=4;for(var G=0;G<i[1];G++){var P=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",y="";if(l){y+='<div class="ui-datepicker-group';if(i[1]>1)switch(G){case 0:y+=" ui-datepicker-group-first";t=" ui-corner-"+(c?"right":
"left");break;case i[1]-1:y+=" ui-datepicker-group-last";t=" ui-corner-"+(c?"left":"right");break;default:y+=" ui-datepicker-group-middle";t="";break}y+='">'}y+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&x==0?c?f:n:"")+(/all|right/.test(t)&&x==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,k,o,x>0||G>0,B,v)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var z=j?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":
"";for(t=0;t<7;t++){var r=(t+h)%7;z+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+s[r]+'">'+q[r]+"</span></th>"}y+=z+"</tr></thead><tbody>";z=this._getDaysInMonth(m,g);if(m==a.selectedYear&&g==a.selectedMonth)a.selectedDay=Math.min(a.selectedDay,z);t=(this._getFirstDayOfMonth(m,g)-h+7)%7;z=Math.ceil((t+z)/7);this.maxRows=z=l?this.maxRows>z?this.maxRows:z:z;r=this._daylightSavingAdjust(new Date(m,g,1-t));for(var Q=0;Q<z;Q++){y+="<tr>";var R=!j?"":'<td class="ui-datepicker-week-col">'+
this._get(a,"calculateWeek")(r)+"</td>";for(t=0;t<7;t++){var I=p?p.apply(a.input?a.input[0]:null,[r]):[true,""],F=r.getMonth()!=g,L=F&&!K||!I[0]||k&&r<k||o&&r>o;R+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(r.getTime()==P.getTime()&&g==a.selectedMonth&&a._keyEvent||E.getTime()==r.getTime()&&E.getTime()==P.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!D?"":" "+I[1]+(r.getTime()==u.getTime()?" "+
this._currentClass:"")+(r.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!F||D)&&I[2]?' title="'+I[2]+'"':"")+(L?"":' onclick="DP_jQuery_'+A+".datepicker._selectDay('#"+a.id+"',"+r.getMonth()+","+r.getFullYear()+', this);return false;"')+">"+(F&&!D?"&#xa0;":L?'<span class="ui-state-default">'+r.getDate()+"</span>":'<a class="ui-state-default'+(r.getTime()==b.getTime()?" ui-state-highlight":"")+(r.getTime()==u.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+'" href="#">'+
r.getDate()+"</a>")+"</td>";r.setDate(r.getDate()+1);r=this._daylightSavingAdjust(r)}y+=R+"</tr>"}g++;if(g>11){g=0;m++}y+="</tbody></table>"+(l?"</div>"+(i[0]>0&&G==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");O+=y}w+=O}w+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");a._keyEvent=false;return w},_generateMonthYearHeader:function(a,b,c,e,f,h,i,g){var j=this._get(a,"changeMonth"),
l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),k='<div class="ui-datepicker-title">',o="";if(h||!j)o+='<span class="ui-datepicker-month">'+i[b]+"</span>";else{i=e&&e.getFullYear()==c;var m=f&&f.getFullYear()==c;o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+A+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+A+".datepicker._clickMonthYear('#"+a.id+"');\">";for(var n=0;n<12;n++)if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth()))o+='<option value="'+
n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>";o+="</select>"}u||(k+=o+(h||!(j&&l)?"&#xa0;":""));if(!a.yearshtml){a.yearshtml="";if(h||!l)k+='<span class="ui-datepicker-year">'+c+"</span>";else{g=this._get(a,"yearRange").split(":");var s=(new Date).getFullYear();i=function(q){q=q.match(/c[+-].*/)?c+parseInt(q.substring(1),10):q.match(/[+-].*/)?s+parseInt(q,10):parseInt(q,10);return isNaN(q)?s:q};b=i(g[0]);g=Math.max(b,i(g[1]||""));b=e?Math.max(b,e.getFullYear()):b;g=f?Math.min(g,f.getFullYear()):
g;for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+A+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+A+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=g;b++)a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";a.yearshtml+="</select>";k+=a.yearshtml;a.yearshtml=null}}k+=this._get(a,"yearSuffix");if(u)k+=(h||!(j&&l)?"&#xa0;":"")+o;k+="</div>";return k},_adjustInstDate:function(a,b,c){var e=a.drawYear+(c==
"Y"?b:0),f=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));a.selectedDay=e.getDate();a.drawMonth=a.selectedMonth=e.getMonth();a.drawYear=a.selectedYear=e.getFullYear();if(c=="M"||c=="Y")this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");
if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,e){var f=this._getNumberOfMonths(a);
c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,
"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,e){if(!b){a.currentDay=a.selectedDay;a.currentMonth=a.selectedMonth;a.currentYear=a.selectedYear}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}});d.fn.datepicker=
function(a){if(!this.length)return this;if(!d.datepicker.initialized){d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);d.datepicker.initialized=true}var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,
[this[0]].concat(b));return this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)})};d.datepicker=new M;d.datepicker.initialized=false;d.datepicker.uuid=(new Date).getTime();d.datepicker.version="1.8.14";window["DP_jQuery_"+A]=d})(jQuery);
;/*
 * jQuery UI Effects 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects||function(f,j){function m(c){var a;if(c&&c.constructor==Array&&c.length==3)return c;if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10)];if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return[parseInt(a[1],
16),parseInt(a[2],16),parseInt(a[3],16)];if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(c))return n.transparent;return n[f.trim(c).toLowerCase()]}function s(c,a){var b;do{b=f.curCSS(c,a);if(b!=""&&b!="transparent"||f.nodeName(c,"body"))break;a="backgroundColor"}while(c=c.parentNode);return m(b)}function o(){var c=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,
a={},b,d;if(c&&c.length&&c[0]&&c[c[0]])for(var e=c.length;e--;){b=c[e];if(typeof c[b]=="string"){d=b.replace(/\-(\w)/g,function(g,h){return h.toUpperCase()});a[d]=c[b]}}else for(b in c)if(typeof c[b]==="string")a[b]=c[b];return a}function p(c){var a,b;for(a in c){b=c[a];if(b==null||f.isFunction(b)||a in t||/scrollbar/.test(a)||!/color/i.test(a)&&isNaN(parseFloat(b)))delete c[a]}return c}function u(c,a){var b={_:0},d;for(d in a)if(c[d]!=a[d])b[d]=a[d];return b}function k(c,a,b,d){if(typeof c=="object"){d=
a;b=null;a=c;c=a.effect}if(f.isFunction(a)){d=a;b=null;a={}}if(typeof a=="number"||f.fx.speeds[a]){d=b;b=a;a={}}if(f.isFunction(b)){d=b;b=null}a=a||{};b=b||a.duration;b=f.fx.off?0:typeof b=="number"?b:b in f.fx.speeds?f.fx.speeds[b]:f.fx.speeds._default;d=d||a.complete;return[c,a,b,d]}function l(c){if(!c||typeof c==="number"||f.fx.speeds[c])return true;if(typeof c==="string"&&!f.effects[c])return true;return false}f.effects={};f.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor",
"borderTopColor","borderColor","color","outlineColor"],function(c,a){f.fx.step[a]=function(b){if(!b.colorInit){b.start=s(b.elem,a);b.end=m(b.end);b.colorInit=true}b.elem.style[a]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"}});var n={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,
0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,
211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},q=["add","remove","toggle"],t={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};f.effects.animateClass=function(c,a,b,
d){if(f.isFunction(b)){d=b;b=null}return this.queue(function(){var e=f(this),g=e.attr("style")||" ",h=p(o.call(this)),r,v=e.attr("class");f.each(q,function(w,i){c[i]&&e[i+"Class"](c[i])});r=p(o.call(this));e.attr("class",v);e.animate(u(h,r),{queue:false,duration:a,easing:b,complete:function(){f.each(q,function(w,i){c[i]&&e[i+"Class"](c[i])});if(typeof e.attr("style")=="object"){e.attr("style").cssText="";e.attr("style").cssText=g}else e.attr("style",g);d&&d.apply(this,arguments);f.dequeue(this)}})})};
f.fn.extend({_addClass:f.fn.addClass,addClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{add:c},a,b,d]):this._addClass(c)},_removeClass:f.fn.removeClass,removeClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{remove:c},a,b,d]):this._removeClass(c)},_toggleClass:f.fn.toggleClass,toggleClass:function(c,a,b,d,e){return typeof a=="boolean"||a===j?b?f.effects.animateClass.apply(this,[a?{add:c}:{remove:c},b,d,e]):this._toggleClass(c,a):f.effects.animateClass.apply(this,
[{toggle:c},a,b,d])},switchClass:function(c,a,b,d,e){return f.effects.animateClass.apply(this,[{add:a,remove:c},b,d,e])}});f.extend(f.effects,{version:"1.8.14",save:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.data("ec.storage."+a[b],c[0].style[a[b]])},restore:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.css(a[b],c.data("ec.storage."+a[b]))},setMode:function(c,a){if(a=="toggle")a=c.is(":hidden")?"show":"hide";return a},getBaseline:function(c,a){var b;switch(c[0]){case "top":b=
0;break;case "middle":b=0.5;break;case "bottom":b=1;break;default:b=c[0]/a.height}switch(c[1]){case "left":c=0;break;case "center":c=0.5;break;case "right":c=1;break;default:c=c[1]/a.width}return{x:c,y:b}},createWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent();var a={width:c.outerWidth(true),height:c.outerHeight(true),"float":c.css("float")},b=f("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});
c.wrap(b);b=c.parent();if(c.css("position")=="static"){b.css({position:"relative"});c.css({position:"relative"})}else{f.extend(a,{position:c.css("position"),zIndex:c.css("z-index")});f.each(["top","left","bottom","right"],function(d,e){a[e]=c.css(e);if(isNaN(parseInt(a[e],10)))a[e]="auto"});c.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return b.css(a).show()},removeWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent().replaceWith(c);return c},setTransition:function(c,
a,b,d){d=d||{};f.each(a,function(e,g){unit=c.cssUnit(g);if(unit[0]>0)d[g]=unit[0]*b+unit[1]});return d}});f.fn.extend({effect:function(c){var a=k.apply(this,arguments),b={options:a[1],duration:a[2],callback:a[3]};a=b.options.mode;var d=f.effects[c];if(f.fx.off||!d)return a?this[a](b.duration,b.callback):this.each(function(){b.callback&&b.callback.call(this)});return d.call(this,b)},_show:f.fn.show,show:function(c){if(l(c))return this._show.apply(this,arguments);else{var a=k.apply(this,arguments);
a[1].mode="show";return this.effect.apply(this,a)}},_hide:f.fn.hide,hide:function(c){if(l(c))return this._hide.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="hide";return this.effect.apply(this,a)}},__toggle:f.fn.toggle,toggle:function(c){if(l(c)||typeof c==="boolean"||f.isFunction(c))return this.__toggle.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="toggle";return this.effect.apply(this,a)}},cssUnit:function(c){var a=this.css(c),b=[];f.each(["em","px","%",
"pt"],function(d,e){if(a.indexOf(e)>0)b=[parseFloat(a),e]});return b}});f.easing.jswing=f.easing.swing;f.extend(f.easing,{def:"easeOutQuad",swing:function(c,a,b,d,e){return f.easing[f.easing.def](c,a,b,d,e)},easeInQuad:function(c,a,b,d,e){return d*(a/=e)*a+b},easeOutQuad:function(c,a,b,d,e){return-d*(a/=e)*(a-2)+b},easeInOutQuad:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a+b;return-d/2*(--a*(a-2)-1)+b},easeInCubic:function(c,a,b,d,e){return d*(a/=e)*a*a+b},easeOutCubic:function(c,a,b,d,e){return d*
((a=a/e-1)*a*a+1)+b},easeInOutCubic:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a+b;return d/2*((a-=2)*a*a+2)+b},easeInQuart:function(c,a,b,d,e){return d*(a/=e)*a*a*a+b},easeOutQuart:function(c,a,b,d,e){return-d*((a=a/e-1)*a*a*a-1)+b},easeInOutQuart:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a+b;return-d/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(c,a,b,d,e){return d*(a/=e)*a*a*a*a+b},easeOutQuint:function(c,a,b,d,e){return d*((a=a/e-1)*a*a*a*a+1)+b},easeInOutQuint:function(c,a,b,d,e){if((a/=
e/2)<1)return d/2*a*a*a*a*a+b;return d/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(c,a,b,d,e){return-d*Math.cos(a/e*(Math.PI/2))+d+b},easeOutSine:function(c,a,b,d,e){return d*Math.sin(a/e*(Math.PI/2))+b},easeInOutSine:function(c,a,b,d,e){return-d/2*(Math.cos(Math.PI*a/e)-1)+b},easeInExpo:function(c,a,b,d,e){return a==0?b:d*Math.pow(2,10*(a/e-1))+b},easeOutExpo:function(c,a,b,d,e){return a==e?b+d:d*(-Math.pow(2,-10*a/e)+1)+b},easeInOutExpo:function(c,a,b,d,e){if(a==0)return b;if(a==e)return b+d;if((a/=
e/2)<1)return d/2*Math.pow(2,10*(a-1))+b;return d/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(c,a,b,d,e){return-d*(Math.sqrt(1-(a/=e)*a)-1)+b},easeOutCirc:function(c,a,b,d,e){return d*Math.sqrt(1-(a=a/e-1)*a)+b},easeInOutCirc:function(c,a,b,d,e){if((a/=e/2)<1)return-d/2*(Math.sqrt(1-a*a)-1)+b;return d/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/
h);return-(h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g))+b},easeOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*a)*Math.sin((a*e-c)*2*Math.PI/g)+d+b},easeInOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e/2)==2)return b+d;g||(g=e*0.3*1.5);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);if(a<1)return-0.5*
h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)+b;return h*Math.pow(2,-10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)*0.5+d+b},easeInBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*(a/=e)*a*((g+1)*a-g)+b},easeOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*((a=a/e-1)*a*((g+1)*a+g)+1)+b},easeInOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;if((a/=e/2)<1)return d/2*a*a*(((g*=1.525)+1)*a-g)+b;return d/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},easeInBounce:function(c,a,b,d,e){return d-f.easing.easeOutBounce(c,
e-a,0,d,e)+b},easeOutBounce:function(c,a,b,d,e){return(a/=e)<1/2.75?d*7.5625*a*a+b:a<2/2.75?d*(7.5625*(a-=1.5/2.75)*a+0.75)+b:a<2.5/2.75?d*(7.5625*(a-=2.25/2.75)*a+0.9375)+b:d*(7.5625*(a-=2.625/2.75)*a+0.984375)+b},easeInOutBounce:function(c,a,b,d,e){if(a<e/2)return f.easing.easeInBounce(c,a*2,0,d,e)*0.5+b;return f.easing.easeOutBounce(c,a*2-e,0,d,e)*0.5+d*0.5+b}})}(jQuery);
;
/*
 * jQuery UI Effects Highlight 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){b.effects.highlight=function(c){return this.queue(function(){var a=b(this),e=["backgroundImage","backgroundColor","opacity"],d=b.effects.setMode(a,c.options.mode||"show"),f={backgroundColor:a.css("backgroundColor")};if(d=="hide")f.opacity=0;b.effects.save(a,e);a.show().css({backgroundImage:"none",backgroundColor:c.options.color||"#ffff99"}).animate(f,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){d=="hide"&&a.hide();b.effects.restore(a,e);d=="show"&&!b.support.opacity&&
this.style.removeAttribute("filter");c.callback&&c.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},h=0,c=0,l=[];function g(e,d,g,i){var c={data:i||(d?d.data:{}),_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};e&&a.extend(c,e,{nodes:[],parent:d});if(g){c.tmpl=g;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++h;(l.length?f:b)[h]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a.fn[d].apply(a(i[h]),k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,l,j){if(d[0]&&d[0].nodeType){var f=a.makeArray(arguments),g=d.length,i=0,h;while(i<g&&!(h=a.data(d[i++],"tmplItem")));if(g>1)f[0]=[a.makeArray(d)];if(h&&c)f[2]=function(b){a.tmpl.afterManip(this,b,j)};r.apply(this,f)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var j,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(i(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);j=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(i(c,null,j)):j},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function i(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:i(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=j(c).concat(b);if(d)b=b.concat(j(d))});return b?b:j(c)}function j(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,j,d,b,c,e){var i=a.tmpl.tag[j],h,f,g;if(!i)throw"Template command not found: "+j;h=i._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=k(b);e=e?","+k(e)+")":c?")":"";f=c?b.indexOf(".")>-1?b+c:"("+b+").call($item"+e:b;g=c?f:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else g=f=h.$1||"null";d=k(d);return"');"+i[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(g).split("$1").join(f).split("$2").join(d?d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(d,c,b,a){a=a?","+a+")":b?")":"";return a?"("+c+").call($item"+a:d}):h.$2||"")+"_.push('"})+"');}return _;")}function n(c,b){c._wrap=i(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function k(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,i;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(i=j.length-1;i>=0;i--)m(j[i]);m(k)}function m(j){var p,i=j,k,e,m;if(m=j.getAttribute(d)){while(i.parentNode&&(i=i.parentNode).nodeType===1&&!(p=i.getAttribute(d)));if(p!==m){i=i.parentNode?i.nodeType===11?0:i.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[i]||f[i],null,true);e.key=++h;b[h]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;i=a.data(j.parentNode,"tmplItem");i=i?i.key:0}if(e){k=e;while(k&&k.key!=i){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent,null,true)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery)
;
/*
 * jQuery UI Nested Sortable for CGP
 * http://mjsarfatti.com/sandbox/nestedSortable
 *
 * Depends:
 *	 jquery.ui.sortable.js 1.8+
 *
 * Copyright 2010-2011, Manuele J Sarfatti
 */


(function($) {

	$.widget("ui.nestedSortable", $.extend({}, $.ui.sortable.prototype, {

		options: {
			tabSize: 20,
			disableNesting: 'ui-nestedSortable-no-nesting',
			errorClass: 'ui-nestedSortable-error',
			listType: 'ol',
			maxLevels: 0,
			noJumpFix: 0
		},

		_create: function(){
			if (this.options.noJumpFix == false) {
				this.element.height(this.element.height());
			}
			this.element.data('sortable', this.element.data('nestedSortable'));
			return $.ui.sortable.prototype._create.apply(this, arguments);
		},



		_mouseDrag: function(event) {

			//Compute the helpers position
			this.position = this._generatePosition(event);
			this.positionAbs = this._convertPositionTo("absolute");

			if (!this.lastPositionAbs) {
				this.lastPositionAbs = this.positionAbs;
			}

			//Do scrolling
			if(this.options.scroll) {
				var o = this.options, scrolled = false;
				if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML') {

					if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
					else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity)
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;

					if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
					else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity)
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;

				} else {

					if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
						scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
					else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
						scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);

					if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
						scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
					else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
						scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);

				}

				if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
					$.ui.ddmanager.prepareOffsets(this, event);
			}

			//Regenerate the absolute position used for position checks
			this.positionAbs = this._convertPositionTo("absolute");

			//Set the helper position
			if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
			if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';

			//Rearrange
			for (var i = this.items.length - 1; i >= 0; i--) {

				//Cache variables and intersection, continue if no intersection
				var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
				if (!intersection) continue;

				if(itemElement != this.currentItem[0] //cannot intersect with itself
					&&	this.placeholder[intersection == 1 ? "next" : "prev"]()[0] != itemElement //no useless actions that have been done before
					&&	!$.contains(this.placeholder[0], itemElement) //no action if the item moved is the parent of the item checked
					&& (this.options.type == 'semi-dynamic' ? !$.contains(this.element[0], itemElement) : true)
					//&& itemElement.parentNode == this.placeholder[0].parentNode // only rearrange items within the same container
				) {

					$(itemElement).mouseenter();

					this.direction = intersection == 1 ? "down" : "up";

					if (this.options.tolerance == "pointer" || this._intersectsWithSides(item)) {
						$(itemElement).mouseleave();
						this._rearrange(event, item);
					} else {
						break;
					}

					// Clear emtpy ul's/ol's
					this._clearEmpty(itemElement);

					this._trigger("change", event, this._uiHash());
					break;
				}
			}

			var parentItem = (this.placeholder[0].parentNode.parentNode
				       && $(this.placeholder[0].parentNode.parentNode).closest('.ui-sortable').length)
				       ? $(this.placeholder[0].parentNode.parentNode)
				       : null,
			    level = this._getLevel(this.placeholder),
			    childLevels = this._getChildLevels(this.helper),
			    previousItem = this.placeholder[0].previousSibling ? $(this.placeholder[0].previousSibling) : null;

			if (previousItem != null) {
				while (previousItem[0].nodeName.toLowerCase() != 'li' || previousItem[0] == this.currentItem[0]) {
					if (previousItem[0].previousSibling) {
						previousItem = $(previousItem[0].previousSibling);
					} else {
						previousItem = null;
						break;
					}
				}
			}

			var newList = document.createElement(o.listType);

			this.beyondMaxLevels = 0;

			// If the item is moved to the left, send it to its parent level
			if (parentItem != null && this.positionAbs.left < parentItem.offset().left) {
				parentItem.after(this.placeholder[0]);
				this._clearEmpty(parentItem[0]);
				this._trigger("change", event, this._uiHash());
			}
			// If the item is below another one and is moved to the right, make it a children of it
			else if (previousItem != null && this.positionAbs.left > previousItem.offset().left + o.tabSize) {
				// If the item sits under a folded list, don't allow nesting
				if (previousItem.children(o.listType).length && !previousItem.children(o.listType).is(':visible')) {
					this._isAllowed(parentItem, level+childLevels);
				} else {
					this._isAllowed(previousItem, level+childLevels+1);
					if (!previousItem.children(o.listType).length) {
						previousItem[0].appendChild(newList);
						previousItem.addClass('open');
					}
					previousItem.children(o.listType)[0].appendChild(this.placeholder[0]);
					this._trigger("change", event, this._uiHash());
				}
			} else {
				this._isAllowed(parentItem, level+childLevels);
			}

			//Post events to containers
			this._contactContainers(event);

			//Interconnect with droppables
			if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

			//Call callbacks
			this._trigger('sort', event, this._uiHash());

			this.lastPositionAbs = this.positionAbs;
			return false;

		},

		_mouseStop: function(event, noPropagation) {

			// If the item is in a position not allowed, send it back
			if (this.beyondMaxLevels) {
				var parent = this.placeholder[0].parentNode.parentNode;
				for (var i = this.beyondMaxLevels-1; i > 0; i--) {
					parent = parent.parentNode.parentNode;
				}
				this.placeholder.removeClass(this.options.errorClass);
				$(parent).after(this.placeholder[0]);
				this._trigger("change", event, this._uiHash());
			}

			$.ui.sortable.prototype._mouseStop.apply(this, arguments);

		},

		serialize: function(o) {

			var items = this._getItemsAsjQuery(o && o.connected),
			    str = []; o = o || {};

			$(items).each(function () {
				var res = ($(o.item || this).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/)),
				    pid = ($(o.item || this).parent(o.listType)
											.parent('li')
											.attr(o.attribute || 'id') || '')
											.match(o.expression || (/(.+)[-=_](.+)/));

				if (res) {
					str.push((o.key || res[1] + '[' + (o.key && o.expression ? res[1] : res[2]) + ']')
							  + '='
							  + (pid ? (o.key && o.expression ? pid[1] : pid[2]) : 'root'));
				}
			});

			if(!str.length && o.key) {
				str.push(o.key + '=');
			}

			return str.join('&');

		},

		toHierarchy: function(o) {

			o = o || {};
			var sDepth = o.startDepthCount || 0,
			    ret = [];

			$(this.element).children('li').each(function () {
				var level = _recursiveItems($(this));
				ret.push(level);
			});

			return ret;

			function _recursiveItems(li) {
				var id = ($(li).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
				if (id) {
					var item = {"id" : id[2]};
					if ($(li).children(o.listType).children('li').length > 0) {
						item.children = [];
						$(li).children(o.listType).children('li').each(function() {
							var level = _recursiveItems($(this));
							item.children.push(level);
						});
					}
					return item;
				}
			}
        },

		toArray: function(o) {

			o = o || {};
			var sDepth = o.startDepthCount || 0,
			    ret = [],
			    left = 2;

			ret.push({
				"item_id": 'root',
				"parent_id": 'none',
				"depth": sDepth,
				"left": '1',
				"right": ($('li', this.element).length + 1) * 2
			});

			$(this.element).children('li').each(function () {
				left = _recursiveArray(this, sDepth + 1, left);
			});

			ret = ret.sort(function(a,b){ return (a.left - b.left); });

			return ret;

			function _recursiveArray(item, depth, left) {

				var right = left + 1,
				    id,
					pid;

				if ($(item).children(o.listType).children('li').length > 0) {
					depth ++;
					$(item).children(o.listType).children('li').each(function () {
						right = _recursiveArray($(this), depth, right);
					});
					depth --;
				}

				id = ($(item).attr(o.attribute || 'id')).match(o.expression || (/(.+)[-=_](.+)/));

				if (depth === sDepth + 1) {
					pid = 'root';
				} else {
					var parentItem = ($(item).parent(o.listType)
										 .parent('li')
										 .attr('id'))
										 .match(o.expression || (/(.+)[-=_](.+)/));
					pid = parentItem[2];
				}

				if (id) {
						ret.push({"item_id": id[2], "parent_id": pid, "depth": depth, "left": left, "right": right});
				}

				left = right + 1;
				return left;
			}

		},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height*.7), item.height),
			isOverTopHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top - (item.height*.7), item.height),
			isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection == "right" && isOverRightHalf) || (horizontalDirection == "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection == "down" && isOverBottomHalf) || (verticalDirection == "up" && isOverTopHalf));
		}

	},

		_clear: function(event, noPropagation) {

			this.reverting = false;
			// We delay all events that have to be triggered to after the point where the placeholder has been removed and
			// everything else normalized again
			var delayedTriggers = [], self = this;

			// We first have to update the dom position of the actual currentItem
			// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
			if(!this._noFinalSort && this.currentItem[0].parentNode) this.placeholder.before(this.currentItem);
			this._noFinalSort = null;

			if(this.helper[0] == this.currentItem[0]) {
				for(var i in this._storedCSS) {
					if(this._storedCSS[i] == 'auto' || this._storedCSS[i] == 'static') this._storedCSS[i] = '';
				}
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			if(this.fromOutside && !noPropagation) delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
			if((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !noPropagation) delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
			if(!$.contains(this.element[0], this.currentItem[0])) { //Node was moved out of the current element
				if(!noPropagation) delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
				for (var i = this.containers.length - 1; i >= 0; i--){
					if($.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation) {
						delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
						delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.containers[i]));
					}
				};
			};

			//Post events to containers
			for (var i = this.containers.length - 1; i >= 0; i--){
				if(!noPropagation) delayedTriggers.push((function(c) { return function(event) { c._trigger("deactivate", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
				if(this.containers[i].containerCache.over) {
					delayedTriggers.push((function(c) { return function(event) { c._trigger("out", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
					this.containers[i].containerCache.over = 0;
				}
			}

			//Do what was originally in plugins
			if(this._storedCursor) $('body').css("cursor", this._storedCursor); //Reset cursor
			if(this._storedOpacity) this.helper.css("opacity", this._storedOpacity); //Reset opacity
			if(this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == 'auto' ? '' : this._storedZIndex); //Reset z-index

			this.dragging = false;
			if(this.cancelHelperRemoval) {
				if(!noPropagation) {
					this._trigger("beforeStop", event, this._uiHash());
					for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
					this._trigger("stop", event, this._uiHash());
				}
				return false;
			}

			if(!noPropagation) this._trigger("beforeStop", event, this._uiHash());

			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

			if(this.helper[0] != this.currentItem[0]) this.helper.remove(); this.helper = null;

			// Clean last empty ul/ol
			for (var i = this.items.length - 1; i >= 0; i--) {
				var item = this.items[i].item[0];
				this._clearEmpty(item);
			}

			if(!noPropagation) {
				for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
				this._trigger("stop", event, this._uiHash());
			}

			this.fromOutside = false;
			return true;

		},

		_clearEmpty: function(item) {

			if (item.children[1] && item.children[1].children.length == 0) {
				item.removeChild(item.children[1]);
			}

		},

		_getLevel: function(item) {

				var level = 1;

				if (this.options.listType) {
						var list = item.closest(this.options.listType);
						while (!list.is('.ui-sortable')/* && level < this.options.maxLevels*/) {
								level++;
								list = list.parent().closest(this.options.listType);
						}
				}

				return level;
		},

		_getChildLevels: function(item) {

				levels = item.find(this.options.items).filter(this.options.items+':first-child').length;

				return levels;
		},

		_isAllowed: function(parentItem, levels) {
			var o = this.options
			// Are we trying to nest under a no-nest or are we nesting too deep?
			if (parentItem == null || !(parentItem.hasClass(o.disableNesting))) {
				if (o.maxLevels < levels && o.maxLevels != 0) {
					this.placeholder.addClass(o.errorClass);
					this.beyondMaxLevels = levels - o.maxLevels;
				} else {
					this.placeholder.removeClass(o.errorClass);
					this.beyondMaxLevels = 0;
				}
			} else {
				this.placeholder.addClass(o.errorClass);
				if (o.maxLevels < levels && o.maxLevels != 0) {
					this.beyondMaxLevels = levels - o.maxLevels;
				} else {
					this.beyondMaxLevels = 1;
				}
			}
		}

	}));

	$.ui.nestedSortable.prototype.options = $.extend({}, $.ui.sortable.prototype.options, $.ui.nestedSortable.prototype.options);

})(jQuery);
/**
 * jQuery plugin provding .strip() function to strip elements but
 * leave their contents in place.
 *
 * @requires jQuery
 * @author Patrick Mahoney
 * @since June 2011
 */

(function($) {
  /**
   * Strip the matched elements from the DOM, leaving their contents
   * as-is.  Replaces the matched elements with their contents.
   *
   * @return {jQuery} Returns 'this' for chaining.
   */
  $.fn.strip = function() {
    this.each(function(_i, elem) {
      var jqElem = $(elem);
      jqElem.replaceWith(jqElem.contents());
    });
    return this;
  };
})(jQuery);
/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
(function(){var ua=navigator.userAgent.toLowerCase(),S={version:"3.0rc1",adapter:null,cache:[],client:{isIE:ua.indexOf("msie")>-1,isIE6:ua.indexOf("msie 6")>-1,isIE7:ua.indexOf("msie 7")>-1,isGecko:ua.indexOf("gecko")>-1&&ua.indexOf("safari")==-1,isWebkit:ua.indexOf("applewebkit/")>-1,isWindows:ua.indexOf("windows")>-1||ua.indexOf("win32")>-1,isMac:ua.indexOf("macintosh")>-1||ua.indexOf("mac os x")>-1,isLinux:ua.indexOf("linux")>-1},content:null,current:-1,dimensions:null,gallery:[],expando:"shadowboxCacheKey",libraries:{Prototype:"prototype",jQuery:"jquery",MooTools:"mootools",YAHOO:"yui",dojo:"dojo",Ext:"ext"},options:{adapter:null,animate:true,animateFade:true,autoplayMovies:true,continuous:false,ease:function(x){return 1+Math.pow(x-1,3)},enableKeys:true,errors:{fla:{name:"Flash",url:"http://www.adobe.com/products/flashplayer/"},qt:{name:"QuickTime",url:"http://www.apple.com/quicktime/download/"},wmp:{name:"Windows Media Player",url:"http://www.microsoft.com/windows/windowsmedia/"},f4m:{name:"Flip4Mac",url:"http://www.flip4mac.com/wmv_download.htm"}},ext:{img:["png","jpg","jpeg","gif","bmp"],swf:["swf"],flv:["flv","m4v"],qt:["dv","mov","moov","movie","mp4"],wmp:["asf","wm","wmv"],qtwmp:["avi","mpg","mpeg"]},flashParams:{bgcolor:"#000000",allowfullscreen:true},flashVars:{},flashVersion:"9.0.115",handleOversize:"resize",handleUnsupported:"link",language:"en",onChange:null,onClose:null,onFinish:null,onOpen:null,players:["img"],showMovieControls:true,skipSetup:false,slideshowDelay:0,useSizzle:true,viewportPadding:20},path:"",plugins:null,ready:false,regex:{domain:/:\/\/(.*?)[:\/]/,inline:/#(.+)$/,rel:/^(light|shadow)box/i,gallery:/^(light|shadow)box\[(.*?)\]/i,unsupported:/^unsupported-(\w+)/,param:/\s*([a-z_]*?)\s*=\s*(.+)\s*/},applyOptions:function(opts){if(opts){default_options=apply({},S.options);apply(S.options,opts)}},revertOptions:function(){apply(S.options,default_options)},change:function(index){if(!S.gallery){return}if(!S.gallery[index]){if(!S.options.continuous){return}else{index=index<0?S.gallery.length-1:0}}S.current=index;if(typeof slide_timer=="number"){clearTimeout(slide_timer);slide_timer=null;slide_delay=slide_start=0}if(S.options.onChange){S.options.onChange()}loadContent()},close:function(){if(!active){return}active=false;listenKeys(false);if(S.content){S.content.remove();S.content=null}if(typeof slide_timer=="number"){clearTimeout(slide_timer)}slide_timer=null;slide_delay=0;if(S.options.onClose){S.options.onClose()}S.skin.onClose();S.revertOptions()},contentId:function(){return content_id},error:function(msg){if(!S.debug){return}if(typeof window.console!="undefined"&&typeof console.log=="function"){console.log(msg)}else{alert(msg)}},getCurrent:function(){return S.current>-1?S.gallery[S.current]:null},hasNext:function(){return S.gallery.length>1&&(S.current!=S.gallery.length-1||S.options.continuous)},init:function(opts){if(initialized){return}initialized=true;opts=opts||{};init_options=opts;if(opts){apply(S.options,opts)}for(var e in S.options.ext){S.regex[e]=new RegExp(".("+S.options.ext[e].join("|")+")s*$","i")}if(!S.path){var pathre=/(.+\/)shadowbox\.js/i,path;each(document.getElementsByTagName("script"),function(s){path=pathre.exec(s.src);if(path){S.path=path[1];return false}})}if(S.options.adapter){S.adapter=S.options.adapter.toLowerCase()}else{for(var lib in S.libraries){if(typeof window[lib]!="undefined"){S.adapter=S.libraries[lib];break}}if(!S.adapter){S.adapter="base"}}if(S.options.useSizzle&&!window.Sizzle){if(window.jQuery){window.Sizzle=jQuery.find}else{U.include(S.path+"libraries/sizzle/sizzle.js")}}if(!S.lang){U.include(S.path+"languages/shadowbox-"+S.options.language+".js")}each(S.options.players,function(p){if((p=="swf"||p=="flv")&&!window.swfobject){U.include(S.path+"libraries/swfobject/swfobject.js")}if(!S[p]){U.include(S.path+"players/shadowbox-"+p+".js")}});if(!S.lib){U.include(S.path+"adapters/shadowbox-"+S.adapter+".js")}waitDom(waitLibs)},isActive:function(){return active},isPaused:function(){return slide_timer=="paused"},load:function(){if(S.ready){return}S.ready=true;if(S.skin.options){apply(S.options,S.skin.options);apply(S.options,init_options)}S.skin.init();if(!S.options.skipSetup){S.setup()}},next:function(){S.change(S.current+1)},open:function(obj){if(U.isLink(obj)){if(S.inCache(obj)){obj=S.cache[obj[S.expando]]}else{obj=S.buildCacheObj(obj)}}if(obj.constructor==Array){S.gallery=obj;S.current=0}else{if(!obj.gallery){S.gallery=[obj];S.current=0}else{S.current=null;S.gallery=[];each(S.cache,function(c){if(c.gallery&&c.gallery==obj.gallery){if(S.current==null&&c.content==obj.content&&c.title==obj.title){S.current=S.gallery.length}S.gallery.push(c)}});if(S.current==null){S.gallery.unshift(obj);S.current=0}}}obj=S.getCurrent();if(obj.options){S.revertOptions();S.applyOptions(obj.options)}var item,remove,m,format,replace,oe=S.options.errors,msg,el;for(var i=0;i<S.gallery.length;++i){item=S.gallery[i]=apply({},S.gallery[i]);remove=false;if(m=S.regex.unsupported.exec(item.player)){if(S.options.handleUnsupported=="link"){item.player="html";switch(m[1]){case"qtwmp":format="either";replace=[oe.qt.url,oe.qt.name,oe.wmp.url,oe.wmp.name];break;case"qtf4m":format="shared";replace=[oe.qt.url,oe.qt.name,oe.f4m.url,oe.f4m.name];break;default:format="single";if(m[1]=="swf"||m[1]=="flv"){m[1]="fla"}replace=[oe[m[1]].url,oe[m[1]].name]}msg=S.lang.errors[format].replace(/\{(\d+)\}/g,function(m,n){return replace[n]});item.content='<div class="sb-message">'+msg+"</div>"}else{remove=true}}else{if(item.player=="inline"){m=S.regex.inline.exec(item.content);if(m){var el=U.get(m[1]);if(el){item.content=el.innerHTML}else{S.error("Cannot find element with id "+m[1])}}else{S.error("Cannot find element id for inline content")}}else{if(item.player=="swf"||item.player=="flv"){var version=(item.options&&item.options.flashVersion)||S.options.flashVersion;if(!swfobject.hasFlashPlayerVersion(version)){item.width=310;item.height=177}}}}if(remove){S.gallery.splice(i,1);if(i<S.current){--S.current}else{if(i==S.current){S.current=i>0?i-1:i}}--i}}if(S.gallery.length){if(!active){if(typeof S.options.onOpen=="function"&&S.options.onOpen(obj)===false){return}S.skin.onOpen(obj,loadContent)}else{loadContent()}active=true}},pause:function(){if(typeof slide_timer!="number"){return}var time=new Date().getTime();slide_delay=Math.max(0,slide_delay-(time-slide_start));if(slide_delay){clearTimeout(slide_timer);slide_timer="paused";if(S.skin.onPause){S.skin.onPause()}}},play:function(){if(!S.hasNext()){return}if(!slide_delay){slide_delay=S.options.slideshowDelay*1000}if(slide_delay){slide_start=new Date().getTime();slide_timer=setTimeout(function(){slide_delay=slide_start=0;S.next()},slide_delay);if(S.skin.onPlay){S.skin.onPlay()}}},previous:function(){S.change(S.current-1)},setDimensions:function(height,width,max_h,max_w,tb,lr,resizable){var h=height=parseInt(height),w=width=parseInt(width),pad=parseInt(S.options.viewportPadding)||0;var extra_h=2*pad+tb;if(h+extra_h>=max_h){h=max_h-extra_h}var extra_w=2*pad+lr;if(w+extra_w>=max_w){w=max_w-extra_w}var resize_h=height,resize_w=width,change_h=(height-h)/height,change_w=(width-w)/width,oversized=(change_h>0||change_w>0);if(resizable&&oversized&&S.options.handleOversize=="resize"){if(change_h>change_w){w=Math.round((width/height)*h)}else{if(change_w>change_h){h=Math.round((height/width)*w)}}resize_w=w;resize_h=h}S.dimensions={height:h+tb,width:w+lr,inner_h:h,inner_w:w,top:(max_h-(h+extra_h))/2+pad,left:(max_w-(w+extra_w))/2+pad,oversized:oversized,resize_h:resize_h,resize_w:resize_w}},setup:function(links,opts){each(S.findLinks(links),function(link){S.addCache(link,opts)})},teardown:function(links){each(S.findLinks(links),S.removeCache)},findLinks:function(links){if(!links){var links=[],rel;each(document.getElementsByTagName("a"),function(a){rel=a.getAttribute("rel");if(rel&&S.regex.rel.test(rel)){links.push(a)}})}else{var len=links.length;if(len){if(window.Sizzle){if(typeof links=="string"){links=Sizzle(links)}else{if(len==2&&links.push&&typeof links[0]=="string"&&links[1].nodeType){links=Sizzle(links[0],links[1])}}}}else{links=[links]}}return links},inCache:function(link){return typeof link[S.expando]=="number"&&S.cache[link[S.expando]]},addCache:function(link,opts){if(!S.inCache(link)){link[S.expando]=S.cache.length;S.lib.addEvent(link,"click",handleClick)}S.cache[link[S.expando]]=S.buildCacheObj(link,opts)},removeCache:function(link){S.lib.removeEvent(link,"click",handleClick);S.cache[link[S.expando]]=null;delete link[S.expando]},clearCache:function(){each(S.cache,function(obj){S.removeCache(obj.link)});S.cache=[]},buildCacheObj:function(link,opts){var obj={link:link,title:link.getAttribute("title"),options:apply({},opts||{}),content:link.href};if(opts){each(["player","title","height","width","gallery"],function(option){if(typeof obj.options[option]!="undefined"){obj[option]=obj.options[option];delete obj.options[option]}})}if(!obj.player){obj.player=S.getPlayer(obj.content)}var rel=link.getAttribute("rel");if(rel){var match=rel.match(S.regex.gallery);if(match){obj.gallery=escape(match[2])}each(rel.split(";"),function(parameter){match=parameter.match(S.regex.param);if(match){if(match[1]=="options"){eval("apply(obj.options,"+match[2]+")")}else{obj[match[1]]=match[2]}}})}return obj},getPlayer:function(content){var r=S.regex,p=S.plugins,m=content.match(r.domain),same_domain=m&&document.domain==m[1];if(content.indexOf("#")>-1&&same_domain){return"inline"}var q=content.indexOf("?");if(q>-1){content=content.substring(0,q)}if(r.img.test(content)){return"img"}if(r.swf.test(content)){return p.fla?"swf":"unsupported-swf"}if(r.flv.test(content)){return p.fla?"flv":"unsupported-flv"}if(r.qt.test(content)){return p.qt?"qt":"unsupported-qt"}if(r.wmp.test(content)){if(p.wmp){return"wmp"}if(p.f4m){return"qt"}if(S.client.isMac){return p.qt?"unsupported-f4m":"unsupported-qtf4m"}return"unsupported-wmp"}if(r.qtwmp.test(content)){if(p.qt){return"qt"}if(p.wmp){return"wmp"}return S.client.isMac?"unsupported-qt":"unsupported-qtwmp"}return"iframe"}},U=S.util={animate:function(el,p,to,d,cb){var from=parseFloat(S.lib.getStyle(el,p));if(isNaN(from)){from=0}var delta=to-from;if(delta==0){if(cb){cb()}return}var op=p=="opacity";function fn(ease){var to=from+ease*delta;if(op){U.setOpacity(el,to)}else{el.style[p]=to+"px"}}if(!d||(!op&&!S.options.animate)||(op&&!S.options.animateFade)){fn(1);if(cb){cb()}return}d*=1000;var begin=new Date().getTime(),ease=S.options.ease,end=begin+d,time,timer=setInterval(function(){time=new Date().getTime();if(time>=end){clearInterval(timer);fn(1);if(cb){cb()}}else{fn(ease((time-begin)/d))}},10)},apply:function(o,e){for(var p in e){o[p]=e[p]}return o},clearOpacity:function(el){var s=el.style;if(window.ActiveXObject){if(typeof s.filter=="string"&&(/alpha/i).test(s.filter)){s.filter=s.filter.replace(/[\w\.]*alpha\(.*?\);?/i,"")}}else{s.opacity=""}},each:function(obj,fn,scope){if(obj == null){ return true; }for(var i=0,len=obj.length;i<len;++i){if(fn.call(scope||obj[i],obj[i],i,obj)===false){return}}},get:function(id){return document.getElementById(id)},include:function(){var includes={};return function(file){if(includes[file]){return}includes[file]=true;var head=document.getElementsByTagName("head")[0],script=document.createElement("script");script.src=file;head.appendChild(script)}}(),isLink:function(obj){if(!obj||!obj.tagName){return false}var up=obj.tagName.toUpperCase();return up=="A"||up=="AREA"},removeChildren:function(el){while(el.firstChild){el.removeChild(el.firstChild)}},setOpacity:function(el,o){var s=el.style;if(window.ActiveXObject){s.zoom=1;s.filter=(s.filter||"").replace(/\s*alpha\([^\)]*\)/gi,"")+(o==1?"":" alpha(opacity="+(o*100)+")")}else{s.opacity=o}}},apply=U.apply,each=U.each,init_options,initialized=false,default_options={},content_id="sb-content",active=false,slide_timer,slide_start,slide_delay=0;if(navigator.plugins&&navigator.plugins.length){var names=[];each(navigator.plugins,function(p){names.push(p.name)});names=names.join();var f4m=names.indexOf("Flip4Mac")>-1;S.plugins={fla:names.indexOf("Shockwave Flash")>-1,qt:names.indexOf("QuickTime")>-1,wmp:!f4m&&names.indexOf("Windows Media")>-1,f4m:f4m}}else{function detectPlugin(n){try{var axo=new ActiveXObject(n)}catch(e){}return !!axo}S.plugins={fla:detectPlugin("ShockwaveFlash.ShockwaveFlash"),qt:detectPlugin("QuickTime.QuickTime"),wmp:detectPlugin("wmplayer.ocx"),f4m:false}}function waitDom(cb){if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);cb()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);cb()}});if(document.documentElement.doScroll&&window==window.top){(function(){if(S.ready){return}try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return}cb()})()}}}if(typeof window.onload=="function"){var oldonload=window.onload;window.onload=function(){oldonload();cb()}}else{window.onload=cb}}function waitLibs(){if(S.lib&&S.lang){S.load()}else{setTimeout(waitLibs,0)}}function handleClick(e){var link;if(U.isLink(this)){link=this}else{link=S.lib.getTarget(e);while(!U.isLink(link)&&link.parentNode){link=link.parentNode}}S.lib.preventDefault(e);if(link){S.open(link);if(S.gallery.length){S.lib.preventDefault(e)}}}function listenKeys(on){if(!S.options.enableKeys){return}S.lib[(on?"add":"remove")+"Event"](document,"keydown",handleKey)}function handleKey(e){var code=S.lib.keyCode(e),handler;switch(code){case 81:case 88:case 27:handler=S.close;break;case 37:handler=S.previous;break;case 39:handler=S.next;break;case 32:handler=typeof slide_timer=="number"?S.pause:S.play}if(handler){S.lib.preventDefault(e);handler()}}function loadContent(){var obj=S.getCurrent();if(!obj){return}var p=obj.player=="inline"?"html":obj.player;if(typeof S[p]!="function"){S.error("Unknown player: "+p)}var change=false;if(S.content){S.content.remove();change=true;S.revertOptions();if(obj.options){S.applyOptions(obj.options)}}U.removeChildren(S.skin.bodyEl());S.content=new S[p](obj);listenKeys(false);S.skin.onLoad(S.content,change,function(){if(!S.content){return}if(typeof S.content.ready!="undefined"){var id=setInterval(function(){if(S.content){if(S.content.ready){clearInterval(id);id=null;S.skin.onReady(contentReady)}}else{clearInterval(id);id=null}},100)}else{S.skin.onReady(contentReady)}});if(S.gallery.length>1){var next=S.gallery[S.current+1]||S.gallery[0];if(next.player=="img"){var a=new Image();a.src=next.content}var prev=S.gallery[S.current-1]||S.gallery[S.gallery.length-1];if(prev.player=="img"){var b=new Image();b.src=prev.content}}}function contentReady(){if(!S.content){return}S.content.append(S.skin.bodyEl(),content_id,S.dimensions);S.skin.onFinish(finishContent)}function finishContent(){if(!S.content){return}if(S.content.onLoad){S.content.onLoad()}if(S.options.onFinish){S.options.onFinish()}if(!S.isPaused()){S.play()}listenKeys(true)}window.Shadowbox=S})();(function(){var g=Shadowbox,f=g.util,q=false,b=[],m=["sb-nav-close","sb-nav-next","sb-nav-play","sb-nav-pause","sb-nav-previous"],o={markup:'<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><a onclick="Shadowbox.close()">{cancel}</a></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()"></a><a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a></div><div style="clear:both"></div></div></div></div></div>',options:{animSequence:"sync",autoDimensions:false,counterLimit:10,counterType:"default",displayCounter:true,displayNav:true,fadeDuration:0.35,initialHeight:160,initialWidth:320,modal:false,overlayColor:"#000",overlayOpacity:0.8,resizeDuration:0.35,showOverlay:true,troubleElements:["select","object","embed","canvas"]},init:function(){var s=o.markup.replace(/\{(\w+)\}/g,function(w,x){return g.lang[x]});g.lib.append(document.body,s);if(g.client.isIE6){f.get("sb-body").style.zoom=1;var u,r,t=/url\("(.*\.png)"\)/;f.each(m,function(w){u=f.get(w);if(u){r=g.lib.getStyle(u,"backgroundImage").match(t);if(r){u.style.backgroundImage="none";u.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="+r[1]+",sizingMethod=scale);"}}})}var v;g.lib.addEvent(window,"resize",function(){if(v){clearTimeout(v);v=null}if(g.isActive()){v=setTimeout(function(){o.onWindowResize();var w=g.content;if(w&&w.onWindowResize){w.onWindowResize()}},50)}})},bodyEl:function(){return f.get("sb-body-inner")},onOpen:function(u,r){e(false);var t=g.options.autoDimensions&&"height" in u?u.height:g.options.initialHeight,s=g.options.autoDimensions&&"width" in u?u.width:g.options.initialWidth;f.get("sb-container").style.display="block";var v=p(t,s);d(v.inner_h,v.top,false);h(v.width,v.left,false);i(r)},onLoad:function(s,t,r){k(true);j(t,function(){if(!s){return}if(!t){f.get("sb-wrapper").style.display=""}r()})},onReady:function(r){var t=g.content;if(!t){return}var s=p(t.height,t.width,t.resizable);o.resizeContent(s.inner_h,s.width,s.top,s.left,true,function(){l(r)})},onFinish:function(r){k(false,r)},onClose:function(){i();e(true)},onPlay:function(){c("play",false);c("pause",true)},onPause:function(){c("pause",false);c("play",true)},onWindowResize:function(){var t=g.content;if(!t){return}var s=p(t.height,t.width,t.resizable);h(s.width,s.left,false);d(s.inner_h,s.top,false);var r=f.get(g.contentId());if(r){if(t.resizable&&g.options.handleOversize=="resize"){r.height=s.resize_h;r.width=s.resize_w}}},resizeContent:function(s,t,w,v,u,r){var y=g.content;if(!y){return}var x=p(y.height,y.width,y.resizable);switch(g.options.animSequence){case"hw":d(x.inner_h,x.top,u,function(){h(x.width,x.left,u,r)});break;case"wh":h(x.width,x.left,u,function(){d(x.inner_h,x.top,u,r)});break;default:h(x.width,x.left,u);d(x.inner_h,x.top,u,r)}}};function n(){f.get("sb-container").style.top=document.documentElement.scrollTop+"px"}function e(r){if(r){f.each(b,function(s){s[0].style.visibility=s[1]||""})}else{b=[];f.each(g.options.troubleElements,function(s){f.each(document.getElementsByTagName(s),function(t){b.push([t,t.style.visibility]);t.style.visibility="hidden"})})}}function i(r){var s=f.get("sb-overlay"),t=f.get("sb-container"),v=f.get("sb-wrapper");if(r){if(g.client.isIE6){n();g.lib.addEvent(window,"scroll",n)}if(g.options.showOverlay){q=true;s.style.backgroundColor=g.options.overlayColor;f.setOpacity(s,0);if(!g.options.modal){g.lib.addEvent(s,"click",g.close)}v.style.display="none"}t.style.visibility="visible";if(q){var u=parseFloat(g.options.overlayOpacity);f.animate(s,"opacity",u,g.options.fadeDuration,r)}else{r()}}else{if(g.client.isIE6){g.lib.removeEvent(window,"scroll",n)}g.lib.removeEvent(s,"click",g.close);if(q){v.style.display="none";f.animate(s,"opacity",0,g.options.fadeDuration,function(){t.style.display="";v.style.display="";f.clearOpacity(s)})}else{t.style.visibility="hidden"}}}function c(t,r){var s=f.get("sb-nav-"+t);if(s){s.style.display=r?"":"none"}}function k(s,r){var u=f.get("sb-loading"),w=g.getCurrent().player,v=(w=="img"||w=="html");if(s){function t(){f.clearOpacity(u);if(r){r()}}f.setOpacity(u,0);u.style.display="";if(v){f.animate(u,"opacity",1,g.options.fadeDuration,t)}else{t()}}else{function t(){u.style.display="none";f.clearOpacity(u);if(r){r()}}if(v){f.animate(u,"opacity",0,g.options.fadeDuration,t)}else{t()}}}function a(u){var z=g.getCurrent();f.get("sb-title-inner").innerHTML=z.title||"";var C,t,x,D,s;if(g.options.displayNav){C=true;var B=g.gallery.length;if(B>1){if(g.options.continuous){t=s=true}else{t=(B-1)>g.current;s=g.current>0}}if(g.options.slideshowDelay>0&&g.hasNext()){D=!g.isPaused();x=!D}}else{C=t=x=D=s=false}c("close",C);c("next",t);c("play",x);c("pause",D);c("previous",s);var r="";if(g.options.displayCounter&&g.gallery.length>1){var B=g.gallery.length;if(g.options.counterType=="skip"){var y=0,w=B,v=parseInt(g.options.counterLimit)||0;if(v<B&&v>2){var A=Math.floor(v/2);y=g.current-A;if(y<0){y+=B}w=g.current+(v-A);if(w>B){w-=B}}while(y!=w){if(y==B){y=0}r+='<a onclick="Shadowbox.change('+y+');"';if(y==g.current){r+=' class="sb-counter-current"'}r+=">"+(y++)+"</a>"}}else{var r=(g.current+1)+" "+g.lang.of+" "+B}}f.get("sb-counter").innerHTML=r;u()}function j(u,s){var y=f.get("sb-wrapper"),B=f.get("sb-title"),v=f.get("sb-info"),r=f.get("sb-title-inner"),z=f.get("sb-info-inner"),A=parseInt(g.lib.getStyle(r,"height"))||0,x=parseInt(g.lib.getStyle(z,"height"))||0;var w=function(){r.style.visibility=z.style.visibility="hidden";a(s)};if(u){f.animate(B,"height",0,0.35);f.animate(v,"height",0,0.35);f.animate(y,"paddingTop",A,0.35);f.animate(y,"paddingBottom",x,0.35,w)}else{B.style.height=v.style.height="0px";y.style.paddingTop=A+"px";y.style.paddingBottom=x+"px";w()}}function l(u){var s=f.get("sb-wrapper"),w=f.get("sb-title"),v=f.get("sb-info"),z=f.get("sb-title-inner"),y=f.get("sb-info-inner"),x=parseInt(g.lib.getStyle(z,"height"))||0,r=parseInt(g.lib.getStyle(y,"height"))||0;z.style.visibility=y.style.visibility="";if(z.innerHTML!=""){f.animate(w,"height",x,0.35);f.animate(s,"paddingTop",0,0.35)}f.animate(v,"height",r,0.35);f.animate(s,"paddingBottom",0,0.35,u)}function d(u,z,y,r){var A=f.get("sb-body"),x=f.get("sb-wrapper"),w=parseInt(u),v=parseInt(z);if(y){f.animate(A,"height",w,g.options.resizeDuration);f.animate(x,"top",v,g.options.resizeDuration,r)}else{A.style.height=w+"px";x.style.top=v+"px";if(r){r()}}}function h(x,z,y,r){var v=f.get("sb-wrapper"),u=parseInt(x),t=parseInt(z);if(y){f.animate(v,"width",u,g.options.resizeDuration);f.animate(v,"left",t,g.options.resizeDuration,r)}else{v.style.width=u+"px";v.style.left=t+"px";if(r){r()}}}function p(r,u,t){var s=f.get("sb-body-inner");sw=f.get("sb-wrapper"),so=f.get("sb-overlay"),tb=sw.offsetHeight-s.offsetHeight,lr=sw.offsetWidth-s.offsetWidth,max_h=so.offsetHeight,max_w=so.offsetWidth;g.setDimensions(r,u,max_h,max_w,tb,lr,t);return g.dimensions}g.skin=o})();
if(typeof jQuery=="undefined"){throw"Unable to load Shadowbox adapter, jQuery not found"}if(typeof Shadowbox=="undefined"){throw"Unable to load Shadowbox adapter, Shadowbox not found"}(function(b,a){a.lib={getStyle:function(d,c){return b(d).css(c)},remove:function(c){b(c).remove()},getTarget:function(c){return c.target},getPageXY:function(c){return[c.pageX,c.pageY]},preventDefault:function(c){c.preventDefault()},keyCode:function(c){return c.keyCode},addEvent:function(e,c,d){b(e).bind(c,d)},removeEvent:function(e,c,d){b(e).unbind(c,d)},append:function(d,c){b(d).append(c)}}})(jQuery,Shadowbox);(function(a){a.fn.shadowbox=function(b){return this.each(function(){var d=a(this);var e=a.extend({},b||{},a.metadata?d.metadata():a.meta?d.data():{});var c=this.className||"";e.width=parseInt((c.match(/w:(\d+)/)||[])[1])||e.width;e.height=parseInt((c.match(/h:(\d+)/)||[])[1])||e.height;Shadowbox.setup(d,e)})}})(jQuery);
if(typeof Shadowbox=="undefined"){throw"Unable to load Shadowbox language file, Shadowbox not found."}Shadowbox.lang={code:"en",of:"of",loading:"loading",cancel:"Cancel",next:"Next",previous:"Previous",play:"Play",pause:"Pause",close:"Close",errors:{single:'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',shared:'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',either:'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'}};
(function(a){a.html=function(b){this.obj=b;this.height=b.height?parseInt(b.height,10):300;this.width=b.width?parseInt(b.width,10):500};a.html.prototype={append:function(b,e,c){this.id=e;var d=document.createElement("div");d.id=e;d.className="html";d.innerHTML=this.obj.content;b.appendChild(d)},remove:function(){var b=document.getElementById(this.id);if(b){a.lib.remove(b)}}}})(Shadowbox);
(function(a){a.iframe=function(c){this.obj=c;var b=document.getElementById("sb-overlay");this.height=c.height?parseInt(c.height,10):b.offsetHeight;this.width=c.width?parseInt(c.width,10):b.offsetWidth};a.iframe.prototype={append:function(b,e,d){this.id=e;var c='<iframe id="'+e+'" name="'+e+'" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" scrolling="auto"';if(a.client.isIE){c+=' allowtransparency="true"';if(a.client.isIE6){c+=" src=\"javascript:false;document.write('');\""}}c+="></iframe>";b.innerHTML=c},remove:function(){var b=document.getElementById(this.id);if(b){a.lib.remove(b);if(a.client.isGecko){delete window.frames[this.id]}}},onLoad:function(){var b=a.client.isIE?document.getElementById(this.id).contentWindow:window.frames[this.id];b.location.href=this.obj.content}}})(Shadowbox);
(function(h){var e=h.util,i,k,j="sb-drag-layer",d;function b(){i={x:0,y:0,start_x:null,start_y:null}}function c(m,o,l){if(m){b();var n=["position:absolute","height:"+o+"px","width:"+l+"px","cursor:"+(h.client.isGecko?"-moz-grab":"move"),"background-color:"+(h.client.isIE?"#fff;filter:alpha(opacity=0)":"transparent")].join(";");h.lib.append(h.skin.bodyEl(),'<div id="'+j+'" style="'+n+'"></div>');h.lib.addEvent(e.get(j),"mousedown",g)}else{var p=e.get(j);if(p){h.lib.removeEvent(p,"mousedown",g);h.lib.remove(p)}k=null}}function g(m){h.lib.preventDefault(m);var l=h.lib.getPageXY(m);i.start_x=l[0];i.start_y=l[1];k=e.get(h.contentId());h.lib.addEvent(document,"mousemove",f);h.lib.addEvent(document,"mouseup",a);if(h.client.isGecko){e.get(j).style.cursor="-moz-grabbing"}}function a(){h.lib.removeEvent(document,"mousemove",f);h.lib.removeEvent(document,"mouseup",a);if(h.client.isGecko){e.get(j).style.cursor="-moz-grab"}}function f(o){var q=h.content,p=h.dimensions,n=h.lib.getPageXY(o);var m=n[0]-i.start_x;i.start_x+=m;i.x=Math.max(Math.min(0,i.x+m),p.inner_w-q.width);k.style.left=i.x+"px";var l=n[1]-i.start_y;i.start_y+=l;i.y=Math.max(Math.min(0,i.y+l),p.inner_h-q.height);k.style.top=i.y+"px"}h.img=function(m){this.obj=m;this.resizable=true;this.ready=false;var l=this;d=new Image();d.onload=function(){l.height=m.height?parseInt(m.height,10):d.height;l.width=m.width?parseInt(m.width,10):d.width;l.ready=true;d.onload="";d=null};d.src=m.content};h.img.prototype={append:function(l,o,n){this.id=o;var m=document.createElement("img");m.id=o;m.src=this.obj.content;m.style.position="absolute";m.setAttribute("height",n.resize_h);m.setAttribute("width",n.resize_w);l.appendChild(m)},remove:function(){var l=e.get(this.id);if(l){h.lib.remove(l)}c(false);if(d){d.onload="";d=null}},onLoad:function(){var l=h.dimensions;if(l.oversized&&h.options.handleOversize=="drag"){c(true,l.resize_h,l.resize_w)}},onWindowResize:function(){if(k){var p=h.content,o=h.dimensions,n=parseInt(h.lib.getStyle(k,"top")),m=parseInt(h.lib.getStyle(k,"left"));if(n+p.height<o.inner_h){k.style.top=o.inner_h-p.height+"px"}if(m+p.width<o.inner_w){k.style.left=o.inner_w-p.width+"px"}}}}})(Shadowbox);
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var p=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,i=0,d=Object.prototype.toString,n=false;var b=function(D,t,A,v){A=A||[];var e=t=t||document;if(t.nodeType!==1&&t.nodeType!==9){return[]}if(!D||typeof D!=="string"){return A}var B=[],C,y,G,F,z,s,r=true,w=o(t);p.lastIndex=0;while((C=p.exec(D))!==null){B.push(C[1]);if(C[2]){s=RegExp.rightContext;break}}if(B.length>1&&j.exec(D)){if(B.length===2&&f.relative[B[0]]){y=g(B[0]+B[1],t)}else{y=f.relative[B[0]]?[t]:b(B.shift(),t);while(B.length){D=B.shift();if(f.relative[D]){D+=B.shift()}y=g(D,y)}}}else{if(!v&&B.length>1&&t.nodeType===9&&!w&&f.match.ID.test(B[0])&&!f.match.ID.test(B[B.length-1])){var H=b.find(B.shift(),t,w);t=H.expr?b.filter(H.expr,H.set)[0]:H.set[0]}if(t){var H=v?{expr:B.pop(),set:a(v)}:b.find(B.pop(),B.length===1&&(B[0]==="~"||B[0]==="+")&&t.parentNode?t.parentNode:t,w);y=H.expr?b.filter(H.expr,H.set):H.set;if(B.length>0){G=a(y)}else{r=false}while(B.length){var u=B.pop(),x=u;if(!f.relative[u]){u=""}else{x=B.pop()}if(x==null){x=t}f.relative[u](G,x,w)}}else{G=B=[]}}if(!G){G=y}if(!G){throw"Syntax error, unrecognized expression: "+(u||D)}if(d.call(G)==="[object Array]"){if(!r){A.push.apply(A,G)}else{if(t&&t.nodeType===1){for(var E=0;G[E]!=null;E++){if(G[E]&&(G[E]===true||G[E].nodeType===1&&h(t,G[E]))){A.push(y[E])}}}else{for(var E=0;G[E]!=null;E++){if(G[E]&&G[E].nodeType===1){A.push(y[E])}}}}}else{a(G,A)}if(s){b(s,e,A,v);b.uniqueSort(A)}return A};b.uniqueSort=function(r){if(c){n=false;r.sort(c);if(n){for(var e=1;e<r.length;e++){if(r[e]===r[e-1]){r.splice(e--,1)}}}}};b.matches=function(e,r){return b(e,null,null,r)};b.find=function(x,e,y){var w,u;if(!x){return[]}for(var t=0,s=f.order.length;t<s;t++){var v=f.order[t],u;if((u=f.match[v].exec(x))){var r=RegExp.leftContext;if(r.substr(r.length-1)!=="\\"){u[1]=(u[1]||"").replace(/\\/g,"");w=f.find[v](u,e,y);if(w!=null){x=x.replace(f.match[v],"");break}}}}if(!w){w=e.getElementsByTagName("*")}return{set:w,expr:x}};b.filter=function(A,z,D,t){var s=A,F=[],x=z,v,e,w=z&&z[0]&&o(z[0]);while(A&&z.length){for(var y in f.filter){if((v=f.match[y].exec(A))!=null){var r=f.filter[y],E,C;e=false;if(x==F){F=[]}if(f.preFilter[y]){v=f.preFilter[y](v,x,D,F,t,w);if(!v){e=E=true}else{if(v===true){continue}}}if(v){for(var u=0;(C=x[u])!=null;u++){if(C){E=r(C,v,u,x);var B=t^!!E;if(D&&E!=null){if(B){e=true}else{x[u]=false}}else{if(B){F.push(C);e=true}}}}}if(E!==undefined){if(!D){x=F}A=A.replace(f.match[y],"");if(!e){return[]}break}}}if(A==s){if(e==null){throw"Syntax error, unrecognized expression: "+A}else{break}}s=A}return x};var f=b.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")}},relative:{"+":function(x,e,w){var u=typeof e==="string",y=u&&!/\W/.test(e),v=u&&!y;if(y&&!w){e=e.toUpperCase()}for(var t=0,s=x.length,r;t<s;t++){if((r=x[t])){while((r=r.previousSibling)&&r.nodeType!==1){}x[t]=v||r&&r.nodeName===e?r||false:r===e}}if(v){b.filter(e,x,true)}},">":function(w,r,x){var u=typeof r==="string";if(u&&!/\W/.test(r)){r=x?r:r.toUpperCase();for(var s=0,e=w.length;s<e;s++){var v=w[s];if(v){var t=v.parentNode;w[s]=t.nodeName===r?t:false}}}else{for(var s=0,e=w.length;s<e;s++){var v=w[s];if(v){w[s]=u?v.parentNode:v.parentNode===r}}if(u){b.filter(r,w,true)}}},"":function(t,r,v){var s=i++,e=q;if(!r.match(/\W/)){var u=r=v?r:r.toUpperCase();e=m}e("parentNode",r,s,t,u,v)},"~":function(t,r,v){var s=i++,e=q;if(typeof r==="string"&&!r.match(/\W/)){var u=r=v?r:r.toUpperCase();e=m}e("previousSibling",r,s,t,u,v)}},find:{ID:function(r,s,t){if(typeof s.getElementById!=="undefined"&&!t){var e=s.getElementById(r[1]);return e?[e]:[]}},NAME:function(s,v,w){if(typeof v.getElementsByName!=="undefined"){var r=[],u=v.getElementsByName(s[1]);for(var t=0,e=u.length;t<e;t++){if(u[t].getAttribute("name")===s[1]){r.push(u[t])}}return r.length===0?null:r}},TAG:function(e,r){return r.getElementsByTagName(e[1])}},preFilter:{CLASS:function(t,r,s,e,w,x){t=" "+t[1].replace(/\\/g,"")+" ";if(x){return t}for(var u=0,v;(v=r[u])!=null;u++){if(v){if(w^(v.className&&(" "+v.className+" ").indexOf(t)>=0)){if(!s){e.push(v)}}else{if(s){r[u]=false}}}}return false},ID:function(e){return e[1].replace(/\\/g,"")},TAG:function(r,e){for(var s=0;e[s]===false;s++){}return e[s]&&o(e[s])?r[1]:r[1].toUpperCase()},CHILD:function(e){if(e[1]=="nth"){var r=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2]=="even"&&"2n"||e[2]=="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=(r[1]+(r[2]||1))-0;e[3]=r[3]-0}e[0]=i++;return e},ATTR:function(u,r,s,e,v,w){var t=u[1].replace(/\\/g,"");if(!w&&f.attrMap[t]){u[1]=f.attrMap[t]}if(u[2]==="~="){u[4]=" "+u[4]+" "}return u},PSEUDO:function(u,r,s,e,v){if(u[1]==="not"){if(u[3].match(p).length>1||/^\w/.test(u[3])){u[3]=b(u[3],null,null,r)}else{var t=b.filter(u[3],r,s,true^v);if(!s){e.push.apply(e,t)}return false}}else{if(f.match.POS.test(u[0])||f.match.CHILD.test(u[0])){return true}}return u},POS:function(e){e.unshift(true);return e}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden"},disabled:function(e){return e.disabled===true},checked:function(e){return e.checked===true},selected:function(e){e.parentNode.selectedIndex;return e.selected===true},parent:function(e){return !!e.firstChild},empty:function(e){return !e.firstChild},has:function(s,r,e){return !!b(e[3],s).length},header:function(e){return/h\d/i.test(e.nodeName)},text:function(e){return"text"===e.type},radio:function(e){return"radio"===e.type},checkbox:function(e){return"checkbox"===e.type},file:function(e){return"file"===e.type},password:function(e){return"password"===e.type},submit:function(e){return"submit"===e.type},image:function(e){return"image"===e.type},reset:function(e){return"reset"===e.type},button:function(e){return"button"===e.type||e.nodeName.toUpperCase()==="BUTTON"},input:function(e){return/input|select|textarea|button/i.test(e.nodeName)}},setFilters:{first:function(r,e){return e===0},last:function(s,r,e,t){return r===t.length-1},even:function(r,e){return e%2===0},odd:function(r,e){return e%2===1},lt:function(s,r,e){return r<e[3]-0},gt:function(s,r,e){return r>e[3]-0},nth:function(s,r,e){return e[3]-0==r},eq:function(s,r,e){return e[3]-0==r}},filter:{PSEUDO:function(w,s,t,x){var r=s[1],u=f.filters[r];if(u){return u(w,t,s,x)}else{if(r==="contains"){return(w.textContent||w.innerText||"").indexOf(s[3])>=0}else{if(r==="not"){var v=s[3];for(var t=0,e=v.length;t<e;t++){if(v[t]===w){return false}}return true}}}},CHILD:function(e,t){var w=t[1],r=e;switch(w){case"only":case"first":while(r=r.previousSibling){if(r.nodeType===1){return false}}if(w=="first"){return true}r=e;case"last":while(r=r.nextSibling){if(r.nodeType===1){return false}}return true;case"nth":var s=t[2],z=t[3];if(s==1&&z==0){return true}var v=t[0],y=e.parentNode;if(y&&(y.sizcache!==v||!e.nodeIndex)){var u=0;for(r=y.firstChild;r;r=r.nextSibling){if(r.nodeType===1){r.nodeIndex=++u}}y.sizcache=v}var x=e.nodeIndex-z;if(s==0){return x==0}else{return(x%s==0&&x/s>=0)}}},ID:function(r,e){return r.nodeType===1&&r.getAttribute("id")===e},TAG:function(r,e){return(e==="*"&&r.nodeType===1)||r.nodeName===e},CLASS:function(r,e){return(" "+(r.className||r.getAttribute("class"))+" ").indexOf(e)>-1},ATTR:function(v,t){var s=t[1],e=f.attrHandle[s]?f.attrHandle[s](v):v[s]!=null?v[s]:v.getAttribute(s),w=e+"",u=t[2],r=t[4];return e==null?u==="!=":u==="="?w===r:u==="*="?w.indexOf(r)>=0:u==="~="?(" "+w+" ").indexOf(r)>=0:!r?w&&e!==false:u==="!="?w!=r:u==="^="?w.indexOf(r)===0:u==="$="?w.substr(w.length-r.length)===r:u==="|="?w===r||w.substr(0,r.length+1)===r+"-":false},POS:function(u,r,s,v){var e=r[2],t=f.setFilters[e];if(t){return t(u,s,r,v)}}}};var j=f.match.POS;for(var l in f.match){f.match[l]=new RegExp(f.match[l].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var a=function(r,e){r=Array.prototype.slice.call(r);if(e){e.push.apply(e,r);return e}return r};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(k){a=function(u,t){var r=t||[];if(d.call(u)==="[object Array]"){Array.prototype.push.apply(r,u)}else{if(typeof u.length==="number"){for(var s=0,e=u.length;s<e;s++){r.push(u[s])}}else{for(var s=0;u[s];s++){r.push(u[s])}}}return r}}var c;if(document.documentElement.compareDocumentPosition){c=function(r,e){var s=r.compareDocumentPosition(e)&4?-1:r===e?0:1;if(s===0){n=true}return s}}else{if("sourceIndex" in document.documentElement){c=function(r,e){var s=r.sourceIndex-e.sourceIndex;if(s===0){n=true}return s}}else{if(document.createRange){c=function(t,r){var s=t.ownerDocument.createRange(),e=r.ownerDocument.createRange();s.selectNode(t);s.collapse(true);e.selectNode(r);e.collapse(true);var u=s.compareBoundaryPoints(Range.START_TO_END,e);if(u===0){n=true}return u}}}}(function(){var r=document.createElement("div"),s="script"+(new Date).getTime();r.innerHTML="<a name='"+s+"'/>";var e=document.documentElement;e.insertBefore(r,e.firstChild);if(!!document.getElementById(s)){f.find.ID=function(u,v,w){if(typeof v.getElementById!=="undefined"&&!w){var t=v.getElementById(u[1]);return t?t.id===u[1]||typeof t.getAttributeNode!=="undefined"&&t.getAttributeNode("id").nodeValue===u[1]?[t]:undefined:[]}};f.filter.ID=function(v,t){var u=typeof v.getAttributeNode!=="undefined"&&v.getAttributeNode("id");return v.nodeType===1&&u&&u.nodeValue===t}}e.removeChild(r)})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){f.find.TAG=function(r,v){var u=v.getElementsByTagName(r[1]);if(r[1]==="*"){var t=[];for(var s=0;u[s];s++){if(u[s].nodeType===1){t.push(u[s])}}u=t}return u}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){f.attrHandle.href=function(r){return r.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var e=b,s=document.createElement("div");s.innerHTML="<p class='TEST'></p>";if(s.querySelectorAll&&s.querySelectorAll(".TEST").length===0){return}b=function(w,v,t,u){v=v||document;if(!u&&v.nodeType===9&&!o(v)){try{return a(v.querySelectorAll(w),t)}catch(x){}}return e(w,v,t,u)};for(var r in e){b[r]=e[r]}})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var e=document.createElement("div");e.innerHTML="<div class='test e'></div><div class='test'></div>";if(e.getElementsByClassName("e").length===0){return}e.lastChild.className="e";if(e.getElementsByClassName("e").length===1){return}f.order.splice(1,0,"CLASS");f.find.CLASS=function(r,s,t){if(typeof s.getElementsByClassName!=="undefined"&&!t){return s.getElementsByClassName(r[1])}}})()}function m(r,w,v,A,x,z){var y=r=="previousSibling"&&!z;for(var t=0,s=A.length;t<s;t++){var e=A[t];if(e){if(y&&e.nodeType===1){e.sizcache=v;e.sizset=t}e=e[r];var u=false;while(e){if(e.sizcache===v){u=A[e.sizset];break}if(e.nodeType===1&&!z){e.sizcache=v;e.sizset=t}if(e.nodeName===w){u=e;break}e=e[r]}A[t]=u}}}function q(r,w,v,A,x,z){var y=r=="previousSibling"&&!z;for(var t=0,s=A.length;t<s;t++){var e=A[t];if(e){if(y&&e.nodeType===1){e.sizcache=v;e.sizset=t}e=e[r];var u=false;while(e){if(e.sizcache===v){u=A[e.sizset];break}if(e.nodeType===1){if(!z){e.sizcache=v;e.sizset=t}if(typeof w!=="string"){if(e===w){u=true;break}}else{if(b.filter(w,[e]).length>0){u=e;break}}}e=e[r]}A[t]=u}}}var h=document.compareDocumentPosition?function(r,e){return r.compareDocumentPosition(e)&16}:function(r,e){return r!==e&&(r.contains?r.contains(e):true)};var o=function(e){return e.nodeType===9&&e.documentElement.nodeName!=="HTML"||!!e.ownerDocument&&e.ownerDocument.documentElement.nodeName!=="HTML"};var g=function(e,x){var t=[],u="",v,s=x.nodeType?[x]:x;while((v=f.match.PSEUDO.exec(e))){u+=v[0];e=e.replace(f.match.PSEUDO,"")}e=f.relative[e]?e+"*":e;for(var w=0,r=s.length;w<r;w++){b(e,s[w],t)}return b.filter(u,t)};window.Sizzle=b})();
Shadowbox.options.players=["html","iframe","img"];
Shadowbox.options.useSizzle=true;


//  FIXME
//  CgCommunity does NOT use this file for jquery plugins!
//  Until fixed you must copy stuff into app/assets/javascripts/cg_community/jquery.plugins.js too
//  Fix is to break this file up into individula plugins files and let teh asset pipeline deal with them such that all apps share


/****************************************************************************************************************************************************************

Form Hint

****************************************************************************************************************************************************************/


jQuery.fn.formHint = function (conf) {
    var config = jQuery.extend({
        formControls:    'input[title], textarea',
        formExceptions:  '#editor1',
        formSelects:     'input:checkbox, input:radio, select',
        className:       'blur'
    }, conf);

    return this.each(function () {
        jQuery(config.formControls, this).not(config.formExceptions).each(function () {
          var t = jQuery(this);

            t.formHint = t.attr('title') ? t.attr('title') : t.data('hint');
            t.data('hint', t.formHint);
            t.attr('title', '');

			// Store hints and original values for input fields
            if (t.val() === '' || t.val() == t.formHint) {
                t.addClass(config.className).val(t.formHint);
            } else {
				      t.data('origValue', t.val());
			      }

            //Here browser trying to trigger the focus and blur events synchronously which is causing to blur the input text,
            //to avoid this setTimeout is required to process the blur event, before the focus event triggers.

            t.focus(function () {
                if (t.val() === '' || t.val() == t.formHint){
                    setTimeout(function(){
                    	t.val('').removeClass(config.className);
                    }, 5);
                }
            });

            t.blur(function () {
                if (t.val() === '' || t.val() == t.formHint) {
                    t.addClass(config.className).val(t.formHint);
                }
            });
        });

		// Store the original values for selects, checkboxes and radios
        jQuery(config.formSelects, this).each(function () {
			if (jQuery(this).is('select')) {
				jQuery(this).data('origValue', jQuery(this).val());
			} else if (jQuery(this).is(':checked')) {
				jQuery(this).data('origValue', 'checked');
			}
		});

        // Remove hints on form submission
        jQuery('form', this).submit(function () {
            jQuery('.' + config.className, this).removeClass(config.className).val('');
        });

        // Restore CKEditor contents on form reset
        if (jQuery('form iframe', this).length) {
            jQuery('form iframe', this).each(function () {
                var t = jQuery(this);
                t.data('CKEContent', t.contents().find('body').html());
                t.closest('form').find('button:reset').bind('click', function () {
                    t.contents().find('body').html(t.data('CKEContent'));
                });
            });
        }

        jQuery(this).find('button:reset').bind('click', function (e) {
            var form = jQuery(this).closest('form');
            e.preventDefault();

			// Restore hints on form reset
            jQuery(config.formControls, form).each(function () {
				var t = jQuery(this);
				if (t.data('origValue')) {
					t.removeClass(config.className).val(t.data('origValue'));
				} else {
					t.addClass(config.className).val(t.data('hint'));
				}
            });

			// Restore selects, checkboxes and radios to the original value
            jQuery(config.formSelects, form).each(function () {
				var t = jQuery(this);
				if (t.is('select')) {
					t.val(t.data('origValue'));
				}
				else if (t.data('origValue') && !t.attr('checked')) {
					t.attr('checked', true).click().attr('checked', true);
				}
				else if (!t.data('origValue') && t.attr('checked')) {
					t.removeAttr('checked').click().removeAttr('checked');
				}
			});

			// Clear validation errors
			form.find('label.error').hide();
			form.find('*').removeClass('error');

        });
    });
};


/****************************************************************************************************************************************************************

Resize (min)

****************************************************************************************************************************************************************/

/*
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);



/****************************************************************************************************************************************************************

Metadata (min)

****************************************************************************************************************************************************************/

/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jï¿½Ã¶rn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 3620 2007-10-10 20:55:38Z pmclanahan $
 *
 */
(function($){$.extend({metadata:{defaults:{type:'class',name:'metadata',cre:/({.*})/,single:'metadata'},setType:function(type,name){this.defaults.type=type;this.defaults.name=name;},get:function(elem,opts){var settings=$.extend({},this.defaults,opts);if(!settings.single.length)settings.single='metadata';var data=$.data(elem,settings.single);if(data)return data;data="{}";if(settings.type=="class"){var m=settings.cre.exec(elem.className);if(m)data=m[1];}else if(settings.type=="elem"){if(!elem.getElementsByTagName)return;var e=elem.getElementsByTagName(settings.name);if(e.length)data=$.trim(e[0].innerHTML);}else if(elem.getAttribute!=undefined){var attr=elem.getAttribute(settings.name);if(attr)data=attr;}if(data.indexOf('{')<0)data="{"+data+"}";data=eval("("+data+")");$.data(elem,settings.single,data);return data;}}});$.fn.metadata=function(opts){return $.metadata.get(this[0],opts);};})(jQuery);

/****************************************************************************************************************************************************************

Character Counter

****************************************************************************************************************************************************************/

/*
 * Character Counter
 *
 * Version: 1.0
 * Modified From: jquery.dodosTextCounter
 * Author: Poccuo (http://www.poccuo.com)
 *
 */

jQuery.fn.dodosTextCounter = function(max, options) {

	options = $.extend({
		counterDisplayElement: "div",
		counterDisplayClass: "blip_counter",
		addLineBreak: true
	}, options);

	$(this).each(function(i) {
		updateCounter(this, max, options, i);
		$(this).keydown(function() {
			updateCounter(this, max, options, i);
			return this;
		});
		$(this).keyup(function() {
			updateCounter(this, max, options, i);
			return this;
		});
		$(this).mouseout(function() {
			updateCounter(this, max, options, i);
			return this;
		});		
		$(this).mouseleave(function() {
			updateCounter(this, max, options, i);
			return this;
		});		
		$(this).mouseup(function() {
			updateCounter(this, max, options, i);
			return this;
		});		
		$(this).change(function() {
			updateCounter(this, max, options, i);
			return this;
		});		
		
	});
	return this;
};

function updateCounter(input, max, options, index) {
	var currentLength = 0;
	var val = $(input).val();
	
	if(val) {
		currentLength = val.length;
	}
	if(currentLength > max) {
		$(input).val(val.substring(0, max));
		updateDisplayCounter(input, max, $(input).val().length, options, index);
	} else {
		updateDisplayCounter(input, max, currentLength, options, index);
	}
}

function updateDisplayCounter(input, max, currentLength, options, index) {
     var charLeft = "<p><strong>" + (max - currentLength) + "</strong> characters remaining</p>";
	 var counterDisplay = options.counterDisplayElement + "." + options.counterDisplayClass + ":eq("+index+")";
	 var createNew = $(counterDisplay).length == 0;
		if(createNew) {
			var element = document.createElement(options.counterDisplayElement);
			if(options.counterDisplayElement == 'input') {
				$(element).val(charLeft.toString());
			} else {
				$(element).html(charLeft.toString());
			}
			$(element).addClass(options.counterDisplayClass).insertAfter($(input));
			if(options.addLineBreak) {
				$(input).after("<br />");
			}
		} else {
			if(options.counterDisplayElement == 'input') {
				$(counterDisplay).val(charLeft.toString());
			} else {
				$(counterDisplay).html(charLeft.toString());
			}
		}
		
}

/****************************************************************************************************************************************************************
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
!function(){"use strict";function e(e){function t(t,n){var s,h,k=t==window,y=n&&void 0!==n.message?n.message:void 0;if(n=e.extend({},e.blockUI.defaults,n||{}),!n.ignoreIfBlocked||!e(t).data("blockUI.isBlocked")){if(n.overlayCSS=e.extend({},e.blockUI.defaults.overlayCSS,n.overlayCSS||{}),s=e.extend({},e.blockUI.defaults.css,n.css||{}),n.onOverlayClick&&(n.overlayCSS.cursor="pointer"),h=e.extend({},e.blockUI.defaults.themedCSS,n.themedCSS||{}),y=void 0===y?n.message:y,k&&p&&o(window,{fadeOut:0}),y&&"string"!=typeof y&&(y.parentNode||y.jquery)){var m=y.jquery?y[0]:y,v={};e(t).data("blockUI.history",v),v.el=m,v.parent=m.parentNode,v.display=m.style.display,v.position=m.style.position,v.parent&&v.parent.removeChild(m)}e(t).data("blockUI.onUnblock",n.onUnblock);var g,I,w,U,x=n.baseZ;g=e(r||n.forceIframe?'<iframe class="blockUI" style="z-index:'+x++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+n.iframeSrc+'"></iframe>':'<div class="blockUI" style="display:none"></div>'),I=e(n.theme?'<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+x++ +';display:none"></div>':'<div class="blockUI blockOverlay" style="z-index:'+x++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),n.theme&&k?(U='<div class="blockUI '+n.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(x+10)+';display:none;position:fixed">',n.title&&(U+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(n.title||"&nbsp;")+"</div>"),U+='<div class="ui-widget-content ui-dialog-content"></div>',U+="</div>"):n.theme?(U='<div class="blockUI '+n.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(x+10)+';display:none;position:absolute">',n.title&&(U+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(n.title||"&nbsp;")+"</div>"),U+='<div class="ui-widget-content ui-dialog-content"></div>',U+="</div>"):U=k?'<div class="blockUI '+n.blockMsgClass+' blockPage" style="z-index:'+(x+10)+';display:none;position:fixed"></div>':'<div class="blockUI '+n.blockMsgClass+' blockElement" style="z-index:'+(x+10)+';display:none;position:absolute"></div>',w=e(U),y&&(n.theme?(w.css(h),w.addClass("ui-widget-content")):w.css(s)),n.theme||I.css(n.overlayCSS),I.css("position",k?"fixed":"absolute"),(r||n.forceIframe)&&g.css("opacity",0);var C=[g,I,w],S=e(k?"body":t);e.each(C,function(){this.appendTo(S)}),n.theme&&n.draggable&&e.fn.draggable&&w.draggable({handle:".ui-dialog-titlebar",cancel:"li"});var O=f&&(!e.support.boxModel||e("object,embed",k?null:t).length>0);if(u||O){if(k&&n.allowBodyStretch&&e.support.boxModel&&e("html,body").css("height","100%"),(u||!e.support.boxModel)&&!k)var E=d(t,"borderTopWidth"),T=d(t,"borderLeftWidth"),M=E?"(0 - "+E+")":0,B=T?"(0 - "+T+")":0;e.each(C,function(e,t){var o=t[0].style;if(o.position="absolute",2>e)k?o.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+n.quirksmodeOffsetHack+') + "px"'):o.setExpression("height",'this.parentNode.offsetHeight + "px"'),k?o.setExpression("width",'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):o.setExpression("width",'this.parentNode.offsetWidth + "px"'),B&&o.setExpression("left",B),M&&o.setExpression("top",M);else if(n.centerY)k&&o.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),o.marginTop=0;else if(!n.centerY&&k){var i=n.css&&n.css.top?parseInt(n.css.top,10):0,s="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+i+') + "px"';o.setExpression("top",s)}})}if(y&&(n.theme?w.find(".ui-widget-content").append(y):w.append(y),(y.jquery||y.nodeType)&&e(y).show()),(r||n.forceIframe)&&n.showOverlay&&g.show(),n.fadeIn){var j=n.onBlock?n.onBlock:c,H=n.showOverlay&&!y?j:c,z=y?j:c;n.showOverlay&&I._fadeIn(n.fadeIn,H),y&&w._fadeIn(n.fadeIn,z)}else n.showOverlay&&I.show(),y&&w.show(),n.onBlock&&n.onBlock.bind(w)();if(i(1,t,n),k?(p=w[0],b=e(n.focusableElements,p),n.focusInput&&setTimeout(l,20)):a(w[0],n.centerX,n.centerY),n.timeout){var W=setTimeout(function(){k?e.unblockUI(n):e(t).unblock(n)},n.timeout);e(t).data("blockUI.timeout",W)}}}function o(t,o){var s,l=t==window,a=e(t),d=a.data("blockUI.history"),c=a.data("blockUI.timeout");c&&(clearTimeout(c),a.removeData("blockUI.timeout")),o=e.extend({},e.blockUI.defaults,o||{}),i(0,t,o),null===o.onUnblock&&(o.onUnblock=a.data("blockUI.onUnblock"),a.removeData("blockUI.onUnblock"));var r;r=l?e("body").children().filter(".blockUI").add("body > .blockUI"):a.find(">.blockUI"),o.cursorReset&&(r.length>1&&(r[1].style.cursor=o.cursorReset),r.length>2&&(r[2].style.cursor=o.cursorReset)),l&&(p=b=null),o.fadeOut?(s=r.length,r.stop().fadeOut(o.fadeOut,function(){0===--s&&n(r,d,o,t)})):n(r,d,o,t)}function n(t,o,n,i){var s=e(i);if(!s.data("blockUI.isBlocked")){t.each(function(){this.parentNode&&this.parentNode.removeChild(this)}),o&&o.el&&(o.el.style.display=o.display,o.el.style.position=o.position,o.el.style.cursor="default",o.parent&&o.parent.appendChild(o.el),s.removeData("blockUI.history")),s.data("blockUI.static")&&s.css("position","static"),"function"==typeof n.onUnblock&&n.onUnblock(i,n);var l=e(document.body),a=l.width(),d=l[0].style.width;l.width(a-1).width(a),l[0].style.width=d}}function i(t,o,n){var i=o==window,l=e(o);if((t||(!i||p)&&(i||l.data("blockUI.isBlocked")))&&(l.data("blockUI.isBlocked",t),i&&n.bindEvents&&(!t||n.showOverlay))){var a="mousedown mouseup keydown keypress keyup touchstart touchend touchmove";t?e(document).bind(a,n,s):e(document).unbind(a,s)}}function s(t){if("keydown"===t.type&&t.keyCode&&9==t.keyCode&&p&&t.data.constrainTabKey){var o=b,n=!t.shiftKey&&t.target===o[o.length-1],i=t.shiftKey&&t.target===o[0];if(n||i)return setTimeout(function(){l(i)},10),!1}var s=t.data,a=e(t.target);return a.hasClass("blockOverlay")&&s.onOverlayClick&&s.onOverlayClick(t),a.parents("div."+s.blockMsgClass).length>0?!0:0===a.parents().children().filter("div.blockUI").length}function l(e){if(b){var t=b[e===!0?b.length-1:0];t&&t.focus()}}function a(e,t,o){var n=e.parentNode,i=e.style,s=(n.offsetWidth-e.offsetWidth)/2-d(n,"borderLeftWidth"),l=(n.offsetHeight-e.offsetHeight)/2-d(n,"borderTopWidth");t&&(i.left=s>0?s+"px":"0"),o&&(i.top=l>0?l+"px":"0")}function d(t,o){return parseInt(e.css(t,o),10)||0}e.fn._fadeIn=e.fn.fadeIn;var c=e.noop||function(){},r=/MSIE/.test(navigator.userAgent),u=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent),f=(document.documentMode||0,e.isFunction(document.createElement("div").style.setExpression));e.blockUI=function(e){t(window,e)},e.unblockUI=function(e){o(window,e)},e.growlUI=function(t,o,n,i){var s=e('<div class="growlUI"></div>');t&&s.append("<h1>"+t+"</h1>"),o&&s.append("<h2>"+o+"</h2>"),void 0===n&&(n=3e3);var l=function(t){t=t||{},e.blockUI({message:s,fadeIn:"undefined"!=typeof t.fadeIn?t.fadeIn:700,fadeOut:"undefined"!=typeof t.fadeOut?t.fadeOut:1e3,timeout:"undefined"!=typeof t.timeout?t.timeout:n,centerY:!1,showOverlay:!1,onUnblock:i,css:e.blockUI.defaults.growlCSS})};l();s.css("opacity");s.mouseover(function(){l({fadeIn:0,timeout:3e4});var t=e(".blockMsg");t.stop(),t.fadeTo(300,1)}).mouseout(function(){e(".blockMsg").fadeOut(1e3)})},e.fn.block=function(o){if(this[0]===window)return e.blockUI(o),this;var n=e.extend({},e.blockUI.defaults,o||{});return this.each(function(){var t=e(this);n.ignoreIfBlocked&&t.data("blockUI.isBlocked")||t.unblock({fadeOut:0})}),this.each(function(){"static"==e.css(this,"position")&&(this.style.position="relative",e(this).data("blockUI.static",!0)),this.style.zoom=1,t(this,o)})},e.fn.unblock=function(t){return this[0]===window?(e.unblockUI(t),this):this.each(function(){o(this,t)})},e.blockUI.version=2.7,e.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:!0,theme:!1,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:!1,baseZ:1e3,centerX:!0,centerY:!0,allowBodyStretch:!0,bindEvents:!0,constrainTabKey:!0,fadeIn:200,fadeOut:400,timeout:0,showOverlay:!0,focusInput:!0,focusableElements:":input:enabled:visible",onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:!1};var p=null,b=[]}"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],e):e(jQuery)}();
/****************************************************************************************************************************************************************

Tablesorter (min)

****************************************************************************************************************************************************************/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&"object"==typeof module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){return function(a){"use strict";a.extend({tablesorter:new function(){function b(){var a=arguments[0],b=arguments.length>1?Array.prototype.slice.call(arguments):a;"undefined"!=typeof console&&"undefined"!=typeof console.log?console[/error/i.test(a)?"error":/warn/i.test(a)?"warn":"log"](b):alert(b)}function c(a,c){b(a+" ("+((new Date).getTime()-c.getTime())+"ms)")}function d(a){for(var b in a)return!1;return!0}function e(c,d,e,f){for(var g,h,i=c.config,j=u.parsers.length,k=!1,l="",m=!0;""===l&&m;)e++,d[e]?(k=d[e].cells[f],l=u.getElementText(i,k,f),h=a(k),c.config.debug&&b("Checking if value was empty on row "+e+", column: "+f+': "'+l+'"')):m=!1;for(;--j>=0;)if(g=u.parsers[j],g&&"text"!==g.id&&g.is&&g.is(l,c,k,h))return g;return u.getParserById("text")}function f(a){var d,f,g,h,i,j,k,l,m,n,o=a.config,p=o.$tbodies=o.$table.children("tbody:not(."+o.cssInfoBlock+")"),q=0,r="",s=p.length;if(0===s)return o.debug?b("Warning: *Empty table!* Not building a parser cache"):"";for(o.debug&&(n=new Date,b("Detecting parsers for each column")),f={extractors:[],parsers:[]};s>q;){if(d=p[q].rows,d.length)for(g=o.columns,h=0;g>h;h++)i=o.$headerIndexed[h],j=u.getColumnData(a,o.headers,h),m=u.getParserById(u.getData(i,j,"extractor")),l=u.getParserById(u.getData(i,j,"sorter")),k="false"===u.getData(i,j,"parser"),o.empties[h]=(u.getData(i,j,"empty")||o.emptyTo||(o.emptyToBottom?"bottom":"top")).toLowerCase(),o.strings[h]=(u.getData(i,j,"string")||o.stringTo||"max").toLowerCase(),k&&(l=u.getParserById("no-parser")),m||(m=!1),l||(l=e(a,d,-1,h)),o.debug&&(r+="column:"+h+"; extractor:"+m.id+"; parser:"+l.id+"; string:"+o.strings[h]+"; empty: "+o.empties[h]+"\n"),f.parsers[h]=l,f.extractors[h]=m;q+=f.parsers.length?s:1}o.debug&&(b(r?r:"No parsers detected"),c("Completed detecting parsers",n)),o.parsers=f.parsers,o.extractors=f.extractors}function g(d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r=d.config,s=r.$tbodies,t=r.extractors,v=r.parsers;if(r.cache={},r.totalRows=0,!v)return r.debug?b("Warning: *Empty table!* Not building a cache"):"";for(r.debug&&(n=new Date),r.showProcessing&&u.isProcessing(d,!0),k=0;k<s.length;k++){for(q=[],e=r.cache[k]={normalized:[]},o=s[k]&&s[k].rows.length||0,i=0;o>i;++i)if(p={child:[],raw:[]},l=a(s[k].rows[i]),m=[],l.hasClass(r.cssChildRow)&&0!==i)f=e.normalized.length-1,e.normalized[f][r.columns].$row=e.normalized[f][r.columns].$row.add(l),l.prev().hasClass(r.cssChildRow)||l.prev().addClass(u.css.cssHasChild),p.child[f]=a.trim(l[0].textContent||l.text()||"");else{for(p.$row=l,p.order=i,j=0;j<r.columns;++j)"undefined"!=typeof v[j]?(f=u.getElementText(r,l[0].cells[j],j),p.raw.push(f),g="undefined"==typeof t[j].id?f:t[j].format(f,d,l[0].cells[j],j),h="no-parser"===v[j].id?"":v[j].format(g,d,l[0].cells[j],j),m.push(r.ignoreCase&&"string"==typeof h?h.toLowerCase():h),"numeric"===(v[j].type||"").toLowerCase()&&(q[j]=Math.max(Math.abs(h)||0,q[j]||0))):r.debug&&b("No parser found for cell:",l[0].cells[j],"does it have a header?");m[r.columns]=p,e.normalized.push(m)}e.colMax=q,r.totalRows+=e.normalized.length}r.showProcessing&&u.isProcessing(d),r.debug&&c("Building cache for "+o+" rows",n)}function h(a,b){var e,f,g,h,i,j,k,l=a.config,m=l.widgetOptions,n=l.$tbodies,o=[],p=l.cache;if(d(p))return l.appender?l.appender(a,o):a.isUpdating?l.$table.trigger("updateComplete",a):"";for(l.debug&&(k=new Date),j=0;j<n.length;j++)if(g=n.eq(j),g.length){for(h=u.processTbody(a,g,!0),e=p[j].normalized,f=e.length,i=0;f>i;i++)o.push(e[i][l.columns].$row),l.appender&&(!l.pager||l.pager.removeRows&&m.pager_removeRows||l.pager.ajax)||h.append(e[i][l.columns].$row);u.processTbody(a,h,!1)}l.appender&&l.appender(a,o),l.debug&&c("Rebuilt table",k),b||l.appender||u.applyWidget(a),a.isUpdating&&l.$table.trigger("updateComplete",a)}function i(a){return/^d/i.test(a)||1===a}function j(d){var e,f,g,h,j,k,m,n,o=d.config;for(o.headerList=[],o.headerContent=[],o.debug&&(m=new Date),o.columns=u.computeColumnIndex(o.$table.children("thead, tfoot").children("tr")),h=o.cssIcon?'<i class="'+(o.cssIcon===u.css.icon?u.css.icon:o.cssIcon+" "+u.css.icon)+'"></i>':"",o.$headers=a(a.map(a(d).find(o.selectorHeaders),function(b,c){return f=a(b),f.parent().hasClass(o.cssIgnoreRow)?void 0:(e=u.getColumnData(d,o.headers,c,!0),o.headerContent[c]=f.html(),""===o.headerTemplate||f.find("."+u.css.headerIn).length||(j=o.headerTemplate.replace(/\{content\}/g,f.html()).replace(/\{icon\}/g,f.find("."+u.css.icon).length?"":h),o.onRenderTemplate&&(g=o.onRenderTemplate.apply(f,[c,j]),g&&"string"==typeof g&&(j=g)),f.html('<div class="'+u.css.headerIn+'">'+j+"</div>")),o.onRenderHeader&&o.onRenderHeader.apply(f,[c,o,o.$table]),b.column=parseInt(f.attr("data-column"),10),b.order=i(u.getData(f,e,"sortInitialOrder")||o.sortInitialOrder)?[1,0,2]:[0,1,2],b.count=-1,b.lockedOrder=!1,k=u.getData(f,e,"lockedOrder")||!1,"undefined"!=typeof k&&k!==!1&&(b.order=b.lockedOrder=i(k)?[1,1,1]:[0,0,0]),f.addClass(u.css.header+" "+o.cssHeader),o.headerList[c]=b,f.parent().addClass(u.css.headerRow+" "+o.cssHeaderRow).attr("role","row"),o.tabIndex&&f.attr("tabindex",0),b)})),o.$headerIndexed=[],n=0;n<o.columns;n++)f=o.$headers.filter('[data-column="'+n+'"]'),o.$headerIndexed[n]=f.not(".sorter-false").length?f.not(".sorter-false").filter(":last"):f.filter(":last");a(d).find(o.selectorHeaders).attr({scope:"col",role:"columnheader"}),l(d),o.debug&&(c("Built headers:",m),b(o.$headers))}function k(a,b,c){var d=a.config;d.$table.find(d.selectorRemove).remove(),f(a),g(a),s(d,b,c)}function l(b){var c,d,e,f=b.config;f.$headers.each(function(g,h){d=a(h),e=u.getColumnData(b,f.headers,g,!0),c="false"===u.getData(h,e,"sorter")||"false"===u.getData(h,e,"parser"),h.sortDisabled=c,d[c?"addClass":"removeClass"]("sorter-false").attr("aria-disabled",""+c),b.id&&(c?d.removeAttr("aria-controls"):d.attr("aria-controls",b.id))})}function m(b){var c,d,e,f=b.config,g=f.sortList,h=g.length,i=u.css.sortNone+" "+f.cssNone,j=[u.css.sortAsc+" "+f.cssAsc,u.css.sortDesc+" "+f.cssDesc],k=[f.cssIconAsc,f.cssIconDesc,f.cssIconNone],l=["ascending","descending"],m=a(b).find("tfoot tr").children().add(a(f.namespace+"_extra_headers")).removeClass(j.join(" "));for(f.$headers.removeClass(j.join(" ")).addClass(i).attr("aria-sort","none").find("."+u.css.icon).removeClass(k.join(" ")).addClass(k[2]),d=0;h>d;d++)if(2!==g[d][1]&&(c=f.$headers.not(".sorter-false").filter('[data-column="'+g[d][0]+'"]'+(1===h?":last":"")),c.length)){for(e=0;e<c.length;e++)c[e].sortDisabled||c.eq(e).removeClass(i).addClass(j[g[d][1]]).attr("aria-sort",l[g[d][1]]).find("."+u.css.icon).removeClass(k[2]).addClass(k[g[d][1]]);m.length&&m.filter('[data-column="'+g[d][0]+'"]').removeClass(i).addClass(j[g[d][1]])}f.$headers.not(".sorter-false").each(function(){var b=a(this),c=this.order[(this.count+1)%(f.sortReset?3:2)],d=a.trim(b.text())+": "+u.language[b.hasClass(u.css.sortAsc)?"sortAsc":b.hasClass(u.css.sortDesc)?"sortDesc":"sortNone"]+u.language[0===c?"nextAsc":1===c?"nextDesc":"nextNone"];b.attr("aria-label",d)})}function n(b,c){var d,e,f,g,h,i,j,k,l=b.config,m=c||l.sortList,n=m.length;for(l.sortList=[],h=0;n>h;h++)if(k=m[h],d=parseInt(k[0],10),g=l.$headerIndexed[d][0]){switch(e=(""+k[1]).match(/^(1|d|s|o|n)/),e=e?e[0]:""){case"1":case"d":e=1;break;case"s":e=i||0;break;case"o":j=g.order[(i||0)%(l.sortReset?3:2)],e=0===j?1:1===j?0:2;break;case"n":g.count=g.count+1,e=g.order[g.count%(l.sortReset?3:2)];break;default:e=0}i=0===h?e:i,f=[d,parseInt(e,10)||0],l.sortList.push(f),e=a.inArray(f[1],g.order),g.count=e>=0?e:f[1]%(l.sortReset?3:2)}}function o(a,b){return a&&a[b]?a[b].type||"":""}function p(b,c,d){if(b.isUpdating)return setTimeout(function(){p(b,c,d)},50);var e,f,g,i,j,k=b.config,l=!d[k.sortMultiSortKey],n=k.$table;if(n.trigger("sortStart",b),c.count=d[k.sortResetKey]?2:(c.count+1)%(k.sortReset?3:2),k.sortRestart&&(f=c,k.$headers.each(function(){this===f||!l&&a(this).is("."+u.css.sortDesc+",."+u.css.sortAsc)||(this.count=-1)})),f=parseInt(a(c).attr("data-column"),10),l){if(k.sortList=[],null!==k.sortForce)for(e=k.sortForce,g=0;g<e.length;g++)e[g][0]!==f&&k.sortList.push(e[g]);if(i=c.order[c.count],2>i&&(k.sortList.push([f,i]),c.colSpan>1))for(g=1;g<c.colSpan;g++)k.sortList.push([f+g,i])}else{if(k.sortAppend&&k.sortList.length>1)for(g=0;g<k.sortAppend.length;g++)j=u.isValueInArray(k.sortAppend[g][0],k.sortList),j>=0&&k.sortList.splice(j,1);if(u.isValueInArray(f,k.sortList)>=0)for(g=0;g<k.sortList.length;g++)j=k.sortList[g],i=k.$headerIndexed[j[0]][0],j[0]===f&&(j[1]=i.order[c.count],2===j[1]&&(k.sortList.splice(g,1),i.count=-1));else if(i=c.order[c.count],2>i&&(k.sortList.push([f,i]),c.colSpan>1))for(g=1;g<c.colSpan;g++)k.sortList.push([f+g,i])}if(null!==k.sortAppend)for(e=k.sortAppend,g=0;g<e.length;g++)e[g][0]!==f&&k.sortList.push(e[g]);n.trigger("sortBegin",b),setTimeout(function(){m(b),q(b),h(b),n.trigger("sortEnd",b)},1)}function q(a){var b,e,f,g,h,i,j,k,l,m,n,p=0,q=a.config,r=q.textSorter||"",s=q.sortList,t=s.length,v=q.$tbodies.length;if(!q.serverSideSorting&&!d(q.cache)){for(q.debug&&(h=new Date),e=0;v>e;e++)i=q.cache[e].colMax,j=q.cache[e].normalized,j.sort(function(c,d){for(b=0;t>b;b++){if(g=s[b][0],k=s[b][1],p=0===k,q.sortStable&&c[g]===d[g]&&1===t)return c[q.columns].order-d[q.columns].order;if(f=/n/i.test(o(q.parsers,g)),f&&q.strings[g]?(f="boolean"==typeof q.string[q.strings[g]]?(p?1:-1)*(q.string[q.strings[g]]?-1:1):q.strings[g]?q.string[q.strings[g]]||0:0,l=q.numberSorter?q.numberSorter(c[g],d[g],p,i[g],a):u["sortNumeric"+(p?"Asc":"Desc")](c[g],d[g],f,i[g],g,a)):(m=p?c:d,n=p?d:c,l="function"==typeof r?r(m[g],n[g],p,g,a):"object"==typeof r&&r.hasOwnProperty(g)?r[g](m[g],n[g],p,g,a):u["sortNatural"+(p?"Asc":"Desc")](c[g],d[g],g,a,q)),l)return l}return c[q.columns].order-d[q.columns].order});q.debug&&c("Sorting on "+s.toString()+" and dir "+k+" time",h)}}function r(b,c){b.table.isUpdating&&b.$table.trigger("updateComplete",b.table),a.isFunction(c)&&c(b.table)}function s(b,c,d){var e=a.isArray(c)?c:b.sortList,f="undefined"==typeof c?b.resort:c;f===!1||b.serverSideSorting||b.table.isProcessing?(r(b,d),u.applyWidget(b.table,!1)):e.length?b.$table.trigger("sorton",[e,function(){r(b,d)},!0]):b.$table.trigger("sortReset",[function(){r(b,d),u.applyWidget(b.table,!1)}])}function t(b){var c=b.config,e=c.$table,i="sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(c.namespace+" ");e.unbind(i.replace(/\s+/g," ")).bind("sortReset"+c.namespace,function(d,e){d.stopPropagation(),c.sortList=[],m(b),q(b),h(b),a.isFunction(e)&&e(b)}).bind("updateAll"+c.namespace,function(a,d,e){a.stopPropagation(),b.isUpdating=!0,u.refreshWidgets(b,!0,!0),j(b),u.bindEvents(b,c.$headers,!0),t(b),k(b,d,e)}).bind("update"+c.namespace+" updateRows"+c.namespace,function(a,c,d){a.stopPropagation(),b.isUpdating=!0,l(b),k(b,c,d)}).bind("updateCell"+c.namespace,function(d,f,g,h){d.stopPropagation(),b.isUpdating=!0,e.find(c.selectorRemove).remove();var i,j,k,l,m=c.$tbodies,n=a(f),o=m.index(a.fn.closest?n.closest("tbody"):n.parents("tbody").filter(":first")),p=a.fn.closest?n.closest("tr"):n.parents("tr").filter(":first");f=n[0],m.length&&o>=0&&(k=m.eq(o).find("tr").index(p),l=n.index(),c.cache[o].normalized[k][c.columns].$row=p,j="undefined"==typeof c.extractors[l].id?u.getElementText(c,f,l):c.extractors[l].format(u.getElementText(c,f,l),b,f,l),i="no-parser"===c.parsers[l].id?"":c.parsers[l].format(j,b,f,l),c.cache[o].normalized[k][l]=c.ignoreCase&&"string"==typeof i?i.toLowerCase():i,"numeric"===(c.parsers[l].type||"").toLowerCase()&&(c.cache[o].colMax[l]=Math.max(Math.abs(i)||0,c.cache[o].colMax[l]||0)),i="undefined"!==g?g:c.resort,i!==!1?s(c,i,h):(a.isFunction(h)&&h(b),c.$table.trigger("updateComplete",c.table)))}).bind("addRows"+c.namespace,function(e,g,h,i){if(e.stopPropagation(),b.isUpdating=!0,d(c.cache))l(b),k(b,h,i);else{g=a(g).attr("role","row");var j,m,n,o,p,q,r,t=g.filter("tr").length,v=c.$tbodies.index(g.parents("tbody").filter(":first"));for(c.parsers&&c.parsers.length||f(b),j=0;t>j;j++){for(n=g[j].cells.length,r=[],q={child:[],$row:g.eq(j),order:c.cache[v].normalized.length},m=0;n>m;m++)o="undefined"==typeof c.extractors[m].id?u.getElementText(c,g[j].cells[m],m):c.extractors[m].format(u.getElementText(c,g[j].cells[m],m),b,g[j].cells[m],m),p="no-parser"===c.parsers[m].id?"":c.parsers[m].format(o,b,g[j].cells[m],m),r[m]=c.ignoreCase&&"string"==typeof p?p.toLowerCase():p,"numeric"===(c.parsers[m].type||"").toLowerCase()&&(c.cache[v].colMax[m]=Math.max(Math.abs(r[m])||0,c.cache[v].colMax[m]||0));r.push(q),c.cache[v].normalized.push(r)}s(c,h,i)}}).bind("updateComplete"+c.namespace,function(){b.isUpdating=!1}).bind("sorton"+c.namespace,function(c,f,i,j){var k=b.config;c.stopPropagation(),e.trigger("sortStart",this),n(b,f),m(b),k.delayInit&&d(k.cache)&&g(b),e.trigger("sortBegin",this),q(b),h(b,j),e.trigger("sortEnd",this),u.applyWidget(b),a.isFunction(i)&&i(b)}).bind("appendCache"+c.namespace,function(c,d,e){c.stopPropagation(),h(b,e),a.isFunction(d)&&d(b)}).bind("updateCache"+c.namespace,function(d,e){c.parsers&&c.parsers.length||f(b),g(b),a.isFunction(e)&&e(b)}).bind("applyWidgetId"+c.namespace,function(a,d){a.stopPropagation(),u.getWidgetById(d).format(b,c,c.widgetOptions)}).bind("applyWidgets"+c.namespace,function(a,c){a.stopPropagation(),u.applyWidget(b,c)}).bind("refreshWidgets"+c.namespace,function(a,c,d){a.stopPropagation(),u.refreshWidgets(b,c,d)}).bind("destroy"+c.namespace,function(a,c,d){a.stopPropagation(),u.destroy(b,c,d)}).bind("resetToLoadState"+c.namespace,function(){u.removeWidget(b,!0,!1),c=a.extend(!0,u.defaults,c.originalSettings),b.hasInitialized=!1,u.setup(b,c)})}var u=this;u.version="2.21.5",u.parsers=[],u.widgets=[],u.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,tabIndex:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,resort:!0,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortStable:!1,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,widgets:[],widgetOptions:{zebra:["even","odd"]},initWidgets:!0,widgetClass:"widget-{name}",initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssIcon:"tablesorter-icon",cssIconNone:"",cssIconAsc:"",cssIconDesc:"",cssInfoBlock:"tablesorter-infoOnly",cssNoSort:"tablesorter-noSort",cssIgnoreRow:"tablesorter-ignoreRow",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[],empties:{},strings:{},parsers:[]},u.css={table:"tablesorter",cssHasChild:"tablesorter-hasChildRow",childRow:"tablesorter-childRow",colgroup:"tablesorter-colgroup",header:"tablesorter-header",headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner",icon:"tablesorter-icon",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"},u.language={sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ",sortNone:"No sort applied, ",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort",nextNone:"activate to remove the sort"},u.instanceMethods={},u.log=b,u.benchmark=c,u.getElementText=function(b,c,d){if(!c)return"";var e,f=b.textExtraction||"",g=c.jquery?c:a(c);return a.trim("string"==typeof f?("basic"===f?g.attr(b.textAttribute)||c.textContent:c.textContent)||g.text()||"":"function"==typeof f?f(g[0],b.table,d):"function"==typeof(e=u.getColumnData(b.table,f,d))?e(g[0],b.table,d):g[0].textContent||g.text()||"")},u.construct=function(b){return this.each(function(){var c=this,d=a.extend(!0,{},u.defaults,b,u.instanceMethods);d.originalSettings=b,!c.hasInitialized&&u.buildTable&&"TABLE"!==this.nodeName?u.buildTable(c,d):u.setup(c,d)})},u.setup=function(c,d){if(!c||!c.tHead||0===c.tBodies.length||c.hasInitialized===!0)return d.debug?b("ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized"):"";var e="",h=a(c),i=a.metadata;c.hasInitialized=!1,c.isProcessing=!0,c.config=d,a.data(c,"tablesorter",d),d.debug&&a.data(c,"startoveralltimer",new Date),d.supportsDataObject=function(a){return a[0]=parseInt(a[0],10),a[0]>1||1===a[0]&&parseInt(a[1],10)>=4}(a.fn.jquery.split(".")),d.string={max:1,min:-1,emptymin:1,emptymax:-1,zero:0,none:0,"null":0,top:!0,bottom:!1},d.emptyTo=d.emptyTo.toLowerCase(),d.stringTo=d.stringTo.toLowerCase(),/tablesorter\-/.test(h.attr("class"))||(e=""!==d.theme?" tablesorter-"+d.theme:""),d.table=c,d.$table=h.addClass(u.css.table+" "+d.tableClass+e).attr("role","grid"),d.$headers=h.find(d.selectorHeaders),d.namespace=d.namespace?"."+d.namespace.replace(/\W/g,""):".tablesorter"+Math.random().toString(16).slice(2),d.$table.children().children("tr").attr("role","row"),d.$tbodies=h.children("tbody:not(."+d.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"}),d.$table.children("caption").length&&(e=d.$table.children("caption")[0],e.id||(e.id=d.namespace.slice(1)+"caption"),d.$table.attr("aria-labelledby",e.id)),d.widgetInit={},d.textExtraction=d.$table.attr("data-text-extraction")||d.textExtraction||"basic",j(c),u.fixColumnWidth(c),u.applyWidgetOptions(c,d),f(c),d.totalRows=0,d.delayInit||g(c),u.bindEvents(c,d.$headers,!0),t(c),d.supportsDataObject&&"undefined"!=typeof h.data().sortlist?d.sortList=h.data().sortlist:i&&h.metadata()&&h.metadata().sortlist&&(d.sortList=h.metadata().sortlist),u.applyWidget(c,!0),d.sortList.length>0?h.trigger("sorton",[d.sortList,{},!d.initWidgets,!0]):(m(c),d.initWidgets&&u.applyWidget(c,!1)),d.showProcessing&&h.unbind("sortBegin"+d.namespace+" sortEnd"+d.namespace).bind("sortBegin"+d.namespace+" sortEnd"+d.namespace,function(a){clearTimeout(d.processTimer),u.isProcessing(c),"sortBegin"===a.type&&(d.processTimer=setTimeout(function(){u.isProcessing(c,!0)},500))}),c.hasInitialized=!0,c.isProcessing=!1,d.debug&&u.benchmark("Overall initialization time",a.data(c,"startoveralltimer")),h.trigger("tablesorter-initialized",c),"function"==typeof d.initialized&&d.initialized(c)},u.fixColumnWidth=function(b){b=a(b)[0];var c,d,e=b.config,f=e.$table.children("colgroup");f.length&&f.hasClass(u.css.colgroup)&&f.remove(),e.widthFixed&&0===e.$table.children("colgroup").length&&(f=a('<colgroup class="'+u.css.colgroup+'">'),c=e.$table.width(),e.$tbodies.find("tr:first").children(":visible").each(function(){d=parseInt(a(this).width()/c*1e3,10)/10+"%",f.append(a("<col>").css("width",d))}),e.$table.prepend(f))},u.getColumnData=function(b,c,d,e,f){if("undefined"!=typeof c&&null!==c){b=a(b)[0];var g,h,i=b.config,j=f||i.$headers,k=i.$headerIndexed&&i.$headerIndexed[d]||j.filter('[data-column="'+d+'"]:last');if(c[d])return e?c[d]:c[j.index(k)];for(h in c)if("string"==typeof h&&(g=k.filter(h).add(k.find(h)),g.length))return c[h]}},u.computeColumnIndex=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p=[],q={};for(c=0;c<b.length;c++)for(i=b[c].cells,d=0;d<i.length;d++){for(h=i[d],g=a(h),j=h.parentNode.rowIndex,k=j+"-"+g.index(),l=h.rowSpan||1,m=h.colSpan||1,"undefined"==typeof p[j]&&(p[j]=[]),e=0;e<p[j].length+1;e++)if("undefined"==typeof p[j][e]){n=e;break}for(q[k]=n,g.attr({"data-column":n}),e=j;j+l>e;e++)for("undefined"==typeof p[e]&&(p[e]=[]),o=p[e],f=n;n+m>f;f++)o[f]="x"}return o.length},u.isProcessing=function(b,c,d){b=a(b);var e=b[0].config,f=d||b.find("."+u.css.header);c?("undefined"!=typeof d&&e.sortList.length>0&&(f=f.filter(function(){return this.sortDisabled?!1:u.isValueInArray(parseFloat(a(this).attr("data-column")),e.sortList)>=0})),b.add(f).addClass(u.css.processing+" "+e.cssProcessing)):b.add(f).removeClass(u.css.processing+" "+e.cssProcessing)},u.processTbody=function(b,c,d){b=a(b)[0];var e;return d?(b.isProcessing=!0,c.before('<span class="tablesorter-savemyplace"/>'),e=a.fn.detach?c.detach():c.remove()):(e=a(b).find("span.tablesorter-savemyplace"),c.insertAfter(e),e.remove(),void(b.isProcessing=!1))},u.clearTableBody=function(b){a(b)[0].config.$tbodies.children().detach()},u.bindEvents=function(b,c,e){b=a(b)[0];var f,h=null,i=b.config;e!==!0&&(c.addClass(i.namespace.slice(1)+"_extra_headers"),f=a.fn.closest?c.closest("table")[0]:c.parents("table")[0],f&&"TABLE"===f.nodeName&&f!==b&&a(f).addClass(i.namespace.slice(1)+"_extra_table")),c.find(i.selectorSort).add(c.filter(i.selectorSort)).unbind("mousedown mouseup click sort keyup ".split(" ").join(i.namespace+" ").replace(/\s+/g," ")).bind("mousedown mouseup click sort keyup ".split(" ").join(i.namespace+" "),function(e,f){var j,k=a(e.target),l=e.type;if(!(1!==(e.which||e.button)&&!/sort|keyup|click/.test(l)||"keyup"===l&&13!==e.which||"click"===l&&"undefined"!=typeof e.which||"mouseup"===l&&h!==e.target&&f!==!0)){if("mousedown"===l)return void(h=e.target);if(h=null,/(input|select|button|textarea)/i.test(e.target.nodeName)||k.hasClass(i.cssNoSort)||k.parents("."+i.cssNoSort).length>0||k.parents("button").length>0)return!i.cancelSelection;i.delayInit&&d(i.cache)&&g(b),j=a.fn.closest?a(this).closest("th, td")[0]:/TH|TD/.test(this.nodeName)?this:a(this).parents("th, td")[0],j=i.$headers[c.index(j)],j.sortDisabled||p(b,j,e)}}),i.cancelSelection&&c.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})},u.restoreHeaders=function(b){var c,d=a(b)[0].config;d.$table.find(d.selectorHeaders).each(function(b){c=a(this),c.find("."+u.css.headerIn).length&&c.html(d.headerContent[b])})},u.destroy=function(b,c,d){if(b=a(b)[0],b.hasInitialized){u.removeWidget(b,!0,!1);var e,f=a(b),g=b.config,h=f.find("thead:first"),i=h.find("tr."+u.css.headerRow).removeClass(u.css.headerRow+" "+g.cssHeaderRow),j=f.find("tfoot:first > tr").children("th, td");c===!1&&a.inArray("uitheme",g.widgets)>=0&&(f.trigger("applyWidgetId",["uitheme"]),f.trigger("applyWidgetId",["zebra"])),h.find("tr").not(i).remove(),e="sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache "+"applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd resetToLoadState ".split(" ").join(g.namespace+" "),f.removeData("tablesorter").unbind(e.replace(/\s+/g," ")),g.$headers.add(j).removeClass([u.css.header,g.cssHeader,g.cssAsc,g.cssDesc,u.css.sortAsc,u.css.sortDesc,u.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled","true"),i.find(g.selectorSort).unbind("mousedown mouseup keypress ".split(" ").join(g.namespace+" ").replace(/\s+/g," ")),u.restoreHeaders(b),f.toggleClass(u.css.table+" "+g.tableClass+" tablesorter-"+g.theme,c===!1),b.hasInitialized=!1,delete b.config.cache,"function"==typeof d&&d(b)}},u.regex={chunk:/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i},u.sortNatural=function(a,b){if(a===b)return 0;var c,d,e,f,g,h,i,j,k=u.regex;if(k.hex.test(b)){if(d=parseInt(a.match(k.hex),16),f=parseInt(b.match(k.hex),16),f>d)return-1;if(d>f)return 1}for(c=a.replace(k.chunk,"\\0$1\\0").replace(k.chunks,"").split("\\0"),e=b.replace(k.chunk,"\\0$1\\0").replace(k.chunks,"").split("\\0"),j=Math.max(c.length,e.length),i=0;j>i;i++){if(g=isNaN(c[i])?c[i]||0:parseFloat(c[i])||0,h=isNaN(e[i])?e[i]||0:parseFloat(e[i])||0,isNaN(g)!==isNaN(h))return isNaN(g)?1:-1;if(typeof g!=typeof h&&(g+="",h+=""),h>g)return-1;if(g>h)return 1}return 0},u.sortNaturalAsc=function(a,b,c,d,e){if(a===b)return 0;var f=e.string[e.empties[c]||e.emptyTo];return""===a&&0!==f?"boolean"==typeof f?f?-1:1:-f||-1:""===b&&0!==f?"boolean"==typeof f?f?1:-1:f||1:u.sortNatural(a,b)},u.sortNaturalDesc=function(a,b,c,d,e){if(a===b)return 0;var f=e.string[e.empties[c]||e.emptyTo];return""===a&&0!==f?"boolean"==typeof f?f?-1:1:f||1:""===b&&0!==f?"boolean"==typeof f?f?1:-1:-f||-1:u.sortNatural(b,a)},u.sortText=function(a,b){return a>b?1:b>a?-1:0},u.getTextValue=function(a,b,c){if(c){var d,e=a?a.length:0,f=c+b;for(d=0;e>d;d++)f+=a.charCodeAt(d);return b*f}return 0},u.sortNumericAsc=function(a,b,c,d,e,f){if(a===b)return 0;var g=f.config,h=g.string[g.empties[e]||g.emptyTo];return""===a&&0!==h?"boolean"==typeof h?h?-1:1:-h||-1:""===b&&0!==h?"boolean"==typeof h?h?1:-1:h||1:(isNaN(a)&&(a=u.getTextValue(a,c,d)),isNaN(b)&&(b=u.getTextValue(b,c,d)),a-b)},u.sortNumericDesc=function(a,b,c,d,e,f){if(a===b)return 0;var g=f.config,h=g.string[g.empties[e]||g.emptyTo];return""===a&&0!==h?"boolean"==typeof h?h?-1:1:h||1:""===b&&0!==h?"boolean"==typeof h?h?1:-1:-h||-1:(isNaN(a)&&(a=u.getTextValue(a,c,d)),isNaN(b)&&(b=u.getTextValue(b,c,d)),b-a)},u.sortNumeric=function(a,b){return a-b},u.characterEquivalents={a:"áàâãäąå",A:"ÁÀÂÃÄĄÅ",c:"çćč",C:"ÇĆČ",e:"éèêëěę",E:"ÉÈÊËĚĘ",i:"íìİîïı",I:"ÍÌİÎÏ",o:"óòôõö",O:"ÓÒÔÕÖ",ss:"ß",SS:"ẞ",u:"úùûüů",U:"ÚÙÛÜŮ"},u.replaceAccents=function(a){var b,c="[",d=u.characterEquivalents;if(!u.characterRegex){u.characterRegexArray={};for(b in d)"string"==typeof b&&(c+=d[b],u.characterRegexArray[b]=new RegExp("["+d[b]+"]","g"));u.characterRegex=new RegExp(c+"]")}if(u.characterRegex.test(a))for(b in d)"string"==typeof b&&(a=a.replace(u.characterRegexArray[b],b));return a},u.isValueInArray=function(a,b){var c,d=b.length;for(c=0;d>c;c++)if(b[c][0]===a)return c;return-1},u.addParser=function(a){var b,c=u.parsers.length,d=!0;for(b=0;c>b;b++)u.parsers[b].id.toLowerCase()===a.id.toLowerCase()&&(d=!1);d&&u.parsers.push(a)},u.addInstanceMethods=function(b){a.extend(u.instanceMethods,b)},u.getParserById=function(a){if("false"==a)return!1;var b,c=u.parsers.length;for(b=0;c>b;b++)if(u.parsers[b].id.toLowerCase()===a.toString().toLowerCase())return u.parsers[b];return!1},u.addWidget=function(a){u.widgets.push(a)},u.hasWidget=function(b,c){return b=a(b),b.length&&b[0].config&&b[0].config.widgetInit[c]||!1},u.getWidgetById=function(a){var b,c,d=u.widgets.length;for(b=0;d>b;b++)if(c=u.widgets[b],c&&c.hasOwnProperty("id")&&c.id.toLowerCase()===a.toLowerCase())return c},u.applyWidgetOptions=function(b,c){var d,e,f=c.widgets.length,g=c.widgetOptions;if(f)for(d=0;f>d;d++)e=u.getWidgetById(c.widgets[d]),e&&"options"in e&&(g=b.config.widgetOptions=a.extend(!0,{},e.options,g))},u.applyWidget=function(b,d,e){b=a(b)[0];var f,g,h,i,j,k,l,m=b.config,n=m.widgetOptions,o=" "+m.table.className+" ",p=[];if(d===!1||!b.hasInitialized||!b.isApplyingWidgets&&!b.isUpdating){if(m.debug&&(i=new Date),l=new RegExp("\\s"+m.widgetClass.replace(/\{name\}/i,"([\\w-]+)")+"\\s","g"),o.match(l)&&(k=o.match(l)))for(g=k.length,f=0;g>f;f++)m.widgets.push(k[f].replace(l,"$1"));if(m.widgets.length){for(b.isApplyingWidgets=!0,m.widgets=a.grep(m.widgets,function(b,c){return a.inArray(b,m.widgets)===c}),h=m.widgets||[],g=h.length,f=0;g>f;f++)l=u.getWidgetById(h[f]),l&&l.id&&(l.priority||(l.priority=10),p[f]=l);for(p.sort(function(a,b){return a.priority<b.priority?-1:a.priority===b.priority?0:1}),g=p.length,f=0;g>f;f++)p[f]&&((d||!m.widgetInit[p[f].id])&&(m.widgetInit[p[f].id]=!0,b.hasInitialized&&u.applyWidgetOptions(b,m),"init"in p[f]&&(m.debug&&(j=new Date),p[f].init(b,p[f],m,n),m.debug&&u.benchmark("Initializing "+p[f].id+" widget",j))),!d&&"format"in p[f]&&(m.debug&&(j=new Date),p[f].format(b,m,n,!1),m.debug&&u.benchmark((d?"Initializing ":"Applying ")+p[f].id+" widget",j)));d||"function"!=typeof e||e(b)}setTimeout(function(){b.isApplyingWidgets=!1,a.data(b,"lastWidgetApplication",new Date)},0),m.debug&&(k=m.widgets.length,c("Completed "+(d===!0?"initializing ":"applying ")+k+" widget"+(1!==k?"s":""),i))}},u.removeWidget=function(c,d,e){c=a(c)[0];var f,g,h,i,j=c.config;if(d===!0)for(d=[],i=u.widgets.length,h=0;i>h;h++)g=u.widgets[h],g&&g.id&&d.push(g.id);else d=(a.isArray(d)?d.join(","):d||"").toLowerCase().split(/[\s,]+/);for(i=d.length,f=0;i>f;f++)g=u.getWidgetById(d[f]),h=a.inArray(d[f],j.widgets),g&&"remove"in g&&(j.debug&&h>=0&&b('Removing "'+d[f]+'" widget'),g.remove(c,j,j.widgetOptions,e),j.widgetInit[d[f]]=!1),h>=0&&e!==!0&&j.widgets.splice(h,1)},u.refreshWidgets=function(b,c,d){b=a(b)[0];var e,f=b.config,g=f.widgets,h=u.widgets,i=h.length,j=[],k=function(b){a(b).trigger("refreshComplete")};for(e=0;i>e;e++)h[e]&&h[e].id&&(c||a.inArray(h[e].id,g)<0)&&j.push(h[e].id);u.removeWidget(b,j.join(","),!0),d!==!0?(u.applyWidget(b,c||!1,k),c&&u.applyWidget(b,!1,k)):k(b)},u.getColumnText=function(b,c,e){b=a(b)[0];var f,g,h,i,j,k,l,m,n,o,p="function"==typeof e,q="all"===c,r={raw:[],parsed:[],$cell:[]},s=b.config;if(!d(s)){for(j=s.$tbodies.length,f=0;j>f;f++)for(h=s.cache[f].normalized,k=h.length,g=0;k>g;g++)o=!0,i=h[g],m=q?i.slice(0,s.columns):i[c],i=i[s.columns],l=q?i.raw:i.raw[c],n=q?i.$row.children():i.$row.children().eq(c),p&&(o=e({tbodyIndex:f,rowIndex:g,parsed:m,raw:l,$row:i.$row,$cell:n})),o!==!1&&(r.parsed.push(m),r.raw.push(l),r.$cell.push(n));return r}},u.getData=function(b,c,d){var e,f,g="",h=a(b);return h.length?(e=a.metadata?h.metadata():!1,f=" "+(h.attr("class")||""),"undefined"!=typeof h.data(d)||"undefined"!=typeof h.data(d.toLowerCase())?g+=h.data(d)||h.data(d.toLowerCase()):e&&"undefined"!=typeof e[d]?g+=e[d]:c&&"undefined"!=typeof c[d]?g+=c[d]:" "!==f&&f.match(" "+d+"-")&&(g=f.match(new RegExp("\\s"+d+"-([\\w-]+)"))[1]||""),a.trim(g)):""},u.formatFloat=function(b,c){if("string"!=typeof b||""===b)return b;var d,e=c&&c.config?c.config.usNumberFormat!==!1:"undefined"!=typeof c?c:!0;return b=e?b.replace(/,/g,""):b.replace(/[\s|\.]/g,"").replace(/,/g,"."),/^\s*\([.\d]+\)/.test(b)&&(b=b.replace(/^\s*\(([.\d]+)\)/,"-$1")),d=parseFloat(b),isNaN(d)?a.trim(b):d},u.isDigit=function(a){return isNaN(a)?/^[\-+(]?\d+[)]?$/.test(a.toString().replace(/[,.'"\s]/g,"")):!0}}});var b=a.tablesorter;a.fn.extend({tablesorter:b.construct}),b.addParser({id:"no-parser",is:function(){return!1},format:function(){return""},type:"text"}),b.addParser({id:"text",is:function(){return!0},format:function(c,d){var e=d.config;return c&&(c=a.trim(e.ignoreCase?c.toLocaleLowerCase():c),c=e.sortLocaleCompare?b.replaceAccents(c):c),c},type:"text"}),b.addParser({id:"digit",is:function(a){return b.isDigit(a)},format:function(c,d){var e=b.formatFloat((c||"").replace(/[^\w,. \-()]/g,""),d);return c&&"number"==typeof e?e:c?a.trim(c&&d.config.ignoreCase?c.toLocaleLowerCase():c):c},type:"numeric"}),b.addParser({id:"currency",is:function(a){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((a||"").replace(/[+\-,. ]/g,""))},format:function(c,d){var e=b.formatFloat((c||"").replace(/[^\w,. \-()]/g,""),d);return c&&"number"==typeof e?e:c?a.trim(c&&d.config.ignoreCase?c.toLocaleLowerCase():c):c},type:"numeric"}),b.addParser({id:"url",is:function(a){return/^(https?|ftp|file):\/\//.test(a)},format:function(b){return b?a.trim(b.replace(/(https?|ftp|file):\/\//,"")):b},parsed:!0,type:"text"}),b.addParser({id:"isoDate",is:function(a){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(a)},format:function(a){var b=a?new Date(a.replace(/-/g,"/")):a;return b instanceof Date&&isFinite(b)?b.getTime():a},type:"numeric"}),b.addParser({id:"percent",is:function(a){return/(\d\s*?%|%\s*?\d)/.test(a)&&a.length<15},format:function(a,c){return a?b.formatFloat(a.replace(/%/g,""),c):a},type:"numeric"}),b.addParser({id:"image",is:function(a,b,c,d){return d.find("img").length>0},format:function(b,c,d){return a(d).find("img").attr(c.config.imgAttr||"alt")||b},parsed:!0,type:"text"}),b.addParser({id:"usLongDate",is:function(a){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(a)||/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(a)},format:function(a){var b=a?new Date(a.replace(/(\S)([AP]M)$/i,"$1 $2")):a;return b instanceof Date&&isFinite(b)?b.getTime():a
},type:"numeric"}),b.addParser({id:"shortDate",is:function(a){return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((a||"").replace(/\s+/g," ").replace(/[\-.,]/g,"/"))},format:function(a,c,d,e){if(a){var f,g,h=c.config,i=h.$headerIndexed[e],j=i.length&&i[0].dateFormat||b.getData(i,b.getColumnData(c,h.headers,e),"dateFormat")||h.dateFormat;return g=a.replace(/\s+/g," ").replace(/[\-.,]/g,"/"),"mmddyyyy"===j?g=g.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$1/$2"):"ddmmyyyy"===j?g=g.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$2/$1"):"yyyymmdd"===j&&(g=g.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,"$1/$2/$3")),f=new Date(g),f instanceof Date&&isFinite(f)?f.getTime():a}return a},type:"numeric"}),b.addParser({id:"time",is:function(a){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(a)},format:function(a){var b=a?new Date("2000/01/01 "+a.replace(/(\S)([AP]M)$/i,"$1 $2")):a;return b instanceof Date&&isFinite(b)?b.getTime():a},type:"numeric"}),b.addParser({id:"metadata",is:function(){return!1},format:function(b,c,d){var e=c.config,f=e.parserMetadataName?e.parserMetadataName:"sortValue";return a(d).metadata()[f]},type:"numeric"}),b.addWidget({id:"zebra",priority:90,format:function(b,c,d){var e,f,g,h,i,j,k,l=new RegExp(c.cssChildRow,"i"),m=c.$tbodies.add(a(c.namespace+"_extra_table").children("tbody"));for(c.debug&&(j=new Date),k=0;k<m.length;k++)h=0,e=m.eq(k),f=e.children("tr:visible").not(c.selectorRemove),f.each(function(){g=a(this),l.test(this.className)||h++,i=h%2===0,g.removeClass(d.zebra[i?1:0]).addClass(d.zebra[i?0:1])})},remove:function(a,c,d,e){if(!e){var f,g,h=c.$tbodies,i=(d.zebra||["even","odd"]).join(" ");for(f=0;f<h.length;f++)g=b.processTbody(a,h.eq(f),!0),g.children().removeClass(i),b.processTbody(a,g,!1)}}})}(jQuery),a.tablesorter});

/****************************************************************************************************************************************************************

Tablesorter Pagination

****************************************************************************************************************************************************************/
!function(e){"use strict";var t=e.tablesorter;e.extend({tablesorterPager:new function(){this.defaults={positionFixed:!1,container:null,ajaxUrl:null,customAjaxUrl:function(e,t){return t},ajaxObject:{dataType:"json"},processAjaxOnInit:!1,ajaxProcessing:function(e){return e&&e.hasOwnProperty("rows")?[e.total_rows,e.rows]:void 0},output:"{startRow} to {endRow} of {totalRows} rows",updateArrows:!0,page:0,pageReset:0,size:10,maxOptionSize:20,savePages:!0,storageKey:"tablesorter-pager",fixedHeight:!1,countChildRows:!1,removeRows:!1,cssFirst:".first",cssPrev:".prev",cssNext:".next",cssLast:".last",cssGoto:".gotoPage",cssPageDisplay:".pagedisplay",cssPageSize:".pagesize",cssErrorRow:"tablesorter-errorRow",cssDisabled:"disabled",totalRows:0,totalPages:0,filteredRows:0,filteredPages:0,ajaxCounter:0,currentFilters:[],startRow:0,endRow:0,$size:null,last:{}};var a="filterInit filterStart filterEnd sortEnd disable enable destroy updateComplete pageSize pageSet pageAndSize pagerUpdate refreshComplete ",i=this,s=function(e,t){var a="addClass",i="removeClass",s=e.cssDisabled,r=!!t,o=r||0===e.page,n=Math.min(e.totalPages,e.filteredPages),l=r||e.page===n-1||0===n;e.updateArrows&&(e.$container.find(e.cssFirst+","+e.cssPrev)[o?a:i](s).attr("aria-disabled",o),e.$container.find(e.cssNext+","+e.cssLast)[l?a:i](s).attr("aria-disabled",l))},r=function(t,a){var i,s,r,o=t.config,n=o.$table.hasClass("hasFilters");if(n&&!a.ajaxUrl)if(e.isEmptyObject(o.cache))a.filteredRows=a.totalRows=o.$tbodies.eq(0).children("tr").not(a.countChildRows?"":"."+o.cssChildRow).length;else for(a.filteredRows=0,i=o.cache[0].normalized,r=i.length,s=0;r>s;s++)a.filteredRows+=a.regexRows.test(i[s][o.columns].$row[0].className)?0:1;else n||(a.filteredRows=a.totalRows)},o=function(a,i,o){if(!i.initializing){var g,d,p,c,f,u,h=a.config,w=i.size||i.settings.size||10;if(i.countChildRows&&d.push(h.cssChildRow),i.totalPages=Math.ceil(i.totalRows/w),h.totalRows=i.totalRows,r(a,i),h.filteredRows=i.filteredRows,i.filteredPages=Math.ceil(i.filteredRows/w)||0,Math.min(i.totalPages,i.filteredPages)>=0){if(d=i.size*i.page>i.filteredRows&&o,i.page=d?i.pageReset||0:i.page,i.startRow=d?i.size*i.page+1:0===i.filteredRows?0:i.size*i.page+1,i.endRow=Math.min(i.filteredRows,i.totalRows,i.size*(i.page+1)),p=i.$container.find(i.cssPageDisplay),g=(i.ajaxData&&i.ajaxData.output?i.ajaxData.output||i.output:i.output).replace(/\{page([\-+]\d+)?\}/gi,function(e,t){return i.totalPages?i.page+(t?parseInt(t,10):1):0}).replace(/\{\w+(\s*:\s*\w+)?\}/gi,function(e){var t,a,s=e.replace(/[{}\s]/g,""),r=s.split(":"),o=i.ajaxData,n=/(rows?|pages?)$/i.test(s)?0:"";return/(startRow|page)/.test(r[0])&&"input"===r[1]?(t=(""+("page"===r[0]?i.totalPages:i.totalRows)).length,a="page"===r[0]?i.page+1:i.startRow,'<input type="text" class="ts-'+r[0]+'" style="max-width:'+t+'em" value="'+a+'"/>'):r.length>1&&o&&o[r[0]]?o[r[0]][r[1]]:i[s]||(o?o[s]:n)||n}),i.$goto.length){for(d="",u=n(i),f=u.length,c=0;f>c;c++)d+='<option value="'+u[c]+'">'+u[c]+"</option>";i.$goto.html(d).val(i.page+1)}p.length&&(p["INPUT"===p[0].nodeName?"val":"html"](g),p.find(".ts-startRow, .ts-page").unbind("change.pager").bind("change.pager",function(){var t=e(this).val(),a=e(this).hasClass("ts-startRow")?Math.floor(t/i.size)+1:t;h.$table.trigger("pageSet.pager",[a])}))}s(i),l(a,i),i.initialized&&o!==!1&&(h.debug&&t.log("Pager: Triggering pagerComplete"),h.$table.trigger("pagerComplete",i),i.savePages&&t.storage&&t.storage(a,i.storageKey,{page:i.page,size:i.size}))}},n=function(t){var a,i,s,r,o,n,l=Math.min(t.totalPages,t.filteredPages)||1,g=5*Math.ceil(l/t.maxOptionSize/5),d=l>t.maxOptionSize,p=t.page+1,c=g,f=l-g,u=[1],h=d?g:1;for(a=h;l>=a;)u.push(a),a+=d?g:1;if(u.push(l),d){for(s=[],i=Math.max(Math.floor(t.maxOptionSize/g)-1,5),c=p-i,1>c&&(c=1),f=p+i,f>l&&(f=l),a=c;f>=a;a++)s.push(a);u=e.grep(u,function(t,a){return e.inArray(t,u)===a}),o=u.length,n=s.length,o-n>g/2&&o+n>t.maxOptionSize&&(r=Math.floor(o/2)-Math.floor(n/2),Array.prototype.splice.apply(u,[r,n])),u=u.concat(s)}return u=e.grep(u,function(t,a){return e.inArray(t,u)===a}).sort(function(e,t){return e-t})},l=function(t,a){var i,s,r=t.config,o=r.$tbodies.eq(0);o.find("tr.pagerSavedHeightSpacer").remove(),a.fixedHeight&&!a.isDisabled&&(s=e.data(t,"pagerSavedHeight"),s&&(i=s-o.height(),i>5&&e.data(t,"pagerLastSize")===a.size&&o.children("tr:visible").length<a.size&&o.append('<tr class="pagerSavedHeightSpacer '+r.selectorRemove.slice(1)+'" style="height:'+i+'px;"></tr>')))},g=function(t,a){var i,s=t.config,r=s.$tbodies.eq(0);r.find("tr.pagerSavedHeightSpacer").remove(),r.children("tr:visible").length||r.append('<tr class="pagerSavedHeightSpacer '+s.selectorRemove.slice(1)+'"><td>&nbsp</td></tr>'),i=r.children("tr").eq(0).height()*a.size,e.data(t,"pagerSavedHeight",i),l(t,a),e.data(t,"pagerLastSize",a.size)},d=function(e,a){if(!a.ajaxUrl){var i,s=0,r=e.config,o=r.$tbodies.eq(0).children("tr"),n=o.length,l=a.page*a.size,g=l+a.size,d=r.widgetOptions&&r.widgetOptions.filter_filteredRow||"filtered",p=0,c=0;for(a.cacheIndex=[],i=0;n>i;i++)o[i].className.match(d)||(c===l&&o[i].className.match(r.cssChildRow)?o[i].style.display="none":(o[i].style.display=c>=l&&g>c?"":"none",p!==c&&c>=l&&g>c&&(a.cacheIndex.push(i),p=c),c+=o[i].className.match(r.cssChildRow+"|"+r.selectorRemove.slice(1))&&!a.countChildRows?0:1,c===g&&"none"!==o[i].style.display&&o[i].className.match(t.css.cssHasChild)&&(s=i)));if(s>0&&o[s].className.match(t.css.cssHasChild))for(;++s<n&&o[s].className.match(r.cssChildRow);)o[s].style.display=""}},p=function(t,a){a.size=parseInt(a.$size.val(),10)||a.size||a.settings.size||10,e.data(t,"pagerLastSize",a.size),s(a),a.removeRows||(d(t,a),e(t).bind("sortEnd.pager filterEnd.pager",function(){d(t,a)}))},c=function(a,i,s,r,n){if("function"==typeof s.ajaxProcessing){var l,g,d,p,c,f,u,h,w,b,z=i.config,R=z.$table,m="",x=s.ajaxProcessing(a,i,r)||[0,[]],j=R.find("thead th").length;if(t.showError(i),n)z.debug&&t.log("Pager: >> Ajax Error",r,n),t.showError(i,0===r.status?"Not connected, verify Network":404===r.status?"Requested page not found [404]":500===r.status?"Internal Server Error [500]":"parsererror"===n?"Requested JSON parse failed":"timeout"===n?"Time out error":"abort"===n?"Ajax Request aborted":"Uncaught error: "+r.statusText+" ["+r.status+"]"),z.$tbodies.eq(0).children("tr").detach(),s.totalRows=0;else{if(e.isArray(x)?(f=isNaN(x[0])&&!isNaN(x[1]),b=x[f?1:0],s.totalRows=isNaN(b)?s.totalRows||0:b,z.totalRows=z.filteredRows=s.filteredRows=s.totalRows,h=0===s.totalRows?[""]:x[f?0:1]||[],u=x[2]):(s.ajaxData=x,z.totalRows=s.totalRows=x.total,z.filteredRows=s.filteredRows="undefined"!=typeof x.filteredRows?x.filteredRows:x.total,u=x.headers,h=x.rows),w=h&&h.length,h instanceof jQuery)s.processAjaxOnInit&&(z.$tbodies.eq(0).children("tr").detach(),z.$tbodies.eq(0).append(h));else if(w){for(l=0;w>l;l++){for(m+="<tr>",g=0;g<h[l].length;g++)m+=/^\s*<td/.test(h[l][g])?e.trim(h[l][g]):"<td>"+h[l][g]+"</td>";m+="</tr>"}s.processAjaxOnInit&&z.$tbodies.eq(0).html(m)}s.processAjaxOnInit=!0,u&&u.length===j&&(d=R.hasClass("hasStickyHeaders"),c=d?z.widgetOptions.$sticky.children("thead:first").children("tr").children():"",p=R.find("tfoot tr:first").children(),z.$headers.filter("th").each(function(a){var i,s=e(this);s.find("."+t.css.icon).length?(i=s.find("."+t.css.icon).clone(!0),s.find(".tablesorter-header-inner").html(u[a]).append(i),d&&c.length&&(i=c.eq(a).find("."+t.css.icon).clone(!0),c.eq(a).find(".tablesorter-header-inner").html(u[a]).append(i))):(s.find(".tablesorter-header-inner").html(u[a]),d&&c.length&&c.eq(a).find(".tablesorter-header-inner").html(u[a])),p.eq(a).html(u[a])}))}z.showProcessing&&t.isProcessing(i),s.totalPages=Math.ceil(s.totalRows/(s.size||s.settings.size||10)),s.last.totalRows=s.totalRows,s.last.currentFilters=s.currentFilters,s.last.sortList=(z.sortList||[]).join(","),o(i,s,!1),R.trigger("updateCache",[function(){s.initialized&&setTimeout(function(){z.debug&&t.log("Pager: Triggering pagerChange"),R.trigger("applyWidgets").trigger("pagerChange",s),o(i,s,!0)},0)}])}s.initialized||(s.initialized=!0,s.initializing=!1,i.config.debug&&t.log("Pager: Triggering pagerInitialized"),e(i).trigger("applyWidgets").trigger("pagerInitialized",s),o(i,s))},f=function(a,i){var s,r=u(a,i),o=e(document),n=a.config;""!==r&&(n.showProcessing&&t.isProcessing(a,!0),o.bind("ajaxError.pager",function(e,t,s,r){c(null,a,i,t,r),o.unbind("ajaxError.pager")}),s=++i.ajaxCounter,i.last.ajaxUrl=r,i.ajaxObject.url=r,i.ajaxObject.success=function(e,t,r){s<i.ajaxCounter||(c(e,a,i,r),o.unbind("ajaxError.pager"),"function"==typeof i.oldAjaxSuccess&&i.oldAjaxSuccess(e))},n.debug&&t.log("Pager: Ajax initialized",i.ajaxObject),e.ajax(i.ajaxObject))},u=function(a,i){var s,r,o=a.config,n=i.ajaxUrl?i.ajaxUrl.replace(/\{page([\-+]\d+)?\}/,function(e,t){return i.page+(t?parseInt(t,10):0)}).replace(/\{size\}/g,i.size):"",l=o.sortList,g=i.currentFilters||e(a).data("lastSearch")||[],d=n.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),p=n.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),c=[];if(d){for(d=d[1],r=l.length,s=0;r>s;s++)c.push(d+"["+l[s][0]+"]="+l[s][1]);n=n.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g,c.length?c.join("&"):d),c=[]}if(p){for(p=p[1],r=g.length,s=0;r>s;s++)g[s]&&c.push(p+"["+s+"]="+encodeURIComponent(g[s]));n=n.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g,c.length?c.join("&"):p),i.currentFilters=g}return"function"==typeof i.customAjaxUrl&&(n=i.customAjaxUrl(a,n)),o.debug&&t.log("Pager: Ajax url = "+n),n},h=function(a,i,s){var r,n,l,g,p=e(a),c=a.config,f=c.$table.hasClass("hasFilters"),u=i&&i.length||0,h=s.page*s.size,w=s.size;if(1>u)return void(c.debug&&t.log("Pager: >> No rows for pager to render"));if(s.page>=s.totalPages&&x(a,s),s.cacheIndex=[],s.isDisabled=!1,s.initialized&&(c.debug&&t.log("Pager: Triggering pagerChange"),p.trigger("pagerChange",s)),s.removeRows){for(t.clearTableBody(a),r=t.processTbody(a,c.$tbodies.eq(0),!0),n=f?0:h,l=f?0:h,g=0;w>g&&n<i.length;)f&&/filtered/.test(i[n][0].className)||(l++,l>h&&w>=g&&(g++,s.cacheIndex.push(n),r.append(i[n]))),n++;t.processTbody(a,r,!1)}else d(a,s);o(a,s),a.isUpdating&&(c.debug&&t.log("Pager: Triggering updateComplete"),p.trigger("updateComplete",[a,!0]))},w=function(a,i){i.ajax?s(i,!0):(i.isDisabled=!0,e.data(a,"pagerLastPage",i.page),e.data(a,"pagerLastSize",i.size),i.page=0,i.size=i.totalRows,i.totalPages=1,e(a).addClass("pagerDisabled").removeAttr("aria-describedby").find("tr.pagerSavedHeightSpacer").remove(),h(a,a.config.rowsCopy,i),e(a).trigger("applyWidgets"),a.config.debug&&t.log("Pager: Disabled")),i.$size.add(i.$goto).add(i.$container.find(".ts-startRow, .ts-page")).each(function(){e(this).attr("aria-disabled","true").addClass(i.cssDisabled)[0].disabled=!0})},b=function(e){var t=e.config,a=t.pager;t.$table.trigger("updateCache",[function(){var i,s=[],r=e.config.cache[0].normalized;for(a.totalRows=r.length,i=0;i<a.totalRows;i++)s.push(r[i][t.columns].$row);t.rowsCopy=s,z(e,a,!0)}])},z=function(a,i,s){if(!i.isDisabled){var o,n=a.config,l=e(a),g=i.last;return s!==!1&&i.initialized&&e.isEmptyObject(n.cache)?b(a):void(i.ajax&&t.hasWidget(a,"filter")&&!n.widgetOptions.filter_initialized||(r(a,i),o=Math.min(i.totalPages,i.filteredPages),i.page<0&&(i.page=0),i.page>o-1&&0!==o&&(i.page=o-1),g.currentFilters=""===(g.currentFilters||[]).join("")?[]:g.currentFilters,i.currentFilters=""===(i.currentFilters||[]).join("")?[]:i.currentFilters,(g.page!==i.page||g.size!==i.size||g.totalRows!==i.totalRows||(g.currentFilters||[]).join(",")!==(i.currentFilters||[]).join(",")||(g.ajaxUrl||"")!==(i.ajaxObject.url||"")||(g.optAjaxUrl||"")!==(i.ajaxUrl||"")||g.sortList!==(n.sortList||[]).join(","))&&(n.debug&&t.log("Pager: Changing to page "+i.page),i.last={page:i.page,size:i.size,sortList:(n.sortList||[]).join(","),totalRows:i.totalRows,currentFilters:i.currentFilters||[],ajaxUrl:i.ajaxObject.url||"",optAjaxUrl:i.ajaxUrl||""},i.ajax?f(a,i):i.ajax||h(a,n.rowsCopy,i),e.data(a,"pagerLastPage",i.page),i.initialized&&s!==!1&&(n.debug&&t.log("Pager: Triggering pageMoved"),l.trigger("pageMoved",i).trigger("applyWidgets"),a.isUpdating&&(n.debug&&t.log("Pager: Triggering updateComplete"),l.trigger("updateComplete",[a,!0]))))))}},R=function(t,a,i){i.size=a||i.size||i.settings.size||10,i.$size.val(i.size),e.data(t,"pagerLastPage",i.page),e.data(t,"pagerLastSize",i.size),i.totalPages=Math.ceil(i.totalRows/i.size),i.filteredPages=Math.ceil(i.filteredRows/i.size),z(t,i)},m=function(e,t){t.page=0,z(e,t)},x=function(e,t){t.page=Math.min(t.totalPages,t.filteredPages)-1,z(e,t)},j=function(e,t){t.page++,t.page>=Math.min(t.totalPages,t.filteredPages)-1&&(t.page=Math.min(t.totalPages,t.filteredPages)-1),z(e,t)},P=function(e,t){t.page--,t.page<=0&&(t.page=0),z(e,t)},v=function(i,s){w(i,s),s.$container.hide(),i.config.appender=null,s.initialized=!1,delete i.config.rowsCopy,e(i).unbind(a.split(" ").join(".pager ").replace(/\s+/g," ")),t.storage&&t.storage(i,s.storageKey,"")},y=function(a,i,s){var r,o=a.config;i.$size.add(i.$goto).add(i.$container.find(".ts-startRow, .ts-page")).removeClass(i.cssDisabled).removeAttr("disabled").attr("aria-disabled","false"),i.isDisabled=!1,i.page=e.data(a,"pagerLastPage")||i.page||0,i.size=e.data(a,"pagerLastSize")||parseInt(i.$size.find("option[selected]").val(),10)||i.size||i.settings.size||10,i.$size.val(i.size),i.totalPages=Math.ceil(Math.min(i.totalRows,i.filteredRows)/i.size),a.id&&(r=a.id+"_pager_info",i.$container.find(i.cssPageDisplay).attr("id",r),o.$table.attr("aria-describedby",r)),g(a,i),s&&(o.$table.trigger("updateRows"),R(a,i.size,i),p(a,i),o.debug&&t.log("Pager: Enabled"))};i.appender=function(t,a){var i=t.config,s=i.pager;s.ajax||(i.rowsCopy=a,s.totalRows=s.countChildRows?i.$tbodies.eq(0).children("tr").length:a.length,s.size=e.data(t,"pagerLastSize")||s.size||s.settings.size||10,s.totalPages=Math.ceil(s.totalRows/s.size),h(t,a,s),o(t,s,!1))},i.construct=function(s){return this.each(function(){if(this.config&&this.hasInitialized){var r,n,l,c=this,f=c.config,u=f.widgetOptions,h=f.pager=e.extend(!0,{},e.tablesorterPager.defaults,s),C=f.$table,$=h.$container=e(h.container).addClass("tablesorter-pager").show();h.settings=e.extend(!0,{},e.tablesorterPager.defaults,s),f.debug&&t.log("Pager: Initializing"),h.oldAjaxSuccess=h.oldAjaxSuccess||h.ajaxObject.success,f.appender=i.appender,h.initializing=!0,h.savePages&&t.storage&&(r=t.storage(c,h.storageKey)||{},h.page=isNaN(r.page)?h.page:r.page,h.size=(isNaN(r.size)?h.size:r.size)||h.settings.size||10,e.data(c,"pagerLastSize",h.size)),h.regexRows=new RegExp("("+(u.filter_filteredRow||"filtered")+"|"+f.selectorRemove.slice(1)+"|"+f.cssChildRow+")"),C.unbind(a.split(" ").join(".pager ").replace(/\s+/g," ")).bind("filterInit.pager filterStart.pager",function(t,a){h.currentFilters=e.isArray(a)?a:f.$table.data("lastSearch"),"filterStart"===t.type&&h.pageReset!==!1&&(f.lastCombinedFilter||"")!==(h.currentFilters||[]).join("")&&(h.page=h.pageReset)}).bind("filterEnd.pager sortEnd.pager",function(){h.currentFilters=f.$table.data("lastSearch"),(h.initialized||h.initializing)&&(f.delayInit&&f.rowsCopy&&0===f.rowsCopy.length&&b(c),o(c,h,!1),z(c,h,!1),f.$table.trigger("applyWidgets"))}).bind("disable.pager",function(e){e.stopPropagation(),w(c,h)}).bind("enable.pager",function(e){e.stopPropagation(),y(c,h,!0)}).bind("destroy.pager",function(e){e.stopPropagation(),v(c,h)}).bind("updateComplete.pager",function(e,t,a){if(e.stopPropagation(),t&&!a&&!h.ajax){var i=f.$tbodies.eq(0).children("tr").not(f.selectorRemove);h.totalRows=i.length-(h.countChildRows?0:i.filter("."+f.cssChildRow).length),h.totalPages=Math.ceil(h.totalRows/h.size),i.length&&f.rowsCopy&&0===f.rowsCopy.length&&b(t),h.page>=h.totalPages&&x(t,h),d(t,h),g(t,h),o(t,h,!0)}}).bind("pageSize.pager refreshComplete.pager",function(e,t){e.stopPropagation(),R(c,parseInt(t,10)||h.settings.size||10,h),d(c,h),o(c,h,!1)}).bind("pageSet.pager pagerUpdate.pager",function(e,t){e.stopPropagation(),"pagerUpdate"===e.type&&(t="undefined"==typeof t?h.page+1:t,h.last.page=!0),h.page=(parseInt(t,10)||1)-1,z(c,h,!0),o(c,h,!1)}).bind("pageAndSize.pager",function(e,t,a){e.stopPropagation(),h.page=(parseInt(t,10)||1)-1,R(c,parseInt(a,10)||h.settings.size||10,h),z(c,h,!0),d(c,h),o(c,h,!1)}),n=[h.cssFirst,h.cssPrev,h.cssNext,h.cssLast],l=[m,P,j,x],f.debug&&!$.length&&t.log("Pager: >> Container not found"),$.find(n.join(",")).attr("tabindex",0).unbind("click.pager").bind("click.pager",function(t){t.stopPropagation();var a,i=e(this),s=n.length;if(!i.hasClass(h.cssDisabled))for(a=0;s>a;a++)if(i.is(n[a])){l[a](c,h);break}}),h.$goto=$.find(h.cssGoto),h.$goto.length?h.$goto.unbind("change.pager").bind("change.pager",function(){h.page=e(this).val()-1,z(c,h,!0),o(c,h,!1)}):f.debug&&t.log("Pager: >> Goto selector not found"),h.$size=$.find(h.cssPageSize),h.$size.length?(h.$size.find("option").removeAttr("selected"),h.$size.unbind("change.pager").bind("change.pager",function(){return h.$size.val(e(this).val()),e(this).hasClass(h.cssDisabled)||(R(c,parseInt(e(this).val(),10),h),g(c,h)),!1})):f.debug&&t.log("Pager: >> Size selector not found"),h.initialized=!1,C.trigger("pagerBeforeInitialized",h),y(c,h,!1),"string"==typeof h.ajaxUrl?(h.ajax=!0,f.widgetOptions.filter_serversideFiltering=!0,f.serverSideSorting=!0,z(c,h)):(h.ajax=!1,e(this).trigger("appendCache",!0),p(c,h)),h.ajax||h.initialized||(h.initializing=!1,h.initialized=!0,z(c,h),f.debug&&t.log("Pager: Triggering pagerInitialized"),f.$table.trigger("pagerInitialized",h),f.widgetOptions.filter_initialized&&t.hasWidget(c,"filter")||o(c,h,!1))}})}}}),t.showError=function(t,a){e(t).each(function(){var t,i=this.config,s=i.pager&&i.pager.cssErrorRow||i.widgetOptions.pager_css&&i.widgetOptions.pager_css.errorRow||"tablesorter-errorRow";i&&("undefined"==typeof a?i.$table.find("thead").find(i.selectorRemove).remove():t=e(/tr\>/.test(a)?a:'<tr><td colspan="'+i.columns+'">'+a+"</td></tr>").click(function(){e(this).remove()}).appendTo(i.$table.find("thead:first")).addClass(s+" "+i.selectorRemove.slice(1)).attr({role:"alert","aria-live":"assertive"}))})},e.fn.extend({tablesorterPager:e.tablesorterPager.construct})}(jQuery);

/*! tablesorter (FORK) - updated 04-08-2015 (v2.21.5)*/
/* Includes widgets ( storage,uitheme,columns,filter,stickyHeaders,resizable,saveSort ) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&"object"==typeof module.exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){return function(e,t,i){"use strict";var r=e.tablesorter=e.tablesorter||{};r.storage=function(a,l,s,n){a=e(a)[0];var o,c,d,f=!1,h={},u=a.config,p=u&&u.widgetOptions,g=n&&n.useSessionStorage||p&&p.storage_useSessionStorage?"sessionStorage":"localStorage",m=e(a),b=n&&n.id||m.attr(n&&n.group||p&&p.storage_group||"data-table-group")||p&&p.storage_tableId||a.id||e(".tablesorter").index(m),y=n&&n.url||m.attr(n&&n.page||p&&p.storage_page||"data-table-page")||p&&p.storage_fixedUrl||u&&u.fixedUrl||t.location.pathname;if(g in t)try{t[g].setItem("_tmptest","temp"),f=!0,t[g].removeItem("_tmptest")}catch(_){u&&u.debug&&r.log(g+" is not supported in this browser")}return e.parseJSON&&(f?h=e.parseJSON(t[g][l]||"null")||{}:(c=i.cookie.split(/[;\s|=]/),o=e.inArray(l,c)+1,h=0!==o?e.parseJSON(c[o]||"null")||{}:{})),(s||""===s)&&t.JSON&&JSON.hasOwnProperty("stringify")?(h[y]||(h[y]={}),h[y][b]=s,f?t[g][l]=JSON.stringify(h):(d=new Date,d.setTime(d.getTime()+31536e6),i.cookie=l+"="+JSON.stringify(h).replace(/\"/g,'"')+"; expires="+d.toGMTString()+"; path=/"),void 0):h&&h[y]?h[y][b]:""}}(jQuery,window,document),function(e){"use strict";var t=e.tablesorter=e.tablesorter||{};t.themes={bootstrap:{table:"table table-bordered table-striped",caption:"caption",header:"bootstrap-header",sortNone:"",sortAsc:"",sortDesc:"",active:"",hover:"",icons:"",iconSortNone:"bootstrap-icon-unsorted",iconSortAsc:"icon-chevron-up glyphicon glyphicon-chevron-up",iconSortDesc:"icon-chevron-down glyphicon glyphicon-chevron-down",filterRow:"",footerRow:"",footerCells:"",even:"",odd:""},jui:{table:"ui-widget ui-widget-content ui-corner-all",caption:"ui-widget-content",header:"ui-widget-header ui-corner-all ui-state-default",sortNone:"",sortAsc:"",sortDesc:"",active:"ui-state-active",hover:"ui-state-hover",icons:"ui-icon",iconSortNone:"ui-icon-carat-2-n-s",iconSortAsc:"ui-icon-carat-1-n",iconSortDesc:"ui-icon-carat-1-s",filterRow:"",footerRow:"",footerCells:"",even:"ui-widget-content",odd:"ui-state-default"}},e.extend(t.css,{wrapper:"tablesorter-wrapper"}),t.addWidget({id:"uitheme",priority:10,format:function(i,r,a){var l,s,n,o,c,d,f,h,u,p,g,m,b=t.themes,y=r.$table.add(e(r.namespace+"_extra_table")),_=r.$headers.add(e(r.namespace+"_extra_headers")),v=r.theme||"jui",x=b[v]||{},w=e.trim([x.sortNone,x.sortDesc,x.sortAsc,x.active].join(" ")),C=e.trim([x.iconSortNone,x.iconSortDesc,x.iconSortAsc].join(" "));for(r.debug&&(o=new Date),y.hasClass("tablesorter-"+v)&&r.theme===r.appliedTheme&&a.uitheme_applied||(a.uitheme_applied=!0,u=b[r.appliedTheme]||{},m=!e.isEmptyObject(u),p=m?[u.sortNone,u.sortDesc,u.sortAsc,u.active].join(" "):"",g=m?[u.iconSortNone,u.iconSortDesc,u.iconSortAsc].join(" "):"",m&&(a.zebra[0]=e.trim(" "+a.zebra[0].replace(" "+u.even,"")),a.zebra[1]=e.trim(" "+a.zebra[1].replace(" "+u.odd,"")),r.$tbodies.children().removeClass([u.even,u.odd].join(" "))),x.even&&(a.zebra[0]+=" "+x.even),x.odd&&(a.zebra[1]+=" "+x.odd),y.children("caption").removeClass(u.caption||"").addClass(x.caption),f=y.removeClass((r.appliedTheme?"tablesorter-"+(r.appliedTheme||""):"")+" "+(u.table||"")).addClass("tablesorter-"+v+" "+(x.table||"")).children("tfoot"),r.appliedTheme=r.theme,f.length&&f.children("tr").removeClass(u.footerRow||"").addClass(x.footerRow).children("th, td").removeClass(u.footerCells||"").addClass(x.footerCells),_.removeClass((m?[u.header,u.hover,p].join(" "):"")||"").addClass(x.header).not(".sorter-false").unbind("mouseenter.tsuitheme mouseleave.tsuitheme").bind("mouseenter.tsuitheme mouseleave.tsuitheme",function(t){e(this)["mouseenter"===t.type?"addClass":"removeClass"](x.hover||"")}),_.each(function(){var i=e(this);i.find("."+t.css.wrapper).length||i.wrapInner('<div class="'+t.css.wrapper+'" style="position:relative;height:100%;width:100%"></div>')}),r.cssIcon&&_.find("."+t.css.icon).removeClass(m?[u.icons,g].join(" "):"").addClass(x.icons||""),y.hasClass("hasFilters")&&y.children("thead").children("."+t.css.filterRow).removeClass(m?u.filterRow||"":"").addClass(x.filterRow||"")),l=0;l<r.columns;l++)c=r.$headers.add(e(r.namespace+"_extra_headers")).not(".sorter-false").filter('[data-column="'+l+'"]'),d=t.css.icon?c.find("."+t.css.icon):e(),h=_.not(".sorter-false").filter('[data-column="'+l+'"]:last'),h.length&&(c.removeClass(w),d.removeClass(C),h[0].sortDisabled?d.removeClass(x.icons||""):(s=x.sortNone,n=x.iconSortNone,h.hasClass(t.css.sortAsc)?(s=[x.sortAsc,x.active].join(" "),n=x.iconSortAsc):h.hasClass(t.css.sortDesc)&&(s=[x.sortDesc,x.active].join(" "),n=x.iconSortDesc),c.addClass(s),d.addClass(n||"")));r.debug&&t.benchmark("Applying "+v+" theme",o)},remove:function(e,i,r,a){if(r.uitheme_applied){var l=i.$table,s=i.appliedTheme||"jui",n=t.themes[s]||t.themes.jui,o=l.children("thead").children(),c=n.sortNone+" "+n.sortDesc+" "+n.sortAsc,d=n.iconSortNone+" "+n.iconSortDesc+" "+n.iconSortAsc;l.removeClass("tablesorter-"+s+" "+n.table),r.uitheme_applied=!1,a||(l.find(t.css.header).removeClass(n.header),o.unbind("mouseenter.tsuitheme mouseleave.tsuitheme").removeClass(n.hover+" "+c+" "+n.active).filter("."+t.css.filterRow).removeClass(n.filterRow),o.find("."+t.css.icon).removeClass(n.icons+" "+d))}}})}(jQuery),function(e){"use strict";var t=e.tablesorter=e.tablesorter||{};t.addWidget({id:"columns",priority:30,options:{columns:["primary","secondary","tertiary"]},format:function(i,r,a){var l,s,n,o,c,d,f,h,u=r.$table,p=r.$tbodies,g=r.sortList,m=g.length,b=a&&a.columns||["primary","secondary","tertiary"],y=b.length-1;for(f=b.join(" "),s=0;s<p.length;s++)l=t.processTbody(i,p.eq(s),!0),n=l.children("tr"),n.each(function(){if(c=e(this),"none"!==this.style.display&&(d=c.children().removeClass(f),g&&g[0]&&(d.eq(g[0][0]).addClass(b[0]),m>1)))for(h=1;m>h;h++)d.eq(g[h][0]).addClass(b[h]||b[y])}),t.processTbody(i,l,!1);if(o=a.columns_thead!==!1?["thead tr"]:[],a.columns_tfoot!==!1&&o.push("tfoot tr"),o.length&&(n=u.find(o.join(",")).children().removeClass(f),m))for(h=0;m>h;h++)n.filter('[data-column="'+g[h][0]+'"]').addClass(b[h]||b[y])},remove:function(i,r,a){var l,s,n=r.$tbodies,o=(a.columns||["primary","secondary","tertiary"]).join(" ");for(r.$headers.removeClass(o),r.$table.children("tfoot").children("tr").children("th, td").removeClass(o),l=0;l<n.length;l++)s=t.processTbody(i,n.eq(l),!0),s.children("tr").each(function(){e(this).children().removeClass(o)}),t.processTbody(i,s,!1)}})}(jQuery),function(e){"use strict";var t=e.tablesorter=e.tablesorter||{},i=t.css;e.extend(i,{filterRow:"tablesorter-filter-row",filter:"tablesorter-filter",filterDisabled:"disabled",filterRowHide:"hideme"}),t.addWidget({id:"filter",priority:50,options:{filter_childRows:!1,filter_columnFilters:!0,filter_columnAnyMatch:!0,filter_cellFilter:"",filter_cssFilter:"",filter_defaultFilter:{},filter_excludeFilter:{},filter_external:"",filter_filteredRow:"filtered",filter_formatter:null,filter_functions:null,filter_hideEmpty:!0,filter_hideFilters:!1,filter_ignoreCase:!0,filter_liveSearch:!0,filter_onlyAvail:"filter-onlyAvail",filter_placeholder:{search:"",select:""},filter_reset:null,filter_saveFilters:!1,filter_searchDelay:300,filter_searchFiltered:!0,filter_selectSource:null,filter_startsWith:!1,filter_useParsedData:!1,filter_serversideFiltering:!1,filter_defaultAttrib:"data-value",filter_selectSourceSeparator:"|"},format:function(e,i,r){i.$table.hasClass("hasFilters")||t.filter.init(e,i,r)},remove:function(r,a,l,s){var n,o,c=a.$table,d=a.$tbodies,f="addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search ".split(" ").join(a.namespace+"filter ");if(c.removeClass("hasFilters").unbind(f.replace(/\s+/g," ")).find("."+i.filterRow).remove(),!s){for(n=0;n<d.length;n++)o=t.processTbody(r,d.eq(n),!0),o.children().removeClass(l.filter_filteredRow).show(),t.processTbody(r,o,!1);l.filter_reset&&e(document).undelegate(l.filter_reset,"click.tsfilter")}}}),t.filter={regex:{regex:/^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/,child:/tablesorter-childRow/,filtered:/filtered/,type:/undefined|number/,exact:/(^[\"\'=]+)|([\"\'=]+$)/g,nondigit:/[^\w,. \-()]/g,operators:/[<>=]/g,query:"(q|query)"},types:{regex:function(e,i){if(t.filter.regex.regex.test(i.iFilter)){var r,a=t.filter.regex.regex.exec(i.iFilter);try{r=new RegExp(a[1],a[2]).test(i.iExact)}catch(l){r=!1}return r}return null},operators:function(i,r){if(/^[<>]=?/.test(r.iFilter)){var a,l,s=i.table,n=r.index,o=r.parsed[n],c=t.formatFloat(r.iFilter.replace(t.filter.regex.operators,""),s),d=i.parsers[n],f=c;return(o||"numeric"===d.type)&&(l=t.filter.parseFilter(i,e.trim(""+r.iFilter.replace(t.filter.regex.operators,"")),n,o,!0),c="number"!=typeof l||""===l||isNaN(l)?c:l),a=!o&&"numeric"!==d.type||isNaN(c)||"undefined"==typeof r.cache?isNaN(r.iExact)?t.formatFloat(r.iExact.replace(t.filter.regex.nondigit,""),s):t.formatFloat(r.iExact,s):r.cache,/>/.test(r.iFilter)&&(l=/>=/.test(r.iFilter)?a>=c:a>c),/</.test(r.iFilter)&&(l=/<=/.test(r.iFilter)?c>=a:c>a),l||""!==f||(l=!0),l}return null},notMatch:function(i,r){if(/^\!/.test(r.iFilter)){var a,l=t.filter.parseFilter(i,r.iFilter.replace("!",""),r.index,r.parsed[r.index])||"";return t.filter.regex.exact.test(l)?(l=l.replace(t.filter.regex.exact,""),""===l?!0:e.trim(l)!==r.iExact):(a=r.iExact.search(e.trim(l)),""===l?!0:!(i.widgetOptions.filter_startsWith?0===a:a>=0))}return null},exact:function(i,r){if(t.filter.regex.exact.test(r.iFilter)){var a=t.filter.parseFilter(i,r.iFilter.replace(t.filter.regex.exact,""),r.index,r.parsed[r.index])||"";return r.anyMatch?e.inArray(a,r.rowArray)>=0:a==r.iExact}return null},and:function(i,r){if(t.filter.regex.andTest.test(r.filter)){for(var a=r.index,l=r.parsed[a],s=r.iFilter.split(t.filter.regex.andSplit),n=r.iExact.search(e.trim(t.filter.parseFilter(i,s[0],a,l)))>=0,o=s.length-1;n&&o;)n=n&&r.iExact.search(e.trim(t.filter.parseFilter(i,s[o],a,l)))>=0,o--;return n}return null},range:function(e,i){if(t.filter.regex.toTest.test(i.iFilter)){var r,a,l=e.table,s=i.index,n=i.parsed[s],o=i.iFilter.split(t.filter.regex.toSplit),c=t.formatFloat(t.filter.parseFilter(e,o[0].replace(t.filter.regex.nondigit,"")||"",s,n),l),d=t.formatFloat(t.filter.parseFilter(e,o[1].replace(t.filter.regex.nondigit,"")||"",s,n),l);return(n||"numeric"===e.parsers[s].type)&&(r=e.parsers[s].format(""+o[0],l,e.$headers.eq(s),s),c=""===r||isNaN(r)?c:r,r=e.parsers[s].format(""+o[1],l,e.$headers.eq(s),s),d=""===r||isNaN(r)?d:r),r=!n&&"numeric"!==e.parsers[s].type||isNaN(c)||isNaN(d)?isNaN(i.iExact)?t.formatFloat(i.iExact.replace(t.filter.regex.nondigit,""),l):t.formatFloat(i.iExact,l):i.cache,c>d&&(a=c,c=d,d=a),r>=c&&d>=r||""===c||""===d}return null},wild:function(i,r){if(/[\?\*\|]/.test(r.iFilter)||t.filter.regex.orReplace.test(r.filter)){var a=r.index,l=r.parsed[a],s=t.filter.parseFilter(i,r.iFilter.replace(t.filter.regex.orReplace,"|"),a,l)||"";return!i.$headerIndexed[a].hasClass("filter-match")&&/\|/.test(s)&&("|"===s[s.length-1]&&(s+="*"),s=r.anyMatch&&e.isArray(r.rowArray)?"("+s+")":"^("+s+")$"),new RegExp(s.replace(/\?/g,"\\S{1}").replace(/\*/g,"\\S*")).test(r.iExact)}return null},fuzzy:function(e,i){if(/^~/.test(i.iFilter)){var r,a=0,l=i.iExact.length,s=t.filter.parseFilter(e,i.iFilter.slice(1),i.index,i.parsed[i.index])||"";for(r=0;l>r;r++)i.iExact[r]===s[a]&&(a+=1);return a===s.length?!0:!1}return null}},init:function(r,a,l){t.language=e.extend(!0,{},{to:"to",or:"or",and:"and"},t.language);var s,n,o,c,d,f,h,u,p,g=t.filter.regex;if(a.$table.addClass("hasFilters"),l.searchTimer=null,l.filter_initTimer=null,l.filter_formatterCount=0,l.filter_formatterInit=[],l.filter_anyColumnSelector='[data-column="all"],[data-column="any"]',l.filter_multipleColumnSelector='[data-column*="-"],[data-column*=","]',o="\\{"+t.filter.regex.query+"\\}",e.extend(g,{child:new RegExp(a.cssChildRow),filtered:new RegExp(l.filter_filteredRow),alreadyFiltered:new RegExp("(\\s+("+t.language.or+"|-|"+t.language.to+")\\s+)","i"),toTest:new RegExp("\\s+(-|"+t.language.to+")\\s+","i"),toSplit:new RegExp("(?:\\s+(?:-|"+t.language.to+")\\s+)","gi"),andTest:new RegExp("\\s+("+t.language.and+"|&&)\\s+","i"),andSplit:new RegExp("(?:\\s+(?:"+t.language.and+"|&&)\\s+)","gi"),orReplace:new RegExp("\\s+("+t.language.or+")\\s+","gi"),iQuery:new RegExp(o,"i"),igQuery:new RegExp(o,"ig")}),l.filter_columnFilters!==!1&&a.$headers.filter(".filter-false, .parser-false").length!==a.$headers.length&&t.filter.buildRow(r,a,l),o="addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search ".split(" ").join(a.namespace+"filter "),a.$table.bind(o,function(s,n){return h=l.filter_hideEmpty&&e.isEmptyObject(a.cache)&&!(a.delayInit&&"appendCache"===s.type),a.$table.find("."+i.filterRow).toggleClass(l.filter_filteredRow,h),/(search|filter)/.test(s.type)||(s.stopPropagation(),t.filter.buildDefault(r,!0)),"filterReset"===s.type?(a.$table.find("."+i.filter).add(l.filter_$externalFilters).val(""),t.filter.searching(r,[])):"filterEnd"===s.type?t.filter.buildDefault(r,!0):(n="search"===s.type?n:"updateComplete"===s.type?a.$table.data("lastSearch"):"",/(update|add)/.test(s.type)&&"updateComplete"!==s.type&&(a.lastCombinedFilter=null,a.lastSearch=[]),t.filter.searching(r,n,!0)),!1}),l.filter_reset&&(l.filter_reset instanceof e?l.filter_reset.click(function(){a.$table.trigger("filterReset")}):e(l.filter_reset).length&&e(document).undelegate(l.filter_reset,"click.tsfilter").delegate(l.filter_reset,"click.tsfilter",function(){a.$table.trigger("filterReset")})),l.filter_functions)for(d=0;d<a.columns;d++)if(u=t.getColumnData(r,l.filter_functions,d))if(c=a.$headerIndexed[d].removeClass("filter-select"),p=!(c.hasClass("filter-false")||c.hasClass("parser-false")),s="",u===!0&&p)t.filter.buildSelect(r,d);else if("object"==typeof u&&p){for(n in u)"string"==typeof n&&(s+=""===s?'<option value="">'+(c.data("placeholder")||c.attr("data-placeholder")||l.filter_placeholder.select||"")+"</option>":"",h=n,o=n,n.indexOf(l.filter_selectSourceSeparator)>=0&&(h=n.split(l.filter_selectSourceSeparator),o=h[1],h=h[0]),s+="<option "+(o===h?"":'data-function-name="'+n+'" ')+'value="'+h+'">'+o+"</option>");a.$table.find("thead").find("select."+i.filter+'[data-column="'+d+'"]').append(s),o=l.filter_selectSource,u=e.isFunction(o)?!0:t.getColumnData(r,o,d),u&&t.filter.buildSelect(a.table,d,"",!0,c.hasClass(l.filter_onlyAvail))}t.filter.buildDefault(r,!0),t.filter.bindSearch(r,a.$table.find("."+i.filter),!0),l.filter_external&&t.filter.bindSearch(r,l.filter_external),l.filter_hideFilters&&t.filter.hideFilters(r,a),a.showProcessing&&a.$table.unbind("filterStart filterEnd ".split(" ").join(a.namespace+"filter ").replace(/\s+/g," ")).bind("filterStart filterEnd ".split(" ").join(a.namespace+"filter "),function(l,s){c=s?a.$table.find("."+i.header).filter("[data-column]").filter(function(){return""!==s[e(this).data("column")]}):"",t.isProcessing(r,"filterStart"===l.type,s?c:"")}),a.filteredRows=a.totalRows,a.$table.unbind("tablesorter-initialized pagerBeforeInitialized ".split(" ").join(a.namespace+"filter ").replace(/\s+/g," ")).bind("tablesorter-initialized pagerBeforeInitialized ".split(" ").join(a.namespace+"filter "),function(){var e=this.config.widgetOptions;f=t.filter.setDefaults(r,a,e)||[],f.length&&(a.delayInit&&""===f.join("")||t.setFilters(r,f,!0)),a.$table.trigger("filterFomatterUpdate"),setTimeout(function(){e.filter_initialized||t.filter.filterInitComplete(a)},100)}),a.pager&&a.pager.initialized&&!l.filter_initialized&&(a.$table.trigger("filterFomatterUpdate"),setTimeout(function(){t.filter.filterInitComplete(a)},100))},formatterUpdated:function(e,t){var i=e.closest("table")[0].config.widgetOptions;i.filter_initialized||(i.filter_formatterInit[t]=1)},filterInitComplete:function(i){var r,a,l=i.widgetOptions,s=0,n=function(){l.filter_initialized=!0,i.$table.trigger("filterInit",i),t.filter.findRows(i.table,i.$table.data("lastSearch")||[])};if(e.isEmptyObject(l.filter_formatter))n();else{for(a=l.filter_formatterInit.length,r=0;a>r;r++)1===l.filter_formatterInit[r]&&s++;clearTimeout(l.filter_initTimer),l.filter_initialized||s!==l.filter_formatterCount?l.filter_initialized||(l.filter_initTimer=setTimeout(function(){n()},500)):n()}},setDefaults:function(i,r,a){var l,s,n,o,c,d=t.getFilters(i)||[];if(a.filter_saveFilters&&t.storage&&(s=t.storage(i,"tablesorter-filters")||[],l=e.isArray(s),l&&""===s.join("")||!l||(d=s)),""===d.join(""))for(c=r.$headers.add(a.filter_$externalFilters).filter("["+a.filter_defaultAttrib+"]"),n=0;n<=r.columns;n++)o=n===r.columns?"all":n,d[n]=c.filter('[data-column="'+o+'"]').attr(a.filter_defaultAttrib)||d[n]||"";return r.$table.data("lastSearch",d),d},parseFilter:function(e,t,i,r,a){return a||r?e.parsers[i].format(t,e.table,[],i):t},buildRow:function(r,a,l){var s,n,o,c,d,f,h,u=a.columns,p=e.isArray(l.filter_cellFilter),g='<tr role="row" class="'+i.filterRow+" "+a.cssIgnoreRow+'">';for(n=0;u>n;n++)g+=p?"<td"+(l.filter_cellFilter[n]?' class="'+l.filter_cellFilter[n]+'"':"")+"></td>":"<td"+(""!==l.filter_cellFilter?' class="'+l.filter_cellFilter+'"':"")+"></td>";for(a.$filters=e(g+="</tr>").appendTo(a.$table.children("thead").eq(0)).find("td"),n=0;u>n;n++)d=!1,o=a.$headerIndexed[n],h=t.getColumnData(r,l.filter_functions,n),c=l.filter_functions&&h&&"function"!=typeof h||o.hasClass("filter-select"),s=t.getColumnData(r,a.headers,n),d="false"===t.getData(o[0],s,"filter")||"false"===t.getData(o[0],s,"parser"),c?g=e("<select>").appendTo(a.$filters.eq(n)):(h=t.getColumnData(r,l.filter_formatter,n),h?(l.filter_formatterCount++,g=h(a.$filters.eq(n),n),g&&0===g.length&&(g=a.$filters.eq(n).children("input")),g&&(0===g.parent().length||g.parent().length&&g.parent()[0]!==a.$filters[n])&&a.$filters.eq(n).append(g)):g=e('<input type="search">').appendTo(a.$filters.eq(n)),g&&g.attr("placeholder",o.data("placeholder")||o.attr("data-placeholder")||l.filter_placeholder.search||"")),g&&(f=(e.isArray(l.filter_cssFilter)?"undefined"!=typeof l.filter_cssFilter[n]?l.filter_cssFilter[n]||"":"":l.filter_cssFilter)||"",g.addClass(i.filter+" "+f).attr("data-column",n),d&&(g.attr("placeholder","").addClass(i.filterDisabled)[0].disabled=!0))},bindSearch:function(i,r,a){if(i=e(i)[0],r=e(r),r.length){var l=i.config,s=l.widgetOptions,n=s.filter_$externalFilters;a!==!0&&(s.filter_$anyMatch=r.filter(s.filter_anyColumnSelector+","+s.filter_multipleColumnSelector),s.filter_$externalFilters=n&&n.length?s.filter_$externalFilters.add(r):r,t.setFilters(i,l.$table.data("lastSearch")||[],a===!1)),r.attr("data-lastSearchTime",(new Date).getTime()).unbind("keypress keyup search change ".split(" ").join(l.namespace+"filter ").replace(/\s+/g," ")).bind("keyup"+l.namespace+"filter",function(r){if(e(this).attr("data-lastSearchTime",(new Date).getTime()),27===r.which)this.value="";else{if(s.filter_liveSearch===!1)return;if(""!==this.value&&("number"==typeof s.filter_liveSearch&&this.value.length<s.filter_liveSearch||13!==r.which&&8!==r.which&&(r.which<32||r.which>=37&&r.which<=40)))return}t.filter.searching(i,!0,!0)}).bind("search change keypress ".split(" ").join(l.namespace+"filter "),function(r){var a=e(this).data("column");console.log(),(13===r.which||"search"===r.type||"change"===r.type&&this.value!==l.lastSearch[a])&&(r.preventDefault(),e(this).attr("data-lastSearchTime",(new Date).getTime()),t.filter.searching(i,!1,!0))})}},searching:function(e,i,r){var a=e.config.widgetOptions;clearTimeout(a.searchTimer),"undefined"==typeof i||i===!0?a.searchTimer=setTimeout(function(){t.filter.checkFilters(e,i,r)},a.filter_liveSearch?a.filter_searchDelay:10):t.filter.checkFilters(e,i,r)},checkFilters:function(r,a,l){var s=r.config,n=s.widgetOptions,o=e.isArray(a),c=o?a:t.getFilters(r,!0),d=(c||[]).join("");return e.isEmptyObject(s.cache)?void(s.delayInit&&s.pager&&s.pager.initialized&&s.$table.trigger("updateCache",[function(){t.filter.checkFilters(r,!1,l)}])):(o&&(t.setFilters(r,c,!1,l!==!0),n.filter_initialized||(s.lastCombinedFilter="")),n.filter_hideFilters&&s.$table.find("."+i.filterRow).trigger(""===d?"mouseleave":"mouseenter"),s.lastCombinedFilter!==d||a===!1?(a===!1&&(s.lastCombinedFilter=null,s.lastSearch=[]),n.filter_initialized&&s.$table.trigger("filterStart",[c]),s.showProcessing?void setTimeout(function(){return t.filter.findRows(r,c,d),!1},30):(t.filter.findRows(r,c,d),!1)):void 0)},hideFilters:function(r,a){var l,s,n;e(r).find("."+i.filterRow).addClass(i.filterRowHide).bind("mouseenter mouseleave",function(t){var r=t;l=e(this),clearTimeout(n),n=setTimeout(function(){/enter|over/.test(r.type)?l.removeClass(i.filterRowHide):e(document.activeElement).closest("tr")[0]!==l[0]&&""===a.lastCombinedFilter&&l.addClass(i.filterRowHide)},200)}).find("input, select").bind("focus blur",function(r){s=e(this).closest("tr"),clearTimeout(n);var l=r;n=setTimeout(function(){""===t.getFilters(a.$table).join("")&&s["focus"===l.type?"removeClass":"addClass"](i.filterRowHide)},200)})},defaultFilter:function(i,r){if(""===i)return i;var a=t.filter.regex.iQuery,l=r.match(t.filter.regex.igQuery).length,s=l>1?e.trim(i).split(/\s/):[e.trim(i)],n=s.length-1,o=0,c=r;for(1>n&&l>1&&(s[1]=s[0]);a.test(c);)c=c.replace(a,s[o++]||""),a.test(c)&&n>o&&""!==(s[o]||"")&&(c=r.replace(a,c));return c},getLatestSearch:function(t){return t?t.sort(function(t,i){return e(i).attr("data-lastSearchTime")-e(t).attr("data-lastSearchTime")}):e()},multipleColumns:function(i,r){var a,l,s,n,o,c,d,f,h,u=i.widgetOptions,p=u.filter_initialized||!r.filter(u.filter_anyColumnSelector).length,g=[],m=e.trim(t.filter.getLatestSearch(r).attr("data-column")||"");if(p&&/-/.test(m))for(l=m.match(/(\d+)\s*-\s*(\d+)/g),h=l.length,f=0;h>f;f++){for(s=l[f].split(/\s*-\s*/),n=parseInt(s[0],10)||0,o=parseInt(s[1],10)||i.columns-1,n>o&&(a=n,n=o,o=a),o>=i.columns&&(o=i.columns-1);o>=n;n++)g.push(n);m=m.replace(l[f],"")}if(p&&/,/.test(m))for(c=m.split(/\s*,\s*/),h=c.length,d=0;h>d;d++)""!==c[d]&&(f=parseInt(c[d],10),f<i.columns&&g.push(f));if(!g.length)for(f=0;f<i.columns;f++)g.push(f);return g},findRows:function(i,r,a){if(i.config.lastCombinedFilter!==a&&i.config.widgetOptions.filter_initialized){var l,s,n,o,c,d,f,h,u,p,g,m,b,y,_,v,x,w,C,z,F,S,$,R,k,T,A,H,I=t.filter.regex,j=i.config,E=j.widgetOptions,D={anyMatch:!1},O=["range","notMatch","operators"];for(D.parsed=j.$headers.map(function(r){return j.parsers&&j.parsers[r]&&j.parsers[r].parsed||t.getData&&"parsed"===t.getData(j.$headerIndexed[r],t.getColumnData(i,j.headers,r),"filter")||e(this).hasClass("filter-parsed")}).get(),E.filter_indexed={functions:[],excludeFilter:[],defaultColFilter:[],defaultAnyFilter:t.getColumnData(i,E.filter_defaultFilter,j.columns,!0)||""},u=0;u<j.columns;u++)E.filter_indexed.functions[u]=t.getColumnData(i,E.filter_functions,u),E.filter_indexed.defaultColFilter[u]=t.getColumnData(i,E.filter_defaultFilter,u)||"",E.filter_indexed.excludeFilter[u]=(t.getColumnData(i,E.filter_excludeFilter,u,!0)||"").split(/\s+/);for(j.debug&&(t.log("Filter: Starting filter widget search",r),v=new Date),j.filteredRows=0,j.totalRows=0,a=(r||[]).join(""),c=0;c<j.$tbodies.length;c++){if(d=t.processTbody(i,j.$tbodies.eq(c),!0),u=j.columns,s=j.cache[c].normalized,n=e(e.map(s,function(e){return e[u].$row.get()})),""===a||E.filter_serversideFiltering)n.removeClass(E.filter_filteredRow).not("."+j.cssChildRow).css("display","");else{if(n=n.not("."+j.cssChildRow),l=n.length,(E.filter_$anyMatch&&E.filter_$anyMatch.length||"undefined"!=typeof r[j.columns])&&(D.anyMatchFlag=!0,D.anyMatchFilter=E.filter_$anyMatch&&t.filter.getLatestSearch(E.filter_$anyMatch).val()||""+r[j.columns]||"",E.filter_columnAnyMatch)){for(k=D.anyMatchFilter.split(t.filter.regex.andSplit),T=!1,w=0;w<k.length;w++)A=k[w].split(":"),A.length>1&&(H=parseInt(A[0],10)-1,H>=0&&H<j.columns&&(r[H]=A[1],k.splice(w,1),w--,T=!0));T&&(D.anyMatchFilter=k.join(" && "))}if(z=E.filter_searchFiltered,g=j.lastSearch||j.$table.data("lastSearch")||[],z)for(w=0;u+1>w;w++)x=r[w]||"",z||(w=u),z=!(!z||!g.length||0!==x.indexOf(g[w]||"")||I.alreadyFiltered.test(x)||/[=\"\|!]/.test(x)||/(>=?\s*-\d)/.test(x)||/(<=?\s*\d)/.test(x)||""!==x&&j.$filters&&j.$filters.eq(w).find("select").length&&!j.$headerIndexed[w].hasClass("filter-match"));for(C=n.not("."+E.filter_filteredRow).length,z&&0===C&&(z=!1),j.debug&&t.log("Filter: Searching through "+(z&&l>C?C:"all")+" rows"),D.anyMatchFlag&&(j.sortLocaleCompare&&(D.anyMatchFilter=t.replaceAccents(D.anyMatchFilter)),E.filter_defaultFilter&&I.iQuery.test(E.filter_indexed.defaultAnyFilter)&&(D.anyMatchFilter=t.filter.defaultFilter(D.anyMatchFilter,E.filter_indexed.defaultAnyFilter),z=!1),D.iAnyMatchFilter=E.filter_ignoreCase&&j.ignoreCase?D.anyMatchFilter.toLocaleLowerCase():D.anyMatchFilter),o=0;l>o;o++)if(D.cacheArray=s[o],p=n[o].className,!(I.child.test(p)||z&&I.filtered.test(p))){if(_=!0,p=n.eq(o).nextUntil("tr:not(."+j.cssChildRow+")"),D.childRowText=p.length&&E.filter_childRows?p.text():"",D.childRowText=E.filter_ignoreCase?D.childRowText.toLocaleLowerCase():D.childRowText,f=n.eq(o).children(),D.anyMatchFlag){if(u=t.filter.multipleColumns(j,E.filter_$anyMatch),D.anyMatch=!0,D.rowArray=f.map(function(i){if(e.inArray(i,u)>-1){var r;return D.parsed[i]?r=D.cacheArray[i]:(r=this?this.getAttribute(j.textAttribute)||this.textContent||e(this).text():"",r=e.trim(E.filter_ignoreCase?r.toLowerCase():r),j.sortLocaleCompare&&(r=t.replaceAccents(r))),r}}).get(),D.filter=D.anyMatchFilter,D.iFilter=D.iAnyMatchFilter,D.exact=D.rowArray.join(" "),D.iExact=E.filter_ignoreCase?D.exact.toLowerCase():D.exact,D.cache=D.cacheArray.slice(0,-1).join(" "),F=null,e.each(t.filter.types,function(t,i){return e.inArray(t,O)<0&&(b=i(j,D),null!==b)?(F=b,!1):void 0}),null!==F)_=F;else if(E.filter_startsWith)for(_=!1,u=j.columns;!_&&u>0;)u--,_=_||0===D.rowArray[u].indexOf(D.iFilter);else _=(D.iExact+D.childRowText).indexOf(D.iFilter)>=0;D.anyMatch=!1}for(u=0;u<j.columns;u++)D.filter=r[u],D.index=u,S=E.filter_indexed.excludeFilter[u],D.filter&&(D.cache=D.cacheArray[u],E.filter_useParsedData||D.parsed[u]?D.exact=D.cache:(x=f[u],y=x?e.trim(x.getAttribute(j.textAttribute)||x.textContent||f.eq(u).text()):"",D.exact=j.sortLocaleCompare?t.replaceAccents(y):y),D.iExact=!I.type.test(typeof D.exact)&&E.filter_ignoreCase?D.exact.toLocaleLowerCase():D.exact,y=_,R=E.filter_columnFilters?j.$filters.add(j.$externalFilters).filter('[data-column="'+u+'"]').find("select option:selected").attr("data-function-name")||"":"",j.sortLocaleCompare&&(D.filter=t.replaceAccents(D.filter)),x=!0,E.filter_defaultFilter&&I.iQuery.test(E.filter_indexed.defaultColFilter[u])&&(D.filter=t.filter.defaultFilter(D.filter,E.filter_indexed.defaultColFilter[u]),x=!1),D.iFilter=E.filter_ignoreCase?(D.filter||"").toLocaleLowerCase():D.filter,$=E.filter_indexed.functions[u],h=j.$headerIndexed[u],m=h.hasClass("filter-select"),F=null,($||m&&x)&&($===!0||m?F=h.hasClass("filter-match")?D.iExact.search(D.iFilter)>=0:D.filter===D.exact:"function"==typeof $?F=$(D.exact,D.cache,D.filter,u,n.eq(o),j):"function"==typeof $[R||D.filter]&&(F=$[R||D.filter](D.exact,D.cache,D.filter,u,n.eq(o),j))),null===F?(e.each(t.filter.types,function(t,i){return e.inArray(t,S)<0&&(b=i(j,D),null!==b)?(F=b,!1):void 0}),null!==F?y=F:(D.exact=(D.iExact+D.childRowText).indexOf(t.filter.parseFilter(j,D.iFilter,u,D.parsed[u])),y=!E.filter_startsWith&&D.exact>=0||E.filter_startsWith&&0===D.exact)):y=F,_=y?_:!1);n.eq(o).toggleClass(E.filter_filteredRow,!_)[0].display=_?"":"none",p.length&&p.toggleClass(E.filter_filteredRow,!_)}}j.filteredRows+=n.not("."+E.filter_filteredRow).length,j.totalRows+=n.length,t.processTbody(i,d,!1)}j.lastCombinedFilter=a,j.lastSearch=r,j.$table.data("lastSearch",r),E.filter_saveFilters&&t.storage&&t.storage(i,"tablesorter-filters",r),j.debug&&t.benchmark("Completed filter widget search",v),E.filter_initialized&&j.$table.trigger("filterEnd",j),setTimeout(function(){j.$table.trigger("applyWidgets")},0)}},getOptionSource:function(i,r,a){i=e(i)[0];var l,s,n,o=i.config,c=o.widgetOptions,d=[],f=!1,h=c.filter_selectSource,u=o.$table.data("lastSearch")||[],p=e.isFunction(h)?!0:t.getColumnData(i,h,r);if(a&&""!==u[r]&&(a=!1),p===!0)f=h(i,r,a);else{if(p instanceof e||"string"===e.type(p)&&p.indexOf("</option>")>=0)return p;e.isArray(p)?f=p:"object"===e.type(h)&&p&&(f=p(i,r,a))}if(f===!1&&(f=t.filter.getOptions(i,r,a)),f=e.grep(f,function(t,i){return e.inArray(t,f)===i}),o.$headerIndexed[r].hasClass("filter-select-nosort"))return f;for(n=f.length,s=0;n>s;s++)d.push({t:f[s],p:o.parsers&&o.parsers[r].format(f[s],i,[],r)});for(l=o.textSorter||"",d.sort(function(a,s){var n=a.p.toString(),o=s.p.toString();return e.isFunction(l)?l(n,o,!0,r,i):"object"==typeof l&&l.hasOwnProperty(r)?l[r](n,o,!0,r,i):t.sortNatural?t.sortNatural(n,o):!0}),f=[],n=d.length,s=0;n>s;s++)f.push(d[s].t);return f},getOptions:function(t,i,r){t=e(t)[0];var a,l,s,n,o,c,d=t.config,f=d.widgetOptions,h=[];for(l=0;l<d.$tbodies.length;l++)for(o=d.cache[l],s=d.cache[l].normalized.length,a=0;s>a;a++)n=o.row?o.row[a]:o.normalized[a][d.columns].$row[0],r&&n.className.match(f.filter_filteredRow)||(f.filter_useParsedData||d.parsers[i].parsed||d.$headerIndexed[i].hasClass("filter-parsed")?h.push(""+o.normalized[a][i]):(c=n.cells[i],c&&h.push(e.trim(c.getAttribute(d.textAttribute)||c.textContent||e(c).text()))));return h},buildSelect:function(r,a,l,s,n){if(r=e(r)[0],a=parseInt(a,10),r.config.cache&&!e.isEmptyObject(r.config.cache)){var o,c,d,f,h,u,p=r.config,g=p.widgetOptions,m=p.$headerIndexed[a],b='<option value="">'+(m.data("placeholder")||m.attr("data-placeholder")||g.filter_placeholder.select||"")+"</option>",y=p.$table.find("thead").find("select."+i.filter+'[data-column="'+a+'"]').val();if(("undefined"==typeof l||""===l)&&(l=t.filter.getOptionSource(r,a,n)),e.isArray(l)){for(o=0;o<l.length;o++)d=l[o]=(""+l[o]).replace(/\"/g,"&quot;"),c=d,d.indexOf(g.filter_selectSourceSeparator)>=0&&(f=d.split(g.filter_selectSourceSeparator),c=f[0],d=f[1]),b+=""!==l[o]?"<option "+(c===d?"":'data-function-name="'+l[o]+'" ')+'value="'+c+'">'+d+"</option>":"";l=[]}h=(p.$filters?p.$filters:p.$table.children("thead")).find("."+i.filter),g.filter_$externalFilters&&(h=h&&h.length?h.add(g.filter_$externalFilters):g.filter_$externalFilters),u=h.filter('select[data-column="'+a+'"]'),u.length&&(u[s?"html":"append"](b),e.isArray(l)||u.append(l).val(y),u.val(y))}},buildDefault:function(e,i){var r,a,l,s=e.config,n=s.widgetOptions,o=s.columns;for(r=0;o>r;r++)a=s.$headerIndexed[r],l=!(a.hasClass("filter-false")||a.hasClass("parser-false")),(a.hasClass("filter-select")||t.getColumnData(e,n.filter_functions,r)===!0)&&l&&t.filter.buildSelect(e,r,"",i,a.hasClass(n.filter_onlyAvail))}},t.getFilters=function(r,a,l,s){var n,o,c,d,f=!1,h=r?e(r)[0].config:"",u=h?h.widgetOptions:"";if(a!==!0&&u&&!u.filter_columnFilters)return e(r).data("lastSearch");if(h&&(h.$filters&&(o=h.$filters.find("."+i.filter)),u.filter_$externalFilters&&(o=o&&o.length?o.add(u.filter_$externalFilters):u.filter_$externalFilters),o&&o.length))for(f=l||[],n=0;n<h.columns+1;n++)d=n===h.columns?u.filter_anyColumnSelector+","+u.filter_multipleColumnSelector:'[data-column="'+n+'"]',c=o.filter(d),c.length&&(c=t.filter.getLatestSearch(c),e.isArray(l)?(s&&c.slice(1),n===h.columns&&(d=c.filter(u.filter_anyColumnSelector),c=d.length?d:c),c.val(l[n]).trigger("change.tsfilter")):(f[n]=c.val()||"",n===h.columns?c.slice(1).filter('[data-column*="'+c.attr("data-column")+'"]').val(f[n]):c.slice(1).val(f[n])),n===h.columns&&c.length&&(u.filter_$anyMatch=c));return 0===f.length&&(f=!1),f},t.setFilters=function(i,r,a,l){var s=i?e(i)[0].config:"",n=t.getFilters(i,!0,r,l);return s&&a&&(s.lastCombinedFilter=null,s.lastSearch=[],t.filter.searching(s.table,r,l),s.$table.trigger("filterFomatterUpdate")),!!n}}(jQuery),function(e,t){"use strict";var i=e.tablesorter=e.tablesorter||{};e.extend(i.css,{sticky:"tablesorter-stickyHeader",stickyVis:"tablesorter-sticky-visible",stickyHide:"tablesorter-sticky-hidden",stickyWrap:"tablesorter-sticky-wrapper"}),i.addHeaderResizeEvent=function(t,i,r){t=e(t)[0];
	var a,l={timer:250},s=e.extend({},l,r),n=t.config,o=n.widgetOptions,c=function(t){o.resize_flag=!0,a=[],n.$headers.each(function(){var t=e(this),i=t.data("savedSizes")||[0,0],r=this.offsetWidth,l=this.offsetHeight;(r!==i[0]||l!==i[1])&&(t.data("savedSizes",[r,l]),a.push(this))}),a.length&&t!==!1&&n.$table.trigger("resize",[a]),o.resize_flag=!1};return c(!1),clearInterval(o.resize_timer),i?(o.resize_flag=!1,!1):void(o.resize_timer=setInterval(function(){o.resize_flag||c()},s.timer))},i.addWidget({id:"stickyHeaders",priority:60,options:{stickyHeaders:"",stickyHeaders_attachTo:null,stickyHeaders_xScroll:null,stickyHeaders_yScroll:null,stickyHeaders_offset:0,stickyHeaders_filteredToTop:!0,stickyHeaders_cloneId:"-sticky",stickyHeaders_addResizeEvent:!0,stickyHeaders_includeCaption:!0,stickyHeaders_zIndex:2},format:function(r,a,l){if(!(a.$table.hasClass("hasStickyHeaders")||e.inArray("filter",a.widgets)>=0&&!a.$table.hasClass("hasFilters"))){var s,n=a.$table,o=e(l.stickyHeaders_attachTo),c=a.namespace+"stickyheaders ",d=e(l.stickyHeaders_yScroll||l.stickyHeaders_attachTo||t),f=e(l.stickyHeaders_xScroll||l.stickyHeaders_attachTo||t),h=n.children("thead:first"),u=h.children("tr").not(".sticky-false").children(),p=n.children("tfoot"),g=isNaN(l.stickyHeaders_offset)?e(l.stickyHeaders_offset):"",m=g.length?g.height()||0:parseInt(l.stickyHeaders_offset,10)||0,b=n.parent().closest("."+i.css.table).hasClass("hasStickyHeaders")?n.parent().closest("table.tablesorter")[0].config.widgetOptions.$sticky.parent():[],y=b.length?b.height():0,_=l.$sticky=n.clone().addClass("containsStickyHeaders "+i.css.sticky+" "+l.stickyHeaders+" "+a.namespace.slice(1)+"_extra_table").wrap('<div class="'+i.css.stickyWrap+'">'),v=_.parent().addClass(i.css.stickyHide).css({position:o.length?"absolute":"fixed",padding:parseInt(_.parent().parent().css("padding-left"),10),top:m+y,left:0,visibility:"hidden",zIndex:l.stickyHeaders_zIndex||2}),x=_.children("thead:first"),w="",C=0,z=function(i,r){i.filter(":visible").each(function(i){var a,l,s=r.filter(":visible").eq(i),n=e(this);"border-box"===n.css("box-sizing")?a=n.outerWidth():"collapse"===s.css("border-collapse")?t.getComputedStyle?a=parseFloat(t.getComputedStyle(this,null).width):(l=parseFloat(n.css("border-width")),a=n.outerWidth()-parseFloat(n.css("padding-left"))-parseFloat(n.css("padding-right"))-l):a=n.width(),s.css({"min-width":a,"max-width":a})})},F=function(){m=g.length?g.height()||0:parseInt(l.stickyHeaders_offset,10)||0,C=0,v.css({left:o.length?parseInt(o.css("padding-left"),10)||0:n.offset().left-parseInt(n.css("margin-left"),10)-f.scrollLeft()-C,width:n.outerWidth()}),z(n,_),z(u,s)};o.length&&!o.css("position")&&o.css("position","relative"),_.attr("id")&&(_[0].id+=l.stickyHeaders_cloneId),_.find("thead:gt(0), tr.sticky-false").hide(),_.find("tbody, tfoot").remove(),_.find("caption").toggle(l.stickyHeaders_includeCaption),s=x.children().children(),_.css({height:0,width:0,margin:0}),s.find("."+i.css.resizer).remove(),n.addClass("hasStickyHeaders").bind("pagerComplete"+c,function(){F()}),i.bindEvents(r,x.children().children("."+i.css.header)),n.after(v),a.onRenderHeader&&x.children("tr").children().each(function(t){a.onRenderHeader.apply(e(this),[t,a,_])}),f.add(d).unbind("scroll resize ".split(" ").join(c).replace(/\s+/g," ")).bind("scroll resize ".split(" ").join(c),function(t){if(n.is(":visible")){y=b.length?b.offset().top-d.scrollTop()+b.height():0;var r=n.offset(),a=e.isWindow(d[0]),l=e.isWindow(f[0]),s=(o.length?a?d.scrollTop():d.offset().top:d.scrollTop())+m+y,c=n.height()-(v.height()+(p.height()||0)),h=s>r.top&&s<r.top+c?"visible":"hidden",u={visibility:h};o.length&&(u.top=a?s-o.offset().top:o.scrollTop()),l&&(u.left=n.offset().left-parseInt(n.css("margin-left"),10)-f.scrollLeft()-C),b.length&&(u.top=(u.top||0)+m+y),v.removeClass(i.css.stickyVis+" "+i.css.stickyHide).addClass("visible"===h?i.css.stickyVis:i.css.stickyHide).css(u),(h!==w||"resize"===t.type)&&(F(),w=h)}}),l.stickyHeaders_addResizeEvent&&i.addHeaderResizeEvent(r),n.hasClass("hasFilters")&&l.filter_columnFilters&&(n.bind("filterEnd"+c,function(){var r=e(document.activeElement).closest("td"),s=r.parent().children().index(r);v.hasClass(i.css.stickyVis)&&l.stickyHeaders_filteredToTop&&(t.scrollTo(0,n.position().top),s>=0&&a.$filters&&a.$filters.eq(s).find("a, select, input").filter(":visible").focus())}),i.filter.bindSearch(n,s.find("."+i.css.filter)),l.filter_hideFilters&&i.filter.hideFilters(_,a)),n.trigger("stickyHeadersInit")}},remove:function(r,a,l){var s=a.namespace+"stickyheaders ";a.$table.removeClass("hasStickyHeaders").unbind("pagerComplete filterEnd ".split(" ").join(s).replace(/\s+/g," ")).next("."+i.css.stickyWrap).remove(),l.$sticky&&l.$sticky.length&&l.$sticky.remove(),e(t).add(l.stickyHeaders_xScroll).add(l.stickyHeaders_yScroll).add(l.stickyHeaders_attachTo).unbind("scroll resize ".split(" ").join(s).replace(/\s+/g," ")),i.addHeaderResizeEvent(r,!1)}})}(jQuery,window),function(e,t){"use strict";var i=e.tablesorter=e.tablesorter||{};e.extend(i.css,{resizableContainer:"tablesorter-resizable-container",resizableHandle:"tablesorter-resizable-handle",resizableNoSelect:"tablesorter-disableSelection",resizableStorage:"tablesorter-resizable"}),e(function(){var t="<style>body."+i.css.resizableNoSelect+" { -ms-user-select: none; -moz-user-select: -moz-none;-khtml-user-select: none; -webkit-user-select: none; user-select: none; }."+i.css.resizableContainer+" { position: relative; height: 1px; }."+i.css.resizableHandle+" { position: absolute; display: inline-block; width: 8px; top: 1px;cursor: ew-resize; z-index: 3; user-select: none; -moz-user-select: none; }</style>";e(t).appendTo("body")}),i.resizable={init:function(t,r){if(!t.$table.hasClass("hasResizable")){t.$table.addClass("hasResizable"),i.resizableReset(t.table,!0),r.resizable_={$wrap:t.$table.parent(),mouseXPosition:0,$target:null,$next:null,overflow:"auto"===t.$table.parent().css("overflow"),fullWidth:Math.abs(t.$table.parent().width()-t.$table.width())<20,storedSizes:[]};var a,l,s,n,o=parseInt(t.$table.css("margin-top"),10);for(r.resizable_.storedSizes=n=(i.storage&&r.resizable!==!1?i.storage(t.table,i.css.resizableStorage):[])||[],i.resizable.setWidths(t,r,n),r.$resizable_container=e('<div class="'+i.css.resizableContainer+'">').css({top:o}).insertBefore(t.$table),s=0;s<t.columns;s++)l=t.$headerIndexed[s],a="false"===i.getData(l,i.getColumnData(t.table,t.headers,s),"resizable"),a||e('<div class="'+i.css.resizableHandle+'">').appendTo(r.$resizable_container).attr({"data-column":s,unselectable:"on"}).data("header",l).bind("selectstart",!1);t.$table.one("tablesorter-initialized",function(){i.resizable.setHandlePosition(t,r),i.resizable.bindings(this.config,this.config.widgetOptions)})}},setWidth:function(e,t){e.css({width:t,"min-width":"","max-width":""})},setWidths:function(t,r,a){var l,s=e(t.namespace+"_extra_headers"),n=t.$table.children("colgroup").children("col");if(a=a||r.resizable_.storedSizes||[],a.length){for(l=0;l<t.columns;l++)t.$headerIndexed[l].width(a[l]),s.length&&i.resizable.setWidth(s.eq(l).add(n.eq(l)),a[l]);e(t.namespace+"_extra_table").length&&!i.hasWidget(t.table,"scroller")&&i.resizable.setWidth(e(t.namespace+"_extra_table"),t.$table.outerWidth())}},setHandlePosition:function(t,r){var a,l=i.hasWidget(t.table,"scroller"),s=t.$table.height(),n=r.$resizable_container.children(),o=Math.floor(n.width()/2);l&&(s=0,t.$table.closest("."+i.css.scrollerWrap).children().each(function(){var t=e(this);s+=t.filter('[style*="height"]').length?t.height():t.children("table").height()})),a=t.$table.position().left,n.each(function(){var i=e(this),l=parseInt(i.attr("data-column"),10),n=t.columns-1,c=i.data("header");c&&(c.is(":visible")?(n>l||l===n&&r.resizable_addLastColumn)&&i.css({display:"inline-block",height:s,left:c.position().left-a+c.outerWidth()-o}):i.hide())})},toggleTextSelection:function(t,r){var a=t.namespace+"tsresize";t.widgetOptions.resizable_.disabled=r,e("body").toggleClass(i.css.resizableNoSelect,r),r?e("body").attr("unselectable","on").bind("selectstart"+a,!1):e("body").removeAttr("unselectable").unbind("selectstart"+a)},bindings:function(r,a){var l=r.namespace+"tsresize";a.$resizable_container.children().bind("mousedown",function(t){var l,s,n=a.resizable_,o=e(r.namespace+"_extra_headers"),c=e(t.target).data("header");for(l=parseInt(c.attr("data-column"),10),n.$target=c=c.add(o.filter('[data-column="'+l+'"]')),n.target=l,n.$next=t.shiftKey||a.resizable_targetLast?c.parent().children().not(".resizable-false").filter(":last"):c.nextAll(":not(.resizable-false)").eq(0),l=parseInt(n.$next.attr("data-column"),10),n.$next=n.$next.add(o.filter('[data-column="'+l+'"]')),n.next=l,n.mouseXPosition=t.pageX,n.storedSizes=[],l=0;l<r.columns;l++)s=r.$headerIndexed[l],n.storedSizes[l]=s.is(":visible")?s.width():0;i.resizable.toggleTextSelection(r,!0)}),e(document).bind("mousemove"+l,function(e){var t=a.resizable_;t.disabled&&0!==t.mouseXPosition&&t.$target&&(a.resizable_throttle?(clearTimeout(t.timer),t.timer=setTimeout(function(){i.resizable.mouseMove(r,a,e)},isNaN(a.resizable_throttle)?5:a.resizable_throttle)):i.resizable.mouseMove(r,a,e))}).bind("mouseup"+l,function(){a.resizable_.disabled&&(i.resizable.toggleTextSelection(r,!1),i.resizable.stopResize(r,a),i.resizable.setHandlePosition(r,a))}),e(t).bind("resize"+l+" resizeEnd"+l,function(){i.resizable.setHandlePosition(r,a)}),r.$table.bind("columnUpdate"+l,function(){i.resizable.setHandlePosition(r,a)}).find("thead:first").add(e(r.namespace+"_extra_table").find("thead:first")).bind("contextmenu"+l,function(){var e=0===a.resizable_.storedSizes.length;return i.resizableReset(r.table),i.resizable.setHandlePosition(r,a),a.resizable_.storedSizes=[],e})},mouseMove:function(t,r,a){if(0!==r.resizable_.mouseXPosition&&r.resizable_.$target){var l=r.resizable_,s=l.$next,n=a.pageX-l.mouseXPosition;l.fullWidth?(l.storedSizes[l.target]+=n,l.storedSizes[l.next]-=n,i.resizable.setWidths(t,r)):l.overflow?(t.$table.add(e(t.namespace+"_extra_table")).width(function(e,t){return t+n}),s.length||(l.$wrap[0].scrollLeft=t.$table.width())):(l.storedSizes[l.target]+=n,i.resizable.setWidths(t,r)),l.mouseXPosition=a.pageX}},stopResize:function(r,a){var l,s,n=a.resizable_;if(n.storedSizes=[],i.storage){for(n.storedSizes=[],s=0;s<r.columns;s++)l=r.$headerIndexed[s],n.storedSizes[s]=l.is(":visible")?l.width():0;a.resizable!==!1&&i.storage(r.table,i.css.resizableStorage,n.storedSizes)}n.mouseXPosition=0,n.$target=n.$next=null,e(t).trigger("resize")}},i.addWidget({id:"resizable",priority:40,options:{resizable:!0,resizable_addLastColumn:!1,resizable_widths:[],resizable_throttle:!1,resizable_targetLast:!1},init:function(e,t,r,a){i.resizable.init(r,a)},remove:function(t,r,a){if(a.$resizable_container){var l=r.namespace+"tsresize";r.$table.add(e(r.namespace+"_extra_table")).removeClass("hasResizable").children("thead").unbind("contextmenu"+l),a.$resizable_container.remove(),i.resizable.toggleTextSelection(r,!1),i.resizableReset(t),e(document).unbind("mousemove"+l+" mouseup"+l)}}}),i.resizableReset=function(r,a){e(r).each(function(){var l,s,n=this.config,o=n&&n.widgetOptions;if(r&&n&&n.$headerIndexed.length){for(l=0;l<n.columns;l++)s=n.$headerIndexed[l],o.resizable_widths&&o.resizable_widths[l]?s.css("width",o.resizable_widths[l]):s.hasClass("resizable-false")||s.css("width","");e(t).trigger("resize"),i.storage&&!a&&i.storage(this,i.css.resizableStorage,{})}})}}(jQuery,window),function(e){"use strict";var t=e.tablesorter=e.tablesorter||{};t.addWidget({id:"saveSort",priority:20,options:{saveSort:!0},init:function(e,t,i,r){t.format(e,i,r,!0)},format:function(i,r,a,l){var s,n,o=r.$table,c=a.saveSort!==!1,d={sortList:r.sortList};r.debug&&(n=new Date),o.hasClass("hasSaveSort")?c&&i.hasInitialized&&t.storage&&(t.storage(i,"tablesorter-savesort",d),r.debug&&t.benchmark("saveSort widget: Saving last sort: "+r.sortList,n)):(o.addClass("hasSaveSort"),d="",t.storage&&(s=t.storage(i,"tablesorter-savesort"),d=s&&s.hasOwnProperty("sortList")&&e.isArray(s.sortList)?s.sortList:"",r.debug&&t.benchmark('saveSort: Last sort loaded: "'+d+'"',n),o.bind("saveSortReset",function(e){e.stopPropagation(),t.storage(i,"tablesorter-savesort","")})),l&&d&&d.length>0?r.sortList=d:i.hasInitialized&&d&&d.length>0&&o.trigger("sorton",[d]))},remove:function(e,i){i.$table.removeClass("hasSaveSort"),t.storage&&t.storage(e,"tablesorter-savesort","")}})}(jQuery),e.tablesorter});

/****************************************************************************************************************************************************************

Tinysort (min)

****************************************************************************************************************************************************************/

(function(b){b.tinysort={id:"TinySort",version:"1.0.4",defaults:{order:"asc",attr:"",place:"start",returns:false}};b.fn.extend({tinysort:function(h,j){if(h&&typeof(h)!="string"){j=h;h=null}var e=b.extend({},b.tinysort.defaults,j);var p={};this.each(function(t){var v=(!h||h=="")?b(this):b(this).find(h);var u=e.order=="rand"?""+Math.random():(e.attr==""?v.text():v.attr(e.attr));var s=b(this).parent();if(!p[s]){p[s]={s:[],n:[]}}if(v.length>0){p[s].s.push({s:u,e:b(this),n:t})}else{p[s].n.push({e:b(this),n:t})}});for(var g in p){var d=p[g];d.s.sort(function k(t,s){var i=t.s.toLowerCase?t.s.toLowerCase():t.s;var u=s.s.toLowerCase?s.s.toLowerCase():s.s;if(c(t.s)&&c(s.s)){i=parseFloat(t.s);u=parseFloat(s.s)}return(e.order=="asc"?1:-1)*(i<u?-1:(i>u?1:0))})}var m=[];for(var g in p){var d=p[g];var n=[];var f=b(this).length;switch(e.place){case"first":b.each(d.s,function(s,t){f=Math.min(f,t.n)});break;case"org":b.each(d.s,function(s,t){n.push(t.n)});break;case"end":f=d.n.length;break;default:f=0}var q=[0,0];for(var l=0;l<b(this).length;l++){var o=l>=f&&l<f+d.s.length;if(a(n,l)){o=true}var r=(o?d.s:d.n)[q[o?0:1]].e;r.parent().append(r);if(o||!e.returns){m.push(r.get(0))}q[o?0:1]++}}return this.pushStack(m)}});function c(e){var d=/^\s*?[\+-]?(\d*\.?\d*?)\s*?$/.exec(e);return d&&d.length>0?d[1]:false}function a(e,f){var d=false;b.each(e,function(h,g){if(!d){d=g==f}});return d}b.fn.TinySort=b.fn.Tinysort=b.fn.tsort=b.fn.tinysort})(jQuery);



/****************************************************************************************************************************************************************

Hoverintent (min)

****************************************************************************************************************************************************************/

/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);



/****************************************************************************************************************************************************************

Chosen

****************************************************************************************************************************************************************/

// Chosen, a Select Box Enhancer for jQuery and Protoype
// by Patrick Filler for Harvest, http://getharvest.com
// 
// Version 0.9
// Full source at https://github.com/harvesthq/chosen
// Copyright (c) 2011 Harvest http://getharvest.com

// MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
// This file is generated by `cake build`, do not edit it by hand.
(function(){var a,b,c,d,e=function(a,b){return function(){return a.apply(b,arguments)}};d=this,a=jQuery,a.fn.extend({chosen:function(c,d){return a(this).each(function(e){if(!a(this).hasClass("chzn-done"))return new b(this,c,d)})}}),b=function(){function b(b){this.set_default_values(),this.form_field=b,this.form_field_jq=a(this.form_field),this.is_multiple=this.form_field.multiple,this.is_rtl=this.form_field_jq.hasClass("chzn-rtl"),this.default_text_default=this.form_field.multiple?"":"",this.set_up_html(),this.register_observers(),this.form_field_jq.addClass("chzn-done")}b.prototype.set_default_values=function(){this.click_test_action=e(function(a){return this.test_active_click(a)},this),this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.result_single_selected=null;return this.choices=0},b.prototype.set_up_html=function(){var b,d,e,f;this.container_id=this.form_field.id.length?this.form_field.id.replace(/(:|\.)/g,"_"):this.generate_field_id(),this.container_id+="_chzn",this.f_width=this.form_field_jq.width(),this.default_text=this.form_field_jq.data("placeholder")?this.form_field_jq.data("placeholder"):this.default_text_default,b=a("<div />",{id:this.container_id,"class":"chzn-container "+(this.is_rtl?" chzn-rtl":void 0),style:"width: "+this.f_width+"px;"}),this.is_multiple?b.html('<ul class="chzn-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop" style="left:-9000px;"><ul class="chzn-results"></ul></div>'):b.html('<a href="javascript:void(0)" class="chzn-single"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chzn-drop" style="left:-9000px;"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>'),this.form_field_jq.hide().after(b),this.container=a("#"+this.container_id),this.container.addClass("chzn-container-"+(this.is_multiple?"multi":"single")),this.dropdown=this.container.find("div.chzn-drop").first(),d=this.container.height(),e=this.f_width-c(this.dropdown),this.dropdown.css({width:e+"px",top:d+"px"}),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chzn-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chzn-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chzn-search").first(),this.selected_item=this.container.find(".chzn-single").first(),f=e-c(this.search_container)-c(this.search_field),this.search_field.css({width:f+"px"})),this.results_build();return this.set_tab_index()},b.prototype.register_observers=function(){this.container.click(e(function(a){return this.container_click(a)},this)),this.container.mouseenter(e(function(a){return this.mouse_enter(a)},this)),this.container.mouseleave(e(function(a){return this.mouse_leave(a)},this)),this.search_results.click(e(function(a){return this.search_results_click(a)},this)),this.search_results.mouseover(e(function(a){return this.search_results_mouseover(a)},this)),this.search_results.mouseout(e(function(a){return this.search_results_mouseout(a)},this)),this.form_field_jq.bind("liszt:updated",e(function(a){return this.results_update_field(a)},this)),this.search_field.blur(e(function(a){return this.input_blur(a)},this)),this.search_field.keyup(e(function(a){return this.keyup_checker(a)},this)),this.search_field.keydown(e(function(a){return this.keydown_checker(a)},this));if(this.is_multiple){this.search_choices.click(e(function(a){return this.choices_click(a)},this));return this.search_field.focus(e(function(a){return this.input_focus(a)},this))}return this.selected_item.focus(e(function(a){return this.activate_field(a)},this))},b.prototype.container_click=function(b){b&&b.type==="click"&&b.stopPropagation();if(!this.pending_destroy_click){this.active_field?!this.is_multiple&&b&&(a(b.target)===this.selected_item||a(b.target).parents("a.chzn-single").length)&&(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(document).click(this.click_test_action),this.results_show());return this.activate_field()}return this.pending_destroy_click=!1},b.prototype.mouse_enter=function(){return this.mouse_on_container=!0},b.prototype.mouse_leave=function(){return this.mouse_on_container=!1},b.prototype.input_focus=function(a){if(!this.active_field)return setTimeout(e(function(){return this.container_click()},this),50)},b.prototype.input_blur=function(a){if(!this.mouse_on_container){this.active_field=!1;return setTimeout(e(function(){return this.blur_test()},this),100)}},b.prototype.blur_test=function(a){if(!this.active_field&&this.container.hasClass("chzn-container-active"))return this.close_field()},b.prototype.close_field=function(){a(document).unbind("click",this.click_test_action),this.is_multiple||(this.selected_item.attr("tabindex",this.search_field.attr("tabindex")),this.search_field.attr("tabindex",-1)),this.active_field=!1,this.results_hide(),this.container.removeClass("chzn-container-active"),this.winnow_results_clear(),this.clear_backstroke(),this.show_search_field_default();return this.search_field_scale()},b.prototype.activate_field=function(){!this.is_multiple&&!this.active_field&&(this.search_field.attr("tabindex",this.selected_item.attr("tabindex")),this.selected_item.attr("tabindex",-1)),this.container.addClass("chzn-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val());return this.search_field.focus()},b.prototype.test_active_click=function(b){return a(b.target).parents("#"+this.container_id).length?this.active_field=!0:this.close_field()},b.prototype.results_build=function(){var a,b,c,e,f,g;c=new Date,this.parsing=!0,this.results_data=d.SelectParser.select_to_array(this.form_field),this.is_multiple&&this.choices>0?(this.search_choices.find("li.search-choice").remove(),this.choices=0):this.is_multiple||this.selected_item.find("span").text(this.default_text),a="",g=this.results_data;for(e=0,f=g.length;e<f;e++)b=g[e],b.group?a+=this.result_add_group(b):b.empty||(a+=this.result_add_option(b),b.selected&&this.is_multiple?this.choice_build(b):b.selected&&!this.is_multiple&&this.selected_item.find("span").text(b.text));this.show_search_field_default(),this.search_field_scale(),this.search_results.html(a);return this.parsing=!1},b.prototype.result_add_group=function(b){if(!b.disabled){b.dom_id=this.container_id+"_g_"+b.array_index;return'<li id="'+b.dom_id+'" class="group-result">'+a("<div />").text(b.label).html()+"</li>"}return""},b.prototype.result_add_option=function(a){var b;if(!a.disabled){a.dom_id=this.container_id+"_o_"+a.array_index,b=a.selected&&this.is_multiple?[]:["active-result"],a.selected&&b.push("result-selected"),a.group_array_index!=null&&b.push("group-option");return'<li id="'+a.dom_id+'" title="'+a.title+'" class="'+b.join(" ")+'">'+a.html+"</li>"}return""},b.prototype.results_update_field=function(){this.result_clear_highlight(),this.result_single_selected=null;return this.results_build()},b.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight();if(b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(c<f)return this.search_results.scrollTop(c)}},b.prototype.result_clear_highlight=function(){this.result_highlight&&this.result_highlight.removeClass("highlighted");return this.result_highlight=null},b.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},b.prototype.results_show=function(){var a;this.is_multiple||(this.selected_item.addClass("chzn-single-with-drop"),this.result_single_selected&&this.result_do_highlight(this.result_single_selected)),a=this.is_multiple?this.container.height():this.container.height()-1,this.dropdown.css({top:a+"px",left:0}),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val());return this.winnow_results()},b.prototype.results_hide=function(){this.is_multiple||this.selected_item.removeClass("chzn-single-with-drop"),this.result_clear_highlight(),this.dropdown.css({left:"-9000px"});return this.results_showing=!1},b.prototype.set_tab_index=function(a){var b;if(this.form_field_jq.attr("tabindex")){b=this.form_field_jq.attr("tabindex"),this.form_field_jq.attr("tabindex",-1);if(this.is_multiple)return this.search_field.attr("tabindex",b);this.selected_item.attr("tabindex",b);return this.search_field.attr("tabindex",-1)}},b.prototype.show_search_field_default=function(){if(this.is_multiple&&this.choices<1&&!this.active_field){this.search_field.val(this.default_text);return this.search_field.addClass("default")}this.search_field.val("");return this.search_field.removeClass("default")},b.prototype.search_results_click=function(b){var c;c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first();if(c.length){this.result_highlight=c;return this.result_select()}},b.prototype.search_results_mouseover=function(b){var c;c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first();if(c)return this.result_do_highlight(c)},b.prototype.search_results_mouseout=function(b){if(a(b.target).hasClass("active-result"))return this.result_clear_highlight()},b.prototype.choices_click=function(b){b.preventDefault();if(this.active_field&&!a(b.target).hasClass("search-choice")&&!this.results_showing)return this.results_show()},b.prototype.choice_build=function(b){var c,d;c=this.container_id+"_c_"+b.array_index,this.choices+=1,this.search_container.before('<li class="search-choice" id="'+c+'"><span>'+b.html+'</span><a href="javascript:void(0)" class="search-choice-close" rel="'+b.array_index+'"></a></li>'),d=a("#"+c).find("a").first();return d.click(e(function(a){return this.choice_destroy_link_click(a)},this))},b.prototype.choice_destroy_link_click=function(b){b.preventDefault(),this.pending_destroy_click=!0;return this.choice_destroy(a(b.target))},b.prototype.choice_destroy=function(a){this.choices-=1,this.show_search_field_default(),this.is_multiple&&this.choices>0&&this.search_field.val().length<1&&this.results_hide(),this.result_deselect(a.attr("rel"));return a.parents("li").first().remove()},b.prototype.result_select=function(){var a,b,c,d;if(this.result_highlight){a=this.result_highlight,b=a.attr("id"),this.result_clear_highlight(),a.addClass("result-selected"),this.is_multiple?this.result_deactivate(a):this.result_single_selected=a,d=b.substr(b.lastIndexOf("_")+1),c=this.results_data[d],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.is_multiple?this.choice_build(c):this.selected_item.find("span").first().text(c.text),this.results_hide(),this.search_field.val(""),this.form_field_jq.trigger("change");return this.search_field_scale()}},b.prototype.result_activate=function(a){return a.addClass("active-result").show()},b.prototype.result_deactivate=function(a){return a.removeClass("active-result").hide()},b.prototype.result_deselect=function(b){var c,d;d=this.results_data[b],d.selected=!1,this.form_field.options[d.options_index].selected=!1,c=a("#"+this.container_id+"_o_"+b),c.removeClass("result-selected").addClass("active-result").show(),this.result_clear_highlight(),this.winnow_results(),this.form_field_jq.trigger("change");return this.search_field_scale()},b.prototype.results_search=function(a){return this.results_showing?this.winnow_results():this.results_show()},b.prototype.winnow_results=function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;j=new Date,this.no_results_clear(),h=0,i=this.search_field.val()===this.default_text?"":a("<div/>").text(a.trim(this.search_field.val())).html(),f=new RegExp("^"+i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i"),m=new RegExp(i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i"),r=this.results_data;for(n=0,p=r.length;n<p;n++){c=r[n];if(!c.disabled&&!c.empty)if(c.group)a("#"+c.dom_id).hide();else if(!this.is_multiple||!c.selected){b=!1,g=c.dom_id;if(f.test(c.html))b=!0,h+=1;else if(c.html.indexOf(" ")>=0||c.html.indexOf("[")===0){e=c.html.replace(/\[|\]/g,"").split(" ");if(e.length)for(o=0,q=e.length;o<q;o++)d=e[o],f.test(d)&&(b=!0,h+=1)}b?(i.length?(k=c.html.search(m),l=c.html.substr(0,k+i.length)+"</em>"+c.html.substr(k+i.length),l=l.substr(0,k)+"<em>"+l.substr(k)):l=c.html,a("#"+g).html!==l&&a("#"+g).html(l),this.result_activate(a("#"+g)),c.group_array_index!=null&&a("#"+this.results_data[c.group_array_index].dom_id).show()):(this.result_highlight&&g===this.result_highlight.attr("id")&&this.result_clear_highlight(),this.result_deactivate(a("#"+g)))}}return h<1&&i.length?this.no_results(i):this.winnow_results_set_highlight()},b.prototype.winnow_results_clear=function(){var b,c,d,e,f;this.search_field.val(""),c=this.search_results.find("li"),f=[];for(d=0,e=c.length;d<e;d++)b=c[d],b=a(b),f.push(b.hasClass("group-result")?b.show():!this.is_multiple||!b.hasClass("result-selected")?this.result_activate(b):void 0);return f},b.prototype.winnow_results_set_highlight=function(){var a;if(!this.result_highlight){a=this.search_results.find(".active-result").first();if(a)return this.result_do_highlight(a)}},b.prototype.no_results=function(b){var c;c=a('<li class="no-results">No results match "<span></span>"</li>'),c.find("span").first().html(b);return this.search_results.append(c)},b.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},b.prototype.keydown_arrow=function(){var b,c;this.result_highlight?this.results_showing&&(c=this.result_highlight.nextAll("li.active-result").first(),c&&this.result_do_highlight(c)):(b=this.search_results.find("li.active-result").first(),b&&this.result_do_highlight(a(b)));if(!this.results_showing)return this.results_show()},b.prototype.keyup_arrow=function(){var a;if(!this.results_showing&&!this.is_multiple)return this.results_show();if(this.result_highlight){a=this.result_highlight.prevAll("li.active-result");if(a.length)return this.result_do_highlight(a.first());this.choices>0&&this.results_hide();return this.result_clear_highlight()}},b.prototype.keydown_backstroke=function(){if(this.pending_backstroke){this.choice_destroy(this.pending_backstroke.find("a").first());return this.clear_backstroke()}this.pending_backstroke=this.search_container.siblings("li.search-choice").last();return this.pending_backstroke.addClass("search-choice-focus")},b.prototype.clear_backstroke=function(){this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus");return this.pending_backstroke=null},b.prototype.keyup_checker=function(a){var b,c;b=(c=a.which)!=null?c:a.keyCode,this.search_field_scale();switch(b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices>0)return this.keydown_backstroke();if(!this.pending_backstroke){this.result_clear_highlight();return this.results_search()}break;case 13:a.preventDefault();if(this.results_showing)return this.result_select();break;case 27:if(this.results_showing)return this.results_hide();break;case 9:case 38:case 40:case 16:break;default:return this.results_search()}},b.prototype.keydown_checker=function(a){var b,c;b=(c=a.which)!=null?c:a.keyCode,this.search_field_scale(),b!==8&&this.pending_backstroke&&this.clear_backstroke();switch(b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.mouse_on_container=!1;break;case 13:a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:this.keydown_arrow()}},b.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){d=0,h=0,f="position:absolute; left: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"];for(i=0,j=g.length;i<j;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";c=a("<div />",{style:f}),c.text(this.search_field.val()),a("body").append(c),h=c.width()+25,c.remove(),h>this.f_width-10&&(h=this.f_width-10),this.search_field.css({width:h+"px"}),b=this.container.height();return this.dropdown.css({top:b+"px"})}},b.prototype.generate_field_id=function(){var a;a=this.generate_random_id(),this.form_field.id=a;return a},b.prototype.generate_random_id=function(){var b;b="sel"+this.generate_random_char()+this.generate_random_char()+this.generate_random_char();while(a("#"+b).length>0)b+=this.generate_random_char();return b},b.prototype.generate_random_char=function(){var a,b,c;a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ",c=Math.floor(Math.random()*a.length);return b=a.substring(c,c+1)};return b}(),c=function(a){var b;return b=a.outerWidth()-a.width()},d.get_side_border_padding=c}).call(this),function(){var a;a=function(){function a(){this.options_index=0,this.parsed=[]}a.prototype.add_node=function(a){return a.nodeName==="OPTGROUP"?this.add_group(a):this.add_option(a)},a.prototype.add_group=function(a){var b,c,d,e,f,g;b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:a.label,children:0,disabled:a.disabled}),f=a.childNodes,g=[];for(d=0,e=f.length;d<e;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},a.prototype.add_option=function(a,b,c){if(a.nodeName==="OPTION"){a.text!==""?(b!=null&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,title:a.title})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0});return this.options_index+=1}};return a}(),a.select_to_array=function(b){var c,d,e,f,g;d=new a,g=b.childNodes;for(e=0,f=g.length;e<f;e++)c=g[e],d.add_node(c);return d.parsed},this.SelectParser=a}.call(this);



/****************************************************************************************************************************************************************

ChosenLive (for Messages Livesearch Etc.)

****************************************************************************************************************************************************************/

(function($) {

    var ChosenLive = function(inputField, options) {

        this.inputField = inputField;
        this.$inputField = $(inputField);
        this.$form = this.$inputField.closest('form');
        this.options = $.extend({}, this.defaults, options);

        this.fieldWidth = this.$inputField.innerWidth();
        this.fieldHeight = this.$inputField.innerHeight();

        this.prepareHtml();
        this.registerObservers();
        this.prepopulate();

    };

    ChosenLive.prototype = {

        defaults: {
            placeholderText: "Type to search...",
            forceSingleChoice: true
        },

        prepareHtml: function() {

            $containerDiv = $('<div />', {
                'class': 'chlive-container'
            });
            $containerDiv.html('<ul class="chlive-choices" style="min-height: ' + this.fieldHeight + 'px' + '"' + '>' + '<li class="search-field"><input type="text" title="' + this.options.placeholderText + '" class="default" autocomplete="off" style="width: 90px !important; height: ' + this.fieldHeight + 'px' + '"' + ' /></li></ul>');
            this.$inputField.hide().after($containerDiv);
            this.$searchField = $containerDiv.find('input').first();
            this.$searchContainer = $containerDiv.find('ul.chlive-choices');
            this._scaleSearchField();
            this.choices = 0;
            this.selectedIds = [];
            this.pendingBackstroke = null;

        },

        registerObservers: function() {

            var self = this;

            // Transfer focus to search field when the fake input field is clicked
            this.$searchContainer.bind('click', function(e) {
                if (self.$searchField.hasClass('default')) {
                    self.$searchField.val('').removeClass('default');
                    self._scaleSearchField();
                }
                self.$searchField.focus();
            });

            // Show placeholder text on blur, if search field is empty
            this.$searchField.bind('blur', function(e) {
                if (self.$searchContainer.children('li').length < 2 && self.$searchField.val() === '') {
                    self.$searchField.val(self.options.placeholderText).addClass('default');
                    self._scaleSearchField();
                }
            });

            // Make a first check before deleting a choice when backspace is pressed
            this.$searchField.bind('keydown', function(e) {
                self._scaleSearchField();
                if (e.keyCode === 8) {
                    self.backstrokeLength = self.$searchField.val().length;
                } else if (e.keyCode !== 8 && self.pendingBackstroke) {
                    self.pendingBackstroke.removeClass('search-choice-focus');
                    self.pendingBackstroke = null;
                }
            });

            // Remove choice if we are ready on backspace press
            this.$searchField.bind('keyup', function(e) {
                self._scaleSearchField();
                if (e.keyCode === 8 && self.backstrokeLength < 1 && self.choices > 0) {
                    if (self.pendingBackstroke) {
                        self.pendingBackstroke.removeClass('search-choice-focus');
                        self._removeChoice(self.pendingBackstroke);
                        self.pendingBackstroke = null;
                    } else {
                        self.pendingBackstroke = self.$searchContainer.find('li.search-choice').last();
                        self.pendingBackstroke.addClass('search-choice-focus');
                    }

                }
            });

            // Add pill to fake input
            this.$form.delegate('li.active-result a', 'click', function(e) {

                var usersHash = [], userData;
                e.preventDefault();

                $(this).closest('li.active-result').find('[class^=id-]').each(function() {
                    usersHash.push({
                        id: this.className.substr(3),
                        name: this.innerHTML
                    });
                });

                while (usersHash.length > 0) {
                    userData = usersHash.shift();
                    self._addChoice(userData.name, userData.id);
                }

                $(this).closest('li.active-result').addClass('selected-result');
                self.$searchField.val('');
                self.$inputField.val(self.selectedIds.join(':'));
            });

            // Remove pill when the user clicks on the 'x'
            this.$form.delegate('a.search-choice-close', 'click', function(e) {
                e.preventDefault();
                self._removeChoice($(this).closest('li'));
                self.$inputField.val(self.selectedIds.join(':'));
            });

            // Populate real hidden input field on form submit
            this.$form.bind('submit', function() {
                self.$inputField.val(self.selectedIds.join(':'));
            });
        },

        /**
         * If the original input field has a 'data-prepopulate' attribute containing
         * a JSON in the form: {["label": "Mario Rossi", "id": "0001"], [...]} we will
         * prepopulate chosenLive with pills from that data.
         */
        prepopulate: function() {

            var prepopulate = this.$inputField.data('prepopulate');

            if (prepopulate && prepopulate.length) {
                for (var i = 0; i < prepopulate.length; i++) {
                    this._addChoice(prepopulate[i]['label'], prepopulate[i]['id']);
                };
                this.$inputField.val(this.selectedIds.join(':'));
            }

        },

        _addChoice: function(label, id) {

            var $pill;

            // do we allow only one single result?
            if (this.options.forceSingleChoice && this.choices > 0) {
                this._removeChoice(this.$searchContainer.find('li.search-choice').last());
            }

            // do add the pill
            if ( ! $('#chlive_selected_id_' + id).length) {
                this.choices += 1;
                $pill = $('<li />', {
                    'class': 'search-choice',
                    id: 'chlive_selected_id_' + id
                });
                $pill
                    .html('<span>' + label + '</span><a href="javascript:void(0)" class="search-choice-close"></a>')
                    .insertBefore(this.$searchField.parent());
                this.selectedIds.push(id)
            }

        },

        _removeChoice: function($choice) {

            var choiceId;

            // remove user id from our list
            choiceId = $choice.attr('id');
            choiceId = choiceId.substr(choiceId.lastIndexOf('_')+1);
            for (var i = 0; i < this.selectedIds.length; i++) {
                if (this.selectedIds[i] === choiceId) {
                    this.selectedIds.splice(i, 1);
                }
            }

            // remove 'selected-result' class from the livesearch element
            // assumes .live_search is a sibling of it
            var $searchResult = $choice.closest('.chlive-container').siblings('.live_search').find('.selected-result:has([class=id-' + choiceId + '])');
            $searchResult.removeClass('selected-result');

            // remove the actual pill from the fake input field
            $choice.remove();

            this.choices -= 1;
        },

        _scaleSearchField: function() {

            var div, style, styleBlock, styles, w, _i, _len;

            styleBlock = "position: absolute; left: -1000px; top: -1000px; display: none;";
            styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
            for (_i = 0, _len = styles.length; _i < _len; _i++) {
                style = styles[_i];
                styleBlock += " " + style + ": " + this.$searchField.css(style) + ";";
            }

            styleBlock += " border: none; margin: 0; padding: 0;"

            div = $('<div />', {
                'style': styleBlock
            });
            div.text(this.$searchField.val());
            $('body').append(div);
            w = div.width() + 25;
            div.remove();
            if (w > this.fieldWidth - 10) {
                w = this.fieldWidth - 10;
            }
            this.$searchField.css({
                'width': w + 'px'
            });
        }

    };

    $.fn.chosenLive = function(options) {
        this.each(function() {
            new ChosenLive(this, options);
        })
        return this;
    }

})(jQuery);

//Live search for merge accounts

(function($) {

    var ChosenLive2 = function(inputField, options) {
        this.fieldId = inputField.id;
        this.inputField = inputField;
        this.$inputField = $(inputField);
        this.$form = this.$inputField.closest('form');
        this.options = $.extend({}, this.defaults, options);

        this.fieldWidth = this.$inputField.innerWidth();
        this.fieldHeight = this.$inputField.innerHeight();

        this.prepareHtml();
        this.registerObservers();
        this.prepopulate();

    };

    ChosenLive2.prototype = {

        defaults: {
            placeholderText: "Type to search...",
            forceSingleChoice: true
        },

        prepareHtml: function() {
            $containerDiv = $('<div />', {
                'class': ('chlive-container ' + this.fieldId)
            });
            $containerDiv.html('<ul class="chlive-choices" style="min-height: ' + this.fieldHeight + 'px' + '"' + '>' +
                '<li class="search-field"><input type="text" class="' + this.fieldId + '" title="' +
                this.options.placeholderText + '" class="default" autocomplete="off" style="width: 90px !important; height: ' +
                this.fieldHeight + 'px' + '"' + ' /></li></ul>');
            this.$inputField.hide().after($containerDiv);
            this.$searchField = $containerDiv.find('input').first();
            this.$searchContainer = $containerDiv.find('ul.chlive-choices');
            this._scaleSearchField();
            this.choices = 0;
            this.selectedIds = [];
            this.pendingBackstroke = null;

        },

        registerObservers: function() {

            var self = this;

            // Transfer focus to search field when the fake input field is clicked
            this.$searchContainer.bind('click', function(e) {
                if (self.$searchField.hasClass('default')) {
                    self.$searchField.val('').removeClass('default');
                    self._scaleSearchField();
                }
                self.$searchField.focus();
            });

            // Show placeholder text on blur, if search field is empty
            this.$searchField.bind('blur', function(e) {
                if (self.$searchContainer.children('li').length < 2 && self.$searchField.val() === '') {
                    self.$searchField.val(self.options.placeholderText).addClass('default');
                    self._scaleSearchField();
                }
            });

            // Make a first check before deleting a choice when backspace is pressed
            this.$searchField.bind('keydown', function(e) {
                self._scaleSearchField();
                if (e.keyCode === 8) {
                    self.backstrokeLength = self.$searchField.val().length;
                } else if (e.keyCode !== 8 && self.pendingBackstroke) {
                    self.pendingBackstroke.removeClass('search-choice-focus');
                    self.pendingBackstroke = null;
                }
            });

            // Remove choice if we are ready on backspace press
            this.$searchField.bind('keyup', function(e) {
                self._scaleSearchField();
                if (e.keyCode === 8 && self.backstrokeLength < 1 && self.choices > 0) {
                    if (self.pendingBackstroke) {
                        self.pendingBackstroke.removeClass('search-choice-focus');
                        self._removeChoice(self.pendingBackstroke);
                        self.pendingBackstroke = null;
                    } else {
                        self.pendingBackstroke = self.$searchContainer.find('li.search-choice').last();
                        self.pendingBackstroke.addClass('search-choice-focus');
                    }

                }
            });

            // Add pill to fake input
            this.$form.delegate('li.active-result a', 'click', function(e) {

                var usersHash = [], userData;
                e.preventDefault();

                $(this).closest('li.active-result').find('[class^=id-]').each(function() {
                    usersHash.push({
                        id: this.className.substr(3),
                        name: this.innerHTML
                    });
                });

                while (usersHash.length > 0) {
                    userData = usersHash.shift();
                    self._addChoice(userData.name, userData.id);
                }

                $(this).closest('li.active-result').addClass('selected-result');
                var currentSearch = $("#current_search_box").val();
                if(currentSearch === self.fieldId){
                    self.$searchField.val('');
                    self.$inputField.val(self.selectedIds.join(':'));
                }
            });

            // Remove pill when the user clicks on the 'x'
            this.$form.delegate('a.search-choice-close', 'click', function(e) {
                e.preventDefault();
                var currentSearch = $("#current_search_box").val();
                if(currentSearch === self.fieldId) {
                    self._removeChoice($(this).closest('li'));
                    self.$inputField.val(self.selectedIds.join(':'));
                }
            });

            // Populate real hidden input field on form submit
            this.$form.bind('submit', function() {
                var currentSearch = $("#current_search_box").val();
                if(currentSearch === self.fieldId){
                    self.$inputField.val(self.selectedIds.join(':'));
                }
            });
        },

        /**
         * If the original input field has a 'data-prepopulate' attribute containing
         * a JSON in the form: {["label": "Mario Rossi", "id": "0001"], [...]} we will
         * prepopulate chosenLive with pills from that data.
         */
        prepopulate: function() {

            var prepopulate = this.$inputField.data('prepopulate');

            if (prepopulate && prepopulate.length) {
                for (var i = 0; i < prepopulate.length; i++) {
                    this._addChoice(prepopulate[i]['label'], prepopulate[i]['id']);
                };
                this.$inputField.val(this.selectedIds.join(':'));
            }

        },

        _addChoice: function(label, id) {

            var $pill;

            // do we allow only one single result?
            if (this.options.forceSingleChoice && this.choices > 0) {
                this._removeChoice(this.$searchContainer.find('li.search-choice').last());
            }

            // do add the pill
            var currentSearch = $("#current_search_box").val();
            if ( ! $('#chlive_selected_id_' + id).length) {
                $pill = $('<li />', {
                    'class': 'search-choice',
                    id: 'chlive_selected_id_' + id
                });

                insertTo = "";
                if(currentSearch == this.fieldId || currentSearch === undefined){
                    this.choices += 1;
                    insertTo = this.$searchField.parent();
                }
                $pill
                    .html('<span>' + label + '</span><a href="javascript:void(0)" class="search-choice-close"></a>')
                    .insertBefore(insertTo);
                this.selectedIds.push(id);
            }

        },

        _removeChoice: function($choice) {
            var choiceId;
            var currentSearch = $("#current_search_box").val();
            if(currentSearch != this.fieldId){return true;}

            // remove user id from our list
            choiceId = $choice.attr('id');
            choiceId = choiceId.substr(choiceId.lastIndexOf('_')+1);
            for (var i = 0; i < this.selectedIds.length; i++) {
                if (this.selectedIds[i] === choiceId) {
                    this.selectedIds.splice(i, 1);

                }
            }

            // remove 'selected-result' class from the livesearch element
            // assumes .live_search is a sibling of it
            var $searchResult = $choice.closest('.chlive-container').siblings('.live_search').find('.selected-result:has([class=id-' + choiceId + '])');
            $searchResult.removeClass('selected-result');

            // remove the actual pill from the fake input field
            $choice.remove();

            this.choices -= 1;
            if (this.options.forceSingleChoice){
                this.selectedIds = []
            }
        },

        _scaleSearchField: function() {
            $("#current_search_box").val(this.fieldId);
            var div, style, styleBlock, styles, w, _i, _len;

            styleBlock = "position: absolute; left: -1000px; top: -1000px; display: none;";
            styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
            for (_i = 0, _len = styles.length; _i < _len; _i++) {
                style = styles[_i];
                styleBlock += " " + style + ": " + this.$searchField.css(style) + ";";
            }

            styleBlock += " border: none; margin: 0; padding: 0;"

            div = $('<div />', {
                'style': styleBlock
            });
            div.text(this.$searchField.val());
            $('body').append(div);
            w = div.width() + 25;
            div.remove();
            if (w > this.fieldWidth - 10) {
                w = this.fieldWidth - 10;
            }
            this.$searchField.css({
                'width': w + 'px'
            });
        }

    };

    $.fn.chosenLive2 = function(options) {
        this.each(function() {
            new ChosenLive2(this, options);
        })
        return this;
    }

})(jQuery);



/****************************************************************************************************************************************************************

Timepicker (min)

****************************************************************************************************************************************************************/

/*
* jQuery timepicker addon
* By: Trent Richardson [http://trentrichardson.com]
* Version 1.0.0
* Last Modified: 02/05/2012
*
* Copyright 2012 Trent Richardson
* Dual licensed under the MIT and GPL licenses.
* http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
* http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
*
* HERES THE CSS:
* .ui-timepicker-div .ui-widget-header { margin-bottom: 8px; }
* .ui-timepicker-div dl { text-align: left; }
* .ui-timepicker-div dl dt { height: 25px; margin-bottom: -25px; }
* .ui-timepicker-div dl dd { margin: 0 10px 10px 65px; }
* .ui-timepicker-div td { font-size: 90%; }
* .ui-tpicker-grid-label { background: none; border: none; margin: 0; padding: 0; }
*/

(function($){$.ui.timepicker=$.ui.timepicker||{};if($.ui.timepicker.version){return;}
$.extend($.ui,{timepicker:{version:"1.0.0"}});function Timepicker(){this.regional=[];this.regional['']={currentText:'Now',closeText:'Done',ampm:false,amNames:['AM','A'],pmNames:['PM','P'],timeFormat:'hh:mm tt',timeSuffix:'',timeOnlyTitle:'Choose Time',timeText:'Time',hourText:'Hour',minuteText:'Minute',secondText:'Second',millisecText:'Millisecond',timezoneText:'Time Zone'};this._defaults={showButtonPanel:true,timeOnly:false,showHour:true,showMinute:true,showSecond:false,showMillisec:false,showTimezone:false,showTime:true,stepHour:1,stepMinute:1,stepSecond:1,stepMillisec:1,hour:0,minute:0,second:0,millisec:0,timezone:'+0000',hourMin:0,minuteMin:0,secondMin:0,millisecMin:0,hourMax:23,minuteMax:59,secondMax:59,millisecMax:999,minDateTime:null,maxDateTime:null,onSelect:null,hourGrid:0,minuteGrid:0,secondGrid:0,millisecGrid:0,alwaysSetTime:true,separator:' ',altFieldTimeOnly:true,showTimepicker:true,timezoneIso8609:false,timezoneList:null,addSliderAccess:false,sliderAccessArgs:null};$.extend(this._defaults,this.regional['']);};$.extend(Timepicker.prototype,{$input:null,$altInput:null,$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,millisec_slider:null,timezone_select:null,hour:0,minute:0,second:0,millisec:0,timezone:'+0000',hourMinOriginal:null,minuteMinOriginal:null,secondMinOriginal:null,millisecMinOriginal:null,hourMaxOriginal:null,minuteMaxOriginal:null,secondMaxOriginal:null,millisecMaxOriginal:null,ampm:'',formattedDate:'',formattedTime:'',formattedDateTime:'',timezoneList:null,setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this;},_newInst:function($input,o){var tp_inst=new Timepicker(),inlineSettings={};for(var attrName in this._defaults){var attrValue=$input.attr('time:'+attrName);if(attrValue){try{inlineSettings[attrName]=eval(attrValue);}catch(err){inlineSettings[attrName]=attrValue;}}}
tp_inst._defaults=$.extend({},this._defaults,inlineSettings,o,{beforeShow:function(input,dp_inst){if($.isFunction(o.beforeShow))
return o.beforeShow(input,dp_inst,tp_inst);},onChangeMonthYear:function(year,month,dp_inst){tp_inst._updateDateTime(dp_inst);if($.isFunction(o.onChangeMonthYear))
o.onChangeMonthYear.call($input[0],year,month,dp_inst,tp_inst);},onClose:function(dateText,dp_inst){if(tp_inst.timeDefined===true&&$input.val()!='')
tp_inst._updateDateTime(dp_inst);if($.isFunction(o.onClose))
o.onClose.call($input[0],dateText,dp_inst,tp_inst);},timepicker:tp_inst});tp_inst.amNames=$.map(tp_inst._defaults.amNames,function(val){return val.toUpperCase();});tp_inst.pmNames=$.map(tp_inst._defaults.pmNames,function(val){return val.toUpperCase();});if(tp_inst._defaults.timezoneList===null){var timezoneList=[];for(var i=-11;i<=12;i++)
timezoneList.push((i>=0?'+':'-')+('0'+Math.abs(i).toString()).slice(-2)+'00');if(tp_inst._defaults.timezoneIso8609)
timezoneList=$.map(timezoneList,function(val){return val=='+0000'?'Z':(val.substring(0,3)+':'+val.substring(3));});tp_inst._defaults.timezoneList=timezoneList;}
tp_inst.hour=tp_inst._defaults.hour;tp_inst.minute=tp_inst._defaults.minute;tp_inst.second=tp_inst._defaults.second;tp_inst.millisec=tp_inst._defaults.millisec;tp_inst.ampm='';tp_inst.$input=$input;if(o.altField)
tp_inst.$altInput=$(o.altField).css({cursor:'pointer'}).focus(function(){$input.trigger("focus");});if(tp_inst._defaults.minDate==0||tp_inst._defaults.minDateTime==0)
{tp_inst._defaults.minDate=new Date();}
if(tp_inst._defaults.maxDate==0||tp_inst._defaults.maxDateTime==0)
{tp_inst._defaults.maxDate=new Date();}
if(tp_inst._defaults.minDate!==undefined&&tp_inst._defaults.minDate instanceof Date)
tp_inst._defaults.minDateTime=new Date(tp_inst._defaults.minDate.getTime());if(tp_inst._defaults.minDateTime!==undefined&&tp_inst._defaults.minDateTime instanceof Date)
tp_inst._defaults.minDate=new Date(tp_inst._defaults.minDateTime.getTime());if(tp_inst._defaults.maxDate!==undefined&&tp_inst._defaults.maxDate instanceof Date)
tp_inst._defaults.maxDateTime=new Date(tp_inst._defaults.maxDate.getTime());if(tp_inst._defaults.maxDateTime!==undefined&&tp_inst._defaults.maxDateTime instanceof Date)
tp_inst._defaults.maxDate=new Date(tp_inst._defaults.maxDateTime.getTime());return tp_inst;},_addTimePicker:function(dp_inst){var currDT=(this.$altInput&&this._defaults.altFieldTimeOnly)?this.$input.val()+' '+this.$altInput.val():this.$input.val();this.timeDefined=this._parseTime(currDT);this._limitMinMaxDateTime(dp_inst,false);this._injectTimePicker();},_parseTime:function(timeString,withDate){var regstr=this._defaults.timeFormat.toString().replace(/h{1,2}/ig,'(\\d?\\d)').replace(/m{1,2}/ig,'(\\d?\\d)').replace(/s{1,2}/ig,'(\\d?\\d)').replace(/l{1}/ig,'(\\d?\\d?\\d)').replace(/t{1,2}/ig,this._getPatternAmpm()).replace(/z{1}/ig,'(z|[-+]\\d\\d:?\\d\\d)?').replace(/\s/g,'\\s?')+this._defaults.timeSuffix+'$',order=this._getFormatPositions(),ampm='',treg;if(!this.inst)this.inst=$.datepicker._getInst(this.$input[0]);if(withDate||!this._defaults.timeOnly){var dp_dateFormat=$.datepicker._get(this.inst,'dateFormat');var specials=new RegExp("[.*+?|()\\[\\]{}\\\\]","g");regstr='^.{'+dp_dateFormat.length+',}?'+this._defaults.separator.replace(specials,"\\$&")+regstr;}
treg=timeString.match(new RegExp(regstr,'i'));if(treg){if(order.t!==-1){if(treg[order.t]===undefined||treg[order.t].length===0){ampm='';this.ampm='';}else{ampm=$.inArray(treg[order.t].toUpperCase(),this.amNames)!==-1?'AM':'PM';this.ampm=this._defaults[ampm=='AM'?'amNames':'pmNames'][0];}}
if(order.h!==-1){if(ampm=='AM'&&treg[order.h]=='12')
this.hour=0;else if(ampm=='PM'&&treg[order.h]!='12')
this.hour=(parseFloat(treg[order.h])+12).toFixed(0);else this.hour=Number(treg[order.h]);}
if(order.m!==-1)this.minute=Number(treg[order.m]);if(order.s!==-1)this.second=Number(treg[order.s]);if(order.l!==-1)this.millisec=Number(treg[order.l]);if(order.z!==-1&&treg[order.z]!==undefined){var tz=treg[order.z].toUpperCase();switch(tz.length){case 1:tz=this._defaults.timezoneIso8609?'Z':'+0000';break;case 5:if(this._defaults.timezoneIso8609)
tz=tz.substring(1)=='0000'?'Z':tz.substring(0,3)+':'+tz.substring(3);break;case 6:if(!this._defaults.timezoneIso8609)
tz=tz=='Z'||tz.substring(1)=='00:00'?'+0000':tz.replace(/:/,'');else if(tz.substring(1)=='00:00')
tz='Z';break;}
this.timezone=tz;}
return true;}
return false;},_getPatternAmpm:function(){var markers=[],o=this._defaults;if(o.amNames)
$.merge(markers,o.amNames);if(o.pmNames)
$.merge(markers,o.pmNames);markers=$.map(markers,function(val){return val.replace(/[.*+?|()\[\]{}\\]/g,'\\$&');});return'('+markers.join('|')+')?';},_getFormatPositions:function(){var finds=this._defaults.timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z)/g),orders={h:-1,m:-1,s:-1,l:-1,t:-1,z:-1};if(finds)
for(var i=0;i<finds.length;i++)
if(orders[finds[i].toString().charAt(0)]==-1)
orders[finds[i].toString().charAt(0)]=i+1;return orders;},_injectTimePicker:function(){var $dp=this.inst.dpDiv,o=this._defaults,tp_inst=this,hourMax=parseInt((o.hourMax-((o.hourMax-o.hourMin)%o.stepHour)),10),minMax=parseInt((o.minuteMax-((o.minuteMax-o.minuteMin)%o.stepMinute)),10),secMax=parseInt((o.secondMax-((o.secondMax-o.secondMin)%o.stepSecond)),10),millisecMax=parseInt((o.millisecMax-((o.millisecMax-o.millisecMin)%o.stepMillisec)),10),dp_id=this.inst.id.toString().replace(/([^A-Za-z0-9_])/g,'');if($dp.find("div#ui-timepicker-div-"+dp_id).length===0&&o.showTimepicker){var noDisplay=' style="display:none;"',html='<div class="ui-timepicker-div" id="ui-timepicker-div-'+dp_id+'"><dl>'+'<dt class="ui_tpicker_time_label" id="ui_tpicker_time_label_'+dp_id+'"'+
((o.showTime)?'':noDisplay)+'>'+o.timeText+'</dt>'+'<dd class="ui_tpicker_time" id="ui_tpicker_time_'+dp_id+'"'+
((o.showTime)?'':noDisplay)+'></dd>'+'<dt class="ui_tpicker_hour_label" id="ui_tpicker_hour_label_'+dp_id+'"'+
((o.showHour)?'':noDisplay)+'>'+o.hourText+'</dt>',hourGridSize=0,minuteGridSize=0,secondGridSize=0,millisecGridSize=0,size=null;html+='<dd class="ui_tpicker_hour"><div id="ui_tpicker_hour_'+dp_id+'"'+
((o.showHour)?'':noDisplay)+'></div>';if(o.showHour&&o.hourGrid>0){html+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';for(var h=o.hourMin;h<=hourMax;h+=parseInt(o.hourGrid,10)){hourGridSize++;var tmph=(o.ampm&&h>12)?h-12:h;if(tmph<10)tmph='0'+tmph;if(o.ampm){if(h==0)tmph=12+'a';else if(h<12)tmph+='a';else tmph+='p';}
html+='<td>'+tmph+'</td>';}
html+='</tr></table></div>';}
html+='</dd>';html+='<dt class="ui_tpicker_minute_label" id="ui_tpicker_minute_label_'+dp_id+'"'+
((o.showMinute)?'':noDisplay)+'>'+o.minuteText+'</dt>'+'<dd class="ui_tpicker_minute"><div id="ui_tpicker_minute_'+dp_id+'"'+
((o.showMinute)?'':noDisplay)+'></div>';if(o.showMinute&&o.minuteGrid>0){html+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';for(var m=o.minuteMin;m<=minMax;m+=parseInt(o.minuteGrid,10)){minuteGridSize++;html+='<td>'+((m<10)?'0':'')+m+'</td>';}
html+='</tr></table></div>';}
html+='</dd>';html+='<dt class="ui_tpicker_second_label" id="ui_tpicker_second_label_'+dp_id+'"'+
((o.showSecond)?'':noDisplay)+'>'+o.secondText+'</dt>'+'<dd class="ui_tpicker_second"><div id="ui_tpicker_second_'+dp_id+'"'+
((o.showSecond)?'':noDisplay)+'></div>';if(o.showSecond&&o.secondGrid>0){html+='<div style="padding-left: 1px"><table><tr>';for(var s=o.secondMin;s<=secMax;s+=parseInt(o.secondGrid,10)){secondGridSize++;html+='<td>'+((s<10)?'0':'')+s+'</td>';}
html+='</tr></table></div>';}
html+='</dd>';html+='<dt class="ui_tpicker_millisec_label" id="ui_tpicker_millisec_label_'+dp_id+'"'+
((o.showMillisec)?'':noDisplay)+'>'+o.millisecText+'</dt>'+'<dd class="ui_tpicker_millisec"><div id="ui_tpicker_millisec_'+dp_id+'"'+
((o.showMillisec)?'':noDisplay)+'></div>';if(o.showMillisec&&o.millisecGrid>0){html+='<div style="padding-left: 1px"><table><tr>';for(var l=o.millisecMin;l<=millisecMax;l+=parseInt(o.millisecGrid,10)){millisecGridSize++;html+='<td>'+((l<10)?'0':'')+l+'</td>';}
html+='</tr></table></div>';}
html+='</dd>';html+='<dt class="ui_tpicker_timezone_label" id="ui_tpicker_timezone_label_'+dp_id+'"'+
((o.showTimezone)?'':noDisplay)+'>'+o.timezoneText+'</dt>';html+='<dd class="ui_tpicker_timezone" id="ui_tpicker_timezone_'+dp_id+'"'+
((o.showTimezone)?'':noDisplay)+'></dd>';html+='</dl></div>';$tp=$(html);if(o.timeOnly===true){$tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all">'+'<div class="ui-datepicker-title">'+o.timeOnlyTitle+'</div>'+'</div>');$dp.find('.ui-datepicker-header, .ui-datepicker-calendar').hide();}
this.hour_slider=$tp.find('#ui_tpicker_hour_'+dp_id).slider({orientation:"horizontal",value:this.hour,min:o.hourMin,max:hourMax,step:o.stepHour,slide:function(event,ui){tp_inst.hour_slider.slider("option","value",ui.value);tp_inst._onTimeChange();}});this.minute_slider=$tp.find('#ui_tpicker_minute_'+dp_id).slider({orientation:"horizontal",value:this.minute,min:o.minuteMin,max:minMax,step:o.stepMinute,slide:function(event,ui){tp_inst.minute_slider.slider("option","value",ui.value);tp_inst._onTimeChange();}});this.second_slider=$tp.find('#ui_tpicker_second_'+dp_id).slider({orientation:"horizontal",value:this.second,min:o.secondMin,max:secMax,step:o.stepSecond,slide:function(event,ui){tp_inst.second_slider.slider("option","value",ui.value);tp_inst._onTimeChange();}});this.millisec_slider=$tp.find('#ui_tpicker_millisec_'+dp_id).slider({orientation:"horizontal",value:this.millisec,min:o.millisecMin,max:millisecMax,step:o.stepMillisec,slide:function(event,ui){tp_inst.millisec_slider.slider("option","value",ui.value);tp_inst._onTimeChange();}});this.timezone_select=$tp.find('#ui_tpicker_timezone_'+dp_id).append('<select></select>').find("select");$.fn.append.apply(this.timezone_select,$.map(o.timezoneList,function(val,idx){return $("<option />").val(typeof val=="object"?val.value:val).text(typeof val=="object"?val.label:val);}));this.timezone_select.val((typeof this.timezone!="undefined"&&this.timezone!=null&&this.timezone!="")?this.timezone:o.timezone);this.timezone_select.change(function(){tp_inst._onTimeChange();});if(o.showHour&&o.hourGrid>0){size=100*hourGridSize*o.hourGrid/(hourMax-o.hourMin);$tp.find(".ui_tpicker_hour table").css({width:size+"%",marginLeft:(size/(-2*hourGridSize))+"%",borderCollapse:'collapse'}).find("td").each(function(index){$(this).click(function(){var h=$(this).html();if(o.ampm){var ap=h.substring(2).toLowerCase(),aph=parseInt(h.substring(0,2),10);if(ap=='a'){if(aph==12)h=0;else h=aph;}else if(aph==12)h=12;else h=aph+12;}
tp_inst.hour_slider.slider("option","value",h);tp_inst._onTimeChange();tp_inst._onSelectHandler();}).css({cursor:'pointer',width:(100/hourGridSize)+'%',textAlign:'center',overflow:'hidden'});});}
if(o.showMinute&&o.minuteGrid>0){size=100*minuteGridSize*o.minuteGrid/(minMax-o.minuteMin);$tp.find(".ui_tpicker_minute table").css({width:size+"%",marginLeft:(size/(-2*minuteGridSize))+"%",borderCollapse:'collapse'}).find("td").each(function(index){$(this).click(function(){tp_inst.minute_slider.slider("option","value",$(this).html());tp_inst._onTimeChange();tp_inst._onSelectHandler();}).css({cursor:'pointer',width:(100/minuteGridSize)+'%',textAlign:'center',overflow:'hidden'});});}
if(o.showSecond&&o.secondGrid>0){$tp.find(".ui_tpicker_second table").css({width:size+"%",marginLeft:(size/(-2*secondGridSize))+"%",borderCollapse:'collapse'}).find("td").each(function(index){$(this).click(function(){tp_inst.second_slider.slider("option","value",$(this).html());tp_inst._onTimeChange();tp_inst._onSelectHandler();}).css({cursor:'pointer',width:(100/secondGridSize)+'%',textAlign:'center',overflow:'hidden'});});}
if(o.showMillisec&&o.millisecGrid>0){$tp.find(".ui_tpicker_millisec table").css({width:size+"%",marginLeft:(size/(-2*millisecGridSize))+"%",borderCollapse:'collapse'}).find("td").each(function(index){$(this).click(function(){tp_inst.millisec_slider.slider("option","value",$(this).html());tp_inst._onTimeChange();tp_inst._onSelectHandler();}).css({cursor:'pointer',width:(100/millisecGridSize)+'%',textAlign:'center',overflow:'hidden'});});}
var $buttonPanel=$dp.find('.ui-datepicker-buttonpane');if($buttonPanel.length)$buttonPanel.before($tp);else $dp.append($tp);this.$timeObj=$tp.find('#ui_tpicker_time_'+dp_id);if(this.inst!==null){var timeDefined=this.timeDefined;this._onTimeChange();this.timeDefined=timeDefined;}
var onSelectDelegate=function(){tp_inst._onSelectHandler();};this.hour_slider.bind('slidestop',onSelectDelegate);this.minute_slider.bind('slidestop',onSelectDelegate);this.second_slider.bind('slidestop',onSelectDelegate);this.millisec_slider.bind('slidestop',onSelectDelegate);if(this._defaults.addSliderAccess){var sliderAccessArgs=this._defaults.sliderAccessArgs;setTimeout(function(){if($tp.find('.ui-slider-access').length==0){$tp.find('.ui-slider:visible').sliderAccess(sliderAccessArgs);var sliderAccessWidth=$tp.find('.ui-slider-access:eq(0)').outerWidth(true);if(sliderAccessWidth){$tp.find('table:visible').each(function(){var $g=$(this),oldWidth=$g.outerWidth(),oldMarginLeft=$g.css('marginLeft').toString().replace('%',''),newWidth=oldWidth-sliderAccessWidth,newMarginLeft=((oldMarginLeft*newWidth)/oldWidth)+'%';$g.css({width:newWidth,marginLeft:newMarginLeft});});}}},0);}}},_limitMinMaxDateTime:function(dp_inst,adjustSliders){var o=this._defaults,dp_date=new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay);if(!this._defaults.showTimepicker)return;if($.datepicker._get(dp_inst,'minDateTime')!==null&&$.datepicker._get(dp_inst,'minDateTime')!==undefined&&dp_date){var minDateTime=$.datepicker._get(dp_inst,'minDateTime'),minDateTimeDate=new Date(minDateTime.getFullYear(),minDateTime.getMonth(),minDateTime.getDate(),0,0,0,0);if(this.hourMinOriginal===null||this.minuteMinOriginal===null||this.secondMinOriginal===null||this.millisecMinOriginal===null){this.hourMinOriginal=o.hourMin;this.minuteMinOriginal=o.minuteMin;this.secondMinOriginal=o.secondMin;this.millisecMinOriginal=o.millisecMin;}
if(dp_inst.settings.timeOnly||minDateTimeDate.getTime()==dp_date.getTime()){this._defaults.hourMin=minDateTime.getHours();if(this.hour<=this._defaults.hourMin){this.hour=this._defaults.hourMin;this._defaults.minuteMin=minDateTime.getMinutes();if(this.minute<=this._defaults.minuteMin){this.minute=this._defaults.minuteMin;this._defaults.secondMin=minDateTime.getSeconds();}else if(this.second<=this._defaults.secondMin){this.second=this._defaults.secondMin;this._defaults.millisecMin=minDateTime.getMilliseconds();}else{if(this.millisec<this._defaults.millisecMin)
this.millisec=this._defaults.millisecMin;this._defaults.millisecMin=this.millisecMinOriginal;}}else{this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;}}else{this._defaults.hourMin=this.hourMinOriginal;this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;}}
if($.datepicker._get(dp_inst,'maxDateTime')!==null&&$.datepicker._get(dp_inst,'maxDateTime')!==undefined&&dp_date){var maxDateTime=$.datepicker._get(dp_inst,'maxDateTime'),maxDateTimeDate=new Date(maxDateTime.getFullYear(),maxDateTime.getMonth(),maxDateTime.getDate(),0,0,0,0);if(this.hourMaxOriginal===null||this.minuteMaxOriginal===null||this.secondMaxOriginal===null){this.hourMaxOriginal=o.hourMax;this.minuteMaxOriginal=o.minuteMax;this.secondMaxOriginal=o.secondMax;this.millisecMaxOriginal=o.millisecMax;}
if(dp_inst.settings.timeOnly||maxDateTimeDate.getTime()==dp_date.getTime()){this._defaults.hourMax=maxDateTime.getHours();if(this.hour>=this._defaults.hourMax){this.hour=this._defaults.hourMax;this._defaults.minuteMax=maxDateTime.getMinutes();if(this.minute>=this._defaults.minuteMax){this.minute=this._defaults.minuteMax;this._defaults.secondMax=maxDateTime.getSeconds();}else if(this.second>=this._defaults.secondMax){this.second=this._defaults.secondMax;this._defaults.millisecMax=maxDateTime.getMilliseconds();}else{if(this.millisec>this._defaults.millisecMax)this.millisec=this._defaults.millisecMax;this._defaults.millisecMax=this.millisecMaxOriginal;}}else{this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;}}else{this._defaults.hourMax=this.hourMaxOriginal;this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;}}
if(adjustSliders!==undefined&&adjustSliders===true){var hourMax=parseInt((this._defaults.hourMax-((this._defaults.hourMax-this._defaults.hourMin)%this._defaults.stepHour)),10),minMax=parseInt((this._defaults.minuteMax-((this._defaults.minuteMax-this._defaults.minuteMin)%this._defaults.stepMinute)),10),secMax=parseInt((this._defaults.secondMax-((this._defaults.secondMax-this._defaults.secondMin)%this._defaults.stepSecond)),10),millisecMax=parseInt((this._defaults.millisecMax-((this._defaults.millisecMax-this._defaults.millisecMin)%this._defaults.stepMillisec)),10);if(this.hour_slider)
this.hour_slider.slider("option",{min:this._defaults.hourMin,max:hourMax}).slider('value',this.hour);if(this.minute_slider)
this.minute_slider.slider("option",{min:this._defaults.minuteMin,max:minMax}).slider('value',this.minute);if(this.second_slider)
this.second_slider.slider("option",{min:this._defaults.secondMin,max:secMax}).slider('value',this.second);if(this.millisec_slider)
this.millisec_slider.slider("option",{min:this._defaults.millisecMin,max:millisecMax}).slider('value',this.millisec);}},_onTimeChange:function(){var hour=(this.hour_slider)?this.hour_slider.slider('value'):false,minute=(this.minute_slider)?this.minute_slider.slider('value'):false,second=(this.second_slider)?this.second_slider.slider('value'):false,millisec=(this.millisec_slider)?this.millisec_slider.slider('value'):false,timezone=(this.timezone_select)?this.timezone_select.val():false,o=this._defaults;if(typeof(hour)=='object')hour=false;if(typeof(minute)=='object')minute=false;if(typeof(second)=='object')second=false;if(typeof(millisec)=='object')millisec=false;if(typeof(timezone)=='object')timezone=false;if(hour!==false)hour=parseInt(hour,10);if(minute!==false)minute=parseInt(minute,10);if(second!==false)second=parseInt(second,10);if(millisec!==false)millisec=parseInt(millisec,10);var ampm=o[hour<12?'amNames':'pmNames'][0];var hasChanged=(hour!=this.hour||minute!=this.minute||second!=this.second||millisec!=this.millisec||(this.ampm.length>0&&(hour<12)!=($.inArray(this.ampm.toUpperCase(),this.amNames)!==-1))||timezone!=this.timezone);if(hasChanged){if(hour!==false)this.hour=hour;if(minute!==false)this.minute=minute;if(second!==false)this.second=second;if(millisec!==false)this.millisec=millisec;if(timezone!==false)this.timezone=timezone;if(!this.inst)this.inst=$.datepicker._getInst(this.$input[0]);this._limitMinMaxDateTime(this.inst,true);}
if(o.ampm)this.ampm=ampm;this.formattedTime=$.datepicker.formatTime(this._defaults.timeFormat,this,this._defaults);if(this.$timeObj)this.$timeObj.text(this.formattedTime+o.timeSuffix);this.timeDefined=true;if(hasChanged)this._updateDateTime();},_onSelectHandler:function(){var onSelect=this._defaults.onSelect;var inputEl=this.$input?this.$input[0]:null;if(onSelect&&inputEl){onSelect.apply(inputEl,[this.formattedDateTime,this]);}},_formatTime:function(time,format){time=time||{hour:this.hour,minute:this.minute,second:this.second,millisec:this.millisec,ampm:this.ampm,timezone:this.timezone};var tmptime=(format||this._defaults.timeFormat).toString();tmptime=$.datepicker.formatTime(tmptime,time,this._defaults);if(arguments.length)return tmptime;else this.formattedTime=tmptime;},_updateDateTime:function(dp_inst){dp_inst=this.inst||dp_inst;var dt=$.datepicker._daylightSavingAdjust(new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay)),dateFmt=$.datepicker._get(dp_inst,'dateFormat'),formatCfg=$.datepicker._getFormatConfig(dp_inst),timeAvailable=dt!==null&&this.timeDefined;this.formattedDate=$.datepicker.formatDate(dateFmt,(dt===null?new Date():dt),formatCfg);var formattedDateTime=this.formattedDate;if(dp_inst.lastVal!==undefined&&(dp_inst.lastVal.length>0&&this.$input.val().length===0))
return;if(this._defaults.timeOnly===true){formattedDateTime=this.formattedTime;}else if(this._defaults.timeOnly!==true&&(this._defaults.alwaysSetTime||timeAvailable)){formattedDateTime+=this._defaults.separator+this.formattedTime+this._defaults.timeSuffix;}
this.formattedDateTime=formattedDateTime;if(!this._defaults.showTimepicker){this.$input.val(this.formattedDate);}else if(this.$altInput&&this._defaults.altFieldTimeOnly===true){this.$altInput.val(this.formattedTime);this.$input.val(this.formattedDate);}else if(this.$altInput){this.$altInput.val(formattedDateTime);this.$input.val(formattedDateTime);}else{this.$input.val(formattedDateTime);}
this.$input.trigger("change");}});$.fn.extend({timepicker:function(o){o=o||{};var tmp_args=arguments;if(typeof o=='object')tmp_args[0]=$.extend(o,{timeOnly:true});return $(this).each(function(){$.fn.datetimepicker.apply($(this),tmp_args);});},datetimepicker:function(o){o=o||{};tmp_args=arguments;if(typeof(o)=='string'){if(o=='getDate')
return $.fn.datepicker.apply($(this[0]),tmp_args);else
return this.each(function(){var $t=$(this);$t.datepicker.apply($t,tmp_args);});}
else
return this.each(function(){var $t=$(this);$t.datepicker($.timepicker._newInst($t,o)._defaults);});}});$.datepicker.formatTime=function(format,time,options){options=options||{};options=$.extend($.timepicker._defaults,options);time=$.extend({hour:0,minute:0,second:0,millisec:0,timezone:'+0000'},time);var tmptime=format;var ampmName=options['amNames'][0];var hour=parseInt(time.hour,10);if(options.ampm){if(hour>11){ampmName=options['pmNames'][0];if(hour>12)
hour=hour%12;}
if(hour===0)
hour=12;}
tmptime=tmptime.replace(/(?:hh?|mm?|ss?|[tT]{1,2}|[lz])/g,function(match){switch(match.toLowerCase()){case'hh':return('0'+hour).slice(-2);case'h':return hour;case'mm':return('0'+time.minute).slice(-2);case'm':return time.minute;case'ss':return('0'+time.second).slice(-2);case's':return time.second;case'l':return('00'+time.millisec).slice(-3);case'z':return time.timezone;case't':case'tt':if(options.ampm){if(match.length==1)
ampmName=ampmName.charAt(0);return match.charAt(0)=='T'?ampmName.toUpperCase():ampmName.toLowerCase();}
return'';}});tmptime=$.trim(tmptime);return tmptime;};$.datepicker._base_selectDate=$.datepicker._selectDate;$.datepicker._selectDate=function(id,dateStr){var inst=this._getInst($(id)[0]),tp_inst=this._get(inst,'timepicker');if(tp_inst){tp_inst._limitMinMaxDateTime(inst,true);inst.inline=inst.stay_open=true;this._base_selectDate(id,dateStr);inst.inline=inst.stay_open=false;this._notifyChange(inst);this._updateDatepicker(inst);}
else this._base_selectDate(id,dateStr);};$.datepicker._base_updateDatepicker=$.datepicker._updateDatepicker;$.datepicker._updateDatepicker=function(inst){var input=inst.input[0];if($.datepicker._curInst&&$.datepicker._curInst!=inst&&$.datepicker._datepickerShowing&&$.datepicker._lastInput!=input){return;}
if(typeof(inst.stay_open)!=='boolean'||inst.stay_open===false){this._base_updateDatepicker(inst);var tp_inst=this._get(inst,'timepicker');if(tp_inst)tp_inst._addTimePicker(inst);}};$.datepicker._base_doKeyPress=$.datepicker._doKeyPress;$.datepicker._doKeyPress=function(event){var inst=$.datepicker._getInst(event.target),tp_inst=$.datepicker._get(inst,'timepicker');if(tp_inst){if($.datepicker._get(inst,'constrainInput')){var ampm=tp_inst._defaults.ampm,dateChars=$.datepicker._possibleChars($.datepicker._get(inst,'dateFormat')),datetimeChars=tp_inst._defaults.timeFormat.toString().replace(/[hms]/g,'').replace(/TT/g,ampm?'APM':'').replace(/Tt/g,ampm?'AaPpMm':'').replace(/tT/g,ampm?'AaPpMm':'').replace(/T/g,ampm?'AP':'').replace(/tt/g,ampm?'apm':'').replace(/t/g,ampm?'ap':'')+" "+
tp_inst._defaults.separator+
tp_inst._defaults.timeSuffix+
(tp_inst._defaults.showTimezone?tp_inst._defaults.timezoneList.join(''):'')+
(tp_inst._defaults.amNames.join(''))+
(tp_inst._defaults.pmNames.join(''))+
dateChars,chr=String.fromCharCode(event.charCode===undefined?event.keyCode:event.charCode);return event.ctrlKey||(chr<' '||!dateChars||datetimeChars.indexOf(chr)>-1);}}
return $.datepicker._base_doKeyPress(event);};$.datepicker._base_doKeyUp=$.datepicker._doKeyUp;$.datepicker._doKeyUp=function(event){var inst=$.datepicker._getInst(event.target),tp_inst=$.datepicker._get(inst,'timepicker');if(tp_inst){if(tp_inst._defaults.timeOnly&&(inst.input.val()!=inst.lastVal)){try{$.datepicker._updateDatepicker(inst);}
catch(err){$.datepicker.log(err);}}}
return $.datepicker._base_doKeyUp(event);};$.datepicker._base_gotoToday=$.datepicker._gotoToday;$.datepicker._gotoToday=function(id){var inst=this._getInst($(id)[0]),$dp=inst.dpDiv;this._base_gotoToday(id);var now=new Date();var tp_inst=this._get(inst,'timepicker');if(tp_inst&&tp_inst._defaults.showTimezone&&tp_inst.timezone_select){var tzoffset=now.getTimezoneOffset();var tzsign=tzoffset>0?'-':'+';tzoffset=Math.abs(tzoffset);var tzmin=tzoffset%60;tzoffset=tzsign+('0'+(tzoffset-tzmin)/60).slice(-2)+('0'+tzmin).slice(-2);if(tp_inst._defaults.timezoneIso8609)
tzoffset=tzoffset.substring(0,3)+':'+tzoffset.substring(3);tp_inst.timezone_select.val(tzoffset);}
this._setTime(inst,now);$('.ui-datepicker-today',$dp).click();};$.datepicker._disableTimepickerDatepicker=function(target,date,withDate){var inst=this._getInst(target),tp_inst=this._get(inst,'timepicker');$(target).datepicker('getDate');if(tp_inst){tp_inst._defaults.showTimepicker=false;tp_inst._updateDateTime(inst);}};$.datepicker._enableTimepickerDatepicker=function(target,date,withDate){var inst=this._getInst(target),tp_inst=this._get(inst,'timepicker');$(target).datepicker('getDate');if(tp_inst){tp_inst._defaults.showTimepicker=true;tp_inst._addTimePicker(inst);tp_inst._updateDateTime(inst);}};$.datepicker._setTime=function(inst,date){var tp_inst=this._get(inst,'timepicker');if(tp_inst){var defaults=tp_inst._defaults,hour=date?date.getHours():defaults.hour,minute=date?date.getMinutes():defaults.minute,second=date?date.getSeconds():defaults.second,millisec=date?date.getMilliseconds():defaults.millisec;if((hour<defaults.hourMin||hour>defaults.hourMax)||(minute<defaults.minuteMin||minute>defaults.minuteMax)||(second<defaults.secondMin||second>defaults.secondMax)||(millisec<defaults.millisecMin||millisec>defaults.millisecMax)){hour=defaults.hourMin;minute=defaults.minuteMin;second=defaults.secondMin;millisec=defaults.millisecMin;}
tp_inst.hour=hour;tp_inst.minute=minute;tp_inst.second=second;tp_inst.millisec=millisec;if(tp_inst.hour_slider)tp_inst.hour_slider.slider('value',hour);if(tp_inst.minute_slider)tp_inst.minute_slider.slider('value',minute);if(tp_inst.second_slider)tp_inst.second_slider.slider('value',second);if(tp_inst.millisec_slider)tp_inst.millisec_slider.slider('value',millisec);tp_inst._onTimeChange();tp_inst._updateDateTime(inst);}};$.datepicker._setTimeDatepicker=function(target,date,withDate){var inst=this._getInst(target),tp_inst=this._get(inst,'timepicker');if(tp_inst){this._setDateFromField(inst);var tp_date;if(date){if(typeof date=="string"){tp_inst._parseTime(date,withDate);tp_date=new Date();tp_date.setHours(tp_inst.hour,tp_inst.minute,tp_inst.second,tp_inst.millisec);}
else tp_date=new Date(date.getTime());if(tp_date.toString()=='Invalid Date')tp_date=undefined;this._setTime(inst,tp_date);}}};$.datepicker._base_setDateDatepicker=$.datepicker._setDateDatepicker;$.datepicker._setDateDatepicker=function(target,date){var inst=this._getInst(target),tp_date=(date instanceof Date)?new Date(date.getTime()):date;this._updateDatepicker(inst);this._base_setDateDatepicker.apply(this,arguments);this._setTimeDatepicker(target,tp_date,true);};$.datepicker._base_getDateDatepicker=$.datepicker._getDateDatepicker;$.datepicker._getDateDatepicker=function(target,noDefault){var inst=this._getInst(target),tp_inst=this._get(inst,'timepicker');if(tp_inst){this._setDateFromField(inst,noDefault);var date=this._getDate(inst);if(date&&tp_inst._parseTime($(target).val(),tp_inst.timeOnly))date.setHours(tp_inst.hour,tp_inst.minute,tp_inst.second,tp_inst.millisec);return date;}
return this._base_getDateDatepicker(target,noDefault);};$.datepicker._base_parseDate=$.datepicker.parseDate;$.datepicker.parseDate=function(format,value,settings){var date;try{date=this._base_parseDate(format,value,settings);}catch(err){if(err.indexOf(":")>=0){date=this._base_parseDate(format,value.substring(0,value.length-(err.length-err.indexOf(':')-2)),settings);}else{throw err;}}
return date;};$.datepicker._base_formatDate=$.datepicker._formatDate;$.datepicker._formatDate=function(inst,day,month,year){var tp_inst=this._get(inst,'timepicker');if(tp_inst){tp_inst._updateDateTime(inst);return tp_inst.$input.val();}
return this._base_formatDate(inst);};$.datepicker._base_optionDatepicker=$.datepicker._optionDatepicker;$.datepicker._optionDatepicker=function(target,name,value){var inst=this._getInst(target),tp_inst=this._get(inst,'timepicker');if(tp_inst){var min=null,max=null,onselect=null;if(typeof name=='string'){if(name==='minDate'||name==='minDateTime')
min=value;else if(name==='maxDate'||name==='maxDateTime')
max=value;else if(name==='onSelect')
onselect=value;}else if(typeof name=='object'){if(name.minDate)
min=name.minDate;else if(name.minDateTime)
min=name.minDateTime;else if(name.maxDate)
max=name.maxDate;else if(name.maxDateTime)
max=name.maxDateTime;}
if(min){if(min==0)
min=new Date();else
min=new Date(min);tp_inst._defaults.minDate=min;tp_inst._defaults.minDateTime=min;}else if(max){if(max==0)
max=new Date();else
max=new Date(max);tp_inst._defaults.maxDate=max;tp_inst._defaults.maxDateTime=max;}else if(onselect)
tp_inst._defaults.onSelect=onselect;}
if(value===undefined)
return this._base_optionDatepicker(target,name);return this._base_optionDatepicker(target,name,value);};function extendRemove(target,props){$.extend(target,props);for(var name in props)
if(props[name]===null||props[name]===undefined)
target[name]=props[name];return target;};$.timepicker=new Timepicker();$.timepicker.version="1.0.0";})(jQuery);

/****************************************************************************************************************************************************************
 jQuery Price Format (jquerypriceformat.com)
 ****************************************************************************************************************************************************************/
(function(e){e.fn.priceFormat=function(t){var n={prefix:"US$ ",suffix:"",centsSeparator:".",thousandsSeparator:",",limit:false,centsLimit:2,clearPrefix:false,clearSufix:false,allowNegative:false,insertPlusSign:false,clearOnEmpty:false};var t=e.extend(n,t);return this.each(function(){function m(e){if(n.is("input"))n.val(e);else n.html(e)}function g(){if(n.is("input"))r=n.val();else r=n.html();return r}function y(e){var t="";for(var n=0;n<e.length;n++){char_=e.charAt(n);if(t.length==0&&char_==0)char_=false;if(char_&&char_.match(i)){if(f){if(t.length<f)t=t+char_}else{t=t+char_}}}return t}function b(e){while(e.length<l+1)e="0"+e;return e}function w(t,n){if(!n&&(t===""||t==w("0",true))&&v)return"";var r=b(y(t));var i="";var f=0;if(l==0){u="";c=""}var c=r.substr(r.length-l,l);var h=r.substr(0,r.length-l);r=l==0?h:h+u+c;if(a||e.trim(a)!=""){for(var m=h.length;m>0;m--){char_=h.substr(m-1,1);f++;if(f%3==0)char_=a+char_;i=char_+i}if(i.substr(0,1)==a)i=i.substring(1,i.length);r=l==0?i:i+u+c}if(p&&(h!=0||c!=0)){if(t.indexOf("-")!=-1&&t.indexOf("+")<t.indexOf("-")){r="-"+r}else{if(!d)r=""+r;else r="+"+r}}if(s)r=s+r;if(o)r=r+o;return r}function E(e){var t=e.keyCode?e.keyCode:e.which;var n=String.fromCharCode(t);var i=false;var s=r;var o=w(s+n);if(t>=48&&t<=57||t>=96&&t<=105)i=true;if(t==8)i=true;if(t==9)i=true;if(t==13)i=true;if(t==46)i=true;if(t==37)i=true;if(t==39)i=true;if(p&&(t==189||t==109||t==173))i=true;if(d&&(t==187||t==107||t==61))i=true;if(!i){e.preventDefault();e.stopPropagation();if(s!=o)m(o)}}function S(){var e=g();var t=w(e);if(e!=t)m(t);if(parseFloat(e)==0&&v)m("")}function x(){n.val(s+g())}function T(){n.val(g()+o)}function N(){if(e.trim(s)!=""&&c){var t=g().split(s);m(t[1])}}function C(){if(e.trim(o)!=""&&h){var t=g().split(o);m(t[0])}}var n=e(this);var r="";var i=/[0-9]/;if(n.is("input"))r=n.val();else r=n.html();var s=t.prefix;var o=t.suffix;var u=t.centsSeparator;var a=t.thousandsSeparator;var f=t.limit;var l=t.centsLimit;var c=t.clearPrefix;var h=t.clearSuffix;var p=t.allowNegative;var d=t.insertPlusSign;var v=t.clearOnEmpty;if(d)p=true;n.bind("keydown.price_format",E);n.bind("keyup.price_format",S);n.bind("focusout.price_format",S);if(c){n.bind("focusout.price_format",function(){N()});n.bind("focusin.price_format",function(){x()})}if(h){n.bind("focusout.price_format",function(){C()});n.bind("focusin.price_format",function(){T()})}if(g().length>0){S();N();C()}})};e.fn.unpriceFormat=function(){return e(this).unbind(".price_format")};e.fn.unmask=function(){var t;var n="";if(e(this).is("input"))t=e(this).val();else t=e(this).html();for(var r in t){if(!isNaN(t[r])||t[r]=="-")n+=t[r]}return n}})(jQuery)



/****************************************************************************************************************************************************************

Rangy Core

****************************************************************************************************************************************************************/

/*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2011, Tim Down
 Licensed under the MIT license.
 Version: 1.2
 Build date: 22 August 2011
*/
window.rangy=function(){function k(o,u){var x=typeof o[u];return x=="function"||!!(x=="object"&&o[u])||x=="unknown"}function L(o,u){return!!(typeof o[u]=="object"&&o[u])}function J(o,u){return typeof o[u]!="undefined"}function K(o){return function(u,x){for(var B=x.length;B--;)if(!o(u,x[B]))return false;return true}}function z(o){return o&&A(o,y)&&v(o,s)}function C(o){window.alert("Rangy not supported in your browser. Reason: "+o);c.initialized=true;c.supported=false}function N(){if(!c.initialized){var o,
u=false,x=false;if(k(document,"createRange")){o=document.createRange();if(A(o,n)&&v(o,h))u=true;o.detach()}if((o=L(document,"body")?document.body:document.getElementsByTagName("body")[0])&&k(o,"createTextRange")){o=o.createTextRange();if(z(o))x=true}!u&&!x&&C("Neither Range nor TextRange are implemented");c.initialized=true;c.features={implementsDomRange:u,implementsTextRange:x};u=j.concat(f);x=0;for(o=u.length;x<o;++x)try{u[x](c)}catch(B){L(window,"console")&&k(window.console,"log")&&window.console.log("Init listener threw an exception. Continuing.",
B)}}}function P(o){this.name=o;this.supported=this.initialized=false}var h=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],n=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],
s=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],y=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint","getBoundingClientRect"],A=K(k),p=K(L),v=K(J),c={version:"1.2",initialized:false,supported:true,util:{isHostMethod:k,isHostObject:L,isHostProperty:J,areHostMethods:A,areHostObjects:p,areHostProperties:v,isTextRange:z},features:{},modules:{},config:{alertOnWarn:false,preferTextRange:false}};
c.fail=C;c.warn=function(o){o="Rangy warning: "+o;if(c.config.alertOnWarn)window.alert(o);else typeof window.console!="undefined"&&typeof window.console.log!="undefined"&&window.console.log(o)};if({}.hasOwnProperty)c.util.extend=function(o,u){for(var x in u)if(u.hasOwnProperty(x))o[x]=u[x]};else C("hasOwnProperty not supported");var f=[],j=[];c.init=N;c.addInitListener=function(o){c.initialized?o(c):f.push(o)};var r=[];c.addCreateMissingNativeApiListener=function(o){r.push(o)};c.createMissingNativeApi=
function(o){o=o||window;N();for(var u=0,x=r.length;u<x;++u)r[u](o)};P.prototype.fail=function(o){this.initialized=true;this.supported=false;throw Error("Module '"+this.name+"' failed to load: "+o);};P.prototype.warn=function(o){c.warn("Module "+this.name+": "+o)};P.prototype.createError=function(o){return Error("Error in Rangy "+this.name+" module: "+o)};c.createModule=function(o,u){var x=new P(o);c.modules[o]=x;j.push(function(B){u(B,x);x.initialized=true;x.supported=true})};c.requireModules=function(o){for(var u=
0,x=o.length,B,F;u<x;++u){F=o[u];B=c.modules[F];if(!B||!(B instanceof P))throw Error("Module '"+F+"' not found");if(!B.supported)throw Error("Module '"+F+"' not supported");}};var M=false;p=function(){if(!M){M=true;c.initialized||N()}};if(typeof window=="undefined")C("No window found");else if(typeof document=="undefined")C("No document found");else{k(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",p,false);if(k(window,"addEventListener"))window.addEventListener("load",
p,false);else k(window,"attachEvent")?window.attachEvent("onload",p):C("Window does not have required addEventListener or attachEvent method");return c}}();
rangy.createModule("DomUtil",function(k,L){function J(c){for(var f=0;c=c.previousSibling;)f++;return f}function K(c,f){var j=[],r;for(r=c;r;r=r.parentNode)j.push(r);for(r=f;r;r=r.parentNode)if(v(j,r))return r;return null}function z(c,f,j){for(j=j?c:c.parentNode;j;){c=j.parentNode;if(c===f)return j;j=c}return null}function C(c){c=c.nodeType;return c==3||c==4||c==8}function N(c,f){var j=f.nextSibling,r=f.parentNode;j?r.insertBefore(c,j):r.appendChild(c);return c}function P(c){if(c.nodeType==9)return c;
else if(typeof c.ownerDocument!="undefined")return c.ownerDocument;else if(typeof c.document!="undefined")return c.document;else if(c.parentNode)return P(c.parentNode);else throw Error("getDocument: no document found for node");}function h(c){if(!c)return"[No node]";return C(c)?'"'+c.data+'"':c.nodeType==1?"<"+c.nodeName+(c.id?' id="'+c.id+'"':"")+">["+c.childNodes.length+"]":c.nodeName}function n(c){this._next=this.root=c}function s(c,f){this.node=c;this.offset=f}function y(c){this.code=this[c];
this.codeName=c;this.message="DOMException: "+this.codeName}var A=k.util;A.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||L.fail("document missing a Node creation method");A.isHostMethod(document,"getElementsByTagName")||L.fail("document missing getElementsByTagName method");var p=document.createElement("div");A.areHostMethods(p,["insertBefore","appendChild","cloneNode"])||L.fail("Incomplete Element implementation");p=document.createTextNode("test");A.areHostMethods(p,
["splitText","deleteData","insertData","appendData","cloneNode"])||L.fail("Incomplete Text Node implementation");var v=function(c,f){for(var j=c.length;j--;)if(c[j]===f)return true;return false};n.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var c=this._current=this._next,f;if(this._current)if(f=c.firstChild)this._next=f;else{for(f=null;c!==this.root&&!(f=c.nextSibling);)c=c.parentNode;this._next=f}return this._current},detach:function(){this._current=this._next=
this.root=null}};s.prototype={equals:function(c){return this.node===c.node&this.offset==c.offset},inspect:function(){return"[DomPosition("+h(this.node)+":"+this.offset+")]"}};y.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};y.prototype.toString=function(){return this.message};k.dom={arrayContains:v,getNodeIndex:J,getNodeLength:function(c){var f;return C(c)?c.length:(f=c.childNodes)?f.length:
0},getCommonAncestor:K,isAncestorOf:function(c,f,j){for(f=j?f:f.parentNode;f;)if(f===c)return true;else f=f.parentNode;return false},getClosestAncestorIn:z,isCharacterDataNode:C,insertAfter:N,splitDataNode:function(c,f){var j=c.cloneNode(false);j.deleteData(0,f);c.deleteData(f,c.length-f);N(j,c);return j},getDocument:P,getWindow:function(c){c=P(c);if(typeof c.defaultView!="undefined")return c.defaultView;else if(typeof c.parentWindow!="undefined")return c.parentWindow;else throw Error("Cannot get a window object for node");
},getIframeWindow:function(c){if(typeof c.contentWindow!="undefined")return c.contentWindow;else if(typeof c.contentDocument!="undefined")return c.contentDocument.defaultView;else throw Error("getIframeWindow: No Window object found for iframe element");},getIframeDocument:function(c){if(typeof c.contentDocument!="undefined")return c.contentDocument;else if(typeof c.contentWindow!="undefined")return c.contentWindow.document;else throw Error("getIframeWindow: No Document object found for iframe element");
},getBody:function(c){return A.isHostObject(c,"body")?c.body:c.getElementsByTagName("body")[0]},getRootContainer:function(c){for(var f;f=c.parentNode;)c=f;return c},comparePoints:function(c,f,j,r){var M;if(c==j)return f===r?0:f<r?-1:1;else if(M=z(j,c,true))return f<=J(M)?-1:1;else if(M=z(c,j,true))return J(M)<r?-1:1;else{f=K(c,j);c=c===f?f:z(c,f,true);j=j===f?f:z(j,f,true);if(c===j)throw Error("comparePoints got to case 4 and childA and childB are the same!");else{for(f=f.firstChild;f;){if(f===c)return-1;
else if(f===j)return 1;f=f.nextSibling}throw Error("Should not be here!");}}},inspectNode:h,createIterator:function(c){return new n(c)},DomPosition:s};k.DOMException=y});
rangy.createModule("DomRange",function(k){function L(a,e){return a.nodeType!=3&&(l.isAncestorOf(a,e.startContainer,true)||l.isAncestorOf(a,e.endContainer,true))}function J(a){return l.getDocument(a.startContainer)}function K(a,e,g){if(e=a._listeners[e])for(var q=0,G=e.length;q<G;++q)e[q].call(a,{target:a,args:g})}function z(a){return new D(a.parentNode,l.getNodeIndex(a))}function C(a){return new D(a.parentNode,l.getNodeIndex(a)+1)}function N(a,e,g){var q=a.nodeType==11?a.firstChild:a;if(l.isCharacterDataNode(e))g==
e.length?l.insertAfter(a,e):e.parentNode.insertBefore(a,g==0?e:l.splitDataNode(e,g));else g>=e.childNodes.length?e.appendChild(a):e.insertBefore(a,e.childNodes[g]);return q}function P(a){for(var e,g,q=J(a.range).createDocumentFragment();g=a.next();){e=a.isPartiallySelectedSubtree();g=g.cloneNode(!e);if(e){e=a.getSubtreeIterator();g.appendChild(P(e));e.detach(true)}if(g.nodeType==10)throw new Q("HIERARCHY_REQUEST_ERR");q.appendChild(g)}return q}function h(a,e,g){var q,G;for(g=g||{stop:false};q=a.next();)if(a.isPartiallySelectedSubtree())if(e(q)===
false){g.stop=true;return}else{q=a.getSubtreeIterator();h(q,e,g);q.detach(true);if(g.stop)return}else for(q=l.createIterator(q);G=q.next();)if(e(G)===false){g.stop=true;return}}function n(a){for(var e;a.next();)if(a.isPartiallySelectedSubtree()){e=a.getSubtreeIterator();n(e);e.detach(true)}else a.remove()}function s(a){for(var e,g=J(a.range).createDocumentFragment(),q;e=a.next();){if(a.isPartiallySelectedSubtree()){e=e.cloneNode(false);q=a.getSubtreeIterator();e.appendChild(s(q));q.detach(true)}else a.remove();
if(e.nodeType==10)throw new Q("HIERARCHY_REQUEST_ERR");g.appendChild(e)}return g}function y(a,e,g){var q=!!(e&&e.length),G,U=!!g;if(q)G=RegExp("^("+e.join("|")+")$");var ba=[];h(new p(a,false),function(m){if((!q||G.test(m.nodeType))&&(!U||g(m)))ba.push(m)});return ba}function A(a){return"["+(typeof a.getName=="undefined"?"Range":a.getName())+"("+l.inspectNode(a.startContainer)+":"+a.startOffset+", "+l.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function p(a,e){this.range=a;this.clonePartiallySelectedTextNodes=
e;if(!a.collapsed){this.sc=a.startContainer;this.so=a.startOffset;this.ec=a.endContainer;this.eo=a.endOffset;var g=a.commonAncestorContainer;if(this.sc===this.ec&&l.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===g&&!l.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:l.getClosestAncestorIn(this.sc,g,true);this._last=this.ec===g&&!l.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:l.getClosestAncestorIn(this.ec,
g,true)}}}function v(a){this.code=this[a];this.codeName=a;this.message="RangeException: "+this.codeName}function c(a,e,g){this.nodes=y(a,e,g);this._next=this.nodes[0];this._position=0}function f(a){return function(e,g){for(var q,G=g?e:e.parentNode;G;){q=G.nodeType;if(l.arrayContains(a,q))return G;G=G.parentNode}return null}}function j(a,e){if(E(a,e))throw new v("INVALID_NODE_TYPE_ERR");}function r(a){if(!a.startContainer)throw new Q("INVALID_STATE_ERR");}function M(a,e){if(!l.arrayContains(e,a.nodeType))throw new v("INVALID_NODE_TYPE_ERR");
}function o(a,e){if(e<0||e>(l.isCharacterDataNode(a)?a.length:a.childNodes.length))throw new Q("INDEX_SIZE_ERR");}function u(a,e){if(d(a,true)!==d(e,true))throw new Q("WRONG_DOCUMENT_ERR");}function x(a){if(i(a,true))throw new Q("NO_MODIFICATION_ALLOWED_ERR");}function B(a,e){if(!a)throw new Q(e);}function F(a){r(a);if(!l.arrayContains(Y,a.startContainer.nodeType)&&!d(a.startContainer,true)||!l.arrayContains(Y,a.endContainer.nodeType)&&!d(a.endContainer,true)||!(a.startOffset<=(l.isCharacterDataNode(a.startContainer)?
a.startContainer.length:a.startContainer.childNodes.length))||!(a.endOffset<=(l.isCharacterDataNode(a.endContainer)?a.endContainer.length:a.endContainer.childNodes.length)))throw Error("Range error: Range is no longer valid after DOM mutation ("+a.inspect()+")");}function W(){}function ea(a){a.START_TO_START=O;a.START_TO_END=Z;a.END_TO_END=ka;a.END_TO_START=la;a.NODE_BEFORE=ma;a.NODE_AFTER=na;a.NODE_BEFORE_AND_AFTER=oa;a.NODE_INSIDE=ja}function $(a){ea(a);ea(a.prototype)}function X(a,e){return function(){F(this);
var g=this.startContainer,q=this.startOffset,G=this.commonAncestorContainer,U=new p(this,true);if(g!==G){g=l.getClosestAncestorIn(g,G,true);q=C(g);g=q.node;q=q.offset}h(U,x);U.reset();G=a(U);U.detach();e(this,g,q,g,q);return G}}function ca(a,e,g){function q(m,t){return function(w){r(this);M(w,fa);M(b(w),Y);w=(m?z:C)(w);(t?G:U)(this,w.node,w.offset)}}function G(m,t,w){var I=m.endContainer,R=m.endOffset;if(t!==m.startContainer||w!==this.startOffset){if(b(t)!=b(I)||l.comparePoints(t,w,I,R)==1){I=t;R=
w}e(m,t,w,I,R)}}function U(m,t,w){var I=m.startContainer,R=m.startOffset;if(t!==m.endContainer||w!==this.endOffset){if(b(t)!=b(I)||l.comparePoints(t,w,I,R)==-1){I=t;R=w}e(m,I,R,t,w)}}function ba(m,t,w){if(t!==m.startContainer||w!==this.startOffset||t!==m.endContainer||w!==this.endOffset)e(m,t,w,t,w)}a.prototype=new W;k.util.extend(a.prototype,{setStart:function(m,t){r(this);j(m,true);o(m,t);G(this,m,t)},setEnd:function(m,t){r(this);j(m,true);o(m,t);U(this,m,t)},setStartBefore:q(true,true),setStartAfter:q(false,
true),setEndBefore:q(true,false),setEndAfter:q(false,false),collapse:function(m){F(this);m?e(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):e(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(m){r(this);j(m,true);e(this,m,0,m,l.getNodeLength(m))},selectNode:function(m){r(this);j(m,false);M(m,fa);var t=z(m);m=C(m);e(this,t.node,t.offset,m.node,m.offset)},extractContents:X(s,e),deleteContents:X(n,e),canSurroundContents:function(){F(this);
x(this.startContainer);x(this.endContainer);var m=new p(this,true),t=m._first&&L(m._first,this)||m._last&&L(m._last,this);m.detach();return!t},detach:function(){g(this)},splitBoundaries:function(){F(this);var m=this.startContainer,t=this.startOffset,w=this.endContainer,I=this.endOffset,R=m===w;l.isCharacterDataNode(w)&&I>0&&I<w.length&&l.splitDataNode(w,I);if(l.isCharacterDataNode(m)&&t>0&&t<m.length){m=l.splitDataNode(m,t);if(R){I-=t;w=m}else w==m.parentNode&&I>=l.getNodeIndex(m)&&I++;t=0}e(this,
m,t,w,I)},normalizeBoundaries:function(){F(this);var m=this.startContainer,t=this.startOffset,w=this.endContainer,I=this.endOffset,R=function(V){var S=V.nextSibling;if(S&&S.nodeType==V.nodeType){w=V;I=V.length;V.appendData(S.data);S.parentNode.removeChild(S)}},pa=function(V){var S=V.previousSibling;if(S&&S.nodeType==V.nodeType){m=V;var qa=V.length;t=S.length;V.insertData(0,S.data);S.parentNode.removeChild(S);if(m==w){I+=t;w=m}else if(w==V.parentNode){S=l.getNodeIndex(V);if(I==S){w=V;I=qa}else I>S&&
I--}}},ga=true;if(l.isCharacterDataNode(w))w.length==I&&R(w);else{if(I>0)(ga=w.childNodes[I-1])&&l.isCharacterDataNode(ga)&&R(ga);ga=!this.collapsed}if(ga)if(l.isCharacterDataNode(m))t==0&&pa(m);else{if(t<m.childNodes.length)(R=m.childNodes[t])&&l.isCharacterDataNode(R)&&pa(R)}else{m=w;t=I}e(this,m,t,w,I)},collapseToPoint:function(m,t){r(this);j(m,true);o(m,t);ba(this,m,t)}});$(a)}function ha(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset;a.commonAncestorContainer=a.collapsed?
a.startContainer:l.getCommonAncestor(a.startContainer,a.endContainer)}function da(a,e,g,q,G){var U=a.startContainer!==e||a.startOffset!==g,ba=a.endContainer!==q||a.endOffset!==G;a.startContainer=e;a.startOffset=g;a.endContainer=q;a.endOffset=G;ha(a);K(a,"boundarychange",{startMoved:U,endMoved:ba})}function T(a){this.startContainer=a;this.startOffset=0;this.endContainer=a;this.endOffset=0;this._listeners={boundarychange:[],detach:[]};ha(this)}k.requireModules(["DomUtil"]);var l=k.dom,D=l.DomPosition,
Q=k.DOMException;p.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;if(a){this._next=a!==this._last?a.nextSibling:null;if(l.isCharacterDataNode(a)&&this.clonePartiallySelectedTextNodes){if(a===this.ec)(a=a.cloneNode(true)).deleteData(this.eo,a.length-this.eo);if(this._current===this.sc)(a=a.cloneNode(true)).deleteData(0,
this.so)}}return a},remove:function(){var a=this._current,e,g;if(l.isCharacterDataNode(a)&&(a===this.sc||a===this.ec)){e=a===this.sc?this.so:0;g=a===this.ec?this.eo:a.length;e!=g&&a.deleteData(e,g-e)}else a.parentNode&&a.parentNode.removeChild(a)},isPartiallySelectedSubtree:function(){return L(this._current,this.range)},getSubtreeIterator:function(){var a;if(this.isSingleCharacterDataNode){a=this.range.cloneRange();a.collapse()}else{a=new T(J(this.range));var e=this._current,g=e,q=0,G=e,U=l.getNodeLength(e);
if(l.isAncestorOf(e,this.sc,true)){g=this.sc;q=this.so}if(l.isAncestorOf(e,this.ec,true)){G=this.ec;U=this.eo}da(a,g,q,G,U)}return new p(a,this.clonePartiallySelectedTextNodes)},detach:function(a){a&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};v.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};v.prototype.toString=function(){return this.message};c.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){this._current=
this._next;this._next=this.nodes[++this._position];return this._current},detach:function(){this._current=this._next=this.nodes=null}};var fa=[1,3,4,5,7,8,10],Y=[2,9,11],ia=[1,3,4,5,7,8,10,11],aa=[1,3,4,5,7,8],b=l.getRootContainer,d=f([9,11]),i=f([5,6,10,12]),E=f([6,10,12]),H=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],O=0,Z=1,ka=2,la=3,ma=0,na=1,oa=2,ja=3;W.prototype={attachListener:function(a,e){this._listeners[a].push(e)},compareBoundaryPoints:function(a,
e){F(this);u(this.startContainer,e.startContainer);var g=a==la||a==O?"start":"end",q=a==Z||a==O?"start":"end";return l.comparePoints(this[g+"Container"],this[g+"Offset"],e[q+"Container"],e[q+"Offset"])},insertNode:function(a){F(this);M(a,ia);x(this.startContainer);if(l.isAncestorOf(a,this.startContainer,true))throw new Q("HIERARCHY_REQUEST_ERR");this.setStartBefore(N(a,this.startContainer,this.startOffset))},cloneContents:function(){F(this);var a,e;if(this.collapsed)return J(this).createDocumentFragment();
else{if(this.startContainer===this.endContainer&&l.isCharacterDataNode(this.startContainer)){a=this.startContainer.cloneNode(true);a.data=a.data.slice(this.startOffset,this.endOffset);e=J(this).createDocumentFragment();e.appendChild(a);return e}else{e=new p(this,true);a=P(e);e.detach()}return a}},canSurroundContents:function(){F(this);x(this.startContainer);x(this.endContainer);var a=new p(this,true),e=a._first&&L(a._first,this)||a._last&&L(a._last,this);a.detach();return!e},surroundContents:function(a){M(a,
aa);if(!this.canSurroundContents())throw new v("BAD_BOUNDARYPOINTS_ERR");var e=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);N(a,this.startContainer,this.startOffset);a.appendChild(e);this.selectNode(a)},cloneRange:function(){F(this);for(var a=new T(J(this)),e=H.length,g;e--;){g=H[e];a[g]=this[g]}return a},toString:function(){F(this);var a=this.startContainer;if(a===this.endContainer&&l.isCharacterDataNode(a))return a.nodeType==3||a.nodeType==4?a.data.slice(this.startOffset,
this.endOffset):"";else{var e=[];a=new p(this,true);h(a,function(g){if(g.nodeType==3||g.nodeType==4)e.push(g.data)});a.detach();return e.join("")}},compareNode:function(a){F(this);var e=a.parentNode,g=l.getNodeIndex(a);if(!e)throw new Q("NOT_FOUND_ERR");a=this.comparePoint(e,g);e=this.comparePoint(e,g+1);return a<0?e>0?oa:ma:e>0?na:ja},comparePoint:function(a,e){F(this);B(a,"HIERARCHY_REQUEST_ERR");u(a,this.startContainer);if(l.comparePoints(a,e,this.startContainer,this.startOffset)<0)return-1;else if(l.comparePoints(a,
e,this.endContainer,this.endOffset)>0)return 1;return 0},createContextualFragment:function(a){r(this);var e=J(this),g=e.createElement("div");g.innerHTML=a;for(a=e.createDocumentFragment();e=g.firstChild;)a.appendChild(e);return a},toHtml:function(){F(this);var a=J(this).createElement("div");a.appendChild(this.cloneContents());return a.innerHTML},intersectsNode:function(a,e){F(this);B(a,"NOT_FOUND_ERR");if(l.getDocument(a)!==J(this))return false;var g=a.parentNode,q=l.getNodeIndex(a);B(g,"NOT_FOUND_ERR");
var G=l.comparePoints(g,q,this.endContainer,this.endOffset);g=l.comparePoints(g,q+1,this.startContainer,this.startOffset);return e?G<=0&&g>=0:G<0&&g>0},isPointInRange:function(a,e){F(this);B(a,"HIERARCHY_REQUEST_ERR");u(a,this.startContainer);return l.comparePoints(a,e,this.startContainer,this.startOffset)>=0&&l.comparePoints(a,e,this.endContainer,this.endOffset)<=0},intersectsRange:function(a,e){F(this);if(J(a)!=J(this))throw new Q("WRONG_DOCUMENT_ERR");var g=l.comparePoints(this.startContainer,
this.startOffset,a.endContainer,a.endOffset),q=l.comparePoints(this.endContainer,this.endOffset,a.startContainer,a.startOffset);return e?g<=0&&q>=0:g<0&&q>0},intersection:function(a){if(this.intersectsRange(a)){var e=l.comparePoints(this.startContainer,this.startOffset,a.startContainer,a.startOffset),g=l.comparePoints(this.endContainer,this.endOffset,a.endContainer,a.endOffset),q=this.cloneRange();e==-1&&q.setStart(a.startContainer,a.startOffset);g==1&&q.setEnd(a.endContainer,a.endOffset);return q}return null},
union:function(a){if(this.intersectsRange(a,true)){var e=this.cloneRange();l.comparePoints(a.startContainer,a.startOffset,this.startContainer,this.startOffset)==-1&&e.setStart(a.startContainer,a.startOffset);l.comparePoints(a.endContainer,a.endOffset,this.endContainer,this.endOffset)==1&&e.setEnd(a.endContainer,a.endOffset);return e}else throw new v("Ranges do not intersect");},containsNode:function(a,e){return e?this.intersectsNode(a,false):this.compareNode(a)==ja},containsNodeContents:function(a){return this.comparePoint(a,
0)>=0&&this.comparePoint(a,l.getNodeLength(a))<=0},containsRange:function(a){return this.intersection(a).equals(a)},containsNodeText:function(a){var e=this.cloneRange();e.selectNode(a);var g=e.getNodes([3]);if(g.length>0){e.setStart(g[0],0);a=g.pop();e.setEnd(a,a.length);a=this.containsRange(e);e.detach();return a}else return this.containsNodeContents(a)},createNodeIterator:function(a,e){F(this);return new c(this,a,e)},getNodes:function(a,e){F(this);return y(this,a,e)},getDocument:function(){return J(this)},
collapseBefore:function(a){r(this);this.setEndBefore(a);this.collapse(false)},collapseAfter:function(a){r(this);this.setStartAfter(a);this.collapse(true)},getName:function(){return"DomRange"},equals:function(a){return T.rangesEqual(this,a)},inspect:function(){return A(this)}};ca(T,da,function(a){r(a);a.startContainer=a.startOffset=a.endContainer=a.endOffset=null;a.collapsed=a.commonAncestorContainer=null;K(a,"detach",null);a._listeners=null});k.rangePrototype=W.prototype;T.rangeProperties=H;T.RangeIterator=
p;T.copyComparisonConstants=$;T.createPrototypeRange=ca;T.inspect=A;T.getRangeDocument=J;T.rangesEqual=function(a,e){return a.startContainer===e.startContainer&&a.startOffset===e.startOffset&&a.endContainer===e.endContainer&&a.endOffset===e.endOffset};k.DomRange=T;k.RangeException=v});
rangy.createModule("WrappedRange",function(k){function L(h,n,s,y){var A=h.duplicate();A.collapse(s);var p=A.parentElement();z.isAncestorOf(n,p,true)||(p=n);if(!p.canHaveHTML)return new C(p.parentNode,z.getNodeIndex(p));n=z.getDocument(p).createElement("span");var v,c=s?"StartToStart":"StartToEnd";do{p.insertBefore(n,n.previousSibling);A.moveToElementText(n)}while((v=A.compareEndPoints(c,h))>0&&n.previousSibling);c=n.nextSibling;if(v==-1&&c&&z.isCharacterDataNode(c)){A.setEndPoint(s?"EndToStart":"EndToEnd",
h);if(/[\r\n]/.test(c.data)){p=A.duplicate();s=p.text.replace(/\r\n/g,"\r").length;for(s=p.moveStart("character",s);p.compareEndPoints("StartToEnd",p)==-1;){s++;p.moveStart("character",1)}}else s=A.text.length;p=new C(c,s)}else{c=(y||!s)&&n.previousSibling;p=(s=(y||s)&&n.nextSibling)&&z.isCharacterDataNode(s)?new C(s,0):c&&z.isCharacterDataNode(c)?new C(c,c.length):new C(p,z.getNodeIndex(n))}n.parentNode.removeChild(n);return p}function J(h,n){var s,y,A=h.offset,p=z.getDocument(h.node),v=p.body.createTextRange(),
c=z.isCharacterDataNode(h.node);if(c){s=h.node;y=s.parentNode}else{s=h.node.childNodes;s=A<s.length?s[A]:null;y=h.node}p=p.createElement("span");p.innerHTML="&#feff;";s?y.insertBefore(p,s):y.appendChild(p);v.moveToElementText(p);v.collapse(!n);y.removeChild(p);if(c)v[n?"moveStart":"moveEnd"]("character",A);return v}k.requireModules(["DomUtil","DomRange"]);var K,z=k.dom,C=z.DomPosition,N=k.DomRange;if(k.features.implementsDomRange&&(!k.features.implementsTextRange||!k.config.preferTextRange)){(function(){function h(f){for(var j=
s.length,r;j--;){r=s[j];f[r]=f.nativeRange[r]}}var n,s=N.rangeProperties,y,A;K=function(f){if(!f)throw Error("Range must be specified");this.nativeRange=f;h(this)};N.createPrototypeRange(K,function(f,j,r,M,o){var u=f.endContainer!==M||f.endOffset!=o;if(f.startContainer!==j||f.startOffset!=r||u){f.setEnd(M,o);f.setStart(j,r)}},function(f){f.nativeRange.detach();f.detached=true;for(var j=s.length,r;j--;){r=s[j];f[r]=null}});n=K.prototype;n.selectNode=function(f){this.nativeRange.selectNode(f);h(this)};
n.deleteContents=function(){this.nativeRange.deleteContents();h(this)};n.extractContents=function(){var f=this.nativeRange.extractContents();h(this);return f};n.cloneContents=function(){return this.nativeRange.cloneContents()};n.surroundContents=function(f){this.nativeRange.surroundContents(f);h(this)};n.collapse=function(f){this.nativeRange.collapse(f);h(this)};n.cloneRange=function(){return new K(this.nativeRange.cloneRange())};n.refresh=function(){h(this)};n.toString=function(){return this.nativeRange.toString()};
var p=document.createTextNode("test");z.getBody(document).appendChild(p);var v=document.createRange();v.setStart(p,0);v.setEnd(p,0);try{v.setStart(p,1);y=true;n.setStart=function(f,j){this.nativeRange.setStart(f,j);h(this)};n.setEnd=function(f,j){this.nativeRange.setEnd(f,j);h(this)};A=function(f){return function(j){this.nativeRange[f](j);h(this)}}}catch(c){y=false;n.setStart=function(f,j){try{this.nativeRange.setStart(f,j)}catch(r){this.nativeRange.setEnd(f,j);this.nativeRange.setStart(f,j)}h(this)};
n.setEnd=function(f,j){try{this.nativeRange.setEnd(f,j)}catch(r){this.nativeRange.setStart(f,j);this.nativeRange.setEnd(f,j)}h(this)};A=function(f,j){return function(r){try{this.nativeRange[f](r)}catch(M){this.nativeRange[j](r);this.nativeRange[f](r)}h(this)}}}n.setStartBefore=A("setStartBefore","setEndBefore");n.setStartAfter=A("setStartAfter","setEndAfter");n.setEndBefore=A("setEndBefore","setStartBefore");n.setEndAfter=A("setEndAfter","setStartAfter");v.selectNodeContents(p);n.selectNodeContents=
v.startContainer==p&&v.endContainer==p&&v.startOffset==0&&v.endOffset==p.length?function(f){this.nativeRange.selectNodeContents(f);h(this)}:function(f){this.setStart(f,0);this.setEnd(f,N.getEndOffset(f))};v.selectNodeContents(p);v.setEnd(p,3);y=document.createRange();y.selectNodeContents(p);y.setEnd(p,4);y.setStart(p,2);n.compareBoundaryPoints=v.compareBoundaryPoints(v.START_TO_END,y)==-1&v.compareBoundaryPoints(v.END_TO_START,y)==1?function(f,j){j=j.nativeRange||j;if(f==j.START_TO_END)f=j.END_TO_START;
else if(f==j.END_TO_START)f=j.START_TO_END;return this.nativeRange.compareBoundaryPoints(f,j)}:function(f,j){return this.nativeRange.compareBoundaryPoints(f,j.nativeRange||j)};z.getBody(document).removeChild(p);v.detach();y.detach()})();k.createNativeRange=function(h){h=h||document;return h.createRange()}}else if(k.features.implementsTextRange){K=function(h){this.textRange=h;this.refresh()};K.prototype=new N(document);K.prototype.refresh=function(){var h,n,s=this.textRange;h=s.parentElement();var y=
s.duplicate();y.collapse(true);n=y.parentElement();y=s.duplicate();y.collapse(false);s=y.parentElement();n=n==s?n:z.getCommonAncestor(n,s);n=n==h?n:z.getCommonAncestor(h,n);if(this.textRange.compareEndPoints("StartToEnd",this.textRange)==0)n=h=L(this.textRange,n,true,true);else{h=L(this.textRange,n,true,false);n=L(this.textRange,n,false,false)}this.setStart(h.node,h.offset);this.setEnd(n.node,n.offset)};N.copyComparisonConstants(K);var P=function(){return this}();if(typeof P.Range=="undefined")P.Range=
K;k.createNativeRange=function(h){h=h||document;return h.body.createTextRange()}}if(k.features.implementsTextRange)K.rangeToTextRange=function(h){if(h.collapsed)return J(new C(h.startContainer,h.startOffset),true);else{var n=J(new C(h.startContainer,h.startOffset),true),s=J(new C(h.endContainer,h.endOffset),false);h=z.getDocument(h.startContainer).body.createTextRange();h.setEndPoint("StartToStart",n);h.setEndPoint("EndToEnd",s);return h}};K.prototype.getName=function(){return"WrappedRange"};k.WrappedRange=
K;k.createRange=function(h){h=h||document;return new K(k.createNativeRange(h))};k.createRangyRange=function(h){h=h||document;return new N(h)};k.createIframeRange=function(h){return k.createRange(z.getIframeDocument(h))};k.createIframeRangyRange=function(h){return k.createRangyRange(z.getIframeDocument(h))};k.addCreateMissingNativeApiListener(function(h){h=h.document;if(typeof h.createRange=="undefined")h.createRange=function(){return k.createRange(this)};h=h=null})});
rangy.createModule("WrappedSelection",function(k,L){function J(b){return(b||window).getSelection()}function K(b){return(b||window).document.selection}function z(b,d,i){var E=i?"end":"start";i=i?"start":"end";b.anchorNode=d[E+"Container"];b.anchorOffset=d[E+"Offset"];b.focusNode=d[i+"Container"];b.focusOffset=d[i+"Offset"]}function C(b){b.anchorNode=b.focusNode=null;b.anchorOffset=b.focusOffset=0;b.rangeCount=0;b.isCollapsed=true;b._ranges.length=0}function N(b){var d;if(b instanceof j){d=b._selectionNativeRange;
if(!d){d=k.createNativeRange(c.getDocument(b.startContainer));d.setEnd(b.endContainer,b.endOffset);d.setStart(b.startContainer,b.startOffset);b._selectionNativeRange=d;b.attachListener("detach",function(){this._selectionNativeRange=null})}}else if(b instanceof r)d=b.nativeRange;else if(k.features.implementsDomRange&&b instanceof c.getWindow(b.startContainer).Range)d=b;return d}function P(b){var d=b.getNodes(),i;a:if(!d.length||d[0].nodeType!=1)i=false;else{i=1;for(var E=d.length;i<E;++i)if(!c.isAncestorOf(d[0],
d[i])){i=false;break a}i=true}if(!i)throw Error("getSingleElementFromRange: range "+b.inspect()+" did not consist of a single element");return d[0]}function h(b,d){var i=new r(d);b._ranges=[i];z(b,i,false);b.rangeCount=1;b.isCollapsed=i.collapsed}function n(b){b._ranges.length=0;if(b.docSelection.type=="None")C(b);else{var d=b.docSelection.createRange();if(d&&typeof d.text!="undefined")h(b,d);else{b.rangeCount=d.length;for(var i,E=c.getDocument(d.item(0)),H=0;H<b.rangeCount;++H){i=k.createRange(E);
i.selectNode(d.item(H));b._ranges.push(i)}b.isCollapsed=b.rangeCount==1&&b._ranges[0].collapsed;z(b,b._ranges[b.rangeCount-1],false)}}}function s(b,d){var i=b.docSelection.createRange(),E=P(d),H=c.getDocument(i.item(0));H=c.getBody(H).createControlRange();for(var O=0,Z=i.length;O<Z;++O)H.add(i.item(O));try{H.add(E)}catch(ka){throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");}H.select();n(b)}function y(b,d,i){this.nativeSelection=
b;this.docSelection=d;this._ranges=[];this.win=i;this.refresh()}function A(b,d){var i=c.getDocument(d[0].startContainer);i=c.getBody(i).createControlRange();for(var E=0,H;E<rangeCount;++E){H=P(d[E]);try{i.add(H)}catch(O){throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");}}i.select();n(b)}function p(b,d){if(b.anchorNode&&c.getDocument(b.anchorNode)!==c.getDocument(d))throw new M("WRONG_DOCUMENT_ERR");}function v(b){var d=
[],i=new o(b.anchorNode,b.anchorOffset),E=new o(b.focusNode,b.focusOffset),H=typeof b.getName=="function"?b.getName():"Selection";if(typeof b.rangeCount!="undefined")for(var O=0,Z=b.rangeCount;O<Z;++O)d[O]=j.inspect(b.getRangeAt(O));return"["+H+"(Ranges: "+d.join(", ")+")(anchor: "+i.inspect()+", focus: "+E.inspect()+"]"}k.requireModules(["DomUtil","DomRange","WrappedRange"]);k.config.checkSelectionRanges=true;var c=k.dom,f=k.util,j=k.DomRange,r=k.WrappedRange,M=k.DOMException,o=c.DomPosition,u,x,
B=k.util.isHostMethod(window,"getSelection"),F=k.util.isHostObject(document,"selection"),W=F&&(!B||k.config.preferTextRange);if(W){u=K;k.isSelectionValid=function(b){b=(b||window).document;var d=b.selection;return d.type!="None"||c.getDocument(d.createRange().parentElement())==b}}else if(B){u=J;k.isSelectionValid=function(){return true}}else L.fail("Neither document.selection or window.getSelection() detected.");k.getNativeSelection=u;B=u();var ea=k.createNativeRange(document),$=c.getBody(document),
X=f.areHostObjects(B,f.areHostProperties(B,["anchorOffset","focusOffset"]));k.features.selectionHasAnchorAndFocus=X;var ca=f.isHostMethod(B,"extend");k.features.selectionHasExtend=ca;var ha=typeof B.rangeCount=="number";k.features.selectionHasRangeCount=ha;var da=false,T=true;f.areHostMethods(B,["addRange","getRangeAt","removeAllRanges"])&&typeof B.rangeCount=="number"&&k.features.implementsDomRange&&function(){var b=document.createElement("iframe");$.appendChild(b);var d=c.getIframeDocument(b);d.open();
d.write("<html><head></head><body>12</body></html>");d.close();var i=c.getIframeWindow(b).getSelection(),E=d.documentElement.lastChild.firstChild;d=d.createRange();d.setStart(E,1);d.collapse(true);i.addRange(d);T=i.rangeCount==1;i.removeAllRanges();var H=d.cloneRange();d.setStart(E,0);H.setEnd(E,2);i.addRange(d);i.addRange(H);da=i.rangeCount==2;d.detach();H.detach();$.removeChild(b)}();k.features.selectionSupportsMultipleRanges=da;k.features.collapsedNonEditableSelectionsSupported=T;var l=false,D;
if($&&f.isHostMethod($,"createControlRange")){D=$.createControlRange();if(f.areHostProperties(D,["item","add"]))l=true}k.features.implementsControlRange=l;x=X?function(b){return b.anchorNode===b.focusNode&&b.anchorOffset===b.focusOffset}:function(b){return b.rangeCount?b.getRangeAt(b.rangeCount-1).collapsed:false};var Q;if(f.isHostMethod(B,"getRangeAt"))Q=function(b,d){try{return b.getRangeAt(d)}catch(i){return null}};else if(X)Q=function(b){var d=c.getDocument(b.anchorNode);d=k.createRange(d);d.setStart(b.anchorNode,
b.anchorOffset);d.setEnd(b.focusNode,b.focusOffset);if(d.collapsed!==this.isCollapsed){d.setStart(b.focusNode,b.focusOffset);d.setEnd(b.anchorNode,b.anchorOffset)}return d};k.getSelection=function(b){b=b||window;var d=b._rangySelection,i=u(b),E=F?K(b):null;if(d){d.nativeSelection=i;d.docSelection=E;d.refresh(b)}else{d=new y(i,E,b);b._rangySelection=d}return d};k.getIframeSelection=function(b){return k.getSelection(c.getIframeWindow(b))};D=y.prototype;if(!W&&X&&f.areHostMethods(B,["removeAllRanges",
"addRange"])){D.removeAllRanges=function(){this.nativeSelection.removeAllRanges();C(this)};var fa=function(b,d){var i=j.getRangeDocument(d);i=k.createRange(i);i.collapseToPoint(d.endContainer,d.endOffset);b.nativeSelection.addRange(N(i));b.nativeSelection.extend(d.startContainer,d.startOffset);b.refresh()};D.addRange=ha?function(b,d){if(l&&F&&this.docSelection.type=="Control")s(this,b);else if(d&&ca)fa(this,b);else{var i;if(da)i=this.rangeCount;else{this.removeAllRanges();i=0}this.nativeSelection.addRange(N(b));
this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==i+1){if(k.config.checkSelectionRanges)if((i=Q(this.nativeSelection,this.rangeCount-1))&&!j.rangesEqual(i,b))b=new r(i);this._ranges[this.rangeCount-1]=b;z(this,b,aa(this.nativeSelection));this.isCollapsed=x(this)}else this.refresh()}}:function(b,d){if(d&&ca)fa(this,b);else{this.nativeSelection.addRange(N(b));this.refresh()}};D.setRanges=function(b){if(l&&b.length>1)A(this,b);else{this.removeAllRanges();for(var d=0,i=b.length;d<i;++d)this.addRange(b[d])}}}else if(f.isHostMethod(B,
"empty")&&f.isHostMethod(ea,"select")&&l&&W){D.removeAllRanges=function(){try{this.docSelection.empty();if(this.docSelection.type!="None"){var b;if(this.anchorNode)b=c.getDocument(this.anchorNode);else if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();if(d.length)b=c.getDocument(d.item(0)).body.createTextRange()}if(b){b.body.createTextRange().select();this.docSelection.empty()}}}catch(i){}C(this)};D.addRange=function(b){if(this.docSelection.type=="Control")s(this,b);else{r.rangeToTextRange(b).select();
this._ranges[0]=b;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;z(this,b,false)}};D.setRanges=function(b){this.removeAllRanges();var d=b.length;if(d>1)A(this,b);else d&&this.addRange(b[0])}}else{L.fail("No means of selecting a Range or TextRange was found");return false}D.getRangeAt=function(b){if(b<0||b>=this.rangeCount)throw new M("INDEX_SIZE_ERR");else return this._ranges[b]};var Y;if(W)Y=function(b){var d;if(k.isSelectionValid(b.win))d=b.docSelection.createRange();else{d=c.getBody(b.win.document).createTextRange();
d.collapse(true)}if(b.docSelection.type=="Control")n(b);else d&&typeof d.text!="undefined"?h(b,d):C(b)};else if(f.isHostMethod(B,"getRangeAt")&&typeof B.rangeCount=="number")Y=function(b){if(l&&F&&b.docSelection.type=="Control")n(b);else{b._ranges.length=b.rangeCount=b.nativeSelection.rangeCount;if(b.rangeCount){for(var d=0,i=b.rangeCount;d<i;++d)b._ranges[d]=new k.WrappedRange(b.nativeSelection.getRangeAt(d));z(b,b._ranges[b.rangeCount-1],aa(b.nativeSelection));b.isCollapsed=x(b)}else C(b)}};else if(X&&
typeof B.isCollapsed=="boolean"&&typeof ea.collapsed=="boolean"&&k.features.implementsDomRange)Y=function(b){var d;d=b.nativeSelection;if(d.anchorNode){d=Q(d,0);b._ranges=[d];b.rangeCount=1;d=b.nativeSelection;b.anchorNode=d.anchorNode;b.anchorOffset=d.anchorOffset;b.focusNode=d.focusNode;b.focusOffset=d.focusOffset;b.isCollapsed=x(b)}else C(b)};else{L.fail("No means of obtaining a Range or TextRange from the user's selection was found");return false}D.refresh=function(b){var d=b?this._ranges.slice(0):
null;Y(this);if(b){b=d.length;if(b!=this._ranges.length)return false;for(;b--;)if(!j.rangesEqual(d[b],this._ranges[b]))return false;return true}};var ia=function(b,d){var i=b.getAllRanges(),E=false;b.removeAllRanges();for(var H=0,O=i.length;H<O;++H)if(E||d!==i[H])b.addRange(i[H]);else E=true;b.rangeCount||C(b)};D.removeRange=l?function(b){if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();b=P(b);var i=c.getDocument(d.item(0));i=c.getBody(i).createControlRange();for(var E,
H=false,O=0,Z=d.length;O<Z;++O){E=d.item(O);if(E!==b||H)i.add(d.item(O));else H=true}i.select();n(this)}else ia(this,b)}:function(b){ia(this,b)};var aa;if(!W&&X&&k.features.implementsDomRange){aa=function(b){var d=false;if(b.anchorNode)d=c.comparePoints(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset)==1;return d};D.isBackwards=function(){return aa(this)}}else aa=D.isBackwards=function(){return false};D.toString=function(){for(var b=[],d=0,i=this.rangeCount;d<i;++d)b[d]=""+this._ranges[d];return b.join("")};
D.collapse=function(b,d){p(this,b);var i=k.createRange(c.getDocument(b));i.collapseToPoint(b,d);this.removeAllRanges();this.addRange(i);this.isCollapsed=true};D.collapseToStart=function(){if(this.rangeCount){var b=this._ranges[0];this.collapse(b.startContainer,b.startOffset)}else throw new M("INVALID_STATE_ERR");};D.collapseToEnd=function(){if(this.rangeCount){var b=this._ranges[this.rangeCount-1];this.collapse(b.endContainer,b.endOffset)}else throw new M("INVALID_STATE_ERR");};D.selectAllChildren=
function(b){p(this,b);var d=k.createRange(c.getDocument(b));d.selectNodeContents(b);this.removeAllRanges();this.addRange(d)};D.deleteFromDocument=function(){if(l&&F&&this.docSelection.type=="Control"){for(var b=this.docSelection.createRange(),d;b.length;){d=b.item(0);b.remove(d);d.parentNode.removeChild(d)}this.refresh()}else if(this.rangeCount){b=this.getAllRanges();this.removeAllRanges();d=0;for(var i=b.length;d<i;++d)b[d].deleteContents();this.addRange(b[i-1])}};D.getAllRanges=function(){return this._ranges.slice(0)};
D.setSingleRange=function(b){this.setRanges([b])};D.containsNode=function(b,d){for(var i=0,E=this._ranges.length;i<E;++i)if(this._ranges[i].containsNode(b,d))return true;return false};D.toHtml=function(){var b="";if(this.rangeCount){b=j.getRangeDocument(this._ranges[0]).createElement("div");for(var d=0,i=this._ranges.length;d<i;++d)b.appendChild(this._ranges[d].cloneContents());b=b.innerHTML}return b};D.getName=function(){return"WrappedSelection"};D.inspect=function(){return v(this)};D.detach=function(){this.win=
this.anchorNode=this.focusNode=this.win._rangySelection=null};y.inspect=v;k.Selection=y;k.selectionPrototype=D;k.addCreateMissingNativeApiListener(function(b){if(typeof b.getSelection=="undefined")b.getSelection=function(){return k.getSelection(this)};b=null})});


/****************************************************************************************************************************************************************

Rangy CSS Class Applier

****************************************************************************************************************************************************************/

/*
 CSS Class Applier module for Rangy.
 Adds, removes and toggles CSS classes on Ranges and Selections

 Part of Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Depends on Rangy core.

 Copyright 2011, Tim Down
 Licensed under the MIT license.
 Version: 1.2
 Build date: 22 August 2011
*/
rangy.createModule("CssClassApplier",function(i,r){function s(a,b){return a.className&&RegExp("(?:^|\\s)"+b+"(?:\\s|$)").test(a.className)}function t(a,b){if(a.className)s(a,b)||(a.className+=" "+b);else a.className=b}function o(a){return a.split(/\s+/).sort().join(" ")}function w(a,b){return o(a.className)==o(b.className)}function x(a){for(var b=a.parentNode;a.hasChildNodes();)b.insertBefore(a.firstChild,a);b.removeChild(a)}function y(a,b){var c=a.cloneRange();c.selectNodeContents(b);var d=c.intersection(a);
d=d?d.toString():"";c.detach();return d!=""}function z(a){return a.getNodes([3],function(b){return y(a,b)})}function A(a,b){if(a.attributes.length!=b.attributes.length)return false;for(var c=0,d=a.attributes.length,e,f;c<d;++c){e=a.attributes[c];f=e.name;if(f!="class"){f=b.attributes.getNamedItem(f);if(e.specified!=f.specified)return false;if(e.specified&&e.nodeValue!==f.nodeValue)return false}}return true}function B(a,b){for(var c=0,d=a.attributes.length,e;c<d;++c){e=a.attributes[c].name;if(!(b&&
h.arrayContains(b,e))&&a.attributes[c].specified&&e!="class")return true}return false}function C(a){var b;return a&&a.nodeType==1&&((b=a.parentNode)&&b.nodeType==9&&b.designMode=="on"||k(a)&&!k(a.parentNode))}function D(a){return(k(a)||a.nodeType!=1&&k(a.parentNode))&&!C(a)}function E(a){return a&&a.nodeType==1&&!M.test(p(a,"display"))}function N(a){if(a.data.length==0)return true;if(O.test(a.data))return false;switch(p(a.parentNode,"whiteSpace")){case "pre":case "pre-wrap":case "-moz-pre-wrap":return false;
case "pre-line":if(/[\r\n]/.test(a.data))return false}return E(a.previousSibling)||E(a.nextSibling)}function m(a,b,c,d){var e,f=c==0;if(h.isAncestorOf(b,a))throw r.createError("descendant is ancestor of node");if(h.isCharacterDataNode(b))if(c==0){c=h.getNodeIndex(b);b=b.parentNode}else if(c==b.length){c=h.getNodeIndex(b)+1;b=b.parentNode}else throw r.createError("splitNodeAt should not be called with offset in the middle of a data node ("+c+" in "+b.data);var g;g=b;var j=c;g=h.isCharacterDataNode(g)?
j==0?!!g.previousSibling:j==g.length?!!g.nextSibling:true:j>0&&j<g.childNodes.length;if(g){if(!e){e=b.cloneNode(false);for(e.id&&e.removeAttribute("id");f=b.childNodes[c];)e.appendChild(f);h.insertAfter(e,b)}return b==a?e:m(a,e.parentNode,h.getNodeIndex(e),d)}else if(a!=b){e=b.parentNode;b=h.getNodeIndex(b);f||b++;return m(a,e,b,d)}return a}function F(a){var b=a?"nextSibling":"previousSibling";return function(c,d){var e=c.parentNode,f=c[b];if(f){if(f&&f.nodeType==3)return f}else if(d)if((f=e[b])&&
f.nodeType==1&&e.tagName==f.tagName&&w(e,f)&&A(e,f))return f[a?"firstChild":"lastChild"];return null}}function u(a){this.firstTextNode=(this.isElementMerge=a.nodeType==1)?a.lastChild:a;this.textNodes=[this.firstTextNode]}function q(a,b,c){this.cssClass=a;var d,e,f=null;if(typeof b=="object"&&b!==null){c=b.tagNames;f=b.elementProperties;for(d=0;e=P[d++];)if(b.hasOwnProperty(e))this[e]=b[e];d=b.normalize}else d=b;this.normalize=typeof d=="undefined"?true:d;this.attrExceptions=[];d=document.createElement(this.elementTagName);
this.elementProperties={};for(var g in f)if(f.hasOwnProperty(g)){if(G.hasOwnProperty(g))g=G[g];d[g]=f[g];this.elementProperties[g]=d[g];this.attrExceptions.push(g)}this.elementSortedClassName=this.elementProperties.hasOwnProperty("className")?o(this.elementProperties.className+" "+a):a;this.applyToAnyTagName=false;a=typeof c;if(a=="string")if(c=="*")this.applyToAnyTagName=true;else this.tagNames=c.toLowerCase().replace(/^\s\s*/,"").replace(/\s\s*$/,"").split(/\s*,\s*/);else if(a=="object"&&typeof c.length==
"number"){this.tagNames=[];d=0;for(a=c.length;d<a;++d)if(c[d]=="*")this.applyToAnyTagName=true;else this.tagNames.push(c[d].toLowerCase())}else this.tagNames=[this.elementTagName]}i.requireModules(["WrappedSelection","WrappedRange"]);var h=i.dom,H=function(){function a(b,c,d){return c&&d?" ":""}return function(b,c){if(b.className)b.className=b.className.replace(RegExp("(?:^|\\s)"+c+"(?:\\s|$)"),a)}}(),p;if(typeof window.getComputedStyle!="undefined")p=function(a,b){return h.getWindow(a).getComputedStyle(a,
null)[b]};else if(typeof document.documentElement.currentStyle!="undefined")p=function(a,b){return a.currentStyle[b]};else r.fail("No means of obtaining computed style properties found");var k;(function(){k=typeof document.createElement("div").isContentEditable=="boolean"?function(a){return a&&a.nodeType==1&&a.isContentEditable}:function(a){if(!a||a.nodeType!=1||a.contentEditable=="false")return false;return a.contentEditable=="true"||k(a.parentNode)}})();var M=/^inline(-block|-table)?$/i,O=/[^\r\n\t\f \u200B]/,
Q=F(false),R=F(true);u.prototype={doMerge:function(){for(var a=[],b,c,d=0,e=this.textNodes.length;d<e;++d){b=this.textNodes[d];c=b.parentNode;a[d]=b.data;if(d){c.removeChild(b);c.hasChildNodes()||c.parentNode.removeChild(c)}}return this.firstTextNode.data=a=a.join("")},getLength:function(){for(var a=this.textNodes.length,b=0;a--;)b+=this.textNodes[a].length;return b},toString:function(){for(var a=[],b=0,c=this.textNodes.length;b<c;++b)a[b]="'"+this.textNodes[b].data+"'";return"[Merge("+a.join(",")+
")]"}};var P=["elementTagName","ignoreWhiteSpace","applyToEditableOnly"],G={"class":"className"};q.prototype={elementTagName:"span",elementProperties:{},ignoreWhiteSpace:true,applyToEditableOnly:false,hasClass:function(a){return a.nodeType==1&&h.arrayContains(this.tagNames,a.tagName.toLowerCase())&&s(a,this.cssClass)},getSelfOrAncestorWithClass:function(a){for(;a;){if(this.hasClass(a,this.cssClass))return a;a=a.parentNode}return null},isModifiable:function(a){return!this.applyToEditableOnly||D(a)},
isIgnorableWhiteSpaceNode:function(a){return this.ignoreWhiteSpace&&a&&a.nodeType==3&&N(a)},postApply:function(a,b,c){for(var d=a[0],e=a[a.length-1],f=[],g,j=d,I=e,J=0,K=e.length,n,L,l=0,v=a.length;l<v;++l){n=a[l];if(L=Q(n,!c)){if(!g){g=new u(L);f.push(g)}g.textNodes.push(n);if(n===d){j=g.firstTextNode;J=j.length}if(n===e){I=g.firstTextNode;K=g.getLength()}}else g=null}if(a=R(e,!c)){if(!g){g=new u(e);f.push(g)}g.textNodes.push(a)}if(f.length){l=0;for(v=f.length;l<v;++l)f[l].doMerge();b.setStart(j,
J);b.setEnd(I,K)}},createContainer:function(a){a=a.createElement(this.elementTagName);i.util.extend(a,this.elementProperties);t(a,this.cssClass);return a},applyToTextNode:function(a){var b=a.parentNode;if(b.childNodes.length==1&&h.arrayContains(this.tagNames,b.tagName.toLowerCase()))t(b,this.cssClass);else{b=this.createContainer(h.getDocument(a));a.parentNode.insertBefore(b,a);b.appendChild(a)}},isRemovable:function(a){var b;if(b=a.tagName.toLowerCase()==this.elementTagName){if(b=o(a.className)==
this.elementSortedClassName){var c;a:{b=this.elementProperties;for(c in b)if(b.hasOwnProperty(c)&&a[c]!==b[c]){c=false;break a}c=true}b=c&&!B(a,this.attrExceptions)&&this.isModifiable(a)}b=b}return b},undoToTextNode:function(a,b,c){if(!b.containsNode(c)){a=b.cloneRange();a.selectNode(c);if(a.isPointInRange(b.endContainer,b.endOffset)){m(c,b.endContainer,b.endOffset,[b]);b.setEndAfter(c)}if(a.isPointInRange(b.startContainer,b.startOffset))c=m(c,b.startContainer,b.startOffset,[b])}this.isRemovable(c)?
x(c):H(c,this.cssClass)},applyToRange:function(a){a.splitBoundaries();var b=z(a);if(b.length){for(var c,d=0,e=b.length;d<e;++d){c=b[d];!this.isIgnorableWhiteSpaceNode(c)&&!this.getSelfOrAncestorWithClass(c)&&this.isModifiable(c)&&this.applyToTextNode(c)}a.setStart(b[0],0);c=b[b.length-1];a.setEnd(c,c.length);this.normalize&&this.postApply(b,a,false)}},applyToSelection:function(a){a=a||window;a=i.getSelection(a);var b,c=a.getAllRanges();a.removeAllRanges();for(var d=c.length;d--;){b=c[d];this.applyToRange(b);
a.addRange(b)}},undoToRange:function(a){a.splitBoundaries();var b=z(a),c,d,e=b[b.length-1];if(b.length){for(var f=0,g=b.length;f<g;++f){c=b[f];(d=this.getSelfOrAncestorWithClass(c))&&this.isModifiable(c)&&this.undoToTextNode(c,a,d);a.setStart(b[0],0);a.setEnd(e,e.length)}this.normalize&&this.postApply(b,a,true)}},undoToSelection:function(a){a=a||window;a=i.getSelection(a);var b=a.getAllRanges(),c;a.removeAllRanges();for(var d=0,e=b.length;d<e;++d){c=b[d];this.undoToRange(c);a.addRange(c)}},getTextSelectedByRange:function(a,
b){var c=b.cloneRange();c.selectNodeContents(a);var d=c.intersection(b);d=d?d.toString():"";c.detach();return d},isAppliedToRange:function(a){if(a.collapsed)return!!this.getSelfOrAncestorWithClass(a.commonAncestorContainer);else{for(var b=a.getNodes([3]),c=0,d;d=b[c++];)if(!this.isIgnorableWhiteSpaceNode(d)&&y(a,d)&&this.isModifiable(d)&&!this.getSelfOrAncestorWithClass(d))return false;return true}},isAppliedToSelection:function(a){a=a||window;a=i.getSelection(a).getAllRanges();for(var b=a.length;b--;)if(!this.isAppliedToRange(a[b]))return false;
return true},toggleRange:function(a){this.isAppliedToRange(a)?this.undoToRange(a):this.applyToRange(a)},toggleSelection:function(a){this.isAppliedToSelection(a)?this.undoToSelection(a):this.applyToSelection(a)},detach:function(){}};q.util={hasClass:s,addClass:t,removeClass:H,hasSameClasses:w,replaceWithOwnChildren:x,elementsHaveSameNonClassAttributes:A,elementHasNonClassAttributes:B,splitNodeAt:m,isEditableElement:k,isEditingHost:C,isEditable:D};i.CssClassApplier=q;i.createCssClassApplier=function(a,
b,c){return new q(a,b,c)}});



/****************************************************************************************************************************************************************

Validate (min)

****************************************************************************************************************************************************************/
/**
 * jQuery Validation Plugin 2.0.0pre #ww from github commit aca144b5eba1f1947b311819e9eea8e0f176f448, mininfied w/ jsmin
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2012 JÃ¶rn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){$.extend($.fn,{validate:function(options){if(!this.length){if(options&&options.debug&&window.console){console.warn("nothing selected, can't validate, returning nothing");}
return;}
var validator=$.data(this[0],'validator');if(validator){return validator;}
this.attr('novalidate','novalidate');validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){this.validateDelegate(":submit","click",function(ev){if(validator.settings.submitHandler){validator.submitButton=ev.target;}
if($(ev.target).hasClass('cancel')){validator.cancelSubmit=true;}});this.submit(function(event){if(validator.settings.debug){event.preventDefault();}
function handle(){var hidden;if(validator.settings.submitHandler){if(validator.submitButton){hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}
validator.settings.submitHandler.call(validator,validator.currentForm,event);if(validator.submitButton){hidden.remove();}
return false;}
return true;}
if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}
if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}
return handle();}else{validator.focusInvalid();return false;}});}
return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages){settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);}
break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}
var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}
return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+a.value);},filled:function(a){return!!$.trim(""+a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length===1){return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};}
if(arguments.length>2&&params.constructor!==Array){params=$.makeArray(arguments).slice(1);}
if(params.constructor!==Array){params=[params];}
$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(element,event){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);}
this.addWrapper(this.errorsFor(element)).hide();}},onfocusout:function(element,event){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element,event){if(element.name in this.submitted||element===this.lastElement){this.element(element);}},onclick:function(element,event){if(element.name in this.submitted){this.element(element);}
else if(element.parentNode.name in this.submitted){this.element(element.parentNode);}},highlight:function(element,errorClass,validClass){if(element.type==='radio'){this.findByName(element.name).addClass(errorClass).removeClass(validClass);}else{$(element).addClass(errorClass).removeClass(validClass);}},unhighlight:function(element,errorClass,validClass){if(element.type==='radio'){this.findByName(element.name).removeClass(errorClass).addClass(validClass);}else if(($(element).val()!=null)&&($(element).val()!=$(element).data('hint'))){$(element).removeClass(errorClass).addClass(validClass);}}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");if(validator.settings[eventType]){validator.settings[eventType].call(validator,this[0],event);}}
$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, "+"[type='number'], [type='search'] ,[type='tel'], [type='url'], "+"[type='email'], [type='datetime'], [type='date'], [type='month'], "+"[type='week'], [type='time'], [type='datetime-local'], "+"[type='range'], [type='color'] ","focusin focusout keyup",delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",delegate);if(this.settings.invalidHandler){$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);}},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid()){$(this.currentForm).triggerHandler("invalid-form",[this]);}
this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}
return this.valid();},element:function(element){element=this.validationTargetFor(this.clean(element));this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element)!==false;if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}
if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}
this.showErrors();return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}
this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}
if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList);}else{this.defaultShowErrors();}},resetForm:function(){if($.fn.resetForm){$(this.currentForm).resetForm();}
this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj){count++;}
return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()===0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name===lastActive.name;}).length===1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&validator.settings.debug&&window.console){console.error("%o has no name assigned",this);}
if(this.name in rulesCache||!validator.objectLength($(this).rules())){return false;}
rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){var errorClass=this.settings.errorClass.replace(' ','.');return $(this.settings.errorElement+"."+errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},elementValue:function(element){var type=$(element).attr('type'),val=$(element).val();if(type==='radio'||type==='checkbox'){return $('input[name="'+$(element).attr('name')+'"]:checked').val();}
if(typeof val==='string'){return val.replace(/\r/g,"");}
return val;},check:function(element){element=this.validationTargetFor(this.clean(element));var rules=$(element).rules();var dependencyMismatch=false;var val=this.elementValue(element);var result;for(var method in rules){var rule={method:method,parameters:rules[method]};try{result=$.validator.methods[method].call(this,val,element,rule.parameters);if(result==="dependency-mismatch"){dependencyMismatch=true;continue;}
dependencyMismatch=false;if(result==="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}
if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){if(this.settings.debug&&window.console){console.log("exception occured when checking element "+element.id+", check the '"+rule.method+"' method",e);}
throw e;}}
if(dependencyMismatch){return;}
if(this.objectLength(rules)){this.successList.push(element);}
return true;},customMetaMessage:function(element,method){if(!$.metadata){return;}
var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor===String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined){return arguments[i];}}
return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message==="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=$.validator.format(message.replace(theregex,'{$1}'),rule.parameters);}
this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper){toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));}
return toToggle;},defaultShowErrors:function(){var i,elements;for(i=0;this.errorList[i];i++){var error=this.errorList[i];if(this.settings.highlight){this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);}
this.showLabel(error.element,error.message);}
if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}
if(this.settings.success){for(i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}
if(this.settings.unhighlight){for(i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}
this.toHide=this.toHide.not(this.toShow);/*this.hideErrors();*/this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);if(label.attr("generated")){label.html(message);}}else{label=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}
if(!this.labelContainer.append(label).length){if(this.settings.errorPlacement){this.settings.errorPlacement(label,$(element));}else{label.insertAfter(element);}}}
if(!message&&this.settings.success){label.text("");if(typeof this.settings.success==="string"){label.addClass(this.settings.success);}else{this.settings.success(label);}}
this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr('for')===name;});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},validationTargetFor:function(element){if(this.checkable(element)){element=this.findByName(element.name).not(this.settings.ignore)[0];}
return element;},checkable:function(element){return(/radio|checkbox/i).test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form===form&&element.name===name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element)){return this.findByName(element.name).filter(':checked').length;}}
return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){var val=this.elementValue(element);return!$.validator.methods.required.call(this,val,element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0;}
delete this.pending[element.name];if(valid&&this.pendingRequest===0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest===0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){if(className.constructor===String){this.classRuleSettings[className]=rules;}else{$.extend(this.classRuleSettings,className);}},classRules:function(element){var rules={};var classes=$(element).attr('class');if(classes){$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});}
return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(var method in $.validator.methods){var value;if(method==='required'){value=$element.get(0).getAttribute(method);if(value===""){value=true;}
value=!!value;}else{value=$element.attr(method);}
if(value){rules[method]=value;}else if($element[0].getAttribute("type")===method){rules[method]=true;}}
if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}
return rules;},metadataRules:function(element){if(!$.metadata){return{};}
var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}
return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}
if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}
if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}
if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}
if(rules.messages){delete rules.messages;}
return rules;},normalizeRule:function(data){if(typeof data==="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}
return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!==undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element)){return"dependency-mismatch";}
if(element.nodeName.toLowerCase()==="select"){var val=$(element).val();return val&&val.length>0;}
if(this.checkable(element)){return this.getLength(value,element)>0;}
return $.trim(value).length>0;},remote:function(value,element,param){if(this.optional(element)){return"dependency-mismatch";}
var previous=this.previousValue(element);if(!this.settings.messages[element.name]){this.settings.messages[element.name]={};}
previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param==="string"&&{url:param}||param;if(this.pending[element.name]){return"pending";}
if(previous.old===value){return previous.valid;}
previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};var message=response||validator.defaultMessage(element,"remote");errors[element.name]=previous.message=$.isFunction(message)?message(value):message;validator.showErrors(errors);}
previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";},minlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length>=param;},maxlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length<=param;},rangelength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element)){return"dependency-mismatch";}
if(/[^0-9 \-]+/.test(value)){return false;}
var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9){nDigit-=9;}}
nCheck+=nDigit;bEven=!bEven;}
return(nCheck%10)===0;},accept:function(value,element,param){param=typeof param==="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+param+")$","i"));},equalTo:function(value,element,param){var target=$(param);if(this.settings.onfocusout){target.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});}
return value===target.val();}}});$.format=$.validator.format;}(jQuery));(function($){var pendingRequests={};if($.ajaxPrefilter){$.ajaxPrefilter(function(settings,_,xhr){var port=settings.port;if(settings.mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
pendingRequests[port]=xhr;}});}else{var ajax=$.ajax;$.ajax=function(settings){var mode=("mode"in settings?settings:$.ajaxSettings).mode,port=("port"in settings?settings:$.ajaxSettings).port;if(mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
return(pendingRequests[port]=ajax.apply(this,arguments));}
return ajax.apply(this,arguments);};}}(jQuery));(function($){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){this.addEventListener(original,handler,true);},teardown:function(){this.removeEventListener(original,handler,true);},handler:function(e){var args=arguments;args[0]=$.event.fix(e);args[0].type=fix;return $.event.handle.apply(this,args);}};function handler(e){e=$.event.fix(e);e.type=fix;return $.event.handle.call(this,e);}});}
$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});}});}(jQuery));

/******************************************************************
 *
 * JsTimezoneDetect
 *
 * Original script by Josh Fraser (http://www.onlineaspect.com)
 * Continued and maintained by Jon Nylander at https://bitbucket.org/pellepim/jstimezonedetect
 *
 * Provided under the Do Whatever You Want With This Code License.
 *
 * *****************************************************************/
var jstz=function(){var b=function(a){a=-a.getTimezoneOffset();return a!==null?a:0},d=function(){return b(new Date(2010,0,1,0,0,0,0))},e=function(){return b(new Date(2010,5,1,0,0,0,0))},c=function(){var a=d(),b=e(),f=d()-e();if(f<0)return a+",1";else if(f>0)return b+",1,s";return a+",0"};return{determine_timezone:function(){var a=c();return new jstz.TimeZone(jstz.olson.timezones[a])},date_is_dst:function(a){var c=a.getMonth()>5?e():d(),a=b(a);return c-a!==0}}}();
jstz.TimeZone=function(){var b=null,d=null,e=null,c=function(a){e=a[0];b=a[1];d=a[2];if(typeof jstz.olson.ambiguity_list[b]!=="undefined")for(var a=jstz.olson.ambiguity_list[b],c=a.length,f=0,g=a[0];f<c;f+=1)if(g=a[f],jstz.date_is_dst(jstz.olson.dst_start_dates[g])){b=g;break}};c.prototype={constructor:jstz.TimeZone,name:function(){return b},dst:function(){return d},offset:function(){return e}};return c}();jstz.olson={};
jstz.olson.timezones=function(){return{"-720,0":["-12:00","Etc/GMT+12",!1],"-660,0":["-11:00","Pacific/Pago_Pago",!1],"-600,1":["-11:00","America/Adak",!0],"-660,1,s":["-11:00","Pacific/Apia",!0],"-600,0":["-10:00","Pacific/Honolulu",!1],"-570,0":["-09:30","Pacific/Marquesas",!1],"-540,0":["-09:00","Pacific/Gambier",!1],"-540,1":["-09:00","America/Anchorage",!0],"-480,1":["-08:00","America/Los_Angeles",!0],"-480,0":["-08:00","Pacific/Pitcairn",!1],"-420,0":["-07:00","America/Phoenix",!1],"-420,1":["-07:00",
"America/Denver",!0],"-360,0":["-06:00","America/Guatemala",!1],"-360,1":["-06:00","America/Chicago",!0],"-360,1,s":["-06:00","Pacific/Easter",!0],"-300,0":["-05:00","America/Bogota",!1],"-300,1":["-05:00","America/New_York",!0],"-270,0":["-04:30","America/Caracas",!1],"-240,1":["-04:00","America/Halifax",!0],"-240,0":["-04:00","America/Santo_Domingo",!1],"-240,1,s":["-04:00","America/Asuncion",!0],"-210,1":["-03:30","America/St_Johns",!0],"-180,1":["-03:00","America/Godthab",!0],"-180,0":["-03:00",
"America/Argentina/Buenos_Aires",!1],"-180,1,s":["-03:00","America/Montevideo",!0],"-120,0":["-02:00","America/Noronha",!1],"-120,1":["-02:00","Etc/GMT+2",!0],"-60,1":["-01:00","Atlantic/Azores",!0],"-60,0":["-01:00","Atlantic/Cape_Verde",!1],"0,0":["00:00","Etc/UTC",!1],"0,1":["00:00","Europe/London",!0],"60,1":["+01:00","Europe/Berlin",!0],"60,0":["+01:00","Africa/Lagos",!1],"60,1,s":["+01:00","Africa/Windhoek",!0],"120,1":["+02:00","Asia/Beirut",!0],"120,0":["+02:00","Africa/Johannesburg",!1],
"180,1":["+03:00","Europe/Moscow",!0],"180,0":["+03:00","Asia/Baghdad",!1],"210,1":["+03:30","Asia/Tehran",!0],"240,0":["+04:00","Asia/Dubai",!1],"240,1":["+04:00","Asia/Yerevan",!0],"270,0":["+04:30","Asia/Kabul",!1],"300,1":["+05:00","Asia/Yekaterinburg",!0],"300,0":["+05:00","Asia/Karachi",!1],"330,0":["+05:30","Asia/Kolkata",!1],"345,0":["+05:45","Asia/Kathmandu",!1],"360,0":["+06:00","Asia/Dhaka",!1],"360,1":["+06:00","Asia/Omsk",!0],"390,0":["+06:30","Asia/Rangoon",!1],"420,1":["+07:00","Asia/Krasnoyarsk",
!0],"420,0":["+07:00","Asia/Jakarta",!1],"480,0":["+08:00","Asia/Shanghai",!1],"480,1":["+08:00","Asia/Irkutsk",!0],"525,0":["+08:45","Australia/Eucla",!0],"525,1,s":["+08:45","Australia/Eucla",!0],"540,1":["+09:00","Asia/Yakutsk",!0],"540,0":["+09:00","Asia/Tokyo",!1],"570,0":["+09:30","Australia/Darwin",!1],"570,1,s":["+09:30","Australia/Adelaide",!0],"600,0":["+10:00","Australia/Brisbane",!1],"600,1":["+10:00","Asia/Vladivostok",!0],"600,1,s":["+10:00","Australia/Sydney",!0],"630,1,s":["+10:30",
"Australia/Lord_Howe",!0],"660,1":["+11:00","Asia/Kamchatka",!0],"660,0":["+11:00","Pacific/Noumea",!1],"690,0":["+11:30","Pacific/Norfolk",!1],"720,1,s":["+12:00","Pacific/Auckland",!0],"720,0":["+12:00","Pacific/Tarawa",!1],"765,1,s":["+12:45","Pacific/Chatham",!0],"780,0":["+13:00","Pacific/Tongatapu",!1],"840,0":["+14:00","Pacific/Kiritimati",!1]}}();
jstz.olson.dst_start_dates=function(){return{"America/Denver":new Date(2011,2,13,3,0,0,0),"America/Mazatlan":new Date(2011,3,3,3,0,0,0),"America/Chicago":new Date(2011,2,13,3,0,0,0),"America/Mexico_City":new Date(2011,3,3,3,0,0,0),"Atlantic/Stanley":new Date(2011,8,4,7,0,0,0),"America/Asuncion":new Date(2011,9,2,3,0,0,0),"America/Santiago":new Date(2011,9,9,3,0,0,0),"America/Campo_Grande":new Date(2011,9,16,5,0,0,0),"America/Montevideo":new Date(2011,9,2,3,0,0,0),"America/Sao_Paulo":new Date(2011,
9,16,5,0,0,0),"America/Los_Angeles":new Date(2011,2,13,8,0,0,0),"America/Santa_Isabel":new Date(2011,3,5,8,0,0,0),"America/Havana":new Date(2011,2,13,2,0,0,0),"America/New_York":new Date(2011,2,13,7,0,0,0),"Asia/Gaza":new Date(2011,2,26,23,0,0,0),"Asia/Beirut":new Date(2011,2,27,1,0,0,0),"Europe/Minsk":new Date(2011,2,27,2,0,0,0),"Europe/Helsinki":new Date(2011,2,27,4,0,0,0),"Europe/Istanbul":new Date(2011,2,28,5,0,0,0),"Asia/Damascus":new Date(2011,3,1,2,0,0,0),"Asia/Jerusalem":new Date(2011,3,1,
6,0,0,0),"Africa/Cairo":new Date(2010,3,30,4,0,0,0),"Asia/Yerevan":new Date(2011,2,27,4,0,0,0),"Asia/Baku":new Date(2011,2,27,8,0,0,0),"Pacific/Auckland":new Date(2011,8,26,7,0,0,0),"Pacific/Fiji":new Date(2010,11,29,23,0,0,0),"America/Halifax":new Date(2011,2,13,6,0,0,0),"America/Goose_Bay":new Date(2011,2,13,2,1,0,0),"America/Miquelon":new Date(2011,2,13,5,0,0,0),"America/Godthab":new Date(2011,2,27,1,0,0,0)}}();
jstz.olson.ambiguity_list={"America/Denver":["America/Denver","America/Mazatlan"],"America/Chicago":["America/Chicago","America/Mexico_City"],"America/Asuncion":["Atlantic/Stanley","America/Asuncion","America/Santiago","America/Campo_Grande"],"America/Montevideo":["America/Montevideo","America/Sao_Paulo"],"Asia/Beirut":"Asia/Gaza,Asia/Beirut,Europe/Minsk,Europe/Helsinki,Europe/Istanbul,Asia/Damascus,Asia/Jerusalem,Africa/Cairo".split(","),"Asia/Yerevan":["Asia/Yerevan","Asia/Baku"],"Pacific/Auckland":["Pacific/Auckland",
"Pacific/Fiji"],"America/Los_Angeles":["America/Los_Angeles","America/Santa_Isabel"],"America/New_York":["America/Havana","America/New_York"],"America/Halifax":["America/Goose_Bay","America/Halifax"],"America/Godthab":["America/Miquelon","America/Godthab"]};

/**
 * jquery.Storage 2010-10-06 (min)
 * 
 * @author Dave Schindler
 *
 * Distributed under the MIT License
 *
 * Copyright (c) 2010 Dave Schindler
 */

(function(e){var g=typeof window.localStorage!=="undefined";function h(k,i){var j;if(typeof k==="string"&&typeof i==="string"){localStorage[k]=i;return true}else{if(typeof k==="object"&&typeof i==="undefined"){for(j in k){if(k.hasOwnProperty(j)){localStorage[j]=k[j]}}return true}}return false}function b(m,i){var j,k,l;j=new Date();j.setTime(j.getTime()+31536000000);k="; expires="+j.toGMTString();if(typeof m==="string"&&typeof i==="string"){document.cookie=m+"="+i+k+"; path=/";return true}else{if(typeof m==="object"&&typeof i==="undefined"){for(l in m){if(m.hasOwnProperty(l)){document.cookie=l+"="+m[l]+k+"; path=/"}}return true}}return false}function d(i){return localStorage[i]}function c(o){var m,j,k,l;m=o+"=";j=document.cookie.split(";");for(k=0;k<j.length;k++){l=j[k];while(l.charAt(0)===" "){l=l.substring(1,l.length)}if(l.indexOf(m)===0){return l.substring(m.length,l.length)}}return null}function f(i){return delete localStorage[i]}function a(i){return b(i,"",-1)}e.extend({Storage:{set:g?h:b,get:g?d:c,remove:g?f:a}})})(jQuery);



/****************************************************************************************************************************************************************

colResizable - Customized to allow padding left on cells and make dotted border blue

****************************************************************************************************************************************************************/

//colResizable - by Alvaro Prieto Lauroba - MIT & GPL
(function(a){function h(b){var c=a(this).data(q),d=m[c.t],e=d.g[c.i];e.ox=b.pageX;e.l=e[I]()[H];i[D](E+q,f)[D](F+q,g);P[z](x+"*{cursor:"+d.opt.dragCursor+K+J);e[B](d.opt.draggingClass);l=e;if(d.c[c.i].l)for(b=0;b<d.ln;b++)c=d.c[b],c.l=j,c.w=c[u]();return j}function g(b){i.unbind(E+q).unbind(F+q);a("head :last-child").remove();if(l){l[A](l.t.opt.draggingClass);var f=l.t,g=f.opt.onResize;l.x&&(e(f,l.i,1),d(f),g&&(b[G]=f[0],g(b)));f.p&&O&&c(f);l=k}}function f(a){if(l){var b=l.t,c=a.pageX-l.ox+l.l,f=b.opt.minWidth,g=l.i,h=1.5*b.cs+f+b.b,i=g==b.ln-1?b.w-h:b.g[g+1][I]()[H]-b.cs-f,f=g?b.g[g-1][I]()[H]+b.cs+f:h,c=s.max(f,s.min(i,c));l.x=c;l.css(H,c+p);if(b.opt.liveDrag&&(e(b,g),d(b),c=b.opt.onDrag))a[G]=b[0],c(a)}return j}function e(a,b,c){var d=l.x-l.l,e=a.c[b],f=a.c[b+1],g=e.w+d,d=f.w-d;e[u](g+p);f[u](d+p);a.cg.eq(b)[u](g+p);a.cg.eq(b+1)[u](d+p);if(c)e.w=g,f.w=d}function d(a){a.gc[u](a.w);for(var b=0;b<a.ln;b++){var c=a.c[b];a.g[b].css({left:c.offset().left-a.offset()[H]+c.outerWidth()+a.cs/2+p,height:a.opt.headerOnly?a.c[0].outerHeight():a.outerHeight()})}}function c(a,b){var c,d=0,e=0,f=[];if(b)if(a.cg[C](u),a.opt.flush)O[a.id]="";else{for(c=O[a.id].split(";");e<a.ln;e++)f[y](100*c[e]/c[a.ln]+"%"),b.eq(e).css(u,f[e]);for(e=0;e<a.ln;e++)a.cg.eq(e).css(u,f[e])}else{O[a.id]="";for(e in a.c)c=a.c[e][u](),O[a.id]+=c+";",d+=c;O[a.id]+=d}}function b(b){var e=">thead>tr>",f='"></div>',g=">tbody>tr:first>",i=">tr:first>",j="td",k="th",l=b.find(e+k+","+e+j);l.length||(l=b.find(g+k+","+i+k+","+g+j+","+i+j));b.cg=b.find("col");b.ln=l.length;b.p&&O&&O[b.id]&&c(b,l);l.each(function(c){var d=a(this),e=a(b.gc[z](w+"CRG"+f)[0].lastChild);e.t=b;e.i=c;e.c=d;d.w=d[u]();b.g[y](e);b.c[y](d);d[u](d.w)[C](u);if(c<b.ln-1)e.mousedown(h)[z](b.opt.gripInnerHtml)[z](w+q+'" style="cursor:'+b.opt.hoverCursor+f);else e[B]("CRL")[A]("CRG");e.data(q,{i:c,t:b[v](o)})});b.cg[C](u);d(b);b.find("td, th").not(l).not(N+"th, table td").each(function(){a(this)[C](u)})}var i=a(document),j=!1,k=null,l=k,m=[],n=0,o="id",p="px",q="CRZ",r=parseInt,s=Math,t=a.browser.msie,u="width",v="attr",w='<div class="',x="<style type='text/css'>",y="push",z="append",A="removeClass",B="addClass",C="removeAttr",D="bind",E="mousemove.",F="mouseup.",G="currentTarget",H="left",I="position",J="}</style>",K="!important;",L=":0px"+K,M="resize",N="table",O,P=a("head")[z](x+".CRZ{table-layout:fixed;}.CRZ td,.CRZ th{padding-right"+L+"overflow:hidden}.CRC{height:0px;"+I+":relative;}.CRG{margin-left:-5px;"+I+":absolute;z-index:5;}.CRG .CRZ{"+I+":absolute;background-color:red;filter:alpha(opacity=1);opacity:0;width:10px;height:100%;top:0px}.CRL{"+I+":absolute;width:1px}.CRD{ border-left:1px dotted #169AD8"+J);try{O=sessionStorage}catch(Q){}a(window)[D](M+"."+q,function(){for(a in m){var a=m[a],b,c=0;a[A](q);if(a.w!=a[u]()){a.w=a[u]();for(b=0;b<a.ln;b++)c+=a.c[b].w;for(b=0;b<a.ln;b++)a.c[b].css(u,s.round(1e3*a.c[b].w/c)/10+"%").l=1}d(a[B](q))}});a.fn.extend({colResizable:function(c){c=a.extend({draggingClass:"CRD",gripInnerHtml:"",liveDrag:j,minWidth:15,headerOnly:j,hoverCursor:"e-"+M,dragCursor:"e-"+M,postbackSafe:j,flush:j,marginLeft:k,marginRight:k,disable:j,onDrag:k,onResize:k},c);return this.each(function(){var d=c,e=a(this);if(d.disable){if(e=e[v](o),(d=m[e])&&d.is(N))d[A](q).gc.remove(),delete m[e]}else{var f=e.id=e[v](o)||q+n++;e.p=d.postbackSafe;if(e.is(N)&&!m[f])e[B](q)[v](o,f).before(w+'CRC"/>'),e.opt=d,e.g=[],e.c=[],e.w=e[u](),e.gc=e.prev(),d.marginLeft&&e.gc.css("marginLeft",d.marginLeft),d.marginRight&&e.gc.css("marginRight",d.marginRight),e.cs=r(t?this.cellSpacing||this.currentStyle.borderSpacing:e.css("border-spacing"))||2,e.b=r(t?this.border||this.currentStyle.borderLeftWidth:e.css("border-"+H+"-"+u))||1,m[f]=e,b(e)}})}})})(jQuery)

/****************************************************************************************************************************************************************

 jQuery Cycle Plugin

 ****************************************************************************************************************************************************************/

    /*!
     * jQuery Cycle Plugin (with Transition Definitions)
     * Examples and documentation at: http://jquery.malsup.com/cycle/
     * Copyright (c) 2007-2013 M. Alsup
     * Version: 3.0.3 (11-JUL-2013)
     * Dual licensed under the MIT and GPL licenses.
     * http://jquery.malsup.com/license.html
     * Requires: jQuery v1.7.1 or later
     */
;(function($, undefined) {
    "use strict";

    var ver = '3.0.3';

    function debug(s) {
        if ($.fn.cycle.debug)
            log(s);
    }
    function log() {
        /*global console */
        if (window.console && console.log)
            console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
    }
    $.expr[':'].paused = function(el) {
        return el.cyclePause;
    };


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

    $.fn.cycle = function(options, arg2) {
        var o = { s: this.selector, c: this.context };

        // in 1.3+ we can fix mistakes with the ready state
        if (this.length === 0 && options != 'stop') {
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing slideshow');
                $(function() {
                    $(o.s,o.c).cycle(options,arg2);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        // iterate the matched nodeset
        return this.each(function() {
            var opts = handleArguments(this, options, arg2);
            if (opts === false)
                return;

            opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;

            // stop existing slideshow for this container (if there is one)
            if (this.cycleTimeout)
                clearTimeout(this.cycleTimeout);
            this.cycleTimeout = this.cyclePause = 0;
            this.cycleStop = 0; // issue #108

            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();

            if (els.length < 2) {
                log('terminating; too few slides: ' + els.length);
                return;
            }

            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false)
                return;

            var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

            // if it's an auto slideshow, kick it off
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10)
                    startTime = 10;
                debug('first timeout: ' + startTime);
                this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards);}, startTime);
            }
        });
    };

    function triggerPause(cont, byHover, onPager) {
        var opts = $(cont).data('cycle.opts');
        if (!opts)
            return;
        var paused = !!cont.cyclePause;
        if (paused && opts.paused)
            opts.paused(cont, opts, byHover, onPager);
        else if (!paused && opts.resumed)
            opts.resumed(cont, opts, byHover, onPager);
    }

// process the args that were passed to the plugin fn
    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop === undefined)
            cont.cycleStop = 0;
        if (options === undefined || options === null)
            options = {};
        if (options.constructor == String) {
            switch(options) {
                case 'destroy':
                case 'stop':
                    var opts = $(cont).data('cycle.opts');
                    if (!opts)
                        return false;
                    cont.cycleStop++; // callbacks look for change
                    if (cont.cycleTimeout)
                        clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                    if (opts.elements)
                        $(opts.elements).stop();
                    $(cont).removeData('cycle.opts');
                    if (options == 'destroy')
                        destroy(cont, opts);
                    return false;
                case 'toggle':
                    cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
                    checkInstantResume(cont.cyclePause, arg2, cont);
                    triggerPause(cont);
                    return false;
                case 'pause':
                    cont.cyclePause = 1;
                    triggerPause(cont);
                    return false;
                case 'resume':
                    cont.cyclePause = 0;
                    checkInstantResume(false, arg2, cont);
                    triggerPause(cont);
                    return false;
                case 'prev':
                case 'next':
                    opts = $(cont).data('cycle.opts');
                    if (!opts) {
                        log('options not found, "prev/next" ignored');
                        return false;
                    }
                    if (typeof arg2 == 'string')
                        opts.oneTimeFx = arg2;
                    $.fn.cycle[options](opts);
                    return false;
                default:
                    options = { fx: options };
            }
            return options;
        }
        else if (options.constructor == Number) {
            // go to the requested slide
            var num = options;
            options = $(cont).data('cycle.opts');
            if (!options) {
                log('options not found, can not advance slide');
                return false;
            }
            if (num < 0 || num >= options.elements.length) {
                log('invalid slide index: ' + num);
                return false;
            }
            options.nextSlide = num;
            if (cont.cycleTimeout) {
                clearTimeout(cont.cycleTimeout);
                cont.cycleTimeout = 0;
            }
            if (typeof arg2 == 'string')
                options.oneTimeFx = arg2;
            go(options.elements, options, 1, num >= options.currSlide);
            return false;
        }
        return options;

        function checkInstantResume(isPaused, arg2, cont) {
            if (!isPaused && arg2 === true) { // resume now!
                var options = $(cont).data('cycle.opts');
                if (!options) {
                    log('options not found, can not resume');
                    return false;
                }
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                go(options.elements, options, 1, !options.backwards);
            }
        }
    }

    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try { el.style.removeAttribute('filter'); }
            catch(smother) {} // handle old opera versions
        }
    }

// unbind event handlers
    function destroy(cont, opts) {
        if (opts.next)
            $(opts.next).unbind(opts.prevNextEvent);
        if (opts.prev)
            $(opts.prev).unbind(opts.prevNextEvent);

        if (opts.pager || opts.pagerAnchorBuilder)
            $.each(opts.pagerAnchors || [], function() {
                this.unbind().remove();
            });
        opts.pagerAnchors = null;
        $(cont).unbind('mouseenter.cycle mouseleave.cycle');
        if (opts.destroy) // callback
            opts.destroy(opts);
    }

// one-time initialization
    function buildOptions($cont, $slides, els, options, o) {
        var startingSlideSpecified;
        // support metadata plugin (v1.0 and v2.0)
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
        if (meta)
            opts = $.extend(opts, meta);
        if (opts.autostop)
            opts.countdown = opts.autostopCount || els.length;

        var cont = $cont[0];
        $cont.data('cycle.opts', opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];

        // push some after callbacks
        if (!$.support.opacity && opts.cleartype)
            opts.after.push(function() { removeFilter(this, opts); });
        if (opts.continuous)
            opts.after.push(function() { go(els,opts,0,!opts.backwards); });

        saveOriginalOpts(opts);

        // clearType corrections
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
            clearTypeFix($slides);

        // container requires non-static position so that slides can be position within
        if ($cont.css('position') == 'static')
            $cont.css('position', 'relative');
        if (opts.width)
            $cont.width(opts.width);
        if (opts.height && opts.height != 'auto')
            $cont.height(opts.height);

        if (opts.startingSlide !== undefined) {
            opts.startingSlide = parseInt(opts.startingSlide,10);
            if (opts.startingSlide >= els.length || opts.startSlide < 0)
                opts.startingSlide = 0; // catch bogus input
            else
                startingSlideSpecified = true;
        }
        else if (opts.backwards)
            opts.startingSlide = els.length - 1;
        else
            opts.startingSlide = 0;

        // if random, mix up the slide array
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++)
                opts.randomMap.push(i);
            opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
            if (startingSlideSpecified) {
                // try to find the specified starting slide and if found set start slide index in the map accordingly
                for ( var cnt = 0; cnt < els.length; cnt++ ) {
                    if ( opts.startingSlide == opts.randomMap[cnt] ) {
                        opts.randomIndex = cnt;
                    }
                }
            }
            else {
                opts.randomIndex = 1;
                opts.startingSlide = opts.randomMap[1];
            }
        }
        else if (opts.startingSlide >= els.length)
            opts.startingSlide = 0; // catch bogus input
        opts.currSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;

        // set position and zIndex on all the slides
        $slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
            var z;
            if (opts.backwards)
                z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
            else
                z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
            $(this).css('z-index', z);
        });

        // make sure first slide is visible
        $(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
        removeFilter(els[first], opts);

        // stretch slides
        if (opts.fit) {
            if (!opts.aspect) {
                if (opts.width)
                    $slides.width(opts.width);
                if (opts.height && opts.height != 'auto')
                    $slides.height(opts.height);
            } else {
                $slides.each(function(){
                    var $slide = $(this);
                    var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
                    if( opts.width && $slide.width() != opts.width ) {
                        $slide.width( opts.width );
                        $slide.height( opts.width / ratio );
                    }

                    if( opts.height && $slide.height() < opts.height ) {
                        $slide.height( opts.height );
                        $slide.width( opts.height * ratio );
                    }
                });
            }
        }

        if (opts.center && ((!opts.fit) || opts.aspect)) {
            $slides.each(function(){
                var $slide = $(this);
                $slide.css({
                    "margin-left": opts.width ?
                        ((opts.width - $slide.width()) / 2) + "px" :
                        0,
                    "margin-top": opts.height ?
                        ((opts.height - $slide.height()) / 2) + "px" :
                        0
                });
            });
        }

        if (opts.center && !opts.fit && !opts.slideResize) {
            $slides.each(function(){
                var $slide = $(this);
                $slide.css({
                    "margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
                    "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
                });
            });
        }

        // stretch container
        var reshape = (opts.containerResize || opts.containerResizeHeight) && $cont.innerHeight() < 1;
        if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
            var maxw = 0, maxh = 0;
            for(var j=0; j < els.length; j++) {
                var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
                if (!w) w = e.offsetWidth || e.width || $e.attr('width');
                if (!h) h = e.offsetHeight || e.height || $e.attr('height');
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh;
            }
            if (opts.containerResize && maxw > 0 && maxh > 0)
                $cont.css({width:maxw+'px',height:maxh+'px'});
            if (opts.containerResizeHeight && maxh > 0)
                $cont.css({height:maxh+'px'});
        }

        var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
        if (opts.pause)
            $cont.bind('mouseenter.cycle', function(){
                pauseFlag = true;
                this.cyclePause++;
                triggerPause(cont, true);
            }).bind('mouseleave.cycle', function(){
                    if (pauseFlag)
                        this.cyclePause--;
                    triggerPause(cont, true);
                });

        if (supportMultiTransitions(opts) === false)
            return false;

        // apparently a lot of people use image slideshows without height/width attributes on the images.
        // Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function() {
            // try to get height/width of each slide
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
            this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

            if ( $el.is('img') ) {
                var loading = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
                // don't requeue for images that are still loading but have a valid size
                if (loading) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
                        log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
                        setTimeout(function() {$(o.s,o.c).cycle(options);}, opts.requeueTimeout);
                        requeue = true;
                        return false; // break each loop
                    }
                    else {
                        log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });

        if (requeue)
            return false;

        opts.cssBefore = opts.cssBefore || {};
        opts.cssAfter = opts.cssAfter || {};
        opts.cssFirst = opts.cssFirst || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};

        $slides.not(':eq('+first+')').css(opts.cssBefore);
        $($slides[first]).css(opts.cssFirst);

        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout,10);
            // ensure that timeout and speed settings are sane
            if (opts.speed.constructor == String)
                opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
            if (!opts.sync)
                opts.speed = opts.speed / 2;

            var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
            while((opts.timeout - opts.speed) < buffer) // sanitize timeout
                opts.timeout += opts.speed;
        }
        if (opts.easing)
            opts.easeIn = opts.easeOut = opts.easing;
        if (!opts.speedIn)
            opts.speedIn = opts.speed;
        if (!opts.speedOut)
            opts.speedOut = opts.speed;

        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            if (++opts.randomIndex == els.length)
                opts.randomIndex = 0;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else if (opts.backwards)
            opts.nextSlide = opts.startingSlide === 0 ? (els.length-1) : opts.startingSlide-1;
        else
            opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

        // run transition init fn
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init))
                init($cont, $slides, opts);
            else if (opts.fx != 'custom' && !opts.multiFx) {
                log('unknown transition: ' + opts.fx,'; slideshow terminating');
                return false;
            }
        }

        // fire artificial events
        var e0 = $slides[first];
        if (!opts.skipInitializationCallbacks) {
            if (opts.before.length)
                opts.before[0].apply(e0, [e0, e0, opts, true]);
            if (opts.after.length)
                opts.after[0].apply(e0, [e0, e0, opts, true]);
        }
        if (opts.next)
            $(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});
        if (opts.prev)
            $(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});
        if (opts.pager || opts.pagerAnchorBuilder)
            buildPager(els,opts);

        exposeAddSlide(opts, els);

        return opts;
    }

// save off original opts so we can restore after clearing state
    function saveOriginalOpts(opts) {
        opts.original = { before: [], after: [] };
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter  = $.extend({}, opts.cssAfter);
        opts.original.animIn	= $.extend({}, opts.animIn);
        opts.original.animOut   = $.extend({}, opts.animOut);
        $.each(opts.before, function() { opts.original.before.push(this); });
        $.each(opts.after,  function() { opts.original.after.push(this); });
    }

    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        // look for multiple effects
        if (opts.fx.indexOf(',') > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
            // discard any bogus effect names
            for (i=0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log('discarding unknown transition: ',fx);
                    opts.fxs.splice(i,1);
                    i--;
                }
            }
            // if we have an empty list then we threw everything away!
            if (!opts.fxs.length) {
                log('No valid transitions named; slideshow terminating.');
                return false;
            }
        }
        else if (opts.fx == 'all') {  // auto-gen the list of transitions
            opts.multiFx = true;
            opts.fxs = [];
            for (var p in txs) {
                if (txs.hasOwnProperty(p)) {
                    tx = txs[p];
                    if (txs.hasOwnProperty(p) && $.isFunction(tx))
                        opts.fxs.push(p);
                }
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            // munge the fxs array to make effect selection random
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2,1)[0]);
            }
            debug('randomized fx sequence: ',opts.fxs);
        }
        return true;
    }

// provide a mechanism for adding slides after the slideshow has started
    function exposeAddSlide(opts, els) {
        opts.addSlide = function(newSlide, prepend) {
            var $s = $(newSlide), s = $s[0];
            if (!opts.autostopCount)
                opts.countdown++;
            els[prepend?'unshift':'push'](s);
            if (opts.els)
                opts.els[prepend?'unshift':'push'](s); // shuffle needs this
            opts.slideCount = els.length;

            // add the slide to the random map and resort
            if (opts.random) {
                opts.randomMap.push(opts.slideCount-1);
                opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
            }

            $s.css('position','absolute');
            $s[prepend?'prependTo':'appendTo'](opts.$cont);

            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++;
            }

            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
                clearTypeFix($s);

            if (opts.fit && opts.width)
                $s.width(opts.width);
            if (opts.fit && opts.height && opts.height != 'auto')
                $s.height(opts.height);
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

            $s.css(opts.cssBefore);

            if (opts.pager || opts.pagerAnchorBuilder)
                $.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

            if ($.isFunction(opts.onAddSlide))
                opts.onAddSlide($s);
            else
                $s.hide(); // default behavior
        };
    }

// reset internal state; we do this on every pass in order to support multiple effects
    $.fn.cycle.resetState = function(opts, fx) {
        fx = fx || opts.fx;
        opts.before = []; opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter  = $.extend({}, opts.original.cssAfter);
        opts.animIn	= $.extend({}, opts.original.animIn);
        opts.animOut   = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function() { opts.before.push(this); });
        $.each(opts.original.after,  function() { opts.after.push(this); });

        // re-init
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init))
            init(opts.$cont, $(opts.elements), opts);
    };

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
    function go(els, opts, manual, fwd) {
        var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

        // opts.busy is true if we're in the middle of an animation
        if (manual && opts.busy && opts.manualTrump) {
            // let manual transitions requests trump active ones
            debug('manualTrump in go(), stopping active transition');
            $(els).stop(true,true);
            opts.busy = 0;
            clearTimeout(p.cycleTimeout);
        }

        // don't begin another timeout-based transition if there is one active
        if (opts.busy) {
            debug('transition active, ignoring new tx request');
            return;
        }


        // stop cycling if we have an outstanding stop request
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
            return;

        // check to see if we should stop cycling based on autostop options
        if (!manual && !p.cyclePause && !opts.bounce &&
            ((opts.autostop && (--opts.countdown <= 0)) ||
                (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end)
                opts.end(opts);
            return;
        }

        // if slideshow is paused, only transition on a manual trigger
        var changed = false;
        if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
            changed = true;
            var fx = opts.fx;
            // keep trying to get the slide size if we don't have it yet
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();

            // support multiple transition types
            if (opts.multiFx) {
                if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length))
                    opts.lastFx = 0;
                else if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0))
                    opts.lastFx = opts.fxs.length - 1;
                fx = opts.fxs[opts.lastFx];
            }

            // one-time fx overrides apply to:  $('div').cycle(3,'zoom');
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null;
            }

            $.fn.cycle.resetState(opts, fx);

            // run the before callbacks
            if (opts.before.length)
                $.each(opts.before, function(i,o) {
                    if (p.cycleStop != opts.stopCount) return;
                    o.apply(next, [curr, next, opts, fwd]);
                });

            // stage the after callacks
            var after = function() {
                opts.busy = 0;
                $.each(opts.after, function(i,o) {
                    if (p.cycleStop != opts.stopCount) return;
                    o.apply(next, [curr, next, opts, fwd]);
                });
                if (!p.cycleStop) {
                    // queue next transition
                    queueNext();
                }
            };

            debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);

            // get ready to perform the transition
            opts.busy = 1;
            if (opts.fxFn) // fx function provided?
                opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
                $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            else
                $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
        }
        else {
            queueNext();
        }

        if (changed || opts.nextSlide == opts.currSlide) {
            // calculate the next slide
            var roll;
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length) {
                    opts.randomIndex = 0;
                    opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
                }
                opts.nextSlide = opts.randomMap[opts.randomIndex];
                if (opts.nextSlide == opts.currSlide)
                    opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
            }
            else if (opts.backwards) {
                roll = (opts.nextSlide - 1) < 0;
                if (roll && opts.bounce) {
                    opts.backwards = !opts.backwards;
                    opts.nextSlide = 1;
                    opts.currSlide = 0;
                }
                else {
                    opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
                    opts.currSlide = roll ? 0 : opts.nextSlide+1;
                }
            }
            else { // sequence
                roll = (opts.nextSlide + 1) == els.length;
                if (roll && opts.bounce) {
                    opts.backwards = !opts.backwards;
                    opts.nextSlide = els.length-2;
                    opts.currSlide = els.length-1;
                }
                else {
                    opts.nextSlide = roll ? 0 : opts.nextSlide+1;
                    opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
                }
            }
        }
        if (changed && opts.pager)
            opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);

        function queueNext() {
            // stage the next transition
            var ms = 0, timeout = opts.timeout;
            if (opts.timeout && !opts.continuous) {
                ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
                if (opts.fx == 'shuffle')
                    ms -= opts.speedOut;
            }
            else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
                ms = 10;
            if (ms > 0)
                p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards); }, ms);
        }
    }

// invoked after transition
    $.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
        $(pager).each(function() {
            $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
        });
    };

// calculate timeout value for current transition
    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            // call user provided calc fn
            var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
            while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
                t += opts.speed;
            debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
            if (t !== false)
                return t;
        }
        return opts.timeout;
    }

// expose next/prev function, caller must pass in state
    $.fn.cycle.next = function(opts) { advance(opts,1); };
    $.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
    function advance(opts, moveForward) {
        var val = moveForward ? 1 : -1;
        var els = opts.elements;
        var p = opts.$cont[0], timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }
        if (opts.random && val < 0) {
            // move back to the previously display slide
            opts.randomIndex--;
            if (--opts.randomIndex == -2)
                opts.randomIndex = els.length-2;
            else if (opts.randomIndex == -1)
                opts.randomIndex = els.length-1;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else if (opts.random) {
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else {
            opts.nextSlide = opts.currSlide + val;
            if (opts.nextSlide < 0) {
                if (opts.nowrap) return false;
                opts.nextSlide = els.length - 1;
            }
            else if (opts.nextSlide >= els.length) {
                if (opts.nowrap) return false;
                opts.nextSlide = 0;
            }
        }

        var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
        if ($.isFunction(cb))
            cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
        go(els, opts, 1, moveForward);
        return false;
    }

    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function(i,o) {
            $.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
        });
        opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
    }

    $.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder)) {
            a = opts.pagerAnchorBuilder(i,el);
            debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
        }
        else
            a = '<a href="#">'+(i+1)+'</a>';

        if (!a)
            return;
        var $a = $(a);
        // don't reparent if anchor is in the dom
        if ($a.parents('body').length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function() {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone[0]);
                });
                $a = $(arr);
            }
            else {
                $a.appendTo($p);
            }
        }

        opts.pagerAnchors =  opts.pagerAnchors || [];
        opts.pagerAnchors.push($a);

        var pagerFn = function(e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0], timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
            if ($.isFunction(cb))
                cb(opts.nextSlide, els[opts.nextSlide]);
            go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
        };

        if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
            $a.hover(pagerFn, function(){/* no-op */} );
        }
        else {
            $a.bind(opts.pagerEvent, pagerFn);
        }

        if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
            $a.bind('click.cycle', function(){return false;}); // suppress click

        var cont = opts.$cont[0];
        var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
        if (opts.pauseOnPagerHover) {
            $a.hover(
                function() {
                    pauseFlag = true;
                    cont.cyclePause++;
                    triggerPause(cont,true,true);
                }, function() {
                    if (pauseFlag)
                        cont.cyclePause--;
                    triggerPause(cont,true,true);
                }
            );
        }
    };

// helper fn to calculate the number of slides between the current and the next
    $.fn.cycle.hopsFromLast = function(opts, fwd) {
        var hops, l = opts.lastSlide, c = opts.currSlide;
        if (fwd)
            hops = c > l ? c - l : opts.slideCount - l;
        else
            hops = c < l ? l - c : l + opts.slideCount - c;
        return hops;
    };

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
    function clearTypeFix($slides) {
        debug('applying clearType background-color hack');
        function hex(s) {
            s = parseInt(s,10).toString(16);
            return s.length < 2 ? '0'+s : s;
        }
        function getBg(e) {
            for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
                var v = $.css(e,'background-color');
                if (v && v.indexOf('rgb') >= 0 ) {
                    var rgb = v.match(/\d+/g);
                    return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                }
                if (v && v != 'transparent')
                    return v;
            }
            return '#ffffff';
        }
        $slides.each(function() { $(this).css('background-color', getBg(this)); });
    }

// reset common props before the next transition
    $.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
        $(opts.elements).not(curr).hide();
        if (typeof opts.cssBefore.opacity == 'undefined')
            opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        if (opts.slideResize && w !== false && next.cycleW > 0)
            opts.cssBefore.width = next.cycleW;
        if (opts.slideResize && h !== false && next.cycleH > 0)
            opts.cssBefore.height = next.cycleH;
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = 'none';
        $(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
        $(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
    };

// the actual fn for effecting a transition
    $.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
        var $l = $(curr), $n = $(next);
        var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut, animInDelay = opts.animInDelay, animOutDelay = opts.animOutDelay;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == 'number')
                speedIn = speedOut = speedOverride;
            else
                speedIn = speedOut = 1;
            easeIn = easeOut = null;
        }
        var fn = function() {
            $n.delay(animInDelay).animate(opts.animIn, speedIn, easeIn, function() {
                cb();
            });
        };
        $l.delay(animOutDelay).animate(opts.animOut, speedOut, easeOut, function() {
            $l.css(opts.cssAfter);
            if (!opts.sync)
                fn();
        });
        if (opts.sync) fn();
    };

// transition definitions - only fade is defined here, transition pack defines the rest
    $.fn.cycle.transitions = {
        fade: function($cont, $slides, opts) {
            $slides.not(':eq('+opts.currSlide+')').css('opacity',0);
            opts.before.push(function(curr,next,opts) {
                $.fn.cycle.commonReset(curr,next,opts);
                opts.cssBefore.opacity = 0;
            });
            opts.animIn	   = { opacity: 1 };
            opts.animOut   = { opacity: 0 };
            opts.cssBefore = { top: 0, left: 0 };
        }
    };

    $.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
    $.fn.cycle.defaults = {
        activePagerClass: 'activeSlide', // class name used for the active pager link
        after:            null,     // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
        allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
        animIn:           null,     // properties that define how the slide animates in
        animInDelay:      0,        // allows delay before next slide transitions in
        animOut:          null,     // properties that define how the slide animates out
        animOutDelay:     0,        // allows delay before current slide transitions out
        aspect:           false,    // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
        autostop:         0,        // true to end slideshow after X transitions (where X == slide count)
        autostopCount:    0,        // number of transitions (optionally used with autostop to define X)
        backwards:        false,    // true to start slideshow at last slide and move backwards through the stack
        before:           null,     // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
        center:           null,     // set to true to have cycle add top/left margin to each slide (use with width and height options)
        cleartype:        !$.support.opacity,  // true if clearType corrections should be applied (for IE)
        cleartypeNoBg:    false,    // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
        containerResize:  1,        // resize container to fit largest slide
        containerResizeHeight:  0,  // resize containers height to fit the largest slide but leave the width dynamic
        continuous:       0,        // true to start next transition immediately after current one completes
        cssAfter:         null,     // properties that defined the state of the slide after transitioning out
        cssBefore:        null,     // properties that define the initial state of the slide before transitioning in
        delay:            0,        // additional delay (in ms) for first transition (hint: can be negative)
        easeIn:           null,     // easing for "in" transition
        easeOut:          null,     // easing for "out" transition
        easing:           null,     // easing method for both in and out transitions
        end:              null,     // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
        fastOnEvent:      0,        // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
        fit:              0,        // force slides to fit container
        fx:               'fade',   // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
        fxFn:             null,     // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
        height:           'auto',   // container height (if the 'fit' option is true, the slides will be set to this height as well)
        manualTrump:      true,     // causes manual transition to stop an active transition instead of being ignored
        metaAttr:         'cycle',  // data- attribute that holds the option data for the slideshow
        next:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
        nowrap:           0,        // true to prevent slideshow from wrapping
        onPagerEvent:     null,     // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
        onPrevNextEvent:  null,     // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
        pager:            null,     // element, jQuery object, or jQuery selector string for the element to use as pager container
        pagerAnchorBuilder: null,   // callback fn for building anchor links:  function(index, DOMelement)
        pagerEvent:       'click.cycle', // name of event which drives the pager navigation
        pause:            0,        // true to enable "pause on hover"
        pauseOnPagerHover: 0,       // true to pause when hovering over pager link
        prev:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
        prevNextEvent:    'click.cycle',// event which drives the manual transition to the previous or next slide
        random:           0,        // true for random, false for sequence (not applicable to shuffle fx)
        randomizeEffects: 1,        // valid when multiple effects are used; true to make the effect sequence random
        requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
        requeueTimeout:   250,      // ms delay for requeue
        rev:              0,        // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
        shuffle:          null,     // coords for shuffle animation, ex: { top:15, left: 200 }
        skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
        slideExpr:        null,     // expression for selecting slides (if something other than all children is required)
        slideResize:      1,        // force slide width/height to fixed size before every transition
        speed:            1000,     // speed of the transition (any valid fx speed value)
        speedIn:          null,     // speed of the 'in' transition
        speedOut:         null,     // speed of the 'out' transition
        startingSlide:    undefined,// zero-based index of the first slide to be displayed
        sync:             1,        // true if in/out transitions should occur simultaneously
        timeout:          4000,     // milliseconds between slide transitions (0 to disable auto advance)
        timeoutFn:        null,     // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
        updateActivePagerLink: null,// callback fn invoked to update the active pager link (adds/removes activePagerClass style)
        width:            null      // container width (if the 'fit' option is true, the slides will be set to this width as well)
    };

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
    "use strict";

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
    $.fn.cycle.transitions.none = function($cont, $slides, opts) {
        opts.fxFn = function(curr,next,opts,after){
            $(next).show();
            $(curr).hide();
            after();
        };
    };

// not a cross-fade, fadeout only fades out the top slide
    $.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
        $slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
        opts.before.push(function(curr,next,opts,w,h,rev) {
            $(curr).css('zIndex',opts.slideCount + (rev !== true ? 1 : 0));
            $(next).css('zIndex',opts.slideCount + (rev !== true ? 0 : 1));
        });
        opts.animIn.opacity = 1;
        opts.animOut.opacity = 0;
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        opts.cssAfter.zIndex = 0;
    };

// scrollUp/Down/Left/Right
    $.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
        $cont.css('overflow','hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.cssFirst.top = 0;
        opts.animIn.top = 0;
        opts.animOut.top = -h;
    };
    $.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
        $cont.css('overflow','hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssFirst.top = 0;
        opts.cssBefore.top = -h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
    $.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
        $cont.css('overflow','hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = 0-w;
    };
    $.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
        $cont.css('overflow','hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = -w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
        $cont.css('overflow','hidden').width();
        opts.before.push(function(curr, next, opts, fwd) {
            if (opts.rev)
                fwd = !fwd;
            $.fn.cycle.commonReset(curr,next,opts);
            opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
            opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
        });
        opts.cssFirst.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = 0;
    };
    $.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
        $cont.css('overflow','hidden');
        opts.before.push(function(curr, next, opts, fwd) {
            if (opts.rev)
                fwd = !fwd;
            $.fn.cycle.commonReset(curr,next,opts);
            opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
            opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.left = 0;
    };

// slideX/slideY
    $.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr,next,opts,false,true);
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.width = 'show';
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr,next,opts,true,false);
            opts.animIn.height = next.cycleH;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animIn.height = 'show';
        opts.animOut.height = 0;
    };

// shuffle
    $.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
        var i, w = $cont.css('overflow', 'visible').width();
        $slides.css({left: 0, top: 0});
        opts.before.push(function(curr,next,opts) {
            $.fn.cycle.commonReset(curr,next,opts,true,true,true);
        });
        // only adjust speed once!
        if (!opts.speedAdjusted) {
            opts.speed = opts.speed / 2; // shuffle has 2 transitions
            opts.speedAdjusted = true;
        }
        opts.random = 0;
        opts.shuffle = opts.shuffle || {left:-w, top:15};
        opts.els = [];
        for (i=0; i < $slides.length; i++)
            opts.els.push($slides[i]);

        for (i=0; i < opts.currSlide; i++)
            opts.els.push(opts.els.shift());

        // custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
        opts.fxFn = function(curr, next, opts, cb, fwd) {
            if (opts.rev)
                fwd = !fwd;
            var $el = fwd ? $(curr) : $(next);
            $(next).css(opts.cssBefore);
            var count = opts.slideCount;
            $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
                var hops = $.fn.cycle.hopsFromLast(opts, fwd);
                for (var k=0; k < hops; k++) {
                    if (fwd)
                        opts.els.push(opts.els.shift());
                    else
                        opts.els.unshift(opts.els.pop());
                }
                if (fwd) {
                    for (var i=0, len=opts.els.length; i < len; i++)
                        $(opts.els[i]).css('z-index', len-i+count);
                }
                else {
                    var z = $(curr).css('z-index');
                    $el.css('z-index', parseInt(z,10)+1+count);
                }
                $el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
                    $(fwd ? this : curr).hide();
                    if (cb) cb();
                });
            });
        };
        $.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
    };

// turnUp/Down/Left/Right
    $.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,true,false);
            opts.cssBefore.top = next.cycleH;
            opts.animIn.height = next.cycleH;
            opts.animOut.width = next.cycleW;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.height = 0;
        opts.animIn.top = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,true,false);
            opts.animIn.height = next.cycleH;
            opts.animOut.top   = curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,false,true);
            opts.cssBefore.left = next.cycleW;
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,false,true);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        $.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };

// zoom
    $.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,false,false,true);
            opts.cssBefore.top = next.cycleH/2;
            opts.cssBefore.left = next.cycleW/2;
            $.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
            $.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
        });
        opts.cssFirst.top = 0;
        opts.cssFirst.left = 0;
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
    };

// fadeZoom
    $.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,false,false);
            opts.cssBefore.left = next.cycleW/2;
            opts.cssBefore.top = next.cycleH/2;
            $.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
        });
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
        opts.animOut.opacity = 0;
    };

// blindX
    $.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
        var w = $cont.css('overflow','hidden').width();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts);
            opts.animIn.width = next.cycleW;
            opts.animOut.left   = curr.cycleW;
        });
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
// blindY
    $.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
        var h = $cont.css('overflow','hidden').height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top   = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
// blindZ
    $.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
        var h = $cont.css('overflow','hidden').height();
        var w = $cont.width();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top   = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = w;
        opts.animIn.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = h;
        opts.animOut.left = w;
    };

// growX - grow horizontally from centered 0 width
    $.fn.cycle.transitions.growX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,false,true);
            opts.cssBefore.left = this.cycleW/2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
// growY - grow vertically from centered 0 height
    $.fn.cycle.transitions.growY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,true,false);
            opts.cssBefore.top = this.cycleH/2;
            opts.animIn.top = 0;
            opts.animIn.height = this.cycleH;
            opts.animOut.top = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };

// curtainX - squeeze in both edges horizontally
    $.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,false,true,true);
            opts.cssBefore.left = next.cycleW/2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = curr.cycleW/2;
            opts.animOut.width = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
// curtainY - squeeze in both edges vertically
    $.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,true,false,true);
            opts.cssBefore.top = next.cycleH/2;
            opts.animIn.top = 0;
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH/2;
            opts.animOut.height = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };

// cover - curr slide covered by next slide
    $.fn.cycle.transitions.cover = function($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow','hidden').width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts);
            opts.cssAfter.display = '';
            if (d == 'right')
                opts.cssBefore.left = -w;
            else if (d == 'up')
                opts.cssBefore.top = h;
            else if (d == 'down')
                opts.cssBefore.top = -h;
            else
                opts.cssBefore.left = w;
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };

// uncover - curr slide moves off next slide
    $.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow','hidden').width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,true,true,true);
            if (d == 'right')
                opts.animOut.left = w;
            else if (d == 'up')
                opts.animOut.top = -h;
            else if (d == 'down')
                opts.animOut.top = h;
            else
                opts.animOut.left = -w;
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };

// toss - move top slide and fade away
    $.fn.cycle.transitions.toss = function($cont, $slides, opts) {
        var w = $cont.css('overflow','visible').width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr,next,opts,true,true,true);
            // provide default toss settings if animOut not provided
            if (!opts.animOut.left && !opts.animOut.top)
                $.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
            else
                opts.animOut.opacity = 0;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
    };

// wipe - clip animation
    $.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
        var w = $cont.css('overflow','hidden').width();
        var h = $cont.height();
        opts.cssBefore = opts.cssBefore || {};
        var clip;
        if (opts.clip) {
            if (/l2r/.test(opts.clip))
                clip = 'rect(0px 0px '+h+'px 0px)';
            else if (/r2l/.test(opts.clip))
                clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
            else if (/t2b/.test(opts.clip))
                clip = 'rect(0px '+w+'px 0px 0px)';
            else if (/b2t/.test(opts.clip))
                clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
            else if (/zoom/.test(opts.clip)) {
                var top = parseInt(h/2,10);
                var left = parseInt(w/2,10);
                clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
            }
        }

        opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

        var d = opts.cssBefore.clip.match(/(\d+)/g);
        var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

        opts.before.push(function(curr, next, opts) {
            if (curr == next) return;
            var $curr = $(curr), $next = $(next);
            $.fn.cycle.commonReset(curr,next,opts,true,true,false);
            opts.cssAfter.display = 'block';

            var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
            (function f() {
                var tt = t ? t - parseInt(step * (t/count),10) : 0;
                var ll = l ? l - parseInt(step * (l/count),10) : 0;
                var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
                var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
                $next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
                (step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
            })();
        });
        $.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
        opts.animIn	   = { left: 0 };
        opts.animOut   = { left: 0 };
    };

})(jQuery);

// This is the cg_gui version of application-specific JavaScript functions and classes

function CSRFProtection(xhr) {
  var token = $('meta[name="csrf-token"]').attr('content');
  if (token) {
    xhr.setRequestHeader('X-CSRF-Token', token); 
  }
}
if ('ajaxPrefilter' in $) { 
  $.ajaxPrefilter(function(options, originalOptions, xhr) { CSRFProtection(xhr); }); 
} else {
  $(document).ajaxSend(function(e, xhr) { CSRFProtection(xhr); }); 
}


//In header portion
//Case 1: Without login - Search of public profiles i.e; Either scholar or community
//Case 2: With login - Search for existing peers and communities
liveSearch = {
    searchField: $('body#community #search_input, body#feature #search_input, body#bookstore #search_input'),
    moreButton: $('.live_search a.more'),
    searchForm: $('#search form'),
    registerHandlers: function () {
        this.searchField.live('keyup', function(evt){
            if ($(this).parent().parent().parent()[0].className == "mod_entries_tools"){
                var $searchDiv = $("#wrapper #primary .mod_entries_tools #search .live_search");
            }else{
                var $searchDiv = $("#wrapper #masthead #search .live_search");
            }
            var $searchField = $(this);
            var searchString = $(this).val();
            var searchForm = $('#search form');
            var action = searchForm.attr("action") + "?search_text=" + encodeURIComponent(searchString);
            var delay = 1500;
            var lastSearchAttr = "data-last-search";

            function valueHasNotChangedSinceEvent () {
                return searchString == $searchField.val();
            }

            function valueIsDifferentFromLastSearch() {
                return searchString != $searchDiv.attr(lastSearchAttr);
            }

            function recordSearch() {
                $searchDiv.attr(lastSearchAttr, searchString);
            }

            function searchFieldIsStillFocused() {
                return $searchField.is(":focus");
            }

            function updateVisibility() {
                searchForm.removeClass('loading');
                var atLeastOneMatch = $searchDiv.find("ul > li").length > 0;

                searchFieldIsStillFocused() && atLeastOneMatch ?
                    $searchDiv.removeClass('display_none') :
                    $searchDiv.addClass('display_none');
            }

            function emptyAndHide() {
                $searchDiv.find("ul > li").remove();
                $searchDiv.addClass('display_none');
            }

            setTimeout(function() {
                if (valueHasNotChangedSinceEvent() && valueIsDifferentFromLastSearch() && searchFieldIsStillFocused()) {
                    recordSearch();

                    if (searchString) {
                        searchForm.addClass("loading");
                        $searchDiv.load(action, function () { updateVisibility(); });
                    }
                    else {
                        emptyAndHide();
                    }
                }
            }, delay)
        });

        this.searchField.live('blur', function(evt){
            var that = $(this);
            setTimeout(function() {
                if(! that.is(":focus")){
                    $(".live_search").addClass('display_none');
                }
            }, 700);
        });

        this.moreButton.live('click', function(evt){
          if($(this).closest('form').attr('id') == 'search') { 
            evt.preventDefault();
            $('#search_input').focus();

            var that = $(this);
            var searchDiv = $(".live_search");
            var searchString = searchDiv.attr('data-last-search');
            var searchForm = $('#search form');
            var action = searchForm.attr("action");
            that.hide();
            searchDiv.find("div.loading_content").show();
            $.ajax({
                type: "GET",
                url: action,
                data: {search_text: searchString, page: that.attr('page')},
                success: function(html){
                    searchDiv.children("ul").append(html);
                    var page = parseInt(that.attr('page'));
                    var max_pages = parseInt(that.attr('max_pages'));
                    if (page < max_pages){
                        that.attr('page', parseInt(that.attr('page')) + 1);
                        that.show();
                    }
                },
                complete: function(){
                    searchDiv.find('div.loading_content').hide();
                }
            })
          }
        });

        this.searchForm.live('submit', function(evt){
            evt.preventDefault();
            evt.stopPropagation();
        });
    }
};

liveSearch.registerHandlers();
/********************************************

 Scholar
 UI Init JS

 Requires:
 - jQuery
 - jQuery UI (Slider, Datepicker)
 - jQuery Timepicker
 - jQuery Form Hint
 - jQuery Resize
 - jQuery Tiny Sort
 - jQuery Tablesorter
 - jQuery Tablesorter Pagination
 - jQuery Validate
 - jQuery Chosen
 - jQuery Chosen - Customized for Livesearch
 - jQuery Price Format
 - Shadowbox

 Note:
 - For Structure see jquery.init.structure.js

 *******************************************/



$(document).ready(function() {


// GLOBAL //


  // Global : Shadowbox Init - Requires shadowbox plugin //
  Shadowbox.init({
    animate: false,
    overlayColor: "#AAA"
  });

  systemNote = {
      update_system_note: function(text, level, module, modules) {
          if (modules.indexOf(module) == -1 ){
              if($("#system_note").is(":visible")){
                  systemNote.hide();
              }
          }else {
              var element = $("#system_note");
              if (element.is(":visible")) {
                  element.text(text);
                  element.addClass(level);
              } else {
                  $("<p id=system_note class=" + level + " style = 'position: fixed; top: 0px;'>" + text + "</p>").insertBefore("#banner");
                  $("#banner").css({position: "fixed", top: "24px"});
                  if (module == "cg_event"){
                      $("#masthead").css({'margin-top': "40px"});
                  }
              }
          }
      },
      hide: function(){
            $("#system_note").remove();
            $("#banner").css("top", "0px");
            $("#masthead").removeAttr("style");
            $("#masterhead").removeAttr("style");
       }
  };



  // Global : URL Variable Function //
  $.extend({
    getUrlVars: function() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    },
    getUrlVar: function(name) {
      return $.getUrlVars()[name];
    }
  });


    function stickyBanner() {
        var bannerTop = 0;
        bannerTop += $("#system_note").outerHeight();
        paddingTop = bannerTop + $("#banner").outerHeight();
        $("#system_note").css("position","fixed").css("top","0");
        $("#banner").css("position","fixed").css("top",bannerTop);
        $("#wrapper").css("padding-top",paddingTop);
    }

    stickyBanner();

    // Global : Livesearch Chosen Init //
  //$('#chlive-input').chosenLive();
  $('.chlive-input').each(function() {
      if ($(this).hasClass('chlive-single-select')) {
          $(this).chosenLive({
              forceSingleChoice: true
          });
      } else {
          $(this).chosenLive({
              forceSingleChoice: false
          });
      }
  });

    $('.chlive-input-1').each(function() {
        if ($(this).hasClass('chlive-single-select')) {
            $(this).chosenLive2({
                forceSingleChoice: true
            });
        } else {
            $(this).chosenLive2({
                forceSingleChoice: false
            });
        }
    });


    // Global : Initialize Form Hints - Requires hints plugin //
  $('body').formHint();

  // Global : Price Fields - Requires Price Format plugin //
  $('.price_field').priceFormat();
  $('.subscription_price').priceFormat({
    prefix:'',
    thousandsSeparator: ''
  });


  // Global : Form Hidden Fields //
  $('select, input').change(function() {
    if ($(this).hasClass('custom')) {
      $(this).parents('.item').find('.hidden_field').show().addClass('required');
    } else {
      var proceed = ($(this).attr('id') == 'cg_project_publisher_project_phase_configs_attributes_0_phase_config_type_attributes_number_of_peer_reviewers');
      if (proceed == false){
        $(this).parents('.item').find('.hidden_field').hide().removeClass('required');
        $(this).parents('.item').find('label.error').hide();
      }
    }
  });

  $('input.custom:checked').parents('.item').find('.hidden_field').show().addClass('required');


  // Global : Initialize Datepicker - Requires jQuery UI //
  $('.datepicker').datepicker({dateFormat: "M d, yy"});

  // Global : Initialize Datepicker with year and month chang
  $(".datepicker1").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "M d, yy"
  });


  // Global : Initialize Date/Timepicker - Requires jQuery Timepicker //
  $('.datetimepicker').each(function() {
    $(this).datetimepicker({
        stepMinute: 5,
        ampm: true,
        timeformat: 'h:mm:ss tt',
        dateFormat: 'M d, yy'
    });
  });

  // Global : Notifications Menu //
  $("#support_nav #notifications > a").click(function() {
    $(this).find(".count").fadeOut();
    $(this).parents("li").removeClass("active");
    return false;
  });


  // Global : Sign Up : Birth Date Check //
  $("#sign_up #birth_date").change(function() {
    var day = $(this).find("#birth_date_day").val();
    var month = $(this).find("#birth_date_month").val();
    var year = $(this).find("#birth_date_year").val();
    if (day != "" && month != "" && year != "") {
      var birthdate = new Date();
      birthdate.setFullYear(year, month - 1, day);

      var currdate = new Date();
      currdate.setFullYear(currdate.getFullYear() - 18);

      if ((currdate - birthdate) < 0) {
        $("#birth_date_warning").show();
        $("#birth_date").closest("div.item").siblings().hide();
      } else {
        $("#birth_date_warning").hide();
        $("#birth_date").parents("div.item").siblings().show();
      }
    }
  });

  // Global : General Form Validation - Requires validate plugin //
  $('form').each(function() {
    var form = $(this);
    if (form.find("input.do_not_validate").length == 0) {
        if ($(form).hasClass('validate_feature_buttons')) {
            form.validate({
                ignore: "",
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parents(".feature_buttons").find(".feature_button:last"));
                }

            });
        } else {
            form.validate({
                groups: {
                    birth_date: "birth_date_day birth_date_month birth_date_year",
                    relative_due_date: "cg_project_publisher_project[phase_configs_attributes][0][relative_due_date_duration] cg_project_publisher_project[phase_configs_attributes][0][relative_due_date_units] cg_project_publisher_project[phase_configs_attributes][1][relative_due_date_duration] cg_project_publisher_project[phase_configs_attributes][1][relative_due_date_units]"
                },
                errorPlacement: function (error, element) {
                    isBirthDateField = element.attr("name").indexOf("birth_date_") >= 0
                    error.insertAfter(isBirthDateField ? ("#birth_date") : element);
                }
            });
        }
    }else{
    }
  });

  // Global : Feature Template Form Validation - Requires validate plugin //
  $('#feature form').validate({
    messages: {
      "birth_date_day": "",
      "birth_date_month": "",
      "birth_date_year": ""
    }
  });


  // Global : Sponsored Accounts List Filtering - Requires tinysort plugin //
  $(".form_list #sponsored_account_filter").change(function() {
    var value = $(this).val();
    var parent = $(this).parents('.form_list');
    if (value == "last_name") {
      parent.find('li').tsort('.last_name');
    }
    if (value == "username") {
      parent.find('li').tsort('.username');
    }
  });

  // Global: Table Sorting, Pagination, Resizable Columns - Requires tablesort and colResizable plugins //
  // Publisher : Publisher Table Sorting - Requires tablesort plugin //
  $.tablesorter.defaults.sortList = [[0,0]];
 // $.tablesorter.showError( table, xhr, exception );
  $("#project_members table.sort th.sort_none").addClass('{sorter: false}');

    $.each( $("#project_members table.sort"), function(index,table) {
        if( $(table).find("tbody").find("tr").size() > 1 ) {
            $(table).tablesorter();
        }
    });
    function bind_ajax_table_pager(table, container, ajaxurl, customAjaxFilter, $)
    {
        var showFilter = (arguments[5] == true ? true : false);
        var custFilter = (customAjaxFilter == "search" ? [".", [[0, 0]]] : ["#", [[1,0]]]);
        var $tblsorter = $("#"+table).tablesorter({
            sortList: custFilter[1],
            widgets: ["filter"],
            widgetOptions : {
                filter_external : $(custFilter[0] + customAjaxFilter),
                filter_ignoreCase: true,
                filter_searchDelay: 300,
                filter_columnFilters: showFilter
            }
        });
        var overlay = $("<div style='width:100%; height: 100%; top: 0; z-index: 100; position: absolute; background: lightgray; opacity: 0.5; text-align: center; font-size: large; padding-top: 25%; font-weight: bold;'>Loading...</div>");
        $tblsorter.tablesorterPager({
            // target the pager markup - see the HTML block below
            container: $("#"+container),
            ajaxUrl: ajaxurl ,
            processAjaxOnInit: true,
            ajaxObject: {
                beforeSend: function (xhr, opts) {
                    if (customAjaxFilter == "preview_merge_user_listing") {
                        $("body").append(overlay);
                    }else if(customAjaxFilter == "users_listing"){
                        opts.url=opts.url+"&search-scope="+$("#search-scope").val()+"&search-value="+$("#search-value").val()+"";
                    }
                },
                success: function(){
                    if(container.indexOf("memberships_listing") > -1){
                        triggerListeners();
                    }
                    if(container.indexOf("user_community_listings") > -1){
                        triggerCommunitySelectListener();
                    }
                    overlay.remove();
                },
                error: function(){
                    overlay.remove();
                }
            },

            output: '{startRow} to {endRow} ({totalRows})'
        });

        return $tblsorter;
    }

    function bind_ajax_table_pager_wallet(table, container, customAjaxFilter, $)
    {
        var showFilter = (arguments[5] == true ? true : false);
        var custFilter = (customAjaxFilter == "search" ? [".", [[0, 0]]] : ["#", [[1,0]]]);
        var $tblsorter = $("#"+table).tablesorter({
            sortList: custFilter[1],
            widgets: ["filter"],
            widgetOptions : {
                filter_external : $(custFilter[0] + customAjaxFilter),
                filter_ignoreCase: true,
                filter_searchDelay: 300,
                filter_columnFilters: showFilter
            }
        });
        var overlay = $("<div style='width:100%; height: 100%; top: 0; z-index: 100; position: absolute; background: lightgray; opacity: 0.5; text-align: center; font-size: large; padding-top: 25%; font-weight: bold;'>Loading...</div>");
        $tblsorter.tablesorterPager({
            // target the pager markup - see the HTML block below
            container: $("#"+container),
            ajaxUrl: getWalletUrl() ,
            processAjaxOnInit: true,
            ajaxObject: {
                data: {user: $('#user').val()},
                beforeSend: function (xhr, opts) {
                    if (customAjaxFilter == "preview_merge_user_listing") {
                        $("body").append(overlay);
                    }
                    opts.url=opts.url+'&user='+ $('#wallet_user').val()+'&amount_low='+$('#amount_low').val() +"&amount_high=" +$('#amount_high').val()+'&date_low='+$('#date_low').val()+'&date_high='+$('#date_high').val();
                },
                success: function(){
                    overlay.remove();
                },
                error: function(){
                    overlay.remove();
                }
            },

            output: '{startRow} to {endRow} ({totalRows})'
        });

        return $tblsorter;
    }

    // function searchAndExportForWallet(){
    $('#wallet_listing_search').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: "get",
            url: '/identity/admin/offsets?&page=0&size='+$('.pagesize').val()+'&user='+ $('#wallet_user').val()+'&amount_low='+$('#amount_low').val() +"&amount_high=" +$('#amount_high').val()+'&date_low='+$('#date_low').val()+'&date_high='+$('#date_high').val(),
            success: function( data ) {
                var table = $('#wallet_listing > table tbody');
                table.empty();
                var trow = "";
                $.each(data["rows"], function (index, value) {
                    trow = trow+ "<tr>";
                    $.each(value, function (index, val) {
                        trow = trow + "<td>" + val + '</td>';
                    });
                    trow = trow + "</tr>";
                });
                table.append(trow);
                if(parseInt($('.pagesize').val()) > parseInt(data['total_rows'])){
                    $('.next').addClass('disabled');
                    $('.prev').addClass('disabled');
                }else{
                    $('.next').removeClass('disabled');
                    $('.prev').removeClass('disabled');
                }
                $('.pagedisplay').text('1 to '+(parseInt($('.pagesize').val()) > parseInt(data['total_rows']) ? data['total_rows']:$('.pagesize').val())+' ('+ data['total_rows']+')');
            }
        });
    });

    $("#members_listing #members_listing_show, #members_listing .pagination .button, #members_listing table thead tr").on("change, click", function(){
        $("#workspace .loading_spinner").show();
        setTimeout(function(){ $("#workspace .loading_spinner").hide(); }, 800);
    });

    function bind_ajax_table_pager_all_works(table, container, ajaxurl, $)
    {
        var $tblsorter = $("#"+table)
            .tablesorter({
                sortList: [[1,0]],
                widgets: ["filter"],
                widgetOptions : {
                    filter_childRows: false,
                    filter_columnFilters : true,
                    filter_childRows: false,
                    filter_hideFilters : false,
                    filter_serversideFiltering : true,
                    filter_cssFilter: 'tablesorter-filter',
                    filter_ignoreCase: true,
                    filter_reset: 'button.reset',
                    filter_searchDelay: 300,
                    filter_startsWith: false,
                    filter_useParsedData: false,
                    columns_thead : true
                }
            });

        $tblsorter.tablesorterPager({
            // target the pager markup - see the HTML block below
            container: $("#"+container),
            ajaxUrl: ajaxurl ,
            processAjaxOnInit: true,
            output: '{startRow} to {endRow} ({totalRows})'
        });
        return $tblsorter;
    }

  function bind_ajax_table_pager_admins(table, container, ajaxurl, $)
    {
        var $tblsorter = $("#"+table)
            .tablesorter({
                widgets: ['filter', 'pager'],
                sortList: [[1,0]],
                widgetOptions : {
                    filter_columnFilters: false,
                    filter_external: $('.group_filter')
                }
            });

        $tblsorter.tablesorterPager({
            // target the pager markup - see the HTML block below
            container: $("#"+container),
            ajaxUrl: ajaxurl ,
            processAjaxOnInit: true,
            output: '{startRow} to {endRow} ({totalRows})',
            ajaxObject: {
                success: function(data){
                    console.log(data)
                    if(container.indexOf("group_communities_users") > -1){
                        $("#communities").empty();
                        $('#communities').append(data['communities']);
                        $('#groups').on('change', function () {
                            $("#communities").val('selected').change();
                            $("#communities").empty();
                        });
                    }
                    if(container.indexOf("organization_bookstores") > -1){
                        $('#collection_title').text('Bookstore: '+data['collection']);
                    }
                    if(container.indexOf("organization_communities") > -1) {
                        $('#export_all').off('click').on('click', function (e) {
                            $('.export_check').prop('checked', $(this).prop('checked'));
                        });
                    }
                },
                complete: function (data) {

                }
            }
        });

        return $tblsorter;
    }

     function bind_reviewers_table_pager(table, container,ajaxurl,$)
    {
        var $tblsorter = $("#"+table)
            .tablesorter({
                sortList: false,
                resort: true,
                sortReset:true,
                serverSideSorting:true,
                sortResetKey:"ctrlKey",
                initialized : function(table){

                }
            });

        $tblsorter.tablesorterPager({
            // target the pager markup - see the HTML block below
            container: $("#"+container),
            ajaxUrl: ajaxurl,
            page: 0,
            size: 10,
            savePages : false,
            pageReset: 0,
            processAjaxOnInit: true,
            ajaxObject: {
                beforeSend: function () {
                    // show the custom spinner
                    $.blockUI({
                        fadeIn: 1,
                        fadeOut: 1,
                        css: {
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: '#333366',
                            left: '45%',
                            top: '45%'
                        },
                        overlayCSS: {
                            backgroundColor: '#CCCCCC'
                        },
                        message: '<div class="dots">&nbsp;</div><p class="tablesorter-processing" style="width:40px;height:40px;"></p>'
                    });
                },
                dataType: 'json',
                type : 'GET'
            },
            ajaxProcessing: function(data,table,xhr, exception){

                if (xhr.readyState==4 && xhr.status==200)
                {
                    $("#overlay #ajax_overlay").empty();
                    if (data && data.hasOwnProperty('rows')) {
                        var i, j, rows = '';
                        if (data.total_rows && parseInt(data.total_rows) > 0)
                        {
                              for (i = 0; i < data.rows.length; i++)
                              {
                                rows += '<tr>';
                                rows += '<td style="width:20%;min-width:168px;vertical-align: middle;">' + data.rows[i][0] + '</td>';
                                rows += '<td style="width:10%;text-align:center;vertical-align: middle;">' + data.rows[i][1] + '</td>';
                                rows += '<td style="width:10%;text-align:center;vertical-align: middle;">' + data.rows[i][2] + '</td>';
                                rows += '<td style="width:10%;text-align:center;vertical-align: middle;">' + data.rows[i][3] + '</td>';
                                rows += '<td style="width:20%;vertical-align: middle;">' + data.rows[i][4] + '</td>';
                                rows += '<td style="width:35%;vertical-align: middle;">' + data.rows[i][5] + '</td>';
                                rows += '</tr>';
                              }
                                 $(table).find('tbody').html(rows);

                        } else {
                                 var message = '<p>Sorry there were no reviewers with the selected criteria. You may change the search criteria to view other results.</p>';
                                 $("#overlay #ajax_overlay").append('<li>' + message + '</li>');
                        }
                  }
                }else{

                    var message = xhr.status === 0 ? 'Not connected, Server Error' :
                        xhr.status === 404 ? 'Requested page not found [404]' :
                            xhr.status === 500 ? 'Internal Server Error [500]' :
                                exception === 'parsererror' ? 'Requested JSON parse failed' :
                                    exception === 'timeout' ? 'Time out error' :
                                        exception === 'abort' ? 'Ajax Request aborted' :
                                        'Uncaught error: ' + xhr.statusText + ' [' + xhr.status + ']' ;

                    var errmsg = '<p>'+message+'</p>';
                    $("#overlay #ajax_overlay").append('<li>' + message + '</li>');

                }
                // remove the custom spinner
                $.unblockUI();
                return [ data.total_rows];
            }
        });

        return $tblsorter;
    }

    // Should this selector be more specific to avoid collision with the lines below? What tables does this page?
  // This appears to be targeted at various admin tools but assumes only 1 table per page
  $("#content table.sort.paginate").tablesorterPager({positionFixed: false, container: $("#table_pager"), size: 10});
  // size must be synced up with selected display limit //
  if( $("#content #active_projects_listing table.sort.paginate").find("tbody").find("tr").size() > 0 ) {
    $("#content #active_projects_listing table.sort.paginate").tablesorterPager({positionFixed: false, container: $("#active_projects_listing .table_pager"), size: 10});
  }
  if( $("#submission-table").find("tbody").find("tr").size() > 0 ) {
    $("#submission-table").tablesorterPager({positionFixed: false, container: $("#submission-container"), size: 10});
  }
  if( $("#content #closed_projects_listing table.sort.paginate").find("tbody").find("tr").size() > 0 ) {
    $("#content #closed_projects_listing table.sort.paginate").tablesorterPager({positionFixed: false, container: $("#closed_projects_listing .table_pager"), size: 10});
  }

  if( $("#content #active_closed_listing table.sort.paginate").find("tbody").find("tr").size() > 0 ) {
      $("#content #active_closed_listing table.sort.paginate").tablesorterPager({positionFixed: false, container: $("#active_closed_listing .table_pager"), size: 10});
  }


   function getPublisherProjectsUrl(state){
     if(window.location.href.match(/\d+$/g) != null){
        var publisher_id = window.location.href.match(/\d+$/g)[0];
        return '/publisher/publishers/'+ publisher_id + '?state=' + state + '&page={page}&size={size}&{sortList:col}&{filterList:fcol}';
     }
   }

    function getUrl(state){
        url = window.location.href;
        if(url != null){
            $("#workspace .loading_spinner").hide();
            url_join = (url.indexOf("?") != -1 ? "&" : "?")
            if (state == "user_proposal_registrations"){
              return url.replace(/#$/, "")  + url_join + '&page={page}&size={size}&{sortList:col}&{filterList:fcol}';
            }else {
                return url.replace(/#$/, "") + url_join + 'state=' + state + '&page={page}&size={size}&{sortList:col}&{filterList:fcol}';
            }
        }
    }


   function getCurrentPathname() {
     var parser = document.createElement('a');
     parser.href = window.location.href;
     return parser.pathname;
   }

    function generateReviewSuggestionUrl(){
      var  url = '';
        if(document.getElementById('creator_publisher') && document.getElementById('search_string')) {
            var search_string = document.getElementById('search_string').value;
            url = getCurrentPathname();
            url = url + '?search_string=' + search_string + '&page={page}&size={size}&{sortList:col}&{filterList:fcol}';
        }
      return url;
    }

   if(generateReviewSuggestionUrl() != '') {
     var tblsorter = bind_reviewers_table_pager('content #reviewers_listing table.sort.paginate', 'reviewers_listing .table_pager', generateReviewSuggestionUrl(), $);
     $("#suggested_reviewers_form").on('submit', tblsorter, function (e) {
       if ($(tblsorter)[0].hasInitialized == true) {
         $(tblsorter)[0].config.pager.ajaxUrl = generateReviewSuggestionUrl();
         var resort = true,
             callback = function (table) {
                $(table).trigger('pageAndSize', [0, $(tblsorter)[0].config.pager.size]);
              };
              $(tblsorter).trigger('update', [resort, callback]);
              return false;
          }
       });
   }

   $(document).ready(function(){
       // $("body#overlay").css("position", "fixed"); 
       beginLoadingImage($("#element_version_listing table tbody"));
       $("#element_version_listing table tbody").html("<div style='font-size: 14px; padding: 10px;'>Loading....</div>")
       $(this).mousemove(function(){
           if($(".pagination .pagedisplay").length >= 1 && $(".pagination .pagedisplay")[0].innerHTML.indexOf("(0)") != -1)
               $("#element_version_listing table tbody").html("<div style='color: red;font-size: 14px; padding: 10px;'>No Record Found</div>")
       });
   });

   function getRestoreElementVersionUrl(state) {
       url = window.location.href;
       if(url != null){
           modified_url = url.replace(/edit/, "get_element_versions") + (url.indexOf("?") != -1 ? "&" : "?");
           return (modified_url  + 'state=' + state + '&page={page}&size={size}&{sortList:col}&{filterList:fcol}');
       }
   }
    function getPreviewUrl(state) {
        url = window.location.href;
        if(url != null){
            return (url  + '&state=' + state);
        }
    }
    function getWalletUrl() {
        url = window.location.href;
        if(url != null){
            url_join = (url.indexOf("?") != -1 ? "&" : "?")
            return (url.replace(/#$/, "")  + url_join + '&page={page}&size={size}&{sortList:col}&{filterList:fcol}');
        }
    }
   bind_ajax_table_pager('content #email_template table.sort.paginate', 'email_template .table_pager', getUrl('email_template'), 'email_template', $);
   bind_ajax_table_pager('content #workflow_listing table.sort.paginate', 'workflow_listing .table_pager', getUrl('workflow_listing'), 'workflow_listing', $);
   bind_ajax_table_pager_wallet('content #wallet_listing table.sort.paginate', 'wallet_listing .table_pager', 'search', $, true);
   bind_ajax_table_pager('content #tasks_listing table.sort.paginate', 'tasks_listing .table_pager', getUrl('tasks_listing'), 'tasks_listing', $);
   bind_ajax_table_pager('content #works_listing table.sort.paginate', 'works_listing .table_pager', getUrl('works_listing'), 'search', $);
   bind_ajax_table_pager('content #preview_merge_user_listing table.sort.paginate', 'preview_merge_user_listing .table_pager', getPreviewUrl('preview_merge_user_listing'), 'preview_merge_user_listing', $);
   bind_ajax_table_pager('content #element_version_listing table.sort.paginate', 'element_version_listing .table_pager', getRestoreElementVersionUrl('element_version_listing'), 'search1', $);
   bind_ajax_table_pager('content #version_listing table.sort.paginate', 'version_listing .table_pager', getPublisherProjectsUrl('all_versions'), 'version_listing', $, true);
   bind_ajax_table_pager('content #active_projects_listing table.sort.paginate', 'active_projects_listing .table_pager', getPublisherProjectsUrl('active'), 'active_projects', $);
   bind_ajax_table_pager('content #closed_projects_listing table.sort.paginate', 'closed_projects_listing .table_pager', getPublisherProjectsUrl('inactive'), 'closed_projects', $);
   bind_ajax_table_pager_all_works('content #active_closed_listing table.sort.paginate', 'active_closed_listing .table_pager', getPublisherProjectsUrl('all_works'), $);
   bind_ajax_table_pager_admins('content #organizations_listing table.sort.paginate', 'organizations_listing .table_pager', getUrl('all_organizations'), $);
   bind_ajax_table_pager_admins('content #institutions_listing table.sort.paginate', 'institutions_listing .table_pager', getUrl('all_institutions'), $);
   bind_ajax_table_pager_admins('content #organizations_listing_1 table.sort.paginate', 'organizations_listing_1 .table_pager', getUrl('admin_organizations'), $);
   bind_ajax_table_pager_admins('content #organization_groups table.sort.paginate', 'organization_groups .table_pager', getUrl('all_groups'), $);
   bind_ajax_table_pager_admins('content #organization_communities table.sort.paginate', 'organization_communities .table_pager', getUrl('all_communities'), $);
   bind_ajax_table_pager_admins('content #organization_group_communities_users table.sort.paginate', 'organization_group_communities_users .table_pager', getUrl('all_users'), $);
   bind_ajax_table_pager_admins('content #organization_publishers table.sort.paginate', 'organization_publishers .table_pager', getUrl('all_publishers'), $);
   bind_ajax_table_pager_admins('content #organization_bookstores table.sort.paginate', 'organization_bookstores .table_pager', getUrl('all_collections'), $);
   bind_ajax_table_pager_admins('content #roles table.sort.paginate', 'roles .table_pager', getUrl('all_roles'), $);
   bind_ajax_table_pager_admins('content #subscription_packages_listing table.sort.paginate', 'subscription_packages_listing .table_pager', getUrl('all_packages'), $);
   bind_ajax_table_pager_admins('content #system_notifications_listing table.sort.paginate', 'system_notifications_listing .table_pager', getUrl('all_system_notifications'), $);
   bind_ajax_table_pager_admins('content #institution_subscription_listing table.sort.paginate', 'institution_subscription_listing .table_pager', getUrl('all_institutions'), $);
   bind_ajax_table_pager('content #users_listing table.sort.paginate', 'users_listing .table_pager', getUrl('isolated_users'), 'users_listing', $);
   bind_ajax_table_pager('content #user_community_listings table.sort.paginate', 'user_community_listings .table_pager', getUrl('user_communities'), 'user_community_listings', $);
   bind_ajax_table_pager('content #user_organization_listings table.sort.paginate', 'user_organization_listings .table_pager', getUrl('user_organization'), 'user_organization_listings', $);
   bind_ajax_table_pager('content #licenses_listing table.sort.paginate', 'licenses_listing .table_pager', getUrl('licenses'), 'licenses', $);
   bind_ajax_table_pager('content #user_proposal_registrations table.sort.paginate', 'user_proposal_registrations .table_pager', getUrl('user_proposal_registrations'), 'user_proposal_registrations', $);
   bind_ajax_table_pager('content #user_libraries table.sort.paginate', 'user_libraries .table_pager', getUrl('user_bookstore'), 'user_libraries', $);
   bind_ajax_table_pager('content #user_memberships table.sort.paginate', 'user_memberships .table_pager', getUrl('user_bookstore'), 'user_memberships', $);
   bind_ajax_table_pager('content #user_orders table.sort.paginate', 'user_orders .table_pager', getUrl('user_bookstore'), 'user_orders', $);
   bind_ajax_table_pager('content #user_subs table.sort.paginate', 'user_subs .table_pager', getUrl('user_bookstore'), 'user_subs', $);
   bind_ajax_table_pager('content #user_wallet table.sort.paginate', 'user_wallet .table_pager', getUrl('user_bookstore'), 'user_wallet', $);
   bind_ajax_table_pager('content #subscription_options_listing table.sort.paginate', 'subscription_options_listing .table_pager', getUrl('subscription_options'), 'subscription_options', $);
   bind_ajax_table_pager('content #published_works_listing table.sort.paginate', 'published_works_listing .table_pager', getUrl('published_works'), 'published_works', $, true);
   bind_ajax_table_pager('content #members_listing table.sort.paginate', 'members_listing .table_pager', getUrl('members'), 'members', $);
   bind_ajax_table_pager('content #subscriptions_listing table.sort.paginate', 'subscriptions_listing .table_pager', getUrl('subscriptions'), 'search', $, true);
   bind_ajax_table_pager('content #memberships_listing table.sort.paginate', 'memberships_listing .table_pager', getUrl('memberships'), 'search', $, true);
   bind_ajax_table_pager('content #membership_types_listing table.sort.paginate', 'membership_types_listing .table_pager', getUrl('membership_types'), 'membership_types', $)
   bind_ajax_table_pager('content #lti_consumers_listing table.sort.paginate', 'lti_consumers_listing .table_pager', getUrl('lti_consumers'), 'lti_consumers', $);
   bind_ajax_table_pager('content #lti_platforms_listing table.sort.paginate', 'lti_platforms_listing .table_pager', getUrl('lti_platforms'), 'lti_platforms', $);
   bind_ajax_table_pager('content #lti_tools_listing table.sort.paginate', 'lti_tools_listing .table_pager', getUrl('lti_tools'), 'lti_tools', $);
   bind_ajax_table_pager('content #lti_consumer_user_scores_listing table.sort.paginate', 'lti_consumer_user_scores_listing .table_pager', getUrl('lti_consumer_user_scores'), 'lti_consumer_user_scores', $);
   bind_ajax_table_pager('content #lti_tools_user_listing table.sort.paginate', 'lti_tools_user_listing .table_pager', getUrl('lti_tools_user_scores'), 'lti_tools_user_scores', $);
   bind_ajax_table_pager('content #physical_items_listing .sort.paginate','subscriptions_listing .table_pager',getUrl('physical_items'),'physical_items', $);
   bind_ajax_table_pager('content #subscription_usage_report_listing .sort.paginate','subscription_usage_report_listing .table_pager',getUrl('subscription_usage_report'),'subscription_usage_report', $);
   bind_ajax_table_pager('submission-table', 'submission-container', getUrl('get_submissions'), 'submissions_listing', $);

    $(document).ready(function(){
        $('#content div#organization_members').children('div').each( function () {
            $(this).children('div').each(function () {
                var id = $(this).children('div').attr('id');
                bind_ajax_table_pager_admins("content div#organization_members " + '#'+id + " table.sort.paginate", "organization_members " + '#'+id + " .table_pager", getUrl(id), $);
            });
        })
    });

    $(document).ready(function(){
        $('#content div#organization_events').children('div').each( function () {
            $(this).children('div').each(function () {
                var id = $(this).children('div').attr('id');
                bind_ajax_table_pager_admins("content div#organization_events " + '#'+id + " table.sort.paginate", "organization_events " + '#'+id + " .table_pager", getUrl(id), $);
            });
        });
    });

   $('.start_end_date_toggle').click(function(){
        $("#open_close_toggle").toggle();
    });

   $("#content table.resize").colResizable({
      liveDrag: true,
      gripInnerHtml:"<div class='table_grip'></div>"
   });

  var tableReorderWidthHelper = function(e, ui) {
      ui.children().each(function() {
        $(this).width($(this).width());
      });
      return ui;
  };

    document_url = document.URL;

    window.Works = {};

    var sub_series_pattern_match = document_url.match(/sub_series\/(\d+)/);
    var message_url = document_url.match(/message_url/);
    var message_url_to_admins = document_url.match(/message_url_to_admins/);
    var unsubscribe_url = document_url.match(/unsubscribe_url/);
    var work_url = document_url.match(/work_url/);
    var agreement_url = document_url.match(/agreement_url/);
    var series_pattern_match = document_url.match(/series\/(\d+)/);
    var collection_pattern_match = document_url.match(/collections\/(\d+)/);

    if (message_url || work_url || agreement_url || unsubscribe_url || message_url_to_admins){
      var height;
      var content = window.location.search.substr(1).split('=')[1];
      if(agreement_url){
        content += "=false";
      }
      if(message_url_to_admins){
            var profile_ids = window.location.search.substr(1).split('=')[2]
            content = content + "=" + profile_ids
        }
      if (unsubscribe_url){
        height = unsubscribe_url ? 235 : 500;
        var content_params = window.location.search.substr(1).split('&');
        content = content_params[0].split('=')[1] + '?' + content_params[1];
      }


   setTimeout(function(){
        Shadowbox.open({
            player:     'iframe',
            content:    content,
            height:     height ? height : 500,
            width:      600
        });
     }, 500);
    }

        var sortableOptsConstructor = function() {
        this.forcePlaceholderSize = true;
        this.handle = 'a.icon.reorder';
        this.items = 'tr';
        this.opacity = 0.6;
        this.update = function() {
            var datastring = $('#content table.reorder tbody.works_list').sortable('serialize');
            if (sub_series_pattern_match != null) {
                datastring = datastring + "&series_id=" + series_pattern_match[1] + "&sub_series_id=" + sub_series_pattern_match[1];
            }else if(series_pattern_match != null) {
                datastring = datastring + "&series_id=" + series_pattern_match[1];
            }
            window.Works.url = "/identity/admin/collections/" + collection_pattern_match[1] + '/reorder_works';
            $.ajax({
                type: 'POST',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
                url: window.Works.url,
                data: datastring,
                dataType: 'html' // we don't actually care but this sets header that helps rails not throw template missing error
            });

        };
    }
    var sortableOptsConstructorForWorks = function() {
        this.forcePlaceholderSize = true;
        this.handle = 'a.icon.reorder';
        this.items = 'tr';
        this.opacity = 0.6;
        this.update = function() {
            var datastring = $('#content table.reorder tbody.works_list').sortable('serialize');
            if (sub_series_pattern_match != null) {
                datastring = datastring + "&series_id=" + series_pattern_match[1] + "&sub_series_id=" + sub_series_pattern_match[1];
            }else if(series_pattern_match != null) {
                datastring = datastring + "&series_id=" + series_pattern_match[1];
            }
            window.Works.url = "/identity/admin/collections/" + collection_pattern_match[1] + '/reorder_works';
            $.ajax({
                type: 'POST',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
                url: window.Works.url,
                data: datastring,
                dataType: 'html' // we don't actually care but this sets header that helps rails not throw template missing error
            });

        };
    }

    window.Categories = {};
    var category_type = $("#content table.reorder tbody.categories").parent('table').attr('summary');
    var sortableOptsConstructorForCategories = function() {
        if(series_pattern_match != null){
            var parentId = series_pattern_match[1];
        }
        else if(collection_pattern_match != null){
            var parentId = collection_pattern_match[1];
        }
        this.forcePlaceholderSize = true;
        this.handle = 'a.icon.reorder';
        this.items = 'tr';
        this.opacity = 0.6;
        this.update = function() {
            var datastring = $('#content table.reorder tbody.categories').sortable('serialize');
            window.Categories.url = "/identity/admin/collections/reorder_categories?category_type=" + category_type + "&parent_id=" + parentId;
            $.ajax({
                type: 'POST',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
                url: window.Categories.url,
                data: datastring,
                dataType: 'html' // we don't actually care but this sets header that helps rails not throw template missing error
            });

        };
    }

  var sortableOptsForCategories = new sortableOptsConstructorForCategories();
  $("#content table.reorder tbody.categories").sortable(sortableOptsForCategories);

    $("#content table.reorder tbody.works_list").sortable();

    $('#support #content input.order').blur(function(){
        var position = $('#support #content input.order').val() - 1;
        if (position != null){
            var max_count = $('#support #content input#max_position').val();
                if (max_count < position){
                    alert("Enter values between 1 to "+ max_count );
                    $('#support #content input.order').val(" ");
                    return false;
                }
            var version_id = $('#support #content input#version_id').val();
            url = "/identity/admin/collections/" + collection_pattern_match[1] + '/reorder_works?';
            $.ajax({
                type: 'POST',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
                url: url,
                data: {new_position: position, version_id: version_id},
                dataType: 'html' // we don't actually care but this sets header that helps rails not throw template missing error
            });
            $('#support #content input.order').val(" ");
        }
    });

    $("#physical_items_purchase_amount").live("keypress cut copy paste", function(e) {
        if (e.keyCode >= 46 && (e.keyCode <= 57 && e.keyCode != 47)) {
            return true;
        }
        return false;
    });


    $("#physical_items_purchase_country").change(function(){
        var form_data = $(this);
        $.ajax({
            type: "get",
            url: "/identity/admin/physical_items_purchases/ajax_state_drop_down_changes",
            data: form_data.serialize(),
            success: function (response) {
                items = response.data;
                state_dropdown = document.getElementById("physical_items_purchase_state");
                state_dropdown.options.length = 0;
                var option = document.createElement("option");
                option.text = "Select State";
                option.value = "Select State";
                state_dropdown.add(option, null);
                for(i=0; i<items.length; i++) {
                    dropdown = document.createElement("option");
                    dropdown.text = items[i].name;
                    dropdown.value = items[i].name;
                    state_dropdown.add(dropdown, null);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                handleAjaxError(xhr.status, {
                    500: "A server error occurred while processing your request",
                    base: "An error occurred while submitting your country selection."
                });
            }
        });
    });

    $("div#controls div.physical_item_button button").on('click', function(){
        var validate_email = /^[A-Za-z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        var email = $("div.item input#physical_items_purchase_email").val();
        if (validate_email.test(email)){
           return true;
        }else{
            displayAlert("Please enter a valid email address", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").on('click', function(){
        var customer_name = $("#physical_items_purchase_name").val().length
        if (customer_name <= 250 ){
            return true;
        }else {
            displayAlert("Please Enter Below 250 Character For Name ", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").on('click', function(){
        var city = $("#physical_items_purchase_city").val().length
        if (city <= 250){
            return true;
        }else {
            displayAlert("Please Enter Below 250 Characters For City", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").on('click', function(){
        var zip_code = $("#physical_items_purchase_zipcode").val().length
        if (zip_code <= 250){
            return true;
        }else {
            displayAlert("Please Enter Below 250 Characters For ZipCode", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").on('click', function() {
        var price = $("#physical_items_purchase_amount").val().length
        if (price <= 250){
            return true;
        }else {
            displayAlert("Please Enter Below 250 Digits For Price", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").on('click',function(){
        var address = $("#physical_items_purchase_address").val().length
        if (address <= 250 ){
            return true;
        }else{
            displayAlert("Please Enter Below 250 Characters For Address", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").on('click',function() {
        var refrence_number = $("#physical_items_purchase_reference_number").val().length
        if (refrence_number <= 250){
            return true;
        }else{
            displayAlert("Please Enter Below 250 Characters For Refernce Number", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").on('click',function(){
      var comments =   $("#physical_items_purchase_additional_comments").val().length
        if (comments <= 250 ){
            return true;
        }else{
            displayAlert("Please Enter Below 250 Characters For Comments", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").live('click',function(){
       var payment_mode = $("#physical_items_purchase_payment_mode").val();
        if(!payment_mode == "" ){
           return true;
        }else{
            displayAlert("Please Select Payment Option", "negative");
            return false;
        }
    });

    $("div#controls div.physical_item_button button").live('click',function(){
        var journal_name = $("#physical_items_purchase_journal_name").val().length
        if(journal_name <= 250 ){
            return true;
        }else{
            displayAlert("Please Enter Below 250 Characters For Journal Name", "negative");
            return false;
        }
    });

    
    $("#physical_items_purchase_city").keydown(function (e) {
            var key = e.keyCode;
            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                e.preventDefault();
            }
    });

    $("#physical_items_purchase_journal_name").live("change keypress", function(e) {
        var journal_name =  document.getElementById('physical_items_purchase_journal_name');
        if (journal_name.value.length < 250) {
            return true;
        } else {
            displayAlert("Please Enter Below 250 Characters For Journal Name", "negative");
            return false;
        }
    });

    $("#physical_items_purchase_payment_mode").change(function(e){
        var drop_down_value = $(this).val();
        if (drop_down_value == "Bank Transfer" || drop_down_value == "Check" ){
            $("#payment_option").show();
        }else if(drop_down_value == "Cash"){
            $("#payment_option").hide();
        }

    });

    $("#physical_items_purchase_country").change(function(){
        var drop_down_value = $(this).val();
        if (drop_down_value != "" ){
            $("#create_subscription form .item#state").show();
        }
        else{
            $("#create_subscription form .item#state").hide();
        }
 });

// IDENTITY //

  // Identity: Module List Options //
  $("#support .form_list .list_content .options .disabled").click(function() {
    return false;
  });

  // Identity : Import Users Password Toggle //
  $("#support.admin_tools input#assign_password").change(function() {
    if ($(this).is(":checked")) {
      $(this).parents('form').find('#password_value_wrapper').show();
    } else {
      $(this).parents('form').find('#password_value_wrapper').hide();
    }
  });

  // Identity : Admin Tools Unlimited Seats //
  $("#support.admin_tools input#unlimited_seats").change(function() {
    if ($(this).is(":checked")) {
      $(this).parents('.item').find('#seats').removeClass('required').val('').attr("disabled", "disabled");
    } else {
      $(this).parents('.item').find('#seats').addClass('required').removeAttr("disabled");
    }
  });

  // Identity :Admin Tools Unlimited Event Creation For Organizaiton
    $("#support.admin_tools input#organization_unlimited_events").change(function() {
        if ($(this).is(":checked")) {
            $(this).parents('.item').find('#organization_event_limit').removeClass('required').val('').attr("disabled", "disabled");
        } else {
            $(this).parents('.item').find('#organization_event_limit').addClass('required').removeAttr("disabled");
        }
    });

    // Identity : Admin Tools Table Tools Toggle Options //
  $("#support.admin_tools .table_tools .toggle_options").live('click', function() {
    if (!$(this).hasClass('disabled')) {
      $(this).parents('.table_tools').children().toggle();
      // var parent = $(this).parents('.table_tools');
      // var target = $(this).attr('href').replace('#', '');
      // parent.find("> div").hide();
      // parent.find("> div." + target).show();
    }
    return false;
  });

  $('#support.admin_tools .table_tools .toggle_reset').live('click', function() {
    var parent = $(this).parents('.table_tools');
    parent.find("> div").hide();
    parent.find("> div:first").show();
    return false;
  });

  // Identity : Admin Table Check All Inputs //
  $('input#select_all_rows').change(function() {
    if ($(this).is(":checked")) {
        $(this).parents('table').find('td input').attr("checked", "checked");
    } else {
        $(this).parents('table').find('td input').removeAttr("checked");
    }
  });

  // Identity : Import Role and Seat Toggles //
  function importRoleToggle(s){
    $(s).parents('form').find('#import_role_select select').hide();
    if ($(s).find('option:selected').hasClass('school')) {
        $(s).parents('form').find('#import_role_select #role_school').show();
    } else {
        $(s).parents('form').find('#import_role_select #role_default').show();
    }
  }
  function importSeatToggle(s){
    $(s).parents('form').find('#import_seat_select').hide();
    if ($(s).find('option:selected').hasClass('req_seats')) {
        $(s).parents('form').find('#import_seat_select').show();
    }
  }
  importRoleToggle('#support.admin_tools #import_organization_select #organization');
  importSeatToggle('#support.admin_tools #import_organization_select #organization');
  $("#support.admin_tools select#organization").change(function() {
    importRoleToggle($(this));
    importSeatToggle($(this));
  });

  // Identity : Import Seat Select Toggle //
  function importSeatSelectToggle(s) {
    if ($(s).find('option:selected').hasClass('req_seats')) {
        $(s).parents('form').find('#import_seat_select #seat').removeAttr("disabled");
    } else {
        $(s).parents('form').find('#import_seat_select #seat').val('');
        $(s).parents('form').find('#import_seat_select #seat').attr("disabled", "disabled");
    }
  }
  importSeatSelectToggle('#support.admin_tools #import_role_select select');
  $("#support.admin_tools #import_role_select select").change(function() {
    importSeatSelectToggle($(this));
  });

  // Identity : Org Details District Subdistrict Toggle //
  $('div#create_organization div.org_type_school_toggle').hide();
  $('input[name=org_type]').change(function() {
    if ($(this)[0].id == "org_type_school" || $(this)[0].id == "org_type_standard") {
        if ($(this).id == "org_type_school") {
            $(this).parents('form').find('.org_type_school_toggle').show();
        }
    } else {
        $(this).parents('form').find('.org_type_school_toggle').hide();
    }
  });

     /* organization validation */

    $("#info_tool_entry_identifier_doi").on('change keypress keydown',function(){
        var form_val = $(this).val();
        var form = $(this);
        var doi_prefix = $("#cg_document_identifier_doi").val();
        var doi_prefix_val = $("#cg_document_identifier_doi").val().length
        if (form_val.length >= doi_prefix_val && doi_prefix != form_val.substr(0, doi_prefix_val)){
            form.attr('class', 'error');
            $('.item p.error').show();
            $("#info_tool_entry_identifier .content .controls button[type='submit']").attr('disabled', 'disabled');
        }else{
            form.removeClass('error');
            $('.item p.error').hide();
            $("#info_tool_entry_identifier .content .controls button[type='submit']").removeAttr("disabled");
        }
    });

    $("#info_tool_entry_range_start, #info_tool_entry_range_end").keyup(function (e) {
        var startRange = $("#info_tool_entry_range_start").val();
        var endRange = $("#info_tool_entry_range_end").val();
        if(startRange && endRange) {
            var extent = (endRange - startRange) + 1;
            $("#info_tool_entry_hidden_extent").val(extent);
            $("#info_tool_entry_extent .details p").text(extent + " Pages")
        }
    });

    $("#cg_document_work_published_at").live("change",function (e) {
        var date = $(this).val().split(", ")[1];
        $("#journal_published_hidden_year").val(date);
        $("#info_tool_entry_year .details li").text(date);
    });

    $("#create_organization #controls button[type='submit'],#edit_organization button[type='submit'], #create_institution #controls button[type='submit'], #edit_institution button[type='submit']").on('click',function(e){
        e.preventDefault();
        var url = $(this).parents('form').attr('action');
        var edit_id = $(this).parents('form').attr('id');
        var form_data = $(this).parents('form');
            $.ajax({
                type: "post"||"put",
                url: url,
                data: form_data.serialize(),
                success: function (response) {
                    if (edit_id == "edit_organization"){
                        location.href = response.url;
                    } else {
                        location.href = response.url;
                    }
                },
                error: function (response) {
                    var field_id ;
                    if (edit_id == "new_institution"){
                        field_id = "#institution_"
                    }else{
                        field_id = "#organization_"
                    }
                    $(window).scrollTop(0);
                    var result = $.parseJSON(response.responseText);
                    $.each(result, function(key, value) {
                         var field = $(field_id + key);
                         field.addClass('required error');
                         flash_message(field, value);
                    });
                }
            });

    });


    function flash_message(field, default_msg){
        var $div = $("<div>",{class: 'errors'});
        field.parent().append($div.html(default_msg[0]));
        setTimeout(function() {
            field.parent().find(".errors").hide();
        }, 3000);
    }

  // Identity Toggle //
  $("#support.admin_tools .block .block_content").hide();
  $("#support.admin_tools .block.open .block_content").show();
  $("#support.admin_tools .block h3.toggle").live("click", function() {
      $(this).parent(".block").toggleClass("open");
      $(this).parent(".block").find(".block_content").toggle();
      return false;
  });


  function loadOrgMembersTable(element, table, requested_page, limit) {
    if(element.length) {
        var prevLink = element.parents("div.table_pager").find("a.prev");
        var nextLink = element.parents("div.table_pager").find("a.next");
        var url = element.parents("div.table_pager").attr("path");
        var role_type = table.attr("id");

        $.ajax({
            type: "Get",
            data: {role_type: role_type, page: requested_page, limit: limit},
            url: url,
            processAjaxOnInit: true,
            success: function (data) {
                if (data["org_members"] != null) {
                    table.find("tbody").html(data["org_members"]);
                    prevLink.attr('page', data["page"] - 1);
                    nextLink.attr('page', data["page"] + 1);
                }
            },
            complete: function () {
                element.removeClass("loading");
            },
            error: function (request, textStatus, errorThrown) {
                handleAjaxError(request.status, {
                    500: "A server error occurred while loading organization members.",
                    base: "An error occurred while loading organization members."
                });
            }
        })
    }
  };

  // Admin Organization Members table display limit
  $("div.org_members div.table_pager select.limit").change(function(e){
    var element = $(this);
    var limit = $(this).val();
    var requested_page = 1;
    var table = element.parents("div.org_members").find("table.org_members");

    loadOrgMembersTable(element, table, requested_page, limit);
    return false;
  });
  var table_sort_ids = ['User', 'Student', 'Teacher', 'PublishingAdmin', 'OrganizationAdmin']
    $.each(table_sort_ids, function( index, value ) {
        loadOrgMembersTable($("div.org_members div.table_pager select#"+value+".limit"), $("div.org_members div.table_pager select#"+value+".limit").parents("div.org_members").find("table.org_members"), 1, 10);
    });

  // Admin Organization Members table Prev/Next buttons for paging
  $("div.org_members div.table_pager").on("click", "a.prev,a.next", function(e){
    e.preventDefault();
    var element = $(this);
    var limit = element.parents("div.table_pager").find("select :selected").val();
    var prev_or_next = element.attr("class");
    var requested_page = element.attr("page");
    var table = element.parents("div.org_members").find("table.org_members");

    // cannot request previous to page 1
    if(requested_page <= 0) {
      return false;
    }
    // catch 90%+ of last page here (rather than tracking it with more service calls)
    if(prev_or_next == 'next' && table.find('tr').length < limit) {
      return false;
    }
    //element.addClass("loading");

    loadOrgMembersTable(element, table, requested_page, limit);
    return false;
  });

  $("#support.admin_tools #controls .toggle_content").live('click', function() {
    var parent = $(this).parents('#controls');
    var target = $(this).attr('href').replace('#', '');
    parent.find("> div").hide();
    parent.find("> div#" + target).show();
    return false;
  });
  $("#support.admin_tools #controls .toggle_content_reset").live('click', function() {
    var parent = $(this).parents("#controls");
    $(this).parents("div").find("input").val("").formHint();
    $("#controls").formHint();
    parent.find("> div").hide();
    parent.find("> div:first-child").show();
    return false;
  });

 $('.cycle').cycle({
        fx: 'scrollHorz',
        speed: 300,
        timeout: 0,
        next: '.cycle_controls .next a',
        prev: '.cycle_controls .previous a',
        pager: '.cycle_controls .pager'
    });

// COMMUNITY //


  // Community : Entries Tools Toggle //
  $('#community #primary #entries_list_tools_toggle').click(function() {
    $(this).parents('#primary').find('.entries_list_tools').slideToggle(50);
    return false;
  });

  // Community : Updates, Shares, Submissions Form Hidden Field Toggle //
  $('#community #primary.updates form #update_update_title, #community #primary.shares form #add_share_title, #community #primary.submissions form #add_submission_community, #community #primary.submissions form #add_submission_title').bind("click change", function() {
    $(this).parents('form').find('.hidden_content').fadeIn(150);
  });

  $("#community #primary.updates form .controls button[type='reset'], #community #primary.shares form .controls button[type='reset']").click(function() {
   	var form = $(this).parents('form').validate();
   	form.resetForm();
    $(this).parents('form').find('.hidden_content').hide();
  });

  // Community : Updates, Shares, Submissions File/URL Upload Toggle //
  $('#community #primary.shares form .file_url a.toggle, #community #primary.about form .file_url a.toggle, #community #primary.submissions form .file_url a.toggle').click(function() {
    $(this).parents('.file_url').find('div.toggle_content').toggle();
    $(this).parents('.file_url').find('div input').removeClass('error').toggleClass('required');
    return false;
  });

  // Community : Entry Toggles //
  $("#community .entries > li > .options li a").live('click', function() {
    /*
    Right now we are following the wireframes in terms of whether to use Ajax or loading a new page.
    All the edit logic and delete confirmation logic in wireframe loads new pages. In this context,
    the current wireframe based jquery event is based on the expectation that stuff like delete,
    experience edit etc is done via ajax style and hides the view element and replaces with the edit element.

    We had to change this code to stop the hiding part for update edit / update delete (inside individual view update delete
    option) since they take the user to the new page and in between hiding the element looks ugly.
    */
    var IsThisAnUpdateEditButton = false;
    var isUserClickingAnyEditButton = $(this).attr("class").indexOf("edit") != -1;
    if (isUserClickingAnyEditButton) {
        IsThisAnUpdateEditButton = $(this).parents(".updates").size() > 0;
    } else {
        console.log($(this) + " NOT A EDIT BUTTON" );
    }
    if (IsThisAnUpdateEditButton == false){
        var parent = $(this).parents('.entries > li');
        var target = $(this).attr('href').replace('#', '');
        parent.find("> div").hide();
        parent.find("> div." + target).show();
        return false;
    }
  });

  $('#community .entries > li > div button[type="reset"]').live('click', function() {
    var parent = $(this).parents('.entries > li');
    parent.find("> div").hide();
    parent.find("> div:first").show();
  });

  // Community : About Manage Resume Toggle //
  $('#community #primary.about .mod_title #manage_resume_toggle').click(function() {
    $('#community #primary.about #manage_resume').slideToggle(80);
    return false;
  });

  // Community : About Add Entries //
  $("#community #primary.about .add_entry_toggle, .add_entry_toggle").live('click', function() {
    var target = $(this).attr('href').replace('#', '');
    $(this).parents('#primary').find("div#add_entry_" + target).slideToggle(80);
    return false;
  });

  $("#community #primary.about .add_entry .controls button[type='reset']").live('click', function() {
    $(this).parents('.add_entry').hide();
  });

  $("#community #primary.about form .end_date_toggle").live('click', function() {
    if ($(this).is(":checked")) {
      $(this).parents('form').find('select.end_date').attr("disabled", true).removeClass('required');
    } else {
      $(this).parents('form').find('select.end_date').removeAttr("disabled").addClass('required');
    }
  });

  // Community : Init Blip Character Counter - Requires Character Counter plugin //
  $("#edit_blip").dodosTextCounter('140', {addLineBreak:false});

// CREATOR & PUBLISHER //

  // Creator & Publisher : Fix For Webkit Overflow:Hidden Select Scroll Bug //
    $('#creator_publisher #wrapper').scroll(function() {
         $('#creator_publisher #wrapper').scrollTop(0);
    });


  // Creator & Publisher : Resizable Workspace //
  var drag = 0;
  $('#drag_handle').mousedown(function(e) {
    e.preventDefault(); //This prevents other actions during resize
    $('#drag_handle').addClass('active');
    $('body').css('cursor', 'col-resize');
    $(document).mousemove(function(e) {
      //Determine width of browser and skirts
      drag = 1;
      var browserWidth = $(window).width();
      var skirtWidth = (browserWidth - 960) / 2;
      if (skirtWidth < 0) {
        skirtWidth = 0;
      }
      //Determine new widths
      var workspaceWidth = e.pageX + 1 - skirtWidth; //Note: Adjusted -1px for FF Zoom Bug
      var sidebarWidth = skirtWidth + 960 - e.pageX - 3;
      //Snapping
      if (sidebarWidth < 240) {
        workspaceWidth = 959;
        sidebarWidth = 0;
        $('#sidebar .wrapper').hide();
        $('#drag_handle').addClass('snap_right')
      } else {
        $('#sidebar .wrapper').show();
        $('#drag_handle').removeClass('snap_right')
      }
      if (sidebarWidth > 640) {
        workspaceWidth = 0;
        sidebarWidth = 959;
        $('#workspace .wrapper').hide();
        $('#drag_handle').addClass('snap_left')
      } else {
        $('#workspace .wrapper').show();
        $('#drag_handle').removeClass('snap_left')
      }
      //This sets the new widths of the columns
      $('#workspace').css('width', workspaceWidth + 'px');
      $('#sidebar').css('width', sidebarWidth + 'px');
      $('#workspace h2.title').css('width', workspaceWidth - 200 + 'px');
      chosenCustomResize(); //This resizes any select boxes that are using the jQuery chosen plugin
    })
  });
  // Click Reset
  $('#drag_handle').mouseup(function(e) {
    if (drag == 0){
        $('#drag_handle').removeClass('snap_left snap_right');
        $('#workspace .wrapper, #sidebar .wrapper').show();
        $('#workspace').css('width', '639px');
        $('#workspace h2.title').css('width', '440px');
        $('#sidebar').css('width', '319px');
        chosenCustomResize(); //This resizes any select boxes that are using the jQuery chosen plugin
    }
  });
  // Unbind
  $(document).mouseup(function(e) {
    drag = 0;
    $(document).unbind('mousemove');
    $('#drag_handle').removeClass('active');
    $('body').css('cursor', 'auto');
  });


  // Publisher : Project Setup Advanced Settings //
  $("#creator_publisher #workspace #content .advanced_settings .item").hide();
  $("#creator_publisher #workspace #content .advanced_settings .advanced_settings_toggle").click(function() {
      $(this).parent(".advanced_settings").find(".item").toggle();
      return false;
  });

  // Publisher : Project Setup Feature Buttons //
  $("#creator_publisher #workspace #content .item.feature_buttons .feature_button").click(function() {
    var request_obj = $(this).parents('form#new_cg_project_publisher_project').find('#request_id').length;
    var value = $(this).attr('value');
    if((request_obj && value == 'multi_work')){
        displayAlert("Sorry You can't change the work type because it's a creator requested project", "negative");
    }else{
        $(this).parents(".feature_buttons").find(".feature_button").removeClass("selected");
        $(this).parents(".feature_buttons").find("input").removeAttr('checked');
        $(this).addClass("selected");
        $(this).find("input").attr('checked', 'checked');
        return false;
    }
  });

  // Publisher : Block Toggle //
  $("#creator_publisher #workspace #content .block .block_content").hide();
  $("#creator_publisher #workspace #content .block.open .block_content").show();
  $("#creator_publisher #workspace #content .block h4.toggle").live("click", function() {
      $(this).parent(".block").toggleClass("open");
      $(this).parent(".block").find(".block_content").toggle();
      return false;
  });


  // Publisher : Block Innerblock Toggle //
  $("#creator_publisher #workspace #content .block .block_content > div").hide();
  $("#creator_publisher #workspace #content .block").find(".block_content > div:not(.do_not_show):first").show();
  $("#creator_publisher #workspace #content .block .block_content a.block_content_toggle").live("click", function() {
      if ($(this).hasClass("disabled")) {
        return false;
      } else {
        var parent = $(this).parents('.block_content');
        var target = $(this).attr('href').replace('#', '');
        parent.find("> div").hide();
        parent.find("> div#" + target).show();
        var hrefAttr = $(this).attr("href");

        if(hrefAttr == "#remove_contributor" || hrefAttr == "#request_resubmit"){
          var name = $(this).parents("tr").find("td[headers='contributor']").text();
          var id = $(this).parents("tr").find("td[headers='contributor']").attr("user_id");
          var name_span = $("span" + hrefAttr + "_name");
          name_span.text(name);
          $("div" + hrefAttr + " input#user_id").val(id);
        } else if(hrefAttr == "#deactivate_work"){
          var workId = $(this).attr('work_id');
          var workName = $(this).parents("tr").find("td")[0].innerText;
          $("span" + hrefAttr + "_name").text(workName);
          $("div#deactivate_work input#work_id").val(workId);
        } else if(hrefAttr == "#unpublish_version"){
            var versionId = $(this).attr('version_id');
            var versionTitle = $(this).parents("tr").find("td")[0].innerText;
            $("span" + hrefAttr + "_name").text(versionTitle);
            $("div#unpublish_version input#version_id").val(versionId);

        }
        return false;
      }
  });
  $("#creator_publisher #workspace #content .block .block_content a.disabled").click(function() {
    return false;
  });
  $('#creator_publisher #workspace #content .block .block_content button[type="reset"]').live('click', function() {
    var parent = $(this).parents('.block_content');
    parent.find("> div").hide();
    parent.find("> div:not(.do_not_show):first").show();
  });

  // Publisher : Status Block Content Toggle //
  $("#creator_publisher #workspace #content .status_block .block_content, #creator_publisher #workspace #content .status_block .block_content > div").hide();
  $("#creator_publisher #workspace #content .status_block a.toggle").live('click', function() {
    var parent = $(this).parents('.status_block');
    var target = $(this).attr('href').replace('#', '');
    parent.find(".options").hide();
    parent.find(".block_content").show();
    parent.find("#" + target).show();
    return false;
  });

  $('#creator_publisher #workspace #content .status_block .block_content button[type="reset"]').live('click', function() {
    var parent = $(this).parents('.status_block');
    parent.find(".block_content").hide();
    parent.find(".block_content > div").hide();
    parent.find(".options").show();
  });

  // Publisher : Status Block Content Edit Timeline Toggle //
  $("#creator_publisher #workspace #content .hidden_content").hide();
  $("#creator_publisher #workspace #content .hidden_content_toggle").click(function() {
      $(this).parent("div").find(".hidden_content").toggle();
      return false;
  });

  // Publisher : Controls Confirmation Toggle //
  $("#creator_publisher #workspace #controls .confirmation_toggle .button").live('click', function() {
    $(this).parents(".confirmation_toggle").hide();
    $(this).parents("#controls").find(".confirmation").show();
    return false;
  });
  $("#creator_publisher #workspace #controls .confirmation .reset").live('click', function() {
    $(this).parents(".confirmation").hide();
    $(this).parents("#controls").find(".confirmation_toggle").show();
    return false;
  });
  // Publisher : Publisher Project Table Show Filter //
  $("#projects_show").change(function() {
    var value = $(this).val();
    var target = $(this).parents('.table_nav').next('table');
    publisher_show_table_filter(value, target);
  });
  $("#projects_show").trigger(jQuery.Event("change"));
  $("#active_projects").change(function() {
    var value = $(this).val();
    var target = $("#active_projects").parents("#active_projects_listing").children("table");
    publisher_show_table_filter(value, target);
  });


    $("#active_closed_listing_show").change(function() {
        var value = $(this).val();
        var target = $("#active_closed_listing_show").parents("#active_closed_listing").children("table");
        publisher_show_table_filter(value,target);
    });




  $("#active_projects").trigger(jQuery.Event("change"));
  $("#closed_projects").change(function() {
    var value = $(this).val();
    var target = $("#closed_projects").parents("#closed_projects_listing").children("table");
    publisher_show_table_filter(value, target);
  });
  $("#closed_projects").trigger(jQuery.Event("change"));
  function publisher_show_table_filter(value, target){
    if (value == 'all_projects') {
      rows_to_show(target, "", false);
    } else if (value == "open_projects") {
      rows_to_show(target, "open");
    } else if (value == 'archived_projects') {
      rows_to_show(target, "archived");
    } else if (value == 'canceled_projects') {
      rows_to_show(target, "canceled");
    } else if (value == 'overdue_projects') {
      rows_to_show(target, "overdue");
    } else if (value == 'complete_projects') {
      rows_to_show(target, "complete");
    } else if (value == 'not_started_projects') {
      rows_to_show(target, "not_started")
    }
  }
  function rows_to_show(target, class_name, hide_first) {
    // this is the ugly ass way you do default parameter values in js
    hide_first = typeof hide_first !== 'undefined' ? hide_first : true;
    if (hide_first) {
      target.find('tbody tr').hide();
    }
    if (class_name) {
      target.find('tbody tr.' + class_name).show();
    } else {
      target.find('tbody tr').show();
    }
  }
  // Creator & Publisher : Module Title Toggle //
  $("#workspace #current_work .mod_title").click(function() {
    var parent = $(this).parent();
    if (parent.hasClass("active")) {
      parent.removeClass("active");
      parent.find(".mod_body").slideUp(100);
    } else {
      $("#workspace .mod").removeClass("active");
      parent.addClass("active");
      $("#workspace .mod_body").slideUp(100);
      parent.find(".mod_body").slideDown(100);
    }
    return false;
  });

  // Creator & Publisher : Module Intro Toggle //
  $(".mod .mod_body .mod_content .mod_intro a.toggle").click(function() {
    var parent = $(this).parents(".mod_intro");
    parent.find("> .content").slideToggle(150);
    return false;
  });

  // Creator & Publisher : Module Controls //
  $(".mod .mod_body .mod_content .mod_content_controls li a").click(function() {
    var parent = $(this).parents('.mod_content');
    var target = $(this).attr('href').replace('#', '');

    if (target == "toggle") {
      if ($(this).hasClass("active")) {
        var parent = $(this).parents('.mod_content').find('.mod_list > li');
        $(this).removeClass("active");
        parent.removeClass("active");
        parent.find(".content").hide();
        parent.find(".content > div").hide();
        parent.find(".content > div:first").show();
      } else {
        var parent = $(this).parents('.mod_content').find('.mod_list > li');
        $(this).addClass("active");
        parent.addClass("active");
        parent.find(".content").show();
      }
    }
    if (target == "filter") {
      parent.find(".mod_filter").slideToggle(100);
    }
    return false;
  });

  $(".mod .mod_body .mod_content .mod_content_controls li a").live('click', function() {
    var parent = $(this).parents('.mod_content');
    var target = $(this).attr('href').replace('#', '');

    if (target == "toggle") {
      if ($(this).hasClass("active")) {
        var parent = $(this).parents('.mod_content').find('.mod_list > li');
        $(this).removeClass("active");
        parent.removeClass("active");
        parent.find(".content").hide();
        parent.find(".content > div").hide();
        parent.find(".content > div:first").show();
      } else {
        var parent = $(this).parents('.mod_content').find('.mod_list > li');
        $(this).addClass("active");
        parent.addClass("active");
        parent.find(".content").show();
      }
    }
    if (target == "filter") {
      parent.find(".mod_filter").slideToggle(100);
    }
    return false;
  });


  // Creator & Publisher : Module List Toggle //
  var showHide = function(e) {
    var parent = $(this).parents('.mod_list > li');
    if (parent.hasClass("active")) {
      parent.removeClass("active");
      parent.find(".content").hide();
      parent.find(".content > div").hide();
      parent.find(".content > div:first").show();
    } else {
      parent.addClass("active");
      parent.find(".content").show();
    }
    return false;
  };

  var stopPropagation = function(e) {
    e.stopPropagation();
  };

  $(".mod_list li.toggle h4").click(showHide);
  $(".mod_list li.toggle h4 a").click(stopPropagation);

  // Doing this globally breaks structure tool;
  // not sure why.  For now, limit 'live' to
  // specific tools only.
  $("#checker_tool .mod_list li.toggle h4").live('click', showHide);
  $("#annotations_tool .mod_list li.toggle h4, #done_annotation .mod_list li.toggle h4, #pending_annotation .mod_list li.toggle h4").live('click', showHide);
  $("#annotations_tool .mod_list li.toggle h4 a, #done_annotation .mod_list li.toggle h4 a, #pending_annotation .mod_list li.toggle h4 a").live('click', showHide);
  $("#annotations_tool .mod_list li.toggle h4 a, #done_annotation .mod_list li.toggle h4 a, #pending_annotation .mod_list li.toggle h4 a").click(showHide);
  $("#info_tool .mod_list li.toggle h4").live('click', showHide);
  $("#info_tool .mod_list li.toggle h4 a").live('click', stopPropagation);
  $("#review_formats_tool .mod_list li.toggle h4").live('click', showHide);
  $("#review_formats_tool .mod_list li.toggle h4 a").live('click', stopPropagation);
  $("#members_tool .mod_list li.toggle h4").live('click', showHide);
  $("#members_tool .mod_list li.toggle h4 a").live('click', stopPropagation);
  $("#member_groups_tool .mod_list li.toggle h4").live('click', showHide);
  $("#member_groups_tool .mod_list li.toggle h4 a").live('click', stopPropagation);
  $("#works_tool .mod_list li.toggle h4").live('click', showHide);
  $("#works_tool .mod_list li.toggle h4 a").live('click', stopPropagation);
  $("#dialogue_tool .mod_list li.toggle h4").live('click', showHide);
  $("#dialogue_tool .mod_list li.toggle h4 a").live('click', stopPropagation);
  $("#creators_tool .mod_list li.toggle h4").live('click', showHide);

  // Creator & Publisher : Module List Form Cancel //
  $('.mod_list button[type="reset"]').live('click', function() {
    var parent = $(this).parents('.mod_list > li');
    if (parent.hasClass("toggle")) {
      parent.find(".content > div").hide();
      parent.find(".content > div:first").show();
    }
    if ($(this).parents('.mod_content').is("#structure")) {
      parent.find(".content").hide();
    } else {
      parent.removeClass("active");
      parent.find(".content").hide();
      parent.find(".content > div").hide();
      parent.find(".content > div:first").show();
    }
    return false;
  });

  $('.mod_list button[type="reset"]').click(function() {
    var parent = $(this).parents('.mod_list > li');
    if (parent.hasClass("toggle")) {
      parent.find(".content > div").hide();
      parent.find(".content > div:first").show();
    }
    if ($(this).parents('.mod_content').is("#structure")) {
      parent.find(".content").hide();
    } else {
      parent.removeClass("active");
      parent.find(".content").hide();
      parent.find(".content > div").hide();
      parent.find(".content > div:first").show();
    }
    return false;
  });


  // Creator & Publisher : Module List Options - Note: The move conditional is specific to structure. //
  $(".mod .mod_body .mod_content .mod_list > li > .options li a, .mod .mod_body .mod_content .mod_list > li .tags li a.add_tag").live('click', function() {
    var parent = $(this).parents('.mod_list > li');
    var href = $(this).attr('href'), target;

    if( href[0] === '#' ) {
      target = href.replace('#', '');
    }

    if (target) {
      parent.find(".content > div").hide();
      parent.find(".content > div." + target).show();
    }

    if (target == 'move' || $(this).hasClass('no_toggle')) {
      return false;
    } else if (!$(this).hasClass('annotation') && !parent.hasClass("active")) {
      parent.addClass("active");
      parent.find(".content").show();
    }
    return false;
  });


  // Creator & Publisher : Module List Hidden Content Toggle //
  $(".mod .mod_body .mod_content .mod_list > li div a.content_toggle").live('click', function() {
    var parent = $(this).parents('.mod_list > li div');
    $(this).toggleClass('open');
    parent.find(".hidden_content").toggle();
    return false;
  });


  window.all_works_loaded = false;

  window.loadAllWorks = function(parent, filter_value){
    var url = $("option[value='all_works']").attr('url');
    var role_type = "role_type=" + filter_value;
    $("#works_tool .loading_content").show();
    $("#works select").attr("disabled", "disabled");
    $.ajax({
      type: "GET",
      url: url,
      data: role_type,
      success: function(html){
        $("#works_tool > ul.mod_list").html(html);
        worksToolIds.reapply();
        setUpTagData();
      },
      error: function(request, textStatus, errorThrown){
        all_works_loaded = false;
        handleAjaxError(request.status, {
          500: "A server error occurred while loading your works.",
          base: "An error occurred while loading your works."
        });
      },
      complete: function(){
        $("#works_tool .loading_content").hide();
        $("#works select").removeAttr("disabled");
        // show_filtered_works(parent, filter_value);
        applyTagFilter(parent.find(".mod_list_filter[name=tag_filter]"), false);
      }
    });
  };

  $("#works .mod_nav_filter").change(function() {
    all_works_filter(this);
  });

  // Creator & Publisher : Works/Versions List Tag Filtering //
  $(".mod_list_filter[name=tag_filter]").change(function() {
    applyTagFilter(this, false);
  });

  // Creator & Publisher : Info Tool Hidden Fields Toggles //
  $("#info_toolgroup input.toggle_hidden_fields").live('click', function() {
    if ($(this).is(":checked")) {
      $(this).parents('.item').find('.hidden_fields').show();
    } else {
      $(this).parents('.item').find('.hidden_fields').hide();
    }
  });
    $("#content .status_block .options a.button.alert.toggle").click(function(e){
     var value = $(this).attr('href');
     if (value == "#send_reminder") {
         return true
     }
     else {
         return false
     }
    });

  // Creator & Publisher : Review List Toggle //
    review();
    function review(){
        $('#review_view_tool_availble_reviews option').each(function(index){
            if(this.selected == true) {
                review_status(this);
            }
        });
    }
    function review_status(review){
        var value = $(review).val();
        var parent = $(review).parents('.ajax_wrapper');
        parent.find(".mod_list").hide();
        parent.find(".mod_list[name='" + value + "']").show();
        parent.find(".mod_list.overall_feedback").show();
        parent.find(".confidential_comments").show();
    }
  $(".mod_list_toggle").live("change", function() {
      review_status(this);
  });

  // Creator & Publisher : Creator Submit Review Sliders - Requires jQuery UI //
  $("form .slider").each(function() {
    var name = $(this).attr('name');
    var max_option = $(this).attr('value');
    var start_val = $(this).find('.slider_count .setting').attr('value');
    $("#slider_" + name).slider({
      range: "min",
      min: 0,
      max: max_option,
      step: 1,
      value: start_val,
      slide: function(event, ui) {
        $(".slider_count[name='" + name + "'] input").val(ui.value);
      }
    });
  });


  // Creator & Publisher : Tool Controls Toggle Used for Staus, Dialogue, etc. //
  $(".mod_content .controls.toggle .hidden_content_toggle").live('click', function() {
    $(".mod_content .controls.toggle .hidden_content").show();
    $(".mod_content .controls.toggle .hidden_content_toggle").hide();
    return false;
  });

    $(".mod_content .reject_button.hidden_content_toggle").live('click', function() {
        $(this).hide();
        $(".mod_content .reject_form.hidden_content").show();
        $(".mod_content #with_peer_feedback").hide();
        $(".mod_content #without_peer_feedback").hide();
    });

    $("#creator_publisher #share_tool .unshare.hidden_content_toggle").live('click', function () {
        $('#share_tool h3.title').hide();
        $(this).parent().find('p.info').hide();
        $(this).parent().find('p.unshare').hide();
        $(this).hide();
        $("#creator_publisher #share_tool .unshare.hidden_content").show();
    });

    $("#creator_publisher #share_tool .unshare.hidden_content #cancel").live('click', function(){
        $("#creator_publisher #share_tool .unshare.hidden_content").hide();
        $("#creator_publisher #share_tool .unshare.hidden_content").parent().find('p.info').show();
        $("#creator_publisher #share_tool .unshare.hidden_content").parent().find('p.unshare').show();
        $("#creator_publisher #share_tool h3.title").show();
        $("#creator_publisher #share_tool .unshare.hidden_content_toggle").show();
    });

    $("#creator_publisher #publish_tool .unpublish.hidden_content_toggle").live('click', function(){
        $(this).parent().find('p.info').hide();
        $(this).parent().find('.bookstore_path').hide();
        $(this).parent().find('#publish_bookstore').hide();
        $(this).hide();
        $("#creator_publisher #publish_tool .unpublish.hidden_content").show();
    });

    $("#creator_publisher #publish_tool .unpublish.hidden_content #cancel").live('click', function(){
        $("#creator_publisher #publish_tool .unpublish.hidden_content").hide();
        $("#creator_publisher #publish_tool .unpublish.hidden_content").parent().find('p.info').show();
        $("#creator_publisher #publish_tool .unpublish.hidden_content").parent().find('.bookstore_path').show();
        $("#creator_publisher #publish_tool .unpublish.hidden_content").parent().find('#publish_bookstore').show();
        $("#creator_publisher #publish_tool .unpublish.hidden_content_toggle").show();
    });

    $("#creator_publisher #publish_tool .republish.hidden_content_toggle").live('click', function(){
        $(this).parent().find('p.info').hide();
        $(this).hide();
        $("#creator_publisher #publish_tool .republish.hidden_content").show();
    });

    $("#creator_publisher #publish_tool .republish.hidden_content #cancel").live('click', function(){
        $("#creator_publisher #publish_tool .republish.hidden_content").hide();
        $("#creator_publisher #publish_tool .republish.hidden_content").parent().find('p.info').show()
        $("#creator_publisher #publish_tool .republish.hidden_content_toggle").show();
    });


    $(".mod_content .reject_form.hidden_content button[type='reset']").live('click', function(){
        $(".mod_content .reject_form.hidden_content").hide();
        $(".mod_content #with_peer_feedback").show();
        $(".mod_content #without_peer_feedback").show();
    });

    $('input[name="publish_through"]').change(function() {
        var selected = $('input:checked[name="publish_through"]').val();
        if(selected == '0') {
            $('.create_project').hide();
            $('.find_publisher').hide();
            $('#communities_chzn').hide();
            $('#collections_chzn').hide();
            $('#with_peer_feedback .reject_button').hide();
            $("#proceed_to_feedback").hide();
            $('#accept_revision').show();
            $('#without_peer_feedback .reject_button').show();
        } else if(selected == '1') {
            $('#accept_revision').hide();
            $('#without_peer_feedback .reject_button').hide();
            $('.find_publisher').show();
            $('.create_project').show();
            $("#proceed_to_feedback").show();
            $('#with_peer_feedback .reject_button').show();
            if($('#publish_to_community').attr('checked')){
                $('#publish_to_community').attr('checked', false);
            }
        }
    });

    $("#creator_publisher .mod input[type=checkbox]").live('click', function() {
        if ($('#publish_to_community').is(':checked')){
            $('#communities_chzn').show();
        }
        else{
            $('#communities_chzn').hide();
        }
    });

    $("#info_toolgroup #share_tool input[type=checkbox]").live('click', function() {
        if ($('#share_to_community_member').is(':checked')){
            $('#share_communities_members_chzn').show();
        }
        else{
            $('#share_communities_members_chzn').hide();
        }
    });

    $("#info_toolgroup #share_tool input[type=checkbox]").live('click', function() {
        if ($('#share_to_community_admin').is(':checked')){
            $('#share_communities_admins_chzn').show();
        }
        else{
            $('#share_communities_admins_chzn').hide();
        }
    });

    $("#publish_to_bookstore").live('click', function() {
        if($('#publish_to_bookstore').is(':checked')){
            $('#collection').show();
        }else{
            $('#collection').hide();
            $('#collection').val('');
            $('#serie').hide();
            $('#subseries').hide();
        }
    });

    $("#publish_directly_bookstore, #publish_directly_community").live('click', function() {
        if($('#publish_directly_bookstore, #publish_directly_community').is(':checked')){
            $('#collection').show();
            $('#communities_chzn').show();
            $('#bookstore_publish').show();
            $('.unpublish.hidden_content_toggle').hide();
        }else{
            $('#collection').hide();
            $('#collection').val('');
            $('#communities_chzn').hide();
            $('#bookstore_publish').hide();
            $('.unpublish.hidden_content_toggle').show();
        }
    });


    $("#creator_publisher #publish_tool .item#project_with_peer_feedback .hidden_content_toggle").live('click', function() {
    $("#creator_publisher #publish_tool .item#project_with_peer_feedback .hidden_content").show();
    return false;
  });

  $("div.mod_block p a, p#alert a").live('click', function() {
       if ($('#sidebar #works .mod_body').css('display') == 'block') {
          $('#sidebar #works .mod_body').hide();
       }
       if ($('#sidebar #feedback .mod_body').css('display') == 'block') {
          $('#sidebar #feedback .mod_body').hide();
       }
       if ($('#sidebar #tools .mod_body').css('display') == 'none') {
          $('#sidebar #tools .mod_title').click();
       }
       if ($('#sidebar #tools #project_toolgroup').css('display') == 'none'){
          $('#sidebar #tools #project_toolgroup').show();
       }
       if($('#sidebar #tools .mod_nav li:first').hasClass('active') == false){
          $('#sidebar #tools .mod_nav li').removeClass('active');
          $('#sidebar #tools .mod_nav li:first').addClass('active');
       }
       if ($('#sidebar #tools .mod_toolgroup_nav li:last-child').hasClass('active') == false){
          $('#sidebar #tools').find('#dialogue_tool').click();
       }

  });

  $(".mod_content .controls.toggle form button[type='reset']").live('click', function() {
    $(".mod_content .controls.toggle form label.error").hide();
    $(".mod_content .controls.toggle form *").removeClass('error');
    $(".mod_content .controls.toggle .hidden_content").hide();
    $(".mod_content .controls.toggle .hidden_content_toggle").show();
  });

  // Creator & Publisher : Creator Annotations Form Toggles //
  $("#annotations_tool #annotations_tool_new_annotation .toggle_form").live('click', function() {
    var range = selectRange('element_body');
    if (range && range.range.toString().length > 1) {
      var cssApplier = rangy.createCssClassApplier("selected_for_annotation", true);
      $("#rangeData").data("range", range.range);
      $("#rangeData").data("element_id", range.element_id);
      cssApplier.applyToRange(range.range);
      $("#annotations_tool_new_annotation .hidden_content").show();
      $("#annotations_tool_new_annotation .toggle_form").hide();
      return false;

    }
    else {
      alert("Please select a valid region of the work");
    }
  });

  $("#annotations_tool #annotations_tool_new_annotation #annotations_tool_new_annotation_type").live('change', function() {
    var value = $(this).val();
    $('#annotations_tool_new_annotation form').hide();
    $("#annotations_tool_new_annotation #annotations_tool_new_annotation_" + value + "_form").show();
  });

  $("#annotations_tool #annotations_tool_new_annotation form button[type='reset']").live('click', function(e) {
    e.preventDefault();
    $("#annotations_tool_new_annotation form").hide();
    $("#annotations_tool_new_annotation form label.error").hide();
    $("#annotations_tool_new_annotation form *").removeClass('error');
    $("#annotations_tool_new_annotation form:first").show();
    $("#annotations_tool_new_annotation .hidden_content").hide();
    $("#annotations_tool_new_annotation .toggle_form").show();
    $("#annotations_tool_new_annotation #annotations_tool_new_annotation_type").val('comment');
    $("#annotations_tool_new_annotation textarea").val('').blur();
    $("#annotations_tool_new_annotation #cg_annotation_annotation_change_attributes_change_type_id").val('');

    var range = $("#rangeData").data("range");
    if (range) {
      var cssApplier = rangy.createCssClassApplier("selected_for_annotation", true);
      cssApplier.undoToRange(range);
    }
  });


  // Creator : Annotations List Options //
  $("#annotations_tool .mod_list .comment_thread li .options li a").live('click', function() {
    var parent = $(this).parents('.comment_thread > li');
    var target = $(this).attr('href').replace('#', '');

    if (target == 'star') {
      return true; //let the event bubble up
    } else {
      parent.find("div." + target).toggle();
    }
    return false;
  });

  $("#annotations_tool .mod_list .comment_thread div.flag button[type='reset']").click(function() {
    $(this).parents('div.flag').hide();
    return false;
  });


  // Creator & Publisher : Creator Submit Review Form Validation - Requires validate plugin //
  $("#review_submit_form").validate();
  $("#review_submit_form button").click(function() {
    $("#review_tool .mod_list > li").each(function() {
      if ($(this).find('textarea').hasClass('valid')) {
        $(this).removeClass('error');
        $(this).addClass('valid');
      } else {
        $(this).removeClass('valid');
        $(this).addClass('error');
      }
    });
  });


 // Creator & Publisher : Overlay List Filtering - Requires tinysort plugin //
  $("#overlay.notifications .list_nav_filter").change(function() {
    var value = $(this).val();
    // sort notifications
    if (value == "age" || value == "work") {
      if (value == "age") {
        $('.entries > li').tsort('.age', {order:"desc",attr:"value"});
      } else {
        $('.entries > li').tsort('h3');
      }
    } else { // filter notifications
      var moreLink = $("#overlay.notifications a.more");
      moreLink.addClass("loading");
      var query_data = "page=" + 1;
      if (value == "all_notifications") {
        $('.entries > li').remove();
        $.ajax({
            type: "Get",
            data: query_data,
            url: moreLink.attr("href"),
            success: function(data){
              $("#overlay.notifications ul#notifications").append(data.notifications);
              moreLink.attr('page', data.page);
              if (data.more) {
                moreLink.show();
              } else {
                moreLink.hide();
              }
            },
            complete: function(){
              moreLink.removeClass("loading");
            }
        });
      } else {
        $('.entries > li').hide();
        $('h2[value="' + value + '"]').parents('.entries > li').show();
        // get some data to pass to the notification service
        var filtered_count = $('.entries > li:visible').length;
        var last_notification = $('.entries > li:visible')[filtered_count - 1];
        var last_notification_id = -1;
        if (last_notification !== undefined) {
          last_notification_id = $(last_notification).attr('id').split('_')[1];
        }
        // var page = moreLink.attr("page");
        var page = 1;
        if (Math.ceil(filtered_count / 10) > 1) {
          page = Math.ceil(filtered_count / 10);
        }
        query_data = "page=" + page +
                     "&count=" + filtered_count +
                     "&filter=" + value +
                     "&last_id=" + last_notification_id;
        $.ajax({
            type: "Get",
            data: query_data,
            url: moreLink.attr("href"),
            success: function(data){
              $("#overlay.notifications ul#notifications").append(data.notifications);
              moreLink.attr('page', data.page);
              if (data.more) {
                moreLink.show();
              } else {
                moreLink.hide();
              }
            },
            complete: function(){
              moreLink.removeClass("loading");
            }
        });
      }
    }
  });

  // The 'More' button for notifications
  $("#overlay.notifications").on("click", "a.more", function(e){
    e.preventDefault();
    var moreLink = $("#overlay.notifications a.more");
    moreLink.addClass("loading");
    var query_data = "page=" + moreLink.attr("page");
    var value = $($("#overlay.notifications .list_nav_filter")[0]).val();
    var filtered_count = $('.entries > li:visible').length;
    if (value !== "all_notifications") {
        // get some data to pass to the notification service
        var last_notification = $('.entries > li:visible')[filtered_count - 1];
        var last_notification_id = -1;
        if (last_notification !== undefined) {
          last_notification_id = $(last_notification).attr('id').split('_')[1];
        }
        query_data = query_data +
                     "&count=" + filtered_count +
                     "&filter=" + value +
                     "&last_id=" + last_notification_id;
    } else {
        query_data = query_data +
                     "&count=" + filtered_count;
    }
    $.ajax({
      type: "Get",
      data: query_data,
      url: moreLink.attr("href"),
      success: function(data){
        $("#overlay.notifications ul#notifications").append(data.notifications);
        moreLink.attr('page', data.page);
        if (data.more) {
          moreLink.show();
        }
        else {
          moreLink.hide();
        }
      },
      complete: function(){
        moreLink.removeClass("loading");
      }
    });
  });
  // Infinite scrolling for notifications
  $("#overlay.notifications #overlay_content").scroll(function(){
    if ($('div#overlay_content .entries').length > 0) {
      var notifications = $('div#overlay_content .entries');
      var notification_end = notifications[0].scrollHeight + notifications.offset().top;
      var page_scroll = $(window).scrollTop()+$(window).height();
      var moreLink = $("#overlay.notifications a.more");
      if (notification_end <= page_scroll) {
        if (moreLink.is(":visible") && !moreLink.hasClass("loading")) {
            moreLink.trigger('click');
        }
      }
    }
  });


  $("#overlay.notifications #overlay_content .entries > li.link, " +
      "#overlay.notifications #overlay_content .entries > li a.button.link").live('click', function(){
    parent.location = $(this).attr('link');
    parent.Shadowbox.close();
  });

  $("div#annotations_tool .goto_project_status," +
	 "div#recommendation_tool .goto_project_status," +
	  "div#review_tool .goto_project_status").click(function(){
	$('#tools .mod_title').trigger('click');
	$('#tools .mod_body .mod_nav li a:first').trigger('click');
	$('#tools .mod_body #project_toolgroup .mod_toolgroup_nav ul li a:first').trigger('click');
  });

  $("#publish_tool .item button.go_to_dialogue, #info_toolgroup #rights_info_tool #go_to_dialogue").click(function(){
     $('#tools .mod_body .mod_nav ul li:first a').trigger('click');
     $("#project_toolgroup .mod_toolgroup_nav ul li:last a#dialogue_tool").trigger('click');
  });

  $("#publish_tool button.go_to_rights").click(function(){
      $('#tools .mod_body .mod_nav li:nth-child(2) a:first').trigger('click');
      $('#info_toolgroup #info_tool .right_info_tool').trigger('click');
  });

  function goToJointWork(work_url){
      parent.Shadowbox.close();
      $(window).location(work_url);
  }

  function deleteWorkRemovedFromProject(form_id){
      $(form_id).submit();
      parent.Shadowbox.close();
  }
    function triggerCommunitySelectListener(){
        $(".community_role_id").off('change').on('change', function (e) {
            e.preventDefault();
            $.ajax({
                type: "put",
                url: '/identity/admin/users/update_community_role?role='+$(this).val()+'&community='+$(this).data('communityid')+'&user='+$(this).data('userid'),
                contentType: "application/json",
                success: function(responseData, textStatus, jqXHR) {


                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        });
    }


    $('div.wrapper div#content div.status_block a.button.forward.toggle').live('click',function(){
        var class_name  = $('.block_content #release_feedback .item .standard_notification .standard_notification_text p').attr('class')
        if (class_name = "feedback_phase_config") {
            $('.block_content #release_feedback .item .standard_notification .standard_notification_text p').text("Please begin your revision now.");
        }
    });

  $("#overlay.notifications #overlay_content .entries > li a#start_with_new_project," +
  " #overlay.notifications #overlay_content .entries > li a#publication, " +
  " #overlay.notifications #overlay_content .overlay_content_existing_work .entries > li a#start_with_existing_work").live('click', function(){
    parent.location = $(this).attr('href');
    parent.Shadowbox.close();
    return false;
  });
    $('#overlay.notifications #overlay_content .entries > li .controls a.button#find_contributor').live('click', function(){
        parent.location = $(this).attr('href');
        parent.Shadowbox.close();
        return false;
    });

  $("#overlay #overlay_footer a.button#start_with_new_project_in_existing_works_list").live('click', function(){
    parent.parent.location = $(this).attr('href');
    parent.parent.Shadowbox.close();
    return false;
  });

  $("#overlay.text #overlay_content a").live('click', function(){
    parent.parent.location = $(this).attr('href');
    parent.parent.Shadowbox.close();
    return false;
  });

    $("div#overlay_footer_existing_work a.agreement_overlay_opener.button").live('click', function(){
        parent.parent.location = $(this).attr('href');
        parent.parent.Shadowbox.close();
        return false;
    });

  //Onclick working

    $("#overlay.message_thread #overlay_content ul.entries li.highlight .details h2 a, " +
    "#overlay.message_thread #overlay_content ul.entries li.highlight .details ul.metadata li.age a, " +
    "#overlay.message_thread #overlay_content .controls p.recipients a ," +
    "#overlay.message_thread #overlay_content li a").click(function(){
        var url_location  = $(this).attr('href');
        window.open(url_location,'_blank');
        return false;
    });

  //Onclick working
    $("#overlay div#overlay_content ul#notifications.entries a#view_work, #overlay div#overlay_content ul#notifications.entries a#reject_work," +
        " #overlay div#overlay_content ul#notifications.entries a#message_admin").click(function(){
        parent.location = $(this).attr('href');
        parent.Shadowbox.close();
        return false;
  });

  $("#overlay.notifications").on("click", "#overlay_content .entries li form .controls > .button", function(e){
    e.preventDefault();
    var button_actoin = $(this).attr("route")   
    var form = $(this).parents("form");
    form.find("input#route").val(button_actoin);

    $.ajax({
      type: "post",
      url: form.attr("action"),
      data: form.serialize(),
      timeout: 10000,
      async: false,
      success: function(data){
        form.find(".controls").html(data.message);
        if (button_actoin == 'decline') {
          $("#overlay.notifications #overlay_content .entries li .controls #community_invite").hide();
        }
        if(data.url){
          parent.location = data.url;
          parent.Shadowbox.close();
        }else if(data.warning_prompt){
            var li_tag = $("<li id='warning_prompt_"+ data.request_id + "' ></li>");
            var h2_tag = $("<h2>JOINING A SHARED WORK WITH CO-CREATOR(S)</h2>");
            var shared_work_button_title;
            if (data.delete_work_link){
                shared_work_button_title = 'Go to Shared Work and Keep Disconnected Work'
            }else{
                shared_work_button_title = 'Go to Shared Work'
            }
            var a_tag1 = $("<a href='"+ data.joint_work_delete_link+"' class='button' id = 'shared_work_delete_button'>Go to Shared Work and Delete Disconnected Work</a>");
            var a_tag2 = $("<a href='"+ data.joint_work_link+"' class='button' id = 'shared_work_keep_button'>"+ shared_work_button_title +"</a>");
            //var a_tag3 = $("<a href='"+ data.joint_work_link+"' class='button' id = 'shared_work_keep_button'></a>");
            li_tag.css({
                        "list-style": "none",
                        "padding": "15px",
                        "position": "relative",
                        "overflow": "hidden"
            });
            if(data.delete_work_link){
                li_tag.html(data.warning_prompt).prepend(h2_tag);
                li_tag.append(a_tag1);
                li_tag.append(a_tag2);
            } else {
                li_tag.html(data.warning_prompt_msg).prepend(h2_tag);
                li_tag.append(a_tag2);
            }
            li_tag.find('p').css({
                        "font-size": "11px",
                        "line-height": "15px",
                        "color": "#666",
                        "margin": "8px 0",
                        "padding": "0"
            });
            li_tag.find(".button").css({
                "font-family": "Arial, Helvetica, sans-serif",
                "font-size": "10px",
                "line-height": "10px",
                "color": "#333",
                "background": "#F6F6F6",
                "min-width": "intrinsic",
                "width": "auto",
                "min-width": "60px",
                "height": "15px",
                "padding": "5px 10px 0 10px",
                "margin": "0 4px 0 0",
                "border": "1px solid #CCC",
                "background-image": "-webkit-gradient(linear, left bottom, left top, color-stop(0.1, rgb(230,230,230)), color-stop(0.7, rgb(246,246,246)))",
                "background-image": "-moz-linear-gradient(center bottom, rgb(230,230,230) 10%, rgb(246,246,246) 70%)"
            });

            li_tag.find('h2').css({
                "color": "#FF6400",
                "font-size": "10px",
                "line-height": "12px",
                "text-transform": "uppercase",
                "margin": "0 0 8px 0",
                "padding": "0"
            });
            if(data.delete_work_link){
                Shadowbox.open({
                    player:     'html',
                    content:    li_tag.wrap('<div/>').parent().html(),
                    height:     160,
                    width:      780
                });
            }else{
                Shadowbox.open({
                    player:     'html',
                    content:    li_tag.wrap('<div/>').parent().html(),
                    height:     110,
                    width:      450
                });
            }
            //$("#overlay.notifications #overlay_content ul").append(li_tag);
        }
      },
      error: function(){
        form.find(".controls").html("<p>Something went wrong. Please try again later.</p>")
      }
    });
  });

  $("#shared_work_keep_button").live('click', function(){
      parent.parent.location = $(this).attr('href');
      parent.parent.Shadowbox.close();
  });

  $("#shared_work_delete_button").live('click', function(){
      parent.parent.location = $(this).attr('href');
      parent.parent.Shadowbox.close();
  });

  $("#overlay.notifications").on("click", "#overlay_content .entries li .controls > p.button_list a.button",function(e){
      parent.location = $(this).attr('link');
      parent.Shadowbox.close();
  });

  // Infinite scrolling for notifications
  $("#overlay.notifications #overlay_content").scroll(function(){
    if ($('div#overlay_content .entries').length > 0) {
      var notifications = $('div#overlay_content .entries');
      var notification_end = notifications[0].scrollHeight + notifications.offset().top;
      var page_scroll = $(window).scrollTop()+$(window).height();
      var moreLink = $("#overlay.notifications a.more");
      if (notification_end <= page_scroll) {
        if (moreLink.is(":visible") && !moreLink.hasClass("loading")) {
            moreLink.trigger('click');
        }
      }
    }
  });

  $("#overlay.file_manager_documents .list_nav_filter, #overlay.file_manager_media .list_nav_filter, #overlay.file_manager_images .list_nav_filter").change(function() {
        var name = $(this).attr('name');
    var value = $(this).val();
    if (value == "age") {
      $('.entries > li').tsort('.age', {order:"desc",attr:"value"});
    }
    if (value == "file_name") {
      $('.entries > li').tsort('h2');
    }
    if (name == "show" && value == "all_files") {
      $('.entries > li').show();
    }
    if (name == "show" && value != "all_files") {
      $('.entries > li').hide();
      $('.metadata .type[value="'+ value +'"]').parents('.entries > li').show();
    }
  });

  $("#overlay.works_list .list_nav_filter").change(function() {
    var name = $(this).attr('name');
    var value = $(this).val();
    if (value == "age") {
      $('.entries > li').tsort('.age', {order:"desc",attr:"value"});
    }
    if (value == "title") {
      $('.entries > li').tsort('h2');
    }
  });


  // Creator & Publisher : Members Tool //
  $("#members_tool #members_tool_new_member .toggle_form").live('click', function() {
    $("#members_tool #members_tool_new_member .hidden_content").show();
    $("#members_tool #members_tool_new_member .toggle_form").hide();
    return false;
  });

  $("#members_tool #members_tool_new_member form button[type='reset']").live('click', function() {
    $("#members_tool #members_tool_new_member a.search-choice-close").click();
    $("#members_tool #members_tool_new_member form label.error").hide();
    $("#members_tool #members_tool_new_member form *").removeClass('error');
    $("#members_tool #members_tool_new_member .hidden_content").hide();
    $("#members_tool #members_tool_new_member .toggle_form").show();
  });
  $(".table_tools_content form.chosenForm button[type='reset']").live('click', function() {
  	var $parent = $(this).parents("form");
  	$("a.search-choice-close", $parent).click();
  });

  // Creator & Publisher : Members Tool List Filter - Requires tinysort plugin //
  $(".mod_list_filter[name=order]").live('change', function() {
    var value = $(this).val();
    var parent = $(this).parents('.mod');

    if (value == "first_name") {
      $('.mod_list > li').tsort('.first_name');
    }
    if (value == "last_name") {
      $('.mod_list > li').tsort('.last_name');
    }
  });


  // Creator & Publisher : Member Groups Tool //
  $("#member_groups_tool #member_groups_tool_new_group .toggle_form").click(function() {
    $("#member_groups_tool_new_group .hidden_content").show();
    $("#member_groups_tool_new_group .toggle_form").hide();
    return false;
  });

  $("#member_groups_tool #member_groups_tool_new_group form button[type='reset']").click(function() {
    $("#member_groups_tool #member_groups_tool_new_group a.search-choice-close").click();
    $("#member_groups_tool #member_groups_tool_new_group form label.error").hide();
    $("#member_groups_tool #member_groups_tool_new_group form *").removeClass('error');
    $("#member_groups_tool #member_groups_tool_new_group .hidden_content").hide();
    $("#member_groups_tool #member_groups_tool_new_group .toggle_form").show();
  });


  // Creator & Publisher : Publisher Review Format //
  $("#review_formats_tool a.rating_description_toggle").live('click', function() {
    var parent = $(this).parents('.criterion');
    parent.find(".rating_descriptions").toggle();
    return false;
  });

    $("#review_formats_tool a.overall_rating_description_toggle").live('click', function() {
    var parent = $(this).parents('.overall_criterion');
    parent.find(".overall_rating_descriptions").toggle();
    return false;
  });

  function updateRatingDescriptions() {
    $('#review_formats_tool form .new_rubrics_criterion').each(function() {
      var rating_scale = $(this).parents('form').find('#cg_review_review_format_scale').val();
      $(this).find('.rating_descriptions.rating_descriptions .item').each(function(index) {
        if (index <= rating_scale) {
          $(this).removeClass('display_none');
          $(this).find('.destroy_level_description').val('0')
        } else {
          $(this).addClass('display_none');
          $(this).find('.destroy_level_description').val('1')
        }
      });
    });
  }

  function updateOverallRatingDescriptions() {
    $('#review_formats_tool form .overall_criterion').each(function() {
        var rating_scale = $(this).parents('form').find('#cg_review_review_format_overall_feedback_scale').val();
        $(this).find('.rating_descriptions.overall_rating_descriptions .item').each(function(index) {
            if (index <= rating_scale) {
                $(this).removeClass('display_none');
                $(this).find('.destroy_level_description').val('0')
            } else {
                $(this).addClass('display_none');
                $(this).find('.destroy_level_description').val('1')
            }
        });
    });
  }

  updateRatingDescriptions();
  updateOverallRatingDescriptions();

  $("#review_formats_tool #cg_review_review_format_scale").live('change', function() {
    updateRatingDescriptions();
  });

  $("#cg_review_review_format_overall_feedback_scale").live('change', function() {
    updateOverallRatingDescriptions();
  });

  function updateDeletedItems() {
    $('#review_formats_tool form .criterion input.destroy[value=1]').each(function() {
      $(this).parents('.criterion').hide();
      var parent = $(this).parents('form');
      var criteria_count = parent.find('.criterion input.destroy[value=0]').size();
      if (criteria_count <= 1) {
        parent.find('.criterion .options').hide();
      } else {
        parent.find('.criterion .options').show();
      }
    });
  }

  updateDeletedItems();

  $('#review_formats_tool form .criterion .options a.delete').live('click', function() {
    $(this).parents('.criterion').find('input.destroy').val(1);
    $(this).parents('.criterion').find('.required').removeClass('required');
    updateDeletedItems();
    return false;
  });

  $("#review_formats_tool #review_formats_tool_new_format .toggle_form").click(function() {
    $("#review_formats_tool_new_format .hidden_content").show();
    $("#review_formats_tool_new_format .toggle_form").hide();
    $("#review_formats_tool #review_formats_tool_new_format form *").blur();
    return false;
  });

  $("#review_formats_tool #review_formats_tool_new_format form button[type='reset']").click(function() {
    $("#review_formats_tool #review_formats_tool_new_format form label.error").hide();
    $("#review_formats_tool #review_formats_tool_new_format form *").removeClass('error');
    $("#review_formats_tool #review_formats_tool_new_format .hidden_content").hide();
    $("#review_formats_tool #review_formats_tool_new_format .toggle_form").show();
    $("#review_formats_tool #review_formats_tool_new_format .added_criterion").remove(); //when creating additional review formats, only one criterion should be in the form
  });


// Creator & Publisher : Chosen Multiple Select Mod - Requires Chosen jQuery and validate plugin //
            $("select.chosen").chosen();
            $("select.chosen").each(function() {
              $(this).insertAfter($(this).next());    //moves select box after chosen container, so validation label is beneath
              var chosenForm = $(this).attr("form");  //adds class to parent form of chosen for identification
                $(chosenForm).addClass("chosenForm");
            });

            function chosenCustomResize() {
              $('#sidebar .item .chzn-container').each(function(){
                  $(this).css('width',$(this).parent().innerWidth() + 'px');
              });
              $('#sidebar .edit .item .chzn-container').each(function(){
                  $(this).css('width',$(this).parent().innerWidth() + 'px');
              });
              $('#sidebar .item .chzn-container .chzn-drop, #sidebar .item .chzn-container .chzn-drop').each(function(){
                  $(this).css('width',$(this).parent().width()+'px');
              });
            }


  // Creator & Publisher : Member Report Output : Date Range
    var dates = $("#output_member_report_start, #output_member_report_end").datepicker({
        maxDate: '0',
        defaultDate: "-2w",
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: "M d, yy",
        onSelect: function( selectedDate ) {
            var option = this.id == "output_member_report_start" ? "minDate" : "maxDate",
            instance = $( this ).data( "datepicker" ),
            date = $.datepicker.parseDate(
                instance.settings.dateFormat ||
                $.datepicker._defaults.dateFormat,
                selectedDate, instance.settings );
            dates.not( this ).datepicker( "option", option, date );
        }
    });


// ADDITIONS MADE BY THE CGP CREW //

  //display the alert if it has text
  if ($("#alert").text()) {
    alertAnimation();
    $("#alert #alert_close").click(function() {
    	event.preventDefault();
    	alertAnimation();
    });
  }

});


// Creator & Publisher : Creator Works List Filtering - Requires tinysort plugin //
function all_works_filter(filter){
  var value = $(filter).val();
  var parent = $(filter).parents('.mod');
  if (value === "name") {
    parent.find('.mod_list li').tsort('h4');
  }
  else if (value === "age") {
    parent.find('.mod_list li').tsort('.age', {order:"desc",attr:"value"});
  }
  else if (value === "updated") {
    parent.find('.mod_list li').tsort('.updated', {order:"desc",attr:"value"});
  }
  else if (value === "all_works" || value === "recent_works" || value === "publisher" || value === "contributor" || value === "creator" || value === "learning_modules" || value === "canceled") {
    window.loadAllWorks(parent, value);
  }
}

function show_filtered_works(parent, type){
  parent.find('.mod_list > li').hide();
  var works = parent.find(".authors."+ type);
  if(works.length > 0){
    parent.find('.mod_list').show();
    parent.find('.no_works').hide();
    works.parents('.mod_list > li').show();
  } else {
    //no works, so show the no works alert and hide the works list
    parent.find('.mod_list').hide();
    parent.find('.no_works').show();
  }
}

function applyTagFilter(filter, applyOtherFilters){
  var value = $(filter).val();
  var parent = $(filter).parents('.mod_content');
  var visibleItems;
  var allItems = parent.find('.mod_list > li');
  if(parent.attr('id') === 'works_tool'){
    if(applyOtherFilters){
      $("#works .mod_nav_filter").each(function(){
        show_filtered_works(parent, value);
      });
    }
    visibleItems = parent.find('.mod_list > li:visible');
  }
  else {
    parent.find('.mod_list').show();
    visibleItems = parent.find('.mod_list > li');
  }

  if (value === "all_tags") {
    allItems.show();
  } else {
    allItems.hide();
    allItems.find('.tags > li').each(function() {
      var tag = $(this).attr('name');
      if (tag === value) {
        var has_tag = 1;
      }
      if (has_tag === 1) {
        $(this).parents('.mod_list > li').show();
      }
    });
    allItems = parent.find('.mod_list > li:visible');
    if(allItems.length === 0){
      parent.find('.mod_list').hide();
      parent.find('.no_works').show();
    }
  }
}


// this is here because of a loading issue with making this function available to
// jquery.init.structure.js and jquery.init.editor.js
function enableDisableSpinnerButtons() {
  var cur = $('#structure_tool .current > div .element_link')[0];
  var elements = $('.element_link');
  var first = elements[0];
  var last = elements[elements.size() - 1];
  var editorPrevButton = $('a.icon_only.previous');
  var editorNextButton = $('a.icon_only.next');

  if (cur == first) {
    editorPrevButton.addClass("disabled");
  } else {
    editorPrevButton.removeClass("disabled");
  }

  if (cur == last) {
    editorNextButton.addClass("disabled");
  } else {
    editorNextButton.removeClass("disabled");
  }
}

function refreshWorkTitleBar() {
  var element_title = $('#structure_tool .current .element_link').html();

  if (element_title) { //if there is no selected element, do nothing
    var titleSpan = $('span#title');
    var headingSpan = $('span#heading');
    if (onlyOneElement()) {
      headingSpan.text('');
    }
    else {
      headingSpan.text(': ' + element_title);
    }
    var newTitle = titleSpan.text() + headingSpan.text();
    var editorTitleBar = $("div#current_work > div.mod_title > h2.title");
    editorTitleBar.attr('title', newTitle);
    editorTitleBar.attr('heading', element_title);
  }
}

function onlyOneElement() {
  var elements = $('.element_link');
  return (elements.size() < 2)
}

function setEditorToElement(element, editorInstance) {
  disableElementChanging();
  var editorTitleBar = $("div#current_work > div.mod_title > h2.title");
  var editorTextarea = $('textarea#editor1');
  var editorSaveTime = $('p#status');
  var editorPrevButton = $('a.icon_only.previous');
  var editorNextButton = $('a.icon_only.next');
  var editorForm = $('.editor_save_form');
  var titleSpan = $('span#title');
  var headingSpan = $('span#heading');

  headingSpan.text(': ' + element.heading);
  var newTitle = titleSpan.text() + headingSpan.text();
  editorTitleBar.attr('title', newTitle);
  editorTitleBar.attr('heading', element.heading);

  setMyLockVersion(element.lock_version);

  // The locking/unlocking of the editor is before loading the content because
  // if it is the other way around, the wysiwyg plugin introduces a script tag,
  // which becomes part of the element body.
  if(element.locked){
    lockManager.lockEditor();
  }
  else{
    lockManager.unlockEditor();
  }

  //this fuction for show/hide lock icon if co-creator access the work
  $("#structure_tool_entries li.type_id_class_id").each(function(index, ele) {
      var elementId = parseInt(ele.id.match(/\d/gi).join(""));
      var displayStyle = ((element.locked_element_ids && (element.locked_element_ids.indexOf(elementId) > -1)) == true ? "inline-block" : "none");
      $("#structure_tool_entry_" + elementId + " .element_wrapper span.lock")[0].style.display = displayStyle
  });

  var elementContent = (element.body == null ? "<p></p>" : element.body);
  $('#cke_editor1 iframe').contents().find('body').html( function() {
      editorInstance.setData(elementContent,function() { this.resetUndo(); });
      editorInstance.resetDirty();
      enableElementChanging();
      $('#editor1').data('last_snap_length', editorInstance.getSnapshot().length);
      editorTextarea.val(elementContent);
  }, false);

  // fix the spinner button links and save form
  var lastSlash = editorNextButton.attr('value').lastIndexOf('s/') + 2;
  var newValue = editorNextButton.attr('value').substring(0, lastSlash) + element.id;
  editorNextButton.attr('value', newValue + '/next_element');
  editorPrevButton.attr('value', newValue + "/previous_element");
  editorForm.attr('action', newValue);
  var lastUnderscore = editorForm.attr('id').lastIndexOf('_') + 1;
  var oldId = editorForm.attr('id').substring(0, lastUnderscore);
  editorForm.attr('id', oldId + element.id);
}

function setMyLockVersion(lockVersion){
  $("#cg_document_element_lock_version").val(lockVersion);
  $('input[name="element[lock_version]"]').val(lockVersion);
}

function displayAlert(msg, type) {
  var alert = $("#alert");
  alert.removeClass();
  alert.addClass(type);
  alert.text(msg);
  alertAnimation();
}


function beginLoadingImage(element) {
  removeSuccessOrFailureImage(element);
  if (element.hasClass('controls') || element.attr('id') === 'controls') {
    element.addClass('loading');
  } else {
    element.find(".controls").addClass('loading');
  }
}


function removeLoadingImage(element) {
  if (element.hasClass('controls') || element.attr('id') === 'controls') {
    element.removeClass('loading');
  } else {
    element.find(".controls").removeClass('loading');
  }
}

function addDisabledClassToButtons(element) {
  element.find("button").attr('disabled', 'disabled');
}

function removeDisabledClassFromButtons(element) {
  element.find("button").each(function() {
    if(!$(this).hasClass("locked")){
      $(this).removeAttr('disabled');
    }
  });
}

function loadSuccess(element) {
  removeSuccessOrFailureImage(element);
  var successImg = '<span class="loading_wrapper positive"></span>';
  if (element.hasClass('controls')) {
    element.append( successImg );
  } else {
    element.find('.controls').append( successImg );
  }
  element.find('span.loading_wrapper').delay(2000).fadeOut("slow");
  setTimeout(function() {
    element.find('span.loading_wrapper').remove()
  }, 2600);

}

function loadFailure(element) {
  removeSuccessOrFailureImage(element);
  var failImg = '<span class="loading_wrapper negative"></span>';
  if (element.hasClass('controls')) {
    element.append( failImg );
  } else {
    element.find('.controls').append( failImg );
  }
  element.find('span.loading_wrapper').delay(2000).fadeOut("slow");
  setTimeout(function() {
    element.find('span.loading_wrapper').remove()
  }, 2600);

}

function removeSuccessOrFailureImage(element) {
  element.find('span.loading_wrapper').remove();
  element.find('span.loading_wrapper').remove();
}

// moved to cg_author/ckeditor/config2.js
// var editorReady = true;

function disableElementChanging() {
  editorReady = false;
  $('a.icon_only.next').addClass('disabled');
  $('a.icon_only.previous').addClass('disabled');
}

function enableElementChanging() {
  editorReady = true;
  enableDisableSpinnerButtons();
}

// Global : Alert Animation //
function alertAnimation() {
  if($("#alert").hasClass("sticky")) {
    if($("#alert").is(":visible")) {
    	$("#alert").slideUp(200);
    }
    else {
    	$("#alert").append('<a id="alert_close" href="#" title="close">x</a>');
    	$("#alert").slideDown(200);
    }
  }
  else {
    if($("#alert").is(":visible")){
      $("#alert").queue("fx", []);//empty the queue so it doesn't keep popping open
      $("#alert").delay(8000).slideUp(200);
    }
    else {
      $("#alert").slideDown(200).delay(8000).slideUp(200);
    }
  }
}

function errorMessage(responseCode, messages) {
  if (responseCode >= 500){
    if(typeof(messages["500"]) === "string"){
      return messages["500"];
    } else if(typeof(messages["500"]) === "function") {
      messages["500"]();
    } else {
      return messages["base"] + " Please try again later."
    }
  }
  else if(responseCode === 0){
    return "You may have lost your connection to the internet. Please check your connection.";
  }
  else if (messages[responseCode] !== undefined){
    return messages[responseCode];
  }
  else{
    return messages["base"] + " Please try again later.";
  }
}

function handleAjaxError(error, messages) {
  var responseCode = (typeof(error) === "string" || typeof(error) === "number") ? error : error.status;//accept code or full request object
  if (responseCode == 403 || responseCode == 401) {
    window.location.reload();
  } else {
    if (typeof(messages[responseCode]) === "function") { //implies error is request object
      //messages properties are string or function of request object that returns a string response message
      messages[responseCode] = messages[responseCode](error);
    }
    displayAlert(errorMessage(responseCode, messages), "negative");
  }
}

// Creator & Publisher : Workspace Loader Function //
function revealWorkspaceLoader() {
  $('#creator_publisher #workspace .wrapper #loading_overlay').fadeIn(300);
}

// Horrible hacky hack that makes spinner keep spinning in IE
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
  window.onbeforeunload = function(){
    $('.loading').each(function(){
      var image = $(this).css('background-image');
      this.style.backgroundImage = 'none';
      this.style.backgroundImage = image;
    });
  };
}


// This is the javascript that checks that the user is signed in before
// opening shadowboxes to prevent the sign in screen from appearing in the
// shadowbox. Add the class 'overlay_opener' to any a element that opens a
// shadowbox.
$('a.overlay_opener').click(function(evt){
  $.ajax({
    type: 'Get',
    url: '/cg_gui/pre_overlay',
    error: function(request, textStatus, errorThrown) {
      Shadowbox.close();
      handleAjaxError(403, {
        500: "A server error occurred. Unable to load overlay.",
        base: "Unable to load overlay."
      });
    }
  });
  return false;
});

// Dumb issue with live and click, so this has to be duplicated for now...
$('a.overlay_opener').live("click", function(evt){
  $.ajax({
    type: 'Get',
    url: '/cg_gui/pre_overlay',
    error: function(request, textStatus, errorThrown) {
      Shadowbox.close();
      handleAjaxError(403, {
        500: "A server error occurred. Unable to load overlay.",
        base: "Unable to load overlay."
      });
    }
  });
  return false;
});

$('a.export.overlay_opener').live("click", function(evt){
    Shadowbox.open({
        player:     'iframe',
        content:    $(this).attr('href'),
        height:     500,
        width:      600
    });
});

// Caps Lock detector for password inputs
$("form").delegate("input[type='password']", "keypress", function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  var shift = e.shiftKey ? e.shiftKey : (key == 16);
  var label;
  // Detects capital letters without the shift key and lowercase letters
  // with the shift key
  if((isUppercaseLetter(key) && !shift) || (isLowercaseLetter(key) && shift)){
    // Look for the caps lock warning
    label = $("label.error.capslock[for='" + $(this).attr("name") +"']");
    if(label.length === 0){ // If there is no warning, add one
      $(this).after("<label for='" + $(this).attr("name") + "' class='error capslock'>Caps lock is on</label>");
    }
  }
  // check if the key is a letter (only checking lowercase now since shifting w/ caps lock remains capital on mac)
  // if it is a letter, caps lock must be off
  else if(isLowercaseLetter(key)){
    // Look for the caps lock warning
    label = $("label.error.capslock[for='" + $(this).attr("name") +"']");
    if(label.length > 0){ // If there is a warning, remove it
      label.remove();
    }
  }
});

$("form").delegate("input[type='password']", "blur", function(){
  var label = $("label.error.capslock[for='" + $(this).attr("name") +"']");
  if(label.length > 0){
    label.remove();
  }
});

function isUppercaseLetter(key){
  return (key >= 65 && key <= 90);
}

function isLowercaseLetter(key){
  return (key >= 97 && key <= 122);
}

function isJson(str) {
  try {
    return $.parseJSON(str) instanceof (Object)
  } catch(e) {
    return false;
  }
}

function acceptPublication(url){
    $("#agreement_buttons button").css("background-image", "none").css("background-color", "#D5D3D3").css("color", "black");
    $("#agreement_buttons button").attr("disabled", "disabled");
    $("#rights_info_tool a#accept_revision").hide();
    $.ajax({
        url: url,
        method: 'GET',
        success: function(){
            $("#agreement_buttons").replaceWith("<h4 style=\"color: #E5AC1B;\"> Publishing Agreement Finalized </h4>");
        }
    });
}

function declinePublication(url){
    $("#agreement_buttons button").css("background-image", "none").css("background-color", "#D5D3D3").css("color", "black");
    $("#agreement_buttons button").attr("disabled", "disabled");
    $.ajax({
        url: url,
        method: 'GET',
        success: function(){
            $("#agreement_buttons").replaceWith("<h4 style=\"color: #E5AC1B;\"> Publishing Agreement Declined  </h4>");
        }
    });
}
//refer SCH-3880: This is defined here as it can be accessed by all three apps. used to call extend session functionality from all three applications

function callExtendSessionROA(){
    callExtendSession(window.location.origin + "/identity/extend_session");
}
function callExtendSessionSupport(){
    callExtendSession(window.location.origin + "/cg_support/extend_session");
}
function callExtendSession(url){
    console.log('calling extend session');
    console.log(url);
    $.ajax({
        url: url,
        method: 'GET',
        success: function(){console.log('extend session success')}
    });
}

$("#given_name, #surname").on("click", function () {
    if (($("#given_name").prop("checked") != true) && ($("#surname").prop("checked") != true))
    {
        var diffCheckboxId = this.id == "given_name" ? "surname" : "given_name";
        $("#account_person_attributes_"+this.id).removeClass("required");
        $("#"+diffCheckboxId).prop('checked', true);
        $("#account_person_attributes_"+diffCheckboxId).addClass("required");
    }
    else if ($(this).prop("checked") != true) {
        $("#account_person_attributes_"+this.id).removeClass("required");
    }
    else
    {
        $("#account_person_attributes_"+this.id).addClass("required");
    }
});
// cg minimum browser versions
var $buoop = {vs:{i:7,f:4,o:11,s:4,n:9}}

//browser-update.org notification script, <browser-update.org>
//Copyright (c) 2007-2009 http://browser-update.org/
/*
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

//modifications by Common Ground Publishing to enable hosting on our server 2011-10-21

var $buo = function(op,test) {
    var jsv=5;
    var n = window.navigator,b;
    this.op=op||{};
//options
    this.op.l = op.l||n["language"]||n["userLanguage"]||document.documentElement.getAttribute("lang")||"en";
    this.op.vsakt = {i:9,f:7,o:11,s:5.1,n:20};
    this.op.vsdefault = {i:6,f:3.5,o:10.1,s:3.2,n:10};
    this.op.vs =op.vs||this.op.vsdefault;
    for (b in this.op.vsakt)
        if (this.op.vs[b]>=this.op.vsakt[b])
            this.op.vs[b]=this.op.vsakt[b]-0.05;

    if (!op.reminder || op.reminder<0.1 )
        this.op.reminder=0;
    else
        this.op.reminder=op.reminder||24;

    this.op.onshow = op.onshow||function(o){};
    this.op.url= op.url||"http://browser-update.org/update.html";
    this.op.pageurl = op.pageurl || window.location.hostname || "unknown";
    this.op.newwindow=op.newwindow||false;

    this.op.test=test||op.test||false;
    if (window.location.hash=="#test-bu")
        this.op.test=true;

    /*
     if (op.new7 || (this.op.l=="de" && !this.op.test && Math.round(Math.random()*3)==1)) { //test new script
     var e = document.createElement("script");
     e.setAttribute("type", "text/javascript");
     e.setAttribute("src", "http://browser-update.org/update7.js");
     document.body.appendChild(e);
     return;
     }
     */

    function getBrowser() {
        var n,v,t,ua = navigator.userAgent;
        var names={i:'Internet Explorer',f:'Firefox',o:'Opera',s:'Apple Safari',n:'Netscape Navigator', c:"Chrome", x:"Other"};
        if (/like firefox|chromeframe|seamonkey|opera mini|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(ua)) n="x";
        else if (/trident.(\d+\.\d+);/.test(ua)) n="io";
        else if (/MSIE (\d+\.\d+);/.test(ua)) n="i";
        else if (/Chrome.(\d+\.\d+)/i.test(ua)) n="c";
        else if (/Firefox.(\d+\.\d+)/i.test(ua)) n="f";
        else if (/Version.(\d+.\d+).{0,10}Safari/i.test(ua))	n="s";
        else if (/Safari.(\d+)/i.test(ua)) n="so";
        else if (/Opera.*Version.(\d+\.?\d+)/i.test(ua)) n="o";
        else if (/Opera.(\d+\.?\d+)/i.test(ua)) n="o";
        else if (/Netscape.(\d+)/i.test(ua)) n="n";
        else return {n:"x",v:0,t:names[n]};
        if (n=="x") return {n:"x",v:0,t:names[n]};

        v=new Number(RegExp.$1);
        if (n=="so") {
            v=((v<100) && 1.0) || ((v<130) && 1.2) || ((v<320) && 1.3) || ((v<520) && 2.0) || ((v<524) && 3.0) || ((v<526) && 3.2) ||4.0;
            n="s";
        }
        if (n=="i" && v==7 && window.XDomainRequest) {
            v=8;
        }
        if (n=="io") {
            n="i";
            if (v>4) v=9;
            else if (v>3.1) v=8;
            else if (v>3) v=7;
        }
        return {n:n,v:v,t:names[n]+" "+v}
    }

    this.op.browser=getBrowser();
    if (!this.op.test && (!this.op.browser || !this.op.browser.n || this.op.browser.n=="x" || this.op.browser.n=="c" || document.cookie.indexOf("browserupdateorg=pause")>-1 || this.op.browser.v>this.op.vs[this.op.browser.n]))
        return;

    if (!this.op.test) {
        var i = new Image();
        //DISABLED TEMPORARYLY
        //i.src="http://browser-update.org/viewcount.php?n="+this.op.browser.n+"&v="+this.op.browser.v + "&p="+ escape(this.op.pageurl) + "&jsv="+jsv;
    }
    if (this.op.reminder>0) {
        var d = new Date(new Date().getTime() +1000*3600*this.op.reminder);
        document.cookie = 'browserupdateorg=pause; expires='+d.toGMTString()+'; path=/';
    }
    var ll=this.op.l.substr(0,2);
    var languages = "de,en";
    if (languages.indexOf(ll)!==false)
        this.op.url="http://browser-update.org/"+ll+"/update.html#"+jsv;
    var tar="";
    if (this.op.newwindow)
        tar=' target="_blank"';

    function busprintf() {
        var args=arguments;
        var data = args[ 0 ];
        for( var k=1; k<args.length; ++k ) {
            data = data.replace( /%s/, args[ k ] );
        }
        return data;
    }

    var t = 'Your browser (%s) is <b>out of date</b>. It has known <b>security flaws</b> and may <b>not display all features</b> of this and other websites. \
         <a%s>Learn how to update your browser</a>';
    if (ll=="de")
        t = 'Sie verwenden einen <b>veralteten Browser</b> (%s) mit <b>Sicherheitsschwachstellen</b> und <b>k&ouml;nnen nicht alle Funktionen dieser Webseite nutzen</b>. \
        <a%s>Hier erfahren Sie, wie einfach Sie Ihren Browser aktualisieren k&ouml;nnen</a>.';
    else if (ll=="it")
        t = 'Il tuo browser (%s) <b>non è aggiornato</b>. Ha delle <b>falle di sicurezza</b> e potrebbe <b>non visualizzare correttamente</b> le \
        pagine di questo e altri siti. \
        <a%s>Aggiorna il tuo browser</a>!';
    else if (ll=="pl")
        t = 'Przeglądarka (%s), której używasz, jest przestarzała. Posiada ona udokumentowane <b>luki bezpieczeństwa, inne wady</b> oraz <b>ograniczoną funkcjonalność</b>. Tracisz możliwość skorzystania z pełni możliwości oferowanych przez niektóre strony internetowe. <a%s>Dowiedz się jak zaktualizować swoją przeglądarkę</a>.';
    else if (ll=="es")
        t = 'Tu navegador (%s) está <b>desactualizado</b>. Tiene conocidas <b>fallas de seguridad</b> y podría <b>no mostrar todas las características</b> de este y otros sitios web. <a%s>Aprénde cómo puedes actualizar tu navegador</a>';
    else if (ll=="nl")
        t = 'Uw browser (%s) is <b>oud</b>. Het heeft bekende <b>veiligheidsissues</b> en kan <b>niet alle mogelijkheden</b> weergeven van deze of andere websites. <a%s>Lees meer over hoe uw browser te upgraden</a>';
    else if (ll=="pt")
        t = 'Seu navegador (%s) está <b>desatualizado</b>. Ele possui <b>falhas de segurança</b> e pode <b>apresentar problemas</b> para exibir este e outros websites. <a%s>Veja como atualizar o seu navegador</a>';
    else if (ll=="sl")
        t = 'Vaš brskalnik (%s) je <b>zastarel</b>. Ima več <b>varnostnih pomankljivosti</b> in morda <b>ne bo pravilno prikazal</b> te ali drugih strani. \
        <a%s>Poglejte kako lahko posodobite svoj brskalnik</a>';
    else if (ll=="ru")
        t = 'Ваш браузер (%s) <b>устарел</b>. Он имеет <b>уязвимости в безопасности</b> и может <b>не показывать все возможности</b> на этом и других сайтах. <a%s>Узнайте, как обновить Ваш браузер</a>';
    else if (ll=="id")
        t = 'Browser Anda (% s) sudah <b>kedaluarsa</b>. Browser yang Anda pakai memiliki <b>kelemahan keamanan</b> dan mungkin <b>tidak dapat menampilkan semua fitur</b> dari situs Web ini dan lainnya. <a%s> Pelajari cara memperbarui browser Anda</a>';
    else if (ll=="uk")
        t = 'Ваш браузер (%s) <b>застарів</b>. Він <b>уразливий</b> й може <b>не відображати всі можливості</b> на цьому й інших сайтах. <a%s>Дізнайтесь, як оновити Ваш браузер</a>';
    else if (ll=="ko")
        t = '지금 사용하고 계신 브라우저(%s)는 <b>오래되었습니다.</b> 알려진 <b>보안 취약점</b>이 존재하며, 새로운 웹 사이트가 <b>깨져 보일 수도</b> 있습니다. <a%s>브라우저를 어떻게 업데이트하나요?</a>';
    else if (ll=="rm")
        t = 'Tes navigatur (%s) è <b>antiquà</b>. El cuntegna <b>problems da segirezza</b> enconuschents e mussa eventualmain <b>betg tut las funcziuns</b> da questa ed autras websites. <a%s>Emprenda sco actualisar tes navigatur</a>.';
    else if (ll=="ja")
        t = 'お使いのブラウザ「%s」は、<b>時代遅れ</b>のバージョンです。既知の<b>脆弱性</b>が存在するばかりか、<b>機能不足</b>によって、サイトが正常に表示できない可能性があります。 \
         <a%s>ブラウザを更新する方法を確認する</a>';
    else if (ll=="fr")
        t = 'Votre navigateur (%s) est <b>périmé</b>. Il contient des <b>failles de sécurité</b> et pourrait <b>ne pas afficher certaines fonctionalités</b> des sites internet récents. <a%s>Découvrez comment mettre votre navigateur à jour</a>';
    else if (ll=="da")
        t = 'Din browser (%s) er <b>forældet</b>. Den har kendte <b>sikkerhedshuller</b> og kan måske <b>ikke vise alle funktioner</b> på dette og andre websteder. <a%s>Se hvordan du opdaterer din browser</a>';
    else if (ll=="al")
        t = 'Shfletuesi juaj (%s) është <b>ca i vjetër</b>. Ai ka <b>të meta sigurie</b> të njohura dhe mundet të <b>mos i shfaqë të gjitha karakteristikat</b> e kësaj dhe shumë faqeve web të tjera. <a%s>Mësoni se si të përditësoni shfletuesin tuaj</a>';

    if (op.text)
        t = op.text;

    this.op.text=busprintf(t,this.op.browser.t,' href="'+this.op.url+'"'+tar);

    var div = document.createElement("div");
    this.op.div = div;
    div.id="buorg";
    div.className="buorg";
    div.innerHTML= '<div>' + this.op.text + '<div id="buorgclose">X</div></div>';

    var sheet = document.createElement("style");
//sheet.setAttribute("type", "text/css");
    var style = ".buorg {position:absolute;z-index:111111;\
width:100%; top:0px; left:0px; \
border-bottom:1px solid #A29330; \
background:#FDF2AB no-repeat 10px center url(/images/cg_gui/dialog-warning.gif);\
text-align:left; cursor:pointer; \
font-family: Arial,Helvetica,sans-serif; color:#000; font-size: 12px;}\
.buorg div { padding:5px 36px 5px 40px; } \
.buorg a,.buorg a:visited  {color:#E25600; text-decoration: underline;}\
#buorgclose { position: absolute; right: .5em; top:.2em; height: 20px; width: 12px; font-weight: bold;font-size:14px; padding:0; }";
    document.body.insertBefore(div,document.body.firstChild);
    document.getElementsByTagName("head")[0].appendChild(sheet);
    try {
        sheet.innerText=style;
        sheet.innerHTML=style;
    }
    catch(e) {
        try {
            sheet.styleSheet.cssText=style;
        }
        catch(e) {
            return;
        }
    }
    var me=this;
    div.onclick=function(){
        if (me.op.newwindow)
            window.open(me.op.url,"_blank");
        else
            window.location.href=me.op.url;
        return false;
    };
    div.getElementsByTagName("a")[0].onclick = function(e) {
        var e = e || window.event;
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
        return true;
    }

    this.op.bodymt = document.body.style.marginTop;
    document.body.style.marginTop = (div.clientHeight)+"px";
    document.getElementById("buorgclose").onclick = function(e) {
        var e = e || window.event;
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
        me.op.div.style.display="none";
        document.body.style.marginTop = me.op.bodymt;
        return true;
    }
    op.onshow(this.op);

}
var $buoop = $buoop||{};
$bu=$buo($buoop);
/**
 * This is the commonground for of the timeago jquery plugin from
 * github.com:commonground/jquery-timeago.git.
 * We have incorporated features the original developer hasn't bothered to
 * accept pull requests for.
 */
/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.0.2
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */


(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp, settings) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp), $.extend(true, $t.settings, settings));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      ignoreDatesPriorToDaysAgo: null,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis, settings) {
      var $l = settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  $.fn.timeago = function(settings) {
    var self = this;
    var $s = $.extend(true, {}, $t.settings, settings);
    self.data("timeago", {settings: $s});
    self.each(refresh);
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      if (data.settings.ignoreDatesPriorToDaysAgo !== null) {
        var cutOffDate = Date.now().valueOf() - (data.settings.ignoreDatesPriorToDaysAgo * 24 * 3600 * 1000);
        if (data.datetime.valueOf() > cutOffDate) {
            $(this).text(inWords(data.datetime, data.settings));
        }
      } else {
        $(this).text(inWords(data.datetime, data.settings));
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    var data = element.data("timeago");
    if (!data.datetime) {
      data = $.extend(true, {}, data, { datetime: $t.datetime(element) });
      element.data("timeago", data);
      var text = $.trim(element.text());
      if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return data;
  }

  function inWords(date, settings) {
    return $t.inWords(distance(date), settings);
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));
//     Underscore.js 1.3.1
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      if (index == 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return slice.call(iterable);
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var result = [];
    _.reduce(initial, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) {
        memo[memo.length] = el;
        result[result.length] = array[i];
      }
      return memo;
    }, []);
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        func.apply(context, args);
      }
      whenDone();
      throttling = true;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(/\\\\/g, '\\').replace(/\\'/g, "'");
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape || noMatch, function(match, code) {
           return "',_.escape(" + unescape(code) + "),'";
         })
         .replace(c.interpolate || noMatch, function(match, code) {
           return "'," + unescape(code) + ",'";
         })
         .replace(c.evaluate || noMatch, function(match, code) {
           return "');" + unescape(code).replace(/[\r\n\t]/g, ' ') + ";__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', '_', tmpl);
    if (data) return func(data, _);
    return function(data) {
      return func.call(this, data, _);
    };
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);
//     Backbone.js 0.9.1

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `global`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to slice/splice.
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.1';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  var $ = root.jQuery || root.Zepto || root.ender;

  // Set the JavaScript library that will be used for DOM manipulation and
  // Ajax calls (a.k.a. the `$` variable). By default Backbone will use: jQuery,
  // Zepto, or Ender; but the `setDomLibrary()` method lets you inject an
  // alternate JavaScript library (or a mock library for testing your views
  // outside of a browser).
  Backbone.setDomLibrary = function(lib) {
    $ = lib;
  };

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback functions
  // to an event; trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Backbone.Events = {

    // Bind an event, specified by a string name, `ev`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.
    on: function(events, callback, context) {
      var ev;
      events = events.split(/\s+/);
      var calls = this._callbacks || (this._callbacks = {});
      while (ev = events.shift()) {
        // Create an immutable callback list, allowing traversal during
        // modification.  The tail is an empty object that will always be used
        // as the next node.
        var list  = calls[ev] || (calls[ev] = {});
        var tail = list.tail || (list.tail = list.next = {});
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `ev` is null, removes all bound callbacks for all events.
    off: function(events, callback, context) {
      var ev, calls, node;
      if (!events) {
        delete this._callbacks;
      } else if (calls = this._callbacks) {
        events = events.split(/\s+/);
        while (ev = events.shift()) {
          node = calls[ev];
          delete calls[ev];
          if (!callback || !node) continue;
          // Create a new list, omitting the indicated event/context pairs.
          while ((node = node.next) && node.next) {
            if (node.callback === callback &&
              (!context || node.context === context)) continue;
            this.on(ev, node.callback, node.context);
          }
        }
      }
      return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls['all'];
      (events = events.split(/\s+/)).push(null);
      // Save references to the current heads & tails.
      while (event = events.shift()) {
        if (all) events.push({next: all.next, tail: all.tail, event: event});
        if (!(node = calls[event])) continue;
        events.push({next: node.next, tail: node.tail});
      }
      // Traverse each list, stopping when the saved tail is reached.
      rest = slice.call(arguments, 1);
      while (node = events.pop()) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    }

  };

  // Aliases for backwards compatibility.
  Backbone.Events.bind   = Backbone.Events.on;
  Backbone.Events.unbind = Backbone.Events.off;

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (options && options.parse) attributes = this.parse(attributes);
    if (defaults = getValue(this, 'defaults')) {
      attributes = _.extend({}, defaults, attributes);
    }
    if (options && options.collection) this.collection = options.collection;
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    this.set(attributes, {silent: true});
    delete this._changed;
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Backbone.Model.prototype, Backbone.Events, {

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function() {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.attributes[attr];
      return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.attributes[attr] != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, value, options) {
      var attrs, attr, val;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs instanceof Backbone.Model) attrs = attrs.attributes;
      if (options.unset) for (attr in attrs) attrs[attr] = void 0;

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var now = this.attributes;
      var escaped = this._escapedAttributes;
      var prev = this._previousAttributes || {};
      var alreadySetting = this._setting;
      this._changed || (this._changed = {});
      this._setting = true;

      // Update attributes.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(now[attr], val)) delete escaped[attr];
        options.unset ? delete now[attr] : now[attr] = val;
        if (this._changing && !_.isEqual(this._changed[attr], val)) {
          this.trigger('change:' + attr, this, val, options);
          this._moreChanges = true;
        }
        delete this._changed[attr];
        if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
          this._changed[attr] = val;
        }
      }

      // Fire the `"change"` events, if the model has been changed.
      if (!alreadySetting) {
        if (!options.silent && this.hasChanged()) this.change(options);
        this._setting = false;
      }
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      (options || (options = {})).unset = true;
      return this.set(attr, null, options);
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = Backbone.wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, value, options) {
      var attrs, current;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      options = options ? _.clone(options) : {};
      if (options.wait) current = _.clone(this.attributes);
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var serverAttrs = model.parse(resp, xhr);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (!model.set(serverAttrs, options)) return false;
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
      if (options.wait) this.set(current, silentOptions);
      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var triggerDestroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      if (this.isNew()) return triggerDestroy();
      options.success = function(resp) {
        if (options.wait) triggerDestroy();
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
      if (!options.wait) triggerDestroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = getValue(this.collection, 'url') || getValue(this, 'urlRoot') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      if (this._changing || !this.hasChanged()) return this;
      this._changing = true;
      this._moreChanges = true;
      for (var attr in this._changed) {
        this.trigger('change:' + attr, this, this._changed[attr], options);
      }
      while (this._moreChanges) {
        this._moreChanges = false;
        this.trigger('change', this, options);
      }
      this._previousAttributes = _.clone(this.attributes);
      delete this._changed;
      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (!arguments.length) return !_.isEmpty(this._changed);
      return this._changed && _.has(this._changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this._changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (!arguments.length || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Check if the model is currently in a valid state. It's only possible to
    // get into an *invalid* state if you're using silent changes.
    isValid: function() {
      return !this.validate(this.attributes);
    },

    // Run validation against a set of incoming attributes, returning `true`
    // if all is well. If a specific `error` callback has been passed,
    // call that instead of firing the general `"error"` event.
    _validate: function(attrs, options) {
      if (options.silent || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) {
        options.error(this, error, options);
      } else {
        this.trigger('error', this, error, options);
      }
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.comparator) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  };

  // Define the Collection's inheritable methods.
  _.extend(Backbone.Collection.prototype, Backbone.Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Backbone.Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function() {
      return this.map(function(model){ return model.toJSON(); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, index, length, model, cid, id, cids = {}, ids = {};
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];

      // Begin by turning bare objects into model references, and preventing
      // invalid models or duplicate models from being added.
      for (i = 0, length = models.length; i < length; i++) {
        if (!(model = models[i] = this._prepareModel(models[i], options))) {
          throw new Error("Can't add an invalid model to a collection");
        }
        if (cids[cid = model.cid] || this._byCid[cid] ||
          (((id = model.id) != null) && (ids[id] || this._byId[id]))) {
          throw new Error("Can't add the same model to a collection twice");
        }
        cids[cid] = ids[id] = model;
      }

      // Listen to added models' events, and index models for lookup by
      // `id` and by `cid`.
      for (i = 0; i < length; i++) {
        (model = models[i]).on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // Insert models into the collection, re-sorting if needed, and triggering
      // `add` events unless silenced.
      this.length += length;
      index = options.at != null ? options.at : this.models.length;
      splice.apply(this.models, [index, 0].concat(models));
      if (this.comparator) this.sort({silent: true});
      if (options.silent) return this;
      for (i = 0, length = this.models.length; i < length; i++) {
        if (!cids[(model = this.models[i]).cid]) continue;
        options.index = i;
        model.trigger('add', model, this, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.getByCid(models[i]) || this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Get a model from the set by id.
    get: function(id) {
      if (id == null) return null;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid: function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      var boundComparator = _.bind(this.comparator, this);
      if (this.comparator.length == 1) {
        this.models = this.sortBy(boundComparator);
      } else {
        this.models.sort(boundComparator);
      }
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      models  || (models = []);
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      this._reset();
      this.add(models, {silent: true, parse: options.parse});
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === undefined) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = Backbone.wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var coll = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) coll.add(model, options);
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        if (options.wait) coll.add(nextModel, options);
        if (success) {
          success(nextModel, resp);
        } else {
          nextModel.trigger('sync', model, resp, options);
        }
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(model, options) {
      if (!(model instanceof Backbone.Model)) {
        var attrs = model;
        options.collection = this;
        model = new this.model(attrs, options);
        if (!model._validate(model.attributes, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(ev, model, collection, options) {
      if ((ev == 'add' || ev == 'remove') && collection != this) return;
      if (ev == 'destroy') {
        this.remove(model, options);
      }
      if (model && ev === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Backbone.Router.prototype, Backbone.Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new Backbone.History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning leading hashes and slashes .
  var routeStripper = /^[#/]/;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?
  var historyStarted = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(Backbone.History.prototype, Backbone.Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
        } else {
          fragment = window.location.hash;
        }
      }
      fragment = decodeURIComponent(fragment);
      if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      if (historyStarted) throw new Error("Backbone.history has already been started");
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      historyStarted = true;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = loc.hash.replace(routeStripper, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      historyStarted = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
      if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(window.location.hash);
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you which to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!historyStarted) return false;
      if (!options || options === true) options = {trigger: options};
      var frag = (fragment || '').replace(routeStripper, '');
      if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this.fragment = frag;
        this._updateHash(window.location, frag, options.replace);
        if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
          // When replace is true, we don't want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, frag, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        window.location.assign(this.options.root + fragment);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
      } else {
        location.hash = fragment;
      }
    }
  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var eventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(Backbone.View.prototype, Backbone.Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.
    remove: function() {
      this.$el.remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      this.$el = $(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = getValue(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Event "' + events[key] + '" does not exist');
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = getValue(this, 'attributes') || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.setElement(this.make(this.tagName, attrs), false);
      } else {
        this.setElement(this.el, false);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.
  Backbone.Model.extend = Backbone.Collection.extend =
    Backbone.Router.extend = Backbone.View.extend = extend;

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = getValue(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    return $.ajax(_.extend(params, options));
  };

  // Wrap an optional error callback with a fallback error event.
  Backbone.wrapError = function(onError, originalModel, options) {
    return function(model, resp) {
      resp = model === originalModel ? resp : model;
      if (onError) {
        onError(originalModel, resp, options);
      } else {
        originalModel.trigger('error', originalModel, resp, options);
      }
    };
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a value from a Backbone object as a property
  // or as a function.
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
  /**
   * Apply live search to `$searchField`, a jquery object pointing to
   * an input element inside a form with a particular layout (to be
   * defined...  for now, read the code).
   *
   * currently used in admin tools for switch user and edit user searches
   * but not for last name search tp prevent duplicate accounts
   */

    // keep track of whether or not the browser window has focus
    var window_focus = true;
    window.onblur = function() { window_focus = false; };
    window.onfocus = function() { window_focus = true; };

  function userLiveSearch($searchField, userOptions) {
    // default options for live search
    var defaultOptions = {
      delay: 1500,                 // milliseconds
      lastSearchAttr: 'data-last-search',
      form: true,
      pass_user: false
    };

    var options = $.extend({}, defaultOptions, userOptions);

    if ($searchField.size() === 0) {
      return;
    }


    // clicking anywhere in the page will hide the search results
    $('body').on('click', function(e) {
      if (!$searchField.hasClass('display_none')) {
        searchForm().find('.live_search').addClass('display_none');
        $("#add_members .item").find(".live_search").hide();
      }
    });

    // prevent clicks in the search field from propagating up the DOM
    $searchField.on('click', function(e){ e.stopPropagation(); });

    function searchString() {
      return encodeURIComponent($searchField.val());
    }

    function searchForm() {
      return $searchField.closest('.live_search_wrapper');
    }

    function searchAction() {
      if (options.form) { // live search in a form
        if(searchForm().attr('action').split('?').length > 1){
          return searchForm().attr('action') + '&search_string=' + searchString();
        }else{
          return searchForm().attr('action') + '?search_string=' + searchString();
        }
      } else { // live search in a div
          var custom_data = searchForm().data("custom");
          var custom_data = (custom_data != undefined ? '&custom_data='+ custom_data : "");
        return searchForm().data('url') + '?search_string=' + searchString() + custom_data;
      }
    }

    function passCurrentUser() {
      var result = "&";
      if (options.pass_user) {
        var form = $searchField.closest('form');
        var match = form.attr('action').match(/\d+$/);
        result = "&user_id=" + match[0];
      }
      return  result;
    }

    function results() {
      return searchForm().find('.live_search');
    }

    /**
     * Record the current search string so that we can check if the
     * current search string is the same as what we've just searched.
     */
    function recordSearch() {
      $searchField.attr(options.lastSearchAttr, searchString());
    }

    /**
     * Test if the search field has focus.  If it does not, no point
     * in performing the search.
     */
    function hasFocus() {
      return $searchField.is(':focus');
    }

    /**
     * Test if a search should be performed based on whether the
     * search text has been changed and if the search field has focus.
     */
    function shouldSearch() {
      var lastSearchString = $searchField.attr(options.lastSearchAttr);
      var currentSearchString = searchString();
      return !$searchField.hasClass('blur') && currentSearchString !== "" && currentSearchString !== lastSearchString;
    }

    /**
     * Show or hide the results div based on the presence of any
     * results.
     */
    function updateVisibility() {
      var hasAnyMatch = results().find("ul > li").length > 0;

      if (hasAnyMatch) {
        results().removeClass('display_none');
      } else {
        // only hide the search results if the window has focus
        if (window_focus && !results().hasClass('display_none')) {
          results().addClass('display_none');
        }
      }

      $searchField.removeClass('loading');
    }

    function doSearch() {
        if (searchString() === "") {
            results().children().remove();
            recordSearch();
        }

      if (shouldSearch()) {
          $searchField.addClass('loading');
          recordSearch();

          window.searchRequest = jQuery.ajax({
              type: 'GET',
              data: passCurrentUser(),
              url: searchAction(),
              beforeSend: function(){           
                if(window.searchRequest != null) {
                  window.searchRequest.abort();
                };
                results().addClass('loading');
              },
              success: function(data){
                results().html(data);
                updateVisibility();     
              }
          });
      } else {
      }
    };

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    $searchField.on('keyup', function() {
      var delayedFn = debounce(doSearch, 1500);
      delayedFn();
    });

    /**
     * Hide results area on blur for delay time.
     */
    // $searchField.on('blur', function(evt) {
    //   setTimeout(updateVisibility, options.delay);
    // });

    /**
     * Show results area on return to focus.
     */
    $searchField.on('focus', function(evt) {
      setTimeout(updateVisibility, options.delay);
    });

    /**
     * Merge in more results if 'more' link is clicked.
     */
    searchForm().off('click').on('click', 'a.more', function(evt) {
      evt.preventDefault();

      $searchField.focus();

      var that = $(this);
      that.hide();

      results().find('.loading_content').show();
      
      $.ajax({
        type: "GET",
        url: searchAction(),
        data: "page=" + that.attr('page'),
        success: function(html) {
          results().children("ul").append(html);
          var page = parseInt(that.attr('page'), 10);
          var max_pages = parseInt(that.attr('max_pages'), 10);
          if (page < max_pages){
            that.attr('page', parseInt(that.attr('page'), 10) + 1);
            that.show();
          }
        },
        complete: function(){
          results().find('.loading_content').hide();
        }
      });
    });

    searchForm().on('submit', function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });

  }

/* 
 * Used in account settings page for last_name search.  Appears to do largely the same thing as the previous function
 */
liveSearch = {
  lastNameField: $('#account_person_attributes_last_name'),
  registerHandlers: function () {
    this.lastNameField.live('keyup', function(evt){
      var $searchDiv = $(".live_search");
      var $lastName = $(this);
      var searchString = $(this).val();
      var action = $searchDiv.attr("data-action") + "?search_string=" + encodeURIComponent(searchString);
      var delay = 1500;
      var lastSearchAttr = "data-last-search";

      function valueHasNotChangedSinceEvent () {
        return searchString == $lastName.val();
      }

      function valueIsDifferentFromLastSearch() {
        return searchString != $searchDiv.attr(lastSearchAttr);
      }

      function recordSearch() {
        $searchDiv.attr(lastSearchAttr, searchString);
      }

      function lastNameIsStillFocused() {
        return $lastName.is(":focus");
      }

      function updateVisibility() {
        var atLeastOneMatch = $searchDiv.find("ul > li").length > 0;

        lastNameIsStillFocused() && atLeastOneMatch ?
          $searchDiv.removeClass('display_none') :
          $searchDiv.addClass('display_none');
      }

      function emptyAndHide() {
        $searchDiv.find("ul > li").remove();
        $searchDiv.addClass('display_none');
      }

      setTimeout(function() {
        if (valueHasNotChangedSinceEvent() && valueIsDifferentFromLastSearch() && lastNameIsStillFocused()) {
          recordSearch();

          if (searchString) {
            $searchDiv.load(action, function () { updateVisibility(); });
          }
          else {
            emptyAndHide();
          }
        }
      }, delay);
    });

    this.lastNameField.live('blur', function(evt){
      $(".live_search").addClass('display_none');
    });
  }
};
function toggleStarred(url, update_id) {
    $.ajax({
        type: 'POST',
        url: url,
        success: function(return_data){
            $("#toggle_starred_" + update_id).parent().replaceWith(return_data);
            $("#toggle_starred_" + update_id).bind('click');
        },
        error:function (request, textStatus, errorThrown) {
            $("#toggle_starred_" + update_id).bind('click');
        }
    });
}

$(".short_more .more, .long_more .less ").click(function() {
    if($('.short_more').css('display') == 'none'){
        $('.long_more').hide();
        $('.short_more').show();
    }else {
        $('.short_more').hide();
        $('.long_more').show();
    }
})

$('#about .entries.blip .edit').click(function(){
    if($(this).css('display') == 'block'){
        var profileMore = $('.entries.blip textarea').val();
        if($('.entries.blip textarea').val() == 'Place Holder') {
            $('.entries.blip textarea').val('');
        }
    }
})

$('#about .entries.more .edit').click(function(){
    if($(this).css('display') == 'block'){
        var profileMore = $('.entries.more textarea').val();
        if(profileMore.length > 250 && (profileMore.slice(-34) == '<a class="less" href="#"> Less</a>')) {
            var profileMoreLength = (profileMore.length) - 34;
            $('.entries.more textarea').val(profileMore.slice(-0, profileMoreLength));
        }
    }
})

//CgCommunity::AbstractProfilesController -----------------------------------------------------start
//view:app/views/cg_community/abstract_profiles/_blip.html.erb----------------------------------start 

function addBlip(event) {
    event.preventDefault();
    removeFormHint(addBlipFormElement());
    if($(".form_for_blip_update").valid()){
        $.ajax({
            type:'POST',
            url:$(".form_for_blip_update").attr('action'),
            data:$(".form_for_blip_update").serialize(),
            spinnerContext: $(".form_for_blip_update"),
            spinnerType: "form",
            success:function (html_data) {
                $(".blip li .display h3").html(profileBlipElement().val());
                $(".blip li .edit").attr("style", "display: none");
                $("#settings #content_1  div.state-display div.value p#micro_bio").html(profileBlipElement().val());
                $("#settings #content_1  div.state-display div.value p#micro_bio1").html(profileMoreElement().val());
                $("#settings #content_1  div#user_bio").hide();
                $("#settings #content_1  div#user_bio1").hide();
                $("#settings #content_1  div.state-display").show();
                $(".blip li .display").first().attr("style", "display: visible")
                $(".blip li .options li .edit").attr("style", "display: visible")
                refreshProfileBlipLeftSidebar();
                updateFormHint(addBlipFormElement());
            },
            error:function (request, textStatus, errorThrown) {
                switch (request.status) {
                    case 500:
                        msg = 'A server error occurred when updating your profile.  Please try again later.';
                        break;
                    case 422:
                        msg = request.responseText;
                        break;
                    default:
                        msg = 'There was an error when updating your profile.';
                }
                displayAlert(msg, "negative");
            }
        });
    }
    else{
        updateFormHint(addBlipFormElement());
    }
    return false;

}

function refreshProfileBlipLeftSidebar() {
    $(".sidebar h3#blip_display").html(profileBlipElement().val());
}

function addBlipFormElement() {
    return $(".form_for_blip_update");
}



//_blip.html.erb---------------------------------------------------------------------------------------end

//view:app/views/cg_community/abstract_profiles/_more.erb-----------------------------------------------start 
// TODO: Need to change the function name as find_ckeditor_instance_for_bionote it used addMore and _more.erb
function profileType(){
    return (($("textarea#profile_profile_more").length > 0) ? CKEDITOR.instances.profile_profile_more : CKEDITOR.instances.community_profile_profile_more);
}

function addMore(event) {
    event.preventDefault();
    profileType().updateElement();
    removeFormHint(addMoreFormElement());
    if($(".more li .edit form").valid()){
        $.ajax({
            type:'POST',
            url:$(".more li .edit form").attr('action'),
            data:$(".more li .edit form").serialize(),
            spinnerContext: $(".more li .edit form"),
            spinnerType: "form",
            success:function (html_data) {
                if (profileMoreElement().val() == ""){
                    var value = moreTeaserMessage();
                } else {
                    var value = profileMoreElement().val();
                }
                if (value == undefined)
                    value = $("#community_profile_profile_more").val();

                $(".more li .display p").html(value);
                $(".more li .edit").attr("style", "display: none")
                $(".more li .display").first().attr("style", "display: visible")
                $(".more li .options li .edit").attr("style", "display: visible")
                updateFormHint(addMoreFormElement());
            },
            error:function (request, textStatus, errorThrown) {
                switch (request.status) {
                    case 500:
                        msg = 'A server error occurred when updating your profile.  Please try again later.';
                        break;
                    case 422:
                        msg = request.responseText;
                        break;
                    default:
                        msg = 'There was an error when updating your profile.';
                }
                displayAlert(msg, "negative");
            }
        });
    } else{
        updateFormHint(addMoreFormElement());
    }
    return false;
}


function addMoreFormElement() {
    return $(".more li .edit form");
}

//view:app/views/cg_community/abstract_profiles/_more.erb-----------------------------------------------end
//CgCommunity::AbstractProfilesController -------------------------------------------------------------end

//CgCommunity::AbstractUpdatesController----------------------------------------------------------------start
//view:cg_community/abstract_updates/_owner_detailed_updates.erb----------------------------------------start 



function deleteCurrentUpdate(update_id, list_mode, collection_path) {
    var listMode = list_mode || true;
    $.ajax({
        type: 'POST',
        url: deleteUpdateFormElement(update_id).attr('action'),
        data: deleteUpdateFormElement(update_id).serialize(),
        spinnerContext: deleteUpdateFormElement(update_id),
        spinnerType: "form",
        success: function(){
            if (listMode == 'false'){
                window.location.href = collection_path;
                return;
            }
            deleteUpdateFormElement(update_id).parent().parent().remove();
            refreshUpdateAnnotation('deleted');
        }
    });
}
function refreshUpdateAnnotation(mode) {
    if (mode == 'deleted') {
        if ($("ul.entries > li").length == 0) {
            $("div.mod div#add_update_label_holder").hide();
            $("div.mod div#annotation_holder").show();
        }
    } else {
        $("div.mod div#annotation_holder").hide();
        $("div.mod div#add_update_label_holder").show();
    }
}

function deleteUpdateFormElement(update_id) {
    return $('#edit_update_' + update_id);
}

//view:_owner_detailed_updates.erb----------------------------------------------------------------------------end
//CgCommunity::AbstractUpdatesController-----------------------------------------------------------------------end

//CgCommunity::AbstractUpdatesController----------------------------------------------------------------start
//view: cg_community/abstract_updates/_new.html.erb ----------------------------------------start 
function sendUpdateRequest(event) {
    event.preventDefault();
    removeFormHint(updateFormElement());
    editorToTextArea();
    var update_description=$('#update_form .item #update_update_description').val();
    if (updateFormElement().valid() && update_description !== "") {
        addSpinningToFinishProfile();
        update("save");
    }
    else{
        if (update_description == ""){
            displayAlert("Update description should not be empty.", "negative");
        }
        updateFormHint(updateFormElement());
    }
    return false;
}

//view:_new.html.erb----------------------------------------------------------------------------end
//CgCommunity::AbstractUpdatesController-----------------------------------------------------------------------end


//CgCommunity::PeersController------------------------------------------------------------------------------------start
//view:/cg_community/apps/views/cg_community/peers/_accept_or_cancel_request.erb----------------------------------start
//community_privacy_options 'O' and 'P' means "Open" and "Public"
function sendJoinCommunityRequestFromRecommendation(url, community_id, community_name, community_privacy_option){
    if(community_privacy_option == 'O' || community_privacy_option == 'P'){
        var alertMsg = "Successfully joined " + community_name + ".";
    } else {
        var alertMsg = "Membership request sent to " + community_name + ".";
    }
    $.ajax({
        type: 'POST',
        url: url,
        spinnerContext: interestedCommunityElement(community_id),
        spinnerType: "active_spinner",
        success: function(data){
            displayAlert(alertMsg, "positive");
            if (data == 'N' || data == 'A' || data == 'AC') {
                interestedCommunityElement(community_id).hide();
                refreshCommunitiesLeftSidebar();
            }
        }
    });
}

function interestedCommunityElement(community_id){
    return $("#interested_community_request_for_" + community_id);
}

function sendPeerRequest(url, receiving_profile_id, target_peer_name){

    var alertMsg = "Peer request to " + target_peer_name + " sent successfully."
    $.ajax({
        type: 'POST',
        url: url,
        data: { receiving_profile_id: receiving_profile_id },
        spinnerContext: addPeerElement(receiving_profile_id),
        spinnerType: "active_spinner",
        success: function(data){
            displayAlert(alertMsg, "positive");
            addPeerElement(receiving_profile_id).closest("li").replaceWith(data);

        }
    });
}

function acceptIncomingRequest(url, target_profile_id, target_peer_name){
    var alertMsg = "Peer request from " + target_peer_name + " accepted successfully."
    cancelPeerElement(target_profile_id).hide();
    $.ajax({
        type: 'PUT',
        url: url,
        spinnerContext: acceptIncomingRequestElement(target_profile_id),
        spinnerType: "active_spinner",
        success: function(data){
            if (data.status == 'A' || data.status == 'AC') {
                displayAlert(alertMsg, "positive");
                acceptIncomingRequestElement(target_profile_id).hide();
                newRequestElement(target_profile_id).hide();
                parentLiElementForAcceptIncomingRequest(target_profile_id).removeClass();
                refreshPeersLeftSidebar();
            }
            if (data.status == 'AC'){
                $("#msg_side_bar_new_request").hide();
            }
        }
    });
}

function deleteOutgoingRequest(url, target_profile_id, target_peer_name, view_mode){
    var alertMsg = "Peer request to " + target_peer_name + " removed successfully."
    acceptIncomingRequestElement(target_profile_id).hide();
    $.ajax({
        type: 'DELETE',
        url: url,
        data: {view_mode: view_mode},
        spinnerContext: cancelPeerElement(target_profile_id),
        spinnerType: "active_spinner",
        success: function(data){
            if (data) {
                displayAlert(alertMsg, "positive");
                parentLiElementForCancel(target_profile_id).remove();
            }
        }
    });
}

function addPeerElement(target_profile_id){
    return $("#add_to_peers_for_" + target_profile_id);
}

function cancelPeerElement(target_profile_id){
    return $("#delete_peer_request_for_" + target_profile_id);
}

function parentLiElementForCancel(target_profile_id){
    return cancelPeerElement(target_profile_id).closest("li");
}

function parentLiElementForAcceptIncomingRequest(target_profile_id){
    return $("#accept_incoming_request_for_" + target_profile_id).closest("li");
}

function newRequestElement(target_profile_id){
    return $("#msg_new_request_for_" + target_profile_id);
}

function acceptIncomingRequestElement(target_profile_id){
    return $("#accept_incoming_request_for_" + target_profile_id);
}
//view:/cg_community/apps/views/cg_community/_accept_or_cancel_request.erb--------------------------------------end

//view:app/views/cg_community/peers/_delete.erb----------------------------------------------------------------start

function cancelPeerAssociation(target_profile_id, target_peer_name){
    var alertMsg = "You have successfully removed " + target_peer_name + " as a peer."
    $.ajax({
        type: 'DELETE',
        url: cancelPeerAssociationFormElement(target_profile_id).attr('action'),
        spinnerContext: cancelPeerAssociationFormElement(target_profile_id),
        spinnerType: "form",
        success: function(data){
            if (data.status == 'D') {
                displayAlert(alertMsg, "positive");
                parentLiElementForCancelPeer(target_profile_id).remove();
                refreshPeersLeftSidebar();
            }
        }
    });
}

function cancelPeerAssociationFormElement(target_profile_id) {
    return $('#cancel_peer_association_form_for_' + target_profile_id);
}

function parentLiElementForCancelPeer(target_profile_id){
    return $("#parent_li_for_" + target_profile_id);
}
//view:app/views/cg_community/peers/_delete.erb----------------------------------------------------------------end
//view:/cg_community/apps/views/cg_community/peers/_search.erb-------------------------------------------------start

$("#organization_id").change(function(){
    var url = $('#organization_form').attr('action');
    var value = $(this).val();
    $.get(url+"?organization_id="+value,function(data){
        $('div#primary ul.entries').remove();
        $('div#primary a#more').remove();
        $('div#primary.peers').append(data);
    });
});

//view:/cg_community/apps/views/cg_community/peers/_search.erb-------------------------------------------------end

//CgCommunity::PeersController---------------------------------------------------------------------------------end


//CgCommunity::ProfileEducationsController-------------------------------------------------------------------------start
//view:app/views/cg_community/profile_educations/_education.erb----------------------------------------------------start

//Script for adding an education in the About form.

function sendAddEducationRequest(){
    removeFormHint(addEducationFormElement());
    if(InvalidMsg(addEducationFormElement())){
        $.ajax({
            type: 'POST',
            url: addEducationFormElement().attr('action'),
            data: addEducationFormElement().serialize(),
            spinnerContext: addEducationFormElement(),
            spinnerType: "form",
            success: function(html_data){
                if(html_data == 'failed'){
                    addEducationFormElement().parent().hide().prev().show();
                    displayAlert("Sorry something went wrong..", "negative");
                }else{
                    location.reload();
                }
            }
        });
    }
    else{
        addEducationFormElement().find("#profile_education_education_start_year").removeClass('required');
        addEducationFormElement().find("#profile_education_education_end_year").removeClass('required');
        updateFormHint(addEducationFormElement());
    }
    return false;
}

function sendEditEducationRequest(edu_id){
    removeFormHint(editEducationFormElement(edu_id));
    if(InvalidMsg(editEducationFormElement(edu_id))){
        editEducationFormElement(edu_id).find("#profile_education_education_end_month").addClass("end_date");
        $.ajax({
            type: 'POST',
            url: editEducationFormElement(edu_id).attr('action'),
            data: editEducationFormElement(edu_id).serialize(),
            spinnerContext: editEducationFormElement(edu_id),
            spinnerType: "form",
            success: function(html_data){
                if(html_data == 'failed'){
                    editEducationFormElement(edu_id).parent().hide().prev().show();
                    displayAlert("Sorry something went wrong.", "negative");
                }else{
                    editEducationFormElement(edu_id).parent().parent().replaceWith(html_data);
                    editEducationFormElement(edu_id).parent().hide();
                    updateFormHint(editEducationFormElement(edu_id));
                }
            }
        });
    }
    else{
        editEducationFormElement(edu_id).find('#profile_education_education_start_year').removeClass('required');
        editEducationFormElement(edu_id).find('#profile_education_education_end_year').removeClass('required');
        updateFormHint(editEducationFormElement(edu_id));
    }
    return false;
}


function addEducationFormElement() {
    return $('.add_education');
}

function editEducationFormElement(edu_id) {
    return $('.edit_education_' + edu_id);
}

function deleteEducation(edu_id) {
    $.ajax({
        type: 'POST',
        url: deleteEducationFormElement(edu_id).attr('action'),
        data: deleteEducationFormElement(edu_id).serialize(),
        spinnerContext: deleteEducationFormElement(edu_id),
        spinnerType: "form",
        success: function(html_data){
            if (html_data != "success") {
                deleteEducationFormElement(edu_id).parent().parent().replaceWith(html_data);
            } else {
                deleteEducationFormElement(edu_id).parent().parent().remove();
            }
        }
    });
}

function deleteEducationFormElement(edu_id) {
    return $('.delete_education_form_' + edu_id);
}

//view:app/views/cg_community/profile_educations/_education.erb----------------------------------------------------end
//CgCommunity::ProfileEducationsController-------------------------------------------------------------------------end

//CgCommunity::ProfileExperiencesController-----------------------------------------------------------------------start
//view:app/views/cg_community/profile_experiences/_experiences.erb-----------------------------------------------start
//Script for adding an experience in the About form.

function sendAddExperienceRequest(){
    removeFormHint(addExperienceFormElement());
    if(InvalidMsg(addExperienceFormElement())){
        $.ajax({
            type: 'POST',
            url: addExperienceFormElement().attr('action'),
            data: addExperienceFormElement().serialize(),
            spinnerContext: addExperienceFormElement(),
            spinnerType: "form",
            success: function(html_data){
                if(html_data == 'failed'){
                    addExperienceFormElement().parent().hide().prev().show();
                    displayAlert("Sorry something went wrong..", "negative");
                }else{
                    location.reload();
                }
            }
        });
    }
    else{
        addExperienceFormElement().find("#profile_experience_experience_end_year").removeClass("required");
        addExperienceFormElement().find("#profile_experience_experience_start_year").removeClass("required");
        updateFormHint(addExperienceFormElement());
    }
    return false;
}

function sendEditExperienceRequest(id) {
    removeFormHint(editExperienceFormElement(id));
    if(InvalidMsg(editExperienceFormElement(id))){
        editExperienceFormElement(id).find("#profile_experience_experience_end_month").addClass("end_date");
        $.ajax({
            type: 'POST',
            url: editExperienceFormElement(id).attr('action'),
            data: editExperienceFormElement(id).serialize(),
            spinnerContext: editExperienceFormElement(id),
            spinnerType: "form",
            success: function(html_data){
                if(html_data == 'failed'){
                    editExperienceFormElement(id).parent().hide().prev().show();
                    displayAlert("Sorry something went wrong.", "negative");
                }else{
                    editExperienceFormElement(id).parent().parent().replaceWith(html_data);
                    editExperienceFormElement(id).parent().hide();
                    updateFormHint(editExperienceFormElement(id));
                }
            }
        });
    }
    else{
        editExperienceFormElement(id).find("#profile_experience_experience_end_year").removeClass("required");
        editExperienceFormElement(id).find("#profile_experience_experience_start_year").removeClass("required");
        updateFormHint(editExperienceFormElement(id));
    }
    return false;
}


function addExperienceFormElement() {
    return $('.add_experience');
}

function editExperienceFormElement(exp_id) {
    return $('.edit_experience_' + exp_id);
}

function deleteExperience(exp_id) {
    $.ajax({
        type: 'POST',
        url: deleteExperienceFormElement(exp_id).attr('action'),
        data: deleteExperienceFormElement(exp_id).serialize(),
        spinnerContext: deleteExperienceFormElement(exp_id),
        spinnerType: "form",
        success: function(html_data){
            if (html_data != "success") {
                deleteExperienceFormElement(exp_id).parent().parent().replaceWith(html_data);
            } else {
                deleteExperienceFormElement(exp_id).parent().parent().remove();
            }
        }
    });
}

function deleteExperienceFormElement(exp_id) {
    return $('.delete_experience_form_' + exp_id);
}
//view:app/views/cg_community/profile_experiences/_experiences.erb------------------------------------------------end
//CgCommunity::ProfileExperiencesController-----------------------------------------------------------------------end

//CgCommunity::ProfilesController---------------------------------------------------------------------------------start
//view:app/views/cg_community/profiles/_display_contact.erb--------------------------------------------------------start
$('#new_address').live('submit', function(event){
     event.preventDefault();
    $.ajax({
    type: 'POST',
    dataType: 'html',
    url: $(this).attr('action'),
    data: $(this).serialize(),
    spinnerContext: $(this),
    spinnerType: "form",
    success: function(html_data){
        displayAlert("Address added successfully.", "positive");
        location.reload();
    },
    error: function(request, textStatus, errorThrown){
        handleAjaxError(request.status, {
            500: 'A server error occurred while saving the address.',
            base: 'There was an error saving.'
        });
    }
  });
  
});

$('#address_edit').live('submit', function(event){
    event.preventDefault();
    $.ajax({
        type: 'POST',
        dataType: 'html',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        spinnerContext: $(this),
        spinnerType: "form",
        success: function(html_data){
            displayAlert("Address edited successfully.", "positive");
            location.reload();
        },
        error: function(request, textStatus, errorThrown){
            handleAjaxError(request.status, {
                500: 'A server error occurred while saving the address.',
                base: 'There was an error saving.'
            });
        }

    });

});


$('#address_delete').live('submit', function(event){
    event.preventDefault();
    $.ajax({
        type: 'DELETE',
        dataType: 'html',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        spinnerContext: $(this),
        spinnerType: "form",
        success: function(html_data){
            location.reload();
            displayAlert("Address Delete successfully.", "positive");
        },
        error: function(request, textStatus, errorThrown){
            handleAjaxError(request.status, {
                500: 'A server error occurred while saving the address.',
                base: 'There was an error saving.'
            });
        }

    });

});

$("input#address_author_info_address").on('click', function(){
    if ($(this).prop("checked") == true) {
        $("span#error").append("By checking this  you will change your previous publication address to the new address above.");
    }else{
        $("span#error").text('');
    } 
});

$("a#edit").live('click', function(event){
   $("ul#entries_contact").show();
});

$( "button:reset" ).live('click', function(){
    $("ul#entries_contact").hide();});


function updateContactForm(event){
    event.preventDefault();
    removeFormHint(profileContactFormElement());
    if (profileContactFormElement().valid()){
        $.ajax({
            type: 'PUT',
            url: profileContactFormElement().attr('action'),
            data: profileContactFormElement().serialize(),
            spinnerContext: profileContactFormElement(),
            spinnerType: "form",
            success: function(html_data){
                $('ul.contact').find('li').remove();
                $('ul.contact').append(html_data);
                profileContactFormElement().submit(updateContactForm);
                updateFormHint(profileContactFormElement());
            },
            error: function(request, textStatus, errorThrown){
                handleAjaxError(request.status, {
                    500: 'A server error occurred changing the contact. Your changes may not have been saved.',
                    base: 'There was an error changing the structure.'
                });
            }
        });

    } else {
        updateFormHint(profileContactFormElement());
    } return false;
}

function profileContactFormElement() {
    return $('#form_profile_contact');
}

//view:app/views/cg_community/profiles/_display_contact.erb------------------------------------------------------end

//views:app/views/cg_community/profiles/_manage_resume.erb-------------------------------------------------------start

function addResumeRequest(event){
    event.preventDefault();
    removeFormHint(resumeFormElement());
    if (resumeFormElement().valid() && ($('#profile_resume_url').val() || $('ul.qq-upload-list li.qq-upload-success').length != 0)){
        var urlElement = $('#profile_resume_url');
        makeValidUrl(urlElement);
        $.ajax({
            type: 'POST',
            url: resumeFormElement().attr('action'),
            data: resumeFormElement().serialize(),
            spinnerContext: resumeFormElement(),
            spinnerType: "form",
            success: function(html_data){
                displayAlert("Resume added successfully.", "positive");
                $('#manage_resume .preview').replaceWith(html_data);
                $("#resume_updation_form").parent(".state-link").hide();
                $(".item .state-display").show();
                resumeFormElement()[0].reset();
                $('#community #primary.about #manage_resume').slideToggle(80);
                updateFormHint(resumeFormElement());
            }
        })
    }else {
        if($('.add_resume_url.toggle_content').css("display") == 'none'){
            displayAlert("Failed to add: File has no content.", "negative");
        }
        updateFormHint(resumeFormElement());
    }
    return false;
}


resumeFormElement().keyup(function(e) {
    jQuery("." + "blur" , resumeFormElement()).removeClass('blur').val('');
});

resumeFormElement().bind('reset', function() {
    $(".add_resume_url").hide();
    $(".add_resume_file").show();
    $(".qq-upload-button").show();
    $(".qq-upload-list").children().remove();
});

function resumeFormElement() {
    return $('#resume_updation_form');
}

//views:app/views/cg_community/profiles/_manage_resume.erb----------------------------------------------------end
//CgCommunity::ProfilesController--------------------------------------------------------------------------------end

//CgCommunity::CommunitiesController-----------------------------------------------------------------------------start
//view:view:app/views/cg_community/communities/_delete.erb-------------------------------------------------------start
function leaveCommunity(community_id, community_name){
    var successMsg = community_name + " is no longer your community."
    var inviteDeletedMsg = "You are successfully deleted " + community_name + "'s invitation."
    var onlyAdminMsg = "You are the only admin of this community, so you cannot leave " + community_name + ".";
    $.ajax({
        type: 'PUT',
        url: leaveCommunityFormElement(community_id).attr('action'),
        spinnerContext: leaveCommunityFormElement(community_id),
        spinnerType: "form",
        success: function(data){
            if (data == 'success' || data == 'invitation_deleted'){
                if (data == 'success') {displayAlert(successMsg, "positive")};
                if (data == 'invitation_deleted') {displayAlert(inviteDeletedMsg, "positive")};
                refreshCommunitiesLeftSidebar();
                parentLiElementForLeaveCommunity(community_id).remove();
            } else {
                displayAlert(onlyAdminMsg, "negative");
                leaveCommunityFormElement(community_id)[0].reset();
                leaveCommunityFormElement(community_id).closest('div.delete').hide();
                communityDisplayElement(community_id).show();
            }
        }
    });
}

function leaveCommunityFormElement(community_id) {
    return $('#leave_community_form_for_' + community_id);
}

function parentLiElementForLeaveCommunity(community_id){
    return $("#parent_li_for_" + community_id);
}

function communityDisplayElement(community_id){
    return $("#parent_li_for_" + community_id + ":first div.display");
}

//view:view:app/views/cg_community/communities/_delete.erb-------------------------------------------------------end
//CgCommunity::CommunitiesController-----------------------------------------------------------------------------end

//CgCommunity::AbstractUpdatesController---------------------------------------------------------------------start
//view:app/views/cg_community/abstract_updates/_view_update_entry.erb--------------------------------------start 
//Community : Ajaxifying adding the comment.
function sendAddCommentRequest(event) {
    event.preventDefault();
    //removeFormHint(addCommentFormElement());
    if(addCommentFormElement().valid()){
        var joinCommunity = false;
        var addToPeer = false;
        if($("#join_me_as_member").is(':checked') == true){
            var joinCommunity = true;
        }
        if($("#add_to_peer").is(':checked') == true){
            addToPeer = true;
            peer_name= $("#add_to_peer").val();
        }
        $.ajax({
            type: 'POST',
            url: addCommentFormElement().attr('action'),
            data: addCommentFormElement().serialize(),
            spinnerContext: addCommentFormElement(),
            spinnerType: "form",
            success: function(html_data){
                if(joinCommunity){
                    joinMeAsCommunityMemeber();
                }else if(addToPeer){
                    addToPeerList(peer_name)
                }
                else{
                    $(".entries").prepend(html_data);
                    $('#comment_text').val("");
                    var comments_count = $('#comments.entries > li').size();
                    if (comments_count == 1){
                        $('#update_content .options li a.edit').hide();
                    }
                }

                //updateFormHint(addCommentFormElement());
            }
        });
    }/*else{
     updateFormHint(addCommentFormElement());
     }	*/
    return false;
}

function addCommentFormElement(){
    return $("#new_comment");
}

$(".timeago").timeago();
function deleteCurrentComment(comment_id, update_shared, owner_of_update) {
    $.ajax({
        type: 'DELETE',
        url: $('#edit_comment_' + comment_id).attr('action'),
        spinnerContext: $('#edit_comment_' + comment_id),
        spinnerType: "form",
        success: function(data){
            var no_comments_exist = $('#comments.entries > li').size() == 0;
            var unstarred = $('.stars .star.active').size() == 0;
            if(data['comment_on_comment']){
                $('#edit_comment_' + comment_id).parent().parent().remove();
            }else{
                $('.comment_block_' + comment_id).remove();
            }
            if (no_comments_exist && unstarred && (update_shared == false) && owner_of_update ){
                $('#update_content > ul.options li a.edit').show();
            }
        },
        error: function(request, textStatus, errorThrown){
            handleAjaxError(request.status, {
                500: 'A server error occurred while deleting the comment. Your changes may not have been effected.',
                base: 'There was an error changing the structure.'
            });
        }
    });
}
//view:app/views/cg_community/abstract_updates/_view_update_entry.erb--------------------------------------end
//CgCommunity::AbstractUpdatesController-------------------------------------------------------------------end

//CgCommunity::MembersController---------------------------------------------------------------------------start
//view:app/views/cg_community/members/_act_on_member.erb---------------------------------------------------start

function sendMemberInvitationRequest(url, member_id, member_name){
    var alertMsg = "Invitation for " + member_name + " sent successfully."
    $.ajax({
        type: 'PUT',
        url: url,
        spinnerContext: $("#send_member_invitation_for_" + member_id),
        spinnerType: "active_spinner",
        success: function(data){
            displayAlert(alertMsg, "positive");
            parentLiElementForMemberInvitation(member_id).replaceWith(data);
        }
    });
}

function makeMemberAsAdminRequest(url, member_id, member_name){
    var alertMsg = "Admin rights for " + member_name + " granted successfully."
    $.ajax({
        type: 'PUT',
        url: url,
        spinnerContext:$("#make_admin_for_" + member_id),
        spinnerType: "active_spinner",
        success: function(data){
            displayAlert(alertMsg, "positive");
            parentLiElementForMakeAdminRequest(member_id).replaceWith(data);
            refreshMembersLeftSidebar();
        }
    });
}

function sendRevokeAdminRequest(url, member_id, member_name){
    var successMsg = "Admin rights for " + member_name + " revoked successfully."
    var onlyAdminMsg = "This is the community’s only admin. Their admin status can not be revoked."
    $.ajax({
        type: 'PUT',
        url: url,
        spinnerContext:$("#revoke_admin_for_" + member_id),
        spinnerType: "active_spinner",
        success: function(data){
            if (data == 'only_admin'){
                displayAlert(onlyAdminMsg, "negative");
            } else if (data == 'leave_as_an_admin') {
                window.location.reload();
            } else {
                displayAlert(successMsg, "positive");
                parentLiElementForRevokeAdminRequest(member_id).replaceWith(data);
                refreshMembersLeftSidebar();
            }
        }
    });
}

function acceptMemberRequest(url, member_id, member_name){
    var alertMsg = member_name + " was added as a member of the community."
    $.ajax({
        type: 'PUT',
        url: url,
        spinnerContext: $("#accept_member_request_for_" + member_id),
        spinnerType: "active_spinner",
        success: function(data){
            displayAlert(alertMsg, "positive");
            parentLiElementForacceptMemberRequest(member_id).replaceWith(data);
            refreshMembersLeftSidebar();
            refreshLeftBarNewMemberRequestMsg();
        }
    });
}

function sendCancelInvitationRequest(url, member_id, member_name){
    var alertMsg = "Invitation for " + member_name + " cancelled successfully."
    $.ajax({
        type: 'PUT',
        url: url,
        spinnerContext: $("#cancel_member_invitation_for_" + member_id),
        spinnerType: "active_spinner",
        success: function(data){
            displayAlert(alertMsg, "positive");
            parentLiElementForCancelMember(member_id).remove();
        }
    });
}

function parentLiElementForMemberInvitation(member_id){
    return sendMemberInvitationElement(member_id).closest("li");
}

function sendMemberInvitationElement(member_id){
    return $("#send_member_invitation_for_" + member_id);
}

function cancelMemberInvitationElement(member_id){
    return $("#cancel_member_invitation_for_" + member_id);
}

function parentLiElementForCancelMember(member_id){
    return cancelMemberInvitationElement(member_id).closest("li");
}

function parentLiElementForacceptMemberRequest(member_id){
    return acceptMemberRequestElement(member_id).closest("li");
}

function newMemberRequestElement(member_id){
    return $("#msg_new_request_for_" + member_id);
}

function acceptMemberRequestElement(member_id){
    return $("#accept_member_request_for_" + member_id);
}

function parentLiElementForMakeAdminRequest(member_id){
    return makeAdminElement(member_id).closest("li");
}

function makeAdminElement(member_id){
    return $("#make_admin_for_" + member_id);
}

function parentLiElementForRevokeAdminRequest(member_id){
    return revokeAdminElement(member_id).closest("li");
}

function revokeAdminElement(member_id){
    return $("#revoke_admin_for_" + member_id);
}

//view:app/views/cg_community/members/_act_on_member.erb---------------------------------------------------end
//CgCommunity::MembersController---------------------------------------------------------------------------end


//class CgCommunity::AbstractInterestsController-------------------------------------------------------------start
//view:app/views/cg_community/abstract_interests/index.html---------------------------------------------------start




function addInterestRequest(event){
   if(event != undefined){
    event.preventDefault();
    removeFormHint(addInterestFormElement());
    if(addInterestFormElement().valid()){
        $.ajax({
            type: 'POST',
            url: addInterestFormElement().attr('action'),
            data: addInterestFormElement().serialize(),
            spinnerContext: addInterestFormElement(),
            spinnerType: "form",
            success: function(html_data){
                $('.entries').prepend(html_data);
                $('div#no_interest').hide();
                $('#profile_interest').prepend(html_data);
                addInterestFormElement()[0].reset();
                refreshInterestAnnotation('added');
                updateFormHint(addInterestFormElement());
            }
        })
    } else {
        updateFormHint(addInterestFormElement());
    }
    return false;
   }
}

function removeFormHint(form){
    jQuery('.blur', form).removeClass('blur').val('');
}
function updateFormHint(form){
    form.formHint();
}
function refreshInterestAnnotation(mode){
    if (mode == 'deleted'){
        if ($("ul.entries > li").length == 0){
            $("div.mod div#add_interest_label_holder").hide();
            $("div.mod div#annotation_holder").show();
        }
    } else {
        $("div.mod div#annotation_holder").hide();
        $("div.mod div#add_interest_label_holder").show();
    }
}


function addInterestFormElement() {
    return $('.new_profile_interest');
}

function deleteInterest(interest_id, display) {
    display = display || true;
    $.ajax({
        type: 'DELETE',
        url: deleteInterestFormElement(interest_id).attr('action'),
        data: deleteInterestFormElement(interest_id).serialize(),
        spinnerContext: deleteInterestFormElement(interest_id),
        spinnerType: "form",
        success: function(html_data){
            if (html_data != "success" && display) {
                deleteInterestFormElement(interest_id).parent().parent().replaceWith(html_data);
            }else{
                deleteInterestFormElement(interest_id).parent().parent().remove();
            }
            deleteInterestFormElement(interest_id).parent().parent().remove();
            // refreshInterestsSidebar();
            // refreshInterestAnnotation('deleted');
        }
    });
}

function deleteInterestFormElement(interest_id) {
    return $('.delete_interest_form_' + interest_id);
}

//view:app/views/cg_community/abstract_interests/index.html----------------------------------------------------end
//class CgCommunity::AbstractInterestsController---------------------------------------------------------------end

//script for adding an topic in the account settings form.

function addTopicsOrLanguages(url, element){
    $.ajax({
        type: 'POST',
        data_type: "html",
        url: url,
        success: function(data){
            if (data != "Failed") {
                if ($("." + element).find('ul').length == 0) {
                    $(".search-field input").attr('data-last-search', '')
                    $(".search-field input").val('')
                    $("." + element).parent().find(".live-results").addClass("display_none")
                    $("." + element).prepend(data);
                    var ele = element.replace('ul', '');
                    $("." + ele).parent().children('.no_topic_or_language').hide();
                } else {
                    $("." + element).parent().find("input").attr('data-last-search', '')
                    $("." + element).parent().find("input").val('')
                    $(".live_search").hide();
                    $("." + element).find('ul').prepend(data);
                }
            }

        },error: function(xhr){
            handleAjaxError(xhr.status, {
                base: "Sorry something went wrong. "
            });
        },
    });
    return false;
}

function addTopicFormElement() {
    return $('.new_profile_topic');
}

function deleteTopic(topic_id,  display= true) {
    $.ajax({
        type: 'DELETE',
        url: deleteTopicFormElement(topic_id).attr('action'),
        data: deleteTopicFormElement(topic_id).serialize(),
        spinnerContext: deleteTopicFormElement(topic_id),
        spinnerType: "form",
        success: function(html_data){
            if (html_data != "success" && display) {
                deleteTopicFormElement(topic_id).parent().parent().replaceWith(html_data);
            }else{
                deleteTopicFormElement(topic_id).parent().parent().remove();
            }
        }
    });
}

function deleteTopicFormElement(topic_id) {
    return $('.delete_topic_form_' + topic_id);
}

//script for adding an languages in the account settings form.

function addLanguageFormElement() {
    return $('.new_profile_language');
}

function deleteLanguage(language_id, display= true) {
    $.ajax({
        type: 'DELETE',
        url: deleteLanguageFormElement(language_id).attr('action'),
        data: deleteLanguageFormElement(language_id).serialize(),
        spinnerContext: deleteLanguageFormElement(language_id),
        spinnerType: "form",
        success: function(html_data){
            if (html_data != "success" && display) {
                deleteLanguageFormElement(language_id).parent().parent().replaceWith(html_data);
            }else{
                deleteLanguageFormElement(language_id).parent().parent().remove();
            }
        }
    });
}

function deleteLanguageFormElement(language_id) {
    return $('.delete_language_form_' + language_id);
}


//CgCommunity::AbstractProfileLinksController-------------------------------------------------------------------start
//views:app/views/cg_community/abstract_profile_links/_links.erb------------------------------------------------start


//Script for adding an link in the About form.

function sendAddLinkRequest(){
    removeFormHint(addLinkFormElement());
    if(InvalidMsg(addLinkFormElement())){
        var urlElement = $('#profile_link_profile_link_url');
        makeValidUrl(urlElement);
        $.ajax({
            type: 'POST',
            url: addLinkFormElement().attr('action'),
            data: addLinkFormElement().serialize(),
            spinnerContext: addLinkFormElement(),
            spinnerType: "form",
            success: function(html_data){
                $(".links").prepend(html_data);
                if(addLinkFormElement().attr('action') && addLinkFormElement().attr('action').includes("community_profiles")) {
                    $("#add_entry_link").hide();
                } else {
                    $("#new_profile_link").hide();
                    $("#new_profile_link").parent().parent().children("div.state-display").show();
                }
                addLinkFormElement()[0].reset();
                 $(".links .teaser").parent().remove();
                updateFormHint(addLinkFormElement());
            }
        })
    }
    else{
        updateFormHint(addLinkFormElement());
    }
    return false;
}

function sendEditLinkRequest(link_id) {
    removeFormHint(editLinkFormElement(link_id));
    if(InvalidMsg(editLinkFormElement(link_id))){
        var urlElement = $(".edit_link_" + link_id +" #profile_link_profile_link_url");
        makeValidUrl(urlElement);
        $.ajax({
            type: 'POST',
            url: editLinkFormElement(link_id).attr('action'),
            data: editLinkFormElement(link_id).serialize(),
            spinnerContext: editLinkFormElement(link_id),
            spinnerType: "form",
            success: function(html_data){
                editLinkFormElement(link_id).parent().parent().replaceWith(html_data);
                editLinkFormElement(link_id).parent().hide();
                updateFormHint(editLinkFormElement(link_id));
            }
        })
    }
    else{
        updateFormHint(editLinkFormElement(link_id));
    }
    return false;
}

function InvalidMsg(form) {
    var formValid = [];
    var form_id = form.attr('id');
     $("#" + form_id + ' ' + "input[type=text]").each( function(){
       if ( $(this).val()){
           formValid.push(true)
       }else if($(this).prop('required')) {
           formValid.push(false);
           $(this)[0].setCustomValidity('Please fill in this field.')
       }
         $(this)[0].reportValidity();
         $(this)[0].setCustomValidity('')
    });
     if (jQuery.inArray(false, formValid) != -1){
         return false;
     }else{
         return true;
    };
}

function addLinkFormElement() {
    return $('.add_link');
}

function editLinkFormElement(link_id) {
    return $('.edit_link_' + link_id);
}

function deleteLink(link_id) {
    $.ajax({
        type: 'POST',
        url: deleteLinkFormElement(link_id).attr('action'),
        data: deleteLinkFormElement(link_id).serialize(),
        spinnerContext: deleteLinkFormElement(link_id),
        spinnerType: "form",
        success: function(html_data){
            if (html_data != "success") {
                deleteLinkFormElement(link_id).parent().parent().replaceWith(html_data);
            } else {
                deleteLinkFormElement(link_id).parent().parent().remove();
            }
        }
    });
}

function deleteLinkFormElement(edu_id) {
    return $('.delete_link_form_' + edu_id);
}
//views:app/views/cg_community/abstract_profile_links/_links.erb------------------------------------------------end
//CgCommunity::AbstractProfileLinksController-------------------------------------------------------------------end


//CgCommunity::AbstractSharesController -----------------------------------------------------------------------start
//views:app/views/cg_community/abstract_shares/index.html.erb--------------------------------------------------start
$(".shares .controls .delete").live('click', function() {
    deleteCurrentShare($(this).parents("form").attr('id').replace("edit_share_", ""));
    return false;
});

function deleteCurrentShare(share_id) {
    $.ajax({
        type: 'POST',
        url: deleteShareFormElement(share_id).attr('action'),
        data: deleteShareFormElement(share_id).serialize(),
        spinnerContext: deleteShareFormElement(share_id),
        spinnerType: "form",
        success: function(){
            displayAlert("Share removed successfully.", "positive");
            deleteShareFormElement(share_id).parent().parent().remove();
            refreshSharesSidebar();
            refreshShareAnnotation('deleted');
        },
        error: function(request, textStatus, errorThrown){
            handleAjaxError(request.status, {
                500: 'A server error occurred when removing the share.  Please try again later.',
                base: 'There was an error removing the share.'
            });
        }
    });
}


function addShareRequest(event){
    event.preventDefault();

    var final_lti_share_url = window.location.protocol + '//' + window.location.host + '/scholar/tool/launch?'
        + $('.lti_tools_url').val() + '?' + $('#share_url').val();

    if ($('.lti_tools_url').val() !== 'Select a LTI Tool') {
        $('#add_share_url').val(final_lti_share_url);
    } else {
        $('#add_share_url').val($('#share_url').val());
    }
    removeFormHint(addShareFormElement());
    if ((addShareFormElement().valid()) && ($('#add_share_url').val() || $('ul.qq-upload-list li.qq-upload-success').length != 0)){
        var urlElement = $('#add_share_url');
        makeValidUrl(urlElement);
        $.ajax({
            type: 'POST',
            url: addShareFormElement().attr('action'),
            data: addShareFormElement().serialize(),
            spinnerContext: addShareFormElement(),
            spinnerType: "form",
            success: function(html_data){
                displayAlert("Share added successfully.", "positive");
                $(".entries").prepend(html_data);
                $("#add_entry_share").hide();
                refreshSharesSidebar();
                addShareFormElement()[0].reset();
                refreshShareAnnotation('added');
                $("div.mod div.hidden_content").hide();
                updateFormHint(addShareFormElement());
            },
            error: function(request, textStatus, errorThrown){
                handleAjaxError(request.status, {
                    500: 'A server error occurred when adding the share.  Please try again later.',
                    base: 'There was an error adding the share.'
                });
            }
        })
    } else {
        if(($('.add_share_url.toggle_content').css("display") == 'none')
            && ($('ul.qq-upload-list li.qq-upload-success').length == 0)){
            displayAlert("Failed to add: File has no content.", "negative"); }
        updateFormHint(addShareFormElement());
    }
    return false;
}


addShareFormElement().bind('reset', function() {
    $(".add_share_url").hide();
    $(".add_share_file").show();
    $(".qq-upload-button").show();
    $(".qq-upload-list").children().remove();
});



function addShareFormElement() {
    return $('.share_form');
}


function refreshShareAnnotation(mode){
    if (mode == 'deleted'){
        if ($("ul.entries > li").length == 0){
            $("div.mod div#add_share_label_holder").hide();
            $("div.mod div#annotation_holder").show();
        }
    } else {
        $("div.mod div#annotation_holder").hide();
        $("div.mod div#add_share_label_holder").show();
    }
}

function deleteShareFormElement(share_id) {
    return $('#edit_share_' + share_id);
}

function titleElement() {
    return $("#share_share_title");
}

//views:app/views/cg_community/abstract_shares/index.html.erb--------------------------------------------------end
//CgCommunity::AbstractSharesController -----------------------------------------------------------------------end

//CgCommunity::CommunitiesController------------------------------------------------------------------------------start
//views:app/views/cg_community/communities/_act_on_community.html.erb---------------------------------------------start
//community_privacy_options 'O' and 'P' means "Open" and "Public"
function sendJoinCommunityRequestFromList(url, community_id, community_name,community_privacy_option){
    if (community_privacy_option == 'O' || community_privacy_option == 'P') {
        var alertMsg = "Successfully joined " + community_name + ".";
    } else {
        var alertMsg = "Membership request sent to " + community_name + ".";
    }
    $.ajax({
        type: 'POST',
        url: url,
        spinnerContext: interestedCommunityElement(community_id),
        spinnerType: "active_spinner",
        success: function(data){
            displayAlert(alertMsg, "positive");
            if (data == 'N' || data == 'A' || data == 'AC') {
                interestedCommunityElement(community_id).hide();
                refreshCommunitiesLeftSidebar();
            }
        }
    });
}

function sendCancelJoinCommunityRequestFromList(url, community_id, community_name){
    var alertMsg = "Membership request to join " + community_name + " was canceled."
    $.ajax({
        type: 'PUT',
        url: url,
        spinnerContext:$('#cancel_interested_community_request_for_' + community_id),
        spinnerType:"active_spinner",
        success: function(data){
            displayAlert(alertMsg, "positive");
            if (data == 'D') {
                parentLiElementForcancelInterestedCommunity(community_id).remove();
            }
        }
    });
}

function sendAcceptInvitationRequest(url, community_id, community_name){
    var alertMsg = "You are now member of " + community_name + ".";
    $.ajax({
        type: 'PUT',
        url: url,
        spinnerContext:$('#accept_invitation_request_for_' + community_id),
        spinnerType:"active_spinner",
        success: function(data){
            if (data == 'A' || data == 'AC') {
                displayAlert(alertMsg, "positive");
                acceptInvitationElement(community_id).hide();
                invitationMsgElement(community_id).remove();
                refreshCommunitiesLeftSidebar();
            }
        }
    });
}

function cancelInterestedCommunityElement(community_id){
    return $("#cancel_interested_community_request_for_" + community_id);
}

function acceptInvitationElement(community_id){
    return $("#accept_invitation_request_for_" + community_id);
}

function communityRequestedMsgElement(community_id){
    return $("#msg_requested_for_" + community_id)
}

function invitationMsgElement(community_id){
    return $("#msg_invitation_for_" + community_id)
}

function parentLiElementForcancelInterestedCommunity(community_id){
    return cancelInterestedCommunityElement(community_id).closest("li");
}
//views:app/views/cg_community/communities/_act_on_community.html.erb---------------------------------------------end


//CgCommunity::CommunitiesController------------------------------------------------------------------------------end

//CgCommunity::MembersController ----------------------------------------------------------------------------start
//views:app/views/cg_community/_delete.html.erb--------------------------------------------------------------start
function cancelMembership(member_id, member_name, pending_request){
    if (pending_request == 'true'){
        var msg = "'s membership request has been declined."
    } else {
        var msg = " is no longer a member of the community."
    }
    var successMsg = member_name + msg ;
    var onlyAdminMsg = "This is the community’s only admin. Their admin status can not be revoked."
    $.ajax({
        type: 'PUT',
        url: cancelMembershipFormElement(member_id).attr('action'),
        spinnerContext: $(".disableButton"),
        spinnerType: "form",
        success: function(data){
            if (data == 'only_admin'){
                displayAlert(onlyAdminMsg, "negative");
                cancelMembershipFormElement(member_id)[0].reset();
                cancelMembershipFormElement(member_id).closest('div.delete').hide();
            } else {
                displayAlert(successMsg, "positive");
                refreshMembersLeftSidebar();
                parentLiElementForCancelMembership(member_id).remove();
            }
        }
    });
}

function cancelMembershipFormElement(member_id) {
    return $('#cancel_membership_form_for_' + member_id);
}

function parentLiElementForCancelMembership(member_id){
    return $("#parent_li_for_" + member_id);
}

//views:app/views/cg_community/_delete.html.erb--------------------------------------------------------------end
//CgCommunity::MembersController ----------------------------------------------------------------------------end


//for url validation------------------------------------------------------------------------------------------start

function makeValidUrl(urlElement){
    var url = urlElement.val();
    if(url != ""){
        var urlregex = new RegExp("^(http:\/\/|https:\/\/|ftp:\/\/){1}([0-9A-Za-z\.]+)\.");
        if(!urlregex.test(url)){
            url = "http://" + url;
        }
        urlElement.val(encodeURI(url));
    }
}

//for url validation------------------------------------------------------------------------------------------end  

$(function(){
    if($('#student_community_setting').val() == "student_community_setting"){
        $('input[id="community_type_membership_public"], input[id="community_type_membership_open"]').attr("disabled", true);
    }
});

//CgCommunity::MessagesController ..................................................................................start
//view: app/views/cg_community/messages/index.html.erb.............................................................start
function addReplyMessageRequest(event){
    event.preventDefault();
    if($("form").valid()){
        $.ajax({
            type: 'POST',
            url: $("form").attr('action'),
            data: $("form").serialize(),
            spinnerContext: $("form"),
            spinnerType: "form",
            success: function(html_data){
                displayAlert("Reply to thread added successfully.", "positive");
                $(".entries").append(html_data);
                $("form")[0].reset();
            },
            error: function(request, textStatus, errorThrown){
                handleAjaxError(request.status, {
                    500: 'A server error occurred when adding the reply.  Please try again later.',
                    base: 'There was an error adding the reply.'
                });
            }
        })
    }
    return false;
}

//view: app/views/cg_community/messages/index.html.erb.............................................................end
//CgCommunity::MessagesController ..................................................................................end

//for live search peers,members,communities if search results are empty..............................................start 
function removeLiveSearchResults(){
    if(liveSearchElement().val()=="" || liveSearchElement().length <=2){
        $("#live_search").find(".entries").find('.li').remove();
        $("#live_search").find(".entries").remove();
        $("#live_search").find("#live_search_more_recs").remove();
        $('div.no_search_results').remove();
        $("#overlay_content .item").find(".live_search").hide();
        $('div.character_set').remove();
    }
}
//for live search peers,members,communities if search results are empty................................................end
//flash message for live search........................................................................................start
function flashMessage(element) {
    var timeOut = 3000
    removeLiveSearchResults();
    element.append("<div class = 'character_set'>Please enter more than two characters</div>").fadeIn()
    setTimeout(function() {
        element.find('div.character_set').remove()
    }, timeOut);
}
//flash message for live search........................................................................................end

//CgCommunity::PrivacySettingsController-------------------------------------------------------------------------------------start
//view: app/views/cg_community/privacy_settings/_show_options.erb.............................................................start
function addPrivacySettings(event){
    event.preventDefault();
    var option = privacySettingFormElement().find("input[name='profile[privacy_option]']:checked").val();
    $.ajax({
        type: 'PUT',
        url: privacySettingFormElement().attr('action'),
        data: privacySettingFormElement().serialize(),
        spinnerContext: privacySettingFormElement(),
        spinnerType: "form",
        success: function(html_data){
            $(".edit_profile button[type='submit']").removeAttr('disabled');
            if (html_data != 'success'){
                $('#settings #content_1 #privacy_setting_form').parent().hide();
                $('#settings #content_1 #privacy_setting_form').parent().prev().show();
                $('#support #content_1 #privacy_setting_form').parent().hide();
                $('#support #content_1 #privacy_setting_form').parent().prev().show();
                console.log(html_data);
                $(".profile_privacy").find('p').replaceWith(html_data);
                if(option != 'P'){
                    displayAlert('Privacy Settings saved successfully.', "positive");
                }
            } else {
                $('#primary.settings').children().remove();
                $('#primary.settings').append(html_data);
            }
        },
        error: function(request, textStatus, errorThrown){
            handleAjaxError(request.status, {
                500: 'A server error occurred changing the privacy settings. Your changes may not have been saved.',
                base: 'There was an error changing the structure.'
            });
        }
    });

}

function addMessageSettings(event){
    console.log('message_setting_form');
    event.preventDefault();
    $.ajax({
        type: 'PUT',
        url: messageSettingFormElement().attr('action'),
        data: messageSettingFormElement().serialize(),
        spinnerContext: messageSettingFormElement(),
        spinnerType: "form",
        success: function(html_data){
            $(".edit_profile button[type='submit']").removeAttr('disabled');
            if (html_data != 'success'){
                $('#settings #content_1 #message_setting_form').parent().hide();
                $('#settings #content_1 #message_setting_form').parent().prev().show();
                $('#support #content_1 #message_setting_form').parent().hide();
                $('#support #content_1 #message_setting_form').parent().prev().show();
                $(".message_privacy").find('p').replaceWith(html_data);
                displayAlert('Message privacy settings saved successfully.', "positive");
            } else {
                $('#primary.settings').children().remove();
                $('#primary.settings').append(html_data);
            }
        },
        error: function(request, textStatus, errorThrown){
            handleAjaxError(request.status, {
                500: 'A server error occurred changing the privacy settings. Your changes may not have been saved.',
                base: 'There was an error changing the structure.'
            });
        }
    });

}

function privacySettingFormElement() {
    return $('#privacy_setting_form');
}

function messageSettingFormElement() {
    return $('#message_setting_form');
}

//view: app/views/cg_community/privacy_settings/_show_options.erb.............................................................end
//view: app/views/cg_community/privacy_settings/warning_about_public_setting.erb.............................................................strat	

function confirmPrivacySettings(event){
    event.preventDefault();
    $.ajax({
        type: 'PUT',
        url: confirmPrivacySettingFormElement().attr('action'),
        data: confirmPrivacySettingFormElement().serialize(),
        spinnerContext: confirmPrivacySettingFormElement(),
        spinnerType: "form",
        success: function(html_data){
            $(".edit_profile button[type='submit']").removeAttr('disabled');
            $('.confirm_edit_profile').parents('div.state-display').children().first().replaceWith(html_data);
            displayAlert('Privacy Settings saved successfully.', "positive");
            $('#primary.settings').children().remove();
            $('#primary.settings').append(html_data);

        },
        error: function(request, textStatus, errorThrown){
            handleAjaxError(request.status, {
                500: 'A server error occurred changing the privacy settings. Your changes may not have been saved.',
                base: 'There was an error changing the structure.'
            });
        }
    })
}

function confirmPrivacySettingFormElement() {
    return $('.confirm_edit_profile');
}



//view: app/views/cg_community/privacy_settings/warning_about_public_setting.erb.............................................................end
//CgCommunity::PrivacySettingsController-----------------------------------------------------------------------------------------------------end

//CgCommunity::CommunityPrivacySettingsController------------------------------------------------------------------------------------------start
//view: app/views/cg_community/community_privacy_settings/_script.html.erb.............................................................start
function addCommunityPrivacySettings(event){
    event.preventDefault();
    var name = $('#community_privacy_setting_form #community_name').val();
    if(name != ""){
        $.ajax({
            type: 'PUT',
            url: communitySettingFormElement().attr('action'),
            data: communitySettingFormElement().serialize(),
            spinnerContext: communitySettingFormElement(),
            spinnerType: "form",
            success: function(html_data){
                if (html_data == 'success'){
                    $('.sidebar .user .mod_title h2').text(name);
                    displayAlert('Community Settings saved successfully.', "positive");
                }else if(html_data == 'community_name_already_taken'){
                    displayAlert('Community Name is required.', "negative");
                }
            },
            error: function(request, textStatus, errorThrown){
                handleAjaxError(request.status, {
                    500: 'A server error occurred changing the privacy settings. Your changes may not have been saved.',
                    base: 'There was an error changing the structure.'
                });
            }
        })
    }else{
        displayAlert("Community Name can't be blank.", "negative");
    }
}


function communitySettingFormElement() {
    return $('#community_privacy_setting_form');
}

//view: app/views/cg_community/community_privacy_settings/_script.html.erb.............................................................end
//CgCommunity::CommunityPrivacySettingsController---------------------------------------------------------------------------------------end

//spinning for profile and community creation............................................................................................start

function addSpinningToCreateProfile(formElement){
    formElement.on('submit', function(){
        removeFormHint(formElement);
        if(formElement.valid()){
            $(this).find('div#controls').addClass('loading');
            $(this).find('div#controls button').attr('disabled', 'disabled');
        }else{
            return false;
        }
    });
}

function addSpinningToFinishProfile(){
    $('div#controls').addClass('loading');
    $('div#controls button').attr('disabled', 'disabled');
}

//spinning for profile and community creation............................................................................................end

function addOrcidId(event) {
    event.preventDefault();
    removeFormHint(addOrcidIdFormElement());
    var orcid_id_value = Array();
    // $(".orcid_id li .edit form input.orcid_id").each(function() {
    //     orcid_id_value.push($(this).val());
    // });
    orcid_id_value.push($('.form_for_orcid_id input#account_orcid_id').val());
    orcid_id_value = jQuery.grep(orcid_id_value, function(n){ return (n); });
    if((orcid_id_value.join("").length >= 1) && (orcid_id_value.join("").length < 16) ){
        displayAlert("ORCID ID must be 16 digits", "negative");
        return false;
    }

    if($(".form_for_orcid_id").valid()){
        var form = $(this);
        $.ajax({
            type:'POST',
            url:$(".form_for_orcid_id").attr('action'),
            data:$(".form_for_orcid_id").serialize(),
            spinnerContext: $(".form_for_orcid_id"),
            spinnerType: "form",
            success:function (html_data) {
                if(orcid_id_value.length == 0) {
                    value = orcidTeaserMessage();
                }else if(orcid_id_value.length == 1){
                    value = orcid_id_value;
                }else{
                    value = orcidUpdateLink(orcid_id_value.join("-"));
                }
                $(".orcid_id li .display p").html(value);
                $(".orcid_id li .edit").attr("style", "display: none");
                $(form.parent().prev().find('p')).text(value[0]);
                $(form).find('p a').text(value[0])
                $(form.parent()).hide();
                $("#settings #content_1  div.state-display").show();
                $(".orcid_id li .display").first().attr("style", "display: visible");
                $(".orcid_id li .options li .edit").attr("style", "display: visible");
                updateFormHint(addOrcidIdFormElement());
                displayAlert("ORCID ID updated successfully", "positive");
            },
            error:function (request, textStatus, errorThrown) {
                switch (request.status) {
                    case 500:
                        msg = 'A server error occurred when updating your profile.  Please try again later.';
                        break;
                    case 422:
                        msg = request.responseText;
                        break;
                    default:
                        msg = 'There was an error when updating your profile.';
                }
                displayAlert(msg, "negative");
            }
        });
    }
    else{
        updateFormHint(addOrcidIdFormElement());
    }
    return false;
}

function addOrcidIdFormElement() {
    return $(".form_for_orcid_id");
}

$('#about .entries.orcid_id .controls button[type=reset]').click(function(){
    if($(this).css('display') == 'block'){
        var orcidId = $('.entries.orcid_id p').html();
        $('#profile_orcid_id').val(orcidId);
    }
});

// See CMTY-465
$(document).ready(function() {
    addMoreFormElement().on('submit', addMore);
    addOrcidIdFormElement().on('submit', addOrcidId);
    addCommentFormElement().on('submit', sendAddCommentRequest);
    addInterestFormElement().on('submit', addInterestRequest);
    addBlipFormElement().on('submit', addBlip);
    addShareFormElement().on('submit', addShareRequest);
    if (typeof updateFormElement !== 'undefined') {
        updateFormElement().on('submit', sendUpdateRequest);
    }
    communitySettingFormElement().on('submit', addCommunityPrivacySettings);
    profileContactFormElement().on('submit', updateContactForm);
    privacySettingFormElement().on('submit', addPrivacySettings);
    messageSettingFormElement().on('submit', addMessageSettings);
    resumeFormElement().on('submit', addResumeRequest);
    $('.messageReply').on('submit', addReplyMessageRequest);

    if ($(document).height() > $(window).height() == false){
        // IE Browser returns css display value as 'inline'. So we are allowing to trigger the click event for inline value also.
        if((jQuery.inArray(infinite_spinning_elements().css('display'), ['block', 'inline']) > -1 ) && (infinite_spinning_elements().attr('class') == 'button')){
            infinite_spinning_elements().trigger('click');
        }
    }

    $(window).scroll(function(){
        //$(window).scrollTop() >= (($(document).height() - $(window).height())*0.99
        //document.documentElement.clientHeight + $(document).scrollTop() >= document.body.offsetHeight
        if ($('div#primary .entries').length > 0){
            var elem = $('div#primary .entries');
            var stream_end = elem[0].scrollHeight + elem.offset().top;
            var page_scroll = $(window).scrollTop()+$(window).height();
            if(stream_end <= page_scroll){
                // IE Browser returns css display value as 'inline'. So we are allowing to trigger the click event for inline value also.
                if((jQuery.inArray(infinite_spinning_elements().css('display'), ['block', 'inline']) > -1 ) && (infinite_spinning_elements().attr('class') == 'button')){
                    infinite_spinning_elements().trigger('click');
                }
            }
        }
    });

    $("div#overlay_content").scroll(function(){
        if ($('div#overlay_content .entries').length > 0){
            var elem = $('div#overlay_content .entries');
            var stream_end = elem[0].scrollHeight + elem.offset().top;
            var page_scroll = $(window).scrollTop()+$(window).height();
            if(stream_end <= page_scroll){
                // IE Browser returns css display value as 'inline'. So we are allowing to trigger the click event for inline value also.
                if((jQuery.inArray(infinite_spinning_elements().css('display'), ['block', 'inline']) > -1 ) &&  (infinite_spinning_elements().attr('class') == 'more')){
                    infinite_spinning_elements().trigger('click');
                }
            }
        }
    });

    //Open the update in new tab when the update decription contain external links
    $('.update_body p').find('a').not('a[rel="footnote"]').attr("target", "_blank");
});

//adding infinite spinning 
function infinite_spinning_elements(){
    return $('div#primary.publications, div#primary.stream, div#primary.peers, div#primary.members, div#primary.updates, div#primary.update, div#primary.communities, div#primary.shares, div#overlay_content').find('.buttons #more, .buttons a.more');
}

$(document).ready(function() {
    // attachment anchor tags applied on view
    $("div.cg_attachment").each(function() {
        initAttachmentDownload(this);
    });
    $("a.more").removeAttr('target');
});


function initAttachmentDownload(ele){
    var outer_div = $(ele),
        attachment_div = outer_div.find('.media_container'),
        caption_div = outer_div.find('.caption'),
    //media_url is protected in our dataprocessor
        attachment_url = attachment_div.attr('media_url');

    if(typeof attachment_url === typeof undefined || attachment_url == false ){
        var container_link = $(attachment_div).find('a')[0];
        attachment_url =  $(container_link).attr('href');
    }
    attachment_div.wrapInner('<a href="'+attachment_url+'" />');
    caption_div.wrapInner('<a href="'+attachment_url+'" />');
}
// tagging to particular comment and highlighting the commented text
$(document).ready(function() {
    $(".live_search.at_data").hide();
    $(".find_next").hide();
    var index = 0;
    var count = 0;
// function which replace with span tag to highlight the particular matching word
    function highlightSearchText(searchString,matching_text) {
        for (var i = searchString.length - 1; i >= 0; --i) {
            var textvalue = searchString[i].innerHTML;
            var findstring = textvalue.split(/@[\S][a-zA-Z.() ]+,[\s]*[a-zA-Z][a-zA-Z.#\-=+(){}?<>,`~ ]+:/gi).pop(0);
            var matchArray;
            var resultString = "";
            var first = 0;
            var last = 0;
            while ((matchArray = matching_text.exec(findstring)) != null) {
                last = matchArray.index;
                // get all of string up to match, concatenate
                resultString += findstring.substring(first, last);
                // add matched, with class
                resultString += "<span class='highlighted' style='background-color: yellow;'>" + matchArray[0] + "</span>";
                first = matching_text.lastIndex;
                count = count + 1;
            }
            resultString += findstring.substring(first,findstring.length);
            var tmpStr1  = textvalue.match(/@[\S][a-zA-Z.() ]+,[\s]*[a-zA-Z][a-zA-Z.#\-=+(){}?<>,`~ ]+:/gi);
            if (tmpStr1 !== null) {
              var findstring1= searchString[i].innerHTML.split(":")[0];
              searchString[i].innerHTML = findstring1 + ":" +"</a>" + resultString ;
            }
            else {
             searchString[i].innerHTML = resultString;}
        }
    }

//removing span tag on backspace or on mouseout
    function removeSpan(){
        var element = $(".comment_search");//convert string to JQuery element
        element.find("span").each(function(index) {
            var text = $(this).text();//get span content
            $(this).replaceWith(text);//replace all span with just content
        });
        var newString = element.innerHTML;//get back new string
    }

// highlighting the matched text to select on which particular text you want to comment;
    $(".comment_text").keyup(function (event) {
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        event.preventDefault();
        event.stopPropagation();
        var Str = $(this).val();
        var Matching_expression = Str.match(/^@[\S][a-zA-Z.() ]+,[\s]*[a-zA-Z][a-zA-Z.#\-=+(){}?<>,`~ ]+:/gi);
        if (Matching_expression) {
           if ((keycode == "186" || keycode == "59") && Matching_expression.length == 1) {
               var tmpStr = Matching_expression[0].match(",(.*):");
               var newStr = tmpStr[1];
               if (newStr !== "") {
                   var matching = new RegExp(newStr, "gi");
                   $('#comments li .display .details').each(function (i, ele) {
                       if ($(this).find(".metadata a").text() == $('#commenting_user').val()) {
                           ptag = $(this).find(".comment_search");
                           var searchString = ptag;
                           highlightSearchText(searchString, matching);
                           $("span.highlighted").eq(index).css("color", "red");
                           var comment_on = (($("span.highlighted").eq(index)).closest(".details").attr('name'));
                           $('#commented_on').val(comment_on);
                           if (count > 1) {
                               $(".find_next").show();
                           }
                       }
                   })
               }
           }
        }
        else {
            removeSpan();
            $(".find_next").hide();
            $('#commented_on').val("");
            count = 0;
            index = 0;
        }
    });
// selecting on which text you want to comment
    $('.find_next').on("click", function(){
        var count = $("span.highlighted").length;
        if(index == count){index = 0;}
        ($("span.highlighted").eq(index - 1)).css("color", "black");
        ($("span.highlighted").eq(index)).css("color", "red");
        var comment_on =(($("span.highlighted").eq(index)).closest(".details").attr('name'));
        $('#commented_on').val(comment_on);
        index = index + 1
    });

// on mouseover highlighting the text on which you have commented
    $('.user_highlighted').live("mouseover",function(event) {
        event.preventDefault();
        event.stopPropagation();
        // in mouse hover div tag
        var clicked_one = ($(this).attr('name'));
        var clicked_parent = $(this).closest('.comment_search');
        $("#comments li .display .details").each(function(i, ele){
            if (clicked_one ==  ($(ele).attr('name'))) {
                // COMMENTED DIV
                var matching_text = $(this).children('.comment_search');
                //PRESENT COMMENT
                var Str = clicked_parent[0].innerText || clicked_parent[0].textContent;
                var tmpStr  = Str.match(/@[\S][a-zA-Z.() ]+,[\s]*[a-zA-Z][a-zA-Z.#\-=+(){}?<>,`~ ]+:/gi);
                var tmpStr2 = tmpStr[0];
                var newStr = tmpStr2.match(",(.*):")[1];
                //MATCHING WORD IN COMMENTED DIV
                if(newStr !== "") {
                    var matched_word = new RegExp(newStr, "g");
                    // matching word in commented on div
                    var searchString = matching_text;
                    highlightSearchText(searchString,matched_word);
                }
            }
        })
    });

    $('#share_communities_members_chzn').hide();
    $('#share_communities_admins_chzn').hide();
// on mouse out the highlight goes
    $('.user_highlighted').live("mouseout", function(e) {
        removeSpan();
    });

    $(".orcid_id li .edit form input").keyup(function () {
        var maxLength = $(this).attr('maxlength');
        $(this).val($(this).val().replace(/\s/g,''));
        if($(this).val().length == maxLength) {
            $(this).next().focus();
        }
    });
    addNonMemberCommentListener();
});

function addNonMemberCommentListener() {
    $(".community_non_member_comment").off('click').on('click', function () {
        displayAlert("Sorry, you must be a member of this community to post a comment.", "negative");
        $(window).scrollTop(0);
    });
}

function populateState(type, selection) {
    $.ajax({
        url: selection.attr('data-url'),
        cached: true,
        dataType: "JSON",
        success: function (data) {
            geodata = data;
            var country_id = selection.find("option:selected").attr("form-data");
            var new_field;

            if(geodata.countries["country_" + country_id].length > 0) {
                new_field = $('<select>');
                new_field.append('<option value="" disabled="disabled" selected="selected" style="background-color: #C8C8C8;"></option>')
                $.each(geodata.countries["country_" + country_id], function(i, j) {
                    new_field.append($('<option>').val(j.name).html(j.name));
                });
            } else {
                new_field = $('<input type="text">');
            }
            var parent = selection.closest('form');
            var old_field = type == 'address' ?  parent.find($('.cg_user_' + type + '_state')) : parent.find($('.profile_' + type + '_state'));

            new_field.attr('name', old_field.attr('name')).attr('id', old_field.attr('id')).attr('class', old_field.attr('class'));
            if(old_field.prop('tagName') == new_field.prop('tagName')) {
                new_field.val(old_field.val());
            }
            old_field.replaceWith(new_field);

            return;

        }
    });

}
;
!function(c){function v(a,b,h){var h=h||"transparent",g="obj"+(""+Math.random()).slice(2,15),e='<object class="fp-engine" id="'+g+'" name="'+g+'" ',e=e+(c.browser.msie?'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">':' data="'+a+'" type="application/x-shockwave-flash">'),f={width:"100%",height:"100%",allowscriptaccess:"always",wmode:h,quality:"high",flashvars:"",movie:a+(c.browser.msie?"?"+g:""),name:g};return c.each(b,function(a,b){f.flashvars+=a+"="+b+"&"}),c.each(f,function(a,b){e+='<param name="'+
a+'" value="'+b+'"/>'}),e+="</object>",c(e)}function C(a,b){return b=b||100,Math.round(a*b)/b}function r(a){return/mpegurl/i.test(a)?"application/x-mpegurl":"video/"+a}function p(a){return/^(video|application)/i.test(a)||(a=r(a)),!!T.canPlayType(a).replace("no","")}function B(a,b){var h=c.grep(a,function(a){return a.type===b});return h.length?h[0]:null}function D(a){var b=a.attr("src"),a=a.attr("type")||"",c=b.split(L)[1];return a=/mpegurl/i.test(a)?"mpegurl":a.replace("video/",""),{src:b,suffix:c||
a,type:a||c}}function x(a){var b=[];c("source",a).each(function(){b.push(D(c(this)))});b.length||b.push(D(a));this.initialSources=b;this.resolve=function(a){return a?(c.isArray(a)?a={sources:c.map(a,function(a){var b,f=c.extend({},a);return c.each(a,function(a){b=a}),f.type=b,f.src=a[b],delete f[b],f})}:"string"==typeof a&&(a={src:a,sources:[]},c.each(b,function(b,c){"flash"!=c.type&&a.sources.push({type:c.type,src:a.src.replace(L,"."+c.suffix+"$2")})})),a):{sources:b}}}function z(a){return a=parseInt(a,
10),10<=a?a:"0"+a}function A(a){var a=a||0,b=Math.floor(a/3600),c=Math.floor(a/60);return a-=60*c,1<=b?(c-=60*b,b+":"+z(c)+":"+z(a)):z(c)+":"+z(a)}!function(a){if(!a.browser){var a=a.browser={},b=navigator.userAgent.toLowerCase(),b=/(chrome)[ \/]([\w.]+)/.exec(b)||/(safari)[ \/]([\w.]+)/.exec(b)||/(webkit)[ \/]([\w.]+)/.exec(b)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b)||/(msie) ([\w.]+)/.exec(b)||0>b.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b)||[];b[1]&&(a[b[1]]=!0,a.version=
b[2]||"0")}}(jQuery);c(function(){"function"==typeof c.fn.flowplayer&&c("video").parent(".flowplayer").flowplayer()});var M=[],E=[],s=window.navigator.userAgent;window.flowplayer=function(a){return c.isFunction(a)?E.push(a):"number"==typeof a||void 0===a?M[a||0]:c(a).data("flowplayer")};c(window).on("beforeunload",function(){c.each(M,function(a,b){b.conf.splash?b.unload():b.bind("error",function(){c(".flowplayer.is-error .fp-message").remove()})})});var N=!1;try{"object"==typeof window.localStorage&&
(window.localStorage.flowplayerTestStorage="test",N=!0)}catch(X){}var G=/Safari/.exec(navigator.userAgent)&&!/Chrome/.exec(navigator.userAgent);safariVersion=(m=/(\d+\.\d+) Safari/.exec(navigator.userAgent))?Number(m[1]):100;c.extend(flowplayer,{version:"5.5.2",engine:{},conf:{},support:{},defaults:{debug:!1,disabled:!1,engine:"html5",fullscreen:window==window.top,keyboard:!0,ratio:0.5625,adaptiveRatio:!1,flashfit:!1,rtmp:0,splash:!1,live:!1,swf:"//releases.flowplayer.org/5.5.2/flowplayer.swf",speeds:[0.25,
0.5,1,1.5,2],tooltip:!0,volume:N?"true"==localStorage.muted?0:isNaN(localStorage.volume)?1:localStorage.volume||1:1,errors:";Video loading aborted;Network error;Video not properly encoded;Video file not found;Unsupported video;Skin not found;SWF file not found;Subtitles not found;Invalid RTMP URL;Unsupported video format. Try installing Adobe Flash.".split(";"),errorUrls:"          http://get.adobe.com/flashplayer/".split(" "),playlist:[],hlsFix:G&&8>safariVersion}});var U=1;c.fn.flowplayer=function(a,
b){return"string"==typeof a&&(a={swf:a}),c.isFunction(a)&&(b=a,a={}),!a&&this.data("flowplayer")||this.each(function(){var h,g,e=c(this).addClass("is-loading"),f=c.extend({},flowplayer.defaults,flowplayer.conf,a,e.data()),j=c("video",e).addClass("fp-engine").removeAttr("controls"),l=j.length?new x(j):null,k={};if(f.playlist.length){var i,n=f.preload||j.attr("preload");j.length&&j.replaceWith(i=c("<p />"));j=c("<video />").addClass("fp-engine");i?i.replaceWith(j):e.prepend(j);flowplayer.support.video&&
j.attr("preload",n);"string"==typeof f.playlist[0]?j.attr("src",f.playlist[0]):c.each(f.playlist[0],function(a,b){for(var d in b)b.hasOwnProperty(d)&&j.append(c("<source />").attr({type:"video/"+d,src:b[d]}))});l=new x(j)}(i=e.data("flowplayer"))&&i.unload();e.data("fp-player_id",e.data("fp-player_id")||U++);try{k=N?window.localStorage:k}catch(t){}(n=this.currentStyle&&"rtl"===this.currentStyle.direction||window.getComputedStyle&&"rtl"===window.getComputedStyle(this,null).getPropertyValue("direction"))&&
e.addClass("is-rtl");var d=i||{conf:f,currentSpeed:1,volumeLevel:void 0===f.volume?1*k.volume:f.volume,video:{},disabled:!1,finished:!1,loading:!1,muted:"true"==k.muted||f.muted,paused:!1,playing:!1,ready:!1,splash:!1,rtl:n,load:function(a,b){if(!d.error&&!d.loading&&!d.disabled){if(a=l.resolve(a),c.extend(a,g.pick(a.sources)),a.src){var i=c.Event("load");e.trigger(i,[d,a,g]);i.isDefaultPrevented()?d.loading=!1:(g.load(a),c.isFunction(a)&&(b=a),b&&e.one("ready",b))}return d}},pause:function(a){return!d.ready||
d.seeking||d.disabled||d.loading||(g.pause(),d.one("pause",a)),d},resume:function(){return d.ready&&d.paused&&!d.disabled&&(g.resume(),d.finished&&(d.trigger("resume",[d]),d.finished=!1)),d},toggle:function(){return d.ready?d.paused?d.resume():d.pause():d.load()},seek:function(a,b){if(d.ready&&!d.live){if("boolean"==typeof a)var i=0.1*d.video.duration,a=d.video.time+(a?i:-i);a=h=Math.min(Math.max(a,0),d.video.duration).toFixed(1);i=c.Event("beforeseek");e.trigger(i,[d,a]);i.isDefaultPrevented()?(d.seeking=
!1,e.toggleClass("is-seeking",d.seeking)):(g.seek(a),c.isFunction(b)&&e.one("seek",b))}return d},seekTo:function(a,b){return d.seek(void 0===a?h:0.1*d.video.duration*a,b)},mute:function(a){return void 0===a&&(a=!d.muted),k.muted=d.muted=a,k.volume=isNaN(k.volume)?f.volume:k.volume,d.volume(a?0:k.volume,!0),d.trigger("mute",a),d},volume:function(a,b){return d.ready&&(a=Math.min(Math.max(a,0),1),b||(k.volume=a),g.volume(a)),d},speed:function(a,b){return d.ready&&("boolean"==typeof a&&(a=f.speeds[c.inArray(d.currentSpeed,
f.speeds)+(a?1:-1)]||d.currentSpeed),g.speed(a),b&&e.one("speed",b)),d},stop:function(){return d.ready&&(d.pause(),d.seek(0,function(){e.trigger("stop")})),d},unload:function(){return e.hasClass("is-embedding")||(f.splash?(d.trigger("unload"),g.unload()):d.stop()),d},disable:function(a){return void 0===a&&(a=!d.disabled),a!=d.disabled&&(d.disabled=a,d.trigger("disable",a)),d}};d.conf=c.extend(d.conf,f);c.each(["bind","one","unbind"],function(a,b){d[b]=function(a,c){return e[b](a,c),d}});d.trigger=
function(a,b){return e.trigger(a,[d,b]),d};e.data("flowplayer")||e.bind("boot",function(){return c.each(["autoplay","loop","preload","poster"],function(a,b){var d=j.attr(b);void 0!==d&&(f[b]=d?d:!0)}),(f.splash||e.hasClass("is-splash")||!flowplayer.support.firstframe)&&(d.forcedSplash=!f.splash&&!e.hasClass("is-splash"),d.splash=f.splash=f.autoplay=!0,e.addClass("is-splash"),flowplayer.support.video&&j.attr("preload","none")),(f.live||e.hasClass("is-live"))&&(d.live=f.live=!0,e.addClass("is-live")),
c.each(E,function(){this(d,e)}),g=flowplayer.engine[f.engine],g&&(g=g(d,e)),g.pick(l.initialSources)?d.engine=f.engine:c.each(flowplayer.engine,function(a){return a!=f.engine&&(g=this(d,e),g.pick(l.initialSources))?(d.engine=a,!1):void 0}),M.push(d),d.engine?(f.splash?d.unload():d.load(),f.disabled&&d.disable(),g.volume(d.volumeLevel),e.one("ready",b),void 0):d.trigger("error",{code:flowplayer.support.flashVideo?5:10})}).bind("load",function(a,b){f.splash&&c(".flowplayer").filter(".is-ready, .is-loading").not(e).each(function(){var a=
c(this).data("flowplayer");a.conf.splash&&a.unload()});e.addClass("is-loading");b.loading=!0}).bind("ready",function(a,b,d){function c(){e.removeClass("is-loading");b.loading=!1}d.time=0;b.video=d;f.splash?e.one("progress",c):c();b.muted?b.mute(!0):b.volume(b.volumeLevel);a=b.conf.hlsFix&&/mpegurl/i.exec(d.type);e.toggleClass("hls-fix",!!a)}).bind("unload",function(){f.splash&&j.remove();e.removeClass("is-loading");d.loading=!1}).bind("ready unload",function(a){a="ready"==a.type;e.toggleClass("is-splash",
!a).toggleClass("is-ready",a);d.ready=a;d.splash=!a}).bind("progress",function(a,b,d){b.video.time=d}).bind("speed",function(a,b,d){b.currentSpeed=d}).bind("volume",function(a,b,d){b.volumeLevel=Math.round(100*d)/100;b.muted?d&&b.mute(!1):k.volume=d}).bind("beforeseek seek",function(a){d.seeking="beforeseek"==a.type;e.toggleClass("is-seeking",d.seeking)}).bind("ready pause resume unload finish stop",function(a,b,c){d.paused=/pause|finish|unload|stop/.test(a.type);"ready"==a.type&&(d.paused="none"==
f.preload,c&&(d.paused=!c.duration||!f.autoplay&&"none"!=f.preload));d.playing=!d.paused;e.toggleClass("is-paused",d.paused).toggleClass("is-playing",d.playing);d.load.ed||d.pause()}).bind("finish",function(){d.finished=!0}).bind("error",function(){j.remove()});e.trigger("boot",[d,e]).data("flowplayer",d)})};!function(){var a=function(a){return(a=/Version\/(\d\.\d)/.exec(a))&&1<a.length?parseFloat(a[1],10):0},b=flowplayer.support,h=c.browser,g=c("<video loop autoplay preload/>")[0],e=navigator.userAgent,
f=h.msie||/Trident\/7/.test(e),j=/iPad|MeeGo/.test(e)&&!/CriOS/.test(e),l=/iPad/.test(e)&&/CriOS/.test(e),k=/iP(hone|od)/i.test(e)&&!/iPad/.test(e),i=/Android/.test(e)&&!/Firefox/.test(e),n=/Android/.test(e)&&/Firefox/.test(e),t=/Silk/.test(e),d=/IEMobile/.test(e),q=d?parseFloat(/Windows\ Phone\ (\d+\.\d+)/.exec(e)[1],10):0,w=d?parseFloat(/IEMobile\/(\d+\.\d+)/.exec(e)[1],10):0,a=(j&&a(e),i?parseFloat(/Android\ (\d\.\d)/.exec(e)[1],10):0);c.extend(b,{subtitles:!!g.addTextTrack,fullscreen:"function"==
typeof document.webkitCancelFullScreen&&!/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(e)||document.mozFullScreenEnabled||"function"==typeof document.exitFullscreen||"function"==typeof document.msExitFullscreen,inlineBlock:!(f&&8>h.version),touch:"ontouchstart"in window,dataload:!j&&!k&&!d,zeropreload:!f&&!i,volume:!(j||i||k||t||l),cachedVideoTag:!(j||k||l||d),firstframe:!(k||j||i||t||l||d||n),inlineVideo:!k&&(!d||8.1<=q&&11<=w)&&(!i||3<=a),hlsDuration:!i&&(!h.safari||j||k||l),seekable:!j&&!l});
try{var y=navigator.plugins["Shockwave Flash"],o=f?(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version"):y.description;f||y[0].enabledPlugin?(o=o.split(/\D+/),o.length&&!o[0]&&(o=o.slice(1)),b.flashVideo=9<o[0]||9==o[0]&&115<=o[3]):b.flashVideo=!1}catch(I){}try{b.video=!!g.canPlayType,b.video&&g.canPlayType("video/mp4")}catch(u){b.video=!1}b.animation=function(){for(var a=" Webkit Moz O ms Khtml".split(" "),b=c("<p/>")[0],d=0;a.length>d;d++)if("undefined"!==b.style[a[d]+"AnimationName"])return!0}()}();
window.attachEvent&&window.attachEvent("onbeforeunload",function(){__flash_savedUnloadHandler=__flash_unloadHandler=function(){}});flowplayer.engine.flash=function(a,b){var h,g,e,f=a.conf;a.video;var j=c(window),l=function(){if("webkit"==Q||O){var e=c("object param[name='flashvars']",b),i=(e.attr("value")||"").split("&");c.each(i,function(b,c){return c=c.split("="),"url"==c[0]&&c[1]!=a.video.url?(i[b]="url="+a.video.url,e.attr({value:i.join("&")}),!1):void 0})}},k=function(e){var i=b.height(),d=b.width();
if(a.conf.flashfit||/full/.test(e.type)){var f,k,h=a.isFullscreen,g=h&&J,I=!flowplayer.support.inlineBlock,l=h?g?screen.width:j.width():d,h=h?g?screen.height:j.height():i,H=g=0,d=I?d:"",i=I?i:"";(a.conf.flashfit||"fullscreen"===e.type)&&(f=a.video.width/a.video.height,k=a.video.height/a.video.width,i=Math.max(k*l),d=Math.max(f*h),i=i>h?d*k:i,i=Math.min(Math.round(i),h),d=d>l?i*f:d,d=Math.min(Math.round(d),l),H=Math.max(Math.round((h+H-i)/2),0),g=Math.max(Math.round((l+g-d)/2),0));c("object",b).css({width:d,
height:i,marginTop:H,marginLeft:g})}},i={pick:function(a){if(flowplayer.support.flashVideo){var b=c.grep(a,function(a){return"flash"==a.type})[0];if(b)return b;for(var d,b=0;a.length>b;b++)if(d=a[b],/mp4|flv/i.test(d.type))return d}},load:function(i){function j(a){return a.replace(/&amp;/g,"%26").replace(/&/g,"%26").replace(/=/g,"%3D")}var d=c("video",b),q=j(i.src);is_absolute=/^https?:/.test(q);var w=function(){d.remove()},y=function(a){return 0<c.grep(a,function(a){return!!d[0].canPlayType("video/"+
a.type)}).length};if(flowplayer.support.video&&d.prop("autoplay")&&y(i.sources)?d.one("timeupdate",w):w(),is_absolute||f.rtmp||(q=c("<img/>").attr("src",q)[0].src),e)e.__play(q);else{a.bind("ready",l).bind("ready fullscreen fullscreen-exit",k);h="fp"+(""+Math.random()).slice(3,15);var o={hostname:f.embedded?f.hostname:location.hostname,url:q,callback:"jQuery."+h};b.data("origin")&&(o.origin=b.data("origin"));is_absolute&&delete f.rtmp;c.each("key autoplay preload rtmp subscribe live loop debug splash poster rtmpt".split(" "),
function(a,b){f.hasOwnProperty(b)&&(o[b]=f[b])});void 0!==f.bufferTime&&(o.bufferTime=f.bufferTime);o.rtmp&&(o.rtmp=j(o.rtmp));o.initialVolume=a.volumeLevel;g=v(f.swf,o,f.wmode);g.prependTo(b);e=g[0];setTimeout(function(){try{if(!e.PercentLoaded())return b.trigger("error",[a,{code:7,url:f.swf}])}catch(d){}},5E3);setTimeout(function(){void 0===e.PercentLoaded&&b.trigger("flashdisabled",[a])},1E3);e.pollInterval=setInterval(function(){if(e){var b=e.__status?e.__status():null;b&&(a.trigger("progress",
b.time),i.buffer=b.buffer/i.bytes*i.duration,a.trigger("buffer",i.buffer),!i.buffered&&0<b.time&&(i.buffered=!0,a.trigger("buffered")))}},250);c[h]=function(b,d){f.debug&&console.log("--",b,d);var e=c.Event(b);switch(b){case "ready":d=c.extend(i,d);break;case "click":e.flash=!0;break;case "keydown":e.which=d;break;case "seek":i.time=d}"buffered"!=b&&setTimeout(function(){a.trigger(e,d)},1)}}},speed:c.noop,unload:function(){e&&e.__unload&&e.__unload();delete c[h];c("object",b).remove();e=0;a.unbind("ready",
l).unbind("ready fullscreen fullscreen-exit",k);clearInterval(e.pollInterval)}};return c.each(["pause","resume","seek","volume"],function(c,f){i[f]=function(d){try{a.ready&&("seek"==f&&a.video.time&&!a.paused&&a.trigger("beforeseek"),void 0===d?e["__"+f]():e["__"+f](d))}catch(c){if(void 0===e["__"+f])return b.trigger("flashdisabled",[a]);throw c;}}}),i};var K,T=c("<video/>")[0],V={ended:"finish",pause:"pause",play:"resume",progress:"buffer",timeupdate:"progress",volumechange:"volume",ratechange:"speed",
seeked:"seek",loadeddata:"ready",error:"error",dataunavailable:"error"};flowplayer.engine.html5=function(a,b){function h(e,f,j){e.listeners&&e.listeners.hasOwnProperty(b.data("fp-player_id"))||((e.listeners||(e.listeners={}))[b.data("fp-player_id")]=!0,f.bind("error",function(b){try{if(b.originalEvent&&c(b.originalEvent.originalTarget).is("img"))return b.preventDefault();p(c(b.target).attr("type"))&&a.trigger("error",{code:4})}catch(e){}}),c.each(V,function(d,f){e.addEventListener(d,function(h){if("progress"==
f&&h.srcElement&&0===h.srcElement.readyState&&setTimeout(function(){a.video.duration||a.conf.live&&("mpegurl"!==a.video.type||!l.hlsDuration)||(f="error",a.trigger(f,{code:4}))},1E4),k.debug&&!/progress/.test(f)&&console.log(d,"->",f,h),(a.ready||/ready|error/.test(f))&&f&&c("video",b).length){var n,o=c.Event(f);switch(f){case "ready":n=c.extend(j,{duration:e.duration,width:e.videoWidth,height:e.videoHeight,url:e.currentSrc,src:e.currentSrc});try{n.seekable=!k.live&&/mpegurl/i.test(j?j.type||"":"")&&
e.duration||e.seekable&&e.seekable.end(null)}catch(I){}if(g=g||setInterval(function(){try{n.buffer=e.buffered.end(null)}catch(b){}n.buffer&&(C(n.buffer,1E3)<C(n.duration,1E3)&&!n.buffered?a.trigger("buffer",h):n.buffered||(n.buffered=!0,a.trigger("buffer",h).trigger("buffered",h),clearInterval(g),g=0))},250),!k.live&&!n.duration&&!l.hlsDuration&&"loadeddata"===d){var u=function(){n.duration=e.duration;try{n.seekable=e.seekable&&e.seekable.end(null)}catch(b){}a.trigger(o,n);e.removeEventListener("durationchange",
u)};return e.addEventListener("durationchange",u),void 0}break;case "progress":case "seek":if(a.video.duration,0<e.currentTime||a.live){n=Math.max(e.currentTime,0);break}if("progress"==f)return;case "speed":n=C(e.playbackRate);break;case "volume":n=C(e.volume);break;case "error":try{n=(h.srcElement||h.originalTarget).error}catch(H){return}}a.trigger(o,n)}},!1)}))}var g,e,f,j=c("video",b),l=flowplayer.support,k=(c("track",j),a.conf);return{pick:function(a){if(l.video){if(k.videoTypePreference){var b=
B(a,k.videoTypePreference);if(b)return b}for(b=0;a.length>b;b++)if(p(a[b].type))return a[b]}},load:function(i){if(k.splash&&!e)j=(K?K.attr({type:r(i.type),src:i.src}):K=c("<video/>",{src:i.src,type:r(i.type),"class":"fp-engine",autoplay:"autoplay",preload:"none","x-webkit-airplay":"allow"})).prependTo(b),l.inlineVideo||j.css({position:"absolute",top:"-9999em"}),k.loop&&j.attr("loop","loop"),e=j[0],void 0!==f&&(e.volume=f);else{e=j[0];var g=j.find("source");!e.src&&g.length&&(e.src=i.src,g.remove());
a.video.src&&i.src!=a.video.src?(j.attr("autoplay","autoplay"),e.src=i.src):"none"!=k.preload&&l.dataload||(l.zeropreload?a.trigger("ready",i).trigger("pause").one("ready",function(){b.trigger("resume",[a])}):a.one("ready",function(){b.trigger("pause",[a])}))}h(e,c("source",j).add(j),i);("none"!=k.preload&&"mpegurl"!=i.type||!l.zeropreload||!l.dataload)&&e.load();k.splash&&e.load()},pause:function(){e.pause()},resume:function(){e.play()},speed:function(a){e.playbackRate=a},seek:function(b){try{var c=
a.paused;e.currentTime=b;c&&e.pause()}catch(f){}},volume:function(a){f=a;e&&(e.volume=a)},unload:function(){c("video.fp-engine",b).remove();l.cachedVideoTag||(K=null);g=clearInterval(g);e=0}}};var L=/\.(\w{3,4})(\?.*)?$/i;c.throttle=function(a,b){var c;return function(){c||(a.apply(this,arguments),c=1,setTimeout(function(){c=0},b))}};c.fn.slider2=function(a){var b=/iPad/.test(navigator.userAgent)&&!/CriOS/.test(navigator.userAgent);return this.each(function(){var h,g,e,f,j,l,k=c(this),i=c(document),
n=k.children(":last"),t=!1,d=function(){g=k.offset();e=k.width();k.height();f=e;l=Math.max(0,Math.min(f,j*e))},q=function(a){h||a==o.value||j&&!(j>a)||(k.trigger("slide",[a]),o.value=a)},w=function(b){var d=b.pageX;!d&&b.originalEvent&&b.originalEvent.touches&&b.originalEvent.touches.length&&(d=b.originalEvent.touches[0].pageX);b=d-g.left;b=Math.max(0,Math.min(l||f,b));b/=f;return a&&(b=1-b),y(b,0,!0)},y=function(a,d){void 0===d&&(d=0);1<a&&(a=1);var c=Math.round(1E3*a)/10+"%";return(!j||j>=a)&&(b||
t||n.stop(),t?n.css("width",c):n.animate({width:c},d,"linear")),a},o={max:function(a){j=a},disable:function(a){h=a},slide:function(a,b,c){d();c&&q(a);y(a,b)},disableAnimation:function(a,b){t=!1!==a;k.toggleClass("no-animation",!!b)}};d();k.data("api",o).bind("mousedown.sld touchstart",function(a){if(a.preventDefault(),!h){var b=c.throttle(q,100);d();o.dragging=!0;k.addClass("is-dragging");q(w(a));i.bind("mousemove.sld touchmove",function(a){a.preventDefault();b(w(a))}).one("mouseup touchend",function(){o.dragging=
!1;k.removeClass("is-dragging");i.unbind("mousemove.sld touchmove")})}})})};flowplayer(function(a,b){function h(a){return c(".fp-"+a,b)}function g(a){("0px"===b.css("width")||"0px"===b.css("height")||a!==flowplayer.defaults.ratio)&&(parseInt(o,10)||q.css("paddingTop",100*a+"%"));l.inlineBlock||c("object",b).height(b.height())}function e(a){b.toggleClass("is-mouseover",a).toggleClass("is-mouseout",!a)}var f,j=a.conf,l=flowplayer.support;b.find(".fp-ratio,.fp-ui").remove();b.addClass("flowplayer").append('      <div class="ratio"/>      <div class="ui">         <div class="waiting"><em/><em/><em/></div>         <a class="fullscreen"/>         <a class="unload"/>         <p class="speed"/>         <div class="controls">            <a class="play"></a>            <div class="timeline">               <div class="buffer"/>               <div class="progress"/>            </div>            <div class="volume">               <a class="mute"></a>               <div class="volumeslider">                  <div class="volumelevel"/>               </div>            </div>         </div>         <div class="time">            <em class="elapsed">00:00</em>            <em class="remaining"/>            <em class="duration">00:00</em>         </div>         <div class="message"><h2/><p/></div>      </div>'.replace(/class="/g,
'class="fp-'));var k=h("progress"),i=h("buffer"),n=h("elapsed"),t=h("remaining"),d=h("waiting"),q=h("ratio"),w=h("speed"),y=h("duration"),o=q.css("paddingTop"),r=h("timeline").slider2(a.rtl),u=r.data("api"),E=(h("volume"),h("fullscreen")),s=h("volumeslider").slider2(a.rtl),p=s.data("api"),v=b.is(".fixed-controls, .no-toggle");u.disableAnimation(b.hasClass("is-touch"));l.animation||d.html("<p>loading &hellip;</p>");g(j.ratio);try{j.fullscreen||E.remove()}catch(x){E.remove()}a.bind("ready",function(){var d=
a.video.duration;u.disable(a.disabled||!d);j.adaptiveRatio&&g(a.video.height/a.video.width);y.add(t).html(A(d));3600<=d&&b.addClass("is-long")||b.removeClass("is-long");p.slide(a.volumeLevel);"flash"===a.engine&&u.disableAnimation(!0,!0)}).bind("unload",function(){o||q.css("paddingTop","")}).bind("buffer",function(){var b=a.video,d=b.buffer/b.duration;!b.seekable&&l.seekable&&u.max(d);1>d?i.css("width",100*d+"%"):i.css({width:"100%"})}).bind("speed",function(a,b,d){w.text(d+"x").addClass("fp-hilite");
setTimeout(function(){w.removeClass("fp-hilite")},1E3)}).bind("buffered",function(){i.css({width:"100%"});u.max(1)}).bind("progress",function(){var b=a.video.time,d=a.video.duration;u.dragging||u.slide(b/d,a.seeking?0:250);n.html(A(b));t.html("-"+A(d-b))}).bind("finish resume seek",function(a){b.toggleClass("is-finished","finish"==a.type)}).bind("stop",function(){n.html(A(0));u.slide(0,100)}).bind("finish",function(){n.html(A(a.video.duration));u.slide(1,100);b.removeClass("is-seeking")}).bind("beforeseek",
function(){k.stop()}).bind("volume",function(){p.slide(a.volumeLevel)}).bind("disable",function(){var d=a.disabled;u.disable(d);p.disable(d);b.toggleClass("is-disabled",a.disabled)}).bind("mute",function(a,d,c){b.toggleClass("is-muted",c)}).bind("error",function(a,d,e){if(b.removeClass("is-loading").addClass("is-error"),e)e.message=j.errors[e.code],d.error=!0,a=c(".fp-message",b),c("h2",a).text((d.engine||"html5")+": "+e.message),c("p",a).text(e.url||d.video.url||d.video.src||j.errorUrls[e.code]),
b.unbind("mouseenter click").removeClass("is-mouseover")}).bind("mouseenter mouseleave",function(a){if(!v){var d,a="mouseenter"==a.type;e(a);a?(b.bind("pause.x mousemove.x volume.x",function(){e(!0);d=new Date}),f=setInterval(function(){5E3<new Date-d&&(e(!1),d=new Date)},100)):(b.unbind(".x"),clearInterval(f))}}).bind("mouseleave",function(){(u.dragging||p.dragging)&&b.addClass("is-mouseover").removeClass("is-mouseout")}).bind("click.player",function(b){return c(b.target).is(".fp-ui, .fp-engine")||
b.flash?(b.preventDefault(),a.toggle()):void 0}).bind("contextmenu",function(a){a.preventDefault();var d=b.offset(),e=c(window),f=a.clientX-d.left,a=a.clientY-d.top+e.scrollTop(),i=b.find(".fp-context-menu").css({left:f+"px",top:a+"px",display:"block"}).on("click",function(a){a.stopPropagation()});c("html").on("click.outsidemenu",function(){i.hide();c("html").off("click.outsidemenu")})}).bind("flashdisabled",function(){b.addClass("is-flash-disabled").one("ready",function(){b.removeClass("is-flash-disabled").find(".fp-flash-disabled").remove()}).append('<div class="fp-flash-disabled">Adobe Flash is disabled for this page, click player area to enable.</div>')});
j.poster&&b.css("backgroundImage","url("+j.poster+")");d=b.css("backgroundColor");d="none"!=b.css("backgroundImage")||d&&"rgba(0, 0, 0, 0)"!=d&&"transparent"!=d;!d||j.splash||j.autoplay||a.bind("ready stop",function(){b.addClass("is-poster").one("progress",function(){b.removeClass("is-poster")})});!d&&a.forcedSplash&&b.css("backgroundColor","#555");c(".fp-toggle, .fp-play",b).click(a.toggle);c.each(["mute","fullscreen","unload"],function(b,d){h(d).click(function(){a[d]()})});r.bind("slide",function(b,
d){a.seeking=!0;a.seek(d*a.video.duration)});s.bind("slide",function(b,d){a.volume(d)});h("time").click(function(){c(this).toggleClass("is-inverted")});e(v)});var R,P;c(document).bind("keydown.fp",function(a){var b=R,h=a.ctrlKey||a.metaKey||a.altKey,g=a.which,e=b&&b.conf;if(b&&e.keyboard&&!b.disabled){if(-1!=c.inArray(g,[63,187,191])||27==g&&P.hasClass("is-help"))return P.toggleClass("is-help"),!1;if(!h&&b.ready){if(a.preventDefault(),a.shiftKey)return 39==g?b.speed(!0):37==g&&b.speed(!1),void 0;
if(58>g&&47<g)return b.seekTo(g-48);switch(g){case 38:case 75:b.volume(b.volumeLevel+0.15);break;case 40:case 74:b.volume(b.volumeLevel-0.15);break;case 39:case 76:b.seeking=!0;b.seek(!0);break;case 37:case 72:b.seeking=!0;b.seek(!1);break;case 190:b.seekTo();break;case 32:b.toggle();break;case 70:e.fullscreen&&b.fullscreen();break;case 77:b.mute();break;case 81:b.unload()}}}});flowplayer(function(a,b){if(a.conf.keyboard){b.bind("mouseenter mouseleave",function(c){(R=a.disabled||"mouseenter"!=c.type?
0:a)&&(P=b)});var h=flowplayer.support.video&&"flash"!==a.conf.engine&&c("<video/>")[0].playbackRate?"<p><em>shift</em> + <em>&#8592;</em><em>&#8594;</em>slower / faster</p>":"";b.append('      <div class="fp-help">         <a class="fp-close"></a>         <div class="fp-help-section fp-help-basics">            <p><em>space</em>play / pause</p>            <p><em>q</em>unload | stop</p>            <p><em>f</em>fullscreen</p>'+h+'         </div>         <div class="fp-help-section">            <p><em>&#8593;</em><em>&#8595;</em>volume</p>            <p><em>m</em>mute</p>         </div>         <div class="fp-help-section">            <p><em>&#8592;</em><em>&#8594;</em>seek</p>            <p><em>&nbsp;. </em>seek to previous            </p><p><em>1</em><em>2</em>&hellip; <em>6</em> seek to 10%, 20% &hellip; 60% </p>         </div>      </div>   ');
a.conf.tooltip&&c(".fp-ui",b).attr("title","Hit ? for help").on("mouseout.tip",function(){c(this).removeAttr("title").off("mouseout.tip")});c(".fp-close",b).click(function(){b.toggleClass("is-help")})}});var F,Q=c.browser.mozilla?"moz":"webkit",J=flowplayer.support.fullscreen,G=("function"==typeof document.exitFullscreen,navigator.userAgent.toLowerCase()),O=/(safari)[ \/]([\w.]+)/.exec(G)&&!/(chrome)[ \/]([\w.]+)/.exec(G);c(document).bind("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange",
function(a){a=c(document.webkitCurrentFullScreenElement||document.mozFullScreenElement||document.fullscreenElement||document.msFullscreenElement||a.target);a.length&&!F?F=a.trigger("fullscreen",[a]):(F.trigger("fullscreen-exit",[F]),F=null)});flowplayer(function(a,b){if(a.conf.fullscreen){var h,g=c(window),e={apply:!1,pos:0,play:!1};a.isFullscreen=!1;a.fullscreen=function(f){if(!a.disabled){if(void 0===f&&(f=!a.isFullscreen),f&&(h=g.scrollTop()),"webkit"!=Q&&!O||"flash"!=a.engine||(e={apply:!0,pos:a.video.time,
play:a.playing}),J)if(f){var l=b[0];c.each(["requestFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"],function(a,b){return"function"==typeof l[b]?(l[b](Element.ALLOW_KEYBOARD_INPUT),!O||document.webkitCurrentFullScreenElement||document.mozFullScreenElement||l[b](),!1):void 0})}else c.each(["exitFullscreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"],function(a,b){return"function"==typeof document[b]?(document[b](),!1):void 0});else a.trigger(f?
"fullscreen":"fullscreen-exit",[a]);return a}};var f;b.bind("mousedown.fs",function(){150>+new Date-f&&a.ready&&a.fullscreen();f=+new Date});a.bind("fullscreen",function(){b.addClass("is-fullscreen");a.isFullscreen=!0}).bind("fullscreen-exit",function(){var c;J||"html5"!==a.engine||(c=b.css("opacity")||"",b.css("opacity",0));b.removeClass("is-fullscreen");J||"html5"!==a.engine||setTimeout(function(){b.css("opacity",c)});a.isFullscreen=!1;g.scrollTop(h)}).bind("ready",function(){if(e.apply){var b=
function(){e.play||a.conf.live?a.resume():a.pause();c.extend(e,{pos:0,play:!1})};a.conf.live?b():a.conf.rtmp&&e.pos&&!isNaN(e.pos)?(a.resume(),a.seek(e.pos,b)):b()}})}});flowplayer(function(a,b){var h=c.extend({active:"is-active",advance:!0,query:".fp-playlist a"},a.conf),g=h.active;a.play=function(b){return void 0===b?a.resume():"number"!=typeof b||a.conf.playlist[b]?("number"!=typeof b&&a.load.apply(null,arguments),a.unbind("resume.fromfirst"),a.video.index=b,a.load("string"==typeof a.conf.playlist[b]?
""+a.conf.playlist[b]:c.map(a.conf.playlist[b],function(a){return c.extend({},a)})),a):a};a.next=function(b){b&&b.preventDefault();b=a.video.index;return-1!=b&&(b=b===a.conf.playlist.length-1?0:b+1,a.play(b)),a};a.prev=function(b){b&&b.preventDefault();b=a.video.index;return-1!=b&&(b=0===b?a.conf.playlist.length-1:b-1,a.play(b)),a};c(".fp-next",b).click(a.next);c(".fp-prev",b).click(a.prev);h.advance&&b.unbind("finish.pl").bind("finish.pl",function(a,c){var e=0<=c.video.index?c.video.index+1:void 0;
c.conf.playlist.length>e||h.loop?(e=e===c.conf.playlist.length?0:e,b.removeClass("is-finished"),setTimeout(function(){c.play(e)})):(b.addClass("is-playing"),1<c.conf.playlist.length&&c.one("resume.fromfirst",function(){return c.play(0),!1}))});var e=!1;if(a.conf.playlist.length){var e=!0,f=b.find(".fp-playlist");if(!f.length){var f=c('<div class="fp-playlist"></div>'),j=c(".fp-next,.fp-prev",b);j.length?j.eq(0).before(f):c("video",b).after(f)}f.empty();c.each(a.conf.playlist,function(a,b){var e;if("string"==
typeof b)e=b;else for(var h in b[0])if(b[0].hasOwnProperty(h)){e=b[0][h];break}f.append(c("<a />").attr({href:e,"data-index":a}))})}if(c(h.query,b).length){e||(a.conf.playlist=[],c(h.query,b).each(function(){var b=c(this).attr("href");c(this).attr("data-index",a.conf.playlist.length);a.conf.playlist.push(b)}));b.on("click",h.query,function(b){b.preventDefault();b=c(b.target).closest(h.query);b=Number(b.attr("data-index"));-1!=b&&a.play(b)});var l=c(h.query,b).filter("[data-cuepoints]").length;a.bind("load",
function(e,f,j){var e=c(h.query+"."+g,b).removeClass(g).attr("data-index"),t=j.index=a.video.index||0,d=c('a[data-index="'+t+'"]',b).addClass(g),q=t==a.conf.playlist.length-1;b.removeClass("video"+e).addClass("video"+t).toggleClass("last-video",q);j.index=f.video.index=t;j.is_last=f.video.is_last=q;l&&(a.cuepoints=d.data("cuepoints"))}).bind("unload.pl",function(){c(h.query+"."+g,b).toggleClass(g)})}a.conf.playlist.length&&(a.conf.loop=!1)});var W=/ ?cue\d+ ?/;flowplayer(function(a,b){function h(a){b[0].className=
b[0].className.replace(W," ");0<=a&&b.addClass("cue"+a)}var g=0;a.cuepoints=a.conf.cuepoints||[];a.bind("progress",function(c,f,j){if(g&&0.015>j-g)return g=j;g=j;for(var f=a.cuepoints||[],l=0;f.length>l;l++)c=f[l],isNaN(c)||(c={time:c}),0>c.time&&(c.time=a.video.duration+c.time),c.index=l,Math.abs(c.time-j)<0.125*a.currentSpeed&&(h(l),b.trigger("cuepoint",[a,c]))}).bind("unload seek",h);a.conf.generate_cuepoints&&a.bind("load",function(){c(".fp-cuepoint",b).remove()}).bind("ready",function(){var e=
a.cuepoints||[],f=a.video.duration,h=c(".fp-timeline",b).css("overflow","visible");c.each(e,function(b,e){var g=e.time||e;0>g&&(g=f+e);c("<a/>").addClass("fp-cuepoint fp-cuepoint"+b).css("left",100*(g/f)+"%").appendTo(h).mousedown(function(){return a.seek(g),!1})})})});flowplayer(function(a,b){function h(a){a=a.split(":");return 2==a.length&&a.unshift(0),3600*a[0]+60*a[1]+parseFloat(a[2].replace(",","."))}var g=c("track",b),e=a.conf;if(flowplayer.support.subtitles&&(a.subtitles=g.length&&g[0].track,
e.nativesubtitles&&"html5"==e.engine)){if(!a.subtitles)return;var f=function(a){var e=c("video",b)[0].textTracks;e.length&&(e[0].mode=a)};return f("disabled"),a.one("ready",function(){a.conf.splash&&c("video.fp-engine",b).append(c("<track />").attr({kind:"subtitles",srclang:a.subtitles.language||"en",label:a.subtitles.language||"en",src:g.attr("src"),"default":"default"}));f("disabled");f("showing")}),void 0}g.remove();var j=/^(([0-9]{2}:){1,2}[0-9]{2}[,.][0-9]{3}) --\> (([0-9]{2}:){1,2}[0-9]{2}[,.][0-9]{3})(.*)/;
a.subtitles=[];var l=g.attr("src");if(l){setTimeout(function(){c.get(l,function(b){var e,d,f=0,g=b.split("\n"),i=g.length;for(d={};i>f;f++)if(e=j.exec(g[f])){b=g[f-1];for(d="<p>"+g[++f]+"</p><br/>";c.trim(g[++f])&&g.length>f;)d+="<p>"+g[f]+"</p><br/>";d={title:b,startTime:h(e[1]),endTime:h(e[3]),text:d};e={time:d.startTime,subtitle:d};a.subtitles.push(d);a.cuepoints.push(e);a.cuepoints.push({time:d.endTime,subtitleEnd:b});0===d.startTime&&a.trigger("cuepoint",e)}}).fail(function(){return a.trigger("error",
{code:8,url:l}),!1})});var k,i=c("<div class='fp-subtitle'/>").appendTo(b);a.bind("cuepoint",function(a,b,d){d.subtitle?(k=d.index,i.html(d.subtitle.text).addClass("fp-active")):d.subtitleEnd&&(i.removeClass("fp-active"),k=d.index)}).bind("seek",function(b,e,d){k&&a.cuepoints[k]&&a.cuepoints[k].time>d&&(i.removeClass("fp-active"),k=null);c.each(a.cuepoints||[],function(b,c){var e=c.subtitle;e&&k!=c.index?d>=c.time&&(!e.endTime||e.endTime>=d)&&a.trigger("cuepoint",c):c.subtitleEnd&&d>=c.time&&c.index==
k+1&&a.trigger("cuepoint",c)})})}});flowplayer(function(a,b){function h(){if(e&&"undefined"!=typeof _gat){var c=_gat._getTracker(g),f=a.video;c._setAllowLinker(!0);c._trackEvent("Video / Seconds played",a.engine+"/"+f.type,b.attr("title")||f.src.split("/").slice(-1)[0].replace(L,""),Math.round(e/1E3));e=0}}var g=a.conf.analytics,e=0,f=0;g&&("undefined"==typeof _gat&&c.getScript("//google-analytics.com/ga.js"),a.bind("load unload",h).bind("progress",function(){a.seeking||(e+=f?+new Date-f:0,f=+new Date)}).bind("pause",
function(){f=0}),c(window).unload(h))});var S=/IEMobile/.test(s);(flowplayer.support.touch||S)&&flowplayer(function(a,b){var h=/Android/.test(s)&&!/Firefox/.test(s)&&!/Opera/.test(s),g=/Silk/.test(s),e=h?parseFloat(/Android\ (\d\.\d)/.exec(s)[1],10):0;if(h){if(!/Chrome/.test(s)&&4>e){var f=a.load;a.load=function(){var b=f.apply(a,arguments);return a.trigger("ready",[a,a.video]),b}}var j,l=0,k=function(a){j=setInterval(function(){a.video.time=++l;a.trigger("progress",l)},1E3)};a.bind("ready pause unload",
function(){j&&(clearInterval(j),j=null)});a.bind("ready",function(){l=0});a.bind("resume",function(b,c){return c.live?l?k(c):(a.one("progress",function(a,b,c){0===c&&k(b)}),void 0):void 0})}flowplayer.support.volume||b.addClass("no-volume no-mute");b.addClass("is-touch");b.find(".fp-timeline").data("api").disableAnimation();(!flowplayer.support.inlineVideo||a.conf.native_fullscreen)&&(a.conf.nativesubtitles=!0);var i=!1;b.bind("touchmove",function(){i=!0}).bind("touchend click",function(){return i?
(i=!1,void 0):a.playing&&!b.hasClass("is-mouseover")?(b.addClass("is-mouseover").removeClass("is-mouseout"),!1):(a.paused&&b.hasClass("is-mouseout")&&!a.splash&&a.toggle(),a.paused&&S&&c("video.fp-engine",b)[0].play(),void 0)});a.conf.native_fullscreen&&"function"==typeof c("<video />")[0].webkitEnterFullScreen&&(a.fullscreen=function(){var a=c("video.fp-engine",b);a[0].webkitEnterFullScreen();a.one("webkitendfullscreen",function(){a.prop("controls",!0).prop("controls",!1)})});(h||g)&&a.bind("ready",
function(){var e=c("video.fp-engine",b);e.one("canplay",function(){e[0].play()});e[0].play();a.bind("progress.dur",function(){var f=e[0].duration;1!==f&&(a.video.duration=f,c(".fp-duration",b).html(A(f)),a.unbind("progress.dur"))})})});flowplayer(function(a,b){if(!1!==a.conf.embed){var h=a.conf,g=c(".fp-ui",b),e=c("<a/>",{"class":"fp-embed",title:"Copy to your site"}).appendTo(g),g=c("<div/>",{"class":"fp-embed-code"}).append("<label>Paste this HTML code on your site to embed.</label><textarea/>").appendTo(g),
f=c("textarea",g);a.embedCode=function(){var e=a.video,f=e.width||b.width(),g=e.height||b.height(),i=c("<div/>",{"class":"flowplayer",css:{width:f,height:g}}),n=c("<video/>").appendTo(i);c.each("origin analytics key rtmp subscribe bufferTime".split(" "),function(a,b){h.hasOwnProperty(b)&&i.attr("data-"+b,h[b])});h.logo&&i.attr("data-logo",c("<img />").attr("src",h.logo)[0].src);c.each(e.sources,function(a,b){var e=b.src;(!/^https?:/.test(b.src)&&"flash"!==b.type||!h.rtmp)&&(e=c("<img/>").attr("src",
b.src)[0].src);n.append(c("<source/>",{type:"mpegurl"!=b.type?"video/"+b.type:"application/x-mpegurl",src:e}))});e={src:"//embed.flowplayer.org/5.5.2/embed.min.js"};c.isPlainObject(h.embed)&&(e["data-swf"]=h.embed.swf,e["data-library"]=h.embed.library,e.src=h.embed.script||e.src,h.embed.skin&&(e["data-skin"]=h.embed.skin));e=c("<foo/>",e).append(i);return c("<p/>").append(e).html().replace(/<(\/?)foo/g,"<$1script")};b.fptip(".fp-embed","is-embedding");f.click(function(){this.select()});e.click(function(){f.text(a.embedCode());
f[0].focus();f[0].select()})}});c.fn.fptip=function(a,b){return this.each(function(){function h(){g.removeClass(b);c(document).unbind(".st")}var g=c(this);c(a||"a",this).click(function(a){a.preventDefault();g.toggleClass(b);g.hasClass(b)&&c(document).bind("keydown.st",function(a){27==a.which&&h()}).bind("click.st",function(a){c(a.target).parents("."+b).length||h()})})})}}(jQuery);
flowplayer(function(c,v){function C(c){var p=r("<a/>")[0];return p.href=c,p.hostname}var r=jQuery,p=c.conf,B=p.swf.indexOf("flowplayer.org")&&p.e&&v.data("origin"),D=B?C(B):location.hostname,x=p.key;if("file:"==location.protocol&&(D="localhost"),c.load.ed=1,p.hostname=D,p.origin=B||location.href,B&&v.addClass("is-embedded"),"string"==typeof x&&(x=x.split(/,\s*/)),x&&"function"==typeof key_check&&key_check(x,D))p.logo&&v.append(r("<a>",{"class":"fp-logo",href:B}).append(r("<img/>",{src:p.logo})));
else{var z=r("<a/>").attr("href","http://flowplayer.org").appendTo(v);r(".fp-controls",v);var A=r('<div class="fp-context-menu"><ul><li class="copyright">&copy; 2014</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul></div>').appendTo(v);c.bind("pause resume finish unload",function(c,p){var s=-1;p.video.src&&r.each([["org","flowplayer","drive"],["org","flowplayer","my"]],function(c,r){return s=p.video.src.indexOf("://"+
r.reverse().join(".")),-1===s});/pause|resume/.test(c.type)&&"flash"!=p.engine&&4!=s&&5!=s?(z.show().css({position:"absolute",left:16,bottom:36,zIndex:99999,width:100,height:20,backgroundImage:"url("+".png logo / .net .cloudfront d32wqyuo10o653 //".split(" ").reverse().join("")+")"}),p.load.ed=z.is(":visible")&&r.contains(v[0],A[0]),p.load.ed||p.pause()):z.hide()})}});
/*
 * CG media divs: cg_attachment, cg_audio, cg_video
 *                (cg_image, cg_attachment requires no js)
 */

$(document).ready(function() {
  // Audio playback for creator show page and on browser view output as well.
  // Uses pure js solution which is more stable than object/param set. 
  // flowplayer documentation below:
  // http://flowplayer.org/plugins/streaming/audio.html
  // http://flowplayer.org/documentation/configuration/index.html
  // http://flowplayer.org/documentation/configuration/clips.html
  // a complex example
  // http://stackoverflow.com/questions/9963512/flowplayer-not-playing-mp3-files-in-ie
  $("div.cg_audio div.media_container").each(function() {
        initAudioPlayback(this);
    });

    // Video playback
    $("div.cg_video div.media_container").each(function() {
        initVideoPlayback(this);
        adjustVideoFileResolution(this);
    });

});


function initAudioPlayback(ele){
    var player_node = ele,
        player_div = $(ele),
        media_url = player_div.attr('media_url'),
        placeholder_url = player_div.attr('placeholder_url');

    
    // set dimensions in div style 
    player_node.style.width = player_div.attr('width');
    player_node.style.height = player_div.attr('height');
    // center the player div
    player_node.style.margin = '0px auto';

    player_div.find('img').css('height', '70px');
    player_div.find('img').css('margin-left', 'auto');
    player_div.find('img').css('margin-right', 'auto');
    player_div.find('img').css('display', 'block');
    player_div.append("<audio src='" + media_url + "' controls preload />");
    player_div.css('text-align', 'center');
    player_div.css('background-color', '#c0c0c0');
    player_div.find('audio').css('width', '100%');
  }

  function initVideoPlayback(ele){
    var player_node = ele,
        player_div = $(ele),
        media_url = player_div.attr('media_url'),
        placeholder_url = player_div.attr('placeholder_url');
    
    // set dimensions in div style 
    player_node.style.width = player_div.attr('width');
    player_node.style.height = player_div.attr('height');
    // center the player div
    player_node.style.margin = '0px auto';

    // remove the child placeholder img
    player_node.innerHTML = '';

    // flowplayer takes DOM element or single id (e.g. 'player') or single class (e.g. 'div.player')
    // perhaps we should have unique id on each multimedia div
      player_div.flowplayer({
          // one video: a one-member playlist
          playlist: [
              // a list of type-url mappings in picking order
              [
                  { mp4:  media_url}
              ]
          ],
          splash: true  // a splash setup
      });
      player_div.css('background-image', 'url(' + placeholder_url + ')');
      player_div.css('background-color', '#c0c0c0');
    adjustVideoFileResolution(ele);
  }

  function adjustVideoFileResolution(ele){
	// This is required to adjust the aspect ratio.
	// There is not really a way to do this in CSS.
	// Because the size adjustment requires aspect-ratio to be maintained.
    var playerDiv = $(ele);
    // arbitrarily chose a fraction of the width at the time of execution, could just keep using 510
	  var newWidth = playerDiv.parent().innerWidth() * (2/3);
      var width_attr = $(ele).attr('width');
      if(typeof width_attr !== typeof undefined && width_attr !== false){
          var width = playerDiv.attr("width").replace('px', '');
      }else{
          var width = 0;
      } // Current image width
      var height_attr = $(ele).attr('height');
      if(typeof height_attr !== typeof undefined && height_attr !== false) {
          var height = playerDiv.attr("height").replace('px', ''); // Current image height
      }else{
          var height = 0;
      }

    if (width > newWidth) {
        playerDiv.css("height", (height / width) * newWidth);   // Set new height
        playerDiv.css("width", newWidth);    // Scale width based on ratio
    }
  }


;
/*!

   Flowplayer v5.5.2 (Thursday, 27. November 2014 10:32AM) | flowplayer.org/license

*/

!function(e){function t(t,n,i){i=i||"transparent";var a="obj"+(""+Math.random()).slice(2,15),o='<object class="fp-engine" id="'+a+'" name="'+a+'" ';o+=e.browser.msie?'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">':' data="'+t+'" type="application/x-shockwave-flash">';var r={width:"100%",height:"100%",allowscriptaccess:"always",wmode:i,quality:"high",flashvars:"",movie:t+(e.browser.msie?"?"+a:""),name:a};return e.each(n,function(e,t){r.flashvars+=e+"="+t+"&"}),e.each(r,function(e,t){o+='<param name="'+e+'" value="'+t+'"/>'}),o+="</object>",e(o)}function n(e,t){return t=t||100,Math.round(e*t)/t}function i(e){return/mpegurl/i.test(e)?"application/x-mpegurl":"video/"+e}function a(e){return/^(video|application)/i.test(e)||(e=i(e)),!!b.canPlayType(e).replace("no","")}function o(t,n){var i=e.grep(t,function(e){return e.type===n});return i.length?i[0]:null}function r(e){var t=e.attr("src"),n=e.attr("type")||"",i=t.split(x)[1];return n=/mpegurl/i.test(n)?"mpegurl":n.replace("video/",""),{src:t,suffix:i||n,type:n||i}}function s(t){var n=this,i=[];e("source",t).each(function(){i.push(r(e(this)))}),i.length||i.push(r(t)),n.initialSources=i,n.resolve=function(t){return t?(e.isArray(t)?t={sources:e.map(t,function(t){var n,i=e.extend({},t);return e.each(t,function(e){n=e}),i.type=n,i.src=t[n],delete i[n],i})}:"string"==typeof t&&(t={src:t,sources:[]},e.each(i,function(e,n){"flash"!=n.type&&t.sources.push({type:n.type,src:t.src.replace(x,"."+n.suffix+"$2")})})),t):{sources:i}}}function l(e){return e=parseInt(e,10),e>=10?e:"0"+e}function d(e){e=e||0;var t=Math.floor(e/3600),n=Math.floor(e/60);return e-=60*n,t>=1?(n-=60*t,t+":"+l(n)+":"+l(e)):l(n)+":"+l(e)}!function(e){if(!e.browser){var t=e.browser={},n=navigator.userAgent.toLowerCase(),i=/(chrome)[ \/]([\w.]+)/.exec(n)||/(safari)[ \/]([\w.]+)/.exec(n)||/(webkit)[ \/]([\w.]+)/.exec(n)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n)||/(msie) ([\w.]+)/.exec(n)||0>n.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n)||[];i[1]&&(t[i[1]]=!0,t.version=i[2]||"0")}}(jQuery),e(function(){"function"==typeof e.fn.flowplayer&&e("video").parent(".flowplayer").flowplayer()});var u=[],c=[],f=window.navigator.userAgent;window.flowplayer=function(t){return e.isFunction(t)?c.push(t):"number"==typeof t||void 0===t?u[t||0]:e(t).data("flowplayer")},e(window).on("beforeunload",function(){e.each(u,function(t,n){n.conf.splash?n.unload():n.bind("error",function(){e(".flowplayer.is-error .fp-message").remove()})})});var p=!1;try{"object"==typeof window.localStorage&&(window.localStorage.flowplayerTestStorage="test",p=!0)}catch(v){}var g=/Safari/.exec(navigator.userAgent)&&!/Chrome/.exec(navigator.userAgent);m=/(\d+\.\d+) Safari/.exec(navigator.userAgent),safariVersion=m?Number(m[1]):100,e.extend(flowplayer,{version:"5.5.2",engine:{},conf:{},support:{},defaults:{debug:!1,disabled:!1,engine:"html5",fullscreen:window==window.top,keyboard:!0,ratio:9/16,adaptiveRatio:!1,flashfit:!1,rtmp:0,splash:!1,live:!1,swf:"//releases.flowplayer.org/5.5.2/flowplayer.swf",speeds:[.25,.5,1,1.5,2],tooltip:!0,volume:p?"true"==localStorage.muted?0:isNaN(localStorage.volume)?1:localStorage.volume||1:1,errors:["","Video loading aborted","Network error","Video not properly encoded","Video file not found","Unsupported video","Skin not found","SWF file not found","Subtitles not found","Invalid RTMP URL","Unsupported video format. Try installing Adobe Flash."],errorUrls:["","","","","","","","","","","http://get.adobe.com/flashplayer/"],playlist:[],hlsFix:g&&8>safariVersion}});var h=1;e.fn.flowplayer=function(t,n){return"string"==typeof t&&(t={swf:t}),e.isFunction(t)&&(n=t,t={}),!t&&this.data("flowplayer")||this.each(function(){var i,a,o=e(this).addClass("is-loading"),r=e.extend({},flowplayer.defaults,flowplayer.conf,t,o.data()),l=e("video",o).addClass("fp-engine").removeAttr("controls"),d=l.length?new s(l):null,f={};if(r.playlist.length){var v,m=r.preload||l.attr("preload");l.length&&l.replaceWith(v=e("<p />")),l=e("<video />").addClass("fp-engine"),v?v.replaceWith(l):o.prepend(l),flowplayer.support.video&&l.attr("preload",m),"string"==typeof r.playlist[0]?l.attr("src",r.playlist[0]):e.each(r.playlist[0],function(t,n){for(var i in n)n.hasOwnProperty(i)&&l.append(e("<source />").attr({type:"video/"+i,src:n[i]}))}),d=new s(l)}var g=o.data("flowplayer");g&&g.unload(),o.data("fp-player_id",o.data("fp-player_id")||h++);try{f=p?window.localStorage:f}catch(y){}var b=this.currentStyle&&"rtl"===this.currentStyle.direction||window.getComputedStyle&&"rtl"===window.getComputedStyle(this,null).getPropertyValue("direction");b&&o.addClass("is-rtl");var w=g||{conf:r,currentSpeed:1,volumeLevel:r.volume===void 0?1*f.volume:r.volume,video:{},disabled:!1,finished:!1,loading:!1,muted:"true"==f.muted||r.muted,paused:!1,playing:!1,ready:!1,splash:!1,rtl:b,load:function(t,n){if(!(w.error||w.loading||w.disabled)){if(t=d.resolve(t),e.extend(t,a.pick(t.sources)),t.src){var i=e.Event("load");o.trigger(i,[w,t,a]),i.isDefaultPrevented()?w.loading=!1:(a.load(t),e.isFunction(t)&&(n=t),n&&o.one("ready",n))}return w}},pause:function(e){return!w.ready||w.seeking||w.disabled||w.loading||(a.pause(),w.one("pause",e)),w},resume:function(){return w.ready&&w.paused&&!w.disabled&&(a.resume(),w.finished&&(w.trigger("resume",[w]),w.finished=!1)),w},toggle:function(){return w.ready?w.paused?w.resume():w.pause():w.load()},seek:function(t,n){if(w.ready&&!w.live){if("boolean"==typeof t){var r=.1*w.video.duration;t=w.video.time+(t?r:-r)}t=i=Math.min(Math.max(t,0),w.video.duration).toFixed(1);var s=e.Event("beforeseek");o.trigger(s,[w,t]),s.isDefaultPrevented()?(w.seeking=!1,o.toggleClass("is-seeking",w.seeking)):(a.seek(t),e.isFunction(n)&&o.one("seek",n))}return w},seekTo:function(e,t){var n=void 0===e?i:.1*w.video.duration*e;return w.seek(n,t)},mute:function(e){return void 0===e&&(e=!w.muted),f.muted=w.muted=e,f.volume=isNaN(f.volume)?r.volume:f.volume,w.volume(e?0:f.volume,!0),w.trigger("mute",e),w},volume:function(e,t){return w.ready&&(e=Math.min(Math.max(e,0),1),t||(f.volume=e),a.volume(e)),w},speed:function(t,n){return w.ready&&("boolean"==typeof t&&(t=r.speeds[e.inArray(w.currentSpeed,r.speeds)+(t?1:-1)]||w.currentSpeed),a.speed(t),n&&o.one("speed",n)),w},stop:function(){return w.ready&&(w.pause(),w.seek(0,function(){o.trigger("stop")})),w},unload:function(){return o.hasClass("is-embedding")||(r.splash?(w.trigger("unload"),a.unload()):w.stop()),w},disable:function(e){return void 0===e&&(e=!w.disabled),e!=w.disabled&&(w.disabled=e,w.trigger("disable",e)),w}};w.conf=e.extend(w.conf,r),e.each(["bind","one","unbind"],function(e,t){w[t]=function(e,n){return o[t](e,n),w}}),w.trigger=function(e,t){return o.trigger(e,[w,t]),w},o.data("flowplayer")||o.bind("boot",function(){return e.each(["autoplay","loop","preload","poster"],function(e,t){var n=l.attr(t);void 0!==n&&(r[t]=n?n:!0)}),(r.splash||o.hasClass("is-splash")||!flowplayer.support.firstframe)&&(w.forcedSplash=!r.splash&&!o.hasClass("is-splash"),w.splash=r.splash=r.autoplay=!0,o.addClass("is-splash"),flowplayer.support.video&&l.attr("preload","none")),(r.live||o.hasClass("is-live"))&&(w.live=r.live=!0,o.addClass("is-live")),e.each(c,function(){this(w,o)}),a=flowplayer.engine[r.engine],a&&(a=a(w,o)),a.pick(d.initialSources)?w.engine=r.engine:e.each(flowplayer.engine,function(e){return e!=r.engine&&(a=this(w,o),a.pick(d.initialSources))?(w.engine=e,!1):void 0}),u.push(w),w.engine?(r.splash?w.unload():w.load(),r.disabled&&w.disable(),a.volume(w.volumeLevel),o.one("ready",n),void 0):w.trigger("error",{code:flowplayer.support.flashVideo?5:10})}).bind("load",function(t,n){r.splash&&e(".flowplayer").filter(".is-ready, .is-loading").not(o).each(function(){var t=e(this).data("flowplayer");t.conf.splash&&t.unload()}),o.addClass("is-loading"),n.loading=!0}).bind("ready",function(e,t,n){function i(){o.removeClass("is-loading"),t.loading=!1}n.time=0,t.video=n,r.splash?o.one("progress",i):i(),t.muted?t.mute(!0):t.volume(t.volumeLevel);var a=t.conf.hlsFix&&/mpegurl/i.exec(n.type);o.toggleClass("hls-fix",!!a)}).bind("unload",function(){r.splash&&l.remove(),o.removeClass("is-loading"),w.loading=!1}).bind("ready unload",function(e){var t="ready"==e.type;o.toggleClass("is-splash",!t).toggleClass("is-ready",t),w.ready=t,w.splash=!t}).bind("progress",function(e,t,n){t.video.time=n}).bind("speed",function(e,t,n){t.currentSpeed=n}).bind("volume",function(e,t,n){t.volumeLevel=Math.round(100*n)/100,t.muted?n&&t.mute(!1):f.volume=n}).bind("beforeseek seek",function(e){w.seeking="beforeseek"==e.type,o.toggleClass("is-seeking",w.seeking)}).bind("ready pause resume unload finish stop",function(e,t,n){w.paused=/pause|finish|unload|stop/.test(e.type),"ready"==e.type&&(w.paused="none"==r.preload,n&&(w.paused=!n.duration||!r.autoplay&&"none"!=r.preload)),w.playing=!w.paused,o.toggleClass("is-paused",w.paused).toggleClass("is-playing",w.playing),w.load.ed||w.pause()}).bind("finish",function(){w.finished=!0}).bind("error",function(){l.remove()}),o.trigger("boot",[w,o]).data("flowplayer",w)})},!function(){var t=function(e){var t=/Version\/(\d\.\d)/.exec(e);return t&&t.length>1?parseFloat(t[1],10):0},n=flowplayer.support,i=e.browser,a=e("<video loop autoplay preload/>")[0],o=navigator.userAgent,r=i.msie||/Trident\/7/.test(o),s=/iPad|MeeGo/.test(o)&&!/CriOS/.test(o),l=/iPad/.test(o)&&/CriOS/.test(o),d=/iP(hone|od)/i.test(o)&&!/iPad/.test(o),u=/Android/.test(o)&&!/Firefox/.test(o),c=/Android/.test(o)&&/Firefox/.test(o),f=/Silk/.test(o),p=/IEMobile/.test(o),v=p?parseFloat(/Windows\ Phone\ (\d+\.\d+)/.exec(o)[1],10):0,m=p?parseFloat(/IEMobile\/(\d+\.\d+)/.exec(o)[1],10):0,g=(s?t(o):0,u?parseFloat(/Android\ (\d\.\d)/.exec(o)[1],10):0);e.extend(n,{subtitles:!!a.addTextTrack,fullscreen:"function"==typeof document.webkitCancelFullScreen&&!/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(o)||document.mozFullScreenEnabled||"function"==typeof document.exitFullscreen||"function"==typeof document.msExitFullscreen,inlineBlock:!(r&&8>i.version),touch:"ontouchstart"in window,dataload:!s&&!d&&!p,zeropreload:!r&&!u,volume:!(s||u||d||f||l),cachedVideoTag:!(s||d||l||p),firstframe:!(d||s||u||f||l||p||c),inlineVideo:!d&&(!p||v>=8.1&&m>=11)&&(!u||g>=3),hlsDuration:!u&&(!i.safari||s||d||l),seekable:!s&&!l});try{var h=navigator.plugins["Shockwave Flash"],y=r?new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version"):h.description;r||h[0].enabledPlugin?(y=y.split(/\D+/),y.length&&!y[0]&&(y=y.slice(1)),n.flashVideo=y[0]>9||9==y[0]&&y[3]>=115):n.flashVideo=!1}catch(b){}try{n.video=!!a.canPlayType,n.video&&a.canPlayType("video/mp4")}catch(w){n.video=!1}n.animation=function(){for(var t=["","Webkit","Moz","O","ms","Khtml"],n=e("<p/>")[0],i=0;t.length>i;i++)if("undefined"!==n.style[t[i]+"AnimationName"])return!0}()}(),window.attachEvent&&window.attachEvent("onbeforeunload",function(){__flash_savedUnloadHandler=__flash_unloadHandler=function(){}}),flowplayer.engine.flash=function(n,i){var a,o,r,s=n.conf;n.video;var l=e(window),d=function(){if("webkit"==_||P){var t=e("object param[name='flashvars']",i),a=(t.attr("value")||"").split("&");e.each(a,function(e,i){return i=i.split("="),"url"==i[0]&&i[1]!=n.video.url?(a[e]="url="+n.video.url,t.attr({value:a.join("&")}),!1):void 0})}},u=function(t){var a=i.height(),o=i.width();if(n.conf.flashfit||/full/.test(t.type)){var r,s,d=n.isFullscreen,u=d&&A,c=!flowplayer.support.inlineBlock,f=d?u?screen.width:l.width():o,p=d?u?screen.height:l.height():a,v=0,m=0,g=c?o:"",h=c?a:"";(n.conf.flashfit||"fullscreen"===t.type)&&(r=n.video.width/n.video.height,s=n.video.height/n.video.width,h=Math.max(s*f),g=Math.max(r*p),h=h>p?g*s:h,h=Math.min(Math.round(h),p),g=g>f?h*r:g,g=Math.min(Math.round(g),f),m=Math.max(Math.round((p+m-h)/2),0),v=Math.max(Math.round((f+v-g)/2),0)),e("object",i).css({width:g,height:h,marginTop:m,marginLeft:v})}},c={pick:function(t){if(flowplayer.support.flashVideo){var n=e.grep(t,function(e){return"flash"==e.type})[0];if(n)return n;for(var i,a=0;t.length>a;a++)if(i=t[a],/mp4|flv/i.test(i.type))return i}},load:function(l){function c(e){return e.replace(/&amp;/g,"%26").replace(/&/g,"%26").replace(/=/g,"%3D")}var f=e("video",i),p=c(l.src);is_absolute=/^https?:/.test(p);var v=function(){f.remove()},m=function(t){return e.grep(t,function(e){return!!f[0].canPlayType("video/"+e.type)}).length>0};if(flowplayer.support.video&&f.prop("autoplay")&&m(l.sources)?f.one("timeupdate",v):v(),is_absolute||s.rtmp||(p=e("<img/>").attr("src",p)[0].src),r)r.__play(p);else{n.bind("ready",d).bind("ready fullscreen fullscreen-exit",u),a="fp"+(""+Math.random()).slice(3,15);var g={hostname:s.embedded?s.hostname:location.hostname,url:p,callback:"jQuery."+a};i.data("origin")&&(g.origin=i.data("origin")),is_absolute&&delete s.rtmp,e.each(["key","autoplay","preload","rtmp","subscribe","live","loop","debug","splash","poster","rtmpt"],function(e,t){s.hasOwnProperty(t)&&(g[t]=s[t])}),void 0!==s.bufferTime&&(g.bufferTime=s.bufferTime),g.rtmp&&(g.rtmp=c(g.rtmp)),g.initialVolume=n.volumeLevel,o=t(s.swf,g,s.wmode),o.prependTo(i),r=o[0],setTimeout(function(){try{if(!r.PercentLoaded())return i.trigger("error",[n,{code:7,url:s.swf}])}catch(e){}},5e3),setTimeout(function(){r.PercentLoaded===void 0&&i.trigger("flashdisabled",[n])},1e3),r.pollInterval=setInterval(function(){if(r){var e=r.__status?r.__status():null;e&&(n.trigger("progress",e.time),l.buffer=e.buffer/l.bytes*l.duration,n.trigger("buffer",l.buffer),!l.buffered&&e.time>0&&(l.buffered=!0,n.trigger("buffered")))}},250),e[a]=function(t,i){s.debug&&console.log("--",t,i);var a=e.Event(t);switch(t){case"ready":i=e.extend(l,i);break;case"click":a.flash=!0;break;case"keydown":a.which=i;break;case"seek":l.time=i}"buffered"!=t&&setTimeout(function(){n.trigger(a,i)},1)}}},speed:e.noop,unload:function(){r&&r.__unload&&r.__unload(),delete e[a],e("object",i).remove(),r=0,n.unbind("ready",d).unbind("ready fullscreen fullscreen-exit",u),clearInterval(r.pollInterval)}};return e.each("pause,resume,seek,volume".split(","),function(e,t){c[t]=function(e){try{n.ready&&("seek"==t&&n.video.time&&!n.paused&&n.trigger("beforeseek"),void 0===e?r["__"+t]():r["__"+t](e))}catch(a){if(r["__"+t]===void 0)return i.trigger("flashdisabled",[n]);throw a}}}),c};var y,b=e("<video/>")[0],w={ended:"finish",pause:"pause",play:"resume",progress:"buffer",timeupdate:"progress",volumechange:"volume",ratechange:"speed",seeked:"seek",loadeddata:"ready",error:"error",dataunavailable:"error"},k=function(t){return y?y.attr({type:i(t.type),src:t.src}):y=e("<video/>",{src:t.src,type:i(t.type),"class":"fp-engine",autoplay:"autoplay",preload:"none","x-webkit-airplay":"allow"})};flowplayer.engine.html5=function(t,i){function r(o,r,s){o.listeners&&o.listeners.hasOwnProperty(i.data("fp-player_id"))||((o.listeners||(o.listeners={}))[i.data("fp-player_id")]=!0,r.bind("error",function(n){try{if(n.originalEvent&&e(n.originalEvent.originalTarget).is("img"))return n.preventDefault();a(e(n.target).attr("type"))&&t.trigger("error",{code:4})}catch(i){}}),e.each(w,function(a,r){o.addEventListener(a,function(d){if("progress"==r&&d.srcElement&&0===d.srcElement.readyState&&setTimeout(function(){t.video.duration||t.conf.live&&("mpegurl"!==t.video.type||!f.hlsDuration)||(r="error",t.trigger(r,{code:4}))},1e4),p.debug&&!/progress/.test(r)&&console.log(a,"->",r,d),(t.ready||/ready|error/.test(r))&&r&&e("video",i).length){var u,c=e.Event(r);switch(r){case"ready":u=e.extend(s,{duration:o.duration,width:o.videoWidth,height:o.videoHeight,url:o.currentSrc,src:o.currentSrc});try{u.seekable=!p.live&&/mpegurl/i.test(s?s.type||"":"")&&o.duration||o.seekable&&o.seekable.end(null)}catch(v){}if(l=l||setInterval(function(){try{u.buffer=o.buffered.end(null)}catch(e){}u.buffer&&(n(u.buffer,1e3)<n(u.duration,1e3)&&!u.buffered?t.trigger("buffer",d):u.buffered||(u.buffered=!0,t.trigger("buffer",d).trigger("buffered",d),clearInterval(l),l=0))},250),!p.live&&!u.duration&&!f.hlsDuration&&"loadeddata"===a){var m=function(){u.duration=o.duration;try{u.seekable=o.seekable&&o.seekable.end(null)}catch(e){}t.trigger(c,u),o.removeEventListener("durationchange",m)};return o.addEventListener("durationchange",m),void 0}break;case"progress":case"seek":if(t.video.duration,o.currentTime>0||t.live){u=Math.max(o.currentTime,0);break}if("progress"==r)return;case"speed":u=n(o.playbackRate);break;case"volume":u=n(o.volume);break;case"error":try{u=(d.srcElement||d.originalTarget).error}catch(g){return}}t.trigger(c,u)}},!1)}))}var s,l,d,u,c=e("video",i),f=flowplayer.support,p=(e("track",c),t.conf);return s={pick:function(e){if(f.video){if(p.videoTypePreference){var t=o(e,p.videoTypePreference);if(t)return t}for(var n=0;e.length>n;n++)if(a(e[n].type))return e[n]}},load:function(n){if(p.splash&&!d)c=k(n).prependTo(i),f.inlineVideo||c.css({position:"absolute",top:"-9999em"}),p.loop&&c.attr("loop","loop"),d=c[0],u!==void 0&&(d.volume=u);else{d=c[0];var a=c.find("source");!d.src&&a.length&&(d.src=n.src,a.remove()),t.video.src&&n.src!=t.video.src?(c.attr("autoplay","autoplay"),d.src=n.src):"none"!=p.preload&&f.dataload||(f.zeropreload?t.trigger("ready",n).trigger("pause").one("ready",function(){i.trigger("resume",[t])}):t.one("ready",function(){i.trigger("pause",[t])}))}r(d,e("source",c).add(c),n),("none"!=p.preload&&"mpegurl"!=n.type||!f.zeropreload||!f.dataload)&&d.load(),p.splash&&d.load()},pause:function(){d.pause()},resume:function(){d.play()},speed:function(e){d.playbackRate=e},seek:function(e){try{var n=t.paused;d.currentTime=e,n&&d.pause()}catch(i){}},volume:function(e){u=e,d&&(d.volume=e)},unload:function(){e("video.fp-engine",i).remove(),f.cachedVideoTag||(y=null),l=clearInterval(l),d=0}}};var x=/\.(\w{3,4})(\?.*)?$/i;e.throttle=function(e,t){var n;return function(){n||(e.apply(this,arguments),n=1,setTimeout(function(){n=0},t))}},e.fn.slider2=function(t){var n=/iPad/.test(navigator.userAgent)&&!/CriOS/.test(navigator.userAgent);return this.each(function(){var i,a,o,r,s,l,d,u,c=e(this),f=e(document),p=c.children(":last"),v=!1,m=function(){a=c.offset(),o=c.width(),r=c.height(),l=s?r:o,u=b(d)},g=function(e){i||e==w.value||d&&!(d>e)||(c.trigger("slide",[e]),w.value=e)},h=function(e){var n=e.pageX;!n&&e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length&&(n=e.originalEvent.touches[0].pageX);var i=s?e.pageY-a.top:n-a.left;i=Math.max(0,Math.min(u||l,i));var o=i/l;return s&&(o=1-o),t&&(o=1-o),y(o,0,!0)},y=function(e,t){void 0===t&&(t=0),e>1&&(e=1);var i=Math.round(1e3*e)/10+"%";return(!d||d>=e)&&(n||v||p.stop(),v?p.css("width",i):p.animate(s?{height:i}:{width:i},t,"linear")),e},b=function(e){return Math.max(0,Math.min(l,s?(1-e)*r:e*o))},w={max:function(e){d=e},disable:function(e){i=e},slide:function(e,t,n){m(),n&&g(e),y(e,t)},disableAnimation:function(e,t){v=e!==!1,c.toggleClass("no-animation",!!t)}};m(),c.data("api",w).bind("mousedown.sld touchstart",function(t){if(t.preventDefault(),!i){var n=e.throttle(g,100);m(),w.dragging=!0,c.addClass("is-dragging"),g(h(t)),f.bind("mousemove.sld touchmove",function(e){e.preventDefault(),n(h(e))}).one("mouseup touchend",function(){w.dragging=!1,c.removeClass("is-dragging"),f.unbind("mousemove.sld touchmove")})}})})},flowplayer(function(t,n){function i(t){return e(".fp-"+t,n)}function a(t){("0px"===n.css("width")||"0px"===n.css("height")||t!==flowplayer.defaults.ratio)&&(parseInt(y,10)||m.css("paddingTop",100*t+"%")),l.inlineBlock||e("object",n).height(n.height())}function o(e){n.toggleClass("is-mouseover",e).toggleClass("is-mouseout",!e)}var r,s=t.conf,l=flowplayer.support;n.find(".fp-ratio,.fp-ui").remove(),n.addClass("flowplayer").append('      <div class="ratio"/>      <div class="ui">         <div class="waiting"><em/><em/><em/></div>         <a class="fullscreen"/>         <a class="unload"/>         <p class="speed"/>         <div class="controls">            <a class="play"></a>            <div class="timeline">               <div class="buffer"/>               <div class="progress"/>            </div>            <div class="volume">               <a class="mute"></a>               <div class="volumeslider">                  <div class="volumelevel"/>               </div>            </div>         </div>         <div class="time">            <em class="elapsed">00:00</em>            <em class="remaining"/>            <em class="duration">00:00</em>         </div>         <div class="message"><h2/><p/></div>      </div>'.replace(/class="/g,'class="fp-'));var u=i("progress"),c=i("buffer"),f=i("elapsed"),p=i("remaining"),v=i("waiting"),m=i("ratio"),g=i("speed"),h=i("duration"),y=m.css("paddingTop"),b=i("timeline").slider2(t.rtl),w=b.data("api"),k=(i("volume"),i("fullscreen")),x=i("volumeslider").slider2(t.rtl),C=x.data("api"),T=n.is(".fixed-controls, .no-toggle");w.disableAnimation(n.hasClass("is-touch")),l.animation||v.html("<p>loading &hellip;</p>"),a(s.ratio);try{s.fullscreen||k.remove()}catch(S){k.remove()}t.bind("ready",function(){var e=t.video.duration;w.disable(t.disabled||!e),s.adaptiveRatio&&a(t.video.height/t.video.width),h.add(p).html(d(e)),e>=3600&&n.addClass("is-long")||n.removeClass("is-long"),C.slide(t.volumeLevel),"flash"===t.engine&&w.disableAnimation(!0,!0)}).bind("unload",function(){y||m.css("paddingTop","")}).bind("buffer",function(){var e=t.video,n=e.buffer/e.duration;!e.seekable&&l.seekable&&w.max(n),1>n?c.css("width",100*n+"%"):c.css({width:"100%"})}).bind("speed",function(e,t,n){g.text(n+"x").addClass("fp-hilite"),setTimeout(function(){g.removeClass("fp-hilite")},1e3)}).bind("buffered",function(){c.css({width:"100%"}),w.max(1)}).bind("progress",function(){var e=t.video.time,n=t.video.duration;w.dragging||w.slide(e/n,t.seeking?0:250),f.html(d(e)),p.html("-"+d(n-e))}).bind("finish resume seek",function(e){n.toggleClass("is-finished","finish"==e.type)}).bind("stop",function(){f.html(d(0)),w.slide(0,100)}).bind("finish",function(){f.html(d(t.video.duration)),w.slide(1,100),n.removeClass("is-seeking")}).bind("beforeseek",function(){u.stop()}).bind("volume",function(){C.slide(t.volumeLevel)}).bind("disable",function(){var e=t.disabled;w.disable(e),C.disable(e),n.toggleClass("is-disabled",t.disabled)}).bind("mute",function(e,t,i){n.toggleClass("is-muted",i)}).bind("error",function(t,i,a){if(n.removeClass("is-loading").addClass("is-error"),a){a.message=s.errors[a.code],i.error=!0;var o=e(".fp-message",n);e("h2",o).text((i.engine||"html5")+": "+a.message),e("p",o).text(a.url||i.video.url||i.video.src||s.errorUrls[a.code]),n.unbind("mouseenter click").removeClass("is-mouseover")}}).bind("mouseenter mouseleave",function(e){if(!T){var t,i="mouseenter"==e.type;o(i),i?(n.bind("pause.x mousemove.x volume.x",function(){o(!0),t=new Date}),r=setInterval(function(){new Date-t>5e3&&(o(!1),t=new Date)},100)):(n.unbind(".x"),clearInterval(r))}}).bind("mouseleave",function(){(w.dragging||C.dragging)&&n.addClass("is-mouseover").removeClass("is-mouseout")}).bind("click.player",function(n){return e(n.target).is(".fp-ui, .fp-engine")||n.flash?(n.preventDefault(),t.toggle()):void 0}).bind("contextmenu",function(t){t.preventDefault();var i=n.offset(),a=e(window),o=t.clientX-i.left,r=t.clientY-i.top+a.scrollTop(),s=n.find(".fp-context-menu").css({left:o+"px",top:r+"px",display:"block"}).on("click",function(e){e.stopPropagation()});e("html").on("click.outsidemenu",function(){s.hide(),e("html").off("click.outsidemenu")})}).bind("flashdisabled",function(){n.addClass("is-flash-disabled").one("ready",function(){n.removeClass("is-flash-disabled").find(".fp-flash-disabled").remove()}).append('<div class="fp-flash-disabled">Adobe Flash is disabled for this page, click player area to enable.</div>')}),s.poster&&n.css("backgroundImage","url("+s.poster+")");var F=n.css("backgroundColor"),_="none"!=n.css("backgroundImage")||F&&"rgba(0, 0, 0, 0)"!=F&&"transparent"!=F;!_||s.splash||s.autoplay||t.bind("ready stop",function(){n.addClass("is-poster").one("progress",function(){n.removeClass("is-poster")})}),!_&&t.forcedSplash&&n.css("backgroundColor","#555"),e(".fp-toggle, .fp-play",n).click(t.toggle),e.each(["mute","fullscreen","unload"],function(e,n){i(n).click(function(){t[n]()})}),b.bind("slide",function(e,n){t.seeking=!0,t.seek(n*t.video.duration)}),x.bind("slide",function(e,n){t.volume(n)}),i("time").click(function(){e(this).toggleClass("is-inverted")}),o(T)});var C,T,S="is-help";e(document).bind("keydown.fp",function(t){var n=C,i=t.ctrlKey||t.metaKey||t.altKey,a=t.which,o=n&&n.conf;if(n&&o.keyboard&&!n.disabled){if(-1!=e.inArray(a,[63,187,191]))return T.toggleClass(S),!1;if(27==a&&T.hasClass(S))return T.toggleClass(S),!1;if(!i&&n.ready){if(t.preventDefault(),t.shiftKey)return 39==a?n.speed(!0):37==a&&n.speed(!1),void 0;if(58>a&&a>47)return n.seekTo(a-48);switch(a){case 38:case 75:n.volume(n.volumeLevel+.15);break;case 40:case 74:n.volume(n.volumeLevel-.15);break;case 39:case 76:n.seeking=!0,n.seek(!0);break;case 37:case 72:n.seeking=!0,n.seek(!1);break;case 190:n.seekTo();break;case 32:n.toggle();break;case 70:o.fullscreen&&n.fullscreen();break;case 77:n.mute();break;case 81:n.unload()}}}}),flowplayer(function(t,n){if(t.conf.keyboard){n.bind("mouseenter mouseleave",function(e){C=t.disabled||"mouseenter"!=e.type?0:t,C&&(T=n)});var i=flowplayer.support.video&&"flash"!==t.conf.engine&&e("<video/>")[0].playbackRate?"<p><em>shift</em> + <em>&#8592;</em><em>&#8594;</em>slower / faster</p>":"";n.append('      <div class="fp-help">         <a class="fp-close"></a>         <div class="fp-help-section fp-help-basics">            <p><em>space</em>play / pause</p>            <p><em>q</em>unload | stop</p>            <p><em>f</em>fullscreen</p>'+i+'         </div>         <div class="fp-help-section">            <p><em>&#8593;</em><em>&#8595;</em>volume</p>            <p><em>m</em>mute</p>         </div>         <div class="fp-help-section">            <p><em>&#8592;</em><em>&#8594;</em>seek</p>            <p><em>&nbsp;. </em>seek to previous            </p><p><em>1</em><em>2</em>&hellip; <em>6</em> seek to 10%, 20% &hellip; 60% </p>         </div>      </div>   '),t.conf.tooltip&&e(".fp-ui",n).attr("title","Hit ? for help").on("mouseout.tip",function(){e(this).removeAttr("title").off("mouseout.tip")}),e(".fp-close",n).click(function(){n.toggleClass(S)})}});var F,_=e.browser.mozilla?"moz":"webkit",E="fullscreen",M="fullscreen-exit",A=flowplayer.support.fullscreen,D=("function"==typeof document.exitFullscreen,navigator.userAgent.toLowerCase()),P=/(safari)[ \/]([\w.]+)/.exec(D)&&!/(chrome)[ \/]([\w.]+)/.exec(D);e(document).bind("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange",function(t){var n=e(document.webkitCurrentFullScreenElement||document.mozFullScreenElement||document.fullscreenElement||document.msFullscreenElement||t.target);n.length&&!F?F=n.trigger(E,[n]):(F.trigger(M,[F]),F=null)}),flowplayer(function(t,n){if(t.conf.fullscreen){var i,a=e(window),o={apply:!1,pos:0,play:!1};t.isFullscreen=!1,t.fullscreen=function(r){if(!t.disabled){if(void 0===r&&(r=!t.isFullscreen),r&&(i=a.scrollTop()),"webkit"!=_&&!P||"flash"!=t.engine||(o={apply:!0,pos:t.video.time,play:t.playing}),A)if(r){var s=n[0];e.each(["requestFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"],function(e,t){return"function"==typeof s[t]?(s[t](Element.ALLOW_KEYBOARD_INPUT),!P||document.webkitCurrentFullScreenElement||document.mozFullScreenElement||s[t](),!1):void 0})}else e.each(["exitFullscreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"],function(e,t){return"function"==typeof document[t]?(document[t](),!1):void 0});else t.trigger(r?E:M,[t]);return t}};var r;n.bind("mousedown.fs",function(){150>+new Date-r&&t.ready&&t.fullscreen(),r=+new Date}),t.bind(E,function(){n.addClass("is-fullscreen"),t.isFullscreen=!0}).bind(M,function(){var e;A||"html5"!==t.engine||(e=n.css("opacity")||"",n.css("opacity",0)),n.removeClass("is-fullscreen"),A||"html5"!==t.engine||setTimeout(function(){n.css("opacity",e)}),t.isFullscreen=!1,a.scrollTop(i)}).bind("ready",function(){if(o.apply){var n=function(){o.play||t.conf.live?t.resume():t.pause(),e.extend(o,{pos:0,play:!1})};t.conf.live?n():t.conf.rtmp&&o.pos&&!isNaN(o.pos)?(t.resume(),t.seek(o.pos,n)):n()}})}}),flowplayer(function(t,n){function i(){return e(o.query,n)}function a(){return e(o.query+"."+r,n)}var o=e.extend({active:"is-active",advance:!0,query:".fp-playlist a"},t.conf),r=o.active;t.play=function(n){return void 0===n?t.resume():"number"!=typeof n||t.conf.playlist[n]?("number"!=typeof n&&t.load.apply(null,arguments),t.unbind("resume.fromfirst"),t.video.index=n,t.load("string"==typeof t.conf.playlist[n]?""+t.conf.playlist[n]:e.map(t.conf.playlist[n],function(t){return e.extend({},t)})),t):t},t.next=function(e){e&&e.preventDefault();var n=t.video.index;return-1!=n&&(n=n===t.conf.playlist.length-1?0:n+1,t.play(n)),t},t.prev=function(e){e&&e.preventDefault();var n=t.video.index;return-1!=n&&(n=0===n?t.conf.playlist.length-1:n-1,t.play(n)),t},e(".fp-next",n).click(t.next),e(".fp-prev",n).click(t.prev),o.advance&&n.unbind("finish.pl").bind("finish.pl",function(e,t){var i=t.video.index>=0?t.video.index+1:void 0;t.conf.playlist.length>i||o.loop?(i=i===t.conf.playlist.length?0:i,n.removeClass("is-finished"),setTimeout(function(){t.play(i)})):(n.addClass("is-playing"),t.conf.playlist.length>1&&t.one("resume.fromfirst",function(){return t.play(0),!1}))});var s=!1;if(t.conf.playlist.length){s=!0;var l=n.find(".fp-playlist");if(!l.length){l=e('<div class="fp-playlist"></div>');var d=e(".fp-next,.fp-prev",n);d.length?d.eq(0).before(l):e("video",n).after(l)}l.empty(),e.each(t.conf.playlist,function(t,n){var i;if("string"==typeof n)i=n;else for(var a in n[0])if(n[0].hasOwnProperty(a)){i=n[0][a];break}l.append(e("<a />").attr({href:i,"data-index":t}))})}if(i().length){s||(t.conf.playlist=[],i().each(function(){var n=e(this).attr("href");e(this).attr("data-index",t.conf.playlist.length),t.conf.playlist.push(n)})),n.on("click",o.query,function(n){n.preventDefault();var i=e(n.target).closest(o.query),a=Number(i.attr("data-index"));-1!=a&&t.play(a)});var u=i().filter("[data-cuepoints]").length;t.bind("load",function(i,o,s){var l=a().removeClass(r),d=l.attr("data-index"),c=s.index=t.video.index||0,f=e('a[data-index="'+c+'"]',n).addClass(r),p=c==t.conf.playlist.length-1;n.removeClass("video"+d).addClass("video"+c).toggleClass("last-video",p),s.index=o.video.index=c,s.is_last=o.video.is_last=p,u&&(t.cuepoints=f.data("cuepoints"))}).bind("unload.pl",function(){a().toggleClass(r)})}t.conf.playlist.length&&(t.conf.loop=!1)});var L=/ ?cue\d+ ?/;flowplayer(function(t,n){function i(e){n[0].className=n[0].className.replace(L," "),e>=0&&n.addClass("cue"+e)}var a=0;t.cuepoints=t.conf.cuepoints||[],t.bind("progress",function(e,o,r){if(a&&.015>r-a)return a=r;a=r;for(var s,l=t.cuepoints||[],d=0;l.length>d;d++)s=l[d],isNaN(s)||(s={time:s}),0>s.time&&(s.time=t.video.duration+s.time),s.index=d,Math.abs(s.time-r)<.125*t.currentSpeed&&(i(d),n.trigger("cuepoint",[t,s]))}).bind("unload seek",i),t.conf.generate_cuepoints&&t.bind("load",function(){e(".fp-cuepoint",n).remove()}).bind("ready",function(){var i=t.cuepoints||[],a=t.video.duration,o=e(".fp-timeline",n).css("overflow","visible");e.each(i,function(n,i){var r=i.time||i;0>r&&(r=a+i);var s=e("<a/>").addClass("fp-cuepoint fp-cuepoint"+n).css("left",100*(r/a)+"%");s.appendTo(o).mousedown(function(){return t.seek(r),!1})})})}),flowplayer(function(t,n){function i(e){var t=e.split(":");return 2==t.length&&t.unshift(0),60*60*t[0]+60*t[1]+parseFloat(t[2].replace(",","."))}var a=e("track",n),o=t.conf;if(flowplayer.support.subtitles&&(t.subtitles=a.length&&a[0].track,o.nativesubtitles&&"html5"==o.engine)){if(!t.subtitles)return;var r=function(t){var i=e("video",n)[0].textTracks;i.length&&(i[0].mode=t)};return r("disabled"),t.one("ready",function(){t.conf.splash&&e("video.fp-engine",n).append(e("<track />").attr({kind:"subtitles",srclang:t.subtitles.language||"en",label:t.subtitles.language||"en",src:a.attr("src"),"default":"default"})),r("disabled"),r("showing")
}),void 0}a.remove();var s=/^(([0-9]{2}:){1,2}[0-9]{2}[,.][0-9]{3}) --\> (([0-9]{2}:){1,2}[0-9]{2}[,.][0-9]{3})(.*)/;t.subtitles=[];var l=a.attr("src");if(l){setTimeout(function(){e.get(l,function(n){for(var a,o,r,l,d=0,u=n.split("\n"),c=u.length,f={};c>d;d++)if(o=s.exec(u[d])){for(a=u[d-1],r="<p>"+u[++d]+"</p><br/>";e.trim(u[++d])&&u.length>d;)r+="<p>"+u[d]+"</p><br/>";f={title:a,startTime:i(o[1]),endTime:i(o[3]),text:r},l={time:f.startTime,subtitle:f},t.subtitles.push(f),t.cuepoints.push(l),t.cuepoints.push({time:f.endTime,subtitleEnd:a}),0===f.startTime&&t.trigger("cuepoint",l)}}).fail(function(){return t.trigger("error",{code:8,url:l}),!1})});var d,u=e("<div class='fp-subtitle'/>").appendTo(n);t.bind("cuepoint",function(e,t,n){n.subtitle?(d=n.index,u.html(n.subtitle.text).addClass("fp-active")):n.subtitleEnd&&(u.removeClass("fp-active"),d=n.index)}).bind("seek",function(n,i,a){d&&t.cuepoints[d]&&t.cuepoints[d].time>a&&(u.removeClass("fp-active"),d=null),e.each(t.cuepoints||[],function(e,n){var i=n.subtitle;i&&d!=n.index?a>=n.time&&(!i.endTime||i.endTime>=a)&&t.trigger("cuepoint",n):n.subtitleEnd&&a>=n.time&&n.index==d+1&&t.trigger("cuepoint",n)})})}}),flowplayer(function(t,n){function i(){if(o&&"undefined"!=typeof _gat){var e=_gat._getTracker(a),i=t.video;e._setAllowLinker(!0),e._trackEvent("Video / Seconds played",t.engine+"/"+i.type,n.attr("title")||i.src.split("/").slice(-1)[0].replace(x,""),Math.round(o/1e3)),o=0}}var a=t.conf.analytics,o=0,r=0;a&&("undefined"==typeof _gat&&e.getScript("//google-analytics.com/ga.js"),t.bind("load unload",i).bind("progress",function(){t.seeking||(o+=r?+new Date-r:0,r=+new Date)}).bind("pause",function(){r=0}),e(window).unload(i))});var I=/IEMobile/.test(f);(flowplayer.support.touch||I)&&flowplayer(function(t,n){var i=/Android/.test(f)&&!/Firefox/.test(f)&&!/Opera/.test(f),a=/Silk/.test(f),o=i?parseFloat(/Android\ (\d\.\d)/.exec(f)[1],10):0;if(i){if(!/Chrome/.test(f)&&4>o){var r=t.load;t.load=function(){var e=r.apply(t,arguments);return t.trigger("ready",[t,t.video]),e}}var s,l=0,u=function(e){s=setInterval(function(){e.video.time=++l,e.trigger("progress",l)},1e3)};t.bind("ready pause unload",function(){s&&(clearInterval(s),s=null)}),t.bind("ready",function(){l=0}),t.bind("resume",function(e,n){return n.live?l?u(n):(t.one("progress",function(e,t,n){0===n&&u(t)}),void 0):void 0})}flowplayer.support.volume||n.addClass("no-volume no-mute"),n.addClass("is-touch"),n.find(".fp-timeline").data("api").disableAnimation(),(!flowplayer.support.inlineVideo||t.conf.native_fullscreen)&&(t.conf.nativesubtitles=!0);var c=!1;n.bind("touchmove",function(){c=!0}).bind("touchend click",function(){return c?(c=!1,void 0):t.playing&&!n.hasClass("is-mouseover")?(n.addClass("is-mouseover").removeClass("is-mouseout"),!1):(t.paused&&n.hasClass("is-mouseout")&&!t.splash&&t.toggle(),t.paused&&I&&e("video.fp-engine",n)[0].play(),void 0)}),t.conf.native_fullscreen&&"function"==typeof e("<video />")[0].webkitEnterFullScreen&&(t.fullscreen=function(){var t=e("video.fp-engine",n);t[0].webkitEnterFullScreen(),t.one("webkitendfullscreen",function(){t.prop("controls",!0).prop("controls",!1)})}),(i||a)&&t.bind("ready",function(){var i=e("video.fp-engine",n);i.one("canplay",function(){i[0].play()}),i[0].play(),t.bind("progress.dur",function(){var a=i[0].duration;1!==a&&(t.video.duration=a,e(".fp-duration",n).html(d(a)),t.unbind("progress.dur"))})})}),flowplayer(function(t,n){if(t.conf.embed!==!1){var i=t.conf,a=e(".fp-ui",n),o=e("<a/>",{"class":"fp-embed",title:"Copy to your site"}).appendTo(a),r=e("<div/>",{"class":"fp-embed-code"}).append("<label>Paste this HTML code on your site to embed.</label><textarea/>").appendTo(a),s=e("textarea",r);t.embedCode=function(){var a=t.video,o=a.width||n.width(),r=a.height||n.height(),s=e("<div/>",{"class":"flowplayer",css:{width:o,height:r}}),l=e("<video/>").appendTo(s);e.each(["origin","analytics","key","rtmp","subscribe","bufferTime"],function(e,t){i.hasOwnProperty(t)&&s.attr("data-"+t,i[t])}),i.logo&&s.attr("data-logo",e("<img />").attr("src",i.logo)[0].src),e.each(a.sources,function(t,n){var a=n.src;(!/^https?:/.test(n.src)&&"flash"!==n.type||!i.rtmp)&&(a=e("<img/>").attr("src",n.src)[0].src),l.append(e("<source/>",{type:"mpegurl"!=n.type?"video/"+n.type:"application/x-mpegurl",src:a}))});var d={src:"//embed.flowplayer.org/5.5.2/embed.min.js"};e.isPlainObject(i.embed)&&(d["data-swf"]=i.embed.swf,d["data-library"]=i.embed.library,d.src=i.embed.script||d.src,i.embed.skin&&(d["data-skin"]=i.embed.skin));var u=e("<foo/>",d).append(s);return e("<p/>").append(u).html().replace(/<(\/?)foo/g,"<$1script")},n.fptip(".fp-embed","is-embedding"),s.click(function(){this.select()}),o.click(function(){s.text(t.embedCode()),s[0].focus(),s[0].select()})}}),e.fn.fptip=function(t,n){return this.each(function(){function i(){a.removeClass(n),e(document).unbind(".st")}var a=e(this);e(t||"a",this).click(function(t){t.preventDefault(),a.toggleClass(n),a.hasClass(n)&&e(document).bind("keydown.st",function(e){27==e.which&&i()}).bind("click.st",function(t){e(t.target).parents("."+n).length||i()})})})}}(jQuery);flowplayer(function(e,o){function l(e){var o=a("<a/>")[0];return o.href=e,o.hostname}var a=jQuery,r=e.conf,i=r.swf.indexOf("flowplayer.org")&&r.e&&o.data("origin"),n=i?l(i):location.hostname,t=r.key;if("file:"==location.protocol&&(n="localhost"),e.load.ed=1,r.hostname=n,r.origin=i||location.href,i&&o.addClass("is-embedded"),"string"==typeof t&&(t=t.split(/,\s*/)),t&&"function"==typeof key_check&&key_check(t,n))r.logo&&o.append(a("<a>",{"class":"fp-logo",href:i}).append(a("<img/>",{src:r.logo})));else{var s=a("<a/>").attr("href","http://flowplayer.org").appendTo(o);a(".fp-controls",o);var p=a('<div class="fp-context-menu"><ul><li class="copyright">&copy; 2014</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul></div>').appendTo(o);e.bind("pause resume finish unload",function(e,l){var r=-1;l.video.src&&a.each([["org","flowplayer","drive"],["org","flowplayer","my"]],function(e,o){return r=l.video.src.indexOf("://"+o.reverse().join(".")),-1===r}),/pause|resume/.test(e.type)&&"flash"!=l.engine&&4!=r&&5!=r?(s.show().css({position:"absolute",left:16,bottom:36,zIndex:99999,width:100,height:20,backgroundImage:"url("+[".png","logo","/",".net",".cloudfront","d32wqyuo10o653","//"].reverse().join("")+")"}),l.load.ed=s.is(":visible")&&a.contains(o[0],p[0]),l.load.ed||l.pause()):s.hide()})}});
$(document).ready(function() {
    /********************************************
     HELPERS
     *******************************************/
    // Form Validation: Improve HTML5 Handling of Invalid States
    function improveHtml5FormValidation() {
        var invalidClassName = 'invalid';
        // Note this is intentionally limited to forms with .html5-validation
        var inputs = document.querySelectorAll('.html5-validation input, .html5-validation select, .html5-validation textarea, textarea.html5-validation, select.html5-validation, input.html5-validation' );
        inputs.forEach(function (input) {
            // Add a css class on submit when the input is invalid
            input.addEventListener('invalid', function () {
                input.classList.add(invalidClassName);
            });
            // Remove the class when the input becomes valid
            input.addEventListener('input', function () {
                if (input.validity.valid) {
                    input.classList.remove(invalidClassName);
                }
            });
            // Check validity onblur
            input.addEventListener('blur', (event) => {
                input.checkValidity();
            });
        });
    }
    improveHtml5FormValidation();


    $("#admin_search_form").on('submit', function (e) {
            e.preventDefault();
        $.ajax({
            type: "get",
            url: $(this).attr('action'),
            data: {"search-scope": $("#search-scope").val(), "search-value": $("#search-value").val()},
            contentType: "application/json",
            success: function(responseData, textStatus, jqXHR) {
                $("#users_listing > table > tbody").empty()
                $.each( responseData["rows"], function( index, value ){
                    $('#users_listing > table ').append('<tr><td>'+value[0]+'</td><td>'+value[1]+'</td><td>'+value[2]+'</td></tr>').trigger('update');
                });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    });

    /********************************************

     SETTINGS

     *******************************************/

    // Settings: Nav Toggle
    $('#settings #nav ul li.has-children > a').live('click', function() {
        var parent = $(this).parents('li');
        parent.toggleClass("is-open");
        return false;
    });


    // Settings: Item State Toggle
    $('#settings .item a[href^="#state-"], #support #content_1 .item a[href^="#state-"]').live('click', function() {
        var parent = $(this).parents('.item');
        var target = $(this).attr('href').replace('#', '');
        parent.find("div[class^=state]").hide();
        parent.find("." + target).show();
        parent.find('form').show();
        return false;
    });
    $('#settings .item form button[type="reset"], #support .item form button[type="reset"]').live('click', function() {
        var parent = $(this).parents('.item');
        parent.find("div[class^=state]").hide();
        parent.find(".state-display").show();
    });


    // Settings: End Date Toggle
    function settingsEndDateToggle() {
        $('#settings .end-date-toggle, #support .end-date-toggle').each(function() {
            var parent = $(this).parents('form');
            if ($(this).is(":checked")) {
                parent.find("#end-date-fields").hide();
            } else {
                parent.find("#end-date-fields").show();
            }
        });
    }
    settingsEndDateToggle();

    $('#settings .end-date-toggle, #support .end-date-toggle').live('click', function() {
        settingsEndDateToggle();
    });


    // Settings: Counters
    $("#settings #micro-bio").dodosTextCounter('140', {counterDisplayClass: "count-micro-bio", addLineBreak:false});
    $("#settings #profile_more, textarea#profile_profile_more, #support #profile_more").dodosTextCounter('140', {counterDisplayClass: "count-bio-note", addLineBreak:false});


    // Settings: ORCID Formatting
    $('#settings #account_orcid_id, #support #account_orcid_id_orcid_id').keyup(function() {
        var orchidId = $(this).val().split("-").join(""); // Strip Hyphens
        if (orchidId.length > 0) {
            orchidId = orchidId.match(new RegExp('.{1,4}', 'g')).join("-");
        }
        $(this).val(orchidId);
    });




    /********************************************

     FEATURE FORMS

     *******************************************/


    // Feature Form: State Toggle
    $('#feature-form .form-state-toggle a[href^="#state-"]').live('click', function() {
        var parent = $(this).parents('.form-state-toggle');
        var target = $(this).attr('href').replace('#', '');
        parent.find(".toggles a").removeClass('is-active');
        $(this).addClass('is-active');
        parent.find("div[class^=state]").children().find(".html5-validation").removeAttr("required");
        parent.find("div[class^=state]").removeClass('is-active');
        parent.find("." + target).addClass('is-active');
        parent.find("." + target).children().find(".html5-validation").attr("required", "required");
        return false;
    });



});

function profileBlipElement() {
    return $("#edit_blip");
}
function profileMoreElement() {
    return $("#profile_more");
}
function orcidTeaserMessage() {
    return 'Enter ORCID ID...' + '<br>' + 'Register here'.link('https://orcid.org/register');
}

function orcidUpdateLink(value) {
    return  value.link('https://orcid.org/'+value);
}

function setOtherPeerReviewerAssignment(event){
    if (event.checked){
        $("#other_peer_reviewer_assignment").show();
        $("#editorial_membership_status, #editorial_reviewer_status").hide();
    }
}

function setEditorialPeerReviewerAssignment(event){
    if (event.checked){
        $("#other_peer_reviewer_assignment").hide();
    }
}

function setVolunteerPeerReviewerAssignment(event){
    $("#editorial_membership_status, #editorial_reviewer_status").hide();
    $("#other_peer_reviewer_assignment").hide();
}

function selectOtherDegree() {
    let checkedValue = $('input[type=radio][name=degree]:checked').attr('id');
    if (checkedValue == "other") {
        $('#other_content').show();
    } else {
        $('#other_content').hide();
    }
}
;























