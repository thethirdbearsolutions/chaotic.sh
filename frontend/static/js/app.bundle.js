var uf=Object.defineProperty;var pf=(Ze,ue,$t)=>ue in Ze?uf(Ze,ue,{enumerable:!0,configurable:!0,writable:!0,value:$t}):Ze[ue]=$t;var H=(Ze,ue,$t)=>pf(Ze,typeof ue!="symbol"?ue+"":ue,$t);(function(){"use strict";var eo;function Ze(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ue=Ze();function $t(e){ue=e}var un={exec:()=>null};function P(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(pe.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var pe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Id=/^(?:[ \t]*(?:\n|$))+/,xd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Td=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,pn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ld=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ai=/(?:[*+-]|\d{1,9}[.)])/,ho=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,vo=P(ho).replace(/bull/g,ai).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Sd=P(ho).replace(/bull/g,ai).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),oi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Cd=/^[^\n]+/,ri=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Bd=P(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ri).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ad=P(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ai).getRegex(),Yn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",li=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,jd=P("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",li).replace("tag",Yn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),bo=P(oi).replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yn).getRegex(),Md=P(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",bo).getRegex(),ci={blockquote:Md,code:xd,def:Bd,fences:Td,heading:Ld,hr:pn,html:jd,lheading:vo,list:Ad,newline:Id,paragraph:bo,table:un,text:Cd},yo=P("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yn).getRegex(),Dd={...ci,lheading:Sd,table:yo,paragraph:P(oi).replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",yo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yn).getRegex()},Rd={...ci,html:P(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",li).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:un,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:P(oi).replace("hr",pn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",vo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Nd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,wo=/^( {2,}|\\)\n(?!\s*$)/,qd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Zn=/[\p{P}\p{S}]/u,di=/[\s\p{P}\p{S}]/u,ko=/[^\s\p{P}\p{S}]/u,Od=P(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,di).getRegex(),$o=/(?!~)[\p{P}\p{S}]/u,Hd=/(?!~)[\s\p{P}\p{S}]/u,Fd=/(?:[^\s\p{P}\p{S}]|~)/u,Ud=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Eo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,zd=P(Eo,"u").replace(/punct/g,Zn).getRegex(),Gd=P(Eo,"u").replace(/punct/g,$o).getRegex(),_o="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wd=P(_o,"gu").replace(/notPunctSpace/g,ko).replace(/punctSpace/g,di).replace(/punct/g,Zn).getRegex(),Kd=P(_o,"gu").replace(/notPunctSpace/g,Fd).replace(/punctSpace/g,Hd).replace(/punct/g,$o).getRegex(),Vd=P("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ko).replace(/punctSpace/g,di).replace(/punct/g,Zn).getRegex(),Yd=P(/\\(punct)/,"gu").replace(/punct/g,Zn).getRegex(),Zd=P(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Xd=P(li).replace("(?:-->|$)","-->").getRegex(),Qd=P("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Xd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Xn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Jd=P(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Io=P(/^!?\[(label)\]\[(ref)\]/).replace("label",Xn).replace("ref",ri).getRegex(),xo=P(/^!?\[(ref)\](?:\[\])?/).replace("ref",ri).getRegex(),eu=P("reflink|nolink(?!\\()","g").replace("reflink",Io).replace("nolink",xo).getRegex(),ui={_backpedal:un,anyPunctuation:Yd,autolink:Zd,blockSkip:Ud,br:wo,code:Nd,del:un,emStrongLDelim:zd,emStrongRDelimAst:Wd,emStrongRDelimUnd:Vd,escape:Pd,link:Jd,nolink:xo,punctuation:Od,reflink:Io,reflinkSearch:eu,tag:Qd,text:qd,url:un},tu={...ui,link:P(/^!?\[(label)\]\((.*?)\)/).replace("label",Xn).getRegex(),reflink:P(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Xn).getRegex()},pi={...ui,emStrongRDelimAst:Kd,emStrongLDelim:Gd,url:P(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},nu={...pi,br:P(wo).replace("{2,}","*").getRegex(),text:P(pi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Qn={normal:ci,gfm:Dd,pedantic:Rd},mn={normal:ui,gfm:pi,breaks:nu,pedantic:tu},su={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},To=e=>su[e];function He(e,t){if(t){if(pe.escapeTest.test(e))return e.replace(pe.escapeReplace,To)}else if(pe.escapeTestNoEncode.test(e))return e.replace(pe.escapeReplaceNoEncode,To);return e}function Lo(e){try{e=encodeURI(e).replace(pe.percentDecode,"%")}catch{return null}return e}function So(e,t){var a;const n=e.replace(pe.findPipe,(o,r,d)=>{let c=!1,l=r;for(;--l>=0&&d[l]==="\\";)c=!c;return c?"|":" |"}),s=n.split(pe.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(pe.slashPipe,"|");return s}function gn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function iu(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Co(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,d}function au(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var Jn=class{constructor(e){H(this,"options");H(this,"rules");H(this,"lexer");this.options=e||ue}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:gn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=au(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=gn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:gn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=gn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))r.push(n[d]),o=!0;else if(!o)r.push(n[d]);else break;n=n.slice(d);const c=r.join(`
`),l=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${c}`:c,i=i?`${i}
${l}`:l;const f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,a,!0),this.lexer.state.top=f,n.length===0)break;const p=a.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const h=p,y=h.raw+`
`+n.join(`
`),k=this.blockquote(y);a[a.length-1]=k,s=s.substring(0,s.length-h.raw.length)+k.raw,i=i.substring(0,i.length-h.text.length)+k.text;break}else if((p==null?void 0:p.type)==="list"){const h=p,y=h.raw+`
`+n.join(`
`),k=this.list(y);a[a.length-1]=k,s=s.substring(0,s.length-p.raw.length)+k.raw,i=i.substring(0,i.length-h.raw.length)+k.raw,n=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let d=!1,c="",l="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),p=e.split(`
`,1)[0],h=!f.trim(),y=0;if(this.options.pedantic?(y=2,l=f.trimStart()):h?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,l=f.slice(y),y+=t[1].length),h&&this.rules.other.blankLine.test(p)&&(c+=p+`
`,e=e.substring(p.length+1),d=!0),!d){const T=this.rules.other.nextBulletRegex(y),j=this.rules.other.hrRegex(y),q=this.rules.other.fencesBeginRegex(y),B=this.rules.other.headingBeginRegex(y),U=this.rules.other.htmlBeginRegex(y);for(;e;){const Z=e.split(`
`,1)[0];let O;if(p=Z,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),O=p):O=p.replace(this.rules.other.tabCharGlobal,"    "),q.test(p)||B.test(p)||U.test(p)||T.test(p)||j.test(p))break;if(O.search(this.rules.other.nonSpaceChar)>=y||!p.trim())l+=`
`+O.slice(y);else{if(h||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||q.test(f)||B.test(f)||j.test(f))break;l+=`
`+p}!h&&!p.trim()&&(h=!0),c+=Z+`
`,e=e.substring(Z.length+1),f=O.slice(y)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let k=null,E;this.options.gfm&&(k=this.rules.other.listIsTask.exec(l),k&&(E=k[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:c,task:!!k,checked:E,loose:!1,text:l,tokens:[]}),i.raw+=c}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let d=0;d<i.items.length;d++)if(this.lexer.state.top=!1,i.items[d].tokens=this.lexer.blockTokens(i.items[d].text,[]),!i.loose){const c=i.items[d].tokens.filter(f=>f.type==="space"),l=c.length>0&&c.some(f=>this.rules.other.anyLine.test(f.raw));i.loose=l}if(i.loose)for(let d=0;d<i.items.length;d++)i.items[d].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=So(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(So(r,a.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=gn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=iu(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Co(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Co(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,d=a,c=0;const l=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+a);(s=l.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){d+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(d-=r,d>0)continue;r=Math.min(r,r+d+c);const f=[...s[0]][0].length,p=e.slice(0,a+s.index+f+r);if(Math.min(a,r)%2){const y=p.slice(1,-1);return{type:"em",raw:p,text:y,tokens:this.lexer.inlineTokens(y)}}const h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Xe=class go{constructor(t){H(this,"tokens");H(this,"options");H(this,"state");H(this,"tokenizer");H(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ue,this.options.tokenizer=this.options.tokenizer||new Jn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:pe,block:Qn.normal,inline:mn.normal};this.options.pedantic?(n.block=Qn.pedantic,n.inline=mn.pedantic):this.options.gfm&&(n.block=Qn.gfm,this.options.breaks?n.inline=mn.breaks:n.inline=mn.gfm),this.tokenizer.rules=n}static get rules(){return{block:Qn,inline:mn}}static lex(t,n){return new go(n).lex(t)}static lexInline(t,n){return new go(n).inlineTokens(t)}lex(t){t=t.replace(pe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(pe.tabCharGlobal,"    ").replace(pe.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let d=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const l=t.slice(1);let f;this.options.extensions.startBlock.forEach(p=>{f=p.call({lexer:this},l),typeof f=="number"&&f>=0&&(c=Math.min(c,f))}),c<1/0&&c>=0&&(d=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(d))){const c=n.at(-1);s&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),s=d.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,d,c;let s=t,i=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if((d=(r=this.options.extensions)==null?void 0:r.inline)!=null&&d.some(p=>(l=p.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);const p=n.at(-1);l.type==="text"&&(p==null?void 0:p.type)==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,s,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let f=t;if((c=this.options.extensions)!=null&&c.startInline){let p=1/0;const h=t.slice(1);let y;this.options.extensions.startInline.forEach(k=>{y=k.call({lexer:this},h),typeof y=="number"&&y>=0&&(p=Math.min(p,y))}),p<1/0&&p>=0&&(f=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(f)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;const p=n.at(-1);(p==null?void 0:p.type)==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(t){const p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},es=class{constructor(e){H(this,"options");H(this,"parser");this.options=e||ue}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(pe.notSpaceStart))==null?void 0:a[0],i=e.replace(pe.endingNewline,"")+`
`;return s?'<pre><code class="language-'+He(s)+'">'+(n?i:He(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:He(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+He(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${He(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=Lo(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+He(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=Lo(e);if(i===null)return He(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${He(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:He(e.text)}},mi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Qe=class fo{constructor(t){H(this,"options");H(this,"renderer");H(this,"textRenderer");this.options=t||ue,this.options.renderer=this.options.renderer||new es,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new mi}static parse(t,n){return new fo(n).parse(t)}static parseInline(t,n){return new fo(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const c=r,l=this.options.extensions.renderers[c.type].call({parser:this},c);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){s+=l||"";continue}}const d=r;switch(d.type){case"space":{s+=this.renderer.space(d);continue}case"hr":{s+=this.renderer.hr(d);continue}case"heading":{s+=this.renderer.heading(d);continue}case"code":{s+=this.renderer.code(d);continue}case"table":{s+=this.renderer.table(d);continue}case"blockquote":{s+=this.renderer.blockquote(d);continue}case"list":{s+=this.renderer.list(d);continue}case"html":{s+=this.renderer.html(d);continue}case"paragraph":{s+=this.renderer.paragraph(d);continue}case"text":{let c=d,l=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],l+=`
`+this.renderer.text(c);n?s+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):s+=l;continue}default:{const c='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=c||"";continue}}const d=r;switch(d.type){case"escape":{s+=n.text(d);break}case"html":{s+=n.html(d);break}case"link":{s+=n.link(d);break}case"image":{s+=n.image(d);break}case"strong":{s+=n.strong(d);break}case"em":{s+=n.em(d);break}case"codespan":{s+=n.codespan(d);break}case"br":{s+=n.br(d);break}case"del":{s+=n.del(d);break}case"text":{s+=n.text(d);break}default:{const c='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}},ts=(eo=class{constructor(e){H(this,"options");H(this,"block");this.options=e||ue}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Xe.lex:Xe.lexInline}provideParser(){return this.block?Qe.parse:Qe.parseInline}},H(eo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),eo),ou=class{constructor(...e){H(this,"defaults",Ze());H(this,"options",this.setOptions);H(this,"parse",this.parseMarkdown(!0));H(this,"parseInline",this.parseMarkdown(!1));H(this,"Parser",Qe);H(this,"Renderer",es);H(this,"TextRenderer",mi);H(this,"Lexer",Xe);H(this,"Tokenizer",Jn);H(this,"Hooks",ts);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const d of r)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const d=o[r].flat(1/0);n=n.concat(this.walkTokens(d,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new es(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],d=i[o];i[o]=(...c)=>{let l=r.apply(i,c);return l===!1&&(l=d.apply(i,c)),l||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Jn(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],d=i[o];i[o]=(...c)=>{let l=r.apply(i,c);return l===!1&&(l=d.apply(i,c)),l}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new ts;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],d=i[o];ts.passThroughHooks.has(a)?i[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(i,c)).then(f=>d.call(i,f));const l=r.call(i,c);return d.call(i,l)}:i[o]=(...c)=>{let l=r.apply(i,c);return l===!1&&(l=d.apply(i,c)),l}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Xe.lex(e,t??this.defaults)}parser(e,t){return Qe.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Xe.lex:Xe.lexInline,d=a.hooks?a.hooks.provideParser():e?Qe.parse:Qe.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>d(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let l=d(c,a);return a.hooks&&(l=a.hooks.postprocess(l)),l}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+He(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},Et=new ou;function R(e,t){return Et.parse(e,t)}R.options=R.setOptions=function(e){return Et.setOptions(e),R.defaults=Et.defaults,$t(R.defaults),R},R.getDefaults=Ze,R.defaults=ue,R.use=function(...e){return Et.use(...e),R.defaults=Et.defaults,$t(R.defaults),R},R.walkTokens=function(e,t){return Et.walkTokens(e,t)},R.parseInline=Et.parseInline,R.Parser=Qe,R.parser=Qe.parse,R.Renderer=es,R.TextRenderer=mi,R.Lexer=Xe,R.lexer=Xe.lex,R.Tokenizer=Jn,R.Hooks=ts,R.parse=R,R.options,R.setOptions,R.use,R.walkTokens,R.parseInline,Qe.parse,Xe.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Bo,setPrototypeOf:Ao,isFrozen:ru,getPrototypeOf:lu,getOwnPropertyDescriptor:cu}=Object;let{freeze:me,seal:Ce,create:gi}=Object,{apply:fi,construct:hi}=typeof Reflect<"u"&&Reflect;me||(me=function(t){return t}),Ce||(Ce=function(t){return t}),fi||(fi=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),hi||(hi=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const ns=fe(Array.prototype.forEach),du=fe(Array.prototype.lastIndexOf),jo=fe(Array.prototype.pop),fn=fe(Array.prototype.push),uu=fe(Array.prototype.splice),ss=fe(String.prototype.toLowerCase),vi=fe(String.prototype.toString),bi=fe(String.prototype.match),hn=fe(String.prototype.replace),pu=fe(String.prototype.indexOf),mu=fe(String.prototype.trim),Me=fe(Object.prototype.hasOwnProperty),ge=fe(RegExp.prototype.test),vn=gu(TypeError);function fe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return fi(e,t,s)}}function gu(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return hi(e,n)}}function S(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ss;Ao&&Ao(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(ru(t)||(t[s]=a),i=a)}e[i]=!0}return e}function fu(e){for(let t=0;t<e.length;t++)Me(e,t)||(e[t]=null);return e}function Fe(e){const t=gi(null);for(const[n,s]of Bo(e))Me(e,n)&&(Array.isArray(s)?t[n]=fu(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Fe(s):t[n]=s);return t}function bn(e,t){for(;e!==null;){const s=cu(e,t);if(s){if(s.get)return fe(s.get);if(typeof s.value=="function")return fe(s.value)}e=lu(e)}function n(){return null}return n}const Mo=me(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),yi=me(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),wi=me(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),hu=me(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ki=me(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),vu=me(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Do=me(["#text"]),Ro=me(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),$i=me(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Po=me(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),is=me(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),bu=Ce(/\{\{[\w\W]*|[\w\W]*\}\}/gm),yu=Ce(/<%[\w\W]*|[\w\W]*%>/gm),wu=Ce(/\$\{[\w\W]*/gm),ku=Ce(/^data-[\-\w.\u00B7-\uFFFF]+$/),$u=Ce(/^aria-[\-\w]+$/),No=Ce(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Eu=Ce(/^(?:\w+script|data):/i),_u=Ce(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qo=Ce(/^html$/i),Iu=Ce(/^[a-z][.\w]*(-[.\w]+)+$/i);var Oo=Object.freeze({__proto__:null,ARIA_ATTR:$u,ATTR_WHITESPACE:_u,CUSTOM_ELEMENT:Iu,DATA_ATTR:ku,DOCTYPE_NAME:qo,ERB_EXPR:yu,IS_ALLOWED_URI:No,IS_SCRIPT_OR_DATA:Eu,MUSTACHE_EXPR:bu,TMPLIT_EXPR:wu});const yn={element:1,text:3,progressingInstruction:7,comment:8,document:9},xu=function(){return typeof window>"u"?null:window},Tu=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Ho=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:xu();const t=I=>Fo(I);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==yn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:d,NodeFilter:c,NamedNodeMap:l=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:p,trustedTypes:h}=e,y=d.prototype,k=bn(y,"cloneNode"),E=bn(y,"remove"),T=bn(y,"nextSibling"),j=bn(y,"childNodes"),q=bn(y,"parentNode");if(typeof o=="function"){const I=n.createElement("template");I.content&&I.content.ownerDocument&&(n=I.content.ownerDocument)}let B,U="";const{implementation:Z,createNodeIterator:O,createDocumentFragment:J,getElementsByTagName:se}=n,{importNode:X}=s;let D=Ho();t.isSupported=typeof Bo=="function"&&typeof q=="function"&&Z&&Z.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:le,ERB_EXPR:ce,TMPLIT_EXPR:Se,DATA_ATTR:w,ARIA_ATTR:Oe,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:kt,CUSTOM_ELEMENT:tf}=Oo;let{IS_ALLOWED_URI:nd}=Oo,ne=null;const sd=S({},[...Mo,...yi,...wi,...ki,...Do]);let ie=null;const id=S({},[...Ro,...$i,...Po,...is]);let V=Object.seal(gi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Wn=null,to=null;const sn=Object.seal(gi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let ad=!0,no=!0,od=!1,rd=!0,an=!1,Qs=!0,jt=!1,so=!1,io=!1,on=!1,Js=!1,ei=!1,ld=!0,cd=!1;const nf="user-content-";let ao=!0,Kn=!1,rn={},Ve=null;const oo=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let dd=null;const ud=S({},["audio","video","img","source","image","track"]);let ro=null;const pd=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ti="http://www.w3.org/1998/Math/MathML",ni="http://www.w3.org/2000/svg",dt="http://www.w3.org/1999/xhtml";let ln=dt,lo=!1,co=null;const sf=S({},[ti,ni,dt],vi);let si=S({},["mi","mo","mn","ms","mtext"]),ii=S({},["annotation-xml"]);const af=S({},["title","style","font","a","script"]);let Vn=null;const of=["application/xhtml+xml","text/html"],rf="text/html";let te=null,cn=null;const lf=n.createElement("form"),md=function(g){return g instanceof RegExp||g instanceof Function},uo=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(cn&&cn===g)){if((!g||typeof g!="object")&&(g={}),g=Fe(g),Vn=of.indexOf(g.PARSER_MEDIA_TYPE)===-1?rf:g.PARSER_MEDIA_TYPE,te=Vn==="application/xhtml+xml"?vi:ss,ne=Me(g,"ALLOWED_TAGS")?S({},g.ALLOWED_TAGS,te):sd,ie=Me(g,"ALLOWED_ATTR")?S({},g.ALLOWED_ATTR,te):id,co=Me(g,"ALLOWED_NAMESPACES")?S({},g.ALLOWED_NAMESPACES,vi):sf,ro=Me(g,"ADD_URI_SAFE_ATTR")?S(Fe(pd),g.ADD_URI_SAFE_ATTR,te):pd,dd=Me(g,"ADD_DATA_URI_TAGS")?S(Fe(ud),g.ADD_DATA_URI_TAGS,te):ud,Ve=Me(g,"FORBID_CONTENTS")?S({},g.FORBID_CONTENTS,te):oo,Wn=Me(g,"FORBID_TAGS")?S({},g.FORBID_TAGS,te):Fe({}),to=Me(g,"FORBID_ATTR")?S({},g.FORBID_ATTR,te):Fe({}),rn=Me(g,"USE_PROFILES")?g.USE_PROFILES:!1,ad=g.ALLOW_ARIA_ATTR!==!1,no=g.ALLOW_DATA_ATTR!==!1,od=g.ALLOW_UNKNOWN_PROTOCOLS||!1,rd=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,an=g.SAFE_FOR_TEMPLATES||!1,Qs=g.SAFE_FOR_XML!==!1,jt=g.WHOLE_DOCUMENT||!1,on=g.RETURN_DOM||!1,Js=g.RETURN_DOM_FRAGMENT||!1,ei=g.RETURN_TRUSTED_TYPE||!1,io=g.FORCE_BODY||!1,ld=g.SANITIZE_DOM!==!1,cd=g.SANITIZE_NAMED_PROPS||!1,ao=g.KEEP_CONTENT!==!1,Kn=g.IN_PLACE||!1,nd=g.ALLOWED_URI_REGEXP||No,ln=g.NAMESPACE||dt,si=g.MATHML_TEXT_INTEGRATION_POINTS||si,ii=g.HTML_INTEGRATION_POINTS||ii,V=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&md(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&md(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),an&&(no=!1),Js&&(on=!0),rn&&(ne=S({},Do),ie=[],rn.html===!0&&(S(ne,Mo),S(ie,Ro)),rn.svg===!0&&(S(ne,yi),S(ie,$i),S(ie,is)),rn.svgFilters===!0&&(S(ne,wi),S(ie,$i),S(ie,is)),rn.mathMl===!0&&(S(ne,ki),S(ie,Po),S(ie,is))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?sn.tagCheck=g.ADD_TAGS:(ne===sd&&(ne=Fe(ne)),S(ne,g.ADD_TAGS,te))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?sn.attributeCheck=g.ADD_ATTR:(ie===id&&(ie=Fe(ie)),S(ie,g.ADD_ATTR,te))),g.ADD_URI_SAFE_ATTR&&S(ro,g.ADD_URI_SAFE_ATTR,te),g.FORBID_CONTENTS&&(Ve===oo&&(Ve=Fe(Ve)),S(Ve,g.FORBID_CONTENTS,te)),g.ADD_FORBID_CONTENTS&&(Ve===oo&&(Ve=Fe(Ve)),S(Ve,g.ADD_FORBID_CONTENTS,te)),ao&&(ne["#text"]=!0),jt&&S(ne,["html","head","body"]),ne.table&&(S(ne,["tbody"]),delete Wn.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw vn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw vn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=g.TRUSTED_TYPES_POLICY,U=B.createHTML("")}else B===void 0&&(B=Tu(h,i)),B!==null&&typeof U=="string"&&(U=B.createHTML(""));me&&me(g),cn=g}},gd=S({},[...yi,...wi,...hu]),fd=S({},[...ki,...vu]),cf=function(g){let $=q(g);(!$||!$.tagName)&&($={namespaceURI:ln,tagName:"template"});const _=ss(g.tagName),G=ss($.tagName);return co[g.namespaceURI]?g.namespaceURI===ni?$.namespaceURI===dt?_==="svg":$.namespaceURI===ti?_==="svg"&&(G==="annotation-xml"||si[G]):!!gd[_]:g.namespaceURI===ti?$.namespaceURI===dt?_==="math":$.namespaceURI===ni?_==="math"&&ii[G]:!!fd[_]:g.namespaceURI===dt?$.namespaceURI===ni&&!ii[G]||$.namespaceURI===ti&&!si[G]?!1:!fd[_]&&(af[_]||!gd[_]):!!(Vn==="application/xhtml+xml"&&co[g.namespaceURI]):!1},Ye=function(g){fn(t.removed,{element:g});try{q(g).removeChild(g)}catch{E(g)}},Mt=function(g,$){try{fn(t.removed,{attribute:$.getAttributeNode(g),from:$})}catch{fn(t.removed,{attribute:null,from:$})}if($.removeAttribute(g),g==="is")if(on||Js)try{Ye($)}catch{}else try{$.setAttribute(g,"")}catch{}},hd=function(g){let $=null,_=null;if(io)g="<remove></remove>"+g;else{const Q=bi(g,/^[\r\n\t ]+/);_=Q&&Q[0]}Vn==="application/xhtml+xml"&&ln===dt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const G=B?B.createHTML(g):g;if(ln===dt)try{$=new p().parseFromString(G,Vn)}catch{}if(!$||!$.documentElement){$=Z.createDocument(ln,"template",null);try{$.documentElement.innerHTML=lo?U:G}catch{}}const de=$.body||$.documentElement;return g&&_&&de.insertBefore(n.createTextNode(_),de.childNodes[0]||null),ln===dt?se.call($,jt?"html":"body")[0]:jt?$.documentElement:de},vd=function(g){return O.call(g.ownerDocument||g,g,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},po=function(g){return g instanceof f&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof l)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},bd=function(g){return typeof r=="function"&&g instanceof r};function ut(I,g,$){ns(I,_=>{_.call(t,g,$,cn)})}const yd=function(g){let $=null;if(ut(D.beforeSanitizeElements,g,null),po(g))return Ye(g),!0;const _=te(g.nodeName);if(ut(D.uponSanitizeElement,g,{tagName:_,allowedTags:ne}),Qs&&g.hasChildNodes()&&!bd(g.firstElementChild)&&ge(/<[/\w!]/g,g.innerHTML)&&ge(/<[/\w!]/g,g.textContent)||g.nodeType===yn.progressingInstruction||Qs&&g.nodeType===yn.comment&&ge(/<[/\w]/g,g.data))return Ye(g),!0;if(!(sn.tagCheck instanceof Function&&sn.tagCheck(_))&&(!ne[_]||Wn[_])){if(!Wn[_]&&kd(_)&&(V.tagNameCheck instanceof RegExp&&ge(V.tagNameCheck,_)||V.tagNameCheck instanceof Function&&V.tagNameCheck(_)))return!1;if(ao&&!Ve[_]){const G=q(g)||g.parentNode,de=j(g)||g.childNodes;if(de&&G){const Q=de.length;for(let Ee=Q-1;Ee>=0;--Ee){const pt=k(de[Ee],!0);pt.__removalCount=(g.__removalCount||0)+1,G.insertBefore(pt,T(g))}}}return Ye(g),!0}return g instanceof d&&!cf(g)||(_==="noscript"||_==="noembed"||_==="noframes")&&ge(/<\/no(script|embed|frames)/i,g.innerHTML)?(Ye(g),!0):(an&&g.nodeType===yn.text&&($=g.textContent,ns([le,ce,Se],G=>{$=hn($,G," ")}),g.textContent!==$&&(fn(t.removed,{element:g.cloneNode()}),g.textContent=$)),ut(D.afterSanitizeElements,g,null),!1)},wd=function(g,$,_){if(ld&&($==="id"||$==="name")&&(_ in n||_ in lf))return!1;if(!(no&&!to[$]&&ge(w,$))){if(!(ad&&ge(Oe,$))){if(!(sn.attributeCheck instanceof Function&&sn.attributeCheck($,g))){if(!ie[$]||to[$]){if(!(kd(g)&&(V.tagNameCheck instanceof RegExp&&ge(V.tagNameCheck,g)||V.tagNameCheck instanceof Function&&V.tagNameCheck(g))&&(V.attributeNameCheck instanceof RegExp&&ge(V.attributeNameCheck,$)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck($,g))||$==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&ge(V.tagNameCheck,_)||V.tagNameCheck instanceof Function&&V.tagNameCheck(_))))return!1}else if(!ro[$]){if(!ge(nd,hn(_,kt,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&g!=="script"&&pu(_,"data:")===0&&dd[g])){if(!(od&&!ge(ee,hn(_,kt,"")))){if(_)return!1}}}}}}}return!0},kd=function(g){return g!=="annotation-xml"&&bi(g,tf)},$d=function(g){ut(D.beforeSanitizeAttributes,g,null);const{attributes:$}=g;if(!$||po(g))return;const _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ie,forceKeepAttr:void 0};let G=$.length;for(;G--;){const de=$[G],{name:Q,namespaceURI:Ee,value:pt}=de,dn=te(Q),mo=pt;let ae=Q==="value"?mo:mu(mo);if(_.attrName=dn,_.attrValue=ae,_.keepAttr=!0,_.forceKeepAttr=void 0,ut(D.uponSanitizeAttribute,g,_),ae=_.attrValue,cd&&(dn==="id"||dn==="name")&&(Mt(Q,g),ae=nf+ae),Qs&&ge(/((--!?|])>)|<\/(style|title|textarea)/i,ae)){Mt(Q,g);continue}if(dn==="attributename"&&bi(ae,"href")){Mt(Q,g);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){Mt(Q,g);continue}if(!rd&&ge(/\/>/i,ae)){Mt(Q,g);continue}an&&ns([le,ce,Se],_d=>{ae=hn(ae,_d," ")});const Ed=te(g.nodeName);if(!wd(Ed,dn,ae)){Mt(Q,g);continue}if(B&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Ee)switch(h.getAttributeType(Ed,dn)){case"TrustedHTML":{ae=B.createHTML(ae);break}case"TrustedScriptURL":{ae=B.createScriptURL(ae);break}}if(ae!==mo)try{Ee?g.setAttributeNS(Ee,Q,ae):g.setAttribute(Q,ae),po(g)?Ye(g):jo(t.removed)}catch{Mt(Q,g)}}ut(D.afterSanitizeAttributes,g,null)},df=function I(g){let $=null;const _=vd(g);for(ut(D.beforeSanitizeShadowDOM,g,null);$=_.nextNode();)ut(D.uponSanitizeShadowNode,$,null),yd($),$d($),$.content instanceof a&&I($.content);ut(D.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(I){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,_=null,G=null,de=null;if(lo=!I,lo&&(I="<!-->"),typeof I!="string"&&!bd(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw vn("dirty is not a string, aborting")}else throw vn("toString is not a function");if(!t.isSupported)return I;if(so||uo(g),t.removed=[],typeof I=="string"&&(Kn=!1),Kn){if(I.nodeName){const pt=te(I.nodeName);if(!ne[pt]||Wn[pt])throw vn("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof r)$=hd("<!---->"),_=$.ownerDocument.importNode(I,!0),_.nodeType===yn.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?$=_:$.appendChild(_);else{if(!on&&!an&&!jt&&I.indexOf("<")===-1)return B&&ei?B.createHTML(I):I;if($=hd(I),!$)return on?null:ei?U:""}$&&io&&Ye($.firstChild);const Q=vd(Kn?I:$);for(;G=Q.nextNode();)yd(G),$d(G),G.content instanceof a&&df(G.content);if(Kn)return I;if(on){if(Js)for(de=J.call($.ownerDocument);$.firstChild;)de.appendChild($.firstChild);else de=$;return(ie.shadowroot||ie.shadowrootmode)&&(de=X.call(s,de,!0)),de}let Ee=jt?$.outerHTML:$.innerHTML;return jt&&ne["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&ge(qo,$.ownerDocument.doctype.name)&&(Ee="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Ee),an&&ns([le,ce,Se],pt=>{Ee=hn(Ee,pt," ")}),B&&ei?B.createHTML(Ee):Ee},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};uo(I),so=!0},t.clearConfig=function(){cn=null,so=!1},t.isValidAttribute=function(I,g,$){cn||uo({});const _=te(I),G=te(g);return wd(_,G,$)},t.addHook=function(I,g){typeof g=="function"&&fn(D[I],g)},t.removeHook=function(I,g){if(g!==void 0){const $=du(D[I],g);return $===-1?void 0:uu(D[I],$,1)[0]}return jo(D[I])},t.removeHooks=function(I){D[I]=[]},t.removeAllHooks=function(){D=Ho()},t}var Uo=Fo();const Ei="chaotic_";function De(e){try{return localStorage.getItem(Ei+e)}catch{return null}}function Re(e,t){try{localStorage.setItem(Ei+e,t)}catch{}}function Je(e){try{localStorage.removeItem(Ei+e)}catch{}}function Lu(){return De("token")}function Su(e){e?Re("token",e):Je("token")}function Cu(){return De("theme")}function Bu(e){Re("theme",e)}function Au(){return De("last_project")}function zo(e){Re("last_project",e)}function ju(){return De("onboarding_complete")==="true"}function Mu(){Re("onboarding_complete","true")}function Du(){Je("onboarding_complete")}function Ru(e){return e?De(`issues_filters_${e}`):null}function Pu(e,t){e&&(t?Re(`issues_filters_${e}`,t):Je(`issues_filters_${e}`))}function Nu(e){return De(`comment_draft_${e}`)}function _i(e,t){t?Re(`comment_draft_${e}`,t):Je(`comment_draft_${e}`)}function qu(e){return De(`description_draft_${e}`)}function as(e,t){t?Re(`description_draft_${e}`,t):Je(`description_draft_${e}`)}function Ou(){return{title:De("create_issue_title"),description:De("create_issue_description")}}function Go(e,t){e?Re("create_issue_title",e):Je("create_issue_title"),t?Re("create_issue_description",t):Je("create_issue_description")}function Hu(){Je("create_issue_title"),Je("create_issue_description")}function Fu(){return De("doc_view_mode")}function Uu(e){Re("doc_view_mode",e)}function zu(){return De("approvals_explainer_dismissed")==="1"}function Gu(){Re("approvals_explainer_dismissed","1")}const Wu="/api";class Ku{constructor(){this.token=Lu()}setToken(t){this.token=t,Su(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Wu}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const d=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let d;typeof r.detail=="string"?d=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?d=r.detail.message:d="An error occurred";const c=new Error(d);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const b=new Ku;let Dt=null;function M(){document.getElementById("modal-overlay").classList.remove("hidden")}function C(){var e;et(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function Ii(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function v(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function et(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Dt&&(document.removeEventListener("keydown",Dt),Dt=null)}function wn(e){Dt&&document.removeEventListener("keydown",Dt),Dt=e,e&&document.addEventListener("keydown",e)}function Rt(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(et(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}Object.assign(window,{showModal:M,closeModal:C,showToast:v,closeAllDropdowns:et,registerDropdownClickOutside:Rt});function we(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function ke(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function xi(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function K(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function u(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ue(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function tt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function Vu(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Pt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?Vu(s)?`<img class="${t} avatar-img" src="${u(s)}" alt="${u(n)}">`:`<div class="${t} avatar-emoji">${m(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let oe={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentDetailIssue:null,currentDetailSprints:null}};const Yu=new Set;function Be(e,t){if(typeof e=="string"){const n=oe[e];oe[e]=t,Wo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=oe[s];oe[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Wo(s,i,a)})}}function Wo(e,t,n){t!==n&&Yu.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const Ti=()=>oe.currentUser,Zu=e=>Be("currentUser",e),A=()=>oe.currentView,Xu=e=>Be("currentView",e),$e=()=>oe.issues,ze=e=>Be("issues",e),Ko=()=>oe.labels,os=e=>Be("labels",e),Vo=()=>oe.activeFilterCategory,Qu=e=>Be("activeFilterCategory",e),Ju=()=>oe.selectedIssueIndex,Yo=e=>Be("selectedIssueIndex",e),ep=()=>oe.pendingGates,tp=e=>Be("pendingGates",e),np=()=>oe.searchDebounceTimer,sp=e=>Be("searchDebounceTimer",e),ip=()=>oe.websocket,Zo=e=>Be("websocket",e),x=()=>oe.currentTeam,Li=e=>Be("currentTeam",e),he=()=>oe.currentDetailIssue,rs=e=>Be("currentDetailIssue",e),ap=()=>oe.currentDetailSprints,Xo=e=>Be("currentDetailSprints",e);let Nt=null,kn=null,Pe=null,Ne=null;function $n(){Nt||(Nt=document.getElementById("auth-screen"),kn=document.getElementById("main-screen"),Pe=document.getElementById("login-form"),Ne=document.getElementById("signup-form"))}function ls(){$n(),Nt&&Nt.classList.remove("hidden"),kn&&kn.classList.add("hidden")}function Qo(){$n(),Nt&&Nt.classList.add("hidden"),kn&&kn.classList.remove("hidden")}function Si(){$n(),Pe&&Pe.classList.remove("hidden"),Ne&&Ne.classList.add("hidden")}function Ci(){$n(),Pe&&Pe.classList.add("hidden"),Ne&&Ne.classList.remove("hidden")}async function Bi(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await b.login(t,n),window.currentUser=await b.getMe(),window.initApp&&await window.initApp(),v("Welcome back!","success")}catch(s){v(`Login failed: ${s.message}`,"error")}return!1}async function Ai(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await b.signup(t,n,s),await b.login(n,s),window.currentUser=await b.getMe(),window.initApp&&await window.initApp(),v("Account created successfully!","success")}catch(i){v(`Signup failed: ${i.message}`,"error")}return!1}function cs(){b.logout(),window.currentUser=null,Li(null),ls(),v("Signed out","success")}function Jo(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function er(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Jo(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${u(s)}" alt="${u(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function op(){$n();const e=Pe==null?void 0:Pe.querySelector("form");e&&e.addEventListener("submit",i=>Bi(i));const t=Ne==null?void 0:Ne.querySelector("form");t&&t.addEventListener("submit",i=>Ai(i));const n=Pe==null?void 0:Pe.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),Ci()});const s=Ne==null?void 0:Ne.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),Si()})}Object.assign(window,{showAuthScreen:ls,showMainScreen:Qo,showLogin:Si,showSignup:Ci,handleLogin:Bi,handleSignup:Ai,logout:cs,updateUserInfo:er,isImageAvatar:Jo});const ji={};function Y(e){Object.assign(ji,e)}function rp(e){var i;const t=e.target.closest("[data-action]");if(!t)return;const n=t.dataset.action,s=ji[n];if(!s){typeof process<"u"&&((i=process.env)==null?void 0:i.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${n}"`);return}s(e,t.dataset,t)}let tr=!1;function lp(){if(!tr){tr=!0;for(const e of["click","change","input","keydown","mouseover","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,rp);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=ji[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}function _t(){const t=new URLSearchParams(window.location.search).get("project");return t||Kt()}function ds(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}const Mi={},us=new Map;let Di=null,Ri=null,Pi=null,Ni=null,qi=null,Oi=null,nr=!1;function cp(e){Object.assign(Mi,e)}function dp({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(Di=e),t&&(Ri=t),n&&(Pi=n),s&&(Ni=s),i&&(qi=i),a&&(Oi=a)}function up(){return Object.keys(Mi)}function L(e,t=!0){if(t&&us.set(window.location.href,window.scrollY),Xu(e),t){let i;const a=_t(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),Di&&Di();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=Mi[e];s&&s(),t&&window.scrollTo(0,0)}function Hi(){var s;const t=window.location.pathname.split("/").filter(Boolean);Ni&&Ni();let n="my-issues";if(t.length===0||t[0]==="")L("my-issues",!1);else{if(Ri&&Ri(t))return;n=t[0],up().includes(n)?L(n,!1):(n="my-issues",L("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function Fi(e){us.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),qi&&qi(e)}function pp(e){us.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Oi&&Oi(e)}function sr(){const e=us.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function mp(){nr||(nr=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Pi&&Pi(e.state)){sr();return}(t=e.state)!=null&&t.view?L(e.state.view,!1):Hi(),sr()}))}let En=[];function gp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function fp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function hp(e,t){const n=e().map(gp),s=t().map(fp);En=[...n,...s]}function _n(e){return e&&En.find(t=>t.id===e)||null}function It(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ui(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ps(){const e=En.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));En.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,d)=>r.name.localeCompare(d.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=En.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function In(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ps().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Ui(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}let xn=[];function vp(){return xn}function bp(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ir(e){const t=e==null?void 0:e.avatar_url,n=u((e==null?void 0:e.name)||"Agent");return t?bp(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${u(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function ar(e){var t;if(e||(e=(t=x())==null?void 0:t.id),!!e)try{xn=await b.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),In()}catch(n){console.error("Failed to load team agents:",n)}}async function ms(e){var t;if(e||(e=(t=x())==null?void 0:t.id),!!e)try{xn=await b.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),In(),or()}catch(n){v(n.message,"error")}}function or(){const e=document.getElementById("agents-list");if(e){if(xn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=xn.map(t=>{const n=m(t.name),s=m(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${ir(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${xi(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${u(t.id)}" data-agent-name="${u(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function zi(){const e=F();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),M()}async function yp(e){var o,r,d;e.preventDefault();const t=(o=x())==null?void 0:o.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(d=document.getElementById("agent-project"))==null?void 0:d.value;try{let c;i&&a?c=await b.createProjectAgent(a,n,s):c=await b.createTeamAgent(t,n,s),C();const l=m(c.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,M()}catch(c){v(`Failed to create agent: ${c.message}`,"error")}return!1}function wp(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{v("Agent API key copied to clipboard","success")}).catch(()=>{v("Failed to copy","error")})}async function kp(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await b.deleteAgent(e),v("Agent deleted","success"),ms()}catch(n){v(`Failed to delete agent: ${n.message}`,"error")}}Object.assign(window,{loadTeamAgentsQuiet:ar,loadAgents:ms,renderAgents:or,showCreateAgentModal:zi,renderAgentAvatar:ir}),Y({"create-agent":e=>{yp(e)},"copy-agent-key":()=>{wp()},"dismiss-agent-modal":()=>{C(),ms()},"delete-agent":(e,t)=>{kp(t.agentId,t.agentName)}});let Tn=0,Ln=null;const xt=new Map;function nt(e,t){return xt.has(e)||xt.set(e,new Set),xt.get(e).add(t),()=>{var n;return(n=xt.get(e))==null?void 0:n.delete(t)}}function $p(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function Gi(e){Ln&&(clearTimeout(Ln),Ln=null);const t=ip();t&&(t.close(),Zo(null));const n=b.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Zo(a),a.onopen=()=>{console.log("WebSocket connected"),Tn>0&&v("Live updates reconnected","success"),Tn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(d){console.error("WebSocket: malformed message",d);return}Ep(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Tn++,Tn===1&&v("Live updates disconnected. Reconnecting...","warning");const o=$p(Tn-1);Ln=setTimeout(()=>{Ln=null,x()&&x().id===e&&Gi(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Ep(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=xt.get(`${n}:${t}`);if(a)for(const d of a)try{d(s,i)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=xt.get(n);if(o)for(const d of o)try{d(s,i)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=xt.get("*");if(r)for(const d of r)try{d(s,i)}catch(c){console.error("WebSocket handler error (*):",c)}}let gs=[],Sn=[],Wi=[],Ki=[];function rr(){return gs}function Cn(){return Sn}function _p(e){Sn=e}async function fs(){try{gs=await b.getMyTeams(),lr()}catch(e){v(e.message,"error")}}function lr(){const e=document.getElementById("team-list");gs.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=gs.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${u(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function hs(e,t=!1){Li(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Gi(e.id),await Promise.all([be(),window.loadLabels?window.loadLabels():Promise.resolve(),cr(),ar()]),t?Hi():L(A())}function vs(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Vi(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function cr(){if(x())try{Sn=await b.getTeamMembers(x().id),window.buildAssignees&&window.buildAssignees(),In()}catch(e){console.error("Failed to load team members:",e)}}async function Yi(){if(x())try{Sn=await b.getTeamMembers(x().id),window.buildAssignees&&window.buildAssignees(),In(),dr()}catch(e){v(e.message,"error")}}function dr(){const e=document.getElementById("team-members-list");e.innerHTML=Sn.map(t=>`
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
                ${t.user_id!==window.currentUser.id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${u(t.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function bs(){if(x())try{Wi=await b.getTeamInvitations(x().id),ur()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function ur(){const e=document.getElementById("team-invitations-list");if(Wi.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=Wi.map(t=>`
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
    `).join("")}async function pr(){if(x())try{Ki=await b.getTeamAgents(x().id),mr()}catch(e){v(e.message,"error")}}function mr(){const e=document.getElementById("team-agents-list");if(e){if(Ki.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=Ki.map(t=>{const n=m(t.name),s=m(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function ys(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,M()}async function gr(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await b.createInvitation(x().id,t,n),await bs(),C(),v("Invitation sent!","success")}catch(s){v(`Failed to send invitation: ${s.message}`,"error")}return!1}async function fr(e){if(confirm("Are you sure you want to remove this member?"))try{await b.removeMember(x().id,e),await Yi(),v("Member removed!","success")}catch(t){v(`Failed to remove member: ${t.message}`,"error")}}async function hr(e){try{await b.deleteInvitation(x().id,e),await bs(),v("Invitation canceled!","success")}catch(t){v(`Failed to cancel invitation: ${t.message}`,"error")}}function ws(){vs(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,M()}function Zi(){x()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${u(x().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${u(x().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${m(x().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,M())}async function vr(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await b.createTeam(t);await fs(),await hs(n),C(),v("Team created!","success")}catch(n){v(`Failed to create team: ${n.message}`,"error")}return!1}async function br(e){if(e.preventDefault(),!x())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await b.updateTeam(x().id,t);Li(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await fs(),C(),v("Team updated!","success")}catch(n){v(`Failed to update team: ${n.message}`,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Y({"select-team":(e,t)=>{hs(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{fr(t.userId)},"delete-invitation":(e,t)=>{hr(t.invitationId)},"invite-member":e=>{gr(e)},"create-team":e=>{vr(e)},"update-team":e=>{br(e)}}),Object.assign(window,{loadTeams:fs,renderTeamList:lr,selectTeam:hs,toggleTeamDropdown:vs,toggleUserDropdown:Vi,loadTeamMembersQuiet:cr,loadTeamMembers:Yi,renderTeamMembers:dr,loadTeamInvitations:bs,renderTeamInvitations:ur,loadTeamAgents:pr,renderTeamAgents:mr,showInviteModal:ys,handleInvite:gr,removeMember:fr,deleteInvitation:hr,showCreateTeamModal:ws,showEditTeamModal:Zi,handleCreateTeam:vr,handleUpdateTeam:br,getTeams:rr,getMembers:Cn,setMembers:_p});const yr=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let mt=[],Xi=null;function Qi(){const e=document.getElementById("board-project-filter");if(!e)return;const t=F();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join(""),!e.value){const n=_t();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)Ji(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function wr(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(Bt(e),ds(e)),Ji(e)}async function Ji(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){Qi();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{mt=await b.getIssues({project_id:t}),gt()}catch(i){v(`Failed to load board: ${i.message}`,"error")}}function gt(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=yr.map(t=>{const n=mt.filter(s=>s.status===t.key);return`
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
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${ke(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function kr(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Xi=t.dataset.id,t.classList.add("dragging")}function $r(e,t){t.classList.remove("dragging"),Xi=null}function Er(e,t){e.preventDefault(),t.classList.add("drag-over")}function _r(e,t){t.classList.remove("drag-over")}function Ir(e,t){e.preventDefault(),t.classList.add("drag-over")}function xr(e,t){t.classList.remove("drag-over")}async function Tr(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),s=t.dataset.status,i=mt.find(o=>o.id===n);if(!i)return;const a=i.status;if(i.status=s,Sr(s,n),gt(),a!==s)try{await b.updateIssue(n,{status:s}),v("Status updated","success")}catch(o){i.status=a,gt(),v(`Failed to update status: ${o.message}`,"error")}}async function Lr(e,t){e.preventDefault(),e.stopPropagation(),t.classList.remove("drag-over");const n=Xi||e.dataTransfer.getData("text/plain"),s=t.dataset.id;if(!n||!s||n===s)return;const i=t.closest(".kanban-column"),a=i==null?void 0:i.dataset.status;if(!a)return;const o=mt.find(d=>d.id===n);if(!o)return;const r=o.status;if(o.status=a,Sr(a,n,s),gt(),r!==a)try{await b.updateIssue(n,{status:a}),v("Status updated","success")}catch(d){o.status=r,gt(),v(`Failed to update status: ${d.message}`,"error")}}function Sr(e,t,n=null){const s=mt.filter(o=>o.status===e&&o.id!==t),i=mt.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];yr.forEach(o=>{o.key===e?a.push(...s):a.push(...mt.filter(r=>r.status===o.key))}),mt=a}Y({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),N(t.id)):e.type==="dragstart"?kr(e,n):e.type==="dragend"?$r(e,n):e.type==="dragover"?Ir(e,n):e.type==="dragleave"?xr(e,n):e.type==="drop"&&Lr(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Er(e,n):e.type==="dragleave"?_r(e,n):e.type==="drop"&&Tr(e,n)}});function ks(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Cr)},0))}function Cr(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Cr))}function Tt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Lt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function St(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Bn(){const e=Tt(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=we(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Ae(),xe(),Te()}function $s(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Bn()}function Es(){const e=Lt(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=ke(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Ae(),xe(),Te()}function _s(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Es()}function ea(){var s,i;const e=St(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Ae(),xe(),Te()}function Is(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),ea()}function Br(){var s,i;const e=St(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function Ip(){const e=document.getElementById("label-filter-dropdown");if(!e||!x())return;const t=e.querySelector(".multi-select-options");try{const n=await b.getLabels(x().id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" data-action="update-label-filter">
                    <span class="label-badge" style="background: ${K(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${m(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" data-action="clear-label-filter">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Ar(){var f,p,h,y,k,E;const e=new URLSearchParams,t=Tt(),n=Lt(),s=St(),i=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,a=(p=document.getElementById("project-filter"))==null?void 0:p.value,o=(h=document.getElementById("sprint-filter"))==null?void 0:h.value,r=(y=document.getElementById("issue-type-filter"))==null?void 0:y.value,d=(k=document.getElementById("group-by-select"))==null?void 0:k.value;t.forEach(T=>e.append("status",T)),n.forEach(T=>e.append("priority",T)),s.forEach(T=>e.append("label",T)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),d&&e.set("groupBy",d);const c=e.toString(),l=c?`/issues?${c}`:"/issues";history.replaceState({view:"issues"},"",l),Pu((E=x())==null?void 0:E.id,c)}function xp(){var c;let e=new URLSearchParams(window.location.search);if(e.toString()===""){const l=Ru((c=x())==null?void 0:c.id);if(l){e=new URLSearchParams(l);const f=`/issues?${l}`;history.replaceState({view:"issues"},"",f)}}const t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(p=>{p.checked=t.includes(p.value)}),Tp())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(p=>{p.checked=n.includes(p.value)}),Lp())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const o=e.get("issue_type");if(o){const l=document.getElementById("issue-type-filter");l&&(l.value=o)}const r=e.getAll("label");if(r.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(p=>{p.checked=r.includes(p.value)}),Br())}const d=e.get("groupBy");if(d){const l=document.getElementById("group-by-select");l&&(l.value=d)}}function Tp(){const e=Tt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=we(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Lp(){const e=Lt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=ke(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const jr=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function Mr(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",qt)):(t.classList.remove("hidden"),_e(),Ie(Vo()),setTimeout(()=>{document.addEventListener("click",qt)},0))}function Dr(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",qt)):(t.classList.remove("hidden"),Vp(),setTimeout(()=>{document.addEventListener("click",qt)},0))}function qt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",qt))}function Rr(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",qt)}function Pr(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return Tt().length;case"priority":return Lt().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return St().length;default:return 0}}function Sp(){let e=0;return jr.forEach(t=>{e+=Pr(t.key)}),e}function _e(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=jr.map(t=>{const n=Pr(t.key);return`
            <div class="filter-menu-category ${Vo()===t.key?"active":""}"
                 data-action="show-filter-category" data-category="${u(t.key)}">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function Ie(e){Qu(e),_e();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":Cp(t);break;case"status":Bp(t);break;case"priority":Ap(t);break;case"type":jp(t);break;case"assignee":Mp(t);break;case"sprint":Dp(t);break;case"labels":Rp(t);break}}function Cp(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=F()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${u(a.id)}">
                <input type="radio" name="project-filter-radio" value="${u(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${K(a.color)};"></span>
                <span class="filter-option-label">${m(a.name)}</span>
            </label>
        `}),e.innerHTML=i}const xs=["backlog","todo","in_progress","in_review"],Ts=["done","canceled"];function Bp(e){const t=Tt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=xs.every(o=>t.includes(o))&&!Ts.some(o=>t.includes(o))&&t.length===xs.length,i=Ts.every(o=>t.includes(o))&&!xs.some(o=>t.includes(o))&&t.length===Ts.length;let a=`
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
        `}),e.innerHTML=a}function Ap(e){const t=Lt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function jp(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${u(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Mp(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Cn()||[];let i=`
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
        `}),e.innerHTML=i}function Dp(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" data-action="set-sprint-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-sprint-filter" data-value="${u(a.value)}">
                <input type="radio" name="sprint-filter-radio" value="${u(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${m(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function Rp(e){const t=St(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),d=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",l=(d==null?void 0:d.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${K(l)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=i}function Nr(e){const t=document.getElementById("project-filter");t&&(t.value=e,na()),_e(),Ie("project"),xe(),Te()}function Pp(){Nr("")}function Np(e){const t=e==="open"?xs:Ts,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Bn(),_e(),Ie("status")}function qp(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Bn()),_e(),Ie("status")}function Op(){$s(),_e(),Ie("status"),xe(),Te()}function Hp(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Es()),_e(),Ie("priority")}function Fp(){_s(),_e(),Ie("priority"),xe(),Te()}function qr(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ae()),_e(),Ie("type"),xe(),Te()}function Up(){qr("")}function Or(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ae()),_e(),Ie("assignee"),xe(),Te()}function zp(){Or("")}function Hr(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ae()),_e(),Ie("sprint"),xe(),Te()}function Gp(){Hr("")}function Wp(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,ea()),_e(),Ie("labels")}function Kp(){Is(),_e(),Ie("labels"),xe(),Te()}function Vp(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(d=>`
                <div class="display-option ${s===d.value?"active":""}" data-action="set-sort" data-value="${u(d.value)}">
                    <span>${d.label}</span>
                    ${s===d.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(d=>`
                <div class="display-option ${i===d.value?"active":""}" data-action="set-group-by" data-value="${u(d.value)}">
                    <span>${d.label}</span>
                    ${i===d.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Yp(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,ft()),Rr()}function Zp(e){const t=document.getElementById("group-by-select");t&&(t.value=e,sa()),Rr()}function xe(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const f=(F()||[]).find(p=>p.id===n.value);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const s=Tt();if(s.length>0){const l=s.map(f=>we(f)).join(", ");t.push({category:"status",label:"Status",value:l,clearAction:"clear-status-filter-new"})}const i=Lt();if(i.length>0){const l=i.map(f=>ke(f)).join(", ");t.push({category:"priority",label:"Priority",value:l,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const l=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:l?l.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let l;if(o.value==="me")l="Me";else if(o.value==="unassigned")l="Unassigned";else{const p=(Cn()||[]).find(h=>h.user_id===o.value);l=(p==null?void 0:p.name)||(p==null?void 0:p.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:l,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const l=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(l==null?void 0:l.text)||r.value,clearAction:"clear-sprint-filter"})}const d=St();if(d.length>0){const l=document.getElementById("label-filter-dropdown"),f=d.map(p=>{var k;const h=l==null?void 0:l.querySelector(`input[value="${p}"]`),y=(k=h==null?void 0:h.closest("label"))==null?void 0:k.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(l=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${l.label}:</span>
            <span class="filter-chip-value">${m(l.value)}</span>
            <button class="filter-chip-remove" data-action="${l.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=c}function Xp(){const e=document.getElementById("project-filter");e&&(e.value=""),$s(),_s();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),Is(),Ae(),xe(),Te()}function Te(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Sp();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function Qp(){xe(),Te();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function Fr(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||ta(null),t)try{const a=await b.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${m(o.name)})</option>`),ta(o||null),a.forEach(r=>{const d=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${m(r.name)}${d}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function ta(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function ft(){var f,p,h,y,k,E,T;if(Yo(-1),!x())return;const e=document.getElementById("project-filter").value,t=Tt(),n=Lt(),s=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,i=(h=(p=document.getElementById("issue-search"))==null?void 0:p.value)==null?void 0:h.trim();if(!e&&F().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}Jp();const a={limit:1e3},o=((y=document.getElementById("sort-by-select"))==null?void 0:y.value)||"created-desc",[r,d]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,d&&(a.order=d),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(k=Ti())==null?void 0:k.id:a.assignee_id=s);const c=(E=document.getElementById("sprint-filter"))==null?void 0:E.value;if(c)if(c==="current"){if(e)try{const q=(await b.getSprints(e)).find(B=>B.status==="active");q&&(a.sprint_id=q.id)}catch(j){console.error("Failed to resolve current sprint:",j)}}else a.sprint_id=c;const l=(T=document.getElementById("issue-type-filter"))==null?void 0:T.value;l&&(a.issue_type=l),i&&i.length>=2&&(a.search=i);try{let j;e?(a.project_id=e,j=await b.getIssues(a)):F().length>0&&(j=await b.getTeamIssues(x().id,a));const q=St();q.length>0&&(j=j.filter(U=>!U.labels||U.labels.length===0?!1:U.labels.some(Z=>q.includes(Z.id)))),ze(j);const B=[...new Set(j.map(U=>U.project_id))];await Bl(B),st()}catch(j){v(j.message,"error")}}function Ur(){clearTimeout(np()),sp(setTimeout(()=>{ft()},300))}function Jp(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Ae(){Ar(),ft()}async function na(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&Bt(e),await Fr(),Qi(),_l(),Ae()}async function sa(){if(Ar(),zr()==="sprint"){const e=$e(),t=[...new Set(e.map(n=>n.project_id))];await Bl(t)}st()}function zr(){const e=document.getElementById("group-by-select");return e?e.value:""}Y({"update-label-filter":()=>ea(),"clear-label-filter":()=>Is(),"show-filter-category":(e,t)=>Ie(t.category),"set-project-filter":(e,t)=>Nr(t.value),"clear-project-filter":()=>Pp(),"clear-status-filter-new":()=>Op(),"set-status-preset":(e,t)=>Np(t.value),"toggle-status-option":(e,t)=>qp(t.filterValue,e),"clear-priority-filter-new":()=>Fp(),"toggle-priority-option":(e,t)=>Hp(t.filterValue,e),"set-type-filter":(e,t)=>qr(t.value),"clear-type-filter":()=>Up(),"set-assignee-filter":(e,t)=>Or(t.value),"clear-assignee-filter":()=>zp(),"set-sprint-filter":(e,t)=>Hr(t.value),"clear-sprint-filter":()=>Gp(),"clear-label-filter-new":()=>Kp(),"toggle-label-option":(e,t)=>Wp(t.filterValue,e),"set-sort":(e,t)=>Yp(t.value),"set-group-by":(e,t)=>Zp(t.value),"clear-all-filters":()=>Xp()});let An=[],ia=[];function ht(){return An}function Ot(e){An=e}async function aa(){var i,a;const e=x(),t=Ti();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=(a=document.getElementById("dashboard-project-filter"))==null?void 0:a.value;tm();try{const o={assignee_id:t.id,status:n||void 0,limit:1e3};let r;s?r=await b.getIssues({...o,project_id:s}):r=await b.getTeamIssues(e.id,o),An=r,jn()}catch(o){v(o.message,"error")}}async function Ht({showLoading:e=!0}={}){const t=x();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{ia=await b.getTeamActivities(t.id,0,10),em()}catch{n&&(n.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function em(){const e=document.getElementById("dashboard-activity-list");if(e){if(!ia.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=ia.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${u(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${u(t.document_id)}"><strong>${s} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${pa(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${ga(t)}${n}</span>
                <span class="activity-actor">by ${m(ma(t))}</span>
                <span class="activity-time">${Ue(t.created_at)}</span>
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
    `).join(""))}function oa(){aa()}function jn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),An.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=An.map(t=>qe(t)).join("")}}Y({"filter-my-issues":()=>oa(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Fi(t.identifier)}});const Gr=["backlog","todo","in_progress","in_review","done","canceled"],Wr=["no_priority","urgent","high","medium","low"],nm=["task","bug","feature","chore","docs","tech_debt","epic"];let Ge=[],Kr=Promise.resolve();function Vr(){return Ge}function Yr(e){Ge=e}async function ra(e,t,n,s){var f,p;e.preventDefault(),et();const a=(s||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Gr.map((h,y)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="status" data-value="${h}">
                    ${ve(h)}
                    <span>${we(h)}</span>
                    <span class="dropdown-shortcut">${y+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Wr.map((h,y)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="priority" data-value="${h}">
                    ${We(h)}
                    <span>${ke(h)}</span>
                    <span class="dropdown-shortcut">${y}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${nm.map(h=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="issue_type" data-value="${h}">
                    <span class="issue-type-badge type-${h}">${tt(h)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const h=ps();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${h.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:h.map(({assignee:y,indent:k},E)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="${u(y.id)}">
                    ${Pt(y,"avatar-small")}
                    <span>${Ui(y,k)}</span>
                    ${E<9?`<span class="dropdown-shortcut">${E+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const h=document.querySelector(`.issue-row[data-issue-id="${n}"]`),y=(h==null?void 0:h.dataset.projectId)||((f=he())==null?void 0:f.project_id),k=Wt(y);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${k.map((E,T)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="estimate" data-value="${E.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${E.label}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const h=$e(),y=ht(),k=he(),E=h.find(X=>X.id===n)||y.find(X=>X.id===n)||k,T=new Set(((E==null?void 0:E.labels)||[]).map(X=>X.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let q=a.bottom+4,B=a.left;B+j.width>window.innerWidth-8&&(B=a.right-j.width),q+j.height>window.innerHeight-8&&(q=a.top-j.height-4),o.style.top=`${q}px`,o.style.left=`${Math.max(8,B)}px`,Rt(o,{multiSelect:!0});let U=[];const Z=x();if(Z)try{U=await b.getLabels(Z.id)}catch(X){console.error("Failed to load labels:",X)}if(!o.parentNode)return;Jr(o,n,U,T);const O=o.getBoundingClientRect();let J=a.bottom+4,se=a.left;se+O.width>window.innerWidth-8&&(se=a.right-O.width),J+O.height>window.innerHeight-8&&(J=a.top-O.height-4),o.style.top=`${J}px`,o.style.left=`${Math.max(8,se)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const h=$e(),y=ht(),k=he(),E=h.find(D=>D.id===n)||y.find(D=>D.id===n)||k,T=(E==null?void 0:E.project_id)||((p=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:p.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let q=a.bottom+4,B=a.left;B+j.width>window.innerWidth-8&&(B=a.right-j.width),q+j.height>window.innerHeight-8&&(q=a.top-j.height-4),o.style.top=`${q}px`,o.style.left=`${Math.max(8,B)}px`,Rt(o);let U=[];if(T)try{U=await b.getSprints(T),Pm(T,U)}catch(D){console.error("Failed to load sprints:",D)}if(!o.parentNode)return;const Z=U.filter(D=>D.status!=="completed"||D.id===(E==null?void 0:E.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${Z.map((D,le)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="${u(D.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(D.name)}${D.status==="active"?" (Active)":""}</span>
                    ${le<9?`<span class="dropdown-shortcut">${le+1}</span>`:""}
                </button>
            `).join("")}
        `;const O=o.getBoundingClientRect();let J=a.bottom+4,se=a.left;se+O.width>window.innerWidth-8&&(se=a.right-O.width),J+O.height>window.innerHeight-8&&(J=a.top-O.height-4),o.style.top=`${J}px`,o.style.left=`${Math.max(8,se)}px`,o.classList.remove("dropdown-positioning");const X=D=>{const le=D.key;if(le==="Escape"){et(),document.removeEventListener("keydown",X),wn(null);return}const ce=parseInt(le);if(isNaN(ce))return;const Se=o.querySelectorAll(".dropdown-option");let w=!1;ce===0?(Ct(n,"sprint_id",null),w=!0):ce>=1&&ce<Se.length&&(Se[ce].click(),w=!0),w&&(document.removeEventListener("keydown",X),wn(null))};wn(X),document.addEventListener("keydown",X);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let d=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),d+r.height>window.innerHeight-8&&(d=a.top-r.height-4),o.style.top=`${d}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const l=h=>{const y=h.key;if(y==="Escape"){et(),document.removeEventListener("keydown",l);return}const k=parseInt(y);if(isNaN(k))return;let E=!1;if(t==="status"&&k>=1&&k<=6)Ct(n,"status",Gr[k-1]),E=!0;else if(t==="priority"&&k>=0&&k<=4)Ct(n,"priority",Wr[k]),E=!0;else if(t==="estimate"){const T=he(),j=Wt(T==null?void 0:T.project_id);k>=0&&k<j.length&&(Ct(n,"estimate",j[k].value),E=!0)}E&&(document.removeEventListener("keydown",l),wn(null))};wn(l),document.addEventListener("keydown",l),Rt(o)}function Zr(e,t,n,s){e.stopPropagation(),ra(e,t,n,s)}function Xr(e,t,n){Kr=Kr.then(()=>Qr(e,t,n))}async function Qr(e,t,n){const s=$e(),i=ht(),a=he(),o=s.find(l=>l.id===e)||i.find(l=>l.id===e)||a;if(!o)return;const r=(o.labels||[]).map(l=>l.id),d=r.indexOf(t);let c;if(d>=0?c=r.filter(l=>l!==t):c=[...r,t],n){const l=d<0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}try{const f=(await b.updateIssue(e,{label_ids:c})).labels||[],p=s.findIndex(E=>E.id===e);p!==-1&&(s[p].labels=f,ze([...s]));const h=i.findIndex(E=>E.id===e);h!==-1&&(i[h].labels=f,Ot([...i])),(a==null?void 0:a.id)===e&&rs({...a,labels:f});const y=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(y&&y.parentNode){const E=s.find(T=>T.id===e)||i.find(T=>T.id===e);E&&(y.outerHTML=qe(E))}const k=document.querySelector(".property-labels-btn");k&&(k.innerHTML=f.length>0?f.map(E=>`
                    <span class="issue-label" style="background: ${K(E.color)}20; color: ${K(E.color)}">${m(E.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(v("Failed to update labels","error"),n){const l=d>=0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}}}function Jr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${u(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${u(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${u(t)}" data-label-id="${u(i.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${K(i.color)}20; color: ${K(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}function sm(e,t){e.key==="Enter"&&(e.preventDefault(),Ls(t))}async function Ls(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=x();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await b.createLabel(s.id,{name:i}),o=await b.getLabels(s.id);os(o),a!=null&&a.id&&await Qr(e,a.id,null);const r=$e(),d=ht(),c=he(),l=r.find(p=>p.id===e)||d.find(p=>p.id===e)||c,f=new Set(((l==null?void 0:l.labels)||[]).map(p=>p.id));t&&Jr(t,e,o,f),n.value=""}catch(a){v(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function Ss(){const e=document.getElementById("create-issue-labels-label");e&&(Ge.length===0?e.textContent="Labels":e.textContent=`Labels (${Ge.length})`)}function la(e){const t=Ko();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Ge.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${u(n.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${K(n.color)}20; color: ${K(n.color)}">${m(n.name)}</span>
                </button>
            `}).join("")}
    `}function el(e){const t=Ge.indexOf(e);t>=0?Ge.splice(t,1):Ge.push(e),Ss();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&la(n)}function im(e){e.key==="Enter"&&(e.preventDefault(),Cs())}async function Cs(){const e=x();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await b.createLabel(e.id,{name:s}),a=await b.getLabels(e.id);os(a),i!=null&&i.id&&!Ge.includes(i.id)&&Ge.push(i.id),Ss(),t&&la(t),n.value=""}catch(i){v(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function Ct(e,t,n){var i;et();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await b.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=$e(),d=r.findIndex(p=>p.id===e);d!==-1&&(r[d]=o,ze([...r]));const c=ht(),l=c.findIndex(p=>p.id===e);l!==-1&&(c[l]=o,Ot([...c]));const f=he();if((f==null?void 0:f.id)===e&&rs(o),s&&s.parentNode){const p=r.find(h=>h.id===e)||c.find(h=>h.id===e)||o;if(p){s.outerHTML=qe(p);const h=document.querySelector(`.issue-row[data-issue-id="${e}"]`);h&&(h.classList.add("updated"),setTimeout(()=>h.classList.remove("updated"),500))}}if(v("Issue updated","success"),t==="status"){const p=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(p)try{const y=(await b.getSprints(p)).find(k=>k.status==="active");ta(y||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&am(t,o)}}catch(a){v(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function am(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const d of a){const c=d.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===i.toLowerCase()){o=d;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${ve(t.status)}
            <span>${we(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${We(t.priority)}
            <span>${ke(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${tt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const d=t.assignee_id?_n(t.assignee_id):null,c=d?It(d):null;r.innerHTML=c?`${Pt(d,"avatar-small")}<span>${m(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const d=ap(),c=t.sprint_id&&d?d.find(l=>l.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?m(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${qn(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}Y({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,s=t.field;s==="estimate"?Ct(t.issueId,s,n==="null"?null:Number(n)):Ct(t.issueId,s,n)},"toggle-issue-label":(e,t,n)=>{Xr(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Ls(t.issueId)},"toggle-create-issue-label":(e,t)=>{el(t.labelId)},"create-label-for-create-issue":()=>{Cs()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Ls(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Cs())}});const tl=["backlog","todo","in_progress","in_review","done","canceled"],nl=["urgent","high","medium","low","no_priority"],sl=["task","bug","feature","chore","docs","tech_debt","epic"];function vt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Ft(e){const t=vt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function st(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=$e();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=zr();n==="status"?om(e,t):n==="priority"?rm(e,t):n==="type"?lm(e,t):n==="assignee"?cm(e,t):n==="sprint"?dm(e,t):e.innerHTML=Ft(t)+t.map(s=>qe(s)).join("")}function om(e,t){const n={};tl.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Ft(t);tl.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${ve(i)}</span>
                    <span class="group-title">${we(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${vt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>qe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function rm(e,t){const n={};nl.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Ft(t);nl.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${We(i)}</span>
                    <span class="group-title">${ke(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${vt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>qe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function lm(e,t){const n={};sl.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Ft(t);sl.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${tt(i)}</span></span>
                    <span class="group-title">${tt(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${vt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>qe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function cm(e,t){const n={},s="__unassigned__";n[s]=[];const i=ps();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Ft(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${vt(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>qe(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const d=It(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${u(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Pt(o,"avatar-small")}</span>
                    <span class="group-title">${m(d)}${m(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${vt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(l=>qe(l)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function dm(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(d=>{d.sprint_id?(s[d.sprint_id]||(s[d.sprint_id]=[],i.push(d.sprint_id)),s[d.sprint_id].push(d)):s[n].push(d)});const a={active:0,planned:1,completed:2},o=El();i.sort((d,c)=>{const l=o[d],f=o[c],p=l?a[l.status]??3:3,h=f?a[f.status]??3:3;return p-h});let r=Ft(t);i.forEach(d=>{const c=s[d];if(c.length===0)return;const l=o[d],f=l?l.name:d,p=l?l.status==="active"?" (Active)":l.status==="completed"?" (Done)":"":"",h=d.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${h}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${h}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(f)}${p}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${vt(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${c.map(y=>qe(y)).join("")}
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
                    <span class="group-points">${vt(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(d=>qe(d)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function il(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function qe(e){const t=e.assignee_id?_n(e.assignee_id):null,n=t?It(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?qn(e.estimate,e.project_id):"",a=e.sprint_id?El()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${u(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${u(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${u(e.id)}" title="Priority: ${ke(e.priority)}">
                    ${We(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${u(e.id)}" title="Status: ${we(e.status)}">
                    ${ve(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${tt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.id)}">${m(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${K(r.color)}20; color: ${K(r.color)}">${m(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${u(e.id)}" title="Sprint: ${o?m(o):"None"}">
                    ${o?`<span class="sprint-badge">${m(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${u(e.id)}" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${u(e.id)}" title="${u(n||"Unassigned")}">
                    ${n?Pt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function We(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function ve(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}Y({"toggle-group":(e,t)=>{il(t.group)},"show-inline-dropdown":(e,t,n)=>{ra(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),N(t.issueId))}});function um(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function pm(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),d=Cn().map(c=>({id:c.id,name:c.name||c.email||"User",email:c.email||"",handle:um(c)})).filter(c=>!r||c.handle.includes(r)||c.name.toLowerCase().includes(r)||c.email.toLowerCase().includes(r)).slice(0,6);if(!d.length){n();return}t.innerHTML=d.map(c=>`
            <button type="button" class="mention-suggestion" data-handle="${u(c.handle)}">
                <span class="mention-name">${m(c.name)}</span>
                <span class="mention-handle">@${m(c.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset.handle,f=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${l} `),p=e.value.slice(i);e.value=f+p,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}const al=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Ut(e=null){var o;const t=e||((o=document.getElementById("project-filter"))==null?void 0:o.value);Yr([]);const n=F().map(r=>`
        <option value="${r.id}" ${r.id===t?"selected":""}>${m(r.name)}</option>
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
                            ${al.map(r=>`<option value="${r.id}">${r.label}</option>`).join("")}
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
                            ${ve("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${We("no_priority")}
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
    `,M(),Ss();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=Ou();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{Go(s.value,i.value)}),i.addEventListener("input",()=>{Go(s.value,i.value)}),s.focus()}function mm(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function gm(e){const t=al.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function ol(e,t){const n=F().find(s=>s.id===t);Yr([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                            ${ve("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${We("no_priority")}
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
    `,M(),Ss(),document.getElementById("create-issue-title").focus()}async function fm(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,c=d?parseInt(d):null;if(!n){v("Please enter a title","error");return}try{const l=await b.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Vr(),parent_id:e});C(),v(`Created sub-issue ${l.identifier}`,"success"),N(e)}catch(l){v(`Failed to create sub-issue: ${l.message}`,"error")}}async function hm(e,t,n){var o,r;et();const i=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${i.top-8}px`,a.style.left=`${i.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const d=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${u(we(c))}">
                    ${ve(c)}
                    <span>${we(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const d=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${u(ke(c))}">
                    ${We(c)}
                    <span>${ke(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const d=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${u(tt(c))}">
                    <span class="issue-type-badge type-${c}">${tt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!x())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let d=Ko();if(d.length===0)try{d=await b.getLabels(x().id),os(d)}catch(c){console.error("Failed to load labels:",c)}la(a),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Rt(a,{multiSelect:!0});return}else if(e==="assignee"){const d=document.getElementById("create-issue-assignee").value,c=ps();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:l,indent:f})=>{const p=It(l)||"User";return`
                <button class="dropdown-option ${l.id===d?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${u(l.id)}" data-label="${u(p)}">
                    ${Pt(l,"avatar-small")}
                    <span>${Ui(l,f)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const d=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,l=Wt(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(f=>{const p=f.value===null?"":String(f.value);return`
                <button class="dropdown-option ${p===d?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${u(p)}" data-label="${u(f.value?f.label:"Estimate")}">
                    <span>${m(f.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const d=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const f=(await b.getSprints(c)).filter(p=>p.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${f.map(p=>`
                        <button class="dropdown-option ${p.id===d?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${u(p.id)}" data-label="${u(p.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${m(p.name)}${p.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Rt(a)}function vm(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function bm(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=m(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${ve(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${We(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${tt(t)}</span><span id="create-issue-type-label">${s}</span>`)}et()}async function rl({keepOpen:e=!1}={}){var k,E;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,c=d?parseInt(d):null,l=((k=document.getElementById("create-issue-sprint"))==null?void 0:k.value)||null,f=(E=document.getElementById("create-issue-due-date"))==null?void 0:E.value,p=f?new Date(`${f}T00:00:00Z`).toISOString():null;if(!t){v("Please select a project","error");return}if(!n){v("Please enter a title","error");return}const h=document.getElementById("btn-create-issue"),y=document.getElementById("btn-create-and-new");h&&(h.disabled=!0),y&&(y.disabled=!0);try{const T=await b.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:l,label_ids:Vr(),due_date:p});v(`Created ${T.identifier}`,"success"),Hu(),A()==="issues"?ft():A()==="my-issues"&&aa(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(C(),N(T.id))}catch(T){v(`Failed to create issue: ${T.message}`,"error")}finally{h&&(h.disabled=!1),y&&(y.disabled=!1)}}async function ym(){await rl({keepOpen:!1})}async function wm(){await rl({keepOpen:!0})}Y({"toggle-create-dropdown":(e,t,n)=>{hm(t.dropdownType,e,n)},"set-create-field":(e,t)=>{bm(t.field,t.value,t.label)},"create-issue-submit":()=>{ym()},"create-issue-and-new":()=>{wm()},"update-create-project":()=>{vm()},"apply-template":e=>{gm(e.target.value)},"toggle-create-options":()=>{mm()},"create-sub-issue-submit":(e,t)=>{fm(t.parentId,t.projectId)}});async function ca(e){try{const t=await b.getIssue(e),n=await b.getSprints(t.project_id),i=Wt(t.project_id).map(a=>`
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
        `,M()}catch(t){v(`Failed to load issue: ${t.message}`,"error")}}async function ll(e,t){try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),d=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:d&&d.value?d.value:null};await b.updateIssue(t,c),C(),await N(t),v("Issue updated!","success")}catch(n){v(`Failed to update issue: ${n.message}`,"error")}}async function cl(e){if(confirm("Are you sure you want to delete this issue?"))try{await b.deleteIssue(e),await ft(),await be(),L("issues"),v("Issue deleted!","success")}catch(t){v(`Failed to delete issue: ${t.message}`,"error")}}Y({"update-issue":(e,t)=>{ll(e,t.issueId)}});let bt=!0,Mn=null,da=null,ua=null,Bs=null;function pa(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function ma(e){return e.user_name||e.user_email||"Unknown"}function ga(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(we(t(e.old_value)))}</strong> to <strong>${m(we(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(ke(t(e.old_value)))}</strong> to <strong>${m(ke(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=m(e.field_name||"ritual"),i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function dl(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function km(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,d=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let l;for(;(l=c.exec(t))!==null;)if(d=!0,l.index>r&&o.appendChild(document.createTextNode(t.slice(r,l.index))),l[1]){const f=l[1],p=document.createElement("a");p.href=`#/issue/${f}`,p.className="issue-link",p.textContent=f,o.appendChild(p),r=l.index+l[0].length}else if(l[3]){l[2]&&o.appendChild(document.createTextNode(l[2]));const f=document.createElement("span");f.className="mention",f.textContent="@"+l[3],o.appendChild(f),r=l.index+l[0].length}d&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function $m(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],d=document.createElement("a");d.href=`#/issue/${r}`,d.className="issue-link",d.textContent=r,s.appendChild(d),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function Em(e){if(!e)return"";const t=Le(e),n=document.createElement("div");return n.innerHTML=t,dl(n,km),n.innerHTML}function As(e){if(!e)return"";const t=Le(e),n=document.createElement("div");return n.innerHTML=t,dl(n,$m),n.innerHTML}function fa(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function ha(){bt=!bt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",bt),n&&n.classList.toggle("rotated",bt)}async function js(e){try{Mn=await b.getTicketRitualsStatus(e),ul(e)}catch(t){console.error("Failed to load ticket rituals:",t),Mn=null}}function ul(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Mn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=Mn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(l=>l.approval_mode==="gate")&&(bt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",bt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",bt);const r=n.some(l=>l.trigger==="ticket_close"),d=n.some(l=>l.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&d?c="⚠️ Pending rituals (claim before starting, close before completing):":d?c="⚠️ Complete these rituals before claiming this ticket:":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
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
                        <div class="ticket-ritual-prompt markdown-body">${l.prompt?Le(l.prompt):""}</div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ue(l.attestation.attested_at)}</span>
                                ${l.attestation.note?`<div class="attestation-note markdown-body">${Le(l.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Fm(l,e)}
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
                            <span class="ticket-ritual-name">${m(l.name)}</span>
                        </div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ue(l.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Ms(e){try{let t;e.includes("-")?t=await b.getIssueByIdentifier(e):t=await b.getIssue(e),t?await N(t.id,!1):L("my-issues",!1)}catch{L("my-issues",!1)}}async function N(e,t=!0){try{bt=!0;const[n,s,i,a,o,r]=await Promise.all([b.getIssue(e),b.getComments(e),b.getActivities(e),b.getSubIssues(e),b.getRelations(e),b.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),c=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(w=>w.attestation&&w.attestation.note).map(w=>({id:`attestation-${w.attestation.id}`,author_name:w.attestation.attested_by_name||"Unknown",content:w.attestation.note,created_at:w.attestation.attested_at,is_attestation:!0,ritual_name:w.name,is_pending:!w.attestation.approved_at}));Mn=r;const l=[...s,...c].sort((w,Oe)=>new Date(w.created_at)-new Date(Oe.created_at)),f=[n.parent_id?b.getIssue(n.parent_id):Promise.resolve(null),b.getSprints(n.project_id).catch(w=>(console.error("Failed to load sprints:",w),[]))],[p,h]=await Promise.all(f),y=o.filter(w=>w.relation_type==="blocks"&&w.direction==="outgoing"),k=o.filter(w=>w.relation_type==="blocked_by"||w.relation_type==="blocks"&&w.direction==="incoming"),E=o.filter(w=>w.relation_type==="relates_to");t&&history.pushState({issueId:e,view:A()},"",`/issue/${n.identifier}`),rs(n),Xo(h),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const T=document.getElementById("issue-detail-view");T.classList.remove("hidden");const j=A()||"my-issues",q=F().find(w=>w.id===n.project_id),B=n.assignee_id?_n(n.assignee_id):null,U=B?It(B):null,Z=n.sprint_id?h.find(w=>w.id===n.sprint_id):null,O=$e(),J=O.findIndex(w=>w.id===n.id),se=J>0?O[J-1]:null,X=J>=0&&J<O.length-1?O[J+1]:null,D=J>=0;T.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(j)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${D?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${se?`data-action="navigate-issue" data-issue-id="${u(se.id)}" data-identifier="${u(se.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${J+1} / ${O.length}</span>
                            <button class="issue-nav-btn" ${X?`data-action="navigate-issue" data-issue-id="${u(X.id)}" data-identifier="${u(X.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${q?m(q.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${p?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(p.identifier)}" data-action="navigate-issue" data-issue-id="${u(p.id)}" data-identifier="${u(p.identifier)}">${p.identifier}: ${m(p.title)}</a>
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
                            ${n.description?As(n.description):'<span class="add-description-link">Add description...</span>'}
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
                            `:a.map(w=>`
                                <a href="/issue/${encodeURIComponent(w.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${u(w.id)}" data-identifier="${u(w.identifier)}">
                                    <span class="sub-issue-status">${ve(w.status)}</span>
                                    <span class="sub-issue-id">${w.identifier}</span>
                                    <span class="sub-issue-title">${m(w.title)}</span>
                                    ${w.estimate?`<span class="sub-issue-estimate">${w.estimate}pts</span>`:""}
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
                            ${y.length===0&&k.length===0&&E.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${k.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${k.map(w=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${ve(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(w.related_issue_id)}" data-identifier="${u(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${y.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${y.map(w=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${ve(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(w.related_issue_id)}" data-identifier="${u(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${E.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${E.map(w=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${ve(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(w.related_issue_id)}" data-identifier="${u(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(w.id)}" title="Remove relation">
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

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
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
                                    <div class="activity-icon">${pa(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ga(w)}</span>
                                        <span class="activity-actor">by ${m(ma(w))}</span>
                                        <span class="activity-time">${Ue(w.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="comments-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="comments">
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
                                <div class="comment ${w.is_attestation?"comment-attestation":""} ${w.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${w.is_attestation?"avatar-attestation":""}">${w.is_attestation?w.is_pending?"⏳":"✓":(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(w.author_name||"User")}</span>
                                            ${w.is_attestation?`<span class="comment-ritual-badge">${w.is_pending?"Pending approval — ":""}Ritual: ${m(w.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ue(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Em(w.content)}</div>
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

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${u(n.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${ve(n.status)}
                                <span>${we(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${u(n.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${We(n.priority)}
                                <span>${ke(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${u(n.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${tt(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${u(n.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${U?`${Pt(B,"avatar-small")}<span>${m(U)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${u(n.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${Z?m(Z.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${u(n.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(w=>`
                                        <span class="issue-label" style="background: ${K(w.color)}20; color: ${K(w.color)}">${m(w.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${q?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(q.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${u(n.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${qn(n.estimate,n.project_id)}</span>
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
        `;const le=document.querySelector(".sidebar-overflow-trigger"),ce=document.querySelector(".overflow-menu-dropdown");if(le&&ce){const w=()=>{ce.classList.add("hidden"),le.setAttribute("aria-expanded","false")},Oe=()=>{const ee=ce.classList.toggle("hidden");le.setAttribute("aria-expanded",String(!ee))};le.addEventListener("click",Oe),document.addEventListener("click",ee=>{!le.contains(ee.target)&&!ce.contains(ee.target)&&w()}),ce.addEventListener("keydown",ee=>{ee.key==="Escape"&&(w(),le.focus())}),ce.querySelectorAll(".overflow-menu-item").forEach(ee=>{ee.addEventListener("click",()=>{const kt=ee.dataset.issueId;w(),ee.dataset.action==="edit"?ca(kt):ee.dataset.action==="delete"&&cl(kt)})})}ul(n.id),pm();const Se=document.getElementById("new-comment");if(Se){const w=Nu(n.id);w&&(Se.value=w),Se.addEventListener("input",()=>{_i(n.id,Se.value)}),Se.addEventListener("keydown",Oe=>{var ee;Oe.key==="Enter"&&(Oe.metaKey||Oe.ctrlKey)&&(Oe.preventDefault(),(ee=Se.closest("form"))==null||ee.requestSubmit())})}da=se?se.id:null,ua=X?X.id:null,Bs&&document.removeEventListener("keydown",Bs),Bs=w=>{if(w.metaKey||w.ctrlKey||w.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;w.key==="ArrowLeft"&&da?(w.preventDefault(),N(da)):w.key==="ArrowRight"&&ua&&(w.preventDefault(),N(ua));const ee={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[w.key];if(ee){const kt=document.querySelector(`.property-row[data-field="${ee}"]`);kt&&(w.preventDefault(),kt.click())}},document.addEventListener("keydown",Bs)}catch(n){v(`Failed to load issue: ${n.message}`,"error")}}async function pl(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;_i(t,null);try{await b.createComment(t,n),await N(t),v("Comment added!","success")}catch(s){_i(t,n),v(`Failed to add comment: ${s.message}`,"error")}return!1}async function ml(e){const t=he()||await b.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
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
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=qu(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?as(e,r):as(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&gl()}),a.addEventListener("keydown",r=>{var d,c;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),r.key==="Escape"&&(r.preventDefault(),(c=document.getElementById("cancel-description-edit"))==null||c.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{as(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||(i.setAttribute("data-action","edit-description"),i.setAttribute("data-issue-id",t.id)),i.innerHTML=t.description?As(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var d;const r=(d=document.getElementById("edit-description"))==null?void 0:d.value;if(r!==void 0)try{await b.updateIssue(e,{description:r}),as(e,null),v("Description updated","success"),N(e,!1)}catch(c){v(`Failed to update description: ${c.message}`,"error")}})}function gl(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?As(n):'<span class="text-muted">Nothing to preview.</span>'}function fl(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?gl():s.focus()}function hl(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,M(),document.getElementById("relation-issue-search").focus()}async function vl(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=x())==null?void 0:s.id,o=(await b.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${u(r.id)}" data-identifier="${u(r.identifier)}" data-title="${u(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function bl(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function yl(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function wl(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return v("Please select an issue","error"),!1;try{n==="blocked_by"?await b.createRelation(s,t,"blocks"):await b.createRelation(t,s,n),C(),v("Relation added","success"),N(t)}catch(i){v(`Failed to add relation: ${i.message}`,"error")}return!1}async function kl(e,t){try{await b.deleteRelation(e,t),v("Relation removed","success"),N(e)}catch(n){v(`Failed to remove relation: ${n.message}`,"error")}}Y({"show-detail-dropdown":(e,t,n)=>{Zr(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{ml(t.issueId)},"toggle-section":(e,t)=>{fa(t.section)},"toggle-ticket-rituals":()=>{ha()},"save-comment":(e,t)=>{pl(e,t.issueId)},"show-add-relation-modal":(e,t)=>{hl(t.issueId)},"remove-relation":(e,t)=>{e.stopPropagation(),kl(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{ol(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{wl(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{vl(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{bl(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{yl()},"set-description-editor-mode":(e,t)=>{fl(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})}});let zt=[],Ds={},Rs=new Set,it=null,$l=null,va=[],Dn=[],ba=[];function El(){return Ds}function _m(){return it}function _l(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=_t();t&&F().some(n=>n.id===t)&&(e.value=t)}e.value?at(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function Il(){const e=document.getElementById("sprint-project-filter").value;e&&(Bt(e),ds(e)),at(e)}async function at(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){Rm();try{await b.getCurrentSprint(t),zt=await b.getSprints(t),Im(),await Rn()}catch(n){v(n.message,"error")}}}function Im(){const e=document.getElementById("sprints-list");if(!e)return;const t=zt.find(a=>a.status==="active"),n=zt.find(a=>a.status==="planned"),s=zt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
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
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(t.id)}" data-sprint-name="${u(t.name)}" data-budget="${t.budget||""}" data-project-id="${u(t.project_id)}">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${u(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=xm(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${u(n.id)}" data-sprint-url="/sprint/${u(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${m(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(n.id)}" data-sprint-name="${u(n.name)}" data-budget="${n.budget||""}" data-project-id="${u(n.project_id)}">Edit Budget</button>
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
        `),e.innerHTML=i||`
        <div class="empty-state">
            <h3>No sprints yet</h3>
            <p>Sprints are created automatically when you close the current one, or you can create one from the project settings.</p>
        </div>
    `}function xm(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),l=((O,J,se)=>Math.min(Math.max(O,J),se))((new Date-o)/(r-o),0,1),f=360,p=120,h=16,y=h,k=f-h,E=h,T=p-h,j=O=>s===0?T:E+(1-O/s)*(T-E),q=j(s),B=j(0),U=y+(k-y)*l,Z=j(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${qs(e.start_date)} → ${qs(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${f} ${p}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${y}" y1="${q}" x2="${k}" y2="${B}" class="burndown-ideal" />
                <line x1="${y}" y1="${q}" x2="${U}" y2="${Z}" class="burndown-actual" />
                <circle cx="${U}" cy="${Z}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function Ps(e,t=!0){var n;try{const s=await b.getSprint(e);if(!s){v("Sprint not found","error"),L("sprints");return}$l=s;const i=(n=x())==null?void 0:n.id,[a,o,r]=await Promise.all([b.getIssues({sprint_id:e,limit:500}),b.getSprintTransactions(e).catch(()=>[]),i?b.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);va=a,ba=o,Dn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Lm()}catch(s){console.error("Failed to load sprint:",s),v("Failed to load sprint","error"),L("sprints")}}async function Tm(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){v("Invalid sprint ID","error"),L("sprints",!1);return}try{await Ps(e,!1)}catch{L("sprints",!1)}}function Lm(){const e=$l,t=va;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(l=>s.includes(l.status)),a=t.filter(l=>l.status==="done"),o=t.reduce((l,f)=>l+(f.estimate||0),0),r=a.reduce((l,f)=>l+(f.estimate||0),0);let d="";e.status==="active"?d='<span class="badge badge-status-active">Active</span>':e.status==="planned"?d='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(d='<span class="badge badge-status-completed">Completed</span>');const c=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="sprints">
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
                    ${qs(e.start_date)} → ${qs(e.end_date)}
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
                <h3>Open Issues (${i.length})</h3>
                ${i.length===0?`
                    <div class="empty-state-small">No open issues in this sprint</div>
                `:`
                    <div class="sprint-issues-list">
                        ${i.map(l=>xl(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${a.map(l=>xl(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Cm()}
            </div>

            ${Dn.length>0?`
            <div class="sprint-detail-section">
                <h3>Documents (${Dn.length})</h3>
                <div class="sprint-issues-list">
                    ${Dn.map(l=>Sm(l)).join("")}
                </div>
            </div>
            `:""}
        </div>
    `}function xl(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${u(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${Nm(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Sm(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${u(e.id)}" data-document-url="/document/${u(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ue(e.created_at)}</span>
            </span>
        </div>
    `}function Cm(){const e=ba;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Bm(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Bm(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Tl(e,t,n,s){const i=s?Wl(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${u(e)}" data-project-id="${u(s)}">
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
            <button type="submit" class="btn btn-primary">Save Budget</button>
        </form>
    `,M()}async function Ll(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await b.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const d=zt.filter(c=>c.status==="planned"&&c.id!==t);for(const c of d)await b.updateSprint(c.id,{budget:i})}a==="default"&&n&&await b.updateProject(n,{default_sprint_budget:i}),await at(),C(),v(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){v(`Failed to update budget: ${r.message}`,"error")}return!1}async function Sl(e){const t=zt.find(d=>d.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,M();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[d,c]=await Promise.all([b.getIssues({sprint_id:e,limit:500}),b.getRituals(t.project_id)]);s=d.filter(l=>n.includes(l.status)).length,i=c.some(l=>l.is_active&&l.trigger==="every_sprint")}catch(d){console.error("Failed to load sprint details:",d),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function Cl(e){try{const t=await b.closeSprint(e);await at(),t.limbo?jm(t):v("Sprint completed!","success")}catch(t){v(`Failed to complete sprint: ${t.message}`,"error")}}async function Rn(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{it=await b.getLimboStatus(e),Am()}catch(n){console.error("Failed to load limbo status:",n)}}function Am(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!it||!it.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${it.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function jm(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,M(),Mm(t)}async function Mm(e){try{const t=await b.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(s.name)} <span class="ritual-mode">(${m(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${Le(s.prompt)}</div>
                    ${ya(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Ns(){var t,n,s,i;if(!it)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",(s=document.querySelector(".modal"))==null||s.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${it.pending_rituals.map(a=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${a.attestation?a.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(a.name)}</strong>
                            <span class="badge badge-ritual-${u(a.approval_mode)}">${m(a.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${Le(a.prompt)}</div>
                        ${ya(a.attestation)}
                        ${Dm(a,e)}
                    </div>
                `).join("")}
            </div>
            ${((i=it.completed_rituals)==null?void 0:i.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${it.completed_rituals.map(a=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(a.name)}</div>
                            ${ya(a.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,M()}function ya(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(Ue(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${Le(e.note)}</div>
        </div>
    `}function Dm(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Bl(e){for(const t of e)if(!Rs.has(t))try{(await b.getSprints(t)).forEach(s=>{Ds[s.id]=s}),Rs.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Rm(){Ds={},Rs=new Set,va=[],ba=[],Dn=[]}function Pm(e,t){t.forEach(n=>{Ds[n.id]=n}),Rs.add(e)}Y({"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Ps(t.sprintId)},"stop-propagation":e=>{e.stopPropagation()},"show-edit-budget-modal":(e,t)=>{e.stopPropagation();const n=t.budget?parseFloat(t.budget):null;Tl(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":e=>{e.stopPropagation(),Ns()},"show-close-sprint-confirmation":(e,t)=>{e.stopPropagation(),Sl(t.sprintId)},"handle-update-budget":(e,t)=>{Ll(e,t.sprintId,t.projectId)},"close-modal":()=>{C()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,C(),Cl(t.sprintId)},"dismiss-limbo-modal":()=>{C(),Rn()},"approve-ritual":(e,t)=>{Ml(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{ka(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}N(t.issueId)},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}je(t.documentId)}});function qs(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Nm(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}async function qm(){const e=document.getElementById("ritual-project-filter");e&&(await be(),e.innerHTML='<option value="">Select Project</option>'+F().map(t=>`<option value="${u(t.id)}">${m(t.name)}</option>`).join(""))}async function Al(){const e=document.getElementById("rituals-project-filter");if(!e)return;Xm(Om),await be(),e.innerHTML='<option value="">Select a project</option>'+F().map(n=>`<option value="${u(n.id)}">${m(n.name)}</option>`).join("");const t=_t()||Kt();t&&F().some(n=>n.id===t)?(e.value=t,wa()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function wa(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){document.getElementById("rituals-tabs").classList.add("hidden"),t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}Jl(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await Yt()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${m(n.message)}</div>`}}function Om(){const e=document.getElementById("rituals-content"),t=ec(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Zt("rv-sprint-rituals-list",n,"sprint"),Zt("rv-close-rituals-list",s,"close"),Zt("rv-claim-rituals-list",i,"claim")}function jl(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Ml(e,t){try{await b.approveAttestation(e,t),v("Ritual approved!","success"),await Rn(),Ns()}catch(n){v(n.message,"error")}}async function ka(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Hm(s,e,t)}),M()}async function Hm(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await b.completeGateRitual(t,n,s||null),v("Ritual completed!","success"),await Rn();const i=_m();i&&!i.in_limbo?(C(),v("Limbo cleared! Next sprint is now active.","success")):Ns()}catch(i){v(i.message,"error")}return!1}function Fm(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}" data-ritual-prompt="${u(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Attest</button>`}function Dl(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${m(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Um(i,e,t)}),M()}async function Um(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return v("A note is required for this attestation.","error"),!1;try{await b.attestTicketRitual(t,n,s),v("Ritual attested!","success"),C(),await js(n)}catch(i){v(i.message,"error")}return!1}async function Rl(e,t){try{await b.attestTicketRitual(e,t),v("Ritual attested!","success"),await js(t)}catch(n){v(n.message,"error")}}async function Pl(e,t){try{await b.approveTicketRitual(e,t),v("Ritual approved!","success"),await js(t)}catch(n){v(n.message,"error")}}function Nl(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{zm(s,e,t)}),M()}async function zm(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await b.completeTicketGateRitual(t,n,s||null),v("Ritual completed!","success"),C(),await js(n)}catch(i){v(i.message,"error")}return!1}Y({"show-create-ritual-modal":(e,t)=>{Ba(t.trigger)},"approve-ticket-ritual":(e,t)=>{Pl(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{Nl(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{Dl(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{Rl(t.ritualId,t.issueId)}});function Le(e){if(!e)return"";try{R.setOptions({breaks:!0,gfm:!0});const n=R.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Uo.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function $a(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Gm(e,t,n,s,i,a,o,r){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${$a(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{Wm(c,e,t,n)}),M(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function Wm(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await b.completeTicketGateRitual(t,n,i||null),v(`GATE ritual "${s}" approved!`,"success"),C(),Gt()}catch(a){v(`Failed to complete gate ritual: ${a.message}`,"error")}}function Km(e,t,n,s,i,a,o,r){Gm(e,t,n,s,i,a,o,r)}function Vm(e,t,n,s,i,a,o,r,d){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${$a(r)}`:""}</div>`:""}
                ${d?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${Le(d)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{Ym(l,e,t,n)}),M(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Ym(e,t,n,s){e.preventDefault();try{await b.approveTicketRitual(t,n),v(`Review ritual "${s}" approved!`,"success"),C(),Gt()}catch(i){v(`Failed to approve review ritual: ${i.message}`,"error")}}function Zm(e,t,n,s,i,a,o,r,d){Vm(e,t,n,s,i,a,o,r,d)}let Ea=[];async function Gt(){if(!x())return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=await Promise.all(F().map(async i=>{const[a,o]=await Promise.all([b.getPendingApprovals(i.id),b.getLimboStatus(i.id)]);return{project:i,approvals:a,limbo:o}})),n=[],s=[];for(const{project:i,approvals:a,limbo:o}of t)if(n.push(...a),o&&o.in_limbo){const r=(o.pending_rituals||[]).filter(d=>{var c;return(c=d.attestation)!=null&&c.approved_at?!1:d.approval_mode==="gate"||!!d.attestation});r.length>0&&s.push({project:i,rituals:r})}tp(n),Ea=s,ql()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${m(t.message)}</p></div>`}}}function ql(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=ep(),n=Ea.length>0,s=!zu();if(t.length===0&&!n){s?e.innerHTML=`
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
                    ${Ea.map(({project:l,rituals:f})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(l.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${f.map(p=>{const h=p.attestation&&!p.attestation.approved_at,y=h?"⏳":"○",k=h?`<span class="gate-waiting-info">Attested by <strong>${m(p.attestation.attested_by_name||"Unknown")}</strong></span>`:p.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',E=h?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${u(p.id)}"
                                            data-project-id="${u(l.id)}">Approve</button>`:p.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${u(p.id)}"
                                                data-project-id="${u(l.id)}"
                                                data-ritual-name="${u(p.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${y} ${m(p.name)}
                                                    <span class="badge badge-ritual-${u(p.approval_mode)}">${m(p.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(p.prompt)}</span>
                                                ${k}
                                            </div>
                                            ${E}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=l=>l.pending_approvals||[],o=l=>f=>{const p=a(f).filter(l);return p.length>0?{...f,_filteredApprovals:p}:null},r=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="claim")).filter(Boolean),d=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="close")).filter(Boolean),c=t.map(o(l=>l.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(_a).join("")}
                </div>
            </div>
        `),d.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${d.map(_a).join("")}
                </div>
            </div>
        `),c.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(_a).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const f=l.dataset;Km(f.ritualId,f.issueId,f.ritualName,f.ritualPrompt,f.issueIdentifier,f.issueTitle,f.requestedBy,f.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const f=l.dataset;Zm(f.ritualId,f.issueId,f.ritualName,f.ritualPrompt,f.issueIdentifier,f.issueTitle,f.requestedBy,f.requestedAt,f.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0;try{await b.approveAttestation(l.dataset.ritualId,l.dataset.projectId),v("Sprint ritual approved!","success"),await Gt()}catch(f){l.disabled=!1,v(f.message,"error")}})}),e.querySelectorAll(".sprint-complete-btn").forEach(l=>{l.addEventListener("click",()=>{ka(l.dataset.ritualId,l.dataset.projectId,l.dataset.ritualName)})})}function Ol(){Gu(),ql()}function _a(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(s.requested_by_name)}</strong>${s.requested_at?` (${$a(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${Le(s.attestation_note)}</div>`:"",d=i?"review-approve-btn":"gate-approve-btn",c=i?"Approve":"Complete",l=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${m(s.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${m(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                <button class="btn btn-small btn-primary ${d}"
                    data-ritual-id="${u(s.ritual_id)}"
                    data-issue-id="${u(e.issue_id)}"
                    data-ritual-name="${u(s.ritual_name)}"
                    data-ritual-prompt="${u(s.ritual_prompt)}"
                    data-issue-identifier="${u(e.identifier)}"
                    data-issue-title="${u(e.title)}"
                    data-requested-by="${u(s.requested_by_name||"")}"
                    data-requested-at="${u(s.requested_at||"")}"
                    data-attestation-note="${u(s.attestation_note||"")}">${c}</button>
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
    `}Y({"view-issue-from-modal":(e,t)=>{e.preventDefault(),C(),N(t.issueId)},"dismiss-approvals-explainer":()=>{Ol()}});const Os={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Hs={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Hl=0;function Ia(e){Hl=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=Fl(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Fl(e="",t="",n=""){const s=Hl++,i=Object.keys(Os).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?Os[e]:Os.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${Hs[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",d=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${s}">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" data-action="toggle-value-input" data-row-id="${s}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${u(String(r))}" placeholder="Value"${d?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${s}">&times;</button>
        </div>
    `}function Ul(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Fl()),Fs()}function zl(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Fs()}function Gl(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Os[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Hs[o]}</option>`).join(""),xa(e),Fs()}function xa(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Pn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Fs(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Ta(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,d=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,c=o.querySelector(".condition-value");let l=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!d)continue;if(!r)throw Pn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!d)throw Pn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const f=`${r}__${d}`;if(n.has(f))throw Pn(`Duplicate condition: ${r} ${Hs[d]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${f}`);if(n.add(f),d==="isnull")t[f]=!0;else if(d==="in"||d==="contains")t[f]=l?l.split(",").map(p=>p.trim()).filter(p=>p):[];else if(d==="gte"||d==="lte"){if(!l)throw Pn(`Please enter a numeric value for ${r} ${Hs[d]}.`),new Error(`Missing numeric value for ${f}`);const p=parseInt(l,10);if(isNaN(p))throw Pn(`Invalid number "${l}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${f}: ${l}`);t[f]=p}else t[f]=l}return Fs(),Object.keys(t).length>0?t:null}Y({"add-condition-row":()=>{Ul()},"remove-condition-row":(e,t)=>{zl(Number(t.rowId))},"update-operator-options":(e,t)=>{Gl(Number(t.rowId))},"toggle-value-input":(e,t)=>{xa(Number(t.rowId))}}),Object.assign(window,{renderConditionBuilder:Ia,addConditionRow:Ul,removeConditionRow:zl,updateOperatorOptions:Gl,toggleValueInput:xa,collectConditions:Ta});let W=[],La=null;const Nn={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Xm(e){La=e}function F(){return W}function Qm(e){W=e}function Wt(e){const t=W.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Nn[n]||Nn.fibonacci}function qn(e,t){if(!e)return"No estimate";const s=Wt(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Wl(e){const t=W.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(Nn[n]||Nn.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function be(){if(x())try{W=await b.getProjects(x().id),Kl()}catch(e){v(e.message,"error")}}function Kl(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=document.getElementById("dashboard-project-filter"),a=e==null?void 0:e.value,o=t==null?void 0:t.value,r=n==null?void 0:n.value,d=s==null?void 0:s.value,c=i==null?void 0:i.value,l='<option value="">All Projects</option>'+W.map(h=>`<option value="${h.id}">${m(h.name)}</option>`).join(""),f='<option value="">Select Project</option>'+W.map(h=>`<option value="${h.id}">${m(h.name)}</option>`).join(""),p=Kt();if(e){e.innerHTML=l;let h=a;if(!h||!W.some(y=>y.id===h))if(p&&W.some(y=>y.id===p))h=p;else{const k=new URLSearchParams(window.location.search).get("project");k&&W.some(E=>E.id===k)?h=k:W.length>0&&(h=W[0].id)}h&&(e.value=h,zo(h))}if(t){t.innerHTML=f;const h=o||p;h&&W.some(y=>y.id===h)&&(t.value=h)}if(n){n.innerHTML=f;const h=r||p;h&&W.some(y=>y.id===h)&&(n.value=h)}if(s){s.innerHTML=l;const h=d||p;h&&W.some(y=>y.id===h)&&(s.value=h)}if(i){i.innerHTML=l;const h=c||p;h&&W.some(y=>y.id===h)&&(i.value=h)}}function Kt(){return Au()}function Bt(e){if(!e)return;zo(e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function Vt(){const e=document.getElementById("projects-list");if(W.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=W.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${u(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${K(t.color)}20; color: ${K(t.color)}">
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
    `).join("")}function Vl(e){Bt(e),L("issues")}function Us(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,M()}async function Yl(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await b.createProject(x().id,t),await be(),Vt(),C(),v("Project created!","success")}catch(n){v(`Failed to create project: ${n.message}`,"error")}return!1}function Jm(e){const t=W.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-project" data-project-id="${u(t.id)}">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" value="${u(t.name)}" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key</label>
                <input type="text" id="project-key" value="${t.key}" disabled class="input-disabled">
                <small class="form-hint">Project key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description">${m(t.description||"")}</textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="${K(t.color)}">
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
                <button type="button" class="btn btn-danger-outline" data-action="confirm-delete-project" data-project-id="${u(t.id)}">Delete Project</button>
            </div>
        </form>
    `,M()}async function Zl(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await b.updateProject(t,n),await be(),Vt(),C(),v("Project updated!","success")}catch(s){v(`Failed to update project: ${s.message}`,"error")}return!1}async function Xl(e){const t=W.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await b.deleteProject(e),await be(),Vt(),C(),v("Project deleted","success")}catch(n){v(`Failed to delete project: ${n.message}`,"error")}}let ye=null;async function Sa(e){ye=e,W.length===0&&await be();const t=W.find(n=>n.id===e);if(!t){v("Project not found","error"),L("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Ca("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Ca(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!ot||ot.length===0)&&Yt()}function Ql(){ye=null,ot=[]}function Jl(e){ye=e}function ec(){return ot}async function tc(){if(!ye)return;const e=document.getElementById("ps-name").value.trim();if(!e){v("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await b.updateProject(ye,t),await be(),v("Settings saved","success");const n=W.find(s=>s.id===ye);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){v(n.message,"error")}}async function nc(){if(!ye)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await b.updateProject(ye,n),await be(),v("Settings saved","success")}catch(s){v(`Failed to save settings: ${s.message}`,"error")}}let ot=[];async function Yt(){if(ye)try{ot=await b.getRituals(ye),eg(),typeof La=="function"&&La()}catch(e){v(e.message,"error")}}function eg(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=ot.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=ot.filter(s=>s.trigger==="ticket_close"),n=ot.filter(s=>s.trigger==="ticket_claim");Zt("ps-sprint-rituals-list",e,"sprint"),Zt("ps-close-rituals-list",t,"close"),Zt("ps-claim-rituals-list",n,"claim")}function Zt(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>u(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${Le(a.prompt)}</div>
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
  `}).join("")}async function Ba(e){if(!ye)return;let t=[];try{t=await b.getRitualGroups(ye)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Ia(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,M()}function sc(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function ic(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function ac(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw v("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await b.createRitualGroup(ye,{name:t,selection_mode:n})).id}return e.value||null}async function oc(e){e.preventDefault();let t;try{t=Ta()}catch{return!1}let n;try{n=await ac()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await b.createRitual(ye,s),await Yt(),C(),v("Ritual created!","success")}catch(i){v(`Failed to create ritual: ${i.message}`,"error")}return!1}async function rc(e){const t=ot.find(o=>o.id===e);if(!t)return;let n=[];try{n=await b.getRitualGroups(ye)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Ia(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,M()}async function lc(e,t){e.preventDefault();let n;try{n=Ta()}catch{return!1}let s;try{s=await ac()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await b.updateRitual(t,i),await Yt(),C(),v("Ritual updated!","success")}catch(a){v(`Failed to update ritual: ${a.message}`,"error")}return!1}async function cc(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await b.deleteRitual(e),await Yt(),v("Ritual deleted","success")}catch(n){v(`Failed to delete ritual: ${n.message}`,"error")}}Y({"view-project":(e,t)=>{Vl(t.projectId)},"view-project-settings":(e,t)=>{e.stopPropagation(),Sa(t.projectId)},"create-project":e=>{Yl(e)},"update-project":(e,t)=>{Zl(e,t.projectId)},"confirm-delete-project":(e,t)=>{Xl(t.projectId)},"edit-project-ritual":(e,t)=>{rc(t.ritualId)},"delete-project-ritual":(e,t)=>{cc(t.ritualId,t.ritualName)},"create-project-ritual":e=>{oc(e)},"update-project-ritual":(e,t)=>{lc(e,t.ritualId)},"toggle-ritual-conditions":()=>{sc()},"ritual-group-change":()=>{ic()}}),Object.assign(window,{loadProjects:be,updateProjectFilters:Kl,getSavedProjectId:Kt,setGlobalProjectSelection:Bt,renderProjects:Vt,viewProject:Vl,showCreateProjectModal:Us,handleCreateProject:Yl,viewProjectSettings:Sa,switchProjectSettingsTab:Ca,saveProjectSettingsGeneral:tc,saveProjectSettingsRules:nc,clearProjectSettingsState:Ql,showEditProjectModal:Jm,handleUpdateProject:Zl,confirmDeleteProject:Xl,getEstimateOptions:Wt,formatEstimate:qn,getEstimateScaleHint:Wl,getProjects:F,setProjects:Qm,ESTIMATE_SCALES:Nn,showCreateProjectRitualModal:Ba,handleCreateProjectRitual:oc,showEditProjectRitualModal:rc,handleUpdateProjectRitual:lc,deleteProjectRitual:cc,setCurrentSettingsProjectId:Jl,getProjectRituals:ec,loadProjectSettingsRituals:Yt,onRitualGroupChange:ic});function dc(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Aa=[],On=[],uc=null,z=new Set,Xt="list",At=!1,ja=null;const Ma=Fu();(Ma==="list"||Ma==="grid")&&(Xt=Ma);function Da(e){if(e!=="list"&&e!=="grid")return;Xt=e,e==="grid"&&At&&zs(),Uu(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),rt()}function Ra(){if(Xt!=="list")return;At=!0,z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),rt(),Jt()}function zs(){At=!1,z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),rt(),Jt()}function pc(){ja&&clearTimeout(ja),ja=setTimeout(()=>{rt()},300)}function mc(){const e=document.getElementById("doc-search");e&&(e.value=""),rt()}async function gc(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),await Gs()}async function fc(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),await Gs()}function tg(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),d=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${m(d)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function rt(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";tg(),On=Aa.filter(a=>{var o,r;if(e){const d=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!d&&!c)return!1}return!0}),On.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),hc("",Xt)}async function Gs(){var n,s;const e=uc||((n=x())==null?void 0:n.id);if(!e)return;const t=((s=document.getElementById("doc-project-filter"))==null?void 0:s.value)||null;try{Aa=await b.getDocuments(e,t),rt()}catch(i){v(i.message,"error")}}async function Qt(e,t=null){var s;if(e||(e=(s=x())==null?void 0:s.id),!e)return;uc=e;const n=document.getElementById("documents-list");if(n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null){const i=document.getElementById("doc-project-filter");i!=null&&i.value&&(t=i.value)}try{Aa=await b.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",Xt==="list"),a.classList.toggle("active",Xt==="grid")),rt()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),v(i.message,"error")}}function ng(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${K(t.color)}; color: white;">${m(t.name)}</span>`).join(" ")}function sg(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${ng(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${u(e.id)}" data-action="view-document" data-document-id="${u(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(dc(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function ig(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${K(r.color)}; color: white;">${m(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?dc(e.content).substring(0,80):"No content",i=At?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${u(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${z.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${At&&z.has(e.id)?" selected":""}" data-action="${At?"toggle-doc-selection":"view-document"}" data-document-id="${u(e.id)}" data-doc-id="${u(e.id)}">
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
  `}function hc(e="",t="list"){var c,l;const n=document.getElementById("documents-list");if(!n)return;z.clear(),Jt();const s=On;if(s.length===0){const f=(c=document.getElementById("doc-search"))==null?void 0:c.value,p=(l=document.getElementById("doc-project-filter"))==null?void 0:l.value,h=f||p;n.innerHTML=`
      <div class="empty-state">
        <h3>${h?"No documents match your filters":"No documents yet"}</h3>
        <p>${h?"Try different search terms or filters":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?sg:ig,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=F();s.forEach(f=>{let p,h;if(e==="project")if(p=f.project_id||"__global__",p==="__global__")h="Global (Team-wide)";else{const y=r.find(k=>k.id===f.project_id);h=y?y.name:"Unknown Project"}else e==="sprint"&&(p=f.sprint_id||"__no_sprint__",h=f.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:h,docs:[]}),o[p].docs.push(f)});let d="";for(const[f,p]of Object.entries(o)){const h=t==="grid"?"doc-group-content grid":"doc-group-content";d+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${h}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=d}function vc(e){z.has(e)?z.delete(e):z.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=z.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",z.has(e)),Jt()}function bc(){On.forEach(e=>z.add(e.id)),On.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Jt()}function Pa(){z.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),z.clear(),Jt()}function Jt(){const e=document.getElementById("doc-bulk-actions");e&&(At?(e.classList.remove("hidden"),z.size>0?e.innerHTML=`
        <span class="bulk-count">${z.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function yc(){if(z.size===0){v("No documents selected","error");return}const t=F().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${z.size} Document${z.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${z.size} selected document${z.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,M()}async function wc(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(z);let s=0,i=0;for(const r of n)try{await b.updateDocument(r,{project_id:t}),s++}catch(d){console.error(`Failed to move document ${r}:`,d),i++}C(),Pa(),i===0?v(`Moved ${s} document${s>1?"s":""}!`,"success"):v(`Moved ${s}, failed ${i}`,"warning");const a=(o=x())==null?void 0:o.id;return await Qt(a),!1}async function kc(){var a;if(z.size===0){v("No documents selected","error");return}const e=z.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(z);let n=0,s=0;for(const o of t)try{await b.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}zs(),s===0?v(`Deleted ${n} document${n>1?"s":""}!`,"success"):v(`Deleted ${n}, failed ${s}`,"warning");const i=(a=x())==null?void 0:a.id;await Qt(i)}async function je(e,t=!0){try{const n=await b.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(p=>p.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");let i="";try{const p=await b.getDocumentIssues(n.id);p.length>0?i=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${p.map(y=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(y.identifier)}</span>
            <span class="linked-item-title">${m(y.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${u(n.id)}" data-issue-id="${u(y.id)}" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" data-action="show-link-issue-modal" data-document-id="${u(n.id)}">+ Link Issue</button>
          </div>
        `:i=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <button class="btn btn-secondary btn-small" data-action="show-link-issue-modal" data-document-id="${u(n.id)}">+ Link Issue</button>
          </div>
        `}catch{}let a="";try{const p=await b.getDocumentComments(n.id);a=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${p.length===0?'<div class="comments-empty">No comments yet</div>':p.map(y=>{var k,E;return`
            <div class="comment" data-comment-id="${u(y.id)}">
              <div class="comment-avatar">${((E=(k=y.author_name)==null?void 0:k.charAt(0))==null?void 0:E.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${m(y.author_name||"Unknown")}</span>
                  <span class="comment-date">${Ue(y.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${Le(y.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" data-action="add-document-comment" data-document-id="${u(n.id)}">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(p){console.error("Failed to load comments:",p)}let o=null,r=null;if(n.project_id){const h=F().find(y=>y.id===n.project_id);if(o=h?h.name:null,n.sprint_id)try{const y=await b.getSprint(n.sprint_id);r=y?y.name:null}catch{}}let d="";o?(d=`<span class="badge badge-primary">${m(o)}</span>`,r&&(d+=` <span class="badge badge-info">${m(r)}</span>`)):d='<span class="badge badge-secondary">Global</span>';let c="";n.labels&&n.labels.length>0?c=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(h=>`
        <span class="label-badge" style="background-color: ${K(h.color)}; color: white;">
          ${m(h.name)}
          <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${u(n.id)}" data-label-id="${u(h.id)}" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" data-action="show-add-label-to-doc-modal" data-document-id="${u(n.id)}">+ Add Label</button>
        </div>
      `:c=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <button class="btn btn-secondary btn-small" data-action="show-add-label-to-doc-modal" data-document-id="${u(n.id)}">+ Add Label</button>
        </div>
      `;let l=n.content||"";const f=l.match(/^\s*#\s+(.+?)(\n|$)/);f&&f[1].trim()===n.title.trim()&&(l=l.replace(/^\s*#\s+[^\n]*\n?/,"").trimStart()),s.querySelector("#document-detail-content").innerHTML=`
      <div class="back-button" data-action="navigate-to" data-view="documents">
        ← Back to Documents
      </div>
      <div class="document-detail-header">
        <div class="document-detail-header-top">
          <div>
            <h2 class="document-title">${m(n.title)}</h2>
            <div class="document-meta">
              ${d}${n.author_name?` · By ${m(n.author_name)}`:""} · Last updated ${new Date(n.updated_at).toLocaleString()}
            </div>
          </div>
          <div class="document-actions">
            <button class="btn btn-secondary btn-small" data-action="show-edit-document-modal" data-document-id="${u(n.id)}">Edit</button>
            <button class="btn btn-danger btn-small" data-action="delete-document" data-document-id="${u(n.id)}">Delete</button>
          </div>
        </div>
      </div>
      <div class="document-content markdown-body">${l?Le(l):"No content"}</div>
      ${c}
      ${i}
      ${a}
    `}catch(n){v(n.message,"error")}}async function Na(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await b.getSprints(t);let o=n;if(s&&!n){const d=a.find(c=>c.status==="active");d&&(o=d.id)}const r=a.map(d=>`<option value="${d.id}" ${d.id===o?"selected":""}>${m(d.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Ws(){const e=F(),t=Kt()||"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,M(),t&&await Na("doc-sprint",t,null,!0)}async function $c(e){var a;e.preventDefault();const t=(a=x())==null?void 0:a.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await b.createDocument(t,i),await Qt(t),C(),v("Document created!","success")}catch(o){v(o.message,"error")}return!1}async function Ec(e){try{const t=await b.getDocument(e),s=F().map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
    `,M(),t.project_id&&await Na("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){v(t.message,"error")}}async function _c(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await b.updateDocument(t,i),C(),await je(t),v("Document updated!","success")}catch(a){v(a.message,"error")}return!1}async function Ic(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await b.deleteDocument(e);const n=(t=x())==null?void 0:t.id;await Qt(n),L("documents"),v("Document deleted!","success")}catch(n){v(n.message,"error")}}function xc(e,t){Na(e,t)}async function Tc(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${u(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,M()}async function Lc(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=x())==null?void 0:s.id,a=await b.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${u(t)}" data-issue-id="${u(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Sc(e,t){try{await b.linkDocumentToIssue(e,t),C(),v("Issue linked!","success"),await je(e,!1)}catch(n){v(n.message,"error")}}async function Cc(e,t){if(confirm("Unlink this issue from the document?"))try{await b.unlinkDocumentFromIssue(e,t),v("Issue unlinked!","success"),await je(e,!1)}catch(n){v(n.message,"error")}}async function Bc(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return v("Please enter a comment","error"),!1;try{await b.createDocumentComment(t,s),n.value="",v("Comment added!","success"),await je(t,!1)}catch(i){v(i.message,"error")}return!1}async function Ac(e){var n;const t=(n=x())==null?void 0:n.id;if(!t){v("No team selected","error");return}try{const s=await b.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,M();return}const i=s.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${u(e)}" data-label-id="${u(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${K(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,M()}catch(s){v(s.message,"error")}}async function jc(e,t){try{await b.addLabelToDocument(e,t),C(),v("Label added!","success"),await je(e,!1)}catch(n){v(n.message,"error")}}async function Mc(e,t){try{await b.removeLabelFromDocument(e,t),v("Label removed!","success"),await je(e,!1)}catch(n){v(n.message,"error")}}Y({"view-document":(e,t)=>{e.preventDefault(),je(t.documentId)},"toggle-doc-selection":(e,t)=>{e.stopPropagation(),vc(t.docId)},"clear-doc-search":()=>{mc()},"clear-doc-project-filter":()=>{gc()},"clear-all-doc-filters":()=>{fc()},"show-bulk-move-modal":()=>{yc()},"bulk-delete-documents":()=>{kc()},"select-all-docs":()=>{bc()},"clear-doc-selection":()=>{Pa()},"exit-selection-mode":()=>{zs()},"enter-selection-mode":()=>{Ra()},"handle-bulk-move":e=>{wc(e)},"unlink-document-issue":(e,t)=>{Cc(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Tc(t.documentId)},"add-document-comment":(e,t)=>{Bc(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Mc(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Ac(t.documentId)},"show-edit-document-modal":(e,t)=>{Ec(t.documentId)},"delete-document":(e,t)=>{Ic(t.documentId)},"create-document":e=>{$c(e)},"update-doc-sprint-dropdown":(e,t,n)=>{xc(t.sprintSelect,n.value)},"update-document":(e,t)=>{_c(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Lc(n.value,t.documentId)},"link-to-issue":(e,t)=>{Sc(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{jc(t.documentId,t.labelId)}}),Object.assign(window,{loadDocuments:Qt,filterDocuments:rt,renderDocuments:hc,viewDocument:je,showCreateDocumentModal:Ws,handleCreateDocument:$c,showEditDocumentModal:Ec,handleUpdateDocument:_c,deleteDocument:Ic,updateDocSprintDropdown:xc,showLinkIssueModal:Tc,searchIssuesToLink:Lc,linkToIssue:Sc,unlinkDocumentFromIssue:Cc,toggleDocSelection:vc,selectAllDocs:bc,clearDocSelection:Pa,showBulkMoveModal:yc,handleBulkMove:wc,bulkDeleteDocuments:kc,handleAddDocumentComment:Bc,showAddLabelToDocModal:Ac,addLabelToDoc:jc,removeLabelFromDoc:Mc,setDocViewMode:Da,enterSelectionMode:Ra,exitSelectionMode:zs,debounceDocSearch:pc,clearDocSearch:mc,clearDocProjectFilter:gc,clearAllDocFilters:fc,onDocProjectFilterChange:Gs});let qa=[];async function Ks(){try{qa=await b.getApiKeys(),ag()}catch(e){v(e.message,"error")}}function ag(){const e=document.getElementById("api-keys-list");if(e){if(qa.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=qa.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${xi(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${xi(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${u(t.id)}" data-key-name="${u(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function Oa(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,M()}async function og(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await b.createApiKey(t);C(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,M()}catch(n){v(n.message,"error")}return!1}async function Dc(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),v("API key copied to clipboard","success")}catch{v("Failed to copy","error")}}async function Rc(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await b.revokeApiKey(e),v("API key revoked","success"),await Ks()}catch(n){v(n.message,"error")}}window.loadApiKeys=Ks,window.showCreateApiKeyModal=Oa,Y({"create-api-key":e=>{og(e)},"copy-api-key":()=>{Dc()},"dismiss-api-key-modal":()=>{C(),Ks()},"revoke-api-key":(e,t)=>{Rc(t.keyId,t.keyName)}});let Vs=!1,lt=0,yt=[],Ys=[];function rg(e){Ys=e,yt=[...e]}function Pc(){return Vs}function lg(){if(Vs)return;Vs=!0,lt=0,yt=[...Ys];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Zs()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>cg(n.target.value)),t.addEventListener("keydown",ug),Hn(),requestAnimationFrame(()=>t.focus())}function Zs(){Vs=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function cg(e){const t=e.toLowerCase().trim();t?yt=Ys.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):yt=[...Ys],lt=0,Hn()}function Hn(){const e=document.getElementById("command-results");if(!e)return;if(yt.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};yt.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===lt?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function dg(e){lt=e,Hn()}function Nc(e){const t=yt[e];t&&(Zs(),t.action())}function ug(e){switch(e.key){case"ArrowDown":e.preventDefault(),lt=Math.min(lt+1,yt.length-1),Hn();break;case"ArrowUp":e.preventDefault(),lt=Math.max(lt-1,0),Hn();break;case"Enter":e.preventDefault(),Nc(lt);break;case"Escape":e.preventDefault(),Zs();break}}Y({"execute-command":(e,t)=>{if(e.type==="mouseover"){dg(Number(t.commandIndex));return}Nc(Number(t.commandIndex))}});let Ke=null,ct=0,en=null,tn=null,Fn=null,Ha=!1;function qc(){return ju()}function Oc(){Mu()}function Hc(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function pg(){Ke||(Ke=document.createElement("div"),Ke.id="onboarding-overlay",Ke.className="onboarding-overlay",document.getElementById("app").appendChild(Ke))}function Un(){if(!Ke)return;const e=Ha?Uc():Fc(),t=e[ct],n=e.map((s,i)=>`<span class="onboarding-dot${i===ct?" active":""}${i<ct?" completed":""}"></span>`).join("");Ke.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Fc(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Hc(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Hc(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&en&&(e.textContent=`${en.name} (${en.key})`),t&&tn&&(t.textContent=`${tn.name} (${tn.key})`),n&&Fn&&(n.textContent=`${Fn.identifier} - ${Fn.title}`)}}]}function Uc(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Fa(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Ua(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function nn(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=Ha?Uc():Fc();ct<e.length-1&&(ct++,Un())},window._onboardingSkip=function(){Oc(),Ga(),window.initApp&&window.initApp()},window._onboardingFinish=function(){Oc(),Ga(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),Ua("onboarding-team-error"),nn("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{en=await b.createTeam({name:t,key:n}),ct++,Un()}catch(s){Fa("onboarding-team-error",s.message||"Failed to create team"),nn("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),Ua("onboarding-project-error"),nn("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{tn=await b.createProject(en.id,{name:t,key:n}),ct++,Un()}catch(s){Fa("onboarding-project-error",s.message||"Failed to create project"),nn("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),Ua("onboarding-issue-error"),nn("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Fn=await b.createIssue(tn.id,{title:t}),ct++,Un()}catch(n){Fa("onboarding-issue-error",n.message||"Failed to create issue"),nn("onboarding-issue-submit",!1)}};function za(e=!1){Ha=e,ct=0,en=null,tn=null,Fn=null,pg(),Un()}function Ga(){Ke&&(Ke.remove(),Ke=null)}function Xs(){Du(),za(!0)}Y({"onboarding-next":e=>{e.preventDefault(),window._onboardingNext()},"onboarding-skip":e=>{e.preventDefault(),window._onboardingSkip()},"onboarding-finish":e=>{e.preventDefault(),window._onboardingFinish()},"onboarding-create-team":e=>{window._onboardingCreateTeam(e)},"onboarding-create-project":e=>{window._onboardingCreateProject(e)},"onboarding-create-issue":e=>{window._onboardingCreateIssue(e)}}),window.showOnboarding=za,window.hideOnboarding=Ga,window.resetOnboarding=Xs,window.hasCompletedOnboarding=qc;async function mg(){const e=document.getElementById("epics-project-filter");if(!e)return;await be(),e.innerHTML='<option value="">All Projects</option>'+F().map(n=>`<option value="${u(n.id)}">${m(n.name)}</option>`).join("");const t=_t()||Kt();t&&F().some(n=>n.id===t)&&(e.value=t),Wa()}function zc(){var t;const e=(t=document.getElementById("epics-project-filter"))==null?void 0:t.value;e&&(Bt(e),ds(e)),Wa()}async function Wa(){var t,n;const e=document.getElementById("epics-list");if(e){e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((t=x())!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value;let i;if(s?i=await b.getIssues({project_id:s,issue_type:"epic"}):i=await b.getTeamIssues(x().id,{issue_type:"epic"}),!i||i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Click "+ New Epic" above or use the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await b.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));gg(a,e)}catch(s){e.innerHTML=`<div class="empty-state">Failed to load epics: ${m(s.message||String(s))}</div>`}}}function gg(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(f=>f.status==="done"||f.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",d=`status-${(s.status||"backlog").replace(/_/g,"-")}`,c=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase()),l=s.estimate!=null?`${s.estimate}pts`:"-";return`
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&pp(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Gc(){var n;const e=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value,t=F().map(s=>`
        <option value="${u(s.id)}" ${s.id===e?"selected":""}>${m(s.name)}</option>
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
    `,M(),document.getElementById("create-epic-form").addEventListener("submit",fg),document.getElementById("create-epic-title").focus()}async function fg(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){v("Please select a project","error");return}if(!n){v("Please enter a title","error");return}try{const i=await b.createIssue(t,{title:n,description:s||null,issue_type:"epic"});C(),v(`Created epic ${i.identifier}`,"success"),Wa()}catch(i){v(`Failed to create epic: ${i.message}`,"error")}}async function Ka(e){try{let t;if(e.includes("-")?t=await b.getIssueByIdentifier(e):t=await b.getIssue(e),t){if(t.issue_type!=="epic"){N?N(t.id,!1):L("epics",!1);return}await Va(t.id,!1)}else L("epics",!1)}catch{L("epics",!1)}}async function Va(e,t=!0){try{const[n,s,i,a]=await Promise.all([b.getIssue(e),b.getSubIssues(e),b.getActivities(e),b.getComments(e)]);if(n.issue_type!=="epic"){N?N(e,t):L("epics",!1);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=A()||"epics",d=F().find(k=>k.id===n.project_id),c=n.assignee_id?_n(n.assignee_id):null,l=c?It(c):null,f=s.length,p=s.filter(k=>k.status==="done"||k.status==="canceled").length,h=f>0?Math.round(p/f*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${d?m(d.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${As(n.description)}
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
                                <span>${p} of ${f} done</span>
                                <span>${h}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:s.map(k=>{const E=k.assignee_id?_n(k.assignee_id):null,T=E?It(E):null;return`
                                <div class="sub-issue-item" data-issue-id="${u(k.id)}" data-identifier="${u(k.identifier)}">
                                    <span class="sub-issue-status">${ve(k.status)}</span>
                                    <span class="sub-issue-id">${m(k.identifier)}</span>
                                    <span class="sub-issue-title">${m(k.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(k.status||"backlog").replace(/_/g,"-")}">${we(k.status)}</span>
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
                            `:i.map(k=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${pa(k.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ga(k)}</span>
                                        <span class="activity-actor">by ${m(ma(k))}</span>
                                        <span class="activity-time">${Ue(k.created_at)}</span>
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
                                            <span class="comment-author">${m(k.author_name||"User")}</span>
                                            <span class="comment-date">${Ue(k.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${m(k.content||"")}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                    `:""}
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row">
                            <span class="property-label">Status</span>
                            <span class="property-value-static">
                                ${ve(n.status)}
                                ${we(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${We(n.priority)}
                                ${ke(n.priority)}
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
                                ${qn(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(k=>`
                                    <span class="issue-label" style="background: ${K(k.color)}20; color: ${K(k.color)}">${m(k.name)}</span>
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
        `;const y=o.querySelector(".sub-issues-list");y&&y.addEventListener("click",k=>{const E=k.target.closest(".sub-issue-item");E&&E.dataset.issueId&&N&&N(E.dataset.issueId)})}catch(n){v(`Failed to load epic: ${n.message}`,"error")}}function hg(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function vg(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function Wc(e,t,n="#issues-list .list-item"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function bg(e){return function(n){if(e.getCurrentView()!=="issues"||n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll("#issues-list .list-item");if(s.length===0)return;const i=e.getSelectedIndex();switch(n.key){case"j":n.preventDefault(),Wc(i+1,e.setSelectedIndex);break;case"k":n.preventDefault(),Wc(i-1,e.setSelectedIndex);break;case"Enter":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.viewIssue(a)}break;case"e":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.showEditIssueModal(a)}break;case"Escape":i>=0&&(n.preventDefault(),s.forEach(a=>a.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const wt=new Map,Kc=6e4,Ya=100;let re=null,Za=null,Xa=null,zn=null,Vc=!1;const yg={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},wg={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Yc={api:null};let Qa={...Yc};function kg(e={}){Qa={...Yc,...e},re||(re=document.createElement("div"),re.className="issue-tooltip",re.style.display="none",document.body.appendChild(re),re.addEventListener("mouseenter",()=>{clearTimeout(Za)}),re.addEventListener("mouseleave",()=>{Ja()})),Vc||(document.addEventListener("mouseover",$g),document.addEventListener("mouseout",Eg),Vc=!0)}function $g(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=_g(t);if(n){if(n===zn&&re.style.display!=="none"){clearTimeout(Za);return}clearTimeout(Xa),Xa=setTimeout(()=>{Ig(t,n)},200)}}function Eg(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Xa),Za=setTimeout(()=>{Ja()},150))}function _g(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Ig(e,t){zn=t;const n=e.getBoundingClientRect();re.style.left=`${n.left+window.scrollX}px`,re.style.top=`${n.bottom+window.scrollY+8}px`,re.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',re.style.display="block";try{const s=await Tg(t);if(zn!==t)return;Lg(s)}catch{if(zn!==t)return;re.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Ja(){re&&(re.style.display="none"),zn=null}function xg(){const e=Date.now();for(const[t,n]of wt.entries())e-n.timestamp>=Kc&&wt.delete(t)}async function Tg(e){wt.size>Ya/2&&xg();const t=wt.get(e);if(t&&Date.now()-t.timestamp<Kc)return t.issue;if(!Qa.api)throw new Error("API not initialized");const n=await Qa.api.getIssueByIdentifier(e);if(wt.size>=Ya){const s=Array.from(wt.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Ya/2);for(const[a]of i)wt.delete(a)}return wt.set(e,{issue:n,timestamp:Date.now()}),n}function Lg(e){const t=yg[e.status]||"#6b7280",n=wg[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";re.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Sg(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Cg(e.priority)}</span>
        </div>
    `}function Sg(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Cg(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Bg(){nt("issue:created",Ag),nt("issue:updated",jg),nt("issue:deleted",Mg),nt("comment",Dg),nt("relation",Rg),nt("attestation",Pg),nt("activity",Ng),nt("project",qg),nt("sprint",Og)}function Ag(e){var i,a,o;const t=$e(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,ze(r),A()==="issues"&&st()}else ze([e,...t]),A()==="issues"&&st(),v(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=Ti())==null?void 0:i.id)){const r=ht(),d=r.findIndex(l=>l.id===e.id),c=r.findIndex(l=>l._isOptimistic&&l.title===e.title);if(d===-1&&c===-1)Ot([e,...r]),A()==="my-issues"&&jn();else if(c>=0){const l=[...r];l[c]=e,Ot(l),A()==="my-issues"&&jn()}}A()==="my-issues"&&Ht({showLoading:!1}),A()==="board"?gt():A()==="sprints"&&at(),A()==="issue-detail"&&e.parent_id===((a=he())==null?void 0:a.id)&&N((o=he())==null?void 0:o.id,!1)}function jg(e){const t=$e();t.some(s=>s.id===e.id)&&ze(t.map(s=>s.id===e.id?e:s));const n=ht();if(n.some(s=>s.id===e.id)&&Ot(n.map(s=>s.id===e.id?e:s)),A()==="issues")st();else if(A()==="my-issues")jn(),Ht({showLoading:!1});else if(A()==="board")gt();else if(A()==="sprints")at();else if(A()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&N(e.id)}}function Mg(e){var t;ze($e().filter(n=>n.id!==e.id)),Ot(ht().filter(n=>n.id!==e.id)),A()==="issues"?st():A()==="my-issues"?(jn(),Ht({showLoading:!1})):A()==="board"?gt():A()==="sprints"&&at(),v(`Issue ${e.identifier} deleted`,"info"),A()==="issue-detail"&&((t=he())==null?void 0:t.id)===e.id&&(v(`Issue ${e.identifier} was deleted`,"warning"),L("my-issues"))}function Dg(e){var t;A()==="my-issues"&&Ht({showLoading:!1}),A()==="issue-detail"&&((t=he())==null?void 0:t.id)===e.issue_id&&N(e.issue_id,!1)}function Rg(e){var t;if(A()==="issue-detail"){const n=(t=he())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&N(n,!1)}}function Pg(e){var t;A()==="gate-approvals"&&Gt(),A()==="issue-detail"&&((t=he())==null?void 0:t.id)===e.issue_id&&N(e.issue_id,!1)}function Ng(e){var t;A()==="my-issues"&&Ht({showLoading:!1}),A()==="issue-detail"&&((t=he())==null?void 0:t.id)===e.issue_id&&N(e.issue_id,!1)}function qg(e,{type:t}){be().then(()=>{A()==="projects"&&Vt()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?v(`New project: ${e.name}`,"info"):t==="deleted"&&v(`Project ${e.name} deleted`,"info")}function Og(){A()==="sprints"&&at()}const Zc='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Xc(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function Qc(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Xc(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Zc);n&&n.focus()}}}function Gn(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Xc(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(Zc);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Gn()});async function Jc(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){v("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=F().find(c=>c.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};ze([r,...$e()]),st();const d=document.querySelector(`[data-id="${a}"]`);d&&d.classList.add("new");try{const c=await b.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const l=$e(),f=l.findIndex(p=>p.id===a);f!==-1&&(l[f]=c,ze(l)),st(),be(),v("Issue created!","success")}catch(c){ze($e().filter(l=>l.id!==a)),st(),v(`Failed to create issue: ${c.message}`,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}dp({beforeNavigate:()=>{Ql(),window._onRitualsChanged=null,rs(null),Xo(null),Gn(),Ja()},detailRoute:e=>e[0]==="epic"&&e[1]?(Ka(e[1]),!0):e[0]==="issue"&&e[1]?(Ms(e[1]),!0):e[0]==="document"&&e[1]?(Qg(e[1]),!0):e[0]==="sprint"&&e[1]?(Tm(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Sa(e[1]),!0):!1,detailPopstate:e=>e.epicId?(Va(e.epicId,!1),!0):e.issueId?(N(e.issueId,!1),!0):e.identifier?(Ms(e.identifier),!0):e.documentId?(je(e.documentId,!1),!0):e.sprintId?(Ps(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=_t();e&&F().some(t=>t.id===e)&&Bt(e)},issueNavigate:e=>Ms(e),epicNavigate:e=>Ka(e)}),cp({"my-issues":()=>{aa(),Ht()},"gate-approvals":()=>{Gt()},issues:()=>{xp(),Qp(),Ip().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Br())}}),Fr().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}ft()})},epics:()=>{mg()},board:()=>{Qi()},projects:()=>{be().then(Vt)},sprints:()=>{_l()},rituals:()=>{Al()},documents:()=>{Qt()},team:()=>{Yi(),pr(),bs()},settings:()=>{Ks(),ms(),qm()}});function Hg(){const e=document.getElementById("modal-overlay");if(e){e.addEventListener("click",()=>C());const n=e.querySelector(".modal");n&&n.addEventListener("click",s=>s.stopPropagation())}const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>C())}function Fg(){const e={showCreateIssueModal:Ut,showCreateEpicModal:Gc,showCreateProjectModal:Us,showCreateDocumentModal:Ws,showCreateTeamModal:ws,showEditTeamModal:Zi,showInviteModal:ys,showCreateApiKeyModal:Oa,showCreateAgentModal:zi,resetOnboarding:Xs,logout:cs,navigateToProjects:()=>L("projects")};document.querySelectorAll("[data-action]").forEach(t=>{const n=e[t.dataset.action];n&&t.addEventListener("click",()=>n())})}function Ug(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>Ca(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>tc());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>nc()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>Ba(a))})}function zg(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Da("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Da("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Ra());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>pc());const i=document.getElementById("doc-project-filter");i&&i.addEventListener("change",()=>Gs());const a=document.getElementById("doc-sort");a&&a.addEventListener("change",()=>rt())}function Gg(){const e=document.getElementById("dashboard-project-filter");e&&e.addEventListener("change",()=>oa());const t=document.getElementById("my-issues-status-filter");t&&t.addEventListener("change",()=>oa())}function Wg(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Ur());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",h=>Mr(h));const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",h=>Dr(h));const s=document.getElementById("project-filter");s&&s.addEventListener("change",()=>na()),document.querySelectorAll(".multi-select-btn").forEach(h=>{const y=h.parentElement;y!=null&&y.querySelector("#status-filter-dropdown")?h.addEventListener("click",()=>ks("status-filter-dropdown")):y!=null&&y.querySelector("#priority-filter-dropdown")?h.addEventListener("click",()=>ks("priority-filter-dropdown")):y!=null&&y.querySelector("#label-filter-dropdown")&&h.addEventListener("click",()=>ks("label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>Bn())});const h=i.querySelector(".btn-small");h&&h.addEventListener("click",()=>$s())}const a=document.getElementById("priority-filter-dropdown");if(a){a.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>Es())});const h=a.querySelector(".btn-small");h&&h.addEventListener("click",()=>_s())}const o=document.getElementById("label-filter-dropdown");if(o){const h=o.querySelector(".btn-small");h&&h.addEventListener("click",()=>Is())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Ae());const d=document.getElementById("assignee-filter");d&&d.addEventListener("change",()=>Ae());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>Ae());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>ft());const f=document.getElementById("group-by-select");f&&f.addEventListener("change",()=>sa());const p=document.querySelector(".quick-create-input");p&&p.addEventListener("keydown",h=>Jc(h))}function Kg(){const e=document.getElementById("board-project-filter");e&&e.addEventListener("change",()=>wr());const t=document.getElementById("epics-project-filter");t&&t.addEventListener("change",()=>zc());const n=document.getElementById("sprint-project-filter");n&&n.addEventListener("change",()=>Il())}function Vg(){const e=document.getElementById("rituals-project-filter");e&&e.addEventListener("change",()=>wa());const t=document.getElementById("rituals-view");t&&t.querySelectorAll(".settings-tab[data-tab]").forEach(n=>{n.addEventListener("click",()=>jl(n.dataset.tab))})}function Yg(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>vs());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Ut()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),L(o.dataset.view)})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Vi());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>Gn());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>Qc());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Ut())}Y({"navigate-to":(e,t)=>{L(t.view)}}),document.addEventListener("DOMContentLoaded",async()=>{if(lp(),op(),Yg(),Hg(),Fg(),Gg(),Wg(),Kg(),Vg(),Ug(),zg(),Zg(),Xg(),kg({api:b}),mp(),Bg(),b.getToken())try{const e=await b.getMe();Zu(e),window.currentUser=e,await ed()}catch{b.logout(),ls()}else ls()});function Zg(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Cu()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Bu(n?"light":"dark")})}function Xg(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");Fi(s)}}})}async function ed(){Qo(),er(),await fs();const e=rr();if(e.length===0&&!qc()){za();return}e.length>0&&await hs(e[0],!0)}window.initApp=ed,window.viewIssue=N,window.viewIssueByPath=Ms,window.viewEpic=Va,window.viewEpicByPath=Ka,window.toggleTicketRituals=ha,window.toggleSection=fa,window.connectWebSocket=Gi,window.buildAssignees=()=>hp(Cn,vp),window.updateAssigneeFilter=In,window.loadLabels=Jg,window.resetOnboarding=Xs,window.viewDocument=je;async function Qg(e){try{await je(e,!1)}catch{L("documents",!1)}}async function Jg(){if(x())try{const e=await b.getLabels(x().id);os(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("keydown",hg({closeModal:C,closeSidebar:Gn,navigateTo:L,showCreateIssueModal:Ut,showKeyboardShortcutsHelp:td,isModalOpen:Ii,focusSearch:()=>{L("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function td(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,M()}rg([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>L("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>L("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>L("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>L("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>L("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>L("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>L("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{L("issues"),setTimeout(Ut,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{L("projects"),setTimeout(Us,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{L("documents"),setTimeout(Ws,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>ws(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{L("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{L("team"),setTimeout(ys,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>td(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Xs(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>cs(),category:"Account"}]);const ef=M;window.showModal=function(){ef(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",vg({isModalOpen:Ii,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Pc,openCommandPalette:lg,closeCommandPalette:Zs})),document.addEventListener("keydown",bg({getCurrentView:A,getSelectedIndex:Ju,setSelectedIndex:Yo,viewIssue:N,showEditIssueModal:ca,isModalOpen:Ii,isCommandPaletteOpen:Pc})),Object.assign(window,{escapeHtml:m,renderMarkdown:Le,handleLogin:Bi,handleSignup:Ai,showLogin:Si,showSignup:Ci,logout:cs,navigateTo:L,handleRoute:Hi,closeModal:C,toggleSidebar:Qc,closeSidebar:Gn,getProjectFromUrl:_t,updateUrlWithProject:ds,toggleTeamDropdown:vs,toggleUserDropdown:Vi,showCreateTeamModal:ws,showEditTeamModal:Zi,showInviteModal:ys,showCreateIssueModal:Ut,loadIssues:ft,filterIssues:Ae,debounceSearch:Ur,handleQuickCreate:Jc,onProjectFilterChange:na,updateGroupBy:sa,toggleGroup:il,viewIssue:N,showEditIssueModal:ca,editDescription:ml,setDescriptionEditorMode:fl,updateIssueField:Ct,handleUpdateIssue:ll,deleteIssue:cl,navigateToIssueByIdentifier:Fi,toggleCreateIssueLabelSelection:el,createLabelForCreateIssue:Cs,createLabelFromDropdown:Ls,handleAddComment:pl,showCreateSubIssueModal:ol,showAddRelationModal:hl,handleAddRelation:wl,deleteRelation:kl,searchIssuesToRelate:vl,selectIssueForRelation:bl,clearSelectedRelation:yl,showDetailDropdown:Zr,showInlineDropdown:ra,toggleIssueLabel:Xr,toggleMultiSelect:ks,updateStatusFilter:Bn,updatePriorityFilter:Es,clearStatusFilter:$s,clearPriorityFilter:_s,toggleFilterMenu:Mr,toggleDisplayMenu:Dr,updateFilterChips:xe,updateFilterCountBadge:Te,loadBoard:Ji,onBoardProjectChange:wr,handleDragStart:kr,handleDragEnd:$r,handleDragOver:Er,handleDragLeave:_r,handleCardDragOver:Ir,handleCardDragLeave:xr,handleDrop:Tr,handleCardDrop:Lr,loadSprints:at,onSprintProjectChange:Il,viewSprint:Ps,showEditBudgetModal:Tl,handleUpdateBudget:Ll,showCloseSprintConfirmation:Sl,completeSprint:Cl,loadLimboStatus:Rn,showLimboDetailsModal:Ns,showCreateDocumentModal:Ws,showCreateProjectModal:Us,onEpicsProjectChange:zc,showCreateEpicModal:Gc,dismissApprovalsExplainer:Ol,loadGateApprovals:Gt,loadRitualsView:Al,onRitualsProjectChange:wa,switchRitualsTab:jl,toggleRitualConditions:sc,approveRitual:Ml,completeGateRitual:ka,toggleSection:fa,toggleTicketRituals:ha,attestTicketRitual:Rl,approveTicketRitual:Pl,showCompleteTicketRitualModal:Nl,showAttestTicketRitualModal:Dl,showCreateApiKeyModal:Oa,copyApiKey:Dc,revokeApiKey:Rc,showCreateAgentModal:zi,handleLabelCreateKey:sm,handleCreateIssueLabelKey:im}),window.marked=R,window.DOMPurify=Uo,console.log("Chaotic frontend loaded via Vite")})();
