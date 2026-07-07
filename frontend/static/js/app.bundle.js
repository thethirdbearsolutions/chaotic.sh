var Rv=Object.defineProperty;var Pv=(at,ve,Ct)=>ve in at?Rv(at,ve,{enumerable:!0,configurable:!0,writable:!0,value:Ct}):at[ve]=Ct;var K=(at,ve,Ct)=>Pv(at,typeof ve!="symbol"?ve+"":ve,Ct);(function(){"use strict";var Oo;function at(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ve=at();function Ct(e){ve=e}var Dn={exec:()=>null};function G(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(be.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var be={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},hd=/^(?:[ \t]*(?:\n|$))+/,vd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bd=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,yd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Gs=/(?:[*+-]|\d{1,9}[.)])/,tr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,nr=G(tr).replace(/bull/g,Gs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),wd=G(tr).replace(/bull/g,Gs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),zs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,kd=/^[^\n]+/,Vs=/(?!\s*\])(?:\\.|[^\[\]\\])+/,$d=G(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Vs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ed=G(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Gs).getRegex(),$i="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ws=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,xd=G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ws).replace("tag",$i).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ir=G(zs).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$i).getRegex(),Id=G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ir).getRegex(),Ks={blockquote:Id,code:vd,def:$d,fences:bd,heading:yd,hr:Mn,html:xd,lheading:nr,list:Ed,newline:hd,paragraph:ir,table:Dn,text:kd},sr=G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$i).getRegex(),_d={...Ks,lheading:wd,table:sr,paragraph:G(zs).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",sr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$i).getRegex()},Td={...Ks,html:G(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ws).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:G(zs).replace("hr",Mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",nr).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Sd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ld=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ar=/^( {2,}|\\)\n(?!\s*$)/,Cd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ei=/[\p{P}\p{S}]/u,Ys=/[\s\p{P}\p{S}]/u,or=/[^\s\p{P}\p{S}]/u,Ad=G(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ys).getRegex(),rr=/(?!~)[\p{P}\p{S}]/u,Bd=/(?!~)[\s\p{P}\p{S}]/u,Dd=/(?:[^\s\p{P}\p{S}]|~)/u,Md=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,lr=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,jd=G(lr,"u").replace(/punct/g,Ei).getRegex(),Rd=G(lr,"u").replace(/punct/g,rr).getRegex(),cr="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Pd=G(cr,"gu").replace(/notPunctSpace/g,or).replace(/punctSpace/g,Ys).replace(/punct/g,Ei).getRegex(),Nd=G(cr,"gu").replace(/notPunctSpace/g,Dd).replace(/punctSpace/g,Bd).replace(/punct/g,rr).getRegex(),qd=G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,or).replace(/punctSpace/g,Ys).replace(/punct/g,Ei).getRegex(),Od=G(/\\(punct)/,"gu").replace(/punct/g,Ei).getRegex(),Hd=G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Fd=G(Ws).replace("(?:-->|$)","-->").getRegex(),Ud=G("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Fd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xi=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Gd=G(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),dr=G(/^!?\[(label)\]\[(ref)\]/).replace("label",xi).replace("ref",Vs).getRegex(),ur=G(/^!?\[(ref)\](?:\[\])?/).replace("ref",Vs).getRegex(),zd=G("reflink|nolink(?!\\()","g").replace("reflink",dr).replace("nolink",ur).getRegex(),Zs={_backpedal:Dn,anyPunctuation:Od,autolink:Hd,blockSkip:Md,br:ar,code:Ld,del:Dn,emStrongLDelim:jd,emStrongRDelimAst:Pd,emStrongRDelimUnd:qd,escape:Sd,link:Gd,nolink:ur,punctuation:Ad,reflink:dr,reflinkSearch:zd,tag:Ud,text:Cd,url:Dn},Vd={...Zs,link:G(/^!?\[(label)\]\((.*?)\)/).replace("label",xi).getRegex(),reflink:G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xi).getRegex()},Xs={...Zs,emStrongRDelimAst:Nd,emStrongLDelim:Rd,url:G(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Wd={...Xs,br:G(ar).replace("{2,}","*").getRegex(),text:G(Xs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ii={normal:Ks,gfm:_d,pedantic:Td},jn={normal:Zs,gfm:Xs,breaks:Wd,pedantic:Vd},Kd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},pr=e=>Kd[e];function We(e,t){if(t){if(be.escapeTest.test(e))return e.replace(be.escapeReplace,pr)}else if(be.escapeTestNoEncode.test(e))return e.replace(be.escapeReplaceNoEncode,pr);return e}function mr(e){try{e=encodeURI(e).replace(be.percentDecode,"%")}catch{return null}return e}function fr(e,t){var a;const n=e.replace(be.findPipe,(o,r,d)=>{let c=!1,l=r;for(;--l>=0&&d[l]==="\\";)c=!c;return c?"|":" |"}),i=n.split(be.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(be.slashPipe,"|");return i}function Rn(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Yd(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function gr(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,d}function Zd(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var _i=class{constructor(e){K(this,"options");K(this,"rules");K(this,"lexer");this.options=e||ve}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Rn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Zd(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Rn(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Rn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Rn(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))r.push(n[d]),o=!0;else if(!o)r.push(n[d]);else break;n=n.slice(d);const c=r.join(`
`),l=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${l}`:l;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const h=f,b=h.raw+`
`+n.join(`
`),w=this.blockquote(b);a[a.length-1]=w,i=i.substring(0,i.length-h.raw.length)+w.raw,s=s.substring(0,s.length-h.text.length)+w.text;break}else if((f==null?void 0:f.type)==="list"){const h=f,b=h.raw+`
`+n.join(`
`),w=this.list(b);a[a.length-1]=w,i=i.substring(0,i.length-f.raw.length)+w.raw,s=s.substring(0,s.length-h.raw.length)+w.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let d=!1,c="",l="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),f=e.split(`
`,1)[0],h=!u.trim(),b=0;if(this.options.pedantic?(b=2,l=u.trimStart()):h?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,l=u.slice(b),b+=t[1].length),h&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),d=!0),!d){const L=this.rules.other.nextBulletRegex(b),R=this.rules.other.hrRegex(b),B=this.rules.other.fencesBeginRegex(b),E=this.rules.other.headingBeginRegex(b),M=this.rules.other.htmlBeginRegex(b);for(;e;){const _=e.split(`
`,1)[0];let H;if(f=_,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),H=f):H=f.replace(this.rules.other.tabCharGlobal,"    "),B.test(f)||E.test(f)||M.test(f)||L.test(f)||R.test(f))break;if(H.search(this.rules.other.nonSpaceChar)>=b||!f.trim())l+=`
`+H.slice(b);else{if(h||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(u)||E.test(u)||R.test(u))break;l+=`
`+f}!h&&!f.trim()&&(h=!0),c+=_+`
`,e=e.substring(_.length+1),u=H.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let w=null,I;this.options.gfm&&(w=this.rules.other.listIsTask.exec(l),w&&(I=w[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!w,checked:I,loose:!1,text:l,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let d=0;d<s.items.length;d++)if(this.lexer.state.top=!1,s.items[d].tokens=this.lexer.blockTokens(s.items[d].text,[]),!s.loose){const c=s.items[d].tokens.filter(u=>u.type==="space"),l=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=l}if(s.loose)for(let d=0;d<s.items.length;d++)s.items[d].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=fr(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(fr(r,a.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Rn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Yd(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),gr(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return gr(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,d=a,c=0;const l=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+a);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){d+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(d-=r,d>0)continue;r=Math.min(r,r+d+c);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},ot=class Jo{constructor(t){K(this,"tokens");K(this,"options");K(this,"state");K(this,"tokenizer");K(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ve,this.options.tokenizer=this.options.tokenizer||new _i,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:be,block:Ii.normal,inline:jn.normal};this.options.pedantic?(n.block=Ii.pedantic,n.inline=jn.pedantic):this.options.gfm&&(n.block=Ii.gfm,this.options.breaks?n.inline=jn.breaks:n.inline=jn.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ii,inline:jn}}static lex(t,n){return new Jo(n).lex(t)}static lexInline(t,n){return new Jo(n).inlineTokens(t)}lex(t){t=t.replace(be.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(be.tabCharGlobal,"    ").replace(be.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let d=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const l=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},l),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(d=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(d))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=d.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,d,c;let i=t,s=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if((d=(r=this.options.extensions)==null?void 0:r.inline)!=null&&d.some(f=>(l=f.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);const f=n.at(-1);l.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=l.raw,f.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,i,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const h=t.slice(1);let b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},h),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=l.raw,f.text+=l.text):n.push(l);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Ti=class{constructor(e){K(this,"options");K(this,"parser");this.options=e||ve}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(be.notSpaceStart))==null?void 0:a[0],s=e.replace(be.endingNewline,"")+`
`;return i?'<pre><code class="language-'+We(i)+'">'+(n?s:We(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:We(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+We(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${We(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=mr(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+We(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=mr(e);if(s===null)return We(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${We(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:We(e.text)}},Qs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},rt=class er{constructor(t){K(this,"options");K(this,"renderer");K(this,"textRenderer");this.options=t||ve,this.options.renderer=this.options.renderer||new Ti,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Qs}static parse(t,n){return new er(n).parse(t)}static parseInline(t,n){return new er(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,l=this.options.extensions.renderers[c.type].call({parser:this},c);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=l||"";continue}}const d=r;switch(d.type){case"space":{i+=this.renderer.space(d);continue}case"hr":{i+=this.renderer.hr(d);continue}case"heading":{i+=this.renderer.heading(d);continue}case"code":{i+=this.renderer.code(d);continue}case"table":{i+=this.renderer.table(d);continue}case"blockquote":{i+=this.renderer.blockquote(d);continue}case"list":{i+=this.renderer.list(d);continue}case"html":{i+=this.renderer.html(d);continue}case"paragraph":{i+=this.renderer.paragraph(d);continue}case"text":{let c=d,l=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],l+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):i+=l;continue}default:{const c='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const d=r;switch(d.type){case"escape":{i+=n.text(d);break}case"html":{i+=n.html(d);break}case"link":{i+=n.link(d);break}case"image":{i+=n.image(d);break}case"strong":{i+=n.strong(d);break}case"em":{i+=n.em(d);break}case"codespan":{i+=n.codespan(d);break}case"br":{i+=n.br(d);break}case"del":{i+=n.del(d);break}case"text":{i+=n.text(d);break}default:{const c='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Si=(Oo=class{constructor(e){K(this,"options");K(this,"block");this.options=e||ve}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?ot.lex:ot.lexInline}provideParser(){return this.block?rt.parse:rt.parseInline}},K(Oo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Oo),Xd=class{constructor(...e){K(this,"defaults",at());K(this,"options",this.setOptions);K(this,"parse",this.parseMarkdown(!0));K(this,"parseInline",this.parseMarkdown(!1));K(this,"Parser",rt);K(this,"Renderer",Ti);K(this,"TextRenderer",Qs);K(this,"Lexer",ot);K(this,"Tokenizer",_i);K(this,"Hooks",Si);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const d of r)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const d=o[r].flat(1/0);n=n.concat(this.walkTokens(d,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Ti(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],d=s[o];s[o]=(...c)=>{let l=r.apply(s,c);return l===!1&&(l=d.apply(s,c)),l||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new _i(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],d=s[o];s[o]=(...c)=>{let l=r.apply(s,c);return l===!1&&(l=d.apply(s,c)),l}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Si;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],d=s[o];Si.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>d.call(s,u));const l=r.call(s,c);return d.call(s,l)}:s[o]=(...c)=>{let l=r.apply(s,c);return l===!1&&(l=d.apply(s,c)),l}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ot.lex(e,t??this.defaults)}parser(e,t){return rt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?ot.lex:ot.lexInline,d=a.hooks?a.hooks.provideParser():e?rt.parse:rt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>d(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let l=d(c,a);return a.hooks&&(l=a.hooks.postprocess(l)),l}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+We(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},At=new Xd;function F(e,t){return At.parse(e,t)}F.options=F.setOptions=function(e){return At.setOptions(e),F.defaults=At.defaults,Ct(F.defaults),F},F.getDefaults=at,F.defaults=ve,F.use=function(...e){return At.use(...e),F.defaults=At.defaults,Ct(F.defaults),F},F.walkTokens=function(e,t){return At.walkTokens(e,t)},F.parseInline=At.parseInline,F.Parser=rt,F.parser=rt.parse,F.Renderer=Ti,F.TextRenderer=Qs,F.Lexer=ot,F.lexer=ot.lex,F.Tokenizer=_i,F.Hooks=Si,F.parse=F,F.options,F.setOptions,F.use,F.walkTokens,F.parseInline,rt.parse,ot.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:hr,setPrototypeOf:vr,isFrozen:Qd,getPrototypeOf:Jd,getOwnPropertyDescriptor:eu}=Object;let{freeze:ye,seal:Pe,create:Js}=Object,{apply:ea,construct:ta}=typeof Reflect<"u"&&Reflect;ye||(ye=function(t){return t}),Pe||(Pe=function(t){return t}),ea||(ea=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),ta||(ta=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Li=ke(Array.prototype.forEach),tu=ke(Array.prototype.lastIndexOf),br=ke(Array.prototype.pop),Pn=ke(Array.prototype.push),nu=ke(Array.prototype.splice),Ci=ke(String.prototype.toLowerCase),na=ke(String.prototype.toString),ia=ke(String.prototype.match),Nn=ke(String.prototype.replace),iu=ke(String.prototype.indexOf),su=ke(String.prototype.trim),He=ke(Object.prototype.hasOwnProperty),we=ke(RegExp.prototype.test),qn=au(TypeError);function ke(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return ea(e,t,i)}}function au(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return ta(e,n)}}function P(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ci;vr&&vr(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(Qd(t)||(t[i]=a),s=a)}e[s]=!0}return e}function ou(e){for(let t=0;t<e.length;t++)He(e,t)||(e[t]=null);return e}function Ke(e){const t=Js(null);for(const[n,i]of hr(e))He(e,n)&&(Array.isArray(i)?t[n]=ou(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Ke(i):t[n]=i);return t}function On(e,t){for(;e!==null;){const i=eu(e,t);if(i){if(i.get)return ke(i.get);if(typeof i.value=="function")return ke(i.value)}e=Jd(e)}function n(){return null}return n}const yr=ye(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),sa=ye(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),aa=ye(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ru=ye(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),oa=ye(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),lu=ye(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wr=ye(["#text"]),kr=ye(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ra=ye(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),$r=ye(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ai=ye(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),cu=Pe(/\{\{[\w\W]*|[\w\W]*\}\}/gm),du=Pe(/<%[\w\W]*|[\w\W]*%>/gm),uu=Pe(/\$\{[\w\W]*/gm),pu=Pe(/^data-[\-\w.\u00B7-\uFFFF]+$/),mu=Pe(/^aria-[\-\w]+$/),Er=Pe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),fu=Pe(/^(?:\w+script|data):/i),gu=Pe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xr=Pe(/^html$/i),hu=Pe(/^[a-z][.\w]*(-[.\w]+)+$/i);var Ir=Object.freeze({__proto__:null,ARIA_ATTR:mu,ATTR_WHITESPACE:gu,CUSTOM_ELEMENT:hu,DATA_ATTR:pu,DOCTYPE_NAME:xr,ERB_EXPR:du,IS_ALLOWED_URI:Er,IS_SCRIPT_OR_DATA:fu,MUSTACHE_EXPR:cu,TMPLIT_EXPR:uu});const Hn={element:1,text:3,progressingInstruction:7,comment:8,document:9},vu=function(){return typeof window>"u"?null:window},bu=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},_r=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Tr(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:vu();const t=A=>Tr(A);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Hn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:d,NodeFilter:c,NamedNodeMap:l=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:h}=e,b=d.prototype,w=On(b,"cloneNode"),I=On(b,"remove"),L=On(b,"nextSibling"),R=On(b,"childNodes"),B=On(b,"parentNode");if(typeof o=="function"){const A=n.createElement("template");A.content&&A.content.ownerDocument&&(n=A.content.ownerDocument)}let E,M="";const{implementation:_,createNodeIterator:H,createDocumentFragment:V,getElementsByTagName:Ae}=n,{importNode:ce}=i;let q=_r();t.isSupported=typeof hr=="function"&&typeof B=="function"&&_&&_.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:de,ERB_EXPR:Se,TMPLIT_EXPR:Re,DATA_ATTR:Ft,ARIA_ATTR:y,IS_SCRIPT_OR_DATA:Ve,ATTR_WHITESPACE:Le,CUSTOM_ELEMENT:Rs}=Ir;let{IS_ALLOWED_URI:ht}=Ir,oe=null;const Kc=P({},[...yr,...sa,...aa,...oa,...wr]);let ue=null;const Yc=P({},[...kr,...ra,...$r,...Ai]);let te=Object.seal(Js(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),yi=null,Ho=null;const _n=Object.seal(Js(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Zc=!0,Fo=!0,Xc=!1,Qc=!0,Tn=!1,Ps=!0,Ut=!1,Uo=!1,Go=!1,Sn=!1,Ns=!1,qs=!1,Jc=!0,ed=!1;const Sv="user-content-";let zo=!0,wi=!1,Ln={},it=null;const Vo=P({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let td=null;const nd=P({},["audio","video","img","source","image","track"]);let Wo=null;const id=P({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Os="http://www.w3.org/1998/Math/MathML",Hs="http://www.w3.org/2000/svg",vt="http://www.w3.org/1999/xhtml";let Cn=vt,Ko=!1,Yo=null;const Lv=P({},[Os,Hs,vt],na);let Fs=P({},["mi","mo","mn","ms","mtext"]),Us=P({},["annotation-xml"]);const Cv=P({},["title","style","font","a","script"]);let ki=null;const Av=["application/xhtml+xml","text/html"],Bv="text/html";let ae=null,An=null;const Dv=n.createElement("form"),sd=function(g){return g instanceof RegExp||g instanceof Function},Zo=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(An&&An===g)){if((!g||typeof g!="object")&&(g={}),g=Ke(g),ki=Av.indexOf(g.PARSER_MEDIA_TYPE)===-1?Bv:g.PARSER_MEDIA_TYPE,ae=ki==="application/xhtml+xml"?na:Ci,oe=He(g,"ALLOWED_TAGS")?P({},g.ALLOWED_TAGS,ae):Kc,ue=He(g,"ALLOWED_ATTR")?P({},g.ALLOWED_ATTR,ae):Yc,Yo=He(g,"ALLOWED_NAMESPACES")?P({},g.ALLOWED_NAMESPACES,na):Lv,Wo=He(g,"ADD_URI_SAFE_ATTR")?P(Ke(id),g.ADD_URI_SAFE_ATTR,ae):id,td=He(g,"ADD_DATA_URI_TAGS")?P(Ke(nd),g.ADD_DATA_URI_TAGS,ae):nd,it=He(g,"FORBID_CONTENTS")?P({},g.FORBID_CONTENTS,ae):Vo,yi=He(g,"FORBID_TAGS")?P({},g.FORBID_TAGS,ae):Ke({}),Ho=He(g,"FORBID_ATTR")?P({},g.FORBID_ATTR,ae):Ke({}),Ln=He(g,"USE_PROFILES")?g.USE_PROFILES:!1,Zc=g.ALLOW_ARIA_ATTR!==!1,Fo=g.ALLOW_DATA_ATTR!==!1,Xc=g.ALLOW_UNKNOWN_PROTOCOLS||!1,Qc=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Tn=g.SAFE_FOR_TEMPLATES||!1,Ps=g.SAFE_FOR_XML!==!1,Ut=g.WHOLE_DOCUMENT||!1,Sn=g.RETURN_DOM||!1,Ns=g.RETURN_DOM_FRAGMENT||!1,qs=g.RETURN_TRUSTED_TYPE||!1,Go=g.FORCE_BODY||!1,Jc=g.SANITIZE_DOM!==!1,ed=g.SANITIZE_NAMED_PROPS||!1,zo=g.KEEP_CONTENT!==!1,wi=g.IN_PLACE||!1,ht=g.ALLOWED_URI_REGEXP||Er,Cn=g.NAMESPACE||vt,Fs=g.MATHML_TEXT_INTEGRATION_POINTS||Fs,Us=g.HTML_INTEGRATION_POINTS||Us,te=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&sd(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(te.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&sd(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(te.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(te.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Tn&&(Fo=!1),Ns&&(Sn=!0),Ln&&(oe=P({},wr),ue=[],Ln.html===!0&&(P(oe,yr),P(ue,kr)),Ln.svg===!0&&(P(oe,sa),P(ue,ra),P(ue,Ai)),Ln.svgFilters===!0&&(P(oe,aa),P(ue,ra),P(ue,Ai)),Ln.mathMl===!0&&(P(oe,oa),P(ue,$r),P(ue,Ai))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?_n.tagCheck=g.ADD_TAGS:(oe===Kc&&(oe=Ke(oe)),P(oe,g.ADD_TAGS,ae))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?_n.attributeCheck=g.ADD_ATTR:(ue===Yc&&(ue=Ke(ue)),P(ue,g.ADD_ATTR,ae))),g.ADD_URI_SAFE_ATTR&&P(Wo,g.ADD_URI_SAFE_ATTR,ae),g.FORBID_CONTENTS&&(it===Vo&&(it=Ke(it)),P(it,g.FORBID_CONTENTS,ae)),g.ADD_FORBID_CONTENTS&&(it===Vo&&(it=Ke(it)),P(it,g.ADD_FORBID_CONTENTS,ae)),zo&&(oe["#text"]=!0),Ut&&P(oe,["html","head","body"]),oe.table&&(P(oe,["tbody"]),delete yi.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw qn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw qn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=g.TRUSTED_TYPES_POLICY,M=E.createHTML("")}else E===void 0&&(E=bu(h,s)),E!==null&&typeof M=="string"&&(M=E.createHTML(""));ye&&ye(g),An=g}},ad=P({},[...sa,...aa,...ru]),od=P({},[...oa,...lu]),Mv=function(g){let $=B(g);(!$||!$.tagName)&&($={namespaceURI:Cn,tagName:"template"});const T=Ci(g.tagName),X=Ci($.tagName);return Yo[g.namespaceURI]?g.namespaceURI===Hs?$.namespaceURI===vt?T==="svg":$.namespaceURI===Os?T==="svg"&&(X==="annotation-xml"||Fs[X]):!!ad[T]:g.namespaceURI===Os?$.namespaceURI===vt?T==="math":$.namespaceURI===Hs?T==="math"&&Us[X]:!!od[T]:g.namespaceURI===vt?$.namespaceURI===Hs&&!Us[X]||$.namespaceURI===Os&&!Fs[X]?!1:!od[T]&&(Cv[T]||!ad[T]):!!(ki==="application/xhtml+xml"&&Yo[g.namespaceURI]):!1},st=function(g){Pn(t.removed,{element:g});try{B(g).removeChild(g)}catch{I(g)}},Gt=function(g,$){try{Pn(t.removed,{attribute:$.getAttributeNode(g),from:$})}catch{Pn(t.removed,{attribute:null,from:$})}if($.removeAttribute(g),g==="is")if(Sn||Ns)try{st($)}catch{}else try{$.setAttribute(g,"")}catch{}},rd=function(g){let $=null,T=null;if(Go)g="<remove></remove>"+g;else{const ne=ia(g,/^[\r\n\t ]+/);T=ne&&ne[0]}ki==="application/xhtml+xml"&&Cn===vt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const X=E?E.createHTML(g):g;if(Cn===vt)try{$=new f().parseFromString(X,ki)}catch{}if(!$||!$.documentElement){$=_.createDocument(Cn,"template",null);try{$.documentElement.innerHTML=Ko?M:X}catch{}}const he=$.body||$.documentElement;return g&&T&&he.insertBefore(n.createTextNode(T),he.childNodes[0]||null),Cn===vt?Ae.call($,Ut?"html":"body")[0]:Ut?$.documentElement:he},ld=function(g){return H.call(g.ownerDocument||g,g,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Xo=function(g){return g instanceof u&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof l)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},cd=function(g){return typeof r=="function"&&g instanceof r};function bt(A,g,$){Li(A,T=>{T.call(t,g,$,An)})}const dd=function(g){let $=null;if(bt(q.beforeSanitizeElements,g,null),Xo(g))return st(g),!0;const T=ae(g.nodeName);if(bt(q.uponSanitizeElement,g,{tagName:T,allowedTags:oe}),Ps&&g.hasChildNodes()&&!cd(g.firstElementChild)&&we(/<[/\w!]/g,g.innerHTML)&&we(/<[/\w!]/g,g.textContent)||g.nodeType===Hn.progressingInstruction||Ps&&g.nodeType===Hn.comment&&we(/<[/\w]/g,g.data))return st(g),!0;if(!(_n.tagCheck instanceof Function&&_n.tagCheck(T))&&(!oe[T]||yi[T])){if(!yi[T]&&pd(T)&&(te.tagNameCheck instanceof RegExp&&we(te.tagNameCheck,T)||te.tagNameCheck instanceof Function&&te.tagNameCheck(T)))return!1;if(zo&&!it[T]){const X=B(g)||g.parentNode,he=R(g)||g.childNodes;if(he&&X){const ne=he.length;for(let Be=ne-1;Be>=0;--Be){const yt=w(he[Be],!0);yt.__removalCount=(g.__removalCount||0)+1,X.insertBefore(yt,L(g))}}}return st(g),!0}return g instanceof d&&!Mv(g)||(T==="noscript"||T==="noembed"||T==="noframes")&&we(/<\/no(script|embed|frames)/i,g.innerHTML)?(st(g),!0):(Tn&&g.nodeType===Hn.text&&($=g.textContent,Li([de,Se,Re],X=>{$=Nn($,X," ")}),g.textContent!==$&&(Pn(t.removed,{element:g.cloneNode()}),g.textContent=$)),bt(q.afterSanitizeElements,g,null),!1)},ud=function(g,$,T){if(Jc&&($==="id"||$==="name")&&(T in n||T in Dv))return!1;if(!(Fo&&!Ho[$]&&we(Ft,$))){if(!(Zc&&we(y,$))){if(!(_n.attributeCheck instanceof Function&&_n.attributeCheck($,g))){if(!ue[$]||Ho[$]){if(!(pd(g)&&(te.tagNameCheck instanceof RegExp&&we(te.tagNameCheck,g)||te.tagNameCheck instanceof Function&&te.tagNameCheck(g))&&(te.attributeNameCheck instanceof RegExp&&we(te.attributeNameCheck,$)||te.attributeNameCheck instanceof Function&&te.attributeNameCheck($,g))||$==="is"&&te.allowCustomizedBuiltInElements&&(te.tagNameCheck instanceof RegExp&&we(te.tagNameCheck,T)||te.tagNameCheck instanceof Function&&te.tagNameCheck(T))))return!1}else if(!Wo[$]){if(!we(ht,Nn(T,Le,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&g!=="script"&&iu(T,"data:")===0&&td[g])){if(!(Xc&&!we(Ve,Nn(T,Le,"")))){if(T)return!1}}}}}}}return!0},pd=function(g){return g!=="annotation-xml"&&ia(g,Rs)},md=function(g){bt(q.beforeSanitizeAttributes,g,null);const{attributes:$}=g;if(!$||Xo(g))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ue,forceKeepAttr:void 0};let X=$.length;for(;X--;){const he=$[X],{name:ne,namespaceURI:Be,value:yt}=he,Bn=ae(ne),Qo=yt;let pe=ne==="value"?Qo:su(Qo);if(T.attrName=Bn,T.attrValue=pe,T.keepAttr=!0,T.forceKeepAttr=void 0,bt(q.uponSanitizeAttribute,g,T),pe=T.attrValue,ed&&(Bn==="id"||Bn==="name")&&(Gt(ne,g),pe=Sv+pe),Ps&&we(/((--!?|])>)|<\/(style|title|textarea)/i,pe)){Gt(ne,g);continue}if(Bn==="attributename"&&ia(pe,"href")){Gt(ne,g);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){Gt(ne,g);continue}if(!Qc&&we(/\/>/i,pe)){Gt(ne,g);continue}Tn&&Li([de,Se,Re],gd=>{pe=Nn(pe,gd," ")});const fd=ae(g.nodeName);if(!ud(fd,Bn,pe)){Gt(ne,g);continue}if(E&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Be)switch(h.getAttributeType(fd,Bn)){case"TrustedHTML":{pe=E.createHTML(pe);break}case"TrustedScriptURL":{pe=E.createScriptURL(pe);break}}if(pe!==Qo)try{Be?g.setAttributeNS(Be,ne,pe):g.setAttribute(ne,pe),Xo(g)?st(g):br(t.removed)}catch{Gt(ne,g)}}bt(q.afterSanitizeAttributes,g,null)},jv=function A(g){let $=null;const T=ld(g);for(bt(q.beforeSanitizeShadowDOM,g,null);$=T.nextNode();)bt(q.uponSanitizeShadowNode,$,null),dd($),md($),$.content instanceof a&&A($.content);bt(q.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(A){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,T=null,X=null,he=null;if(Ko=!A,Ko&&(A="<!-->"),typeof A!="string"&&!cd(A))if(typeof A.toString=="function"){if(A=A.toString(),typeof A!="string")throw qn("dirty is not a string, aborting")}else throw qn("toString is not a function");if(!t.isSupported)return A;if(Uo||Zo(g),t.removed=[],typeof A=="string"&&(wi=!1),wi){if(A.nodeName){const yt=ae(A.nodeName);if(!oe[yt]||yi[yt])throw qn("root node is forbidden and cannot be sanitized in-place")}}else if(A instanceof r)$=rd("<!---->"),T=$.ownerDocument.importNode(A,!0),T.nodeType===Hn.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?$=T:$.appendChild(T);else{if(!Sn&&!Tn&&!Ut&&A.indexOf("<")===-1)return E&&qs?E.createHTML(A):A;if($=rd(A),!$)return Sn?null:qs?M:""}$&&Go&&st($.firstChild);const ne=ld(wi?A:$);for(;X=ne.nextNode();)dd(X),md(X),X.content instanceof a&&jv(X.content);if(wi)return A;if(Sn){if(Ns)for(he=V.call($.ownerDocument);$.firstChild;)he.appendChild($.firstChild);else he=$;return(ue.shadowroot||ue.shadowrootmode)&&(he=ce.call(i,he,!0)),he}let Be=Ut?$.outerHTML:$.innerHTML;return Ut&&oe["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&we(xr,$.ownerDocument.doctype.name)&&(Be="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Be),Tn&&Li([de,Se,Re],yt=>{Be=Nn(Be,yt," ")}),E&&qs?E.createHTML(Be):Be},t.setConfig=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Zo(A),Uo=!0},t.clearConfig=function(){An=null,Uo=!1},t.isValidAttribute=function(A,g,$){An||Zo({});const T=ae(A),X=ae(g);return ud(T,X,$)},t.addHook=function(A,g){typeof g=="function"&&Pn(q[A],g)},t.removeHook=function(A,g){if(g!==void 0){const $=tu(q[A],g);return $===-1?void 0:nu(q[A],$,1)[0]}return br(q[A])},t.removeHooks=function(A){q[A]=[]},t.removeAllHooks=function(){q=_r()},t}var Sr=Tr();const la="chaotic_";function Ce(e){try{return localStorage.getItem(la+e)}catch{return null}}function Ne(e,t){try{localStorage.setItem(la+e,t)}catch{}}function Ye(e){try{localStorage.removeItem(la+e)}catch{}}function yu(){return Ce("token")}function wu(e){e?Ne("token",e):Ye("token")}function ku(){return Ce("theme")}function $u(e){Ne("theme",e)}function Lr(){return Ce("last_project")}function Eu(e){Ne("last_project",e)}function xu(){return Ce("onboarding_complete")==="true"}function Iu(){Ne("onboarding_complete","true")}function _u(){Ye("onboarding_complete")}function Tu(e){return e?Ce(`issues_filters_${e}`):null}function Su(e,t){e&&(t?Ne(`issues_filters_${e}`,t):Ye(`issues_filters_${e}`))}function Cr(e){return Ce(`comment_draft_${e}`)}function Bi(e,t){t?Ne(`comment_draft_${e}`,t):Ye(`comment_draft_${e}`)}function Ar(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Di(e){const t=Ce(`description_draft_${e}`);if(!t)return null;const n=Ar(t);return n?n.draft:t}function Br(e){const t=Ce(`description_draft_${e}`);if(!t)return null;const n=Ar(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Bt(e,t,n=""){t?Ne(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Ye(`description_draft_${e}`)}function Dr(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Mr(e){var n;const t=Ce(`document_draft_${e}`);return t?((n=Dr(t))==null?void 0:n.draft)??null:null}function Lu(e){const t=Ce(`document_draft_${e}`);if(!t)return null;const n=Dr(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Mi(e,t,n=null){t&&(t.title||t.content||t.icon)?Ne(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Ye(`document_draft_${e}`)}function Cu(){return{title:Ce("create_issue_title"),description:Ce("create_issue_description")}}function jr(e,t){e?Ne("create_issue_title",e):Ye("create_issue_title"),t?Ne("create_issue_description",t):Ye("create_issue_description")}function Au(){Ye("create_issue_title"),Ye("create_issue_description")}function Bu(){return Ce("doc_view_mode")}function Du(e){Ne("doc_view_mode",e)}function Mu(){return Ce("approvals_explainer_dismissed")==="1"}function ju(){Ne("approvals_explainer_dismissed","1")}const Ru="/api";class Pu{constructor(){this.token=yu()}setToken(t){this.token=t,wu(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Ru}${n}`,a)}catch(d){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=d,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const d=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let d;typeof r.detail=="string"?d=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?d=r.detail.message:d="An error occurred";const c=new Error(d);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,i=null){const s={};return i&&(s.note=i),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,s)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null){const s={};return i&&(s.note=i),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,s)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null){const s={};return i&&(s.note=i),this.request("POST",`/rituals/${t}/attest-issue/${n}`,s)}async completeTicketGateRitual(t,n,i=null){const s={};return i&&(s.note=i),this.request("POST",`/rituals/${t}/complete-issue/${n}`,s)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,i=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:i})}async createProjectAgent(t,n,i=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:i})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const v=new Pu;let zt=null;const Nu='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Vt=null;function U(){Vt=document.activeElement,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function O(){var e;wt(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Vt&&document.contains(Vt)&&typeof Vt.focus=="function"&&Vt.focus(),Vt=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Nu);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function Wt(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`;const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},d=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=d,l=Date.now(),u=setTimeout(o,d);a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-l}),i.addEventListener("mouseleave",()=>{l=Date.now(),u=setTimeout(o,Math.max(c,500))})}function qu(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function x(e,t){const n=qu(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function wt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),zt&&(document.removeEventListener("keydown",zt),zt=null)}function Fn(e){zt&&document.removeEventListener("keydown",zt),zt=e,e&&document.addEventListener("keydown",e)}function Un(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(wt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function $e(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function De(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function ca(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Y(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ou(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function Ze(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function lt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function Hu(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Kt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Hu(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${m(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let Q={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const da=new Set;function ie(e,t){if(typeof e=="string"){const n=Q[e];Q[e]=t,Rr(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=Q[i];Q[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Rr(i,s,a)})}}function Xe(e){return da.add(e),()=>da.delete(e)}function Rr(e,t,n){t!==n&&da.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const Dt=()=>Q.currentUser,ji=e=>ie("currentUser",e),S=()=>Q.currentView,Fu=e=>ie("currentView",e),Me=()=>Q.issues,Qe=e=>ie("issues",e),Ri=()=>Q.detailNavContext,Yt=e=>ie("detailNavContext",e),Pr=()=>Q.labels,Pi=e=>ie("labels",e),Nr=()=>Q.activeFilterCategory,Uu=e=>ie("activeFilterCategory",e),qr=()=>Q.selectedIssueIndex,Gn=e=>ie("selectedIssueIndex",e),Gu=()=>Q.selectedDocIndex,Or=e=>ie("selectedDocIndex",e),Hr=()=>Q.selectedBoardIndex,Ni=e=>ie("selectedBoardIndex",e),zu=()=>Q.selectedInboxIndex,Vu=e=>ie("selectedInboxIndex",e),Wu=()=>Q.pendingGates,Ku=e=>ie("pendingGates",e),ua=()=>Q.inboxEntries,pa=e=>ie("inboxEntries",e),Fr=()=>Q.inboxUnreadCount,ma=e=>ie("inboxUnreadCount",e),Yu=()=>Q.searchDebounceTimer,Zu=e=>ie("searchDebounceTimer",e),Xu=()=>Q.websocket,Ur=e=>ie("websocket",e),C=()=>Q.currentTeam,fa=e=>ie("currentTeam",e),z=()=>Q.currentProject,Fe=e=>ie("currentProject",e||null),se=()=>Q.currentDetailIssue,qi=e=>ie("currentDetailIssue",e),Qu=()=>Q.currentDetailSprints,Gr=e=>ie("currentDetailSprints",e),ga={};function ee(e){Object.assign(ga,e)}function Ju(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=ga[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let zr=!1;function ep(){if(!zr){zr=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Ju);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=ga[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const ha=["backlog","todo","in_progress","in_review","done","canceled"],Zt=["backlog","todo","in_progress","in_review"],Vr=["urgent","high","medium","low","no_priority"],va=["no_priority","urgent","high","medium","low"],Wr=["backlog","todo","in_progress","in_review","done"];function N({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,d])=>` data-${p(r)}="${p(d)}"`).join(""):""}>${m(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${m(t)}</h3>
            <p>${m(n)}</p>
            ${a}
        </div>
    `}const j={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'};let zn=[];function tp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function np(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function Oi(e,t){const n=e().map(tp),i=t().map(np);zn=[...n,...i]}function Vn(e){return e&&zn.find(t=>t.id===e)||null}function Mt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function ba(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${i}`}function Hi(){const e=zn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));zn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const i=[];e.forEach(a=>{i.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,d)=>r.name.localeCompare(d.name)),o.forEach(r=>i.push({assignee:r,indent:!0}))});const s=zn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return s.sort((a,o)=>a.name.localeCompare(o.name)),s.forEach(a=>i.push({assignee:a,indent:!1})),i}function Fi(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;Hi().forEach(({assignee:i,indent:s})=>{n+=`<option value="${i.id}">${ba(i,s)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function Xt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Qt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Jt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function en(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Kr(){const e=document.getElementById("group-by-select");return e?e.value:""}const Yr=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Ui=["done","canceled"];function Zr(e){var t,n,i;switch(e){case"project":return z()?1:0;case"status":return Xt().length;case"priority":return Qt().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Jt().length;case"exclude_labels":return en().length;default:return 0}}function ya(){let e=0;return Yr.forEach(t=>{e+=Zr(t.key)}),e}function Xr(){var h,b,w,I,L,R;const e=new URLSearchParams,t=Xt(),n=Qt(),i=Jt(),s=en(),a=(h=document.getElementById("assignee-filter"))==null?void 0:h.value,o=z()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,d=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,c=(I=document.getElementById("group-by-select"))==null?void 0:I.value,l=(L=document.getElementById("sort-by-select"))==null?void 0:L.value;t.forEach(B=>e.append("status",B)),n.forEach(B=>e.append("priority",B)),i.forEach(B=>e.append("label",B)),s.forEach(B=>e.append("exclude_label",B)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),d&&e.set("issue_type",d),c&&e.set("groupBy",c),l&&l!=="created-desc"&&e.set("sort",l);const u=e.toString(),f=u?`/issues?${u}`:"/issues";history.replaceState({view:"issues"},"",f),Su((R=C())==null?void 0:R.id,u)}function ip(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=Tu((b=C())==null?void 0:b.id);if(w){t=new URLSearchParams(w);const I=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",I)}}const s=t.getAll("status");if(s.length>0){const w=document.getElementById("status-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.checked=s.includes(L.value)}),Qr())}const a=t.getAll("priority");if(a.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.checked=a.includes(L.value)}),Jr())}const o=t.get("assignee");if(o){const w=document.getElementById("assignee-filter");w&&(w.value=o)}const r=t.get("project");r&&(e(!0),Fe(r),e(!1));const d=t.get("sprint");if(d){const w=document.getElementById("sprint-filter");w&&(w.value=d)}const c=t.get("issue_type");if(c){const w=document.getElementById("issue-type-filter");w&&(w.value=c)}const l=t.getAll("label");if(l.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.checked=l.includes(L.value)}),Gi())}const u=t.getAll("exclude_label");if(u.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.checked=u.includes(L.value)}),zi())}const f=t.get("groupBy");if(f){const w=document.getElementById("group-by-select");w&&(w.value=f)}const h=t.get("sort");if(h){const w=document.getElementById("sort-by-select");w&&(w.value=h)}}function Qr(){const e=Xt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=$e(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Jr(){const e=Qt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=De(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Gi(){var i,s;const e=Jt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function zi(){var i,s;const e=en(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function el(){if(!C())return;let e;try{e=await v.getLabels(C().id)}catch(t){console.error("Failed to load labels for filter:",t);return}tl("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),tl("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function tl(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const d=document.createElement("label");d.className="multi-select-option",d.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${Y(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${m(r.name)}</span>
                </span>
            `,a.appendChild(d)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Vi(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",nl)},0))}function nl(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",nl))}function sp(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",tn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),me(),Ee(Nr()),setTimeout(()=>{document.addEventListener("click",tn)},0))}function ap(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",tn)):(e.classList.remove("hidden"),gp(),setTimeout(()=>{document.addEventListener("click",tn)},0))}function tn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",tn))}function jt(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",tn)}function me(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=z();e.innerHTML=Yr.map(n=>{const i=Zr(n.key),s=Nr()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ee(e){Uu(e),me();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":rp(t);break;case"status":lp(t);break;case"priority":cp(t);break;case"type":dp(t);break;case"assignee":up(t);break;case"sprint":pp(t);break;case"labels":mp(t);break;case"exclude_labels":fp(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function op(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),me()}function rp(e){const t=z()||"",n=J()||[];let i=`
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
                <span class="filter-option-label">${m(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function lp(e){const t=Xt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=Zt.every(o=>t.includes(o))&&!Ui.some(o=>t.includes(o))&&t.length===Zt.length,s=Ui.every(o=>t.includes(o))&&!Zt.some(o=>t.includes(o))&&t.length===Ui.length;let a=`
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
        `}),e.innerHTML=a}function cp(e){const t=Qt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function dp(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function up(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=Ot()||[];let s=`
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
                <span class="filter-option-label">${m(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=s}function pp(e){if(!z()){e.innerHTML=`
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
                <span class="filter-option-label">${m(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function mp(e){const t=Jt(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),d=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",l=(d==null?void 0:d.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Y(l)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function fp(e){const t=en(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),d=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",l=(d==null?void 0:d.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Y(l)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function gp(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(d=>`
                <div class="display-option ${i===d.value?"active":""}" data-action="set-sort" data-value="${p(d.value)}">
                    <span>${d.label}</span>
                    ${i===d.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(d=>`
                <div class="display-option ${s===d.value?"active":""}" data-action="set-group-by" data-value="${p(d.value)}">
                    <span>${d.label}</span>
                    ${s===d.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function xe(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=z();if(n){const f=(J()||[]).find(h=>h.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const i=Xt();if(i.length>0){const u=i.map(f=>$e(f)).join(", ");t.push({category:"status",label:"Status",value:u,clearAction:"clear-status-filter-new"})}const s=Qt();if(s.length>0){const u=s.map(f=>De(f)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const h=(Ot()||[]).find(b=>b.user_id===o.value);u=(h==null?void 0:h.name)||(h==null?void 0:h.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const d=Jt();if(d.length>0){const u=document.getElementById("label-filter-dropdown"),f=d.map(h=>{var I;const b=u==null?void 0:u.querySelector(`input[value="${h}"]`),w=(I=b==null?void 0:b.closest("label"))==null?void 0:I.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const c=en();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),f=c.map(h=>{var I;const b=u==null?void 0:u.querySelector(`input[value="${h}"]`),w=(I=b==null?void 0:b.closest("label"))==null?void 0:I.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${m(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=l}function Ie(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=ya();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function il(){const e=document.getElementById("sprint-filter");if(!e)return;const t=z(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",wa(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await v.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${m(a.name)})</option>`),Ql(t,a==null?void 0:a.id),wa(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${m(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function wa(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function sl(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let al=!1;Xe(e=>{if(e!=="currentProject"||S()!=="issues"||al)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([il(),el()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Gi(),zi(),je(),xe(),Ie()}).catch(n=>{console.error("Failed to update filters on project switch:",n),je(),xe(),Ie()})});function hp(){ip(e=>{al=e})}function Wi(){Qr(),je(),xe(),Ie()}function ka(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Wi()}function $a(){Jr(),je(),xe(),Ie()}function Ea(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),$a()}function xa(){Gi(),je(),xe(),Ie()}function Ki(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),xa()}function Ia(){zi(),je(),xe(),Ie()}function Yi(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ia()}function vp(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function ol(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${vp(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Zi=0;async function ct(){var f,h,b,w,I,L,R;Gn(-1);const e=++Zi;if(!C())return;const t=z()||"",n=Xt(),i=Qt(),s=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,a=(b=(h=document.getElementById("issue-search"))==null?void 0:h.value)==null?void 0:b.trim();if(!t&&J().length===0){document.getElementById("issues-list").innerHTML=N({icon:j.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}sl();const o={limit:1e3},r=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[d,c]=r.includes("-")?r.split("-"):[r,null];o.sort_by=d,c&&(o.order=c),n.length>0&&(o.status=n),i.length>0&&(o.priority=i),s&&(s==="me"?o.assignee_id=(I=Dt())==null?void 0:I.id:o.assignee_id=s);const l=(L=document.getElementById("sprint-filter"))==null?void 0:L.value;if(l)if(l==="current"){if(t){const B=If(t);if(B!==void 0)B&&(o.sprint_id=B);else try{const M=(await v.getSprints(t)).find(_=>_.status==="active");Ql(t,M==null?void 0:M.id),M&&(o.sprint_id=M.id)}catch(E){console.error("Failed to resolve current sprint:",E)}}}else o.sprint_id=l;const u=(R=document.getElementById("issue-type-filter"))==null?void 0:R.value;u&&(o.issue_type=u),a&&a.length>=1&&(o.search=a);try{const B=ol(Jt(),"label-filter-dropdown");B.length>0&&(o.label=B,o.label_match="any");const E=ol(en(),"exclude-label-filter-dropdown");E.length>0&&(o.exclude_label=E);let M;if(t?(o.project_id=t,M=await v.getIssues(o)):J().length>0&&(M=await v.getTeamIssues(C().id,o)),e!==Zi)return;Qe(M),S()==="issues"&&Yt(M);const _=[...new Set(M.map(H=>H.project_id))];if(await Xl(_),e!==Zi)return;dt()}catch(B){if(e!==Zi)return;const E=document.getElementById("issues-list");E&&(E.innerHTML=N({icon:j.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),x("load issues",B)}}function bp(){clearTimeout(Yu()),Zu(setTimeout(()=>{ct()},300))}function je(){Xr(),ct()}async function rl(){if(Xr(),Kr()==="sprint"){const e=Me(),t=[...new Set(e.map(n=>n.project_id))];await Xl(t)}dt()}function yp(){xe(),Ie()}function ll(e){Fe(e),me(),Ee("project"),jt()}function wp(){ll("")}function kp(e){const t=e==="open"?Zt:Ui,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Wi(),me(),Ee("status")}function $p(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Wi()),me(),Ee("status")}function Ep(){ka(),me(),Ee("status"),xe(),Ie()}function xp(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,$a()),me(),Ee("priority")}function Ip(){Ea(),me(),Ee("priority"),xe(),Ie()}function cl(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,je()),me(),Ee("type"),xe(),Ie(),jt()}function _p(){cl("")}function dl(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,je()),me(),Ee("assignee"),xe(),Ie(),jt()}function Tp(){dl("")}function ul(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,je()),me(),Ee("sprint"),xe(),Ie(),jt()}function Sp(){ul("")}function Lp(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,xa()),me(),Ee("labels")}function Cp(){Ki(),me(),Ee("labels"),xe(),Ie()}function Ap(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ia()),me(),Ee("exclude_labels")}function Bp(){Yi(),me(),Ee("exclude_labels"),xe(),Ie()}function Dp(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,ct()),jt()}function Mp(e){const t=document.getElementById("group-by-select");t&&(t.value=e,rl()),jt()}function jp(){Fe(null),ka(),Ea();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Ki(),Yi(),je(),xe(),Ie()}ee({"update-label-filter":()=>xa(),"clear-label-filter":()=>Ki(),"update-exclude-label-filter":()=>Ia(),"clear-exclude-label-filter":()=>Yi(),"show-filter-category":(e,t)=>{var n,i;Ee(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{op();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>ll(t.value),"clear-project-filter":()=>wp(),"clear-status-filter-new":()=>Ep(),"set-status-preset":(e,t)=>kp(t.value),"toggle-status-option":(e,t)=>$p(t.filterValue,e),"clear-priority-filter-new":()=>Ip(),"toggle-priority-option":(e,t)=>xp(t.filterValue,e),"set-type-filter":(e,t)=>cl(t.value),"clear-type-filter":()=>_p(),"set-assignee-filter":(e,t)=>dl(t.value),"clear-assignee-filter":()=>Tp(),"set-sprint-filter":(e,t)=>ul(t.value),"clear-sprint-filter":()=>Sp(),"clear-label-filter-new":()=>Cp(),"toggle-label-option":(e,t)=>Lp(t.filterValue,e),"clear-exclude-label-filter-new":()=>Bp(),"toggle-exclude-label-option":(e,t)=>Ap(t.filterValue,e),"set-sort":(e,t)=>Dp(t.value),"set-group-by":(e,t)=>Mp(t.value),"clear-all-filters":()=>jp(),"retry-load-issues":()=>ct()});let nn=[],_a=[];Xe(e=>{e==="currentProject"&&S()==="my-issues"&&(an(),Kn(),on())});function kt(){return nn}function sn(e){nn=e}let Ta=0;async function an(){var a;const e=C(),t=Dt();if(!e||!t)return;const n=++Ta,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=z();Pp();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await v.getIssues({...o,project_id:s}):r=await v.getTeamIssues(e.id,o),n!==Ta)return;nn=r,S()==="my-issues"&&Yt(nn),Wn()}catch(o){if(n!==Ta)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=N({icon:j.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),x("load issues",o)}}async function on({showLoading:e=!0}={}){const t=C();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=z();_a=await v.getTeamActivities(t.id,0,10,{projectId:i}),Rp()}catch{n&&(n.innerHTML=N({icon:j.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function Rp(){const e=document.getElementById("dashboard-activity-list");if(e){if(!_a.length){e.innerHTML=N({icon:j.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=_a.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Ra(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Na(t)}${n}</span>
                <span class="activity-actor">by ${m(Pa(t))}</span>
                <span class="activity-time">${Ze(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Pp(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function pl(){an()}function Wn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),nn.length===0){e.innerHTML=N({icon:j.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=nn.map(t=>Ue(t)).join("")}}let Sa=0;async function Kn(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Sa,n=z(),i=J(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const d=await v.getCurrentSprint(r.id);if(!d)return null;let c={};try{const l=await v.getIssues({sprint_id:d.id,project_id:r.id,limit:500});for(const u of l)c[u.status]=(c[u.status]||0)+1}catch(l){console.error(`Failed to load issue counts for sprint ${d.id}:`,l)}return{project:r,sprint:d,statusCounts:c}}catch(d){return console.error(`Failed to load current sprint for project ${r.id}:`,d),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==Sa)return;Np(o)}catch(a){if(t!==Sa)return;console.error("Failed to load sprint status:",a),e.innerHTML=N({icon:j.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function Np(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,d=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,l=s.limbo?"limbo":c?"arrears":"",u=a||{},f=Object.values(u).reduce((h,b)=>h+b,0);return`
                    <div class="sprint-status-card ${l}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${m(i.name)}</span>
                            ${s.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${c?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${m(s.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${l}" style="width: ${d}%"></div>
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
                                    ${n.filter(h=>u[h]).map(h=>{const b=Math.round(u[h]/f*100);return`<div class="sprint-stacked-segment status-${h}" style="width: ${b}%" title="${$e(h)}: ${u[h]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(h=>u[h]).map(h=>`<span class="sprint-count-label status-${h}">${u[h]} ${$e(h)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}ee({"filter-my-issues":()=>pl(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),yc(t.identifier)},"retry-load-my-issues":()=>an(),"retry-load-sprint-status":()=>Kn()});const ml=ha,qp=["task","bug","feature","chore","docs","tech_debt","epic"];let Je=[],fl=Promise.resolve();function gl(){return Je}function hl(e){Je=e}async function La(e,t,n,i){var u,f;e.preventDefault(),wt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${ml.map((h,b)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${h}">
                    ${_e(h)}
                    <span>${$e(h)}</span>
                    <span class="dropdown-shortcut">${b+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${va.map((h,b)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${h}">
                    ${et(h)}
                    <span>${De(h)}</span>
                    <span class="dropdown-shortcut">${b}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${qp.map(h=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${h}">
                    <span class="issue-type-badge type-${h}">${lt(h)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const h=Hi();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${h.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:h.map(({assignee:b,indent:w},I)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(b.id)}">
                    ${Kt(b,"avatar-small")}
                    <span>${ba(b,w)}</span>
                    ${I<9?`<span class="dropdown-shortcut">${I+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const h=document.querySelector(`.issue-row[data-issue-id="${n}"]`),b=(h==null?void 0:h.dataset.projectId)||((u=se())==null?void 0:u.project_id),w=vn(b);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${w.map((I,L)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${I.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${I.label}</span>
                    ${L<9?`<span class="dropdown-shortcut">${L}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const h=Me(),b=kt(),w=se(),I=h.find(ce=>ce.id===n)||b.find(ce=>ce.id===n)||w,L=new Set(((I==null?void 0:I.labels)||[]).map(ce=>ce.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const R=o.getBoundingClientRect();let B=a.bottom+4,E=a.left;E+R.width>window.innerWidth-8&&(E=a.right-R.width),B+R.height>window.innerHeight-8&&(B=a.top-R.height-4),o.style.top=`${B}px`,o.style.left=`${Math.max(8,E)}px`,Un(o,{multiSelect:!0});let M=[];const _=C();if(_)try{M=await v.getLabels(_.id)}catch(ce){console.error("Failed to load labels:",ce)}if(!o.parentNode)return;bl(o,n,M,L);const H=o.getBoundingClientRect();let V=a.bottom+4,Ae=a.left;Ae+H.width>window.innerWidth-8&&(Ae=a.right-H.width),V+H.height>window.innerHeight-8&&(V=a.top-H.height-4),o.style.top=`${V}px`,o.style.left=`${Math.max(8,Ae)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const h=Me(),b=kt(),w=se(),I=h.find(q=>q.id===n)||b.find(q=>q.id===n)||w,L=(I==null?void 0:I.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const R=o.getBoundingClientRect();let B=a.bottom+4,E=a.left;E+R.width>window.innerWidth-8&&(E=a.right-R.width),B+R.height>window.innerHeight-8&&(B=a.top-R.height-4),o.style.top=`${B}px`,o.style.left=`${Math.max(8,E)}px`,Un(o);let M=[];if(L)try{M=await v.getSprints(L),xf(L,M)}catch(q){console.error("Failed to load sprints:",q)}if(!o.parentNode)return;const _=M.filter(q=>q.status!=="completed"||q.id===(I==null?void 0:I.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${_.map((q,de)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(q.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(q.name)}${q.status==="active"?" (Active)":""}</span>
                    ${de<9?`<span class="dropdown-shortcut">${de+1}</span>`:""}
                </button>
            `).join("")}
        `;const H=o.getBoundingClientRect();let V=a.bottom+4,Ae=a.left;Ae+H.width>window.innerWidth-8&&(Ae=a.right-H.width),V+H.height>window.innerHeight-8&&(V=a.top-H.height-4),o.style.top=`${V}px`,o.style.left=`${Math.max(8,Ae)}px`,o.classList.remove("dropdown-positioning");const ce=q=>{const de=q.key;if(de==="Escape"||de==="Tab"){wt(),document.removeEventListener("keydown",ce),Fn(null);return}const Se=parseInt(de);if(isNaN(Se))return;const Re=o.querySelectorAll(".dropdown-option");let Ft=!1;Se===0?(rn(n,"sprint_id",null),Ft=!0):Se>=1&&Se<Re.length&&(Re[Se].click(),Ft=!0),Ft&&(document.removeEventListener("keydown",ce),Fn(null))};Fn(ce),document.addEventListener("keydown",ce);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let d=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),d+r.height>window.innerHeight-8&&(d=a.top-r.height-4),o.style.top=`${d}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const l=h=>{const b=h.key;if(b==="Escape"||b==="Tab"){wt(),document.removeEventListener("keydown",l);return}const w=parseInt(b);if(isNaN(w))return;let I=!1;if(t==="status"&&w>=1&&w<=6)rn(n,"status",ml[w-1]),I=!0;else if(t==="priority"&&w>=0&&w<=4)rn(n,"priority",va[w]),I=!0;else if(t==="estimate"){const L=se(),R=vn(L==null?void 0:L.project_id);w>=0&&w<R.length&&(rn(n,"estimate",R[w].value),I=!0)}I&&(document.removeEventListener("keydown",l),Fn(null))};Fn(l),document.addEventListener("keydown",l),Un(o)}function Op(e,t,n,i){La(e,t,n,i)}function Hp(e,t,n){fl=fl.then(()=>vl(e,t,n))}async function vl(e,t,n){const i=Me(),s=kt(),a=se(),o=i.find(l=>l.id===e)||s.find(l=>l.id===e)||a;if(!o)return;const r=(o.labels||[]).map(l=>l.id),d=r.indexOf(t);let c;if(d>=0?c=r.filter(l=>l!==t):c=[...r,t],n){const l=d<0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}try{const u=(await v.updateIssue(e,{label_ids:c})).labels||[],f=i.findIndex(I=>I.id===e);f!==-1&&(i[f].labels=u,Qe([...i]));const h=s.findIndex(I=>I.id===e);h!==-1&&(s[h].labels=u,sn([...s])),(a==null?void 0:a.id)===e&&qi({...a,labels:u});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const I=i.find(L=>L.id===e)||s.find(L=>L.id===e);I&&(b.outerHTML=Ue(I))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=u.length>0?u.map(I=>`
                    <span class="issue-label" style="background: ${Y(I.color)}20; color: ${Y(I.color)}">${m(I.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(l){if(x("update labels",l),n){const u=d>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function bl(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${Y(s.color)}20; color: ${Y(s.color)}">${m(s.name)}</span>
                </button>
            `}).join("")}
    `}async function yl(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=C();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await v.createLabel(i.id,{name:s}),o=await v.getLabels(i.id);Pi(o),a!=null&&a.id&&await vl(e,a.id,null);const r=Me(),d=kt(),c=se(),l=r.find(f=>f.id===e)||d.find(f=>f.id===e)||c,u=new Set(((l==null?void 0:l.labels)||[]).map(f=>f.id));t&&bl(t,e,o,u),n.value=""}catch(a){x("create label",a)}finally{n.disabled=!1,n.focus()}}}function Xi(){const e=document.getElementById("create-issue-labels-label");e&&(Je.length===0?e.textContent="Labels":e.textContent=`Labels (${Je.length})`)}function Ca(e,{failed:t=!1}={}){const n=Pr();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=Je.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${Y(i.color)}20; color: ${Y(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}function Fp(e){const t=Je.indexOf(e);t>=0?Je.splice(t,1):Je.push(e),Xi();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Ca(n)}async function wl(){const e=C();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await v.createLabel(e.id,{name:i}),a=await v.getLabels(e.id);Pi(a),s!=null&&s.id&&!Je.includes(s.id)&&Je.push(s.id),Xi(),t&&Ca(t),n.value=""}catch(s){x("create label",s)}finally{n.disabled=!1,n.focus()}}}async function rn(e,t,n){wt();const i=document.querySelector(`.issue-row[data-issue-id="${e}"]`);i&&i.classList.add("updating");try{const s={};s[t]=n;const a=await v.updateIssue(e,s);if(!a||!a.id)throw new Error("Invalid response from server");const o=Me(),r=o.findIndex(u=>u.id===e);r!==-1&&(o[r]=a,Qe([...o]));const d=kt(),c=d.findIndex(u=>u.id===e);c!==-1&&(d[c]=a,sn([...d]));const l=se();if((l==null?void 0:l.id)===e&&qi(a),i&&i.parentNode){const u=o.find(f=>f.id===e)||d.find(f=>f.id===e)||a;if(u){i.outerHTML=Ue(u);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);f&&(f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500))}}if(k("Issue updated","success"),t==="status"){const u=z();if(u)try{const h=(await v.getSprints(u)).find(b=>b.status==="active");wa(h||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&Up(t,a)}}catch(s){x("update issue",s),i&&i.classList.remove("updating")}}function Up(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const d of a){const c=d.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=d;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${_e(t.status)}
            <span>${$e(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${et(t.priority)}
            <span>${De(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${lt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const d=t.assignee_id?Vn(t.assignee_id):null,c=d?Mt(d):null;r.innerHTML=c?`${Kt(d,"avatar-small")}<span>${m(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const d=Qu(),c=t.sprint_id&&d?d.find(l=>l.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?m(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${ws(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}ee({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?rn(t.issueId,i,n==="null"?null:Number(n)):rn(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{Hp(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{yl(t.issueId)},"toggle-create-issue-label":(e,t)=>{Fp(t.labelId)},"create-label-for-create-issue":()=>{wl()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),yl(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),wl())}});const kl=["task","bug","feature","chore","docs","tech_debt","epic"];function $t(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function ln(e){const t=$t(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function dt(){var s,a,o;const e=document.getElementById("issues-list");if(!e)return;const t=(s=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:s.dataset.issueId;e.classList.add("issue-list-linear");const n=Me();if(n.length===0){const r=(o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim(),d=ya()>0,c=r&&r.length>=2;if(d||c){const l=ya(),u=[];c&&u.push(`search "${r}"`),d&&u.push(`${l} active filter${l>1?"s":""}`),e.innerHTML=N({icon:j.issues,heading:"No matching issues",description:`No issues match your ${u.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=N({icon:j.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Gn(-1);return}const i=Kr();i==="status"?zp(e,n):i==="priority"?Vp(e,n):i==="type"?Wp(e,n):i==="assignee"?Kp(e,n):i==="sprint"?Yp(e,n):e.innerHTML=ln(n)+n.map(r=>Ue(r)).join(""),Gp(t)}function Gp(e){const t=qr();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){Gn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Gn(i),n[i].classList.add("keyboard-selected")}function zp(e,t){const n={};ha.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=ln(t);ha.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${_e(s)}</span>
                    <span class="group-title">${$e(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${$t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function Vp(e,t){const n={};Vr.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=ln(t);Vr.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${et(s)}</span>
                    <span class="group-title">${De(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${$t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function Wp(e,t){const n={};kl.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=ln(t);kl.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${lt(s)}</span></span>
                    <span class="group-title">${lt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${$t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function Kp(e,t){const n={},i="__unassigned__";n[i]=[];const s=Hi();s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=ln(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${$t(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[i].map(o=>Ue(o)).join("")}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const d=Mt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Kt(o,"avatar-small")}</span>
                    <span class="group-title">${m(d)}${m(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${$t(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(l=>Ue(l)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Yp(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(d=>{d.sprint_id?(i[d.sprint_id]||(i[d.sprint_id]=[],s.push(d.sprint_id)),i[d.sprint_id].push(d)):i[n].push(d)});const a={active:0,planned:1,completed:2},o=Yl();s.sort((d,c)=>{const l=o[d],u=o[c],f=l?a[l.status]??3:3,h=u?a[u.status]??3:3;return f-h});let r=ln(t);s.forEach(d=>{const c=i[d];if(c.length===0)return;const l=o[d],u=l?l.name:d,f=l?l.status==="active"?" (Active)":l.status==="completed"?" (Done)":"":"",h=d.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${h}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${h}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(u)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${$t(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${c.map(b=>Ue(b)).join("")}
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
                    <span class="group-points">${$t(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${i[n].map(d=>Ue(d)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function Zp(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function $l(e,t){if(!e)return"";if(!t)return m(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return m(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${m(i)}<mark class="search-match">${m(s)}</mark>${m(a)}`}function Xp(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=$l(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}function Ue(e){var u,f,h;const t=e.assignee_id?Vn(e.assignee_id):null,n=t?Mt(t):null,i=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),s=e.estimate?ws(e.estimate,e.project_id):"",a=so(e.estimate,e.project_id),o=e.sprint_id?Yl()[e.sprint_id]:null,r=o?o.name:null,d=(f=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:f.trim(),c=!!d&&((h=e.title)==null?void 0:h.toLowerCase().includes(d.toLowerCase())),l=d&&!c?Xp(e.description,d):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${De(e.priority)}">
                    ${et(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${$e(e.status)}">
                    ${_e(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${lt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${$l(e.title,d)}${l?` <span class="issue-search-snippet" title="Matched in description">— ${l}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(b=>`
                            <span class="issue-label" style="background: ${Y(b.color)}20; color: ${Y(b.color)}">${m(b.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${p(e.id)}" title="Sprint: ${r?m(r):"None"}">
                    ${r?`<span class="sprint-badge">${m(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${p(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${s||"None"}`}">
                    ${s?`<span class="estimate-badge${a?" out-of-scale":""}">${s}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${i}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${p(e.id)}" title="${p(n||"Unassigned")}">
                    ${n?Kt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function et(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function _e(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ee({"toggle-group":(e,t)=>{Zp(t.group)},"show-inline-dropdown":(e,t,n)=>{La(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),W(t.issueId))}});function Qp(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Aa(e="new-comment",t="mention-suggestions"){const n=document.getElementById(e),i=document.getElementById(t);if(!n||!i||n.dataset.mentionsBound==="true")return;n.dataset.mentionsBound="true";let s=-1;const a=()=>{i.classList.add("hidden"),i.innerHTML="",s=-1},o=c=>{var u,f;const l=i.querySelectorAll(".mention-suggestion");l.length!==0&&(s=(c%l.length+l.length)%l.length,l.forEach((h,b)=>h.classList.toggle("highlighted",b===s)),(f=(u=l[s]).scrollIntoView)==null||f.call(u,{block:"nearest"}))},r=c=>{const l=n.selectionStart||0,u=n.value.slice(0,l).replace(/@([a-zA-Z0-9._-]*)$/,`@${c} `),f=n.value.slice(l);n.value=u+f,n.focus(),a()},d=()=>{const c=n.selectionStart||0,u=n.value.slice(0,c).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!u){a();return}const f=u[2].toLowerCase(),h=Ot().map(b=>({id:b.id,name:b.name||b.email||"User",email:b.email||"",handle:Qp(b)})).filter(b=>!f||b.handle.includes(f)||b.name.toLowerCase().includes(f)||b.email.toLowerCase().includes(f)).slice(0,6);if(!h.length){a();return}i.innerHTML=h.map(b=>`
            <button type="button" class="mention-suggestion" data-handle="${p(b.handle)}">
                <span class="mention-name">${m(b.name)}</span>
                <span class="mention-handle">@${m(b.handle)}</span>
            </button>
        `).join(""),i.classList.remove("hidden"),i.querySelectorAll(".mention-suggestion").forEach((b,w)=>{b.addEventListener("click",()=>r(b.dataset.handle)),b.addEventListener("mouseenter",()=>o(w))}),o(0)};n.addEventListener("input",d),n.addEventListener("click",d),n.addEventListener("keydown",c=>{const l=!i.classList.contains("hidden");if(c.key==="Escape"&&l){c.preventDefault(),c.stopPropagation(),a();return}if(l){if(c.key==="ArrowDown")c.preventDefault(),o(s+1);else if(c.key==="ArrowUp")c.preventDefault(),o(s-1);else if(c.key==="Enter"||c.key==="Tab"){const f=i.querySelectorAll(".mention-suggestion")[s];f&&(c.preventDefault(),r(f.dataset.handle))}}}),n.addEventListener("blur",()=>{setTimeout(a,150)})}const El=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Yn(e=null){const t=e||z()||"";hl([]);const n=J().map(o=>`
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
                            ${El.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${_e("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${et("no_priority")}
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
    `,U(),Xi();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Cu();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{jr(i.value,s.value)}),s.addEventListener("input",()=>{jr(i.value,s.value)}),i.focus()}function Jp(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function em(e){const t=El.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function tm(e,t){const n=J().find(i=>i.id===t);hl([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                            ${_e("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${et("no_priority")}
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
    `,U(),Xi(),document.getElementById("create-issue-title").focus()}async function nm(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,c=d?parseInt(d):null;if(!n){k("Please enter a title","error");return}try{const l=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:gl(),parent_id:e});O(),k(`Created sub-issue ${l.identifier}`,"success"),W(e)}catch(l){x("create sub-issue",l)}}async function im(e,t,n){var o,r;wt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const d=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Wr.map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p($e(c))}">
                    ${_e(c)}
                    <span>${$e(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const d=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${va.map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(De(c))}">
                    ${et(c)}
                    <span>${De(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const d=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(lt(c))}">
                    <span class="issue-type-badge type-${c}">${lt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!C())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let d=Pr(),c=!1;if(d.length===0)try{d=await v.getLabels(C().id),Pi(d)}catch(l){console.error("Failed to load labels:",l),c=!0}Ca(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Un(a,{multiSelect:!0});return}else if(e==="assignee"){const d=document.getElementById("create-issue-assignee").value,c=Hi();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:l,indent:u})=>{const f=Mt(l)||"User";return`
                <button class="dropdown-option ${l.id===d?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(l.id)}" data-label="${p(f)}">
                    ${Kt(l,"avatar-small")}
                    <span>${ba(l,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const d=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,l=vn(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(u=>{const f=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${f===d?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(f)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${m(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const d=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await v.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(f=>`
                        <button class="dropdown-option ${f.id===d?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${p(f.id)}" data-label="${p(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${m(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Un(a)}function sm(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function am(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const i=m(n);if(e==="status"){const s=document.querySelector(".toolbar-btn:first-child");s.innerHTML=`${_e(t)}<span id="create-issue-status-label">${i}</span>`}else if(e==="priority"){const s=document.querySelectorAll(".toolbar-btn")[1];s.innerHTML=`${et(t)}<span id="create-issue-priority-label">${i}</span>`}else if(e==="type"){const s=document.getElementById("create-issue-type-btn");s&&(s.innerHTML=`<span class="issue-type-badge type-${t}">${lt(t)}</span><span id="create-issue-type-label">${i}</span>`)}wt()}async function xl({keepOpen:e=!1}={}){var w,I;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,c=d?parseInt(d):null,l=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,u=(I=document.getElementById("create-issue-due-date"))==null?void 0:I.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const h=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");h&&(h.disabled=!0),b&&(b.disabled=!0);try{const L=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:l,label_ids:gl(),due_date:f});k(`Created ${L.identifier}`,"success"),Au(),S()==="issues"?ct():S()==="my-issues"&&an(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(O(),W(L.id))}catch(L){x("create issue",L)}finally{h&&(h.disabled=!1),b&&(b.disabled=!1)}}async function om(){await xl({keepOpen:!1})}async function rm(){await xl({keepOpen:!0})}ee({"toggle-create-dropdown":(e,t,n)=>{im(t.dropdownType,e,n)},"set-create-field":(e,t)=>{am(t.field,t.value,t.label)},"create-issue-submit":()=>{om()},"create-issue-and-new":()=>{rm()},"update-create-project":()=>{sm()},"apply-template":e=>{em(e.target.value)},"toggle-create-options":()=>{Jp()},"create-sub-issue-submit":(e,t)=>{nm(t.parentId,t.projectId)}});async function Il(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),s=vn(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${m(o.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${p(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${p(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
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
                        ${s}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${n.filter(o=>o.status!=="completed").map(o=>`
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${m(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,U();const a=document.getElementById("edit-issue-description");if(a){const o=Di(e);if(o){const r=Br(e),d=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,d&&(d.textContent="Restored your unsaved description draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",d.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?Bt(e,r,t.description||""):Bt(e,null)})}}catch(t){x("load issue",t)}}async function lm(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),d=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",status:s.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:d&&d.value?d.value:null};await v.updateIssue(t,c),Di(t)===c.description&&Bt(t,null),O(),await W(t),k("Issue updated!","success")}catch(n){x("update issue",n)}}async function cm(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await ct(),await qe(),D("issues"),k("Issue deleted!","success")}catch(t){x("delete issue",t)}}ee({"update-issue":(e,t)=>{lm(e,t.issueId)}});let re=null,_l=!1,cn=!1,Tl="new-comment";function dm(){return re||(re=document.createElement("div"),re.className="quote-tooltip",re.setAttribute("role","button"),re.setAttribute("tabindex","0"),re.setAttribute("aria-label","Quote selection in comment"),re.textContent="Quote",re.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Qi())}),re.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),re.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Qi()}),document.body.appendChild(re),re)}function Sl(e,t){const n=dm();n.style.display="flex",cn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!cn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Zn(){re&&(re.style.display="none"),cn=!1}function Ll(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Ba(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Ll(t.startContainer),i=Ll(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function um(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Qi(e=Tl){const t=Ba();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=um(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Zn(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function pm(){var i;if(!Ba())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Sl(n.left+n.width/2,n.top),!0}function mm(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Ba()){Zn();return}Sl(t,n)},10)}function Cl({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(Tl=t,i.addEventListener("mouseup",mm,n?{signal:n}:void 0),_l||(_l=!0,document.addEventListener("mousedown",s=>{cn&&re&&!re.contains(s.target)&&Zn()}),document.addEventListener("selectionchange",()=>{cn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Zn()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&cn&&Zn()}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&pm()})))}function Al(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Bl(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,d=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let l;for(;(l=c.exec(t))!==null;)if(d=!0,l.index>r&&o.appendChild(document.createTextNode(t.slice(r,l.index))),l[1]){const u=l[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=l.index+l[0].length}else if(l[3]){l[2]&&o.appendChild(document.createTextNode(l[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+l[3],o.appendChild(u),r=l.index+l[0].length}d&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function Dl(e){if(!e)return"";const t=tt(e),n=document.createElement("div");return n.innerHTML=t,Al(n,Bl),n.innerHTML}function dn(e){if(!e)return"";const t=tt(e),n=document.createElement("div");return n.innerHTML=t,Al(n,Bl),n.innerHTML}let Da=!1,Ma=!1,Et=!0,Xn=null,Ji=null,es=null,ts=null,ja=!1,ns=null;function Ml(e=null){ja=!0,e&&(ns=e)}function Ra(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Pa(e){return e.user_name||e.user_email||"Unknown"}function Na(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m($e(t(e.old_value)))}</strong> to <strong>${m($e(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(De(t(e.old_value)))}</strong> to <strong>${m(De(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function fm(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function gm(){Et=!Et;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",Et),n&&n.classList.toggle("rotated",Et)}async function is(e){try{Xn=await v.getTicketRitualsStatus(e),jl(e)}catch(t){console.error("Failed to load ticket rituals:",t),Xn=null}}function jl(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Xn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=Xn;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(l=>l.approval_mode==="gate")&&(Et=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",Et);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",Et);const r=n.some(l=>l.trigger==="ticket_close"),d=n.some(l=>l.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&d?c="⚠️ Pending rituals (claim before starting, close before completing):":d?c="⚠️ Complete these rituals before claiming this ticket:":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${c}</p>
                ${n.map(l=>`
                    <div class="ticket-ritual-item pending${l.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${l.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${m(l.name)}</span>
                            <span class="badge badge-trigger-${l.trigger||"ticket_close"}">${l.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${l.approval_mode||"auto"}">${l.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${l.prompt?tt(l.prompt):""}</div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ze(l.attestation.attested_at)}</span>
                                ${l.attestation.note?`<div class="attestation-note markdown-body">${tt(l.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Bf(l,e)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `:""}
        ${i.length>0?`
            <div class="ticket-rituals-completed">
                ${i.map(l=>`
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${m(l.name)}</span>
                        </div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ze(l.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function ss(e){try{let t;return e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?(await W(t.id,!1),!0):(D("my-issues",!1),!1)}catch{return D("my-issues",!1),!1}}function Rl(e){const t=Ri(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Pl({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function hm(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=se();if(!t)return;const n=Rl(t.id);Ji=n.prevIssue?n.prevIssue.id:null,es=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=Pl(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}Xe(e=>{e==="detailNavContext"&&hm()});async function W(e,t=!0){try{t&&Nt(),Et=!0;let n=!1;const[i,s,a,o,r,d]=await Promise.all([v.getIssue(e),v.getComments(e).catch(y=>(console.error("Failed to load comments:",y),n=!0,[])),v.getActivities(e),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),l=[...d.pending_rituals||[],...d.completed_rituals||[]].filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name,is_pending:!y.attestation.approved_at}));Xn=d;const u=[...s,...l].sort((y,Ve)=>new Date(y.created_at)-new Date(Ve.created_at)),f=[i.parent_id?v.getIssue(i.parent_id):Promise.resolve(null),v.getSprints(i.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[h,b]=await Promise.all(f),w=r.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),I=r.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),L=r.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:S()},"",`/issue/${i.identifier}`),qi(i),Gr(b),ja=!1,ns=null,document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const R=document.getElementById("issue-detail-view");R.classList.remove("hidden");const B=S()||"my-issues",E=J().find(y=>y.id===i.project_id),M=i.assignee_id?Vn(i.assignee_id):null,_=M?Mt(M):null,H=i.sprint_id?b.find(y=>y.id===i.sprint_id):null,V=Rl(i.id),{prevIssue:Ae,nextIssue:ce}=V;R.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(B)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Pl(V)}
                        <span class="issue-detail-breadcrumb">${E?m(E.name):"Project"} › ${m(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(i.title)}</h1>

                    ${h?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(h.identifier)}" data-action="navigate-issue" data-issue-id="${p(h.id)}" data-identifier="${p(h.identifier)}">${h.identifier}: ${m(h.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(i.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${Di(i.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${i.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(i.id)}">
                            ${i.description?dn(i.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${o.length===0?N({icon:j.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):o.map(y=>`
                                <a href="/issue/${encodeURIComponent(y.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(y.id)}" data-identifier="${p(y.identifier)}">
                                    <span class="sub-issue-status">${_e(y.status)}</span>
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
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${p(i.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${w.length===0&&I.length===0&&L.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${I.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${I.map(y=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${_e(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
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
                                            <span class="relation-status">${_e(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(i.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${L.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${L.map(y=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${_e(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
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
                            `:u.map(y=>`
                                <div class="comment ${y.is_attestation?"comment-attestation":""} ${y.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${y.is_attestation?"avatar-attestation":""}">${y.is_attestation?y.is_pending?"⏳":"✓":(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(y.author_name||"User")}</span>
                                            ${y.is_attestation?`<span class="comment-ritual-badge">${y.is_pending?"Pending approval — ":""}Ritual: ${m(y.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ze(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Dl(y.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
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
                            ${a.length===0?N({icon:j.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):a.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Ra(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Na(y)}</span>
                                        <span class="activity-actor">by ${m(Pa(y))}</span>
                                        <span class="activity-time">${Ze(y.created_at)}</span>
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
                                ${_e(i.status)}
                                <span>${$e(i.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(i.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${et(i.priority)}
                                <span>${De(i.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(i.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${i.issue_type||"task"}">${lt(i.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(i.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${_?`${Kt(M,"avatar-small")}<span>${m(_)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(i.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${H?m(H.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(i.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${i.labels&&i.labels.length>0?i.labels.map(y=>`
                                        <span class="issue-label" style="background: ${Y(y.color)}20; color: ${Y(y.color)}">${m(y.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${E?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(E.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(i.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${so(i.estimate,i.project_id)?" out-of-scale":""}" ${so(i.estimate,i.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${ws(i.estimate,i.project_id)}</span>
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
                            <span class="property-value-static">${m(i.creator_name||"Unknown")}</span>
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
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${p(i.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,ts&&ts.abort(),ts=new AbortController;const{signal:q}=ts,de=document.querySelector(".sidebar-overflow-trigger"),Se=document.querySelector(".overflow-menu-dropdown");if(de&&Se){const y=()=>{Se.classList.add("hidden"),de.setAttribute("aria-expanded","false")},Ve=()=>{const Le=Se.classList.toggle("hidden");de.setAttribute("aria-expanded",String(!Le))};de.addEventListener("click",Ve,{signal:q}),document.addEventListener("click",Le=>{!de.contains(Le.target)&&!Se.contains(Le.target)&&y()},{signal:q}),Se.addEventListener("keydown",Le=>{Le.key==="Escape"&&(y(),de.focus())},{signal:q})}jl(i.id),Aa(),Cl({signal:q});const Re=document.getElementById("new-comment");if(Re){const y=Cr(i.id);y&&(Re.value=y),Re.addEventListener("input",()=>{Bi(i.id,Re.value)}),Re.addEventListener("keydown",Ve=>{var Le;Ve.key==="Enter"&&(Ve.metaKey||Ve.ctrlKey)&&(Ve.preventDefault(),(Le=Re.closest("form"))==null||Le.requestSubmit())})}Ji=Ae?Ae.id:null,es=ce?ce.id:null;const Ft=y=>{var Rs;if((y.metaKey||y.ctrlKey)&&y.shiftKey&&(y.key===">"||y.key==="."||y.code==="Period")&&Qi()){y.preventDefault();return}if(y.metaKey||y.ctrlKey||y.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||y.target.tagName==="INPUT"||y.target.tagName==="TEXTAREA"||y.target.tagName==="SELECT"||y.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;if(y.key==="ArrowLeft"&&Ji)y.preventDefault(),W(Ji);else if(y.key==="ArrowRight"&&es)y.preventDefault(),W(es);else if(y.key==="c"){y.preventDefault(),y.stopImmediatePropagation();const ht=document.getElementById("new-comment");ht&&(ht.focus(),ht.scrollIntoView({behavior:"smooth",block:"nearest"}))}else y.key==="j"?(y.preventDefault(),y.stopImmediatePropagation(),as(1)):y.key==="k"?(y.preventDefault(),y.stopImmediatePropagation(),as(-1)):y.key==="d"&&(y.preventDefault(),(Rs=document.querySelector('[data-action="edit-description"]'))==null||Rs.click());const Le={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[y.key];if(Le){const ht=document.querySelector(`.property-row[data-field="${Le}"]`);ht&&(y.preventDefault(),ht.click())}};document.addEventListener("keydown",Ft,{signal:q})}catch(n){x("load issue",n)}}async function vm(e,t){if(e.preventDefault(),Da)return!1;const n=document.getElementById("new-comment").value;Bi(t,null),Da=!0;try{await v.createComment(t,n),await W(t),k("Comment added!","success")}catch(i){Bi(t,n),x("add comment",i)}finally{Da=!1}return!1}async function bm(e){const t=se()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${m(t.description||"")}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Di(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=Br(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving.",r.classList.remove("hidden"))}Aa("edit-description","edit-description-mention-suggestions"),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?Bt(e,c,t.description||""):Bt(e,null);const l=document.getElementById("edit-description-preview");l&&l.style.display!=="none"&&Nl()}),a.addEventListener("keydown",c=>{var l,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(l=document.getElementById("save-description-edit"))==null||l.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Bt(e,null),ja){W(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?dn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let d=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var h,b;if(Ma)return;const c=(h=document.getElementById("edit-description"))==null?void 0:h.value;if(c===void 0)return;const l=ns?ns.description||"":null;if(l!==null&&l!==(t.description||"")&&!d){d=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version.",w.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");Ma=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await v.updateIssue(e,{description:c}),Bt(e,null),k("Description updated","success"),await W(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(w){x("update description",w)}finally{Ma=!1,u&&(u.disabled=!1)}})}function Nl(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?dn(n):'<span class="text-muted">Nothing to preview.</span>'}function ym(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?Nl():i.focus()}function wm(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,U(),document.getElementById("relation-issue-search").focus()}async function km(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,o=(await v.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function $m(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Em(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function xm(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(i,t,"blocks"):await v.createRelation(t,i,n),O(),k("Relation added","success"),W(t)}catch(s){x("add relation",s)}return!1}async function Im(e,t){try{await v.deleteRelation(e,t),k("Relation removed","success"),W(e)}catch(n){x("remove relation",n)}}function as(e){const t=se();if(!t)return;const n=Ri();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||W(n[s].id)}ee({"retry-issue-comments":(e,t)=>{W(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Op(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||bm(t.issueId)},"toggle-section":(e,t)=>{fm(t.section)},"toggle-ticket-rituals":()=>{gm()},"save-comment":(e,t)=>{vm(e,t.issueId)},"show-add-relation-modal":(e,t)=>{wm(t.issueId)},"remove-relation":(e,t)=>{Im(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{tm(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{xm(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{km(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{$m(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Em()},"set-description-editor-mode":(e,t)=>{ym(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>as(-1),"navigate-next-issue":()=>as(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Il(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),cm(t.issueId)}});function ql(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let un=[],Qn=[],os=null,Z=new Set,pn="list",Rt=!1,qa=null,rs=null,Oa=null,Ha=null,Ol=null;function Hl(e){if(Ol!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const Fa=Bu();(Fa==="list"||Fa==="grid")&&(pn=Fa);function Fl(e){if(e!=="list"&&e!=="grid")return;pn=e,e==="grid"&&Rt&&Ua(),Du(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),xt()}function Ul(){if(pn!=="list")return;Rt=!0,Z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),xt(),fn()}function Ua(){Rt=!1,Z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),xt(),fn()}function _m(){qa&&clearTimeout(qa),qa=setTimeout(()=>{xt()},300)}function Tm(){const e=document.getElementById("doc-search");e&&(e.value=""),xt()}async function Sm(){Fe(null)}async function Lm(){const e=document.getElementById("doc-search");e&&(e.value=""),Fe(null)}function Cm(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=z()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=J().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${m(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Am(){return un}function xt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Cm(),Qn=un.filter(a=>{var o,r;if(e){const d=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!d&&!c)return!1}return!0}),Qn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Pm("",pn)}let mn=0;async function Bm(){var i;const e=os||((i=C())==null?void 0:i.id);if(!e)return;const t=++mn,n=z()||null;try{const s=await v.getDocuments(e,n);if(t!==mn)return;un=s,xt()}catch(s){if(t!==mn)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=N({icon:j.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",s)}}Xe(e=>{e==="currentProject"&&S()==="documents"&&Bm()});async function Pt(e,t=null){var s;if(e||(e=(s=C())==null?void 0:s.id),!e)return;os=e,Or(-1);const n=++mn,i=document.getElementById("documents-list");i&&(i.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=z()||null);try{const a=await v.getDocuments(e,t);if(n!==mn)return;un=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",pn==="list"),r.classList.toggle("active",pn==="grid")),xt()}catch(a){if(n!==mn)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=N({icon:j.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",a)}}function Gl(){var t,n;if(S()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=os||((n=C())==null?void 0:n.id);e&&Pt(e).catch(i=>console.error("Failed to refresh documents list:",i))}function zl(e){Hl(e)&&fe(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Dm(e,t){Hl(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),D("documents"))}function Mm(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${Y(t.color)}20; color: ${Y(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function jm(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Mm(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(ql(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Rm(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${Y(r.color)}20; color: ${Y(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?ql(e.content).substring(0,80):"No content",s=Rt?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${Z.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Rt&&Z.has(e.id)?" selected":""}" data-action="${Rt?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
      ${s}
      <div class="document-list-icon">${m(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${m(e.title)}</div>
        <div class="document-list-snippet text-muted">${m(i)}${e.content&&e.content.length>80?"...":""}</div>
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
  `}function Pm(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;Z.clear(),fn();const i=Qn;if(i.length===0){const l=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=z(),f=l||u;n.innerHTML=N({icon:f?j.search:j.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?jm:Rm,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=J();i.forEach(l=>{let u,f;if(e==="project")if(u=l.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const h=r.find(b=>b.id===l.project_id);f=h?h.name:"Unknown Project"}else e==="sprint"&&(u=l.sprint_id||"__no_sprint__",f=l.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(l)});let d="";for(const[l,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";d+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=d}function Nm(e){Z.has(e)?Z.delete(e):Z.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=Z.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",Z.has(e)),fn()}function qm(){Qn.forEach(e=>Z.add(e.id)),Qn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),fn()}function Vl(){Z.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),Z.clear(),fn()}function fn(){const e=document.getElementById("doc-bulk-actions");e&&(Rt?(e.classList.remove("hidden"),Z.size>0?e.innerHTML=`
        <span class="bulk-count">${Z.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Om(){if(Z.size===0){k("No documents selected","error");return}const t=J().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${Z.size} Document${Z.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${Z.size} selected document${Z.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,U()}async function Hm(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(Z);let i=0;const s=[];for(const d of n)try{await v.updateDocument(d,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${d}:`,c),s.push(((o=un.find(l=>l.id===d))==null?void 0:o.title)||d)}O(),Vl(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=C())==null?void 0:r.id;return await Pt(a),!1}async function Fm(){var a,o;if(Z.size===0){k("No documents selected","error");return}const e=Z.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(Z);let n=0;const i=[];for(const r of t)try{await v.deleteDocument(r),n++}catch(d){console.error(`Failed to delete document ${r}:`,d),i.push(((a=un.find(c=>c.id===r))==null?void 0:a.title)||r)}Ua(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=C())==null?void 0:o.id;await Pt(s)}async function Um(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await v.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${m(s.author_name||"Unknown")}</span>
                <span class="comment-date">${Ze(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Dl(s.content)}</div>
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
    `}}function Gm(e,t){const n=document.getElementById("new-doc-comment");if(!n)return;const i=Cr(e);i&&(n.value=i),n.addEventListener("input",()=>{Bi(e,n.value)},{signal:t}),n.addEventListener("keydown",s=>{var a;s.key==="Enter"&&(s.metaKey||s.ctrlKey)&&(s.preventDefault(),(a=n.closest("form"))==null||a.requestSubmit())},{signal:t}),Aa("new-doc-comment","doc-mention-suggestions")}async function fe(e,t=!0){try{t&&Nt();const n=await v.getDocument(e);Ol=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await Um(n);let a=null,o=null,r=!1;if(n.project_id){const H=J().find(V=>V.id===n.project_id);if(a=H?H.name:null,n.sprint_id)try{const V=await v.getSprint(n.sprint_id);o=V?V.name:null}catch(V){console.error("Failed to load sprint name:",V),r=!0}}let d=n.content||"";const c=F.lexer(d);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(d=d.slice(c[0].raw.length).trimStart());const l=Am(),u=l.findIndex(_=>_.id===n.id),f=u>0?l[u-1]:null,h=u>=0&&u<l.length-1?l[u+1]:null,b=u>=0,w=S()||"documents",I=n.labels&&n.labels.length>0?n.labels.map(_=>`
          <span class="issue-label" style="background: ${Y(_.color)}20; color: ${Y(_.color)}">
            ${m(_.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(_.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let L='<span class="text-muted">None</span>';try{const _=await v.getDocumentIssues(n.id);_.length>0&&(L=_.map(H=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(H.identifier)}</span>
            <span class="linked-item-title">${m(H.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(H.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(_){console.error("Failed to load linked issues:",_),L=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(w)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${b?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${p(f.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${l.length}</span>
              <button class="issue-nav-btn" ${h?`data-action="view-document" data-document-id="${p(h.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${d?dn(d):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?m(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:m(o)}</span>
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
              ${L}
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
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${p(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `,rs&&rs.abort(),rs=new AbortController;const{signal:R}=rs,B=i.querySelector(".sidebar-overflow-trigger"),E=i.querySelector(".overflow-menu-dropdown");if(B&&E){const _=()=>{E.classList.add("hidden"),B.setAttribute("aria-expanded","false")},H=()=>{const V=E.classList.toggle("hidden");B.setAttribute("aria-expanded",String(!V))};B.addEventListener("click",H,{signal:R}),document.addEventListener("click",V=>{!B.contains(V.target)&&!E.contains(V.target)&&_()},{signal:R}),E.addEventListener("keydown",V=>{V.key==="Escape"&&(_(),B.focus())},{signal:R})}Gm(n.id,R),Cl({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:R}),Oa=f?f.id:null,Ha=h?h.id:null;const M=_=>{if((_.metaKey||_.ctrlKey)&&_.shiftKey&&(_.key===">"||_.key==="."||_.code==="Period")&&Qi("new-doc-comment")){_.preventDefault();return}_.metaKey||_.ctrlKey||_.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||_.target.tagName==="INPUT"||_.target.tagName==="TEXTAREA"||_.target.tagName==="SELECT"||_.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(_.key==="ArrowLeft"&&Oa?(_.preventDefault(),fe(Oa)):_.key==="ArrowRight"&&Ha&&(_.preventDefault(),fe(Ha)))};document.addEventListener("keydown",M,{signal:R})}catch(n){x("load document",n)}}async function ls(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(i&&!n){const d=a.find(c=>c.status==="active");d&&(o=d.id)}const r=a.map(d=>`<option value="${d.id}" ${d.id===o?"selected":""}>${m(d.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Ga(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${m(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function zm(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?dn(r):'<span class="text-muted">Nothing to preview.</span>'}}function za(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Mr(e);if(o){const d=Lu(e),c=n!==null&&d!==null&&d.title===n.title&&d.content===n.content&&d.icon===n.icon,l=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),l&&(l.textContent="Restored your unsaved draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",l.classList.remove("hidden"))}const r=()=>{const d={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&d.title===n.title&&d.content===n.content&&d.icon===n.icon){Mi(e,null);return}Mi(e,d,n)};[i,s,a].forEach(d=>d==null?void 0:d.addEventListener("input",r))}async function Wl(){Jn=null;const e=J(),t=dc()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Ga("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),za("new"),t&&await ls("doc-sprint",t,null,!0)}let Jn=null;async function Vm(e,t,n){Jn=n||null;const s=J().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${m(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${Ga("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),za("new"),t&&await ls("doc-sprint",t,e)}async function Wm(e){var a;e.preventDefault();const t=(a=C())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await v.createDocument(t,s),Mi("new",null),await Pt(t),O(),k("Document created!","success"),Jn){const o=Jn;Jn=null,o()}}catch(o){x("create document",o)}return!1}async function Kl(e){try{const t=await v.getDocument(e),i=J().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${Ga("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,U(),za(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await ls("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){x("load document",t)}}async function Km(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i};try{await v.updateDocument(t,s);const a=Mr(t);a&&a.title===s.title&&a.content===s.content&&(a.icon||"")===(s.icon||"")&&Mi(t,null),O(),await fe(t),k("Document updated!","success")}catch(a){x("update document",a)}return!1}async function Ym(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=C())==null?void 0:t.id;await Pt(n),D("documents"),k("Document deleted!","success")}catch(n){x("delete document",n)}}function Zm(e,t){ls(e,t)}async function Xm(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,U()}async function Qm(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,a=await v.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Jm(e,t){try{await v.linkDocumentToIssue(e,t),O(),k("Issue linked!","success"),await fe(e,!1)}catch(n){x("link issue",n)}}async function ef(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await fe(e,!1)}catch(n){x("unlink issue",n)}}let Va=!1;async function tf(e,t){if(e.preventDefault(),Va)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;Va=!0;try{await v.createDocumentComment(t,i),n.value="",k("Comment added!","success"),await fe(t,!1)}catch(s){x("add comment",s)}finally{Va=!1}return!1}async function nf(e){var n;const t=(n=C())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await v.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,U();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${Y(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,U()}catch(i){x("load labels",i)}}async function sf(e,t){try{await v.addLabelToDocument(e,t),O(),k("Label added!","success"),await fe(e,!1)}catch(n){x("add label",n)}}async function af(e,t){try{await v.removeLabelFromDocument(e,t),k("Label removed!","success"),await fe(e,!1)}catch(n){x("remove label",n)}}ee({"view-document":(e,t)=>{e.preventDefault(),fe(t.documentId)},"set-doc-editor-mode":(e,t)=>{zm(t.target,t.mode)},"retry-load-documents":()=>{Pt(os)},"retry-document-comments":(e,t)=>{fe(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{Nm(t.docId)},"clear-doc-search":()=>{Tm()},"clear-doc-project-filter":()=>{Sm()},"clear-all-doc-filters":()=>{Lm()},"show-bulk-move-modal":()=>{Om()},"bulk-delete-documents":()=>{Fm()},"select-all-docs":()=>{qm()},"clear-doc-selection":()=>{Vl()},"exit-selection-mode":()=>{Ua()},"enter-selection-mode":()=>{Ul()},"handle-bulk-move":e=>{Hm(e)},"unlink-document-issue":(e,t)=>{ef(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Xm(t.documentId)},"add-document-comment":(e,t)=>{tf(e,t.documentId)},"remove-label-from-doc":(e,t)=>{af(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{nf(t.documentId)},"show-edit-document-modal":(e,t)=>{Kl(t.documentId)},"delete-document":(e,t)=>{Ym(t.documentId)},"create-document":e=>{Wm(e)},"update-doc-sprint-dropdown":(e,t,n)=>{Zm(t.sprintSelect,n.value)},"update-document":(e,t)=>{Km(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Qm(n.value,t.documentId)},"link-to-issue":(e,t)=>{Jm(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{sf(t.documentId,t.labelId)}});let gn=[],cs={},ds=new Set,ut=null,Wa=null,us=[],ei=[],Ka=[];function Yl(){return cs}function of(){return Wa}function rf(){return ut}Xe(e=>{e==="currentProject"&&S()==="sprints"&&hn()});let Ya=0;async function hn(){const e=z();if(!e){const i=document.getElementById("sprints-list");i&&(i.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++Ya;Ef();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await v.getCurrentSprint(e);const i=await v.getSprints(e);if(t!==Ya)return;gn=i,lf(),await ps()}catch(i){if(t!==Ya)return;n&&(n.innerHTML=N({icon:j.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),x("load sprints",i)}}function lf(){const e=document.getElementById("sprints-list");if(!e)return;const t=gn.find(a=>a.status==="active"),n=gn.find(a=>a.status==="planned"),i=gn.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${p(t.id)}" data-sprint-url="/sprint/${p(t.id)}" style="cursor: pointer;">
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
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(t.id)}" data-sprint-name="${p(t.name)}" data-budget="${t.budget||""}" data-project-id="${p(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${p(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,s+=cf(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${p(n.id)}" data-sprint-url="/sprint/${p(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${m(n.name)}</div>
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
                            <span class="sprint-history-name">${m(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||N({icon:j.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function cf(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const i=e.budget,s=e.points_spent||0,a=Math.max(i-s,0),o=new Date(e.start_date),r=new Date(e.end_date),l=((H,V,Ae)=>Math.min(Math.max(H,V),Ae))((new Date-o)/(r-o),0,1),u=360,f=120,h=16,b=h,w=u-h,I=h,L=f-h,R=H=>i===0?L:I+(1-H/i)*(L-I),B=R(i),E=R(0),M=b+(w-b)*l,_=R(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${fs(e.start_date)} → ${fs(e.end_date)}</span>
                    <span>${a} of ${i} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${u} ${f}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${B}" x2="${w}" y2="${E}" class="burndown-ideal" />
                <line x1="${b}" y1="${B}" x2="${M}" y2="${_}" class="burndown-actual" />
                <circle cx="${M}" cy="${_}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}let Za=0;async function ti(e,t=!0){var n;try{t&&Nt();const i=++Za,s=S(),a=await v.getSprint(e);if(i!==Za)return;if(!a){k("Sprint not found","error"),D("sprints");return}Wa=a;const o=(n=C())==null?void 0:n.id,[r,d,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(l=>(console.error("Failed to load sprint transactions:",l),[])),o?v.getDocuments(o,a.project_id,null,e).catch(l=>(console.error("Failed to load sprint documents:",l),[])):[]]);if(i!==Za)return;us=r,Ka=d,ei=c,S()===s&&Yt(us),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),uf()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),D("sprints")}}async function df(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),D("sprints",!1);return}try{await ti(e,!1)}catch{D("sprints",!1)}}function uf(){const e=Wa,t=us;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=S()||"sprints",s=t.filter(l=>Zt.includes(l.status)),a=t.filter(l=>l.status==="done"),o=t.reduce((l,u)=>l+(u.estimate||0),0),r=a.reduce((l,u)=>l+(u.estimate||0),0);let d="";e.status==="active"?d='<span class="badge badge-status-active">Active</span>':e.status==="planned"?d='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(d='<span class="badge badge-status-completed">Completed</span>');const c=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${p(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${m(e.name)}</h2>
                ${d}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${fs(e.start_date)} → ${fs(e.end_date)}
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
                <div class="stat-value">${c}</div>
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
                ${s.length===0?N({icon:j.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(l=>Zl(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?N({icon:j.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(l=>Zl(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${mf()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${ei.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${ei.length>0?`
                    <div class="sprint-issues-list">
                        ${ei.map(l=>pf(l)).join("")}
                    </div>
                `:N({icon:j.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Zl(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=Wr.includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${_f(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function pf(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ze(e.created_at)}</span>
            </span>
        </div>
    `}function mf(){const e=Ka;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${m(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${m(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${ff(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function ff(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function gf(e,t,n,i){const s=i?Yf(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${p(e)}" data-project-id="${p(i)}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${p(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${s?`<small class="form-hint">${m(s)}</small>`:""}
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
    `,U()}async function hf(e,t,n){var r,d,c;e.preventDefault();const i=(d=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:d.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((c=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:c.value)||"this";try{const l={budget:a};if(i&&(l.name=i),await v.updateSprint(t,l),o==="planned"||o==="default"){const f=gn.filter(h=>h.status==="planned"&&h.id!==t);for(const h of f)await v.updateSprint(h.id,{budget:a})}o==="default"&&n&&await v.updateProject(n,{default_sprint_budget:a}),await hn(),O(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(l){x("update budget",l)}return!1}async function vf(e){const t=gn.find(d=>d.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,U();const n=Zt;let i=0,s=!1,a=!1;try{const[d,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);i=d.filter(l=>n.includes(l.status)).length,s=c.some(l=>l.is_active&&l.trigger==="every_sprint")}catch(d){console.error("Failed to load sprint details:",d),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${m(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${p(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function bf(e){try{const t=await v.closeSprint(e);await hn(),Jl(),t.limbo?wf(t):k("Sprint completed!","success")}catch(t){x("complete sprint",t)}}async function ps(){const e=z();if(e)try{ut=await v.getLimboStatus(e),yf()}catch(t){console.error("Failed to load limbo status:",t)}}function yf(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!ut||!ut.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${ut.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function wf(e){const t=z();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,U(),kf(t)}async function kf(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(i.name)} <span class="ritual-mode">(${m(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${tt(i.prompt)}</div>
                    ${Qa(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Xa(){var t,n;if(!ut)return;const e=z();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${ut.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${m(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${tt(i.prompt)}</div>
                        ${Qa(i.attestation)}
                        ${$f(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=ut.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${ut.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(i.name)}</div>
                            ${Qa(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,U()}function Qa(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(Ze(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${tt(e.note)}</div>
        </div>
    `}function $f(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Xl(e){for(const t of e)if(!ds.has(t))try{(await v.getSprints(t)).forEach(i=>{cs[i.id]=i}),ds.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Ef(){cs={},ds=new Set,us=[],Ka=[],ei=[],ms={}}function xf(e,t){t.forEach(n=>{cs[n.id]=n}),ds.add(e)}let ms={};function If(e){return ms[e]}function Ql(e,t){ms[e]=t??null}function Jl(){ms={}}ee({"retry-load-sprints":()=>hn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}ti(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;gf(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{Xa()},"show-close-sprint-confirmation":(e,t)=>{vf(t.sprintId)},"handle-update-budget":(e,t)=>{hf(e,t.sprintId,t.projectId)},"close-modal":()=>{O()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,O(),bf(t.sprintId)},"dismiss-limbo-modal":()=>{O(),ps()},"approve-ritual":(e,t)=>{Cf(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{tc(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}W(t.issueId)},"create-sprint-document":async(e,t)=>{await Vm(t.sprintId,t.projectId,()=>{ti(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}fe(t.documentId)}});function fs(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function _f(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}Xe(e=>{e==="currentProject"&&S()==="rituals"&&Ja()});let ec=0;async function Ja(){const e=z(),t=document.getElementById("rituals-content"),n=++ec;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=N({icon:j.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}ng(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await ii();n===ec&&!i&&t&&(t.innerHTML=N({icon:j.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Tf(){cc(Sf),Ja()}function Sf(){const e=document.getElementById("rituals-content"),t=ig(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,yn("rv-sprint-rituals-list",n,"sprint"),yn("rv-close-rituals-list",i,"close"),yn("rv-claim-rituals-list",s,"claim")}function Lf(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Cf(e,t){try{await v.approveAttestation(e,t),k("Ritual approved!","success"),await ps(),Xa()}catch(n){x("approve ritual",n)}}async function tc(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",i=>{Af(i,e,t)}),U()}async function Af(e,t,n){e.preventDefault();const i=document.getElementById("gate-note").value;try{await v.completeGateRitual(t,n,i||null),k("Ritual completed!","success"),await ps();const s=rf();s&&!s.in_limbo?(O(),k("Limbo cleared! Next sprint is now active.","success")):Xa()}catch(s){x("complete gate ritual",s)}return!1}function Bf(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function Df(e,t,n,i){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${m(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",s=>{Mf(s,e,t)}),U()}async function Mf(e,t,n){e.preventDefault();const i=document.getElementById("attest-ritual-note").value.trim();if(!i)return k("A note is required for this attestation.","error"),!1;try{await v.attestTicketRitual(t,n,i),k("Ritual attested!","success"),O(),await is(n)}catch(s){x("attest ticket ritual",s)}return!1}async function jf(e,t){try{await v.attestTicketRitual(e,t),k("Ritual attested!","success"),await is(t)}catch(n){x("attest ticket ritual",n)}}async function Rf(e,t){try{await v.approveTicketRitual(e,t),k("Ritual approved!","success"),await is(t)}catch(n){x("approve ticket ritual",n)}}function Pf(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",i=>{Nf(i,e,t)}),U()}async function Nf(e,t,n){e.preventDefault();const i=document.getElementById("ticket-ritual-note").value;try{await v.completeTicketGateRitual(t,n,i||null),k("Ritual completed!","success"),O(),await is(n)}catch(s){x("complete ticket ritual",s)}return!1}ee({"show-create-ritual-modal":(e,t)=>{fc(t.trigger)},"approve-ticket-ritual":(e,t)=>{Rf(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{Pf(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{Df(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{jf(t.ritualId,t.issueId)},"retry-load-rituals":()=>Ja()});function tt(e){if(!e)return"";try{F.setOptions({breaks:!0,gfm:!0});const n=F.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Sr.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function gs(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function qf(e,t,n,i,s,a,o,r){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(s)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${gs(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{Of(c,e,t,n)}),U(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function Of(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),O(),pt()}catch(a){x("complete gate ritual",a)}}function Hf(e,t,n,i,s,a,o,r){qf(e,t,n,i,s,a,o,r)}function Ff(e,t,n,i,s,a,o,r,d){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(s)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${gs(r)}`:""}</div>`:""}
                ${d?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${tt(d)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{Uf(l,e,t,n)}),U(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Uf(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await v.approveTicketRitual(t,n),s)try{await v.createComment(n,s)}catch(r){console.error("Failed to post approval comment:",r)}k(`Review ritual "${i}" approved!`,"success"),O(),pt()}catch(r){x("approve review ritual",r)}}function Gf(e,t,n,i,s,a,o,r,d){Ff(e,t,n,i,s,a,o,r,d)}Xe(e=>{e==="currentProject"&&S()==="approvals"&&pt()});let eo=[],to=0;async function pt(){if(!C())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++to;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=z(),i=n?J().filter(r=>r.id===n):J(),s=await Promise.all(i.map(async r=>{const[d,c]=await Promise.all([v.getPendingApprovals(r.id),v.getLimboStatus(r.id)]);return{project:r,approvals:d,limbo:c}}));if(t!==to)return;const a=[],o=[];for(const{project:r,approvals:d,limbo:c}of s)if(a.push(...d),c&&c.in_limbo){const l=(c.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});l.length>0&&o.push({project:r,rituals:l})}Ku(a),eo=o,nc()}catch(n){if(t!==to)return;e.innerHTML=N({icon:j.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),x("load approvals",n)}}function nc(){const e=document.getElementById("approvals-list");if(!e)return;const t=Wu(),n=eo.length>0,i=!Mu();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${j.issues}</div>
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
            `:e.innerHTML=N({icon:j.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${eo.map(({project:l,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(l.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const h=f.attestation&&!f.attestation.approved_at,b=h?"⏳":"○",w=h?`<span class="gate-waiting-info">Attested by <strong>${m(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',I=h?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(f.id)}"
                                            data-project-id="${p(l.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(f.id)}"
                                                data-project-id="${p(l.id)}"
                                                data-ritual-name="${p(f.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${m(f.name)}
                                                    <span class="badge badge-ritual-${p(f.approval_mode)}">${m(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(f.prompt)}</span>
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
        `);const a=l=>l.pending_approvals||[],o=l=>u=>{const f=a(u).filter(l);return f.length>0?{...u,_filteredApprovals:f}:null},r=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="claim")).filter(Boolean),d=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="close")).filter(Boolean),c=t.map(o(l=>l.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(no).join("")}
                </div>
            </div>
        `),d.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${d.map(no).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(no).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset;Hf(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{var h;l.disabled=!0;const u=(h=l.closest(".gate-ritual-actions"))==null?void 0:h.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=l.dataset;try{await v.approveTicketRitual(f.ritualId,f.issueId),k(`Review ritual "${f.ritualName}" approved!`,"success"),await pt()}catch(b){l.disabled=!1,u&&(u.disabled=!1),x("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset;Gf(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0;try{await v.approveAttestation(l.dataset.ritualId,l.dataset.projectId),k("Sprint ritual approved!","success"),await pt()}catch(u){l.disabled=!1,x("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(l=>{l.addEventListener("click",()=>{tc(l.dataset.ritualId,l.dataset.projectId,l.dataset.ritualName)})})}function zf(){ju(),nc()}function no(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(i.requested_by_name)}</strong>${i.requested_at?` (${gs(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${tt(i.attestation_note)}</div>`:"",d=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=s?`<div class="gate-ritual-actions">
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
                    <span class="gate-ritual-name">${m(i.ritual_name)} ${d}</span>
                    <span class="gate-ritual-prompt">${m(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                ${c}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.issue_id)}" class="gate-issue-link">
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
    `}ee({"view-issue-from-modal":(e,t)=>{e.preventDefault(),O(),W(t.issueId)},"dismiss-approvals-explainer":()=>{zf()},"retry-load-approvals":()=>pt()});const hs={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},vs={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let ic=0;function sc(e){ic=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=ac(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function ac(e="",t="",n=""){const i=ic++,s=Object.keys(hs).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?hs[e]:hs.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${vs[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",d=t==="isnull";return`
        <div class="condition-row" id="condition-row-${i}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${i}">
                <option value="">Select field...</option>
                ${s}
            </select>
            <select class="condition-operator" id="condition-operator-${i}" data-action="toggle-value-input" data-row-id="${i}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${i}" value="${p(String(r))}" placeholder="Value"${d?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${i}">&times;</button>
        </div>
    `}function Vf(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",ac()),bs()}function Wf(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),bs()}function Kf(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=hs[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${vs[o]}</option>`).join(""),oc(e),bs()}function oc(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function ni(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function bs(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function rc(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,d=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let l=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!d)continue;if(!r)throw ni("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!d)throw ni("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${d}`;if(n.has(u))throw ni(`Duplicate condition: ${r} ${vs[d]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),d==="isnull")t[u]=!0;else if(d==="in"||d==="contains")t[u]=l?l.split(",").map(f=>f.trim()).filter(f=>f):[];else if(d==="gte"||d==="lte"){if(!l)throw ni(`Please enter a numeric value for ${r} ${vs[d]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(l,10);if(isNaN(f))throw ni(`Invalid number "${l}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${l}`);t[u]=f}else t[u]=l}return bs(),Object.keys(t).length>0?t:null}ee({"add-condition-row":()=>{Vf()},"remove-condition-row":(e,t)=>{Wf(Number(t.rowId))},"update-operator-options":(e,t)=>{Kf(Number(t.rowId))},"toggle-value-input":(e,t)=>{oc(Number(t.rowId))}});let le=[],io=null;const lc=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];Xe((e,t)=>{e==="currentProject"&&(t&&Eu(t),lc.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),mg(t||""))});const ys={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function cc(e){io=e}function J(){return le}function vn(e){const t=le.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return ys[n]||ys.fibonacci}function ws(e,t){if(!e)return"No estimate";const i=vn(t).find(s=>s.value===e);return i?i.label:`${e} points`}function so(e,t){return e?!vn(t).some(i=>i.value===e):!1}function Yf(e){const t=le.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(ys[n]||ys.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function qe(){if(C())try{le=await v.getProjects(C().id),Zf();const e=z();if(e&&le.some(i=>i.id===e))return;const t=ao();if(t&&le.some(i=>i.id===t)){Fe(t);return}const n=Lr();if(n&&le.some(i=>i.id===n)){Fe(n);return}le.length>0&&Fe(le[0].id)}catch(e){x("load projects",e)}}function Zf(){const e='<option value="">All Projects</option>'+le.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+le.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=z();lc.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function dc(){return Lr()}function bn(){const e=document.getElementById("projects-list");if(le.length===0){e.innerHTML=N({icon:j.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=le.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${Y(t.color)}20; color: ${Y(t.color)}">
                    ${m(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${m(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${p(t.id)}" title="Project settings">
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
    `).join("")}function Xf(e){Fe(e),D("issues")}function uc(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function Qf(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(C().id,t),await qe(),bn(),O(),k("Project created!","success")}catch(n){x("create project",n)}return!1}async function Jf(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await qe(),bn(),O(),k("Project updated!","success")}catch(i){x("update project",i)}return!1}async function eg(e){const t=le.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await qe(),bn(),O(),k("Project deleted","success")}catch(n){x("delete project",n)}}let Te=null;async function pc(e){Te=e,le.length===0&&await qe();const t=le.find(n=>n.id===e);if(!t){k("Project not found","error"),D("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),mc("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function mc(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!mt||mt.length===0)&&ii()}function tg(){Te=null,mt=[]}function ng(e){Te=e}function ig(){return mt}async function sg(){if(!Te)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(Te,t),await qe(),k("Settings saved","success");const n=le.find(i=>i.id===Te);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){x("save project settings",n)}}async function ag(){if(!Te)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await v.updateProject(Te,n),await qe(),k("Settings saved","success")}catch(i){x("save settings",i)}}let mt=[];async function ii(){if(!Te)return!1;try{return mt=await v.getRituals(Te),og(),typeof io=="function"&&io(),!0}catch(e){return x("load rituals",e),!1}}function og(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=mt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=mt.filter(i=>i.trigger==="ticket_close"),n=mt.filter(i=>i.trigger==="ticket_claim");yn("ps-sprint-rituals-list",e,"sprint"),yn("ps-close-rituals-list",t,"close"),yn("ps-claim-rituals-list",n,"claim")}function yn(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${tt(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${m(a.approval_mode||"auto")}</span>
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
  `}).join("")}async function fc(e){if(!Te)return;let t=[];try{t=await v.getRitualGroups(Te)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${p(n.id)}" data-mode="${p(n.selection_mode)}">${m(n.name)} (${m(n.selection_mode)})</option>`).join("")}
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
        ${sc(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,U()}function rg(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function lg(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function gc(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(Te,{name:t,selection_mode:n})).id}return e.value||null}async function cg(e){e.preventDefault();let t;try{t=rc()}catch{return!1}let n;try{n=await gc()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){i.group_id=n;const s=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&s.value&&(i.weight=parseFloat(s.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(i.percentage=parseFloat(a.value))}try{await v.createRitual(Te,i),await ii(),O(),k("Ritual created!","success")}catch(s){x("create ritual",s)}return!1}async function dg(e){const t=mt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(Te)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${p(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${p(t.name)}" required>
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
          ${n.map(o=>`<option value="${p(o.id)}" data-mode="${p(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${m(o.name)} (${m(o.selection_mode)})</option>`).join("")}
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
        ${sc(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,U()}async function ug(e,t){e.preventDefault();let n;try{n=rc()}catch{return!1}let i;try{i=await gc()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:i||""};if(i){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(s.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(s.percentage=parseFloat(o.value))}try{await v.updateRitual(t,s),await ii(),O(),k("Ritual updated!","success")}catch(a){x("update ritual",a)}return!1}async function pg(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await ii(),k("Ritual deleted","success")}catch(n){x("delete ritual",n)}}ee({"view-project":(e,t)=>{Xf(t.projectId)},"view-project-settings":(e,t)=>{pc(t.projectId)},"create-project":e=>{Qf(e)},"update-project":(e,t)=>{Jf(e,t.projectId)},"confirm-delete-project":(e,t)=>{eg(t.projectId)},"edit-project-ritual":(e,t)=>{dg(t.ritualId)},"delete-project-ritual":(e,t)=>{pg(t.ritualId,t.ritualName)},"create-project-ritual":e=>{cg(e)},"update-project-ritual":(e,t)=>{ug(e,t.ritualId)},"toggle-ritual-conditions":()=>{rg()},"ritual-group-change":()=>{lg()}});function ao(){const t=new URLSearchParams(window.location.search).get("project");return t||dc()}function mg(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const oo={},hc=new Map;let ro=null,lo=null,co=null,uo=null,po=null,mo=null,vc=!1;function fg(e){Object.assign(oo,e)}function gg({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a}={}){e&&(ro=e),t&&(lo=t),n&&(co=n),i&&(uo=i),s&&(po=s),a&&(mo=a)}function hg(){return Object.keys(oo)}const vg=["issues","board","sprints","epics","documents","rituals","approvals","my-issues"];function D(e,t=!0){if(t&&Nt(),Fu(e),t){let s;const a=ao();e==="my-issues"?s=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?s=`/issues${window.location.search}`:vg.includes(e)&&a?s=`/${e}?project=${a}`:s=`/${e}`,history.pushState({view:e},"",s)}document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.view===e)}),ro&&ro();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const s=document.getElementById(`${e}-view`);s&&s.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const i=oo[e];i&&i(),t&&window.scrollTo(0,0)}function bc(){var i;const t=window.location.pathname.split("/").filter(Boolean);uo&&uo();let n="my-issues";if(t.length===0||t[0]==="")D("my-issues",!1);else{if(lo&&lo(t))return;{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),hg().includes(n)?D(n,!1):(n="my-issues",D("my-issues",!1))}}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function Nt(){hc.set(window.location.href,window.scrollY)}function yc(e){Nt(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),po&&po(e)}function bg(e){Nt(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),mo&&mo(e)}function wc(){const e=hc.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function yg(){vc||(vc=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&co&&co(e.state)){wc();return}(t=e.state)!=null&&t.view?D(e.state.view,!1):bc(),wc()}))}let si=[];function ks(){return si}function wg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function kg(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?wg(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function $g(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{si=await v.getTeamAgents(e),Oi(Ot,ks),Fi()}catch(n){console.error("Failed to load team agents:",n),x("load team agents",n)}}async function fo(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{si=await v.getTeamAgents(e),Oi(Ot,ks),Fi(),Eg()}catch(n){x("load agents",n)}}function Eg(){const e=document.getElementById("agents-list");if(e){if(si.length===0){e.innerHTML=N({icon:j.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=si.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${kg(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${i} ${ca(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function xg(){const e=J();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),U()}async function Ig(e){var o,r,d;e.preventDefault();const t=(o=C())==null?void 0:o.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(d=document.getElementById("agent-project"))==null?void 0:d.value;try{let c;s&&a?c=await v.createProjectAgent(a,n,i):c=await v.createTeamAgent(t,n,i),O();const l=m(c.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,U()}catch(c){x("create agent",c)}return!1}function _g(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function Tg(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),k("Agent deleted","success"),fo()}catch(n){x("delete agent",n)}}ee({"create-agent":e=>{Ig(e)},"copy-agent-key":()=>{_g()},"dismiss-agent-modal":()=>{O(),fo()},"delete-agent":(e,t)=>{Tg(t.agentId,t.agentName)}});let It=0,ai=null,$s=0;const qt=new Map;function go(){const e=document.getElementById("ws-status-badge");e&&e.classList.toggle("hidden",It===0)}function Oe(e,t){return qt.has(e)||qt.set(e,new Set),qt.get(e).add(t),()=>{var n;return(n=qt.get(e))==null?void 0:n.delete(t)}}function Sg(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function kc(e,{isReconnect:t=!1}={}){ai&&(clearTimeout(ai),ai=null);const n=Xu();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Ur(null)),!t&&It>0&&(It=0,go());const i=v.getToken();if(!i)return;const s=++$s,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(i)}&team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o);Ur(r),r.onopen=()=>{if(s!==$s)return;console.log("WebSocket connected");const d=It>0;d&&k("Live updates reconnected","success"),It=0,go(),d&&$c({type:"reconnected",entity:"connection",data:{}})},r.onmessage=d=>{if(s!==$s)return;let c;try{c=JSON.parse(d.data)}catch(l){console.error("WebSocket: malformed message",l);return}$c(c)},r.onclose=()=>{if(s!==$s)return;console.log("WebSocket disconnected"),It++,It===1&&k("Live updates disconnected. Reconnecting...","warning"),go();const d=Sg(It-1);ai=setTimeout(()=>{ai=null,C()&&C().id===e&&kc(e,{isReconnect:!0})},d)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function $c(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=qt.get(`${n}:${t}`);if(a)for(const d of a)try{d(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=qt.get(n);if(o)for(const d of o)try{d(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=qt.get("*");if(r)for(const d of r)try{d(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const Lg={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested"};let ho=0,wn=!1;async function Es(){const e=C();if(e){try{const t=await v.getInboxUnreadCount(e.id);ma(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}vo()}}function vo(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Fr();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0)}async function oi(){const e=C();if(!e)return;const t=document.getElementById("inbox-list");if(!t)return;const n=++ho;t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const i=await v.getInbox(e.id,{unread:wn,limit:100});if(n!==ho)return;pa(i||[]),Ec()}catch(i){if(n!==ho)return;t.innerHTML=N({icon:j.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),x("load inbox",i)}Es()}function Cg(){wn=!wn;const e=document.getElementById("inbox-unread-toggle");e&&e.classList.toggle("active",wn),oi()}function Ag(e){const t=!e.read_at,n=Lg[e.kind]||e.kind,i=e.issue_identifier||e.document_title||"",s=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" ");return`
        <div class="inbox-row list-item${t?" inbox-row-unread":""}"
             data-action="open-inbox-entry" ${s} role="button" tabindex="0">
            <div class="inbox-row-main">
                <div class="inbox-row-header">
                    <span class="badge badge-inbox-${p(e.kind)}">${m(n)}</span>
                    ${i?`<span class="inbox-row-source">${m(i)}</span>`:""}
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':""}
                </div>
                <div class="inbox-row-title">${m(e.title)}</div>
                ${e.body?`<div class="inbox-row-body">${m(e.body)}</div>`:""}
            </div>
            <div class="inbox-row-meta">${m(gs(e.created_at))}</div>
        </div>
    `}function Ec(){const e=document.getElementById("inbox-list");if(!e)return;const t=ua();if(t.length===0){e.innerHTML=N({icon:j.inbox,heading:wn?"No unread items":"Inbox zero",description:wn?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=t.map(n=>Ag(n)).join("")}async function Bg(e){const t=ua(),n=t.find(i=>i.id===e);if(!(!n||n.read_at))try{await v.markInboxRead(e),n.read_at=new Date().toISOString(),pa([...t]),ma(Math.max(0,Fr()-1)),vo();const i=document.querySelector(`.inbox-row[data-entry-id="${e}"]`);i&&i.classList.remove("inbox-row-unread")}catch(i){console.error("Failed to mark inbox entry read:",i)}}async function Dg(){const e=C();if(e)try{await v.markAllInboxRead(e.id);const t=new Date().toISOString();pa(ua().map(n=>({...n,read_at:n.read_at||t}))),ma(0),vo(),Ec()}catch(t){x("mark all inbox entries read",t)}}function xc(e){e.entryId&&Bg(e.entryId),e.issueId?W(e.issueId):e.documentId&&fe(e.documentId)}function Mg(e){if(!e)return;const{entryId:t,issueId:n,documentId:i}=e.dataset;xc({entryId:t,issueId:n,documentId:i})}ee({"open-inbox-entry":(e,t)=>{e.preventDefault(),xc(t)},"toggle-inbox-unread-filter":()=>Cg(),"mark-all-inbox-read":()=>Dg(),"retry-load-inbox":()=>oi()});let xs=[],kn=[],bo=[],yo=[];function jg(){return xs}function Ot(){return kn}async function wo(){try{xs=await v.getMyTeams(),Rg()}catch(e){x("load teams",e)}}function Rg(){const e=document.getElementById("team-list");xs.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=xs.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function ko(e,t=!1){fa(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),kc(e.id),await Promise.all([qe(),Kg(),Ng(),$g(),Es()]),t?bc():D(S())}function Ic(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Pg(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Ng(){if(C())try{kn=await v.getTeamMembers(C().id),Oi(Ot,ks),Fi()}catch(e){console.error("Failed to load team members:",e),x("load team members",e)}}function $o(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Eo=0;async function xo(){if(!C())return;const e=++Eo,t=document.getElementById("team-members-list");t&&(t.innerHTML=$o());try{const n=await v.getTeamMembers(C().id);if(e!==Eo)return;kn=n,Oi(Ot,ks),Fi(),qg()}catch(n){if(e!==Eo)return;t&&(t.innerHTML=N({icon:j.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),kn=[],_c(),x("load team members",n)}}function Io(){var n;const e=(n=Dt())==null?void 0:n.id,t=kn.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function _c(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!Io())}function qg(){const e=document.getElementById("team-members-list"),t=Io();_c(),e.innerHTML=kn.map(n=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(n.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${m(n.user_name||"Unknown")}</span>
                    <span class="member-email">${m(n.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${n.role}</span>
                ${t&&n.user_id!==Dt().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let _o=0;async function Is(){if(!C())return;const e=++_o,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=$o());try{const n=await v.getTeamInvitations(C().id);if(e!==_o)return;bo=n,Og()}catch(n){if(e!==_o)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Og(){const e=document.getElementById("team-invitations-list");if(bo.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=Io();e.innerHTML=bo.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${m(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${m(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${p(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let To=0;async function Tc(){if(!C())return;const e=++To,t=document.getElementById("team-agents-list");t&&(t.innerHTML=$o());try{const n=await v.getTeamAgents(C().id);if(e!==To)return;yo=n,Hg()}catch(n){if(e!==To)return;t&&(t.innerHTML=N({icon:j.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),x("load team agents",n)}}function Hg(){const e=document.getElementById("team-agents-list");if(e){if(yo.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=yo.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${m(s)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${i} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function Sc(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function Fg(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await v.createInvitation(C().id,t,n),await Is(),O(),k("Invitation sent!","success")}catch(i){x("send invitation",i)}return!1}async function Ug(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(C().id,e),await xo(),k("Member removed!","success")}catch(t){x("remove member",t)}}async function Gg(e){try{await v.deleteInvitation(C().id,e),await Is(),k("Invitation canceled!","success")}catch(t){x("cancel invitation",t)}}function Lc(){Ic(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,U()}function zg(){C()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
                <textarea id="team-description">${m(C().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,U())}async function Vg(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await wo(),await ko(n),O(),k("Team created!","success")}catch(n){x("create team",n)}return!1}async function Wg(e){if(e.preventDefault(),!C())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(C().id,t);fa(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await wo(),O(),k("Team updated!","success")}catch(n){x("update team",n)}return!1}async function Kg(){if(C())try{const e=await v.getLabels(C().id);Pi(e)}catch(e){console.error("Failed to load labels:",e),x("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ee({"select-team":(e,t)=>{ko(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Ug(t.userId)},"delete-invitation":(e,t)=>{Gg(t.invitationId)},"retry-load-team-invitations":()=>{Is()},"retry-load-team-members":()=>{xo()},"retry-load-team-agents":()=>{Tc()},"invite-member":e=>{Fg(e)},"create-team":e=>{Vg(e)},"update-team":e=>{Wg(e)}});let nt=null,ft=0,$n=null,En=null,ri=null,So=!1;function Yg(){return xu()}function Cc(){Iu()}function Ac(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Zg(){nt||(nt=document.createElement("div"),nt.id="onboarding-overlay",nt.className="onboarding-overlay",document.getElementById("app").appendChild(nt))}function li(){if(!nt)return;const e=So?Dc():Bc(),t=e[ft],n=e.map((i,s)=>`<span class="onboarding-dot${s===ft?" active":""}${s<ft?" completed":""}"></span>`).join("");nt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Bc(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Ac(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Ac(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&$n&&(e.textContent=`${$n.name} (${$n.key})`),t&&En&&(t.textContent=`${En.name} (${En.key})`),n&&ri&&(n.textContent=`${ri.identifier} - ${ri.title}`)}}]}function Dc(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Lo(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Co(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function xn(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Xg(){const e=So?Dc():Bc();ft<e.length-1&&(ft++,li())}function Qg(){Cc(),jc(),ci()}function Jg(){Cc(),jc(),ci()}async function eh(e){e.preventDefault(),Co("onboarding-team-error"),xn("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{$n=await v.createTeam({name:t,key:n}),ft++,li()}catch(i){Lo("onboarding-team-error",i.message||"Failed to create team"),xn("onboarding-team-submit",!1)}}async function th(e){e.preventDefault(),Co("onboarding-project-error"),xn("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{En=await v.createProject($n.id,{name:t,key:n}),ft++,li()}catch(i){Lo("onboarding-project-error",i.message||"Failed to create project"),xn("onboarding-project-submit",!1)}}async function nh(e){e.preventDefault(),Co("onboarding-issue-error"),xn("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{ri=await v.createIssue(En.id,{title:t}),ft++,li()}catch(n){Lo("onboarding-issue-error",n.message||"Failed to create issue"),xn("onboarding-issue-submit",!1)}}function Mc(e=!1){So=e,ft=0,$n=null,En=null,ri=null,Zg(),li()}function jc(){nt&&(nt.remove(),nt=null)}function Rc(){_u(),Mc(!0)}ee({"onboarding-next":e=>{e.preventDefault(),Xg()},"onboarding-skip":e=>{e.preventDefault(),Qg()},"onboarding-finish":e=>{e.preventDefault(),Jg()},"onboarding-create-team":e=>{eh(e)},"onboarding-create-project":e=>{th(e)},"onboarding-create-issue":e=>{nh(e)}});async function ci(){ih(),ch(),await wo();const e=jg();if(e.length===0&&!Yg()){Mc();return}e.length>0&&await ko(e[0],!0)}let In=null,di=null,Ge=null,ze=null;function ui(){In||(In=document.getElementById("auth-screen"),di=document.getElementById("main-screen"),Ge=document.getElementById("login-form"),ze=document.getElementById("signup-form"))}function _s(){ui(),In&&In.classList.remove("hidden"),di&&di.classList.add("hidden")}function ih(){ui(),In&&In.classList.add("hidden"),di&&di.classList.remove("hidden")}function sh(){ui(),Ge&&Ge.classList.remove("hidden"),ze&&ze.classList.add("hidden")}function ah(){ui(),Ge&&Ge.classList.add("hidden"),ze&&ze.classList.remove("hidden")}async function oh(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),ji(await v.getMe()),await ci(),k("Welcome back!","success")}catch(i){x("log in",i)}return!1}async function rh(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await v.signup(t,n,i),await v.login(n,i),ji(await v.getMe()),await ci(),k("Account created successfully!","success")}catch(s){x("sign up",s)}return!1}function Pc(){v.logout(),ji(null),fa(null),_s(),k("Signed out","success")}function lh(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ch(){const e=Dt();if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const i=e.avatar_url;i?lh(i)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(i)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=i):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function dh(){ui();const e=Ge==null?void 0:Ge.querySelector("form");e&&e.addEventListener("submit",s=>oh(s));const t=ze==null?void 0:ze.querySelector("form");t&&t.addEventListener("submit",s=>rh(s));const n=Ge==null?void 0:Ge.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),ah()});const i=ze==null?void 0:ze.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),sh()})}let Ao=[];async function Bo(){try{Ao=await v.getApiKeys(),uh()}catch(e){x("load API keys",e)}}function uh(){const e=document.getElementById("api-keys-list");if(e){if(Ao.length===0){e.innerHTML=N({icon:j.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Ao.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${ca(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${ca(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function ph(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,U()}async function mh(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);O(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,U()}catch(n){x("create API key",n)}return!1}async function fh(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function gh(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),k("API key revoked","success"),await Bo()}catch(n){x("revoke API key",n)}}ee({"create-api-key":e=>{mh(e)},"copy-api-key":()=>{fh()},"dismiss-api-key-modal":()=>{O(),Bo()},"revoke-api-key":(e,t)=>{gh(t.keyId,t.keyName)}});let Ts=!1,gt=0,_t=[],Ss=[];function hh(e){Ss=e,_t=[...e]}function pi(){return Ts}function vh(){if(Ts)return;Ts=!0,gt=0,_t=[...Ss];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Ls()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>bh(n.target.value)),t.addEventListener("keydown",wh),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&yh(Number(i.dataset.commandIndex))}),mi(),requestAnimationFrame(()=>t.focus())}function Ls(){Ts=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function bh(e){const t=e.toLowerCase().trim();t?_t=Ss.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):_t=[...Ss],gt=0,mi()}function mi(){const e=document.getElementById("command-results");if(!e)return;if(_t.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};_t.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===gt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function yh(e){gt=e,mi()}function Nc(e){const t=_t[e];t&&(Ls(),t.action())}function wh(e){switch(e.key){case"ArrowDown":e.preventDefault(),gt=Math.min(gt+1,_t.length-1),mi();break;case"ArrowUp":e.preventDefault(),gt=Math.max(gt-1,0),mi();break;case"Enter":e.preventDefault(),Nc(gt);break;case"Escape":e.preventDefault(),Ls();break}}ee({"execute-command":(e,t)=>{Nc(Number(t.commandIndex))}});const kh=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function $h(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${m(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${m(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function Eh(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${m(e.title)}</h4>
        ${e.shortcuts.map($h).join("")}
    </div>`}function qc(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${kh.map(Eh).join("")}
        </div>
    `,U()}let Cs=[];function xh(){return Cs}Xe(e=>{e==="currentProject"&&S()==="epics"&&Tt()});let As=0;async function Tt(){var n;const e=document.getElementById("epics-list");if(!e)return;const t=++As;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=C())!=null&&n.id)){Cs=[],e.innerHTML=N({icon:j.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const i=z();let s;if(i?s=await v.getIssues({project_id:i,issue_type:"epic"}):s=await v.getTeamIssues(C().id,{issue_type:"epic"}),t!==As)return;if(!s||s.length===0){Cs=[],e.innerHTML=N({icon:j.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const a=await Promise.all(s.map(async o=>{let r=[];try{r=await v.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));if(t!==As)return;Cs=a,Ih(a,e)}catch(i){if(t!==As)return;e.innerHTML=N({icon:j.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),x("load epics",i)}}function Ih(e,t){const n=e.map(i=>{const s=i.subIssues?i.subIssues.length:0,a=i.subIssues?i.subIssues.filter(u=>u.status==="done"||u.status==="canceled").length:0,o=s>0?Math.round(a/s*100):0,r=s>0?`${a}/${s}`:"-",d=`status-${(i.status||"backlog").replace(/_/g,"-")}`,c=(i.status||"backlog").replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase()),l=i.estimate!=null?`${i.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${p(i.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${m(i.identifier)}</td>
                <td class="epic-title">${m(i.title)}</td>
                <td class="epic-progress">
                    <div class="epic-progress-bar-container">
                        <div class="epic-progress-bar">
                            <div class="epic-progress-fill${o===100?" epic-progress-complete":""}" style="width: ${o}%"></div>
                        </div>
                        <span class="epic-progress-text">${r}</span>
                    </div>
                </td>
                <td class="epic-estimate">${l}</td>
                <td class="epic-status"><span class="status-badge ${d}">${c}</span></td>
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
    `,t._epicClickHandler||(t._epicClickHandler=i=>{const s=i.target.closest(".epic-row");s&&s.dataset.identifier&&bg(s.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function _h(){const e=z(),t=J().map(n=>`
        <option value="${p(n.id)}" ${n.id===e?"selected":""}>${m(n.name)}</option>
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
    `,U(),document.getElementById("create-epic-form").addEventListener("submit",Th),document.getElementById("create-epic-title").focus()}async function Th(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await v.createIssue(t,{title:n,description:i||null,issue_type:"epic"});O(),k(`Created epic ${s.identifier}`,"success"),Tt()}catch(s){x("create epic",s)}}async function Oc(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){W(t.id,!1);return}await Do(t.id,!1)}else D("epics",!1)}catch{D("epics",!1)}}async function Do(e,t=!0){try{t&&Nt();const[n,i,s,a]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(n.issue_type!=="epic"){W(e,t);return}t&&history.pushState({epicId:e,view:S()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=S()||"epics",d=J().find(E=>E.id===n.project_id),c=n.assignee_id?Vn(n.assignee_id):null,l=c?Mt(c):null,u=i.length,f=i.filter(E=>E.status==="done"||E.status==="canceled").length,h=u>0?Math.round(f/u*100):0,b=xh(),w=b.findIndex(E=>E.id===n.id),I=w>0?b[w-1]:null,L=w>=0&&w<b.length-1?b[w+1]:null,R=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${R?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${I?`data-action="navigate-epic" data-epic-id="${p(I.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${b.length}</span>
                            <button class="issue-nav-btn" ${L?`data-action="navigate-epic" data-epic-id="${p(L.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${d?m(d.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${dn(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${h===100?" epic-progress-complete":""}" style="width: ${h}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${f} of ${u} done</span>
                                <span>${h}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${i.length===0?N({icon:j.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):i.map(E=>{const M=E.assignee_id?Vn(E.assignee_id):null,_=M?Mt(M):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(E.id)}" data-identifier="${p(E.identifier)}">
                                    <span class="sub-issue-status">${_e(E.status)}</span>
                                    <span class="sub-issue-id">${m(E.identifier)}</span>
                                    <span class="sub-issue-title">${m(E.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(E.status||"backlog").replace(/_/g,"-")}">${$e(E.status)}</span>
                                    ${_?`<span class="sub-issue-assignee">${m(_)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${s.length===0?N({icon:j.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):s.map(E=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Ra(E.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Na(E)}</span>
                                        <span class="activity-actor">by ${m(Pa(E))}</span>
                                        <span class="activity-time">${Ze(E.created_at)}</span>
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
                                            <span class="comment-author">${m(E.author_name||"User")}</span>
                                            <span class="comment-date">${Ze(E.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${m(E.content||"")}</div>
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
                                ${_e(n.status)}
                                ${$e(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${et(n.priority)}
                                ${De(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${l?m(l):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${ws(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(E=>`
                                    <span class="issue-label" style="background: ${Y(E.color)}20; color: ${Y(E.color)}">${m(E.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${d?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(d.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const B=o.querySelector(".sub-issues-list");B&&B.addEventListener("click",E=>{const M=E.target.closest(".sub-issue-item");M&&M.dataset.issueId&&W(M.dataset.issueId)})}catch(n){x("load epic",n)}}ee({"navigate-epic":(e,t)=>{Do(t.epicId)}});function Sh(e){let t=!1,n=null;return function(s){var o,r,d;if(s.metaKey||s.ctrlKey||s.altKey)return;if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&s.target.blur();return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(o=e.isDetailViewActive)!=null&&o.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((r=e.isDetailViewActive)!=null&&r.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((d=e.isDetailViewActive)!=null&&d.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function Lh(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function St(e,t,n="#issues-list .issue-row"){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Ch(e){const t="#issues-list .issue-row";function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const d=n(a);if(!d)return;const c=d.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const l=d.querySelector(`.${r}`);l&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,l)}return function(a){var d;if(e.getCurrentView()!=="issues"||(d=e.isDetailViewActive)!=null&&d.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":a.preventDefault(),St(r+1,e.setSelectedIndex,t);break;case"k":a.preventDefault(),St(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const c=o[r].dataset.issueId;c&&!c.startsWith("temp-")&&e.viewIssue(c)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const c=o[r].dataset.issueId;c&&!c.startsWith("temp-")&&e.showEditIssueModal(c)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ah(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":i.preventDefault(),St(a+1,e.setSelectedIndex,t);break;case"k":i.preventDefault(),St(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Bh(e){const t="#inbox-list .inbox-row";return function(i){if(e.getCurrentView()!=="inbox"||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":i.preventDefault(),St(a+1,e.setSelectedIndex,t);break;case"k":i.preventDefault(),St(a-1,e.setSelectedIndex,t);break;case"Enter":a>=0&&s[a]&&(i.preventDefault(),e.openInboxEntry(s[a]));break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(o=>o.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Dh(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":i.preventDefault(),St(a+1,e.setSelectedIndex,t);break;case"k":i.preventDefault(),St(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const Mh=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Ht=[],Bs=null,Mo=0;Xe(e=>{e==="currentProject"&&S()==="board"&&fi()});async function fi(){Ni(-1);const e=++Mo,t=z();if(!t){const i=document.getElementById("kanban-board");i&&(i.innerHTML=J().length===0?N({icon:j.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):N({icon:j.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const i=await v.getIssues({project_id:t});if(e!==Mo)return;Ht=i,S()==="board"&&Yt(Ht),gi()}catch(i){if(e!==Mo)return;n&&(n.innerHTML=N({icon:j.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),x("load board",i)}}const jo=Ou(()=>fi(),200);function gi(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=Mh.map(i=>{const s=Ht.filter(a=>a.status===i.key);return`
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
                            <div class="kanban-card-title">${m(a.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${a.identifier}</span>
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${De(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),jh(t)}function jh(e){const t=Hr();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Ni(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Ni(i),n[i].classList.add("keyboard-selected")}function Rh(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Bs=t.dataset.id,t.classList.add("dragging")}function Ph(e,t){t.classList.remove("dragging"),Bs=null}function Hc(e){const t=Ht.find(n=>n.id===Bs);return!!t&&t.status===e}function Nh(e,t){e.preventDefault(),!Hc(t.dataset.status)&&t.classList.add("drag-over")}function qh(e,t){t.classList.remove("drag-over")}function Oh(e,t){e.preventDefault();const n=Ht.find(i=>i.id===t.dataset.id);n&&Hc(n.status)||t.classList.add("drag-over")}function Hh(e,t){t.classList.remove("drag-over")}async function Fh(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=Ht.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,gi();try{await v.updateIssue(n,{status:i}),k("Status updated","success")}catch(o){s.status=a,gi(),x("update status",o)}}}async function Uh(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Bs||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=Ht.find(d=>d.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,gi();try{await v.updateIssue(n,{status:a}),k("Status updated","success")}catch(d){o.status=r,gi(),x("update status",d)}}}ee({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),W(t.id)):e.type==="dragstart"?Rh(e,n):e.type==="dragend"?Ph(e,n):e.type==="dragover"?Oh(e,n):e.type==="dragleave"?Hh(e,n):e.type==="drop"&&Uh(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Nh(e,n):e.type==="dragleave"?qh(e,n):e.type==="drop"&&Fh(e,n)},"retry-load-board":()=>fi()});const Lt=new Map,Fc=6e4,Ro=100;let ge=null,Ds=null,Ms=null,hi=null,Uc=!1;const Gh={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},zh={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Gc={api:null};let Po={...Gc};function Vh(e={}){Po={...Gc,...e},ge||(ge=document.createElement("div"),ge.className="issue-tooltip",ge.style.display="none",document.body.appendChild(ge),ge.addEventListener("mouseenter",()=>{clearTimeout(Ds)}),ge.addEventListener("mouseleave",()=>{No()})),Uc||(document.addEventListener("mouseover",Wh),document.addEventListener("mouseout",Kh),Uc=!0)}function Wh(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Yh(t);if(n){if(n===hi&&ge.style.display!=="none"){clearTimeout(Ds);return}clearTimeout(Ms),Ms=setTimeout(()=>{Zh(t,n)},200)}}function Kh(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Ms),Ds=setTimeout(()=>{No()},150))}function Yh(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function Zh(e,t){hi=t;const n=e.getBoundingClientRect();ge.style.left=`${n.left+window.scrollX}px`,ge.style.top=`${n.bottom+window.scrollY+8}px`,ge.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ge.style.display="block";try{const i=await Qh(t);if(hi!==t)return;Jh(i)}catch{if(hi!==t)return;ge.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function No(){clearTimeout(Ms),clearTimeout(Ds),ge&&(ge.style.display="none"),hi=null}function Xh(){const e=Date.now();for(const[t,n]of Lt.entries())e-n.timestamp>=Fc&&Lt.delete(t)}async function Qh(e){Lt.size>Ro/2&&Xh();const t=Lt.get(e);if(t&&Date.now()-t.timestamp<Fc)return t.issue;if(!Po.api)throw new Error("API not initialized");const n=await Po.api.getIssueByIdentifier(e);if(Lt.size>=Ro){const i=Array.from(Lt.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,Ro/2);for(const[a]of s)Lt.delete(a)}return Lt.set(e,{issue:n,timestamp:Date.now()}),n}function Jh(e){const t=Gh[e.status]||"#6b7280",n=zh[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate?`${e.estimate}pt`:"";ge.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${ev(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${tv(e.priority)}</span>
        </div>
    `}function ev(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function tv(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function zc(){return!!document.querySelector(".description-inline-editor")}function nv(){Oe("issue:created",iv),Oe("issue:updated",sv),Oe("issue:deleted",av),Oe("comment",ov),Oe("relation",lv),Oe("attestation",cv),Oe("activity",uv),Oe("project",pv),Oe("sprint",mv),Oe("document",rv),Oe("inbox",dv),Oe("connection:reconnected",fv)}function iv(e){var s,a,o;const t=Me(),n=t.findIndex(r=>r.id===e.id),i=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(i>=0){const r=[...t];r[i]=e,Qe(r),S()==="issues"&&dt()}else Qe([e,...t]),S()==="issues"&&dt(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=Dt())==null?void 0:s.id)){const r=kt(),d=r.findIndex(l=>l.id===e.id),c=r.findIndex(l=>l._isOptimistic&&l.title===e.title);if(d===-1&&c===-1)sn([e,...r]),S()==="my-issues"&&Wn();else if(c>=0){const l=[...r];l[c]=e,sn(l),S()==="my-issues"&&Wn()}}S()==="board"?jo():S()==="sprints"?bi():S()==="epics"&&Tt(),S()==="issue-detail"&&e.parent_id===((a=se())==null?void 0:a.id)&&W((o=se())==null?void 0:o.id,!1)}function sv(e){var s;const t=Me();t.some(a=>a.id===e.id)&&Qe(t.map(a=>a.id===e.id?e:a));const n=kt();n.some(a=>a.id===e.id)&&sn(n.map(a=>a.id===e.id?e:a));const i=Ri();i.some(a=>a.id===e.id)&&Yt(i.map(a=>a.id===e.id?e:a)),S()==="issues"?dt():S()==="my-issues"?Wn():S()==="board"?jo():S()==="sprints"?bi():S()==="epics"?Tt():S()==="issue-detail"&&((s=se())==null?void 0:s.id)===e.id&&(zc()?Ml(e):W(e.id,!1))}function av(e){var n;Qe(Me().filter(i=>i.id!==e.id)),sn(kt().filter(i=>i.id!==e.id));const t=Ri();t.some(i=>i.id===e.id)&&Yt(t.filter(i=>i.id!==e.id)),S()==="issues"?dt():S()==="my-issues"?(Wn(),on({showLoading:!1})):S()==="board"?jo():S()==="sprints"?bi():S()==="epics"&&Tt(),k(`Issue ${e.identifier} deleted`,"info"),S()==="issue-detail"&&((n=se())==null?void 0:n.id)===e.id&&(k(`Issue ${e.identifier} was deleted`,"warning"),D("my-issues"))}function vi(e){zc()?Ml():W(e,!1)}function ov(e){var t;S()==="my-issues"&&on({showLoading:!1}),S()==="issue-detail"&&((t=se())==null?void 0:t.id)===e.issue_id&&vi(e.issue_id),e.document_id&&zl(e.document_id)}function rv(e,{type:t}={}){Gl(),t==="deleted"?Dm(e.id,e.title):zl(e.id)}function lv(e){var t;if(S()==="issue-detail"){const n=(t=se())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&vi(n)}}function cv(e){var t;S()==="approvals"&&pt(),S()==="issue-detail"&&((t=se())==null?void 0:t.id)===e.issue_id&&vi(e.issue_id)}function dv(e){var t;e.recipient_user_id===((t=Dt())==null?void 0:t.id)&&(Es(),S()==="inbox"&&oi())}function uv(e){var t;S()==="my-issues"&&on({showLoading:!1}),S()==="issue-detail"&&((t=se())==null?void 0:t.id)===e.issue_id&&vi(e.issue_id)}function pv(e,{type:t}){qe().then(()=>{S()==="projects"&&bn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function bi(){const e=of();e?ti(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):hn().catch(t=>console.error("Failed to reload sprints:",t))}function mv(e,{type:t}={}){Jl(),S()==="sprints"?bi():S()==="my-issues"&&Kn(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function fv(){var t;const e=S();if(Es(),e==="issues")ct().catch(n=>console.error("Failed to resync issues:",n));else if(e==="my-issues")an().catch(n=>console.error("Failed to resync my issues:",n)),Kn().catch(n=>console.error("Failed to resync sprint status:",n)),on({showLoading:!1});else if(e==="board")fi();else if(e==="sprints")bi();else if(e==="epics")Tt().catch(n=>console.error("Failed to resync epics:",n));else if(e==="projects")qe().then(()=>{S()==="projects"&&bn()}).catch(n=>console.error("Failed to resync projects:",n));else if(e==="documents")Gl();else if(e==="approvals")pt();else if(e==="inbox")oi();else if(e==="issue-detail"){const n=(t=se())==null?void 0:t.id;n&&vi(n)}}const Vc='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Wc(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function gv(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Wc(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Vc);n&&n.focus()}}}function js(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Wc(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=n.querySelectorAll(Vc);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&js()});async function hv(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=z();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=J().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Qe([r,...Me()]),dt();const d=document.querySelector(`[data-id="${a}"]`);d&&d.classList.add("new");try{const c=await v.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const l=Me(),u=l.findIndex(f=>f.id===a);u!==-1&&(l[u]=c,Qe(l)),dt(),qe(),k("Issue created!","success")}catch(c){Qe(Me().filter(l=>l.id!==a)),dt(),x("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}gg({beforeNavigate:()=>{tg(),cc(null),qi(null),Gr(null),js(),No()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Oc(e[1]),!0;if(e[0]==="issue"&&e[1])return ss(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(ss(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(Tv(e[1]),!0):e[0]==="sprint"&&e[1]?(df(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(pc(e[1]),!0):!1},detailPopstate:e=>e.epicId?(Do(e.epicId,!1),!0):e.issueId?(W(e.issueId,!1),!0):e.identifier?(ss(e.identifier),!0):e.documentId?(fe(e.documentId,!1),!0):e.sprintId?(ti(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=ao();e&&J().some(t=>t.id===e)&&Fe(e)},issueNavigate:e=>ss(e),epicNavigate:e=>Oc(e)}),fg({"my-issues":()=>{Kn(),an(),on()},approvals:()=>{pt()},inbox:()=>{oi()},issues:()=>{sl(),hp(),yp(),el().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const i=document.getElementById("label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),Gi())}const n=e.getAll("exclude_label");if(n.length>0){const i=document.getElementById("exclude-label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),zi())}}),il().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}ct()})},epics:()=>{Tt()},board:()=>{fi()},projects:()=>{qe().then(bn)},sprints:()=>{hn()},rituals:()=>{Tf()},documents:()=>{Pt()},team:()=>{xo(),Tc(),Is()},settings:()=>{Bo(),fo()}});function vv(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||O()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>O())}function bv(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>mc(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>sg());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>ag()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>fc(a))})}function yv(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Fl("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Fl("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Ul());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>_m());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>xt())}function wv(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>pl())}function kv(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>bp());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>sp());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>ap()),document.querySelectorAll(".multi-select-btn").forEach(h=>{const b=h.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?h.addEventListener("click",()=>Vi("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?h.addEventListener("click",()=>Vi("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?h.addEventListener("click",()=>Vi("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&h.addEventListener("click",()=>Vi("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Wi())});const h=i.querySelector(".btn-small");h&&h.addEventListener("click",()=>ka())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>$a())});const h=s.querySelector(".btn-small");h&&h.addEventListener("click",()=>Ea())}const a=document.getElementById("label-filter-dropdown");if(a){const h=a.querySelector(".btn-small");h&&h.addEventListener("click",()=>Ki())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const h=o.querySelector(".btn-small");h&&h.addEventListener("click",()=>Yi())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>je());const d=document.getElementById("assignee-filter");d&&d.addEventListener("change",()=>je());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>je());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>ct());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>rl());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",h=>hv(h))}function $v(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Lf(t.dataset.tab))})}function Ev(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Ic());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Yn()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),D(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Pg());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>js());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>gv());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Yn())}ee({"navigate-to":(e,t)=>{D(t.view)},"set-current-project":(e,t,n)=>{Fe(n.value)},showCreateIssueModal:()=>Yn(),showCreateEpicModal:()=>_h(),"retry-load-epics":()=>Tt(),showCreateProjectModal:()=>uc(),showCreateDocumentModal:()=>Wl(),showCreateTeamModal:()=>Lc(),showEditTeamModal:()=>zg(),showInviteModal:()=>Sc(),showCreateApiKeyModal:()=>ph(),showCreateAgentModal:()=>xg(),resetOnboarding:()=>Rc(),logout:()=>Pc(),navigateToProjects:()=>D("projects")});async function xv(){if(!v.getToken()){_s();return}try{const e=await v.getMe();ji(e),await ci()}catch(e){if((e==null?void 0:e.status)===401||(e==null?void 0:e.status)===403){v.logout(),_s();return}console.error("Failed to load current user on boot:",e),_s(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{ep(),dh(),Ev(),vv(),wv(),kv(),$v(),bv(),yv(),Iv(),_v(),Vh({api:v}),yg(),nv(),await xv()});function Iv(){const e=document.getElementById("theme-toggle");if(!e)return;const t=ku()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),$u(n?"light":"dark")})}function _v(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");yc(i)}}})}async function Tv(e){try{await fe(e,!1)}catch{D("documents",!1)}}const qo=()=>["issue-detail-view","epic-detail-view","document-detail-view"].some(e=>{const t=document.getElementById(e);return t&&!t.classList.contains("hidden")});document.addEventListener("keydown",Ch({getCurrentView:S,getSelectedIndex:qr,setSelectedIndex:Gn,viewIssue:W,showEditIssueModal:Il,showInlineDropdown:La,isModalOpen:Wt,isCommandPaletteOpen:pi,isDetailViewActive:qo})),document.addEventListener("keydown",Ah({getCurrentView:S,getSelectedIndex:Gu,setSelectedIndex:Or,viewDocument:fe,showEditDocumentModal:Kl,isModalOpen:Wt,isCommandPaletteOpen:pi,isDetailViewActive:qo})),document.addEventListener("keydown",Dh({getCurrentView:S,getSelectedIndex:Hr,setSelectedIndex:Ni,viewIssue:W,isModalOpen:Wt,isCommandPaletteOpen:pi,isDetailViewActive:qo})),document.addEventListener("keydown",Bh({getCurrentView:S,getSelectedIndex:zu,setSelectedIndex:Vu,openInboxEntry:Mg,isModalOpen:Wt,isCommandPaletteOpen:pi})),document.addEventListener("keydown",Sh({closeModal:O,closeSidebar:js,navigateTo:D,showCreateIssueModal:Yn,showKeyboardShortcutsHelp:qc,isModalOpen:Wt,focusSearch:()=>{D("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),jt()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))}})),hh([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>D("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>D("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>D("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>D("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>D("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>D("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>D("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>D("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>D("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>D("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>D("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>D("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{D("issues"),setTimeout(Yn,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{D("projects"),setTimeout(uc,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{D("documents"),setTimeout(Wl,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Lc(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{D("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{D("team"),setTimeout(Sc,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>qc(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Rc(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Pc(),category:"Account"}]),document.addEventListener("keydown",Lh({isModalOpen:Wt,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:pi,openCommandPalette:vh,closeCommandPalette:Ls})),window.marked=F,window.DOMPurify=Sr,console.log("Chaotic frontend loaded via Vite")})();
