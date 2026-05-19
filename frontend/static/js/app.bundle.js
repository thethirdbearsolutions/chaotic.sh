var Wf=Object.defineProperty;var Vf=(st,pe,St)=>pe in st?Wf(st,pe,{enumerable:!0,configurable:!0,writable:!0,value:St}):st[pe]=St;var G=(st,pe,St)=>Vf(st,typeof pe!="symbol"?pe+"":pe,St);(function(){"use strict";var qa;function st(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var pe=st();function St(e){pe=e}var mn={exec:()=>null};function F(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(me.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var me={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Yl=/^(?:[ \t]*(?:\n|$))+/,Zl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Xl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ql=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ci=/(?:[*+-]|\d{1,9}[.)])/,to=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,no=F(to).replace(/bull/g,ci).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Jl=F(to).replace(/bull/g,ci).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),di=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ec=/^[^\n]+/,ui=/(?!\s*\])(?:\\.|[^\[\]\\])+/,tc=F(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ui).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nc=F(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ci).getRegex(),ts="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",pi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,sc=F("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",pi).replace("tag",ts).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),so=F(di).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex(),ic=F(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",so).getRegex(),mi={blockquote:ic,code:Zl,def:tc,fences:Xl,heading:Ql,hr:gn,html:sc,lheading:no,list:nc,newline:Yl,paragraph:so,table:mn,text:ec},io=F("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex(),ac={...mi,lheading:Jl,table:io,paragraph:F(di).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",io).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex()},oc={...mi,html:F(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",pi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:F(di).replace("hr",gn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",no).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},rc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,lc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ao=/^( {2,}|\\)\n(?!\s*$)/,cc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ns=/[\p{P}\p{S}]/u,gi=/[\s\p{P}\p{S}]/u,oo=/[^\s\p{P}\p{S}]/u,dc=F(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,gi).getRegex(),ro=/(?!~)[\p{P}\p{S}]/u,uc=/(?!~)[\s\p{P}\p{S}]/u,pc=/(?:[^\s\p{P}\p{S}]|~)/u,mc=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,lo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,gc=F(lo,"u").replace(/punct/g,ns).getRegex(),fc=F(lo,"u").replace(/punct/g,ro).getRegex(),co="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",hc=F(co,"gu").replace(/notPunctSpace/g,oo).replace(/punctSpace/g,gi).replace(/punct/g,ns).getRegex(),vc=F(co,"gu").replace(/notPunctSpace/g,pc).replace(/punctSpace/g,uc).replace(/punct/g,ro).getRegex(),bc=F("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,oo).replace(/punctSpace/g,gi).replace(/punct/g,ns).getRegex(),yc=F(/\\(punct)/,"gu").replace(/punct/g,ns).getRegex(),wc=F(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),kc=F(pi).replace("(?:-->|$)","-->").getRegex(),$c=F("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",kc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ss=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Ec=F(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ss).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),uo=F(/^!?\[(label)\]\[(ref)\]/).replace("label",ss).replace("ref",ui).getRegex(),po=F(/^!?\[(ref)\](?:\[\])?/).replace("ref",ui).getRegex(),_c=F("reflink|nolink(?!\\()","g").replace("reflink",uo).replace("nolink",po).getRegex(),fi={_backpedal:mn,anyPunctuation:yc,autolink:wc,blockSkip:mc,br:ao,code:lc,del:mn,emStrongLDelim:gc,emStrongRDelimAst:hc,emStrongRDelimUnd:bc,escape:rc,link:Ec,nolink:po,punctuation:dc,reflink:uo,reflinkSearch:_c,tag:$c,text:cc,url:mn},xc={...fi,link:F(/^!?\[(label)\]\((.*?)\)/).replace("label",ss).getRegex(),reflink:F(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ss).getRegex()},hi={...fi,emStrongRDelimAst:vc,emStrongLDelim:fc,url:F(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Ic={...hi,br:F(ao).replace("{2,}","*").getRegex(),text:F(hi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},is={normal:mi,gfm:ac,pedantic:oc},fn={normal:fi,gfm:hi,breaks:Ic,pedantic:xc},Tc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},mo=e=>Tc[e];function Ke(e,t){if(t){if(me.escapeTest.test(e))return e.replace(me.escapeReplace,mo)}else if(me.escapeTestNoEncode.test(e))return e.replace(me.escapeReplaceNoEncode,mo);return e}function go(e){try{e=encodeURI(e).replace(me.percentDecode,"%")}catch{return null}return e}function fo(e,t){var a;const n=e.replace(me.findPipe,(o,r,c)=>{let l=!1,d=r;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),s=n.split(me.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(me.slashPipe,"|");return s}function hn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Sc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function ho(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function Lc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var as=class{constructor(e){G(this,"options");G(this,"rules");G(this,"lexer");this.options=e||pe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:hn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Lc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=hn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:hn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=hn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const l=r.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=p,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const b=f,v=b.raw+`
`+n.join(`
`),w=this.blockquote(v);a[a.length-1]=w,s=s.substring(0,s.length-b.raw.length)+w.raw,i=i.substring(0,i.length-b.text.length)+w.text;break}else if((f==null?void 0:f.type)==="list"){const b=f,v=b.raw+`
`+n.join(`
`),w=this.list(v);a[a.length-1]=w,s=s.substring(0,s.length-f.raw.length)+w.raw,i=i.substring(0,i.length-b.raw.length)+w.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),f=e.split(`
`,1)[0],b=!p.trim(),v=0;if(this.options.pedantic?(v=2,d=p.trimStart()):b?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=p.slice(v),v+=t[1].length),b&&this.rules.other.blankLine.test(f)&&(l+=f+`
`,e=e.substring(f.length+1),c=!0),!c){const T=this.rules.other.nextBulletRegex(v),B=this.rules.other.hrRegex(v),L=this.rules.other.fencesBeginRegex(v),C=this.rules.other.headingBeginRegex(v),M=this.rules.other.htmlBeginRegex(v);for(;e;){const H=e.split(`
`,1)[0];let P;if(f=H,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),P=f):P=f.replace(this.rules.other.tabCharGlobal,"    "),L.test(f)||C.test(f)||M.test(f)||T.test(f)||B.test(f))break;if(P.search(this.rules.other.nonSpaceChar)>=v||!f.trim())d+=`
`+P.slice(v);else{if(b||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||L.test(p)||C.test(p)||B.test(p))break;d+=`
`+f}!b&&!f.trim()&&(b=!0),l+=H+`
`,e=e.substring(H.length+1),p=P.slice(v)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let w=null,E;this.options.gfm&&(w=this.rules.other.listIsTask.exec(d),w&&(E=w[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!w,checked:E,loose:!1,text:d,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const l=i.items[c].tokens.filter(p=>p.type==="space"),d=l.length>0&&l.some(p=>this.rules.other.anyLine.test(p.raw));i.loose=d}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=fo(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(fo(r,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=hn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Sc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),ho(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return ho(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,l=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);const p=[...s[0]][0].length,f=e.slice(0,a+s.index+p+r);if(Math.min(a,r)%2){const v=f.slice(1,-1);return{type:"em",raw:f,text:v,tokens:this.lexer.inlineTokens(v)}}const b=f.slice(2,-2);return{type:"strong",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},it=class Ja{constructor(t){G(this,"tokens");G(this,"options");G(this,"state");G(this,"tokenizer");G(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||pe,this.options.tokenizer=this.options.tokenizer||new as,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:me,block:is.normal,inline:fn.normal};this.options.pedantic?(n.block=is.pedantic,n.inline=fn.pedantic):this.options.gfm&&(n.block=is.gfm,this.options.breaks?n.inline=fn.breaks:n.inline=fn.gfm),this.tokenizer.rules=n}static get rules(){return{block:is,inline:fn}}static lex(t,n){return new Ja(n).lex(t)}static lexInline(t,n){return new Ja(n).inlineTokens(t)}lex(t){t=t.replace(me.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(me.tabCharGlobal,"    ").replace(me.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const d=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(l=Math.min(l,p))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,l;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let p=t;if((l=this.options.extensions)!=null&&l.startInline){let f=1/0;const b=t.slice(1);let v;this.options.extensions.startInline.forEach(w=>{v=w.call({lexer:this},b),typeof v=="number"&&v>=0&&(f=Math.min(f,v))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(p)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},os=class{constructor(e){G(this,"options");G(this,"parser");this.options=e||pe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(me.notSpaceStart))==null?void 0:a[0],i=e.replace(me.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ke(s)+'">'+(n?i:Ke(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ke(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Ke(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ke(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=go(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ke(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=go(e);if(i===null)return Ke(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ke(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ke(e.text)}},vi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},at=class eo{constructor(t){G(this,"options");G(this,"renderer");G(this,"textRenderer");this.options=t||pe,this.options.renderer=this.options.renderer||new os,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vi}static parse(t,n){return new eo(n).parse(t)}static parseInline(t,n){return new eo(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=d||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],d+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},rs=(qa=class{constructor(e){G(this,"options");G(this,"block");this.options=e||pe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?it.lex:it.lexInline}provideParser(){return this.block?at.parse:at.parseInline}},G(qa,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),qa),Cc=class{constructor(...e){G(this,"defaults",st());G(this,"options",this.setOptions);G(this,"parse",this.parseMarkdown(!0));G(this,"parseInline",this.parseMarkdown(!1));G(this,"Parser",at);G(this,"Renderer",os);G(this,"TextRenderer",vi);G(this,"Lexer",it);G(this,"Tokenizer",as);G(this,"Hooks",rs);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new os(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new as(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new rs;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];rs.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(p=>c.call(i,p));const d=r.call(i,l);return c.call(i,d)}:i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return it.lex(e,t??this.defaults)}parser(e,t){return at.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?it.lex:it.lexInline,c=a.hooks?a.hooks.provideParser():e?at.parse:at.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Ke(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},Lt=new Cc;function N(e,t){return Lt.parse(e,t)}N.options=N.setOptions=function(e){return Lt.setOptions(e),N.defaults=Lt.defaults,St(N.defaults),N},N.getDefaults=st,N.defaults=pe,N.use=function(...e){return Lt.use(...e),N.defaults=Lt.defaults,St(N.defaults),N},N.walkTokens=function(e,t){return Lt.walkTokens(e,t)},N.parseInline=Lt.parseInline,N.Parser=at,N.parser=at.parse,N.Renderer=os,N.TextRenderer=vi,N.Lexer=it,N.lexer=it.lex,N.Tokenizer=as,N.Hooks=rs,N.parse=N,N.options,N.setOptions,N.use,N.walkTokens,N.parseInline,at.parse,it.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:vo,setPrototypeOf:bo,isFrozen:Ac,getPrototypeOf:Bc,getOwnPropertyDescriptor:jc}=Object;let{freeze:ge,seal:Be,create:bi}=Object,{apply:yi,construct:wi}=typeof Reflect<"u"&&Reflect;ge||(ge=function(t){return t}),Be||(Be=function(t){return t}),yi||(yi=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),wi||(wi=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const ls=he(Array.prototype.forEach),Mc=he(Array.prototype.lastIndexOf),yo=he(Array.prototype.pop),vn=he(Array.prototype.push),Dc=he(Array.prototype.splice),cs=he(String.prototype.toLowerCase),ki=he(String.prototype.toString),$i=he(String.prototype.match),bn=he(String.prototype.replace),Rc=he(String.prototype.indexOf),Pc=he(String.prototype.trim),Ne=he(Object.prototype.hasOwnProperty),fe=he(RegExp.prototype.test),yn=Nc(TypeError);function he(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return yi(e,t,s)}}function Nc(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return wi(e,n)}}function D(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:cs;bo&&bo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Ac(t)||(t[s]=a),i=a)}e[i]=!0}return e}function qc(e){for(let t=0;t<e.length;t++)Ne(e,t)||(e[t]=null);return e}function Ye(e){const t=bi(null);for(const[n,s]of vo(e))Ne(e,n)&&(Array.isArray(s)?t[n]=qc(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Ye(s):t[n]=s);return t}function wn(e,t){for(;e!==null;){const s=jc(e,t);if(s){if(s.get)return he(s.get);if(typeof s.value=="function")return he(s.value)}e=Bc(e)}function n(){return null}return n}const wo=ge(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ei=ge(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),_i=ge(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Oc=ge(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),xi=ge(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hc=ge(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ko=ge(["#text"]),$o=ge(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ii=ge(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Eo=ge(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ds=ge(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Fc=Be(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Uc=Be(/<%[\w\W]*|[\w\W]*%>/gm),Gc=Be(/\$\{[\w\W]*/gm),zc=Be(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wc=Be(/^aria-[\-\w]+$/),_o=Be(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Vc=Be(/^(?:\w+script|data):/i),Kc=Be(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xo=Be(/^html$/i),Yc=Be(/^[a-z][.\w]*(-[.\w]+)+$/i);var Io=Object.freeze({__proto__:null,ARIA_ATTR:Wc,ATTR_WHITESPACE:Kc,CUSTOM_ELEMENT:Yc,DATA_ATTR:zc,DOCTYPE_NAME:xo,ERB_EXPR:Uc,IS_ALLOWED_URI:_o,IS_SCRIPT_OR_DATA:Vc,MUSTACHE_EXPR:Fc,TMPLIT_EXPR:Gc});const kn={element:1,text:3,progressingInstruction:7,comment:8,document:9},Zc=function(){return typeof window>"u"?null:window},Xc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},To=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function So(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Zc();const t=I=>So(I);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==kn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:b}=e,v=c.prototype,w=wn(v,"cloneNode"),E=wn(v,"remove"),T=wn(v,"nextSibling"),B=wn(v,"childNodes"),L=wn(v,"parentNode");if(typeof o=="function"){const I=n.createElement("template");I.content&&I.content.ownerDocument&&(n=I.content.ownerDocument)}let C,M="";const{implementation:H,createNodeIterator:P,createDocumentFragment:ee,getElementsByTagName:oe}=n,{importNode:Q}=s;let O=To();t.isSupported=typeof vo=="function"&&typeof L=="function"&&H&&H.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ke,ERB_EXPR:de,TMPLIT_EXPR:De,DATA_ATTR:Re,ARIA_ATTR:Oa,IS_SCRIPT_OR_DATA:y,ATTR_WHITESPACE:Pe,CUSTOM_ELEMENT:Ie}=Io;let{IS_ALLOWED_URI:ft}=Io,se=null;const Tl=D({},[...wo,...Ei,..._i,...xi,...ko]);let re=null;const Sl=D({},[...$o,...Ii,...Eo,...ds]);let Z=Object.seal(bi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Qn=null,Ha=null;const on=Object.seal(bi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ll=!0,Fa=!0,Cl=!1,Al=!0,rn=!1,ni=!0,Pt=!1,Ua=!1,Ga=!1,ln=!1,si=!1,ii=!1,Bl=!0,jl=!1;const Nf="user-content-";let za=!0,Jn=!1,cn={},tt=null;const Wa=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ml=null;const Dl=D({},["audio","video","img","source","image","track"]);let Va=null;const Rl=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ai="http://www.w3.org/1998/Math/MathML",oi="http://www.w3.org/2000/svg",ht="http://www.w3.org/1999/xhtml";let dn=ht,Ka=!1,Ya=null;const qf=D({},[ai,oi,ht],ki);let ri=D({},["mi","mo","mn","ms","mtext"]),li=D({},["annotation-xml"]);const Of=D({},["title","style","font","a","script"]);let es=null;const Hf=["application/xhtml+xml","text/html"],Ff="text/html";let te=null,un=null;const Uf=n.createElement("form"),Pl=function(g){return g instanceof RegExp||g instanceof Function},Za=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(un&&un===g)){if((!g||typeof g!="object")&&(g={}),g=Ye(g),es=Hf.indexOf(g.PARSER_MEDIA_TYPE)===-1?Ff:g.PARSER_MEDIA_TYPE,te=es==="application/xhtml+xml"?ki:cs,se=Ne(g,"ALLOWED_TAGS")?D({},g.ALLOWED_TAGS,te):Tl,re=Ne(g,"ALLOWED_ATTR")?D({},g.ALLOWED_ATTR,te):Sl,Ya=Ne(g,"ALLOWED_NAMESPACES")?D({},g.ALLOWED_NAMESPACES,ki):qf,Va=Ne(g,"ADD_URI_SAFE_ATTR")?D(Ye(Rl),g.ADD_URI_SAFE_ATTR,te):Rl,Ml=Ne(g,"ADD_DATA_URI_TAGS")?D(Ye(Dl),g.ADD_DATA_URI_TAGS,te):Dl,tt=Ne(g,"FORBID_CONTENTS")?D({},g.FORBID_CONTENTS,te):Wa,Qn=Ne(g,"FORBID_TAGS")?D({},g.FORBID_TAGS,te):Ye({}),Ha=Ne(g,"FORBID_ATTR")?D({},g.FORBID_ATTR,te):Ye({}),cn=Ne(g,"USE_PROFILES")?g.USE_PROFILES:!1,Ll=g.ALLOW_ARIA_ATTR!==!1,Fa=g.ALLOW_DATA_ATTR!==!1,Cl=g.ALLOW_UNKNOWN_PROTOCOLS||!1,Al=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,rn=g.SAFE_FOR_TEMPLATES||!1,ni=g.SAFE_FOR_XML!==!1,Pt=g.WHOLE_DOCUMENT||!1,ln=g.RETURN_DOM||!1,si=g.RETURN_DOM_FRAGMENT||!1,ii=g.RETURN_TRUSTED_TYPE||!1,Ga=g.FORCE_BODY||!1,Bl=g.SANITIZE_DOM!==!1,jl=g.SANITIZE_NAMED_PROPS||!1,za=g.KEEP_CONTENT!==!1,Jn=g.IN_PLACE||!1,ft=g.ALLOWED_URI_REGEXP||_o,dn=g.NAMESPACE||ht,ri=g.MATHML_TEXT_INTEGRATION_POINTS||ri,li=g.HTML_INTEGRATION_POINTS||li,Z=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&Pl(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Z.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&Pl(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Z.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Z.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),rn&&(Fa=!1),si&&(ln=!0),cn&&(se=D({},ko),re=[],cn.html===!0&&(D(se,wo),D(re,$o)),cn.svg===!0&&(D(se,Ei),D(re,Ii),D(re,ds)),cn.svgFilters===!0&&(D(se,_i),D(re,Ii),D(re,ds)),cn.mathMl===!0&&(D(se,xi),D(re,Eo),D(re,ds))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?on.tagCheck=g.ADD_TAGS:(se===Tl&&(se=Ye(se)),D(se,g.ADD_TAGS,te))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?on.attributeCheck=g.ADD_ATTR:(re===Sl&&(re=Ye(re)),D(re,g.ADD_ATTR,te))),g.ADD_URI_SAFE_ATTR&&D(Va,g.ADD_URI_SAFE_ATTR,te),g.FORBID_CONTENTS&&(tt===Wa&&(tt=Ye(tt)),D(tt,g.FORBID_CONTENTS,te)),g.ADD_FORBID_CONTENTS&&(tt===Wa&&(tt=Ye(tt)),D(tt,g.ADD_FORBID_CONTENTS,te)),za&&(se["#text"]=!0),Pt&&D(se,["html","head","body"]),se.table&&(D(se,["tbody"]),delete Qn.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw yn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw yn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=g.TRUSTED_TYPES_POLICY,M=C.createHTML("")}else C===void 0&&(C=Xc(b,i)),C!==null&&typeof M=="string"&&(M=C.createHTML(""));ge&&ge(g),un=g}},Nl=D({},[...Ei,..._i,...Oc]),ql=D({},[...xi,...Hc]),Gf=function(g){let k=L(g);(!k||!k.tagName)&&(k={namespaceURI:dn,tagName:"template"});const x=cs(g.tagName),K=cs(k.tagName);return Ya[g.namespaceURI]?g.namespaceURI===oi?k.namespaceURI===ht?x==="svg":k.namespaceURI===ai?x==="svg"&&(K==="annotation-xml"||ri[K]):!!Nl[x]:g.namespaceURI===ai?k.namespaceURI===ht?x==="math":k.namespaceURI===oi?x==="math"&&li[K]:!!ql[x]:g.namespaceURI===ht?k.namespaceURI===oi&&!li[K]||k.namespaceURI===ai&&!ri[K]?!1:!ql[x]&&(Of[x]||!Nl[x]):!!(es==="application/xhtml+xml"&&Ya[g.namespaceURI]):!1},nt=function(g){vn(t.removed,{element:g});try{L(g).removeChild(g)}catch{E(g)}},Nt=function(g,k){try{vn(t.removed,{attribute:k.getAttributeNode(g),from:k})}catch{vn(t.removed,{attribute:null,from:k})}if(k.removeAttribute(g),g==="is")if(ln||si)try{nt(k)}catch{}else try{k.setAttribute(g,"")}catch{}},Ol=function(g){let k=null,x=null;if(Ga)g="<remove></remove>"+g;else{const J=$i(g,/^[\r\n\t ]+/);x=J&&J[0]}es==="application/xhtml+xml"&&dn===ht&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const K=C?C.createHTML(g):g;if(dn===ht)try{k=new f().parseFromString(K,es)}catch{}if(!k||!k.documentElement){k=H.createDocument(dn,"template",null);try{k.documentElement.innerHTML=Ka?M:K}catch{}}const ue=k.body||k.documentElement;return g&&x&&ue.insertBefore(n.createTextNode(x),ue.childNodes[0]||null),dn===ht?oe.call(k,Pt?"html":"body")[0]:Pt?k.documentElement:ue},Hl=function(g){return P.call(g.ownerDocument||g,g,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Xa=function(g){return g instanceof p&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof d)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Fl=function(g){return typeof r=="function"&&g instanceof r};function vt(I,g,k){ls(I,x=>{x.call(t,g,k,un)})}const Ul=function(g){let k=null;if(vt(O.beforeSanitizeElements,g,null),Xa(g))return nt(g),!0;const x=te(g.nodeName);if(vt(O.uponSanitizeElement,g,{tagName:x,allowedTags:se}),ni&&g.hasChildNodes()&&!Fl(g.firstElementChild)&&fe(/<[/\w!]/g,g.innerHTML)&&fe(/<[/\w!]/g,g.textContent)||g.nodeType===kn.progressingInstruction||ni&&g.nodeType===kn.comment&&fe(/<[/\w]/g,g.data))return nt(g),!0;if(!(on.tagCheck instanceof Function&&on.tagCheck(x))&&(!se[x]||Qn[x])){if(!Qn[x]&&zl(x)&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,x)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(x)))return!1;if(za&&!tt[x]){const K=L(g)||g.parentNode,ue=B(g)||g.childNodes;if(ue&&K){const J=ue.length;for(let Te=J-1;Te>=0;--Te){const bt=w(ue[Te],!0);bt.__removalCount=(g.__removalCount||0)+1,K.insertBefore(bt,T(g))}}}return nt(g),!0}return g instanceof c&&!Gf(g)||(x==="noscript"||x==="noembed"||x==="noframes")&&fe(/<\/no(script|embed|frames)/i,g.innerHTML)?(nt(g),!0):(rn&&g.nodeType===kn.text&&(k=g.textContent,ls([ke,de,De],K=>{k=bn(k,K," ")}),g.textContent!==k&&(vn(t.removed,{element:g.cloneNode()}),g.textContent=k)),vt(O.afterSanitizeElements,g,null),!1)},Gl=function(g,k,x){if(Bl&&(k==="id"||k==="name")&&(x in n||x in Uf))return!1;if(!(Fa&&!Ha[k]&&fe(Re,k))){if(!(Ll&&fe(Oa,k))){if(!(on.attributeCheck instanceof Function&&on.attributeCheck(k,g))){if(!re[k]||Ha[k]){if(!(zl(g)&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,g)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(g))&&(Z.attributeNameCheck instanceof RegExp&&fe(Z.attributeNameCheck,k)||Z.attributeNameCheck instanceof Function&&Z.attributeNameCheck(k,g))||k==="is"&&Z.allowCustomizedBuiltInElements&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,x)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(x))))return!1}else if(!Va[k]){if(!fe(ft,bn(x,Pe,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&g!=="script"&&Rc(x,"data:")===0&&Ml[g])){if(!(Cl&&!fe(y,bn(x,Pe,"")))){if(x)return!1}}}}}}}return!0},zl=function(g){return g!=="annotation-xml"&&$i(g,Ie)},Wl=function(g){vt(O.beforeSanitizeAttributes,g,null);const{attributes:k}=g;if(!k||Xa(g))return;const x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:re,forceKeepAttr:void 0};let K=k.length;for(;K--;){const ue=k[K],{name:J,namespaceURI:Te,value:bt}=ue,pn=te(J),Qa=bt;let le=J==="value"?Qa:Pc(Qa);if(x.attrName=pn,x.attrValue=le,x.keepAttr=!0,x.forceKeepAttr=void 0,vt(O.uponSanitizeAttribute,g,x),le=x.attrValue,jl&&(pn==="id"||pn==="name")&&(Nt(J,g),le=Nf+le),ni&&fe(/((--!?|])>)|<\/(style|title|textarea)/i,le)){Nt(J,g);continue}if(pn==="attributename"&&$i(le,"href")){Nt(J,g);continue}if(x.forceKeepAttr)continue;if(!x.keepAttr){Nt(J,g);continue}if(!Al&&fe(/\/>/i,le)){Nt(J,g);continue}rn&&ls([ke,de,De],Kl=>{le=bn(le,Kl," ")});const Vl=te(g.nodeName);if(!Gl(Vl,pn,le)){Nt(J,g);continue}if(C&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Te)switch(b.getAttributeType(Vl,pn)){case"TrustedHTML":{le=C.createHTML(le);break}case"TrustedScriptURL":{le=C.createScriptURL(le);break}}if(le!==Qa)try{Te?g.setAttributeNS(Te,J,le):g.setAttribute(J,le),Xa(g)?nt(g):yo(t.removed)}catch{Nt(J,g)}}vt(O.afterSanitizeAttributes,g,null)},zf=function I(g){let k=null;const x=Hl(g);for(vt(O.beforeSanitizeShadowDOM,g,null);k=x.nextNode();)vt(O.uponSanitizeShadowNode,k,null),Ul(k),Wl(k),k.content instanceof a&&I(k.content);vt(O.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(I){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,x=null,K=null,ue=null;if(Ka=!I,Ka&&(I="<!-->"),typeof I!="string"&&!Fl(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw yn("dirty is not a string, aborting")}else throw yn("toString is not a function");if(!t.isSupported)return I;if(Ua||Za(g),t.removed=[],typeof I=="string"&&(Jn=!1),Jn){if(I.nodeName){const bt=te(I.nodeName);if(!se[bt]||Qn[bt])throw yn("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof r)k=Ol("<!---->"),x=k.ownerDocument.importNode(I,!0),x.nodeType===kn.element&&x.nodeName==="BODY"||x.nodeName==="HTML"?k=x:k.appendChild(x);else{if(!ln&&!rn&&!Pt&&I.indexOf("<")===-1)return C&&ii?C.createHTML(I):I;if(k=Ol(I),!k)return ln?null:ii?M:""}k&&Ga&&nt(k.firstChild);const J=Hl(Jn?I:k);for(;K=J.nextNode();)Ul(K),Wl(K),K.content instanceof a&&zf(K.content);if(Jn)return I;if(ln){if(si)for(ue=ee.call(k.ownerDocument);k.firstChild;)ue.appendChild(k.firstChild);else ue=k;return(re.shadowroot||re.shadowrootmode)&&(ue=Q.call(s,ue,!0)),ue}let Te=Pt?k.outerHTML:k.innerHTML;return Pt&&se["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&fe(xo,k.ownerDocument.doctype.name)&&(Te="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+Te),rn&&ls([ke,de,De],bt=>{Te=bn(Te,bt," ")}),C&&ii?C.createHTML(Te):Te},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Za(I),Ua=!0},t.clearConfig=function(){un=null,Ua=!1},t.isValidAttribute=function(I,g,k){un||Za({});const x=te(I),K=te(g);return Gl(x,K,k)},t.addHook=function(I,g){typeof g=="function"&&vn(O[I],g)},t.removeHook=function(I,g){if(g!==void 0){const k=Mc(O[I],g);return k===-1?void 0:Dc(O[I],k,1)[0]}return yo(O[I])},t.removeHooks=function(I){O[I]=[]},t.removeAllHooks=function(){O=To()},t}var Lo=So();const Ti="chaotic_";function qe(e){try{return localStorage.getItem(Ti+e)}catch{return null}}function Oe(e,t){try{localStorage.setItem(Ti+e,t)}catch{}}function ot(e){try{localStorage.removeItem(Ti+e)}catch{}}function Qc(){return qe("token")}function Jc(e){e?Oe("token",e):ot("token")}function ed(){return qe("theme")}function td(e){Oe("theme",e)}function Co(){return qe("last_project")}function nd(e){Oe("last_project",e)}function sd(){return qe("onboarding_complete")==="true"}function id(){Oe("onboarding_complete","true")}function ad(){ot("onboarding_complete")}function od(e){return e?qe(`issues_filters_${e}`):null}function rd(e,t){e&&(t?Oe(`issues_filters_${e}`,t):ot(`issues_filters_${e}`))}function ld(e){return qe(`comment_draft_${e}`)}function us(e,t){t?Oe(`comment_draft_${e}`,t):ot(`comment_draft_${e}`)}function cd(e){return qe(`description_draft_${e}`)}function ps(e,t){t?Oe(`description_draft_${e}`,t):ot(`description_draft_${e}`)}function dd(){return{title:qe("create_issue_title"),description:qe("create_issue_description")}}function Ao(e,t){e?Oe("create_issue_title",e):ot("create_issue_title"),t?Oe("create_issue_description",t):ot("create_issue_description")}function ud(){ot("create_issue_title"),ot("create_issue_description")}function pd(){return qe("doc_view_mode")}function md(e){Oe("doc_view_mode",e)}function gd(){return qe("approvals_explainer_dismissed")==="1"}function fd(){Oe("approvals_explainer_dismissed","1")}const hd="/api";class vd{constructor(){this.token=Qc()}setToken(t){this.token=t,Jc(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${hd}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const l=new Error(c);throw l.status=o.status,l.detail=r.detail,l}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20,{projectId:i}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const h=new vd;let qt=null;function q(){document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function R(){var e;yt(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function ms(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function bd(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function _(e,t){const n=bd(t);$(`Failed to ${e}: ${n}`,"error")}function yt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),qt&&(document.removeEventListener("keydown",qt),qt=null)}function $n(e){qt&&document.removeEventListener("keydown",qt),qt=e,e&&document.addEventListener("keydown",e)}function En(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(yt(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}function ve(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Se(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Si(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function W(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,s]=e;return`#${t}${t}${n}${n}${s}${s}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function u(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ze(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function rt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function yd(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Ot(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?yd(s)?`<img class="${t} avatar-img" src="${u(s)}" alt="${u(n)}">`:`<div class="${t} avatar-emoji">${m(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let ne={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Li=new Set;function $e(e,t){if(typeof e=="string"){const n=ne[e];ne[e]=t,Bo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=ne[s];ne[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Bo(s,i,a)})}}function lt(e){return Li.add(e),()=>Li.delete(e)}function Bo(e,t,n){t!==n&&Li.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const _n=()=>ne.currentUser,gs=e=>$e("currentUser",e),A=()=>ne.currentView,wd=e=>$e("currentView",e),be=()=>ne.issues,Xe=e=>$e("issues",e),jo=()=>ne.labels,fs=e=>$e("labels",e),Mo=()=>ne.activeFilterCategory,kd=e=>$e("activeFilterCategory",e),$d=()=>ne.selectedIssueIndex,Do=e=>$e("selectedIssueIndex",e),Ed=()=>ne.selectedDocIndex,Ro=e=>$e("selectedDocIndex",e),_d=()=>ne.pendingGates,xd=e=>$e("pendingGates",e),Id=()=>ne.searchDebounceTimer,Td=e=>$e("searchDebounceTimer",e),Sd=()=>ne.websocket,Po=e=>$e("websocket",e),S=()=>ne.currentTeam,Ci=e=>$e("currentTeam",e),U=()=>ne.currentProject,He=e=>$e("currentProject",e||null),ie=()=>ne.currentDetailIssue,hs=e=>$e("currentDetailIssue",e),Ld=()=>ne.currentDetailSprints,No=e=>$e("currentDetailSprints",e),Ai={};function X(e){Object.assign(Ai,e)}function Cd(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}const s=t.dataset.action,i=Ai[s];if(!i){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${s}"`);return}i(e,t.dataset,t)}let qo=!1;function Ad(){if(!qo){qo=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Cd);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Ai[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Bi=["backlog","todo","in_progress","in_review","done","canceled"],Ht=["backlog","todo","in_progress","in_review"],Oo=["urgent","high","medium","low","no_priority"],ji=["no_priority","urgent","high","medium","low"],Ho=["backlog","todo","in_progress","in_review","done"];function Fe({icon:e,heading:t,description:n,cta:s}){const i=s?`
        <button class="btn btn-primary empty-state-cta" data-action="${u(s.action)}"${s.data?Object.entries(s.data).map(([a,o])=>` data-${u(a)}="${u(o)}"`).join(""):""}>${m(s.label)}</button>
    `:"";return`
        <div class="empty-state">
            <div class="empty-state-icon">${e}</div>
            <h3>${m(t)}</h3>
            <p>${m(n)}</p>
            ${i}
        </div>
    `}const je={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'};let xn=[];function Bd(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function jd(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function vs(e,t){const n=e().map(Bd),s=t().map(jd);xn=[...n,...s]}function In(e){return e&&xn.find(t=>t.id===e)||null}function Ct(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Mi(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function bs(){const e=xn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));xn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=xn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function ys(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;bs().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Mi(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function Ft(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Ut(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Gt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Tn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Fo(){const e=document.getElementById("group-by-select");return e?e.value:""}const Uo=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}],ws=["done","canceled"];function Go(e){var t,n,s;switch(e){case"project":return U()?1:0;case"status":return Ft().length;case"priority":return Ut().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(s=document.getElementById("sprint-filter"))!=null&&s.value?1:0;case"labels":return Gt().length+Tn().length;default:return 0}}function Di(){let e=0;return Uo.forEach(t=>{e+=Go(t.key)}),e}function zo(){var f,b,v,w,E;const e=new URLSearchParams,t=Ft(),n=Ut(),s=Gt(),i=Tn(),a=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,o=U()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,c=(v=document.getElementById("issue-type-filter"))==null?void 0:v.value,l=(w=document.getElementById("group-by-select"))==null?void 0:w.value;t.forEach(T=>e.append("status",T)),n.forEach(T=>e.append("priority",T)),s.forEach(T=>e.append("label",T)),i.forEach(T=>e.append("exclude_label",T)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),c&&e.set("issue_type",c),l&&e.set("groupBy",l);const d=e.toString(),p=d?`/issues?${d}`:"/issues";history.replaceState({view:"issues"},"",p),rd((E=S())==null?void 0:E.id,d)}function Md(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","project"].some(v=>t.has(v))){const v=od((b=S())==null?void 0:b.id);if(v){t=new URLSearchParams(v);const w=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",w)}}const i=t.getAll("status");if(i.length>0){const v=document.getElementById("status-filter-dropdown");v&&(v.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=i.includes(E.value)}),Wo())}const a=t.getAll("priority");if(a.length>0){const v=document.getElementById("priority-filter-dropdown");v&&(v.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=a.includes(E.value)}),Vo())}const o=t.get("assignee");if(o){const v=document.getElementById("assignee-filter");v&&(v.value=o)}const r=t.get("project");r&&(e(!0),He(r),e(!1));const c=t.get("sprint");if(c){const v=document.getElementById("sprint-filter");v&&(v.value=c)}const l=t.get("issue_type");if(l){const v=document.getElementById("issue-type-filter");v&&(v.value=l)}const d=t.getAll("label");if(d.length>0){const v=document.getElementById("label-filter-dropdown");v&&(v.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=d.includes(E.value)}),ks())}const p=t.getAll("exclude_label");if(p.length>0){const v=document.getElementById("exclude-label-filter-dropdown");v&&(v.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=p.includes(E.value)}),$s())}const f=t.get("groupBy");if(f){const v=document.getElementById("group-by-select");v&&(v.value=f)}}function Wo(){const e=Ft(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=ve(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Vo(){const e=Ut(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Se(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function ks(){var s,i;const e=Gt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function $s(){var s,i;const e=Tn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Ko(){if(!S())return;let e;try{e=await h.getLabels(S().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Yo("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Yo("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Yo(e,t,n,s){const i=document.getElementById(e);if(!i)return;const a=i.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const c=document.createElement("label");c.className="multi-select-option",c.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${W(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${m(r.name)}</span>
                </span>
            `,a.appendChild(c)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${s}">Clear</button>`,a.appendChild(o)}function Es(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Zo)},0))}function Zo(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Zo))}function Dd(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",zt)):(e.classList.remove("hidden"),Le(),Ce(Mo()),setTimeout(()=>{document.addEventListener("click",zt)},0))}function Rd(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",zt)):(e.classList.remove("hidden"),Gd(),setTimeout(()=>{document.addEventListener("click",zt)},0))}function zt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),s=e.composedPath(),i=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=i&&s.includes(i),r=a&&s.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",zt))}function Xo(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",zt)}function Le(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=U();e.innerHTML=Uo.map(n=>{const s=Go(n.key),i=Mo()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${i?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${u(n.key)}">
                <span>${n.label}</span>
                ${s>0?`<span class="filter-menu-category-count">${s}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join("")}function Ce(e){kd(e),Le();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":Pd(t);break;case"status":Nd(t);break;case"priority":qd(t);break;case"type":Od(t);break;case"assignee":Hd(t);break;case"sprint":Fd(t);break;case"labels":Ud(t);break}}function Pd(e){const t=U()||"",n=Y()||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${t?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${t?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;n.forEach(i=>{s+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${u(i.id)}">
                <input type="radio" name="project-filter-radio" value="${u(i.id)}" ${t===i.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${W(i.color)};"></span>
                <span class="filter-option-label">${m(i.name)}</span>
            </label>
        `}),e.innerHTML=s}function Nd(e){const t=Ft(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=Ht.every(o=>t.includes(o))&&!ws.some(o=>t.includes(o))&&t.length===Ht.length,i=ws.every(o=>t.includes(o))&&!Ht.some(o=>t.includes(o))&&t.length===ws.length;let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-status-filter-new">Clear</button>':""}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${s?"active":""}" data-action="set-status-preset" data-value="open">Open</button>
            <button class="filter-preset-btn ${i?"active":""}" data-action="set-status-preset" data-value="closed">Closed</button>
        </div>
    `;n.forEach(o=>{a+=`
            <label class="filter-option">
                <input type="checkbox" value="${o.value}" ${t.includes(o.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${u(o.value)}">
                <span class="filter-option-icon">${o.icon}</span>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=a}function qd(e){const t=Ut(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-priority-filter-new">Clear</button>':""}
        </div>
    `;n.forEach(i=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${i.value}" ${t.includes(i.value)?"checked":""} data-action="toggle-priority-option" data-filter-value="${u(i.value)}">
                <span class="filter-option-icon">${i.icon}</span>
                <span class="filter-option-label">${i.label}</span>
            </label>
        `}),e.innerHTML=s}function Od(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${u(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Hd(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Rt()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Assignee</span>
            ${n?'<button class="filter-options-clear" data-action="set-assignee-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-assignee-filter" data-value="">
            <input type="radio" name="assignee-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Assignees</span>
        </label>
        <label class="filter-option" data-action="set-assignee-filter" data-value="me">
            <input type="radio" name="assignee-filter-radio" value="me" ${n==="me"?"checked":""}>
            <span class="filter-option-label">Assigned to me</span>
        </label>
        <label class="filter-option" data-action="set-assignee-filter" data-value="unassigned">
            <input type="radio" name="assignee-filter-radio" value="unassigned" ${n==="unassigned"?"checked":""}>
            <span class="filter-option-label">Unassigned</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${u(a.user_id)}">
                <input type="radio" name="assignee-filter-radio" value="${u(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${m(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Fd(e){if(!U()){e.innerHTML=`
            <div class="filter-options-header">
                <span class="filter-options-title">Sprint</span>
            </div>
            <div class="filter-options-empty">Select a project first</div>
        `;return}const n=document.getElementById("sprint-filter"),s=(n==null?void 0:n.value)||"",i=n?Array.from(n.options):[];let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${s?'<button class="filter-options-clear" data-action="set-sprint-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(o=>{a+=`
            <label class="filter-option" data-action="set-sprint-filter" data-value="${u(o.value)}">
                <input type="radio" name="sprint-filter-radio" value="${u(o.value)}" ${s===o.value?"checked":""}>
                <span class="filter-option-label">${m(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function Ud(e){const t=Gt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${W(d)};"></span>
                    <span class="filter-option-label">${m(l)}</span>
                </label>
            `}),e.innerHTML=i}function Gd(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(c=>`
                <div class="display-option ${s===c.value?"active":""}" data-action="set-sort" data-value="${u(c.value)}">
                    <span>${c.label}</span>
                    ${s===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(c=>`
                <div class="display-option ${i===c.value?"active":""}" data-action="set-group-by" data-value="${u(c.value)}">
                    <span>${c.label}</span>
                    ${i===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Ee(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=U();if(n){const f=(Y()||[]).find(b=>b.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const s=Ft();if(s.length>0){const p=s.map(f=>ve(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Ut();if(i.length>0){const p=i.map(f=>Se(f)).join(", ");t.push({category:"priority",label:"Priority",value:p,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const p=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:p?p.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let p;if(o.value==="me")p="Me";else if(o.value==="unassigned")p="Unassigned";else{const b=(Rt()||[]).find(v=>v.user_id===o.value);p=(b==null?void 0:b.name)||(b==null?void 0:b.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:p,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const p=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(p==null?void 0:p.text)||r.value,clearAction:"clear-sprint-filter"})}const c=Gt();if(c.length>0){const p=document.getElementById("label-filter-dropdown"),f=c.map(b=>{var E;const v=p==null?void 0:p.querySelector(`input[value="${b}"]`),w=(E=v==null?void 0:v.closest("label"))==null?void 0:E.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const l=Tn();if(l.length>0){const p=document.getElementById("exclude-label-filter-dropdown"),f=l.map(b=>{var E;const v=p==null?void 0:p.querySelector(`input[value="${b}"]`),w=(E=v==null?void 0:v.closest("label"))==null?void 0:E.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded labels",value:f,clearAction:"clear-exclude-label-filter"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(p=>`
        <span class="filter-chip" title="${u(p.label)}: ${u(p.value)}">
            <span class="filter-chip-label">${p.label}:</span>
            <span class="filter-chip-value">${m(p.value)}</span>
            <button class="filter-chip-remove" data-action="${p.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function _e(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Di();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Qo(){const e=document.getElementById("sprint-filter");if(!e)return;const t=U(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Ri(null);return}let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const i=await h.getSprints(t),a=i.find(o=>o.status==="active");a&&(s+=`<option value="current">Current Sprint (${m(a.name)})</option>`),Ri(a||null),i.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";s+=`<option value="${o.id}">${m(o.name)}${r}</option>`})}catch(i){console.error("Failed to load sprints:",i)}e.innerHTML=s,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Ri(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function zd(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Jo=!1;lt(e=>{if(e!=="currentProject"||A()!=="issues"||Jo)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Qo(),Ko()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1});const s=document.getElementById("exclude-label-filter-dropdown");s==null||s.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1}),ks(),$s(),Ae(),Ee(),_e()}).catch(n=>{console.error("Failed to update filters on project switch:",n),Ae(),Ee(),_e()})});function Wd(){Md(e=>{Jo=e})}function _s(){Wo(),Ae(),Ee(),_e()}function Pi(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),_s()}function Ni(){Vo(),Ae(),Ee(),_e()}function qi(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ni()}function Oi(){ks(),Ae(),Ee(),_e()}function xs(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Oi()}function er(){$s(),Ae(),Ee(),_e()}function Hi(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),er()}async function At(){var p,f,b,v,w,E,T;if(Do(-1),!S())return;const e=U()||"",t=Ft(),n=Ut(),s=(p=document.getElementById("assignee-filter"))==null?void 0:p.value,i=(b=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:b.trim();if(!e&&Y().length===0){document.getElementById("issues-list").innerHTML=Fe({icon:je.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}zd();const a={limit:1e3},o=((v=document.getElementById("sort-by-select"))==null?void 0:v.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(w=_n())==null?void 0:w.id:a.assignee_id=s);const l=(E=document.getElementById("sprint-filter"))==null?void 0:E.value;if(l)if(l==="current"){if(e)try{const L=(await h.getSprints(e)).find(C=>C.status==="active");L&&(a.sprint_id=L.id)}catch(B){console.error("Failed to resolve current sprint:",B)}}else a.sprint_id=l;const d=(T=document.getElementById("issue-type-filter"))==null?void 0:T.value;d&&(a.issue_type=d),i&&i.length>=2&&(a.search=i);try{let B;e?(a.project_id=e,B=await h.getIssues(a)):Y().length>0&&(B=await h.getTeamIssues(S().id,a));const L=Gt();L.length>0&&(B=B.filter(H=>!H.labels||H.labels.length===0?!1:H.labels.some(P=>L.includes(P.id))));const C=Tn();C.length>0&&(B=B.filter(H=>!H.labels||H.labels.length===0?!0:!H.labels.some(P=>C.includes(P.id)))),Xe(B);const M=[...new Set(B.map(H=>H.project_id))];await Dr(M),ct()}catch(B){_("load issues",B)}}function Vd(){clearTimeout(Id()),Td(setTimeout(()=>{At()},300))}function Ae(){zo(),At()}async function tr(){if(zo(),Fo()==="sprint"){const e=be(),t=[...new Set(e.map(n=>n.project_id))];await Dr(t)}ct()}function Kd(){Ee(),_e()}function nr(e){He(e),Le(),Ce("project")}function Yd(){nr("")}function Zd(e){const t=e==="open"?Ht:ws,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),_s(),Le(),Ce("status")}function Xd(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,_s()),Le(),Ce("status")}function Qd(){Pi(),Le(),Ce("status"),Ee(),_e()}function Jd(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Ni()),Le(),Ce("priority")}function eu(){qi(),Le(),Ce("priority"),Ee(),_e()}function sr(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ae()),Le(),Ce("type"),Ee(),_e()}function tu(){sr("")}function ir(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ae()),Le(),Ce("assignee"),Ee(),_e()}function nu(){ir("")}function ar(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ae()),Le(),Ce("sprint"),Ee(),_e()}function su(){ar("")}function iu(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Oi()),Le(),Ce("labels")}function au(){xs(),Le(),Ce("labels"),Ee(),_e()}function ou(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,At()),Xo()}function ru(e){const t=document.getElementById("group-by-select");t&&(t.value=e,tr()),Xo()}function lu(){He(null),Pi(),qi();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const s=document.getElementById("issue-search");s&&(s.value=""),xs(),Hi(),Ae(),Ee(),_e()}X({"update-label-filter":()=>Oi(),"clear-label-filter":()=>xs(),"update-exclude-label-filter":()=>er(),"clear-exclude-label-filter":()=>Hi(),"show-filter-category":(e,t)=>Ce(t.category),"set-project-filter":(e,t)=>nr(t.value),"clear-project-filter":()=>Yd(),"clear-status-filter-new":()=>Qd(),"set-status-preset":(e,t)=>Zd(t.value),"toggle-status-option":(e,t)=>Xd(t.filterValue,e),"clear-priority-filter-new":()=>eu(),"toggle-priority-option":(e,t)=>Jd(t.filterValue,e),"set-type-filter":(e,t)=>sr(t.value),"clear-type-filter":()=>tu(),"set-assignee-filter":(e,t)=>ir(t.value),"clear-assignee-filter":()=>nu(),"set-sprint-filter":(e,t)=>ar(t.value),"clear-sprint-filter":()=>su(),"clear-label-filter-new":()=>au(),"toggle-label-option":(e,t)=>iu(t.filterValue,e),"set-sort":(e,t)=>ou(t.value),"set-group-by":(e,t)=>ru(t.value),"clear-all-filters":()=>lu()});let Sn=[],Fi=[];lt(e=>{e==="currentProject"&&A()==="my-issues"&&(Is(),Ui(),Bt())});function wt(){return Sn}function Wt(e){Sn=e}async function Is(){var i;const e=S(),t=_n();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=U();du();try{const a={assignee_id:t.id,status:n||void 0,limit:1e3};let o;s?o=await h.getIssues({...a,project_id:s}):o=await h.getTeamIssues(e.id,a),Sn=o,Ln()}catch(a){_("load issues",a)}}async function Bt({showLoading:e=!0}={}){const t=S();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const s=U();Fi=await h.getTeamActivities(t.id,0,10,{projectId:s}),cu()}catch{n&&(n.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function cu(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Fi.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=Fi.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${u(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${u(t.document_id)}"><strong>${s} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Yi(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Xi(t)}${n}</span>
                <span class="activity-actor">by ${m(Zi(t))}</span>
                <span class="activity-time">${Ze(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function du(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function or(){Is()}function Ln(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),Sn.length===0){e.innerHTML=Fe({icon:je.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=Sn.map(t=>Ue(t)).join("")}}async function Ui(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=U(),n=Y(),s=t?n.filter(i=>i.id===t):n;if(!s.length){e.innerHTML="";return}try{const i=s.map(async o=>{try{const r=await h.getCurrentSprint(o.id);if(!r)return null;let c={};try{const l=await h.getIssues({sprint_id:r.id,project_id:o.id,limit:500});for(const d of l)c[d.status]=(c[d.status]||0)+1}catch{}return{project:o,sprint:r,statusCounts:c}}catch{return null}}),a=(await Promise.all(i)).filter(Boolean);uu(a)}catch{e.innerHTML=""}}function uu(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:s,sprint:i,statusCounts:a})=>{const o=i.budget||0,r=i.points_spent||0,c=o>0?Math.min(100,Math.round(r/o*100)):0,l=o>0&&r>o,d=i.limbo?"limbo":l?"arrears":"",p=a||{},f=Object.values(p).reduce((b,v)=>b+v,0);return`
                    <div class="sprint-status-card ${d}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${m(s.name)}</span>
                            ${i.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${l?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${m(i.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${d}" style="width: ${c}%"></div>
                                </div>
                                <span class="sprint-status-points">${r}/${o} pts</span>
                            </div>
                        `:`
                            <div class="sprint-status-progress">
                                <span class="sprint-status-points">${r} pts (no budget)</span>
                            </div>
                        `}
                        ${f>0?`
                            <div class="sprint-issue-breakdown">
                                <div class="sprint-stacked-bar">
                                    ${n.filter(b=>p[b]).map(b=>{const v=Math.round(p[b]/f*100);return`<div class="sprint-stacked-segment status-${b}" style="width: ${v}%" title="${ve(b)}: ${p[b]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(b=>p[b]).map(b=>`<span class="sprint-count-label status-${b}">${p[b]} ${ve(b)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}X({"filter-my-issues":()=>or(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),el(t.identifier)}});const rr=Bi,pu=["task","bug","feature","chore","docs","tech_debt","epic"];let Qe=[],lr=Promise.resolve();function cr(){return Qe}function dr(e){Qe=e}async function Gi(e,t,n,s){var p,f;e.preventDefault(),yt();const a=(s||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${rr.map((b,v)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="status" data-value="${b}">
                    ${ye(b)}
                    <span>${ve(b)}</span>
                    <span class="dropdown-shortcut">${v+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${ji.map((b,v)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="priority" data-value="${b}">
                    ${Je(b)}
                    <span>${Se(b)}</span>
                    <span class="dropdown-shortcut">${v}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${pu.map(b=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="issue_type" data-value="${b}">
                    <span class="issue-type-badge type-${b}">${rt(b)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const b=bs();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${b.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:b.map(({assignee:v,indent:w},E)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="${u(v.id)}">
                    ${Ot(v,"avatar-small")}
                    <span>${Mi(v,w)}</span>
                    ${E<9?`<span class="dropdown-shortcut">${E+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const b=document.querySelector(`.issue-row[data-issue-id="${n}"]`),v=(b==null?void 0:b.dataset.projectId)||((p=ie())==null?void 0:p.project_id),w=Jt(v);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${w.map((E,T)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="estimate" data-value="${E.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${E.label}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const b=be(),v=wt(),w=ie(),E=b.find(Q=>Q.id===n)||v.find(Q=>Q.id===n)||w,T=new Set(((E==null?void 0:E.labels)||[]).map(Q=>Q.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const B=o.getBoundingClientRect();let L=a.bottom+4,C=a.left;C+B.width>window.innerWidth-8&&(C=a.right-B.width),L+B.height>window.innerHeight-8&&(L=a.top-B.height-4),o.style.top=`${L}px`,o.style.left=`${Math.max(8,C)}px`,En(o,{multiSelect:!0});let M=[];const H=S();if(H)try{M=await h.getLabels(H.id)}catch(Q){console.error("Failed to load labels:",Q)}if(!o.parentNode)return;pr(o,n,M,T);const P=o.getBoundingClientRect();let ee=a.bottom+4,oe=a.left;oe+P.width>window.innerWidth-8&&(oe=a.right-P.width),ee+P.height>window.innerHeight-8&&(ee=a.top-P.height-4),o.style.top=`${ee}px`,o.style.left=`${Math.max(8,oe)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const b=be(),v=wt(),w=ie(),E=b.find(O=>O.id===n)||v.find(O=>O.id===n)||w,T=(E==null?void 0:E.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const B=o.getBoundingClientRect();let L=a.bottom+4,C=a.left;C+B.width>window.innerWidth-8&&(C=a.right-B.width),L+B.height>window.innerHeight-8&&(L=a.top-B.height-4),o.style.top=`${L}px`,o.style.left=`${Math.max(8,C)}px`,En(o);let M=[];if(T)try{M=await h.getSprints(T),Kp(T,M)}catch(O){console.error("Failed to load sprints:",O)}if(!o.parentNode)return;const H=M.filter(O=>O.status!=="completed"||O.id===(E==null?void 0:E.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${H.map((O,ke)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="${u(O.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(O.name)}${O.status==="active"?" (Active)":""}</span>
                    ${ke<9?`<span class="dropdown-shortcut">${ke+1}</span>`:""}
                </button>
            `).join("")}
        `;const P=o.getBoundingClientRect();let ee=a.bottom+4,oe=a.left;oe+P.width>window.innerWidth-8&&(oe=a.right-P.width),ee+P.height>window.innerHeight-8&&(ee=a.top-P.height-4),o.style.top=`${ee}px`,o.style.left=`${Math.max(8,oe)}px`,o.classList.remove("dropdown-positioning");const Q=O=>{const ke=O.key;if(ke==="Escape"){yt(),document.removeEventListener("keydown",Q),$n(null);return}const de=parseInt(ke);if(isNaN(de))return;const De=o.querySelectorAll(".dropdown-option");let Re=!1;de===0?(Vt(n,"sprint_id",null),Re=!0):de>=1&&de<De.length&&(De[de].click(),Re=!0),Re&&(document.removeEventListener("keydown",Q),$n(null))};$n(Q),document.addEventListener("keydown",Q);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let c=a.bottom+4,l=a.left;l+r.width>window.innerWidth-8&&(l=a.right-r.width),c+r.height>window.innerHeight-8&&(c=a.top-r.height-4),o.style.top=`${c}px`,o.style.left=`${Math.max(8,l)}px`,o.classList.remove("dropdown-positioning");const d=b=>{const v=b.key;if(v==="Escape"){yt(),document.removeEventListener("keydown",d);return}const w=parseInt(v);if(isNaN(w))return;let E=!1;if(t==="status"&&w>=1&&w<=6)Vt(n,"status",rr[w-1]),E=!0;else if(t==="priority"&&w>=0&&w<=4)Vt(n,"priority",ji[w]),E=!0;else if(t==="estimate"){const T=ie(),B=Jt(T==null?void 0:T.project_id);w>=0&&w<B.length&&(Vt(n,"estimate",B[w].value),E=!0)}E&&(document.removeEventListener("keydown",d),$n(null))};$n(d),document.addEventListener("keydown",d),En(o)}function mu(e,t,n,s){Gi(e,t,n,s)}function gu(e,t,n){lr=lr.then(()=>ur(e,t,n))}async function ur(e,t,n){const s=be(),i=wt(),a=ie(),o=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),c=r.indexOf(t);let l;if(c>=0?l=r.filter(d=>d!==t):l=[...r,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const p=(await h.updateIssue(e,{label_ids:l})).labels||[],f=s.findIndex(E=>E.id===e);f!==-1&&(s[f].labels=p,Xe([...s]));const b=i.findIndex(E=>E.id===e);b!==-1&&(i[b].labels=p,Wt([...i])),(a==null?void 0:a.id)===e&&hs({...a,labels:p});const v=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(v&&v.parentNode){const E=s.find(T=>T.id===e)||i.find(T=>T.id===e);E&&(v.outerHTML=Ue(E))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=p.length>0?p.map(E=>`
                    <span class="issue-label" style="background: ${W(E.color)}20; color: ${W(E.color)}">${m(E.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(_("update labels",d),n){const p=c>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function pr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${u(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${u(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${u(t)}" data-label-id="${u(i.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${W(i.color)}20; color: ${W(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}async function mr(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=S();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await h.createLabel(s.id,{name:i}),o=await h.getLabels(s.id);fs(o),a!=null&&a.id&&await ur(e,a.id,null);const r=be(),c=wt(),l=ie(),d=r.find(f=>f.id===e)||c.find(f=>f.id===e)||l,p=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&pr(t,e,o,p),n.value=""}catch(a){_("create label",a)}finally{n.disabled=!1,n.focus()}}}function Ts(){const e=document.getElementById("create-issue-labels-label");e&&(Qe.length===0?e.textContent="Labels":e.textContent=`Labels (${Qe.length})`)}function zi(e){const t=jo();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Qe.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${u(n.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${W(n.color)}20; color: ${W(n.color)}">${m(n.name)}</span>
                </button>
            `}).join("")}
    `}function fu(e){const t=Qe.indexOf(e);t>=0?Qe.splice(t,1):Qe.push(e),Ts();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&zi(n)}async function gr(){const e=S();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await h.createLabel(e.id,{name:s}),a=await h.getLabels(e.id);fs(a),i!=null&&i.id&&!Qe.includes(i.id)&&Qe.push(i.id),Ts(),t&&zi(t),n.value=""}catch(i){_("create label",i)}finally{n.disabled=!1,n.focus()}}}async function Vt(e,t,n){yt();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const i={};i[t]=n;const a=await h.updateIssue(e,i);if(!a||!a.id)throw new Error("Invalid response from server");const o=be(),r=o.findIndex(p=>p.id===e);r!==-1&&(o[r]=a,Xe([...o]));const c=wt(),l=c.findIndex(p=>p.id===e);l!==-1&&(c[l]=a,Wt([...c]));const d=ie();if((d==null?void 0:d.id)===e&&hs(a),s&&s.parentNode){const p=o.find(f=>f.id===e)||c.find(f=>f.id===e)||a;if(p){s.outerHTML=Ue(p);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);f&&(f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500))}}if($("Issue updated","success"),t==="status"){const p=U();if(p)try{const b=(await h.getSprints(p)).find(v=>v.status==="active");Ri(b||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&hu(t,a)}}catch(i){_("update issue",i),s&&s.classList.remove("updating")}}function hu(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${ye(t.status)}
            <span>${ve(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${Je(t.priority)}
            <span>${Se(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${rt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?In(t.assignee_id):null,l=c?Ct(c):null;r.innerHTML=l?`${Ot(c,"avatar-small")}<span>${m(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=Ld(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?m(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Us(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}X({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,s=t.field;s==="estimate"?Vt(t.issueId,s,n==="null"?null:Number(n)):Vt(t.issueId,s,n)},"toggle-issue-label":(e,t,n)=>{gu(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{mr(t.issueId)},"toggle-create-issue-label":(e,t)=>{fu(t.labelId)},"create-label-for-create-issue":()=>{gr()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),mr(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),gr())}});const fr=["task","bug","feature","chore","docs","tech_debt","epic"];function kt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Kt(e){const t=kt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function ct(){var s,i;const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=be();if(t.length===0){const a=(i=(s=document.getElementById("issue-search"))==null?void 0:s.value)==null?void 0:i.trim(),o=Di()>0,r=a&&a.length>=2;if(o||r){const c=Di(),l=[];r&&l.push(`search "${a}"`),o&&l.push(`${c} active filter${c>1?"s":""}`),e.innerHTML=Fe({icon:je.issues,heading:"No matching issues",description:`No issues match your ${l.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=Fe({icon:je.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});return}const n=Fo();n==="status"?vu(e,t):n==="priority"?bu(e,t):n==="type"?yu(e,t):n==="assignee"?wu(e,t):n==="sprint"?ku(e,t):e.innerHTML=Kt(t)+t.map(a=>Ue(a)).join("")}function vu(e,t){const n={};Bi.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Kt(t);Bi.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${ye(i)}</span>
                    <span class="group-title">${ve(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function bu(e,t){const n={};Oo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Kt(t);Oo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Je(i)}</span>
                    <span class="group-title">${Se(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function yu(e,t){const n={};fr.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Kt(t);fr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${rt(i)}</span></span>
                    <span class="group-title">${rt(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function wu(e,t){const n={},s="__unassigned__";n[s]=[];const i=bs();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Kt(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${kt(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Ue(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=Ct(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${u(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${u(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ot(o,"avatar-small")}</span>
                    <span class="group-title">${m(c)}${m(l)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${kt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Ue(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function ku(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=jr();i.sort((c,l)=>{const d=o[c],p=o[l],f=d?a[d.status]??3:3,b=p?a[p.status]??3:3;return f-b});let r=Kt(t);i.forEach(c=>{const l=s[c];if(l.length===0)return;const d=o[c],p=d?d.name:c,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",b=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${b}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${b}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(p)}${f}</span>
                    <span class="group-count">${l.length}</span>
                    <span class="group-points">${kt(l)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(v=>Ue(v)).join("")}
                </div>
            </div>
        `}),s[n].length>0&&(r+=`
            <div class="issue-group" data-group="${n}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${n}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${s[n].length}</span>
                    <span class="group-points">${kt(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(c=>Ue(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function $u(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Ue(e){const t=e.assignee_id?In(e.assignee_id):null,n=t?Ct(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?Us(e.estimate,e.project_id):"",a=pa(e.estimate,e.project_id),o=e.sprint_id?jr()[e.sprint_id]:null,r=o?o.name:null;return`
        <div class="issue-row" data-issue-id="${u(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${u(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${u(e.id)}" title="Priority: ${Se(e.priority)}">
                    ${Je(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${u(e.id)}" title="Status: ${ve(e.status)}">
                    ${ye(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${rt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.id)}">${m(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(c=>`
                            <span class="issue-label" style="background: ${W(c.color)}20; color: ${W(c.color)}">${m(c.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${u(e.id)}" title="Sprint: ${r?m(r):"None"}">
                    ${r?`<span class="sprint-badge">${m(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${u(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${i||"None"}`}">
                    ${i?`<span class="estimate-badge${a?" out-of-scale":""}">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${u(e.id)}" title="${u(n||"Unassigned")}">
                    ${n?Ot(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Je(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function ye(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}X({"toggle-group":(e,t)=>{$u(t.group)},"show-inline-dropdown":(e,t,n)=>{Gi(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),z(t.issueId))}});function Eu(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function _u(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=Rt().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:Eu(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${u(l.handle)}">
                <span class="mention-name">${m(l.name)}</span>
                <span class="mention-handle">@${m(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.handle,p=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),f=e.value.slice(i);e.value=p+f,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}const hr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

## Steps to Reproduce
1.
2.
3.

## Expected Behavior

## Actual Behavior

## Environment
-

## Notes
`},{id:"feature",label:"Feature request",title:"Feature: ",description:`## Problem

## Proposed Solution

## Alternatives Considered

## Acceptance Criteria
-
`},{id:"task",label:"Task",title:"Task: ",description:`## Goal

## Plan
-

## Notes
`}];function Cn(e=null){const t=e||U()||"";dr([]);const n=Y().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${m(o.name)}</option>
    `).join("");document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <select id="create-issue-project" class="project-select" data-action="update-create-project">
                    <option value="">Select project</option>
                    ${n}
                </select>
                <span class="create-issue-breadcrumb">› New issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" data-action="toggle-create-options">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-options-content">
                    <div class="create-issue-template">
                        <label for="create-issue-template">Template</label>
                        <select id="create-issue-template" data-action="apply-template">
                            ${hr.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
                        </select>
                    </div>
                    <div class="create-issue-meta">
                        <label for="create-issue-due-date">Due date</label>
                        <input type="date" id="create-issue-due-date" class="create-issue-date-input">
                    </div>
                </div>
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="status">
                            ${ye("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Je("no_priority")}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" data-action="toggle-create-dropdown" data-dropdown-type="type">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" data-action="toggle-create-dropdown" data-dropdown-type="labels">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="assignee">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="estimate">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="sprint">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span id="create-issue-sprint-label">Sprint</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" id="btn-create-and-new" class="btn btn-secondary" data-action="create-issue-and-new">Create & New</button>
                <button type="button" id="btn-create-issue" class="btn btn-primary" data-action="create-issue-submit">Create issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
            <input type="hidden" id="create-issue-sprint" value="">
        </div>
    `,q(),Ts();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=dd();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{Ao(s.value,i.value)}),i.addEventListener("input",()=>{Ao(s.value,i.value)}),s.focus()}function xu(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Iu(e){const t=hr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function Tu(e,t){const n=Y().find(s=>s.id===t);dr([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?m(n.name):"Project"}</span>
                <span class="create-issue-breadcrumb">› New sub-issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Sub-issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" data-action="toggle-create-options">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="status">
                            ${ye("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Je("no_priority")}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" data-action="toggle-create-dropdown" data-dropdown-type="type">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" data-action="toggle-create-dropdown" data-dropdown-type="labels">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="assignee">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="estimate">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${u(e)}" data-project-id="${u(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,q(),Ts(),document.getElementById("create-issue-title").focus()}async function Su(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null;if(!n){$("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:cr(),parent_id:e});R(),$(`Created sub-issue ${d.identifier}`,"success"),z(e)}catch(d){_("create sub-issue",d)}}async function Lu(e,t,n){var o,r;yt();const i=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${i.top-8}px`,a.style.left=`${i.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const c=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Ho.map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="status" data-value="${l}" data-label="${u(ve(l))}">
                    ${ye(l)}
                    <span>${ve(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const c=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${ji.map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${l}" data-label="${u(Se(l))}">
                    ${Je(l)}
                    <span>${Se(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const c=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="type" data-value="${l}" data-label="${u(rt(l))}">
                    <span class="issue-type-badge type-${l}">${rt(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!S())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let c=jo();if(c.length===0)try{c=await h.getLabels(S().id),fs(c)}catch(l){console.error("Failed to load labels:",l)}zi(a),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),En(a,{multiSelect:!0});return}else if(e==="assignee"){const c=document.getElementById("create-issue-assignee").value,l=bs();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${l.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:l.map(({assignee:d,indent:p})=>{const f=Ct(d)||"User";return`
                <button class="dropdown-option ${d.id===c?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${u(d.id)}" data-label="${u(f)}">
                    ${Ot(d,"avatar-small")}
                    <span>${Mi(d,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const c=document.getElementById("create-issue-estimate").value,l=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=Jt(l);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(p=>{const f=p.value===null?"":String(p.value);return`
                <button class="dropdown-option ${f===c?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${u(f)}" data-label="${u(p.value?p.label:"Estimate")}">
                    <span>${m(p.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const c=document.getElementById("create-issue-sprint").value,l=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!l)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const p=(await h.getSprints(l)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${p.map(f=>`
                        <button class="dropdown-option ${f.id===c?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${u(f.id)}" data-label="${u(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${m(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),En(a)}function Cu(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Au(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=m(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${ye(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${Je(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${rt(t)}</span><span id="create-issue-type-label">${s}</span>`)}yt()}async function vr({keepOpen:e=!1}={}){var w,E;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null,d=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,p=(E=document.getElementById("create-issue-due-date"))==null?void 0:E.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const b=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");b&&(b.disabled=!0),v&&(v.disabled=!0);try{const T=await h.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:d,label_ids:cr(),due_date:f});$(`Created ${T.identifier}`,"success"),ud(),A()==="issues"?At():A()==="my-issues"&&Is(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(R(),z(T.id))}catch(T){_("create issue",T)}finally{b&&(b.disabled=!1),v&&(v.disabled=!1)}}async function Bu(){await vr({keepOpen:!1})}async function ju(){await vr({keepOpen:!0})}X({"toggle-create-dropdown":(e,t,n)=>{Lu(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Au(t.field,t.value,t.label)},"create-issue-submit":()=>{Bu()},"create-issue-and-new":()=>{ju()},"update-create-project":()=>{Cu()},"apply-template":e=>{Iu(e.target.value)},"toggle-create-options":()=>{xu()},"create-sub-issue-submit":(e,t)=>{Su(t.parentId,t.projectId)}});async function br(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),i=Jt(t.project_id).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${m(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${u(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${u(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${m(t.description||"")}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-issue-status">Status</label>
                    <select id="edit-issue-status">
                        <option value="backlog" ${t.status==="backlog"?"selected":""}>Backlog</option>
                        <option value="todo" ${t.status==="todo"?"selected":""}>Todo</option>
                        <option value="in_progress" ${t.status==="in_progress"?"selected":""}>In Progress</option>
                        <option value="in_review" ${t.status==="in_review"?"selected":""}>In Review</option>
                        <option value="done" ${t.status==="done"?"selected":""}>Done</option>
                        <option value="canceled" ${t.status==="canceled"?"selected":""}>Canceled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-priority">Priority</label>
                    <select id="edit-issue-priority">
                        <option value="no_priority" ${t.priority==="no_priority"?"selected":""}>No Priority</option>
                        <option value="low" ${t.priority==="low"?"selected":""}>Low</option>
                        <option value="medium" ${t.priority==="medium"?"selected":""}>Medium</option>
                        <option value="high" ${t.priority==="high"?"selected":""}>High</option>
                        <option value="urgent" ${t.priority==="urgent"?"selected":""}>Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-type">Type</label>
                    <select id="edit-issue-type">
                        <option value="task" ${t.issue_type==="task"?"selected":""}>Task</option>
                        <option value="bug" ${t.issue_type==="bug"?"selected":""}>Bug</option>
                        <option value="feature" ${t.issue_type==="feature"?"selected":""}>Feature</option>
                        <option value="chore" ${t.issue_type==="chore"?"selected":""}>Chore</option>
                        <option value="docs" ${t.issue_type==="docs"?"selected":""}>Docs</option>
                        <option value="tech_debt" ${t.issue_type==="tech_debt"?"selected":""}>Tech Debt</option>
                        <option value="epic" ${t.issue_type==="epic"?"selected":""}>Epic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-estimate">Estimate</label>
                    <select id="edit-issue-estimate">
                        ${i}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${n.filter(a=>a.status!=="completed").map(a=>`
                            <option value="${a.id}" ${t.sprint_id===a.id?"selected":""}>${m(a.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,q()}catch(t){_("load issue",t)}}async function Mu(e,t){try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await h.updateIssue(t,l),R(),await z(t),$("Issue updated!","success")}catch(n){_("update issue",n)}}async function Du(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await At(),await ze(),j("issues"),$("Issue deleted!","success")}catch(t){_("delete issue",t)}}X({"update-issue":(e,t)=>{Mu(e,t.issueId)}});let xe=null,yr=!1,Yt=!1;function Ru(){return xe||(xe=document.createElement("div"),xe.className="quote-tooltip",xe.setAttribute("role","button"),xe.textContent="Quote",xe.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),xe.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),$r()}),document.body.appendChild(xe),xe)}function Pu(e,t){const n=Ru();n.style.display="flex",Yt=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Yt)return;const s=n.getBoundingClientRect();s.left<4&&(n.style.left=`${4+s.width/2}px`),s.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-s.width/2}px`),s.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function An(){xe&&(xe.style.display="none"),Yt=!1}function wr(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content"))||null}function kr(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=wr(t.startContainer),s=wr(t.endContainer);return!n||!s||n!==s?null:e.toString().trim()||null}function Nu(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function $r(){const e=kr();if(!e)return!1;const t=document.getElementById("new-comment");if(!t)return!1;const n=Nu(e),s=t.value,i=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";t.value=s+i+n+`

`;const a=ie();return a&&us(a.id,t.value),t.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),An(),t.focus(),t.setSelectionRange(t.value.length,t.value.length),t.scrollIntoView&&t.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function qu(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!kr()){An();return}Pu(t,n)},10)}function Ou({signal:e}={}){const t=document.getElementById("issue-detail-content");t&&(t.addEventListener("mouseup",qu,e?{signal:e}:void 0),yr||(yr=!0,document.addEventListener("mousedown",n=>{Yt&&xe&&!xe.contains(n.target)&&An()}),document.addEventListener("selectionchange",()=>{Yt&&setTimeout(()=>{const n=window.getSelection();(!n||n.isCollapsed)&&An()},50)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&Yt&&An()})))}let Wi=!1,$t=!0,Bn=null,Vi=null,Ki=null,Ss=null;function Yi(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Zi(e){return e.user_name||e.user_email||"Unknown"}function Xi(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(ve(t(e.old_value)))}</strong> to <strong>${m(ve(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(Se(t(e.old_value)))}</strong> to <strong>${m(Se(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=m(e.field_name||"ritual"),i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function Er(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function Hu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const p=d[1],f=document.createElement("a");f.href=`#/issue/${p}`,f.className="issue-link",f.textContent=p,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+d[3],o.appendChild(p),r=d.index+d[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function Fu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function Uu(e){if(!e)return"";const t=Me(e),n=document.createElement("div");return n.innerHTML=t,Er(n,Hu),n.innerHTML}function Ls(e){if(!e)return"";const t=Me(e),n=document.createElement("div");return n.innerHTML=t,Er(n,Fu),n.innerHTML}function Gu(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function zu(){$t=!$t;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",$t),n&&n.classList.toggle("rotated",$t)}async function Cs(e){try{Bn=await h.getTicketRitualsStatus(e),_r(e)}catch(t){console.error("Failed to load ticket rituals:",t),Bn=null}}function _r(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Bn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=Bn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&($t=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",$t);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",$t);const r=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending${d.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${d.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${m(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?Me(d.prompt):""}</div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ze(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${Me(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${tm(d,e)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `:""}
        ${s.length>0?`
            <div class="ticket-rituals-completed">
                ${s.map(d=>`
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${m(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ze(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Qi(e){try{let t;e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?await z(t.id,!1):j("my-issues",!1)}catch{j("my-issues",!1)}}async function z(e,t=!0){try{$t=!0;const[n,s,i,a,o,r]=await Promise.all([h.getIssue(e),h.getComments(e),h.getActivities(e),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),l=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name,is_pending:!y.attestation.approved_at}));Bn=r;const d=[...s,...l].sort((y,Pe)=>new Date(y.created_at)-new Date(Pe.created_at)),p=[n.parent_id?h.getIssue(n.parent_id):Promise.resolve(null),h.getSprints(n.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[f,b]=await Promise.all(p),v=o.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),w=o.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),E=o.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:A()},"",`/issue/${n.identifier}`),hs(n),No(b),document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const T=document.getElementById("issue-detail-view");T.classList.remove("hidden");const B=A()||"my-issues",L=Y().find(y=>y.id===n.project_id),C=n.assignee_id?In(n.assignee_id):null,M=C?Ct(C):null,H=n.sprint_id?b.find(y=>y.id===n.sprint_id):null,P=be(),ee=P.findIndex(y=>y.id===n.id),oe=ee>0?P[ee-1]:null,Q=ee>=0&&ee<P.length-1?P[ee+1]:null,O=ee>=0;T.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(B)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${O?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${oe?`data-action="navigate-issue" data-issue-id="${u(oe.id)}" data-identifier="${u(oe.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${ee+1} / ${P.length}</span>
                            <button class="issue-nav-btn" ${Q?`data-action="navigate-issue" data-issue-id="${u(Q.id)}" data-identifier="${u(Q.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${L?m(L.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${f?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(f.identifier)}" data-action="navigate-issue" data-issue-id="${u(f.id)}" data-identifier="${u(f.identifier)}">${f.identifier}: ${m(f.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${u(n.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </button>
                        </div>
                        <div class="description-content markdown-body ${n.description?"":"empty"}"${n.description?"":` data-action="edit-description" data-issue-id="${u(n.id)}"`}>
                            ${n.description?Ls(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${u(n.id)}" data-project-id="${u(n.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(y=>`
                                <a href="/issue/${encodeURIComponent(y.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${u(y.id)}" data-identifier="${u(y.identifier)}">
                                    <span class="sub-issue-status">${ye(y.status)}</span>
                                    <span class="sub-issue-id">${y.identifier}</span>
                                    <span class="sub-issue-title">${m(y.title)}</span>
                                    ${y.estimate?`<span class="sub-issue-estimate">${y.estimate}pts</span>`:""}
                                </a>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${u(n.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${v.length===0&&w.length===0&&E.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${w.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${w.map(y=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${ye(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${v.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${v.map(y=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${ye(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${E.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${E.map(y=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${ye(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                        </div>
                    </div>

                    <div id="ticket-rituals-section" class="issue-detail-section hidden">
                        <div class="section-header section-header-collapsible" data-action="toggle-ticket-rituals">
                            <h3>Ticket Rituals</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle ticket rituals">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="ticket-rituals-content collapsed">
                            <!-- Populated by loadTicketRituals -->
                        </div>
                    </div>

                    <div class="issue-detail-section" id="comments-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="comments">
                            <h3>Comments${d.length>0?` <span class="section-count">(${d.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${d.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:d.map(y=>`
                                <div class="comment ${y.is_attestation?"comment-attestation":""} ${y.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${y.is_attestation?"avatar-attestation":""}">${y.is_attestation?y.is_pending?"⏳":"✓":(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(y.author_name||"User")}</span>
                                            ${y.is_attestation?`<span class="comment-ritual-badge">${y.is_pending?"Pending approval — ":""}Ritual: ${m(y.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ze(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Uu(y.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${i.length>0?` <span class="section-count">(${i.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Yi(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Xi(y)}</span>
                                        <span class="activity-actor">by ${m(Zi(y))}</span>
                                        <span class="activity-time">${Ze(y.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${u(n.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${u(n.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${ye(n.status)}
                                <span>${ve(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${u(n.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${Je(n.priority)}
                                <span>${Se(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${u(n.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${rt(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${u(n.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${M?`${Ot(C,"avatar-small")}<span>${m(M)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${u(n.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${H?m(H.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${u(n.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(y=>`
                                        <span class="issue-label" style="background: ${W(y.color)}20; color: ${W(y.color)}">${m(y.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${L?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(L.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${u(n.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${pa(n.estimate,n.project_id)?" out-of-scale":""}" ${pa(n.estimate,n.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Us(n.estimate,n.project_id)}</span>
                            </button>
                        </div>

                        ${n.due_date?`
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(n.due_date).toLocaleDateString()}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${m(n.creator_name||"Unknown")}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${u(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${u(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,Ss&&Ss.abort(),Ss=new AbortController;const{signal:ke}=Ss,de=document.querySelector(".sidebar-overflow-trigger"),De=document.querySelector(".overflow-menu-dropdown");if(de&&De){const y=()=>{De.classList.add("hidden"),de.setAttribute("aria-expanded","false")},Pe=()=>{const Ie=De.classList.toggle("hidden");de.setAttribute("aria-expanded",String(!Ie))};de.addEventListener("click",Pe,{signal:ke}),document.addEventListener("click",Ie=>{!de.contains(Ie.target)&&!De.contains(Ie.target)&&y()},{signal:ke}),De.addEventListener("keydown",Ie=>{Ie.key==="Escape"&&(y(),de.focus())},{signal:ke})}_r(n.id),_u(),Ou({signal:ke});const Re=document.getElementById("new-comment");if(Re){const y=ld(n.id);y&&(Re.value=y),Re.addEventListener("input",()=>{us(n.id,Re.value)}),Re.addEventListener("keydown",Pe=>{var Ie;Pe.key==="Enter"&&(Pe.metaKey||Pe.ctrlKey)&&(Pe.preventDefault(),(Ie=Re.closest("form"))==null||Ie.requestSubmit())})}Vi=oe?oe.id:null,Ki=Q?Q.id:null;const Oa=y=>{if((y.metaKey||y.ctrlKey)&&y.shiftKey&&(y.key===">"||y.key==="."||y.code==="Period")&&$r()){y.preventDefault();return}if(y.metaKey||y.ctrlKey||y.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||y.target.tagName==="INPUT"||y.target.tagName==="TEXTAREA"||y.target.tagName==="SELECT"||y.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;if(y.key==="ArrowLeft"&&Vi)y.preventDefault(),z(Vi);else if(y.key==="ArrowRight"&&Ki)y.preventDefault(),z(Ki);else if(y.key==="c"){y.preventDefault(),y.stopImmediatePropagation();const ft=document.getElementById("new-comment");ft&&(ft.focus(),ft.scrollIntoView({behavior:"smooth",block:"nearest"}))}else y.key==="j"?(y.preventDefault(),y.stopImmediatePropagation(),As(1)):y.key==="k"&&(y.preventDefault(),y.stopImmediatePropagation(),As(-1));const Ie={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[y.key];if(Ie){const ft=document.querySelector(`.property-row[data-field="${Ie}"]`);ft&&(y.preventDefault(),ft.click())}};document.addEventListener("keydown",Oa,{signal:ke})}catch(n){_("load issue",n)}}async function Wu(e,t){if(e.preventDefault(),Wi)return!1;const n=document.getElementById("new-comment").value;us(t,null),Wi=!0;try{await h.createComment(t,n),await z(t),$("Comment added!","success")}catch(s){us(t,n),_("add comment",s)}finally{Wi=!1}return!1}async function Vu(e){const t=ie()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${m(t.description||"")}</textarea>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=cd(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?ps(e,r):ps(e,null);const c=document.getElementById("edit-description-preview");c&&c.style.display!=="none"&&xr()}),a.addEventListener("keydown",r=>{var c,l;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(c=document.getElementById("save-description-edit"))==null||c.click()),r.key==="Escape"&&(r.preventDefault(),(l=document.getElementById("cancel-description-edit"))==null||l.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{ps(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||(i.setAttribute("data-action","edit-description"),i.setAttribute("data-issue-id",t.id)),i.innerHTML=t.description?Ls(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var c;const r=(c=document.getElementById("edit-description"))==null?void 0:c.value;if(r!==void 0)try{await h.updateIssue(e,{description:r}),ps(e,null),$("Description updated","success"),z(e,!1)}catch(l){_("update description",l)}})}function xr(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Ls(n):'<span class="text-muted">Nothing to preview.</span>'}function Ku(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?xr():s.focus()}function Yu(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-add-relation" data-issue-id="${u(e)}">
            <div class="form-group">
                <label for="relation-type">Relation Type</label>
                <select id="relation-type" required>
                    <option value="blocks">Blocks</option>
                    <option value="blocked_by">Blocked by</option>
                    <option value="relates_to">Relates to</option>
                </select>
            </div>
            <div class="form-group">
                <label for="relation-issue-search">Search Issues</label>
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-relate" data-issue-id="${u(e)}">
                <input type="hidden" id="selected-related-issue-id">
            </div>
            <div id="relation-search-results" class="link-results">
                <p class="empty-state-small">Enter a search term to find issues</p>
            </div>
            <div id="selected-issue-display" class="selected-issue-display" style="display: none;">
                <span class="selected-issue-label">Selected:</span>
                <span id="selected-issue-info"></span>
                <button type="button" class="btn btn-danger btn-tiny" data-action="clear-selected-relation">&#215;</button>
            </div>
            <button type="submit" class="btn btn-primary" id="add-relation-btn" disabled>Add Relation</button>
        </form>
    `,q(),document.getElementById("relation-issue-search").focus()}async function Zu(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=S())==null?void 0:s.id,o=(await h.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${u(r.id)}" data-identifier="${u(r.identifier)}" data-title="${u(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Xu(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Qu(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Ju(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(s,t,"blocks"):await h.createRelation(t,s,n),R(),$("Relation added","success"),z(t)}catch(i){_("add relation",i)}return!1}async function ep(e,t){try{await h.deleteRelation(e,t),$("Relation removed","success"),z(e)}catch(n){_("remove relation",n)}}function As(e){const t=ie();if(!t)return;const n=be();if(!n||n.length===0)return;const s=n.findIndex(a=>a.id===t.id);if(s===-1)return;const i=s+e;i<0||i>=n.length||z(n[i].id)}X({"show-detail-dropdown":(e,t,n)=>{mu(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{Vu(t.issueId)},"toggle-section":(e,t)=>{Gu(t.section)},"toggle-ticket-rituals":()=>{zu()},"save-comment":(e,t)=>{Wu(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Yu(t.issueId)},"remove-relation":(e,t)=>{ep(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Tu(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Ju(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Zu(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Xu(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Qu()},"set-description-editor-mode":(e,t)=>{Ku(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>As(-1),"navigate-next-issue":()=>As(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),br(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Du(t.issueId)}});function Ir(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Bs=[],jn=[],Tr=null,V=new Set,Zt="list",jt=!1,Ji=null,js=null;const ea=pd();(ea==="list"||ea==="grid")&&(Zt=ea);function Sr(e){if(e!=="list"&&e!=="grid")return;Zt=e,e==="grid"&&jt&&ta(),md(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),Et()}function Lr(){if(Zt!=="list")return;jt=!0,V.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Et(),Xt()}function ta(){jt=!1,V.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Et(),Xt()}function tp(){Ji&&clearTimeout(Ji),Ji=setTimeout(()=>{Et()},300)}function np(){const e=document.getElementById("doc-search");e&&(e.value=""),Et()}async function sp(){He(null)}async function ip(){const e=document.getElementById("doc-search");e&&(e.value=""),He(null)}function ap(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=U()||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=Y().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";s.push(`<span class="filter-chip">Project: ${m(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(s.length>0){let a=s.join(" ");s.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function op(){return Bs}function Et(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";ap(),jn=Bs.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),l=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!l)return!1}return!0}),jn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),up("",Zt)}async function rp(){var n;const e=Tr||((n=S())==null?void 0:n.id);if(!e)return;const t=U()||null;try{Bs=await h.getDocuments(e,t),Et()}catch(s){_("load documents",s)}}lt(e=>{e==="currentProject"&&A()==="documents"&&rp()});async function Mn(e,t=null){var s;if(e||(e=(s=S())==null?void 0:s.id),!e)return;Tr=e,Ro(-1);const n=document.getElementById("documents-list");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=U()||null);try{Bs=await h.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",Zt==="list"),a.classList.toggle("active",Zt==="grid")),Et()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),_("load documents",i)}}function lp(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${W(t.color)}20; color: ${W(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function cp(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${lp(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${u(e.id)}" data-action="view-document" data-document-id="${u(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(Ir(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function dp(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${W(r.color)}20; color: ${W(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Ir(e.content).substring(0,80):"No content",i=jt?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${u(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${V.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${jt&&V.has(e.id)?" selected":""}" data-action="${jt?"toggle-doc-selection":"view-document"}" data-document-id="${u(e.id)}" data-doc-id="${u(e.id)}">
      ${i}
      <div class="document-list-icon">${m(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${m(e.title)}</div>
        <div class="document-list-snippet text-muted">${m(s)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?m(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function up(e="",t="list"){var l;const n=document.getElementById("documents-list");if(!n)return;V.clear(),Xt();const s=jn;if(s.length===0){const d=(l=document.getElementById("doc-search"))==null?void 0:l.value,p=U(),f=d||p;n.innerHTML=Fe({icon:f?je.search:je.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const i=t==="grid"?cp:dp,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=Y();s.forEach(d=>{let p,f;if(e==="project")if(p=d.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const b=r.find(v=>v.id===d.project_id);f=b?b.name:"Unknown Project"}else e==="sprint"&&(p=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:f,docs:[]}),o[p].docs.push(d)});let c="";for(const[d,p]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function pp(e){V.has(e)?V.delete(e):V.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=V.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",V.has(e)),Xt()}function mp(){jn.forEach(e=>V.add(e.id)),jn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Xt()}function Cr(){V.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),V.clear(),Xt()}function Xt(){const e=document.getElementById("doc-bulk-actions");e&&(jt?(e.classList.remove("hidden"),V.size>0?e.innerHTML=`
        <span class="bulk-count">${V.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function gp(){if(V.size===0){$("No documents selected","error");return}const t=Y().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${V.size} Document${V.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${V.size} selected document${V.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,q()}async function fp(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(V);let s=0,i=0;for(const r of n)try{await h.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}R(),Cr(),i===0?$(`Moved ${s} document${s>1?"s":""}!`,"success"):$(`Moved ${s}, failed ${i}`,"warning");const a=(o=S())==null?void 0:o.id;return await Mn(a),!1}async function hp(){var a;if(V.size===0){$("No documents selected","error");return}const e=V.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(V);let n=0,s=0;for(const o of t)try{await h.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}ta(),s===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed ${s}`,"warning");const i=(a=S())==null?void 0:a.id;await Mn(i)}async function Ge(e,t=!0){try{const n=await h.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(L=>L.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");let i="";try{const L=await h.getDocumentComments(n.id);i=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${L.length===0?'<div class="comments-empty">No comments yet</div>':L.map(M=>{var H,P;return`
            <div class="comment" data-comment-id="${u(M.id)}">
              <div class="comment-avatar">${((P=(H=M.author_name)==null?void 0:H.charAt(0))==null?void 0:P.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${m(M.author_name||"Unknown")}</span>
                  <span class="comment-date">${Ze(M.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${Me(M.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${u(n.id)}">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="1"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(L){console.error("Failed to load comments:",L)}let a=null,o=null;if(n.project_id){const C=Y().find(M=>M.id===n.project_id);if(a=C?C.name:null,n.sprint_id)try{const M=await h.getSprint(n.sprint_id);o=M?M.name:null}catch{}}let r=n.content||"";const c=N.lexer(r);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(r=r.slice(c[0].raw.length).trimStart());const l=op(),d=l.findIndex(L=>L.id===n.id),p=d>0?l[d-1]:null,f=d>=0&&d<l.length-1?l[d+1]:null,b=d>=0,v=n.labels&&n.labels.length>0?n.labels.map(L=>`
          <span class="issue-label" style="background: ${W(L.color)}20; color: ${W(L.color)}">
            ${m(L.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${u(n.id)}" data-label-id="${u(L.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let w='<span class="text-muted">None</span>';try{const L=await h.getDocumentIssues(n.id);L.length>0&&(w=L.map(C=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(C.identifier)}</span>
            <span class="linked-item-title">${m(C.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${u(n.id)}" data-issue-id="${u(C.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch{}s.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="documents">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${b?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${p?`data-action="view-document" data-document-id="${u(p.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${d+1} / ${l.length}</span>
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${u(f.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${r?Me(r):'<p class="text-muted">No content</p>'}</div>

          ${i}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?m(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${m(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${v}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${u(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${m(n.author_name||"Unknown")}</span>
            </div>

            <div class="property-row">
              <span class="property-label">Created</span>
              <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
            </div>

            <div class="property-row">
              <span class="property-label">Updated</span>
              <span class="property-value-static">${new Date(n.updated_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div class="sidebar-section">
            <h4>Linked Issues</h4>
            <div class="sidebar-linked-issues">
              ${w}
            </div>
            <button class="btn btn-secondary btn-small sidebar-link-btn" data-action="show-link-issue-modal" data-document-id="${u(n.id)}">+ Link Issue</button>
          </div>

          <div class="sidebar-section sidebar-actions">
            <div class="sidebar-overflow-menu">
              <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
              <div class="overflow-menu-dropdown hidden">
                <button class="overflow-menu-item" data-action="show-edit-document-modal" data-document-id="${u(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit document
                </button>
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${u(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `,js&&js.abort(),js=new AbortController;const{signal:E}=js,T=s.querySelector(".sidebar-overflow-trigger"),B=s.querySelector(".overflow-menu-dropdown");if(T&&B){const L=()=>{B.classList.add("hidden"),T.setAttribute("aria-expanded","false")},C=()=>{const M=B.classList.toggle("hidden");T.setAttribute("aria-expanded",String(!M))};T.addEventListener("click",C,{signal:E}),document.addEventListener("click",M=>{!T.contains(M.target)&&!B.contains(M.target)&&L()},{signal:E}),B.addEventListener("keydown",M=>{M.key==="Escape"&&(L(),T.focus())},{signal:E})}}catch(n){_("load document",n)}}async function Ms(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(s&&!n){const c=a.find(l=>l.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${m(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Ar(){Dn=null;const e=Y(),t=Wr()||"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
    <form data-action="create-document">
      <div class="form-group">
        <label for="doc-title">Title</label>
        <input type="text" id="doc-title" required>
      </div>
      <div class="form-group">
        <label for="doc-project">Project</label>
        <select id="doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="doc-sprint">
          <option value="">Global (Team-wide)</option>
          ${n}
        </select>
      </div>
      <div class="form-group">
        <label for="doc-sprint">Sprint (optional)</label>
        <select id="doc-sprint" disabled>
          <option value="">Select project first</option>
        </select>
      </div>
      <div class="form-group">
        <label for="doc-content">Content</label>
        <textarea id="doc-content" style="min-height: 200px"></textarea>
      </div>
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,q(),t&&await Ms("doc-sprint",t,null,!0)}let Dn=null;async function vp(e,t,n){Dn=n||null;const i=Y().map(a=>`<option value="${u(a.id)}" ${a.id===t?"selected":""}>${m(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
    <form data-action="create-document">
      <div class="form-group">
        <label for="doc-title">Title</label>
        <input type="text" id="doc-title" required>
      </div>
      <div class="form-group">
        <label for="doc-project">Project</label>
        <select id="doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="doc-sprint">
          <option value="">Global (Team-wide)</option>
          ${i}
        </select>
      </div>
      <div class="form-group">
        <label for="doc-sprint">Sprint</label>
        <select id="doc-sprint" disabled>
          <option value="">Loading sprints...</option>
        </select>
      </div>
      <div class="form-group">
        <label for="doc-content">Content</label>
        <textarea id="doc-content" style="min-height: 200px"></textarea>
      </div>
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,q(),t&&await Ms("doc-sprint",t,e)}async function bp(e){var a;e.preventDefault();const t=(a=S())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{if(await h.createDocument(t,i),await Mn(t),R(),$("Document created!","success"),Dn){const o=Dn;Dn=null,o()}}catch(o){_("create document",o)}return!1}async function Br(e){try{const t=await h.getDocument(e),s=Y().map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form data-action="update-document" data-document-id="${u(e)}">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${u(t.title)}" required>
        </div>
        <div class="form-group">
          <label for="edit-doc-project">Project</label>
          <select id="edit-doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="edit-doc-sprint">
            <option value="" ${t.project_id?"":"selected"}>Global (Team-wide)</option>
            ${s}
          </select>
        </div>
        <div class="form-group">
          <label for="edit-doc-sprint">Sprint (optional)</label>
          <select id="edit-doc-sprint" ${t.project_id?"":"disabled"}>
            <option value="">${t.project_id?"None":"Select project first"}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="edit-doc-content">Content</label>
          <textarea id="edit-doc-content" style="min-height: 200px">${m(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${u(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,q(),t.project_id&&await Ms("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){_("load document",t)}}async function yp(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await h.updateDocument(t,i),R(),await Ge(t),$("Document updated!","success")}catch(a){_("update document",a)}return!1}async function wp(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=S())==null?void 0:t.id;await Mn(n),j("documents"),$("Document deleted!","success")}catch(n){_("delete document",n)}}function kp(e,t){Ms(e,t)}async function $p(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${u(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,q()}async function Ep(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=S())==null?void 0:s.id,a=await h.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${u(t)}" data-issue-id="${u(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function _p(e,t){try{await h.linkDocumentToIssue(e,t),R(),$("Issue linked!","success"),await Ge(e,!1)}catch(n){_("link issue",n)}}async function xp(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Ge(e,!1)}catch(n){_("unlink issue",n)}}let na=!1;async function Ip(e,t){if(e.preventDefault(),na)return!1;const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return $("Please enter a comment","error"),!1;na=!0;try{await h.createDocumentComment(t,s),n.value="",$("Comment added!","success"),await Ge(t,!1)}catch(i){_("add comment",i)}finally{na=!1}return!1}async function Tp(e){var n;const t=(n=S())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const s=await h.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,q();return}const i=s.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${u(e)}" data-label-id="${u(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${W(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,q()}catch(s){_("load labels",s)}}async function Sp(e,t){try{await h.addLabelToDocument(e,t),R(),$("Label added!","success"),await Ge(e,!1)}catch(n){_("add label",n)}}async function Lp(e,t){try{await h.removeLabelFromDocument(e,t),$("Label removed!","success"),await Ge(e,!1)}catch(n){_("remove label",n)}}X({"view-document":(e,t)=>{e.preventDefault(),Ge(t.documentId)},"toggle-doc-selection":(e,t)=>{pp(t.docId)},"clear-doc-search":()=>{np()},"clear-doc-project-filter":()=>{sp()},"clear-all-doc-filters":()=>{ip()},"show-bulk-move-modal":()=>{gp()},"bulk-delete-documents":()=>{hp()},"select-all-docs":()=>{mp()},"clear-doc-selection":()=>{Cr()},"exit-selection-mode":()=>{ta()},"enter-selection-mode":()=>{Lr()},"handle-bulk-move":e=>{fp(e)},"unlink-document-issue":(e,t)=>{xp(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{$p(t.documentId)},"add-document-comment":(e,t)=>{Ip(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Lp(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Tp(t.documentId)},"show-edit-document-modal":(e,t)=>{Br(t.documentId)},"delete-document":(e,t)=>{wp(t.documentId)},"create-document":e=>{bp(e)},"update-doc-sprint-dropdown":(e,t,n)=>{kp(t.sprintSelect,n.value)},"update-document":(e,t)=>{yp(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Ep(n.value,t.documentId)},"link-to-issue":(e,t)=>{_p(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Sp(t.documentId,t.labelId)}});let Qt=[],Ds={},Rs=new Set,dt=null,sa=null,ia=[],Rn=[],aa=[];function jr(){return Ds}function Cp(){return sa}function Ap(){return dt}lt(e=>{e==="currentProject"&&A()==="sprints"&&Pn()});async function Pn(){const e=U();if(!e){const n=document.getElementById("sprints-list");n&&(n.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}Vp();const t=document.getElementById("sprints-list");t&&(t.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await h.getCurrentSprint(e),Qt=await h.getSprints(e),Bp(),await Ps()}catch(n){t&&(t.innerHTML=Fe({icon:je.sprints,heading:"Failed to load sprints",description:"Check your connection and try again"})),_("load sprints",n)}}function Bp(){const e=document.getElementById("sprints-list");if(!e)return;const t=Qt.find(a=>a.status==="active"),n=Qt.find(a=>a.status==="planned"),s=Qt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${u(t.id)}" data-sprint-url="/sprint/${u(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${m(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(t.id)}" data-sprint-name="${u(t.name)}" data-budget="${t.budget||""}" data-project-id="${u(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${u(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=jp(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${u(n.id)}" data-sprint-url="/sprint/${u(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${m(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(n.id)}" data-sprint-name="${u(n.name)}" data-budget="${n.budget||""}" data-project-id="${u(n.project_id)}">Edit Sprint</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${u(a.id)}" data-sprint-url="/sprint/${u(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${m(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||Fe({icon:je.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function jp(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((P,ee,oe)=>Math.min(Math.max(P,ee),oe))((new Date-o)/(r-o),0,1),p=360,f=120,b=16,v=b,w=p-b,E=b,T=f-b,B=P=>s===0?T:E+(1-P/s)*(T-E),L=B(s),C=B(0),M=v+(w-v)*d,H=B(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${Ns(e.start_date)} → ${Ns(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${p} ${f}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${v}" y1="${L}" x2="${w}" y2="${C}" class="burndown-ideal" />
                <line x1="${v}" y1="${L}" x2="${M}" y2="${H}" class="burndown-actual" />
                <circle cx="${M}" cy="${H}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function Nn(e,t=!0){var n;try{const s=await h.getSprint(e);if(!s){$("Sprint not found","error"),j("sprints");return}sa=s;const i=(n=S())==null?void 0:n.id,[a,o,r]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(()=>[]),i?h.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);ia=a,aa=o,Rn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Dp()}catch(s){console.error("Failed to load sprint:",s),$("Failed to load sprint","error"),j("sprints")}}async function Mp(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),j("sprints",!1);return}try{await Nn(e,!1)}catch{j("sprints",!1)}}function Dp(){const e=sa,t=ia;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=t.filter(l=>Ht.includes(l.status)),i=t.filter(l=>l.status==="done"),a=t.reduce((l,d)=>l+(d.estimate||0),0),o=i.reduce((l,d)=>l+(d.estimate||0),0);let r="";e.status==="active"?r='<span class="badge badge-status-active">Active</span>':e.status==="planned"?r='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(r='<span class="badge badge-status-completed">Completed</span>');const c=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="sprints">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${m(e.name)}</h2>
                ${r}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${Ns(e.start_date)} → ${Ns(e.end_date)}
                </div>
            `:""}
        </div>

        <div class="sprint-detail-stats">
            <div class="stat-card">
                <div class="stat-value">${s.length}</div>
                <div class="stat-label">Open Issues</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${i.length}</div>
                <div class="stat-label">Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${c}</div>
                <div class="stat-label">Budget</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${o} / ${a}</div>
                <div class="stat-label">Points Done</div>
            </div>
        </div>

        <div class="sprint-detail-sections">
            <div class="sprint-detail-section">
                <h3>Open Issues (${s.length})</h3>
                ${s.length===0?`
                    <div class="empty-state-small">No open issues in this sprint</div>
                `:`
                    <div class="sprint-issues-list">
                        ${s.map(l=>Mr(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${i.length>0?"open":""}>
                <summary><h3>Completed Issues (${i.length})</h3></summary>
                ${i.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${i.map(l=>Mr(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Pp()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Rn.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${u(e.id)}"
                        data-project-id="${u(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Rn.length>0?`
                    <div class="sprint-issues-list">
                        ${Rn.map(l=>Rp(l)).join("")}
                    </div>
                `:`
                    <div class="empty-state-small">No documents in this sprint yet</div>
                `}
            </div>
        </div>
    `}function Mr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",s=Ho.includes(e.status)?e.status:"backlog",i=n?`badge-priority-${n}`:"",a=`status-dot-${s}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${u(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${i}">${Yp(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Rp(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${u(e.id)}" data-document-url="/document/${u(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ze(e.created_at)}</span>
            </span>
        </div>
    `}function Pp(){const e=aa;if(!e||e.length===0)return`
            <div class="empty-state-small">
                <p>No budget transactions yet. Points are recorded when issues are marked done.</p>
            </div>
        `;const t=e.reduce((n,s)=>n+s.points,0);return`
        <div class="budget-ledger">
            <div class="budget-ledger-header">
                <span class="text-muted">${e.length} transaction${e.length===1?"":"s"}</span>
                <span class="budget-ledger-total">${t} points total</span>
            </div>
            <div class="budget-ledger-list">
                ${e.map(n=>`
                    <div class="budget-ledger-item">
                        <div class="ledger-item-info">
                            <span class="ledger-item-identifier">${m(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${m(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${Np(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Np(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function qp(e,t,n,s){const i=s?bm(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${u(e)}" data-project-id="${u(s)}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${u(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${i?`<small class="form-hint">${m(i)}</small>`:""}
            </div>
            <div class="form-group">
                <label>Apply to:</label>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="budget-scope" value="this" checked>
                        This sprint only
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="budget-scope" value="planned">
                        This sprint + planned sprints
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="budget-scope" value="default">
                        Also set as project default
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `,q()}async function Op(e,t,n){var r,c,l;e.preventDefault();const s=(c=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:c.trim(),i=document.getElementById("sprint-budget").value,a=i?parseInt(i):null,o=((l=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:l.value)||"this";try{const d={budget:a};if(s&&(d.name=s),await h.updateSprint(t,d),o==="planned"||o==="default"){const f=Qt.filter(b=>b.status==="planned"&&b.id!==t);for(const b of f)await h.updateSprint(b.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await Pn(),R(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(d){_("update budget",d)}return!1}async function Hp(e){const t=Qt.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,q();const n=Ht;let s=0,i=!1,a=!1;try{const[c,l]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);s=c.filter(d=>n.includes(d.status)).length,i=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${m(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${u(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function Fp(e){try{const t=await h.closeSprint(e);await Pn(),t.limbo?Gp(t):$("Sprint completed!","success")}catch(t){_("complete sprint",t)}}async function Ps(){const e=U();if(e)try{dt=await h.getLimboStatus(e),Up()}catch(t){console.error("Failed to load limbo status:",t)}}function Up(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!dt||!dt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${dt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Gp(e){const t=U();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${m(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,q(),zp(t)}async function zp(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(s.name)} <span class="ritual-mode">(${m(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${Me(s.prompt)}</div>
                    ${ra(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function oa(){var t,n;if(!dt)return;const e=U();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${dt.pending_rituals.map(s=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${s.attestation?s.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(s.name)}</strong>
                            <span class="badge badge-ritual-${u(s.approval_mode)}">${m(s.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${Me(s.prompt)}</div>
                        ${ra(s.attestation)}
                        ${Wp(s,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=dt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${dt.completed_rituals.map(s=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(s.name)}</div>
                            ${ra(s.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,q()}function ra(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(Ze(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${Me(e.note)}</div>
        </div>
    `}function Wp(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Dr(e){for(const t of e)if(!Rs.has(t))try{(await h.getSprints(t)).forEach(s=>{Ds[s.id]=s}),Rs.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Vp(){Ds={},Rs=new Set,ia=[],aa=[],Rn=[]}function Kp(e,t){t.forEach(n=>{Ds[n.id]=n}),Rs.add(e)}X({"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Nn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;qp(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{oa()},"show-close-sprint-confirmation":(e,t)=>{Hp(t.sprintId)},"handle-update-budget":(e,t)=>{Op(e,t.sprintId,t.projectId)},"close-modal":()=>{R()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,R(),Fp(t.sprintId)},"dismiss-limbo-modal":()=>{R(),Ps()},"approve-ritual":(e,t)=>{Jp(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Pr(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}z(t.issueId)},"create-sprint-document":async(e,t)=>{await vp(t.sprintId,t.projectId,()=>{Nn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ge(t.documentId)}});function Ns(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Yp(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}lt(e=>{e==="currentProject"&&A()==="rituals"&&Rr()});async function Rr(){const e=U(),t=document.getElementById("rituals-content");if(!e){const n=document.getElementById("rituals-tabs");n&&n.classList.add("hidden"),t&&(t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>');return}xm(e),t&&(t.innerHTML='<div class="loading">Loading rituals...</div>');try{await Hn()}catch(n){t&&(t.innerHTML=`<div class="empty-state">Error loading rituals: ${m(n.message)}</div>`)}}async function Zp(){zr(Xp),Rr()}function Xp(){const e=document.getElementById("rituals-content"),t=Im(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
        <div id="rituals-tab-sprint" class="settings-tab-content">
            <div class="settings-section-header">
                <p class="settings-description">Required when closing a sprint</p>
                <button class="btn btn-primary" data-action="show-create-ritual-modal" data-trigger="every_sprint">+ Create Ritual</button>
            </div>
            <div id="rv-sprint-rituals-list" class="rituals-list"></div>
        </div>
        <div id="rituals-tab-close" class="settings-tab-content hidden">
            <div class="settings-section-header">
                <p class="settings-description">Required when closing a ticket</p>
                <button class="btn btn-primary" data-action="show-create-ritual-modal" data-trigger="ticket_close">+ Create Ritual</button>
            </div>
            <div id="rv-close-rituals-list" class="rituals-list"></div>
        </div>
        <div id="rituals-tab-claim" class="settings-tab-content hidden">
            <div class="settings-section-header">
                <p class="settings-description">Required when claiming a ticket (moving to in_progress)</p>
                <button class="btn btn-primary" data-action="show-create-ritual-modal" data-trigger="ticket_claim">+ Create Ritual</button>
            </div>
            <div id="rv-claim-rituals-list" class="rituals-list"></div>
        </div>
    `,en("rv-sprint-rituals-list",n,"sprint"),en("rv-close-rituals-list",s,"close"),en("rv-claim-rituals-list",i,"claim")}function Qp(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Jp(e,t){try{await h.approveAttestation(e,t),$("Ritual approved!","success"),await Ps(),oa()}catch(n){_("approve ritual",n)}}async function Pr(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{em(s,e,t)}),q()}async function em(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await h.completeGateRitual(t,n,s||null),$("Ritual completed!","success"),await Ps();const i=Ap();i&&!i.in_limbo?(R(),$("Limbo cleared! Next sprint is now active.","success")):oa()}catch(i){_("complete gate ritual",i)}return!1}function tm(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}" data-ritual-prompt="${u(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Attest</button>`}function nm(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${m(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{sm(i,e,t)}),q()}async function sm(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return $("A note is required for this attestation.","error"),!1;try{await h.attestTicketRitual(t,n,s),$("Ritual attested!","success"),R(),await Cs(n)}catch(i){_("attest ticket ritual",i)}return!1}async function im(e,t){try{await h.attestTicketRitual(e,t),$("Ritual attested!","success"),await Cs(t)}catch(n){_("attest ticket ritual",n)}}async function am(e,t){try{await h.approveTicketRitual(e,t),$("Ritual approved!","success"),await Cs(t)}catch(n){_("approve ticket ritual",n)}}function om(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{rm(s,e,t)}),q()}async function rm(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await h.completeTicketGateRitual(t,n,s||null),$("Ritual completed!","success"),R(),await Cs(n)}catch(i){_("complete ticket ritual",i)}return!1}X({"show-create-ritual-modal":(e,t)=>{Zr(t.trigger)},"approve-ticket-ritual":(e,t)=>{am(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{om(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{nm(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{im(t.ritualId,t.issueId)}});function Me(e){if(!e)return"";try{N.setOptions({breaks:!0,gfm:!0});const n=N.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Lo.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function la(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function lm(e,t,n,s,i,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(i)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${la(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",l=>{cm(l,e,t,n)}),q(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function cm(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,i||null),$(`GATE ritual "${s}" approved!`,"success"),R(),Mt()}catch(a){_("complete gate ritual",a)}}function dm(e,t,n,s,i,a,o,r){lm(e,t,n,s,i,a,o,r)}function um(e,t,n,s,i,a,o,r,c){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(i)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${la(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${Me(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{pm(d,e,t,n)}),q(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function pm(e,t,n,s){var a,o;e.preventDefault();const i=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await h.approveTicketRitual(t,n),i)try{await h.createComment(n,i)}catch(r){console.error("Failed to post approval comment:",r)}$(`Review ritual "${s}" approved!`,"success"),R(),Mt()}catch(r){_("approve review ritual",r)}}function mm(e,t,n,s,i,a,o,r,c){um(e,t,n,s,i,a,o,r,c)}lt(e=>{e==="currentProject"&&A()==="approvals"&&Mt()});let ca=[];async function Mt(){if(!S())return;const e=document.getElementById("approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=U(),n=t?Y().filter(o=>o.id===t):Y(),s=await Promise.all(n.map(async o=>{const[r,c]=await Promise.all([h.getPendingApprovals(o.id),h.getLimboStatus(o.id)]);return{project:o,approvals:r,limbo:c}})),i=[],a=[];for(const{project:o,approvals:r,limbo:c}of s)if(i.push(...r),c&&c.in_limbo){const l=(c.pending_rituals||[]).filter(d=>{var p;return(p=d.attestation)!=null&&p.approved_at?!1:d.approval_mode==="gate"||!!d.attestation});l.length>0&&a.push({project:o,rituals:l})}xd(i),ca=a,Nr()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${m(t.message)}</p></div>`}}}function Nr(){const e=document.getElementById("approvals-list");if(!e)return;const t=_d(),n=ca.length>0,s=!gd();if(t.length===0&&!n){s?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <h3>Welcome to Approvals</h3>
                    <p>This is where you'll review and approve ritual attestations from your team.</p>
                    <div class="explainer-details">
                        <p><strong>What are rituals?</strong> Rituals are configurable checks that run when sprints close, tickets are claimed, or tickets are closed. They ensure your team follows processes like running tests, updating docs, or getting code reviewed.</p>
                        <p><strong>How approvals work:</strong></p>
                        <ul>
                            <li><strong>Gate</strong> rituals require a human to complete them directly — agents cannot attest.</li>
                            <li><strong>Review</strong> rituals are attested by agents but need human approval before they count.</li>
                            <li><strong>Auto</strong> rituals are cleared immediately by agents (they won't appear here).</li>
                        </ul>
                        <p>To set up rituals, go to a project's settings and configure them under the ritual tabs.</p>
                    </div>
                    <button class="btn btn-secondary" data-action="dismiss-approvals-explainer">Got it!</button>
                </div>
            `:e.innerHTML=`
                <div class="empty-state">
                    <h3>No pending approvals</h3>
                    <p>All rituals have been completed. Nice work!</p>
                </div>
            `;return}let i="";n&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${ca.map(({project:d,rituals:p})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${p.map(f=>{const b=f.attestation&&!f.attestation.approved_at,v=b?"⏳":"○",w=b?`<span class="gate-waiting-info">Attested by <strong>${m(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',E=b?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${u(f.id)}"
                                            data-project-id="${u(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${u(f.id)}"
                                                data-project-id="${u(d.id)}"
                                                data-ritual-name="${u(f.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${v} ${m(f.name)}
                                                    <span class="badge badge-ritual-${u(f.approval_mode)}">${m(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(f.prompt)}</span>
                                                ${w}
                                            </div>
                                            ${E}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=d=>d.pending_approvals||[],o=d=>p=>{const f=a(p).filter(d);return f.length>0?{...p,_filteredApprovals:f}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(da).join("")}
                </div>
            </div>
        `),c.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map(da).join("")}
                </div>
            </div>
        `),l.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${l.map(da).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;dm(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var b;d.disabled=!0;const p=(b=d.closest(".gate-ritual-actions"))==null?void 0:b.querySelector(".review-approve-btn");p&&(p.disabled=!0);const f=d.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),$(`Review ritual "${f.ritualName}" approved!`,"success"),await Mt()}catch(v){d.disabled=!1,p&&(p.disabled=!1),_("approve review ritual",v)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;mm(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt,p.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await Mt()}catch(p){d.disabled=!1,_("approve sprint ritual",p)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Pr(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName)})})}function gm(){fd(),Nr()}function da(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(s.requested_by_name)}</strong>${s.requested_at?` (${la(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${Me(s.attestation_note)}</div>`:"",c=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',l=i?`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${u(s.ritual_id)}"
                        data-issue-id="${u(e.issue_id)}"
                        data-ritual-name="${u(s.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${u(s.ritual_id)}"
                        data-issue-id="${u(e.issue_id)}"
                        data-ritual-name="${u(s.ritual_name)}"
                        data-ritual-prompt="${u(s.ritual_prompt)}"
                        data-issue-identifier="${u(e.identifier)}"
                        data-issue-title="${u(e.title)}"
                        data-requested-by="${u(s.requested_by_name||"")}"
                        data-requested-at="${u(s.requested_at||"")}"
                        data-attestation-note="${u(s.attestation_note||"")}">Comment &amp; Approve</button>
                </div>`:`<button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${u(s.ritual_id)}"
                    data-issue-id="${u(e.issue_id)}"
                    data-ritual-name="${u(s.ritual_name)}"
                    data-ritual-prompt="${u(s.ritual_prompt)}"
                    data-issue-identifier="${u(e.identifier)}"
                    data-issue-title="${u(e.title)}"
                    data-requested-by="${u(s.requested_by_name||"")}"
                    data-requested-at="${u(s.requested_at||"")}">Complete</button>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${m(s.ritual_name)} ${c}</span>
                    <span class="gate-ritual-prompt">${m(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                ${l}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.issue_id)}" class="gate-issue-link">
                    <span class="gate-issue-id">${m(e.identifier)}</span>
                    <span class="gate-issue-title">${m(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${m(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}X({"view-issue-from-modal":(e,t)=>{e.preventDefault(),R(),z(t.issueId)},"dismiss-approvals-explainer":()=>{gm()}});const qs={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Os={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let qr=0;function Or(e){qr=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=Hr(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Hr(e="",t="",n=""){const s=qr++,i=Object.keys(qs).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?qs[e]:qs.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${Os[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${s}">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" data-action="toggle-value-input" data-row-id="${s}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${u(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${s}">&times;</button>
        </div>
    `}function fm(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Hr()),Hs()}function hm(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Hs()}function vm(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=qs[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Os[o]}</option>`).join(""),Fr(e),Hs()}function Fr(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function qn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Hs(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Ur(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw qn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw qn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${c}`;if(n.has(p))throw qn(`Duplicate condition: ${r} ${Os[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),c==="isnull")t[p]=!0;else if(c==="in"||c==="contains")t[p]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(c==="gte"||c==="lte"){if(!d)throw qn(`Please enter a numeric value for ${r} ${Os[c]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(d,10);if(isNaN(f))throw qn(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${d}`);t[p]=f}else t[p]=d}return Hs(),Object.keys(t).length>0?t:null}X({"add-condition-row":()=>{fm()},"remove-condition-row":(e,t)=>{hm(Number(t.rowId))},"update-operator-options":(e,t)=>{vm(Number(t.rowId))},"toggle-value-input":(e,t)=>{Fr(Number(t.rowId))}});let ae=[],ua=null;const Gr=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];lt((e,t)=>{e==="currentProject"&&(t&&nd(t),Gr.forEach(n=>{const s=document.getElementById(n);s&&(s.value=t||"")}),Rm(t||""))});const Fs={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function zr(e){ua=e}function Y(){return ae}function Jt(e){const t=ae.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Fs[n]||Fs.fibonacci}function Us(e,t){if(!e)return"No estimate";const s=Jt(t).find(i=>i.value===e);return s?s.label:`${e} points`}function pa(e,t){return e?!Jt(t).some(s=>s.value===e):!1}function bm(e){const t=ae.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(Fs[n]||Fs.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function ze(){if(S())try{ae=await h.getProjects(S().id),ym();const e=U();if(e&&ae.some(s=>s.id===e))return;const t=ma();if(t&&ae.some(s=>s.id===t)){He(t);return}const n=Co();if(n&&ae.some(s=>s.id===n)){He(n);return}ae.length>0&&He(ae[0].id)}catch(e){_("load projects",e)}}function ym(){const e='<option value="">All Projects</option>'+ae.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+ae.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],s=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),s.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const i=U();Gr.forEach(a=>{const o=document.getElementById(a);o&&(o.value=i||"")})}function Wr(){return Co()}function On(){const e=document.getElementById("projects-list");if(ae.length===0){e.innerHTML=Fe({icon:je.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=ae.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${u(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${W(t.color)}20; color: ${W(t.color)}">
                    ${m(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${m(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${u(t.id)}" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${m(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function wm(e){He(e),j("issues")}function Vr(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-project">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key (2-10 uppercase letters/numbers)</label>
                <input type="text" id="project-key" pattern="[A-Z0-9]{2,10}" required
                    style="text-transform: uppercase">
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description"></textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="#6366f1">
            </div>
            <div class="form-group">
                <label for="project-estimate-scale">Estimate Scale</label>
                <select id="project-estimate-scale">
                    <option value="fibonacci">Fibonacci (1, 2, 3, 5, 8, 13, 21)</option>
                    <option value="linear">Linear (1-10)</option>
                    <option value="powers_of_2">Powers of 2 (1, 2, 4, 8, 16, 32, 64)</option>
                    <option value="tshirt">T-Shirt (XS, S, M, L, XL)</option>
                </select>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" id="project-human-rituals-required">
                    Require humans to complete rituals
                </label>
                <small class="form-hint">When unchecked, humans can close tickets without completing rituals</small>
            </div>
            <button type="submit" class="btn btn-primary">Create Project</button>
        </form>
    `,q()}async function km(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(S().id,t),await ze(),On(),R(),$("Project created!","success")}catch(n){_("create project",n)}return!1}async function $m(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await ze(),On(),R(),$("Project updated!","success")}catch(s){_("update project",s)}return!1}async function Em(e){const t=ae.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await ze(),On(),R(),$("Project deleted","success")}catch(n){_("delete project",n)}}let we=null;async function Kr(e){we=e,ae.length===0&&await ze();const t=ae.find(n=>n.id===e);if(!t){$("Project not found","error"),j("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Yr("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Yr(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!ut||ut.length===0)&&Hn()}function _m(){we=null,ut=[]}function xm(e){we=e}function Im(){return ut}async function Tm(){if(!we)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(we,t),await ze(),$("Settings saved","success");const n=ae.find(s=>s.id===we);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){_("save project settings",n)}}async function Sm(){if(!we)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await h.updateProject(we,n),await ze(),$("Settings saved","success")}catch(s){_("save settings",s)}}let ut=[];async function Hn(){if(we)try{ut=await h.getRituals(we),Lm(),typeof ua=="function"&&ua()}catch(e){_("load rituals",e)}}function Lm(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=ut.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=ut.filter(s=>s.trigger==="ticket_close"),n=ut.filter(s=>s.trigger==="ticket_claim");en("ps-sprint-rituals-list",e,"sprint"),en("ps-close-rituals-list",t,"close"),en("ps-claim-rituals-list",n,"claim")}function en(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>u(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${Me(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${i(a.approval_mode)}">${m(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${u(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${u(a.id)}" data-ritual-name="${u(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function Zr(e){if(!we)return;let t=[];try{t=await h.getRitualGroups(we)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="create-project-ritual">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" placeholder="e.g., run-tests, update-docs" required>
        <p class="form-help">Short identifier for the ritual.</p>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" placeholder="e.g., Did you run the test suite and verify all tests pass?" required></textarea>
        <p class="form-help">What the agent should consider/do.</p>
      </div>
      <div class="form-group">
        <label for="ritual-trigger">Trigger</label>
        <select id="ritual-trigger" data-action="toggle-ritual-conditions">
          <option value="every_sprint" ${e==="every_sprint"?"selected":""}>Every Sprint - Required when sprint closes</option>
          <option value="ticket_close" ${e==="ticket_close"?"selected":""}>Ticket Close - Required when closing a ticket</option>
          <option value="ticket_claim" ${e==="ticket_claim"?"selected":""}>Ticket Claim - Required when claiming a ticket</option>
        </select>
        <p class="form-help">When this ritual is required.</p>
      </div>
      <div class="form-group">
        <label for="ritual-mode">Approval Mode</label>
        <select id="ritual-mode">
          <option value="auto">Auto - Agent clears immediately</option>
          <option value="review">Review - Requires human approval</option>
          <option value="gate">Gate - Human only (agent cannot attest)</option>
        </select>
        <p class="form-help">How attestations are approved.</p>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" id="ritual-note-required" checked>
          Require note on attestation
        </label>
        <p class="form-help">When checked, agents must provide a note when attesting.</p>
      </div>
      <div class="form-group">
        <label for="ritual-group">Group</label>
        <select id="ritual-group" data-action="ritual-group-change">
          <option value="">None (always required)</option>
          ${t.map(n=>`<option value="${u(n.id)}" data-mode="${u(n.selection_mode)}">${m(n.name)} (${m(n.selection_mode)})</option>`).join("")}
          <option value="__create__">+ Create Group...</option>
        </select>
        <p class="form-help">Group rituals for random/round-robin/percentage selection.</p>
      </div>
      <div id="ritual-group-create-inline" class="form-group hidden">
        <div style="display: flex; gap: 8px; align-items: end;">
          <div style="flex: 1;">
            <label for="ritual-new-group-name">Group Name</label>
            <input type="text" id="ritual-new-group-name" placeholder="e.g., review-checks">
          </div>
          <div>
            <label for="ritual-new-group-mode">Mode</label>
            <select id="ritual-new-group-mode">
              <option value="random_one">Random One</option>
              <option value="round_robin">Round Robin</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>
      </div>
      <div id="ritual-weight-group" class="form-group hidden">
        <label for="ritual-weight">Weight</label>
        <input type="number" id="ritual-weight" value="1" min="0" step="0.1">
        <p class="form-help">Relative weight for random selection (higher = more likely).</p>
      </div>
      <div id="ritual-percentage-group" class="form-group hidden">
        <label for="ritual-percentage">Percentage (%)</label>
        <input type="number" id="ritual-percentage" value="" min="0" max="100" step="1" placeholder="e.g., 50">
        <p class="form-help">Independent chance this ritual is required each time (0-100).</p>
      </div>
      <div id="ritual-conditions-section"${e==="every_sprint"?' style="display: none;"':""}>
        ${Or(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,q()}function Cm(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Am(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function Xr(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(we,{name:t,selection_mode:n})).id}return e.value||null}async function Bm(e){e.preventDefault();let t;try{t=Ur()}catch{return!1}let n;try{n=await Xr()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await h.createRitual(we,s),await Hn(),R(),$("Ritual created!","success")}catch(i){_("create ritual",i)}return!1}async function jm(e){const t=ut.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(we)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${u(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${u(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${m(t.prompt)}</textarea>
      </div>
      <div class="form-group">
        <label for="ritual-trigger">Trigger</label>
        <select id="ritual-trigger" data-action="toggle-ritual-conditions">
          <option value="every_sprint" ${!t.trigger||t.trigger==="every_sprint"?"selected":""}>Every Sprint - Required when sprint closes</option>
          <option value="ticket_close" ${t.trigger==="ticket_close"?"selected":""}>Ticket Close - Required when closing a ticket</option>
          <option value="ticket_claim" ${t.trigger==="ticket_claim"?"selected":""}>Ticket Claim - Required when claiming a ticket</option>
        </select>
      </div>
      <div class="form-group">
        <label for="ritual-mode">Approval Mode</label>
        <select id="ritual-mode">
          <option value="auto" ${t.approval_mode==="auto"?"selected":""}>Auto - Agent clears immediately</option>
          <option value="review" ${t.approval_mode==="review"?"selected":""}>Review - Requires human approval</option>
          <option value="gate" ${t.approval_mode==="gate"?"selected":""}>Gate - Human only</option>
        </select>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" id="ritual-note-required" ${t.note_required!==!1?"checked":""}>
          Require note on attestation
        </label>
        <p class="form-help">When checked, agents must provide a note when attesting.</p>
      </div>
      <div class="form-group">
        <label for="ritual-group">Group</label>
        <select id="ritual-group" data-action="ritual-group-change">
          <option value="">None (always required)</option>
          ${n.map(o=>`<option value="${u(o.id)}" data-mode="${u(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${m(o.name)} (${m(o.selection_mode)})</option>`).join("")}
          <option value="__create__">+ Create Group...</option>
        </select>
      </div>
      <div id="ritual-group-create-inline" class="form-group hidden">
        <div style="display: flex; gap: 8px; align-items: end;">
          <div style="flex: 1;">
            <label for="ritual-new-group-name">Group Name</label>
            <input type="text" id="ritual-new-group-name" placeholder="e.g., review-checks">
          </div>
          <div>
            <label for="ritual-new-group-mode">Mode</label>
            <select id="ritual-new-group-mode">
              <option value="random_one">Random One</option>
              <option value="round_robin">Round Robin</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>
      </div>
      <div id="ritual-weight-group" class="form-group ${i?"":"hidden"}">
        <label for="ritual-weight">Weight</label>
        <input type="number" id="ritual-weight" value="${t.weight||1}" min="0" step="0.1">
        <p class="form-help">Relative weight for random selection (higher = more likely).</p>
      </div>
      <div id="ritual-percentage-group" class="form-group ${a?"":"hidden"}">
        <label for="ritual-percentage">Percentage (%)</label>
        <input type="number" id="ritual-percentage" value="${t.percentage!=null?t.percentage:""}" min="0" max="100" step="1" placeholder="e.g., 50">
        <p class="form-help">Independent chance this ritual is required each time (0-100).</p>
      </div>
      <div id="ritual-conditions-section"${!t.trigger||t.trigger==="every_sprint"?' style="display: none;"':""}>
        ${Or(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,q()}async function Mm(e,t){e.preventDefault();let n;try{n=Ur()}catch{return!1}let s;try{s=await Xr()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.updateRitual(t,i),await Hn(),R(),$("Ritual updated!","success")}catch(a){_("update ritual",a)}return!1}async function Dm(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Hn(),$("Ritual deleted","success")}catch(n){_("delete ritual",n)}}X({"view-project":(e,t)=>{wm(t.projectId)},"view-project-settings":(e,t)=>{Kr(t.projectId)},"create-project":e=>{km(e)},"update-project":(e,t)=>{$m(e,t.projectId)},"confirm-delete-project":(e,t)=>{Em(t.projectId)},"edit-project-ritual":(e,t)=>{jm(t.ritualId)},"delete-project-ritual":(e,t)=>{Dm(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Bm(e)},"update-project-ritual":(e,t)=>{Mm(e,t.ritualId)},"toggle-ritual-conditions":()=>{Cm()},"ritual-group-change":()=>{Am()}});function ma(){const t=new URLSearchParams(window.location.search).get("project");return t||Wr()}function Rm(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}const ga={},Gs=new Map;let fa=null,ha=null,va=null,ba=null,ya=null,wa=null,Qr=!1;function Pm(e){Object.assign(ga,e)}function Nm({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(fa=e),t&&(ha=t),n&&(va=n),s&&(ba=s),i&&(ya=i),a&&(wa=a)}function qm(){return Object.keys(ga)}function j(e,t=!0){if(t&&Gs.set(window.location.href,window.scrollY),wd(e),t){let i;const a=ma(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),fa&&fa();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=ga[e];s&&s(),t&&window.scrollTo(0,0)}function Jr(){var s;const t=window.location.pathname.split("/").filter(Boolean);ba&&ba();let n="my-issues";if(t.length===0||t[0]==="")j("my-issues",!1);else{if(ha&&ha(t))return;{n=t[0];const i={"gate-approvals":"approvals"};i[n]&&(n=i[n]),qm().includes(n)?j(n,!1):(n="my-issues",j("my-issues",!1))}}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function el(e){Gs.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),ya&&ya(e)}function Om(e){Gs.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),wa&&wa(e)}function tl(){const e=Gs.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function Hm(){Qr||(Qr=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&va&&va(e.state)){tl();return}(t=e.state)!=null&&t.view?j(e.state.view,!1):Jr(),tl()}))}let Fn=[];function zs(){return Fn}function Fm(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Um(e){const t=e==null?void 0:e.avatar_url,n=u((e==null?void 0:e.name)||"Agent");return t?Fm(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${u(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Gm(e){var t;if(e||(e=(t=S())==null?void 0:t.id),!!e)try{Fn=await h.getTeamAgents(e),vs(Rt,zs),ys()}catch(n){console.error("Failed to load team agents:",n)}}async function ka(e){var t;if(e||(e=(t=S())==null?void 0:t.id),!!e)try{Fn=await h.getTeamAgents(e),vs(Rt,zs),ys(),zm()}catch(n){_("load agents",n)}}function zm(){const e=document.getElementById("agents-list");if(e){if(Fn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=Fn.map(t=>{const n=m(t.name),s=m(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Um(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Si(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${u(t.id)}" data-agent-name="${u(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function Wm(){const e=Y();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
    <form data-action="create-agent">
      <div class="form-group">
        <label for="agent-name">Agent Name</label>
        <input type="text" id="agent-name" placeholder="e.g., claude-bot, ci-agent" required>
        <p class="form-help">A display name for this agent (shown in activity feeds).</p>
      </div>
      <div class="form-group">
        <label for="agent-avatar">Avatar (emoji)</label>
        <input type="text" id="agent-avatar" placeholder="🤖" maxlength="2">
        <p class="form-help">Optional emoji avatar (shown in issue lists and activity).</p>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" id="agent-project-scoped">
          Project-scoped (can only access selected project)
        </label>
      </div>
      <div class="form-group" id="agent-project-select" style="display: none;">
        <label for="agent-project">Project</label>
        <select id="agent-project">
          ${e.map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),q()}async function Vm(e){var o,r,c;e.preventDefault();const t=(o=S())==null?void 0:o.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;i&&a?l=await h.createProjectAgent(a,n,s):l=await h.createTeamAgent(t,n,s),R();const d=m(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${d}</code>
          <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${d}</code>
        </div>
        <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
      </div>
    `,q()}catch(l){_("create agent",l)}return!1}function Km(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function Ym(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),$("Agent deleted","success"),ka()}catch(n){_("delete agent",n)}}X({"create-agent":e=>{Vm(e)},"copy-agent-key":()=>{Km()},"dismiss-agent-modal":()=>{R(),ka()},"delete-agent":(e,t)=>{Ym(t.agentId,t.agentName)}});let Un=0,Gn=null;const Dt=new Map;function pt(e,t){return Dt.has(e)||Dt.set(e,new Set),Dt.get(e).add(t),()=>{var n;return(n=Dt.get(e))==null?void 0:n.delete(t)}}function Zm(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function nl(e){Gn&&(clearTimeout(Gn),Gn=null);const t=Sd();t&&(t.close(),Po(null));const n=h.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Po(a),a.onopen=()=>{console.log("WebSocket connected"),Un>0&&$("Live updates reconnected","success"),Un=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(c){console.error("WebSocket: malformed message",c);return}Xm(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Un++,Un===1&&$("Live updates disconnected. Reconnecting...","warning");const o=Zm(Un-1);Gn=setTimeout(()=>{Gn=null,S()&&S().id===e&&nl(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Xm(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Dt.get(`${n}:${t}`);if(a)for(const c of a)try{c(s,i)}catch(l){console.error(`WebSocket handler error (${n}:${t}):`,l)}const o=Dt.get(n);if(o)for(const c of o)try{c(s,i)}catch(l){console.error(`WebSocket handler error (${n}):`,l)}const r=Dt.get("*");if(r)for(const c of r)try{c(s,i)}catch(l){console.error("WebSocket handler error (*):",l)}}let Ws=[],Vs=[],$a=[],Ea=[];function Qm(){return Ws}function Rt(){return Vs}async function _a(){try{Ws=await h.getMyTeams(),Jm()}catch(e){_("load teams",e)}}function Jm(){const e=document.getElementById("team-list");Ws.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ws.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${u(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function xa(e,t=!1){Ci(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),nl(e.id),await Promise.all([ze(),pg(),tg(),Gm()]),t?Jr():j(A())}function sl(){document.getElementById("team-dropdown").classList.toggle("hidden")}function eg(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function tg(){if(S())try{Vs=await h.getTeamMembers(S().id),vs(Rt,zs),ys()}catch(e){console.error("Failed to load team members:",e)}}async function il(){if(S())try{Vs=await h.getTeamMembers(S().id),vs(Rt,zs),ys(),ng()}catch(e){_("load team members",e)}}function ng(){const e=document.getElementById("team-members-list");e.innerHTML=Vs.map(t=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${m(t.user_name||"Unknown")}</span>
                    <span class="member-email">${m(t.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${t.role}</span>
                ${t.user_id!==_n().id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${u(t.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function Ia(){if(S())try{$a=await h.getTeamInvitations(S().id),sg()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function sg(){const e=document.getElementById("team-invitations-list");if($a.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=$a.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${m(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${m(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${u(t.id)}">Cancel</button>
        </div>
    `).join("")}async function ig(){if(S())try{Ea=await h.getTeamAgents(S().id),ag()}catch(e){_("load team agents",e)}}function ag(){const e=document.getElementById("team-agents-list");if(e){if(Ea.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=Ea.map(t=>{const n=m(t.name),s=m(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${m(i)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${s} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function al(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
        <form data-action="invite-member">
            <div class="form-group">
                <label for="invite-email">Email</label>
                <input type="email" id="invite-email" required>
            </div>
            <div class="form-group">
                <label for="invite-role">Role</label>
                <select id="invite-role">
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Send Invitation</button>
        </form>
    `,q()}async function og(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await h.createInvitation(S().id,t,n),await Ia(),R(),$("Invitation sent!","success")}catch(s){_("send invitation",s)}return!1}async function rg(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(S().id,e),await il(),$("Member removed!","success")}catch(t){_("remove member",t)}}async function lg(e){try{await h.deleteInvitation(S().id,e),await Ia(),$("Invitation canceled!","success")}catch(t){_("cancel invitation",t)}}function ol(){sl(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key (2-10 uppercase letters/numbers)</label>
                <input type="text" id="team-key" pattern="[A-Z0-9]{2,10}" required
                    style="text-transform: uppercase">
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create Team</button>
        </form>
    `,q()}function cg(){S()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${u(S().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${u(S().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${m(S().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,q())}async function dg(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await _a(),await xa(n),R(),$("Team created!","success")}catch(n){_("create team",n)}return!1}async function ug(e){if(e.preventDefault(),!S())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(S().id,t);Ci(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await _a(),R(),$("Team updated!","success")}catch(n){_("update team",n)}return!1}async function pg(){if(S())try{const e=await h.getLabels(S().id);fs(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),X({"select-team":(e,t)=>{xa(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{rg(t.userId)},"delete-invitation":(e,t)=>{lg(t.invitationId)},"invite-member":e=>{og(e)},"create-team":e=>{dg(e)},"update-team":e=>{ug(e)}});let et=null,mt=0,tn=null,nn=null,zn=null,Ta=!1;function mg(){return sd()}function rl(){id()}function ll(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function gg(){et||(et=document.createElement("div"),et.id="onboarding-overlay",et.className="onboarding-overlay",document.getElementById("app").appendChild(et))}function Wn(){if(!et)return;const e=Ta?dl():cl(),t=e[mt],n=e.map((s,i)=>`<span class="onboarding-dot${i===mt?" active":""}${i<mt?" completed":""}"></span>`).join("");et.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function cl(){return[{html:`
                <h2>Welcome to Chaotic!</h2>
                <p class="onboarding-subtitle">A lightweight issue tracker built for teams that ship from the command line.</p>
                <p class="onboarding-description">Let's set up your workspace. This takes about 30 seconds.</p>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" data-action="onboarding-next">Get Started</button>
                </div>
                <div class="onboarding-skip">
                    <a href="#" data-action="onboarding-skip">Skip setup</a>
                </div>
            `},{html:`
                <h2>Create Your Team</h2>
                <p class="onboarding-subtitle">Teams organize your people and projects.</p>
                <form id="onboarding-team-form" data-action="onboarding-create-team">
                    <div class="form-group">
                        <label for="onboarding-team-name">Team Name</label>
                        <input type="text" id="onboarding-team-name" class="form-input" placeholder="e.g. Engineering" required>
                    </div>
                    <div class="form-group">
                        <label for="onboarding-team-key">Team Key <span class="form-hint">(2-10 chars, used in issue IDs)</span></label>
                        <input type="text" id="onboarding-team-key" class="form-input" pattern="[A-Za-z0-9]{2,10}" style="text-transform: uppercase" placeholder="e.g. ENG" required>
                    </div>
                    <div id="onboarding-team-error" class="onboarding-error hidden"></div>
                    <div class="onboarding-actions">
                        <button type="submit" class="btn btn-primary" id="onboarding-team-submit">Create Team</button>
                    </div>
                </form>
                <div class="onboarding-skip">
                    <a href="#" data-action="onboarding-skip">Skip setup</a>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=ll(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
                <h2>Create Your First Project</h2>
                <p class="onboarding-subtitle">Projects group related issues. One per repo or component.</p>
                <form id="onboarding-project-form" data-action="onboarding-create-project">
                    <div class="form-group">
                        <label for="onboarding-project-name">Project Name</label>
                        <input type="text" id="onboarding-project-name" class="form-input" placeholder="e.g. Backend API" required>
                    </div>
                    <div class="form-group">
                        <label for="onboarding-project-key">Project Key <span class="form-hint">(2-10 chars)</span></label>
                        <input type="text" id="onboarding-project-key" class="form-input" pattern="[A-Za-z0-9]{2,10}" style="text-transform: uppercase" placeholder="e.g. API" required>
                    </div>
                    <div id="onboarding-project-error" class="onboarding-error hidden"></div>
                    <div class="onboarding-actions">
                        <button type="submit" class="btn btn-primary" id="onboarding-project-submit">Create Project</button>
                    </div>
                </form>
                <div class="onboarding-skip">
                    <a href="#" data-action="onboarding-skip">Skip setup</a>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=ll(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
                <h2>Create Your First Issue</h2>
                <p class="onboarding-subtitle">What's the first thing your team needs to work on?</p>
                <form id="onboarding-issue-form" data-action="onboarding-create-issue">
                    <div class="form-group">
                        <label for="onboarding-issue-title">Issue Title</label>
                        <input type="text" id="onboarding-issue-title" class="form-input" placeholder="e.g. Set up CI pipeline" required>
                    </div>
                    <div id="onboarding-issue-error" class="onboarding-error hidden"></div>
                    <div class="onboarding-actions">
                        <button type="submit" class="btn btn-primary" id="onboarding-issue-submit">Create Issue</button>
                    </div>
                </form>
                <div class="onboarding-skip">
                    <a href="#" data-action="onboarding-skip">Skip setup</a>
                </div>
            `,onMount(){document.getElementById("onboarding-issue-title").focus()}},{html:`
                <h2>You're all set!</h2>
                <div class="onboarding-summary">
                    <div class="onboarding-summary-item">
                        <span class="onboarding-check">&#10003;</span>
                        <span>Team: <strong id="onboarding-done-team"></strong></span>
                    </div>
                    <div class="onboarding-summary-item">
                        <span class="onboarding-check">&#10003;</span>
                        <span>Project: <strong id="onboarding-done-project"></strong></span>
                    </div>
                    <div class="onboarding-summary-item">
                        <span class="onboarding-check">&#10003;</span>
                        <span>Issue: <strong id="onboarding-done-issue"></strong></span>
                    </div>
                </div>
                <div class="onboarding-tips">
                    <h3>Quick reference</h3>
                    <div class="onboarding-tip"><kbd>C</kbd> Create a new issue</div>
                    <div class="onboarding-tip"><kbd>/</kbd> Search issues</div>
                    <div class="onboarding-tip"><kbd>Cmd+K</kbd> Command palette</div>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" data-action="onboarding-finish">Go to Dashboard</button>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&tn&&(e.textContent=`${tn.name} (${tn.key})`),t&&nn&&(t.textContent=`${nn.name} (${nn.key})`),n&&zn&&(n.textContent=`${zn.identifier} - ${zn.title}`)}}]}function dl(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
                <h2>Welcome Back!</h2>
                <p class="onboarding-subtitle">Here's a quick tour of Chaotic.</p>
                <div class="onboarding-tips">
                    <h3>Your Dashboard</h3>
                    <p class="onboarding-description">The dashboard shows your assigned issues and recent activity across all projects.</p>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" data-action="onboarding-next">Next</button>
                </div>
                ${e}
            `},{html:`
                <h2>Keyboard Shortcuts</h2>
                <p class="onboarding-subtitle">Work faster with shortcuts.</p>
                <div class="onboarding-tips">
                    <div class="onboarding-tip"><kbd>C</kbd> Create a new issue</div>
                    <div class="onboarding-tip"><kbd>/</kbd> Search issues</div>
                    <div class="onboarding-tip"><kbd>Cmd+K</kbd> Command palette</div>
                    <div class="onboarding-tip"><kbd>B</kbd> Switch to board view</div>
                    <div class="onboarding-tip"><kbd>D</kbd> Go to dashboard</div>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" data-action="onboarding-next">Next</button>
                </div>
                ${e}
            `},{html:`
                <h2>CLI Integration</h2>
                <p class="onboarding-subtitle">Manage issues from your terminal.</p>
                <div class="onboarding-tips">
                    <div class="onboarding-tip"><code>chaotic issue list</code> List issues</div>
                    <div class="onboarding-tip"><code>chaotic issue create "Title"</code> Create an issue</div>
                    <div class="onboarding-tip"><code>chaotic issue update ID --status done</code> Close an issue</div>
                    <div class="onboarding-tip"><code>chaotic status</code> Show current context</div>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" data-action="onboarding-finish">Got it!</button>
                </div>
                ${e}
            `}]}function Sa(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function La(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function sn(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function fg(){const e=Ta?dl():cl();mt<e.length-1&&(mt++,Wn())}function hg(){rl(),pl(),Vn()}function vg(){rl(),pl(),Vn()}async function bg(e){e.preventDefault(),La("onboarding-team-error"),sn("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{tn=await h.createTeam({name:t,key:n}),mt++,Wn()}catch(s){Sa("onboarding-team-error",s.message||"Failed to create team"),sn("onboarding-team-submit",!1)}}async function yg(e){e.preventDefault(),La("onboarding-project-error"),sn("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{nn=await h.createProject(tn.id,{name:t,key:n}),mt++,Wn()}catch(s){Sa("onboarding-project-error",s.message||"Failed to create project"),sn("onboarding-project-submit",!1)}}async function wg(e){e.preventDefault(),La("onboarding-issue-error"),sn("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{zn=await h.createIssue(nn.id,{title:t}),mt++,Wn()}catch(n){Sa("onboarding-issue-error",n.message||"Failed to create issue"),sn("onboarding-issue-submit",!1)}}function ul(e=!1){Ta=e,mt=0,tn=null,nn=null,zn=null,gg(),Wn()}function pl(){et&&(et.remove(),et=null)}function ml(){ad(),ul(!0)}X({"onboarding-next":e=>{e.preventDefault(),fg()},"onboarding-skip":e=>{e.preventDefault(),hg()},"onboarding-finish":e=>{e.preventDefault(),vg()},"onboarding-create-team":e=>{bg(e)},"onboarding-create-project":e=>{yg(e)},"onboarding-create-issue":e=>{wg(e)}});async function Vn(){kg(),Tg(),await _a();const e=Qm();if(e.length===0&&!mg()){ul();return}e.length>0&&await xa(e[0],!0)}let an=null,Kn=null,We=null,Ve=null;function Yn(){an||(an=document.getElementById("auth-screen"),Kn=document.getElementById("main-screen"),We=document.getElementById("login-form"),Ve=document.getElementById("signup-form"))}function Ca(){Yn(),an&&an.classList.remove("hidden"),Kn&&Kn.classList.add("hidden")}function kg(){Yn(),an&&an.classList.add("hidden"),Kn&&Kn.classList.remove("hidden")}function $g(){Yn(),We&&We.classList.remove("hidden"),Ve&&Ve.classList.add("hidden")}function Eg(){Yn(),We&&We.classList.add("hidden"),Ve&&Ve.classList.remove("hidden")}async function _g(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),gs(await h.getMe()),await Vn(),$("Welcome back!","success")}catch(s){_("log in",s)}return!1}async function xg(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await h.signup(t,n,s),await h.login(n,s),gs(await h.getMe()),await Vn(),$("Account created successfully!","success")}catch(i){_("sign up",i)}return!1}function gl(){h.logout(),gs(null),Ci(null),Ca(),$("Signed out","success")}function Ig(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Tg(){const e=_n();if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Ig(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${u(s)}" alt="${u(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Sg(){Yn();const e=We==null?void 0:We.querySelector("form");e&&e.addEventListener("submit",i=>_g(i));const t=Ve==null?void 0:Ve.querySelector("form");t&&t.addEventListener("submit",i=>xg(i));const n=We==null?void 0:We.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),Eg()});const s=Ve==null?void 0:Ve.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),$g()})}let Aa=[];async function Ba(){try{Aa=await h.getApiKeys(),Lg()}catch(e){_("load API keys",e)}}function Lg(){const e=document.getElementById("api-keys-list");if(e){if(Aa.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=Aa.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Si(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Si(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${u(t.id)}" data-key-name="${u(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function Cg(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,q()}async function Ag(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);R(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
            <div class="api-key-created">
                <p class="warning-text">Copy your API key now. You won't be able to see it again!</p>
                <div class="api-key-display">
                    <code id="new-api-key">${n.key}</code>
                    <button type="button" class="btn btn-secondary" data-action="copy-api-key">Copy</button>
                </div>
                <div class="api-key-instructions">
                    <p>Use this key in the CLI:</p>
                    <code>chaotic auth set-key ${n.key}</code>
                </div>
                <button type="button" class="btn btn-secondary" data-action="dismiss-api-key-modal">Done</button>
            </div>
        `,q()}catch(n){_("create API key",n)}return!1}async function Bg(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function jg(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),$("API key revoked","success"),await Ba()}catch(n){_("revoke API key",n)}}X({"create-api-key":e=>{Ag(e)},"copy-api-key":()=>{Bg()},"dismiss-api-key-modal":()=>{R(),Ba()},"revoke-api-key":(e,t)=>{jg(t.keyId,t.keyName)}});let Ks=!1,gt=0,_t=[],Ys=[];function Mg(e){Ys=e,_t=[...e]}function ja(){return Ks}function Dg(){if(Ks)return;Ks=!0,gt=0,_t=[...Ys];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Zs()},e.innerHTML=`
        <div class="command-palette">
            <div class="command-input-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" class="command-input" placeholder="Type a command or search..." autofocus>
            </div>
            <div class="command-results" id="command-results"></div>
        </div>
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Rg(n.target.value)),t.addEventListener("keydown",Ng),e.addEventListener("mouseover",n=>{const s=n.target.closest('[data-action="execute-command"]');s&&Pg(Number(s.dataset.commandIndex))}),Zn(),requestAnimationFrame(()=>t.focus())}function Zs(){Ks=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Rg(e){const t=e.toLowerCase().trim();t?_t=Ys.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):_t=[...Ys],gt=0,Zn()}function Zn(){const e=document.getElementById("command-results");if(!e)return;if(_t.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};_t.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===gt?"selected":""}"
                     data-index="${s}"
                     data-action="execute-command" data-command-index="${s}"
>
                    <div class="command-item-icon">${r.icon}</div>
                    <div class="command-item-content">
                        <div class="command-item-title">${r.title}</div>
                        <div class="command-item-subtitle">${r.subtitle}</div>
                    </div>
                    ${r.shortcut?`<div class="command-item-shortcut"><kbd>${r.shortcut}</kbd></div>`:""}
                </div>
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function Pg(e){gt=e,Zn()}function fl(e){const t=_t[e];t&&(Zs(),t.action())}function Ng(e){switch(e.key){case"ArrowDown":e.preventDefault(),gt=Math.min(gt+1,_t.length-1),Zn();break;case"ArrowUp":e.preventDefault(),gt=Math.max(gt-1,0),Zn();break;case"Enter":e.preventDefault(),fl(gt);break;case"Escape":e.preventDefault(),Zs();break}}X({"execute-command":(e,t)=>{fl(Number(t.commandIndex))}});const qg=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function Og(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${m(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${m(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function Hg(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${m(e.title)}</h4>
        ${e.shortcuts.map(Og).join("")}
    </div>`}function hl(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${qg.map(Hg).join("")}
        </div>
    `,q()}lt(e=>{e==="currentProject"&&A()==="epics"&&Ma()});async function Ma(){var t;const e=document.getElementById("epics-list");if(e){e.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("");try{if(!((t=S())!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const n=U();let s;if(n?s=await h.getIssues({project_id:n,issue_type:"epic"}):s=await h.getTeamIssues(S().id,{issue_type:"epic"}),!s||s.length===0){e.innerHTML=Fe({icon:je.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const i=await Promise.all(s.map(async a=>{let o=[];try{o=await h.getSubIssues(a.id)}catch{}return{...a,subIssues:o}}));Fg(i,e)}catch(n){e.innerHTML=`<div class="empty-state">Failed to load epics: ${m(n.message||String(n))}</div>`}}}function Fg(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(p=>p.status==="done"||p.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,l=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase()),d=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${u(s.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${m(s.identifier)}</td>
                <td class="epic-title">${m(s.title)}</td>
                <td class="epic-progress">
                    <div class="epic-progress-bar-container">
                        <div class="epic-progress-bar">
                            <div class="epic-progress-fill${o===100?" epic-progress-complete":""}" style="width: ${o}%"></div>
                        </div>
                        <span class="epic-progress-text">${r}</span>
                    </div>
                </td>
                <td class="epic-estimate">${d}</td>
                <td class="epic-status"><span class="status-badge ${c}">${l}</span></td>
            </tr>
        `}).join("");t.innerHTML=`
        <table class="epic-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Progress</th>
                    <th>Estimate</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${n}
            </tbody>
        </table>
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&Om(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Ug(){const e=U(),t=Y().map(n=>`
        <option value="${u(n.id)}" ${n.id===e?"selected":""}>${m(n.name)}</option>
    `).join("");document.getElementById("modal-title").textContent="Create Epic",document.getElementById("modal-content").innerHTML=`
        <form id="create-epic-form">
            <div class="form-group">
                <label for="create-epic-project">Project</label>
                <select id="create-epic-project" required>
                    <option value="">Select project</option>
                    ${t}
                </select>
            </div>
            <div class="form-group">
                <label for="create-epic-title">Title</label>
                <input type="text" id="create-epic-title" placeholder="Epic title" required autofocus>
            </div>
            <div class="form-group">
                <label for="create-epic-description">Description</label>
                <textarea id="create-epic-description" placeholder="Add description..." rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create Epic</button>
        </form>
    `,q(),document.getElementById("create-epic-form").addEventListener("submit",Gg),document.getElementById("create-epic-title").focus()}async function Gg(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const i=await h.createIssue(t,{title:n,description:s||null,issue_type:"epic"});R(),$(`Created epic ${i.identifier}`,"success"),Ma()}catch(i){_("create epic",i)}}async function vl(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){z(t.id,!1);return}await bl(t.id,!1)}else j("epics",!1)}catch{j("epics",!1)}}async function bl(e,t=!0){try{const[n,s,i,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(n.issue_type!=="epic"){z(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=A()||"epics",c=Y().find(w=>w.id===n.project_id),l=n.assignee_id?In(n.assignee_id):null,d=l?Ct(l):null,p=s.length,f=s.filter(w=>w.status==="done"||w.status==="canceled").length,b=p>0?Math.round(f/p*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${c?m(c.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Ls(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${b===100?" epic-progress-complete":""}" style="width: ${b}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${f} of ${p} done</span>
                                <span>${b}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:s.map(w=>{const E=w.assignee_id?In(w.assignee_id):null,T=E?Ct(E):null;return`
                                <div class="sub-issue-item" data-issue-id="${u(w.id)}" data-identifier="${u(w.identifier)}">
                                    <span class="sub-issue-status">${ye(w.status)}</span>
                                    <span class="sub-issue-id">${m(w.identifier)}</span>
                                    <span class="sub-issue-title">${m(w.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(w.status||"backlog").replace(/_/g,"-")}">${ve(w.status)}</span>
                                    ${T?`<span class="sub-issue-assignee">${m(T)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Yi(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Xi(w)}</span>
                                        <span class="activity-actor">by ${m(Zi(w))}</span>
                                        <span class="activity-time">${Ze(w.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(w=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(w.author_name||"User")}</span>
                                            <span class="comment-date">${Ze(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${m(w.content||"")}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                    `:""}
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row">
                            <span class="property-label">Status</span>
                            <span class="property-value-static">
                                ${ye(n.status)}
                                ${ve(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${Je(n.priority)}
                                ${Se(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${d?m(d):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${Us(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(w=>`
                                    <span class="issue-label" style="background: ${W(w.color)}20; color: ${W(w.color)}">${m(w.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const v=o.querySelector(".sub-issues-list");v&&v.addEventListener("click",w=>{const E=w.target.closest(".sub-issue-item");E&&E.dataset.issueId&&z(E.dataset.issueId)})}catch(n){_("load epic",n)}}function zg(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function Wg(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function Xs(e,t,n="#issues-list .issue-row"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Vg(e){const t="#issues-list .issue-row";function n(i){return i<0?null:document.querySelectorAll(t)[i]||null}function s(i,a,o,r){const c=n(a);if(!c)return;const l=c.dataset.issueId;if(!l||l.startsWith("temp-"))return;i.preventDefault(),i.stopImmediatePropagation();const d=c.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(i,o,l,d)}return function(a){if(e.getCurrentView()!=="issues"||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":a.preventDefault(),Xs(r+1,e.setSelectedIndex,t);break;case"k":a.preventDefault(),Xs(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const c=o[r].dataset.issueId;c&&!c.startsWith("temp-")&&e.viewIssue(c)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const c=o[r].dataset.issueId;c&&!c.startsWith("temp-")&&e.showEditIssueModal(c)}break;case"s":s(a,r,"status","status-btn");break;case"p":s(a,r,"priority","priority-btn");break;case"a":s(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Kg(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(s){if(e.getCurrentView()!=="documents"||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),Xs(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),Xs(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const o=i[a].dataset.documentId;o&&e.viewDocument(o)}break;case"e":if(a>=0&&i[a]){s.preventDefault();const o=i[a].dataset.documentId;o&&e.showEditDocumentModal&&e.showEditDocumentModal(o)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(o=>o.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const yl=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let xt=[],Da=null;lt(e=>{e==="currentProject"&&A()==="board"&&wl()});async function wl(){const e=U();if(!e){const n=document.getElementById("kanban-board");n&&(n.innerHTML=Fe({icon:je.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const t=document.getElementById("kanban-board");t&&(t.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{xt=await h.getIssues({project_id:e}),It()}catch(n){t&&(t.innerHTML=Fe({icon:je.issues,heading:"Failed to load board",description:"Check your connection and try again"})),_("load board",n)}}function It(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=yl.map(t=>{const n=xt.filter(s=>s.status===t.key);return`
            <div class="kanban-column" data-action="board-column" data-status="${t.key}">
                <div class="kanban-column-header">
                    <div class="kanban-column-title">
                        <span class="status-dot status-dot-${t.key}"></span>
                        ${t.label}
                    </div>
                    <span class="kanban-column-count">${n.length}</span>
                </div>
                <div class="kanban-column-content">
                    ${n.length===0?`
                        <div class="kanban-column-empty">No issues</div>
                    `:n.map(s=>`
                        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${u(s.id)}" data-identifier="${u(s.identifier)}">
                            <div class="kanban-card-title">${m(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${Se(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function Yg(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Da=t.dataset.id,t.classList.add("dragging")}function Zg(e,t){t.classList.remove("dragging"),Da=null}function Xg(e,t){e.preventDefault(),t.classList.add("drag-over")}function Qg(e,t){t.classList.remove("drag-over")}function Jg(e,t){e.preventDefault(),t.classList.add("drag-over")}function ef(e,t){t.classList.remove("drag-over")}async function tf(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),s=t.dataset.status,i=xt.find(o=>o.id===n);if(!i)return;const a=i.status;if(i.status=s,kl(s,n),It(),a!==s)try{await h.updateIssue(n,{status:s}),$("Status updated","success")}catch(o){i.status=a,It(),_("update status",o)}}async function nf(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Da||e.dataTransfer.getData("text/plain"),s=t.dataset.id;if(!n||!s||n===s)return;const i=t.closest(".kanban-column"),a=i==null?void 0:i.dataset.status;if(!a)return;const o=xt.find(c=>c.id===n);if(!o)return;const r=o.status;if(o.status=a,kl(a,n,s),It(),r!==a)try{await h.updateIssue(n,{status:a}),$("Status updated","success")}catch(c){o.status=r,It(),_("update status",c)}}function kl(e,t,n=null){const s=xt.filter(o=>o.status===e&&o.id!==t),i=xt.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];yl.forEach(o=>{o.key===e?a.push(...s):a.push(...xt.filter(r=>r.status===o.key))}),xt=a}X({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),z(t.id)):e.type==="dragstart"?Yg(e,n):e.type==="dragend"?Zg(e,n):e.type==="dragover"?Jg(e,n):e.type==="dragleave"?ef(e,n):e.type==="drop"&&nf(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Xg(e,n):e.type==="dragleave"?Qg(e,n):e.type==="drop"&&tf(e,n)}});const Tt=new Map,$l=6e4,Ra=100;let ce=null,Qs=null,Js=null,Xn=null,El=!1;const sf={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},af={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},_l={api:null};let Pa={..._l};function of(e={}){Pa={..._l,...e},ce||(ce=document.createElement("div"),ce.className="issue-tooltip",ce.style.display="none",document.body.appendChild(ce),ce.addEventListener("mouseenter",()=>{clearTimeout(Qs)}),ce.addEventListener("mouseleave",()=>{Na()})),El||(document.addEventListener("mouseover",rf),document.addEventListener("mouseout",lf),El=!0)}function rf(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=cf(t);if(n){if(n===Xn&&ce.style.display!=="none"){clearTimeout(Qs);return}clearTimeout(Js),Js=setTimeout(()=>{df(t,n)},200)}}function lf(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Js),Qs=setTimeout(()=>{Na()},150))}function cf(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function df(e,t){Xn=t;const n=e.getBoundingClientRect();ce.style.left=`${n.left+window.scrollX}px`,ce.style.top=`${n.bottom+window.scrollY+8}px`,ce.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ce.style.display="block";try{const s=await pf(t);if(Xn!==t)return;mf(s)}catch{if(Xn!==t)return;ce.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Na(){clearTimeout(Js),clearTimeout(Qs),ce&&(ce.style.display="none"),Xn=null}function uf(){const e=Date.now();for(const[t,n]of Tt.entries())e-n.timestamp>=$l&&Tt.delete(t)}async function pf(e){Tt.size>Ra/2&&uf();const t=Tt.get(e);if(t&&Date.now()-t.timestamp<$l)return t.issue;if(!Pa.api)throw new Error("API not initialized");const n=await Pa.api.getIssueByIdentifier(e);if(Tt.size>=Ra){const s=Array.from(Tt.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Ra/2);for(const[a]of i)Tt.delete(a)}return Tt.set(e,{issue:n,timestamp:Date.now()}),n}function mf(e){const t=sf[e.status]||"#6b7280",n=af[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";ce.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${gf(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${ff(e.priority)}</span>
        </div>
    `}function gf(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function ff(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function hf(){pt("issue:created",vf),pt("issue:updated",bf),pt("issue:deleted",yf),pt("comment",wf),pt("relation",kf),pt("attestation",$f),pt("activity",Ef),pt("project",_f),pt("sprint",xf)}function vf(e){var i,a,o;const t=be(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,Xe(r),A()==="issues"&&ct()}else Xe([e,...t]),A()==="issues"&&ct(),$(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=_n())==null?void 0:i.id)){const r=wt(),c=r.findIndex(d=>d.id===e.id),l=r.findIndex(d=>d._isOptimistic&&d.title===e.title);if(c===-1&&l===-1)Wt([e,...r]),A()==="my-issues"&&Ln();else if(l>=0){const d=[...r];d[l]=e,Wt(d),A()==="my-issues"&&Ln()}}A()==="my-issues"&&Bt({showLoading:!1}),A()==="board"?It():A()==="sprints"&&ei(),A()==="issue-detail"&&e.parent_id===((a=ie())==null?void 0:a.id)&&z((o=ie())==null?void 0:o.id,!1)}function bf(e){const t=be();t.some(s=>s.id===e.id)&&Xe(t.map(s=>s.id===e.id?e:s));const n=wt();if(n.some(s=>s.id===e.id)&&Wt(n.map(s=>s.id===e.id?e:s)),A()==="issues")ct();else if(A()==="my-issues")Ln(),Bt({showLoading:!1});else if(A()==="board")It();else if(A()==="sprints")ei();else if(A()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&z(e.id)}}function yf(e){var t;Xe(be().filter(n=>n.id!==e.id)),Wt(wt().filter(n=>n.id!==e.id)),A()==="issues"?ct():A()==="my-issues"?(Ln(),Bt({showLoading:!1})):A()==="board"?It():A()==="sprints"&&ei(),$(`Issue ${e.identifier} deleted`,"info"),A()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.id&&($(`Issue ${e.identifier} was deleted`,"warning"),j("my-issues"))}function wf(e){var t;A()==="my-issues"&&Bt({showLoading:!1}),A()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&z(e.issue_id,!1)}function kf(e){var t;if(A()==="issue-detail"){const n=(t=ie())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&z(n,!1)}}function $f(e){var t;A()==="approvals"&&Mt(),A()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&z(e.issue_id,!1)}function Ef(e){var t;A()==="my-issues"&&Bt({showLoading:!1}),A()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&z(e.issue_id,!1)}function _f(e,{type:t}){ze().then(()=>{A()==="projects"&&On()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function ei(){const e=Cp();e?Nn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Pn().catch(t=>console.error("Failed to reload sprints:",t))}function xf(){A()==="sprints"?ei():A()==="my-issues"&&Ui()}const xl='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Il(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function If(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Il(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(xl);n&&n.focus()}}}function ti(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Il(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(xl);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&ti()});async function Tf(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=U();if(!s){$("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=Y().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Xe([r,...be()]),ct();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await h.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=be(),p=d.findIndex(f=>f.id===a);p!==-1&&(d[p]=l,Xe(d)),ct(),ze(),$("Issue created!","success")}catch(l){Xe(be().filter(d=>d.id!==a)),ct(),_("create issue",l)}finally{t.disabled=!1,t.placeholder=i,t.focus()}}Nm({beforeNavigate:()=>{_m(),zr(null),hs(null),No(null),ti(),Na()},detailRoute:e=>e[0]==="epic"&&e[1]?(vl(e[1]),!0):e[0]==="issue"&&e[1]?(Qi(e[1]),!0):e[0]==="document"&&e[1]?(Pf(e[1]),!0):e[0]==="sprint"&&e[1]?(Mp(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Kr(e[1]),!0):!1,detailPopstate:e=>e.epicId?(bl(e.epicId,!1),!0):e.issueId?(z(e.issueId,!1),!0):e.identifier?(Qi(e.identifier),!0):e.documentId?(Ge(e.documentId,!1),!0):e.sprintId?(Nn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=ma();e&&Y().some(t=>t.id===e)&&He(e)},issueNavigate:e=>Qi(e),epicNavigate:e=>vl(e)}),Pm({"my-issues":()=>{Ui(),Is(),Bt()},approvals:()=>{Mt()},issues:()=>{Wd(),Kd(),Ko().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const s=document.getElementById("label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),ks())}const n=e.getAll("exclude_label");if(n.length>0){const s=document.getElementById("exclude-label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),$s())}}),Qo().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}At()})},epics:()=>{Ma()},board:()=>{wl()},projects:()=>{ze().then(On)},sprints:()=>{Pn()},rituals:()=>{Zp()},documents:()=>{Mn()},team:()=>{il(),ig(),Ia()},settings:()=>{Ba(),ka()}});function Sf(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||R()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>R())}function Lf(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>Yr(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Tm());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Sm()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>Zr(a))})}function Cf(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Sr("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Sr("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Lr());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>tp());const i=document.getElementById("doc-sort");i&&i.addEventListener("change",()=>Et())}function Af(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>or())}function Bf(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Vd());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Dd());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Rd()),document.querySelectorAll(".multi-select-btn").forEach(b=>{const v=b.parentElement;v!=null&&v.querySelector("#status-filter-dropdown")?b.addEventListener("click",()=>Es("status-filter-dropdown")):v!=null&&v.querySelector("#priority-filter-dropdown")?b.addEventListener("click",()=>Es("priority-filter-dropdown")):v!=null&&v.querySelector("#label-filter-dropdown")?b.addEventListener("click",()=>Es("label-filter-dropdown")):v!=null&&v.querySelector("#exclude-label-filter-dropdown")&&b.addEventListener("click",()=>Es("exclude-label-filter-dropdown"))});const s=document.getElementById("status-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>_s())});const b=s.querySelector(".btn-small");b&&b.addEventListener("click",()=>Pi())}const i=document.getElementById("priority-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Ni())});const b=i.querySelector(".btn-small");b&&b.addEventListener("click",()=>qi())}const a=document.getElementById("label-filter-dropdown");if(a){const b=a.querySelector(".btn-small");b&&b.addEventListener("click",()=>xs())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const b=o.querySelector(".btn-small");b&&b.addEventListener("click",()=>Hi())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Ae());const c=document.getElementById("assignee-filter");c&&c.addEventListener("change",()=>Ae());const l=document.getElementById("sprint-filter");l&&l.addEventListener("change",()=>Ae());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>At());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>tr());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",b=>Tf(b))}function jf(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Qp(t.dataset.tab))})}function Mf(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>sl());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Cn()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),j(o.dataset.view)})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>eg());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>ti());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>If());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Cn())}X({"navigate-to":(e,t)=>{j(t.view)},"set-current-project":(e,t,n)=>{He(n.value)},showCreateIssueModal:()=>Cn(),showCreateEpicModal:()=>Ug(),showCreateProjectModal:()=>Vr(),showCreateDocumentModal:()=>Ar(),showCreateTeamModal:()=>ol(),showEditTeamModal:()=>cg(),showInviteModal:()=>al(),showCreateApiKeyModal:()=>Cg(),showCreateAgentModal:()=>Wm(),resetOnboarding:()=>ml(),logout:()=>gl(),navigateToProjects:()=>j("projects")}),document.addEventListener("DOMContentLoaded",async()=>{if(Ad(),Sg(),Mf(),Sf(),Af(),Bf(),jf(),Lf(),Cf(),Df(),Rf(),of({api:h}),Hm(),hf(),h.getToken())try{const e=await h.getMe();gs(e),await Vn()}catch{h.logout(),Ca()}else Ca()});function Df(){const e=document.getElementById("theme-toggle");if(!e)return;const t=ed()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),td(n?"light":"dark")})}function Rf(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");el(s)}}})}async function Pf(e){try{await Ge(e,!1)}catch{j("documents",!1)}}document.addEventListener("keydown",Vg({getCurrentView:A,getSelectedIndex:$d,setSelectedIndex:Do,viewIssue:z,showEditIssueModal:br,showInlineDropdown:Gi,isModalOpen:ms,isCommandPaletteOpen:ja})),document.addEventListener("keydown",Kg({getCurrentView:A,getSelectedIndex:Ed,setSelectedIndex:Ro,viewDocument:Ge,showEditDocumentModal:Br,isModalOpen:ms,isCommandPaletteOpen:ja})),document.addEventListener("keydown",zg({closeModal:R,closeSidebar:ti,navigateTo:j,showCreateIssueModal:Cn,showKeyboardShortcutsHelp:hl,isModalOpen:ms,focusSearch:()=>{j("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}})),Mg([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>j("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>j("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>j("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>j("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>j("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>j("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>j("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>j("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>j("approvals"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>j("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>j("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{j("issues"),setTimeout(Cn,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{j("projects"),setTimeout(Vr,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{j("documents"),setTimeout(Ar,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>ol(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{j("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{j("team"),setTimeout(al,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>hl(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>ml(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>gl(),category:"Account"}]),document.addEventListener("keydown",Wg({isModalOpen:ms,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:ja,openCommandPalette:Dg,closeCommandPalette:Zs})),window.marked=N,window.DOMPurify=Lo,console.log("Chaotic frontend loaded via Vite")})();
