var Lm=Object.defineProperty;var Am=(Be,le,rt)=>le in Be?Lm(Be,le,{enumerable:!0,configurable:!0,writable:!0,value:rt}):Be[le]=rt;var H=(Be,le,rt)=>Am(Be,typeof le!="symbol"?le+"":le,rt);(function(){"use strict";var Ri;function Be(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var le=Be();function rt(e){le=e}var Ut={exec:()=>null};function M(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ce.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ce={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Kr=/^(?:[ \t]*(?:\n|$))+/,Vr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Jr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,zt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hs=/(?:[*+-]|\d{1,9}[.)])/,Yi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Xi=M(Yi).replace(/bull/g,hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Yr=M(Yi).replace(/bull/g,hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),vs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Xr=/^[^\n]+/,bs=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Qr=M(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),el=M(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,hs).getRegex(),Tn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ys=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,tl=M("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ys).replace("tag",Tn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qi=M(vs).replace("hr",zt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex(),nl=M(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qi).getRegex(),ws={blockquote:nl,code:Vr,def:Qr,fences:Jr,heading:Zr,hr:zt,html:tl,lheading:Xi,list:el,newline:Kr,paragraph:Qi,table:Ut,text:Xr},ea=M("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",zt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex(),sl={...ws,lheading:Yr,table:ea,paragraph:M(vs).replace("hr",zt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ea).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex()},il={...ws,html:M(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ys).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ut,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:M(vs).replace("hr",zt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Xi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},al=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ol=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ta=/^( {2,}|\\)\n(?!\s*$)/,rl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,In=/[\p{P}\p{S}]/u,ks=/[\s\p{P}\p{S}]/u,na=/[^\s\p{P}\p{S}]/u,ll=M(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ks).getRegex(),sa=/(?!~)[\p{P}\p{S}]/u,cl=/(?!~)[\s\p{P}\p{S}]/u,dl=/(?:[^\s\p{P}\p{S}]|~)/u,ul=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ia=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,pl=M(ia,"u").replace(/punct/g,In).getRegex(),ml=M(ia,"u").replace(/punct/g,sa).getRegex(),aa="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",gl=M(aa,"gu").replace(/notPunctSpace/g,na).replace(/punctSpace/g,ks).replace(/punct/g,In).getRegex(),fl=M(aa,"gu").replace(/notPunctSpace/g,dl).replace(/punctSpace/g,cl).replace(/punct/g,sa).getRegex(),hl=M("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,na).replace(/punctSpace/g,ks).replace(/punct/g,In).getRegex(),vl=M(/\\(punct)/,"gu").replace(/punct/g,In).getRegex(),bl=M(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),yl=M(ys).replace("(?:-->|$)","-->").getRegex(),wl=M("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",yl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,kl=M(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oa=M(/^!?\[(label)\]\[(ref)\]/).replace("label",xn).replace("ref",bs).getRegex(),ra=M(/^!?\[(ref)\](?:\[\])?/).replace("ref",bs).getRegex(),$l=M("reflink|nolink(?!\\()","g").replace("reflink",oa).replace("nolink",ra).getRegex(),$s={_backpedal:Ut,anyPunctuation:vl,autolink:bl,blockSkip:ul,br:ta,code:ol,del:Ut,emStrongLDelim:pl,emStrongRDelimAst:gl,emStrongRDelimUnd:hl,escape:al,link:kl,nolink:ra,punctuation:ll,reflink:oa,reflinkSearch:$l,tag:wl,text:rl,url:Ut},El={...$s,link:M(/^!?\[(label)\]\((.*?)\)/).replace("label",xn).getRegex(),reflink:M(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xn).getRegex()},Es={...$s,emStrongRDelimAst:fl,emStrongLDelim:ml,url:M(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Tl={...Es,br:M(ta).replace("{2,}","*").getRegex(),text:M(Es.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_n={normal:ws,gfm:sl,pedantic:il},Gt={normal:$s,gfm:Es,breaks:Tl,pedantic:El},Il={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},la=e=>Il[e];function Ie(e,t){if(t){if(ce.escapeTest.test(e))return e.replace(ce.escapeReplace,la)}else if(ce.escapeTestNoEncode.test(e))return e.replace(ce.escapeReplaceNoEncode,la);return e}function ca(e){try{e=encodeURI(e).replace(ce.percentDecode,"%")}catch{return null}return e}function da(e,t){var a;const n=e.replace(ce.findPipe,(o,r,c)=>{let l=!1,d=r;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),s=n.split(ce.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ce.slashPipe,"|");return s}function Wt(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function xl(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function ua(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function _l(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var Sn=class{constructor(e){H(this,"options");H(this,"rules");H(this,"lexer");this.options=e||le}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Wt(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=_l(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=Wt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Wt(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Wt(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const l=r.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${d}`:d;const m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=m,n.length===0)break;const p=a.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const f=p,b=f.raw+`
`+n.join(`
`),T=this.blockquote(b);a[a.length-1]=T,s=s.substring(0,s.length-f.raw.length)+T.raw,i=i.substring(0,i.length-f.text.length)+T.text;break}else if((p==null?void 0:p.type)==="list"){const f=p,b=f.raw+`
`+n.join(`
`),T=this.list(b);a[a.length-1]=T,s=s.substring(0,s.length-p.raw.length)+T.raw,i=i.substring(0,i.length-f.raw.length)+T.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),p=e.split(`
`,1)[0],f=!m.trim(),b=0;if(this.options.pedantic?(b=2,d=m.trimStart()):f?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=m.slice(b),b+=t[1].length),f&&this.rules.other.blankLine.test(p)&&(l+=p+`
`,e=e.substring(p.length+1),c=!0),!c){const C=this.rules.other.nextBulletRegex(b),N=this.rules.other.hrRegex(b),O=this.rules.other.fencesBeginRegex(b),B=this.rules.other.headingBeginRegex(b),J=this.rules.other.htmlBeginRegex(b);for(;e;){const y=e.split(`
`,1)[0];let W;if(p=y,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),W=p):W=p.replace(this.rules.other.tabCharGlobal,"    "),O.test(p)||B.test(p)||J.test(p)||C.test(p)||N.test(p))break;if(W.search(this.rules.other.nonSpaceChar)>=b||!p.trim())d+=`
`+W.slice(b);else{if(f||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||O.test(m)||B.test(m)||N.test(m))break;d+=`
`+p}!f&&!p.trim()&&(f=!0),l+=y+`
`,e=e.substring(y.length+1),m=W.slice(b)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let T=null,_;this.options.gfm&&(T=this.rules.other.listIsTask.exec(d),T&&(_=T[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!T,checked:_,loose:!1,text:d,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const l=i.items[c].tokens.filter(m=>m.type==="space"),d=l.length>0&&l.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=d}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=da(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(da(r,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Wt(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=xl(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),ua(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return ua(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,l=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);const m=[...s[0]][0].length,p=e.slice(0,a+s.index+m+r);if(Math.min(a,r)%2){const b=p.slice(1,-1);return{type:"em",raw:p,text:b,tokens:this.lexer.inlineTokens(b)}}const f=p.slice(2,-2);return{type:"strong",raw:p,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},De=class Ji{constructor(t){H(this,"tokens");H(this,"options");H(this,"state");H(this,"tokenizer");H(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||le,this.options.tokenizer=this.options.tokenizer||new Sn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ce,block:_n.normal,inline:Gt.normal};this.options.pedantic?(n.block=_n.pedantic,n.inline=Gt.pedantic):this.options.gfm&&(n.block=_n.gfm,this.options.breaks?n.inline=Gt.breaks:n.inline=Gt.gfm),this.tokenizer.rules=n}static get rules(){return{block:_n,inline:Gt}}static lex(t,n){return new Ji(n).lex(t)}static lexInline(t,n){return new Ji(n).inlineTokens(t)}lex(t){t=t.replace(ce.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ce.tabCharGlobal,"    ").replace(ce.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const d=t.slice(1);let m;this.options.extensions.startBlock.forEach(p=>{m=p.call({lexer:this},d),typeof m=="number"&&m>=0&&(l=Math.min(l,m))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,l;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(p=>(d=p.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const p=n.at(-1);d.type==="text"&&(p==null?void 0:p.type)==="text"?(p.raw+=d.raw,p.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let m=t;if((l=this.options.extensions)!=null&&l.startInline){let p=1/0;const f=t.slice(1);let b;this.options.extensions.startInline.forEach(T=>{b=T.call({lexer:this},f),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(m=t.substring(0,p+1))}if(d=this.tokenizer.inlineText(m)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const p=n.at(-1);(p==null?void 0:p.type)==="text"?(p.raw+=d.raw,p.text+=d.text):n.push(d);continue}if(t){const p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Cn=class{constructor(e){H(this,"options");H(this,"parser");this.options=e||le}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ce.notSpaceStart))==null?void 0:a[0],i=e.replace(ce.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ie(s)+'">'+(n?i:Ie(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ie(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Ie(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ie(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=ca(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ie(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=ca(e);if(i===null)return Ie(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ie(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ie(e.text)}},Ts=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Me=class Zi{constructor(t){H(this,"options");H(this,"renderer");H(this,"textRenderer");this.options=t||le,this.options.renderer=this.options.renderer||new Cn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ts}static parse(t,n){return new Zi(n).parse(t)}static parseInline(t,n){return new Zi(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=d||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],d+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Ln=(Ri=class{constructor(e){H(this,"options");H(this,"block");this.options=e||le}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?De.lex:De.lexInline}provideParser(){return this.block?Me.parse:Me.parseInline}},H(Ri,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ri),Sl=class{constructor(...e){H(this,"defaults",Be());H(this,"options",this.setOptions);H(this,"parse",this.parseMarkdown(!0));H(this,"parseInline",this.parseMarkdown(!1));H(this,"Parser",Me);H(this,"Renderer",Cn);H(this,"TextRenderer",Ts);H(this,"Lexer",De);H(this,"Tokenizer",Sn);H(this,"Hooks",Ln);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Cn(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Sn(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new Ln;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];Ln.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(m=>c.call(i,m));const d=r.call(i,l);return c.call(i,d)}:i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return De.lex(e,t??this.defaults)}parser(e,t){return Me.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?De.lex:De.lexInline,c=a.hooks?a.hooks.provideParser():e?Me.parse:Me.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Ie(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},lt=new Sl;function R(e,t){return lt.parse(e,t)}R.options=R.setOptions=function(e){return lt.setOptions(e),R.defaults=lt.defaults,rt(R.defaults),R},R.getDefaults=Be,R.defaults=le,R.use=function(...e){return lt.use(...e),R.defaults=lt.defaults,rt(R.defaults),R},R.walkTokens=function(e,t){return lt.walkTokens(e,t)},R.parseInline=lt.parseInline,R.Parser=Me,R.parser=Me.parse,R.Renderer=Cn,R.TextRenderer=Ts,R.Lexer=De,R.lexer=De.lex,R.Tokenizer=Sn,R.Hooks=Ln,R.parse=R,R.options,R.setOptions,R.use,R.walkTokens,R.parseInline,Me.parse,De.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:pa,setPrototypeOf:ma,isFrozen:Cl,getPrototypeOf:Ll,getOwnPropertyDescriptor:Al}=Object;let{freeze:de,seal:ve,create:Is}=Object,{apply:xs,construct:_s}=typeof Reflect<"u"&&Reflect;de||(de=function(t){return t}),ve||(ve=function(t){return t}),xs||(xs=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),_s||(_s=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const An=pe(Array.prototype.forEach),Bl=pe(Array.prototype.lastIndexOf),ga=pe(Array.prototype.pop),Kt=pe(Array.prototype.push),Dl=pe(Array.prototype.splice),Bn=pe(String.prototype.toLowerCase),Ss=pe(String.prototype.toString),Cs=pe(String.prototype.match),Vt=pe(String.prototype.replace),Ml=pe(String.prototype.indexOf),jl=pe(String.prototype.trim),$e=pe(Object.prototype.hasOwnProperty),ue=pe(RegExp.prototype.test),Jt=Rl(TypeError);function pe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return xs(e,t,s)}}function Rl(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return _s(e,n)}}function A(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Bn;ma&&ma(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Cl(t)||(t[s]=a),i=a)}e[i]=!0}return e}function Pl(e){for(let t=0;t<e.length;t++)$e(e,t)||(e[t]=null);return e}function xe(e){const t=Is(null);for(const[n,s]of pa(e))$e(e,n)&&(Array.isArray(s)?t[n]=Pl(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=xe(s):t[n]=s);return t}function Zt(e,t){for(;e!==null;){const s=Al(e,t);if(s){if(s.get)return pe(s.get);if(typeof s.value=="function")return pe(s.value)}e=Ll(e)}function n(){return null}return n}const fa=de(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ls=de(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),As=de(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Nl=de(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Bs=de(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hl=de(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ha=de(["#text"]),va=de(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ds=de(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ba=de(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Dn=de(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ol=ve(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ql=ve(/<%[\w\W]*|[\w\W]*%>/gm),Fl=ve(/\$\{[\w\W]*/gm),Ul=ve(/^data-[\-\w.\u00B7-\uFFFF]+$/),zl=ve(/^aria-[\-\w]+$/),ya=ve(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gl=ve(/^(?:\w+script|data):/i),Wl=ve(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),wa=ve(/^html$/i),Kl=ve(/^[a-z][.\w]*(-[.\w]+)+$/i);var ka=Object.freeze({__proto__:null,ARIA_ATTR:zl,ATTR_WHITESPACE:Wl,CUSTOM_ELEMENT:Kl,DATA_ATTR:Ul,DOCTYPE_NAME:wa,ERB_EXPR:ql,IS_ALLOWED_URI:ya,IS_SCRIPT_OR_DATA:Gl,MUSTACHE_EXPR:Ol,TMPLIT_EXPR:Fl});const Yt={element:1,text:3,progressingInstruction:7,comment:8,document:9},Vl=function(){return typeof window>"u"?null:window},Jl=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},$a=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ea(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vl();const t=x=>Ea(x);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Yt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:p,trustedTypes:f}=e,b=c.prototype,T=Zt(b,"cloneNode"),_=Zt(b,"remove"),C=Zt(b,"nextSibling"),N=Zt(b,"childNodes"),O=Zt(b,"parentNode");if(typeof o=="function"){const x=n.createElement("template");x.content&&x.content.ownerDocument&&(n=x.content.ownerDocument)}let B,J="";const{implementation:y,createNodeIterator:W,createDocumentFragment:Te,getElementsByTagName:ae}=n,{importNode:oe}=s;let K=$a();t.isSupported=typeof pa=="function"&&typeof O=="function"&&y&&y.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:We,ERB_EXPR:jt,TMPLIT_EXPR:ft,DATA_ATTR:bm,ARIA_ATTR:ym,IS_SCRIPT_OR_DATA:wm,ATTR_WHITESPACE:Er,CUSTOM_ELEMENT:km}=ka;let{IS_ALLOWED_URI:Tr}=ka,Q=null;const Ir=A({},[...fa,...Ls,...As,...Bs,...ha]);let te=null;const xr=A({},[...va,...Ds,...ba,...Dn]);let V=Object.seal(Is(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),kn=null,Pi=null;const Rt=Object.seal(Is(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let _r=!0,Ni=!0,Sr=!1,Cr=!0,Pt=!1,cs=!0,ht=!1,Hi=!1,Oi=!1,Nt=!1,ds=!1,us=!1,Lr=!0,Ar=!1;const $m="user-content-";let qi=!0,$n=!1,Ht={},Le=null;const Fi=A({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Br=null;const Dr=A({},["audio","video","img","source","image","track"]);let Ui=null;const Mr=A({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ps="http://www.w3.org/1998/Math/MathML",ms="http://www.w3.org/2000/svg",Ke="http://www.w3.org/1999/xhtml";let Ot=Ke,zi=!1,Gi=null;const Em=A({},[ps,ms,Ke],Ss);let gs=A({},["mi","mo","mn","ms","mtext"]),fs=A({},["annotation-xml"]);const Tm=A({},["title","style","font","a","script"]);let En=null;const Im=["application/xhtml+xml","text/html"],xm="text/html";let X=null,qt=null;const _m=n.createElement("form"),jr=function(u){return u instanceof RegExp||u instanceof Function},Wi=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(qt&&qt===u)){if((!u||typeof u!="object")&&(u={}),u=xe(u),En=Im.indexOf(u.PARSER_MEDIA_TYPE)===-1?xm:u.PARSER_MEDIA_TYPE,X=En==="application/xhtml+xml"?Ss:Bn,Q=$e(u,"ALLOWED_TAGS")?A({},u.ALLOWED_TAGS,X):Ir,te=$e(u,"ALLOWED_ATTR")?A({},u.ALLOWED_ATTR,X):xr,Gi=$e(u,"ALLOWED_NAMESPACES")?A({},u.ALLOWED_NAMESPACES,Ss):Em,Ui=$e(u,"ADD_URI_SAFE_ATTR")?A(xe(Mr),u.ADD_URI_SAFE_ATTR,X):Mr,Br=$e(u,"ADD_DATA_URI_TAGS")?A(xe(Dr),u.ADD_DATA_URI_TAGS,X):Dr,Le=$e(u,"FORBID_CONTENTS")?A({},u.FORBID_CONTENTS,X):Fi,kn=$e(u,"FORBID_TAGS")?A({},u.FORBID_TAGS,X):xe({}),Pi=$e(u,"FORBID_ATTR")?A({},u.FORBID_ATTR,X):xe({}),Ht=$e(u,"USE_PROFILES")?u.USE_PROFILES:!1,_r=u.ALLOW_ARIA_ATTR!==!1,Ni=u.ALLOW_DATA_ATTR!==!1,Sr=u.ALLOW_UNKNOWN_PROTOCOLS||!1,Cr=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Pt=u.SAFE_FOR_TEMPLATES||!1,cs=u.SAFE_FOR_XML!==!1,ht=u.WHOLE_DOCUMENT||!1,Nt=u.RETURN_DOM||!1,ds=u.RETURN_DOM_FRAGMENT||!1,us=u.RETURN_TRUSTED_TYPE||!1,Oi=u.FORCE_BODY||!1,Lr=u.SANITIZE_DOM!==!1,Ar=u.SANITIZE_NAMED_PROPS||!1,qi=u.KEEP_CONTENT!==!1,$n=u.IN_PLACE||!1,Tr=u.ALLOWED_URI_REGEXP||ya,Ot=u.NAMESPACE||Ke,gs=u.MATHML_TEXT_INTEGRATION_POINTS||gs,fs=u.HTML_INTEGRATION_POINTS||fs,V=u.CUSTOM_ELEMENT_HANDLING||{},u.CUSTOM_ELEMENT_HANDLING&&jr(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=u.CUSTOM_ELEMENT_HANDLING.tagNameCheck),u.CUSTOM_ELEMENT_HANDLING&&jr(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Pt&&(Ni=!1),ds&&(Nt=!0),Ht&&(Q=A({},ha),te=[],Ht.html===!0&&(A(Q,fa),A(te,va)),Ht.svg===!0&&(A(Q,Ls),A(te,Ds),A(te,Dn)),Ht.svgFilters===!0&&(A(Q,As),A(te,Ds),A(te,Dn)),Ht.mathMl===!0&&(A(Q,Bs),A(te,ba),A(te,Dn))),u.ADD_TAGS&&(typeof u.ADD_TAGS=="function"?Rt.tagCheck=u.ADD_TAGS:(Q===Ir&&(Q=xe(Q)),A(Q,u.ADD_TAGS,X))),u.ADD_ATTR&&(typeof u.ADD_ATTR=="function"?Rt.attributeCheck=u.ADD_ATTR:(te===xr&&(te=xe(te)),A(te,u.ADD_ATTR,X))),u.ADD_URI_SAFE_ATTR&&A(Ui,u.ADD_URI_SAFE_ATTR,X),u.FORBID_CONTENTS&&(Le===Fi&&(Le=xe(Le)),A(Le,u.FORBID_CONTENTS,X)),u.ADD_FORBID_CONTENTS&&(Le===Fi&&(Le=xe(Le)),A(Le,u.ADD_FORBID_CONTENTS,X)),qi&&(Q["#text"]=!0),ht&&A(Q,["html","head","body"]),Q.table&&(A(Q,["tbody"]),delete kn.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw Jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=u.TRUSTED_TYPES_POLICY,J=B.createHTML("")}else B===void 0&&(B=Jl(f,i)),B!==null&&typeof J=="string"&&(J=B.createHTML(""));de&&de(u),qt=u}},Rr=A({},[...Ls,...As,...Nl]),Pr=A({},[...Bs,...Hl]),Sm=function(u){let k=O(u);(!k||!k.tagName)&&(k={namespaceURI:Ot,tagName:"template"});const I=Bn(u.tagName),q=Bn(k.tagName);return Gi[u.namespaceURI]?u.namespaceURI===ms?k.namespaceURI===Ke?I==="svg":k.namespaceURI===ps?I==="svg"&&(q==="annotation-xml"||gs[q]):!!Rr[I]:u.namespaceURI===ps?k.namespaceURI===Ke?I==="math":k.namespaceURI===ms?I==="math"&&fs[q]:!!Pr[I]:u.namespaceURI===Ke?k.namespaceURI===ms&&!fs[q]||k.namespaceURI===ps&&!gs[q]?!1:!Pr[I]&&(Tm[I]||!Rr[I]):!!(En==="application/xhtml+xml"&&Gi[u.namespaceURI]):!1},Ae=function(u){Kt(t.removed,{element:u});try{O(u).removeChild(u)}catch{_(u)}},vt=function(u,k){try{Kt(t.removed,{attribute:k.getAttributeNode(u),from:k})}catch{Kt(t.removed,{attribute:null,from:k})}if(k.removeAttribute(u),u==="is")if(Nt||ds)try{Ae(k)}catch{}else try{k.setAttribute(u,"")}catch{}},Nr=function(u){let k=null,I=null;if(Oi)u="<remove></remove>"+u;else{const Z=Cs(u,/^[\r\n\t ]+/);I=Z&&Z[0]}En==="application/xhtml+xml"&&Ot===Ke&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");const q=B?B.createHTML(u):u;if(Ot===Ke)try{k=new p().parseFromString(q,En)}catch{}if(!k||!k.documentElement){k=y.createDocument(Ot,"template",null);try{k.documentElement.innerHTML=zi?J:q}catch{}}const re=k.body||k.documentElement;return u&&I&&re.insertBefore(n.createTextNode(I),re.childNodes[0]||null),Ot===Ke?ae.call(k,ht?"html":"body")[0]:ht?k.documentElement:re},Hr=function(u){return W.call(u.ownerDocument||u,u,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Ki=function(u){return u instanceof m&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof d)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},Or=function(u){return typeof r=="function"&&u instanceof r};function Ve(x,u,k){An(x,I=>{I.call(t,u,k,qt)})}const qr=function(u){let k=null;if(Ve(K.beforeSanitizeElements,u,null),Ki(u))return Ae(u),!0;const I=X(u.nodeName);if(Ve(K.uponSanitizeElement,u,{tagName:I,allowedTags:Q}),cs&&u.hasChildNodes()&&!Or(u.firstElementChild)&&ue(/<[/\w!]/g,u.innerHTML)&&ue(/<[/\w!]/g,u.textContent)||u.nodeType===Yt.progressingInstruction||cs&&u.nodeType===Yt.comment&&ue(/<[/\w]/g,u.data))return Ae(u),!0;if(!(Rt.tagCheck instanceof Function&&Rt.tagCheck(I))&&(!Q[I]||kn[I])){if(!kn[I]&&Ur(I)&&(V.tagNameCheck instanceof RegExp&&ue(V.tagNameCheck,I)||V.tagNameCheck instanceof Function&&V.tagNameCheck(I)))return!1;if(qi&&!Le[I]){const q=O(u)||u.parentNode,re=N(u)||u.childNodes;if(re&&q){const Z=re.length;for(let me=Z-1;me>=0;--me){const Je=T(re[me],!0);Je.__removalCount=(u.__removalCount||0)+1,q.insertBefore(Je,C(u))}}}return Ae(u),!0}return u instanceof c&&!Sm(u)||(I==="noscript"||I==="noembed"||I==="noframes")&&ue(/<\/no(script|embed|frames)/i,u.innerHTML)?(Ae(u),!0):(Pt&&u.nodeType===Yt.text&&(k=u.textContent,An([We,jt,ft],q=>{k=Vt(k,q," ")}),u.textContent!==k&&(Kt(t.removed,{element:u.cloneNode()}),u.textContent=k)),Ve(K.afterSanitizeElements,u,null),!1)},Fr=function(u,k,I){if(Lr&&(k==="id"||k==="name")&&(I in n||I in _m))return!1;if(!(Ni&&!Pi[k]&&ue(bm,k))){if(!(_r&&ue(ym,k))){if(!(Rt.attributeCheck instanceof Function&&Rt.attributeCheck(k,u))){if(!te[k]||Pi[k]){if(!(Ur(u)&&(V.tagNameCheck instanceof RegExp&&ue(V.tagNameCheck,u)||V.tagNameCheck instanceof Function&&V.tagNameCheck(u))&&(V.attributeNameCheck instanceof RegExp&&ue(V.attributeNameCheck,k)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(k,u))||k==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&ue(V.tagNameCheck,I)||V.tagNameCheck instanceof Function&&V.tagNameCheck(I))))return!1}else if(!Ui[k]){if(!ue(Tr,Vt(I,Er,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&u!=="script"&&Ml(I,"data:")===0&&Br[u])){if(!(Sr&&!ue(wm,Vt(I,Er,"")))){if(I)return!1}}}}}}}return!0},Ur=function(u){return u!=="annotation-xml"&&Cs(u,km)},zr=function(u){Ve(K.beforeSanitizeAttributes,u,null);const{attributes:k}=u;if(!k||Ki(u))return;const I={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0};let q=k.length;for(;q--;){const re=k[q],{name:Z,namespaceURI:me,value:Je}=re,Ft=X(Z),Vi=Je;let ne=Z==="value"?Vi:jl(Vi);if(I.attrName=Ft,I.attrValue=ne,I.keepAttr=!0,I.forceKeepAttr=void 0,Ve(K.uponSanitizeAttribute,u,I),ne=I.attrValue,Ar&&(Ft==="id"||Ft==="name")&&(vt(Z,u),ne=$m+ne),cs&&ue(/((--!?|])>)|<\/(style|title|textarea)/i,ne)){vt(Z,u);continue}if(Ft==="attributename"&&Cs(ne,"href")){vt(Z,u);continue}if(I.forceKeepAttr)continue;if(!I.keepAttr){vt(Z,u);continue}if(!Cr&&ue(/\/>/i,ne)){vt(Z,u);continue}Pt&&An([We,jt,ft],Wr=>{ne=Vt(ne,Wr," ")});const Gr=X(u.nodeName);if(!Fr(Gr,Ft,ne)){vt(Z,u);continue}if(B&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!me)switch(f.getAttributeType(Gr,Ft)){case"TrustedHTML":{ne=B.createHTML(ne);break}case"TrustedScriptURL":{ne=B.createScriptURL(ne);break}}if(ne!==Vi)try{me?u.setAttributeNS(me,Z,ne):u.setAttribute(Z,ne),Ki(u)?Ae(u):ga(t.removed)}catch{vt(Z,u)}}Ve(K.afterSanitizeAttributes,u,null)},Cm=function x(u){let k=null;const I=Hr(u);for(Ve(K.beforeSanitizeShadowDOM,u,null);k=I.nextNode();)Ve(K.uponSanitizeShadowNode,k,null),qr(k),zr(k),k.content instanceof a&&x(k.content);Ve(K.afterSanitizeShadowDOM,u,null)};return t.sanitize=function(x){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,I=null,q=null,re=null;if(zi=!x,zi&&(x="<!-->"),typeof x!="string"&&!Or(x))if(typeof x.toString=="function"){if(x=x.toString(),typeof x!="string")throw Jt("dirty is not a string, aborting")}else throw Jt("toString is not a function");if(!t.isSupported)return x;if(Hi||Wi(u),t.removed=[],typeof x=="string"&&($n=!1),$n){if(x.nodeName){const Je=X(x.nodeName);if(!Q[Je]||kn[Je])throw Jt("root node is forbidden and cannot be sanitized in-place")}}else if(x instanceof r)k=Nr("<!---->"),I=k.ownerDocument.importNode(x,!0),I.nodeType===Yt.element&&I.nodeName==="BODY"||I.nodeName==="HTML"?k=I:k.appendChild(I);else{if(!Nt&&!Pt&&!ht&&x.indexOf("<")===-1)return B&&us?B.createHTML(x):x;if(k=Nr(x),!k)return Nt?null:us?J:""}k&&Oi&&Ae(k.firstChild);const Z=Hr($n?x:k);for(;q=Z.nextNode();)qr(q),zr(q),q.content instanceof a&&Cm(q.content);if($n)return x;if(Nt){if(ds)for(re=Te.call(k.ownerDocument);k.firstChild;)re.appendChild(k.firstChild);else re=k;return(te.shadowroot||te.shadowrootmode)&&(re=oe.call(s,re,!0)),re}let me=ht?k.outerHTML:k.innerHTML;return ht&&Q["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&ue(wa,k.ownerDocument.doctype.name)&&(me="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+me),Pt&&An([We,jt,ft],Je=>{me=Vt(me,Je," ")}),B&&us?B.createHTML(me):me},t.setConfig=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Wi(x),Hi=!0},t.clearConfig=function(){qt=null,Hi=!1},t.isValidAttribute=function(x,u,k){qt||Wi({});const I=X(x),q=X(u);return Fr(I,q,k)},t.addHook=function(x,u){typeof u=="function"&&Kt(K[x],u)},t.removeHook=function(x,u){if(u!==void 0){const k=Bl(K[x],u);return k===-1?void 0:Dl(K[x],k,1)[0]}return ga(K[x])},t.removeHooks=function(x){K[x]=[]},t.removeAllHooks=function(){K=$a()},t}var Zl=Ea();const Yl="/api";class Xl{constructor(){try{this.token=localStorage.getItem("chaotic_token")}catch(t){console.warn("Failed to access localStorage:",t),this.token=null}}setToken(t){this.token=t;try{t?localStorage.setItem("chaotic_token",t):localStorage.removeItem("chaotic_token")}catch(n){console.warn("Failed to persist token to localStorage:",n)}}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Yl}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){const c=typeof r.detail=="string"?r.detail:"An error occurred";throw new Error(c)}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const E=new Xl;window.api=E;let bt=null;function D(){document.getElementById("modal-overlay").classList.remove("hidden")}function j(){document.getElementById("modal-overlay").classList.add("hidden")}function g(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.remove()},3e3)}function Xt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),bt&&(document.removeEventListener("keydown",bt),bt=null)}function Ql(e){bt&&document.removeEventListener("keydown",bt),bt=e,e&&document.addEventListener("keydown",e)}function Mn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(Xt(),document.removeEventListener("click",s))};return setTimeout(()=>document.addEventListener("click",s),0),()=>document.removeEventListener("click",s)}Object.assign(window,{showModal:D,closeModal:j,showToast:g,closeAllDropdowns:Xt,registerDropdownClickOutside:Mn});function Ze(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function je(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ms(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ge(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function h(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function S(e){return h(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function jn(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function $(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}let yt=null,Qt=null,en=null,tn=null;function Rn(){yt||(yt=document.getElementById("auth-screen"),Qt=document.getElementById("main-screen"),en=document.getElementById("login-form"),tn=document.getElementById("signup-form"))}function Pn(){Rn(),yt&&yt.classList.remove("hidden"),Qt&&Qt.classList.add("hidden")}function Ta(){Rn(),yt&&yt.classList.add("hidden"),Qt&&Qt.classList.remove("hidden")}function Ia(){Rn(),en&&en.classList.remove("hidden"),tn&&tn.classList.add("hidden")}function xa(){Rn(),en&&en.classList.add("hidden"),tn&&tn.classList.remove("hidden")}async function _a(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await E.login(t,n),window.currentUser=await E.getMe(),window.initApp&&await window.initApp(),g("Welcome back!","success")}catch(s){g(s.message,"error")}return!1}async function Sa(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await E.signup(t,n,s),await E.login(n,s),window.currentUser=await E.getMe(),window.initApp&&await window.initApp(),g("Account created successfully!","success")}catch(i){g(i.message,"error")}return!1}function js(){E.logout(),window.currentUser=null,window.currentTeam=null,Pn(),g("Signed out","success")}function Ca(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function La(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Ca(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${S(s)}" alt="${S(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}Object.assign(window,{showAuthScreen:Pn,showMainScreen:Ta,showLogin:Ia,showSignup:xa,handleLogin:_a,handleSignup:Sa,logout:js,updateUserInfo:La,isImageAvatar:Ca});function Aa(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let wt=[],Nn=[],F=new Set,kt="list",ct=!1,Rs=null;try{const e=localStorage.getItem("chaotic_doc_view_mode");(e==="list"||e==="grid")&&(kt=e)}catch{}function ec(e){if(e!=="list"&&e!=="grid")return;kt=e,e==="grid"&&ct&&Hn();try{localStorage.setItem("chaotic_doc_view_mode",e)}catch{}const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),Re()}function Ba(){if(kt!=="list")return;ct=!0,F.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=Hn),Re(),Et()}function Hn(){ct=!1,F.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=Ba),Re(),Et()}function tc(){Rs&&clearTimeout(Rs),Rs=setTimeout(()=>{Re()},300)}function nc(){const e=document.getElementById("doc-search");e&&(e.value=""),Re()}function sc(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),Re()}function ic(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),Re()}function ac(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${h(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),c=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${h(c)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Re(){var s,i,a,o;const e=((i=(s=document.getElementById("doc-search"))==null?void 0:s.value)==null?void 0:i.toLowerCase())||"",t=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",n=((o=document.getElementById("doc-sort"))==null?void 0:o.value)||"updated_desc";ac(),Nn=wt.filter(r=>{var c,l;if(e){const d=(c=r.title)==null?void 0:c.toLowerCase().includes(e),m=(l=r.content)==null?void 0:l.toLowerCase().includes(e);if(!d&&!m)return!1}return!(t&&r.project_id!==t)}),Nn.sort((r,c)=>{switch(n){case"title_asc":return(r.title||"").localeCompare(c.title||"");case"title_desc":return(c.title||"").localeCompare(r.title||"");case"updated_asc":return new Date(r.updated_at)-new Date(c.updated_at);case"updated_desc":default:return new Date(c.updated_at)-new Date(r.updated_at)}}),Da("",kt)}async function $t(e,t=null){var n;if(e||(e=(n=window.currentTeam)==null?void 0:n.id),!!e){if(t===null){const s=document.getElementById("doc-project-filter");s!=null&&s.value&&(t=s.value)}try{wt=await E.getDocuments(e,t);const s=document.getElementById("doc-view-list"),i=document.getElementById("doc-view-grid");s&&i&&(s.classList.toggle("active",kt==="list"),i.classList.toggle("active",kt==="grid")),Re()}catch(s){g(s.message,"error")}}}function oc(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${ge(t.color)}; color: white;">${h(t.name)}</span>`).join(" ")}function rc(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${oc(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${S(e.id)}" onclick="viewDocument('${$(e.id)}')">
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
  `}function lc(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${ge(r.color)}; color: white;">${h(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Aa(e.content).substring(0,80):"No content",i=ct?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${$(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${F.has(e.id)?"checked":""}>
       </div>`:"",a=ct&&F.has(e.id)?" selected":"",o=ct?`toggleDocSelection('${$(e.id)}')`:`viewDocument('${$(e.id)}')`;return`
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
  `}function Da(e="",t="list"){var l,d;const n=document.getElementById("documents-list");if(!n)return;F.clear(),Et();const s=Nn.length>0||(l=document.getElementById("doc-search"))!=null&&l.value?Nn:wt;if(s.length===0){const m=(d=document.getElementById("doc-search"))==null?void 0:d.value;n.innerHTML=`
      <div class="empty-state">
        <h3>${m?"No documents match your search":"No documents yet"}</h3>
        <p>${m?"Try a different search term":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?rc:lc,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=window.getProjects?window.getProjects():[];s.forEach(m=>{let p,f;if(e==="project")if(p=m.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const b=r.find(T=>T.id===m.project_id);f=b?b.name:"Unknown Project"}else e==="sprint"&&(p=m.sprint_id||"__no_sprint__",f=m.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:f,docs:[]}),o[p].docs.push(m)});let c="";for(const[m,p]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${h(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function cc(e){F.has(e)?F.delete(e):F.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=F.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",F.has(e)),Et()}function dc(){wt.forEach(e=>F.add(e.id)),wt.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Et()}function Ma(){F.clear(),wt.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.remove("selected")}),Et()}function Et(){const e=document.getElementById("doc-bulk-actions");e&&(ct?(e.classList.remove("hidden"),F.size>0?e.innerHTML=`
        <span class="bulk-count">${F.size} selected</span>
        <button class="btn btn-secondary btn-small" onclick="showBulkMoveModal()">Move to Project</button>
        <button class="btn btn-danger btn-small" onclick="bulkDeleteDocuments()">Delete</button>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="clearDocSelection()">Clear</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function uc(){if(F.size===0){g("No documents selected","error");return}const t=(window.getProjects?window.getProjects():[]).map(n=>`<option value="${n.id}">${h(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${F.size} Document${F.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleBulkMove(event)">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${F.size} selected document${F.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,D()}async function pc(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(F);let s=0,i=0;for(const r of n)try{await E.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}j(),Ma(),i===0?g(`Moved ${s} document${s>1?"s":""}!`,"success"):g(`Moved ${s}, failed ${i}`,"warning");const a=(o=window.currentTeam)==null?void 0:o.id;return await $t(a),!1}async function mc(){var a;if(F.size===0){g("No documents selected","error");return}const e=F.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(F);let n=0,s=0;for(const o of t)try{await E.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}Hn(),s===0?g(`Deleted ${n} document${n>1?"s":""}!`,"success"):g(`Deleted ${n}, failed ${s}`,"warning");const i=(a=window.currentTeam)==null?void 0:a.id;await $t(i)}async function _e(e,t=!0){try{const n=await E.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(m=>m.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(m=>h(m));let a="";try{const m=await E.getDocumentIssues(n.id);m.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${m.map(f=>`
          <div class="linked-item">
            <span class="linked-item-id">${h(f.identifier)}</span>
            <span class="linked-item-title">${h(f.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${$(n.id)}', '${$(f.id)}')" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${$(n.id)}')">+ Link Issue</button>
          </div>
        `:a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <p class="empty-state-small">No linked issues</p>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${$(n.id)}')">+ Link Issue</button>
          </div>
        `}catch{}let o="";try{const m=await E.getDocumentComments(n.id);o=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${m.length===0?'<div class="comments-empty">No comments yet</div>':m.map(f=>{var b,T;return`
            <div class="comment" data-comment-id="${S(f.id)}">
              <div class="comment-avatar">${((T=(b=f.author_name)==null?void 0:b.charAt(0))==null?void 0:T.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${h(f.author_name||"Unknown")}</span>
                  <span class="comment-date">${jn(f.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(f.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${$(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(m){console.error("Failed to load comments:",m)}let r=null,c=null;if(n.project_id){const p=(window.getProjects?window.getProjects():[]).find(f=>f.id===n.project_id);if(r=p?p.name:null,n.sprint_id)try{const f=await E.getSprint(n.sprint_id);c=f?f.name:null}catch{}}let l="";r?(l=`<span class="badge badge-primary">${h(r)}</span>`,c&&(l+=` <span class="badge badge-info">${h(c)}</span>`)):l='<span class="badge badge-secondary">Global</span>';let d="";n.labels&&n.labels.length>0?d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(p=>`
        <span class="label-badge" style="background-color: ${ge(p.color)}; color: white;">
          ${h(p.name)}
          <button class="btn-remove-label" onclick="removeLabelFromDoc('${$(n.id)}', '${$(p.id)}')" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${$(n.id)}')">+ Add Label</button>
        </div>
      `:d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <p class="empty-state-small">No labels</p>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${$(n.id)}')">+ Add Label</button>
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
          <button class="btn btn-secondary btn-small" onclick="showEditDocumentModal('${$(n.id)}')">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteDocument('${$(n.id)}')">Delete</button>
        </div>
      </div>
      <div class="document-content markdown-body">${n.content?i(n.content):"No content"}</div>
      ${d}
      ${a}
      ${o}
    `}catch(n){g(n.message,"error")}}async function Ps(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await E.getSprints(t);let o=n;if(s&&!n){const c=a.find(l=>l.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${h(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Ns(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${h(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,D(),t&&await Ps("doc-sprint",t,null,!0)}async function gc(e){var a;e.preventDefault();const t=(a=window.currentTeam)==null?void 0:a.id;if(!t)return g("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await E.createDocument(t,i),await $t(t),j(),g("Document created!","success")}catch(o){g(o.message,"error")}return!1}async function fc(e){try{const t=await E.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${h(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form onsubmit="return handleUpdateDocument(event, '${$(e)}')">
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
    `,D(),t.project_id&&await Ps("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){g(t.message,"error")}}async function hc(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await E.updateDocument(t,i),j(),await _e(t),g("Document updated!","success")}catch(a){g(a.message,"error")}return!1}async function vc(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await E.deleteDocument(e);const n=(t=window.currentTeam)==null?void 0:t.id;await $t(n),window.navigateTo&&window.navigateTo("documents"),g("Document deleted!","success")}catch(n){g(n.message,"error")}}function bc(e,t){Ps(e,t)}async function yc(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${$(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${$(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,D()}async function wc(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,a=await E.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" onclick="linkToIssue('${$(t)}', '${$(o.id)}')">
        <span class="link-result-id">${h(o.identifier)}</span>
        <span class="link-result-title">${h(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function kc(e,t){try{await E.linkDocumentToIssue(e,t),j(),g("Issue linked!","success"),await _e(e,!1)}catch(n){g(n.message,"error")}}async function $c(e,t){if(confirm("Unlink this issue from the document?"))try{await E.unlinkDocumentFromIssue(e,t),g("Issue unlinked!","success"),await _e(e,!1)}catch(n){g(n.message,"error")}}async function Ec(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return g("Please enter a comment","error"),!1;try{await E.createDocumentComment(t,s),n.value="",g("Comment added!","success"),await _e(t,!1)}catch(i){g(i.message,"error")}return!1}async function Tc(e){var n;const t=(n=window.currentTeam)==null?void 0:n.id;if(!t){g("No team selected","error");return}try{const s=await E.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,D();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${$(e)}', '${$(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ge(a.color)}; color: white;">${h(a.name)}</span>
        ${a.description?`<span class="text-muted">${h(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,D()}catch(s){g(s.message,"error")}}async function Ic(e,t){try{await E.addLabelToDocument(e,t),j(),g("Label added!","success"),await _e(e,!1)}catch(n){g(n.message,"error")}}async function xc(e,t){try{await E.removeLabelFromDocument(e,t),g("Label removed!","success"),await _e(e,!1)}catch(n){g(n.message,"error")}}Object.assign(window,{loadDocuments:$t,filterDocuments:Re,renderDocuments:Da,viewDocument:_e,showCreateDocumentModal:Ns,handleCreateDocument:gc,showEditDocumentModal:fc,handleUpdateDocument:hc,deleteDocument:vc,updateDocSprintDropdown:bc,showLinkIssueModal:yc,searchIssuesToLink:wc,linkToIssue:kc,unlinkDocumentFromIssue:$c,toggleDocSelection:cc,selectAllDocs:dc,clearDocSelection:Ma,showBulkMoveModal:uc,handleBulkMove:pc,bulkDeleteDocuments:mc,handleAddDocumentComment:Ec,showAddLabelToDocModal:Tc,addLabelToDoc:Ic,removeLabelFromDoc:xc,setDocViewMode:ec,enterSelectionMode:Ba,exitSelectionMode:Hn,debounceDocSearch:tc,clearDocSearch:nc,clearDocProjectFilter:sc,clearAllDocFilters:ic});let nn=[];function _c(){return nn}function Sc(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ja(e){const t=e==null?void 0:e.avatar_url,n=S((e==null?void 0:e.name)||"Agent");return t?Sc(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${S(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${h(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Cc(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{nn=await E.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function Hs(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{nn=await E.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Ra()}catch(n){g(n.message,"error")}}function Ra(){const e=document.getElementById("agents-list");if(e){if(nn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=nn.map(t=>{const n=h(t.name),s=h(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${ja(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Ms(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${$(t.id)}', '${$(t.name||"Agent")}')">Delete</button>
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),D()}async function Lc(e){var o,r,c;e.preventDefault();const t=(o=window.currentTeam)==null?void 0:o.id;if(!t)return g("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;i&&a?l=await E.createProjectAgent(a,n,s):l=await E.createTeamAgent(t,n,s),j();const d=h(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,D()}catch(l){g(l.message,"error")}return!1}function Ac(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{g("Agent API key copied to clipboard","success")}).catch(()=>{g("Failed to copy","error")})}async function Bc(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await E.deleteAgent(e),g("Agent deleted","success"),Hs()}catch(n){g(n.message,"error")}}Object.assign(window,{loadTeamAgentsQuiet:Cc,loadAgents:Hs,renderAgents:Ra,showCreateAgentModal:Pa,handleCreateAgent:Lc,copyAgentKey:Ac,deleteAgent:Bc,renderAgentAvatar:ja});let On=[],sn=[],Os=[],qs=[];function Na(){return On}function Tt(){return sn}function Dc(e){sn=e}async function qn(){try{On=await E.getMyTeams(),Ha()}catch(e){g(e.message,"error")}}function Ha(){const e=document.getElementById("team-list");On.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=On.map(t=>`
            <button class="dropdown-item" data-team-json="${S(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${h(t.name)}</button>
        `).join("")}async function Fs(e,t=!1){window.currentTeam=e,document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("team-description-text");n&&(n.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),qa(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function Us(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Oa(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function qa(){if(window.currentTeam)try{sn=await E.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function zs(){if(window.currentTeam)try{sn=await E.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Fa()}catch(e){g(e.message,"error")}}function Fa(){const e=document.getElementById("team-members-list");e.innerHTML=sn.map(t=>`
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
                    <button class="btn btn-danger btn-small" onclick="removeMember('${$(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function Fn(){if(window.currentTeam)try{Os=await E.getTeamInvitations(window.currentTeam.id),Ua()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Ua(){const e=document.getElementById("team-invitations-list");if(Os.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=Os.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${h(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${h(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${$(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function za(){if(window.currentTeam)try{qs=await E.getTeamAgents(window.currentTeam.id),Ga()}catch(e){g(e.message,"error")}}function Ga(){const e=document.getElementById("team-agents-list");if(e){if(qs.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=qs.map(t=>{const n=h(t.name),s=h(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Gs(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,D()}async function Mc(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await E.createInvitation(window.currentTeam.id,t,n),await Fn(),j(),g("Invitation sent!","success")}catch(s){g(s.message,"error")}return!1}async function jc(e){if(confirm("Are you sure you want to remove this member?"))try{await E.removeMember(window.currentTeam.id,e),await zs(),g("Member removed!","success")}catch(t){g(t.message,"error")}}async function Rc(e){try{await E.deleteInvitation(window.currentTeam.id,e),await Fn(),g("Invitation canceled!","success")}catch(t){g(t.message,"error")}}function Ws(){Us(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,D()}function Wa(){window.currentTeam&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
    `,D())}async function Pc(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await E.createTeam(t);await qn(),await Fs(n),j(),g("Team created!","success")}catch(n){g(n.message,"error")}return!1}async function Nc(e){if(e.preventDefault(),!window.currentTeam)return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await E.updateTeam(window.currentTeam.id,t);window.currentTeam=n,document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await qn(),j(),g("Team updated!","success")}catch(n){g(n.message,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:qn,renderTeamList:Ha,selectTeam:Fs,toggleTeamDropdown:Us,toggleUserDropdown:Oa,loadTeamMembersQuiet:qa,loadTeamMembers:zs,renderTeamMembers:Fa,loadTeamInvitations:Fn,renderTeamInvitations:Ua,loadTeamAgents:za,renderTeamAgents:Ga,showInviteModal:Gs,handleInvite:Mc,removeMember:jc,deleteInvitation:Rc,showCreateTeamModal:Ws,showEditTeamModal:Wa,handleCreateTeam:Pc,handleUpdateTeam:Nc,getTeams:Na,getMembers:Tt,setMembers:Dc});let z=[];const an={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function se(){return z}function Hc(e){z=e}function Un(e){const t=z.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return an[n]||an.fibonacci}function zn(e,t){if(!e)return"No estimate";const s=Un(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Ka(e){const t=z.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(an[n]||an.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function be(){if(window.currentTeam)try{z=await E.getProjects(window.currentTeam.id),Va()}catch(e){g(e.message,"error")}}function Va(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=e==null?void 0:e.value,a=t==null?void 0:t.value,o=n==null?void 0:n.value,r=s==null?void 0:s.value,c='<option value="">All Projects</option>'+z.map(m=>`<option value="${m.id}">${h(m.name)}</option>`).join(""),l='<option value="">Select Project</option>'+z.map(m=>`<option value="${m.id}">${h(m.name)}</option>`).join(""),d=Ks();if(e){e.innerHTML=c;let m=i;if(!m||!z.some(p=>p.id===m))if(d&&z.some(p=>p.id===d))m=d;else{const f=new URLSearchParams(window.location.search).get("project");f&&z.some(b=>b.id===f)?m=f:z.length>0&&(m=z[0].id)}m&&(e.value=m,localStorage.setItem("chaotic_last_project",m))}if(t){t.innerHTML=l;const m=a||d;m&&z.some(p=>p.id===m)&&(t.value=m)}if(n){n.innerHTML=l;const m=o||d;m&&z.some(p=>p.id===m)&&(n.value=m)}s&&(s.innerHTML=c,r&&z.some(m=>m.id===r)&&(s.value=r))}function Ks(){return localStorage.getItem("chaotic_last_project")}function on(e){if(!e)return;localStorage.setItem("chaotic_last_project",e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function rn(){const e=document.getElementById("projects-list");if(z.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=z.map(t=>`
        <div class="grid-item" onclick="viewProject('${$(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ge(t.color)}20; color: ${ge(t.color)}">
                    ${h(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${h(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${$(t.id)}')" title="Project settings">
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
    `,D()}async function qc(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await E.createProject(window.currentTeam.id,t),await be(),rn(),j(),g("Project created!","success")}catch(n){g(n.message,"error")}return!1}function Fc(e){const t=z.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateProject(event, '${$(t.id)}')">
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
                <button type="button" class="btn btn-danger-outline" onclick="confirmDeleteProject('${$(t.id)}')">Delete Project</button>
            </div>
        </form>
    `,D()}async function Uc(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await E.updateProject(t,n),await be(),rn(),j(),g("Project updated!","success")}catch(s){g(s.message,"error")}return!1}async function zc(e){const t=z.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await E.deleteProject(e),await be(),rn(),j(),g("Project deleted","success")}catch(n){g(n.message,"error")}}let ye=null;async function Ja(e){ye=e,z.length===0&&await be();const t=z.find(n=>n.id===e);if(!t){g("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Za("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Za(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Pe||Pe.length===0)&&It()}function Ya(){ye=null,Pe=[]}function Xa(e){ye=e}function Qa(){return Pe}async function Gc(){if(!ye)return;const e=document.getElementById("ps-name").value.trim();if(!e){g("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await E.updateProject(ye,t),await be(),g("Settings saved","success");const n=z.find(s=>s.id===ye);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){g(n.message,"error")}}async function Wc(){if(!ye)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await E.updateProject(ye,n),await be(),g("Settings saved","success")}catch(s){g(s.message,"error")}}let Pe=[];async function It(){if(ye)try{Pe=await E.getRituals(ye),Kc(),typeof window._onRitualsChanged=="function"&&window._onRitualsChanged()}catch(e){g(e.message,"error")}}function Kc(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Pe.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=Pe.filter(s=>s.trigger==="ticket_close"),n=Pe.filter(s=>s.trigger==="ticket_claim");xt("ps-sprint-rituals-list",e,"sprint"),xt("ps-close-rituals-list",t,"close"),xt("ps-claim-rituals-list",n,"claim")}function xt(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>S(a||"auto");s.innerHTML=t.map(a=>`
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
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${$(a.id)}')">Edit</button>
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
  `,D())}async function Jc(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}const n={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,conditions:t};try{await E.createRitual(ye,n),await It(),j(),g("Ritual created!","success")}catch(s){g(s.message,"error")}return!1}function Zc(e){const t=Pe.find(n=>n.id===e);t&&(document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${$(e)}')">
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
  `,D())}async function Yc(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,conditions:n};try{await E.updateRitual(t,s),await It(),j(),g("Ritual updated!","success")}catch(i){g(i.message,"error")}return!1}async function Xc(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await E.deleteRitual(e),await It(),g("Ritual deleted","success")}catch(n){g(n.message,"error")}}Object.assign(window,{loadProjects:be,updateProjectFilters:Va,getSavedProjectId:Ks,setGlobalProjectSelection:on,renderProjects:rn,viewProject:Oc,showCreateProjectModal:Vs,handleCreateProject:qc,viewProjectSettings:Ja,switchProjectSettingsTab:Za,saveProjectSettingsGeneral:Gc,saveProjectSettingsRules:Wc,clearProjectSettingsState:Ya,showEditProjectModal:Fc,handleUpdateProject:Uc,confirmDeleteProject:zc,getEstimateOptions:Un,formatEstimate:zn,getEstimateScaleHint:Ka,getProjects:se,setProjects:Hc,ESTIMATE_SCALES:an,showCreateProjectRitualModal:Vc,handleCreateProjectRitual:Jc,showEditProjectRitualModal:Zc,handleUpdateProjectRitual:Yc,deleteProjectRitual:Xc,setCurrentSettingsProjectId:Xa,getProjectRituals:Qa,loadProjectSettingsRituals:It});const Gn={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Wn={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let eo=0;function Qc(e){eo=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=to(i,a,s)}return`
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
    `}function ed(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",to()),Kn()}function td(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Kn()}function nd(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Gn[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Wn[o]}</option>`).join(""),no(e),Kn()}function no(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function ln(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Kn(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function sd(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw ln("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw ln("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const m=`${r}__${c}`;if(n.has(m))throw ln(`Duplicate condition: ${r} ${Wn[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${m}`);if(n.add(m),c==="isnull")t[m]=!0;else if(c==="in"||c==="contains")t[m]=d?d.split(",").map(p=>p.trim()).filter(p=>p):[];else if(c==="gte"||c==="lte"){if(!d)throw ln(`Please enter a numeric value for ${r} ${Wn[c]}.`),new Error(`Missing numeric value for ${m}`);const p=parseInt(d,10);if(isNaN(p))throw ln(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${m}: ${d}`);t[m]=p}else t[m]=d}return Kn(),Object.keys(t).length>0?t:null}function id(e){if(typeof window.escapeHtml=="function")return window.escapeHtml(e);const t=document.createElement("div");return t.textContent=e,t.innerHTML}function ad(e){return typeof window.escapeAttr=="function"?window.escapeAttr(e):id(e)}Object.assign(window,{renderConditionBuilder:Qc,addConditionRow:ed,removeConditionRow:td,updateOperatorOptions:nd,toggleValueInput:no,collectConditions:sd});function so(e){if(!e)return"";const t=new Date(e),s=new Date-t,i=Math.floor(s/6e4),a=Math.floor(i/60),o=Math.floor(a/24);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function od(e,t,n,s,i,a,o,r){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${h(i)}</span>
                    <span class="gate-approval-issue-title">${h(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${$(t)}')">View full ticket details →</a>
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
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{rd(c,e,t,n)}),D()}async function rd(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await E.completeTicketGateRitual(t,n,i||null),g(`GATE ritual "${s}" approved!`,"success"),j(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(a){g(a.message,"error")}}function io(e,t,n,s,i,a,o,r){od(e,t,n,s,i,a,o,r)}function ld(e,t,n,s,i,a,o,r,c){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${h(i)}</span>
                    <span class="gate-approval-issue-title">${h(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${$(t)}')">View full ticket details →</a>
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
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{cd(l,e,t,n)}),D()}async function cd(e,t,n,s){e.preventDefault();try{await E.approveTicketRitual(t,n),g(`Review ritual "${s}" approved!`,"success"),j(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(i){g(i.message,"error")}}function dd(e,t,n,s,i,a,o,r,c){ld(e,t,n,s,i,a,o,r,c)}window.completeGateFromList=io,window.approveReviewFromList=dd;let Js=[];async function Zs(){try{Js=await E.getApiKeys(),ud()}catch(e){g(e.message,"error")}}function ud(){const e=document.getElementById("api-keys-list");if(e){if(Js.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=Js.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${h(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${h(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Ms(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ms(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${$(t.id)}', '${$(t.name)}')">Revoke</button>
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
    `,D()}async function pd(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await E.createApiKey(t);j(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,D()}catch(n){g(n.message,"error")}return!1}async function oo(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),g("API key copied to clipboard","success")}catch{g("Failed to copy","error")}}async function ro(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await E.revokeApiKey(e),g("API key revoked","success"),await Zs()}catch(n){g(n.message,"error")}}window.loadApiKeys=Zs,window.showCreateApiKeyModal=ao,window.handleCreateApiKey=pd,window.copyApiKey=oo,window.revokeApiKey=ro;let Vn=!1,Ne=0,Ye=[],Jn=[];function md(e){Jn=e,Ye=[...e]}function lo(){return Vn}function gd(){if(Vn)return;Vn=!0,Ne=0,Ye=[...Jn];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Zn()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>fd(n.target.value)),t.addEventListener("keydown",vd),cn(),requestAnimationFrame(()=>t.focus())}function Zn(){Vn=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function fd(e){const t=e.toLowerCase().trim();t?Ye=Jn.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Ye=[...Jn],Ne=0,cn()}function cn(){const e=document.getElementById("command-results");if(!e)return;if(Ye.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Ye.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function hd(e){Ne=e,cn()}function co(e){const t=Ye[e];t&&(Zn(),t.action())}function vd(e){switch(e.key){case"ArrowDown":e.preventDefault(),Ne=Math.min(Ne+1,Ye.length-1),cn();break;case"ArrowUp":e.preventDefault(),Ne=Math.max(Ne-1,0),cn();break;case"Enter":e.preventDefault(),co(Ne);break;case"Escape":e.preventDefault(),Zn();break}}window.selectCommand=hd,window.executeCommand=co;let dn=[],Ys=[],He={getCurrentUser:()=>null,getCurrentTeam:()=>null,renderIssueRow:()=>"",formatActivityText:()=>"",formatActivityActor:()=>"",getActivityIcon:()=>"📝",navigateToIssueByIdentifier:()=>{},viewDocument:()=>{}};function bd(e){He={...He,...e}}function Yn(){return dn}function un(e){dn=e}async function Xs(){var s;const e=He.getCurrentTeam(),t=He.getCurrentUser();if(!e||!t)return;const n=(s=document.getElementById("my-issues-status-filter"))==null?void 0:s.value;wd();try{dn=await E.getTeamIssues(e.id,{assignee_id:t.id,status:n||void 0,limit:1e3}),pn()}catch(i){g(i.message,"error")}}async function _t(){const e=He.getCurrentTeam();if(!e)return;const t=document.getElementById("dashboard-activity-list");t&&(t.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{Ys=await E.getTeamActivities(e.id,0,10),yd()}catch{t&&(t.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function yd(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Ys.length){e.innerHTML='<div class="activity-empty">No activity yet</div>';return}e.innerHTML=Ys.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${$(t.issue_identifier)}'); return false;"><strong>${h(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${$(t.document_id)}'); return false;"><strong>${s} ${h(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${h(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${He.getActivityIcon(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${He.formatActivityText(t)}${n}</span>
                <span class="activity-actor">by ${h(He.formatActivityActor(t))}</span>
                <span class="activity-time">${jn(t.created_at)}</span>
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
    `).join(""))}function uo(){Xs()}function pn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),dn.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=dn.map(t=>He.renderIssueRow(t)).join("")}}window.filterMyIssues=uo;let Se=null,Oe=0,St=null,Ct=null,mn=null,Qs=!1;function po(){try{return localStorage.getItem("chaotic_onboarding_complete")==="true"}catch{return!1}}function mo(){try{localStorage.setItem("chaotic_onboarding_complete","true")}catch{}}function go(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function kd(){Se||(Se=document.createElement("div"),Se.id="onboarding-overlay",Se.className="onboarding-overlay",document.getElementById("app").appendChild(Se))}function gn(){if(!Se)return;const e=Qs?ho():fo(),t=e[Oe],n=e.map((s,i)=>`<span class="onboarding-dot${i===Oe?" active":""}${i<Oe?" completed":""}"></span>`).join("");Se.innerHTML=`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&St&&(e.textContent=`${St.name} (${St.key})`),t&&Ct&&(t.textContent=`${Ct.name} (${Ct.key})`),n&&mn&&(n.textContent=`${mn.identifier} - ${mn.title}`)}}]}function ho(){const e='<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';return[{html:`
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
            `}]}function ei(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ti(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Lt(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=Qs?ho():fo();Oe<e.length-1&&(Oe++,gn())},window._onboardingSkip=function(){mo(),si(),window.initApp&&window.initApp()},window._onboardingFinish=function(){mo(),si(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),ti("onboarding-team-error"),Lt("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{St=await api.createTeam({name:t,key:n}),Oe++,gn()}catch(s){ei("onboarding-team-error",s.message||"Failed to create team"),Lt("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),ti("onboarding-project-error"),Lt("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Ct=await api.createProject(St.id,{name:t,key:n}),Oe++,gn()}catch(s){ei("onboarding-project-error",s.message||"Failed to create project"),Lt("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),ti("onboarding-issue-error"),Lt("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{mn=await api.createIssue(Ct.id,{title:t}),Oe++,gn()}catch(n){ei("onboarding-issue-error",n.message||"Failed to create issue"),Lt("onboarding-issue-submit",!1)}};function ni(e=!1){Qs=e,Oe=0,St=null,Ct=null,mn=null,kd(),gn()}function si(){Se&&(Se.remove(),Se=null)}function ii(){try{localStorage.removeItem("chaotic_onboarding_complete")}catch{}ni(!0)}window.showOnboarding=ni,window.hideOnboarding=si,window.resetOnboarding=ii,window.hasCompletedOnboarding=po;let Ee={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null}};const $d=new Set;function dt(e,t){if(typeof e=="string"){const n=Ee[e];Ee[e]=t,vo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=Ee[s];Ee[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{vo(s,i,a)})}}function vo(e,t,n){t!==n&&$d.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const ai=()=>Ee.currentUser,Ed=e=>dt("currentUser",e),P=()=>Ee.currentView,Td=e=>dt("currentView",e),qe=()=>Ee.issues,Fe=e=>dt("issues",e),bo=()=>Ee.activeFilterCategory,Id=e=>dt("activeFilterCategory",e),xd=()=>Ee.selectedIssueIndex,yo=e=>dt("selectedIssueIndex",e),_d=()=>Ee.pendingGates,Sd=e=>dt("pendingGates",e),Cd=()=>Ee.searchDebounceTimer,Ld=e=>dt("searchDebounceTimer",e);function At(){const t=new URLSearchParams(window.location.search).get("project");return t||Ks()}function oi(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let Bt=[],Xn={},Qn=new Set,Ue=null,wo=null,ko=[],$o=[];function Ad(){return Xn}function Bd(){return Ue}function Eo(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=At();t&&se().some(n=>n.id===t)&&(e.value=t)}e.value?Xe(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function Dd(){const e=document.getElementById("sprint-project-filter").value;e&&(on(e),oi(e)),Xe(e)}async function Xe(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){Vd();try{await E.getCurrentSprint(t),Bt=await E.getSprints(t),Md(),await es()}catch(n){g(n.message,"error")}}}function Md(){const e=document.getElementById("sprints-list");if(!e)return;const t=Bt.find(a=>a.status==="active"),n=Bt.find(a=>a.status==="planned"),s=Bt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 onclick="viewSprint('${$(t.id)}')" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${G(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${$(t.id)}', '${$(t.name)}', ${t.budget||"null"}, '${$(t.project_id)}')">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${$(t.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=jd(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="viewSprint('${$(n.id)}')" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${G(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${$(n.id)}', '${$(n.name)}', ${n.budget||"null"}, '${$(n.project_id)}')">Edit Budget</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" onclick="viewSprint('${$(a.id)}')" style="cursor: pointer;">
                            <span class="sprint-history-name">${G(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||'<div class="empty-state"><p>Loading sprints...</p></div>'}function jd(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((W,Te,ae)=>Math.min(Math.max(W,Te),ae))((new Date-o)/(r-o),0,1),m=360,p=120,f=16,b=f,T=m-f,_=f,C=p-f,N=W=>s===0?C:_+(1-W/s)*(C-_),O=N(s),B=N(0),J=b+(T-b)*d,y=N(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${ts(e.start_date)} → ${ts(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${m} ${p}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${O}" x2="${T}" y2="${B}" class="burndown-ideal" />
                <line x1="${b}" y1="${O}" x2="${J}" y2="${y}" class="burndown-actual" />
                <circle cx="${J}" cy="${y}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function ri(e,t=!0){try{const n=await E.getSprint(e);if(!n){g("Sprint not found","error"),window.navigateTo("sprints");return}wo=n;const[s,i]=await Promise.all([E.getIssues({sprint_id:e,limit:500}),E.getSprintTransactions(e).catch(()=>[])]);ko=s,$o=i,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Pd()}catch(n){console.error("Failed to load sprint:",n),g("Failed to load sprint","error"),window.navigateTo("sprints")}}async function Rd(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){g("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await ri(e,!1)}catch{window.navigateTo("sprints",!1)}}function Pd(){const e=wo,t=ko;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(d=>s.includes(d.status)),a=t.filter(d=>d.status==="done"),o=t.reduce((d,m)=>d+(m.estimate||0),0),r=a.reduce((d,m)=>d+(m.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const l=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" onclick="navigateTo('sprints')">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${G(e.name)}</h2>
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
                ${Nd()}
            </div>
        </div>
    `}function To(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" onclick="viewIssue('${$(e.id)}')">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${G(e.identifier)}</span>
            <span class="sprint-issue-title">${G(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${Yd(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Nd(){const e=$o;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${G(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${G(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${Hd(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Hd(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Od(e,t,n,s){const i=s?Ka(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateBudget(event, '${$(e)}', '${$(s)}')">
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${i?`<small class="form-hint">${G(i)}</small>`:""}
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
    `,D()}async function qd(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await E.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const c=Bt.filter(l=>l.status==="planned"&&l.id!==t);for(const l of c)await E.updateSprint(l.id,{budget:i})}a==="default"&&n&&await E.updateProject(n,{default_sprint_budget:i}),await Xe(),j(),g(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){g(r.message,"error")}return!1}async function Fd(e){const t=Bt.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,D();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[c,l]=await Promise.all([E.getIssues({sprint_id:e,limit:500}),E.getRituals(t.project_id)]);s=c.filter(d=>n.includes(d.status)).length,i=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${G(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${$(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function Ud(e){try{const t=await E.closeSprint(e);await Xe(),t.limbo?Gd(t):g("Sprint completed!","success")}catch(t){g(t.message,"error")}}async function es(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{Ue=await E.getLimboStatus(e),zd()}catch(n){console.error("Failed to load limbo status:",n)}}function zd(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Ue||!Ue.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Ue.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Gd(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${G(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" onclick="closeModal(); loadLimboStatus();">Got it</button>
        </div>
    `,D(),Wd(t)}async function Wd(e){try{const t=await E.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${G(s.name)} <span class="ritual-mode">(${G(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(s.prompt):G(s.prompt)}</div>
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
                            <strong>${G(i.name)}</strong>
                            <span class="badge badge-ritual-${Zd(i.approval_mode)}">${G(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(i.prompt):G(i.prompt)}</div>
                        ${ci(i.attestation)}
                        ${Kd(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((s=Ue.completed_rituals)==null?void 0:s.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Ue.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${G(i.name)}</div>
                            ${ci(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,D()}function ci(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${G(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${G(jn(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${window.renderMarkdown?window.renderMarkdown(e.note):G(e.note)}</div>
        </div>
    `}function Kd(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" onclick="approveRitual('${$(e.id)}', '${$(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${$(e.id)}', '${$(t)}', '${$(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Io(e){for(const t of e)if(!Qn.has(t))try{(await E.getSprints(t)).forEach(s=>{Xn[s.id]=s}),Qn.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Vd(){Xn={},Qn=new Set}function Jd(e,t){t.forEach(n=>{Xn[n.id]=n}),Qn.add(e)}function G(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Zd(e){return e?G(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;"):""}function ts(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Yd(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}const xo=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Qe=[],di=null,Y={api:null,showToast:()=>{},getProjects:()=>[],getProjectFromUrl:()=>null,setGlobalProjectSelection:()=>{},updateUrlWithProject:()=>{},escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,formatPriority:e=>e};function Xd(e){Y={...Y,...e}}function ui(){const e=document.getElementById("board-project-filter");if(!e)return;const t=Y.getProjects();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${Y.escapeHtml(n.name)}</option>`).join(""),!e.value){const n=Y.getProjectFromUrl();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)pi(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function Qd(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(Y.setGlobalProjectSelection(e),Y.updateUrlWithProject(e)),pi(e)}async function pi(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){ui();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{Qe=await Y.api.getIssues({project_id:t}),et()}catch(i){Y.showToast(i.message,"error")}}function et(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=xo.map(t=>{const n=Qe.filter(s=>s.status===t.key);return`
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
        `}).join(""))}function eu(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),di=e.target.dataset.id,e.target.classList.add("dragging")}function tu(e){e.target.classList.remove("dragging"),di=null}function nu(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function su(e){e.currentTarget.classList.remove("drag-over")}function iu(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function au(e){e.currentTarget.classList.remove("drag-over")}async function ou(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=Qe.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,_o(n,t),et(),i!==n)try{await Y.api.updateIssue(t,{status:n}),Y.showToast("Status updated","success")}catch(a){s.status=i,et(),Y.showToast(a.message,"error")}}async function ru(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=di||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=Qe.find(r=>r.id===t);if(!a)return;const o=a.status;if(a.status=i,_o(i,t,n),et(),o!==i)try{await Y.api.updateIssue(t,{status:i}),Y.showToast("Status updated","success")}catch(r){a.status=o,et(),Y.showToast(r.message,"error")}}function _o(e,t,n=null){const s=Qe.filter(o=>o.status===e&&o.id!==t),i=Qe.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];xo.forEach(o=>{o.key===e?a.push(...s):a.push(...Qe.filter(r=>r.status===o.key))}),Qe=a}const So=["backlog","todo","in_progress","in_review","done","canceled"],Co=["urgent","high","medium","low","no_priority"],Lo=["task","bug","feature","chore","docs"];let L={getIssues:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatEstimate:()=>"",getSprintCache:()=>({}),formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",escapeHtml:e=>e||"",escapeAttr:e=>e||"",escapeJsString:e=>e||"",sanitizeColor:e=>e||"#888",renderAvatar:()=>"",getAssigneeOptionList:()=>[],getGroupByValue:()=>""};function lu(e){L={...L,...e}}function ze(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=L.getIssues();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=L.getGroupByValue();n==="status"?cu(e,t):n==="priority"?du(e,t):n==="type"?uu(e,t):n==="assignee"?pu(e,t):n==="sprint"?mu(e,t):e.innerHTML=t.map(s=>Ce(s)).join("")}function cu(e,t){const n={};So.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s="";So.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${nt(i)}</span>
                    <span class="group-title">${L.formatStatus(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ce(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function du(e,t){const n={};Co.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s="";Co.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${tt(i)}</span>
                    <span class="group-title">${L.formatPriority(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ce(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function uu(e,t){const n={};Lo.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s="";Lo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
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
                    ${a.map(o=>Ce(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function pu(e,t){const n={},s="__unassigned__";n[s]=[];const i=L.getAssigneeOptionList();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a="";n[s].length>0&&(a+=`
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
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=L.formatAssigneeName(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" onclick="toggleGroup('${L.escapeJsString(o.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${L.renderAvatar(o,"avatar-small")}</span>
                    <span class="group-title">${L.escapeHtml(c)}${L.escapeHtml(l)}</span>
                    <span class="group-count">${r.length}</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Ce(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function mu(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=L.getSprintCache();i.sort((c,l)=>{const d=o[c],m=o[l],p=d?a[d.status]??3:3,f=m?a[m.status]??3:3;return p-f});let r="";i.forEach(c=>{const l=s[c];if(l.length===0)return;const d=o[c],m=d?d.name:c,p=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",f=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
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
                    ${l.map(b=>Ce(b)).join("")}
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
        `),e.innerHTML=r}function gu(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Ce(e){const t=e.assignee_id?L.getAssigneeById(e.assignee_id):null,n=t?L.formatAssigneeName(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?L.formatEstimate(e.estimate,e.project_id):"",a=e.sprint_id?L.getSprintCache()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${L.escapeAttr(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${L.escapeAttr(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${L.escapeJsString(e.id)}')" title="Priority: ${L.formatPriority(e.priority)}">
                    ${tt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${L.escapeJsString(e.id)}')" title="Status: ${L.formatStatus(e.status)}">
                    ${nt(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${L.formatIssueType(e.issue_type)}</span>
                <span class="issue-title" onclick="viewIssue('${L.escapeJsString(e.id)}')">${L.escapeHtml(e.title)}</span>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${L.sanitizeColor(r.color)}20; color: ${L.sanitizeColor(r.color)}">${L.escapeHtml(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${L.escapeJsString(e.id)}')" title="Sprint: ${o?L.escapeHtml(o):"None"}">
                    ${o?`<span class="sprint-badge">${L.escapeHtml(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
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
    `}function tt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function nt(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}function fu(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Ao)},0))}function Ao(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Ao))}function ut(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function pt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function mt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function mi(){const e=ut(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Ze(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Ge(),fe(),he()}function gi(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),mi()}function fi(){const e=pt(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=je(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Ge(),fe(),he()}function hi(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),fi()}function Bo(){var s,i;const e=mt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Ge(),fe(),he()}function vi(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Bo()}function Do(){var s,i;const e=mt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function hu(){const e=document.getElementById("label-filter-dropdown");if(!e||!window.currentTeam)return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(window.currentTeam.id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${ge(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${h(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Mo(){var m,p,f,b,T;const e=new URLSearchParams,t=ut(),n=pt(),s=mt(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(p=document.getElementById("project-filter"))==null?void 0:p.value,o=(f=document.getElementById("sprint-filter"))==null?void 0:f.value,r=(b=document.getElementById("issue-type-filter"))==null?void 0:b.value,c=(T=document.getElementById("group-by-select"))==null?void 0:T.value;t.forEach(_=>e.append("status",_)),n.forEach(_=>e.append("priority",_)),s.forEach(_=>e.append("label",_)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),c&&e.set("groupBy",c);const l=e.toString(),d=l?`/issues?${l}`:"/issues";history.replaceState({view:"issues"},"",d)}function vu(){const e=new URLSearchParams(window.location.search),t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=t.includes(m.value)}),bu())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=n.includes(m.value)}),yu())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const o=e.get("issue_type");if(o){const l=document.getElementById("issue-type-filter");l&&(l.value=o)}const r=e.getAll("label");if(r.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=r.includes(m.value)}),Do())}const c=e.get("groupBy");if(c){const l=document.getElementById("group-by-select");l&&(l.value=c)}}function bu(){const e=ut(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Ze(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function yu(){const e=pt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=je(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const jo=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function wu(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Dt)):(t.classList.remove("hidden"),we(),ke(bo()),setTimeout(()=>{document.addEventListener("click",Dt)},0))}function ku(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Dt)):(t.classList.remove("hidden"),Ou(),setTimeout(()=>{document.addEventListener("click",Dt)},0))}function Dt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Dt))}function Ro(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Dt)}function Po(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return ut().length;case"priority":return pt().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return mt().length;default:return 0}}function $u(){let e=0;return jo.forEach(t=>{e+=Po(t.key)}),e}function we(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=jo.map(t=>{const n=Po(t.key);return`
            <div class="filter-menu-category ${bo()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function ke(e){Id(e),we();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":Eu(t);break;case"status":Tu(t);break;case"priority":Iu(t);break;case"type":xu(t);break;case"assignee":_u(t);break;case"sprint":Su(t);break;case"labels":Cu(t);break}}function Eu(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=se()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" onclick="clearProjectFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setProjectFilter('')">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setProjectFilter('${$(a.id)}')">
                <input type="radio" name="project-filter-radio" value="${S(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ge(a.color)};"></span>
                <span class="filter-option-label">${h(a.name)}</span>
            </label>
        `}),e.innerHTML=i}function Tu(e){const t=ut(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function Iu(e){const t=pt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function xu(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setTypeFilter('${a.value}')">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function _u(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Tt()||[];let i=`
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
            <label class="filter-option" onclick="setAssigneeFilter('${$(a.user_id)}')">
                <input type="radio" name="assignee-filter-radio" value="${S(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${h(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Su(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${$(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${S(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${h(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function Cu(e){const t=mt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${S(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${$(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ge(d)};"></span>
                    <span class="filter-option-label">${h(l)}</span>
                </label>
            `}),e.innerHTML=i}function No(e){const t=document.getElementById("project-filter");t&&(t.value=e,Uo()),we(),ke("project"),fe(),he()}function Lu(){No("")}function Au(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,mi()),we(),ke("status")}function Bu(){gi(),we(),ke("status"),fe(),he()}function Du(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,fi()),we(),ke("priority")}function Mu(){hi(),we(),ke("priority"),fe(),he()}function Ho(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ge()),we(),ke("type"),fe(),he()}function ju(){Ho("")}function Oo(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ge()),we(),ke("assignee"),fe(),he()}function Ru(){Oo("")}function qo(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ge()),we(),ke("sprint"),fe(),he()}function Pu(){qo("")}function Nu(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Bo()),we(),ke("labels")}function Hu(){vi(),we(),ke("labels"),fe(),he()}function Ou(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function qu(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,gt()),Ro()}function Fu(e){const t=document.getElementById("group-by-select");t&&(t.value=e,zo()),Ro()}function fe(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const m=(se()||[]).find(p=>p.id===n.value);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=ut();if(s.length>0){const d=s.map(m=>Ze(m)).join(", ");t.push({category:"status",label:"Status",value:d,clearFn:"clearStatusFilterNew()"})}const i=pt();if(i.length>0){const d=i.map(m=>je(m)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");a!=null&&a.value&&t.push({category:"type",label:"Type",value:a.value.charAt(0).toUpperCase()+a.value.slice(1),clearFn:"clearTypeFilter()"});const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;if(o.value==="me")d="Me";else if(o.value==="unassigned")d="Unassigned";else{const p=(Tt()||[]).find(f=>f.user_id===o.value);d=(p==null?void 0:p.name)||(p==null?void 0:p.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:d,clearFn:"clearAssigneeFilter()"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const d=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||r.value,clearFn:"clearSprintFilter()"})}const c=mt();if(c.length>0){const d=document.getElementById("label-filter-dropdown"),m=c.map(p=>{var T;const f=d==null?void 0:d.querySelector(`input[value="${p}"]`),b=(T=f==null?void 0:f.closest("label"))==null?void 0:T.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(d=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${h(d.value)}</span>
            <button class="filter-chip-remove" onclick="${d.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=l}function Uu(){const e=document.getElementById("project-filter");e&&(e.value=""),gi(),hi();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),vi(),Ge(),fe(),he()}function he(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=$u();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function zu(){fe(),he();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function Fo(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||bi(null),t)try{const a=await api.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${h(o.name)})</option>`),bi(o||null),a.forEach(r=>{const c=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${h(r.name)}${c}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function bi(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${h(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${h(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function gt(){var m,p,f,b,T,_;if(yo(-1),!window.currentTeam)return;const e=document.getElementById("project-filter").value,t=ut(),n=pt(),s=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,i=(f=(p=document.getElementById("issue-search"))==null?void 0:p.value)==null?void 0:f.trim();if(!e&&se().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}Wu();const a={limit:1e3},o=((b=document.getElementById("sort-by-select"))==null?void 0:b.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=ai().id:a.assignee_id=s);const l=(T=document.getElementById("sprint-filter"))==null?void 0:T.value;if(l)if(l==="current"){if(e)try{const N=(await api.getSprints(e)).find(O=>O.status==="active");N&&(a.sprint_id=N.id)}catch(C){console.error("Failed to resolve current sprint:",C)}}else a.sprint_id=l;const d=(_=document.getElementById("issue-type-filter"))==null?void 0:_.value;d&&(a.issue_type=d),i&&i.length>=2&&(a.search=i);try{let C;e?(a.project_id=e,C=await api.getIssues(a)):se().length>0&&(C=await api.getTeamIssues(window.currentTeam.id,a));const N=mt();N.length>0&&(C=C.filter(B=>!B.labels||B.labels.length===0?!1:B.labels.some(J=>N.includes(J.id)))),Fe(C);const O=[...new Set(C.map(B=>B.project_id))];await Io(O),ze()}catch(C){g(C.message,"error")}}function Gu(){clearTimeout(Cd()),Ld(setTimeout(()=>{gt()},300))}function Wu(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Ge(){Mo(),gt()}async function Uo(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&on(e),await Fo(),ui(),Eo(),Ge()}async function zo(){if(Mo(),Go()==="sprint"){const e=qe(),t=[...new Set(e.map(n=>n.project_id))];await Io(t)}ze()}function Go(){const e=document.getElementById("group-by-select");return e?e.value:""}function Ku(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}const Wo=["backlog","todo","in_progress","in_review","done","canceled"],Ko=["no_priority","urgent","high","medium","low"],Vu=["task","bug","feature","chore","docs"];let st=[],Vo=Promise.resolve(),v={api:null,getIssues:()=>[],setIssues:()=>{},getMyIssues:()=>[],setMyIssues:()=>{},getCurrentDetailIssue:()=>null,setCurrentDetailIssue:()=>{},getLabels:()=>[],setLabels:()=>{},getCurrentTeam:()=>null,getCurrentDetailSprints:()=>[],closeAllDropdowns:()=>{},registerDropdownClickOutside:()=>{},setDropdownKeyHandler:()=>{},showToast:()=>{},getStatusIcon:()=>"",getPriorityIcon:()=>"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatAssigneeOptionLabel:e=>(e==null?void 0:e.name)||"",getAssigneeOptionList:()=>[],getAssigneeById:()=>null,getEstimateOptions:()=>[],renderAvatar:()=>"",renderIssueRow:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",updateSprintCacheForProject:()=>{},updateSprintBudgetBar:()=>{}};function Ju(e){v={...v,...e}}async function Jo(e,t,n){var d,m;e.preventDefault(),v.closeAllDropdowns();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Wo.map((p,f)=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${v.escapeJsString(n)}', 'status', '${p}')">
                    ${v.getStatusIcon(p)}
                    <span>${v.formatStatus(p)}</span>
                    <span class="dropdown-shortcut">${f+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Ko.map((p,f)=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${v.escapeJsString(n)}', 'priority', '${p}')">
                    ${v.getPriorityIcon(p)}
                    <span>${v.formatPriority(p)}</span>
                    <span class="dropdown-shortcut">${f}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Vu.map(p=>`
                <button class="dropdown-option" data-value="${p}" onclick="updateIssueField('${v.escapeJsString(n)}', 'issue_type', '${p}')">
                    <span class="issue-type-badge type-${p}">${v.formatIssueType(p)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const p=v.getAssigneeOptionList();a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" onclick="updateIssueField('${v.escapeJsString(n)}', 'assignee_id', null)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${p.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:p.map(({assignee:f,indent:b},T)=>`
                <button class="dropdown-option" onclick="updateIssueField('${v.escapeJsString(n)}', 'assignee_id', '${v.escapeJsString(f.id)}')">
                    ${v.renderAvatar(f,"avatar-small")}
                    <span>${v.formatAssigneeOptionLabel(f,b)}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const p=document.querySelector(`.issue-row[data-issue-id="${n}"]`),f=(p==null?void 0:p.dataset.projectId)||((d=v.getCurrentDetailIssue())==null?void 0:d.project_id),b=v.getEstimateOptions(f);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${b.map((T,_)=>`
                <button class="dropdown-option" onclick="updateIssueField('${v.escapeJsString(n)}', 'estimate', ${T.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${T.label}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const p=v.getIssues(),f=v.getMyIssues(),b=v.getCurrentDetailIssue(),T=p.find(ae=>ae.id===n)||f.find(ae=>ae.id===n)||b,_=new Set(((T==null?void 0:T.labels)||[]).map(ae=>ae.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const C=a.getBoundingClientRect();let N=i.bottom+4,O=i.left;O+C.width>window.innerWidth-8&&(O=i.right-C.width),N+C.height>window.innerHeight-8&&(N=i.top-C.height-4),a.style.top=`${N}px`,a.style.left=`${Math.max(8,O)}px`,v.registerDropdownClickOutside(a,{multiSelect:!0});let B=[];const J=v.getCurrentTeam();if(J)try{B=await v.api.getLabels(J.id)}catch(ae){console.error("Failed to load labels:",ae)}if(!a.parentNode)return;Xo(a,n,B,_);const y=a.getBoundingClientRect();let W=i.bottom+4,Te=i.left;Te+y.width>window.innerWidth-8&&(Te=i.right-y.width),W+y.height>window.innerHeight-8&&(W=i.top-y.height-4),a.style.top=`${W}px`,a.style.left=`${Math.max(8,Te)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const p=v.getIssues(),f=v.getMyIssues(),b=v.getCurrentDetailIssue(),T=p.find(oe=>oe.id===n)||f.find(oe=>oe.id===n)||b,_=(T==null?void 0:T.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const C=a.getBoundingClientRect();let N=i.bottom+4,O=i.left;O+C.width>window.innerWidth-8&&(O=i.right-C.width),N+C.height>window.innerHeight-8&&(N=i.top-C.height-4),a.style.top=`${N}px`,a.style.left=`${Math.max(8,O)}px`,v.registerDropdownClickOutside(a);let B=[];if(_)try{B=await v.api.getSprints(_),v.updateSprintCacheForProject(_,B)}catch(oe){console.error("Failed to load sprints:",oe)}if(!a.parentNode)return;const J=B.filter(oe=>oe.status!=="completed"||oe.id===(T==null?void 0:T.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${v.escapeJsString(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${J.map((oe,K)=>`
                <button class="dropdown-option" onclick="updateIssueField('${v.escapeJsString(n)}', 'sprint_id', '${v.escapeJsString(oe.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${v.escapeHtml(oe.name)}${oe.status==="active"?" (Active)":""}</span>
                    ${K<9?`<span class="dropdown-shortcut">${K+1}</span>`:""}
                </button>
            `).join("")}
        `;const y=a.getBoundingClientRect();let W=i.bottom+4,Te=i.left;Te+y.width>window.innerWidth-8&&(Te=i.right-y.width),W+y.height>window.innerHeight-8&&(W=i.top-y.height-4),a.style.top=`${W}px`,a.style.left=`${Math.max(8,Te)}px`,a.classList.remove("dropdown-positioning");const ae=oe=>{const K=oe.key;if(K==="Escape"){v.closeAllDropdowns(),document.removeEventListener("keydown",ae),v.setDropdownKeyHandler(null);return}const We=parseInt(K);if(isNaN(We))return;const jt=a.querySelectorAll(".dropdown-option");let ft=!1;We===0?(fn(n,"sprint_id",null),ft=!0):We>=1&&We<jt.length&&(jt[We].click(),ft=!0),ft&&(document.removeEventListener("keydown",ae),v.setDropdownKeyHandler(null))};v.setDropdownKeyHandler(ae),document.addEventListener("keydown",ae);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const o=a.getBoundingClientRect();let r=i.bottom+4,c=i.left;c+o.width>window.innerWidth-8&&(c=i.right-o.width),r+o.height>window.innerHeight-8&&(r=i.top-o.height-4),a.style.top=`${r}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const l=p=>{const f=p.key;if(f==="Escape"){v.closeAllDropdowns(),document.removeEventListener("keydown",l);return}const b=parseInt(f);if(isNaN(b))return;let T=!1;if(t==="status"&&b>=1&&b<=6)fn(n,"status",Wo[b-1]),T=!0;else if(t==="priority"&&b>=0&&b<=4)fn(n,"priority",Ko[b]),T=!0;else if(t==="estimate"){const _=v.getCurrentDetailIssue(),C=v.getEstimateOptions(_==null?void 0:_.project_id);b>=0&&b<C.length&&(fn(n,"estimate",C[b].value),T=!0)}T&&(document.removeEventListener("keydown",l),v.setDropdownKeyHandler(null))};v.setDropdownKeyHandler(l),document.addEventListener("keydown",l),v.registerDropdownClickOutside(a)}function Zo(e,t,n){e.stopPropagation(),Jo(e,t,n)}function Zu(e,t,n){Vo=Vo.then(()=>Yo(e,t,n))}async function Yo(e,t,n){const s=v.getIssues(),i=v.getMyIssues(),a=v.getCurrentDetailIssue(),o=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),c=r.indexOf(t);let l;if(c>=0?l=r.filter(d=>d!==t):l=[...r,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const m=(await v.api.updateIssue(e,{label_ids:l})).labels||[],p=s.findIndex(_=>_.id===e);p!==-1&&(s[p].labels=m,v.setIssues([...s]));const f=i.findIndex(_=>_.id===e);f!==-1&&(i[f].labels=m,v.setMyIssues([...i])),(a==null?void 0:a.id)===e&&v.setCurrentDetailIssue({...a,labels:m});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const _=s.find(C=>C.id===e)||i.find(C=>C.id===e);_&&(b.outerHTML=v.renderIssueRow(_))}const T=document.querySelector(".property-labels-btn");T&&(T.innerHTML=m.length>0?m.map(_=>`
                    <span class="issue-label" style="background: ${v.sanitizeColor(_.color)}20; color: ${v.sanitizeColor(_.color)}">${v.escapeHtml(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(v.showToast("Failed to update labels","error"),n){const d=c>=0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}}}function Xo(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleLabelCreateKey(event, '${v.escapeJsString(t)}')">
            <button class="btn btn-small" onclick="createLabelFromDropdown('${v.escapeJsString(t)}')">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-label-id="${i.id}" onclick="event.stopPropagation(); toggleIssueLabel('${v.escapeJsString(t)}', '${v.escapeJsString(i.id)}', this)">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${v.sanitizeColor(i.color)}20; color: ${v.sanitizeColor(i.color)}">${v.escapeHtml(i.name)}</span>
                </button>
            `}).join("")}
    `}async function Yu(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=v.getCurrentTeam();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await v.api.createLabel(s.id,{name:i}),o=await v.api.getLabels(s.id);v.setLabels(o),a!=null&&a.id&&await Yo(e,a.id,null);const r=v.getIssues(),c=v.getMyIssues(),l=v.getCurrentDetailIssue(),d=r.find(p=>p.id===e)||c.find(p=>p.id===e)||l,m=new Set(((d==null?void 0:d.labels)||[]).map(p=>p.id));t&&Xo(t,e,o,m),n.value=""}catch(a){v.showToast(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function ns(){const e=document.getElementById("create-issue-labels-label");e&&(st.length===0?e.textContent="Labels":e.textContent=`Labels (${st.length})`)}function yi(e){const t=v.getLabels();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=st.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${v.escapeJsString(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${v.sanitizeColor(n.color)}20; color: ${v.sanitizeColor(n.color)}">${v.escapeHtml(n.name)}</span>
                </button>
            `}).join("")}
    `}function Xu(e){const t=st.indexOf(e);t>=0?st.splice(t,1):st.push(e),ns();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&yi(n)}async function Qu(){const e=v.getCurrentTeam();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await v.api.createLabel(e.id,{name:s}),a=await v.api.getLabels(e.id);v.setLabels(a),i!=null&&i.id&&!st.includes(i.id)&&st.push(i.id),ns(),t&&yi(t),n.value=""}catch(i){v.showToast(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function fn(e,t,n){var i;v.closeAllDropdowns();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await v.api.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=v.getIssues(),c=r.findIndex(p=>p.id===e);c!==-1&&(r[c]=o,v.setIssues([...r]));const l=v.getMyIssues(),d=l.findIndex(p=>p.id===e);d!==-1&&(l[d]=o,v.setMyIssues([...l]));const m=v.getCurrentDetailIssue();if((m==null?void 0:m.id)===e&&v.setCurrentDetailIssue(o),s&&s.parentNode){const p=r.find(f=>f.id===e)||l.find(f=>f.id===e)||o;if(p){s.outerHTML=v.renderIssueRow(p);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);f&&(f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500))}}if(v.showToast("Issue updated","success"),t==="status"){const p=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(p)try{const b=(await v.api.getSprints(p)).find(T=>T.status==="active");v.updateSprintBudgetBar(b||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&ep(t,o)}}catch(a){v.showToast(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function ep(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${v.getStatusIcon(t.status)}
            <span>${v.formatStatus(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${v.getPriorityIcon(t.priority)}
            <span>${v.formatPriority(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${v.formatIssueType(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?v.getAssigneeById(t.assignee_id):null,l=c?v.formatAssigneeName(c):null;r.innerHTML=l?`${v.renderAvatar(c,"avatar-small")}<span>${v.escapeHtml(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=v.getCurrentDetailSprints(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?v.escapeHtml(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${v.formatEstimate(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}let it=!0,ss=null,w={api:null,getCurrentView:()=>"my-issues",showToast:()=>{},showModal:()=>{},closeModal:()=>{},navigateTo:()=>{},getProjects:()=>[],getMembers:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",renderMarkdown:e=>e,renderAvatar:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",showDetailDropdown:()=>{},setupMentionAutocomplete:()=>{},renderTicketRitualActions:()=>""};function tp(e){w={...w,...e}}function Qo(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function er(e){return e.user_name||e.user_email||"Unknown"}function tr(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":return"Added a comment";case"status_changed":return`Changed status from <strong>${w.formatStatus(t(e.old_value))}</strong> to <strong>${w.formatStatus(t(e.new_value))}</strong>`;case"priority_changed":return`Changed priority from <strong>${w.formatPriority(t(e.old_value))}</strong> to <strong>${w.formatPriority(t(e.new_value))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${e.sprint_name}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${e.sprint_name}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":return e.field_name?`Attested to <strong>${e.field_name}</strong>`:"Attested to ritual";case"updated":return e.field_name?`Updated ${n[e.field_name]||e.field_name}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||e.field_name}`:"Updated issue"}}function nr(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function np(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const m=d[1],p=document.createElement("a");p.href=`#/issue/${m}`,p.className="issue-link",p.textContent=m,o.appendChild(p),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const m=document.createElement("span");m.className="mention",m.textContent="@"+d[3],o.appendChild(m),r=d.index+d[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function sp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function ip(e){if(!e)return"";const t=w.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,nr(n,np),n.innerHTML}function sr(e){if(!e)return"";const t=w.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,nr(n,sp),n.innerHTML}function ir(e,t){const n=e.target;n.tagName==="A"||n.closest("a")||window.editDescription&&window.editDescription(t)}function ar(){it=!it;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",it),n&&n.classList.toggle("rotated",!it)}async function hn(e){try{ss=await w.api.getTicketRitualsStatus(e),ap(e)}catch(t){console.error("Failed to load ticket rituals:",t),ss=null}}function ap(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!ss){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=ss;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(it=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",it);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",!it);const r=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
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
    `}async function is(e){try{let t;e.includes("-")?t=await w.api.getIssueByIdentifier(e):t=await w.api.getIssue(e),t?await ee(t.id,!1):w.navigateTo("my-issues",!1)}catch{w.navigateTo("my-issues",!1)}}async function ee(e,t=!0){try{it=!0;const[n,s,i,a,o,r]=await Promise.all([w.api.getIssue(e),w.api.getComments(e),w.api.getActivities(e),w.api.getSubIssues(e),w.api.getRelations(e),w.api.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),c=(r.completed_rituals||[]).filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name})),l=[...s,...c].sort((y,W)=>new Date(y.created_at)-new Date(W.created_at)),d=[n.parent_id?w.api.getIssue(n.parent_id):Promise.resolve(null),w.api.getSprints(n.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[m,p]=await Promise.all(d),f=o.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),b=o.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),T=o.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:w.getCurrentView()},"",`/issue/${n.identifier}`),window.currentDetailIssue=n,window.currentDetailSprints=p,document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const _=document.getElementById("issue-detail-view");_.classList.remove("hidden");const C=w.getCurrentView()||"my-issues",N=w.getProjects().find(y=>y.id===n.project_id),O=n.assignee_id?w.getAssigneeById(n.assignee_id):null,B=O?w.formatAssigneeName(O):null,J=n.sprint_id?p.find(y=>y.id===n.sprint_id):null;_.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${C}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${N?w.escapeHtml(N.name):"Project"} › ${w.escapeHtml(n.identifier)}</span>
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
                            ${n.description?sr(n.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${f.length===0&&b.length===0&&T.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${b.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${b.map(y=>`
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
                            ${T.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${T.map(y=>`
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
                                    <div class="activity-icon">${Qo(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${tr(y)}</span>
                                        <span class="activity-actor">by ${w.escapeHtml(er(y))}</span>
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
                                ${B?`${w.renderAvatar(O,"avatar-small")}<span>${w.escapeHtml(B)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'sprint', '${w.escapeJsString(n.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${J?w.escapeHtml(J.name):'<span class="text-muted">No Sprint</span>'}</span>
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

                        ${N?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${w.escapeHtml(N.name)}</span>
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
        `,hn(n.id),w.setupMentionAutocomplete()}catch(n){w.showToast(n.message,"error")}}const at=new Map,or=6e4,wi=100;let ie=null,ki=null,$i=null,vn=null,rr=!1;const op={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},rp={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},lr={api:null};let Ei={...lr};function lp(e={}){Ei={...lr,...e},ie||(ie=document.createElement("div"),ie.className="issue-tooltip",ie.style.display="none",document.body.appendChild(ie),ie.addEventListener("mouseenter",()=>{clearTimeout(ki)}),ie.addEventListener("mouseleave",()=>{cr()})),rr||(document.addEventListener("mouseover",cp),document.addEventListener("mouseout",dp),rr=!0)}function cp(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=up(t);if(n){if(n===vn&&ie.style.display!=="none"){clearTimeout(ki);return}clearTimeout($i),$i=setTimeout(()=>{pp(t,n)},200)}}function dp(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout($i),ki=setTimeout(()=>{cr()},150))}function up(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function pp(e,t){vn=t;const n=e.getBoundingClientRect();ie.style.left=`${n.left+window.scrollX}px`,ie.style.top=`${n.bottom+window.scrollY+8}px`,ie.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ie.style.display="block";try{const s=await gp(t);if(vn!==t)return;fp(s)}catch{if(vn!==t)return;ie.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function cr(){ie&&(ie.style.display="none"),vn=null}function mp(){const e=Date.now();for(const[t,n]of at.entries())e-n.timestamp>=or&&at.delete(t)}async function gp(e){at.size>wi/2&&mp();const t=at.get(e);if(t&&Date.now()-t.timestamp<or)return t.issue;if(!Ei.api)throw new Error("API not initialized");const n=await Ei.api.getIssueByIdentifier(e);if(at.size>=wi){const s=Array.from(at.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,wi/2);for(const[a]of i)at.delete(a)}return at.set(e,{issue:n,timestamp:Date.now()}),n}function fp(e){const t=op[e.status]||"#6b7280",n=rp[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";ie.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${Ti(e.identifier)}</span>
            <span class="issue-tooltip-type">${Ti(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${Ti(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${hp(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${vp(e.priority)}</span>
        </div>
    `}function hp(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function vp(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Ti(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const Ii={};let xi=null,_i=null,Si=null,Ci=null,Li=null,dr=!1;function bp(e){Object.assign(Ii,e)}function yp({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i}={}){e&&(xi=e),t&&(_i=t),n&&(Si=n),s&&(Ci=s),i&&(Li=i)}function wp(){return Object.keys(Ii)}function U(e,t=!0){if(Td(e),t){let i;const a=At(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),xi&&xi(),document.querySelectorAll(".view").forEach(i=>i.classList.add("hidden"));const n=document.getElementById(`${e}-view`);n&&n.classList.remove("hidden");const s=Ii[e];s&&s()}function ur(){var s;const t=window.location.pathname.split("/").filter(Boolean);Ci&&Ci();let n="my-issues";if(t.length===0||t[0]==="")U("my-issues",!1);else{if(_i&&_i(t))return;n=t[0],wp().includes(n)?U(n,!1):(n="my-issues",U("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function Ai(e){history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Li&&Li(e)}function kp(){dr||(dr=!0,window.addEventListener("popstate",e=>{var t;e.state&&Si&&Si(e.state)||((t=e.state)!=null&&t.view?U(e.state.view,!1):ur())}))}window.currentTeam=null;let bn=[],yn=[],as=[],ot=null;function pr(e){if(!e)return"";if(typeof marked<"u"&&typeof DOMPurify<"u")try{marked.setOptions({breaks:!0,gfm:!0});const t=marked.parse(e);return DOMPurify.sanitize(t)}catch(t){console.error("Markdown parsing error:",t)}return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const mr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];yp({beforeNavigate:()=>{Ya(),window._onRitualsChanged=null},detailRoute:e=>e[0]==="issue"&&e[1]?(is(e[1]),!0):e[0]==="document"&&e[1]?(Ip(e[1]),!0):e[0]==="sprint"&&e[1]?(Rd(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Ja(e[1]),!0):!1,detailPopstate:e=>e.issueId?(ee(e.issueId,!1),!0):e.identifier?(is(e.identifier),!0):e.documentId?(_e(e.documentId,!1),!0):e.sprintId?(ri(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=At();e&&se().some(t=>t.id===e)&&on(e)},issueNavigate:e=>is(e)}),bp({"my-issues":()=>{Xs(),_t()},"gate-approvals":()=>{Lp()},issues:()=>{vu(),zu(),hu().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Do())}}),Fo().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}gt()})},board:()=>{ui()},projects:()=>{be().then(rn)},sprints:()=>{Eo()},rituals:()=>{yr()},documents:()=>{$t()},team:()=>{zs(),za(),Fn()},settings:()=>{Zs(),Hs(),sm()}}),document.addEventListener("DOMContentLoaded",async()=>{if($p(),Ep(),lp({api}),kp(),api.getToken())try{const e=await api.getMe();Ed(e),window.currentUser=e,await gr()}catch{api.logout(),Pn()}else Pn()});function $p(){const e=document.getElementById("theme-toggle");if(!e)return;const n=localStorage.getItem("chaotic_theme")==="light";document.body.classList.toggle("theme-light",n),e.checked=n,e.addEventListener("change",()=>{const s=e.checked;document.body.classList.toggle("theme-light",s),localStorage.setItem("chaotic_theme",s?"light":"dark")})}function Ep(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");Ai(s)}}})}document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"){const t=document.activeElement,n=t==null?void 0:t.closest("form");if(n){e.preventDefault();const s=new Event("submit",{bubbles:!0,cancelable:!0});n.dispatchEvent(s)}}});async function gr(){Ta(),La(),await qn();const e=Na();if(e.length===0&&!po()){ni();return}e.length>0&&await Fs(e[0],!0)}window.initApp=gr,window.viewIssue=ee,window.viewIssueByPath=is,window.handleDescriptionClick=ir,window.toggleTicketRituals=ar,window.toggleCreateIssueOptions=Hp,window.connectWebSocket=fr,window.buildAssignees=Sp,window.updateAssigneeFilter=Cp,window.loadLabels=nm,window.resetOnboarding=ii;let os=0;function fr(e){ot&&(ot.close(),ot=null);const t=api.getToken();if(!t)return;const s=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(t)}&team_id=${encodeURIComponent(e)}`;try{ot=new WebSocket(s),ot.onopen=()=>{console.log("WebSocket connected"),os>0&&g("Live updates reconnected","success"),os=0},ot.onmessage=i=>{const a=JSON.parse(i.data);Tp(a)},ot.onclose=()=>{console.log("WebSocket disconnected"),os++,os===1&&g("Live updates disconnected. Reconnecting...","warning"),setTimeout(()=>{window.currentTeam&&window.currentTeam.id===e&&fr(e)},5e3)},ot.onerror=i=>{console.error("WebSocket error:",i)}}catch(i){console.error("Failed to connect WebSocket:",i)}}function Tp(e){var i,a,o,r,c,l;const{type:t,entity:n,data:s}=e;if(n==="issue"){if(t==="created"){const d=qe(),m=d.findIndex(f=>f.id===s.id),p=d.findIndex(f=>f._isOptimistic&&f.title===s.title);if(m>=0||(p>=0?(d[p]=s,Fe(d),P()==="issues"&&ze()):(Fe([s,...d]),P()==="issues"&&ze(),g(`New issue: ${s.identifier}`,"info"))),s.assignee_id===((i=ai())==null?void 0:i.id)){const f=Yn(),b=f.findIndex(_=>_.id===s.id),T=f.findIndex(_=>_._isOptimistic&&_.title===s.title);b===-1&&T===-1?(un([s,...f]),P()==="my-issues"&&pn()):T>=0&&(f[T]=s,un(f),P()==="my-issues"&&pn())}P()==="my-issues"&&_t(),P()==="board"?et():P()==="sprints"&&Xe(),P()==="issue-detail"&&s.parent_id===((a=window.currentDetailIssue)==null?void 0:a.id)&&ee(window.currentDetailIssue.id,!1)}else if(t==="updated"){const d=qe(),m=d.findIndex(b=>b.id===s.id);m>=0&&(d[m]=s,Fe(d));const p=Yn(),f=p.findIndex(b=>b.id===s.id);if(f>=0&&(p[f]=s,un(p)),P()==="issues")ze();else if(P()==="my-issues")pn(),_t();else if(P()==="board")et();else if(P()==="sprints")Xe();else if(P()==="issue-detail"){const b=document.getElementById("issue-detail-content");b&&b.dataset.issueId===s.id&&ee(s.id)}}else t==="deleted"&&(Fe(qe().filter(d=>d.id!==s.id)),un(Yn().filter(d=>d.id!==s.id)),P()==="issues"?ze():P()==="my-issues"?(pn(),_t()):P()==="board"?et():P()==="sprints"&&Xe(),g(`Issue ${s.identifier} deleted`,"info"));P()==="issue-detail"&&((o=window.currentDetailIssue)==null?void 0:o.id)===s.id&&(g(`Issue ${s.identifier} was deleted`,"warning"),U("my-issues"))}else if(n==="comment")P()==="my-issues"&&_t(),P()==="issue-detail"&&((r=window.currentDetailIssue)==null?void 0:r.id)===s.issue_id&&ee(s.issue_id,!1);else if(n==="relation"){if(P()==="issue-detail"){const d=(c=window.currentDetailIssue)==null?void 0:c.id;d&&(s.source_issue_id===d||s.target_issue_id===d)&&ee(d,!1)}}else n==="activity"&&(P()==="my-issues"&&_t(),P()==="issue-detail"&&((l=window.currentDetailIssue)==null?void 0:l.id)===s.issue_id&&ee(s.issue_id,!1))}async function Ip(e){try{await _e(e,!1)}catch{U("documents",!1)}}function xp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function _p(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function Sp(){const e=Tt().map(xp),t=_c().map(_p);bn=[...e,...t]}function Bi(e){return e&&bn.find(t=>t.id===e)||null}function wn(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Di(e,t=!1){const n=h(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${h(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function rs(){const e=bn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));bn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=bn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function Cp(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;rs().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Di(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}async function Lp(){if(!window.currentTeam)return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=[];for(const n of se()){const s=await api.getPendingApprovals(n.id);t.push(...s)}Sd(t),Ap()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${h(t.message)}</p></div>`}}}function Ap(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=_d();if(t.length===0){e.innerHTML=`
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
        `),e.innerHTML=r,e.querySelectorAll(".gate-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;io(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;approveReviewFromList(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt,l.attestationNote)})})}function Mi(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${h(s.requested_by_name)}</strong>${s.requested_at?` (${hm(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note"><em>${h(s.attestation_note)}</em></div>`:"",c=i?"review-approve-btn":"gate-approve-btn",l=i?"Approve":"Complete",d=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
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
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${$(e.issue_id)}')" class="gate-issue-link">
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
    `}function Mt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs"}[e]||"Task"}function Bp(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ls(e,t="avatar-small"){const n=wn(e)||"User",s=e==null?void 0:e.avatar_url;return s?Bp(s)?`<img class="${t} avatar-img" src="${S(s)}" alt="${S(n)}">`:`<div class="${t} avatar-emoji">${h(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Dp(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Mp(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=Tt().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:Dp(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${S(l.handle)}">
                <span class="mention-name">${h(l.name)}</span>
                <span class="mention-handle">@${h(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.handle,m=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),p=e.value.slice(i);e.value=m+p,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}async function jp(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;try{await api.createComment(t,n),await ee(t),g("Comment added!","success")}catch(s){g(s.message,"error")}return!1}async function Rp(e){const t=window.currentDetailIssue||await api.getIssue(e);document.getElementById("modal-title").textContent="Edit Description",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateDescription(event, '${$(e)}')">
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
    `,D();const n=document.getElementById("edit-description");n.addEventListener("input",()=>{const s=document.getElementById("edit-description-preview");s&&s.style.display!=="none"&&hr()}),n.focus()}function hr(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?sr(n):'<span class="text-muted">Nothing to preview.</span>'}function Pp(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?hr():s.focus()}async function Np(e,t){e.preventDefault();try{const n=document.getElementById("edit-description");if(!n)throw new Error("Description field not found");const s=n.value;await api.updateIssue(t,{description:s}),j(),g("Description updated","success"),ee(t,!1)}catch(n){g(n.message,"error")}return!1}function ji(e=null){var s;const t=e||((s=document.getElementById("project-filter"))==null?void 0:s.value);as=[];const n=se().map(i=>`
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
                            ${mr.map(i=>`<option value="${i.id}">${i.label}</option>`).join("")}
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
    `,D(),ns(),document.getElementById("create-issue-title").focus()}function Hp(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Op(e){const t=mr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function qp(e,t){const n=se().find(s=>s.id===t);as=[],document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                <button type="button" class="btn btn-primary" onclick="handleCreateSubIssue('${$(e)}', '${$(t)}')">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,D(),ns(),document.getElementById("create-issue-title").focus()}async function Fp(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null;if(!n){g("Please enter a title","error");return}try{const d=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:as,parent_id:e});j(),g(`Created sub-issue ${d.identifier}`,"success"),ee(e)}catch(d){g(d.message,"error")}}function Up(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleAddRelation(event, '${$(e)}')">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${$(e)}')">
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
    `,D(),document.getElementById("relation-issue-search").focus()}async function zp(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,o=(await api.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" onclick="selectIssueForRelation('${$(r.id)}', '${$(r.identifier)}', '${$(r.title)}')">
                <span class="link-result-id">${h(r.identifier)}</span>
                <span class="link-result-title">${h(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Gp(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Wp(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Kp(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return g("Please select an issue","error"),!1;try{n==="blocked_by"?await api.createRelation(s,t,"blocks"):await api.createRelation(t,s,n),j(),g("Relation added","success"),ee(t)}catch(i){g(i.message,"error")}return!1}async function Vp(e,t){try{await api.deleteRelation(e,t),g("Relation removed","success"),ee(e)}catch(n){g(n.message,"error")}}async function Jp(e,t){var a,o;Xt();const s=t.currentTarget.getBoundingClientRect(),i=document.createElement("div");if(i.className="inline-dropdown dropdown-positioning",i.style.top=`${s.top-8}px`,i.style.left=`${s.left}px`,i.style.transform="translateY(-100%)",i.style.animation="none",e==="status"){const r=document.getElementById("create-issue-status").value;i.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('status', '${c}', '${Ze(c)}')">
                    ${nt(c)}
                    <span>${Ze(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const r=document.getElementById("create-issue-priority").value;i.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('priority', '${c}', '${je(c)}')">
                    ${tt(c)}
                    <span>${je(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const r=document.getElementById("create-issue-type").value;i.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('type', '${c}', '${Mt(c)}')">
                    <span class="issue-type-badge type-${c}">${Mt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!window.currentTeam)i.innerHTML='<div class="dropdown-header">Select a team first</div>';else{if(yn.length===0)try{yn=await api.getLabels(window.currentTeam.id)}catch(r){console.error("Failed to load labels:",r)}yi(i),document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Mn(i,{multiSelect:!0});return}else if(e==="assignee"){const r=document.getElementById("create-issue-assignee").value,c=rs();i.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${r?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:l,indent:d})=>{const m=wn(l)||"User";return`
                <button class="dropdown-option ${l.id===r?"selected":""}" onclick="setCreateIssueField('assignee', '${$(l.id)}', '${$(m)}')">
                    ${ls(l,"avatar-small")}
                    <span>${Di(l,d)}</span>
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
                        <button class="dropdown-option ${m.id===r?"selected":""}" onclick="setCreateIssueField('sprint', '${$(m.id)}', '${$(m.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${h(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{i.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Mn(i)}function Zp(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Yp(e,t,n){if(document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,e==="status"){const s=document.querySelector(".toolbar-btn:first-child");s.innerHTML=`${nt(t)}<span id="create-issue-status-label">${n}</span>`}else if(e==="priority"){const s=document.querySelectorAll(".toolbar-btn")[1];s.innerHTML=`${tt(t)}<span id="create-issue-priority-label">${n}</span>`}else if(e==="type"){const s=document.getElementById("create-issue-type-btn");s&&(s.innerHTML=`<span class="issue-type-badge type-${t}">${Mt(t)}</span><span id="create-issue-type-label">${n}</span>`)}Xt()}async function vr({keepOpen:e=!1}={}){var T,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null,d=((T=document.getElementById("create-issue-sprint"))==null?void 0:T.value)||null,m=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,p=m?new Date(`${m}T00:00:00Z`).toISOString():null;if(!t){g("Please select a project","error");return}if(!n){g("Please enter a title","error");return}const f=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");f&&(f.disabled=!0),b&&(b.disabled=!0);try{const C=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:d,label_ids:as,due_date:p});g(`Created ${C.identifier}`,"success"),P()==="issues"?gt():P()==="my-issues"&&Xs(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(j(),ee(C.id))}catch(C){g(C.message,"error")}finally{f&&(f.disabled=!1),b&&(b.disabled=!1)}}async function Xp(){await vr({keepOpen:!1})}async function Qp(){await vr({keepOpen:!0})}async function br(e){try{const t=await api.getIssue(e),n=await api.getSprints(t.project_id),i=(window.getEstimateOptions?window.getEstimateOptions(t.project_id):[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}]).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${h(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${$(e)}')">
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
        `,D()}catch(t){g(t.message,"error")}}async function em(e,t){e.preventDefault();try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await api.updateIssue(t,l),j(),await ee(t),g("Issue updated!","success")}catch(n){g(n.message,"error")}return!1}async function tm(e){if(confirm("Are you sure you want to delete this issue?"))try{await api.deleteIssue(e),await gt(),await be(),U("issues"),g("Issue deleted!","success")}catch(t){g(t.message,"error")}}async function nm(){if(window.currentTeam)try{yn=await api.getLabels(window.currentTeam.id)}catch(e){console.error("Failed to load labels:",e)}}async function sm(){const e=document.getElementById("ritual-project-filter");e&&(await be(),e.innerHTML='<option value="">Select Project</option>'+se().map(t=>`<option value="${t.id}">${h(t.name)}</option>`).join(""))}async function yr(){const e=document.getElementById("rituals-project-filter");if(!e)return;window._onRitualsChanged=im,await be(),e.innerHTML='<option value="">Select a project</option>'+se().map(n=>`<option value="${S(n.id)}">${h(n.name)}</option>`).join("");const t=At()||getSavedProjectId();t&&se().some(n=>n.id===t)?(e.value=t,wr()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function wr(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}Xa(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await It()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${h(n.message)}</div>`}}function im(){const e=document.getElementById("rituals-content"),t=Qa(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");e.innerHTML=`
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
    `,xt("rv-sprint-rituals-list",n,"sprint"),xt("rv-close-rituals-list",s,"close"),xt("rv-claim-rituals-list",i,"claim")}async function am(e,t){try{await api.approveAttestation(e,t),g("Ritual approved!","success"),await es(),li()}catch(n){g(n.message,"error")}}async function om(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{rm(s,e,t)}),D()}async function rm(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await api.completeGateRitual(t,n,s||null),g("Ritual completed!","success"),await es();const i=Bd();i&&!i.in_limbo?(j(),g("Limbo cleared! Next sprint is now active.","success")):li()}catch(i){g(i.message,"error")}return!1}function lm(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${S(e.id)}" data-issue-id="${S(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${S(e.id)}" data-issue-id="${S(t)}" data-ritual-name="${S(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${S(e.id)}" data-issue-id="${S(t)}" data-ritual-name="${S(e.name)}" data-ritual-prompt="${S(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${S(e.id)}" data-issue-id="${S(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function cm(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${h(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{dm(i,e,t)}),D()}async function dm(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return g("A note is required for this attestation.","error"),!1;try{await api.attestTicketRitual(t,n,s),g("Ritual attested!","success"),j(),await hn(n)}catch(i){g(i.message,"error")}return!1}async function um(e,t){try{await api.attestTicketRitual(e,t),g("Ritual attested!","success"),await hn(t)}catch(n){g(n.message,"error")}}async function pm(e,t){try{await api.approveTicketRitual(e,t),g("Ritual approved!","success"),await hn(t)}catch(n){g(n.message,"error")}}function mm(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{gm(s,e,t)}),D()}async function gm(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await api.completeTicketGateRitual(t,n,s||null),g("Ritual completed!","success"),j(),await hn(n)}catch(i){g(i.message,"error")}return!1}document.addEventListener("keydown",Ku({closeModal:j,navigateTo:U,showCreateIssueModal:ji,showKeyboardShortcutsHelp:kr,isModalOpen:()=>!document.getElementById("modal-overlay").classList.contains("hidden"),focusSearch:()=>{U("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function kr(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,D()}md([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>U("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>U("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>U("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>U("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>U("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>U("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>U("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{U("issues"),setTimeout(ji,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{U("projects"),setTimeout(Vs,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{U("documents"),setTimeout(Ns,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Ws(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{U("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{U("team"),setTimeout(Gs,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>kr(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>ii(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>js(),category:"Account"}]),bd({getCurrentUser:ai,getCurrentTeam:()=>window.currentTeam,renderIssueRow:Ce,formatActivityText:tr,formatActivityActor:er,getActivityIcon:Qo,navigateToIssueByIdentifier:Ai,viewDocument:_e}),Xd({api,showToast:g,getProjects:se,getProjectFromUrl:At,setGlobalProjectSelection:on,updateUrlWithProject:oi,escapeHtml:h,escapeAttr:S,escapeJsString:$,formatPriority:je}),lu({getIssues:qe,getAssigneeById:Bi,formatAssigneeName:wn,formatEstimate:zn,getSprintCache:Ad,formatStatus:Ze,formatPriority:je,formatIssueType:Mt,escapeHtml:h,escapeAttr:S,escapeJsString:$,sanitizeColor:ge,renderAvatar:ls,getAssigneeOptionList:rs,getGroupByValue:Go}),Ju({api,getIssues:qe,setIssues:Fe,getMyIssues:Yn,setMyIssues:un,getCurrentDetailIssue:()=>window.currentDetailIssue,setCurrentDetailIssue:e=>{window.currentDetailIssue=e},getLabels:()=>yn,setLabels:e=>{yn=e},getCurrentTeam:()=>window.currentTeam,getCurrentDetailSprints:()=>window.currentDetailSprints,closeAllDropdowns:Xt,registerDropdownClickOutside:Mn,setDropdownKeyHandler:Ql,showToast:g,getStatusIcon:nt,getPriorityIcon:tt,formatStatus:Ze,formatPriority:je,formatIssueType:Mt,formatEstimate:zn,formatAssigneeName:wn,formatAssigneeOptionLabel:Di,getAssigneeOptionList:rs,getAssigneeById:Bi,getEstimateOptions:Un,renderAvatar:ls,renderIssueRow:Ce,escapeHtml:h,escapeAttr:S,escapeJsString:$,sanitizeColor:ge,updateSprintCacheForProject:Jd,updateSprintBudgetBar:bi}),tp({api,getCurrentView:P,showToast:g,showModal:D,closeModal:j,navigateTo:U,getProjects:se,getMembers:Tt,getAssigneeById:Bi,formatAssigneeName:wn,formatStatus:Ze,formatPriority:je,formatIssueType:Mt,formatEstimate:zn,formatTimeAgo:jn,getStatusIcon:nt,getPriorityIcon:tt,renderMarkdown:pr,renderAvatar:ls,escapeHtml:h,escapeAttr:S,escapeJsString:$,sanitizeColor:ge,showDetailDropdown:Zo,setupMentionAutocomplete:Mp,renderTicketRitualActions:lm});const fm=D;window.showModal=function(){fm(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"&&!document.getElementById("modal-overlay").classList.contains("hidden")){const n=document.querySelector("#modal-content form");if(n)e.preventDefault(),n.dispatchEvent(new Event("submit",{cancelable:!0}));else{const s=document.querySelector("#modal-content .btn-primary");s&&!s.disabled&&(e.preventDefault(),s.click())}}(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),lo()?Zn():gd())});function hm(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}async function vm(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){g("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=se().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Fe([r,...qe()]),ze();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=qe(),m=d.findIndex(p=>p.id===a);m!==-1&&(d[m]=l,Fe(d)),ze(),be(),g("Issue created!","success")}catch(l){Fe(qe().filter(d=>d.id!==a)),ze(),g(l.message,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}function $r(e){const t=document.querySelectorAll("#issues-list .list-item");t.length!==0&&(e=Math.max(0,Math.min(t.length-1,e)),t.forEach(n=>n.classList.remove("keyboard-selected")),yo(e),t[e].classList.add("keyboard-selected"),t[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}document.addEventListener("keydown",e=>{if(P()!=="issues"||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="SELECT"||!document.getElementById("modal-overlay").classList.contains("hidden")||lo())return;const t=document.querySelectorAll("#issues-list .list-item");if(t.length===0)return;const n=xd();switch(e.key){case"j":e.preventDefault(),$r(n+1);break;case"k":e.preventDefault(),$r(n-1);break;case"Enter":if(n>=0&&t[n]){e.preventDefault();const s=t[n].dataset.id;s&&!s.startsWith("temp-")&&ee(s)}break;case"e":if(n>=0&&t[n]){e.preventDefault();const s=t[n].dataset.id;s&&!s.startsWith("temp-")&&br(s)}break}}),Object.assign(window,{escapeHtml:h,renderMarkdown:pr,handleLogin:_a,handleSignup:Sa,showLogin:Ia,showSignup:xa,logout:js,navigateTo:U,handleRoute:ur,closeModal:j,getProjectFromUrl:At,updateUrlWithProject:oi,toggleTeamDropdown:Us,toggleUserDropdown:Oa,showCreateTeamModal:Ws,showEditTeamModal:Wa,showInviteModal:Gs,showCreateIssueModal:ji,loadIssues:gt,filterIssues:Ge,filterMyIssues:uo,debounceSearch:Gu,handleQuickCreate:vm,onProjectFilterChange:Uo,updateGroupBy:zo,toggleGroup:gu,viewIssue:ee,showEditIssueModal:br,editDescription:Rp,handleDescriptionClick:ir,setDescriptionEditorMode:Pp,updateIssueField:fn,handleUpdateDescription:Np,handleUpdateIssue:em,deleteIssue:tm,navigateToIssueByIdentifier:Ai,handleCreateIssueNew:Xp,handleCreateIssueAndNew:Qp,setCreateIssueField:Yp,toggleCreateIssueDropdown:Jp,toggleCreateIssueLabelSelection:Xu,createLabelForCreateIssue:Qu,createLabelFromDropdown:Yu,handleAddComment:jp,showCreateSubIssueModal:qp,handleCreateSubIssue:Fp,showAddRelationModal:Up,handleAddRelation:Kp,deleteRelation:Vp,searchIssuesToRelate:zp,selectIssueForRelation:Gp,clearSelectedRelation:Wp,showDetailDropdown:Zo,showInlineDropdown:Jo,toggleIssueLabel:Zu,toggleMultiSelect:fu,updateStatusFilter:mi,updatePriorityFilter:fi,clearStatusFilter:gi,clearPriorityFilter:hi,clearLabelFilter:vi,toggleFilterMenu:wu,toggleDisplayMenu:ku,showFilterCategoryOptions:ke,setProjectFilter:No,clearProjectFilter:Lu,toggleStatusOption:Au,clearStatusFilterNew:Bu,togglePriorityOption:Du,clearPriorityFilterNew:Mu,setTypeFilter:Ho,clearTypeFilter:ju,setAssigneeFilter:Oo,clearAssigneeFilter:Ru,setSprintFilter:qo,clearSprintFilter:Pu,toggleLabelOption:Nu,clearLabelFilterNew:Hu,setSort:qu,setGroupBy:Fu,clearAllFilters:Uu,updateFilterChips:fe,updateFilterCountBadge:he,loadBoard:pi,onBoardProjectChange:Qd,handleDragStart:eu,handleDragEnd:tu,handleDragOver:nu,handleDragLeave:su,handleCardDragOver:iu,handleCardDragLeave:au,handleDrop:ou,handleCardDrop:ru,loadSprints:Xe,onSprintProjectChange:Dd,viewSprint:ri,showEditBudgetModal:Od,handleUpdateBudget:qd,showCloseSprintConfirmation:Fd,completeSprint:Ud,loadLimboStatus:es,showLimboDetailsModal:li,showCreateDocumentModal:Ns,showCreateProjectModal:Vs,loadRitualsView:yr,onRitualsProjectChange:wr,approveRitual:am,completeGateRitual:om,toggleTicketRituals:ar,attestTicketRitual:um,approveTicketRitual:pm,showCompleteTicketRitualModal:mm,showAttestTicketRitualModal:cm,showCreateApiKeyModal:ao,copyApiKey:oo,revokeApiKey:ro,showCreateAgentModal:Pa,applyIssueTemplate:Op,updateCreateIssueProject:Zp}),window.marked=R,window.DOMPurify=Zl,console.log("Chaotic frontend loaded via Vite")})();
