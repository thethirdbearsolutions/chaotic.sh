var kh=Object.defineProperty;var $h=(st,be,St)=>be in st?kh(st,be,{enumerable:!0,configurable:!0,writable:!0,value:St}):st[be]=St;var z=(st,be,St)=>$h(st,typeof be!="symbol"?be+"":be,St);(function(){"use strict";var Ja;function st(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var be=st();function St(e){be=e}var yn={exec:()=>null};function F(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ye.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},mc=/^(?:[ \t]*(?:\n|$))+/,gc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,wn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,hc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ki=/(?:[*+-]|\d{1,9}[.)])/,ho=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,vo=F(ho).replace(/bull/g,ki).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),vc=F(ho).replace(/bull/g,ki).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$i=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,bc=/^[^\n]+/,Ei=/(?!\s*\])(?:\\.|[^\[\]\\])+/,yc=F(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ei).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),wc=F(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ki).getRegex(),rs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",xi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,kc=F("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",xi).replace("tag",rs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),bo=F($i).replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rs).getRegex(),$c=F(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",bo).getRegex(),_i={blockquote:$c,code:gc,def:yc,fences:fc,heading:hc,hr:wn,html:kc,lheading:vo,list:wc,newline:mc,paragraph:bo,table:yn,text:bc},yo=F("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rs).getRegex(),Ec={..._i,lheading:vc,table:yo,paragraph:F($i).replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",yo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rs).getRegex()},xc={..._i,html:F(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",xi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:yn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:F($i).replace("hr",wn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",vo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},_c=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ic=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,wo=/^( {2,}|\\)\n(?!\s*$)/,Tc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ls=/[\p{P}\p{S}]/u,Ii=/[\s\p{P}\p{S}]/u,ko=/[^\s\p{P}\p{S}]/u,Sc=F(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ii).getRegex(),$o=/(?!~)[\p{P}\p{S}]/u,Lc=/(?!~)[\s\p{P}\p{S}]/u,Cc=/(?:[^\s\p{P}\p{S}]|~)/u,Ac=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Eo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Bc=F(Eo,"u").replace(/punct/g,ls).getRegex(),jc=F(Eo,"u").replace(/punct/g,$o).getRegex(),xo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Mc=F(xo,"gu").replace(/notPunctSpace/g,ko).replace(/punctSpace/g,Ii).replace(/punct/g,ls).getRegex(),Dc=F(xo,"gu").replace(/notPunctSpace/g,Cc).replace(/punctSpace/g,Lc).replace(/punct/g,$o).getRegex(),Rc=F("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ko).replace(/punctSpace/g,Ii).replace(/punct/g,ls).getRegex(),Pc=F(/\\(punct)/,"gu").replace(/punct/g,ls).getRegex(),Nc=F(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),qc=F(xi).replace("(?:-->|$)","-->").getRegex(),Oc=F("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",qc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),cs=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Hc=F(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",cs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_o=F(/^!?\[(label)\]\[(ref)\]/).replace("label",cs).replace("ref",Ei).getRegex(),Io=F(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ei).getRegex(),Fc=F("reflink|nolink(?!\\()","g").replace("reflink",_o).replace("nolink",Io).getRegex(),Ti={_backpedal:yn,anyPunctuation:Pc,autolink:Nc,blockSkip:Ac,br:wo,code:Ic,del:yn,emStrongLDelim:Bc,emStrongRDelimAst:Mc,emStrongRDelimUnd:Rc,escape:_c,link:Hc,nolink:Io,punctuation:Sc,reflink:_o,reflinkSearch:Fc,tag:Oc,text:Tc,url:yn},Uc={...Ti,link:F(/^!?\[(label)\]\((.*?)\)/).replace("label",cs).getRegex(),reflink:F(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",cs).getRegex()},Si={...Ti,emStrongRDelimAst:Dc,emStrongLDelim:jc,url:F(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Gc={...Si,br:F(wo).replace("{2,}","*").getRegex(),text:F(Si.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ds={normal:_i,gfm:Ec,pedantic:xc},kn={normal:Ti,gfm:Si,breaks:Gc,pedantic:Uc},zc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},To=e=>zc[e];function Ke(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,To)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,To);return e}function So(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function Lo(e,t){var a;const n=e.replace(ye.findPipe,(o,r,c)=>{let d=!1,l=r;for(;--l>=0&&c[l]==="\\";)d=!d;return d?"|":" |"}),s=n.split(ye.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ye.slashPipe,"|");return s}function $n(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Wc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Co(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function Vc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var us=class{constructor(e){z(this,"options");z(this,"rules");z(this,"lexer");this.options=e||be}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:$n(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Vc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=$n(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:$n(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=$n(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const d=r.join(`
`),l=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${d}`:d,i=i?`${i}
${l}`:l;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,a,!0),this.lexer.state.top=p,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const v=m,b=v.raw+`
`+n.join(`
`),w=this.blockquote(b);a[a.length-1]=w,s=s.substring(0,s.length-v.raw.length)+w.raw,i=i.substring(0,i.length-v.text.length)+w.text;break}else if((m==null?void 0:m.type)==="list"){const v=m,b=v.raw+`
`+n.join(`
`),w=this.list(b);a[a.length-1]=w,s=s.substring(0,s.length-m.raw.length)+w.raw,i=i.substring(0,i.length-v.raw.length)+w.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,d="",l="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),m=e.split(`
`,1)[0],v=!p.trim(),b=0;if(this.options.pedantic?(b=2,l=p.trimStart()):v?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,l=p.slice(b),b+=t[1].length),v&&this.rules.other.blankLine.test(m)&&(d+=m+`
`,e=e.substring(m.length+1),c=!0),!c){const T=this.rules.other.nextBulletRegex(b),R=this.rules.other.hrRegex(b),C=this.rules.other.fencesBeginRegex(b),k=this.rules.other.headingBeginRegex(b),A=this.rules.other.htmlBeginRegex(b);for(;e;){const j=e.split(`
`,1)[0];let O;if(m=j,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),O=m):O=m.replace(this.rules.other.tabCharGlobal,"    "),C.test(m)||k.test(m)||A.test(m)||T.test(m)||R.test(m))break;if(O.search(this.rules.other.nonSpaceChar)>=b||!m.trim())l+=`
`+O.slice(b);else{if(v||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||C.test(p)||k.test(p)||R.test(p))break;l+=`
`+m}!v&&!m.trim()&&(v=!0),d+=j+`
`,e=e.substring(j.length+1),p=O.slice(b)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0));let w=null,_;this.options.gfm&&(w=this.rules.other.listIsTask.exec(l),w&&(_=w[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:d,task:!!w,checked:_,loose:!1,text:l,tokens:[]}),i.raw+=d}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const d=i.items[c].tokens.filter(p=>p.type==="space"),l=d.length>0&&d.some(p=>this.rules.other.anyLine.test(p.raw));i.loose=l}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Lo(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(Lo(r,a.header.length).map((c,d)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[d]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=$n(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Wc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Co(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Co(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,d=0;const l=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+a);(s=l.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){d+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+d);const p=[...s[0]][0].length,m=e.slice(0,a+s.index+p+r);if(Math.min(a,r)%2){const b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}const v=m.slice(2,-2);return{type:"strong",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},it=class go{constructor(t){z(this,"tokens");z(this,"options");z(this,"state");z(this,"tokenizer");z(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||be,this.options.tokenizer=this.options.tokenizer||new us,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ye,block:ds.normal,inline:kn.normal};this.options.pedantic?(n.block=ds.pedantic,n.inline=kn.pedantic):this.options.gfm&&(n.block=ds.gfm,this.options.breaks?n.inline=kn.breaks:n.inline=kn.gfm),this.tokenizer.rules=n}static get rules(){return{block:ds,inline:kn}}static lex(t,n){return new go(n).lex(t)}static lexInline(t,n){return new go(n).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(d=>(r=d.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const d=n.at(-1);r.raw.length===1&&d!==void 0?d.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let d=1/0;const l=t.slice(1);let p;this.options.extensions.startBlock.forEach(m=>{p=m.call({lexer:this},l),typeof p=="number"&&p>=0&&(d=Math.min(d,p))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const d=n.at(-1);s&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(t){const d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,d;let s=t,i=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(m=>(l=m.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);const m=n.at(-1);l.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=l.raw,m.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,s,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let p=t;if((d=this.options.extensions)!=null&&d.startInline){let m=1/0;const v=t.slice(1);let b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},v),typeof b=="number"&&b>=0&&(m=Math.min(m,b))}),m<1/0&&m>=0&&(p=t.substring(0,m+1))}if(l=this.tokenizer.inlineText(p)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=l.raw,m.text+=l.text):n.push(l);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},ps=class{constructor(e){z(this,"options");z(this,"parser");this.options=e||be}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ye.notSpaceStart))==null?void 0:a[0],i=e.replace(ye.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ke(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=So(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ke(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=So(e);if(i===null)return Ke(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ke(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ke(e.text)}},Li=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},at=class fo{constructor(t){z(this,"options");z(this,"renderer");z(this,"textRenderer");this.options=t||be,this.options.renderer=this.options.renderer||new ps,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Li}static parse(t,n){return new fo(n).parse(t)}static parseInline(t,n){return new fo(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const d=r,l=this.options.extensions.renderers[d.type].call({parser:this},d);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type)){s+=l||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let d=c,l=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],l+=`
`+this.renderer.text(d);n?s+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):s+=l;continue}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const d=this.options.extensions.renderers[r.type].call({parser:this},r);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=d||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return s}},ms=(Ja=class{constructor(e){z(this,"options");z(this,"block");this.options=e||be}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?it.lex:it.lexInline}provideParser(){return this.block?at.parse:at.parseInline}},z(Ja,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ja),Kc=class{constructor(...e){z(this,"defaults",st());z(this,"options",this.setOptions);z(this,"parse",this.parseMarkdown(!0));z(this,"parseInline",this.parseMarkdown(!1));z(this,"Parser",at);z(this,"Renderer",ps);z(this,"TextRenderer",Li);z(this,"Lexer",it);z(this,"Tokenizer",us);z(this,"Hooks",ms);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new ps(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new us(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new ms;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];ms.passThroughHooks.has(a)?i[o]=d=>{if(this.defaults.async)return Promise.resolve(r.call(i,d)).then(p=>c.call(i,p));const l=r.call(i,d);return c.call(i,l)}:i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return it.lex(e,t??this.defaults)}parser(e,t){return at.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?it.lex:it.lexInline,c=a.hooks?a.hooks.provideParser():e?at.parse:at.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(d=>r(d,a)).then(d=>a.hooks?a.hooks.processAllTokens(d):d).then(d=>a.walkTokens?Promise.all(this.walkTokens(d,a.walkTokens)).then(()=>d):d).then(d=>c(d,a)).then(d=>a.hooks?a.hooks.postprocess(d):d).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let d=r(n,a);a.hooks&&(d=a.hooks.processAllTokens(d)),a.walkTokens&&this.walkTokens(d,a.walkTokens);let l=c(d,a);return a.hooks&&(l=a.hooks.postprocess(l)),l}catch(d){return o(d)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Ke(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},Lt=new Kc;function N(e,t){return Lt.parse(e,t)}N.options=N.setOptions=function(e){return Lt.setOptions(e),N.defaults=Lt.defaults,St(N.defaults),N},N.getDefaults=st,N.defaults=be,N.use=function(...e){return Lt.use(...e),N.defaults=Lt.defaults,St(N.defaults),N},N.walkTokens=function(e,t){return Lt.walkTokens(e,t)},N.parseInline=Lt.parseInline,N.Parser=at,N.parser=at.parse,N.Renderer=ps,N.TextRenderer=Li,N.Lexer=it,N.lexer=it.lex,N.Tokenizer=us,N.Hooks=ms,N.parse=N,N.options,N.setOptions,N.use,N.walkTokens,N.parseInline,at.parse,it.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Ao,setPrototypeOf:Bo,isFrozen:Yc,getPrototypeOf:Zc,getOwnPropertyDescriptor:Xc}=Object;let{freeze:we,seal:Me,create:Ci}=Object,{apply:Ai,construct:Bi}=typeof Reflect<"u"&&Reflect;we||(we=function(t){return t}),Me||(Me=function(t){return t}),Ai||(Ai=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),Bi||(Bi=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const gs=$e(Array.prototype.forEach),Qc=$e(Array.prototype.lastIndexOf),jo=$e(Array.prototype.pop),En=$e(Array.prototype.push),Jc=$e(Array.prototype.splice),fs=$e(String.prototype.toLowerCase),ji=$e(String.prototype.toString),Mi=$e(String.prototype.match),xn=$e(String.prototype.replace),ed=$e(String.prototype.indexOf),td=$e(String.prototype.trim),qe=$e(Object.prototype.hasOwnProperty),ke=$e(RegExp.prototype.test),_n=nd(TypeError);function $e(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Ai(e,t,s)}}function nd(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Bi(e,n)}}function D(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:fs;Bo&&Bo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Yc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function sd(e){for(let t=0;t<e.length;t++)qe(e,t)||(e[t]=null);return e}function Ye(e){const t=Ci(null);for(const[n,s]of Ao(e))qe(e,n)&&(Array.isArray(s)?t[n]=sd(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Ye(s):t[n]=s);return t}function In(e,t){for(;e!==null;){const s=Xc(e,t);if(s){if(s.get)return $e(s.get);if(typeof s.value=="function")return $e(s.value)}e=Zc(e)}function n(){return null}return n}const Mo=we(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Di=we(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ri=we(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),id=we(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Pi=we(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ad=we(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Do=we(["#text"]),Ro=we(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ni=we(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Po=we(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),hs=we(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),od=Me(/\{\{[\w\W]*|[\w\W]*\}\}/gm),rd=Me(/<%[\w\W]*|[\w\W]*%>/gm),ld=Me(/\$\{[\w\W]*/gm),cd=Me(/^data-[\-\w.\u00B7-\uFFFF]+$/),dd=Me(/^aria-[\-\w]+$/),No=Me(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ud=Me(/^(?:\w+script|data):/i),pd=Me(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qo=Me(/^html$/i),md=Me(/^[a-z][.\w]*(-[.\w]+)+$/i);var Oo=Object.freeze({__proto__:null,ARIA_ATTR:dd,ATTR_WHITESPACE:pd,CUSTOM_ELEMENT:md,DATA_ATTR:cd,DOCTYPE_NAME:qo,ERB_EXPR:rd,IS_ALLOWED_URI:No,IS_SCRIPT_OR_DATA:ud,MUSTACHE_EXPR:od,TMPLIT_EXPR:ld});const Tn={element:1,text:3,progressingInstruction:7,comment:8,document:9},gd=function(){return typeof window>"u"?null:window},fd=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Ho=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:gd();const t=S=>Fo(S);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Tn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:d,NamedNodeMap:l=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:v}=e,b=c.prototype,w=In(b,"cloneNode"),_=In(b,"remove"),T=In(b,"nextSibling"),R=In(b,"childNodes"),C=In(b,"parentNode");if(typeof o=="function"){const S=n.createElement("template");S.content&&S.content.ownerDocument&&(n=S.content.ownerDocument)}let k,A="";const{implementation:j,createNodeIterator:O,createDocumentFragment:Q,getElementsByTagName:ce}=n,{importNode:ne}=s;let H=Ho();t.isSupported=typeof Ao=="function"&&typeof C=="function"&&j&&j.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:fe,ERB_EXPR:he,TMPLIT_EXPR:Re,DATA_ATTR:Pe,ARIA_ATTR:eo,IS_SCRIPT_OR_DATA:y,ATTR_WHITESPACE:Ne,CUSTOM_ELEMENT:Le}=Oo;let{IS_ALLOWED_URI:ht}=Oo,ae=null;const zl=D({},[...Mo,...Di,...Ri,...Pi,...Do]);let de=null;const Wl=D({},[...Ro,...Ni,...Po,...hs]);let ee=Object.seal(Ci(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),is=null,to=null;const pn=Object.seal(Ci(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Vl=!0,no=!0,Kl=!1,Yl=!0,mn=!1,gi=!0,qt=!1,so=!1,io=!1,gn=!1,fi=!1,hi=!1,Zl=!0,Xl=!1;const mh="user-content-";let ao=!0,as=!1,fn={},tt=null;const oo=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ql=null;const Jl=D({},["audio","video","img","source","image","track"]);let ro=null;const ec=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),vi="http://www.w3.org/1998/Math/MathML",bi="http://www.w3.org/2000/svg",vt="http://www.w3.org/1999/xhtml";let hn=vt,lo=!1,co=null;const gh=D({},[vi,bi,vt],ji);let yi=D({},["mi","mo","mn","ms","mtext"]),wi=D({},["annotation-xml"]);const fh=D({},["title","style","font","a","script"]);let os=null;const hh=["application/xhtml+xml","text/html"],vh="text/html";let ie=null,vn=null;const bh=n.createElement("form"),tc=function(f){return f instanceof RegExp||f instanceof Function},uo=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(vn&&vn===f)){if((!f||typeof f!="object")&&(f={}),f=Ye(f),os=hh.indexOf(f.PARSER_MEDIA_TYPE)===-1?vh:f.PARSER_MEDIA_TYPE,ie=os==="application/xhtml+xml"?ji:fs,ae=qe(f,"ALLOWED_TAGS")?D({},f.ALLOWED_TAGS,ie):zl,de=qe(f,"ALLOWED_ATTR")?D({},f.ALLOWED_ATTR,ie):Wl,co=qe(f,"ALLOWED_NAMESPACES")?D({},f.ALLOWED_NAMESPACES,ji):gh,ro=qe(f,"ADD_URI_SAFE_ATTR")?D(Ye(ec),f.ADD_URI_SAFE_ATTR,ie):ec,Ql=qe(f,"ADD_DATA_URI_TAGS")?D(Ye(Jl),f.ADD_DATA_URI_TAGS,ie):Jl,tt=qe(f,"FORBID_CONTENTS")?D({},f.FORBID_CONTENTS,ie):oo,is=qe(f,"FORBID_TAGS")?D({},f.FORBID_TAGS,ie):Ye({}),to=qe(f,"FORBID_ATTR")?D({},f.FORBID_ATTR,ie):Ye({}),fn=qe(f,"USE_PROFILES")?f.USE_PROFILES:!1,Vl=f.ALLOW_ARIA_ATTR!==!1,no=f.ALLOW_DATA_ATTR!==!1,Kl=f.ALLOW_UNKNOWN_PROTOCOLS||!1,Yl=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,mn=f.SAFE_FOR_TEMPLATES||!1,gi=f.SAFE_FOR_XML!==!1,qt=f.WHOLE_DOCUMENT||!1,gn=f.RETURN_DOM||!1,fi=f.RETURN_DOM_FRAGMENT||!1,hi=f.RETURN_TRUSTED_TYPE||!1,io=f.FORCE_BODY||!1,Zl=f.SANITIZE_DOM!==!1,Xl=f.SANITIZE_NAMED_PROPS||!1,ao=f.KEEP_CONTENT!==!1,as=f.IN_PLACE||!1,ht=f.ALLOWED_URI_REGEXP||No,hn=f.NAMESPACE||vt,yi=f.MATHML_TEXT_INTEGRATION_POINTS||yi,wi=f.HTML_INTEGRATION_POINTS||wi,ee=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&tc(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ee.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&tc(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ee.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ee.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),mn&&(no=!1),fi&&(gn=!0),fn&&(ae=D({},Do),de=[],fn.html===!0&&(D(ae,Mo),D(de,Ro)),fn.svg===!0&&(D(ae,Di),D(de,Ni),D(de,hs)),fn.svgFilters===!0&&(D(ae,Ri),D(de,Ni),D(de,hs)),fn.mathMl===!0&&(D(ae,Pi),D(de,Po),D(de,hs))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?pn.tagCheck=f.ADD_TAGS:(ae===zl&&(ae=Ye(ae)),D(ae,f.ADD_TAGS,ie))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?pn.attributeCheck=f.ADD_ATTR:(de===Wl&&(de=Ye(de)),D(de,f.ADD_ATTR,ie))),f.ADD_URI_SAFE_ATTR&&D(ro,f.ADD_URI_SAFE_ATTR,ie),f.FORBID_CONTENTS&&(tt===oo&&(tt=Ye(tt)),D(tt,f.FORBID_CONTENTS,ie)),f.ADD_FORBID_CONTENTS&&(tt===oo&&(tt=Ye(tt)),D(tt,f.ADD_FORBID_CONTENTS,ie)),ao&&(ae["#text"]=!0),qt&&D(ae,["html","head","body"]),ae.table&&(D(ae,["tbody"]),delete is.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw _n('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw _n('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');k=f.TRUSTED_TYPES_POLICY,A=k.createHTML("")}else k===void 0&&(k=fd(v,i)),k!==null&&typeof A=="string"&&(A=k.createHTML(""));we&&we(f),vn=f}},nc=D({},[...Di,...Ri,...id]),sc=D({},[...Pi,...ad]),yh=function(f){let $=C(f);(!$||!$.tagName)&&($={namespaceURI:hn,tagName:"template"});const I=fs(f.tagName),K=fs($.tagName);return co[f.namespaceURI]?f.namespaceURI===bi?$.namespaceURI===vt?I==="svg":$.namespaceURI===vi?I==="svg"&&(K==="annotation-xml"||yi[K]):!!nc[I]:f.namespaceURI===vi?$.namespaceURI===vt?I==="math":$.namespaceURI===bi?I==="math"&&wi[K]:!!sc[I]:f.namespaceURI===vt?$.namespaceURI===bi&&!wi[K]||$.namespaceURI===vi&&!yi[K]?!1:!sc[I]&&(fh[I]||!nc[I]):!!(os==="application/xhtml+xml"&&co[f.namespaceURI]):!1},nt=function(f){En(t.removed,{element:f});try{C(f).removeChild(f)}catch{_(f)}},Ot=function(f,$){try{En(t.removed,{attribute:$.getAttributeNode(f),from:$})}catch{En(t.removed,{attribute:null,from:$})}if($.removeAttribute(f),f==="is")if(gn||fi)try{nt($)}catch{}else try{$.setAttribute(f,"")}catch{}},ic=function(f){let $=null,I=null;if(io)f="<remove></remove>"+f;else{const se=Mi(f,/^[\r\n\t ]+/);I=se&&se[0]}os==="application/xhtml+xml"&&hn===vt&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");const K=k?k.createHTML(f):f;if(hn===vt)try{$=new m().parseFromString(K,os)}catch{}if(!$||!$.documentElement){$=j.createDocument(hn,"template",null);try{$.documentElement.innerHTML=lo?A:K}catch{}}const ve=$.body||$.documentElement;return f&&I&&ve.insertBefore(n.createTextNode(I),ve.childNodes[0]||null),hn===vt?ce.call($,qt?"html":"body")[0]:qt?$.documentElement:ve},ac=function(f){return O.call(f.ownerDocument||f,f,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},po=function(f){return f instanceof p&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof l)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},oc=function(f){return typeof r=="function"&&f instanceof r};function bt(S,f,$){gs(S,I=>{I.call(t,f,$,vn)})}const rc=function(f){let $=null;if(bt(H.beforeSanitizeElements,f,null),po(f))return nt(f),!0;const I=ie(f.nodeName);if(bt(H.uponSanitizeElement,f,{tagName:I,allowedTags:ae}),gi&&f.hasChildNodes()&&!oc(f.firstElementChild)&&ke(/<[/\w!]/g,f.innerHTML)&&ke(/<[/\w!]/g,f.textContent)||f.nodeType===Tn.progressingInstruction||gi&&f.nodeType===Tn.comment&&ke(/<[/\w]/g,f.data))return nt(f),!0;if(!(pn.tagCheck instanceof Function&&pn.tagCheck(I))&&(!ae[I]||is[I])){if(!is[I]&&cc(I)&&(ee.tagNameCheck instanceof RegExp&&ke(ee.tagNameCheck,I)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(I)))return!1;if(ao&&!tt[I]){const K=C(f)||f.parentNode,ve=R(f)||f.childNodes;if(ve&&K){const se=ve.length;for(let Ce=se-1;Ce>=0;--Ce){const yt=w(ve[Ce],!0);yt.__removalCount=(f.__removalCount||0)+1,K.insertBefore(yt,T(f))}}}return nt(f),!0}return f instanceof c&&!yh(f)||(I==="noscript"||I==="noembed"||I==="noframes")&&ke(/<\/no(script|embed|frames)/i,f.innerHTML)?(nt(f),!0):(mn&&f.nodeType===Tn.text&&($=f.textContent,gs([fe,he,Re],K=>{$=xn($,K," ")}),f.textContent!==$&&(En(t.removed,{element:f.cloneNode()}),f.textContent=$)),bt(H.afterSanitizeElements,f,null),!1)},lc=function(f,$,I){if(Zl&&($==="id"||$==="name")&&(I in n||I in bh))return!1;if(!(no&&!to[$]&&ke(Pe,$))){if(!(Vl&&ke(eo,$))){if(!(pn.attributeCheck instanceof Function&&pn.attributeCheck($,f))){if(!de[$]||to[$]){if(!(cc(f)&&(ee.tagNameCheck instanceof RegExp&&ke(ee.tagNameCheck,f)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(f))&&(ee.attributeNameCheck instanceof RegExp&&ke(ee.attributeNameCheck,$)||ee.attributeNameCheck instanceof Function&&ee.attributeNameCheck($,f))||$==="is"&&ee.allowCustomizedBuiltInElements&&(ee.tagNameCheck instanceof RegExp&&ke(ee.tagNameCheck,I)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(I))))return!1}else if(!ro[$]){if(!ke(ht,xn(I,Ne,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&f!=="script"&&ed(I,"data:")===0&&Ql[f])){if(!(Kl&&!ke(y,xn(I,Ne,"")))){if(I)return!1}}}}}}}return!0},cc=function(f){return f!=="annotation-xml"&&Mi(f,Le)},dc=function(f){bt(H.beforeSanitizeAttributes,f,null);const{attributes:$}=f;if(!$||po(f))return;const I={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0};let K=$.length;for(;K--;){const ve=$[K],{name:se,namespaceURI:Ce,value:yt}=ve,bn=ie(se),mo=yt;let ue=se==="value"?mo:td(mo);if(I.attrName=bn,I.attrValue=ue,I.keepAttr=!0,I.forceKeepAttr=void 0,bt(H.uponSanitizeAttribute,f,I),ue=I.attrValue,Xl&&(bn==="id"||bn==="name")&&(Ot(se,f),ue=mh+ue),gi&&ke(/((--!?|])>)|<\/(style|title|textarea)/i,ue)){Ot(se,f);continue}if(bn==="attributename"&&Mi(ue,"href")){Ot(se,f);continue}if(I.forceKeepAttr)continue;if(!I.keepAttr){Ot(se,f);continue}if(!Yl&&ke(/\/>/i,ue)){Ot(se,f);continue}mn&&gs([fe,he,Re],pc=>{ue=xn(ue,pc," ")});const uc=ie(f.nodeName);if(!lc(uc,bn,ue)){Ot(se,f);continue}if(k&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!Ce)switch(v.getAttributeType(uc,bn)){case"TrustedHTML":{ue=k.createHTML(ue);break}case"TrustedScriptURL":{ue=k.createScriptURL(ue);break}}if(ue!==mo)try{Ce?f.setAttributeNS(Ce,se,ue):f.setAttribute(se,ue),po(f)?nt(f):jo(t.removed)}catch{Ot(se,f)}}bt(H.afterSanitizeAttributes,f,null)},wh=function S(f){let $=null;const I=ac(f);for(bt(H.beforeSanitizeShadowDOM,f,null);$=I.nextNode();)bt(H.uponSanitizeShadowNode,$,null),rc($),dc($),$.content instanceof a&&S($.content);bt(H.afterSanitizeShadowDOM,f,null)};return t.sanitize=function(S){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,I=null,K=null,ve=null;if(lo=!S,lo&&(S="<!-->"),typeof S!="string"&&!oc(S))if(typeof S.toString=="function"){if(S=S.toString(),typeof S!="string")throw _n("dirty is not a string, aborting")}else throw _n("toString is not a function");if(!t.isSupported)return S;if(so||uo(f),t.removed=[],typeof S=="string"&&(as=!1),as){if(S.nodeName){const yt=ie(S.nodeName);if(!ae[yt]||is[yt])throw _n("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof r)$=ic("<!---->"),I=$.ownerDocument.importNode(S,!0),I.nodeType===Tn.element&&I.nodeName==="BODY"||I.nodeName==="HTML"?$=I:$.appendChild(I);else{if(!gn&&!mn&&!qt&&S.indexOf("<")===-1)return k&&hi?k.createHTML(S):S;if($=ic(S),!$)return gn?null:hi?A:""}$&&io&&nt($.firstChild);const se=ac(as?S:$);for(;K=se.nextNode();)rc(K),dc(K),K.content instanceof a&&wh(K.content);if(as)return S;if(gn){if(fi)for(ve=Q.call($.ownerDocument);$.firstChild;)ve.appendChild($.firstChild);else ve=$;return(de.shadowroot||de.shadowrootmode)&&(ve=ne.call(s,ve,!0)),ve}let Ce=qt?$.outerHTML:$.innerHTML;return qt&&ae["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&ke(qo,$.ownerDocument.doctype.name)&&(Ce="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Ce),mn&&gs([fe,he,Re],yt=>{Ce=xn(Ce,yt," ")}),k&&hi?k.createHTML(Ce):Ce},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};uo(S),so=!0},t.clearConfig=function(){vn=null,so=!1},t.isValidAttribute=function(S,f,$){vn||uo({});const I=ie(S),K=ie(f);return lc(I,K,$)},t.addHook=function(S,f){typeof f=="function"&&En(H[S],f)},t.removeHook=function(S,f){if(f!==void 0){const $=Qc(H[S],f);return $===-1?void 0:Jc(H[S],$,1)[0]}return jo(H[S])},t.removeHooks=function(S){H[S]=[]},t.removeAllHooks=function(){H=Ho()},t}var Uo=Fo();const qi="chaotic_";function Oe(e){try{return localStorage.getItem(qi+e)}catch{return null}}function He(e,t){try{localStorage.setItem(qi+e,t)}catch{}}function ot(e){try{localStorage.removeItem(qi+e)}catch{}}function hd(){return Oe("token")}function vd(e){e?He("token",e):ot("token")}function bd(){return Oe("theme")}function yd(e){He("theme",e)}function Go(){return Oe("last_project")}function wd(e){He("last_project",e)}function kd(){return Oe("onboarding_complete")==="true"}function $d(){He("onboarding_complete","true")}function Ed(){ot("onboarding_complete")}function xd(e){return e?Oe(`issues_filters_${e}`):null}function _d(e,t){e&&(t?He(`issues_filters_${e}`,t):ot(`issues_filters_${e}`))}function Id(e){return Oe(`comment_draft_${e}`)}function vs(e,t){t?He(`comment_draft_${e}`,t):ot(`comment_draft_${e}`)}function Td(e){return Oe(`description_draft_${e}`)}function bs(e,t){t?He(`description_draft_${e}`,t):ot(`description_draft_${e}`)}function Sd(){return{title:Oe("create_issue_title"),description:Oe("create_issue_description")}}function zo(e,t){e?He("create_issue_title",e):ot("create_issue_title"),t?He("create_issue_description",t):ot("create_issue_description")}function Ld(){ot("create_issue_title"),ot("create_issue_description")}function Cd(){return Oe("doc_view_mode")}function Ad(e){He("doc_view_mode",e)}function Bd(){return Oe("approvals_explainer_dismissed")==="1"}function jd(){He("approvals_explainer_dismissed","1")}const Md="/api";class Dd{constructor(){this.token=hd()}setToken(t){this.token=t,vd(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Md}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const d=new Error(c);throw d.status=o.status,d.detail=r.detail,d}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20,{projectId:i}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const h=new Dd;let Ht=null;const Rd='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Ft=null;function q(){Ft=document.activeElement,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function P(){var e;wt(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Ft&&document.contains(Ft)&&typeof Ft.focus=="function"&&Ft.focus(),Ft=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,s=n.querySelectorAll(Rd);if(s.length===0)return;const i=s[0],a=s[s.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),i.focus();return}e.shiftKey&&document.activeElement===i?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),i.focus())});function Sn(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function E(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function Pd(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function x(e,t){const n=Pd(t);E(`Failed to ${e}: ${n}`,"error")}function wt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Ht&&(document.removeEventListener("keydown",Ht),Ht=null)}function Ln(e){Ht&&document.removeEventListener("keydown",Ht),Ht=e,e&&document.addEventListener("keydown",e)}function Cn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(wt(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}function Ee(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ae(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Oi(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function W(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,s]=e;return`#${t}${t}${n}${n}${s}${s}`}return e}function g(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function u(e){return g(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ze(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function rt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function Nd(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Ut(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?Nd(s)?`<img class="${t} avatar-img" src="${u(s)}" alt="${u(n)}">`:`<div class="${t} avatar-emoji">${g(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let te={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Hi=new Set;function pe(e,t){if(typeof e=="string"){const n=te[e];te[e]=t,Wo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=te[s];te[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Wo(s,i,a)})}}function lt(e){return Hi.add(e),()=>Hi.delete(e)}function Wo(e,t,n){t!==n&&Hi.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const An=()=>te.currentUser,ys=e=>pe("currentUser",e),B=()=>te.currentView,qd=e=>pe("currentView",e),Be=()=>te.issues,Xe=e=>pe("issues",e),Vo=()=>te.detailNavContext,ws=e=>pe("detailNavContext",e),Ko=()=>te.labels,ks=e=>pe("labels",e),Yo=()=>te.activeFilterCategory,Od=e=>pe("activeFilterCategory",e),Zo=()=>te.selectedIssueIndex,Bn=e=>pe("selectedIssueIndex",e),Hd=()=>te.selectedDocIndex,Xo=e=>pe("selectedDocIndex",e),Qo=()=>te.selectedBoardIndex,$s=e=>pe("selectedBoardIndex",e),Fd=()=>te.pendingGates,Ud=e=>pe("pendingGates",e),Gd=()=>te.searchDebounceTimer,zd=e=>pe("searchDebounceTimer",e),Wd=()=>te.websocket,Jo=e=>pe("websocket",e),L=()=>te.currentTeam,Fi=e=>pe("currentTeam",e),U=()=>te.currentProject,Fe=e=>pe("currentProject",e||null),oe=()=>te.currentDetailIssue,Es=e=>pe("currentDetailIssue",e),Vd=()=>te.currentDetailSprints,er=e=>pe("currentDetailSprints",e),Ui={};function J(e){Object.assign(Ui,e)}function Kd(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const s=t.dataset.action,i=Ui[s];if(!i){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${s}"`);return}i(e,t.dataset,t)}let tr=!1;function Yd(){if(!tr){tr=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Kd);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Ui[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Gi=["backlog","todo","in_progress","in_review","done","canceled"],Gt=["backlog","todo","in_progress","in_review"],nr=["urgent","high","medium","low","no_priority"],zi=["no_priority","urgent","high","medium","low"],sr=["backlog","todo","in_progress","in_review","done"];function Z({icon:e,heading:t,description:n,cta:s}){const i=s?`
        <button class="btn btn-primary empty-state-cta" data-action="${u(s.action)}"${s.data?Object.entries(s.data).map(([a,o])=>` data-${u(a)}="${u(o)}"`).join(""):""}>${g(s.label)}</button>
    `:"";return`
        <div class="empty-state">
            <div class="empty-state-icon">${e}</div>
            <h3>${g(t)}</h3>
            <p>${g(n)}</p>
            ${i}
        </div>
    `}const Y={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'};let jn=[];function Zd(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Xd(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function xs(e,t){const n=e().map(Zd),s=t().map(Xd);jn=[...n,...s]}function Mn(e){return e&&jn.find(t=>t.id===e)||null}function Ct(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Wi(e,t=!1){const n=g(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${g(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function _s(){const e=jn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));jn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=jn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function Is(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;_s().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Wi(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function zt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Vt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Kt(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function ir(){const e=document.getElementById("group-by-select");return e?e.value:""}const ar=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Ts=["done","canceled"];function or(e){var t,n,s;switch(e){case"project":return U()?1:0;case"status":return zt().length;case"priority":return Wt().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(s=document.getElementById("sprint-filter"))!=null&&s.value?1:0;case"labels":return Vt().length;case"exclude_labels":return Kt().length;default:return 0}}function Vi(){let e=0;return ar.forEach(t=>{e+=or(t.key)}),e}function rr(){var v,b,w,_,T,R;const e=new URLSearchParams,t=zt(),n=Wt(),s=Vt(),i=Kt(),a=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,o=U()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,c=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,d=(_=document.getElementById("group-by-select"))==null?void 0:_.value,l=(T=document.getElementById("sort-by-select"))==null?void 0:T.value;t.forEach(C=>e.append("status",C)),n.forEach(C=>e.append("priority",C)),s.forEach(C=>e.append("label",C)),i.forEach(C=>e.append("exclude_label",C)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),c&&e.set("issue_type",c),d&&e.set("groupBy",d),l&&l!=="created-desc"&&e.set("sort",l);const p=e.toString(),m=p?`/issues?${p}`:"/issues";history.replaceState({view:"issues"},"",m),_d((R=L())==null?void 0:R.id,p)}function Qd(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=xd((b=L())==null?void 0:b.id);if(w){t=new URLSearchParams(w);const _=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",_)}}const i=t.getAll("status");if(i.length>0){const w=document.getElementById("status-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=i.includes(T.value)}),lr())}const a=t.getAll("priority");if(a.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=a.includes(T.value)}),cr())}const o=t.get("assignee");if(o){const w=document.getElementById("assignee-filter");w&&(w.value=o)}const r=t.get("project");r&&(e(!0),Fe(r),e(!1));const c=t.get("sprint");if(c){const w=document.getElementById("sprint-filter");w&&(w.value=c)}const d=t.get("issue_type");if(d){const w=document.getElementById("issue-type-filter");w&&(w.value=d)}const l=t.getAll("label");if(l.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=l.includes(T.value)}),Ss())}const p=t.getAll("exclude_label");if(p.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=p.includes(T.value)}),Ls())}const m=t.get("groupBy");if(m){const w=document.getElementById("group-by-select");w&&(w.value=m)}const v=t.get("sort");if(v){const w=document.getElementById("sort-by-select");w&&(w.value=v)}}function lr(){const e=zt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Ee(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function cr(){const e=Wt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ae(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Ss(){var s,i;const e=Vt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Ls(){var s,i;const e=Kt(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function dr(){if(!L())return;let e;try{e=await h.getLabels(L().id)}catch(t){console.error("Failed to load labels for filter:",t);return}ur("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),ur("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function ur(e,t,n,s){const i=document.getElementById(e);if(!i)return;const a=i.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const c=document.createElement("label");c.className="multi-select-option",c.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${W(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${g(r.name)}</span>
                </span>
            `,a.appendChild(c)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${s}">Clear</button>`,a.appendChild(o)}function Cs(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",pr)},0))}function pr(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",pr))}function Jd(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Yt)):(e.classList.remove("hidden"),e.classList.remove("show-options"),me(),xe(Yo()),setTimeout(()=>{document.addEventListener("click",Yt)},0))}function eu(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Yt)):(e.classList.remove("hidden"),du(),setTimeout(()=>{document.addEventListener("click",Yt)},0))}function Yt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),s=e.composedPath(),i=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=i&&s.includes(i),r=a&&s.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Yt))}function At(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Yt)}function me(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=U();e.innerHTML=ar.map(n=>{const s=or(n.key),i=Yo()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${i?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${u(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${s>0?`<span class="filter-menu-category-count">${s}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function xe(e){Od(e),me();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":nu(t);break;case"status":su(t);break;case"priority":iu(t);break;case"type":au(t);break;case"assignee":ou(t);break;case"sprint":ru(t);break;case"labels":lu(t);break;case"exclude_labels":cu(t);break}const n=t.querySelector(".filter-options-header");if(n){const s=document.createElement("button");s.type="button",s.className="filter-options-back",s.dataset.action="filter-menu-back",s.setAttribute("aria-label","Back to filter categories"),s.textContent="←",n.prepend(s)}}function tu(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),me()}function nu(e){const t=U()||"",n=X()||[];let s=`
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
                <span class="filter-option-label">${g(i.name)}</span>
            </label>
        `}),e.innerHTML=s}function su(e){const t=zt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=Gt.every(o=>t.includes(o))&&!Ts.some(o=>t.includes(o))&&t.length===Gt.length,i=Ts.every(o=>t.includes(o))&&!Gt.some(o=>t.includes(o))&&t.length===Ts.length;let a=`
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
        `}),e.innerHTML=a}function iu(e){const t=Wt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function au(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${u(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function ou(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Nt()||[];let i=`
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
                <span class="filter-option-label">${g(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function ru(e){if(!U()){e.innerHTML=`
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
                <span class="filter-option-label">${g(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function lu(e){const t=Vt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",l=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${W(l)};"></span>
                    <span class="filter-option-label">${g(d)}</span>
                </label>
            `}),e.innerHTML=i}function cu(e){const t=Kt(),n=document.getElementById("exclude-label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",l=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${W(l)};"></span>
                    <span class="filter-option-label">${g(d)}</span>
                </label>
            `}),e.innerHTML=i}function du(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function _e(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=U();if(n){const m=(X()||[]).find(v=>v.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const s=zt();if(s.length>0){const p=s.map(m=>Ee(m)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Wt();if(i.length>0){const p=i.map(m=>Ae(m)).join(", ");t.push({category:"priority",label:"Priority",value:p,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const p=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:p?p.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let p;if(o.value==="me")p="Me";else if(o.value==="unassigned")p="Unassigned";else{const v=(Nt()||[]).find(b=>b.user_id===o.value);p=(v==null?void 0:v.name)||(v==null?void 0:v.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:p,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const p=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(p==null?void 0:p.text)||r.value,clearAction:"clear-sprint-filter"})}const c=Vt();if(c.length>0){const p=document.getElementById("label-filter-dropdown"),m=c.map(v=>{var _;const b=p==null?void 0:p.querySelector(`input[value="${v}"]`),w=(_=b==null?void 0:b.closest("label"))==null?void 0:_.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const d=Kt();if(d.length>0){const p=document.getElementById("exclude-label-filter-dropdown"),m=d.map(v=>{var _;const b=p==null?void 0:p.querySelector(`input[value="${v}"]`),w=(_=b==null?void 0:b.closest("label"))==null?void 0:_.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(p=>`
        <span class="filter-chip" title="${u(p.label)}: ${u(p.value)}">
            <span class="filter-chip-label">${p.label}:</span>
            <span class="filter-chip-value">${g(p.value)}</span>
            <button class="filter-chip-remove" data-action="${p.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=l}function Ie(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Vi();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function mr(){const e=document.getElementById("sprint-filter");if(!e)return;const t=U(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Ki(null);return}let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const i=await h.getSprints(t),a=i.find(o=>o.status==="active");a&&(s+=`<option value="current">Current Sprint (${g(a.name)})</option>`),Qr(t,a==null?void 0:a.id),Ki(a||null),i.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";s+=`<option value="${o.id}">${g(o.name)}${r}</option>`})}catch(i){console.error("Failed to load sprints:",i)}e.innerHTML=s,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Ki(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${g(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${g(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function gr(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let fr=!1;lt(e=>{if(e!=="currentProject"||B()!=="issues"||fr)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([mr(),dr()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1});const s=document.getElementById("exclude-label-filter-dropdown");s==null||s.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1}),Ss(),Ls(),je(),_e(),Ie()}).catch(n=>{console.error("Failed to update filters on project switch:",n),je(),_e(),Ie()})});function uu(){Qd(e=>{fr=e})}function As(){lr(),je(),_e(),Ie()}function Yi(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),As()}function Zi(){cr(),je(),_e(),Ie()}function Xi(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Zi()}function Qi(){Ss(),je(),_e(),Ie()}function Bs(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Qi()}function Ji(){Ls(),je(),_e(),Ie()}function js(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ji()}function pu(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function hr(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(s=>{var i,a,o;return(o=(a=(i=n==null?void 0:n.querySelector(`input[value="${pu(s)}"]`))==null?void 0:i.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Ms=0;async function Bt(){var m,v,b,w,_,T,R;Bn(-1);const e=++Ms;if(!L())return;const t=U()||"",n=zt(),s=Wt(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(b=(v=document.getElementById("issue-search"))==null?void 0:v.value)==null?void 0:b.trim();if(!t&&X().length===0){document.getElementById("issues-list").innerHTML=Z({icon:Y.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}gr();const o={limit:1e3},r=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[c,d]=r.includes("-")?r.split("-"):[r,null];o.sort_by=c,d&&(o.order=d),n.length>0&&(o.status=n),s.length>0&&(o.priority=s),i&&(i==="me"?o.assignee_id=(_=An())==null?void 0:_.id:o.assignee_id=i);const l=(T=document.getElementById("sprint-filter"))==null?void 0:T.value;if(l)if(l==="current"){if(t){const C=ym(t);if(C!==void 0)C&&(o.sprint_id=C);else try{const A=(await h.getSprints(t)).find(j=>j.status==="active");Qr(t,A==null?void 0:A.id),A&&(o.sprint_id=A.id)}catch(k){console.error("Failed to resolve current sprint:",k)}}}else o.sprint_id=l;const p=(R=document.getElementById("issue-type-filter"))==null?void 0:R.value;p&&(o.issue_type=p),a&&a.length>=1&&(o.search=a);try{const C=hr(Vt(),"label-filter-dropdown");C.length>0&&(o.label=C,o.label_match="any");const k=hr(Kt(),"exclude-label-filter-dropdown");k.length>0&&(o.exclude_label=k);let A;if(t?(o.project_id=t,A=await h.getIssues(o)):X().length>0&&(A=await h.getTeamIssues(L().id,o)),e!==Ms)return;Xe(A),ws(A);const j=[...new Set(A.map(O=>O.project_id))];if(await Xr(j),e!==Ms)return;ct()}catch(C){if(e!==Ms)return;x("load issues",C)}}function mu(){clearTimeout(Gd()),zd(setTimeout(()=>{Bt()},300))}function je(){rr(),Bt()}async function vr(){if(rr(),ir()==="sprint"){const e=Be(),t=[...new Set(e.map(n=>n.project_id))];await Xr(t)}ct()}function gu(){_e(),Ie()}function br(e){Fe(e),me(),xe("project"),At()}function fu(){br("")}function hu(e){const t=e==="open"?Gt:Ts,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),As(),me(),xe("status")}function vu(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,As()),me(),xe("status")}function bu(){Yi(),me(),xe("status"),_e(),Ie()}function yu(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Zi()),me(),xe("priority")}function wu(){Xi(),me(),xe("priority"),_e(),Ie()}function yr(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,je()),me(),xe("type"),_e(),Ie(),At()}function ku(){yr("")}function wr(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,je()),me(),xe("assignee"),_e(),Ie(),At()}function $u(){wr("")}function kr(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,je()),me(),xe("sprint"),_e(),Ie(),At()}function Eu(){kr("")}function xu(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Qi()),me(),xe("labels")}function _u(){Bs(),me(),xe("labels"),_e(),Ie()}function Iu(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Ji()),me(),xe("exclude_labels")}function Tu(){js(),me(),xe("exclude_labels"),_e(),Ie()}function Su(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Bt()),At()}function Lu(e){const t=document.getElementById("group-by-select");t&&(t.value=e,vr()),At()}function Cu(){Fe(null),Yi(),Xi();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const s=document.getElementById("issue-search");s&&(s.value=""),Bs(),js(),je(),_e(),Ie()}J({"update-label-filter":()=>Qi(),"clear-label-filter":()=>Bs(),"update-exclude-label-filter":()=>Ji(),"clear-exclude-label-filter":()=>js(),"show-filter-category":(e,t)=>{var n,s;xe(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(s=document.querySelector("#filter-menu-options .filter-options-back"))==null||s.focus()},"filter-menu-back":()=>{tu();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>br(t.value),"clear-project-filter":()=>fu(),"clear-status-filter-new":()=>bu(),"set-status-preset":(e,t)=>hu(t.value),"toggle-status-option":(e,t)=>vu(t.filterValue,e),"clear-priority-filter-new":()=>wu(),"toggle-priority-option":(e,t)=>yu(t.filterValue,e),"set-type-filter":(e,t)=>yr(t.value),"clear-type-filter":()=>ku(),"set-assignee-filter":(e,t)=>wr(t.value),"clear-assignee-filter":()=>$u(),"set-sprint-filter":(e,t)=>kr(t.value),"clear-sprint-filter":()=>Eu(),"clear-label-filter-new":()=>_u(),"toggle-label-option":(e,t)=>xu(t.filterValue,e),"clear-exclude-label-filter-new":()=>Tu(),"toggle-exclude-label-option":(e,t)=>Iu(t.filterValue,e),"set-sort":(e,t)=>Su(t.value),"set-group-by":(e,t)=>Lu(t.value),"clear-all-filters":()=>Cu()});let Zt=[],ea=[];lt(e=>{e==="currentProject"&&B()==="my-issues"&&(Ds(),ta(),jt())});function kt(){return Zt}function Xt(e){Zt=e}async function Ds(){var i;const e=L(),t=An();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=U();Bu();try{const a={assignee_id:t.id,status:n||void 0,limit:1e3};let o;s?o=await h.getIssues({...a,project_id:s}):o=await h.getTeamIssues(e.id,a),Zt=o,ws(Zt),Dn()}catch(a){x("load issues",a)}}async function jt({showLoading:e=!0}={}){const t=L();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const s=U();ea=await h.getTeamActivities(t.id,0,10,{projectId:s}),Au()}catch{n&&(n.innerHTML=Z({icon:Y.activity,heading:"Failed to load activity",description:"Check your connection and try again"}))}}function Au(){const e=document.getElementById("dashboard-activity-list");if(e){if(!ea.length){e.innerHTML=Z({icon:Y.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=ea.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${u(t.issue_identifier)}"><strong>${g(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${u(t.document_id)}"><strong>${s} ${g(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${g(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${ca(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${ua(t)}${n}</span>
                <span class="activity-actor">by ${g(da(t))}</span>
                <span class="activity-time">${Ze(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Bu(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function $r(){Ds()}function Dn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),Zt.length===0){e.innerHTML=Z({icon:Y.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=Zt.map(t=>Ue(t)).join("")}}async function ta(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=U(),n=X(),s=t?n.filter(i=>i.id===t):n;if(!s.length){e.innerHTML="";return}try{const i=s.map(async o=>{try{const r=await h.getCurrentSprint(o.id);if(!r)return null;let c={};try{const d=await h.getIssues({sprint_id:r.id,project_id:o.id,limit:500});for(const l of d)c[l.status]=(c[l.status]||0)+1}catch{}return{project:o,sprint:r,statusCounts:c}}catch{return null}}),a=(await Promise.all(i)).filter(Boolean);ju(a)}catch{e.innerHTML=""}}function ju(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:s,sprint:i,statusCounts:a})=>{const o=i.budget||0,r=i.points_spent||0,c=o>0?Math.min(100,Math.round(r/o*100)):0,d=o>0&&r>o,l=i.limbo?"limbo":d?"arrears":"",p=a||{},m=Object.values(p).reduce((v,b)=>v+b,0);return`
                    <div class="sprint-status-card ${l}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${g(s.name)}</span>
                            ${i.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${d?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${g(i.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${l}" style="width: ${c}%"></div>
                                </div>
                                <span class="sprint-status-points">${r}/${o} pts</span>
                            </div>
                        `:`
                            <div class="sprint-status-progress">
                                <span class="sprint-status-points">${r} pts (no budget)</span>
                            </div>
                        `}
                        ${m>0?`
                            <div class="sprint-issue-breakdown">
                                <div class="sprint-stacked-bar">
                                    ${n.filter(v=>p[v]).map(v=>{const b=Math.round(p[v]/m*100);return`<div class="sprint-stacked-segment status-${v}" style="width: ${b}%" title="${Ee(v)}: ${p[v]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(v=>p[v]).map(v=>`<span class="sprint-count-label status-${v}">${p[v]} ${Ee(v)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}J({"filter-my-issues":()=>$r(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),yl(t.identifier)}});const Er=Gi,Mu=["task","bug","feature","chore","docs","tech_debt","epic"];let Qe=[],xr=Promise.resolve();function _r(){return Qe}function Ir(e){Qe=e}async function na(e,t,n,s){var p,m;e.preventDefault(),wt();const a=(s||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Er.map((v,b)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="status" data-value="${v}">
                    ${Te(v)}
                    <span>${Ee(v)}</span>
                    <span class="dropdown-shortcut">${b+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${zi.map((v,b)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="priority" data-value="${v}">
                    ${Je(v)}
                    <span>${Ae(v)}</span>
                    <span class="dropdown-shortcut">${b}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Mu.map(v=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="issue_type" data-value="${v}">
                    <span class="issue-type-badge type-${v}">${rt(v)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const v=_s();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${v.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:v.map(({assignee:b,indent:w},_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="${u(b.id)}">
                    ${Ut(b,"avatar-small")}
                    <span>${Wi(b,w)}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const v=document.querySelector(`.issue-row[data-issue-id="${n}"]`),b=(v==null?void 0:v.dataset.projectId)||((p=oe())==null?void 0:p.project_id),w=an(b);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${w.map((_,T)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="estimate" data-value="${_.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${_.label}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const v=Be(),b=kt(),w=oe(),_=v.find(ne=>ne.id===n)||b.find(ne=>ne.id===n)||w,T=new Set(((_==null?void 0:_.labels)||[]).map(ne=>ne.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const R=o.getBoundingClientRect();let C=a.bottom+4,k=a.left;k+R.width>window.innerWidth-8&&(k=a.right-R.width),C+R.height>window.innerHeight-8&&(C=a.top-R.height-4),o.style.top=`${C}px`,o.style.left=`${Math.max(8,k)}px`,Cn(o,{multiSelect:!0});let A=[];const j=L();if(j)try{A=await h.getLabels(j.id)}catch(ne){console.error("Failed to load labels:",ne)}if(!o.parentNode)return;Sr(o,n,A,T);const O=o.getBoundingClientRect();let Q=a.bottom+4,ce=a.left;ce+O.width>window.innerWidth-8&&(ce=a.right-O.width),Q+O.height>window.innerHeight-8&&(Q=a.top-O.height-4),o.style.top=`${Q}px`,o.style.left=`${Math.max(8,ce)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const v=Be(),b=kt(),w=oe(),_=v.find(H=>H.id===n)||b.find(H=>H.id===n)||w,T=(_==null?void 0:_.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const R=o.getBoundingClientRect();let C=a.bottom+4,k=a.left;k+R.width>window.innerWidth-8&&(k=a.right-R.width),C+R.height>window.innerHeight-8&&(C=a.top-R.height-4),o.style.top=`${C}px`,o.style.left=`${Math.max(8,k)}px`,Cn(o);let A=[];if(T)try{A=await h.getSprints(T),bm(T,A)}catch(H){console.error("Failed to load sprints:",H)}if(!o.parentNode)return;const j=A.filter(H=>H.status!=="completed"||H.id===(_==null?void 0:_.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${j.map((H,fe)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="${u(H.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${g(H.name)}${H.status==="active"?" (Active)":""}</span>
                    ${fe<9?`<span class="dropdown-shortcut">${fe+1}</span>`:""}
                </button>
            `).join("")}
        `;const O=o.getBoundingClientRect();let Q=a.bottom+4,ce=a.left;ce+O.width>window.innerWidth-8&&(ce=a.right-O.width),Q+O.height>window.innerHeight-8&&(Q=a.top-O.height-4),o.style.top=`${Q}px`,o.style.left=`${Math.max(8,ce)}px`,o.classList.remove("dropdown-positioning");const ne=H=>{const fe=H.key;if(fe==="Escape"||fe==="Tab"){wt(),document.removeEventListener("keydown",ne),Ln(null);return}const he=parseInt(fe);if(isNaN(he))return;const Re=o.querySelectorAll(".dropdown-option");let Pe=!1;he===0?(Qt(n,"sprint_id",null),Pe=!0):he>=1&&he<Re.length&&(Re[he].click(),Pe=!0),Pe&&(document.removeEventListener("keydown",ne),Ln(null))};Ln(ne),document.addEventListener("keydown",ne);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let c=a.bottom+4,d=a.left;d+r.width>window.innerWidth-8&&(d=a.right-r.width),c+r.height>window.innerHeight-8&&(c=a.top-r.height-4),o.style.top=`${c}px`,o.style.left=`${Math.max(8,d)}px`,o.classList.remove("dropdown-positioning");const l=v=>{const b=v.key;if(b==="Escape"||b==="Tab"){wt(),document.removeEventListener("keydown",l);return}const w=parseInt(b);if(isNaN(w))return;let _=!1;if(t==="status"&&w>=1&&w<=6)Qt(n,"status",Er[w-1]),_=!0;else if(t==="priority"&&w>=0&&w<=4)Qt(n,"priority",zi[w]),_=!0;else if(t==="estimate"){const T=oe(),R=an(T==null?void 0:T.project_id);w>=0&&w<R.length&&(Qt(n,"estimate",R[w].value),_=!0)}_&&(document.removeEventListener("keydown",l),Ln(null))};Ln(l),document.addEventListener("keydown",l),Cn(o)}function Du(e,t,n,s){na(e,t,n,s)}function Ru(e,t,n){xr=xr.then(()=>Tr(e,t,n))}async function Tr(e,t,n){const s=Be(),i=kt(),a=oe(),o=s.find(l=>l.id===e)||i.find(l=>l.id===e)||a;if(!o)return;const r=(o.labels||[]).map(l=>l.id),c=r.indexOf(t);let d;if(c>=0?d=r.filter(l=>l!==t):d=[...r,t],n){const l=c<0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}try{const p=(await h.updateIssue(e,{label_ids:d})).labels||[],m=s.findIndex(_=>_.id===e);m!==-1&&(s[m].labels=p,Xe([...s]));const v=i.findIndex(_=>_.id===e);v!==-1&&(i[v].labels=p,Xt([...i])),(a==null?void 0:a.id)===e&&Es({...a,labels:p});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const _=s.find(T=>T.id===e)||i.find(T=>T.id===e);_&&(b.outerHTML=Ue(_))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=p.length>0?p.map(_=>`
                    <span class="issue-label" style="background: ${W(_.color)}20; color: ${W(_.color)}">${g(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(l){if(x("update labels",l),n){const p=c>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function Sr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${u(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${u(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${u(t)}" data-label-id="${u(i.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${W(i.color)}20; color: ${W(i.color)}">${g(i.name)}</span>
                </button>
            `}).join("")}
    `}async function Lr(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=L();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await h.createLabel(s.id,{name:i}),o=await h.getLabels(s.id);ks(o),a!=null&&a.id&&await Tr(e,a.id,null);const r=Be(),c=kt(),d=oe(),l=r.find(m=>m.id===e)||c.find(m=>m.id===e)||d,p=new Set(((l==null?void 0:l.labels)||[]).map(m=>m.id));t&&Sr(t,e,o,p),n.value=""}catch(a){x("create label",a)}finally{n.disabled=!1,n.focus()}}}function Rs(){const e=document.getElementById("create-issue-labels-label");e&&(Qe.length===0?e.textContent="Labels":e.textContent=`Labels (${Qe.length})`)}function sa(e){const t=Ko();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Qe.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${u(n.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${W(n.color)}20; color: ${W(n.color)}">${g(n.name)}</span>
                </button>
            `}).join("")}
    `}function Pu(e){const t=Qe.indexOf(e);t>=0?Qe.splice(t,1):Qe.push(e),Rs();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&sa(n)}async function Cr(){const e=L();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await h.createLabel(e.id,{name:s}),a=await h.getLabels(e.id);ks(a),i!=null&&i.id&&!Qe.includes(i.id)&&Qe.push(i.id),Rs(),t&&sa(t),n.value=""}catch(i){x("create label",i)}finally{n.disabled=!1,n.focus()}}}async function Qt(e,t,n){wt();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const i={};i[t]=n;const a=await h.updateIssue(e,i);if(!a||!a.id)throw new Error("Invalid response from server");const o=Be(),r=o.findIndex(p=>p.id===e);r!==-1&&(o[r]=a,Xe([...o]));const c=kt(),d=c.findIndex(p=>p.id===e);d!==-1&&(c[d]=a,Xt([...c]));const l=oe();if((l==null?void 0:l.id)===e&&Es(a),s&&s.parentNode){const p=o.find(m=>m.id===e)||c.find(m=>m.id===e)||a;if(p){s.outerHTML=Ue(p);const m=document.querySelector(`.issue-row[data-issue-id="${e}"]`);m&&(m.classList.add("updated"),setTimeout(()=>m.classList.remove("updated"),500))}}if(E("Issue updated","success"),t==="status"){const p=U();if(p)try{const v=(await h.getSprints(p)).find(b=>b.status==="active");Ki(v||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&Nu(t,a)}}catch(i){x("update issue",i),s&&s.classList.remove("updating")}}function Nu(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Te(t.status)}
            <span>${Ee(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${Je(t.priority)}
            <span>${Ae(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${rt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?Mn(t.assignee_id):null,d=c?Ct(c):null;r.innerHTML=d?`${Ut(c,"avatar-small")}<span>${g(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=Vd(),d=t.sprint_id&&c?c.find(l=>l.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?g(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${ti(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}J({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,s=t.field;s==="estimate"?Qt(t.issueId,s,n==="null"?null:Number(n)):Qt(t.issueId,s,n)},"toggle-issue-label":(e,t,n)=>{Ru(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Lr(t.issueId)},"toggle-create-issue-label":(e,t)=>{Pu(t.labelId)},"create-label-for-create-issue":()=>{Cr()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Lr(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Cr())}});const Ar=["task","bug","feature","chore","docs","tech_debt","epic"];function $t(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Jt(e){const t=$t(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function ct(){var i,a,o;const e=document.getElementById("issues-list");if(!e)return;const t=(i=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:i.dataset.issueId;e.classList.add("issue-list-linear");const n=Be();if(n.length===0){const r=(o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim(),c=Vi()>0,d=r&&r.length>=2;if(c||d){const l=Vi(),p=[];d&&p.push(`search "${r}"`),c&&p.push(`${l} active filter${l>1?"s":""}`),e.innerHTML=Z({icon:Y.issues,heading:"No matching issues",description:`No issues match your ${p.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=Z({icon:Y.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Bn(-1);return}const s=ir();s==="status"?Ou(e,n):s==="priority"?Hu(e,n):s==="type"?Fu(e,n):s==="assignee"?Uu(e,n):s==="sprint"?Gu(e,n):e.innerHTML=Jt(n)+n.map(r=>Ue(r)).join(""),qu(t)}function qu(e){const t=Zo();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){Bn(-1);return}let s=e?Array.prototype.findIndex.call(n,i=>i.dataset.issueId===e):-1;s<0&&(s=Math.min(t,n.length-1)),Bn(s),n[s].classList.add("keyboard-selected")}function Ou(e,t){const n={};Gi.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Jt(t);Gi.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Te(i)}</span>
                    <span class="group-title">${Ee(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${$t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Hu(e,t){const n={};nr.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Jt(t);nr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Je(i)}</span>
                    <span class="group-title">${Ae(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${$t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Fu(e,t){const n={};Ar.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Jt(t);Ar.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${rt(i)}</span></span>
                    <span class="group-title">${rt(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${$t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Uu(e,t){const n={},s="__unassigned__";n[s]=[];const i=_s();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Jt(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${$t(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Ue(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=Ct(o)||"Unknown",d=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${u(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${u(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ut(o,"avatar-small")}</span>
                    <span class="group-title">${g(c)}${g(d)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${$t(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(l=>Ue(l)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Gu(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=Yr();i.sort((c,d)=>{const l=o[c],p=o[d],m=l?a[l.status]??3:3,v=p?a[p.status]??3:3;return m-v});let r=Jt(t);i.forEach(c=>{const d=s[c];if(d.length===0)return;const l=o[c],p=l?l.name:c,m=l?l.status==="active"?" (Active)":l.status==="completed"?" (Done)":"":"",v=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${v}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${v}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${g(p)}${m}</span>
                    <span class="group-count">${d.length}</span>
                    <span class="group-points">${$t(d)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${d.map(b=>Ue(b)).join("")}
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
                    <span class="group-points">${$t(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(c=>Ue(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function zu(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Br(e,t){if(!e)return"";if(!t)return g(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return g(e);const s=e.slice(0,n),i=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${g(s)}<mark class="search-match">${g(i)}</mark>${g(a)}`}function Wu(e,t,n=40){if(!e||!t)return null;const s=e.toLowerCase().indexOf(t.toLowerCase());if(s===-1)return null;const i=Math.max(0,s-n),a=Math.min(e.length,s+t.length+n),o=e.slice(i,a),r=Br(o,t);return`${i>0?"…":""}${r}${a<e.length?"…":""}`}function Ue(e){var p,m,v;const t=e.assignee_id?Mn(e.assignee_id):null,n=t?Ct(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?ti(e.estimate,e.project_id):"",a=xa(e.estimate,e.project_id),o=e.sprint_id?Yr()[e.sprint_id]:null,r=o?o.name:null,c=(m=(p=document.getElementById("issue-search"))==null?void 0:p.value)==null?void 0:m.trim(),d=!!c&&((v=e.title)==null?void 0:v.toLowerCase().includes(c.toLowerCase())),l=c&&!d?Wu(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${u(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${u(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${u(e.id)}" title="Priority: ${Ae(e.priority)}">
                    ${Je(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${u(e.id)}" title="Status: ${Ee(e.status)}">
                    ${Te(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${rt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.id)}">${Br(e.title,c)}${l?` <span class="issue-search-snippet" title="Matched in description">— ${l}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(b=>`
                            <span class="issue-label" style="background: ${W(b.color)}20; color: ${W(b.color)}">${g(b.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${u(e.id)}" title="Sprint: ${r?g(r):"None"}">
                    ${r?`<span class="sprint-badge">${g(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${u(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${i||"None"}`}">
                    ${i?`<span class="estimate-badge${a?" out-of-scale":""}">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${u(e.id)}" title="${u(n||"Unassigned")}">
                    ${n?Ut(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Je(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Te(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}J({"toggle-group":(e,t)=>{zu(t.group)},"show-inline-dropdown":(e,t,n)=>{na(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),G(t.issueId))}});function Vu(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Ku(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";let n=-1;const s=()=>{t.classList.add("hidden"),t.innerHTML="",n=-1},i=r=>{var d,l;const c=t.querySelectorAll(".mention-suggestion");c.length!==0&&(n=(r%c.length+c.length)%c.length,c.forEach((p,m)=>p.classList.toggle("highlighted",m===n)),(l=(d=c[n]).scrollIntoView)==null||l.call(d,{block:"nearest"}))},a=r=>{const c=e.selectionStart||0,d=e.value.slice(0,c).replace(/@([a-zA-Z0-9._-]*)$/,`@${r} `),l=e.value.slice(c);e.value=d+l,e.focus(),s()},o=()=>{const r=e.selectionStart||0,d=e.value.slice(0,r).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!d){s();return}const l=d[2].toLowerCase(),p=Nt().map(m=>({id:m.id,name:m.name||m.email||"User",email:m.email||"",handle:Vu(m)})).filter(m=>!l||m.handle.includes(l)||m.name.toLowerCase().includes(l)||m.email.toLowerCase().includes(l)).slice(0,6);if(!p.length){s();return}t.innerHTML=p.map(m=>`
            <button type="button" class="mention-suggestion" data-handle="${u(m.handle)}">
                <span class="mention-name">${g(m.name)}</span>
                <span class="mention-handle">@${g(m.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach((m,v)=>{m.addEventListener("click",()=>a(m.dataset.handle)),m.addEventListener("mouseenter",()=>i(v))}),i(0)};e.addEventListener("input",o),e.addEventListener("click",o),e.addEventListener("keydown",r=>{const c=!t.classList.contains("hidden");if(r.key==="Escape"&&c){r.preventDefault(),r.stopPropagation(),s();return}if(c){if(r.key==="ArrowDown")r.preventDefault(),i(n+1);else if(r.key==="ArrowUp")r.preventDefault(),i(n-1);else if(r.key==="Enter"||r.key==="Tab"){const l=t.querySelectorAll(".mention-suggestion")[n];l&&(r.preventDefault(),a(l.dataset.handle))}}}),e.addEventListener("blur",()=>{setTimeout(s,150)})}const jr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Rn(e=null){const t=e||U()||"";Ir([]);const n=X().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${g(o.name)}</option>
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
                            ${jr.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${Te("backlog")}
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
    `,q(),Rs();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=Sd();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{zo(s.value,i.value)}),i.addEventListener("input",()=>{zo(s.value,i.value)}),s.focus()}function Yu(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Zu(e){const t=jr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function Xu(e,t){const n=X().find(s=>s.id===t);Ir([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?g(n.name):"Project"}</span>
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
                            ${Te("backlog")}
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
    `,q(),Rs(),document.getElementById("create-issue-title").focus()}async function Qu(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,d=c?parseInt(c):null;if(!n){E("Please enter a title","error");return}try{const l=await h.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:d,label_ids:_r(),parent_id:e});P(),E(`Created sub-issue ${l.identifier}`,"success"),G(e)}catch(l){x("create sub-issue",l)}}async function Ju(e,t,n){var o,r;wt();const i=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${i.top-8}px`,a.style.left=`${i.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const c=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${sr.map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="status" data-value="${d}" data-label="${u(Ee(d))}">
                    ${Te(d)}
                    <span>${Ee(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const c=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${zi.map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${d}" data-label="${u(Ae(d))}">
                    ${Je(d)}
                    <span>${Ae(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const c=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="type" data-value="${d}" data-label="${u(rt(d))}">
                    <span class="issue-type-badge type-${d}">${rt(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!L())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let c=Ko();if(c.length===0)try{c=await h.getLabels(L().id),ks(c)}catch(d){console.error("Failed to load labels:",d)}sa(a),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Cn(a,{multiSelect:!0});return}else if(e==="assignee"){const c=document.getElementById("create-issue-assignee").value,d=_s();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${d.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:d.map(({assignee:l,indent:p})=>{const m=Ct(l)||"User";return`
                <button class="dropdown-option ${l.id===c?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${u(l.id)}" data-label="${u(m)}">
                    ${Ut(l,"avatar-small")}
                    <span>${Wi(l,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const c=document.getElementById("create-issue-estimate").value,d=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,l=an(d);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(p=>{const m=p.value===null?"":String(p.value);return`
                <button class="dropdown-option ${m===c?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${u(m)}" data-label="${u(p.value?p.label:"Estimate")}">
                    <span>${g(p.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const c=document.getElementById("create-issue-sprint").value,d=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!d)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const p=(await h.getSprints(d)).filter(m=>m.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${p.map(m=>`
                        <button class="dropdown-option ${m.id===c?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${u(m.id)}" data-label="${u(m.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${g(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Cn(a)}function ep(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function tp(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=g(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${Te(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${Je(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${rt(t)}</span><span id="create-issue-type-label">${s}</span>`)}wt()}async function Mr({keepOpen:e=!1}={}){var w,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,d=c?parseInt(c):null,l=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,p=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,m=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){E("Please select a project","error");return}if(!n){E("Please enter a title","error");return}const v=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");v&&(v.disabled=!0),b&&(b.disabled=!0);try{const T=await h.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:d,sprint_id:l,label_ids:_r(),due_date:m});E(`Created ${T.identifier}`,"success"),Ld(),B()==="issues"?Bt():B()==="my-issues"&&Ds(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(P(),G(T.id))}catch(T){x("create issue",T)}finally{v&&(v.disabled=!1),b&&(b.disabled=!1)}}async function np(){await Mr({keepOpen:!1})}async function sp(){await Mr({keepOpen:!0})}J({"toggle-create-dropdown":(e,t,n)=>{Ju(t.dropdownType,e,n)},"set-create-field":(e,t)=>{tp(t.field,t.value,t.label)},"create-issue-submit":()=>{np()},"create-issue-and-new":()=>{sp()},"update-create-project":()=>{ep()},"apply-template":e=>{Zu(e.target.value)},"toggle-create-options":()=>{Yu()},"create-sub-issue-submit":(e,t)=>{Qu(t.parentId,t.projectId)}});async function Dr(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),i=an(t.project_id).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${g(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${u(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${u(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${g(t.description||"")}</textarea>
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
                            <option value="${a.id}" ${t.sprint_id===a.id?"selected":""}>${g(a.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,q()}catch(t){x("load issue",t)}}async function ip(e,t){try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const d={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await h.updateIssue(t,d),P(),await G(t),E("Issue updated!","success")}catch(n){x("update issue",n)}}async function ap(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Bt(),await ze(),M("issues"),E("Issue deleted!","success")}catch(t){x("delete issue",t)}}J({"update-issue":(e,t)=>{ip(e,t.issueId)}});let re=null,Rr=!1,en=!1;function op(){return re||(re=document.createElement("div"),re.className="quote-tooltip",re.setAttribute("role","button"),re.setAttribute("tabindex","0"),re.setAttribute("aria-label","Quote selection in comment"),re.textContent="Quote",re.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),aa())}),re.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),re.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),aa()}),document.body.appendChild(re),re)}function Pr(e,t){const n=op();n.style.display="flex",en=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!en)return;const s=n.getBoundingClientRect();s.left<4&&(n.style.left=`${4+s.width/2}px`),s.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-s.width/2}px`),s.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Pn(){re&&(re.style.display="none"),en=!1}function Nr(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content"))||null}function ia(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Nr(t.startContainer),s=Nr(t.endContainer);return!n||!s||n!==s?null:e.toString().trim()||null}function rp(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function aa(){const e=ia();if(!e)return!1;const t=document.getElementById("new-comment");if(!t)return!1;const n=rp(e),s=t.value,i=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";t.value=s+i+n+`

`;const a=oe();return a&&vs(a.id,t.value),t.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Pn(),t.focus(),t.setSelectionRange(t.value.length,t.value.length),t.scrollIntoView&&t.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function lp(){var s;if(!ia())return!1;const t=window.getSelection().getRangeAt(0),n=((s=t.getBoundingClientRect)==null?void 0:s.call(t))??{left:0,width:0,top:0};return Pr(n.left+n.width/2,n.top),!0}function cp(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!ia()){Pn();return}Pr(t,n)},10)}function dp({signal:e}={}){const t=document.getElementById("issue-detail-content");t&&(t.addEventListener("mouseup",cp,e?{signal:e}:void 0),Rr||(Rr=!0,document.addEventListener("mousedown",n=>{en&&re&&!re.contains(n.target)&&Pn()}),document.addEventListener("selectionchange",()=>{en&&setTimeout(()=>{const n=window.getSelection();(!n||n.isCollapsed)&&Pn()},50)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&en&&Pn()}),document.addEventListener("keyup",n=>{n.key!=="Escape"&&lp()})))}let oa=!1,Et=!0,Nn=null,ra=null,la=null,Ps=null;function ca(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function da(e){return e.user_name||e.user_email||"Unknown"}function ua(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?g(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${g(Ee(t(e.old_value)))}</strong> to <strong>${g(Ee(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${g(Ae(t(e.old_value)))}</strong> to <strong>${g(Ae(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${g(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${g(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=g(e.field_name||"ritual"),i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||g(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||g(e.field_name)}`:"Updated issue"}}function qr(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function up(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const d=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let l;for(;(l=d.exec(t))!==null;)if(c=!0,l.index>r&&o.appendChild(document.createTextNode(t.slice(r,l.index))),l[1]){const p=l[1],m=document.createElement("a");m.href=`#/issue/${p}`,m.className="issue-link",m.textContent=p,o.appendChild(m),r=l.index+l[0].length}else if(l[3]){l[2]&&o.appendChild(document.createTextNode(l[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+l[3],o.appendChild(p),r=l.index+l[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function pp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function mp(e){if(!e)return"";const t=De(e),n=document.createElement("div");return n.innerHTML=t,qr(n,up),n.innerHTML}function Ns(e){if(!e)return"";const t=De(e),n=document.createElement("div");return n.innerHTML=t,qr(n,pp),n.innerHTML}function gp(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function fp(){Et=!Et;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",Et),n&&n.classList.toggle("rotated",Et)}async function qs(e){try{Nn=await h.getTicketRitualsStatus(e),Or(e)}catch(t){console.error("Failed to load ticket rituals:",t),Nn=null}}function Or(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Nn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=Nn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(l=>l.approval_mode==="gate")&&(Et=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",Et);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",Et);const r=n.some(l=>l.trigger==="ticket_close"),c=n.some(l=>l.trigger==="ticket_claim");let d="⚠️ Complete these rituals:";r&&c?d="⚠️ Pending rituals (claim before starting, close before completing):":c?d="⚠️ Complete these rituals before claiming this ticket:":r&&(d="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${d}</p>
                ${n.map(l=>`
                    <div class="ticket-ritual-item pending${l.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${l.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${g(l.name)}</span>
                            <span class="badge badge-trigger-${l.trigger||"ticket_close"}">${l.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${l.approval_mode||"auto"}">${l.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${l.prompt?De(l.prompt):""}</div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${g(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ze(l.attestation.attested_at)}</span>
                                ${l.attestation.note?`<div class="attestation-note markdown-body">${De(l.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Im(l,e)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `:""}
        ${s.length>0?`
            <div class="ticket-rituals-completed">
                ${s.map(l=>`
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${g(l.name)}</span>
                        </div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${g(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ze(l.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Os(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await G(t.id,!1),!0):(M("my-issues",!1),!1)}catch{return M("my-issues",!1),!1}}async function G(e,t=!0){try{t&&Rt(),Et=!0;const[n,s,i,a,o,r]=await Promise.all([h.getIssue(e),h.getComments(e),h.getActivities(e),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),d=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name,is_pending:!y.attestation.approved_at}));Nn=r;const l=[...s,...d].sort((y,Ne)=>new Date(y.created_at)-new Date(Ne.created_at)),p=[n.parent_id?h.getIssue(n.parent_id):Promise.resolve(null),h.getSprints(n.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[m,v]=await Promise.all(p),b=o.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),w=o.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),_=o.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:B()},"",`/issue/${n.identifier}`),Es(n),er(v),document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const T=document.getElementById("issue-detail-view");T.classList.remove("hidden");const R=B()||"my-issues",C=X().find(y=>y.id===n.project_id),k=n.assignee_id?Mn(n.assignee_id):null,A=k?Ct(k):null,j=n.sprint_id?v.find(y=>y.id===n.sprint_id):null,O=Vo(),Q=O.findIndex(y=>y.id===n.id),ce=Q>0?O[Q-1]:null,ne=Q>=0&&Q<O.length-1?O[Q+1]:null,H=Q>=0;T.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(R)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${H?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${ce?`data-action="navigate-issue" data-issue-id="${u(ce.id)}" data-identifier="${u(ce.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${Q+1} / ${O.length}</span>
                            <button class="issue-nav-btn" ${ne?`data-action="navigate-issue" data-issue-id="${u(ne.id)}" data-identifier="${u(ne.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${C?g(C.name):"Project"} › ${g(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${g(n.title)}</h1>

                    ${m?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(m.identifier)}" data-action="navigate-issue" data-issue-id="${u(m.id)}" data-identifier="${u(m.identifier)}">${m.identifier}: ${g(m.title)}</a>
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
                            ${n.description?Ns(n.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${a.length===0?Z({icon:Y.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):a.map(y=>`
                                <a href="/issue/${encodeURIComponent(y.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${u(y.id)}" data-identifier="${u(y.identifier)}">
                                    <span class="sub-issue-status">${Te(y.status)}</span>
                                    <span class="sub-issue-id">${y.identifier}</span>
                                    <span class="sub-issue-title">${g(y.title)}</span>
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
                            ${b.length===0&&w.length===0&&_.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${w.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${w.map(y=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Te(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${g(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${b.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${b.map(y=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Te(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${g(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${_.map(y=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${Te(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${g(y.related_issue_title)}</span>
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
                            <h3>Comments${l.length>0?` <span class="section-count">(${l.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${l.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:l.map(y=>`
                                <div class="comment ${y.is_attestation?"comment-attestation":""} ${y.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${y.is_attestation?"avatar-attestation":""}">${y.is_attestation?y.is_pending?"⏳":"✓":(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${g(y.author_name||"User")}</span>
                                            ${y.is_attestation?`<span class="comment-ritual-badge">${y.is_pending?"Pending approval — ":""}Ritual: ${g(y.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ze(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${mp(y.content)}</div>
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
                            ${i.length===0?Z({icon:Y.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):i.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ca(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ua(y)}</span>
                                        <span class="activity-actor">by ${g(da(y))}</span>
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
                                ${Te(n.status)}
                                <span>${Ee(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${u(n.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${Je(n.priority)}
                                <span>${Ae(n.priority)}</span>
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
                                ${A?`${Ut(k,"avatar-small")}<span>${g(A)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${u(n.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${j?g(j.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${u(n.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(y=>`
                                        <span class="issue-label" style="background: ${W(y.color)}20; color: ${W(y.color)}">${g(y.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${C?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${g(C.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${u(n.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${xa(n.estimate,n.project_id)?" out-of-scale":""}" ${xa(n.estimate,n.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${ti(n.estimate,n.project_id)}</span>
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
                            <span class="property-value-static">${g(n.creator_name||"Unknown")}</span>
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
        `,Ps&&Ps.abort(),Ps=new AbortController;const{signal:fe}=Ps,he=document.querySelector(".sidebar-overflow-trigger"),Re=document.querySelector(".overflow-menu-dropdown");if(he&&Re){const y=()=>{Re.classList.add("hidden"),he.setAttribute("aria-expanded","false")},Ne=()=>{const Le=Re.classList.toggle("hidden");he.setAttribute("aria-expanded",String(!Le))};he.addEventListener("click",Ne,{signal:fe}),document.addEventListener("click",Le=>{!he.contains(Le.target)&&!Re.contains(Le.target)&&y()},{signal:fe}),Re.addEventListener("keydown",Le=>{Le.key==="Escape"&&(y(),he.focus())},{signal:fe})}Or(n.id),Ku(),dp({signal:fe});const Pe=document.getElementById("new-comment");if(Pe){const y=Id(n.id);y&&(Pe.value=y),Pe.addEventListener("input",()=>{vs(n.id,Pe.value)}),Pe.addEventListener("keydown",Ne=>{var Le;Ne.key==="Enter"&&(Ne.metaKey||Ne.ctrlKey)&&(Ne.preventDefault(),(Le=Pe.closest("form"))==null||Le.requestSubmit())})}ra=ce?ce.id:null,la=ne?ne.id:null;const eo=y=>{if((y.metaKey||y.ctrlKey)&&y.shiftKey&&(y.key===">"||y.key==="."||y.code==="Period")&&aa()){y.preventDefault();return}if(y.metaKey||y.ctrlKey||y.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||y.target.tagName==="INPUT"||y.target.tagName==="TEXTAREA"||y.target.tagName==="SELECT"||y.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;if(y.key==="ArrowLeft"&&ra)y.preventDefault(),G(ra);else if(y.key==="ArrowRight"&&la)y.preventDefault(),G(la);else if(y.key==="c"){y.preventDefault(),y.stopImmediatePropagation();const ht=document.getElementById("new-comment");ht&&(ht.focus(),ht.scrollIntoView({behavior:"smooth",block:"nearest"}))}else y.key==="j"?(y.preventDefault(),y.stopImmediatePropagation(),Hs(1)):y.key==="k"&&(y.preventDefault(),y.stopImmediatePropagation(),Hs(-1));const Le={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[y.key];if(Le){const ht=document.querySelector(`.property-row[data-field="${Le}"]`);ht&&(y.preventDefault(),ht.click())}};document.addEventListener("keydown",eo,{signal:fe})}catch(n){x("load issue",n)}}async function hp(e,t){if(e.preventDefault(),oa)return!1;const n=document.getElementById("new-comment").value;vs(t,null),oa=!0;try{await h.createComment(t,n),await G(t),E("Comment added!","success")}catch(s){vs(t,n),x("add comment",s)}finally{oa=!1}return!1}async function vp(e){const t=oe()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${g(t.description||"")}</textarea>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=Td(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?bs(e,r):bs(e,null);const c=document.getElementById("edit-description-preview");c&&c.style.display!=="none"&&Hr()}),a.addEventListener("keydown",r=>{var c,d;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(c=document.getElementById("save-description-edit"))==null||c.click()),r.key==="Escape"&&(r.preventDefault(),(d=document.getElementById("cancel-description-edit"))==null||d.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{bs(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||(i.setAttribute("data-action","edit-description"),i.setAttribute("data-issue-id",t.id)),i.innerHTML=t.description?Ns(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var c;const r=(c=document.getElementById("edit-description"))==null?void 0:c.value;if(r!==void 0)try{await h.updateIssue(e,{description:r}),bs(e,null),E("Description updated","success"),G(e,!1)}catch(d){x("update description",d)}})}function Hr(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Ns(n):'<span class="text-muted">Nothing to preview.</span>'}function bp(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?Hr():s.focus()}function yp(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,q(),document.getElementById("relation-issue-search").focus()}async function wp(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=L())==null?void 0:s.id,o=(await h.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${u(r.id)}" data-identifier="${u(r.identifier)}" data-title="${u(r.title)}">
                <span class="link-result-id">${g(r.identifier)}</span>
                <span class="link-result-title">${g(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function kp(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function $p(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Ep(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return E("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(s,t,"blocks"):await h.createRelation(t,s,n),P(),E("Relation added","success"),G(t)}catch(i){x("add relation",i)}return!1}async function xp(e,t){try{await h.deleteRelation(e,t),E("Relation removed","success"),G(e)}catch(n){x("remove relation",n)}}function Hs(e){const t=oe();if(!t)return;const n=Vo();if(!n||n.length===0)return;const s=n.findIndex(a=>a.id===t.id);if(s===-1)return;const i=s+e;i<0||i>=n.length||G(n[i].id)}J({"show-detail-dropdown":(e,t,n)=>{Du(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{vp(t.issueId)},"toggle-section":(e,t)=>{gp(t.section)},"toggle-ticket-rituals":()=>{fp()},"save-comment":(e,t)=>{hp(e,t.issueId)},"show-add-relation-modal":(e,t)=>{yp(t.issueId)},"remove-relation":(e,t)=>{xp(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Xu(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Ep(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{wp(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{kp(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{$p()},"set-description-editor-mode":(e,t)=>{bp(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Hs(-1),"navigate-next-issue":()=>Hs(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Dr(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),ap(t.issueId)}});function Fr(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Fs=[],qn=[],Ur=null,V=new Set,tn="list",Mt=!1,pa=null,Us=null;const ma=Cd();(ma==="list"||ma==="grid")&&(tn=ma);function Gr(e){if(e!=="list"&&e!=="grid")return;tn=e,e==="grid"&&Mt&&ga(),Ad(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),xt()}function zr(){if(tn!=="list")return;Mt=!0,V.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),xt(),nn()}function ga(){Mt=!1,V.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),xt(),nn()}function _p(){pa&&clearTimeout(pa),pa=setTimeout(()=>{xt()},300)}function Ip(){const e=document.getElementById("doc-search");e&&(e.value=""),xt()}async function Tp(){Fe(null)}async function Sp(){const e=document.getElementById("doc-search");e&&(e.value=""),Fe(null)}function Lp(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=U()||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${g(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=X().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";s.push(`<span class="filter-chip">Project: ${g(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(s.length>0){let a=s.join(" ");s.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Cp(){return Fs}function xt(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";Lp(),qn=Fs.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),d=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!d)return!1}return!0}),qn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Dp("",tn)}async function Ap(){var n;const e=Ur||((n=L())==null?void 0:n.id);if(!e)return;const t=U()||null;try{Fs=await h.getDocuments(e,t),xt()}catch(s){x("load documents",s)}}lt(e=>{e==="currentProject"&&B()==="documents"&&Ap()});async function On(e,t=null){var s;if(e||(e=(s=L())==null?void 0:s.id),!e)return;Ur=e,Xo(-1);const n=document.getElementById("documents-list");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=U()||null);try{Fs=await h.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",tn==="list"),a.classList.toggle("active",tn==="grid")),xt()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),x("load documents",i)}}function Bp(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${W(t.color)}20; color: ${W(t.color)}">${g(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function jp(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Bp(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${u(e.id)}" data-action="view-document" data-document-id="${u(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${g(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${g(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?g(Fr(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${g(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Mp(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${W(r.color)}20; color: ${W(r.color)}">${g(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Fr(e.content).substring(0,80):"No content",i=Mt?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${u(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${V.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Mt&&V.has(e.id)?" selected":""}" data-action="${Mt?"toggle-doc-selection":"view-document"}" data-document-id="${u(e.id)}" data-doc-id="${u(e.id)}">
      ${i}
      <div class="document-list-icon">${g(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${g(e.title)}</div>
        <div class="document-list-snippet text-muted">${g(s)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?g(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Dp(e="",t="list"){var d;const n=document.getElementById("documents-list");if(!n)return;V.clear(),nn();const s=qn;if(s.length===0){const l=(d=document.getElementById("doc-search"))==null?void 0:d.value,p=U(),m=l||p;n.innerHTML=Z({icon:m?Y.search:Y.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const i=t==="grid"?jp:Mp,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=X();s.forEach(l=>{let p,m;if(e==="project")if(p=l.project_id||"__global__",p==="__global__")m="Global (Team-wide)";else{const v=r.find(b=>b.id===l.project_id);m=v?v.name:"Unknown Project"}else e==="sprint"&&(p=l.sprint_id||"__no_sprint__",m=l.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:m,docs:[]}),o[p].docs.push(l)});let c="";for(const[l,p]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${g(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${m}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function Rp(e){V.has(e)?V.delete(e):V.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=V.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",V.has(e)),nn()}function Pp(){qn.forEach(e=>V.add(e.id)),qn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),nn()}function Wr(){V.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),V.clear(),nn()}function nn(){const e=document.getElementById("doc-bulk-actions");e&&(Mt?(e.classList.remove("hidden"),V.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Np(){if(V.size===0){E("No documents selected","error");return}const t=X().map(n=>`<option value="${n.id}">${g(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${V.size} Document${V.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,q()}async function qp(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(V);let s=0,i=0;for(const r of n)try{await h.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}P(),Wr(),i===0?E(`Moved ${s} document${s>1?"s":""}!`,"success"):E(`Moved ${s}, failed ${i}`,"warning");const a=(o=L())==null?void 0:o.id;return await On(a),!1}async function Op(){var a;if(V.size===0){E("No documents selected","error");return}const e=V.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(V);let n=0,s=0;for(const o of t)try{await h.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}ga(),s===0?E(`Deleted ${n} document${n>1?"s":""}!`,"success"):E(`Deleted ${n}, failed ${s}`,"warning");const i=(a=L())==null?void 0:a.id;await On(i)}async function Ge(e,t=!0){try{const n=await h.getDocument(e);t&&(Rt(),history.pushState({documentId:e},"",`/document/${e}`)),document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");let i="";try{const k=await h.getDocumentComments(n.id);i=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${k.length===0?'<div class="comments-empty">No comments yet</div>':k.map(j=>{var O,Q;return`
            <div class="comment" data-comment-id="${u(j.id)}">
              <div class="comment-avatar">${((Q=(O=j.author_name)==null?void 0:O.charAt(0))==null?void 0:Q.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${g(j.author_name||"Unknown")}</span>
                  <span class="comment-date">${Ze(j.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${De(j.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${u(n.id)}">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="1"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(k){console.error("Failed to load comments:",k)}let a=null,o=null;if(n.project_id){const A=X().find(j=>j.id===n.project_id);if(a=A?A.name:null,n.sprint_id)try{const j=await h.getSprint(n.sprint_id);o=j?j.name:null}catch{}}let r=n.content||"";const c=N.lexer(r);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(r=r.slice(c[0].raw.length).trimStart());const d=Cp(),l=d.findIndex(k=>k.id===n.id),p=l>0?d[l-1]:null,m=l>=0&&l<d.length-1?d[l+1]:null,v=l>=0,b=B()||"documents",w=n.labels&&n.labels.length>0?n.labels.map(k=>`
          <span class="issue-label" style="background: ${W(k.color)}20; color: ${W(k.color)}">
            ${g(k.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${u(n.id)}" data-label-id="${u(k.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let _='<span class="text-muted">None</span>';try{const k=await h.getDocumentIssues(n.id);k.length>0&&(_=k.map(A=>`
          <div class="linked-item">
            <span class="linked-item-id">${g(A.identifier)}</span>
            <span class="linked-item-title">${g(A.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${u(n.id)}" data-issue-id="${u(A.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch{}s.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${u(b)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${v?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${p?`data-action="view-document" data-document-id="${u(p.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${l+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${m?`data-action="view-document" data-document-id="${u(m.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?g(a)+" ›":""} ${g(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?g(n.icon)+" ":""}${g(n.title)}</h1>

          <div class="document-content markdown-body">${r?De(r):'<p class="text-muted">No content</p>'}</div>

          ${i}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?g(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${g(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${w}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${u(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${g(n.author_name||"Unknown")}</span>
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
              ${_}
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
    `,Us&&Us.abort(),Us=new AbortController;const{signal:T}=Us,R=s.querySelector(".sidebar-overflow-trigger"),C=s.querySelector(".overflow-menu-dropdown");if(R&&C){const k=()=>{C.classList.add("hidden"),R.setAttribute("aria-expanded","false")},A=()=>{const j=C.classList.toggle("hidden");R.setAttribute("aria-expanded",String(!j))};R.addEventListener("click",A,{signal:T}),document.addEventListener("click",j=>{!R.contains(j.target)&&!C.contains(j.target)&&k()},{signal:T}),C.addEventListener("keydown",j=>{j.key==="Escape"&&(k(),R.focus())},{signal:T})}}catch(n){x("load document",n)}}async function Gs(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(s&&!n){const c=a.find(d=>d.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${g(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Vr(){Hn=null;const e=X(),t=dl()||"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${g(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,q(),t&&await Gs("doc-sprint",t,null,!0)}let Hn=null;async function Hp(e,t,n){Hn=n||null;const i=X().map(a=>`<option value="${u(a.id)}" ${a.id===t?"selected":""}>${g(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
  `,q(),t&&await Gs("doc-sprint",t,e)}async function Fp(e){var a;e.preventDefault();const t=(a=L())==null?void 0:a.id;if(!t)return E("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{if(await h.createDocument(t,i),await On(t),P(),E("Document created!","success"),Hn){const o=Hn;Hn=null,o()}}catch(o){x("create document",o)}return!1}async function Kr(e){try{const t=await h.getDocument(e),s=X().map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${g(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
          <textarea id="edit-doc-content" style="min-height: 200px">${g(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${u(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,q(),t.project_id&&await Gs("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){x("load document",t)}}async function Up(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await h.updateDocument(t,i),P(),await Ge(t),E("Document updated!","success")}catch(a){x("update document",a)}return!1}async function Gp(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=L())==null?void 0:t.id;await On(n),M("documents"),E("Document deleted!","success")}catch(n){x("delete document",n)}}function zp(e,t){Gs(e,t)}async function Wp(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${u(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,q()}async function Vp(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=L())==null?void 0:s.id,a=await h.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${u(t)}" data-issue-id="${u(o.id)}">
        <span class="link-result-id">${g(o.identifier)}</span>
        <span class="link-result-title">${g(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Kp(e,t){try{await h.linkDocumentToIssue(e,t),P(),E("Issue linked!","success"),await Ge(e,!1)}catch(n){x("link issue",n)}}async function Yp(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),E("Issue unlinked!","success"),await Ge(e,!1)}catch(n){x("unlink issue",n)}}let fa=!1;async function Zp(e,t){if(e.preventDefault(),fa)return!1;const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return E("Please enter a comment","error"),!1;fa=!0;try{await h.createDocumentComment(t,s),n.value="",E("Comment added!","success"),await Ge(t,!1)}catch(i){x("add comment",i)}finally{fa=!1}return!1}async function Xp(e){var n;const t=(n=L())==null?void 0:n.id;if(!t){E("No team selected","error");return}try{const s=await h.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,q();return}const i=s.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${u(e)}" data-label-id="${u(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${W(a.color)}; color: white;">${g(a.name)}</span>
        ${a.description?`<span class="text-muted">${g(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,q()}catch(s){x("load labels",s)}}async function Qp(e,t){try{await h.addLabelToDocument(e,t),P(),E("Label added!","success"),await Ge(e,!1)}catch(n){x("add label",n)}}async function Jp(e,t){try{await h.removeLabelFromDocument(e,t),E("Label removed!","success"),await Ge(e,!1)}catch(n){x("remove label",n)}}J({"view-document":(e,t)=>{e.preventDefault(),Ge(t.documentId)},"toggle-doc-selection":(e,t)=>{Rp(t.docId)},"clear-doc-search":()=>{Ip()},"clear-doc-project-filter":()=>{Tp()},"clear-all-doc-filters":()=>{Sp()},"show-bulk-move-modal":()=>{Np()},"bulk-delete-documents":()=>{Op()},"select-all-docs":()=>{Pp()},"clear-doc-selection":()=>{Wr()},"exit-selection-mode":()=>{ga()},"enter-selection-mode":()=>{zr()},"handle-bulk-move":e=>{qp(e)},"unlink-document-issue":(e,t)=>{Yp(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Wp(t.documentId)},"add-document-comment":(e,t)=>{Zp(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Jp(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Xp(t.documentId)},"show-edit-document-modal":(e,t)=>{Kr(t.documentId)},"delete-document":(e,t)=>{Gp(t.documentId)},"create-document":e=>{Fp(e)},"update-doc-sprint-dropdown":(e,t,n)=>{zp(t.sprintSelect,n.value)},"update-document":(e,t)=>{Up(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Vp(n.value,t.documentId)},"link-to-issue":(e,t)=>{Kp(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Qp(t.documentId,t.labelId)}});let sn=[],zs={},Ws=new Set,dt=null,ha=null,Vs=[],Fn=[],va=[];function Yr(){return zs}function em(){return ha}function tm(){return dt}lt(e=>{e==="currentProject"&&B()==="sprints"&&Un()});async function Un(){const e=U();if(!e){const n=document.getElementById("sprints-list");n&&(n.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}vm();const t=document.getElementById("sprints-list");t&&(t.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await h.getCurrentSprint(e),sn=await h.getSprints(e),nm(),await Ks()}catch(n){t&&(t.innerHTML=Z({icon:Y.sprints,heading:"Failed to load sprints",description:"Check your connection and try again"})),x("load sprints",n)}}function nm(){const e=document.getElementById("sprints-list");if(!e)return;const t=sn.find(a=>a.status==="active"),n=sn.find(a=>a.status==="planned"),s=sn.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${u(t.id)}" data-sprint-url="/sprint/${u(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${g(t.name)}</div>
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
        `,i+=sm(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${u(n.id)}" data-sprint-url="/sprint/${u(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${g(n.name)}</div>
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
                            <span class="sprint-history-name">${g(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||Z({icon:Y.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function sm(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),l=((O,Q,ce)=>Math.min(Math.max(O,Q),ce))((new Date-o)/(r-o),0,1),p=360,m=120,v=16,b=v,w=p-v,_=v,T=m-v,R=O=>s===0?T:_+(1-O/s)*(T-_),C=R(s),k=R(0),A=b+(w-b)*l,j=R(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${Zs(e.start_date)} → ${Zs(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${p} ${m}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${C}" x2="${w}" y2="${k}" class="burndown-ideal" />
                <line x1="${b}" y1="${C}" x2="${A}" y2="${j}" class="burndown-actual" />
                <circle cx="${A}" cy="${j}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function Gn(e,t=!0){var n;try{t&&Rt();const s=await h.getSprint(e);if(!s){E("Sprint not found","error"),M("sprints");return}ha=s;const i=(n=L())==null?void 0:n.id,[a,o,r]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(()=>[]),i?h.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);Vs=a,va=o,Fn=r,ws(Vs),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),am()}catch(s){console.error("Failed to load sprint:",s),E("Failed to load sprint","error"),M("sprints")}}async function im(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){E("Invalid sprint ID","error"),M("sprints",!1);return}try{await Gn(e,!1)}catch{M("sprints",!1)}}function am(){const e=ha,t=Vs;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=B()||"sprints",i=t.filter(l=>Gt.includes(l.status)),a=t.filter(l=>l.status==="done"),o=t.reduce((l,p)=>l+(p.estimate||0),0),r=a.reduce((l,p)=>l+(p.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const d=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${u(s)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${g(e.name)}</h2>
                ${c}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${Zs(e.start_date)} → ${Zs(e.end_date)}
                </div>
            `:""}
        </div>

        <div class="sprint-detail-stats">
            <div class="stat-card">
                <div class="stat-value">${i.length}</div>
                <div class="stat-label">Open Issues</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${a.length}</div>
                <div class="stat-label">Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${d}</div>
                <div class="stat-label">Budget</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${r} / ${o}</div>
                <div class="stat-label">Points Done</div>
            </div>
        </div>

        <div class="sprint-detail-sections">
            <div class="sprint-detail-section">
                <h3>Open Issues (${i.length})</h3>
                ${i.length===0?Z({icon:Y.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${i.map(l=>Zr(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?Z({icon:Y.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(l=>Zr(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${rm()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Fn.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${u(e.id)}"
                        data-project-id="${u(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Fn.length>0?`
                    <div class="sprint-issues-list">
                        ${Fn.map(l=>om(l)).join("")}
                    </div>
                `:Z({icon:Y.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Zr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",s=sr.includes(e.status)?e.status:"backlog",i=n?`badge-priority-${n}`:"",a=`status-dot-${s}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${u(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${g(e.identifier)}</span>
            <span class="sprint-issue-title">${g(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${i}">${wm(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function om(e){const t=g(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${u(e.id)}" data-document-url="/document/${u(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${g(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ze(e.created_at)}</span>
            </span>
        </div>
    `}function rm(){const e=va;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${g(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${g(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${lm(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function lm(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function cm(e,t,n,s){const i=s?Um(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${u(e)}" data-project-id="${u(s)}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${u(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${i?`<small class="form-hint">${g(i)}</small>`:""}
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
    `,q()}async function dm(e,t,n){var r,c,d;e.preventDefault();const s=(c=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:c.trim(),i=document.getElementById("sprint-budget").value,a=i?parseInt(i):null,o=((d=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:d.value)||"this";try{const l={budget:a};if(s&&(l.name=s),await h.updateSprint(t,l),o==="planned"||o==="default"){const m=sn.filter(v=>v.status==="planned"&&v.id!==t);for(const v of m)await h.updateSprint(v.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await Un(),P(),E(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(l){x("update budget",l)}return!1}async function um(e){const t=sn.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,q();const n=Gt;let s=0,i=!1,a=!1;try{const[c,d]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);s=c.filter(l=>n.includes(l.status)).length,i=d.some(l=>l.is_active&&l.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${g(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${u(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function pm(e){try{const t=await h.closeSprint(e);await Un(),Jr(),t.limbo?gm(t):E("Sprint completed!","success")}catch(t){x("complete sprint",t)}}async function Ks(){const e=U();if(e)try{dt=await h.getLimboStatus(e),mm()}catch(t){console.error("Failed to load limbo status:",t)}}function mm(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!dt||!dt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${dt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function gm(e){const t=U();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${g(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,q(),fm(t)}async function fm(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${g(s.name)} <span class="ritual-mode">(${g(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${De(s.prompt)}</div>
                    ${ya(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function ba(){var t,n;if(!dt)return;const e=U();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${dt.pending_rituals.map(s=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${s.attestation?s.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${g(s.name)}</strong>
                            <span class="badge badge-ritual-${u(s.approval_mode)}">${g(s.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${De(s.prompt)}</div>
                        ${ya(s.attestation)}
                        ${hm(s,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=dt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${dt.completed_rituals.map(s=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${g(s.name)}</div>
                            ${ya(s.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,q()}function ya(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${g(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${g(Ze(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${De(e.note)}</div>
        </div>
    `}function hm(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Xr(e){for(const t of e)if(!Ws.has(t))try{(await h.getSprints(t)).forEach(s=>{zs[s.id]=s}),Ws.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function vm(){zs={},Ws=new Set,Vs=[],va=[],Fn=[],Ys={}}function bm(e,t){t.forEach(n=>{zs[n.id]=n}),Ws.add(e)}let Ys={};function ym(e){return Ys[e]}function Qr(e,t){Ys[e]=t??null}function Jr(){Ys={}}J({"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Gn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;cm(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{ba()},"show-close-sprint-confirmation":(e,t)=>{um(t.sprintId)},"handle-update-budget":(e,t)=>{dm(e,t.sprintId,t.projectId)},"close-modal":()=>{P()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,P(),pm(t.sprintId)},"dismiss-limbo-modal":()=>{P(),Ks()},"approve-ritual":(e,t)=>{xm(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{tl(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}G(t.issueId)},"create-sprint-document":async(e,t)=>{await Hp(t.sprintId,t.projectId,()=>{Gn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ge(t.documentId)}});function Zs(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function wm(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}lt(e=>{e==="currentProject"&&B()==="rituals"&&el()});async function el(){const e=U(),t=document.getElementById("rituals-content");if(!e){const n=document.getElementById("rituals-tabs");n&&n.classList.add("hidden"),t&&(t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>');return}Zm(e),t&&(t.innerHTML='<div class="loading">Loading rituals...</div>');try{await Vn()}catch(n){t&&(t.innerHTML=`<div class="empty-state">Error loading rituals: ${g(n.message)}</div>`)}}async function km(){cl($m),el()}function $m(){const e=document.getElementById("rituals-content"),t=Xm(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,on("rv-sprint-rituals-list",n,"sprint"),on("rv-close-rituals-list",s,"close"),on("rv-claim-rituals-list",i,"claim")}function Em(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function xm(e,t){try{await h.approveAttestation(e,t),E("Ritual approved!","success"),await Ks(),ba()}catch(n){x("approve ritual",n)}}async function tl(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{_m(s,e,t)}),q()}async function _m(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await h.completeGateRitual(t,n,s||null),E("Ritual completed!","success"),await Ks();const i=tm();i&&!i.in_limbo?(P(),E("Limbo cleared! Next sprint is now active.","success")):ba()}catch(i){x("complete gate ritual",i)}return!1}function Im(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}" data-ritual-prompt="${u(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Attest</button>`}function Tm(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${g(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Sm(i,e,t)}),q()}async function Sm(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return E("A note is required for this attestation.","error"),!1;try{await h.attestTicketRitual(t,n,s),E("Ritual attested!","success"),P(),await qs(n)}catch(i){x("attest ticket ritual",i)}return!1}async function Lm(e,t){try{await h.attestTicketRitual(e,t),E("Ritual attested!","success"),await qs(t)}catch(n){x("attest ticket ritual",n)}}async function Cm(e,t){try{await h.approveTicketRitual(e,t),E("Ritual approved!","success"),await qs(t)}catch(n){x("approve ticket ritual",n)}}function Am(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Bm(s,e,t)}),q()}async function Bm(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await h.completeTicketGateRitual(t,n,s||null),E("Ritual completed!","success"),P(),await qs(n)}catch(i){x("complete ticket ritual",i)}return!1}J({"show-create-ritual-modal":(e,t)=>{gl(t.trigger)},"approve-ticket-ritual":(e,t)=>{Cm(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{Am(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{Tm(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{Lm(t.ritualId,t.issueId)}});function De(e){if(!e)return"";try{N.setOptions({breaks:!0,gfm:!0});const n=N.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Uo.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function wa(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function jm(e,t,n,s,i,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${g(i)}</span>
                    <span class="gate-approval-issue-title">${g(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${g(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${g(o)}</strong>${r?` ${wa(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",d=>{Mm(d,e,t,n)}),q(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Mm(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,i||null),E(`GATE ritual "${s}" approved!`,"success"),P(),Dt()}catch(a){x("complete gate ritual",a)}}function Dm(e,t,n,s,i,a,o,r){jm(e,t,n,s,i,a,o,r)}function Rm(e,t,n,s,i,a,o,r,c){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${g(i)}</span>
                    <span class="gate-approval-issue-title">${g(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${g(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${g(o)}</strong>${r?` ${wa(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${De(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{Pm(l,e,t,n)}),q(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function Pm(e,t,n,s){var a,o;e.preventDefault();const i=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await h.approveTicketRitual(t,n),i)try{await h.createComment(n,i)}catch(r){console.error("Failed to post approval comment:",r)}E(`Review ritual "${s}" approved!`,"success"),P(),Dt()}catch(r){x("approve review ritual",r)}}function Nm(e,t,n,s,i,a,o,r,c){Rm(e,t,n,s,i,a,o,r,c)}lt(e=>{e==="currentProject"&&B()==="approvals"&&Dt()});let ka=[];async function Dt(){if(!L())return;const e=document.getElementById("approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=U(),n=t?X().filter(o=>o.id===t):X(),s=await Promise.all(n.map(async o=>{const[r,c]=await Promise.all([h.getPendingApprovals(o.id),h.getLimboStatus(o.id)]);return{project:o,approvals:r,limbo:c}})),i=[],a=[];for(const{project:o,approvals:r,limbo:c}of s)if(i.push(...r),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(l=>{var p;return(p=l.attestation)!=null&&p.approved_at?!1:l.approval_mode==="gate"||!!l.attestation});d.length>0&&a.push({project:o,rituals:d})}Ud(i),ka=a,nl()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${g(t.message)}</p></div>`}}}function nl(){const e=document.getElementById("approvals-list");if(!e)return;const t=Fd(),n=ka.length>0,s=!Bd();if(t.length===0&&!n){s?e.innerHTML=`
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
                    ${ka.map(({project:l,rituals:p})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${g(l.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${p.map(m=>{const v=m.attestation&&!m.attestation.approved_at,b=v?"⏳":"○",w=v?`<span class="gate-waiting-info">Attested by <strong>${g(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',_=v?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${u(m.id)}"
                                            data-project-id="${u(l.id)}">Approve</button>`:m.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${u(m.id)}"
                                                data-project-id="${u(l.id)}"
                                                data-ritual-name="${u(m.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${g(m.name)}
                                                    <span class="badge badge-ritual-${u(m.approval_mode)}">${g(m.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${g(m.prompt)}</span>
                                                ${w}
                                            </div>
                                            ${_}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=l=>l.pending_approvals||[],o=l=>p=>{const m=a(p).filter(l);return m.length>0?{...p,_filteredApprovals:m}:null},r=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="claim")).filter(Boolean),c=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="close")).filter(Boolean),d=t.map(o(l=>l.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map($a).join("")}
                </div>
            </div>
        `),c.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map($a).join("")}
                </div>
            </div>
        `),d.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${d.map($a).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset;Dm(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{var v;l.disabled=!0;const p=(v=l.closest(".gate-ritual-actions"))==null?void 0:v.querySelector(".review-approve-btn");p&&(p.disabled=!0);const m=l.dataset;try{await h.approveTicketRitual(m.ritualId,m.issueId),E(`Review ritual "${m.ritualName}" approved!`,"success"),await Dt()}catch(b){l.disabled=!1,p&&(p.disabled=!1),x("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset;Nm(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt,p.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0;try{await h.approveAttestation(l.dataset.ritualId,l.dataset.projectId),E("Sprint ritual approved!","success"),await Dt()}catch(p){l.disabled=!1,x("approve sprint ritual",p)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(l=>{l.addEventListener("click",()=>{tl(l.dataset.ritualId,l.dataset.projectId,l.dataset.ritualName)})})}function qm(){jd(),nl()}function $a(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${g(s.requested_by_name)}</strong>${s.requested_at?` (${wa(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${De(s.attestation_note)}</div>`:"",c=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',d=i?`<div class="gate-ritual-actions">
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
                    <span class="gate-ritual-name">${g(s.ritual_name)} ${c}</span>
                    <span class="gate-ritual-prompt">${g(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                ${d}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.issue_id)}" class="gate-issue-link">
                    <span class="gate-issue-id">${g(e.identifier)}</span>
                    <span class="gate-issue-title">${g(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${g(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}J({"view-issue-from-modal":(e,t)=>{e.preventDefault(),P(),G(t.issueId)},"dismiss-approvals-explainer":()=>{qm()}});const Xs={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Qs={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let sl=0;function il(e){sl=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=al(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function al(e="",t="",n=""){const s=sl++,i=Object.keys(Xs).map(d=>`<option value="${d}" ${d===e?"selected":""}>${d}</option>`).join(""),o=(e?Xs[e]:Xs.estimate).map(d=>`<option value="${d}" ${d===t?"selected":""}>${Qs[d]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
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
    `}function Om(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",al()),Js()}function Hm(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Js()}function Fm(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Xs[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Qs[o]}</option>`).join(""),ol(e),Js()}function ol(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function zn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Js(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function rl(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,d=o.querySelector(".condition-value");let l=(a=d==null?void 0:d.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw zn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw zn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${c}`;if(n.has(p))throw zn(`Duplicate condition: ${r} ${Qs[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),c==="isnull")t[p]=!0;else if(c==="in"||c==="contains")t[p]=l?l.split(",").map(m=>m.trim()).filter(m=>m):[];else if(c==="gte"||c==="lte"){if(!l)throw zn(`Please enter a numeric value for ${r} ${Qs[c]}.`),new Error(`Missing numeric value for ${p}`);const m=parseInt(l,10);if(isNaN(m))throw zn(`Invalid number "${l}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${l}`);t[p]=m}else t[p]=l}return Js(),Object.keys(t).length>0?t:null}J({"add-condition-row":()=>{Om()},"remove-condition-row":(e,t)=>{Hm(Number(t.rowId))},"update-operator-options":(e,t)=>{Fm(Number(t.rowId))},"toggle-value-input":(e,t)=>{ol(Number(t.rowId))}});let le=[],Ea=null;const ll=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];lt((e,t)=>{e==="currentProject"&&(t&&wd(t),ll.forEach(n=>{const s=document.getElementById(n);s&&(s.value=t||"")}),rg(t||""))});const ei={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function cl(e){Ea=e}function X(){return le}function an(e){const t=le.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return ei[n]||ei.fibonacci}function ti(e,t){if(!e)return"No estimate";const s=an(t).find(i=>i.value===e);return s?s.label:`${e} points`}function xa(e,t){return e?!an(t).some(s=>s.value===e):!1}function Um(e){const t=le.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(ei[n]||ei.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function ze(){if(L())try{le=await h.getProjects(L().id),Gm();const e=U();if(e&&le.some(s=>s.id===e))return;const t=_a();if(t&&le.some(s=>s.id===t)){Fe(t);return}const n=Go();if(n&&le.some(s=>s.id===n)){Fe(n);return}le.length>0&&Fe(le[0].id)}catch(e){x("load projects",e)}}function Gm(){const e='<option value="">All Projects</option>'+le.map(a=>`<option value="${a.id}">${g(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+le.map(a=>`<option value="${a.id}">${g(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],s=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),s.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const i=U();ll.forEach(a=>{const o=document.getElementById(a);o&&(o.value=i||"")})}function dl(){return Go()}function Wn(){const e=document.getElementById("projects-list");if(le.length===0){e.innerHTML=Z({icon:Y.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=le.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${u(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${W(t.color)}20; color: ${W(t.color)}">
                    ${g(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${g(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${u(t.id)}" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${g(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function zm(e){Fe(e),M("issues")}function ul(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,q()}async function Wm(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(L().id,t),await ze(),Wn(),P(),E("Project created!","success")}catch(n){x("create project",n)}return!1}async function Vm(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await ze(),Wn(),P(),E("Project updated!","success")}catch(s){x("update project",s)}return!1}async function Km(e){const t=le.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await ze(),Wn(),P(),E("Project deleted","success")}catch(n){x("delete project",n)}}let Se=null;async function pl(e){Se=e,le.length===0&&await ze();const t=le.find(n=>n.id===e);if(!t){E("Project not found","error"),M("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),ml("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function ml(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!ut||ut.length===0)&&Vn()}function Ym(){Se=null,ut=[]}function Zm(e){Se=e}function Xm(){return ut}async function Qm(){if(!Se)return;const e=document.getElementById("ps-name").value.trim();if(!e){E("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Se,t),await ze(),E("Settings saved","success");const n=le.find(s=>s.id===Se);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){x("save project settings",n)}}async function Jm(){if(!Se)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await h.updateProject(Se,n),await ze(),E("Settings saved","success")}catch(s){x("save settings",s)}}let ut=[];async function Vn(){if(Se)try{ut=await h.getRituals(Se),eg(),typeof Ea=="function"&&Ea()}catch(e){x("load rituals",e)}}function eg(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=ut.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=ut.filter(s=>s.trigger==="ticket_close"),n=ut.filter(s=>s.trigger==="ticket_claim");on("ps-sprint-rituals-list",e,"sprint"),on("ps-close-rituals-list",t,"close"),on("ps-claim-rituals-list",n,"claim")}function on(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>u(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${g(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${g(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${De(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${i(a.approval_mode)}">${g(a.approval_mode||"auto")}</span>
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
  `}).join("")}async function gl(e){if(!Se)return;let t=[];try{t=await h.getRitualGroups(Se)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${u(n.id)}" data-mode="${u(n.selection_mode)}">${g(n.name)} (${g(n.selection_mode)})</option>`).join("")}
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
        ${il(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,q()}function tg(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function ng(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function fl(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw E("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Se,{name:t,selection_mode:n})).id}return e.value||null}async function sg(e){e.preventDefault();let t;try{t=rl()}catch{return!1}let n;try{n=await fl()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await h.createRitual(Se,s),await Vn(),P(),E("Ritual created!","success")}catch(i){x("create ritual",i)}return!1}async function ig(e){const t=ut.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Se)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${u(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${u(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${g(t.prompt)}</textarea>
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
          ${n.map(o=>`<option value="${u(o.id)}" data-mode="${u(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${g(o.name)} (${g(o.selection_mode)})</option>`).join("")}
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
        ${il(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,q()}async function ag(e,t){e.preventDefault();let n;try{n=rl()}catch{return!1}let s;try{s=await fl()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.updateRitual(t,i),await Vn(),P(),E("Ritual updated!","success")}catch(a){x("update ritual",a)}return!1}async function og(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Vn(),E("Ritual deleted","success")}catch(n){x("delete ritual",n)}}J({"view-project":(e,t)=>{zm(t.projectId)},"view-project-settings":(e,t)=>{pl(t.projectId)},"create-project":e=>{Wm(e)},"update-project":(e,t)=>{Vm(e,t.projectId)},"confirm-delete-project":(e,t)=>{Km(t.projectId)},"edit-project-ritual":(e,t)=>{ig(t.ritualId)},"delete-project-ritual":(e,t)=>{og(t.ritualId,t.ritualName)},"create-project-ritual":e=>{sg(e)},"update-project-ritual":(e,t)=>{ag(e,t.ritualId)},"toggle-ritual-conditions":()=>{tg()},"ritual-group-change":()=>{ng()}});function _a(){const t=new URLSearchParams(window.location.search).get("project");return t||dl()}function rg(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}const Ia={},hl=new Map;let Ta=null,Sa=null,La=null,Ca=null,Aa=null,Ba=null,vl=!1;function lg(e){Object.assign(Ia,e)}function cg({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(Ta=e),t&&(Sa=t),n&&(La=n),s&&(Ca=s),i&&(Aa=i),a&&(Ba=a)}function dg(){return Object.keys(Ia)}const ug=["issues","board","sprints","epics","documents","rituals","approvals","my-issues"];function M(e,t=!0){if(t&&Rt(),qd(e),t){let i;const a=_a();e==="my-issues"?i=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:ug.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),Ta&&Ta();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=Ia[e];s&&s(),t&&window.scrollTo(0,0)}function bl(){var s;const t=window.location.pathname.split("/").filter(Boolean);Ca&&Ca();let n="my-issues";if(t.length===0||t[0]==="")M("my-issues",!1);else{if(Sa&&Sa(t))return;{n=t[0];const i={"gate-approvals":"approvals"};i[n]&&(n=i[n]),dg().includes(n)?M(n,!1):(n="my-issues",M("my-issues",!1))}}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function Rt(){hl.set(window.location.href,window.scrollY)}function yl(e){Rt(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Aa&&Aa(e)}function pg(e){Rt(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Ba&&Ba(e)}function wl(){const e=hl.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function mg(){vl||(vl=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&La&&La(e.state)){wl();return}(t=e.state)!=null&&t.view?M(e.state.view,!1):bl(),wl()}))}let Kn=[];function ni(){return Kn}function gg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function fg(e){const t=e==null?void 0:e.avatar_url,n=u((e==null?void 0:e.name)||"Agent");return t?gg(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${u(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${g(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function hg(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Kn=await h.getTeamAgents(e),xs(Nt,ni),Is()}catch(n){console.error("Failed to load team agents:",n)}}async function ja(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Kn=await h.getTeamAgents(e),xs(Nt,ni),Is(),vg()}catch(n){x("load agents",n)}}function vg(){const e=document.getElementById("agents-list");if(e){if(Kn.length===0){e.innerHTML=Z({icon:Y.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=Kn.map(t=>{const n=g(t.name),s=g(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${fg(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Oi(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${u(t.id)}" data-agent-name="${u(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function bg(){const e=X();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${g(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),q()}async function yg(e){var o,r,c;e.preventDefault();const t=(o=L())==null?void 0:o.id;if(!t)return E("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let d;i&&a?d=await h.createProjectAgent(a,n,s):d=await h.createTeamAgent(t,n,s),P();const l=g(d.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${l}</code>
          <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${l}</code>
        </div>
        <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
      </div>
    `,q()}catch(d){x("create agent",d)}return!1}function wg(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{E("Agent API key copied to clipboard","success")}).catch(()=>{E("Failed to copy","error")})}async function kg(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),E("Agent deleted","success"),ja()}catch(n){x("delete agent",n)}}J({"create-agent":e=>{yg(e)},"copy-agent-key":()=>{wg()},"dismiss-agent-modal":()=>{P(),ja()},"delete-agent":(e,t)=>{kg(t.agentId,t.agentName)}});let Yn=0,Zn=null;const Pt=new Map;function pt(e,t){return Pt.has(e)||Pt.set(e,new Set),Pt.get(e).add(t),()=>{var n;return(n=Pt.get(e))==null?void 0:n.delete(t)}}function $g(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function kl(e){Zn&&(clearTimeout(Zn),Zn=null);const t=Wd();t&&(t.close(),Jo(null));const n=h.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Jo(a),a.onopen=()=>{console.log("WebSocket connected"),Yn>0&&E("Live updates reconnected","success"),Yn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(c){console.error("WebSocket: malformed message",c);return}Eg(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Yn++,Yn===1&&E("Live updates disconnected. Reconnecting...","warning");const o=$g(Yn-1);Zn=setTimeout(()=>{Zn=null,L()&&L().id===e&&kl(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Eg(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Pt.get(`${n}:${t}`);if(a)for(const c of a)try{c(s,i)}catch(d){console.error(`WebSocket handler error (${n}:${t}):`,d)}const o=Pt.get(n);if(o)for(const c of o)try{c(s,i)}catch(d){console.error(`WebSocket handler error (${n}):`,d)}const r=Pt.get("*");if(r)for(const c of r)try{c(s,i)}catch(d){console.error("WebSocket handler error (*):",d)}}let si=[],ii=[],Ma=[],Da=[];function xg(){return si}function Nt(){return ii}async function Ra(){try{si=await h.getMyTeams(),_g()}catch(e){x("load teams",e)}}function _g(){const e=document.getElementById("team-list");si.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=si.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${u(JSON.stringify(t))}">${g(t.name)}</button>
        `).join("")}async function Pa(e,t=!1){Fi(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),kl(e.id),await Promise.all([ze(),Ng(),Tg(),hg()]),t?bl():M(B())}function $l(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Ig(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Tg(){if(L())try{ii=await h.getTeamMembers(L().id),xs(Nt,ni),Is()}catch(e){console.error("Failed to load team members:",e)}}async function El(){if(L())try{ii=await h.getTeamMembers(L().id),xs(Nt,ni),Is(),Sg()}catch(e){x("load team members",e)}}function Sg(){const e=document.getElementById("team-members-list");e.innerHTML=ii.map(t=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${g(t.user_name||"Unknown")}</span>
                    <span class="member-email">${g(t.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${t.role}</span>
                ${t.user_id!==An().id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${u(t.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function Na(){if(L())try{Ma=await h.getTeamInvitations(L().id),Lg()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Lg(){const e=document.getElementById("team-invitations-list");if(Ma.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=Ma.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${g(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${g(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${u(t.id)}">Cancel</button>
        </div>
    `).join("")}async function Cg(){if(L())try{Da=await h.getTeamAgents(L().id),Ag()}catch(e){x("load team agents",e)}}function Ag(){const e=document.getElementById("team-agents-list");if(e){if(Da.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=Da.map(t=>{const n=g(t.name),s=g(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${g(i)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${s} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function xl(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,q()}async function Bg(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await h.createInvitation(L().id,t,n),await Na(),P(),E("Invitation sent!","success")}catch(s){x("send invitation",s)}return!1}async function jg(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(L().id,e),await El(),E("Member removed!","success")}catch(t){x("remove member",t)}}async function Mg(e){try{await h.deleteInvitation(L().id,e),await Na(),E("Invitation canceled!","success")}catch(t){x("cancel invitation",t)}}function _l(){$l(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,q()}function Dg(){L()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${u(L().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${u(L().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${g(L().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,q())}async function Rg(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await Ra(),await Pa(n),P(),E("Team created!","success")}catch(n){x("create team",n)}return!1}async function Pg(e){if(e.preventDefault(),!L())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(L().id,t);Fi(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await Ra(),P(),E("Team updated!","success")}catch(n){x("update team",n)}return!1}async function Ng(){if(L())try{const e=await h.getLabels(L().id);ks(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),J({"select-team":(e,t)=>{Pa(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{jg(t.userId)},"delete-invitation":(e,t)=>{Mg(t.invitationId)},"invite-member":e=>{Bg(e)},"create-team":e=>{Rg(e)},"update-team":e=>{Pg(e)}});let et=null,mt=0,rn=null,ln=null,Xn=null,qa=!1;function qg(){return kd()}function Il(){$d()}function Tl(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Og(){et||(et=document.createElement("div"),et.id="onboarding-overlay",et.className="onboarding-overlay",document.getElementById("app").appendChild(et))}function Qn(){if(!et)return;const e=qa?Ll():Sl(),t=e[mt],n=e.map((s,i)=>`<span class="onboarding-dot${i===mt?" active":""}${i<mt?" completed":""}"></span>`).join("");et.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Sl(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Tl(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Tl(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&rn&&(e.textContent=`${rn.name} (${rn.key})`),t&&ln&&(t.textContent=`${ln.name} (${ln.key})`),n&&Xn&&(n.textContent=`${Xn.identifier} - ${Xn.title}`)}}]}function Ll(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Oa(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Ha(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function cn(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Hg(){const e=qa?Ll():Sl();mt<e.length-1&&(mt++,Qn())}function Fg(){Il(),Al(),Jn()}function Ug(){Il(),Al(),Jn()}async function Gg(e){e.preventDefault(),Ha("onboarding-team-error"),cn("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{rn=await h.createTeam({name:t,key:n}),mt++,Qn()}catch(s){Oa("onboarding-team-error",s.message||"Failed to create team"),cn("onboarding-team-submit",!1)}}async function zg(e){e.preventDefault(),Ha("onboarding-project-error"),cn("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{ln=await h.createProject(rn.id,{name:t,key:n}),mt++,Qn()}catch(s){Oa("onboarding-project-error",s.message||"Failed to create project"),cn("onboarding-project-submit",!1)}}async function Wg(e){e.preventDefault(),Ha("onboarding-issue-error"),cn("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Xn=await h.createIssue(ln.id,{title:t}),mt++,Qn()}catch(n){Oa("onboarding-issue-error",n.message||"Failed to create issue"),cn("onboarding-issue-submit",!1)}}function Cl(e=!1){qa=e,mt=0,rn=null,ln=null,Xn=null,Og(),Qn()}function Al(){et&&(et.remove(),et=null)}function Bl(){Ed(),Cl(!0)}J({"onboarding-next":e=>{e.preventDefault(),Hg()},"onboarding-skip":e=>{e.preventDefault(),Fg()},"onboarding-finish":e=>{e.preventDefault(),Ug()},"onboarding-create-team":e=>{Gg(e)},"onboarding-create-project":e=>{zg(e)},"onboarding-create-issue":e=>{Wg(e)}});async function Jn(){Vg(),Jg(),await Ra();const e=xg();if(e.length===0&&!qg()){Cl();return}e.length>0&&await Pa(e[0],!0)}let dn=null,es=null,We=null,Ve=null;function ts(){dn||(dn=document.getElementById("auth-screen"),es=document.getElementById("main-screen"),We=document.getElementById("login-form"),Ve=document.getElementById("signup-form"))}function Fa(){ts(),dn&&dn.classList.remove("hidden"),es&&es.classList.add("hidden")}function Vg(){ts(),dn&&dn.classList.add("hidden"),es&&es.classList.remove("hidden")}function Kg(){ts(),We&&We.classList.remove("hidden"),Ve&&Ve.classList.add("hidden")}function Yg(){ts(),We&&We.classList.add("hidden"),Ve&&Ve.classList.remove("hidden")}async function Zg(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),ys(await h.getMe()),await Jn(),E("Welcome back!","success")}catch(s){x("log in",s)}return!1}async function Xg(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await h.signup(t,n,s),await h.login(n,s),ys(await h.getMe()),await Jn(),E("Account created successfully!","success")}catch(i){x("sign up",i)}return!1}function jl(){h.logout(),ys(null),Fi(null),Fa(),E("Signed out","success")}function Qg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Jg(){const e=An();if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Qg(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${u(s)}" alt="${u(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function ef(){ts();const e=We==null?void 0:We.querySelector("form");e&&e.addEventListener("submit",i=>Zg(i));const t=Ve==null?void 0:Ve.querySelector("form");t&&t.addEventListener("submit",i=>Xg(i));const n=We==null?void 0:We.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),Yg()});const s=Ve==null?void 0:Ve.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),Kg()})}let Ua=[];async function Ga(){try{Ua=await h.getApiKeys(),tf()}catch(e){x("load API keys",e)}}function tf(){const e=document.getElementById("api-keys-list");if(e){if(Ua.length===0){e.innerHTML=Z({icon:Y.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Ua.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${g(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${g(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Oi(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Oi(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${u(t.id)}" data-key-name="${u(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function nf(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,q()}async function sf(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);P(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,q()}catch(n){x("create API key",n)}return!1}async function af(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),E("API key copied to clipboard","success")}catch{E("Failed to copy","error")}}async function of(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),E("API key revoked","success"),await Ga()}catch(n){x("revoke API key",n)}}J({"create-api-key":e=>{sf(e)},"copy-api-key":()=>{af()},"dismiss-api-key-modal":()=>{P(),Ga()},"revoke-api-key":(e,t)=>{of(t.keyId,t.keyName)}});let ai=!1,gt=0,_t=[],oi=[];function rf(e){oi=e,_t=[...e]}function ri(){return ai}function lf(){if(ai)return;ai=!0,gt=0,_t=[...oi];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&li()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>cf(n.target.value)),t.addEventListener("keydown",uf),e.addEventListener("mouseover",n=>{const s=n.target.closest('[data-action="execute-command"]');s&&df(Number(s.dataset.commandIndex))}),ns(),requestAnimationFrame(()=>t.focus())}function li(){ai=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function cf(e){const t=e.toLowerCase().trim();t?_t=oi.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):_t=[...oi],gt=0,ns()}function ns(){const e=document.getElementById("command-results");if(!e)return;if(_t.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};_t.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function df(e){gt=e,ns()}function Ml(e){const t=_t[e];t&&(li(),t.action())}function uf(e){switch(e.key){case"ArrowDown":e.preventDefault(),gt=Math.min(gt+1,_t.length-1),ns();break;case"ArrowUp":e.preventDefault(),gt=Math.max(gt-1,0),ns();break;case"Enter":e.preventDefault(),Ml(gt);break;case"Escape":e.preventDefault(),li();break}}J({"execute-command":(e,t)=>{Ml(Number(t.commandIndex))}});const pf=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function mf(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${g(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${g(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function gf(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${g(e.title)}</h4>
        ${e.shortcuts.map(mf).join("")}
    </div>`}function Dl(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${pf.map(gf).join("")}
        </div>
    `,q()}let ci=[];function ff(){return ci}lt(e=>{e==="currentProject"&&B()==="epics"&&za()});async function za(){var t;const e=document.getElementById("epics-list");if(e){e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((t=L())!=null&&t.id)){ci=[],e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const n=U();let s;if(n?s=await h.getIssues({project_id:n,issue_type:"epic"}):s=await h.getTeamIssues(L().id,{issue_type:"epic"}),!s||s.length===0){ci=[],e.innerHTML=Z({icon:Y.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const i=await Promise.all(s.map(async a=>{let o=[];try{o=await h.getSubIssues(a.id)}catch{}return{...a,subIssues:o}}));ci=i,hf(i,e)}catch(n){e.innerHTML=`<div class="empty-state">Failed to load epics: ${g(n.message||String(n))}</div>`}}}function hf(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(p=>p.status==="done"||p.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,d=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase()),l=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${u(s.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${g(s.identifier)}</td>
                <td class="epic-title">${g(s.title)}</td>
                <td class="epic-progress">
                    <div class="epic-progress-bar-container">
                        <div class="epic-progress-bar">
                            <div class="epic-progress-fill${o===100?" epic-progress-complete":""}" style="width: ${o}%"></div>
                        </div>
                        <span class="epic-progress-text">${r}</span>
                    </div>
                </td>
                <td class="epic-estimate">${l}</td>
                <td class="epic-status"><span class="status-badge ${c}">${d}</span></td>
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&pg(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function vf(){const e=U(),t=X().map(n=>`
        <option value="${u(n.id)}" ${n.id===e?"selected":""}>${g(n.name)}</option>
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
    `,q(),document.getElementById("create-epic-form").addEventListener("submit",bf),document.getElementById("create-epic-title").focus()}async function bf(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){E("Please select a project","error");return}if(!n){E("Please enter a title","error");return}try{const i=await h.createIssue(t,{title:n,description:s||null,issue_type:"epic"});P(),E(`Created epic ${i.identifier}`,"success"),za()}catch(i){x("create epic",i)}}async function Rl(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){G(t.id,!1);return}await Wa(t.id,!1)}else M("epics",!1)}catch{M("epics",!1)}}async function Wa(e,t=!0){try{const[n,s,i,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(n.issue_type!=="epic"){G(e,t);return}t&&(Rt(),history.pushState({epicId:e,view:B()},"",`/epic/${n.identifier}`)),document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=B()||"epics",c=X().find(k=>k.id===n.project_id),d=n.assignee_id?Mn(n.assignee_id):null,l=d?Ct(d):null,p=s.length,m=s.filter(k=>k.status==="done"||k.status==="canceled").length,v=p>0?Math.round(m/p*100):0,b=ff(),w=b.findIndex(k=>k.id===n.id),_=w>0?b[w-1]:null,T=w>=0&&w<b.length-1?b[w+1]:null,R=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${R?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${_?`data-action="navigate-epic" data-epic-id="${u(_.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${b.length}</span>
                            <button class="issue-nav-btn" ${T?`data-action="navigate-epic" data-epic-id="${u(T.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?g(c.name):"Project"} › ${g(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${g(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Ns(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${v===100?" epic-progress-complete":""}" style="width: ${v}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${m} of ${p} done</span>
                                <span>${v}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?Z({icon:Y.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(k=>{const A=k.assignee_id?Mn(k.assignee_id):null,j=A?Ct(A):null;return`
                                <div class="sub-issue-item" data-issue-id="${u(k.id)}" data-identifier="${u(k.identifier)}">
                                    <span class="sub-issue-status">${Te(k.status)}</span>
                                    <span class="sub-issue-id">${g(k.identifier)}</span>
                                    <span class="sub-issue-title">${g(k.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(k.status||"backlog").replace(/_/g,"-")}">${Ee(k.status)}</span>
                                    ${j?`<span class="sub-issue-assignee">${g(j)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?Z({icon:Y.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):i.map(k=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ca(k.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ua(k)}</span>
                                        <span class="activity-actor">by ${g(da(k))}</span>
                                        <span class="activity-time">${Ze(k.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(k=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(k.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${g(k.author_name||"User")}</span>
                                            <span class="comment-date">${Ze(k.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${g(k.content||"")}</div>
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
                                ${Te(n.status)}
                                ${Ee(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${Je(n.priority)}
                                ${Ae(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${l?g(l):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${ti(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(k=>`
                                    <span class="issue-label" style="background: ${W(k.color)}20; color: ${W(k.color)}">${g(k.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${g(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const C=o.querySelector(".sub-issues-list");C&&C.addEventListener("click",k=>{const A=k.target.closest(".sub-issue-item");A&&A.dataset.issueId&&G(A.dataset.issueId)})}catch(n){x("load epic",n)}}J({"navigate-epic":(e,t)=>{Wa(t.epicId)}});function yf(e){let t=!1,n=null;return function(i){var o,r,c;if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(o=e.isDetailViewActive)!=null&&o.call(e)&&["p","s","t","e","a"].includes(i.key))return;switch(i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case",":e.navigateTo("settings");break}return}switch(i.key){case"c":if((r=e.isDetailViewActive)!=null&&r.call(e))break;i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":if((c=e.isDetailViewActive)!=null&&c.call(e))break;i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function wf(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function un(e,t,n="#issues-list .issue-row"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function kf(e){const t="#issues-list .issue-row";function n(i){return i<0?null:document.querySelectorAll(t)[i]||null}function s(i,a,o,r){const c=n(a);if(!c)return;const d=c.dataset.issueId;if(!d||d.startsWith("temp-"))return;i.preventDefault(),i.stopImmediatePropagation();const l=c.querySelector(`.${r}`);l&&e.showInlineDropdown&&e.showInlineDropdown(i,o,d,l)}return function(a){var c;if(e.getCurrentView()!=="issues"||(c=e.isDetailViewActive)!=null&&c.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":a.preventDefault(),un(r+1,e.setSelectedIndex,t);break;case"k":a.preventDefault(),un(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const d=o[r].dataset.issueId;d&&!d.startsWith("temp-")&&e.viewIssue(d)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const d=o[r].dataset.issueId;d&&!d.startsWith("temp-")&&e.showEditIssueModal(d)}break;case"s":s(a,r,"status","status-btn");break;case"p":s(a,r,"priority","priority-btn");break;case"a":s(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(d=>d.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function $f(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(s){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),un(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),un(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ef(e){const t="#kanban-board .kanban-card";return function(s){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),un(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),un(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const Pl=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let ft=[],Va=null,Ka=0;lt(e=>{e==="currentProject"&&B()==="board"&&Nl()});async function Nl(){$s(-1);const e=++Ka,t=U();if(!t){const s=document.getElementById("kanban-board");s&&(s.innerHTML=Z({icon:Y.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const s=await h.getIssues({project_id:t});if(e!==Ka)return;ft=s,ws(ft),It()}catch(s){if(e!==Ka)return;n&&(n.innerHTML=Z({icon:Y.issues,heading:"Failed to load board",description:"Check your connection and try again"})),x("load board",s)}}function It(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=Pl.map(s=>{const i=ft.filter(a=>a.status===s.key);return`
            <div class="kanban-column" data-action="board-column" data-status="${s.key}">
                <div class="kanban-column-header">
                    <div class="kanban-column-title">
                        <span class="status-dot status-dot-${s.key}"></span>
                        ${s.label}
                    </div>
                    <span class="kanban-column-count">${i.length}</span>
                </div>
                <div class="kanban-column-content">
                    ${i.length===0?`
                        <div class="kanban-column-empty">No issues</div>
                    `:i.map(a=>`
                        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${u(a.id)}" data-identifier="${u(a.identifier)}">
                            <div class="kanban-card-title">${g(a.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${a.identifier}</span>
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Ae(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),xf(t)}function xf(e){const t=Qo();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){$s(-1);return}let s=e?Array.prototype.findIndex.call(n,i=>i.dataset.id===e):-1;s<0&&(s=Math.min(t,n.length-1)),$s(s),n[s].classList.add("keyboard-selected")}function _f(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Va=t.dataset.id,t.classList.add("dragging")}function If(e,t){t.classList.remove("dragging"),Va=null}function Tf(e,t){e.preventDefault(),t.classList.add("drag-over")}function Sf(e,t){t.classList.remove("drag-over")}function Lf(e,t){e.preventDefault(),t.classList.add("drag-over")}function Cf(e,t){t.classList.remove("drag-over")}async function Af(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),s=t.dataset.status,i=ft.find(o=>o.id===n);if(!i)return;const a=i.status;if(i.status=s,ql(s,n),It(),a!==s)try{await h.updateIssue(n,{status:s}),E("Status updated","success")}catch(o){i.status=a,It(),x("update status",o)}}async function Bf(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Va||e.dataTransfer.getData("text/plain"),s=t.dataset.id;if(!n||!s||n===s)return;const i=t.closest(".kanban-column"),a=i==null?void 0:i.dataset.status;if(!a)return;const o=ft.find(c=>c.id===n);if(!o)return;const r=o.status;if(o.status=a,ql(a,n,s),It(),r!==a)try{await h.updateIssue(n,{status:a}),E("Status updated","success")}catch(c){o.status=r,It(),x("update status",c)}}function ql(e,t,n=null){const s=ft.filter(o=>o.status===e&&o.id!==t),i=ft.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];Pl.forEach(o=>{o.key===e?a.push(...s):a.push(...ft.filter(r=>r.status===o.key))}),ft=a}J({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),G(t.id)):e.type==="dragstart"?_f(e,n):e.type==="dragend"?If(e,n):e.type==="dragover"?Lf(e,n):e.type==="dragleave"?Cf(e,n):e.type==="drop"&&Bf(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Tf(e,n):e.type==="dragleave"?Sf(e,n):e.type==="drop"&&Af(e,n)}});const Tt=new Map,Ol=6e4,Ya=100;let ge=null,di=null,ui=null,ss=null,Hl=!1;const jf={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Mf={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Fl={api:null};let Za={...Fl};function Df(e={}){Za={...Fl,...e},ge||(ge=document.createElement("div"),ge.className="issue-tooltip",ge.style.display="none",document.body.appendChild(ge),ge.addEventListener("mouseenter",()=>{clearTimeout(di)}),ge.addEventListener("mouseleave",()=>{Xa()})),Hl||(document.addEventListener("mouseover",Rf),document.addEventListener("mouseout",Pf),Hl=!0)}function Rf(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Nf(t);if(n){if(n===ss&&ge.style.display!=="none"){clearTimeout(di);return}clearTimeout(ui),ui=setTimeout(()=>{qf(t,n)},200)}}function Pf(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(ui),di=setTimeout(()=>{Xa()},150))}function Nf(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function qf(e,t){ss=t;const n=e.getBoundingClientRect();ge.style.left=`${n.left+window.scrollX}px`,ge.style.top=`${n.bottom+window.scrollY+8}px`,ge.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ge.style.display="block";try{const s=await Hf(t);if(ss!==t)return;Ff(s)}catch{if(ss!==t)return;ge.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Xa(){clearTimeout(ui),clearTimeout(di),ge&&(ge.style.display="none"),ss=null}function Of(){const e=Date.now();for(const[t,n]of Tt.entries())e-n.timestamp>=Ol&&Tt.delete(t)}async function Hf(e){Tt.size>Ya/2&&Of();const t=Tt.get(e);if(t&&Date.now()-t.timestamp<Ol)return t.issue;if(!Za.api)throw new Error("API not initialized");const n=await Za.api.getIssueByIdentifier(e);if(Tt.size>=Ya){const s=Array.from(Tt.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Ya/2);for(const[a]of i)Tt.delete(a)}return Tt.set(e,{issue:n,timestamp:Date.now()}),n}function Ff(e){const t=jf[e.status]||"#6b7280",n=Mf[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";ge.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${g(e.identifier)}</span>
            <span class="issue-tooltip-type">${g(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${g(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Uf(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Gf(e.priority)}</span>
        </div>
    `}function Uf(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Gf(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function zf(){pt("issue:created",Wf),pt("issue:updated",Vf),pt("issue:deleted",Kf),pt("comment",Yf),pt("relation",Zf),pt("attestation",Xf),pt("activity",Qf),pt("project",Jf),pt("sprint",eh)}function Wf(e){var i,a,o;const t=Be(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,Xe(r),B()==="issues"&&ct()}else Xe([e,...t]),B()==="issues"&&ct(),E(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=An())==null?void 0:i.id)){const r=kt(),c=r.findIndex(l=>l.id===e.id),d=r.findIndex(l=>l._isOptimistic&&l.title===e.title);if(c===-1&&d===-1)Xt([e,...r]),B()==="my-issues"&&Dn();else if(d>=0){const l=[...r];l[d]=e,Xt(l),B()==="my-issues"&&Dn()}}B()==="my-issues"&&jt({showLoading:!1}),B()==="board"?It():B()==="sprints"&&pi(),B()==="issue-detail"&&e.parent_id===((a=oe())==null?void 0:a.id)&&G((o=oe())==null?void 0:o.id,!1)}function Vf(e){const t=Be();t.some(s=>s.id===e.id)&&Xe(t.map(s=>s.id===e.id?e:s));const n=kt();if(n.some(s=>s.id===e.id)&&Xt(n.map(s=>s.id===e.id?e:s)),B()==="issues")ct();else if(B()==="my-issues")Dn(),jt({showLoading:!1});else if(B()==="board")It();else if(B()==="sprints")pi();else if(B()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&G(e.id)}}function Kf(e){var t;Xe(Be().filter(n=>n.id!==e.id)),Xt(kt().filter(n=>n.id!==e.id)),B()==="issues"?ct():B()==="my-issues"?(Dn(),jt({showLoading:!1})):B()==="board"?It():B()==="sprints"&&pi(),E(`Issue ${e.identifier} deleted`,"info"),B()==="issue-detail"&&((t=oe())==null?void 0:t.id)===e.id&&(E(`Issue ${e.identifier} was deleted`,"warning"),M("my-issues"))}function Yf(e){var t;B()==="my-issues"&&jt({showLoading:!1}),B()==="issue-detail"&&((t=oe())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function Zf(e){var t;if(B()==="issue-detail"){const n=(t=oe())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&G(n,!1)}}function Xf(e){var t;B()==="approvals"&&Dt(),B()==="issue-detail"&&((t=oe())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function Qf(e){var t;B()==="my-issues"&&jt({showLoading:!1}),B()==="issue-detail"&&((t=oe())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function Jf(e,{type:t}){ze().then(()=>{B()==="projects"&&Wn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?E(`New project: ${e.name}`,"info"):t==="deleted"&&E(`Project ${e.name} deleted`,"info")}function pi(){const e=em();e?Gn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Un().catch(t=>console.error("Failed to reload sprints:",t))}function eh(){Jr(),B()==="sprints"?pi():B()==="my-issues"&&ta()}const Ul='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Gl(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function th(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Gl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Ul);n&&n.focus()}}}function mi(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Gl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const s=n.querySelectorAll(Ul);if(s.length===0)return;const i=s[0],a=s[s.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),i.focus();return}e.shiftKey&&document.activeElement===i?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),i.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&mi()});async function nh(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=U();if(!s){E("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=X().find(d=>d.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Xe([r,...Be()]),ct();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const d=await h.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const l=Be(),p=l.findIndex(m=>m.id===a);p!==-1&&(l[p]=d,Xe(l)),ct(),ze(),E("Issue created!","success")}catch(d){Xe(Be().filter(l=>l.id!==a)),ct(),x("create issue",d)}finally{t.disabled=!1,t.placeholder=i,t.focus()}}cg({beforeNavigate:()=>{Ym(),cl(null),Es(null),er(null),mi(),Xa()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Rl(e[1]),!0;if(e[0]==="issue"&&e[1])return Os(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(Os(t)).then(s=>{s&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(ph(e[1]),!0):e[0]==="sprint"&&e[1]?(im(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(pl(e[1]),!0):!1},detailPopstate:e=>e.epicId?(Wa(e.epicId,!1),!0):e.issueId?(G(e.issueId,!1),!0):e.identifier?(Os(e.identifier),!0):e.documentId?(Ge(e.documentId,!1),!0):e.sprintId?(Gn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=_a();e&&X().some(t=>t.id===e)&&Fe(e)},issueNavigate:e=>Os(e),epicNavigate:e=>Rl(e)}),lg({"my-issues":()=>{ta(),Ds(),jt()},approvals:()=>{Dt()},issues:()=>{gr(),uu(),gu(),dr().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const s=document.getElementById("label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),Ss())}const n=e.getAll("exclude_label");if(n.length>0){const s=document.getElementById("exclude-label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),Ls())}}),mr().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}Bt()})},epics:()=>{za()},board:()=>{Nl()},projects:()=>{ze().then(Wn)},sprints:()=>{Un()},rituals:()=>{km()},documents:()=>{On()},team:()=>{El(),Cg(),Na()},settings:()=>{Ga(),ja()}});function sh(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||P()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>P())}function ih(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>ml(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Qm());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Jm()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>gl(a))})}function ah(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Gr("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Gr("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>zr());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>_p());const i=document.getElementById("doc-sort");i&&i.addEventListener("change",()=>xt())}function oh(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>$r())}function rh(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>mu());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Jd());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>eu()),document.querySelectorAll(".multi-select-btn").forEach(v=>{const b=v.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?v.addEventListener("click",()=>Cs("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?v.addEventListener("click",()=>Cs("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?v.addEventListener("click",()=>Cs("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&v.addEventListener("click",()=>Cs("exclude-label-filter-dropdown"))});const s=document.getElementById("status-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>As())});const v=s.querySelector(".btn-small");v&&v.addEventListener("click",()=>Yi())}const i=document.getElementById("priority-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Zi())});const v=i.querySelector(".btn-small");v&&v.addEventListener("click",()=>Xi())}const a=document.getElementById("label-filter-dropdown");if(a){const v=a.querySelector(".btn-small");v&&v.addEventListener("click",()=>Bs())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const v=o.querySelector(".btn-small");v&&v.addEventListener("click",()=>js())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>je());const c=document.getElementById("assignee-filter");c&&c.addEventListener("change",()=>je());const d=document.getElementById("sprint-filter");d&&d.addEventListener("change",()=>je());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>Bt());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>vr());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",v=>nh(v))}function lh(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Em(t.dataset.tab))})}function ch(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>$l());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Rn()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),M(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Ig());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>mi());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>th());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Rn())}J({"navigate-to":(e,t)=>{M(t.view)},"set-current-project":(e,t,n)=>{Fe(n.value)},showCreateIssueModal:()=>Rn(),showCreateEpicModal:()=>vf(),showCreateProjectModal:()=>ul(),showCreateDocumentModal:()=>Vr(),showCreateTeamModal:()=>_l(),showEditTeamModal:()=>Dg(),showInviteModal:()=>xl(),showCreateApiKeyModal:()=>nf(),showCreateAgentModal:()=>bg(),resetOnboarding:()=>Bl(),logout:()=>jl(),navigateToProjects:()=>M("projects")}),document.addEventListener("DOMContentLoaded",async()=>{if(Yd(),ef(),ch(),sh(),oh(),rh(),lh(),ih(),ah(),dh(),uh(),Df({api:h}),mg(),zf(),h.getToken())try{const e=await h.getMe();ys(e),await Jn()}catch{h.logout(),Fa()}else Fa()});function dh(){const e=document.getElementById("theme-toggle");if(!e)return;const t=bd()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),yd(n?"light":"dark")})}function uh(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");yl(s)}}})}async function ph(e){try{await Ge(e,!1)}catch{M("documents",!1)}}const Qa=()=>["issue-detail-view","epic-detail-view","document-detail-view"].some(e=>{const t=document.getElementById(e);return t&&!t.classList.contains("hidden")});document.addEventListener("keydown",kf({getCurrentView:B,getSelectedIndex:Zo,setSelectedIndex:Bn,viewIssue:G,showEditIssueModal:Dr,showInlineDropdown:na,isModalOpen:Sn,isCommandPaletteOpen:ri,isDetailViewActive:Qa})),document.addEventListener("keydown",$f({getCurrentView:B,getSelectedIndex:Hd,setSelectedIndex:Xo,viewDocument:Ge,showEditDocumentModal:Kr,isModalOpen:Sn,isCommandPaletteOpen:ri,isDetailViewActive:Qa})),document.addEventListener("keydown",Ef({getCurrentView:B,getSelectedIndex:Qo,setSelectedIndex:$s,viewIssue:G,isModalOpen:Sn,isCommandPaletteOpen:ri,isDetailViewActive:Qa})),document.addEventListener("keydown",yf({closeModal:P,closeSidebar:mi,navigateTo:M,showCreateIssueModal:Rn,showKeyboardShortcutsHelp:Dl,isModalOpen:Sn,focusSearch:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),At()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))}})),rf([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>M("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>M("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>M("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>M("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>M("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>M("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>M("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>M("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>M("approvals"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>M("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>M("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{M("issues"),setTimeout(Rn,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{M("projects"),setTimeout(ul,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{M("documents"),setTimeout(Vr,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>_l(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{M("team"),setTimeout(xl,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Dl(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Bl(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>jl(),category:"Account"}]),document.addEventListener("keydown",wf({isModalOpen:Sn,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:ri,openCommandPalette:lf,closeCommandPalette:li})),window.marked=N,window.DOMPurify=Uo,console.log("Chaotic frontend loaded via Vite")})();
