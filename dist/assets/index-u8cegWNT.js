var Yp=Object.defineProperty;var gh=n=>{throw TypeError(n)};var $p=(n,t,e)=>t in n?Yp(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var He=(n,t,e)=>$p(n,typeof t!="symbol"?t+"":t,e),xl=(n,t,e)=>t.has(n)||gh("Cannot "+e);var H=(n,t,e)=>(xl(n,t,"read from private field"),e?e.call(n):t.get(n)),Yt=(n,t,e)=>t.has(n)?gh("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),re=(n,t,e,i)=>(xl(n,t,"write to private field"),i?i.call(n,e):t.set(n,e),e),Jt=(n,t,e)=>(xl(n,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Zf=!1;var rl=Array.isArray,jp=Array.prototype.indexOf,da=Array.prototype.includes,al=Array.from,Kf=Object.defineProperty,ea=Object.getOwnPropertyDescriptor,Jf=Object.getOwnPropertyDescriptors,Zp=Object.prototype,Kp=Array.prototype,Cu=Object.getPrototypeOf,vh=Object.isExtensible;const Jp=()=>{};function Qp(n){return n()}function fc(n){for(var t=0;t<n.length;t++)n[t]()}function Qf(){var n,t,e=new Promise((i,s)=>{n=i,t=s});return{promise:e,resolve:n,reject:t}}function tm(n,t){if(Array.isArray(n))return n;if(!(Symbol.iterator in n))return Array.from(n);const e=[];for(const i of n)if(e.push(i),e.length===t)break;return e}const Je=2,mr=4,Wa=8,td=1<<24,Gn=16,$n=32,Ii=64,dc=128,Pu=256,qn=512,Be=1024,Ee=2048,Mn=4096,sn=8192,Ke=16384,Rr=32768,pa=1<<25,_r=65536,Xo=1<<17,em=1<<18,Ns=1<<19,ed=1<<20,ri=1<<25,qo=1<<21,sr=1<<22,ji=1<<23,Zi=Symbol("$state"),nd=Symbol("component"),nm=Symbol(""),Lo=Symbol("attributes"),pc=Symbol("class"),mc=Symbol("style"),qr=Symbol("text"),Io=Symbol("form reset"),Xa=new class extends Error{constructor(){super(...arguments);He(this,"name","StaleReactionError");He(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var Yf;const im=!!((Yf=globalThis.document)!=null&&Yf.contentType)&&globalThis.document.contentType.includes("xml"),sm=1,rm=2,id=4,am=8,om=16,lm=1,cm=2,sd={},Ne=Symbol("uninitialized"),um="http://www.w3.org/1999/xhtml";function hm(){console.warn("https://svelte.dev/e/derived_inert")}function fm(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function dm(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function rd(n){return n===this.v}function pm(n,t){return n!=n?t==t:n!==t||n!==null&&typeof n=="object"||typeof n=="function"}function ad(n){return!pm(n,this.v)}function od(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function mm(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function _m(n,t,e){throw new Error("https://svelte.dev/e/each_key_duplicate")}function gm(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function vm(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function xm(n){throw new Error("https://svelte.dev/e/effect_orphan")}function ym(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Sm(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Mm(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Em(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function bm(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}let qa=!1,Tm=!1;function wm(){qa=!0}let be=null;function gr(n){be=n}function Ni(n,t=!1,e){be={p:be,i:!1,c:null,e:null,s:n,x:null,r:de,l:qa&&!t?{s:null,u:null,$:[]}:null}}function Fi(n){var t=be,e=t.e;if(e!==null){t.e=null;for(var i of e)Rd(i)}return t.i=!0,be=t.p,Du(n)}function Du(n={}){return Kf(n,nd,{value:!0}),n}function Ya(){return!qa||be!==null&&be.l===null}let vs=[];function ld(){var n=vs;vs=[],fc(n)}function wi(n){if(vs.length===0&&!ia){var t=vs;queueMicrotask(()=>{t===vs&&ld()})}vs.push(n)}function Am(){for(;vs.length>0;)ld()}const Rm=-7169;function De(n,t){n.f=n.f&Rm|t}function Lu(n){(n.f&qn)!==0||n.deps===null?De(n,Be):De(n,Mn)}function cd(n,t){(n.f&Ee)!==0?t.set(n,Ee):(n.f&Mn)!==0&&t.get(n)!==Ee&&t.set(n,Mn),De(n,Be)}let xh=!1;function Cm(){xh||(xh=!0,document.addEventListener("reset",n=>{Promise.resolve().then(()=>{var t;if(!n.defaultPrevented)for(const e of n.target.elements)(t=e[Io])==null||t.call(e)})},{capture:!0}))}function Cr(n){var t=ae,e=de;Un(null),fi(null);try{return n()}finally{Un(t),fi(e)}}function Iu(n,t,e,i=e){n.addEventListener(t,()=>Cr(e));const s=n[Io];s?n[Io]=()=>{s(),i(!0)}:n[Io]=()=>i(!0),Cm()}function Pm(n,t,e,i){const s=Ya()?ol:na;var r=n.filter(f=>!f.settled),a=t.map(s);if(e.length===0&&r.length===0){i(a);return}var o=de,l=Dm(),c=r.length===1?r[0].promise:r.length>1?Promise.all(r.map(f=>f.promise)):null;function u(f){if((o.f&Ke)===0){l();try{i([...a,...f])}catch(_){si(_,o)}Yo()}}var h=ud();if(e.length===0){c.then(()=>u([])).finally(h);return}function p(){Promise.all(e.map(f=>Lm(f))).then(u).catch(f=>si(f,o)).finally(h)}c?c.then(()=>{if((o.f&Ke)!==0){h();return}l(),p(),Yo()}):p()}function Dm(){var n=de,t=ae,e=be,i=Ht;return function(r=!0){fi(n),Un(t),gr(e),r&&(n.f&Ke)===0&&(i==null||i.activate(),i==null||i.apply())}}function Yo(n=!0){fi(null),Un(null),gr(null),n&&(Ht==null||Ht.deactivate())}function ud(){var n=de,t=n.b,e=Ht,i=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,e),e.increment(i,n),()=>{t==null||t.update_pending_count(-1,e),e.decrement(i,n)}}function ol(n){var t=Je|Ee;return de!==null&&(de.f|=Ns),{ctx:be,deps:null,effects:null,equals:rd,f:t,fn:n,reactions:null,rv:0,v:Ne,wv:0,parent:de,ac:null}}const Yr=Symbol("obsolete");function Lm(n,t,e){let i=de;i===null&&mm();var s=void 0,r=es(Ne),a=!ae,o=new Set;return $m(()=>{var f,_;var l=de,c=Qf();s=c.promise;try{Promise.resolve(n()).then(c.resolve,g=>{g!==Xa&&c.reject(g)}).finally(Yo)}catch(g){c.reject(g),Yo()}var u=Ht;if(a){if((l.f&Rr)!==0)var h=ud();if((f=i.b)!=null&&f.is_rendered())(_=u.async_deriveds.get(l))==null||_.reject(Yr);else for(const g of o.values())g.reject(Yr);o.add(c),u.async_deriveds.set(l,c)}const p=(g,m=void 0)=>{h==null||h(),o.delete(c),m!==Yr&&(u.activate(),m?(r.f|=ji,vr(r,m)):((r.f&ji)!==0&&(r.f^=ji),vr(r,g)),u.deactivate())};c.promise.then(p,g=>p(null,g||"unknown"))}),Bu(()=>{for(const l of o)l.reject(Yr)}),new Promise(l=>{function c(u){function h(){u===s?l(r):c(s)}u.then(h,h)}c(s)})}function ii(n){const t=ol(n);return Ud(t),t}function na(n){const t=ol(n);return t.equals=ad,t}function Im(n){var t=n.effects;if(t!==null){n.effects=null;for(var e=0;e<t.length;e+=1)rn(t[e])}}function Uu(n){var t,e=de,i=n.parent;if(!is&&i!==null&&n.v!==Ne&&(i.f&(Ke|sn))!==0)return hm(),n.v;fi(i);try{Im(n),t=Bd(n)}finally{fi(e)}return t}function hd(n){var t=Uu(n);if(!n.equals(t)&&(n.wv=Fd(),(!(Ht!=null&&Ht.is_fork)||n.deps===null)&&(Ht!==null?(Ht.capture(n,t,!0),Ki==null||Ki.capture(n,t,!0)):n.v=t,n.deps===null))){De(n,Be);return}is||(We!==null?(Ou()||Ht!=null&&Ht.is_fork)&&We.set(n,t):Lu(n))}function Um(n){var t;if(n.effects!==null)for(const e of n.effects)(e.teardown||e.ac)&&((t=e.teardown)==null||t.call(e),e.ac!==null&&Cr(()=>{e.ac.abort(Xa),e.ac=null}),e.fn!==null&&(e.teardown=Jp),_a(e,0),Hu(e))}function fd(n){if(n.effects!==null)for(const t of n.effects)t.teardown&&t.fn!==null&&xr(t)}let yl=null,ks=null,Ht=null,Ki=null,We=null,_c=null,ia=!1,Sl=!1,sa=null,Uo=null;var yh=0;let Nm=1;var cr,ur,hr,Mi,fr,Ei,Ta,Jn,Qn,dr,Es,ce,gc,dd,vc,$r,xc,pd,md,_d,tr,Fm,jr;const nl=class nl{constructor(){Yt(this,ce);He(this,"id",Nm++);He(this,"started",!1);He(this,"linked",!0);He(this,"prev",null);He(this,"next",null);He(this,"async_deriveds",new Map);He(this,"current",new Map);He(this,"previous",new Map);Yt(this,cr,new Set);Yt(this,ur,new Set);Yt(this,hr,0);Yt(this,Mi,new Map);Yt(this,fr,null);Yt(this,Ei,[]);Yt(this,Ta,[]);Yt(this,Jn,new Map);Yt(this,Qn,new Map);Yt(this,dr,new Set);He(this,"is_fork",!1);Yt(this,Es,!1);ks===null?yl=ks=this:(ks.next=this,this.prev=ks),ks=this}skip_effect(t){H(this,Qn).has(t)||H(this,Qn).set(t,{d:[],m:[]}),H(this,dr).delete(t)}unskip_effect(t,e=i=>this.schedule(i)){var i=H(this,Qn).get(t);if(i){H(this,Qn).delete(t);for(var s of i.d)De(s,Ee),e(s);for(s of i.m)De(s,Mn),e(s)}H(this,dr).add(t)}capture(t,e,i=!1){t.v!==Ne&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&ji)===0&&(this.current.set(t,[e,i]),We==null||We.set(t,e)),this.is_fork||(t.v=e)}activate(){Ht=this}deactivate(){Ht=null,We=null}flush(){try{Sl=!0,Ht=this,Jt(this,ce,$r).call(this)}finally{yh=0,_c=null,sa=null,Uo=null,Sl=!1,Ht=null,We=null,li.clear()}}discard(){var t;for(const e of H(this,ur))e(this);H(this,ur).clear();for(const e of this.async_deriveds.values())e.reject(Yr);Jt(this,ce,jr).call(this),(t=H(this,fr))==null||t.resolve()}register_created_effect(t){H(this,Ta).push(t)}increment(t,e){if(re(this,hr,H(this,hr)+1),t){let i=H(this,Mi).get(e)??0;H(this,Mi).set(e,i+1)}}decrement(t,e){if(re(this,hr,H(this,hr)-1),t){let i=H(this,Mi).get(e)??0;i===1?H(this,Mi).delete(e):H(this,Mi).set(e,i-1)}H(this,Es)||(re(this,Es,!0),wi(()=>{re(this,Es,!1),this.linked&&this.flush()}))}transfer_reactions(t){for(const[e,i]of t)this.add_dirty_reaction(e,i);t.clear()}add_dirty_reaction(t,e){(e===Ee||H(this,Jn).get(t)!==Ee)&&H(this,Jn).set(t,e)}oncommit(t){H(this,cr).add(t)}ondiscard(t){H(this,ur).add(t)}settled(){return(H(this,fr)??re(this,fr,Qf())).promise}static ensure(){if(Ht===null){const t=Ht=new nl;!Sl&&!ia&&wi(()=>{t.started||t.flush()})}return Ht}apply(){{We=null;return}}schedule(t){var e;if(_c=t,(e=t.b)!=null&&e.is_pending&&(t.f&(mr|Wa|td))!==0&&(t.f&Rr)===0){t.b.defer_effect(t);return}H(this,Ei).push(t)}};cr=new WeakMap,ur=new WeakMap,hr=new WeakMap,Mi=new WeakMap,fr=new WeakMap,Ei=new WeakMap,Ta=new WeakMap,Jn=new WeakMap,Qn=new WeakMap,dr=new WeakMap,Es=new WeakMap,ce=new WeakSet,gc=function(){if(this.is_fork)return!0;for(const t of H(this,Mi).keys())if(!Jt(this,ce,dd).call(this,t))return!0;return!1},dd=function(t){for(var e=t;e!==null;e=e.parent)if(H(this,Qn).has(e))return!0;return!1},vc=function(){var t=[];for(const r of H(this,Ei))if(!((r.f&Ke)!==0||(r.f&(Ee|Mn))===0)){for(var e=r,i=!1;e.parent!==null;){e=e.parent;var s=e.f;if((s&(Ii|$n))!==0){if((s&Be)===0){i=!0;break}e.f^=Be}}i||t.push(e)}return re(this,Ei,[]),t},$r=function(){var o,l,c,u;this.started=!0;for(const[h,p]of H(this,Jn))De(h,p),this.schedule(h);this.apply();for(var t=sa=[],e=[],i=Uo=[];H(this,Ei).length>0;){yh++>1e3&&(Jt(this,ce,jr).call(this),Bm());for(const h of Jt(this,ce,vc).call(this))try{Jt(this,ce,xc).call(this,h,t,e)}catch(p){throw xd(h),Jt(this,ce,gc).call(this)||this.discard(),p}}if(Ht=null,i.length>0){var s=nl.ensure();for(const h of i)s.schedule(h)}if(sa=null,Uo=null,Jt(this,ce,gc).call(this)){Jt(this,ce,tr).call(this,e),Jt(this,ce,tr).call(this,t);for(const[h,p]of H(this,Qn))vd(h,p);i.length>0&&Jt(o=Ht,ce,$r).call(o);return}const r=Jt(this,ce,pd).call(this);if(r){Jt(this,ce,tr).call(this,e),Jt(this,ce,tr).call(this,t),Jt(l=r,ce,_d).call(l,this);return}H(this,Jn).clear();for(const h of H(this,cr))h(this);H(this,cr).clear(),Ki=this,Sh(e),Sh(t),Ki=null,(c=H(this,fr))==null||c.resolve();var a=Ht;H(this,hr)===0&&(H(this,Ei).length===0||a!==null)&&Jt(this,ce,jr).call(this),a!==null&&(li.clear(),Jt(u=a,ce,$r).call(u))},xc=function(t,e,i){t.f^=Be;for(var s=t.first;s!==null;){var r=s.f,a=(r&($n|Ii))!==0,o=a&&(r&Be)!==0,l=o||(r&sn)!==0||H(this,Qn).has(s);if(!l&&s.fn!==null){a?s.f^=Be:(r&mr)!==0?e.push(s):ja(s)&&((r&Gn)!==0&&this.add_dirty_reaction(s,Mn),xr(s));var c=s.first;if(c!==null){s=c;continue}}for(;s!==null;){var u=s.next;if(u!==null){s=u;break}s=s.parent}}},pd=function(){for(var t=this.prev;t!==null;t=t.prev)if(!t.is_fork&&Jt(this,ce,md).call(this,t))return t;return null},md=function(t){for(const[e,[,i]]of this.current)if(!i&&t.current.has(e))return!0;return!1},_d=function(t){var i;for(const[s,r]of t.current)!this.previous.has(s)&&t.previous.has(s)&&this.previous.set(s,t.previous.get(s)),this.current.set(s,r);for(const[s,r]of t.async_deriveds){const a=this.async_deriveds.get(s);a&&r.promise.then(a.resolve).catch(a.reject)}t.async_deriveds.clear(),this.transfer_reactions(H(t,Jn));const e=s=>{var r=s.reactions;if(r!==null&&!((s.f&Je)!==0&&(s.f&(Ee|Mn))===0))for(const l of r){var a=l.f;if((a&Je)!==0)e(l);else{var o=l;a&(sr|Gn)&&!this.async_deriveds.has(o)&&(H(this,Jn).delete(o),De(o,Ee),this.schedule(o))}}};for(const s of this.current.keys())e(s);this.oncommit(()=>t.discard()),Jt(i=t,ce,jr).call(i),Ht=this,Jt(this,ce,$r).call(this)},tr=function(t){for(var e=0;e<t.length;e+=1)cd(t[e],H(this,Jn))},Fm=function(){var h,p;for(let f=yl;f!==null;f=f.next){var t=f.id<this.id,e=[];for(const[_,[g,m]]of this.current){if(f.current.has(_)){var i=f.current.get(_)[0];if(t&&g!==i)f.current.set(_,[g,m]);else continue}e.push(_)}if(t)for(const[_,g]of this.async_deriveds){const m=f.async_deriveds.get(_);m&&g.promise.then(m.resolve).catch(m.reject)}var s=[...f.current.keys()].filter(_=>!f.current.get(_)[1]);if(!(!f.started||s.length===0)){var r=s.filter(_=>!this.current.has(_));if(r.length===0)t&&f.discard();else if(e.length>0){if(t)for(const _ of H(this,dr))f.unskip_effect(_,g=>{var m;(g.f&(Gn|sr))!==0?f.schedule(g):Jt(m=f,ce,tr).call(m,[g])});f.activate();var a=new Set,o=new Map;for(var l of e)gd(l,r,a,o);o=new Map;var c=[...f.current].filter(([_,g])=>{const m=this.current.get(_);return m?m[0]!==g[0]||m[1]!==g[1]:!0}).map(([_])=>_);if(c.length>0)for(const _ of H(this,Ta))(_.f&(Ke|sn|Xo))===0&&Nu(_,c,o)&&((_.f&(sr|Gn))!==0?(De(_,Ee),f.schedule(_)):f.add_dirty_reaction(_,Ee));if(H(f,Ei).length>0&&!H(f,Es)){f.apply();for(var u of Jt(h=f,ce,vc).call(h))Jt(p=f,ce,xc).call(p,u,[],[])}f.deactivate()}}}},jr=function(){if(this.linked){var t=this.prev,e=this.next;t===null?yl=e:t.next=e,e===null?ks=t:e.prev=t,this.linked=!1}};let ts=nl;function Om(n){var t=ia,e=Ki;Ki=null,ia=!0;try{for(var i;;){if(Am(),Ht===null)return i;Ht.flush()}}finally{ia=t,Ki=e}}function Bm(){try{ym()}catch(n){si(n,_c)}}let zn=null;function Sh(n){var t=n.length;if(t!==0){for(var e=0;e<t;){var i=n[e++];if((i.f&(Ke|sn))===0&&ja(i)&&(zn=new Set,xr(i),i.deps===null&&i.first===null&&i.nodes===null&&i.teardown===null&&i.ac===null&&Dd(i),(zn==null?void 0:zn.size)>0)){li.clear();for(const s of zn){if((s.f&(Ke|sn))!==0)continue;const r=[s];let a=s.parent;for(;a!==null;)zn.has(a)&&(zn.delete(a),r.push(a)),a=a.parent;for(let o=r.length-1;o>=0;o--){const l=r[o];(l.f&(Ke|sn))===0&&xr(l)}}zn.clear()}}zn=null}}function gd(n,t,e,i){if(!e.has(n)&&(e.add(n),n.reactions!==null))for(const s of n.reactions){const r=s.f;(r&Je)!==0?gd(s,t,e,i):(r&(sr|Gn))!==0&&(r&Ee)===0&&Nu(s,t,i)&&(De(s,Ee),Fu(s))}}function Nu(n,t,e){const i=e.get(n);if(i!==void 0)return i;if(n.deps!==null)for(const s of n.deps){if(da.call(t,s))return!0;if((s.f&Je)!==0&&Nu(s,t,e))return e.set(s,!0),!0}return e.set(n,!1),!1}function Fu(n){Ht.schedule(n)}function vd(n,t){if(!((n.f&$n)!==0&&(n.f&Be)!==0)){(n.f&Ee)!==0?t.d.push(n):(n.f&Mn)!==0&&t.m.push(n),De(n,Be);for(var e=n.first;e!==null;)vd(e,t),e=e.next}}function xd(n){De(n,Be);for(var t=n.first;t!==null;)xd(t),t=t.next}let $o=new Set;const li=new Map;let yd=!1;function es(n,t){var e={f:0,v:n,reactions:null,equals:rd,rv:0,wv:0};return e}function _e(n,t){const e=es(n);return Ud(e),e}function km(n,t=!1,e=!0){var s;const i=es(n);return t||(i.equals=ad),qa&&e&&be!==null&&be.l!==null&&((s=be.l).s??(s.s=[])).push(i),i}function Zt(n,t,e=!1){ae!==null&&(!Wn||(ae.f&Xo)!==0)&&Ya()&&(ae.f&(Je|Gn|sr|Xo))!==0&&(ci===null||!ci.has(n))&&Em();let i=e?En(t):t;return vr(n,i,Uo)}var ms=null,yc=0;function vr(n,t,e=null){if(!n.equals(t)){is?li.set(n,t):li.has(n)||li.set(n,n.v);var i=ts.ensure();if(i.capture(n,t),(n.f&Je)!==0){const s=n;(n.f&Ee)!==0&&Uu(s),We===null&&Lu(s)}n.wv=Fd(),ms=null,yc=0,Sd(n,Ee,e),ms=null,Ya()&&de!==null&&(de.f&Be)!==0&&(de.f&($n|Ii))===0&&(Rn===null?Km([n]):Rn.push(n)),!i.is_fork&&$o.size>0&&!yd&&zm()}return t}function zm(){yd=!1;for(const n of $o){(n.f&Be)!==0&&De(n,Mn);let t;try{t=ja(n)}catch{t=!0}t&&xr(n)}$o.clear()}function ra(n){Zt(n,n.v+1)}function Sd(n,t,e){var i=n.reactions;if(i!==null){var s=Ya(),r=i.length;if(yc+=r,yc>1e5&&ms===null&&(ms=new Set),ms!==null){if(ms.has(n))return;ms.add(n)}for(var a=0;a<r;a++){var o=i[a],l=o.f;if(!(!s&&o===de)){var c=(l&Ee)===0;if(c&&De(o,t),(l&Xo)!==0)$o.add(o);else if((l&Je)!==0){var u=o;We==null||We.delete(u),Sd(u,Mn,e)}else if(c){var h=o;(l&Gn)!==0&&zn!==null&&zn.add(h),e!==null?e.push(h):Fu(h)}}}}}function En(n){if(typeof n!="object"||n===null||Zi in n||nd in n)return n;const t=Cu(n);if(t!==Zp&&t!==Kp)return n;var e=new Map,i=rl(n),s=_e(0),r=Rs,a=o=>{if(Rs===r)return o();var l=ae,c=Rs;Un(null),Th(r);var u=o();return Un(l),Th(c),u};return i&&e.set("length",_e(n.length)),new Proxy(n,{defineProperty(o,l,c){(!("value"in c)||c.configurable===!1||c.enumerable===!1||c.writable===!1)&&Sm();var u=e.get(l);return u===void 0?a(()=>{var h=_e(c.value);return e.set(l,h),h}):Zt(u,c.value,!0),!0},deleteProperty(o,l){var c=e.get(l);if(c===void 0){if(l in o){const u=a(()=>_e(Ne));e.set(l,u),ra(s)}}else Zt(c,Ne),ra(s);return!0},get(o,l,c){var f;if(l===Zi)return n;var u=e.get(l),h=l in o;if(u===void 0&&(!h||(f=ea(o,l))!=null&&f.writable)&&(u=a(()=>{var _=En(h?o[l]:Ne),g=_e(_);return g}),e.set(l,u)),u!==void 0){var p=P(u);return p===Ne?void 0:p}return Reflect.get(o,l,c)},getOwnPropertyDescriptor(o,l){var p;(p=this.has)==null||p.call(this,o,l);var c=Reflect.getOwnPropertyDescriptor(o,l),u=e.get(l);if(u!==void 0){var h=P(u);if(h===Ne)return;if(c&&"value"in c)c.value=h;else return{enumerable:!0,configurable:!0,value:h,writable:!0}}return c},has(o,l){var p;if(l===Zi)return!0;var c=e.get(l),u=c!==void 0&&c.v!==Ne||Reflect.has(o,l);if(c!==void 0||(de!==null||ae!==null)&&(!u||(p=ea(o,l))!=null&&p.writable)){c===void 0&&(c=a(()=>{var f=u?En(o[l]):Ne,_=_e(f);return _}),e.set(l,c));var h=P(c);if(h===Ne)return!1}return u},set(o,l,c,u){var M;var h=e.get(l),p=l in o;if(i&&l==="length")for(var f=c;f<h.v;f+=1){var _=e.get(f+"");_!==void 0?Zt(_,Ne):f in o&&(_=a(()=>_e(Ne)),e.set(f+"",_))}if(h===void 0)(!p||(M=ea(o,l))!=null&&M.writable)&&(h=a(()=>_e(void 0)),Zt(h,En(c)),e.set(l,h));else{p=h.v!==Ne;var g=a(()=>En(c));Zt(h,g)}var m=Reflect.getOwnPropertyDescriptor(o,l);if(m!=null&&m.set&&m.set.call(u,c),!p){if(i&&typeof l=="string"){var d=e.get("length"),w=Number(l);Number.isInteger(w)&&w>=d.v&&Zt(d,w+1)}ra(s)}return!0},ownKeys(o){P(s);var l=Reflect.ownKeys(o).filter(h=>{var p=e.get(h);return p===void 0||p.v!==Ne});for(var[c,u]of e)u.v!==Ne&&!(c in o)&&l.push(c);return l},setPrototypeOf(){Mm()}})}function Mh(n){try{if(n!==null&&typeof n=="object"&&Zi in n)return n[Zi]}catch{}return n}function Md(n,t){return Object.is(Mh(n),Mh(t))}var Eh,Ed,bd,Td;function Hm(){if(Eh===void 0){Eh=window,Ed=/Firefox/.test(navigator.userAgent);var n=Element.prototype,t=Node.prototype,e=Text.prototype;bd=ea(t,"firstChild").get,Td=ea(t,"nextSibling").get,vh(n)&&(n[pc]=void 0,n[Lo]=null,n[mc]=void 0,n.__e=void 0),vh(e)&&(e[qr]=void 0)}}function Pi(n=""){return document.createTextNode(n)}function ma(n){return bd.call(n)}function $a(n){return Td.call(n)}function pt(n,t){return ma(n)}function aa(n,t=!1){{var e=ma(n);return e instanceof Comment&&e.data===""?$a(e):e}}function Ut(n,t=!1){return ma(n)}function tt(n,t=1,e=!1){let i=n;for(;t--;)i=$a(i);return i}function Vm(n){n.textContent=""}function wd(){return!1}function Gm(n,t,e){return e?document.createElement(n,{is:e}):document.createElement(n)}function Wm(n){var t=de;if(t===null)return ae.f|=ji,n;if((t.f&Rr)===0&&(t.f&mr)===0)throw n;si(n,t)}function si(n,t){if(n===sd)throw n;if(!(t!==null&&(t.f&Ke)!==0)){for(;t!==null;){if((t.f&dc)!==0&&(t.f&(Ke|pa))===0){if((t.f&Rr)===0)throw n;try{t.b.error(n);return}catch(e){n=e}}t=t.parent}throw n}}function Ad(n){de===null&&(ae===null&&xm(),vm()),is&&gm()}function Xm(n,t){var e=t.last;e===null?t.last=t.first=n:(e.next=n,n.prev=e,t.last=n)}function Zn(n,t){var e=de;e!==null&&(e.f&sn)!==0&&(n|=sn);var i={ctx:be,deps:null,nodes:null,f:n|Ee|qn,first:null,fn:t,last:null,next:null,parent:e,b:e&&e.b,prev:null,teardown:null,wv:0,ac:null};Ht==null||Ht.register_created_effect(i);var s=i;if((n&mr)!==0)sa!==null?sa.push(i):ts.ensure().schedule(i);else if(t!==null){try{xr(i)}catch(a){throw rn(i),a}s.deps===null&&s.teardown===null&&s.nodes===null&&s.first===s.last&&(s.f&Ns)===0&&(s=s.first,(n&Gn)!==0&&(n&_r)!==0&&s!==null&&(s.f|=_r))}if(s!==null&&(s.parent=e,e!==null&&Xm(s,e),ae!==null&&(ae.f&Je)!==0&&(n&Ii)===0)){var r=ae;(r.effects??(r.effects=[])).push(s)}return i}function Ou(){return ae!==null&&!Wn}function Bu(n){const t=Zn(Wa,null);return De(t,Be),t.teardown=n,t}function ns(n){Ad();var t=de.f,e=!ae&&(t&$n)!==0&&be!==null&&!be.i;if(e){var i=be;(i.e??(i.e=[])).push(n)}else return Rd(n)}function Rd(n){return Zn(mr|ed,n)}function qm(n){return Ad(),Zn(Wa|ed,n)}function ku(n){ts.ensure();const t=Zn(Ii|Ns,n);return()=>{rn(t)}}function Ym(n){ts.ensure();const t=Zn(Ii|Ns,n);return(e={})=>new Promise(i=>{e.outro?As(t,()=>{rn(t),i(void 0)}):(rn(t),i(void 0))})}function Cd(n){return Zn(mr,n)}function $m(n){return Zn(sr|Ns,n)}function ll(n,t=0){return Zn(Wa|t,n)}function ue(n,t=[],e=[],i=[]){Pm(i,t,e,s=>{Zn(Wa,()=>{n(...s.map(P))})})}function zu(n,t=0){var e=Zn(Gn|t,n);return e}function Dn(n){return Zn($n|Ns,n)}function Pd(n){var t=n.teardown;if(t!==null){const e=is,i=ae;bh(!0),Un(null);try{t.call(null)}catch(s){si(s,n.parent)}finally{bh(e),Un(i)}}}function Hu(n,t=!1){var e=n.first;for(n.first=n.last=null;e!==null;){const s=e.ac;s!==null&&Cr(()=>{s.abort(Xa)});var i=e.next;(e.f&Ii)!==0?e.parent=null:rn(e,t),e=i}}function jm(n){for(var t=n.first;t!==null;){var e=t.next;(t.f&$n)===0&&rn(t),t=e}}function rn(n,t=!0){var e=!1;(t||(n.f&em)!==0)&&n.nodes!==null&&n.nodes.end!==null&&(Zm(n.nodes.start,n.nodes.end),e=!0),n.f|=pa,Hu(n,t&&!e),_a(n,0);var i=n.nodes&&n.nodes.t;if(i!==null)for(const r of i)r.stop();Pd(n),n.f^=pa,n.f|=Ke;var s=n.parent;s!==null&&s.first!==null&&Dd(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=n.b=null}function Zm(n,t){for(;n!==null;){var e=n===t?null:$a(n);n.remove(),n=e}}function Dd(n){var t=n.parent,e=n.prev,i=n.next;e!==null&&(e.next=i),i!==null&&(i.prev=e),t!==null&&(t.first===n&&(t.first=i),t.last===n&&(t.last=e))}function As(n,t,e=!0){var i=[];n.f|=Pu,Ld(n,i,!0);var s=()=>{e&&rn(n),t&&t()},r=i.length;if(r>0){var a=()=>--r||s();for(var o of i)o.out(a)}else s()}function Ld(n,t,e){if((n.f&sn)===0){n.f^=sn;var i=n.nodes&&n.nodes.t;if(i!==null)for(const o of i)(o.is_global||e)&&t.push(o);for(var s=n.first;s!==null;){var r=s.next;if((s.f&Ii)===0){var a=(s.f&_r)!==0||(s.f&$n)!==0&&(n.f&Gn)!==0;Ld(s,t,a?e:!1)}s=r}}}function jo(n){n.f&=~Pu,Id(n,!0)}function Id(n,t){if((n.f&Pu)===0&&(n.f&sn)!==0){n.f^=sn,(n.f&Be)===0&&(De(n,Ee),ts.ensure().schedule(n));for(var e=n.first;e!==null;){var i=e.next,s=(e.f&_r)!==0||(e.f&$n)!==0;Id(e,s?t:!1),e=i}var r=n.nodes&&n.nodes.t;if(r!==null)for(const a of r)(a.is_global||t)&&a.in()}}function Vu(n,t){if(n.nodes)for(var e=n.nodes.start,i=n.nodes.end;e!==null;){var s=e===i?null:$a(e);t.append(e),e=s}}let is=!1;function bh(n){is=n}let ae=null,Wn=!1;function Un(n){ae=n}let de=null;function fi(n){de=n}let ci=null;function Ud(n){ae!==null&&((ae.f&qo)!==0||(ae.f&Je)!==0)&&(ci??(ci=new Set)).add(n)}let cn=null,Sn=0,Rn=null;function Km(n){Rn=n}let Nd=1,xs=0,Rs=xs;function Th(n){Rs=n}function Fd(){return++Nd}function ja(n){var t=n.f;if((t&Ee)!==0)return!0;if((t&Mn)!==0){for(var e=n.deps,i=e.length,s=0;s<i;s++){var r=e[s];if(ja(r)&&hd(r),r.wv>n.wv)return!0}(t&qn)!==0&&We===null&&De(n,Be)}return!1}function Od(n,t,e=!0){var i=n.reactions;if(i!==null&&!(ci!==null&&ci.has(n)))for(var s=0;s<i.length;s++){var r=i[s];(r.f&Je)!==0?Od(r,t,!1):t===r&&(e?De(r,Ee):(r.f&Be)!==0&&De(r,Mn),Fu(r))}}function Bd(n){var t=cn,e=Sn,i=Rn,s=ae,r=ci,a=be,o=Wn,l=Rs,c=n.f;cn=null,Sn=0,Rn=null,ae=(c&($n|Ii))===0?n:null,ci=null,gr(n.ctx),Wn=!1,Rs=++xs,n.ac!==null&&(Cr(()=>{n.ac.abort(Xa)}),n.ac=null);try{n.f|=qo;var u=n.fn,h=u();n.f|=Rr;var p=wh(n);if(Ya()&&Rn!==null&&!Wn&&p!==null&&(n.f&(Je|Mn|Ee))===0)for(var f=0;f<Rn.length;f++)Od(Rn[f],n);if(s!==null&&s!==n){if(xs++,s.deps!==null)for(let _=0;_<e;_+=1)s.deps[_].rv=xs;if(t!==null)for(const _ of t)_.rv=xs;Rn!==null&&(i===null?i=Rn:i.push(...Rn))}return(n.f&ji)!==0&&(n.f^=ji),h}catch(_){return wh(n),Wm(_)}finally{n.f^=qo,cn=t,Sn=e,Rn=i,ae=s,ci=r,gr(a),Wn=o,Rs=l}}function wh(n){var s;var t=n.deps,e=Ht==null?void 0:Ht.is_fork;if(cn!==null){var i;if(e||_a(n,Sn),t!==null&&Sn>0)for(t.length=Sn+cn.length,i=0;i<cn.length;i++)t[Sn+i]=cn[i];else n.deps=t=cn;if(Ou()&&(n.f&qn)!==0)for(i=Sn;i<t.length;i++)((s=t[i]).reactions??(s.reactions=[])).push(n)}else!e&&t!==null&&Sn<t.length&&(_a(n,Sn),t.length=Sn);return t}function Jm(n,t){let e=t.reactions;if(e!==null){var i=jp.call(e,n);if(i!==-1){var s=e.length-1;s===0?e=t.reactions=null:(e[i]=e[s],e.pop())}}if(e===null&&(t.f&Je)!==0&&(cn===null||!da.call(cn,t))){var r=t;(r.f&qn)!==0&&(r.f^=qn),r.v!==Ne&&Lu(r),r.ac!==null&&Cr(()=>{r.ac.abort(Xa),r.ac=null,De(r,Ee)}),Um(r),_a(r,0)}}function _a(n,t){var e=n.deps;if(e!==null)for(var i=t;i<e.length;i++)Jm(n,e[i])}function xr(n){var t=n.f;if((t&Ke)===0){De(n,Be);var e=de;de=n;try{(t&(Gn|td))!==0?jm(n):Hu(n),Pd(n);var i=Bd(n);n.teardown=typeof i=="function"?i:null,n.wv=Nd;var s;Zf&&Tm&&(n.f&Ee)!==0&&n.deps}finally{de=e}}}async function Qm(){await Promise.resolve(),Om()}function P(n){var t=n.f,e=(t&Je)!==0;if(ae!==null&&!Wn){var i=de!==null&&(de.f&Ke)!==0;if(!i&&(ci===null||!ci.has(n))){var s=ae.deps;if((ae.f&qo)!==0)n.rv<xs&&(n.rv=xs,cn===null&&s!==null&&s[Sn]===n?Sn++:cn===null?cn=[n]:cn.push(n));else{ae.deps??(ae.deps=[]),da.call(ae.deps,n)||ae.deps.push(n);var r=n.reactions;r===null?n.reactions=[ae]:da.call(r,ae)||r.push(ae)}}}if(is&&li.has(n))return li.get(n);if(e){var a=n;if(is){var o=a.v;return((a.f&Be)===0&&a.reactions!==null||zd(a))&&(o=Uu(a)),li.set(a,o),o}var l=(a.f&qn)===0&&!Wn&&ae!==null&&(ae.f&qn)!==0,c=(a.f&Rr)===0;ja(a)&&(l&&(a.f|=qn),hd(a)),l&&!c&&(fd(a),kd(a))}if(We!=null&&We.has(n))return We.get(n);if((n.f&ji)!==0)throw n.v;return n.v}function kd(n){if(n.f|=qn,n.deps!==null)for(const e of n.deps){var t=e.reactions;t===null?e.reactions=[n]:da.call(t,n)||t.push(n),(e.f&Je)!==0&&(e.f&qn)===0&&(fd(e),kd(e))}}function zd(n){if(n.v===Ne)return!0;if(n.deps===null)return!1;for(const t of n.deps)if(li.has(t)||(t.f&Je)!==0&&zd(t))return!0;return!1}function Fs(n){var t=Wn;try{return Wn=!0,n()}finally{Wn=t}}function t_(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(Zi in n)Sc(n);else if(!Array.isArray(n))for(let t in n){const e=n[t];typeof e=="object"&&e&&Zi in e&&Sc(e)}}}function Sc(n,t=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!t.has(n)){t.add(n),n instanceof Date&&n.getTime();for(let i in n)try{Sc(n[i],t)}catch{}const e=Cu(n);if(e!==Object.prototype&&e!==Array.prototype&&e!==Map.prototype&&e!==Set.prototype&&e!==Date.prototype){const i=Jf(e);for(let s in i){const r=i[s].get;if(r)try{r.call(n)}catch{}}}}}const e_=["touchstart","touchmove"];function n_(n){return e_.includes(n)}const ys=Symbol("events"),Hd=new Set,Mc=new Set;function i_(n,t,e,i={}){function s(r){if(i.capture||Ec.call(t,r),!r.cancelBubble)return Cr(()=>e==null?void 0:e.call(this,r))}return s.__removed=!1,wi(()=>{s.__removed||t.addEventListener(n,s,i)}),s}function s_(n,t,e,i,s){var r={capture:i,passive:s},a=i_(n,t,e,r);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&Bu(()=>{a.__removed=!0,t.removeEventListener(n,a,r)})}function jt(n,t,e){(t[ys]??(t[ys]={}))[n]=e}function Pr(n){for(var t=0;t<n.length;t++)Hd.add(n[t]);for(var e of Mc)e(n)}let Ml=null,El=!1;function Ec(n){var g,m;var t=this,e=t.ownerDocument,i=n.type,s=((g=n.composedPath)==null?void 0:g.call(n))||[],r=s[0]||n.target;Ml=n,El||(El=!0,setTimeout(()=>{El=!1,Ml=null}));var a=0,o=Ml===n&&n[ys];if(o){var l=s.indexOf(o);if(l!==-1&&(t===document||t===window)){n[ys]=t;return}var c=s.indexOf(t);if(c===-1)return;l<=c&&(a=l)}if(r=s[a]||n.target,r!==t){Kf(n,"currentTarget",{configurable:!0,get(){return r||e}});var u=ae,h=de;Un(null),fi(null);try{for(var p,f=[];r!==null&&r!==t;){try{var _=(m=r[ys])==null?void 0:m[i];_!=null&&(!r.disabled||n.target===r)&&_.call(r,n)}catch(d){p?f.push(d):p=d}if(n.cancelBubble)break;a++,r=a<s.length?s[a]:null}if(p){for(let d of f)queueMicrotask(()=>{throw d});throw p}}finally{n[ys]=t,delete n.currentTarget,Un(u),fi(h)}}}var $f;const bl=(($f=globalThis==null?void 0:globalThis.window)==null?void 0:$f.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:n=>n});function r_(n){return(bl==null?void 0:bl.createHTML(n))??n}function a_(n){var t=Gm("template");return t.innerHTML=r_(n.replaceAll("<!>","<!---->")),t.content}function Zo(n,t){var e=de;e.nodes===null&&(e.nodes={start:n,end:t,a:null,t:null})}function Vt(n,t){var e=(t&lm)!==0,i=(t&cm)!==0,s,r=!n.startsWith("<!>");return()=>{s===void 0&&(s=a_(r?n:"<!>"+n),e||(s=ma(s)));var a=i||Ed?document.importNode(s,!0):s.cloneNode(!0);if(e){var o=ma(a),l=a.lastChild;Zo(o,l)}else Zo(a,a);return a}}function Or(n=""){{var t=Pi(n+"");return Zo(t,t),t}}function o_(){var n=document.createDocumentFragment(),t=document.createComment(""),e=Pi();return n.append(t,e),Zo(t,e),n}function kt(n,t){n!==null&&n.before(t)}function l_(n){let t=0,e=es(0),i;return()=>{Ou()&&(P(e),ll(()=>(t===0&&(i=Fs(()=>n(()=>ra(e)))),t+=1,()=>{wi(()=>{t-=1,t===0&&(i==null||i(),i=void 0,ra(e))})})))}}var c_=_r|Ns;function u_(n,t,e,i){new h_(n,t,e,i)}var Cn,Ru,Pn,bs,Ze,vn,en,xn,ti,Ts,Yi,pr,wa,bi,il,he,f_,d_,bc,Wi,p_,Tc,Zr,No,wc,Ac;class h_{constructor(t,e,i,s){Yt(this,he);He(this,"parent");He(this,"is_pending",!1);He(this,"transform_error");Yt(this,Cn);Yt(this,Ru,null);Yt(this,Pn);Yt(this,bs);Yt(this,Ze);Yt(this,vn,null);Yt(this,en,null);Yt(this,xn,null);Yt(this,ti,null);Yt(this,Ts,0);Yt(this,Yi,0);Yt(this,pr,!1);Yt(this,wa,new Map);Yt(this,bi,null);Yt(this,il,l_(()=>(re(this,bi,es(H(this,Ts))),()=>{re(this,bi,null)})));var r;re(this,Cn,t),re(this,Pn,e),re(this,bs,a=>{var o=de;o.b=this,o.f|=dc,i(a)}),this.parent=de.b,this.transform_error=s??((r=this.parent)==null?void 0:r.transform_error)??(a=>a),re(this,Ze,zu(()=>{Jt(this,he,Tc).call(this)},c_))}defer_effect(t){cd(t,H(this,wa))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!H(this,Pn).pending}update_pending_count(t,e){Jt(this,he,wc).call(this,t,e),re(this,Ts,H(this,Ts)+t),!(!H(this,bi)||H(this,pr))&&(re(this,pr,!0),wi(()=>{re(this,pr,!1),H(this,bi)&&vr(H(this,bi),H(this,Ts))}))}get_effect_pending(){return H(this,il).call(this),P(H(this,bi))}error(t){if(t===sd||!H(this,Pn).onerror&&!H(this,Pn).failed)throw t;Ht!=null&&Ht.is_fork?(H(this,vn)&&Ht.skip_effect(H(this,vn)),H(this,en)&&Ht.skip_effect(H(this,en)),H(this,xn)&&Ht.skip_effect(H(this,xn)),Ht.oncommit(()=>{Jt(this,he,Wi).call(this)||Jt(this,he,Ac).call(this,t)})):Jt(this,he,Ac).call(this,t)}}Cn=new WeakMap,Ru=new WeakMap,Pn=new WeakMap,bs=new WeakMap,Ze=new WeakMap,vn=new WeakMap,en=new WeakMap,xn=new WeakMap,ti=new WeakMap,Ts=new WeakMap,Yi=new WeakMap,pr=new WeakMap,wa=new WeakMap,bi=new WeakMap,il=new WeakMap,he=new WeakSet,f_=function(){try{re(this,vn,Dn(()=>H(this,bs).call(this,H(this,Cn))))}catch(t){this.error(t)}},d_=function(t){const e=H(this,Pn).failed,{reset:i,invoke_onerror:s}=Jt(this,he,bc).call(this,t);wi(s),e&&re(this,xn,Dn(()=>{e(H(this,Cn),()=>t,()=>i)}))},bc=function(t){var e=!1,i=!1;const s=()=>{if(!Jt(this,he,Wi).call(this)){if(e){dm();return}e=!0,i&&bm(),H(this,xn)!==null&&As(H(this,xn),()=>{re(this,xn,null)}),Jt(this,he,No).call(this,()=>{Jt(this,he,Tc).call(this)})}};return{reset:s,invoke_onerror:()=>{var a,o;if(!Jt(this,he,Wi).call(this))try{i=!0,(o=(a=H(this,Pn)).onerror)==null||o.call(a,t,s),i=!1}catch(l){si(l,H(this,Ze)&&H(this,Ze).parent)}}}},Wi=function(){return(H(this,Ze).f&(Ke|pa))!==0},p_=function(){const t=H(this,Pn).pending;t&&(this.is_pending=!0,re(this,en,Dn(()=>t(H(this,Cn)))),wi(()=>{if(!Jt(this,he,Wi).call(this)){var e=re(this,ti,document.createDocumentFragment()),i=Pi(),s=!1;if(e.append(i),re(this,vn,Jt(this,he,No).call(this,()=>{try{return Dn(()=>H(this,bs).call(this,i))}catch(r){try{this.error(r),s=!0}catch(a){si(a,H(this,Ze).parent)}return null}})),H(this,vn)===null){re(this,ti,null),s&&Jt(this,he,Zr).call(this,Ht);return}H(this,Yi)===0&&(H(this,Cn).before(e),re(this,ti,null),As(H(this,en),()=>{re(this,en,null)}),Jt(this,he,Zr).call(this,Ht))}}))},Tc=function(){try{if(this.is_pending=this.has_pending_snippet(),re(this,Yi,0),re(this,Ts,0),re(this,vn,Dn(()=>{H(this,bs).call(this,H(this,Cn))})),H(this,Yi)>0){var t=re(this,ti,document.createDocumentFragment());Vu(H(this,vn),t);const e=H(this,Pn).pending;re(this,en,Dn(()=>e(H(this,Cn))))}else Jt(this,he,Zr).call(this,Ht)}catch(e){this.error(e)}},Zr=function(t){this.is_pending=!1,t.transfer_reactions(H(this,wa))},No=function(t){var e=de,i=ae,s=be;fi(H(this,Ze)),Un(H(this,Ze)),gr(H(this,Ze).ctx);try{return ts.ensure(),t()}finally{fi(e),Un(i),gr(s)}},wc=function(t,e){var i;if(!this.has_pending_snippet()){this.parent&&Jt(i=this.parent,he,wc).call(i,t,e);return}re(this,Yi,H(this,Yi)+t),H(this,Yi)===0&&(Jt(this,he,Zr).call(this,e),H(this,en)&&As(H(this,en),()=>{re(this,en,null)}),H(this,ti)&&(H(this,Cn).before(H(this,ti)),re(this,ti,null)))},Ac=function(t){H(this,vn)&&(rn(H(this,vn)),re(this,vn,null)),H(this,en)&&(rn(H(this,en)),re(this,en,null)),H(this,xn)&&(rn(H(this,xn)),re(this,xn,null));let e=H(this,Pn).failed;const i=s=>{if(Jt(this,he,Wi).call(this))return;const{reset:r,invoke_onerror:a}=Jt(this,he,bc).call(this,s);a(),e&&!Jt(this,he,Wi).call(this)&&re(this,xn,Jt(this,he,No).call(this,()=>{try{return Dn(()=>{var o=de;o.b=this,o.f|=dc,e(H(this,Cn),()=>s,()=>r)})}catch(o){return si(o,H(this,Ze).parent),null}}))};wi(()=>{if(!Jt(this,he,Wi).call(this)){var s;try{s=this.transform_error(t)}catch(r){si(r,H(this,Ze)&&H(this,Ze).parent);return}s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(i,r=>si(r,H(this,Ze)&&H(this,Ze).parent)):i(s)}})};function Rt(n,t){var e=t==null?"":typeof t=="object"?`${t}`:t;e!==(n[qr]??(n[qr]=n.nodeValue))&&(n[qr]=e,n.nodeValue=`${e}`)}function m_(n,t){return __(n,t)}const to=new Map;function __(n,{target:t,anchor:e,props:i={},events:s,context:r,intro:a=!0,transformError:o}){Hm();var l=void 0,c=Ym(()=>{var u=e??t.appendChild(Pi());u_(u,{pending:()=>{}},f=>{Ni({});var _=be;r&&(_.c=r),s&&(i.$$events=s),l=n(f,i)||Du(),Fi()},o);var h=new Set,p=f=>{for(var _=0;_<f.length;_++){var g=f[_];if(!h.has(g)){h.add(g);var m=n_(g);for(const M of[t,document]){var d=to.get(M);d===void 0&&(d=new Map,to.set(M,d));var w=d.get(g);w===void 0?(M.addEventListener(g,Ec,{passive:m}),d.set(g,1)):d.set(g,w+1)}}}};return p(al(Hd)),Mc.add(p),()=>{var m;for(var f of h)for(const d of[t,document]){var _=to.get(d),g=_.get(f);--g==0?(d.removeEventListener(f,Ec),_.delete(f),_.size===0&&to.delete(d)):_.set(f,g)}Mc.delete(p),u!==e&&((m=u.parentNode)==null||m.removeChild(u))}});return g_.set(l,c),l}let g_=new WeakMap;var Hn,ei,yn,ws,Aa,Ra,sl;class v_{constructor(t,e=!0){He(this,"anchor");Yt(this,Hn,new Map);Yt(this,ei,new Map);Yt(this,yn,new Map);Yt(this,ws,new Set);Yt(this,Aa,!0);Yt(this,Ra,t=>{if(H(this,Hn).has(t)){var e=H(this,Hn).get(t),i=H(this,ei).get(e);if(i)jo(i),H(this,ws).delete(e);else{var s=H(this,yn).get(e);s&&(jo(s.effect),H(this,ei).set(e,s.effect),H(this,yn).delete(e),s.fragment.lastChild.remove(),this.anchor.before(s.fragment),i=s.effect)}for(const[r,a]of H(this,Hn)){if(H(this,Hn).delete(r),r===t)break;const o=H(this,yn).get(a);o&&(rn(o.effect),H(this,yn).delete(a))}for(const[r,a]of H(this,ei)){if(r===e||H(this,ws).has(r))continue;const o=()=>{if(Array.from(H(this,Hn).values()).includes(r)){var c=document.createDocumentFragment();Vu(a,c),c.append(Pi()),H(this,yn).set(r,{effect:a,fragment:c})}else rn(a);H(this,ws).delete(r),H(this,ei).delete(r)};H(this,Aa)||!i?(H(this,ws).add(r),As(a,o,!1)):o()}}});Yt(this,sl,t=>{H(this,Hn).delete(t);const e=Array.from(H(this,Hn).values());for(const[i,s]of H(this,yn))e.includes(i)||(rn(s.effect),H(this,yn).delete(i))});this.anchor=t,re(this,Aa,e)}ensure(t,e){var i=Ht,s=wd();if(e&&!H(this,ei).has(t)&&!H(this,yn).has(t))if(s){var r=document.createDocumentFragment(),a=Pi();r.append(a),H(this,yn).set(t,{effect:Dn(()=>e(a)),fragment:r})}else H(this,ei).set(t,Dn(()=>e(this.anchor)));if(H(this,Hn).set(i,t),s){for(const[o,l]of H(this,ei))o===t?i.unskip_effect(l):i.skip_effect(l);for(const[o,l]of H(this,yn))o===t?i.unskip_effect(l.effect):i.skip_effect(l.effect);i.oncommit(H(this,Ra)),i.ondiscard(H(this,sl))}else H(this,Ra).call(this,i)}}Hn=new WeakMap,ei=new WeakMap,yn=new WeakMap,ws=new WeakMap,Aa=new WeakMap,Ra=new WeakMap,sl=new WeakMap;function Fe(n,t,e=!1){var i=new v_(n),s=e?_r:0;function r(a,o){i.ensure(a,o)}zu(()=>{var a=!1;t((o,l=0)=>{a=!0,r(l,o)}),a||r(-1,null)},s)}function Tl(n,t){return t}function x_(n,t,e){for(var i=[],s=t.length,r,a=t.length,o=0;o<s;o++){let h=t[o];As(h,()=>{if(r){if(r.pending.delete(h),r.done.add(h),r.pending.size===0){var p=n.outrogroups;Rc(n,al(r.done)),p.delete(r),p.size===0&&(n.outrogroups=null)}}else a-=1},!1)}if(a===0){var l=i.length===0&&e!==null&&n.pending.size===0;if(l){var c=e,u=c.parentNode;Vm(u),u.append(c),n.items.clear()}Rc(n,t,!l)}else r={pending:new Set(t),done:new Set},(n.outrogroups??(n.outrogroups=new Set)).add(r)}function Rc(n,t,e=!0){var i;if(n.pending.size>0){i=new Set;for(const a of n.pending.values())for(const o of a)i.add(n.items.get(o).e)}for(var s=0;s<t.length;s++){var r=t[s];if(i!=null&&i.has(r)){r.f|=ri;const a=document.createDocumentFragment();Vu(r,a)}else rn(t[s],e)}}var Ah;function Xe(n,t,e,i,s,r=null){var a=n,o=new Map,l=(t&id)!==0;if(l){var c=n;a=c.appendChild(Pi())}var u=null,h=na(()=>{var w=e();return rl(w)?w:w==null?[]:al(w)}),p=new Map,f=!0;function _(w){if((d.effect.f&Ke)===0){d.pending.delete(w);var M=P(h);d.fallback=u,y_(d,M,a,t,i),u!==null&&(M.length===0?(u.f&ri)===0?jo(u):(u.f^=ri,Kr(u,null,a)):As(u,()=>{u=null}))}}function g(w){d.pending.delete(w)}var m=zu(()=>{for(var w=P(h),M=w.length,x=new Set,I=Ht,C=wd(),A=0;A<M;A+=1){var D=w[A],T=i(D,A),y=f?null:o.get(T);y?(y.v&&vr(y.v,D),y.i&&vr(y.i,A),C&&I.unskip_effect(y.e)):(y=S_(o,f?a:Ah??(Ah=Pi()),D,T,A,s,t,e),f||(y.e.f|=ri),o.set(T,y)),x.add(T)}if(M===0&&r&&!u&&(f?u=Dn(()=>r(a)):(u=Dn(()=>r(Ah??(Ah=Pi()))),u.f|=ri)),M>x.size&&_m(),!f)if(p.set(I,x),C){for(const[R,j]of o)x.has(R)||I.skip_effect(j.e);I.oncommit(_),I.ondiscard(g)}else _(I);P(h)}),d={effect:m,items:o,pending:p,outrogroups:null,fallback:u};f=!1}function Br(n){for(;n!==null&&(n.f&$n)===0;)n=n.next;return n}function y_(n,t,e,i,s){var y,R,j,k,Z,K,$,z,L;var r=(i&am)!==0,a=t.length,o=n.items,l=Br(n.effect.first),c,u=null,h,p=[],f=[],_,g,m,d;if(r)for(d=0;d<a;d+=1)_=t[d],g=s(_,d),m=o.get(g).e,(m.f&ri)===0&&((R=(y=m.nodes)==null?void 0:y.a)==null||R.measure(),(h??(h=new Set)).add(m));for(d=0;d<a;d+=1){if(_=t[d],g=s(_,d),m=o.get(g).e,n.outrogroups!==null)for(const et of n.outrogroups)et.pending.delete(m),et.done.delete(m);if((m.f&sn)!==0&&(jo(m),r&&((k=(j=m.nodes)==null?void 0:j.a)==null||k.unfix(),(h??(h=new Set)).delete(m))),(m.f&ri)!==0)if(m.f^=ri,m===l)Kr(m,null,e);else{var w=u?u.next:l;m===n.effect.last&&(n.effect.last=m.prev),m.prev&&(m.prev.next=m.next),m.next&&(m.next.prev=m.prev),Oi(n,u,m),Oi(n,m,w),Kr(m,w,e),u=m,p=[],f=[],l=Br(u.next);continue}if(m!==l){if(c!==void 0&&c.has(m)){if(p.length<f.length){var M=f[0],x;u=M.prev;var I=p[0],C=p[p.length-1];for(x=0;x<p.length;x+=1)Kr(p[x],M,e);for(x=0;x<f.length;x+=1)c.delete(f[x]);Oi(n,I.prev,C.next),Oi(n,u,I),Oi(n,C,M),l=M,u=C,d-=1,p=[],f=[]}else c.delete(m),Kr(m,l,e),Oi(n,m.prev,m.next),Oi(n,m,u===null?n.effect.first:u.next),Oi(n,u,m),u=m;continue}for(p=[],f=[];l!==null&&l!==m;)(c??(c=new Set)).add(l),f.push(l),l=Br(l.next);if(l===null)continue}(m.f&ri)===0&&p.push(m),u=m,l=Br(m.next)}if(n.outrogroups!==null){for(const et of n.outrogroups)et.pending.size===0&&(Rc(n,al(et.done)),(Z=n.outrogroups)==null||Z.delete(et));n.outrogroups.size===0&&(n.outrogroups=null)}if(l!==null||c!==void 0){var A=[];if(c!==void 0)for(m of c)(m.f&sn)===0&&A.push(m);for(;l!==null;)(l.f&sn)===0&&l!==n.fallback&&A.push(l),l=Br(l.next);var D=A.length;if(D>0){var T=(i&id)!==0&&a===0?e:null;if(r){for(d=0;d<D;d+=1)($=(K=A[d].nodes)==null?void 0:K.a)==null||$.measure();for(d=0;d<D;d+=1)(L=(z=A[d].nodes)==null?void 0:z.a)==null||L.fix()}x_(n,A,T)}}r&&wi(()=>{var et,ot;if(h!==void 0)for(m of h)(ot=(et=m.nodes)==null?void 0:et.a)==null||ot.apply()})}function S_(n,t,e,i,s,r,a,o){var l=(a&sm)!==0?(a&om)===0?km(e,!1,!1):es(e):null,c=(a&rm)!==0?es(s):null;return{v:l,i:c,e:Dn(()=>(r(t,l??e,c??s,o),()=>{n.delete(i)}))}}function Kr(n,t,e){if(n.nodes)for(var i=n.nodes.start,s=n.nodes.end,r=t&&(t.f&ri)===0?t.nodes.start:e;i!==null;){var a=$a(i);if(r.before(i),i===s)return;i=a}}function Oi(n,t,e){t===null?n.effect.first=e:t.next=e,e===null?n.effect.last=t:e.prev=t}const Rh=[...` 	
\r\f \v\uFEFF`];function M_(n,t,e){var i=n==null?"":""+n;if(t&&(i=i?i+" "+t:t),e){for(var s of Object.keys(e))if(e[s])i=i?i+" "+s:s;else if(i.length)for(var r=s.length,a=0;(a=i.indexOf(s,a))>=0;){var o=a+r;(a===0||Rh.includes(i[a-1]))&&(o===i.length||Rh.includes(i[o]))?i=(a===0?"":i.substring(0,a))+i.substring(o+1):a=o}}return i===""?null:i}function E_(n,t){return n==null?null:String(n)}function Oe(n,t,e,i,s,r){var a=n[pc];if(a!==e||a===void 0){var o=M_(e,i,r);o==null?n.removeAttribute("class"):n.className=o,n[pc]=e}else if(r&&s!==r)for(var l in r){var c=!!r[l];(s==null||c!==!!s[l])&&n.classList.toggle(l,c)}return r}function oa(n,t,e,i){var s=n[mc];if(s!==t){var r=E_(t);r==null?n.removeAttribute("style"):n.style.cssText=r,n[mc]=t}return i}function b_(n,t){t?n.hasAttribute("selected")||n.setAttribute("selected",""):n.removeAttribute("selected")}function T_(n,t){var e=n.__defaultValue,i=n.multiple,s=i?e??[]:null;if(!(i&&!rl(s))){n.selectedIndex;for(var r of n.options){var a=rr(r);b_(r,i?s.includes(a):Md(a,e))}}}function Gu(n,t,e=!1){if(n.multiple){if(t==null)return;if(!rl(t))return fm();for(var i of n.options)i.selected=t.includes(rr(i));return}for(i of n.options){var s=rr(i);if(Md(s,t)){i.selected=!0;return}}(!e||t!==void 0)&&(n.selectedIndex=-1)}function Vd(n){var t=new MutationObserver(e=>{e.every(A_)||("__defaultValue"in n&&T_(n),"__value"in n&&Gu(n,n.__value))});t.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Bu(()=>{t.disconnect()})}function w_(n,t,e=t){var i=new WeakSet,s=!0;Iu(n,"change",r=>{var a=r?"[selected]":":checked",o;if(n.multiple)o=[].map.call(n.querySelectorAll(a),rr);else{var l=n.querySelector(a)??n.querySelector("option:not([disabled])");o=l&&rr(l)}e(o),n.__value=o,Ht!==null&&i.add(Ht)}),Cd(()=>{var r=t();if(n===document.activeElement){var a=Ht;if(i.has(a))return}if(Gu(n,r,s),s&&r===void 0){var o=n.querySelector(":checked");o!==null&&(r=rr(o),e(r))}n.__value=r,s=!1})}function rr(n){return"__value"in n?n.__value:n.value}function A_(n){if(n.target.closest("selectedcontent")!==null)return!0;if(n.type==="childList"){var t=[...n.addedNodes,...n.removedNodes];return t.length>0&&t.every(e=>e.nodeName==="SELECTEDCONTENT")}return!1}const R_=Symbol("is custom element"),C_=Symbol("is html"),P_=im?"progress":"PROGRESS";function kr(n,t){var e=Gd(n);e.value===(e.value=t??void 0)||n.value===t&&(t!==0||n.nodeName!==P_)||(n.value=t??"")}function er(n,t,e,i){var s=Gd(n),r=s[t];r!==(s[t]=e)&&(t==="loading"&&(n[nm]=e),e==null?n.removeAttribute(t):typeof e!="string"&&D_(n).has(t)?n[t]=e:n.setAttribute(t,e))}function Gd(n){return n[Lo]??(n[Lo]={[R_]:n.nodeName.includes("-"),[C_]:n.namespaceURI===um})}var Ch=new Map;function D_(n){var t=n.getAttribute("is")||n.nodeName,e=Ch.get(t);if(e)return e;Ch.set(t,e=new Set);for(var i,s=n,r=Element.prototype;r!==s;){i=Jf(s);for(var a in i)i[a].set&&a!=="innerHTML"&&a!=="textContent"&&a!=="innerText"&&e.add(a);s=Cu(s)}return e}function Fo(n,t,e=t){var i=new WeakSet;Iu(n,"input",async s=>{var r=s?n.defaultValue:n.value;if(r=wl(n)?Al(r):r,e(r),Ht!==null&&i.add(Ht),await Qm(),r!==(r=t())){var a=n.selectionStart,o=n.selectionEnd,l=n.value.length;if(n.value=r??"",o!==null){var c=n.value.length;a===o&&o===l&&c>l?(n.selectionStart=c,n.selectionEnd=c):(n.selectionStart=a,n.selectionEnd=Math.min(o,c))}}}),Fs(t)==null&&n.value&&(e(wl(n)?Al(n.value):n.value),Ht!==null&&i.add(Ht)),ll(()=>{var s=t();if(n===document.activeElement){var r=Ht;if(i.has(r))return}wl(n)&&s===Al(n.value)||n.type==="date"&&!s&&!n.value||s!==n.value&&(n.value=s??"")})}function Cc(n,t,e=t){Iu(n,"change",i=>{var s=i?n.defaultChecked:n.checked;e(s)}),Fs(t)==null&&e(n.checked),ll(()=>{var i=t();n.checked=!!i})}function wl(n){var t=n.type;return t==="number"||t==="range"}function Al(n){return n===""?null:+n}function Rl(n,t){return n===t||(n==null?void 0:n[Zi])===t}function Pc(n=Du(),t,e,i){var s=be.r,r=de;return Cd(()=>{var a,o;return ll(()=>{a=o,o=[],Fs(()=>{Rl(e(...o),n)||(t(n,...o),a&&Rl(e(...a),n)&&t(null,...a))})}),()=>{let l=r;for(;l!==s&&l.parent!==null&&l.parent.f&pa;)l=l.parent;const c=()=>{o&&Rl(e(...o),n)&&t(null,...o)},u=l.teardown;l.teardown=()=>{c(),u==null||u()}}}),n}function Wd(n=!1){const t=be,e=t.l.u;if(!e)return;let i=()=>t_(t.s);if(n){let s=0,r={};const a=ol(()=>{let o=!1;const l=t.s;for(const c in l)l[c]!==r[c]&&(r[c]=l[c],o=!0);return o&&s++,s});i=()=>P(a)}e.b.length&&qm(()=>{Ph(t,i),fc(e.b)}),ns(()=>{const s=Fs(()=>e.m.map(Qp));return()=>{for(const r of s)typeof r=="function"&&r()}}),e.a.length&&ns(()=>{Ph(t,i),fc(e.a)})}function Ph(n,t){if(n.l.s)for(const e of n.l.s)P(e);t()}function L_(n){var t=es(0);return function(){return arguments.length===1?(Zt(t,P(t)+1),arguments[0]):(P(t),n())}}function cl(n){be===null&&od(),qa&&be.l!==null?I_(be).m.push(n):ns(()=>{const t=Fs(n);if(typeof t=="function")return t})}function Xd(n){be===null&&od(),cl(()=>()=>Fs(n))}function I_(n){var t=n.l;return t.u??(t.u={a:[],b:[],m:[]})}const U_="5";var jf;typeof window<"u"&&((jf=window.__svelte??(window.__svelte={})).v??(jf.v=new Set)).add(U_);wm();const Dc=50;class N_{constructor(){this.undoStack=[],this.redoStack=[],this.onChange=null}_emit(){this.onChange&&this.onChange(this.canUndo(),this.canRedo())}push(t,e){this.undoStack.push({snapshot:t,label:e}),this.undoStack.length>Dc&&this.undoStack.shift(),this.redoStack=[],this._emit()}undo(t,e){const i=this.undoStack.pop();return i?(this.redoStack.push({snapshot:t,label:e}),this._emit(),i.snapshot):null}redo(t){const e=this.redoStack.pop();return e?(this.undoStack.push({snapshot:t,label:e.label}),this._emit(),e.snapshot):null}canUndo(){return this.undoStack.length>0}canRedo(){return this.redoStack.length>0}undoLabel(){var t;return((t=this.undoStack.at(-1))==null?void 0:t.label)??""}redoLabel(){var t;return((t=this.redoStack.at(-1))==null?void 0:t.label)??""}sizes(){return{undo:this.undoStack.length,redo:this.redoStack.length,limit:Dc}}clear(){this.undoStack=[],this.redoStack=[],this._emit()}}const F_=Dc,nn=1e-9;function Ai(n,t){return Math.hypot(n.x-t.x,n.y-t.y)}function Cs(n,t,e=1e-6){return Ai(n,t)<=e}function qd(n){let t=0;for(let e=0;e<n.length;e++){const i=n[e],s=n[(e+1)%n.length];t+=i.x*s.y-s.x*i.y}return t/2}function ui(n){return Math.abs(qd(n))}function Dr(n){if(!n||!n.rings||!n.rings.length)return 0;let t=ui(n.rings[0]);for(let e=1;e<n.rings.length;e++)t-=ui(n.rings[e]);return Math.max(0,t)}function Wu(n){let t=0;for(let e=0;e<n.length;e++)t+=Ai(n[e],n[(e+1)%n.length]);return t}function Xu(n){let t=1/0,e=1/0,i=-1/0,s=-1/0;for(const r of n)for(const a of r.rings)for(const o of a)t=Math.min(t,o.x),i=Math.max(i,o.x),e=Math.min(e,o.y),s=Math.max(s,o.y);return{minX:t,minY:e,maxX:i,maxY:s,w:i-t,h:s-e}}function Di(n){let t=0,e=0,i=0;for(let s=0;s<n.length;s++){const r=n[s],a=n[(s+1)%n.length],o=r.x*a.y-a.x*r.y;i+=o,t+=(r.x+a.x)*o,e+=(r.y+a.y)*o}if(i*=.5,Math.abs(i)<nn){const s=n.reduce((r,a)=>({x:r.x+a.x,y:r.y+a.y}),{x:0,y:0});return{x:s.x/n.length,y:s.y/n.length}}return{x:t/(6*i),y:e/(6*i)}}function Oo(n,t,e,i){return n*i-t*e}function yr(n,t,e,i){const s=t.x-n.x,r=t.y-n.y,a=i.x-e.x,o=i.y-e.y,l=Oo(s,r,a,o);if(Math.abs(l)<nn)return null;const c=Oo(e.x-n.x,e.y-n.y,a,o)/l,u=Oo(e.x-n.x,e.y-n.y,s,r)/l;if(c<-nn||c>1+nn||u<-nn||u>1+nn)return null;const h=Math.min(1,Math.max(0,c));return{x:n.x+s*h,y:n.y+r*h,t:c,u}}function la(n){const t=[];for(let e=0;e<n.length;e++)t.push([n[e],n[(e+1)%n.length],e]);return t}function Yd(n){const t=[],e=n.length;if(e<4)return t;const i=la(n);for(let s=0;s<i.length;s++)for(let r=s+1;r<i.length;r++){if(r-s===1||s===0&&r===e-1)continue;const[o,l]=i[s],[c,u]=i[r],h=yr(o,l,c,u);h&&t.push({edge1:s,edge2:r,point:{x:h.x,y:h.y}})}return t}function O_(n){const t=[];n.rings.forEach((i,s)=>{if(i.length<3){t.push({ringIndex:s,type:"顶点不足",detail:`环${s}至少需要3个界址点`});return}for(const r of Yd(i))t.push({ringIndex:s,type:"自相交",detail:`环${s}边${r.edge1+1}与边${r.edge2+1}相交于 (${r.point.x.toFixed(2)}, ${r.point.y.toFixed(2)})`,point:r.point})});const e=n.rings[0];for(let i=1;i<n.rings.length;i++){const s=Di(n.rings[i]);jn(s,e)||t.push({ringIndex:i,type:"孔洞越界",detail:`孔洞${i}中心不在外轮廓内`})}return t}function jn(n,t){let e=!1;for(let i=0,s=t.length-1;i<t.length;s=i++){const r=t[i],a=t[s];r.y>n.y!=a.y>n.y&&n.x<(a.x-r.x)*(n.y-r.y)/(a.y-r.y)+r.x&&(e=!e)}return e}function B_(n,t){if(!jn(n,t.rings[0]))return!1;for(let e=1;e<t.rings.length;e++)if(jn(n,t.rings[e]))return!1;return!0}function Sr(n,t,e){const i=e.x-t.x,s=e.y-t.y,r=i*i+s*s;let a=r<nn?0:((n.x-t.x)*i+(n.y-t.y)*s)/r;a=Math.min(1,Math.max(0,a));const o={x:t.x+a*i,y:t.y+a*s};return{dist:Ai(n,o),point:o,t:a}}function k_(n,t){let e=null;for(let i=0;i<t.length-1;i++){const s=Sr(n,t[i],t[i+1]);(!e||s.dist<e.dist)&&(e={...s,segment:i})}return e}function qu(n){return qd(n)<0?[...n].reverse():n}function z_(n,t){let e=n.map(s=>({...s}));const i=qu(t);for(let s=0;s<i.length;s++){const r=i[s],a=i[(s+1)%i.length],o=e;e=[];const l=c=>Oo(a.x-r.x,a.y-r.y,c.x-r.x,c.y-r.y)>=-nn;for(let c=0;c<o.length;c++){const u=o[c],h=o[(c+o.length-1)%o.length],p=l(u),f=l(h);if(p){if(!f){const _=yr(h,u,r,a);_&&e.push({x:_.x,y:_.y})}e.push(u)}else if(f){const _=yr(h,u,r,a);_&&e.push({x:_.x,y:_.y})}}if(!e.length)break}return e}function Lc(n,t){return t.every(e=>jn(e,n))}function ga(n,t){const e=n.map(i=>({pt:i,kind:"v"}));for(const i of t){let s=!1;for(const r of e.keys())if(Cs(e[r].pt,i,1e-5)){s=!0;break}if(!s){for(let r=0;r<n.length;r++){const a=n[r],o=n[(r+1)%n.length],l=Sr(i,a,o);if(l.dist<1e-5&&l.t>nn&&l.t<1-nn){let c=-1;for(let u=0;u<e.length;u++)if(Cs(e[u].pt,a,1e-5)){c=u+1;break}if(c>0){e.splice(c,0,{pt:{...i},kind:"cut",edge:r}),s=!0;break}}}if(!s)throw new Error("接合点不在环边界上")}}return e}function $i(n,t,e){const i=n.findIndex(a=>Cs(a.pt,t,1e-5)),s=n.findIndex(a=>Cs(a.pt,e,1e-5));if(i<0||s<0)throw new Error("接合点定位失败");const r=[];for(let a=i;r.push({...n[a].pt}),a!==s;a=(a+1)%n.length);return r}function H_(n,t){const e=n.rings[0],i=t.rings[0];if(Lc(e,i))return{rings:[e,i,...n.rings.slice(1),...t.rings.slice(1)]};if(Lc(i,e))return{rings:[i,e,...n.rings.slice(1),...t.rings.slice(1)]};const s=new Map,r=M=>{const x=`${Math.round(M.x*1e3)},${Math.round(M.y*1e3)}`;s.has(x)||s.set(x,{x:M.x,y:M.y})};for(const M of la(e)){for(const x of la(i)){const I=yr(M[0],M[1],x[0],x[1]);I&&r(I)}for(const x of i)Sr(x,M[0],M[1]).dist<1e-5&&r(x)}for(const M of e)for(const x of la(i))Sr(M,x[0],x[1]).dist<1e-5&&r(M);const a=[...s.values()];if(a.length!==2)throw new Error("两宗宗海没有唯一公共边（应恰好有2个接合点），无法合并");const[o,l]=a,c=ga(e,[o,l]),u=ga(i,[o,l]),h=$i(c,o,l),p=$i(c,l,o),f=$i(u,o,l),_=$i(u,l,o),g=ui(e)+ui(i),m=[h.concat(_.slice(1,-1)),h.concat([...f].reverse().slice(1,-1)),p.concat(f.slice(1,-1)),p.concat([..._].reverse().slice(1,-1))];let d=null;for(const M of m){if(M.length<3||Yd(M).length)continue;const x=ui(M),I=Math.abs(x-g);(!d||I<d.score)&&(d={ring:M,score:I})}if(!d)throw new Error("合并后的轮廓存在自相交，已放弃合并");const w=[];for(const M of[...n.rings.slice(1),...t.rings.slice(1)])jn(Di(M),d.ring)&&w.push(M);return{rings:[d.ring,...w]}}function V_(n){if(n.length<2)throw new Error("请至少选择两宗相邻宗海");let t={rings:n[0].rings.map(e=>e.map(i=>({...i})))};for(let e=1;e<n.length;e++)t=H_(t,{rings:n[e].rings.map(i=>i.map(s=>({...s})))});return t}function G_(n,t,e){const i=n.rings[0];ga(i,[]);const s=[];for(let f=0;f<i.length;f++){const _=i[f],g=i[(f+1)%i.length],m=yr(_,g,t,e);m&&(m.t<nn||m.t>1-nn||s.push({x:m.x,y:m.y,edge:f}))}const r=[];for(const f of s)r.some(_=>Cs(_,f,1e-5))||r.push(f);if(r.length<2)throw new Error("切割线未贯穿宗海（与外轮廓交点少于2个）");if(r.length>2)throw new Error("切割线与外轮廓交点过多，请简化切割线后重试");const a=ga(i,r),[o,l]=r,c=$i(a,o,l),u=$i(a,l,o),h=[c,u].filter(f=>f.length>=3&&ui(f)>.01);if(h.length<2)throw new Error("切割失败：未能形成两个有效面");const p=h.map(f=>({rings:[f]}));for(const f of n.rings.slice(1)){const _=Di(f),g=p.find(m=>jn(_,m.rings[0]));g&&g.rings.push(f)}return p}function W_(n,t){const e=n.rings[0],i=[];jn(t[0],e)&&i.push({...t[0],kind:"in"});for(let r=0;r<t.length-1;r++){const a=t[r],o=t[r+1],l=[];for(let c=0;c<e.length;c++){const u=yr(a,o,e[c],e[(c+1)%e.length]);u&&u.t>nn&&u.t<1-nn&&l.push({x:u.x,y:u.y,t:u.t,kind:"cross"})}l.sort((c,u)=>c.t-u.t);for(const c of l)i.some(u=>Cs(u,c,1e-5))||i.push({x:c.x,y:c.y,kind:"cross"});jn(o,e)&&!i.some(c=>Cs(c,o,1e-5))&&i.push({...o,kind:"in"})}const s=i.filter(r=>r.kind==="cross");if(s.length<2)throw new Error("参考线未贯穿该宗海（与外轮廓交点少于2个），无法切割");if(s.length>2)throw new Error("参考线与外轮廓交点过多，请简化参考线后重试");return{entry:s[0],exit:s[1],inner:i.map(({x:r,y:a})=>({x:r,y:a}))}}function X_(n,t){const{entry:e,exit:i,inner:s}=W_(n,t),r=n.rings[0],a=ga(r,[e,i]),o=$i(a,e,i),l=$i(a,i,e),c=s.map(g=>({...g})),u=[...s].reverse().map(g=>({...g})),h=o.concat(u.slice(1,-1)),p=l.concat(c.slice(1,-1)),f=[h,p].filter(g=>g.length>=3&&ui(g)>.01);if(f.length<2)throw new Error("切割失败：未能形成两个有效面");const _=f.map(g=>({rings:[g]}));for(const g of n.rings.slice(1)){const m=Di(g),d=_.find(w=>jn(m,w.rings[0]));d&&d.rings.push(g)}return _}function Dh(n,t){const e=n.rings[0];if(!Lc(e,t))return null;for(const i of n.rings.slice(1))if(t.some(s=>jn(s,i)))throw new Error("扣减范围与已有孔洞重叠");return{rings:[e,...n.rings.slice(1),t.map(i=>({...i}))]}}function $d(n){const t=n.length,e=Ai(n[0],n[t-1]),i=Wu(n)/t,s=.5*e*i;return{linear:e,area:s,meanEdge:i}}function jd(n,t){if(n.length<2)throw new Error("航道中心线至少需要2个点");const e=[],i=[],s=[];for(let o=0;o<n.length-1;o++){const l=n[o+1].x-n[o].x,c=n[o+1].y-n[o].y,u=Math.hypot(l,c)||1;s.push({x:l/u,y:c/u})}const r=o=>({x:-o.y*t,y:o.x*t});for(let o=0;o<n.length;o++){let l;if(o===0)l=s[0];else if(o===n.length-1)l=s[s.length-1];else{const u=s[o-1],h=s[o],p=u.x+h.x,f=u.y+h.y,_=Math.hypot(p,f);if(_<nn)l=u;else{const g={x:p/_,y:f/_},m=g.x*u.x+g.y*u.y,d=m>.35?1/m:1;l={x:g.x*d,y:g.y*d}}}const c=r(l);e.push({x:n[o].x+c.x,y:n[o].y+c.y}),i.push({x:n[o].x-c.x,y:n[o].y-c.y})}const a=e.concat([...i].reverse());return qu(a)}function q_(n,t,e){const{coastline:i,parcels:s,excludeParcelId:r=null,excludeRing:a=null}=e;let o=null;const l=(c,u)=>{const h=Ai(n,c);h<=t&&(!o||h<o.d)&&(o={point:{...c},d:h,source:u})};for(const c of i)l(c,"岸线拐点");for(const c of s)c.id!==r&&c.rings.forEach((u,h)=>u.forEach(p=>l(p,`相邻宗海 ${c.id} 界址点`)));if(r&&a){const c=s.find(u=>u.id===r);c==null||c.rings.forEach((u,h)=>{h!==a&&u.forEach(p=>l(p,`本宗环${h}界址点`))})}return o}function Y_(n,t,e){const i=k_(n,e);return i&&i.dist<=t?{point:i.point,d:i.dist,source:"航道中心线",segment:i.segment}:null}function $_(n,t,e){const i=q_(n,t,e),s=e.fairway?Y_(n,t,e.fairway.centerline):null;return i&&(!s||i.d<=s.d)?{...i,kind:"vertex"}:s?{...s,kind:"edge"}:null}const Ps=[{code:"ZSHY-01",name:"渔业用海",color:"#2f9e8f"},{code:"ZSHY-02",name:"工业用海",color:"#c47f2d"},{code:"ZSHY-03",name:"交通运输用海",color:"#3d7bc4"},{code:"ZSHY-04",name:"旅游娱乐用海",color:"#c45aa0"},{code:"ZSHY-05",name:"海底工程用海",color:"#7d6bb5"},{code:"ZSHY-06",name:"排污倾倒用海",color:"#8a8f4b"},{code:"ZSHY-07",name:"造地工程用海",color:"#b5654a"},{code:"ZSHY-08",name:"特殊用海",color:"#9a3d3d"}];function ul(n){var t;return((t=Ps.find(e=>e.code===n))==null?void 0:t.name)??n}function hl(n){var t;return((t=Ps.find(e=>e.code===n))==null?void 0:t.color)??"#5a8fb0"}const Zd=[{x:0,y:1750},{x:600,y:1700},{x:1100,y:1620},{x:1500,y:1480},{x:1750,y:1260},{x:2050,y:1e3},{x:2400,y:1050},{x:2900,y:1600},{x:3500,y:1520},{x:4200,y:1450}],Ic={name:"主航道 L-3",width:120,centerline:[{x:200,y:700},{x:900,y:1050},{x:1700,y:1300},{x:2500,y:1180},{x:3300,y:950},{x:3900,y:700}]},j_=[{id:"anchor-1",name:"1号锚地",ring:[{x:1800,y:1e3},{x:2150,y:980},{x:2200,y:1250},{x:1850,y:1300}]},{id:"anchor-2",name:"2号锚地",ring:[{x:2750,y:800},{x:3150,y:780},{x:3200,y:1050},{x:2800,y:1100}]}],Z_=[{id:"aq-1",name:"东湾养殖区",ring:[{x:400,y:300},{x:1200,y:250},{x:1350,y:700},{x:550,y:780}]},{id:"aq-2",name:"沙岗养殖区",ring:[{x:2500,y:150},{x:3300,y:120},{x:3400,y:520},{x:2600,y:580}]}];let Kd=3;function Lh(){return`ZH-${String(++Kd).padStart(3,"0")}`}function K_(n){Kd=n}function J_(){return[{id:"ZH-001",applicant:"蓝湾水产养殖有限公司",seaType:"ZSHY-01",elevation:12,status:"待分派",rings:[[{x:700,y:1e3},{x:1620,y:950},{x:1620,y:1500},{x:850,y:1600}]]},{id:"ZH-002",applicant:"临港工业集团",seaType:"ZSHY-02",elevation:28,status:"待分派",rings:[[{x:1620,y:950},{x:2400,y:880},{x:2480,y:1450},{x:1620,y:1500}]]},{id:"ZH-003",applicant:"市港务发展公司",seaType:"ZSHY-03",elevation:20,status:"待分派",rings:[[{x:2550,y:700},{x:3300,y:650},{x:3380,y:1200},{x:2620,y:1280}]]}]}const Uc=[{id:"u01",name:"王建国",title:"高级调查员"},{id:"u02",name:"李秀兰",title:"调查员"},{id:"u03",name:"陈海涛",title:"调查员"},{id:"u04",name:"赵敏",title:"助理调查员"}];function Q_(n){return n.map((t,e)=>({jobId:`GD-2026-${String(1001+e)}`,parcelId:t.id,applicant:t.applicant,receivedAt:`2026-11-${String(10+e).padStart(2,"0")} 09:${20+e*7}`,stage:"待分派",assignee:null,qcResult:null,reworkCount:0,history:[{at:`2026-11-${String(10+e).padStart(2,"0")} 09:${20+e*7}`,action:"前台接单登记",by:"前台"}]}))}const Cl=n=>structuredClone(n);var Ca,Pa,Da,La,Ia,Ua,Na,Fa,Oa,Ba,ka,za,Ha,Va,Ga;class tg{constructor(){Yt(this,Ca,_e(En([])));Yt(this,Pa,_e(En([])));Yt(this,Da,_e(null));Yt(this,La,_e(0));Yt(this,Ia,_e(En([])));Yt(this,Ua,_e(null));Yt(this,Na,_e("select"));Yt(this,Fa,_e(!0));Yt(this,Oa,_e(15));Yt(this,Ba,_e(En({parcels:!0,vertices:!0,seaTypes:!0,coastline:!0,fairway:!0,aquaculture:!0,anchorages:!0})));Yt(this,ka,_e(null));He(this,"history",new N_);He(this,"baseData",Object.freeze({coastline:Zd,fairway:Ic,anchorages:j_,aquacultureZones:Z_,surveyors:Uc,seaTypes:Ps}));Yt(this,za,ii(()=>this.parcels.map(t=>({id:t.id,issues:O_({rings:t.rings})}))));Yt(this,Ha,ii(()=>this.parcels.find(t=>t.id===this.selectedParcelId)??null));Yt(this,Va,_e(1));Yt(this,Ga,ii(()=>{const t=this.jobs,e=t.length,i=t.filter(u=>u.stage==="质检合格").length,s=t.filter(u=>u.stage==="不合格打回").length,r=t.reduce((u,h)=>u+(h.qcSubmits??0),0),a=t.reduce((u,h)=>u+h.reworkCount,0),o=r?a/r:0,l=this.baseData.surveyors.map(u=>{const h=t.filter(p=>p.assignee===u.id);return{...u,total:h.length,done:h.filter(p=>p.stage==="质检合格").length,rework:h.reduce((p,f)=>p+f.reworkCount,0)}}),c={};for(const u of t)c[u.stage]=(c[u.stage]??0)+1;return{total:e,done:i,rejected:s,submits:r,reworks:a,reworkRate:o,bySurveyor:l,stageCounts:c}}));const t=J_();K_(t.length),this.parcels=t,this.jobs=Q_(t)}get parcels(){return P(H(this,Ca))}set parcels(t){Zt(H(this,Ca),t,!0)}get jobs(){return P(H(this,Pa))}set jobs(t){Zt(H(this,Pa),t,!0)}get selectedParcelId(){return P(H(this,Da))}set selectedParcelId(t){Zt(H(this,Da),t,!0)}get selectedRingIndex(){return P(H(this,La))}set selectedRingIndex(t){Zt(H(this,La),t,!0)}get boxSelectedIds(){return P(H(this,Ia))}set boxSelectedIds(t){Zt(H(this,Ia),t,!0)}get boxRect(){return P(H(this,Ua))}set boxRect(t){Zt(H(this,Ua),t,!0)}get tool(){return P(H(this,Na))}set tool(t){Zt(H(this,Na),t,!0)}get snapEnabled(){return P(H(this,Fa))}set snapEnabled(t){Zt(H(this,Fa),t,!0)}get snapTolPx(){return P(H(this,Oa))}set snapTolPx(t){Zt(H(this,Oa),t,!0)}get layers(){return P(H(this,Ba))}set layers(t){Zt(H(this,Ba),t,!0)}get notice(){return P(H(this,ka))}set notice(t){Zt(H(this,ka),t,!0)}notify(t,e){this.notice={id:Math.random().toString(36).slice(2),type:t,text:e,at:Date.now()}}clearNotice(t){this.notice&&this.notice.id===t&&(this.notice=null)}get validation(){return P(H(this,za))}set validation(t){Zt(H(this,za),t)}issuesOf(t){var e;return((e=this.validation.find(i=>i.id===t))==null?void 0:e.issues)??[]}hasBlockingIssue(t){return this.issuesOf(t).some(e=>e.type==="自相交"||e.type==="顶点不足")}get selectedParcel(){return P(H(this,Ha))}set selectedParcel(t){Zt(H(this,Ha),t)}begin(t){this.history.push(Cl(this.parcels),t)}undo(){const t=this.history.undo(Cl(this.parcels));t&&(this.parcels=t,this._pruneSelection())}redo(){const t=this.history.redo(Cl(this.parcels));t&&(this.parcels=t,this._pruneSelection())}_pruneSelection(){var t;this.parcels.some(e=>e.id===this.selectedParcelId)||(this.selectedParcelId=((t=this.parcels[0])==null?void 0:t.id)??null,this.selectedRingIndex=0),this.boxSelectedIds=this.boxSelectedIds.filter(e=>this.parcels.some(i=>i.id===e))}selectParcel(t,e=0){this.selectedParcelId=t;const i=this.parcels.find(s=>s.id===t);this.selectedRingIndex=i&&e<i.rings.length?e:0}setTool(t){this.tool=t,t!=="box"&&(this.boxSelectedIds=[])}applySnap(t,e=null,i=null){if(!this.snapEnabled)return{point:t,snap:null};const s=this.snapTolPx/this.viewScale,r=$_(t,s,{coastline:this.baseData.coastline,fairway:this.baseData.fairway,parcels:this.parcels,excludeParcelId:e,excludeRing:i});return r?{point:r.point,snap:r}:{point:t,snap:null}}get viewScale(){return P(H(this,Va))}set viewScale(t){Zt(H(this,Va),t,!0)}moveVertex(t,e,i,s){const r=this.parcels.find(o=>o.id===t);if(!r)return;const{point:a}=this.applySnap(s,t,e);r.rings[e][i].x=a.x,r.rings[e][i].y=a.y}moveEdge(t,e,i,s,r){var p,f;const a=this.parcels.find(_=>_.id===t);if(!a)return;const o=a.rings[e],l=o[i],c=o[(i+1)%o.length],u=this.applySnap({x:l.x+s,y:l.y+r},t,e),h=this.applySnap({x:c.x+s,y:c.y+r},t,e);((p=u.snap)==null?void 0:p.kind)==="edge"&&((f=h.snap)==null?void 0:f.kind)==="edge"&&u.snap.source===h.snap.source?(l.x=u.point.x,l.y=u.point.y,c.x=h.point.x,c.y=h.point.y):(l.x+=s,l.y+=r,c.x+=s,c.y+=r)}insertVertex(t,e,i,s){const r=this.parcels.find(a=>a.id===t);r&&(this.begin("插入界址点"),r.rings[e].splice(i+1,0,{...s}))}deleteVertex(t,e,i){const s=this.parcels.find(r=>r.id===t);if(s){if(s.rings[e].length<=3){this.notify("warn","每个环至少保留 3 个界址点，无法删除");return}this.begin("删除界址点"),s.rings[e].splice(i,1)}}updateParcelProps(t,e){const i=this.parcels.find(s=>s.id===t);i&&(this.begin("修改宗海属性"),Object.assign(i,e))}deleteParcel(t){const e=this.parcels.findIndex(i=>i.id===t);e<0||(this.begin("删除宗海"),this.parcels.splice(e,1),this.jobs=this.jobs.filter(i=>i.parcelId!==t),this._pruneSelection())}boxSelect(t){this.boxRect=t;const e=[];for(const i of this.parcels){const s=Di(i.rings[0]);s.x>=t.minX&&s.x<=t.maxX&&s.y>=t.minY&&s.y<=t.maxY&&e.push(i.id)}this.boxSelectedIds=e,e.length&&(this.selectedParcelId=e[0])}clearBox(){this.boxRect=null,this.boxSelectedIds=[]}mergeSelected(){const t=this.parcels.filter(e=>this.boxSelectedIds.includes(e.id));if(t.length<2){this.notify("warn","请框选至少两宗相邻宗海后再合并");return}try{this.begin(`合并 ${t.length} 宗宗海`);const e=V_(t.map(r=>({rings:r.rings}))),i=t[0];i.rings=e.rings;const s=t.slice(1).map(r=>r.id);this.parcels=this.parcels.filter(r=>!s.includes(r.id));for(const r of this.jobs)s.includes(r.parcelId)&&(r.stage="已合并",r.history.push({at:wn(),action:`宗海合并入 ${i.id}`,by:"系统"}));this.boxSelectedIds=[],this.boxRect=null,this.selectedParcelId=i.id,this.notify("ok",`合并成功，新宗海编号 ${i.id}，净面积 ${Dr({rings:i.rings}).toFixed(2)} m²`)}catch(e){this.history.undoStack.pop(),this.notify("error",e.message)}}splitWithLine(t,e){const i=this.selectedParcel;if(!i)return this.notify("warn","请先在左侧选择一宗宗海");try{this.begin("直线切割宗海"),this._applySplit(i,G_({rings:i.rings},t,e))}catch(s){this.history.undoStack.pop(),this.notify("error",s.message)}}splitByPolyline(t,e){const i=this.selectedParcel;if(!i)return this.notify("warn","请先在左侧选择一宗宗海");try{const s=X_({rings:i.rings},t);this.begin(e),this._applySplit(i,s)}catch(s){this.history.undoStack.length&&this.history.undoStack.pop(),this.notify("error",s.message)}}splitAlongFairway(){this.splitByPolyline(this.baseData.fairway.centerline,"沿航道切割宗海")}splitAlongCoastline(){this.splitByPolyline(this.baseData.coastline,"沿岸线切割宗海")}_applySplit(t,e){t.rings=e[0].rings;const i=[];for(const s of e.slice(1)){const r=Lh(),a={id:r,applicant:t.applicant,seaType:t.seaType,elevation:t.elevation,status:"待分派",rings:s.rings};this.parcels.push(a),i.push(a),this.jobs.push({jobId:`GD-2026-${2e3+this.jobs.length}`,parcelId:r,applicant:a.applicant,receivedAt:wn(),stage:"待分派",assignee:null,qcResult:null,reworkCount:0,qcSubmits:0,history:[{at:wn(),action:`由 ${t.id} 切割新增`,by:"系统"}]})}this.notify("ok",`切割完成：保留 ${t.id}，新增 ${i.length} 宗（${i.map(s=>s.id).join("、")}）`)}subtractAnchorage(t){const e=this.selectedParcel;if(!e)return this.notify("warn","请先选择要扣减的宗海");const i=this.baseData.anchorages.find(s=>s.id===t);if(i)try{this.begin(`扣减锚地 ${i.name}`);const s=Dh({rings:e.rings},i.ring);if(!s)return this.history.undoStack.pop(),this.notify("warn",`${i.name}未完全落在 ${e.id} 轮廓内，请改用「直线/沿航道切割」先分割再处理`);e.rings=s.rings,this.notify("ok",`已在 ${e.id} 上扣除 ${i.name}，形成孔洞`)}catch(s){this.history.undoStack.pop(),this.notify("error",s.message)}}subtractFairway(){const t=this.selectedParcel;if(!t)return this.notify("warn","请先选择要扣减的宗海");try{const e=jd(this.baseData.fairway.centerline,this.baseData.fairway.width/2),i=t.rings[0],s=z_(e,qu(i));if(s.length<3||ui(s)<1)return this.notify("warn","航道与该宗海无重叠区域");if(s.some(o=>la(i).some(([l,c])=>Sr(o,l,c).dist<.05)))return this.notify("warn","航道贯穿该宗海边界，扣减会使其断开，请改用「沿航道切割」");this.begin("扣除航道形成孔洞");const a=Dh({rings:t.rings},s);if(!a)return this.notify("error","航道缓冲带不在轮廓内，无法扣减");t.rings=a.rings,this.notify("ok",`已扣除航道段，孔洞面积 ${ui(s).toFixed(2)} m²`)}catch(e){this.history.undoStack.length&&this.history.undoStack.pop(),this.notify("error",e.message)}}registerJob(t){const e=Lh(),i=this.parcels.at(-1),s=i?Xu([{rings:i.rings}]):{maxX:0,minY:0},r=(s.maxX??0)+200,a=s.minY??200,o={id:e,applicant:t.applicant,seaType:t.seaType,elevation:Number(t.elevation)||10,status:"待分派",rings:[[{x:r,y:a},{x:r+500,y:a},{x:r+500,y:a+400},{x:r,y:a+400}]]};this.begin("前台接单登记"),this.parcels.push(o);const l={jobId:`GD-2026-${1e3+this.jobs.length+1}`,parcelId:e,applicant:t.applicant,receivedAt:wn(),stage:"待分派",assignee:null,qcResult:null,reworkCount:0,qcSubmits:0,history:[{at:wn(),action:"前台接单登记",by:"前台"}]};return this.jobs.push(l),this.selectedParcelId=e,this.notify("ok",`接单成功：宗海 ${e}，工单 ${l.jobId}`),l}_jobOf(t){return this.jobs.find(e=>e.parcelId===t)}assignJob(t,e){const i=this.jobs.find(r=>r.jobId===t);if(!i)return;const s=this.baseData.surveyors.find(r=>r.id===e);i.assignee=e,i.stage="调查中",i.history.push({at:wn(),action:`分派给 ${(s==null?void 0:s.name)??e}`,by:"调度员"}),this._syncParcel(i.parcelId,i.stage)}submitQc(t){var i;const e=this.jobs.find(s=>s.jobId===t);if(e){if(this.hasBlockingIssue(e.parcelId)){this.notify("error",`宗海 ${e.parcelId} 存在自相交边界，系统阻止提交质检`);return}e.stage="待质检",e.qcSubmits=(e.qcSubmits??0)+1,e.history.push({at:wn(),action:"提交质检抽查",by:((i=this.baseData.surveyors.find(s=>s.id===e.assignee))==null?void 0:i.name)??"承办人"}),this._syncParcel(e.parcelId,e.stage)}}qcPass(t){const e=this.jobs.find(i=>i.jobId===t);e&&(e.stage="质检合格",e.qcResult={pass:!0,at:wn(),by:"质检员"},e.history.push({at:wn(),action:"质检抽查合格",by:"质检员"}),this._syncParcel(e.parcelId,e.stage))}qcReject(t,e){const i=this.jobs.find(s=>s.jobId===t);i&&(i.stage="不合格打回",i.reworkCount+=1,i.qcResult={pass:!1,at:wn(),reason:e,by:"质检员"},i.history.push({at:wn(),action:`质检不合格打回：${e||"未填写原因"}`,by:"质检员"}),this._syncParcel(i.parcelId,i.stage))}reworkResubmit(t){const e=this.jobs.find(i=>i.jobId===t);if(e){if(this.hasBlockingIssue(e.parcelId)){this.notify("error",`宗海 ${e.parcelId} 仍存在自相交边界，请先修正再提交`);return}e.stage="待质检",e.qcSubmits=(e.qcSubmits??0)+1,e.history.push({at:wn(),action:"返工后重新提交质检",by:"承办人"}),this._syncParcel(e.parcelId,e.stage)}}_syncParcel(t,e){const i=this.parcels.find(s=>s.id===t);i&&(i.status=e)}get dashboard(){return P(H(this,Ga))}set dashboard(t){Zt(H(this,Ga),t)}closureReport(){return this.parcels.map(t=>{const e=$d(t.rings[0]);return{id:t.id,applicant:t.applicant,...e,exceed:e.area>1}})}}Ca=new WeakMap,Pa=new WeakMap,Da=new WeakMap,La=new WeakMap,Ia=new WeakMap,Ua=new WeakMap,Na=new WeakMap,Fa=new WeakMap,Oa=new WeakMap,Ba=new WeakMap,ka=new WeakMap,za=new WeakMap,Ha=new WeakMap,Va=new WeakMap,Ga=new WeakMap;function wn(){const n=new Date,t=e=>String(e).padStart(2,"0");return`${n.getFullYear()}-${t(n.getMonth()+1)}-${t(n.getDate())} ${t(n.getHours())}:${t(n.getMinutes())}`}const st=new tg,Nc=5e3,gn=1e3/Nc;function Jd(n,t,e){const i=new Blob([t],{type:`${e};charset=utf-8`}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=n,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}function eg(n,t,e){return n.map((i,s)=>`${s===0?"M":"L"}${((i.x-t)*gn).toFixed(3)},${((e-i.y)*gn).toFixed(3)}`).join(" ")+" Z"}function ng(n,t){const e=n.map(d=>({rings:d.rings})),i=Xu(e),s=120,r=i.minX-s,a=i.maxY+s,o=(i.w+s*2)*gn,l=(i.h+s*2)*gn,c=new Set(t),u=n.map(d=>{const w=hl(d.seaType),M=d.rings.map((D,T)=>{const y=eg(D,r,a);return T===0?`<path d="${y}" fill="${w}" fill-opacity="0.28" stroke="${c.has(d.id)?"#d12b2b":"#143a5c"}" stroke-width="0.35" stroke-linejoin="round"/>`:`<path d="${y}" fill="#ffffff" fill-opacity="0.85" stroke="#7a3b1d" stroke-width="0.3" stroke-dasharray="1.2,0.8"/>`}).join(`
      `),x=d.rings.map((D,T)=>D.map((y,R)=>{const j=((y.x-r)*gn).toFixed(3),k=((a-y.y)*gn).toFixed(3),Z=T===0?`J${R+1}`:`K${T}-${R+1}`;return`<g><circle cx="${j}" cy="${k}" r="0.7" fill="#143a5c"/><text x="${Number(j)+1.1}" y="${Number(k)-1.1}" font-size="2.4" fill="#143a5c" font-family="SimSun, serif">${Z}</text></g>`}).join(`
      `)).join(`
      `),I=Di(d.rings[0]),C=((I.x-r)*gn).toFixed(3),A=((a-I.y)*gn).toFixed(3);return`    <g id="${d.id}">
      ${M}
      ${x}
      <text x="${C}" y="${A}" text-anchor="middle" font-size="3" font-weight="bold" fill="#0d253f" font-family="SimHei, sans-serif">${d.id} ${ul(d.seaType)}</text>
      <text x="${C}" y="${Number(A)+4}" text-anchor="middle" font-size="2.4" fill="#0d253f" font-family="SimSun, serif">${Dr({rings:d.rings}).toFixed(2)} m²</text>
    </g>`}).join(`
`),h=Zd.map((d,w)=>`${w===0?"M":"L"}${((d.x-r)*gn).toFixed(3)},${((a-d.y)*gn).toFixed(3)}`).join(" "),p=Ic.centerline.map((d,w)=>`${w===0?"M":"L"}${((d.x-r)*gn).toFixed(3)},${((a-d.y)*gn).toFixed(3)}`).join(" "),f=Ic.width*gn,_=new Date,g=`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}-${String(_.getDate()).padStart(2,"0")}`,m=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${o.toFixed(1)}mm" height="${(l+18).toFixed(1)}mm" viewBox="0 0 ${o.toFixed(2)} ${(l+18).toFixed(2)}">
  <rect x="0" y="0" width="${o.toFixed(2)}" height="${(l+18).toFixed(2)}" fill="#f4f8fb"/>
  <g id="basemap">
    <path d="${h}" fill="none" stroke="#6b5a3a" stroke-width="0.5"/>
    <path d="${p}" fill="none" stroke="#2f6fb0" stroke-width="${f.toFixed(2)}" stroke-opacity="0.12"/>
    <path d="${p}" fill="none" stroke="#2f6fb0" stroke-width="0.3" stroke-dasharray="2,1.2"/>
  </g>
  <g id="parcels">
${u}
  </g>
  <g id="title-block" font-family="SimSun, serif" fill="#0d253f">
    <rect x="2" y="${(l+2).toFixed(2)}" width="${(o-4).toFixed(2)}" height="14" fill="none" stroke="#0d253f" stroke-width="0.3"/>
    <text x="4" y="${(l+7).toFixed(2)}" font-size="3.6" font-weight="bold" font-family="SimHei, sans-serif">海域使用权宗海图（1:${Nc}）</text>
    <text x="4" y="${(l+12.5).toFixed(2)}" font-size="2.6">制图单位：县自然资源和规划局　　制图日期：${g}　　红色轮廓为面积闭合差超 1 m² 的宗海（共 ${c.size} 宗）</text>
    <text x="${(o-6).toFixed(2)}" y="${(l+12.5).toFixed(2)}" text-anchor="end" font-size="2.6">坐标单位：m　面积单位：m²</text>
  </g>
</svg>`;return Jd(`宗海图_1比${Nc}_${g}.svg`,m,"image/svg+xml"),c.size}function ig(n){const t=[["宗海编号","点号","X坐标(m)","Y坐标(m)","所属环","备注"]];for(const r of n)r.rings.forEach((a,o)=>{a.forEach((l,c)=>{const u=o===0?`J${c+1}`:`K${o}-${c+1}`;t.push([r.id,u,l.x.toFixed(3),l.y.toFixed(3),o===0?"外轮廓":`孔洞${o}`,o===0&&c===0?"起始界址点":""])})}),t.push([r.id,"—",`净面积 ${Dr({rings:r.rings}).toFixed(3)} m²`,`外轮廓周长 ${Wu(r.rings[0]).toFixed(3)} m`,"",ul(r.seaType)]);const e="\uFEFF"+t.map(r=>r.map(a=>`"${String(a).replace(/"/g,'""')}"`).join(",")).join(`\r
`),i=new Date,s=`${i.getFullYear()}${String(i.getMonth()+1).padStart(2,"0")}${String(i.getDate()).padStart(2,"0")}`;Jd(`界址点坐标表_${s}.csv`,e,"text/csv")}var Ih=Vt('<button><span class="ic svelte-1dqac8y"> </span> </button>'),sg=Vt('<em class="pill svelte-1dqac8y"> </em>'),rg=Vt('<span class="bad svelte-1dqac8y">⚠ 超 1 m²，单独列出</span>'),ag=Vt('<span class="ok svelte-1dqac8y">合格</span>'),og=Vt('<tr><td class="svelte-1dqac8y"> </td><td class="svelte-1dqac8y"> </td><td class="svelte-1dqac8y"> </td><td class="svelte-1dqac8y"> </td><td class="svelte-1dqac8y"><!></td></tr>'),lg=Vt(`<div class="modal-mask svelte-1dqac8y"><div class="modal svelte-1dqac8y"><h3 class="svelte-1dqac8y">导出前检查：面积闭合差（阈值 1 m²）</h3> <p class="sub svelte-1dqac8y"> <strong> </strong> 宗。
        超差宗海将在 SVG 中以红色轮廓单独标出，坐标表仍包含全部界址点。</p> <div class="table-wrap svelte-1dqac8y"><table class="svelte-1dqac8y"><thead><tr><th class="svelte-1dqac8y">宗海编号</th><th class="svelte-1dqac8y">申请人</th><th class="svelte-1dqac8y">线性闭合差(m)</th><th class="svelte-1dqac8y">面积闭合差(m²)</th><th class="svelte-1dqac8y">结论</th></tr></thead><tbody></tbody></table></div> <div class="modal-actions svelte-1dqac8y"><button class="btn-ghost svelte-1dqac8y">取消</button> <button class="btn-primary svelte-1dqac8y">确认导出 SVG 与坐标表</button></div></div></div>`),cg=Vt('<header class="toolbar svelte-1dqac8y"><div class="brand svelte-1dqac8y"><span class="logo svelte-1dqac8y">海</span> <div><strong class="svelte-1dqac8y">宗海图矢量编辑与出图系统</strong> <small class="svelte-1dqac8y">县自然资源和规划局 · 用海审核平台</small></div></div> <div class="group svelte-1dqac8y"><!> <button class="tool svelte-1dqac8y" title="框选至少两宗相邻宗海"><span class="ic svelte-1dqac8y">⊕</span>合并框选宗海 <!></button></div> <div class="group svelte-1dqac8y"></div> <div class="group svelte-1dqac8y"><button class="tool svelte-1dqac8y"><span class="ic svelte-1dqac8y">↶</span>撤销 <em class="pill svelte-1dqac8y"> </em></button> <button class="tool svelte-1dqac8y"><span class="ic svelte-1dqac8y">↷</span>重做 <em class="pill svelte-1dqac8y"> </em></button> <label class="snap-switch svelte-1dqac8y"><input type="checkbox"/> </label></div> <div class="group svelte-1dqac8y"><button class="tool export svelte-1dqac8y"><span class="ic svelte-1dqac8y">⤓</span>出图 1:5000（SVG+坐标表）</button></div></header> <!>',1);function ug(n,t){Ni(t,!0);let e=_e(!1),i=_e(En([])),s=_e(0);const r=[{key:"select",label:"选择/节点编辑",icon:"✥"},{key:"box",label:"框选宗海",icon:"⬚"}],a=[{key:"split-line",label:"直线切割",icon:"✂"},{key:"split-coast",label:"沿岸线切割",icon:"〰"},{key:"split-fairway",label:"沿航道切割",icon:"⇄"},{key:"subtract-anchorage",label:"扣锚地(孔洞)",icon:"◔"},{key:"subtract-fairway",label:"扣航道(孔洞)",icon:"⊝"}];let o=_e(En({undo:0,redo:0,undoLabel:"",redoLabel:""}));ku(()=>{ns(()=>{st.parcels,Zt(o,{undo:st.history.sizes().undo,redo:st.history.sizes().redo,undoLabel:st.history.undoLabel(),redoLabel:st.history.redoLabel()},!0)})});function l(){st.mergeSelected()}function c(){Zt(i,st.closureReport(),!0),Zt(s,P(i).filter(z=>z.exceed).length,!0),Zt(e,!0)}function u(){const z=P(i).filter(L=>L.exceed).map(L=>L.id);ng(st.parcels,z),ig(st.parcels),st.notify("ok","已导出 1:5000 SVG 宗海图与界址点坐标表 CSV"),Zt(e,!1)}var h=cg(),p=aa(h),f=tt(pt(p),2),_=pt(f);Xe(_,17,()=>r,z=>z.key,(z,L)=>{var et=Ih();let ot;var ht=pt(et),yt=Ut(ht,!0),St=tt(ht,1,!0);ue(()=>{ot=Oe(et,1,"tool svelte-1dqac8y",null,ot,{active:st.tool===P(L).key}),er(et,"title",P(L).label),Rt(yt,P(L).icon),Rt(St,P(L).label)}),jt("click",et,()=>st.setTool(P(L).key)),kt(z,et)});var g=tt(_,2),m=tt(pt(g),2);{var d=z=>{var L=sg(),et=Ut(L,!0);ue(()=>Rt(et,st.boxSelectedIds.length)),kt(z,L)};Fe(m,z=>{st.boxSelectedIds.length&&z(d)})}var w=tt(f,2);Xe(w,21,()=>a,z=>z.key,(z,L)=>{var et=Ih();let ot;var ht=pt(et),yt=Ut(ht,!0),St=tt(ht,1,!0);ue(W=>{ot=Oe(et,1,"tool svelte-1dqac8y",null,ot,{active:st.tool===P(L).key,danger:W}),er(et,"title",P(L).label),Rt(yt,P(L).icon),Rt(St,P(L).label)},[()=>P(L).key.startsWith("subtract")]),jt("click",et,()=>st.setTool(P(L).key===st.tool?"select":P(L).key)),kt(z,et)});var M=tt(w,2),x=pt(M),I=tt(pt(x),2),C=Ut(I),A=tt(x,2),D=tt(pt(A),2),T=Ut(D,!0),y=tt(A,2),R=pt(y),j=tt(R),k=tt(M,2),Z=Ut(k),K=tt(p,2);{var $=z=>{var L=lg(),et=pt(L),ot=tt(pt(et),2),ht=pt(ot),yt=tt(ht);let St;var W=Ut(yt,!0),ct=tt(ot,2),xt=pt(ct),mt=tt(pt(xt));Xe(mt,21,()=>P(i),Dt=>Dt.id,(Dt,Ot)=>{var Bt=og();let S;var ft=pt(Bt),N=Ut(ft,!0),X=tt(ft),U=Ut(X,!0),J=tt(X),q=Ut(J,!0),E=tt(J),v=Ut(E,!0),F=tt(E),Y=pt(F);{var nt=dt=>{var lt=rg();kt(dt,lt)},Q=dt=>{var lt=ag();kt(dt,lt)};Fe(Y,dt=>{P(Ot).exceed?dt(nt):dt(Q,-1)})}ue((dt,lt)=>{S=Oe(Bt,1,"svelte-1dqac8y",null,S,{badrow:P(Ot).exceed}),Rt(N,P(Ot).id),Rt(U,P(Ot).applicant),Rt(q,dt),Rt(v,lt)},[()=>P(Ot).linear.toFixed(3),()=>P(Ot).area.toFixed(3)]),kt(Dt,Bt)});var Pt=tt(ct,2),Xt=pt(Pt),It=tt(Xt,2);ue(()=>{Rt(ht,`共 ${P(i).length??""} 宗，超差 `),St=Oe(yt,1,"svelte-1dqac8y",null,St,{bad:P(s)>0}),Rt(W,P(s))}),jt("click",L,()=>Zt(e,!1)),jt("click",et,Dt=>Dt.stopPropagation()),jt("click",Xt,()=>Zt(e,!1)),jt("click",It,u),kt(z,L)};Fe(K,z=>{P(e)&&z($)})}ue(()=>{g.disabled=st.boxSelectedIds.length<2,x.disabled=!P(o).undo,er(x,"title",`撤销 ${P(o).undoLabel}（Ctrl+Z）`),Rt(C,`${P(o).undo??""}/${F_}`),A.disabled=!P(o).redo,er(A,"title",`重做 ${P(o).redoLabel}（Ctrl+Y）`),Rt(T,P(o).redo),Rt(j,` 吸附 ${st.snapEnabled?"开":"关"}`)}),jt("click",g,l),jt("click",x,()=>st.undo()),jt("click",A,()=>st.redo()),Cc(R,()=>st.snapEnabled,z=>st.snapEnabled=z),jt("click",Z,c),kt(n,h),Fi()}Pr(["click"]);var pn=L_(()=>st),hg=Vt('<label class="layer-row svelte-19xjd2c"><input type="checkbox"/> <span> </span></label>'),fg=Vt('<span class="err-tag svelte-19xjd2c">⚠ 自相交</span>'),dg=Vt('<button><span class="dot svelte-19xjd2c"></span> <span class="pi-main svelte-19xjd2c"><strong> </strong> <small class="svelte-19xjd2c"> </small> <small class="applicant svelte-19xjd2c"> </small></span> <span class="badge svelte-19xjd2c"> </span> <!></button>'),pg=Vt('<div class="legend-item svelte-19xjd2c"><span class="dot svelte-19xjd2c"></span> <span> </span></div>'),mg=Vt('<aside class="left-panel svelte-19xjd2c"><section class="card svelte-19xjd2c"><h3 class="svelte-19xjd2c">图层控制</h3> <!> <label class="layer-row snap svelte-19xjd2c"><input type="checkbox"/> <span> </span></label></section> <section class="card grow svelte-19xjd2c"><h3 class="svelte-19xjd2c">宗海列表 <span class="count svelte-19xjd2c"> </span></h3> <div class="parcel-list svelte-19xjd2c"></div></section> <section class="card svelte-19xjd2c"><h3 class="svelte-19xjd2c">用海类型图例</h3> <div class="legend-grid svelte-19xjd2c"></div></section></aside>');function _g(n,t){Ni(t,!1);const e=[{key:"parcels",label:"宗海图层"},{key:"vertices",label:"界址点图层"},{key:"seaTypes",label:"用海类型着色"},{key:"coastline",label:"海岸线底图"},{key:"fairway",label:"航道底图"},{key:"aquaculture",label:"养殖区底图"},{key:"anchorages",label:"锚地底图"}],i={待分派:"#8a6d3b",调查中:"#1565c0",待质检:"#e65100",质检合格:"#2e7d32",不合格打回:"#c62828",已合并:"#707a85"};Wd();var s=mg(),r=pt(s),a=tt(pt(r),2);Xe(a,1,()=>e,w=>w.key,(w,M)=>{var x=hg(),I=pt(x),C=tt(I,2),A=Ut(C,!0);ue(()=>Rt(A,P(M).label)),Cc(I,()=>pn().layers[P(M).key],D=>pn(pn().layers[P(M).key]=D)),kt(w,x)});var o=tt(a,2),l=pt(o),c=tt(l,2),u=Ut(c),h=tt(r,2),p=pt(h),f=tt(pt(p)),_=Ut(f),g=tt(p,2);Xe(g,5,()=>pn().parcels,w=>w.id,(w,M)=>{const x=na(()=>pn().issuesOf(P(M).id)),I=na(()=>P(x).some(ht=>ht.type==="自相交"||ht.type==="顶点不足")),C=na(()=>pn().boxSelectedIds.includes(P(M).id));var A=dg();let D;var T=pt(A),y=tt(T,2),R=pt(y),j=Ut(R,!0),k=tt(R,2),Z=Ut(k),K=tt(k,2),$=Ut(K,!0),z=tt(y,2),L=Ut(z,!0),et=tt(z,2);{var ot=ht=>{var yt=fg();ue(St=>er(yt,"title",St),[()=>P(x).map(St=>St.detail).join("；")]),kt(ht,yt)};Fe(et,ht=>{P(I)&&ht(ot)})}ue((ht,yt,St)=>{D=Oe(A,1,"parcel-item svelte-19xjd2c",null,D,{selected:P(M).id===pn().selectedParcelId,boxed:P(C)}),oa(T,ht),Rt(j,P(M).id),Rt(Z,`${yt??""} · ${St??""} m²`),Rt($,P(M).applicant),oa(z,`color:${i[P(M).status]??"#555"};border-color:${i[P(M).status]??"#999"}`),Rt(L,P(M).status)},[()=>`background:${hl(P(M).seaType)}`,()=>ul(P(M).seaType),()=>Dr({rings:P(M).rings}).toFixed(1)]),jt("click",A,()=>pn().selectParcel(P(M).id)),kt(w,A)});var m=tt(h,2),d=tt(pt(m),2);Xe(d,5,()=>Ps,w=>w.code,(w,M)=>{var x=pg(),I=pt(x),C=tt(I,2),A=Ut(C,!0);ue(()=>{oa(I,`background:${P(M).color}`),Rt(A,P(M).name)}),kt(w,x)}),ue(()=>{Rt(u,`节点吸附（${pn().snapTolPx??""}px）`),Rt(_,`${pn().parcels.length??""} 宗`)}),Cc(l,()=>pn().snapEnabled,w=>pn(pn().snapEnabled=w)),kt(n,s),Fi()}Pr(["click"]);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yu="175",ar={ROTATE:0,DOLLY:1,PAN:2},nr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},gg=0,Uh=1,vg=2,Qd=1,xg=2,Si=3,ss=0,un=1,Ti=2,Ji=0,or=1,Nh=2,Fh=3,Oh=4,yg=5,_s=100,Sg=101,Mg=102,Eg=103,bg=104,Tg=200,wg=201,Ag=202,Rg=203,Fc=204,Oc=205,Cg=206,Pg=207,Dg=208,Lg=209,Ig=210,Ug=211,Ng=212,Fg=213,Og=214,Bc=0,kc=1,zc=2,Mr=3,Hc=4,Vc=5,Gc=6,Wc=7,tp=0,Bg=1,kg=2,Qi=0,zg=1,Hg=2,Vg=3,Gg=4,Wg=5,Xg=6,qg=7,ep=300,Er=301,br=302,Xc=303,qc=304,fl=306,Yc=1e3,Ss=1001,$c=1002,Yn=1003,Yg=1004,eo=1005,ai=1006,Pl=1007,Ms=1008,Ui=1009,np=1010,ip=1011,va=1012,$u=1013,Ds=1014,Ri=1015,Za=1016,ju=1017,Zu=1018,xa=1020,sp=35902,rp=1021,ap=1022,Xn=1023,op=1024,lp=1025,ya=1026,Sa=1027,cp=1028,Ku=1029,up=1030,Ju=1031,Qu=1033,Bo=33776,ko=33777,zo=33778,Ho=33779,jc=35840,Zc=35841,Kc=35842,Jc=35843,Qc=36196,tu=37492,eu=37496,nu=37808,iu=37809,su=37810,ru=37811,au=37812,ou=37813,lu=37814,cu=37815,uu=37816,hu=37817,fu=37818,du=37819,pu=37820,mu=37821,Vo=36492,_u=36494,gu=36495,hp=36283,vu=36284,xu=36285,yu=36286,$g=3200,jg=3201,fp=0,Zg=1,qi="",Ln="srgb",Tr="srgb-linear",Ko="linear",ye="srgb",zs=7680,Bh=519,Kg=512,Jg=513,Qg=514,dp=515,tv=516,ev=517,nv=518,iv=519,kh=35044,zh="300 es",Ci=2e3,Jo=2001;class Os{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const $e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ca=Math.PI/180,Su=180/Math.PI;function Lr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]).toLowerCase()}function se(n,t,e){return Math.max(t,Math.min(e,n))}function sv(n,t){return(n%t+t)%t}function Dl(n,t,e){return(1-e)*n+e*t}function zr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function on(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const rv={DEG2RAD:ca};class Mt{constructor(t=0,e=0){Mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ne{constructor(t,e,i,s,r,a,o,l,c){ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],p=i[2],f=i[5],_=i[8],g=s[0],m=s[3],d=s[6],w=s[1],M=s[4],x=s[7],I=s[2],C=s[5],A=s[8];return r[0]=a*g+o*w+l*I,r[3]=a*m+o*M+l*C,r[6]=a*d+o*x+l*A,r[1]=c*g+u*w+h*I,r[4]=c*m+u*M+h*C,r[7]=c*d+u*x+h*A,r[2]=p*g+f*w+_*I,r[5]=p*m+f*M+_*C,r[8]=p*d+f*x+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,p=o*l-u*r,f=c*r-a*l,_=e*h+i*p+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=h*g,t[1]=(s*c-u*i)*g,t[2]=(o*i-s*a)*g,t[3]=p*g,t[4]=(u*e-s*l)*g,t[5]=(s*r-o*e)*g,t[6]=f*g,t[7]=(i*l-c*e)*g,t[8]=(a*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ll.makeScale(t,e)),this}rotate(t){return this.premultiply(Ll.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ll.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ll=new ne;function pp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Qo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function av(){const n=Qo("canvas");return n.style.display="block",n}const Hh={};function Go(n){n in Hh||(Hh[n]=!0,console.warn(n))}function ov(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function lv(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function cv(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Vh=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gh=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uv(){const n={enabled:!0,workingColorSpace:Tr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ye&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ye&&(s.r=lr(s.r),s.g=lr(s.g),s.b=lr(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===qi?Ko:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Tr]:{primaries:t,whitePoint:i,transfer:Ko,toXYZ:Vh,fromXYZ:Gh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ln},outputColorSpaceConfig:{drawingBufferColorSpace:Ln}},[Ln]:{primaries:t,whitePoint:i,transfer:ye,toXYZ:Vh,fromXYZ:Gh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ln}}}),n}const me=uv();function Li(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function lr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Hs;class hv{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Hs===void 0&&(Hs=Qo("canvas")),Hs.width=t.width,Hs.height=t.height;const s=Hs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Hs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Qo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Li(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Li(e[i]/255)*255):e[i]=Li(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let fv=0;class th{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fv++}),this.uuid=Lr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Il(s[a].image)):r.push(Il(s[a]))}else r=Il(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Il(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?hv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dv=0;class hn extends Os{constructor(t=hn.DEFAULT_IMAGE,e=hn.DEFAULT_MAPPING,i=Ss,s=Ss,r=ai,a=Ms,o=Xn,l=Ui,c=hn.DEFAULT_ANISOTROPY,u=qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dv++}),this.uuid=Lr(),this.name="",this.source=new th(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ep)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yc:t.x=t.x-Math.floor(t.x);break;case Ss:t.x=t.x<0?0:1;break;case $c:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yc:t.y=t.y-Math.floor(t.y);break;case Ss:t.y=t.y<0?0:1;break;case $c:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=ep;hn.DEFAULT_ANISOTROPY=1;class Pe{constructor(t=0,e=0,i=0,s=1){Pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],p=l[1],f=l[5],_=l[9],g=l[2],m=l[6],d=l[10];if(Math.abs(u-p)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(f+1)/2,I=(d+1)/2,C=(u+p)/4,A=(h+g)/4,D=(_+m)/4;return M>x&&M>I?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=C/i,r=A/i):x>I?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=C/s,r=D/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=A/r,s=D/r),this.set(i,s,r,e),this}let w=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(p-u)*(p-u));return Math.abs(w)<.001&&(w=1),this.x=(m-_)/w,this.y=(h-g)/w,this.z=(p-u)/w,this.w=Math.acos((c+f+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this.w=se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this.w=se(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pv extends Os{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Pe(0,0,t,e),this.scissorTest=!1,this.viewport=new Pe(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new hn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new th(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ls extends pv{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class mp extends hn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Yn,this.minFilter=Yn,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class mv extends hn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Yn,this.minFilter=Yn,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Is{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const p=r[a+0],f=r[a+1],_=r[a+2],g=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=p,t[e+1]=f,t[e+2]=_,t[e+3]=g;return}if(h!==g||l!==p||c!==f||u!==_){let m=1-o;const d=l*p+c*f+u*_+h*g,w=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const I=Math.sqrt(M),C=Math.atan2(I,d*w);m=Math.sin(m*C)/I,o=Math.sin(o*C)/I}const x=o*w;if(l=l*m+p*x,c=c*m+f*x,u=u*m+_*x,h=h*m+g*x,m===1-o){const I=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=I,c*=I,u*=I,h*=I}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[a],p=r[a+1],f=r[a+2],_=r[a+3];return t[e]=o*_+u*h+l*f-c*p,t[e+1]=l*_+u*p+c*h-o*f,t[e+2]=c*_+u*f+o*p-l*h,t[e+3]=u*_-o*h-l*p-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),h=o(r/2),p=l(i/2),f=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=p*u*h+c*f*_,this._y=c*f*h-p*u*_,this._z=c*u*_+p*f*h,this._w=c*u*h-p*f*_;break;case"YXZ":this._x=p*u*h+c*f*_,this._y=c*f*h-p*u*_,this._z=c*u*_-p*f*h,this._w=c*u*h+p*f*_;break;case"ZXY":this._x=p*u*h-c*f*_,this._y=c*f*h+p*u*_,this._z=c*u*_+p*f*h,this._w=c*u*h-p*f*_;break;case"ZYX":this._x=p*u*h-c*f*_,this._y=c*f*h+p*u*_,this._z=c*u*_-p*f*h,this._w=c*u*h+p*f*_;break;case"YZX":this._x=p*u*h+c*f*_,this._y=c*f*h+p*u*_,this._z=c*u*_-p*f*h,this._w=c*u*h-p*f*_;break;case"XZY":this._x=p*u*h-c*f*_,this._y=c*f*h-p*u*_,this._z=c*u*_+p*f*h,this._w=c*u*h+p*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],p=i+o+h;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(se(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-e)*u)/c,p=Math.sin(e*u)/c;return this._w=a*h+this._w*p,this._x=i*h+this._x*p,this._y=s*h+this._y*p,this._z=r*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,e=0,i=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*e-r*s),h=2*(r*i-a*e);return this.x=e+l*c+a*h-o*u,this.y=i+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ul.copy(this).projectOnVector(t),this.sub(Ul)}reflect(t){return this.sub(Ul.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ul=new O,Wh=new Is;class Ir{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,On):On.fromBufferAttribute(r,a),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),no.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),no.copy(i.boundingBox)),no.applyMatrix4(t.matrixWorld),this.union(no)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hr),io.subVectors(this.max,Hr),Vs.subVectors(t.a,Hr),Gs.subVectors(t.b,Hr),Ws.subVectors(t.c,Hr),Bi.subVectors(Gs,Vs),ki.subVectors(Ws,Gs),ls.subVectors(Vs,Ws);let e=[0,-Bi.z,Bi.y,0,-ki.z,ki.y,0,-ls.z,ls.y,Bi.z,0,-Bi.x,ki.z,0,-ki.x,ls.z,0,-ls.x,-Bi.y,Bi.x,0,-ki.y,ki.x,0,-ls.y,ls.x,0];return!Nl(e,Vs,Gs,Ws,io)||(e=[1,0,0,0,1,0,0,0,1],!Nl(e,Vs,Gs,Ws,io))?!1:(so.crossVectors(Bi,ki),e=[so.x,so.y,so.z],Nl(e,Vs,Gs,Ws,io))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const _i=[new O,new O,new O,new O,new O,new O,new O,new O],On=new O,no=new Ir,Vs=new O,Gs=new O,Ws=new O,Bi=new O,ki=new O,ls=new O,Hr=new O,io=new O,so=new O,cs=new O;function Nl(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){cs.fromArray(n,r);const o=s.x*Math.abs(cs.x)+s.y*Math.abs(cs.y)+s.z*Math.abs(cs.z),l=t.dot(cs),c=e.dot(cs),u=i.dot(cs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const _v=new Ir,Vr=new O,Fl=new O;class dl{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):_v.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vr.subVectors(t,this.center);const e=Vr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Vr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vr.copy(t.center).add(Fl)),this.expandByPoint(Vr.copy(t.center).sub(Fl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gi=new O,Ol=new O,ro=new O,zi=new O,Bl=new O,ao=new O,kl=new O;class pl{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=gi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gi.copy(this.origin).addScaledVector(this.direction,e),gi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Ol.copy(t).add(e).multiplyScalar(.5),ro.copy(e).sub(t).normalize(),zi.copy(this.origin).sub(Ol);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ro),o=zi.dot(this.direction),l=-zi.dot(ro),c=zi.lengthSq(),u=Math.abs(1-a*a);let h,p,f,_;if(u>0)if(h=a*l-o,p=a*o-l,_=r*u,h>=0)if(p>=-_)if(p<=_){const g=1/u;h*=g,p*=g,f=h*(h+a*p+2*o)+p*(a*h+p+2*l)+c}else p=r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;else p=-r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;else p<=-_?(h=Math.max(0,-(-a*r+o)),p=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+p*(p+2*l)+c):p<=_?(h=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+c):(h=Math.max(0,-(a*r+o)),p=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+p*(p+2*l)+c);else p=a>0?-r:r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ol).addScaledVector(ro,p),f}intersectSphere(t,e){gi.subVectors(t.center,this.origin);const i=gi.dot(this.direction),s=gi.dot(gi)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return c>=0?(i=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(i=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),u>=0?(r=(t.min.y-p.y)*u,a=(t.max.y-p.y)*u):(r=(t.max.y-p.y)*u,a=(t.min.y-p.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-p.z)*h,l=(t.max.z-p.z)*h):(o=(t.max.z-p.z)*h,l=(t.min.z-p.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,gi)!==null}intersectTriangle(t,e,i,s,r){Bl.subVectors(e,t),ao.subVectors(i,t),kl.crossVectors(Bl,ao);let a=this.direction.dot(kl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;zi.subVectors(this.origin,t);const l=o*this.direction.dot(ao.crossVectors(zi,ao));if(l<0)return null;const c=o*this.direction.dot(Bl.cross(zi));if(c<0||l+c>a)return null;const u=-o*zi.dot(kl);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Te{constructor(t,e,i,s,r,a,o,l,c,u,h,p,f,_,g,m){Te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,u,h,p,f,_,g,m)}set(t,e,i,s,r,a,o,l,c,u,h,p,f,_,g,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=p,d[3]=f,d[7]=_,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Te().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Xs.setFromMatrixColumn(t,0).length(),r=1/Xs.setFromMatrixColumn(t,1).length(),a=1/Xs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const p=a*u,f=a*h,_=o*u,g=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=f+_*c,e[5]=p-g*c,e[9]=-o*l,e[2]=g-p*c,e[6]=_+f*c,e[10]=a*l}else if(t.order==="YXZ"){const p=l*u,f=l*h,_=c*u,g=c*h;e[0]=p+g*o,e[4]=_*o-f,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-_,e[6]=g+p*o,e[10]=a*l}else if(t.order==="ZXY"){const p=l*u,f=l*h,_=c*u,g=c*h;e[0]=p-g*o,e[4]=-a*h,e[8]=_+f*o,e[1]=f+_*o,e[5]=a*u,e[9]=g-p*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const p=a*u,f=a*h,_=o*u,g=o*h;e[0]=l*u,e[4]=_*c-f,e[8]=p*c+g,e[1]=l*h,e[5]=g*c+p,e[9]=f*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const p=a*l,f=a*c,_=o*l,g=o*c;e[0]=l*u,e[4]=g-p*h,e[8]=_*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=f*h+_,e[10]=p-g*h}else if(t.order==="XZY"){const p=a*l,f=a*c,_=o*l,g=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=p*h+g,e[5]=a*u,e[9]=f*h-_,e[2]=_*h-f,e[6]=o*u,e[10]=g*h+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gv,t,vv)}lookAt(t,e,i){const s=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Hi.crossVectors(i,mn),Hi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Hi.crossVectors(i,mn)),Hi.normalize(),oo.crossVectors(mn,Hi),s[0]=Hi.x,s[4]=oo.x,s[8]=mn.x,s[1]=Hi.y,s[5]=oo.y,s[9]=mn.y,s[2]=Hi.z,s[6]=oo.z,s[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],p=i[9],f=i[13],_=i[2],g=i[6],m=i[10],d=i[14],w=i[3],M=i[7],x=i[11],I=i[15],C=s[0],A=s[4],D=s[8],T=s[12],y=s[1],R=s[5],j=s[9],k=s[13],Z=s[2],K=s[6],$=s[10],z=s[14],L=s[3],et=s[7],ot=s[11],ht=s[15];return r[0]=a*C+o*y+l*Z+c*L,r[4]=a*A+o*R+l*K+c*et,r[8]=a*D+o*j+l*$+c*ot,r[12]=a*T+o*k+l*z+c*ht,r[1]=u*C+h*y+p*Z+f*L,r[5]=u*A+h*R+p*K+f*et,r[9]=u*D+h*j+p*$+f*ot,r[13]=u*T+h*k+p*z+f*ht,r[2]=_*C+g*y+m*Z+d*L,r[6]=_*A+g*R+m*K+d*et,r[10]=_*D+g*j+m*$+d*ot,r[14]=_*T+g*k+m*z+d*ht,r[3]=w*C+M*y+x*Z+I*L,r[7]=w*A+M*R+x*K+I*et,r[11]=w*D+M*j+x*$+I*ot,r[15]=w*T+M*k+x*z+I*ht,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],p=t[10],f=t[14],_=t[3],g=t[7],m=t[11],d=t[15];return _*(+r*l*h-s*c*h-r*o*p+i*c*p+s*o*f-i*l*f)+g*(+e*l*f-e*c*p+r*a*p-s*a*f+s*c*u-r*l*u)+m*(+e*c*h-e*o*f-r*a*h+i*a*f+r*o*u-i*c*u)+d*(-s*o*u-e*l*h+e*o*p+s*a*h-i*a*p+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],p=t[10],f=t[11],_=t[12],g=t[13],m=t[14],d=t[15],w=h*m*c-g*p*c+g*l*f-o*m*f-h*l*d+o*p*d,M=_*p*c-u*m*c-_*l*f+a*m*f+u*l*d-a*p*d,x=u*g*c-_*h*c+_*o*f-a*g*f-u*o*d+a*h*d,I=_*h*l-u*g*l-_*o*p+a*g*p+u*o*m-a*h*m,C=e*w+i*M+s*x+r*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=w*A,t[1]=(g*p*r-h*m*r-g*s*f+i*m*f+h*s*d-i*p*d)*A,t[2]=(o*m*r-g*l*r+g*s*c-i*m*c-o*s*d+i*l*d)*A,t[3]=(h*l*r-o*p*r-h*s*c+i*p*c+o*s*f-i*l*f)*A,t[4]=M*A,t[5]=(u*m*r-_*p*r+_*s*f-e*m*f-u*s*d+e*p*d)*A,t[6]=(_*l*r-a*m*r-_*s*c+e*m*c+a*s*d-e*l*d)*A,t[7]=(a*p*r-u*l*r+u*s*c-e*p*c-a*s*f+e*l*f)*A,t[8]=x*A,t[9]=(_*h*r-u*g*r-_*i*f+e*g*f+u*i*d-e*h*d)*A,t[10]=(a*g*r-_*o*r+_*i*c-e*g*c-a*i*d+e*o*d)*A,t[11]=(u*o*r-a*h*r-u*i*c+e*h*c+a*i*f-e*o*f)*A,t[12]=I*A,t[13]=(u*g*s-_*h*s+_*i*p-e*g*p-u*i*m+e*h*m)*A,t[14]=(_*o*s-a*g*s-_*i*l+e*g*l+a*i*m-e*o*m)*A,t[15]=(a*h*s-u*o*s+u*i*l-e*h*l-a*i*p+e*o*p)*A,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,h=o+o,p=r*c,f=r*u,_=r*h,g=a*u,m=a*h,d=o*h,w=l*c,M=l*u,x=l*h,I=i.x,C=i.y,A=i.z;return s[0]=(1-(g+d))*I,s[1]=(f+x)*I,s[2]=(_-M)*I,s[3]=0,s[4]=(f-x)*C,s[5]=(1-(p+d))*C,s[6]=(m+w)*C,s[7]=0,s[8]=(_+M)*A,s[9]=(m-w)*A,s[10]=(1-(p+g))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Xs.set(s[0],s[1],s[2]).length();const a=Xs.set(s[4],s[5],s[6]).length(),o=Xs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Bn.copy(this);const c=1/r,u=1/a,h=1/o;return Bn.elements[0]*=c,Bn.elements[1]*=c,Bn.elements[2]*=c,Bn.elements[4]*=u,Bn.elements[5]*=u,Bn.elements[6]*=u,Bn.elements[8]*=h,Bn.elements[9]*=h,Bn.elements[10]*=h,e.setFromRotationMatrix(Bn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=Ci){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),h=(e+t)/(e-t),p=(i+s)/(i-s);let f,_;if(o===Ci)f=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Jo)f=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Ci){const l=this.elements,c=1/(e-t),u=1/(i-s),h=1/(a-r),p=(e+t)*c,f=(i+s)*u;let _,g;if(o===Ci)_=(a+r)*h,g=-2*h;else if(o===Jo)_=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Xs=new O,Bn=new Te,gv=new O(0,0,0),vv=new O(1,1,1),Hi=new O,oo=new O,mn=new O,Xh=new Te,qh=new Is;class di{constructor(t=0,e=0,i=0,s=di.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],p=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-se(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(se(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-se(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Xh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return qh.setFromEuler(this),this.setFromQuaternion(qh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}di.DEFAULT_ORDER="XYZ";class eh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xv=0;const Yh=new O,qs=new Is,vi=new Te,lo=new O,Gr=new O,yv=new O,Sv=new Is,$h=new O(1,0,0),jh=new O(0,1,0),Zh=new O(0,0,1),Kh={type:"added"},Mv={type:"removed"},Ys={type:"childadded",child:null},zl={type:"childremoved",child:null};class qe extends Os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xv++}),this.uuid=Lr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qe.DEFAULT_UP.clone();const t=new O,e=new di,i=new Is,s=new O(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Te},normalMatrix:{value:new ne}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qs.setFromAxisAngle(t,e),this.quaternion.multiply(qs),this}rotateOnWorldAxis(t,e){return qs.setFromAxisAngle(t,e),this.quaternion.premultiply(qs),this}rotateX(t){return this.rotateOnAxis($h,t)}rotateY(t){return this.rotateOnAxis(jh,t)}rotateZ(t){return this.rotateOnAxis(Zh,t)}translateOnAxis(t,e){return Yh.copy(t).applyQuaternion(this.quaternion),this.position.add(Yh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($h,t)}translateY(t){return this.translateOnAxis(jh,t)}translateZ(t){return this.translateOnAxis(Zh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?lo.copy(t):lo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(Gr,lo,this.up):vi.lookAt(lo,Gr,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),qs.setFromRotationMatrix(vi),this.quaternion.premultiply(qs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Kh),Ys.child=t,this.dispatchEvent(Ys),Ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Mv),zl.child=t,this.dispatchEvent(zl),zl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vi.multiply(t.parent.matrixWorld)),t.applyMatrix4(vi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Kh),Ys.child=t,this.dispatchEvent(Ys),Ys.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,t,yv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,Sv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),p=a(t.skeletons),f=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),p.length>0&&(i.skeletons=p),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}qe.DEFAULT_UP=new O(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kn=new O,xi=new O,Hl=new O,yi=new O,$s=new O,js=new O,Jh=new O,Vl=new O,Gl=new O,Wl=new O,Xl=new Pe,ql=new Pe,Yl=new Pe;class In{constructor(t=new O,e=new O,i=new O){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),kn.subVectors(t,e),s.cross(kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){kn.subVectors(s,e),xi.subVectors(i,e),Hl.subVectors(t,e);const a=kn.dot(kn),o=kn.dot(xi),l=kn.dot(Hl),c=xi.dot(xi),u=xi.dot(Hl),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const p=1/h,f=(c*l-o*u)*p,_=(a*u-o*l)*p;return r.set(1-f-_,_,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yi.x),l.addScaledVector(a,yi.y),l.addScaledVector(o,yi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Xl.setScalar(0),ql.setScalar(0),Yl.setScalar(0),Xl.fromBufferAttribute(t,e),ql.fromBufferAttribute(t,i),Yl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Xl,r.x),a.addScaledVector(ql,r.y),a.addScaledVector(Yl,r.z),a}static isFrontFacing(t,e,i,s){return kn.subVectors(i,e),xi.subVectors(t,e),kn.cross(xi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),kn.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return In.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return In.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return In.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return In.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return In.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;$s.subVectors(s,i),js.subVectors(r,i),Vl.subVectors(t,i);const l=$s.dot(Vl),c=js.dot(Vl);if(l<=0&&c<=0)return e.copy(i);Gl.subVectors(t,s);const u=$s.dot(Gl),h=js.dot(Gl);if(u>=0&&h<=u)return e.copy(s);const p=l*h-u*c;if(p<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector($s,a);Wl.subVectors(t,r);const f=$s.dot(Wl),_=js.dot(Wl);if(_>=0&&f<=_)return e.copy(r);const g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(i).addScaledVector(js,o);const m=u*_-f*h;if(m<=0&&h-u>=0&&f-_>=0)return Jh.subVectors(r,s),o=(h-u)/(h-u+(f-_)),e.copy(s).addScaledVector(Jh,o);const d=1/(m+g+p);return a=g*d,o=p*d,e.copy(i).addScaledVector($s,a).addScaledVector(js,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},co={h:0,s:0,l:0};function $l(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class le{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,me.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=me.workingColorSpace){return this.r=t,this.g=e,this.b=i,me.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=me.workingColorSpace){if(t=sv(t,1),e=se(e,0,1),i=se(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=$l(a,r,t+1/3),this.g=$l(a,r,t),this.b=$l(a,r,t-1/3)}return me.toWorkingColorSpace(this,s),this}setStyle(t,e=Ln){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ln){const i=_p[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Li(t.r),this.g=Li(t.g),this.b=Li(t.b),this}copyLinearToSRGB(t){return this.r=lr(t.r),this.g=lr(t.g),this.b=lr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ln){return me.fromWorkingColorSpace(je.copy(this),t),Math.round(se(je.r*255,0,255))*65536+Math.round(se(je.g*255,0,255))*256+Math.round(se(je.b*255,0,255))}getHexString(t=Ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=me.workingColorSpace){me.fromWorkingColorSpace(je.copy(this),e);const i=je.r,s=je.g,r=je.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=me.workingColorSpace){return me.fromWorkingColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=Ln){me.fromWorkingColorSpace(je.copy(this),t);const e=je.r,i=je.g,s=je.b;return t!==Ln?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Vi),this.setHSL(Vi.h+t,Vi.s+e,Vi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Vi),t.getHSL(co);const i=Dl(Vi.h,co.h,e),s=Dl(Vi.s,co.s,e),r=Dl(Vi.l,co.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const je=new le;le.NAMES=_p;let Ev=0;class Ur extends Os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ev++}),this.uuid=Lr(),this.name="",this.type="Material",this.blending=or,this.side=ss,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fc,this.blendDst=Oc,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new le(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zs,this.stencilZFail=zs,this.stencilZPass=zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==or&&(i.blending=this.blending),this.side!==ss&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Fc&&(i.blendSrc=this.blendSrc),this.blendDst!==Oc&&(i.blendDst=this.blendDst),this.blendEquation!==_s&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class gp extends Ur{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=tp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ie=new O,uo=new Mt;let bv=0;class hi{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bv++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=kh,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)uo.fromBufferAttribute(this,e),uo.applyMatrix3(t),this.setXY(e,uo.x,uo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=zr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=on(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=zr(e,this.array)),e}setX(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=zr(e,this.array)),e}setY(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=zr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=zr(e,this.array)),e}setW(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),i=on(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),i=on(i,this.array),s=on(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),i=on(i,this.array),s=on(s,this.array),r=on(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==kh&&(t.usage=this.usage),t}}class vp extends hi{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class xp extends hi{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class fn extends hi{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Tv=0;const An=new Te,jl=new qe,Zs=new O,_n=new Ir,Wr=new Ir,Ve=new O;class Kn extends Os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=Lr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pp(t)?xp:vp)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ne().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return An.makeRotationFromQuaternion(t),this.applyMatrix4(An),this}rotateX(t){return An.makeRotationX(t),this.applyMatrix4(An),this}rotateY(t){return An.makeRotationY(t),this.applyMatrix4(An),this}rotateZ(t){return An.makeRotationZ(t),this.applyMatrix4(An),this}translate(t,e,i){return An.makeTranslation(t,e,i),this.applyMatrix4(An),this}scale(t,e,i){return An.makeScale(t,e,i),this.applyMatrix4(An),this}lookAt(t){return jl.lookAt(t),jl.updateMatrix(),this.applyMatrix4(jl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new fn(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ir);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Wr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ve.addVectors(_n.min,Wr.min),_n.expandByPoint(Ve),Ve.addVectors(_n.max,Wr.max),_n.expandByPoint(Ve)):(_n.expandByPoint(Wr.min),_n.expandByPoint(Wr.max))}_n.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ve.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ve));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ve.fromBufferAttribute(o,c),l&&(Zs.fromBufferAttribute(t,c),Ve.add(Zs)),s=Math.max(s,i.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hi(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new O,l[D]=new O;const c=new O,u=new O,h=new O,p=new Mt,f=new Mt,_=new Mt,g=new O,m=new O;function d(D,T,y){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,y),p.fromBufferAttribute(r,D),f.fromBufferAttribute(r,T),_.fromBufferAttribute(r,y),u.sub(c),h.sub(c),f.sub(p),_.sub(p);const R=1/(f.x*_.y-_.x*f.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-f.y).multiplyScalar(R),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(R),o[D].add(g),o[T].add(g),o[y].add(g),l[D].add(m),l[T].add(m),l[y].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let D=0,T=w.length;D<T;++D){const y=w[D],R=y.start,j=y.count;for(let k=R,Z=R+j;k<Z;k+=3)d(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const M=new O,x=new O,I=new O,C=new O;function A(D){I.fromBufferAttribute(s,D),C.copy(I);const T=o[D];M.copy(T),M.sub(I.multiplyScalar(I.dot(T))).normalize(),x.crossVectors(C,T);const R=x.dot(l[D])<0?-1:1;a.setXYZW(D,M.x,M.y,M.z,R)}for(let D=0,T=w.length;D<T;++D){const y=w[D],R=y.start,j=y.count;for(let k=R,Z=R+j;k<Z;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hi(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let p=0,f=i.count;p<f;p++)i.setXYZ(p,0,0,0);const s=new O,r=new O,a=new O,o=new O,l=new O,c=new O,u=new O,h=new O;if(t)for(let p=0,f=t.count;p<f;p+=3){const _=t.getX(p+0),g=t.getX(p+1),m=t.getX(p+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,f=e.count;p<f;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),i.setXYZ(p+0,u.x,u.y,u.z),i.setXYZ(p+1,u.x,u.y,u.z),i.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,h=o.normalized,p=new c.constructor(l.length*u);let f=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*u;for(let d=0;d<u;d++)p[_++]=c[f++]}return new hi(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Kn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const p=c[u],f=t(p,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,p=c.length;h<p;h++){const f=c[h];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let p=0,f=h.length;p<f;p++)u.push(h[p].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qh=new Te,us=new pl,ho=new dl,tf=new O,fo=new O,po=new O,mo=new O,Zl=new O,_o=new O,ef=new O,go=new O;class oi extends qe{constructor(t=new Kn,e=new gp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){_o.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(Zl.fromBufferAttribute(h,t),a?_o.addScaledVector(Zl,u):_o.addScaledVector(Zl.sub(e),u))}e.add(_o)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ho.copy(i.boundingSphere),ho.applyMatrix4(r),us.copy(t.ray).recast(t.near),!(ho.containsPoint(us.origin)===!1&&(us.intersectSphere(ho,tf)===null||us.origin.distanceToSquared(tf)>(t.far-t.near)**2))&&(Qh.copy(r).invert(),us.copy(t.ray).applyMatrix4(Qh),!(i.boundingBox!==null&&us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,us)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,p=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=p.length;_<g;_++){const m=p[_],d=a[m.materialIndex],w=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,I=M;x<I;x+=3){const C=o.getX(x),A=o.getX(x+1),D=o.getX(x+2);s=vo(this,d,t,i,c,u,h,C,A,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=_,d=g;m<d;m+=3){const w=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);s=vo(this,a,t,i,c,u,h,w,M,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=p.length;_<g;_++){const m=p[_],d=a[m.materialIndex],w=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,I=M;x<I;x+=3){const C=x,A=x+1,D=x+2;s=vo(this,d,t,i,c,u,h,C,A,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=_,d=g;m<d;m+=3){const w=m,M=m+1,x=m+2;s=vo(this,a,t,i,c,u,h,w,M,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function wv(n,t,e,i,s,r,a,o){let l;if(t.side===un?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===ss,o),l===null)return null;go.copy(o),go.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(go);return c<e.near||c>e.far?null:{distance:c,point:go.clone(),object:n}}function vo(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,fo),n.getVertexPosition(l,po),n.getVertexPosition(c,mo);const u=wv(n,t,e,i,fo,po,mo,ef);if(u){const h=new O;In.getBarycoord(ef,fo,po,mo,h),s&&(u.uv=In.getInterpolatedAttribute(s,o,l,c,h,new Mt)),r&&(u.uv1=In.getInterpolatedAttribute(r,o,l,c,h,new Mt)),a&&(u.normal=In.getInterpolatedAttribute(a,o,l,c,h,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:l,c,normal:new O,materialIndex:0};In.getNormal(fo,po,mo,p.normal),u.face=p,u.barycoord=h}return u}class Ka extends Kn{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let p=0,f=0;_("z","y","x",-1,-1,i,e,t,a,r,0),_("z","y","x",1,-1,i,e,-t,a,r,1),_("x","z","y",1,1,t,i,e,s,a,2),_("x","z","y",1,-1,t,i,-e,s,a,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new fn(c,3)),this.setAttribute("normal",new fn(u,3)),this.setAttribute("uv",new fn(h,2));function _(g,m,d,w,M,x,I,C,A,D,T){const y=x/A,R=I/D,j=x/2,k=I/2,Z=C/2,K=A+1,$=D+1;let z=0,L=0;const et=new O;for(let ot=0;ot<$;ot++){const ht=ot*R-k;for(let yt=0;yt<K;yt++){const St=yt*y-j;et[g]=St*w,et[m]=ht*M,et[d]=Z,c.push(et.x,et.y,et.z),et[g]=0,et[m]=0,et[d]=C>0?1:-1,u.push(et.x,et.y,et.z),h.push(yt/A),h.push(1-ot/D),z+=1}}for(let ot=0;ot<D;ot++)for(let ht=0;ht<A;ht++){const yt=p+ht+K*ot,St=p+ht+K*(ot+1),W=p+(ht+1)+K*(ot+1),ct=p+(ht+1)+K*ot;l.push(yt,St,ct),l.push(St,W,ct),L+=6}o.addGroup(f,L,T),f+=L,p+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ka(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function wr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function tn(n){const t={};for(let e=0;e<n.length;e++){const i=wr(n[e]);for(const s in i)t[s]=i[s]}return t}function Av(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function yp(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:me.workingColorSpace}const Rv={clone:wr,merge:tn};var Cv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class rs extends Ur{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cv,this.fragmentShader=Pv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wr(t.uniforms),this.uniformsGroups=Av(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Sp extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=Ci}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new O,nf=new Mt,sf=new Mt;class Vn extends Sp{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Su*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ca*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Su*2*Math.atan(Math.tan(ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z)}getViewSize(t,e){return this.getViewBounds(t,nf,sf),e.subVectors(sf,nf)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ca*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ks=-90,Js=1;class Dv extends qe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vn(Ks,Js,t,e);s.layers=this.layers,this.add(s);const r=new Vn(Ks,Js,t,e);r.layers=this.layers,this.add(r);const a=new Vn(Ks,Js,t,e);a.layers=this.layers,this.add(a);const o=new Vn(Ks,Js,t,e);o.layers=this.layers,this.add(o);const l=new Vn(Ks,Js,t,e);l.layers=this.layers,this.add(l);const c=new Vn(Ks,Js,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Jo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=t.getRenderTarget(),p=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(h,p,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Mp extends hn{constructor(t=[],e=Er,i,s,r,a,o,l,c,u){super(t,e,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Lv extends Ls{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Mp(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ai}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ka(5,5,5),r=new rs({name:"CubemapFromEquirect",uniforms:wr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:Ji});r.uniforms.tEquirect.value=e;const a=new oi(s,r),o=e.minFilter;return e.minFilter===Ms&&(e.minFilter=ai),new Dv(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}class Jr extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Iv={type:"move"};class Kl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,i),d=this._getHandJoint(c,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],p=u.position.distanceTo(h.position),f=.02,_=.005;c.inputState.pinching&&p>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Iv)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Jr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Uv extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Jl=new O,Nv=new O,Fv=new ne;class Xi{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Jl.subVectors(i,e).cross(Nv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Jl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Fv.getNormalMatrix(t),s=this.coplanarPoint(Jl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hs=new dl,xo=new O;class nh{constructor(t=new Xi,e=new Xi,i=new Xi,s=new Xi,r=new Xi,a=new Xi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ci){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],h=s[6],p=s[7],f=s[8],_=s[9],g=s[10],m=s[11],d=s[12],w=s[13],M=s[14],x=s[15];if(i[0].setComponents(l-r,p-c,m-f,x-d).normalize(),i[1].setComponents(l+r,p+c,m+f,x+d).normalize(),i[2].setComponents(l+a,p+u,m+_,x+w).normalize(),i[3].setComponents(l-a,p-u,m-_,x-w).normalize(),i[4].setComponents(l-o,p-h,m-g,x-M).normalize(),e===Ci)i[5].setComponents(l+o,p+h,m+g,x+M).normalize();else if(e===Jo)i[5].setComponents(o,h,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hs)}intersectsSprite(t){return hs.center.set(0,0,0),hs.radius=.7071067811865476,hs.applyMatrix4(t.matrixWorld),this.intersectsSphere(hs)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(xo.x=s.normal.x>0?t.max.x:t.min.x,xo.y=s.normal.y>0?t.max.y:t.min.y,xo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(xo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ih extends Ur{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const tl=new O,el=new O,rf=new Te,Xr=new pl,yo=new dl,Ql=new O,af=new O;class Ov extends qe{constructor(t=new Kn,e=new ih){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)tl.fromBufferAttribute(e,s-1),el.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=tl.distanceTo(el);t.setAttribute("lineDistance",new fn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yo.copy(i.boundingSphere),yo.applyMatrix4(s),yo.radius+=r,t.ray.intersectsSphere(yo)===!1)return;rf.copy(s).invert(),Xr.copy(t.ray).applyMatrix4(rf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,p=i.attributes.position;if(u!==null){const f=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let g=f,m=_-1;g<m;g+=c){const d=u.getX(g),w=u.getX(g+1),M=So(this,t,Xr,l,d,w,g);M&&e.push(M)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(f),d=So(this,t,Xr,l,g,m,_-1);d&&e.push(d)}}else{const f=Math.max(0,a.start),_=Math.min(p.count,a.start+a.count);for(let g=f,m=_-1;g<m;g+=c){const d=So(this,t,Xr,l,g,g+1,g);d&&e.push(d)}if(this.isLineLoop){const g=So(this,t,Xr,l,_-1,f,_-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function So(n,t,e,i,s,r,a){const o=n.geometry.attributes.position;if(tl.fromBufferAttribute(o,s),el.fromBufferAttribute(o,r),e.distanceSqToSegment(tl,el,Ql,af)>i)return;Ql.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ql);if(!(c<t.near||c>t.far))return{distance:c,point:af.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const of=new O,lf=new O;class Ep extends Ov{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)of.fromBufferAttribute(e,s),lf.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+of.distanceTo(lf);t.setAttribute("lineDistance",new fn(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class bp extends hn{constructor(t,e,i=Ds,s,r,a,o=Yn,l=Yn,c,u=ya){if(u!==ya&&u!==Sa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new th(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class pi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);const u=i[s],p=i[s+1]-u,f=(a-u)/p;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new Mt:new O);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new O,s=[],r=[],a=[],o=new O,l=new Te;for(let f=0;f<=t;f++){const _=f/t;s[f]=this.getTangentAt(_,new O)}r[0]=new O,a[0]=new O;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),p=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),p<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(se(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,_))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(se(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let _=1;_<=t;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],f*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class sh extends pi{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Mt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*u-f*h+this.aX,c=p*h+f*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Bv extends sh{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function rh(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,h){let p=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+h)+(l-o)/h;p*=u,f*=u,s(a,o,p,f)},calc:function(r){const a=r*r,o=a*r;return n+t*r+e*a+i*o}}}const Mo=new O,tc=new rh,ec=new rh,nc=new rh;class kv extends pi{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new O){const i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(Mo.subVectors(s[0],s[1]).add(s[0]),c=Mo);const h=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Mo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Mo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(u),f);g<1e-4&&(g=1),_<1e-4&&(_=g),m<1e-4&&(m=g),tc.initNonuniformCatmullRom(c.x,h.x,p.x,u.x,_,g,m),ec.initNonuniformCatmullRom(c.y,h.y,p.y,u.y,_,g,m),nc.initNonuniformCatmullRom(c.z,h.z,p.z,u.z,_,g,m)}else this.curveType==="catmullrom"&&(tc.initCatmullRom(c.x,h.x,p.x,u.x,this.tension),ec.initCatmullRom(c.y,h.y,p.y,u.y,this.tension),nc.initCatmullRom(c.z,h.z,p.z,u.z,this.tension));return i.set(tc.calc(l),ec.calc(l),nc.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function cf(n,t,e,i,s){const r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function zv(n,t){const e=1-n;return e*e*t}function Hv(n,t){return 2*(1-n)*n*t}function Vv(n,t){return n*n*t}function ua(n,t,e,i){return zv(n,t)+Hv(n,e)+Vv(n,i)}function Gv(n,t){const e=1-n;return e*e*e*t}function Wv(n,t){const e=1-n;return 3*e*e*n*t}function Xv(n,t){return 3*(1-n)*n*n*t}function qv(n,t){return n*n*n*t}function ha(n,t,e,i,s){return Gv(n,t)+Wv(n,e)+Xv(n,i)+qv(n,s)}class Tp extends pi{constructor(t=new Mt,e=new Mt,i=new Mt,s=new Mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Mt){const i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ha(t,s.x,r.x,a.x,o.x),ha(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yv extends pi{constructor(t=new O,e=new O,i=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new O){const i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ha(t,s.x,r.x,a.x,o.x),ha(t,s.y,r.y,a.y,o.y),ha(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class wp extends pi{constructor(t=new Mt,e=new Mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Mt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $v extends pi{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ap extends pi{constructor(t=new Mt,e=new Mt,i=new Mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Mt){const i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(ua(t,s.x,r.x,a.x),ua(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jv extends pi{constructor(t=new O,e=new O,i=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new O){const i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(ua(t,s.x,r.x,a.x),ua(t,s.y,r.y,a.y),ua(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rp extends pi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Mt){const i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return i.set(cf(o,l.x,c.x,u.x,h.x),cf(o,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Mt().fromArray(s))}return this}}var Mu=Object.freeze({__proto__:null,ArcCurve:Bv,CatmullRomCurve3:kv,CubicBezierCurve:Tp,CubicBezierCurve3:Yv,EllipseCurve:sh,LineCurve:wp,LineCurve3:$v,QuadraticBezierCurve:Ap,QuadraticBezierCurve3:jv,SplineCurve:Rp});class Zv extends pi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mu[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new Mu[s.type]().fromJSON(s))}return this}}class Eu extends Zv{constructor(t){super(),this.type="Path",this.currentPoint=new Mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new wp(this.currentPoint.clone(),new Mt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new Ap(this.currentPoint.clone(),new Mt(t,e),new Mt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){const o=new Tp(this.currentPoint.clone(),new Mt(t,e),new Mt(i,s),new Mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Rp(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){const c=new sh(t,e,i,s,r,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}const Eo=new O,bo=new O,ic=new O,To=new In;class Kv extends Kn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ca*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),p={},f=[];for(let _=0;_<l;_+=3){a?(c[0]=a.getX(_),c[1]=a.getX(_+1),c[2]=a.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:g,b:m,c:d}=To;if(g.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),To.getNormal(ic),h[0]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let w=0;w<3;w++){const M=(w+1)%3,x=h[w],I=h[M],C=To[u[w]],A=To[u[M]],D=`${x}_${I}`,T=`${I}_${x}`;T in p&&p[T]?(ic.dot(p[T].normal)<=r&&(f.push(C.x,C.y,C.z),f.push(A.x,A.y,A.z)),p[T]=null):D in p||(p[D]={index0:c[w],index1:c[M],normal:ic.clone()})}}for(const _ in p)if(p[_]){const{index0:g,index1:m}=p[_];Eo.fromBufferAttribute(o,g),bo.fromBufferAttribute(o,m),f.push(Eo.x,Eo.y,Eo.z),f.push(bo.x,bo.y,bo.z)}this.setAttribute("position",new fn(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Cp extends Eu{constructor(t){super(t),this.uuid=Lr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Eu().fromJSON(s))}return this}}function Jv(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=Pp(n,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=i0(n,t,r,e)),n.length>80*e){o=1/0,l=1/0;let u=-1/0,h=-1/0;for(let p=e;p<s;p+=e){const f=n[p],_=n[p+1];f<o&&(o=f),_<l&&(l=_),f>u&&(u=f),_>h&&(h=_)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return Ma(r,a,e,o,l,c,0),a}function Pp(n,t,e,i,s){let r;if(s===p0(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=uf(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=uf(a/i|0,n[a],n[a+1],r);return r&&Ar(r,r.next)&&(ba(r),r=r.next),r}function Us(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Ar(e,e.next)||Ae(e.prev,e,e.next)===0)){if(ba(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Ma(n,t,e,i,s,r,a){if(!n)return;!a&&r&&l0(n,i,s,r);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(r?t0(n,i,s,r):Qv(n)){t.push(l.i,n.i,c.i),ba(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=e0(Us(n),t),Ma(n,t,e,i,s,r,2)):a===2&&n0(n,t,e,i,s,r):Ma(Us(n),t,e,i,s,r,1);break}}}function Qv(n){const t=n.prev,e=n,i=n.next;if(Ae(t,e,i)>=0)return!1;const s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,u=Math.min(s,r,a),h=Math.min(o,l,c),p=Math.max(s,r,a),f=Math.max(o,l,c);let _=i.next;for(;_!==t;){if(_.x>=u&&_.x<=p&&_.y>=h&&_.y<=f&&Qr(s,o,r,l,a,c,_.x,_.y)&&Ae(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function t0(n,t,e,i){const s=n.prev,r=n,a=n.next;if(Ae(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,u=s.y,h=r.y,p=a.y,f=Math.min(o,l,c),_=Math.min(u,h,p),g=Math.max(o,l,c),m=Math.max(u,h,p),d=bu(f,_,t,e,i),w=bu(g,m,t,e,i);let M=n.prevZ,x=n.nextZ;for(;M&&M.z>=d&&x&&x.z<=w;){if(M.x>=f&&M.x<=g&&M.y>=_&&M.y<=m&&M!==s&&M!==a&&Qr(o,u,l,h,c,p,M.x,M.y)&&Ae(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=f&&x.x<=g&&x.y>=_&&x.y<=m&&x!==s&&x!==a&&Qr(o,u,l,h,c,p,x.x,x.y)&&Ae(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=d;){if(M.x>=f&&M.x<=g&&M.y>=_&&M.y<=m&&M!==s&&M!==a&&Qr(o,u,l,h,c,p,M.x,M.y)&&Ae(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=w;){if(x.x>=f&&x.x<=g&&x.y>=_&&x.y<=m&&x!==s&&x!==a&&Qr(o,u,l,h,c,p,x.x,x.y)&&Ae(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function e0(n,t){let e=n;do{const i=e.prev,s=e.next.next;!Ar(i,s)&&Lp(i,e,e.next,s)&&Ea(i,s)&&Ea(s,i)&&(t.push(i.i,e.i,s.i),ba(e),ba(e.next),e=n=s),e=e.next}while(e!==n);return Us(e)}function n0(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&h0(a,o)){let l=Ip(a,o);a=Us(a,a.next),l=Us(l,l.next),Ma(a,t,e,i,s,r,0),Ma(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function i0(n,t,e,i){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=Pp(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(u0(c))}s.sort(s0);for(let r=0;r<s.length;r++)e=r0(s[r],e);return e}function s0(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function r0(n,t){const e=a0(n,t);if(!e)return t;const i=Ip(e,n);return Us(i,i.next),Us(e,e.next)}function a0(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,a;if(Ar(n,e))return e;do{if(Ar(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>r&&(r=h,a=e.x<e.next.x?e:e.next,h===i))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Dp(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){const h=Math.abs(s-e.y)/(i-e.x);Ea(e,n)&&(h<u||h===u&&(e.x>a.x||e.x===a.x&&o0(a,e)))&&(a=e,u=h)}e=e.next}while(e!==o);return a}function o0(n,t){return Ae(n.prev,n,t.prev)<0&&Ae(t.next,n,n.next)<0}function l0(n,t,e,i){let s=n;do s.z===0&&(s.z=bu(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,c0(s)}function c0(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function bu(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function u0(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Dp(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Qr(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&Dp(n,t,e,i,s,r,a,o)}function h0(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!f0(n,t)&&(Ea(n,t)&&Ea(t,n)&&d0(n,t)&&(Ae(n.prev,n,t.prev)||Ae(n,t.prev,t))||Ar(n,t)&&Ae(n.prev,n,n.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Ar(n,t){return n.x===t.x&&n.y===t.y}function Lp(n,t,e,i){const s=Ao(Ae(n,t,e)),r=Ao(Ae(n,t,i)),a=Ao(Ae(e,i,n)),o=Ao(Ae(e,i,t));return!!(s!==r&&a!==o||s===0&&wo(n,e,t)||r===0&&wo(n,i,t)||a===0&&wo(e,n,i)||o===0&&wo(e,t,i))}function wo(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Ao(n){return n>0?1:n<0?-1:0}function f0(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Lp(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ea(n,t){return Ae(n.prev,n,n.next)<0?Ae(n,t,n.next)>=0&&Ae(n,n.prev,t)>=0:Ae(n,t,n.prev)<0||Ae(n,n.next,t)<0}function d0(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Ip(n,t){const e=Tu(n.i,n.x,n.y),i=Tu(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function uf(n,t,e,i){const s=Tu(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ba(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Tu(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function p0(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class m0{static triangulate(t,e,i=2){return Jv(t,e,i)}}class fa{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return fa.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];hf(t),ff(i,t);let a=t.length;e.forEach(hf);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,ff(i,e[l]);const o=m0.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function hf(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function ff(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class ah extends Kn{constructor(t=new Cp([new Mt(.5,.5),new Mt(-.5,.5),new Mt(-.5,-.5),new Mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new fn(s,3)),this.setAttribute("uv",new fn(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let p=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:f-.1,g=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const d=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:_0;let M,x=!1,I,C,A,D;d&&(M=d.getSpacedPoints(u),x=!0,p=!1,I=d.computeFrenetFrames(u,!1),C=new O,A=new O,D=new O),p||(m=0,f=0,_=0,g=0);const T=o.extractPoints(c);let y=T.shape;const R=T.holes;if(!fa.isClockWise(y)){y=y.reverse();for(let N=0,X=R.length;N<X;N++){const U=R[N];fa.isClockWise(U)&&(R[N]=U.reverse())}}function k(N){const U=10000000000000001e-36;let J=N[0];for(let q=1;q<=N.length;q++){const E=q%N.length,v=N[E],F=v.x-J.x,Y=v.y-J.y,nt=F*F+Y*Y,Q=Math.max(Math.abs(v.x),Math.abs(v.y),Math.abs(J.x),Math.abs(J.y)),dt=U*Q*Q;if(nt<=dt){N.splice(E,1),q--;continue}J=v}}k(y),R.forEach(k);const Z=R.length,K=y;for(let N=0;N<Z;N++){const X=R[N];y=y.concat(X)}function $(N,X,U){return X||console.error("THREE.ExtrudeGeometry: vec does not exist"),N.clone().addScaledVector(X,U)}const z=y.length;function L(N,X,U){let J,q,E;const v=N.x-X.x,F=N.y-X.y,Y=U.x-N.x,nt=U.y-N.y,Q=v*v+F*F,dt=v*nt-F*Y;if(Math.abs(dt)>Number.EPSILON){const lt=Math.sqrt(Q),_t=Math.sqrt(Y*Y+nt*nt),zt=X.x-F/lt,gt=X.y+v/lt,Tt=U.x-nt/_t,Gt=U.y+Y/_t,$t=((Tt-zt)*nt-(Gt-gt)*Y)/(v*nt-F*Y);J=zt+v*$t-N.x,q=gt+F*$t-N.y;const Lt=J*J+q*q;if(Lt<=2)return new Mt(J,q);E=Math.sqrt(Lt/2)}else{let lt=!1;v>Number.EPSILON?Y>Number.EPSILON&&(lt=!0):v<-Number.EPSILON?Y<-Number.EPSILON&&(lt=!0):Math.sign(F)===Math.sign(nt)&&(lt=!0),lt?(J=-F,q=v,E=Math.sqrt(Q)):(J=v,q=F,E=Math.sqrt(Q/2))}return new Mt(J/E,q/E)}const et=[];for(let N=0,X=K.length,U=X-1,J=N+1;N<X;N++,U++,J++)U===X&&(U=0),J===X&&(J=0),et[N]=L(K[N],K[U],K[J]);const ot=[];let ht,yt=et.concat();for(let N=0,X=Z;N<X;N++){const U=R[N];ht=[];for(let J=0,q=U.length,E=q-1,v=J+1;J<q;J++,E++,v++)E===q&&(E=0),v===q&&(v=0),ht[J]=L(U[J],U[E],U[v]);ot.push(ht),yt=yt.concat(ht)}const St=[],W=[];for(let N=0;N<m;N++){const X=N/m,U=f*Math.cos(X*Math.PI/2),J=_*Math.sin(X*Math.PI/2)+g;for(let q=0,E=K.length;q<E;q++){const v=$(K[q],et[q],J);Dt(v.x,v.y,-U),X==0&&St.push(v)}for(let q=0,E=Z;q<E;q++){const v=R[q];ht=ot[q];const F=[];for(let Y=0,nt=v.length;Y<nt;Y++){const Q=$(v[Y],ht[Y],J);Dt(Q.x,Q.y,-U),X==0&&F.push(Q)}X==0&&W.push(F)}}const ct=fa.triangulateShape(St,W),xt=ct.length,mt=_+g;for(let N=0;N<z;N++){const X=p?$(y[N],yt[N],mt):y[N];x?(A.copy(I.normals[0]).multiplyScalar(X.x),C.copy(I.binormals[0]).multiplyScalar(X.y),D.copy(M[0]).add(A).add(C),Dt(D.x,D.y,D.z)):Dt(X.x,X.y,0)}for(let N=1;N<=u;N++)for(let X=0;X<z;X++){const U=p?$(y[X],yt[X],mt):y[X];x?(A.copy(I.normals[N]).multiplyScalar(U.x),C.copy(I.binormals[N]).multiplyScalar(U.y),D.copy(M[N]).add(A).add(C),Dt(D.x,D.y,D.z)):Dt(U.x,U.y,h/u*N)}for(let N=m-1;N>=0;N--){const X=N/m,U=f*Math.cos(X*Math.PI/2),J=_*Math.sin(X*Math.PI/2)+g;for(let q=0,E=K.length;q<E;q++){const v=$(K[q],et[q],J);Dt(v.x,v.y,h+U)}for(let q=0,E=R.length;q<E;q++){const v=R[q];ht=ot[q];for(let F=0,Y=v.length;F<Y;F++){const nt=$(v[F],ht[F],J);x?Dt(nt.x,nt.y+M[u-1].y,M[u-1].x+U):Dt(nt.x,nt.y,h+U)}}}Pt(),Xt();function Pt(){const N=s.length/3;if(p){let X=0,U=z*X;for(let J=0;J<xt;J++){const q=ct[J];Ot(q[2]+U,q[1]+U,q[0]+U)}X=u+m*2,U=z*X;for(let J=0;J<xt;J++){const q=ct[J];Ot(q[0]+U,q[1]+U,q[2]+U)}}else{for(let X=0;X<xt;X++){const U=ct[X];Ot(U[2],U[1],U[0])}for(let X=0;X<xt;X++){const U=ct[X];Ot(U[0]+z*u,U[1]+z*u,U[2]+z*u)}}i.addGroup(N,s.length/3-N,0)}function Xt(){const N=s.length/3;let X=0;It(K,X),X+=K.length;for(let U=0,J=R.length;U<J;U++){const q=R[U];It(q,X),X+=q.length}i.addGroup(N,s.length/3-N,1)}function It(N,X){let U=N.length;for(;--U>=0;){const J=U;let q=U-1;q<0&&(q=N.length-1);for(let E=0,v=u+m*2;E<v;E++){const F=z*E,Y=z*(E+1),nt=X+J+F,Q=X+q+F,dt=X+q+Y,lt=X+J+Y;Bt(nt,Q,dt,lt)}}}function Dt(N,X,U){l.push(N),l.push(X),l.push(U)}function Ot(N,X,U){S(N),S(X),S(U);const J=s.length/3,q=w.generateTopUV(i,s,J-3,J-2,J-1);ft(q[0]),ft(q[1]),ft(q[2])}function Bt(N,X,U,J){S(N),S(X),S(J),S(X),S(U),S(J);const q=s.length/3,E=w.generateSideWallUV(i,s,q-6,q-3,q-2,q-1);ft(E[0]),ft(E[1]),ft(E[3]),ft(E[1]),ft(E[2]),ft(E[3])}function S(N){s.push(l[N*3+0]),s.push(l[N*3+1]),s.push(l[N*3+2])}function ft(N){r.push(N.x),r.push(N.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return g0(e,i,t)}static fromJSON(t,e){const i=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];i.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Mu[s.type]().fromJSON(s)),new ah(i,t.options)}}const _0={generateTopUV:function(n,t,e,i,s){const r=t[e*3],a=t[e*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],u=t[s*3+1];return[new Mt(r,a),new Mt(o,l),new Mt(c,u)]},generateSideWallUV:function(n,t,e,i,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[i*3],u=t[i*3+1],h=t[i*3+2],p=t[s*3],f=t[s*3+1],_=t[s*3+2],g=t[r*3],m=t[r*3+1],d=t[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new Mt(a,1-l),new Mt(c,1-h),new Mt(p,1-_),new Mt(g,1-d)]:[new Mt(o,1-l),new Mt(u,1-h),new Mt(f,1-_),new Mt(m,1-d)]}};function g0(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ml extends Kn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,h=t/o,p=e/l,f=[],_=[],g=[],m=[];for(let d=0;d<u;d++){const w=d*p-a;for(let M=0;M<c;M++){const x=M*h-r;_.push(x,-w,0),g.push(0,0,1),m.push(M/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let w=0;w<o;w++){const M=w+c*d,x=w+c*(d+1),I=w+1+c*(d+1),C=w+1+c*d;f.push(M,x,C),f.push(x,I,C)}this.setIndex(f),this.setAttribute("position",new fn(_,3)),this.setAttribute("normal",new fn(g,3)),this.setAttribute("uv",new fn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ml(t.width,t.height,t.widthSegments,t.heightSegments)}}class v0 extends Ur{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fp,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class x0 extends Ur{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$g,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class y0 extends Ur{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Up extends qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new le(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const sc=new Te,df=new O,pf=new O;class S0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Mt(512,512),this.map=null,this.mapPass=null,this.matrix=new Te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nh,this._frameExtents=new Mt(1,1),this._viewportCount=1,this._viewports=[new Pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;df.setFromMatrixPosition(t.matrixWorld),e.position.copy(df),pf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pf),e.updateMatrixWorld(),sc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sc),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class oh extends Sp{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class M0 extends S0{constructor(){super(new oh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mf extends Up{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new M0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class E0 extends Up{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class b0 extends Vn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}const _f=new Te;class T0{constructor(t,e,i=0,s=1/0){this.ray=new pl(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new eh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _f.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_f),this}intersectObject(t,e=!0,i=[]){return wu(t,this,i,e),i.sort(gf),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)wu(t[s],this,i,e);return i.sort(gf),i}}function gf(n,t){return n.distance-t.distance}function wu(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)wu(r[a],t,e,!0)}}class vf{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=se(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(se(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class w0 extends Ep{constructor(t=10,e=10,i=4473924,s=8947848){i=new le(i),s=new le(s);const r=e/2,a=t/e,o=t/2,l=[],c=[];for(let p=0,f=0,_=-o;p<=e;p++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const g=p===r?i:s;g.toArray(c,f),f+=3,g.toArray(c,f),f+=3,g.toArray(c,f),f+=3,g.toArray(c,f),f+=3}const u=new Kn;u.setAttribute("position",new fn(l,3)),u.setAttribute("color",new fn(c,3));const h=new ih({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class A0 extends Os{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function xf(n,t,e,i){const s=R0(i);switch(e){case rp:return n*t;case op:return n*t;case lp:return n*t*2;case cp:return n*t/s.components*s.byteLength;case Ku:return n*t/s.components*s.byteLength;case up:return n*t*2/s.components*s.byteLength;case Ju:return n*t*2/s.components*s.byteLength;case ap:return n*t*3/s.components*s.byteLength;case Xn:return n*t*4/s.components*s.byteLength;case Qu:return n*t*4/s.components*s.byteLength;case Bo:case ko:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case zo:case Ho:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Zc:case Jc:return Math.max(n,16)*Math.max(t,8)/4;case jc:case Kc:return Math.max(n,8)*Math.max(t,8)/2;case Qc:case tu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case eu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case nu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case iu:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case su:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ru:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case au:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ou:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case lu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case cu:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case uu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case hu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case fu:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case du:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case pu:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case mu:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Vo:case _u:case gu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case hp:case vu:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xu:case yu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function R0(n){switch(n){case Ui:case np:return{byteLength:1,components:1};case va:case ip:case Za:return{byteLength:2,components:1};case ju:case Zu:return{byteLength:2,components:4};case Ds:case $u:case Ri:return{byteLength:4,components:1};case sp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yu);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Np(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function C0(n){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,h=c.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,_)=>f.start-_.start);let p=0;for(let f=1;f<h.length;f++){const _=h[p],g=h[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++p,h[p]=g)}h.length=p+1;for(let f=0,_=h.length;f<_;f++){const g=h[f];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var P0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,D0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,L0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,I0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,U0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,F0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,O0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,B0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,k0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,z0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,H0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,V0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,G0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,W0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,j0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Z0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,K0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,J0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Q0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ex=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,nx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ix=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ax="gl_FragColor = linearToOutputTexel( gl_FragColor );",ox=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,cx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ux=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,px=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_x=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,vx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Mx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ex=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ax=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Px=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ix=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ux=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ox=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,kx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$x=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Qx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ty=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ey=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ny=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,iy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ry=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ay=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,oy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ly=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,fy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,py=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,my=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_y=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,My=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ey=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,by=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ty=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ry=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Py=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ly=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ny=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Fy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Oy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,By=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ky=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$y=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ky=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,oS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ie={alphahash_fragment:P0,alphahash_pars_fragment:D0,alphamap_fragment:L0,alphamap_pars_fragment:I0,alphatest_fragment:U0,alphatest_pars_fragment:N0,aomap_fragment:F0,aomap_pars_fragment:O0,batching_pars_vertex:B0,batching_vertex:k0,begin_vertex:z0,beginnormal_vertex:H0,bsdfs:V0,iridescence_fragment:G0,bumpmap_pars_fragment:W0,clipping_planes_fragment:X0,clipping_planes_pars_fragment:q0,clipping_planes_pars_vertex:Y0,clipping_planes_vertex:$0,color_fragment:j0,color_pars_fragment:Z0,color_pars_vertex:K0,color_vertex:J0,common:Q0,cube_uv_reflection_fragment:tx,defaultnormal_vertex:ex,displacementmap_pars_vertex:nx,displacementmap_vertex:ix,emissivemap_fragment:sx,emissivemap_pars_fragment:rx,colorspace_fragment:ax,colorspace_pars_fragment:ox,envmap_fragment:lx,envmap_common_pars_fragment:cx,envmap_pars_fragment:ux,envmap_pars_vertex:hx,envmap_physical_pars_fragment:Mx,envmap_vertex:fx,fog_vertex:dx,fog_pars_vertex:px,fog_fragment:mx,fog_pars_fragment:_x,gradientmap_pars_fragment:gx,lightmap_pars_fragment:vx,lights_lambert_fragment:xx,lights_lambert_pars_fragment:yx,lights_pars_begin:Sx,lights_toon_fragment:Ex,lights_toon_pars_fragment:bx,lights_phong_fragment:Tx,lights_phong_pars_fragment:wx,lights_physical_fragment:Ax,lights_physical_pars_fragment:Rx,lights_fragment_begin:Cx,lights_fragment_maps:Px,lights_fragment_end:Dx,logdepthbuf_fragment:Lx,logdepthbuf_pars_fragment:Ix,logdepthbuf_pars_vertex:Ux,logdepthbuf_vertex:Nx,map_fragment:Fx,map_pars_fragment:Ox,map_particle_fragment:Bx,map_particle_pars_fragment:kx,metalnessmap_fragment:zx,metalnessmap_pars_fragment:Hx,morphinstance_vertex:Vx,morphcolor_vertex:Gx,morphnormal_vertex:Wx,morphtarget_pars_vertex:Xx,morphtarget_vertex:qx,normal_fragment_begin:Yx,normal_fragment_maps:$x,normal_pars_fragment:jx,normal_pars_vertex:Zx,normal_vertex:Kx,normalmap_pars_fragment:Jx,clearcoat_normal_fragment_begin:Qx,clearcoat_normal_fragment_maps:ty,clearcoat_pars_fragment:ey,iridescence_pars_fragment:ny,opaque_fragment:iy,packing:sy,premultiplied_alpha_fragment:ry,project_vertex:ay,dithering_fragment:oy,dithering_pars_fragment:ly,roughnessmap_fragment:cy,roughnessmap_pars_fragment:uy,shadowmap_pars_fragment:hy,shadowmap_pars_vertex:fy,shadowmap_vertex:dy,shadowmask_pars_fragment:py,skinbase_vertex:my,skinning_pars_vertex:_y,skinning_vertex:gy,skinnormal_vertex:vy,specularmap_fragment:xy,specularmap_pars_fragment:yy,tonemapping_fragment:Sy,tonemapping_pars_fragment:My,transmission_fragment:Ey,transmission_pars_fragment:by,uv_pars_fragment:Ty,uv_pars_vertex:wy,uv_vertex:Ay,worldpos_vertex:Ry,background_vert:Cy,background_frag:Py,backgroundCube_vert:Dy,backgroundCube_frag:Ly,cube_vert:Iy,cube_frag:Uy,depth_vert:Ny,depth_frag:Fy,distanceRGBA_vert:Oy,distanceRGBA_frag:By,equirect_vert:ky,equirect_frag:zy,linedashed_vert:Hy,linedashed_frag:Vy,meshbasic_vert:Gy,meshbasic_frag:Wy,meshlambert_vert:Xy,meshlambert_frag:qy,meshmatcap_vert:Yy,meshmatcap_frag:$y,meshnormal_vert:jy,meshnormal_frag:Zy,meshphong_vert:Ky,meshphong_frag:Jy,meshphysical_vert:Qy,meshphysical_frag:tS,meshtoon_vert:eS,meshtoon_frag:nS,points_vert:iS,points_frag:sS,shadow_vert:rS,shadow_frag:aS,sprite_vert:oS,sprite_frag:lS},Et={common:{diffuse:{value:new le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new le(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},ni={basic:{uniforms:tn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:tn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new le(0)}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:tn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new le(0)},specular:{value:new le(1118481)},shininess:{value:30}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:tn([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:tn([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new le(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:tn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:tn([Et.points,Et.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:tn([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:tn([Et.common,Et.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:tn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:tn([Et.sprite,Et.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distanceRGBA:{uniforms:tn([Et.common,Et.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distanceRGBA_vert,fragmentShader:ie.distanceRGBA_frag},shadow:{uniforms:tn([Et.lights,Et.fog,{color:{value:new le(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};ni.physical={uniforms:tn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new le(0)},specularColor:{value:new le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};const Ro={r:0,b:0,g:0},fs=new di,cS=new Te;function uS(n,t,e,i,s,r,a){const o=new le(0);let l=r===!0?0:1,c,u,h=null,p=0,f=null;function _(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function g(M){let x=!1;const I=_(M);I===null?d(o,l):I&&I.isColor&&(d(I,1),x=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,x){const I=_(x);I&&(I.isCubeTexture||I.mapping===fl)?(u===void 0&&(u=new oi(new Ka(1,1,1),new rs({name:"BackgroundCubeMaterial",uniforms:wr(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),fs.copy(x.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(cS.makeRotationFromEuler(fs)),u.material.toneMapped=me.getTransfer(I.colorSpace)!==ye,(h!==I||p!==I.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,h=I,p=I.version,f=n.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(c===void 0&&(c=new oi(new ml(2,2),new rs({name:"BackgroundMaterial",uniforms:wr(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:ss,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=I,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=me.getTransfer(I.colorSpace)!==ye,I.matrixAutoUpdate===!0&&I.updateMatrix(),c.material.uniforms.uvTransform.value.copy(I.matrix),(h!==I||p!==I.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=I,p=I.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function d(M,x){M.getRGB(Ro,yp(n)),i.buffers.color.setClear(Ro.r,Ro.g,Ro.b,x,a)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,d(o,l)},render:g,addToRenderList:m,dispose:w}}function hS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=p(null);let r=s,a=!1;function o(y,R,j,k,Z){let K=!1;const $=h(k,j,R);r!==$&&(r=$,c(r.object)),K=f(y,k,j,Z),K&&_(y,k,j,Z),Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,x(y,R,j,k),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function h(y,R,j){const k=j.wireframe===!0;let Z=i[y.id];Z===void 0&&(Z={},i[y.id]=Z);let K=Z[R.id];K===void 0&&(K={},Z[R.id]=K);let $=K[k];return $===void 0&&($=p(l()),K[k]=$),$}function p(y){const R=[],j=[],k=[];for(let Z=0;Z<e;Z++)R[Z]=0,j[Z]=0,k[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:j,attributeDivisors:k,object:y,attributes:{},index:null}}function f(y,R,j,k){const Z=r.attributes,K=R.attributes;let $=0;const z=j.getAttributes();for(const L in z)if(z[L].location>=0){const ot=Z[L];let ht=K[L];if(ht===void 0&&(L==="instanceMatrix"&&y.instanceMatrix&&(ht=y.instanceMatrix),L==="instanceColor"&&y.instanceColor&&(ht=y.instanceColor)),ot===void 0||ot.attribute!==ht||ht&&ot.data!==ht.data)return!0;$++}return r.attributesNum!==$||r.index!==k}function _(y,R,j,k){const Z={},K=R.attributes;let $=0;const z=j.getAttributes();for(const L in z)if(z[L].location>=0){let ot=K[L];ot===void 0&&(L==="instanceMatrix"&&y.instanceMatrix&&(ot=y.instanceMatrix),L==="instanceColor"&&y.instanceColor&&(ot=y.instanceColor));const ht={};ht.attribute=ot,ot&&ot.data&&(ht.data=ot.data),Z[L]=ht,$++}r.attributes=Z,r.attributesNum=$,r.index=k}function g(){const y=r.newAttributes;for(let R=0,j=y.length;R<j;R++)y[R]=0}function m(y){d(y,0)}function d(y,R){const j=r.newAttributes,k=r.enabledAttributes,Z=r.attributeDivisors;j[y]=1,k[y]===0&&(n.enableVertexAttribArray(y),k[y]=1),Z[y]!==R&&(n.vertexAttribDivisor(y,R),Z[y]=R)}function w(){const y=r.newAttributes,R=r.enabledAttributes;for(let j=0,k=R.length;j<k;j++)R[j]!==y[j]&&(n.disableVertexAttribArray(j),R[j]=0)}function M(y,R,j,k,Z,K,$){$===!0?n.vertexAttribIPointer(y,R,j,Z,K):n.vertexAttribPointer(y,R,j,k,Z,K)}function x(y,R,j,k){g();const Z=k.attributes,K=j.getAttributes(),$=R.defaultAttributeValues;for(const z in K){const L=K[z];if(L.location>=0){let et=Z[z];if(et===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(et=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(et=y.instanceColor)),et!==void 0){const ot=et.normalized,ht=et.itemSize,yt=t.get(et);if(yt===void 0)continue;const St=yt.buffer,W=yt.type,ct=yt.bytesPerElement,xt=W===n.INT||W===n.UNSIGNED_INT||et.gpuType===$u;if(et.isInterleavedBufferAttribute){const mt=et.data,Pt=mt.stride,Xt=et.offset;if(mt.isInstancedInterleavedBuffer){for(let It=0;It<L.locationSize;It++)d(L.location+It,mt.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let It=0;It<L.locationSize;It++)m(L.location+It);n.bindBuffer(n.ARRAY_BUFFER,St);for(let It=0;It<L.locationSize;It++)M(L.location+It,ht/L.locationSize,W,ot,Pt*ct,(Xt+ht/L.locationSize*It)*ct,xt)}else{if(et.isInstancedBufferAttribute){for(let mt=0;mt<L.locationSize;mt++)d(L.location+mt,et.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let mt=0;mt<L.locationSize;mt++)m(L.location+mt);n.bindBuffer(n.ARRAY_BUFFER,St);for(let mt=0;mt<L.locationSize;mt++)M(L.location+mt,ht/L.locationSize,W,ot,ht*ct,ht/L.locationSize*mt*ct,xt)}}else if($!==void 0){const ot=$[z];if(ot!==void 0)switch(ot.length){case 2:n.vertexAttrib2fv(L.location,ot);break;case 3:n.vertexAttrib3fv(L.location,ot);break;case 4:n.vertexAttrib4fv(L.location,ot);break;default:n.vertexAttrib1fv(L.location,ot)}}}}w()}function I(){D();for(const y in i){const R=i[y];for(const j in R){const k=R[j];for(const Z in k)u(k[Z].object),delete k[Z];delete R[j]}delete i[y]}}function C(y){if(i[y.id]===void 0)return;const R=i[y.id];for(const j in R){const k=R[j];for(const Z in k)u(k[Z].object),delete k[Z];delete R[j]}delete i[y.id]}function A(y){for(const R in i){const j=i[R];if(j[y.id]===void 0)continue;const k=j[y.id];for(const Z in k)u(k[Z].object),delete k[Z];delete j[y.id]}}function D(){T(),a=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:T,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:w}}function fS(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function a(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function o(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let f=0;for(let _=0;_<h;_++)f+=u[_];e.update(f,i,1)}function l(c,u,h,p){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)a(c[_],u[_],p[_]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,p,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*p[g];e.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function dS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Xn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===Za&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Ui&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ri&&!D)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=_>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:p,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:w,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:I,maxSamples:C}}function pS(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new Xi,o=new ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const f=h.length!==0||p||i!==0||s;return s=p,i=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,p){e=u(h,p,0)},this.setState=function(h,p,f){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{const w=r?0:i,M=w*4;let x=d.clippingState||null;l.value=x,x=u(_,p,M,f);for(let I=0;I!==M;++I)x[I]=e[I];d.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,p,f,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const d=f+g*4,w=p.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,x=f;M!==g;++M,x+=4)a.copy(h[M]).applyMatrix4(w,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function mS(n){let t=new WeakMap;function e(a,o){return o===Xc?a.mapping=Er:o===qc&&(a.mapping=br),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Xc||o===qc)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Lv(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const ir=4,yf=[.125,.215,.35,.446,.526,.582],gs=20,rc=new oh,Sf=new le;let ac=null,oc=0,lc=0,cc=!1;const ps=(1+Math.sqrt(5))/2,Qs=1/ps,Mf=[new O(-ps,Qs,0),new O(ps,Qs,0),new O(-Qs,0,ps),new O(Qs,0,ps),new O(0,ps,-Qs),new O(0,ps,Qs),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],_S=new O;class Ef{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=_S}=r;ac=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),lc=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ac,oc,lc),this._renderer.xr.enabled=cc,t.scissorTest=!1,Co(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Er||t.mapping===br?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ac=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),lc=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ai,minFilter:ai,generateMipmaps:!1,type:Za,format:Xn,colorSpace:Tr,depthBuffer:!1},s=bf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bf(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gS(r)),this._blurMaterial=vS(r,t,e)}return s}_compileMaterial(t){const e=new oi(this._lodPlanes[0],t);this._renderer.compile(e,rc)}_sceneToCubeUV(t,e,i,s,r){const l=new Vn(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,f=h.toneMapping;h.getClearColor(Sf),h.toneMapping=Qi,h.autoClear=!1;const _=new gp({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),g=new oi(new Ka,_);let m=!1;const d=t.background;d?d.isColor&&(_.color.copy(d),t.background=null,m=!0):(_.color.copy(Sf),m=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[w]));const x=this._cubeSize;Co(s,M*x,w>2?x:0,x,x),h.setRenderTarget(s),m&&h.render(g,l),h.render(t,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=p,t.background=d}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Er||t.mapping===br;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tf());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new oi(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Co(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,rc)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Mf[(s-r-1)%Mf.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new oi(this._lodPlanes[s],c),p=c.uniforms,f=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gs-1),g=r/_,m=isFinite(r)?1+Math.floor(u*g):gs;m>gs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gs}`);const d=[];let w=0;for(let A=0;A<gs;++A){const D=A/g,T=Math.exp(-D*D/2);d.push(T),A===0?w+=T:A<m&&(w+=2*T)}for(let A=0;A<d.length;A++)d[A]=d[A]/w;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=d,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:M}=this;p.dTheta.value=_,p.mipInt.value=M-i;const x=this._sizeLods[s],I=3*x*(s>M-ir?s-M+ir:0),C=4*(this._cubeSize-x);Co(e,I,C,3*x,2*x),l.setRenderTarget(e),l.render(h,rc)}}function gS(n){const t=[],e=[],i=[];let s=n;const r=n-ir+1+yf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-ir?l=yf[a-n+ir-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,p=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,_=6,g=3,m=2,d=1,w=new Float32Array(g*_*f),M=new Float32Array(m*_*f),x=new Float32Array(d*_*f);for(let C=0;C<f;C++){const A=C%3*2/3-1,D=C>2?0:-1,T=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];w.set(T,g*_*C),M.set(p,m*_*C);const y=[C,C,C,C,C,C];x.set(y,d*_*C)}const I=new Kn;I.setAttribute("position",new hi(w,g)),I.setAttribute("uv",new hi(M,m)),I.setAttribute("faceIndex",new hi(x,d)),t.push(I),s>ir&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function bf(n,t,e){const i=new Ls(n,t,e);return i.texture.mapping=fl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Co(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function vS(n,t,e){const i=new Float32Array(gs),s=new O(0,1,0);return new rs({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Tf(){return new rs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function wf(){return new rs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function lh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function xS(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Xc||l===qc,u=l===Er||l===br;if(c||u){let h=t.get(o);const p=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new Ef(n)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new Ef(n)),h=c?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function yS(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Go("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function SS(n,t,e,i){const s={},r=new WeakMap;function a(h){const p=h.target;p.index!==null&&t.remove(p.index);for(const _ in p.attributes)t.remove(p.attributes[_]);p.removeEventListener("dispose",a),delete s[p.id];const f=r.get(p);f&&(t.remove(f),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(h,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function l(h){const p=h.attributes;for(const f in p)t.update(p[f],n.ARRAY_BUFFER)}function c(h){const p=[],f=h.index,_=h.attributes.position;let g=0;if(f!==null){const w=f.array;g=f.version;for(let M=0,x=w.length;M<x;M+=3){const I=w[M+0],C=w[M+1],A=w[M+2];p.push(I,C,C,A,A,I)}}else if(_!==void 0){const w=_.array;g=_.version;for(let M=0,x=w.length/3-1;M<x;M+=3){const I=M+0,C=M+1,A=M+2;p.push(I,C,C,A,A,I)}}else return;const m=new(pp(p)?xp:vp)(p,1);m.version=g;const d=r.get(h);d&&t.remove(d),r.set(h,m)}function u(h){const p=r.get(h);if(p){const f=h.index;f!==null&&p.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function MS(n,t,e){let i;function s(p){i=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,f){n.drawElements(i,f,r,p*a),e.update(f,i,1)}function c(p,f,_){_!==0&&(n.drawElementsInstanced(i,f,r,p*a,_),e.update(f,i,_))}function u(p,f,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,p,0,_);let m=0;for(let d=0;d<_;d++)m+=f[d];e.update(m,i,1)}function h(p,f,_,g){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<p.length;d++)c(p[d]/a,f[d],g[d]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,p,0,g,0,_);let d=0;for(let w=0;w<_;w++)d+=f[w]*g[w];e.update(d,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function ES(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function bS(n,t,e){const i=new WeakMap,s=new Pe;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let p=i.get(o);if(p===void 0||p.count!==h){let y=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",y)};var f=y;p!==void 0&&p.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;_===!0&&(x=1),g===!0&&(x=2),m===!0&&(x=3);let I=o.attributes.position.count*x,C=1;I>t.maxTextureSize&&(C=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const A=new Float32Array(I*C*4*h),D=new mp(A,I,C,h);D.type=Ri,D.needsUpdate=!0;const T=x*4;for(let R=0;R<h;R++){const j=d[R],k=w[R],Z=M[R],K=I*C*4*R;for(let $=0;$<j.count;$++){const z=$*T;_===!0&&(s.fromBufferAttribute(j,$),A[K+z+0]=s.x,A[K+z+1]=s.y,A[K+z+2]=s.z,A[K+z+3]=0),g===!0&&(s.fromBufferAttribute(k,$),A[K+z+4]=s.x,A[K+z+5]=s.y,A[K+z+6]=s.z,A[K+z+7]=0),m===!0&&(s.fromBufferAttribute(Z,$),A[K+z+8]=s.x,A[K+z+9]=s.y,A[K+z+10]=s.z,A[K+z+11]=Z.itemSize===4?s.w:1)}}p={count:h,texture:D,size:new Mt(I,C)},i.set(o,p),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:r}}function TS(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const Fp=new hn,Af=new bp(1,1),Op=new mp,Bp=new mv,kp=new Mp,Rf=[],Cf=[],Pf=new Float32Array(16),Df=new Float32Array(9),Lf=new Float32Array(4);function Nr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Rf[s];if(r===void 0&&(r=new Float32Array(s),Rf[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function ke(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ze(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function _l(n,t){let e=Cf[t];e===void 0&&(e=new Int32Array(t),Cf[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function wS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function AS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2fv(this.addr,t),ze(e,t)}}function RS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ke(e,t))return;n.uniform3fv(this.addr,t),ze(e,t)}}function CS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4fv(this.addr,t),ze(e,t)}}function PS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(ke(e,i))return;Lf.set(i),n.uniformMatrix2fv(this.addr,!1,Lf),ze(e,i)}}function DS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(ke(e,i))return;Df.set(i),n.uniformMatrix3fv(this.addr,!1,Df),ze(e,i)}}function LS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(ke(e,i))return;Pf.set(i),n.uniformMatrix4fv(this.addr,!1,Pf),ze(e,i)}}function IS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function US(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2iv(this.addr,t),ze(e,t)}}function NS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;n.uniform3iv(this.addr,t),ze(e,t)}}function FS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4iv(this.addr,t),ze(e,t)}}function OS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function BS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2uiv(this.addr,t),ze(e,t)}}function kS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;n.uniform3uiv(this.addr,t),ze(e,t)}}function zS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4uiv(this.addr,t),ze(e,t)}}function HS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Af.compareFunction=dp,r=Af):r=Fp,e.setTexture2D(t||r,s)}function VS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Bp,s)}function GS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||kp,s)}function WS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Op,s)}function XS(n){switch(n){case 5126:return wS;case 35664:return AS;case 35665:return RS;case 35666:return CS;case 35674:return PS;case 35675:return DS;case 35676:return LS;case 5124:case 35670:return IS;case 35667:case 35671:return US;case 35668:case 35672:return NS;case 35669:case 35673:return FS;case 5125:return OS;case 36294:return BS;case 36295:return kS;case 36296:return zS;case 35678:case 36198:case 36298:case 36306:case 35682:return HS;case 35679:case 36299:case 36307:return VS;case 35680:case 36300:case 36308:case 36293:return GS;case 36289:case 36303:case 36311:case 36292:return WS}}function qS(n,t){n.uniform1fv(this.addr,t)}function YS(n,t){const e=Nr(t,this.size,2);n.uniform2fv(this.addr,e)}function $S(n,t){const e=Nr(t,this.size,3);n.uniform3fv(this.addr,e)}function jS(n,t){const e=Nr(t,this.size,4);n.uniform4fv(this.addr,e)}function ZS(n,t){const e=Nr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function KS(n,t){const e=Nr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function JS(n,t){const e=Nr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function QS(n,t){n.uniform1iv(this.addr,t)}function tM(n,t){n.uniform2iv(this.addr,t)}function eM(n,t){n.uniform3iv(this.addr,t)}function nM(n,t){n.uniform4iv(this.addr,t)}function iM(n,t){n.uniform1uiv(this.addr,t)}function sM(n,t){n.uniform2uiv(this.addr,t)}function rM(n,t){n.uniform3uiv(this.addr,t)}function aM(n,t){n.uniform4uiv(this.addr,t)}function oM(n,t,e){const i=this.cache,s=t.length,r=_l(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Fp,r[a])}function lM(n,t,e){const i=this.cache,s=t.length,r=_l(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Bp,r[a])}function cM(n,t,e){const i=this.cache,s=t.length,r=_l(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||kp,r[a])}function uM(n,t,e){const i=this.cache,s=t.length,r=_l(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Op,r[a])}function hM(n){switch(n){case 5126:return qS;case 35664:return YS;case 35665:return $S;case 35666:return jS;case 35674:return ZS;case 35675:return KS;case 35676:return JS;case 5124:case 35670:return QS;case 35667:case 35671:return tM;case 35668:case 35672:return eM;case 35669:case 35673:return nM;case 5125:return iM;case 36294:return sM;case 36295:return rM;case 36296:return aM;case 35678:case 36198:case 36298:case 36306:case 35682:return oM;case 35679:case 36299:case 36307:return lM;case 35680:case 36300:case 36308:case 36293:return cM;case 36289:case 36303:case 36311:case 36292:return uM}}class fM{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=XS(e.type)}}class dM{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hM(e.type)}}class pM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const uc=/(\w+)(\])?(\[|\.)?/g;function If(n,t){n.seq.push(t),n.map[t.id]=t}function mM(n,t,e){const i=n.name,s=i.length;for(uc.lastIndex=0;;){const r=uc.exec(i),a=uc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){If(e,c===void 0?new fM(o,n,t):new dM(o,n,t));break}else{let h=e.map[o];h===void 0&&(h=new pM(o),If(e,h)),e=h}}}class Wo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);mM(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Uf(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const _M=37297;let gM=0;function vM(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Nf=new ne;function xM(n){me._getMatrix(Nf,me.workingColorSpace,n);const t=`mat3( ${Nf.elements.map(e=>e.toFixed(4))} )`;switch(me.getTransfer(n)){case Ko:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Ff(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+vM(n.getShaderSource(t),a)}else return s}function yM(n,t){const e=xM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function SM(n,t){let e;switch(t){case zg:e="Linear";break;case Hg:e="Reinhard";break;case Vg:e="Cineon";break;case Gg:e="ACESFilmic";break;case Xg:e="AgX";break;case qg:e="Neutral";break;case Wg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Po=new O;function MM(){me.getLuminanceCoefficients(Po);const n=Po.x.toFixed(4),t=Po.y.toFixed(4),e=Po.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function EM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ta).join(`
`)}function bM(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function TM(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function ta(n){return n!==""}function Of(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bf(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const wM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Au(n){return n.replace(wM,RM)}const AM=new Map;function RM(n,t){let e=ie[t];if(e===void 0){const i=AM.get(t);if(i!==void 0)e=ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Au(e)}const CM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kf(n){return n.replace(CM,PM)}function PM(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zf(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function DM(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Qd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===xg?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function LM(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Er:case br:t="ENVMAP_TYPE_CUBE";break;case fl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function IM(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case br:t="ENVMAP_MODE_REFRACTION";break}return t}function UM(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case tp:t="ENVMAP_BLENDING_MULTIPLY";break;case Bg:t="ENVMAP_BLENDING_MIX";break;case kg:t="ENVMAP_BLENDING_ADD";break}return t}function NM(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function FM(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=DM(e),c=LM(e),u=IM(e),h=UM(e),p=NM(e),f=EM(e),_=bM(r),g=s.createProgram();let m,d,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ta).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ta).join(`
`),d.length>0&&(d+=`
`)):(m=[zf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ta).join(`
`),d=[zf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Qi?"#define TONE_MAPPING":"",e.toneMapping!==Qi?ie.tonemapping_pars_fragment:"",e.toneMapping!==Qi?SM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,yM("linearToOutputTexel",e.outputColorSpace),MM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ta).join(`
`)),a=Au(a),a=Of(a,e),a=Bf(a,e),o=Au(o),o=Of(o,e),o=Bf(o,e),a=kf(a),o=kf(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===zh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===zh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=w+m+a,x=w+d+o,I=Uf(s,s.VERTEX_SHADER,M),C=Uf(s,s.FRAGMENT_SHADER,x);s.attachShader(g,I),s.attachShader(g,C),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(R){if(n.debug.checkShaderErrors){const j=s.getProgramInfoLog(g).trim(),k=s.getShaderInfoLog(I).trim(),Z=s.getShaderInfoLog(C).trim();let K=!0,$=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,I,C);else{const z=Ff(s,I,"vertex"),L=Ff(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+j+`
`+z+`
`+L)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(k===""||Z==="")&&($=!1);$&&(R.diagnostics={runnable:K,programLog:j,vertexShader:{log:k,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(I),s.deleteShader(C),D=new Wo(s,g),T=TM(s,g)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(g,_M)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=gM++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=I,this.fragmentShader=C,this}let OM=0;class BM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new kM(t),e.set(t,i)),i}}class kM{constructor(t){this.id=OM++,this.code=t,this.usedTimes=0}}function zM(n,t,e,i,s,r,a){const o=new eh,l=new BM,c=new Set,u=[],h=s.logarithmicDepthBuffer,p=s.vertexTextures;let f=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,y,R,j,k){const Z=j.fog,K=k.geometry,$=T.isMeshStandardMaterial?j.environment:null,z=(T.isMeshStandardMaterial?e:t).get(T.envMap||$),L=z&&z.mapping===fl?z.image.height:null,et=_[T.type];T.precision!==null&&(f=s.getMaxPrecision(T.precision),f!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));const ot=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ht=ot!==void 0?ot.length:0;let yt=0;K.morphAttributes.position!==void 0&&(yt=1),K.morphAttributes.normal!==void 0&&(yt=2),K.morphAttributes.color!==void 0&&(yt=3);let St,W,ct,xt;if(et){const xe=ni[et];St=xe.vertexShader,W=xe.fragmentShader}else St=T.vertexShader,W=T.fragmentShader,l.update(T),ct=l.getVertexShaderID(T),xt=l.getFragmentShaderID(T);const mt=n.getRenderTarget(),Pt=n.state.buffers.depth.getReversed(),Xt=k.isInstancedMesh===!0,It=k.isBatchedMesh===!0,Dt=!!T.map,Ot=!!T.matcap,Bt=!!z,S=!!T.aoMap,ft=!!T.lightMap,N=!!T.bumpMap,X=!!T.normalMap,U=!!T.displacementMap,J=!!T.emissiveMap,q=!!T.metalnessMap,E=!!T.roughnessMap,v=T.anisotropy>0,F=T.clearcoat>0,Y=T.dispersion>0,nt=T.iridescence>0,Q=T.sheen>0,dt=T.transmission>0,lt=v&&!!T.anisotropyMap,_t=F&&!!T.clearcoatMap,zt=F&&!!T.clearcoatNormalMap,gt=F&&!!T.clearcoatRoughnessMap,Tt=nt&&!!T.iridescenceMap,Gt=nt&&!!T.iridescenceThicknessMap,$t=Q&&!!T.sheenColorMap,Lt=Q&&!!T.sheenRoughnessMap,oe=!!T.specularMap,te=!!T.specularColorMap,Me=!!T.specularIntensityMap,B=dt&&!!T.transmissionMap,wt=dt&&!!T.thicknessMap,at=!!T.gradientMap,ut=!!T.alphaMap,Ct=T.alphaTest>0,At=!!T.alphaHash,ee=!!T.extensions;let Re=Qi;T.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Re=n.toneMapping);const Ye={shaderID:et,shaderType:T.type,shaderName:T.name,vertexShader:St,fragmentShader:W,defines:T.defines,customVertexShaderID:ct,customFragmentShaderID:xt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:It,batchingColor:It&&k._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&k.instanceColor!==null,instancingMorph:Xt&&k.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:mt===null?n.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:Tr,alphaToCoverage:!!T.alphaToCoverage,map:Dt,matcap:Ot,envMap:Bt,envMapMode:Bt&&z.mapping,envMapCubeUVHeight:L,aoMap:S,lightMap:ft,bumpMap:N,normalMap:X,displacementMap:p&&U,emissiveMap:J,normalMapObjectSpace:X&&T.normalMapType===Zg,normalMapTangentSpace:X&&T.normalMapType===fp,metalnessMap:q,roughnessMap:E,anisotropy:v,anisotropyMap:lt,clearcoat:F,clearcoatMap:_t,clearcoatNormalMap:zt,clearcoatRoughnessMap:gt,dispersion:Y,iridescence:nt,iridescenceMap:Tt,iridescenceThicknessMap:Gt,sheen:Q,sheenColorMap:$t,sheenRoughnessMap:Lt,specularMap:oe,specularColorMap:te,specularIntensityMap:Me,transmission:dt,transmissionMap:B,thicknessMap:wt,gradientMap:at,opaque:T.transparent===!1&&T.blending===or&&T.alphaToCoverage===!1,alphaMap:ut,alphaTest:Ct,alphaHash:At,combine:T.combine,mapUv:Dt&&g(T.map.channel),aoMapUv:S&&g(T.aoMap.channel),lightMapUv:ft&&g(T.lightMap.channel),bumpMapUv:N&&g(T.bumpMap.channel),normalMapUv:X&&g(T.normalMap.channel),displacementMapUv:U&&g(T.displacementMap.channel),emissiveMapUv:J&&g(T.emissiveMap.channel),metalnessMapUv:q&&g(T.metalnessMap.channel),roughnessMapUv:E&&g(T.roughnessMap.channel),anisotropyMapUv:lt&&g(T.anisotropyMap.channel),clearcoatMapUv:_t&&g(T.clearcoatMap.channel),clearcoatNormalMapUv:zt&&g(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&g(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&g(T.iridescenceMap.channel),iridescenceThicknessMapUv:Gt&&g(T.iridescenceThicknessMap.channel),sheenColorMapUv:$t&&g(T.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&g(T.sheenRoughnessMap.channel),specularMapUv:oe&&g(T.specularMap.channel),specularColorMapUv:te&&g(T.specularColorMap.channel),specularIntensityMapUv:Me&&g(T.specularIntensityMap.channel),transmissionMapUv:B&&g(T.transmissionMap.channel),thicknessMapUv:wt&&g(T.thicknessMap.channel),alphaMapUv:ut&&g(T.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(X||v),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(Dt||ut),fog:!!Z,useFog:T.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Pt,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:yt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Re,decodeVideoTexture:Dt&&T.map.isVideoTexture===!0&&me.getTransfer(T.map.colorSpace)===ye,decodeVideoTextureEmissive:J&&T.emissiveMap.isVideoTexture===!0&&me.getTransfer(T.emissiveMap.colorSpace)===ye,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ti,flipSided:T.side===un,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:ee&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&T.extensions.multiDraw===!0||It)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Ye.vertexUv1s=c.has(1),Ye.vertexUv2s=c.has(2),Ye.vertexUv3s=c.has(3),c.clear(),Ye}function d(T){const y=[];if(T.shaderID?y.push(T.shaderID):(y.push(T.customVertexShaderID),y.push(T.customFragmentShaderID)),T.defines!==void 0)for(const R in T.defines)y.push(R),y.push(T.defines[R]);return T.isRawShaderMaterial===!1&&(w(y,T),M(y,T),y.push(n.outputColorSpace)),y.push(T.customProgramCacheKey),y.join()}function w(T,y){T.push(y.precision),T.push(y.outputColorSpace),T.push(y.envMapMode),T.push(y.envMapCubeUVHeight),T.push(y.mapUv),T.push(y.alphaMapUv),T.push(y.lightMapUv),T.push(y.aoMapUv),T.push(y.bumpMapUv),T.push(y.normalMapUv),T.push(y.displacementMapUv),T.push(y.emissiveMapUv),T.push(y.metalnessMapUv),T.push(y.roughnessMapUv),T.push(y.anisotropyMapUv),T.push(y.clearcoatMapUv),T.push(y.clearcoatNormalMapUv),T.push(y.clearcoatRoughnessMapUv),T.push(y.iridescenceMapUv),T.push(y.iridescenceThicknessMapUv),T.push(y.sheenColorMapUv),T.push(y.sheenRoughnessMapUv),T.push(y.specularMapUv),T.push(y.specularColorMapUv),T.push(y.specularIntensityMapUv),T.push(y.transmissionMapUv),T.push(y.thicknessMapUv),T.push(y.combine),T.push(y.fogExp2),T.push(y.sizeAttenuation),T.push(y.morphTargetsCount),T.push(y.morphAttributeCount),T.push(y.numDirLights),T.push(y.numPointLights),T.push(y.numSpotLights),T.push(y.numSpotLightMaps),T.push(y.numHemiLights),T.push(y.numRectAreaLights),T.push(y.numDirLightShadows),T.push(y.numPointLightShadows),T.push(y.numSpotLightShadows),T.push(y.numSpotLightShadowsWithMaps),T.push(y.numLightProbes),T.push(y.shadowMapType),T.push(y.toneMapping),T.push(y.numClippingPlanes),T.push(y.numClipIntersection),T.push(y.depthPacking)}function M(T,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),T.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),T.push(o.mask)}function x(T){const y=_[T.type];let R;if(y){const j=ni[y];R=Rv.clone(j.uniforms)}else R=T.uniforms;return R}function I(T,y){let R;for(let j=0,k=u.length;j<k;j++){const Z=u[j];if(Z.cacheKey===y){R=Z,++R.usedTimes;break}}return R===void 0&&(R=new FM(n,y,T,r),u.push(R)),R}function C(T){if(--T.usedTimes===0){const y=u.indexOf(T);u[y]=u[u.length-1],u.pop(),T.destroy()}}function A(T){l.remove(T)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:I,releaseProgram:C,releaseShaderCache:A,programs:u,dispose:D}}function HM(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function VM(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Hf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Vf(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h,p,f,_,g,m){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:p,material:f,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},n[t]=d):(d.id=h.id,d.object=h,d.geometry=p,d.material=f,d.groupOrder=_,d.renderOrder=h.renderOrder,d.z=g,d.group=m),t++,d}function o(h,p,f,_,g,m){const d=a(h,p,f,_,g,m);f.transmission>0?i.push(d):f.transparent===!0?s.push(d):e.push(d)}function l(h,p,f,_,g,m){const d=a(h,p,f,_,g,m);f.transmission>0?i.unshift(d):f.transparent===!0?s.unshift(d):e.unshift(d)}function c(h,p){e.length>1&&e.sort(h||VM),i.length>1&&i.sort(p||Hf),s.length>1&&s.sort(p||Hf)}function u(){for(let h=t,p=n.length;h<p;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function GM(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Vf,n.set(i,[a])):s>=r.length?(a=new Vf,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function WM(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new le};break;case"SpotLight":e={position:new O,direction:new O,color:new le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new le,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new le,groundColor:new le};break;case"RectAreaLight":e={color:new le,position:new O,halfWidth:new O,halfHeight:new O};break}return n[t.id]=e,e}}}function XM(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let qM=0;function YM(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function $M(n){const t=new WM,e=XM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const s=new O,r=new Te,a=new Te;function o(c){let u=0,h=0,p=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let f=0,_=0,g=0,m=0,d=0,w=0,M=0,x=0,I=0,C=0,A=0;c.sort(YM);for(let T=0,y=c.length;T<y;T++){const R=c[T],j=R.color,k=R.intensity,Z=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=j.r*k,h+=j.g*k,p+=j.b*k;else if(R.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(R.sh.coefficients[$],k);A++}else if(R.isDirectionalLight){const $=t.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const z=R.shadow,L=e.get(R);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,i.directionalShadow[f]=L,i.directionalShadowMap[f]=K,i.directionalShadowMatrix[f]=R.shadow.matrix,w++}i.directional[f]=$,f++}else if(R.isSpotLight){const $=t.get(R);$.position.setFromMatrixPosition(R.matrixWorld),$.color.copy(j).multiplyScalar(k),$.distance=Z,$.coneCos=Math.cos(R.angle),$.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),$.decay=R.decay,i.spot[g]=$;const z=R.shadow;if(R.map&&(i.spotLightMap[I]=R.map,I++,z.updateMatrices(R),R.castShadow&&C++),i.spotLightMatrix[g]=z.matrix,R.castShadow){const L=e.get(R);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,i.spotShadow[g]=L,i.spotShadowMap[g]=K,x++}g++}else if(R.isRectAreaLight){const $=t.get(R);$.color.copy(j).multiplyScalar(k),$.halfWidth.set(R.width*.5,0,0),$.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=$,m++}else if(R.isPointLight){const $=t.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),$.distance=R.distance,$.decay=R.decay,R.castShadow){const z=R.shadow,L=e.get(R);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,L.shadowCameraNear=z.camera.near,L.shadowCameraFar=z.camera.far,i.pointShadow[_]=L,i.pointShadowMap[_]=K,i.pointShadowMatrix[_]=R.shadow.matrix,M++}i.point[_]=$,_++}else if(R.isHemisphereLight){const $=t.get(R);$.skyColor.copy(R.color).multiplyScalar(k),$.groundColor.copy(R.groundColor).multiplyScalar(k),i.hemi[d]=$,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Et.LTC_FLOAT_1,i.rectAreaLTC2=Et.LTC_FLOAT_2):(i.rectAreaLTC1=Et.LTC_HALF_1,i.rectAreaLTC2=Et.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=p;const D=i.hash;(D.directionalLength!==f||D.pointLength!==_||D.spotLength!==g||D.rectAreaLength!==m||D.hemiLength!==d||D.numDirectionalShadows!==w||D.numPointShadows!==M||D.numSpotShadows!==x||D.numSpotMaps!==I||D.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=x+I-C,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,D.directionalLength=f,D.pointLength=_,D.spotLength=g,D.rectAreaLength=m,D.hemiLength=d,D.numDirectionalShadows=w,D.numPointShadows=M,D.numSpotShadows=x,D.numSpotMaps=I,D.numLightProbes=A,i.version=qM++)}function l(c,u){let h=0,p=0,f=0,_=0,g=0;const m=u.matrixWorldInverse;for(let d=0,w=c.length;d<w;d++){const M=c[d];if(M.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),h++}else if(M.isSpotLight){const x=i.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const x=i.rectArea[_];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const x=i.point[p];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),p++}else if(M.isHemisphereLight){const x=i.hemi[g];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function Gf(n){const t=new $M(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function a(u){i.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function jM(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Gf(n),t.set(s,[o])):r>=a.length?(o=new Gf(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const ZM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function JM(n,t,e){let i=new nh;const s=new Mt,r=new Mt,a=new Pe,o=new x0({depthPacking:jg}),l=new y0,c={},u=e.maxTextureSize,h={[ss]:un,[un]:ss,[Ti]:Ti},p=new rs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:ZM,fragmentShader:KM}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const _=new Kn;_.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new oi(_,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qd;let d=this.type;this.render=function(C,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const T=n.getRenderTarget(),y=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),j=n.state;j.setBlending(Ji),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const k=d!==Si&&this.type===Si,Z=d===Si&&this.type!==Si;for(let K=0,$=C.length;K<$;K++){const z=C[K],L=z.shadow;if(L===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;s.copy(L.mapSize);const et=L.getFrameExtents();if(s.multiply(et),r.copy(L.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/et.x),s.x=r.x*et.x,L.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/et.y),s.y=r.y*et.y,L.mapSize.y=r.y)),L.map===null||k===!0||Z===!0){const ht=this.type!==Si?{minFilter:Yn,magFilter:Yn}:{};L.map!==null&&L.map.dispose(),L.map=new Ls(s.x,s.y,ht),L.map.texture.name=z.name+".shadowMap",L.camera.updateProjectionMatrix()}n.setRenderTarget(L.map),n.clear();const ot=L.getViewportCount();for(let ht=0;ht<ot;ht++){const yt=L.getViewport(ht);a.set(r.x*yt.x,r.y*yt.y,r.x*yt.z,r.y*yt.w),j.viewport(a),L.updateMatrices(z,ht),i=L.getFrustum(),x(A,D,L.camera,z,this.type)}L.isPointLightShadow!==!0&&this.type===Si&&w(L,D),L.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(T,y,R)};function w(C,A){const D=t.update(g);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ls(s.x,s.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(A,null,D,p,g,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(A,null,D,f,g,null)}function M(C,A,D,T){let y=null;const R=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)y=R;else if(y=D.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const j=y.uuid,k=A.uuid;let Z=c[j];Z===void 0&&(Z={},c[j]=Z);let K=Z[k];K===void 0&&(K=y.clone(),Z[k]=K,A.addEventListener("dispose",I)),y=K}if(y.visible=A.visible,y.wireframe=A.wireframe,T===Si?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:h[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const j=n.properties.get(y);j.light=D}return y}function x(C,A,D,T,y){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===Si)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const k=t.update(C),Z=C.material;if(Array.isArray(Z)){const K=k.groups;for(let $=0,z=K.length;$<z;$++){const L=K[$],et=Z[L.materialIndex];if(et&&et.visible){const ot=M(C,et,T,y);C.onBeforeShadow(n,C,A,D,k,ot,L),n.renderBufferDirect(D,null,k,ot,C,L),C.onAfterShadow(n,C,A,D,k,ot,L)}}}else if(Z.visible){const K=M(C,Z,T,y);C.onBeforeShadow(n,C,A,D,k,K,null),n.renderBufferDirect(D,null,k,K,C,null),C.onAfterShadow(n,C,A,D,k,K,null)}}const j=C.children;for(let k=0,Z=j.length;k<Z;k++)x(j[k],A,D,T,y)}function I(C){C.target.removeEventListener("dispose",I);for(const D in c){const T=c[D],y=C.target.uuid;y in T&&(T[y].dispose(),delete T[y])}}}const QM={[Bc]:kc,[zc]:Gc,[Hc]:Wc,[Mr]:Vc,[kc]:Bc,[Gc]:zc,[Wc]:Hc,[Vc]:Mr};function tE(n,t){function e(){let B=!1;const wt=new Pe;let at=null;const ut=new Pe(0,0,0,0);return{setMask:function(Ct){at!==Ct&&!B&&(n.colorMask(Ct,Ct,Ct,Ct),at=Ct)},setLocked:function(Ct){B=Ct},setClear:function(Ct,At,ee,Re,Ye){Ye===!0&&(Ct*=Re,At*=Re,ee*=Re),wt.set(Ct,At,ee,Re),ut.equals(wt)===!1&&(n.clearColor(Ct,At,ee,Re),ut.copy(wt))},reset:function(){B=!1,at=null,ut.set(-1,0,0,0)}}}function i(){let B=!1,wt=!1,at=null,ut=null,Ct=null;return{setReversed:function(At){if(wt!==At){const ee=t.get("EXT_clip_control");At?ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.ZERO_TO_ONE_EXT):ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.NEGATIVE_ONE_TO_ONE_EXT),wt=At;const Re=Ct;Ct=null,this.setClear(Re)}},getReversed:function(){return wt},setTest:function(At){At?mt(n.DEPTH_TEST):Pt(n.DEPTH_TEST)},setMask:function(At){at!==At&&!B&&(n.depthMask(At),at=At)},setFunc:function(At){if(wt&&(At=QM[At]),ut!==At){switch(At){case Bc:n.depthFunc(n.NEVER);break;case kc:n.depthFunc(n.ALWAYS);break;case zc:n.depthFunc(n.LESS);break;case Mr:n.depthFunc(n.LEQUAL);break;case Hc:n.depthFunc(n.EQUAL);break;case Vc:n.depthFunc(n.GEQUAL);break;case Gc:n.depthFunc(n.GREATER);break;case Wc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ut=At}},setLocked:function(At){B=At},setClear:function(At){Ct!==At&&(wt&&(At=1-At),n.clearDepth(At),Ct=At)},reset:function(){B=!1,at=null,ut=null,Ct=null,wt=!1}}}function s(){let B=!1,wt=null,at=null,ut=null,Ct=null,At=null,ee=null,Re=null,Ye=null;return{setTest:function(xe){B||(xe?mt(n.STENCIL_TEST):Pt(n.STENCIL_TEST))},setMask:function(xe){wt!==xe&&!B&&(n.stencilMask(xe),wt=xe)},setFunc:function(xe,Nn,mi){(at!==xe||ut!==Nn||Ct!==mi)&&(n.stencilFunc(xe,Nn,mi),at=xe,ut=Nn,Ct=mi)},setOp:function(xe,Nn,mi){(At!==xe||ee!==Nn||Re!==mi)&&(n.stencilOp(xe,Nn,mi),At=xe,ee=Nn,Re=mi)},setLocked:function(xe){B=xe},setClear:function(xe){Ye!==xe&&(n.clearStencil(xe),Ye=xe)},reset:function(){B=!1,wt=null,at=null,ut=null,Ct=null,At=null,ee=null,Re=null,Ye=null}}}const r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},h={},p=new WeakMap,f=[],_=null,g=!1,m=null,d=null,w=null,M=null,x=null,I=null,C=null,A=new le(0,0,0),D=0,T=!1,y=null,R=null,j=null,k=null,Z=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,z=0;const L=n.getParameter(n.VERSION);L.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(L)[1]),$=z>=1):L.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),$=z>=2);let et=null,ot={};const ht=n.getParameter(n.SCISSOR_BOX),yt=n.getParameter(n.VIEWPORT),St=new Pe().fromArray(ht),W=new Pe().fromArray(yt);function ct(B,wt,at,ut){const Ct=new Uint8Array(4),At=n.createTexture();n.bindTexture(B,At),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ee=0;ee<at;ee++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(wt,0,n.RGBA,1,1,ut,0,n.RGBA,n.UNSIGNED_BYTE,Ct):n.texImage2D(wt+ee,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ct);return At}const xt={};xt[n.TEXTURE_2D]=ct(n.TEXTURE_2D,n.TEXTURE_2D,1),xt[n.TEXTURE_CUBE_MAP]=ct(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[n.TEXTURE_2D_ARRAY]=ct(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xt[n.TEXTURE_3D]=ct(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),mt(n.DEPTH_TEST),a.setFunc(Mr),N(!1),X(Uh),mt(n.CULL_FACE),S(Ji);function mt(B){u[B]!==!0&&(n.enable(B),u[B]=!0)}function Pt(B){u[B]!==!1&&(n.disable(B),u[B]=!1)}function Xt(B,wt){return h[B]!==wt?(n.bindFramebuffer(B,wt),h[B]=wt,B===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=wt),B===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=wt),!0):!1}function It(B,wt){let at=f,ut=!1;if(B){at=p.get(wt),at===void 0&&(at=[],p.set(wt,at));const Ct=B.textures;if(at.length!==Ct.length||at[0]!==n.COLOR_ATTACHMENT0){for(let At=0,ee=Ct.length;At<ee;At++)at[At]=n.COLOR_ATTACHMENT0+At;at.length=Ct.length,ut=!0}}else at[0]!==n.BACK&&(at[0]=n.BACK,ut=!0);ut&&n.drawBuffers(at)}function Dt(B){return _!==B?(n.useProgram(B),_=B,!0):!1}const Ot={[_s]:n.FUNC_ADD,[Sg]:n.FUNC_SUBTRACT,[Mg]:n.FUNC_REVERSE_SUBTRACT};Ot[Eg]=n.MIN,Ot[bg]=n.MAX;const Bt={[Tg]:n.ZERO,[wg]:n.ONE,[Ag]:n.SRC_COLOR,[Fc]:n.SRC_ALPHA,[Ig]:n.SRC_ALPHA_SATURATE,[Dg]:n.DST_COLOR,[Cg]:n.DST_ALPHA,[Rg]:n.ONE_MINUS_SRC_COLOR,[Oc]:n.ONE_MINUS_SRC_ALPHA,[Lg]:n.ONE_MINUS_DST_COLOR,[Pg]:n.ONE_MINUS_DST_ALPHA,[Ug]:n.CONSTANT_COLOR,[Ng]:n.ONE_MINUS_CONSTANT_COLOR,[Fg]:n.CONSTANT_ALPHA,[Og]:n.ONE_MINUS_CONSTANT_ALPHA};function S(B,wt,at,ut,Ct,At,ee,Re,Ye,xe){if(B===Ji){g===!0&&(Pt(n.BLEND),g=!1);return}if(g===!1&&(mt(n.BLEND),g=!0),B!==yg){if(B!==m||xe!==T){if((d!==_s||x!==_s)&&(n.blendEquation(n.FUNC_ADD),d=_s,x=_s),xe)switch(B){case or:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nh:n.blendFunc(n.ONE,n.ONE);break;case Fh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Oh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case or:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nh:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Fh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Oh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}w=null,M=null,I=null,C=null,A.set(0,0,0),D=0,m=B,T=xe}return}Ct=Ct||wt,At=At||at,ee=ee||ut,(wt!==d||Ct!==x)&&(n.blendEquationSeparate(Ot[wt],Ot[Ct]),d=wt,x=Ct),(at!==w||ut!==M||At!==I||ee!==C)&&(n.blendFuncSeparate(Bt[at],Bt[ut],Bt[At],Bt[ee]),w=at,M=ut,I=At,C=ee),(Re.equals(A)===!1||Ye!==D)&&(n.blendColor(Re.r,Re.g,Re.b,Ye),A.copy(Re),D=Ye),m=B,T=!1}function ft(B,wt){B.side===Ti?Pt(n.CULL_FACE):mt(n.CULL_FACE);let at=B.side===un;wt&&(at=!at),N(at),B.blending===or&&B.transparent===!1?S(Ji):S(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const ut=B.stencilWrite;o.setTest(ut),ut&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),J(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?mt(n.SAMPLE_ALPHA_TO_COVERAGE):Pt(n.SAMPLE_ALPHA_TO_COVERAGE)}function N(B){y!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),y=B)}function X(B){B!==gg?(mt(n.CULL_FACE),B!==R&&(B===Uh?n.cullFace(n.BACK):B===vg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pt(n.CULL_FACE),R=B}function U(B){B!==j&&($&&n.lineWidth(B),j=B)}function J(B,wt,at){B?(mt(n.POLYGON_OFFSET_FILL),(k!==wt||Z!==at)&&(n.polygonOffset(wt,at),k=wt,Z=at)):Pt(n.POLYGON_OFFSET_FILL)}function q(B){B?mt(n.SCISSOR_TEST):Pt(n.SCISSOR_TEST)}function E(B){B===void 0&&(B=n.TEXTURE0+K-1),et!==B&&(n.activeTexture(B),et=B)}function v(B,wt,at){at===void 0&&(et===null?at=n.TEXTURE0+K-1:at=et);let ut=ot[at];ut===void 0&&(ut={type:void 0,texture:void 0},ot[at]=ut),(ut.type!==B||ut.texture!==wt)&&(et!==at&&(n.activeTexture(at),et=at),n.bindTexture(B,wt||xt[B]),ut.type=B,ut.texture=wt)}function F(){const B=ot[et];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Y(){try{n.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function nt(){try{n.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Q(){try{n.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function dt(){try{n.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function lt(){try{n.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _t(){try{n.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function zt(){try{n.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function gt(){try{n.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Tt(){try{n.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Gt(){try{n.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function $t(B){St.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),St.copy(B))}function Lt(B){W.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),W.copy(B))}function oe(B,wt){let at=c.get(wt);at===void 0&&(at=new WeakMap,c.set(wt,at));let ut=at.get(B);ut===void 0&&(ut=n.getUniformBlockIndex(wt,B.name),at.set(B,ut))}function te(B,wt){const ut=c.get(wt).get(B);l.get(wt)!==ut&&(n.uniformBlockBinding(wt,ut,B.__bindingPointIndex),l.set(wt,ut))}function Me(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},et=null,ot={},h={},p=new WeakMap,f=[],_=null,g=!1,m=null,d=null,w=null,M=null,x=null,I=null,C=null,A=new le(0,0,0),D=0,T=!1,y=null,R=null,j=null,k=null,Z=null,St.set(0,0,n.canvas.width,n.canvas.height),W.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:mt,disable:Pt,bindFramebuffer:Xt,drawBuffers:It,useProgram:Dt,setBlending:S,setMaterial:ft,setFlipSided:N,setCullFace:X,setLineWidth:U,setPolygonOffset:J,setScissorTest:q,activeTexture:E,bindTexture:v,unbindTexture:F,compressedTexImage2D:Y,compressedTexImage3D:nt,texImage2D:Tt,texImage3D:Gt,updateUBOMapping:oe,uniformBlockBinding:te,texStorage2D:zt,texStorage3D:gt,texSubImage2D:Q,texSubImage3D:dt,compressedTexSubImage2D:lt,compressedTexSubImage3D:_t,scissor:$t,viewport:Lt,reset:Me}}function eE(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Mt,u=new WeakMap;let h;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,v){return f?new OffscreenCanvas(E,v):Qo("canvas")}function g(E,v,F){let Y=1;const nt=q(E);if((nt.width>F||nt.height>F)&&(Y=F/Math.max(nt.width,nt.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Q=Math.floor(Y*nt.width),dt=Math.floor(Y*nt.height);h===void 0&&(h=_(Q,dt));const lt=v?_(Q,dt):h;return lt.width=Q,lt.height=dt,lt.getContext("2d").drawImage(E,0,0,Q,dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+Q+"x"+dt+")."),lt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),E;return E}function m(E){return E.generateMipmaps}function d(E){n.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(E,v,F,Y,nt=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Q=v;if(v===n.RED&&(F===n.FLOAT&&(Q=n.R32F),F===n.HALF_FLOAT&&(Q=n.R16F),F===n.UNSIGNED_BYTE&&(Q=n.R8)),v===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.R8UI),F===n.UNSIGNED_SHORT&&(Q=n.R16UI),F===n.UNSIGNED_INT&&(Q=n.R32UI),F===n.BYTE&&(Q=n.R8I),F===n.SHORT&&(Q=n.R16I),F===n.INT&&(Q=n.R32I)),v===n.RG&&(F===n.FLOAT&&(Q=n.RG32F),F===n.HALF_FLOAT&&(Q=n.RG16F),F===n.UNSIGNED_BYTE&&(Q=n.RG8)),v===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RG8UI),F===n.UNSIGNED_SHORT&&(Q=n.RG16UI),F===n.UNSIGNED_INT&&(Q=n.RG32UI),F===n.BYTE&&(Q=n.RG8I),F===n.SHORT&&(Q=n.RG16I),F===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),F===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),F===n.UNSIGNED_INT&&(Q=n.RGB32UI),F===n.BYTE&&(Q=n.RGB8I),F===n.SHORT&&(Q=n.RGB16I),F===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),F===n.UNSIGNED_INT&&(Q=n.RGBA32UI),F===n.BYTE&&(Q=n.RGBA8I),F===n.SHORT&&(Q=n.RGBA16I),F===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&F===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),v===n.RGBA){const dt=nt?Ko:me.getTransfer(Y);F===n.FLOAT&&(Q=n.RGBA32F),F===n.HALF_FLOAT&&(Q=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Q=dt===ye?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function x(E,v){let F;return E?v===null||v===Ds||v===xa?F=n.DEPTH24_STENCIL8:v===Ri?F=n.DEPTH32F_STENCIL8:v===va&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ds||v===xa?F=n.DEPTH_COMPONENT24:v===Ri?F=n.DEPTH_COMPONENT32F:v===va&&(F=n.DEPTH_COMPONENT16),F}function I(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Yn&&E.minFilter!==ai?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function C(E){const v=E.target;v.removeEventListener("dispose",C),D(v),v.isVideoTexture&&u.delete(v)}function A(E){const v=E.target;v.removeEventListener("dispose",A),y(v)}function D(E){const v=i.get(E);if(v.__webglInit===void 0)return;const F=E.source,Y=p.get(F);if(Y){const nt=Y[v.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&T(E),Object.keys(Y).length===0&&p.delete(F)}i.remove(E)}function T(E){const v=i.get(E);n.deleteTexture(v.__webglTexture);const F=E.source,Y=p.get(F);delete Y[v.__cacheKey],a.memory.textures--}function y(E){const v=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let nt=0;nt<v.__webglFramebuffer[Y].length;nt++)n.deleteFramebuffer(v.__webglFramebuffer[Y][nt]);else n.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)n.deleteFramebuffer(v.__webglFramebuffer[Y]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=E.textures;for(let Y=0,nt=F.length;Y<nt;Y++){const Q=i.get(F[Y]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),a.memory.textures--),i.remove(F[Y])}i.remove(E)}let R=0;function j(){R=0}function k(){const E=R;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),R+=1,E}function Z(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function K(E,v){const F=i.get(E);if(E.isVideoTexture&&U(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){const Y=E.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(F,E,v);return}}e.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+v)}function $(E,v){const F=i.get(E);if(E.version>0&&F.__version!==E.version){W(F,E,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+v)}function z(E,v){const F=i.get(E);if(E.version>0&&F.__version!==E.version){W(F,E,v);return}e.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+v)}function L(E,v){const F=i.get(E);if(E.version>0&&F.__version!==E.version){ct(F,E,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+v)}const et={[Yc]:n.REPEAT,[Ss]:n.CLAMP_TO_EDGE,[$c]:n.MIRRORED_REPEAT},ot={[Yn]:n.NEAREST,[Yg]:n.NEAREST_MIPMAP_NEAREST,[eo]:n.NEAREST_MIPMAP_LINEAR,[ai]:n.LINEAR,[Pl]:n.LINEAR_MIPMAP_NEAREST,[Ms]:n.LINEAR_MIPMAP_LINEAR},ht={[Kg]:n.NEVER,[iv]:n.ALWAYS,[Jg]:n.LESS,[dp]:n.LEQUAL,[Qg]:n.EQUAL,[nv]:n.GEQUAL,[tv]:n.GREATER,[ev]:n.NOTEQUAL};function yt(E,v){if(v.type===Ri&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===ai||v.magFilter===Pl||v.magFilter===eo||v.magFilter===Ms||v.minFilter===ai||v.minFilter===Pl||v.minFilter===eo||v.minFilter===Ms)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,et[v.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,et[v.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,et[v.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,ot[v.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,ot[v.minFilter]),v.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,ht[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Yn||v.minFilter!==eo&&v.minFilter!==Ms||v.type===Ri&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function St(E,v){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",C));const Y=v.source;let nt=p.get(Y);nt===void 0&&(nt={},p.set(Y,nt));const Q=Z(v);if(Q!==E.__cacheKey){nt[Q]===void 0&&(nt[Q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),nt[Q].usedTimes++;const dt=nt[E.__cacheKey];dt!==void 0&&(nt[E.__cacheKey].usedTimes--,dt.usedTimes===0&&T(v)),E.__cacheKey=Q,E.__webglTexture=nt[Q].texture}return F}function W(E,v,F){let Y=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=n.TEXTURE_3D);const nt=St(E,v),Q=v.source;e.bindTexture(Y,E.__webglTexture,n.TEXTURE0+F);const dt=i.get(Q);if(Q.version!==dt.__version||nt===!0){e.activeTexture(n.TEXTURE0+F);const lt=me.getPrimaries(me.workingColorSpace),_t=v.colorSpace===qi?null:me.getPrimaries(v.colorSpace),zt=v.colorSpace===qi||lt===_t?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let gt=g(v.image,!1,s.maxTextureSize);gt=J(v,gt);const Tt=r.convert(v.format,v.colorSpace),Gt=r.convert(v.type);let $t=M(v.internalFormat,Tt,Gt,v.colorSpace,v.isVideoTexture);yt(Y,v);let Lt;const oe=v.mipmaps,te=v.isVideoTexture!==!0,Me=dt.__version===void 0||nt===!0,B=Q.dataReady,wt=I(v,gt);if(v.isDepthTexture)$t=x(v.format===Sa,v.type),Me&&(te?e.texStorage2D(n.TEXTURE_2D,1,$t,gt.width,gt.height):e.texImage2D(n.TEXTURE_2D,0,$t,gt.width,gt.height,0,Tt,Gt,null));else if(v.isDataTexture)if(oe.length>0){te&&Me&&e.texStorage2D(n.TEXTURE_2D,wt,$t,oe[0].width,oe[0].height);for(let at=0,ut=oe.length;at<ut;at++)Lt=oe[at],te?B&&e.texSubImage2D(n.TEXTURE_2D,at,0,0,Lt.width,Lt.height,Tt,Gt,Lt.data):e.texImage2D(n.TEXTURE_2D,at,$t,Lt.width,Lt.height,0,Tt,Gt,Lt.data);v.generateMipmaps=!1}else te?(Me&&e.texStorage2D(n.TEXTURE_2D,wt,$t,gt.width,gt.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt.width,gt.height,Tt,Gt,gt.data)):e.texImage2D(n.TEXTURE_2D,0,$t,gt.width,gt.height,0,Tt,Gt,gt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){te&&Me&&e.texStorage3D(n.TEXTURE_2D_ARRAY,wt,$t,oe[0].width,oe[0].height,gt.depth);for(let at=0,ut=oe.length;at<ut;at++)if(Lt=oe[at],v.format!==Xn)if(Tt!==null)if(te){if(B)if(v.layerUpdates.size>0){const Ct=xf(Lt.width,Lt.height,v.format,v.type);for(const At of v.layerUpdates){const ee=Lt.data.subarray(At*Ct/Lt.data.BYTES_PER_ELEMENT,(At+1)*Ct/Lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,at,0,0,At,Lt.width,Lt.height,1,Tt,ee)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,at,0,0,0,Lt.width,Lt.height,gt.depth,Tt,Lt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,at,$t,Lt.width,Lt.height,gt.depth,0,Lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else te?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,at,0,0,0,Lt.width,Lt.height,gt.depth,Tt,Gt,Lt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,at,$t,Lt.width,Lt.height,gt.depth,0,Tt,Gt,Lt.data)}else{te&&Me&&e.texStorage2D(n.TEXTURE_2D,wt,$t,oe[0].width,oe[0].height);for(let at=0,ut=oe.length;at<ut;at++)Lt=oe[at],v.format!==Xn?Tt!==null?te?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,at,0,0,Lt.width,Lt.height,Tt,Lt.data):e.compressedTexImage2D(n.TEXTURE_2D,at,$t,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?B&&e.texSubImage2D(n.TEXTURE_2D,at,0,0,Lt.width,Lt.height,Tt,Gt,Lt.data):e.texImage2D(n.TEXTURE_2D,at,$t,Lt.width,Lt.height,0,Tt,Gt,Lt.data)}else if(v.isDataArrayTexture)if(te){if(Me&&e.texStorage3D(n.TEXTURE_2D_ARRAY,wt,$t,gt.width,gt.height,gt.depth),B)if(v.layerUpdates.size>0){const at=xf(gt.width,gt.height,v.format,v.type);for(const ut of v.layerUpdates){const Ct=gt.data.subarray(ut*at/gt.data.BYTES_PER_ELEMENT,(ut+1)*at/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ut,gt.width,gt.height,1,Tt,Gt,Ct)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Tt,Gt,gt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,$t,gt.width,gt.height,gt.depth,0,Tt,Gt,gt.data);else if(v.isData3DTexture)te?(Me&&e.texStorage3D(n.TEXTURE_3D,wt,$t,gt.width,gt.height,gt.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Tt,Gt,gt.data)):e.texImage3D(n.TEXTURE_3D,0,$t,gt.width,gt.height,gt.depth,0,Tt,Gt,gt.data);else if(v.isFramebufferTexture){if(Me)if(te)e.texStorage2D(n.TEXTURE_2D,wt,$t,gt.width,gt.height);else{let at=gt.width,ut=gt.height;for(let Ct=0;Ct<wt;Ct++)e.texImage2D(n.TEXTURE_2D,Ct,$t,at,ut,0,Tt,Gt,null),at>>=1,ut>>=1}}else if(oe.length>0){if(te&&Me){const at=q(oe[0]);e.texStorage2D(n.TEXTURE_2D,wt,$t,at.width,at.height)}for(let at=0,ut=oe.length;at<ut;at++)Lt=oe[at],te?B&&e.texSubImage2D(n.TEXTURE_2D,at,0,0,Tt,Gt,Lt):e.texImage2D(n.TEXTURE_2D,at,$t,Tt,Gt,Lt);v.generateMipmaps=!1}else if(te){if(Me){const at=q(gt);e.texStorage2D(n.TEXTURE_2D,wt,$t,at.width,at.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Tt,Gt,gt)}else e.texImage2D(n.TEXTURE_2D,0,$t,Tt,Gt,gt);m(v)&&d(Y),dt.__version=Q.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ct(E,v,F){if(v.image.length!==6)return;const Y=St(E,v),nt=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+F);const Q=i.get(nt);if(nt.version!==Q.__version||Y===!0){e.activeTexture(n.TEXTURE0+F);const dt=me.getPrimaries(me.workingColorSpace),lt=v.colorSpace===qi?null:me.getPrimaries(v.colorSpace),_t=v.colorSpace===qi||dt===lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const zt=v.isCompressedTexture||v.image[0].isCompressedTexture,gt=v.image[0]&&v.image[0].isDataTexture,Tt=[];for(let ut=0;ut<6;ut++)!zt&&!gt?Tt[ut]=g(v.image[ut],!0,s.maxCubemapSize):Tt[ut]=gt?v.image[ut].image:v.image[ut],Tt[ut]=J(v,Tt[ut]);const Gt=Tt[0],$t=r.convert(v.format,v.colorSpace),Lt=r.convert(v.type),oe=M(v.internalFormat,$t,Lt,v.colorSpace),te=v.isVideoTexture!==!0,Me=Q.__version===void 0||Y===!0,B=nt.dataReady;let wt=I(v,Gt);yt(n.TEXTURE_CUBE_MAP,v);let at;if(zt){te&&Me&&e.texStorage2D(n.TEXTURE_CUBE_MAP,wt,oe,Gt.width,Gt.height);for(let ut=0;ut<6;ut++){at=Tt[ut].mipmaps;for(let Ct=0;Ct<at.length;Ct++){const At=at[Ct];v.format!==Xn?$t!==null?te?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ct,0,0,At.width,At.height,$t,At.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ct,oe,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):te?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ct,0,0,At.width,At.height,$t,Lt,At.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ct,oe,At.width,At.height,0,$t,Lt,At.data)}}}else{if(at=v.mipmaps,te&&Me){at.length>0&&wt++;const ut=q(Tt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,wt,oe,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(gt){te?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Tt[ut].width,Tt[ut].height,$t,Lt,Tt[ut].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,oe,Tt[ut].width,Tt[ut].height,0,$t,Lt,Tt[ut].data);for(let Ct=0;Ct<at.length;Ct++){const ee=at[Ct].image[ut].image;te?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ct+1,0,0,ee.width,ee.height,$t,Lt,ee.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ct+1,oe,ee.width,ee.height,0,$t,Lt,ee.data)}}else{te?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,$t,Lt,Tt[ut]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,oe,$t,Lt,Tt[ut]);for(let Ct=0;Ct<at.length;Ct++){const At=at[Ct];te?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ct+1,0,0,$t,Lt,At.image[ut]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ct+1,oe,$t,Lt,At.image[ut])}}}m(v)&&d(n.TEXTURE_CUBE_MAP),Q.__version=nt.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function xt(E,v,F,Y,nt,Q){const dt=r.convert(F.format,F.colorSpace),lt=r.convert(F.type),_t=M(F.internalFormat,dt,lt,F.colorSpace),zt=i.get(v),gt=i.get(F);if(gt.__renderTarget=v,!zt.__hasExternalTextures){const Tt=Math.max(1,v.width>>Q),Gt=Math.max(1,v.height>>Q);nt===n.TEXTURE_3D||nt===n.TEXTURE_2D_ARRAY?e.texImage3D(nt,Q,_t,Tt,Gt,v.depth,0,dt,lt,null):e.texImage2D(nt,Q,_t,Tt,Gt,0,dt,lt,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),X(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,nt,gt.__webglTexture,0,N(v)):(nt===n.TEXTURE_2D||nt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,nt,gt.__webglTexture,Q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function mt(E,v,F){if(n.bindRenderbuffer(n.RENDERBUFFER,E),v.depthBuffer){const Y=v.depthTexture,nt=Y&&Y.isDepthTexture?Y.type:null,Q=x(v.stencilBuffer,nt),dt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=N(v);X(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,lt,Q,v.width,v.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,lt,Q,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Q,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,dt,n.RENDERBUFFER,E)}else{const Y=v.textures;for(let nt=0;nt<Y.length;nt++){const Q=Y[nt],dt=r.convert(Q.format,Q.colorSpace),lt=r.convert(Q.type),_t=M(Q.internalFormat,dt,lt,Q.colorSpace),zt=N(v);F&&X(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,zt,_t,v.width,v.height):X(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,zt,_t,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,_t,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Pt(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(v.depthTexture);Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const nt=Y.__webglTexture,Q=N(v);if(v.depthTexture.format===ya)X(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,nt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,nt,0);else if(v.depthTexture.format===Sa)X(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,nt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function Xt(E){const v=i.get(E),F=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const Y=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const nt=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",nt)};Y.addEventListener("dispose",nt),v.__depthDisposeCallback=nt}v.__boundDepthTexture=Y}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Pt(v.__webglFramebuffer,E)}else if(F){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=n.createRenderbuffer(),mt(v.__webglDepthbuffer[Y],E,!1);else{const nt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),mt(v.__webglDepthbuffer,E,!1);else{const Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,nt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,nt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function It(E,v,F){const Y=i.get(E);v!==void 0&&xt(Y.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Xt(E)}function Dt(E){const v=E.texture,F=i.get(E),Y=i.get(v);E.addEventListener("dispose",A);const nt=E.textures,Q=E.isWebGLCubeRenderTarget===!0,dt=nt.length>1;if(dt||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=v.version,a.memory.textures++),Q){F.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[lt]=[];for(let _t=0;_t<v.mipmaps.length;_t++)F.__webglFramebuffer[lt][_t]=n.createFramebuffer()}else F.__webglFramebuffer[lt]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let lt=0;lt<v.mipmaps.length;lt++)F.__webglFramebuffer[lt]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(dt)for(let lt=0,_t=nt.length;lt<_t;lt++){const zt=i.get(nt[lt]);zt.__webglTexture===void 0&&(zt.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&X(E)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let lt=0;lt<nt.length;lt++){const _t=nt[lt];F.__webglColorRenderbuffer[lt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[lt]);const zt=r.convert(_t.format,_t.colorSpace),gt=r.convert(_t.type),Tt=M(_t.internalFormat,zt,gt,_t.colorSpace,E.isXRRenderTarget===!0),Gt=N(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Gt,Tt,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,F.__webglColorRenderbuffer[lt])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),mt(F.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),yt(n.TEXTURE_CUBE_MAP,v);for(let lt=0;lt<6;lt++)if(v.mipmaps&&v.mipmaps.length>0)for(let _t=0;_t<v.mipmaps.length;_t++)xt(F.__webglFramebuffer[lt][_t],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,_t);else xt(F.__webglFramebuffer[lt],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(v)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let lt=0,_t=nt.length;lt<_t;lt++){const zt=nt[lt],gt=i.get(zt);e.bindTexture(n.TEXTURE_2D,gt.__webglTexture),yt(n.TEXTURE_2D,zt),xt(F.__webglFramebuffer,E,zt,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,0),m(zt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let lt=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(lt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,Y.__webglTexture),yt(lt,v),v.mipmaps&&v.mipmaps.length>0)for(let _t=0;_t<v.mipmaps.length;_t++)xt(F.__webglFramebuffer[_t],E,v,n.COLOR_ATTACHMENT0,lt,_t);else xt(F.__webglFramebuffer,E,v,n.COLOR_ATTACHMENT0,lt,0);m(v)&&d(lt),e.unbindTexture()}E.depthBuffer&&Xt(E)}function Ot(E){const v=E.textures;for(let F=0,Y=v.length;F<Y;F++){const nt=v[F];if(m(nt)){const Q=w(E),dt=i.get(nt).__webglTexture;e.bindTexture(Q,dt),d(Q),e.unbindTexture()}}}const Bt=[],S=[];function ft(E){if(E.samples>0){if(X(E)===!1){const v=E.textures,F=E.width,Y=E.height;let nt=n.COLOR_BUFFER_BIT;const Q=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=i.get(E),lt=v.length>1;if(lt)for(let _t=0;_t<v.length;_t++)e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let _t=0;_t<v.length;_t++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(nt|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(nt|=n.STENCIL_BUFFER_BIT)),lt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,dt.__webglColorRenderbuffer[_t]);const zt=i.get(v[_t]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,zt,0)}n.blitFramebuffer(0,0,F,Y,0,0,F,Y,nt,n.NEAREST),l===!0&&(Bt.length=0,S.length=0,Bt.push(n.COLOR_ATTACHMENT0+_t),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Bt.push(Q),S.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,S)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),lt)for(let _t=0;_t<v.length;_t++){e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,dt.__webglColorRenderbuffer[_t]);const zt=i.get(v[_t]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,zt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const v=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function N(E){return Math.min(s.maxSamples,E.samples)}function X(E){const v=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(E){const v=a.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function J(E,v){const F=E.colorSpace,Y=E.format,nt=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==Tr&&F!==qi&&(me.getTransfer(F)===ye?(Y!==Xn||nt!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function q(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=j,this.setTexture2D=K,this.setTexture2DArray=$,this.setTexture3D=z,this.setTextureCube=L,this.rebindTextures=It,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=X}function nE(n,t){function e(i,s=qi){let r;const a=me.getTransfer(s);if(i===Ui)return n.UNSIGNED_BYTE;if(i===ju)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Zu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===sp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===np)return n.BYTE;if(i===ip)return n.SHORT;if(i===va)return n.UNSIGNED_SHORT;if(i===$u)return n.INT;if(i===Ds)return n.UNSIGNED_INT;if(i===Ri)return n.FLOAT;if(i===Za)return n.HALF_FLOAT;if(i===rp)return n.ALPHA;if(i===ap)return n.RGB;if(i===Xn)return n.RGBA;if(i===op)return n.LUMINANCE;if(i===lp)return n.LUMINANCE_ALPHA;if(i===ya)return n.DEPTH_COMPONENT;if(i===Sa)return n.DEPTH_STENCIL;if(i===cp)return n.RED;if(i===Ku)return n.RED_INTEGER;if(i===up)return n.RG;if(i===Ju)return n.RG_INTEGER;if(i===Qu)return n.RGBA_INTEGER;if(i===Bo||i===ko||i===zo||i===Ho)if(a===ye)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Bo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Bo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ko)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jc||i===Zc||i===Kc||i===Jc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===jc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Zc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Kc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Jc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qc||i===tu||i===eu)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Qc||i===tu)return a===ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===eu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===nu||i===iu||i===su||i===ru||i===au||i===ou||i===lu||i===cu||i===uu||i===hu||i===fu||i===du||i===pu||i===mu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===nu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===iu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===su)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ru)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===au)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ou)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===lu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===cu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===uu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===hu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===du)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===pu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===mu)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Vo||i===_u||i===gu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Vo)return a===ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_u)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===gu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hp||i===vu||i===xu||i===yu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===vu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xa?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const iE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new hn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new rs({vertexShader:iE,fragmentShader:sE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new oi(new ml(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class aE extends Os{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,p=null,f=null,_=null;const g=new rE,m=e.getContextAttributes();let d=null,w=null;const M=[],x=[],I=new Mt;let C=null;const A=new Vn;A.viewport=new Pe;const D=new Vn;D.viewport=new Pe;const T=[A,D],y=new b0;let R=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ct=M[W];return ct===void 0&&(ct=new Kl,M[W]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(W){let ct=M[W];return ct===void 0&&(ct=new Kl,M[W]=ct),ct.getGripSpace()},this.getHand=function(W){let ct=M[W];return ct===void 0&&(ct=new Kl,M[W]=ct),ct.getHandSpace()};function k(W){const ct=x.indexOf(W.inputSource);if(ct===-1)return;const xt=M[ct];xt!==void 0&&(xt.update(W.inputSource,W.frame,c||a),xt.dispatchEvent({type:W.type,data:W.inputSource}))}function Z(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",K);for(let W=0;W<M.length;W++){const ct=x[W];ct!==null&&(x[W]=null,M[W].disconnect(ct))}R=null,j=null,g.reset(),t.setRenderTarget(d),f=null,p=null,h=null,s=null,w=null,St.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(I),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,mt=null,Pt=null;m.depth&&(Pt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=m.stencil?Sa:ya,mt=m.stencil?xa:Ds);const Xt={colorFormat:e.RGBA8,depthFormat:Pt,scaleFactor:r};h=new XRWebGLBinding(s,e),p=h.createProjectionLayer(Xt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),w=new Ls(p.textureWidth,p.textureHeight,{format:Xn,type:Ui,depthTexture:new bp(p.textureWidth,p.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const xt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new Ls(f.framebufferWidth,f.framebufferHeight,{format:Xn,type:Ui,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),St.setContext(s),St.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(W){for(let ct=0;ct<W.removed.length;ct++){const xt=W.removed[ct],mt=x.indexOf(xt);mt>=0&&(x[mt]=null,M[mt].disconnect(xt))}for(let ct=0;ct<W.added.length;ct++){const xt=W.added[ct];let mt=x.indexOf(xt);if(mt===-1){for(let Xt=0;Xt<M.length;Xt++)if(Xt>=x.length){x.push(xt),mt=Xt;break}else if(x[Xt]===null){x[Xt]=xt,mt=Xt;break}if(mt===-1)break}const Pt=M[mt];Pt&&Pt.connect(xt)}}const $=new O,z=new O;function L(W,ct,xt){$.setFromMatrixPosition(ct.matrixWorld),z.setFromMatrixPosition(xt.matrixWorld);const mt=$.distanceTo(z),Pt=ct.projectionMatrix.elements,Xt=xt.projectionMatrix.elements,It=Pt[14]/(Pt[10]-1),Dt=Pt[14]/(Pt[10]+1),Ot=(Pt[9]+1)/Pt[5],Bt=(Pt[9]-1)/Pt[5],S=(Pt[8]-1)/Pt[0],ft=(Xt[8]+1)/Xt[0],N=It*S,X=It*ft,U=mt/(-S+ft),J=U*-S;if(ct.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(J),W.translateZ(U),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Pt[10]===-1)W.projectionMatrix.copy(ct.projectionMatrix),W.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{const q=It+U,E=Dt+U,v=N-J,F=X+(mt-J),Y=Ot*Dt/E*q,nt=Bt*Dt/E*q;W.projectionMatrix.makePerspective(v,F,Y,nt,q,E),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function et(W,ct){ct===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ct.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let ct=W.near,xt=W.far;g.texture!==null&&(g.depthNear>0&&(ct=g.depthNear),g.depthFar>0&&(xt=g.depthFar)),y.near=D.near=A.near=ct,y.far=D.far=A.far=xt,(R!==y.near||j!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,j=y.far),A.layers.mask=W.layers.mask|2,D.layers.mask=W.layers.mask|4,y.layers.mask=A.layers.mask|D.layers.mask;const mt=W.parent,Pt=y.cameras;et(y,mt);for(let Xt=0;Xt<Pt.length;Xt++)et(Pt[Xt],mt);Pt.length===2?L(y,A,D):y.projectionMatrix.copy(A.projectionMatrix),ot(W,y,mt)};function ot(W,ct,xt){xt===null?W.matrix.copy(ct.matrixWorld):(W.matrix.copy(xt.matrixWorld),W.matrix.invert(),W.matrix.multiply(ct.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ct.projectionMatrix),W.projectionMatrixInverse.copy(ct.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Su*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(W){l=W,p!==null&&(p.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(y)};let ht=null;function yt(W,ct){if(u=ct.getViewerPose(c||a),_=ct,u!==null){const xt=u.views;f!==null&&(t.setRenderTargetFramebuffer(w,f.framebuffer),t.setRenderTarget(w));let mt=!1;xt.length!==y.cameras.length&&(y.cameras.length=0,mt=!0);for(let It=0;It<xt.length;It++){const Dt=xt[It];let Ot=null;if(f!==null)Ot=f.getViewport(Dt);else{const S=h.getViewSubImage(p,Dt);Ot=S.viewport,It===0&&(t.setRenderTargetTextures(w,S.colorTexture,S.depthStencilTexture),t.setRenderTarget(w))}let Bt=T[It];Bt===void 0&&(Bt=new Vn,Bt.layers.enable(It),Bt.viewport=new Pe,T[It]=Bt),Bt.matrix.fromArray(Dt.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(Dt.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),It===0&&(y.matrix.copy(Bt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),mt===!0&&y.cameras.push(Bt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const It=h.getDepthInformation(xt[0]);It&&It.isValid&&It.texture&&g.init(t,It,s.renderState)}}for(let xt=0;xt<M.length;xt++){const mt=x[xt],Pt=M[xt];mt!==null&&Pt!==void 0&&Pt.update(mt,ct,c||a)}ht&&ht(W,ct),ct.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ct}),_=null}const St=new Np;St.setAnimationLoop(yt),this.setAnimationLoop=function(W){ht=W},this.dispose=function(){}}}const ds=new di,oE=new Te;function lE(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,yp(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,w,M,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),p(m,d),d.isMeshPhysicalMaterial&&f(m,d,x)):d.isMeshMatcapMaterial?(r(m,d),_(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),g(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,w,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===un&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===un&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const w=t.get(d),M=w.envMap,x=w.envMapRotation;M&&(m.envMap.value=M,ds.copy(x),ds.x*=-1,ds.y*=-1,ds.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ds.y*=-1,ds.z*=-1),m.envMapRotation.value.setFromMatrix4(oE.makeRotationFromEuler(ds)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,w,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*w,m.scale.value=M*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function p(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function f(m,d,w){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===un&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){const w=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function cE(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,M){const x=M.program;i.uniformBlockBinding(w,x)}function c(w,M){let x=s[w.id];x===void 0&&(_(w),x=u(w),s[w.id]=x,w.addEventListener("dispose",m));const I=M.program;i.updateUBOMapping(w,I);const C=t.render.frame;r[w.id]!==C&&(p(w),r[w.id]=C)}function u(w){const M=h();w.__bindingPointIndex=M;const x=n.createBuffer(),I=w.__size,C=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,I,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,x),x}function h(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(w){const M=s[w.id],x=w.uniforms,I=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let C=0,A=x.length;C<A;C++){const D=Array.isArray(x[C])?x[C]:[x[C]];for(let T=0,y=D.length;T<y;T++){const R=D[T];if(f(R,C,T,I)===!0){const j=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let Z=0;for(let K=0;K<k.length;K++){const $=k[K],z=g($);typeof $=="number"||typeof $=="boolean"?(R.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,j+Z,R.__data)):$.isMatrix3?(R.__data[0]=$.elements[0],R.__data[1]=$.elements[1],R.__data[2]=$.elements[2],R.__data[3]=0,R.__data[4]=$.elements[3],R.__data[5]=$.elements[4],R.__data[6]=$.elements[5],R.__data[7]=0,R.__data[8]=$.elements[6],R.__data[9]=$.elements[7],R.__data[10]=$.elements[8],R.__data[11]=0):($.toArray(R.__data,Z),Z+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,j,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(w,M,x,I){const C=w.value,A=M+"_"+x;if(I[A]===void 0)return typeof C=="number"||typeof C=="boolean"?I[A]=C:I[A]=C.clone(),!0;{const D=I[A];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return I[A]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function _(w){const M=w.uniforms;let x=0;const I=16;for(let A=0,D=M.length;A<D;A++){const T=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,R=T.length;y<R;y++){const j=T[y],k=Array.isArray(j.value)?j.value:[j.value];for(let Z=0,K=k.length;Z<K;Z++){const $=k[Z],z=g($),L=x%I,et=L%z.boundary,ot=L+et;x+=et,ot!==0&&I-ot<z.storage&&(x+=I-ot),j.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=x,x+=z.storage}}}const C=x%I;return C>0&&(x+=I-C),w.__size=x,w.__cache={},this}function g(w){const M={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(M.boundary=4,M.storage=4):w.isVector2?(M.boundary=8,M.storage=8):w.isVector3||w.isColor?(M.boundary=16,M.storage=12):w.isVector4?(M.boundary=16,M.storage=16):w.isMatrix3?(M.boundary=48,M.storage=48):w.isMatrix4?(M.boundary=64,M.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),M}function m(w){const M=w.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(const w in s)n.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class uE{constructor(t={}){const{canvas:e=av(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const w=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let I=!1;this._outputColorSpace=Ln;let C=0,A=0,D=null,T=-1,y=null;const R=new Pe,j=new Pe;let k=null;const Z=new le(0);let K=0,$=e.width,z=e.height,L=1,et=null,ot=null;const ht=new Pe(0,0,$,z),yt=new Pe(0,0,$,z);let St=!1;const W=new nh;let ct=!1,xt=!1;const mt=new Te,Pt=new Te,Xt=new O,It=new Pe,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ot=!1;function Bt(){return D===null?L:1}let S=i;function ft(b,V){return e.getContext(b,V)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Yu}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",At,!1),S===null){const V="webgl2";if(S=ft(V,b),S===null)throw ft(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let N,X,U,J,q,E,v,F,Y,nt,Q,dt,lt,_t,zt,gt,Tt,Gt,$t,Lt,oe,te,Me,B;function wt(){N=new yS(S),N.init(),te=new nE(S,N),X=new dS(S,N,t,te),U=new tE(S,N),X.reverseDepthBuffer&&p&&U.buffers.depth.setReversed(!0),J=new ES(S),q=new HM,E=new eE(S,N,U,q,X,te,J),v=new mS(x),F=new xS(x),Y=new C0(S),Me=new hS(S,Y),nt=new SS(S,Y,J,Me),Q=new TS(S,nt,Y,J),$t=new bS(S,X,E),gt=new pS(q),dt=new zM(x,v,F,N,X,Me,gt),lt=new lE(x,q),_t=new GM,zt=new jM(N),Gt=new uS(x,v,F,U,Q,f,l),Tt=new JM(x,Q,X),B=new cE(S,J,X,U),Lt=new fS(S,N,J),oe=new MS(S,N,J),J.programs=dt.programs,x.capabilities=X,x.extensions=N,x.properties=q,x.renderLists=_t,x.shadowMap=Tt,x.state=U,x.info=J}wt();const at=new aE(x,S);this.xr=at,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){const b=N.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=N.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return L},this.setPixelRatio=function(b){b!==void 0&&(L=b,this.setSize($,z,!1))},this.getSize=function(b){return b.set($,z)},this.setSize=function(b,V,it=!0){if(at.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=b,z=V,e.width=Math.floor(b*L),e.height=Math.floor(V*L),it===!0&&(e.style.width=b+"px",e.style.height=V+"px"),this.setViewport(0,0,b,V)},this.getDrawingBufferSize=function(b){return b.set($*L,z*L).floor()},this.setDrawingBufferSize=function(b,V,it){$=b,z=V,L=it,e.width=Math.floor(b*it),e.height=Math.floor(V*it),this.setViewport(0,0,b,V)},this.getCurrentViewport=function(b){return b.copy(R)},this.getViewport=function(b){return b.copy(ht)},this.setViewport=function(b,V,it,rt){b.isVector4?ht.set(b.x,b.y,b.z,b.w):ht.set(b,V,it,rt),U.viewport(R.copy(ht).multiplyScalar(L).round())},this.getScissor=function(b){return b.copy(yt)},this.setScissor=function(b,V,it,rt){b.isVector4?yt.set(b.x,b.y,b.z,b.w):yt.set(b,V,it,rt),U.scissor(j.copy(yt).multiplyScalar(L).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(b){U.setScissorTest(St=b)},this.setOpaqueSort=function(b){et=b},this.setTransparentSort=function(b){ot=b},this.getClearColor=function(b){return b.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor(...arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha(...arguments)},this.clear=function(b=!0,V=!0,it=!0){let rt=0;if(b){let G=!1;if(D!==null){const vt=D.texture.format;G=vt===Qu||vt===Ju||vt===Ku}if(G){const vt=D.texture.type,bt=vt===Ui||vt===Ds||vt===va||vt===xa||vt===ju||vt===Zu,Nt=Gt.getClearColor(),Ft=Gt.getClearAlpha(),Qt=Nt.r,Kt=Nt.g,Wt=Nt.b;bt?(_[0]=Qt,_[1]=Kt,_[2]=Wt,_[3]=Ft,S.clearBufferuiv(S.COLOR,0,_)):(g[0]=Qt,g[1]=Kt,g[2]=Wt,g[3]=Ft,S.clearBufferiv(S.COLOR,0,g))}else rt|=S.COLOR_BUFFER_BIT}V&&(rt|=S.DEPTH_BUFFER_BIT),it&&(rt|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",At,!1),Gt.dispose(),_t.dispose(),zt.dispose(),q.dispose(),v.dispose(),F.dispose(),Q.dispose(),Me.dispose(),B.dispose(),dt.dispose(),at.dispose(),at.removeEventListener("sessionstart",uh),at.removeEventListener("sessionend",hh),as.stop()};function ut(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const b=J.autoReset,V=Tt.enabled,it=Tt.autoUpdate,rt=Tt.needsUpdate,G=Tt.type;wt(),J.autoReset=b,Tt.enabled=V,Tt.autoUpdate=it,Tt.needsUpdate=rt,Tt.type=G}function At(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ee(b){const V=b.target;V.removeEventListener("dispose",ee),Re(V)}function Re(b){Ye(b),q.remove(b)}function Ye(b){const V=q.get(b).programs;V!==void 0&&(V.forEach(function(it){dt.releaseProgram(it)}),b.isShaderMaterial&&dt.releaseShaderCache(b))}this.renderBufferDirect=function(b,V,it,rt,G,vt){V===null&&(V=Dt);const bt=G.isMesh&&G.matrixWorld.determinant()<0,Nt=Hp(b,V,it,rt,G);U.setMaterial(rt,bt);let Ft=it.index,Qt=1;if(rt.wireframe===!0){if(Ft=nt.getWireframeAttribute(it),Ft===void 0)return;Qt=2}const Kt=it.drawRange,Wt=it.attributes.position;let fe=Kt.start*Qt,ge=(Kt.start+Kt.count)*Qt;vt!==null&&(fe=Math.max(fe,vt.start*Qt),ge=Math.min(ge,(vt.start+vt.count)*Qt)),Ft!==null?(fe=Math.max(fe,0),ge=Math.min(ge,Ft.count)):Wt!=null&&(fe=Math.max(fe,0),ge=Math.min(ge,Wt.count));const Le=ge-fe;if(Le<0||Le===1/0)return;Me.setup(G,rt,Nt,it,Ft);let Ce,pe=Lt;if(Ft!==null&&(Ce=Y.get(Ft),pe=oe,pe.setIndex(Ce)),G.isMesh)rt.wireframe===!0?(U.setLineWidth(rt.wireframeLinewidth*Bt()),pe.setMode(S.LINES)):pe.setMode(S.TRIANGLES);else if(G.isLine){let qt=rt.linewidth;qt===void 0&&(qt=1),U.setLineWidth(qt*Bt()),G.isLineSegments?pe.setMode(S.LINES):G.isLineLoop?pe.setMode(S.LINE_LOOP):pe.setMode(S.LINE_STRIP)}else G.isPoints?pe.setMode(S.POINTS):G.isSprite&&pe.setMode(S.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Go("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pe.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(N.get("WEBGL_multi_draw"))pe.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const qt=G._multiDrawStarts,Ge=G._multiDrawCounts,ve=G._multiDrawCount,Fn=Ft?Y.get(Ft).bytesPerElement:1,Bs=q.get(rt).currentProgram.getUniforms();for(let dn=0;dn<ve;dn++)Bs.setValue(S,"_gl_DrawID",dn),pe.render(qt[dn]/Fn,Ge[dn])}else if(G.isInstancedMesh)pe.renderInstances(fe,Le,G.count);else if(it.isInstancedBufferGeometry){const qt=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,Ge=Math.min(it.instanceCount,qt);pe.renderInstances(fe,Le,Ge)}else pe.render(fe,Le)};function xe(b,V,it){b.transparent===!0&&b.side===Ti&&b.forceSinglePass===!1?(b.side=un,b.needsUpdate=!0,Qa(b,V,it),b.side=ss,b.needsUpdate=!0,Qa(b,V,it),b.side=Ti):Qa(b,V,it)}this.compile=function(b,V,it=null){it===null&&(it=b),d=zt.get(it),d.init(V),M.push(d),it.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),b!==it&&b.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const rt=new Set;return b.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const vt=G.material;if(vt)if(Array.isArray(vt))for(let bt=0;bt<vt.length;bt++){const Nt=vt[bt];xe(Nt,it,G),rt.add(Nt)}else xe(vt,it,G),rt.add(vt)}),d=M.pop(),rt},this.compileAsync=function(b,V,it=null){const rt=this.compile(b,V,it);return new Promise(G=>{function vt(){if(rt.forEach(function(bt){q.get(bt).currentProgram.isReady()&&rt.delete(bt)}),rt.size===0){G(b);return}setTimeout(vt,10)}N.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let Nn=null;function mi(b){Nn&&Nn(b)}function uh(){as.stop()}function hh(){as.start()}const as=new Np;as.setAnimationLoop(mi),typeof self<"u"&&as.setContext(self),this.setAnimationLoop=function(b){Nn=b,at.setAnimationLoop(b),b===null?as.stop():as.start()},at.addEventListener("sessionstart",uh),at.addEventListener("sessionend",hh),this.render=function(b,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(at.cameraAutoUpdate===!0&&at.updateCamera(V),V=at.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,V,D),d=zt.get(b,M.length),d.init(V),M.push(d),Pt.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),W.setFromProjectionMatrix(Pt),xt=this.localClippingEnabled,ct=gt.init(this.clippingPlanes,xt),m=_t.get(b,w.length),m.init(),w.push(m),at.enabled===!0&&at.isPresenting===!0){const vt=x.xr.getDepthSensingMesh();vt!==null&&gl(vt,V,-1/0,x.sortObjects)}gl(b,V,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(et,ot),Ot=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Ot&&Gt.addToRenderList(m,b),this.info.render.frame++,ct===!0&&gt.beginShadows();const it=d.state.shadowsArray;Tt.render(it,b,V),ct===!0&&gt.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=m.opaque,G=m.transmissive;if(d.setupLights(),V.isArrayCamera){const vt=V.cameras;if(G.length>0)for(let bt=0,Nt=vt.length;bt<Nt;bt++){const Ft=vt[bt];dh(rt,G,b,Ft)}Ot&&Gt.render(b);for(let bt=0,Nt=vt.length;bt<Nt;bt++){const Ft=vt[bt];fh(m,b,Ft,Ft.viewport)}}else G.length>0&&dh(rt,G,b,V),Ot&&Gt.render(b),fh(m,b,V);D!==null&&A===0&&(E.updateMultisampleRenderTarget(D),E.updateRenderTargetMipmap(D)),b.isScene===!0&&b.onAfterRender(x,b,V),Me.resetDefaultState(),T=-1,y=null,M.pop(),M.length>0?(d=M[M.length-1],ct===!0&&gt.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function gl(b,V,it,rt){if(b.visible===!1)return;if(b.layers.test(V.layers)){if(b.isGroup)it=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(V);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||W.intersectsSprite(b)){rt&&It.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Pt);const bt=Q.update(b),Nt=b.material;Nt.visible&&m.push(b,bt,Nt,it,It.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||W.intersectsObject(b))){const bt=Q.update(b),Nt=b.material;if(rt&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),It.copy(b.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),It.copy(bt.boundingSphere.center)),It.applyMatrix4(b.matrixWorld).applyMatrix4(Pt)),Array.isArray(Nt)){const Ft=bt.groups;for(let Qt=0,Kt=Ft.length;Qt<Kt;Qt++){const Wt=Ft[Qt],fe=Nt[Wt.materialIndex];fe&&fe.visible&&m.push(b,bt,fe,it,It.z,Wt)}}else Nt.visible&&m.push(b,bt,Nt,it,It.z,null)}}const vt=b.children;for(let bt=0,Nt=vt.length;bt<Nt;bt++)gl(vt[bt],V,it,rt)}function fh(b,V,it,rt){const G=b.opaque,vt=b.transmissive,bt=b.transparent;d.setupLightsView(it),ct===!0&&gt.setGlobalState(x.clippingPlanes,it),rt&&U.viewport(R.copy(rt)),G.length>0&&Ja(G,V,it),vt.length>0&&Ja(vt,V,it),bt.length>0&&Ja(bt,V,it),U.buffers.depth.setTest(!0),U.buffers.depth.setMask(!0),U.buffers.color.setMask(!0),U.setPolygonOffset(!1)}function dh(b,V,it,rt){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[rt.id]===void 0&&(d.state.transmissionRenderTarget[rt.id]=new Ls(1,1,{generateMipmaps:!0,type:N.has("EXT_color_buffer_half_float")||N.has("EXT_color_buffer_float")?Za:Ui,minFilter:Ms,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:me.workingColorSpace}));const vt=d.state.transmissionRenderTarget[rt.id],bt=rt.viewport||R;vt.setSize(bt.z*x.transmissionResolutionScale,bt.w*x.transmissionResolutionScale);const Nt=x.getRenderTarget();x.setRenderTarget(vt),x.getClearColor(Z),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),Ot&&Gt.render(it);const Ft=x.toneMapping;x.toneMapping=Qi;const Qt=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),d.setupLightsView(rt),ct===!0&&gt.setGlobalState(x.clippingPlanes,rt),Ja(b,it,rt),E.updateMultisampleRenderTarget(vt),E.updateRenderTargetMipmap(vt),N.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Wt=0,fe=V.length;Wt<fe;Wt++){const ge=V[Wt],Le=ge.object,Ce=ge.geometry,pe=ge.material,qt=ge.group;if(pe.side===Ti&&Le.layers.test(rt.layers)){const Ge=pe.side;pe.side=un,pe.needsUpdate=!0,ph(Le,it,rt,Ce,pe,qt),pe.side=Ge,pe.needsUpdate=!0,Kt=!0}}Kt===!0&&(E.updateMultisampleRenderTarget(vt),E.updateRenderTargetMipmap(vt))}x.setRenderTarget(Nt),x.setClearColor(Z,K),Qt!==void 0&&(rt.viewport=Qt),x.toneMapping=Ft}function Ja(b,V,it){const rt=V.isScene===!0?V.overrideMaterial:null;for(let G=0,vt=b.length;G<vt;G++){const bt=b[G],Nt=bt.object,Ft=bt.geometry,Qt=bt.group;let Kt=bt.material;Kt.allowOverride===!0&&rt!==null&&(Kt=rt),Nt.layers.test(it.layers)&&ph(Nt,V,it,Ft,Kt,Qt)}}function ph(b,V,it,rt,G,vt){b.onBeforeRender(x,V,it,rt,G,vt),b.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(x,V,it,rt,b,vt),G.transparent===!0&&G.side===Ti&&G.forceSinglePass===!1?(G.side=un,G.needsUpdate=!0,x.renderBufferDirect(it,V,rt,G,b,vt),G.side=ss,G.needsUpdate=!0,x.renderBufferDirect(it,V,rt,G,b,vt),G.side=Ti):x.renderBufferDirect(it,V,rt,G,b,vt),b.onAfterRender(x,V,it,rt,G,vt)}function Qa(b,V,it){V.isScene!==!0&&(V=Dt);const rt=q.get(b),G=d.state.lights,vt=d.state.shadowsArray,bt=G.state.version,Nt=dt.getParameters(b,G.state,vt,V,it),Ft=dt.getProgramCacheKey(Nt);let Qt=rt.programs;rt.environment=b.isMeshStandardMaterial?V.environment:null,rt.fog=V.fog,rt.envMap=(b.isMeshStandardMaterial?F:v).get(b.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&b.envMap===null?V.environmentRotation:b.envMapRotation,Qt===void 0&&(b.addEventListener("dispose",ee),Qt=new Map,rt.programs=Qt);let Kt=Qt.get(Ft);if(Kt!==void 0){if(rt.currentProgram===Kt&&rt.lightsStateVersion===bt)return _h(b,Nt),Kt}else Nt.uniforms=dt.getUniforms(b),b.onBeforeCompile(Nt,x),Kt=dt.acquireProgram(Nt,Ft),Qt.set(Ft,Kt),rt.uniforms=Nt.uniforms;const Wt=rt.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Wt.clippingPlanes=gt.uniform),_h(b,Nt),rt.needsLights=Gp(b),rt.lightsStateVersion=bt,rt.needsLights&&(Wt.ambientLightColor.value=G.state.ambient,Wt.lightProbe.value=G.state.probe,Wt.directionalLights.value=G.state.directional,Wt.directionalLightShadows.value=G.state.directionalShadow,Wt.spotLights.value=G.state.spot,Wt.spotLightShadows.value=G.state.spotShadow,Wt.rectAreaLights.value=G.state.rectArea,Wt.ltc_1.value=G.state.rectAreaLTC1,Wt.ltc_2.value=G.state.rectAreaLTC2,Wt.pointLights.value=G.state.point,Wt.pointLightShadows.value=G.state.pointShadow,Wt.hemisphereLights.value=G.state.hemi,Wt.directionalShadowMap.value=G.state.directionalShadowMap,Wt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Wt.spotShadowMap.value=G.state.spotShadowMap,Wt.spotLightMatrix.value=G.state.spotLightMatrix,Wt.spotLightMap.value=G.state.spotLightMap,Wt.pointShadowMap.value=G.state.pointShadowMap,Wt.pointShadowMatrix.value=G.state.pointShadowMatrix),rt.currentProgram=Kt,rt.uniformsList=null,Kt}function mh(b){if(b.uniformsList===null){const V=b.currentProgram.getUniforms();b.uniformsList=Wo.seqWithValue(V.seq,b.uniforms)}return b.uniformsList}function _h(b,V){const it=q.get(b);it.outputColorSpace=V.outputColorSpace,it.batching=V.batching,it.batchingColor=V.batchingColor,it.instancing=V.instancing,it.instancingColor=V.instancingColor,it.instancingMorph=V.instancingMorph,it.skinning=V.skinning,it.morphTargets=V.morphTargets,it.morphNormals=V.morphNormals,it.morphColors=V.morphColors,it.morphTargetsCount=V.morphTargetsCount,it.numClippingPlanes=V.numClippingPlanes,it.numIntersection=V.numClipIntersection,it.vertexAlphas=V.vertexAlphas,it.vertexTangents=V.vertexTangents,it.toneMapping=V.toneMapping}function Hp(b,V,it,rt,G){V.isScene!==!0&&(V=Dt),E.resetTextureUnits();const vt=V.fog,bt=rt.isMeshStandardMaterial?V.environment:null,Nt=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Tr,Ft=(rt.isMeshStandardMaterial?F:v).get(rt.envMap||bt),Qt=rt.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,Kt=!!it.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),Wt=!!it.morphAttributes.position,fe=!!it.morphAttributes.normal,ge=!!it.morphAttributes.color;let Le=Qi;rt.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Le=x.toneMapping);const Ce=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,pe=Ce!==void 0?Ce.length:0,qt=q.get(rt),Ge=d.state.lights;if(ct===!0&&(xt===!0||b!==y)){const Qe=b===y&&rt.id===T;gt.setState(rt,b,Qe)}let ve=!1;rt.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==Ge.state.version||qt.outputColorSpace!==Nt||G.isBatchedMesh&&qt.batching===!1||!G.isBatchedMesh&&qt.batching===!0||G.isBatchedMesh&&qt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&qt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&qt.instancing===!1||!G.isInstancedMesh&&qt.instancing===!0||G.isSkinnedMesh&&qt.skinning===!1||!G.isSkinnedMesh&&qt.skinning===!0||G.isInstancedMesh&&qt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&qt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&qt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&qt.instancingMorph===!1&&G.morphTexture!==null||qt.envMap!==Ft||rt.fog===!0&&qt.fog!==vt||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==gt.numPlanes||qt.numIntersection!==gt.numIntersection)||qt.vertexAlphas!==Qt||qt.vertexTangents!==Kt||qt.morphTargets!==Wt||qt.morphNormals!==fe||qt.morphColors!==ge||qt.toneMapping!==Le||qt.morphTargetsCount!==pe)&&(ve=!0):(ve=!0,qt.__version=rt.version);let Fn=qt.currentProgram;ve===!0&&(Fn=Qa(rt,V,G));let Bs=!1,dn=!1,Fr=!1;const we=Fn.getUniforms(),bn=qt.uniforms;if(U.useProgram(Fn.program)&&(Bs=!0,dn=!0,Fr=!0),rt.id!==T&&(T=rt.id,dn=!0),Bs||y!==b){U.buffers.depth.getReversed()?(mt.copy(b.projectionMatrix),lv(mt),cv(mt),we.setValue(S,"projectionMatrix",mt)):we.setValue(S,"projectionMatrix",b.projectionMatrix),we.setValue(S,"viewMatrix",b.matrixWorldInverse);const an=we.map.cameraPosition;an!==void 0&&an.setValue(S,Xt.setFromMatrixPosition(b.matrixWorld)),X.logarithmicDepthBuffer&&we.setValue(S,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&we.setValue(S,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,dn=!0,Fr=!0)}if(G.isSkinnedMesh){we.setOptional(S,G,"bindMatrix"),we.setOptional(S,G,"bindMatrixInverse");const Qe=G.skeleton;Qe&&(Qe.boneTexture===null&&Qe.computeBoneTexture(),we.setValue(S,"boneTexture",Qe.boneTexture,E))}G.isBatchedMesh&&(we.setOptional(S,G,"batchingTexture"),we.setValue(S,"batchingTexture",G._matricesTexture,E),we.setOptional(S,G,"batchingIdTexture"),we.setValue(S,"batchingIdTexture",G._indirectTexture,E),we.setOptional(S,G,"batchingColorTexture"),G._colorsTexture!==null&&we.setValue(S,"batchingColorTexture",G._colorsTexture,E));const Tn=it.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&$t.update(G,it,Fn),(dn||qt.receiveShadow!==G.receiveShadow)&&(qt.receiveShadow=G.receiveShadow,we.setValue(S,"receiveShadow",G.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(bn.envMap.value=Ft,bn.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&V.environment!==null&&(bn.envMapIntensity.value=V.environmentIntensity),dn&&(we.setValue(S,"toneMappingExposure",x.toneMappingExposure),qt.needsLights&&Vp(bn,Fr),vt&&rt.fog===!0&&lt.refreshFogUniforms(bn,vt),lt.refreshMaterialUniforms(bn,rt,L,z,d.state.transmissionRenderTarget[b.id]),Wo.upload(S,mh(qt),bn,E)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Wo.upload(S,mh(qt),bn,E),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&we.setValue(S,"center",G.center),we.setValue(S,"modelViewMatrix",G.modelViewMatrix),we.setValue(S,"normalMatrix",G.normalMatrix),we.setValue(S,"modelMatrix",G.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Qe=rt.uniformsGroups;for(let an=0,vl=Qe.length;an<vl;an++){const os=Qe[an];B.update(os,Fn),B.bind(os,Fn)}}return Fn}function Vp(b,V){b.ambientLightColor.needsUpdate=V,b.lightProbe.needsUpdate=V,b.directionalLights.needsUpdate=V,b.directionalLightShadows.needsUpdate=V,b.pointLights.needsUpdate=V,b.pointLightShadows.needsUpdate=V,b.spotLights.needsUpdate=V,b.spotLightShadows.needsUpdate=V,b.rectAreaLights.needsUpdate=V,b.hemisphereLights.needsUpdate=V}function Gp(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(b,V,it){const rt=q.get(b);rt.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,rt.__autoAllocateDepthBuffer===!1&&(rt.__useRenderToTexture=!1),q.get(b.texture).__webglTexture=V,q.get(b.depthTexture).__webglTexture=rt.__autoAllocateDepthBuffer?void 0:it,rt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,V){const it=q.get(b);it.__webglFramebuffer=V,it.__useDefaultFramebuffer=V===void 0};const Wp=S.createFramebuffer();this.setRenderTarget=function(b,V=0,it=0){D=b,C=V,A=it;let rt=!0,G=null,vt=!1,bt=!1;if(b){const Ft=q.get(b);if(Ft.__useDefaultFramebuffer!==void 0)U.bindFramebuffer(S.FRAMEBUFFER,null),rt=!1;else if(Ft.__webglFramebuffer===void 0)E.setupRenderTarget(b);else if(Ft.__hasExternalTextures)E.rebindTextures(b,q.get(b.texture).__webglTexture,q.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Wt=b.depthTexture;if(Ft.__boundDepthTexture!==Wt){if(Wt!==null&&q.has(Wt)&&(b.width!==Wt.image.width||b.height!==Wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(b)}}const Qt=b.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(bt=!0);const Kt=q.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Kt[V])?G=Kt[V][it]:G=Kt[V],vt=!0):b.samples>0&&E.useMultisampledRTT(b)===!1?G=q.get(b).__webglMultisampledFramebuffer:Array.isArray(Kt)?G=Kt[it]:G=Kt,R.copy(b.viewport),j.copy(b.scissor),k=b.scissorTest}else R.copy(ht).multiplyScalar(L).floor(),j.copy(yt).multiplyScalar(L).floor(),k=St;if(it!==0&&(G=Wp),U.bindFramebuffer(S.FRAMEBUFFER,G)&&rt&&U.drawBuffers(b,G),U.viewport(R),U.scissor(j),U.setScissorTest(k),vt){const Ft=q.get(b.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ft.__webglTexture,it)}else if(bt){const Ft=q.get(b.texture),Qt=V;S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,Ft.__webglTexture,it,Qt)}else if(b!==null&&it!==0){const Ft=q.get(b.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Ft.__webglTexture,it)}T=-1},this.readRenderTargetPixels=function(b,V,it,rt,G,vt,bt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=q.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&bt!==void 0&&(Nt=Nt[bt]),Nt){U.bindFramebuffer(S.FRAMEBUFFER,Nt);try{const Ft=b.texture,Qt=Ft.format,Kt=Ft.type;if(!X.textureFormatReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!X.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=b.width-rt&&it>=0&&it<=b.height-G&&S.readPixels(V,it,rt,G,te.convert(Qt),te.convert(Kt),vt)}finally{const Ft=D!==null?q.get(D).__webglFramebuffer:null;U.bindFramebuffer(S.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(b,V,it,rt,G,vt,bt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=q.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&bt!==void 0&&(Nt=Nt[bt]),Nt)if(V>=0&&V<=b.width-rt&&it>=0&&it<=b.height-G){U.bindFramebuffer(S.FRAMEBUFFER,Nt);const Ft=b.texture,Qt=Ft.format,Kt=Ft.type;if(!X.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!X.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Wt=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,Wt),S.bufferData(S.PIXEL_PACK_BUFFER,vt.byteLength,S.STREAM_READ),S.readPixels(V,it,rt,G,te.convert(Qt),te.convert(Kt),0);const fe=D!==null?q.get(D).__webglFramebuffer:null;U.bindFramebuffer(S.FRAMEBUFFER,fe);const ge=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await ov(S,ge,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,Wt),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,vt),S.deleteBuffer(Wt),S.deleteSync(ge),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,V=null,it=0){const rt=Math.pow(2,-it),G=Math.floor(b.image.width*rt),vt=Math.floor(b.image.height*rt),bt=V!==null?V.x:0,Nt=V!==null?V.y:0;E.setTexture2D(b,0),S.copyTexSubImage2D(S.TEXTURE_2D,it,0,0,bt,Nt,G,vt),U.unbindTexture()};const Xp=S.createFramebuffer(),qp=S.createFramebuffer();this.copyTextureToTexture=function(b,V,it=null,rt=null,G=0,vt=null){vt===null&&(G!==0?(Go("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=G,G=0):vt=0);let bt,Nt,Ft,Qt,Kt,Wt,fe,ge,Le;const Ce=b.isCompressedTexture?b.mipmaps[vt]:b.image;if(it!==null)bt=it.max.x-it.min.x,Nt=it.max.y-it.min.y,Ft=it.isBox3?it.max.z-it.min.z:1,Qt=it.min.x,Kt=it.min.y,Wt=it.isBox3?it.min.z:0;else{const Tn=Math.pow(2,-G);bt=Math.floor(Ce.width*Tn),Nt=Math.floor(Ce.height*Tn),b.isDataArrayTexture?Ft=Ce.depth:b.isData3DTexture?Ft=Math.floor(Ce.depth*Tn):Ft=1,Qt=0,Kt=0,Wt=0}rt!==null?(fe=rt.x,ge=rt.y,Le=rt.z):(fe=0,ge=0,Le=0);const pe=te.convert(V.format),qt=te.convert(V.type);let Ge;V.isData3DTexture?(E.setTexture3D(V,0),Ge=S.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(E.setTexture2DArray(V,0),Ge=S.TEXTURE_2D_ARRAY):(E.setTexture2D(V,0),Ge=S.TEXTURE_2D),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,V.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,V.unpackAlignment);const ve=S.getParameter(S.UNPACK_ROW_LENGTH),Fn=S.getParameter(S.UNPACK_IMAGE_HEIGHT),Bs=S.getParameter(S.UNPACK_SKIP_PIXELS),dn=S.getParameter(S.UNPACK_SKIP_ROWS),Fr=S.getParameter(S.UNPACK_SKIP_IMAGES);S.pixelStorei(S.UNPACK_ROW_LENGTH,Ce.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Ce.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Qt),S.pixelStorei(S.UNPACK_SKIP_ROWS,Kt),S.pixelStorei(S.UNPACK_SKIP_IMAGES,Wt);const we=b.isDataArrayTexture||b.isData3DTexture,bn=V.isDataArrayTexture||V.isData3DTexture;if(b.isDepthTexture){const Tn=q.get(b),Qe=q.get(V),an=q.get(Tn.__renderTarget),vl=q.get(Qe.__renderTarget);U.bindFramebuffer(S.READ_FRAMEBUFFER,an.__webglFramebuffer),U.bindFramebuffer(S.DRAW_FRAMEBUFFER,vl.__webglFramebuffer);for(let os=0;os<Ft;os++)we&&(S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,q.get(b).__webglTexture,G,Wt+os),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,q.get(V).__webglTexture,vt,Le+os)),S.blitFramebuffer(Qt,Kt,bt,Nt,fe,ge,bt,Nt,S.DEPTH_BUFFER_BIT,S.NEAREST);U.bindFramebuffer(S.READ_FRAMEBUFFER,null),U.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(G!==0||b.isRenderTargetTexture||q.has(b)){const Tn=q.get(b),Qe=q.get(V);U.bindFramebuffer(S.READ_FRAMEBUFFER,Xp),U.bindFramebuffer(S.DRAW_FRAMEBUFFER,qp);for(let an=0;an<Ft;an++)we?S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Tn.__webglTexture,G,Wt+an):S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Tn.__webglTexture,G),bn?S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Qe.__webglTexture,vt,Le+an):S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Qe.__webglTexture,vt),G!==0?S.blitFramebuffer(Qt,Kt,bt,Nt,fe,ge,bt,Nt,S.COLOR_BUFFER_BIT,S.NEAREST):bn?S.copyTexSubImage3D(Ge,vt,fe,ge,Le+an,Qt,Kt,bt,Nt):S.copyTexSubImage2D(Ge,vt,fe,ge,Qt,Kt,bt,Nt);U.bindFramebuffer(S.READ_FRAMEBUFFER,null),U.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else bn?b.isDataTexture||b.isData3DTexture?S.texSubImage3D(Ge,vt,fe,ge,Le,bt,Nt,Ft,pe,qt,Ce.data):V.isCompressedArrayTexture?S.compressedTexSubImage3D(Ge,vt,fe,ge,Le,bt,Nt,Ft,pe,Ce.data):S.texSubImage3D(Ge,vt,fe,ge,Le,bt,Nt,Ft,pe,qt,Ce):b.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,vt,fe,ge,bt,Nt,pe,qt,Ce.data):b.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,vt,fe,ge,Ce.width,Ce.height,pe,Ce.data):S.texSubImage2D(S.TEXTURE_2D,vt,fe,ge,bt,Nt,pe,qt,Ce);S.pixelStorei(S.UNPACK_ROW_LENGTH,ve),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Fn),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Bs),S.pixelStorei(S.UNPACK_SKIP_ROWS,dn),S.pixelStorei(S.UNPACK_SKIP_IMAGES,Fr),vt===0&&V.generateMipmaps&&S.generateMipmap(Ge),U.unbindTexture()},this.copyTextureToTexture3D=function(b,V,it=null,rt=null,G=0){return Go('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,V,it,rt,G)},this.initRenderTarget=function(b){q.get(b).__webglFramebuffer===void 0&&E.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),U.unbindTexture()},this.resetState=function(){C=0,A=0,D=null,U.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=me._getDrawingBufferColorSpace(t),e.unpackColorSpace=me._getUnpackColorSpace()}}const Wf={type:"change"},ch={type:"start"},zp={type:"end"},Do=new pl,Xf=new Xi,hE=Math.cos(70*rv.DEG2RAD),Ue=new O,ln=2*Math.PI,Se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},hc=1e-6;class fE extends A0{constructor(t,e=null){super(t,e),this.state=Se.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ar.ROTATE,MIDDLE:ar.DOLLY,RIGHT:ar.PAN},this.touches={ONE:nr.ROTATE,TWO:nr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Is,this._lastTargetPosition=new O,this._quat=new Is().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vf,this._sphericalDelta=new vf,this._scale=1,this._panOffset=new O,this._rotateStart=new Mt,this._rotateEnd=new Mt,this._rotateDelta=new Mt,this._panStart=new Mt,this._panEnd=new Mt,this._panDelta=new Mt,this._dollyStart=new Mt,this._dollyEnd=new Mt,this._dollyDelta=new Mt,this._dollyDirection=new O,this._mouse=new Mt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=pE.bind(this),this._onPointerDown=dE.bind(this),this._onPointerUp=mE.bind(this),this._onContextMenu=ME.bind(this),this._onMouseWheel=vE.bind(this),this._onKeyDown=xE.bind(this),this._onTouchStart=yE.bind(this),this._onTouchMove=SE.bind(this),this._onMouseDown=_E.bind(this),this._onMouseMove=gE.bind(this),this._interceptControlDown=EE.bind(this),this._interceptControlUp=bE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wf),this.update(),this.state=Se.NONE}update(t=null){const e=this.object.position;Ue.copy(e).sub(this.target),Ue.applyQuaternion(this._quat),this._spherical.setFromVector3(Ue),this.autoRotate&&this.state===Se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ln:i>Math.PI&&(i-=ln),s<-Math.PI?s+=ln:s>Math.PI&&(s-=ln),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ue.setFromSpherical(this._spherical),Ue.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ue),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ue.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new O(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ue.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Do.origin.copy(this.object.position),Do.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Do.direction))<hE?this.object.lookAt(this.target):(Xf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Do.intersectPlane(Xf,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>hc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>hc||this._lastTargetPosition.distanceToSquared(this.target)>hc?(this.dispatchEvent(Wf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ln/60*this.autoRotateSpeed*t:ln/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ue.setFromMatrixColumn(e,0),Ue.multiplyScalar(-t),this._panOffset.add(Ue)}_panUp(t,e){this.screenSpacePanning===!0?Ue.setFromMatrixColumn(e,1):(Ue.setFromMatrixColumn(e,0),Ue.crossVectors(this.object.up,Ue)),Ue.multiplyScalar(t),this._panOffset.add(Ue)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ue.copy(s).sub(this.target);let r=Ue.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Mt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function dE(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function pE(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function mE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(zp),this.state=Se.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function _E(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ar.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Se.DOLLY;break;case ar.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Se.ROTATE}break;case ar.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Se.PAN}break;default:this.state=Se.NONE}this.state!==Se.NONE&&this.dispatchEvent(ch)}function gE(n){switch(this.state){case Se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function vE(n){this.enabled===!1||this.enableZoom===!1||this.state!==Se.NONE||(n.preventDefault(),this.dispatchEvent(ch),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(zp))}function xE(n){this.enabled!==!1&&this._handleKeyDown(n)}function yE(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case nr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Se.TOUCH_ROTATE;break;case nr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Se.TOUCH_PAN;break;default:this.state=Se.NONE}break;case 2:switch(this.touches.TWO){case nr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Se.TOUCH_DOLLY_PAN;break;case nr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Se.TOUCH_DOLLY_ROTATE;break;default:this.state=Se.NONE}break;default:this.state=Se.NONE}this.state!==Se.NONE&&this.dispatchEvent(ch)}function SE(n){switch(this._trackPointer(n),this.state){case Se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Se.NONE}}function ME(n){this.enabled!==!1&&n.preventDefault()}function EE(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var TE=Vt('<div class="three-wrap svelte-gznlsz"><div class="three-toolbar svelte-gznlsz"><button class="mini svelte-gznlsz" title="重置视角">⤢ 复位</button> <button> </button> <label class="mini svelte-gznlsz">高程倍率 <input type="range" min="0.2" max="4" step="0.1" class="svelte-gznlsz"/> </label></div> <div class="three-legend svelte-gznlsz">斜视预览：柱体高度 = 用海高程（m），点击柱体可选中宗海</div></div>');function wE(n,t){Ni(t,!0);let e,i,s,r,a,o,l=0,c,u=_e(!1),h=_e(1);function p(){var D,T,y,R;if(o){for(const j of[...o.children])(T=(D=j.geometry)==null?void 0:D.dispose)==null||T.call(D),(R=(y=j.material)==null?void 0:y.dispose)==null||R.call(y),o.remove(j);for(const j of st.parcels){const k=new Cp;j.rings[0].forEach((et,ot)=>{const ht=et.x,yt=-et.y;ot===0?k.moveTo(ht,yt):k.lineTo(ht,yt)}),k.closePath();for(let et=1;et<j.rings.length;et++){const ot=new Eu;j.rings[et].forEach((ht,yt)=>{const St=ht.x,W=-ht.y;yt===0?ot.moveTo(St,W):ot.lineTo(St,W)}),ot.closePath(),k.holes.push(ot)}const Z=j.elevation*P(h),K=new ah(k,{depth:Z,bevelEnabled:!1,steps:1});K.rotateX(-Math.PI/2),K.computeVertexNormals();const $=new le(hl(j.seaType)),z=new v0({color:$,transparent:!0,opacity:j.id===st.selectedParcelId?.95:.72,roughness:.55,metalness:.08}),L=new oi(K,z);if(L.userData.parcelId=j.id,j.id===st.selectedParcelId){const et=new Ep(new Kv(K),new ih({color:861503,linewidth:1}));L.add(et)}o.add(L)}f()}}function f(){if(!o.children.length||!r)return;const D=new Ir().setFromObject(o),T=D.getSize(new O),y=D.getCenter(new O),R=Math.max(T.x,T.z,400);r.zoom=Math.min(e.clientWidth,e.clientHeight)/(R*1.5),r.position.set(y.x,R*1.1,y.z+R*.9),r.lookAt(y),a.target.copy(y),r.updateProjectionMatrix(),a.update()}let _;cl(()=>{const D=e.clientWidth,T=e.clientHeight;i=new uE({antialias:!0}),i.setPixelRatio(window.devicePixelRatio||1),i.setSize(D,T),e.appendChild(i.domElement),s=new Uv,s.background=new le(15660023),r=new oh(-D/2,D/2,T/2,-T/2,1,2e5),r.position.set(3e3,4e3,5e3),r.lookAt(2e3,0,1e3),a=new fE(r,i.domElement),a.enableDamping=!0,a.dampingFactor=.08,a.maxPolarAngle=Math.PI*.49,s.add(new E0(16777215,.75));const y=new mf(16777215,1.1);y.position.set(2e3,5e3,3e3),s.add(y);const R=new mf(13624319,.35);R.position.set(-3e3,2e3,-2e3),s.add(R),o=new Jr,s.add(o);const j=new w0(8e3,40,9479352,12899038);j.position.y=-.5,s.add(j),p();const k=new T0,Z=new Mt,K=z=>{const L=i.domElement.getBoundingClientRect();Z.x=(z.clientX-L.left)/L.width*2-1,Z.y=-((z.clientY-L.top)/L.height)*2+1,k.setFromCamera(Z,r);const et=k.intersectObjects(o.children);et.length&&st.selectParcel(et[0].object.userData.parcelId)};i.domElement.addEventListener("click",K),c=new ResizeObserver(()=>{const z=e.clientWidth,L=e.clientHeight;i.setSize(z,L),r.left=-z/2,r.right=z/2,r.top=L/2,r.bottom=-L/2,r.updateProjectionMatrix()}),c.observe(e);const $=()=>{l=requestAnimationFrame($),a.autoRotate=P(u),a.autoRotateSpeed=.8,a.update(),i.render(s,r)};$(),_=ku(()=>{ns(()=>{st.parcels,st.selectedParcelId,P(h),p()})}),Xd(()=>{_==null||_(),cancelAnimationFrame(l),c==null||c.disconnect(),i.domElement.removeEventListener("click",K),a.dispose(),i.dispose(),e==null||e.removeChild(i.domElement)})});var g=TE(),m=pt(g),d=pt(m),w=tt(d,2);let M;var x=Ut(w,!0),I=tt(w,2),C=tt(pt(I)),A=tt(C);Pc(g,D=>e=D,()=>e),ue(D=>{M=Oe(w,1,"mini svelte-gznlsz",null,M,{active:P(u)}),Rt(x,P(u)?"⏸ 停止旋转":"▶ 自动旋转"),Rt(A,` ${D??""}×`)},[()=>P(h).toFixed(1)]),jt("click",d,()=>f()),jt("click",w,()=>Zt(u,!P(u))),Fo(C,()=>P(h),D=>Zt(h,D)),kt(n,g),Fi()}Pr(["click"]);var AE=Vt('<div class="empty svelte-tk7v37">未选择宗海，请在左侧列表或画布中点选</div>'),RE=Vt("<div>该宗海已被系统阻止提交质检，请先拖动节点修正。</div>"),CE=Vt("<div> <!></div>"),PE=Vt("<option> </option>"),DE=Vt('<div class="hole-row svelte-tk7v37"> </div>'),LE=Vt('<div class="holes svelte-tk7v37"><h4 class="svelte-tk7v37">孔洞（航道/锚地扣减）</h4> <!></div>'),IE=Vt('<div class="body svelte-tk7v37"><!> <label class="field svelte-tk7v37"><span>宗海编号</span> <input readonly="" class="svelte-tk7v37"/></label> <label class="field svelte-tk7v37"><span>申请人 / 项目</span> <input class="svelte-tk7v37"/></label> <label class="field svelte-tk7v37"><span>用海类型</span> <select class="svelte-tk7v37"></select></label> <label class="field svelte-tk7v37"><span>用海高程（m，三维拉伸）</span> <input type="number" min="1" max="200" class="svelte-tk7v37"/></label> <div class="stat-grid svelte-tk7v37"><div class="svelte-tk7v37"><small class="svelte-tk7v37">净面积</small><strong class="svelte-tk7v37"> </strong><em class="svelte-tk7v37">m²</em></div> <div class="svelte-tk7v37"><small class="svelte-tk7v37">外轮廓周长</small><strong class="svelte-tk7v37"> </strong><em class="svelte-tk7v37">m</em></div> <div class="svelte-tk7v37"><small class="svelte-tk7v37">界址点</small><strong class="svelte-tk7v37"> </strong><em class="svelte-tk7v37">个</em></div> <div class="svelte-tk7v37"><small class="svelte-tk7v37">孔洞</small><strong class="svelte-tk7v37"> </strong><em class="svelte-tk7v37">处</em></div></div> <!> <button class="danger-btn svelte-tk7v37">删除该宗海</button></div>'),UE=Vt("<button> </button>"),NE=Vt('<tr><td class="svelte-tk7v37"> </td><td class="svelte-tk7v37"><input type="number" class="svelte-tk7v37"/></td><td class="svelte-tk7v37"><input type="number" class="svelte-tk7v37"/></td><td class="svelte-tk7v37"><button class="mini-del svelte-tk7v37">删点</button></td></tr>'),FE=Vt("<span>（超 1 m²，导出时将被单独列出）</span>"),OE=Vt("<div> <strong> </strong> <!></div>"),BE=Vt('<div class="body svelte-tk7v37"><div class="ring-switch svelte-tk7v37"><button> </button> <!></div> <div class="coord-table svelte-tk7v37"><table class="svelte-tk7v37"><thead><tr><th class="svelte-tk7v37">点号</th><th class="svelte-tk7v37">X (m)</th><th class="svelte-tk7v37">Y (m)</th><th class="svelte-tk7v37">操作</th></tr></thead><tbody></tbody></table></div> <!></div>'),kE=Vt('<div class="three-host svelte-tk7v37"><!></div>'),zE=Vt('<aside class="right-panel svelte-tk7v37"><div class="tabs svelte-tk7v37"><button>宗海属性</button> <button>界址点表</button> <button>斜视预览</button></div> <!></aside>');function HE(n,t){Ni(t,!0);let e=_e("props"),i=_e(0);const s=ii(()=>st.selectedParcel),r=ii(()=>P(s)?$d(P(s).rings[0]):null);ns(()=>{P(s)&&P(i)>=P(s).rings.length&&Zt(i,0)});var a=zE(),o=pt(a),l=pt(o);let c;var u=tt(l,2);let h;var p=tt(u,2);let f;var _=tt(o,2);{var g=M=>{var x=AE();kt(M,x)},m=M=>{var x=IE(),I=pt(x);Xe(I,17,()=>st.issuesOf(P(s).id),Dt=>Dt.detail,(Dt,Ot)=>{var Bt=CE(),S=pt(Bt),ft=tt(S);{var N=X=>{var U=RE();kt(X,U)};Fe(ft,X=>{P(Ot).type==="自相交"&&X(N)})}ue(()=>{Oe(Bt,1,`issue issue-${P(Ot).type==="自相交"?"err":"warn"}`,"svelte-tk7v37"),Rt(S,`⚠ ${P(Ot).type??""}：${P(Ot).detail??""} `)}),kt(Dt,Bt)});var C=tt(I,2),A=tt(pt(C),2),D=tt(C,2),T=tt(pt(D),2),y=tt(D,2),R=tt(pt(y),2);Xe(R,21,()=>Ps,Dt=>Dt.code,(Dt,Ot)=>{var Bt=PE(),S=Ut(Bt),ft={};ue(()=>{Rt(S,`${P(Ot).code??""} ${P(Ot).name??""}`),ft!==(ft=P(Ot).code)&&(Bt.value=(Bt.__value=ft)??"")}),kt(Dt,Bt)});var j;Vd(R);var k=tt(y,2),Z=tt(pt(k),2),K=tt(k,2),$=pt(K),z=tt(pt($)),L=Ut(z,!0),et=tt($,2),ot=tt(pt(et)),ht=Ut(ot,!0),yt=tt(et,2),St=tt(pt(yt)),W=Ut(St,!0),ct=tt(yt,2),xt=tt(pt(ct)),mt=Ut(xt,!0),Pt=tt(K,2);{var Xt=Dt=>{var Ot=LE(),Bt=tt(pt(Ot),2);Xe(Bt,17,()=>P(s).rings.slice(1),Tl,(S,ft,N)=>{var X=DE(),U=Ut(X);ue(J=>Rt(U,`孔洞${N+1}：${P(ft).length??""} 点 · ${J??""} m²`),[()=>ui(P(ft)).toFixed(2)]),kt(S,X)}),kt(Dt,Ot)};Fe(Pt,Dt=>{P(s).rings.length>1&&Dt(Xt)})}var It=tt(Pt,2);ue((Dt,Ot,Bt)=>{kr(A,P(s).id),kr(T,P(s).applicant),j!==(j=P(s).seaType)&&(R.value=(R.__value=j)??"",Gu(R,j)),kr(Z,P(s).elevation),Rt(L,Dt),Rt(ht,Ot),Rt(W,Bt),Rt(mt,P(s).rings.length-1)},[()=>Dr({rings:P(s).rings}).toFixed(2),()=>Wu(P(s).rings[0]).toFixed(2),()=>P(s).rings.reduce((Dt,Ot)=>Dt+Ot.length,0)]),jt("change",T,Dt=>st.updateParcelProps(P(s).id,{applicant:Dt.target.value})),jt("change",R,Dt=>st.updateParcelProps(P(s).id,{seaType:Dt.target.value})),jt("change",Z,Dt=>st.updateParcelProps(P(s).id,{elevation:Number(Dt.target.value)||10})),jt("click",It,()=>st.deleteParcel(P(s).id)),kt(M,x)},d=M=>{var x=BE(),I=pt(x),C=pt(I);let A;var D=Ut(C),T=tt(C,2);Xe(T,17,()=>P(s).rings.slice(1),Tl,(K,$,z)=>{var L=UE();let et;var ot=Ut(L);ue(()=>{et=Oe(L,1,"svelte-tk7v37",null,et,{on:P(i)===z+1}),Rt(ot,`孔洞${z+1}（${P($).length??""}点）`)}),jt("click",L,()=>Zt(i,z+1)),kt(K,L)});var y=tt(I,2),R=pt(y),j=tt(pt(R));Xe(j,21,()=>P(s).rings[P(i)],Tl,(K,$,z)=>{var L=NE(),et=pt(L),ot=Ut(et,!0),ht=tt(et),yt=pt(ht),St=tt(ht),W=pt(St),ct=tt(St),xt=Ut(ct);ue((mt,Pt)=>{Rt(ot,P(i)===0?`J${z+1}`:`K${P(i)}-${z+1}`),kr(yt,mt),kr(W,Pt),xt.disabled=P(s).rings[P(i)].length<=3},[()=>P($).x.toFixed(3),()=>P($).y.toFixed(3)]),jt("change",yt,mt=>{st.begin("坐标输入修改界址点"),P($).x=Number(mt.target.value)}),jt("change",W,mt=>{st.begin("坐标输入修改界址点"),P($).y=Number(mt.target.value)}),jt("click",xt,()=>st.deleteVertex(P(s).id,P(i),z)),kt(K,L)});var k=tt(y,2);{var Z=K=>{var $=OE();let z;var L=pt($),et=tt(L),ot=Ut(et),ht=tt(et,2);{var yt=St=>{var W=FE();kt(St,W)};Fe(ht,St=>{P(r).area>1&&St(yt)})}ue((St,W)=>{z=Oe($,1,"closure svelte-tk7v37",null,z,{bad:P(r).area>1}),Rt(L,`线性闭合差 ${St??""} m ｜ 面积闭合差 `),Rt(ot,`${W??""} m²`)},[()=>P(r).linear.toFixed(3),()=>P(r).area.toFixed(3)]),kt(K,$)};Fe(k,K=>{P(r)&&K(Z)})}ue(()=>{A=Oe(C,1,"svelte-tk7v37",null,A,{on:P(i)===0}),Rt(D,`外轮廓（${P(s).rings[0].length??""}点）`)}),jt("click",C,()=>Zt(i,0)),kt(M,x)},w=M=>{var x=kE(),I=pt(x);wE(I,{}),kt(M,x)};Fe(_,M=>{P(s)?P(e)==="props"?M(m,1):P(e)==="vertices"?M(d,2):M(w,-1):M(g)})}ue(()=>{c=Oe(l,1,"svelte-tk7v37",null,c,{on:P(e)==="props"}),h=Oe(u,1,"svelte-tk7v37",null,h,{on:P(e)==="vertices"}),f=Oe(p,1,"svelte-tk7v37",null,f,{on:P(e)==="3d"})}),jt("click",l,()=>Zt(e,"props")),jt("click",u,()=>Zt(e,"vertices")),jt("click",p,()=>Zt(e,"3d")),kt(n,a),Fi()}Pr(["click","change"]);var qf=Vt("<option> </option>"),VE=Vt('<div class="register svelte-1f74wlw"><label class="svelte-1f74wlw">申请人 / 项目名称<input placeholder="如：蓝湾水产养殖有限公司" class="svelte-1f74wlw"/></label> <label class="svelte-1f74wlw">用海类型 <select class="svelte-1f74wlw"></select></label> <label class="svelte-1f74wlw">用海高程(m)<input type="number" min="1" class="svelte-1f74wlw"/></label> <button class="btn-primary svelte-1f74wlw">登记并生成宗海草稿</button> <p class="tip svelte-1f74wlw">登记后自动生成待编辑宗海（默认矩形轮廓）与工单，状态为「待分派」。</p></div>'),GE=Vt('<select class="svelte-1f74wlw"><option>分派给…</option><!></select>'),WE=Vt('<button class="btn-warn svelte-1f74wlw">返工后重新提交</button>'),XE=Vt('<button class="btn-primary small svelte-1f74wlw">提交质检</button>'),qE=Vt('<span class="block-tag svelte-1f74wlw">⚠ 自相交，禁止提交</span>'),YE=Vt("<!> <!>",1),$E=Vt('<button class="btn-ghost small svelte-1f74wlw">查看宗海</button>'),jE=Vt('<tr><td class="svelte-1f74wlw"> </td><td class="svelte-1f74wlw"><a class="svelte-1f74wlw"> </a></td><td class="svelte-1f74wlw"> </td><td class="nowrap svelte-1f74wlw"> </td><td class="svelte-1f74wlw"> </td><td class="svelte-1f74wlw"><span class="chip svelte-1f74wlw"> </span></td><td class="svelte-1f74wlw"> </td><td class="actions svelte-1f74wlw"><!></td></tr>'),ZE=Vt('<div class="table-scroll svelte-1f74wlw"><table class="svelte-1f74wlw"><thead><tr><th class="svelte-1f74wlw">工单号</th><th class="svelte-1f74wlw">宗海</th><th class="svelte-1f74wlw">申请人</th><th class="svelte-1f74wlw">接单时间</th><th class="svelte-1f74wlw">承办师傅</th><th class="svelte-1f74wlw">状态</th><th class="svelte-1f74wlw">返工</th><th class="svelte-1f74wlw">操作</th></tr></thead><tbody></tbody></table></div>'),KE=Vt('<span class="block-tag svelte-1f74wlw">自相交未消除</span>'),JE=Vt('<span class="ok svelte-1f74wlw">通过</span>'),QE=Vt('<button class="btn-pass svelte-1f74wlw">抽查合格</button> <button class="btn-reject svelte-1f74wlw">不合格打回</button>',1),tb=Vt('<span class="ok svelte-1f74wlw"> </span>'),eb=Vt('<span class="block-tag svelte-1f74wlw"> </span>'),nb=Vt('<tr><td class="svelte-1f74wlw"> </td><td class="svelte-1f74wlw"><a class="svelte-1f74wlw"> </a></td><td class="svelte-1f74wlw"> </td><td class="svelte-1f74wlw"> </td><td class="svelte-1f74wlw"> </td><td class="svelte-1f74wlw"><!></td><td class="actions svelte-1f74wlw"><!></td></tr>'),ib=Vt('<p class="tip svelte-1f74wlw">暂无待质检工单。</p>'),sb=Vt('<div class="modal-mask svelte-1f74wlw"><div class="modal svelte-1f74wlw"><h4 class="svelte-1f74wlw">质检不合格打回</h4> <textarea placeholder="请填写打回原因，如：界址点与岸线拐点偏差超限、孔洞面积不符…" rows="4" class="svelte-1f74wlw"></textarea> <div class="modal-actions svelte-1f74wlw"><button class="btn-ghost svelte-1f74wlw">取消</button> <button class="btn-reject svelte-1f74wlw">确认打回</button></div></div></div>'),rb=Vt('<div class="table-scroll svelte-1f74wlw"><table class="svelte-1f74wlw"><thead><tr><th class="svelte-1f74wlw">工单号</th><th class="svelte-1f74wlw">宗海</th><th class="svelte-1f74wlw">承办人</th><th class="svelte-1f74wlw">提交次数</th><th class="svelte-1f74wlw">历史返工</th><th class="svelte-1f74wlw">几何校验</th><th class="svelte-1f74wlw">质检结论</th></tr></thead><tbody></tbody></table> <!></div> <!>',1),ab=Vt('<div class="bar-row svelte-1f74wlw"><span class="bar-label"> </span> <div class="bar svelte-1f74wlw"><i class="svelte-1f74wlw"></i></div> <strong> </strong></div>'),ob=Vt('<tr><td class="svelte-1f74wlw"> <small class="svelte-1f74wlw"> </small></td><td class="svelte-1f74wlw"> </td><td class="ok svelte-1f74wlw"> </td><td> </td><td class="svelte-1f74wlw"> </td></tr>'),lb=Vt('<div class="board svelte-1f74wlw"><div class="kpis svelte-1f74wlw"><div class="kpi svelte-1f74wlw"><small class="svelte-1f74wlw">工单总量</small><strong class="svelte-1f74wlw"> </strong></div> <div class="kpi svelte-1f74wlw"><small class="svelte-1f74wlw">质检合格完成量</small><strong class="svelte-1f74wlw"> </strong></div> <div class="kpi svelte-1f74wlw"><small class="svelte-1f74wlw">当前打回</small><strong class="warn svelte-1f74wlw"> </strong></div> <div class="kpi svelte-1f74wlw"><small class="svelte-1f74wlw">累计提交次数</small><strong class="svelte-1f74wlw"> </strong></div> <div class="kpi svelte-1f74wlw"><small class="svelte-1f74wlw">累计返工次数</small><strong class="svelte-1f74wlw"> </strong></div> <div class="kpi accent svelte-1f74wlw"><small class="svelte-1f74wlw">返工率</small><strong class="svelte-1f74wlw"> </strong><em class="svelte-1f74wlw">返工/提交</em></div></div> <div class="board-cols svelte-1f74wlw"><div><h4 class="svelte-1f74wlw">阶段分布</h4> <!></div> <div><h4 class="svelte-1f74wlw">师傅工作量</h4> <table class="surveyor-table svelte-1f74wlw"><thead><tr><th class="svelte-1f74wlw">师傅</th><th class="svelte-1f74wlw">承办</th><th class="svelte-1f74wlw">合格</th><th class="svelte-1f74wlw">返工</th><th class="svelte-1f74wlw">返工率</th></tr></thead><tbody></tbody></table></div></div></div>'),cb=Vt('<section class="bottom-panel svelte-1f74wlw"><nav class="bp-tabs svelte-1f74wlw"><button>① 前台接单登记</button> <button>② 工单分派与办理 <em class="n svelte-1f74wlw"> </em></button> <button>③ 质检抽查 <em class="n warn svelte-1f74wlw"> </em></button> <button>④ 完成量与返工率看板</button></nav> <div class="bp-body svelte-1f74wlw"><!></div></section>');function ub(n,t){Ni(t,!0);let e=_e("jobs");const i=En({applicant:"",seaType:Ps[0].code,elevation:12});let s=_e(""),r=_e(null);const a={待分派:"#8a6d3b",调查中:"#1565c0",待质检:"#e65100",质检合格:"#2e7d32",不合格打回:"#c62828",已合并:"#707a85"};function o(){if(!i.applicant.trim()){st.notify("warn","请填写申请人/项目名称");return}st.registerJob({...i}),i.applicant="",Zt(e,"jobs")}function l(k){var Z;return((Z=Uc.find(K=>K.id===k))==null?void 0:Z.name)??"—"}var c=cb(),u=pt(c),h=pt(u);let p;var f=tt(h,2);let _;var g=tt(pt(f)),m=Ut(g,!0),d=tt(f,2);let w;var M=tt(pt(d)),x=Ut(M,!0),I=tt(d,2);let C;var A=tt(u,2),D=pt(A);{var T=k=>{var Z=VE(),K=pt(Z),$=tt(pt(K)),z=tt(K,2),L=tt(pt(z));Xe(L,21,()=>Ps,yt=>yt.code,(yt,St)=>{var W=qf(),ct=Ut(W,!0),xt={};ue(()=>{Rt(ct,P(St).name),xt!==(xt=P(St).code)&&(W.value=(W.__value=xt)??"")}),kt(yt,W)}),Vd(L);var et=tt(z,2),ot=tt(pt(et)),ht=tt(et,2);Fo($,()=>i.applicant,yt=>i.applicant=yt),w_(L,()=>i.seaType,yt=>i.seaType=yt),Fo(ot,()=>i.elevation,yt=>i.elevation=yt),jt("click",ht,o),kt(k,Z)},y=k=>{var Z=ZE(),K=pt(Z),$=tt(pt(K));Xe($,21,()=>st.jobs,z=>z.jobId,(z,L)=>{var et=jE(),ot=pt(et),ht=Ut(ot,!0),yt=tt(ot),St=pt(yt),W=Ut(St,!0),ct=tt(yt),xt=Ut(ct,!0),mt=tt(ct),Pt=Ut(mt,!0),Xt=tt(mt),It=Ut(Xt,!0),Dt=tt(Xt),Ot=pt(Dt),Bt=Ut(Ot,!0),S=tt(Dt),ft=Ut(S,!0),N=tt(S),X=pt(N);{var U=E=>{var v=GE(),F=pt(v);F.value=F.__value="";var Y=tt(F);Xe(Y,17,()=>Uc,nt=>nt.id,(nt,Q)=>{var dt=qf(),lt=Ut(dt),_t={};ue(()=>{Rt(lt,`${P(Q).name??""}（${P(Q).title??""}）`),_t!==(_t=P(Q).id)&&(dt.value=(dt.__value=_t)??"")}),kt(nt,dt)}),jt("change",v,nt=>nt.target.value&&st.assignJob(P(L).jobId,nt.target.value)),kt(E,v)},J=E=>{var v=YE(),F=aa(v);{var Y=_t=>{var zt=WE();jt("click",zt,()=>st.reworkResubmit(P(L).jobId)),kt(_t,zt)},nt=_t=>{var zt=XE();jt("click",zt,()=>st.submitQc(P(L).jobId)),kt(_t,zt)};Fe(F,_t=>{P(L).stage==="不合格打回"?_t(Y):_t(nt,-1)})}var Q=tt(F,2);{var dt=_t=>{var zt=qE();kt(_t,zt)},lt=ii(()=>st.hasBlockingIssue(P(L).parcelId));Fe(Q,_t=>{P(lt)&&_t(dt)})}kt(E,v)},q=E=>{var v=$E();jt("click",v,()=>st.selectParcel(P(L).parcelId)),kt(E,v)};Fe(X,E=>{P(L).stage==="待分派"?E(U):P(L).stage==="调查中"||P(L).stage==="不合格打回"?E(J,1):E(q,-1)})}ue(E=>{Rt(ht,P(L).jobId),Rt(W,P(L).parcelId),Rt(xt,P(L).applicant),Rt(Pt,P(L).receivedAt),Rt(It,E),oa(Ot,`color:${a[P(L).stage]};border-color:${a[P(L).stage]}`),Rt(Bt,P(L).stage),Rt(ft,P(L).reworkCount)},[()=>l(P(L).assignee)]),jt("click",St,()=>st.selectParcel(P(L).parcelId)),kt(z,et)}),kt(k,Z)},R=k=>{var Z=rb(),K=aa(Z),$=pt(K),z=tt(pt($));Xe(z,21,()=>st.jobs.filter(St=>["待质检","质检合格","不合格打回"].includes(St.stage)),St=>St.jobId,(St,W)=>{const ct=ii(()=>st.hasBlockingIssue(P(W).parcelId));var xt=nb(),mt=pt(xt),Pt=Ut(mt,!0),Xt=tt(mt),It=pt(Xt),Dt=Ut(It,!0),Ot=tt(Xt),Bt=Ut(Ot,!0),S=tt(Ot),ft=Ut(S,!0),N=tt(S),X=Ut(N,!0),U=tt(N),J=pt(U);{var q=dt=>{var lt=KE();kt(dt,lt)},E=dt=>{var lt=JE();kt(dt,lt)};Fe(J,dt=>{P(ct)?dt(q):dt(E,-1)})}var v=tt(U),F=pt(v);{var Y=dt=>{var lt=QE(),_t=aa(lt),zt=tt(_t,2);ue(()=>_t.disabled=P(ct)),jt("click",_t,()=>st.qcPass(P(W).jobId)),jt("click",zt,()=>Zt(r,P(W).jobId,!0)),kt(dt,lt)},nt=dt=>{var lt=tb(),_t=Ut(lt);ue(()=>{var zt;return Rt(_t,`✓ ${((zt=P(W).qcResult)==null?void 0:zt.at)??""??""} 合格`)}),kt(dt,lt)},Q=dt=>{var lt=eb(),_t=Ut(lt);ue(()=>{var zt;return Rt(_t,`已打回：${((zt=P(W).qcResult)==null?void 0:zt.reason)??""}`)}),kt(dt,lt)};Fe(F,dt=>{P(W).stage==="待质检"?dt(Y):P(W).stage==="质检合格"?dt(nt,1):dt(Q,-1)})}ue(dt=>{Rt(Pt,P(W).jobId),Rt(Dt,P(W).parcelId),Rt(Bt,dt),Rt(ft,P(W).qcSubmits??0),Rt(X,P(W).reworkCount)},[()=>l(P(W).assignee)]),jt("click",It,()=>st.selectParcel(P(W).parcelId)),kt(St,xt)});var L=tt($,2);{var et=St=>{var W=ib();kt(St,W)},ot=ii(()=>!st.jobs.some(St=>["待质检","质检合格","不合格打回"].includes(St.stage)));Fe(L,St=>{P(ot)&&St(et)})}var ht=tt(K,2);{var yt=St=>{var W=sb(),ct=pt(W),xt=tt(pt(ct),2),mt=tt(xt,2),Pt=pt(mt),Xt=tt(Pt,2);jt("click",W,()=>Zt(r,null)),jt("click",ct,It=>It.stopPropagation()),Fo(xt,()=>P(s),It=>Zt(s,It)),jt("click",Pt,()=>Zt(r,null)),jt("click",Xt,()=>{st.qcReject(P(r),P(s)),Zt(r,null),Zt(s,"")}),kt(St,W)};Fe(ht,St=>{P(r)&&St(yt)})}kt(k,Z)},j=k=>{const Z=ii(()=>st.dashboard);var K=lb(),$=pt(K),z=pt($),L=tt(pt(z)),et=Ut(L,!0),ot=tt(z,2),ht=tt(pt(ot)),yt=Ut(ht,!0),St=tt(ot,2),W=tt(pt(St)),ct=Ut(W,!0),xt=tt(St,2),mt=tt(pt(xt)),Pt=Ut(mt,!0),Xt=tt(xt,2),It=tt(pt(Xt)),Dt=Ut(It,!0),Ot=tt(Xt,2),Bt=tt(pt(Ot)),S=Ut(Bt),ft=tt($,2),N=pt(ft),X=tt(pt(N),2);Xe(X,17,()=>Object.entries(P(Z).stageCounts),([E,v])=>E,(E,v)=>{var F=ii(()=>tm(P(v),2));let Y=()=>P(F)[0],nt=()=>P(F)[1];var Q=ab(),dt=pt(Q),lt=Ut(dt,!0),_t=tt(dt,2),zt=Ut(_t),gt=tt(_t,2),Tt=Ut(gt,!0);ue(()=>{Rt(lt,Y()),oa(zt,`width:${nt()/P(Z).total*100}%;background:${a[Y()]??"#5a8fb0"}`),Rt(Tt,nt())}),kt(E,Q)});var U=tt(N,2),J=tt(pt(U),2),q=tt(pt(J));Xe(q,21,()=>P(Z).bySurveyor,E=>E.id,(E,v)=>{var F=ob(),Y=pt(F),nt=pt(Y),Q=tt(nt),dt=Ut(Q,!0),lt=tt(Y),_t=Ut(lt,!0),zt=tt(lt),gt=Ut(zt,!0),Tt=tt(zt);let Gt;var $t=Ut(Tt,!0),Lt=tt(Tt),oe=Ut(Lt);ue(te=>{Rt(nt,P(v).name),Rt(dt,P(v).title),Rt(_t,P(v).total),Rt(gt,P(v).done),Gt=Oe(Tt,1,"svelte-1f74wlw",null,Gt,{warn:P(v).rework>0}),Rt($t,P(v).rework),Rt(oe,`${te??""}%`)},[()=>P(v).total?(P(v).rework/Math.max(1,P(v).total)*100).toFixed(0):0]),kt(E,F)}),ue(E=>{Rt(et,P(Z).total),Rt(yt,P(Z).done),Rt(ct,P(Z).rejected),Rt(Pt,P(Z).submits),Rt(Dt,P(Z).reworks),Rt(S,`${E??""}%`)},[()=>(P(Z).reworkRate*100).toFixed(1)]),kt(k,K)};Fe(D,k=>{P(e)==="register"?k(T):P(e)==="jobs"?k(y,1):P(e)==="qc"?k(R,2):k(j,-1)})}ue((k,Z)=>{p=Oe(h,1,"svelte-1f74wlw",null,p,{on:P(e)==="register"}),_=Oe(f,1,"svelte-1f74wlw",null,_,{on:P(e)==="jobs"}),Rt(m,k),w=Oe(d,1,"svelte-1f74wlw",null,w,{on:P(e)==="qc"}),Rt(x,Z),C=Oe(I,1,"svelte-1f74wlw",null,C,{on:P(e)==="board"})},[()=>st.jobs.filter(k=>k.stage==="待分派").length,()=>st.jobs.filter(k=>k.stage==="待质检").length]),jt("click",h,()=>Zt(e,"register")),jt("click",f,()=>Zt(e,"jobs")),jt("click",d,()=>Zt(e,"qc")),jt("click",I,()=>Zt(e,"board")),kt(n,c),Fi()}Pr(["click","change"]);var hb=Vt('<div class="canvas-wrap svelte-1q4sjna"><canvas class="svelte-1q4sjna"></canvas> <div class="map-tools svelte-1q4sjna"><button title="复位视图" class="svelte-1q4sjna">⤢ 复位</button> <button class="svelte-1q4sjna">＋</button> <button class="svelte-1q4sjna">－</button> <span class="scale-tag svelte-1q4sjna"> </span></div> <div class="map-hint svelte-1q4sjna"><!></div></div>');function fb(n,t){Ni(t,!0);let e,i,s,r=1;const a={x:0,y:0,scale:1};let o=0;const l=En({mode:"idle",parcelId:null,ringIndex:0,vertexIndex:-1,edgeIndex:-1,startScreen:null,startWorld:null,lastWorld:null,moved:!1,splitPts:[],splitAwaiting:!1,cursor:"default",hoverSnap:null,hoverWorld:null});function c(){o||(o=requestAnimationFrame(()=>{o=0,j()}))}function u(S){return{x:(S.x-a.x)*a.scale,y:(S.y-a.y)*a.scale}}function h(S){return{x:S.x/a.scale+a.x,y:S.y/a.scale+a.y}}function p(){const S=Xu(st.parcels.map(U=>({rings:U.rings}))),ft=i.getBoundingClientRect(),N=ft.width/(S.w+800),X=ft.height/(S.h+800);a.scale=Math.min(N,X),a.x=(S.minX+S.maxX)/2-ft.width/2/a.scale,a.y=(S.minY+S.maxY)/2-ft.height/2/a.scale,st.viewScale=a.scale,c()}function f(){const S=i.getBoundingClientRect();r=window.devicePixelRatio||1,e.width=Math.round(S.width*r),e.height=Math.round(S.height*r),e.style.width=`${S.width}px`,e.style.height=`${S.height}px`,s.setTransform(r,0,0,r,0,0),c()}function _(S){const ft=8/a.scale,N=st.selectedParcel;if(!N)return null;for(let X=0;X<N.rings.length;X++){const U=N.rings[X];for(let J=0;J<U.length;J++)if(Ai(S,U[J])<=ft)return{parcelId:N.id,ringIndex:X,vertexIndex:J}}return null}function g(S){const ft=7/a.scale,N=st.selectedParcel;if(!N)return null;for(let X=0;X<N.rings.length;X++){const U=N.rings[X];for(let J=0;J<U.length;J++){const q=Sr(S,U[J],U[(J+1)%U.length]);if(q.dist<=ft)return{parcelId:N.id,ringIndex:X,edgeIndex:J,point:q.point}}}return null}function m(S){for(let ft=st.parcels.length-1;ft>=0;ft--){const N=st.parcels[ft];if(B_(S,{rings:N.rings}))return N}return null}function d(S){for(const ft of st.baseData.anchorages)if(jn(S,ft.ring))return ft;return null}function w(S){const ft=e.getBoundingClientRect();return{x:S.clientX-ft.left,y:S.clientY-ft.top}}function M(S){e.setPointerCapture(S.pointerId);const ft=w(S),N=h(ft);if(l.startScreen=ft,l.startWorld=N,l.lastWorld=N,l.moved=!1,S.button===1||S.button===0&&S.altKey||S.button===2&&st.tool==="select"){l.mode="pan";return}if(S.button===0)if(st.tool==="select"){const X=_(N);if(X){st.begin("拖动界址点"),l.mode="drag-vertex",Object.assign(l,X);return}const U=g(N);if(U){st.begin("拖动边线"),l.mode="drag-edge",l.parcelId=U.parcelId,l.ringIndex=U.ringIndex,l.edgeIndex=U.edgeIndex;return}const J=m(N);J&&st.selectParcel(J.id)}else if(st.tool==="box")l.mode="box";else if(st.tool==="split-line")l.mode="split-drawing",l.splitPts=[],l.splitAwaiting=!0;else if(st.tool==="split-fairway")st.splitAlongFairway(),st.setTool("select");else if(st.tool==="split-coast")st.splitAlongCoastline(),st.setTool("select");else if(st.tool==="subtract-anchorage"){const X=d(N);X?st.subtractAnchorage(X.id):st.notify("warn","请点击一个锚地面"),st.setTool("select")}else st.tool==="subtract-fairway"&&(st.subtractFairway(),st.setTool("select"))}function x(S){var X,U;const ft=w(S),N=h(ft);if(l.hoverWorld=N,l.mode==="pan"){a.x-=(ft.x-l.startScreen.x)/a.scale,a.y-=(ft.y-l.startScreen.y)/a.scale,l.startScreen=ft,c();return}if(l.mode==="drag-vertex"){l.moved=!0,(X=st.parcels.find(q=>q.id===l.parcelId))==null||X.rings[l.ringIndex][l.vertexIndex],st.moveVertex(l.parcelId,l.ringIndex,l.vertexIndex,N);const J=(U=st.parcels.find(q=>q.id===l.parcelId))==null?void 0:U.rings[l.ringIndex][l.vertexIndex];l.hoverSnap=J&&Ai(J,N)>1e-6?{point:J,source:st.snapEnabled?"已吸附":null}:null,c();return}if(l.mode==="drag-edge"){l.moved=!0;const J=N.x-l.lastWorld.x,q=N.y-l.lastWorld.y;st.moveEdge(l.parcelId,l.ringIndex,l.edgeIndex,J,q),l.lastWorld=N,c();return}if(l.mode==="box"){l.moved=!0,c();return}if(l.mode==="split-drawing"){c();return}if(st.tool==="select"){const J=_(N),q=J?null:g(N);l.cursor=J?"grab":q?"move":m(N)?"pointer":"default"}else st.tool,l.cursor="crosshair";e.style.cursor=l.cursor}function I(S){const ft=w(S),N=h(ft);if(l.mode==="box"){const X=h(l.startScreen),U={minX:Math.min(X.x,N.x),maxX:Math.max(X.x,N.x),minY:Math.min(X.y,N.y),maxY:Math.max(X.y,N.y)};Ai(X,N)>5/a.scale&&st.boxSelect(U),c()}else if(l.mode==="split-drawing")if(l.splitAwaiting)l.splitPts=[l.startWorld],l.splitAwaiting=!1;else{l.splitPts.push(N);const[X,U]=l.splitPts;Ai(X,U)>5/a.scale?st.splitWithLine(X,U):st.notify("warn","切割线过短，请重新选择终点"),l.splitPts=[],l.splitAwaiting=!1,st.setTool("select")}else(l.mode==="drag-vertex"||l.mode==="drag-edge")&&(l.moved||st.history.undoStack.pop(),l.hoverSnap=null);l.mode="idle",l.parcelId=null,l.vertexIndex=-1,l.edgeIndex=-1,c()}function C(S){if(st.tool!=="select")return;const ft=h(w(S)),N=g(ft);N&&(st.insertVertex(N.parcelId,N.ringIndex,N.edgeIndex,N.point),c())}function A(S){if(S.preventDefault(),st.tool!=="select")return;const ft=h(w(S)),N=g(ft);N&&(st.insertVertex(N.parcelId,N.ringIndex,N.edgeIndex,N.point),c())}function D(S){S.preventDefault();const ft=w(S),N=h(ft),X=S.deltaY<0?1.12:1/1.12;a.scale=Math.min(8,Math.max(.05,a.scale*X)),a.x=N.x-ft.x/a.scale,a.y=N.y-ft.y/a.scale,st.viewScale=a.scale,c()}function T(S){S.target&&["INPUT","TEXTAREA","SELECT"].includes(S.target.tagName)||((S.ctrlKey||S.metaKey)&&S.key.toLowerCase()==="z"&&!S.shiftKey?(S.preventDefault(),st.undo(),c()):(S.ctrlKey||S.metaKey)&&(S.key.toLowerCase()==="y"||S.shiftKey&&S.key.toLowerCase()==="z")?(S.preventDefault(),st.redo(),c()):S.key==="Delete"||S.key==="Backspace"?l.vertexIndex>=0&&l.parcelId&&(st.deleteVertex(l.parcelId,l.ringIndex,l.vertexIndex),l.vertexIndex=-1,c()):S.key==="Escape"&&(l.splitPts=[],l.splitAwaiting=!1,st.clearBox(),st.setTool("select"),c()))}let y=ku(()=>{ns(()=>{st.parcels,st.selectedParcelId,st.layers,st.tool,st.snapEnabled,st.boxSelectedIds,st.validation,c()})});cl(()=>{s=e.getContext("2d"),f(),p();const S=new ResizeObserver(f);S.observe(i),window.addEventListener("keydown",T),Xd(()=>{S.disconnect(),window.removeEventListener("keydown",T),y(),o&&cancelAnimationFrame(o)})});function R(S,ft,N,X=1.6,U=null){s.beginPath(),S.forEach((J,q)=>{const E=u(J);q===0?s.moveTo(E.x,E.y):s.lineTo(E.x,E.y)}),s.closePath(),ft&&(s.fillStyle=ft,s.fill()),N&&(s.strokeStyle=N,s.lineWidth=X,s.setLineDash(U??[]),s.stroke(),s.setLineDash([]))}function j(){var X;const S=e.clientWidth,ft=e.clientHeight;s.clearRect(0,0,S,ft),s.fillStyle="#eef3f7",s.fillRect(0,0,S,ft),K(S,ft);const N=st.layers;if(N.aquaculture)for(const U of st.baseData.aquacultureZones){R(U.ring,"rgba(76, 145, 96, 0.12)","#4c9160",1.2,[6,4]);const J=u(Di(U.ring));z(J.x,J.y,U.name,"#356644",11)}if(N.anchorages)for(const U of st.baseData.anchorages){R(U.ring,"rgba(154, 61, 61, 0.14)","#9a3d3d",1.4,[4,3]);const J=u(Di(U.ring));z(J.x,J.y,`⚓${U.name}`,"#7d2f2f",11)}if(N.fairway){const U=st.baseData.fairway,J=jd(U.centerline,U.width/2);R(J,"rgba(47, 111, 176, 0.08)","rgba(47,111,176,0.55)",1,[8,5]),$(U.centerline,"#2f6fb0",1.4,[10,5]);const q=u(U.centerline[Math.floor(U.centerline.length/2)]);z(q.x,q.y-10,`${U.name}（宽${U.width}m）`,"#245a91",11)}if(N.coastline){$(st.baseData.coastline,"#6b5a3a",2.4),st.baseData.coastline.forEach(J=>{const q=u(J);s.beginPath(),s.arc(q.x,q.y,3,0,Math.PI*2),s.fillStyle="#6b5a3a",s.fill()});const U=u(st.baseData.coastline[2]);z(U.x,U.y-14,"海岸线","#5a4a2e",12,"bold")}if(N.parcels&&st.parcels.forEach(U=>{const J=U.id===st.selectedParcelId,q=st.boxSelectedIds.includes(U.id),E=st.issuesOf(U.id),v=E.some(nt=>nt.type==="自相交"),F=hl(U.seaType);U.rings.forEach((nt,Q)=>{Q===0?R(nt,L(F,N.seaTypes?.26:.12),v?"#d12b2b":J?"#0d47a1":q?"#1565c0":"#33475b",J?2.4:1.6):R(nt,"rgba(238,243,247,0.92)","#7a3b1d",1.4,[5,3])});const Y=u(Di(U.rings[0]));if(z(Y.x,Y.y,U.id,"#102a43",12,"bold"),N.seaTypes&&z(Y.x,Y.y+14,ul(U.seaType),F,11),z(Y.x,Y.y+28,`${Dr({rings:U.rings}).toFixed(1)} m²`,"#51637a",10),v){for(const nt of E.filter(Q=>Q.type==="自相交")){const Q=u(nt.point);s.beginPath(),s.arc(Q.x,Q.y,7,0,Math.PI*2),s.strokeStyle="#d12b2b",s.lineWidth=2.5,s.stroke()}z(Y.x,Y.y-16,"⚠ 自相交·禁止提交","#d12b2b",11,"bold")}}),N.vertices&&st.parcels.forEach(U=>{const J=U.id===st.selectedParcelId;U.rings.forEach((q,E)=>{q.forEach((v,F)=>{const Y=u(v);s.beginPath(),s.arc(Y.x,Y.y,J?4.5:3,0,Math.PI*2),s.fillStyle=J?"#0d47a1":"#33475b",s.fill(),J&&(s.strokeStyle="#ffffff",s.lineWidth=1.2,s.stroke(),z(Y.x+7,Y.y-7,E===0?`J${F+1}`:`K${E}-${F+1}`,"#0d47a1",10))})})}),l.mode==="box"&&l.startScreen){const U=l.startScreen,J=w(k);s.strokeStyle="#1565c0",s.fillStyle="rgba(21,101,192,0.10)",s.lineWidth=1.4,s.fillRect(U.x,U.y,J.x-U.x,J.y-U.y),s.strokeRect(U.x,U.y,J.x-U.x,J.y-U.y)}if(l.mode==="split-drawing"&&!l.splitAwaiting&&l.splitPts.length){const U=[...l.splitPts,l.hoverWorld].filter(Boolean);$(U,"#e65100",2,[7,4]),U.forEach(J=>{const q=u(J);s.beginPath(),s.arc(q.x,q.y,4,0,Math.PI*2),s.fillStyle="#e65100",s.fill()})}if((X=l.hoverSnap)!=null&&X.point){const U=u(l.hoverSnap.point);s.strokeStyle="#00897b",s.lineWidth=2,s.beginPath(),s.arc(U.x,U.y,9,0,Math.PI*2),s.stroke(),z(U.x+12,U.y-10,`吸附 ${l.hoverSnap.source??""}`,"#00695c",10,"bold")}}let k={clientX:0,clientY:0};function Z(S){k=S}function K(S,ft){const N=100*a.scale;if(N<14)return;const X=-a.x*a.scale,U=-a.y*a.scale;s.strokeStyle="rgba(100,125,150,0.14)",s.lineWidth=1,s.beginPath();for(let J=X%N;J<S;J+=N)s.moveTo(J,0),s.lineTo(J,ft);for(let J=U%N;J<ft;J+=N)s.moveTo(0,J),s.lineTo(S,J);s.stroke()}function $(S,ft,N,X=null){S.length<2||(s.beginPath(),S.forEach((U,J)=>{const q=u(U);J===0?s.moveTo(q.x,q.y):s.lineTo(q.x,q.y)}),s.strokeStyle=ft,s.lineWidth=N,s.setLineDash(X??[]),s.stroke(),s.setLineDash([]))}function z(S,ft,N,X,U=11,J="normal"){s.font=`${J} ${U}px "Microsoft YaHei", sans-serif`,s.fillStyle=X,s.textAlign="center",s.fillText(N,S,ft)}function L(S,ft){const N=parseInt(S.slice(1),16);return`rgba(${N>>16&255},${N>>8&255},${N&255},${ft})`}var et=hb(),ot=pt(et);Pc(ot,S=>e=S,()=>e);var ht=tt(ot,2),yt=pt(ht),St=tt(yt,2),W=tt(St,2),ct=tt(W,2),xt=Ut(ct),mt=tt(ht,2),Pt=pt(mt);{var Xt=S=>{var ft=Or("滚轮缩放 · Alt/右键拖动平移 · 拖动界址点/边线编辑 · 双击边线加点 · 右键边线加点 · Del 删点");kt(S,ft)},It=S=>{var ft=Or("按住鼠标拖出矩形框选相邻宗海，松开后点工具栏「合并框选宗海」");kt(S,ft)},Dt=S=>{var ft=Or("两次单击分别确定切割线起点与终点（Esc 取消）");kt(S,ft)},Ot=S=>{var ft=Or("单击要扣除的锚地面");kt(S,ft)},Bt=S=>{var ft=Or("操作完成后自动返回选择模式，Esc 可取消");kt(S,ft)};Fe(Pt,S=>{st.tool==="select"?S(Xt):st.tool==="box"?S(It,1):st.tool==="split-line"?S(Dt,2):st.tool==="subtract-anchorage"?S(Ot,3):S(Bt,-1)})}Pc(et,S=>i=S,()=>i),ue(S=>Rt(xt,`${S??""}%`),[()=>(a.scale*100).toFixed(0)]),jt("pointerdown",ot,M),jt("pointermove",ot,S=>{Z(S),x(S)}),jt("pointerup",ot,I),jt("dblclick",ot,C),jt("contextmenu",ot,A),s_("wheel",ot,D),jt("click",yt,p),jt("click",St,()=>{a.scale*=1.2,st.viewScale=a.scale,c()}),jt("click",W,()=>{a.scale/=1.2,st.viewScale=a.scale,c()}),kt(n,et),Fi()}Pr(["pointerdown","pointermove","pointerup","dblclick","contextmenu","click"]);var db=Vt('<div><span class="ico svelte-1pixw6y"> </span> <span> </span></div>');function pb(n,t){Ni(t,!0);let e;ns(()=>{if(st.notice){clearTimeout(e);const a=st.notice.id;e=setTimeout(()=>st.clearNotice(a),4200)}});var i=o_(),s=aa(i);{var r=a=>{var o=db(),l=pt(o),c=Ut(l,!0),u=tt(l,2),h=Ut(u,!0);ue(()=>{Oe(o,1,`toast ${st.notice.type??""}`,"svelte-1pixw6y"),er(o,"key",st.notice.id),Rt(c,st.notice.type==="ok"?"✓":st.notice.type==="warn"?"!":"✕"),Rt(h,st.notice.text)}),kt(a,o)};Fe(s,a=>{st.notice&&a(r)})}kt(n,i),Fi()}var mb=Vt('<div class="app-shell svelte-1n46o8q"><!> <div class="workspace svelte-1n46o8q"><!> <main class="map-area svelte-1n46o8q"><!></main> <!></div> <!> <!></div>');function _b(n,t){Ni(t,!1),cl(()=>{st.notify("ok","系统就绪：示例含 3 宗宗海、海岸线、主航道与 2 处锚地")}),Wd();var e=mb(),i=pt(e);ug(i,{});var s=tt(i,2),r=pt(s);_g(r,{});var a=tt(r,2),o=pt(a);fb(o,{});var l=tt(a,2);HE(l,{});var c=tt(s,2);ub(c,{});var u=tt(c,2);pb(u,{}),kt(n,e),Fi()}m_(_b,{target:document.getElementById("app")});
