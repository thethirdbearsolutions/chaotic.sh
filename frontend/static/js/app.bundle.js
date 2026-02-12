var fm=Object.defineProperty;var hm=(De,de,lt)=>de in De?fm(De,de,{enumerable:!0,configurable:!0,writable:!0,value:lt}):De[de]=lt;var O=(De,de,lt)=>hm(De,typeof de!="symbol"?de+"":de,lt);(function(){"use strict";var Bi;function De(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var de=De();function lt(e){de=e}var Ft={exec:()=>null};function j(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let r=typeof a=="string"?a:a.source;return r=r.replace(ue.caret,"$1"),n=n.replace(i,r),s},getRegex:()=>new RegExp(n,t)};return s}var ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Nr=/^(?:[ \t]*(?:\n|$))+/,Hr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Or=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ut=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,qr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vs=/(?:[*+-]|\d{1,9}[.)])/,Ki=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Vi=j(Ki).replace(/bull/g,vs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Fr=j(Ki).replace(/bull/g,vs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),bs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ur=/^[^\n]+/,ys=/(?!\s*\])(?:\\.|[^\[\]\\])+/,zr=j(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ys).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Gr=j(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vs).getRegex(),Tn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ws=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Wr=j("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ws).replace("tag",Tn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ji=j(bs).replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex(),Kr=j(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ji).getRegex(),ks={blockquote:Kr,code:Hr,def:zr,fences:Or,heading:qr,hr:Ut,html:Wr,lheading:Vi,list:Gr,newline:Nr,paragraph:Ji,table:Ft,text:Ur},Zi=j("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex(),Vr={...ks,lheading:Fr,table:Zi,paragraph:j(bs).replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Zi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex()},Jr={...ks,html:j(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ws).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ft,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:j(bs).replace("hr",Ut).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Vi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Zr=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Yr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Yi=/^( {2,}|\\)\n(?!\s*$)/,Xr=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,In=/[\p{P}\p{S}]/u,$s=/[\s\p{P}\p{S}]/u,Xi=/[^\s\p{P}\p{S}]/u,Qr=j(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,$s).getRegex(),Qi=/(?!~)[\p{P}\p{S}]/u,el=/(?!~)[\s\p{P}\p{S}]/u,tl=/(?:[^\s\p{P}\p{S}]|~)/u,nl=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ea=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,sl=j(ea,"u").replace(/punct/g,In).getRegex(),il=j(ea,"u").replace(/punct/g,Qi).getRegex(),ta="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",al=j(ta,"gu").replace(/notPunctSpace/g,Xi).replace(/punctSpace/g,$s).replace(/punct/g,In).getRegex(),ol=j(ta,"gu").replace(/notPunctSpace/g,tl).replace(/punctSpace/g,el).replace(/punct/g,Qi).getRegex(),rl=j("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Xi).replace(/punctSpace/g,$s).replace(/punct/g,In).getRegex(),ll=j(/\\(punct)/,"gu").replace(/punct/g,In).getRegex(),cl=j(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),dl=j(ws).replace("(?:-->|$)","-->").getRegex(),ul=j("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",dl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,pl=j(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),na=j(/^!?\[(label)\]\[(ref)\]/).replace("label",xn).replace("ref",ys).getRegex(),sa=j(/^!?\[(ref)\](?:\[\])?/).replace("ref",ys).getRegex(),ml=j("reflink|nolink(?!\\()","g").replace("reflink",na).replace("nolink",sa).getRegex(),Es={_backpedal:Ft,anyPunctuation:ll,autolink:cl,blockSkip:nl,br:Yi,code:Yr,del:Ft,emStrongLDelim:sl,emStrongRDelimAst:al,emStrongRDelimUnd:rl,escape:Zr,link:pl,nolink:sa,punctuation:Qr,reflink:na,reflinkSearch:ml,tag:ul,text:Xr,url:Ft},gl={...Es,link:j(/^!?\[(label)\]\((.*?)\)/).replace("label",xn).getRegex(),reflink:j(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xn).getRegex()},Ts={...Es,emStrongRDelimAst:ol,emStrongLDelim:il,url:j(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},fl={...Ts,br:j(Yi).replace("{2,}","*").getRegex(),text:j(Ts.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_n={normal:ks,gfm:Vr,pedantic:Jr},zt={normal:Es,gfm:Ts,breaks:fl,pedantic:gl},hl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ia=e=>hl[e];function xe(e,t){if(t){if(ue.escapeTest.test(e))return e.replace(ue.escapeReplace,ia)}else if(ue.escapeTestNoEncode.test(e))return e.replace(ue.escapeReplaceNoEncode,ia);return e}function aa(e){try{e=encodeURI(e).replace(ue.percentDecode,"%")}catch{return null}return e}function oa(e,t){var a;const n=e.replace(ue.findPipe,(r,o,c)=>{let l=!1,d=o;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),s=n.split(ue.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ue.slashPipe,"|");return s}function Gt(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function vl(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function ra(e,t,n,s,i){const a=t.href,r=t.title||null,o=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:r,text:o,tokens:s.inlineTokens(o)};return s.state.inLink=!1,c}function bl(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const r=a.match(n.other.beginningSpace);if(r===null)return a;const[o]=r;return o.length>=i.length?a.slice(i.length):a}).join(`
`)}var Sn=class{constructor(e){O(this,"options");O(this,"rules");O(this,"lexer");this.options=e||de}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Gt(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=bl(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=Gt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Gt(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Gt(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let r=!1;const o=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))o.push(n[c]),r=!0;else if(!r)o.push(n[c]);else break;n=n.slice(c);const l=o.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${d}`:d;const m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=m,n.length===0)break;const p=a.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const f=p,v=f.raw+`
`+n.join(`
`),T=this.blockquote(v);a[a.length-1]=T,s=s.substring(0,s.length-f.raw.length)+T.raw,i=i.substring(0,i.length-f.text.length)+T.text;break}else if((p==null?void 0:p.type)==="list"){const f=p,v=f.raw+`
`+n.join(`
`),T=this.list(v);a[a.length-1]=T,s=s.substring(0,s.length-p.raw.length)+T.raw,i=i.substring(0,i.length-f.raw.length)+T.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let r=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),p=e.split(`
`,1)[0],f=!m.trim(),v=0;if(this.options.pedantic?(v=2,d=m.trimStart()):f?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=m.slice(v),v+=t[1].length),f&&this.rules.other.blankLine.test(p)&&(l+=p+`
`,e=e.substring(p.length+1),c=!0),!c){const C=this.rules.other.nextBulletRegex(v),q=this.rules.other.hrRegex(v),R=this.rules.other.fencesBeginRegex(v),M=this.rules.other.headingBeginRegex(v),ee=this.rules.other.htmlBeginRegex(v);for(;e;){const b=e.split(`
`,1)[0];let V;if(p=b,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),V=p):V=p.replace(this.rules.other.tabCharGlobal,"    "),R.test(p)||M.test(p)||ee.test(p)||C.test(p)||q.test(p))break;if(V.search(this.rules.other.nonSpaceChar)>=v||!p.trim())d+=`
`+V.slice(v);else{if(f||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(m)||M.test(m)||q.test(m))break;d+=`
`+p}!f&&!p.trim()&&(f=!0),l+=b+`
`,e=e.substring(b.length+1),m=V.slice(v)}}i.loose||(r?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(r=!0));let T=null,_;this.options.gfm&&(T=this.rules.other.listIsTask.exec(d),T&&(_=T[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!T,checked:_,loose:!1,text:d,tokens:[]}),i.raw+=l}const o=i.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const l=i.items[c].tokens.filter(m=>m.type==="space"),d=l.length>0&&l.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=d}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var r;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=oa(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const o of s)this.rules.other.tableAlignRight.test(o)?a.align.push("right"):this.rules.other.tableAlignCenter.test(o)?a.align.push("center"):this.rules.other.tableAlignLeft.test(o)?a.align.push("left"):a.align.push(null);for(let o=0;o<n.length;o++)a.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:a.align[o]});for(const o of i)a.rows.push(oa(o,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Gt(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=vl(t[2],"()");if(a===-2)return;if(a>-1){const o=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),ra(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return ra(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let r,o,c=a,l=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(r=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!r)continue;if(o=[...r].length,s[3]||s[4]){c+=o;continue}else if((s[5]||s[6])&&a%3&&!((a+o)%3)){l+=o;continue}if(c-=o,c>0)continue;o=Math.min(o,o+c+l);const m=[...s[0]][0].length,p=e.slice(0,a+s.index+m+o);if(Math.min(a,o)%2){const v=p.slice(1,-1);return{type:"em",raw:p,text:v,tokens:this.lexer.inlineTokens(v)}}const f=p.slice(2,-2);return{type:"strong",raw:p,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Me=class Gi{constructor(t){O(this,"tokens");O(this,"options");O(this,"state");O(this,"tokenizer");O(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||de,this.options.tokenizer=this.options.tokenizer||new Sn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ue,block:_n.normal,inline:zt.normal};this.options.pedantic?(n.block=_n.pedantic,n.inline=zt.pedantic):this.options.gfm&&(n.block=_n.gfm,this.options.breaks?n.inline=zt.breaks:n.inline=zt.gfm),this.tokenizer.rules=n}static get rules(){return{block:_n,inline:zt}}static lex(t,n){return new Gi(n).lex(t)}static lexInline(t,n){return new Gi(n).inlineTokens(t)}lex(t){t=t.replace(ue.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,r;for(this.options.pedantic&&(t=t.replace(ue.tabCharGlobal,"    ").replace(ue.spaceLine,""));t;){let o;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(o=l.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);const l=n.at(-1);o.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+o.raw,l.text+=`
`+o.text,this.inlineQueue.at(-1).src=l.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+o.raw,l.text+=`
`+o.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let c=t;if((r=this.options.extensions)!=null&&r.startBlock){let l=1/0;const d=t.slice(1);let m;this.options.extensions.startBlock.forEach(p=>{m=p.call({lexer:this},d),typeof m=="number"&&m>=0&&(l=Math.min(l,m))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(o=this.tokenizer.paragraph(c))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+o.raw,l.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(o),s=c.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+o.raw,l.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(o);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var o,c,l;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,r="";for(;t;){a||(r=""),a=!1;let d;if((c=(o=this.options.extensions)==null?void 0:o.inline)!=null&&c.some(p=>(d=p.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const p=n.at(-1);d.type==="text"&&(p==null?void 0:p.type)==="text"?(p.raw+=d.raw,p.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,r)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let m=t;if((l=this.options.extensions)!=null&&l.startInline){let p=1/0;const f=t.slice(1);let v;this.options.extensions.startInline.forEach(T=>{v=T.call({lexer:this},f),typeof v=="number"&&v>=0&&(p=Math.min(p,v))}),p<1/0&&p>=0&&(m=t.substring(0,p+1))}if(d=this.tokenizer.inlineText(m)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(r=d.raw.slice(-1)),a=!0;const p=n.at(-1);(p==null?void 0:p.type)==="text"?(p.raw+=d.raw,p.text+=d.text):n.push(d);continue}if(t){const p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Cn=class{constructor(e){O(this,"options");O(this,"parser");this.options=e||de}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ue.notSpaceStart))==null?void 0:a[0],i=e.replace(ue.endingNewline,"")+`
`;return s?'<pre><code class="language-'+xe(s)+'">'+(n?i:xe(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:xe(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let r=0;r<e.items.length;r++){const o=e.items[r];s+=this.listitem(o)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+xe(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let r=0;r<a.length;r++)n+=this.tablecell(a[r]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${xe(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=aa(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+xe(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=aa(e);if(i===null)return xe(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${xe(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:xe(e.text)}},Is=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},je=class Wi{constructor(t){O(this,"options");O(this,"renderer");O(this,"textRenderer");this.options=t||de,this.options.renderer=this.options.renderer||new Cn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Is}static parse(t,n){return new Wi(n).parse(t)}static parseInline(t,n){return new Wi(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let r=0;r<t.length;r++){const o=t[r];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[o.type]){const l=o,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=d||"";continue}}const c=o;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;r+1<t.length&&t[r+1].type==="text";)l=t[++r],d+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let r=0;r<t.length;r++){const o=t[r];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[o.type]){const l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){s+=l||"";continue}}const c=o;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Ln=(Bi=class{constructor(e){O(this,"options");O(this,"block");this.options=e||de}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Me.lex:Me.lexInline}provideParser(){return this.block?je.parse:je.parseInline}},O(Bi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Bi),yl=class{constructor(...e){O(this,"defaults",De());O(this,"options",this.setOptions);O(this,"parse",this.parseMarkdown(!0));O(this,"parseInline",this.parseMarkdown(!1));O(this,"Parser",je);O(this,"Renderer",Cn);O(this,"TextRenderer",Is);O(this,"Lexer",Me);O(this,"Tokenizer",Sn);O(this,"Hooks",Ln);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const r=a;for(const o of r.header)n=n.concat(this.walkTokens(o.tokens,t));for(const o of r.rows)for(const c of o)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const r=a;n=n.concat(this.walkTokens(r.items,t));break}default:{const r=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[r.type]?this.defaults.extensions.childTokens[r.type].forEach(o=>{const c=r[o].flat(1/0);n=n.concat(this.walkTokens(c,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...r){let o=i.renderer.apply(this,r);return o===!1&&(o=a.apply(this,r)),o}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Cn(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const r=a,o=n.renderer[r],c=i[r];i[r]=(...l)=>{let d=o.apply(i,l);return d===!1&&(d=c.apply(i,l)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Sn(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const r=a,o=n.tokenizer[r],c=i[r];i[r]=(...l)=>{let d=o.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new Ln;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const r=a,o=n.hooks[r],c=i[r];Ln.passThroughHooks.has(a)?i[r]=l=>{if(this.defaults.async)return Promise.resolve(o.call(i,l)).then(m=>c.call(i,m));const d=o.call(i,l);return c.call(i,d)}:i[r]=(...l)=>{let d=o.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(r){let o=[];return o.push(a.call(this,r)),i&&(o=o.concat(i.call(this,r))),o}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Me.lex(e,t??this.defaults)}parser(e,t){return je.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},r=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return r(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return r(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const o=a.hooks?a.hooks.provideLexer():e?Me.lex:Me.lexInline,c=a.hooks?a.hooks.provideParser():e?je.parse:je.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>o(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(r);try{a.hooks&&(n=a.hooks.preprocess(n));let l=o(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return r(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+xe(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},ct=new yl;function N(e,t){return ct.parse(e,t)}N.options=N.setOptions=function(e){return ct.setOptions(e),N.defaults=ct.defaults,lt(N.defaults),N},N.getDefaults=De,N.defaults=de,N.use=function(...e){return ct.use(...e),N.defaults=ct.defaults,lt(N.defaults),N},N.walkTokens=function(e,t){return ct.walkTokens(e,t)},N.parseInline=ct.parseInline,N.Parser=je,N.parser=je.parse,N.Renderer=Cn,N.TextRenderer=Is,N.Lexer=Me,N.lexer=Me.lex,N.Tokenizer=Sn,N.Hooks=Ln,N.parse=N,N.options,N.setOptions,N.use,N.walkTokens,N.parseInline,je.parse,Me.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:la,setPrototypeOf:ca,isFrozen:wl,getPrototypeOf:kl,getOwnPropertyDescriptor:$l}=Object;let{freeze:pe,seal:ye,create:xs}=Object,{apply:_s,construct:Ss}=typeof Reflect<"u"&&Reflect;pe||(pe=function(t){return t}),ye||(ye=function(t){return t}),_s||(_s=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),Ss||(Ss=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const An=ge(Array.prototype.forEach),El=ge(Array.prototype.lastIndexOf),da=ge(Array.prototype.pop),Wt=ge(Array.prototype.push),Tl=ge(Array.prototype.splice),Bn=ge(String.prototype.toLowerCase),Cs=ge(String.prototype.toString),Ls=ge(String.prototype.match),Kt=ge(String.prototype.replace),Il=ge(String.prototype.indexOf),xl=ge(String.prototype.trim),$e=ge(Object.prototype.hasOwnProperty),me=ge(RegExp.prototype.test),Vt=_l(TypeError);function ge(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return _s(e,t,s)}}function _l(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Ss(e,n)}}function A(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Bn;ca&&ca(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(wl(t)||(t[s]=a),i=a)}e[i]=!0}return e}function Sl(e){for(let t=0;t<e.length;t++)$e(e,t)||(e[t]=null);return e}function _e(e){const t=xs(null);for(const[n,s]of la(e))$e(e,n)&&(Array.isArray(s)?t[n]=Sl(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=_e(s):t[n]=s);return t}function Jt(e,t){for(;e!==null;){const s=$l(e,t);if(s){if(s.get)return ge(s.get);if(typeof s.value=="function")return ge(s.value)}e=kl(e)}function n(){return null}return n}const ua=pe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),As=pe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Bs=pe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Cl=pe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ds=pe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ll=pe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),pa=pe(["#text"]),ma=pe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ms=pe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ga=pe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Dn=pe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Al=ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bl=ye(/<%[\w\W]*|[\w\W]*%>/gm),Dl=ye(/\$\{[\w\W]*/gm),Ml=ye(/^data-[\-\w.\u00B7-\uFFFF]+$/),jl=ye(/^aria-[\-\w]+$/),fa=ye(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Pl=ye(/^(?:\w+script|data):/i),Rl=ye(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ha=ye(/^html$/i),Nl=ye(/^[a-z][.\w]*(-[.\w]+)+$/i);var va=Object.freeze({__proto__:null,ARIA_ATTR:jl,ATTR_WHITESPACE:Rl,CUSTOM_ELEMENT:Nl,DATA_ATTR:Ml,DOCTYPE_NAME:ha,ERB_EXPR:Bl,IS_ALLOWED_URI:fa,IS_SCRIPT_OR_DATA:Pl,MUSTACHE_EXPR:Al,TMPLIT_EXPR:Dl});const Zt={element:1,text:3,progressingInstruction:7,comment:8,document:9},Hl=function(){return typeof window>"u"?null:window},Ol=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},ba=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ya(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Hl();const t=x=>ya(x);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Zt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:r,Node:o,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:p,trustedTypes:f}=e,v=c.prototype,T=Jt(v,"cloneNode"),_=Jt(v,"remove"),C=Jt(v,"nextSibling"),q=Jt(v,"childNodes"),R=Jt(v,"parentNode");if(typeof r=="function"){const x=n.createElement("template");x.content&&x.content.ownerDocument&&(n=x.content.ownerDocument)}let M,ee="";const{implementation:b,createNodeIterator:V,createDocumentFragment:Ie,getElementsByTagName:re}=n,{importNode:le}=s;let J=ba();t.isSupported=typeof la=="function"&&typeof R=="function"&&b&&b.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Ge,ERB_EXPR:Mt,TMPLIT_EXPR:ht,DATA_ATTR:sm,ARIA_ATTR:im,IS_SCRIPT_OR_DATA:am,ATTR_WHITESPACE:gr,CUSTOM_ELEMENT:om}=va;let{IS_ALLOWED_URI:fr}=va,te=null;const hr=A({},[...ua,...As,...Bs,...Ds,...pa]);let se=null;const vr=A({},[...ma,...Ms,...ga,...Dn]);let Z=Object.seal(xs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),kn=null,Di=null;const jt=Object.seal(xs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let br=!0,Mi=!0,yr=!1,wr=!0,Pt=!1,ds=!0,vt=!1,ji=!1,Pi=!1,Rt=!1,us=!1,ps=!1,kr=!0,$r=!1;const rm="user-content-";let Ri=!0,$n=!1,Nt={},Ae=null;const Ni=A({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Er=null;const Tr=A({},["audio","video","img","source","image","track"]);let Hi=null;const Ir=A({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ms="http://www.w3.org/1998/Math/MathML",gs="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml";let Ht=We,Oi=!1,qi=null;const lm=A({},[ms,gs,We],Cs);let fs=A({},["mi","mo","mn","ms","mtext"]),hs=A({},["annotation-xml"]);const cm=A({},["title","style","font","a","script"]);let En=null;const dm=["application/xhtml+xml","text/html"],um="text/html";let Q=null,Ot=null;const pm=n.createElement("form"),xr=function(u){return u instanceof RegExp||u instanceof Function},Fi=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ot&&Ot===u)){if((!u||typeof u!="object")&&(u={}),u=_e(u),En=dm.indexOf(u.PARSER_MEDIA_TYPE)===-1?um:u.PARSER_MEDIA_TYPE,Q=En==="application/xhtml+xml"?Cs:Bn,te=$e(u,"ALLOWED_TAGS")?A({},u.ALLOWED_TAGS,Q):hr,se=$e(u,"ALLOWED_ATTR")?A({},u.ALLOWED_ATTR,Q):vr,qi=$e(u,"ALLOWED_NAMESPACES")?A({},u.ALLOWED_NAMESPACES,Cs):lm,Hi=$e(u,"ADD_URI_SAFE_ATTR")?A(_e(Ir),u.ADD_URI_SAFE_ATTR,Q):Ir,Er=$e(u,"ADD_DATA_URI_TAGS")?A(_e(Tr),u.ADD_DATA_URI_TAGS,Q):Tr,Ae=$e(u,"FORBID_CONTENTS")?A({},u.FORBID_CONTENTS,Q):Ni,kn=$e(u,"FORBID_TAGS")?A({},u.FORBID_TAGS,Q):_e({}),Di=$e(u,"FORBID_ATTR")?A({},u.FORBID_ATTR,Q):_e({}),Nt=$e(u,"USE_PROFILES")?u.USE_PROFILES:!1,br=u.ALLOW_ARIA_ATTR!==!1,Mi=u.ALLOW_DATA_ATTR!==!1,yr=u.ALLOW_UNKNOWN_PROTOCOLS||!1,wr=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Pt=u.SAFE_FOR_TEMPLATES||!1,ds=u.SAFE_FOR_XML!==!1,vt=u.WHOLE_DOCUMENT||!1,Rt=u.RETURN_DOM||!1,us=u.RETURN_DOM_FRAGMENT||!1,ps=u.RETURN_TRUSTED_TYPE||!1,Pi=u.FORCE_BODY||!1,kr=u.SANITIZE_DOM!==!1,$r=u.SANITIZE_NAMED_PROPS||!1,Ri=u.KEEP_CONTENT!==!1,$n=u.IN_PLACE||!1,fr=u.ALLOWED_URI_REGEXP||fa,Ht=u.NAMESPACE||We,fs=u.MATHML_TEXT_INTEGRATION_POINTS||fs,hs=u.HTML_INTEGRATION_POINTS||hs,Z=u.CUSTOM_ELEMENT_HANDLING||{},u.CUSTOM_ELEMENT_HANDLING&&xr(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Z.tagNameCheck=u.CUSTOM_ELEMENT_HANDLING.tagNameCheck),u.CUSTOM_ELEMENT_HANDLING&&xr(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Z.attributeNameCheck=u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Z.allowCustomizedBuiltInElements=u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Pt&&(Mi=!1),us&&(Rt=!0),Nt&&(te=A({},pa),se=[],Nt.html===!0&&(A(te,ua),A(se,ma)),Nt.svg===!0&&(A(te,As),A(se,Ms),A(se,Dn)),Nt.svgFilters===!0&&(A(te,Bs),A(se,Ms),A(se,Dn)),Nt.mathMl===!0&&(A(te,Ds),A(se,ga),A(se,Dn))),u.ADD_TAGS&&(typeof u.ADD_TAGS=="function"?jt.tagCheck=u.ADD_TAGS:(te===hr&&(te=_e(te)),A(te,u.ADD_TAGS,Q))),u.ADD_ATTR&&(typeof u.ADD_ATTR=="function"?jt.attributeCheck=u.ADD_ATTR:(se===vr&&(se=_e(se)),A(se,u.ADD_ATTR,Q))),u.ADD_URI_SAFE_ATTR&&A(Hi,u.ADD_URI_SAFE_ATTR,Q),u.FORBID_CONTENTS&&(Ae===Ni&&(Ae=_e(Ae)),A(Ae,u.FORBID_CONTENTS,Q)),u.ADD_FORBID_CONTENTS&&(Ae===Ni&&(Ae=_e(Ae)),A(Ae,u.ADD_FORBID_CONTENTS,Q)),Ri&&(te["#text"]=!0),vt&&A(te,["html","head","body"]),te.table&&(A(te,["tbody"]),delete kn.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=u.TRUSTED_TYPES_POLICY,ee=M.createHTML("")}else M===void 0&&(M=Ol(f,i)),M!==null&&typeof ee=="string"&&(ee=M.createHTML(""));pe&&pe(u),Ot=u}},_r=A({},[...As,...Bs,...Cl]),Sr=A({},[...Ds,...Ll]),mm=function(u){let w=R(u);(!w||!w.tagName)&&(w={namespaceURI:Ht,tagName:"template"});const I=Bn(u.tagName),F=Bn(w.tagName);return qi[u.namespaceURI]?u.namespaceURI===gs?w.namespaceURI===We?I==="svg":w.namespaceURI===ms?I==="svg"&&(F==="annotation-xml"||fs[F]):!!_r[I]:u.namespaceURI===ms?w.namespaceURI===We?I==="math":w.namespaceURI===gs?I==="math"&&hs[F]:!!Sr[I]:u.namespaceURI===We?w.namespaceURI===gs&&!hs[F]||w.namespaceURI===ms&&!fs[F]?!1:!Sr[I]&&(cm[I]||!_r[I]):!!(En==="application/xhtml+xml"&&qi[u.namespaceURI]):!1},Be=function(u){Wt(t.removed,{element:u});try{R(u).removeChild(u)}catch{_(u)}},bt=function(u,w){try{Wt(t.removed,{attribute:w.getAttributeNode(u),from:w})}catch{Wt(t.removed,{attribute:null,from:w})}if(w.removeAttribute(u),u==="is")if(Rt||us)try{Be(w)}catch{}else try{w.setAttribute(u,"")}catch{}},Cr=function(u){let w=null,I=null;if(Pi)u="<remove></remove>"+u;else{const Y=Ls(u,/^[\r\n\t ]+/);I=Y&&Y[0]}En==="application/xhtml+xml"&&Ht===We&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");const F=M?M.createHTML(u):u;if(Ht===We)try{w=new p().parseFromString(F,En)}catch{}if(!w||!w.documentElement){w=b.createDocument(Ht,"template",null);try{w.documentElement.innerHTML=Oi?ee:F}catch{}}const ce=w.body||w.documentElement;return u&&I&&ce.insertBefore(n.createTextNode(I),ce.childNodes[0]||null),Ht===We?re.call(w,vt?"html":"body")[0]:vt?w.documentElement:ce},Lr=function(u){return V.call(u.ownerDocument||u,u,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Ui=function(u){return u instanceof m&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof d)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},Ar=function(u){return typeof o=="function"&&u instanceof o};function Ke(x,u,w){An(x,I=>{I.call(t,u,w,Ot)})}const Br=function(u){let w=null;if(Ke(J.beforeSanitizeElements,u,null),Ui(u))return Be(u),!0;const I=Q(u.nodeName);if(Ke(J.uponSanitizeElement,u,{tagName:I,allowedTags:te}),ds&&u.hasChildNodes()&&!Ar(u.firstElementChild)&&me(/<[/\w!]/g,u.innerHTML)&&me(/<[/\w!]/g,u.textContent)||u.nodeType===Zt.progressingInstruction||ds&&u.nodeType===Zt.comment&&me(/<[/\w]/g,u.data))return Be(u),!0;if(!(jt.tagCheck instanceof Function&&jt.tagCheck(I))&&(!te[I]||kn[I])){if(!kn[I]&&Mr(I)&&(Z.tagNameCheck instanceof RegExp&&me(Z.tagNameCheck,I)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(I)))return!1;if(Ri&&!Ae[I]){const F=R(u)||u.parentNode,ce=q(u)||u.childNodes;if(ce&&F){const Y=ce.length;for(let he=Y-1;he>=0;--he){const Ve=T(ce[he],!0);Ve.__removalCount=(u.__removalCount||0)+1,F.insertBefore(Ve,C(u))}}}return Be(u),!0}return u instanceof c&&!mm(u)||(I==="noscript"||I==="noembed"||I==="noframes")&&me(/<\/no(script|embed|frames)/i,u.innerHTML)?(Be(u),!0):(Pt&&u.nodeType===Zt.text&&(w=u.textContent,An([Ge,Mt,ht],F=>{w=Kt(w,F," ")}),u.textContent!==w&&(Wt(t.removed,{element:u.cloneNode()}),u.textContent=w)),Ke(J.afterSanitizeElements,u,null),!1)},Dr=function(u,w,I){if(kr&&(w==="id"||w==="name")&&(I in n||I in pm))return!1;if(!(Mi&&!Di[w]&&me(sm,w))){if(!(br&&me(im,w))){if(!(jt.attributeCheck instanceof Function&&jt.attributeCheck(w,u))){if(!se[w]||Di[w]){if(!(Mr(u)&&(Z.tagNameCheck instanceof RegExp&&me(Z.tagNameCheck,u)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(u))&&(Z.attributeNameCheck instanceof RegExp&&me(Z.attributeNameCheck,w)||Z.attributeNameCheck instanceof Function&&Z.attributeNameCheck(w,u))||w==="is"&&Z.allowCustomizedBuiltInElements&&(Z.tagNameCheck instanceof RegExp&&me(Z.tagNameCheck,I)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(I))))return!1}else if(!Hi[w]){if(!me(fr,Kt(I,gr,""))){if(!((w==="src"||w==="xlink:href"||w==="href")&&u!=="script"&&Il(I,"data:")===0&&Er[u])){if(!(yr&&!me(am,Kt(I,gr,"")))){if(I)return!1}}}}}}}return!0},Mr=function(u){return u!=="annotation-xml"&&Ls(u,om)},jr=function(u){Ke(J.beforeSanitizeAttributes,u,null);const{attributes:w}=u;if(!w||Ui(u))return;const I={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:se,forceKeepAttr:void 0};let F=w.length;for(;F--;){const ce=w[F],{name:Y,namespaceURI:he,value:Ve}=ce,qt=Q(Y),zi=Ve;let ie=Y==="value"?zi:xl(zi);if(I.attrName=qt,I.attrValue=ie,I.keepAttr=!0,I.forceKeepAttr=void 0,Ke(J.uponSanitizeAttribute,u,I),ie=I.attrValue,$r&&(qt==="id"||qt==="name")&&(bt(Y,u),ie=rm+ie),ds&&me(/((--!?|])>)|<\/(style|title|textarea)/i,ie)){bt(Y,u);continue}if(qt==="attributename"&&Ls(ie,"href")){bt(Y,u);continue}if(I.forceKeepAttr)continue;if(!I.keepAttr){bt(Y,u);continue}if(!wr&&me(/\/>/i,ie)){bt(Y,u);continue}Pt&&An([Ge,Mt,ht],Rr=>{ie=Kt(ie,Rr," ")});const Pr=Q(u.nodeName);if(!Dr(Pr,qt,ie)){bt(Y,u);continue}if(M&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!he)switch(f.getAttributeType(Pr,qt)){case"TrustedHTML":{ie=M.createHTML(ie);break}case"TrustedScriptURL":{ie=M.createScriptURL(ie);break}}if(ie!==zi)try{he?u.setAttributeNS(he,Y,ie):u.setAttribute(Y,ie),Ui(u)?Be(u):da(t.removed)}catch{bt(Y,u)}}Ke(J.afterSanitizeAttributes,u,null)},gm=function x(u){let w=null;const I=Lr(u);for(Ke(J.beforeSanitizeShadowDOM,u,null);w=I.nextNode();)Ke(J.uponSanitizeShadowNode,w,null),Br(w),jr(w),w.content instanceof a&&x(w.content);Ke(J.afterSanitizeShadowDOM,u,null)};return t.sanitize=function(x){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},w=null,I=null,F=null,ce=null;if(Oi=!x,Oi&&(x="<!-->"),typeof x!="string"&&!Ar(x))if(typeof x.toString=="function"){if(x=x.toString(),typeof x!="string")throw Vt("dirty is not a string, aborting")}else throw Vt("toString is not a function");if(!t.isSupported)return x;if(ji||Fi(u),t.removed=[],typeof x=="string"&&($n=!1),$n){if(x.nodeName){const Ve=Q(x.nodeName);if(!te[Ve]||kn[Ve])throw Vt("root node is forbidden and cannot be sanitized in-place")}}else if(x instanceof o)w=Cr("<!---->"),I=w.ownerDocument.importNode(x,!0),I.nodeType===Zt.element&&I.nodeName==="BODY"||I.nodeName==="HTML"?w=I:w.appendChild(I);else{if(!Rt&&!Pt&&!vt&&x.indexOf("<")===-1)return M&&ps?M.createHTML(x):x;if(w=Cr(x),!w)return Rt?null:ps?ee:""}w&&Pi&&Be(w.firstChild);const Y=Lr($n?x:w);for(;F=Y.nextNode();)Br(F),jr(F),F.content instanceof a&&gm(F.content);if($n)return x;if(Rt){if(us)for(ce=Ie.call(w.ownerDocument);w.firstChild;)ce.appendChild(w.firstChild);else ce=w;return(se.shadowroot||se.shadowrootmode)&&(ce=le.call(s,ce,!0)),ce}let he=vt?w.outerHTML:w.innerHTML;return vt&&te["!doctype"]&&w.ownerDocument&&w.ownerDocument.doctype&&w.ownerDocument.doctype.name&&me(ha,w.ownerDocument.doctype.name)&&(he="<!DOCTYPE "+w.ownerDocument.doctype.name+`>
`+he),Pt&&An([Ge,Mt,ht],Ve=>{he=Kt(he,Ve," ")}),M&&ps?M.createHTML(he):he},t.setConfig=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Fi(x),ji=!0},t.clearConfig=function(){Ot=null,ji=!1},t.isValidAttribute=function(x,u,w){Ot||Fi({});const I=Q(x),F=Q(u);return Dr(I,F,w)},t.addHook=function(x,u){typeof u=="function"&&Wt(J[x],u)},t.removeHook=function(x,u){if(u!==void 0){const w=El(J[x],u);return w===-1?void 0:Tl(J[x],w,1)[0]}return da(J[x])},t.removeHooks=function(x){J[x]=[]},t.removeAllHooks=function(){J=ba()},t}var ql=ya();const Fl="/api";class Ul{constructor(){try{this.token=localStorage.getItem("chaotic_token")}catch(t){console.warn("Failed to access localStorage:",t),this.token=null}}setToken(t){this.token=t;try{t?localStorage.setItem("chaotic_token",t):localStorage.removeItem("chaotic_token")}catch(n){console.warn("Failed to persist token to localStorage:",n)}}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const r=await fetch(`${Fl}${n}`,a);if(r.status===204)return null;let o;try{o=await r.json()}catch{const c=r.headers.get("content-type")||"unknown";throw r.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${r.status})`)}if(!r.ok){const c=typeof o.detail=="string"?o.detail:"An error occurred";throw new Error(c)}return o}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let r=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(r+=`&project_id=${s}`),this.request("GET",r)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(r=>s.append(i,r)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const $=new Ul;window.api=$;let yt=null;function B(){document.getElementById("modal-overlay").classList.remove("hidden")}function P(){document.getElementById("modal-overlay").classList.add("hidden")}function g(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.remove()},3e3)}function Yt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),yt&&(document.removeEventListener("keydown",yt),yt=null)}function zl(e){yt&&document.removeEventListener("keydown",yt),yt=e,e&&document.addEventListener("keydown",e)}function Mn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(Yt(),document.removeEventListener("click",s))};return setTimeout(()=>document.addEventListener("click",s),0),()=>document.removeEventListener("click",s)}Object.assign(window,{showModal:B,closeModal:P,showToast:g,closeAllDropdowns:Yt,registerDropdownClickOutside:Mn});function js(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function dt(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function E(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function ae(e){return E(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function jn(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),r=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:r<7?`${r}d ago`:t.toLocaleDateString()}function k(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}let wt=null,Xt=null,Qt=null,en=null;function Pn(){wt||(wt=document.getElementById("auth-screen"),Xt=document.getElementById("main-screen"),Qt=document.getElementById("login-form"),en=document.getElementById("signup-form"))}function Rn(){Pn(),wt&&wt.classList.remove("hidden"),Xt&&Xt.classList.add("hidden")}function wa(){Pn(),wt&&wt.classList.add("hidden"),Xt&&Xt.classList.remove("hidden")}function ka(){Pn(),Qt&&Qt.classList.remove("hidden"),en&&en.classList.add("hidden")}function $a(){Pn(),Qt&&Qt.classList.add("hidden"),en&&en.classList.remove("hidden")}async function Ea(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await $.login(t,n),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),g("Welcome back!","success")}catch(s){g(s.message,"error")}return!1}async function Ta(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await $.signup(t,n,s),await $.login(n,s),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),g("Account created successfully!","success")}catch(i){g(i.message,"error")}return!1}function Ps(){$.logout(),window.currentUser=null,window.currentTeam=null,Rn(),g("Signed out","success")}function Ia(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function xa(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Ia(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${ae(s)}" alt="${ae(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}Object.assign(window,{showAuthScreen:Rn,showMainScreen:wa,showLogin:ka,showSignup:$a,handleLogin:Ea,handleSignup:Ta,logout:Ps,updateUserInfo:xa,isImageAvatar:Ia});function _a(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let kt=[],Nn=[],U=new Set,$t="list",ut=!1,Rs=null;try{const e=localStorage.getItem("chaotic_doc_view_mode");(e==="list"||e==="grid")&&($t=e)}catch{}function Gl(e){if(e!=="list"&&e!=="grid")return;$t=e,e==="grid"&&ut&&Hn();try{localStorage.setItem("chaotic_doc_view_mode",e)}catch{}const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),Pe()}function Sa(){if($t!=="list")return;ut=!0,U.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=Hn),Pe(),Tt()}function Hn(){ut=!1,U.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=Sa),Pe(),Tt()}function Wl(){Rs&&clearTimeout(Rs),Rs=setTimeout(()=>{Pe()},300)}function Kl(){const e=document.getElementById("doc-search");e&&(e.value=""),Pe()}function Vl(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),Pe()}function Jl(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),Pe()}function Zl(){var i,a,r;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${E(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const o=document.getElementById("doc-project-filter"),c=((r=o==null?void 0:o.options[o.selectedIndex])==null?void 0:r.text)||"Project";s.push(`<span class="filter-chip">Project: ${E(c)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let o=s.join(" ");s.length>1&&(o+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=o,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Pe(){var s,i,a,r;const e=((i=(s=document.getElementById("doc-search"))==null?void 0:s.value)==null?void 0:i.toLowerCase())||"",t=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",n=((r=document.getElementById("doc-sort"))==null?void 0:r.value)||"updated_desc";Zl(),Nn=kt.filter(o=>{var c,l;if(e){const d=(c=o.title)==null?void 0:c.toLowerCase().includes(e),m=(l=o.content)==null?void 0:l.toLowerCase().includes(e);if(!d&&!m)return!1}return!(t&&o.project_id!==t)}),Nn.sort((o,c)=>{switch(n){case"title_asc":return(o.title||"").localeCompare(c.title||"");case"title_desc":return(c.title||"").localeCompare(o.title||"");case"updated_asc":return new Date(o.updated_at)-new Date(c.updated_at);case"updated_desc":default:return new Date(c.updated_at)-new Date(o.updated_at)}}),Ca("",$t)}async function Et(e,t=null){var n;if(e||(e=(n=window.currentTeam)==null?void 0:n.id),!!e){if(t===null){const s=document.getElementById("doc-project-filter");s!=null&&s.value&&(t=s.value)}try{kt=await $.getDocuments(e,t);const s=document.getElementById("doc-view-list"),i=document.getElementById("doc-view-grid");s&&i&&(s.classList.toggle("active",$t==="list"),i.classList.toggle("active",$t==="grid")),Pe()}catch(s){g(s.message,"error")}}}function Yl(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${dt(t.color)}; color: white;">${E(t.name)}</span>`).join(" ")}function Xl(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Yl(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${ae(e.id)}" onclick="viewDocument('${k(e.id)}')">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${E(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${E(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?E(_a(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${E(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Ql(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(o=>`<span class="badge badge-small" style="background-color: ${dt(o.color)}; color: white;">${E(o.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?_a(e.content).substring(0,80):"No content",i=ut?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${k(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${U.has(e.id)?"checked":""}>
       </div>`:"",a=ut&&U.has(e.id)?" selected":"",r=ut?`toggleDocSelection('${k(e.id)}')`:`viewDocument('${k(e.id)}')`;return`
    <div class="list-item document-list-item${a}" onclick="${r}">
      ${i}
      <div class="document-list-icon">${E(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${E(e.title)}</div>
        <div class="document-list-snippet text-muted">${E(s)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?E(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Ca(e="",t="list"){var l,d;const n=document.getElementById("documents-list");if(!n)return;U.clear(),Tt();const s=Nn.length>0||(l=document.getElementById("doc-search"))!=null&&l.value?Nn:kt;if(s.length===0){const m=(d=document.getElementById("doc-search"))==null?void 0:d.value;n.innerHTML=`
      <div class="empty-state">
        <h3>${m?"No documents match your search":"No documents yet"}</h3>
        <p>${m?"Try a different search term":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?Xl:Ql,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const r={},o=window.getProjects?window.getProjects():[];s.forEach(m=>{let p,f;if(e==="project")if(p=m.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const v=o.find(T=>T.id===m.project_id);f=v?v.name:"Unknown Project"}else e==="sprint"&&(p=m.sprint_id||"__no_sprint__",f=m.sprint_id?"Sprint":"No Sprint");r[p]||(r[p]={label:f,docs:[]}),r[p].docs.push(m)});let c="";for(const[m,p]of Object.entries(r)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${E(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function ec(e){U.has(e)?U.delete(e):U.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=U.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",U.has(e)),Tt()}function tc(){kt.forEach(e=>U.add(e.id)),kt.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Tt()}function La(){U.clear(),kt.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.remove("selected")}),Tt()}function Tt(){const e=document.getElementById("doc-bulk-actions");e&&(ut?(e.classList.remove("hidden"),U.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function nc(){if(U.size===0){g("No documents selected","error");return}const t=(window.getProjects?window.getProjects():[]).map(n=>`<option value="${n.id}">${E(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${U.size} Document${U.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,B()}async function sc(e){var r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(U);let s=0,i=0;for(const o of n)try{await $.updateDocument(o,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${o}:`,c),i++}P(),La(),i===0?g(`Moved ${s} document${s>1?"s":""}!`,"success"):g(`Moved ${s}, failed ${i}`,"warning");const a=(r=window.currentTeam)==null?void 0:r.id;return await Et(a),!1}async function ic(){var a;if(U.size===0){g("No documents selected","error");return}const e=U.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(U);let n=0,s=0;for(const r of t)try{await $.deleteDocument(r),n++}catch(o){console.error(`Failed to delete document ${r}:`,o),s++}Hn(),s===0?g(`Deleted ${n} document${n>1?"s":""}!`,"success"):g(`Deleted ${n}, failed ${s}`,"warning");const i=(a=window.currentTeam)==null?void 0:a.id;await Et(i)}async function Se(e,t=!0){try{const n=await $.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(m=>m.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(m=>E(m));let a="";try{const m=await $.getDocumentIssues(n.id);m.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${m.map(f=>`
          <div class="linked-item">
            <span class="linked-item-id">${E(f.identifier)}</span>
            <span class="linked-item-title">${E(f.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${k(n.id)}', '${k(f.id)}')" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${k(n.id)}')">+ Link Issue</button>
          </div>
        `:a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <p class="empty-state-small">No linked issues</p>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${k(n.id)}')">+ Link Issue</button>
          </div>
        `}catch{}let r="";try{const m=await $.getDocumentComments(n.id);r=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${m.length===0?'<div class="comments-empty">No comments yet</div>':m.map(f=>{var v,T;return`
            <div class="comment" data-comment-id="${ae(f.id)}">
              <div class="comment-avatar">${((T=(v=f.author_name)==null?void 0:v.charAt(0))==null?void 0:T.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${E(f.author_name||"Unknown")}</span>
                  <span class="comment-date">${jn(f.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(f.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${k(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(m){console.error("Failed to load comments:",m)}let o=null,c=null;if(n.project_id){const p=(window.getProjects?window.getProjects():[]).find(f=>f.id===n.project_id);if(o=p?p.name:null,n.sprint_id)try{const f=await $.getSprint(n.sprint_id);c=f?f.name:null}catch{}}let l="";o?(l=`<span class="badge badge-primary">${E(o)}</span>`,c&&(l+=` <span class="badge badge-info">${E(c)}</span>`)):l='<span class="badge badge-secondary">Global</span>';let d="";n.labels&&n.labels.length>0?d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(p=>`
        <span class="label-badge" style="background-color: ${dt(p.color)}; color: white;">
          ${E(p.name)}
          <button class="btn-remove-label" onclick="removeLabelFromDoc('${k(n.id)}', '${k(p.id)}')" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${k(n.id)}')">+ Add Label</button>
        </div>
      `:d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <p class="empty-state-small">No labels</p>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${k(n.id)}')">+ Add Label</button>
        </div>
      `,s.querySelector("#document-detail-content").innerHTML=`
      <div class="back-button" onclick="navigateTo('documents')">
        ← Back to Documents
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
        <div>
          <h2 class="document-title">${E(n.title)}</h2>
          <div class="document-meta">
            ${l}${n.author_name?` · By ${E(n.author_name)}`:""} · Last updated ${new Date(n.updated_at).toLocaleString()}
          </div>
        </div>
        <div class="list-item-actions">
          <button class="btn btn-secondary btn-small" onclick="showEditDocumentModal('${k(n.id)}')">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteDocument('${k(n.id)}')">Delete</button>
        </div>
      </div>
      <div class="document-content markdown-body">${n.content?i(n.content):"No content"}</div>
      ${d}
      ${a}
      ${r}
    `}catch(n){g(n.message,"error")}}async function Ns(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await $.getSprints(t);let r=n;if(s&&!n){const c=a.find(l=>l.status==="active");c&&(r=c.id)}const o=a.map(c=>`<option value="${c.id}" ${c.id===r?"selected":""}>${E(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${o}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Hs(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${E(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,B(),t&&await Ns("doc-sprint",t,null,!0)}async function ac(e){var a;e.preventDefault();const t=(a=window.currentTeam)==null?void 0:a.id;if(!t)return g("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await $.createDocument(t,i),await Et(t),P(),g("Document created!","success")}catch(r){g(r.message,"error")}return!1}async function oc(e){try{const t=await $.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${E(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form onsubmit="return handleUpdateDocument(event, '${k(e)}')">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${ae(t.title)}" required>
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
          <textarea id="edit-doc-content" style="min-height: 200px">${E(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${ae(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,B(),t.project_id&&await Ns("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){g(t.message,"error")}}async function rc(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await $.updateDocument(t,i),P(),await Se(t),g("Document updated!","success")}catch(a){g(a.message,"error")}return!1}async function lc(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await $.deleteDocument(e);const n=(t=window.currentTeam)==null?void 0:t.id;await Et(n),window.navigateTo&&window.navigateTo("documents"),g("Document deleted!","success")}catch(n){g(n.message,"error")}}function cc(e,t){Ns(e,t)}async function dc(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${k(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${k(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,B()}async function uc(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,a=await $.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(r=>`
      <div class="link-result-item" onclick="linkToIssue('${k(t)}', '${k(r.id)}')">
        <span class="link-result-id">${E(r.identifier)}</span>
        <span class="link-result-title">${E(r.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function pc(e,t){try{await $.linkDocumentToIssue(e,t),P(),g("Issue linked!","success"),await Se(e,!1)}catch(n){g(n.message,"error")}}async function mc(e,t){if(confirm("Unlink this issue from the document?"))try{await $.unlinkDocumentFromIssue(e,t),g("Issue unlinked!","success"),await Se(e,!1)}catch(n){g(n.message,"error")}}async function gc(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return g("Please enter a comment","error"),!1;try{await $.createDocumentComment(t,s),n.value="",g("Comment added!","success"),await Se(t,!1)}catch(i){g(i.message,"error")}return!1}async function fc(e){var n;const t=(n=window.currentTeam)==null?void 0:n.id;if(!t){g("No team selected","error");return}try{const s=await $.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,B();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${k(e)}', '${k(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${dt(a.color)}; color: white;">${E(a.name)}</span>
        ${a.description?`<span class="text-muted">${E(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,B()}catch(s){g(s.message,"error")}}async function hc(e,t){try{await $.addLabelToDocument(e,t),P(),g("Label added!","success"),await Se(e,!1)}catch(n){g(n.message,"error")}}async function vc(e,t){try{await $.removeLabelFromDocument(e,t),g("Label removed!","success"),await Se(e,!1)}catch(n){g(n.message,"error")}}Object.assign(window,{loadDocuments:Et,filterDocuments:Pe,renderDocuments:Ca,viewDocument:Se,showCreateDocumentModal:Hs,handleCreateDocument:ac,showEditDocumentModal:oc,handleUpdateDocument:rc,deleteDocument:lc,updateDocSprintDropdown:cc,showLinkIssueModal:dc,searchIssuesToLink:uc,linkToIssue:pc,unlinkDocumentFromIssue:mc,toggleDocSelection:ec,selectAllDocs:tc,clearDocSelection:La,showBulkMoveModal:nc,handleBulkMove:sc,bulkDeleteDocuments:ic,handleAddDocumentComment:gc,showAddLabelToDocModal:fc,addLabelToDoc:hc,removeLabelFromDoc:vc,setDocViewMode:Gl,enterSelectionMode:Sa,exitSelectionMode:Hn,debounceDocSearch:Wl,clearDocSearch:Kl,clearDocProjectFilter:Vl,clearAllDocFilters:Jl});let tn=[];function bc(){return tn}function yc(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Aa(e){const t=e==null?void 0:e.avatar_url,n=ae((e==null?void 0:e.name)||"Agent");return t?yc(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${ae(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${E(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function wc(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{tn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function Os(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{tn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Ba()}catch(n){g(n.message,"error")}}function Ba(){const e=document.getElementById("agents-list");if(e){if(tn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=tn.map(t=>{const n=E(t.name),s=E(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Aa(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${js(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${k(t.id)}', '${k(t.name||"Agent")}')">Delete</button>
      </div>
    `}).join("")}}function Da(){const e=window.projects||[];document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${E(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),B()}async function kc(e){var r,o,c;e.preventDefault();const t=(r=window.currentTeam)==null?void 0:r.id;if(!t)return g("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((o=document.getElementById("agent-avatar"))==null?void 0:o.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;i&&a?l=await $.createProjectAgent(a,n,s):l=await $.createTeamAgent(t,n,s),P();const d=E(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,B()}catch(l){g(l.message,"error")}return!1}function $c(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{g("Agent API key copied to clipboard","success")}).catch(()=>{g("Failed to copy","error")})}async function Ec(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await $.deleteAgent(e),g("Agent deleted","success"),Os()}catch(n){g(n.message,"error")}}Object.assign(window,{loadTeamAgentsQuiet:wc,loadAgents:Os,renderAgents:Ba,showCreateAgentModal:Da,handleCreateAgent:kc,copyAgentKey:$c,deleteAgent:Ec,renderAgentAvatar:Aa});let On=[],nn=[],qs=[],Fs=[];function Ma(){return On}function It(){return nn}function Tc(e){nn=e}async function qn(){try{On=await $.getMyTeams(),ja()}catch(e){g(e.message,"error")}}function ja(){const e=document.getElementById("team-list");On.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=On.map(t=>`
            <button class="dropdown-item" data-team-json="${ae(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${E(t.name)}</button>
        `).join("")}async function Us(e,t=!1){window.currentTeam=e,document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("team-description-text");n&&(n.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),Ra(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function zs(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Pa(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Ra(){if(window.currentTeam)try{nn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function Gs(){if(window.currentTeam)try{nn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Na()}catch(e){g(e.message,"error")}}function Na(){const e=document.getElementById("team-members-list");e.innerHTML=nn.map(t=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${E(t.user_name||"Unknown")}</span>
                    <span class="member-email">${E(t.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${t.role}</span>
                ${t.user_id!==window.currentUser.id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" onclick="removeMember('${k(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function Fn(){if(window.currentTeam)try{qs=await $.getTeamInvitations(window.currentTeam.id),Ha()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Ha(){const e=document.getElementById("team-invitations-list");if(qs.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=qs.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${E(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${E(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${k(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function Oa(){if(window.currentTeam)try{Fs=await $.getTeamAgents(window.currentTeam.id),qa()}catch(e){g(e.message,"error")}}function qa(){const e=document.getElementById("team-agents-list");if(e){if(Fs.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=Fs.map(t=>{const n=E(t.name),s=E(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${E(i)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${s} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function Ws(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,B()}async function Ic(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await $.createInvitation(window.currentTeam.id,t,n),await Fn(),P(),g("Invitation sent!","success")}catch(s){g(s.message,"error")}return!1}async function xc(e){if(confirm("Are you sure you want to remove this member?"))try{await $.removeMember(window.currentTeam.id,e),await Gs(),g("Member removed!","success")}catch(t){g(t.message,"error")}}async function _c(e){try{await $.deleteInvitation(window.currentTeam.id,e),await Fn(),g("Invitation canceled!","success")}catch(t){g(t.message,"error")}}function Ks(){zs(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,B()}function Fa(){window.currentTeam&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateTeam(event)">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${ae(window.currentTeam.name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${ae(window.currentTeam.key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${E(window.currentTeam.description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,B())}async function Sc(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await $.createTeam(t);await qn(),await Us(n),P(),g("Team created!","success")}catch(n){g(n.message,"error")}return!1}async function Cc(e){if(e.preventDefault(),!window.currentTeam)return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await $.updateTeam(window.currentTeam.id,t);window.currentTeam=n,document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await qn(),P(),g("Team updated!","success")}catch(n){g(n.message,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:qn,renderTeamList:ja,selectTeam:Us,toggleTeamDropdown:zs,toggleUserDropdown:Pa,loadTeamMembersQuiet:Ra,loadTeamMembers:Gs,renderTeamMembers:Na,loadTeamInvitations:Fn,renderTeamInvitations:Ha,loadTeamAgents:Oa,renderTeamAgents:qa,showInviteModal:Ws,handleInvite:Ic,removeMember:xc,deleteInvitation:_c,showCreateTeamModal:Ks,showEditTeamModal:Fa,handleCreateTeam:Sc,handleUpdateTeam:Cc,getTeams:Ma,getMembers:It,setMembers:Tc});let G=[];const sn={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function fe(){return G}function Lc(e){G=e}function Un(e){const t=G.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return sn[n]||sn.fibonacci}function zn(e,t){if(!e)return"No estimate";const s=Un(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Ua(e){const t=G.find(r=>r.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(sn[n]||sn.fibonacci).filter(r=>r.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(o=>`${o.label}=${o.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(r=>r.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function Ee(){if(window.currentTeam)try{G=await $.getProjects(window.currentTeam.id),za()}catch(e){g(e.message,"error")}}function za(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=e==null?void 0:e.value,a=t==null?void 0:t.value,r=n==null?void 0:n.value,o=s==null?void 0:s.value,c='<option value="">All Projects</option>'+G.map(m=>`<option value="${m.id}">${E(m.name)}</option>`).join(""),l='<option value="">Select Project</option>'+G.map(m=>`<option value="${m.id}">${E(m.name)}</option>`).join(""),d=Vs();if(e){e.innerHTML=c;let m=i;if(!m||!G.some(p=>p.id===m))if(d&&G.some(p=>p.id===d))m=d;else{const f=new URLSearchParams(window.location.search).get("project");f&&G.some(v=>v.id===f)?m=f:G.length>0&&(m=G[0].id)}m&&(e.value=m,localStorage.setItem("chaotic_last_project",m))}if(t){t.innerHTML=l;const m=a||d;m&&G.some(p=>p.id===m)&&(t.value=m)}if(n){n.innerHTML=l;const m=r||d;m&&G.some(p=>p.id===m)&&(n.value=m)}s&&(s.innerHTML=c,o&&G.some(m=>m.id===o)&&(s.value=o))}function Vs(){return localStorage.getItem("chaotic_last_project")}function an(e){if(!e)return;localStorage.setItem("chaotic_last_project",e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function on(){const e=document.getElementById("projects-list");if(G.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=G.map(t=>`
        <div class="grid-item" onclick="viewProject('${k(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${dt(t.color)}20; color: ${dt(t.color)}">
                    ${E(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${E(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${k(t.id)}')" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${E(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function Ac(e){document.getElementById("project-filter").value=e,window.navigateTo&&window.navigateTo("issues")}function Js(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,B()}async function Bc(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.createProject(window.currentTeam.id,t),await Ee(),on(),P(),g("Project created!","success")}catch(n){g(n.message,"error")}return!1}function Dc(e){const t=G.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateProject(event, '${k(t.id)}')">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" value="${ae(t.name)}" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key</label>
                <input type="text" id="project-key" value="${t.key}" disabled class="input-disabled">
                <small class="form-hint">Project key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description">${E(t.description||"")}</textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="${dt(t.color)}">
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
                <button type="button" class="btn btn-danger-outline" onclick="confirmDeleteProject('${k(t.id)}')">Delete Project</button>
            </div>
        </form>
    `,B()}async function Mc(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.updateProject(t,n),await Ee(),on(),P(),g("Project updated!","success")}catch(s){g(s.message,"error")}return!1}async function jc(e){const t=G.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await $.deleteProject(e),await Ee(),on(),P(),g("Project deleted","success")}catch(n){g(n.message,"error")}}let Te=null;async function Ga(e){Te=e,G.length===0&&await Ee();const t=G.find(n=>n.id===e);if(!t){g("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Wa("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Wa(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Je||Je.length===0)&&Gn()}function Zs(){Te=null,Je=[]}async function Pc(){if(!Te)return;const e=document.getElementById("ps-name").value.trim();if(!e){g("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await $.updateProject(Te,t),await Ee(),g("Settings saved","success");const n=G.find(s=>s.id===Te);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){g(n.message,"error")}}async function Rc(){if(!Te)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await $.updateProject(Te,n),await Ee(),g("Settings saved","success")}catch(s){g(s.message,"error")}}let Je=[];async function Gn(){if(Te)try{Je=await $.getRituals(Te),Nc()}catch(e){g(e.message,"error")}}function Nc(){const e=Je.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=Je.filter(s=>s.trigger==="ticket_close"),n=Je.filter(s=>s.trigger==="ticket_claim");Ys("ps-sprint-rituals-list",e,"sprint"),Ys("ps-close-rituals-list",t,"close"),Ys("ps-claim-rituals-list",n,"claim")}function Ys(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>ae(a||"auto");s.innerHTML=t.map(a=>`
    <div class="ritual-item">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${E(a.name)}</div>
        <div class="ritual-item-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):E(a.prompt)}</div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${i(a.approval_mode)}">${E(a.approval_mode||"auto")}</span>
          ${a.approval_mode==="auto"?"- Agent clears immediately":""}
          ${a.approval_mode==="review"?"- Requires human approval":""}
          ${a.approval_mode==="gate"?"- Human only":""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${k(a.id)}')">Edit</button>
        <button class="btn btn-danger btn-small" data-ritual-id="${ae(a.id)}" data-ritual-name="${ae(a.name)}" onclick="deleteProjectRitual(this.dataset.ritualId, this.dataset.ritualName)">Delete</button>
      </div>
    </div>
  `).join("")}function Hc(e){Te&&(document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
      ${window.renderConditionBuilder?window.renderConditionBuilder(null):""}
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,B())}async function Oc(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}const n={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,conditions:t};try{await $.createRitual(Te,n),await Gn(),P(),g("Ritual created!","success")}catch(s){g(s.message,"error")}return!1}function qc(e){const t=Je.find(n=>n.id===e);t&&(document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${k(e)}')">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${ae(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${E(t.prompt)}</textarea>
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
      ${window.renderConditionBuilder?window.renderConditionBuilder(t.conditions):""}
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,B())}async function Fc(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,conditions:n};try{await $.updateRitual(t,s),await Gn(),P(),g("Ritual updated!","success")}catch(i){g(i.message,"error")}return!1}async function Uc(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await $.deleteRitual(e),await Gn(),g("Ritual deleted","success")}catch(n){g(n.message,"error")}}Object.assign(window,{loadProjects:Ee,updateProjectFilters:za,getSavedProjectId:Vs,setGlobalProjectSelection:an,renderProjects:on,viewProject:Ac,showCreateProjectModal:Js,handleCreateProject:Bc,viewProjectSettings:Ga,switchProjectSettingsTab:Wa,saveProjectSettingsGeneral:Pc,saveProjectSettingsRules:Rc,clearProjectSettingsState:Zs,showEditProjectModal:Dc,handleUpdateProject:Mc,confirmDeleteProject:jc,getEstimateOptions:Un,formatEstimate:zn,getEstimateScaleHint:Ua,getProjects:fe,setProjects:Lc,ESTIMATE_SCALES:sn,showCreateProjectRitualModal:Hc,handleCreateProjectRitual:Oc,showEditProjectRitualModal:qc,handleUpdateProjectRitual:Fc,deleteProjectRitual:Uc});const Wn={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Kn={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Ka=0;function zc(e){Ka=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=Va(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Va(e="",t="",n=""){const s=Ka++,i=Object.keys(Wn).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),r=(e?Wn[e]:Wn.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${Kn[l]}</option>`).join(""),o=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" onchange="updateOperatorOptions(${s})">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" onchange="toggleValueInput(${s})">
                ${r}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${Zc(String(o))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" onclick="removeConditionRow(${s})">&times;</button>
        </div>
    `}function Gc(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Va()),Vn()}function Wc(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Vn()}function Kc(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Wn[i]||[];s.innerHTML=a.map(r=>`<option value="${r}">${Kn[r]}</option>`).join(""),Ja(e),Vn()}function Ja(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function rn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Vn(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Vc(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const r of e){const o=(s=r.querySelector(".condition-field"))==null?void 0:s.value,c=(i=r.querySelector(".condition-operator"))==null?void 0:i.value,l=r.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!o&&!c)continue;if(!o)throw rn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw rn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const m=`${o}__${c}`;if(n.has(m))throw rn(`Duplicate condition: ${o} ${Kn[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${m}`);if(n.add(m),c==="isnull")t[m]=!0;else if(c==="in"||c==="contains")t[m]=d?d.split(",").map(p=>p.trim()).filter(p=>p):[];else if(c==="gte"||c==="lte"){if(!d)throw rn(`Please enter a numeric value for ${o} ${Kn[c]}.`),new Error(`Missing numeric value for ${m}`);const p=parseInt(d,10);if(isNaN(p))throw rn(`Invalid number "${d}" for ${o}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${m}: ${d}`);t[m]=p}else t[m]=d}return Vn(),Object.keys(t).length>0?t:null}function Jc(e){if(typeof window.escapeHtml=="function")return window.escapeHtml(e);const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Zc(e){return typeof window.escapeAttr=="function"?window.escapeAttr(e):Jc(e)}Object.assign(window,{renderConditionBuilder:zc,addConditionRow:Gc,removeConditionRow:Wc,updateOperatorOptions:Kc,toggleValueInput:Ja,collectConditions:Vc});function Za(e){if(!e)return"";const t=new Date(e),s=new Date-t,i=Math.floor(s/6e4),a=Math.floor(i/60),r=Math.floor(a/24);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:r<7?`${r}d ago`:t.toLocaleDateString()}function Yc(e,t,n,s,i,a,r,o){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${E(i)}</span>
                    <span class="gate-approval-issue-title">${E(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${k(t)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${E(s)}</div>
                ${r?`<div class="gate-approval-requested">Requested by <strong>${E(r)}</strong>${o?` ${Za(o)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{Xc(c,e,t,n)}),B()}async function Xc(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await $.completeTicketGateRitual(t,n,i||null),g(`GATE ritual "${s}" approved!`,"success"),P(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(a){g(a.message,"error")}}function Ya(e,t,n,s,i,a,r,o){Yc(e,t,n,s,i,a,r,o)}function Qc(e,t,n,s,i,a,r,o,c){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${E(i)}</span>
                    <span class="gate-approval-issue-title">${E(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${k(t)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${E(s)}</div>
                ${r?`<div class="gate-approval-requested">Attested by <strong>${E(r)}</strong>${o?` ${Za(o)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${E(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{ed(l,e,t,n)}),B()}async function ed(e,t,n,s){e.preventDefault();try{await $.approveTicketRitual(t,n),g(`Review ritual "${s}" approved!`,"success"),P(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(i){g(i.message,"error")}}function td(e,t,n,s,i,a,r,o,c){Qc(e,t,n,s,i,a,r,o,c)}window.completeGateFromList=Ya,window.approveReviewFromList=td;let Xs=[];async function Qs(){try{Xs=await $.getApiKeys(),nd()}catch(e){g(e.message,"error")}}function nd(){const e=document.getElementById("api-keys-list");if(e){if(Xs.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=Xs.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${E(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${E(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${js(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${js(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${k(t.id)}', '${k(t.name)}')">Revoke</button>
            `:""}
        </div>
    `).join("")}}function Xa(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateApiKey(event)">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,B()}async function sd(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await $.createApiKey(t);P(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,B()}catch(n){g(n.message,"error")}return!1}async function Qa(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),g("API key copied to clipboard","success")}catch{g("Failed to copy","error")}}async function eo(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await $.revokeApiKey(e),g("API key revoked","success"),await Qs()}catch(n){g(n.message,"error")}}window.loadApiKeys=Qs,window.showCreateApiKeyModal=Xa,window.handleCreateApiKey=sd,window.copyApiKey=Qa,window.revokeApiKey=eo;let Jn=!1,Re=0,Ze=[],Zn=[];function id(e){Zn=e,Ze=[...e]}function to(){return Jn}function ad(){if(Jn)return;Jn=!0,Re=0,Ze=[...Zn];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Yn()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>od(n.target.value)),t.addEventListener("keydown",ld),ln(),requestAnimationFrame(()=>t.focus())}function Yn(){Jn=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function od(e){const t=e.toLowerCase().trim();t?Ze=Zn.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Ze=[...Zn],Re=0,ln()}function ln(){const e=document.getElementById("command-results");if(!e)return;if(Ze.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Ze.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,r]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const o of r)n+=`
                <div class="command-item ${s===Re?"selected":""}"
                     data-index="${s}"
                     onclick="executeCommand(${s})"
                     onmouseenter="selectCommand(${s})">
                    <div class="command-item-icon">${o.icon}</div>
                    <div class="command-item-content">
                        <div class="command-item-title">${o.title}</div>
                        <div class="command-item-subtitle">${o.subtitle}</div>
                    </div>
                    ${o.shortcut?`<div class="command-item-shortcut"><kbd>${o.shortcut}</kbd></div>`:""}
                </div>
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function rd(e){Re=e,ln()}function no(e){const t=Ze[e];t&&(Yn(),t.action())}function ld(e){switch(e.key){case"ArrowDown":e.preventDefault(),Re=Math.min(Re+1,Ze.length-1),ln();break;case"ArrowUp":e.preventDefault(),Re=Math.max(Re-1,0),ln();break;case"Enter":e.preventDefault(),no(Re);break;case"Escape":e.preventDefault(),Yn();break}}window.selectCommand=rd,window.executeCommand=no;let cn=[],ei=[],Ne={getCurrentUser:()=>null,getCurrentTeam:()=>null,renderIssueRow:()=>"",formatActivityText:()=>"",formatActivityActor:()=>"",getActivityIcon:()=>"📝",navigateToIssueByIdentifier:()=>{},viewDocument:()=>{}};function cd(e){Ne={...Ne,...e}}function Xn(){return cn}function dn(e){cn=e}async function ti(){var s;const e=Ne.getCurrentTeam(),t=Ne.getCurrentUser();if(!e||!t)return;const n=(s=document.getElementById("my-issues-status-filter"))==null?void 0:s.value;ud();try{cn=await $.getTeamIssues(e.id,{assignee_id:t.id,status:n||void 0,limit:1e3}),un()}catch(i){g(i.message,"error")}}async function xt(){const e=Ne.getCurrentTeam();if(!e)return;const t=document.getElementById("dashboard-activity-list");t&&(t.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{ei=await $.getTeamActivities(e.id,0,10),dd()}catch{t&&(t.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function dd(){const e=document.getElementById("dashboard-activity-list");if(e){if(!ei.length){e.innerHTML='<div class="activity-empty">No activity yet</div>';return}e.innerHTML=ei.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${k(t.issue_identifier)}'); return false;"><strong>${E(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${k(t.document_id)}'); return false;"><strong>${s} ${E(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${E(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Ne.getActivityIcon(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Ne.formatActivityText(t)}${n}</span>
                <span class="activity-actor">by ${E(Ne.formatActivityActor(t))}</span>
                <span class="activity-time">${jn(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function ud(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function so(){ti()}function un(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),cn.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=cn.map(t=>Ne.renderIssueRow(t)).join("")}}window.filterMyIssues=so;let Ce=null,He=0,_t=null,St=null,pn=null,ni=!1;function io(){try{return localStorage.getItem("chaotic_onboarding_complete")==="true"}catch{return!1}}function ao(){try{localStorage.setItem("chaotic_onboarding_complete","true")}catch{}}function oo(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function pd(){Ce||(Ce=document.createElement("div"),Ce.id="onboarding-overlay",Ce.className="onboarding-overlay",document.getElementById("app").appendChild(Ce))}function mn(){if(!Ce)return;const e=ni?lo():ro(),t=e[He],n=e.map((s,i)=>`<span class="onboarding-dot${i===He?" active":""}${i<He?" completed":""}"></span>`).join("");Ce.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function ro(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=oo(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=oo(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&_t&&(e.textContent=`${_t.name} (${_t.key})`),t&&St&&(t.textContent=`${St.name} (${St.key})`),n&&pn&&(n.textContent=`${pn.identifier} - ${pn.title}`)}}]}function lo(){const e='<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';return[{html:`
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
            `}]}function si(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ii(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ct(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=ni?lo():ro();He<e.length-1&&(He++,mn())},window._onboardingSkip=function(){ao(),oi(),window.initApp&&window.initApp()},window._onboardingFinish=function(){ao(),oi(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),ii("onboarding-team-error"),Ct("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{_t=await api.createTeam({name:t,key:n}),He++,mn()}catch(s){si("onboarding-team-error",s.message||"Failed to create team"),Ct("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),ii("onboarding-project-error"),Ct("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{St=await api.createProject(_t.id,{name:t,key:n}),He++,mn()}catch(s){si("onboarding-project-error",s.message||"Failed to create project"),Ct("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),ii("onboarding-issue-error"),Ct("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{pn=await api.createIssue(St.id,{title:t}),He++,mn()}catch(n){si("onboarding-issue-error",n.message||"Failed to create issue"),Ct("onboarding-issue-submit",!1)}};function ai(e=!1){ni=e,He=0,_t=null,St=null,pn=null,pd(),mn()}function oi(){Ce&&(Ce.remove(),Ce=null)}function ri(){try{localStorage.removeItem("chaotic_onboarding_complete")}catch{}ai(!0)}window.showOnboarding=ai,window.hideOnboarding=oi,window.resetOnboarding=ri,window.hasCompletedOnboarding=io;function md(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function gn(){const t=new URLSearchParams(window.location.search).get("project");return t||Vs()}function li(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let Lt=[],Qn={},es=new Set,Oe=null,co=null,uo=[],po=[];function gd(){return Qn}function fd(){return Oe}function mo(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=gn();t&&fe().some(n=>n.id===t)&&(e.value=t)}e.value?Ye(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function hd(){const e=document.getElementById("sprint-project-filter").value;e&&(an(e),li(e)),Ye(e)}async function Ye(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){Ad();try{await $.getCurrentSprint(t),Lt=await $.getSprints(t),vd(),await ts()}catch(n){g(n.message,"error")}}}function vd(){const e=document.getElementById("sprints-list");if(!e)return;const t=Lt.find(a=>a.status==="active"),n=Lt.find(a=>a.status==="planned"),s=Lt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",r=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${r?"sprint-arrears":""}"
                 onclick="viewSprint('${k(t.id)}')" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${r?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${W(t.name)}</div>
                <div class="sprint-card-budget ${r?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${k(t.id)}', '${k(t.name)}', ${t.budget||"null"}, '${k(t.project_id)}')">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${k(t.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=bd(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="viewSprint('${k(n.id)}')" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${W(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${k(n.id)}', '${k(n.name)}', ${n.budget||"null"}, '${k(n.project_id)}')">Edit Budget</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" onclick="viewSprint('${k(a.id)}')" style="cursor: pointer;">
                            <span class="sprint-history-name">${W(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||'<div class="empty-state"><p>Loading sprints...</p></div>'}function bd(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),r=new Date(e.start_date),o=new Date(e.end_date),d=((V,Ie,re)=>Math.min(Math.max(V,Ie),re))((new Date-r)/(o-r),0,1),m=360,p=120,f=16,v=f,T=m-f,_=f,C=p-f,q=V=>s===0?C:_+(1-V/s)*(C-_),R=q(s),M=q(0),ee=v+(T-v)*d,b=q(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${ns(e.start_date)} → ${ns(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${m} ${p}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${v}" y1="${R}" x2="${T}" y2="${M}" class="burndown-ideal" />
                <line x1="${v}" y1="${R}" x2="${ee}" y2="${b}" class="burndown-actual" />
                <circle cx="${ee}" cy="${b}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function ci(e,t=!0){try{const n=await $.getSprint(e);if(!n){g("Sprint not found","error"),window.navigateTo("sprints");return}co=n;const[s,i]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getSprintTransactions(e).catch(()=>[])]);uo=s,po=i,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),wd()}catch(n){console.error("Failed to load sprint:",n),g("Failed to load sprint","error"),window.navigateTo("sprints")}}async function yd(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){g("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await ci(e,!1)}catch{window.navigateTo("sprints",!1)}}function wd(){const e=co,t=uo;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(d=>s.includes(d.status)),a=t.filter(d=>d.status==="done"),r=t.reduce((d,m)=>d+(m.estimate||0),0),o=a.reduce((d,m)=>d+(m.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const l=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" onclick="navigateTo('sprints')">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${W(e.name)}</h2>
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
                <div class="stat-value">${o} / ${r}</div>
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
                        ${i.map(d=>go(d)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${a.map(d=>go(d)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${kd()}
            </div>
        </div>
    `}function go(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",r=`status-dot-${i}`;return`
        <div class="sprint-issue-row" onclick="viewIssue('${k(e.id)}')">
            <span class="status-dot ${r}"></span>
            <span class="sprint-issue-identifier">${W(e.identifier)}</span>
            <span class="sprint-issue-title">${W(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${Md(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function kd(){const e=po;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${W(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${W(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${$d(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function $d(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Ed(e,t,n,s){const i=s?Ua(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateBudget(event, '${k(e)}', '${k(s)}')">
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${i?`<small class="form-hint">${W(i)}</small>`:""}
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
    `,B()}async function Td(e,t,n){var r;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((r=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:r.value)||"this";try{if(await $.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const c=Lt.filter(l=>l.status==="planned"&&l.id!==t);for(const l of c)await $.updateSprint(l.id,{budget:i})}a==="default"&&n&&await $.updateProject(n,{default_sprint_budget:i}),await Ye(),P(),g(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(o){g(o.message,"error")}return!1}async function Id(e){const t=Lt.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,B();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[c,l]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getRituals(t.project_id)]);s=c.filter(d=>n.includes(d.status)).length,i=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const r=t.points_spent||0,o=t.budget!==null&&t.budget!==void 0?`<strong>${r}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${r}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${W(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${o}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${k(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function xd(e){try{const t=await $.closeSprint(e);await Ye(),t.limbo?Sd(t):g("Sprint completed!","success")}catch(t){g(t.message,"error")}}async function ts(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{Oe=await $.getLimboStatus(e),_d()}catch(n){console.error("Failed to load limbo status:",n)}}function _d(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Oe||!Oe.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Oe.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Sd(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${W(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" onclick="closeModal(); loadLimboStatus();">Got it</button>
        </div>
    `,B(),Cd(t)}async function Cd(e){try{const t=await $.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${W(s.name)} <span class="ritual-mode">(${W(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(s.prompt):W(s.prompt)}</div>
                    ${ui(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function di(){var t,n,s;if(!Oe)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Oe.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${W(i.name)}</strong>
                            <span class="badge badge-ritual-${Dd(i.approval_mode)}">${W(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(i.prompt):W(i.prompt)}</div>
                        ${ui(i.attestation)}
                        ${Ld(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((s=Oe.completed_rituals)==null?void 0:s.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Oe.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${W(i.name)}</div>
                            ${ui(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,B()}function ui(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${W(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${W(jn(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${window.renderMarkdown?window.renderMarkdown(e.note):W(e.note)}</div>
        </div>
    `}function Ld(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" onclick="approveRitual('${k(e.id)}', '${k(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${k(e.id)}', '${k(t)}', '${k(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function fo(e){for(const t of e)if(!es.has(t))try{(await $.getSprints(t)).forEach(s=>{Qn[s.id]=s}),es.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Ad(){Qn={},es=new Set}function Bd(e,t){t.forEach(n=>{Qn[n.id]=n}),es.add(e)}function W(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Dd(e){return e?W(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;"):""}function ns(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Md(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}const ho=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Xe=[],pi=null,X={api:null,showToast:()=>{},getProjects:()=>[],getProjectFromUrl:()=>null,setGlobalProjectSelection:()=>{},updateUrlWithProject:()=>{},escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,formatPriority:e=>e};function jd(e){X={...X,...e}}function mi(){const e=document.getElementById("board-project-filter");if(!e)return;const t=X.getProjects();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${X.escapeHtml(n.name)}</option>`).join(""),!e.value){const n=X.getProjectFromUrl();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)gi(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function Pd(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(X.setGlobalProjectSelection(e),X.updateUrlWithProject(e)),gi(e)}async function gi(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){mi();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{Xe=await X.api.getIssues({project_id:t}),Qe()}catch(i){X.showToast(i.message,"error")}}function Qe(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=ho.map(t=>{const n=Xe.filter(s=>s.status===t.key);return`
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
                        <div class="kanban-card" draggable="true" data-id="${X.escapeAttr(s.id)}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             ondragover="handleCardDragOver(event)" ondragleave="handleCardDragLeave(event)" ondrop="handleCardDrop(event)"
                             onclick="viewIssue('${X.escapeJsString(s.id)}')">
                            <div class="kanban-card-title">${X.escapeHtml(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${X.formatPriority(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function Rd(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),pi=e.target.dataset.id,e.target.classList.add("dragging")}function Nd(e){e.target.classList.remove("dragging"),pi=null}function Hd(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function Od(e){e.currentTarget.classList.remove("drag-over")}function qd(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function Fd(e){e.currentTarget.classList.remove("drag-over")}async function Ud(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=Xe.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,vo(n,t),Qe(),i!==n)try{await X.api.updateIssue(t,{status:n}),X.showToast("Status updated","success")}catch(a){s.status=i,Qe(),X.showToast(a.message,"error")}}async function zd(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=pi||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=Xe.find(o=>o.id===t);if(!a)return;const r=a.status;if(a.status=i,vo(i,t,n),Qe(),r!==i)try{await X.api.updateIssue(t,{status:i}),X.showToast("Status updated","success")}catch(o){a.status=r,Qe(),X.showToast(o.message,"error")}}function vo(e,t,n=null){const s=Xe.filter(r=>r.status===e&&r.id!==t),i=Xe.find(r=>r.id===t);if(!i)return;if(n){const r=s.findIndex(o=>o.id===n);r>=0?s.splice(r,0,i):s.push(i)}else s.push(i);const a=[];ho.forEach(r=>{r.key===e?a.push(...s):a.push(...Xe.filter(o=>o.status===r.key))}),Xe=a}const bo=["backlog","todo","in_progress","in_review","done","canceled"],yo=["urgent","high","medium","low","no_priority"],wo=["task","bug","feature","chore","docs"];let L={getIssues:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatEstimate:()=>"",getSprintCache:()=>({}),formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",escapeHtml:e=>e||"",escapeAttr:e=>e||"",escapeJsString:e=>e||"",sanitizeColor:e=>e||"#888",renderAvatar:()=>"",getAssigneeOptionList:()=>[],getGroupByValue:()=>""};function Gd(e){L={...L,...e}}function qe(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=L.getIssues();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=L.getGroupByValue();n==="status"?Wd(e,t):n==="priority"?Kd(e,t):n==="type"?Vd(e,t):n==="assignee"?Jd(e,t):n==="sprint"?Zd(e,t):e.innerHTML=t.map(s=>Le(s)).join("")}function Wd(e,t){const n={};bo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s="";bo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${tt(i)}</span>
                    <span class="group-title">${L.formatStatus(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(r=>Le(r)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Kd(e,t){const n={};yo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s="";yo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${et(i)}</span>
                    <span class="group-title">${L.formatPriority(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(r=>Le(r)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Vd(e,t){const n={};wo.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s="";wo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${L.formatIssueType(i)}</span></span>
                    <span class="group-title">${L.formatIssueType(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(r=>Le(r)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Jd(e,t){const n={},s="__unassigned__";n[s]=[];const i=L.getAssigneeOptionList();i.forEach(({assignee:r})=>{n[r.id]=[]}),t.forEach(r=>{r.assignee_id&&n[r.assignee_id]?n[r.assignee_id].push(r):n[s].push(r)});let a="";n[s].length>0&&(a+=`
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
                    ${n[s].map(r=>Le(r)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:r})=>{const o=n[r.id];if(!o||o.length===0)return;const c=L.formatAssigneeName(r)||"Unknown",l=r.is_agent?r.parent_user_name?` (${r.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${r.id}">
                <div class="issue-group-header" onclick="toggleGroup('${L.escapeJsString(r.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${L.renderAvatar(r,"avatar-small")}</span>
                    <span class="group-title">${L.escapeHtml(c)}${L.escapeHtml(l)}</span>
                    <span class="group-count">${o.length}</span>
                </div>
                <div class="issue-group-content">
                    ${o.map(d=>Le(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Zd(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},r=L.getSprintCache();i.sort((c,l)=>{const d=r[c],m=r[l],p=d?a[d.status]??3:3,f=m?a[m.status]??3:3;return p-f});let o="";i.forEach(c=>{const l=s[c];if(l.length===0)return;const d=r[c],m=d?d.name:c,p=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",f=c.replace(/[^a-zA-Z0-9_-]/g,"_");o+=`
            <div class="issue-group" data-group="${f}">
                <div class="issue-group-header" onclick="toggleGroup('${f}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${L.escapeHtml(m)}${p}</span>
                    <span class="group-count">${l.length}</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(v=>Le(v)).join("")}
                </div>
            </div>
        `}),s[n].length>0&&(o+=`
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
                    ${s[n].map(c=>Le(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=o}function Yd(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Le(e){const t=e.assignee_id?L.getAssigneeById(e.assignee_id):null,n=t?L.formatAssigneeName(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?L.formatEstimate(e.estimate,e.project_id):"",a=e.sprint_id?L.getSprintCache()[e.sprint_id]:null,r=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${L.escapeAttr(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${L.escapeAttr(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${L.escapeJsString(e.id)}')" title="Priority: ${L.formatPriority(e.priority)}">
                    ${et(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${L.escapeJsString(e.id)}')" title="Status: ${L.formatStatus(e.status)}">
                    ${tt(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${L.formatIssueType(e.issue_type)}</span>
                <span class="issue-title" onclick="viewIssue('${L.escapeJsString(e.id)}')">${L.escapeHtml(e.title)}</span>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(o=>`
                            <span class="issue-label" style="background: ${L.sanitizeColor(o.color)}20; color: ${L.sanitizeColor(o.color)}">${L.escapeHtml(o.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${L.escapeJsString(e.id)}')" title="Sprint: ${r?L.escapeHtml(r):"None"}">
                    ${r?`<span class="sprint-badge">${L.escapeHtml(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'estimate', '${L.escapeJsString(e.id)}')" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'assignee', '${L.escapeJsString(e.id)}')" title="${L.escapeAttr(n||"Unassigned")}">
                    ${n?L.renderAvatar(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function et(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function tt(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}const ko=["backlog","todo","in_progress","in_review","done","canceled"],$o=["no_priority","urgent","high","medium","low"],Xd=["task","bug","feature","chore","docs"];let nt=[],Eo=Promise.resolve(),h={api:null,getIssues:()=>[],setIssues:()=>{},getMyIssues:()=>[],setMyIssues:()=>{},getCurrentDetailIssue:()=>null,setCurrentDetailIssue:()=>{},getLabels:()=>[],setLabels:()=>{},getCurrentTeam:()=>null,getCurrentDetailSprints:()=>[],closeAllDropdowns:()=>{},registerDropdownClickOutside:()=>{},setDropdownKeyHandler:()=>{},showToast:()=>{},getStatusIcon:()=>"",getPriorityIcon:()=>"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatAssigneeOptionLabel:e=>(e==null?void 0:e.name)||"",getAssigneeOptionList:()=>[],getAssigneeById:()=>null,getEstimateOptions:()=>[],renderAvatar:()=>"",renderIssueRow:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",updateSprintCacheForProject:()=>{},updateSprintBudgetBar:()=>{}};function Qd(e){h={...h,...e}}async function To(e,t,n){var d,m;e.preventDefault(),h.closeAllDropdowns();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${ko.map((p,f)=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${h.escapeJsString(n)}', 'status', '${p}')">
                    ${h.getStatusIcon(p)}
                    <span>${h.formatStatus(p)}</span>
                    <span class="dropdown-shortcut">${f+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${$o.map((p,f)=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${h.escapeJsString(n)}', 'priority', '${p}')">
                    ${h.getPriorityIcon(p)}
                    <span>${h.formatPriority(p)}</span>
                    <span class="dropdown-shortcut">${f}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Xd.map(p=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${h.escapeJsString(n)}', 'issue_type', '${p}')">
                    <span class="issue-type-badge type-${p}">${h.formatIssueType(p)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const p=h.getAssigneeOptionList();a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" onclick="updateIssueField('${h.escapeJsString(n)}', 'assignee_id', null)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${p.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:p.map(({assignee:f,indent:v},T)=>`
                <button class="dropdown-option" onclick="updateIssueField('${h.escapeJsString(n)}', 'assignee_id', '${h.escapeJsString(f.id)}')">
                    ${h.renderAvatar(f,"avatar-small")}
                    <span>${h.formatAssigneeOptionLabel(f,v)}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const p=document.querySelector(`.issue-row[data-issue-id="${n}"]`),f=(p==null?void 0:p.dataset.projectId)||((d=h.getCurrentDetailIssue())==null?void 0:d.project_id),v=h.getEstimateOptions(f);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${v.map((T,_)=>`
                <button class="dropdown-option" onclick="updateIssueField('${h.escapeJsString(n)}', 'estimate', ${T.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${T.label}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const p=h.getIssues(),f=h.getMyIssues(),v=h.getCurrentDetailIssue(),T=p.find(re=>re.id===n)||f.find(re=>re.id===n)||v,_=new Set(((T==null?void 0:T.labels)||[]).map(re=>re.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const C=a.getBoundingClientRect();let q=i.bottom+4,R=i.left;R+C.width>window.innerWidth-8&&(R=i.right-C.width),q+C.height>window.innerHeight-8&&(q=i.top-C.height-4),a.style.top=`${q}px`,a.style.left=`${Math.max(8,R)}px`,h.registerDropdownClickOutside(a,{multiSelect:!0});let M=[];const ee=h.getCurrentTeam();if(ee)try{M=await h.api.getLabels(ee.id)}catch(re){console.error("Failed to load labels:",re)}if(!a.parentNode)return;_o(a,n,M,_);const b=a.getBoundingClientRect();let V=i.bottom+4,Ie=i.left;Ie+b.width>window.innerWidth-8&&(Ie=i.right-b.width),V+b.height>window.innerHeight-8&&(V=i.top-b.height-4),a.style.top=`${V}px`,a.style.left=`${Math.max(8,Ie)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const p=h.getIssues(),f=h.getMyIssues(),v=h.getCurrentDetailIssue(),T=p.find(le=>le.id===n)||f.find(le=>le.id===n)||v,_=(T==null?void 0:T.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const C=a.getBoundingClientRect();let q=i.bottom+4,R=i.left;R+C.width>window.innerWidth-8&&(R=i.right-C.width),q+C.height>window.innerHeight-8&&(q=i.top-C.height-4),a.style.top=`${q}px`,a.style.left=`${Math.max(8,R)}px`,h.registerDropdownClickOutside(a);let M=[];if(_)try{M=await h.api.getSprints(_),h.updateSprintCacheForProject(_,M)}catch(le){console.error("Failed to load sprints:",le)}if(!a.parentNode)return;const ee=M.filter(le=>le.status!=="completed"||le.id===(T==null?void 0:T.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${h.escapeJsString(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${ee.map((le,J)=>`
                <button class="dropdown-option" onclick="updateIssueField('${h.escapeJsString(n)}', 'sprint_id', '${h.escapeJsString(le.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${h.escapeHtml(le.name)}${le.status==="active"?" (Active)":""}</span>
                    ${J<9?`<span class="dropdown-shortcut">${J+1}</span>`:""}
                </button>
            `).join("")}
        `;const b=a.getBoundingClientRect();let V=i.bottom+4,Ie=i.left;Ie+b.width>window.innerWidth-8&&(Ie=i.right-b.width),V+b.height>window.innerHeight-8&&(V=i.top-b.height-4),a.style.top=`${V}px`,a.style.left=`${Math.max(8,Ie)}px`,a.classList.remove("dropdown-positioning");const re=le=>{const J=le.key;if(J==="Escape"){h.closeAllDropdowns(),document.removeEventListener("keydown",re),h.setDropdownKeyHandler(null);return}const Ge=parseInt(J);if(isNaN(Ge))return;const Mt=a.querySelectorAll(".dropdown-option");let ht=!1;Ge===0?(fn(n,"sprint_id",null),ht=!0):Ge>=1&&Ge<Mt.length&&(Mt[Ge].click(),ht=!0),ht&&(document.removeEventListener("keydown",re),h.setDropdownKeyHandler(null))};h.setDropdownKeyHandler(re),document.addEventListener("keydown",re);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const r=a.getBoundingClientRect();let o=i.bottom+4,c=i.left;c+r.width>window.innerWidth-8&&(c=i.right-r.width),o+r.height>window.innerHeight-8&&(o=i.top-r.height-4),a.style.top=`${o}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const l=p=>{const f=p.key;if(f==="Escape"){h.closeAllDropdowns(),document.removeEventListener("keydown",l);return}const v=parseInt(f);if(isNaN(v))return;let T=!1;if(t==="status"&&v>=1&&v<=6)fn(n,"status",ko[v-1]),T=!0;else if(t==="priority"&&v>=0&&v<=4)fn(n,"priority",$o[v]),T=!0;else if(t==="estimate"){const _=h.getCurrentDetailIssue(),C=h.getEstimateOptions(_==null?void 0:_.project_id);v>=0&&v<C.length&&(fn(n,"estimate",C[v].value),T=!0)}T&&(document.removeEventListener("keydown",l),h.setDropdownKeyHandler(null))};h.setDropdownKeyHandler(l),document.addEventListener("keydown",l),h.registerDropdownClickOutside(a)}function Io(e,t,n){e.stopPropagation(),To(e,t,n)}function eu(e,t,n){Eo=Eo.then(()=>xo(e,t,n))}async function xo(e,t,n){const s=h.getIssues(),i=h.getMyIssues(),a=h.getCurrentDetailIssue(),r=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!r)return;const o=(r.labels||[]).map(d=>d.id),c=o.indexOf(t);let l;if(c>=0?l=o.filter(d=>d!==t):l=[...o,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const m=(await h.api.updateIssue(e,{label_ids:l})).labels||[],p=s.findIndex(_=>_.id===e);p!==-1&&(s[p].labels=m,h.setIssues([...s]));const f=i.findIndex(_=>_.id===e);f!==-1&&(i[f].labels=m,h.setMyIssues([...i])),(a==null?void 0:a.id)===e&&h.setCurrentDetailIssue({...a,labels:m});const v=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(v&&v.parentNode){const _=s.find(C=>C.id===e)||i.find(C=>C.id===e);_&&(v.outerHTML=h.renderIssueRow(_))}const T=document.querySelector(".property-labels-btn");T&&(T.innerHTML=m.length>0?m.map(_=>`
                    <span class="issue-label" style="background: ${h.sanitizeColor(_.color)}20; color: ${h.sanitizeColor(_.color)}">${h.escapeHtml(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(h.showToast("Failed to update labels","error"),n){const d=c>=0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}}}function _o(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleLabelCreateKey(event, '${h.escapeJsString(t)}')">
            <button class="btn btn-small" onclick="createLabelFromDropdown('${h.escapeJsString(t)}')">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-label-id="${i.id}" onclick="event.stopPropagation(); toggleIssueLabel('${h.escapeJsString(t)}', '${h.escapeJsString(i.id)}', this)">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${h.sanitizeColor(i.color)}20; color: ${h.sanitizeColor(i.color)}">${h.escapeHtml(i.name)}</span>
                </button>
            `}).join("")}
    `}async function tu(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=h.getCurrentTeam();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await h.api.createLabel(s.id,{name:i}),r=await h.api.getLabels(s.id);h.setLabels(r),a!=null&&a.id&&await xo(e,a.id,null);const o=h.getIssues(),c=h.getMyIssues(),l=h.getCurrentDetailIssue(),d=o.find(p=>p.id===e)||c.find(p=>p.id===e)||l,m=new Set(((d==null?void 0:d.labels)||[]).map(p=>p.id));t&&_o(t,e,r,m),n.value=""}catch(a){h.showToast(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function ss(){const e=document.getElementById("create-issue-labels-label");e&&(nt.length===0?e.textContent="Labels":e.textContent=`Labels (${nt.length})`)}function fi(e){const t=h.getLabels();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=nt.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${h.escapeJsString(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${h.sanitizeColor(n.color)}20; color: ${h.sanitizeColor(n.color)}">${h.escapeHtml(n.name)}</span>
                </button>
            `}).join("")}
    `}function nu(e){const t=nt.indexOf(e);t>=0?nt.splice(t,1):nt.push(e),ss();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&fi(n)}async function su(){const e=h.getCurrentTeam();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await h.api.createLabel(e.id,{name:s}),a=await h.api.getLabels(e.id);h.setLabels(a),i!=null&&i.id&&!nt.includes(i.id)&&nt.push(i.id),ss(),t&&fi(t),n.value=""}catch(i){h.showToast(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function fn(e,t,n){var i;h.closeAllDropdowns();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const r=await h.api.updateIssue(e,a);if(!r||!r.id)throw new Error("Invalid response from server");const o=h.getIssues(),c=o.findIndex(p=>p.id===e);c!==-1&&(o[c]=r,h.setIssues([...o]));const l=h.getMyIssues(),d=l.findIndex(p=>p.id===e);d!==-1&&(l[d]=r,h.setMyIssues([...l]));const m=h.getCurrentDetailIssue();if((m==null?void 0:m.id)===e&&h.setCurrentDetailIssue(r),s&&s.parentNode){const p=o.find(f=>f.id===e)||l.find(f=>f.id===e)||r;if(p){s.outerHTML=h.renderIssueRow(p);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);f&&(f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500))}}if(h.showToast("Issue updated","success"),t==="status"){const p=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(p)try{const v=(await h.api.getSprints(p)).find(T=>T.status==="active");h.updateSprintBudgetBar(v||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&iu(t,r)}}catch(a){h.showToast(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function iu(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let r=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){r=c;break}}if(!r)return;const o=r.querySelector(".property-value");if(o){if(e==="status")o.innerHTML=`
            ${h.getStatusIcon(t.status)}
            <span>${h.formatStatus(t.status)}</span>
        `;else if(e==="priority")o.innerHTML=`
            ${h.getPriorityIcon(t.priority)}
            <span>${h.formatPriority(t.priority)}</span>
        `;else if(e==="issue_type")o.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${h.formatIssueType(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?h.getAssigneeById(t.assignee_id):null,l=c?h.formatAssigneeName(c):null;o.innerHTML=l?`${h.renderAvatar(c,"avatar-small")}<span>${h.escapeHtml(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=h.getCurrentDetailSprints(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;o.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?h.escapeHtml(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(o.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${h.formatEstimate(t.estimate,t.project_id)}</span>
        `);o.classList.add("updated"),setTimeout(()=>o.classList.remove("updated"),500)}}let st=!0,is=null,y={api:null,currentView:"my-issues",showToast:()=>{},showModal:()=>{},closeModal:()=>{},navigateTo:()=>{},getProjects:()=>[],getMembers:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",renderMarkdown:e=>e,renderAvatar:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",showDetailDropdown:()=>{},setupMentionAutocomplete:()=>{},renderTicketRitualActions:()=>""};function au(e){y={...y,...e}}function So(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Co(e){return e.user_name||e.user_email||"Unknown"}function Lo(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":return"Added a comment";case"status_changed":return`Changed status from <strong>${y.formatStatus(t(e.old_value))}</strong> to <strong>${y.formatStatus(t(e.new_value))}</strong>`;case"priority_changed":return`Changed priority from <strong>${y.formatPriority(t(e.old_value))}</strong> to <strong>${y.formatPriority(t(e.new_value))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${e.sprint_name}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${e.sprint_name}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":return e.field_name?`Attested to <strong>${e.field_name}</strong>`:"Attested to ritual";case"updated":return e.field_name?`Updated ${n[e.field_name]||e.field_name}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||e.field_name}`:"Updated issue"}}function Ao(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let r=a.parentElement;for(;r&&r!==e;){if(r.tagName==="CODE"||r.tagName==="PRE")return NodeFilter.FILTER_REJECT;r=r.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function ou(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const r=document.createDocumentFragment();let o=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>o&&r.appendChild(document.createTextNode(t.slice(o,d.index))),d[1]){const m=d[1],p=document.createElement("a");p.href=`#/issue/${m}`,p.className="issue-link",p.textContent=m,r.appendChild(p),o=d.index+d[0].length}else if(d[3]){d[2]&&r.appendChild(document.createTextNode(d[2]));const m=document.createElement("span");m.className="mention",m.textContent="@"+d[3],r.appendChild(m),o=d.index+d[0].length}c&&(o<t.length&&r.appendChild(document.createTextNode(t.slice(o))),e.parentNode.replaceChild(r,e))}function ru(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let r;for(;(r=n.exec(t))!==null;){a=!0,r.index>i&&s.appendChild(document.createTextNode(t.slice(i,r.index)));const o=r[1],c=document.createElement("a");c.href=`#/issue/${o}`,c.className="issue-link",c.textContent=o,s.appendChild(c),i=r.index+r[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function lu(e){if(!e)return"";const t=y.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Ao(n,ou),n.innerHTML}function Bo(e){if(!e)return"";const t=y.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Ao(n,ru),n.innerHTML}function Do(e,t){const n=e.target;n.tagName==="A"||n.closest("a")||window.editDescription&&window.editDescription(t)}function Mo(){st=!st;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",st),n&&n.classList.toggle("rotated",!st)}async function hn(e){try{is=await y.api.getTicketRitualsStatus(e),cu(e)}catch(t){console.error("Failed to load ticket rituals:",t),is=null}}function cu(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!is){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=is;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(st=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",st);const r=t.querySelector(".section-toggle-icon");r&&r.classList.toggle("rotated",!st);const o=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";o&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":o&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">○</span>
                            <span class="ticket-ritual-name">${y.escapeHtml(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?y.renderMarkdown(d.prompt):""}</div>
                        <div class="ticket-ritual-actions">
                            ${y.renderTicketRitualActions(d,e)}
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
                            <span class="ticket-ritual-name">${y.escapeHtml(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${y.escapeHtml(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${y.formatTimeAgo(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function as(e){try{let t;e.includes("-")?t=await y.api.getIssueByIdentifier(e):t=await y.api.getIssue(e),t?await ne(t.id,!1):y.navigateTo("my-issues",!1)}catch{y.navigateTo("my-issues",!1)}}async function ne(e,t=!0){try{st=!0;const[n,s,i,a,r,o]=await Promise.all([y.api.getIssue(e),y.api.getComments(e),y.api.getActivities(e),y.api.getSubIssues(e),y.api.getRelations(e),y.api.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),c=(o.completed_rituals||[]).filter(b=>b.attestation&&b.attestation.note).map(b=>({id:`attestation-${b.attestation.id}`,author_name:b.attestation.attested_by_name||"Unknown",content:b.attestation.note,created_at:b.attestation.attested_at,is_attestation:!0,ritual_name:b.name})),l=[...s,...c].sort((b,V)=>new Date(b.created_at)-new Date(V.created_at)),d=[n.parent_id?y.api.getIssue(n.parent_id):Promise.resolve(null),y.api.getSprints(n.project_id).catch(b=>(console.error("Failed to load sprints:",b),[]))],[m,p]=await Promise.all(d),f=r.filter(b=>b.relation_type==="blocks"&&b.direction==="outgoing"),v=r.filter(b=>b.relation_type==="blocked_by"||b.relation_type==="blocks"&&b.direction==="incoming"),T=r.filter(b=>b.relation_type==="relates_to");t&&history.pushState({issueId:e,view:y.currentView},"",`/issue/${n.identifier}`),window.currentDetailIssue=n,window.currentDetailSprints=p,document.querySelectorAll(".view").forEach(b=>b.classList.add("hidden"));const _=document.getElementById("issue-detail-view");_.classList.remove("hidden");const C=y.currentView||"my-issues",q=y.getProjects().find(b=>b.id===n.project_id),R=n.assignee_id?y.getAssigneeById(n.assignee_id):null,M=R?y.formatAssigneeName(R):null,ee=n.sprint_id?p.find(b=>b.id===n.sprint_id):null;_.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${C}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${q?y.escapeHtml(q.name):"Project"} › ${y.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${y.escapeHtml(n.title)}</h1>

                    ${m?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="#" onclick="viewIssue('${y.escapeJsString(m.id)}'); return false;">${m.identifier}: ${y.escapeHtml(m.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body ${n.description?"":"empty"}" onclick="handleDescriptionClick(event, '${y.escapeJsString(n.id)}')">
                            ${n.description?Bo(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showCreateSubIssueModal('${y.escapeJsString(n.id)}', '${y.escapeJsString(n.project_id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(b=>`
                                <div class="sub-issue-item" onclick="viewIssue('${y.escapeJsString(b.id)}')">
                                    <span class="sub-issue-status">${y.getStatusIcon(b.status)}</span>
                                    <span class="sub-issue-id">${b.identifier}</span>
                                    <span class="sub-issue-title">${y.escapeHtml(b.title)}</span>
                                    ${b.estimate?`<span class="sub-issue-estimate">${b.estimate}pts</span>`:""}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showAddRelationModal('${y.escapeJsString(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${f.length===0&&v.length===0&&T.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${v.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${v.map(b=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${y.getStatusIcon(b.related_issue_status)}</span>
                                            <a href="#" onclick="viewIssue('${y.escapeJsString(b.related_issue_id)}'); return false;" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${y.escapeHtml(b.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${y.escapeJsString(n.id)}', '${y.escapeJsString(b.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${f.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${f.map(b=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${y.getStatusIcon(b.related_issue_status)}</span>
                                            <a href="#" onclick="viewIssue('${y.escapeJsString(b.related_issue_id)}'); return false;" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${y.escapeHtml(b.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${y.escapeJsString(n.id)}', '${y.escapeJsString(b.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${T.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${T.map(b=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${y.getStatusIcon(b.related_issue_status)}</span>
                                            <a href="#" onclick="viewIssue('${y.escapeJsString(b.related_issue_id)}'); return false;" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${y.escapeHtml(b.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${y.escapeJsString(n.id)}', '${y.escapeJsString(b.id)}'); event.stopPropagation();" title="Remove relation">
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
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="ticket-rituals-content collapsed">
                            <!-- Populated by loadTicketRituals -->
                        </div>
                    </div>

                    <div class="issue-detail-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(b=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${So(b.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Lo(b)}</span>
                                        <span class="activity-actor">by ${y.escapeHtml(Co(b))}</span>
                                        <span class="activity-time">${y.formatTimeAgo(b.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${l.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:l.map(b=>`
                                <div class="comment ${b.is_attestation?"comment-attestation":""}">
                                    <div class="comment-avatar ${b.is_attestation?"avatar-attestation":""}">${b.is_attestation?"✓":(b.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${y.escapeHtml(b.author_name||"User")}</span>
                                            ${b.is_attestation?`<span class="comment-ritual-badge">Ritual: ${y.escapeHtml(b.ritual_name)}</span>`:""}
                                            <span class="comment-date">${y.formatTimeAgo(b.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${lu(b.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                        <form class="comment-form" onsubmit="return handleAddComment(event, '${y.escapeJsString(n.id)}')">
                            <textarea id="new-comment" placeholder="Write a comment..." rows="3"></textarea>
                            <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                            <button type="submit" class="btn btn-primary">Comment</button>
                        </form>
                    </div>
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" onclick="showDetailDropdown(event, 'status', '${y.escapeJsString(n.id)}')">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${y.getStatusIcon(n.status)}
                                <span>${y.formatStatus(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'priority', '${y.escapeJsString(n.id)}')">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${y.getPriorityIcon(n.priority)}
                                <span>${y.formatPriority(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'type', '${y.escapeJsString(n.id)}')">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${y.formatIssueType(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'assignee', '${y.escapeJsString(n.id)}')">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${M?`${y.renderAvatar(R,"avatar-small")}<span>${y.escapeHtml(M)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'sprint', '${y.escapeJsString(n.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${ee?y.escapeHtml(ee.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'labels', '${y.escapeJsString(n.id)}')">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(b=>`
                                        <span class="issue-label" style="background: ${y.sanitizeColor(b.color)}20; color: ${y.sanitizeColor(b.color)}">${y.escapeHtml(b.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${q?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${y.escapeHtml(q.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" onclick="showDetailDropdown(event, 'estimate', '${y.escapeJsString(n.id)}')">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${y.formatEstimate(n.estimate,n.project_id)}</span>
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
                            <span class="property-value-static">${y.escapeHtml(n.creator_name||"Unknown")}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <button class="btn btn-secondary btn-block" onclick="showEditIssueModal('${y.escapeJsString(n.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            Edit Issue
                        </button>
                        <button class="btn btn-danger-outline btn-block" onclick="deleteIssue('${y.escapeJsString(n.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            Delete
                        </button>
                    </div>
                </aside>
            </div>
        `,hn(n.id),y.setupMentionAutocomplete()}catch(n){y.showToast(n.message,"error")}}let it={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null}};const du=new Set;function os(e,t){if(typeof e=="string"){const n=it[e];it[e]=t,jo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=it[s];it[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{jo(s,i,a)})}}function jo(e,t,n){t!==n&&du.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const uu=()=>it.currentView,pu=e=>os("currentView",e),Po=()=>it.activeFilterCategory,mu=e=>os("activeFilterCategory",e),gu=()=>it.selectedIssueIndex,Ro=e=>os("selectedIssueIndex",e),fu=()=>it.pendingGates,hu=e=>os("pendingGates",e),at=new Map,No=6e4,hi=100;let oe=null,vi=null,bi=null,vn=null,Ho=!1;const vu={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},bu={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Oo={api:null};let yi={...Oo};function yu(e={}){yi={...Oo,...e},oe||(oe=document.createElement("div"),oe.className="issue-tooltip",oe.style.display="none",document.body.appendChild(oe),oe.addEventListener("mouseenter",()=>{clearTimeout(vi)}),oe.addEventListener("mouseleave",()=>{qo()})),Ho||(document.addEventListener("mouseover",wu),document.addEventListener("mouseout",ku),Ho=!0)}function wu(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=$u(t);if(n){if(n===vn&&oe.style.display!=="none"){clearTimeout(vi);return}clearTimeout(bi),bi=setTimeout(()=>{Eu(t,n)},200)}}function ku(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(bi),vi=setTimeout(()=>{qo()},150))}function $u(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Eu(e,t){vn=t;const n=e.getBoundingClientRect();oe.style.left=`${n.left+window.scrollX}px`,oe.style.top=`${n.bottom+window.scrollY+8}px`,oe.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',oe.style.display="block";try{const s=await Iu(t);if(vn!==t)return;xu(s)}catch{if(vn!==t)return;oe.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function qo(){oe&&(oe.style.display="none"),vn=null}function Tu(){const e=Date.now();for(const[t,n]of at.entries())e-n.timestamp>=No&&at.delete(t)}async function Iu(e){at.size>hi/2&&Tu();const t=at.get(e);if(t&&Date.now()-t.timestamp<No)return t.issue;if(!yi.api)throw new Error("API not initialized");const n=await yi.api.getIssueByIdentifier(e);if(at.size>=hi){const s=Array.from(at.entries());s.sort((a,r)=>a[1].timestamp-r[1].timestamp);const i=s.slice(0,hi/2);for(const[a]of i)at.delete(a)}return at.set(e,{issue:n,timestamp:Date.now()}),n}function xu(e){const t=vu[e.status]||"#6b7280",n=bu[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";oe.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${wi(e.identifier)}</span>
            <span class="issue-tooltip-type">${wi(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${wi(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${_u(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Su(e.priority)}</span>
        </div>
    `}function _u(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Su(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function wi(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}let pt=null;window.currentTeam=null;let H="my-issues",K=[],bn=[],yn=[],rs=[],Fo=null,ot=null;function Uo(e){if(!e)return"";if(typeof marked<"u"&&typeof DOMPurify<"u")try{marked.setOptions({breaks:!0,gfm:!0});const t=marked.parse(e);return DOMPurify.sanitize(t)}catch(t){console.error("Markdown parsing error:",t)}return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const zo=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Cu(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Go)},0))}function Go(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Go))}function mt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function ki(){const e=mt(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=rt(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Ue(),ve(),be()}function $i(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),ki()}function gt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Ei(){const e=gt(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=ze(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Ue(),ve(),be()}function Ti(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Ei()}function ft(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wo(){var s,i;const e=ft(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),r=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=r}else n.textContent=`${e.length} Labels`;Ue(),ve(),be()}function Ii(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Wo()}function Ko(){var s,i;const e=ft(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),r=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=r}else n.textContent=`${e.length} Labels`}async function Lu(){const e=document.getElementById("label-filter-dropdown");if(!e||!window.currentTeam)return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(window.currentTeam.id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${Dt(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${S(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Vo(){var m,p,f,v,T;const e=new URLSearchParams,t=mt(),n=gt(),s=ft(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(p=document.getElementById("project-filter"))==null?void 0:p.value,r=(f=document.getElementById("sprint-filter"))==null?void 0:f.value,o=(v=document.getElementById("issue-type-filter"))==null?void 0:v.value,c=(T=document.getElementById("group-by-select"))==null?void 0:T.value;t.forEach(_=>e.append("status",_)),n.forEach(_=>e.append("priority",_)),s.forEach(_=>e.append("label",_)),i&&e.set("assignee",i),a&&e.set("project",a),r&&e.set("sprint",r),o&&e.set("issue_type",o),c&&e.set("groupBy",c);const l=e.toString(),d=l?`/issues?${l}`:"/issues";history.replaceState({view:"issues"},"",d)}function Au(){const e=new URLSearchParams(window.location.search),t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=t.includes(m.value)}),Bu())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=n.includes(m.value)}),Du())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const r=e.get("issue_type");if(r){const l=document.getElementById("issue-type-filter");l&&(l.value=r)}const o=e.getAll("label");if(o.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=o.includes(m.value)}),Ko())}const c=e.get("groupBy");if(c){const l=document.getElementById("group-by-select");l&&(l.value=c)}}function Bu(){const e=mt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=rt(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Du(){const e=gt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=ze(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const Jo=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function Mu(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",At)):(t.classList.remove("hidden"),we(),ke(Po()),setTimeout(()=>{document.addEventListener("click",At)},0))}function ju(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",At)):(t.classList.remove("hidden"),ep(),setTimeout(()=>{document.addEventListener("click",At)},0))}function At(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",At))}function Zo(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",At)}function Yo(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return mt().length;case"priority":return gt().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return ft().length;default:return 0}}function Pu(){let e=0;return Jo.forEach(t=>{e+=Yo(t.key)}),e}function we(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=Jo.map(t=>{const n=Yo(t.key);return`
            <div class="filter-menu-category ${Po()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function ke(e){mu(e),we();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":Ru(t);break;case"status":Nu(t);break;case"priority":Hu(t);break;case"type":Ou(t);break;case"assignee":qu(t);break;case"sprint":Fu(t);break;case"labels":Uu(t);break}}function Ru(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=fe()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" onclick="clearProjectFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setProjectFilter('')">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setProjectFilter('${k(a.id)}')">
                <input type="radio" name="project-filter-radio" value="${D(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Dt(a.color)};"></span>
                <span class="filter-option-label">${S(a.name)}</span>
            </label>
        `}),e.innerHTML=i}function Nu(e){const t=mt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function Hu(e){const t=gt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function Ou(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setTypeFilter('${a.value}')">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function qu(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=It()||[];let i=`
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
            <label class="filter-option" onclick="setAssigneeFilter('${k(a.user_id)}')">
                <input type="radio" name="assignee-filter-radio" value="${D(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${S(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Fu(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${k(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${D(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${S(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function Uu(e){const t=ft(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const r=a.closest("label"),o=r==null?void 0:r.querySelector(".label-name"),c=r==null?void 0:r.querySelector(".label-badge"),l=(o==null?void 0:o.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${D(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${k(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Dt(d)};"></span>
                    <span class="filter-option-label">${S(l)}</span>
                </label>
            `}),e.innerHTML=i}function Xo(e){const t=document.getElementById("project-filter");t&&(t.value=e,or()),we(),ke("project"),ve(),be()}function zu(){Xo("")}function Gu(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,ki()),we(),ke("status")}function Wu(){$i(),we(),ke("status"),ve(),be()}function Ku(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Ei()),we(),ke("priority")}function Vu(){Ti(),we(),ke("priority"),ve(),be()}function Qo(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ue()),we(),ke("type"),ve(),be()}function Ju(){Qo("")}function er(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ue()),we(),ke("assignee"),ve(),be()}function Zu(){er("")}function tr(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ue()),we(),ke("sprint"),ve(),be()}function Yu(){tr("")}function Xu(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Wo()),we(),ke("labels")}function Qu(){Ii(),we(),ke("labels"),ve(),be()}function ep(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],r=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let o=`
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
            ${r.map(c=>`
                <div class="display-option ${i===c.value?"active":""}" onclick="setGroupBy('${c.value}')">
                    <span>${c.label}</span>
                    ${i===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=o}function tp(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Fe()),Zo()}function np(e){const t=document.getElementById("group-by-select");t&&(t.value=e,rr()),Zo()}function ve(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const m=(fe()||[]).find(p=>p.id===n.value);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=mt();if(s.length>0){const d=s.map(m=>rt(m)).join(", ");t.push({category:"status",label:"Status",value:d,clearFn:"clearStatusFilterNew()"})}const i=gt();if(i.length>0){const d=i.map(m=>ze(m)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");a!=null&&a.value&&t.push({category:"type",label:"Type",value:a.value.charAt(0).toUpperCase()+a.value.slice(1),clearFn:"clearTypeFilter()"});const r=document.getElementById("assignee-filter");if(r!=null&&r.value){let d;if(r.value==="me")d="Me";else if(r.value==="unassigned")d="Unassigned";else{const p=(It()||[]).find(f=>f.user_id===r.value);d=(p==null?void 0:p.name)||(p==null?void 0:p.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:d,clearFn:"clearAssigneeFilter()"})}const o=document.getElementById("sprint-filter");if(o!=null&&o.value){const d=o.options[o.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||o.value,clearFn:"clearSprintFilter()"})}const c=ft();if(c.length>0){const d=document.getElementById("label-filter-dropdown"),m=c.map(p=>{var T;const f=d==null?void 0:d.querySelector(`input[value="${p}"]`),v=(T=f==null?void 0:f.closest("label"))==null?void 0:T.querySelector(".label-name");return(v==null?void 0:v.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(d=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${S(d.value)}</span>
            <button class="filter-chip-remove" onclick="${d.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=l}function sp(){const e=document.getElementById("project-filter");e&&(e.value=""),$i(),Ti();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),Ii(),Ue(),ve(),be()}function be(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Pu();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function ip(){ve(),be();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}document.addEventListener("DOMContentLoaded",async()=>{if(ap(),op(),yu({api}),api.getToken())try{pt=await api.getMe(),window.currentUser=pt,await nr()}catch{api.logout(),Rn()}else Rn()});function ap(){const e=document.getElementById("theme-toggle");if(!e)return;const n=localStorage.getItem("chaotic_theme")==="light";document.body.classList.toggle("theme-light",n),e.checked=n,e.addEventListener("change",()=>{const s=e.checked;document.body.classList.toggle("theme-light",s),localStorage.setItem("chaotic_theme",s?"light":"dark")})}function op(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");Ai(s)}}})}document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"){const t=document.activeElement,n=t==null?void 0:t.closest("form");if(n){e.preventDefault();const s=new Event("submit",{bubbles:!0,cancelable:!0});n.dispatchEvent(s)}}});async function nr(){wa(),xa(),await qn();const e=Ma();if(e.length===0&&!io()){ai();return}e.length>0&&await Us(e[0],!0)}window.initApp=nr,window.viewIssue=ne,window.viewIssueByPath=as,window.handleDescriptionClick=Do,window.toggleTicketRituals=Mo,window.toggleCreateIssueOptions=Tp,window.connectWebSocket=sr,window.buildAssignees=up,window.updateAssigneeFilter=pp,window.loadLabels=qp,window.resetOnboarding=ri;function sr(e){ot&&(ot.close(),ot=null);const t=api.getToken();if(!t)return;const s=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(t)}&team_id=${encodeURIComponent(e)}`;try{ot=new WebSocket(s),ot.onopen=()=>{console.log("WebSocket connected")},ot.onmessage=i=>{const a=JSON.parse(i.data);rp(a)},ot.onclose=()=>{console.log("WebSocket disconnected"),setTimeout(()=>{window.currentTeam&&window.currentTeam.id===e&&sr(e)},5e3)},ot.onerror=i=>{console.error("WebSocket error:",i)}}catch(i){console.error("Failed to connect WebSocket:",i)}}function rp(e){var i,a,r,o,c;const{type:t,entity:n,data:s}=e;if(n==="issue"){if(t==="created"){const l=K.findIndex(m=>m.id===s.id),d=K.findIndex(m=>m._isOptimistic&&m.title===s.title);if(l>=0||(d>=0?(K[d]=s,H==="issues"&&qe()):(K.unshift(s),H==="issues"&&qe(),g(`New issue: ${s.identifier}`,"info"))),s.assignee_id===(pt==null?void 0:pt.id)){const m=Xn(),p=m.findIndex(v=>v.id===s.id),f=m.findIndex(v=>v._isOptimistic&&v.title===s.title);p===-1&&f===-1?(dn([s,...m]),H==="my-issues"&&un()):f>=0&&(m[f]=s,dn(m),H==="my-issues"&&un())}H==="my-issues"&&xt(),H==="board"?Qe():H==="sprints"&&Ye(),H==="issue-detail"&&s.parent_id===((i=window.currentDetailIssue)==null?void 0:i.id)&&ne(window.currentDetailIssue.id,!1)}else if(t==="updated"){const l=K.findIndex(p=>p.id===s.id);l>=0&&(K[l]=s);const d=Xn(),m=d.findIndex(p=>p.id===s.id);if(m>=0&&(d[m]=s,dn(d)),H==="issues")qe();else if(H==="my-issues")un(),xt();else if(H==="board")Qe();else if(H==="sprints")Ye();else if(H==="issue-detail"){const p=document.getElementById("issue-detail-content");p&&p.dataset.issueId===s.id&&ne(s.id)}}else t==="deleted"&&(K=K.filter(l=>l.id!==s.id),dn(Xn().filter(l=>l.id!==s.id)),H==="issues"?qe():H==="my-issues"?(un(),xt()):H==="board"?Qe():H==="sprints"&&Ye(),g(`Issue ${s.identifier} deleted`,"info"));H==="issue-detail"&&((a=window.currentDetailIssue)==null?void 0:a.id)===s.id&&(g(`Issue ${s.identifier} was deleted`,"warning"),z("my-issues"))}else if(n==="comment")H==="my-issues"&&xt(),H==="issue-detail"&&((r=window.currentDetailIssue)==null?void 0:r.id)===s.issue_id&&ne(s.issue_id,!1);else if(n==="relation"){if(H==="issue-detail"){const l=(o=window.currentDetailIssue)==null?void 0:o.id;l&&(s.source_issue_id===l||s.target_issue_id===l)&&ne(l,!1)}}else n==="activity"&&(H==="my-issues"&&xt(),H==="issue-detail"&&((c=window.currentDetailIssue)==null?void 0:c.id)===s.issue_id&&ne(s.issue_id,!1))}function z(e,t=!0){if(H=e,pu(e),t){let s;const i=gn(),a=["issues","board","sprints"];e==="my-issues"?s="/":e==="issues"&&window.location.search?s=`/issues${window.location.search}`:a.includes(e)&&i?s=`/${e}?project=${i}`:s=`/${e}`,history.pushState({view:e},"",s)}document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.view===e)}),typeof Zs=="function"&&Zs(),document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden"));const n=document.getElementById(`${e}-view`);switch(n&&n.classList.remove("hidden"),e){case"my-issues":ti(),xt();break;case"gate-approvals":mp();break;case"issues":Au(),ip(),Lu().then(()=>{const i=new URLSearchParams(window.location.search).getAll("label");if(i.length>0){const a=document.getElementById("label-filter-dropdown");a&&(a.querySelectorAll('input[type="checkbox"]').forEach(o=>{o.checked=i.includes(o.value)}),Ko())}}),ar().then(()=>{const i=new URLSearchParams(window.location.search).get("sprint");if(i){const a=document.getElementById("sprint-filter");a&&(a.value=i)}Fe()});break;case"board":mi();break;case"projects":Ee().then(on);break;case"sprints":mo();break;case"documents":Et();break;case"team":Gs(),Oa(),Fn();break;case"settings":Qs(),Os(),Fp();break}}function ir(){var i;const t=window.location.pathname.split("/").filter(Boolean),n=gn();n&&fe().some(a=>a.id===n)&&an(n);let s="my-issues";if(t.length===0||t[0]==="")z("my-issues",!1);else if(t[0]==="issue"&&t[1]){as(t[1]);return}else if(t[0]==="document"&&t[1]){lp(t[1]);return}else if(t[0]==="sprint"&&t[1]){yd(t[1]);return}else if(t[0]==="projects"&&t[1]&&t[2]==="settings"){Ga(t[1]);return}else s=t[0],["my-issues","gate-approvals","issues","board","projects","sprints","documents","team","settings"].includes(s)?z(s,!1):(s="my-issues",z("my-issues",!1));(i=history.state)!=null&&i.view||history.replaceState({view:s},"",window.location.href)}async function lp(e){try{await Se(e,!1)}catch{z("documents",!1)}}window.addEventListener("popstate",e=>{var t,n,s,i,a;(t=e.state)!=null&&t.issueId?ne(e.state.issueId,!1):(n=e.state)!=null&&n.identifier?as(e.state.identifier):(s=e.state)!=null&&s.documentId?Se(e.state.documentId,!1):(i=e.state)!=null&&i.sprintId?ci(e.state.sprintId,!1):(a=e.state)!=null&&a.view?z(e.state.view,!1):ir()});function cp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function dp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function up(){const e=It().map(cp),t=bc().map(dp);bn=[...e,...t]}function xi(e){return e&&bn.find(t=>t.id===e)||null}function wn(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function _i(e,t=!1){const n=S(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${S(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ls(){const e=bn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));bn.filter(a=>a.is_agent).forEach(a=>{const r=a.parent_user_id;t.has(r)||t.set(r,[]),t.get(r).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const r=t.get(a.id)||[];r.sort((o,c)=>o.name.localeCompare(c.name)),r.forEach(o=>s.push({assignee:o,indent:!0}))});const i=bn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,r)=>a.name.localeCompare(r.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function pp(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ls().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${_i(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}async function ar(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||Si(null),t)try{const a=await api.getSprints(t),r=a.find(o=>o.status==="active");r&&(s+=`<option value="current">Current Sprint (${S(r.name)})</option>`),Si(r||null),a.forEach(o=>{const c=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";s+=`<option value="${o.id}">${S(o.name)}${c}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(r=>r.value===n)&&(e.value=n)}function Si(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${S(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,r=i>=80&&!a,o=a?"budget-over":r?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${S(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${o}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function mp(){if(!window.currentTeam)return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=[];for(const n of fe()){const s=await api.getPendingApprovals(n.id);t.push(...s)}hu(t),gp()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${S(t.message)}</p></div>`}}}function gp(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=fu();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No pending approvals</h3>
                <p>All rituals have been completed. Nice work!</p>
            </div>
        `;return}const n=c=>c.pending_approvals||[],s=c=>l=>{const d=n(l).filter(c);return d.length>0?{...l,_filteredApprovals:d}:null},i=t.map(s(c=>c.approval_mode==="gate"&&c.limbo_type==="claim")).filter(Boolean),a=t.map(s(c=>c.approval_mode==="gate"&&c.limbo_type==="close")).filter(Boolean),r=t.map(s(c=>c.approval_mode==="review")).filter(Boolean);let o="";i.length>0&&(o+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${i.map(Ci).join("")}
                </div>
            </div>
        `),a.length>0&&(o+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${a.map(Ci).join("")}
                </div>
            </div>
        `),r.length>0&&(o+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${r.map(Ci).join("")}
                </div>
            </div>
        `),e.innerHTML=o,e.querySelectorAll(".gate-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;Ya(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;approveReviewFromList(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt,l.attestationNote)})})}function Ci(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",r=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${S(s.requested_by_name)}</strong>${s.requested_at?` (${em(s.requested_at)})`:""}</span>`:"",o=i&&s.attestation_note?`<div class="gate-attestation-note"><em>${S(s.attestation_note)}</em></div>`:"",c=i?"review-approve-btn":"gate-approve-btn",l=i?"Approve":"Complete",d=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${S(s.ritual_name)} ${d}</span>
                    <span class="gate-ritual-prompt">${S(s.ritual_prompt)}</span>
                    ${r}
                    ${o}
                </div>
                <button class="btn btn-small btn-primary ${c}"
                    data-ritual-id="${D(s.ritual_id)}"
                    data-issue-id="${D(e.issue_id)}"
                    data-ritual-name="${D(s.ritual_name)}"
                    data-ritual-prompt="${D(s.ritual_prompt)}"
                    data-issue-identifier="${D(e.identifier)}"
                    data-issue-title="${D(e.title)}"
                    data-requested-by="${D(s.requested_by_name||"")}"
                    data-requested-at="${D(s.requested_at||"")}"
                    data-attestation-note="${D(s.attestation_note||"")}">${l}</button>
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${k(e.issue_id)}')" class="gate-issue-link">
                    <span class="gate-issue-id">${S(e.identifier)}</span>
                    <span class="gate-issue-title">${S(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${S(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}async function Fe(){var m,p,f,v,T,_;if(!window.currentTeam)return;const e=document.getElementById("project-filter").value,t=mt(),n=gt(),s=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,i=(f=(p=document.getElementById("issue-search"))==null?void 0:p.value)==null?void 0:f.trim();if(!e&&fe().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}hp();const a={limit:1e3},r=((v=document.getElementById("sort-by-select"))==null?void 0:v.value)||"created-desc",[o,c]=r.includes("-")?r.split("-"):[r,null];a.sort_by=o,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=pt.id:a.assignee_id=s);const l=(T=document.getElementById("sprint-filter"))==null?void 0:T.value;if(l)if(l==="current"){if(e)try{const q=(await api.getSprints(e)).find(R=>R.status==="active");q&&(a.sprint_id=q.id)}catch(C){console.error("Failed to resolve current sprint:",C)}}else a.sprint_id=l;const d=(_=document.getElementById("issue-type-filter"))==null?void 0:_.value;d&&(a.issue_type=d),i&&i.length>=2&&(a.search=i);try{e?(a.project_id=e,K=await api.getIssues(a)):fe().length>0&&(K=await api.getTeamIssues(window.currentTeam.id,a));const C=ft();C.length>0&&(K=K.filter(R=>!R.labels||R.labels.length===0?!1:R.labels.some(M=>C.includes(M.id))));const q=[...new Set(K.map(R=>R.project_id))];await fo(q),qe()}catch(C){g(C.message,"error")}}function fp(){clearTimeout(Fo),Fo=setTimeout(()=>{Fe()},300)}function hp(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Ue(){Vo(),Fe()}async function or(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&an(e),await ar(),mi(),mo(),Ue()}async function rr(){if(Vo(),lr()==="sprint"){const e=[...new Set(K.map(t=>t.project_id))];await fo(e)}qe()}function lr(){const e=document.getElementById("group-by-select");return e?e.value:""}function rt(e){return e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function ze(e){return e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Bt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs"}[e]||"Task"}function vp(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function cs(e,t="avatar-small"){const n=wn(e)||"User",s=e==null?void 0:e.avatar_url;return s?vp(s)?`<img class="${t} avatar-img" src="${D(s)}" alt="${D(n)}">`:`<div class="${t} avatar-emoji">${S(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function bp(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function yp(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,r=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!r){n();return}const o=r[2].toLowerCase(),c=It().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:bp(l)})).filter(l=>!o||l.handle.includes(o)||l.name.toLowerCase().includes(o)||l.email.toLowerCase().includes(o)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${D(l.handle)}">
                <span class="mention-name">${S(l.name)}</span>
                <span class="mention-handle">@${S(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.handle,m=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),p=e.value.slice(i);e.value=m+p,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}async function wp(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;try{await api.createComment(t,n),await ne(t),g("Comment added!","success")}catch(s){g(s.message,"error")}return!1}async function kp(e){const t=window.currentDetailIssue||await api.getIssue(e);document.getElementById("modal-title").textContent="Edit Description",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateDescription(event, '${k(e)}')">
            <div class="form-group description-editor">
                <div class="editor-tabs">
                    <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                    <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
                </div>
                <textarea id="edit-description" rows="10" placeholder="Add a description...">${S(t.description||"")}</textarea>
                <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    `,B();const n=document.getElementById("edit-description");n.addEventListener("input",()=>{const s=document.getElementById("edit-description-preview");s&&s.style.display!=="none"&&cr()}),n.focus()}function cr(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Bo(n):'<span class="text-muted">Nothing to preview.</span>'}function $p(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?cr():s.focus()}async function Ep(e,t){e.preventDefault();try{const n=document.getElementById("edit-description");if(!n)throw new Error("Description field not found");const s=n.value;await api.updateIssue(t,{description:s}),P(),g("Description updated","success"),ne(t,!1)}catch(n){g(n.message,"error")}return!1}function Li(e=null){var s;const t=e||((s=document.getElementById("project-filter"))==null?void 0:s.value);rs=[];const n=fe().map(i=>`
        <option value="${i.id}" ${i.id===t?"selected":""}>${S(i.name)}</option>
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
                            ${zo.map(i=>`<option value="${i.id}">${i.label}</option>`).join("")}
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
                            ${tt("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${et("no_priority")}
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
    `,B(),ss(),document.getElementById("create-issue-title").focus()}function Tp(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Ip(e){const t=zo.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function xp(e,t){const n=fe().find(s=>s.id===t);rs=[],document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?S(n.name):"Project"}</span>
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
                            ${tt("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${et("no_priority")}
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
                <button type="button" class="btn btn-primary" onclick="handleCreateSubIssue('${k(e)}', '${k(t)}')">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,B(),ss(),document.getElementById("create-issue-title").focus()}async function _p(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,r=document.getElementById("create-issue-type").value||"task",o=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null;if(!n){g("Please enter a title","error");return}try{const d=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:r,assignee_id:o,estimate:l,label_ids:rs,parent_id:e});P(),g(`Created sub-issue ${d.identifier}`,"success"),ne(e)}catch(d){g(d.message,"error")}}function Sp(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleAddRelation(event, '${k(e)}')">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${k(e)}')">
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
    `,B(),document.getElementById("relation-issue-search").focus()}async function Cp(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,r=(await api.searchIssues(i,e)).filter(o=>o.id!==t);if(r.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=r.map(o=>`
            <div class="link-result-item" onclick="selectIssueForRelation('${k(o.id)}', '${k(o.identifier)}', '${k(o.title)}')">
                <span class="link-result-id">${S(o.identifier)}</span>
                <span class="link-result-title">${S(o.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Lp(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Ap(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Bp(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return g("Please select an issue","error"),!1;try{n==="blocked_by"?await api.createRelation(s,t,"blocks"):await api.createRelation(t,s,n),P(),g("Relation added","success"),ne(t)}catch(i){g(i.message,"error")}return!1}async function Dp(e,t){try{await api.deleteRelation(e,t),g("Relation removed","success"),ne(e)}catch(n){g(n.message,"error")}}async function Mp(e,t){var a,r;Yt();const s=t.currentTarget.getBoundingClientRect(),i=document.createElement("div");if(i.className="inline-dropdown dropdown-positioning",i.style.top=`${s.top-8}px`,i.style.left=`${s.left}px`,i.style.transform="translateY(-100%)",i.style.animation="none",e==="status"){const o=document.getElementById("create-issue-status").value;i.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(c=>`
                <button class="dropdown-option ${c===o?"selected":""}" onclick="setCreateIssueField('status', '${c}', '${rt(c)}')">
                    ${tt(c)}
                    <span>${rt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const o=document.getElementById("create-issue-priority").value;i.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(c=>`
                <button class="dropdown-option ${c===o?"selected":""}" onclick="setCreateIssueField('priority', '${c}', '${ze(c)}')">
                    ${et(c)}
                    <span>${ze(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const o=document.getElementById("create-issue-type").value;i.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs"].map(c=>`
                <button class="dropdown-option ${c===o?"selected":""}" onclick="setCreateIssueField('type', '${c}', '${Bt(c)}')">
                    <span class="issue-type-badge type-${c}">${Bt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!window.currentTeam)i.innerHTML='<div class="dropdown-header">Select a team first</div>';else{if(yn.length===0)try{yn=await api.getLabels(window.currentTeam.id)}catch(o){console.error("Failed to load labels:",o)}fi(i),document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Mn(i,{multiSelect:!0});return}else if(e==="assignee"){const o=document.getElementById("create-issue-assignee").value,c=ls();i.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${o?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:l,indent:d})=>{const m=wn(l)||"User";return`
                <button class="dropdown-option ${l.id===o?"selected":""}" onclick="setCreateIssueField('assignee', '${k(l.id)}', '${k(m)}')">
                    ${cs(l,"avatar-small")}
                    <span>${_i(l,d)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const o=document.getElementById("create-issue-estimate").value,c=(a=document.getElementById("create-issue-project"))==null?void 0:a.value,l=Un(c);i.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(d=>{const m=d.value===null?"":String(d.value);return`
                <button class="dropdown-option ${m===o?"selected":""}" onclick="setCreateIssueField('estimate', '${m}', '${d.value?d.label:"Estimate"}')">
                    <span>${d.label}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const o=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)i.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const d=(await api.getSprints(c)).filter(m=>m.status!=="completed");i.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${o?"":"selected"}" onclick="setCreateIssueField('sprint', '', 'Sprint')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${d.map(m=>`
                        <button class="dropdown-option ${m.id===o?"selected":""}" onclick="setCreateIssueField('sprint', '${k(m.id)}', '${k(m.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${S(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{i.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Mn(i)}function jp(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Pp(e,t,n){if(document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,e==="status"){const s=document.querySelector(".toolbar-btn:first-child");s.innerHTML=`${tt(t)}<span id="create-issue-status-label">${n}</span>`}else if(e==="priority"){const s=document.querySelectorAll(".toolbar-btn")[1];s.innerHTML=`${et(t)}<span id="create-issue-priority-label">${n}</span>`}else if(e==="type"){const s=document.getElementById("create-issue-type-btn");s&&(s.innerHTML=`<span class="issue-type-badge type-${t}">${Bt(t)}</span><span id="create-issue-type-label">${n}</span>`)}Yt()}async function dr({keepOpen:e=!1}={}){var T,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,r=document.getElementById("create-issue-type").value||"task",o=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null,d=((T=document.getElementById("create-issue-sprint"))==null?void 0:T.value)||null,m=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,p=m?new Date(`${m}T00:00:00Z`).toISOString():null;if(!t){g("Please select a project","error");return}if(!n){g("Please enter a title","error");return}const f=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");f&&(f.disabled=!0),v&&(v.disabled=!0);try{const C=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:r,assignee_id:o,estimate:l,sprint_id:d,label_ids:rs,due_date:p});g(`Created ${C.identifier}`,"success"),H==="issues"?Fe():H==="my-issues"&&ti(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(P(),ne(C.id))}catch(C){g(C.message,"error")}finally{f&&(f.disabled=!1),v&&(v.disabled=!1)}}async function Rp(){await dr({keepOpen:!1})}async function Np(){await dr({keepOpen:!0})}async function ur(e){try{const t=await api.getIssue(e),n=await api.getSprints(t.project_id),i=(window.getEstimateOptions?window.getEstimateOptions(t.project_id):[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}]).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${S(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${k(e)}')">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${D(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${S(t.description||"")}</textarea>
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
                            <option value="${a.id}" ${t.sprint_id===a.id?"selected":""}>${S(a.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,B()}catch(t){g(t.message,"error")}}async function Hp(e,t){e.preventDefault();try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),r=document.getElementById("edit-issue-type"),o=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!r)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:r.value,estimate:o&&o.value?parseInt(o.value):null,sprint_id:c&&c.value?c.value:null};await api.updateIssue(t,l),P(),await ne(t),g("Issue updated!","success")}catch(n){g(n.message,"error")}return!1}async function Op(e){if(confirm("Are you sure you want to delete this issue?"))try{await api.deleteIssue(e),await Fe(),await Ee(),z("issues"),g("Issue deleted!","success")}catch(t){g(t.message,"error")}}async function qp(){if(window.currentTeam)try{yn=await api.getLabels(window.currentTeam.id)}catch(e){console.error("Failed to load labels:",e)}}async function Fp(){const e=document.getElementById("ritual-project-filter");e&&(await Ee(),e.innerHTML='<option value="">Select Project</option>'+fe().map(t=>`<option value="${t.id}">${S(t.name)}</option>`).join(""))}async function Up(e,t){try{await api.approveAttestation(e,t),g("Ritual approved!","success"),await ts(),di()}catch(n){g(n.message,"error")}}async function zp(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Gp(s,e,t)}),B()}async function Gp(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await api.completeGateRitual(t,n,s||null),g("Ritual completed!","success"),await ts();const i=fd();i&&!i.in_limbo?(P(),g("Limbo cleared! Next sprint is now active.","success")):di()}catch(i){g(i.message,"error")}return!1}function Wp(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${D(e.id)}" data-issue-id="${D(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${D(e.id)}" data-issue-id="${D(t)}" data-ritual-name="${D(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${D(e.id)}" data-issue-id="${D(t)}" data-ritual-name="${D(e.name)}" data-ritual-prompt="${D(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${D(e.id)}" data-issue-id="${D(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function Kp(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${S(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Vp(i,e,t)}),B()}async function Vp(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return g("A note is required for this attestation.","error"),!1;try{await api.attestTicketRitual(t,n,s),g("Ritual attested!","success"),P(),await hn(n)}catch(i){g(i.message,"error")}return!1}async function Jp(e,t){try{await api.attestTicketRitual(e,t),g("Ritual attested!","success"),await hn(t)}catch(n){g(n.message,"error")}}async function Zp(e,t){try{await api.approveTicketRitual(e,t),g("Ritual approved!","success"),await hn(t)}catch(n){g(n.message,"error")}}function Yp(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Xp(s,e,t)}),B()}async function Xp(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await api.completeTicketGateRitual(t,n,s||null),g("Ritual completed!","success"),P(),await hn(n)}catch(i){g(i.message,"error")}return!1}document.addEventListener("keydown",md({closeModal:P,navigateTo:z,showCreateIssueModal:Li,showKeyboardShortcutsHelp:pr,isModalOpen:()=>!document.getElementById("modal-overlay").classList.contains("hidden"),focusSearch:()=>{z("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function pr(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,B()}id([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>z("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>z("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>z("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>z("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>z("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>z("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>z("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{z("issues"),setTimeout(Li,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{z("projects"),setTimeout(Js,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{z("documents"),setTimeout(Hs,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Ks(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{z("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{z("team"),setTimeout(Ws,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>pr(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>ri(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Ps(),category:"Account"}]),cd({getCurrentUser:()=>pt,getCurrentTeam:()=>window.currentTeam,renderIssueRow:Le,formatActivityText:Lo,formatActivityActor:Co,getActivityIcon:So,navigateToIssueByIdentifier:Ai,viewDocument:Se}),jd({api,showToast:g,getProjects:fe,getProjectFromUrl:gn,setGlobalProjectSelection:an,updateUrlWithProject:li,escapeHtml:S,escapeAttr:D,escapeJsString:k,formatPriority:ze}),Gd({getIssues:()=>K,getAssigneeById:xi,formatAssigneeName:wn,formatEstimate:zn,getSprintCache:gd,formatStatus:rt,formatPriority:ze,formatIssueType:Bt,escapeHtml:S,escapeAttr:D,escapeJsString:k,sanitizeColor:Dt,renderAvatar:cs,getAssigneeOptionList:ls,getGroupByValue:lr}),Qd({api,getIssues:()=>K,setIssues:e=>{K=e},getMyIssues:Xn,setMyIssues:dn,getCurrentDetailIssue:()=>window.currentDetailIssue,setCurrentDetailIssue:e=>{window.currentDetailIssue=e},getLabels:()=>yn,setLabels:e=>{yn=e},getCurrentTeam:()=>window.currentTeam,getCurrentDetailSprints:()=>window.currentDetailSprints,closeAllDropdowns:Yt,registerDropdownClickOutside:Mn,setDropdownKeyHandler:zl,showToast:g,getStatusIcon:tt,getPriorityIcon:et,formatStatus:rt,formatPriority:ze,formatIssueType:Bt,formatEstimate:zn,formatAssigneeName:wn,formatAssigneeOptionLabel:_i,getAssigneeOptionList:ls,getAssigneeById:xi,getEstimateOptions:Un,renderAvatar:cs,renderIssueRow:Le,escapeHtml:S,escapeAttr:D,escapeJsString:k,sanitizeColor:Dt,updateSprintCacheForProject:Bd,updateSprintBudgetBar:Si}),au({api,currentView:H,showToast:g,showModal:B,closeModal:P,navigateTo:z,getProjects:fe,getMembers:It,getAssigneeById:xi,formatAssigneeName:wn,formatStatus:rt,formatPriority:ze,formatIssueType:Bt,formatEstimate:zn,formatTimeAgo:jn,getStatusIcon:tt,getPriorityIcon:et,renderMarkdown:Uo,renderAvatar:cs,escapeHtml:S,escapeAttr:D,escapeJsString:k,sanitizeColor:Dt,showDetailDropdown:Io,setupMentionAutocomplete:yp,renderTicketRitualActions:Wp});const Qp=B;window.showModal=function(){Qp(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"&&!document.getElementById("modal-overlay").classList.contains("hidden")){const n=document.querySelector("#modal-content form");if(n)e.preventDefault(),n.dispatchEvent(new Event("submit",{cancelable:!0}));else{const s=document.querySelector("#modal-content .btn-primary");s&&!s.disabled&&(e.preventDefault(),s.click())}}(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),to()?Yn():ad())});function S(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function em(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),r=Math.floor(a/60),o=Math.floor(r/24);return i<60?"just now":a<60?`${a}m ago`:r<24?`${r}h ago`:o===1?"yesterday":o<7?`${o}d ago`:t.toLocaleDateString()}function D(e){return S(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Dt(e){if(!e)return"#6366f1";const t=/^#[0-9a-fA-F]{3,8}$/,n=["red","blue","green","yellow","orange","purple","pink","gray","black","white"];return t.test(e)||n.includes(e.toLowerCase())?e:"#6366f1"}function Ai(e){history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),as(e)}async function tm(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){g("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),r=fe().find(l=>l.id===s),o={id:a,title:n,identifier:`${(r==null?void 0:r.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};K.unshift(o),qe();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=K.findIndex(m=>m.id===a);d!==-1&&(K[d]=l),qe(),Ee(),g("Issue created!","success")}catch(l){K=K.filter(d=>d.id!==a),qe(),g(l.message,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}function mr(e){const t=document.querySelectorAll("#issues-list .list-item");t.length!==0&&(e=Math.max(0,Math.min(t.length-1,e)),t.forEach(n=>n.classList.remove("keyboard-selected")),Ro(e),t[e].classList.add("keyboard-selected"),t[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}document.addEventListener("keydown",e=>{if(uu()!=="issues"||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="SELECT"||!document.getElementById("modal-overlay").classList.contains("hidden")||to())return;const t=document.querySelectorAll("#issues-list .list-item");if(t.length===0)return;const n=gu();switch(e.key){case"j":e.preventDefault(),mr(n+1);break;case"k":e.preventDefault(),mr(n-1);break;case"Enter":if(n>=0&&t[n]){e.preventDefault();const s=t[n].dataset.id;s&&!s.startsWith("temp-")&&ne(s)}break;case"e":if(n>=0&&t[n]){e.preventDefault();const s=t[n].dataset.id;s&&!s.startsWith("temp-")&&ur(s)}break}});const nm=Fe;Fe=async function(){return Ro(-1),nm.apply(this,arguments)},Object.assign(window,{escapeHtml:S,renderMarkdown:Uo,handleLogin:Ea,handleSignup:Ta,showLogin:ka,showSignup:$a,logout:Ps,navigateTo:z,handleRoute:ir,closeModal:P,getProjectFromUrl:gn,updateUrlWithProject:li,toggleTeamDropdown:zs,toggleUserDropdown:Pa,showCreateTeamModal:Ks,showEditTeamModal:Fa,showInviteModal:Ws,showCreateIssueModal:Li,loadIssues:Fe,filterIssues:Ue,filterMyIssues:so,debounceSearch:fp,handleQuickCreate:tm,onProjectFilterChange:or,updateGroupBy:rr,toggleGroup:Yd,viewIssue:ne,showEditIssueModal:ur,editDescription:kp,handleDescriptionClick:Do,setDescriptionEditorMode:$p,updateIssueField:fn,handleUpdateDescription:Ep,handleUpdateIssue:Hp,deleteIssue:Op,navigateToIssueByIdentifier:Ai,handleCreateIssueNew:Rp,handleCreateIssueAndNew:Np,setCreateIssueField:Pp,toggleCreateIssueDropdown:Mp,toggleCreateIssueLabelSelection:nu,createLabelForCreateIssue:su,createLabelFromDropdown:tu,handleAddComment:wp,showCreateSubIssueModal:xp,handleCreateSubIssue:_p,showAddRelationModal:Sp,handleAddRelation:Bp,deleteRelation:Dp,searchIssuesToRelate:Cp,selectIssueForRelation:Lp,clearSelectedRelation:Ap,showDetailDropdown:Io,showInlineDropdown:To,toggleIssueLabel:eu,toggleMultiSelect:Cu,updateStatusFilter:ki,updatePriorityFilter:Ei,clearStatusFilter:$i,clearPriorityFilter:Ti,clearLabelFilter:Ii,toggleFilterMenu:Mu,toggleDisplayMenu:ju,showFilterCategoryOptions:ke,setProjectFilter:Xo,clearProjectFilter:zu,toggleStatusOption:Gu,clearStatusFilterNew:Wu,togglePriorityOption:Ku,clearPriorityFilterNew:Vu,setTypeFilter:Qo,clearTypeFilter:Ju,setAssigneeFilter:er,clearAssigneeFilter:Zu,setSprintFilter:tr,clearSprintFilter:Yu,toggleLabelOption:Xu,clearLabelFilterNew:Qu,setSort:tp,setGroupBy:np,clearAllFilters:sp,updateFilterChips:ve,updateFilterCountBadge:be,loadBoard:gi,onBoardProjectChange:Pd,handleDragStart:Rd,handleDragEnd:Nd,handleDragOver:Hd,handleDragLeave:Od,handleCardDragOver:qd,handleCardDragLeave:Fd,handleDrop:Ud,handleCardDrop:zd,loadSprints:Ye,onSprintProjectChange:hd,viewSprint:ci,showEditBudgetModal:Ed,handleUpdateBudget:Td,showCloseSprintConfirmation:Id,completeSprint:xd,loadLimboStatus:ts,showLimboDetailsModal:di,showCreateDocumentModal:Hs,showCreateProjectModal:Js,approveRitual:Up,completeGateRitual:zp,toggleTicketRituals:Mo,attestTicketRitual:Jp,approveTicketRitual:Zp,showCompleteTicketRitualModal:Yp,showAttestTicketRitualModal:Kp,showCreateApiKeyModal:Xa,copyApiKey:Qa,revokeApiKey:eo,showCreateAgentModal:Da,applyIssueTemplate:Ip,updateCreateIssueProject:jp}),window.marked=N,window.DOMPurify=ql,console.log("Chaotic frontend loaded via Vite")})();
