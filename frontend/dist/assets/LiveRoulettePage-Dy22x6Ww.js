var ae=Object.defineProperty;var ie=(e,t,r)=>t in e?ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var N=(e,t,r)=>ie(e,typeof t!="symbol"?t+"":t,r);import{j as n,L as oe}from"./ui-TF4rhkS0.js";import{g as B,r as x,b as T,d as le}from"./vendor-CYNtys_G.js";import{e as $,E as S}from"./index-lQGp847G.js";var ce=typeof Element<"u",de=typeof Map=="function",ue=typeof Set=="function",me=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function P(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var r,s,i;if(Array.isArray(e)){if(r=e.length,r!=t.length)return!1;for(s=r;s--!==0;)if(!P(e[s],t[s]))return!1;return!0}var c;if(de&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(c=e.entries();!(s=c.next()).done;)if(!t.has(s.value[0]))return!1;for(c=e.entries();!(s=c.next()).done;)if(!P(s.value[1],t.get(s.value[0])))return!1;return!0}if(ue&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(c=e.entries();!(s=c.next()).done;)if(!t.has(s.value[0]))return!1;return!0}if(me&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(r=e.length,r!=t.length)return!1;for(s=r;s--!==0;)if(e[s]!==t[s])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(i=Object.keys(e),r=i.length,r!==Object.keys(t).length)return!1;for(s=r;s--!==0;)if(!Object.prototype.hasOwnProperty.call(t,i[s]))return!1;if(ce&&e instanceof Element)return!1;for(s=r;s--!==0;)if(!((i[s]==="_owner"||i[s]==="__v"||i[s]==="__o")&&e.$$typeof)&&!P(e[i[s]],t[i[s]]))return!1;return!0}return e!==e&&t!==t}var he=function(t,r){try{return P(t,r)}catch(s){if((s.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw s}};const fe=B(he);var ge=function(e,t,r,s,i,c,m,o){if(!e){var d;if(t===void 0)d=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[r,s,i,c,m,o],f=0;d=new Error(t.replace(/%s/g,function(){return u[f++]})),d.name="Invariant Violation"}throw d.framesToPop=1,d}},pe=ge;const K=B(pe);var xe=function(t,r,s,i){var c=s?s.call(i,t,r):void 0;if(c!==void 0)return!!c;if(t===r)return!0;if(typeof t!="object"||!t||typeof r!="object"||!r)return!1;var m=Object.keys(t),o=Object.keys(r);if(m.length!==o.length)return!1;for(var d=Object.prototype.hasOwnProperty.bind(r),u=0;u<m.length;u++){var f=m[u];if(!d(f))return!1;var h=t[f],p=r[f];if(c=s?s.call(i,h,p,f):void 0,c===!1||c===void 0&&h!==p)return!1}return!0};const ve=B(xe);var Q=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(Q||{}),D={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},Y=Object.values(Q),V={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},ye=Object.entries(V).reduce((e,[t,r])=>(e[r]=t,e),{}),w="data-rh",R={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},E=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){const s=e[r];if(Object.prototype.hasOwnProperty.call(s,t))return s[t]}return null},be=e=>{let t=E(e,"title");const r=E(e,R.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),r&&t)return r.replace(/%s/g,()=>t);const s=E(e,R.DEFAULT_TITLE);return t||s||void 0},je=e=>E(e,R.ON_CHANGE_CLIENT_STATE)||(()=>{}),M=(e,t)=>t.filter(r=>typeof r[e]<"u").map(r=>r[e]).reduce((r,s)=>({...r,...s}),{}),we=(e,t)=>t.filter(r=>typeof r.base<"u").map(r=>r.base).reverse().reduce((r,s)=>{if(!r.length){const i=Object.keys(s);for(let c=0;c<i.length;c+=1){const o=i[c].toLowerCase();if(e.indexOf(o)!==-1&&s[o])return r.concat(s)}}return r},[]),Ne=e=>console&&typeof console.warn=="function"&&console.warn(e),O=(e,t,r)=>{const s={};return r.filter(i=>Array.isArray(i[e])?!0:(typeof i[e]<"u"&&Ne(`Helmet: ${e} should be of type "Array". Instead found type "${typeof i[e]}"`),!1)).map(i=>i[e]).reverse().reduce((i,c)=>{const m={};c.filter(d=>{let u;const f=Object.keys(d);for(let p=0;p<f.length;p+=1){const a=f[p],l=a.toLowerCase();t.indexOf(l)!==-1&&!(u==="rel"&&d[u].toLowerCase()==="canonical")&&!(l==="rel"&&d[l].toLowerCase()==="stylesheet")&&(u=l),t.indexOf(a)!==-1&&(a==="innerHTML"||a==="cssText"||a==="itemprop")&&(u=a)}if(!u||!d[u])return!1;const h=d[u].toLowerCase();return s[u]||(s[u]={}),m[u]||(m[u]={}),s[u][h]?!1:(m[u][h]=!0,!0)}).reverse().forEach(d=>i.push(d));const o=Object.keys(m);for(let d=0;d<o.length;d+=1){const u=o[d],f={...s[u],...m[u]};s[u]=f}return i},[]).reverse()},Te=(e,t)=>{if(Array.isArray(e)&&e.length){for(let r=0;r<e.length;r+=1)if(e[r][t])return!0}return!1},Ae=e=>({baseTag:we(["href"],e),bodyAttributes:M("bodyAttributes",e),defer:E(e,R.DEFER),encode:E(e,R.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:M("htmlAttributes",e),linkTags:O("link",["rel","href"],e),metaTags:O("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:O("noscript",["innerHTML"],e),onChangeClientState:je(e),scriptTags:O("script",["src","innerHTML"],e),styleTags:O("style",["cssText"],e),title:be(e),titleAttributes:M("titleAttributes",e),prioritizeSeoTags:Te(e,R.PRIORITIZE_SEO_TAGS)}),X=e=>Array.isArray(e)?e.join(""):e,Ce=(e,t)=>{const r=Object.keys(e);for(let s=0;s<r.length;s+=1)if(t[r[s]]&&t[r[s]].includes(e[r[s]]))return!0;return!1},z=(e,t)=>Array.isArray(e)?e.reduce((r,s)=>(Ce(s,t)?r.priority.push(s):r.default.push(s),r),{priority:[],default:[]}):{default:e,priority:[]},Z=(e,t)=>({...e,[t]:void 0}),Se=["noscript","script","style"],H=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),ee=e=>Object.keys(e).reduce((t,r)=>{const s=typeof e[r]<"u"?`${r}="${e[r]}"`:`${r}`;return t?`${t} ${s}`:s},""),Re=(e,t,r,s)=>{const i=ee(r),c=X(t);return i?`<${e} ${w}="true" ${i}>${H(c,s)}</${e}>`:`<${e} ${w}="true">${H(c,s)}</${e}>`},Ee=(e,t,r=!0)=>t.reduce((s,i)=>{const c=i,m=Object.keys(c).filter(u=>!(u==="innerHTML"||u==="cssText")).reduce((u,f)=>{const h=typeof c[f]>"u"?f:`${f}="${H(c[f],r)}"`;return u?`${u} ${h}`:h},""),o=c.innerHTML||c.cssText||"",d=Se.indexOf(e)===-1;return`${s}<${e} ${w}="true" ${m}${d?"/>":`>${o}</${e}>`}`},""),te=(e,t={})=>Object.keys(e).reduce((r,s)=>{const i=V[s];return r[i||s]=e[s],r},t),Oe=(e,t,r)=>{const s={key:t,[w]:!0},i=te(r,s);return[T.createElement("title",i,t)]},k=(e,t)=>t.map((r,s)=>{const i={key:s,[w]:!0};return Object.keys(r).forEach(c=>{const o=V[c]||c;if(o==="innerHTML"||o==="cssText"){const d=r.innerHTML||r.cssText;i.dangerouslySetInnerHTML={__html:d}}else i[o]=r[c]}),T.createElement(e,i)}),b=(e,t,r=!0)=>{switch(e){case"title":return{toComponent:()=>Oe(e,t.title,t.titleAttributes),toString:()=>Re(e,t.title,t.titleAttributes,r)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>te(t),toString:()=>ee(t)};default:return{toComponent:()=>k(e,t),toString:()=>Ee(e,t,r)}}},Le=({metaTags:e,linkTags:t,scriptTags:r,encode:s})=>{const i=z(e,D.meta),c=z(t,D.link),m=z(r,D.script);return{priorityMethods:{toComponent:()=>[...k("meta",i.priority),...k("link",c.priority),...k("script",m.priority)],toString:()=>`${b("meta",i.priority,s)} ${b("link",c.priority,s)} ${b("script",m.priority,s)}`},metaTags:i.default,linkTags:c.default,scriptTags:m.default}},$e=e=>{const{baseTag:t,bodyAttributes:r,encode:s=!0,htmlAttributes:i,noscriptTags:c,styleTags:m,title:o="",titleAttributes:d,prioritizeSeoTags:u}=e;let{linkTags:f,metaTags:h,scriptTags:p}=e,a={toComponent:()=>{},toString:()=>""};return u&&({priorityMethods:a,linkTags:f,metaTags:h,scriptTags:p}=Le(e)),{priority:a,base:b("base",t,s),bodyAttributes:b("bodyAttributes",r,s),htmlAttributes:b("htmlAttributes",i,s),link:b("link",f,s),meta:b("meta",h,s),noscript:b("noscript",c,s),script:b("script",p,s),style:b("style",m,s),title:b("title",{title:o,titleAttributes:d},s)}},U=$e,I=[],re=!!(typeof window<"u"&&window.document&&window.document.createElement),F=class{constructor(e,t){N(this,"instances",[]);N(this,"canUseDOM",re);N(this,"context");N(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?I:this.instances,add:e=>{(this.canUseDOM?I:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?I:this.instances).indexOf(e);(this.canUseDOM?I:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=U({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},Ie={},se=T.createContext(Ie),A,Pe=(A=class extends x.Component{constructor(r){super(r);N(this,"helmetData");this.helmetData=new F(this.props.context||{},A.canUseDOM)}render(){return T.createElement(se.Provider,{value:this.helmetData.value},this.props.children)}},N(A,"canUseDOM",re),A),C=(e,t)=>{const r=document.head||document.querySelector("head"),s=r.querySelectorAll(`${e}[${w}]`),i=[].slice.call(s),c=[];let m;return t&&t.length&&t.forEach(o=>{const d=document.createElement(e);for(const u in o)if(Object.prototype.hasOwnProperty.call(o,u))if(u==="innerHTML")d.innerHTML=o.innerHTML;else if(u==="cssText")d.styleSheet?d.styleSheet.cssText=o.cssText:d.appendChild(document.createTextNode(o.cssText));else{const f=u,h=typeof o[f]>"u"?"":o[f];d.setAttribute(u,h)}d.setAttribute(w,"true"),i.some((u,f)=>(m=f,d.isEqualNode(u)))?i.splice(m,1):c.push(d)}),i.forEach(o=>{var d;return(d=o.parentNode)==null?void 0:d.removeChild(o)}),c.forEach(o=>r.appendChild(o)),{oldTags:i,newTags:c}},q=(e,t)=>{const r=document.getElementsByTagName(e)[0];if(!r)return;const s=r.getAttribute(w),i=s?s.split(","):[],c=[...i],m=Object.keys(t);for(const o of m){const d=t[o]||"";r.getAttribute(o)!==d&&r.setAttribute(o,d),i.indexOf(o)===-1&&i.push(o);const u=c.indexOf(o);u!==-1&&c.splice(u,1)}for(let o=c.length-1;o>=0;o-=1)r.removeAttribute(c[o]);i.length===c.length?r.removeAttribute(w):r.getAttribute(w)!==m.join(",")&&r.setAttribute(w,m.join(","))},ke=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=X(e)),q("title",t)},G=(e,t)=>{const{baseTag:r,bodyAttributes:s,htmlAttributes:i,linkTags:c,metaTags:m,noscriptTags:o,onChangeClientState:d,scriptTags:u,styleTags:f,title:h,titleAttributes:p}=e;q("body",s),q("html",i),ke(h,p);const a={baseTag:C("base",r),linkTags:C("link",c),metaTags:C("meta",m),noscriptTags:C("noscript",o),scriptTags:C("script",u),styleTags:C("style",f)},l={},y={};Object.keys(a).forEach(g=>{const{newTags:v,oldTags:j}=a[g];v.length&&(l[g]=v),j.length&&(y[g]=a[g].oldTags)}),t&&t(),d(e,l,y)},L=null,De=e=>{L&&cancelAnimationFrame(L),e.defer?L=requestAnimationFrame(()=>{G(e,()=>{L=null})}):(G(e),L=null)},Me=De,W=class extends x.Component{constructor(){super(...arguments);N(this,"rendered",!1)}shouldComponentUpdate(t){return!ve(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:r}=this.props.context;let s=null;const i=Ae(t.get().map(c=>{const m={...c.props};return delete m.context,m}));Pe.canUseDOM?Me(i):U&&(s=U(i)),r(s)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},_,ze=(_=class extends x.Component{shouldComponentUpdate(e){return!fe(Z(this.props,"helmetData"),Z(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,r,s){return{...t,[e.type]:[...t[e.type]||[],{...r,...this.mapNestedChildrenToProps(e,s)}]}}mapObjectTypeChildren(e,t,r,s){switch(e.type){case"title":return{...t,[e.type]:s,titleAttributes:{...r}};case"body":return{...t,bodyAttributes:{...r}};case"html":return{...t,htmlAttributes:{...r}};default:return{...t,[e.type]:{...r}}}}mapArrayTypeChildrenToProps(e,t){let r={...t};return Object.keys(e).forEach(s=>{r={...r,[s]:e[s]}}),r}warnOnInvalidChildren(e,t){return K(Y.some(r=>e.type===r),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${Y.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),K(!t||typeof t=="string"||Array.isArray(t)&&!t.some(r=>typeof r!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let r={};return T.Children.forEach(e,s=>{if(!s||!s.props)return;const{children:i,...c}=s.props,m=Object.keys(c).reduce((d,u)=>(d[ye[u]||u]=c[u],d),{});let{type:o}=s;switch(typeof o=="symbol"?o=o.toString():this.warnOnInvalidChildren(s,i),o){case"Symbol(react.fragment)":t=this.mapChildrenToProps(i,t);break;case"link":case"meta":case"noscript":case"script":case"style":r=this.flattenArrayTypeChildren(s,r,m,i);break;default:t=this.mapObjectTypeChildren(s,t,m,i);break}}),this.mapArrayTypeChildrenToProps(r,t)}render(){const{children:e,...t}=this.props;let r={...t},{helmetData:s}=t;if(e&&(r=this.mapChildrenToProps(e,r)),s&&!(s instanceof F)){const i=s;s=new F(i.context,!0),delete r.helmetData}return s?T.createElement(W,{...r,context:s.value}):T.createElement(se.Consumer,null,i=>T.createElement(W,{...r,context:i}))}},N(_,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),_);const _e=e=>{const t=parseInt(e,10);return t===0?"sc-kJLGgd iDZRwn":[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(t)?"sc-kJLGgd dPOPqL":"sc-kJLGgd bYTuoA"},He=({tableId:e,tableName:t})=>{const[r,s]=x.useState([]),[i,c]=x.useState(null);x.useRef([]);const m=le(),o=x.useRef(0);x.useRef(!0);const d=$.getInstance();x.useEffect(()=>{try{if(!d){console.error("[LastNumbersBar] FeedService não está disponível"),s([]);return}let h=[];try{h=d.getLastNumbersForTable(e)||[],h=h.map(p=>typeof p=="string"?parseInt(p,10):p),h=h.filter(p=>!isNaN(p))}catch(p){console.error(`[LastNumbersBar] Erro ao obter números iniciais para ${t}:`,p),h=[]}console.log(`[LastNumbersBar] Carregados ${h.length} números iniciais para ${t}`),s(h),h.length>0&&(c(h[0]),f())}catch(h){console.error(`[LastNumbersBar] Erro durante inicialização para ${t}:`,h),s([])}},[e,t]),x.useCallback(h=>{var p;try{if(!h||!h.tableId){console.warn("[LastNumbersBar] Dados de atualização inválidos:",h);return}if(h.tableId!==e)return;if(console.log(`[LastNumbersBar] Atualização para ${t}:`,{isNewNumber:h.isNewNumber,numbersLength:((p=h.numbers)==null?void 0:p.length)||0}),h.isNewNumber&&Array.isArray(h.numbers)&&h.numbers.length>0){let a=[];try{a=h.numbers.map(l=>typeof l=="string"?parseInt(l,10):l),a=a.filter(l=>!isNaN(l))}catch(l){console.error("[LastNumbersBar] Erro ao processar números:",l);return}if(a.length===0){console.warn("[LastNumbersBar] Nenhum número válido após processamento");return}s(a),console.log(`[LastNumbersBar] NOVO NÚMERO DESTACADO para ${t}: ${a[0]}`),c(a[0]),f()}}catch(a){console.error(`[LastNumbersBar] Erro ao processar atualização para ${t}:`,a)}},[e,t]);const u=()=>{m(`/roulette/${e}`)},f=()=>{};return n.jsx("div",{className:"cy-live-casino-grid-item",onClick:u,children:n.jsxs("div",{className:"sc-jhRbCK dwoBEu cy-live-casino-grid-item-infobar",children:[n.jsx("div",{className:"sc-hGwcmR dYPzjx cy-live-casino-grid-item-infobar-dealer-name",children:t}),n.jsx("div",{className:"sc-brePHE gjvwkd cy-live-casino-grid-item-infobar-draws",children:r.map((h,p)=>{const a=_e(h),l=i===p?"highlight-new":"";return n.jsx("div",{className:`${a} ${l}`,style:{display:"flex",justifyContent:"center",alignItems:"center"},children:n.jsx("span",{children:h})},`${e}-${p}-${h}-${o.current}`)})})]})})},Ue=({roletaNome:e,lastNumbers:t})=>{const r=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],s=t.filter(a=>r.includes(a)).length,i=t.filter(a=>a!==0&&!r.includes(a)).length,c=t.filter(a=>a===0).length,m=t.length,o=Math.round(s/m*100),d=Math.round(i/m*100),u=Math.round(c/m*100),f={};t.forEach(a=>{f[a]=(f[a]||0)+1});const h=Object.entries(f).sort((a,l)=>l[1]-a[1]).slice(0,5).map(a=>({number:parseInt(a[0]),count:a[1]})),p=Object.entries(f).sort((a,l)=>a[1]-l[1]).slice(0,5).map(a=>({number:parseInt(a[0]),count:a[1]}));return n.jsxs("div",{className:"p-6",children:[n.jsxs("h2",{className:"text-xl font-bold text-green-500 mb-4",children:[e," - Estatísticas"]}),n.jsxs("div",{className:"grid grid-cols-3 gap-6",children:[n.jsxs("div",{className:"bg-gray-800 rounded-lg p-4",children:[n.jsx("h3",{className:"text-white font-semibold mb-3",children:"Últimos Números"}),n.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:t.slice(0,18).map((a,l)=>{const y=a===0?"bg-green-600":r.includes(a)?"bg-red-600":"bg-black";return n.jsx("div",{className:`${y} w-8 h-8 rounded-full flex items-center justify-center text-white font-medium`,children:a},l)})}),n.jsxs("p",{className:"text-gray-400 text-sm",children:["Total de jogos: ",m]})]}),n.jsxs("div",{className:"bg-gray-800 rounded-lg p-4",children:[n.jsx("h3",{className:"text-white font-semibold mb-3",children:"Distribuição de Cores"}),n.jsxs("div",{className:"mb-2",children:[n.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[n.jsx("span",{className:"text-red-500",children:"Vermelho"}),n.jsxs("span",{className:"text-white",children:[s," (",o,"%)"]})]}),n.jsx("div",{className:"w-full bg-gray-700 rounded-full h-2.5",children:n.jsx("div",{className:"bg-red-600 h-2.5 rounded-full",style:{width:`${o}%`}})})]}),n.jsxs("div",{className:"mb-2",children:[n.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[n.jsx("span",{className:"text-gray-300",children:"Preto"}),n.jsxs("span",{className:"text-white",children:[i," (",d,"%)"]})]}),n.jsx("div",{className:"w-full bg-gray-700 rounded-full h-2.5",children:n.jsx("div",{className:"bg-gray-900 h-2.5 rounded-full",style:{width:`${d}%`}})})]}),n.jsxs("div",{className:"mb-2",children:[n.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[n.jsx("span",{className:"text-green-500",children:"Zero"}),n.jsxs("span",{className:"text-white",children:[c," (",u,"%)"]})]}),n.jsx("div",{className:"w-full bg-gray-700 rounded-full h-2.5",children:n.jsx("div",{className:"bg-green-600 h-2.5 rounded-full",style:{width:`${u}%`}})})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-2 mt-4",children:[n.jsxs("div",{className:"bg-gray-700 p-2 rounded",children:[n.jsx("p",{className:"text-xs text-gray-400",children:"Par"}),n.jsxs("p",{className:"text-white font-medium",children:[t.filter(a=>a!==0&&a%2===0).length," (",Math.round(t.filter(a=>a!==0&&a%2===0).length/m*100),"%)"]})]}),n.jsxs("div",{className:"bg-gray-700 p-2 rounded",children:[n.jsx("p",{className:"text-xs text-gray-400",children:"Ímpar"}),n.jsxs("p",{className:"text-white font-medium",children:[t.filter(a=>a%2===1).length," (",Math.round(t.filter(a=>a%2===1).length/m*100),"%)"]})]}),n.jsxs("div",{className:"bg-gray-700 p-2 rounded",children:[n.jsx("p",{className:"text-xs text-gray-400",children:"1-18"}),n.jsxs("p",{className:"text-white font-medium",children:[t.filter(a=>a>=1&&a<=18).length," (",Math.round(t.filter(a=>a>=1&&a<=18).length/m*100),"%)"]})]}),n.jsxs("div",{className:"bg-gray-700 p-2 rounded",children:[n.jsx("p",{className:"text-xs text-gray-400",children:"19-36"}),n.jsxs("p",{className:"text-white font-medium",children:[t.filter(a=>a>=19&&a<=36).length," (",Math.round(t.filter(a=>a>=19&&a<=36).length/m*100),"%)"]})]})]})]}),n.jsxs("div",{className:"bg-gray-800 rounded-lg p-4",children:[n.jsx("h3",{className:"text-white font-semibold mb-3",children:"Frequência de Números"}),n.jsxs("div",{className:"mb-4",children:[n.jsx("h4",{className:"text-sm text-gray-400 mb-2",children:"Números Quentes"}),n.jsx("div",{className:"flex flex-wrap gap-2",children:h.map(({number:a,count:l})=>{const y=a===0?"bg-green-600":r.includes(a)?"bg-red-600":"bg-black";return n.jsxs("div",{className:"flex flex-col items-center",children:[n.jsx("div",{className:`${y} w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mb-1`,children:a}),n.jsxs("span",{className:"text-xs text-gray-400",children:[l,"x"]})]},a)})})]}),n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm text-gray-400 mb-2",children:"Números Frios"}),n.jsx("div",{className:"flex flex-wrap gap-2",children:p.map(({number:a,count:l})=>{const y=a===0?"bg-green-600":r.includes(a)?"bg-red-600":"bg-black";return n.jsxs("div",{className:"flex flex-col items-center",children:[n.jsx("div",{className:`${y} w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mb-1`,children:a}),n.jsxs("span",{className:"text-xs text-gray-400",children:[l,"x"]})]},a)})})]})]})]}),n.jsxs("div",{className:"mt-6 bg-gray-800 rounded-lg p-4",children:[n.jsx("h3",{className:"text-white font-semibold mb-3",children:"Resumo de Estatísticas"}),n.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[n.jsxs("div",{className:"bg-gray-700 p-3 rounded",children:[n.jsx("p",{className:"text-sm text-gray-400",children:"Vermelhos"}),n.jsx("p",{className:"text-xl font-bold text-white",children:s}),n.jsxs("p",{className:"text-xs text-red-400",children:[o,"% do total"]})]}),n.jsxs("div",{className:"bg-gray-700 p-3 rounded",children:[n.jsx("p",{className:"text-sm text-gray-400",children:"Pretos"}),n.jsx("p",{className:"text-xl font-bold text-white",children:i}),n.jsxs("p",{className:"text-xs text-gray-400",children:[d,"% do total"]})]}),n.jsxs("div",{className:"bg-gray-700 p-3 rounded",children:[n.jsx("p",{className:"text-sm text-gray-400",children:"Zeros"}),n.jsx("p",{className:"text-xl font-bold text-white",children:c}),n.jsxs("p",{className:"text-xs text-green-400",children:[u,"% do total"]})]}),n.jsxs("div",{className:"bg-gray-700 p-3 rounded",children:[n.jsx("p",{className:"text-sm text-gray-400",children:"Total de jogos"}),n.jsx("p",{className:"text-xl font-bold text-white",children:m}),n.jsx("p",{className:"text-xs text-blue-400",children:"100%"})]})]})]})]})},Fe=({roulettesData:e})=>{const[t,r]=x.useState([]),[s,i]=x.useState([]),[c,m]=x.useState(!0),[o,d]=x.useState(null),[u,f]=x.useState(!1),h=x.useRef([]),p=T.useMemo(()=>window.isRouletteSystemInitialized&&window.isRouletteSystemInitialized()?(console.log("[LiveRoulettesDisplay] Usando sistema de roletas já inicializado"),window.getRouletteSystem?window.getRouletteSystem().rouletteFeedService:$.getInstance()):(console.log("[LiveRoulettesDisplay] Sistema global não detectado, usando instância padrão"),$.getInstance()),[]);x.useEffect(()=>{if(e&&Array.isArray(e)&&e.length>0)console.log(`[LiveRoulettesDisplay] Usando ${e.length} roletas fornecidas via props`),i(e),m(!1);else{console.log("[LiveRoulettesDisplay] Buscando dados de roletas do serviço centralizado");const l=p.getAllRoulettes();l&&l.length>0?(console.log(`[LiveRoulettesDisplay] Usando ${l.length} roletas do cache centralizado`),i(l),m(!1)):(console.log("[LiveRoulettesDisplay] Aguardando dados serem carregados pela inicialização central"),setTimeout(()=>{const y=p.getAllRoulettes();y&&y.length>0&&(console.log(`[LiveRoulettesDisplay] Dados recebidos após espera: ${y.length} roletas`),i(y),m(!1))},3e3))}},[p,e]),x.useEffect(()=>{s.length>1&&!o&&!c&&(console.log("[LiveRoulettesDisplay] Simulando clique na segunda roleta"),setTimeout(()=>{a(s[1])},100))},[s,o,c]),x.useEffect(()=>{const l=y=>{console.log("[LiveRoulettesDisplay] Recebida atualização de dados");const g=p.getAllRoulettes();if(g&&g.length>0){if(console.log(`[LiveRoulettesDisplay] Atualizando com ${g.length} roletas`),i(g),m(!1),!o&&g.length>1)d(g[1]),f(!0);else if(o){const v=g.find(j=>j.id===o.id||j._id===o._id||j.nome===o.nome);v&&d(v)}}};return S.on("roulette:data-updated",l),()=>{S.off("roulette:data-updated",l)}},[p,o]);const a=l=>{d(l),f(!0)};return e&&e.length>0?n.jsxs("div",{className:"max-w-[1200px] mx-auto px-4 py-6",children:[n.jsxs("div",{className:"flex justify-between items-center mb-4",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"text-2xl font-bold text-white",children:"Roletas Disponíveis"}),n.jsx("p",{className:"text-gray-400",children:"Escolha uma roleta para começar a jogar"})]}),n.jsxs("div",{className:"relative w-64",children:[n.jsx("input",{type:"text",placeholder:"Buscar roleta...",className:"w-full bg-gray-800 text-white py-2 px-4 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"}),n.jsxs("svg",{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[n.jsx("circle",{cx:"11",cy:"11",r:"8"}),n.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]})]})]}),n.jsxs("div",{className:"flex flex-col md:flex-row gap-4",children:[n.jsx("div",{className:"w-full md:w-1/2 overflow-y-auto max-h-[calc(100vh-200px)]",children:n.jsx("div",{className:"grid grid-cols-1 gap-3",children:s.map((l,y)=>n.jsx("div",{ref:g=>h.current[y]=g,className:`bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:bg-gray-800 transition-colors border border-gray-800 ${(o==null?void 0:o.id)===l.id?"ring-2 ring-[#00ff00]":""}`,onClick:()=>a(l),children:n.jsxs("div",{className:"p-3",children:[n.jsx("div",{className:"flex justify-between items-center mb-2",children:n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("h3",{className:"text-lg font-semibold text-white",children:l.nome}),n.jsx("div",{className:"flex items-center",children:n.jsxs("span",{className:"bg-gray-800 text-xs text-gray-300 px-2 py-0.5 rounded",children:[Array.isArray(l.numero)&&l.numero.length>0?l.numero.length:0," números"]})})]})}),n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("div",{className:"flex-shrink-0",children:Array.isArray(l.numero)&&l.numero.length>0?n.jsx("div",{className:`${l.numero[0].numero===0?"bg-green-600":[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(l.numero[0].numero)?"bg-red-600":"bg-black"} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold`,children:l.numero[0].numero}):n.jsx("div",{className:"bg-gray-700 text-gray-400 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold",children:"?"})}),n.jsx("div",{className:"flex flex-wrap gap-1",children:Array.isArray(l.numero)&&l.numero.slice(1,6).map((g,v)=>{const j=g.numero,ne=j===0?"bg-green-600":[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(j)?"bg-red-600":"bg-black";return n.jsx("div",{className:`${ne} text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium`,children:j},v)})})]}),n.jsx("div",{className:"flex items-center justify-between mt-3 text-xs text-gray-500 border-t border-gray-800 pt-2",children:n.jsxs("div",{className:"flex items-center gap-1",children:[n.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("polyline",{points:"12 6 12 12 16 14"})]}),n.jsx("span",{children:"Tempo real"})]})})]})},l.id))})}),n.jsx("div",{className:"w-full md:w-1/2 bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800",children:o&&Array.isArray(o.numero)&&o.numero.length>0?n.jsx(Ue,{roletaNome:o.nome,lastNumbers:o.numero.map(l=>l.numero)}):n.jsxs("div",{className:"flex flex-col items-center justify-center h-[70vh] p-6 text-center",children:[n.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",className:"text-gray-600 mb-4",children:[n.jsx("path",{d:"M3 3v18h18"}),n.jsx("path",{d:"M18 12V8"}),n.jsx("path",{d:"M12 18v-2"}),n.jsx("path",{d:"M6 18v-6"})]}),n.jsx("h3",{className:"text-xl font-semibold text-gray-300 mb-2",children:"Selecione uma roleta"}),n.jsx("p",{className:"text-gray-500 max-w-md",children:"Clique em uma roleta à esquerda para visualizar estatísticas detalhadas, histórico de números e tendências."})]})})]})]}):c?n.jsxs("div",{className:"flex justify-center items-center p-8 h-64",children:[n.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-white"}),n.jsx("span",{className:"ml-2 text-white",children:"Carregando mesas de roleta..."})]}):t.length===0?n.jsx("div",{className:"text-center p-4 text-gray-400",children:"Nenhuma mesa de roleta ativa no momento."}):n.jsxs("div",{className:"container mx-auto px-4 py-8",children:[n.jsx("h2",{className:"text-2xl font-bold mb-6 text-white",children:"Roletas ao Vivo"}),n.jsx("div",{className:"grid grid-cols-3 gap-6",children:t.map(l=>n.jsx(He,{tableId:l.tableId,tableName:l.tableName},l.tableId))}),n.jsx("div",{className:"flex justify-center mt-8",children:n.jsx("button",{onClick:()=>{var l;return(l=window.forceRouletteUpdate)==null?void 0:l.call(window)},className:"bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors",children:"Atualizar Agora"})})]})};let J=!1;const Ye=()=>{const[e,t]=x.useState([]),[r,s]=x.useState(!0),[i,c]=x.useState(null),[m,o]=x.useState(!1),[d,u]=x.useState(Date.now()),f=x.useMemo(()=>window.isRouletteSystemInitialized&&window.isRouletteSystemInitialized()?(console.log("[LiveRoulettePage] Usando sistema de roletas já inicializado"),window.getRouletteSystem?window.getRouletteSystem().rouletteFeedService:$.getInstance()):(console.log("[LiveRoulettePage] Sistema global não detectado, usando instância padrão"),$.getInstance()),[]),h=x.useCallback((a,l)=>{t(y=>y.map(g=>{if(g.id===a||g._id===a||g.canonicalId===a){const v={numero:l.numero,cor:l.cor||p(l.numero),timestamp:l.timestamp||new Date().toISOString()},j=Array.isArray(g.numero)?[...g.numero]:[];return{...g,numero:[v,...j]}}return g})),u(Date.now())},[]),p=a=>a===0?"verde":[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(a)?"vermelho":"preto";return x.useEffect(()=>{if(J){console.log("[LiveRoulettePage] Componente já inicializado, evitando dupla inicialização");return}J=!0,console.log("[LiveRoulettePage] Inicializando componente"),f.initialize().then(()=>{console.log("[LiveRoulettePage] Serviço de feed inicializado com sucesso"),o(!0);const g=Object.values(f.getAllRoulettes());g.length>0?(console.log(`[LiveRoulettePage] Carregados ${g.length} roletas do serviço`),t(g),s(!1)):setTimeout(()=>{const v=Object.values(f.getAllRoulettes());console.log(`[LiveRoulettePage] Carregados ${v.length} roletas após aguardar`),t(v),s(!1)},5e3)}).catch(g=>{console.error("[LiveRoulettePage] Erro ao inicializar serviço de feed:",g),c("Erro ao carregar dados. Por favor, tente novamente."),s(!1)});const a=g=>{console.log("[LiveRoulettePage] Recebida atualização de dados");const v=Object.values(f.getAllRoulettes());v&&v.length>0&&(console.log(`[LiveRoulettePage] Atualizando com ${v.length} roletas`),t(v),s(!1),u(Date.now()))},l=g=>{g&&g.type==="new_number"&&g.roleta_id&&g.numero&&(console.log(`[LiveRoulettePage] Recebido novo número via socket: ${g.numero} para roleta ${g.roleta_id}`),h(g.roleta_id,{numero:g.numero,timestamp:g.timestamp}))};S.on("roulette:data-updated",a),S.on("roulette:new-number",l);const y=setInterval(()=>{Date.now()-d>3e4&&(console.log("[LiveRoulettePage] Mais de 30s sem atualizações, verificando novos dados..."),f.refreshCache().then(()=>{console.log("[LiveRoulettePage] Dados atualizados manualmente");const v=Object.values(f.getAllRoulettes());t(v),u(Date.now())}).catch(v=>{console.error("[LiveRoulettePage] Erro ao atualizar dados manualmente:",v)}))},1e4);return()=>{S.off("roulette:data-updated",a),S.off("roulette:new-number",l),clearInterval(y)}},[f,h,d]),n.jsxs(n.Fragment,{children:[n.jsx(ze,{children:n.jsx("title",{children:"Roletas ao vivo | RunCash"})}),n.jsxs("div",{className:"container mx-auto px-4 py-8",children:[n.jsx("h1",{className:"text-3xl font-bold mb-6",children:"Roletas ao vivo"}),m&&!r&&n.jsxs("div",{className:"text-sm text-gray-500 mb-4",children:["Última atualização: ",new Date(d).toLocaleTimeString(),n.jsx("button",{onClick:()=>{s(!0),f.refreshCache().then(()=>{const a=Object.values(f.getAllRoulettes());t(a),u(Date.now()),s(!1)}).catch(()=>s(!1))},className:"ml-2 text-blue-500 hover:text-blue-700",children:"Atualizar agora"})]}),r?n.jsxs("div",{className:"flex justify-center items-center py-20",children:[n.jsx(oe,{className:"h-8 w-8 animate-spin text-primary"}),n.jsx("span",{className:"ml-2",children:"Carregando roletas..."})]}):i?n.jsx("div",{className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded",children:i}):e.length===0?n.jsx("div",{className:"text-center py-10",children:n.jsx("p",{className:"text-gray-500",children:"Nenhuma roleta disponível no momento."})}):n.jsx(Fe,{roulettesData:e})]})]})};export{Ye as default};
