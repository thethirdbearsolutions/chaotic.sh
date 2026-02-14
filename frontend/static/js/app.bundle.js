var Dm=Object.defineProperty;var Mm=(Be,le,rt)=>le in Be?Dm(Be,le,{enumerable:!0,configurable:!0,writable:!0,value:rt}):Be[le]=rt;var O=(Be,le,rt)=>Mm(Be,typeof le!="symbol"?le+"":le,rt);(function(){"use strict";var Ri;function Be(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var le=Be();function rt(e){le=e}var Ft={exec:()=>null};function j(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ce.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ce={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Kr=/^(?:[ \t]*(?:\n|$))+/,Vr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Jr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ut=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vs=/(?:[*+-]|\d{1,9}[.)])/,Yi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Xi=j(Yi).replace(/bull/g,vs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Yr=j(Yi).replace(/bull/g,vs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),bs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Xr=/^[^\n]+/,ys=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Qr=j(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ys).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),el=j(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vs).getRegex(),En="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ws=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,tl=j("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ws).replace("tag",En).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qi=j(bs).replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",En).getRegex(),nl=j(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qi).getRegex(),ks={blockquote:nl,code:Vr,def:Qr,fences:Jr,heading:Zr,hr:Ut,html:tl,lheading:Xi,list:el,newline:Kr,paragraph:Qi,table:Ft,text:Xr},ea=j("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",En).getRegex(),sl={...ks,lheading:Yr,table:ea,paragraph:j(bs).replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ea).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",En).getRegex()},il={...ks,html:j(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ws).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ft,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:j(bs).replace("hr",Ut).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Xi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},al=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ol=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ta=/^( {2,}|\\)\n(?!\s*$)/,rl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,In=/[\p{P}\p{S}]/u,$s=/[\s\p{P}\p{S}]/u,na=/[^\s\p{P}\p{S}]/u,ll=j(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,$s).getRegex(),sa=/(?!~)[\p{P}\p{S}]/u,cl=/(?!~)[\s\p{P}\p{S}]/u,dl=/(?:[^\s\p{P}\p{S}]|~)/u,ul=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ia=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,pl=j(ia,"u").replace(/punct/g,In).getRegex(),ml=j(ia,"u").replace(/punct/g,sa).getRegex(),aa="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",gl=j(aa,"gu").replace(/notPunctSpace/g,na).replace(/punctSpace/g,$s).replace(/punct/g,In).getRegex(),fl=j(aa,"gu").replace(/notPunctSpace/g,dl).replace(/punctSpace/g,cl).replace(/punct/g,sa).getRegex(),hl=j("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,na).replace(/punctSpace/g,$s).replace(/punct/g,In).getRegex(),vl=j(/\\(punct)/,"gu").replace(/punct/g,In).getRegex(),bl=j(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),yl=j(ws).replace("(?:-->|$)","-->").getRegex(),wl=j("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",yl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Tn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,kl=j(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Tn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oa=j(/^!?\[(label)\]\[(ref)\]/).replace("label",Tn).replace("ref",ys).getRegex(),ra=j(/^!?\[(ref)\](?:\[\])?/).replace("ref",ys).getRegex(),$l=j("reflink|nolink(?!\\()","g").replace("reflink",oa).replace("nolink",ra).getRegex(),Es={_backpedal:Ft,anyPunctuation:vl,autolink:bl,blockSkip:ul,br:ta,code:ol,del:Ft,emStrongLDelim:pl,emStrongRDelimAst:gl,emStrongRDelimUnd:hl,escape:al,link:kl,nolink:ra,punctuation:ll,reflink:oa,reflinkSearch:$l,tag:wl,text:rl,url:Ft},El={...Es,link:j(/^!?\[(label)\]\((.*?)\)/).replace("label",Tn).getRegex(),reflink:j(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Tn).getRegex()},Is={...Es,emStrongRDelimAst:fl,emStrongLDelim:ml,url:j(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Il={...Is,br:j(ta).replace("{2,}","*").getRegex(),text:j(Is.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xn={normal:ks,gfm:sl,pedantic:il},zt={normal:Es,gfm:Is,breaks:Il,pedantic:El},Tl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},la=e=>Tl[e];function Te(e,t){if(t){if(ce.escapeTest.test(e))return e.replace(ce.escapeReplace,la)}else if(ce.escapeTestNoEncode.test(e))return e.replace(ce.escapeReplaceNoEncode,la);return e}function ca(e){try{e=encodeURI(e).replace(ce.percentDecode,"%")}catch{return null}return e}function da(e,t){var a;const n=e.replace(ce.findPipe,(o,r,c)=>{let l=!1,d=r;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),s=n.split(ce.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ce.slashPipe,"|");return s}function Gt(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function xl(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function ua(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function _l(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var _n=class{constructor(e){O(this,"options");O(this,"rules");O(this,"lexer");this.options=e||le}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Gt(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=_l(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=Gt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Gt(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Gt(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const l=r.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${d}`:d;const m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=m,n.length===0)break;const p=a.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const f=p,v=f.raw+`
`+n.join(`
`),I=this.blockquote(v);a[a.length-1]=I,s=s.substring(0,s.length-f.raw.length)+I.raw,i=i.substring(0,i.length-f.text.length)+I.text;break}else if((p==null?void 0:p.type)==="list"){const f=p,v=f.raw+`
`+n.join(`
`),I=this.list(v);a[a.length-1]=I,s=s.substring(0,s.length-p.raw.length)+I.raw,i=i.substring(0,i.length-f.raw.length)+I.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,B=>" ".repeat(3*B.length)),p=e.split(`
`,1)[0],f=!m.trim(),v=0;if(this.options.pedantic?(v=2,d=m.trimStart()):f?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=m.slice(v),v+=t[1].length),f&&this.rules.other.blankLine.test(p)&&(l+=p+`
`,e=e.substring(p.length+1),c=!0),!c){const B=this.rules.other.nextBulletRegex(v),M=this.rules.other.hrRegex(v),N=this.rules.other.fencesBeginRegex(v),D=this.rules.other.headingBeginRegex(v),q=this.rules.other.htmlBeginRegex(v);for(;e;){const y=e.split(`
`,1)[0];let K;if(p=y,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),K=p):K=p.replace(this.rules.other.tabCharGlobal,"    "),N.test(p)||D.test(p)||q.test(p)||B.test(p)||M.test(p))break;if(K.search(this.rules.other.nonSpaceChar)>=v||!p.trim())d+=`
`+K.slice(v);else{if(f||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||N.test(m)||D.test(m)||M.test(m))break;d+=`
`+p}!f&&!p.trim()&&(f=!0),l+=y+`
`,e=e.substring(y.length+1),m=K.slice(v)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let I=null,_;this.options.gfm&&(I=this.rules.other.listIsTask.exec(d),I&&(_=I[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!I,checked:_,loose:!1,text:d,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const l=i.items[c].tokens.filter(m=>m.type==="space"),d=l.length>0&&l.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=d}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=da(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(da(r,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Gt(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=xl(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),ua(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return ua(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,l=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);const m=[...s[0]][0].length,p=e.slice(0,a+s.index+m+r);if(Math.min(a,r)%2){const v=p.slice(1,-1);return{type:"em",raw:p,text:v,tokens:this.lexer.inlineTokens(v)}}const f=p.slice(2,-2);return{type:"strong",raw:p,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},De=class Ji{constructor(t){O(this,"tokens");O(this,"options");O(this,"state");O(this,"tokenizer");O(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||le,this.options.tokenizer=this.options.tokenizer||new _n,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ce,block:xn.normal,inline:zt.normal};this.options.pedantic?(n.block=xn.pedantic,n.inline=zt.pedantic):this.options.gfm&&(n.block=xn.gfm,this.options.breaks?n.inline=zt.breaks:n.inline=zt.gfm),this.tokenizer.rules=n}static get rules(){return{block:xn,inline:zt}}static lex(t,n){return new Ji(n).lex(t)}static lexInline(t,n){return new Ji(n).inlineTokens(t)}lex(t){t=t.replace(ce.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ce.tabCharGlobal,"    ").replace(ce.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const d=t.slice(1);let m;this.options.extensions.startBlock.forEach(p=>{m=p.call({lexer:this},d),typeof m=="number"&&m>=0&&(l=Math.min(l,m))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,l;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(p=>(d=p.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const p=n.at(-1);d.type==="text"&&(p==null?void 0:p.type)==="text"?(p.raw+=d.raw,p.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let m=t;if((l=this.options.extensions)!=null&&l.startInline){let p=1/0;const f=t.slice(1);let v;this.options.extensions.startInline.forEach(I=>{v=I.call({lexer:this},f),typeof v=="number"&&v>=0&&(p=Math.min(p,v))}),p<1/0&&p>=0&&(m=t.substring(0,p+1))}if(d=this.tokenizer.inlineText(m)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const p=n.at(-1);(p==null?void 0:p.type)==="text"?(p.raw+=d.raw,p.text+=d.text):n.push(d);continue}if(t){const p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Sn=class{constructor(e){O(this,"options");O(this,"parser");this.options=e||le}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ce.notSpaceStart))==null?void 0:a[0],i=e.replace(ce.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Te(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=ca(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Te(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=ca(e);if(i===null)return Te(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Te(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Te(e.text)}},Ts=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Me=class Zi{constructor(t){O(this,"options");O(this,"renderer");O(this,"textRenderer");this.options=t||le,this.options.renderer=this.options.renderer||new Sn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ts}static parse(t,n){return new Zi(n).parse(t)}static parseInline(t,n){return new Zi(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=d||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],d+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Cn=(Ri=class{constructor(e){O(this,"options");O(this,"block");this.options=e||le}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?De.lex:De.lexInline}provideParser(){return this.block?Me.parse:Me.parseInline}},O(Ri,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ri),Sl=class{constructor(...e){O(this,"defaults",Be());O(this,"options",this.setOptions);O(this,"parse",this.parseMarkdown(!0));O(this,"parseInline",this.parseMarkdown(!1));O(this,"Parser",Me);O(this,"Renderer",Sn);O(this,"TextRenderer",Ts);O(this,"Lexer",De);O(this,"Tokenizer",_n);O(this,"Hooks",Cn);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Sn(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new _n(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new Cn;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];Cn.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(m=>c.call(i,m));const d=r.call(i,l);return c.call(i,d)}:i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return De.lex(e,t??this.defaults)}parser(e,t){return Me.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?De.lex:De.lexInline,c=a.hooks?a.hooks.provideParser():e?Me.parse:Me.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Te(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},lt=new Sl;function P(e,t){return lt.parse(e,t)}P.options=P.setOptions=function(e){return lt.setOptions(e),P.defaults=lt.defaults,rt(P.defaults),P},P.getDefaults=Be,P.defaults=le,P.use=function(...e){return lt.use(...e),P.defaults=lt.defaults,rt(P.defaults),P},P.walkTokens=function(e,t){return lt.walkTokens(e,t)},P.parseInline=lt.parseInline,P.Parser=Me,P.parser=Me.parse,P.Renderer=Sn,P.TextRenderer=Ts,P.Lexer=De,P.lexer=De.lex,P.Tokenizer=_n,P.Hooks=Cn,P.parse=P,P.options,P.setOptions,P.use,P.walkTokens,P.parseInline,Me.parse,De.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:pa,setPrototypeOf:ma,isFrozen:Cl,getPrototypeOf:Ll,getOwnPropertyDescriptor:Al}=Object;let{freeze:de,seal:ve,create:xs}=Object,{apply:_s,construct:Ss}=typeof Reflect<"u"&&Reflect;de||(de=function(t){return t}),ve||(ve=function(t){return t}),_s||(_s=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),Ss||(Ss=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const Ln=pe(Array.prototype.forEach),Bl=pe(Array.prototype.lastIndexOf),ga=pe(Array.prototype.pop),Wt=pe(Array.prototype.push),Dl=pe(Array.prototype.splice),An=pe(String.prototype.toLowerCase),Cs=pe(String.prototype.toString),Ls=pe(String.prototype.match),Kt=pe(String.prototype.replace),Ml=pe(String.prototype.indexOf),jl=pe(String.prototype.trim),Ee=pe(Object.prototype.hasOwnProperty),ue=pe(RegExp.prototype.test),Vt=Rl(TypeError);function pe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return _s(e,t,s)}}function Rl(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Ss(e,n)}}function L(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:An;ma&&ma(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Cl(t)||(t[s]=a),i=a)}e[i]=!0}return e}function Pl(e){for(let t=0;t<e.length;t++)Ee(e,t)||(e[t]=null);return e}function xe(e){const t=xs(null);for(const[n,s]of pa(e))Ee(e,n)&&(Array.isArray(s)?t[n]=Pl(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=xe(s):t[n]=s);return t}function Jt(e,t){for(;e!==null;){const s=Al(e,t);if(s){if(s.get)return pe(s.get);if(typeof s.value=="function")return pe(s.value)}e=Ll(e)}function n(){return null}return n}const fa=de(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),As=de(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Bs=de(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Nl=de(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ds=de(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hl=de(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ha=de(["#text"]),va=de(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ms=de(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ba=de(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Bn=de(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ol=ve(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ql=ve(/<%[\w\W]*|[\w\W]*%>/gm),Fl=ve(/\$\{[\w\W]*/gm),Ul=ve(/^data-[\-\w.\u00B7-\uFFFF]+$/),zl=ve(/^aria-[\-\w]+$/),ya=ve(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gl=ve(/^(?:\w+script|data):/i),Wl=ve(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),wa=ve(/^html$/i),Kl=ve(/^[a-z][.\w]*(-[.\w]+)+$/i);var ka=Object.freeze({__proto__:null,ARIA_ATTR:zl,ATTR_WHITESPACE:Wl,CUSTOM_ELEMENT:Kl,DATA_ATTR:Ul,DOCTYPE_NAME:wa,ERB_EXPR:ql,IS_ALLOWED_URI:ya,IS_SCRIPT_OR_DATA:Gl,MUSTACHE_EXPR:Ol,TMPLIT_EXPR:Fl});const Zt={element:1,text:3,progressingInstruction:7,comment:8,document:9},Vl=function(){return typeof window>"u"?null:window},Jl=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},$a=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ea(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vl();const t=x=>Ea(x);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Zt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:p,trustedTypes:f}=e,v=c.prototype,I=Jt(v,"cloneNode"),_=Jt(v,"remove"),B=Jt(v,"nextSibling"),M=Jt(v,"childNodes"),N=Jt(v,"parentNode");if(typeof o=="function"){const x=n.createElement("template");x.content&&x.content.ownerDocument&&(n=x.content.ownerDocument)}let D,q="";const{implementation:y,createNodeIterator:K,createDocumentFragment:Ie,getElementsByTagName:ae}=n,{importNode:oe}=s;let V=$a();t.isSupported=typeof pa=="function"&&typeof N=="function"&&y&&y.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:We,ERB_EXPR:Mt,TMPLIT_EXPR:gt,DATA_ATTR:km,ARIA_ATTR:$m,IS_SCRIPT_OR_DATA:Em,ATTR_WHITESPACE:Er,CUSTOM_ELEMENT:Im}=ka;let{IS_ALLOWED_URI:Ir}=ka,Q=null;const Tr=L({},[...fa,...As,...Bs,...Ds,...ha]);let te=null;const xr=L({},[...va,...Ms,...ba,...Bn]);let J=Object.seal(xs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),wn=null,Pi=null;const jt=Object.seal(xs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let _r=!0,Ni=!0,Sr=!1,Cr=!0,Rt=!1,ds=!0,ft=!1,Hi=!1,Oi=!1,Pt=!1,us=!1,ps=!1,Lr=!0,Ar=!1;const Tm="user-content-";let qi=!0,kn=!1,Nt={},Le=null;const Fi=L({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Br=null;const Dr=L({},["audio","video","img","source","image","track"]);let Ui=null;const Mr=L({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ms="http://www.w3.org/1998/Math/MathML",gs="http://www.w3.org/2000/svg",Ke="http://www.w3.org/1999/xhtml";let Ht=Ke,zi=!1,Gi=null;const xm=L({},[ms,gs,Ke],Cs);let fs=L({},["mi","mo","mn","ms","mtext"]),hs=L({},["annotation-xml"]);const _m=L({},["title","style","font","a","script"]);let $n=null;const Sm=["application/xhtml+xml","text/html"],Cm="text/html";let X=null,Ot=null;const Lm=n.createElement("form"),jr=function(u){return u instanceof RegExp||u instanceof Function},Wi=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ot&&Ot===u)){if((!u||typeof u!="object")&&(u={}),u=xe(u),$n=Sm.indexOf(u.PARSER_MEDIA_TYPE)===-1?Cm:u.PARSER_MEDIA_TYPE,X=$n==="application/xhtml+xml"?Cs:An,Q=Ee(u,"ALLOWED_TAGS")?L({},u.ALLOWED_TAGS,X):Tr,te=Ee(u,"ALLOWED_ATTR")?L({},u.ALLOWED_ATTR,X):xr,Gi=Ee(u,"ALLOWED_NAMESPACES")?L({},u.ALLOWED_NAMESPACES,Cs):xm,Ui=Ee(u,"ADD_URI_SAFE_ATTR")?L(xe(Mr),u.ADD_URI_SAFE_ATTR,X):Mr,Br=Ee(u,"ADD_DATA_URI_TAGS")?L(xe(Dr),u.ADD_DATA_URI_TAGS,X):Dr,Le=Ee(u,"FORBID_CONTENTS")?L({},u.FORBID_CONTENTS,X):Fi,wn=Ee(u,"FORBID_TAGS")?L({},u.FORBID_TAGS,X):xe({}),Pi=Ee(u,"FORBID_ATTR")?L({},u.FORBID_ATTR,X):xe({}),Nt=Ee(u,"USE_PROFILES")?u.USE_PROFILES:!1,_r=u.ALLOW_ARIA_ATTR!==!1,Ni=u.ALLOW_DATA_ATTR!==!1,Sr=u.ALLOW_UNKNOWN_PROTOCOLS||!1,Cr=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Rt=u.SAFE_FOR_TEMPLATES||!1,ds=u.SAFE_FOR_XML!==!1,ft=u.WHOLE_DOCUMENT||!1,Pt=u.RETURN_DOM||!1,us=u.RETURN_DOM_FRAGMENT||!1,ps=u.RETURN_TRUSTED_TYPE||!1,Oi=u.FORCE_BODY||!1,Lr=u.SANITIZE_DOM!==!1,Ar=u.SANITIZE_NAMED_PROPS||!1,qi=u.KEEP_CONTENT!==!1,kn=u.IN_PLACE||!1,Ir=u.ALLOWED_URI_REGEXP||ya,Ht=u.NAMESPACE||Ke,fs=u.MATHML_TEXT_INTEGRATION_POINTS||fs,hs=u.HTML_INTEGRATION_POINTS||hs,J=u.CUSTOM_ELEMENT_HANDLING||{},u.CUSTOM_ELEMENT_HANDLING&&jr(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(J.tagNameCheck=u.CUSTOM_ELEMENT_HANDLING.tagNameCheck),u.CUSTOM_ELEMENT_HANDLING&&jr(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(J.attributeNameCheck=u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(J.allowCustomizedBuiltInElements=u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Rt&&(Ni=!1),us&&(Pt=!0),Nt&&(Q=L({},ha),te=[],Nt.html===!0&&(L(Q,fa),L(te,va)),Nt.svg===!0&&(L(Q,As),L(te,Ms),L(te,Bn)),Nt.svgFilters===!0&&(L(Q,Bs),L(te,Ms),L(te,Bn)),Nt.mathMl===!0&&(L(Q,Ds),L(te,ba),L(te,Bn))),u.ADD_TAGS&&(typeof u.ADD_TAGS=="function"?jt.tagCheck=u.ADD_TAGS:(Q===Tr&&(Q=xe(Q)),L(Q,u.ADD_TAGS,X))),u.ADD_ATTR&&(typeof u.ADD_ATTR=="function"?jt.attributeCheck=u.ADD_ATTR:(te===xr&&(te=xe(te)),L(te,u.ADD_ATTR,X))),u.ADD_URI_SAFE_ATTR&&L(Ui,u.ADD_URI_SAFE_ATTR,X),u.FORBID_CONTENTS&&(Le===Fi&&(Le=xe(Le)),L(Le,u.FORBID_CONTENTS,X)),u.ADD_FORBID_CONTENTS&&(Le===Fi&&(Le=xe(Le)),L(Le,u.ADD_FORBID_CONTENTS,X)),qi&&(Q["#text"]=!0),ft&&L(Q,["html","head","body"]),Q.table&&(L(Q,["tbody"]),delete wn.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=u.TRUSTED_TYPES_POLICY,q=D.createHTML("")}else D===void 0&&(D=Jl(f,i)),D!==null&&typeof q=="string"&&(q=D.createHTML(""));de&&de(u),Ot=u}},Rr=L({},[...As,...Bs,...Nl]),Pr=L({},[...Ds,...Hl]),Am=function(u){let k=N(u);(!k||!k.tagName)&&(k={namespaceURI:Ht,tagName:"template"});const T=An(u.tagName),F=An(k.tagName);return Gi[u.namespaceURI]?u.namespaceURI===gs?k.namespaceURI===Ke?T==="svg":k.namespaceURI===ms?T==="svg"&&(F==="annotation-xml"||fs[F]):!!Rr[T]:u.namespaceURI===ms?k.namespaceURI===Ke?T==="math":k.namespaceURI===gs?T==="math"&&hs[F]:!!Pr[T]:u.namespaceURI===Ke?k.namespaceURI===gs&&!hs[F]||k.namespaceURI===ms&&!fs[F]?!1:!Pr[T]&&(_m[T]||!Rr[T]):!!($n==="application/xhtml+xml"&&Gi[u.namespaceURI]):!1},Ae=function(u){Wt(t.removed,{element:u});try{N(u).removeChild(u)}catch{_(u)}},ht=function(u,k){try{Wt(t.removed,{attribute:k.getAttributeNode(u),from:k})}catch{Wt(t.removed,{attribute:null,from:k})}if(k.removeAttribute(u),u==="is")if(Pt||us)try{Ae(k)}catch{}else try{k.setAttribute(u,"")}catch{}},Nr=function(u){let k=null,T=null;if(Oi)u="<remove></remove>"+u;else{const Z=Ls(u,/^[\r\n\t ]+/);T=Z&&Z[0]}$n==="application/xhtml+xml"&&Ht===Ke&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");const F=D?D.createHTML(u):u;if(Ht===Ke)try{k=new p().parseFromString(F,$n)}catch{}if(!k||!k.documentElement){k=y.createDocument(Ht,"template",null);try{k.documentElement.innerHTML=zi?q:F}catch{}}const re=k.body||k.documentElement;return u&&T&&re.insertBefore(n.createTextNode(T),re.childNodes[0]||null),Ht===Ke?ae.call(k,ft?"html":"body")[0]:ft?k.documentElement:re},Hr=function(u){return K.call(u.ownerDocument||u,u,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Ki=function(u){return u instanceof m&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof d)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},Or=function(u){return typeof r=="function"&&u instanceof r};function Ve(x,u,k){Ln(x,T=>{T.call(t,u,k,Ot)})}const qr=function(u){let k=null;if(Ve(V.beforeSanitizeElements,u,null),Ki(u))return Ae(u),!0;const T=X(u.nodeName);if(Ve(V.uponSanitizeElement,u,{tagName:T,allowedTags:Q}),ds&&u.hasChildNodes()&&!Or(u.firstElementChild)&&ue(/<[/\w!]/g,u.innerHTML)&&ue(/<[/\w!]/g,u.textContent)||u.nodeType===Zt.progressingInstruction||ds&&u.nodeType===Zt.comment&&ue(/<[/\w]/g,u.data))return Ae(u),!0;if(!(jt.tagCheck instanceof Function&&jt.tagCheck(T))&&(!Q[T]||wn[T])){if(!wn[T]&&Ur(T)&&(J.tagNameCheck instanceof RegExp&&ue(J.tagNameCheck,T)||J.tagNameCheck instanceof Function&&J.tagNameCheck(T)))return!1;if(qi&&!Le[T]){const F=N(u)||u.parentNode,re=M(u)||u.childNodes;if(re&&F){const Z=re.length;for(let me=Z-1;me>=0;--me){const Je=I(re[me],!0);Je.__removalCount=(u.__removalCount||0)+1,F.insertBefore(Je,B(u))}}}return Ae(u),!0}return u instanceof c&&!Am(u)||(T==="noscript"||T==="noembed"||T==="noframes")&&ue(/<\/no(script|embed|frames)/i,u.innerHTML)?(Ae(u),!0):(Rt&&u.nodeType===Zt.text&&(k=u.textContent,Ln([We,Mt,gt],F=>{k=Kt(k,F," ")}),u.textContent!==k&&(Wt(t.removed,{element:u.cloneNode()}),u.textContent=k)),Ve(V.afterSanitizeElements,u,null),!1)},Fr=function(u,k,T){if(Lr&&(k==="id"||k==="name")&&(T in n||T in Lm))return!1;if(!(Ni&&!Pi[k]&&ue(km,k))){if(!(_r&&ue($m,k))){if(!(jt.attributeCheck instanceof Function&&jt.attributeCheck(k,u))){if(!te[k]||Pi[k]){if(!(Ur(u)&&(J.tagNameCheck instanceof RegExp&&ue(J.tagNameCheck,u)||J.tagNameCheck instanceof Function&&J.tagNameCheck(u))&&(J.attributeNameCheck instanceof RegExp&&ue(J.attributeNameCheck,k)||J.attributeNameCheck instanceof Function&&J.attributeNameCheck(k,u))||k==="is"&&J.allowCustomizedBuiltInElements&&(J.tagNameCheck instanceof RegExp&&ue(J.tagNameCheck,T)||J.tagNameCheck instanceof Function&&J.tagNameCheck(T))))return!1}else if(!Ui[k]){if(!ue(Ir,Kt(T,Er,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&u!=="script"&&Ml(T,"data:")===0&&Br[u])){if(!(Sr&&!ue(Em,Kt(T,Er,"")))){if(T)return!1}}}}}}}return!0},Ur=function(u){return u!=="annotation-xml"&&Ls(u,Im)},zr=function(u){Ve(V.beforeSanitizeAttributes,u,null);const{attributes:k}=u;if(!k||Ki(u))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0};let F=k.length;for(;F--;){const re=k[F],{name:Z,namespaceURI:me,value:Je}=re,qt=X(Z),Vi=Je;let ne=Z==="value"?Vi:jl(Vi);if(T.attrName=qt,T.attrValue=ne,T.keepAttr=!0,T.forceKeepAttr=void 0,Ve(V.uponSanitizeAttribute,u,T),ne=T.attrValue,Ar&&(qt==="id"||qt==="name")&&(ht(Z,u),ne=Tm+ne),ds&&ue(/((--!?|])>)|<\/(style|title|textarea)/i,ne)){ht(Z,u);continue}if(qt==="attributename"&&Ls(ne,"href")){ht(Z,u);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){ht(Z,u);continue}if(!Cr&&ue(/\/>/i,ne)){ht(Z,u);continue}Rt&&Ln([We,Mt,gt],Wr=>{ne=Kt(ne,Wr," ")});const Gr=X(u.nodeName);if(!Fr(Gr,qt,ne)){ht(Z,u);continue}if(D&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!me)switch(f.getAttributeType(Gr,qt)){case"TrustedHTML":{ne=D.createHTML(ne);break}case"TrustedScriptURL":{ne=D.createScriptURL(ne);break}}if(ne!==Vi)try{me?u.setAttributeNS(me,Z,ne):u.setAttribute(Z,ne),Ki(u)?Ae(u):ga(t.removed)}catch{ht(Z,u)}}Ve(V.afterSanitizeAttributes,u,null)},Bm=function x(u){let k=null;const T=Hr(u);for(Ve(V.beforeSanitizeShadowDOM,u,null);k=T.nextNode();)Ve(V.uponSanitizeShadowNode,k,null),qr(k),zr(k),k.content instanceof a&&x(k.content);Ve(V.afterSanitizeShadowDOM,u,null)};return t.sanitize=function(x){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,T=null,F=null,re=null;if(zi=!x,zi&&(x="<!-->"),typeof x!="string"&&!Or(x))if(typeof x.toString=="function"){if(x=x.toString(),typeof x!="string")throw Vt("dirty is not a string, aborting")}else throw Vt("toString is not a function");if(!t.isSupported)return x;if(Hi||Wi(u),t.removed=[],typeof x=="string"&&(kn=!1),kn){if(x.nodeName){const Je=X(x.nodeName);if(!Q[Je]||wn[Je])throw Vt("root node is forbidden and cannot be sanitized in-place")}}else if(x instanceof r)k=Nr("<!---->"),T=k.ownerDocument.importNode(x,!0),T.nodeType===Zt.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?k=T:k.appendChild(T);else{if(!Pt&&!Rt&&!ft&&x.indexOf("<")===-1)return D&&ps?D.createHTML(x):x;if(k=Nr(x),!k)return Pt?null:ps?q:""}k&&Oi&&Ae(k.firstChild);const Z=Hr(kn?x:k);for(;F=Z.nextNode();)qr(F),zr(F),F.content instanceof a&&Bm(F.content);if(kn)return x;if(Pt){if(us)for(re=Ie.call(k.ownerDocument);k.firstChild;)re.appendChild(k.firstChild);else re=k;return(te.shadowroot||te.shadowrootmode)&&(re=oe.call(s,re,!0)),re}let me=ft?k.outerHTML:k.innerHTML;return ft&&Q["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&ue(wa,k.ownerDocument.doctype.name)&&(me="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+me),Rt&&Ln([We,Mt,gt],Je=>{me=Kt(me,Je," ")}),D&&ps?D.createHTML(me):me},t.setConfig=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Wi(x),Hi=!0},t.clearConfig=function(){Ot=null,Hi=!1},t.isValidAttribute=function(x,u,k){Ot||Wi({});const T=X(x),F=X(u);return Fr(T,F,k)},t.addHook=function(x,u){typeof u=="function"&&Wt(V[x],u)},t.removeHook=function(x,u){if(u!==void 0){const k=Bl(V[x],u);return k===-1?void 0:Dl(V[x],k,1)[0]}return ga(V[x])},t.removeHooks=function(x){V[x]=[]},t.removeAllHooks=function(){V=$a()},t}var Zl=Ea();const Yl="/api";class Xl{constructor(){try{this.token=localStorage.getItem("chaotic_token")}catch(t){console.warn("Failed to access localStorage:",t),this.token=null}}setToken(t){this.token=t;try{t?localStorage.setItem("chaotic_token",t):localStorage.removeItem("chaotic_token")}catch(n){console.warn("Failed to persist token to localStorage:",n)}}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Yl}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){const c=typeof r.detail=="string"?r.detail:"An error occurred";throw new Error(c)}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const $=new Xl;window.api=$;let vt=null;function A(){document.getElementById("modal-overlay").classList.remove("hidden")}function R(){document.getElementById("modal-overlay").classList.add("hidden")}function g(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.remove()},3e3)}function Yt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),vt&&(document.removeEventListener("keydown",vt),vt=null)}function Ql(e){vt&&document.removeEventListener("keydown",vt),vt=e,e&&document.addEventListener("keydown",e)}function Dn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(Yt(),document.removeEventListener("click",s))};return setTimeout(()=>document.addEventListener("click",s),0),()=>document.removeEventListener("click",s)}Object.assign(window,{showModal:A,closeModal:R,showToast:g,closeAllDropdowns:Yt,registerDropdownClickOutside:Dn});function Ze(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function je(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function js(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ge(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function h(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function S(e){return h(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Mn(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function E(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}let bt=null,Xt=null,Qt=null,en=null;function jn(){bt||(bt=document.getElementById("auth-screen"),Xt=document.getElementById("main-screen"),Qt=document.getElementById("login-form"),en=document.getElementById("signup-form"))}function Rn(){jn(),bt&&bt.classList.remove("hidden"),Xt&&Xt.classList.add("hidden")}function Ia(){jn(),bt&&bt.classList.add("hidden"),Xt&&Xt.classList.remove("hidden")}function Ta(){jn(),Qt&&Qt.classList.remove("hidden"),en&&en.classList.add("hidden")}function xa(){jn(),Qt&&Qt.classList.add("hidden"),en&&en.classList.remove("hidden")}async function _a(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await $.login(t,n),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),g("Welcome back!","success")}catch(s){g(s.message,"error")}return!1}async function Sa(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await $.signup(t,n,s),await $.login(n,s),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),g("Account created successfully!","success")}catch(i){g(i.message,"error")}return!1}function Rs(){$.logout(),window.currentUser=null,window.currentTeam=null,Rn(),g("Signed out","success")}function Ca(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function La(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Ca(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${S(s)}" alt="${S(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}Object.assign(window,{showAuthScreen:Rn,showMainScreen:Ia,showLogin:Ta,showSignup:xa,handleLogin:_a,handleSignup:Sa,logout:Rs,updateUserInfo:La,isImageAvatar:Ca});function Aa(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let yt=[],Pn=[],U=new Set,wt="list",ct=!1,Ps=null;try{const e=localStorage.getItem("chaotic_doc_view_mode");(e==="list"||e==="grid")&&(wt=e)}catch{}function ec(e){if(e!=="list"&&e!=="grid")return;wt=e,e==="grid"&&ct&&Nn();try{localStorage.setItem("chaotic_doc_view_mode",e)}catch{}const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),Re()}function Ba(){if(wt!=="list")return;ct=!0,U.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=Nn),Re(),$t()}function Nn(){ct=!1,U.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=Ba),Re(),$t()}function tc(){Ps&&clearTimeout(Ps),Ps=setTimeout(()=>{Re()},300)}function nc(){const e=document.getElementById("doc-search");e&&(e.value=""),Re()}function sc(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),Re()}function ic(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),Re()}function ac(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${h(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),c=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${h(c)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Re(){var s,i,a,o;const e=((i=(s=document.getElementById("doc-search"))==null?void 0:s.value)==null?void 0:i.toLowerCase())||"",t=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",n=((o=document.getElementById("doc-sort"))==null?void 0:o.value)||"updated_desc";ac(),Pn=yt.filter(r=>{var c,l;if(e){const d=(c=r.title)==null?void 0:c.toLowerCase().includes(e),m=(l=r.content)==null?void 0:l.toLowerCase().includes(e);if(!d&&!m)return!1}return!(t&&r.project_id!==t)}),Pn.sort((r,c)=>{switch(n){case"title_asc":return(r.title||"").localeCompare(c.title||"");case"title_desc":return(c.title||"").localeCompare(r.title||"");case"updated_asc":return new Date(r.updated_at)-new Date(c.updated_at);case"updated_desc":default:return new Date(c.updated_at)-new Date(r.updated_at)}}),Da("",wt)}async function kt(e,t=null){var n;if(e||(e=(n=window.currentTeam)==null?void 0:n.id),!!e){if(t===null){const s=document.getElementById("doc-project-filter");s!=null&&s.value&&(t=s.value)}try{yt=await $.getDocuments(e,t);const s=document.getElementById("doc-view-list"),i=document.getElementById("doc-view-grid");s&&i&&(s.classList.toggle("active",wt==="list"),i.classList.toggle("active",wt==="grid")),Re()}catch(s){g(s.message,"error")}}}function oc(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${ge(t.color)}; color: white;">${h(t.name)}</span>`).join(" ")}function rc(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${oc(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${S(e.id)}" onclick="viewDocument('${E(e.id)}')">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${h(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${h(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?h(Aa(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${h(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function lc(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${ge(r.color)}; color: white;">${h(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Aa(e.content).substring(0,80):"No content",i=ct?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${E(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${U.has(e.id)?"checked":""}>
       </div>`:"",a=ct&&U.has(e.id)?" selected":"",o=ct?`toggleDocSelection('${E(e.id)}')`:`viewDocument('${E(e.id)}')`;return`
    <div class="list-item document-list-item${a}" onclick="${o}">
      ${i}
      <div class="document-list-icon">${h(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${h(e.title)}</div>
        <div class="document-list-snippet text-muted">${h(s)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?h(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Da(e="",t="list"){var l,d;const n=document.getElementById("documents-list");if(!n)return;U.clear(),$t();const s=Pn.length>0||(l=document.getElementById("doc-search"))!=null&&l.value?Pn:yt;if(s.length===0){const m=(d=document.getElementById("doc-search"))==null?void 0:d.value;n.innerHTML=`
      <div class="empty-state">
        <h3>${m?"No documents match your search":"No documents yet"}</h3>
        <p>${m?"Try a different search term":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?rc:lc,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=window.getProjects?window.getProjects():[];s.forEach(m=>{let p,f;if(e==="project")if(p=m.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const v=r.find(I=>I.id===m.project_id);f=v?v.name:"Unknown Project"}else e==="sprint"&&(p=m.sprint_id||"__no_sprint__",f=m.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:f,docs:[]}),o[p].docs.push(m)});let c="";for(const[m,p]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${h(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function cc(e){U.has(e)?U.delete(e):U.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=U.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",U.has(e)),$t()}function dc(){yt.forEach(e=>U.add(e.id)),yt.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),$t()}function Ma(){U.clear(),yt.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.remove("selected")}),$t()}function $t(){const e=document.getElementById("doc-bulk-actions");e&&(ct?(e.classList.remove("hidden"),U.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function uc(){if(U.size===0){g("No documents selected","error");return}const t=(window.getProjects?window.getProjects():[]).map(n=>`<option value="${n.id}">${h(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${U.size} Document${U.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,A()}async function pc(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(U);let s=0,i=0;for(const r of n)try{await $.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}R(),Ma(),i===0?g(`Moved ${s} document${s>1?"s":""}!`,"success"):g(`Moved ${s}, failed ${i}`,"warning");const a=(o=window.currentTeam)==null?void 0:o.id;return await kt(a),!1}async function mc(){var a;if(U.size===0){g("No documents selected","error");return}const e=U.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(U);let n=0,s=0;for(const o of t)try{await $.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}Nn(),s===0?g(`Deleted ${n} document${n>1?"s":""}!`,"success"):g(`Deleted ${n}, failed ${s}`,"warning");const i=(a=window.currentTeam)==null?void 0:a.id;await kt(i)}async function _e(e,t=!0){try{const n=await $.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(m=>m.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(m=>h(m));let a="";try{const m=await $.getDocumentIssues(n.id);m.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${m.map(f=>`
          <div class="linked-item">
            <span class="linked-item-id">${h(f.identifier)}</span>
            <span class="linked-item-title">${h(f.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${E(n.id)}', '${E(f.id)}')" title="Unlink">×</button>
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
          <div class="comments-list">${m.length===0?'<div class="comments-empty">No comments yet</div>':m.map(f=>{var v,I;return`
            <div class="comment" data-comment-id="${S(f.id)}">
              <div class="comment-avatar">${((I=(v=f.author_name)==null?void 0:v.charAt(0))==null?void 0:I.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${h(f.author_name||"Unknown")}</span>
                  <span class="comment-date">${Mn(f.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(f.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${E(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(m){console.error("Failed to load comments:",m)}let r=null,c=null;if(n.project_id){const p=(window.getProjects?window.getProjects():[]).find(f=>f.id===n.project_id);if(r=p?p.name:null,n.sprint_id)try{const f=await $.getSprint(n.sprint_id);c=f?f.name:null}catch{}}let l="";r?(l=`<span class="badge badge-primary">${h(r)}</span>`,c&&(l+=` <span class="badge badge-info">${h(c)}</span>`)):l='<span class="badge badge-secondary">Global</span>';let d="";n.labels&&n.labels.length>0?d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(p=>`
        <span class="label-badge" style="background-color: ${ge(p.color)}; color: white;">
          ${h(p.name)}
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
          <h2 class="document-title">${h(n.title)}</h2>
          <div class="document-meta">
            ${l}${n.author_name?` · By ${h(n.author_name)}`:""} · Last updated ${new Date(n.updated_at).toLocaleString()}
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
    `}catch(n){g(n.message,"error")}}async function Ns(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await $.getSprints(t);let o=n;if(s&&!n){const c=a.find(l=>l.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${h(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Hs(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${h(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,A(),t&&await Ns("doc-sprint",t,null,!0)}async function gc(e){var a;e.preventDefault();const t=(a=window.currentTeam)==null?void 0:a.id;if(!t)return g("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await $.createDocument(t,i),await kt(t),R(),g("Document created!","success")}catch(o){g(o.message,"error")}return!1}async function fc(e){try{const t=await $.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${h(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form onsubmit="return handleUpdateDocument(event, '${E(e)}')">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${S(t.title)}" required>
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
          <textarea id="edit-doc-content" style="min-height: 200px">${h(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${S(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,A(),t.project_id&&await Ns("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){g(t.message,"error")}}async function hc(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await $.updateDocument(t,i),R(),await _e(t),g("Document updated!","success")}catch(a){g(a.message,"error")}return!1}async function vc(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await $.deleteDocument(e);const n=(t=window.currentTeam)==null?void 0:t.id;await kt(n),window.navigateTo&&window.navigateTo("documents"),g("Document deleted!","success")}catch(n){g(n.message,"error")}}function bc(e,t){Ns(e,t)}async function yc(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${E(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${E(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,A()}async function wc(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,a=await $.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" onclick="linkToIssue('${E(t)}', '${E(o.id)}')">
        <span class="link-result-id">${h(o.identifier)}</span>
        <span class="link-result-title">${h(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function kc(e,t){try{await $.linkDocumentToIssue(e,t),R(),g("Issue linked!","success"),await _e(e,!1)}catch(n){g(n.message,"error")}}async function $c(e,t){if(confirm("Unlink this issue from the document?"))try{await $.unlinkDocumentFromIssue(e,t),g("Issue unlinked!","success"),await _e(e,!1)}catch(n){g(n.message,"error")}}async function Ec(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return g("Please enter a comment","error"),!1;try{await $.createDocumentComment(t,s),n.value="",g("Comment added!","success"),await _e(t,!1)}catch(i){g(i.message,"error")}return!1}async function Ic(e){var n;const t=(n=window.currentTeam)==null?void 0:n.id;if(!t){g("No team selected","error");return}try{const s=await $.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,A();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${E(e)}', '${E(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ge(a.color)}; color: white;">${h(a.name)}</span>
        ${a.description?`<span class="text-muted">${h(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,A()}catch(s){g(s.message,"error")}}async function Tc(e,t){try{await $.addLabelToDocument(e,t),R(),g("Label added!","success"),await _e(e,!1)}catch(n){g(n.message,"error")}}async function xc(e,t){try{await $.removeLabelFromDocument(e,t),g("Label removed!","success"),await _e(e,!1)}catch(n){g(n.message,"error")}}Object.assign(window,{loadDocuments:kt,filterDocuments:Re,renderDocuments:Da,viewDocument:_e,showCreateDocumentModal:Hs,handleCreateDocument:gc,showEditDocumentModal:fc,handleUpdateDocument:hc,deleteDocument:vc,updateDocSprintDropdown:bc,showLinkIssueModal:yc,searchIssuesToLink:wc,linkToIssue:kc,unlinkDocumentFromIssue:$c,toggleDocSelection:cc,selectAllDocs:dc,clearDocSelection:Ma,showBulkMoveModal:uc,handleBulkMove:pc,bulkDeleteDocuments:mc,handleAddDocumentComment:Ec,showAddLabelToDocModal:Ic,addLabelToDoc:Tc,removeLabelFromDoc:xc,setDocViewMode:ec,enterSelectionMode:Ba,exitSelectionMode:Nn,debounceDocSearch:tc,clearDocSearch:nc,clearDocProjectFilter:sc,clearAllDocFilters:ic});let tn=[];function _c(){return tn}function Sc(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ja(e){const t=e==null?void 0:e.avatar_url,n=S((e==null?void 0:e.name)||"Agent");return t?Sc(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${S(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${h(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Cc(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{tn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function Os(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{tn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Ra()}catch(n){g(n.message,"error")}}function Ra(){const e=document.getElementById("agents-list");if(e){if(tn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=tn.map(t=>{const n=h(t.name),s=h(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${ja(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${js(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${E(t.id)}', '${E(t.name||"Agent")}')">Delete</button>
      </div>
    `}).join("")}}function Pa(){const e=window.projects||[];document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${h(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),A()}async function Lc(e){var o,r,c;e.preventDefault();const t=(o=window.currentTeam)==null?void 0:o.id;if(!t)return g("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;i&&a?l=await $.createProjectAgent(a,n,s):l=await $.createTeamAgent(t,n,s),R();const d=h(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,A()}catch(l){g(l.message,"error")}return!1}function Ac(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{g("Agent API key copied to clipboard","success")}).catch(()=>{g("Failed to copy","error")})}async function Bc(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await $.deleteAgent(e),g("Agent deleted","success"),Os()}catch(n){g(n.message,"error")}}Object.assign(window,{loadTeamAgentsQuiet:Cc,loadAgents:Os,renderAgents:Ra,showCreateAgentModal:Pa,handleCreateAgent:Lc,copyAgentKey:Ac,deleteAgent:Bc,renderAgentAvatar:ja});let Hn=[],nn=[],qs=[],Fs=[];function Na(){return Hn}function Et(){return nn}function Dc(e){nn=e}async function On(){try{Hn=await $.getMyTeams(),Ha()}catch(e){g(e.message,"error")}}function Ha(){const e=document.getElementById("team-list");Hn.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Hn.map(t=>`
            <button class="dropdown-item" data-team-json="${S(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${h(t.name)}</button>
        `).join("")}async function Us(e,t=!1){window.currentTeam=e,document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("team-description-text");n&&(n.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),qa(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function zs(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Oa(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function qa(){if(window.currentTeam)try{nn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function Gs(){if(window.currentTeam)try{nn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Fa()}catch(e){g(e.message,"error")}}function Fa(){const e=document.getElementById("team-members-list");e.innerHTML=nn.map(t=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${h(t.user_name||"Unknown")}</span>
                    <span class="member-email">${h(t.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${t.role}</span>
                ${t.user_id!==window.currentUser.id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" onclick="removeMember('${E(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function qn(){if(window.currentTeam)try{qs=await $.getTeamInvitations(window.currentTeam.id),Ua()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Ua(){const e=document.getElementById("team-invitations-list");if(qs.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=qs.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${h(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${h(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${E(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function za(){if(window.currentTeam)try{Fs=await $.getTeamAgents(window.currentTeam.id),Ga()}catch(e){g(e.message,"error")}}function Ga(){const e=document.getElementById("team-agents-list");if(e){if(Fs.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=Fs.map(t=>{const n=h(t.name),s=h(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${h(i)}</div>
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
    `,A()}async function Mc(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await $.createInvitation(window.currentTeam.id,t,n),await qn(),R(),g("Invitation sent!","success")}catch(s){g(s.message,"error")}return!1}async function jc(e){if(confirm("Are you sure you want to remove this member?"))try{await $.removeMember(window.currentTeam.id,e),await Gs(),g("Member removed!","success")}catch(t){g(t.message,"error")}}async function Rc(e){try{await $.deleteInvitation(window.currentTeam.id,e),await qn(),g("Invitation canceled!","success")}catch(t){g(t.message,"error")}}function Ks(){zs(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,A()}function Wa(){window.currentTeam&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateTeam(event)">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${S(window.currentTeam.name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${S(window.currentTeam.key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${h(window.currentTeam.description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,A())}async function Pc(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await $.createTeam(t);await On(),await Us(n),R(),g("Team created!","success")}catch(n){g(n.message,"error")}return!1}async function Nc(e){if(e.preventDefault(),!window.currentTeam)return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await $.updateTeam(window.currentTeam.id,t);window.currentTeam=n,document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await On(),R(),g("Team updated!","success")}catch(n){g(n.message,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:On,renderTeamList:Ha,selectTeam:Us,toggleTeamDropdown:zs,toggleUserDropdown:Oa,loadTeamMembersQuiet:qa,loadTeamMembers:Gs,renderTeamMembers:Fa,loadTeamInvitations:qn,renderTeamInvitations:Ua,loadTeamAgents:za,renderTeamAgents:Ga,showInviteModal:Ws,handleInvite:Mc,removeMember:jc,deleteInvitation:Rc,showCreateTeamModal:Ks,showEditTeamModal:Wa,handleCreateTeam:Pc,handleUpdateTeam:Nc,getTeams:Na,getMembers:Et,setMembers:Dc});let G=[];const sn={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function se(){return G}function Hc(e){G=e}function Fn(e){const t=G.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return sn[n]||sn.fibonacci}function Un(e,t){if(!e)return"No estimate";const s=Fn(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Ka(e){const t=G.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(sn[n]||sn.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function be(){if(window.currentTeam)try{G=await $.getProjects(window.currentTeam.id),Va()}catch(e){g(e.message,"error")}}function Va(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=e==null?void 0:e.value,a=t==null?void 0:t.value,o=n==null?void 0:n.value,r=s==null?void 0:s.value,c='<option value="">All Projects</option>'+G.map(m=>`<option value="${m.id}">${h(m.name)}</option>`).join(""),l='<option value="">Select Project</option>'+G.map(m=>`<option value="${m.id}">${h(m.name)}</option>`).join(""),d=zn();if(e){e.innerHTML=c;let m=i;if(!m||!G.some(p=>p.id===m))if(d&&G.some(p=>p.id===d))m=d;else{const f=new URLSearchParams(window.location.search).get("project");f&&G.some(v=>v.id===f)?m=f:G.length>0&&(m=G[0].id)}m&&(e.value=m,localStorage.setItem("chaotic_last_project",m))}if(t){t.innerHTML=l;const m=a||d;m&&G.some(p=>p.id===m)&&(t.value=m)}if(n){n.innerHTML=l;const m=o||d;m&&G.some(p=>p.id===m)&&(n.value=m)}s&&(s.innerHTML=c,r&&G.some(m=>m.id===r)&&(s.value=r))}function zn(){return localStorage.getItem("chaotic_last_project")}function an(e){if(!e)return;localStorage.setItem("chaotic_last_project",e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function on(){const e=document.getElementById("projects-list");if(G.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=G.map(t=>`
        <div class="grid-item" onclick="viewProject('${E(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ge(t.color)}20; color: ${ge(t.color)}">
                    ${h(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${h(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${E(t.id)}')" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${h(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function Oc(e){document.getElementById("project-filter").value=e,window.navigateTo&&window.navigateTo("issues")}function Vs(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,A()}async function qc(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.createProject(window.currentTeam.id,t),await be(),on(),R(),g("Project created!","success")}catch(n){g(n.message,"error")}return!1}function Fc(e){const t=G.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateProject(event, '${E(t.id)}')">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" value="${S(t.name)}" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key</label>
                <input type="text" id="project-key" value="${t.key}" disabled class="input-disabled">
                <small class="form-hint">Project key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description">${h(t.description||"")}</textarea>
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
    `,A()}async function Uc(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.updateProject(t,n),await be(),on(),R(),g("Project updated!","success")}catch(s){g(s.message,"error")}return!1}async function zc(e){const t=G.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await $.deleteProject(e),await be(),on(),R(),g("Project deleted","success")}catch(n){g(n.message,"error")}}let ye=null;async function Ja(e){ye=e,G.length===0&&await be();const t=G.find(n=>n.id===e);if(!t){g("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Za("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Za(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Pe||Pe.length===0)&&It()}function Ya(){ye=null,Pe=[]}function Xa(e){ye=e}function Qa(){return Pe}async function Gc(){if(!ye)return;const e=document.getElementById("ps-name").value.trim();if(!e){g("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await $.updateProject(ye,t),await be(),g("Settings saved","success");const n=G.find(s=>s.id===ye);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){g(n.message,"error")}}async function Wc(){if(!ye)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await $.updateProject(ye,n),await be(),g("Settings saved","success")}catch(s){g(s.message,"error")}}let Pe=[];async function It(){if(ye)try{Pe=await $.getRituals(ye),Kc(),typeof window._onRitualsChanged=="function"&&window._onRitualsChanged()}catch(e){g(e.message,"error")}}function Kc(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Pe.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=Pe.filter(s=>s.trigger==="ticket_close"),n=Pe.filter(s=>s.trigger==="ticket_claim");Tt("ps-sprint-rituals-list",e,"sprint"),Tt("ps-close-rituals-list",t,"close"),Tt("ps-claim-rituals-list",n,"claim")}function Tt(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>S(a||"auto");s.innerHTML=t.map(a=>`
    <div class="ritual-item">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${h(a.name)}</div>
        <div class="ritual-item-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):h(a.prompt)}</div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${i(a.approval_mode)}">${h(a.approval_mode||"auto")}</span>
          ${a.approval_mode==="auto"?"- Agent clears immediately":""}
          ${a.approval_mode==="review"?"- Requires human approval":""}
          ${a.approval_mode==="gate"?"- Human only":""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${E(a.id)}')">Edit</button>
        <button class="btn btn-danger btn-small" data-ritual-id="${S(a.id)}" data-ritual-name="${S(a.name)}" onclick="deleteProjectRitual(this.dataset.ritualId, this.dataset.ritualName)">Delete</button>
      </div>
    </div>
  `).join("")}function Vc(e){ye&&(document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
  `,A())}async function Jc(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}const n={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,conditions:t};try{await $.createRitual(ye,n),await It(),R(),g("Ritual created!","success")}catch(s){g(s.message,"error")}return!1}function Zc(e){const t=Pe.find(n=>n.id===e);t&&(document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${E(e)}')">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${S(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${h(t.prompt)}</textarea>
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
  `,A())}async function Yc(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,conditions:n};try{await $.updateRitual(t,s),await It(),R(),g("Ritual updated!","success")}catch(i){g(i.message,"error")}return!1}async function Xc(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await $.deleteRitual(e),await It(),g("Ritual deleted","success")}catch(n){g(n.message,"error")}}Object.assign(window,{loadProjects:be,updateProjectFilters:Va,getSavedProjectId:zn,setGlobalProjectSelection:an,renderProjects:on,viewProject:Oc,showCreateProjectModal:Vs,handleCreateProject:qc,viewProjectSettings:Ja,switchProjectSettingsTab:Za,saveProjectSettingsGeneral:Gc,saveProjectSettingsRules:Wc,clearProjectSettingsState:Ya,showEditProjectModal:Fc,handleUpdateProject:Uc,confirmDeleteProject:zc,getEstimateOptions:Fn,formatEstimate:Un,getEstimateScaleHint:Ka,getProjects:se,setProjects:Hc,ESTIMATE_SCALES:sn,showCreateProjectRitualModal:Vc,handleCreateProjectRitual:Jc,showEditProjectRitualModal:Zc,handleUpdateProjectRitual:Yc,deleteProjectRitual:Xc,setCurrentSettingsProjectId:Xa,getProjectRituals:Qa,loadProjectSettingsRituals:It});const Gn={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Wn={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let eo=0;function Qc(e){eo=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=to(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function to(e="",t="",n=""){const s=eo++,i=Object.keys(Gn).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?Gn[e]:Gn.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${Wn[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" onchange="updateOperatorOptions(${s})">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" onchange="toggleValueInput(${s})">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${ad(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" onclick="removeConditionRow(${s})">&times;</button>
        </div>
    `}function ed(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",to()),Kn()}function td(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Kn()}function nd(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Gn[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Wn[o]}</option>`).join(""),no(e),Kn()}function no(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function rn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Kn(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function sd(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw rn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw rn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const m=`${r}__${c}`;if(n.has(m))throw rn(`Duplicate condition: ${r} ${Wn[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${m}`);if(n.add(m),c==="isnull")t[m]=!0;else if(c==="in"||c==="contains")t[m]=d?d.split(",").map(p=>p.trim()).filter(p=>p):[];else if(c==="gte"||c==="lte"){if(!d)throw rn(`Please enter a numeric value for ${r} ${Wn[c]}.`),new Error(`Missing numeric value for ${m}`);const p=parseInt(d,10);if(isNaN(p))throw rn(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${m}: ${d}`);t[m]=p}else t[m]=d}return Kn(),Object.keys(t).length>0?t:null}function id(e){if(typeof window.escapeHtml=="function")return window.escapeHtml(e);const t=document.createElement("div");return t.textContent=e,t.innerHTML}function ad(e){return typeof window.escapeAttr=="function"?window.escapeAttr(e):id(e)}Object.assign(window,{renderConditionBuilder:Qc,addConditionRow:ed,removeConditionRow:td,updateOperatorOptions:nd,toggleValueInput:no,collectConditions:sd});function so(e){if(!e)return"";const t=new Date(e),s=new Date-t,i=Math.floor(s/6e4),a=Math.floor(i/60),o=Math.floor(a/24);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function od(e,t,n,s,i,a,o,r){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${h(i)}</span>
                    <span class="gate-approval-issue-title">${h(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${E(t)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${h(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${h(o)}</strong>${r?` ${so(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{rd(c,e,t,n)}),A()}async function rd(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await $.completeTicketGateRitual(t,n,i||null),g(`GATE ritual "${s}" approved!`,"success"),R(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(a){g(a.message,"error")}}function io(e,t,n,s,i,a,o,r){od(e,t,n,s,i,a,o,r)}function ld(e,t,n,s,i,a,o,r,c){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${h(i)}</span>
                    <span class="gate-approval-issue-title">${h(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${E(t)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${h(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${h(o)}</strong>${r?` ${so(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${h(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{cd(l,e,t,n)}),A()}async function cd(e,t,n,s){e.preventDefault();try{await $.approveTicketRitual(t,n),g(`Review ritual "${s}" approved!`,"success"),R(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(i){g(i.message,"error")}}function dd(e,t,n,s,i,a,o,r,c){ld(e,t,n,s,i,a,o,r,c)}window.completeGateFromList=io,window.approveReviewFromList=dd;let Js=[];async function Zs(){try{Js=await $.getApiKeys(),ud()}catch(e){g(e.message,"error")}}function ud(){const e=document.getElementById("api-keys-list");if(e){if(Js.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=Js.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${h(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${h(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${js(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${js(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${E(t.id)}', '${E(t.name)}')">Revoke</button>
            `:""}
        </div>
    `).join("")}}function ao(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateApiKey(event)">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,A()}async function pd(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await $.createApiKey(t);R(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,A()}catch(n){g(n.message,"error")}return!1}async function oo(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),g("API key copied to clipboard","success")}catch{g("Failed to copy","error")}}async function ro(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await $.revokeApiKey(e),g("API key revoked","success"),await Zs()}catch(n){g(n.message,"error")}}window.loadApiKeys=Zs,window.showCreateApiKeyModal=ao,window.handleCreateApiKey=pd,window.copyApiKey=oo,window.revokeApiKey=ro;let Vn=!1,Ne=0,Ye=[],Jn=[];function md(e){Jn=e,Ye=[...e]}function lo(){return Vn}function gd(){if(Vn)return;Vn=!0,Ne=0,Ye=[...Jn];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Zn()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>fd(n.target.value)),t.addEventListener("keydown",vd),ln(),requestAnimationFrame(()=>t.focus())}function Zn(){Vn=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function fd(e){const t=e.toLowerCase().trim();t?Ye=Jn.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Ye=[...Jn],Ne=0,ln()}function ln(){const e=document.getElementById("command-results");if(!e)return;if(Ye.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Ye.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===Ne?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function hd(e){Ne=e,ln()}function co(e){const t=Ye[e];t&&(Zn(),t.action())}function vd(e){switch(e.key){case"ArrowDown":e.preventDefault(),Ne=Math.min(Ne+1,Ye.length-1),ln();break;case"ArrowUp":e.preventDefault(),Ne=Math.max(Ne-1,0),ln();break;case"Enter":e.preventDefault(),co(Ne);break;case"Escape":e.preventDefault(),Zn();break}}window.selectCommand=hd,window.executeCommand=co;let cn=[],Ys=[],He={getCurrentUser:()=>null,getCurrentTeam:()=>null,renderIssueRow:()=>"",formatActivityText:()=>"",formatActivityActor:()=>"",getActivityIcon:()=>"📝",navigateToIssueByIdentifier:()=>{},viewDocument:()=>{}};function bd(e){He={...He,...e}}function Yn(){return cn}function dn(e){cn=e}async function Xs(){var s;const e=He.getCurrentTeam(),t=He.getCurrentUser();if(!e||!t)return;const n=(s=document.getElementById("my-issues-status-filter"))==null?void 0:s.value;wd();try{cn=await $.getTeamIssues(e.id,{assignee_id:t.id,status:n||void 0,limit:1e3}),un()}catch(i){g(i.message,"error")}}async function xt(){const e=He.getCurrentTeam();if(!e)return;const t=document.getElementById("dashboard-activity-list");t&&(t.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{Ys=await $.getTeamActivities(e.id,0,10),yd()}catch{t&&(t.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function yd(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Ys.length){e.innerHTML='<div class="activity-empty">No activity yet</div>';return}e.innerHTML=Ys.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${E(t.issue_identifier)}'); return false;"><strong>${h(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${E(t.document_id)}'); return false;"><strong>${s} ${h(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${h(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${He.getActivityIcon(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${He.formatActivityText(t)}${n}</span>
                <span class="activity-actor">by ${h(He.formatActivityActor(t))}</span>
                <span class="activity-time">${Mn(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function wd(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function uo(){Xs()}function un(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),cn.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=cn.map(t=>He.renderIssueRow(t)).join("")}}window.filterMyIssues=uo;let Se=null,Oe=0,_t=null,St=null,pn=null,Qs=!1;function po(){try{return localStorage.getItem("chaotic_onboarding_complete")==="true"}catch{return!1}}function mo(){try{localStorage.setItem("chaotic_onboarding_complete","true")}catch{}}function go(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function kd(){Se||(Se=document.createElement("div"),Se.id="onboarding-overlay",Se.className="onboarding-overlay",document.getElementById("app").appendChild(Se))}function mn(){if(!Se)return;const e=Qs?ho():fo(),t=e[Oe],n=e.map((s,i)=>`<span class="onboarding-dot${i===Oe?" active":""}${i<Oe?" completed":""}"></span>`).join("");Se.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function fo(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=go(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=go(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&_t&&(e.textContent=`${_t.name} (${_t.key})`),t&&St&&(t.textContent=`${St.name} (${St.key})`),n&&pn&&(n.textContent=`${pn.identifier} - ${pn.title}`)}}]}function ho(){const e='<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';return[{html:`
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
            `}]}function ei(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ti(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ct(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=Qs?ho():fo();Oe<e.length-1&&(Oe++,mn())},window._onboardingSkip=function(){mo(),si(),window.initApp&&window.initApp()},window._onboardingFinish=function(){mo(),si(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),ti("onboarding-team-error"),Ct("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{_t=await api.createTeam({name:t,key:n}),Oe++,mn()}catch(s){ei("onboarding-team-error",s.message||"Failed to create team"),Ct("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),ti("onboarding-project-error"),Ct("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{St=await api.createProject(_t.id,{name:t,key:n}),Oe++,mn()}catch(s){ei("onboarding-project-error",s.message||"Failed to create project"),Ct("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),ti("onboarding-issue-error"),Ct("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{pn=await api.createIssue(St.id,{title:t}),Oe++,mn()}catch(n){ei("onboarding-issue-error",n.message||"Failed to create issue"),Ct("onboarding-issue-submit",!1)}};function ni(e=!1){Qs=e,Oe=0,_t=null,St=null,pn=null,kd(),mn()}function si(){Se&&(Se.remove(),Se=null)}function ii(){try{localStorage.removeItem("chaotic_onboarding_complete")}catch{}ni(!0)}window.showOnboarding=ni,window.hideOnboarding=si,window.resetOnboarding=ii,window.hasCompletedOnboarding=po;let we={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null}};const $d=new Set;function Xe(e,t){if(typeof e=="string"){const n=we[e];we[e]=t,vo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=we[s];we[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{vo(s,i,a)})}}function vo(e,t,n){t!==n&&$d.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const ai=()=>we.currentUser,Ed=e=>Xe("currentUser",e),H=()=>we.currentView,Id=e=>Xe("currentView",e),qe=()=>we.issues,Fe=e=>Xe("issues",e),bo=()=>we.activeFilterCategory,Td=e=>Xe("activeFilterCategory",e),xd=()=>we.selectedIssueIndex,yo=e=>Xe("selectedIssueIndex",e),_d=()=>we.pendingGates,Sd=e=>Xe("pendingGates",e),Cd=()=>we.searchDebounceTimer,Ld=e=>Xe("searchDebounceTimer",e),Ad=()=>we.websocket,wo=e=>Xe("websocket",e);function Lt(){const t=new URLSearchParams(window.location.search).get("project");return t||zn()}function oi(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let At=[],Xn={},Qn=new Set,Ue=null,ko=null,$o=[],Eo=[];function Bd(){return Xn}function Dd(){return Ue}function Io(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=Lt();t&&se().some(n=>n.id===t)&&(e.value=t)}e.value?Qe(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function Md(){const e=document.getElementById("sprint-project-filter").value;e&&(an(e),oi(e)),Qe(e)}async function Qe(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){Jd();try{await $.getCurrentSprint(t),At=await $.getSprints(t),jd(),await es()}catch(n){g(n.message,"error")}}}function jd(){const e=document.getElementById("sprints-list");if(!e)return;const t=At.find(a=>a.status==="active"),n=At.find(a=>a.status==="planned"),s=At.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 onclick="viewSprint('${E(t.id)}')" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${W(t.name)}</div>
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
        `,i+=Rd(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="viewSprint('${E(n.id)}')" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${W(n.name)}</div>
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
                        <div class="sprint-history-item" onclick="viewSprint('${E(a.id)}')" style="cursor: pointer;">
                            <span class="sprint-history-name">${W(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||'<div class="empty-state"><p>Loading sprints...</p></div>'}function Rd(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((K,Ie,ae)=>Math.min(Math.max(K,Ie),ae))((new Date-o)/(r-o),0,1),m=360,p=120,f=16,v=f,I=m-f,_=f,B=p-f,M=K=>s===0?B:_+(1-K/s)*(B-_),N=M(s),D=M(0),q=v+(I-v)*d,y=M(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${ts(e.start_date)} → ${ts(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${m} ${p}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${v}" y1="${N}" x2="${I}" y2="${D}" class="burndown-ideal" />
                <line x1="${v}" y1="${N}" x2="${q}" y2="${y}" class="burndown-actual" />
                <circle cx="${q}" cy="${y}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function ri(e,t=!0){try{const n=await $.getSprint(e);if(!n){g("Sprint not found","error"),window.navigateTo("sprints");return}ko=n;const[s,i]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getSprintTransactions(e).catch(()=>[])]);$o=s,Eo=i,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Nd()}catch(n){console.error("Failed to load sprint:",n),g("Failed to load sprint","error"),window.navigateTo("sprints")}}async function Pd(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){g("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await ri(e,!1)}catch{window.navigateTo("sprints",!1)}}function Nd(){const e=ko,t=$o;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(d=>s.includes(d.status)),a=t.filter(d=>d.status==="done"),o=t.reduce((d,m)=>d+(m.estimate||0),0),r=a.reduce((d,m)=>d+(m.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const l=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${ts(e.start_date)} → ${ts(e.end_date)}
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
                        ${i.map(d=>To(d)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${a.map(d=>To(d)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Hd()}
            </div>
        </div>
    `}function To(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" onclick="viewIssue('${E(e.id)}')">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${W(e.identifier)}</span>
            <span class="sprint-issue-title">${W(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${Xd(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Hd(){const e=Eo;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Od(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Od(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function qd(e,t,n,s){const i=s?Ka(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateBudget(event, '${E(e)}', '${E(s)}')">
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
    `,A()}async function Fd(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await $.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const c=At.filter(l=>l.status==="planned"&&l.id!==t);for(const l of c)await $.updateSprint(l.id,{budget:i})}a==="default"&&n&&await $.updateProject(n,{default_sprint_budget:i}),await Qe(),R(),g(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){g(r.message,"error")}return!1}async function Ud(e){const t=At.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,A();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[c,l]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getRituals(t.project_id)]);s=c.filter(d=>n.includes(d.status)).length,i=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${W(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${E(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function zd(e){try{const t=await $.closeSprint(e);await Qe(),t.limbo?Wd(t):g("Sprint completed!","success")}catch(t){g(t.message,"error")}}async function es(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{Ue=await $.getLimboStatus(e),Gd()}catch(n){console.error("Failed to load limbo status:",n)}}function Gd(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Ue||!Ue.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Ue.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Wd(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,A(),Kd(t)}async function Kd(e){try{const t=await $.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${W(s.name)} <span class="ritual-mode">(${W(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(s.prompt):W(s.prompt)}</div>
                    ${ci(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function li(){var t,n,s;if(!Ue)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Ue.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${W(i.name)}</strong>
                            <span class="badge badge-ritual-${Yd(i.approval_mode)}">${W(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(i.prompt):W(i.prompt)}</div>
                        ${ci(i.attestation)}
                        ${Vd(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((s=Ue.completed_rituals)==null?void 0:s.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Ue.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${W(i.name)}</div>
                            ${ci(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,A()}function ci(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${W(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${W(Mn(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${window.renderMarkdown?window.renderMarkdown(e.note):W(e.note)}</div>
        </div>
    `}function Vd(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" onclick="approveRitual('${E(e.id)}', '${E(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${E(e.id)}', '${E(t)}', '${E(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function xo(e){for(const t of e)if(!Qn.has(t))try{(await $.getSprints(t)).forEach(s=>{Xn[s.id]=s}),Qn.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Jd(){Xn={},Qn=new Set}function Zd(e,t){t.forEach(n=>{Xn[n.id]=n}),Qn.add(e)}function W(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Yd(e){return e?W(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;"):""}function ts(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Xd(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}const _o=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let et=[],di=null,Y={api:null,showToast:()=>{},getProjects:()=>[],getProjectFromUrl:()=>null,setGlobalProjectSelection:()=>{},updateUrlWithProject:()=>{},escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,formatPriority:e=>e};function Qd(e){Y={...Y,...e}}function ui(){const e=document.getElementById("board-project-filter");if(!e)return;const t=Y.getProjects();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${Y.escapeHtml(n.name)}</option>`).join(""),!e.value){const n=Y.getProjectFromUrl();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)pi(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function eu(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(Y.setGlobalProjectSelection(e),Y.updateUrlWithProject(e)),pi(e)}async function pi(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){ui();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{et=await Y.api.getIssues({project_id:t}),tt()}catch(i){Y.showToast(i.message,"error")}}function tt(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=_o.map(t=>{const n=et.filter(s=>s.status===t.key);return`
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
                        <div class="kanban-card" draggable="true" data-id="${Y.escapeAttr(s.id)}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             ondragover="handleCardDragOver(event)" ondragleave="handleCardDragLeave(event)" ondrop="handleCardDrop(event)"
                             onclick="viewIssue('${Y.escapeJsString(s.id)}')">
                            <div class="kanban-card-title">${Y.escapeHtml(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${Y.formatPriority(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function tu(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),di=e.target.dataset.id,e.target.classList.add("dragging")}function nu(e){e.target.classList.remove("dragging"),di=null}function su(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function iu(e){e.currentTarget.classList.remove("drag-over")}function au(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function ou(e){e.currentTarget.classList.remove("drag-over")}async function ru(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=et.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,So(n,t),tt(),i!==n)try{await Y.api.updateIssue(t,{status:n}),Y.showToast("Status updated","success")}catch(a){s.status=i,tt(),Y.showToast(a.message,"error")}}async function lu(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=di||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=et.find(r=>r.id===t);if(!a)return;const o=a.status;if(a.status=i,So(i,t,n),tt(),o!==i)try{await Y.api.updateIssue(t,{status:i}),Y.showToast("Status updated","success")}catch(r){a.status=o,tt(),Y.showToast(r.message,"error")}}function So(e,t,n=null){const s=et.filter(o=>o.status===e&&o.id!==t),i=et.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];_o.forEach(o=>{o.key===e?a.push(...s):a.push(...et.filter(r=>r.status===o.key))}),et=a}const Co=["backlog","todo","in_progress","in_review","done","canceled"],Lo=["urgent","high","medium","low","no_priority"],Ao=["task","bug","feature","chore","docs","tech_debt","epic"];let C={getIssues:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatEstimate:()=>"",getSprintCache:()=>({}),formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",escapeHtml:e=>e||"",escapeAttr:e=>e||"",escapeJsString:e=>e||"",sanitizeColor:e=>e||"#888",renderAvatar:()=>"",getAssigneeOptionList:()=>[],getGroupByValue:()=>""};function cu(e){C={...C,...e}}function ze(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=C.getIssues();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=C.getGroupByValue();n==="status"?du(e,t):n==="priority"?uu(e,t):n==="type"?pu(e,t):n==="assignee"?mu(e,t):n==="sprint"?gu(e,t):e.innerHTML=t.map(s=>Ce(s)).join("")}function du(e,t){const n={};Co.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s="";Co.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${st(i)}</span>
                    <span class="group-title">${C.formatStatus(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ce(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function uu(e,t){const n={};Lo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s="";Lo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${nt(i)}</span>
                    <span class="group-title">${C.formatPriority(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ce(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function pu(e,t){const n={};Ao.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s="";Ao.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
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
                    ${a.map(o=>Ce(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function mu(e,t){const n={},s="__unassigned__";n[s]=[];const i=C.getAssigneeOptionList();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a="";n[s].length>0&&(a+=`
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
                    ${n[s].map(o=>Ce(o)).join("")}
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
                    ${r.map(d=>Ce(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function gu(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=C.getSprintCache();i.sort((c,l)=>{const d=o[c],m=o[l],p=d?a[d.status]??3:3,f=m?a[m.status]??3:3;return p-f});let r="";i.forEach(c=>{const l=s[c];if(l.length===0)return;const d=o[c],m=d?d.name:c,p=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",f=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${f}">
                <div class="issue-group-header" onclick="toggleGroup('${f}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${C.escapeHtml(m)}${p}</span>
                    <span class="group-count">${l.length}</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(v=>Ce(v)).join("")}
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
                    ${s[n].map(c=>Ce(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function fu(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Ce(e){const t=e.assignee_id?C.getAssigneeById(e.assignee_id):null,n=t?C.formatAssigneeName(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?C.formatEstimate(e.estimate,e.project_id):"",a=e.sprint_id?C.getSprintCache()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${C.escapeAttr(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${C.escapeAttr(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${C.escapeJsString(e.id)}')" title="Priority: ${C.formatPriority(e.priority)}">
                    ${nt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${C.escapeJsString(e.id)}')" title="Status: ${C.formatStatus(e.status)}">
                    ${st(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${C.formatIssueType(e.issue_type)}</span>
                <span class="issue-title" onclick="viewIssue('${C.escapeJsString(e.id)}')">${C.escapeHtml(e.title)}</span>
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
    `}function nt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function st(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}function hu(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Bo)},0))}function Bo(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Bo))}function dt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function ut(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function pt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function mi(){const e=dt(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Ze(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Ge(),fe(),he()}function gi(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),mi()}function fi(){const e=ut(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=je(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Ge(),fe(),he()}function hi(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),fi()}function vi(){var s,i;const e=pt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Ge(),fe(),he()}function bi(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),vi()}function Do(){var s,i;const e=pt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function vu(){const e=document.getElementById("label-filter-dropdown");if(!e||!window.currentTeam)return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(window.currentTeam.id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${ge(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${h(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Mo(){var m,p,f,v,I;const e=new URLSearchParams,t=dt(),n=ut(),s=pt(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(p=document.getElementById("project-filter"))==null?void 0:p.value,o=(f=document.getElementById("sprint-filter"))==null?void 0:f.value,r=(v=document.getElementById("issue-type-filter"))==null?void 0:v.value,c=(I=document.getElementById("group-by-select"))==null?void 0:I.value;t.forEach(_=>e.append("status",_)),n.forEach(_=>e.append("priority",_)),s.forEach(_=>e.append("label",_)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),c&&e.set("groupBy",c);const l=e.toString(),d=l?`/issues?${l}`:"/issues";history.replaceState({view:"issues"},"",d)}function bu(){const e=new URLSearchParams(window.location.search),t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=t.includes(m.value)}),yu())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=n.includes(m.value)}),wu())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const o=e.get("issue_type");if(o){const l=document.getElementById("issue-type-filter");l&&(l.value=o)}const r=e.getAll("label");if(r.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=r.includes(m.value)}),Do())}const c=e.get("groupBy");if(c){const l=document.getElementById("group-by-select");l&&(l.value=c)}}function yu(){const e=dt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Ze(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function wu(){const e=ut(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=je(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const jo=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function ku(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Bt)):(t.classList.remove("hidden"),ke(),$e(bo()),setTimeout(()=>{document.addEventListener("click",Bt)},0))}function $u(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Bt)):(t.classList.remove("hidden"),qu(),setTimeout(()=>{document.addEventListener("click",Bt)},0))}function Bt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Bt))}function Ro(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Bt)}function Po(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return dt().length;case"priority":return ut().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return pt().length;default:return 0}}function Eu(){let e=0;return jo.forEach(t=>{e+=Po(t.key)}),e}function ke(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=jo.map(t=>{const n=Po(t.key);return`
            <div class="filter-menu-category ${bo()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function $e(e){Td(e),ke();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":Iu(t);break;case"status":Tu(t);break;case"priority":xu(t);break;case"type":_u(t);break;case"assignee":Su(t);break;case"sprint":Cu(t);break;case"labels":Lu(t);break}}function Iu(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=se()||[];let i=`
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
                <input type="radio" name="project-filter-radio" value="${S(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ge(a.color)};"></span>
                <span class="filter-option-label">${h(a.name)}</span>
            </label>
        `}),e.innerHTML=i}function Tu(e){const t=dt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function xu(e){const t=ut(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function _u(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setTypeFilter('${a.value}')">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Su(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Et()||[];let i=`
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
                <input type="radio" name="assignee-filter-radio" value="${S(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${h(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Cu(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${E(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${S(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${h(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function Lu(e){const t=pt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${S(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${E(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ge(d)};"></span>
                    <span class="filter-option-label">${h(l)}</span>
                </label>
            `}),e.innerHTML=i}function No(e){const t=document.getElementById("project-filter");t&&(t.value=e,Uo()),ke(),$e("project"),fe(),he()}function Au(){No("")}function Bu(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,mi()),ke(),$e("status")}function Du(){gi(),ke(),$e("status"),fe(),he()}function Mu(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,fi()),ke(),$e("priority")}function ju(){hi(),ke(),$e("priority"),fe(),he()}function Ho(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ge()),ke(),$e("type"),fe(),he()}function Ru(){Ho("")}function Oo(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ge()),ke(),$e("assignee"),fe(),he()}function Pu(){Oo("")}function qo(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ge()),ke(),$e("sprint"),fe(),he()}function Nu(){qo("")}function Hu(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,vi()),ke(),$e("labels")}function Ou(){bi(),ke(),$e("labels"),fe(),he()}function qu(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Fu(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,mt()),Ro()}function Uu(e){const t=document.getElementById("group-by-select");t&&(t.value=e,zo()),Ro()}function fe(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const m=(se()||[]).find(p=>p.id===n.value);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=dt();if(s.length>0){const d=s.map(m=>Ze(m)).join(", ");t.push({category:"status",label:"Status",value:d,clearFn:"clearStatusFilterNew()"})}const i=ut();if(i.length>0){const d=i.map(m=>je(m)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:a.value,clearFn:"clearTypeFilter()"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;if(o.value==="me")d="Me";else if(o.value==="unassigned")d="Unassigned";else{const p=(Et()||[]).find(f=>f.user_id===o.value);d=(p==null?void 0:p.name)||(p==null?void 0:p.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:d,clearFn:"clearAssigneeFilter()"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const d=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||r.value,clearFn:"clearSprintFilter()"})}const c=pt();if(c.length>0){const d=document.getElementById("label-filter-dropdown"),m=c.map(p=>{var I;const f=d==null?void 0:d.querySelector(`input[value="${p}"]`),v=(I=f==null?void 0:f.closest("label"))==null?void 0:I.querySelector(".label-name");return(v==null?void 0:v.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(d=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${h(d.value)}</span>
            <button class="filter-chip-remove" onclick="${d.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=l}function zu(){const e=document.getElementById("project-filter");e&&(e.value=""),gi(),hi();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),bi(),Ge(),fe(),he()}function he(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Eu();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function Gu(){fe(),he();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function Fo(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||yi(null),t)try{const a=await api.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${h(o.name)})</option>`),yi(o||null),a.forEach(r=>{const c=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${h(r.name)}${c}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function yi(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${h(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${h(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function mt(){var m,p,f,v,I,_,B;if(yo(-1),!window.currentTeam)return;const e=document.getElementById("project-filter").value,t=dt(),n=ut(),s=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,i=(f=(p=document.getElementById("issue-search"))==null?void 0:p.value)==null?void 0:f.trim();if(!e&&se().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}Ku();const a={limit:1e3},o=((v=document.getElementById("sort-by-select"))==null?void 0:v.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(I=ai())==null?void 0:I.id:a.assignee_id=s);const l=(_=document.getElementById("sprint-filter"))==null?void 0:_.value;if(l)if(l==="current"){if(e)try{const N=(await api.getSprints(e)).find(D=>D.status==="active");N&&(a.sprint_id=N.id)}catch(M){console.error("Failed to resolve current sprint:",M)}}else a.sprint_id=l;const d=(B=document.getElementById("issue-type-filter"))==null?void 0:B.value;d&&(a.issue_type=d),i&&i.length>=2&&(a.search=i);try{let M;e?(a.project_id=e,M=await api.getIssues(a)):se().length>0&&(M=await api.getTeamIssues(window.currentTeam.id,a));const N=pt();N.length>0&&(M=M.filter(q=>!q.labels||q.labels.length===0?!1:q.labels.some(y=>N.includes(y.id)))),Fe(M);const D=[...new Set(M.map(q=>q.project_id))];await xo(D),ze()}catch(M){g(M.message,"error")}}function Wu(){clearTimeout(Cd()),Ld(setTimeout(()=>{mt()},300))}function Ku(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Ge(){Mo(),mt()}async function Uo(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&an(e),await Fo(),ui(),Io(),Ge()}async function zo(){if(Mo(),Go()==="sprint"){const e=qe(),t=[...new Set(e.map(n=>n.project_id))];await xo(t)}ze()}function Go(){const e=document.getElementById("group-by-select");return e?e.value:""}const wi={};let ki=null,$i=null,Ei=null,Ii=null,Ti=null,Wo=!1;function Vu(e){Object.assign(wi,e)}function Ju({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i}={}){e&&(ki=e),t&&($i=t),n&&(Ei=n),s&&(Ii=s),i&&(Ti=i)}function Zu(){return Object.keys(wi)}function z(e,t=!0){if(Id(e),t){let i;const a=Lt(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),ki&&ki(),document.querySelectorAll(".view").forEach(i=>i.classList.add("hidden"));const n=document.getElementById(`${e}-view`);n&&n.classList.remove("hidden");const s=wi[e];s&&s()}function Ko(){var s;const t=window.location.pathname.split("/").filter(Boolean);Ii&&Ii();let n="my-issues";if(t.length===0||t[0]==="")z("my-issues",!1);else{if($i&&$i(t))return;n=t[0],Zu().includes(n)?z(n,!1):(n="my-issues",z("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function ns(e){history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Ti&&Ti(e)}function Yu(){Wo||(Wo=!0,window.addEventListener("popstate",e=>{var t;e.state&&Ei&&Ei(e.state)||((t=e.state)!=null&&t.view?z(e.state.view,!1):Ko())}))}async function Xu(){const e=document.getElementById("epics-list");if(e){e.innerHTML='<div class="loading">Loading epics...</div>';try{const t=await $.getIssues({issue_type:"epic"});if(!t||t.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Create one from the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const n=await Promise.all(t.map(async s=>{let i=[];try{i=await $.getSubIssues(s.id)}catch{}return{...s,subIssues:i}}));Qu(n,e)}catch(t){e.innerHTML=`<div class="empty-state">Failed to load epics: ${h(t.message||String(t))}</div>`}}}function Qu(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(m=>m.status==="done"||m.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,l=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase()),d=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${S(s.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${h(s.identifier)}</td>
                <td class="epic-title">${h(s.title)}</td>
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
    `,t.addEventListener("click",s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&ns(i.dataset.identifier)})}function ep(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}let it=!0,ss=null,w={api:null,getCurrentView:()=>"my-issues",showToast:()=>{},showModal:()=>{},closeModal:()=>{},navigateTo:()=>{},getProjects:()=>[],getMembers:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",renderMarkdown:e=>e,renderAvatar:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",showDetailDropdown:()=>{},setupMentionAutocomplete:()=>{},renderTicketRitualActions:()=>""};function tp(e){w={...w,...e}}function Vo(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Jo(e){return e.user_name||e.user_email||"Unknown"}function Zo(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":return"Added a comment";case"status_changed":return`Changed status from <strong>${w.formatStatus(t(e.old_value))}</strong> to <strong>${w.formatStatus(t(e.new_value))}</strong>`;case"priority_changed":return`Changed priority from <strong>${w.formatPriority(t(e.old_value))}</strong> to <strong>${w.formatPriority(t(e.new_value))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${e.sprint_name}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${e.sprint_name}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":return e.field_name?`Attested to <strong>${e.field_name}</strong>`:"Attested to ritual";case"updated":return e.field_name?`Updated ${n[e.field_name]||e.field_name}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||e.field_name}`:"Updated issue"}}function Yo(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function np(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const m=d[1],p=document.createElement("a");p.href=`#/issue/${m}`,p.className="issue-link",p.textContent=m,o.appendChild(p),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const m=document.createElement("span");m.className="mention",m.textContent="@"+d[3],o.appendChild(m),r=d.index+d[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function sp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function ip(e){if(!e)return"";const t=w.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Yo(n,np),n.innerHTML}function Xo(e){if(!e)return"";const t=w.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Yo(n,sp),n.innerHTML}function Qo(e,t){const n=e.target;n.tagName==="A"||n.closest("a")||window.editDescription&&window.editDescription(t)}function er(){it=!it;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",it),n&&n.classList.toggle("rotated",!it)}async function gn(e){try{ss=await w.api.getTicketRitualsStatus(e),ap(e)}catch(t){console.error("Failed to load ticket rituals:",t),ss=null}}function ap(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!ss){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=ss;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(it=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",it);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",!it);const r=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">○</span>
                            <span class="ticket-ritual-name">${w.escapeHtml(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?w.renderMarkdown(d.prompt):""}</div>
                        <div class="ticket-ritual-actions">
                            ${w.renderTicketRitualActions(d,e)}
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
                            <span class="ticket-ritual-name">${w.escapeHtml(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${w.escapeHtml(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${w.formatTimeAgo(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function is(e){try{let t;e.includes("-")?t=await w.api.getIssueByIdentifier(e):t=await w.api.getIssue(e),t?await ee(t.id,!1):w.navigateTo("my-issues",!1)}catch{w.navigateTo("my-issues",!1)}}async function ee(e,t=!0){try{it=!0;const[n,s,i,a,o,r]=await Promise.all([w.api.getIssue(e),w.api.getComments(e),w.api.getActivities(e),w.api.getSubIssues(e),w.api.getRelations(e),w.api.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),c=(r.completed_rituals||[]).filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name})),l=[...s,...c].sort((y,K)=>new Date(y.created_at)-new Date(K.created_at)),d=[n.parent_id?w.api.getIssue(n.parent_id):Promise.resolve(null),w.api.getSprints(n.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[m,p]=await Promise.all(d),f=o.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),v=o.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),I=o.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:w.getCurrentView()},"",`/issue/${n.identifier}`),window.currentDetailIssue=n,window.currentDetailSprints=p,document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const _=document.getElementById("issue-detail-view");_.classList.remove("hidden");const B=w.getCurrentView()||"my-issues",M=w.getProjects().find(y=>y.id===n.project_id),N=n.assignee_id?w.getAssigneeById(n.assignee_id):null,D=N?w.formatAssigneeName(N):null,q=n.sprint_id?p.find(y=>y.id===n.sprint_id):null;_.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${B}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${M?w.escapeHtml(M.name):"Project"} › ${w.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${w.escapeHtml(n.title)}</h1>

                    ${m?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="#" onclick="viewIssue('${w.escapeJsString(m.id)}'); return false;">${m.identifier}: ${w.escapeHtml(m.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body ${n.description?"":"empty"}" onclick="handleDescriptionClick(event, '${w.escapeJsString(n.id)}')">
                            ${n.description?Xo(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showCreateSubIssueModal('${w.escapeJsString(n.id)}', '${w.escapeJsString(n.project_id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(y=>`
                                <div class="sub-issue-item" onclick="viewIssue('${w.escapeJsString(y.id)}')">
                                    <span class="sub-issue-status">${w.getStatusIcon(y.status)}</span>
                                    <span class="sub-issue-id">${y.identifier}</span>
                                    <span class="sub-issue-title">${w.escapeHtml(y.title)}</span>
                                    ${y.estimate?`<span class="sub-issue-estimate">${y.estimate}pts</span>`:""}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showAddRelationModal('${w.escapeJsString(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${f.length===0&&v.length===0&&I.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${v.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${v.map(y=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${w.getStatusIcon(y.related_issue_status)}</span>
                                            <a href="#" onclick="viewIssue('${w.escapeJsString(y.related_issue_id)}'); return false;" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${w.escapeHtml(y.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${w.escapeJsString(n.id)}', '${w.escapeJsString(y.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${f.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${f.map(y=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${w.getStatusIcon(y.related_issue_status)}</span>
                                            <a href="#" onclick="viewIssue('${w.escapeJsString(y.related_issue_id)}'); return false;" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${w.escapeHtml(y.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${w.escapeJsString(n.id)}', '${w.escapeJsString(y.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${I.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${I.map(y=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${w.getStatusIcon(y.related_issue_status)}</span>
                                            <a href="#" onclick="viewIssue('${w.escapeJsString(y.related_issue_id)}'); return false;" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${w.escapeHtml(y.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${w.escapeJsString(n.id)}', '${w.escapeJsString(y.id)}'); event.stopPropagation();" title="Remove relation">
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
                            `:i.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Vo(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Zo(y)}</span>
                                        <span class="activity-actor">by ${w.escapeHtml(Jo(y))}</span>
                                        <span class="activity-time">${w.formatTimeAgo(y.created_at)}</span>
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
                            `:l.map(y=>`
                                <div class="comment ${y.is_attestation?"comment-attestation":""}">
                                    <div class="comment-avatar ${y.is_attestation?"avatar-attestation":""}">${y.is_attestation?"✓":(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${w.escapeHtml(y.author_name||"User")}</span>
                                            ${y.is_attestation?`<span class="comment-ritual-badge">Ritual: ${w.escapeHtml(y.ritual_name)}</span>`:""}
                                            <span class="comment-date">${w.formatTimeAgo(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${ip(y.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                        <form class="comment-form" onsubmit="return handleAddComment(event, '${w.escapeJsString(n.id)}')">
                            <textarea id="new-comment" placeholder="Write a comment..." rows="3"></textarea>
                            <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                            <button type="submit" class="btn btn-primary">Comment</button>
                        </form>
                    </div>
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" onclick="showDetailDropdown(event, 'status', '${w.escapeJsString(n.id)}')">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${w.getStatusIcon(n.status)}
                                <span>${w.formatStatus(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'priority', '${w.escapeJsString(n.id)}')">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${w.getPriorityIcon(n.priority)}
                                <span>${w.formatPriority(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'type', '${w.escapeJsString(n.id)}')">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${w.formatIssueType(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'assignee', '${w.escapeJsString(n.id)}')">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${D?`${w.renderAvatar(N,"avatar-small")}<span>${w.escapeHtml(D)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'sprint', '${w.escapeJsString(n.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${q?w.escapeHtml(q.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'labels', '${w.escapeJsString(n.id)}')">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(y=>`
                                        <span class="issue-label" style="background: ${w.sanitizeColor(y.color)}20; color: ${w.sanitizeColor(y.color)}">${w.escapeHtml(y.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${M?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${w.escapeHtml(M.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" onclick="showDetailDropdown(event, 'estimate', '${w.escapeJsString(n.id)}')">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${w.formatEstimate(n.estimate,n.project_id)}</span>
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
                            <span class="property-value-static">${w.escapeHtml(n.creator_name||"Unknown")}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <button class="btn btn-secondary btn-block" onclick="showEditIssueModal('${w.escapeJsString(n.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            Edit Issue
                        </button>
                        <button class="btn btn-danger-outline btn-block" onclick="deleteIssue('${w.escapeJsString(n.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            Delete
                        </button>
                    </div>
                </aside>
            </div>
        `,gn(n.id),w.setupMentionAutocomplete()}catch(n){w.showToast(n.message,"error")}}async function op(){const e=document.getElementById("ritual-project-filter");e&&(await be(),e.innerHTML='<option value="">Select Project</option>'+se().map(t=>`<option value="${S(t.id)}">${h(t.name)}</option>`).join(""))}async function tr(){const e=document.getElementById("rituals-project-filter");if(!e)return;window._onRitualsChanged=rp,await be(),e.innerHTML='<option value="">Select a project</option>'+se().map(n=>`<option value="${S(n.id)}">${h(n.name)}</option>`).join("");const t=Lt()||zn();t&&se().some(n=>n.id===t)?(e.value=t,nr()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function nr(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}Xa(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await It()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${h(n.message)}</div>`}}function rp(){const e=document.getElementById("rituals-content"),t=Qa(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");e.innerHTML=`
        <div class="rituals-view-sections">
            <section class="settings-section">
                <div class="settings-section-header">
                    <div>
                        <h3>Sprint Rituals</h3>
                        <p class="settings-description">Required when closing a sprint</p>
                    </div>
                    <button class="btn btn-primary" onclick="showCreateProjectRitualModal('every_sprint')">+ Create Ritual</button>
                </div>
                <div id="rv-sprint-rituals-list" class="rituals-list"></div>
            </section>
            <section class="settings-section">
                <div class="settings-section-header">
                    <div>
                        <h3>Ticket Close Rituals</h3>
                        <p class="settings-description">Required when closing a ticket</p>
                    </div>
                    <button class="btn btn-primary" onclick="showCreateProjectRitualModal('ticket_close')">+ Create Ritual</button>
                </div>
                <div id="rv-close-rituals-list" class="rituals-list"></div>
            </section>
            <section class="settings-section">
                <div class="settings-section-header">
                    <div>
                        <h3>Ticket Claim Rituals</h3>
                        <p class="settings-description">Required when claiming a ticket (moving to in_progress)</p>
                    </div>
                    <button class="btn btn-primary" onclick="showCreateProjectRitualModal('ticket_claim')">+ Create Ritual</button>
                </div>
                <div id="rv-claim-rituals-list" class="rituals-list"></div>
            </section>
        </div>
    `,Tt("rv-sprint-rituals-list",n,"sprint"),Tt("rv-close-rituals-list",s,"close"),Tt("rv-claim-rituals-list",i,"claim")}async function lp(e,t){try{await $.approveAttestation(e,t),g("Ritual approved!","success"),await es(),li()}catch(n){g(n.message,"error")}}async function cp(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{dp(s,e,t)}),A()}async function dp(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await $.completeGateRitual(t,n,s||null),g("Ritual completed!","success"),await es();const i=Dd();i&&!i.in_limbo?(R(),g("Limbo cleared! Next sprint is now active.","success")):li()}catch(i){g(i.message,"error")}return!1}function up(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${S(e.id)}" data-issue-id="${S(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${S(e.id)}" data-issue-id="${S(t)}" data-ritual-name="${S(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${S(e.id)}" data-issue-id="${S(t)}" data-ritual-name="${S(e.name)}" data-ritual-prompt="${S(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${S(e.id)}" data-issue-id="${S(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function pp(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${h(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{mp(i,e,t)}),A()}async function mp(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return g("A note is required for this attestation.","error"),!1;try{await $.attestTicketRitual(t,n,s),g("Ritual attested!","success"),R(),await gn(n)}catch(i){g(i.message,"error")}return!1}async function gp(e,t){try{await $.attestTicketRitual(e,t),g("Ritual attested!","success"),await gn(t)}catch(n){g(n.message,"error")}}async function fp(e,t){try{await $.approveTicketRitual(e,t),g("Ritual approved!","success"),await gn(t)}catch(n){g(n.message,"error")}}function hp(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{vp(s,e,t)}),A()}async function vp(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await $.completeTicketGateRitual(t,n,s||null),g("Ritual completed!","success"),R(),await gn(n)}catch(i){g(i.message,"error")}return!1}const sr=["backlog","todo","in_progress","in_review","done","canceled"],ir=["no_priority","urgent","high","medium","low"],bp=["task","bug","feature","chore","docs","tech_debt","epic"];let at=[],ar=Promise.resolve(),b={api:null,getIssues:()=>[],setIssues:()=>{},getMyIssues:()=>[],setMyIssues:()=>{},getCurrentDetailIssue:()=>null,setCurrentDetailIssue:()=>{},getLabels:()=>[],setLabels:()=>{},getCurrentTeam:()=>null,getCurrentDetailSprints:()=>[],closeAllDropdowns:()=>{},registerDropdownClickOutside:()=>{},setDropdownKeyHandler:()=>{},showToast:()=>{},getStatusIcon:()=>"",getPriorityIcon:()=>"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatAssigneeOptionLabel:e=>(e==null?void 0:e.name)||"",getAssigneeOptionList:()=>[],getAssigneeById:()=>null,getEstimateOptions:()=>[],renderAvatar:()=>"",renderIssueRow:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",updateSprintCacheForProject:()=>{},updateSprintBudgetBar:()=>{}};function yp(e){b={...b,...e}}async function or(e,t,n){var d,m;e.preventDefault(),b.closeAllDropdowns();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${sr.map((p,f)=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${b.escapeJsString(n)}', 'status', '${p}')">
                    ${b.getStatusIcon(p)}
                    <span>${b.formatStatus(p)}</span>
                    <span class="dropdown-shortcut">${f+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${ir.map((p,f)=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${b.escapeJsString(n)}', 'priority', '${p}')">
                    ${b.getPriorityIcon(p)}
                    <span>${b.formatPriority(p)}</span>
                    <span class="dropdown-shortcut">${f}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${bp.map(p=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${b.escapeJsString(n)}', 'issue_type', '${p}')">
                    <span class="issue-type-badge type-${p}">${b.formatIssueType(p)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const p=b.getAssigneeOptionList();a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" onclick="updateIssueField('${b.escapeJsString(n)}', 'assignee_id', null)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${p.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:p.map(({assignee:f,indent:v},I)=>`
                <button class="dropdown-option" onclick="updateIssueField('${b.escapeJsString(n)}', 'assignee_id', '${b.escapeJsString(f.id)}')">
                    ${b.renderAvatar(f,"avatar-small")}
                    <span>${b.formatAssigneeOptionLabel(f,v)}</span>
                    ${I<9?`<span class="dropdown-shortcut">${I+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const p=document.querySelector(`.issue-row[data-issue-id="${n}"]`),f=(p==null?void 0:p.dataset.projectId)||((d=b.getCurrentDetailIssue())==null?void 0:d.project_id),v=b.getEstimateOptions(f);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${v.map((I,_)=>`
                <button class="dropdown-option" onclick="updateIssueField('${b.escapeJsString(n)}', 'estimate', ${I.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${I.label}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const p=b.getIssues(),f=b.getMyIssues(),v=b.getCurrentDetailIssue(),I=p.find(ae=>ae.id===n)||f.find(ae=>ae.id===n)||v,_=new Set(((I==null?void 0:I.labels)||[]).map(ae=>ae.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const B=a.getBoundingClientRect();let M=i.bottom+4,N=i.left;N+B.width>window.innerWidth-8&&(N=i.right-B.width),M+B.height>window.innerHeight-8&&(M=i.top-B.height-4),a.style.top=`${M}px`,a.style.left=`${Math.max(8,N)}px`,b.registerDropdownClickOutside(a,{multiSelect:!0});let D=[];const q=b.getCurrentTeam();if(q)try{D=await b.api.getLabels(q.id)}catch(ae){console.error("Failed to load labels:",ae)}if(!a.parentNode)return;cr(a,n,D,_);const y=a.getBoundingClientRect();let K=i.bottom+4,Ie=i.left;Ie+y.width>window.innerWidth-8&&(Ie=i.right-y.width),K+y.height>window.innerHeight-8&&(K=i.top-y.height-4),a.style.top=`${K}px`,a.style.left=`${Math.max(8,Ie)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const p=b.getIssues(),f=b.getMyIssues(),v=b.getCurrentDetailIssue(),I=p.find(oe=>oe.id===n)||f.find(oe=>oe.id===n)||v,_=(I==null?void 0:I.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const B=a.getBoundingClientRect();let M=i.bottom+4,N=i.left;N+B.width>window.innerWidth-8&&(N=i.right-B.width),M+B.height>window.innerHeight-8&&(M=i.top-B.height-4),a.style.top=`${M}px`,a.style.left=`${Math.max(8,N)}px`,b.registerDropdownClickOutside(a);let D=[];if(_)try{D=await b.api.getSprints(_),b.updateSprintCacheForProject(_,D)}catch(oe){console.error("Failed to load sprints:",oe)}if(!a.parentNode)return;const q=D.filter(oe=>oe.status!=="completed"||oe.id===(I==null?void 0:I.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${b.escapeJsString(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${q.map((oe,V)=>`
                <button class="dropdown-option" onclick="updateIssueField('${b.escapeJsString(n)}', 'sprint_id', '${b.escapeJsString(oe.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${b.escapeHtml(oe.name)}${oe.status==="active"?" (Active)":""}</span>
                    ${V<9?`<span class="dropdown-shortcut">${V+1}</span>`:""}
                </button>
            `).join("")}
        `;const y=a.getBoundingClientRect();let K=i.bottom+4,Ie=i.left;Ie+y.width>window.innerWidth-8&&(Ie=i.right-y.width),K+y.height>window.innerHeight-8&&(K=i.top-y.height-4),a.style.top=`${K}px`,a.style.left=`${Math.max(8,Ie)}px`,a.classList.remove("dropdown-positioning");const ae=oe=>{const V=oe.key;if(V==="Escape"){b.closeAllDropdowns(),document.removeEventListener("keydown",ae),b.setDropdownKeyHandler(null);return}const We=parseInt(V);if(isNaN(We))return;const Mt=a.querySelectorAll(".dropdown-option");let gt=!1;We===0?(fn(n,"sprint_id",null),gt=!0):We>=1&&We<Mt.length&&(Mt[We].click(),gt=!0),gt&&(document.removeEventListener("keydown",ae),b.setDropdownKeyHandler(null))};b.setDropdownKeyHandler(ae),document.addEventListener("keydown",ae);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const o=a.getBoundingClientRect();let r=i.bottom+4,c=i.left;c+o.width>window.innerWidth-8&&(c=i.right-o.width),r+o.height>window.innerHeight-8&&(r=i.top-o.height-4),a.style.top=`${r}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const l=p=>{const f=p.key;if(f==="Escape"){b.closeAllDropdowns(),document.removeEventListener("keydown",l);return}const v=parseInt(f);if(isNaN(v))return;let I=!1;if(t==="status"&&v>=1&&v<=6)fn(n,"status",sr[v-1]),I=!0;else if(t==="priority"&&v>=0&&v<=4)fn(n,"priority",ir[v]),I=!0;else if(t==="estimate"){const _=b.getCurrentDetailIssue(),B=b.getEstimateOptions(_==null?void 0:_.project_id);v>=0&&v<B.length&&(fn(n,"estimate",B[v].value),I=!0)}I&&(document.removeEventListener("keydown",l),b.setDropdownKeyHandler(null))};b.setDropdownKeyHandler(l),document.addEventListener("keydown",l),b.registerDropdownClickOutside(a)}function rr(e,t,n){e.stopPropagation(),or(e,t,n)}function wp(e,t,n){ar=ar.then(()=>lr(e,t,n))}async function lr(e,t,n){const s=b.getIssues(),i=b.getMyIssues(),a=b.getCurrentDetailIssue(),o=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),c=r.indexOf(t);let l;if(c>=0?l=r.filter(d=>d!==t):l=[...r,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const m=(await b.api.updateIssue(e,{label_ids:l})).labels||[],p=s.findIndex(_=>_.id===e);p!==-1&&(s[p].labels=m,b.setIssues([...s]));const f=i.findIndex(_=>_.id===e);f!==-1&&(i[f].labels=m,b.setMyIssues([...i])),(a==null?void 0:a.id)===e&&b.setCurrentDetailIssue({...a,labels:m});const v=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(v&&v.parentNode){const _=s.find(B=>B.id===e)||i.find(B=>B.id===e);_&&(v.outerHTML=b.renderIssueRow(_))}const I=document.querySelector(".property-labels-btn");I&&(I.innerHTML=m.length>0?m.map(_=>`
                    <span class="issue-label" style="background: ${b.sanitizeColor(_.color)}20; color: ${b.sanitizeColor(_.color)}">${b.escapeHtml(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(b.showToast("Failed to update labels","error"),n){const d=c>=0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}}}function cr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleLabelCreateKey(event, '${b.escapeJsString(t)}')">
            <button class="btn btn-small" onclick="createLabelFromDropdown('${b.escapeJsString(t)}')">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-label-id="${i.id}" onclick="event.stopPropagation(); toggleIssueLabel('${b.escapeJsString(t)}', '${b.escapeJsString(i.id)}', this)">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${b.sanitizeColor(i.color)}20; color: ${b.sanitizeColor(i.color)}">${b.escapeHtml(i.name)}</span>
                </button>
            `}).join("")}
    `}async function kp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=b.getCurrentTeam();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await b.api.createLabel(s.id,{name:i}),o=await b.api.getLabels(s.id);b.setLabels(o),a!=null&&a.id&&await lr(e,a.id,null);const r=b.getIssues(),c=b.getMyIssues(),l=b.getCurrentDetailIssue(),d=r.find(p=>p.id===e)||c.find(p=>p.id===e)||l,m=new Set(((d==null?void 0:d.labels)||[]).map(p=>p.id));t&&cr(t,e,o,m),n.value=""}catch(a){b.showToast(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function as(){const e=document.getElementById("create-issue-labels-label");e&&(at.length===0?e.textContent="Labels":e.textContent=`Labels (${at.length})`)}function xi(e){const t=b.getLabels();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=at.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${b.escapeJsString(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${b.sanitizeColor(n.color)}20; color: ${b.sanitizeColor(n.color)}">${b.escapeHtml(n.name)}</span>
                </button>
            `}).join("")}
    `}function $p(e){const t=at.indexOf(e);t>=0?at.splice(t,1):at.push(e),as();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&xi(n)}async function Ep(){const e=b.getCurrentTeam();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await b.api.createLabel(e.id,{name:s}),a=await b.api.getLabels(e.id);b.setLabels(a),i!=null&&i.id&&!at.includes(i.id)&&at.push(i.id),as(),t&&xi(t),n.value=""}catch(i){b.showToast(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function fn(e,t,n){var i;b.closeAllDropdowns();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await b.api.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=b.getIssues(),c=r.findIndex(p=>p.id===e);c!==-1&&(r[c]=o,b.setIssues([...r]));const l=b.getMyIssues(),d=l.findIndex(p=>p.id===e);d!==-1&&(l[d]=o,b.setMyIssues([...l]));const m=b.getCurrentDetailIssue();if((m==null?void 0:m.id)===e&&b.setCurrentDetailIssue(o),s&&s.parentNode){const p=r.find(f=>f.id===e)||l.find(f=>f.id===e)||o;if(p){s.outerHTML=b.renderIssueRow(p);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);f&&(f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500))}}if(b.showToast("Issue updated","success"),t==="status"){const p=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(p)try{const v=(await b.api.getSprints(p)).find(I=>I.status==="active");b.updateSprintBudgetBar(v||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&Ip(t,o)}}catch(a){b.showToast(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function Ip(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${b.getStatusIcon(t.status)}
            <span>${b.formatStatus(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${b.getPriorityIcon(t.priority)}
            <span>${b.formatPriority(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${b.formatIssueType(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?b.getAssigneeById(t.assignee_id):null,l=c?b.formatAssigneeName(c):null;r.innerHTML=l?`${b.renderAvatar(c,"avatar-small")}<span>${b.escapeHtml(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=b.getCurrentDetailSprints(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?b.escapeHtml(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${b.formatEstimate(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}const ot=new Map,dr=6e4,_i=100;let ie=null,Si=null,Ci=null,hn=null,ur=!1;const Tp={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},xp={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},pr={api:null};let Li={...pr};function _p(e={}){Li={...pr,...e},ie||(ie=document.createElement("div"),ie.className="issue-tooltip",ie.style.display="none",document.body.appendChild(ie),ie.addEventListener("mouseenter",()=>{clearTimeout(Si)}),ie.addEventListener("mouseleave",()=>{mr()})),ur||(document.addEventListener("mouseover",Sp),document.addEventListener("mouseout",Cp),ur=!0)}function Sp(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Lp(t);if(n){if(n===hn&&ie.style.display!=="none"){clearTimeout(Si);return}clearTimeout(Ci),Ci=setTimeout(()=>{Ap(t,n)},200)}}function Cp(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Ci),Si=setTimeout(()=>{mr()},150))}function Lp(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Ap(e,t){hn=t;const n=e.getBoundingClientRect();ie.style.left=`${n.left+window.scrollX}px`,ie.style.top=`${n.bottom+window.scrollY+8}px`,ie.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ie.style.display="block";try{const s=await Dp(t);if(hn!==t)return;Mp(s)}catch{if(hn!==t)return;ie.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function mr(){ie&&(ie.style.display="none"),hn=null}function Bp(){const e=Date.now();for(const[t,n]of ot.entries())e-n.timestamp>=dr&&ot.delete(t)}async function Dp(e){ot.size>_i/2&&Bp();const t=ot.get(e);if(t&&Date.now()-t.timestamp<dr)return t.issue;if(!Li.api)throw new Error("API not initialized");const n=await Li.api.getIssueByIdentifier(e);if(ot.size>=_i){const s=Array.from(ot.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,_i/2);for(const[a]of i)ot.delete(a)}return ot.set(e,{issue:n,timestamp:Date.now()}),n}function Mp(e){const t=Tp[e.status]||"#6b7280",n=xp[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";ie.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${Ai(e.identifier)}</span>
            <span class="issue-tooltip-type">${Ai(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${Ai(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${jp(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Rp(e.priority)}</span>
        </div>
    `}function jp(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Rp(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Ai(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}let os=0;function gr(e){const t=Ad();t&&(t.close(),wo(null));const n=api.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);wo(a),a.onopen=()=>{console.log("WebSocket connected"),os>0&&g("Live updates reconnected","success"),os=0},a.onmessage=o=>{const r=JSON.parse(o.data);Pp(r)},a.onclose=()=>{console.log("WebSocket disconnected"),os++,os===1&&g("Live updates disconnected. Reconnecting...","warning"),setTimeout(()=>{window.currentTeam&&window.currentTeam.id===e&&gr(e)},5e3)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Pp(e){var i,a,o,r,c,l;const{type:t,entity:n,data:s}=e;if(n==="issue"){if(t==="created"){const d=qe(),m=d.findIndex(f=>f.id===s.id),p=d.findIndex(f=>f._isOptimistic&&f.title===s.title);if(!(m>=0))if(p>=0){const f=[...d];f[p]=s,Fe(f),H()==="issues"&&ze()}else Fe([s,...d]),H()==="issues"&&ze(),g(`New issue: ${s.identifier}`,"info");if(s.assignee_id===((i=ai())==null?void 0:i.id)){const f=Yn(),v=f.findIndex(_=>_.id===s.id),I=f.findIndex(_=>_._isOptimistic&&_.title===s.title);if(v===-1&&I===-1)dn([s,...f]),H()==="my-issues"&&un();else if(I>=0){const _=[...f];_[I]=s,dn(_),H()==="my-issues"&&un()}}H()==="my-issues"&&xt(),H()==="board"?tt():H()==="sprints"&&Qe(),H()==="issue-detail"&&s.parent_id===((a=window.currentDetailIssue)==null?void 0:a.id)&&ee(window.currentDetailIssue.id,!1)}else if(t==="updated"){const d=qe(),m=d.findIndex(v=>v.id===s.id);if(m>=0){const v=[...d];v[m]=s,Fe(v)}const p=Yn(),f=p.findIndex(v=>v.id===s.id);if(f>=0){const v=[...p];v[f]=s,dn(v)}if(H()==="issues")ze();else if(H()==="my-issues")un(),xt();else if(H()==="board")tt();else if(H()==="sprints")Qe();else if(H()==="issue-detail"){const v=document.getElementById("issue-detail-content");v&&v.dataset.issueId===s.id&&ee(s.id)}}else t==="deleted"&&(Fe(qe().filter(d=>d.id!==s.id)),dn(Yn().filter(d=>d.id!==s.id)),H()==="issues"?ze():H()==="my-issues"?(un(),xt()):H()==="board"?tt():H()==="sprints"&&Qe(),g(`Issue ${s.identifier} deleted`,"info"));H()==="issue-detail"&&((o=window.currentDetailIssue)==null?void 0:o.id)===s.id&&(g(`Issue ${s.identifier} was deleted`,"warning"),z("my-issues"))}else if(n==="comment")H()==="my-issues"&&xt(),H()==="issue-detail"&&((r=window.currentDetailIssue)==null?void 0:r.id)===s.issue_id&&ee(s.issue_id,!1);else if(n==="relation"){if(H()==="issue-detail"){const d=(c=window.currentDetailIssue)==null?void 0:c.id;d&&(s.source_issue_id===d||s.target_issue_id===d)&&ee(d,!1)}}else n==="activity"&&(H()==="my-issues"&&xt(),H()==="issue-detail"&&((l=window.currentDetailIssue)==null?void 0:l.id)===s.issue_id&&ee(s.issue_id,!1))}window.currentTeam=null;let vn=[],bn=[],rs=[];function fr(e){if(!e)return"";if(typeof marked<"u"&&typeof DOMPurify<"u")try{marked.setOptions({breaks:!0,gfm:!0});const n=marked.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return DOMPurify.sanitize(n,{FORCE_BODY:!0})}catch(t){console.error("Markdown parsing error:",t)}return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const hr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];Ju({beforeNavigate:()=>{Ya(),window._onRitualsChanged=null},detailRoute:e=>e[0]==="issue"&&e[1]?(is(e[1]),!0):e[0]==="document"&&e[1]?(Op(e[1]),!0):e[0]==="sprint"&&e[1]?(Pd(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Ja(e[1]),!0):!1,detailPopstate:e=>e.issueId?(ee(e.issueId,!1),!0):e.identifier?(is(e.identifier),!0):e.documentId?(_e(e.documentId,!1),!0):e.sprintId?(ri(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Lt();e&&se().some(t=>t.id===e)&&an(e)},issueNavigate:e=>is(e)}),Vu({"my-issues":()=>{Xs(),xt()},"gate-approvals":()=>{Gp()},issues:()=>{bu(),Gu(),vu().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Do())}}),Fo().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}mt()})},epics:()=>{Xu()},board:()=>{ui()},projects:()=>{be().then(on)},sprints:()=>{Io()},rituals:()=>{tr()},documents:()=>{kt()},team:()=>{Gs(),za(),qn()},settings:()=>{Zs(),Os(),op()}}),document.addEventListener("DOMContentLoaded",async()=>{if(Np(),Hp(),_p({api}),Yu(),api.getToken())try{const e=await api.getMe();Ed(e),window.currentUser=e,await vr()}catch{api.logout(),Rn()}else Rn()});function Np(){const e=document.getElementById("theme-toggle");if(!e)return;const n=localStorage.getItem("chaotic_theme")==="light";document.body.classList.toggle("theme-light",n),e.checked=n,e.addEventListener("change",()=>{const s=e.checked;document.body.classList.toggle("theme-light",s),localStorage.setItem("chaotic_theme",s?"light":"dark")})}function Hp(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");ns(s)}}})}document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"){const t=document.activeElement,n=t==null?void 0:t.closest("form");if(n){e.preventDefault();const s=new Event("submit",{bubbles:!0,cancelable:!0});n.dispatchEvent(s)}}});async function vr(){Ia(),La(),await On();const e=Na();if(e.length===0&&!po()){ni();return}e.length>0&&await Us(e[0],!0)}window.initApp=vr,window.viewIssue=ee,window.viewIssueByPath=is,window.handleDescriptionClick=Qo,window.toggleTicketRituals=er,window.toggleCreateIssueOptions=em,window.connectWebSocket=gr,window.buildAssignees=Up,window.updateAssigneeFilter=zp,window.loadLabels=vm,window.resetOnboarding=ii;async function Op(e){try{await _e(e,!1)}catch{z("documents",!1)}}function qp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Fp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function Up(){const e=Et().map(qp),t=_c().map(Fp);vn=[...e,...t]}function Bi(e){return e&&vn.find(t=>t.id===e)||null}function yn(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Di(e,t=!1){const n=h(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${h(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ls(){const e=vn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));vn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=vn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function zp(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ls().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Di(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}async function Gp(){if(!window.currentTeam)return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=[];for(const n of se()){const s=await api.getPendingApprovals(n.id);t.push(...s)}Sd(t),Wp()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${h(t.message)}</p></div>`}}}function Wp(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=_d();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No pending approvals</h3>
                <p>All rituals have been completed. Nice work!</p>
            </div>
        `;return}const n=c=>c.pending_approvals||[],s=c=>l=>{const d=n(l).filter(c);return d.length>0?{...l,_filteredApprovals:d}:null},i=t.map(s(c=>c.approval_mode==="gate"&&c.limbo_type==="claim")).filter(Boolean),a=t.map(s(c=>c.approval_mode==="gate"&&c.limbo_type==="close")).filter(Boolean),o=t.map(s(c=>c.approval_mode==="review")).filter(Boolean);let r="";i.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${i.map(Mi).join("")}
                </div>
            </div>
        `),a.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${a.map(Mi).join("")}
                </div>
            </div>
        `),o.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${o.map(Mi).join("")}
                </div>
            </div>
        `),e.innerHTML=r,e.querySelectorAll(".gate-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;io(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;approveReviewFromList(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt,l.attestationNote)})})}function Mi(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${h(s.requested_by_name)}</strong>${s.requested_at?` (${ym(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note"><em>${h(s.attestation_note)}</em></div>`:"",c=i?"review-approve-btn":"gate-approve-btn",l=i?"Approve":"Complete",d=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${h(s.ritual_name)} ${d}</span>
                    <span class="gate-ritual-prompt">${h(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                <button class="btn btn-small btn-primary ${c}"
                    data-ritual-id="${S(s.ritual_id)}"
                    data-issue-id="${S(e.issue_id)}"
                    data-ritual-name="${S(s.ritual_name)}"
                    data-ritual-prompt="${S(s.ritual_prompt)}"
                    data-issue-identifier="${S(e.identifier)}"
                    data-issue-title="${S(e.title)}"
                    data-requested-by="${S(s.requested_by_name||"")}"
                    data-requested-at="${S(s.requested_at||"")}"
                    data-attestation-note="${S(s.attestation_note||"")}">${l}</button>
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${E(e.issue_id)}')" class="gate-issue-link">
                    <span class="gate-issue-id">${h(e.identifier)}</span>
                    <span class="gate-issue-title">${h(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${h(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}function Dt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function Kp(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function cs(e,t="avatar-small"){const n=yn(e)||"User",s=e==null?void 0:e.avatar_url;return s?Kp(s)?`<img class="${t} avatar-img" src="${S(s)}" alt="${S(n)}">`:`<div class="${t} avatar-emoji">${h(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Vp(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Jp(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=Et().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:Vp(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${S(l.handle)}">
                <span class="mention-name">${h(l.name)}</span>
                <span class="mention-handle">@${h(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.handle,m=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),p=e.value.slice(i);e.value=m+p,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}async function Zp(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;try{await api.createComment(t,n),await ee(t),g("Comment added!","success")}catch(s){g(s.message,"error")}return!1}async function Yp(e){const t=window.currentDetailIssue||await api.getIssue(e);document.getElementById("modal-title").textContent="Edit Description",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateDescription(event, '${E(e)}')">
            <div class="form-group description-editor">
                <div class="editor-tabs">
                    <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                    <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
                </div>
                <textarea id="edit-description" rows="10" placeholder="Add a description...">${h(t.description||"")}</textarea>
                <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    `,A();const n=document.getElementById("edit-description");n.addEventListener("input",()=>{const s=document.getElementById("edit-description-preview");s&&s.style.display!=="none"&&br()}),n.focus()}function br(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Xo(n):'<span class="text-muted">Nothing to preview.</span>'}function Xp(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?br():s.focus()}async function Qp(e,t){e.preventDefault();try{const n=document.getElementById("edit-description");if(!n)throw new Error("Description field not found");const s=n.value;await api.updateIssue(t,{description:s}),R(),g("Description updated","success"),ee(t,!1)}catch(n){g(n.message,"error")}return!1}function ji(e=null){var s;const t=e||((s=document.getElementById("project-filter"))==null?void 0:s.value);rs=[];const n=se().map(i=>`
        <option value="${i.id}" ${i.id===t?"selected":""}>${h(i.name)}</option>
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
                            ${hr.map(i=>`<option value="${i.id}">${i.label}</option>`).join("")}
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
                            ${st("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${nt("no_priority")}
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
    `,A(),as(),document.getElementById("create-issue-title").focus()}function em(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function tm(e){const t=hr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function nm(e,t){const n=se().find(s=>s.id===t);rs=[],document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?h(n.name):"Project"}</span>
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
                            ${st("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${nt("no_priority")}
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
    `,A(),as(),document.getElementById("create-issue-title").focus()}async function sm(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null;if(!n){g("Please enter a title","error");return}try{const d=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:rs,parent_id:e});R(),g(`Created sub-issue ${d.identifier}`,"success"),ee(e)}catch(d){g(d.message,"error")}}function im(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleAddRelation(event, '${E(e)}')">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${E(e)}')">
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
    `,A(),document.getElementById("relation-issue-search").focus()}async function am(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,o=(await api.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" onclick="selectIssueForRelation('${E(r.id)}', '${E(r.identifier)}', '${E(r.title)}')">
                <span class="link-result-id">${h(r.identifier)}</span>
                <span class="link-result-title">${h(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function om(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function rm(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function lm(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return g("Please select an issue","error"),!1;try{n==="blocked_by"?await api.createRelation(s,t,"blocks"):await api.createRelation(t,s,n),R(),g("Relation added","success"),ee(t)}catch(i){g(i.message,"error")}return!1}async function cm(e,t){try{await api.deleteRelation(e,t),g("Relation removed","success"),ee(e)}catch(n){g(n.message,"error")}}async function dm(e,t){var a,o;Yt();const s=t.currentTarget.getBoundingClientRect(),i=document.createElement("div");if(i.className="inline-dropdown dropdown-positioning",i.style.top=`${s.top-8}px`,i.style.left=`${s.left}px`,i.style.transform="translateY(-100%)",i.style.animation="none",e==="status"){const r=document.getElementById("create-issue-status").value;i.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('status', '${c}', '${Ze(c)}')">
                    ${st(c)}
                    <span>${Ze(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const r=document.getElementById("create-issue-priority").value;i.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('priority', '${c}', '${je(c)}')">
                    ${nt(c)}
                    <span>${je(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const r=document.getElementById("create-issue-type").value;i.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('type', '${c}', '${Dt(c)}')">
                    <span class="issue-type-badge type-${c}">${Dt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!window.currentTeam)i.innerHTML='<div class="dropdown-header">Select a team first</div>';else{if(bn.length===0)try{bn=await api.getLabels(window.currentTeam.id)}catch(r){console.error("Failed to load labels:",r)}xi(i),document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Dn(i,{multiSelect:!0});return}else if(e==="assignee"){const r=document.getElementById("create-issue-assignee").value,c=ls();i.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${r?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:l,indent:d})=>{const m=yn(l)||"User";return`
                <button class="dropdown-option ${l.id===r?"selected":""}" onclick="setCreateIssueField('assignee', '${E(l.id)}', '${E(m)}')">
                    ${cs(l,"avatar-small")}
                    <span>${Di(l,d)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const r=document.getElementById("create-issue-estimate").value,c=(a=document.getElementById("create-issue-project"))==null?void 0:a.value,l=Fn(c);i.innerHTML=`
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
                            <span>${h(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{i.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Dn(i)}function um(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function pm(e,t,n){if(document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,e==="status"){const s=document.querySelector(".toolbar-btn:first-child");s.innerHTML=`${st(t)}<span id="create-issue-status-label">${n}</span>`}else if(e==="priority"){const s=document.querySelectorAll(".toolbar-btn")[1];s.innerHTML=`${nt(t)}<span id="create-issue-priority-label">${n}</span>`}else if(e==="type"){const s=document.getElementById("create-issue-type-btn");s&&(s.innerHTML=`<span class="issue-type-badge type-${t}">${Dt(t)}</span><span id="create-issue-type-label">${n}</span>`)}Yt()}async function yr({keepOpen:e=!1}={}){var I,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null,d=((I=document.getElementById("create-issue-sprint"))==null?void 0:I.value)||null,m=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,p=m?new Date(`${m}T00:00:00Z`).toISOString():null;if(!t){g("Please select a project","error");return}if(!n){g("Please enter a title","error");return}const f=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");f&&(f.disabled=!0),v&&(v.disabled=!0);try{const B=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:d,label_ids:rs,due_date:p});g(`Created ${B.identifier}`,"success"),H()==="issues"?mt():H()==="my-issues"&&Xs(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(R(),ee(B.id))}catch(B){g(B.message,"error")}finally{f&&(f.disabled=!1),v&&(v.disabled=!1)}}async function mm(){await yr({keepOpen:!1})}async function gm(){await yr({keepOpen:!0})}async function wr(e){try{const t=await api.getIssue(e),n=await api.getSprints(t.project_id),i=(window.getEstimateOptions?window.getEstimateOptions(t.project_id):[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}]).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${h(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${E(e)}')">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${S(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${h(t.description||"")}</textarea>
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
                            <option value="${a.id}" ${t.sprint_id===a.id?"selected":""}>${h(a.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,A()}catch(t){g(t.message,"error")}}async function fm(e,t){e.preventDefault();try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await api.updateIssue(t,l),R(),await ee(t),g("Issue updated!","success")}catch(n){g(n.message,"error")}return!1}async function hm(e){if(confirm("Are you sure you want to delete this issue?"))try{await api.deleteIssue(e),await mt(),await be(),z("issues"),g("Issue deleted!","success")}catch(t){g(t.message,"error")}}async function vm(){if(window.currentTeam)try{bn=await api.getLabels(window.currentTeam.id)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("keydown",ep({closeModal:R,navigateTo:z,showCreateIssueModal:ji,showKeyboardShortcutsHelp:kr,isModalOpen:()=>!document.getElementById("modal-overlay").classList.contains("hidden"),focusSearch:()=>{z("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function kr(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,A()}md([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>z("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>z("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>z("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>z("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>z("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>z("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>z("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{z("issues"),setTimeout(ji,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{z("projects"),setTimeout(Vs,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{z("documents"),setTimeout(Hs,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Ks(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{z("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{z("team"),setTimeout(Ws,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>kr(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>ii(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Rs(),category:"Account"}]),bd({getCurrentUser:ai,getCurrentTeam:()=>window.currentTeam,renderIssueRow:Ce,formatActivityText:Zo,formatActivityActor:Jo,getActivityIcon:Vo,navigateToIssueByIdentifier:ns,viewDocument:_e}),Qd({api,showToast:g,getProjects:se,getProjectFromUrl:Lt,setGlobalProjectSelection:an,updateUrlWithProject:oi,escapeHtml:h,escapeAttr:S,escapeJsString:E,formatPriority:je}),cu({getIssues:qe,getAssigneeById:Bi,formatAssigneeName:yn,formatEstimate:Un,getSprintCache:Bd,formatStatus:Ze,formatPriority:je,formatIssueType:Dt,escapeHtml:h,escapeAttr:S,escapeJsString:E,sanitizeColor:ge,renderAvatar:cs,getAssigneeOptionList:ls,getGroupByValue:Go}),yp({api,getIssues:qe,setIssues:Fe,getMyIssues:Yn,setMyIssues:dn,getCurrentDetailIssue:()=>window.currentDetailIssue,setCurrentDetailIssue:e=>{window.currentDetailIssue=e},getLabels:()=>bn,setLabels:e=>{bn=e},getCurrentTeam:()=>window.currentTeam,getCurrentDetailSprints:()=>window.currentDetailSprints,closeAllDropdowns:Yt,registerDropdownClickOutside:Dn,setDropdownKeyHandler:Ql,showToast:g,getStatusIcon:st,getPriorityIcon:nt,formatStatus:Ze,formatPriority:je,formatIssueType:Dt,formatEstimate:Un,formatAssigneeName:yn,formatAssigneeOptionLabel:Di,getAssigneeOptionList:ls,getAssigneeById:Bi,getEstimateOptions:Fn,renderAvatar:cs,renderIssueRow:Ce,escapeHtml:h,escapeAttr:S,escapeJsString:E,sanitizeColor:ge,updateSprintCacheForProject:Zd,updateSprintBudgetBar:yi}),tp({api,getCurrentView:H,showToast:g,showModal:A,closeModal:R,navigateTo:z,getProjects:se,getMembers:Et,getAssigneeById:Bi,formatAssigneeName:yn,formatStatus:Ze,formatPriority:je,formatIssueType:Dt,formatEstimate:Un,formatTimeAgo:Mn,getStatusIcon:st,getPriorityIcon:nt,renderMarkdown:fr,renderAvatar:cs,escapeHtml:h,escapeAttr:S,escapeJsString:E,sanitizeColor:ge,showDetailDropdown:rr,setupMentionAutocomplete:Jp,renderTicketRitualActions:up});const bm=A;window.showModal=function(){bm(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"&&!document.getElementById("modal-overlay").classList.contains("hidden")){const n=document.querySelector("#modal-content form");if(n)e.preventDefault(),n.dispatchEvent(new Event("submit",{cancelable:!0}));else{const s=document.querySelector("#modal-content .btn-primary");s&&!s.disabled&&(e.preventDefault(),s.click())}}(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),lo()?Zn():gd())});function ym(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}async function wm(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){g("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=se().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Fe([r,...qe()]),ze();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=qe(),m=d.findIndex(p=>p.id===a);m!==-1&&(d[m]=l,Fe(d)),ze(),be(),g("Issue created!","success")}catch(l){Fe(qe().filter(d=>d.id!==a)),ze(),g(l.message,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}function $r(e){const t=document.querySelectorAll("#issues-list .list-item");t.length!==0&&(e=Math.max(0,Math.min(t.length-1,e)),t.forEach(n=>n.classList.remove("keyboard-selected")),yo(e),t[e].classList.add("keyboard-selected"),t[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}document.addEventListener("keydown",e=>{if(H()!=="issues"||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="SELECT"||!document.getElementById("modal-overlay").classList.contains("hidden")||lo())return;const t=document.querySelectorAll("#issues-list .list-item");if(t.length===0)return;const n=xd();switch(e.key){case"j":e.preventDefault(),$r(n+1);break;case"k":e.preventDefault(),$r(n-1);break;case"Enter":if(n>=0&&t[n]){e.preventDefault();const s=t[n].dataset.id;s&&!s.startsWith("temp-")&&ee(s)}break;case"e":if(n>=0&&t[n]){e.preventDefault();const s=t[n].dataset.id;s&&!s.startsWith("temp-")&&wr(s)}break}}),Object.assign(window,{escapeHtml:h,renderMarkdown:fr,handleLogin:_a,handleSignup:Sa,showLogin:Ta,showSignup:xa,logout:Rs,navigateTo:z,handleRoute:Ko,closeModal:R,getProjectFromUrl:Lt,updateUrlWithProject:oi,toggleTeamDropdown:zs,toggleUserDropdown:Oa,showCreateTeamModal:Ks,showEditTeamModal:Wa,showInviteModal:Ws,showCreateIssueModal:ji,loadIssues:mt,filterIssues:Ge,filterMyIssues:uo,debounceSearch:Wu,handleQuickCreate:wm,onProjectFilterChange:Uo,updateGroupBy:zo,toggleGroup:fu,viewIssue:ee,showEditIssueModal:wr,editDescription:Yp,handleDescriptionClick:Qo,setDescriptionEditorMode:Xp,updateIssueField:fn,handleUpdateDescription:Qp,handleUpdateIssue:fm,deleteIssue:hm,navigateToIssueByIdentifier:ns,handleCreateIssueNew:mm,handleCreateIssueAndNew:gm,setCreateIssueField:pm,toggleCreateIssueDropdown:dm,toggleCreateIssueLabelSelection:$p,createLabelForCreateIssue:Ep,createLabelFromDropdown:kp,handleAddComment:Zp,showCreateSubIssueModal:nm,handleCreateSubIssue:sm,showAddRelationModal:im,handleAddRelation:lm,deleteRelation:cm,searchIssuesToRelate:am,selectIssueForRelation:om,clearSelectedRelation:rm,showDetailDropdown:rr,showInlineDropdown:or,toggleIssueLabel:wp,toggleMultiSelect:hu,updateStatusFilter:mi,updatePriorityFilter:fi,updateLabelFilter:vi,clearStatusFilter:gi,clearPriorityFilter:hi,clearLabelFilter:bi,toggleFilterMenu:ku,toggleDisplayMenu:$u,showFilterCategoryOptions:$e,setProjectFilter:No,clearProjectFilter:Au,toggleStatusOption:Bu,clearStatusFilterNew:Du,togglePriorityOption:Mu,clearPriorityFilterNew:ju,setTypeFilter:Ho,clearTypeFilter:Ru,setAssigneeFilter:Oo,clearAssigneeFilter:Pu,setSprintFilter:qo,clearSprintFilter:Nu,toggleLabelOption:Hu,clearLabelFilterNew:Ou,setSort:Fu,setGroupBy:Uu,clearAllFilters:zu,updateFilterChips:fe,updateFilterCountBadge:he,loadBoard:pi,onBoardProjectChange:eu,handleDragStart:tu,handleDragEnd:nu,handleDragOver:su,handleDragLeave:iu,handleCardDragOver:au,handleCardDragLeave:ou,handleDrop:ru,handleCardDrop:lu,loadSprints:Qe,onSprintProjectChange:Md,viewSprint:ri,showEditBudgetModal:qd,handleUpdateBudget:Fd,showCloseSprintConfirmation:Ud,completeSprint:zd,loadLimboStatus:es,showLimboDetailsModal:li,showCreateDocumentModal:Hs,showCreateProjectModal:Vs,loadRitualsView:tr,onRitualsProjectChange:nr,approveRitual:lp,completeGateRitual:cp,toggleTicketRituals:er,attestTicketRitual:gp,approveTicketRitual:fp,showCompleteTicketRitualModal:hp,showAttestTicketRitualModal:pp,showCreateApiKeyModal:ao,copyApiKey:oo,revokeApiKey:ro,showCreateAgentModal:Pa,applyIssueTemplate:tm,updateCreateIssueProject:um}),window.marked=P,window.DOMPurify=Zl,console.log("Chaotic frontend loaded via Vite")})();
