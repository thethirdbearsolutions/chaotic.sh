var m0=Object.defineProperty;var f0=(Ft,Ne,En)=>Ne in Ft?m0(Ft,Ne,{enumerable:!0,configurable:!0,writable:!0,value:En}):Ft[Ne]=En;var re=(Ft,Ne,En)=>f0(Ft,typeof Ne!="symbol"?Ne+"":Ne,En);(function(){"use strict";var Cd;function Ft(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ne=Ft();function En(e){Ne=e}var zi={exec:()=>null};function Q(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Oe.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Oe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ph=/^(?:[ \t]*(?:\n|$))+/,qh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Nh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Vi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Oh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ar=/(?:[*+-]|\d{1,9}[.)])/,Vd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Wd=Q(Vd).replace(/bull/g,Ar).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Hh=Q(Vd).replace(/bull/g,Ar).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Cr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Fh=/^[^\n]+/,Br=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Uh=Q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Br).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Gh=Q(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ar).getRegex(),va="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Dr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,zh=Q("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Dr).replace("tag",va).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Kd=Q(Cr).replace("hr",Vi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",va).getRegex(),Vh=Q(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Kd).getRegex(),Mr={blockquote:Vh,code:qh,def:Uh,fences:Nh,heading:Oh,hr:Vi,html:zh,lheading:Wd,list:Gh,newline:Ph,paragraph:Kd,table:zi,text:Fh},Yd=Q("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Vi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",va).getRegex(),Wh={...Mr,lheading:Hh,table:Yd,paragraph:Q(Cr).replace("hr",Vi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Yd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",va).getRegex()},Kh={...Mr,html:Q(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Dr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:zi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Q(Cr).replace("hr",Vi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Wd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Qh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Qd=/^( {2,}|\\)\n(?!\s*$)/,Zh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ba=/[\p{P}\p{S}]/u,Rr=/[\s\p{P}\p{S}]/u,Zd=/[^\s\p{P}\p{S}]/u,Xh=Q(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rr).getRegex(),Xd=/(?!~)[\p{P}\p{S}]/u,Jh=/(?!~)[\s\p{P}\p{S}]/u,ev=/(?:[^\s\p{P}\p{S}]|~)/u,tv=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Jd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,nv=Q(Jd,"u").replace(/punct/g,ba).getRegex(),iv=Q(Jd,"u").replace(/punct/g,Xd).getRegex(),eu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sv=Q(eu,"gu").replace(/notPunctSpace/g,Zd).replace(/punctSpace/g,Rr).replace(/punct/g,ba).getRegex(),av=Q(eu,"gu").replace(/notPunctSpace/g,ev).replace(/punctSpace/g,Jh).replace(/punct/g,Xd).getRegex(),ov=Q("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zd).replace(/punctSpace/g,Rr).replace(/punct/g,ba).getRegex(),rv=Q(/\\(punct)/,"gu").replace(/punct/g,ba).getRegex(),lv=Q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),cv=Q(Dr).replace("(?:-->|$)","-->").getRegex(),dv=Q("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",cv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ya=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,uv=Q(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ya).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),tu=Q(/^!?\[(label)\]\[(ref)\]/).replace("label",ya).replace("ref",Br).getRegex(),nu=Q(/^!?\[(ref)\](?:\[\])?/).replace("ref",Br).getRegex(),pv=Q("reflink|nolink(?!\\()","g").replace("reflink",tu).replace("nolink",nu).getRegex(),jr={_backpedal:zi,anyPunctuation:rv,autolink:lv,blockSkip:tv,br:Qd,code:Qh,del:zi,emStrongLDelim:nv,emStrongRDelimAst:sv,emStrongRDelimUnd:ov,escape:Yh,link:uv,nolink:nu,punctuation:Xh,reflink:tu,reflinkSearch:pv,tag:dv,text:Zh,url:zi},mv={...jr,link:Q(/^!?\[(label)\]\((.*?)\)/).replace("label",ya).getRegex(),reflink:Q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ya).getRegex()},Pr={...jr,emStrongRDelimAst:av,emStrongLDelim:iv,url:Q(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},fv={...Pr,br:Q(Qd).replace("{2,}","*").getRegex(),text:Q(Pr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},wa={normal:Mr,gfm:Wh,pedantic:Kh},Wi={normal:jr,gfm:Pr,breaks:fv,pedantic:mv},gv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},iu=e=>gv[e];function xt(e,t){if(t){if(Oe.escapeTest.test(e))return e.replace(Oe.escapeReplace,iu)}else if(Oe.escapeTestNoEncode.test(e))return e.replace(Oe.escapeReplaceNoEncode,iu);return e}function su(e){try{e=encodeURI(e).replace(Oe.percentDecode,"%")}catch{return null}return e}function au(e,t){var a;const n=e.replace(Oe.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Oe.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Oe.slashPipe,"|");return i}function Ki(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function hv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function ou(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function vv(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var $a=class{constructor(e){re(this,"options");re(this,"rules");re(this,"lexer");this.options=e||Ne}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ki(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=vv(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Ki(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ki(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Ki(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=p,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,i=i.substring(0,i.length-f.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),f=e.split(`
`,1)[0],g=!p.trim(),b=0;if(this.options.pedantic?(b=2,d=p.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=p.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const E=this.rules.other.nextBulletRegex(b),S=this.rules.other.hrRegex(b),L=this.rules.other.fencesBeginRegex(b),j=this.rules.other.headingBeginRegex(b),x=this.rules.other.htmlBeginRegex(b);for(;e;){const w=e.split(`
`,1)[0];let D;if(f=w,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),D=f):D=f.replace(this.rules.other.tabCharGlobal,"    "),L.test(f)||j.test(f)||x.test(f)||E.test(f)||S.test(f))break;if(D.search(this.rules.other.nonSpaceChar)>=b||!f.trim())d+=`
`+D.slice(b);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||L.test(p)||j.test(p)||S.test(p))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=w+`
`,e=e.substring(w.length+1),p=D.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let y=null,_;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(_=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:_,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=au(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(au(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Ki(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=hv(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),ou(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return ou(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const p=[...i[0]][0].length,f=e.slice(0,a+i.index+p+r);if(Math.min(a,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ut=class Gd{constructor(t){re(this,"tokens");re(this,"options");re(this,"state");re(this,"tokenizer");re(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ne,this.options.tokenizer=this.options.tokenizer||new $a,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Oe,block:wa.normal,inline:Wi.normal};this.options.pedantic?(n.block=wa.pedantic,n.inline=Wi.pedantic):this.options.gfm&&(n.block=wa.gfm,this.options.breaks?n.inline=Wi.breaks:n.inline=Wi.gfm),this.tokenizer.rules=n}static get rules(){return{block:wa,inline:Wi}}static lex(t,n){return new Gd(n).lex(t)}static lexInline(t,n){return new Gd(n).inlineTokens(t)}lex(t){t=t.replace(Oe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Oe.tabCharGlobal,"    ").replace(Oe.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let p=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(p)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},ka=class{constructor(e){re(this,"options");re(this,"parser");this.options=e||Ne}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Oe.notSpaceStart))==null?void 0:a[0],s=e.replace(Oe.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${xt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=su(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+xt(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=su(e);if(s===null)return xt(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${xt(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:xt(e.text)}},qr=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Gt=class zd{constructor(t){re(this,"options");re(this,"renderer");re(this,"textRenderer");this.options=t||Ne,this.options.renderer=this.options.renderer||new ka,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new qr}static parse(t,n){return new zd(n).parse(t)}static parseInline(t,n){return new zd(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},_a=(Cd=class{constructor(e){re(this,"options");re(this,"block");this.options=e||Ne}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?Gt.parse:Gt.parseInline}},re(Cd,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Cd),bv=class{constructor(...e){re(this,"defaults",Ft());re(this,"options",this.setOptions);re(this,"parse",this.parseMarkdown(!0));re(this,"parseInline",this.parseMarkdown(!1));re(this,"Parser",Gt);re(this,"Renderer",ka);re(this,"TextRenderer",qr);re(this,"Lexer",Ut);re(this,"Tokenizer",$a);re(this,"Hooks",_a);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new ka(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new $a(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new _a;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];_a.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(p=>l.call(s,p));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return Gt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ut.lex:Ut.lexInline,l=a.hooks?a.hooks.provideParser():e?Gt.parse:Gt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+xt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},xn=new bv;function K(e,t){return xn.parse(e,t)}K.options=K.setOptions=function(e){return xn.setOptions(e),K.defaults=xn.defaults,En(K.defaults),K},K.getDefaults=Ft,K.defaults=Ne,K.use=function(...e){return xn.use(...e),K.defaults=xn.defaults,En(K.defaults),K},K.walkTokens=function(e,t){return xn.walkTokens(e,t)},K.parseInline=xn.parseInline,K.Parser=Gt,K.parser=Gt.parse,K.Renderer=ka,K.TextRenderer=qr,K.Lexer=Ut,K.lexer=Ut.lex,K.Tokenizer=$a,K.Hooks=_a,K.parse=K,K.options,K.setOptions,K.use,K.walkTokens,K.parseInline,Gt.parse,Ut.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:ru,setPrototypeOf:lu,isFrozen:yv,getPrototypeOf:wv,getOwnPropertyDescriptor:$v}=Object;let{freeze:He,seal:rt,create:Nr}=Object,{apply:Or,construct:Hr}=typeof Reflect<"u"&&Reflect;He||(He=function(t){return t}),rt||(rt=function(t){return t}),Or||(Or=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),Hr||(Hr=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Ea=Ue(Array.prototype.forEach),kv=Ue(Array.prototype.lastIndexOf),cu=Ue(Array.prototype.pop),Yi=Ue(Array.prototype.push),_v=Ue(Array.prototype.splice),xa=Ue(String.prototype.toLowerCase),Fr=Ue(String.prototype.toString),Ur=Ue(String.prototype.match),Qi=Ue(String.prototype.replace),Ev=Ue(String.prototype.indexOf),xv=Ue(String.prototype.trim),bt=Ue(Object.prototype.hasOwnProperty),Fe=Ue(RegExp.prototype.test),Zi=Iv(TypeError);function Ue(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Or(e,t,i)}}function Iv(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Hr(e,n)}}function z(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:xa;lu&&lu(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(yv(t)||(t[i]=a),s=a)}e[s]=!0}return e}function Sv(e){for(let t=0;t<e.length;t++)bt(e,t)||(e[t]=null);return e}function It(e){const t=Nr(null);for(const[n,i]of ru(e))bt(e,n)&&(Array.isArray(i)?t[n]=Sv(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=It(i):t[n]=i);return t}function Xi(e,t){for(;e!==null;){const i=$v(e,t);if(i){if(i.get)return Ue(i.get);if(typeof i.value=="function")return Ue(i.value)}e=wv(e)}function n(){return null}return n}const du=He(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gr=He(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zr=He(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Tv=He(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Vr=He(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Lv=He(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),uu=He(["#text"]),pu=He(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Wr=He(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mu=He(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ia=He(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Av=rt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Cv=rt(/<%[\w\W]*|[\w\W]*%>/gm),Bv=rt(/\$\{[\w\W]*/gm),Dv=rt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Mv=rt(/^aria-[\-\w]+$/),fu=rt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Rv=rt(/^(?:\w+script|data):/i),jv=rt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gu=rt(/^html$/i),Pv=rt(/^[a-z][.\w]*(-[.\w]+)+$/i);var hu=Object.freeze({__proto__:null,ARIA_ATTR:Mv,ATTR_WHITESPACE:jv,CUSTOM_ELEMENT:Pv,DATA_ATTR:Dv,DOCTYPE_NAME:gu,ERB_EXPR:Cv,IS_ALLOWED_URI:fu,IS_SCRIPT_OR_DATA:Rv,MUSTACHE_EXPR:Av,TMPLIT_EXPR:Bv});const Ji={element:1,text:3,progressingInstruction:7,comment:8,document:9},qv=function(){return typeof window>"u"?null:window},Nv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},vu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function bu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:qv();const t=q=>bu(q);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Ji.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:g}=e,b=l.prototype,y=Xi(b,"cloneNode"),_=Xi(b,"remove"),E=Xi(b,"nextSibling"),S=Xi(b,"childNodes"),L=Xi(b,"parentNode");if(typeof o=="function"){const q=n.createElement("template");q.content&&q.content.ownerDocument&&(n=q.content.ownerDocument)}let j,x="";const{implementation:w,createNodeIterator:D,createDocumentFragment:H,getElementsByTagName:J}=n,{importNode:ne}=i;let Z=vu();t.isSupported=typeof ru=="function"&&typeof L=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:I,ERB_EXPR:M,TMPLIT_EXPR:R,DATA_ATTR:ae,ARIA_ATTR:ge,IS_SCRIPT_OR_DATA:ot,ATTR_WHITESPACE:B,CUSTOM_ELEMENT:ue}=hu;let{IS_ALLOWED_URI:be}=hu,oe=null;const ee=z({},[...du,...Gr,...zr,...Vr,...uu]);let De=null;const hh=z({},[...pu,...Wr,...mu,...Ia]);let ye=Object.seal(Nr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),fa=null,Bd=null;const qi=Object.seal(Nr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let vh=!0,Dd=!0,bh=!1,yh=!0,Ni=!1,_r=!0,Vn=!1,Md=!1,Rd=!1,Oi=!1,Er=!1,xr=!1,wh=!0,$h=!1;const a0="user-content-";let jd=!0,ga=!1,Hi={},Ot=null;const Pd=z({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let kh=null;const _h=z({},["audio","video","img","source","image","track"]);let qd=null;const Eh=z({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ir="http://www.w3.org/1998/Math/MathML",Sr="http://www.w3.org/2000/svg",sn="http://www.w3.org/1999/xhtml";let Fi=sn,Nd=!1,Od=null;const o0=z({},[Ir,Sr,sn],Fr);let Tr=z({},["mi","mo","mn","ms","mtext"]),Lr=z({},["annotation-xml"]);const r0=z({},["title","style","font","a","script"]);let ha=null;const l0=["application/xhtml+xml","text/html"],c0="text/html";let xe=null,Ui=null;const d0=n.createElement("form"),xh=function(v){return v instanceof RegExp||v instanceof Function},Hd=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ui&&Ui===v)){if((!v||typeof v!="object")&&(v={}),v=It(v),ha=l0.indexOf(v.PARSER_MEDIA_TYPE)===-1?c0:v.PARSER_MEDIA_TYPE,xe=ha==="application/xhtml+xml"?Fr:xa,oe=bt(v,"ALLOWED_TAGS")?z({},v.ALLOWED_TAGS,xe):ee,De=bt(v,"ALLOWED_ATTR")?z({},v.ALLOWED_ATTR,xe):hh,Od=bt(v,"ALLOWED_NAMESPACES")?z({},v.ALLOWED_NAMESPACES,Fr):o0,qd=bt(v,"ADD_URI_SAFE_ATTR")?z(It(Eh),v.ADD_URI_SAFE_ATTR,xe):Eh,kh=bt(v,"ADD_DATA_URI_TAGS")?z(It(_h),v.ADD_DATA_URI_TAGS,xe):_h,Ot=bt(v,"FORBID_CONTENTS")?z({},v.FORBID_CONTENTS,xe):Pd,fa=bt(v,"FORBID_TAGS")?z({},v.FORBID_TAGS,xe):It({}),Bd=bt(v,"FORBID_ATTR")?z({},v.FORBID_ATTR,xe):It({}),Hi=bt(v,"USE_PROFILES")?v.USE_PROFILES:!1,vh=v.ALLOW_ARIA_ATTR!==!1,Dd=v.ALLOW_DATA_ATTR!==!1,bh=v.ALLOW_UNKNOWN_PROTOCOLS||!1,yh=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ni=v.SAFE_FOR_TEMPLATES||!1,_r=v.SAFE_FOR_XML!==!1,Vn=v.WHOLE_DOCUMENT||!1,Oi=v.RETURN_DOM||!1,Er=v.RETURN_DOM_FRAGMENT||!1,xr=v.RETURN_TRUSTED_TYPE||!1,Rd=v.FORCE_BODY||!1,wh=v.SANITIZE_DOM!==!1,$h=v.SANITIZE_NAMED_PROPS||!1,jd=v.KEEP_CONTENT!==!1,ga=v.IN_PLACE||!1,be=v.ALLOWED_URI_REGEXP||fu,Fi=v.NAMESPACE||sn,Tr=v.MATHML_TEXT_INTEGRATION_POINTS||Tr,Lr=v.HTML_INTEGRATION_POINTS||Lr,ye=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&xh(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ye.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&xh(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ye.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ye.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ni&&(Dd=!1),Er&&(Oi=!0),Hi&&(oe=z({},uu),De=[],Hi.html===!0&&(z(oe,du),z(De,pu)),Hi.svg===!0&&(z(oe,Gr),z(De,Wr),z(De,Ia)),Hi.svgFilters===!0&&(z(oe,zr),z(De,Wr),z(De,Ia)),Hi.mathMl===!0&&(z(oe,Vr),z(De,mu),z(De,Ia))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?qi.tagCheck=v.ADD_TAGS:(oe===ee&&(oe=It(oe)),z(oe,v.ADD_TAGS,xe))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?qi.attributeCheck=v.ADD_ATTR:(De===hh&&(De=It(De)),z(De,v.ADD_ATTR,xe))),v.ADD_URI_SAFE_ATTR&&z(qd,v.ADD_URI_SAFE_ATTR,xe),v.FORBID_CONTENTS&&(Ot===Pd&&(Ot=It(Ot)),z(Ot,v.FORBID_CONTENTS,xe)),v.ADD_FORBID_CONTENTS&&(Ot===Pd&&(Ot=It(Ot)),z(Ot,v.ADD_FORBID_CONTENTS,xe)),jd&&(oe["#text"]=!0),Vn&&z(oe,["html","head","body"]),oe.table&&(z(oe,["tbody"]),delete fa.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw Zi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Zi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=v.TRUSTED_TYPES_POLICY,x=j.createHTML("")}else j===void 0&&(j=Nv(g,s)),j!==null&&typeof x=="string"&&(x=j.createHTML(""));He&&He(v),Ui=v}},Ih=z({},[...Gr,...zr,...Tv]),Sh=z({},[...Vr,...Lv]),u0=function(v){let T=L(v);(!T||!T.tagName)&&(T={namespaceURI:Fi,tagName:"template"});const P=xa(v.tagName),pe=xa(T.tagName);return Od[v.namespaceURI]?v.namespaceURI===Sr?T.namespaceURI===sn?P==="svg":T.namespaceURI===Ir?P==="svg"&&(pe==="annotation-xml"||Tr[pe]):!!Ih[P]:v.namespaceURI===Ir?T.namespaceURI===sn?P==="math":T.namespaceURI===Sr?P==="math"&&Lr[pe]:!!Sh[P]:v.namespaceURI===sn?T.namespaceURI===Sr&&!Lr[pe]||T.namespaceURI===Ir&&!Tr[pe]?!1:!Sh[P]&&(r0[P]||!Ih[P]):!!(ha==="application/xhtml+xml"&&Od[v.namespaceURI]):!1},Ht=function(v){Yi(t.removed,{element:v});try{L(v).removeChild(v)}catch{_(v)}},Wn=function(v,T){try{Yi(t.removed,{attribute:T.getAttributeNode(v),from:T})}catch{Yi(t.removed,{attribute:null,from:T})}if(T.removeAttribute(v),v==="is")if(Oi||Er)try{Ht(T)}catch{}else try{T.setAttribute(v,"")}catch{}},Th=function(v){let T=null,P=null;if(Rd)v="<remove></remove>"+v;else{const ke=Ur(v,/^[\r\n\t ]+/);P=ke&&ke[0]}ha==="application/xhtml+xml"&&Fi===sn&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");const pe=j?j.createHTML(v):v;if(Fi===sn)try{T=new f().parseFromString(pe,ha)}catch{}if(!T||!T.documentElement){T=w.createDocument(Fi,"template",null);try{T.documentElement.innerHTML=Nd?x:pe}catch{}}const qe=T.body||T.documentElement;return v&&P&&qe.insertBefore(n.createTextNode(P),qe.childNodes[0]||null),Fi===sn?J.call(T,Vn?"html":"body")[0]:Vn?T.documentElement:qe},Lh=function(v){return D.call(v.ownerDocument||v,v,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Fd=function(v){return v instanceof p&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof d)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},Ah=function(v){return typeof r=="function"&&v instanceof r};function an(q,v,T){Ea(q,P=>{P.call(t,v,T,Ui)})}const Ch=function(v){let T=null;if(an(Z.beforeSanitizeElements,v,null),Fd(v))return Ht(v),!0;const P=xe(v.nodeName);if(an(Z.uponSanitizeElement,v,{tagName:P,allowedTags:oe}),_r&&v.hasChildNodes()&&!Ah(v.firstElementChild)&&Fe(/<[/\w!]/g,v.innerHTML)&&Fe(/<[/\w!]/g,v.textContent)||v.nodeType===Ji.progressingInstruction||_r&&v.nodeType===Ji.comment&&Fe(/<[/\w]/g,v.data))return Ht(v),!0;if(!(qi.tagCheck instanceof Function&&qi.tagCheck(P))&&(!oe[P]||fa[P])){if(!fa[P]&&Dh(P)&&(ye.tagNameCheck instanceof RegExp&&Fe(ye.tagNameCheck,P)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(P)))return!1;if(jd&&!Ot[P]){const pe=L(v)||v.parentNode,qe=S(v)||v.childNodes;if(qe&&pe){const ke=qe.length;for(let it=ke-1;it>=0;--it){const on=y(qe[it],!0);on.__removalCount=(v.__removalCount||0)+1,pe.insertBefore(on,E(v))}}}return Ht(v),!0}return v instanceof l&&!u0(v)||(P==="noscript"||P==="noembed"||P==="noframes")&&Fe(/<\/no(script|embed|frames)/i,v.innerHTML)?(Ht(v),!0):(Ni&&v.nodeType===Ji.text&&(T=v.textContent,Ea([I,M,R],pe=>{T=Qi(T,pe," ")}),v.textContent!==T&&(Yi(t.removed,{element:v.cloneNode()}),v.textContent=T)),an(Z.afterSanitizeElements,v,null),!1)},Bh=function(v,T,P){if(wh&&(T==="id"||T==="name")&&(P in n||P in d0))return!1;if(!(Dd&&!Bd[T]&&Fe(ae,T))){if(!(vh&&Fe(ge,T))){if(!(qi.attributeCheck instanceof Function&&qi.attributeCheck(T,v))){if(!De[T]||Bd[T]){if(!(Dh(v)&&(ye.tagNameCheck instanceof RegExp&&Fe(ye.tagNameCheck,v)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(v))&&(ye.attributeNameCheck instanceof RegExp&&Fe(ye.attributeNameCheck,T)||ye.attributeNameCheck instanceof Function&&ye.attributeNameCheck(T,v))||T==="is"&&ye.allowCustomizedBuiltInElements&&(ye.tagNameCheck instanceof RegExp&&Fe(ye.tagNameCheck,P)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(P))))return!1}else if(!qd[T]){if(!Fe(be,Qi(P,B,""))){if(!((T==="src"||T==="xlink:href"||T==="href")&&v!=="script"&&Ev(P,"data:")===0&&kh[v])){if(!(bh&&!Fe(ot,Qi(P,B,"")))){if(P)return!1}}}}}}}return!0},Dh=function(v){return v!=="annotation-xml"&&Ur(v,ue)},Mh=function(v){an(Z.beforeSanitizeAttributes,v,null);const{attributes:T}=v;if(!T||Fd(v))return;const P={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:De,forceKeepAttr:void 0};let pe=T.length;for(;pe--;){const qe=T[pe],{name:ke,namespaceURI:it,value:on}=qe,Gi=xe(ke),Ud=on;let Me=ke==="value"?Ud:xv(Ud);if(P.attrName=Gi,P.attrValue=Me,P.keepAttr=!0,P.forceKeepAttr=void 0,an(Z.uponSanitizeAttribute,v,P),Me=P.attrValue,$h&&(Gi==="id"||Gi==="name")&&(Wn(ke,v),Me=a0+Me),_r&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,Me)){Wn(ke,v);continue}if(Gi==="attributename"&&Ur(Me,"href")){Wn(ke,v);continue}if(P.forceKeepAttr)continue;if(!P.keepAttr){Wn(ke,v);continue}if(!yh&&Fe(/\/>/i,Me)){Wn(ke,v);continue}Ni&&Ea([I,M,R],jh=>{Me=Qi(Me,jh," ")});const Rh=xe(v.nodeName);if(!Bh(Rh,Gi,Me)){Wn(ke,v);continue}if(j&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!it)switch(g.getAttributeType(Rh,Gi)){case"TrustedHTML":{Me=j.createHTML(Me);break}case"TrustedScriptURL":{Me=j.createScriptURL(Me);break}}if(Me!==Ud)try{it?v.setAttributeNS(it,ke,Me):v.setAttribute(ke,Me),Fd(v)?Ht(v):cu(t.removed)}catch{Wn(ke,v)}}an(Z.afterSanitizeAttributes,v,null)},p0=function q(v){let T=null;const P=Lh(v);for(an(Z.beforeSanitizeShadowDOM,v,null);T=P.nextNode();)an(Z.uponSanitizeShadowNode,T,null),Ch(T),Mh(T),T.content instanceof a&&q(T.content);an(Z.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(q){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},T=null,P=null,pe=null,qe=null;if(Nd=!q,Nd&&(q="<!-->"),typeof q!="string"&&!Ah(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw Zi("dirty is not a string, aborting")}else throw Zi("toString is not a function");if(!t.isSupported)return q;if(Md||Hd(v),t.removed=[],typeof q=="string"&&(ga=!1),ga){if(q.nodeName){const on=xe(q.nodeName);if(!oe[on]||fa[on])throw Zi("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof r)T=Th("<!---->"),P=T.ownerDocument.importNode(q,!0),P.nodeType===Ji.element&&P.nodeName==="BODY"||P.nodeName==="HTML"?T=P:T.appendChild(P);else{if(!Oi&&!Ni&&!Vn&&q.indexOf("<")===-1)return j&&xr?j.createHTML(q):q;if(T=Th(q),!T)return Oi?null:xr?x:""}T&&Rd&&Ht(T.firstChild);const ke=Lh(ga?q:T);for(;pe=ke.nextNode();)Ch(pe),Mh(pe),pe.content instanceof a&&p0(pe.content);if(ga)return q;if(Oi){if(Er)for(qe=H.call(T.ownerDocument);T.firstChild;)qe.appendChild(T.firstChild);else qe=T;return(De.shadowroot||De.shadowrootmode)&&(qe=ne.call(i,qe,!0)),qe}let it=Vn?T.outerHTML:T.innerHTML;return Vn&&oe["!doctype"]&&T.ownerDocument&&T.ownerDocument.doctype&&T.ownerDocument.doctype.name&&Fe(gu,T.ownerDocument.doctype.name)&&(it="<!DOCTYPE "+T.ownerDocument.doctype.name+`>
`+it),Ni&&Ea([I,M,R],on=>{it=Qi(it,on," ")}),j&&xr?j.createHTML(it):it},t.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Hd(q),Md=!0},t.clearConfig=function(){Ui=null,Md=!1},t.isValidAttribute=function(q,v,T){Ui||Hd({});const P=xe(q),pe=xe(v);return Bh(P,pe,T)},t.addHook=function(q,v){typeof v=="function"&&Yi(Z[q],v)},t.removeHook=function(q,v){if(v!==void 0){const T=kv(Z[q],v);return T===-1?void 0:_v(Z[q],T,1)[0]}return cu(Z[q])},t.removeHooks=function(q){Z[q]=[]},t.removeAllHooks=function(){Z=vu()},t}var yu=bu();const Kr="chaotic_";function Xe(e){try{return localStorage.getItem(Kr+e)}catch{return null}}function lt(e,t){try{localStorage.setItem(Kr+e,t)}catch{}}function St(e){try{localStorage.removeItem(Kr+e)}catch{}}function Yr(){return Xe("token")}function Ov(e){e?lt("token",e):St("token")}function Hv(){return Xe("theme")}function Fv(e){lt("theme",e)}function wu(){return Xe("last_project")}function $u(e){lt("last_project",e)}function Uv(){return Xe("onboarding_complete")==="true"}function Gv(){lt("onboarding_complete","true")}function zv(){St("onboarding_complete")}function Vv(e){return e?Xe(`issues_filters_${e}`):null}function Wv(e,t){e&&(t?lt(`issues_filters_${e}`,t):St(`issues_filters_${e}`))}function ku(e){return Xe(`comment_draft_${e}`)}function Sa(e,t){t?lt(`comment_draft_${e}`,t):St(`comment_draft_${e}`)}function _u(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function es(e){const t=Xe(`description_draft_${e}`);if(!t)return null;const n=_u(t);return n?n.draft:t}function Eu(e){const t=Xe(`description_draft_${e}`);if(!t)return null;const n=_u(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function In(e,t,n=""){t?lt(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):St(`description_draft_${e}`)}function xu(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Iu(e){var n;const t=Xe(`document_draft_${e}`);return t?((n=xu(t))==null?void 0:n.draft)??null:null}function Kv(e){const t=Xe(`document_draft_${e}`);if(!t)return null;const n=xu(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Ta(e,t,n=null){t&&(t.title||t.content||t.icon)?lt(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):St(`document_draft_${e}`)}function Yv(){return{title:Xe("create_issue_title"),description:Xe("create_issue_description")}}function Su(e,t){e?lt("create_issue_title",e):St("create_issue_title"),t?lt("create_issue_description",t):St("create_issue_description")}function Qv(){St("create_issue_title"),St("create_issue_description")}function Zv(){return Xe("doc_view_mode")}function Xv(e){lt("doc_view_mode",e)}function Jv(){return Xe("approvals_explainer_dismissed")==="1"}function eb(){lt("approvals_explainer_dismissed","1")}const tb="chaotic-boot-cache",Qr="snapshot",Zr="last",Tu=1,nb=336*60*60*1e3,ib=250;let Sn=null;function sb(){return Sn||(Sn=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(tb,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore(Qr),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),Sn=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),Sn.catch(()=>{Sn=null}),Sn)}function Xr(e,t){return sb().then(n=>new Promise((i,s)=>{const a=n.transaction(Qr,e),o=t(a.objectStore(Qr));a.oncomplete=()=>i(o==null?void 0:o.result),a.onerror=()=>s(a.error),a.onabort=()=>s(a.error)}))}function Lu(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function ab(e){if(!e)return Promise.resolve(null);const t=Xr("readonly",i=>i.get(Zr)).then(i=>!i||i.version!==Tu||i.userId!==e||!(Date.now()-i.savedAt<nb)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),ib));return Promise.race([t,n])}function ob(e,t){if(!e)return Promise.resolve();const n={...t,version:Tu,userId:e,savedAt:Date.now()};return Xr("readwrite",i=>i.put(n,Zr)).then(()=>{},()=>{})}function Jr(){return Xr("readwrite",e=>e.delete(Zr)).then(()=>{},()=>{})}const rb="/api";class lb{constructor(){this.token=Yr()}setToken(t){this.token=t,Ov(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s},o=typeof Blob<"u"&&i instanceof Blob;o&&(s["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=o?i:JSON.stringify(i));let r;try{r=await fetch(`${rb}${n}`,a)}catch(c){const d=new Error("Network error - check your connection");throw d.isNetworkError=!0,d.cause=c,d}if(r.status===204)return null;let l;try{l=await r.json()}catch{const c=r.headers.get("content-type")||"unknown";throw r.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${r.status})`)}if(!r.ok){let c;typeof l.detail=="string"?c=l.detail:l.detail&&typeof l.detail=="object"&&l.detail.message?c=l.detail.message:c="An error occurred";const d=new Error(c);throw d.status=r.status,d.detail=l.detail,d}return l}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),Jr()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getAgentKeys(t){return this.request("GET",`/agents/${encodeURIComponent(t)}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new lb;let Kn=null;const cb='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Yn=null,ts=!1;function el(){ts=!0}function db(){ts=!1}function Au(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function ub(){if(ts)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function G(){Yn=document.activeElement,ts=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function F(){var e;zt(),ts=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Yn&&document.contains(Yn)&&typeof Yn.focus=="function"&&Yn.focus(),Yn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(cb);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function Ge(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),p=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(p),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(p),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),p=setTimeout(o,Math.max(c,500))}),i}function La(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function pb(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function k(e,t){const n=pb(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function zt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Kn&&(document.removeEventListener("keydown",Kn),Kn=null)}function mb(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));zt(),t&&Ge()&&Au()}function ns(e){Kn&&document.removeEventListener("keydown",Kn),Kn=e,e&&document.addEventListener("keydown",e)}function is(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(zt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Te(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Le(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ie(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ie(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function u(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return u(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function fb(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function st(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function ct(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const tl=/^\/api\/avatars\/[0-9a-f]{64}$/;function Cu(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||tl.test(e))}function Vt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Cu(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${u(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Bu(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function Aa(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${u(n)}</span>`}return Bu(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let ce={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const nl=new Set;function he(e,t){if(typeof e=="string"){const n=ce[e];ce[e]=t,Du(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=ce[i];ce[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Du(i,s,a)})}}function dt(e){return nl.add(e),()=>nl.delete(e)}function Du(e,t,n){t!==n&&nl.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const me=()=>ce.currentUser,Tt=e=>he("currentUser",e),C=()=>ce.currentView,ss=e=>he("currentView",e),X=()=>ce.issues,Je=e=>he("issues",e),as=()=>ce.detailNavContext,Lt=e=>he("detailNavContext",e),il=()=>ce.labels,os=e=>he("labels",e),Mu=()=>ce.activeFilterCategory,gb=e=>he("activeFilterCategory",e),Ru=()=>ce.selectedIssueIndex,Tn=e=>he("selectedIssueIndex",e),hb=()=>ce.selectedDocIndex,ju=e=>he("selectedDocIndex",e),Pu=()=>ce.selectedBoardIndex,Ca=e=>he("selectedBoardIndex",e),vb=()=>ce.selectedInboxIndex,Ba=e=>he("selectedInboxIndex",e),bb=()=>ce.selectedSprintIndex,qu=e=>he("selectedSprintIndex",e),yb=()=>ce.selectedEpicIndex,sl=e=>he("selectedEpicIndex",e),wb=()=>ce.pendingGates,$b=e=>he("pendingGates",e),ve=()=>ce.inboxEntries,Wt=e=>he("inboxEntries",e),Da=()=>ce.inboxUnreadCount,rs=e=>he("inboxUnreadCount",e),kb=()=>ce.searchDebounceTimer,_b=e=>he("searchDebounceTimer",e),Eb=()=>ce.websocket,al=e=>he("websocket",e),A=()=>ce.currentTeam,Qn=e=>he("currentTeam",e),Y=()=>ce.currentProject,yt=e=>he("currentProject",e||null),_e=()=>ce.currentDetailIssue,Zn=e=>he("currentDetailIssue",e),xb=()=>ce.currentDetailSprints,Nu=e=>he("currentDetailSprints",e),ol={};function se(e){Object.assign(ol,e)}function Ib(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=ol[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Ou=!1;function Sb(){if(!Ou){Ou=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Ib);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=ol[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const rl=["backlog","todo","in_progress","in_review","done","canceled"],ls=["backlog","todo","in_progress","in_review"],Hu=["urgent","high","medium","low","no_priority"],ll=["no_priority","urgent","high","medium","low"],Fu=["backlog","todo","in_progress","in_review","done"],Ma="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function V({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${u(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${u(t)}</h3>
            <p>${u(n)}</p>
            ${a}
        </div>
    `}const U={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},Uu=24,et=new Map,we=new Map,wt=new Map;let Kt=null;function Tb(e){return Array.isArray(e)?[...e].map(String).sort():e}function Gu(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Tb(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function Ra(e,t){for(we.delete(e),we.set(e,t);we.size>Uu;){const n=we.keys().next().value;we.delete(n)}zu()}function zu(){if(et.size===0)return;const e=new Set;we.forEach(t=>t.ids.forEach(n=>e.add(n))),et.forEach((t,n)=>{e.has(n)||et.delete(n)})}function Lb(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function Vu(e){const t=we.get(e);return t?(Ra(e,t),t.ids.map(n=>et.get(n)).filter(Boolean)):null}function cl(e){return et.get(e)}function Ab(e){var t;return((t=we.get(e))==null?void 0:t.meta)||{}}function Wu(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function dl(e){const t=et.get(e.id);if(!Wu(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){et.set(e.id,{...e,description:t.description});return}et.set(e.id,e)}}const ul=new Set;function Cb(e){return ul.add(e),()=>ul.delete(e)}function Ku(e,t,n){if(!Array.isArray(t))return;const i=Lb(t);i.forEach(dl);const s=we.get(e);Ra(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}}),ul.forEach(a=>{try{a(e)}catch(o){console.error(o)}})}function Bb(e,t){const n=we.get(e);n&&(n.meta=t)}function ja(e){e!=null&&e.id&&et.has(e.id)&&dl(e)}function Db(e){we.delete(e),wt.forEach((t,n)=>{t===e&&wt.delete(n)}),Kt===e&&(Kt=null),zu()}function Mb(e){et.delete(e),we.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function Pa(e){Kt=e}function Rb(){return Kt}function Yu(e,t){for(wt.delete(e),wt.set(e,t);wt.size>Uu;)wt.delete(wt.keys().next().value)}function jb(e){const t=wt.get(e);return t&&we.has(t)?t:null}function Pb({maxQueries:e=3}={}){const t=[...we.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(a=>i.add(a))),{queries:t.map(([s,a])=>[s,{ids:[...a.ids],meta:a.meta||{}}]),entities:[...i].map(s=>et.get(s)).filter(Boolean),views:[...wt.entries()].filter(([,s])=>n.has(s))}}function qb(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{we.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&dl(t.get(s))}),Ra(n,{ids:i.ids.filter(s=>et.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!wt.has(n)&&we.has(i)&&Yu(n,i)})}function Qu(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function Zu(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(Qu(e[n])!==Qu(t[n]))return!1;return!0}const Xu=["status","priority"],Ju=["assignee_id","sprint_id","issue_type"],Nb={assignee_id:"unassigned",sprint_id:"no_sprint"},Ob=["scope","project_id","sort_by","order","limit"],Ln=e=>(e||[]).map(t=>String(t).toLowerCase());function Hb(e,t){if(e.search||t.search||t.sort_by==="random"||Ob.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Xu)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of Ju)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=Ln(e.label);if(!Ln(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=Ln(t.exclude_label);if(!Ln(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function ep(e){const t=e.label===void 0?null:Ln(e.label),n=e.exclude_label===void 0?null:Ln(e.exclude_label);return i=>{for(const s of Xu)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of Ju){if(e[s]===void 0)continue;const a=e[s]===Nb[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=Ln((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function Fb(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(Gu(e)));let n=null,i=null;if(we.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}Hb(c,t)&&(n=r,i=l)}),!n)return null;Ra(i,n);const s=ep(t),a=n.ids.map(r=>et.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function Ub(){et.clear(),we.clear(),wt.clear(),Kt=null}dt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Ub();return}if(e!=="issues"||Kt===null||!we.has(Kt)||C()!=="issues")return;const i=we.get(Kt);Ku(Kt,X(),i.meta)});let pl=[];function Gb(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function zb(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function cs(e,t){const n=e().map(Gb),i=t().map(zb);pl=[...n,...i]}function $t(e){return e&&pl.find(t=>t.id===e)||null}function ut(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function qa(e,t=!1){const n=u(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${u(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function ds({includeIdle:e=!1,keepId:t=null}={}){const n=pl.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),a=n.filter(b=>b.is_agent),o=new Set(a.map(b=>b.id)),r=(b,y)=>b.name.localeCompare(y.name),l=b=>b.registered_by_id&&o.has(b.registered_by_id),c=new Map,d=new Map;a.forEach(b=>{const[y,_]=l(b)?[c,b.registered_by_id]:[d,b.parent_user_id];y.has(_)||y.set(_,[]),y.get(_).push(b)});const p=[],f=(b,y)=>{p.push({assignee:b,indent:y}),(c.get(b.id)||[]).sort(r).forEach(E=>p.push({assignee:E,indent:2}))};return i.forEach(b=>{p.push({assignee:b,indent:!1}),(d.get(b.id)||[]).sort(r).forEach(y=>f(y,!0))}),a.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>f(b,!1)),p}function Xn({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ds({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${m(s.id)}">${qa(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Vb(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&$t(e)&&Xn({keepId:e}),t.value=e}let At=[],ml=[],Na=-1,fl=null;const tp=5,Wb=new Set(["done","canceled"]),np=new Set;function Kb(){return Na}function Yb(e){Na=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;fl=(t==null?void 0:t.dataset.issueId)??null}const ip=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function sp(e){const t=new Set(ip.map(s=>s.status)),n=ip.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}dt(e=>{e==="currentProject"&&C()==="my-issues"&&(Jn(),us(),ei())});function ze(){return At}function An(e){At=e}let gl=0;async function Jn(){var a;const e=A(),t=me();if(!e||!t)return;const n=++gl,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=Y();Zb();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==gl)return;At=sp(r).flatMap(l=>l.issues),C()==="my-issues"&&Lt(At),Cn()}catch(o){if(n!==gl)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=V({icon:U.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),k("load issues",o)}}async function ei({showLoading:e=!0}={}){const t=A();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=Y();ml=await h.getTeamActivities(t.id,0,10,{projectId:i}),Qb()}catch{n&&(n.innerHTML=V({icon:U.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function Qb(){const e=document.getElementById("dashboard-activity-list");if(e){if(!ml.length){e.innerHTML=V({icon:U.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=ml.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${u(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${u(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${u(t.document_title)}</strong>`);const i=Zl(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${Cm(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Jl(t)}${n}</span>
                <span class="activity-actor">by ${u(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${st(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function Zb(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function ap(){Jn()}function Cn(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=sp(At);At=t.flatMap(l=>l.issues),C()==="my-issues"&&Lt(At),Na=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=At.length?String(At.length):""),At.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=Wb.has(l.status)&&!np.has(l.status)&&l.issues.length>tp,d=c?l.issues.slice(0,tp):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${u(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(p=>ci(p)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(fl){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===fl);c!==-1&&(l[c].classList.add("keyboard-selected"),Na=c)}}let hl=0,Oa=[],op=null;async function us(){var o;const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++hl,n=Y(),i=`${((o=A())==null?void 0:o.id)??""}:${n??""}`;i!==op&&(op=i,ps=!1),Oa=[];const s=te(),a=n?s.filter(r=>r.id===n):s;if(!a.length){e.innerHTML="";return}try{const r=a.map(async c=>{try{const d=await h.getCurrentSprint(c.id);if(!d)return null;let p={},f=!1;if(!n)return{project:c,sprint:d,statusCounts:p};try{const g=await h.getIssues({sprint_id:d.id,project_id:c.id,limit:500});for(const b of g)p[b.status]=(p[b.status]||0)+1}catch(g){console.error(`Failed to load issue counts for sprint ${d.id}:`,g),f=!0}return{project:c,sprint:d,statusCounts:p,countsFailed:f}}catch(d){return console.error(`Failed to load current sprint for project ${c.id}:`,d),null}}),l=(await Promise.all(r)).filter(Boolean);if(t!==hl)return;Oa=l,pp(l,{single:!!n})}catch(r){if(t!==hl)return;console.error("Failed to load sprint status:",r),e.innerHTML=V({icon:U.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const rp=5;let ps=!1;const lp=["done","in_review","in_progress","todo","backlog"];function Ha(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,a=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,o=e.limbo?"limbo":s?"arrears":n&&a>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:a,state:o}}function Xb(e){const t=({sprint:n})=>{const i=Ha(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function Jb(e){if(!e.activated_at)return null;const t=Date.now()-new Date(e.activated_at);return Number.isFinite(t)?Math.max(0,Math.floor(t/864e5))+1:null}function ey(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function ty(e,t){return e.limbo?'<span class="badge badge-warning" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="badge badge-danger" title="Over budget: close the sprint to keep working">Arrears</span>':""}const ny={near:"is-near",arrears:"is-over",limbo:"is-limbo"};function cp(e){return ny[e.state]||""}function dp(e){return`<span class="meter ${cp(e)}" aria-hidden="true"><span class="meter-fill" style="width: ${e.pct}%"></span></span>`}function iy(e,t){return e.limbo?"in limbo":t.overBudget?"in arrears":t.state==="near"?"nearly spent":""}function up(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function sy({sprint:e,statusCounts:t,countsFailed:n}){const i=Ha(e),s=t||{},a=Object.values(s).reduce((d,p)=>d+p,0),o=Jb(e),r=n?"Issue counts unavailable":a?`${a} issue${a===1?"":"s"}`:"No issues planned",l=[o?`Day ${o}`:"",r].filter(Boolean).join(" · ");let c="";return e.limbo?c="Closed and waiting on sprint rituals before the next sprint starts.":i.overBudget&&(c="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${i.state}" ${up(e)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${u(e.name)}</span>
                ${ty(e,i)}
                <span class="sprint-focus-meta">${u(l)}</span>
            </span>
            <span class="sprint-focus-headline">${ey(i)}</span>
            ${i.hasBudget?dp(i):""}
            ${a?`
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${lp.filter(d=>s[d]).map(d=>`<span class="sprint-stacked-segment status-${d}" style="width: ${s[d]/a*100}%"></span>`).join("")}
                    </span>
                    <span class="sprint-status-counts">
                        ${lp.filter(d=>s[d]).map(d=>`<span class="sprint-count-label status-${d}">${s[d]} ${Te(d)}</span>`).join("")}
                    </span>
                </span>
            `:""}
            ${c?`<span class="sprint-focus-note ${i.state}">${c}</span>`:""}
        </button>
    `}function ay({project:e,sprint:t}){const n=Ha(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=iy(t,n),a=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${s?`, ${s}`:""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${up(t)} title="${m(a)}">
                <span class="state-dot ${cp(n)}" aria-hidden="true"></span>
                <span class="sprint-row-project">${u(e.name)}</span>
                <span class="sprint-row-sprint">${u(t.name)}</span>
                ${n.hasBudget?dp(n):'<span class="sprint-row-nometer" aria-hidden="true"></span>'}
                <span class="meter-label">${i}<span class="sprint-row-unit"> pts</span>${n.hasBudget?"":'<span class="sr-only">, no budget</span>'}</span>
                ${s?`<span class="sr-only">, ${s}</span>`:""}
            </button>
        </li>
    `}function pp(e,{single:t=e.length===1&&!!Y()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${sy(e[0])}
        `;return}const i=Xb(e),s=i.filter(({sprint:d})=>d.limbo).length,a=i.filter(({sprint:d})=>!d.limbo&&Ha(d).overBudget).length,o=[a?`${a} in arrears`:"",s?`${s} in limbo`:""].filter(Boolean).join(" · "),r=i.length>rp,l=ps?i:i.slice(0,rp),c=i.length-l.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${o?`<span class="sprint-attention">${o}</span>`:""}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${l.map(ay).join("")}
        </ul>
        ${r?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${ps}" aria-controls="dashboard-sprint-rows">${c>0?`Show all ${i.length}`:"Show fewer"}</button>`:""}
    `}se({"filter-my-issues":()=>ap(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Mo(t.identifier)},"retry-load-my-issues":()=>Jn(),"dash-show-all":(e,t)=>{np.add(t.status),Cn()},"retry-load-sprint-status":()=>us(),"dash-sprints-toggle":()=>{var e;Oa.length&&(ps=!ps,pp(Oa,{single:!1}),(e=document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]'))==null||e.focus())}});const mp=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function ms(e=null){const t=e||Y()||"";Mp([]);const n=te().map(o=>`
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
                                ${mp.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,G(),Wa();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Yv();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{Su(i.value,s.value)}),s.addEventListener("input",()=>{Su(i.value,s.value)}),i.focus()}function oy(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function ry(e){const t=mp.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function fp(e,t){const n=te().find(i=>i.id===t);Mp([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
    `,G(),Wa(),document.getElementById("create-issue-title").focus()}async function ly(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Dp(),parent_id:e});F(),$(`Created sub-issue ${d.identifier}`,"success"),le(e)}catch(d){k("create sub-issue",d)}}async function cy(e,t,n){var o,r;zt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Fu.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${m(Te(c))}">
                    ${Qe(c)}
                    <span>${Te(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${ll.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${m(Le(c))}">
                    ${mt(c)}
                    <span>${Le(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${m(ct(c))}">
                    <span class="issue-type-badge type-${c}">${ct(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!A())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=il(),c=!1;if(l.length===0)try{l=await h.getLabels(A().id),os(l)}catch(d){console.error("Failed to load labels:",d),c=!0}wl(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),is(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=ds({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:p})=>{const f=ut(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(d.id)}" data-label="${m(f)}">
                    ${Vt(d,"avatar-small")}
                    <span>${qa(d,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=yi(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(p=>{const f=p.value===null?"":String(p.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${m(f)}" data-label="${m(p.value?p.label:"Estimate")}">
                    <span>${u(p.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const p=(await h.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
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
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),is(a)}function dy(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function uy(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,el();const i=u(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Qe(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${mt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${ct(t)}</span><span id="create-issue-type-label">${i}</span>`)}zt(),s==null||s.focus()}async function gp({keepOpen:e=!1}={}){var y,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,p=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const E=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:Dp(),due_date:f});$(`Created ${E.identifier}`,"success"),Qv(),C()==="issues"?Bt():C()==="my-issues"&&Jn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",db(),document.getElementById("create-issue-title").focus()):(F(),le(E.id))}catch(E){k("create issue",E)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function py(){await gp({keepOpen:!1})}async function my(){await gp({keepOpen:!0})}se({"toggle-create-dropdown":(e,t,n)=>{cy(t.dropdownType,e,n)},"set-create-field":(e,t)=>{uy(t.field,t.value,t.label)},"create-issue-submit":()=>{py()},"create-issue-and-new":()=>{my()},"update-create-project":()=>{dy()},"apply-template":e=>{ry(e.target.value)},"toggle-create-options":()=>{oy()},"create-sub-issue-submit":(e,t)=>{ly(t.parentId,t.projectId)}});function fs(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&($(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(fy(n,e.project_id),t=!0),t}function fy(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,G())}async function gy(e,t){try{const n=await h.updateIssue(e,{status:"done"});F(),$(`${t} closed`,"success"),fs(n)}catch(n){k(`close ${t}`,n)}}se({"parent-prompt-dismiss":()=>F(),"parent-prompt-close":(e,t)=>gy(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{F(),fp(t.parentId,t.projectId)}});function rn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Bn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Dn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Mn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Fa(){const e=document.getElementById("group-by-select");return e?e.value:""}const hp=[{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],vl=["done","canceled"],hy=ls,vy="all";function vp(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function ti(e=rn()){return e.length===0?"all":vp(e,ls)?"open":vp(e,vl)?"closed":null}function bp(e){var t,n,i;switch(e){case"status":{const s=ti();return s==="all"?0:s?1:rn().length}case"priority":return Bn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Dn().length;case"exclude_labels":return Mn().length;default:return 0}}function bl(){let e=0;return hp.forEach(t=>{e+=bp(t.key)}),e}function yp(){var b,y,_,E,S,L;const e=new URLSearchParams,t=rn(),n=Bn(),i=Dn(),s=Mn(),a=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,o=Y()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=(_=document.getElementById("issue-type-filter"))==null?void 0:_.value,c=(E=document.getElementById("group-by-select"))==null?void 0:E.value,d=(S=document.getElementById("sort-by-select"))==null?void 0:S.value,p=ti(t);p==="all"?e.append("status",vy):p!=="open"&&t.forEach(j=>e.append("status",j)),n.forEach(j=>e.append("priority",j)),i.forEach(j=>e.append("label",j)),s.forEach(j=>e.append("exclude_label",j)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),Wv((L=A())==null?void 0:L.id,f)}function by(e){var _;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(E=>t.has(E))){const E=Vv((_=A())==null?void 0:_.id);if(E){t=new URLSearchParams(E);const S=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",S)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const E=s.length>0?s:hy;a.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.checked=E.includes(L.value)}),a.dataset.statusApplied="true",wp()}const o=t.getAll("priority");if(o.length>0){const E=document.getElementById("priority-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.checked=o.includes(L.value)}),$p())}const r=t.get("assignee");r&&Vb(r);const l=t.get("project"),c=te();l&&(!c.length||c.some(E=>E.id===l))&&(e(!0),yt(l),e(!1));const d=t.get("sprint");if(d){const E=document.getElementById("sprint-filter");E&&(E.value=d)}const p=t.get("issue_type");if(p){const E=document.getElementById("issue-type-filter");E&&(E.value=p)}const f=t.getAll("label");if(f.length>0){const E=document.getElementById("label-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.checked=f.includes(L.value)}),Ua())}const g=t.getAll("exclude_label");if(g.length>0){const E=document.getElementById("exclude-label-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.checked=g.includes(L.value)}),Ga())}const b=t.get("groupBy");if(b){const E=document.getElementById("group-by-select");E&&(E.value=b)}const y=t.get("sort");if(y){const E=document.getElementById("sort-by-select");E&&(E.value=y)}}function wp(){const e=rn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=ti(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Te(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function $p(){const e=Bn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Le(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Ua(){var i,s;const e=Dn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Ga(){var i,s;const e=Mn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function kp(){if(!A())return;let e;try{e=await h.getLabels(A().id)}catch(t){console.error("Failed to load labels for filter:",t);return}_p("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),_p("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function _p(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ie(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${u(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Ep(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function xp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const p=d[1],f=document.createElement("a");f.href=`#/issue/${p}`,f.className="issue-link",f.textContent=p,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+d[3],o.appendChild(p),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function za(e){if(!e)return"";const t=gt(e),n=document.createElement("div");return n.innerHTML=t,Ep(n,xp),n.innerHTML}function Rn(e){if(!e)return"";const t=gt(e),n=document.createElement("div");return n.innerHTML=t,Ep(n,xp),n.innerHTML}const yy={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},Ip=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${u(t)}</span><span class="related-title">${u(n)}</span></a>`;function wy(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const Sp={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function $y(e,t=[],n=[],{formatEstimate:i=null}={}){const s=o=>o.estimate==null?"":` · ${u(i?i(o.estimate,o.project_id||e.project_id):`${o.estimate} pts`)}`,a=[...(t||[]).map(o=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${Qe(o.status)}</span>
                    ${Ip(o.id,o.identifier,o.title)}
                    <span class="related-kind">Sub-issue${s(o)}</span>
                </li>`})),...(n||[]).map(o=>{const r=wy(o);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${Qe(o.related_issue_status)}</span>
                    ${Ip(o.related_issue_id,o.related_issue_identifier,o.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(o.id)}" title="Remove link" aria-label="Remove link to ${m(o.related_issue_identifier)}">${yy.remove}</button>
                </li>`}})].sort((o,r)=>Sp[o.kind]-Sp[r.kind]);return`
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
        </section>`}const ky=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function _y(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${u((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${ky(e.author)}>${u(e.author_name||"User")}</span>
                    <span class="comment-date">${u(st(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${za(e.content).trim()}</div>
            </div>
        </li>`}const Tp=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${za(t).trim()}</div></details>`;function Ey(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let a,o="",r="";return e.activity_type==="ritual_attested"?(a=`Attested <b>${u(e.field_name||"a ritual")}</b>`,i?o=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(o=" · waiting for review"),e.new_value&&(r=Tp("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(a=`Sent back <b>${u(e.field_name||"a ritual")}</b>`,e.new_value&&(r=Tp("Reason",e.new_value,!0))):a=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${a}</span>${o}
                <span class="timeline-meta">· ${u(n(e))} · ${u(st(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function xy(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function Iy({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:a=!1,issueId:o},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...xy(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const b=d.get(g.field_name);(!b||new Date(g.created_at)>new Date(b.created_at))&&d.set(g.field_name,g)}const p=[...(e||[]).map(g=>({at:g.created_at,html:_y(g)})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const b=d.get(g.field_name)===g;return{at:g.created_at,html:Ey(g,{...r,awaitingReview:b,gateShowsIt:b&&g.field_name===i})}})].sort((g,b)=>new Date(g.at)-new Date(b.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${a?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(o)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${p.length?`<ol class="timeline comments-list">${p.map(g=>g.html).join("")}</ol>`:a?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}function Lp(e,t,{formatEstimate:n=null}={}){const i=[`${Qe(e.status)}<span>${u(Te(e.status))}</span>`,u(t||"Unassigned"),u(Le(e.priority)),u(ct(e.issue_type))];return e.estimate!=null&&i.push(u(n?n(e.estimate,e.project_id):`${e.estimate} pts`)),`<div class="issue-meta-line">${i.map(s=>`<span class="issue-meta-part">${s}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`}const Ap=rl,Sy=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let Ct=[],Cp=Promise.resolve();const Ty={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Va(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Ly={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Bp(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function ni(){return!!document.querySelector(".inline-dropdown")}function Dp(){return Ct}function Mp(e){Ct=e}async function yl(e,t,n,i){var p,f,g,b;e.preventDefault(),zt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Ap.map((y,_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${Qe(y)}
                    <span>${Te(y)}</span>
                    <span class="dropdown-shortcut">${_+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${ll.map((y,_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${mt(y)}
                    <span>${Le(y)}</span>
                    <span class="dropdown-shortcut">${_}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Sy.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${ct(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=_e(),_=X().find(S=>S.id===n)||ze().find(S=>S.id===n)||((y==null?void 0:y.id)===n?y:null),E=ds({keepId:(_==null?void 0:_.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${E.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:E.map(({assignee:S,indent:L},j)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(S.id)}">
                    ${Vt(S,"avatar-small")}
                    <span>${qa(S,L)}</span>
                    ${j<9?`<span class="dropdown-shortcut">${j+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),_=(y==null?void 0:y.dataset.projectId)||((p=_e())==null?void 0:p.project_id),E=yi(_);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${E.map((S,L)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${S.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${S.label}</span>
                    ${L<9?`<span class="dropdown-shortcut">${L}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=X(),_=ze(),E=_e(),S=y.find(I=>I.id===n)||_.find(I=>I.id===n)||E,L=new Set(((S==null?void 0:S.labels)||[]).map(I=>I.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let x=a.bottom+4,w=a.left;w+j.width>window.innerWidth-8&&(w=a.right-j.width),x+j.height>window.innerHeight-8&&(x=a.top-j.height-4),o.style.top=`${x}px`,o.style.left=`${Math.max(8,w)}px`,is(o,{multiSelect:!0});let D=[];const H=A();if(H)try{D=await h.getLabels(H.id)}catch(I){console.error("Failed to load labels:",I)}if(!o.parentNode)return;jp(o,n,D,L);const J=o.getBoundingClientRect();let ne=a.bottom+4,Z=a.left;Z+J.width>window.innerWidth-8&&(Z=a.right-J.width),ne+J.height>window.innerHeight-8&&(ne=a.top-J.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,Z)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=X(),_=ze(),E=_e(),S=y.find(M=>M.id===n)||_.find(M=>M.id===n)||E,L=(S==null?void 0:S.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let x=a.bottom+4,w=a.left;w+j.width>window.innerWidth-8&&(w=a.right-j.width),x+j.height>window.innerHeight-8&&(x=a.top-j.height-4),o.style.top=`${x}px`,o.style.left=`${Math.max(8,w)}px`,is(o);let D=[];if(L)try{D=await h.getSprints(L),Ck(L,D)}catch(M){console.error("Failed to load sprints:",M)}if(!o.parentNode)return;const H=D.filter(M=>M.status!=="completed"||M.id===(S==null?void 0:S.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${H.map((M,R)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(M.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${u(M.name)}${M.status==="active"?" (Active)":""}</span>
                    ${R<9?`<span class="dropdown-shortcut">${R+1}</span>`:""}
                </button>
            `).join("")}
        `;const J=o.getBoundingClientRect();let ne=a.bottom+4,Z=a.left;Z+J.width>window.innerWidth-8&&(Z=a.right-J.width),ne+J.height>window.innerHeight-8&&(ne=a.top-J.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,Z)}px`,o.classList.remove("dropdown-positioning");const I=M=>{const R=M.key;if(R==="Escape"||R==="Tab"){zt(),document.removeEventListener("keydown",I),ns(null);return}if(Bp(M,o))return;const ae=parseInt(R);if(isNaN(ae))return;const ge=o.querySelectorAll(".dropdown-option");let ot=!1;ae===0?(ii(n,"sprint_id",null),ot=!0):ae>=1&&ae<ge.length&&(ge[ae].click(),ot=!0),ot&&(document.removeEventListener("keydown",I),ns(null))};ns(I),document.addEventListener("keydown",I),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=y=>{const _=y.key;if(_==="Escape"||_==="Tab"){zt(),document.removeEventListener("keydown",d);return}if(Bp(y,o))return;const E=parseInt(_);if(isNaN(E))return;let S=!1;if(t==="status"&&E>=1&&E<=6)ii(n,"status",Ap[E-1]),S=!0;else if(t==="priority"&&E>=0&&E<=4)ii(n,"priority",ll[E]),S=!0;else if(t==="estimate"){const L=_e(),j=yi(L==null?void 0:L.project_id);E>=0&&E<j.length&&(ii(n,"estimate",j[E].value),S=!0)}S&&(document.removeEventListener("keydown",d),ns(null))};ns(d),document.addEventListener("keydown",d),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),is(o)}function Ay(e,t,n,i){yl(e,t,n,i)}function Cy(e,t,n){Cp=Cp.then(()=>Rp(e,t,n))}async function Rp(e,t,n){const i=X(),s=ze(),a=_e(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await h.updateIssue(e,{label_ids:c}),p=d.labels||[],f=S=>({...S,labels:p,updated_at:d.updated_at??S.updated_at}),g=X();g.some(S=>S.id===e)&&Je(g.map(S=>S.id===e?f(S):S));const b=ze();b.some(S=>S.id===e)&&An(b.map(S=>S.id===e?f(S):S));const y=_e();(y==null?void 0:y.id)===e&&Zn(f(y));const _=Va(e);if(_&&_.parentNode){const S=X().find(L=>L.id===e)||ze().find(L=>L.id===e);S&&(_.outerHTML=ci(S))}const E=document.querySelector(".property-labels-btn");E&&(E.innerHTML=p.length>0?p.map(S=>`
                    <span class="issue-label" style="background: ${ie(S.color)}20; color: ${ie(S.color)}">${u(S.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(k("update labels",d),n){const p=l>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function jp(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${m(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${m(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${m(t)}" data-label-id="${m(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${ie(s.color)}20; color: ${ie(s.color)}">${u(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Pp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=A();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);os(o),a!=null&&a.id&&await Rp(e,a.id,null);const r=X(),l=ze(),c=_e(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,p=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&jp(t,e,o,p),n.value=""}catch(a){k("create label",a)}finally{n.disabled=!1,n.focus()}}}function Wa(){const e=document.getElementById("create-issue-labels-label");e&&(Ct.length===0?e.textContent="Labels":e.textContent=`Labels (${Ct.length})`)}function wl(e,{failed:t=!1}={}){const n=il();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=Ct.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${m(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${ie(i.color)}20; color: ${ie(i.color)}">${u(i.name)}</span>
                </button>
            `}).join("")}
    `}function By(e){const t=Ct.indexOf(e);t>=0?Ct.splice(t,1):Ct.push(e),el(),Wa();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&wl(n)}async function qp(){const e=A();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);os(a),s!=null&&s.id&&!Ct.includes(s.id)&&(Ct.push(s.id),el()),Wa(),t&&wl(t),n.value=""}catch(s){k("create label",s)}finally{n.disabled=!1,n.focus()}}}async function ii(e,t,n){var r;zt();const i=jy(e,t,n),s=Ny(e,t),a=(r=cl(e))==null?void 0:r[t],o=Op(e,t,()=>n);o&&$l(e,t,{focus:!0});try{const l={};l[t]=n;const c=await h.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(fs(c),Np(e,t,i)){const d={...c,...qy(e,t)};Oy(e,{issue:d,myIssue:d,detail:d}),ja(d),$l(e,t,{focus:!o})}}catch(l){if(k("update issue",l),Np(e,t,i)){Op(e,t,(d,p)=>d[t]===n?s[p]:d[t]);const c=cl(e);c&&c[t]===n&&ja({...c,[t]:a}),$l(e,t,{focus:!1})}return}finally{Py(e,t,i)}if($("Issue updated","success"),t==="status")try{const l=Y();if(l){const d=(await h.getSprints(l)).find(p=>p.status==="active");kl(d||null)}}catch{}}const Dy=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),ln=new Map;function My(e){const t=e&&ln.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let Ry=0;function jy(e,t,n){const i=++Ry;return ln.has(e)||ln.set(e,new Map),ln.get(e).set(t,{seq:i,value:n}),i}function Np(e,t,n){var i,s;return((s=(i=ln.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Py(e,t,n){var s;const i=ln.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&ln.delete(e))}function qy(e,t){var i;const n={};return(i=ln.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function Ny(e,t){var i,s;const n=_e();return{issue:(i=X().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=ze().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function Op(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=X();a.some(l=>l.id===e)&&(s=!0,Je(a.map(l=>l.id===e?i(l,"issue"):l)));const o=ze();o.some(l=>l.id===e)&&(s=!0,An(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=_e();return(r==null?void 0:r.id)===e&&(s=!0,Zn(i(r,"detail"))),s}function Oy(e,t){var s;const n=X();t.issue&&n.some(a=>a.id===e)&&Je(n.map(a=>a.id===e?t.issue:a));const i=ze();t.myIssue&&i.some(a=>a.id===e)&&An(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=_e())==null?void 0:s.id)===e&&Zn(t.detail)}function Hy(e){return e==="estimate"||Ty[Fa()]===e}function Fy(e,t,n,{focus:i}){var d;const s=Va(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&Hy(t)&&X().some(p=>p.id===e))pt();else if(t==="status"&&s.closest("#my-issues-list"))Cn();else{const p=s.classList.contains("keyboard-selected");s.outerHTML=ci(n),p&&((d=Va(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=Va(e),l=Ly[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function $l(e,t,{focus:n}){const i=X().find(a=>a.id===e)||ze().find(a=>a.id===e);i&&ja(i),Fy(e,t,i,{focus:n});const s=_e();(s==null?void 0:s.id)===e&&Dy.has(t)&&Uy(t,s)}function Uy(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".issue-meta-line");if(i){const c=t.assignee_id?$t(t.assignee_id):null;i.outerHTML=Lp(t,c?ut(c):null,{formatEstimate:gn})}const s=n.querySelector(".detail-sidebar");if(!s)return;let a=e;e==="assignee_id"&&(a="assignee"),e==="sprint_id"&&(a="sprint"),e==="issue_type"&&(a="type");const o=s.querySelectorAll(".property-row");let r=null;for(const c of o){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===a.toLowerCase()){r=c;break}}if(!r)return;const l=r.querySelector(".property-value");if(l){if(e==="status")l.innerHTML=`
            ${Qe(t.status)}
            <span>${Te(t.status)}</span>
        `;else if(e==="priority")l.innerHTML=`
            ${mt(t.priority)}
            <span>${Le(t.priority)}</span>
        `;else if(e==="issue_type")l.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${ct(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?$t(t.assignee_id):null,d=c?ut(c):null;l.innerHTML=d?`${Vt(c,"avatar-small")}<span>${u(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=xb(),d=t.sprint_id&&c?c.find(p=>p.id===t.sprint_id):null;l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?u(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${gn(t.estimate,t.project_id)}</span>
        `);l.classList.add("updated"),setTimeout(()=>l.classList.remove("updated"),500),l==null||l.focus()}}se({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?ii(t.issueId,i,n==="null"?null:Number(n)):ii(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),Cy(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Pp(t.issueId)},"toggle-create-issue-label":(e,t)=>{By(t.labelId)},"create-label-for-create-issue":()=>{qp()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Pp(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),qp())}});function Ka(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Hp)},0))}function Hp(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Hp))}function Gy(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",si)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Ve(),tt(Mu()),setTimeout(()=>{document.addEventListener("click",si)},0))}function zy(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",si)):(e.classList.remove("hidden"),ew(),setTimeout(()=>{document.addEventListener("click",si)},0))}function si(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",si))}function ai(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",si)}function Ve(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=Y();e.innerHTML=hp.map(n=>{const i=bp(n.key),s=Mu()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function tt(e){gb(e),Ve();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"status":Wy(t);break;case"priority":Ky(t);break;case"type":Yy(t);break;case"assignee":Qy(t);break;case"sprint":Zy(t);break;case"labels":Xy(t);break;case"exclude_labels":Jy(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Vy(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Ve()}function Wy(e){const t=rn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=ti(t);let s=`
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
        `}),e.innerHTML=s}function Ky(e){const t=Bn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function Yy(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Qy(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
        `}),e.innerHTML=i}function Zy(e){if(!Y()){e.innerHTML=`
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
        `}),e.innerHTML=a}function Xy(e){const t=Dn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ie(d)};"></span>
                    <span class="filter-option-label">${u(c)}</span>
                </label>
            `}),e.innerHTML=s}function Jy(e){const t=Mn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ie(d)};"></span>
                    <span class="filter-option-label">${u(c)}</span>
                </label>
            `}),e.innerHTML=s}function ew(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function We(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=rn();if(n.length>0){const d=ti(n),p=d==="open"?"Open":d==="closed"?"Closed":n.map(f=>Te(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Bn();if(i.length>0){const d=i.map(p=>Le(p)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearAction:"clear-priority-filter-new"})}const s=document.getElementById("issue-type-filter");if(s!=null&&s.value){const d=s.options[s.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:s.value,clearAction:"clear-type-filter"})}const a=document.getElementById("assignee-filter");if(a!=null&&a.value){let d;a.value==="me"?d="Me":a.value==="unassigned"?d="Unassigned":d=ut($t(a.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:d,clearAction:"clear-assignee-filter"})}const o=document.getElementById("sprint-filter");if(o!=null&&o.value){const d=o.options[o.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||o.value,clearAction:"clear-sprint-filter"})}const r=Dn();if(r.length>0){const d=document.getElementById("label-filter-dropdown"),p=r.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:p,clearAction:"clear-label-filter-new"})}const l=Mn();if(l.length>0){const d=document.getElementById("exclude-label-filter-dropdown"),p=l.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:p,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(d=>`
        <span class="filter-chip" title="${m(d.label)}: ${m(d.value)}">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${u(d.value)}</span>
            <button class="filter-chip-remove" data-action="${d.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=c}function Ke(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=bl();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Fp(){const e=document.getElementById("sprint-filter");if(!e)return;const t=Y(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",kl(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${u(a.name)})</option>`),Um(t,a==null?void 0:a.id),kl(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${u(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function kl(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${u(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${u(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function tw(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Up=!1;dt(e=>{if(e!=="currentProject"||C()!=="issues"||Up)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Fp(),kp()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Ua(),Ga(),at(),We(),Ke()}).catch(n=>{console.error("Failed to update filters on project switch:",n),at(),We(),Ke()})});function nw(){by(e=>{Up=e})}function Ya(){wp(),at(),We(),Ke()}function Qa(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ya()}function _l(){$p(),at(),We(),Ke()}function El(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),_l()}function xl(){Ua(),at(),We(),Ke()}function Za(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),xl()}function Il(){Ga(),at(),We(),Ke()}function Xa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Il()}function iw(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Gp(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${iw(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let gs=0;function hs(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function zp(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=A())==null?void 0:t.id)||"",project:Y()||"",status:[...rn()].sort(),priority:[...Bn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let cn=null;function sw(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function oi(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function Vp(e,t){oi(!1),Pa(e),Je(t),C()==="issues"&&Lt(t),pt(),cn=e,hs(Ab(e).hiddenClosed||0)}function aw(e,t,{loading:n}){Pa(null),Je(t),C()==="issues"&&Lt(t),pt(),oi(n),cn=e,hs(0)}function Wp(){Pa(null),cn=null,oi(!1),tw(),hs(0)}function ow(){const e=document.getElementById("issues-list");hs(0),e!=null&&e.querySelector(".issue-row")?oi(!0):Wp()}function rw(){const e=jb(zp()),t=e?Vu(e):null;return t?(Tn(-1),Vp(e,t),!0):(Wp(),!1)}function lw(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const p=d&&Wu(d.updated_at,c.updated_at)?d:c;l.push(My(p))}return r.length?[...r,...l]:l}async function Bt(){var _,E,S,L,j,x,w;Tn(-1),sw();const e=++gs;if(!A())return;const t=Y()||"",n=rn(),i=Bn(),s=(_=document.getElementById("assignee-filter"))==null?void 0:_.value,a=(S=(E=document.getElementById("issue-search"))==null?void 0:E.value)==null?void 0:S.trim();if(!t&&te().length===0){cn=null,document.getElementById("issues-list").innerHTML=V({icon:U.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=zp(),r={limit:1e3},l=((L=document.getElementById("sort-by-select"))==null?void 0:L.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(j=me())==null?void 0:j.id:r.assignee_id=s);const p=(x=document.getElementById("sprint-filter"))==null?void 0:x.value;if(p)if(p==="current"){if(t){const D=Bk(t);if(D!==void 0)D&&(r.sprint_id=D);else try{const J=(await h.getSprints(t)).find(ne=>ne.status==="active");Um(t,J==null?void 0:J.id),J&&(r.sprint_id=J.id)}catch(H){console.error("Failed to resolve current sprint:",H)}}}else r.sprint_id=p;const f=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value;f&&(r.issue_type=f),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,b=!1,y=null;try{const D=Gp(Dn(),"label-filter-dropdown");D.length>0&&(r.label=D,r.label_match="any");const H=Gp(Mn(),"exclude-label-filter-dropdown");H.length>0&&(r.exclude_label=H),t&&(r.project_id=t);const J=t||`team:${A().id}`;y=Gu({...r,scope:J});const ne=Vu(y);if(ne)g=!0,cn===y&&Rb()===y&&Zu(X(),ne)||Vp(y,ne);else{const ee=Fb({...r,scope:J});ee&&(ee.complete||ee.rows.length>0)?(b=!0,aw(y,ee.rows,{loading:!ee.complete})):ow()}const Z=ee=>t?h.getIssues(ee):te().length>0?h.getTeamIssues(A().id,ee):Promise.resolve(void 0),I=r.search&&ti(n)==="open"?Z({...r,status:vl}).then(ee=>Array.isArray(ee)?ee.length:0).catch(ee=>(console.error("Failed to count closed search matches:",ee),0)):Promise.resolve(0),M=new Set(X().map(ee=>ee.id)),R=await Z(r);if(Ku(y,R),e!==gs)return;Yu(o,y);const ae=(g||b)&&cn===y,ge=ae?lw(X(),R,M,ep(r)):R,ot=ae&&Zu(X(),ge);Pa(y),Je(ge),C()==="issues"&&Lt(Array.isArray(ge)?ge.filter(ee=>!ee._isOptimistic):ge);const B=[...new Set(ge.map(ee=>ee.project_id).filter(Boolean))],ue=Object.keys(Eo()).length;if(await Fm(B),e!==gs)return;const be=Object.keys(Eo()).length!==ue;(!ot||be)&&pt(),cn=y,oi(!1);const oe=await I;if(Bb(y,{hiddenClosed:oe}),e!==gs)return;hs(oe)}catch(D){if(e!==gs)return;oi(!1);const H=(D==null?void 0:D.status)===403||(D==null?void 0:D.status)===404;if(g&&!H){k("refresh issues",D);return}H&&y&&Db(y),cn=null;const J=document.getElementById("issues-list");J&&(J.innerHTML=V({icon:U.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),k("load issues",D)}}function cw(){clearTimeout(kb()),_b(setTimeout(()=>{Bt()},300))}function at(){yp(),Bt()}async function Kp(){if(yp(),Fa()==="sprint"){const e=X(),t=[...new Set(e.map(n=>n.project_id))];await Fm(t)}pt()}function dw(){We(),Ke()}function uw(e){const t=e==="open"?ls:e==="closed"?vl:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Ya(),Ve(),tt("status")}function pw(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ya()),Ve(),tt("status")}function mw(){Qa(),Ve(),tt("status"),We(),Ke()}function fw(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,_l()),Ve(),tt("priority")}function gw(){El(),Ve(),tt("priority"),We(),Ke()}function Yp(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,at()),Ve(),tt("type"),We(),Ke(),ai()}function hw(){Yp("")}function Qp(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,at()),Ve(),tt("assignee"),We(),Ke(),ai()}function vw(){Qp("")}function Zp(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,at()),Ve(),tt("sprint"),We(),Ke(),ai()}function bw(){Zp("")}function yw(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,xl()),Ve(),tt("labels")}function ww(){Za(),Ve(),tt("labels"),We(),Ke()}function $w(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Il()),Ve(),tt("exclude_labels")}function kw(){Xa(),Ve(),tt("exclude_labels"),We(),Ke()}function _w(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Bt()),ai()}function Ew(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Kp()),ai()}function xw(){Qa(),El();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Za(),Xa(),at(),We(),Ke()}se({"update-label-filter":()=>xl(),"clear-label-filter":()=>Za(),"update-exclude-label-filter":()=>Il(),"clear-exclude-label-filter":()=>Xa(),"show-filter-category":(e,t)=>{var n,i;tt(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Vy();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"clear-status-filter-new":()=>mw(),"set-status-preset":(e,t)=>uw(t.value),"show-all-statuses":()=>Qa(),"toggle-status-option":(e,t)=>pw(t.filterValue,e),"clear-priority-filter-new":()=>gw(),"toggle-priority-option":(e,t)=>fw(t.filterValue,e),"set-type-filter":(e,t)=>Yp(t.value),"clear-type-filter":()=>hw(),"set-assignee-filter":(e,t)=>Qp(t.value),"clear-assignee-filter":()=>vw(),"set-sprint-filter":(e,t)=>Zp(t.value),"clear-sprint-filter":()=>bw(),"clear-label-filter-new":()=>ww(),"toggle-label-option":(e,t)=>yw(t.filterValue,e),"clear-exclude-label-filter-new":()=>kw(),"toggle-exclude-label-option":(e,t)=>$w(t.filterValue,e),"set-sort":(e,t)=>_w(t.value),"set-group-by":(e,t)=>Ew(t.value),"clear-all-filters":()=>xw(),"retry-load-issues":()=>Bt()});const Xp=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function dn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function ri(e){const t=dn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const Iw=60,Sw=150;let Ye=[],vs=1/0,un=null,Ja=null,bs=null;const eo=new Map;let li=null,to=[],ys=null;const Jp=e=>{var t;return`${((t=me())==null?void 0:t.id)??""}|${e}`},Tw=24;function Lw(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(Iw,Math.ceil((e+2*t)/Tw))}function pn(e,t){if(e!==null&&(li!=null&&li.has(String(e))))return to.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,vs));return vs-=n.length,n.length<t.length&&Ye.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>ci(i)).join("")}function em(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function tm(){clearTimeout(un),un=null,Tl++,Ye=[],Ja=null,ys=null,bs=null}function Sl(e=1/0){if(Ye.length===0)return;const t=document.getElementById("issues-list");if(!t||!(bs!=null&&bs.isConnected)){tm();return}const n=new Map(X().map(s=>[s.id,s]));let i=e;for(;Ye.length>0&&i>0;){const s=Ye[0],a=s.ids.slice(0,i),o=em(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>ci(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?Ye.shift():s.ids=s.ids.slice(a.length)}if(ys){const s=ys;no(t,s.issueId)&&(ys=null,om(t,s))}if(Ye.length===0){clearTimeout(un),un=null;const s=Ja;Ja=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&nm(s)}}const Aw=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{un=setTimeout(e,0)}):un=setTimeout(e,16);let Tl=0;function Cw(){if(clearTimeout(un),Ye.length===0)return;const e=++Tl;Aw(function t(){e===Tl&&(Sl(Sw),Ye.length>0&&(un=setTimeout(t,0)))})}function pt(){var d,p;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=Hw(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),tm(),vs=Lw();const o=X();if(o.length===0){const f=(p=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:p.trim(),g=bl()>0,b=f&&f.length>=2;if(g||b){const y=bl(),_=[];b&&_.push(`search "${f}"`),g&&_.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=V({icon:U.issues,heading:"No matching issues",description:`No issues match your ${_.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=V({icon:U.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Tn(-1),vs=1/0;return}const r=Fa();li=eo.get(Jp(r))||null,to=[],r==="status"?Bw(e,o):r==="priority"?Dw(e,o):r==="type"?Mw(e,o):r==="assignee"?Rw(e,o):r==="sprint"?jw(e,o):e.innerHTML=ri(o)+pn(null,o),vs=1/0,bs=e.firstElementChild,Ye.push(...to),to=[];const l=li;li=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&sm(f,!0)}),a.forEach(([f,g])=>{f&&Ow(f,e,g)})),i&&(no(e,i.issueId)?om(e,i):Ye.length>0&&(ys=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Ye.length>0&&!c?Ja=n:nm(n),Cw()}function nm(e){const t=Ru();if(t<0)return;const n=document.querySelectorAll(Ma);if(n.length===0){Tn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Tn(i),n[i].classList.add("keyboard-selected")}function Bw(e,t){const n={};rl.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=ri(t);rl.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
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
        `)}),e.innerHTML=i}function Dw(e,t){const n={};Hu.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=ri(t);Hu.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
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
        `)}),e.innerHTML=i}function Mw(e,t){const n={};Xp.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=ri(t);Xp.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${ct(s)}</span></span>
                    <span class="group-title">${ct(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Rw(e,t){const n={},i="__unassigned__";n[i]=[];const s=ds({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=ri(t);n[i].length>0&&(a+=`
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
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=ut(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${m(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Vt(o,"avatar-small")}</span>
                    <span class="group-title">${u(l)}${u(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${dn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function jw(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=Eo();s.sort((l,c)=>{const d=o[l],p=o[c],f=d?a[d.status]??3:3,g=p?a[p.status]??3:3;return f-g});let r=ri(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],p=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${u(p)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${dn(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(g,c)}
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
        `),e.innerHTML=r}function im(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function no(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function Pw(e,t){const n=em(e,t);if(!n)return;const i=new Map(X().map(s=>[s.id,s]));Ye=Ye.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>ci(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function sm(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function qw(e,t){const n=Array.from(document.querySelectorAll(Ma)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Tn(s)}function am(e,t,n){sm(t,n);const i=Jp(Fa());eo.has(i)||eo.set(i,new Set);const s=eo.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),Pw(e,t.dataset.group)),qw(e,t)}function Nw(e){const t=document.getElementById("issues-list"),n=t&&im(t,e);n&&am(t,n,!n.classList.contains("collapsed"))}function Ow(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=Ye.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:im(t,i.groupKey):(a=no(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||am(t,s,!1))}function Hw(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function om(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=no(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function rm(e,t){if(!e)return"";if(!t)return u(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return u(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${u(i)}<mark class="search-match">${u(s)}</mark>${u(a)}`}function Fw(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=rm(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const Uw=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function ci(e){var f,g,b;const t=e.assignee_id?$t(e.assignee_id):null,n=t?ut(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":Uw.format(i),a=e.estimate!=null?gn(e.estimate,e.project_id):"",o=Do(e.estimate,e.project_id),r=e.sprint_id?Eo()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((b=e.title)==null?void 0:b.toLowerCase().includes(c.toLowerCase())),p=c&&!d?Fw(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${Le(e.priority)}">
                    ${mt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Te(e.status)}">
                    ${Qe(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${ct(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${rm(e.title,c)}${p?` <span class="issue-search-snippet" title="Matched in description">— ${p}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${ie(y.color)}20; color: ${ie(y.color)}">${u(y.name)}</span>
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
    `}function mt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Qe(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}se({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}Nw(t.group)},"show-inline-dropdown":(e,t,n)=>{yl(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),le(t.issueId))}});let di=[];function ft(){return di}function Gw(e){di=Array.isArray(e)?e:[]}function zw(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?Cu(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${u(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Vw(e){var t,n;if(e||(e=(t=A())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=A())==null?void 0:n.id)!==e)return;di=i,cs(Pt,ft),Xn()}catch(i){console.error("Failed to load team agents:",i),k("load team agents",i)}}async function ws(e){var t;if(e||(e=(t=A())==null?void 0:t.id),!!e)try{di=await h.getTeamAgents(e),cs(Pt,ft),Xn(),Ww()}catch(n){k("load agents",n)}}function Ww(){var a;const e=document.getElementById("agents-list");if(!e)return;const t=(a=me())==null?void 0:a.id,n=di.filter(o=>o.parent_user_id===t&&o.kind!=="session");if(n.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No agents yet",description:"Create an agent to give CLI automation its own identity"});return}const i=te(),s=o=>{if(!o)return"Team-wide";const r=i.find(l=>l.id===o);return r?`Project ${r.key}`:"One project"};e.innerHTML=n.map(o=>{const r=m(o.id),l=di.filter(d=>d.registered_by_id===o.id).length,c=[s(o.agent_project_id),o.can_register?`Registrar · ${l} session${l===1?"":"s"}`:null,`Created ${Ie(o.created_at)}`].filter(Boolean).join(" · ");return`
      <a class="list-row-2line agent-link-row" href="/people/${r}" data-action="view-person" data-user-id="${r}">
        <div class="agent-link-avatar" aria-hidden="true">${zw(o)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${u(o.name)}${o.is_active===!1?' <span class="badge badge-neutral">Deactivated</span>':""}</div>
          <div class="list-row-sub">${u(c)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`}).join("")}function Kw(){const e=te();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),G()}function lm(e,t,n=!1){const i=u(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,G()}async function Yw(e){var r,l,c,d;e.preventDefault();const t=(r=A())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let p;s&&a?p=await h.createProjectAgent(a,n,i,o):p=await h.createTeamAgent(t,n,i,o),F(),lm("Agent Created",p.api_key,!!p.can_register),await ws(),io(p.id,{created:!0})}catch(p){k("create agent",p)}return!1}async function Qw(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);lm("New Agent Key",n.key),io(e,{credentials:!0})}catch(n){k("generate agent key",n)}}async function Zw(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),await ws(),io(e)}catch(s){k("change registrar",s)}}function io(e,{deleted:t=!1,created:n=!1,credentials:i=!1}={}){window.dispatchEvent(new CustomEvent("chaotic:agent-changed",{detail:{agentId:e,deleted:t,created:n,credentials:i}}))}function Xw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function Jw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),$("Agent deleted","success"),await ws(),io(e,{deleted:!0})}catch(n){k("delete agent",n)}}se({"create-agent":e=>{Yw(e)},"copy-agent-key":()=>{Xw()},"dismiss-agent-modal":()=>{F(),ws()},"delete-agent":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Jw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Qw(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Zw(t.agentId,t.agentName,t.canRegister!=="true")}});function e$(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function t$(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:e$(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function n$(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function Ll(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var f,g;const p=s.querySelectorAll(".mention-suggestion");p.length!==0&&(a=(d%p.length+p.length)%p.length,p.forEach((b,y)=>b.classList.toggle("highlighted",y===a)),(g=(f=p[a]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const p=i.selectionStart||0,f=i.value.slice(0,p).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(p);i.value=f+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(n$(i.value,d)){o();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const g=f[2].toLowerCase(),b=t$(Pt(),ft(),i.mentionContext||{}).filter(y=>!g||y.handle.includes(g)||y.name.toLowerCase().includes(g)||y.email.toLowerCase().includes(g)).slice(0,6);if(!b.length){o();return}s.innerHTML=b.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${u(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${u(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,_)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r(_))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const p=!s.classList.contains("hidden");if(d.key==="Escape"&&p){d.preventDefault(),d.stopPropagation(),o();return}if(p){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const ui={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function pi(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function $s(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function Al(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function so(e){return $s(e)&&!!Al(e)}function ao(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],a=[];for(const o of n)((pi(o)||$s(o)&&!so(o))&&t?s:a).push(o);return{needsYou:s,waiting:a,done:i,total:n.length+i.length}}function Cl(e,t,n){return e===1?t:n}function ks(e){return pi(e)?"Review":so(e)?"Ask again for":$s(e)?"Sign off on":Al(e)?"Re-attest":"Attest"}function Bl(e,t){return pi(e)?"an admin":$s(e)&&!so(e)?"a person":t||"the assignee"}function i$(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function cm(e,t){return`<div class="ticket-gate-kicker">Waiting on ${u(e)}<span class="ticket-gate-when"> · ${i$(t)}</span></div>`}function s$(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${ui.link}${u(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${ui.link}Linked document</a>`}function dm(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${u(t.attested_by_name||"Someone")} attested ${u(st(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${gt(t.note)}</div>`:""}
            ${s$(t)}
        </div>`:""}function um(e){const t=u(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${u(st(e.rejected_at))}`:"";return`${t} sent it back${n}: “${u(e.note||"")}”`}function pm(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!pi(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${um(t)}</div>`}const mi=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function a$(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${mi(e,t)}>Send back…</button>`;return pi(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${mi(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${mi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function o$(e,t,n){return so(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${mi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":pi(e)||$s(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${mi(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${mi(e,t)}>Attest it yourself</button>`}function mm(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${u(ks(n).toLowerCase())} <b>${u(n.name)}</b>${s}.</div>`}function Dl(e,t){const{needsYou:n,waiting:i,done:s,total:a}=e,o=(l,c,d,p)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${u(d)}</span><span class="ticket-gate-li-who">${u(p)}</span></li>`,r=[...s.map(l=>{var c;return o(ui.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>o(ui.ring,"you",l.name,"waiting on you")),...i.map(l=>o(ui.ring,"",l.name,`waiting on ${Bl(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${a} ${Cl(a,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function r$(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=ao(e,{canAct:t});return n[0]||i[0]||null}function l$(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:a}=ao(e,{canAct:t});if(a===0)return"";const o=i[0]||s[0];return o?`Waiting on ${i.length?"you":Bl(o,n)}: ${ks(o).toLowerCase()} ${o.name}.`:`All ${a} ${Cl(a,"ritual","rituals")} done.`}function c$(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=ao(e,{canAct:n}),{needsYou:a,waiting:o,total:r}=s;if(r===0)return"";if(a.length===0&&o.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${ui.check}</span>
                ${Dl(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${Cl(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(a.length>0){const p=a[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(p.id)}">
                ${cm("you",p)}
                <h2 class="ticket-gate-step">${u(ks(p))} <b>${u(p.name)}</b></h2>
                ${p.prompt?`<div class="ticket-gate-asks markdown-body">${gt(p.prompt)}</div>`:""}
                ${dm(p)}
                ${pm(p)}
                <div class="ticket-gate-actions">${a$(p,t)}</div>
                ${mm([...a.slice(1),...o],"Then")}
                ${Dl(s,i)}
            </section>`}const l=o[0],c=l.attestation?null:Al(l),d=o$(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${cm(Bl(l,i),l)}
            <h2 class="ticket-gate-step">${u(ks(l))} <b>${u(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${um(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${gt(l.prompt)}</div>`:""}
            ${dm(l)}
            ${pm(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${mm(o.slice(1),"After that")}
            ${Dl(s,i)}
        </section>`}function d$(e,{canAct:t=!1}={}){const{needsYou:n}=ao(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${u(ks(i).toLowerCase())} <b>${u(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const oo=new Map;function Ml(){var e;return`${((e=A())==null?void 0:e.id)??""}|${Y()??""}`}function fi(e,t,n){oo.set(e,{key:t,value:n})}function ro(e,t){const n=oo.get(e);return n&&n.key===t?n.value:void 0}function _s(e,...t){for(const n of t)n!==e&&oo.delete(n)}function Rl(){oo.clear()}function lo(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}dt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Rl(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Rl()});let Ae=null,fm=!1,jn=!1,gm="new-comment";function u$(){return Ae||(Ae=document.createElement("div"),Ae.className="quote-tooltip",Ae.setAttribute("role","button"),Ae.setAttribute("tabindex","0"),Ae.setAttribute("aria-label","Quote selection in comment"),Ae.textContent="Quote",Ae.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),co())}),Ae.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Ae.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),co()}),document.body.appendChild(Ae),Ae)}function hm(e,t){const n=u$();n.style.display="flex",jn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!jn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Es(){Ae&&(Ae.style.display="none"),jn=!1}function p$(){return jn}function vm(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function jl(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=vm(t.startContainer),i=vm(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function m$(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function co(e=gm){const t=jl();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=m$(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Es(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function f$(){var i;if(!jl())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return hm(n.left+n.width/2,n.top),!0}function g$(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!jl()){Es();return}hm(t,n)},10)}function bm({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(gm=t,i.addEventListener("mouseup",g$,n?{signal:n}:void 0),fm||(fm=!0,document.addEventListener("mousedown",s=>{jn&&Ae&&!Ae.contains(s.target)&&Es()}),document.addEventListener("selectionchange",()=>{jn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Es()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&jn&&(s.stopImmediatePropagation(),Es())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&f$()})))}function ym(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let mn=[],xs=[],uo=null,de=new Set,gi="list",Pn=!1,Pl=null,po=null,ql=null,Nl=null,wm=null;function $m(e){if(wm!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const Ol=Zv();(Ol==="list"||Ol==="grid")&&(gi=Ol);function km(e){if(e!=="list"&&e!=="grid")return;gi=e,e==="grid"&&Pn&&Hl(),Xv(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Yt()}function _m(){if(gi!=="list")return;Pn=!0,de.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Yt(),vi()}function Hl(){Pn=!1,de.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Yt(),vi()}function h$(){Pl&&clearTimeout(Pl),Pl=setTimeout(()=>{Yt()},300)}function Em(){const e=document.getElementById("doc-search");e&&(e.value=""),Yt()}async function v$(){Em()}function b$(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=[];if(t&&n.push(`<span class="filter-chip">Search: "${u(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n.length>0){let s=n.join(" ");n.length>1&&(s+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=s,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function y$(){return mn}function Yt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";b$(),xs=mn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),xs.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),x$("",gi)}let hi=0;async function w$(){var i;const e=uo||((i=A())==null?void 0:i.id);if(!e)return;const t=++hi,n=Y()||null;try{const s=await h.getDocuments(e,n);if(t!==hi)return;fi("documents",`${e}|${n??""}`,s),mn=s,Yt()}catch(s){if(t!==hi)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=V({icon:U.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",s)}}dt(e=>{e==="currentProject"&&C()==="documents"&&w$()});async function qn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=A())==null?void 0:r.id),!e)return;uo=e,ju(-1);const i=++hi;t===null&&(t=Y()||null);const s=`${e}|${t??""}`,a=n?ro("documents",s):void 0,o=document.getElementById("documents-list");a?(mn=a,Yt()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==hi)return;fi("documents",s,l);const c=a&&lo(mn,l);mn=l;const d=document.getElementById("doc-view-list"),p=document.getElementById("doc-view-grid");d&&p&&(d.classList.toggle("active",gi==="list"),p.classList.toggle("active",gi==="grid")),c||Yt()}catch(l){if(i!==hi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=V({icon:U.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",l)}}function xm(){var t,n;if(C()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=uo||((n=A())==null?void 0:n.id);e&&qn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Im(e){$m(e)&&Ce(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function $$(e,t){$m(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),O("documents"))}function k$(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ie(t.color)}20; color: ${ie(t.color)}">${u(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function _$(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${k$(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${u(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${u(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?u(ym(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${u(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function E$(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ie(r.color)}20; color: ${ie(r.color)}">${u(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?ym(e.content).substring(0,80):"No content",s=Pn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${de.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Pn&&de.has(e.id)?" selected":""}" data-action="${Pn?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
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
  `}function x$(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;de.clear(),vi();const i=xs;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,p=Y(),f=d||p;n.innerHTML=V({icon:f?U.search:U.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?_$:E$,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=te();i.forEach(d=>{let p,f;if(e==="project")if(p=d.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const g=r.find(b=>b.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(p=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:f,docs:[]}),o[p].docs.push(d)});let l="";for(const[d,p]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${u(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function I$(e){de.has(e)?de.delete(e):de.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=de.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",de.has(e)),vi()}function S$(){xs.forEach(e=>de.add(e.id)),xs.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),vi()}function Sm(){de.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),de.clear(),vi()}function vi(){const e=document.getElementById("doc-bulk-actions");e&&(Pn?(e.classList.remove("hidden"),de.size>0?e.innerHTML=`
        <span class="bulk-count">${de.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function T$(){if(de.size===0){$("No documents selected","error");return}const t=te().map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${de.size} Document${de.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${de.size} selected document${de.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,G()}async function L$(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(de);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=mn.find(d=>d.id===l))==null?void 0:o.title)||l)}F(),Sm(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=A())==null?void 0:r.id;return await qn(a),!1}async function A$(){var a,o;if(de.size===0){$("No documents selected","error");return}const e=de.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(de);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=mn.find(c=>c.id===r))==null?void 0:a.title)||r)}Hl(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=A())==null?void 0:o.id;await qn(s)}async function C$(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
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
    `}}function B$(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=ku(e);s&&(i.value=s),i.addEventListener("input",()=>{Sa(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),Ll("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ce(e,t=!0){try{t&&hn();const n=await h.getDocument(e);wm=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await C$(n);let a=null,o=null,r=!1;if(n.project_id){const D=te().find(H=>H.id===n.project_id);if(a=D?D.name:null,n.sprint_id)try{const H=await h.getSprint(n.sprint_id);o=H?H.name:null}catch(H){console.error("Failed to load sprint name:",H),r=!0}}let l=n.content||"";const c=K.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=y$(),p=d.findIndex(w=>w.id===n.id),f=p>0?d[p-1]:null,g=p>=0&&p<d.length-1?d[p+1]:null,b=p>=0,y=C()||"documents",_=n.labels&&n.labels.length>0?n.labels.map(w=>`
          <span class="issue-label" style="background: ${ie(w.color)}20; color: ${ie(w.color)}">
            ${u(w.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(w.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let E='<span class="text-muted">None</span>';try{const w=await h.getDocumentIssues(n.id);w.length>0&&(E=w.map(D=>`
          <div class="linked-item">
            <span class="linked-item-id">${u(D.identifier)}</span>
            <span class="linked-item-title">${u(D.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(D.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(w){console.error("Failed to load linked issues:",w),E=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
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
              <span class="issue-nav-counter">${p+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${g?`data-action="view-document" data-document-id="${m(g.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?u(a)+" ›":""} ${u(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?u(n.icon)+" ":""}${u(n.title)}</h1>

          <div class="document-content markdown-body">${l?Rn(l):'<p class="text-muted">No content</p>'}</div>

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
                ${_}
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
              ${E}
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
    `,po&&po.abort(),po=new AbortController;const{signal:S}=po,L=i.querySelector(".sidebar-overflow-trigger"),j=i.querySelector(".overflow-menu-dropdown");if(L&&j){const w=()=>{j.classList.add("hidden"),L.setAttribute("aria-expanded","false")},D=()=>{const H=j.classList.toggle("hidden");L.setAttribute("aria-expanded",String(!H))};L.addEventListener("click",D,{signal:S}),document.addEventListener("click",H=>{!L.contains(H.target)&&!j.contains(H.target)&&w()},{signal:S}),j.addEventListener("keydown",H=>{H.key==="Escape"&&(w(),L.focus())},{signal:S})}B$(n.id,S,n.project_id||null),bm({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:S}),ql=f?f.id:null,Nl=g?g.id:null;const x=w=>{if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&co("new-doc-comment")){w.preventDefault();return}w.metaKey||w.ctrlKey||w.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(w.key==="ArrowLeft"&&ql?(w.preventDefault(),Ce(ql)):w.key==="ArrowRight"&&Nl&&(w.preventDefault(),Ce(Nl)))};document.addEventListener("keydown",x,{signal:S})}catch(n){k("load document",n)}}async function mo(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${u(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Fl(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${u(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function D$(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?Rn(r):'<span class="text-muted">Nothing to preview.</span>'}}function Ul(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Iu(e);if(o){const l=Kv(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Ta(e,null);return}Ta(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function Tm(){Is=null;const e=te(),t=af()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${u(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Fl("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),Ul("new"),t&&await mo("doc-sprint",t,null,!0)}let Is=null;async function M$(e,t,n){Is=n||null;const s=te().map(a=>`<option value="${m(a.id)}" ${a.id===t?"selected":""}>${u(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${Fl("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),Ul("new"),t&&await mo("doc-sprint",t,e)}async function R$(e){var a;e.preventDefault();const t=(a=A())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),Ta("new",null),await qn(t),F(),$("Document created!","success"),Is){const o=Is;Is=null,o()}}catch(o){k("create document",o)}return!1}let Gl=null,Ss=null,zl=!1;async function Lm(e){try{const t=await h.getDocument(e);Gl=e,Ss={title:t.title||"",content:t.content||""},zl=!1;const i=te().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${u(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${Fl("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,G(),Ul(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await mo("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){k("load document",t)}}async function j$(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&Gl===t&&Ss&&!zl){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==Ss.title||(o.content||"")!==Ss.content))return zl=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),Gl=null,Ss=null;const o=Iu(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&Ta(t,null),F(),await Ce(t),$("Document updated!","success")}catch(o){k("update document",o)}return!1}async function P$(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=A())==null?void 0:t.id;await qn(n),O("documents"),$("Document deleted!","success")}catch(n){k("delete document",n)}}function q$(e,t){mo(e,t)}async function N$(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,G()}async function O$(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=A())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(o.id)}">
        <span class="link-result-id">${u(o.identifier)}</span>
        <span class="link-result-title">${u(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function H$(e,t){try{await h.linkDocumentToIssue(e,t),F(),$("Issue linked!","success"),await Ce(e,!1)}catch(n){k("link issue",n)}}async function F$(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Ce(e,!1)}catch(n){k("unlink issue",n)}}let Vl=!1;async function U$(e,t){if(e.preventDefault(),Vl)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;Vl=!0;try{const s=await h.createDocumentComment(t,i);n.value="",$("Comment added!","success"),La(s),await Ce(t,!1)}catch(s){k("add comment",s)}finally{Vl=!1}return!1}async function G$(e){var n;const t=(n=A())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,G();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ie(a.color)}; color: white;">${u(a.name)}</span>
        ${a.description?`<span class="text-muted">${u(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,G()}catch(i){k("load labels",i)}}async function z$(e,t){try{await h.addLabelToDocument(e,t),F(),$("Label added!","success"),await Ce(e,!1)}catch(n){k("add label",n)}}async function V$(e,t){try{await h.removeLabelFromDocument(e,t),$("Label removed!","success"),await Ce(e,!1)}catch(n){k("remove label",n)}}se({"view-document":(e,t)=>{e.preventDefault(),Ce(t.documentId)},"set-doc-editor-mode":(e,t)=>{D$(t.target,t.mode)},"retry-load-documents":()=>{qn(uo)},"retry-document-comments":(e,t)=>{Ce(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{I$(t.docId)},"clear-doc-search":()=>{Em()},"clear-all-doc-filters":()=>{v$()},"show-bulk-move-modal":()=>{T$()},"bulk-delete-documents":()=>{A$()},"select-all-docs":()=>{S$()},"clear-doc-selection":()=>{Sm()},"exit-selection-mode":()=>{Hl()},"enter-selection-mode":()=>{_m()},"handle-bulk-move":e=>{L$(e)},"unlink-document-issue":(e,t)=>{F$(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{N$(t.documentId)},"add-document-comment":(e,t)=>{U$(e,t.documentId)},"remove-label-from-doc":(e,t)=>{V$(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{G$(t.documentId)},"show-edit-document-modal":(e,t)=>{Lm(t.documentId)},"delete-document":(e,t)=>{P$(t.documentId)},"create-document":e=>{R$(e)},"update-doc-sprint-dropdown":(e,t,n)=>{q$(t.sprintSelect,n.value)},"update-document":(e,t)=>{j$(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{O$(n.value,t.documentId)},"link-to-issue":(e,t)=>{H$(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{z$(t.documentId,t.labelId)}});async function Am(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=yi(t.project_id).map(o=>`
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
        `,G();const a=document.getElementById("edit-issue-description");if(a){const o=es(e);if(o){const r=Eu(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?In(e,r,t.description||""):In(e,null)})}}catch(t){k("load issue",t)}}async function W$(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await h.updateIssue(t,c);es(t)===c.description&&In(t,null),F(),await le(t),$("Issue updated!","success"),fs(d)}catch(n){k("update issue",n)}}async function K$(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Bt(),await ht(),O("issues"),$("Issue deleted!","success")}catch(t){k("delete issue",t)}}se({"update-issue":(e,t)=>{W$(e,t.issueId)}});let Wl=!1,Kl=!1,fo=null,Ts=null,Ls=null,go=null,Yl=!1,ho=null;function Ql(e=null){Yl=!0,e&&(ho=e)}function Cm(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function Zl(e){return e.user_name||e.user_email||"Unknown"}const Xl=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function Jl(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${u(Te(t(e.old_value)))}</strong> to <strong>${u(Te(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${u(Le(t(e.old_value)))}</strong> to <strong>${u(Le(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${u(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${u(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${u(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${Xl(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${Xl(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${Xl(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return u(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue"}}async function As(e){const t=()=>{var i;const n=(i=_e())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;fo=n,ic(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;fo=null,ic(e)}}function Bm(){const e=me();if(!e||e.is_agent)return!1;const t=Pt();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}let Cs=null,ec=!0;function tc(){var a;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!ec;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((a=e.firstElementChild)==null?void 0:a.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function Dm(){Cs&&(Cs.disconnect(),Cs=null),ec=!0,tc()}const Y$=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function Q$(){Dm();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!Y$()||(Cs=new IntersectionObserver(t=>{ec=t[t.length-1].isIntersecting,tc()}),Cs.observe(e))}function Z$(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let nc=null;function ic(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&nc===e,s=document.activeElement,a=!!t&&!!s&&(t.contains(s)||s===document.body),o=fo,r=Bm(),l=_e(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?$t(c.assignee_id):null,p=d?ut(d):(c==null?void 0:c.assignee_name)||null;if(((b,y)=>{b&&(b.innerHTML=y,b.classList.toggle("hidden",y.trim()===""))})(t,o?c$(o,e,{canAct:r,assigneeName:p}):""),t&&(t.dataset.issueId=e),nc=e,n){const b=o?d$(o,{canAct:r}):"";n.innerHTML=b?`<div class="ticket-gate-sticky-bar">${b}</div>`:"",tc()}if(i){const b=document.getElementById("ticket-gate-live");if(b&&(b.textContent=o?l$(o,{canAct:r,assigneeName:p}):""),a&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function vo({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function X$(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&vo({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||vo()},{signal:e})}async function bo(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await le(t.id,!1),!0):(O("my-issues",!1),!1)}catch{return O("my-issues",!1),!1}}function sc(e){const t=as(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function ac({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function J$(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=_e();if(!t)return;const n=sc(t.id);Ts=n.prevIssue?n.prevIssue.id:null,Ls=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=ac(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}dt(e=>{e==="detailNavContext"&&J$()});let Bs=0;const Mm=500;function ek(){Bs++}let Rm=0,yo=!1;function jm(){if(document.querySelector(".description-inline-editor"))return"editor";if(ni())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)")||e!=null&&e.querySelector("details.related-add[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||yo?"transient":null}function Pm(e){return Ql(),e==="editor"?"deferred":"retry"}function tk(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=_e())==null?void 0:n.id)===e}function nk(e){return X().find(t=>t.id===e)||cl(e)||as().find(t=>t.id===e)||null}function ik(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Dm(),nc=null,Zn(e);const i=sc(e.id);Ts=i.prevIssue?i.prevIssue.id:null,Ls=i.nextIssue?i.nextIssue.id:null;const s=te().find(r=>r.id===e.project_id),a=e.assignee_id?$t(e.assignee_id):null,o=C()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${ac(i)}
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
            </div>`}async function le(e,t=!0,{refresh:n=!1}={}){var a;const i=n?Bs:++Bs,s=++Rm;if(n){const o=jm();if(o)return Pm(o)}try{t&&hn();let o=!1;if(!n){const B=nk(e);B&&(ik(B),t&&(history.pushState({issueId:e,view:C()},"",`/issue/${B.identifier}`),o=!0))}let r=!1;const[l,c,d,p,f,g]=await Promise.all([h.getIssue(e),h.getComments(e).catch(B=>(console.error("Failed to load comments:",B),r=!0,[])),h.getActivities(e,0,Mm),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),b=[...c].sort((B,ue)=>new Date(B.created_at)-new Date(ue.created_at)),y=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(B=>(console.error("Failed to load sprints:",B),[]))],[_,E]=await Promise.all(y);if(i!==Bs)return"dropped";let S=null,L=null;if(n){if(s!==Rm||!tk(e))return"dropped";const B=jm();if(B)return Pm(B);L=window.scrollY;const ue=document.activeElement;ue!=null&&ue.id&&document.getElementById("issue-detail-view").contains(ue)&&(S={id:ue.id,start:ue.selectionStart,end:ue.selectionEnd})}fo=g,t&&!o&&history.pushState({issueId:e,view:C()},"",`/issue/${l.identifier}`),Zn(l),Nu(E),Yl=!1,ho=null,document.querySelectorAll(".view").forEach(B=>B.classList.add("hidden"));const j=document.getElementById("issue-detail-view");j.classList.remove("hidden");const x=C()||"my-issues",w=te().find(B=>B.id===l.project_id),D=l.assignee_id?$t(l.assignee_id):null,H=D?ut(D):null,J=l.sprint_id?E.find(B=>B.id===l.sprint_id):null,ne=sc(l.id),{prevIssue:Z,nextIssue:I}=ne;j.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(x)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${ac(ne)}
                        <span class="issue-detail-breadcrumb">${w?u(w.name):"Project"} › ${u(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(l.title)}</h1>
                    ${Lp(l,H,{formatEstimate:gn})}

                    ${_?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(_.identifier)}" data-action="navigate-issue" data-issue-id="${m(_.id)}" data-identifier="${m(_.identifier)}">${_.identifier}: ${u(_.title)}</a>
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
                            ${l.description?Rn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${$y(l,p,f,{formatEstimate:gn})}

                    ${Iy({comments:b,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((a=r$(g,{canAct:Bm()}))==null?void 0:a.name)||null,activitiesTruncated:d.length>=Mm},{formatText:Jl,formatActor:Zl})}

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
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${ct(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${H?`${Vt(D,"avatar-small")}<span>${u(H)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${m(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${J?u(J.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${m(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(B=>`
                                        <span class="issue-label" style="background: ${ie(B.color)}20; color: ${ie(B.color)}">${u(B.name)}</span>
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
                            <button class="property-value${Do(l.estimate,l.project_id)?" out-of-scale":""}" ${Do(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
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
        `,go&&go.abort(),go=new AbortController;const{signal:M}=go,R=document.querySelector(".sidebar-overflow-trigger"),ae=document.querySelector(".overflow-menu-dropdown");if(R&&ae){const B=()=>{ae.classList.add("hidden"),R.setAttribute("aria-expanded","false")},ue=()=>{const be=ae.classList.toggle("hidden");R.setAttribute("aria-expanded",String(!be))};R.addEventListener("click",ue,{signal:M}),document.addEventListener("click",be=>{!R.contains(be.target)&&!ae.contains(be.target)&&B()},{signal:M}),ae.addEventListener("keydown",be=>{be.key==="Escape"&&(be.stopPropagation(),B(),R.focus())},{signal:M})}Q$(),ic(l.id),Ll("new-comment","mention-suggestions",{projectId:l.project_id}),bm({signal:M}),X$(M);const ge=document.getElementById("new-comment");if(yo=!1,ge){ge.addEventListener("compositionstart",()=>{yo=!0},{signal:M}),ge.addEventListener("compositionend",()=>{yo=!1},{signal:M});const B=ku(l.id);B&&(ge.value=B),ge.addEventListener("input",()=>{Sa(l.id,ge.value)}),ge.addEventListener("keydown",ue=>{var be;ue.key==="Enter"&&(ue.metaKey||ue.ctrlKey)&&(ue.preventDefault(),(be=ge.closest("form"))==null||be.requestSubmit())})}Ts=Z?Z.id:null,Ls=I?I.id:null;const ot=B=>{var oe;if((B.metaKey||B.ctrlKey)&&B.shiftKey&&(B.key===">"||B.key==="."||B.code==="Period")&&co()){B.preventDefault();return}if(B.metaKey||B.ctrlKey||B.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||B.target.tagName==="INPUT"||B.target.tagName==="TEXTAREA"||B.target.tagName==="SELECT"||B.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||ni())return;if(B.key==="ArrowLeft"&&Ts)B.preventDefault(),le(Ts);else if(B.key==="ArrowRight"&&Ls)B.preventDefault(),le(Ls);else if(B.key==="c"){B.preventDefault(),B.stopImmediatePropagation();const ee=document.getElementById("new-comment");ee&&(ee.focus(),ee.scrollIntoView({behavior:"smooth",block:"nearest"}))}else B.key==="j"?(B.preventDefault(),B.stopImmediatePropagation(),wo(1)):B.key==="k"?(B.preventDefault(),B.stopImmediatePropagation(),wo(-1)):B.key==="d"&&(B.preventDefault(),(oe=document.querySelector('[data-action="edit-description"]'))==null||oe.click());const be={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[B.key];if(be){const ee=document.querySelector(`.property-row[data-field="${be}"]`);ee&&(B.preventDefault(),ee.click())}};if(document.addEventListener("keydown",ot,{signal:M}),S){const B=document.getElementById(S.id);if(B&&(B.focus({preventScroll:!0}),typeof S.start=="number"&&typeof B.setSelectionRange=="function"))try{B.setSelectionRange(S.start,S.end)}catch{}}return L!==null&&window.scrollTo(0,L),"rendered"}catch(o){if(n)console.error("Failed to refresh issue detail:",o);else{if(i!==Bs)return"dropped";k("load issue",o);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(o==null?void 0:o.status)===403||(o==null?void 0:o.status)===404;r.innerHTML=V(l?{icon:U.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:U.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function sk(e,t){if(e.preventDefault(),Wl)return!1;const n=document.getElementById("new-comment").value;Sa(t,null),Wl=!0;try{const i=await h.createComment(t,n);$("Comment added!","success"),La(i),await le(t)}catch(i){Sa(t,n),k("add comment",i)}finally{Wl=!1}return!1}async function ak(e){const t=_e()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=es(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=Eu(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}Ll("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?In(e,c,t.description||""):In(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&qm()}),a.addEventListener("keydown",c=>{var d,p;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(p=document.getElementById("cancel-description-edit"))==null||p.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var p,f;if(!((((p=document.getElementById("edit-description"))==null?void 0:p.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(In(e,null),Yl){le(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Rn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(Kl)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=ho?ho.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const p=document.getElementById("save-description-edit");Kl=!0,p&&(p.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),In(e,null),$("Description updated","success"),await le(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(y){k("update description",y)}finally{Kl=!1,p&&(p.disabled=!1)}})}function qm(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Rn(n):'<span class="text-muted">Nothing to preview.</span>'}function ok(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?qm():i.focus()}function rk(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,G(),document.getElementById("relation-issue-search").focus()}async function lk(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=A())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${u(r.identifier)}</span>
                <span class="link-result-title">${u(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function ck(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function dk(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function uk(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),F(),$("Relation added","success"),le(t)}catch(s){k("add relation",s)}return!1}async function pk(e,t){try{await h.deleteRelation(e,t),$("Relation removed","success"),le(e)}catch(n){k("remove relation",n)}}function wo(e){const t=_e();if(!t)return;const n=as();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||le(n[s].id)}se({"retry-issue-comments":(e,t)=>{le(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Ay(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||ak(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),Ce(t.documentId))},"scroll-to-ticket-gate":()=>{Z$()},"save-comment":(e,t)=>{sk(e,t.issueId)},"show-add-relation-modal":(e,t)=>{vo(),rk(t.issueId)},"remove-relation":(e,t)=>{pk(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{vo(),fp(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{uk(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{lk(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{ck(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{dk()},"set-description-editor-mode":(e,t)=>{ok(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>wo(-1),"navigate-next-issue":()=>wo(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Am(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),K$(t.issueId)}});let Dt=[],$o={},ko=new Set,Qt=null,oc=null,_o=[],Ds=[],rc=[];function Eo(){return $o}function mk(){return oc}function fk(){return Qt}dt(e=>{e==="currentProject"&&C()==="sprints"&&fn()});let lc=0;async function fn({fromMemory:e=!1}={}){qu(-1);const t=Y();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Sprints belong to one project. Pick one in the sidebar switcher, or press P.</p>
                </div>
            `);return}const n=++lc;Ak();const i=document.getElementById("sprints-list"),s=Ml(),a=e?ro("sprints",s):void 0;a?(Dt=a,Nm()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=o.some(c=>c.status==="active")?o:await h.getSprints(t);if(n!==lc)return;const l=a&&lo(Dt,r);Dt=r,fi("sprints",s,r),l||Nm(),await xo()}catch(o){return n!==lc?void 0:(i&&(i.innerHTML=V({icon:U.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),k("load sprints",o),!1)}return!0}function Nm(){const e=document.getElementById("sprints-list");if(!e)return;const t=Dt.find(a=>a.status==="active"),n=Dt.find(a=>a.status==="planned"),i=Dt.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=gk(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
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
        `),e.innerHTML=s||V({icon:U.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Om(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${mc(e.activated_at)}, closed ${mc(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${mc(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function gk(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${u(Om(e))||"not yet activated"}</span>
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
    `}let cc=0;async function bi(e,t=!0){var n;try{t&&hn();const i=++cc,s=C(),a=await h.getSprint(e);if(i!==cc)return;if(!a){$("Sprint not found","error"),O("sprints");return}oc=a;const o=(n=A())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?h.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==cc)return;_o=r,rc=l,Ds=c,C()===s&&Lt(_o),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),vk()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),O("sprints")}}async function hk(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),O("sprints",!1);return}try{await bi(e,!1)}catch{O("sprints",!1)}}function vk(){const e=oc,t=_o;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=C()||"sprints",s=t.filter(g=>ls.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,y)=>b+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let p="";e.status==="active"?p='<span class="badge badge-status-active">Active</span>':e.status==="planned"?p='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(p='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${u(Om(e))}
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
                <div class="stat-value">${c} / ${l}</div>
                <div class="stat-label">Points done of scope</div>
                ${d}
            </div>
        </div>

        <div class="sprint-detail-sections">
            <div class="sprint-detail-section">
                <h3>Open Issues (${s.length})</h3>
                ${s.length===0?V({icon:U.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>dc(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?V({icon:U.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>dc(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>dc(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${yk()}
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
                        ${Ds.map(g=>bk(g)).join("")}
                    </div>
                `:V({icon:U.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function dc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Fu,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${u(e.identifier)}</span>
            <span class="sprint-issue-title">${u(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${Dk(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function bk(e){const t=u(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${u(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${st(e.created_at)}</span>
            </span>
        </div>
    `}function yk(){const e=rc;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${wk(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function wk(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function $k(e,t,n,i){const s=i?i_(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function kk(e,t,n){var p,f,g,b;e.preventDefault();const i=(f=(p=document.getElementById("sprint-name"))==null?void 0:p.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Dt.find(y=>y.id===t);try{const y={};i&&(y.name=i);const _=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!_&&(y.budget=a),Object.keys(y).length&&await h.updateSprint(t,y),o==="planned"){const S=Dt.filter(L=>L.status==="planned"&&L.id!==t);for(const L of S)await h.updateSprint(L.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await fn(),F(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(y){k("update budget",y)}return!1}const Hm="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function _k(e,t=null){const n=Dt.find(c=>c.id===e),i=n?te().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Hm}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){k("reset budget to project default",c),t&&(t.disabled=!1);try{await fn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await fn()!==!1}catch{l=!1}$(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&$(Hm,"warning")}async function Ek(e){const t=Dt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,G();const n=ls;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function xk(e){try{const t=await h.closeSprint(e);await fn(),Gm(),t.limbo?Sk(t):$("Sprint completed!","success")}catch(t){k("complete sprint",t)}}async function xo(){const e=Y();if(e)try{Qt=await h.getLimboStatus(e),Ik()}catch(t){console.error("Failed to load limbo status:",t)}}function Ik(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Qt||!Qt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Qt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Sk(e){const t=Y();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,G(),Tk(t)}async function Tk(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${u(i.name)} <span class="ritual-mode">(${u(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${gt(i.prompt)}</div>
                    ${pc(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function uc(){var t,n;if(!Qt)return;const e=Y();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
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
                        ${pc(i.attestation)}
                        ${Lk(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Qt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Qt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${u(i.name)}</div>
                            ${pc(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,G()}function pc(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${u(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${u(st(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${gt(e.note)}</div>
        </div>
    `}function Lk(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Fm(e){for(const t of e)if(!ko.has(t))try{(await h.getSprints(t)).forEach(i=>{$o[i.id]=i}),ko.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Ak(){$o={},ko=new Set,_o=[],rc=[],Ds=[],Io={}}function Ck(e,t){t.forEach(n=>{$o[n.id]=n}),ko.add(e)}let Io={};function Bk(e){return Io[e]}function Um(e,t){Io[e]=t??null}function Gm(){Io={}}se({"retry-load-sprints":()=>fn(),"view-sprint":(e,t,n)=>{if(!(e.type==="keydown"&&(n==null?void 0:n.tagName)==="BUTTON")){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}bi(t.sprintId)}},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;$k(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{_k(t.sprintId,n)},"show-limbo-details-modal":()=>{uc()},"show-close-sprint-confirmation":(e,t)=>{Ek(t.sprintId)},"handle-update-budget":(e,t)=>{kk(e,t.sprintId,t.projectId)},"close-modal":()=>{F()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,F(),xk(t.sprintId)},"dismiss-limbo-modal":()=>{F(),xo()},"approve-ritual":(e,t)=>{Pk(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Vm(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}le(t.issueId)},"create-sprint-document":async(e,t)=>{await M$(t.sprintId,t.projectId,()=>{bi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ce(t.documentId)}});function mc(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Dk(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}dt(e=>{e==="currentProject"&&C()==="rituals"&&fc()});let zm=0;async function fc(){const e=Y(),t=document.getElementById("rituals-content"),n=++zm;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=V({icon:U.projects,heading:"Select a project",description:"Rituals belong to one project. Pick one in the sidebar switcher, or press P."}));return}d_(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await js();n===zm&&!i&&t&&(t.innerHTML=V({icon:U.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Mk(){tf(Rk),fc()}function Rk(){const e=document.getElementById("rituals-content"),t=u_(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,wi("rv-sprint-rituals-list",n,"sprint"),wi("rv-close-rituals-list",i,"close"),wi("rv-claim-rituals-list",s,"claim")}function jk(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Pk(e,t){try{await h.approveAttestation(e,t),$("Ritual approved!","success"),await xo(),uc()}catch(n){k("approve ritual",n)}}function gc(e){return e==="document"?`
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
        `:""}function hc(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Vm(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${gc(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{qk(s,e,t,i)}),G()}async function qk(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=hc(i);if(a===void 0)return!1;try{await h.completeGateRitual(t,n,s||null,a),$("Ritual completed!","success"),await xo();const o=fk();o&&!o.in_limbo?(F(),$("Limbo cleared! Next sprint is now active.","success")):uc()}catch(o){k("complete gate ritual",o)}return!1}function Nk(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${u(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${gc(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{Ok(o,e,t,s,a)}),G()}async function Ok(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return $("A note is required for this attestation.","error"),!1;const o=hc(i);if(o===void 0)return!1;try{await h.attestTicketRitual(t,n,a||null,o),$("Ritual attested!","success"),F(),await As(n)}catch(r){k("attest ticket ritual",r)}return!1}async function Hk(e,t){try{await h.attestTicketRitual(e,t),$("Ritual attested!","success"),await As(t)}catch(n){k("attest ticket ritual",n)}}async function Fk(e,t){try{await h.approveTicketRitual(e,t),$("Ritual approved!","success"),await As(t)}catch(n){k("approve ticket ritual",n)}}function Wm(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{Uk(s,e,t,n,i)}),G()}async function Uk(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return $("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,a),$(`"${i}" rejected. The attester has been told why.`,"success"),F(),s&&await s()}catch(o){k("reject ritual",o)}return!1}function Gk(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${gc(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{zk(s,e,t,i)}),G()}async function zk(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=hc(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,s||null,a),$("Ritual completed!","success"),F(),await As(n)}catch(o){k("complete ticket ritual",o)}return!1}se({"show-create-ritual-modal":(e,t)=>{df(t.trigger)},"approve-ticket-ritual":(e,t)=>{Fk(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Wm(t.ritualId,t.issueId,t.ritualName,()=>As(t.issueId))},"complete-ticket-ritual":(e,t)=>{Gk(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{Nk(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{Hk(t.ritualId,t.issueId)},"retry-load-rituals":()=>fc()});function gt(e){if(!e)return"";try{K.setOptions({breaks:!0,gfm:!0});const n=K.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return yu.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Ms(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Vk(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{Wk(c,e,t,n)}),G(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function Wk(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),$(`GATE ritual "${i}" approved!`,"success"),F(),Mt()}catch(a){k("complete gate ritual",a)}}function Kk(e,t,n,i,s,a,o,r){Vk(e,t,n,i,s,a,o,r)}function Yk(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{Qk(d,e,t,n)}),G(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Qk(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await h.approveTicketRitual(t,n);let r=null;if(s)try{r=await h.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}$(`Review ritual "${i}" approved!`,"success"),La(r),F(),Mt()}catch(r){k("approve review ritual",r)}}function Zk(e,t,n,i,s,a,o,r,l){Yk(e,t,n,i,s,a,o,r,l)}dt(e=>{e==="currentProject"&&C()==="approvals"&&Mt()});let vc=[],bc=0;async function Mt(){if(!A())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++bc;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=Y(),i=n?te().filter(r=>r.id===n):te(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==bc)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(p=>{var f;return(f=p.attestation)!=null&&f.approved_at?!1:p.approval_mode==="gate"||!!p.attestation});d.length>0&&o.push({project:r,rituals:d})}$b(a),vc=o,Km()}catch(n){if(t!==bc)return;e.innerHTML=V({icon:U.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),k("load approvals",n)}}function Km(){const e=document.getElementById("approvals-list");if(!e)return;const t=wb(),n=vc.length>0,i=!Jv();if(t.length===0&&!n){i?e.innerHTML=`
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
                    ${vc.map(({project:d,rituals:p})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${u(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${p.map(f=>{const g=f.attestation&&!f.attestation.approved_at,b=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${u(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',_=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${m(f.id)}"
                                            data-project-id="${m(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${m(f.id)}"
                                                data-project-id="${m(d.id)}"
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
                                            ${_}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=d=>d.pending_approvals||[],o=d=>p=>{const f=a(p).filter(d);return f.length>0?{...p,_filteredApprovals:f}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(yc).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(yc).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(yc).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;Kk(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const p=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");p&&(p.disabled=!0);const f=d.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),$(`Review ritual "${f.ritualName}" approved!`,"success"),await Mt()}catch(b){d.disabled=!1,p&&(p.disabled=!1),k("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;Zk(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt,p.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;Wm(p.ritualId,p.issueId,p.ritualName,()=>Mt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await Mt()}catch(p){d.disabled=!1,k("approve sprint ritual",p)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Vm(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function Xk(){eb(),Km()}function yc(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${u(i.requested_by_name)}</strong>${i.requested_at?` (${Ms(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note markdown-body">${gt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${u(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${Ms(i.rejected_at)})`:""}: ${u(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",p=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
                    ${c?"":p}
                </div>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${u(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${u(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                    ${d}
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
    `}se({"view-issue-from-modal":(e,t)=>{e.preventDefault(),F(),le(t.issueId)},"dismiss-approvals-explainer":()=>{Xk()},"retry-load-approvals":()=>Mt()});const So={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},To={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Ym=0;function Qm(e){Ym=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Zm(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Zm(e="",t="",n=""){const i=Ym++,s=Object.keys(So).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?So[e]:So.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${To[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function Jk(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Zm()),Lo()}function e_(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Lo()}function t_(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=So[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${To[o]}</option>`).join(""),Xm(e),Lo()}function Xm(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Rs(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Lo(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Jm(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw Rs("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Rs("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${l}`;if(n.has(p))throw Rs(`Duplicate condition: ${r} ${To[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),l==="isnull")t[p]=!0;else if(l==="in"||l==="contains")t[p]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw Rs(`Please enter a numeric value for ${r} ${To[l]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(d,10);if(isNaN(f))throw Rs(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${d}`);t[p]=f}else t[p]=d}return Lo(),Object.keys(t).length>0?t:null}se({"add-condition-row":()=>{Jk()},"remove-condition-row":(e,t)=>{e_(Number(t.rowId))},"update-operator-options":(e,t)=>{t_(Number(t.rowId))},"toggle-value-input":(e,t)=>{Xm(Number(t.rowId))}});let Be=[],wc=null;const Ao="project-switcher",$c="all";function Co(e=Y()){const t=document.getElementById(Ao);t&&(t.value=e||"")}dt((e,t)=>{e==="currentProject"&&(t&&$u(t),Co(t),$_(t||""))});function ef(){$u($c),yt(null)}const Bo={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function tf(e){wc=e}function te(){return Be}function n_(e){Be=e}function yi(e){const t=Be.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Bo[n]||Bo.fibonacci}function gn(e,t){if(e==null)return"No estimate";const i=yi(t).find(s=>s.value===e);return i?i.label:`${e} points`}function Do(e,t){return e==null||e===0?!1:!yi(t).some(i=>i.value===e)}function i_(e){const t=Be.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Bo[n]||Bo.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function ht(){var t,n;const e=(t=A())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=A())==null?void 0:n.id)!==e)return;Be=i,sf(),nf()}catch(i){k("load projects",i)}}function nf(){const e=Y();if(e&&Be.some(s=>s.id===e))return;const n=new URLSearchParams(window.location.search).get("project");if(n&&Be.some(s=>s.id===n)){yt(n);return}const i=wu();if(i===$c){e&&yt(null);return}if(i&&Be.some(s=>s.id===i)){yt(i);return}Be.length>0&&yt(Be[0].id)}function sf(){const e=document.getElementById(Ao);e&&(e.innerHTML='<option value="">All projects</option>'+Be.map(t=>`<option value="${m(t.id)}" data-hint="${m(t.key||"")}">${u(t.name)}</option>`).join(""),Co())}function af(){const e=wu();return e===$c?null:e}function Nn(){const e=document.getElementById("projects-list");if(Be.length===0){e.innerHTML=V({icon:U.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Be.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${m(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ie(t.color)}20; color: ${ie(t.color)}">
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
    `).join("")}function s_(e){yt(e),O("issues")}function of(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function a_(e){e.preventDefault();const t=A();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await ht(),Nn(),F(),$("Project created!","success")}catch(i){k("create project",i)}return!1}async function o_(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await ht(),Nn(),F(),$("Project updated!","success")}catch(i){k("update project",i)}return!1}async function r_(e){const t=Be.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await ht(),Nn(),F(),$("Project deleted","success")}catch(n){k("delete project",n)}}let Re=null;function rf(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function l_(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Re!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${m(a.id)}">${u(a.identifier)} ${u(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function lf(e){Re=e,Be.length===0&&await ht();const t=Be.find(n=>n.id===e);if(!t){$("Project not found","error"),O("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,rf("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),rf("ps-require-epic-on-close",t.require_epic_on_close===!0),l_(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),cf("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function cf(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Zt||Zt.length===0)&&js()}function c_(){Re=null,Zt=[]}function d_(e){Re=e}function u_(){return Zt}async function p_(){if(!Re)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Re,t),await ht(),$("Settings saved","success");const n=Be.find(i=>i.id===Re);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){k("save project settings",n)}}async function m_(){if(!Re)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await h.updateProject(Re,n),await ht(),$("Settings saved","success")}catch(o){k("save settings",o)}}let Zt=[];async function js(){if(!Re)return!1;try{return Zt=await h.getRituals(Re),f_(),typeof wc=="function"&&wc(),!0}catch(e){return k("load rituals",e),!1}}function f_(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Zt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Zt.filter(i=>i.trigger==="ticket_close"),n=Zt.filter(i=>i.trigger==="ticket_claim");wi("ps-sprint-rituals-list",e,"sprint"),wi("ps-close-rituals-list",t,"close"),wi("ps-claim-rituals-list",n,"claim")}function wi(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>m(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${u(a.group_name)}${r}</span>`}return`
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
  `}).join("")}async function df(e){if(!Re)return;let t=[];try{t=await h.getRitualGroups(Re)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Qm(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,G()}function g_(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function h_(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function uf(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Re,{name:t,selection_mode:n})).id}return e.value||null}async function v_(e){var s;e.preventDefault();let t;try{t=Jm()}catch{return!1}let n;try{n=await uf()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.createRitual(Re,i),await js(),F(),$("Ritual created!","success")}catch(a){k("create ritual",a)}return!1}async function b_(e){const t=Zt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Re)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Qm(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,G()}async function y_(e,t){var a;e.preventDefault();let n;try{n=Jm()}catch{return!1}let i;try{i=await uf()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await js(),F(),$("Ritual updated!","success")}catch(o){k("update ritual",o)}return!1}async function w_(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await js(),$("Ritual deleted","success")}catch(n){k("delete ritual",n)}}se({"view-project":(e,t)=>{s_(t.projectId)},"view-project-settings":(e,t)=>{lf(t.projectId)},"create-project":e=>{a_(e)},"update-project":(e,t)=>{o_(e,t.projectId)},"confirm-delete-project":(e,t)=>{r_(t.projectId)},"edit-project-ritual":(e,t)=>{b_(t.ritualId)},"delete-project-ritual":(e,t)=>{w_(t.ritualId,t.ritualName)},"create-project-ritual":e=>{v_(e)},"update-project-ritual":(e,t)=>{y_(e,t.ritualId)},"toggle-ritual-conditions":()=>{g_()},"ritual-group-change":()=>{h_()}});function pf(){const t=new URLSearchParams(window.location.search).get("project");return t||af()}function $_(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const kc={},mf=new Map;let _c=null,Ec=null,xc=null,Ic=null,Sc=null,Tc=null,Lc=null,ff=!1;function k_(e){Object.assign(kc,e)}function __({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(_c=e),t&&(Ec=t),n&&(xc=n),i&&(Ic=i),s&&(Sc=s),a&&(Tc=a),o&&(Lc=o)}function gf(){return Object.keys(kc)}const E_=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],hf={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"};function Ps(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function vf(){_c&&_c()}function O(e,t=!0,{transition:n=!1}={}){if(t&&hn(),ss(e),t){let a;const o=pf();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:E_.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Ps(e),vf();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=kc[e];s&&s(),t&&window.scrollTo(0,0)}const qs={"gate-approvals":"approvals",team:"people"},x_=new Set(["team"]);function bf(){var i;ss(null);const e=window.location.pathname.split("/").filter(Boolean),t=e.length===0?"my-issues":qs[e[0]]||e[0],n=e.length<=1&&gf().includes(t);document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden")),n?((i=document.getElementById(`${t}-view`))==null||i.classList.remove("hidden"),Ps(t)):Ps(hf[e[0]]||null)}function Ac(){var i;const t=window.location.pathname.split("/").filter(Boolean);Ic&&Ic(),C()||ss("my-issues");let n="my-issues";if(t.length===0||t[0]==="")O("my-issues",!1);else if(Ec&&Ec(t)){const s=hf[t[0]];s&&Ps(s);return}else n=t[0],qs[n]&&(t.length===1&&x_.has(n)&&history.replaceState({view:qs[n]},"",`/${qs[n]}${window.location.search}`),n=qs[n]),gf().includes(n)?O(n,!1):(n="my-issues",O("my-issues",!1));(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function hn(){mf.set(window.location.href,window.scrollY)}function Mo(e){hn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Sc&&Sc(e)}function yf(e){hn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Tc&&Tc(e)}function wf(){const e=mf.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{Lc&&Lc(),window.scrollTo(0,e)})}function $f(){ff||(ff=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&xc&&xc(e.state)){wf();return}(t=e.state)!=null&&t.view?O(e.state.view,!1):Ac(),wf()}))}let Xt=0,$i=!1,Ns=null,Ro=null,Os=0;const On=new Map;function jo(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Xt===0&&!$i),e.textContent=$i?"Stopped":"Offline",e.title=$i?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Ze(e,t){return On.has(e)||On.set(e,new Set),On.get(e).add(t),()=>{var n;return(n=On.get(e))==null?void 0:n.delete(t)}}function I_(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const S_=1e3;function Po(){Ro&&(clearTimeout(Ro),Ro=null)}const T_="chaotic",Cc=4001,L_=4003,A_="chaotic.bearer.";function C_(e){return[T_,A_+e]}function kf(e,{isReconnect:t=!1}={}){Ns&&(clearTimeout(Ns),Ns=null),Po();const n=Eb();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),al(null)),!t&&(Xt>0||$i)&&(Xt=0,$i=!1,jo());const i=h.getToken();if(!i)return;const s=++Os,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,C_(i));al(r);let l=!1;const c=()=>{if(l||s!==Os)return;l=!0,Po();const d=Xt>0;d&&$("Live updates reconnected","success"),Xt=0,jo(),d&&Bc({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Os&&(console.log("WebSocket connected"),Po(),Ro=setTimeout(c,S_))},r.onmessage=d=>{if(s!==Os)return;c();let p;try{p=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}Bc(p)},r.onclose=d=>{if(s!==Os)return;console.log("WebSocket disconnected"),Po();const p=d==null?void 0:d.code;if(p===Cc||p===L_){al(null),Xt=0;const g=p===Cc&&Yr()===i;$i=!g,jo();let b="forbidden";p===Cc&&(b=g?"unauthorized":"superseded"),Bc({type:b,entity:"connection",data:{code:p,teamId:e}});return}Xt++,Xt===1&&$("Live updates disconnected. Reconnecting...","warning"),jo();const f=I_(Xt-1);Ns=setTimeout(()=>{Ns=null,A()&&A().id===e&&kf(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function Bc(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=On.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=On.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=On.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const B_={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let ki=0,Rt=!1,Ee=null,vn=null;const _i=new Set,Hs=new Map,jt=new Map,vt=new Map;function _f(e){jt.get(e)===null&&jt.set(e,ki)}function Dc(e){const t=vt.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=ki)}function D_(e){return e.filter(t=>!jt.has(t.id)).map(t=>{const n=vt.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Rt&&vt.has(t.id)&&t.id!==Ee))}function M_(e){for(const[t,n]of jt)n!==null&&e>n&&jt.delete(t);for(const[t,n]of vt)n.confirmedAfter!==null&&e>n.confirmedAfter&&vt.delete(t)}function R_(e,t){t!=null&&t.id&&(e==="archived"?(jt.has(t.id)||jt.set(t.id,null),_f(t.id)):e==="read"&&Dc(t.id))}async function Ei(){const e=A();if(e){try{const t=await h.getInboxUnreadCount(e.id);rs(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Fs()}}function Fs(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Da();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function Us({focusFirst:e=!1,background:t=!1}={}){const n=A();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++ki;t||(vn={focusFirst:e||!!(vn!=null&&vn.focusFirst)},Ee=null,j_(i));try{const a=await h.getInbox(n.id,{unread:Rt,limit:100});if(s!==ki)return;const o=new Set(jt.keys());M_(s);const r=D_(a||[]),l=vn;vn=null,l?(Wt(r),zs(),l.focusFirst&&!Ge()&&N_()):P_(r,o)}catch(a){if(s!==ki)return;vn?(vn=null,i.innerHTML=V({icon:U.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),k("load inbox",a)):console.error("Failed to refresh inbox:",a)}Ei()}function j_(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function qo(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function Ef(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function xf(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function If(e,t){if(!e)return;const n=qo(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Ef(n||t)),i==null||i.focus({preventScroll:!0})}function P_(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ve(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=xf(),c=window.scrollY,d=n.scrollTop;let p=e;if(Ee&&!e.some(b=>b.id===Ee)){const b=i.find(y=>y.id===Ee);if(b&&Rt&&!t.has(Ee)){p=[...e];const y=p.findIndex(_=>_.created_at<b.created_at);p.splice(y===-1?p.length:y,0,b)}else Ee=null}Wt(p),zs();let f=-1;o&&(f=p.findIndex(b=>b.id===o),f===-1&&p.length&&(f=Math.min(r,p.length-1))),f>=0?Gs(f,{focus:!1}):Ba(-1);const g=f>=0?n.querySelectorAll(".inbox-row")[f]:null;If(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function q_(e,t){if(!(t!=null&&t.id))return!1;const n=ve().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function xi(e){const t=ve();for(const n of new Set(e)){const i=qo(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?xf():null,o=document.createElement("template");o.innerHTML=Cf(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),If(a,r)}}function Gs(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){Ba(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),Ba(i),t&&Ef(n[i]).focus({preventScroll:!0})}function N_(){Gs(0)}async function Mc(e){const t=ve(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;Ee===e&&(Ee=null),Hs.delete(e),jt.set(e,null),Wt(t.filter(a=>a.id!==e)),s&&rs(Math.max(0,Da()-1)),zs(),Fs(),Gs(n,{focus:!Ge()});try{await h.archiveInbox(e),_f(e)}catch(a){jt.delete(e),console.error("Failed to archive inbox entry:",a)}}function Sf(e){var s,a;const n=ve().findIndex(o=>o.id===e);if(n===-1)return;const i=Ee;Ee=i===e?null:e,Ee===e&&Tf(e),xi([i,e]),Gs(n),Ee===e&&((a=(s=qo(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function Tf(e){const t=ve(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,vt.set(e,{readAt:i,confirmedAfter:null}),Wt([...t]),rs(Math.max(0,Da()-1)),Fs(),h.markInboxRead(e).then(()=>Dc(e),s=>{var o;((o=vt.get(e))==null?void 0:o.readAt)===i&&vt.delete(e);const a=ve().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Wt([...ve()]),xi([e])),Ei(),k("mark inbox entry read",s)})}function O_(e){var i;const n=ve().findIndex(s=>s.id===e);if(n!==-1){if(Tf(e),Rt)Ee===e&&(Ee=null),Wt(ve().filter(s=>s.id!==e)),zs(),Gs(n);else if(xi([e]),!document.activeElement||document.activeElement===document.body){const s=qo(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function H_(){if(Ee===null)return!1;const e=Ee;return Ee=null,xi([e]),!0}function Lf(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}function F_(e){if(_i.has(e))return;const t=ve().find(d=>d.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender",i=t.issue_identifier||"this ticket",s=Hs.get(e)||"",a=s?`Already posted on ${u(i)}. Submitting reassigns it to ${u(n)} without posting it again, unless you change it.`:`Posted on ${u(i)} before it is reassigned, so ${u(n)} knows why.`;document.getElementById("modal-title").textContent=`Reassign ${i} back to ${n}`,document.getElementById("modal-content").innerHTML=`
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
    `;const o=document.getElementById("inbox-reassign-form"),r=document.getElementById("inbox-reassign-comment"),l=document.getElementById("inbox-reassign-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{cancelable:!0})))});let c=!1;o.addEventListener("submit",async d=>{var y;if(d.preventDefault(),c)return;if(!ve().some(_=>_.id===e)){$(`That inbox item is gone, so ${i} was not reassigned.`,"warning"),o.isConnected&&F();return}const p=r.value.trim();if(!p){l.classList.remove("hidden"),r.focus();return}const f=document.getElementById("inbox-reassign-submit");c=!0,f&&(f.disabled=!0);const g=await U_(e,p);c=!1;const b=o.isConnected&&Ge();if(g){if(b&&(F(),!document.activeElement||document.activeElement===document.body)){const _=document.querySelector("#inbox-list .inbox-row.keyboard-selected");(y=_==null?void 0:_.querySelector(".inbox-row-toggle"))==null||y.focus({preventScroll:!0})}}else f&&f.isConnected&&(f.disabled=!1)}),G()}async function U_(e,t){if(_i.has(e))return!1;const n=ve().find(r=>r.id===e);if(!n||!n.issue_id||!n.source_user_id)return!1;const i=typeof t=="string"?t.trim():"";if(!i)return!1;const s=n.source_user_name||"sender",a=n.issue_identifier||"issue";_i.add(e),Lf(e,!0);const o=(r,l)=>(_i.delete(e),Lf(e,!1),k(r,l),!1);if(Hs.get(e)!==i){let r;try{r=await h.createComment(n.issue_id,i)}catch(l){return o(`comment on ${a}`,l)}Hs.set(e,i),La(r)}try{await h.updateIssue(n.issue_id,{assignee_id:n.source_user_id})}catch(r){return o(`reassign ${a} back to ${s}`,r)}return _i.delete(e),Hs.delete(e),Mc(e),!0}function G_(){Af(!Rt)}function Af(e){e!==Rt&&(Rt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Rt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Us({focusFirst:!0}))}const z_='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',V_='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function W_(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function Cf(e){const t=!e.read_at,n=e.id===Ee,i=B_[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${u(W_(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${m(e.kind)}">${u(i)}</span>
                        ${s?`<span class="inbox-row-source">${u(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${u(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${u(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?K_(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${z_}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${V_}</button>
                </span>
                <span class="inbox-row-time">${u(Ms(e.created_at))}</span>
            </div>
        </div>
    `}function K_(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${u(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
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
    `}function zs(){const e=document.getElementById("inbox-list");if(!e)return;const t=ve();if(t.length===0){e.innerHTML=V({icon:U.inbox,heading:Rt?"No unread items":"Inbox zero",description:Rt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=Q_(t)}function Y_(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function Q_(e){const t=[];for(const n of e){const i=Y_(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${u(n.label)}</h3>
            ${n.entries.map(s=>Cf(s)).join("")}
        </section>
    `).join("")}async function Z_(e){var s;const t=ve().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();vt.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(a){((s=vt.get(e))==null?void 0:s.readAt)===n&&vt.delete(e);const o=ve().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Wt([...ve()]),xi([e])),console.error("Failed to mark inbox entry read:",a);return}Dc(e);const i=ve().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Wt([...ve()]),rs(Math.max(0,Da()-1)),Fs(),xi([e])):Ei()}async function X_(){const e=A();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ve())n.read_at||vt.set(n.id,{readAt:t,confirmedAfter:ki});Wt(ve().map(n=>({...n,read_at:n.read_at||t}))),rs(0),Fs(),zs()}catch(t){k("mark all inbox entries read",t)}}function J_(e){e.entryId&&Z_(e.entryId),e.issueId?le(e.issueId):e.documentId&&Ce(e.documentId)}function eE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Mc(e.dataset.entryId)}function tE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Sf(e.dataset.entryId)}const nE='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function iE(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(nE);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function sE(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}se({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&sE((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||iE(e.target,n)||(e.preventDefault(),t.entryId&&Sf(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),J_(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&F_(t.entryId)},"close-inbox-reassign":e=>{e.preventDefault(),F()},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Mc(t.entryId)},"toggle-inbox-unread-filter":()=>G_(),"set-inbox-filter":(e,t)=>Af(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&O_(t.entryId)},"mark-all-inbox-read":()=>X_(),"retry-load-inbox":()=>Us({focusFirst:!0})});let Vs=[],Ii=[],Hn=[];function Rc(){return Vs}function Bf(e){Vs=Array.isArray(e)?e:[],Df()}function Pt(){return Ii}async function No(e=null){try{Vs=await(e||h.getMyTeams()),Df()}catch(t){k("load teams",t)}}function Df(){const e=document.getElementById("team-list");Vs.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Vs.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${u(t.name)}</button>
        `).join("")}async function Oo(e,t=!1,{seed:n=null}={}){Fn=null,Qn(e),Pf(),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||""),document.getElementById("team-dropdown").classList.add("hidden"),kf(e.id),n&&oE(n)){let a=!1;try{rE(n),Fn=e.id,t?Ac():O(C()||"my-issues"),a=!0}catch(o){console.error("Failed to paint from the boot cache:",o),Fn=null}if(a){Mf(e).catch(o=>console.error("Failed to refresh team data:",o));return}}await Mf(e),t?Ac():O(C()||"my-issues")}let Fn=null;function aE(){var e;return Fn&&Fn===((e=A())==null?void 0:e.id)?Fn:null}async function Mf(e){var t;await Promise.all([ht(),xE(),cE(),Vw(),Ei()]),((t=A())==null?void 0:t.id)===e.id&&(Fn=e.id)}function oE(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function rE(e){n_(Array.isArray(e.projects)?e.projects:[]),sf(),nf(),os(Array.isArray(e.labels)?e.labels:[]),Ii=Array.isArray(e.members)?e.members:[],Gw(e.agents),cs(Pt,ft),Xn(),qb(e.issues)}function Rf(){document.getElementById("team-dropdown").classList.toggle("hidden")}function lE(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function cE(){var t,n;const e=(t=A())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=A())==null?void 0:n.id)!==e)return;Ii=i,cs(Pt,ft),Xn()}catch(i){console.error("Failed to load team members:",i),k("load team members",i)}}function dE(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let jc=0;async function jf(){var n,i;const e=(n=A())==null?void 0:n.id;if(!e)return;const t=++jc;try{const s=await h.getTeamMembers(e);if(t!==jc||((i=A())==null?void 0:i.id)!==e)return;Ii=s,cs(Pt,ft),Xn()}catch(s){if(t!==jc)return;Ii=[],k("load team members",s)}uE()}function Si(){var n;const e=(n=me())==null?void 0:n.id,t=Ii.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function uE(){var t;const e=Si();for(const n of["invite-member-btn","edit-team-btn"])(t=document.getElementById(n))==null||t.classList.toggle("hidden",!e)}let Ho=0;async function Fo(){var i;if(!A())return;const e=++Ho,t=A().id,n=document.getElementById("team-invitations-list");n&&(n.innerHTML=dE());try{const s=await h.getTeamInvitations(t);if(e!==Ho||((i=A())==null?void 0:i.id)!==t)return;Hn=s,Pc()}catch(s){if(e!==Ho)return;if((s==null?void 0:s.status)===403){Hn=[],Pc();return}console.error("Failed to load team invitations:",s),qf(!0),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Pf(){Ho++,Hn=[],Pc()}function qf(e){var t;(t=document.getElementById("people-invitations"))==null||t.classList.toggle("hidden",!e)}function Pc(){const e=document.getElementById("team-invitations-list");if(!e)return;const t=document.getElementById("people-invitations-count");if(t&&(t.textContent=String(Hn.length)),qf(Hn.length>0),Hn.length===0){e.innerHTML="";return}const n=Si();e.innerHTML=Hn.map(i=>`
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
    `).join("")}function Nf(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function pE(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(A().id,t,n);if(await Fo(),i&&i.accept_url)return gE(t,fE(i.accept_url),i.email_queued===!0),!1;F(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){mE(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):k("send invitation",i)}return!1}function mE(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Of(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function fE(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Of(n.hostname)||Of(i.hostname)?e:i.origin+n.pathname}function gE(e,t,n=!1){var a;const i=u(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${u(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ge()||G(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Hf()}function Hf(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function hE(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function vE(e){let t;try{t=await h.issueInvitationVerificationCode(A().id,e)}catch(n){k("get a verification code",n);return}yE(t)}function bE(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function yE(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=bE(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,Ge()||G(),Hf("invitation-code")}async function wE(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(A().id,e),await jf(),$("Member removed!","success"),window.dispatchEvent(new CustomEvent("chaotic:member-removed",{detail:{userId:e}}))}catch(t){k("remove member",t)}}async function $E(e){try{await h.deleteInvitation(A().id,e),await Fo(),$("Invitation canceled!","success")}catch(t){k("cancel invitation",t)}}function Ff(){Rf(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,G()}function kE(){A()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${m(A().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${m(A().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${u(A().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,G())}async function _E(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await No(),await Oo(n),F(),$("Team created!","success")}catch(n){k("create team",n)}return!1}async function EE(e){if(e.preventDefault(),!A())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(A().id,t);Qn(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||""),await No(),F(),$("Team updated!","success")}catch(n){k("update team",n)}return!1}async function xE(){var t,n;const e=(t=A())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=A())==null?void 0:n.id)!==e)return;os(i)}catch(i){console.error("Failed to load labels:",i),k("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),se({"select-team":(e,t)=>{Oo(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{e!=null&&e.type&&e.type!=="click"||wE(t.userId)},"delete-invitation":(e,t)=>{e!=null&&e.type&&e.type!=="click"||$E(t.invitationId)},"issue-invitation-code":(e,t)=>{e!=null&&e.type&&e.type!=="click"||vE(t.invitationId)},"retry-load-team-invitations":()=>{Fo()},"invite-member":e=>{pE(e)},"copy-invite-link":()=>{hE()},"dismiss-invite-link":()=>{F()},"create-team":e=>{_E(e)},"update-team":e=>{EE(e)}});let qt=null,Jt=0,Ti=null,Li=null,Ws=null,qc=!1;function IE(){return Uv()}function Uf(){Gv()}function Gf(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function SE(){qt||(qt=document.createElement("div"),qt.id="onboarding-overlay",qt.className="onboarding-overlay",document.getElementById("app").appendChild(qt))}function Ks(){if(!qt)return;const e=qc?Vf():zf(),t=e[Jt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Jt?" active":""}${s<Jt?" completed":""}"></span>`).join("");qt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function zf(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Gf(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Gf(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Ti&&(e.textContent=`${Ti.name} (${Ti.key})`),t&&Li&&(t.textContent=`${Li.name} (${Li.key})`),n&&Ws&&(n.textContent=`${Ws.identifier} - ${Ws.title}`)}}]}function Vf(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Nc(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Oc(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ai(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function TE(){const e=qc?Vf():zf();Jt<e.length-1&&(Jt++,Ks())}function LE(){Uf(),Kf(),Un()}function AE(){Uf(),Kf(),Un()}async function CE(e){e.preventDefault(),Oc("onboarding-team-error"),Ai("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Ti=await h.createTeam({name:t,key:n}),Jt++,Ks()}catch(i){Nc("onboarding-team-error",i.message||"Failed to create team"),Ai("onboarding-team-submit",!1)}}async function BE(e){e.preventDefault(),Oc("onboarding-project-error"),Ai("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Li=await h.createProject(Ti.id,{name:t,key:n}),Jt++,Ks()}catch(i){Nc("onboarding-project-error",i.message||"Failed to create project"),Ai("onboarding-project-submit",!1)}}async function DE(e){e.preventDefault(),Oc("onboarding-issue-error"),Ai("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Ws=await h.createIssue(Li.id,{title:t}),Jt++,Ks()}catch(n){Nc("onboarding-issue-error",n.message||"Failed to create issue"),Ai("onboarding-issue-submit",!1)}}function Wf(e=!1){qc=e,Jt=0,Ti=null,Li=null,Ws=null,SE(),Ks()}function Kf(){qt&&(qt.remove(),qt=null)}function Yf(){zv(),Wf(!0)}se({"onboarding-next":e=>{e.preventDefault(),TE()},"onboarding-skip":e=>{e.preventDefault(),LE()},"onboarding-finish":e=>{e.preventDefault(),AE()},"onboarding-create-team":e=>{CE(e)},"onboarding-create-project":e=>{BE(e)},"onboarding-create-issue":e=>{DE(e)}});const Qf="/oauth/consent/";function ME(e){if(!e||!e.startsWith(Qf))return null;const t=e.slice(Qf.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function RE(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function jE(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function PE(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Zf={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function Uo(e){const t=Zf[e.trust]||Zf.unverified,n=e.host?` · ${u(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${u(t)}${n}</span>`}function qE(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${u(n.name)}</option>`).join("")}function NE(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${u(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Xf(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${u(i.name+a)}</option>`)}return n.join("")}function Jf(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${u(t.name)} <span class="oauth-muted">${u(t.key)}</span>
        </label>`).join("")}function OE(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${u(t.name)}${u(i)}
        </label>`}).join("")}function HE(e,t){const n=u(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${Uo(t.client)}</p>
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
        </div>`}function FE(e,t){if(t.acts_as==="person"){HE(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=u(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${u(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${Uo(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${u(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${qE(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Xf(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Jf(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${OE(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Hc(e,t)}function Hc(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=NE(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function UE(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function GE(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Ys(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${u(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function zE(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function VE(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(p=>p.id===s.value);e.querySelector("#oauth-agent").innerHTML=Xf(d,null),e.querySelector("#oauth-projects").innerHTML=Jf(d),Hc(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Hc(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const p=d?await h.approveOAuthRequest(t,UE(e)):await h.denyOAuthRequest(t);if(!RE(p.redirect)){Ys(e,"The app's return address isn't one a browser should be sent to.");return}i(p.redirect)}catch(p){if(a=!1,p&&p.status===404){Ys(e,"It has expired, was already answered, or belongs to someone else.");return}GE(e,p&&p.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function WE(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=jE();PE(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(a){a&&a.status===404?Ys(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?zE(i,n):a&&a.status===403?Ys(i,"Only a person signed in to Chaotic can approve an app."):Ys(i,a&&a.message||"Something went wrong");return}FE(i,s),VE(i,e,s,t)}const Fc="/invite/",Qs="/invite",Uc="chaotic.inviteToken",eg="invite-auth-notice";let Gc=null;const KE="This invitation is no longer valid.",YE={owner:"an owner",admin:"an admin",member:"a member"};function QE(e){if(!e||!e.startsWith(Fc))return null;const t=e.slice(Fc.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function tg(){const{pathname:e}=window.location,t=QE(e);if(t){Gc=t;try{sessionStorage.setItem(Uc,t)}catch{}return history.replaceState(null,"",Qs),t}if(!ng(e))return null;let n=null;try{n=sessionStorage.getItem(Uc)}catch{}const i=n||Gc;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function ng(e){return e===Qs||e===`${Qs}/`}function ig(e){return ng(e)||!!(e&&e.startsWith(Fc))}function zc(){Gc=null;try{sessionStorage.removeItem(Uc)}catch{}}function ZE(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function XE(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Vc(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function sg(){const e=XE();return Go(),Vc(e),e}function JE(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),Go()}function Go(){var e;(e=document.getElementById(eg))==null||e.remove()}function Wc(e){const t=e.invited_by_name?`<strong>${u(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=YE[e.role]||`a ${u(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${u(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${u(e.email_hint)}</strong>${ex(e)}</p>`}function ex(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${u(n)}`}const tx="Ask whoever invited you to send a new invitation.",nx="Reload the page to try again.";function Kc(e,t=KE,n=tx){e.innerHTML=`
        <div class="invite-page">
            <h1>${u(t)}</h1>
            <p class="invite-muted">${u(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function ix(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function ag(){window.location.pathname!==Qs&&history.replaceState(null,"",Qs),ix(sg())}function sx(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Wc(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function ax(e,t,n){const i=ZE(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${u(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Wc(t)}
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
            ${Wc(t)}
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
        </div>`}function ox(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function rx(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=p=>{l.textContent=p,l.classList.remove("hidden")},d=()=>{var p;a.classList.remove("hidden"),(p=o.focus)==null||p.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const p=await h.requestEmailVerification(),f=ox(p.expires_at);c(`We sent a code to ${p.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(p){const f=p&&p.detail&&p.detail.error_code;if(p&&p.status===401){n();return}if(f==="email_already_verified"){t();return}c(p&&p.message||"Something went wrong"),p&&p.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async p=>{var g;if(p.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(b){r.disabled=!1;const y=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():y==="email_already_verified"?t():(c(b&&b.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function lx(e,t){Go();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=eg,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${u(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${u(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),Go(),t()})}function zo(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function cx(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,p;const a=sg();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await h.getInvitation(e)}catch(f){f&&f.status===404?(zc(),Kc(a)):Kc(a,f&&f.message||"Something went wrong.",nx);return}if(!t){sx(a,o);const f=g=>{lx(o,()=>Vc(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}ax(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var b,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch(_){l=!1,r.disabled=!1;const E=_&&_.detail&&_.detail.error_code;if(f!==void 0&&(E==="invalid_verification_code"||E==="invitation_code_expired"||_&&_.status===429)){zo(a,_&&_.message||"That code did not work."),(y=(b=a.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||y.call(b);return}_&&_.status===401?s():_&&(_.status===404||_.status===400)?(zc(),Kc(a)):_&&_.status===403&&_.detail&&_.detail.error_code==="email_unverified"?(zo(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):_&&_.status===403?zo(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):zo(a,_&&_.message||"Something went wrong");return}zc(),og(a,o);try{await i(g.team_id,o.team_name)}catch(_){console.error("Joined the team but could not open it:",_),Vc(a),og(a,o)}};r.addEventListener("click",()=>c()),(p=a.querySelector("#invite-admin-code-form"))==null||p.addEventListener("submit",f=>{f.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),rx(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function og(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${u(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${u(t.team_name)}</a>
            </div>
        </div>`}function Yc(e){return cx(e,{user:me(),showAuth:t=>{Js(),t==="signup"?ug():dg()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),JE(),await Un({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{h.logout(),Tt(null),Qn(null),Yc(e)}})}async function rg(){const e=tg();if(e){await Yc(e);return}if(ig(window.location.pathname)){ag();return}Js()}async function Un({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=ME(window.location.pathname);if(i){await WE(i);return}const s=tg();if(s){await Yc(s);return}if(ig(window.location.pathname)){ag();return}vx(),bf(),Vo(),fx();const a=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(a){await dx(n,a,t);return}await No(t);const o=Rc();if(o.length===0&&!IE()){Wf();return}o.length===0&&ss("my-issues");try{if(o.length>0){const c=e&&o.find(d=>d.id===e)||o[0];await Oo(c,!0)}}finally{$f()}}async function dx(e,t,n){Bf(e.teams);try{await Oo(t,!0,{seed:e})}finally{$f()}Promise.resolve(n||No().then(Rc)).then(async i=>{var a;if(!Array.isArray(i))return;Bf(i);const s=i.find(o=>o.id===t.id);if(!s){await px(),window.location.reload();return}if(((a=A())==null?void 0:a.id)===s.id&&s.name!==A().name){Qn(s);const o=document.getElementById("current-team-name");o&&(o.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const ux=2e3;let Ci=null,lg=!1,cg=!1;function px(){return cg=!0,clearTimeout(Ci),Ci=null,Jr()}function Qc(){if(clearTimeout(Ci),Ci=null,cg)return Promise.resolve();const e=me(),t=A();return!(e!=null&&e.id)||!(t!=null&&t.id)||Lu(Yr())!==e.id||aE()!==t.id?Promise.resolve():ob(e.id,{user:e,teams:Rc(),teamId:t.id,projects:te(),labels:il(),members:Pt(),agents:ft(),issues:Pb({maxQueries:3})})}function mx(){clearTimeout(Ci),Ci=setTimeout(Qc,ux)}function fx(){lg||(lg=!0,Cb(mx),document.addEventListener("visibilitychange",gx),window.addEventListener("pagehide",hx))}function gx(){document.visibilityState==="hidden"&&Qc()}function hx(){Qc()}let Bi=null,Zs=null,kt=null,_t=null;function Xs(){Bi||(Bi=document.getElementById("auth-screen"),Zs=document.getElementById("main-screen"),kt=document.getElementById("login-form"),_t=document.getElementById("signup-form"))}function Js(){Xs(),Bi&&Bi.classList.remove("hidden"),Zs&&Zs.classList.add("hidden")}function vx(){Xs(),Bi&&Bi.classList.add("hidden"),Zs&&Zs.classList.remove("hidden")}function dg(){Xs(),kt&&kt.classList.remove("hidden"),_t&&_t.classList.add("hidden")}function ug(){Xs(),kt&&kt.classList.add("hidden"),_t&&_t.classList.remove("hidden")}async function bx(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),Tt(await h.getMe()),await Un(),$("Welcome back!","success")}catch(i){k("log in",i)}return!1}async function yx(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),Tt(await h.getMe()),await Un(),$("Account created successfully!","success")}catch(s){k("sign up",s)}return!1}function pg(){h.logout(),Tt(null),Qn(null),Js(),$("Signed out","success")}function wx(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function Vo(){var i;const e=me();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Bu(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?wx(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function $x(){Xs();const e=kt==null?void 0:kt.querySelector("form");e&&e.addEventListener("submit",s=>bx(s));const t=_t==null?void 0:_t.querySelector("form");t&&t.addEventListener("submit",s=>yx(s));const n=kt==null?void 0:kt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),ug()});const i=_t==null?void 0:_t.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),dg()})}let Zc=[];async function Xc(){try{Zc=await h.getApiKeys(),kx()}catch(e){k("load API keys",e)}}function kx(){const e=document.getElementById("api-keys-list");if(e){if(Zc.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Zc.map(t=>`
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
    `).join("")}}function _x(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,G()}async function Ex(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);F(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,G()}catch(n){k("create API key",n)}return!1}async function xx(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function Ix(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),$("API key revoked","success"),await Xc()}catch(n){k("revoke API key",n)}}se({"create-api-key":e=>{Ex(e)},"copy-api-key":()=>{xx()},"dismiss-api-key-modal":()=>{F(),Xc()},"revoke-api-key":(e,t)=>{Ix(t.keyId,t.keyName)}});let Jc=[];async function mg(){try{Jc=await h.getConnections(),Tx()}catch(e){k("load connected apps",e)}}function ed(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function Sx(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function Tx(){const e=document.getElementById("connected-apps-list");if(e){if(Jc.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Jc.map(t=>t.acts_as==="person"?Lx(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(ed(t))} ${Uo(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${u(t.agent?t.agent.name:"an agent")}</span>
                    <span>${u(Sx(t))}</span>
                    <span>policy ${u(t.policy)}</span>
                    <span class="api-key-date">Connected ${Ie(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ie(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${u(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(ed(t))}">Disconnect</button>
        </div>
    `).join("")}}function Lx(e){const n=`${e.device_name||"A device"} · ${ed(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${u(n)} ${Uo(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Ie(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Ie(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function fg(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),$("App disconnected","success"),await mg()}catch(n){k("disconnect app",n)}}se({"revoke-connection":(e,t)=>{fg(t.connectionId,t.connectionName)}});let td=[];async function gg(){try{td=await h.getPushDevices(),Ax()}catch(e){k("load push devices",e)}}const hg={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function vg(e){return e.label||e.platform||"Unnamed device"}function Ax(){const e=document.getElementById("push-devices-list");if(e){if(td.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=td.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(vg(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${u(t.platform)}</span>`:""}
                    <span>via ${u(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Ie(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Ie(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${u(String(t.failure_count))} failed deliveries</span>`:""}
                    ${hg[t.status]?`<span class="push-device-status">${u(hg[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(vg(t))}">Remove</button>
        </div>
    `).join("")}}async function Cx(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),$("Device removed","success"),await gg()}catch(n){k("remove push device",n)}}se({"remove-push-device":(e,t)=>{Cx(t.installationId,t.deviceName)}});let Wo=!1,en=0,bn=[],Ko=[];function Bx(e){Ko=e,bn=[...e]}function yn(){return Wo}function Dx(){if(Wo)return;Wo=!0,en=0,bn=[...Ko];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Yo()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Mx(n.target.value)),t.addEventListener("keydown",jx),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&Rx(Number(i.dataset.commandIndex))}),ea(),requestAnimationFrame(()=>t.focus())}function Yo(){Wo=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Mx(e){const t=e.toLowerCase().trim();t?bn=Ko.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):bn=[...Ko],en=0,ea()}function ea(){const e=document.getElementById("command-results");if(!e)return;if(bn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};bn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function Rx(e){en=e,ea()}function bg(e){const t=bn[e];t&&(Yo(),t.action())}function jx(e){switch(e.key){case"ArrowDown":e.preventDefault(),en=Math.min(en+1,bn.length-1),ea();break;case"ArrowUp":e.preventDefault(),en=Math.max(en-1,0),ea();break;case"Enter":e.preventDefault(),bg(en);break;case"Escape":e.preventDefault(),Yo();break}}se({"execute-command":(e,t)=>{bg(Number(t.commandIndex))}});const Px=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Switch project"},{key:"g p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"People"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function qx(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${u(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${u(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function Nx(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${u(e.title)}</h4>
        ${e.shortcuts.map(qx).join("")}
    </div>`}function yg(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${Px.map(Nx).join("")}
        </div>
    `,G()}const Qo=100,nd="status!=done,canceled",Ox=["created","updated","priority","status","title","estimate"];function Se(e){return e==null?"":u(String(e))}function wg(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${Se(n)}</a>`}function $g(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const id=[{id:"identifier",label:"ID",fixed:!0,render:e=>wg(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>wg(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>Se(Te(e.status))},{id:"priority",label:"Priority",render:e=>Se(Le(e.priority))},{id:"type",label:"Type",render:e=>Se(ct(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>Se($g(e,"assignee"))},{id:"creator",label:"Creator",render:e=>Se($g(e,"creator"))},{id:"project",label:"Project",render:e=>Se(e.project_key)},{id:"sprint",label:"Sprint",render:e=>Se(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ie(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${Se(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>Se(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${Se(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>Se(Ie(e.created_at))},{id:"updated",label:"Updated",render:e=>Se(Ie(e.updated_at))},{id:"completed",label:"Completed",render:e=>Se(Ie(e.completed_at))},{id:"due",label:"Due",render:e=>Se(Ie(e.due_date))}],Zo=Object.fromEntries(id.map(e=>[e.id,e])),Hx=id.filter(e=>e.fixed).map(e=>e.id),sd=["identifier","title","status","priority","assignee","updated"];function ad(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!Zo[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...sd]:[...Hx.filter(s=>!t.has(s)),...n]}function Fx(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function Ux(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?ad(t.get("cols").split(",")):[...sd],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function Gx(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!Fx(e.cols,sd)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function zx(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function Vx({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Qo,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",zx(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],p=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;Ox.includes(f)?(o.push("--sort",f,"--order",p?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function Wx(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function Kx(e,t){const n=ad(t).map(a=>Zo[a]),i=n.map(a=>`<th data-col="${m(a.id)}">${Se(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${m(a.id)}">${n.map(o=>`<td class="query-col-${m(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function Yx(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let N=null,od=null,nt=null,rd=0,Di=!1,kg=!1;function fe(e){return document.getElementById(e)}function _g(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Eg(e){const t=Gx({...od,cols:N.cols,group:N.group,view:N.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function ld(){N&&Co(N.teamScope?null:N.projectId)}function Qx(){N&&(!N.teamScope&&N.projectId!==Y()?yt(N.projectId):ld())}function Zx(){const e=fe("query-columns-menu");e&&(e.innerHTML=id.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${N.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${Se(t.label)}
        </label>`).join(""))}function Xo(e){const t=fe("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${Se(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function xg(e){const t=fe("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function cd(e){var t;(t=fe("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function ta(){const e=fe("query-results"),t=fe("query-pager");if(!e)return;if(!nt){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=nt;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=Kx(n,N.cols),t&&(t.innerHTML=Yx(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Di&&cd(!0))}async function Jo(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!N)return;const i=A(),s=N.teamScope?{teamId:i==null?void 0:i.id}:{projectId:N.projectId};if(!s.teamId&&!s.projectId){nt=null,ta(),Xo(N.teamScope?"Select a team first.":"Select a project.");return}const a=++rd,o=N.where===null?nd:N.where,r=fe("query-results");Di=!0,r&&r.classList.add("loading"),cd(!0);const l=()=>a===rd&&C()==="query";try{const c=await h.queryIssues({...s,where:o,order:N.order,skip:(N.page-1)*Qo,limit:Qo});if(!l())return;N.where=c.where,N.order=c.order||null,od=_g(N),nt={issues:c.issues||[],total:c.total,skip:c.skip};const d=fe("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),Xo(null),Di=!1,ta(),Eg(e),t&&t()}catch(c){if(!l())return;Di=!1,n?n():nt=null,ta(),Xo(Wx(c))}finally{a===rd&&(Di=!1,r&&r.classList.remove("loading"),cd(!1))}}function Ig(){if(!N)return;const e=fe("query-where");return N.where=e?e.value.trim():"",N.page=1,Jo("push")}function Xx(e){if(!N)return;const t={teamScope:N.teamScope,projectId:N.projectId,page:N.page};return N.teamScope=!e,e&&(N.projectId=e),N.page=1,xg(null),Jo("push",{onSuccess:()=>{e?yt(e):ef(),ld()},onFailure:()=>{Object.assign(N,t),ld()}})}function Jx(e,t){if(!N||!Zo[e]||Zo[e].fixed)return;const n=N.cols.filter(i=>i!==e);N.cols=ad(t?[...n,e]:n),ta(),Eg("replace")}function eI(e){if(!N||!nt||Di)return;const t=N.page+e;if(t<1||e>0&&nt.skip+nt.issues.length>=nt.total)return;const n={page:N.page,result:nt};return N.page=t,Jo("push",{onFailure:()=>{N.page=n.page,nt=n.result}})}async function tI(){if(!N)return null;const e=fe("query-where"),t=e?e.value.trim():N.where??nd,n=N.teamScope?null:te().find(o=>o.id===N.projectId),{command:i,warning:s}=Vx({where:t,order:N.order,teamScope:N.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Qo,skip:nt?nt.skip:0}),a=fe("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function nI(){var e,t,n,i,s,a;kg||(kg=!0,(e=fe("query-where"))==null||e.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&!o.isComposing&&(o.preventDefault(),Ig())}),(t=fe("query-run-btn"))==null||t.addEventListener("click",()=>Ig()),(n=fe("query-copy-cli-btn"))==null||n.addEventListener("click",()=>tI()),(i=fe("query-columns-btn"))==null||i.addEventListener("click",o=>{o.stopPropagation();const r=fe("query-columns-menu");if(!r)return;const l=r.classList.toggle("hidden")===!1;o.currentTarget.setAttribute("aria-expanded",String(l))}),(s=fe("query-columns-menu"))==null||s.addEventListener("change",o=>{o.target.matches('input[type="checkbox"]')&&Jx(o.target.value,o.target.checked)}),(a=fe("query-pager"))==null||a.addEventListener("click",o=>{const r=o.target.closest("button[data-query-page]");!r||r.disabled||eI(Number(r.dataset.queryPage))}),document.addEventListener("click",o=>{var l;const r=fe("query-columns-menu");r&&!r.classList.contains("hidden")&&!o.target.closest("#query-columns-picker")&&(r.classList.add("hidden"),(l=fe("query-columns-btn"))==null||l.setAttribute("aria-expanded","false"))}))}function iI(){var s,a;nI();const e=Ux(window.location.search),t=te();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(Y())?Y():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}N=e,od=_g(N),nt=null;const i=fe("query-where");return i&&(i.value=N.where===null?nd:N.where),(s=fe("query-cli-preview"))==null||s.classList.add("hidden"),(a=fe("query-columns-menu"))==null||a.classList.add("hidden"),Qx(),Zx(),Xo(null),xg(n),ta(),Jo("replace")}let er=[];function sI(){return er}dt(e=>{e==="currentProject"&&C()==="epics"&&wn()});let dd=0;const na=new Set(["done","canceled"]);let tr=!1;async function wn({fromMemory:e=!1}={}){var a;sl(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++dd,i=Ml(),s=e?ro("epics",i):void 0;s?Sg(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=A())!=null&&a.id)){er=[],t.innerHTML=V({icon:U.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=Y(),r=o?await h.getProjectEpicProgress(o):await h.getTeamEpicProgress(A().id);if(n!==dd||(fi("epics",i,r),s&&lo(s,r)))return;Sg(r,t)}catch(o){if(n!==dd)return;t.innerHTML=V({icon:U.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),k("load epics",o)}}function Sg(e,t){var i;const n=((e==null?void 0:e.untracked)||[]).some(s=>(s.awaiting_human||[]).length);if(!((i=e==null?void 0:e.epics)!=null&&i.length)&&!n){er=[],t.innerHTML=V({icon:U.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Ag(e,t)}function ud(e,t){return`${e} ${t}${e===1?"":"s"}`}function aI(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function ia(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function Nt(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function nr(e){const t=st(e);return t?/ago$|^just now$|future/.test(t)?t:`on ${t}`:""}function Tg(e){const t=e.children||{},n=ia(e);if(n<=0)return'<span class="meter-label">No tickets</span>';const i=t.done||0,s=`${aI(i,n)} done: ${i} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="meter" title="${m(s)}"><div class="meter-fill" style="width: ${Math.round(i/n*100)}%"></div></div>
        <span class="meter-label">${i} of ${n}</span>`}function oI(e){if(!e||e.length===0)return'<span class="epic-sprint-strip" aria-hidden="true"></span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${ud(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function rI(e){const t=e.in_flight||[],n=t.slice(0,2).map(s=>`${s.assignee?`<b>${u(s.assignee.name)}</b>`:"Unassigned"} on ${u(s.title)}`),i=(e.in_flight_count||t.length)-n.length;return i>0&&n.push(`+${i} more`),n.join(", ")}function Lg(e,t="shipped"){const n=e.last_shipped;return n?`${t} ${u(n.title)} ${u(nr(n.completed_at))}`:""}function ir(e,{sub:t,right:n,grouped:i}){const s=e.status_pinned&&!na.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",a=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",o=i?`<span class="epic-project-key">${u(e.project_key)}</span> `:"",r=e.owner?` <span class="epic-owner">· ${u(e.owner.name)}</span>`:"",l=ia(e)<=0;return`
        <div class="list-row-2line epic-row${na.has(e.status)?" epic-row-closed":""}${l?" epic-row-empty":""}" data-identifier="${m(e.identifier)}" title="${m(e.identifier)}">
            <span class="epic-spark">${oI(e.sprints)}</span>
            <span class="list-row-title">${o}${u(e.title)}${r}${s}${a}</span>
            <span class="list-row-sub">${t}</span>
            <span class="list-row-right">${n}</span>
        </div>`}function sr(e,t,n,i,s=""){return i?`
        <section class="epic-section epic-section-${e}">
            <div class="section-header"><h3>${t} <span class="section-count">${n}</span></h3></div>
            <div class="epic-section-rows">${i}</div>
            ${s}
        </section>`:""}function pd(e){return!na.has(e.status)&&ia(e)>0&&(e.open_children||0)===0}const md=5;function Ag(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=new Set([...n.map(x=>x.project_key),...i.map(x=>x.project_key)]).size>1,a=(x,w)=>s?`${u(x)} · ${w}`:w,o=n.filter(x=>!na.has(x.status)),r=o.filter(pd),l=o.filter(x=>!pd(x)&&(x.in_flight_count||0)>0).sort((x,w)=>Nt(w.last_activity_at)-Nt(x.last_activity_at)),c=o.filter(x=>!pd(x)&&!x.in_flight_count).sort((x,w)=>{var D,H;return(ia(x)<=0)-(ia(w)<=0)||Nt((D=w.last_shipped)==null?void 0:D.completed_at)-Nt((H=x.last_shipped)==null?void 0:H.completed_at)||Nt(w.last_activity_at)-Nt(x.last_activity_at)}),d=n.filter(x=>na.has(x.status)).sort((x,w)=>Nt(w.completed_at||w.last_activity_at)-Nt(x.completed_at||x.last_activity_at)),p=tr?d:d.slice(0,md),f=[...n.flatMap(x=>(x.awaiting_human||[]).map(w=>({a:w,where:a(x.project_key,u(x.title))}))),...i.flatMap(x=>(x.awaiting_human||[]).map(w=>({a:w,where:a(x.project_key,"No epic")})))].sort((x,w)=>Nt(x.a.since)-Nt(w.a.since)),g=f.map(({a:x,where:w})=>{const D=x.approval_mode==="review",H=x.requested_by_name?` by ${u(x.requested_by_name)}`:"";return`
        <div class="list-row-2line epic-ask-row" data-issue-identifier="${m(x.identifier)}" title="${m(x.identifier)}">
            <span class="epic-spark" aria-hidden="true"></span>
            <span class="list-row-title">${D?"Approve":"Complete"} ${u(x.ritual_name)}: ${u(x.title)}</span>
            <span class="list-row-sub">${w} · ${D?"attested":"requested"}${H} ${u(nr(x.since))}</span>
            <span class="list-row-right"><span class="list-row-action">${D?"Approve":"Complete"}</span></span>
        </div>`}).join(""),b=r.map(x=>ir(x,{grouped:s,sub:`Every ticket is done${x.last_shipped?` · last shipped ${u(nr(x.last_shipped.completed_at))}`:""}`,right:'<span class="list-row-action">Open epic</span>'})).join(""),y=l.map(x=>ir(x,{grouped:s,sub:[rI(x),Lg(x)].filter(Boolean).join(" · "),right:Tg(x)})).join(""),_=c.map(x=>{const w=x.children||{},D=w.todo?`${w.todo} ready to start`:w.backlog?`${w.backlog} in backlog`:"",H=x.last_shipped?Lg(x,"Last shipped"):"Nothing shipped yet";return ir(x,{grouped:s,sub:[H,D].filter(Boolean).join(" · "),right:Tg(x)})}).join(""),E=p.map(x=>{var w;return ir(x,{grouped:s,sub:x.completed_at?`Closed ${u(nr(x.completed_at))}`:"Closed",right:`<span class="meter-label">${ud(((w=x.children)==null?void 0:w.done)||0,"ticket")}</span>`})}).join(""),S=d.length>md?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${tr?`Show the latest ${md}`:`Show all ${d.length}`}</button>`:"",L=i.filter(x=>x.open),j=L.length?`<p class="epic-untracked-note">${L.map(x=>`${s?`${u(x.project_key)}: `:""}${ud(x.open,"open ticket")}`).join(", ")} under no epic.</p>`:"";er=[...r,...l,...c,...d],t.innerHTML=`
        <div class="epic-sections">
            ${sr("waiting","Waiting on you",f.length+r.length,g+b)}
            ${sr("moving","Moving now",l.length,y)}
            ${sr("quiet","Nothing in flight",c.length,_)}
            ${sr("shipped","Shipped",d.length,E,S?`<div class="epic-table-footer">${S}</div>`:"")}
            ${j}
        </div>
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=x=>{if(x.target.closest("[data-epics-toggle-closed]")){tr=!tr,sl(-1),Ag(t._epicProgress,t);return}const w=x.target.closest(".epic-ask-row");if(w&&w.dataset.issueIdentifier){Mo(w.dataset.issueIdentifier);return}const D=x.target.closest(".epic-row");D&&D.dataset.identifier&&yf(D.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function lI(){const e=Y(),t=te().map(n=>`
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
    `,G(),document.getElementById("create-epic-form").addEventListener("submit",cI),document.getElementById("create-epic-title").focus()}async function cI(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});F(),$(`Created epic ${s.identifier}`,"success"),wn()}catch(s){k("create epic",s)}}async function Cg(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){le(t.id,!1);return}await ar(t.id,!1)}else O("epics",!1)}catch{O("epics",!1)}}async function ar(e,t=!0){var n;try{t&&hn();const[i,s,a,o]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(i.issue_type!=="epic"){le(e,t);return}t&&history.pushState({epicId:e,view:C()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=C()||"epics",c=te().find(w=>w.id===i.project_id),d=i.assignee_id?$t(i.assignee_id):null,p=d?ut(d):null,f=sI(),g=(n=f.find(w=>w.id===i.id))==null?void 0:n.children,b=g?(g.total||0)-(g.canceled||0):s.filter(w=>w.status!=="canceled").length,y=g?g.done||0:s.filter(w=>w.status==="done").length,_=b>0?Math.round(y/b*100):0,E=f.findIndex(w=>w.id===i.id),S=E>0?f[E-1]:null,L=E>=0&&E<f.length-1?f[E+1]:null,j=E>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${j?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${S?`data-action="navigate-epic" data-epic-id="${m(S.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${E+1} / ${f.length}</span>
                            <button class="issue-nav-btn" ${L?`data-action="navigate-epic" data-epic-id="${m(L.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?u(c.name):"Project"} › ${u(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(i.title)}</h1>

                    ${i.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Rn(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${_===100?" epic-progress-complete":""}" style="width: ${_}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${y} of ${b} done</span>
                                <span>${_}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?V({icon:U.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(w=>{const D=w.assignee_id?$t(w.assignee_id):null,H=D?ut(D):null;return`
                                <div class="sub-issue-item" data-issue-id="${m(w.id)}" data-identifier="${m(w.identifier)}">
                                    <span class="sub-issue-status">${Qe(w.status)}</span>
                                    <span class="sub-issue-id">${u(w.identifier)}</span>
                                    <span class="sub-issue-title">${u(w.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(w.status||"backlog").replace(/_/g,"-")}">${Te(w.status)}</span>
                                    ${H?`<span class="sub-issue-assignee">${u(H)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?V({icon:U.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Cm(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Jl(w)}</span>
                                        <span class="activity-actor">by ${u(Zl(w))}</span>
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
                                    <span class="issue-label" style="background: ${ie(w.color)}20; color: ${ie(w.color)}">${u(w.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${u(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(i.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const x=r.querySelector(".sub-issues-list");x&&x.addEventListener("click",w=>{const D=w.target.closest(".sub-issue-item");D&&D.dataset.issueId&&le(D.dataset.issueId)})}catch(i){k("load epic",i)}}se({"navigate-epic":(e,t)=>{ar(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),$("Status now follows sub-issues"),await ar(t.epicId,!1)}catch(n){k("update epic",n)}}});function dI(e){let t=!1,n=null;return function(s){var o,r,l,c,d,p,f,g;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("people");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((p=e.isDetailViewActive)!=null&&p.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),(g=e.openProjectSwitcher)!=null&&g.call(e)||e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function uI(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function tn(e,t,n=Ma){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Bg(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function sa(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(Bg(),!1):!0:!1}function pI(e){const t=Ma;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,p,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||sa(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(p=e.isInlineDropdownOpen)!=null&&p.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((f=e.beforeNavigate)==null||f.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),tn(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),tn(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function mI(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||sa(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),tn(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),tn(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function $n(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function fI(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,p,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||sa(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var y,_,E,S;const b=!!((_=(y=document.activeElement)==null?void 0:y.closest)!=null&&_.call(y,"#inbox-list"));if((E=e.collapseInboxExpand)==null||E.call(e),tn(a+g,e.setSelectedIndex,t),b){const L=document.querySelector(`${t}.keyboard-selected`);(S=(L==null?void 0:L.querySelector(".inbox-row-toggle"))||L)==null||S.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((p=e.isEscapeLayerAbove)!=null&&p.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function gI(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||sa(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),tn(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),tn(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function hI(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function fd(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d,p;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||sa(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),tn(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),tn(r-1,e.setSelectedIndex,n);break;case"Enter":if((p=(d=a.target).closest)!=null&&p.call(d,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const vI=7,gd=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),Dg=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),bI='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',yI='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Mg=!1;function wI(){Mg||(Mg=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...gd,set(e){var t;gd.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...Dg,set(e){var t;Dg.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let $e=null,$I=0;function Rg({restoreFocus:e=!0}={}){return $e?($e.close(e),!0):!1}function kI(e,{returnFocus:t=!1}={}){var i;const n=(i=e==null?void 0:e._picker)==null?void 0:i.button;if(!n||n.disabled||!n.isConnected||typeof n.checkVisibility=="function"&&!n.checkVisibility({visibilityProperty:!0}))return!1;if(($e==null?void 0:$e.select)!==e){const s=document.activeElement;hd(e,n,t?s&&s!==document.body?s:null:void 0)}return!0}function _I(e=document){e.querySelectorAll("select[data-picker]").forEach(EI)}function EI(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${bI}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{jg(e,t),($e==null?void 0:$e.select)===e&&$e.refresh()};return e._picker={button:t,sync:n},wI(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),($e==null?void 0:$e.select)===e?Rg():hd(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),($e==null?void 0:$e.select)!==e&&hd(e,t)):s.key.length===1&&e.dataset.pickerKeys!=="pass"&&s.stopPropagation())}),n(),t}function jg(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"",s=(n==null?void 0:n.dataset.hint)||"",a=t.querySelector(".picker-label");a.textContent=i,s&&a.insertAdjacentHTML("afterbegin",`<span class="picker-label-hint">${u(s)}</span>`),t.disabled=e.disabled,t.title=i;const o=e.getAttribute("aria-label");o&&t.setAttribute("aria-label",i?`${o}: ${i}`:o)}function Pg(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),hint:t.dataset.hint||"",disabled:t.disabled}))}function hd(e,t,n){Rg({restoreFocus:!1});const i=Pg(e),s=`picker-list-${++$I}`,a=i.length>=vI,o=e.getAttribute("aria-label")||"Options",r=document.createElement("div");r.className="picker-popover",r.tabIndex=-1,r.innerHTML=`
        ${a?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(o)}"
            role="combobox" aria-expanded="true" aria-controls="${s}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${s}" tabindex="-1" aria-label="${m(o)}"></ul>
    `,document.body.appendChild(r);const l=r.querySelector(".picker-list"),c=r.querySelector(".picker-search"),d=I=>Math.max(0,I.findIndex(M=>!M.disabled));let p=i.findIndex(I=>I.value===e.value&&!I.disabled);p===-1&&(p=d(i));let f=i;const g=()=>{var M;l.innerHTML=f.length?f.map((R,ae)=>`
                <li role="option" id="${s}-${ae}" class="picker-option${ae===p?" active":""}${R.disabled?" disabled":""}"
                    data-index="${ae}" data-value="${m(R.value)}"
                    aria-selected="${R.value===e.value?"true":"false"}"${R.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${u(R.text)}</span>
                    ${R.hint?`<span class="picker-option-hint">${u(R.hint)}</span>`:""}
                    ${R.value===e.value?`<span class="picker-check">${yI}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const I=l.querySelector(".picker-option.active");I?(c||l).setAttribute("aria-activedescendant",I.id):(c||l).removeAttribute("aria-activedescendant"),(M=I==null?void 0:I.scrollIntoView)==null||M.call(I,{block:"nearest"})},b=()=>{var ue,be;const I=t.getBoundingClientRect(),M=((ue=window.visualViewport)==null?void 0:ue.width)||window.innerWidth,R=((be=window.visualViewport)==null?void 0:be.height)||window.innerHeight;r.style.minWidth=`${Math.min(Math.max(I.width,220),M-16)}px`,r.style.maxHeight="",r.style.top="0px";const ae=r.offsetWidth||Math.max(I.width,220),ge=r.offsetHeight;r.style.left=`${Math.max(8,Math.min(I.left,M-ae-8))}px`;const ot=R-I.bottom-12,B=I.top-12;if(ge>ot&&B>ot){const oe=Math.max(120,B);r.style.maxHeight=`${oe}px`,r.style.top=`${Math.max(8,I.top-4-Math.min(ge,oe))}px`}else r.style.maxHeight=`${Math.max(120,ot)}px`,r.style.top=`${I.bottom+4}px`},y=I=>{if(!I||I.disabled||e.disabled)return;if(![...e.options].some(R=>R.value===I.value&&!R.disabled)){ne(!0);return}const M=I.value!==e.value;gd.set.call(e,I.value),jg(e,t),ne(!0),M&&e.dispatchEvent(new Event("change",{bubbles:!0}))},_=I=>{let M=p+I;for(;M>=0&&M<f.length&&f[M].disabled;)M+=I;M<0||M>=f.length||(p=M,g())},E=(I,M)=>{let R=I;for(;R>=0&&R<f.length&&f[R].disabled;)R+=M;R>=0&&R<f.length&&(p=R,g())},S=I=>{if(!(I.metaKey||I.ctrlKey))switch(I.stopPropagation(),I.key){case"ArrowDown":I.preventDefault(),_(1);break;case"ArrowUp":I.preventDefault(),_(-1);break;case"Home":c||(I.preventDefault(),E(0,1));break;case"End":c||(I.preventDefault(),E(f.length-1,-1));break;case"PageDown":I.preventDefault(),E(Math.min(f.length-1,p+8),-1);break;case"PageUp":I.preventDefault(),E(Math.max(0,p-8),1);break;case"Enter":I.preventDefault(),y(f[p]);break;case"Escape":I.preventDefault(),ne(!0);break;case"Tab":ne(!0);break;case" ":c||(I.preventDefault(),y(f[p]));break;default:if(!c&&I.key.length===1&&!I.metaKey&&!I.ctrlKey&&!I.altKey){L=(Date.now()-j<700?L:"")+I.key.toLowerCase(),j=Date.now();const M=f.findIndex(R=>!R.disabled&&R.text.toLowerCase().startsWith(L));M!==-1&&(p=M,g())}}};let L="",j=0;const x=()=>{const I=c.value.trim().toLowerCase();f=I?i.filter(R=>R.text.toLowerCase().includes(I)||R.hint.toLowerCase().includes(I)):i;const M=f.findIndex(R=>R.value===e.value&&!R.disabled);p=!I&&M!==-1?M:d(f),g()},w=I=>{r.contains(I.target)||t.contains(I.target)||ne(!1)},D=()=>b(),H=I=>{I.key!=="Escape"||r.contains(I.target)||(I.preventDefault(),I.stopPropagation(),ne(!0))},J=()=>ne(!1);function ne(I){var M,R;($e==null?void 0:$e.popover)===r&&($e=null,r.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",w,!0),document.removeEventListener("keydown",H,!0),window.removeEventListener("popstate",J),window.removeEventListener("resize",D),window.removeEventListener("scroll",D,!0),I&&(n===void 0?t.focus({preventScroll:!0}):n!=null&&n.isConnected?n.focus({preventScroll:!0}):(R=(M=document.activeElement)==null?void 0:M.blur)==null||R.call(M)))}l.addEventListener("click",I=>{const M=I.target.closest(".picker-option");M&&y(f[Number(M.dataset.index)])}),l.addEventListener("mousemove",I=>{const M=I.target.closest(".picker-option");if(!M)return;const R=Number(M.dataset.index);R!==p&&(p=R,g())}),r.addEventListener("keydown",S),c&&c.addEventListener("input",x),document.addEventListener("pointerdown",w,!0),document.addEventListener("keydown",H,!0),window.addEventListener("popstate",J),window.addEventListener("resize",D),window.addEventListener("scroll",D,!0),$e={select:e,button:t,popover:r,close:ne,refresh:()=>{const I=Pg(e);!(I.length===i.length&&I.every((R,ae)=>R.value===i[ae].value&&R.text===i[ae].text&&R.hint===i[ae].hint&&R.disabled===i[ae].disabled))||e.disabled?ne(!1):g()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",s),t.classList.add("open"),g(),b(),(c||l).focus({preventScroll:!0})}const xI={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let W=null,kn=0;async function qg(e,t){var a,o;const n=xI[e];if(!n){k("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++kn;W=null;let s;try{s=await n.fetchList(t)}catch(r){k("load revision history",r);return}if(i===kn){if(W={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},W.viewVersion!=null)try{const r=await n.fetchOne(t,W.viewVersion);if(i!==kn)return;W.cache.set(W.viewVersion,r)}catch(r){i===kn&&k("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),or(),G()}}function or(){const e=document.getElementById("modal-content");if(!e||!W)return;if(W.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=II(),n=W.mode==="compare"?TI():SI();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function II(){const e=W.revisions.map(n=>{const i=W.mode==="view"?n.version===W.viewVersion:n.version===W.compareFromVersion||n.version===W.compareToVersion,s=W.mode==="compare"?n.version===W.compareFromVersion?' <span class="rev-tag">from</span>':n.version===W.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
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
  `}function SI(){const e=W.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=W.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${u(t.title)}</h3>`:"",i=t[W.adapter.bodyField]||"",s=i?`<div class="markdown-body">${gt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${u(t.author_name||"Unknown")} &middot; ${st(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function TI(){const e=W.compareFromVersion,t=W.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=W.cache.get(e),i=W.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[W.adapter.bodyField]||"",a=i[W.adapter.bodyField]||"",o=LI(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function LI(e,t){const n=e.split(`
`),i=t.split(`
`),s=AI(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${u(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${u(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${u(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function AI(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(aa(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(aa(a,"del",e[o]),o++):(aa(a,"add",t[r]),r++);for(;o<n;)aa(a,"del",e[o++]);for(;r<i;)aa(a,"add",t[r++]);return a}function aa(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function CI(e){if(!W)return;const t=W.token,n=W;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(W!==n||kn!==t)return;n.cache.set(e,i)}catch(i){W===n&&kn===t&&k("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),or()}function BI(){if(!W)return;const e=W.token,t=W;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{W===t&&kn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{W!==t||kn!==e||(s&&k("load revisions to compare",s),or())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;or()}se({"show-document-revisions":(e,t)=>{qg("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{qg("issue",t.issueId)},"select-revision-version":(e,t)=>{CI(Number(t.version))},"toggle-revision-compare":()=>{BI()},"close-revision-viewer":()=>{W=null,F()}});function rr(e){return ft().find(t=>t.id===(e==null?void 0:e.user_id))||null}function Ng(e){if(!e)return"Team-wide";const t=te().find(n=>n.id===e);return t?`Project ${t.key}`:"One project"}function Og(e,t=me()){return!(e!=null&&e.is_agent)||!t||!rr(e)?!1:e.owner_id===t.id||Si()}function Hg(e){const t=rr(e);return t?!!t.can_register:(e==null?void 0:e.kind)==="service"}function DI(e,t){var n,i;return((n=ft().find(s=>s.id===e))==null?void 0:n.name)||((i=t.find(s=>s.user_id===e))==null?void 0:i.name)}function nn(e,t){return`<dt>${u(e)}</dt><dd>${t}</dd>`}function lr(e,t){return e?`<a href="/people/${m(e)}" data-action="view-person" data-user-id="${m(e)}">${u(t||"Unknown")}</a>`:u(t||"Unknown")}function MI(e,t=[]){if(!(e!=null&&e.is_agent))return"";const n=rr(e);if(!n)return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">
                ${nn("Scope","A guest from another team, with a membership here")}
                ${nn("Owner",lr(e.owner_id,e.owner_name))}
            </dl>
        </section>`;const i=(n.kind||e.kind)==="session",s=Hg(e),a=[nn("Scope",u(Ng(n.agent_project_id??e.project_id))),nn("Owner",lr(e.owner_id||n.parent_user_id,e.owner_name||n.parent_user_name))];if(n.is_active===!1&&a.push(nn("Status","Deactivated: its keys no longer sign in")),i){const f=n.registered_by_id;a.push(nn("Registered by",f?lr(f,DI(f,t)):"A registrar")),a.push(nn("Last used",n.last_used_at?u(Ie(n.last_used_at)):"Never"))}else a.push(nn("Registrar",s?"Yes: registers one identity per session and cannot write as itself":"No"));if(s){const f=ft().filter(g=>g.registered_by_id===e.user_id&&g.is_active!==!1);a.push(nn("Sessions registered",f.length?f.map(g=>lr(g.id,g.name)).join(", "):"None active"))}const o=Og(e),r=m(e.user_id),l=m(e.name||"Agent"),c=n.is_active!==!1,d=o?`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Owner actions</h3></div>
            <div class="agent-profile-actions">
                ${c&&!i?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${r}" data-agent-name="${l}" data-can-register="${s?"true":"false"}">${s?"Stop being a registrar":"Make registrar"}</button>`:""}
                <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${r}" data-agent-name="${l}">Delete agent</button>
            </div>
        </section>`:"",p=o?`
        <section class="agent-profile-section">
            <div class="section-header agent-profile-section-head">
                <h3>Credentials</h3>
                ${c?`<button class="btn btn-secondary btn-small" data-action="generate-agent-key" data-agent-id="${r}" data-agent-name="${l}">Generate key</button>`:""}
            </div>
            <div id="agent-credentials" class="agent-credentials" data-agent-id="${r}" aria-busy="true"><div class="skeleton skeleton-title"></div></div>
        </section>`:"";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">${a.join("")}</dl>
        </section>
        ${p}
        ${d}
    `}let Fg=0;async function cr(e){var r;if(((r=document.getElementById("agent-credentials"))==null?void 0:r.dataset.agentId)!==e)return;const t=++Fg;let n,i;try{[n,i]=await Promise.all([h.getAgentKeys(e),h.getConnections().catch(()=>[])])}catch(l){n=null,console.error("Failed to load agent credentials:",l)}if(t!==Fg)return;const s=document.getElementById("agent-credentials");if(!s||s.dataset.agentId!==e)return;if(s.removeAttribute("aria-busy"),n===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load its keys.</p>';return}const a=(i||[]).filter(l=>{var c;return l.acts_as!=="person"&&((c=l.agent)==null?void 0:c.id)===e}),o=n.filter(l=>l.is_active);if(!o.length&&!a.length){s.innerHTML='<p class="person-bio-empty">No active keys or connected apps.</p>';return}s.innerHTML=[...o.map(l=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">API key <code>${u(l.key_prefix||"")}…</code>${l.name?` · ${u(l.name)}`:""}</div>
                    <div class="list-row-sub">Created ${u(Ie(l.created_at))}${l.owner_name?` by ${u(l.owner_name)}`:""} · ${l.last_used_at?`last used ${u(Ie(l.last_used_at))}`:"never used"}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-key" data-key-id="${m(l.id)}" data-agent-id="${m(e)}">Revoke</button>
                </div>
            </div>`),...a.map(l=>{var d;const c=((d=l.client)==null?void 0:d.name)||"An app";return`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">Connected app: ${u(c)}</div>
                    <div class="list-row-sub">Acts as this agent · connected ${u(Ie(l.created_at))}${l.last_used_at?` · last used ${u(Ie(l.last_used_at))}`:""}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-connection" data-connection-id="${m(l.id)}" data-connection-name="${m(c)}" data-agent-id="${m(e)}">Disconnect</button>
                </div>
            </div>`})].join("")}async function RI(e,t){if(confirm("Revoke this key? Anything signing in with it stops working at once."))try{await h.revokeApiKey(e),cr(t)}catch(n){k("revoke the key",n)}}const dr={bio:4e3,pronouns:40,tagline:120,name:255};let je=[],ur=null,Ug=new Map,vd=!1,pr=0,mr=null,Mi=null,oa=null,fr=!1,bd=0;async function Gg(e,t){return h.getTeamRoster(e,{includeIdle:t})}function jI(e,t){!t||ur!==e||(je=je.map(n=>n.user_id===t.user_id?t:n))}function PI(){return Array(4).fill(0).map(()=>`
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function qI(e){try{const t=await h.getTeamIssues(e,{status:["in_progress"],sort_by:"updated",order:"desc",limit:200}),n=new Map;for(const i of t||[])i.assignee_id&&(n.has(i.assignee_id)||n.set(i.assignee_id,[]),n.get(i.assignee_id).push(i));return n}catch(t){return console.error("Failed to load what the team is working on:",t),new Map}}async function gr(){const e=A();if(!e)return;const t=++pr,n=vd,i=document.getElementById("people-list");i&&(i.innerHTML=PI(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=vd),jf().then(()=>{t===pr&&(Si()?Fo():Pf(),ur===e.id&&Ri())});try{const[a,o]=await Promise.all([Gg(e.id,n),qI(e.id)]);if(t!==pr)return;je=a,ur=e.id,Ug=o,Ri()}catch(a){if(t!==pr)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=V({icon:U.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),k("load the roster",a)}}function hr(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function NI(e){const t=Ug.get(e.user_id)||[];if(t.length){const[n]=t,i=t.length>1?` and ${t.length-1} more`:"";return`<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${u(n.identifier)} ${u(n.title)}${i}`}return e.is_agent?`${e.owner_name?`Agent of ${u(e.owner_name)}`:"Agent"}${e.idle?" · idle":""}`:e.tagline?u(e.tagline):u(hr(e))}function OI(e){const t=m(e.user_id),n=e.mention_handle?` <span class="person-row-handle">@${u(e.mention_handle)}</span>`:"",i=[];return e.is_agent?(i.push(`<span class="badge badge-neutral">${u(Ng(e.project_id))}</span>`),Hg(e)?i.push('<span class="badge badge-accent">Registrar</span>'):e.kind==="session"&&i.push('<span class="badge badge-neutral">Session</span>')):e.role&&e.role!=="member"&&i.push(`<span class="badge badge-neutral">${u(hr(e))}</span>`),`
        <a class="list-row-2line person-row${e.idle?" person-row-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-row-avatar" aria-hidden="true">${Vt(e,`avatar person-avatar${e.is_agent?" person-avatar-agent":""}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${u(e.name)}${n}</span>
                <span class="list-row-sub">${NI(e)}</span>
            </span>
            <span class="list-row-right">${i.join("")}</span>
        </a>
    `}function zg(e,t,n,i=""){return`
        <div class="section-header people-section-header">
            <h3>${e} <span class="section-count">${t.length}</span></h3>${i}
        </div>
        <div class="people-rows">${t.map(OI).join("")||`<p class="people-empty">${n}</p>`}</div>
    `}function Ri(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=je.filter(a=>!a.is_agent),n=je.filter(a=>a.is_agent),i=me(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=zg("Humans",t,"No one yet.",s)+zg("Agents",n,"No agents yet.")+HI()}function HI(){var s;if(!Si())return"";const e=new Set(je.map(a=>a.user_id)),t=new Set(ft().map(a=>a.id)),n=(s=me())==null?void 0:s.id,i=Pt().filter(a=>!e.has(a.user_id)&&!t.has(a.user_id));return i.length?`
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
    `:""}function FI(e){return{user_id:e.id,name:e.name,avatar_url:e.avatar_url,pronouns:e.pronouns,tagline:e.tagline,bio:e.bio,mention_handle:null,is_agent:!0,role:null,kind:e.kind,owner_id:e.parent_user_id,owner_name:e.parent_user_name,project_id:e.agent_project_id,idle:!!e.idle,joined_at:e.created_at}}function Vg(e,t=me()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function Wg(e,t,{fresh:n=!1}={}){if(!n&&ur===e){const a=je.find(o=>o.user_id===t);if(a)return a}const s=(await Gg(e,!0)).find(a=>a.user_id===t)||null;return jI(e,s),s}let Kg=0,ra=null;async function vr(e,t=!0){var r;t&&hn(),vf();const n=++Kg,i=A();if(!i)return;const s=window.location.pathname,a=()=>{var l;return n!==Kg||((l=A())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let o;try{o=await Wg(i.id,e)}catch(l){if(a())return;k("load this profile",l),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}if(!a()){if(!o){const l=ft().find(c=>c.id===e);l&&(o=FI(l))}if(!o){$("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),ss("people"),Ps("people"),yd(o),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function UI(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function yd(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=UI();n.classList.remove("hidden"),n.dataset.userId=e.user_id,ra=e;const i=m(e.user_id),s=Vg(e),a=e.user_id===((l=me())==null?void 0:l.id),o=e.bio?`<div class="person-bio markdown-body">${Rn(e.bio)}</div>`:`<p class="person-bio-empty">${a?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${u(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
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
                <div class="person-role">${u(hr(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${o}
        <div class="person-sections">
            <section class="person-work">
                <div class="section-header"><h3>Working on</h3></div>
                <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
            </section>
            ${e.is_agent?MI(e,je):""}
            ${!e.is_agent||!rr(e)?GI(e):""}
        </div>
    `,t&&WI(e.user_id),Og(e)&&cr(e.user_id)}function GI(e){var i;if(!Si())return"";const t=Pt().find(s=>s.user_id===e.user_id);if(!t)return"";const n=e.user_id!==((i=me())==null?void 0:i.id)&&t.role!=="owner";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${u(hr(e))}</dd>
                ${t.user_email?`<dt>Email</dt><dd>${u(t.user_email)}</dd>`:""}
            </dl>
            ${n?`<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${m(e.user_id)}">Remove from team</button></div>`:""}
        </section>
    `}function br(){const e=document.getElementById("people-view");return!!e&&!e.classList.contains("hidden")}function zI(e){const{agentId:t,deleted:n,created:i,credentials:s}=e.detail||{};if(s){cr(t);return}if(n){je=je.filter(a=>a.user_id!==t),la(t)?O("people"):br()&&Ri();return}if(i){br()&&gr();return}la(t)&&ra?yd(ra):br()&&Ri()}function VI(e){const{userId:t}=e.detail||{};je=je.filter(n=>n.user_id!==t),la(t)?O("people"):br()&&Ri()}typeof window<"u"&&(window.addEventListener("chaotic:agent-changed",zI),window.addEventListener("chaotic:member-removed",VI));const Yg=["in_progress","in_review","todo"];let Qg=0;async function WI(e){const t=A();if(!t)return;const n=++Qg;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:Yg,sort_by:"status",order:"asc",limit:20})}catch(o){i=null,console.error("Failed to load their issues:",o)}if(n!==Qg)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const a=o=>Yg.indexOf(o.status);s.innerHTML=[...i].sort((o,r)=>a(o)-a(r)).map(o=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(o.identifier)}" data-action="person-open-issue" data-identifier="${m(o.identifier)}">
            <span class="person-issue-id">${u(o.identifier)}</span>
            <span class="person-issue-title">${u(o.title)}</span>
            <span class="person-issue-status">${u(String(o.status).replace("_"," "))}</span>
        </a>
    `).join("")}const wd=["name","avatar_url","pronouns","tagline","bio"];function KI(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(wd.map(n=>[n,t(n,e==null?void 0:e[n])]))}let $d=0;async function YI(e){var l;const t=me(),n=A();if(!t||!n)return;const i=++$d,s=window.location.pathname;let a;try{a=await Wg(n.id,e,{fresh:!0})}catch(c){i===$d&&k("load this profile",c);return}if(i!==$d||window.location.pathname!==s||((l=A())==null?void 0:l.id)!==n.id||(!a&&e===t.id&&(a={...t,user_id:t.id}),!a||!Vg(a,t)))return;mr=e,oa=a,Mi=KI(a),bd++;const o=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=o?"Edit your profile":`Edit ${a.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(a.name)}" maxlength="${dr.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(a.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            ${o?`<div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${ca?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${tl.test(a.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${ca?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${Jg}px.</p>
            </div>`:""}
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(a.pronouns)}" maxlength="${dr.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(a.tagline)}" maxlength="${dr.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${dr.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${u(a.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${fr?" disabled":""}>Save</button>
        </form>
    `,G()}function QI(e,t=null){const n=a=>{var o;return((o=e.querySelector(`#${a}`))==null?void 0:o.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const a of wd){const o=t?String(t[a]??""):null;(a==="avatar_url"?i[a]===(o==null?void 0:o.trim()):i[a]===o)||(s[a]=a==="avatar_url"?i[a]||null:i[a])}return s}function Zg(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");yd(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function la(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function Xg(){mr=null,Mi=null,oa=null,F()}async function ZI(e){e.preventDefault();const t=mr;if(!t||fr)return;const n=e.target.closest("form")||e.target,i=QI(n,Mi);if(!Object.keys(i).length){Xg();return}const s=me(),a=t===(s==null?void 0:s.id),o=oa,r=bd,l=n.querySelector('button[type="submit"]');fr=!0,l&&(l.disabled=!0);try{const c=a?await h.updateMe(i):await h.updateAgent(t,i),d=Object.fromEntries(wd.map(p=>[p,(c==null?void 0:c[p])??null]));je=je.map(p=>p.user_id===t?{...p,...d}:p),a&&(Tt({...s,...d}),Vo()),r===bd&&Xg(),$("Profile saved","success"),la(t)?Zg({...o,...d}):Ri()}catch(c){k("save the profile",c)}finally{fr=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const Jg=256;async function XI(e,t=Jg){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const a=c=>new Promise(d=>s.toBlob(d,c,.9)),o=await a("image/webp");let r=o&&o.type==="image/webp"?o:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await a("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let ca=!1;function eh(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function JI(e){var i;const t=me();if(!t||!e||e.id&&e.id!==t.id)return;const n=e.avatar_url??null;if(je=je.map(s=>s.user_id===t.id?{...s,avatar_url:n}:s),Tt({...t,avatar_url:n}),Vo(),mr===t.id&&Mi){const s=document.getElementById("profile-avatar");s&&(s.value=n||""),Mi={...Mi,avatar_url:n||""},oa={...oa,avatar_url:n},(i=document.getElementById("profile-photo-remove"))==null||i.classList.toggle("hidden",!tl.test(n||""))}ra&&la(t.id)&&Zg({...ra,avatar_url:n})}async function th(e,t,n){if(!ca){ca=!0,eh(!0);try{JI(await e()),$(t,"success")}catch(i){k(n,i)}finally{ca=!1,eh(!1)}}}async function eS(e,t=XI){var i;const n=(i=e.files)==null?void 0:i[0];if(n)try{await th(async()=>h.uploadAvatar(await t(n)),"Photo uploaded","upload the photo")}finally{e.value=""}}function tS(){return th(()=>h.deleteAvatar(),"Photo removed","remove the photo")}function kd(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}se({"view-person":(e,t)=>{e.type!=="click"||kd(e)||(e.preventDefault(),vr(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),YI(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=me();t&&vr(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&eS(n)},"remove-profile-photo":e=>{e.type==="click"&&tS()},"save-profile":e=>{ZI(e)},"retry-load-people":e=>{e.type==="click"&&gr()},"person-open-issue":(e,t)=>{e.type!=="click"||kd(e)||(e.preventDefault(),Mo(t.identifier))},"revoke-agent-key":(e,t)=>{e.type==="click"&&RI(t.keyId,t.agentId)},"revoke-agent-connection":async(e,t)=>{e.type==="click"&&(await fg(t.connectionId,t.connectionName),cr(t.agentId))},"back-to-roster":e=>{e.type!=="click"||kd(e)||(e.preventDefault(),O("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(vd=!!n.checked,gr())}});const nS=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Et=[],yr=null,wr=null,_d=0;dt(e=>{e==="currentProject"&&C()==="board"&&da()});async function da({fromMemory:e=!1}={}){Ca(-1);const t=++_d,n=Y();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=te().length===0?V({icon:U.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):V({icon:U.board,heading:"Select a project",description:"Board shows one project at a time. Pick one in the sidebar switcher, or press P."}));return}const i=document.getElementById("kanban-board"),s=Ml(),a=e?ro("board",s):void 0;a?(Et=a,yr=s,C()==="board"&&Lt(Et),ji()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await h.getIssues({project_id:n});if(t!==_d)return;const r=a&&lo(Et,o);Et=o,yr=s,fi("board",s,o),C()==="board"&&Lt(Et),r||ji()}catch(o){if(t!==_d)return;i&&(i.innerHTML=V({icon:U.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),k("load board",o)}}const Ed=fb(()=>da(),200);function ji(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;yr&&fi("board",yr,Et),e.innerHTML=nS.map(i=>{const s=Et.filter(a=>a.status===i.key);return`
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
                    `:s.map(iS).join("")}
                </div>
            </div>
        `}).join(""),sS(t)}function iS(e){const t=e.assignee_id?$t(e.assignee_id):null,n=t?ut(t):null,i=e.estimate!=null?gn(e.estimate,e.project_id):"",s=Do(e.estimate,e.project_id),a=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${u(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${Vt(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${u(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(Le(e.priority))}">${mt(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${u(i)}</span>`:""}
                ${a.map(o=>`<span class="issue-label" title="${m(o.name)}" style="background: ${ie(o.color)}20; color: ${ie(o.color)}">${u(o.name)}</span>`).join("")}
            </div>
        </div>
    `}function sS(e){const t=Pu();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Ca(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Ca(i),n[i].classList.add("keyboard-selected")}function aS(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),wr=t.dataset.id,t.classList.add("dragging")}function oS(e,t){t.classList.remove("dragging"),wr=null}function nh(e){const t=Et.find(n=>n.id===wr);return!!t&&t.status===e}function rS(e,t){e.preventDefault(),!nh(t.dataset.status)&&t.classList.add("drag-over")}function lS(e,t){t.classList.remove("drag-over")}function cS(e,t){e.preventDefault();const n=Et.find(i=>i.id===t.dataset.id);n&&nh(n.status)||t.classList.add("drag-over")}function dS(e,t){t.classList.remove("drag-over")}async function uS(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=Et.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,ji();try{const o=await h.updateIssue(n,{status:i});$("Status updated","success"),fs(o)}catch(o){s.status=a,ji(),k("update status",o)}}}async function pS(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=wr||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=Et.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,ji();try{const l=await h.updateIssue(n,{status:a});$("Status updated","success"),fs(l)}catch(l){o.status=r,ji(),k("update status",l)}}}se({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),le(t.id)):e.type==="dragstart"?aS(e,n):e.type==="dragend"?oS(e,n):e.type==="dragover"?cS(e,n):e.type==="dragleave"?dS(e,n):e.type==="drop"&&pS(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?rS(e,n):e.type==="dragleave"?lS(e,n):e.type==="drop"&&uS(e,n)},"retry-load-board":()=>da()});const _n=new Map,ih=6e4,xd=100;let Pe=null,$r=null,kr=null,ua=null,sh=!1;const ah={backlog:"var(--status-backlog)",todo:"var(--status-todo)",in_progress:"var(--status-in-progress)",in_review:"var(--status-in-review)",done:"var(--status-done)",canceled:"var(--status-canceled)"},oh={urgent:"var(--priority-urgent)",high:"var(--priority-high)",medium:"var(--priority-medium)",low:"var(--priority-low)",no_priority:"var(--priority-none)"},rh={api:null};let Id={...rh};function mS(e={}){Id={...rh,...e},Pe||(Pe=document.createElement("div"),Pe.className="issue-tooltip",Pe.style.display="none",document.body.appendChild(Pe),Pe.addEventListener("mouseenter",()=>{clearTimeout($r)}),Pe.addEventListener("mouseleave",()=>{Sd()})),sh||(document.addEventListener("mouseover",fS),document.addEventListener("mouseout",gS),sh=!0)}function fS(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=hS(t);if(n){if(n===ua&&Pe.style.display!=="none"){clearTimeout($r);return}clearTimeout(kr),kr=setTimeout(()=>{vS(t,n)},200)}}function gS(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(kr),$r=setTimeout(()=>{Sd()},150))}function hS(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function vS(e,t){ua=t;const n=e.getBoundingClientRect();Pe.style.left=`${n.left+window.scrollX}px`,Pe.style.top=`${n.bottom+window.scrollY+8}px`,Pe.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Pe.style.display="block";try{const i=await yS(t);if(ua!==t)return;wS(i)}catch{if(ua!==t)return;Pe.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Sd(){clearTimeout(kr),clearTimeout($r),Pe&&(Pe.style.display="none"),ua=null}function bS(){const e=Date.now();for(const[t,n]of _n.entries())e-n.timestamp>=ih&&_n.delete(t)}async function yS(e){_n.size>xd/2&&bS();const t=_n.get(e);if(t&&Date.now()-t.timestamp<ih)return t.issue;if(!Id.api)throw new Error("API not initialized");const n=await Id.api.getIssueByIdentifier(e);if(_n.size>=xd){const i=Array.from(_n.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,xd/2);for(const[a]of s)_n.delete(a)}return _n.set(e,{issue:n,timestamp:Date.now()}),n}function wS(e){const t=ah[e.status]||ah.backlog,n=oh[e.priority]||oh.no_priority,i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Pe.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${u(e.identifier)}</span>
            <span class="issue-tooltip-type">${u(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${u(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${$S(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${kS(e.priority)}</span>
        </div>
    `}function $S(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function kS(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function lh(){return!!document.querySelector(".description-inline-editor")}function Td(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function Ld(){var e;return Td("issue-detail-view")?((e=_e())==null?void 0:e.id)??null:null}function Gn(e){return!!e&&Ld()===e}function _S(){Ze("issue:created",LS),Ze("issue:updated",AS),Ze("issue:deleted",CS),Ze("comment",MS),Ze("relation",jS),Ze("attestation",PS),Ze("activity",NS),Ze("project",OS),Ze("sprint",HS),Ze("document",RS),Ze("inbox",qS),Ze("connection:reconnected",FS),Ze("connection:unauthorized",xS),Ze("connection:forbidden",IS),Ze("connection:superseded",ES)}function ES(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function xS(){h.logout(),Tt(null),Qn(null),Js(),$("Your session has ended. Please sign in again.","warning")}function IS(){$("Live updates stopped: you no longer have access to this team.","error")}function ch(e,t){var n;return e&&e===((n=me())==null?void 0:n.id)?"You":t||"Someone"}function SS(e){var s;const t=ch(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(ct(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${Le(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=me())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function TS(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${ch(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function dh(e,t,n){const i=$(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const a=()=>{var o;(o=i.querySelector(".toast-close"))==null||o.click(),Promise.resolve(le(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",a),s.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),a())})}}}function LS(e){var s;_s(C(),"board","sprints","epics");const t=X(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Je(a),C()==="issues"&&pt()}else Je([e,...t]),C()==="issues"&&pt(),dh(e,SS(e),"info");if(e.assignee_id===((s=me())==null?void 0:s.id)){const a=ze(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)An([e,...a]),C()==="my-issues"&&Cn();else if(r>=0){const l=[...a];l[r]=e,An(l),C()==="my-issues"&&Cn()}}C()==="board"?Ed():C()==="sprints"?pa():C()==="epics"&&wn(),Gn(e.parent_id)&&zn(e.parent_id)}function AS(e){_s(C(),"board","sprints","epics"),ja(e);const t=X();t.some(s=>s.id===e.id)&&Je(t.map(s=>s.id===e.id?e:s));const n=ze();n.some(s=>s.id===e.id)&&An(n.map(s=>s.id===e.id?e:s));const i=as();i.some(s=>s.id===e.id)&&Lt(i.map(s=>s.id===e.id?e:s)),C()==="issues"?pt():C()==="my-issues"?Cn():C()==="board"?Ed():C()==="sprints"?pa():C()==="epics"&&wn(),Gn(e.id)&&(lh()?Ql(e):zn(e.id))}function CS(e){var s,a;const t=e.title??((s=X().find(o=>o.id===e.id))==null?void 0:s.title)??((a=ze().find(o=>o.id===e.id))==null?void 0:a.title);_s(C(),"board","sprints","epics"),Mb(e.id),Je(X().filter(o=>o.id!==e.id)),An(ze().filter(o=>o.id!==e.id));const n=as();n.some(o=>o.id===e.id)&&Lt(n.filter(o=>o.id!==e.id)),C()==="issues"?pt():C()==="my-issues"?(Cn(),ei({showLoading:!1})):C()==="board"?Ed():C()==="sprints"?pa():C()==="epics"&&wn();const i=Gn(e.id);dh(null,TS(e,t),i?"warning":"info"),i&&O("my-issues")}const uh=250,BS=1e3,Pi=new Map;function zn(e){lh()?Ql():Ad(e,uh)}function Ad(e,t){let n=Pi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Pi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>DS(e),t))}async function DS(e){const t=Pi.get(e);if(!t)return;if(t.timer=null,!Gn(e)){Pi.delete(e);return}t.inFlight=!0;let n;try{n=await le(e,!1,{refresh:!0})}finally{t.inFlight=!1}Pi.get(e)===t&&(t.again?(t.again=!1,Ad(e,uh)):n==="retry"?Ad(e,BS):Pi.delete(e))}function MS(e){C()==="my-issues"&&ei({showLoading:!1}),Gn(e.issue_id)&&zn(e.issue_id),e.document_id&&Im(e.document_id)}function RS(e,{type:t}={}){_s(C(),"documents"),xm(),t==="deleted"?$$(e.id,e.title):Im(e.id)}function jS(e){const t=Ld();t&&(e.source_issue_id===t||e.target_issue_id===t)&&zn(t)}function PS(e){C()==="approvals"&&Mt(),Gn(e.issue_id)&&zn(e.issue_id)}function qS(e,t){var n;e.recipient_user_id===((n=me())==null?void 0:n.id)&&(Ei(),R_(t==null?void 0:t.type,e),C()==="inbox"&&!q_(t==null?void 0:t.type,e)&&Us({background:!0}))}function NS(e){C()==="my-issues"&&ei({showLoading:!1}),Gn(e.issue_id)&&zn(e.issue_id)}function OS(e,{type:t}){ht().then(()=>{C()==="projects"&&Nn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function pa(){const e=mk();e&&Td("sprint-detail-view")?bi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Td("sprints-view")&&fn().catch(t=>console.error("Failed to reload sprints:",t))}function HS(e,{type:t}={}){if(_s(C(),"sprints"),Gm(),C()==="sprints"?pa():C()==="my-issues"&&us(),t==="created")$(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";$(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function FS(){const e=C();Rl(),Ei(),e==="issues"?Bt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Jn().catch(n=>console.error("Failed to resync my issues:",n)),us().catch(n=>console.error("Failed to resync sprint status:",n)),ei({showLoading:!1})):e==="board"?da():e==="sprints"?pa():e==="epics"?wn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?ht().then(()=>{C()==="projects"&&Nn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?xm():e==="approvals"?Mt():e==="inbox"&&Us({background:!0});const t=Ld();t&&zn(t)}const US='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function ph(e){return Array.from(e.querySelectorAll(US)).filter(t=>!t.closest(".hidden, [hidden]"))}function mh(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function GS(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),mh(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=ph(t);n&&n.focus()}}}function ma(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),mh(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=ph(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&ma()});async function zS(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=Y();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=te().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Je([r,...X()]),pt();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=X();d.some(p=>p.id===c.id)?Je(d.filter(p=>p.id!==a)):d.some(p=>p.id===a)&&Je(d.map(p=>p.id===a?c:p)),pt(),ht(),$("Issue created!","success")}catch(c){Je(X().filter(d=>d.id!==a)),pt(),k("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}__({beforeScrollRestore:Sl,beforeNavigate:()=>{ek(),c_(),tf(null),Zn(null),Nu(null),ma(),Sd(),Co()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Cg(e[1]),!0;if(e[0]==="issue"&&e[1])return bo(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(bo(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(i0(e[1]),!0):e[0]==="sprint"&&e[1]?(hk(e[1]),!0):e[0]==="people"&&e[1]?(vr(decodeURIComponent(e[1]),!1),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(lf(e[1]),!0):!1},detailPopstate:e=>e.epicId?(ar(e.epicId,!1),!0):e.issueId?(le(e.issueId,!1),!0):e.identifier?(bo(e.identifier),!0):e.documentId?(Ce(e.documentId,!1),!0):e.sprintId?(bi(e.sprintId,!1),!0):e.personId?(vr(e.personId,!1),!0):!1,restoreProject:()=>{const e=pf();e&&te().some(t=>t.id===e)&&yt(e)},issueNavigate:e=>bo(e),epicNavigate:e=>Cg(e)}),k_({"my-issues":()=>{us(),Jn(),ei()},approvals:()=>{Mt()},inbox:()=>{Us({focusFirst:!0})},issues:()=>{var r;nw(),rw(),dw();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Dn().length>0||Mn().length>0;s||Bt();const a=kp().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Ua())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),Ga())}}),o=Fp().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>Bt()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{iI()},epics:()=>{wn({fromMemory:!0})},board:()=>{da({fromMemory:!0})},projects:()=>{Nn(),ht().then(Nn)},sprints:()=>{fn({fromMemory:!0})},rituals:()=>{Mk()},documents:()=>{qn(null,null,{fromMemory:!0})},people:gr,settings:()=>{Xc(),mg(),gg(),ws()}});function VS(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||F()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>F())}function WS(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>cf(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>p_());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>m_()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>df(a))})}function KS(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>km("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>km("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>_m());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>h$());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Yt())}function YS(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>ap())}function QS(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>cw());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Gy());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>zy()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Ka("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Ka("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Ka("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Ka("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Ya())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Qa())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>_l())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>El())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Za())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>Xa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>at());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>at());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>at());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Bt());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>Kp());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>zS(g))}function ZS(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>jk(t.dataset.tab))})}function XS(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Rf());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>ms()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),O(o.dataset.view),r.detail>0&&Bg())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>lE());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>ma());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>GS());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>ms())}function JS(e){ma(),$n()&&O(C()),C()==="query"?Xx(e):e?yt(e):ef()}function fh(){return kI(document.getElementById(Ao),{returnFocus:!0})}se({"navigate-to":(e,t)=>{O(t.view)},"switch-project":(e,t,n)=>{e.type==="change"&&JS(n.value)},showCreateIssueModal:()=>ms(),showCreateEpicModal:()=>lI(),"retry-load-epics":()=>wn(),showCreateProjectModal:()=>of(),showCreateDocumentModal:()=>Tm(),showCreateTeamModal:()=>Ff(),showEditTeamModal:()=>kE(),showInviteModal:()=>Nf(),showCreateApiKeyModal:()=>_x(),showCreateAgentModal:()=>Kw(),resetOnboarding:()=>Yf(),logout:()=>pg(),navigateToProjects:()=>O("projects")});async function e0(){if(!h.getToken()){await rg();return}bf();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await ab(Lu(h.getToken()));if(n){t.then(i=>{Tt(i),Vo()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await Jr(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),$("Showing saved data — check your connection and reload","error")}),Tt(n.user),await Un({teamsRequest:e,snapshot:n});return}try{const i=await t;Tt(i),await Un({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await rg();return}console.error("Failed to load current user on boot:",i),Js(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{var e;Sb(),$x(),XS(),VS(),YS(),QS(),ZS(),WS(),KS(),t0(),_I(),(e=document.querySelector(`[data-picker-for="${Ao}"]`))==null||e.setAttribute("aria-keyshortcuts","P"),n0(),mS({api:h}),_S(),await e0()});function t0(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Hv()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Fv(n?"light":"dark")})}function n0(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Mo(i)}}})}async function i0(e){try{await Ce(e,!1)}catch{O("documents",!1)}}document.addEventListener("keydown",pI({getCurrentView:C,getSelectedIndex:Ru,setSelectedIndex:Tn,viewIssue:le,showEditIssueModal:Am,showInlineDropdown:yl,isInlineDropdownOpen:ni,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:$n,beforeNavigate:Sl})),document.addEventListener("keydown",mI({getCurrentView:C,getSelectedIndex:hb,setSelectedIndex:ju,viewDocument:Ce,showEditDocumentModal:Lm,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",gI({getCurrentView:C,getSelectedIndex:Pu,setSelectedIndex:Ca,viewIssue:le,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",fI({getCurrentView:C,getSelectedIndex:vb,setSelectedIndex:Ba,toggleInboxExpand:tE,collapseInboxExpand:H_,archiveInboxEntry:eE,isInlineDropdownOpen:ni,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",hI()),document.addEventListener("keydown",fd({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&bi(e.dataset.sprintId)},getCurrentView:C,getSelectedIndex:bb,setSelectedIndex:qu,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",fd({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&yf(e.dataset.identifier)},getCurrentView:C,getSelectedIndex:yb,setSelectedIndex:sl,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",fd({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:C,getSelectedIndex:Kb,setSelectedIndex:Yb,isInlineDropdownOpen:ni,isModalOpen:Ge,isCommandPaletteOpen:yn,isDetailViewActive:$n}));function gh(){var e;O("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function s0(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||!!document.querySelector("#issue-detail-view details.related-add[open]")||p$()}document.addEventListener("keydown",dI({closeModal:F,closeSidebar:ma,navigateTo:O,openProjectSwitcher:fh,showCreateIssueModal:ms,showKeyboardShortcutsHelp:yg,isModalOpen:Ge,focusSearch:gh,isInlineDropdownOpen:ni,closeInlineDropdowns:mb,isModalDirty:ub,focusModalField:Au,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),ai();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:s0,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),Bx([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>O("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>O("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>O("board"),category:"Navigation"},{id:"switch-project",title:"Switch project",subtitle:"Change the project every view shows",icon:"🔀",shortcut:"P",action:()=>fh(),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"G P",action:()=>O("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>O("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>O("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>O("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>O("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>O("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>O("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to People",subtitle:"Everyone on the team, people and agents",icon:"👥",shortcut:"G T",action:()=>O("people"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>O("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{O("issues"),setTimeout(ms,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{O("projects"),setTimeout(of,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{O("documents"),setTimeout(Tm,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Ff(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:gh,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{O("people"),setTimeout(Nf,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>yg(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Yf(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>pg(),category:"Account"}]),document.addEventListener("keydown",uI({isModalOpen:Ge,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:yn,openCommandPalette:Dx,closeCommandPalette:Yo})),window.marked=K,window.DOMPurify=yu,console.log("Chaotic frontend loaded via Vite")})();
