var ub=Object.defineProperty;var pb=(rt,ke,Mt)=>ke in rt?ub(rt,ke,{enumerable:!0,configurable:!0,writable:!0,value:Mt}):rt[ke]=Mt;var K=(rt,ke,Mt)=>pb(rt,typeof ke!="symbol"?ke+"":ke,Mt);(function(){"use strict";var Wo;function rt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ke=rt();function Mt(e){ke=e}var Nn={exec:()=>null};function G(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace($e.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var $e={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Bd=/^(?:[ \t]*(?:\n|$))+/,Dd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Md=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,qn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,jd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Zs=/(?:[*+-]|\d{1,9}[.)])/,lr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,cr=G(lr).replace(/bull/g,Zs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Rd=G(lr).replace(/bull/g,Zs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Xs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Pd=/^[^\n]+/,Qs=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Nd=G(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),qd=G(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Zs).getRegex(),Ti="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Js=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Od=G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Js).replace("tag",Ti).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),dr=G(Xs).replace("hr",qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ti).getRegex(),Hd=G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",dr).getRegex(),ea={blockquote:Hd,code:Dd,def:Nd,fences:Md,heading:jd,hr:qn,html:Od,lheading:cr,list:qd,newline:Bd,paragraph:dr,table:Nn,text:Pd},ur=G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ti).getRegex(),Fd={...ea,lheading:Rd,table:ur,paragraph:G(Xs).replace("hr",qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ur).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ti).getRegex()},Ud={...ea,html:G(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Js).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Nn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:G(Xs).replace("hr",qn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",cr).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Gd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,zd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pr=/^( {2,}|\\)\n(?!\s*$)/,Vd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Si=/[\p{P}\p{S}]/u,ta=/[\s\p{P}\p{S}]/u,mr=/[^\s\p{P}\p{S}]/u,Wd=G(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ta).getRegex(),fr=/(?!~)[\p{P}\p{S}]/u,Kd=/(?!~)[\s\p{P}\p{S}]/u,Yd=/(?:[^\s\p{P}\p{S}]|~)/u,Zd=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,gr=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Xd=G(gr,"u").replace(/punct/g,Si).getRegex(),Qd=G(gr,"u").replace(/punct/g,fr).getRegex(),hr="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Jd=G(hr,"gu").replace(/notPunctSpace/g,mr).replace(/punctSpace/g,ta).replace(/punct/g,Si).getRegex(),eu=G(hr,"gu").replace(/notPunctSpace/g,Yd).replace(/punctSpace/g,Kd).replace(/punct/g,fr).getRegex(),tu=G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mr).replace(/punctSpace/g,ta).replace(/punct/g,Si).getRegex(),nu=G(/\\(punct)/,"gu").replace(/punct/g,Si).getRegex(),iu=G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),su=G(Js).replace("(?:-->|$)","-->").getRegex(),au=G("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",su).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Li=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,ou=G(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Li).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),vr=G(/^!?\[(label)\]\[(ref)\]/).replace("label",Li).replace("ref",Qs).getRegex(),br=G(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qs).getRegex(),ru=G("reflink|nolink(?!\\()","g").replace("reflink",vr).replace("nolink",br).getRegex(),na={_backpedal:Nn,anyPunctuation:nu,autolink:iu,blockSkip:Zd,br:pr,code:zd,del:Nn,emStrongLDelim:Xd,emStrongRDelimAst:Jd,emStrongRDelimUnd:tu,escape:Gd,link:ou,nolink:br,punctuation:Wd,reflink:vr,reflinkSearch:ru,tag:au,text:Vd,url:Nn},lu={...na,link:G(/^!?\[(label)\]\((.*?)\)/).replace("label",Li).getRegex(),reflink:G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Li).getRegex()},ia={...na,emStrongRDelimAst:eu,emStrongLDelim:Qd,url:G(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},cu={...ia,br:G(pr).replace("{2,}","*").getRegex(),text:G(ia.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ci={normal:ea,gfm:Fd,pedantic:Ud},On={normal:na,gfm:ia,breaks:cu,pedantic:lu},du={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},yr=e=>du[e];function Ze(e,t){if(t){if($e.escapeTest.test(e))return e.replace($e.escapeReplace,yr)}else if($e.escapeTestNoEncode.test(e))return e.replace($e.escapeReplaceNoEncode,yr);return e}function wr(e){try{e=encodeURI(e).replace($e.percentDecode,"%")}catch{return null}return e}function kr(e,t){var a;const n=e.replace($e.findPipe,(o,r,c)=>{let l=!1,d=r;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),i=n.split($e.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace($e.slashPipe,"|");return i}function Hn(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function uu(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function $r(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,c}function pu(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var Ai=class{constructor(e){K(this,"options");K(this,"rules");K(this,"lexer");this.options=e||ke}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Hn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=pu(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Hn(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Hn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Hn(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const l=r.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${l}`:l,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const v=m,b=v.raw+`
`+n.join(`
`),w=this.blockquote(b);a[a.length-1]=w,i=i.substring(0,i.length-v.raw.length)+w.raw,s=s.substring(0,s.length-v.text.length)+w.text;break}else if((m==null?void 0:m.type)==="list"){const v=m,b=v.raw+`
`+n.join(`
`),w=this.list(b);a[a.length-1]=w,i=i.substring(0,i.length-m.raw.length)+w.raw,s=s.substring(0,s.length-v.raw.length)+w.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,_=>" ".repeat(3*_.length)),m=e.split(`
`,1)[0],v=!u.trim(),b=0;if(this.options.pedantic?(b=2,d=u.trimStart()):v?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=u.slice(b),b+=t[1].length),v&&this.rules.other.blankLine.test(m)&&(l+=m+`
`,e=e.substring(m.length+1),c=!0),!c){const _=this.rules.other.nextBulletRegex(b),D=this.rules.other.hrRegex(b),B=this.rules.other.fencesBeginRegex(b),E=this.rules.other.headingBeginRegex(b),M=this.rules.other.htmlBeginRegex(b);for(;e;){const T=e.split(`
`,1)[0];let U;if(m=T,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),U=m):U=m.replace(this.rules.other.tabCharGlobal,"    "),B.test(m)||E.test(m)||M.test(m)||_.test(m)||D.test(m))break;if(U.search(this.rules.other.nonSpaceChar)>=b||!m.trim())d+=`
`+U.slice(b);else{if(v||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(u)||E.test(u)||D.test(u))break;d+=`
`+m}!v&&!m.trim()&&(v=!0),l+=T+`
`,e=e.substring(T.length+1),u=U.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let w=null,I;this.options.gfm&&(w=this.rules.other.listIsTask.exec(d),w&&(I=w[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:l,task:!!w,checked:I,loose:!1,text:d,tokens:[]}),s.raw+=l}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c=0;c<s.items.length;c++)if(this.lexer.state.top=!1,s.items[c].tokens=this.lexer.blockTokens(s.items[c].text,[]),!s.loose){const l=s.items[c].tokens.filter(u=>u.type==="space"),d=l.length>0&&l.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let c=0;c<s.items.length;c++)s.items[c].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=kr(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(kr(r,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Hn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=uu(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),$r(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return $r(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,c=a,l=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){c+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);const u=[...i[0]][0].length,m=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}const v=m.slice(2,-2);return{type:"strong",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},lt=class or{constructor(t){K(this,"tokens");K(this,"options");K(this,"state");K(this,"tokenizer");K(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ke,this.options.tokenizer=this.options.tokenizer||new Ai,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:$e,block:Ci.normal,inline:On.normal};this.options.pedantic?(n.block=Ci.pedantic,n.inline=On.pedantic):this.options.gfm&&(n.block=Ci.gfm,this.options.breaks?n.inline=On.breaks:n.inline=On.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ci,inline:On}}static lex(t,n){return new or(n).lex(t)}static lexInline(t,n){return new or(n).inlineTokens(t)}lex(t){t=t.replace($e.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace($e.tabCharGlobal,"    ").replace($e.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(m=>{u=m.call({lexer:this},d),typeof u=="number"&&u>=0&&(l=Math.min(l,u))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const l=n.at(-1);i&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),i=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,l;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(m=>(d=m.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const m=n.at(-1);d.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((l=this.options.extensions)!=null&&l.startInline){let m=1/0;const v=t.slice(1);let b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},v),typeof b=="number"&&b>=0&&(m=Math.min(m,b))}),m<1/0&&m>=0&&(u=t.substring(0,m+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},Bi=class{constructor(e){K(this,"options");K(this,"parser");this.options=e||ke}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match($e.notSpaceStart))==null?void 0:a[0],s=e.replace($e.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Ze(i)+'">'+(n?s:Ze(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Ze(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+Ze(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ze(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=wr(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ze(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=wr(e);if(s===null)return Ze(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ze(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ze(e.text)}},sa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},ct=class rr{constructor(t){K(this,"options");K(this,"renderer");K(this,"textRenderer");this.options=t||ke,this.options.renderer=this.options.renderer||new Bi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new sa}static parse(t,n){return new rr(n).parse(t)}static parseInline(t,n){return new rr(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){i+=d||"";continue}}const c=r;switch(c.type){case"space":{i+=this.renderer.space(c);continue}case"hr":{i+=this.renderer.hr(c);continue}case"heading":{i+=this.renderer.heading(c);continue}case"code":{i+=this.renderer.code(c);continue}case"table":{i+=this.renderer.table(c);continue}case"blockquote":{i+=this.renderer.blockquote(c);continue}case"list":{i+=this.renderer.list(c);continue}case"html":{i+=this.renderer.html(c);continue}case"paragraph":{i+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],d+=`
`+this.renderer.text(l);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=l||"";continue}}const c=r;switch(c.type){case"escape":{i+=n.text(c);break}case"html":{i+=n.html(c);break}case"link":{i+=n.link(c);break}case"image":{i+=n.image(c);break}case"strong":{i+=n.strong(c);break}case"em":{i+=n.em(c);break}case"codespan":{i+=n.codespan(c);break}case"br":{i+=n.br(c);break}case"del":{i+=n.del(c);break}case"text":{i+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return i}},Di=(Wo=class{constructor(e){K(this,"options");K(this,"block");this.options=e||ke}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?lt.lex:lt.lexInline}provideParser(){return this.block?ct.parse:ct.parseInline}},K(Wo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Wo),mu=class{constructor(...e){K(this,"defaults",rt());K(this,"options",this.setOptions);K(this,"parse",this.parseMarkdown(!0));K(this,"parseInline",this.parseMarkdown(!1));K(this,"Parser",ct);K(this,"Renderer",Bi);K(this,"TextRenderer",sa);K(this,"Lexer",lt);K(this,"Tokenizer",Ai);K(this,"Hooks",Di);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Bi(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=s[o];s[o]=(...l)=>{let d=r.apply(s,l);return d===!1&&(d=c.apply(s,l)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Ai(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=s[o];s[o]=(...l)=>{let d=r.apply(s,l);return d===!1&&(d=c.apply(s,l)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Di;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=s[o];Di.passThroughHooks.has(a)?s[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(s,l)).then(u=>c.call(s,u));const d=r.call(s,l);return c.call(s,d)}:s[o]=(...l)=>{let d=r.apply(s,l);return d===!1&&(d=c.apply(s,l)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return lt.lex(e,t??this.defaults)}parser(e,t){return ct.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?lt.lex:lt.lexInline,c=a.hooks?a.hooks.provideParser():e?ct.parse:ct.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Ze(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},jt=new mu;function F(e,t){return jt.parse(e,t)}F.options=F.setOptions=function(e){return jt.setOptions(e),F.defaults=jt.defaults,Mt(F.defaults),F},F.getDefaults=rt,F.defaults=ke,F.use=function(...e){return jt.use(...e),F.defaults=jt.defaults,Mt(F.defaults),F},F.walkTokens=function(e,t){return jt.walkTokens(e,t)},F.parseInline=jt.parseInline,F.Parser=ct,F.parser=ct.parse,F.Renderer=Bi,F.TextRenderer=sa,F.Lexer=lt,F.lexer=lt.lex,F.Tokenizer=Ai,F.Hooks=Di,F.parse=F,F.options,F.setOptions,F.use,F.walkTokens,F.parseInline,ct.parse,lt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Er,setPrototypeOf:xr,isFrozen:fu,getPrototypeOf:gu,getOwnPropertyDescriptor:hu}=Object;let{freeze:Ee,seal:Ne,create:aa}=Object,{apply:oa,construct:ra}=typeof Reflect<"u"&&Reflect;Ee||(Ee=function(t){return t}),Ne||(Ne=function(t){return t}),oa||(oa=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),ra||(ra=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Mi=Ie(Array.prototype.forEach),vu=Ie(Array.prototype.lastIndexOf),Ir=Ie(Array.prototype.pop),Fn=Ie(Array.prototype.push),bu=Ie(Array.prototype.splice),ji=Ie(String.prototype.toLowerCase),la=Ie(String.prototype.toString),ca=Ie(String.prototype.match),Un=Ie(String.prototype.replace),yu=Ie(String.prototype.indexOf),wu=Ie(String.prototype.trim),Ge=Ie(Object.prototype.hasOwnProperty),xe=Ie(RegExp.prototype.test),Gn=ku(TypeError);function Ie(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return oa(e,t,i)}}function ku(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return ra(e,n)}}function P(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ji;xr&&xr(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(fu(t)||(t[i]=a),s=a)}e[s]=!0}return e}function $u(e){for(let t=0;t<e.length;t++)Ge(e,t)||(e[t]=null);return e}function Xe(e){const t=aa(null);for(const[n,i]of Er(e))Ge(e,n)&&(Array.isArray(i)?t[n]=$u(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Xe(i):t[n]=i);return t}function zn(e,t){for(;e!==null;){const i=hu(e,t);if(i){if(i.get)return Ie(i.get);if(typeof i.value=="function")return Ie(i.value)}e=gu(e)}function n(){return null}return n}const _r=Ee(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),da=Ee(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ua=Ee(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Eu=Ee(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),pa=Ee(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),xu=Ee(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Tr=Ee(["#text"]),Sr=Ee(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ma=Ee(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Lr=Ee(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ri=Ee(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Iu=Ne(/\{\{[\w\W]*|[\w\W]*\}\}/gm),_u=Ne(/<%[\w\W]*|[\w\W]*%>/gm),Tu=Ne(/\$\{[\w\W]*/gm),Su=Ne(/^data-[\-\w.\u00B7-\uFFFF]+$/),Lu=Ne(/^aria-[\-\w]+$/),Cr=Ne(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Cu=Ne(/^(?:\w+script|data):/i),Au=Ne(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ar=Ne(/^html$/i),Bu=Ne(/^[a-z][.\w]*(-[.\w]+)+$/i);var Br=Object.freeze({__proto__:null,ARIA_ATTR:Lu,ATTR_WHITESPACE:Au,CUSTOM_ELEMENT:Bu,DATA_ATTR:Su,DOCTYPE_NAME:Ar,ERB_EXPR:_u,IS_ALLOWED_URI:Cr,IS_SCRIPT_OR_DATA:Cu,MUSTACHE_EXPR:Iu,TMPLIT_EXPR:Tu});const Vn={element:1,text:3,progressingInstruction:7,comment:8,document:9},Du=function(){return typeof window>"u"?null:window},Mu=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Dr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Mr(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Du();const t=A=>Mr(A);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Vn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:m,trustedTypes:v}=e,b=c.prototype,w=zn(b,"cloneNode"),I=zn(b,"remove"),_=zn(b,"nextSibling"),D=zn(b,"childNodes"),B=zn(b,"parentNode");if(typeof o=="function"){const A=n.createElement("template");A.content&&A.content.ownerDocument&&(n=A.content.ownerDocument)}let E,M="";const{implementation:T,createNodeIterator:U,createDocumentFragment:X,getElementsByTagName:ye}=n,{importNode:Ue}=i;let V=Dr();t.isSupported=typeof Er=="function"&&typeof B=="function"&&T&&T.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ie,ERB_EXPR:Q,TMPLIT_EXPR:me,DATA_ATTR:bt,ARIA_ATTR:y,IS_SCRIPT_OR_DATA:ce,ATTR_WHITESPACE:Be,CUSTOM_ELEMENT:Fs}=Br;let{IS_ALLOWED_URI:yt}=Br,de=null;const dd=P({},[..._r,...da,...ua,...pa,...Tr]);let fe=null;const ud=P({},[...Sr,...ma,...Lr,...Ri]);let ae=Object.seal(aa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),xi=null,Ko=null;const An=Object.seal(aa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let pd=!0,Yo=!0,md=!1,fd=!0,Bn=!1,Us=!0,Wt=!1,Zo=!1,Xo=!1,Dn=!1,Gs=!1,zs=!1,gd=!0,hd=!1;const ib="user-content-";let Qo=!0,Ii=!1,Mn={},at=null;const Jo=P({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let vd=null;const bd=P({},["audio","video","img","source","image","track"]);let er=null;const yd=P({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Vs="http://www.w3.org/1998/Math/MathML",Ws="http://www.w3.org/2000/svg",wt="http://www.w3.org/1999/xhtml";let jn=wt,tr=!1,nr=null;const sb=P({},[Vs,Ws,wt],la);let Ks=P({},["mi","mo","mn","ms","mtext"]),Ys=P({},["annotation-xml"]);const ab=P({},["title","style","font","a","script"]);let _i=null;const ob=["application/xhtml+xml","text/html"],rb="text/html";let le=null,Rn=null;const lb=n.createElement("form"),wd=function(g){return g instanceof RegExp||g instanceof Function},ir=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Rn&&Rn===g)){if((!g||typeof g!="object")&&(g={}),g=Xe(g),_i=ob.indexOf(g.PARSER_MEDIA_TYPE)===-1?rb:g.PARSER_MEDIA_TYPE,le=_i==="application/xhtml+xml"?la:ji,de=Ge(g,"ALLOWED_TAGS")?P({},g.ALLOWED_TAGS,le):dd,fe=Ge(g,"ALLOWED_ATTR")?P({},g.ALLOWED_ATTR,le):ud,nr=Ge(g,"ALLOWED_NAMESPACES")?P({},g.ALLOWED_NAMESPACES,la):sb,er=Ge(g,"ADD_URI_SAFE_ATTR")?P(Xe(yd),g.ADD_URI_SAFE_ATTR,le):yd,vd=Ge(g,"ADD_DATA_URI_TAGS")?P(Xe(bd),g.ADD_DATA_URI_TAGS,le):bd,at=Ge(g,"FORBID_CONTENTS")?P({},g.FORBID_CONTENTS,le):Jo,xi=Ge(g,"FORBID_TAGS")?P({},g.FORBID_TAGS,le):Xe({}),Ko=Ge(g,"FORBID_ATTR")?P({},g.FORBID_ATTR,le):Xe({}),Mn=Ge(g,"USE_PROFILES")?g.USE_PROFILES:!1,pd=g.ALLOW_ARIA_ATTR!==!1,Yo=g.ALLOW_DATA_ATTR!==!1,md=g.ALLOW_UNKNOWN_PROTOCOLS||!1,fd=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Bn=g.SAFE_FOR_TEMPLATES||!1,Us=g.SAFE_FOR_XML!==!1,Wt=g.WHOLE_DOCUMENT||!1,Dn=g.RETURN_DOM||!1,Gs=g.RETURN_DOM_FRAGMENT||!1,zs=g.RETURN_TRUSTED_TYPE||!1,Xo=g.FORCE_BODY||!1,gd=g.SANITIZE_DOM!==!1,hd=g.SANITIZE_NAMED_PROPS||!1,Qo=g.KEEP_CONTENT!==!1,Ii=g.IN_PLACE||!1,yt=g.ALLOWED_URI_REGEXP||Cr,jn=g.NAMESPACE||wt,Ks=g.MATHML_TEXT_INTEGRATION_POINTS||Ks,Ys=g.HTML_INTEGRATION_POINTS||Ys,ae=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&wd(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&wd(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Bn&&(Yo=!1),Gs&&(Dn=!0),Mn&&(de=P({},Tr),fe=[],Mn.html===!0&&(P(de,_r),P(fe,Sr)),Mn.svg===!0&&(P(de,da),P(fe,ma),P(fe,Ri)),Mn.svgFilters===!0&&(P(de,ua),P(fe,ma),P(fe,Ri)),Mn.mathMl===!0&&(P(de,pa),P(fe,Lr),P(fe,Ri))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?An.tagCheck=g.ADD_TAGS:(de===dd&&(de=Xe(de)),P(de,g.ADD_TAGS,le))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?An.attributeCheck=g.ADD_ATTR:(fe===ud&&(fe=Xe(fe)),P(fe,g.ADD_ATTR,le))),g.ADD_URI_SAFE_ATTR&&P(er,g.ADD_URI_SAFE_ATTR,le),g.FORBID_CONTENTS&&(at===Jo&&(at=Xe(at)),P(at,g.FORBID_CONTENTS,le)),g.ADD_FORBID_CONTENTS&&(at===Jo&&(at=Xe(at)),P(at,g.ADD_FORBID_CONTENTS,le)),Qo&&(de["#text"]=!0),Wt&&P(de,["html","head","body"]),de.table&&(P(de,["tbody"]),delete xi.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw Gn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Gn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=g.TRUSTED_TYPES_POLICY,M=E.createHTML("")}else E===void 0&&(E=Mu(v,s)),E!==null&&typeof M=="string"&&(M=E.createHTML(""));Ee&&Ee(g),Rn=g}},kd=P({},[...da,...ua,...Eu]),$d=P({},[...pa,...xu]),cb=function(g){let $=B(g);(!$||!$.tagName)&&($={namespaceURI:jn,tagName:"template"});const L=ji(g.tagName),ee=ji($.tagName);return nr[g.namespaceURI]?g.namespaceURI===Ws?$.namespaceURI===wt?L==="svg":$.namespaceURI===Vs?L==="svg"&&(ee==="annotation-xml"||Ks[ee]):!!kd[L]:g.namespaceURI===Vs?$.namespaceURI===wt?L==="math":$.namespaceURI===Ws?L==="math"&&Ys[ee]:!!$d[L]:g.namespaceURI===wt?$.namespaceURI===Ws&&!Ys[ee]||$.namespaceURI===Vs&&!Ks[ee]?!1:!$d[L]&&(ab[L]||!kd[L]):!!(_i==="application/xhtml+xml"&&nr[g.namespaceURI]):!1},ot=function(g){Fn(t.removed,{element:g});try{B(g).removeChild(g)}catch{I(g)}},Kt=function(g,$){try{Fn(t.removed,{attribute:$.getAttributeNode(g),from:$})}catch{Fn(t.removed,{attribute:null,from:$})}if($.removeAttribute(g),g==="is")if(Dn||Gs)try{ot($)}catch{}else try{$.setAttribute(g,"")}catch{}},Ed=function(g){let $=null,L=null;if(Xo)g="<remove></remove>"+g;else{const oe=ca(g,/^[\r\n\t ]+/);L=oe&&oe[0]}_i==="application/xhtml+xml"&&jn===wt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const ee=E?E.createHTML(g):g;if(jn===wt)try{$=new m().parseFromString(ee,_i)}catch{}if(!$||!$.documentElement){$=T.createDocument(jn,"template",null);try{$.documentElement.innerHTML=tr?M:ee}catch{}}const we=$.body||$.documentElement;return g&&L&&we.insertBefore(n.createTextNode(L),we.childNodes[0]||null),jn===wt?ye.call($,Wt?"html":"body")[0]:Wt?$.documentElement:we},xd=function(g){return U.call(g.ownerDocument||g,g,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},sr=function(g){return g instanceof u&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof d)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Id=function(g){return typeof r=="function"&&g instanceof r};function kt(A,g,$){Mi(A,L=>{L.call(t,g,$,Rn)})}const _d=function(g){let $=null;if(kt(V.beforeSanitizeElements,g,null),sr(g))return ot(g),!0;const L=le(g.nodeName);if(kt(V.uponSanitizeElement,g,{tagName:L,allowedTags:de}),Us&&g.hasChildNodes()&&!Id(g.firstElementChild)&&xe(/<[/\w!]/g,g.innerHTML)&&xe(/<[/\w!]/g,g.textContent)||g.nodeType===Vn.progressingInstruction||Us&&g.nodeType===Vn.comment&&xe(/<[/\w]/g,g.data))return ot(g),!0;if(!(An.tagCheck instanceof Function&&An.tagCheck(L))&&(!de[L]||xi[L])){if(!xi[L]&&Sd(L)&&(ae.tagNameCheck instanceof RegExp&&xe(ae.tagNameCheck,L)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(L)))return!1;if(Qo&&!at[L]){const ee=B(g)||g.parentNode,we=D(g)||g.childNodes;if(we&&ee){const oe=we.length;for(let Me=oe-1;Me>=0;--Me){const $t=w(we[Me],!0);$t.__removalCount=(g.__removalCount||0)+1,ee.insertBefore($t,_(g))}}}return ot(g),!0}return g instanceof c&&!cb(g)||(L==="noscript"||L==="noembed"||L==="noframes")&&xe(/<\/no(script|embed|frames)/i,g.innerHTML)?(ot(g),!0):(Bn&&g.nodeType===Vn.text&&($=g.textContent,Mi([ie,Q,me],ee=>{$=Un($,ee," ")}),g.textContent!==$&&(Fn(t.removed,{element:g.cloneNode()}),g.textContent=$)),kt(V.afterSanitizeElements,g,null),!1)},Td=function(g,$,L){if(gd&&($==="id"||$==="name")&&(L in n||L in lb))return!1;if(!(Yo&&!Ko[$]&&xe(bt,$))){if(!(pd&&xe(y,$))){if(!(An.attributeCheck instanceof Function&&An.attributeCheck($,g))){if(!fe[$]||Ko[$]){if(!(Sd(g)&&(ae.tagNameCheck instanceof RegExp&&xe(ae.tagNameCheck,g)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(g))&&(ae.attributeNameCheck instanceof RegExp&&xe(ae.attributeNameCheck,$)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck($,g))||$==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&xe(ae.tagNameCheck,L)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(L))))return!1}else if(!er[$]){if(!xe(yt,Un(L,Be,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&g!=="script"&&yu(L,"data:")===0&&vd[g])){if(!(md&&!xe(ce,Un(L,Be,"")))){if(L)return!1}}}}}}}return!0},Sd=function(g){return g!=="annotation-xml"&&ca(g,Fs)},Ld=function(g){kt(V.beforeSanitizeAttributes,g,null);const{attributes:$}=g;if(!$||sr(g))return;const L={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0};let ee=$.length;for(;ee--;){const we=$[ee],{name:oe,namespaceURI:Me,value:$t}=we,Pn=le(oe),ar=$t;let ge=oe==="value"?ar:wu(ar);if(L.attrName=Pn,L.attrValue=ge,L.keepAttr=!0,L.forceKeepAttr=void 0,kt(V.uponSanitizeAttribute,g,L),ge=L.attrValue,hd&&(Pn==="id"||Pn==="name")&&(Kt(oe,g),ge=ib+ge),Us&&xe(/((--!?|])>)|<\/(style|title|textarea)/i,ge)){Kt(oe,g);continue}if(Pn==="attributename"&&ca(ge,"href")){Kt(oe,g);continue}if(L.forceKeepAttr)continue;if(!L.keepAttr){Kt(oe,g);continue}if(!fd&&xe(/\/>/i,ge)){Kt(oe,g);continue}Bn&&Mi([ie,Q,me],Ad=>{ge=Un(ge,Ad," ")});const Cd=le(g.nodeName);if(!Td(Cd,Pn,ge)){Kt(oe,g);continue}if(E&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!Me)switch(v.getAttributeType(Cd,Pn)){case"TrustedHTML":{ge=E.createHTML(ge);break}case"TrustedScriptURL":{ge=E.createScriptURL(ge);break}}if(ge!==ar)try{Me?g.setAttributeNS(Me,oe,ge):g.setAttribute(oe,ge),sr(g)?ot(g):Ir(t.removed)}catch{Kt(oe,g)}}kt(V.afterSanitizeAttributes,g,null)},db=function A(g){let $=null;const L=xd(g);for(kt(V.beforeSanitizeShadowDOM,g,null);$=L.nextNode();)kt(V.uponSanitizeShadowNode,$,null),_d($),Ld($),$.content instanceof a&&A($.content);kt(V.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(A){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,L=null,ee=null,we=null;if(tr=!A,tr&&(A="<!-->"),typeof A!="string"&&!Id(A))if(typeof A.toString=="function"){if(A=A.toString(),typeof A!="string")throw Gn("dirty is not a string, aborting")}else throw Gn("toString is not a function");if(!t.isSupported)return A;if(Zo||ir(g),t.removed=[],typeof A=="string"&&(Ii=!1),Ii){if(A.nodeName){const $t=le(A.nodeName);if(!de[$t]||xi[$t])throw Gn("root node is forbidden and cannot be sanitized in-place")}}else if(A instanceof r)$=Ed("<!---->"),L=$.ownerDocument.importNode(A,!0),L.nodeType===Vn.element&&L.nodeName==="BODY"||L.nodeName==="HTML"?$=L:$.appendChild(L);else{if(!Dn&&!Bn&&!Wt&&A.indexOf("<")===-1)return E&&zs?E.createHTML(A):A;if($=Ed(A),!$)return Dn?null:zs?M:""}$&&Xo&&ot($.firstChild);const oe=xd(Ii?A:$);for(;ee=oe.nextNode();)_d(ee),Ld(ee),ee.content instanceof a&&db(ee.content);if(Ii)return A;if(Dn){if(Gs)for(we=X.call($.ownerDocument);$.firstChild;)we.appendChild($.firstChild);else we=$;return(fe.shadowroot||fe.shadowrootmode)&&(we=Ue.call(i,we,!0)),we}let Me=Wt?$.outerHTML:$.innerHTML;return Wt&&de["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&xe(Ar,$.ownerDocument.doctype.name)&&(Me="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Me),Bn&&Mi([ie,Q,me],$t=>{Me=Un(Me,$t," ")}),E&&zs?E.createHTML(Me):Me},t.setConfig=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ir(A),Zo=!0},t.clearConfig=function(){Rn=null,Zo=!1},t.isValidAttribute=function(A,g,$){Rn||ir({});const L=le(A),ee=le(g);return Td(L,ee,$)},t.addHook=function(A,g){typeof g=="function"&&Fn(V[A],g)},t.removeHook=function(A,g){if(g!==void 0){const $=vu(V[A],g);return $===-1?void 0:bu(V[A],$,1)[0]}return Ir(V[A])},t.removeHooks=function(A){V[A]=[]},t.removeAllHooks=function(){V=Dr()},t}var jr=Mr();const fa="chaotic_";function De(e){try{return localStorage.getItem(fa+e)}catch{return null}}function qe(e,t){try{localStorage.setItem(fa+e,t)}catch{}}function Qe(e){try{localStorage.removeItem(fa+e)}catch{}}function ju(){return De("token")}function Ru(e){e?qe("token",e):Qe("token")}function Pu(){return De("theme")}function Nu(e){qe("theme",e)}function Rr(){return De("last_project")}function qu(e){qe("last_project",e)}function Ou(){return De("onboarding_complete")==="true"}function Hu(){qe("onboarding_complete","true")}function Fu(){Qe("onboarding_complete")}function Uu(e){return e?De(`issues_filters_${e}`):null}function Gu(e,t){e&&(t?qe(`issues_filters_${e}`,t):Qe(`issues_filters_${e}`))}function Pr(e){return De(`comment_draft_${e}`)}function Pi(e,t){t?qe(`comment_draft_${e}`,t):Qe(`comment_draft_${e}`)}function Nr(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Ni(e){const t=De(`description_draft_${e}`);if(!t)return null;const n=Nr(t);return n?n.draft:t}function qr(e){const t=De(`description_draft_${e}`);if(!t)return null;const n=Nr(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Rt(e,t,n=""){t?qe(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Qe(`description_draft_${e}`)}function Or(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Hr(e){var n;const t=De(`document_draft_${e}`);return t?((n=Or(t))==null?void 0:n.draft)??null:null}function zu(e){const t=De(`document_draft_${e}`);if(!t)return null;const n=Or(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function qi(e,t,n=null){t&&(t.title||t.content||t.icon)?qe(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Qe(`document_draft_${e}`)}function Vu(){return{title:De("create_issue_title"),description:De("create_issue_description")}}function Fr(e,t){e?qe("create_issue_title",e):Qe("create_issue_title"),t?qe("create_issue_description",t):Qe("create_issue_description")}function Wu(){Qe("create_issue_title"),Qe("create_issue_description")}function Ku(){return De("doc_view_mode")}function Yu(e){qe("doc_view_mode",e)}function Zu(){return De("approvals_explainer_dismissed")==="1"}function Xu(){qe("approvals_explainer_dismissed","1")}const Qu="/api";class Ju{constructor(){this.token=ju()}setToken(t){this.token=t,Ru(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Qu}${n}`,a)}catch(c){const l=new Error("Network error - check your connection");throw l.isNetworkError=!0,l.cause=c,l}if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const l=new Error(c);throw l.status=o.status,l.detail=r.detail,l}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,i=null){const s={};return i&&(s.note=i),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,s)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null){const s={};return i&&(s.note=i),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,s)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null){const s={};return i&&(s.note=i),this.request("POST",`/rituals/${t}/attest-issue/${n}`,s)}async completeTicketGateRitual(t,n,i=null){const s={};return i&&(s.note=i),this.request("POST",`/rituals/${t}/complete-issue/${n}`,s)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,i=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:i})}async createProjectAgent(t,n,i=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:i})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new Ju;let Yt=null;const ep='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Zt=null;function H(){Zt=document.activeElement,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function O(){var e;xt(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Zt&&document.contains(Zt)&&typeof Zt.focus=="function"&&Zt.focus(),Zt=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(ep);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function Et(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`;const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},c=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let l=c,d=Date.now(),u=setTimeout(o,c);a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),l-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(l,500))})}function tp(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function x(e,t){const n=tp(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function xt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Yt&&(document.removeEventListener("keydown",Yt),Yt=null)}function Wn(e){Yt&&document.removeEventListener("keydown",Yt),Yt=e,e&&document.addEventListener("keydown",e)}function Kn(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(xt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function _e(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function je(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function ga(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Y(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function np(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function Oe(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function dt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function ip(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Xt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?ip(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${f(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Ur(e){return e?'<span class="badge badge-agent" title="AI agent">agent</span>':""}let Z={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const ha=new Set;function se(e,t){if(typeof e=="string"){const n=Z[e];Z[e]=t,Gr(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=Z[i];Z[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Gr(i,s,a)})}}function Je(e){return ha.add(e),()=>ha.delete(e)}function Gr(e,t,n){t!==n&&ha.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const Pt=()=>Z.currentUser,Oi=e=>se("currentUser",e),S=()=>Z.currentView,sp=e=>se("currentView",e),Re=()=>Z.issues,et=e=>se("issues",e),Hi=()=>Z.detailNavContext,Qt=e=>se("detailNavContext",e),zr=()=>Z.labels,Fi=e=>se("labels",e),Vr=()=>Z.activeFilterCategory,ap=e=>se("activeFilterCategory",e),Wr=()=>Z.selectedIssueIndex,Yn=e=>se("selectedIssueIndex",e),op=()=>Z.selectedDocIndex,Kr=e=>se("selectedDocIndex",e),Yr=()=>Z.selectedBoardIndex,Ui=e=>se("selectedBoardIndex",e),rp=()=>Z.selectedInboxIndex,lp=e=>se("selectedInboxIndex",e),cp=()=>Z.selectedSprintIndex,Zr=e=>se("selectedSprintIndex",e),dp=()=>Z.selectedEpicIndex,Xr=e=>se("selectedEpicIndex",e),up=()=>Z.pendingGates,pp=e=>se("pendingGates",e),va=()=>Z.inboxEntries,ba=e=>se("inboxEntries",e),Qr=()=>Z.inboxUnreadCount,ya=e=>se("inboxUnreadCount",e),mp=()=>Z.searchDebounceTimer,fp=e=>se("searchDebounceTimer",e),gp=()=>Z.websocket,Jr=e=>se("websocket",e),C=()=>Z.currentTeam,wa=e=>se("currentTeam",e),z=()=>Z.currentProject,ze=e=>se("currentProject",e||null),re=()=>Z.currentDetailIssue,Gi=e=>se("currentDetailIssue",e),hp=()=>Z.currentDetailSprints,el=e=>se("currentDetailSprints",e),ka={};function te(e){Object.assign(ka,e)}function vp(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=ka[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let tl=!1;function bp(){if(!tl){tl=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,vp);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=ka[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const $a=["backlog","todo","in_progress","in_review","done","canceled"],Jt=["backlog","todo","in_progress","in_review"],nl=["urgent","high","medium","low","no_priority"],Ea=["no_priority","urgent","high","medium","low"],il=["backlog","todo","in_progress","in_review","done"];function N({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,c])=>` data-${p(r)}="${p(c)}"`).join(""):""}>${f(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${f(t)}</h3>
            <p>${f(n)}</p>
            ${a}
        </div>
    `}const R={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'};let Zn=[];function yp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function wp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function zi(e,t){const n=e().map(yp),i=t().map(wp);Zn=[...n,...i]}function en(e){return e&&Zn.find(t=>t.id===e)||null}function Nt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function xa(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${i}`}function Vi(){const e=Zn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));Zn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const i=[];e.forEach(a=>{i.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>i.push({assignee:r,indent:!0}))});const s=Zn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return s.sort((a,o)=>a.name.localeCompare(o.name)),s.forEach(a=>i.push({assignee:a,indent:!1})),i}function Wi(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;Vi().forEach(({assignee:i,indent:s})=>{n+=`<option value="${i.id}">${xa(i,s)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function tn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function nn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function sn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function an(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function sl(){const e=document.getElementById("group-by-select");return e?e.value:""}const al=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Ki=["done","canceled"];function ol(e){var t,n,i;switch(e){case"project":return z()?1:0;case"status":return tn().length;case"priority":return nn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return sn().length;case"exclude_labels":return an().length;default:return 0}}function Ia(){let e=0;return al.forEach(t=>{e+=ol(t.key)}),e}function rl(){var v,b,w,I,_,D;const e=new URLSearchParams,t=tn(),n=nn(),i=sn(),s=an(),a=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,o=z()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,c=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,l=(I=document.getElementById("group-by-select"))==null?void 0:I.value,d=(_=document.getElementById("sort-by-select"))==null?void 0:_.value;t.forEach(B=>e.append("status",B)),n.forEach(B=>e.append("priority",B)),i.forEach(B=>e.append("label",B)),s.forEach(B=>e.append("exclude_label",B)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),c&&e.set("issue_type",c),l&&e.set("groupBy",l),d&&d!=="created-desc"&&e.set("sort",d);const u=e.toString(),m=u?`/issues?${u}`:"/issues";history.replaceState({view:"issues"},"",m),Gu((D=C())==null?void 0:D.id,u)}function kp(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=Uu((b=C())==null?void 0:b.id);if(w){t=new URLSearchParams(w);const I=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",I)}}const s=t.getAll("status");if(s.length>0){const w=document.getElementById("status-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=s.includes(_.value)}),ll())}const a=t.getAll("priority");if(a.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=a.includes(_.value)}),cl())}const o=t.get("assignee");if(o){const w=document.getElementById("assignee-filter");w&&(w.value=o)}const r=t.get("project");r&&(e(!0),ze(r),e(!1));const c=t.get("sprint");if(c){const w=document.getElementById("sprint-filter");w&&(w.value=c)}const l=t.get("issue_type");if(l){const w=document.getElementById("issue-type-filter");w&&(w.value=l)}const d=t.getAll("label");if(d.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=d.includes(_.value)}),Yi())}const u=t.getAll("exclude_label");if(u.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=u.includes(_.value)}),Zi())}const m=t.get("groupBy");if(m){const w=document.getElementById("group-by-select");w&&(w.value=m)}const v=t.get("sort");if(v){const w=document.getElementById("sort-by-select");w&&(w.value=v)}}function ll(){const e=tn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=_e(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function cl(){const e=nn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=je(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Yi(){var i,s;const e=sn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Zi(){var i,s;const e=an(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function dl(){if(!C())return;let e;try{e=await h.getLabels(C().id)}catch(t){console.error("Failed to load labels for filter:",t);return}ul("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),ul("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function ul(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const c=document.createElement("label");c.className="multi-select-option",c.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${Y(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${f(r.name)}</span>
                </span>
            `,a.appendChild(c)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Xi(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",pl)},0))}function pl(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",pl))}function $p(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",on)):(e.classList.remove("hidden"),e.classList.remove("show-options"),he(),Te(Vr()),setTimeout(()=>{document.addEventListener("click",on)},0))}function Ep(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",on)):(e.classList.remove("hidden"),Dp(),setTimeout(()=>{document.addEventListener("click",on)},0))}function on(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",on))}function qt(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",on)}function he(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=z();e.innerHTML=al.map(n=>{const i=ol(n.key),s=Vr()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Te(e){ap(e),he();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":Ip(t);break;case"status":_p(t);break;case"priority":Tp(t);break;case"type":Sp(t);break;case"assignee":Lp(t);break;case"sprint":Cp(t);break;case"labels":Ap(t);break;case"exclude_labels":Bp(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function xp(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),he()}function Ip(e){const t=z()||"",n=ne()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${t?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${t?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;n.forEach(s=>{i+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${p(s.id)}">
                <input type="radio" name="project-filter-radio" value="${p(s.id)}" ${t===s.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Y(s.color)};"></span>
                <span class="filter-option-label">${f(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function _p(e){const t=tn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=Jt.every(o=>t.includes(o))&&!Ki.some(o=>t.includes(o))&&t.length===Jt.length,s=Ki.every(o=>t.includes(o))&&!Jt.some(o=>t.includes(o))&&t.length===Ki.length;let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-status-filter-new">Clear</button>':""}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${i?"active":""}" data-action="set-status-preset" data-value="open">Open</button>
            <button class="filter-preset-btn ${s?"active":""}" data-action="set-status-preset" data-value="closed">Closed</button>
        </div>
    `;n.forEach(o=>{a+=`
            <label class="filter-option">
                <input type="checkbox" value="${o.value}" ${t.includes(o.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${p(o.value)}">
                <span class="filter-option-icon">${o.icon}</span>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=a}function Tp(e){const t=nn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-priority-filter-new">Clear</button>':""}
        </div>
    `;n.forEach(s=>{i+=`
            <label class="filter-option">
                <input type="checkbox" value="${s.value}" ${t.includes(s.value)?"checked":""} data-action="toggle-priority-option" data-filter-value="${p(s.value)}">
                <span class="filter-option-icon">${s.icon}</span>
                <span class="filter-option-label">${s.label}</span>
            </label>
        `}),e.innerHTML=i}function Sp(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Lp(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=Gt()||[];let s=`
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
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${p(a.user_id)}">
                <input type="radio" name="assignee-filter-radio" value="${p(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${f(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=s}function Cp(e){if(!z()){e.innerHTML=`
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
            <label class="filter-option" data-action="set-sprint-filter" data-value="${p(o.value)}">
                <input type="radio" name="sprint-filter-radio" value="${p(o.value)}" ${i===o.value?"checked":""}>
                <span class="filter-option-label">${f(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function Ap(e){const t=sn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Y(d)};"></span>
                    <span class="filter-option-label">${f(l)}</span>
                </label>
            `}),e.innerHTML=s}function Bp(e){const t=an(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Y(d)};"></span>
                    <span class="filter-option-label">${f(l)}</span>
                </label>
            `}),e.innerHTML=s}function Dp(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(c=>`
                <div class="display-option ${i===c.value?"active":""}" data-action="set-sort" data-value="${p(c.value)}">
                    <span>${c.label}</span>
                    ${i===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(c=>`
                <div class="display-option ${s===c.value?"active":""}" data-action="set-group-by" data-value="${p(c.value)}">
                    <span>${c.label}</span>
                    ${s===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Se(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=z();if(n){const m=(ne()||[]).find(v=>v.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const i=tn();if(i.length>0){const u=i.map(m=>_e(m)).join(", ");t.push({category:"status",label:"Status",value:u,clearAction:"clear-status-filter-new"})}const s=nn();if(s.length>0){const u=s.map(m=>je(m)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const v=(Gt()||[]).find(b=>b.user_id===o.value);u=(v==null?void 0:v.name)||(v==null?void 0:v.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const c=sn();if(c.length>0){const u=document.getElementById("label-filter-dropdown"),m=c.map(v=>{var I;const b=u==null?void 0:u.querySelector(`input[value="${v}"]`),w=(I=b==null?void 0:b.closest("label"))==null?void 0:I.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const l=an();if(l.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),m=l.map(v=>{var I;const b=u==null?void 0:u.querySelector(`input[value="${v}"]`),w=(I=b==null?void 0:b.closest("label"))==null?void 0:I.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${f(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function Le(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Ia();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function ml(){const e=document.getElementById("sprint-filter");if(!e)return;const t=z(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",_a(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${f(a.name)})</option>`),dc(t,a==null?void 0:a.id),_a(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${f(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function _a(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function fl(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let gl=!1;Je(e=>{if(e!=="currentProject"||S()!=="issues"||gl)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([ml(),dl()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Yi(),Zi(),Pe(),Se(),Le()}).catch(n=>{console.error("Failed to update filters on project switch:",n),Pe(),Se(),Le()})});function Mp(){kp(e=>{gl=e})}function Qi(){ll(),Pe(),Se(),Le()}function Ta(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Qi()}function Sa(){cl(),Pe(),Se(),Le()}function La(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Sa()}function Ca(){Yi(),Pe(),Se(),Le()}function Ji(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ca()}function Aa(){Zi(),Pe(),Se(),Le()}function es(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Aa()}function jp(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function hl(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${jp(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let ts=0;async function ut(){var m,v,b,w,I,_,D;Yn(-1);const e=++ts;if(!C())return;const t=z()||"",n=tn(),i=nn(),s=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(b=(v=document.getElementById("issue-search"))==null?void 0:v.value)==null?void 0:b.trim();if(!t&&ne().length===0){document.getElementById("issues-list").innerHTML=N({icon:R.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}fl();const o={limit:1e3},r=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[c,l]=r.includes("-")?r.split("-"):[r,null];o.sort_by=c,l&&(o.order=l),n.length>0&&(o.status=n),i.length>0&&(o.priority=i),s&&(s==="me"?o.assignee_id=(I=Pt())==null?void 0:I.id:o.assignee_id=s);const d=(_=document.getElementById("sprint-filter"))==null?void 0:_.value;if(d)if(d==="current"){if(t){const B=zf(t);if(B!==void 0)B&&(o.sprint_id=B);else try{const M=(await h.getSprints(t)).find(T=>T.status==="active");dc(t,M==null?void 0:M.id),M&&(o.sprint_id=M.id)}catch(E){console.error("Failed to resolve current sprint:",E)}}}else o.sprint_id=d;const u=(D=document.getElementById("issue-type-filter"))==null?void 0:D.value;u&&(o.issue_type=u),a&&a.length>=1&&(o.search=a);try{const B=hl(sn(),"label-filter-dropdown");B.length>0&&(o.label=B,o.label_match="any");const E=hl(an(),"exclude-label-filter-dropdown");E.length>0&&(o.exclude_label=E);let M;if(t?(o.project_id=t,M=await h.getIssues(o)):ne().length>0&&(M=await h.getTeamIssues(C().id,o)),e!==ts)return;et(M),S()==="issues"&&Qt(M);const T=[...new Set(M.map(U=>U.project_id))];if(await cc(T),e!==ts)return;pt()}catch(B){if(e!==ts)return;const E=document.getElementById("issues-list");E&&(E.innerHTML=N({icon:R.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),x("load issues",B)}}function Rp(){clearTimeout(mp()),fp(setTimeout(()=>{ut()},300))}function Pe(){rl(),ut()}async function vl(){if(rl(),sl()==="sprint"){const e=Re(),t=[...new Set(e.map(n=>n.project_id))];await cc(t)}pt()}function Pp(){Se(),Le()}function bl(e){ze(e),he(),Te("project"),qt()}function Np(){bl("")}function qp(e){const t=e==="open"?Jt:Ki,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Qi(),he(),Te("status")}function Op(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Qi()),he(),Te("status")}function Hp(){Ta(),he(),Te("status"),Se(),Le()}function Fp(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Sa()),he(),Te("priority")}function Up(){La(),he(),Te("priority"),Se(),Le()}function yl(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Pe()),he(),Te("type"),Se(),Le(),qt()}function Gp(){yl("")}function wl(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Pe()),he(),Te("assignee"),Se(),Le(),qt()}function zp(){wl("")}function kl(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Pe()),he(),Te("sprint"),Se(),Le(),qt()}function Vp(){kl("")}function Wp(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ca()),he(),Te("labels")}function Kp(){Ji(),he(),Te("labels"),Se(),Le()}function Yp(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Aa()),he(),Te("exclude_labels")}function Zp(){es(),he(),Te("exclude_labels"),Se(),Le()}function Xp(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,ut()),qt()}function Qp(e){const t=document.getElementById("group-by-select");t&&(t.value=e,vl()),qt()}function Jp(){ze(null),Ta(),La();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Ji(),es(),Pe(),Se(),Le()}te({"update-label-filter":()=>Ca(),"clear-label-filter":()=>Ji(),"update-exclude-label-filter":()=>Aa(),"clear-exclude-label-filter":()=>es(),"show-filter-category":(e,t)=>{var n,i;Te(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{xp();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>bl(t.value),"clear-project-filter":()=>Np(),"clear-status-filter-new":()=>Hp(),"set-status-preset":(e,t)=>qp(t.value),"toggle-status-option":(e,t)=>Op(t.filterValue,e),"clear-priority-filter-new":()=>Up(),"toggle-priority-option":(e,t)=>Fp(t.filterValue,e),"set-type-filter":(e,t)=>yl(t.value),"clear-type-filter":()=>Gp(),"set-assignee-filter":(e,t)=>wl(t.value),"clear-assignee-filter":()=>zp(),"set-sprint-filter":(e,t)=>kl(t.value),"clear-sprint-filter":()=>Vp(),"clear-label-filter-new":()=>Kp(),"toggle-label-option":(e,t)=>Wp(t.filterValue,e),"clear-exclude-label-filter-new":()=>Zp(),"toggle-exclude-label-option":(e,t)=>Yp(t.filterValue,e),"set-sort":(e,t)=>Xp(t.value),"set-group-by":(e,t)=>Qp(t.value),"clear-all-filters":()=>Jp(),"retry-load-issues":()=>ut()});let rn=[],Ba=[];Je(e=>{e==="currentProject"&&S()==="my-issues"&&(cn(),Qn(),dn())});function It(){return rn}function ln(e){rn=e}let Da=0;async function cn(){var a;const e=C(),t=Pt();if(!e||!t)return;const n=++Da,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=z();tm();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==Da)return;rn=r,S()==="my-issues"&&Qt(rn),Xn()}catch(o){if(n!==Da)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=N({icon:R.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),x("load issues",o)}}async function dn({showLoading:e=!0}={}){const t=C();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=z();Ba=await h.getTeamActivities(t.id,0,10,{projectId:i}),em()}catch{n&&(n.innerHTML=N({icon:R.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function em(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Ba.length){e.innerHTML=N({icon:R.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Ba.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Fa(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Ga(t)}${n}</span>
                <span class="activity-actor">by ${f(Ua(t))}</span>
                <span class="activity-time">${Oe(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function tm(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function $l(){cn()}function Xn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),rn.length===0){e.innerHTML=N({icon:R.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=rn.map(t=>Ve(t)).join("")}}let Ma=0;async function Qn(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Ma,n=z(),i=ne(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const c=await h.getCurrentSprint(r.id);if(!c)return null;let l={};try{const d=await h.getIssues({sprint_id:c.id,project_id:r.id,limit:500});for(const u of d)l[u.status]=(l[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${c.id}:`,d)}return{project:r,sprint:c,statusCounts:l}}catch(c){return console.error(`Failed to load current sprint for project ${r.id}:`,c),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==Ma)return;nm(o)}catch(a){if(t!==Ma)return;console.error("Failed to load sprint status:",a),e.innerHTML=N({icon:R.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function nm(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,c=o>0?Math.min(100,Math.round(r/o*100)):0,l=o>0&&r>o,d=s.limbo?"limbo":l?"arrears":"",u=a||{},m=Object.values(u).reduce((v,b)=>v+b,0);return`
                    <div class="sprint-status-card ${d}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${f(i.name)}</span>
                            ${s.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${l?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${f(s.name)}</div>
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
                        ${m>0?`
                            <div class="sprint-issue-breakdown">
                                <div class="sprint-stacked-bar">
                                    ${n.filter(v=>u[v]).map(v=>{const b=Math.round(u[v]/m*100);return`<div class="sprint-stacked-segment status-${v}" style="width: ${b}%" title="${_e(v)}: ${u[v]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(v=>u[v]).map(v=>`<span class="sprint-count-label status-${v}">${u[v]} ${_e(v)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}te({"filter-my-issues":()=>$l(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Ac(t.identifier)},"retry-load-my-issues":()=>cn(),"retry-load-sprint-status":()=>Qn()});const El=$a,im=["task","bug","feature","chore","docs","tech_debt","epic"];let tt=[],xl=Promise.resolve();const sm={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Il(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function _l(){return!!document.querySelector(".inline-dropdown")}function Tl(){return tt}function Sl(e){tt=e}async function ja(e,t,n,i){var u,m,v,b;e.preventDefault(),xt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${El.map((w,I)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${w}">
                    ${Ce(w)}
                    <span>${_e(w)}</span>
                    <span class="dropdown-shortcut">${I+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Ea.map((w,I)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${w}">
                    ${nt(w)}
                    <span>${je(w)}</span>
                    <span class="dropdown-shortcut">${I}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${im.map(w=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${w}">
                    <span class="issue-type-badge type-${w}">${dt(w)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const w=Vi();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${w.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:w.map(({assignee:I,indent:_},D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(I.id)}">
                    ${Xt(I,"avatar-small")}
                    <span>${xa(I,_)}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const w=document.querySelector(`.issue-row[data-issue-id="${n}"]`),I=(w==null?void 0:w.dataset.projectId)||((u=re())==null?void 0:u.project_id),_=$n(I);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${_.map((D,B)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${D.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${D.label}</span>
                    ${B<9?`<span class="dropdown-shortcut">${B}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const w=Re(),I=It(),_=re(),D=w.find(ie=>ie.id===n)||I.find(ie=>ie.id===n)||_,B=new Set(((D==null?void 0:D.labels)||[]).map(ie=>ie.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const E=o.getBoundingClientRect();let M=a.bottom+4,T=a.left;T+E.width>window.innerWidth-8&&(T=a.right-E.width),M+E.height>window.innerHeight-8&&(M=a.top-E.height-4),o.style.top=`${M}px`,o.style.left=`${Math.max(8,T)}px`,Kn(o,{multiSelect:!0});let U=[];const X=C();if(X)try{U=await h.getLabels(X.id)}catch(ie){console.error("Failed to load labels:",ie)}if(!o.parentNode)return;Cl(o,n,U,B);const ye=o.getBoundingClientRect();let Ue=a.bottom+4,V=a.left;V+ye.width>window.innerWidth-8&&(V=a.right-ye.width),Ue+ye.height>window.innerHeight-8&&(Ue=a.top-ye.height-4),o.style.top=`${Ue}px`,o.style.left=`${Math.max(8,V)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const w=Re(),I=It(),_=re(),D=w.find(Q=>Q.id===n)||I.find(Q=>Q.id===n)||_,B=(D==null?void 0:D.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const E=o.getBoundingClientRect();let M=a.bottom+4,T=a.left;T+E.width>window.innerWidth-8&&(T=a.right-E.width),M+E.height>window.innerHeight-8&&(M=a.top-E.height-4),o.style.top=`${M}px`,o.style.left=`${Math.max(8,T)}px`,Kn(o);let U=[];if(B)try{U=await h.getSprints(B),Gf(B,U)}catch(Q){console.error("Failed to load sprints:",Q)}if(!o.parentNode)return;const X=U.filter(Q=>Q.status!=="completed"||Q.id===(D==null?void 0:D.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${X.map((Q,me)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(Q.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${f(Q.name)}${Q.status==="active"?" (Active)":""}</span>
                    ${me<9?`<span class="dropdown-shortcut">${me+1}</span>`:""}
                </button>
            `).join("")}
        `;const ye=o.getBoundingClientRect();let Ue=a.bottom+4,V=a.left;V+ye.width>window.innerWidth-8&&(V=a.right-ye.width),Ue+ye.height>window.innerHeight-8&&(Ue=a.top-ye.height-4),o.style.top=`${Ue}px`,o.style.left=`${Math.max(8,V)}px`,o.classList.remove("dropdown-positioning");const ie=Q=>{const me=Q.key;if(me==="Escape"||me==="Tab"){xt(),document.removeEventListener("keydown",ie),Wn(null);return}if(Il(Q,o))return;const bt=parseInt(me);if(isNaN(bt))return;const y=o.querySelectorAll(".dropdown-option");let ce=!1;bt===0?(un(n,"sprint_id",null),ce=!0):bt>=1&&bt<y.length&&(y[bt].click(),ce=!0),ce&&(document.removeEventListener("keydown",ie),Wn(null))};Wn(ie),document.addEventListener("keydown",ie),(v=o.querySelector(".dropdown-option[data-action]"))==null||v.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let c=a.bottom+4,l=a.left;l+r.width>window.innerWidth-8&&(l=a.right-r.width),c+r.height>window.innerHeight-8&&(c=a.top-r.height-4),o.style.top=`${c}px`,o.style.left=`${Math.max(8,l)}px`,o.classList.remove("dropdown-positioning");const d=w=>{const I=w.key;if(I==="Escape"||I==="Tab"){xt(),document.removeEventListener("keydown",d);return}if(Il(w,o))return;const _=parseInt(I);if(isNaN(_))return;let D=!1;if(t==="status"&&_>=1&&_<=6)un(n,"status",El[_-1]),D=!0;else if(t==="priority"&&_>=0&&_<=4)un(n,"priority",Ea[_]),D=!0;else if(t==="estimate"){const B=re(),E=$n(B==null?void 0:B.project_id);_>=0&&_<E.length&&(un(n,"estimate",E[_].value),D=!0)}D&&(document.removeEventListener("keydown",d),Wn(null))};Wn(d),document.addEventListener("keydown",d),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),Kn(o)}function am(e,t,n,i){ja(e,t,n,i)}function om(e,t,n){xl=xl.then(()=>Ll(e,t,n))}async function Ll(e,t,n){const i=Re(),s=It(),a=re(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),c=r.indexOf(t);let l;if(c>=0?l=r.filter(d=>d!==t):l=[...r,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const u=(await h.updateIssue(e,{label_ids:l})).labels||[],m=i.findIndex(I=>I.id===e);m!==-1&&(i[m].labels=u,et([...i]));const v=s.findIndex(I=>I.id===e);v!==-1&&(s[v].labels=u,ln([...s])),(a==null?void 0:a.id)===e&&Gi({...a,labels:u});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const I=i.find(_=>_.id===e)||s.find(_=>_.id===e);I&&(b.outerHTML=Ve(I))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=u.length>0?u.map(I=>`
                    <span class="issue-label" style="background: ${Y(I.color)}20; color: ${Y(I.color)}">${f(I.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(x("update labels",d),n){const u=c>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function Cl(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${Y(s.color)}20; color: ${Y(s.color)}">${f(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Al(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=C();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);Fi(o),a!=null&&a.id&&await Ll(e,a.id,null);const r=Re(),c=It(),l=re(),d=r.find(m=>m.id===e)||c.find(m=>m.id===e)||l,u=new Set(((d==null?void 0:d.labels)||[]).map(m=>m.id));t&&Cl(t,e,o,u),n.value=""}catch(a){x("create label",a)}finally{n.disabled=!1,n.focus()}}}function ns(){const e=document.getElementById("create-issue-labels-label");e&&(tt.length===0?e.textContent="Labels":e.textContent=`Labels (${tt.length})`)}function Ra(e,{failed:t=!1}={}){const n=zr();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=tt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${Y(i.color)}20; color: ${Y(i.color)}">${f(i.name)}</span>
                </button>
            `}).join("")}
    `}function rm(e){const t=tt.indexOf(e);t>=0?tt.splice(t,1):tt.push(e),ns();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Ra(n)}async function Bl(){const e=C();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);Fi(a),s!=null&&s.id&&!tt.includes(s.id)&&tt.push(s.id),ns(),t&&Ra(t),n.value=""}catch(s){x("create label",s)}finally{n.disabled=!1,n.focus()}}}async function un(e,t,n){xt();const i=document.querySelector(`.issue-row[data-issue-id="${e}"]`);i&&i.classList.add("updating");try{const s={};s[t]=n;const a=await h.updateIssue(e,s);if(!a||!a.id)throw new Error("Invalid response from server");const o=Re(),r=o.findIndex(u=>u.id===e);r!==-1&&(o[r]=a,et([...o]));const c=It(),l=c.findIndex(u=>u.id===e);l!==-1&&(c[l]=a,ln([...c]));const d=re();if((d==null?void 0:d.id)===e&&Gi(a),i&&i.parentNode){const u=o.find(m=>m.id===e)||c.find(m=>m.id===e)||a;if(u){i.outerHTML=Ve(u);const m=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(m){m.classList.add("updated"),setTimeout(()=>m.classList.remove("updated"),500);const v=sm[t],b=v&&m.querySelector(`[data-dropdown-type="${v}"]`);b&&b.focus()}}}if(k("Issue updated","success"),t==="status"){const u=z();if(u)try{const v=(await h.getSprints(u)).find(b=>b.status==="active");_a(v||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&lm(t,a)}}catch(s){x("update issue",s),i&&i.classList.remove("updating")}}function lm(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===s.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Ce(t.status)}
            <span>${_e(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${nt(t.priority)}
            <span>${je(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${dt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?en(t.assignee_id):null,l=c?Nt(c):null;r.innerHTML=l?`${Xt(c,"avatar-small")}<span>${f(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=hp(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?f(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Is(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}te({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?un(t.issueId,i,n==="null"?null:Number(n)):un(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{om(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Al(t.issueId)},"toggle-create-issue-label":(e,t)=>{rm(t.labelId)},"create-label-for-create-issue":()=>{Bl()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Al(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Bl())}});const Dl=["task","bug","feature","chore","docs","tech_debt","epic"];function _t(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function pn(e){const t=_t(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function pt(){var s,a,o;const e=document.getElementById("issues-list");if(!e)return;const t=(s=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:s.dataset.issueId;e.classList.add("issue-list-linear");const n=Re();if(n.length===0){const r=(o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim(),c=Ia()>0,l=r&&r.length>=2;if(c||l){const d=Ia(),u=[];l&&u.push(`search "${r}"`),c&&u.push(`${d} active filter${d>1?"s":""}`),e.innerHTML=N({icon:R.issues,heading:"No matching issues",description:`No issues match your ${u.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=N({icon:R.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Yn(-1);return}const i=sl();i==="status"?dm(e,n):i==="priority"?um(e,n):i==="type"?pm(e,n):i==="assignee"?mm(e,n):i==="sprint"?fm(e,n):e.innerHTML=pn(n)+n.map(r=>Ve(r)).join(""),cm(t)}function cm(e){const t=Wr();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){Yn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Yn(i),n[i].classList.add("keyboard-selected")}function dm(e,t){const n={};$a.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=pn(t);$a.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ce(s)}</span>
                    <span class="group-title">${_e(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${_t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ve(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function um(e,t){const n={};nl.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=pn(t);nl.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${nt(s)}</span>
                    <span class="group-title">${je(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${_t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ve(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function pm(e,t){const n={};Dl.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=pn(t);Dl.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${dt(s)}</span></span>
                    <span class="group-title">${dt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${_t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ve(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function mm(e,t){const n={},i="__unassigned__";n[i]=[];const s=Vi();s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=pn(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${_t(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[i].map(o=>Ve(o)).join("")}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=Nt(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Xt(o,"avatar-small")}</span>
                    <span class="group-title">${f(c)}${f(l)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${_t(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Ve(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function fm(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(c=>{c.sprint_id?(i[c.sprint_id]||(i[c.sprint_id]=[],s.push(c.sprint_id)),i[c.sprint_id].push(c)):i[n].push(c)});const a={active:0,planned:1,completed:2},o=rc();s.sort((c,l)=>{const d=o[c],u=o[l],m=d?a[d.status]??3:3,v=u?a[u.status]??3:3;return m-v});let r=pn(t);s.forEach(c=>{const l=i[c];if(l.length===0)return;const d=o[c],u=d?d.name:c,m=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",v=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${v}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${v}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${f(u)}${m}</span>
                    <span class="group-count">${l.length}</span>
                    <span class="group-points">${_t(l)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(b=>Ve(b)).join("")}
                </div>
            </div>
        `}),i[n].length>0&&(r+=`
            <div class="issue-group" data-group="${n}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${n}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${i[n].length}</span>
                    <span class="group-points">${_t(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${i[n].map(c=>Ve(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function gm(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Ml(e,t){if(!e)return"";if(!t)return f(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return f(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${f(i)}<mark class="search-match">${f(s)}</mark>${f(a)}`}function hm(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Ml(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}function Ve(e){var u,m,v;const t=e.assignee_id?en(e.assignee_id):null,n=t?Nt(t):null,i=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),s=e.estimate?Is(e.estimate,e.project_id):"",a=mo(e.estimate,e.project_id),o=e.sprint_id?rc()[e.sprint_id]:null,r=o?o.name:null,c=(m=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:m.trim(),l=!!c&&((v=e.title)==null?void 0:v.toLowerCase().includes(c.toLowerCase())),d=c&&!l?hm(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${je(e.priority)}">
                    ${nt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${_e(e.status)}">
                    ${Ce(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${dt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${Ml(e.title,c)}${d?` <span class="issue-search-snippet" title="Matched in description">— ${d}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(b=>`
                            <span class="issue-label" style="background: ${Y(b.color)}20; color: ${Y(b.color)}">${f(b.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${p(e.id)}" title="Sprint: ${r?f(r):"None"}">
                    ${r?`<span class="sprint-badge">${f(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${p(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${s||"None"}`}">
                    ${s?`<span class="estimate-badge${a?" out-of-scale":""}">${s}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${i}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${p(e.id)}" title="${p(n||"Unassigned")}">
                    ${n?Xt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function nt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ce(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}te({"toggle-group":(e,t)=>{gm(t.group)},"show-inline-dropdown":(e,t,n)=>{ja(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),W(t.issueId))}});function vm(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function bm(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function Pa(e="new-comment",t="mention-suggestions"){const n=document.getElementById(e),i=document.getElementById(t);if(!n||!i||n.dataset.mentionsBound==="true")return;n.dataset.mentionsBound="true";let s=-1;const a=()=>{i.classList.add("hidden"),i.innerHTML="",s=-1},o=l=>{var u,m;const d=i.querySelectorAll(".mention-suggestion");d.length!==0&&(s=(l%d.length+d.length)%d.length,d.forEach((v,b)=>v.classList.toggle("highlighted",b===s)),(m=(u=d[s]).scrollIntoView)==null||m.call(u,{block:"nearest"}))},r=l=>{const d=n.selectionStart||0,u=n.value.slice(0,d).replace(/@([a-zA-Z0-9._-]*)$/,`@${l} `),m=n.value.slice(d);n.value=u+m,n.focus(),a()},c=()=>{const l=n.selectionStart||0;if(bm(n.value,l)){a();return}const u=n.value.slice(0,l).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!u){a();return}const m=u[2].toLowerCase(),v=Gt().map(b=>({id:b.id,name:b.name||b.email||"User",email:b.email||"",handle:vm(b)})).filter(b=>!m||b.handle.includes(m)||b.name.toLowerCase().includes(m)||b.email.toLowerCase().includes(m)).slice(0,6);if(!v.length){a();return}i.innerHTML=v.map(b=>`
            <button type="button" class="mention-suggestion" data-handle="${p(b.handle)}">
                <span class="mention-name">${f(b.name)}</span>
                <span class="mention-handle">@${f(b.handle)}</span>
            </button>
        `).join(""),i.classList.remove("hidden"),i.querySelectorAll(".mention-suggestion").forEach((b,w)=>{b.addEventListener("click",()=>r(b.dataset.handle)),b.addEventListener("mouseenter",()=>o(w))}),o(0)};n.addEventListener("input",c),n.addEventListener("click",c),n.addEventListener("keydown",l=>{const d=!i.classList.contains("hidden");if(l.key==="Escape"&&d){l.preventDefault(),l.stopPropagation(),a();return}if(d){if(l.key==="ArrowDown")l.preventDefault(),o(s+1);else if(l.key==="ArrowUp")l.preventDefault(),o(s-1);else if(l.key==="Enter"||l.key==="Tab"){const m=i.querySelectorAll(".mention-suggestion")[s];m&&(l.preventDefault(),r(m.dataset.handle))}}}),n.addEventListener("blur",()=>{setTimeout(a,150)})}const jl=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Jn(e=null){const t=e||z()||"";Sl([]);const n=ne().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${f(o.name)}</option>
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
                            ${jl.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${Ce("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${nt("no_priority")}
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
    `,H(),ns();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Vu();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{Fr(i.value,s.value)}),s.addEventListener("input",()=>{Fr(i.value,s.value)}),i.focus()}function ym(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function wm(e){const t=jl.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function km(e,t){const n=ne().find(i=>i.id===t);Sl([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?f(n.name):"Project"}</span>
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
                            ${Ce("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${nt("no_priority")}
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
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${p(e)}" data-project-id="${p(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,H(),ns(),document.getElementById("create-issue-title").focus()}async function $m(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null;if(!n){k("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:Tl(),parent_id:e});O(),k(`Created sub-issue ${d.identifier}`,"success"),W(e)}catch(d){x("create sub-issue",d)}}async function Em(e,t,n){var o,r;xt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const c=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${il.map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="status" data-value="${l}" data-label="${p(_e(l))}">
                    ${Ce(l)}
                    <span>${_e(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const c=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Ea.map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${l}" data-label="${p(je(l))}">
                    ${nt(l)}
                    <span>${je(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const c=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="type" data-value="${l}" data-label="${p(dt(l))}">
                    <span class="issue-type-badge type-${l}">${dt(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!C())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let c=zr(),l=!1;if(c.length===0)try{c=await h.getLabels(C().id),Fi(c)}catch(d){console.error("Failed to load labels:",d),l=!0}Ra(a,{failed:l}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Kn(a,{multiSelect:!0});return}else if(e==="assignee"){const c=document.getElementById("create-issue-assignee").value,l=Vi();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${l.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:l.map(({assignee:d,indent:u})=>{const m=Nt(d)||"User";return`
                <button class="dropdown-option ${d.id===c?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(m)}">
                    ${Xt(d,"avatar-small")}
                    <span>${xa(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const c=document.getElementById("create-issue-estimate").value,l=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=$n(l);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const m=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${m===c?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(m)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${f(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const c=document.getElementById("create-issue-sprint").value,l=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!l)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await h.getSprints(l)).filter(m=>m.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(m=>`
                        <button class="dropdown-option ${m.id===c?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${p(m.id)}" data-label="${p(m.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${f(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Kn(a)}function xm(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Im(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const i=f(n);if(e==="status"){const s=document.querySelector(".toolbar-btn:first-child");s.innerHTML=`${Ce(t)}<span id="create-issue-status-label">${i}</span>`}else if(e==="priority"){const s=document.querySelectorAll(".toolbar-btn")[1];s.innerHTML=`${nt(t)}<span id="create-issue-priority-label">${i}</span>`}else if(e==="type"){const s=document.getElementById("create-issue-type-btn");s&&(s.innerHTML=`<span class="issue-type-badge type-${t}">${dt(t)}</span><span id="create-issue-type-label">${i}</span>`)}xt()}async function Rl({keepOpen:e=!1}={}){var w,I;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null,d=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,u=(I=document.getElementById("create-issue-due-date"))==null?void 0:I.value,m=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const v=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");v&&(v.disabled=!0),b&&(b.disabled=!0);try{const _=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:d,label_ids:Tl(),due_date:m});k(`Created ${_.identifier}`,"success"),Wu(),S()==="issues"?ut():S()==="my-issues"&&cn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(O(),W(_.id))}catch(_){x("create issue",_)}finally{v&&(v.disabled=!1),b&&(b.disabled=!1)}}async function _m(){await Rl({keepOpen:!1})}async function Tm(){await Rl({keepOpen:!0})}te({"toggle-create-dropdown":(e,t,n)=>{Em(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Im(t.field,t.value,t.label)},"create-issue-submit":()=>{_m()},"create-issue-and-new":()=>{Tm()},"update-create-project":()=>{xm()},"apply-template":e=>{wm(e.target.value)},"toggle-create-options":()=>{ym()},"create-sub-issue-submit":(e,t)=>{$m(t.parentId,t.projectId)}});async function Pl(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=$n(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${f(o.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${p(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${p(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
                    <textarea id="edit-issue-description">${f(t.description||"")}</textarea>
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
                        ${s}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${n.filter(o=>o.status!=="completed").map(o=>`
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${f(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,H();const a=document.getElementById("edit-issue-description");if(a){const o=Ni(e);if(o){const r=qr(e),c=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,c&&(c.textContent="Restored your unsaved description draft.",c.classList.remove("hidden"))):c&&(c.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",c.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?Rt(e,r,t.description||""):Rt(e,null)})}}catch(t){x("load issue",t)}}async function Sm(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:i?i.value:"",status:s.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await h.updateIssue(t,l),Ni(t)===l.description&&Rt(t,null),O(),await W(t),k("Issue updated!","success")}catch(n){x("update issue",n)}}async function Lm(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await ut(),await He(),j("issues"),k("Issue deleted!","success")}catch(t){x("delete issue",t)}}te({"update-issue":(e,t)=>{Sm(e,t.issueId)}});let ue=null,Nl=!1,mn=!1,ql="new-comment";function Cm(){return ue||(ue=document.createElement("div"),ue.className="quote-tooltip",ue.setAttribute("role","button"),ue.setAttribute("tabindex","0"),ue.setAttribute("aria-label","Quote selection in comment"),ue.textContent="Quote",ue.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),is())}),ue.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),ue.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),is()}),document.body.appendChild(ue),ue)}function Ol(e,t){const n=Cm();n.style.display="flex",mn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!mn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function ei(){ue&&(ue.style.display="none"),mn=!1}function Hl(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Na(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Hl(t.startContainer),i=Hl(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Am(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function is(e=ql){const t=Na();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Am(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),ei(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Bm(){var i;if(!Na())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Ol(n.left+n.width/2,n.top),!0}function Dm(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Na()){ei();return}Ol(t,n)},10)}function Fl({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(ql=t,i.addEventListener("mouseup",Dm,n?{signal:n}:void 0),Nl||(Nl=!0,document.addEventListener("mousedown",s=>{mn&&ue&&!ue.contains(s.target)&&ei()}),document.addEventListener("selectionchange",()=>{mn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&ei()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&mn&&ei()}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Bm()})))}function Ul(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Gl(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],m=document.createElement("a");m.href=`#/issue/${u}`,m.className="issue-link",m.textContent=u,o.appendChild(m),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function zl(e){if(!e)return"";const t=We(e),n=document.createElement("div");return n.innerHTML=t,Ul(n,Gl),n.innerHTML}function fn(e){if(!e)return"";const t=We(e),n=document.createElement("div");return n.innerHTML=t,Ul(n,Gl),n.innerHTML}let qa=!1,Oa=!1,Tt=!0,ti=null,ss=null,as=null,os=null,Ha=!1,rs=null;function Vl(e=null){Ha=!0,e&&(rs=e)}function Fa(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Ua(e){return e.user_name||e.user_email||"Unknown"}function Ga(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${f(_e(t(e.old_value)))}</strong> to <strong>${f(_e(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${f(je(t(e.old_value)))}</strong> to <strong>${f(je(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${f(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${f(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue"}}function Mm(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function jm(){Tt=!Tt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",Tt),n&&n.classList.toggle("rotated",Tt)}async function ls(e){try{ti=await h.getTicketRitualsStatus(e),Wl(e)}catch(t){console.error("Failed to load ticket rituals:",t),ti=null}}function Wl(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!ti){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=ti;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(Tt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",Tt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",Tt);const r=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending${d.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${d.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${f(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?We(d.prompt):""}</div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Oe(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${We(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Qf(d,e)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `:""}
        ${i.length>0?`
            <div class="ticket-rituals-completed">
                ${i.map(d=>`
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${f(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Oe(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function cs(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await W(t.id,!1),!0):(j("my-issues",!1),!1)}catch{return j("my-issues",!1),!1}}function Kl(e){const t=Hi(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Yl({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Rm(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=re();if(!t)return;const n=Kl(t.id);ss=n.prevIssue?n.prevIssue.id:null,as=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=Yl(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}Je(e=>{e==="detailNavContext"&&Rm()});async function W(e,t=!0){try{t&&Ft(),Tt=!0;let n=!1;const[i,s,a,o,r,c]=await Promise.all([h.getIssue(e),h.getComments(e).catch(y=>(console.error("Failed to load comments:",y),n=!0,[])),h.getActivities(e),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),d=[...c.pending_rituals||[],...c.completed_rituals||[]].filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name,is_pending:!y.attestation.approved_at}));ti=c;const u=[...s,...d].sort((y,ce)=>new Date(y.created_at)-new Date(ce.created_at)),m=[i.parent_id?h.getIssue(i.parent_id):Promise.resolve(null),h.getSprints(i.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[v,b]=await Promise.all(m),w=r.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),I=r.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),_=r.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:S()},"",`/issue/${i.identifier}`),Gi(i),el(b),Ha=!1,rs=null,document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const D=document.getElementById("issue-detail-view");D.classList.remove("hidden");const B=S()||"my-issues",E=ne().find(y=>y.id===i.project_id),M=i.assignee_id?en(i.assignee_id):null,T=M?Nt(M):null,U=i.sprint_id?b.find(y=>y.id===i.sprint_id):null,X=Kl(i.id),{prevIssue:ye,nextIssue:Ue}=X;D.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(B)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Yl(X)}
                        <span class="issue-detail-breadcrumb">${E?f(E.name):"Project"} › ${f(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${f(i.title)}</h1>

                    ${v?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(v.identifier)}" data-action="navigate-issue" data-issue-id="${p(v.id)}" data-identifier="${p(v.identifier)}">${v.identifier}: ${f(v.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(i.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${Ni(i.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${i.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(i.id)}">
                            ${i.description?fn(i.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${p(i.id)}" data-project-id="${p(i.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${o.length===0?N({icon:R.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):o.map(y=>`
                                <a href="/issue/${encodeURIComponent(y.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(y.id)}" data-identifier="${p(y.identifier)}">
                                    <span class="sub-issue-status">${Ce(y.status)}</span>
                                    <span class="sub-issue-id">${y.identifier}</span>
                                    <span class="sub-issue-title">${f(y.title)}</span>
                                    ${y.estimate?`<span class="sub-issue-estimate">${y.estimate}pts</span>`:""}
                                </a>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${p(i.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${w.length===0&&I.length===0&&_.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${I.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${I.map(y=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ce(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${f(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(i.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${w.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${w.map(y=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ce(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${f(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(i.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
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
                                            <span class="relation-status">${Ce(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${f(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(i.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
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
                            <h3>Comments${u.length>0?` <span class="section-count">(${u.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${n?`
                                <div class="comments-error">
                                    Comments failed to load.
                                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${p(i.id)}">Retry</button>
                                </div>
                            `:""}
                            ${u.length===0?n?"":`
                                <div class="comments-empty">No comments yet</div>
                            `:u.map(y=>{var ce;return`
                                <div class="comment ${y.is_attestation?"comment-attestation":""} ${y.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${y.is_attestation?"avatar-attestation":""}">${y.is_attestation?y.is_pending?"⏳":"✓":(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${f(y.author_name||"User")}</span>
                                            ${Ur((ce=en(y.author_id))==null?void 0:ce.is_agent)}
                                            ${y.is_attestation?`<span class="comment-ritual-badge">${y.is_pending?"Pending approval — ":""}Ritual: ${f(y.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Oe(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${zl(y.content)}</div>
                                    </div>
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${a.length>0?` <span class="section-count">(${a.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${a.length===0?N({icon:R.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):a.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Fa(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ga(y)}</span>
                                        <span class="activity-actor">by ${f(Ua(y))}</span>
                                        <span class="activity-time">${Oe(y.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${p(i.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${p(i.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${Ce(i.status)}
                                <span>${_e(i.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(i.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${nt(i.priority)}
                                <span>${je(i.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(i.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${i.issue_type||"task"}">${dt(i.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(i.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${T?`${Xt(M,"avatar-small")}<span>${f(T)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(i.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${U?f(U.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(i.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${i.labels&&i.labels.length>0?i.labels.map(y=>`
                                        <span class="issue-label" style="background: ${Y(y.color)}20; color: ${Y(y.color)}">${f(y.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${E?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${f(E.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(i.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${mo(i.estimate,i.project_id)?" out-of-scale":""}" ${mo(i.estimate,i.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Is(i.estimate,i.project_id)}</span>
                            </button>
                        </div>

                        ${i.due_date?`
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(i.due_date).toLocaleDateString()}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${f(i.creator_name||"Unknown")}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(i.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${p(i.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item" data-action="show-issue-description-revisions" data-issue-id="${p(i.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Description history
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${p(i.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,os&&os.abort(),os=new AbortController;const{signal:V}=os,ie=document.querySelector(".sidebar-overflow-trigger"),Q=document.querySelector(".overflow-menu-dropdown");if(ie&&Q){const y=()=>{Q.classList.add("hidden"),ie.setAttribute("aria-expanded","false")},ce=()=>{const Be=Q.classList.toggle("hidden");ie.setAttribute("aria-expanded",String(!Be))};ie.addEventListener("click",ce,{signal:V}),document.addEventListener("click",Be=>{!ie.contains(Be.target)&&!Q.contains(Be.target)&&y()},{signal:V}),Q.addEventListener("keydown",Be=>{Be.key==="Escape"&&(y(),ie.focus())},{signal:V})}Wl(i.id),Pa(),Fl({signal:V});const me=document.getElementById("new-comment");if(me){const y=Pr(i.id);y&&(me.value=y),me.addEventListener("input",()=>{Pi(i.id,me.value)}),me.addEventListener("keydown",ce=>{var Be;ce.key==="Enter"&&(ce.metaKey||ce.ctrlKey)&&(ce.preventDefault(),(Be=me.closest("form"))==null||Be.requestSubmit())})}ss=ye?ye.id:null,as=Ue?Ue.id:null;const bt=y=>{var Fs;if((y.metaKey||y.ctrlKey)&&y.shiftKey&&(y.key===">"||y.key==="."||y.code==="Period")&&is()){y.preventDefault();return}if(y.metaKey||y.ctrlKey||y.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||y.target.tagName==="INPUT"||y.target.tagName==="TEXTAREA"||y.target.tagName==="SELECT"||y.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||_l())return;if(y.key==="ArrowLeft"&&ss)y.preventDefault(),W(ss);else if(y.key==="ArrowRight"&&as)y.preventDefault(),W(as);else if(y.key==="c"){y.preventDefault(),y.stopImmediatePropagation();const yt=document.getElementById("new-comment");yt&&(yt.focus(),yt.scrollIntoView({behavior:"smooth",block:"nearest"}))}else y.key==="j"?(y.preventDefault(),y.stopImmediatePropagation(),ds(1)):y.key==="k"?(y.preventDefault(),y.stopImmediatePropagation(),ds(-1)):y.key==="d"&&(y.preventDefault(),(Fs=document.querySelector('[data-action="edit-description"]'))==null||Fs.click());const Be={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[y.key];if(Be){const yt=document.querySelector(`.property-row[data-field="${Be}"]`);yt&&(y.preventDefault(),yt.click())}};document.addEventListener("keydown",bt,{signal:V})}catch(n){x("load issue",n)}}async function Pm(e,t){if(e.preventDefault(),qa)return!1;const n=document.getElementById("new-comment").value;Pi(t,null),qa=!0;try{await h.createComment(t,n),await W(t),k("Comment added!","success")}catch(i){Pi(t,n),x("add comment",i)}finally{qa=!1}return!1}async function Nm(e){const t=re()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${f(t.description||"")}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Ni(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const l=qr(e);r&&(l===null||l!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}Pa("edit-description","edit-description-mention-suggestions"),a.addEventListener("input",()=>{const l=a.value;l!==(t.description||"")?Rt(e,l,t.description||""):Rt(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Zl()}),a.addEventListener("keydown",l=>{var d,u;l.key==="Enter"&&(l.metaKey||l.ctrlKey)&&(l.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),l.key==="Escape"&&(l.preventDefault(),l.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,m;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Rt(e,null),Ha){W(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?fn(t.description):'<span class="add-description-link">Add description...</span>',(m=n.querySelector('[data-action="edit-description"]'))==null||m.focus()}});let c=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var v,b;if(Oa)return;const l=(v=document.getElementById("edit-description"))==null?void 0:v.value;if(l===void 0)return;const d=rs?rs.description||"":null;if(d!==null&&d!==(t.description||"")&&!c){c=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",w.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");Oa=!0,u&&(u.disabled=!0);const m=window.scrollY;try{await h.updateIssue(e,{description:l}),Rt(e,null),k("Description updated","success"),await W(e,!1),window.scrollTo(0,m),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(w){x("update description",w)}finally{Oa=!1,u&&(u.disabled=!1)}})}function Zl(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?fn(n):'<span class="text-muted">Nothing to preview.</span>'}function qm(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?Zl():i.focus()}function Om(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-add-relation" data-issue-id="${p(e)}">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-relate" data-issue-id="${p(e)}">
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
    `,H(),document.getElementById("relation-issue-search").focus()}async function Hm(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${f(r.identifier)}</span>
                <span class="link-result-title">${f(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Fm(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Um(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Gm(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),O(),k("Relation added","success"),W(t)}catch(s){x("add relation",s)}return!1}async function zm(e,t){try{await h.deleteRelation(e,t),k("Relation removed","success"),W(e)}catch(n){x("remove relation",n)}}function ds(e){const t=re();if(!t)return;const n=Hi();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||W(n[s].id)}te({"retry-issue-comments":(e,t)=>{W(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{am(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Nm(t.issueId)},"toggle-section":(e,t)=>{Mm(t.section)},"toggle-ticket-rituals":()=>{jm()},"save-comment":(e,t)=>{Pm(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Om(t.issueId)},"remove-relation":(e,t)=>{zm(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{km(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Gm(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Hm(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Fm(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Um()},"set-description-editor-mode":(e,t)=>{qm(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>ds(-1),"navigate-next-issue":()=>ds(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Pl(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Lm(t.issueId)}});function Xl(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let gn=[],ni=[],us=null,J=new Set,hn="list",Ot=!1,za=null,ps=null,Va=null,Wa=null,Ql=null;function Jl(e){if(Ql!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const Ka=Ku();(Ka==="list"||Ka==="grid")&&(hn=Ka);function ec(e){if(e!=="list"&&e!=="grid")return;hn=e,e==="grid"&&Ot&&Ya(),Yu(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),St()}function tc(){if(hn!=="list")return;Ot=!0,J.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),St(),bn()}function Ya(){Ot=!1,J.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),St(),bn()}function Vm(){za&&clearTimeout(za),za=setTimeout(()=>{St()},300)}function Wm(){const e=document.getElementById("doc-search");e&&(e.value=""),St()}async function Km(){ze(null)}async function Ym(){const e=document.getElementById("doc-search");e&&(e.value=""),ze(null)}function Zm(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=z()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=ne().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${f(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Xm(){return gn}function St(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Zm(),ni=gn.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),l=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!l)return!1}return!0}),ni.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),sf("",hn)}let vn=0;async function Qm(){var i;const e=us||((i=C())==null?void 0:i.id);if(!e)return;const t=++vn,n=z()||null;try{const s=await h.getDocuments(e,n);if(t!==vn)return;gn=s,St()}catch(s){if(t!==vn)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=N({icon:R.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",s)}}Je(e=>{e==="currentProject"&&S()==="documents"&&Qm()});async function Ht(e,t=null){var s;if(e||(e=(s=C())==null?void 0:s.id),!e)return;us=e,Kr(-1);const n=++vn,i=document.getElementById("documents-list");i&&(i.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=z()||null);try{const a=await h.getDocuments(e,t);if(n!==vn)return;gn=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",hn==="list"),r.classList.toggle("active",hn==="grid")),St()}catch(a){if(n!==vn)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=N({icon:R.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",a)}}function nc(){var t,n;if(S()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=us||((n=C())==null?void 0:n.id);e&&Ht(e).catch(i=>console.error("Failed to refresh documents list:",i))}function ic(e){Jl(e)&&ve(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Jm(e,t){Jl(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),j("documents"))}function ef(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${Y(t.color)}20; color: ${Y(t.color)}">${f(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function tf(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${ef(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${f(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${f(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?f(Xl(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${f(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function nf(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${Y(r.color)}20; color: ${Y(r.color)}">${f(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Xl(e.content).substring(0,80):"No content",s=Ot?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${J.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Ot&&J.has(e.id)?" selected":""}" data-action="${Ot?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
      ${s}
      <div class="document-list-icon">${f(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${f(e.title)}</div>
        <div class="document-list-snippet text-muted">${f(i)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?f(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function sf(e="",t="list"){var l;const n=document.getElementById("documents-list");if(!n)return;J.clear(),bn();const i=ni;if(i.length===0){const d=(l=document.getElementById("doc-search"))==null?void 0:l.value,u=z(),m=d||u;n.innerHTML=N({icon:m?R.search:R.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?tf:nf,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=ne();i.forEach(d=>{let u,m;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")m="Global (Team-wide)";else{const v=r.find(b=>b.id===d.project_id);m=v?v.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",m=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:m,docs:[]}),o[u].docs.push(d)});let c="";for(const[d,u]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${m}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function af(e){J.has(e)?J.delete(e):J.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=J.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",J.has(e)),bn()}function of(){ni.forEach(e=>J.add(e.id)),ni.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),bn()}function sc(){J.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),J.clear(),bn()}function bn(){const e=document.getElementById("doc-bulk-actions");e&&(Ot?(e.classList.remove("hidden"),J.size>0?e.innerHTML=`
        <span class="bulk-count">${J.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function rf(){if(J.size===0){k("No documents selected","error");return}const t=ne().map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${J.size} Document${J.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${J.size} selected document${J.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,H()}async function lf(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(J);let i=0;const s=[];for(const c of n)try{await h.updateDocument(c,{project_id:t}),i++}catch(l){console.error(`Failed to move document ${c}:`,l),s.push(((o=gn.find(d=>d.id===c))==null?void 0:o.title)||c)}O(),sc(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=C())==null?void 0:r.id;return await Ht(a),!1}async function cf(){var a,o;if(J.size===0){k("No documents selected","error");return}const e=J.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(J);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(c){console.error(`Failed to delete document ${r}:`,c),i.push(((a=gn.find(l=>l.id===r))==null?void 0:a.title)||r)}Ya(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=C())==null?void 0:o.id;await Ht(s)}async function df(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${f(s.author_name||"Unknown")}</span>
                <span class="comment-date">${Oe(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${zl(s.content)}</div>
            </div>
          </div>
        `}).join("")}</div>
        <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${p(e.id)}">
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
          <button type="button" class="btn btn-secondary btn-sm" data-action="retry-document-comments" data-document-id="${p(e.id)}">Retry</button>
        </div>
      </div>
    `}}function uf(e,t){const n=document.getElementById("new-doc-comment");if(!n)return;const i=Pr(e);i&&(n.value=i),n.addEventListener("input",()=>{Pi(e,n.value)},{signal:t}),n.addEventListener("keydown",s=>{var a;s.key==="Enter"&&(s.metaKey||s.ctrlKey)&&(s.preventDefault(),(a=n.closest("form"))==null||a.requestSubmit())},{signal:t}),Pa("new-doc-comment","doc-mention-suggestions")}async function ve(e,t=!0){try{t&&Ft();const n=await h.getDocument(e);Ql=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(T=>T.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await df(n);let a=null,o=null,r=!1;if(n.project_id){const U=ne().find(X=>X.id===n.project_id);if(a=U?U.name:null,n.sprint_id)try{const X=await h.getSprint(n.sprint_id);o=X?X.name:null}catch(X){console.error("Failed to load sprint name:",X),r=!0}}let c=n.content||"";const l=F.lexer(c);n.title&&l.length>0&&l[0].type==="heading"&&l[0].depth===1&&l[0].text.trim()===n.title.trim()&&(c=c.slice(l[0].raw.length).trimStart());const d=Xm(),u=d.findIndex(T=>T.id===n.id),m=u>0?d[u-1]:null,v=u>=0&&u<d.length-1?d[u+1]:null,b=u>=0,w=S()||"documents",I=n.labels&&n.labels.length>0?n.labels.map(T=>`
          <span class="issue-label" style="background: ${Y(T.color)}20; color: ${Y(T.color)}">
            ${f(T.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(T.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let _='<span class="text-muted">None</span>';try{const T=await h.getDocumentIssues(n.id);T.length>0&&(_=T.map(U=>`
          <div class="linked-item">
            <span class="linked-item-id">${f(U.identifier)}</span>
            <span class="linked-item-title">${f(U.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(U.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(T){console.error("Failed to load linked issues:",T),_=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(w)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${b?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${m?`data-action="view-document" data-document-id="${p(m.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${v?`data-action="view-document" data-document-id="${p(v.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?f(a)+" ›":""} ${f(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?f(n.icon)+" ":""}${f(n.title)}</h1>

          <div class="document-content markdown-body">${c?fn(c):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?f(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:f(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${I}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${p(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${f(n.author_name||"Unknown")}</span>
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
            <button class="btn btn-secondary btn-small sidebar-link-btn" data-action="show-link-issue-modal" data-document-id="${p(n.id)}">+ Link Issue</button>
          </div>

          <div class="sidebar-section sidebar-actions">
            <div class="sidebar-overflow-menu">
              <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
              <div class="overflow-menu-dropdown hidden">
                <button class="overflow-menu-item" data-action="show-edit-document-modal" data-document-id="${p(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit document
                </button>
                <button class="overflow-menu-item" data-action="show-document-revisions" data-document-id="${p(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  View history
                </button>
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${p(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `,ps&&ps.abort(),ps=new AbortController;const{signal:D}=ps,B=i.querySelector(".sidebar-overflow-trigger"),E=i.querySelector(".overflow-menu-dropdown");if(B&&E){const T=()=>{E.classList.add("hidden"),B.setAttribute("aria-expanded","false")},U=()=>{const X=E.classList.toggle("hidden");B.setAttribute("aria-expanded",String(!X))};B.addEventListener("click",U,{signal:D}),document.addEventListener("click",X=>{!B.contains(X.target)&&!E.contains(X.target)&&T()},{signal:D}),E.addEventListener("keydown",X=>{X.key==="Escape"&&(T(),B.focus())},{signal:D})}uf(n.id,D),Fl({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:D}),Va=m?m.id:null,Wa=v?v.id:null;const M=T=>{if((T.metaKey||T.ctrlKey)&&T.shiftKey&&(T.key===">"||T.key==="."||T.code==="Period")&&is("new-doc-comment")){T.preventDefault();return}T.metaKey||T.ctrlKey||T.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||T.target.tagName==="INPUT"||T.target.tagName==="TEXTAREA"||T.target.tagName==="SELECT"||T.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(T.key==="ArrowLeft"&&Va?(T.preventDefault(),ve(Va)):T.key==="ArrowRight"&&Wa&&(T.preventDefault(),ve(Wa)))};document.addEventListener("keydown",M,{signal:D})}catch(n){x("load document",n)}}async function ms(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const c=a.find(l=>l.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${f(c.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Za(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${f(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function pf(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?fn(r):'<span class="text-muted">Nothing to preview.</span>'}}function Xa(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Hr(e);if(o){const c=zu(e),l=n!==null&&c!==null&&c.title===n.title&&c.content===n.content&&c.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):l?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const c={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&c.title===n.title&&c.content===n.content&&c.icon===n.icon){qi(e,null);return}qi(e,c,n)};[i,s,a].forEach(c=>c==null?void 0:c.addEventListener("input",r))}async function ac(){ii=null;const e=ne(),t=$c()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Za("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,H(),Xa("new"),t&&await ms("doc-sprint",t,null,!0)}let ii=null;async function mf(e,t,n){ii=n||null;const s=ne().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${f(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${Za("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,H(),Xa("new"),t&&await ms("doc-sprint",t,e)}async function ff(e){var a;e.preventDefault();const t=(a=C())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),qi("new",null),await Ht(t),O(),k("Document created!","success"),ii){const o=ii;ii=null,o()}}catch(o){x("create document",o)}return!1}let Qa=null,si=null,Ja=!1;async function oc(e){try{const t=await h.getDocument(e);Qa=e,si={title:t.title||"",content:t.content||""},Ja=!1;const i=ne().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form data-action="update-document" data-document-id="${p(e)}">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${p(t.title)}" required>
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
        ${Za("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,H(),Xa(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await ms("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){x("load document",t)}}async function gf(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&Qa===t&&si&&!Ja){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==si.title||(o.content||"")!==si.content))return Ja=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),Qa=null,si=null;const o=Hr(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&qi(t,null),O(),await ve(t),k("Document updated!","success")}catch(o){x("update document",o)}return!1}async function hf(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=C())==null?void 0:t.id;await Ht(n),j("documents"),k("Document deleted!","success")}catch(n){x("delete document",n)}}function vf(e,t){ms(e,t)}async function bf(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,H()}async function yf(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function wf(e,t){try{await h.linkDocumentToIssue(e,t),O(),k("Issue linked!","success"),await ve(e,!1)}catch(n){x("link issue",n)}}async function kf(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await ve(e,!1)}catch(n){x("unlink issue",n)}}let eo=!1;async function $f(e,t){if(e.preventDefault(),eo)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;eo=!0;try{await h.createDocumentComment(t,i),n.value="",k("Comment added!","success"),await ve(t,!1)}catch(s){x("add comment",s)}finally{eo=!1}return!1}async function Ef(e){var n;const t=(n=C())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,H();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${Y(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,H()}catch(i){x("load labels",i)}}async function xf(e,t){try{await h.addLabelToDocument(e,t),O(),k("Label added!","success"),await ve(e,!1)}catch(n){x("add label",n)}}async function If(e,t){try{await h.removeLabelFromDocument(e,t),k("Label removed!","success"),await ve(e,!1)}catch(n){x("remove label",n)}}te({"view-document":(e,t)=>{e.preventDefault(),ve(t.documentId)},"set-doc-editor-mode":(e,t)=>{pf(t.target,t.mode)},"retry-load-documents":()=>{Ht(us)},"retry-document-comments":(e,t)=>{ve(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{af(t.docId)},"clear-doc-search":()=>{Wm()},"clear-doc-project-filter":()=>{Km()},"clear-all-doc-filters":()=>{Ym()},"show-bulk-move-modal":()=>{rf()},"bulk-delete-documents":()=>{cf()},"select-all-docs":()=>{of()},"clear-doc-selection":()=>{sc()},"exit-selection-mode":()=>{Ya()},"enter-selection-mode":()=>{tc()},"handle-bulk-move":e=>{lf(e)},"unlink-document-issue":(e,t)=>{kf(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{bf(t.documentId)},"add-document-comment":(e,t)=>{$f(e,t.documentId)},"remove-label-from-doc":(e,t)=>{If(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Ef(t.documentId)},"show-edit-document-modal":(e,t)=>{oc(t.documentId)},"delete-document":(e,t)=>{hf(t.documentId)},"create-document":e=>{ff(e)},"update-doc-sprint-dropdown":(e,t,n)=>{vf(t.sprintSelect,n.value)},"update-document":(e,t)=>{gf(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{yf(n.value,t.documentId)},"link-to-issue":(e,t)=>{wf(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{xf(t.documentId,t.labelId)}});let yn=[],fs={},gs=new Set,mt=null,to=null,hs=[],ai=[],no=[];function rc(){return fs}function _f(){return to}function Tf(){return mt}Je(e=>{e==="currentProject"&&S()==="sprints"&&wn()});let io=0;async function wn(){Zr(-1);const e=z();if(!e){const i=document.getElementById("sprints-list");i&&(i.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++io;Uf();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await h.getCurrentSprint(e);const i=await h.getSprints(e);if(t!==io)return;yn=i,Sf(),await vs()}catch(i){if(t!==io)return;n&&(n.innerHTML=N({icon:R.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),x("load sprints",i)}}function Sf(){const e=document.getElementById("sprints-list");if(!e)return;const t=yn.find(a=>a.status==="active"),n=yn.find(a=>a.status==="planned"),i=yn.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${p(t.id)}" data-sprint-url="/sprint/${p(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${f(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(t.id)}" data-sprint-name="${p(t.name)}" data-budget="${t.budget||""}" data-project-id="${p(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${p(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,s+=Lf(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${p(n.id)}" data-sprint-url="/sprint/${p(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${f(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(n.id)}" data-sprint-name="${p(n.name)}" data-budget="${n.budget||""}" data-project-id="${p(n.project_id)}">Edit Sprint</button>
                </div>
            </div>
        `}i.length>0&&(s+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${i.length})</summary>
                <div class="sprint-history-list">
                    ${i.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${p(a.id)}" data-sprint-url="/sprint/${p(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${f(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||N({icon:R.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Lf(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const i=e.budget,s=e.points_spent||0,a=Math.max(i-s,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((U,X,ye)=>Math.min(Math.max(U,X),ye))((new Date-o)/(r-o),0,1),u=360,m=120,v=16,b=v,w=u-v,I=v,_=m-v,D=U=>i===0?_:I+(1-U/i)*(_-I),B=D(i),E=D(0),M=b+(w-b)*d,T=D(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${ys(e.start_date)} → ${ys(e.end_date)}</span>
                    <span>${a} of ${i} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${u} ${m}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${B}" x2="${w}" y2="${E}" class="burndown-ideal" />
                <line x1="${b}" y1="${B}" x2="${M}" y2="${T}" class="burndown-actual" />
                <circle cx="${M}" cy="${T}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}let so=0;async function kn(e,t=!0){var n;try{t&&Ft();const i=++so,s=S(),a=await h.getSprint(e);if(i!==so)return;if(!a){k("Sprint not found","error"),j("sprints");return}to=a;const o=(n=C())==null?void 0:n.id,[r,c,l]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?h.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==so)return;hs=r,no=c,ai=l,S()===s&&Qt(hs),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Af()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),j("sprints")}}async function Cf(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),j("sprints",!1);return}try{await kn(e,!1)}catch{j("sprints",!1)}}function Af(){const e=to,t=hs;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=S()||"sprints",s=t.filter(d=>Jt.includes(d.status)),a=t.filter(d=>d.status==="done"),o=t.reduce((d,u)=>d+(u.estimate||0),0),r=a.reduce((d,u)=>d+(u.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const l=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${p(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${f(e.name)}</h2>
                ${c}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${ys(e.start_date)} → ${ys(e.end_date)}
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
                <h3>Open Issues (${s.length})</h3>
                ${s.length===0?N({icon:R.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(d=>lc(d)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?N({icon:R.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(d=>lc(d)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Df()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${ai.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${ai.length>0?`
                    <div class="sprint-issues-list">
                        ${ai.map(d=>Bf(d)).join("")}
                    </div>
                `:N({icon:R.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function lc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=il.includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${Vf(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Bf(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Oe(e.created_at)}</span>
            </span>
        </div>
    `}function Df(){const e=no;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${f(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${f(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${Mf(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Mf(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function jf(e,t,n,i){const s=i?gg(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${p(e)}" data-project-id="${p(i)}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${p(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${s?`<small class="form-hint">${f(s)}</small>`:""}
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
    `,H()}async function Rf(e,t,n){var r,c,l;e.preventDefault();const i=(c=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:c.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((l=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:l.value)||"this";try{const d={budget:a};if(i&&(d.name=i),await h.updateSprint(t,d),o==="planned"||o==="default"){const m=yn.filter(v=>v.status==="planned"&&v.id!==t);for(const v of m)await h.updateSprint(v.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await wn(),O(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(d){x("update budget",d)}return!1}async function Pf(e){const t=yn.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,H();const n=Jt;let i=0,s=!1,a=!1;try{const[c,l]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=c.filter(d=>n.includes(d.status)).length,s=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${f(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${p(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function Nf(e){try{const t=await h.closeSprint(e);await wn(),uc(),t.limbo?Of(t):k("Sprint completed!","success")}catch(t){x("complete sprint",t)}}async function vs(){const e=z();if(e)try{mt=await h.getLimboStatus(e),qf()}catch(t){console.error("Failed to load limbo status:",t)}}function qf(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!mt||!mt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${mt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Of(e){const t=z();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${f(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,H(),Hf(t)}async function Hf(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${f(i.name)} <span class="ritual-mode">(${f(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${We(i.prompt)}</div>
                    ${oo(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function ao(){var t,n;if(!mt)return;const e=z();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${mt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${f(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${We(i.prompt)}</div>
                        ${oo(i.attestation)}
                        ${Ff(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=mt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${mt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(i.name)}</div>
                            ${oo(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,H()}function oo(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${f(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${f(Oe(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${We(e.note)}</div>
        </div>
    `}function Ff(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function cc(e){for(const t of e)if(!gs.has(t))try{(await h.getSprints(t)).forEach(i=>{fs[i.id]=i}),gs.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Uf(){fs={},gs=new Set,hs=[],no=[],ai=[],bs={}}function Gf(e,t){t.forEach(n=>{fs[n.id]=n}),gs.add(e)}let bs={};function zf(e){return bs[e]}function dc(e,t){bs[e]=t??null}function uc(){bs={}}te({"retry-load-sprints":()=>wn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}kn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;jf(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{ao()},"show-close-sprint-confirmation":(e,t)=>{Pf(t.sprintId)},"handle-update-budget":(e,t)=>{Rf(e,t.sprintId,t.projectId)},"close-modal":()=>{O()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,O(),Nf(t.sprintId)},"dismiss-limbo-modal":()=>{O(),vs()},"approve-ritual":(e,t)=>{Zf(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{mc(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}W(t.issueId)},"create-sprint-document":async(e,t)=>{await mf(t.sprintId,t.projectId,()=>{kn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}ve(t.documentId)}});function ys(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Vf(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}Je(e=>{e==="currentProject"&&S()==="rituals"&&ro()});let pc=0;async function ro(){const e=z(),t=document.getElementById("rituals-content"),n=++pc;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=N({icon:R.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}$g(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await ri();n===pc&&!i&&t&&(t.innerHTML=N({icon:R.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Wf(){kc(Kf),ro()}function Kf(){const e=document.getElementById("rituals-content"),t=Eg(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,xn("rv-sprint-rituals-list",n,"sprint"),xn("rv-close-rituals-list",i,"close"),xn("rv-claim-rituals-list",s,"claim")}function Yf(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Zf(e,t){try{await h.approveAttestation(e,t),k("Ritual approved!","success"),await vs(),ao()}catch(n){x("approve ritual",n)}}async function mc(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",i=>{Xf(i,e,t)}),H()}async function Xf(e,t,n){e.preventDefault();const i=document.getElementById("gate-note").value;try{await h.completeGateRitual(t,n,i||null),k("Ritual completed!","success"),await vs();const s=Tf();s&&!s.in_limbo?(O(),k("Limbo cleared! Next sprint is now active.","success")):ao()}catch(s){x("complete gate ritual",s)}return!1}function Qf(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function Jf(e,t,n,i){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${f(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",s=>{eg(s,e,t)}),H()}async function eg(e,t,n){e.preventDefault();const i=document.getElementById("attest-ritual-note").value.trim();if(!i)return k("A note is required for this attestation.","error"),!1;try{await h.attestTicketRitual(t,n,i),k("Ritual attested!","success"),O(),await ls(n)}catch(s){x("attest ticket ritual",s)}return!1}async function tg(e,t){try{await h.attestTicketRitual(e,t),k("Ritual attested!","success"),await ls(t)}catch(n){x("attest ticket ritual",n)}}async function ng(e,t){try{await h.approveTicketRitual(e,t),k("Ritual approved!","success"),await ls(t)}catch(n){x("approve ticket ritual",n)}}function ig(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",i=>{sg(i,e,t)}),H()}async function sg(e,t,n){e.preventDefault();const i=document.getElementById("ticket-ritual-note").value;try{await h.completeTicketGateRitual(t,n,i||null),k("Ritual completed!","success"),O(),await ls(n)}catch(s){x("complete ticket ritual",s)}return!1}te({"show-create-ritual-modal":(e,t)=>{_c(t.trigger)},"approve-ticket-ritual":(e,t)=>{ng(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{ig(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{Jf(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{tg(t.ritualId,t.issueId)},"retry-load-rituals":()=>ro()});function We(e){if(!e)return"";try{F.setOptions({breaks:!0,gfm:!0});const n=F.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return jr.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ws(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function ag(e,t,n,i,s,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(s)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${f(o)}</strong>${r?` ${ws(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",l=>{og(l,e,t,n)}),H(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function og(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),O(),ft()}catch(a){x("complete gate ritual",a)}}function rg(e,t,n,i,s,a,o,r){ag(e,t,n,i,s,a,o,r)}function lg(e,t,n,i,s,a,o,r,c){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(s)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${ws(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${We(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{cg(d,e,t,n)}),H(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function cg(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await h.approveTicketRitual(t,n),s)try{await h.createComment(n,s)}catch(r){console.error("Failed to post approval comment:",r)}k(`Review ritual "${i}" approved!`,"success"),O(),ft()}catch(r){x("approve review ritual",r)}}function dg(e,t,n,i,s,a,o,r,c){lg(e,t,n,i,s,a,o,r,c)}Je(e=>{e==="currentProject"&&S()==="approvals"&&ft()});let lo=[],co=0;async function ft(){if(!C())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++co;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=z(),i=n?ne().filter(r=>r.id===n):ne(),s=await Promise.all(i.map(async r=>{const[c,l]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:c,limbo:l}}));if(t!==co)return;const a=[],o=[];for(const{project:r,approvals:c,limbo:l}of s)if(a.push(...c),l&&l.in_limbo){const d=(l.pending_rituals||[]).filter(u=>{var m;return(m=u.attestation)!=null&&m.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}pp(a),lo=o,fc()}catch(n){if(t!==co)return;e.innerHTML=N({icon:R.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),x("load approvals",n)}}function fc(){const e=document.getElementById("approvals-list");if(!e)return;const t=up(),n=lo.length>0,i=!Zu();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${R.issues}</div>
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
            `:e.innerHTML=N({icon:R.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${lo.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${f(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(m=>{const v=m.attestation&&!m.attestation.approved_at,b=v?"⏳":"○",w=v?`<span class="gate-waiting-info">Attested by <strong>${f(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',I=v?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(m.id)}"
                                            data-project-id="${p(d.id)}">Approve</button>`:m.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(m.id)}"
                                                data-project-id="${p(d.id)}"
                                                data-ritual-name="${p(m.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${f(m.name)}
                                                    <span class="badge badge-ritual-${p(m.approval_mode)}">${f(m.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${f(m.prompt)}</span>
                                                ${w}
                                            </div>
                                            ${I}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=d=>d.pending_approvals||[],o=d=>u=>{const m=a(u).filter(d);return m.length>0?{...u,_filteredApprovals:m}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(uo).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map(uo).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${l.map(uo).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;rg(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var v;d.disabled=!0;const u=(v=d.closest(".gate-ritual-actions"))==null?void 0:v.querySelector(".review-approve-btn");u&&(u.disabled=!0);const m=d.dataset;try{await h.approveTicketRitual(m.ritualId,m.issueId),k(`Review ritual "${m.ritualName}" approved!`,"success"),await ft()}catch(b){d.disabled=!1,u&&(u.disabled=!1),x("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;dg(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),k("Sprint ritual approved!","success"),await ft()}catch(u){d.disabled=!1,x("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{mc(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName)})})}function ug(){Xu(),fc()}function uo(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(i.requested_by_name)}</strong>${i.requested_at?` (${ws(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${We(i.attestation_note)}</div>`:"",c=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',l=s?`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${p(i.ritual_id)}"
                        data-issue-id="${p(e.issue_id)}"
                        data-ritual-name="${p(i.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${p(i.ritual_id)}"
                        data-issue-id="${p(e.issue_id)}"
                        data-ritual-name="${p(i.ritual_name)}"
                        data-ritual-prompt="${p(i.ritual_prompt)}"
                        data-issue-identifier="${p(e.identifier)}"
                        data-issue-title="${p(e.title)}"
                        data-requested-by="${p(i.requested_by_name||"")}"
                        data-requested-at="${p(i.requested_at||"")}"
                        data-attestation-note="${p(i.attestation_note||"")}">Comment &amp; Approve</button>
                </div>`:`<button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${p(i.ritual_id)}"
                    data-issue-id="${p(e.issue_id)}"
                    data-ritual-name="${p(i.ritual_name)}"
                    data-ritual-prompt="${p(i.ritual_prompt)}"
                    data-issue-identifier="${p(e.identifier)}"
                    data-issue-title="${p(e.title)}"
                    data-requested-by="${p(i.requested_by_name||"")}"
                    data-requested-at="${p(i.requested_at||"")}">Complete</button>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${f(i.ritual_name)} ${c}</span>
                    <span class="gate-ritual-prompt">${f(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                ${l}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.issue_id)}" class="gate-issue-link">
                    <span class="gate-issue-id">${f(e.identifier)}</span>
                    <span class="gate-issue-title">${f(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${f(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}te({"view-issue-from-modal":(e,t)=>{e.preventDefault(),O(),W(t.issueId)},"dismiss-approvals-explainer":()=>{ug()},"retry-load-approvals":()=>ft()});const ks={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},$s={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let gc=0;function hc(e){gc=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=vc(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function vc(e="",t="",n=""){const i=gc++,s=Object.keys(ks).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?ks[e]:ks.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${$s[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${i}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${i}">
                <option value="">Select field...</option>
                ${s}
            </select>
            <select class="condition-operator" id="condition-operator-${i}" data-action="toggle-value-input" data-row-id="${i}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${i}" value="${p(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${i}">&times;</button>
        </div>
    `}function pg(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",vc()),Es()}function mg(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Es()}function fg(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=ks[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${$s[o]}</option>`).join(""),bc(e),Es()}function bc(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function oi(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Es(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function yc(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,c=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,l=o.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw oi("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw oi("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${c}`;if(n.has(u))throw oi(`Duplicate condition: ${r} ${$s[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),c==="isnull")t[u]=!0;else if(c==="in"||c==="contains")t[u]=d?d.split(",").map(m=>m.trim()).filter(m=>m):[];else if(c==="gte"||c==="lte"){if(!d)throw oi(`Please enter a numeric value for ${r} ${$s[c]}.`),new Error(`Missing numeric value for ${u}`);const m=parseInt(d,10);if(isNaN(m))throw oi(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=m}else t[u]=d}return Es(),Object.keys(t).length>0?t:null}te({"add-condition-row":()=>{pg()},"remove-condition-row":(e,t)=>{mg(Number(t.rowId))},"update-operator-options":(e,t)=>{fg(Number(t.rowId))},"toggle-value-input":(e,t)=>{bc(Number(t.rowId))}});let pe=[],po=null;const wc=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];Je((e,t)=>{e==="currentProject"&&(t&&qu(t),wc.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Dg(t||""))});const xs={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function kc(e){po=e}function ne(){return pe}function $n(e){const t=pe.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return xs[n]||xs.fibonacci}function Is(e,t){if(!e)return"No estimate";const i=$n(t).find(s=>s.value===e);return i?i.label:`${e} points`}function mo(e,t){return e?!$n(t).some(i=>i.value===e):!1}function gg(e){const t=pe.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(xs[n]||xs.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function He(){if(C())try{pe=await h.getProjects(C().id),hg();const e=z();if(e&&pe.some(i=>i.id===e))return;const t=fo();if(t&&pe.some(i=>i.id===t)){ze(t);return}const n=Rr();if(n&&pe.some(i=>i.id===n)){ze(n);return}pe.length>0&&ze(pe[0].id)}catch(e){x("load projects",e)}}function hg(){const e='<option value="">All Projects</option>'+pe.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+pe.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=z();wc.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function $c(){return Rr()}function En(){const e=document.getElementById("projects-list");if(pe.length===0){e.innerHTML=N({icon:R.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=pe.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${Y(t.color)}20; color: ${Y(t.color)}">
                    ${f(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${f(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${p(t.id)}" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${f(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function vg(e){ze(e),j("issues")}function Ec(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function bg(e){e.preventDefault();const t=C();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await He(),En(),O(),k("Project created!","success")}catch(i){x("create project",i)}return!1}async function yg(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await He(),En(),O(),k("Project updated!","success")}catch(i){x("update project",i)}return!1}async function wg(e){const t=pe.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await He(),En(),O(),k("Project deleted","success")}catch(n){x("delete project",n)}}let Ae=null;async function xc(e){Ae=e,pe.length===0&&await He();const t=pe.find(n=>n.id===e);if(!t){k("Project not found","error"),j("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Ic("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Ic(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!gt||gt.length===0)&&ri()}function kg(){Ae=null,gt=[]}function $g(e){Ae=e}function Eg(){return gt}async function xg(){if(!Ae)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Ae,t),await He(),k("Settings saved","success");const n=pe.find(i=>i.id===Ae);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){x("save project settings",n)}}async function Ig(){if(!Ae)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await h.updateProject(Ae,n),await He(),k("Settings saved","success")}catch(i){x("save settings",i)}}let gt=[];async function ri(){if(!Ae)return!1;try{return gt=await h.getRituals(Ae),_g(),typeof po=="function"&&po(),!0}catch(e){return x("load rituals",e),!1}}function _g(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=gt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=gt.filter(i=>i.trigger==="ticket_close"),n=gt.filter(i=>i.trigger==="ticket_claim");xn("ps-sprint-rituals-list",e,"sprint"),xn("ps-close-rituals-list",t,"close"),xn("ps-claim-rituals-list",n,"claim")}function xn(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${f(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${We(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${f(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${p(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${p(a.id)}" data-ritual-name="${p(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function _c(e){if(!Ae)return;let t=[];try{t=await h.getRitualGroups(Ae)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${p(n.id)}" data-mode="${p(n.selection_mode)}">${f(n.name)} (${f(n.selection_mode)})</option>`).join("")}
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
        ${hc(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,H()}function Tg(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Sg(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Tc(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Ae,{name:t,selection_mode:n})).id}return e.value||null}async function Lg(e){e.preventDefault();let t;try{t=yc()}catch{return!1}let n;try{n=await Tc()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){i.group_id=n;const s=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&s.value&&(i.weight=parseFloat(s.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(i.percentage=parseFloat(a.value))}try{await h.createRitual(Ae,i),await ri(),O(),k("Ritual created!","success")}catch(s){x("create ritual",s)}return!1}async function Cg(e){const t=gt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Ae)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${p(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${p(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${f(t.prompt)}</textarea>
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
          ${n.map(o=>`<option value="${p(o.id)}" data-mode="${p(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${f(o.name)} (${f(o.selection_mode)})</option>`).join("")}
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
        ${hc(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,H()}async function Ag(e,t){e.preventDefault();let n;try{n=yc()}catch{return!1}let i;try{i=await Tc()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:i||""};if(i){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(s.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(s.percentage=parseFloat(o.value))}try{await h.updateRitual(t,s),await ri(),O(),k("Ritual updated!","success")}catch(a){x("update ritual",a)}return!1}async function Bg(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await ri(),k("Ritual deleted","success")}catch(n){x("delete ritual",n)}}te({"view-project":(e,t)=>{vg(t.projectId)},"view-project-settings":(e,t)=>{xc(t.projectId)},"create-project":e=>{bg(e)},"update-project":(e,t)=>{yg(e,t.projectId)},"confirm-delete-project":(e,t)=>{wg(t.projectId)},"edit-project-ritual":(e,t)=>{Cg(t.ritualId)},"delete-project-ritual":(e,t)=>{Bg(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Lg(e)},"update-project-ritual":(e,t)=>{Ag(e,t.ritualId)},"toggle-ritual-conditions":()=>{Tg()},"ritual-group-change":()=>{Sg()}});function fo(){const t=new URLSearchParams(window.location.search).get("project");return t||$c()}function Dg(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const go={},Sc=new Map;let ho=null,vo=null,bo=null,yo=null,wo=null,ko=null,Lc=!1;function Mg(e){Object.assign(go,e)}function jg({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a}={}){e&&(ho=e),t&&(vo=t),n&&(bo=n),i&&(yo=i),s&&(wo=s),a&&(ko=a)}function Rg(){return Object.keys(go)}const Pg=["issues","board","sprints","epics","documents","rituals","approvals","my-issues"];function j(e,t=!0){if(t&&Ft(),sp(e),t){let s;const a=fo();e==="my-issues"?s=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?s=`/issues${window.location.search}`:Pg.includes(e)&&a?s=`/${e}?project=${a}`:s=`/${e}`,history.pushState({view:e},"",s)}document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.view===e)}),ho&&ho();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const s=document.getElementById(`${e}-view`);s&&s.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const i=go[e];i&&i(),t&&window.scrollTo(0,0)}function Cc(){var i;const t=window.location.pathname.split("/").filter(Boolean);yo&&yo();let n="my-issues";if(t.length===0||t[0]==="")j("my-issues",!1);else{if(vo&&vo(t))return;{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),Rg().includes(n)?j(n,!1):(n="my-issues",j("my-issues",!1))}}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function Ft(){Sc.set(window.location.href,window.scrollY)}function Ac(e){Ft(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),wo&&wo(e)}function Bc(e){Ft(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),ko&&ko(e)}function Dc(){const e=Sc.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function Ng(){Lc||(Lc=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&bo&&bo(e.state)){Dc();return}(t=e.state)!=null&&t.view?j(e.state.view,!1):Cc(),Dc()}))}let li=[];function _s(){return li}function qg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Og(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?qg(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Hg(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{li=await h.getTeamAgents(e),zi(Gt,_s),Wi()}catch(n){console.error("Failed to load team agents:",n),x("load team agents",n)}}async function $o(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{li=await h.getTeamAgents(e),zi(Gt,_s),Wi(),Fg()}catch(n){x("load agents",n)}}function Fg(){const e=document.getElementById("agents-list");if(e){if(li.length===0){e.innerHTML=N({icon:R.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=li.map(t=>{const n=f(t.name),i=f(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Og(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${i} ${ga(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function Ug(){const e=ne();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),H()}function Mc(e,t){const n=f(t);document.getElementById("modal-title").textContent=e,document.getElementById("modal-content").innerHTML=`
    <div class="api-key-created">
      <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
      <div class="api-key-display">
        <code id="new-agent-key">${n}</code>
        <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
      </div>
      <div class="api-key-instructions">
        <p>Configure the CLI to use this agent:</p>
        <code>chaotic auth set-key ${n}</code>
      </div>
      <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
    </div>
  `,H()}async function Gg(e){var o,r,c;e.preventDefault();const t=(o=C())==null?void 0:o.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;s&&a?l=await h.createProjectAgent(a,n,i):l=await h.createTeamAgent(t,n,i),O(),Mc("Agent Created",l.api_key)}catch(l){x("create agent",l)}return!1}async function zg(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);Mc("New Agent Key",n.key)}catch(n){x("generate agent key",n)}}function Vg(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function Wg(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),k("Agent deleted","success"),$o()}catch(n){x("delete agent",n)}}te({"create-agent":e=>{Gg(e)},"copy-agent-key":()=>{Vg()},"dismiss-agent-modal":()=>{O(),$o()},"delete-agent":(e,t)=>{Wg(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{zg(t.agentId,t.agentName)}});let Lt=0,ci=null,Ts=0;const Ut=new Map;function Eo(){const e=document.getElementById("ws-status-badge");e&&e.classList.toggle("hidden",Lt===0)}function Fe(e,t){return Ut.has(e)||Ut.set(e,new Set),Ut.get(e).add(t),()=>{var n;return(n=Ut.get(e))==null?void 0:n.delete(t)}}function Kg(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function jc(e,{isReconnect:t=!1}={}){ci&&(clearTimeout(ci),ci=null);const n=gp();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Jr(null)),!t&&Lt>0&&(Lt=0,Eo());const i=h.getToken();if(!i)return;const s=++Ts,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(i)}&team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o);Jr(r),r.onopen=()=>{if(s!==Ts)return;console.log("WebSocket connected");const c=Lt>0;c&&k("Live updates reconnected","success"),Lt=0,Eo(),c&&Rc({type:"reconnected",entity:"connection",data:{}})},r.onmessage=c=>{if(s!==Ts)return;let l;try{l=JSON.parse(c.data)}catch(d){console.error("WebSocket: malformed message",d);return}Rc(l)},r.onclose=()=>{if(s!==Ts)return;console.log("WebSocket disconnected"),Lt++,Lt===1&&k("Live updates disconnected. Reconnecting...","warning"),Eo();const c=Kg(Lt-1);ci=setTimeout(()=>{ci=null,C()&&C().id===e&&jc(e,{isReconnect:!0})},c)},r.onerror=c=>{console.error("WebSocket error:",c)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function Rc(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Ut.get(`${n}:${t}`);if(a)for(const c of a)try{c(i,s)}catch(l){console.error(`WebSocket handler error (${n}:${t}):`,l)}const o=Ut.get(n);if(o)for(const c of o)try{c(i,s)}catch(l){console.error(`WebSocket handler error (${n}):`,l)}const r=Ut.get("*");if(r)for(const c of r)try{c(i,s)}catch(l){console.error("WebSocket handler error (*):",l)}}const Yg={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested"};let xo=0,In=!1;async function Ss(){const e=C();if(e){try{const t=await h.getInboxUnreadCount(e.id);ya(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Io()}}function Io(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Qr();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0)}async function di(){const e=C();if(!e)return;const t=document.getElementById("inbox-list");if(!t)return;const n=++xo;t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const i=await h.getInbox(e.id,{unread:In,limit:100});if(n!==xo)return;ba(i||[]),Pc()}catch(i){if(n!==xo)return;t.innerHTML=N({icon:R.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),x("load inbox",i)}Ss()}function Zg(){In=!In;const e=document.getElementById("inbox-unread-toggle");e&&e.classList.toggle("active",In),di()}function Xg(e){const t=!e.read_at,n=Yg[e.kind]||e.kind,i=e.issue_identifier||e.document_title||"",s=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" ");return`
        <div class="inbox-row list-item${t?" inbox-row-unread":""}"
             data-action="open-inbox-entry" ${s} role="button" tabindex="0">
            <div class="inbox-row-main">
                <div class="inbox-row-header">
                    <span class="badge badge-inbox-${p(e.kind)}">${f(n)}</span>
                    ${i?`<span class="inbox-row-source">${f(i)}</span>`:""}
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':""}
                </div>
                <div class="inbox-row-title">${f(e.title)}</div>
                ${e.body?`<div class="inbox-row-body">${f(e.body)}</div>`:""}
            </div>
            <div class="inbox-row-meta">${f(ws(e.created_at))}</div>
        </div>
    `}function Pc(){const e=document.getElementById("inbox-list");if(!e)return;const t=va();if(t.length===0){e.innerHTML=N({icon:R.inbox,heading:In?"No unread items":"Inbox zero",description:In?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=t.map(n=>Xg(n)).join("")}async function Qg(e){const t=va(),n=t.find(i=>i.id===e);if(!(!n||n.read_at))try{await h.markInboxRead(e),n.read_at=new Date().toISOString(),ba([...t]),ya(Math.max(0,Qr()-1)),Io();const i=document.querySelector(`.inbox-row[data-entry-id="${e}"]`);i&&i.classList.remove("inbox-row-unread")}catch(i){console.error("Failed to mark inbox entry read:",i)}}async function Jg(){const e=C();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();ba(va().map(n=>({...n,read_at:n.read_at||t}))),ya(0),Io(),Pc()}catch(t){x("mark all inbox entries read",t)}}function Nc(e){e.entryId&&Qg(e.entryId),e.issueId?W(e.issueId):e.documentId&&ve(e.documentId)}function eh(e){if(!e)return;const{entryId:t,issueId:n,documentId:i}=e.dataset;Nc({entryId:t,issueId:n,documentId:i})}te({"open-inbox-entry":(e,t)=>{e.preventDefault(),Nc(t)},"toggle-inbox-unread-filter":()=>Zg(),"mark-all-inbox-read":()=>Jg(),"retry-load-inbox":()=>di()});let Ls=[],_n=[],_o=[],To=[];function th(){return Ls}function Gt(){return _n}async function So(){try{Ls=await h.getMyTeams(),nh()}catch(e){x("load teams",e)}}function nh(){const e=document.getElementById("team-list");Ls.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ls.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${f(t.name)}</button>
        `).join("")}async function Lo(e,t=!1){wa(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),jc(e.id),await Promise.all([He(),fh(),sh(),Hg(),Ss()]),t?Cc():j(S())}function qc(){document.getElementById("team-dropdown").classList.toggle("hidden")}function ih(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function sh(){if(C())try{_n=await h.getTeamMembers(C().id),zi(Gt,_s),Wi()}catch(e){console.error("Failed to load team members:",e),x("load team members",e)}}function Co(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Ao=0;async function Bo(){if(!C())return;const e=++Ao,t=document.getElementById("team-members-list");t&&(t.innerHTML=Co());try{const n=await h.getTeamMembers(C().id);if(e!==Ao)return;_n=n,zi(Gt,_s),Wi(),ah()}catch(n){if(e!==Ao)return;t&&(t.innerHTML=N({icon:R.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),_n=[],Oc(),x("load team members",n)}}function Do(){var n;const e=(n=Pt())==null?void 0:n.id,t=_n.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function Oc(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!Do())}function ah(){const e=document.getElementById("team-members-list"),t=Do();Oc(),e.innerHTML=_n.map(n=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(n.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${f(n.user_name||"Unknown")}</span>
                    <span class="member-email">${f(n.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${n.role}</span>
                ${t&&n.user_id!==Pt().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let Mo=0;async function Cs(){if(!C())return;const e=++Mo,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=Co());try{const n=await h.getTeamInvitations(C().id);if(e!==Mo)return;_o=n,oh()}catch(n){if(e!==Mo)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function oh(){const e=document.getElementById("team-invitations-list");if(_o.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=Do();e.innerHTML=_o.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${f(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${f(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${p(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let jo=0;async function Hc(){if(!C())return;const e=++jo,t=document.getElementById("team-agents-list");t&&(t.innerHTML=Co());try{const n=await h.getTeamAgents(C().id);if(e!==jo)return;To=n,rh()}catch(n){if(e!==jo)return;t&&(t.innerHTML=N({icon:R.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),x("load team agents",n)}}function rh(){const e=document.getElementById("team-agents-list");if(e){if(To.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=To.map(t=>{const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${f(s)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${i} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function Fc(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function lh(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await h.createInvitation(C().id,t,n),await Cs(),O(),k("Invitation sent!","success")}catch(i){x("send invitation",i)}return!1}async function ch(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(C().id,e),await Bo(),k("Member removed!","success")}catch(t){x("remove member",t)}}async function dh(e){try{await h.deleteInvitation(C().id,e),await Cs(),k("Invitation canceled!","success")}catch(t){x("cancel invitation",t)}}function Uc(){qc(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,H()}function uh(){C()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${p(C().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${p(C().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${f(C().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,H())}async function ph(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await So(),await Lo(n),O(),k("Team created!","success")}catch(n){x("create team",n)}return!1}async function mh(e){if(e.preventDefault(),!C())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(C().id,t);wa(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await So(),O(),k("Team updated!","success")}catch(n){x("update team",n)}return!1}async function fh(){if(C())try{const e=await h.getLabels(C().id);Fi(e)}catch(e){console.error("Failed to load labels:",e),x("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),te({"select-team":(e,t)=>{Lo(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{ch(t.userId)},"delete-invitation":(e,t)=>{dh(t.invitationId)},"retry-load-team-invitations":()=>{Cs()},"retry-load-team-members":()=>{Bo()},"retry-load-team-agents":()=>{Hc()},"invite-member":e=>{lh(e)},"create-team":e=>{ph(e)},"update-team":e=>{mh(e)}});let it=null,ht=0,Tn=null,Sn=null,ui=null,Ro=!1;function gh(){return Ou()}function Gc(){Hu()}function zc(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function hh(){it||(it=document.createElement("div"),it.id="onboarding-overlay",it.className="onboarding-overlay",document.getElementById("app").appendChild(it))}function pi(){if(!it)return;const e=Ro?Wc():Vc(),t=e[ht],n=e.map((i,s)=>`<span class="onboarding-dot${s===ht?" active":""}${s<ht?" completed":""}"></span>`).join("");it.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Vc(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=zc(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=zc(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Tn&&(e.textContent=`${Tn.name} (${Tn.key})`),t&&Sn&&(t.textContent=`${Sn.name} (${Sn.key})`),n&&ui&&(n.textContent=`${ui.identifier} - ${ui.title}`)}}]}function Wc(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Po(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function No(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ln(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function vh(){const e=Ro?Wc():Vc();ht<e.length-1&&(ht++,pi())}function bh(){Gc(),Yc(),mi()}function yh(){Gc(),Yc(),mi()}async function wh(e){e.preventDefault(),No("onboarding-team-error"),Ln("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Tn=await h.createTeam({name:t,key:n}),ht++,pi()}catch(i){Po("onboarding-team-error",i.message||"Failed to create team"),Ln("onboarding-team-submit",!1)}}async function kh(e){e.preventDefault(),No("onboarding-project-error"),Ln("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Sn=await h.createProject(Tn.id,{name:t,key:n}),ht++,pi()}catch(i){Po("onboarding-project-error",i.message||"Failed to create project"),Ln("onboarding-project-submit",!1)}}async function $h(e){e.preventDefault(),No("onboarding-issue-error"),Ln("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{ui=await h.createIssue(Sn.id,{title:t}),ht++,pi()}catch(n){Po("onboarding-issue-error",n.message||"Failed to create issue"),Ln("onboarding-issue-submit",!1)}}function Kc(e=!1){Ro=e,ht=0,Tn=null,Sn=null,ui=null,hh(),pi()}function Yc(){it&&(it.remove(),it=null)}function Zc(){Fu(),Kc(!0)}te({"onboarding-next":e=>{e.preventDefault(),vh()},"onboarding-skip":e=>{e.preventDefault(),bh()},"onboarding-finish":e=>{e.preventDefault(),yh()},"onboarding-create-team":e=>{wh(e)},"onboarding-create-project":e=>{kh(e)},"onboarding-create-issue":e=>{$h(e)}});async function mi(){Eh(),Lh(),await So();const e=th();if(e.length===0&&!gh()){Kc();return}e.length>0&&await Lo(e[0],!0)}let Cn=null,fi=null,Ke=null,Ye=null;function gi(){Cn||(Cn=document.getElementById("auth-screen"),fi=document.getElementById("main-screen"),Ke=document.getElementById("login-form"),Ye=document.getElementById("signup-form"))}function As(){gi(),Cn&&Cn.classList.remove("hidden"),fi&&fi.classList.add("hidden")}function Eh(){gi(),Cn&&Cn.classList.add("hidden"),fi&&fi.classList.remove("hidden")}function xh(){gi(),Ke&&Ke.classList.remove("hidden"),Ye&&Ye.classList.add("hidden")}function Ih(){gi(),Ke&&Ke.classList.add("hidden"),Ye&&Ye.classList.remove("hidden")}async function _h(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),Oi(await h.getMe()),await mi(),k("Welcome back!","success")}catch(i){x("log in",i)}return!1}async function Th(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),Oi(await h.getMe()),await mi(),k("Account created successfully!","success")}catch(s){x("sign up",s)}return!1}function Xc(){h.logout(),Oi(null),wa(null),As(),k("Signed out","success")}function Sh(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Lh(){var i;const e=Pt();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Ur(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Sh(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Ch(){gi();const e=Ke==null?void 0:Ke.querySelector("form");e&&e.addEventListener("submit",s=>_h(s));const t=Ye==null?void 0:Ye.querySelector("form");t&&t.addEventListener("submit",s=>Th(s));const n=Ke==null?void 0:Ke.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Ih()});const i=Ye==null?void 0:Ye.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),xh()})}let qo=[];async function Oo(){try{qo=await h.getApiKeys(),Ah()}catch(e){x("load API keys",e)}}function Ah(){const e=document.getElementById("api-keys-list");if(e){if(qo.length===0){e.innerHTML=N({icon:R.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=qo.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${ga(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${ga(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function Bh(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,H()}async function Dh(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);O(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,H()}catch(n){x("create API key",n)}return!1}async function Mh(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function jh(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),k("API key revoked","success"),await Oo()}catch(n){x("revoke API key",n)}}te({"create-api-key":e=>{Dh(e)},"copy-api-key":()=>{Mh()},"dismiss-api-key-modal":()=>{O(),Oo()},"revoke-api-key":(e,t)=>{jh(t.keyId,t.keyName)}});let Bs=!1,vt=0,Ct=[],Ds=[];function Rh(e){Ds=e,Ct=[...e]}function zt(){return Bs}function Ph(){if(Bs)return;Bs=!0,vt=0,Ct=[...Ds];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Ms()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Nh(n.target.value)),t.addEventListener("keydown",Oh),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&qh(Number(i.dataset.commandIndex))}),hi(),requestAnimationFrame(()=>t.focus())}function Ms(){Bs=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Nh(e){const t=e.toLowerCase().trim();t?Ct=Ds.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Ct=[...Ds],vt=0,hi()}function hi(){const e=document.getElementById("command-results");if(!e)return;if(Ct.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Ct.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===vt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function qh(e){vt=e,hi()}function Qc(e){const t=Ct[e];t&&(Ms(),t.action())}function Oh(e){switch(e.key){case"ArrowDown":e.preventDefault(),vt=Math.min(vt+1,Ct.length-1),hi();break;case"ArrowUp":e.preventDefault(),vt=Math.max(vt-1,0),hi();break;case"Enter":e.preventDefault(),Qc(vt);break;case"Escape":e.preventDefault(),Ms();break}}te({"execute-command":(e,t)=>{Qc(Number(t.commandIndex))}});const Hh=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function Fh(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${f(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${f(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function Uh(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${f(e.title)}</h4>
        ${e.shortcuts.map(Fh).join("")}
    </div>`}function Jc(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${Hh.map(Uh).join("")}
        </div>
    `,H()}let js=[];function Gh(){return js}Je(e=>{e==="currentProject"&&S()==="epics"&&At()});let Rs=0;async function At(){var n;Xr(-1);const e=document.getElementById("epics-list");if(!e)return;const t=++Rs;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=C())!=null&&n.id)){js=[],e.innerHTML=N({icon:R.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const i=z();let s;if(i?s=await h.getIssues({project_id:i,issue_type:"epic"}):s=await h.getTeamIssues(C().id,{issue_type:"epic"}),t!==Rs)return;if(!s||s.length===0){js=[],e.innerHTML=N({icon:R.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const a=await Promise.all(s.map(async o=>{let r=[];try{r=await h.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));if(t!==Rs)return;js=a,zh(a,e)}catch(i){if(t!==Rs)return;e.innerHTML=N({icon:R.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),x("load epics",i)}}function zh(e,t){const n=e.map(i=>{const s=i.subIssues?i.subIssues.length:0,a=i.subIssues?i.subIssues.filter(u=>u.status==="done"||u.status==="canceled").length:0,o=s>0?Math.round(a/s*100):0,r=s>0?`${a}/${s}`:"-",c=`status-${(i.status||"backlog").replace(/_/g,"-")}`,l=(i.status||"backlog").replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase()),d=i.estimate!=null?`${i.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${p(i.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${f(i.identifier)}</td>
                <td class="epic-title">${f(i.title)}</td>
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
    `,t._epicClickHandler||(t._epicClickHandler=i=>{const s=i.target.closest(".epic-row");s&&s.dataset.identifier&&Bc(s.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Vh(){const e=z(),t=ne().map(n=>`
        <option value="${p(n.id)}" ${n.id===e?"selected":""}>${f(n.name)}</option>
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
    `,H(),document.getElementById("create-epic-form").addEventListener("submit",Wh),document.getElementById("create-epic-title").focus()}async function Wh(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});O(),k(`Created epic ${s.identifier}`,"success"),At()}catch(s){x("create epic",s)}}async function ed(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){W(t.id,!1);return}await Ho(t.id,!1)}else j("epics",!1)}catch{j("epics",!1)}}async function Ho(e,t=!0){try{t&&Ft();const[n,i,s,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(n.issue_type!=="epic"){W(e,t);return}t&&history.pushState({epicId:e,view:S()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=S()||"epics",c=ne().find(E=>E.id===n.project_id),l=n.assignee_id?en(n.assignee_id):null,d=l?Nt(l):null,u=i.length,m=i.filter(E=>E.status==="done"||E.status==="canceled").length,v=u>0?Math.round(m/u*100):0,b=Gh(),w=b.findIndex(E=>E.id===n.id),I=w>0?b[w-1]:null,_=w>=0&&w<b.length-1?b[w+1]:null,D=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${D?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${I?`data-action="navigate-epic" data-epic-id="${p(I.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${b.length}</span>
                            <button class="issue-nav-btn" ${_?`data-action="navigate-epic" data-epic-id="${p(_.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?f(c.name):"Project"} › ${f(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${f(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${fn(n.description)}
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
                                <span>${m} of ${u} done</span>
                                <span>${v}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${i.length===0?N({icon:R.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):i.map(E=>{const M=E.assignee_id?en(E.assignee_id):null,T=M?Nt(M):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(E.id)}" data-identifier="${p(E.identifier)}">
                                    <span class="sub-issue-status">${Ce(E.status)}</span>
                                    <span class="sub-issue-id">${f(E.identifier)}</span>
                                    <span class="sub-issue-title">${f(E.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(E.status||"backlog").replace(/_/g,"-")}">${_e(E.status)}</span>
                                    ${T?`<span class="sub-issue-assignee">${f(T)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${s.length===0?N({icon:R.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):s.map(E=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Fa(E.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ga(E)}</span>
                                        <span class="activity-actor">by ${f(Ua(E))}</span>
                                        <span class="activity-time">${Oe(E.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(E=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(E.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${f(E.author_name||"User")}</span>
                                            <span class="comment-date">${Oe(E.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${f(E.content||"")}</div>
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
                                ${Ce(n.status)}
                                ${_e(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${nt(n.priority)}
                                ${je(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${d?f(d):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${Is(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(E=>`
                                    <span class="issue-label" style="background: ${Y(E.color)}20; color: ${Y(E.color)}">${f(E.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${f(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const B=o.querySelector(".sub-issues-list");B&&B.addEventListener("click",E=>{const M=E.target.closest(".sub-issue-item");M&&M.dataset.issueId&&W(M.dataset.issueId)})}catch(n){x("load epic",n)}}te({"navigate-epic":(e,t)=>{Ho(t.epicId)}});function Kh(e){let t=!1,n=null;return function(s){var o,r,c;if(s.metaKey||s.ctrlKey||s.altKey)return;if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&s.target.blur();return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(o=e.isDetailViewActive)!=null&&o.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((r=e.isDetailViewActive)!=null&&r.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((c=e.isDetailViewActive)!=null&&c.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function Yh(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function st(e,t,n="#issues-list .issue-row"){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Zh(e){const t="#issues-list .issue-row";function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const c=n(a);if(!c)return;const l=c.dataset.issueId;if(!l||l.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=c.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,l,d)}return function(a){var c,l,d,u;if(e.getCurrentView()!=="issues"||(c=e.isDetailViewActive)!=null&&c.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(l=a.target).closest)!=null&&d.call(l,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),st(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),st(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const m=o[r].dataset.issueId;m&&!m.startsWith("temp-")&&e.viewIssue(m)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const m=o[r].dataset.issueId;m&&!m.startsWith("temp-")&&e.showEditIssueModal(m)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(m=>m.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Xh(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o,r,c;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(c=(r=i.target).closest)!=null&&c.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),st(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),st(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const l=s[a].dataset.documentId;l&&e.viewDocument(l)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const l=s[a].dataset.documentId;l&&e.showEditDocumentModal&&e.showEditDocumentModal(l)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(l=>l.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Qh(e){const t="#inbox-list .inbox-row";return function(i){var o,r;if(e.getCurrentView()!=="inbox"||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(r=(o=i.target).closest)!=null&&r.call(o,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),st(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),st(a-1,e.setSelectedIndex,t);break;case"Enter":a>=0&&s[a]&&(i.preventDefault(),e.openInboxEntry(s[a]));break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Jh(e){const t="#kanban-board .kanban-card";return function(i){var o,r,c;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(c=(r=i.target).closest)!=null&&c.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),st(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),st(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const l=s[a].dataset.id;l&&e.viewIssue(l)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(l=>l.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function ev(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function td(e){const{view:t,selector:n,open:i}=e;return function(a){var c,l,d;if(e.getCurrentView()!==t||(c=e.isDetailViewActive)!=null&&c.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(l=a.target).closest)!=null&&d.call(l,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),st(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),st(r-1,e.setSelectedIndex,n);break;case"Enter":r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(u=>u.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const tv={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let q=null,Bt=0;async function nd(e,t){var a,o;const n=tv[e];if(!n){x("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++Bt;q=null;let s;try{s=await n.fetchList(t)}catch(r){x("load revision history",r);return}if(i===Bt){if(q={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},q.viewVersion!=null)try{const r=await n.fetchOne(t,q.viewVersion);if(i!==Bt)return;q.cache.set(q.viewVersion,r)}catch(r){i===Bt&&x("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),Ps(),H()}}function Ps(){const e=document.getElementById("modal-content");if(!e||!q)return;if(q.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=nv(),n=q.mode==="compare"?sv():iv();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function nv(){const e=q.revisions.map(n=>{const i=q.mode==="view"?n.version===q.viewVersion:n.version===q.compareFromVersion||n.version===q.compareToVersion,s=q.mode==="compare"?n.version===q.compareFromVersion?' <span class="rev-tag">from</span>':n.version===q.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${f(n.author_name||"Unknown")}</span>
          <span class="revision-time">${Oe(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${q.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function iv(){const e=q.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=q.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${f(t.title)}</h3>`:"",i=t[q.adapter.bodyField]||"",s=i?`<div class="markdown-body">${We(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${f(t.author_name||"Unknown")} &middot; ${Oe(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function sv(){const e=q.compareFromVersion,t=q.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=q.cache.get(e),i=q.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[q.adapter.bodyField]||"",a=i[q.adapter.bodyField]||"",o=av(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
      <div class="revision-title-change">
        Title: <span class="diff-del">${f(n.title||"")}</span>
        &rarr; <span class="diff-add">${f(i.title||"")}</span>
      </div>
    `),`
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${e}</strong> &rarr; <strong>v${t}</strong>
      </div>
    </div>
    ${r}
    ${o}
  `}function av(e,t){const n=e.split(`
`),i=t.split(`
`),s=ov(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${f(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${f(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${f(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function ov(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let c=n-1;c>=0;c--)for(let l=i-1;l>=0;l--)e[c]===t[l]?s[c][l]=s[c+1][l+1]+1:s[c][l]=Math.max(s[c+1][l],s[c][l+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(vi(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(vi(a,"del",e[o]),o++):(vi(a,"add",t[r]),r++);for(;o<n;)vi(a,"del",e[o++]);for(;r<i;)vi(a,"add",t[r++]);return a}function vi(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function rv(e){if(!q)return;const t=q.token,n=q;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(q!==n||Bt!==t)return;n.cache.set(e,i)}catch(i){q===n&&Bt===t&&x("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Ps()}function lv(){if(!q)return;const e=q.token,t=q;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{q===t&&Bt===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{q!==t||Bt!==e||(s&&x("load revisions to compare",s),Ps())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Ps()}te({"show-document-revisions":(e,t)=>{nd("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{nd("issue",t.issueId)},"select-revision-version":(e,t)=>{rv(Number(t.version))},"toggle-revision-compare":()=>{lv()},"close-revision-viewer":()=>{q=null,O()}});const cv=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Vt=[],Ns=null,Fo=0;Je(e=>{e==="currentProject"&&S()==="board"&&bi()});async function bi(){Ui(-1);const e=++Fo,t=z();if(!t){const i=document.getElementById("kanban-board");i&&(i.innerHTML=ne().length===0?N({icon:R.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):N({icon:R.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const i=await h.getIssues({project_id:t});if(e!==Fo)return;Vt=i,S()==="board"&&Qt(Vt),yi()}catch(i){if(e!==Fo)return;n&&(n.innerHTML=N({icon:R.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),x("load board",i)}}const Uo=np(()=>bi(),200);function yi(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=cv.map(i=>{const s=Vt.filter(a=>a.status===i.key);return`
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
                    `:s.map(a=>`
                        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${p(a.id)}" data-identifier="${p(a.identifier)}">
                            <div class="kanban-card-title">${f(a.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${a.identifier}</span>
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${je(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),dv(t)}function dv(e){const t=Yr();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Ui(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Ui(i),n[i].classList.add("keyboard-selected")}function uv(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Ns=t.dataset.id,t.classList.add("dragging")}function pv(e,t){t.classList.remove("dragging"),Ns=null}function id(e){const t=Vt.find(n=>n.id===Ns);return!!t&&t.status===e}function mv(e,t){e.preventDefault(),!id(t.dataset.status)&&t.classList.add("drag-over")}function fv(e,t){t.classList.remove("drag-over")}function gv(e,t){e.preventDefault();const n=Vt.find(i=>i.id===t.dataset.id);n&&id(n.status)||t.classList.add("drag-over")}function hv(e,t){t.classList.remove("drag-over")}async function vv(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=Vt.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,yi();try{await h.updateIssue(n,{status:i}),k("Status updated","success")}catch(o){s.status=a,yi(),x("update status",o)}}}async function bv(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Ns||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=Vt.find(c=>c.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,yi();try{await h.updateIssue(n,{status:a}),k("Status updated","success")}catch(c){o.status=r,yi(),x("update status",c)}}}te({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),W(t.id)):e.type==="dragstart"?uv(e,n):e.type==="dragend"?pv(e,n):e.type==="dragover"?gv(e,n):e.type==="dragleave"?hv(e,n):e.type==="drop"&&bv(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?mv(e,n):e.type==="dragleave"?fv(e,n):e.type==="drop"&&vv(e,n)},"retry-load-board":()=>bi()});const Dt=new Map,sd=6e4,Go=100;let be=null,qs=null,Os=null,wi=null,ad=!1;const yv={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},wv={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},od={api:null};let zo={...od};function kv(e={}){zo={...od,...e},be||(be=document.createElement("div"),be.className="issue-tooltip",be.style.display="none",document.body.appendChild(be),be.addEventListener("mouseenter",()=>{clearTimeout(qs)}),be.addEventListener("mouseleave",()=>{Vo()})),ad||(document.addEventListener("mouseover",$v),document.addEventListener("mouseout",Ev),ad=!0)}function $v(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=xv(t);if(n){if(n===wi&&be.style.display!=="none"){clearTimeout(qs);return}clearTimeout(Os),Os=setTimeout(()=>{Iv(t,n)},200)}}function Ev(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Os),qs=setTimeout(()=>{Vo()},150))}function xv(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function Iv(e,t){wi=t;const n=e.getBoundingClientRect();be.style.left=`${n.left+window.scrollX}px`,be.style.top=`${n.bottom+window.scrollY+8}px`,be.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',be.style.display="block";try{const i=await Tv(t);if(wi!==t)return;Sv(i)}catch{if(wi!==t)return;be.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Vo(){clearTimeout(Os),clearTimeout(qs),be&&(be.style.display="none"),wi=null}function _v(){const e=Date.now();for(const[t,n]of Dt.entries())e-n.timestamp>=sd&&Dt.delete(t)}async function Tv(e){Dt.size>Go/2&&_v();const t=Dt.get(e);if(t&&Date.now()-t.timestamp<sd)return t.issue;if(!zo.api)throw new Error("API not initialized");const n=await zo.api.getIssueByIdentifier(e);if(Dt.size>=Go){const i=Array.from(Dt.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,Go/2);for(const[a]of s)Dt.delete(a)}return Dt.set(e,{issue:n,timestamp:Date.now()}),n}function Sv(e){const t=yv[e.status]||"#6b7280",n=wv[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate?`${e.estimate}pt`:"";be.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${f(e.identifier)}</span>
            <span class="issue-tooltip-type">${f(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${f(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Lv(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Cv(e.priority)}</span>
        </div>
    `}function Lv(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Cv(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function rd(){return!!document.querySelector(".description-inline-editor")}function Av(){Fe("issue:created",Bv),Fe("issue:updated",Dv),Fe("issue:deleted",Mv),Fe("comment",jv),Fe("relation",Pv),Fe("attestation",Nv),Fe("activity",Ov),Fe("project",Hv),Fe("sprint",Fv),Fe("document",Rv),Fe("inbox",qv),Fe("connection:reconnected",Uv)}function Bv(e){var s,a,o;const t=Re(),n=t.findIndex(r=>r.id===e.id),i=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(i>=0){const r=[...t];r[i]=e,et(r),S()==="issues"&&pt()}else et([e,...t]),S()==="issues"&&pt(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=Pt())==null?void 0:s.id)){const r=It(),c=r.findIndex(d=>d.id===e.id),l=r.findIndex(d=>d._isOptimistic&&d.title===e.title);if(c===-1&&l===-1)ln([e,...r]),S()==="my-issues"&&Xn();else if(l>=0){const d=[...r];d[l]=e,ln(d),S()==="my-issues"&&Xn()}}S()==="board"?Uo():S()==="sprints"?$i():S()==="epics"&&At(),S()==="issue-detail"&&e.parent_id===((a=re())==null?void 0:a.id)&&W((o=re())==null?void 0:o.id,!1)}function Dv(e){var s;const t=Re();t.some(a=>a.id===e.id)&&et(t.map(a=>a.id===e.id?e:a));const n=It();n.some(a=>a.id===e.id)&&ln(n.map(a=>a.id===e.id?e:a));const i=Hi();i.some(a=>a.id===e.id)&&Qt(i.map(a=>a.id===e.id?e:a)),S()==="issues"?pt():S()==="my-issues"?Xn():S()==="board"?Uo():S()==="sprints"?$i():S()==="epics"?At():S()==="issue-detail"&&((s=re())==null?void 0:s.id)===e.id&&(rd()?Vl(e):W(e.id,!1))}function Mv(e){var n;et(Re().filter(i=>i.id!==e.id)),ln(It().filter(i=>i.id!==e.id));const t=Hi();t.some(i=>i.id===e.id)&&Qt(t.filter(i=>i.id!==e.id)),S()==="issues"?pt():S()==="my-issues"?(Xn(),dn({showLoading:!1})):S()==="board"?Uo():S()==="sprints"?$i():S()==="epics"&&At(),k(`Issue ${e.identifier} deleted`,"info"),S()==="issue-detail"&&((n=re())==null?void 0:n.id)===e.id&&(k(`Issue ${e.identifier} was deleted`,"warning"),j("my-issues"))}function ki(e){rd()?Vl():W(e,!1)}function jv(e){var t;S()==="my-issues"&&dn({showLoading:!1}),S()==="issue-detail"&&((t=re())==null?void 0:t.id)===e.issue_id&&ki(e.issue_id),e.document_id&&ic(e.document_id)}function Rv(e,{type:t}={}){nc(),t==="deleted"?Jm(e.id,e.title):ic(e.id)}function Pv(e){var t;if(S()==="issue-detail"){const n=(t=re())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&ki(n)}}function Nv(e){var t;S()==="approvals"&&ft(),S()==="issue-detail"&&((t=re())==null?void 0:t.id)===e.issue_id&&ki(e.issue_id)}function qv(e){var t;e.recipient_user_id===((t=Pt())==null?void 0:t.id)&&(Ss(),S()==="inbox"&&di())}function Ov(e){var t;S()==="my-issues"&&dn({showLoading:!1}),S()==="issue-detail"&&((t=re())==null?void 0:t.id)===e.issue_id&&ki(e.issue_id)}function Hv(e,{type:t}){He().then(()=>{S()==="projects"&&En()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function $i(){const e=_f();e?kn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):wn().catch(t=>console.error("Failed to reload sprints:",t))}function Fv(e,{type:t}={}){uc(),S()==="sprints"?$i():S()==="my-issues"&&Qn(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function Uv(){var t;const e=S();if(Ss(),e==="issues")ut().catch(n=>console.error("Failed to resync issues:",n));else if(e==="my-issues")cn().catch(n=>console.error("Failed to resync my issues:",n)),Qn().catch(n=>console.error("Failed to resync sprint status:",n)),dn({showLoading:!1});else if(e==="board")bi();else if(e==="sprints")$i();else if(e==="epics")At().catch(n=>console.error("Failed to resync epics:",n));else if(e==="projects")He().then(()=>{S()==="projects"&&En()}).catch(n=>console.error("Failed to resync projects:",n));else if(e==="documents")nc();else if(e==="approvals")ft();else if(e==="inbox")di();else if(e==="issue-detail"){const n=(t=re())==null?void 0:t.id;n&&ki(n)}}const ld='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function cd(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function Gv(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),cd(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(ld);n&&n.focus()}}}function Hs(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),cd(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=n.querySelectorAll(ld);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Hs()});async function zv(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=z();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=ne().find(l=>l.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};et([r,...Re()]),pt();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=Re(),u=d.findIndex(m=>m.id===a);u!==-1&&(d[u]=l,et(d)),pt(),He(),k("Issue created!","success")}catch(l){et(Re().filter(d=>d.id!==a)),pt(),x("create issue",l)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}jg({beforeNavigate:()=>{kg(),kc(null),Gi(null),el(null),Hs(),Vo()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return ed(e[1]),!0;if(e[0]==="issue"&&e[1])return cs(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(cs(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(nb(e[1]),!0):e[0]==="sprint"&&e[1]?(Cf(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(xc(e[1]),!0):!1},detailPopstate:e=>e.epicId?(Ho(e.epicId,!1),!0):e.issueId?(W(e.issueId,!1),!0):e.identifier?(cs(e.identifier),!0):e.documentId?(ve(e.documentId,!1),!0):e.sprintId?(kn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=fo();e&&ne().some(t=>t.id===e)&&ze(e)},issueNavigate:e=>cs(e),epicNavigate:e=>ed(e)}),Mg({"my-issues":()=>{Qn(),cn(),dn()},approvals:()=>{ft()},inbox:()=>{di()},issues:()=>{fl(),Mp(),Pp(),dl().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const i=document.getElementById("label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),Yi())}const n=e.getAll("exclude_label");if(n.length>0){const i=document.getElementById("exclude-label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),Zi())}}),ml().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}ut()})},epics:()=>{At()},board:()=>{bi()},projects:()=>{He().then(En)},sprints:()=>{wn()},rituals:()=>{Wf()},documents:()=>{Ht()},team:()=>{Bo(),Hc(),Cs()},settings:()=>{Oo(),$o()}});function Vv(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||O()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>O())}function Wv(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Ic(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>xg());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Ig()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>_c(a))})}function Kv(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>ec("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>ec("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>tc());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Vm());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>St())}function Yv(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>$l())}function Zv(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Rp());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>$p());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Ep()),document.querySelectorAll(".multi-select-btn").forEach(v=>{const b=v.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?v.addEventListener("click",()=>Xi("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?v.addEventListener("click",()=>Xi("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?v.addEventListener("click",()=>Xi("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&v.addEventListener("click",()=>Xi("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Qi())});const v=i.querySelector(".btn-small");v&&v.addEventListener("click",()=>Ta())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Sa())});const v=s.querySelector(".btn-small");v&&v.addEventListener("click",()=>La())}const a=document.getElementById("label-filter-dropdown");if(a){const v=a.querySelector(".btn-small");v&&v.addEventListener("click",()=>Ji())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const v=o.querySelector(".btn-small");v&&v.addEventListener("click",()=>es())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Pe());const c=document.getElementById("assignee-filter");c&&c.addEventListener("change",()=>Pe());const l=document.getElementById("sprint-filter");l&&l.addEventListener("change",()=>Pe());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>ut());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>vl());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",v=>zv(v))}function Xv(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Yf(t.dataset.tab))})}function Qv(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>qc());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Jn()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),j(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>ih());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Hs());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>Gv());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Jn())}te({"navigate-to":(e,t)=>{j(t.view)},"set-current-project":(e,t,n)=>{ze(n.value)},showCreateIssueModal:()=>Jn(),showCreateEpicModal:()=>Vh(),"retry-load-epics":()=>At(),showCreateProjectModal:()=>Ec(),showCreateDocumentModal:()=>ac(),showCreateTeamModal:()=>Uc(),showEditTeamModal:()=>uh(),showInviteModal:()=>Fc(),showCreateApiKeyModal:()=>Bh(),showCreateAgentModal:()=>Ug(),resetOnboarding:()=>Zc(),logout:()=>Xc(),navigateToProjects:()=>j("projects")});async function Jv(){if(!h.getToken()){As();return}try{const e=await h.getMe();Oi(e),await mi()}catch(e){if((e==null?void 0:e.status)===401||(e==null?void 0:e.status)===403){h.logout(),As();return}console.error("Failed to load current user on boot:",e),As(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{bp(),Ch(),Qv(),Vv(),Yv(),Zv(),Xv(),Wv(),Kv(),eb(),tb(),kv({api:h}),Ng(),Av(),await Jv()});function eb(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Pu()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Nu(n?"light":"dark")})}function tb(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Ac(i)}}})}async function nb(e){try{await ve(e,!1)}catch{j("documents",!1)}}const Ei=()=>["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return t&&!t.classList.contains("hidden")});document.addEventListener("keydown",Zh({getCurrentView:S,getSelectedIndex:Wr,setSelectedIndex:Yn,viewIssue:W,showEditIssueModal:Pl,showInlineDropdown:ja,isInlineDropdownOpen:_l,isModalOpen:Et,isCommandPaletteOpen:zt,isDetailViewActive:Ei})),document.addEventListener("keydown",Xh({getCurrentView:S,getSelectedIndex:op,setSelectedIndex:Kr,viewDocument:ve,showEditDocumentModal:oc,isModalOpen:Et,isCommandPaletteOpen:zt,isDetailViewActive:Ei})),document.addEventListener("keydown",Jh({getCurrentView:S,getSelectedIndex:Yr,setSelectedIndex:Ui,viewIssue:W,isModalOpen:Et,isCommandPaletteOpen:zt,isDetailViewActive:Ei})),document.addEventListener("keydown",Qh({getCurrentView:S,getSelectedIndex:rp,setSelectedIndex:lp,openInboxEntry:eh,isModalOpen:Et,isCommandPaletteOpen:zt})),document.addEventListener("keydown",ev()),document.addEventListener("keydown",td({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&kn(e.dataset.sprintId)},getCurrentView:S,getSelectedIndex:cp,setSelectedIndex:Zr,isModalOpen:Et,isCommandPaletteOpen:zt,isDetailViewActive:Ei})),document.addEventListener("keydown",td({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Bc(e.dataset.identifier)},getCurrentView:S,getSelectedIndex:dp,setSelectedIndex:Xr,isModalOpen:Et,isCommandPaletteOpen:zt,isDetailViewActive:Ei})),document.addEventListener("keydown",Kh({closeModal:O,closeSidebar:Hs,navigateTo:j,showCreateIssueModal:Jn,showKeyboardShortcutsHelp:Jc,isModalOpen:Et,focusSearch:()=>{j("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),qt()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))}})),Rh([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>j("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>j("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>j("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>j("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>j("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>j("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>j("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>j("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>j("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>j("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>j("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>j("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{j("issues"),setTimeout(Jn,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{j("projects"),setTimeout(Ec,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{j("documents"),setTimeout(ac,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Uc(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{j("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{j("team"),setTimeout(Fc,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Jc(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Zc(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Xc(),category:"Account"}]),document.addEventListener("keydown",Yh({isModalOpen:Et,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:zt,openCommandPalette:Ph,closeCommandPalette:Ms})),window.marked=F,window.DOMPurify=jr,console.log("Chaotic frontend loaded via Vite")})();
