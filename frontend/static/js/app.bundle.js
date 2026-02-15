var Hm=Object.defineProperty;var Om=(Ae,re,ot)=>re in Ae?Hm(Ae,re,{enumerable:!0,configurable:!0,writable:!0,value:ot}):Ae[re]=ot;var O=(Ae,re,ot)=>Om(Ae,typeof re!="symbol"?re+"":re,ot);(function(){"use strict";var Ni;function Ae(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var re=Ae();function ot(e){re=e}var qt={exec:()=>null};function j(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(le.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var le={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Yr=/^(?:[ \t]*(?:\n|$))+/,Xr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ut=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,el=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ys=/(?:[*+-]|\d{1,9}[.)])/,Qi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ea=j(Qi).replace(/bull/g,ys).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),tl=j(Qi).replace(/bull/g,ys).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ws=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nl=/^[^\n]+/,ks=/(?!\s*\])(?:\\.|[^\[\]\\])+/,sl=j(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ks).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),il=j(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ys).getRegex(),Tn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$s=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,al=j("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$s).replace("tag",Tn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ta=j(ws).replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex(),ol=j(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ta).getRegex(),Es={blockquote:ol,code:Xr,def:sl,fences:Qr,heading:el,hr:Ut,html:al,lheading:ea,list:il,newline:Yr,paragraph:ta,table:qt,text:nl},na=j("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex(),rl={...Es,lheading:tl,table:na,paragraph:j(ws).replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",na).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex()},ll={...Es,html:j(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$s).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:qt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:j(ws).replace("hr",Ut).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ea).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},cl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,dl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,sa=/^( {2,}|\\)\n(?!\s*$)/,ul=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,_n=/[\p{P}\p{S}]/u,Is=/[\s\p{P}\p{S}]/u,ia=/[^\s\p{P}\p{S}]/u,pl=j(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Is).getRegex(),aa=/(?!~)[\p{P}\p{S}]/u,ml=/(?!~)[\s\p{P}\p{S}]/u,gl=/(?:[^\s\p{P}\p{S}]|~)/u,fl=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,oa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,hl=j(oa,"u").replace(/punct/g,_n).getRegex(),vl=j(oa,"u").replace(/punct/g,aa).getRegex(),ra="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",bl=j(ra,"gu").replace(/notPunctSpace/g,ia).replace(/punctSpace/g,Is).replace(/punct/g,_n).getRegex(),yl=j(ra,"gu").replace(/notPunctSpace/g,gl).replace(/punctSpace/g,ml).replace(/punct/g,aa).getRegex(),wl=j("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ia).replace(/punctSpace/g,Is).replace(/punct/g,_n).getRegex(),kl=j(/\\(punct)/,"gu").replace(/punct/g,_n).getRegex(),$l=j(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),El=j($s).replace("(?:-->|$)","-->").getRegex(),Il=j("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",El).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Tl=j(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),la=j(/^!?\[(label)\]\[(ref)\]/).replace("label",xn).replace("ref",ks).getRegex(),ca=j(/^!?\[(ref)\](?:\[\])?/).replace("ref",ks).getRegex(),_l=j("reflink|nolink(?!\\()","g").replace("reflink",la).replace("nolink",ca).getRegex(),Ts={_backpedal:qt,anyPunctuation:kl,autolink:$l,blockSkip:fl,br:sa,code:dl,del:qt,emStrongLDelim:hl,emStrongRDelimAst:bl,emStrongRDelimUnd:wl,escape:cl,link:Tl,nolink:ca,punctuation:pl,reflink:la,reflinkSearch:_l,tag:Il,text:ul,url:qt},xl={...Ts,link:j(/^!?\[(label)\]\((.*?)\)/).replace("label",xn).getRegex(),reflink:j(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xn).getRegex()},_s={...Ts,emStrongRDelimAst:yl,emStrongLDelim:vl,url:j(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Sl={..._s,br:j(sa).replace("{2,}","*").getRegex(),text:j(_s.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Sn={normal:Es,gfm:rl,pedantic:ll},Gt={normal:Ts,gfm:_s,breaks:Sl,pedantic:xl},Cl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},da=e=>Cl[e];function Te(e,t){if(t){if(le.escapeTest.test(e))return e.replace(le.escapeReplace,da)}else if(le.escapeTestNoEncode.test(e))return e.replace(le.escapeReplaceNoEncode,da);return e}function ua(e){try{e=encodeURI(e).replace(le.percentDecode,"%")}catch{return null}return e}function pa(e,t){var a;const n=e.replace(le.findPipe,(o,r,c)=>{let l=!1,d=r;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),s=n.split(le.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(le.slashPipe,"|");return s}function zt(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Ll(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function ma(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function Al(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var Cn=class{constructor(e){O(this,"options");O(this,"rules");O(this,"lexer");this.options=e||re}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:zt(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Al(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=zt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:zt(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=zt(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const l=r.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${d}`:d;const m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=m,n.length===0)break;const p=a.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const h=p,b=h.raw+`
`+n.join(`
`),I=this.blockquote(b);a[a.length-1]=I,s=s.substring(0,s.length-h.raw.length)+I.raw,i=i.substring(0,i.length-h.text.length)+I.text;break}else if((p==null?void 0:p.type)==="list"){const h=p,b=h.raw+`
`+n.join(`
`),I=this.list(b);a[a.length-1]=I,s=s.substring(0,s.length-p.raw.length)+I.raw,i=i.substring(0,i.length-h.raw.length)+I.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,A=>" ".repeat(3*A.length)),p=e.split(`
`,1)[0],h=!m.trim(),b=0;if(this.options.pedantic?(b=2,d=m.trimStart()):h?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=m.slice(b),b+=t[1].length),h&&this.rules.other.blankLine.test(p)&&(l+=p+`
`,e=e.substring(p.length+1),c=!0),!c){const A=this.rules.other.nextBulletRegex(b),M=this.rules.other.hrRegex(b),N=this.rules.other.fencesBeginRegex(b),B=this.rules.other.headingBeginRegex(b),F=this.rules.other.htmlBeginRegex(b);for(;e;){const w=e.split(`
`,1)[0];let K;if(p=w,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),K=p):K=p.replace(this.rules.other.tabCharGlobal,"    "),N.test(p)||B.test(p)||F.test(p)||A.test(p)||M.test(p))break;if(K.search(this.rules.other.nonSpaceChar)>=b||!p.trim())d+=`
`+K.slice(b);else{if(h||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||N.test(m)||B.test(m)||M.test(m))break;d+=`
`+p}!h&&!p.trim()&&(h=!0),l+=w+`
`,e=e.substring(w.length+1),m=K.slice(b)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let I=null,S;this.options.gfm&&(I=this.rules.other.listIsTask.exec(d),I&&(S=I[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!I,checked:S,loose:!1,text:d,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const l=i.items[c].tokens.filter(m=>m.type==="space"),d=l.length>0&&l.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=d}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=pa(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(pa(r,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=zt(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Ll(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),ma(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return ma(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,l=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);const m=[...s[0]][0].length,p=e.slice(0,a+s.index+m+r);if(Math.min(a,r)%2){const b=p.slice(1,-1);return{type:"em",raw:p,text:b,tokens:this.lexer.inlineTokens(b)}}const h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Be=class Yi{constructor(t){O(this,"tokens");O(this,"options");O(this,"state");O(this,"tokenizer");O(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||re,this.options.tokenizer=this.options.tokenizer||new Cn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:le,block:Sn.normal,inline:Gt.normal};this.options.pedantic?(n.block=Sn.pedantic,n.inline=Gt.pedantic):this.options.gfm&&(n.block=Sn.gfm,this.options.breaks?n.inline=Gt.breaks:n.inline=Gt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Sn,inline:Gt}}static lex(t,n){return new Yi(n).lex(t)}static lexInline(t,n){return new Yi(n).inlineTokens(t)}lex(t){t=t.replace(le.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(le.tabCharGlobal,"    ").replace(le.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const d=t.slice(1);let m;this.options.extensions.startBlock.forEach(p=>{m=p.call({lexer:this},d),typeof m=="number"&&m>=0&&(l=Math.min(l,m))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,l;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(p=>(d=p.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const p=n.at(-1);d.type==="text"&&(p==null?void 0:p.type)==="text"?(p.raw+=d.raw,p.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let m=t;if((l=this.options.extensions)!=null&&l.startInline){let p=1/0;const h=t.slice(1);let b;this.options.extensions.startInline.forEach(I=>{b=I.call({lexer:this},h),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(m=t.substring(0,p+1))}if(d=this.tokenizer.inlineText(m)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const p=n.at(-1);(p==null?void 0:p.type)==="text"?(p.raw+=d.raw,p.text+=d.text):n.push(d);continue}if(t){const p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Ln=class{constructor(e){O(this,"options");O(this,"parser");this.options=e||re}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(le.notSpaceStart))==null?void 0:a[0],i=e.replace(le.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Te(s)+'">'+(n?i:Te(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Te(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Te(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Te(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=ua(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Te(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=ua(e);if(i===null)return Te(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Te(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Te(e.text)}},xs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},De=class Xi{constructor(t){O(this,"options");O(this,"renderer");O(this,"textRenderer");this.options=t||re,this.options.renderer=this.options.renderer||new Ln,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xs}static parse(t,n){return new Xi(n).parse(t)}static parseInline(t,n){return new Xi(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=d||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],d+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},An=(Ni=class{constructor(e){O(this,"options");O(this,"block");this.options=e||re}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Be.lex:Be.lexInline}provideParser(){return this.block?De.parse:De.parseInline}},O(Ni,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ni),Bl=class{constructor(...e){O(this,"defaults",Ae());O(this,"options",this.setOptions);O(this,"parse",this.parseMarkdown(!0));O(this,"parseInline",this.parseMarkdown(!1));O(this,"Parser",De);O(this,"Renderer",Ln);O(this,"TextRenderer",xs);O(this,"Lexer",Be);O(this,"Tokenizer",Cn);O(this,"Hooks",An);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Ln(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Cn(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new An;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];An.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(m=>c.call(i,m));const d=r.call(i,l);return c.call(i,d)}:i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Be.lex(e,t??this.defaults)}parser(e,t){return De.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Be.lex:Be.lexInline,c=a.hooks?a.hooks.provideParser():e?De.parse:De.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Te(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},rt=new Bl;function R(e,t){return rt.parse(e,t)}R.options=R.setOptions=function(e){return rt.setOptions(e),R.defaults=rt.defaults,ot(R.defaults),R},R.getDefaults=Ae,R.defaults=re,R.use=function(...e){return rt.use(...e),R.defaults=rt.defaults,ot(R.defaults),R},R.walkTokens=function(e,t){return rt.walkTokens(e,t)},R.parseInline=rt.parseInline,R.Parser=De,R.parser=De.parse,R.Renderer=Ln,R.TextRenderer=xs,R.Lexer=Be,R.lexer=Be.lex,R.Tokenizer=Cn,R.Hooks=An,R.parse=R,R.options,R.setOptions,R.use,R.walkTokens,R.parseInline,De.parse,Be.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:ga,setPrototypeOf:fa,isFrozen:Dl,getPrototypeOf:Ml,getOwnPropertyDescriptor:jl}=Object;let{freeze:ce,seal:be,create:Ss}=Object,{apply:Cs,construct:Ls}=typeof Reflect<"u"&&Reflect;ce||(ce=function(t){return t}),be||(be=function(t){return t}),Cs||(Cs=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),Ls||(Ls=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const Bn=ue(Array.prototype.forEach),Rl=ue(Array.prototype.lastIndexOf),ha=ue(Array.prototype.pop),Kt=ue(Array.prototype.push),Pl=ue(Array.prototype.splice),Dn=ue(String.prototype.toLowerCase),As=ue(String.prototype.toString),Bs=ue(String.prototype.match),Wt=ue(String.prototype.replace),Nl=ue(String.prototype.indexOf),Hl=ue(String.prototype.trim),$e=ue(Object.prototype.hasOwnProperty),de=ue(RegExp.prototype.test),Vt=Ol(TypeError);function ue(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Cs(e,t,s)}}function Ol(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Ls(e,n)}}function L(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Dn;fa&&fa(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Dl(t)||(t[s]=a),i=a)}e[i]=!0}return e}function Fl(e){for(let t=0;t<e.length;t++)$e(e,t)||(e[t]=null);return e}function _e(e){const t=Ss(null);for(const[n,s]of ga(e))$e(e,n)&&(Array.isArray(s)?t[n]=Fl(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=_e(s):t[n]=s);return t}function Jt(e,t){for(;e!==null;){const s=jl(e,t);if(s){if(s.get)return ue(s.get);if(typeof s.value=="function")return ue(s.value)}e=Ml(e)}function n(){return null}return n}const va=ce(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ds=ce(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ms=ce(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ql=ce(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),js=ce(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ul=ce(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ba=ce(["#text"]),ya=ce(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Rs=ce(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),wa=ce(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Mn=ce(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gl=be(/\{\{[\w\W]*|[\w\W]*\}\}/gm),zl=be(/<%[\w\W]*|[\w\W]*%>/gm),Kl=be(/\$\{[\w\W]*/gm),Wl=be(/^data-[\-\w.\u00B7-\uFFFF]+$/),Vl=be(/^aria-[\-\w]+$/),ka=be(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Jl=be(/^(?:\w+script|data):/i),Zl=be(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),$a=be(/^html$/i),Yl=be(/^[a-z][.\w]*(-[.\w]+)+$/i);var Ea=Object.freeze({__proto__:null,ARIA_ATTR:Vl,ATTR_WHITESPACE:Zl,CUSTOM_ELEMENT:Yl,DATA_ATTR:Wl,DOCTYPE_NAME:$a,ERB_EXPR:zl,IS_ALLOWED_URI:ka,IS_SCRIPT_OR_DATA:Jl,MUSTACHE_EXPR:Gl,TMPLIT_EXPR:Kl});const Zt={element:1,text:3,progressingInstruction:7,comment:8,document:9},Xl=function(){return typeof window>"u"?null:window},Ql=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Ia=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ta(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Xl();const t=x=>Ta(x);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Zt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:p,trustedTypes:h}=e,b=c.prototype,I=Jt(b,"cloneNode"),S=Jt(b,"remove"),A=Jt(b,"nextSibling"),M=Jt(b,"childNodes"),N=Jt(b,"parentNode");if(typeof o=="function"){const x=n.createElement("template");x.content&&x.content.ownerDocument&&(n=x.content.ownerDocument)}let B,F="";const{implementation:w,createNodeIterator:K,createDocumentFragment:Ie,getElementsByTagName:ie}=n,{importNode:ae}=s;let W=Ia();t.isSupported=typeof ga=="function"&&typeof N=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ze,ERB_EXPR:Mt,TMPLIT_EXPR:ft,DATA_ATTR:xm,ARIA_ATTR:Sm,IS_SCRIPT_OR_DATA:Cm,ATTR_WHITESPACE:xr,CUSTOM_ELEMENT:Lm}=Ea;let{IS_ALLOWED_URI:Sr}=Ea,Q=null;const Cr=L({},[...va,...Ds,...Ms,...js,...ba]);let te=null;const Lr=L({},[...ya,...Rs,...wa,...Mn]);let V=Object.seal(Ss(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$n=null,Hi=null;const jt=Object.seal(Ss(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ar=!0,Oi=!0,Br=!1,Dr=!0,Rt=!1,ps=!0,ht=!1,Fi=!1,qi=!1,Pt=!1,ms=!1,gs=!1,Mr=!0,jr=!1;const Am="user-content-";let Ui=!0,En=!1,Nt={},Ce=null;const Gi=L({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Rr=null;const Pr=L({},["audio","video","img","source","image","track"]);let zi=null;const Nr=L({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),fs="http://www.w3.org/1998/Math/MathML",hs="http://www.w3.org/2000/svg",Ke="http://www.w3.org/1999/xhtml";let Ht=Ke,Ki=!1,Wi=null;const Bm=L({},[fs,hs,Ke],As);let vs=L({},["mi","mo","mn","ms","mtext"]),bs=L({},["annotation-xml"]);const Dm=L({},["title","style","font","a","script"]);let In=null;const Mm=["application/xhtml+xml","text/html"],jm="text/html";let Y=null,Ot=null;const Rm=n.createElement("form"),Hr=function(u){return u instanceof RegExp||u instanceof Function},Vi=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ot&&Ot===u)){if((!u||typeof u!="object")&&(u={}),u=_e(u),In=Mm.indexOf(u.PARSER_MEDIA_TYPE)===-1?jm:u.PARSER_MEDIA_TYPE,Y=In==="application/xhtml+xml"?As:Dn,Q=$e(u,"ALLOWED_TAGS")?L({},u.ALLOWED_TAGS,Y):Cr,te=$e(u,"ALLOWED_ATTR")?L({},u.ALLOWED_ATTR,Y):Lr,Wi=$e(u,"ALLOWED_NAMESPACES")?L({},u.ALLOWED_NAMESPACES,As):Bm,zi=$e(u,"ADD_URI_SAFE_ATTR")?L(_e(Nr),u.ADD_URI_SAFE_ATTR,Y):Nr,Rr=$e(u,"ADD_DATA_URI_TAGS")?L(_e(Pr),u.ADD_DATA_URI_TAGS,Y):Pr,Ce=$e(u,"FORBID_CONTENTS")?L({},u.FORBID_CONTENTS,Y):Gi,$n=$e(u,"FORBID_TAGS")?L({},u.FORBID_TAGS,Y):_e({}),Hi=$e(u,"FORBID_ATTR")?L({},u.FORBID_ATTR,Y):_e({}),Nt=$e(u,"USE_PROFILES")?u.USE_PROFILES:!1,Ar=u.ALLOW_ARIA_ATTR!==!1,Oi=u.ALLOW_DATA_ATTR!==!1,Br=u.ALLOW_UNKNOWN_PROTOCOLS||!1,Dr=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Rt=u.SAFE_FOR_TEMPLATES||!1,ps=u.SAFE_FOR_XML!==!1,ht=u.WHOLE_DOCUMENT||!1,Pt=u.RETURN_DOM||!1,ms=u.RETURN_DOM_FRAGMENT||!1,gs=u.RETURN_TRUSTED_TYPE||!1,qi=u.FORCE_BODY||!1,Mr=u.SANITIZE_DOM!==!1,jr=u.SANITIZE_NAMED_PROPS||!1,Ui=u.KEEP_CONTENT!==!1,En=u.IN_PLACE||!1,Sr=u.ALLOWED_URI_REGEXP||ka,Ht=u.NAMESPACE||Ke,vs=u.MATHML_TEXT_INTEGRATION_POINTS||vs,bs=u.HTML_INTEGRATION_POINTS||bs,V=u.CUSTOM_ELEMENT_HANDLING||{},u.CUSTOM_ELEMENT_HANDLING&&Hr(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=u.CUSTOM_ELEMENT_HANDLING.tagNameCheck),u.CUSTOM_ELEMENT_HANDLING&&Hr(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Rt&&(Oi=!1),ms&&(Pt=!0),Nt&&(Q=L({},ba),te=[],Nt.html===!0&&(L(Q,va),L(te,ya)),Nt.svg===!0&&(L(Q,Ds),L(te,Rs),L(te,Mn)),Nt.svgFilters===!0&&(L(Q,Ms),L(te,Rs),L(te,Mn)),Nt.mathMl===!0&&(L(Q,js),L(te,wa),L(te,Mn))),u.ADD_TAGS&&(typeof u.ADD_TAGS=="function"?jt.tagCheck=u.ADD_TAGS:(Q===Cr&&(Q=_e(Q)),L(Q,u.ADD_TAGS,Y))),u.ADD_ATTR&&(typeof u.ADD_ATTR=="function"?jt.attributeCheck=u.ADD_ATTR:(te===Lr&&(te=_e(te)),L(te,u.ADD_ATTR,Y))),u.ADD_URI_SAFE_ATTR&&L(zi,u.ADD_URI_SAFE_ATTR,Y),u.FORBID_CONTENTS&&(Ce===Gi&&(Ce=_e(Ce)),L(Ce,u.FORBID_CONTENTS,Y)),u.ADD_FORBID_CONTENTS&&(Ce===Gi&&(Ce=_e(Ce)),L(Ce,u.ADD_FORBID_CONTENTS,Y)),Ui&&(Q["#text"]=!0),ht&&L(Q,["html","head","body"]),Q.table&&(L(Q,["tbody"]),delete $n.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=u.TRUSTED_TYPES_POLICY,F=B.createHTML("")}else B===void 0&&(B=Ql(h,i)),B!==null&&typeof F=="string"&&(F=B.createHTML(""));ce&&ce(u),Ot=u}},Or=L({},[...Ds,...Ms,...ql]),Fr=L({},[...js,...Ul]),Pm=function(u){let k=N(u);(!k||!k.tagName)&&(k={namespaceURI:Ht,tagName:"template"});const T=Dn(u.tagName),q=Dn(k.tagName);return Wi[u.namespaceURI]?u.namespaceURI===hs?k.namespaceURI===Ke?T==="svg":k.namespaceURI===fs?T==="svg"&&(q==="annotation-xml"||vs[q]):!!Or[T]:u.namespaceURI===fs?k.namespaceURI===Ke?T==="math":k.namespaceURI===hs?T==="math"&&bs[q]:!!Fr[T]:u.namespaceURI===Ke?k.namespaceURI===hs&&!bs[q]||k.namespaceURI===fs&&!vs[q]?!1:!Fr[T]&&(Dm[T]||!Or[T]):!!(In==="application/xhtml+xml"&&Wi[u.namespaceURI]):!1},Le=function(u){Kt(t.removed,{element:u});try{N(u).removeChild(u)}catch{S(u)}},vt=function(u,k){try{Kt(t.removed,{attribute:k.getAttributeNode(u),from:k})}catch{Kt(t.removed,{attribute:null,from:k})}if(k.removeAttribute(u),u==="is")if(Pt||ms)try{Le(k)}catch{}else try{k.setAttribute(u,"")}catch{}},qr=function(u){let k=null,T=null;if(qi)u="<remove></remove>"+u;else{const J=Bs(u,/^[\r\n\t ]+/);T=J&&J[0]}In==="application/xhtml+xml"&&Ht===Ke&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");const q=B?B.createHTML(u):u;if(Ht===Ke)try{k=new p().parseFromString(q,In)}catch{}if(!k||!k.documentElement){k=w.createDocument(Ht,"template",null);try{k.documentElement.innerHTML=Ki?F:q}catch{}}const oe=k.body||k.documentElement;return u&&T&&oe.insertBefore(n.createTextNode(T),oe.childNodes[0]||null),Ht===Ke?ie.call(k,ht?"html":"body")[0]:ht?k.documentElement:oe},Ur=function(u){return K.call(u.ownerDocument||u,u,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Ji=function(u){return u instanceof m&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof d)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},Gr=function(u){return typeof r=="function"&&u instanceof r};function We(x,u,k){Bn(x,T=>{T.call(t,u,k,Ot)})}const zr=function(u){let k=null;if(We(W.beforeSanitizeElements,u,null),Ji(u))return Le(u),!0;const T=Y(u.nodeName);if(We(W.uponSanitizeElement,u,{tagName:T,allowedTags:Q}),ps&&u.hasChildNodes()&&!Gr(u.firstElementChild)&&de(/<[/\w!]/g,u.innerHTML)&&de(/<[/\w!]/g,u.textContent)||u.nodeType===Zt.progressingInstruction||ps&&u.nodeType===Zt.comment&&de(/<[/\w]/g,u.data))return Le(u),!0;if(!(jt.tagCheck instanceof Function&&jt.tagCheck(T))&&(!Q[T]||$n[T])){if(!$n[T]&&Wr(T)&&(V.tagNameCheck instanceof RegExp&&de(V.tagNameCheck,T)||V.tagNameCheck instanceof Function&&V.tagNameCheck(T)))return!1;if(Ui&&!Ce[T]){const q=N(u)||u.parentNode,oe=M(u)||u.childNodes;if(oe&&q){const J=oe.length;for(let me=J-1;me>=0;--me){const Ve=I(oe[me],!0);Ve.__removalCount=(u.__removalCount||0)+1,q.insertBefore(Ve,A(u))}}}return Le(u),!0}return u instanceof c&&!Pm(u)||(T==="noscript"||T==="noembed"||T==="noframes")&&de(/<\/no(script|embed|frames)/i,u.innerHTML)?(Le(u),!0):(Rt&&u.nodeType===Zt.text&&(k=u.textContent,Bn([ze,Mt,ft],q=>{k=Wt(k,q," ")}),u.textContent!==k&&(Kt(t.removed,{element:u.cloneNode()}),u.textContent=k)),We(W.afterSanitizeElements,u,null),!1)},Kr=function(u,k,T){if(Mr&&(k==="id"||k==="name")&&(T in n||T in Rm))return!1;if(!(Oi&&!Hi[k]&&de(xm,k))){if(!(Ar&&de(Sm,k))){if(!(jt.attributeCheck instanceof Function&&jt.attributeCheck(k,u))){if(!te[k]||Hi[k]){if(!(Wr(u)&&(V.tagNameCheck instanceof RegExp&&de(V.tagNameCheck,u)||V.tagNameCheck instanceof Function&&V.tagNameCheck(u))&&(V.attributeNameCheck instanceof RegExp&&de(V.attributeNameCheck,k)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(k,u))||k==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&de(V.tagNameCheck,T)||V.tagNameCheck instanceof Function&&V.tagNameCheck(T))))return!1}else if(!zi[k]){if(!de(Sr,Wt(T,xr,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&u!=="script"&&Nl(T,"data:")===0&&Rr[u])){if(!(Br&&!de(Cm,Wt(T,xr,"")))){if(T)return!1}}}}}}}return!0},Wr=function(u){return u!=="annotation-xml"&&Bs(u,Lm)},Vr=function(u){We(W.beforeSanitizeAttributes,u,null);const{attributes:k}=u;if(!k||Ji(u))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0};let q=k.length;for(;q--;){const oe=k[q],{name:J,namespaceURI:me,value:Ve}=oe,Ft=Y(J),Zi=Ve;let ne=J==="value"?Zi:Hl(Zi);if(T.attrName=Ft,T.attrValue=ne,T.keepAttr=!0,T.forceKeepAttr=void 0,We(W.uponSanitizeAttribute,u,T),ne=T.attrValue,jr&&(Ft==="id"||Ft==="name")&&(vt(J,u),ne=Am+ne),ps&&de(/((--!?|])>)|<\/(style|title|textarea)/i,ne)){vt(J,u);continue}if(Ft==="attributename"&&Bs(ne,"href")){vt(J,u);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){vt(J,u);continue}if(!Dr&&de(/\/>/i,ne)){vt(J,u);continue}Rt&&Bn([ze,Mt,ft],Zr=>{ne=Wt(ne,Zr," ")});const Jr=Y(u.nodeName);if(!Kr(Jr,Ft,ne)){vt(J,u);continue}if(B&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!me)switch(h.getAttributeType(Jr,Ft)){case"TrustedHTML":{ne=B.createHTML(ne);break}case"TrustedScriptURL":{ne=B.createScriptURL(ne);break}}if(ne!==Zi)try{me?u.setAttributeNS(me,J,ne):u.setAttribute(J,ne),Ji(u)?Le(u):ha(t.removed)}catch{vt(J,u)}}We(W.afterSanitizeAttributes,u,null)},Nm=function x(u){let k=null;const T=Ur(u);for(We(W.beforeSanitizeShadowDOM,u,null);k=T.nextNode();)We(W.uponSanitizeShadowNode,k,null),zr(k),Vr(k),k.content instanceof a&&x(k.content);We(W.afterSanitizeShadowDOM,u,null)};return t.sanitize=function(x){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,T=null,q=null,oe=null;if(Ki=!x,Ki&&(x="<!-->"),typeof x!="string"&&!Gr(x))if(typeof x.toString=="function"){if(x=x.toString(),typeof x!="string")throw Vt("dirty is not a string, aborting")}else throw Vt("toString is not a function");if(!t.isSupported)return x;if(Fi||Vi(u),t.removed=[],typeof x=="string"&&(En=!1),En){if(x.nodeName){const Ve=Y(x.nodeName);if(!Q[Ve]||$n[Ve])throw Vt("root node is forbidden and cannot be sanitized in-place")}}else if(x instanceof r)k=qr("<!---->"),T=k.ownerDocument.importNode(x,!0),T.nodeType===Zt.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?k=T:k.appendChild(T);else{if(!Pt&&!Rt&&!ht&&x.indexOf("<")===-1)return B&&gs?B.createHTML(x):x;if(k=qr(x),!k)return Pt?null:gs?F:""}k&&qi&&Le(k.firstChild);const J=Ur(En?x:k);for(;q=J.nextNode();)zr(q),Vr(q),q.content instanceof a&&Nm(q.content);if(En)return x;if(Pt){if(ms)for(oe=Ie.call(k.ownerDocument);k.firstChild;)oe.appendChild(k.firstChild);else oe=k;return(te.shadowroot||te.shadowrootmode)&&(oe=ae.call(s,oe,!0)),oe}let me=ht?k.outerHTML:k.innerHTML;return ht&&Q["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&de($a,k.ownerDocument.doctype.name)&&(me="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+me),Rt&&Bn([ze,Mt,ft],Ve=>{me=Wt(me,Ve," ")}),B&&gs?B.createHTML(me):me},t.setConfig=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Vi(x),Fi=!0},t.clearConfig=function(){Ot=null,Fi=!1},t.isValidAttribute=function(x,u,k){Ot||Vi({});const T=Y(x),q=Y(u);return Kr(T,q,k)},t.addHook=function(x,u){typeof u=="function"&&Kt(W[x],u)},t.removeHook=function(x,u){if(u!==void 0){const k=Rl(W[x],u);return k===-1?void 0:Pl(W[x],k,1)[0]}return ha(W[x])},t.removeHooks=function(x){W[x]=[]},t.removeAllHooks=function(){W=Ia()},t}var ec=Ta();const tc="/api";class nc{constructor(){try{this.token=localStorage.getItem("chaotic_token")}catch(t){console.warn("Failed to access localStorage:",t),this.token=null}}setToken(t){this.token=t;try{t?localStorage.setItem("chaotic_token",t):localStorage.removeItem("chaotic_token")}catch(n){console.warn("Failed to persist token to localStorage:",n)}}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${tc}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){const c=typeof r.detail=="string"?r.detail:"An error occurred";throw new Error(c)}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const $=new nc;window.api=$;let bt=null;function D(){document.getElementById("modal-overlay").classList.remove("hidden")}function P(){document.getElementById("modal-overlay").classList.add("hidden")}function f(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.remove()},3e3)}function Yt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),bt&&(document.removeEventListener("keydown",bt),bt=null)}function sc(e){bt&&document.removeEventListener("keydown",bt),bt=e,e&&document.addEventListener("keydown",e)}function jn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(Yt(),document.removeEventListener("click",s))};return setTimeout(()=>document.addEventListener("click",s),0),()=>document.removeEventListener("click",s)}Object.assign(window,{showModal:D,closeModal:P,showToast:f,closeAllDropdowns:Yt,registerDropdownClickOutside:jn});function Je(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Me(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ps(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ge(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function g(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function _(e){return g(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Xt(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function E(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}let yt=null,Qt=null,en=null,tn=null;function Rn(){yt||(yt=document.getElementById("auth-screen"),Qt=document.getElementById("main-screen"),en=document.getElementById("login-form"),tn=document.getElementById("signup-form"))}function Pn(){Rn(),yt&&yt.classList.remove("hidden"),Qt&&Qt.classList.add("hidden")}function _a(){Rn(),yt&&yt.classList.add("hidden"),Qt&&Qt.classList.remove("hidden")}function xa(){Rn(),en&&en.classList.remove("hidden"),tn&&tn.classList.add("hidden")}function Sa(){Rn(),en&&en.classList.add("hidden"),tn&&tn.classList.remove("hidden")}async function Ca(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await $.login(t,n),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),f("Welcome back!","success")}catch(s){f(`Login failed: ${s.message}`,"error")}return!1}async function La(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await $.signup(t,n,s),await $.login(n,s),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),f("Account created successfully!","success")}catch(i){f(`Signup failed: ${i.message}`,"error")}return!1}function Ns(){$.logout(),window.currentUser=null,window.currentTeam=null,Pn(),f("Signed out","success")}function Aa(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Ba(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Aa(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${_(s)}" alt="${_(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}Object.assign(window,{showAuthScreen:Pn,showMainScreen:_a,showLogin:xa,showSignup:Sa,handleLogin:Ca,handleSignup:La,logout:Ns,updateUserInfo:Ba,isImageAvatar:Aa});function Da(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let wt=[],Nn=[],U=new Set,kt="list",lt=!1,Hs=null;try{const e=localStorage.getItem("chaotic_doc_view_mode");(e==="list"||e==="grid")&&(kt=e)}catch{}function ic(e){if(e!=="list"&&e!=="grid")return;kt=e,e==="grid"&&lt&&Hn();try{localStorage.setItem("chaotic_doc_view_mode",e)}catch{}const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),je()}function Ma(){if(kt!=="list")return;lt=!0,U.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=Hn),je(),Et()}function Hn(){lt=!1,U.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=Ma),je(),Et()}function ac(){Hs&&clearTimeout(Hs),Hs=setTimeout(()=>{je()},300)}function oc(){const e=document.getElementById("doc-search");e&&(e.value=""),je()}function rc(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),je()}function lc(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),je()}function cc(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${g(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),c=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${g(c)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function je(){var s,i,a,o;const e=((i=(s=document.getElementById("doc-search"))==null?void 0:s.value)==null?void 0:i.toLowerCase())||"",t=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",n=((o=document.getElementById("doc-sort"))==null?void 0:o.value)||"updated_desc";cc(),Nn=wt.filter(r=>{var c,l;if(e){const d=(c=r.title)==null?void 0:c.toLowerCase().includes(e),m=(l=r.content)==null?void 0:l.toLowerCase().includes(e);if(!d&&!m)return!1}return!(t&&r.project_id!==t)}),Nn.sort((r,c)=>{switch(n){case"title_asc":return(r.title||"").localeCompare(c.title||"");case"title_desc":return(c.title||"").localeCompare(r.title||"");case"updated_asc":return new Date(r.updated_at)-new Date(c.updated_at);case"updated_desc":default:return new Date(c.updated_at)-new Date(r.updated_at)}}),ja("",kt)}async function $t(e,t=null){var n;if(e||(e=(n=window.currentTeam)==null?void 0:n.id),!!e){if(t===null){const s=document.getElementById("doc-project-filter");s!=null&&s.value&&(t=s.value)}try{wt=await $.getDocuments(e,t);const s=document.getElementById("doc-view-list"),i=document.getElementById("doc-view-grid");s&&i&&(s.classList.toggle("active",kt==="list"),i.classList.toggle("active",kt==="grid")),je()}catch(s){f(s.message,"error")}}}function dc(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${ge(t.color)}; color: white;">${g(t.name)}</span>`).join(" ")}function uc(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${dc(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${_(e.id)}" onclick="viewDocument('${E(e.id)}')">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${g(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${g(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?g(Da(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${g(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function pc(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${ge(r.color)}; color: white;">${g(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Da(e.content).substring(0,80):"No content",i=lt?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${E(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${U.has(e.id)?"checked":""}>
       </div>`:"",a=lt&&U.has(e.id)?" selected":"",o=lt?`toggleDocSelection('${E(e.id)}')`:`viewDocument('${E(e.id)}')`;return`
    <div class="list-item document-list-item${a}" onclick="${o}">
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
  `}function ja(e="",t="list"){var l,d;const n=document.getElementById("documents-list");if(!n)return;U.clear(),Et();const s=Nn.length>0||(l=document.getElementById("doc-search"))!=null&&l.value?Nn:wt;if(s.length===0){const m=(d=document.getElementById("doc-search"))==null?void 0:d.value;n.innerHTML=`
      <div class="empty-state">
        <h3>${m?"No documents match your search":"No documents yet"}</h3>
        <p>${m?"Try a different search term":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?uc:pc,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=window.getProjects?window.getProjects():[];s.forEach(m=>{let p,h;if(e==="project")if(p=m.project_id||"__global__",p==="__global__")h="Global (Team-wide)";else{const b=r.find(I=>I.id===m.project_id);h=b?b.name:"Unknown Project"}else e==="sprint"&&(p=m.sprint_id||"__no_sprint__",h=m.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:h,docs:[]}),o[p].docs.push(m)});let c="";for(const[m,p]of Object.entries(o)){const h=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${g(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${h}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function mc(e){U.has(e)?U.delete(e):U.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=U.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",U.has(e)),Et()}function gc(){wt.forEach(e=>U.add(e.id)),wt.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Et()}function Ra(){U.clear(),wt.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.remove("selected")}),Et()}function Et(){const e=document.getElementById("doc-bulk-actions");e&&(lt?(e.classList.remove("hidden"),U.size>0?e.innerHTML=`
        <span class="bulk-count">${U.size} selected</span>
        <button class="btn btn-secondary btn-small" onclick="showBulkMoveModal()">Move to Project</button>
        <button class="btn btn-danger btn-small" onclick="bulkDeleteDocuments()">Delete</button>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="clearDocSelection()">Clear</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function fc(){if(U.size===0){f("No documents selected","error");return}const t=(window.getProjects?window.getProjects():[]).map(n=>`<option value="${n.id}">${g(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${U.size} Document${U.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleBulkMove(event)">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${U.size} selected document${U.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,D()}async function hc(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(U);let s=0,i=0;for(const r of n)try{await $.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}P(),Ra(),i===0?f(`Moved ${s} document${s>1?"s":""}!`,"success"):f(`Moved ${s}, failed ${i}`,"warning");const a=(o=window.currentTeam)==null?void 0:o.id;return await $t(a),!1}async function vc(){var a;if(U.size===0){f("No documents selected","error");return}const e=U.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(U);let n=0,s=0;for(const o of t)try{await $.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}Hn(),s===0?f(`Deleted ${n} document${n>1?"s":""}!`,"success"):f(`Deleted ${n}, failed ${s}`,"warning");const i=(a=window.currentTeam)==null?void 0:a.id;await $t(i)}async function Ee(e,t=!0){try{const n=await $.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(m=>m.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(m=>g(m));let a="";try{const m=await $.getDocumentIssues(n.id);m.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${m.map(h=>`
          <div class="linked-item">
            <span class="linked-item-id">${g(h.identifier)}</span>
            <span class="linked-item-title">${g(h.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${E(n.id)}', '${E(h.id)}')" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${E(n.id)}')">+ Link Issue</button>
          </div>
        `:a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <p class="empty-state-small">No linked issues</p>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${E(n.id)}')">+ Link Issue</button>
          </div>
        `}catch{}let o="";try{const m=await $.getDocumentComments(n.id);o=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${m.length===0?'<div class="comments-empty">No comments yet</div>':m.map(h=>{var b,I;return`
            <div class="comment" data-comment-id="${_(h.id)}">
              <div class="comment-avatar">${((I=(b=h.author_name)==null?void 0:b.charAt(0))==null?void 0:I.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${g(h.author_name||"Unknown")}</span>
                  <span class="comment-date">${Xt(h.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(h.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${E(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(m){console.error("Failed to load comments:",m)}let r=null,c=null;if(n.project_id){const p=(window.getProjects?window.getProjects():[]).find(h=>h.id===n.project_id);if(r=p?p.name:null,n.sprint_id)try{const h=await $.getSprint(n.sprint_id);c=h?h.name:null}catch{}}let l="";r?(l=`<span class="badge badge-primary">${g(r)}</span>`,c&&(l+=` <span class="badge badge-info">${g(c)}</span>`)):l='<span class="badge badge-secondary">Global</span>';let d="";n.labels&&n.labels.length>0?d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(p=>`
        <span class="label-badge" style="background-color: ${ge(p.color)}; color: white;">
          ${g(p.name)}
          <button class="btn-remove-label" onclick="removeLabelFromDoc('${E(n.id)}', '${E(p.id)}')" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${E(n.id)}')">+ Add Label</button>
        </div>
      `:d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <p class="empty-state-small">No labels</p>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${E(n.id)}')">+ Add Label</button>
        </div>
      `,s.querySelector("#document-detail-content").innerHTML=`
      <div class="back-button" onclick="navigateTo('documents')">
        ← Back to Documents
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
        <div>
          <h2 class="document-title">${g(n.title)}</h2>
          <div class="document-meta">
            ${l}${n.author_name?` · By ${g(n.author_name)}`:""} · Last updated ${new Date(n.updated_at).toLocaleString()}
          </div>
        </div>
        <div class="list-item-actions">
          <button class="btn btn-secondary btn-small" onclick="showEditDocumentModal('${E(n.id)}')">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteDocument('${E(n.id)}')">Delete</button>
        </div>
      </div>
      <div class="document-content markdown-body">${n.content?i(n.content):"No content"}</div>
      ${d}
      ${a}
      ${o}
    `}catch(n){f(n.message,"error")}}async function Os(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await $.getSprints(t);let o=n;if(s&&!n){const c=a.find(l=>l.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${g(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Fs(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${g(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleCreateDocument(event)">
      <div class="form-group">
        <label for="doc-title">Title</label>
        <input type="text" id="doc-title" required>
      </div>
      <div class="form-group">
        <label for="doc-project">Project</label>
        <select id="doc-project" onchange="updateDocSprintDropdown('doc-sprint', this.value)">
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
  `,D(),t&&await Os("doc-sprint",t,null,!0)}async function bc(e){var a;e.preventDefault();const t=(a=window.currentTeam)==null?void 0:a.id;if(!t)return f("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await $.createDocument(t,i),await $t(t),P(),f("Document created!","success")}catch(o){f(o.message,"error")}return!1}async function yc(e){try{const t=await $.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${g(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form onsubmit="return handleUpdateDocument(event, '${E(e)}')">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${_(t.title)}" required>
        </div>
        <div class="form-group">
          <label for="edit-doc-project">Project</label>
          <select id="edit-doc-project" onchange="updateDocSprintDropdown('edit-doc-sprint', this.value)">
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
          <input type="text" id="edit-doc-icon" value="${_(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,D(),t.project_id&&await Os("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){f(t.message,"error")}}async function wc(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await $.updateDocument(t,i),P(),await Ee(t),f("Document updated!","success")}catch(a){f(a.message,"error")}return!1}async function kc(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await $.deleteDocument(e);const n=(t=window.currentTeam)==null?void 0:t.id;await $t(n),window.navigateTo&&window.navigateTo("documents"),f("Document deleted!","success")}catch(n){f(n.message,"error")}}function $c(e,t){Os(e,t)}async function Ec(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${E(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${E(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,D()}async function Ic(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,a=await $.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" onclick="linkToIssue('${E(t)}', '${E(o.id)}')">
        <span class="link-result-id">${g(o.identifier)}</span>
        <span class="link-result-title">${g(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Tc(e,t){try{await $.linkDocumentToIssue(e,t),P(),f("Issue linked!","success"),await Ee(e,!1)}catch(n){f(n.message,"error")}}async function _c(e,t){if(confirm("Unlink this issue from the document?"))try{await $.unlinkDocumentFromIssue(e,t),f("Issue unlinked!","success"),await Ee(e,!1)}catch(n){f(n.message,"error")}}async function xc(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return f("Please enter a comment","error"),!1;try{await $.createDocumentComment(t,s),n.value="",f("Comment added!","success"),await Ee(t,!1)}catch(i){f(i.message,"error")}return!1}async function Sc(e){var n;const t=(n=window.currentTeam)==null?void 0:n.id;if(!t){f("No team selected","error");return}try{const s=await $.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,D();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${E(e)}', '${E(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ge(a.color)}; color: white;">${g(a.name)}</span>
        ${a.description?`<span class="text-muted">${g(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,D()}catch(s){f(s.message,"error")}}async function Cc(e,t){try{await $.addLabelToDocument(e,t),P(),f("Label added!","success"),await Ee(e,!1)}catch(n){f(n.message,"error")}}async function Lc(e,t){try{await $.removeLabelFromDocument(e,t),f("Label removed!","success"),await Ee(e,!1)}catch(n){f(n.message,"error")}}Object.assign(window,{loadDocuments:$t,filterDocuments:je,renderDocuments:ja,viewDocument:Ee,showCreateDocumentModal:Fs,handleCreateDocument:bc,showEditDocumentModal:yc,handleUpdateDocument:wc,deleteDocument:kc,updateDocSprintDropdown:$c,showLinkIssueModal:Ec,searchIssuesToLink:Ic,linkToIssue:Tc,unlinkDocumentFromIssue:_c,toggleDocSelection:mc,selectAllDocs:gc,clearDocSelection:Ra,showBulkMoveModal:fc,handleBulkMove:hc,bulkDeleteDocuments:vc,handleAddDocumentComment:xc,showAddLabelToDocModal:Sc,addLabelToDoc:Cc,removeLabelFromDoc:Lc,setDocViewMode:ic,enterSelectionMode:Ma,exitSelectionMode:Hn,debounceDocSearch:ac,clearDocSearch:oc,clearDocProjectFilter:rc,clearAllDocFilters:lc});let nn=[];function Ac(){return nn}function Bc(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Pa(e){const t=e==null?void 0:e.avatar_url,n=_((e==null?void 0:e.name)||"Agent");return t?Bc(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${_(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${g(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Dc(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{nn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function qs(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{nn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Na()}catch(n){f(n.message,"error")}}function Na(){const e=document.getElementById("agents-list");if(e){if(nn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=nn.map(t=>{const n=g(t.name),s=g(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Pa(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Ps(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${E(t.id)}', '${E(t.name||"Agent")}')">Delete</button>
      </div>
    `}).join("")}}function Ha(){const e=window.projects||[];document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleCreateAgent(event)">
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),D()}async function Mc(e){var o,r,c;e.preventDefault();const t=(o=window.currentTeam)==null?void 0:o.id;if(!t)return f("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;i&&a?l=await $.createProjectAgent(a,n,s):l=await $.createTeamAgent(t,n,s),P();const d=g(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${d}</code>
          <button type="button" class="btn btn-secondary" onclick="copyAgentKey()">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${d}</code>
        </div>
        <button type="button" class="btn btn-primary" onclick="closeModal(); loadAgents();">Done</button>
      </div>
    `,D()}catch(l){f(`Failed to create agent: ${l.message}`,"error")}return!1}function jc(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{f("Agent API key copied to clipboard","success")}).catch(()=>{f("Failed to copy","error")})}async function Rc(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await $.deleteAgent(e),f("Agent deleted","success"),qs()}catch(n){f(`Failed to delete agent: ${n.message}`,"error")}}Object.assign(window,{loadTeamAgentsQuiet:Dc,loadAgents:qs,renderAgents:Na,showCreateAgentModal:Ha,handleCreateAgent:Mc,copyAgentKey:jc,deleteAgent:Rc,renderAgentAvatar:Pa});let On=[],sn=[],Us=[],Gs=[];function Oa(){return On}function It(){return sn}function Pc(e){sn=e}async function Fn(){try{On=await $.getMyTeams(),Fa()}catch(e){f(e.message,"error")}}function Fa(){const e=document.getElementById("team-list");On.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=On.map(t=>`
            <button class="dropdown-item" data-team-json="${_(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${g(t.name)}</button>
        `).join("")}async function zs(e,t=!1){window.currentTeam=e,document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),Ua(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function Ks(){document.getElementById("team-dropdown").classList.toggle("hidden")}function qa(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Ua(){if(window.currentTeam)try{sn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function Ws(){if(window.currentTeam)try{sn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Ga()}catch(e){f(e.message,"error")}}function Ga(){const e=document.getElementById("team-members-list");e.innerHTML=sn.map(t=>`
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
                ${t.user_id!==window.currentUser.id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" onclick="removeMember('${E(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function qn(){if(window.currentTeam)try{Us=await $.getTeamInvitations(window.currentTeam.id),za()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function za(){const e=document.getElementById("team-invitations-list");if(Us.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=Us.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${g(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${g(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${E(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function Ka(){if(window.currentTeam)try{Gs=await $.getTeamAgents(window.currentTeam.id),Wa()}catch(e){f(e.message,"error")}}function Wa(){const e=document.getElementById("team-agents-list");if(e){if(Gs.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=Gs.map(t=>{const n=g(t.name),s=g(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Vs(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleInvite(event)">
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
    `,D()}async function Nc(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await $.createInvitation(window.currentTeam.id,t,n),await qn(),P(),f("Invitation sent!","success")}catch(s){f(`Failed to send invitation: ${s.message}`,"error")}return!1}async function Hc(e){if(confirm("Are you sure you want to remove this member?"))try{await $.removeMember(window.currentTeam.id,e),await Ws(),f("Member removed!","success")}catch(t){f(`Failed to remove member: ${t.message}`,"error")}}async function Oc(e){try{await $.deleteInvitation(window.currentTeam.id,e),await qn(),f("Invitation canceled!","success")}catch(t){f(`Failed to cancel invitation: ${t.message}`,"error")}}function Js(){Ks(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateTeam(event)">
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
    `,D()}function Va(){window.currentTeam&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateTeam(event)">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${_(window.currentTeam.name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${_(window.currentTeam.key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${g(window.currentTeam.description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,D())}async function Fc(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await $.createTeam(t);await Fn(),await zs(n),P(),f("Team created!","success")}catch(n){f(`Failed to create team: ${n.message}`,"error")}return!1}async function qc(e){if(e.preventDefault(),!window.currentTeam)return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await $.updateTeam(window.currentTeam.id,t);window.currentTeam=n,document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await Fn(),P(),f("Team updated!","success")}catch(n){f(`Failed to update team: ${n.message}`,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:Fn,renderTeamList:Fa,selectTeam:zs,toggleTeamDropdown:Ks,toggleUserDropdown:qa,loadTeamMembersQuiet:Ua,loadTeamMembers:Ws,renderTeamMembers:Ga,loadTeamInvitations:qn,renderTeamInvitations:za,loadTeamAgents:Ka,renderTeamAgents:Wa,showInviteModal:Vs,handleInvite:Nc,removeMember:Hc,deleteInvitation:Oc,showCreateTeamModal:Js,showEditTeamModal:Va,handleCreateTeam:Fc,handleUpdateTeam:qc,getTeams:Oa,getMembers:It,setMembers:Pc});let z=[];const an={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function X(){return z}function Uc(e){z=e}function Un(e){const t=z.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return an[n]||an.fibonacci}function Gn(e,t){if(!e)return"No estimate";const s=Un(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Ja(e){const t=z.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(an[n]||an.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function fe(){if(window.currentTeam)try{z=await $.getProjects(window.currentTeam.id),Za()}catch(e){f(e.message,"error")}}function Za(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=e==null?void 0:e.value,a=t==null?void 0:t.value,o=n==null?void 0:n.value,r=s==null?void 0:s.value,c='<option value="">All Projects</option>'+z.map(m=>`<option value="${m.id}">${g(m.name)}</option>`).join(""),l='<option value="">Select Project</option>'+z.map(m=>`<option value="${m.id}">${g(m.name)}</option>`).join(""),d=on();if(e){e.innerHTML=c;let m=i;if(!m||!z.some(p=>p.id===m))if(d&&z.some(p=>p.id===d))m=d;else{const h=new URLSearchParams(window.location.search).get("project");h&&z.some(b=>b.id===h)?m=h:z.length>0&&(m=z[0].id)}m&&(e.value=m,localStorage.setItem("chaotic_last_project",m))}if(t){t.innerHTML=l;const m=a||d;m&&z.some(p=>p.id===m)&&(t.value=m)}if(n){n.innerHTML=l;const m=o||d;m&&z.some(p=>p.id===m)&&(n.value=m)}s&&(s.innerHTML=c,r&&z.some(m=>m.id===r)&&(s.value=r))}function on(){return localStorage.getItem("chaotic_last_project")}function ct(e){if(!e)return;localStorage.setItem("chaotic_last_project",e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function rn(){const e=document.getElementById("projects-list");if(z.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=z.map(t=>`
        <div class="grid-item" onclick="viewProject('${E(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ge(t.color)}20; color: ${ge(t.color)}">
                    ${g(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${g(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${E(t.id)}')" title="Project settings">
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
    `).join("")}function Gc(e){ct(e),window.navigateTo&&window.navigateTo("issues")}function Zs(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateProject(event)">
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
    `,D()}async function zc(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.createProject(window.currentTeam.id,t),await fe(),rn(),P(),f("Project created!","success")}catch(n){f(`Failed to create project: ${n.message}`,"error")}return!1}function Kc(e){const t=z.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateProject(event, '${E(t.id)}')">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" value="${_(t.name)}" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key</label>
                <input type="text" id="project-key" value="${t.key}" disabled class="input-disabled">
                <small class="form-hint">Project key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description">${g(t.description||"")}</textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="${ge(t.color)}">
            </div>
            <div class="form-group">
                <label for="project-estimate-scale">Estimate Scale</label>
                <select id="project-estimate-scale">
                    ${n.map(s=>`
                        <option value="${s.value}" ${t.estimate_scale===s.value?"selected":""}>${s.label}</option>
                    `).join("")}
                </select>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" id="project-human-rituals-required" ${t.human_rituals_required?"checked":""}>
                    Require humans to complete rituals
                </label>
                <small class="form-hint">When unchecked, humans can close tickets without completing rituals (agents must still complete rituals)</small>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-danger-outline" onclick="confirmDeleteProject('${E(t.id)}')">Delete Project</button>
            </div>
        </form>
    `,D()}async function Wc(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.updateProject(t,n),await fe(),rn(),P(),f("Project updated!","success")}catch(s){f(`Failed to update project: ${s.message}`,"error")}return!1}async function Vc(e){const t=z.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await $.deleteProject(e),await fe(),rn(),P(),f("Project deleted","success")}catch(n){f(`Failed to delete project: ${n.message}`,"error")}}let pe=null;async function Ya(e){pe=e,z.length===0&&await fe();const t=z.find(n=>n.id===e);if(!t){f("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Xa("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Xa(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Re||Re.length===0)&&Tt()}function Qa(){pe=null,Re=[]}function eo(e){pe=e}function to(){return Re}async function Jc(){if(!pe)return;const e=document.getElementById("ps-name").value.trim();if(!e){f("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await $.updateProject(pe,t),await fe(),f("Settings saved","success");const n=z.find(s=>s.id===pe);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){f(n.message,"error")}}async function Zc(){if(!pe)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await $.updateProject(pe,n),await fe(),f("Settings saved","success")}catch(s){f(`Failed to save settings: ${s.message}`,"error")}}let Re=[];async function Tt(){if(pe)try{Re=await $.getRituals(pe),Yc(),typeof window._onRitualsChanged=="function"&&window._onRitualsChanged()}catch(e){f(e.message,"error")}}function Yc(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Re.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=Re.filter(s=>s.trigger==="ticket_close"),n=Re.filter(s=>s.trigger==="ticket_claim");_t("ps-sprint-rituals-list",e,"sprint"),_t("ps-close-rituals-list",t,"close"),_t("ps-claim-rituals-list",n,"claim")}function _t(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>_(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${g(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${g(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):g(a.prompt)}</div>
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
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${E(a.id)}')">Edit</button>
        <button class="btn btn-danger btn-small" data-ritual-id="${_(a.id)}" data-ritual-name="${_(a.name)}" onclick="deleteProjectRitual(this.dataset.ritualId, this.dataset.ritualName)">Delete</button>
      </div>
    </div>
  `}).join("")}async function Xc(e){if(!pe)return;let t=[];try{t=await $.getRitualGroups(pe)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleCreateProjectRitual(event)">
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
        <select id="ritual-trigger">
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
        <select id="ritual-group" onchange="onRitualGroupChange()">
          <option value="">None (always required)</option>
          ${t.map(n=>`<option value="${_(n.id)}" data-mode="${_(n.selection_mode)}">${g(n.name)} (${g(n.selection_mode)})</option>`).join("")}
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
      ${window.renderConditionBuilder?window.renderConditionBuilder(null):""}
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,D()}function Qc(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function no(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw f("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await $.createRitualGroup(pe,{name:t,selection_mode:n})).id}return e.value||null}async function ed(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}let n;try{n=await no()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await $.createRitual(pe,s),await Tt(),P(),f("Ritual created!","success")}catch(i){f(`Failed to create ritual: ${i.message}`,"error")}return!1}async function td(e){const t=Re.find(o=>o.id===e);if(!t)return;let n=[];try{n=await $.getRitualGroups(pe)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${E(e)}')">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${_(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${g(t.prompt)}</textarea>
      </div>
      <div class="form-group">
        <label for="ritual-trigger">Trigger</label>
        <select id="ritual-trigger">
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
        <select id="ritual-group" onchange="onRitualGroupChange()">
          <option value="">None (always required)</option>
          ${n.map(o=>`<option value="${_(o.id)}" data-mode="${_(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${g(o.name)} (${g(o.selection_mode)})</option>`).join("")}
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
      ${window.renderConditionBuilder?window.renderConditionBuilder(t.conditions):""}
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,D()}async function nd(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}let s;try{s=await no()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await $.updateRitual(t,i),await Tt(),P(),f("Ritual updated!","success")}catch(a){f(`Failed to update ritual: ${a.message}`,"error")}return!1}async function sd(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await $.deleteRitual(e),await Tt(),f("Ritual deleted","success")}catch(n){f(`Failed to delete ritual: ${n.message}`,"error")}}Object.assign(window,{loadProjects:fe,updateProjectFilters:Za,getSavedProjectId:on,setGlobalProjectSelection:ct,renderProjects:rn,viewProject:Gc,showCreateProjectModal:Zs,handleCreateProject:zc,viewProjectSettings:Ya,switchProjectSettingsTab:Xa,saveProjectSettingsGeneral:Jc,saveProjectSettingsRules:Zc,clearProjectSettingsState:Qa,showEditProjectModal:Kc,handleUpdateProject:Wc,confirmDeleteProject:Vc,getEstimateOptions:Un,formatEstimate:Gn,getEstimateScaleHint:Ja,getProjects:X,setProjects:Uc,ESTIMATE_SCALES:an,showCreateProjectRitualModal:Xc,handleCreateProjectRitual:ed,showEditProjectRitualModal:td,handleUpdateProjectRitual:nd,deleteProjectRitual:sd,setCurrentSettingsProjectId:eo,getProjectRituals:to,loadProjectSettingsRituals:Tt,onRitualGroupChange:Qc});const zn={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Kn={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let so=0;function id(e){so=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=io(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function io(e="",t="",n=""){const s=so++,i=Object.keys(zn).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?zn[e]:zn.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${Kn[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" onchange="updateOperatorOptions(${s})">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" onchange="toggleValueInput(${s})">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${_(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" onclick="removeConditionRow(${s})">&times;</button>
        </div>
    `}function ad(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",io()),Wn()}function od(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Wn()}function rd(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=zn[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Kn[o]}</option>`).join(""),ao(e),Wn()}function ao(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function ln(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Wn(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function ld(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw ln("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw ln("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const m=`${r}__${c}`;if(n.has(m))throw ln(`Duplicate condition: ${r} ${Kn[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${m}`);if(n.add(m),c==="isnull")t[m]=!0;else if(c==="in"||c==="contains")t[m]=d?d.split(",").map(p=>p.trim()).filter(p=>p):[];else if(c==="gte"||c==="lte"){if(!d)throw ln(`Please enter a numeric value for ${r} ${Kn[c]}.`),new Error(`Missing numeric value for ${m}`);const p=parseInt(d,10);if(isNaN(p))throw ln(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${m}: ${d}`);t[m]=p}else t[m]=d}return Wn(),Object.keys(t).length>0?t:null}Object.assign(window,{renderConditionBuilder:id,addConditionRow:ad,removeConditionRow:od,updateOperatorOptions:rd,toggleValueInput:ao,collectConditions:ld});function oo(e){if(!e)return"";const t=new Date(e),s=new Date-t,i=Math.floor(s/6e4),a=Math.floor(i/60),o=Math.floor(a/24);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function cd(e,t,n,s,i,a,o,r){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${g(i)}</span>
                    <span class="gate-approval-issue-title">${g(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${E(t)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${g(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${g(o)}</strong>${r?` ${oo(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{dd(c,e,t,n)}),D()}async function dd(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await $.completeTicketGateRitual(t,n,i||null),f(`GATE ritual "${s}" approved!`,"success"),P(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(a){f(`Failed to complete gate ritual: ${a.message}`,"error")}}function ro(e,t,n,s,i,a,o,r){cd(e,t,n,s,i,a,o,r)}function ud(e,t,n,s,i,a,o,r,c){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${g(i)}</span>
                    <span class="gate-approval-issue-title">${g(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${E(t)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${g(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${g(o)}</strong>${r?` ${oo(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${g(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{pd(l,e,t,n)}),D()}async function pd(e,t,n,s){e.preventDefault();try{await $.approveTicketRitual(t,n),f(`Review ritual "${s}" approved!`,"success"),P(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(i){f(`Failed to approve review ritual: ${i.message}`,"error")}}function md(e,t,n,s,i,a,o,r,c){ud(e,t,n,s,i,a,o,r,c)}window.completeGateFromList=ro,window.approveReviewFromList=md;let Ys=[];async function Xs(){try{Ys=await $.getApiKeys(),gd()}catch(e){f(e.message,"error")}}function gd(){const e=document.getElementById("api-keys-list");if(e){if(Ys.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=Ys.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${g(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${g(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Ps(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ps(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${E(t.id)}', '${E(t.name)}')">Revoke</button>
            `:""}
        </div>
    `).join("")}}function lo(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateApiKey(event)">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,D()}async function fd(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await $.createApiKey(t);P(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
            <div class="api-key-created">
                <p class="warning-text">Copy your API key now. You won't be able to see it again!</p>
                <div class="api-key-display">
                    <code id="new-api-key">${n.key}</code>
                    <button type="button" class="btn btn-secondary" onclick="copyApiKey()">Copy</button>
                </div>
                <div class="api-key-instructions">
                    <p>Use this key in the CLI:</p>
                    <code>chaotic auth set-key ${n.key}</code>
                </div>
                <button type="button" class="btn btn-secondary" onclick="closeModal(); loadApiKeys();">Done</button>
            </div>
        `,D()}catch(n){f(n.message,"error")}return!1}async function co(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),f("API key copied to clipboard","success")}catch{f("Failed to copy","error")}}async function uo(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await $.revokeApiKey(e),f("API key revoked","success"),await Xs()}catch(n){f(n.message,"error")}}window.loadApiKeys=Xs,window.showCreateApiKeyModal=lo,window.handleCreateApiKey=fd,window.copyApiKey=co,window.revokeApiKey=uo;let Vn=!1,Pe=0,Ze=[],Jn=[];function hd(e){Jn=e,Ze=[...e]}function po(){return Vn}function vd(){if(Vn)return;Vn=!0,Pe=0,Ze=[...Jn];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Zn()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>bd(n.target.value)),t.addEventListener("keydown",wd),cn(),requestAnimationFrame(()=>t.focus())}function Zn(){Vn=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function bd(e){const t=e.toLowerCase().trim();t?Ze=Jn.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Ze=[...Jn],Pe=0,cn()}function cn(){const e=document.getElementById("command-results");if(!e)return;if(Ze.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Ze.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===Pe?"selected":""}"
                     data-index="${s}"
                     onclick="executeCommand(${s})"
                     onmouseenter="selectCommand(${s})">
                    <div class="command-item-icon">${r.icon}</div>
                    <div class="command-item-content">
                        <div class="command-item-title">${r.title}</div>
                        <div class="command-item-subtitle">${r.subtitle}</div>
                    </div>
                    ${r.shortcut?`<div class="command-item-shortcut"><kbd>${r.shortcut}</kbd></div>`:""}
                </div>
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function yd(e){Pe=e,cn()}function mo(e){const t=Ze[e];t&&(Zn(),t.action())}function wd(e){switch(e.key){case"ArrowDown":e.preventDefault(),Pe=Math.min(Pe+1,Ze.length-1),cn();break;case"ArrowUp":e.preventDefault(),Pe=Math.max(Pe-1,0),cn();break;case"Enter":e.preventDefault(),mo(Pe);break;case"Escape":e.preventDefault(),Zn();break}}window.selectCommand=yd,window.executeCommand=mo;let dn=[],Qs=[],Ne={getCurrentUser:()=>null,getCurrentTeam:()=>null,renderIssueRow:()=>"",formatActivityText:()=>"",formatActivityActor:()=>"",getActivityIcon:()=>"📝",navigateToIssueByIdentifier:()=>{},viewDocument:()=>{}};function kd(e){Ne={...Ne,...e}}function Yn(){return dn}function un(e){dn=e}async function ei(){var s;const e=Ne.getCurrentTeam(),t=Ne.getCurrentUser();if(!e||!t)return;const n=(s=document.getElementById("my-issues-status-filter"))==null?void 0:s.value;Ed();try{dn=await $.getTeamIssues(e.id,{assignee_id:t.id,status:n||void 0,limit:1e3}),pn()}catch(i){f(i.message,"error")}}async function xt(){const e=Ne.getCurrentTeam();if(!e)return;const t=document.getElementById("dashboard-activity-list");t&&(t.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{Qs=await $.getTeamActivities(e.id,0,10),$d()}catch{t&&(t.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function $d(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Qs.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=Qs.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${E(t.issue_identifier)}'); return false;"><strong>${g(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${E(t.document_id)}'); return false;"><strong>${s} ${g(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${g(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Ne.getActivityIcon(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Ne.formatActivityText(t)}${n}</span>
                <span class="activity-actor">by ${g(Ne.formatActivityActor(t))}</span>
                <span class="activity-time">${Xt(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Ed(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function go(){ei()}function pn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),dn.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=dn.map(t=>Ne.renderIssueRow(t)).join("")}}window.filterMyIssues=go;let xe=null,He=0,St=null,Ct=null,mn=null,ti=!1;function fo(){try{return localStorage.getItem("chaotic_onboarding_complete")==="true"}catch{return!1}}function ho(){try{localStorage.setItem("chaotic_onboarding_complete","true")}catch{}}function vo(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Id(){xe||(xe=document.createElement("div"),xe.id="onboarding-overlay",xe.className="onboarding-overlay",document.getElementById("app").appendChild(xe))}function gn(){if(!xe)return;const e=ti?yo():bo(),t=e[He],n=e.map((s,i)=>`<span class="onboarding-dot${i===He?" active":""}${i<He?" completed":""}"></span>`).join("");xe.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function bo(){return[{html:`
                <h2>Welcome to Chaotic!</h2>
                <p class="onboarding-subtitle">A lightweight issue tracker built for teams that ship from the command line.</p>
                <p class="onboarding-description">Let's set up your workspace. This takes about 30 seconds.</p>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Get Started</button>
                </div>
                <div class="onboarding-skip">
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `},{html:`
                <h2>Create Your Team</h2>
                <p class="onboarding-subtitle">Teams organize your people and projects.</p>
                <form id="onboarding-team-form" onsubmit="window._onboardingCreateTeam(event); return false;">
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
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=vo(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
                <h2>Create Your First Project</h2>
                <p class="onboarding-subtitle">Projects group related issues. One per repo or component.</p>
                <form id="onboarding-project-form" onsubmit="window._onboardingCreateProject(event); return false;">
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
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=vo(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
                <h2>Create Your First Issue</h2>
                <p class="onboarding-subtitle">What's the first thing your team needs to work on?</p>
                <form id="onboarding-issue-form" onsubmit="window._onboardingCreateIssue(event); return false;">
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
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
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
                    <button class="btn btn-primary" onclick="window._onboardingFinish()">Go to Dashboard</button>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&St&&(e.textContent=`${St.name} (${St.key})`),t&&Ct&&(t.textContent=`${Ct.name} (${Ct.key})`),n&&mn&&(n.textContent=`${mn.identifier} - ${mn.title}`)}}]}function yo(){const e='<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';return[{html:`
                <h2>Welcome Back!</h2>
                <p class="onboarding-subtitle">Here's a quick tour of Chaotic.</p>
                <div class="onboarding-tips">
                    <h3>Your Dashboard</h3>
                    <p class="onboarding-description">The dashboard shows your assigned issues and recent activity across all projects.</p>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Next</button>
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
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Next</button>
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
                    <button class="btn btn-primary" onclick="window._onboardingFinish()">Got it!</button>
                </div>
                ${e}
            `}]}function ni(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function si(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Lt(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=ti?yo():bo();He<e.length-1&&(He++,gn())},window._onboardingSkip=function(){ho(),ai(),window.initApp&&window.initApp()},window._onboardingFinish=function(){ho(),ai(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),si("onboarding-team-error"),Lt("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{St=await api.createTeam({name:t,key:n}),He++,gn()}catch(s){ni("onboarding-team-error",s.message||"Failed to create team"),Lt("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),si("onboarding-project-error"),Lt("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Ct=await api.createProject(St.id,{name:t,key:n}),He++,gn()}catch(s){ni("onboarding-project-error",s.message||"Failed to create project"),Lt("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),si("onboarding-issue-error"),Lt("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{mn=await api.createIssue(Ct.id,{title:t}),He++,gn()}catch(n){ni("onboarding-issue-error",n.message||"Failed to create issue"),Lt("onboarding-issue-submit",!1)}};function ii(e=!1){ti=e,He=0,St=null,Ct=null,mn=null,Id(),gn()}function ai(){xe&&(xe.remove(),xe=null)}function oi(){try{localStorage.removeItem("chaotic_onboarding_complete")}catch{}ii(!0)}window.showOnboarding=ii,window.hideOnboarding=ai,window.resetOnboarding=oi,window.hasCompletedOnboarding=fo;let ye={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null}};const Td=new Set;function Ye(e,t){if(typeof e=="string"){const n=ye[e];ye[e]=t,wo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=ye[s];ye[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{wo(s,i,a)})}}function wo(e,t,n){t!==n&&Td.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const ri=()=>ye.currentUser,_d=e=>Ye("currentUser",e),H=()=>ye.currentView,xd=e=>Ye("currentView",e),Oe=()=>ye.issues,Fe=e=>Ye("issues",e),ko=()=>ye.activeFilterCategory,Sd=e=>Ye("activeFilterCategory",e),Cd=()=>ye.selectedIssueIndex,$o=e=>Ye("selectedIssueIndex",e),Ld=()=>ye.pendingGates,Ad=e=>Ye("pendingGates",e),Bd=()=>ye.searchDebounceTimer,Dd=e=>Ye("searchDebounceTimer",e),Md=()=>ye.websocket,Eo=e=>Ye("websocket",e);function dt(){const t=new URLSearchParams(window.location.search).get("project");return t||on()}function Xn(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let At=[],Qn={},es=new Set,qe=null,Io=null,li=[],fn=[],ci=[];function jd(){return Qn}function Rd(){return qe}function To(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=dt();t&&X().some(n=>n.id===t)&&(e.value=t)}e.value?Xe(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function Pd(){const e=document.getElementById("sprint-project-filter").value;e&&(ct(e),Xn(e)),Xe(e)}async function Xe(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){Qd();try{await $.getCurrentSprint(t),At=await $.getSprints(t),Nd(),await ts()}catch(n){f(n.message,"error")}}}function Nd(){const e=document.getElementById("sprints-list");if(!e)return;const t=At.find(a=>a.status==="active"),n=At.find(a=>a.status==="planned"),s=At.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${E(t.id)}'); } else { window.open('/sprint/${t.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${g(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${E(t.id)}', '${E(t.name)}', ${t.budget||"null"}, '${E(t.project_id)}')">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${E(t.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=Hd(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${E(n.id)}'); } else { window.open('/sprint/${n.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${g(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${E(n.id)}', '${E(n.name)}', ${n.budget||"null"}, '${E(n.project_id)}')">Edit Budget</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${E(a.id)}'); } else { window.open('/sprint/${a.id}', '_blank'); }" style="cursor: pointer;">
                            <span class="sprint-history-name">${g(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||`
        <div class="empty-state">
            <h3>No sprints yet</h3>
            <p>Sprints are created automatically when you close the current one, or you can create one from the project settings.</p>
        </div>
    `}function Hd(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((K,Ie,ie)=>Math.min(Math.max(K,Ie),ie))((new Date-o)/(r-o),0,1),m=360,p=120,h=16,b=h,I=m-h,S=h,A=p-h,M=K=>s===0?A:S+(1-K/s)*(A-S),N=M(s),B=M(0),F=b+(I-b)*d,w=M(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${ns(e.start_date)} → ${ns(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${m} ${p}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${N}" x2="${I}" y2="${B}" class="burndown-ideal" />
                <line x1="${b}" y1="${N}" x2="${F}" y2="${w}" class="burndown-actual" />
                <circle cx="${F}" cy="${w}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function di(e,t=!0){var n;try{const s=await $.getSprint(e);if(!s){f("Sprint not found","error"),window.navigateTo("sprints");return}Io=s;const i=(n=window.currentTeam)==null?void 0:n.id,[a,o,r]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getSprintTransactions(e).catch(()=>[]),i?$.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);li=a,ci=o,fn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Fd()}catch(s){console.error("Failed to load sprint:",s),f("Failed to load sprint","error"),window.navigateTo("sprints")}}async function Od(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){f("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await di(e,!1)}catch{window.navigateTo("sprints",!1)}}function Fd(){const e=Io,t=li;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(d=>s.includes(d.status)),a=t.filter(d=>d.status==="done"),o=t.reduce((d,m)=>d+(m.estimate||0),0),r=a.reduce((d,m)=>d+(m.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const l=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" onclick="navigateTo('sprints')">
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
                    ${ns(e.start_date)} → ${ns(e.end_date)}
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
                <div class="stat-value">${l}</div>
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
                ${i.length===0?`
                    <div class="empty-state-small">No open issues in this sprint</div>
                `:`
                    <div class="sprint-issues-list">
                        ${i.map(d=>_o(d)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${a.map(d=>_o(d)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Ud()}
            </div>

            ${fn.length>0?`
            <div class="sprint-detail-section">
                <h3>Documents (${fn.length})</h3>
                <div class="sprint-issues-list">
                    ${fn.map(d=>qd(d)).join("")}
                </div>
            </div>
            `:""}
        </div>
    `}function _o(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${E(e.id)}'); } else { window.open('/issue/${encodeURIComponent(e.identifier)}', '_blank'); }">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${g(e.identifier)}</span>
            <span class="sprint-issue-title">${g(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${tu(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function qd(e){const t=g(e.icon)||"📄";return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewDocument('${E(e.id)}'); } else { window.open('/document/${E(encodeURIComponent(e.id))}', '_blank'); }">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${g(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Xt(e.created_at)}</span>
            </span>
        </div>
    `}function Ud(){const e=ci;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Gd(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Gd(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function zd(e,t,n,s){const i=s?Ja(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateBudget(event, '${E(e)}', '${E(s)}')">
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
            <button type="submit" class="btn btn-primary">Save Budget</button>
        </form>
    `,D()}async function Kd(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await $.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const c=At.filter(l=>l.status==="planned"&&l.id!==t);for(const l of c)await $.updateSprint(l.id,{budget:i})}a==="default"&&n&&await $.updateProject(n,{default_sprint_budget:i}),await Xe(),P(),f(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){f(`Failed to update budget: ${r.message}`,"error")}return!1}async function Wd(e){const t=At.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,D();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[c,l]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getRituals(t.project_id)]);s=c.filter(d=>n.includes(d.status)).length,i=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${g(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${E(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function Vd(e){try{const t=await $.closeSprint(e);await Xe(),t.limbo?Zd(t):f("Sprint completed!","success")}catch(t){f(`Failed to complete sprint: ${t.message}`,"error")}}async function ts(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{qe=await $.getLimboStatus(e),Jd()}catch(n){console.error("Failed to load limbo status:",n)}}function Jd(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!qe||!qe.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${qe.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Zd(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
            <button type="button" class="btn btn-primary" onclick="closeModal(); loadLimboStatus();">Got it</button>
        </div>
    `,D(),Yd(t)}async function Yd(e){try{const t=await $.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${g(s.name)} <span class="ritual-mode">(${g(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(s.prompt):g(s.prompt)}</div>
                    ${pi(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function ui(){var t,n,s;if(!qe)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${qe.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${g(i.name)}</strong>
                            <span class="badge badge-ritual-${_(i.approval_mode)}">${g(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(i.prompt):g(i.prompt)}</div>
                        ${pi(i.attestation)}
                        ${Xd(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((s=qe.completed_rituals)==null?void 0:s.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${qe.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${g(i.name)}</div>
                            ${pi(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,D()}function pi(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${g(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${g(Xt(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${window.renderMarkdown?window.renderMarkdown(e.note):g(e.note)}</div>
        </div>
    `}function Xd(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" onclick="approveRitual('${E(e.id)}', '${E(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${E(e.id)}', '${E(t)}', '${E(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function xo(e){for(const t of e)if(!es.has(t))try{(await $.getSprints(t)).forEach(s=>{Qn[s.id]=s}),es.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Qd(){Qn={},es=new Set,li=[],ci=[],fn=[]}function eu(e,t){t.forEach(n=>{Qn[n.id]=n}),es.add(e)}function ns(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function tu(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}const So=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Qe=[],mi=null,Z={api:null,showToast:()=>{},getProjects:()=>[],getProjectFromUrl:()=>null,setGlobalProjectSelection:()=>{},updateUrlWithProject:()=>{},escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,formatPriority:e=>e};function nu(e){Z={...Z,...e}}function gi(){const e=document.getElementById("board-project-filter");if(!e)return;const t=Z.getProjects();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${Z.escapeHtml(n.name)}</option>`).join(""),!e.value){const n=Z.getProjectFromUrl();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)fi(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function su(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(Z.setGlobalProjectSelection(e),Z.updateUrlWithProject(e)),fi(e)}async function fi(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){gi();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{Qe=await Z.api.getIssues({project_id:t}),et()}catch(i){Z.showToast(`Failed to load board: ${i.message}`,"error")}}function et(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=So.map(t=>{const n=Qe.filter(s=>s.status===t.key);return`
            <div class="kanban-column" data-status="${t.key}"
                 ondrop="handleDrop(event)" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)">
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
                        <div class="kanban-card" draggable="true" data-id="${Z.escapeAttr(s.id)}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             ondragover="handleCardDragOver(event)" ondragleave="handleCardDragLeave(event)" ondrop="handleCardDrop(event)"
                             onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${Z.escapeJsString(s.id)}'); } else { window.open('/issue/${encodeURIComponent(s.identifier)}', '_blank'); }">
                            <div class="kanban-card-title">${Z.escapeHtml(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${Z.formatPriority(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function iu(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),mi=e.target.dataset.id,e.target.classList.add("dragging")}function au(e){e.target.classList.remove("dragging"),mi=null}function ou(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function ru(e){e.currentTarget.classList.remove("drag-over")}function lu(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function cu(e){e.currentTarget.classList.remove("drag-over")}async function du(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=Qe.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,Co(n,t),et(),i!==n)try{await Z.api.updateIssue(t,{status:n}),Z.showToast("Status updated","success")}catch(a){s.status=i,et(),Z.showToast(`Failed to update status: ${a.message}`,"error")}}async function uu(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=mi||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=Qe.find(r=>r.id===t);if(!a)return;const o=a.status;if(a.status=i,Co(i,t,n),et(),o!==i)try{await Z.api.updateIssue(t,{status:i}),Z.showToast("Status updated","success")}catch(r){a.status=o,et(),Z.showToast(`Failed to update status: ${r.message}`,"error")}}function Co(e,t,n=null){const s=Qe.filter(o=>o.status===e&&o.id!==t),i=Qe.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];So.forEach(o=>{o.key===e?a.push(...s):a.push(...Qe.filter(r=>r.status===o.key))}),Qe=a}const Lo=["backlog","todo","in_progress","in_review","done","canceled"],Ao=["urgent","high","medium","low","no_priority"],Bo=["task","bug","feature","chore","docs","tech_debt","epic"];let C={getIssues:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatEstimate:()=>"",getSprintCache:()=>({}),formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",escapeHtml:e=>e||"",escapeAttr:e=>e||"",escapeJsString:e=>e||"",sanitizeColor:e=>e||"#888",renderAvatar:()=>"",getAssigneeOptionList:()=>[],getGroupByValue:()=>""};function pu(e){C={...C,...e}}function Ue(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=C.getIssues();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=C.getGroupByValue();n==="status"?mu(e,t):n==="priority"?gu(e,t):n==="type"?fu(e,t):n==="assignee"?hu(e,t):n==="sprint"?vu(e,t):e.innerHTML=t.map(s=>Se(s)).join("")}function mu(e,t){const n={};Lo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s="";Lo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${nt(i)}</span>
                    <span class="group-title">${C.formatStatus(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Se(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function gu(e,t){const n={};Ao.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s="";Ao.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${tt(i)}</span>
                    <span class="group-title">${C.formatPriority(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Se(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function fu(e,t){const n={};Bo.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s="";Bo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${C.formatIssueType(i)}</span></span>
                    <span class="group-title">${C.formatIssueType(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Se(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function hu(e,t){const n={},s="__unassigned__";n[s]=[];const i=C.getAssigneeOptionList();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a="";n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" onclick="toggleGroup('${s}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Se(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=C.formatAssigneeName(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" onclick="toggleGroup('${C.escapeJsString(o.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${C.renderAvatar(o,"avatar-small")}</span>
                    <span class="group-title">${C.escapeHtml(c)}${C.escapeHtml(l)}</span>
                    <span class="group-count">${r.length}</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Se(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function vu(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=C.getSprintCache();i.sort((c,l)=>{const d=o[c],m=o[l],p=d?a[d.status]??3:3,h=m?a[m.status]??3:3;return p-h});let r="";i.forEach(c=>{const l=s[c];if(l.length===0)return;const d=o[c],m=d?d.name:c,p=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",h=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${h}">
                <div class="issue-group-header" onclick="toggleGroup('${h}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${C.escapeHtml(m)}${p}</span>
                    <span class="group-count">${l.length}</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(b=>Se(b)).join("")}
                </div>
            </div>
        `}),s[n].length>0&&(r+=`
            <div class="issue-group" data-group="${n}">
                <div class="issue-group-header" onclick="toggleGroup('${n}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${s[n].length}</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(c=>Se(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function bu(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Se(e){const t=e.assignee_id?C.getAssigneeById(e.assignee_id):null,n=t?C.formatAssigneeName(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?C.formatEstimate(e.estimate,e.project_id):"",a=e.sprint_id?C.getSprintCache()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${C.escapeAttr(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${C.escapeAttr(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${C.escapeJsString(e.id)}')" title="Priority: ${C.formatPriority(e.priority)}">
                    ${tt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${C.escapeJsString(e.id)}')" title="Status: ${C.formatStatus(e.status)}">
                    ${nt(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${C.formatIssueType(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${C.escapeJsString(e.id)}'); }">${C.escapeHtml(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${C.sanitizeColor(r.color)}20; color: ${C.sanitizeColor(r.color)}">${C.escapeHtml(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${C.escapeJsString(e.id)}')" title="Sprint: ${o?C.escapeHtml(o):"None"}">
                    ${o?`<span class="sprint-badge">${C.escapeHtml(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'estimate', '${C.escapeJsString(e.id)}')" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'assignee', '${C.escapeJsString(e.id)}')" title="${C.escapeAttr(n||"Unassigned")}">
                    ${n?C.renderAvatar(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function tt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function nt(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}function yu(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Do)},0))}function Do(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Do))}function ut(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function pt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function mt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function hi(){const e=ut(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Je(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Ge(),he(),ve()}function vi(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),hi()}function bi(){const e=pt(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Me(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Ge(),he(),ve()}function yi(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),bi()}function wi(){var s,i;const e=mt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Ge(),he(),ve()}function ki(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),wi()}function Mo(){var s,i;const e=mt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function wu(){const e=document.getElementById("label-filter-dropdown");if(!e||!window.currentTeam)return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(window.currentTeam.id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${ge(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${g(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function jo(){var m,p,h,b,I;const e=new URLSearchParams,t=ut(),n=pt(),s=mt(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(p=document.getElementById("project-filter"))==null?void 0:p.value,o=(h=document.getElementById("sprint-filter"))==null?void 0:h.value,r=(b=document.getElementById("issue-type-filter"))==null?void 0:b.value,c=(I=document.getElementById("group-by-select"))==null?void 0:I.value;t.forEach(S=>e.append("status",S)),n.forEach(S=>e.append("priority",S)),s.forEach(S=>e.append("label",S)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),c&&e.set("groupBy",c);const l=e.toString(),d=l?`/issues?${l}`:"/issues";history.replaceState({view:"issues"},"",d)}function ku(){const e=new URLSearchParams(window.location.search),t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=t.includes(m.value)}),$u())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=n.includes(m.value)}),Eu())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const o=e.get("issue_type");if(o){const l=document.getElementById("issue-type-filter");l&&(l.value=o)}const r=e.getAll("label");if(r.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=r.includes(m.value)}),Mo())}const c=e.get("groupBy");if(c){const l=document.getElementById("group-by-select");l&&(l.value=c)}}function $u(){const e=ut(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Je(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Eu(){const e=pt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Me(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const Ro=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function Iu(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Bt)):(t.classList.remove("hidden"),we(),ke(ko()),setTimeout(()=>{document.addEventListener("click",Bt)},0))}function Tu(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Bt)):(t.classList.remove("hidden"),Gu(),setTimeout(()=>{document.addEventListener("click",Bt)},0))}function Bt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Bt))}function Po(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Bt)}function No(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return ut().length;case"priority":return pt().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return mt().length;default:return 0}}function _u(){let e=0;return Ro.forEach(t=>{e+=No(t.key)}),e}function we(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=Ro.map(t=>{const n=No(t.key);return`
            <div class="filter-menu-category ${ko()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function ke(e){Sd(e),we();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":xu(t);break;case"status":Su(t);break;case"priority":Cu(t);break;case"type":Lu(t);break;case"assignee":Au(t);break;case"sprint":Bu(t);break;case"labels":Du(t);break}}function xu(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=X()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" onclick="clearProjectFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setProjectFilter('')">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setProjectFilter('${E(a.id)}')">
                <input type="radio" name="project-filter-radio" value="${_(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ge(a.color)};"></span>
                <span class="filter-option-label">${g(a.name)}</span>
            </label>
        `}),e.innerHTML=i}function Su(e){const t=ut(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearStatusFilterNew()">Clear</button>':""}
        </div>
    `;n.forEach(i=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${i.value}" ${t.includes(i.value)?"checked":""} onchange="toggleStatusOption('${i.value}', event)">
                <span class="filter-option-icon">${i.icon}</span>
                <span class="filter-option-label">${i.label}</span>
            </label>
        `}),e.innerHTML=s}function Cu(e){const t=pt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearPriorityFilterNew()">Clear</button>':""}
        </div>
    `;n.forEach(i=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${i.value}" ${t.includes(i.value)?"checked":""} onchange="togglePriorityOption('${i.value}', event)">
                <span class="filter-option-icon">${i.icon}</span>
                <span class="filter-option-label">${i.label}</span>
            </label>
        `}),e.innerHTML=s}function Lu(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setTypeFilter('${a.value}')">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Au(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=It()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Assignee</span>
            ${n?'<button class="filter-options-clear" onclick="clearAssigneeFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setAssigneeFilter('')">
            <input type="radio" name="assignee-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Assignees</span>
        </label>
        <label class="filter-option" onclick="setAssigneeFilter('me')">
            <input type="radio" name="assignee-filter-radio" value="me" ${n==="me"?"checked":""}>
            <span class="filter-option-label">Assigned to me</span>
        </label>
        <label class="filter-option" onclick="setAssigneeFilter('unassigned')">
            <input type="radio" name="assignee-filter-radio" value="unassigned" ${n==="unassigned"?"checked":""}>
            <span class="filter-option-label">Unassigned</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setAssigneeFilter('${E(a.user_id)}')">
                <input type="radio" name="assignee-filter-radio" value="${_(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${g(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Bu(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${E(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${_(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${g(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function Du(e){const t=mt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${_(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${E(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ge(d)};"></span>
                    <span class="filter-option-label">${g(l)}</span>
                </label>
            `}),e.innerHTML=i}function Ho(e){const t=document.getElementById("project-filter");t&&(t.value=e,Go()),we(),ke("project"),he(),ve()}function Mu(){Ho("")}function ju(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,hi()),we(),ke("status")}function Ru(){vi(),we(),ke("status"),he(),ve()}function Pu(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,bi()),we(),ke("priority")}function Nu(){yi(),we(),ke("priority"),he(),ve()}function Oo(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ge()),we(),ke("type"),he(),ve()}function Hu(){Oo("")}function Fo(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ge()),we(),ke("assignee"),he(),ve()}function Ou(){Fo("")}function qo(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ge()),we(),ke("sprint"),he(),ve()}function Fu(){qo("")}function qu(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,wi()),we(),ke("labels")}function Uu(){ki(),we(),ke("labels"),he(),ve()}function Gu(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(c=>`
                <div class="display-option ${s===c.value?"active":""}" onclick="setSort('${c.value}')">
                    <span>${c.label}</span>
                    ${s===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(c=>`
                <div class="display-option ${i===c.value?"active":""}" onclick="setGroupBy('${c.value}')">
                    <span>${c.label}</span>
                    ${i===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function zu(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,gt()),Po()}function Ku(e){const t=document.getElementById("group-by-select");t&&(t.value=e,zo()),Po()}function he(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const m=(X()||[]).find(p=>p.id===n.value);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=ut();if(s.length>0){const d=s.map(m=>Je(m)).join(", ");t.push({category:"status",label:"Status",value:d,clearFn:"clearStatusFilterNew()"})}const i=pt();if(i.length>0){const d=i.map(m=>Me(m)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:a.value,clearFn:"clearTypeFilter()"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;if(o.value==="me")d="Me";else if(o.value==="unassigned")d="Unassigned";else{const p=(It()||[]).find(h=>h.user_id===o.value);d=(p==null?void 0:p.name)||(p==null?void 0:p.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:d,clearFn:"clearAssigneeFilter()"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const d=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||r.value,clearFn:"clearSprintFilter()"})}const c=mt();if(c.length>0){const d=document.getElementById("label-filter-dropdown"),m=c.map(p=>{var I;const h=d==null?void 0:d.querySelector(`input[value="${p}"]`),b=(I=h==null?void 0:h.closest("label"))==null?void 0:I.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(d=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${g(d.value)}</span>
            <button class="filter-chip-remove" onclick="${d.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=l}function Wu(){const e=document.getElementById("project-filter");e&&(e.value=""),vi(),yi();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),ki(),Ge(),he(),ve()}function ve(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=_u();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function Vu(){he(),ve();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function Uo(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||$i(null),t)try{const a=await api.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${g(o.name)})</option>`),$i(o||null),a.forEach(r=>{const c=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${g(r.name)}${c}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function $i(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${g(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${g(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function gt(){var m,p,h,b,I,S,A;if($o(-1),!window.currentTeam)return;const e=document.getElementById("project-filter").value,t=ut(),n=pt(),s=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,i=(h=(p=document.getElementById("issue-search"))==null?void 0:p.value)==null?void 0:h.trim();if(!e&&X().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}Zu();const a={limit:1e3},o=((b=document.getElementById("sort-by-select"))==null?void 0:b.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(I=ri())==null?void 0:I.id:a.assignee_id=s);const l=(S=document.getElementById("sprint-filter"))==null?void 0:S.value;if(l)if(l==="current"){if(e)try{const N=(await api.getSprints(e)).find(B=>B.status==="active");N&&(a.sprint_id=N.id)}catch(M){console.error("Failed to resolve current sprint:",M)}}else a.sprint_id=l;const d=(A=document.getElementById("issue-type-filter"))==null?void 0:A.value;d&&(a.issue_type=d),i&&i.length>=2&&(a.search=i);try{let M;e?(a.project_id=e,M=await api.getIssues(a)):X().length>0&&(M=await api.getTeamIssues(window.currentTeam.id,a));const N=mt();N.length>0&&(M=M.filter(F=>!F.labels||F.labels.length===0?!1:F.labels.some(w=>N.includes(w.id)))),Fe(M);const B=[...new Set(M.map(F=>F.project_id))];await xo(B),Ue()}catch(M){f(M.message,"error")}}function Ju(){clearTimeout(Bd()),Dd(setTimeout(()=>{gt()},300))}function Zu(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Ge(){jo(),gt()}async function Go(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&ct(e),await Uo(),gi(),To(),Ge()}async function zo(){if(jo(),Ko()==="sprint"){const e=Oe(),t=[...new Set(e.map(n=>n.project_id))];await xo(t)}Ue()}function Ko(){const e=document.getElementById("group-by-select");return e?e.value:""}const Ei={};let Ii=null,Ti=null,_i=null,xi=null,Si=null,Wo=!1;function Yu(e){Object.assign(Ei,e)}function Xu({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i}={}){e&&(Ii=e),t&&(Ti=t),n&&(_i=n),s&&(xi=s),i&&(Si=i)}function Qu(){return Object.keys(Ei)}function G(e,t=!0){if(xd(e),t){let i;const a=dt(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),Ii&&Ii(),document.querySelectorAll(".view").forEach(i=>i.classList.add("hidden"));const n=document.getElementById(`${e}-view`);n&&n.classList.remove("hidden");const s=Ei[e];s&&s()}function Vo(){var s;const t=window.location.pathname.split("/").filter(Boolean);xi&&xi();let n="my-issues";if(t.length===0||t[0]==="")G("my-issues",!1);else{if(Ti&&Ti(t))return;n=t[0],Qu().includes(n)?G(n,!1):(n="my-issues",G("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function ss(e){history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Si&&Si(e)}function ep(){Wo||(Wo=!0,window.addEventListener("popstate",e=>{var t;e.state&&_i&&_i(e.state)||((t=e.state)!=null&&t.view?G(e.state.view,!1):Vo())}))}async function tp(){const e=document.getElementById("epics-project-filter");if(!e)return;await fe(),e.innerHTML='<option value="">All Projects</option>'+X().map(n=>`<option value="${_(n.id)}">${g(n.name)}</option>`).join("");const t=dt()||on();t&&X().some(n=>n.id===t)&&(e.value=t),Jo()}function np(){var t;const e=(t=document.getElementById("epics-project-filter"))==null?void 0:t.value;e&&(ct(e),Xn(e)),Jo()}async function Jo(){var t,n;const e=document.getElementById("epics-list");if(e){e.innerHTML='<div class="loading">Loading epics...</div>';try{if(!((t=window.currentTeam)!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value;let i;if(s?i=await $.getIssues({project_id:s,issue_type:"epic"}):i=await $.getTeamIssues(window.currentTeam.id,{issue_type:"epic"}),!i||i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Create one from the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await $.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));sp(a,e)}catch(s){e.innerHTML=`<div class="empty-state">Failed to load epics: ${g(s.message||String(s))}</div>`}}}function sp(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(m=>m.status==="done"||m.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,l=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase()),d=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${_(s.identifier)}" style="cursor: pointer;">
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
    `,t.addEventListener("click",s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&ss(i.dataset.identifier)})}function ip(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}let st=!0,is=null,v={api:null,getCurrentView:()=>"my-issues",showToast:()=>{},showModal:()=>{},closeModal:()=>{},navigateTo:()=>{},getProjects:()=>[],getMembers:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",renderMarkdown:e=>e,renderAvatar:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",showDetailDropdown:()=>{},setupMentionAutocomplete:()=>{},renderTicketRitualActions:()=>""};function ap(e){v={...v,...e}}function Zo(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Yo(e){return e.user_name||e.user_email||"Unknown"}function Xo(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?v.escapeHtml(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${s}" onclick="event.preventDefault(); document.getElementById('comments-section')?.scrollIntoView({behavior: 'smooth'})">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${v.formatStatus(t(e.old_value))}</strong> to <strong>${v.formatStatus(t(e.new_value))}</strong>`;case"priority_changed":return`Changed priority from <strong>${v.formatPriority(t(e.old_value))}</strong> to <strong>${v.formatPriority(t(e.new_value))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${e.sprint_name}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${e.sprint_name}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=e.field_name||"ritual",i=e.new_value?v.escapeHtml(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||e.field_name}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||e.field_name}`:"Updated issue"}}function Qo(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function op(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const m=d[1],p=document.createElement("a");p.href=`#/issue/${m}`,p.className="issue-link",p.textContent=m,o.appendChild(p),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const m=document.createElement("span");m.className="mention",m.textContent="@"+d[3],o.appendChild(m),r=d.index+d[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function rp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function lp(e){if(!e)return"";const t=v.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Qo(n,op),n.innerHTML}function er(e){if(!e)return"";const t=v.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Qo(n,rp),n.innerHTML}function tr(e,t){const n=e.target;n.tagName==="A"||n.closest("a")||window.editDescription&&window.editDescription(t)}function nr(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function sr(){st=!st;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",st),n&&n.classList.toggle("rotated",st)}async function hn(e){try{is=await v.api.getTicketRitualsStatus(e),cp(e)}catch(t){console.error("Failed to load ticket rituals:",t),is=null}}function cp(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!is){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=is;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(st=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",st);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",st);const r=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">○</span>
                            <span class="ticket-ritual-name">${v.escapeHtml(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?v.renderMarkdown(d.prompt):""}</div>
                        <div class="ticket-ritual-actions">
                            ${v.renderTicketRitualActions(d,e)}
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
                            <span class="ticket-ritual-name">${v.escapeHtml(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${v.escapeHtml(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${v.formatTimeAgo(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function as(e){try{let t;e.includes("-")?t=await v.api.getIssueByIdentifier(e):t=await v.api.getIssue(e),t?await ee(t.id,!1):v.navigateTo("my-issues",!1)}catch{v.navigateTo("my-issues",!1)}}async function ee(e,t=!0){try{st=!0;const[n,s,i,a,o,r]=await Promise.all([v.api.getIssue(e),v.api.getComments(e),v.api.getActivities(e),v.api.getSubIssues(e),v.api.getRelations(e),v.api.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),c=(r.completed_rituals||[]).filter(w=>w.attestation&&w.attestation.note).map(w=>({id:`attestation-${w.attestation.id}`,author_name:w.attestation.attested_by_name||"Unknown",content:w.attestation.note,created_at:w.attestation.attested_at,is_attestation:!0,ritual_name:w.name})),l=[...s,...c].sort((w,K)=>new Date(w.created_at)-new Date(K.created_at)),d=[n.parent_id?v.api.getIssue(n.parent_id):Promise.resolve(null),v.api.getSprints(n.project_id).catch(w=>(console.error("Failed to load sprints:",w),[]))],[m,p]=await Promise.all(d),h=o.filter(w=>w.relation_type==="blocks"&&w.direction==="outgoing"),b=o.filter(w=>w.relation_type==="blocked_by"||w.relation_type==="blocks"&&w.direction==="incoming"),I=o.filter(w=>w.relation_type==="relates_to");t&&history.pushState({issueId:e,view:v.getCurrentView()},"",`/issue/${n.identifier}`),window.currentDetailIssue=n,window.currentDetailSprints=p,document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const S=document.getElementById("issue-detail-view");S.classList.remove("hidden");const A=v.getCurrentView()||"my-issues",M=v.getProjects().find(w=>w.id===n.project_id),N=n.assignee_id?v.getAssigneeById(n.assignee_id):null,B=N?v.formatAssigneeName(N):null,F=n.sprint_id?p.find(w=>w.id===n.sprint_id):null;S.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${A}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${M?v.escapeHtml(M.name):"Project"} › ${v.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${v.escapeHtml(n.title)}</h1>

                    ${m?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(m.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${v.escapeJsString(m.id)}'); }">${m.identifier}: ${v.escapeHtml(m.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body ${n.description?"":"empty"}" onclick="handleDescriptionClick(event, '${v.escapeJsString(n.id)}')">
                            ${n.description?er(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showCreateSubIssueModal('${v.escapeJsString(n.id)}', '${v.escapeJsString(n.project_id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(w=>`
                                <div class="sub-issue-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${v.escapeJsString(w.id)}'); } else { window.open('/issue/${encodeURIComponent(w.identifier)}', '_blank'); }">
                                    <span class="sub-issue-status">${v.getStatusIcon(w.status)}</span>
                                    <span class="sub-issue-id">${w.identifier}</span>
                                    <span class="sub-issue-title">${v.escapeHtml(w.title)}</span>
                                    ${w.estimate?`<span class="sub-issue-estimate">${w.estimate}pts</span>`:""}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showAddRelationModal('${v.escapeJsString(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${h.length===0&&b.length===0&&I.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${b.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${b.map(w=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${v.getStatusIcon(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${v.escapeJsString(w.related_issue_id)}'); }" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${v.escapeHtml(w.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${v.escapeJsString(n.id)}', '${v.escapeJsString(w.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${h.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${h.map(w=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${v.getStatusIcon(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${v.escapeJsString(w.related_issue_id)}'); }" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${v.escapeHtml(w.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${v.escapeJsString(n.id)}', '${v.escapeJsString(w.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${I.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${I.map(w=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${v.getStatusIcon(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${v.escapeJsString(w.related_issue_id)}'); }" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${v.escapeHtml(w.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${v.escapeJsString(n.id)}', '${v.escapeJsString(w.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                        </div>
                    </div>

                    <div id="ticket-rituals-section" class="issue-detail-section hidden">
                        <div class="section-header section-header-collapsible" onclick="toggleTicketRituals()">
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

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" onclick="toggleSection('activity')">
                            <h3>Activity</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Zo(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Xo(w)}</span>
                                        <span class="activity-actor">by ${v.escapeHtml(Yo(w))}</span>
                                        <span class="activity-time">${v.formatTimeAgo(w.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="comments-section">
                        <div class="section-header section-header-collapsible" onclick="toggleSection('comments')">
                            <h3>Comments</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${l.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:l.map(w=>`
                                <div class="comment ${w.is_attestation?"comment-attestation":""}">
                                    <div class="comment-avatar ${w.is_attestation?"avatar-attestation":""}">${w.is_attestation?"✓":(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${v.escapeHtml(w.author_name||"User")}</span>
                                            ${w.is_attestation?`<span class="comment-ritual-badge">Ritual: ${v.escapeHtml(w.ritual_name)}</span>`:""}
                                            <span class="comment-date">${v.formatTimeAgo(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${lp(w.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                        <form class="comment-form" onsubmit="return handleAddComment(event, '${v.escapeJsString(n.id)}')">
                            <textarea id="new-comment" placeholder="Write a comment..." rows="3"></textarea>
                            <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                            <button type="submit" class="btn btn-primary">Comment</button>
                        </form>
                    </div>
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" onclick="showDetailDropdown(event, 'status', '${v.escapeJsString(n.id)}')">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${v.getStatusIcon(n.status)}
                                <span>${v.formatStatus(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'priority', '${v.escapeJsString(n.id)}')">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${v.getPriorityIcon(n.priority)}
                                <span>${v.formatPriority(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'type', '${v.escapeJsString(n.id)}')">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${v.formatIssueType(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'assignee', '${v.escapeJsString(n.id)}')">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${B?`${v.renderAvatar(N,"avatar-small")}<span>${v.escapeHtml(B)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'sprint', '${v.escapeJsString(n.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${F?v.escapeHtml(F.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'labels', '${v.escapeJsString(n.id)}')">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(w=>`
                                        <span class="issue-label" style="background: ${v.sanitizeColor(w.color)}20; color: ${v.sanitizeColor(w.color)}">${v.escapeHtml(w.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${M?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${v.escapeHtml(M.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" onclick="showDetailDropdown(event, 'estimate', '${v.escapeJsString(n.id)}')">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${v.formatEstimate(n.estimate,n.project_id)}</span>
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
                            <span class="property-value-static">${v.escapeHtml(n.creator_name||"Unknown")}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <button class="btn btn-secondary btn-block" onclick="showEditIssueModal('${v.escapeJsString(n.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            Edit Issue
                        </button>
                        <button class="btn btn-danger-outline btn-block" onclick="deleteIssue('${v.escapeJsString(n.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            Delete
                        </button>
                    </div>
                </aside>
            </div>
        `,hn(n.id),v.setupMentionAutocomplete()}catch(n){v.showToast(`Failed to load issue: ${n.message}`,"error")}}async function dp(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;try{await v.api.createComment(t,n),await ee(t),v.showToast("Comment added!","success")}catch(s){v.showToast(`Failed to add comment: ${s.message}`,"error")}return!1}async function up(e){const t=window.currentDetailIssue||await v.api.getIssue(e);document.getElementById("modal-title").textContent="Edit Description",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateDescription(event, '${v.escapeJsString(e)}')">
            <div class="form-group description-editor">
                <div class="editor-tabs">
                    <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                    <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
                </div>
                <textarea id="edit-description" rows="10" placeholder="Add a description...">${v.escapeHtml(t.description||"")}</textarea>
                <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    `,v.showModal();const n=document.getElementById("edit-description");n.addEventListener("input",()=>{const s=document.getElementById("edit-description-preview");s&&s.style.display!=="none"&&ir()}),n.focus()}function ir(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?er(n):'<span class="text-muted">Nothing to preview.</span>'}function pp(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?ir():s.focus()}async function mp(e,t){e.preventDefault();try{const n=document.getElementById("edit-description");if(!n)throw new Error("Description field not found");const s=n.value;await v.api.updateIssue(t,{description:s}),v.closeModal(),v.showToast("Description updated","success"),ee(t,!1)}catch(n){v.showToast(`Failed to update description: ${n.message}`,"error")}return!1}function gp(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleAddRelation(event, '${v.escapeJsString(e)}')">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${v.escapeJsString(e)}')">
                <input type="hidden" id="selected-related-issue-id">
            </div>
            <div id="relation-search-results" class="link-results">
                <p class="empty-state-small">Enter a search term to find issues</p>
            </div>
            <div id="selected-issue-display" class="selected-issue-display" style="display: none;">
                <span class="selected-issue-label">Selected:</span>
                <span id="selected-issue-info"></span>
                <button type="button" class="btn btn-danger btn-tiny" onclick="clearSelectedRelation()">×</button>
            </div>
            <button type="submit" class="btn btn-primary" id="add-relation-btn" disabled>Add Relation</button>
        </form>
    `,v.showModal(),document.getElementById("relation-issue-search").focus()}async function fp(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,o=(await v.api.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" onclick="selectIssueForRelation('${v.escapeJsString(r.id)}', '${v.escapeJsString(r.identifier)}', '${v.escapeJsString(r.title)}')">
                <span class="link-result-id">${v.escapeHtml(r.identifier)}</span>
                <span class="link-result-title">${v.escapeHtml(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function hp(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function vp(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function bp(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return v.showToast("Please select an issue","error"),!1;try{n==="blocked_by"?await v.api.createRelation(s,t,"blocks"):await v.api.createRelation(t,s,n),v.closeModal(),v.showToast("Relation added","success"),ee(t)}catch(i){v.showToast(`Failed to add relation: ${i.message}`,"error")}return!1}async function yp(e,t){try{await v.api.deleteRelation(e,t),v.showToast("Relation removed","success"),ee(e)}catch(n){v.showToast(`Failed to remove relation: ${n.message}`,"error")}}async function wp(){const e=document.getElementById("ritual-project-filter");e&&(await fe(),e.innerHTML='<option value="">Select Project</option>'+X().map(t=>`<option value="${_(t.id)}">${g(t.name)}</option>`).join(""))}async function ar(){const e=document.getElementById("rituals-project-filter");if(!e)return;window._onRitualsChanged=kp,await fe(),e.innerHTML='<option value="">Select a project</option>'+X().map(n=>`<option value="${_(n.id)}">${g(n.name)}</option>`).join("");const t=dt()||on();t&&X().some(n=>n.id===t)?(e.value=t,or()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function or(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){document.getElementById("rituals-tabs").classList.add("hidden"),t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}eo(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await Tt()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${g(n.message)}</div>`}}function kp(){const e=document.getElementById("rituals-content"),t=to(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
        <div id="rituals-tab-sprint" class="settings-tab-content">
            <div class="settings-section-header">
                <p class="settings-description">Required when closing a sprint</p>
                <button class="btn btn-primary" onclick="showCreateProjectRitualModal('every_sprint')">+ Create Ritual</button>
            </div>
            <div id="rv-sprint-rituals-list" class="rituals-list"></div>
        </div>
        <div id="rituals-tab-close" class="settings-tab-content hidden">
            <div class="settings-section-header">
                <p class="settings-description">Required when closing a ticket</p>
                <button class="btn btn-primary" onclick="showCreateProjectRitualModal('ticket_close')">+ Create Ritual</button>
            </div>
            <div id="rv-close-rituals-list" class="rituals-list"></div>
        </div>
        <div id="rituals-tab-claim" class="settings-tab-content hidden">
            <div class="settings-section-header">
                <p class="settings-description">Required when claiming a ticket (moving to in_progress)</p>
                <button class="btn btn-primary" onclick="showCreateProjectRitualModal('ticket_claim')">+ Create Ritual</button>
            </div>
            <div id="rv-claim-rituals-list" class="rituals-list"></div>
        </div>
    `,_t("rv-sprint-rituals-list",n,"sprint"),_t("rv-close-rituals-list",s,"close"),_t("rv-claim-rituals-list",i,"claim")}function $p(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Ep(e,t){try{await $.approveAttestation(e,t),f("Ritual approved!","success"),await ts(),ui()}catch(n){f(n.message,"error")}}async function Ip(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Tp(s,e,t)}),D()}async function Tp(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await $.completeGateRitual(t,n,s||null),f("Ritual completed!","success"),await ts();const i=Rd();i&&!i.in_limbo?(P(),f("Limbo cleared! Next sprint is now active.","success")):ui()}catch(i){f(i.message,"error")}return!1}function _p(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" data-ritual-name="${_(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" data-ritual-name="${_(e.name)}" data-ritual-prompt="${_(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function xp(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${g(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Sp(i,e,t)}),D()}async function Sp(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return f("A note is required for this attestation.","error"),!1;try{await $.attestTicketRitual(t,n,s),f("Ritual attested!","success"),P(),await hn(n)}catch(i){f(i.message,"error")}return!1}async function Cp(e,t){try{await $.attestTicketRitual(e,t),f("Ritual attested!","success"),await hn(t)}catch(n){f(n.message,"error")}}async function Lp(e,t){try{await $.approveTicketRitual(e,t),f("Ritual approved!","success"),await hn(t)}catch(n){f(n.message,"error")}}function Ap(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Bp(s,e,t)}),D()}async function Bp(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await $.completeTicketGateRitual(t,n,s||null),f("Ritual completed!","success"),P(),await hn(n)}catch(i){f(i.message,"error")}return!1}const rr=["backlog","todo","in_progress","in_review","done","canceled"],lr=["no_priority","urgent","high","medium","low"],Dp=["task","bug","feature","chore","docs","tech_debt","epic"];let it=[],cr=Promise.resolve(),y={api:null,getIssues:()=>[],setIssues:()=>{},getMyIssues:()=>[],setMyIssues:()=>{},getCurrentDetailIssue:()=>null,setCurrentDetailIssue:()=>{},getLabels:()=>[],setLabels:()=>{},getCurrentTeam:()=>null,getCurrentDetailSprints:()=>[],closeAllDropdowns:()=>{},registerDropdownClickOutside:()=>{},setDropdownKeyHandler:()=>{},showToast:()=>{},getStatusIcon:()=>"",getPriorityIcon:()=>"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatAssigneeOptionLabel:e=>(e==null?void 0:e.name)||"",getAssigneeOptionList:()=>[],getAssigneeById:()=>null,getEstimateOptions:()=>[],renderAvatar:()=>"",renderIssueRow:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",updateSprintCacheForProject:()=>{},updateSprintBudgetBar:()=>{}};function Mp(e){y={...y,...e}}async function dr(e,t,n){var d,m;e.preventDefault(),y.closeAllDropdowns();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${rr.map((p,h)=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${y.escapeJsString(n)}', 'status', '${p}')">
                    ${y.getStatusIcon(p)}
                    <span>${y.formatStatus(p)}</span>
                    <span class="dropdown-shortcut">${h+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${lr.map((p,h)=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${y.escapeJsString(n)}', 'priority', '${p}')">
                    ${y.getPriorityIcon(p)}
                    <span>${y.formatPriority(p)}</span>
                    <span class="dropdown-shortcut">${h}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Dp.map(p=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${y.escapeJsString(n)}', 'issue_type', '${p}')">
                    <span class="issue-type-badge type-${p}">${y.formatIssueType(p)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const p=y.getAssigneeOptionList();a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" onclick="updateIssueField('${y.escapeJsString(n)}', 'assignee_id', null)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${p.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:p.map(({assignee:h,indent:b},I)=>`
                <button class="dropdown-option" onclick="updateIssueField('${y.escapeJsString(n)}', 'assignee_id', '${y.escapeJsString(h.id)}')">
                    ${y.renderAvatar(h,"avatar-small")}
                    <span>${y.formatAssigneeOptionLabel(h,b)}</span>
                    ${I<9?`<span class="dropdown-shortcut">${I+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const p=document.querySelector(`.issue-row[data-issue-id="${n}"]`),h=(p==null?void 0:p.dataset.projectId)||((d=y.getCurrentDetailIssue())==null?void 0:d.project_id),b=y.getEstimateOptions(h);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${b.map((I,S)=>`
                <button class="dropdown-option" onclick="updateIssueField('${y.escapeJsString(n)}', 'estimate', ${I.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${I.label}</span>
                    ${S<9?`<span class="dropdown-shortcut">${S}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const p=y.getIssues(),h=y.getMyIssues(),b=y.getCurrentDetailIssue(),I=p.find(ie=>ie.id===n)||h.find(ie=>ie.id===n)||b,S=new Set(((I==null?void 0:I.labels)||[]).map(ie=>ie.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const A=a.getBoundingClientRect();let M=i.bottom+4,N=i.left;N+A.width>window.innerWidth-8&&(N=i.right-A.width),M+A.height>window.innerHeight-8&&(M=i.top-A.height-4),a.style.top=`${M}px`,a.style.left=`${Math.max(8,N)}px`,y.registerDropdownClickOutside(a,{multiSelect:!0});let B=[];const F=y.getCurrentTeam();if(F)try{B=await y.api.getLabels(F.id)}catch(ie){console.error("Failed to load labels:",ie)}if(!a.parentNode)return;mr(a,n,B,S);const w=a.getBoundingClientRect();let K=i.bottom+4,Ie=i.left;Ie+w.width>window.innerWidth-8&&(Ie=i.right-w.width),K+w.height>window.innerHeight-8&&(K=i.top-w.height-4),a.style.top=`${K}px`,a.style.left=`${Math.max(8,Ie)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const p=y.getIssues(),h=y.getMyIssues(),b=y.getCurrentDetailIssue(),I=p.find(ae=>ae.id===n)||h.find(ae=>ae.id===n)||b,S=(I==null?void 0:I.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const A=a.getBoundingClientRect();let M=i.bottom+4,N=i.left;N+A.width>window.innerWidth-8&&(N=i.right-A.width),M+A.height>window.innerHeight-8&&(M=i.top-A.height-4),a.style.top=`${M}px`,a.style.left=`${Math.max(8,N)}px`,y.registerDropdownClickOutside(a);let B=[];if(S)try{B=await y.api.getSprints(S),y.updateSprintCacheForProject(S,B)}catch(ae){console.error("Failed to load sprints:",ae)}if(!a.parentNode)return;const F=B.filter(ae=>ae.status!=="completed"||ae.id===(I==null?void 0:I.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${y.escapeJsString(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${F.map((ae,W)=>`
                <button class="dropdown-option" onclick="updateIssueField('${y.escapeJsString(n)}', 'sprint_id', '${y.escapeJsString(ae.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${y.escapeHtml(ae.name)}${ae.status==="active"?" (Active)":""}</span>
                    ${W<9?`<span class="dropdown-shortcut">${W+1}</span>`:""}
                </button>
            `).join("")}
        `;const w=a.getBoundingClientRect();let K=i.bottom+4,Ie=i.left;Ie+w.width>window.innerWidth-8&&(Ie=i.right-w.width),K+w.height>window.innerHeight-8&&(K=i.top-w.height-4),a.style.top=`${K}px`,a.style.left=`${Math.max(8,Ie)}px`,a.classList.remove("dropdown-positioning");const ie=ae=>{const W=ae.key;if(W==="Escape"){y.closeAllDropdowns(),document.removeEventListener("keydown",ie),y.setDropdownKeyHandler(null);return}const ze=parseInt(W);if(isNaN(ze))return;const Mt=a.querySelectorAll(".dropdown-option");let ft=!1;ze===0?(vn(n,"sprint_id",null),ft=!0):ze>=1&&ze<Mt.length&&(Mt[ze].click(),ft=!0),ft&&(document.removeEventListener("keydown",ie),y.setDropdownKeyHandler(null))};y.setDropdownKeyHandler(ie),document.addEventListener("keydown",ie);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const o=a.getBoundingClientRect();let r=i.bottom+4,c=i.left;c+o.width>window.innerWidth-8&&(c=i.right-o.width),r+o.height>window.innerHeight-8&&(r=i.top-o.height-4),a.style.top=`${r}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const l=p=>{const h=p.key;if(h==="Escape"){y.closeAllDropdowns(),document.removeEventListener("keydown",l);return}const b=parseInt(h);if(isNaN(b))return;let I=!1;if(t==="status"&&b>=1&&b<=6)vn(n,"status",rr[b-1]),I=!0;else if(t==="priority"&&b>=0&&b<=4)vn(n,"priority",lr[b]),I=!0;else if(t==="estimate"){const S=y.getCurrentDetailIssue(),A=y.getEstimateOptions(S==null?void 0:S.project_id);b>=0&&b<A.length&&(vn(n,"estimate",A[b].value),I=!0)}I&&(document.removeEventListener("keydown",l),y.setDropdownKeyHandler(null))};y.setDropdownKeyHandler(l),document.addEventListener("keydown",l),y.registerDropdownClickOutside(a)}function ur(e,t,n){e.stopPropagation(),dr(e,t,n)}function jp(e,t,n){cr=cr.then(()=>pr(e,t,n))}async function pr(e,t,n){const s=y.getIssues(),i=y.getMyIssues(),a=y.getCurrentDetailIssue(),o=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),c=r.indexOf(t);let l;if(c>=0?l=r.filter(d=>d!==t):l=[...r,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const m=(await y.api.updateIssue(e,{label_ids:l})).labels||[],p=s.findIndex(S=>S.id===e);p!==-1&&(s[p].labels=m,y.setIssues([...s]));const h=i.findIndex(S=>S.id===e);h!==-1&&(i[h].labels=m,y.setMyIssues([...i])),(a==null?void 0:a.id)===e&&y.setCurrentDetailIssue({...a,labels:m});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const S=s.find(A=>A.id===e)||i.find(A=>A.id===e);S&&(b.outerHTML=y.renderIssueRow(S))}const I=document.querySelector(".property-labels-btn");I&&(I.innerHTML=m.length>0?m.map(S=>`
                    <span class="issue-label" style="background: ${y.sanitizeColor(S.color)}20; color: ${y.sanitizeColor(S.color)}">${y.escapeHtml(S.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(y.showToast("Failed to update labels","error"),n){const d=c>=0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}}}function mr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleLabelCreateKey(event, '${y.escapeJsString(t)}')">
            <button class="btn btn-small" onclick="createLabelFromDropdown('${y.escapeJsString(t)}')">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-label-id="${i.id}" onclick="event.stopPropagation(); toggleIssueLabel('${y.escapeJsString(t)}', '${y.escapeJsString(i.id)}', this)">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${y.sanitizeColor(i.color)}20; color: ${y.sanitizeColor(i.color)}">${y.escapeHtml(i.name)}</span>
                </button>
            `}).join("")}
    `}async function Rp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=y.getCurrentTeam();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await y.api.createLabel(s.id,{name:i}),o=await y.api.getLabels(s.id);y.setLabels(o),a!=null&&a.id&&await pr(e,a.id,null);const r=y.getIssues(),c=y.getMyIssues(),l=y.getCurrentDetailIssue(),d=r.find(p=>p.id===e)||c.find(p=>p.id===e)||l,m=new Set(((d==null?void 0:d.labels)||[]).map(p=>p.id));t&&mr(t,e,o,m),n.value=""}catch(a){y.showToast(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function os(){const e=document.getElementById("create-issue-labels-label");e&&(it.length===0?e.textContent="Labels":e.textContent=`Labels (${it.length})`)}function Ci(e){const t=y.getLabels();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=it.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${y.escapeJsString(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${y.sanitizeColor(n.color)}20; color: ${y.sanitizeColor(n.color)}">${y.escapeHtml(n.name)}</span>
                </button>
            `}).join("")}
    `}function Pp(e){const t=it.indexOf(e);t>=0?it.splice(t,1):it.push(e),os();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Ci(n)}async function Np(){const e=y.getCurrentTeam();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await y.api.createLabel(e.id,{name:s}),a=await y.api.getLabels(e.id);y.setLabels(a),i!=null&&i.id&&!it.includes(i.id)&&it.push(i.id),os(),t&&Ci(t),n.value=""}catch(i){y.showToast(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function vn(e,t,n){var i;y.closeAllDropdowns();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await y.api.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=y.getIssues(),c=r.findIndex(p=>p.id===e);c!==-1&&(r[c]=o,y.setIssues([...r]));const l=y.getMyIssues(),d=l.findIndex(p=>p.id===e);d!==-1&&(l[d]=o,y.setMyIssues([...l]));const m=y.getCurrentDetailIssue();if((m==null?void 0:m.id)===e&&y.setCurrentDetailIssue(o),s&&s.parentNode){const p=r.find(h=>h.id===e)||l.find(h=>h.id===e)||o;if(p){s.outerHTML=y.renderIssueRow(p);const h=document.querySelector(`.issue-row[data-issue-id="${e}"]`);h&&(h.classList.add("updated"),setTimeout(()=>h.classList.remove("updated"),500))}}if(y.showToast("Issue updated","success"),t==="status"){const p=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(p)try{const b=(await y.api.getSprints(p)).find(I=>I.status==="active");y.updateSprintBudgetBar(b||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&Hp(t,o)}}catch(a){y.showToast(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function Hp(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${y.getStatusIcon(t.status)}
            <span>${y.formatStatus(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${y.getPriorityIcon(t.priority)}
            <span>${y.formatPriority(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${y.formatIssueType(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?y.getAssigneeById(t.assignee_id):null,l=c?y.formatAssigneeName(c):null;r.innerHTML=l?`${y.renderAvatar(c,"avatar-small")}<span>${y.escapeHtml(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=y.getCurrentDetailSprints(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?y.escapeHtml(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${y.formatEstimate(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}const at=new Map,gr=6e4,Li=100;let se=null,Ai=null,Bi=null,bn=null,fr=!1;const Op={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Fp={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},hr={api:null};let Di={...hr};function qp(e={}){Di={...hr,...e},se||(se=document.createElement("div"),se.className="issue-tooltip",se.style.display="none",document.body.appendChild(se),se.addEventListener("mouseenter",()=>{clearTimeout(Ai)}),se.addEventListener("mouseleave",()=>{vr()})),fr||(document.addEventListener("mouseover",Up),document.addEventListener("mouseout",Gp),fr=!0)}function Up(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=zp(t);if(n){if(n===bn&&se.style.display!=="none"){clearTimeout(Ai);return}clearTimeout(Bi),Bi=setTimeout(()=>{Kp(t,n)},200)}}function Gp(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Bi),Ai=setTimeout(()=>{vr()},150))}function zp(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Kp(e,t){bn=t;const n=e.getBoundingClientRect();se.style.left=`${n.left+window.scrollX}px`,se.style.top=`${n.bottom+window.scrollY+8}px`,se.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',se.style.display="block";try{const s=await Vp(t);if(bn!==t)return;Jp(s)}catch{if(bn!==t)return;se.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function vr(){se&&(se.style.display="none"),bn=null}function Wp(){const e=Date.now();for(const[t,n]of at.entries())e-n.timestamp>=gr&&at.delete(t)}async function Vp(e){at.size>Li/2&&Wp();const t=at.get(e);if(t&&Date.now()-t.timestamp<gr)return t.issue;if(!Di.api)throw new Error("API not initialized");const n=await Di.api.getIssueByIdentifier(e);if(at.size>=Li){const s=Array.from(at.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Li/2);for(const[a]of i)at.delete(a)}return at.set(e,{issue:n,timestamp:Date.now()}),n}function Jp(e){const t=Op[e.status]||"#6b7280",n=Fp[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";se.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${g(e.identifier)}</span>
            <span class="issue-tooltip-type">${g(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${g(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Zp(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Yp(e.priority)}</span>
        </div>
    `}function Zp(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Yp(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}let rs=0;function br(e){const t=Md();t&&(t.close(),Eo(null));const n=api.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Eo(a),a.onopen=()=>{console.log("WebSocket connected"),rs>0&&f("Live updates reconnected","success"),rs=0},a.onmessage=o=>{const r=JSON.parse(o.data);Xp(r)},a.onclose=()=>{console.log("WebSocket disconnected"),rs++,rs===1&&f("Live updates disconnected. Reconnecting...","warning"),setTimeout(()=>{window.currentTeam&&window.currentTeam.id===e&&br(e)},5e3)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Xp(e){var i,a,o,r,c,l;const{type:t,entity:n,data:s}=e;if(n==="issue"){if(t==="created"){const d=Oe(),m=d.findIndex(h=>h.id===s.id),p=d.findIndex(h=>h._isOptimistic&&h.title===s.title);if(!(m>=0))if(p>=0){const h=[...d];h[p]=s,Fe(h),H()==="issues"&&Ue()}else Fe([s,...d]),H()==="issues"&&Ue(),f(`New issue: ${s.identifier}`,"info");if(s.assignee_id===((i=ri())==null?void 0:i.id)){const h=Yn(),b=h.findIndex(S=>S.id===s.id),I=h.findIndex(S=>S._isOptimistic&&S.title===s.title);if(b===-1&&I===-1)un([s,...h]),H()==="my-issues"&&pn();else if(I>=0){const S=[...h];S[I]=s,un(S),H()==="my-issues"&&pn()}}H()==="my-issues"&&xt(),H()==="board"?et():H()==="sprints"&&Xe(),H()==="issue-detail"&&s.parent_id===((a=window.currentDetailIssue)==null?void 0:a.id)&&ee(window.currentDetailIssue.id,!1)}else if(t==="updated"){const d=Oe(),m=d.findIndex(b=>b.id===s.id);if(m>=0){const b=[...d];b[m]=s,Fe(b)}const p=Yn(),h=p.findIndex(b=>b.id===s.id);if(h>=0){const b=[...p];b[h]=s,un(b)}if(H()==="issues")Ue();else if(H()==="my-issues")pn(),xt();else if(H()==="board")et();else if(H()==="sprints")Xe();else if(H()==="issue-detail"){const b=document.getElementById("issue-detail-content");b&&b.dataset.issueId===s.id&&ee(s.id)}}else t==="deleted"&&(Fe(Oe().filter(d=>d.id!==s.id)),un(Yn().filter(d=>d.id!==s.id)),H()==="issues"?Ue():H()==="my-issues"?(pn(),xt()):H()==="board"?et():H()==="sprints"&&Xe(),f(`Issue ${s.identifier} deleted`,"info"));H()==="issue-detail"&&((o=window.currentDetailIssue)==null?void 0:o.id)===s.id&&(f(`Issue ${s.identifier} was deleted`,"warning"),G("my-issues"))}else if(n==="comment")H()==="my-issues"&&xt(),H()==="issue-detail"&&((r=window.currentDetailIssue)==null?void 0:r.id)===s.issue_id&&ee(s.issue_id,!1);else if(n==="relation"){if(H()==="issue-detail"){const d=(c=window.currentDetailIssue)==null?void 0:c.id;d&&(s.source_issue_id===d||s.target_issue_id===d)&&ee(d,!1)}}else n==="activity"&&(H()==="my-issues"&&xt(),H()==="issue-detail"&&((l=window.currentDetailIssue)==null?void 0:l.id)===s.issue_id&&ee(s.issue_id,!1))}window.currentTeam=null;let yn=[],wn=[],ls=[];function yr(){const e=document.getElementById("hamburger-btn");e&&e.setAttribute("aria-expanded",String(document.body.classList.contains("sidebar-open")))}function Qp(){document.body.classList.toggle("sidebar-open"),yr()}function cs(){document.body.classList.remove("sidebar-open"),yr()}window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&cs()});function wr(e){if(!e)return"";if(typeof marked<"u"&&typeof DOMPurify<"u")try{marked.setOptions({breaks:!0,gfm:!0});const n=marked.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return DOMPurify.sanitize(n,{FORCE_BODY:!0})}catch(t){console.error("Markdown parsing error:",t)}return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const kr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];Xu({beforeNavigate:()=>{Qa(),window._onRitualsChanged=null,window.currentDetailIssue=null,window.currentDetailSprints=null,cs()},detailRoute:e=>e[0]==="issue"&&e[1]?(as(e[1]),!0):e[0]==="document"&&e[1]?(nm(e[1]),!0):e[0]==="sprint"&&e[1]?(Od(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Ya(e[1]),!0):!1,detailPopstate:e=>e.issueId?(ee(e.issueId,!1),!0):e.identifier?(as(e.identifier),!0):e.documentId?(Ee(e.documentId,!1),!0):e.sprintId?(di(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=dt();e&&X().some(t=>t.id===e)&&ct(e)},issueNavigate:e=>as(e)}),Yu({"my-issues":()=>{ei(),xt()},"gate-approvals":()=>{rm()},issues:()=>{ku(),Vu(),wu().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Mo())}}),Uo().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}gt()})},epics:()=>{tp()},board:()=>{gi()},projects:()=>{fe().then(rn)},sprints:()=>{To()},rituals:()=>{ar()},documents:()=>{$t()},team:()=>{Ws(),Ka(),qn()},settings:()=>{Xs(),qs(),wp()}}),document.addEventListener("DOMContentLoaded",async()=>{if(em(),tm(),qp({api}),ep(),api.getToken())try{const e=await api.getMe();_d(e),window.currentUser=e,await $r()}catch{api.logout(),Pn()}else Pn()});function em(){const e=document.getElementById("theme-toggle");if(!e)return;const n=localStorage.getItem("chaotic_theme")==="light";document.body.classList.toggle("theme-light",n),e.checked=n,e.addEventListener("change",()=>{const s=e.checked;document.body.classList.toggle("theme-light",s),localStorage.setItem("chaotic_theme",s?"light":"dark")})}function tm(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");ss(s)}}})}document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"){const t=document.activeElement,n=t==null?void 0:t.closest("form");if(n){e.preventDefault();const s=new Event("submit",{bubbles:!0,cancelable:!0});n.dispatchEvent(s)}}});async function $r(){_a(),Ba(),await Fn();const e=Oa();if(e.length===0&&!fo()){ii();return}e.length>0&&await zs(e[0],!0)}window.initApp=$r,window.viewIssue=ee,window.viewIssueByPath=as,window.handleDescriptionClick=tr,window.toggleTicketRituals=sr,window.toggleSection=nr,window.toggleCreateIssueOptions=pm,window.connectWebSocket=br,window.buildAssignees=am,window.updateAssigneeFilter=om,window.loadLabels=Em,window.resetOnboarding=oi,window.viewDocument=Ee;async function nm(e){try{await Ee(e,!1)}catch{G("documents",!1)}}function sm(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function im(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function am(){const e=It().map(sm),t=Ac().map(im);yn=[...e,...t]}function Mi(e){return e&&yn.find(t=>t.id===e)||null}function kn(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function ji(e,t=!1){const n=g(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${g(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ds(){const e=yn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));yn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=yn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function om(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ds().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${ji(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}async function rm(){if(!window.currentTeam)return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=[];for(const n of X()){const s=await api.getPendingApprovals(n.id);t.push(...s)}Ad(t),lm()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${g(t.message)}</p></div>`}}}function lm(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=Ld();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No pending approvals</h3>
                <p>All rituals have been completed. Nice work!</p>
            </div>
        `;return}const n=c=>c.pending_approvals||[],s=c=>l=>{const d=n(l).filter(c);return d.length>0?{...l,_filteredApprovals:d}:null},i=t.map(s(c=>c.approval_mode==="gate"&&c.limbo_type==="claim")).filter(Boolean),a=t.map(s(c=>c.approval_mode==="gate"&&c.limbo_type==="close")).filter(Boolean),o=t.map(s(c=>c.approval_mode==="review")).filter(Boolean);let r="";i.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${i.map(Ri).join("")}
                </div>
            </div>
        `),a.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${a.map(Ri).join("")}
                </div>
            </div>
        `),o.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${o.map(Ri).join("")}
                </div>
            </div>
        `),e.innerHTML=r,e.querySelectorAll(".gate-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;ro(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;approveReviewFromList(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt,l.attestationNote)})})}function Ri(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${g(s.requested_by_name)}</strong>${s.requested_at?` (${Tm(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note"><em>${g(s.attestation_note)}</em></div>`:"",c=i?"review-approve-btn":"gate-approve-btn",l=i?"Approve":"Complete",d=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${g(s.ritual_name)} ${d}</span>
                    <span class="gate-ritual-prompt">${g(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                <button class="btn btn-small btn-primary ${c}"
                    data-ritual-id="${_(s.ritual_id)}"
                    data-issue-id="${_(e.issue_id)}"
                    data-ritual-name="${_(s.ritual_name)}"
                    data-ritual-prompt="${_(s.ritual_prompt)}"
                    data-issue-identifier="${_(e.identifier)}"
                    data-issue-title="${_(e.title)}"
                    data-requested-by="${_(s.requested_by_name||"")}"
                    data-requested-at="${_(s.requested_at||"")}"
                    data-attestation-note="${_(s.attestation_note||"")}">${l}</button>
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${E(e.issue_id)}')" class="gate-issue-link">
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
    `}function Dt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function cm(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function us(e,t="avatar-small"){const n=kn(e)||"User",s=e==null?void 0:e.avatar_url;return s?cm(s)?`<img class="${t} avatar-img" src="${_(s)}" alt="${_(n)}">`:`<div class="${t} avatar-emoji">${g(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function dm(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function um(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=It().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:dm(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${_(l.handle)}">
                <span class="mention-name">${g(l.name)}</span>
                <span class="mention-handle">@${g(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.handle,m=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),p=e.value.slice(i);e.value=m+p,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}function Pi(e=null){var s;const t=e||((s=document.getElementById("project-filter"))==null?void 0:s.value);ls=[];const n=X().map(i=>`
        <option value="${i.id}" ${i.id===t?"selected":""}>${g(i.name)}</option>
    `).join("");document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <select id="create-issue-project" class="project-select" onchange="updateCreateIssueProject()">
                    <option value="">Select project</option>
                    ${n}
                </select>
                <span class="create-issue-breadcrumb">› New issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" onclick="toggleCreateIssueOptions()">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-options-content">
                    <div class="create-issue-template">
                        <label for="create-issue-template">Template</label>
                        <select id="create-issue-template" onchange="applyIssueTemplate(this.value)">
                            ${kr.map(i=>`<option value="${i.id}">${i.label}</option>`).join("")}
                        </select>
                    </div>
                    <div class="create-issue-meta">
                        <label for="create-issue-due-date">Due date</label>
                        <input type="date" id="create-issue-due-date" class="create-issue-date-input">
                    </div>
                </div>
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('status', event)">
                            ${nt("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${tt("no_priority")}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" onclick="toggleCreateIssueDropdown('type', event)">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" onclick="toggleCreateIssueDropdown('labels', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('assignee', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('estimate', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('sprint', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span id="create-issue-sprint-label">Sprint</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" id="btn-create-and-new" class="btn btn-secondary" onclick="handleCreateIssueAndNew()">Create & New</button>
                <button type="button" id="btn-create-issue" class="btn btn-primary" onclick="handleCreateIssueNew()">Create issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
            <input type="hidden" id="create-issue-sprint" value="">
        </div>
    `,D(),os(),document.getElementById("create-issue-title").focus()}function pm(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function mm(e){const t=kr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function gm(e,t){const n=X().find(s=>s.id===t);ls=[],document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?g(n.name):"Project"}</span>
                <span class="create-issue-breadcrumb">› New sub-issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Sub-issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" onclick="toggleCreateIssueOptions()">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('status', event)">
                            ${nt("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${tt("no_priority")}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" onclick="toggleCreateIssueDropdown('type', event)">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" onclick="toggleCreateIssueDropdown('labels', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('assignee', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('estimate', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" class="btn btn-primary" onclick="handleCreateSubIssue('${E(e)}', '${E(t)}')">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,D(),os(),document.getElementById("create-issue-title").focus()}async function fm(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null;if(!n){f("Please enter a title","error");return}try{const d=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:ls,parent_id:e});P(),f(`Created sub-issue ${d.identifier}`,"success"),ee(e)}catch(d){f(`Failed to create sub-issue: ${d.message}`,"error")}}async function hm(e,t){var a,o;Yt();const s=t.currentTarget.getBoundingClientRect(),i=document.createElement("div");if(i.className="inline-dropdown dropdown-positioning",i.style.top=`${s.top-8}px`,i.style.left=`${s.left}px`,i.style.transform="translateY(-100%)",i.style.animation="none",e==="status"){const r=document.getElementById("create-issue-status").value;i.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('status', '${c}', '${Je(c)}')">
                    ${nt(c)}
                    <span>${Je(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const r=document.getElementById("create-issue-priority").value;i.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('priority', '${c}', '${Me(c)}')">
                    ${tt(c)}
                    <span>${Me(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const r=document.getElementById("create-issue-type").value;i.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('type', '${c}', '${Dt(c)}')">
                    <span class="issue-type-badge type-${c}">${Dt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!window.currentTeam)i.innerHTML='<div class="dropdown-header">Select a team first</div>';else{if(wn.length===0)try{wn=await api.getLabels(window.currentTeam.id)}catch(r){console.error("Failed to load labels:",r)}Ci(i),document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),jn(i,{multiSelect:!0});return}else if(e==="assignee"){const r=document.getElementById("create-issue-assignee").value,c=ds();i.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${r?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:l,indent:d})=>{const m=kn(l)||"User";return`
                <button class="dropdown-option ${l.id===r?"selected":""}" onclick="setCreateIssueField('assignee', '${E(l.id)}', '${E(m)}')">
                    ${us(l,"avatar-small")}
                    <span>${ji(l,d)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const r=document.getElementById("create-issue-estimate").value,c=(a=document.getElementById("create-issue-project"))==null?void 0:a.value,l=Un(c);i.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(d=>{const m=d.value===null?"":String(d.value);return`
                <button class="dropdown-option ${m===r?"selected":""}" onclick="setCreateIssueField('estimate', '${m}', '${d.value?d.label:"Estimate"}')">
                    <span>${d.label}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const r=document.getElementById("create-issue-sprint").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value;if(!c)i.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const d=(await api.getSprints(c)).filter(m=>m.status!=="completed");i.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${r?"":"selected"}" onclick="setCreateIssueField('sprint', '', 'Sprint')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${d.map(m=>`
                        <button class="dropdown-option ${m.id===r?"selected":""}" onclick="setCreateIssueField('sprint', '${E(m.id)}', '${E(m.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${g(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{i.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),jn(i)}function vm(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function bm(e,t,n){if(document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,e==="status"){const s=document.querySelector(".toolbar-btn:first-child");s.innerHTML=`${nt(t)}<span id="create-issue-status-label">${n}</span>`}else if(e==="priority"){const s=document.querySelectorAll(".toolbar-btn")[1];s.innerHTML=`${tt(t)}<span id="create-issue-priority-label">${n}</span>`}else if(e==="type"){const s=document.getElementById("create-issue-type-btn");s&&(s.innerHTML=`<span class="issue-type-badge type-${t}">${Dt(t)}</span><span id="create-issue-type-label">${n}</span>`)}Yt()}async function Er({keepOpen:e=!1}={}){var I,S;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null,d=((I=document.getElementById("create-issue-sprint"))==null?void 0:I.value)||null,m=(S=document.getElementById("create-issue-due-date"))==null?void 0:S.value,p=m?new Date(`${m}T00:00:00Z`).toISOString():null;if(!t){f("Please select a project","error");return}if(!n){f("Please enter a title","error");return}const h=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");h&&(h.disabled=!0),b&&(b.disabled=!0);try{const A=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:d,label_ids:ls,due_date:p});f(`Created ${A.identifier}`,"success"),H()==="issues"?gt():H()==="my-issues"&&ei(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(P(),ee(A.id))}catch(A){f(`Failed to create issue: ${A.message}`,"error")}finally{h&&(h.disabled=!1),b&&(b.disabled=!1)}}async function ym(){await Er({keepOpen:!1})}async function wm(){await Er({keepOpen:!0})}async function Ir(e){try{const t=await api.getIssue(e),n=await api.getSprints(t.project_id),i=(window.getEstimateOptions?window.getEstimateOptions(t.project_id):[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}]).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${g(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${E(e)}')">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${_(t.title)}" required>
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
        `,D()}catch(t){f(`Failed to load issue: ${t.message}`,"error")}}async function km(e,t){e.preventDefault();try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await api.updateIssue(t,l),P(),await ee(t),f("Issue updated!","success")}catch(n){f(`Failed to update issue: ${n.message}`,"error")}return!1}async function $m(e){if(confirm("Are you sure you want to delete this issue?"))try{await api.deleteIssue(e),await gt(),await fe(),G("issues"),f("Issue deleted!","success")}catch(t){f(`Failed to delete issue: ${t.message}`,"error")}}async function Em(){if(window.currentTeam)try{wn=await api.getLabels(window.currentTeam.id)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("keydown",ip({closeModal:P,closeSidebar:cs,navigateTo:G,showCreateIssueModal:Pi,showKeyboardShortcutsHelp:Tr,isModalOpen:()=>!document.getElementById("modal-overlay").classList.contains("hidden"),focusSearch:()=>{G("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function Tr(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <h4 style="margin-bottom: 0.75rem; color: var(--text-secondary)">Navigation</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Dashboard</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">m</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>All Issues</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">i</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Board</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">b</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Projects</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">p</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Sprints</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g s</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Documents</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g d</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Team</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g t</kbd>
                </div>
            </div>
            <div>
                <h4 style="margin-bottom: 0.75rem; color: var(--text-secondary)">Actions</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Command palette</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">⌘K</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Search issues</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">/</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Create new item</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">c</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Navigate list</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">j/k</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Close modal</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">Esc</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Show shortcuts</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">?</kbd>
                </div>
            </div>
        </div>
    `,D()}hd([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>G("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>G("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>G("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>G("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>G("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>G("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>G("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{G("issues"),setTimeout(Pi,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{G("projects"),setTimeout(Zs,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{G("documents"),setTimeout(Fs,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Js(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{G("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{G("team"),setTimeout(Vs,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Tr(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>oi(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Ns(),category:"Account"}]),kd({getCurrentUser:ri,getCurrentTeam:()=>window.currentTeam,renderIssueRow:Se,formatActivityText:Xo,formatActivityActor:Yo,getActivityIcon:Zo,navigateToIssueByIdentifier:ss,viewDocument:Ee}),nu({api,showToast:f,getProjects:X,getProjectFromUrl:dt,setGlobalProjectSelection:ct,updateUrlWithProject:Xn,escapeHtml:g,escapeAttr:_,escapeJsString:E,formatPriority:Me}),pu({getIssues:Oe,getAssigneeById:Mi,formatAssigneeName:kn,formatEstimate:Gn,getSprintCache:jd,formatStatus:Je,formatPriority:Me,formatIssueType:Dt,escapeHtml:g,escapeAttr:_,escapeJsString:E,sanitizeColor:ge,renderAvatar:us,getAssigneeOptionList:ds,getGroupByValue:Ko}),Mp({api,getIssues:Oe,setIssues:Fe,getMyIssues:Yn,setMyIssues:un,getCurrentDetailIssue:()=>window.currentDetailIssue,setCurrentDetailIssue:e=>{window.currentDetailIssue=e},getLabels:()=>wn,setLabels:e=>{wn=e},getCurrentTeam:()=>window.currentTeam,getCurrentDetailSprints:()=>window.currentDetailSprints,closeAllDropdowns:Yt,registerDropdownClickOutside:jn,setDropdownKeyHandler:sc,showToast:f,getStatusIcon:nt,getPriorityIcon:tt,formatStatus:Je,formatPriority:Me,formatIssueType:Dt,formatEstimate:Gn,formatAssigneeName:kn,formatAssigneeOptionLabel:ji,getAssigneeOptionList:ds,getAssigneeById:Mi,getEstimateOptions:Un,renderAvatar:us,renderIssueRow:Se,escapeHtml:g,escapeAttr:_,escapeJsString:E,sanitizeColor:ge,updateSprintCacheForProject:eu,updateSprintBudgetBar:$i}),ap({api,getCurrentView:H,showToast:f,showModal:D,closeModal:P,navigateTo:G,getProjects:X,getMembers:It,getAssigneeById:Mi,formatAssigneeName:kn,formatStatus:Je,formatPriority:Me,formatIssueType:Dt,formatEstimate:Gn,formatTimeAgo:Xt,getStatusIcon:nt,getPriorityIcon:tt,renderMarkdown:wr,renderAvatar:us,escapeHtml:g,escapeAttr:_,escapeJsString:E,sanitizeColor:ge,showDetailDropdown:ur,setupMentionAutocomplete:um,renderTicketRitualActions:_p});const Im=D;window.showModal=function(){Im(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"&&!document.getElementById("modal-overlay").classList.contains("hidden")){const n=document.querySelector("#modal-content form");if(n)e.preventDefault(),n.dispatchEvent(new Event("submit",{cancelable:!0}));else{const s=document.querySelector("#modal-content .btn-primary");s&&!s.disabled&&(e.preventDefault(),s.click())}}(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),po()?Zn():vd())});function Tm(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}async function _m(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){f("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=X().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Fe([r,...Oe()]),Ue();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=Oe(),m=d.findIndex(p=>p.id===a);m!==-1&&(d[m]=l,Fe(d)),Ue(),fe(),f("Issue created!","success")}catch(l){Fe(Oe().filter(d=>d.id!==a)),Ue(),f(`Failed to create issue: ${l.message}`,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}function _r(e){const t=document.querySelectorAll("#issues-list .list-item");t.length!==0&&(e=Math.max(0,Math.min(t.length-1,e)),t.forEach(n=>n.classList.remove("keyboard-selected")),$o(e),t[e].classList.add("keyboard-selected"),t[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}document.addEventListener("keydown",e=>{if(H()!=="issues"||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="SELECT"||!document.getElementById("modal-overlay").classList.contains("hidden")||po())return;const t=document.querySelectorAll("#issues-list .list-item");if(t.length===0)return;const n=Cd();switch(e.key){case"j":e.preventDefault(),_r(n+1);break;case"k":e.preventDefault(),_r(n-1);break;case"Enter":if(n>=0&&t[n]){e.preventDefault();const s=t[n].dataset.id;s&&!s.startsWith("temp-")&&ee(s)}break;case"e":if(n>=0&&t[n]){e.preventDefault();const s=t[n].dataset.id;s&&!s.startsWith("temp-")&&Ir(s)}break}}),Object.assign(window,{escapeHtml:g,renderMarkdown:wr,handleLogin:Ca,handleSignup:La,showLogin:xa,showSignup:Sa,logout:Ns,navigateTo:G,handleRoute:Vo,closeModal:P,toggleSidebar:Qp,closeSidebar:cs,getProjectFromUrl:dt,updateUrlWithProject:Xn,toggleTeamDropdown:Ks,toggleUserDropdown:qa,showCreateTeamModal:Js,showEditTeamModal:Va,showInviteModal:Vs,showCreateIssueModal:Pi,loadIssues:gt,filterIssues:Ge,filterMyIssues:go,debounceSearch:Ju,handleQuickCreate:_m,onProjectFilterChange:Go,updateGroupBy:zo,toggleGroup:bu,viewIssue:ee,showEditIssueModal:Ir,editDescription:up,handleDescriptionClick:tr,setDescriptionEditorMode:pp,updateIssueField:vn,handleUpdateDescription:mp,handleUpdateIssue:km,deleteIssue:$m,navigateToIssueByIdentifier:ss,handleCreateIssueNew:ym,handleCreateIssueAndNew:wm,setCreateIssueField:bm,toggleCreateIssueDropdown:hm,toggleCreateIssueLabelSelection:Pp,createLabelForCreateIssue:Np,createLabelFromDropdown:Rp,handleAddComment:dp,showCreateSubIssueModal:gm,handleCreateSubIssue:fm,showAddRelationModal:gp,handleAddRelation:bp,deleteRelation:yp,searchIssuesToRelate:fp,selectIssueForRelation:hp,clearSelectedRelation:vp,showDetailDropdown:ur,showInlineDropdown:dr,toggleIssueLabel:jp,toggleMultiSelect:yu,updateStatusFilter:hi,updatePriorityFilter:bi,updateLabelFilter:wi,clearStatusFilter:vi,clearPriorityFilter:yi,clearLabelFilter:ki,toggleFilterMenu:Iu,toggleDisplayMenu:Tu,showFilterCategoryOptions:ke,setProjectFilter:Ho,clearProjectFilter:Mu,toggleStatusOption:ju,clearStatusFilterNew:Ru,togglePriorityOption:Pu,clearPriorityFilterNew:Nu,setTypeFilter:Oo,clearTypeFilter:Hu,setAssigneeFilter:Fo,clearAssigneeFilter:Ou,setSprintFilter:qo,clearSprintFilter:Fu,toggleLabelOption:qu,clearLabelFilterNew:Uu,setSort:zu,setGroupBy:Ku,clearAllFilters:Wu,updateFilterChips:he,updateFilterCountBadge:ve,loadBoard:fi,onBoardProjectChange:su,handleDragStart:iu,handleDragEnd:au,handleDragOver:ou,handleDragLeave:ru,handleCardDragOver:lu,handleCardDragLeave:cu,handleDrop:du,handleCardDrop:uu,loadSprints:Xe,onSprintProjectChange:Pd,viewSprint:di,showEditBudgetModal:zd,handleUpdateBudget:Kd,showCloseSprintConfirmation:Wd,completeSprint:Vd,loadLimboStatus:ts,showLimboDetailsModal:ui,showCreateDocumentModal:Fs,showCreateProjectModal:Zs,onEpicsProjectChange:np,loadRitualsView:ar,onRitualsProjectChange:or,switchRitualsTab:$p,approveRitual:Ep,completeGateRitual:Ip,toggleSection:nr,toggleTicketRituals:sr,attestTicketRitual:Cp,approveTicketRitual:Lp,showCompleteTicketRitualModal:Ap,showAttestTicketRitualModal:xp,showCreateApiKeyModal:lo,copyApiKey:co,revokeApiKey:uo,showCreateAgentModal:Ha,applyIssueTemplate:mm,updateCreateIssueProject:vm}),window.marked=R,window.DOMPurify=ec,console.log("Chaotic frontend loaded via Vite")})();
