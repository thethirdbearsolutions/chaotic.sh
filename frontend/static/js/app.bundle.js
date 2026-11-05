var p0=Object.defineProperty;var m0=(Ft,Ne,_n)=>Ne in Ft?p0(Ft,Ne,{enumerable:!0,configurable:!0,writable:!0,value:_n}):Ft[Ne]=_n;var se=(Ft,Ne,_n)=>m0(Ft,typeof Ne!="symbol"?Ne+"":Ne,_n);(function(){"use strict";var Ld;function Ft(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ne=Ft();function _n(e){Ne=e}var zi={exec:()=>null};function X(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Oe.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Oe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Rh=/^(?:[ \t]*(?:\n|$))+/,jh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ph=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Vi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,qh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Tr=/(?:[*+-]|\d{1,9}[.)])/,Gd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zd=X(Gd).replace(/bull/g,Tr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Nh=X(Gd).replace(/bull/g,Tr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Lr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Oh=/^[^\n]+/,Ar=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Hh=X(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ar).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Fh=X(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Tr).getRegex(),va="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Cr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Uh=X("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Cr).replace("tag",va).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Vd=X(Lr).replace("hr",Vi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",va).getRegex(),Gh=X(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Vd).getRegex(),Br={blockquote:Gh,code:jh,def:Hh,fences:Ph,heading:qh,hr:Vi,html:Uh,lheading:zd,list:Fh,newline:Rh,paragraph:Vd,table:zi,text:Oh},Wd=X("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Vi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",va).getRegex(),zh={...Br,lheading:Nh,table:Wd,paragraph:X(Lr).replace("hr",Vi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Wd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",va).getRegex()},Vh={...Br,html:X(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Cr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:zi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:X(Lr).replace("hr",Vi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Wh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Kh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Kd=/^( {2,}|\\)\n(?!\s*$)/,Yh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ba=/[\p{P}\p{S}]/u,Dr=/[\s\p{P}\p{S}]/u,Yd=/[^\s\p{P}\p{S}]/u,Qh=X(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Dr).getRegex(),Qd=/(?!~)[\p{P}\p{S}]/u,Zh=/(?!~)[\s\p{P}\p{S}]/u,Xh=/(?:[^\s\p{P}\p{S}]|~)/u,Jh=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Zd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ev=X(Zd,"u").replace(/punct/g,ba).getRegex(),tv=X(Zd,"u").replace(/punct/g,Qd).getRegex(),Xd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",nv=X(Xd,"gu").replace(/notPunctSpace/g,Yd).replace(/punctSpace/g,Dr).replace(/punct/g,ba).getRegex(),iv=X(Xd,"gu").replace(/notPunctSpace/g,Xh).replace(/punctSpace/g,Zh).replace(/punct/g,Qd).getRegex(),sv=X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Yd).replace(/punctSpace/g,Dr).replace(/punct/g,ba).getRegex(),av=X(/\\(punct)/,"gu").replace(/punct/g,ba).getRegex(),ov=X(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),rv=X(Cr).replace("(?:-->|$)","-->").getRegex(),lv=X("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",rv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ya=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,cv=X(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ya).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Jd=X(/^!?\[(label)\]\[(ref)\]/).replace("label",ya).replace("ref",Ar).getRegex(),eu=X(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ar).getRegex(),dv=X("reflink|nolink(?!\\()","g").replace("reflink",Jd).replace("nolink",eu).getRegex(),Mr={_backpedal:zi,anyPunctuation:av,autolink:ov,blockSkip:Jh,br:Kd,code:Kh,del:zi,emStrongLDelim:ev,emStrongRDelimAst:nv,emStrongRDelimUnd:sv,escape:Wh,link:cv,nolink:eu,punctuation:Qh,reflink:Jd,reflinkSearch:dv,tag:lv,text:Yh,url:zi},uv={...Mr,link:X(/^!?\[(label)\]\((.*?)\)/).replace("label",ya).getRegex(),reflink:X(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ya).getRegex()},Rr={...Mr,emStrongRDelimAst:iv,emStrongLDelim:tv,url:X(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},pv={...Rr,br:X(Kd).replace("{2,}","*").getRegex(),text:X(Rr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},wa={normal:Br,gfm:zh,pedantic:Vh},Wi={normal:Mr,gfm:Rr,breaks:pv,pedantic:uv},mv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},tu=e=>mv[e];function xt(e,t){if(t){if(Oe.escapeTest.test(e))return e.replace(Oe.escapeReplace,tu)}else if(Oe.escapeTestNoEncode.test(e))return e.replace(Oe.escapeReplaceNoEncode,tu);return e}function nu(e){try{e=encodeURI(e).replace(Oe.percentDecode,"%")}catch{return null}return e}function iu(e,t){var a;const n=e.replace(Oe.findPipe,(o,r,l)=>{let d=!1,c=r;for(;--c>=0&&l[c]==="\\";)d=!d;return d?"|":" |"}),i=n.split(Oe.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Oe.slashPipe,"|");return i}function Ki(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function fv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function su(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function gv(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var $a=class{constructor(e){se(this,"options");se(this,"rules");se(this,"lexer");this.options=e||Ne}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ki(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=gv(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Ki(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ki(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Ki(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const d=r.join(`
`),c=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${d}`:d,s=s?`${s}
${c}`:c;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,a,!0),this.lexer.state.top=p,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,i=i.substring(0,i.length-f.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,d="",c="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),f=e.split(`
`,1)[0],g=!p.trim(),b=0;if(this.options.pedantic?(b=2,c=p.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,c=p.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(d+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const L=this.rules.other.nextBulletRegex(b),x=this.rules.other.hrRegex(b),M=this.rules.other.fencesBeginRegex(b),j=this.rules.other.headingBeginRegex(b),I=this.rules.other.htmlBeginRegex(b);for(;e;){const w=e.split(`
`,1)[0];let D;if(f=w,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),D=f):D=f.replace(this.rules.other.tabCharGlobal,"    "),M.test(f)||j.test(f)||I.test(f)||L.test(f)||x.test(f))break;if(D.search(this.rules.other.nonSpaceChar)>=b||!f.trim())c+=`
`+D.slice(b);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||M.test(p)||j.test(p)||x.test(p))break;c+=`
`+f}!g&&!f.trim()&&(g=!0),d+=w+`
`,e=e.substring(w.length+1),p=D.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0));let y=null,$;this.options.gfm&&(y=this.rules.other.listIsTask.exec(c),y&&($=y[0]!=="[ ] ",c=c.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:d,task:!!y,checked:$,loose:!1,text:c,tokens:[]}),s.raw+=d}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const d=s.items[l].tokens.filter(p=>p.type==="space"),c=d.length>0&&d.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=c}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=iu(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(iu(r,a.header.length).map((l,d)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[d]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Ki(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=fv(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),su(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return su(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,d=0;const c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+a);(i=c.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){d+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+d);const p=[...i[0]][0].length,f=e.slice(0,a+i.index+p+r);if(Math.min(a,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ut=class Fd{constructor(t){se(this,"tokens");se(this,"options");se(this,"state");se(this,"tokenizer");se(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ne,this.options.tokenizer=this.options.tokenizer||new $a,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Oe,block:wa.normal,inline:Wi.normal};this.options.pedantic?(n.block=wa.pedantic,n.inline=Wi.pedantic):this.options.gfm&&(n.block=wa.gfm,this.options.breaks?n.inline=Wi.breaks:n.inline=Wi.gfm),this.tokenizer.rules=n}static get rules(){return{block:wa,inline:Wi}}static lex(t,n){return new Fd(n).lex(t)}static lexInline(t,n){return new Fd(n).inlineTokens(t)}lex(t){t=t.replace(Oe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Oe.tabCharGlobal,"    ").replace(Oe.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(d=>(r=d.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const d=n.at(-1);r.raw.length===1&&d!==void 0?d.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let d=1/0;const c=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},c),typeof p=="number"&&p>=0&&(d=Math.min(d,p))}),d<1/0&&d>=0&&(l=t.substring(0,d+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const d=n.at(-1);i&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(t){const d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,d;let i=t,s=null;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let c;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(c=f.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);const f=n.at(-1);c.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,i,o)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let p=t;if((d=this.options.extensions)!=null&&d.startInline){let f=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(p)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(o=c.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},ka=class{constructor(e){se(this,"options");se(this,"parser");this.options=e||Ne}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Oe.notSpaceStart))==null?void 0:a[0],s=e.replace(Oe.endingNewline,"")+`
`;return i?'<pre><code class="language-'+xt(i)+'">'+(n?s:xt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:xt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+xt(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${xt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=nu(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+xt(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=nu(e);if(s===null)return xt(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${xt(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:xt(e.text)}},jr=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Gt=class Ud{constructor(t){se(this,"options");se(this,"renderer");se(this,"textRenderer");this.options=t||Ne,this.options.renderer=this.options.renderer||new ka,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new jr}static parse(t,n){return new Ud(n).parse(t)}static parseInline(t,n){return new Ud(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const d=r,c=this.options.extensions.renderers[d.type].call({parser:this},d);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type)){i+=c||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let d=l,c=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],c+=`
`+this.renderer.text(d);n?i+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):i+=c;continue}default:{const d='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const d=this.options.extensions.renderers[r.type].call({parser:this},r);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=d||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const d='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return i}},_a=(Ld=class{constructor(e){se(this,"options");se(this,"block");this.options=e||Ne}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?Gt.parse:Gt.parseInline}},se(Ld,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ld),hv=class{constructor(...e){se(this,"defaults",Ft());se(this,"options",this.setOptions);se(this,"parse",this.parseMarkdown(!0));se(this,"parseInline",this.parseMarkdown(!1));se(this,"Parser",Gt);se(this,"Renderer",ka);se(this,"TextRenderer",jr);se(this,"Lexer",Ut);se(this,"Tokenizer",$a);se(this,"Hooks",_a);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new ka(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...d)=>{let c=r.apply(s,d);return c===!1&&(c=l.apply(s,d)),c||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new $a(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...d)=>{let c=r.apply(s,d);return c===!1&&(c=l.apply(s,d)),c}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new _a;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];_a.passThroughHooks.has(a)?s[o]=d=>{if(this.defaults.async)return Promise.resolve(r.call(s,d)).then(p=>l.call(s,p));const c=r.call(s,d);return l.call(s,c)}:s[o]=(...d)=>{let c=r.apply(s,d);return c===!1&&(c=l.apply(s,d)),c}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return Gt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ut.lex:Ut.lexInline,l=a.hooks?a.hooks.provideParser():e?Gt.parse:Gt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(d=>r(d,a)).then(d=>a.hooks?a.hooks.processAllTokens(d):d).then(d=>a.walkTokens?Promise.all(this.walkTokens(d,a.walkTokens)).then(()=>d):d).then(d=>l(d,a)).then(d=>a.hooks?a.hooks.postprocess(d):d).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let d=r(n,a);a.hooks&&(d=a.hooks.processAllTokens(d)),a.walkTokens&&this.walkTokens(d,a.walkTokens);let c=l(d,a);return a.hooks&&(c=a.hooks.postprocess(c)),c}catch(d){return o(d)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+xt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},En=new hv;function Y(e,t){return En.parse(e,t)}Y.options=Y.setOptions=function(e){return En.setOptions(e),Y.defaults=En.defaults,_n(Y.defaults),Y},Y.getDefaults=Ft,Y.defaults=Ne,Y.use=function(...e){return En.use(...e),Y.defaults=En.defaults,_n(Y.defaults),Y},Y.walkTokens=function(e,t){return En.walkTokens(e,t)},Y.parseInline=En.parseInline,Y.Parser=Gt,Y.parser=Gt.parse,Y.Renderer=ka,Y.TextRenderer=jr,Y.Lexer=Ut,Y.lexer=Ut.lex,Y.Tokenizer=$a,Y.Hooks=_a,Y.parse=Y,Y.options,Y.setOptions,Y.use,Y.walkTokens,Y.parseInline,Gt.parse,Ut.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:au,setPrototypeOf:ou,isFrozen:vv,getPrototypeOf:bv,getOwnPropertyDescriptor:yv}=Object;let{freeze:He,seal:ot,create:Pr}=Object,{apply:qr,construct:Nr}=typeof Reflect<"u"&&Reflect;He||(He=function(t){return t}),ot||(ot=function(t){return t}),qr||(qr=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),Nr||(Nr=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Ea=Ue(Array.prototype.forEach),wv=Ue(Array.prototype.lastIndexOf),ru=Ue(Array.prototype.pop),Yi=Ue(Array.prototype.push),$v=Ue(Array.prototype.splice),xa=Ue(String.prototype.toLowerCase),Or=Ue(String.prototype.toString),Hr=Ue(String.prototype.match),Qi=Ue(String.prototype.replace),kv=Ue(String.prototype.indexOf),_v=Ue(String.prototype.trim),yt=Ue(Object.prototype.hasOwnProperty),Fe=Ue(RegExp.prototype.test),Zi=Ev(TypeError);function Ue(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return qr(e,t,i)}}function Ev(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Nr(e,n)}}function z(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:xa;ou&&ou(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(vv(t)||(t[i]=a),s=a)}e[s]=!0}return e}function xv(e){for(let t=0;t<e.length;t++)yt(e,t)||(e[t]=null);return e}function It(e){const t=Pr(null);for(const[n,i]of au(e))yt(e,n)&&(Array.isArray(i)?t[n]=xv(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=It(i):t[n]=i);return t}function Xi(e,t){for(;e!==null;){const i=yv(e,t);if(i){if(i.get)return Ue(i.get);if(typeof i.value=="function")return Ue(i.value)}e=bv(e)}function n(){return null}return n}const lu=He(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Fr=He(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ur=He(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Iv=He(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Gr=He(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Sv=He(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),cu=He(["#text"]),du=He(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),zr=He(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),uu=He(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ia=He(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Tv=ot(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Lv=ot(/<%[\w\W]*|[\w\W]*%>/gm),Av=ot(/\$\{[\w\W]*/gm),Cv=ot(/^data-[\-\w.\u00B7-\uFFFF]+$/),Bv=ot(/^aria-[\-\w]+$/),pu=ot(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Dv=ot(/^(?:\w+script|data):/i),Mv=ot(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),mu=ot(/^html$/i),Rv=ot(/^[a-z][.\w]*(-[.\w]+)+$/i);var fu=Object.freeze({__proto__:null,ARIA_ATTR:Bv,ATTR_WHITESPACE:Mv,CUSTOM_ELEMENT:Rv,DATA_ATTR:Cv,DOCTYPE_NAME:mu,ERB_EXPR:Lv,IS_ALLOWED_URI:pu,IS_SCRIPT_OR_DATA:Dv,MUSTACHE_EXPR:Tv,TMPLIT_EXPR:Av});const Ji={element:1,text:3,progressingInstruction:7,comment:8,document:9},jv=function(){return typeof window>"u"?null:window},Pv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},gu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:jv();const t=P=>hu(P);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Ji.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:d,NamedNodeMap:c=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:g}=e,b=l.prototype,y=Xi(b,"cloneNode"),$=Xi(b,"remove"),L=Xi(b,"nextSibling"),x=Xi(b,"childNodes"),M=Xi(b,"parentNode");if(typeof o=="function"){const P=n.createElement("template");P.content&&P.content.ownerDocument&&(n=P.content.ownerDocument)}let j,I="";const{implementation:w,createNodeIterator:D,createDocumentFragment:O,getElementsByTagName:K}=n,{importNode:_e}=i;let E=gu();t.isSupported=typeof au=="function"&&typeof M=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:q,ERB_EXPR:B,TMPLIT_EXPR:Z,DATA_ATTR:Ee,ARIA_ATTR:le,IS_SCRIPT_OR_DATA:bt,ATTR_WHITESPACE:A,CUSTOM_ELEMENT:ce}=fu;let{IS_ALLOWED_URI:he}=fu,de=null;const ee=z({},[...lu,...Fr,...Ur,...Gr,...cu]);let De=null;const fh=z({},[...du,...zr,...uu,...Ia]);let ve=Object.seal(Pr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),fa=null,Ad=null;const qi=Object.seal(Pr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let gh=!0,Cd=!0,hh=!1,vh=!0,Ni=!1,$r=!0,Vn=!1,Bd=!1,Dd=!1,Oi=!1,kr=!1,_r=!1,bh=!0,yh=!1;const s0="user-content-";let Md=!0,ga=!1,Hi={},Ot=null;const Rd=z({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let wh=null;const $h=z({},["audio","video","img","source","image","track"]);let jd=null;const kh=z({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Er="http://www.w3.org/1998/Math/MathML",xr="http://www.w3.org/2000/svg",sn="http://www.w3.org/1999/xhtml";let Fi=sn,Pd=!1,qd=null;const a0=z({},[Er,xr,sn],Or);let Ir=z({},["mi","mo","mn","ms","mtext"]),Sr=z({},["annotation-xml"]);const o0=z({},["title","style","font","a","script"]);let ha=null;const r0=["application/xhtml+xml","text/html"],l0="text/html";let xe=null,Ui=null;const c0=n.createElement("form"),_h=function(v){return v instanceof RegExp||v instanceof Function},Nd=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ui&&Ui===v)){if((!v||typeof v!="object")&&(v={}),v=It(v),ha=r0.indexOf(v.PARSER_MEDIA_TYPE)===-1?l0:v.PARSER_MEDIA_TYPE,xe=ha==="application/xhtml+xml"?Or:xa,de=yt(v,"ALLOWED_TAGS")?z({},v.ALLOWED_TAGS,xe):ee,De=yt(v,"ALLOWED_ATTR")?z({},v.ALLOWED_ATTR,xe):fh,qd=yt(v,"ALLOWED_NAMESPACES")?z({},v.ALLOWED_NAMESPACES,Or):a0,jd=yt(v,"ADD_URI_SAFE_ATTR")?z(It(kh),v.ADD_URI_SAFE_ATTR,xe):kh,wh=yt(v,"ADD_DATA_URI_TAGS")?z(It($h),v.ADD_DATA_URI_TAGS,xe):$h,Ot=yt(v,"FORBID_CONTENTS")?z({},v.FORBID_CONTENTS,xe):Rd,fa=yt(v,"FORBID_TAGS")?z({},v.FORBID_TAGS,xe):It({}),Ad=yt(v,"FORBID_ATTR")?z({},v.FORBID_ATTR,xe):It({}),Hi=yt(v,"USE_PROFILES")?v.USE_PROFILES:!1,gh=v.ALLOW_ARIA_ATTR!==!1,Cd=v.ALLOW_DATA_ATTR!==!1,hh=v.ALLOW_UNKNOWN_PROTOCOLS||!1,vh=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ni=v.SAFE_FOR_TEMPLATES||!1,$r=v.SAFE_FOR_XML!==!1,Vn=v.WHOLE_DOCUMENT||!1,Oi=v.RETURN_DOM||!1,kr=v.RETURN_DOM_FRAGMENT||!1,_r=v.RETURN_TRUSTED_TYPE||!1,Dd=v.FORCE_BODY||!1,bh=v.SANITIZE_DOM!==!1,yh=v.SANITIZE_NAMED_PROPS||!1,Md=v.KEEP_CONTENT!==!1,ga=v.IN_PLACE||!1,he=v.ALLOWED_URI_REGEXP||pu,Fi=v.NAMESPACE||sn,Ir=v.MATHML_TEXT_INTEGRATION_POINTS||Ir,Sr=v.HTML_INTEGRATION_POINTS||Sr,ve=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&_h(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ve.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&_h(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ve.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ve.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ni&&(Cd=!1),kr&&(Oi=!0),Hi&&(de=z({},cu),De=[],Hi.html===!0&&(z(de,lu),z(De,du)),Hi.svg===!0&&(z(de,Fr),z(De,zr),z(De,Ia)),Hi.svgFilters===!0&&(z(de,Ur),z(De,zr),z(De,Ia)),Hi.mathMl===!0&&(z(de,Gr),z(De,uu),z(De,Ia))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?qi.tagCheck=v.ADD_TAGS:(de===ee&&(de=It(de)),z(de,v.ADD_TAGS,xe))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?qi.attributeCheck=v.ADD_ATTR:(De===fh&&(De=It(De)),z(De,v.ADD_ATTR,xe))),v.ADD_URI_SAFE_ATTR&&z(jd,v.ADD_URI_SAFE_ATTR,xe),v.FORBID_CONTENTS&&(Ot===Rd&&(Ot=It(Ot)),z(Ot,v.FORBID_CONTENTS,xe)),v.ADD_FORBID_CONTENTS&&(Ot===Rd&&(Ot=It(Ot)),z(Ot,v.ADD_FORBID_CONTENTS,xe)),Md&&(de["#text"]=!0),Vn&&z(de,["html","head","body"]),de.table&&(z(de,["tbody"]),delete fa.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw Zi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Zi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=v.TRUSTED_TYPES_POLICY,I=j.createHTML("")}else j===void 0&&(j=Pv(g,s)),j!==null&&typeof I=="string"&&(I=j.createHTML(""));He&&He(v),Ui=v}},Eh=z({},[...Fr,...Ur,...Iv]),xh=z({},[...Gr,...Sv]),d0=function(v){let S=M(v);(!S||!S.tagName)&&(S={namespaceURI:Fi,tagName:"template"});const R=xa(v.tagName),ue=xa(S.tagName);return qd[v.namespaceURI]?v.namespaceURI===xr?S.namespaceURI===sn?R==="svg":S.namespaceURI===Er?R==="svg"&&(ue==="annotation-xml"||Ir[ue]):!!Eh[R]:v.namespaceURI===Er?S.namespaceURI===sn?R==="math":S.namespaceURI===xr?R==="math"&&Sr[ue]:!!xh[R]:v.namespaceURI===sn?S.namespaceURI===xr&&!Sr[ue]||S.namespaceURI===Er&&!Ir[ue]?!1:!xh[R]&&(o0[R]||!Eh[R]):!!(ha==="application/xhtml+xml"&&qd[v.namespaceURI]):!1},Ht=function(v){Yi(t.removed,{element:v});try{M(v).removeChild(v)}catch{$(v)}},Wn=function(v,S){try{Yi(t.removed,{attribute:S.getAttributeNode(v),from:S})}catch{Yi(t.removed,{attribute:null,from:S})}if(S.removeAttribute(v),v==="is")if(Oi||kr)try{Ht(S)}catch{}else try{S.setAttribute(v,"")}catch{}},Ih=function(v){let S=null,R=null;if(Dd)v="<remove></remove>"+v;else{const we=Hr(v,/^[\r\n\t ]+/);R=we&&we[0]}ha==="application/xhtml+xml"&&Fi===sn&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");const ue=j?j.createHTML(v):v;if(Fi===sn)try{S=new f().parseFromString(ue,ha)}catch{}if(!S||!S.documentElement){S=w.createDocument(Fi,"template",null);try{S.documentElement.innerHTML=Pd?I:ue}catch{}}const qe=S.body||S.documentElement;return v&&R&&qe.insertBefore(n.createTextNode(R),qe.childNodes[0]||null),Fi===sn?K.call(S,Vn?"html":"body")[0]:Vn?S.documentElement:qe},Sh=function(v){return D.call(v.ownerDocument||v,v,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Od=function(v){return v instanceof p&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof c)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},Th=function(v){return typeof r=="function"&&v instanceof r};function an(P,v,S){Ea(P,R=>{R.call(t,v,S,Ui)})}const Lh=function(v){let S=null;if(an(E.beforeSanitizeElements,v,null),Od(v))return Ht(v),!0;const R=xe(v.nodeName);if(an(E.uponSanitizeElement,v,{tagName:R,allowedTags:de}),$r&&v.hasChildNodes()&&!Th(v.firstElementChild)&&Fe(/<[/\w!]/g,v.innerHTML)&&Fe(/<[/\w!]/g,v.textContent)||v.nodeType===Ji.progressingInstruction||$r&&v.nodeType===Ji.comment&&Fe(/<[/\w]/g,v.data))return Ht(v),!0;if(!(qi.tagCheck instanceof Function&&qi.tagCheck(R))&&(!de[R]||fa[R])){if(!fa[R]&&Ch(R)&&(ve.tagNameCheck instanceof RegExp&&Fe(ve.tagNameCheck,R)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(R)))return!1;if(Md&&!Ot[R]){const ue=M(v)||v.parentNode,qe=x(v)||v.childNodes;if(qe&&ue){const we=qe.length;for(let it=we-1;it>=0;--it){const on=y(qe[it],!0);on.__removalCount=(v.__removalCount||0)+1,ue.insertBefore(on,L(v))}}}return Ht(v),!0}return v instanceof l&&!d0(v)||(R==="noscript"||R==="noembed"||R==="noframes")&&Fe(/<\/no(script|embed|frames)/i,v.innerHTML)?(Ht(v),!0):(Ni&&v.nodeType===Ji.text&&(S=v.textContent,Ea([q,B,Z],ue=>{S=Qi(S,ue," ")}),v.textContent!==S&&(Yi(t.removed,{element:v.cloneNode()}),v.textContent=S)),an(E.afterSanitizeElements,v,null),!1)},Ah=function(v,S,R){if(bh&&(S==="id"||S==="name")&&(R in n||R in c0))return!1;if(!(Cd&&!Ad[S]&&Fe(Ee,S))){if(!(gh&&Fe(le,S))){if(!(qi.attributeCheck instanceof Function&&qi.attributeCheck(S,v))){if(!De[S]||Ad[S]){if(!(Ch(v)&&(ve.tagNameCheck instanceof RegExp&&Fe(ve.tagNameCheck,v)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(v))&&(ve.attributeNameCheck instanceof RegExp&&Fe(ve.attributeNameCheck,S)||ve.attributeNameCheck instanceof Function&&ve.attributeNameCheck(S,v))||S==="is"&&ve.allowCustomizedBuiltInElements&&(ve.tagNameCheck instanceof RegExp&&Fe(ve.tagNameCheck,R)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(R))))return!1}else if(!jd[S]){if(!Fe(he,Qi(R,A,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&v!=="script"&&kv(R,"data:")===0&&wh[v])){if(!(hh&&!Fe(bt,Qi(R,A,"")))){if(R)return!1}}}}}}}return!0},Ch=function(v){return v!=="annotation-xml"&&Hr(v,ce)},Bh=function(v){an(E.beforeSanitizeAttributes,v,null);const{attributes:S}=v;if(!S||Od(v))return;const R={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:De,forceKeepAttr:void 0};let ue=S.length;for(;ue--;){const qe=S[ue],{name:we,namespaceURI:it,value:on}=qe,Gi=xe(we),Hd=on;let Me=we==="value"?Hd:_v(Hd);if(R.attrName=Gi,R.attrValue=Me,R.keepAttr=!0,R.forceKeepAttr=void 0,an(E.uponSanitizeAttribute,v,R),Me=R.attrValue,yh&&(Gi==="id"||Gi==="name")&&(Wn(we,v),Me=s0+Me),$r&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,Me)){Wn(we,v);continue}if(Gi==="attributename"&&Hr(Me,"href")){Wn(we,v);continue}if(R.forceKeepAttr)continue;if(!R.keepAttr){Wn(we,v);continue}if(!vh&&Fe(/\/>/i,Me)){Wn(we,v);continue}Ni&&Ea([q,B,Z],Mh=>{Me=Qi(Me,Mh," ")});const Dh=xe(v.nodeName);if(!Ah(Dh,Gi,Me)){Wn(we,v);continue}if(j&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!it)switch(g.getAttributeType(Dh,Gi)){case"TrustedHTML":{Me=j.createHTML(Me);break}case"TrustedScriptURL":{Me=j.createScriptURL(Me);break}}if(Me!==Hd)try{it?v.setAttributeNS(it,we,Me):v.setAttribute(we,Me),Od(v)?Ht(v):ru(t.removed)}catch{Wn(we,v)}}an(E.afterSanitizeAttributes,v,null)},u0=function P(v){let S=null;const R=Sh(v);for(an(E.beforeSanitizeShadowDOM,v,null);S=R.nextNode();)an(E.uponSanitizeShadowNode,S,null),Lh(S),Bh(S),S.content instanceof a&&P(S.content);an(E.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(P){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,R=null,ue=null,qe=null;if(Pd=!P,Pd&&(P="<!-->"),typeof P!="string"&&!Th(P))if(typeof P.toString=="function"){if(P=P.toString(),typeof P!="string")throw Zi("dirty is not a string, aborting")}else throw Zi("toString is not a function");if(!t.isSupported)return P;if(Bd||Nd(v),t.removed=[],typeof P=="string"&&(ga=!1),ga){if(P.nodeName){const on=xe(P.nodeName);if(!de[on]||fa[on])throw Zi("root node is forbidden and cannot be sanitized in-place")}}else if(P instanceof r)S=Ih("<!---->"),R=S.ownerDocument.importNode(P,!0),R.nodeType===Ji.element&&R.nodeName==="BODY"||R.nodeName==="HTML"?S=R:S.appendChild(R);else{if(!Oi&&!Ni&&!Vn&&P.indexOf("<")===-1)return j&&_r?j.createHTML(P):P;if(S=Ih(P),!S)return Oi?null:_r?I:""}S&&Dd&&Ht(S.firstChild);const we=Sh(ga?P:S);for(;ue=we.nextNode();)Lh(ue),Bh(ue),ue.content instanceof a&&u0(ue.content);if(ga)return P;if(Oi){if(kr)for(qe=O.call(S.ownerDocument);S.firstChild;)qe.appendChild(S.firstChild);else qe=S;return(De.shadowroot||De.shadowrootmode)&&(qe=_e.call(i,qe,!0)),qe}let it=Vn?S.outerHTML:S.innerHTML;return Vn&&de["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&Fe(mu,S.ownerDocument.doctype.name)&&(it="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+it),Ni&&Ea([q,B,Z],on=>{it=Qi(it,on," ")}),j&&_r?j.createHTML(it):it},t.setConfig=function(){let P=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Nd(P),Bd=!0},t.clearConfig=function(){Ui=null,Bd=!1},t.isValidAttribute=function(P,v,S){Ui||Nd({});const R=xe(P),ue=xe(v);return Ah(R,ue,S)},t.addHook=function(P,v){typeof v=="function"&&Yi(E[P],v)},t.removeHook=function(P,v){if(v!==void 0){const S=wv(E[P],v);return S===-1?void 0:$v(E[P],S,1)[0]}return ru(E[P])},t.removeHooks=function(P){E[P]=[]},t.removeAllHooks=function(){E=gu()},t}var vu=hu();const Vr="chaotic_";function Xe(e){try{return localStorage.getItem(Vr+e)}catch{return null}}function rt(e,t){try{localStorage.setItem(Vr+e,t)}catch{}}function St(e){try{localStorage.removeItem(Vr+e)}catch{}}function Wr(){return Xe("token")}function qv(e){e?rt("token",e):St("token")}function Nv(){return Xe("theme")}function Ov(e){rt("theme",e)}function bu(){return Xe("last_project")}function yu(e){rt("last_project",e)}function Hv(){return Xe("onboarding_complete")==="true"}function Fv(){rt("onboarding_complete","true")}function Uv(){St("onboarding_complete")}function Gv(e){return e?Xe(`issues_filters_${e}`):null}function zv(e,t){e&&(t?rt(`issues_filters_${e}`,t):St(`issues_filters_${e}`))}function wu(e){return Xe(`comment_draft_${e}`)}function Sa(e,t){t?rt(`comment_draft_${e}`,t):St(`comment_draft_${e}`)}function $u(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function es(e){const t=Xe(`description_draft_${e}`);if(!t)return null;const n=$u(t);return n?n.draft:t}function ku(e){const t=Xe(`description_draft_${e}`);if(!t)return null;const n=$u(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function xn(e,t,n=""){t?rt(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):St(`description_draft_${e}`)}function _u(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Eu(e){var n;const t=Xe(`document_draft_${e}`);return t?((n=_u(t))==null?void 0:n.draft)??null:null}function Vv(e){const t=Xe(`document_draft_${e}`);if(!t)return null;const n=_u(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Ta(e,t,n=null){t&&(t.title||t.content||t.icon)?rt(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):St(`document_draft_${e}`)}function Wv(){return{title:Xe("create_issue_title"),description:Xe("create_issue_description")}}function xu(e,t){e?rt("create_issue_title",e):St("create_issue_title"),t?rt("create_issue_description",t):St("create_issue_description")}function Kv(){St("create_issue_title"),St("create_issue_description")}function Yv(){return Xe("doc_view_mode")}function Qv(e){rt("doc_view_mode",e)}function Zv(){return Xe("approvals_explainer_dismissed")==="1"}function Xv(){rt("approvals_explainer_dismissed","1")}const Jv="chaotic-boot-cache",Kr="snapshot",Yr="last",Iu=1,eb=336*60*60*1e3,tb=250;let In=null;function nb(){return In||(In=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(Jv,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore(Kr),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),In=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),In.catch(()=>{In=null}),In)}function Qr(e,t){return nb().then(n=>new Promise((i,s)=>{const a=n.transaction(Kr,e),o=t(a.objectStore(Kr));a.oncomplete=()=>i(o==null?void 0:o.result),a.onerror=()=>s(a.error),a.onabort=()=>s(a.error)}))}function Su(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function ib(e){if(!e)return Promise.resolve(null);const t=Qr("readonly",i=>i.get(Yr)).then(i=>!i||i.version!==Iu||i.userId!==e||!(Date.now()-i.savedAt<eb)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),tb));return Promise.race([t,n])}function sb(e,t){if(!e)return Promise.resolve();const n={...t,version:Iu,userId:e,savedAt:Date.now()};return Qr("readwrite",i=>i.put(n,Yr)).then(()=>{},()=>{})}function Zr(){return Qr("readwrite",e=>e.delete(Yr)).then(()=>{},()=>{})}const ab="/api";class ob{constructor(){this.token=Wr()}setToken(t){this.token=t,qv(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s},o=typeof Blob<"u"&&i instanceof Blob;o&&(s["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=o?i:JSON.stringify(i));let r;try{r=await fetch(`${ab}${n}`,a)}catch(d){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=d,c}if(r.status===204)return null;let l;try{l=await r.json()}catch{const d=r.headers.get("content-type")||"unknown";throw r.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${r.status})`)}if(!r.ok){let d;typeof l.detail=="string"?d=l.detail:l.detail&&typeof l.detail=="object"&&l.detail.message?d=l.detail.message:d="An error occurred";const c=new Error(d);throw c.status=r.status,c.detail=l.detail,c}return l}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),Zr()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const d=new URLSearchParams;return i!=null&&i!==""&&d.set("where",i),s&&d.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&d.set("order",a),d.set("skip",String(o)),d.set("limit",String(r)),this.request("GET",`${l}?${d.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getAgentKeys(t){return this.request("GET",`/agents/${encodeURIComponent(t)}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new ob;let Kn=null;const rb='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Yn=null,ts=!1;function Xr(){ts=!0}function lb(){ts=!1}function Tu(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function cb(){if(ts)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function G(){Yn=document.activeElement,ts=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function H(){var e;zt(),ts=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Yn&&document.contains(Yn)&&typeof Yn.focus=="function"&&Yn.focus(),Yn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(rb);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function Ge(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let d=l,c=Date.now(),p=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(p),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(p),d-=Date.now()-c}),i.addEventListener("mouseleave",()=>{c=Date.now(),p=setTimeout(o,Math.max(d,500))}),i}function La(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=k(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function db(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function _(e,t){const n=db(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function zt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Kn&&(document.removeEventListener("keydown",Kn),Kn=null)}function ub(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));zt(),t&&Ge()&&Tu()}function ns(e){Kn&&document.removeEventListener("keydown",Kn),Kn=e,e&&document.addEventListener("keydown",e)}function is(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(zt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Te(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Le(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ie(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function te(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function u(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return u(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function pb(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function st(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function lt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const Jr=/^\/api\/avatars\/[0-9a-f]{64}$/;function Lu(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||Jr.test(e))}function Vt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Lu(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${u(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Au(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function Aa(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${u(n)}</span>`}return Au(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let oe={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const el=new Set;function fe(e,t){if(typeof e=="string"){const n=oe[e];oe[e]=t,Cu(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=oe[i];oe[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Cu(i,s,a)})}}function ct(e){return el.add(e),()=>el.delete(e)}function Cu(e,t,n){t!==n&&el.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const pe=()=>oe.currentUser,Tt=e=>fe("currentUser",e),C=()=>oe.currentView,ss=e=>fe("currentView",e),J=()=>oe.issues,Je=e=>fe("issues",e),as=()=>oe.detailNavContext,Lt=e=>fe("detailNavContext",e),tl=()=>oe.labels,os=e=>fe("labels",e),Bu=()=>oe.activeFilterCategory,mb=e=>fe("activeFilterCategory",e),Du=()=>oe.selectedIssueIndex,Sn=e=>fe("selectedIssueIndex",e),fb=()=>oe.selectedDocIndex,Mu=e=>fe("selectedDocIndex",e),Ru=()=>oe.selectedBoardIndex,Ca=e=>fe("selectedBoardIndex",e),gb=()=>oe.selectedInboxIndex,Ba=e=>fe("selectedInboxIndex",e),hb=()=>oe.selectedSprintIndex,ju=e=>fe("selectedSprintIndex",e),vb=()=>oe.selectedEpicIndex,nl=e=>fe("selectedEpicIndex",e),bb=()=>oe.pendingGates,yb=e=>fe("pendingGates",e),ge=()=>oe.inboxEntries,Wt=e=>fe("inboxEntries",e),Da=()=>oe.inboxUnreadCount,rs=e=>fe("inboxUnreadCount",e),wb=()=>oe.searchDebounceTimer,$b=e=>fe("searchDebounceTimer",e),kb=()=>oe.websocket,il=e=>fe("websocket",e),T=()=>oe.currentTeam,Qn=e=>fe("currentTeam",e),Q=()=>oe.currentProject,dt=e=>fe("currentProject",e||null),$e=()=>oe.currentDetailIssue,Zn=e=>fe("currentDetailIssue",e),_b=()=>oe.currentDetailSprints,Pu=e=>fe("currentDetailSprints",e),sl={};function ne(e){Object.assign(sl,e)}function Eb(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=sl[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let qu=!1;function xb(){if(!qu){qu=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Eb);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=sl[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const al=["backlog","todo","in_progress","in_review","done","canceled"],ls=["backlog","todo","in_progress","in_review"],Nu=["urgent","high","medium","low","no_priority"],ol=["no_priority","urgent","high","medium","low"],Ou=["backlog","todo","in_progress","in_review","done"],Ma="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function V({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${u(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${u(t)}</h3>
            <p>${u(n)}</p>
            ${a}
        </div>
    `}const U={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},Hu=24,et=new Map,be=new Map,wt=new Map;let Kt=null;function Ib(e){return Array.isArray(e)?[...e].map(String).sort():e}function Fu(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Ib(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function Ra(e,t){for(be.delete(e),be.set(e,t);be.size>Hu;){const n=be.keys().next().value;be.delete(n)}Uu()}function Uu(){if(et.size===0)return;const e=new Set;be.forEach(t=>t.ids.forEach(n=>e.add(n))),et.forEach((t,n)=>{e.has(n)||et.delete(n)})}function Sb(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function Gu(e){const t=be.get(e);return t?(Ra(e,t),t.ids.map(n=>et.get(n)).filter(Boolean)):null}function rl(e){return et.get(e)}function Tb(e){var t;return((t=be.get(e))==null?void 0:t.meta)||{}}function zu(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function ll(e){const t=et.get(e.id);if(!zu(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){et.set(e.id,{...e,description:t.description});return}et.set(e.id,e)}}const cl=new Set;function Lb(e){return cl.add(e),()=>cl.delete(e)}function Vu(e,t,n){if(!Array.isArray(t))return;const i=Sb(t);i.forEach(ll);const s=be.get(e);Ra(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}}),cl.forEach(a=>{try{a(e)}catch(o){console.error(o)}})}function Ab(e,t){const n=be.get(e);n&&(n.meta=t)}function ja(e){e!=null&&e.id&&et.has(e.id)&&ll(e)}function Cb(e){be.delete(e),wt.forEach((t,n)=>{t===e&&wt.delete(n)}),Kt===e&&(Kt=null),Uu()}function Bb(e){et.delete(e),be.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function Pa(e){Kt=e}function Db(){return Kt}function Wu(e,t){for(wt.delete(e),wt.set(e,t);wt.size>Hu;)wt.delete(wt.keys().next().value)}function Mb(e){const t=wt.get(e);return t&&be.has(t)?t:null}function Rb({maxQueries:e=3}={}){const t=[...be.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(a=>i.add(a))),{queries:t.map(([s,a])=>[s,{ids:[...a.ids],meta:a.meta||{}}]),entities:[...i].map(s=>et.get(s)).filter(Boolean),views:[...wt.entries()].filter(([,s])=>n.has(s))}}function jb(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{be.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&ll(t.get(s))}),Ra(n,{ids:i.ids.filter(s=>et.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!wt.has(n)&&be.has(i)&&Wu(n,i)})}function Ku(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function Yu(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(Ku(e[n])!==Ku(t[n]))return!1;return!0}const Qu=["status","priority"],Zu=["assignee_id","sprint_id","issue_type"],Pb={assignee_id:"unassigned",sprint_id:"no_sprint"},qb=["scope","project_id","sort_by","order","limit"],Tn=e=>(e||[]).map(t=>String(t).toLowerCase());function Nb(e,t){if(e.search||t.search||t.sort_by==="random"||qb.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Qu)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of Zu)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=Tn(e.label);if(!Tn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=Tn(t.exclude_label);if(!Tn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Xu(e){const t=e.label===void 0?null:Tn(e.label),n=e.exclude_label===void 0?null:Tn(e.exclude_label);return i=>{for(const s of Qu)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of Zu){if(e[s]===void 0)continue;const a=e[s]===Pb[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=Tn((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function Ob(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(Fu(e)));let n=null,i=null;if(be.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let d;try{d=Object.fromEntries(JSON.parse(l))}catch{return}Nb(d,t)&&(n=r,i=l)}),!n)return null;Ra(i,n);const s=Xu(t),a=n.ids.map(r=>et.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function Hb(){et.clear(),be.clear(),wt.clear(),Kt=null}ct((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Hb();return}if(e!=="issues"||Kt===null||!be.has(Kt)||C()!=="issues")return;const i=be.get(Kt);Vu(Kt,J(),i.meta)});let dl=[];function Fb(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Ub(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function cs(e,t){const n=e().map(Fb),i=t().map(Ub);dl=[...n,...i]}function $t(e){return e&&dl.find(t=>t.id===e)||null}function ut(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function qa(e,t=!1){const n=u(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${u(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function ds({includeIdle:e=!1,keepId:t=null}={}){const n=dl.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),a=n.filter(b=>b.is_agent),o=new Set(a.map(b=>b.id)),r=(b,y)=>b.name.localeCompare(y.name),l=b=>b.registered_by_id&&o.has(b.registered_by_id),d=new Map,c=new Map;a.forEach(b=>{const[y,$]=l(b)?[d,b.registered_by_id]:[c,b.parent_user_id];y.has($)||y.set($,[]),y.get($).push(b)});const p=[],f=(b,y)=>{p.push({assignee:b,indent:y}),(d.get(b.id)||[]).sort(r).forEach(L=>p.push({assignee:L,indent:2}))};return i.forEach(b=>{p.push({assignee:b,indent:!1}),(c.get(b.id)||[]).sort(r).forEach(y=>f(y,!0))}),a.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>f(b,!1)),p}function Xn({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ds({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${m(s.id)}">${qa(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Gb(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&$t(e)&&Xn({keepId:e}),t.value=e}let At=[],ul=[],Na=-1,pl=null;const Ju=5,zb=new Set(["done","canceled"]),ep=new Set;function Vb(){return Na}function Wb(e){Na=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;pl=(t==null?void 0:t.dataset.issueId)??null}const tp=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function np(e){const t=new Set(tp.map(s=>s.status)),n=tp.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}ct(e=>{e==="currentProject"&&C()==="my-issues"&&(Jn(),us(),ei())});function ze(){return At}function Ln(e){At=e}let ml=0;async function Jn(){var a;const e=T(),t=pe();if(!e||!t)return;const n=++ml,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=Q();Yb();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==ml)return;At=np(r).flatMap(l=>l.issues),C()==="my-issues"&&Lt(At),An()}catch(o){if(n!==ml)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=V({icon:U.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),_("load issues",o)}}async function ei({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=Q();ul=await h.getTeamActivities(t.id,0,10,{projectId:i}),Kb()}catch{n&&(n.innerHTML=V({icon:U.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function Kb(){const e=document.getElementById("dashboard-activity-list");if(e){if(!ul.length){e.innerHTML=V({icon:U.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=ul.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${u(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${u(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${u(t.document_title)}</strong>`);const i=Yl(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${Lm(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Zl(t)}${n}</span>
                <span class="activity-actor">by ${u(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${st(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function Yb(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function ip(){Jn()}function An(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=np(At);At=t.flatMap(l=>l.issues),C()==="my-issues"&&Lt(At),Na=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=At.length?String(At.length):""),At.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const d=zb.has(l.status)&&!ep.has(l.status)&&l.issues.length>Ju,c=d?l.issues.slice(0,Ju):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${u(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${c.map(p=>ci(p)).join("")}
            ${d?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(c=>c.dataset.issueId===s),d=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));d==null||d.focus({preventScroll:!0})}if(pl){const l=[...e.querySelectorAll(".issue-row")],d=l.findIndex(c=>c.dataset.issueId===pl);d!==-1&&(l[d].classList.add("keyboard-selected"),Na=d)}}let fl=0,Oa=[],sp=null;async function us(){var o;const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++fl,n=Q(),i=`${((o=T())==null?void 0:o.id)??""}:${n??""}`;i!==sp&&(sp=i,ps=!1),Oa=[];const s=ie(),a=n?s.filter(r=>r.id===n):s;if(!a.length){e.innerHTML="";return}try{const r=a.map(async d=>{try{const c=await h.getCurrentSprint(d.id);if(!c)return null;let p={},f=!1;if(!n)return{project:d,sprint:c,statusCounts:p};try{const g=await h.getIssues({sprint_id:c.id,project_id:d.id,limit:500});for(const b of g)p[b.status]=(p[b.status]||0)+1}catch(g){console.error(`Failed to load issue counts for sprint ${c.id}:`,g),f=!0}return{project:d,sprint:c,statusCounts:p,countsFailed:f}}catch(c){return console.error(`Failed to load current sprint for project ${d.id}:`,c),null}}),l=(await Promise.all(r)).filter(Boolean);if(t!==fl)return;Oa=l,dp(l,{single:!!n})}catch(r){if(t!==fl)return;console.error("Failed to load sprint status:",r),e.innerHTML=V({icon:U.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const ap=5;let ps=!1;const op=["done","in_review","in_progress","todo","backlog"];function Ha(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,a=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,o=e.limbo?"limbo":s?"arrears":n&&a>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:a,state:o}}function Qb(e){const t=({sprint:n})=>{const i=Ha(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function Zb(e){if(!e.activated_at)return null;const t=Date.now()-new Date(e.activated_at);return Number.isFinite(t)?Math.max(0,Math.floor(t/864e5))+1:null}function Xb(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function Jb(e,t){return e.limbo?'<span class="badge badge-warning" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="badge badge-danger" title="Over budget: close the sprint to keep working">Arrears</span>':""}const ey={near:"is-near",arrears:"is-over",limbo:"is-limbo"};function rp(e){return ey[e.state]||""}function lp(e){return`<span class="meter ${rp(e)}" aria-hidden="true"><span class="meter-fill" style="width: ${e.pct}%"></span></span>`}function ty(e,t){return e.limbo?"in limbo":t.overBudget?"in arrears":t.state==="near"?"nearly spent":""}function cp(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function ny({sprint:e,statusCounts:t,countsFailed:n}){const i=Ha(e),s=t||{},a=Object.values(s).reduce((c,p)=>c+p,0),o=Zb(e),r=n?"Issue counts unavailable":a?`${a} issue${a===1?"":"s"}`:"No issues planned",l=[o?`Day ${o}`:"",r].filter(Boolean).join(" · ");let d="";return e.limbo?d="Closed and waiting on sprint rituals before the next sprint starts.":i.overBudget&&(d="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${i.state}" ${cp(e)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${u(e.name)}</span>
                ${Jb(e,i)}
                <span class="sprint-focus-meta">${u(l)}</span>
            </span>
            <span class="sprint-focus-headline">${Xb(i)}</span>
            ${i.hasBudget?lp(i):""}
            ${a?`
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${op.filter(c=>s[c]).map(c=>`<span class="sprint-stacked-segment status-${c}" style="width: ${s[c]/a*100}%"></span>`).join("")}
                    </span>
                    <span class="sprint-status-counts">
                        ${op.filter(c=>s[c]).map(c=>`<span class="sprint-count-label status-${c}">${s[c]} ${Te(c)}</span>`).join("")}
                    </span>
                </span>
            `:""}
            ${d?`<span class="sprint-focus-note ${i.state}">${d}</span>`:""}
        </button>
    `}function iy({project:e,sprint:t}){const n=Ha(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=ty(t,n),a=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${s?`, ${s}`:""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${cp(t)} title="${m(a)}">
                <span class="state-dot ${rp(n)}" aria-hidden="true"></span>
                <span class="sprint-row-project">${u(e.name)}</span>
                <span class="sprint-row-sprint">${u(t.name)}</span>
                ${n.hasBudget?lp(n):'<span class="sprint-row-nometer" aria-hidden="true"></span>'}
                <span class="meter-label">${i}<span class="sprint-row-unit"> pts</span>${n.hasBudget?"":'<span class="sr-only">, no budget</span>'}</span>
                ${s?`<span class="sr-only">, ${s}</span>`:""}
            </button>
        </li>
    `}function dp(e,{single:t=e.length===1&&!!Q()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${ny(e[0])}
        `;return}const i=Qb(e),s=i.filter(({sprint:c})=>c.limbo).length,a=i.filter(({sprint:c})=>!c.limbo&&Ha(c).overBudget).length,o=[a?`${a} in arrears`:"",s?`${s} in limbo`:""].filter(Boolean).join(" · "),r=i.length>ap,l=ps?i:i.slice(0,ap),d=i.length-l.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${o?`<span class="sprint-attention">${o}</span>`:""}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${l.map(iy).join("")}
        </ul>
        ${r?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${ps}" aria-controls="dashboard-sprint-rows">${d>0?`Show all ${i.length}`:"Show fewer"}</button>`:""}
    `}ne({"filter-my-issues":()=>ip(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Bo(t.identifier)},"retry-load-my-issues":()=>Jn(),"dash-show-all":(e,t)=>{ep.add(t.status),An()},"retry-load-sprint-status":()=>us(),"dash-sprints-toggle":()=>{var e;Oa.length&&(ps=!ps,dp(Oa,{single:!1}),(e=document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]'))==null||e.focus())}});const up=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function ms(e=null){const t=e||Q()||"";Bp([]);const n=ie().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${u(o.name)}</option>
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
            </div>
            <!-- Status, priority, type, labels, assignee, estimate and sprint
                 are what most issues are created with, so they show as chips
                 up front; only template and due date stay behind the
                 disclosure (CHT-1770). -->
            <div class="create-issue-toolbar">
                <div class="toolbar-buttons">
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="status">
                        ${Qe("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${mt("no_priority")}
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
            <div class="create-issue-more">
                <button type="button" class="more-options-toggle" id="more-options-toggle" data-action="toggle-create-options" aria-expanded="false" aria-controls="create-issue-options-panel">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    Template and due date
                </button>
                <div class="create-issue-options collapsed" id="create-issue-options-panel" inert>
                    <div class="create-issue-options-content">
                        <div class="create-issue-template">
                            <label for="create-issue-template">Template</label>
                            <select id="create-issue-template" data-action="apply-template">
                                ${up.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
                            </select>
                        </div>
                        <div class="create-issue-meta">
                            <label for="create-issue-due-date">Due date</label>
                            <input type="date" id="create-issue-due-date" class="create-issue-date-input">
                        </div>
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
    `,G(),Wa();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Wv();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{xu(i.value,s.value)}),s.addEventListener("input",()=>{xu(i.value,s.value)}),i.focus()}function sy(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function ay(e){const t=up.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function pp(e,t){const n=ie().find(i=>i.id===t);Bp([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?u(n.name):"Project"}</span>
                <span class="create-issue-breadcrumb">› New sub-issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Sub-issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
            </div>
            <!-- Every field here is a chip up front (CHT-1770) -->
            <div class="create-issue-toolbar">
                <div class="toolbar-buttons">
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="status">
                        ${Qe("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${mt("no_priority")}
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
            <div class="create-issue-footer">
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${m(e)}" data-project-id="${m(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,G(),Wa(),document.getElementById("create-issue-title").focus()}async function oy(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,d=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const c=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:d,label_ids:Cp(),parent_id:e});H(),k(`Created sub-issue ${c.identifier}`,"success"),ae(e)}catch(c){_("create sub-issue",c)}}async function ry(e,t,n){var o,r;zt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Ou.map(d=>`
                <button class="dropdown-option ${d===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${d}" data-label="${m(Te(d))}">
                    ${Qe(d)}
                    <span>${Te(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${ol.map(d=>`
                <button class="dropdown-option ${d===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${d}" data-label="${m(Le(d))}">
                    ${mt(d)}
                    <span>${Le(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(d=>`
                <button class="dropdown-option ${d===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${d}" data-label="${m(lt(d))}">
                    <span class="issue-type-badge type-${d}">${lt(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!T())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=tl(),d=!1;if(l.length===0)try{l=await h.getLabels(T().id),os(l)}catch(c){console.error("Failed to load labels:",c),d=!0}bl(a,{failed:d}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),is(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,d=ds({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${d.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:d.map(({assignee:c,indent:p})=>{const f=ut(c)||"User";return`
                <button class="dropdown-option ${c.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(c.id)}" data-label="${m(f)}">
                    ${Vt(c,"avatar-small")}
                    <span>${qa(c,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,d=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,c=yi(d);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${c.map(p=>{const f=p.value===null?"":String(p.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${m(f)}" data-label="${m(p.value?p.label:"Estimate")}">
                    <span>${u(p.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,d=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!d)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const p=(await h.getSprints(d)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${p.map(f=>`
                        <button class="dropdown-option ${f.id===l?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${m(f.id)}" data-label="${m(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${u(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),is(a)}function ly(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function cy(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Xr();const i=u(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Qe(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${mt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${lt(t)}</span><span id="create-issue-type-label">${i}</span>`)}zt(),s==null||s.focus()}async function mp({keepOpen:e=!1}={}){var y,$;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,d=l?parseInt(l):null,c=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,p=($=document.getElementById("create-issue-due-date"))==null?void 0:$.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const L=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:d,sprint_id:c,label_ids:Cp(),due_date:f});k(`Created ${L.identifier}`,"success"),Kv(),C()==="issues"?Bt():C()==="my-issues"&&Jn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",lb(),document.getElementById("create-issue-title").focus()):(H(),ae(L.id))}catch(L){_("create issue",L)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function dy(){await mp({keepOpen:!1})}async function uy(){await mp({keepOpen:!0})}ne({"toggle-create-dropdown":(e,t,n)=>{ry(t.dropdownType,e,n)},"set-create-field":(e,t)=>{cy(t.field,t.value,t.label)},"create-issue-submit":()=>{dy()},"create-issue-and-new":()=>{uy()},"update-create-project":()=>{ly()},"apply-template":e=>{ay(e.target.value)},"toggle-create-options":()=>{sy()},"create-sub-issue-submit":(e,t)=>{oy(t.parentId,t.projectId)}});function fs(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&(k(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(py(n,e.project_id),t=!0),t}function py(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
        <div class="parent-prompt">
            <p>${u(e.message)}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-dismiss">Not now</button>
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-add"
                    data-parent-id="${m(e.id)}" data-project-id="${m(t||"")}">Add more</button>
                <button type="button" class="btn btn-primary" data-action="parent-prompt-close"
                    data-parent-id="${m(e.id)}" data-identifier="${m(e.identifier)}">Close ${u(e.identifier)}</button>
            </div>
        </div>
    `,G())}async function my(e,t){try{const n=await h.updateIssue(e,{status:"done"});H(),k(`${t} closed`,"success"),fs(n)}catch(n){_(`close ${t}`,n)}}ne({"parent-prompt-dismiss":()=>H(),"parent-prompt-close":(e,t)=>my(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{H(),pp(t.parentId,t.projectId)}});function rn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Cn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Bn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Dn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Fa(){const e=document.getElementById("group-by-select");return e?e.value:""}const fp=[{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],gl=["done","canceled"],fy=ls,gy="all";function gp(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function ti(e=rn()){return e.length===0?"all":gp(e,ls)?"open":gp(e,gl)?"closed":null}function hp(e){var t,n,i;switch(e){case"status":{const s=ti();return s==="all"?0:s?1:rn().length}case"priority":return Cn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Bn().length;case"exclude_labels":return Dn().length;default:return 0}}function hl(){let e=0;return fp.forEach(t=>{e+=hp(t.key)}),e}function vp(){var b,y,$,L,x,M;const e=new URLSearchParams,t=rn(),n=Cn(),i=Bn(),s=Dn(),a=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,o=Q()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=($=document.getElementById("issue-type-filter"))==null?void 0:$.value,d=(L=document.getElementById("group-by-select"))==null?void 0:L.value,c=(x=document.getElementById("sort-by-select"))==null?void 0:x.value,p=ti(t);p==="all"?e.append("status",gy):p!=="open"&&t.forEach(j=>e.append("status",j)),n.forEach(j=>e.append("priority",j)),i.forEach(j=>e.append("label",j)),s.forEach(j=>e.append("exclude_label",j)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),d&&e.set("groupBy",d),c&&c!=="created-desc"&&e.set("sort",c);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),zv((M=T())==null?void 0:M.id,f)}function hy(e){var y;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some($=>t.has($))){const $=Gv((y=T())==null?void 0:y.id);if($){t=new URLSearchParams($);const L=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",L)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const $=s.length>0?s:fy;a.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=$.includes(x.value)}),a.dataset.statusApplied="true",bp()}const o=t.getAll("priority");if(o.length>0){const $=document.getElementById("priority-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=o.includes(x.value)}),yp())}const r=t.get("assignee");r&&Gb(r);const l=t.get("project");l&&(e(!0),dt(l),e(!1));const d=t.get("sprint");if(d){const $=document.getElementById("sprint-filter");$&&($.value=d)}const c=t.get("issue_type");if(c){const $=document.getElementById("issue-type-filter");$&&($.value=c)}const p=t.getAll("label");if(p.length>0){const $=document.getElementById("label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=p.includes(x.value)}),Ua())}const f=t.getAll("exclude_label");if(f.length>0){const $=document.getElementById("exclude-label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=f.includes(x.value)}),Ga())}const g=t.get("groupBy");if(g){const $=document.getElementById("group-by-select");$&&($.value=g)}const b=t.get("sort");if(b){const $=document.getElementById("sort-by-select");$&&($.value=b)}}function bp(){const e=rn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=ti(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Te(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function yp(){const e=Cn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Le(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Ua(){var i,s;const e=Bn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Ga(){var i,s;const e=Dn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function wp(){if(!T())return;let e;try{e=await h.getLabels(T().id)}catch(t){console.error("Failed to load labels for filter:",t);return}$p("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),$p("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function $p(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${te(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${u(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function kp(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function _p(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const d=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let c;for(;(c=d.exec(t))!==null;)if(l=!0,c.index>r&&o.appendChild(document.createTextNode(t.slice(r,c.index))),c[1]){const p=c[1],f=document.createElement("a");f.href=`#/issue/${p}`,f.className="issue-link",f.textContent=p,o.appendChild(f),r=c.index+c[0].length}else if(c[3]){c[2]&&o.appendChild(document.createTextNode(c[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+c[3],o.appendChild(p),r=c.index+c[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function za(e){if(!e)return"";const t=gt(e),n=document.createElement("div");return n.innerHTML=t,kp(n,_p),n.innerHTML}function Mn(e){if(!e)return"";const t=gt(e),n=document.createElement("div");return n.innerHTML=t,kp(n,_p),n.innerHTML}const vy={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},Ep=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${u(t)}</span><span class="related-title">${u(n)}</span></a>`;function by(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const xp={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function yy(e,t=[],n=[],{formatEstimate:i=null}={}){const s=o=>o.estimate==null?"":` · ${u(i?i(o.estimate,o.project_id||e.project_id):`${o.estimate} pts`)}`,a=[...(t||[]).map(o=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${Qe(o.status)}</span>
                    ${Ep(o.id,o.identifier,o.title)}
                    <span class="related-kind">Sub-issue${s(o)}</span>
                </li>`})),...(n||[]).map(o=>{const r=by(o);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${Qe(o.related_issue_status)}</span>
                    ${Ep(o.related_issue_id,o.related_issue_identifier,o.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(o.id)}" title="Remove link" aria-label="Remove link to ${m(o.related_issue_identifier)}">${vy.remove}</button>
                </li>`}})].sort((o,r)=>xp[o.kind]-xp[r.kind]);return`
        <section class="related-work" aria-label="Related work">
            <div class="related-head">
                <h3>Related work</h3>
                <details class="related-add">
                    <summary class="ticket-gate-text-btn">+ Add</summary>
                    <div class="related-add-menu">
                        <button type="button" data-action="show-create-sub-issue-modal" data-issue-id="${m(e.id)}" data-project-id="${m(e.project_id)}">Sub-issue</button>
                        <button type="button" data-action="show-add-relation-modal" data-issue-id="${m(e.id)}">Link an issue</button>
                    </div>
                </details>
            </div>
            ${a.length?`<ul class="related-list">${a.map(o=>o.html).join("")}</ul>`:""}
        </section>`}const wy=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function $y(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${u((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${wy(e.author)}>${u(e.author_name||"User")}</span>
                    <span class="comment-date">${u(st(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${za(e.content).trim()}</div>
            </div>
        </li>`}const Ip=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${za(t).trim()}</div></details>`;function ky(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let a,o="",r="";return e.activity_type==="ritual_attested"?(a=`Attested <b>${u(e.field_name||"a ritual")}</b>`,i?o=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(o=" · waiting for review"),e.new_value&&(r=Ip("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(a=`Sent back <b>${u(e.field_name||"a ritual")}</b>`,e.new_value&&(r=Ip("Reason",e.new_value,!0))):a=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${a}</span>${o}
                <span class="timeline-meta">· ${u(n(e))} · ${u(st(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function _y(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function Ey({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:a=!1,issueId:o},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),d=[...t||[],..._y(t,n)],c=new Map;for(const g of d){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const b=c.get(g.field_name);(!b||new Date(g.created_at)>new Date(b.created_at))&&c.set(g.field_name,g)}const p=[...(e||[]).map(g=>({at:g.created_at,html:$y(g)})),...d.filter(g=>g.activity_type!=="commented").map(g=>{const b=c.get(g.field_name)===g;return{at:g.created_at,html:ky(g,{...r,awaitingReview:b,gateShowsIt:b&&g.field_name===i})}})].sort((g,b)=>new Date(g.at)-new Date(b.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${a?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(o)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${p.length?`<ol class="timeline comments-list">${p.map(g=>g.html).join("")}</ol>`:a?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}function Sp(e,t,{formatEstimate:n=null}={}){const i=[`${Qe(e.status)}<span>${u(Te(e.status))}</span>`,u(t||"Unassigned"),u(Le(e.priority)),u(lt(e.issue_type))];return e.estimate!=null&&i.push(u(n?n(e.estimate,e.project_id):`${e.estimate} pts`)),`<div class="issue-meta-line">${i.map(s=>`<span class="issue-meta-part">${s}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`}const Tp=al,xy=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let Ct=[],Lp=Promise.resolve();const Iy={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Va(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Sy={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Ap(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function ni(){return!!document.querySelector(".inline-dropdown")}function Cp(){return Ct}function Bp(e){Ct=e}async function vl(e,t,n,i){var p,f,g,b;e.preventDefault(),zt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Tp.map((y,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${Qe(y)}
                    <span>${Te(y)}</span>
                    <span class="dropdown-shortcut">${$+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${ol.map((y,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${mt(y)}
                    <span>${Le(y)}</span>
                    <span class="dropdown-shortcut">${$}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${xy.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${lt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=$e(),$=J().find(x=>x.id===n)||ze().find(x=>x.id===n)||((y==null?void 0:y.id)===n?y:null),L=ds({keepId:($==null?void 0:$.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${L.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:L.map(({assignee:x,indent:M},j)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(x.id)}">
                    ${Vt(x,"avatar-small")}
                    <span>${qa(x,M)}</span>
                    ${j<9?`<span class="dropdown-shortcut">${j+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),$=(y==null?void 0:y.dataset.projectId)||((p=$e())==null?void 0:p.project_id),L=yi($);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${L.map((x,M)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${x.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${x.label}</span>
                    ${M<9?`<span class="dropdown-shortcut">${M}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=J(),$=ze(),L=$e(),x=y.find(q=>q.id===n)||$.find(q=>q.id===n)||L,M=new Set(((x==null?void 0:x.labels)||[]).map(q=>q.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let I=a.bottom+4,w=a.left;w+j.width>window.innerWidth-8&&(w=a.right-j.width),I+j.height>window.innerHeight-8&&(I=a.top-j.height-4),o.style.top=`${I}px`,o.style.left=`${Math.max(8,w)}px`,is(o,{multiSelect:!0});let D=[];const O=T();if(O)try{D=await h.getLabels(O.id)}catch(q){console.error("Failed to load labels:",q)}if(!o.parentNode)return;Mp(o,n,D,M);const K=o.getBoundingClientRect();let _e=a.bottom+4,E=a.left;E+K.width>window.innerWidth-8&&(E=a.right-K.width),_e+K.height>window.innerHeight-8&&(_e=a.top-K.height-4),o.style.top=`${_e}px`,o.style.left=`${Math.max(8,E)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=J(),$=ze(),L=$e(),x=y.find(B=>B.id===n)||$.find(B=>B.id===n)||L,M=(x==null?void 0:x.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let I=a.bottom+4,w=a.left;w+j.width>window.innerWidth-8&&(w=a.right-j.width),I+j.height>window.innerHeight-8&&(I=a.top-j.height-4),o.style.top=`${I}px`,o.style.left=`${Math.max(8,w)}px`,is(o);let D=[];if(M)try{D=await h.getSprints(M),Lk(M,D)}catch(B){console.error("Failed to load sprints:",B)}if(!o.parentNode)return;const O=D.filter(B=>B.status!=="completed"||B.id===(x==null?void 0:x.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${O.map((B,Z)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(B.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${u(B.name)}${B.status==="active"?" (Active)":""}</span>
                    ${Z<9?`<span class="dropdown-shortcut">${Z+1}</span>`:""}
                </button>
            `).join("")}
        `;const K=o.getBoundingClientRect();let _e=a.bottom+4,E=a.left;E+K.width>window.innerWidth-8&&(E=a.right-K.width),_e+K.height>window.innerHeight-8&&(_e=a.top-K.height-4),o.style.top=`${_e}px`,o.style.left=`${Math.max(8,E)}px`,o.classList.remove("dropdown-positioning");const q=B=>{const Z=B.key;if(Z==="Escape"||Z==="Tab"){zt(),document.removeEventListener("keydown",q),ns(null);return}if(Ap(B,o))return;const Ee=parseInt(Z);if(isNaN(Ee))return;const le=o.querySelectorAll(".dropdown-option");let bt=!1;Ee===0?(ii(n,"sprint_id",null),bt=!0):Ee>=1&&Ee<le.length&&(le[Ee].click(),bt=!0),bt&&(document.removeEventListener("keydown",q),ns(null))};ns(q),document.addEventListener("keydown",q),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,d=a.left;d+r.width>window.innerWidth-8&&(d=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,d)}px`,o.classList.remove("dropdown-positioning");const c=y=>{const $=y.key;if($==="Escape"||$==="Tab"){zt(),document.removeEventListener("keydown",c);return}if(Ap(y,o))return;const L=parseInt($);if(isNaN(L))return;let x=!1;if(t==="status"&&L>=1&&L<=6)ii(n,"status",Tp[L-1]),x=!0;else if(t==="priority"&&L>=0&&L<=4)ii(n,"priority",ol[L]),x=!0;else if(t==="estimate"){const M=$e(),j=yi(M==null?void 0:M.project_id);L>=0&&L<j.length&&(ii(n,"estimate",j[L].value),x=!0)}x&&(document.removeEventListener("keydown",c),ns(null))};ns(c),document.addEventListener("keydown",c),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),is(o)}function Ty(e,t,n,i){vl(e,t,n,i)}function Ly(e,t,n){Lp=Lp.then(()=>Dp(e,t,n))}async function Dp(e,t,n){const i=J(),s=ze(),a=$e(),o=i.find(c=>c.id===e)||s.find(c=>c.id===e)||a;if(!o)return;const r=(o.labels||[]).map(c=>c.id),l=r.indexOf(t);let d;if(l>=0?d=r.filter(c=>c!==t):d=[...r,t],n){const c=l<0;n.classList.toggle("selected",c),n.querySelector(".label-check").textContent=c?"✓":""}try{const c=await h.updateIssue(e,{label_ids:d}),p=c.labels||[],f=x=>({...x,labels:p,updated_at:c.updated_at??x.updated_at}),g=J();g.some(x=>x.id===e)&&Je(g.map(x=>x.id===e?f(x):x));const b=ze();b.some(x=>x.id===e)&&Ln(b.map(x=>x.id===e?f(x):x));const y=$e();(y==null?void 0:y.id)===e&&Zn(f(y));const $=Va(e);if($&&$.parentNode){const x=J().find(M=>M.id===e)||ze().find(M=>M.id===e);x&&($.outerHTML=ci(x))}const L=document.querySelector(".property-labels-btn");L&&(L.innerHTML=p.length>0?p.map(x=>`
                    <span class="issue-label" style="background: ${te(x.color)}20; color: ${te(x.color)}">${u(x.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(c){if(_("update labels",c),n){const p=l>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function Mp(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${m(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${m(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${m(t)}" data-label-id="${m(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${te(s.color)}20; color: ${te(s.color)}">${u(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Rp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=T();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);os(o),a!=null&&a.id&&await Dp(e,a.id,null);const r=J(),l=ze(),d=$e(),c=r.find(f=>f.id===e)||l.find(f=>f.id===e)||d,p=new Set(((c==null?void 0:c.labels)||[]).map(f=>f.id));t&&Mp(t,e,o,p),n.value=""}catch(a){_("create label",a)}finally{n.disabled=!1,n.focus()}}}function Wa(){const e=document.getElementById("create-issue-labels-label");e&&(Ct.length===0?e.textContent="Labels":e.textContent=`Labels (${Ct.length})`)}function bl(e,{failed:t=!1}={}){const n=tl();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=Ct.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${m(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${te(i.color)}20; color: ${te(i.color)}">${u(i.name)}</span>
                </button>
            `}).join("")}
    `}function Ay(e){const t=Ct.indexOf(e);t>=0?Ct.splice(t,1):Ct.push(e),Xr(),Wa();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&bl(n)}async function jp(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);os(a),s!=null&&s.id&&!Ct.includes(s.id)&&(Ct.push(s.id),Xr()),Wa(),t&&bl(t),n.value=""}catch(s){_("create label",s)}finally{n.disabled=!1,n.focus()}}}async function ii(e,t,n){var r;zt();const i=My(e,t,n),s=Py(e,t),a=(r=rl(e))==null?void 0:r[t],o=qp(e,t,()=>n);o&&yl(e,t,{focus:!0});try{const l={};l[t]=n;const d=await h.updateIssue(e,l);if(!d||!d.id)throw new Error("Invalid response from server");if(fs(d),Pp(e,t,i)){const c={...d,...jy(e,t)};qy(e,{issue:c,myIssue:c,detail:c}),ja(c),yl(e,t,{focus:!o})}}catch(l){if(_("update issue",l),Pp(e,t,i)){qp(e,t,(c,p)=>c[t]===n?s[p]:c[t]);const d=rl(e);d&&d[t]===n&&ja({...d,[t]:a}),yl(e,t,{focus:!1})}return}finally{Ry(e,t,i)}if(k("Issue updated","success"),t==="status")try{const l=Q();if(l){const c=(await h.getSprints(l)).find(p=>p.status==="active");wl(c||null)}}catch{}}const Cy=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),ln=new Map;function By(e){const t=e&&ln.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let Dy=0;function My(e,t,n){const i=++Dy;return ln.has(e)||ln.set(e,new Map),ln.get(e).set(t,{seq:i,value:n}),i}function Pp(e,t,n){var i,s;return((s=(i=ln.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Ry(e,t,n){var s;const i=ln.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&ln.delete(e))}function jy(e,t){var i;const n={};return(i=ln.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function Py(e,t){var i,s;const n=$e();return{issue:(i=J().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=ze().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function qp(e,t,n){const i=(l,d)=>({...l,[t]:n(l,d)});let s=!1;const a=J();a.some(l=>l.id===e)&&(s=!0,Je(a.map(l=>l.id===e?i(l,"issue"):l)));const o=ze();o.some(l=>l.id===e)&&(s=!0,Ln(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=$e();return(r==null?void 0:r.id)===e&&(s=!0,Zn(i(r,"detail"))),s}function qy(e,t){var s;const n=J();t.issue&&n.some(a=>a.id===e)&&Je(n.map(a=>a.id===e?t.issue:a));const i=ze();t.myIssue&&i.some(a=>a.id===e)&&Ln(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=$e())==null?void 0:s.id)===e&&Zn(t.detail)}function Ny(e){return e==="estimate"||Iy[Fa()]===e}function Oy(e,t,n,{focus:i}){var c;const s=Va(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&Ny(t)&&J().some(p=>p.id===e))pt();else if(t==="status"&&s.closest("#my-issues-list"))An();else{const p=s.classList.contains("keyboard-selected");s.outerHTML=ci(n),p&&((c=Va(e))==null||c.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=Va(e),l=Sy[t],d=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));d&&d.focus({preventScroll:!0})}function yl(e,t,{focus:n}){const i=J().find(a=>a.id===e)||ze().find(a=>a.id===e);i&&ja(i),Oy(e,t,i,{focus:n});const s=$e();(s==null?void 0:s.id)===e&&Cy.has(t)&&Hy(t,s)}function Hy(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".issue-meta-line");if(i){const d=t.assignee_id?$t(t.assignee_id):null;i.outerHTML=Sp(t,d?ut(d):null,{formatEstimate:gn})}const s=n.querySelector(".detail-sidebar");if(!s)return;let a=e;e==="assignee_id"&&(a="assignee"),e==="sprint_id"&&(a="sprint"),e==="issue_type"&&(a="type");const o=s.querySelectorAll(".property-row");let r=null;for(const d of o){const c=d.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===a.toLowerCase()){r=d;break}}if(!r)return;const l=r.querySelector(".property-value");if(l){if(e==="status")l.innerHTML=`
            ${Qe(t.status)}
            <span>${Te(t.status)}</span>
        `;else if(e==="priority")l.innerHTML=`
            ${mt(t.priority)}
            <span>${Le(t.priority)}</span>
        `;else if(e==="issue_type")l.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${lt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const d=t.assignee_id?$t(t.assignee_id):null,c=d?ut(d):null;l.innerHTML=c?`${Vt(d,"avatar-small")}<span>${u(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const d=_b(),c=t.sprint_id&&d?d.find(p=>p.id===t.sprint_id):null;l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?u(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${gn(t.estimate,t.project_id)}</span>
        `);l.classList.add("updated"),setTimeout(()=>l.classList.remove("updated"),500),l==null||l.focus()}}ne({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?ii(t.issueId,i,n==="null"?null:Number(n)):ii(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),Ly(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Rp(t.issueId)},"toggle-create-issue-label":(e,t)=>{Ay(t.labelId)},"create-label-for-create-issue":()=>{jp()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Rp(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),jp())}});function Ka(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Np)},0))}function Np(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Np))}function Fy(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",si)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Ve(),tt(Bu()),setTimeout(()=>{document.addEventListener("click",si)},0))}function Uy(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",si)):(e.classList.remove("hidden"),Xy(),setTimeout(()=>{document.addEventListener("click",si)},0))}function si(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",si))}function ai(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",si)}function Ve(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=Q();e.innerHTML=fp.map(n=>{const i=hp(n.key),s=Bu()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function tt(e){mb(e),Ve();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"status":zy(t);break;case"priority":Vy(t);break;case"type":Wy(t);break;case"assignee":Ky(t);break;case"sprint":Yy(t);break;case"labels":Qy(t);break;case"exclude_labels":Zy(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Gy(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Ve()}function zy(e){const t=rn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=ti(t);let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-status-filter-new">Clear</button>':""}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${i==="open"?"active":""}" data-action="set-status-preset" data-value="open">Open</button>
            <button class="filter-preset-btn ${i==="closed"?"active":""}" data-action="set-status-preset" data-value="closed">Closed</button>
            <button class="filter-preset-btn ${i==="all"?"active":""}" data-action="set-status-preset" data-value="all">All</button>
        </div>
    `;n.forEach(a=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${a.value}" ${t.includes(a.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${m(a.value)}">
                <span class="filter-option-icon">${a.icon}</span>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Vy(e){const t=Cn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-priority-filter-new">Clear</button>':""}
        </div>
    `;n.forEach(s=>{i+=`
            <label class="filter-option">
                <input type="checkbox" value="${s.value}" ${t.includes(s.value)?"checked":""} data-action="toggle-priority-option" data-filter-value="${m(s.value)}">
                <span class="filter-option-icon">${s.icon}</span>
                <span class="filter-option-label">${s.label}</span>
            </label>
        `}),e.innerHTML=i}function Wy(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Ky(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;ds({keepId:n||null}).forEach(({assignee:s,indent:a})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${m(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${m(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${qa(s,a)}</span>
            </label>
        `}),e.innerHTML=i}function Yy(e){if(!Q()){e.innerHTML=`
            <div class="filter-options-header">
                <span class="filter-options-title">Sprint</span>
            </div>
            <div class="filter-options-empty">Select a project first</div>
        `;return}const n=document.getElementById("sprint-filter"),i=(n==null?void 0:n.value)||"",s=n?Array.from(n.options):[];let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${i?'<button class="filter-options-clear" data-action="set-sprint-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(o=>{a+=`
            <label class="filter-option" data-action="set-sprint-filter" data-value="${m(o.value)}">
                <input type="radio" name="sprint-filter-radio" value="${m(o.value)}" ${i===o.value?"checked":""}>
                <span class="filter-option-label">${u(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function Qy(e){const t=Bn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",c=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${te(c)};"></span>
                    <span class="filter-option-label">${u(d)}</span>
                </label>
            `}),e.innerHTML=s}function Zy(e){const t=Dn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",c=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${te(c)};"></span>
                    <span class="filter-option-label">${u(d)}</span>
                </label>
            `}),e.innerHTML=s}function Xy(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(l=>`
                <div class="display-option ${i===l.value?"active":""}" data-action="set-sort" data-value="${m(l.value)}">
                    <span>${l.label}</span>
                    ${i===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(l=>`
                <div class="display-option ${s===l.value?"active":""}" data-action="set-group-by" data-value="${m(l.value)}">
                    <span>${l.label}</span>
                    ${s===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function We(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=rn();if(n.length>0){const c=ti(n),p=c==="open"?"Open":c==="closed"?"Closed":n.map(f=>Te(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Cn();if(i.length>0){const c=i.map(p=>Le(p)).join(", ");t.push({category:"priority",label:"Priority",value:c,clearAction:"clear-priority-filter-new"})}const s=document.getElementById("issue-type-filter");if(s!=null&&s.value){const c=s.options[s.selectedIndex];t.push({category:"type",label:"Type",value:c?c.text:s.value,clearAction:"clear-type-filter"})}const a=document.getElementById("assignee-filter");if(a!=null&&a.value){let c;a.value==="me"?c="Me":a.value==="unassigned"?c="Unassigned":c=ut($t(a.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:c,clearAction:"clear-assignee-filter"})}const o=document.getElementById("sprint-filter");if(o!=null&&o.value){const c=o.options[o.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(c==null?void 0:c.text)||o.value,clearAction:"clear-sprint-filter"})}const r=Bn();if(r.length>0){const c=document.getElementById("label-filter-dropdown"),p=r.map(f=>{var y;const g=c==null?void 0:c.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:p,clearAction:"clear-label-filter-new"})}const l=Dn();if(l.length>0){const c=document.getElementById("exclude-label-filter-dropdown"),p=l.map(f=>{var y;const g=c==null?void 0:c.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:p,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(c=>`
        <span class="filter-chip" title="${m(c.label)}: ${m(c.value)}">
            <span class="filter-chip-label">${c.label}:</span>
            <span class="filter-chip-value">${u(c.value)}</span>
            <button class="filter-chip-remove" data-action="${c.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function Ke(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=hl();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Op(){const e=document.getElementById("sprint-filter");if(!e)return;const t=Q(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",wl(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${u(a.name)})</option>`),Hm(t,a==null?void 0:a.id),wl(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${u(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function wl(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${u(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${u(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Jy(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Hp=!1;ct(e=>{if(e!=="currentProject"||C()!=="issues"||Hp)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Op(),wp()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Ua(),Ga(),at(),We(),Ke()}).catch(n=>{console.error("Failed to update filters on project switch:",n),at(),We(),Ke()})});function ew(){hy(e=>{Hp=e})}function Ya(){bp(),at(),We(),Ke()}function Qa(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ya()}function $l(){yp(),at(),We(),Ke()}function kl(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),$l()}function _l(){Ua(),at(),We(),Ke()}function Za(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),_l()}function El(){Ga(),at(),We(),Ke()}function Xa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),El()}function tw(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Fp(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${tw(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let gs=0;function hs(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function Up(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=T())==null?void 0:t.id)||"",project:Q()||"",status:[...rn()].sort(),priority:[...Cn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let cn=null;function nw(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function oi(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function Gp(e,t){oi(!1),Pa(e),Je(t),C()==="issues"&&Lt(t),pt(),cn=e,hs(Tb(e).hiddenClosed||0)}function iw(e,t,{loading:n}){Pa(null),Je(t),C()==="issues"&&Lt(t),pt(),oi(n),cn=e,hs(0)}function zp(){Pa(null),cn=null,oi(!1),Jy(),hs(0)}function sw(){const e=document.getElementById("issues-list");hs(0),e!=null&&e.querySelector(".issue-row")?oi(!0):zp()}function aw(){const e=Mb(Up()),t=e?Gu(e):null;return t?(Sn(-1),Gp(e,t),!0):(zp(),!1)}function ow(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(d=>[d.id,d])),a=new Set(t.map(d=>d.id)),o=new Set(t.filter(d=>!n.has(d.id)).map(d=>d.title)),r=e.filter(d=>!n.has(d.id)&&!a.has(d.id)&&!(d._isOptimistic&&o.has(d.title))&&(d._isOptimistic||i(d))),l=[];for(const d of t){const c=s.get(d.id);if(!c&&n.has(d.id))continue;const p=c&&zu(c.updated_at,d.updated_at)?c:d;l.push(By(p))}return r.length?[...r,...l]:l}async function Bt(){var $,L,x,M,j,I,w;Sn(-1),nw();const e=++gs;if(!T())return;const t=Q()||"",n=rn(),i=Cn(),s=($=document.getElementById("assignee-filter"))==null?void 0:$.value,a=(x=(L=document.getElementById("issue-search"))==null?void 0:L.value)==null?void 0:x.trim();if(!t&&ie().length===0){cn=null,document.getElementById("issues-list").innerHTML=V({icon:U.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=Up(),r={limit:1e3},l=((M=document.getElementById("sort-by-select"))==null?void 0:M.value)||"created-desc",[d,c]=l.includes("-")?l.split("-"):[l,null];r.sort_by=d,c&&(r.order=c),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(j=pe())==null?void 0:j.id:r.assignee_id=s);const p=(I=document.getElementById("sprint-filter"))==null?void 0:I.value;if(p)if(p==="current"){if(t){const D=Ak(t);if(D!==void 0)D&&(r.sprint_id=D);else try{const K=(await h.getSprints(t)).find(_e=>_e.status==="active");Hm(t,K==null?void 0:K.id),K&&(r.sprint_id=K.id)}catch(O){console.error("Failed to resolve current sprint:",O)}}}else r.sprint_id=p;const f=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value;f&&(r.issue_type=f),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,b=!1,y=null;try{const D=Fp(Bn(),"label-filter-dropdown");D.length>0&&(r.label=D,r.label_match="any");const O=Fp(Dn(),"exclude-label-filter-dropdown");O.length>0&&(r.exclude_label=O),t&&(r.project_id=t);const K=t||`team:${T().id}`;y=Fu({...r,scope:K});const _e=Gu(y);if(_e)g=!0,cn===y&&Db()===y&&Yu(J(),_e)||Gp(y,_e);else{const ee=Ob({...r,scope:K});ee&&(ee.complete||ee.rows.length>0)?(b=!0,iw(y,ee.rows,{loading:!ee.complete})):sw()}const E=ee=>t?h.getIssues(ee):ie().length>0?h.getTeamIssues(T().id,ee):Promise.resolve(void 0),q=r.search&&ti(n)==="open"?E({...r,status:gl}).then(ee=>Array.isArray(ee)?ee.length:0).catch(ee=>(console.error("Failed to count closed search matches:",ee),0)):Promise.resolve(0),B=new Set(J().map(ee=>ee.id)),Z=await E(r);if(Vu(y,Z),e!==gs)return;Wu(o,y);const Ee=(g||b)&&cn===y,le=Ee?ow(J(),Z,B,Xu(r)):Z,bt=Ee&&Yu(J(),le);Pa(y),Je(le),C()==="issues"&&Lt(Array.isArray(le)?le.filter(ee=>!ee._isOptimistic):le);const A=[...new Set(le.map(ee=>ee.project_id).filter(Boolean))],ce=Object.keys(Eo()).length;if(await Om(A),e!==gs)return;const he=Object.keys(Eo()).length!==ce;(!bt||he)&&pt(),cn=y,oi(!1);const de=await q;if(Ab(y,{hiddenClosed:de}),e!==gs)return;hs(de)}catch(D){if(e!==gs)return;oi(!1);const O=(D==null?void 0:D.status)===403||(D==null?void 0:D.status)===404;if(g&&!O){_("refresh issues",D);return}O&&y&&Cb(y),cn=null;const K=document.getElementById("issues-list");K&&(K.innerHTML=V({icon:U.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),_("load issues",D)}}function rw(){clearTimeout(wb()),$b(setTimeout(()=>{Bt()},300))}function at(){vp(),Bt()}async function Vp(){if(vp(),Fa()==="sprint"){const e=J(),t=[...new Set(e.map(n=>n.project_id))];await Om(t)}pt()}function lw(){We(),Ke()}function cw(e){const t=e==="open"?ls:e==="closed"?gl:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Ya(),Ve(),tt("status")}function dw(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ya()),Ve(),tt("status")}function uw(){Qa(),Ve(),tt("status"),We(),Ke()}function pw(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,$l()),Ve(),tt("priority")}function mw(){kl(),Ve(),tt("priority"),We(),Ke()}function Wp(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,at()),Ve(),tt("type"),We(),Ke(),ai()}function fw(){Wp("")}function Kp(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,at()),Ve(),tt("assignee"),We(),Ke(),ai()}function gw(){Kp("")}function Yp(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,at()),Ve(),tt("sprint"),We(),Ke(),ai()}function hw(){Yp("")}function vw(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,_l()),Ve(),tt("labels")}function bw(){Za(),Ve(),tt("labels"),We(),Ke()}function yw(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,El()),Ve(),tt("exclude_labels")}function ww(){Xa(),Ve(),tt("exclude_labels"),We(),Ke()}function $w(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Bt()),ai()}function kw(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Vp()),ai()}function _w(){Qa(),kl();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Za(),Xa(),at(),We(),Ke()}ne({"update-label-filter":()=>_l(),"clear-label-filter":()=>Za(),"update-exclude-label-filter":()=>El(),"clear-exclude-label-filter":()=>Xa(),"show-filter-category":(e,t)=>{var n,i;tt(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Gy();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"clear-status-filter-new":()=>uw(),"set-status-preset":(e,t)=>cw(t.value),"show-all-statuses":()=>Qa(),"toggle-status-option":(e,t)=>dw(t.filterValue,e),"clear-priority-filter-new":()=>mw(),"toggle-priority-option":(e,t)=>pw(t.filterValue,e),"set-type-filter":(e,t)=>Wp(t.value),"clear-type-filter":()=>fw(),"set-assignee-filter":(e,t)=>Kp(t.value),"clear-assignee-filter":()=>gw(),"set-sprint-filter":(e,t)=>Yp(t.value),"clear-sprint-filter":()=>hw(),"clear-label-filter-new":()=>bw(),"toggle-label-option":(e,t)=>vw(t.filterValue,e),"clear-exclude-label-filter-new":()=>ww(),"toggle-exclude-label-option":(e,t)=>yw(t.filterValue,e),"set-sort":(e,t)=>$w(t.value),"set-group-by":(e,t)=>kw(t.value),"clear-all-filters":()=>_w(),"retry-load-issues":()=>Bt()});const Qp=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function dn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function ri(e){const t=dn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const Ew=60,xw=150;let Ye=[],vs=1/0,un=null,Ja=null,bs=null;const eo=new Map;let li=null,to=[],ys=null;const Zp=e=>{var t;return`${((t=pe())==null?void 0:t.id)??""}|${e}`},Iw=24;function Sw(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(Ew,Math.ceil((e+2*t)/Iw))}function pn(e,t){if(e!==null&&(li!=null&&li.has(String(e))))return to.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,vs));return vs-=n.length,n.length<t.length&&Ye.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>ci(i)).join("")}function Xp(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function Jp(){clearTimeout(un),un=null,Il++,Ye=[],Ja=null,ys=null,bs=null}function xl(e=1/0){if(Ye.length===0)return;const t=document.getElementById("issues-list");if(!t||!(bs!=null&&bs.isConnected)){Jp();return}const n=new Map(J().map(s=>[s.id,s]));let i=e;for(;Ye.length>0&&i>0;){const s=Ye[0],a=s.ids.slice(0,i),o=Xp(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>ci(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?Ye.shift():s.ids=s.ids.slice(a.length)}if(ys){const s=ys;no(t,s.issueId)&&(ys=null,sm(t,s))}if(Ye.length===0){clearTimeout(un),un=null;const s=Ja;Ja=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&em(s)}}const Tw=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{un=setTimeout(e,0)}):un=setTimeout(e,16);let Il=0;function Lw(){if(clearTimeout(un),Ye.length===0)return;const e=++Il;Tw(function t(){e===Il&&(xl(xw),Ye.length>0&&(un=setTimeout(t,0)))})}function pt(){var c,p;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=Nw(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),Jp(),vs=Sw();const o=J();if(o.length===0){const f=(p=(c=document.getElementById("issue-search"))==null?void 0:c.value)==null?void 0:p.trim(),g=hl()>0,b=f&&f.length>=2;if(g||b){const y=hl(),$=[];b&&$.push(`search "${f}"`),g&&$.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=V({icon:U.issues,heading:"No matching issues",description:`No issues match your ${$.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=V({icon:U.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Sn(-1),vs=1/0;return}const r=Fa();li=eo.get(Zp(r))||null,to=[],r==="status"?Aw(e,o):r==="priority"?Cw(e,o):r==="type"?Bw(e,o):r==="assignee"?Dw(e,o):r==="sprint"?Mw(e,o):e.innerHTML=ri(o)+pn(null,o),vs=1/0,bs=e.firstElementChild,Ye.push(...to),to=[];const l=li;li=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&nm(f,!0)}),a.forEach(([f,g])=>{f&&qw(f,e,g)})),i&&(no(e,i.issueId)?sm(e,i):Ye.length>0&&(ys=i));const d=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Ye.length>0&&!d?Ja=n:em(n),Lw()}function em(e){const t=Du();if(t<0)return;const n=document.querySelectorAll(Ma);if(n.length===0){Sn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Sn(i),n[i].classList.add("keyboard-selected")}function Aw(e,t){const n={};al.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=ri(t);al.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Qe(s)}</span>
                    <span class="group-title">${Te(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Cw(e,t){const n={};Nu.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=ri(t);Nu.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${mt(s)}</span>
                    <span class="group-title">${Le(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Bw(e,t){const n={};Qp.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=ri(t);Qp.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${lt(s)}</span></span>
                    <span class="group-title">${lt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Dw(e,t){const n={},i="__unassigned__";n[i]=[];const s=ds({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=ri(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${dn(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=ut(o)||"Unknown",d=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${m(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Vt(o,"avatar-small")}</span>
                    <span class="group-title">${u(l)}${u(d)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${dn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function Mw(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=Eo();s.sort((l,d)=>{const c=o[l],p=o[d],f=c?a[c.status]??3:3,g=p?a[p.status]??3:3;return f-g});let r=ri(t);s.forEach(l=>{const d=i[l];if(d.length===0)return;const c=o[l],p=c?c.name:l,f=c?c.status==="active"?" (Active)":c.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${u(p)}${f}</span>
                    <span class="group-count">${d.length}</span>
                    <span class="group-points">${dn(d)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(g,d)}
                </div>
            </div>
        `}),i[n].length>0&&(r+=`
            <div class="issue-group" data-group="${n}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${n}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${i[n].length}</span>
                    <span class="group-points">${dn(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function tm(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function no(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function Rw(e,t){const n=Xp(e,t);if(!n)return;const i=new Map(J().map(s=>[s.id,s]));Ye=Ye.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>ci(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function nm(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function jw(e,t){const n=Array.from(document.querySelectorAll(Ma)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Sn(s)}function im(e,t,n){nm(t,n);const i=Zp(Fa());eo.has(i)||eo.set(i,new Set);const s=eo.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),Rw(e,t.dataset.group)),jw(e,t)}function Pw(e){const t=document.getElementById("issues-list"),n=t&&tm(t,e);n&&im(t,n,!n.classList.contains("collapsed"))}function qw(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=Ye.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:tm(t,i.groupKey):(a=no(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||im(t,s,!1))}function Nw(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function sm(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=no(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function am(e,t){if(!e)return"";if(!t)return u(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return u(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${u(i)}<mark class="search-match">${u(s)}</mark>${u(a)}`}function Ow(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=am(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const Hw=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function ci(e){var f,g,b;const t=e.assignee_id?$t(e.assignee_id):null,n=t?ut(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":Hw.format(i),a=e.estimate!=null?gn(e.estimate,e.project_id):"",o=Co(e.estimate,e.project_id),r=e.sprint_id?Eo()[e.sprint_id]:null,l=r?r.name:null,d=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),c=!!d&&((b=e.title)==null?void 0:b.toLowerCase().includes(d.toLowerCase())),p=d&&!c?Ow(e.description,d):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${Le(e.priority)}">
                    ${mt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Te(e.status)}">
                    ${Qe(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${lt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${am(e.title,d)}${p?` <span class="issue-search-snippet" title="Matched in description">— ${p}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${te(y.color)}20; color: ${te(y.color)}">${u(y.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${m(e.id)}" title="Sprint: ${l?u(l):"None"}">
                    ${l?`<span class="sprint-badge">${u(l)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${m(e.id)}" title="${o?"Estimate outside current scale":`Estimate: ${a||"None"}`}">
                    ${a?`<span class="estimate-badge${o?" out-of-scale":""}">${a}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${m(e.id)}" title="${m(n||"Unassigned")}">
                    ${n?Vt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function mt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Qe(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ne({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}Pw(t.group)},"show-inline-dropdown":(e,t,n)=>{vl(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),ae(t.issueId))}});let di=[];function ft(){return di}function Fw(e){di=Array.isArray(e)?e:[]}function Uw(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?Lu(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${u(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Gw(e){var t,n;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=T())==null?void 0:n.id)!==e)return;di=i,cs(Pt,ft),Xn()}catch(i){console.error("Failed to load team agents:",i),_("load team agents",i)}}async function ws(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{di=await h.getTeamAgents(e),cs(Pt,ft),Xn(),zw()}catch(n){_("load agents",n)}}function zw(){var a;const e=document.getElementById("agents-list");if(!e)return;const t=(a=pe())==null?void 0:a.id,n=di.filter(o=>o.parent_user_id===t&&o.kind!=="session");if(n.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No agents yet",description:"Create an agent to give CLI automation its own identity"});return}const i=ie(),s=o=>{if(!o)return"Team-wide";const r=i.find(l=>l.id===o);return r?`Project ${r.key}`:"One project"};e.innerHTML=n.map(o=>{const r=m(o.id),l=di.filter(c=>c.registered_by_id===o.id).length,d=[s(o.agent_project_id),o.can_register?`Registrar · ${l} session${l===1?"":"s"}`:null,`Created ${Ie(o.created_at)}`].filter(Boolean).join(" · ");return`
      <a class="list-row-2line agent-link-row" href="/people/${r}" data-action="view-person" data-user-id="${r}">
        <div class="agent-link-avatar" aria-hidden="true">${Uw(o)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${u(o.name)}${o.is_active===!1?' <span class="badge badge-neutral">Deactivated</span>':""}</div>
          <div class="list-row-sub">${u(d)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`}).join("")}function Vw(){const e=ie();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
      <div class="form-group">
        <label>
          <input type="checkbox" id="agent-registrar">
          Registrar (registers one identity per Claude Code session)
        </label>
        <p class="form-help">A registrar's key can only register session identities and read; it cannot write as itself. See docs/agents.md.</p>
      </div>
      <div class="form-group" id="agent-project-select" style="display: none;">
        <label for="agent-project">Project</label>
        <select id="agent-project">
          ${e.map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),G()}function om(e,t,n=!1){const i=u(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
        <code>chaotic config set-session-identity auto</code>`:"";document.getElementById("modal-title").textContent=e,document.getElementById("modal-content").innerHTML=`
    <div class="api-key-created">
      <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
      <div class="api-key-display">
        <code id="new-agent-key">${i}</code>
        <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
      </div>
      <div class="api-key-instructions">
        <p>Configure the CLI to use this agent:</p>
        <code>chaotic auth set-key ${i}</code>
        ${s}
      </div>
      <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
    </div>
  `,G()}async function Ww(e){var r,l,d,c;e.preventDefault();const t=(r=T())==null?void 0:r.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(d=document.getElementById("agent-project"))==null?void 0:d.value,o=!!((c=document.getElementById("agent-registrar"))!=null&&c.checked);try{let p;s&&a?p=await h.createProjectAgent(a,n,i,o):p=await h.createTeamAgent(t,n,i,o),H(),om("Agent Created",p.api_key,!!p.can_register),await ws(),io(p.id,{created:!0})}catch(p){_("create agent",p)}return!1}async function Kw(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);om("New Agent Key",n.key),io(e,{credentials:!0})}catch(n){_("generate agent key",n)}}async function Yw(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),k(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),await ws(),io(e)}catch(s){_("change registrar",s)}}function io(e,{deleted:t=!1,created:n=!1,credentials:i=!1}={}){window.dispatchEvent(new CustomEvent("chaotic:agent-changed",{detail:{agentId:e,deleted:t,created:n,credentials:i}}))}function Qw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function Zw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),k("Agent deleted","success"),await ws(),io(e,{deleted:!0})}catch(n){_("delete agent",n)}}ne({"create-agent":e=>{Ww(e)},"copy-agent-key":()=>{Qw()},"dismiss-agent-modal":()=>{H(),ws()},"delete-agent":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Zw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Kw(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Yw(t.agentId,t.agentName,t.canRegister!=="true")}});function Xw(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Jw(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:Xw(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function e$(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function Sl(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=c=>{var f,g;const p=s.querySelectorAll(".mention-suggestion");p.length!==0&&(a=(c%p.length+p.length)%p.length,p.forEach((b,y)=>b.classList.toggle("highlighted",y===a)),(g=(f=p[a]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=c=>{const p=i.selectionStart||0,f=i.value.slice(0,p).replace(/@([a-zA-Z0-9._-]*)$/,`@${c} `),g=i.value.slice(p);i.value=f+g,i.focus(),o()},d=()=>{const c=i.selectionStart||0;if(e$(i.value,c)){o();return}const f=i.value.slice(0,c).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const g=f[2].toLowerCase(),b=Jw(Pt(),ft(),i.mentionContext||{}).filter(y=>!g||y.handle.includes(g)||y.name.toLowerCase().includes(g)||y.email.toLowerCase().includes(g)).slice(0,6);if(!b.length){o();return}s.innerHTML=b.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${u(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${u(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,$)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r($))}),r(0)};i.addEventListener("input",d),i.addEventListener("click",d),i.addEventListener("keydown",c=>{const p=!s.classList.contains("hidden");if(c.key==="Escape"&&p){c.preventDefault(),c.stopPropagation(),o();return}if(p){if(c.key==="ArrowDown")c.preventDefault(),r(a+1);else if(c.key==="ArrowUp")c.preventDefault(),r(a-1);else if(c.key==="Enter"||c.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(c.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const ui={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function pi(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function $s(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function Tl(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function so(e){return $s(e)&&!!Tl(e)}function ao(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],a=[];for(const o of n)((pi(o)||$s(o)&&!so(o))&&t?s:a).push(o);return{needsYou:s,waiting:a,done:i,total:n.length+i.length}}function Ll(e,t,n){return e===1?t:n}function ks(e){return pi(e)?"Review":so(e)?"Ask again for":$s(e)?"Sign off on":Tl(e)?"Re-attest":"Attest"}function Al(e,t){return pi(e)?"an admin":$s(e)&&!so(e)?"a person":t||"the assignee"}function t$(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function rm(e,t){return`<div class="ticket-gate-kicker">Waiting on ${u(e)}<span class="ticket-gate-when"> · ${t$(t)}</span></div>`}function n$(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${ui.link}${u(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${ui.link}Linked document</a>`}function lm(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${u(t.attested_by_name||"Someone")} attested ${u(st(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${gt(t.note)}</div>`:""}
            ${n$(t)}
        </div>`:""}function cm(e){const t=u(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${u(st(e.rejected_at))}`:"";return`${t} sent it back${n}: “${u(e.note||"")}”`}function dm(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!pi(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${cm(t)}</div>`}const mi=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function i$(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${mi(e,t)}>Send back…</button>`;return pi(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${mi(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${mi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function s$(e,t,n){return so(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${mi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":pi(e)||$s(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${mi(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${mi(e,t)}>Attest it yourself</button>`}function um(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${u(ks(n).toLowerCase())} <b>${u(n.name)}</b>${s}.</div>`}function Cl(e,t){const{needsYou:n,waiting:i,done:s,total:a}=e,o=(l,d,c,p)=>`<li class="${d}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${u(c)}</span><span class="ticket-gate-li-who">${u(p)}</span></li>`,r=[...s.map(l=>{var d;return o(ui.check,"done",l.name,(d=l.attestation)!=null&&d.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>o(ui.ring,"you",l.name,"waiting on you")),...i.map(l=>o(ui.ring,"",l.name,`waiting on ${Al(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${a} ${Ll(a,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function a$(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=ao(e,{canAct:t});return n[0]||i[0]||null}function o$(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:a}=ao(e,{canAct:t});if(a===0)return"";const o=i[0]||s[0];return o?`Waiting on ${i.length?"you":Al(o,n)}: ${ks(o).toLowerCase()} ${o.name}.`:`All ${a} ${Ll(a,"ritual","rituals")} done.`}function r$(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=ao(e,{canAct:n}),{needsYou:a,waiting:o,total:r}=s;if(r===0)return"";if(a.length===0&&o.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${ui.check}</span>
                ${Cl(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${Ll(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(a.length>0){const p=a[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(p.id)}">
                ${rm("you",p)}
                <h2 class="ticket-gate-step">${u(ks(p))} <b>${u(p.name)}</b></h2>
                ${p.prompt?`<div class="ticket-gate-asks markdown-body">${gt(p.prompt)}</div>`:""}
                ${lm(p)}
                ${dm(p)}
                <div class="ticket-gate-actions">${i$(p,t)}</div>
                ${um([...a.slice(1),...o],"Then")}
                ${Cl(s,i)}
            </section>`}const l=o[0],d=l.attestation?null:Tl(l),c=s$(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${rm(Al(l,i),l)}
            <h2 class="ticket-gate-step">${u(ks(l))} <b>${u(l.name)}</b></h2>
            ${d?`<div class="ticket-gate-asks">${cm(d)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${gt(l.prompt)}</div>`:""}
            ${lm(l)}
            ${dm(l)}
            ${c?`<div class="ticket-gate-actions">${c}</div>`:""}
            ${um(o.slice(1),"After that")}
            ${Cl(s,i)}
        </section>`}function l$(e,{canAct:t=!1}={}){const{needsYou:n}=ao(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${u(ks(i).toLowerCase())} <b>${u(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const oo=new Map;function Bl(){var e;return`${((e=T())==null?void 0:e.id)??""}|${Q()??""}`}function fi(e,t,n){oo.set(e,{key:t,value:n})}function ro(e,t){const n=oo.get(e);return n&&n.key===t?n.value:void 0}function _s(e,...t){for(const n of t)n!==e&&oo.delete(n)}function Dl(){oo.clear()}function lo(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}ct((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Dl(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Dl()});let Ae=null,pm=!1,Rn=!1,mm="new-comment";function c$(){return Ae||(Ae=document.createElement("div"),Ae.className="quote-tooltip",Ae.setAttribute("role","button"),Ae.setAttribute("tabindex","0"),Ae.setAttribute("aria-label","Quote selection in comment"),Ae.textContent="Quote",Ae.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),co())}),Ae.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Ae.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),co()}),document.body.appendChild(Ae),Ae)}function fm(e,t){const n=c$();n.style.display="flex",Rn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Rn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Es(){Ae&&(Ae.style.display="none"),Rn=!1}function d$(){return Rn}function gm(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Ml(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=gm(t.startContainer),i=gm(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function u$(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function co(e=mm){const t=Ml();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=u$(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Es(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function p$(){var i;if(!Ml())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return fm(n.left+n.width/2,n.top),!0}function m$(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Ml()){Es();return}fm(t,n)},10)}function hm({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(mm=t,i.addEventListener("mouseup",m$,n?{signal:n}:void 0),pm||(pm=!0,document.addEventListener("mousedown",s=>{Rn&&Ae&&!Ae.contains(s.target)&&Es()}),document.addEventListener("selectionchange",()=>{Rn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Es()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Rn&&(s.stopImmediatePropagation(),Es())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&p$()})))}function vm(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let mn=[],xs=[],uo=null,re=new Set,gi="list",jn=!1,Rl=null,po=null,jl=null,Pl=null,bm=null;function ym(e){if(bm!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const ql=Yv();(ql==="list"||ql==="grid")&&(gi=ql);function wm(e){if(e!=="list"&&e!=="grid")return;gi=e,e==="grid"&&jn&&Nl(),Qv(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Yt()}function $m(){if(gi!=="list")return;jn=!0,re.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Yt(),vi()}function Nl(){jn=!1,re.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Yt(),vi()}function f$(){Rl&&clearTimeout(Rl),Rl=setTimeout(()=>{Yt()},300)}function km(){const e=document.getElementById("doc-search");e&&(e.value=""),Yt()}async function g$(){km()}function h$(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=[];if(t&&n.push(`<span class="filter-chip">Search: "${u(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n.length>0){let s=n.join(" ");n.length>1&&(s+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=s,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function v$(){return mn}function Yt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";h$(),xs=mn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),d=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!d)return!1}return!0}),xs.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),_$("",gi)}let hi=0;async function b$(){var i;const e=uo||((i=T())==null?void 0:i.id);if(!e)return;const t=++hi,n=Q()||null;try{const s=await h.getDocuments(e,n);if(t!==hi)return;fi("documents",`${e}|${n??""}`,s),mn=s,Yt()}catch(s){if(t!==hi)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=V({icon:U.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),_("load documents",s)}}ct(e=>{e==="currentProject"&&C()==="documents"&&b$()});async function Pn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=T())==null?void 0:r.id),!e)return;uo=e,Mu(-1);const i=++hi;t===null&&(t=Q()||null);const s=`${e}|${t??""}`,a=n?ro("documents",s):void 0,o=document.getElementById("documents-list");a?(mn=a,Yt()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==hi)return;fi("documents",s,l);const d=a&&lo(mn,l);mn=l;const c=document.getElementById("doc-view-list"),p=document.getElementById("doc-view-grid");c&&p&&(c.classList.toggle("active",gi==="list"),p.classList.toggle("active",gi==="grid")),d||Yt()}catch(l){if(i!==hi)return;const d=document.getElementById("documents-list");d&&(d.innerHTML=V({icon:U.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),_("load documents",l)}}function _m(){var t,n;if(C()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=uo||((n=T())==null?void 0:n.id);e&&Pn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Em(e){ym(e)&&Ce(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function y$(e,t){ym(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),N("documents"))}function w$(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${te(t.color)}20; color: ${te(t.color)}">${u(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function $$(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${w$(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${u(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${u(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?u(vm(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${u(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function k$(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${te(r.color)}20; color: ${te(r.color)}">${u(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?vm(e.content).substring(0,80):"No content",s=jn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${re.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${jn&&re.has(e.id)?" selected":""}" data-action="${jn?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
      ${s}
      <div class="document-list-icon">${u(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${u(e.title)}</div>
        <div class="document-list-snippet text-muted">${u(i)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?u(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function _$(e="",t="list"){var d;const n=document.getElementById("documents-list");if(!n)return;re.clear(),vi();const i=xs;if(i.length===0){const c=(d=document.getElementById("doc-search"))==null?void 0:d.value,p=Q(),f=c||p;n.innerHTML=V({icon:f?U.search:U.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?$$:k$,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=ie();i.forEach(c=>{let p,f;if(e==="project")if(p=c.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const g=r.find(b=>b.id===c.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(p=c.sprint_id||"__no_sprint__",f=c.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:f,docs:[]}),o[p].docs.push(c)});let l="";for(const[c,p]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${u(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function E$(e){re.has(e)?re.delete(e):re.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=re.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",re.has(e)),vi()}function x$(){xs.forEach(e=>re.add(e.id)),xs.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),vi()}function xm(){re.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),re.clear(),vi()}function vi(){const e=document.getElementById("doc-bulk-actions");e&&(jn?(e.classList.remove("hidden"),re.size>0?e.innerHTML=`
        <span class="bulk-count">${re.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function I$(){if(re.size===0){k("No documents selected","error");return}const t=ie().map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${re.size} Document${re.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${re.size} selected document${re.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,G()}async function S$(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(re);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(d){console.error(`Failed to move document ${l}:`,d),s.push(((o=mn.find(c=>c.id===l))==null?void 0:o.title)||l)}H(),xm(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=T())==null?void 0:r.id;return await Pn(a),!1}async function T$(){var a,o;if(re.size===0){k("No documents selected","error");return}const e=re.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(re);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=mn.find(d=>d.id===r))==null?void 0:a.title)||r)}Nl(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=T())==null?void 0:o.id;await Pn(s)}async function L$(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${m(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${u(s.author_name||"Unknown")}</span>
                ${Aa(s.author)}
                <span class="comment-date">${st(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${za(s.content)}</div>
            </div>
          </div>
        `}).join("")}</div>
        <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${m(e.id)}">
          <textarea id="new-doc-comment" placeholder="Write a comment... (${t}+Enter to submit)" rows="1"></textarea>
          <div id="doc-mention-suggestions" class="mention-suggestions hidden"></div>
          <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
        </form>
      </div>
    `}catch(n){return console.error("Failed to load comments:",n),`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-error">
          Couldn't load comments.
          <button type="button" class="btn btn-secondary btn-sm" data-action="retry-document-comments" data-document-id="${m(e.id)}">Retry</button>
        </div>
      </div>
    `}}function A$(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=wu(e);s&&(i.value=s),i.addEventListener("input",()=>{Sa(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),Sl("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ce(e,t=!0){try{t&&hn();const n=await h.getDocument(e);bm=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await L$(n);let a=null,o=null,r=!1;if(n.project_id){const D=ie().find(O=>O.id===n.project_id);if(a=D?D.name:null,n.sprint_id)try{const O=await h.getSprint(n.sprint_id);o=O?O.name:null}catch(O){console.error("Failed to load sprint name:",O),r=!0}}let l=n.content||"";const d=Y.lexer(l);n.title&&d.length>0&&d[0].type==="heading"&&d[0].depth===1&&d[0].text.trim()===n.title.trim()&&(l=l.slice(d[0].raw.length).trimStart());const c=v$(),p=c.findIndex(w=>w.id===n.id),f=p>0?c[p-1]:null,g=p>=0&&p<c.length-1?c[p+1]:null,b=p>=0,y=C()||"documents",$=n.labels&&n.labels.length>0?n.labels.map(w=>`
          <span class="issue-label" style="background: ${te(w.color)}20; color: ${te(w.color)}">
            ${u(w.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(w.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let L='<span class="text-muted">None</span>';try{const w=await h.getDocumentIssues(n.id);w.length>0&&(L=w.map(D=>`
          <div class="linked-item">
            <span class="linked-item-id">${u(D.identifier)}</span>
            <span class="linked-item-title">${u(D.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(D.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(w){console.error("Failed to load linked issues:",w),L=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${m(y)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${b?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${m(f.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${p+1} / ${c.length}</span>
              <button class="issue-nav-btn" ${g?`data-action="view-document" data-document-id="${m(g.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?u(a)+" ›":""} ${u(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?u(n.icon)+" ":""}${u(n.title)}</h1>

          <div class="document-content markdown-body">${l?Mn(l):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?u(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:u(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${$}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${m(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${u(n.author_name||"Unknown")} ${Aa(n.author)}</span>
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
              ${L}
            </div>
            <button class="btn btn-secondary btn-small sidebar-link-btn" data-action="show-link-issue-modal" data-document-id="${m(n.id)}">+ Link Issue</button>
          </div>

          <div class="sidebar-section sidebar-actions">
            <div class="sidebar-overflow-menu">
              <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
              <div class="overflow-menu-dropdown hidden">
                <button class="overflow-menu-item" data-action="show-edit-document-modal" data-document-id="${m(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit document
                </button>
                <button class="overflow-menu-item" data-action="show-document-revisions" data-document-id="${m(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  View history
                </button>
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${m(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `,po&&po.abort(),po=new AbortController;const{signal:x}=po,M=i.querySelector(".sidebar-overflow-trigger"),j=i.querySelector(".overflow-menu-dropdown");if(M&&j){const w=()=>{j.classList.add("hidden"),M.setAttribute("aria-expanded","false")},D=()=>{const O=j.classList.toggle("hidden");M.setAttribute("aria-expanded",String(!O))};M.addEventListener("click",D,{signal:x}),document.addEventListener("click",O=>{!M.contains(O.target)&&!j.contains(O.target)&&w()},{signal:x}),j.addEventListener("keydown",O=>{O.key==="Escape"&&(w(),M.focus())},{signal:x})}A$(n.id,x,n.project_id||null),hm({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:x}),jl=f?f.id:null,Pl=g?g.id:null;const I=w=>{if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&co("new-doc-comment")){w.preventDefault();return}w.metaKey||w.ctrlKey||w.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(w.key==="ArrowLeft"&&jl?(w.preventDefault(),Ce(jl)):w.key==="ArrowRight"&&Pl&&(w.preventDefault(),Ce(Pl)))};document.addEventListener("keydown",I,{signal:x})}catch(n){_("load document",n)}}async function mo(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const l=a.find(d=>d.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${u(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Ol(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${u(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function C$(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?Mn(r):'<span class="text-muted">Nothing to preview.</span>'}}function Hl(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Eu(e);if(o){const l=Vv(e),d=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,c=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):d?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),c&&(c.textContent="Restored your unsaved draft.",c.classList.remove("hidden"))):c&&(c.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",c.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Ta(e,null);return}Ta(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function Im(){Is=null;const e=ie(),t=sf()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${u(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Ol("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),Hl("new"),t&&await mo("doc-sprint",t,null,!0)}let Is=null;async function B$(e,t,n){Is=n||null;const s=ie().map(a=>`<option value="${m(a.id)}" ${a.id===t?"selected":""}>${u(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
    <form data-action="create-document">
      <div class="form-group">
        <label for="doc-title">Title</label>
        <input type="text" id="doc-title" required>
      </div>
      <div class="form-group">
        <label for="doc-project">Project</label>
        <select id="doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="doc-sprint">
          <option value="">Global (Team-wide)</option>
          ${s}
        </select>
      </div>
      <div class="form-group">
        <label for="doc-sprint">Sprint</label>
        <select id="doc-sprint" disabled>
          <option value="">Loading sprints...</option>
        </select>
      </div>
      ${Ol("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),Hl("new"),t&&await mo("doc-sprint",t,e)}async function D$(e){var a;e.preventDefault();const t=(a=T())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),Ta("new",null),await Pn(t),H(),k("Document created!","success"),Is){const o=Is;Is=null,o()}}catch(o){_("create document",o)}return!1}let Fl=null,Ss=null,Ul=!1;async function Sm(e){try{const t=await h.getDocument(e);Fl=e,Ss={title:t.title||"",content:t.content||""},Ul=!1;const i=ie().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${u(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form data-action="update-document" data-document-id="${m(e)}">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${m(t.title)}" required>
        </div>
        <div class="form-group">
          <label for="edit-doc-project">Project</label>
          <select id="edit-doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="edit-doc-sprint">
            <option value="" ${t.project_id?"":"selected"}>Global (Team-wide)</option>
            ${i}
          </select>
        </div>
        <div class="form-group">
          <label for="edit-doc-sprint">Sprint (optional)</label>
          <select id="edit-doc-sprint" ${t.project_id?"":"disabled"}>
            <option value="">${t.project_id?"None":"Select project first"}</option>
          </select>
        </div>
        <div id="edit-doc-content-draft-warning" class="description-draft-warning hidden"></div>
        ${Ol("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,G(),Hl(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await mo("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){_("load document",t)}}async function M$(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&Fl===t&&Ss&&!Ul){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==Ss.title||(o.content||"")!==Ss.content))return Ul=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),Fl=null,Ss=null;const o=Eu(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&Ta(t,null),H(),await Ce(t),k("Document updated!","success")}catch(o){_("update document",o)}return!1}async function R$(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await Pn(n),N("documents"),k("Document deleted!","success")}catch(n){_("delete document",n)}}function j$(e,t){mo(e,t)}async function P$(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,G()}async function q$(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(o.id)}">
        <span class="link-result-id">${u(o.identifier)}</span>
        <span class="link-result-title">${u(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function N$(e,t){try{await h.linkDocumentToIssue(e,t),H(),k("Issue linked!","success"),await Ce(e,!1)}catch(n){_("link issue",n)}}async function O$(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await Ce(e,!1)}catch(n){_("unlink issue",n)}}let Gl=!1;async function H$(e,t){if(e.preventDefault(),Gl)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;Gl=!0;try{const s=await h.createDocumentComment(t,i);n.value="",k("Comment added!","success"),La(s),await Ce(t,!1)}catch(s){_("add comment",s)}finally{Gl=!1}return!1}async function F$(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,G();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${te(a.color)}; color: white;">${u(a.name)}</span>
        ${a.description?`<span class="text-muted">${u(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,G()}catch(i){_("load labels",i)}}async function U$(e,t){try{await h.addLabelToDocument(e,t),H(),k("Label added!","success"),await Ce(e,!1)}catch(n){_("add label",n)}}async function G$(e,t){try{await h.removeLabelFromDocument(e,t),k("Label removed!","success"),await Ce(e,!1)}catch(n){_("remove label",n)}}ne({"view-document":(e,t)=>{e.preventDefault(),Ce(t.documentId)},"set-doc-editor-mode":(e,t)=>{C$(t.target,t.mode)},"retry-load-documents":()=>{Pn(uo)},"retry-document-comments":(e,t)=>{Ce(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{E$(t.docId)},"clear-doc-search":()=>{km()},"clear-all-doc-filters":()=>{g$()},"show-bulk-move-modal":()=>{I$()},"bulk-delete-documents":()=>{T$()},"select-all-docs":()=>{x$()},"clear-doc-selection":()=>{xm()},"exit-selection-mode":()=>{Nl()},"enter-selection-mode":()=>{$m()},"handle-bulk-move":e=>{S$(e)},"unlink-document-issue":(e,t)=>{O$(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{P$(t.documentId)},"add-document-comment":(e,t)=>{H$(e,t.documentId)},"remove-label-from-doc":(e,t)=>{G$(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{F$(t.documentId)},"show-edit-document-modal":(e,t)=>{Sm(t.documentId)},"delete-document":(e,t)=>{R$(t.documentId)},"create-document":e=>{D$(e)},"update-doc-sprint-dropdown":(e,t,n)=>{j$(t.sprintSelect,n.value)},"update-document":(e,t)=>{M$(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{q$(n.value,t.documentId)},"link-to-issue":(e,t)=>{N$(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{U$(t.documentId,t.labelId)}});async function Tm(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=yi(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${u(o.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${m(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${m(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
                    <textarea id="edit-issue-description">${u(t.description||"")}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-issue-status">Status</label>
                    <select id="edit-issue-status" data-original="${m(t.status)}">
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
                        <option value="refactor" ${t.issue_type==="refactor"?"selected":""}>Refactor</option>
                        <option value="epic" ${t.issue_type==="epic"?"selected":""}>Epic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-estimate">Estimate</label>
                    <select id="edit-issue-estimate">
                        ${s}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${n.filter(o=>o.status!=="completed").map(o=>`
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${u(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,G();const a=document.getElementById("edit-issue-description");if(a){const o=es(e);if(o){const r=ku(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?xn(e,r,t.description||""):xn(e,null)})}}catch(t){_("load issue",t)}}async function z$(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const d={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(d.status=s.value);const c=await h.updateIssue(t,d);es(t)===d.description&&xn(t,null),H(),await ae(t),k("Issue updated!","success"),fs(c)}catch(n){_("update issue",n)}}async function V$(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Bt(),await ht(),N("issues"),k("Issue deleted!","success")}catch(t){_("delete issue",t)}}ne({"update-issue":(e,t)=>{z$(e,t.issueId)}});let zl=!1,Vl=!1,fo=null,Ts=null,Ls=null,go=null,Wl=!1,ho=null;function Kl(e=null){Wl=!0,e&&(ho=e)}function Lm(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function Yl(e){return e.user_name||e.user_email||"Unknown"}const Ql=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function Zl(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${u(Te(t(e.old_value)))}</strong> to <strong>${u(Te(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${u(Le(t(e.old_value)))}</strong> to <strong>${u(Le(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${u(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${u(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${u(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${Ql(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${Ql(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${Ql(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return u(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue"}}async function As(e){const t=()=>{var i;const n=(i=$e())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;fo=n,tc(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;fo=null,tc(e)}}function Am(){const e=pe();if(!e||e.is_agent)return!1;const t=Pt();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}let Cs=null,Xl=!0;function Jl(){var a;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!Xl;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((a=e.firstElementChild)==null?void 0:a.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function Cm(){Cs&&(Cs.disconnect(),Cs=null),Xl=!0,Jl()}const W$=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function K$(){Cm();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!W$()||(Cs=new IntersectionObserver(t=>{Xl=t[t.length-1].isIntersecting,Jl()}),Cs.observe(e))}function Y$(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let ec=null;function tc(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&ec===e,s=document.activeElement,a=!!t&&!!s&&(t.contains(s)||s===document.body),o=fo,r=Am(),l=$e(),d=l&&l.id===e?l:null,c=d!=null&&d.assignee_id?$t(d.assignee_id):null,p=c?ut(c):(d==null?void 0:d.assignee_name)||null;if(((b,y)=>{b&&(b.innerHTML=y,b.classList.toggle("hidden",y.trim()===""))})(t,o?r$(o,e,{canAct:r,assigneeName:p}):""),t&&(t.dataset.issueId=e),ec=e,n){const b=o?l$(o,{canAct:r}):"";n.innerHTML=b?`<div class="ticket-gate-sticky-bar">${b}</div>`:"",Jl()}if(i){const b=document.getElementById("ticket-gate-live");if(b&&(b.textContent=o?o$(o,{canAct:r,assigneeName:p}):""),a&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function vo({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function Q$(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&vo({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||vo()},{signal:e})}async function bo(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await ae(t.id,!1),!0):(N("my-issues",!1),!1)}catch{return N("my-issues",!1),!1}}function nc(e){const t=as(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function ic({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Z$(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=$e();if(!t)return;const n=nc(t.id);Ts=n.prevIssue?n.prevIssue.id:null,Ls=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=ic(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}ct(e=>{e==="detailNavContext"&&Z$()});let Bs=0;const Bm=500;function X$(){Bs++}let Dm=0,yo=!1;function Mm(){if(document.querySelector(".description-inline-editor"))return"editor";if(ni())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)")||e!=null&&e.querySelector("details.related-add[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||yo?"transient":null}function Rm(e){return Kl(),e==="editor"?"deferred":"retry"}function J$(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=$e())==null?void 0:n.id)===e}function ek(e){return J().find(t=>t.id===e)||rl(e)||as().find(t=>t.id===e)||null}function tk(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Cm(),ec=null,Zn(e);const i=nc(e.id);Ts=i.prevIssue?i.prevIssue.id:null,Ls=i.nextIssue?i.nextIssue.id:null;const s=ie().find(r=>r.id===e.project_id),a=e.assignee_id?$t(e.assignee_id):null,o=C()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${ic(i)}
                        <span class="issue-detail-breadcrumb">${s?u(s.name):"Project"} › ${u(e.identifier)}</span>
                    </div>
                    <h1 class="issue-detail-title">${u(e.title)}</h1>
                    <div class="issue-detail-description">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title" style="width: 70%"></div>
                    </div>
                </div>
                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Qe(e.status)}<span>${Te(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${mt(e.priority)}<span>${Le(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?u(ut(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function ae(e,t=!0,{refresh:n=!1}={}){var a;const i=n?Bs:++Bs,s=++Dm;if(n){const o=Mm();if(o)return Rm(o)}try{t&&hn();let o=!1;if(!n){const A=ek(e);A&&(tk(A),t&&(history.pushState({issueId:e,view:C()},"",`/issue/${A.identifier}`),o=!0))}let r=!1;const[l,d,c,p,f,g]=await Promise.all([h.getIssue(e),h.getComments(e).catch(A=>(console.error("Failed to load comments:",A),r=!0,[])),h.getActivities(e,0,Bm),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),b=[...d].sort((A,ce)=>new Date(A.created_at)-new Date(ce.created_at)),y=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(A=>(console.error("Failed to load sprints:",A),[]))],[$,L]=await Promise.all(y);if(i!==Bs)return"dropped";let x=null,M=null;if(n){if(s!==Dm||!J$(e))return"dropped";const A=Mm();if(A)return Rm(A);M=window.scrollY;const ce=document.activeElement;ce!=null&&ce.id&&document.getElementById("issue-detail-view").contains(ce)&&(x={id:ce.id,start:ce.selectionStart,end:ce.selectionEnd})}fo=g,t&&!o&&history.pushState({issueId:e,view:C()},"",`/issue/${l.identifier}`),Zn(l),Pu(L),Wl=!1,ho=null,document.querySelectorAll(".view").forEach(A=>A.classList.add("hidden"));const j=document.getElementById("issue-detail-view");j.classList.remove("hidden");const I=C()||"my-issues",w=ie().find(A=>A.id===l.project_id),D=l.assignee_id?$t(l.assignee_id):null,O=D?ut(D):null,K=l.sprint_id?L.find(A=>A.id===l.sprint_id):null,_e=nc(l.id),{prevIssue:E,nextIssue:q}=_e;j.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(I)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${ic(_e)}
                        <span class="issue-detail-breadcrumb">${w?u(w.name):"Project"} › ${u(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(l.title)}</h1>
                    ${Sp(l,O,{formatEstimate:gn})}

                    ${$?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent($.identifier)}" data-action="navigate-issue" data-issue-id="${m($.id)}" data-identifier="${m($.identifier)}">${$.identifier}: ${u($.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${es(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${m(l.id)}">
                                ${es(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${m(l.id)}">
                            ${l.description?Mn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${yy(l,p,f,{formatEstimate:gn})}

                    ${Ey({comments:b,activities:c,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((a=a$(g,{canAct:Am()}))==null?void 0:a.name)||null,activitiesTruncated:c.length>=Bm},{formatText:Zl,formatActor:Yl})}

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${m(l.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${m(l.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${Qe(l.status)}
                                <span>${Te(l.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${m(l.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${mt(l.priority)}
                                <span>${Le(l.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${m(l.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${lt(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${O?`${Vt(D,"avatar-small")}<span>${u(O)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${m(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${K?u(K.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${m(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(A=>`
                                        <span class="issue-label" style="background: ${te(A.color)}20; color: ${te(A.color)}">${u(A.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${w?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${u(w.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${m(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${Co(l.estimate,l.project_id)?" out-of-scale":""}" ${Co(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${gn(l.estimate,l.project_id)}</span>
                            </button>
                        </div>

                        ${l.due_date?`
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(l.due_date).toLocaleDateString()}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${u(l.creator_name||"Unknown")} ${Aa(l.creator)}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(l.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${m(l.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item" data-action="show-issue-description-revisions" data-issue-id="${m(l.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Description history
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${m(l.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,go&&go.abort(),go=new AbortController;const{signal:B}=go,Z=document.querySelector(".sidebar-overflow-trigger"),Ee=document.querySelector(".overflow-menu-dropdown");if(Z&&Ee){const A=()=>{Ee.classList.add("hidden"),Z.setAttribute("aria-expanded","false")},ce=()=>{const he=Ee.classList.toggle("hidden");Z.setAttribute("aria-expanded",String(!he))};Z.addEventListener("click",ce,{signal:B}),document.addEventListener("click",he=>{!Z.contains(he.target)&&!Ee.contains(he.target)&&A()},{signal:B}),Ee.addEventListener("keydown",he=>{he.key==="Escape"&&(he.stopPropagation(),A(),Z.focus())},{signal:B})}K$(),tc(l.id),Sl("new-comment","mention-suggestions",{projectId:l.project_id}),hm({signal:B}),Q$(B);const le=document.getElementById("new-comment");if(yo=!1,le){le.addEventListener("compositionstart",()=>{yo=!0},{signal:B}),le.addEventListener("compositionend",()=>{yo=!1},{signal:B});const A=wu(l.id);A&&(le.value=A),le.addEventListener("input",()=>{Sa(l.id,le.value)}),le.addEventListener("keydown",ce=>{var he;ce.key==="Enter"&&(ce.metaKey||ce.ctrlKey)&&(ce.preventDefault(),(he=le.closest("form"))==null||he.requestSubmit())})}Ts=E?E.id:null,Ls=q?q.id:null;const bt=A=>{var de;if((A.metaKey||A.ctrlKey)&&A.shiftKey&&(A.key===">"||A.key==="."||A.code==="Period")&&co()){A.preventDefault();return}if(A.metaKey||A.ctrlKey||A.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||A.target.tagName==="INPUT"||A.target.tagName==="TEXTAREA"||A.target.tagName==="SELECT"||A.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||ni())return;if(A.key==="ArrowLeft"&&Ts)A.preventDefault(),ae(Ts);else if(A.key==="ArrowRight"&&Ls)A.preventDefault(),ae(Ls);else if(A.key==="c"){A.preventDefault(),A.stopImmediatePropagation();const ee=document.getElementById("new-comment");ee&&(ee.focus(),ee.scrollIntoView({behavior:"smooth",block:"nearest"}))}else A.key==="j"?(A.preventDefault(),A.stopImmediatePropagation(),wo(1)):A.key==="k"?(A.preventDefault(),A.stopImmediatePropagation(),wo(-1)):A.key==="d"&&(A.preventDefault(),(de=document.querySelector('[data-action="edit-description"]'))==null||de.click());const he={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[A.key];if(he){const ee=document.querySelector(`.property-row[data-field="${he}"]`);ee&&(A.preventDefault(),ee.click())}};if(document.addEventListener("keydown",bt,{signal:B}),x){const A=document.getElementById(x.id);if(A&&(A.focus({preventScroll:!0}),typeof x.start=="number"&&typeof A.setSelectionRange=="function"))try{A.setSelectionRange(x.start,x.end)}catch{}}return M!==null&&window.scrollTo(0,M),"rendered"}catch(o){if(n)console.error("Failed to refresh issue detail:",o);else{if(i!==Bs)return"dropped";_("load issue",o);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(o==null?void 0:o.status)===403||(o==null?void 0:o.status)===404;r.innerHTML=V(l?{icon:U.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:U.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function nk(e,t){if(e.preventDefault(),zl)return!1;const n=document.getElementById("new-comment").value;Sa(t,null),zl=!0;try{const i=await h.createComment(t,n);k("Comment added!","success"),La(i),await ae(t)}catch(i){Sa(t,n),_("add comment",i)}finally{zl=!1}return!1}async function ik(e){const t=$e()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${u(t.description||"")}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=es(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const d=ku(e);r&&(d===null||d!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}Sl("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const d=a.value;d!==(t.description||"")?xn(e,d,t.description||""):xn(e,null);const c=document.getElementById("edit-description-preview");c&&c.style.display!=="none"&&jm()}),a.addEventListener("keydown",d=>{var c,p;d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),(c=document.getElementById("save-description-edit"))==null||c.click()),d.key==="Escape"&&(d.preventDefault(),d.stopPropagation(),(p=document.getElementById("cancel-description-edit"))==null||p.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var p,f;if(!((((p=document.getElementById("edit-description"))==null?void 0:p.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(xn(e,null),Wl){ae(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Mn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(Vl)return;const d=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(d===void 0)return;const c=ho?ho.description||"":null;if(c!==null&&c!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const p=document.getElementById("save-description-edit");Vl=!0,p&&(p.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:d}),xn(e,null),k("Description updated","success"),await ae(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(y){_("update description",y)}finally{Vl=!1,p&&(p.disabled=!1)}})}function jm(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Mn(n):'<span class="text-muted">Nothing to preview.</span>'}function sk(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?jm():i.focus()}function ak(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-add-relation" data-issue-id="${m(e)}">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-relate" data-issue-id="${m(e)}">
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
    `,G(),document.getElementById("relation-issue-search").focus()}async function ok(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${u(r.identifier)}</span>
                <span class="link-result-title">${u(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function rk(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function lk(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function ck(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),H(),k("Relation added","success"),ae(t)}catch(s){_("add relation",s)}return!1}async function dk(e,t){try{await h.deleteRelation(e,t),k("Relation removed","success"),ae(e)}catch(n){_("remove relation",n)}}function wo(e){const t=$e();if(!t)return;const n=as();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||ae(n[s].id)}ne({"retry-issue-comments":(e,t)=>{ae(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Ty(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||ik(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),Ce(t.documentId))},"scroll-to-ticket-gate":()=>{Y$()},"save-comment":(e,t)=>{nk(e,t.issueId)},"show-add-relation-modal":(e,t)=>{vo(),ak(t.issueId)},"remove-relation":(e,t)=>{dk(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{vo(),pp(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{ck(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{ok(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{rk(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{lk()},"set-description-editor-mode":(e,t)=>{sk(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>wo(-1),"navigate-next-issue":()=>wo(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Tm(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),V$(t.issueId)}});let Dt=[],$o={},ko=new Set,Qt=null,sc=null,_o=[],Ds=[],ac=[];function Eo(){return $o}function uk(){return sc}function pk(){return Qt}ct(e=>{e==="currentProject"&&C()==="sprints"&&fn()});let oc=0;async function fn({fromMemory:e=!1}={}){ju(-1);const t=Q();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Sprints belong to one project. Pick one in the sidebar switcher, or press P.</p>
                </div>
            `);return}const n=++oc;Tk();const i=document.getElementById("sprints-list"),s=Bl(),a=e?ro("sprints",s):void 0;a?(Dt=a,Pm()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=o.some(d=>d.status==="active")?o:await h.getSprints(t);if(n!==oc)return;const l=a&&lo(Dt,r);Dt=r,fi("sprints",s,r),l||Pm(),await xo()}catch(o){return n!==oc?void 0:(i&&(i.innerHTML=V({icon:U.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),_("load sprints",o),!1)}return!0}function Pm(){const e=document.getElementById("sprints-list");if(!e)return;const t=Dt.find(a=>a.status==="active"),n=Dt.find(a=>a.status==="planned"),i=Dt.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${m(t.id)}" data-sprint-url="/sprint/${m(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${u(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${m(t.id)}" data-sprint-name="${m(t.name)}" data-budget="${t.budget||""}" data-project-id="${m(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${m(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,s+=mk(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${m(n.id)}" data-sprint-url="/sprint/${m(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${u(n.name)}</div>
                <div class="sprint-card-budget">${o}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${m(n.id)}" data-sprint-name="${m(n.name)}" data-budget="${n.budget||""}" data-project-id="${m(n.project_id)}">Edit Sprint</button>
                    ${n.budget_explicit===!0?`
                        <button class="btn btn-secondary btn-small" data-action="follow-default-budget" data-sprint-id="${m(n.id)}" title="Drop the hand-set budget: this sprint takes the project default and follows later changes to it">Follow project default</button>
                    `:""}
                </div>
            </div>
        `}i.length>0&&(s+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${i.length})</summary>
                <div class="sprint-history-list">
                    ${i.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${m(a.id)}" data-sprint-url="/sprint/${m(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${u(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||V({icon:U.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function qm(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${uc(e.activated_at)}, closed ${uc(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${uc(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function mk(e){if(!(e.budget!==null&&e.budget!==void 0))return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Progress</h4>
                    <span class="text-muted">Set a sprint budget to see progress; a spent budget ends a sprint, not a date</span>
                </div>
            </div>
        `;const n=e.budget,i=e.points_spent||0,s=Math.max(n-i,0),a=Math.min(Math.round(i/n*100),100),o=i>n?" arrears":e.limbo?" limbo":"",r=i>n?`in arrears by ${i-n} pt${i-n===1?"":"s"}: close the sprint to continue`:e.limbo?"closed, waiting on sprint rituals":`${s} of ${n} pts remaining`;return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Progress</h4>
                <div class="sprint-burndown-meta">
                    <span>${u(qm(e))||"not yet activated"}</span>
                    <span>${u(r)}</span>
                </div>
            </div>
            <div class="sprint-status-progress" role="progressbar" aria-label="Sprint budget spent"
                 aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${Math.min(i,n)}">
                <div class="sprint-progress-bar">
                    <div class="sprint-progress-fill${o}" style="width: ${a}%"></div>
                </div>
                <span class="text-muted">${i}/${n} pts</span>
            </div>
        </div>
    `}let rc=0;async function bi(e,t=!0){var n;try{t&&hn();const i=++rc,s=C(),a=await h.getSprint(e);if(i!==rc)return;if(!a){k("Sprint not found","error"),N("sprints");return}sc=a;const o=(n=T())==null?void 0:n.id,[r,l,d]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(c=>(console.error("Failed to load sprint transactions:",c),[])),o?h.getDocuments(o,a.project_id,null,e).catch(c=>(console.error("Failed to load sprint documents:",c),[])):[]]);if(i!==rc)return;_o=r,ac=l,Ds=d,C()===s&&Lt(_o),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),gk()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),N("sprints")}}async function fk(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),N("sprints",!1);return}try{await bi(e,!1)}catch{N("sprints",!1)}}function gk(){const e=sc,t=_o;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=C()||"sprints",s=t.filter(g=>ls.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,y)=>b+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),d=r(a),c=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let p="";e.status==="active"?p='<span class="badge badge-status-active">Active</span>':e.status==="planned"?p='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(p='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${m(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${u(e.name)}</h2>
                ${p}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${u(qm(e))}
                </div>
            `:""}
        </div>

        <div class="sprint-detail-stats">
            <div class="stat-card">
                <div class="stat-value">${s.length}</div>
                <div class="stat-label">Open Issues</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${a.length}</div>
                <div class="stat-label">Completed</div>
            </div>
            <button type="button" class="stat-card stat-card-link" data-action="scroll-to-budget-ledger"
                title="Show the budget ledger: one transaction each time an issue moved to done while this sprint was active">
                <div class="stat-value">${f}</div>
                <div class="stat-label">Budget spent</div>
                <div class="stat-note">See ledger ↓</div>
            </button>
            <div class="stat-card">
                <div class="stat-value">${d} / ${l}</div>
                <div class="stat-label">Points done of scope</div>
                ${c}
            </div>
        </div>

        <div class="sprint-detail-sections">
            <div class="sprint-detail-section">
                <h3>Open Issues (${s.length})</h3>
                ${s.length===0?V({icon:U.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>lc(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?V({icon:U.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>lc(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>lc(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${vk()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Ds.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${m(e.id)}"
                        data-project-id="${m(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Ds.length>0?`
                    <div class="sprint-issues-list">
                        ${Ds.map(g=>hk(g)).join("")}
                    </div>
                `:V({icon:U.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function lc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Ou,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${u(e.identifier)}</span>
            <span class="sprint-issue-title">${u(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${Ck(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function hk(e){const t=u(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${u(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${st(e.created_at)}</span>
            </span>
        </div>
    `}function vk(){const e=ac;if(!e||e.length===0)return`
            <div class="empty-state-small">
                <p>No budget transactions yet. Points are recorded when issues are marked done.</p>
            </div>
        `;const t=e.reduce((n,i)=>n+i.points,0);return`
        <div class="budget-ledger">
            <div class="budget-ledger-header">
                <span class="text-muted">${e.length} transaction${e.length===1?"":"s"}</span>
                <span class="budget-ledger-total">${t} points total</span>
            </div>
            <div class="budget-ledger-list">
                ${e.map(n=>`
                    <div class="budget-ledger-item">
                        <div class="ledger-item-info">
                            <span class="ledger-item-identifier">${u(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${u(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${bk(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function bk(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function yk(e,t,n,i){const s=i?t_(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${m(e)}" data-project-id="${m(i)}" data-current-budget="${m(n??"")}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${m(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${s?`<small class="form-hint">${u(s)}</small>`:""}
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
    `,G()}async function wk(e,t,n){var p,f,g,b;e.preventDefault();const i=(f=(p=document.getElementById("sprint-name"))==null?void 0:p.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,d=a!==l,c=Dt.find(y=>y.id===t);try{const y={};i&&(y.name=i);const $=o==="default"&&(c==null?void 0:c.status)==="planned"&&(c==null?void 0:c.budget_explicit)===!1;if(d&&!$&&(y.budget=a),Object.keys(y).length&&await h.updateSprint(t,y),o==="planned"){const x=Dt.filter(M=>M.status==="planned"&&M.id!==t);for(const M of x)await h.updateSprint(M.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await fn(),H(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(y){_("update budget",y)}return!1}const Nm="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function $k(e,t=null){const n=Dt.find(d=>d.id===e),i=n?ie().find(d=>d.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Nm}

Follow the project default anyway?`))return;const s=d=>d==null?"unlimited":`${d} points`;t&&(t.disabled=!0);let a;try{a=await h.updateSprint(e,{budget_follows_default:!0})}catch(d){_("reset budget to project default",d),t&&(t.disabled=!1);try{await fn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await fn()!==!1}catch{l=!1}k(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&k(Nm,"warning")}async function kk(e){const t=Dt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,G();const n=ls;let i=0,s=!1,a=!1;try{const[l,d]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(c=>n.includes(c.status)).length,s=d.some(c=>c.is_active&&c.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${u(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${m(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function _k(e){try{const t=await h.closeSprint(e);await fn(),Fm(),t.limbo?xk(t):k("Sprint completed!","success")}catch(t){_("complete sprint",t)}}async function xo(){const e=Q();if(e)try{Qt=await h.getLimboStatus(e),Ek()}catch(t){console.error("Failed to load limbo status:",t)}}function Ek(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Qt||!Qt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Qt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function xk(e){const t=Q();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${u(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,G(),Ik(t)}async function Ik(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${u(i.name)} <span class="ritual-mode">(${u(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${gt(i.prompt)}</div>
                    ${dc(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function cc(){var t,n;if(!Qt)return;const e=Q();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Qt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${u(i.name)}</strong>
                            <span class="badge badge-ritual-${m(i.approval_mode)}">${u(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${gt(i.prompt)}</div>
                        ${dc(i.attestation)}
                        ${Sk(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Qt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Qt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${u(i.name)}</div>
                            ${dc(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,G()}function dc(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${u(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${u(st(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${gt(e.note)}</div>
        </div>
    `}function Sk(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Om(e){for(const t of e)if(!ko.has(t))try{(await h.getSprints(t)).forEach(i=>{$o[i.id]=i}),ko.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Tk(){$o={},ko=new Set,_o=[],ac=[],Ds=[],Io={}}function Lk(e,t){t.forEach(n=>{$o[n.id]=n}),ko.add(e)}let Io={};function Ak(e){return Io[e]}function Hm(e,t){Io[e]=t??null}function Fm(){Io={}}ne({"retry-load-sprints":()=>fn(),"view-sprint":(e,t,n)=>{if(!(e.type==="keydown"&&(n==null?void 0:n.tagName)==="BUTTON")){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}bi(t.sprintId)}},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;yk(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{$k(t.sprintId,n)},"show-limbo-details-modal":()=>{cc()},"show-close-sprint-confirmation":(e,t)=>{kk(t.sprintId)},"handle-update-budget":(e,t)=>{wk(e,t.sprintId,t.projectId)},"close-modal":()=>{H()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,H(),_k(t.sprintId)},"dismiss-limbo-modal":()=>{H(),xo()},"approve-ritual":(e,t)=>{Rk(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Gm(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}ae(t.issueId)},"create-sprint-document":async(e,t)=>{await B$(t.sprintId,t.projectId,()=>{bi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ce(t.documentId)}});function uc(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Ck(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}ct(e=>{e==="currentProject"&&C()==="rituals"&&pc()});let Um=0;async function pc(){const e=Q(),t=document.getElementById("rituals-content"),n=++Um;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=V({icon:U.projects,heading:"Select a project",description:"Rituals belong to one project. Pick one in the sidebar switcher, or press P."}));return}l_(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await js();n===Um&&!i&&t&&(t.innerHTML=V({icon:U.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Bk(){ef(Dk),pc()}function Dk(){const e=document.getElementById("rituals-content"),t=c_(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
                <p class="settings-description">Required when claiming a ticket (moving to in_progress), and when closing one that was never claimed</p>
                <button class="btn btn-primary" data-action="show-create-ritual-modal" data-trigger="ticket_claim">+ Create Ritual</button>
            </div>
            <div id="rv-claim-rituals-list" class="rituals-list"></div>
        </div>
    `,wi("rv-sprint-rituals-list",n,"sprint"),wi("rv-close-rituals-list",i,"close"),wi("rv-claim-rituals-list",s,"claim")}function Mk(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Rk(e,t){try{await h.approveAttestation(e,t),k("Ritual approved!","success"),await xo(),cc()}catch(n){_("approve ritual",n)}}function mc(e){return e==="document"?`
            <div class="form-group">
                <label for="ritual-artifact-document">Document id (required)</label>
                <input type="text" id="ritual-artifact-document" placeholder="The document you wrote for this ritual" required>
                <p class="form-help">Must be yours and written for this sprint or ticket.</p>
            </div>
        `:e==="url"?`
            <div class="form-group">
                <label for="ritual-artifact-url">Link (required)</label>
                <input type="url" id="ritual-artifact-url" placeholder="https://..." required>
            </div>
        `:""}function fc(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Gm(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${mc(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{jk(s,e,t,i)}),G()}async function jk(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=fc(i);if(a===void 0)return!1;try{await h.completeGateRitual(t,n,s||null,a),k("Ritual completed!","success"),await xo();const o=pk();o&&!o.in_limbo?(H(),k("Limbo cleared! Next sprint is now active.","success")):cc()}catch(o){_("complete gate ritual",o)}return!1}function Pk(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${u(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${mc(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{qk(o,e,t,s,a)}),G()}async function qk(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return k("A note is required for this attestation.","error"),!1;const o=fc(i);if(o===void 0)return!1;try{await h.attestTicketRitual(t,n,a||null,o),k("Ritual attested!","success"),H(),await As(n)}catch(r){_("attest ticket ritual",r)}return!1}async function Nk(e,t){try{await h.attestTicketRitual(e,t),k("Ritual attested!","success"),await As(t)}catch(n){_("attest ticket ritual",n)}}async function Ok(e,t){try{await h.approveTicketRitual(e,t),k("Ritual approved!","success"),await As(t)}catch(n){_("approve ticket ritual",n)}}function zm(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{Hk(s,e,t,n,i)}),G()}async function Hk(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return k("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,a),k(`"${i}" rejected. The attester has been told why.`,"success"),H(),s&&await s()}catch(o){_("reject ritual",o)}return!1}function Fk(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${mc(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Uk(s,e,t,i)}),G()}async function Uk(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=fc(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,s||null,a),k("Ritual completed!","success"),H(),await As(n)}catch(o){_("complete ticket ritual",o)}return!1}ne({"show-create-ritual-modal":(e,t)=>{cf(t.trigger)},"approve-ticket-ritual":(e,t)=>{Ok(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{zm(t.ritualId,t.issueId,t.ritualName,()=>As(t.issueId))},"complete-ticket-ritual":(e,t)=>{Fk(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{Pk(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{Nk(t.ritualId,t.issueId)},"retry-load-rituals":()=>pc()});function gt(e){if(!e)return"";try{Y.setOptions({breaks:!0,gfm:!0});const n=Y.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return vu.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Ms(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Gk(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${u(s)}</span>
                    <span class="gate-approval-issue-title">${u(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${m(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${u(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${u(o)}</strong>${r?` ${Ms(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",d=>{zk(d,e,t,n)}),G(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function zk(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),H(),Mt()}catch(a){_("complete gate ritual",a)}}function Vk(e,t,n,i,s,a,o,r){Gk(e,t,n,i,s,a,o,r)}function Wk(e,t,n,i,s,a,o,r,l){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${u(s)}</span>
                    <span class="gate-approval-issue-title">${u(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${m(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${u(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${u(o)}</strong>${r?` ${Ms(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><div class="markdown-body">${gt(l)}</div></div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",c=>{Kk(c,e,t,n)}),G(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function Kk(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await h.approveTicketRitual(t,n);let r=null;if(s)try{r=await h.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}k(`Review ritual "${i}" approved!`,"success"),La(r),H(),Mt()}catch(r){_("approve review ritual",r)}}function Yk(e,t,n,i,s,a,o,r,l){Wk(e,t,n,i,s,a,o,r,l)}ct(e=>{e==="currentProject"&&C()==="approvals"&&Mt()});let gc=[],hc=0;async function Mt(){if(!T())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++hc;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=Q(),i=n?ie().filter(r=>r.id===n):ie(),s=await Promise.all(i.map(async r=>{const[l,d]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:d}}));if(t!==hc)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:d}of s)if(a.push(...l),d&&d.in_limbo){const c=(d.pending_rituals||[]).filter(p=>{var f;return(f=p.attestation)!=null&&f.approved_at?!1:p.approval_mode==="gate"||!!p.attestation});c.length>0&&o.push({project:r,rituals:c})}yb(a),gc=o,Vm()}catch(n){if(t!==hc)return;e.innerHTML=V({icon:U.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),_("load approvals",n)}}function Vm(){const e=document.getElementById("approvals-list");if(!e)return;const t=bb(),n=gc.length>0,i=!Zv();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${U.issues}</div>
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
            `:e.innerHTML=V({icon:U.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${gc.map(({project:c,rituals:p})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${u(c.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${p.map(f=>{const g=f.attestation&&!f.attestation.approved_at,b=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${u(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',$=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${m(f.id)}"
                                            data-project-id="${m(c.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${m(f.id)}"
                                                data-project-id="${m(c.id)}"
                                                data-ritual-name="${m(f.name)}"
                                                data-ritual-artifact="${m(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${u(f.name)}
                                                    <span class="badge badge-ritual-${m(f.approval_mode)}">${u(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${u(f.prompt)}</span>
                                                ${y}
                                            </div>
                                            ${$}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=c=>c.pending_approvals||[],o=c=>p=>{const f=a(p).filter(c);return f.length>0?{...p,_filteredApprovals:f}:null},r=t.map(o(c=>c.approval_mode==="gate"&&c.limbo_type==="claim")).filter(Boolean),l=t.map(o(c=>c.approval_mode==="gate"&&c.limbo_type==="close")).filter(Boolean),d=t.map(o(c=>c.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(vc).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(vc).join("")}
                </div>
            </div>
        `),d.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${d.map(vc).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const p=c.dataset;Vk(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(c=>{c.addEventListener("click",async()=>{var g;c.disabled=!0;const p=(g=c.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");p&&(p.disabled=!0);const f=c.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),k(`Review ritual "${f.ritualName}" approved!`,"success"),await Mt()}catch(b){c.disabled=!1,p&&(p.disabled=!1),_("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const p=c.dataset;Yk(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt,p.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(c=>{c.addEventListener("click",()=>{const p=c.dataset;zm(p.ritualId,p.issueId,p.ritualName,()=>Mt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(c=>{c.addEventListener("click",async()=>{c.disabled=!0;try{await h.approveAttestation(c.dataset.ritualId,c.dataset.projectId),k("Sprint ritual approved!","success"),await Mt()}catch(p){c.disabled=!1,_("approve sprint ritual",p)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(c=>{c.addEventListener("click",()=>{Gm(c.dataset.ritualId,c.dataset.projectId,c.dataset.ritualName,c.dataset.ritualArtifact||"")})})}function Qk(){Xv(),Vm()}function vc(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${u(i.requested_by_name)}</strong>${i.requested_at?` (${Ms(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note markdown-body">${gt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',d=!s&&i.rejection_note,c=d?`<div class="gate-rejection-note"><strong>Rejected by ${u(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${Ms(i.rejected_at)})`:""}: ${u(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",p=`<button class="btn btn-small btn-secondary gate-reject-btn"
                        data-ritual-id="${m(i.ritual_id)}"
                        data-issue-id="${m(e.issue_id)}"
                        data-ritual-name="${m(i.ritual_name)}">Reject</button>`,f=s?`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${m(i.ritual_id)}"
                        data-issue-id="${m(e.issue_id)}"
                        data-ritual-name="${m(i.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${m(i.ritual_id)}"
                        data-issue-id="${m(e.issue_id)}"
                        data-ritual-name="${m(i.ritual_name)}"
                        data-ritual-prompt="${m(i.ritual_prompt)}"
                        data-issue-identifier="${m(e.identifier)}"
                        data-issue-title="${m(e.title)}"
                        data-requested-by="${m(i.requested_by_name||"")}"
                        data-requested-at="${m(i.requested_at||"")}"
                        data-attestation-note="${m(i.attestation_note||"")}">Comment &amp; Approve</button>
                    ${p}
                </div>`:`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${m(i.ritual_id)}"
                    data-issue-id="${m(e.issue_id)}"
                    data-ritual-name="${m(i.ritual_name)}"
                    data-ritual-prompt="${m(i.ritual_prompt)}"
                    data-issue-identifier="${m(e.identifier)}"
                    data-issue-title="${m(e.title)}"
                    data-requested-by="${m(i.requested_by_name||"")}"
                    data-requested-at="${m(i.requested_at||"")}">Complete</button>
                    ${d?"":p}
                </div>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${u(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${u(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                    ${c}
                </div>
                ${f}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.issue_id)}" class="gate-issue-link">
                    <span class="gate-issue-id">${u(e.identifier)}</span>
                    <span class="gate-issue-title">${u(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${u(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}ne({"view-issue-from-modal":(e,t)=>{e.preventDefault(),H(),ae(t.issueId)},"dismiss-approvals-explainer":()=>{Qk()},"retry-load-approvals":()=>Mt()});const So={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},To={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Wm=0;function Km(e){Wm=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Ym(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Ym(e="",t="",n=""){const i=Wm++,s=Object.keys(So).map(d=>`<option value="${d}" ${d===e?"selected":""}>${d}</option>`).join(""),o=(e?So[e]:So.estimate).map(d=>`<option value="${d}" ${d===t?"selected":""}>${To[d]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
        <div class="condition-row" id="condition-row-${i}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${i}">
                <option value="">Select field...</option>
                ${s}
            </select>
            <select class="condition-operator" id="condition-operator-${i}" data-action="toggle-value-input" data-row-id="${i}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${i}" value="${m(String(r))}" placeholder="Value"${l?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${i}">&times;</button>
        </div>
    `}function Zk(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Ym()),Lo()}function Xk(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Lo()}function Jk(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=So[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${To[o]}</option>`).join(""),Qm(e),Lo()}function Qm(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Rs(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Lo(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Zm(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,d=o.querySelector(".condition-value");let c=(a=d==null?void 0:d.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw Rs("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Rs("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${l}`;if(n.has(p))throw Rs(`Duplicate condition: ${r} ${To[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),l==="isnull")t[p]=!0;else if(l==="in"||l==="contains")t[p]=c?c.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!c)throw Rs(`Please enter a numeric value for ${r} ${To[l]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(c,10);if(isNaN(f))throw Rs(`Invalid number "${c}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${c}`);t[p]=f}else t[p]=c}return Lo(),Object.keys(t).length>0?t:null}ne({"add-condition-row":()=>{Zk()},"remove-condition-row":(e,t)=>{Xk(Number(t.rowId))},"update-operator-options":(e,t)=>{Jk(Number(t.rowId))},"toggle-value-input":(e,t)=>{Qm(Number(t.rowId))}});let Be=[],bc=null;const yc="project-switcher",Xm="all";function wc(e=Q()){const t=document.getElementById(yc);t&&(t.value=e||"")}ct((e,t)=>{e==="currentProject"&&(t&&yu(t),wc(t),y_(t||""))});function Jm(){yu(Xm),dt(null)}const Ao={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function ef(e){bc=e}function ie(){return Be}function e_(e){Be=e}function yi(e){const t=Be.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Ao[n]||Ao.fibonacci}function gn(e,t){if(e==null)return"No estimate";const i=yi(t).find(s=>s.value===e);return i?i.label:`${e} points`}function Co(e,t){return e==null||e===0?!1:!yi(t).some(i=>i.value===e)}function t_(e){const t=Be.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Ao[n]||Ao.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function ht(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=T())==null?void 0:n.id)!==e)return;Be=i,nf(),tf()}catch(i){_("load projects",i)}}function tf(){const e=Q();if(e&&Be.some(s=>s.id===e))return;const n=new URLSearchParams(window.location.search).get("project");if(n&&Be.some(s=>s.id===n)){dt(n);return}const i=bu();if(i===Xm){e&&dt(null);return}if(i&&Be.some(s=>s.id===i)){dt(i);return}Be.length>0&&dt(Be[0].id)}function nf(){const e=document.getElementById(yc);e&&(e.innerHTML='<option value="">All projects</option>'+Be.map(t=>`<option value="${m(t.id)}" data-hint="${m(t.key||"")}">${u(t.name)}</option>`).join(""),wc())}function sf(){return bu()}function qn(){const e=document.getElementById("projects-list");if(Be.length===0){e.innerHTML=V({icon:U.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Be.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${m(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${te(t.color)}20; color: ${te(t.color)}">
                    ${u(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${u(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${m(t.id)}" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${u(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function n_(e){dt(e),N("issues")}function af(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function i_(e){e.preventDefault();const t=T();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await ht(),qn(),H(),k("Project created!","success")}catch(i){_("create project",i)}return!1}async function s_(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await ht(),qn(),H(),k("Project updated!","success")}catch(i){_("update project",i)}return!1}async function a_(e){const t=Be.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await ht(),qn(),H(),k("Project deleted","success")}catch(n){_("delete project",n)}}let Re=null;function of(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function o_(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Re!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${m(a.id)}">${u(a.identifier)} ${u(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function rf(e){Re=e,Be.length===0&&await ht();const t=Be.find(n=>n.id===e);if(!t){k("Project not found","error"),N("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,of("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),of("ps-require-epic-on-close",t.require_epic_on_close===!0),o_(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),lf("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function lf(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Zt||Zt.length===0)&&js()}function r_(){Re=null,Zt=[]}function l_(e){Re=e}function c_(){return Zt}async function d_(){if(!Re)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Re,t),await ht(),k("Settings saved","success");const n=Be.find(i=>i.id===Re);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){_("save project settings",n)}}async function u_(){if(!Re)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await h.updateProject(Re,n),await ht(),k("Settings saved","success")}catch(o){_("save settings",o)}}let Zt=[];async function js(){if(!Re)return!1;try{return Zt=await h.getRituals(Re),p_(),typeof bc=="function"&&bc(),!0}catch(e){return _("load rituals",e),!1}}function p_(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Zt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Zt.filter(i=>i.trigger==="ticket_close"),n=Zt.filter(i=>i.trigger==="ticket_claim");wi("ps-sprint-rituals-list",e,"sprint"),wi("ps-close-rituals-list",t,"close"),wi("ps-claim-rituals-list",n,"claim")}function wi(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>m(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${u(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${u(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${gt(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${u(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
          ${a.artifact?`<span class="badge badge-artifact">${u(a.artifact)}</span>`:""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${m(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${m(a.id)}" data-ritual-name="${m(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function cf(e){if(!Re)return;let t=[];try{t=await h.getRitualGroups(Re)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          <option value="ticket_claim" ${e==="ticket_claim"?"selected":""}>Ticket Claim - Required when claiming a ticket, or closing a never-claimed one</option>
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
        <label for="ritual-artifact">Artifact</label>
        <select id="ritual-artifact">
          <option value="" selected>None - the note is the attestation</option>
          <option value="document" >Document - a Chaotic document the attester wrote for it</option>
          <option value="url" >Link - a URL to the artifact (a PR review, a report)</option>
        </select>
        <p class="form-help">What an attestation must point at. A document must be the attester's own and written for this sprint or ticket.</p>
      </div>
      <div class="form-group">
        <label for="ritual-group">Group</label>
        <select id="ritual-group" data-action="ritual-group-change">
          <option value="">None (always required)</option>
          ${t.map(n=>`<option value="${m(n.id)}" data-mode="${m(n.selection_mode)}">${u(n.name)} (${u(n.selection_mode)})</option>`).join("")}
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
        ${Km(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,G()}function m_(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function f_(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function df(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Re,{name:t,selection_mode:n})).id}return e.value||null}async function g_(e){var s;e.preventDefault();let t;try{t=Zm()}catch{return!1}let n;try{n=await df()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.createRitual(Re,i),await js(),H(),k("Ritual created!","success")}catch(a){_("create ritual",a)}return!1}async function h_(e){const t=Zt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Re)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${m(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${m(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${u(t.prompt)}</textarea>
      </div>
      <div class="form-group">
        <label for="ritual-trigger">Trigger</label>
        <select id="ritual-trigger" data-action="toggle-ritual-conditions">
          <option value="every_sprint" ${!t.trigger||t.trigger==="every_sprint"?"selected":""}>Every Sprint - Required when sprint closes</option>
          <option value="ticket_close" ${t.trigger==="ticket_close"?"selected":""}>Ticket Close - Required when closing a ticket</option>
          <option value="ticket_claim" ${t.trigger==="ticket_claim"?"selected":""}>Ticket Claim - Required when claiming a ticket, or closing a never-claimed one</option>
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
        <label for="ritual-artifact">Artifact</label>
        <select id="ritual-artifact">
          <option value="" ${t.artifact?"":"selected"}>None - the note is the attestation</option>
          <option value="document" ${t.artifact==="document"?"selected":""}>Document - a Chaotic document the attester wrote for it</option>
          <option value="url" ${t.artifact==="url"?"selected":""}>Link - a URL to the artifact (a PR review, a report)</option>
        </select>
        <p class="form-help">What an attestation must point at. A document must be the attester's own and written for this sprint or ticket.</p>
      </div>
      <div class="form-group">
        <label for="ritual-group">Group</label>
        <select id="ritual-group" data-action="ritual-group-change">
          <option value="">None (always required)</option>
          ${n.map(o=>`<option value="${m(o.id)}" data-mode="${m(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${u(o.name)} (${u(o.selection_mode)})</option>`).join("")}
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
      <div id="ritual-weight-group" class="form-group ${s?"":"hidden"}">
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
        ${Km(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,G()}async function v_(e,t){var a;e.preventDefault();let n;try{n=Zm()}catch{return!1}let i;try{i=await df()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await js(),H(),k("Ritual updated!","success")}catch(o){_("update ritual",o)}return!1}async function b_(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await js(),k("Ritual deleted","success")}catch(n){_("delete ritual",n)}}ne({"view-project":(e,t)=>{n_(t.projectId)},"view-project-settings":(e,t)=>{rf(t.projectId)},"create-project":e=>{i_(e)},"update-project":(e,t)=>{s_(e,t.projectId)},"confirm-delete-project":(e,t)=>{a_(t.projectId)},"edit-project-ritual":(e,t)=>{h_(t.ritualId)},"delete-project-ritual":(e,t)=>{b_(t.ritualId,t.ritualName)},"create-project-ritual":e=>{g_(e)},"update-project-ritual":(e,t)=>{v_(e,t.ritualId)},"toggle-ritual-conditions":()=>{m_()},"ritual-group-change":()=>{f_()}});function uf(){const t=new URLSearchParams(window.location.search).get("project");return t||sf()}function y_(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const $c={},pf=new Map;let kc=null,_c=null,Ec=null,xc=null,Ic=null,Sc=null,Tc=null,mf=!1;function w_(e){Object.assign($c,e)}function $_({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(kc=e),t&&(_c=t),n&&(Ec=n),i&&(xc=i),s&&(Ic=s),a&&(Sc=a),o&&(Tc=o)}function ff(){return Object.keys($c)}const k_=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],gf={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"};function Ps(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function hf(){kc&&kc()}function N(e,t=!0,{transition:n=!1}={}){if(t&&hn(),ss(e),t){let a;const o=uf();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:k_.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Ps(e),hf();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=$c[e];s&&s(),t&&window.scrollTo(0,0)}const qs={"gate-approvals":"approvals",team:"people"},__=new Set(["team"]);function vf(){var i;ss(null);const e=window.location.pathname.split("/").filter(Boolean),t=e.length===0?"my-issues":qs[e[0]]||e[0],n=e.length<=1&&ff().includes(t);document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden")),n?((i=document.getElementById(`${t}-view`))==null||i.classList.remove("hidden"),Ps(t)):Ps(gf[e[0]]||null)}function Lc(){var i;const t=window.location.pathname.split("/").filter(Boolean);xc&&xc(),C()||ss("my-issues");let n="my-issues";if(t.length===0||t[0]==="")N("my-issues",!1);else if(_c&&_c(t)){const s=gf[t[0]];s&&Ps(s);return}else n=t[0],qs[n]&&(t.length===1&&__.has(n)&&history.replaceState({view:qs[n]},"",`/${qs[n]}${window.location.search}`),n=qs[n]),ff().includes(n)?N(n,!1):(n="my-issues",N("my-issues",!1));(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function hn(){pf.set(window.location.href,window.scrollY)}function Bo(e){hn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Ic&&Ic(e)}function bf(e){hn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Sc&&Sc(e)}function yf(){const e=pf.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{Tc&&Tc(),window.scrollTo(0,e)})}function wf(){mf||(mf=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Ec&&Ec(e.state)){yf();return}(t=e.state)!=null&&t.view?N(e.state.view,!1):Lc(),yf()}))}let Xt=0,$i=!1,Ns=null,Do=null,Os=0;const Nn=new Map;function Mo(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Xt===0&&!$i),e.textContent=$i?"Stopped":"Offline",e.title=$i?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Ze(e,t){return Nn.has(e)||Nn.set(e,new Set),Nn.get(e).add(t),()=>{var n;return(n=Nn.get(e))==null?void 0:n.delete(t)}}function E_(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const x_=1e3;function Ro(){Do&&(clearTimeout(Do),Do=null)}const I_="chaotic",Ac=4001,S_=4003,T_="chaotic.bearer.";function L_(e){return[I_,T_+e]}function $f(e,{isReconnect:t=!1}={}){Ns&&(clearTimeout(Ns),Ns=null),Ro();const n=kb();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),il(null)),!t&&(Xt>0||$i)&&(Xt=0,$i=!1,Mo());const i=h.getToken();if(!i)return;const s=++Os,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,L_(i));il(r);let l=!1;const d=()=>{if(l||s!==Os)return;l=!0,Ro();const c=Xt>0;c&&k("Live updates reconnected","success"),Xt=0,Mo(),c&&Cc({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Os&&(console.log("WebSocket connected"),Ro(),Do=setTimeout(d,x_))},r.onmessage=c=>{if(s!==Os)return;d();let p;try{p=JSON.parse(c.data)}catch(f){console.error("WebSocket: malformed message",f);return}Cc(p)},r.onclose=c=>{if(s!==Os)return;console.log("WebSocket disconnected"),Ro();const p=c==null?void 0:c.code;if(p===Ac||p===S_){il(null),Xt=0;const g=p===Ac&&Wr()===i;$i=!g,Mo();let b="forbidden";p===Ac&&(b=g?"unauthorized":"superseded"),Cc({type:b,entity:"connection",data:{code:p,teamId:e}});return}Xt++,Xt===1&&k("Live updates disconnected. Reconnecting...","warning"),Mo();const f=E_(Xt-1);Ns=setTimeout(()=>{Ns=null,T()&&T().id===e&&$f(e,{isReconnect:!0})},f)},r.onerror=c=>{console.error("WebSocket error:",c)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function Cc(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Nn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(d){console.error(`WebSocket handler error (${n}:${t}):`,d)}const o=Nn.get(n);if(o)for(const l of o)try{l(i,s)}catch(d){console.error(`WebSocket handler error (${n}):`,d)}const r=Nn.get("*");if(r)for(const l of r)try{l(i,s)}catch(d){console.error("WebSocket handler error (*):",d)}}const A_={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let ki=0,Rt=!1,ke=null,vn=null;const _i=new Set,Hs=new Map,jt=new Map,vt=new Map;function kf(e){jt.get(e)===null&&jt.set(e,ki)}function Bc(e){const t=vt.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=ki)}function C_(e){return e.filter(t=>!jt.has(t.id)).map(t=>{const n=vt.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Rt&&vt.has(t.id)&&t.id!==ke))}function B_(e){for(const[t,n]of jt)n!==null&&e>n&&jt.delete(t);for(const[t,n]of vt)n.confirmedAfter!==null&&e>n.confirmedAfter&&vt.delete(t)}function D_(e,t){t!=null&&t.id&&(e==="archived"?(jt.has(t.id)||jt.set(t.id,null),kf(t.id)):e==="read"&&Bc(t.id))}async function Ei(){const e=T();if(e){try{const t=await h.getInboxUnreadCount(e.id);rs(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Fs()}}function Fs(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Da();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function Us({focusFirst:e=!1,background:t=!1}={}){const n=T();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++ki;t||(vn={focusFirst:e||!!(vn!=null&&vn.focusFirst)},ke=null,M_(i));try{const a=await h.getInbox(n.id,{unread:Rt,limit:100});if(s!==ki)return;const o=new Set(jt.keys());B_(s);const r=C_(a||[]),l=vn;vn=null,l?(Wt(r),zs(),l.focusFirst&&!Ge()&&P_()):R_(r,o)}catch(a){if(s!==ki)return;vn?(vn=null,i.innerHTML=V({icon:U.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),_("load inbox",a)):console.error("Failed to refresh inbox:",a)}Ei()}function M_(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function jo(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function _f(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Ef(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function xf(e,t){if(!e)return;const n=jo(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=_f(n||t)),i==null||i.focus({preventScroll:!0})}function R_(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ge(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=Ef(),d=window.scrollY,c=n.scrollTop;let p=e;if(ke&&!e.some(b=>b.id===ke)){const b=i.find(y=>y.id===ke);if(b&&Rt&&!t.has(ke)){p=[...e];const y=p.findIndex($=>$.created_at<b.created_at);p.splice(y===-1?p.length:y,0,b)}else ke=null}Wt(p),zs();let f=-1;o&&(f=p.findIndex(b=>b.id===o),f===-1&&p.length&&(f=Math.min(r,p.length-1))),f>=0?Gs(f,{focus:!1}):Ba(-1);const g=f>=0?n.querySelectorAll(".inbox-row")[f]:null;xf(l,g),n.scrollTop!==c&&(n.scrollTop=c),window.scrollY!==d&&window.scrollTo(0,d)}function j_(e,t){if(!(t!=null&&t.id))return!1;const n=ge().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function xi(e){const t=ge();for(const n of new Set(e)){const i=jo(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?Ef():null,o=document.createElement("template");o.innerHTML=Af(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),xf(a,r)}}function Gs(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){Ba(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),Ba(i),t&&_f(n[i]).focus({preventScroll:!0})}function P_(){Gs(0)}async function Dc(e){const t=ge(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;ke===e&&(ke=null),Hs.delete(e),jt.set(e,null),Wt(t.filter(a=>a.id!==e)),s&&rs(Math.max(0,Da()-1)),zs(),Fs(),Gs(n,{focus:!Ge()});try{await h.archiveInbox(e),kf(e)}catch(a){jt.delete(e),console.error("Failed to archive inbox entry:",a)}}function If(e){var s,a;const n=ge().findIndex(o=>o.id===e);if(n===-1)return;const i=ke;ke=i===e?null:e,ke===e&&Sf(e),xi([i,e]),Gs(n),ke===e&&((a=(s=jo(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function Sf(e){const t=ge(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,vt.set(e,{readAt:i,confirmedAfter:null}),Wt([...t]),rs(Math.max(0,Da()-1)),Fs(),h.markInboxRead(e).then(()=>Bc(e),s=>{var o;((o=vt.get(e))==null?void 0:o.readAt)===i&&vt.delete(e);const a=ge().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Wt([...ge()]),xi([e])),Ei(),_("mark inbox entry read",s)})}function q_(e){var i;const n=ge().findIndex(s=>s.id===e);if(n!==-1){if(Sf(e),Rt)ke===e&&(ke=null),Wt(ge().filter(s=>s.id!==e)),zs(),Gs(n);else if(xi([e]),!document.activeElement||document.activeElement===document.body){const s=jo(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function N_(){if(ke===null)return!1;const e=ke;return ke=null,xi([e]),!0}function Tf(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}function O_(e){if(_i.has(e))return;const t=ge().find(c=>c.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender",i=t.issue_identifier||"this ticket",s=Hs.get(e)||"",a=s?`Already posted on ${u(i)}. Submitting reassigns it to ${u(n)} without posting it again, unless you change it.`:`Posted on ${u(i)} before it is reassigned, so ${u(n)} knows why.`;document.getElementById("modal-title").textContent=`Reassign ${i} back to ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="inbox-reassign-form" class="inbox-reassign-form" novalidate>
            <div class="form-group">
                <label for="inbox-reassign-comment">Comment for ${u(n)}</label>
                <textarea id="inbox-reassign-comment" rows="4" required
                    aria-describedby="inbox-reassign-help"
                    placeholder="Why is this coming back, and what should happen next?">${u(s)}</textarea>
                <p class="form-help" id="inbox-reassign-help">${a}</p>
                <p class="form-error hidden" id="inbox-reassign-error" role="alert">Add a comment first.</p>
            </div>
            <div class="inbox-reassign-actions">
                <button type="button" class="btn btn-secondary" data-action="close-inbox-reassign">Cancel</button>
                <button type="submit" class="btn btn-primary" id="inbox-reassign-submit">Comment and reassign</button>
            </div>
        </form>
    `;const o=document.getElementById("inbox-reassign-form"),r=document.getElementById("inbox-reassign-comment"),l=document.getElementById("inbox-reassign-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",c=>{c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{cancelable:!0})))});let d=!1;o.addEventListener("submit",async c=>{var y;if(c.preventDefault(),d)return;if(!ge().some($=>$.id===e)){k(`That inbox item is gone, so ${i} was not reassigned.`,"warning"),o.isConnected&&H();return}const p=r.value.trim();if(!p){l.classList.remove("hidden"),r.focus();return}const f=document.getElementById("inbox-reassign-submit");d=!0,f&&(f.disabled=!0);const g=await H_(e,p);d=!1;const b=o.isConnected&&Ge();if(g){if(b&&(H(),!document.activeElement||document.activeElement===document.body)){const $=document.querySelector("#inbox-list .inbox-row.keyboard-selected");(y=$==null?void 0:$.querySelector(".inbox-row-toggle"))==null||y.focus({preventScroll:!0})}}else f&&f.isConnected&&(f.disabled=!1)}),G()}async function H_(e,t){if(_i.has(e))return!1;const n=ge().find(r=>r.id===e);if(!n||!n.issue_id||!n.source_user_id)return!1;const i=typeof t=="string"?t.trim():"";if(!i)return!1;const s=n.source_user_name||"sender",a=n.issue_identifier||"issue";_i.add(e),Tf(e,!0);const o=(r,l)=>(_i.delete(e),Tf(e,!1),_(r,l),!1);if(Hs.get(e)!==i){let r;try{r=await h.createComment(n.issue_id,i)}catch(l){return o(`comment on ${a}`,l)}Hs.set(e,i),La(r)}try{await h.updateIssue(n.issue_id,{assignee_id:n.source_user_id})}catch(r){return o(`reassign ${a} back to ${s}`,r)}return _i.delete(e),Hs.delete(e),Dc(e),!0}function F_(){Lf(!Rt)}function Lf(e){e!==Rt&&(Rt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Rt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Us({focusFirst:!0}))}const U_='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',G_='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function z_(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function Af(e){const t=!e.read_at,n=e.id===ke,i=A_[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${u(z_(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${m(e.kind)}">${u(i)}</span>
                        ${s?`<span class="inbox-row-source">${u(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${u(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${u(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?V_(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${U_}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${G_}</button>
                </span>
                <span class="inbox-row-time">${u(Ms(e.created_at))}</span>
            </div>
        </div>
    `}function V_(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${u(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${_i.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${u(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${a?`<div class="inbox-expanded-source">from ${u(a)}</div>`:""}
            ${e.body?`<div class="inbox-expanded-body">${u(e.body)}</div>`:""}
            <div class="inbox-action-bar">${r}</div>
        </div>
    `}function zs(){const e=document.getElementById("inbox-list");if(!e)return;const t=ge();if(t.length===0){e.innerHTML=V({icon:U.inbox,heading:Rt?"No unread items":"Inbox zero",description:Rt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=K_(t)}function W_(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function K_(e){const t=[];for(const n of e){const i=W_(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${u(n.label)}</h3>
            ${n.entries.map(s=>Af(s)).join("")}
        </section>
    `).join("")}async function Y_(e){var s;const t=ge().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();vt.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(a){((s=vt.get(e))==null?void 0:s.readAt)===n&&vt.delete(e);const o=ge().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Wt([...ge()]),xi([e])),console.error("Failed to mark inbox entry read:",a);return}Bc(e);const i=ge().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Wt([...ge()]),rs(Math.max(0,Da()-1)),Fs(),xi([e])):Ei()}async function Q_(){const e=T();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ge())n.read_at||vt.set(n.id,{readAt:t,confirmedAfter:ki});Wt(ge().map(n=>({...n,read_at:n.read_at||t}))),rs(0),Fs(),zs()}catch(t){_("mark all inbox entries read",t)}}function Z_(e){e.entryId&&Y_(e.entryId),e.issueId?ae(e.issueId):e.documentId&&Ce(e.documentId)}function X_(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Dc(e.dataset.entryId)}function J_(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&If(e.dataset.entryId)}const eE='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function tE(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(eE);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function nE(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}ne({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&nE((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||tE(e.target,n)||(e.preventDefault(),t.entryId&&If(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),Z_(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&O_(t.entryId)},"close-inbox-reassign":e=>{e.preventDefault(),H()},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Dc(t.entryId)},"toggle-inbox-unread-filter":()=>F_(),"set-inbox-filter":(e,t)=>Lf(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&q_(t.entryId)},"mark-all-inbox-read":()=>Q_(),"retry-load-inbox":()=>Us({focusFirst:!0})});let Vs=[],Ii=[],On=[];function Mc(){return Vs}function Cf(e){Vs=Array.isArray(e)?e:[],Bf()}function Pt(){return Ii}async function Po(e=null){try{Vs=await(e||h.getMyTeams()),Bf()}catch(t){_("load teams",t)}}function Bf(){const e=document.getElementById("team-list");Vs.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Vs.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${u(t.name)}</button>
        `).join("")}async function qo(e,t=!1,{seed:n=null}={}){Hn=null,Qn(e),jf(),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||""),document.getElementById("team-dropdown").classList.add("hidden"),$f(e.id),n&&sE(n)){let a=!1;try{aE(n),Hn=e.id,t?Lc():N(C()||"my-issues"),a=!0}catch(o){console.error("Failed to paint from the boot cache:",o),Hn=null}if(a){Df(e).catch(o=>console.error("Failed to refresh team data:",o));return}}await Df(e),t?Lc():N(C()||"my-issues")}let Hn=null;function iE(){var e;return Hn&&Hn===((e=T())==null?void 0:e.id)?Hn:null}async function Df(e){var t;await Promise.all([ht(),_E(),rE(),Gw(),Ei()]),((t=T())==null?void 0:t.id)===e.id&&(Hn=e.id)}function sE(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function aE(e){e_(Array.isArray(e.projects)?e.projects:[]),nf(),tf(),os(Array.isArray(e.labels)?e.labels:[]),Ii=Array.isArray(e.members)?e.members:[],Fw(e.agents),cs(Pt,ft),Xn(),jb(e.issues)}function Mf(){document.getElementById("team-dropdown").classList.toggle("hidden")}function oE(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function rE(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=T())==null?void 0:n.id)!==e)return;Ii=i,cs(Pt,ft),Xn()}catch(i){console.error("Failed to load team members:",i),_("load team members",i)}}function lE(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Rc=0;async function Rf(){var n,i;const e=(n=T())==null?void 0:n.id;if(!e)return;const t=++Rc;try{const s=await h.getTeamMembers(e);if(t!==Rc||((i=T())==null?void 0:i.id)!==e)return;Ii=s,cs(Pt,ft),Xn()}catch(s){if(t!==Rc)return;Ii=[],_("load team members",s)}cE()}function Si(){var n;const e=(n=pe())==null?void 0:n.id,t=Ii.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function cE(){var t;const e=Si();for(const n of["invite-member-btn","edit-team-btn"])(t=document.getElementById(n))==null||t.classList.toggle("hidden",!e)}let No=0;async function Oo(){var i;if(!T())return;const e=++No,t=T().id,n=document.getElementById("team-invitations-list");n&&(n.innerHTML=lE());try{const s=await h.getTeamInvitations(t);if(e!==No||((i=T())==null?void 0:i.id)!==t)return;On=s,jc()}catch(s){if(e!==No)return;if((s==null?void 0:s.status)===403){On=[],jc();return}console.error("Failed to load team invitations:",s),Pf(!0),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function jf(){No++,On=[],jc()}function Pf(e){var t;(t=document.getElementById("people-invitations"))==null||t.classList.toggle("hidden",!e)}function jc(){const e=document.getElementById("team-invitations-list");if(!e)return;const t=document.getElementById("people-invitations-count");if(t&&(t.textContent=String(On.length)),Pf(On.length>0),On.length===0){e.innerHTML="";return}const n=Si();e.innerHTML=On.map(i=>`
        <div class="list-row-2line">
            <div class="list-row-main">
                <div class="list-row-title">${u(i.email)}</div>
                <div class="list-row-sub">Invited as ${u(i.role)} · expires ${new Date(i.expires_at).toLocaleDateString()}</div>
            </div>
            ${n?`<div class="list-row-right">
            <button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${m(i.id)}" title="For an invitee whose verification email never arrives">Code for invitee</button>
            <button class="btn btn-danger-outline btn-small" data-action="delete-invitation" data-invitation-id="${m(i.id)}">Cancel</button>
            </div>`:""}
        </div>
    `).join("")}function qf(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function dE(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(T().id,t,n);if(await Oo(),i&&i.accept_url)return mE(t,pE(i.accept_url),i.email_queued===!0),!1;H(),k("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){uE(i)?k(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):_("send invitation",i)}return!1}function uE(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Nf(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function pE(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Nf(n.hostname)||Nf(i.hostname)?e:i.origin+n.pathname}function mE(e,t,n=!1){var a;const i=u(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${u(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ge()||G(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Of()}function Of(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function fE(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),k("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),k("Could not copy: the link is selected, copy it by hand","error")}}async function gE(e){let t;try{t=await h.issueInvitationVerificationCode(T().id,e)}catch(n){_("get a verification code",n);return}vE(t)}function hE(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function vE(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=hE(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">Send this code only through a channel you already trust for the invitee, never to whoever asked you for it. Anyone who saw the link can sign up with their address and ask, and chooses the name shown below.</p>
            <p>The account it is for:</p>
            <ul class="invitation-code-account">
                <li>Name: <strong>${u(t.name||"")}</strong></li>
                <li>Email: ${u(t.email||"")}</li>
                <li>Signed up: ${u(n)} (${u(i)})</li>
                <li>Already in a team: ${t.member_of_any_team?"yes":"no"}</li>
            </ul>
            <p class="warning-text">A signup shortly after you sent the link fits both the invitee and someone who saw the link: confirm with the invitee directly. One that predates the invitation was not made from the link, but check that the invitee recognises it. If they don't, don't give out the code: cancel the invitation.</p>
            <div class="api-key-display">
                <code id="invitation-code">${u((e==null?void 0:e.code)||"")}</code>
            </div>
            <p>Expires at ${u(s)}. It lets that account accept this invitation only: they enter it on the invitation page, or run <code>chaotic team accept-invite &lt;link&gt; --code &lt;code&gt;</code>. You won't be able to see it again.</p>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ge()||G(),Of("invitation-code")}async function bE(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(T().id,e),await Rf(),k("Member removed!","success"),window.dispatchEvent(new CustomEvent("chaotic:member-removed",{detail:{userId:e}}))}catch(t){_("remove member",t)}}async function yE(e){try{await h.deleteInvitation(T().id,e),await Oo(),k("Invitation canceled!","success")}catch(t){_("cancel invitation",t)}}function Hf(){Mf(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,G()}function wE(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${m(T().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${m(T().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${u(T().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,G())}async function $E(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await Po(),await qo(n),H(),k("Team created!","success")}catch(n){_("create team",n)}return!1}async function kE(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(T().id,t);Qn(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||""),await Po(),H(),k("Team updated!","success")}catch(n){_("update team",n)}return!1}async function _E(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=T())==null?void 0:n.id)!==e)return;os(i)}catch(i){console.error("Failed to load labels:",i),_("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ne({"select-team":(e,t)=>{qo(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{e!=null&&e.type&&e.type!=="click"||bE(t.userId)},"delete-invitation":(e,t)=>{e!=null&&e.type&&e.type!=="click"||yE(t.invitationId)},"issue-invitation-code":(e,t)=>{e!=null&&e.type&&e.type!=="click"||gE(t.invitationId)},"retry-load-team-invitations":()=>{Oo()},"invite-member":e=>{dE(e)},"copy-invite-link":()=>{fE()},"dismiss-invite-link":()=>{H()},"create-team":e=>{$E(e)},"update-team":e=>{kE(e)}});let qt=null,Jt=0,Ti=null,Li=null,Ws=null,Pc=!1;function EE(){return Hv()}function Ff(){Fv()}function Uf(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function xE(){qt||(qt=document.createElement("div"),qt.id="onboarding-overlay",qt.className="onboarding-overlay",document.getElementById("app").appendChild(qt))}function Ks(){if(!qt)return;const e=Pc?zf():Gf(),t=e[Jt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Jt?" active":""}${s<Jt?" completed":""}"></span>`).join("");qt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Gf(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Uf(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Uf(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Ti&&(e.textContent=`${Ti.name} (${Ti.key})`),t&&Li&&(t.textContent=`${Li.name} (${Li.key})`),n&&Ws&&(n.textContent=`${Ws.identifier} - ${Ws.title}`)}}]}function zf(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function qc(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Nc(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ai(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function IE(){const e=Pc?zf():Gf();Jt<e.length-1&&(Jt++,Ks())}function SE(){Ff(),Wf(),Fn()}function TE(){Ff(),Wf(),Fn()}async function LE(e){e.preventDefault(),Nc("onboarding-team-error"),Ai("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Ti=await h.createTeam({name:t,key:n}),Jt++,Ks()}catch(i){qc("onboarding-team-error",i.message||"Failed to create team"),Ai("onboarding-team-submit",!1)}}async function AE(e){e.preventDefault(),Nc("onboarding-project-error"),Ai("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Li=await h.createProject(Ti.id,{name:t,key:n}),Jt++,Ks()}catch(i){qc("onboarding-project-error",i.message||"Failed to create project"),Ai("onboarding-project-submit",!1)}}async function CE(e){e.preventDefault(),Nc("onboarding-issue-error"),Ai("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Ws=await h.createIssue(Li.id,{title:t}),Jt++,Ks()}catch(n){qc("onboarding-issue-error",n.message||"Failed to create issue"),Ai("onboarding-issue-submit",!1)}}function Vf(e=!1){Pc=e,Jt=0,Ti=null,Li=null,Ws=null,xE(),Ks()}function Wf(){qt&&(qt.remove(),qt=null)}function Kf(){Uv(),Vf(!0)}ne({"onboarding-next":e=>{e.preventDefault(),IE()},"onboarding-skip":e=>{e.preventDefault(),SE()},"onboarding-finish":e=>{e.preventDefault(),TE()},"onboarding-create-team":e=>{LE(e)},"onboarding-create-project":e=>{AE(e)},"onboarding-create-issue":e=>{CE(e)}});const Yf="/oauth/consent/";function BE(e){if(!e||!e.startsWith(Yf))return null;const t=e.slice(Yf.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function DE(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function ME(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function RE(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Qf={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function Ho(e){const t=Qf[e.trust]||Qf.unverified,n=e.host?` · ${u(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${u(t)}${n}</span>`}function jE(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${u(n.name)}</option>`).join("")}function PE(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${u(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Zf(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${u(i.name+a)}</option>`)}return n.join("")}function Xf(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${u(t.name)} <span class="oauth-muted">${u(t.key)}</span>
        </label>`).join("")}function qE(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${u(t.name)}${u(i)}
        </label>`}).join("")}function NE(e,t){const n=u(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${Ho(t.client)}</p>
            <p class="oauth-warning">Continue only if you just tapped Sign in in the ${n} app yourself.
                This page can't confirm which app on your phone asked: another app could ask for the same
                sign-in.</p>
            <p>The app will act as <strong>you</strong>: it can read your inbox and do what you can do in
                every team you belong to, such as approving gates, commenting and changing status.
                It can't create API keys or change your account.</p>
            <form id="oauth-consent-form" class="oauth-app-sign-in-form">
                <p class="oauth-muted">It reaches a team only while you belong to it.</p>
                ${i}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Cancel</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>`}function OE(e,t){if(t.acts_as==="person"){NE(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=u(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${u(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${Ho(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${u(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${jE(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Zf(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Xf(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${qE(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Oc(e,t)}function Oc(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=PE(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function HE(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function FE(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Ys(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${u(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function UE(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function GE(e,t,n,i){var r,l,d;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const c=n.teams.find(p=>p.id===s.value);e.querySelector("#oauth-agent").innerHTML=Zf(c,null),e.querySelector("#oauth-projects").innerHTML=Xf(c),Oc(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Oc(e,n));let a=!1;const o=async c=>{if(!a){a=!0;try{const p=c?await h.approveOAuthRequest(t,HE(e)):await h.denyOAuthRequest(t);if(!DE(p.redirect)){Ys(e,"The app's return address isn't one a browser should be sent to.");return}i(p.redirect)}catch(p){if(a=!1,p&&p.status===404){Ys(e,"It has expired, was already answered, or belongs to someone else.");return}FE(e,p&&p.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",c=>{c.preventDefault(),o(!0)}),(d=e.querySelector("#oauth-deny"))==null||d.addEventListener("click",()=>o(!1))}async function zE(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=ME();RE(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(a){a&&a.status===404?Ys(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?UE(i,n):a&&a.status===403?Ys(i,"Only a person signed in to Chaotic can approve an app."):Ys(i,a&&a.message||"Something went wrong");return}OE(i,s),GE(i,e,s,t)}const Hc="/invite/",Qs="/invite",Fc="chaotic.inviteToken",Jf="invite-auth-notice";let Uc=null;const VE="This invitation is no longer valid.",WE={owner:"an owner",admin:"an admin",member:"a member"};function KE(e){if(!e||!e.startsWith(Hc))return null;const t=e.slice(Hc.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function eg(){const{pathname:e}=window.location,t=KE(e);if(t){Uc=t;try{sessionStorage.setItem(Fc,t)}catch{}return history.replaceState(null,"",Qs),t}if(!tg(e))return null;let n=null;try{n=sessionStorage.getItem(Fc)}catch{}const i=n||Uc;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function tg(e){return e===Qs||e===`${Qs}/`}function ng(e){return tg(e)||!!(e&&e.startsWith(Hc))}function Gc(){Uc=null;try{sessionStorage.removeItem(Fc)}catch{}}function YE(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function QE(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function zc(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function ig(){const e=QE();return Fo(),zc(e),e}function ZE(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),Fo()}function Fo(){var e;(e=document.getElementById(Jf))==null||e.remove()}function Vc(e){const t=e.invited_by_name?`<strong>${u(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=WE[e.role]||`a ${u(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${u(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${u(e.email_hint)}</strong>${XE(e)}</p>`}function XE(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${u(n)}`}const JE="Ask whoever invited you to send a new invitation.",ex="Reload the page to try again.";function Wc(e,t=VE,n=JE){e.innerHTML=`
        <div class="invite-page">
            <h1>${u(t)}</h1>
            <p class="invite-muted">${u(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function tx(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function sg(){window.location.pathname!==Qs&&history.replaceState(null,"",Qs),tx(ig())}function nx(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Vc(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function ix(e,t,n){const i=YE(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${u(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Vc(t)}
                ${s}
                <p class="invite-warning" role="alert">This invitation is for a different email address.
                    Only <strong>${u(t.email_hint)}</strong> can accept it. Sign out, then sign in
                    or create an account with that address.</p>
                <div class="invite-actions">
                    <a class="btn btn-secondary" href="/">Not now</a>
                    <button type="button" id="invite-sign-out" class="btn btn-primary">Sign out</button>
                </div>
            </div>`;return}e.innerHTML=`
        <div class="invite-page">
            ${Vc(t)}
            ${s}
            <p id="invite-error" class="invite-warning hidden" role="alert"></p>
            <div id="invite-verify" class="invite-verify hidden">
                <p>Verify your email address to continue: we will email a six-digit code to
                    <strong>${u(n.email)}</strong>.</p>
                <form id="invite-code-form" class="invite-code-form hidden">
                    <div class="form-group">
                        <label for="invite-code">Code from the email</label>
                        <input type="text" id="invite-code" inputmode="numeric" autocomplete="one-time-code"
                            pattern="[0-9]{6}" maxlength="6" required>
                    </div>
                    <button type="submit" id="invite-confirm-code" class="btn btn-primary">Verify</button>
                </form>
                <p id="invite-verify-status" class="invite-muted hidden" role="status"></p>
                <div class="invite-actions">
                    <button type="button" id="invite-send-code" class="btn btn-secondary">Send code</button>
                </div>
                <form id="invite-admin-code-form" class="invite-code-form">
                    <div class="form-group">
                        <label for="invite-admin-code">Email never arrives? Enter the code a team admin gave you</label>
                        <input type="text" id="invite-admin-code" inputmode="numeric" autocomplete="off"
                            pattern="[0-9]{6}" maxlength="6" required>
                    </div>
                    <button type="submit" id="invite-accept-with-code" class="btn btn-secondary">Accept with this code</button>
                </form>
            </div>
            <div class="invite-actions" id="invite-accept-actions">
                <a class="btn btn-secondary" href="/">Not now</a>
                <button type="button" id="invite-accept" class="btn btn-primary">Accept invitation</button>
            </div>
        </div>`}function sx(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function ax(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),d=p=>{l.textContent=p,l.classList.remove("hidden")},c=()=>{var p;a.classList.remove("hidden"),(p=o.focus)==null||p.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const p=await h.requestEmailVerification(),f=sx(p.expires_at);d(`We sent a code to ${p.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",c()}catch(p){const f=p&&p.detail&&p.detail.error_code;if(p&&p.status===401){n();return}if(f==="email_already_verified"){t();return}d(p&&p.message||"Something went wrong"),p&&p.status===429&&c()}finally{s.disabled=!1}}}),a.addEventListener("submit",async p=>{var g;if(p.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(b){r.disabled=!1;const y=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():y==="email_already_verified"?t():(d(b&&b.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function ox(e,t){Fo();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=Jf,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${u(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${u(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),Fo(),t()})}function Uo(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function rx(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var c,p;const a=ig();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await h.getInvitation(e)}catch(f){f&&f.status===404?(Gc(),Wc(a)):Wc(a,f&&f.message||"Something went wrong.",ex);return}if(!t){nx(a,o);const f=g=>{ox(o,()=>zc(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}ix(a,o,t),(c=a.querySelector("#invite-sign-out"))==null||c.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const d=async f=>{var b,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch($){l=!1,r.disabled=!1;const L=$&&$.detail&&$.detail.error_code;if(f!==void 0&&(L==="invalid_verification_code"||L==="invitation_code_expired"||$&&$.status===429)){Uo(a,$&&$.message||"That code did not work."),(y=(b=a.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||y.call(b);return}$&&$.status===401?s():$&&($.status===404||$.status===400)?(Gc(),Wc(a)):$&&$.status===403&&$.detail&&$.detail.error_code==="email_unverified"?(Uo(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):$&&$.status===403?Uo(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):Uo(a,$&&$.message||"Something went wrong");return}Gc(),ag(a,o);try{await i(g.team_id,o.team_name)}catch($){console.error("Joined the team but could not open it:",$),zc(a),ag(a,o)}};r.addEventListener("click",()=>d()),(p=a.querySelector("#invite-admin-code-form"))==null||p.addEventListener("submit",f=>{f.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&d(g)}),ax(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),d()},signOut:s})}function ag(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${u(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${u(t.team_name)}</a>
            </div>
        </div>`}function Kc(e){return rx(e,{user:pe(),showAuth:t=>{Js(),t==="signup"?dg():cg()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),ZE(),await Fn({teamId:t}),k(`You joined ${n}`,"success")},signOut:()=>{h.logout(),Tt(null),Qn(null),Kc(e)}})}async function og(){const e=eg();if(e){await Kc(e);return}if(ng(window.location.pathname)){sg();return}Js()}async function Fn({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=BE(window.location.pathname);if(i){await zE(i);return}const s=eg();if(s){await Kc(s);return}if(ng(window.location.pathname)){sg();return}gx(),vf(),Go(),px();const a=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,d=>d.id===n.teamId));if(a){await lx(n,a,t);return}await Po(t);const o=Mc();if(o.length===0&&!EE()){Vf();return}o.length===0&&ss("my-issues");try{if(o.length>0){const d=e&&o.find(c=>c.id===e)||o[0];await qo(d,!0)}}finally{wf()}}async function lx(e,t,n){Cf(e.teams);try{await qo(t,!0,{seed:e})}finally{wf()}Promise.resolve(n||Po().then(Mc)).then(async i=>{var a;if(!Array.isArray(i))return;Cf(i);const s=i.find(o=>o.id===t.id);if(!s){await dx(),window.location.reload();return}if(((a=T())==null?void 0:a.id)===s.id&&s.name!==T().name){Qn(s);const o=document.getElementById("current-team-name");o&&(o.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const cx=2e3;let Ci=null,rg=!1,lg=!1;function dx(){return lg=!0,clearTimeout(Ci),Ci=null,Zr()}function Yc(){if(clearTimeout(Ci),Ci=null,lg)return Promise.resolve();const e=pe(),t=T();return!(e!=null&&e.id)||!(t!=null&&t.id)||Su(Wr())!==e.id||iE()!==t.id?Promise.resolve():sb(e.id,{user:e,teams:Mc(),teamId:t.id,projects:ie(),labels:tl(),members:Pt(),agents:ft(),issues:Rb({maxQueries:3})})}function ux(){clearTimeout(Ci),Ci=setTimeout(Yc,cx)}function px(){rg||(rg=!0,Lb(ux),document.addEventListener("visibilitychange",mx),window.addEventListener("pagehide",fx))}function mx(){document.visibilityState==="hidden"&&Yc()}function fx(){Yc()}let Bi=null,Zs=null,kt=null,_t=null;function Xs(){Bi||(Bi=document.getElementById("auth-screen"),Zs=document.getElementById("main-screen"),kt=document.getElementById("login-form"),_t=document.getElementById("signup-form"))}function Js(){Xs(),Bi&&Bi.classList.remove("hidden"),Zs&&Zs.classList.add("hidden")}function gx(){Xs(),Bi&&Bi.classList.add("hidden"),Zs&&Zs.classList.remove("hidden")}function cg(){Xs(),kt&&kt.classList.remove("hidden"),_t&&_t.classList.add("hidden")}function dg(){Xs(),kt&&kt.classList.add("hidden"),_t&&_t.classList.remove("hidden")}async function hx(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),Tt(await h.getMe()),await Fn(),k("Welcome back!","success")}catch(i){_("log in",i)}return!1}async function vx(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),Tt(await h.getMe()),await Fn(),k("Account created successfully!","success")}catch(s){_("sign up",s)}return!1}function ug(){h.logout(),Tt(null),Qn(null),Js(),k("Signed out","success")}function bx(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function Go(){var i;const e=pe();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Au(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?bx(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function yx(){Xs();const e=kt==null?void 0:kt.querySelector("form");e&&e.addEventListener("submit",s=>hx(s));const t=_t==null?void 0:_t.querySelector("form");t&&t.addEventListener("submit",s=>vx(s));const n=kt==null?void 0:kt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),dg()});const i=_t==null?void 0:_t.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),cg()})}let Qc=[];async function Zc(){try{Qc=await h.getApiKeys(),wx()}catch(e){_("load API keys",e)}}function wx(){const e=document.getElementById("api-keys-list");if(e){if(Qc.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Qc.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${u(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${u(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Ie(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ie(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${m(t.id)}" data-key-name="${m(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function $x(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,G()}async function kx(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);H(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,G()}catch(n){_("create API key",n)}return!1}async function _x(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function Ex(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),k("API key revoked","success"),await Zc()}catch(n){_("revoke API key",n)}}ne({"create-api-key":e=>{kx(e)},"copy-api-key":()=>{_x()},"dismiss-api-key-modal":()=>{H(),Zc()},"revoke-api-key":(e,t)=>{Ex(t.keyId,t.keyName)}});let Xc=[];async function pg(){try{Xc=await h.getConnections(),Ix()}catch(e){_("load connected apps",e)}}function Jc(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function xx(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function Ix(){const e=document.getElementById("connected-apps-list");if(e){if(Xc.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Xc.map(t=>t.acts_as==="person"?Sx(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(Jc(t))} ${Ho(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${u(t.agent?t.agent.name:"an agent")}</span>
                    <span>${u(xx(t))}</span>
                    <span>policy ${u(t.policy)}</span>
                    <span class="api-key-date">Connected ${Ie(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ie(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${u(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(Jc(t))}">Disconnect</button>
        </div>
    `).join("")}}function Sx(e){const n=`${e.device_name||"A device"} · ${Jc(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${u(n)} ${Ho(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Ie(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Ie(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function mg(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),k("App disconnected","success"),await pg()}catch(n){_("disconnect app",n)}}ne({"revoke-connection":(e,t)=>{mg(t.connectionId,t.connectionName)}});let ed=[];async function fg(){try{ed=await h.getPushDevices(),Tx()}catch(e){_("load push devices",e)}}const gg={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function hg(e){return e.label||e.platform||"Unnamed device"}function Tx(){const e=document.getElementById("push-devices-list");if(e){if(ed.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=ed.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(hg(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${u(t.platform)}</span>`:""}
                    <span>via ${u(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Ie(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Ie(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${u(String(t.failure_count))} failed deliveries</span>`:""}
                    ${gg[t.status]?`<span class="push-device-status">${u(gg[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(hg(t))}">Remove</button>
        </div>
    `).join("")}}async function Lx(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),k("Device removed","success"),await fg()}catch(n){_("remove push device",n)}}ne({"remove-push-device":(e,t)=>{Lx(t.installationId,t.deviceName)}});let zo=!1,en=0,bn=[],Vo=[];function Ax(e){Vo=e,bn=[...e]}function yn(){return zo}function Cx(){if(zo)return;zo=!0,en=0,bn=[...Vo];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Wo()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Bx(n.target.value)),t.addEventListener("keydown",Mx),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&Dx(Number(i.dataset.commandIndex))}),ea(),requestAnimationFrame(()=>t.focus())}function Wo(){zo=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Bx(e){const t=e.toLowerCase().trim();t?bn=Vo.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):bn=[...Vo],en=0,ea()}function ea(){const e=document.getElementById("command-results");if(!e)return;if(bn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};bn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===en?"selected":""}"
                     data-index="${i}"
                     data-action="execute-command" data-command-index="${i}"
>
                    <div class="command-item-icon">${r.icon}</div>
                    <div class="command-item-content">
                        <div class="command-item-title">${r.title}</div>
                        <div class="command-item-subtitle">${r.subtitle}</div>
                    </div>
                    ${r.shortcut?`<div class="command-item-shortcut"><kbd>${r.shortcut}</kbd></div>`:""}
                </div>
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function Dx(e){en=e,ea()}function vg(e){const t=bn[e];t&&(Wo(),t.action())}function Mx(e){switch(e.key){case"ArrowDown":e.preventDefault(),en=Math.min(en+1,bn.length-1),ea();break;case"ArrowUp":e.preventDefault(),en=Math.max(en-1,0),ea();break;case"Enter":e.preventDefault(),vg(en);break;case"Escape":e.preventDefault(),Wo();break}}ne({"execute-command":(e,t)=>{vg(Number(t.commandIndex))}});const Rx=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Switch project"},{key:"g p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"People"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function jx(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${u(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${u(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function Px(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${u(e.title)}</h4>
        ${e.shortcuts.map(jx).join("")}
    </div>`}function bg(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${Rx.map(Px).join("")}
        </div>
    `,G()}const Ko=100,td="status!=done,canceled",qx=["created","updated","priority","status","title","estimate"];function Se(e){return e==null?"":u(String(e))}function yg(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${Se(n)}</a>`}function wg(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const nd=[{id:"identifier",label:"ID",fixed:!0,render:e=>yg(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>yg(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>Se(Te(e.status))},{id:"priority",label:"Priority",render:e=>Se(Le(e.priority))},{id:"type",label:"Type",render:e=>Se(lt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>Se(wg(e,"assignee"))},{id:"creator",label:"Creator",render:e=>Se(wg(e,"creator"))},{id:"project",label:"Project",render:e=>Se(e.project_key)},{id:"sprint",label:"Sprint",render:e=>Se(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=te(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${Se(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>Se(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${Se(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>Se(Ie(e.created_at))},{id:"updated",label:"Updated",render:e=>Se(Ie(e.updated_at))},{id:"completed",label:"Completed",render:e=>Se(Ie(e.completed_at))},{id:"due",label:"Due",render:e=>Se(Ie(e.due_date))}],Yo=Object.fromEntries(nd.map(e=>[e.id,e])),Nx=nd.filter(e=>e.fixed).map(e=>e.id),id=["identifier","title","status","priority","assignee","updated"];function sd(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!Yo[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...id]:[...Nx.filter(s=>!t.has(s)),...n]}function Ox(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function Hx(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?sd(t.get("cols").split(",")):[...id],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function Fx(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!Ox(e.cols,id)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function Ux(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function Gx({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Ko,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",Ux(r));const d=(t||"").split(",").map(c=>c.trim()).filter(Boolean);if(d.length>0){const c=d[0],p=c.startsWith("-"),f=c.replace(/^[-+]/,"");let g=null;qx.includes(f)?(o.push("--sort",f,"--order",p?"desc":"asc"),d.length>1&&(g=`The CLI sorts by one field; only "${c}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function zx(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function Vx(e,t){const n=sd(t).map(a=>Yo[a]),i=n.map(a=>`<th data-col="${m(a.id)}">${Se(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${m(a.id)}">${n.map(o=>`<td class="query-col-${m(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function Wx(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let F=null,ad=null,nt=null,od=0,Di=!1,$g=!1;function me(e){return document.getElementById(e)}function kg(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function _g(e){const t=Fx({...ad,cols:F.cols,group:F.group,view:F.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Kx(){F&&(F.teamScope?Q()?dt(null):wc(null):F.projectId!==Q()&&dt(F.projectId))}function Yx(){const e=me("query-columns-menu");e&&(e.innerHTML=nd.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${F.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${Se(t.label)}
        </label>`).join(""))}function Qo(e){const t=me("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${Se(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Eg(e){const t=me("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function rd(e){var t;(t=me("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function ta(){const e=me("query-results"),t=me("query-pager");if(!e)return;if(!nt){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=nt;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=Vx(n,F.cols),t&&(t.innerHTML=Wx(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Di&&rd(!0))}async function Zo(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!F)return;const i=T(),s=F.teamScope?{teamId:i==null?void 0:i.id}:{projectId:F.projectId};if(!s.teamId&&!s.projectId){nt=null,ta(),Qo(F.teamScope?"Select a team first.":"Select a project.");return}const a=++od,o=F.where===null?td:F.where,r=me("query-results");Di=!0,r&&r.classList.add("loading"),rd(!0);const l=()=>a===od&&C()==="query";try{const d=await h.queryIssues({...s,where:o,order:F.order,skip:(F.page-1)*Ko,limit:Ko});if(!l())return;F.where=d.where,F.order=d.order||null,ad=kg(F),nt={issues:d.issues||[],total:d.total,skip:d.skip};const c=me("query-where");c&&c.value.trim()===o.trim()&&(c.value=d.where),Qo(null),Di=!1,ta(),_g(e),t&&t()}catch(d){if(!l())return;Di=!1,n?n():nt=null,ta(),Qo(zx(d))}finally{a===od&&(Di=!1,r&&r.classList.remove("loading"),rd(!1))}}function xg(){if(!F)return;const e=me("query-where");return F.where=e?e.value.trim():"",F.page=1,Zo("push")}function Qx(e){if(F)return F.teamScope=!e,e&&(F.projectId=e),F.page=1,Eg(null),Zo("push",{onSuccess:()=>{e?dt(e):Jm()}})}function Zx(e,t){if(!F||!Yo[e]||Yo[e].fixed)return;const n=F.cols.filter(i=>i!==e);F.cols=sd(t?[...n,e]:n),ta(),_g("replace")}function Xx(e){if(!F||!nt||Di)return;const t=F.page+e;if(t<1||e>0&&nt.skip+nt.issues.length>=nt.total)return;const n={page:F.page,result:nt};return F.page=t,Zo("push",{onFailure:()=>{F.page=n.page,nt=n.result}})}async function Jx(){if(!F)return null;const e=me("query-where"),t=e?e.value.trim():F.where??td,n=F.teamScope?null:ie().find(o=>o.id===F.projectId),{command:i,warning:s}=Gx({where:t,order:F.order,teamScope:F.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Ko,skip:nt?nt.skip:0}),a=me("query-cli-preview");try{await navigator.clipboard.writeText(i),k(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),k("Could not copy; the command is shown below the box","warning")}return i}function eI(){var e,t,n,i,s,a;$g||($g=!0,(e=me("query-where"))==null||e.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&!o.isComposing&&(o.preventDefault(),xg())}),(t=me("query-run-btn"))==null||t.addEventListener("click",()=>xg()),(n=me("query-copy-cli-btn"))==null||n.addEventListener("click",()=>Jx()),(i=me("query-columns-btn"))==null||i.addEventListener("click",o=>{o.stopPropagation();const r=me("query-columns-menu");if(!r)return;const l=r.classList.toggle("hidden")===!1;o.currentTarget.setAttribute("aria-expanded",String(l))}),(s=me("query-columns-menu"))==null||s.addEventListener("change",o=>{o.target.matches('input[type="checkbox"]')&&Zx(o.target.value,o.target.checked)}),(a=me("query-pager"))==null||a.addEventListener("click",o=>{const r=o.target.closest("button[data-query-page]");!r||r.disabled||Xx(Number(r.dataset.queryPage))}),document.addEventListener("click",o=>{var l;const r=me("query-columns-menu");r&&!r.classList.contains("hidden")&&!o.target.closest("#query-columns-picker")&&(r.classList.add("hidden"),(l=me("query-columns-btn"))==null||l.setAttribute("aria-expanded","false"))}))}function tI(){var s,a;eI();const e=Hx(window.location.search),t=ie();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(Q())?Q():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}F=e,ad=kg(F),nt=null;const i=me("query-where");return i&&(i.value=F.where===null?td:F.where),(s=me("query-cli-preview"))==null||s.classList.add("hidden"),(a=me("query-columns-menu"))==null||a.classList.add("hidden"),Kx(),Yx(),Qo(null),Eg(n),ta(),Zo("replace")}let Xo=[];function nI(){return Xo}ct(e=>{e==="currentProject"&&C()==="epics"&&wn()});let ld=0;const na=new Set(["done","canceled"]);let Jo=!1;async function wn({fromMemory:e=!1}={}){var a;nl(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++ld,i=Bl(),s=e?ro("epics",i):void 0;s?Ig(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=T())!=null&&a.id)){Xo=[],t.innerHTML=V({icon:U.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=Q(),r=o?await h.getProjectEpicProgress(o):await h.getTeamEpicProgress(T().id);if(n!==ld||(fi("epics",i,r),s&&lo(s,r)))return;Ig(r,t)}catch(o){if(n!==ld)return;t.innerHTML=V({icon:U.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),_("load epics",o)}}function Ig(e,t){var i;const n=((e==null?void 0:e.untracked)||[]).some(s=>(s.awaiting_human||[]).length);if(!((i=e==null?void 0:e.epics)!=null&&i.length)&&!n){Xo=[],t.innerHTML=V({icon:U.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Lg(e,t)}function cd(e,t){return`${e} ${t}${e===1?"":"s"}`}function iI(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function ia(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function Nt(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function er(e){const t=st(e);return t?/ago$|^just now$|future/.test(t)?t:`on ${t}`:""}function Sg(e){const t=e.children||{},n=ia(e);if(n<=0)return'<span class="meter-label">No tickets</span>';const i=t.done||0,s=`${iI(i,n)} done: ${i} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="meter" title="${m(s)}"><div class="meter-fill" style="width: ${Math.round(i/n*100)}%"></div></div>
        <span class="meter-label">${i} of ${n}</span>`}function sI(e){if(!e||e.length===0)return'<span class="epic-sprint-strip" aria-hidden="true"></span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${cd(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function aI(e){const t=e.in_flight||[],n=t.slice(0,2).map(s=>`${s.assignee?`<b>${u(s.assignee.name)}</b>`:"Unassigned"} on ${u(s.title)}`),i=(e.in_flight_count||t.length)-n.length;return i>0&&n.push(`+${i} more`),n.join(", ")}function Tg(e,t="shipped"){const n=e.last_shipped;return n?`${t} ${u(n.title)} ${u(er(n.completed_at))}`:""}function tr(e,{sub:t,right:n,grouped:i}){const s=e.status_pinned&&!na.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",a=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",o=i?`<span class="epic-project-key">${u(e.project_key)}</span> `:"",r=e.owner?` <span class="epic-owner">· ${u(e.owner.name)}</span>`:"",l=ia(e)<=0;return`
        <div class="list-row-2line epic-row${na.has(e.status)?" epic-row-closed":""}${l?" epic-row-empty":""}" data-identifier="${m(e.identifier)}" title="${m(e.identifier)}">
            <span class="epic-spark">${sI(e.sprints)}</span>
            <span class="list-row-title">${o}${u(e.title)}${r}${s}${a}</span>
            <span class="list-row-sub">${t}</span>
            <span class="list-row-right">${n}</span>
        </div>`}function nr(e,t,n,i,s=""){return i?`
        <section class="epic-section epic-section-${e}">
            <div class="section-header"><h3>${t} <span class="section-count">${n}</span></h3></div>
            <div class="epic-section-rows">${i}</div>
            ${s}
        </section>`:""}function dd(e){return!na.has(e.status)&&ia(e)>0&&(e.open_children||0)===0}const ud=5;function Lg(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=new Set([...n.map(I=>I.project_key),...i.map(I=>I.project_key)]).size>1,a=(I,w)=>s?`${u(I)} · ${w}`:w,o=n.filter(I=>!na.has(I.status)),r=o.filter(dd),l=o.filter(I=>!dd(I)&&(I.in_flight_count||0)>0).sort((I,w)=>Nt(w.last_activity_at)-Nt(I.last_activity_at)),d=o.filter(I=>!dd(I)&&!I.in_flight_count).sort((I,w)=>{var D,O;return(ia(I)<=0)-(ia(w)<=0)||Nt((D=w.last_shipped)==null?void 0:D.completed_at)-Nt((O=I.last_shipped)==null?void 0:O.completed_at)||Nt(w.last_activity_at)-Nt(I.last_activity_at)}),c=n.filter(I=>na.has(I.status)).sort((I,w)=>Nt(w.completed_at||w.last_activity_at)-Nt(I.completed_at||I.last_activity_at)),p=Jo?c:c.slice(0,ud),f=[...n.flatMap(I=>(I.awaiting_human||[]).map(w=>({a:w,where:a(I.project_key,u(I.title))}))),...i.flatMap(I=>(I.awaiting_human||[]).map(w=>({a:w,where:a(I.project_key,"No epic")})))].sort((I,w)=>Nt(I.a.since)-Nt(w.a.since)),g=f.map(({a:I,where:w})=>{const D=I.approval_mode==="review",O=I.requested_by_name?` by ${u(I.requested_by_name)}`:"";return`
        <div class="list-row-2line epic-ask-row" data-issue-identifier="${m(I.identifier)}" title="${m(I.identifier)}">
            <span class="epic-spark" aria-hidden="true"></span>
            <span class="list-row-title">${D?"Approve":"Complete"} ${u(I.ritual_name)}: ${u(I.title)}</span>
            <span class="list-row-sub">${w} · ${D?"attested":"requested"}${O} ${u(er(I.since))}</span>
            <span class="list-row-right"><span class="list-row-action">${D?"Approve":"Complete"}</span></span>
        </div>`}).join(""),b=r.map(I=>tr(I,{grouped:s,sub:`Every ticket is done${I.last_shipped?` · last shipped ${u(er(I.last_shipped.completed_at))}`:""}`,right:'<span class="list-row-action">Open epic</span>'})).join(""),y=l.map(I=>tr(I,{grouped:s,sub:[aI(I),Tg(I)].filter(Boolean).join(" · "),right:Sg(I)})).join(""),$=d.map(I=>{const w=I.children||{},D=w.todo?`${w.todo} ready to start`:w.backlog?`${w.backlog} in backlog`:"",O=I.last_shipped?Tg(I,"Last shipped"):"Nothing shipped yet";return tr(I,{grouped:s,sub:[O,D].filter(Boolean).join(" · "),right:Sg(I)})}).join(""),L=p.map(I=>{var w;return tr(I,{grouped:s,sub:I.completed_at?`Closed ${u(er(I.completed_at))}`:"Closed",right:`<span class="meter-label">${cd(((w=I.children)==null?void 0:w.done)||0,"ticket")}</span>`})}).join(""),x=c.length>ud?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${Jo?`Show the latest ${ud}`:`Show all ${c.length}`}</button>`:"",M=i.filter(I=>I.open),j=M.length?`<p class="epic-untracked-note">${M.map(I=>`${s?`${u(I.project_key)}: `:""}${cd(I.open,"open ticket")}`).join(", ")} under no epic.</p>`:"";Xo=[...r,...l,...d,...c],t.innerHTML=`
        <div class="epic-sections">
            ${nr("waiting","Waiting on you",f.length+r.length,g+b)}
            ${nr("moving","Moving now",l.length,y)}
            ${nr("quiet","Nothing in flight",d.length,$)}
            ${nr("shipped","Shipped",c.length,L,x?`<div class="epic-table-footer">${x}</div>`:"")}
            ${j}
        </div>
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=I=>{if(I.target.closest("[data-epics-toggle-closed]")){Jo=!Jo,nl(-1),Lg(t._epicProgress,t);return}const w=I.target.closest(".epic-ask-row");if(w&&w.dataset.issueIdentifier){Bo(w.dataset.issueIdentifier);return}const D=I.target.closest(".epic-row");D&&D.dataset.identifier&&bf(D.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function oI(){const e=Q(),t=ie().map(n=>`
        <option value="${m(n.id)}" ${n.id===e?"selected":""}>${u(n.name)}</option>
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
    `,G(),document.getElementById("create-epic-form").addEventListener("submit",rI),document.getElementById("create-epic-title").focus()}async function rI(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});H(),k(`Created epic ${s.identifier}`,"success"),wn()}catch(s){_("create epic",s)}}async function Ag(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){ae(t.id,!1);return}await ir(t.id,!1)}else N("epics",!1)}catch{N("epics",!1)}}async function ir(e,t=!0){var n;try{t&&hn();const[i,s,a,o]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(i.issue_type!=="epic"){ae(e,t);return}t&&history.pushState({epicId:e,view:C()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=C()||"epics",d=ie().find(w=>w.id===i.project_id),c=i.assignee_id?$t(i.assignee_id):null,p=c?ut(c):null,f=nI(),g=(n=f.find(w=>w.id===i.id))==null?void 0:n.children,b=g?(g.total||0)-(g.canceled||0):s.filter(w=>w.status!=="canceled").length,y=g?g.done||0:s.filter(w=>w.status==="done").length,$=b>0?Math.round(y/b*100):0,L=f.findIndex(w=>w.id===i.id),x=L>0?f[L-1]:null,M=L>=0&&L<f.length-1?f[L+1]:null,j=L>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${j?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${x?`data-action="navigate-epic" data-epic-id="${m(x.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${L+1} / ${f.length}</span>
                            <button class="issue-nav-btn" ${M?`data-action="navigate-epic" data-epic-id="${m(M.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${d?u(d.name):"Project"} › ${u(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(i.title)}</h1>

                    ${i.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Mn(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${$===100?" epic-progress-complete":""}" style="width: ${$}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${y} of ${b} done</span>
                                <span>${$}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?V({icon:U.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(w=>{const D=w.assignee_id?$t(w.assignee_id):null,O=D?ut(D):null;return`
                                <div class="sub-issue-item" data-issue-id="${m(w.id)}" data-identifier="${m(w.identifier)}">
                                    <span class="sub-issue-status">${Qe(w.status)}</span>
                                    <span class="sub-issue-id">${u(w.identifier)}</span>
                                    <span class="sub-issue-title">${u(w.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(w.status||"backlog").replace(/_/g,"-")}">${Te(w.status)}</span>
                                    ${O?`<span class="sub-issue-assignee">${u(O)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?V({icon:U.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Lm(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Zl(w)}</span>
                                        <span class="activity-actor">by ${u(Yl(w))}</span>
                                        <span class="activity-time">${st(w.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${o.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${o.map(w=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${u(w.author_name||"User")}</span>
                                            <span class="comment-date">${st(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${za(w.content||"")}</div>
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
                                ${Qe(i.status)}
                                ${Te(i.status)}
                            </span>
                        </div>
                        ${i.status_pinned&&!["done","canceled"].includes(i.status)?`
                        <div class="property-row epic-status-pinned">
                            <span class="property-label"></span>
                            <span class="property-value-static">
                                <span class="text-muted" title="Set by hand, so it no longer follows its sub-issues">Set by hand</span>
                                <button class="btn btn-secondary btn-small" data-action="epic-follow-children" data-epic-id="${m(i.id)}">Follow sub-issues</button>
                            </span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${mt(i.priority)}
                                ${Le(i.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${p?u(p):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${gn(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(w=>`
                                    <span class="issue-label" style="background: ${te(w.color)}20; color: ${te(w.color)}">${u(w.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${d?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${u(d.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(i.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const I=r.querySelector(".sub-issues-list");I&&I.addEventListener("click",w=>{const D=w.target.closest(".sub-issue-item");D&&D.dataset.issueId&&ae(D.dataset.issueId)})}catch(i){_("load epic",i)}}ne({"navigate-epic":(e,t)=>{ir(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),k("Status now follows sub-issues"),await ir(t.epicId,!1)}catch(n){_("update epic",n)}}});function lI(e){let t=!1,n=null;return function(s){var o,r,l,d,c,p,f,g;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((d=e.isDetailViewActive)!=null&&d.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(c=e.isDetailViewActive)!=null&&c.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("people");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((p=e.isDetailViewActive)!=null&&p.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),(g=e.openProjectSwitcher)!=null&&g.call(e)||e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function cI(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function tn(e,t,n=Ma){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Cg(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function sa(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(Cg(),!1):!0:!1}function dI(e){const t=Ma;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const d=l.dataset.issueId;if(!d||d.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const c=l.querySelector(`.${r}`);c&&e.showInlineDropdown&&e.showInlineDropdown(s,o,d,c)}return function(a){var l,d,c,p,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||sa(a)||(a.key==="Enter"||a.key===" ")&&((c=(d=a.target).closest)!=null&&c.call(d,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(p=e.isInlineDropdownOpen)!=null&&p.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((f=e.beforeNavigate)==null||f.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),tn(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),tn(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function uI(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||sa(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),tn(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),tn(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Un(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function pI(e){const t="#inbox-list .inbox-row";return function(i){var r,l,d,c,p,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||sa(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var y,$,L,x;const b=!!(($=(y=document.activeElement)==null?void 0:y.closest)!=null&&$.call(y,"#inbox-list"));if((L=e.collapseInboxExpand)==null||L.call(e),tn(a+g,e.setSelectedIndex,t),b){const M=document.querySelector(`${t}.keyboard-selected`);(x=(M==null?void 0:M.querySelector(".inbox-row-toggle"))||M)==null||x.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((c=(d=i.target).closest)!=null&&c.call(d,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((p=e.isEscapeLayerAbove)!=null&&p.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function mI(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||sa(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),tn(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),tn(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function fI(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function pd(e){const{view:t,selector:n,open:i}=e;return function(a){var l,d,c,p;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||sa(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(d=e.isInlineDropdownOpen)!=null&&d.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),tn(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),tn(r-1,e.setSelectedIndex,n);break;case"Enter":if((p=(c=a.target).closest)!=null&&p.call(c,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const gI=7,md=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),Bg=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),hI='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',vI='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Dg=!1;function bI(){Dg||(Dg=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...md,set(e){var t;md.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...Bg,set(e){var t;Bg.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let ye=null,yI=0;function Mg({restoreFocus:e=!0}={}){return ye?(ye.close(e),!0):!1}function wI(e){var n;const t=(n=e==null?void 0:e._picker)==null?void 0:n.button;return!t||t.disabled||!t.isConnected?!1:((ye==null?void 0:ye.select)!==e&&fd(e,t),!0)}function $I(e=document){e.querySelectorAll("select[data-picker]").forEach(kI)}function kI(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${hI}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{Rg(e,t),(ye==null?void 0:ye.select)===e&&ye.refresh()};return e._picker={button:t,sync:n},bI(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(ye==null?void 0:ye.select)===e?Mg():fd(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(ye==null?void 0:ye.select)!==e&&fd(e,t)):s.key.length===1&&s.stopPropagation())}),n(),t}function Rg(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"",s=(n==null?void 0:n.dataset.hint)||"",a=t.querySelector(".picker-label");a.textContent=i,s&&a.insertAdjacentHTML("afterbegin",`<span class="picker-label-hint">${u(s)}</span>`),t.disabled=e.disabled,t.title=i;const o=e.getAttribute("aria-label");o&&t.setAttribute("aria-label",i?`${o}: ${i}`:o)}function jg(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),hint:t.dataset.hint||"",disabled:t.disabled}))}function fd(e,t){Mg({restoreFocus:!1});const n=jg(e),i=`picker-list-${++yI}`,s=n.length>=gI,a=e.getAttribute("aria-label")||"Options",o=document.createElement("div");o.className="picker-popover",o.tabIndex=-1,o.innerHTML=`
        ${s?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(a)}"
            role="combobox" aria-expanded="true" aria-controls="${i}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${i}" tabindex="-1" aria-label="${m(a)}"></ul>
    `,document.body.appendChild(o);const r=o.querySelector(".picker-list"),l=o.querySelector(".picker-search"),d=E=>Math.max(0,E.findIndex(q=>!q.disabled));let c=n.findIndex(E=>E.value===e.value&&!E.disabled);c===-1&&(c=d(n));let p=n;const f=()=>{var q;r.innerHTML=p.length?p.map((B,Z)=>`
                <li role="option" id="${i}-${Z}" class="picker-option${Z===c?" active":""}${B.disabled?" disabled":""}"
                    data-index="${Z}" data-value="${m(B.value)}"
                    aria-selected="${B.value===e.value?"true":"false"}"${B.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${u(B.text)}</span>
                    ${B.hint?`<span class="picker-option-hint">${u(B.hint)}</span>`:""}
                    ${B.value===e.value?`<span class="picker-check">${vI}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const E=r.querySelector(".picker-option.active");E?(l||r).setAttribute("aria-activedescendant",E.id):(l||r).removeAttribute("aria-activedescendant"),(q=E==null?void 0:E.scrollIntoView)==null||q.call(E,{block:"nearest"})},g=()=>{var A,ce;const E=t.getBoundingClientRect(),q=((A=window.visualViewport)==null?void 0:A.width)||window.innerWidth,B=((ce=window.visualViewport)==null?void 0:ce.height)||window.innerHeight;o.style.minWidth=`${Math.min(Math.max(E.width,220),q-16)}px`,o.style.maxHeight="",o.style.top="0px";const Z=o.offsetWidth||Math.max(E.width,220),Ee=o.offsetHeight;o.style.left=`${Math.max(8,Math.min(E.left,q-Z-8))}px`;const le=B-E.bottom-12,bt=E.top-12;if(Ee>le&&bt>le){const he=Math.max(120,bt);o.style.maxHeight=`${he}px`,o.style.top=`${Math.max(8,E.top-4-Math.min(Ee,he))}px`}else o.style.maxHeight=`${Math.max(120,le)}px`,o.style.top=`${E.bottom+4}px`},b=E=>{if(!E||E.disabled||e.disabled)return;if(![...e.options].some(B=>B.value===E.value&&!B.disabled)){K(!0);return}const q=E.value!==e.value;md.set.call(e,E.value),Rg(e,t),K(!0),q&&e.dispatchEvent(new Event("change",{bubbles:!0}))},y=E=>{let q=c+E;for(;q>=0&&q<p.length&&p[q].disabled;)q+=E;q<0||q>=p.length||(c=q,f())},$=(E,q)=>{let B=E;for(;B>=0&&B<p.length&&p[B].disabled;)B+=q;B>=0&&B<p.length&&(c=B,f())},L=E=>{if(!(E.metaKey||E.ctrlKey))switch(E.stopPropagation(),E.key){case"ArrowDown":E.preventDefault(),y(1);break;case"ArrowUp":E.preventDefault(),y(-1);break;case"Home":l||(E.preventDefault(),$(0,1));break;case"End":l||(E.preventDefault(),$(p.length-1,-1));break;case"PageDown":E.preventDefault(),$(Math.min(p.length-1,c+8),-1);break;case"PageUp":E.preventDefault(),$(Math.max(0,c-8),1);break;case"Enter":E.preventDefault(),b(p[c]);break;case"Escape":E.preventDefault(),K(!0);break;case"Tab":K(!0);break;case" ":l||(E.preventDefault(),b(p[c]));break;default:if(!l&&E.key.length===1&&!E.metaKey&&!E.ctrlKey&&!E.altKey){x=(Date.now()-M<700?x:"")+E.key.toLowerCase(),M=Date.now();const q=p.findIndex(B=>!B.disabled&&B.text.toLowerCase().startsWith(x));q!==-1&&(c=q,f())}}};let x="",M=0;const j=()=>{const E=l.value.trim().toLowerCase();p=E?n.filter(B=>B.text.toLowerCase().includes(E)||B.hint.toLowerCase().includes(E)):n;const q=p.findIndex(B=>B.value===e.value&&!B.disabled);c=!E&&q!==-1?q:d(p),f()},I=E=>{o.contains(E.target)||t.contains(E.target)||K(!1)},w=()=>g(),D=E=>{E.key!=="Escape"||o.contains(E.target)||(E.preventDefault(),E.stopPropagation(),K(!0))},O=()=>K(!1);function K(E){(ye==null?void 0:ye.popover)===o&&(ye=null,o.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",I,!0),document.removeEventListener("keydown",D,!0),window.removeEventListener("popstate",O),window.removeEventListener("resize",w),window.removeEventListener("scroll",w,!0),E&&t.focus({preventScroll:!0}))}r.addEventListener("click",E=>{const q=E.target.closest(".picker-option");q&&b(p[Number(q.dataset.index)])}),r.addEventListener("mousemove",E=>{const q=E.target.closest(".picker-option");if(!q)return;const B=Number(q.dataset.index);B!==c&&(c=B,f())}),o.addEventListener("keydown",L),l&&l.addEventListener("input",j),document.addEventListener("pointerdown",I,!0),document.addEventListener("keydown",D,!0),window.addEventListener("popstate",O),window.addEventListener("resize",w),window.addEventListener("scroll",w,!0),ye={select:e,button:t,popover:o,close:K,refresh:()=>{const E=jg(e);!(E.length===n.length&&E.every((B,Z)=>B.value===n[Z].value&&B.text===n[Z].text&&B.hint===n[Z].hint&&B.disabled===n[Z].disabled))||e.disabled?K(!1):f()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",i),t.classList.add("open"),f(),g(),(l||r).focus({preventScroll:!0})}const _I={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let W=null,$n=0;async function Pg(e,t){var a,o;const n=_I[e];if(!n){_("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++$n;W=null;let s;try{s=await n.fetchList(t)}catch(r){_("load revision history",r);return}if(i===$n){if(W={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},W.viewVersion!=null)try{const r=await n.fetchOne(t,W.viewVersion);if(i!==$n)return;W.cache.set(W.viewVersion,r)}catch(r){i===$n&&_("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),sr(),G()}}function sr(){const e=document.getElementById("modal-content");if(!e||!W)return;if(W.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=EI(),n=W.mode==="compare"?II():xI();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function EI(){const e=W.revisions.map(n=>{const i=W.mode==="view"?n.version===W.viewVersion:n.version===W.compareFromVersion||n.version===W.compareToVersion,s=W.mode==="compare"?n.version===W.compareFromVersion?' <span class="rev-tag">from</span>':n.version===W.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${u(n.author_name||"Unknown")} ${Aa(n.author)}</span>
          <span class="revision-time">${st(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${W.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function xI(){const e=W.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=W.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${u(t.title)}</h3>`:"",i=t[W.adapter.bodyField]||"",s=i?`<div class="markdown-body">${gt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${u(t.author_name||"Unknown")} &middot; ${st(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function II(){const e=W.compareFromVersion,t=W.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=W.cache.get(e),i=W.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[W.adapter.bodyField]||"",a=i[W.adapter.bodyField]||"",o=SI(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
      <div class="revision-title-change">
        Title: <span class="diff-del">${u(n.title||"")}</span>
        &rarr; <span class="diff-add">${u(i.title||"")}</span>
      </div>
    `),`
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${e}</strong> &rarr; <strong>v${t}</strong>
      </div>
    </div>
    ${r}
    ${o}
  `}function SI(e,t){const n=e.split(`
`),i=t.split(`
`),s=TI(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${u(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${u(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${u(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function TI(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let d=i-1;d>=0;d--)e[l]===t[d]?s[l][d]=s[l+1][d+1]+1:s[l][d]=Math.max(s[l+1][d],s[l][d+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(aa(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(aa(a,"del",e[o]),o++):(aa(a,"add",t[r]),r++);for(;o<n;)aa(a,"del",e[o++]);for(;r<i;)aa(a,"add",t[r++]);return a}function aa(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function LI(e){if(!W)return;const t=W.token,n=W;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(W!==n||$n!==t)return;n.cache.set(e,i)}catch(i){W===n&&$n===t&&_("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),sr()}function AI(){if(!W)return;const e=W.token,t=W;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{W===t&&$n===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{W!==t||$n!==e||(s&&_("load revisions to compare",s),sr())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;sr()}ne({"show-document-revisions":(e,t)=>{Pg("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Pg("issue",t.issueId)},"select-revision-version":(e,t)=>{LI(Number(t.version))},"toggle-revision-compare":()=>{AI()},"close-revision-viewer":()=>{W=null,H()}});function ar(e){return ft().find(t=>t.id===(e==null?void 0:e.user_id))||null}function qg(e){if(!e)return"Team-wide";const t=ie().find(n=>n.id===e);return t?`Project ${t.key}`:"One project"}function Ng(e,t=pe()){return!(e!=null&&e.is_agent)||!t||!ar(e)?!1:e.owner_id===t.id||Si()}function Og(e){const t=ar(e);return t?!!t.can_register:(e==null?void 0:e.kind)==="service"}function CI(e,t){var n,i;return((n=ft().find(s=>s.id===e))==null?void 0:n.name)||((i=t.find(s=>s.user_id===e))==null?void 0:i.name)}function nn(e,t){return`<dt>${u(e)}</dt><dd>${t}</dd>`}function or(e,t){return e?`<a href="/people/${m(e)}" data-action="view-person" data-user-id="${m(e)}">${u(t||"Unknown")}</a>`:u(t||"Unknown")}function BI(e,t=[]){if(!(e!=null&&e.is_agent))return"";const n=ar(e);if(!n)return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">
                ${nn("Scope","A guest from another team, with a membership here")}
                ${nn("Owner",or(e.owner_id,e.owner_name))}
            </dl>
        </section>`;const i=(n.kind||e.kind)==="session",s=Og(e),a=[nn("Scope",u(qg(n.agent_project_id??e.project_id))),nn("Owner",or(e.owner_id||n.parent_user_id,e.owner_name||n.parent_user_name))];if(n.is_active===!1&&a.push(nn("Status","Deactivated: its keys no longer sign in")),i){const f=n.registered_by_id;a.push(nn("Registered by",f?or(f,CI(f,t)):"A registrar")),a.push(nn("Last used",n.last_used_at?u(Ie(n.last_used_at)):"Never"))}else a.push(nn("Registrar",s?"Yes: registers one identity per session and cannot write as itself":"No"));if(s){const f=ft().filter(g=>g.registered_by_id===e.user_id&&g.is_active!==!1);a.push(nn("Sessions registered",f.length?f.map(g=>or(g.id,g.name)).join(", "):"None active"))}const o=Ng(e),r=m(e.user_id),l=m(e.name||"Agent"),d=n.is_active!==!1,c=o?`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Owner actions</h3></div>
            <div class="agent-profile-actions">
                ${d&&!i?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${r}" data-agent-name="${l}" data-can-register="${s?"true":"false"}">${s?"Stop being a registrar":"Make registrar"}</button>`:""}
                <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${r}" data-agent-name="${l}">Delete agent</button>
            </div>
        </section>`:"",p=o?`
        <section class="agent-profile-section">
            <div class="section-header agent-profile-section-head">
                <h3>Credentials</h3>
                ${d?`<button class="btn btn-secondary btn-small" data-action="generate-agent-key" data-agent-id="${r}" data-agent-name="${l}">Generate key</button>`:""}
            </div>
            <div id="agent-credentials" class="agent-credentials" data-agent-id="${r}" aria-busy="true"><div class="skeleton skeleton-title"></div></div>
        </section>`:"";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">${a.join("")}</dl>
        </section>
        ${p}
        ${c}
    `}let Hg=0;async function rr(e){var r;if(((r=document.getElementById("agent-credentials"))==null?void 0:r.dataset.agentId)!==e)return;const t=++Hg;let n,i;try{[n,i]=await Promise.all([h.getAgentKeys(e),h.getConnections().catch(()=>[])])}catch(l){n=null,console.error("Failed to load agent credentials:",l)}if(t!==Hg)return;const s=document.getElementById("agent-credentials");if(!s||s.dataset.agentId!==e)return;if(s.removeAttribute("aria-busy"),n===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load its keys.</p>';return}const a=(i||[]).filter(l=>{var d;return l.acts_as!=="person"&&((d=l.agent)==null?void 0:d.id)===e}),o=n.filter(l=>l.is_active);if(!o.length&&!a.length){s.innerHTML='<p class="person-bio-empty">No active keys or connected apps.</p>';return}s.innerHTML=[...o.map(l=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">API key <code>${u(l.key_prefix||"")}…</code>${l.name?` · ${u(l.name)}`:""}</div>
                    <div class="list-row-sub">Created ${u(Ie(l.created_at))}${l.owner_name?` by ${u(l.owner_name)}`:""} · ${l.last_used_at?`last used ${u(Ie(l.last_used_at))}`:"never used"}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-key" data-key-id="${m(l.id)}" data-agent-id="${m(e)}">Revoke</button>
                </div>
            </div>`),...a.map(l=>{var c;const d=((c=l.client)==null?void 0:c.name)||"An app";return`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">Connected app: ${u(d)}</div>
                    <div class="list-row-sub">Acts as this agent · connected ${u(Ie(l.created_at))}${l.last_used_at?` · last used ${u(Ie(l.last_used_at))}`:""}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-connection" data-connection-id="${m(l.id)}" data-connection-name="${m(d)}" data-agent-id="${m(e)}">Disconnect</button>
                </div>
            </div>`})].join("")}async function DI(e,t){if(confirm("Revoke this key? Anything signing in with it stops working at once."))try{await h.revokeApiKey(e),rr(t)}catch(n){_("revoke the key",n)}}const lr={bio:4e3,pronouns:40,tagline:120,name:255};let je=[],cr=null,Fg=new Map,gd=!1,dr=0,ur=null,Mi=null,oa=null,pr=!1,hd=0;async function Ug(e,t){return h.getTeamRoster(e,{includeIdle:t})}function MI(e,t){!t||cr!==e||(je=je.map(n=>n.user_id===t.user_id?t:n))}function RI(){return Array(4).fill(0).map(()=>`
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function jI(e){try{const t=await h.getTeamIssues(e,{status:["in_progress"],sort_by:"updated",order:"desc",limit:200}),n=new Map;for(const i of t||[])i.assignee_id&&(n.has(i.assignee_id)||n.set(i.assignee_id,[]),n.get(i.assignee_id).push(i));return n}catch(t){return console.error("Failed to load what the team is working on:",t),new Map}}async function mr(){const e=T();if(!e)return;const t=++dr,n=gd,i=document.getElementById("people-list");i&&(i.innerHTML=RI(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=gd),Rf().then(()=>{t===dr&&(Si()?Oo():jf(),cr===e.id&&Ri())});try{const[a,o]=await Promise.all([Ug(e.id,n),jI(e.id)]);if(t!==dr)return;je=a,cr=e.id,Fg=o,Ri()}catch(a){if(t!==dr)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=V({icon:U.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),_("load the roster",a)}}function fr(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function PI(e){const t=Fg.get(e.user_id)||[];if(t.length){const[n]=t,i=t.length>1?` and ${t.length-1} more`:"";return`<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${u(n.identifier)} ${u(n.title)}${i}`}return e.is_agent?`${e.owner_name?`Agent of ${u(e.owner_name)}`:"Agent"}${e.idle?" · idle":""}`:e.tagline?u(e.tagline):u(fr(e))}function qI(e){const t=m(e.user_id),n=e.mention_handle?` <span class="person-row-handle">@${u(e.mention_handle)}</span>`:"",i=[];return e.is_agent?(i.push(`<span class="badge badge-neutral">${u(qg(e.project_id))}</span>`),Og(e)?i.push('<span class="badge badge-accent">Registrar</span>'):e.kind==="session"&&i.push('<span class="badge badge-neutral">Session</span>')):e.role&&e.role!=="member"&&i.push(`<span class="badge badge-neutral">${u(fr(e))}</span>`),`
        <a class="list-row-2line person-row${e.idle?" person-row-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-row-avatar" aria-hidden="true">${Vt(e,`avatar person-avatar${e.is_agent?" person-avatar-agent":""}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${u(e.name)}${n}</span>
                <span class="list-row-sub">${PI(e)}</span>
            </span>
            <span class="list-row-right">${i.join("")}</span>
        </a>
    `}function Gg(e,t,n,i=""){return`
        <div class="section-header people-section-header">
            <h3>${e} <span class="section-count">${t.length}</span></h3>${i}
        </div>
        <div class="people-rows">${t.map(qI).join("")||`<p class="people-empty">${n}</p>`}</div>
    `}function Ri(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=je.filter(a=>!a.is_agent),n=je.filter(a=>a.is_agent),i=pe(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=Gg("Humans",t,"No one yet.",s)+Gg("Agents",n,"No agents yet.")+NI()}function NI(){var s;if(!Si())return"";const e=new Set(je.map(a=>a.user_id)),t=new Set(ft().map(a=>a.id)),n=(s=pe())==null?void 0:s.id,i=Pt().filter(a=>!e.has(a.user_id)&&!t.has(a.user_id));return i.length?`
        <div class="section-header people-section-header">
            <h3>Not on the roster <span class="section-count">${i.length}</span></h3>
        </div>
        <div class="people-rows">${i.map(a=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">${u(a.user_name||"Unknown")}</div>
                    <div class="list-row-sub">${u(a.user_email||"")}${a.user_email?" · ":""}deactivated account, ${u(a.role||"member")}</div>
                </div>
                ${a.user_id!==n&&a.role!=="owner"?`<div class="list-row-right"><button class="btn btn-danger-outline btn-small" data-action="remove-member" data-user-id="${m(a.user_id)}">Remove from team</button></div>`:""}
            </div>`).join("")}
        </div>
    `:""}function OI(e){return{user_id:e.id,name:e.name,avatar_url:e.avatar_url,pronouns:e.pronouns,tagline:e.tagline,bio:e.bio,mention_handle:null,is_agent:!0,role:null,kind:e.kind,owner_id:e.parent_user_id,owner_name:e.parent_user_name,project_id:e.agent_project_id,idle:!!e.idle,joined_at:e.created_at}}function zg(e,t=pe()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function Vg(e,t,{fresh:n=!1}={}){if(!n&&cr===e){const a=je.find(o=>o.user_id===t);if(a)return a}const s=(await Ug(e,!0)).find(a=>a.user_id===t)||null;return MI(e,s),s}let Wg=0,ra=null;async function gr(e,t=!0){var r;t&&hn(),hf();const n=++Wg,i=T();if(!i)return;const s=window.location.pathname,a=()=>{var l;return n!==Wg||((l=T())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let o;try{o=await Vg(i.id,e)}catch(l){if(a())return;_("load this profile",l),t||history.replaceState({view:"people"},"","/people"),N("people",t);return}if(!a()){if(!o){const l=ft().find(d=>d.id===e);l&&(o=OI(l))}if(!o){k("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),N("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),ss("people"),Ps("people"),vd(o),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function HI(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function vd(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));const n=HI();n.classList.remove("hidden"),n.dataset.userId=e.user_id,ra=e;const i=m(e.user_id),s=zg(e),a=e.user_id===((l=pe())==null?void 0:l.id),o=e.bio?`<div class="person-bio markdown-body">${Mn(e.bio)}</div>`:`<p class="person-bio-empty">${a?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${u(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${a?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${Vt(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${u(e.name)}${e.pronouns?`<span class="person-pronouns">${u(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${u(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${u(e.tagline)}</div>`:""}
                <div class="person-role">${u(fr(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${o}
        <div class="person-sections">
            <section class="person-work">
                <div class="section-header"><h3>Working on</h3></div>
                <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
            </section>
            ${e.is_agent?BI(e,je):""}
            ${!e.is_agent||!ar(e)?FI(e):""}
        </div>
    `,t&&zI(e.user_id),Ng(e)&&rr(e.user_id)}function FI(e){var i;if(!Si())return"";const t=Pt().find(s=>s.user_id===e.user_id);if(!t)return"";const n=e.user_id!==((i=pe())==null?void 0:i.id)&&t.role!=="owner";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${u(fr(e))}</dd>
                ${t.user_email?`<dt>Email</dt><dd>${u(t.user_email)}</dd>`:""}
            </dl>
            ${n?`<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${m(e.user_id)}">Remove from team</button></div>`:""}
        </section>
    `}function hr(){const e=document.getElementById("people-view");return!!e&&!e.classList.contains("hidden")}function UI(e){const{agentId:t,deleted:n,created:i,credentials:s}=e.detail||{};if(s){rr(t);return}if(n){je=je.filter(a=>a.user_id!==t),la(t)?N("people"):hr()&&Ri();return}if(i){hr()&&mr();return}la(t)&&ra?vd(ra):hr()&&Ri()}function GI(e){const{userId:t}=e.detail||{};je=je.filter(n=>n.user_id!==t),la(t)?N("people"):hr()&&Ri()}typeof window<"u"&&(window.addEventListener("chaotic:agent-changed",UI),window.addEventListener("chaotic:member-removed",GI));const Kg=["in_progress","in_review","todo"];let Yg=0;async function zI(e){const t=T();if(!t)return;const n=++Yg;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:Kg,sort_by:"status",order:"asc",limit:20})}catch(o){i=null,console.error("Failed to load their issues:",o)}if(n!==Yg)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const a=o=>Kg.indexOf(o.status);s.innerHTML=[...i].sort((o,r)=>a(o)-a(r)).map(o=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(o.identifier)}" data-action="person-open-issue" data-identifier="${m(o.identifier)}">
            <span class="person-issue-id">${u(o.identifier)}</span>
            <span class="person-issue-title">${u(o.title)}</span>
            <span class="person-issue-status">${u(String(o.status).replace("_"," "))}</span>
        </a>
    `).join("")}const bd=["name","avatar_url","pronouns","tagline","bio"];function VI(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(bd.map(n=>[n,t(n,e==null?void 0:e[n])]))}let yd=0;async function WI(e){var l;const t=pe(),n=T();if(!t||!n)return;const i=++yd,s=window.location.pathname;let a;try{a=await Vg(n.id,e,{fresh:!0})}catch(d){i===yd&&_("load this profile",d);return}if(i!==yd||window.location.pathname!==s||((l=T())==null?void 0:l.id)!==n.id||(!a&&e===t.id&&(a={...t,user_id:t.id}),!a||!zg(a,t)))return;ur=e,oa=a,Mi=VI(a),hd++;const o=e===t.id,r=d=>m(d||"");document.getElementById("modal-title").textContent=o?"Edit your profile":`Edit ${a.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(a.name)}" maxlength="${lr.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(a.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            ${o?`<div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${ca?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${Jr.test(a.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${ca?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${Xg}px.</p>
            </div>`:""}
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(a.pronouns)}" maxlength="${lr.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(a.tagline)}" maxlength="${lr.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${lr.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${u(a.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${pr?" disabled":""}>Save</button>
        </form>
    `,G()}function KI(e,t=null){const n=a=>{var o;return((o=e.querySelector(`#${a}`))==null?void 0:o.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const a of bd){const o=t?String(t[a]??""):null;(a==="avatar_url"?i[a]===(o==null?void 0:o.trim()):i[a]===o)||(s[a]=a==="avatar_url"?i[a]||null:i[a])}return s}function Qg(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");vd(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function la(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function Zg(){ur=null,Mi=null,oa=null,H()}async function YI(e){e.preventDefault();const t=ur;if(!t||pr)return;const n=e.target.closest("form")||e.target,i=KI(n,Mi);if(!Object.keys(i).length){Zg();return}const s=pe(),a=t===(s==null?void 0:s.id),o=oa,r=hd,l=n.querySelector('button[type="submit"]');pr=!0,l&&(l.disabled=!0);try{const d=a?await h.updateMe(i):await h.updateAgent(t,i),c=Object.fromEntries(bd.map(p=>[p,(d==null?void 0:d[p])??null]));je=je.map(p=>p.user_id===t?{...p,...c}:p),a&&(Tt({...s,...c}),Go()),r===hd&&Zg(),k("Profile saved","success"),la(t)?Qg({...o,...c}):Ri()}catch(d){_("save the profile",d)}finally{pr=!1,l&&(l.disabled=!1);const d=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');d&&(d.disabled=!1)}}const Xg=256;async function QI(e,t=Xg){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const a=d=>new Promise(c=>s.toBlob(c,d,.9)),o=await a("image/webp");let r=o&&o.type==="image/webp"?o:null;if(!r){const d=s.getContext("2d");d.globalCompositeOperation="destination-over",d.fillStyle="#fff",d.fillRect(0,0,t,t),r=await a("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let ca=!1;function Jg(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function ZI(e){var i;const t=pe();if(!t||!e||e.id&&e.id!==t.id)return;const n=e.avatar_url??null;if(je=je.map(s=>s.user_id===t.id?{...s,avatar_url:n}:s),Tt({...t,avatar_url:n}),Go(),ur===t.id&&Mi){const s=document.getElementById("profile-avatar");s&&(s.value=n||""),Mi={...Mi,avatar_url:n||""},oa={...oa,avatar_url:n},(i=document.getElementById("profile-photo-remove"))==null||i.classList.toggle("hidden",!Jr.test(n||""))}ra&&la(t.id)&&Qg({...ra,avatar_url:n})}async function eh(e,t,n){if(!ca){ca=!0,Jg(!0);try{ZI(await e()),k(t,"success")}catch(i){_(n,i)}finally{ca=!1,Jg(!1)}}}async function XI(e,t=QI){var i;const n=(i=e.files)==null?void 0:i[0];if(n)try{await eh(async()=>h.uploadAvatar(await t(n)),"Photo uploaded","upload the photo")}finally{e.value=""}}function JI(){return eh(()=>h.deleteAvatar(),"Photo removed","remove the photo")}function wd(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}ne({"view-person":(e,t)=>{e.type!=="click"||wd(e)||(e.preventDefault(),gr(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),WI(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=pe();t&&gr(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&XI(n)},"remove-profile-photo":e=>{e.type==="click"&&JI()},"save-profile":e=>{YI(e)},"retry-load-people":e=>{e.type==="click"&&mr()},"person-open-issue":(e,t)=>{e.type!=="click"||wd(e)||(e.preventDefault(),Bo(t.identifier))},"revoke-agent-key":(e,t)=>{e.type==="click"&&DI(t.keyId,t.agentId)},"revoke-agent-connection":async(e,t)=>{e.type==="click"&&(await mg(t.connectionId,t.connectionName),rr(t.agentId))},"back-to-roster":e=>{e.type!=="click"||wd(e)||(e.preventDefault(),N("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(gd=!!n.checked,mr())}});const eS=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Et=[],vr=null,br=null,$d=0;ct(e=>{e==="currentProject"&&C()==="board"&&da()});async function da({fromMemory:e=!1}={}){Ca(-1);const t=++$d,n=Q();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=ie().length===0?V({icon:U.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):V({icon:U.board,heading:"Select a project",description:"Board shows one project at a time. Pick one in the sidebar switcher, or press P."}));return}const i=document.getElementById("kanban-board"),s=Bl(),a=e?ro("board",s):void 0;a?(Et=a,vr=s,C()==="board"&&Lt(Et),ji()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await h.getIssues({project_id:n});if(t!==$d)return;const r=a&&lo(Et,o);Et=o,vr=s,fi("board",s,o),C()==="board"&&Lt(Et),r||ji()}catch(o){if(t!==$d)return;i&&(i.innerHTML=V({icon:U.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),_("load board",o)}}const kd=pb(()=>da(),200);function ji(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;vr&&fi("board",vr,Et),e.innerHTML=eS.map(i=>{const s=Et.filter(a=>a.status===i.key);return`
            <div class="kanban-column" data-action="board-column" data-status="${i.key}">
                <div class="kanban-column-header">
                    <div class="kanban-column-title">
                        <span class="status-dot status-dot-${i.key}"></span>
                        ${i.label}
                    </div>
                    <span class="kanban-column-count">${s.length}</span>
                </div>
                <div class="kanban-column-content">
                    ${s.length===0?`
                        <div class="kanban-column-empty">No issues</div>
                    `:s.map(tS).join("")}
                </div>
            </div>
        `}).join(""),nS(t)}function tS(e){const t=e.assignee_id?$t(e.assignee_id):null,n=t?ut(t):null,i=e.estimate!=null?gn(e.estimate,e.project_id):"",s=Co(e.estimate,e.project_id),a=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${u(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${Vt(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${u(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(Le(e.priority))}">${mt(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${u(i)}</span>`:""}
                ${a.map(o=>`<span class="issue-label" title="${m(o.name)}" style="background: ${te(o.color)}20; color: ${te(o.color)}">${u(o.name)}</span>`).join("")}
            </div>
        </div>
    `}function nS(e){const t=Ru();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Ca(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Ca(i),n[i].classList.add("keyboard-selected")}function iS(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),br=t.dataset.id,t.classList.add("dragging")}function sS(e,t){t.classList.remove("dragging"),br=null}function th(e){const t=Et.find(n=>n.id===br);return!!t&&t.status===e}function aS(e,t){e.preventDefault(),!th(t.dataset.status)&&t.classList.add("drag-over")}function oS(e,t){t.classList.remove("drag-over")}function rS(e,t){e.preventDefault();const n=Et.find(i=>i.id===t.dataset.id);n&&th(n.status)||t.classList.add("drag-over")}function lS(e,t){t.classList.remove("drag-over")}async function cS(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=Et.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,ji();try{const o=await h.updateIssue(n,{status:i});k("Status updated","success"),fs(o)}catch(o){s.status=a,ji(),_("update status",o)}}}async function dS(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=br||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=Et.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,ji();try{const l=await h.updateIssue(n,{status:a});k("Status updated","success"),fs(l)}catch(l){o.status=r,ji(),_("update status",l)}}}ne({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),ae(t.id)):e.type==="dragstart"?iS(e,n):e.type==="dragend"?sS(e,n):e.type==="dragover"?rS(e,n):e.type==="dragleave"?lS(e,n):e.type==="drop"&&dS(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?aS(e,n):e.type==="dragleave"?oS(e,n):e.type==="drop"&&cS(e,n)},"retry-load-board":()=>da()});const kn=new Map,nh=6e4,_d=100;let Pe=null,yr=null,wr=null,ua=null,ih=!1;const sh={backlog:"var(--status-backlog)",todo:"var(--status-todo)",in_progress:"var(--status-in-progress)",in_review:"var(--status-in-review)",done:"var(--status-done)",canceled:"var(--status-canceled)"},ah={urgent:"var(--priority-urgent)",high:"var(--priority-high)",medium:"var(--priority-medium)",low:"var(--priority-low)",no_priority:"var(--priority-none)"},oh={api:null};let Ed={...oh};function uS(e={}){Ed={...oh,...e},Pe||(Pe=document.createElement("div"),Pe.className="issue-tooltip",Pe.style.display="none",document.body.appendChild(Pe),Pe.addEventListener("mouseenter",()=>{clearTimeout(yr)}),Pe.addEventListener("mouseleave",()=>{xd()})),ih||(document.addEventListener("mouseover",pS),document.addEventListener("mouseout",mS),ih=!0)}function pS(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=fS(t);if(n){if(n===ua&&Pe.style.display!=="none"){clearTimeout(yr);return}clearTimeout(wr),wr=setTimeout(()=>{gS(t,n)},200)}}function mS(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(wr),yr=setTimeout(()=>{xd()},150))}function fS(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function gS(e,t){ua=t;const n=e.getBoundingClientRect();Pe.style.left=`${n.left+window.scrollX}px`,Pe.style.top=`${n.bottom+window.scrollY+8}px`,Pe.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Pe.style.display="block";try{const i=await vS(t);if(ua!==t)return;bS(i)}catch{if(ua!==t)return;Pe.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function xd(){clearTimeout(wr),clearTimeout(yr),Pe&&(Pe.style.display="none"),ua=null}function hS(){const e=Date.now();for(const[t,n]of kn.entries())e-n.timestamp>=nh&&kn.delete(t)}async function vS(e){kn.size>_d/2&&hS();const t=kn.get(e);if(t&&Date.now()-t.timestamp<nh)return t.issue;if(!Ed.api)throw new Error("API not initialized");const n=await Ed.api.getIssueByIdentifier(e);if(kn.size>=_d){const i=Array.from(kn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,_d/2);for(const[a]of s)kn.delete(a)}return kn.set(e,{issue:n,timestamp:Date.now()}),n}function bS(e){const t=sh[e.status]||sh.backlog,n=ah[e.priority]||ah.no_priority,i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Pe.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${u(e.identifier)}</span>
            <span class="issue-tooltip-type">${u(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${u(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${yS(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${wS(e.priority)}</span>
        </div>
    `}function yS(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function wS(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function rh(){return!!document.querySelector(".description-inline-editor")}function Id(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function Sd(){var e;return Id("issue-detail-view")?((e=$e())==null?void 0:e.id)??null:null}function Gn(e){return!!e&&Sd()===e}function $S(){Ze("issue:created",SS),Ze("issue:updated",TS),Ze("issue:deleted",LS),Ze("comment",BS),Ze("relation",MS),Ze("attestation",RS),Ze("activity",PS),Ze("project",qS),Ze("sprint",NS),Ze("document",DS),Ze("inbox",jS),Ze("connection:reconnected",OS),Ze("connection:unauthorized",_S),Ze("connection:forbidden",ES),Ze("connection:superseded",kS)}function kS(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function _S(){h.logout(),Tt(null),Qn(null),Js(),k("Your session has ended. Please sign in again.","warning")}function ES(){k("Live updates stopped: you no longer have access to this team.","error")}function lh(e,t){var n;return e&&e===((n=pe())==null?void 0:n.id)?"You":t||"Someone"}function xS(e){var s;const t=lh(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(lt(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${Le(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=pe())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function IS(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${lh(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function ch(e,t,n){const i=k(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const a=()=>{var o;(o=i.querySelector(".toast-close"))==null||o.click(),Promise.resolve(ae(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",a),s.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),a())})}}}function SS(e){var s;_s(C(),"board","sprints","epics");const t=J(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Je(a),C()==="issues"&&pt()}else Je([e,...t]),C()==="issues"&&pt(),ch(e,xS(e),"info");if(e.assignee_id===((s=pe())==null?void 0:s.id)){const a=ze(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)Ln([e,...a]),C()==="my-issues"&&An();else if(r>=0){const l=[...a];l[r]=e,Ln(l),C()==="my-issues"&&An()}}C()==="board"?kd():C()==="sprints"?pa():C()==="epics"&&wn(),Gn(e.parent_id)&&zn(e.parent_id)}function TS(e){_s(C(),"board","sprints","epics"),ja(e);const t=J();t.some(s=>s.id===e.id)&&Je(t.map(s=>s.id===e.id?e:s));const n=ze();n.some(s=>s.id===e.id)&&Ln(n.map(s=>s.id===e.id?e:s));const i=as();i.some(s=>s.id===e.id)&&Lt(i.map(s=>s.id===e.id?e:s)),C()==="issues"?pt():C()==="my-issues"?An():C()==="board"?kd():C()==="sprints"?pa():C()==="epics"&&wn(),Gn(e.id)&&(rh()?Kl(e):zn(e.id))}function LS(e){var s,a;const t=e.title??((s=J().find(o=>o.id===e.id))==null?void 0:s.title)??((a=ze().find(o=>o.id===e.id))==null?void 0:a.title);_s(C(),"board","sprints","epics"),Bb(e.id),Je(J().filter(o=>o.id!==e.id)),Ln(ze().filter(o=>o.id!==e.id));const n=as();n.some(o=>o.id===e.id)&&Lt(n.filter(o=>o.id!==e.id)),C()==="issues"?pt():C()==="my-issues"?(An(),ei({showLoading:!1})):C()==="board"?kd():C()==="sprints"?pa():C()==="epics"&&wn();const i=Gn(e.id);ch(null,IS(e,t),i?"warning":"info"),i&&N("my-issues")}const dh=250,AS=1e3,Pi=new Map;function zn(e){rh()?Kl():Td(e,dh)}function Td(e,t){let n=Pi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Pi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>CS(e),t))}async function CS(e){const t=Pi.get(e);if(!t)return;if(t.timer=null,!Gn(e)){Pi.delete(e);return}t.inFlight=!0;let n;try{n=await ae(e,!1,{refresh:!0})}finally{t.inFlight=!1}Pi.get(e)===t&&(t.again?(t.again=!1,Td(e,dh)):n==="retry"?Td(e,AS):Pi.delete(e))}function BS(e){C()==="my-issues"&&ei({showLoading:!1}),Gn(e.issue_id)&&zn(e.issue_id),e.document_id&&Em(e.document_id)}function DS(e,{type:t}={}){_s(C(),"documents"),_m(),t==="deleted"?y$(e.id,e.title):Em(e.id)}function MS(e){const t=Sd();t&&(e.source_issue_id===t||e.target_issue_id===t)&&zn(t)}function RS(e){C()==="approvals"&&Mt(),Gn(e.issue_id)&&zn(e.issue_id)}function jS(e,t){var n;e.recipient_user_id===((n=pe())==null?void 0:n.id)&&(Ei(),D_(t==null?void 0:t.type,e),C()==="inbox"&&!j_(t==null?void 0:t.type,e)&&Us({background:!0}))}function PS(e){C()==="my-issues"&&ei({showLoading:!1}),Gn(e.issue_id)&&zn(e.issue_id)}function qS(e,{type:t}){ht().then(()=>{C()==="projects"&&qn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function pa(){const e=uk();e&&Id("sprint-detail-view")?bi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Id("sprints-view")&&fn().catch(t=>console.error("Failed to reload sprints:",t))}function NS(e,{type:t}={}){if(_s(C(),"sprints"),Fm(),C()==="sprints"?pa():C()==="my-issues"&&us(),t==="created")k(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";k(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function OS(){const e=C();Dl(),Ei(),e==="issues"?Bt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Jn().catch(n=>console.error("Failed to resync my issues:",n)),us().catch(n=>console.error("Failed to resync sprint status:",n)),ei({showLoading:!1})):e==="board"?da():e==="sprints"?pa():e==="epics"?wn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?ht().then(()=>{C()==="projects"&&qn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?_m():e==="approvals"?Mt():e==="inbox"&&Us({background:!0});const t=Sd();t&&zn(t)}const HS='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function uh(e){return Array.from(e.querySelectorAll(HS)).filter(t=>!t.closest(".hidden, [hidden]"))}function ph(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function FS(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),ph(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=uh(t);n&&n.focus()}}}function ma(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),ph(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=uh(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&ma()});async function US(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=Q();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=ie().find(d=>d.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Je([r,...J()]),pt();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const d=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const c=J();c.some(p=>p.id===d.id)?Je(c.filter(p=>p.id!==a)):c.some(p=>p.id===a)&&Je(c.map(p=>p.id===a?d:p)),pt(),ht(),k("Issue created!","success")}catch(d){Je(J().filter(c=>c.id!==a)),pt(),_("create issue",d)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}$_({beforeScrollRestore:xl,beforeNavigate:()=>{X$(),r_(),ef(null),Zn(null),Pu(null),ma(),xd()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Ag(e[1]),!0;if(e[0]==="issue"&&e[1])return bo(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(bo(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(n0(e[1]),!0):e[0]==="sprint"&&e[1]?(fk(e[1]),!0):e[0]==="people"&&e[1]?(gr(decodeURIComponent(e[1]),!1),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(rf(e[1]),!0):!1},detailPopstate:e=>e.epicId?(ir(e.epicId,!1),!0):e.issueId?(ae(e.issueId,!1),!0):e.identifier?(bo(e.identifier),!0):e.documentId?(Ce(e.documentId,!1),!0):e.sprintId?(bi(e.sprintId,!1),!0):e.personId?(gr(e.personId,!1),!0):!1,restoreProject:()=>{const e=uf();e&&ie().some(t=>t.id===e)&&dt(e)},issueNavigate:e=>bo(e),epicNavigate:e=>Ag(e)}),w_({"my-issues":()=>{us(),Jn(),ei()},approvals:()=>{Mt()},inbox:()=>{Us({focusFirst:!0})},issues:()=>{var r;ew(),aw(),lw();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Bn().length>0||Dn().length>0;s||Bt();const a=wp().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(c=>{c.checked=t.includes(c.value)}),Ua())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(c=>{c.checked=n.includes(c.value)}),Ga())}}),o=Op().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>Bt()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{tI()},epics:()=>{wn({fromMemory:!0})},board:()=>{da({fromMemory:!0})},projects:()=>{qn(),ht().then(qn)},sprints:()=>{fn({fromMemory:!0})},rituals:()=>{Bk()},documents:()=>{Pn(null,null,{fromMemory:!0})},people:mr,settings:()=>{Zc(),pg(),fg(),ws()}});function GS(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||H()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>H())}function zS(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>lf(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>d_());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>u_()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>cf(a))})}function VS(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>wm("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>wm("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>$m());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>f$());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Yt())}function WS(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>ip())}function KS(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>rw());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Fy());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Uy()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Ka("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Ka("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Ka("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Ka("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Ya())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Qa())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>$l())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>kl())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Za())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>Xa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>at());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>at());const d=document.getElementById("sprint-filter");d&&d.addEventListener("change",()=>at());const c=document.getElementById("sort-by-select");c&&c.addEventListener("change",()=>Bt());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>Vp());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>US(g))}function YS(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Mk(t.dataset.tab))})}function QS(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Mf());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>ms()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),N(o.dataset.view),r.detail>0&&Cg())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>oE());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>ma());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>FS());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>ms())}function ZS(e){ma(),C()==="query"?Qx(e):e?dt(e):Jm()}function XS(){return wI(document.getElementById(yc))}ne({"navigate-to":(e,t)=>{N(t.view)},"switch-project":(e,t,n)=>{e.type==="change"&&ZS(n.value)},showCreateIssueModal:()=>ms(),showCreateEpicModal:()=>oI(),"retry-load-epics":()=>wn(),showCreateProjectModal:()=>af(),showCreateDocumentModal:()=>Im(),showCreateTeamModal:()=>Hf(),showEditTeamModal:()=>wE(),showInviteModal:()=>qf(),showCreateApiKeyModal:()=>$x(),showCreateAgentModal:()=>Vw(),resetOnboarding:()=>Kf(),logout:()=>ug(),navigateToProjects:()=>N("projects")});async function JS(){if(!h.getToken()){await og();return}vf();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await ib(Su(h.getToken()));if(n){t.then(i=>{Tt(i),Go()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await Zr(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),k("Showing saved data — check your connection and reload","error")}),Tt(n.user),await Fn({teamsRequest:e,snapshot:n});return}try{const i=await t;Tt(i),await Fn({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await og();return}console.error("Failed to load current user on boot:",i),Js(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{xb(),yx(),QS(),GS(),WS(),KS(),YS(),zS(),VS(),e0(),$I(),t0(),uS({api:h}),$S(),await JS()});function e0(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Nv()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Ov(n?"light":"dark")})}function t0(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Bo(i)}}})}async function n0(e){try{await Ce(e,!1)}catch{N("documents",!1)}}document.addEventListener("keydown",dI({getCurrentView:C,getSelectedIndex:Du,setSelectedIndex:Sn,viewIssue:ae,showEditIssueModal:Tm,showInlineDropdown:vl,isInlineDropdownOpen:ni,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:Un,beforeNavigate:xl})),document.addEventListener("keydown",uI({getCurrentView:C,getSelectedIndex:fb,setSelectedIndex:Mu,viewDocument:Ce,showEditDocumentModal:Sm,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:Un})),document.addEventListener("keydown",mI({getCurrentView:C,getSelectedIndex:Ru,setSelectedIndex:Ca,viewIssue:ae,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:Un})),document.addEventListener("keydown",pI({getCurrentView:C,getSelectedIndex:gb,setSelectedIndex:Ba,toggleInboxExpand:J_,collapseInboxExpand:N_,archiveInboxEntry:X_,isInlineDropdownOpen:ni,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:Un})),document.addEventListener("keydown",fI()),document.addEventListener("keydown",pd({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&bi(e.dataset.sprintId)},getCurrentView:C,getSelectedIndex:hb,setSelectedIndex:ju,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:Un})),document.addEventListener("keydown",pd({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&bf(e.dataset.identifier)},getCurrentView:C,getSelectedIndex:vb,setSelectedIndex:nl,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:Un})),document.addEventListener("keydown",pd({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:C,getSelectedIndex:Vb,setSelectedIndex:Wb,isInlineDropdownOpen:ni,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:Un}));function mh(){var e;N("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function i0(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||!!document.querySelector("#issue-detail-view details.related-add[open]")||d$()}document.addEventListener("keydown",lI({closeModal:H,closeSidebar:ma,navigateTo:N,openProjectSwitcher:XS,showCreateIssueModal:ms,showKeyboardShortcutsHelp:bg,isModalOpen:Ge,focusSearch:mh,isInlineDropdownOpen:ni,closeInlineDropdowns:ub,isModalDirty:cb,focusModalField:Tu,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),ai();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:i0,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),Ax([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>N("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>N("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>N("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>N("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>N("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>N("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>N("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>N("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>N("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>N("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to People",subtitle:"Everyone on the team, people and agents",icon:"👥",shortcut:"G T",action:()=>N("people"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>N("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{N("issues"),setTimeout(ms,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{N("projects"),setTimeout(af,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{N("documents"),setTimeout(Im,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Hf(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:mh,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{N("people"),setTimeout(qf,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>bg(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Kf(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>ug(),category:"Account"}]),document.addEventListener("keydown",cI({isModalOpen:Ge,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:yn,openCommandPalette:Cx,closeCommandPalette:Wo})),window.marked=Y,window.DOMPurify=vu,console.log("Chaotic frontend loaded via Vite")})();
