var D0=Object.defineProperty;var M0=(Nt,qe,wn)=>qe in Nt?D0(Nt,qe,{enumerable:!0,configurable:!0,writable:!0,value:wn}):Nt[qe]=wn;var se=(Nt,qe,wn)=>M0(Nt,typeof qe!="symbol"?qe+"":qe,wn);(function(){"use strict";var fd;function Nt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var qe=Nt();function wn(e){qe=e}var Oi={exec:()=>null};function Z(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Ne.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Ne={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},dh=/^(?:[ \t]*(?:\n|$))+/,uh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ph=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Hi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,mh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ir=/(?:[*+-]|\d{1,9}[.)])/,Ld=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ad=Z(Ld).replace(/bull/g,ir).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),fh=Z(Ld).replace(/bull/g,ir).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),sr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,gh=/^[^\n]+/,ar=/(?!\s*\])(?:\\.|[^\[\]\\])+/,hh=Z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ar).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),vh=Z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ir).getRegex(),oa="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",or=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bh=Z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",or).replace("tag",oa).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Cd=Z(sr).replace("hr",Hi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oa).getRegex(),yh=Z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Cd).getRegex(),rr={blockquote:yh,code:uh,def:hh,fences:ph,heading:mh,hr:Hi,html:bh,lheading:Ad,list:vh,newline:dh,paragraph:Cd,table:Oi,text:gh},Bd=Z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Hi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oa).getRegex(),wh={...rr,lheading:fh,table:Bd,paragraph:Z(sr).replace("hr",Hi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Bd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oa).getRegex()},$h={...rr,html:Z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",or).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Oi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Z(sr).replace("hr",Hi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ad).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},kh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Eh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Dd=/^( {2,}|\\)\n(?!\s*$)/,_h=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ra=/[\p{P}\p{S}]/u,lr=/[\s\p{P}\p{S}]/u,Md=/[^\s\p{P}\p{S}]/u,xh=Z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,lr).getRegex(),jd=/(?!~)[\p{P}\p{S}]/u,Ih=/(?!~)[\s\p{P}\p{S}]/u,Sh=/(?:[^\s\p{P}\p{S}]|~)/u,Th=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Rd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Lh=Z(Rd,"u").replace(/punct/g,ra).getRegex(),Ah=Z(Rd,"u").replace(/punct/g,jd).getRegex(),Pd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ch=Z(Pd,"gu").replace(/notPunctSpace/g,Md).replace(/punctSpace/g,lr).replace(/punct/g,ra).getRegex(),Bh=Z(Pd,"gu").replace(/notPunctSpace/g,Sh).replace(/punctSpace/g,Ih).replace(/punct/g,jd).getRegex(),Dh=Z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Md).replace(/punctSpace/g,lr).replace(/punct/g,ra).getRegex(),Mh=Z(/\\(punct)/,"gu").replace(/punct/g,ra).getRegex(),jh=Z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rh=Z(or).replace("(?:-->|$)","-->").getRegex(),Ph=Z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),la=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,qh=Z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",la).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),qd=Z(/^!?\[(label)\]\[(ref)\]/).replace("label",la).replace("ref",ar).getRegex(),Nd=Z(/^!?\[(ref)\](?:\[\])?/).replace("ref",ar).getRegex(),Nh=Z("reflink|nolink(?!\\()","g").replace("reflink",qd).replace("nolink",Nd).getRegex(),cr={_backpedal:Oi,anyPunctuation:Mh,autolink:jh,blockSkip:Th,br:Dd,code:Eh,del:Oi,emStrongLDelim:Lh,emStrongRDelimAst:Ch,emStrongRDelimUnd:Dh,escape:kh,link:qh,nolink:Nd,punctuation:xh,reflink:qd,reflinkSearch:Nh,tag:Ph,text:_h,url:Oi},Oh={...cr,link:Z(/^!?\[(label)\]\((.*?)\)/).replace("label",la).getRegex(),reflink:Z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",la).getRegex()},dr={...cr,emStrongRDelimAst:Bh,emStrongLDelim:Ah,url:Z(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Hh={...dr,br:Z(Dd).replace("{2,}","*").getRegex(),text:Z(dr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ca={normal:rr,gfm:wh,pedantic:$h},Fi={normal:cr,gfm:dr,breaks:Hh,pedantic:Oh},Fh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Od=e=>Fh[e];function Et(e,t){if(t){if(Ne.escapeTest.test(e))return e.replace(Ne.escapeReplace,Od)}else if(Ne.escapeTestNoEncode.test(e))return e.replace(Ne.escapeReplaceNoEncode,Od);return e}function Hd(e){try{e=encodeURI(e).replace(Ne.percentDecode,"%")}catch{return null}return e}function Fd(e,t){var a;const n=e.replace(Ne.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Ne.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Ne.slashPipe,"|");return i}function Ui(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Uh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Ud(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Gh(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var da=class{constructor(e){se(this,"options");se(this,"rules");se(this,"lexer");this.options=e||qe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ui(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Gh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Ui(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ui(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Ui(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,i=i.substring(0,i.length-f.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),f=e.split(`
`,1)[0],g=!u.trim(),b=0;if(this.options.pedantic?(b=2,d=u.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=u.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const S=this.rules.other.nextBulletRegex(b),_=this.rules.other.hrRegex(b),D=this.rules.other.fencesBeginRegex(b),M=this.rules.other.headingBeginRegex(b),ne=this.rules.other.htmlBeginRegex(b);for(;e;){const E=e.split(`
`,1)[0];let P;if(f=E,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),P=f):P=f.replace(this.rules.other.tabCharGlobal,"    "),D.test(f)||M.test(f)||ne.test(f)||S.test(f)||_.test(f))break;if(P.search(this.rules.other.nonSpaceChar)>=b||!f.trim())d+=`
`+P.slice(b);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||D.test(u)||M.test(u)||_.test(u))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=E+`
`,e=e.substring(E.length+1),u=P.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let y=null,w;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(w=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:w,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Fd(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Fd(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Ui(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Uh(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Ud(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Ud(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ot=class Sd{constructor(t){se(this,"tokens");se(this,"options");se(this,"state");se(this,"tokenizer");se(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||qe,this.options.tokenizer=this.options.tokenizer||new da,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Ne,block:ca.normal,inline:Fi.normal};this.options.pedantic?(n.block=ca.pedantic,n.inline=Fi.pedantic):this.options.gfm&&(n.block=ca.gfm,this.options.breaks?n.inline=Fi.breaks:n.inline=Fi.gfm),this.tokenizer.rules=n}static get rules(){return{block:ca,inline:Fi}}static lex(t,n){return new Sd(n).lex(t)}static lexInline(t,n){return new Sd(n).inlineTokens(t)}lex(t){t=t.replace(Ne.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Ne.tabCharGlobal,"    ").replace(Ne.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},ua=class{constructor(e){se(this,"options");se(this,"parser");this.options=e||qe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Ne.notSpaceStart))==null?void 0:a[0],s=e.replace(Ne.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Et(i)+'">'+(n?s:Et(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Et(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+Et(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Et(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Hd(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+Et(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Hd(e);if(s===null)return Et(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Et(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Et(e.text)}},ur=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Ht=class Td{constructor(t){se(this,"options");se(this,"renderer");se(this,"textRenderer");this.options=t||qe,this.options.renderer=this.options.renderer||new ua,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ur}static parse(t,n){return new Td(n).parse(t)}static parseInline(t,n){return new Td(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},pa=(fd=class{constructor(e){se(this,"options");se(this,"block");this.options=e||qe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ot.lex:Ot.lexInline}provideParser(){return this.block?Ht.parse:Ht.parseInline}},se(fd,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),fd),zh=class{constructor(...e){se(this,"defaults",Nt());se(this,"options",this.setOptions);se(this,"parse",this.parseMarkdown(!0));se(this,"parseInline",this.parseMarkdown(!1));se(this,"Parser",Ht);se(this,"Renderer",ua);se(this,"TextRenderer",ur);se(this,"Lexer",Ot);se(this,"Tokenizer",da);se(this,"Hooks",pa);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new ua(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new da(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new pa;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];pa.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ot.lex(e,t??this.defaults)}parser(e,t){return Ht.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ot.lex:Ot.lexInline,l=a.hooks?a.hooks.provideParser():e?Ht.parse:Ht.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Et(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},$n=new zh;function Y(e,t){return $n.parse(e,t)}Y.options=Y.setOptions=function(e){return $n.setOptions(e),Y.defaults=$n.defaults,wn(Y.defaults),Y},Y.getDefaults=Nt,Y.defaults=qe,Y.use=function(...e){return $n.use(...e),Y.defaults=$n.defaults,wn(Y.defaults),Y},Y.walkTokens=function(e,t){return $n.walkTokens(e,t)},Y.parseInline=$n.parseInline,Y.Parser=Ht,Y.parser=Ht.parse,Y.Renderer=ua,Y.TextRenderer=ur,Y.Lexer=Ot,Y.lexer=Ot.lex,Y.Tokenizer=da,Y.Hooks=pa,Y.parse=Y,Y.options,Y.setOptions,Y.use,Y.walkTokens,Y.parseInline,Ht.parse,Ot.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Gd,setPrototypeOf:zd,isFrozen:Vh,getPrototypeOf:Wh,getOwnPropertyDescriptor:Kh}=Object;let{freeze:Oe,seal:st,create:pr}=Object,{apply:mr,construct:fr}=typeof Reflect<"u"&&Reflect;Oe||(Oe=function(t){return t}),st||(st=function(t){return t}),mr||(mr=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),fr||(fr=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const ma=Fe(Array.prototype.forEach),Yh=Fe(Array.prototype.lastIndexOf),Vd=Fe(Array.prototype.pop),Gi=Fe(Array.prototype.push),Qh=Fe(Array.prototype.splice),fa=Fe(String.prototype.toLowerCase),gr=Fe(String.prototype.toString),hr=Fe(String.prototype.match),zi=Fe(String.prototype.replace),Zh=Fe(String.prototype.indexOf),Xh=Fe(String.prototype.trim),vt=Fe(Object.prototype.hasOwnProperty),He=Fe(RegExp.prototype.test),Vi=Jh(TypeError);function Fe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return mr(e,t,i)}}function Jh(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return fr(e,n)}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:fa;zd&&zd(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(Vh(t)||(t[i]=a),s=a)}e[s]=!0}return e}function ev(e){for(let t=0;t<e.length;t++)vt(e,t)||(e[t]=null);return e}function _t(e){const t=pr(null);for(const[n,i]of Gd(e))vt(e,n)&&(Array.isArray(i)?t[n]=ev(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=_t(i):t[n]=i);return t}function Wi(e,t){for(;e!==null;){const i=Kh(e,t);if(i){if(i.get)return Fe(i.get);if(typeof i.value=="function")return Fe(i.value)}e=Wh(e)}function n(){return null}return n}const Wd=Oe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),vr=Oe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),br=Oe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),tv=Oe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yr=Oe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),nv=Oe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Kd=Oe(["#text"]),Yd=Oe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),wr=Oe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Qd=Oe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ga=Oe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),iv=st(/\{\{[\w\W]*|[\w\W]*\}\}/gm),sv=st(/<%[\w\W]*|[\w\W]*%>/gm),av=st(/\$\{[\w\W]*/gm),ov=st(/^data-[\-\w.\u00B7-\uFFFF]+$/),rv=st(/^aria-[\-\w]+$/),Zd=st(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),lv=st(/^(?:\w+script|data):/i),cv=st(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xd=st(/^html$/i),dv=st(/^[a-z][.\w]*(-[.\w]+)+$/i);var Jd=Object.freeze({__proto__:null,ARIA_ATTR:rv,ATTR_WHITESPACE:cv,CUSTOM_ELEMENT:dv,DATA_ATTR:ov,DOCTYPE_NAME:Xd,ERB_EXPR:sv,IS_ALLOWED_URI:Zd,IS_SCRIPT_OR_DATA:lv,MUSTACHE_EXPR:iv,TMPLIT_EXPR:av});const Ki={element:1,text:3,progressingInstruction:7,comment:8,document:9},uv=function(){return typeof window>"u"?null:window},pv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},eu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function tu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:uv();const t=j=>tu(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Ki.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:g}=e,b=l.prototype,y=Wi(b,"cloneNode"),w=Wi(b,"remove"),S=Wi(b,"nextSibling"),_=Wi(b,"childNodes"),D=Wi(b,"parentNode");if(typeof o=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let M,ne="";const{implementation:E,createNodeIterator:P,createDocumentFragment:U,getElementsByTagName:W}=n,{importNode:Ee}=i;let x=eu();t.isSupported=typeof Gd=="function"&&typeof D=="function"&&E&&E.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:C,TMPLIT_EXPR:Q,DATA_ATTR:_e,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:ht,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:de}=Jd;let{IS_ALLOWED_URI:fe}=Jd,ue=null;const J=G({},[...Wd,...vr,...br,...yr,...Kd]);let Ce=null;const Ug=G({},[...Yd,...wr,...Qd,...ga]);let ge=Object.seal(pr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ia=null,gd=null;const Di=Object.seal(pr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Gg=!0,hd=!0,zg=!1,Vg=!0,Mi=!1,Qo=!0,zn=!1,vd=!1,bd=!1,ji=!1,Zo=!1,Xo=!1,Wg=!0,Kg=!1;const x0="user-content-";let yd=!0,sa=!1,Ri={},Pt=null;const wd=G({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Yg=null;const Qg=G({},["audio","video","img","source","image","track"]);let $d=null;const Zg=G({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Jo="http://www.w3.org/1998/Math/MathML",er="http://www.w3.org/2000/svg",Jt="http://www.w3.org/1999/xhtml";let Pi=Jt,kd=!1,Ed=null;const I0=G({},[Jo,er,Jt],gr);let tr=G({},["mi","mo","mn","ms","mtext"]),nr=G({},["annotation-xml"]);const S0=G({},["title","style","font","a","script"]);let aa=null;const T0=["application/xhtml+xml","text/html"],L0="text/html";let xe=null,qi=null;const A0=n.createElement("form"),Xg=function(h){return h instanceof RegExp||h instanceof Function},_d=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(qi&&qi===h)){if((!h||typeof h!="object")&&(h={}),h=_t(h),aa=T0.indexOf(h.PARSER_MEDIA_TYPE)===-1?L0:h.PARSER_MEDIA_TYPE,xe=aa==="application/xhtml+xml"?gr:fa,ue=vt(h,"ALLOWED_TAGS")?G({},h.ALLOWED_TAGS,xe):J,Ce=vt(h,"ALLOWED_ATTR")?G({},h.ALLOWED_ATTR,xe):Ug,Ed=vt(h,"ALLOWED_NAMESPACES")?G({},h.ALLOWED_NAMESPACES,gr):I0,$d=vt(h,"ADD_URI_SAFE_ATTR")?G(_t(Zg),h.ADD_URI_SAFE_ATTR,xe):Zg,Yg=vt(h,"ADD_DATA_URI_TAGS")?G(_t(Qg),h.ADD_DATA_URI_TAGS,xe):Qg,Pt=vt(h,"FORBID_CONTENTS")?G({},h.FORBID_CONTENTS,xe):wd,ia=vt(h,"FORBID_TAGS")?G({},h.FORBID_TAGS,xe):_t({}),gd=vt(h,"FORBID_ATTR")?G({},h.FORBID_ATTR,xe):_t({}),Ri=vt(h,"USE_PROFILES")?h.USE_PROFILES:!1,Gg=h.ALLOW_ARIA_ATTR!==!1,hd=h.ALLOW_DATA_ATTR!==!1,zg=h.ALLOW_UNKNOWN_PROTOCOLS||!1,Vg=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Mi=h.SAFE_FOR_TEMPLATES||!1,Qo=h.SAFE_FOR_XML!==!1,zn=h.WHOLE_DOCUMENT||!1,ji=h.RETURN_DOM||!1,Zo=h.RETURN_DOM_FRAGMENT||!1,Xo=h.RETURN_TRUSTED_TYPE||!1,bd=h.FORCE_BODY||!1,Wg=h.SANITIZE_DOM!==!1,Kg=h.SANITIZE_NAMED_PROPS||!1,yd=h.KEEP_CONTENT!==!1,sa=h.IN_PLACE||!1,fe=h.ALLOWED_URI_REGEXP||Zd,Pi=h.NAMESPACE||Jt,tr=h.MATHML_TEXT_INTEGRATION_POINTS||tr,nr=h.HTML_INTEGRATION_POINTS||nr,ge=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&Xg(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&Xg(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Mi&&(hd=!1),Zo&&(ji=!0),Ri&&(ue=G({},Kd),Ce=[],Ri.html===!0&&(G(ue,Wd),G(Ce,Yd)),Ri.svg===!0&&(G(ue,vr),G(Ce,wr),G(Ce,ga)),Ri.svgFilters===!0&&(G(ue,br),G(Ce,wr),G(Ce,ga)),Ri.mathMl===!0&&(G(ue,yr),G(Ce,Qd),G(Ce,ga))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?Di.tagCheck=h.ADD_TAGS:(ue===J&&(ue=_t(ue)),G(ue,h.ADD_TAGS,xe))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?Di.attributeCheck=h.ADD_ATTR:(Ce===Ug&&(Ce=_t(Ce)),G(Ce,h.ADD_ATTR,xe))),h.ADD_URI_SAFE_ATTR&&G($d,h.ADD_URI_SAFE_ATTR,xe),h.FORBID_CONTENTS&&(Pt===wd&&(Pt=_t(Pt)),G(Pt,h.FORBID_CONTENTS,xe)),h.ADD_FORBID_CONTENTS&&(Pt===wd&&(Pt=_t(Pt)),G(Pt,h.ADD_FORBID_CONTENTS,xe)),yd&&(ue["#text"]=!0),zn&&G(ue,["html","head","body"]),ue.table&&(G(ue,["tbody"]),delete ia.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=h.TRUSTED_TYPES_POLICY,ne=M.createHTML("")}else M===void 0&&(M=pv(g,s)),M!==null&&typeof ne=="string"&&(ne=M.createHTML(""));Oe&&Oe(h),qi=h}},Jg=G({},[...vr,...br,...tv]),eh=G({},[...yr,...nv]),C0=function(h){let I=D(h);(!I||!I.tagName)&&(I={namespaceURI:Pi,tagName:"template"});const B=fa(h.tagName),pe=fa(I.tagName);return Ed[h.namespaceURI]?h.namespaceURI===er?I.namespaceURI===Jt?B==="svg":I.namespaceURI===Jo?B==="svg"&&(pe==="annotation-xml"||tr[pe]):!!Jg[B]:h.namespaceURI===Jo?I.namespaceURI===Jt?B==="math":I.namespaceURI===er?B==="math"&&nr[pe]:!!eh[B]:h.namespaceURI===Jt?I.namespaceURI===er&&!nr[pe]||I.namespaceURI===Jo&&!tr[pe]?!1:!eh[B]&&(S0[B]||!Jg[B]):!!(aa==="application/xhtml+xml"&&Ed[h.namespaceURI]):!1},qt=function(h){Gi(t.removed,{element:h});try{D(h).removeChild(h)}catch{w(h)}},Vn=function(h,I){try{Gi(t.removed,{attribute:I.getAttributeNode(h),from:I})}catch{Gi(t.removed,{attribute:null,from:I})}if(I.removeAttribute(h),h==="is")if(ji||Zo)try{qt(I)}catch{}else try{I.setAttribute(h,"")}catch{}},th=function(h){let I=null,B=null;if(bd)h="<remove></remove>"+h;else{const ve=hr(h,/^[\r\n\t ]+/);B=ve&&ve[0]}aa==="application/xhtml+xml"&&Pi===Jt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const pe=M?M.createHTML(h):h;if(Pi===Jt)try{I=new f().parseFromString(pe,aa)}catch{}if(!I||!I.documentElement){I=E.createDocument(Pi,"template",null);try{I.documentElement.innerHTML=kd?ne:pe}catch{}}const Pe=I.body||I.documentElement;return h&&B&&Pe.insertBefore(n.createTextNode(B),Pe.childNodes[0]||null),Pi===Jt?W.call(I,zn?"html":"body")[0]:zn?I.documentElement:Pe},nh=function(h){return P.call(h.ownerDocument||h,h,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},xd=function(h){return h instanceof u&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof d)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},ih=function(h){return typeof r=="function"&&h instanceof r};function en(j,h,I){ma(j,B=>{B.call(t,h,I,qi)})}const sh=function(h){let I=null;if(en(x.beforeSanitizeElements,h,null),xd(h))return qt(h),!0;const B=xe(h.nodeName);if(en(x.uponSanitizeElement,h,{tagName:B,allowedTags:ue}),Qo&&h.hasChildNodes()&&!ih(h.firstElementChild)&&He(/<[/\w!]/g,h.innerHTML)&&He(/<[/\w!]/g,h.textContent)||h.nodeType===Ki.progressingInstruction||Qo&&h.nodeType===Ki.comment&&He(/<[/\w]/g,h.data))return qt(h),!0;if(!(Di.tagCheck instanceof Function&&Di.tagCheck(B))&&(!ue[B]||ia[B])){if(!ia[B]&&oh(B)&&(ge.tagNameCheck instanceof RegExp&&He(ge.tagNameCheck,B)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(B)))return!1;if(yd&&!Pt[B]){const pe=D(h)||h.parentNode,Pe=_(h)||h.childNodes;if(Pe&&pe){const ve=Pe.length;for(let et=ve-1;et>=0;--et){const tn=y(Pe[et],!0);tn.__removalCount=(h.__removalCount||0)+1,pe.insertBefore(tn,S(h))}}}return qt(h),!0}return h instanceof l&&!C0(h)||(B==="noscript"||B==="noembed"||B==="noframes")&&He(/<\/no(script|embed|frames)/i,h.innerHTML)?(qt(h),!0):(Mi&&h.nodeType===Ki.text&&(I=h.textContent,ma([R,C,Q],pe=>{I=zi(I,pe," ")}),h.textContent!==I&&(Gi(t.removed,{element:h.cloneNode()}),h.textContent=I)),en(x.afterSanitizeElements,h,null),!1)},ah=function(h,I,B){if(Wg&&(I==="id"||I==="name")&&(B in n||B in A0))return!1;if(!(hd&&!gd[I]&&He(_e,I))){if(!(Gg&&He(ce,I))){if(!(Di.attributeCheck instanceof Function&&Di.attributeCheck(I,h))){if(!Ce[I]||gd[I]){if(!(oh(h)&&(ge.tagNameCheck instanceof RegExp&&He(ge.tagNameCheck,h)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(h))&&(ge.attributeNameCheck instanceof RegExp&&He(ge.attributeNameCheck,I)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(I,h))||I==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&He(ge.tagNameCheck,B)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(B))))return!1}else if(!$d[I]){if(!He(fe,zi(B,L,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&h!=="script"&&Zh(B,"data:")===0&&Yg[h])){if(!(zg&&!He(ht,zi(B,L,"")))){if(B)return!1}}}}}}}return!0},oh=function(h){return h!=="annotation-xml"&&hr(h,de)},rh=function(h){en(x.beforeSanitizeAttributes,h,null);const{attributes:I}=h;if(!I||xd(h))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ce,forceKeepAttr:void 0};let pe=I.length;for(;pe--;){const Pe=I[pe],{name:ve,namespaceURI:et,value:tn}=Pe,Ni=xe(ve),Id=tn;let Be=ve==="value"?Id:Xh(Id);if(B.attrName=Ni,B.attrValue=Be,B.keepAttr=!0,B.forceKeepAttr=void 0,en(x.uponSanitizeAttribute,h,B),Be=B.attrValue,Kg&&(Ni==="id"||Ni==="name")&&(Vn(ve,h),Be=x0+Be),Qo&&He(/((--!?|])>)|<\/(style|title|textarea)/i,Be)){Vn(ve,h);continue}if(Ni==="attributename"&&hr(Be,"href")){Vn(ve,h);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){Vn(ve,h);continue}if(!Vg&&He(/\/>/i,Be)){Vn(ve,h);continue}Mi&&ma([R,C,Q],ch=>{Be=zi(Be,ch," ")});const lh=xe(h.nodeName);if(!ah(lh,Ni,Be)){Vn(ve,h);continue}if(M&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!et)switch(g.getAttributeType(lh,Ni)){case"TrustedHTML":{Be=M.createHTML(Be);break}case"TrustedScriptURL":{Be=M.createScriptURL(Be);break}}if(Be!==Id)try{et?h.setAttributeNS(et,ve,Be):h.setAttribute(ve,Be),xd(h)?qt(h):Vd(t.removed)}catch{Vn(ve,h)}}en(x.afterSanitizeAttributes,h,null)},B0=function j(h){let I=null;const B=nh(h);for(en(x.beforeSanitizeShadowDOM,h,null);I=B.nextNode();)en(x.uponSanitizeShadowNode,I,null),sh(I),rh(I),I.content instanceof a&&j(I.content);en(x.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(j){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,B=null,pe=null,Pe=null;if(kd=!j,kd&&(j="<!-->"),typeof j!="string"&&!ih(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw Vi("dirty is not a string, aborting")}else throw Vi("toString is not a function");if(!t.isSupported)return j;if(vd||_d(h),t.removed=[],typeof j=="string"&&(sa=!1),sa){if(j.nodeName){const tn=xe(j.nodeName);if(!ue[tn]||ia[tn])throw Vi("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof r)I=th("<!---->"),B=I.ownerDocument.importNode(j,!0),B.nodeType===Ki.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?I=B:I.appendChild(B);else{if(!ji&&!Mi&&!zn&&j.indexOf("<")===-1)return M&&Xo?M.createHTML(j):j;if(I=th(j),!I)return ji?null:Xo?ne:""}I&&bd&&qt(I.firstChild);const ve=nh(sa?j:I);for(;pe=ve.nextNode();)sh(pe),rh(pe),pe.content instanceof a&&B0(pe.content);if(sa)return j;if(ji){if(Zo)for(Pe=U.call(I.ownerDocument);I.firstChild;)Pe.appendChild(I.firstChild);else Pe=I;return(Ce.shadowroot||Ce.shadowrootmode)&&(Pe=Ee.call(i,Pe,!0)),Pe}let et=zn?I.outerHTML:I.innerHTML;return zn&&ue["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&He(Xd,I.ownerDocument.doctype.name)&&(et="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+et),Mi&&ma([R,C,Q],tn=>{et=zi(et,tn," ")}),M&&Xo?M.createHTML(et):et},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};_d(j),vd=!0},t.clearConfig=function(){qi=null,vd=!1},t.isValidAttribute=function(j,h,I){qi||_d({});const B=xe(j),pe=xe(h);return ah(B,pe,I)},t.addHook=function(j,h){typeof h=="function"&&Gi(x[j],h)},t.removeHook=function(j,h){if(h!==void 0){const I=Yh(x[j],h);return I===-1?void 0:Qh(x[j],I,1)[0]}return Vd(x[j])},t.removeHooks=function(j){x[j]=[]},t.removeAllHooks=function(){x=eu()},t}var nu=tu();const $r="chaotic_";function Ye(e){try{return localStorage.getItem($r+e)}catch{return null}}function at(e,t){try{localStorage.setItem($r+e,t)}catch{}}function xt(e){try{localStorage.removeItem($r+e)}catch{}}function kr(){return Ye("token")}function mv(e){e?at("token",e):xt("token")}function fv(){return Ye("theme")}function gv(e){at("theme",e)}function iu(){return Ye("last_project")}function hv(e){at("last_project",e)}function vv(){return Ye("onboarding_complete")==="true"}function bv(){at("onboarding_complete","true")}function yv(){xt("onboarding_complete")}function wv(e){return e?Ye(`issues_filters_${e}`):null}function $v(e,t){e&&(t?at(`issues_filters_${e}`,t):xt(`issues_filters_${e}`))}function su(e){return Ye(`comment_draft_${e}`)}function ha(e,t){t?at(`comment_draft_${e}`,t):xt(`comment_draft_${e}`)}function au(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Yi(e){const t=Ye(`description_draft_${e}`);if(!t)return null;const n=au(t);return n?n.draft:t}function ou(e){const t=Ye(`description_draft_${e}`);if(!t)return null;const n=au(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function kn(e,t,n=""){t?at(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):xt(`description_draft_${e}`)}function ru(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function lu(e){var n;const t=Ye(`document_draft_${e}`);return t?((n=ru(t))==null?void 0:n.draft)??null:null}function kv(e){const t=Ye(`document_draft_${e}`);if(!t)return null;const n=ru(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function va(e,t,n=null){t&&(t.title||t.content||t.icon)?at(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):xt(`document_draft_${e}`)}function Ev(){return{title:Ye("create_issue_title"),description:Ye("create_issue_description")}}function cu(e,t){e?at("create_issue_title",e):xt("create_issue_title"),t?at("create_issue_description",t):xt("create_issue_description")}function _v(){xt("create_issue_title"),xt("create_issue_description")}function xv(){return Ye("doc_view_mode")}function Iv(e){at("doc_view_mode",e)}function Sv(){return Ye("approvals_explainer_dismissed")==="1"}function Tv(){at("approvals_explainer_dismissed","1")}const Lv="chaotic-boot-cache",Er="snapshot",_r="last",du=1,Av=336*60*60*1e3,Cv=250;let En=null;function Bv(){return En||(En=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(Lv,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore(Er),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),En=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),En.catch(()=>{En=null}),En)}function xr(e,t){return Bv().then(n=>new Promise((i,s)=>{const a=n.transaction(Er,e),o=t(a.objectStore(Er));a.oncomplete=()=>i(o==null?void 0:o.result),a.onerror=()=>s(a.error),a.onabort=()=>s(a.error)}))}function uu(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function Dv(e){if(!e)return Promise.resolve(null);const t=xr("readonly",i=>i.get(_r)).then(i=>!i||i.version!==du||i.userId!==e||!(Date.now()-i.savedAt<Av)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),Cv));return Promise.race([t,n])}function Mv(e,t){if(!e)return Promise.resolve();const n={...t,version:du,userId:e,savedAt:Date.now()};return xr("readwrite",i=>i.put(n,_r)).then(()=>{},()=>{})}function Ir(){return xr("readwrite",e=>e.delete(_r)).then(()=>{},()=>{})}const jv="/api";class Rv{constructor(){this.token=kr()}setToken(t){this.token=t,mv(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s},o=typeof Blob<"u"&&i instanceof Blob;o&&(s["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=o?i:JSON.stringify(i));let r;try{r=await fetch(`${jv}${n}`,a)}catch(c){const d=new Error("Network error - check your connection");throw d.isNetworkError=!0,d.cause=c,d}if(r.status===204)return null;let l;try{l=await r.json()}catch{const c=r.headers.get("content-type")||"unknown";throw r.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${r.status})`)}if(!r.ok){let c;typeof l.detail=="string"?c=l.detail:l.detail&&typeof l.detail=="object"&&l.detail.message?c=l.detail.message:c="An error occurred";const d=new Error(c);throw d.status=r.status,d.detail=l.detail,d}return l}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),Ir()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const v=new Rv;let Wn=null;const Pv='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Kn=null,Qi=!1;function Sr(){Qi=!0}function qv(){Qi=!1}function pu(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Nv(){if(Qi)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function z(){Kn=document.activeElement,Qi=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function H(){var e;Ft(),Qi=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Kn&&document.contains(Kn)&&typeof Kn.focus=="function"&&Kn.focus(),Kn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Pv);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function tt(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function Tr(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Ov(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function k(e,t){const n=Ov(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function Ft(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Wn&&(document.removeEventListener("keydown",Wn),Wn=null)}function Hv(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Ft(),t&&tt()&&pu()}function Zi(e){Wn&&document.removeEventListener("keydown",Wn),Wn=e,e&&document.addEventListener("keydown",e)}function Xi(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Ft(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Ie(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function De(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function nt(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ee(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function p(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return p(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Fv(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function ot(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function bt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const Lr=/^\/api\/avatars\/[0-9a-f]{64}$/;function mu(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||Lr.test(e))}function Ut(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?mu(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${p(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Ar(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function Yn(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${p(n)}</span>`}return Ar(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let ae={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Cr=new Set;function me(e,t){if(typeof e=="string"){const n=ae[e];ae[e]=t,fu(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=ae[i];ae[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{fu(i,s,a)})}}function rt(e){return Cr.add(e),()=>Cr.delete(e)}function fu(e,t,n){t!==n&&Cr.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const be=()=>ae.currentUser,It=e=>me("currentUser",e),A=()=>ae.currentView,Ji=e=>me("currentView",e),te=()=>ae.issues,Qe=e=>me("issues",e),es=()=>ae.detailNavContext,St=e=>me("detailNavContext",e),Br=()=>ae.labels,ts=e=>me("labels",e),gu=()=>ae.activeFilterCategory,Uv=e=>me("activeFilterCategory",e),hu=()=>ae.selectedIssueIndex,_n=e=>me("selectedIssueIndex",e),Gv=()=>ae.selectedDocIndex,vu=e=>me("selectedDocIndex",e),bu=()=>ae.selectedBoardIndex,ba=e=>me("selectedBoardIndex",e),zv=()=>ae.selectedInboxIndex,ya=e=>me("selectedInboxIndex",e),Vv=()=>ae.selectedSprintIndex,yu=e=>me("selectedSprintIndex",e),Wv=()=>ae.selectedEpicIndex,Dr=e=>me("selectedEpicIndex",e),Kv=()=>ae.pendingGates,Yv=e=>me("pendingGates",e),ye=()=>ae.inboxEntries,Gt=e=>me("inboxEntries",e),wa=()=>ae.inboxUnreadCount,ns=e=>me("inboxUnreadCount",e),Qv=()=>ae.searchDebounceTimer,Zv=e=>me("searchDebounceTimer",e),Xv=()=>ae.websocket,Mr=e=>me("websocket",e),T=()=>ae.currentTeam,Qn=e=>me("currentTeam",e),K=()=>ae.currentProject,lt=e=>me("currentProject",e||null),we=()=>ae.currentDetailIssue,Zn=e=>me("currentDetailIssue",e),Jv=()=>ae.currentDetailSprints,wu=e=>me("currentDetailSprints",e),jr={};function ie(e){Object.assign(jr,e)}function eb(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=jr[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let $u=!1;function tb(){if(!$u){$u=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,eb);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=jr[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Rr=["backlog","todo","in_progress","in_review","done","canceled"],is=["backlog","todo","in_progress","in_review"],ku=["urgent","high","medium","low","no_priority"],Pr=["no_priority","urgent","high","medium","low"],Eu=["backlog","todo","in_progress","in_review","done"],$a="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function F({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${p(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${p(t)}</h3>
            <p>${p(n)}</p>
            ${a}
        </div>
    `}const N={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},_u=24,Ze=new Map,he=new Map,yt=new Map;let zt=null;function nb(e){return Array.isArray(e)?[...e].map(String).sort():e}function xu(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,nb(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function ka(e,t){for(he.delete(e),he.set(e,t);he.size>_u;){const n=he.keys().next().value;he.delete(n)}Iu()}function Iu(){if(Ze.size===0)return;const e=new Set;he.forEach(t=>t.ids.forEach(n=>e.add(n))),Ze.forEach((t,n)=>{e.has(n)||Ze.delete(n)})}function ib(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function Su(e){const t=he.get(e);return t?(ka(e,t),t.ids.map(n=>Ze.get(n)).filter(Boolean)):null}function qr(e){return Ze.get(e)}function sb(e){var t;return((t=he.get(e))==null?void 0:t.meta)||{}}function Tu(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Nr(e){const t=Ze.get(e.id);if(!Tu(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){Ze.set(e.id,{...e,description:t.description});return}Ze.set(e.id,e)}}const Or=new Set;function ab(e){return Or.add(e),()=>Or.delete(e)}function Lu(e,t,n){if(!Array.isArray(t))return;const i=ib(t);i.forEach(Nr);const s=he.get(e);ka(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}}),Or.forEach(a=>{try{a(e)}catch(o){console.error(o)}})}function ob(e,t){const n=he.get(e);n&&(n.meta=t)}function Ea(e){e!=null&&e.id&&Ze.has(e.id)&&Nr(e)}function rb(e){he.delete(e),yt.forEach((t,n)=>{t===e&&yt.delete(n)}),zt===e&&(zt=null),Iu()}function lb(e){Ze.delete(e),he.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function _a(e){zt=e}function cb(){return zt}function Au(e,t){for(yt.delete(e),yt.set(e,t);yt.size>_u;)yt.delete(yt.keys().next().value)}function db(e){const t=yt.get(e);return t&&he.has(t)?t:null}function ub({maxQueries:e=3}={}){const t=[...he.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(a=>i.add(a))),{queries:t.map(([s,a])=>[s,{ids:[...a.ids],meta:a.meta||{}}]),entities:[...i].map(s=>Ze.get(s)).filter(Boolean),views:[...yt.entries()].filter(([,s])=>n.has(s))}}function pb(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{he.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&Nr(t.get(s))}),ka(n,{ids:i.ids.filter(s=>Ze.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!yt.has(n)&&he.has(i)&&Au(n,i)})}function Cu(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function Bu(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(Cu(e[n])!==Cu(t[n]))return!1;return!0}const Du=["status","priority"],Mu=["assignee_id","sprint_id","issue_type"],mb={assignee_id:"unassigned",sprint_id:"no_sprint"},fb=["scope","project_id","sort_by","order","limit"],xn=e=>(e||[]).map(t=>String(t).toLowerCase());function gb(e,t){if(e.search||t.search||t.sort_by==="random"||fb.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Du)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of Mu)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=xn(e.label);if(!xn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=xn(t.exclude_label);if(!xn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function ju(e){const t=e.label===void 0?null:xn(e.label),n=e.exclude_label===void 0?null:xn(e.exclude_label);return i=>{for(const s of Du)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of Mu){if(e[s]===void 0)continue;const a=e[s]===mb[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=xn((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function hb(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(xu(e)));let n=null,i=null;if(he.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}gb(c,t)&&(n=r,i=l)}),!n)return null;ka(i,n);const s=ju(t),a=n.ids.map(r=>Ze.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function vb(){Ze.clear(),he.clear(),yt.clear(),zt=null}rt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&vb();return}if(e!=="issues"||zt===null||!he.has(zt)||A()!=="issues")return;const i=he.get(zt);Lu(zt,te(),i.meta)});let Hr=[];function bb(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function yb(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function ss(e,t){const n=e().map(bb),i=t().map(yb);Hr=[...n,...i]}function ct(e){return e&&Hr.find(t=>t.id===e)||null}function dt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function xa(e,t=!1){const n=p(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${p(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function as({includeIdle:e=!1,keepId:t=null}={}){const n=Hr.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),a=n.filter(b=>b.is_agent),o=new Set(a.map(b=>b.id)),r=(b,y)=>b.name.localeCompare(y.name),l=b=>b.registered_by_id&&o.has(b.registered_by_id),c=new Map,d=new Map;a.forEach(b=>{const[y,w]=l(b)?[c,b.registered_by_id]:[d,b.parent_user_id];y.has(w)||y.set(w,[]),y.get(w).push(b)});const u=[],f=(b,y)=>{u.push({assignee:b,indent:y}),(c.get(b.id)||[]).sort(r).forEach(S=>u.push({assignee:S,indent:2}))};return i.forEach(b=>{u.push({assignee:b,indent:!1}),(d.get(b.id)||[]).sort(r).forEach(y=>f(y,!0))}),a.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>f(b,!1)),u}function Xn({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;as({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${m(s.id)}">${xa(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function wb(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&ct(e)&&Xn({keepId:e}),t.value=e}let Tt=[],Fr=[],Ia=-1,Ur=null;const Ru=5,$b=new Set(["done","canceled"]),Pu=new Set;function kb(){return Ia}function Eb(e){Ia=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;Ur=(t==null?void 0:t.dataset.issueId)??null}const qu=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function Nu(e){const t=new Set(qu.map(s=>s.status)),n=qu.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}rt(e=>{e==="currentProject"&&A()==="my-issues"&&(Jn(),os(),ei())});function Xe(){return Tt}function In(e){Tt=e}let Gr=0;async function Jn(){var a;const e=T(),t=be();if(!e||!t)return;const n=++Gr,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=K();xb();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await v.getIssues({...o,project_id:s}):r=await v.getTeamIssues(e.id,o),n!==Gr)return;Tt=Nu(r).flatMap(l=>l.issues),A()==="my-issues"&&St(Tt),Sn()}catch(o){if(n!==Gr)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=F({icon:N.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),k("load issues",o)}}async function ei({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=K();Fr=await v.getTeamActivities(t.id,0,10,{projectId:i}),_b()}catch{n&&(n.innerHTML=F({icon:N.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function _b(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Fr.length){e.innerHTML=F({icon:N.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Fr.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${p(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${p(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${p(t.document_title)}</strong>`);const i=Sl(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${dm(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Ll(t)}${n}</span>
                <span class="activity-actor">by ${p(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${ot(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function xb(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Ou(){Jn()}function Sn(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=Nu(Tt);Tt=t.flatMap(l=>l.issues),A()==="my-issues"&&St(Tt),Ia=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Tt.length?String(Tt.length):""),Tt.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=$b.has(l.status)&&!Pu.has(l.status)&&l.issues.length>Ru,d=c?l.issues.slice(0,Ru):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${p(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(u=>li(u)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(Ur){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===Ur);c!==-1&&(l[c].classList.add("keyboard-selected"),Ia=c)}}let zr=0,Hu=[];async function os(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++zr,n=K(),i=X(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await v.getCurrentSprint(r.id);if(!l)return null;let c={};if(!n)return{project:r,sprint:l,statusCounts:c};try{const d=await v.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==zr)return;Hu=o,zu(o,{single:!!n})}catch(a){if(t!==zr)return;console.error("Failed to load sprint status:",a),e.innerHTML=F({icon:N.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const Fu=5;let Sa=!1;const Uu=["done","in_review","in_progress","todo","backlog"];function Ta(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,a=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,o=e.limbo?"limbo":s?"arrears":n&&a>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:a,state:o}}function Ib(e){const t=({sprint:n})=>{const i=Ta(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function Sb(e){return e.activated_at?Math.max(1,Math.round((Date.now()-new Date(e.activated_at))/864e5)):null}function Tb(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function Lb(e,t){return e.limbo?'<span class="sprint-status-badge limbo" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="sprint-status-badge arrears" title="Over budget: close the sprint to keep working">Arrears</span>':""}function Gu(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function Ab({sprint:e,statusCounts:t}){const n=Ta(e),i=t||{},s=Object.values(i).reduce((l,c)=>l+c,0),a=Sb(e),o=[a?`Day ${a}`:"",s?`${s} issue${s===1?"":"s"}`:"No issues planned"].filter(Boolean).join(" · ");let r="";return e.limbo?r="Waiting on sprint rituals before the next sprint starts.":n.overBudget&&(r="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${n.state}" ${Gu(e)} aria-label="Open ${m(e.name)}">
            <div class="sprint-focus-top">
                <span class="sprint-focus-name">${p(e.name)}</span>
                ${Lb(e,n)}
                <span class="sprint-focus-meta">${p(o)}</span>
            </div>
            <div class="sprint-focus-headline">${Tb(n)}</div>
            ${n.hasBudget?`
                <div class="sprint-progress-bar"><div class="sprint-progress-fill ${n.state}" style="width: ${n.pct}%"></div></div>
            `:""}
            ${s?`
                <div class="sprint-issue-breakdown">
                    <div class="sprint-stacked-bar">
                        ${Uu.filter(l=>i[l]).map(l=>`<div class="sprint-stacked-segment status-${l}" style="width: ${i[l]/s*100}%" title="${Ie(l)}: ${i[l]}"></div>`).join("")}
                    </div>
                    <div class="sprint-status-counts">
                        ${Uu.filter(l=>i[l]).map(l=>`<span class="sprint-count-label status-${l}">${i[l]} ${Ie(l)}</span>`).join("")}
                    </div>
                </div>
            `:""}
            ${r?`<div class="sprint-focus-note ${n.state}">${r}</div>`:""}
        </button>
    `}function Cb({project:e,sprint:t}){const n=Ta(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${t.limbo?", in limbo":n.overBudget?", in arrears":""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${Gu(t)} title="${m(s)}">
                <span class="sprint-row-dot ${n.state}" aria-hidden="true"></span>
                <span class="sprint-row-project">${p(e.name)}</span>
                <span class="sprint-row-sprint">${p(t.name)}</span>
                <span class="sprint-row-bar ${n.hasBudget?"":"none"}" aria-hidden="true">${n.hasBudget?`<span class="sprint-progress-fill ${n.state}" style="width: ${n.pct}%"></span>`:""}</span>
                <span class="sprint-row-points">${i}<span class="sprint-row-unit"> pts</span></span>
            </button>
        </li>
    `}function zu(e,{single:t=e.length===1&&!!K()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${Ab(e[0])}
        `;return}const i=Ib(e),s=i.filter(({sprint:r})=>r.limbo||Ta(r).overBudget).length,a=Sa?i:i.slice(0,Fu),o=i.length-a.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${s?`<span class="sprint-attention">${s} need${s===1?"s":""} closing</span>`:""}
        </div>
        <ul class="sprint-rows">
            ${a.map(Cb).join("")}
        </ul>
        ${o>0?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle">Show all ${i.length}</button>`:""}
        ${Sa&&i.length>Fu?'<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle">Show fewer</button>':""}
    `}ie({"filter-my-issues":()=>Ou(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),rc(t.identifier)},"retry-load-my-issues":()=>Jn(),"dash-show-all":(e,t)=>{Pu.add(t.status),Sn()},"retry-load-sprint-status":()=>os(),"dash-sprints-toggle":()=>{Sa=!Sa,zu(Hu,{single:!1})}});const Vu=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function rs(e=null){const t=e||K()||"";mp([]);const n=X().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${p(o.name)}</option>
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
                        ${We("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${pt("no_priority")}
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
                                ${Vu.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,z(),Da();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Ev();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{cu(i.value,s.value)}),s.addEventListener("input",()=>{cu(i.value,s.value)}),i.focus()}function Bb(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function Db(e){const t=Vu.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Wu(e,t){const n=X().find(i=>i.id===t);mp([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?p(n.name):"Project"}</span>
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
                        ${We("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${pt("no_priority")}
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
    `,z(),Da(),document.getElementById("create-issue-title").focus()}async function Mb(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:pp(),parent_id:e});H(),$(`Created sub-issue ${d.identifier}`,"success"),oe(e)}catch(d){k("create sub-issue",d)}}async function jb(e,t,n){var o,r;Ft();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Eu.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${m(Ie(c))}">
                    ${We(c)}
                    <span>${Ie(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Pr.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${m(De(c))}">
                    ${pt(c)}
                    <span>${De(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${m(bt(c))}">
                    <span class="issue-type-badge type-${c}">${bt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!T())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=Br(),c=!1;if(l.length===0)try{l=await v.getLabels(T().id),ts(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Qr(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Xi(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=as({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const f=dt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(d.id)}" data-label="${m(f)}">
                    ${Ut(d,"avatar-small")}
                    <span>${xa(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=bi(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const f=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${m(f)}" data-label="${m(u.value?u.label:"Estimate")}">
                    <span>${p(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await v.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(f=>`
                        <button class="dropdown-option ${f.id===l?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${m(f.id)}" data-label="${m(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${p(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Xi(a)}function Rb(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Pb(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Sr();const i=p(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${We(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${pt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${bt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Ft(),s==null||s.focus()}async function Ku({keepOpen:e=!1}={}){var y,w;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,u=(w=document.getElementById("create-issue-due-date"))==null?void 0:w.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const S=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:pp(),due_date:f});$(`Created ${S.identifier}`,"success"),_v(),A()==="issues"?At():A()==="my-issues"&&Jn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",qv(),document.getElementById("create-issue-title").focus()):(H(),oe(S.id))}catch(S){k("create issue",S)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function qb(){await Ku({keepOpen:!1})}async function Nb(){await Ku({keepOpen:!0})}ie({"toggle-create-dropdown":(e,t,n)=>{jb(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Pb(t.field,t.value,t.label)},"create-issue-submit":()=>{qb()},"create-issue-and-new":()=>{Nb()},"update-create-project":()=>{Rb()},"apply-template":e=>{Db(e.target.value)},"toggle-create-options":()=>{Bb()},"create-sub-issue-submit":(e,t)=>{Mb(t.parentId,t.projectId)}});function ls(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&($(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(Ob(n,e.project_id),t=!0),t}function Ob(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
        <div class="parent-prompt">
            <p>${p(e.message)}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-dismiss">Not now</button>
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-add"
                    data-parent-id="${m(e.id)}" data-project-id="${m(t||"")}">Add more</button>
                <button type="button" class="btn btn-primary" data-action="parent-prompt-close"
                    data-parent-id="${m(e.id)}" data-identifier="${m(e.identifier)}">Close ${p(e.identifier)}</button>
            </div>
        </div>
    `,z())}async function Hb(e,t){try{const n=await v.updateIssue(e,{status:"done"});H(),$(`${t} closed`,"success"),ls(n)}catch(n){k(`close ${t}`,n)}}ie({"parent-prompt-dismiss":()=>H(),"parent-prompt-close":(e,t)=>Hb(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{H(),Wu(t.parentId,t.projectId)}});function nn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Tn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Ln(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function An(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function La(){const e=document.getElementById("group-by-select");return e?e.value:""}const Yu=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Vr=["done","canceled"],Fb=is,Ub="all";function Qu(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function ti(e=nn()){return e.length===0?"all":Qu(e,is)?"open":Qu(e,Vr)?"closed":null}function Zu(e){var t,n,i;switch(e){case"project":return K()?1:0;case"status":{const s=ti();return s==="all"?0:s?1:nn().length}case"priority":return Tn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Ln().length;case"exclude_labels":return An().length;default:return 0}}function Wr(){let e=0;return Yu.forEach(t=>{e+=Zu(t.key)}),e}function Xu(){var b,y,w,S,_,D;const e=new URLSearchParams,t=nn(),n=Tn(),i=Ln(),s=An(),a=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,o=K()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,c=(S=document.getElementById("group-by-select"))==null?void 0:S.value,d=(_=document.getElementById("sort-by-select"))==null?void 0:_.value,u=ti(t);u==="all"?e.append("status",Ub):u!=="open"&&t.forEach(M=>e.append("status",M)),n.forEach(M=>e.append("priority",M)),i.forEach(M=>e.append("label",M)),s.forEach(M=>e.append("exclude_label",M)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),$v((D=T())==null?void 0:D.id,f)}function Gb(e){var y;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=wv((y=T())==null?void 0:y.id);if(w){t=new URLSearchParams(w);const S=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",S)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const w=s.length>0?s:Fb;a.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=w.includes(_.value)}),a.dataset.statusApplied="true",Ju()}const o=t.getAll("priority");if(o.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=o.includes(_.value)}),ep())}const r=t.get("assignee");r&&wb(r);const l=t.get("project");l&&(e(!0),lt(l),e(!1));const c=t.get("sprint");if(c){const w=document.getElementById("sprint-filter");w&&(w.value=c)}const d=t.get("issue_type");if(d){const w=document.getElementById("issue-type-filter");w&&(w.value=d)}const u=t.getAll("label");if(u.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=u.includes(_.value)}),Aa())}const f=t.getAll("exclude_label");if(f.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=f.includes(_.value)}),Ca())}const g=t.get("groupBy");if(g){const w=document.getElementById("group-by-select");w&&(w.value=g)}const b=t.get("sort");if(b){const w=document.getElementById("sort-by-select");w&&(w.value=b)}}function Ju(){const e=nn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=ti(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Ie(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function ep(){const e=Tn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=De(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Aa(){var i,s;const e=Ln(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Ca(){var i,s;const e=An(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function tp(){if(!T())return;let e;try{e=await v.getLabels(T().id)}catch(t){console.error("Failed to load labels for filter:",t);return}np("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),np("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function np(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ee(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${p(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function ip(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function sp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function Kr(e){if(!e)return"";const t=mt(e),n=document.createElement("div");return n.innerHTML=t,ip(n,sp),n.innerHTML}function Cn(e){if(!e)return"";const t=mt(e),n=document.createElement("div");return n.innerHTML=t,ip(n,sp),n.innerHTML}const zb={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},ap=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${p(t)}</span><span class="related-title">${p(n)}</span></a>`;function Vb(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const op={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function Wb(e,t=[],n=[],{formatEstimate:i=null}={}){const s=o=>o.estimate==null?"":` · ${p(i?i(o.estimate,o.project_id||e.project_id):`${o.estimate} pts`)}`,a=[...(t||[]).map(o=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${We(o.status)}</span>
                    ${ap(o.id,o.identifier,o.title)}
                    <span class="related-kind">Sub-issue${s(o)}</span>
                </li>`})),...(n||[]).map(o=>{const r=Vb(o);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${We(o.related_issue_status)}</span>
                    ${ap(o.related_issue_id,o.related_issue_identifier,o.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(o.id)}" title="Remove link" aria-label="Remove link to ${m(o.related_issue_identifier)}">${zb.remove}</button>
                </li>`}})].sort((o,r)=>op[o.kind]-op[r.kind]);return`
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
        </section>`}function Kb(e,t){var s;const n=p((e.author_name||"U").charAt(0).toUpperCase()),i=e.author?Yn(e.author):Ar(t?(s=t(e.author_id))==null?void 0:s.is_agent:!1);return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${n}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author">${p(e.author_name||"User")}</span>
                    ${i}
                    <span class="comment-date">${p(ot(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${Kr(e.content)}</div>
            </div>
        </li>`}const rp=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${Kr(t)}</div></details>`;function Yb(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let a,o="",r="";return e.activity_type==="ritual_attested"?(a=`Attested <b>${p(e.field_name||"a ritual")}</b>`,i?o=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(o=" · waiting for review"),e.new_value&&(r=rp("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(a=`Sent back <b>${p(e.field_name||"a ritual")}</b>`,e.new_value&&(r=rp("Reason",e.new_value,!0))):a=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${a}</span>${o}
                <span class="timeline-meta">· ${p(n(e))} ${Yn(e.user)} · ${p(ot(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function Qb(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function Zb({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:a=!1,issueId:o},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...Qb(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const b=d.get(g.field_name);(!b||new Date(g.created_at)>new Date(b.created_at))&&d.set(g.field_name,g)}const u=[...(e||[]).map(g=>({at:g.created_at,html:Kb(g,r.getAssigneeById)})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const b=d.get(g.field_name)===g;return{at:g.created_at,html:Yb(g,{...r,awaitingReview:b,gateShowsIt:b&&g.field_name===i})}})].sort((g,b)=>new Date(g.at)-new Date(b.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${a?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(o)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${u.length?`<ol class="timeline comments-list">${u.map(g=>g.html).join("")}</ol>`:a?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}function lp(e,t,{formatEstimate:n=null}={}){const i=[`${We(e.status)}<span>${p(Ie(e.status))}</span>`,p(t||"Unassigned"),p(De(e.priority)),p(bt(e.issue_type))];return e.estimate!=null&&i.push(p(n?n(e.estimate,e.project_id):`${e.estimate} pts`)),`<div class="issue-meta-line">${i.map(s=>`<span class="issue-meta-part">${s}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`}const cp=Rr,Xb=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let Lt=[],dp=Promise.resolve();const Jb={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Ba(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const ey={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function up(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function ni(){return!!document.querySelector(".inline-dropdown")}function pp(){return Lt}function mp(e){Lt=e}async function Yr(e,t,n,i){var u,f,g,b;e.preventDefault(),Ft();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${cp.map((y,w)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${We(y)}
                    <span>${Ie(y)}</span>
                    <span class="dropdown-shortcut">${w+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Pr.map((y,w)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${pt(y)}
                    <span>${De(y)}</span>
                    <span class="dropdown-shortcut">${w}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Xb.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${bt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=we(),w=te().find(_=>_.id===n)||Xe().find(_=>_.id===n)||((y==null?void 0:y.id)===n?y:null),S=as({keepId:(w==null?void 0:w.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${S.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:S.map(({assignee:_,indent:D},M)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(_.id)}">
                    ${Ut(_,"avatar-small")}
                    <span>${xa(_,D)}</span>
                    ${M<9?`<span class="dropdown-shortcut">${M+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),w=(y==null?void 0:y.dataset.projectId)||((u=we())==null?void 0:u.project_id),S=bi(w);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${S.map((_,D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${_.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${_.label}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=te(),w=Xe(),S=we(),_=y.find(R=>R.id===n)||w.find(R=>R.id===n)||S,D=new Set(((_==null?void 0:_.labels)||[]).map(R=>R.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const M=o.getBoundingClientRect();let ne=a.bottom+4,E=a.left;E+M.width>window.innerWidth-8&&(E=a.right-M.width),ne+M.height>window.innerHeight-8&&(ne=a.top-M.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,E)}px`,Xi(o,{multiSelect:!0});let P=[];const U=T();if(U)try{P=await v.getLabels(U.id)}catch(R){console.error("Failed to load labels:",R)}if(!o.parentNode)return;gp(o,n,P,D);const W=o.getBoundingClientRect();let Ee=a.bottom+4,x=a.left;x+W.width>window.innerWidth-8&&(x=a.right-W.width),Ee+W.height>window.innerHeight-8&&(Ee=a.top-W.height-4),o.style.top=`${Ee}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=te(),w=Xe(),S=we(),_=y.find(C=>C.id===n)||w.find(C=>C.id===n)||S,D=(_==null?void 0:_.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const M=o.getBoundingClientRect();let ne=a.bottom+4,E=a.left;E+M.width>window.innerWidth-8&&(E=a.right-M.width),ne+M.height>window.innerHeight-8&&(ne=a.top-M.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,E)}px`,Xi(o);let P=[];if(D)try{P=await v.getSprints(D),ok(D,P)}catch(C){console.error("Failed to load sprints:",C)}if(!o.parentNode)return;const U=P.filter(C=>C.status!=="completed"||C.id===(_==null?void 0:_.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${U.map((C,Q)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(C.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${p(C.name)}${C.status==="active"?" (Active)":""}</span>
                    ${Q<9?`<span class="dropdown-shortcut">${Q+1}</span>`:""}
                </button>
            `).join("")}
        `;const W=o.getBoundingClientRect();let Ee=a.bottom+4,x=a.left;x+W.width>window.innerWidth-8&&(x=a.right-W.width),Ee+W.height>window.innerHeight-8&&(Ee=a.top-W.height-4),o.style.top=`${Ee}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");const R=C=>{const Q=C.key;if(Q==="Escape"||Q==="Tab"){Ft(),document.removeEventListener("keydown",R),Zi(null);return}if(up(C,o))return;const _e=parseInt(Q);if(isNaN(_e))return;const ce=o.querySelectorAll(".dropdown-option");let ht=!1;_e===0?(ii(n,"sprint_id",null),ht=!0):_e>=1&&_e<ce.length&&(ce[_e].click(),ht=!0),ht&&(document.removeEventListener("keydown",R),Zi(null))};Zi(R),document.addEventListener("keydown",R),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=y=>{const w=y.key;if(w==="Escape"||w==="Tab"){Ft(),document.removeEventListener("keydown",d);return}if(up(y,o))return;const S=parseInt(w);if(isNaN(S))return;let _=!1;if(t==="status"&&S>=1&&S<=6)ii(n,"status",cp[S-1]),_=!0;else if(t==="priority"&&S>=0&&S<=4)ii(n,"priority",Pr[S]),_=!0;else if(t==="estimate"){const D=we(),M=bi(D==null?void 0:D.project_id);S>=0&&S<M.length&&(ii(n,"estimate",M[S].value),_=!0)}_&&(document.removeEventListener("keydown",d),Zi(null))};Zi(d),document.addEventListener("keydown",d),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),Xi(o)}function ty(e,t,n,i){Yr(e,t,n,i)}function ny(e,t,n){dp=dp.then(()=>fp(e,t,n))}async function fp(e,t,n){const i=te(),s=Xe(),a=we(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await v.updateIssue(e,{label_ids:c}),u=d.labels||[],f=_=>({..._,labels:u,updated_at:d.updated_at??_.updated_at}),g=te();g.some(_=>_.id===e)&&Qe(g.map(_=>_.id===e?f(_):_));const b=Xe();b.some(_=>_.id===e)&&In(b.map(_=>_.id===e?f(_):_));const y=we();(y==null?void 0:y.id)===e&&Zn(f(y));const w=Ba(e);if(w&&w.parentNode){const _=te().find(D=>D.id===e)||Xe().find(D=>D.id===e);_&&(w.outerHTML=li(_))}const S=document.querySelector(".property-labels-btn");S&&(S.innerHTML=u.length>0?u.map(_=>`
                    <span class="issue-label" style="background: ${ee(_.color)}20; color: ${ee(_.color)}">${p(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(k("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function gp(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${m(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${m(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${m(t)}" data-label-id="${m(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${ee(s.color)}20; color: ${ee(s.color)}">${p(s.name)}</span>
                </button>
            `}).join("")}
    `}async function hp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=T();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await v.createLabel(i.id,{name:s}),o=await v.getLabels(i.id);ts(o),a!=null&&a.id&&await fp(e,a.id,null);const r=te(),l=Xe(),c=we(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&gp(t,e,o,u),n.value=""}catch(a){k("create label",a)}finally{n.disabled=!1,n.focus()}}}function Da(){const e=document.getElementById("create-issue-labels-label");e&&(Lt.length===0?e.textContent="Labels":e.textContent=`Labels (${Lt.length})`)}function Qr(e,{failed:t=!1}={}){const n=Br();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=Lt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${m(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${ee(i.color)}20; color: ${ee(i.color)}">${p(i.name)}</span>
                </button>
            `}).join("")}
    `}function iy(e){const t=Lt.indexOf(e);t>=0?Lt.splice(t,1):Lt.push(e),Sr(),Da();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Qr(n)}async function vp(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await v.createLabel(e.id,{name:i}),a=await v.getLabels(e.id);ts(a),s!=null&&s.id&&!Lt.includes(s.id)&&(Lt.push(s.id),Sr()),Da(),t&&Qr(t),n.value=""}catch(s){k("create label",s)}finally{n.disabled=!1,n.focus()}}}async function ii(e,t,n){var r;Ft();const i=ry(e,t,n),s=dy(e,t),a=(r=qr(e))==null?void 0:r[t],o=yp(e,t,()=>n);o&&Zr(e,t,{focus:!0});try{const l={};l[t]=n;const c=await v.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(ls(c),bp(e,t,i)){const d={...c,...cy(e,t)};uy(e,{issue:d,myIssue:d,detail:d}),Ea(d),Zr(e,t,{focus:!o})}}catch(l){if(k("update issue",l),bp(e,t,i)){yp(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=qr(e);c&&c[t]===n&&Ea({...c,[t]:a}),Zr(e,t,{focus:!1})}return}finally{ly(e,t,i)}if($("Issue updated","success"),t==="status")try{const l=K();if(l){const d=(await v.getSprints(l)).find(u=>u.status==="active");Xr(d||null)}}catch{}}const sy=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),sn=new Map;function ay(e){const t=e&&sn.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let oy=0;function ry(e,t,n){const i=++oy;return sn.has(e)||sn.set(e,new Map),sn.get(e).set(t,{seq:i,value:n}),i}function bp(e,t,n){var i,s;return((s=(i=sn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function ly(e,t,n){var s;const i=sn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&sn.delete(e))}function cy(e,t){var i;const n={};return(i=sn.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function dy(e,t){var i,s;const n=we();return{issue:(i=te().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Xe().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function yp(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=te();a.some(l=>l.id===e)&&(s=!0,Qe(a.map(l=>l.id===e?i(l,"issue"):l)));const o=Xe();o.some(l=>l.id===e)&&(s=!0,In(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=we();return(r==null?void 0:r.id)===e&&(s=!0,Zn(i(r,"detail"))),s}function uy(e,t){var s;const n=te();t.issue&&n.some(a=>a.id===e)&&Qe(n.map(a=>a.id===e?t.issue:a));const i=Xe();t.myIssue&&i.some(a=>a.id===e)&&In(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=we())==null?void 0:s.id)===e&&Zn(t.detail)}function py(e){return e==="estimate"||Jb[La()]===e}function my(e,t,n,{focus:i}){var d;const s=Ba(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&py(t)&&te().some(u=>u.id===e))ut();else if(t==="status"&&s.closest("#my-issues-list"))Sn();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=li(n),u&&((d=Ba(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=Ba(e),l=ey[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function Zr(e,t,{focus:n}){const i=te().find(a=>a.id===e)||Xe().find(a=>a.id===e);i&&Ea(i),my(e,t,i,{focus:n});const s=we();(s==null?void 0:s.id)===e&&sy.has(t)&&fy(t,s)}function fy(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".issue-meta-line");if(i){const c=t.assignee_id?ct(t.assignee_id):null;i.outerHTML=lp(t,c?dt(c):null,{formatEstimate:un})}const s=n.querySelector(".detail-sidebar");if(!s)return;let a=e;e==="assignee_id"&&(a="assignee"),e==="sprint_id"&&(a="sprint"),e==="issue_type"&&(a="type");const o=s.querySelectorAll(".property-row");let r=null;for(const c of o){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===a.toLowerCase()){r=c;break}}if(!r)return;const l=r.querySelector(".property-value");if(l){if(e==="status")l.innerHTML=`
            ${We(t.status)}
            <span>${Ie(t.status)}</span>
        `;else if(e==="priority")l.innerHTML=`
            ${pt(t.priority)}
            <span>${De(t.priority)}</span>
        `;else if(e==="issue_type")l.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${bt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?ct(t.assignee_id):null,d=c?dt(c):null;l.innerHTML=d?`${Ut(c,"avatar-small")}<span>${p(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=Jv(),d=t.sprint_id&&c?c.find(u=>u.id===t.sprint_id):null;l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?p(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${un(t.estimate,t.project_id)}</span>
        `);l.classList.add("updated"),setTimeout(()=>l.classList.remove("updated"),500),l==null||l.focus()}}ie({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?ii(t.issueId,i,n==="null"?null:Number(n)):ii(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),ny(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{hp(t.issueId)},"toggle-create-issue-label":(e,t)=>{iy(t.labelId)},"create-label-for-create-issue":()=>{vp()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),hp(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),vp())}});function Ma(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",wp)},0))}function wp(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",wp))}function gy(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",si)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Me(),Ue(gu()),setTimeout(()=>{document.addEventListener("click",si)},0))}function hy(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",si)):(e.classList.remove("hidden"),Iy(),setTimeout(()=>{document.addEventListener("click",si)},0))}function si(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",si))}function Bn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",si)}function Me(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=K();e.innerHTML=Yu.map(n=>{const i=Zu(n.key),s=gu()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ue(e){Uv(e),Me();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":by(t);break;case"status":yy(t);break;case"priority":wy(t);break;case"type":$y(t);break;case"assignee":ky(t);break;case"sprint":Ey(t);break;case"labels":_y(t);break;case"exclude_labels":xy(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function vy(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Me()}function by(e){const t=K()||"",n=X()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${t?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${t?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;n.forEach(s=>{i+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${m(s.id)}">
                <input type="radio" name="project-filter-radio" value="${m(s.id)}" ${t===s.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ee(s.color)};"></span>
                <span class="filter-option-label">${p(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function yy(e){const t=nn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=ti(t);let s=`
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
        `}),e.innerHTML=s}function wy(e){const t=Tn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function $y(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function ky(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;as({keepId:n||null}).forEach(({assignee:s,indent:a})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${m(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${m(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${xa(s,a)}</span>
            </label>
        `}),e.innerHTML=i}function Ey(e){if(!K()){e.innerHTML=`
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
                <span class="filter-option-label">${p(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function _y(e){const t=Ln(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ee(d)};"></span>
                    <span class="filter-option-label">${p(c)}</span>
                </label>
            `}),e.innerHTML=s}function xy(e){const t=An(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ee(d)};"></span>
                    <span class="filter-option-label">${p(c)}</span>
                </label>
            `}),e.innerHTML=s}function Iy(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ge(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=K();if(n){const f=(X()||[]).find(g=>g.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const i=nn();if(i.length>0){const u=ti(i),f=u==="open"?"Open":u==="closed"?"Closed":i.map(g=>Ie(g)).join(", ");t.push({category:"status",label:"Status",value:f,clearAction:"clear-status-filter-new"})}const s=Tn();if(s.length>0){const u=s.map(f=>De(f)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;o.value==="me"?u="Me":o.value==="unassigned"?u="Unassigned":u=dt(ct(o.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=Ln();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),f=l.map(g=>{var w;const b=u==null?void 0:u.querySelector(`input[value="${g}"]`),y=(w=b==null?void 0:b.closest("label"))==null?void 0:w.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const c=An();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),f=c.map(g=>{var w;const b=u==null?void 0:u.querySelector(`input[value="${g}"]`),y=(w=b==null?void 0:b.closest("label"))==null?void 0:w.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${m(u.label)}: ${m(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${p(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function ze(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Wr();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function $p(){const e=document.getElementById("sprint-filter");if(!e)return;const t=K(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Xr(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await v.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${p(a.name)})</option>`),km(t,a==null?void 0:a.id),Xr(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${p(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Xr(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${p(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${p(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Sy(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let kp=!1;rt(e=>{if(e!=="currentProject"||A()!=="issues"||kp)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([$p(),tp()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Aa(),Ca(),it(),Ge(),ze()}).catch(n=>{console.error("Failed to update filters on project switch:",n),it(),Ge(),ze()})});function Ty(){Gb(e=>{kp=e})}function ja(){Ju(),it(),Ge(),ze()}function Ra(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ja()}function Jr(){ep(),it(),Ge(),ze()}function el(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Jr()}function tl(){Aa(),it(),Ge(),ze()}function Pa(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),tl()}function nl(){Ca(),it(),Ge(),ze()}function qa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),nl()}function Ly(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Ep(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${Ly(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let cs=0;function ds(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function _p(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=T())==null?void 0:t.id)||"",project:K()||"",status:[...nn()].sort(),priority:[...Tn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let an=null;function Ay(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function ai(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function xp(e,t){ai(!1),_a(e),Qe(t),A()==="issues"&&St(t),ut(),an=e,ds(sb(e).hiddenClosed||0)}function Cy(e,t,{loading:n}){_a(null),Qe(t),A()==="issues"&&St(t),ut(),ai(n),an=e,ds(0)}function Ip(){_a(null),an=null,ai(!1),Sy(),ds(0)}function By(){const e=document.getElementById("issues-list");ds(0),e!=null&&e.querySelector(".issue-row")?ai(!0):Ip()}function Dy(){const e=db(_p()),t=e?Su(e):null;return t?(_n(-1),xp(e,t),!0):(Ip(),!1)}function My(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const u=d&&Tu(d.updated_at,c.updated_at)?d:c;l.push(ay(u))}return r.length?[...r,...l]:l}async function At(){var w,S,_,D,M,ne,E;_n(-1),Ay();const e=++cs;if(!T())return;const t=K()||"",n=nn(),i=Tn(),s=(w=document.getElementById("assignee-filter"))==null?void 0:w.value,a=(_=(S=document.getElementById("issue-search"))==null?void 0:S.value)==null?void 0:_.trim();if(!t&&X().length===0){an=null,document.getElementById("issues-list").innerHTML=F({icon:N.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=_p(),r={limit:1e3},l=((D=document.getElementById("sort-by-select"))==null?void 0:D.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(M=be())==null?void 0:M.id:r.assignee_id=s);const u=(ne=document.getElementById("sprint-filter"))==null?void 0:ne.value;if(u)if(u==="current"){if(t){const P=rk(t);if(P!==void 0)P&&(r.sprint_id=P);else try{const W=(await v.getSprints(t)).find(Ee=>Ee.status==="active");km(t,W==null?void 0:W.id),W&&(r.sprint_id=W.id)}catch(U){console.error("Failed to resolve current sprint:",U)}}}else r.sprint_id=u;const f=(E=document.getElementById("issue-type-filter"))==null?void 0:E.value;f&&(r.issue_type=f),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,b=!1,y=null;try{const P=Ep(Ln(),"label-filter-dropdown");P.length>0&&(r.label=P,r.label_match="any");const U=Ep(An(),"exclude-label-filter-dropdown");U.length>0&&(r.exclude_label=U),t&&(r.project_id=t);const W=t||`team:${T().id}`;y=xu({...r,scope:W});const Ee=Su(y);if(Ee)g=!0,an===y&&cb()===y&&Bu(te(),Ee)||xp(y,Ee);else{const J=hb({...r,scope:W});J&&(J.complete||J.rows.length>0)?(b=!0,Cy(y,J.rows,{loading:!J.complete})):By()}const x=J=>t?v.getIssues(J):X().length>0?v.getTeamIssues(T().id,J):Promise.resolve(void 0),R=r.search&&ti(n)==="open"?x({...r,status:Vr}).then(J=>Array.isArray(J)?J.length:0).catch(J=>(console.error("Failed to count closed search matches:",J),0)):Promise.resolve(0),C=new Set(te().map(J=>J.id)),Q=await x(r);if(Lu(y,Q),e!==cs)return;Au(o,y);const _e=(g||b)&&an===y,ce=_e?My(te(),Q,C,ju(r)):Q,ht=_e&&Bu(te(),ce);_a(y),Qe(ce),A()==="issues"&&St(Array.isArray(ce)?ce.filter(J=>!J._isOptimistic):ce);const L=[...new Set(ce.map(J=>J.project_id).filter(Boolean))],de=Object.keys(co()).length;if(await $m(L),e!==cs)return;const fe=Object.keys(co()).length!==de;(!ht||fe)&&ut(),an=y,ai(!1);const ue=await R;if(ob(y,{hiddenClosed:ue}),e!==cs)return;ds(ue)}catch(P){if(e!==cs)return;ai(!1);const U=(P==null?void 0:P.status)===403||(P==null?void 0:P.status)===404;if(g&&!U){k("refresh issues",P);return}U&&y&&rb(y),an=null;const W=document.getElementById("issues-list");W&&(W.innerHTML=F({icon:N.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),k("load issues",P)}}function jy(){clearTimeout(Qv()),Zv(setTimeout(()=>{At()},300))}function it(){Xu(),At()}async function Sp(){if(Xu(),La()==="sprint"){const e=te(),t=[...new Set(e.map(n=>n.project_id))];await $m(t)}ut()}function Ry(){Ge(),ze()}function Tp(e){lt(e),Me(),Ue("project"),Bn()}function Py(){Tp("")}function qy(e){const t=e==="open"?is:e==="closed"?Vr:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),ja(),Me(),Ue("status")}function Ny(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,ja()),Me(),Ue("status")}function Oy(){Ra(),Me(),Ue("status"),Ge(),ze()}function Hy(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Jr()),Me(),Ue("priority")}function Fy(){el(),Me(),Ue("priority"),Ge(),ze()}function Lp(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,it()),Me(),Ue("type"),Ge(),ze(),Bn()}function Uy(){Lp("")}function Ap(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,it()),Me(),Ue("assignee"),Ge(),ze(),Bn()}function Gy(){Ap("")}function Cp(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,it()),Me(),Ue("sprint"),Ge(),ze(),Bn()}function zy(){Cp("")}function Vy(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,tl()),Me(),Ue("labels")}function Wy(){Pa(),Me(),Ue("labels"),Ge(),ze()}function Ky(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,nl()),Me(),Ue("exclude_labels")}function Yy(){qa(),Me(),Ue("exclude_labels"),Ge(),ze()}function Qy(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,At()),Bn()}function Zy(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Sp()),Bn()}function Xy(){lt(null),Ra(),el();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Pa(),qa(),it(),Ge(),ze()}ie({"update-label-filter":()=>tl(),"clear-label-filter":()=>Pa(),"update-exclude-label-filter":()=>nl(),"clear-exclude-label-filter":()=>qa(),"show-filter-category":(e,t)=>{var n,i;Ue(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{vy();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>Tp(t.value),"clear-project-filter":()=>Py(),"clear-status-filter-new":()=>Oy(),"set-status-preset":(e,t)=>qy(t.value),"show-all-statuses":()=>Ra(),"toggle-status-option":(e,t)=>Ny(t.filterValue,e),"clear-priority-filter-new":()=>Fy(),"toggle-priority-option":(e,t)=>Hy(t.filterValue,e),"set-type-filter":(e,t)=>Lp(t.value),"clear-type-filter":()=>Uy(),"set-assignee-filter":(e,t)=>Ap(t.value),"clear-assignee-filter":()=>Gy(),"set-sprint-filter":(e,t)=>Cp(t.value),"clear-sprint-filter":()=>zy(),"clear-label-filter-new":()=>Wy(),"toggle-label-option":(e,t)=>Vy(t.filterValue,e),"clear-exclude-label-filter-new":()=>Yy(),"toggle-exclude-label-option":(e,t)=>Ky(t.filterValue,e),"set-sort":(e,t)=>Qy(t.value),"set-group-by":(e,t)=>Zy(t.value),"clear-all-filters":()=>Xy(),"retry-load-issues":()=>At()});const Bp=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function on(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function oi(e){const t=on(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const Jy=60,ew=150;let Ve=[],us=1/0,rn=null,Na=null,ps=null;const Oa=new Map;let ri=null,Ha=[],ms=null;const Dp=e=>{var t;return`${((t=be())==null?void 0:t.id)??""}|${e}`},tw=24;function nw(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(Jy,Math.ceil((e+2*t)/tw))}function ln(e,t){if(e!==null&&(ri!=null&&ri.has(String(e))))return Ha.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,us));return us-=n.length,n.length<t.length&&Ve.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>li(i)).join("")}function Mp(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function jp(){clearTimeout(rn),rn=null,sl++,Ve=[],Na=null,ms=null,ps=null}function il(e=1/0){if(Ve.length===0)return;const t=document.getElementById("issues-list");if(!t||!(ps!=null&&ps.isConnected)){jp();return}const n=new Map(te().map(s=>[s.id,s]));let i=e;for(;Ve.length>0&&i>0;){const s=Ve[0],a=s.ids.slice(0,i),o=Mp(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>li(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?Ve.shift():s.ids=s.ids.slice(a.length)}if(ms){const s=ms;Fa(t,s.issueId)&&(ms=null,Op(t,s))}if(Ve.length===0){clearTimeout(rn),rn=null;const s=Na;Na=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Rp(s)}}const iw=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{rn=setTimeout(e,0)}):rn=setTimeout(e,16);let sl=0;function sw(){if(clearTimeout(rn),Ve.length===0)return;const e=++sl;iw(function t(){e===sl&&(il(ew),Ve.length>0&&(rn=setTimeout(t,0)))})}function ut(){var d,u;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=fw(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),jp(),us=nw();const o=te();if(o.length===0){const f=(u=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:u.trim(),g=Wr()>0,b=f&&f.length>=2;if(g||b){const y=Wr(),w=[];b&&w.push(`search "${f}"`),g&&w.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=F({icon:N.issues,heading:"No matching issues",description:`No issues match your ${w.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=F({icon:N.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});_n(-1),us=1/0;return}const r=La();ri=Oa.get(Dp(r))||null,Ha=[],r==="status"?aw(e,o):r==="priority"?ow(e,o):r==="type"?rw(e,o):r==="assignee"?lw(e,o):r==="sprint"?cw(e,o):e.innerHTML=oi(o)+ln(null,o),us=1/0,ps=e.firstElementChild,Ve.push(...Ha),Ha=[];const l=ri;ri=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&qp(f,!0)}),a.forEach(([f,g])=>{f&&mw(f,e,g)})),i&&(Fa(e,i.issueId)?Op(e,i):Ve.length>0&&(ms=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Ve.length>0&&!c?Na=n:Rp(n),sw()}function Rp(e){const t=hu();if(t<0)return;const n=document.querySelectorAll($a);if(n.length===0){_n(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),_n(i),n[i].classList.add("keyboard-selected")}function aw(e,t){const n={};Rr.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=oi(t);Rr.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${We(s)}</span>
                    <span class="group-title">${Ie(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${on(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function ow(e,t){const n={};ku.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=oi(t);ku.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${pt(s)}</span>
                    <span class="group-title">${De(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${on(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function rw(e,t){const n={};Bp.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=oi(t);Bp.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${bt(s)}</span></span>
                    <span class="group-title">${bt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${on(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function lw(e,t){const n={},i="__unassigned__";n[i]=[];const s=as({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=oi(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${on(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=dt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${m(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ut(o,"avatar-small")}</span>
                    <span class="group-title">${p(l)}${p(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${on(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function cw(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=co();s.sort((l,c)=>{const d=o[l],u=o[c],f=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return f-g});let r=oi(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${p(u)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${on(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(g,c)}
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
                    <span class="group-points">${on(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function Pp(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function Fa(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function dw(e,t){const n=Mp(e,t);if(!n)return;const i=new Map(te().map(s=>[s.id,s]));Ve=Ve.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>li(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function qp(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function uw(e,t){const n=Array.from(document.querySelectorAll($a)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),_n(s)}function Np(e,t,n){qp(t,n);const i=Dp(La());Oa.has(i)||Oa.set(i,new Set);const s=Oa.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),dw(e,t.dataset.group)),uw(e,t)}function pw(e){const t=document.getElementById("issues-list"),n=t&&Pp(t,e);n&&Np(t,n,!n.classList.contains("collapsed"))}function mw(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=Ve.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:Pp(t,i.groupKey):(a=Fa(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||Np(t,s,!1))}function fw(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function Op(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=Fa(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function Hp(e,t){if(!e)return"";if(!t)return p(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return p(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${p(i)}<mark class="search-match">${p(s)}</mark>${p(a)}`}function gw(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Hp(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const hw=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function li(e){var f,g,b;const t=e.assignee_id?ct(e.assignee_id):null,n=t?dt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":hw.format(i),a=e.estimate!=null?un(e.estimate,e.project_id):"",o=vo(e.estimate,e.project_id),r=e.sprint_id?co()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((b=e.title)==null?void 0:b.toLowerCase().includes(c.toLowerCase())),u=c&&!d?gw(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${De(e.priority)}">
                    ${pt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Ie(e.status)}">
                    ${We(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${bt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${Hp(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${ee(y.color)}20; color: ${ee(y.color)}">${p(y.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${m(e.id)}" title="Sprint: ${l?p(l):"None"}">
                    ${l?`<span class="sprint-badge">${p(l)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${m(e.id)}" title="${o?"Estimate outside current scale":`Estimate: ${a||"None"}`}">
                    ${a?`<span class="estimate-badge${o?" out-of-scale":""}">${a}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${m(e.id)}" title="${m(n||"Unassigned")}">
                    ${n?Ut(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function pt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function We(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ie({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}pw(t.group)},"show-inline-dropdown":(e,t,n)=>{Yr(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),oe(t.issueId))}});let ci=[];function Dn(){return ci}function vw(e){ci=Array.isArray(e)?e:[]}function bw(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?mu(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${p(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function yw(e){var t,n;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{const i=await v.getTeamAgents(e);if(((n=T())==null?void 0:n.id)!==e)return;ci=i,ss(fn,Dn),Xn()}catch(i){console.error("Failed to load team agents:",i),k("load team agents",i)}}async function Ua(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{ci=await v.getTeamAgents(e),ss(fn,Dn),Xn(),ww()}catch(n){k("load agents",n)}}function ww(){const e=document.getElementById("agents-list");if(e){if(ci.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=ci.map(t=>{var l;const n=p(t.name),i=p(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=be())==null?void 0:l.id)||_o())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${m(t.id)}" data-agent-name="${m(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${bw(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${nt(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${m(t.id)}" data-agent-name="${m(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${m(t.id)}" data-agent-name="${m(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function $w(){const e=X();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),z()}function Fp(e,t,n=!1){const i=p(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,z()}async function kw(e){var r,l,c,d;e.preventDefault();const t=(r=T())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await v.createProjectAgent(a,n,i,o):u=await v.createTeamAgent(t,n,i,o),H(),Fp("Agent Created",u.api_key,!!u.can_register)}catch(u){k("create agent",u)}return!1}async function Ew(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await v.createAgentKey(e);Fp("New Agent Key",n.key)}catch(n){k("generate agent key",n)}}async function _w(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await v.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),Ua()}catch(s){k("change registrar",s)}}function xw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function Iw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),$("Agent deleted","success"),Ua()}catch(n){k("delete agent",n)}}ie({"create-agent":e=>{kw(e)},"copy-agent-key":()=>{xw()},"dismiss-agent-modal":()=>{H(),Ua()},"delete-agent":(e,t)=>{Iw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{Ew(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{_w(t.agentId,t.agentName,t.canRegister!=="true")}});function Sw(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Tw(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:Sw(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function Lw(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function al(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var f,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((b,y)=>b.classList.toggle("highlighted",y===a)),(g=(f=u[a]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,f=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=f+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(Lw(i.value,d)){o();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const g=f[2].toLowerCase(),b=Tw(fn(),Dn(),i.mentionContext||{}).filter(y=>!g||y.handle.includes(g)||y.name.toLowerCase().includes(g)||y.email.toLowerCase().includes(g)).slice(0,6);if(!b.length){o();return}s.innerHTML=b.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${p(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${p(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,w)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r(w))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const di={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function ui(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function fs(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function ol(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function Ga(e){return fs(e)&&!!ol(e)}function za(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],a=[];for(const o of n)((ui(o)||fs(o)&&!Ga(o))&&t?s:a).push(o);return{needsYou:s,waiting:a,done:i,total:n.length+i.length}}function rl(e,t,n){return e===1?t:n}function gs(e){return ui(e)?"Review":Ga(e)?"Ask again for":fs(e)?"Sign off on":ol(e)?"Re-attest":"Attest"}function ll(e,t){return ui(e)?"an admin":fs(e)&&!Ga(e)?"a person":t||"the assignee"}function Aw(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function Up(e,t){return`<div class="ticket-gate-kicker">Waiting on ${p(e)}<span class="ticket-gate-when"> · ${Aw(t)}</span></div>`}function Cw(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${di.link}${p(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${di.link}Linked document</a>`}function Gp(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${p(t.attested_by_name||"Someone")} attested ${p(ot(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${mt(t.note)}</div>`:""}
            ${Cw(t)}
        </div>`:""}function zp(e){const t=p(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${p(ot(e.rejected_at))}`:"";return`${t} sent it back${n}: “${p(e.note||"")}”`}function Vp(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!ui(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${zp(t)}</div>`}const pi=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function Bw(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${pi(e,t)}>Send back…</button>`;return ui(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${pi(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${pi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function Dw(e,t,n){return Ga(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${pi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":ui(e)||fs(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${pi(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${pi(e,t)}>Attest it yourself</button>`}function Wp(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${p(gs(n).toLowerCase())} <b>${p(n.name)}</b>${s}.</div>`}function cl(e,t){const{needsYou:n,waiting:i,done:s,total:a}=e,o=(l,c,d,u)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${p(d)}</span><span class="ticket-gate-li-who">${p(u)}</span></li>`,r=[...s.map(l=>{var c;return o(di.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>o(di.ring,"you",l.name,"waiting on you")),...i.map(l=>o(di.ring,"",l.name,`waiting on ${ll(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${a} ${rl(a,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function Mw(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=za(e,{canAct:t});return n[0]||i[0]||null}function jw(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:a}=za(e,{canAct:t});if(a===0)return"";const o=i[0]||s[0];return o?`Waiting on ${i.length?"you":ll(o,n)}: ${gs(o).toLowerCase()} ${o.name}.`:`All ${a} ${rl(a,"ritual","rituals")} done.`}function Rw(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=za(e,{canAct:n}),{needsYou:a,waiting:o,total:r}=s;if(r===0)return"";if(a.length===0&&o.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${di.check}</span>
                ${cl(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${rl(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(a.length>0){const u=a[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(u.id)}">
                ${Up("you",u)}
                <h2 class="ticket-gate-step">${p(gs(u))} <b>${p(u.name)}</b></h2>
                ${u.prompt?`<div class="ticket-gate-asks markdown-body">${mt(u.prompt)}</div>`:""}
                ${Gp(u)}
                ${Vp(u)}
                <div class="ticket-gate-actions">${Bw(u,t)}</div>
                ${Wp([...a.slice(1),...o],"Then")}
                ${cl(s,i)}
            </section>`}const l=o[0],c=l.attestation?null:ol(l),d=Dw(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${Up(ll(l,i),l)}
            <h2 class="ticket-gate-step">${p(gs(l))} <b>${p(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${zp(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${mt(l.prompt)}</div>`:""}
            ${Gp(l)}
            ${Vp(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${Wp(o.slice(1),"After that")}
            ${cl(s,i)}
        </section>`}function Pw(e,{canAct:t=!1}={}){const{needsYou:n}=za(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${p(gs(i).toLowerCase())} <b>${p(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const Va=new Map;function dl(){var e;return`${((e=T())==null?void 0:e.id)??""}|${K()??""}`}function mi(e,t,n){Va.set(e,{key:t,value:n})}function Wa(e,t){const n=Va.get(e);return n&&n.key===t?n.value:void 0}function hs(e,...t){for(const n of t)n!==e&&Va.delete(n)}function ul(){Va.clear()}function Ka(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}rt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&ul(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&ul()});let Te=null,Kp=!1,Mn=!1,Yp="new-comment";function qw(){return Te||(Te=document.createElement("div"),Te.className="quote-tooltip",Te.setAttribute("role","button"),Te.setAttribute("tabindex","0"),Te.setAttribute("aria-label","Quote selection in comment"),Te.textContent="Quote",Te.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Ya())}),Te.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Te.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ya()}),document.body.appendChild(Te),Te)}function Qp(e,t){const n=qw();n.style.display="flex",Mn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Mn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function vs(){Te&&(Te.style.display="none"),Mn=!1}function Nw(){return Mn}function Zp(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function pl(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Zp(t.startContainer),i=Zp(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Ow(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Ya(e=Yp){const t=pl();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Ow(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),vs(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Hw(){var i;if(!pl())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Qp(n.left+n.width/2,n.top),!0}function Fw(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!pl()){vs();return}Qp(t,n)},10)}function Xp({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(Yp=t,i.addEventListener("mouseup",Fw,n?{signal:n}:void 0),Kp||(Kp=!0,document.addEventListener("mousedown",s=>{Mn&&Te&&!Te.contains(s.target)&&vs()}),document.addEventListener("selectionchange",()=>{Mn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&vs()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Mn&&(s.stopImmediatePropagation(),vs())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Hw()})))}function Jp(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let cn=[],bs=[],Qa=null,le=new Set,fi="list",jn=!1,ml=null,Za=null,fl=null,gl=null,em=null;function tm(e){if(em!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const hl=xv();(hl==="list"||hl==="grid")&&(fi=hl);function nm(e){if(e!=="list"&&e!=="grid")return;fi=e,e==="grid"&&jn&&vl(),Iv(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Vt()}function im(){if(fi!=="list")return;jn=!0,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Vt(),hi()}function vl(){jn=!1,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Vt(),hi()}function Uw(){ml&&clearTimeout(ml),ml=setTimeout(()=>{Vt()},300)}function Gw(){const e=document.getElementById("doc-search");e&&(e.value=""),Vt()}async function zw(){lt(null)}async function Vw(){const e=document.getElementById("doc-search");e&&(e.value=""),lt(null)}function Ww(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=K()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${p(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=X().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${p(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Kw(){return cn}function Vt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Ww(),bs=cn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),bs.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),e$("",fi)}let gi=0;async function Yw(){var i;const e=Qa||((i=T())==null?void 0:i.id);if(!e)return;const t=++gi,n=K()||null;try{const s=await v.getDocuments(e,n);if(t!==gi)return;mi("documents",`${e}|${n??""}`,s),cn=s,Vt()}catch(s){if(t!==gi)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=F({icon:N.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",s)}}rt(e=>{e==="currentProject"&&A()==="documents"&&Yw()});async function Rn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=T())==null?void 0:r.id),!e)return;Qa=e,vu(-1);const i=++gi;t===null&&(t=K()||null);const s=`${e}|${t??""}`,a=n?Wa("documents",s):void 0,o=document.getElementById("documents-list");a?(cn=a,Vt()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await v.getDocuments(e,t);if(i!==gi)return;mi("documents",s,l);const c=a&&Ka(cn,l);cn=l;const d=document.getElementById("doc-view-list"),u=document.getElementById("doc-view-grid");d&&u&&(d.classList.toggle("active",fi==="list"),u.classList.toggle("active",fi==="grid")),c||Vt()}catch(l){if(i!==gi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=F({icon:N.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",l)}}function sm(){var t,n;if(A()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Qa||((n=T())==null?void 0:n.id);e&&Rn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function am(e){tm(e)&&Le(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Qw(e,t){tm(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),q("documents"))}function Zw(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ee(t.color)}20; color: ${ee(t.color)}">${p(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function Xw(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Zw(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${p(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${p(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?p(Jp(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${p(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Jw(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ee(r.color)}20; color: ${ee(r.color)}">${p(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Jp(e.content).substring(0,80):"No content",s=jn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${le.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${jn&&le.has(e.id)?" selected":""}" data-action="${jn?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
      ${s}
      <div class="document-list-icon">${p(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${p(e.title)}</div>
        <div class="document-list-snippet text-muted">${p(i)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?p(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function e$(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;le.clear(),hi();const i=bs;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=K(),f=d||u;n.innerHTML=F({icon:f?N.search:N.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?Xw:Jw,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=X();i.forEach(d=>{let u,f;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const g=r.find(b=>b.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${p(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function t$(e){le.has(e)?le.delete(e):le.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=le.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",le.has(e)),hi()}function n$(){bs.forEach(e=>le.add(e.id)),bs.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),hi()}function om(){le.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),le.clear(),hi()}function hi(){const e=document.getElementById("doc-bulk-actions");e&&(jn?(e.classList.remove("hidden"),le.size>0?e.innerHTML=`
        <span class="bulk-count">${le.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function i$(){if(le.size===0){$("No documents selected","error");return}const t=X().map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${le.size} Document${le.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${le.size} selected document${le.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,z()}async function s$(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(le);let i=0;const s=[];for(const l of n)try{await v.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=cn.find(d=>d.id===l))==null?void 0:o.title)||l)}H(),om(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=T())==null?void 0:r.id;return await Rn(a),!1}async function a$(){var a,o;if(le.size===0){$("No documents selected","error");return}const e=le.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(le);let n=0;const i=[];for(const r of t)try{await v.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=cn.find(c=>c.id===r))==null?void 0:a.title)||r)}vl(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=T())==null?void 0:o.id;await Rn(s)}async function o$(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await v.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${m(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${p(s.author_name||"Unknown")}</span>
                ${Yn(s.author)}
                <span class="comment-date">${ot(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Kr(s.content)}</div>
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
    `}}function r$(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=su(e);s&&(i.value=s),i.addEventListener("input",()=>{ha(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),al("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Le(e,t=!0){try{t&&pn();const n=await v.getDocument(e);em=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await o$(n);let a=null,o=null,r=!1;if(n.project_id){const P=X().find(U=>U.id===n.project_id);if(a=P?P.name:null,n.sprint_id)try{const U=await v.getSprint(n.sprint_id);o=U?U.name:null}catch(U){console.error("Failed to load sprint name:",U),r=!0}}let l=n.content||"";const c=Y.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=Kw(),u=d.findIndex(E=>E.id===n.id),f=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,b=u>=0,y=A()||"documents",w=n.labels&&n.labels.length>0?n.labels.map(E=>`
          <span class="issue-label" style="background: ${ee(E.color)}20; color: ${ee(E.color)}">
            ${p(E.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(E.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let S='<span class="text-muted">None</span>';try{const E=await v.getDocumentIssues(n.id);E.length>0&&(S=E.map(P=>`
          <div class="linked-item">
            <span class="linked-item-id">${p(P.identifier)}</span>
            <span class="linked-item-title">${p(P.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(P.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(E){console.error("Failed to load linked issues:",E),S=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
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
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${g?`data-action="view-document" data-document-id="${m(g.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?p(a)+" ›":""} ${p(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?p(n.icon)+" ":""}${p(n.title)}</h1>

          <div class="document-content markdown-body">${l?Cn(l):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?p(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:p(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${w}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${m(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${p(n.author_name||"Unknown")} ${Yn(n.author)}</span>
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
              ${S}
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
    `,Za&&Za.abort(),Za=new AbortController;const{signal:_}=Za,D=i.querySelector(".sidebar-overflow-trigger"),M=i.querySelector(".overflow-menu-dropdown");if(D&&M){const E=()=>{M.classList.add("hidden"),D.setAttribute("aria-expanded","false")},P=()=>{const U=M.classList.toggle("hidden");D.setAttribute("aria-expanded",String(!U))};D.addEventListener("click",P,{signal:_}),document.addEventListener("click",U=>{!D.contains(U.target)&&!M.contains(U.target)&&E()},{signal:_}),M.addEventListener("keydown",U=>{U.key==="Escape"&&(E(),D.focus())},{signal:_})}r$(n.id,_,n.project_id||null),Xp({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:_}),fl=f?f.id:null,gl=g?g.id:null;const ne=E=>{if((E.metaKey||E.ctrlKey)&&E.shiftKey&&(E.key===">"||E.key==="."||E.code==="Period")&&Ya("new-doc-comment")){E.preventDefault();return}E.metaKey||E.ctrlKey||E.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||E.target.tagName==="INPUT"||E.target.tagName==="TEXTAREA"||E.target.tagName==="SELECT"||E.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(E.key==="ArrowLeft"&&fl?(E.preventDefault(),Le(fl)):E.key==="ArrowRight"&&gl&&(E.preventDefault(),Le(gl)))};document.addEventListener("keydown",ne,{signal:_})}catch(n){k("load document",n)}}async function Xa(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${p(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function bl(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${p(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function l$(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?Cn(r):'<span class="text-muted">Nothing to preview.</span>'}}function yl(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=lu(e);if(o){const l=kv(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){va(e,null);return}va(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function rm(){ys=null;const e=X(),t=Pm()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${p(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${bl("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,z(),yl("new"),t&&await Xa("doc-sprint",t,null,!0)}let ys=null;async function c$(e,t,n){ys=n||null;const s=X().map(a=>`<option value="${m(a.id)}" ${a.id===t?"selected":""}>${p(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${bl("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,z(),yl("new"),t&&await Xa("doc-sprint",t,e)}async function d$(e){var a;e.preventDefault();const t=(a=T())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await v.createDocument(t,s),va("new",null),await Rn(t),H(),$("Document created!","success"),ys){const o=ys;ys=null,o()}}catch(o){k("create document",o)}return!1}let wl=null,ws=null,$l=!1;async function lm(e){try{const t=await v.getDocument(e);wl=e,ws={title:t.title||"",content:t.content||""},$l=!1;const i=X().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${p(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${bl("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,z(),yl(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Xa("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){k("load document",t)}}async function u$(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&wl===t&&ws&&!$l){let o=null;try{o=await v.getDocument(t)}catch{}if(o&&((o.title||"")!==ws.title||(o.content||"")!==ws.content))return $l=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await v.updateDocument(t,s),wl=null,ws=null;const o=lu(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&va(t,null),H(),await Le(t),$("Document updated!","success")}catch(o){k("update document",o)}return!1}async function p$(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await Rn(n),q("documents"),$("Document deleted!","success")}catch(n){k("delete document",n)}}function m$(e,t){Xa(e,t)}async function f$(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,z()}async function g$(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,a=await v.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(o.id)}">
        <span class="link-result-id">${p(o.identifier)}</span>
        <span class="link-result-title">${p(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function h$(e,t){try{await v.linkDocumentToIssue(e,t),H(),$("Issue linked!","success"),await Le(e,!1)}catch(n){k("link issue",n)}}async function v$(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Le(e,!1)}catch(n){k("unlink issue",n)}}let kl=!1;async function b$(e,t){if(e.preventDefault(),kl)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;kl=!0;try{const s=await v.createDocumentComment(t,i);n.value="",$("Comment added!","success"),Tr(s),await Le(t,!1)}catch(s){k("add comment",s)}finally{kl=!1}return!1}async function y$(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await v.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,z();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ee(a.color)}; color: white;">${p(a.name)}</span>
        ${a.description?`<span class="text-muted">${p(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,z()}catch(i){k("load labels",i)}}async function w$(e,t){try{await v.addLabelToDocument(e,t),H(),$("Label added!","success"),await Le(e,!1)}catch(n){k("add label",n)}}async function $$(e,t){try{await v.removeLabelFromDocument(e,t),$("Label removed!","success"),await Le(e,!1)}catch(n){k("remove label",n)}}ie({"view-document":(e,t)=>{e.preventDefault(),Le(t.documentId)},"set-doc-editor-mode":(e,t)=>{l$(t.target,t.mode)},"retry-load-documents":()=>{Rn(Qa)},"retry-document-comments":(e,t)=>{Le(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{t$(t.docId)},"clear-doc-search":()=>{Gw()},"clear-doc-project-filter":()=>{zw()},"clear-all-doc-filters":()=>{Vw()},"show-bulk-move-modal":()=>{i$()},"bulk-delete-documents":()=>{a$()},"select-all-docs":()=>{n$()},"clear-doc-selection":()=>{om()},"exit-selection-mode":()=>{vl()},"enter-selection-mode":()=>{im()},"handle-bulk-move":e=>{s$(e)},"unlink-document-issue":(e,t)=>{v$(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{f$(t.documentId)},"add-document-comment":(e,t)=>{b$(e,t.documentId)},"remove-label-from-doc":(e,t)=>{$$(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{y$(t.documentId)},"show-edit-document-modal":(e,t)=>{lm(t.documentId)},"delete-document":(e,t)=>{p$(t.documentId)},"create-document":e=>{d$(e)},"update-doc-sprint-dropdown":(e,t,n)=>{m$(t.sprintSelect,n.value)},"update-document":(e,t)=>{u$(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{g$(n.value,t.documentId)},"link-to-issue":(e,t)=>{h$(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{w$(t.documentId,t.labelId)}});async function cm(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),s=bi(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${p(o.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${m(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${m(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
                    <textarea id="edit-issue-description">${p(t.description||"")}</textarea>
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
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${p(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,z();const a=document.getElementById("edit-issue-description");if(a){const o=Yi(e);if(o){const r=ou(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?kn(e,r,t.description||""):kn(e,null)})}}catch(t){k("load issue",t)}}async function k$(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await v.updateIssue(t,c);Yi(t)===c.description&&kn(t,null),H(),await oe(t),$("Issue updated!","success"),ls(d)}catch(n){k("update issue",n)}}async function E$(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await At(),await ft(),q("issues"),$("Issue deleted!","success")}catch(t){k("delete issue",t)}}ie({"update-issue":(e,t)=>{k$(e,t.issueId)}});let El=!1,_l=!1,Ja=null,$s=null,ks=null,eo=null,xl=!1,to=null;function Il(e=null){xl=!0,e&&(to=e)}function dm(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function Sl(e){return e.user_name||e.user_email||"Unknown"}const Tl=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function Ll(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${p(Ie(t(e.old_value)))}</strong> to <strong>${p(Ie(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${p(De(t(e.old_value)))}</strong> to <strong>${p(De(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${p(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${p(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=p(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=p(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${p(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${Tl(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${Tl(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${Tl(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return p(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue"}}async function Es(e){const t=()=>{var i;const n=(i=we())==null?void 0:i.id;return!n||n===e};try{const n=await v.getTicketRitualsStatus(e);if(!t())return;Ja=n,Dl(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;Ja=null,Dl(e)}}function um(){const e=be();if(!e||e.is_agent)return!1;const t=fn();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}let _s=null,Al=!0;function Cl(){var a;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!Al;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((a=e.firstElementChild)==null?void 0:a.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function pm(){_s&&(_s.disconnect(),_s=null),Al=!0,Cl()}const _$=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function x$(){pm();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!_$()||(_s=new IntersectionObserver(t=>{Al=t[t.length-1].isIntersecting,Cl()}),_s.observe(e))}function I$(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let Bl=null;function Dl(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&Bl===e,s=document.activeElement,a=!!t&&!!s&&(t.contains(s)||s===document.body),o=Ja,r=um(),l=we(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?ct(c.assignee_id):null,u=d?dt(d):(c==null?void 0:c.assignee_name)||null;if(((b,y)=>{b&&(b.innerHTML=y,b.classList.toggle("hidden",y.trim()===""))})(t,o?Rw(o,e,{canAct:r,assigneeName:u}):""),t&&(t.dataset.issueId=e),Bl=e,n){const b=o?Pw(o,{canAct:r}):"";n.innerHTML=b?`<div class="ticket-gate-sticky-bar">${b}</div>`:"",Cl()}if(i){const b=document.getElementById("ticket-gate-live");if(b&&(b.textContent=o?jw(o,{canAct:r,assigneeName:u}):""),a&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function no({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function S$(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&no({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||no()},{signal:e})}async function io(e){try{let t;return e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?(await oe(t.id,!1),!0):(q("my-issues",!1),!1)}catch{return q("my-issues",!1),!1}}function Ml(e){const t=es(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function jl({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function T$(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=we();if(!t)return;const n=Ml(t.id);$s=n.prevIssue?n.prevIssue.id:null,ks=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=jl(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}rt(e=>{e==="detailNavContext"&&T$()});let xs=0;const mm=500;function L$(){xs++}let fm=0,so=!1;function gm(){if(document.querySelector(".description-inline-editor"))return"editor";if(ni())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)")||e!=null&&e.querySelector("details.related-add[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||so?"transient":null}function hm(e){return Il(),e==="editor"?"deferred":"retry"}function A$(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=we())==null?void 0:n.id)===e}function C$(e){return te().find(t=>t.id===e)||qr(e)||es().find(t=>t.id===e)||null}function B$(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;pm(),Bl=null,Zn(e);const i=Ml(e.id);$s=i.prevIssue?i.prevIssue.id:null,ks=i.nextIssue?i.nextIssue.id:null;const s=X().find(r=>r.id===e.project_id),a=e.assignee_id?ct(e.assignee_id):null,o=A()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${jl(i)}
                        <span class="issue-detail-breadcrumb">${s?p(s.name):"Project"} › ${p(e.identifier)}</span>
                    </div>
                    <h1 class="issue-detail-title">${p(e.title)}</h1>
                    <div class="issue-detail-description">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title" style="width: 70%"></div>
                    </div>
                </div>
                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${We(e.status)}<span>${Ie(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${pt(e.priority)}<span>${De(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?p(dt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function oe(e,t=!0,{refresh:n=!1}={}){var a;const i=n?xs:++xs,s=++fm;if(n){const o=gm();if(o)return hm(o)}try{t&&pn();let o=!1;if(!n){const L=C$(e);L&&(B$(L),t&&(history.pushState({issueId:e,view:A()},"",`/issue/${L.identifier}`),o=!0))}let r=!1;const[l,c,d,u,f,g]=await Promise.all([v.getIssue(e),v.getComments(e).catch(L=>(console.error("Failed to load comments:",L),r=!0,[])),v.getActivities(e,0,mm),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),b=[...c].sort((L,de)=>new Date(L.created_at)-new Date(de.created_at)),y=[l.parent_id?v.getIssue(l.parent_id):Promise.resolve(null),v.getSprints(l.project_id).catch(L=>(console.error("Failed to load sprints:",L),[]))],[w,S]=await Promise.all(y);if(i!==xs)return"dropped";let _=null,D=null;if(n){if(s!==fm||!A$(e))return"dropped";const L=gm();if(L)return hm(L);D=window.scrollY;const de=document.activeElement;de!=null&&de.id&&document.getElementById("issue-detail-view").contains(de)&&(_={id:de.id,start:de.selectionStart,end:de.selectionEnd})}Ja=g,t&&!o&&history.pushState({issueId:e,view:A()},"",`/issue/${l.identifier}`),Zn(l),wu(S),xl=!1,to=null,document.querySelectorAll(".view").forEach(L=>L.classList.add("hidden"));const M=document.getElementById("issue-detail-view");M.classList.remove("hidden");const ne=A()||"my-issues",E=X().find(L=>L.id===l.project_id),P=l.assignee_id?ct(l.assignee_id):null,U=P?dt(P):null,W=l.sprint_id?S.find(L=>L.id===l.sprint_id):null,Ee=Ml(l.id),{prevIssue:x,nextIssue:R}=Ee;M.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(ne)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${jl(Ee)}
                        <span class="issue-detail-breadcrumb">${E?p(E.name):"Project"} › ${p(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(l.title)}</h1>
                    ${lp(l,U,{formatEstimate:un})}

                    ${w?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(w.identifier)}" data-action="navigate-issue" data-issue-id="${m(w.id)}" data-identifier="${m(w.identifier)}">${w.identifier}: ${p(w.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${Yi(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${m(l.id)}">
                                ${Yi(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${m(l.id)}">
                            ${l.description?Cn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${Wb(l,u,f,{formatEstimate:un})}

                    ${Zb({comments:b,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((a=Mw(g,{canAct:um()}))==null?void 0:a.name)||null,activitiesTruncated:d.length>=mm},{formatText:Ll,formatActor:Sl,getAssigneeById:ct})}

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
                                ${We(l.status)}
                                <span>${Ie(l.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${m(l.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${pt(l.priority)}
                                <span>${De(l.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${m(l.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${bt(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${U?`${Ut(P,"avatar-small")}<span>${p(U)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${m(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${W?p(W.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${m(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(L=>`
                                        <span class="issue-label" style="background: ${ee(L.color)}20; color: ${ee(L.color)}">${p(L.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${E?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(E.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${m(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${vo(l.estimate,l.project_id)?" out-of-scale":""}" ${vo(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${un(l.estimate,l.project_id)}</span>
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
                            <span class="property-value-static">${p(l.creator_name||"Unknown")} ${Yn(l.creator)}</span>
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
        `,eo&&eo.abort(),eo=new AbortController;const{signal:C}=eo,Q=document.querySelector(".sidebar-overflow-trigger"),_e=document.querySelector(".overflow-menu-dropdown");if(Q&&_e){const L=()=>{_e.classList.add("hidden"),Q.setAttribute("aria-expanded","false")},de=()=>{const fe=_e.classList.toggle("hidden");Q.setAttribute("aria-expanded",String(!fe))};Q.addEventListener("click",de,{signal:C}),document.addEventListener("click",fe=>{!Q.contains(fe.target)&&!_e.contains(fe.target)&&L()},{signal:C}),_e.addEventListener("keydown",fe=>{fe.key==="Escape"&&(fe.stopPropagation(),L(),Q.focus())},{signal:C})}x$(),Dl(l.id),al("new-comment","mention-suggestions",{projectId:l.project_id}),Xp({signal:C}),S$(C);const ce=document.getElementById("new-comment");if(so=!1,ce){ce.addEventListener("compositionstart",()=>{so=!0},{signal:C}),ce.addEventListener("compositionend",()=>{so=!1},{signal:C});const L=su(l.id);L&&(ce.value=L),ce.addEventListener("input",()=>{ha(l.id,ce.value)}),ce.addEventListener("keydown",de=>{var fe;de.key==="Enter"&&(de.metaKey||de.ctrlKey)&&(de.preventDefault(),(fe=ce.closest("form"))==null||fe.requestSubmit())})}$s=x?x.id:null,ks=R?R.id:null;const ht=L=>{var ue;if((L.metaKey||L.ctrlKey)&&L.shiftKey&&(L.key===">"||L.key==="."||L.code==="Period")&&Ya()){L.preventDefault();return}if(L.metaKey||L.ctrlKey||L.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||L.target.tagName==="INPUT"||L.target.tagName==="TEXTAREA"||L.target.tagName==="SELECT"||L.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||ni())return;if(L.key==="ArrowLeft"&&$s)L.preventDefault(),oe($s);else if(L.key==="ArrowRight"&&ks)L.preventDefault(),oe(ks);else if(L.key==="c"){L.preventDefault(),L.stopImmediatePropagation();const J=document.getElementById("new-comment");J&&(J.focus(),J.scrollIntoView({behavior:"smooth",block:"nearest"}))}else L.key==="j"?(L.preventDefault(),L.stopImmediatePropagation(),ao(1)):L.key==="k"?(L.preventDefault(),L.stopImmediatePropagation(),ao(-1)):L.key==="d"&&(L.preventDefault(),(ue=document.querySelector('[data-action="edit-description"]'))==null||ue.click());const fe={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[L.key];if(fe){const J=document.querySelector(`.property-row[data-field="${fe}"]`);J&&(L.preventDefault(),J.click())}};if(document.addEventListener("keydown",ht,{signal:C}),_){const L=document.getElementById(_.id);if(L&&(L.focus({preventScroll:!0}),typeof _.start=="number"&&typeof L.setSelectionRange=="function"))try{L.setSelectionRange(_.start,_.end)}catch{}}return D!==null&&window.scrollTo(0,D),"rendered"}catch(o){if(n)console.error("Failed to refresh issue detail:",o);else{if(i!==xs)return"dropped";k("load issue",o);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(o==null?void 0:o.status)===403||(o==null?void 0:o.status)===404;r.innerHTML=F(l?{icon:N.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:N.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function D$(e,t){if(e.preventDefault(),El)return!1;const n=document.getElementById("new-comment").value;ha(t,null),El=!0;try{const i=await v.createComment(t,n);$("Comment added!","success"),Tr(i),await oe(t)}catch(i){ha(t,n),k("add comment",i)}finally{El=!1}return!1}async function M$(e){const t=we()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${p(t.description||"")}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Yi(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=ou(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}al("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?kn(e,c,t.description||""):kn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&vm()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(kn(e,null),xl){oe(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Cn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(_l)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=to?to.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");_l=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await v.updateIssue(e,{description:c}),kn(e,null),$("Description updated","success"),await oe(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(y){k("update description",y)}finally{_l=!1,u&&(u.disabled=!1)}})}function vm(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Cn(n):'<span class="text-muted">Nothing to preview.</span>'}function j$(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?vm():i.focus()}function R$(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,z(),document.getElementById("relation-issue-search").focus()}async function P$(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,o=(await v.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${p(r.identifier)}</span>
                <span class="link-result-title">${p(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function q$(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function N$(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function O$(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(i,t,"blocks"):await v.createRelation(t,i,n),H(),$("Relation added","success"),oe(t)}catch(s){k("add relation",s)}return!1}async function H$(e,t){try{await v.deleteRelation(e,t),$("Relation removed","success"),oe(e)}catch(n){k("remove relation",n)}}function ao(e){const t=we();if(!t)return;const n=es();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||oe(n[s].id)}ie({"retry-issue-comments":(e,t)=>{oe(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{ty(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||M$(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),Le(t.documentId))},"scroll-to-ticket-gate":()=>{I$()},"save-comment":(e,t)=>{D$(e,t.issueId)},"show-add-relation-modal":(e,t)=>{no(),R$(t.issueId)},"remove-relation":(e,t)=>{H$(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{no(),Wu(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{O$(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{P$(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{q$(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{N$()},"set-description-editor-mode":(e,t)=>{j$(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>ao(-1),"navigate-next-issue":()=>ao(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),cm(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),E$(t.issueId)}});let Ct=[],oo={},ro=new Set,Wt=null,Rl=null,lo=[],Is=[],Pl=[];function co(){return oo}function F$(){return Rl}function U$(){return Wt}rt(e=>{e==="currentProject"&&A()==="sprints"&&dn()});let ql=0;async function dn({fromMemory:e=!1}={}){yu(-1);const t=K();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const n=++ql;ak();const i=document.getElementById("sprints-list"),s=dl(),a=e?Wa("sprints",s):void 0;a?(Ct=a,bm()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([v.getCurrentSprint(t),v.getSprints(t)]),r=o.some(c=>c.status==="active")?o:await v.getSprints(t);if(n!==ql)return;const l=a&&Ka(Ct,r);Ct=r,mi("sprints",s,r),l||bm(),await uo()}catch(o){return n!==ql?void 0:(i&&(i.innerHTML=F({icon:N.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),k("load sprints",o),!1)}return!0}function bm(){const e=document.getElementById("sprints-list");if(!e)return;const t=Ct.find(a=>a.status==="active"),n=Ct.find(a=>a.status==="planned"),i=Ct.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${m(t.id)}" data-sprint-url="/sprint/${m(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${p(t.name)}</div>
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
        `,s+=G$(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${m(n.id)}" data-sprint-url="/sprint/${m(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${p(n.name)}</div>
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
                            <span class="sprint-history-name">${p(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||F({icon:N.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function ym(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${Ul(e.activated_at)}, closed ${Ul(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${Ul(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function G$(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${p(ym(e))||"not yet activated"}</span>
                    <span>${p(r)}</span>
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
    `}let Nl=0;async function vi(e,t=!0){var n;try{t&&pn();const i=++Nl,s=A(),a=await v.getSprint(e);if(i!==Nl)return;if(!a){$("Sprint not found","error"),q("sprints");return}Rl=a;const o=(n=T())==null?void 0:n.id,[r,l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?v.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==Nl)return;lo=r,Pl=l,Is=c,A()===s&&St(lo),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),V$()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),q("sprints")}}async function z$(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),q("sprints",!1);return}try{await vi(e,!1)}catch{q("sprints",!1)}}function V$(){const e=Rl,t=lo;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=A()||"sprints",s=t.filter(g=>is.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,y)=>b+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${m(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${p(e.name)}</h2>
                ${u}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${p(ym(e))}
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
                ${s.length===0?F({icon:N.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>Ol(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?F({icon:N.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>Ol(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>Ol(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${K$()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Is.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${m(e.id)}"
                        data-project-id="${m(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Is.length>0?`
                    <div class="sprint-issues-list">
                        ${Is.map(g=>W$(g)).join("")}
                    </div>
                `:F({icon:N.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Ol(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Eu,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${p(e.identifier)}</span>
            <span class="sprint-issue-title">${p(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${lk(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function W$(e){const t=p(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${p(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${ot(e.created_at)}</span>
            </span>
        </div>
    `}function K$(){const e=Pl;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${p(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${p(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${Y$(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Y$(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Q$(e,t,n,i){const s=i?Bk(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${m(e)}" data-project-id="${m(i)}" data-current-budget="${m(n??"")}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${m(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${s?`<small class="form-hint">${p(s)}</small>`:""}
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
    `,z()}async function Z$(e,t,n){var u,f,g,b;e.preventDefault();const i=(f=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Ct.find(y=>y.id===t);try{const y={};i&&(y.name=i);const w=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!w&&(y.budget=a),Object.keys(y).length&&await v.updateSprint(t,y),o==="planned"){const _=Ct.filter(D=>D.status==="planned"&&D.id!==t);for(const D of _)await v.updateSprint(D.id,{budget:a})}o==="default"&&n&&await v.updateProject(n,{default_sprint_budget:a}),await dn(),H(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(y){k("update budget",y)}return!1}const wm="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function X$(e,t=null){const n=Ct.find(c=>c.id===e),i=n?X().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${wm}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await v.updateSprint(e,{budget_follows_default:!0})}catch(c){k("reset budget to project default",c),t&&(t.disabled=!1);try{await dn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await dn()!==!1}catch{l=!1}$(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&$(wm,"warning")}async function J$(e){const t=Ct.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,z();const n=is;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${p(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${m(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function ek(e){try{const t=await v.closeSprint(e);await dn(),Em(),t.limbo?nk(t):$("Sprint completed!","success")}catch(t){k("complete sprint",t)}}async function uo(){const e=K();if(e)try{Wt=await v.getLimboStatus(e),tk()}catch(t){console.error("Failed to load limbo status:",t)}}function tk(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Wt||!Wt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Wt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function nk(e){const t=K();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${p(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,z(),ik(t)}async function ik(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${p(i.name)} <span class="ritual-mode">(${p(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${mt(i.prompt)}</div>
                    ${Fl(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Hl(){var t,n;if(!Wt)return;const e=K();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Wt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${p(i.name)}</strong>
                            <span class="badge badge-ritual-${m(i.approval_mode)}">${p(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${mt(i.prompt)}</div>
                        ${Fl(i.attestation)}
                        ${sk(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Wt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Wt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${p(i.name)}</div>
                            ${Fl(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,z()}function Fl(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${p(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${p(ot(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${mt(e.note)}</div>
        </div>
    `}function sk(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function $m(e){for(const t of e)if(!ro.has(t))try{(await v.getSprints(t)).forEach(i=>{oo[i.id]=i}),ro.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function ak(){oo={},ro=new Set,lo=[],Pl=[],Is=[],po={}}function ok(e,t){t.forEach(n=>{oo[n.id]=n}),ro.add(e)}let po={};function rk(e){return po[e]}function km(e,t){po[e]=t??null}function Em(){po={}}ie({"retry-load-sprints":()=>dn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}vi(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Q$(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{X$(t.sprintId,n)},"show-limbo-details-modal":()=>{Hl()},"show-close-sprint-confirmation":(e,t)=>{J$(t.sprintId)},"handle-update-budget":(e,t)=>{Z$(e,t.sprintId,t.projectId)},"close-modal":()=>{H()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,H(),ek(t.sprintId)},"dismiss-limbo-modal":()=>{H(),uo()},"approve-ritual":(e,t)=>{pk(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{xm(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}oe(t.issueId)},"create-sprint-document":async(e,t)=>{await c$(t.sprintId,t.projectId,()=>{vi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Le(t.documentId)}});function Ul(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function lk(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}rt(e=>{e==="currentProject"&&A()==="rituals"&&Gl()});let _m=0;async function Gl(){const e=K(),t=document.getElementById("rituals-content"),n=++_m;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=F({icon:N.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}Nk(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await Ls();n===_m&&!i&&t&&(t.innerHTML=F({icon:N.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function ck(){Mm(dk),Gl()}function dk(){const e=document.getElementById("rituals-content"),t=Ok(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,yi("rv-sprint-rituals-list",n,"sprint"),yi("rv-close-rituals-list",i,"close"),yi("rv-claim-rituals-list",s,"claim")}function uk(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function pk(e,t){try{await v.approveAttestation(e,t),$("Ritual approved!","success"),await uo(),Hl()}catch(n){k("approve ritual",n)}}function zl(e){return e==="document"?`
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
        `:""}function Vl(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function xm(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${zl(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{mk(s,e,t,i)}),z()}async function mk(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Vl(i);if(a===void 0)return!1;try{await v.completeGateRitual(t,n,s||null,a),$("Ritual completed!","success"),await uo();const o=U$();o&&!o.in_limbo?(H(),$("Limbo cleared! Next sprint is now active.","success")):Hl()}catch(o){k("complete gate ritual",o)}return!1}function fk(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${p(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${zl(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{gk(o,e,t,s,a)}),z()}async function gk(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return $("A note is required for this attestation.","error"),!1;const o=Vl(i);if(o===void 0)return!1;try{await v.attestTicketRitual(t,n,a||null,o),$("Ritual attested!","success"),H(),await Es(n)}catch(r){k("attest ticket ritual",r)}return!1}async function hk(e,t){try{await v.attestTicketRitual(e,t),$("Ritual attested!","success"),await Es(t)}catch(n){k("attest ticket ritual",n)}}async function vk(e,t){try{await v.approveTicketRitual(e,t),$("Ritual approved!","success"),await Es(t)}catch(n){k("approve ticket ritual",n)}}function Im(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{bk(s,e,t,n,i)}),z()}async function bk(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return $("A rejection needs a reason.","error"),!1;try{await v.rejectTicketRitual(t,n,a),$(`"${i}" rejected. The attester has been told why.`,"success"),H(),s&&await s()}catch(o){k("reject ritual",o)}return!1}function yk(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${zl(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{wk(s,e,t,i)}),z()}async function wk(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=Vl(i);if(a===void 0)return!1;try{await v.completeTicketGateRitual(t,n,s||null,a),$("Ritual completed!","success"),H(),await Es(n)}catch(o){k("complete ticket ritual",o)}return!1}ie({"show-create-ritual-modal":(e,t)=>{Fm(t.trigger)},"approve-ticket-ritual":(e,t)=>{vk(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Im(t.ritualId,t.issueId,t.ritualName,()=>Es(t.issueId))},"complete-ticket-ritual":(e,t)=>{yk(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{fk(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{hk(t.ritualId,t.issueId)},"retry-load-rituals":()=>Gl()});function mt(e){if(!e)return"";try{Y.setOptions({breaks:!0,gfm:!0});const n=Y.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return nu.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Ss(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function $k(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(s)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${m(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${p(o)}</strong>${r?` ${Ss(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{kk(c,e,t,n)}),z(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function kk(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,s||null),$(`GATE ritual "${i}" approved!`,"success"),H(),Bt()}catch(a){k("complete gate ritual",a)}}function Ek(e,t,n,i,s,a,o,r){$k(e,t,n,i,s,a,o,r)}function _k(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(s)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${m(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${p(o)}</strong>${r?` ${Ss(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${mt(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{xk(d,e,t,n)}),z(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function xk(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await v.approveTicketRitual(t,n);let r=null;if(s)try{r=await v.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}$(`Review ritual "${i}" approved!`,"success"),Tr(r),H(),Bt()}catch(r){k("approve review ritual",r)}}function Ik(e,t,n,i,s,a,o,r,l){_k(e,t,n,i,s,a,o,r,l)}rt(e=>{e==="currentProject"&&A()==="approvals"&&Bt()});let Wl=[],Kl=0;async function Bt(){if(!T())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++Kl;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=K(),i=n?X().filter(r=>r.id===n):X(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([v.getPendingApprovals(r.id),v.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==Kl)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}Yv(a),Wl=o,Sm()}catch(n){if(t!==Kl)return;e.innerHTML=F({icon:N.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),k("load approvals",n)}}function Sm(){const e=document.getElementById("approvals-list");if(!e)return;const t=Kv(),n=Wl.length>0,i=!Sv();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${N.issues}</div>
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
            `:e.innerHTML=F({icon:N.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Wl.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${p(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const g=f.attestation&&!f.attestation.approved_at,b=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${p(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',w=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${m(f.id)}"
                                            data-project-id="${m(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${m(f.id)}"
                                                data-project-id="${m(d.id)}"
                                                data-ritual-name="${m(f.name)}"
                                                data-ritual-artifact="${m(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${p(f.name)}
                                                    <span class="badge badge-ritual-${m(f.approval_mode)}">${p(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${p(f.prompt)}</span>
                                                ${y}
                                            </div>
                                            ${w}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=d=>d.pending_approvals||[],o=d=>u=>{const f=a(u).filter(d);return f.length>0?{...u,_filteredApprovals:f}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(Yl).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(Yl).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(Yl).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Ek(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=d.dataset;try{await v.approveTicketRitual(f.ritualId,f.issueId),$(`Review ritual "${f.ritualName}" approved!`,"success"),await Bt()}catch(b){d.disabled=!1,u&&(u.disabled=!1),k("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Ik(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Im(u.ritualId,u.issueId,u.ritualName,()=>Bt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await v.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await Bt()}catch(u){d.disabled=!1,k("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{xm(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function Sk(){Tv(),Sm()}function Yl(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${p(i.requested_by_name)}</strong>${i.requested_at?` (${Ss(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${mt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${p(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${Ss(i.rejected_at)})`:""}: ${p(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
                    ${u}
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
                    ${c?"":u}
                </div>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${p(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${p(i.ritual_prompt)}</span>
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
                    <span class="gate-issue-id">${p(e.identifier)}</span>
                    <span class="gate-issue-title">${p(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${p(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}ie({"view-issue-from-modal":(e,t)=>{e.preventDefault(),H(),oe(t.issueId)},"dismiss-approvals-explainer":()=>{Sk()},"retry-load-approvals":()=>Bt()});const mo={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},fo={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Tm=0;function Lm(e){Tm=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Am(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Am(e="",t="",n=""){const i=Tm++,s=Object.keys(mo).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?mo[e]:mo.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${fo[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function Tk(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Am()),go()}function Lk(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),go()}function Ak(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=mo[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${fo[o]}</option>`).join(""),Cm(e),go()}function Cm(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Ts(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function go(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Bm(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw Ts("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Ts("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw Ts(`Duplicate condition: ${r} ${fo[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw Ts(`Please enter a numeric value for ${r} ${fo[l]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(d,10);if(isNaN(f))throw Ts(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=f}else t[u]=d}return go(),Object.keys(t).length>0?t:null}ie({"add-condition-row":()=>{Tk()},"remove-condition-row":(e,t)=>{Lk(Number(t.rowId))},"update-operator-options":(e,t)=>{Ak(Number(t.rowId))},"toggle-value-input":(e,t)=>{Cm(Number(t.rowId))}});let Se=[],Ql=null;const Dm=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];rt((e,t)=>{e==="currentProject"&&(t&&hv(t),Dm.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Qk(t||""))});const ho={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Mm(e){Ql=e}function X(){return Se}function Ck(e){Se=e}function bi(e){const t=Se.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return ho[n]||ho.fibonacci}function un(e,t){if(e==null)return"No estimate";const i=bi(t).find(s=>s.value===e);return i?i.label:`${e} points`}function vo(e,t){return e==null||e===0?!1:!bi(t).some(i=>i.value===e)}function Bk(e){const t=Se.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(ho[n]||ho.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function ft(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await v.getProjects(e);if(((n=T())==null?void 0:n.id)!==e)return;Se=i,Rm(),jm()}catch(i){k("load projects",i)}}function jm(){const e=K();if(e&&Se.some(i=>i.id===e))return;const t=Zl();if(t&&Se.some(i=>i.id===t)){lt(t);return}const n=iu();if(n&&Se.some(i=>i.id===n)){lt(n);return}Se.length>0&&lt(Se[0].id)}function Rm(){const e='<option value="">All Projects</option>'+Se.map(a=>`<option value="${a.id}">${p(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+Se.map(a=>`<option value="${a.id}">${p(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=K();Dm.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function Pm(){return iu()}function Pn(){const e=document.getElementById("projects-list");if(Se.length===0){e.innerHTML=F({icon:N.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Se.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${m(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ee(t.color)}20; color: ${ee(t.color)}">
                    ${p(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${p(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${m(t.id)}" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${p(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function Dk(e){lt(e),q("issues")}function qm(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,z()}async function Mk(e){e.preventDefault();const t=T();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(t.id,n),await ft(),Pn(),H(),$("Project created!","success")}catch(i){k("create project",i)}return!1}async function jk(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await ft(),Pn(),H(),$("Project updated!","success")}catch(i){k("update project",i)}return!1}async function Rk(e){const t=Se.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await ft(),Pn(),H(),$("Project deleted","success")}catch(n){k("delete project",n)}}let je=null;function Nm(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function Pk(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await v.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(je!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${m(a.id)}">${p(a.identifier)} ${p(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function Om(e){je=e,Se.length===0&&await ft();const t=Se.find(n=>n.id===e);if(!t){$("Project not found","error"),q("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,Nm("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),Nm("ps-require-epic-on-close",t.require_epic_on_close===!0),Pk(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Hm("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Hm(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Kt||Kt.length===0)&&Ls()}function qk(){je=null,Kt=[]}function Nk(e){je=e}function Ok(){return Kt}async function Hk(){if(!je)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(je,t),await ft(),$("Settings saved","success");const n=Se.find(i=>i.id===je);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){k("save project settings",n)}}async function Fk(){if(!je)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await v.updateProject(je,n),await ft(),$("Settings saved","success")}catch(o){k("save settings",o)}}let Kt=[];async function Ls(){if(!je)return!1;try{return Kt=await v.getRituals(je),Uk(),typeof Ql=="function"&&Ql(),!0}catch(e){return k("load rituals",e),!1}}function Uk(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Kt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Kt.filter(i=>i.trigger==="ticket_close"),n=Kt.filter(i=>i.trigger==="ticket_claim");yi("ps-sprint-rituals-list",e,"sprint"),yi("ps-close-rituals-list",t,"close"),yi("ps-claim-rituals-list",n,"claim")}function yi(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>m(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${p(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${p(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${mt(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${p(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
          ${a.artifact?`<span class="badge badge-artifact">${p(a.artifact)}</span>`:""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${m(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${m(a.id)}" data-ritual-name="${m(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function Fm(e){if(!je)return;let t=[];try{t=await v.getRitualGroups(je)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${m(n.id)}" data-mode="${m(n.selection_mode)}">${p(n.name)} (${p(n.selection_mode)})</option>`).join("")}
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
        ${Lm(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,z()}function Gk(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function zk(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Um(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(je,{name:t,selection_mode:n})).id}return e.value||null}async function Vk(e){var s;e.preventDefault();let t;try{t=Bm()}catch{return!1}let n;try{n=await Um()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await v.createRitual(je,i),await Ls(),H(),$("Ritual created!","success")}catch(a){k("create ritual",a)}return!1}async function Wk(e){const t=Kt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(je)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${m(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${m(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${p(t.prompt)}</textarea>
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
          ${n.map(o=>`<option value="${m(o.id)}" data-mode="${m(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${p(o.name)} (${p(o.selection_mode)})</option>`).join("")}
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
        ${Lm(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,z()}async function Kk(e,t){var a;e.preventDefault();let n;try{n=Bm()}catch{return!1}let i;try{i=await Um()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await v.updateRitual(t,s),await Ls(),H(),$("Ritual updated!","success")}catch(o){k("update ritual",o)}return!1}async function Yk(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await Ls(),$("Ritual deleted","success")}catch(n){k("delete ritual",n)}}ie({"view-project":(e,t)=>{Dk(t.projectId)},"view-project-settings":(e,t)=>{Om(t.projectId)},"create-project":e=>{Mk(e)},"update-project":(e,t)=>{jk(e,t.projectId)},"confirm-delete-project":(e,t)=>{Rk(t.projectId)},"edit-project-ritual":(e,t)=>{Wk(t.ritualId)},"delete-project-ritual":(e,t)=>{Yk(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Vk(e)},"update-project-ritual":(e,t)=>{Kk(e,t.ritualId)},"toggle-ritual-conditions":()=>{Gk()},"ritual-group-change":()=>{zk()}});function Zl(){const t=new URLSearchParams(window.location.search).get("project");return t||Pm()}function Qk(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Xl={},Gm=new Map;let Jl=null,ec=null,tc=null,nc=null,ic=null,sc=null,ac=null,zm=!1;function Zk(e){Object.assign(Xl,e)}function Xk({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(Jl=e),t&&(ec=t),n&&(tc=n),i&&(nc=i),s&&(ic=s),a&&(sc=a),o&&(ac=o)}function Vm(){return Object.keys(Xl)}const Jk=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],Wm={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"};function As(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function Km(){Jl&&Jl()}function q(e,t=!0,{transition:n=!1}={}){if(t&&pn(),Ji(e),t){let a;const o=Zl();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:Jk.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}As(e),Km();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Xl[e];s&&s(),t&&window.scrollTo(0,0)}function Ym(){var s;Ji(null);const e=window.location.pathname.split("/").filter(Boolean),t={"gate-approvals":"approvals"},n=e.length===0?"my-issues":t[e[0]]||e[0],i=e.length<=1&&Vm().includes(n);document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden")),i?((s=document.getElementById(`${n}-view`))==null||s.classList.remove("hidden"),As(n)):As(Wm[e[0]]||null)}function oc(){var i;const t=window.location.pathname.split("/").filter(Boolean);nc&&nc(),A()||Ji("my-issues");let n="my-issues";if(t.length===0||t[0]==="")q("my-issues",!1);else if(ec&&ec(t)){const s=Wm[t[0]];s&&As(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),Vm().includes(n)?q(n,!1):(n="my-issues",q("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function pn(){Gm.set(window.location.href,window.scrollY)}function rc(e){pn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),ic&&ic(e)}function Qm(e){pn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),sc&&sc(e)}function Zm(){const e=Gm.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{ac&&ac(),window.scrollTo(0,e)})}function Xm(){zm||(zm=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&tc&&tc(e.state)){Zm();return}(t=e.state)!=null&&t.view?q(e.state.view,!1):oc(),Zm()}))}let Yt=0,wi=!1,Cs=null,bo=null,Bs=0;const qn=new Map;function yo(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Yt===0&&!wi),e.textContent=wi?"Stopped":"Offline",e.title=wi?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Ke(e,t){return qn.has(e)||qn.set(e,new Set),qn.get(e).add(t),()=>{var n;return(n=qn.get(e))==null?void 0:n.delete(t)}}function eE(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const tE=1e3;function wo(){bo&&(clearTimeout(bo),bo=null)}const nE="chaotic",lc=4001,iE=4003,sE="chaotic.bearer.";function aE(e){return[nE,sE+e]}function Jm(e,{isReconnect:t=!1}={}){Cs&&(clearTimeout(Cs),Cs=null),wo();const n=Xv();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Mr(null)),!t&&(Yt>0||wi)&&(Yt=0,wi=!1,yo());const i=v.getToken();if(!i)return;const s=++Bs,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,aE(i));Mr(r);let l=!1;const c=()=>{if(l||s!==Bs)return;l=!0,wo();const d=Yt>0;d&&$("Live updates reconnected","success"),Yt=0,yo(),d&&cc({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Bs&&(console.log("WebSocket connected"),wo(),bo=setTimeout(c,tE))},r.onmessage=d=>{if(s!==Bs)return;c();let u;try{u=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}cc(u)},r.onclose=d=>{if(s!==Bs)return;console.log("WebSocket disconnected"),wo();const u=d==null?void 0:d.code;if(u===lc||u===iE){Mr(null),Yt=0;const g=u===lc&&kr()===i;wi=!g,yo();let b="forbidden";u===lc&&(b=g?"unauthorized":"superseded"),cc({type:b,entity:"connection",data:{code:u,teamId:e}});return}Yt++,Yt===1&&$("Live updates disconnected. Reconnecting...","warning"),yo();const f=eE(Yt-1);Cs=setTimeout(()=>{Cs=null,T()&&T().id===e&&Jm(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function cc(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=qn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=qn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=qn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const oE={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let $i=0,Dt=!1,$e=null,mn=null;const Ds=new Set,Mt=new Map,gt=new Map;function ef(e){Mt.get(e)===null&&Mt.set(e,$i)}function dc(e){const t=gt.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=$i)}function rE(e){return e.filter(t=>!Mt.has(t.id)).map(t=>{const n=gt.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Dt&&gt.has(t.id)&&t.id!==$e))}function lE(e){for(const[t,n]of Mt)n!==null&&e>n&&Mt.delete(t);for(const[t,n]of gt)n.confirmedAfter!==null&&e>n.confirmedAfter&&gt.delete(t)}function cE(e,t){t!=null&&t.id&&(e==="archived"?(Mt.has(t.id)||Mt.set(t.id,null),ef(t.id)):e==="read"&&dc(t.id))}async function ki(){const e=T();if(e){try{const t=await v.getInboxUnreadCount(e.id);ns(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Ms()}}function Ms(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=wa();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function js({focusFirst:e=!1,background:t=!1}={}){const n=T();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++$i;t||(mn={focusFirst:e||!!(mn!=null&&mn.focusFirst)},$e=null,dE(i));try{const a=await v.getInbox(n.id,{unread:Dt,limit:100});if(s!==$i)return;const o=new Set(Mt.keys());lE(s);const r=rE(a||[]),l=mn;mn=null,l?(Gt(r),Ps(),l.focusFirst&&!tt()&&mE()):uE(r,o)}catch(a){if(s!==$i)return;mn?(mn=null,i.innerHTML=F({icon:N.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),k("load inbox",a)):console.error("Failed to refresh inbox:",a)}ki()}function dE(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function $o(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function tf(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function nf(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function sf(e,t){if(!e)return;const n=$o(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=tf(n||t)),i==null||i.focus({preventScroll:!0})}function uE(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ye(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=nf(),c=window.scrollY,d=n.scrollTop;let u=e;if($e&&!e.some(b=>b.id===$e)){const b=i.find(y=>y.id===$e);if(b&&Dt&&!t.has($e)){u=[...e];const y=u.findIndex(w=>w.created_at<b.created_at);u.splice(y===-1?u.length:y,0,b)}else $e=null}Gt(u),Ps();let f=-1;o&&(f=u.findIndex(b=>b.id===o),f===-1&&u.length&&(f=Math.min(r,u.length-1))),f>=0?Rs(f,{focus:!1}):ya(-1);const g=f>=0?n.querySelectorAll(".inbox-row")[f]:null;sf(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function pE(e,t){if(!(t!=null&&t.id))return!1;const n=ye().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function Ei(e){const t=ye();for(const n of new Set(e)){const i=$o(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?nf():null,o=document.createElement("template");o.innerHTML=cf(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),sf(a,r)}}function Rs(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){ya(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),ya(i),t&&tf(n[i]).focus({preventScroll:!0})}function mE(){Rs(0)}async function uc(e){const t=ye(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;$e===e&&($e=null),Mt.set(e,null),Gt(t.filter(a=>a.id!==e)),s&&ns(Math.max(0,wa()-1)),Ps(),Ms(),Rs(n);try{await v.archiveInbox(e),ef(e)}catch(a){Mt.delete(e),console.error("Failed to archive inbox entry:",a)}}function af(e){var s,a;const n=ye().findIndex(o=>o.id===e);if(n===-1)return;const i=$e;$e=i===e?null:e,$e===e&&of(e),Ei([i,e]),Rs(n),$e===e&&((a=(s=$o(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function of(e){const t=ye(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,gt.set(e,{readAt:i,confirmedAfter:null}),Gt([...t]),ns(Math.max(0,wa()-1)),Ms(),v.markInboxRead(e).then(()=>dc(e),s=>{var o;((o=gt.get(e))==null?void 0:o.readAt)===i&&gt.delete(e);const a=ye().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Gt([...ye()]),Ei([e])),ki(),k("mark inbox entry read",s)})}function fE(e){var i;const n=ye().findIndex(s=>s.id===e);if(n!==-1){if(of(e),Dt)$e===e&&($e=null),Gt(ye().filter(s=>s.id!==e)),Ps(),Rs(n);else if(Ei([e]),!document.activeElement||document.activeElement===document.body){const s=$o(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function gE(){if($e===null)return!1;const e=$e;return $e=null,Ei([e]),!0}function rf(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function hE(e){if(Ds.has(e))return;const t=ye().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";Ds.add(e),rf(e,!0);try{await v.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){Ds.delete(e),rf(e,!1),k(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}Ds.delete(e),uc(e)}function vE(){lf(!Dt)}function lf(e){e!==Dt&&(Dt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Dt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),js({focusFirst:!0}))}const bE='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',yE='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function wE(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function cf(e){const t=!e.read_at,n=e.id===$e,i=oE[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${p(wE(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${m(e.kind)}">${p(i)}</span>
                        ${s?`<span class="inbox-row-source">${p(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${p(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${p(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?$E(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${bE}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${yE}</button>
                </span>
                <span class="inbox-row-time">${p(Ss(e.created_at))}</span>
            </div>
        </div>
    `}function $E(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${p(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${Ds.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${p(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${a?`<div class="inbox-expanded-source">from ${p(a)}</div>`:""}
            ${e.body?`<div class="inbox-expanded-body">${p(e.body)}</div>`:""}
            <div class="inbox-action-bar">${r}</div>
        </div>
    `}function Ps(){const e=document.getElementById("inbox-list");if(!e)return;const t=ye();if(t.length===0){e.innerHTML=F({icon:N.inbox,heading:Dt?"No unread items":"Inbox zero",description:Dt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=EE(t)}function kE(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function EE(e){const t=[];for(const n of e){const i=kE(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${p(n.label)}</h3>
            ${n.entries.map(s=>cf(s)).join("")}
        </section>
    `).join("")}async function _E(e){var s;const t=ye().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();gt.set(e,{readAt:n,confirmedAfter:null});try{await v.markInboxRead(e)}catch(a){((s=gt.get(e))==null?void 0:s.readAt)===n&&gt.delete(e);const o=ye().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Gt([...ye()]),Ei([e])),console.error("Failed to mark inbox entry read:",a);return}dc(e);const i=ye().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Gt([...ye()]),ns(Math.max(0,wa()-1)),Ms(),Ei([e])):ki()}async function xE(){const e=T();if(e)try{await v.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ye())n.read_at||gt.set(n.id,{readAt:t,confirmedAfter:$i});Gt(ye().map(n=>({...n,read_at:n.read_at||t}))),ns(0),Ms(),Ps()}catch(t){k("mark all inbox entries read",t)}}function IE(e){e.entryId&&_E(e.entryId),e.issueId?oe(e.issueId):e.documentId&&Le(e.documentId)}function SE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&uc(e.dataset.entryId)}function TE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&af(e.dataset.entryId)}const LE='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function AE(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(LE);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function CE(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}ie({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&CE((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||AE(e.target,n)||(e.preventDefault(),t.entryId&&af(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),IE(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&hE(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&uc(t.entryId)},"toggle-inbox-unread-filter":()=>vE(),"set-inbox-filter":(e,t)=>lf(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&fE(t.entryId)},"mark-all-inbox-read":()=>xE(),"retry-load-inbox":()=>js({focusFirst:!0})});let qs=[],Nn=[],pc=[],mc=[];function fc(){return qs}function df(e){qs=Array.isArray(e)?e:[],uf()}function fn(){return Nn}async function ko(e=null){try{qs=await(e||v.getMyTeams()),uf()}catch(t){k("load teams",t)}}function uf(){const e=document.getElementById("team-list");qs.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=qs.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${p(t.name)}</button>
        `).join("")}async function Eo(e,t=!1,{seed:n=null}={}){On=null,Qn(e),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Jm(e.id),n&&DE(n)){let a=!1;try{ME(n),On=e.id,t?oc():q(A()||"my-issues"),a=!0}catch(o){console.error("Failed to paint from the boot cache:",o),On=null}if(a){pf(e).catch(o=>console.error("Failed to refresh team data:",o));return}}await pf(e),t?oc():q(A()||"my-issues")}let On=null;function BE(){var e;return On&&On===((e=T())==null?void 0:e.id)?On:null}async function pf(e){var t;await Promise.all([ft(),JE(),RE(),yw(),ki()]),((t=T())==null?void 0:t.id)===e.id&&(On=e.id)}function DE(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function ME(e){Ck(Array.isArray(e.projects)?e.projects:[]),Rm(),jm(),ts(Array.isArray(e.labels)?e.labels:[]),Nn=Array.isArray(e.members)?e.members:[],vw(e.agents),ss(fn,Dn),Xn(),pb(e.issues)}function mf(){document.getElementById("team-dropdown").classList.toggle("hidden")}function jE(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function RE(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await v.getTeamMembers(e);if(((n=T())==null?void 0:n.id)!==e)return;Nn=i,ss(fn,Dn),Xn()}catch(i){console.error("Failed to load team members:",i),k("load team members",i)}}function gc(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let hc=0;async function vc(){if(!T())return;const e=++hc,t=document.getElementById("team-members-list");t&&(t.innerHTML=gc());try{const n=await v.getTeamMembers(T().id);if(e!==hc)return;Nn=n,ss(fn,Dn),Xn(),PE()}catch(n){if(e!==hc)return;t&&(t.innerHTML=F({icon:N.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),Nn=[],ff(),k("load team members",n)}}function _o(){var n;const e=(n=be())==null?void 0:n.id,t=Nn.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function ff(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!_o())}function PE(){const e=document.getElementById("team-members-list"),t=_o();ff(),e.innerHTML=Nn.map(n=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(n.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${p(n.user_name||"Unknown")}</span>
                    <span class="member-email">${p(n.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${n.role}</span>
                ${t&&n.user_id!==be().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${m(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let bc=0;async function xo(){if(!T())return;const e=++bc,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=gc());try{const n=await v.getTeamInvitations(T().id);if(e!==bc)return;pc=n,qE()}catch(n){if(e!==bc)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function qE(){const e=document.getElementById("team-invitations-list");if(pc.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=_o();e.innerHTML=pc.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${p(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${p(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${m(n.id)}" title="For an invitee whose verification email never arrives">Code for invitee</button>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${m(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let yc=0;async function gf(){if(!T())return;const e=++yc,t=document.getElementById("team-agents-list");t&&(t.innerHTML=gc());try{const n=await v.getTeamAgents(T().id);if(e!==yc)return;mc=n,NE()}catch(n){if(e!==yc)return;t&&(t.innerHTML=F({icon:N.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),k("load team agents",n)}}function NE(){const e=document.getElementById("team-agents-list");if(e){if(mc.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=mc.map(t=>{const n=p(t.name),i=p(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${p(s)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${i} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function hf(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,z()}async function OE(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await v.createInvitation(T().id,t,n);if(await xo(),i&&i.accept_url)return UE(t,FE(i.accept_url),i.email_queued===!0),!1;H(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){HE(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):k("send invitation",i)}return!1}function HE(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function vf(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function FE(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!vf(n.hostname)||vf(i.hostname)?e:i.origin+n.pathname}function UE(e,t,n=!1){var a;const i=p(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${p(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,tt()||z(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),bf()}function bf(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function GE(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function zE(e){let t;try{t=await v.issueInvitationVerificationCode(T().id,e)}catch(n){k("get a verification code",n);return}WE(t)}function VE(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function WE(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=VE(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">Send this code only through a channel you already trust for the invitee, never to whoever asked you for it. Anyone who saw the link can sign up with their address and ask, and chooses the name shown below.</p>
            <p>The account it is for:</p>
            <ul class="invitation-code-account">
                <li>Name: <strong>${p(t.name||"")}</strong></li>
                <li>Email: ${p(t.email||"")}</li>
                <li>Signed up: ${p(n)} (${p(i)})</li>
                <li>Already in a team: ${t.member_of_any_team?"yes":"no"}</li>
            </ul>
            <p class="warning-text">A signup shortly after you sent the link fits both the invitee and someone who saw the link: confirm with the invitee directly. One that predates the invitation was not made from the link, but check that the invitee recognises it. If they don't, don't give out the code: cancel the invitation.</p>
            <div class="api-key-display">
                <code id="invitation-code">${p((e==null?void 0:e.code)||"")}</code>
            </div>
            <p>Expires at ${p(s)}. It lets that account accept this invitation only: they enter it on the invitation page, or run <code>chaotic team accept-invite &lt;link&gt; --code &lt;code&gt;</code>. You won't be able to see it again.</p>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,tt()||z(),bf("invitation-code")}async function KE(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(T().id,e),await vc(),$("Member removed!","success")}catch(t){k("remove member",t)}}async function YE(e){try{await v.deleteInvitation(T().id,e),await xo(),$("Invitation canceled!","success")}catch(t){k("cancel invitation",t)}}function yf(){mf(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,z()}function QE(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
                <textarea id="team-description">${p(T().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,z())}async function ZE(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await ko(),await Eo(n),H(),$("Team created!","success")}catch(n){k("create team",n)}return!1}async function XE(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(T().id,t);Qn(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await ko(),H(),$("Team updated!","success")}catch(n){k("update team",n)}return!1}async function JE(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await v.getLabels(e);if(((n=T())==null?void 0:n.id)!==e)return;ts(i)}catch(i){console.error("Failed to load labels:",i),k("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ie({"select-team":(e,t)=>{Eo(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{KE(t.userId)},"delete-invitation":(e,t)=>{YE(t.invitationId)},"issue-invitation-code":(e,t)=>{zE(t.invitationId)},"retry-load-team-invitations":()=>{xo()},"retry-load-team-members":()=>{vc()},"retry-load-team-agents":()=>{gf()},"invite-member":e=>{OE(e)},"copy-invite-link":()=>{GE()},"dismiss-invite-link":()=>{H()},"create-team":e=>{ZE(e)},"update-team":e=>{XE(e)}});let jt=null,Qt=0,_i=null,xi=null,Ns=null,wc=!1;function e_(){return vv()}function wf(){bv()}function $f(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function t_(){jt||(jt=document.createElement("div"),jt.id="onboarding-overlay",jt.className="onboarding-overlay",document.getElementById("app").appendChild(jt))}function Os(){if(!jt)return;const e=wc?Ef():kf(),t=e[Qt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Qt?" active":""}${s<Qt?" completed":""}"></span>`).join("");jt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function kf(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=$f(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=$f(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&_i&&(e.textContent=`${_i.name} (${_i.key})`),t&&xi&&(t.textContent=`${xi.name} (${xi.key})`),n&&Ns&&(n.textContent=`${Ns.identifier} - ${Ns.title}`)}}]}function Ef(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function $c(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function kc(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ii(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function n_(){const e=wc?Ef():kf();Qt<e.length-1&&(Qt++,Os())}function i_(){wf(),xf(),Hn()}function s_(){wf(),xf(),Hn()}async function a_(e){e.preventDefault(),kc("onboarding-team-error"),Ii("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{_i=await v.createTeam({name:t,key:n}),Qt++,Os()}catch(i){$c("onboarding-team-error",i.message||"Failed to create team"),Ii("onboarding-team-submit",!1)}}async function o_(e){e.preventDefault(),kc("onboarding-project-error"),Ii("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{xi=await v.createProject(_i.id,{name:t,key:n}),Qt++,Os()}catch(i){$c("onboarding-project-error",i.message||"Failed to create project"),Ii("onboarding-project-submit",!1)}}async function r_(e){e.preventDefault(),kc("onboarding-issue-error"),Ii("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Ns=await v.createIssue(xi.id,{title:t}),Qt++,Os()}catch(n){$c("onboarding-issue-error",n.message||"Failed to create issue"),Ii("onboarding-issue-submit",!1)}}function _f(e=!1){wc=e,Qt=0,_i=null,xi=null,Ns=null,t_(),Os()}function xf(){jt&&(jt.remove(),jt=null)}function If(){yv(),_f(!0)}ie({"onboarding-next":e=>{e.preventDefault(),n_()},"onboarding-skip":e=>{e.preventDefault(),i_()},"onboarding-finish":e=>{e.preventDefault(),s_()},"onboarding-create-team":e=>{a_(e)},"onboarding-create-project":e=>{o_(e)},"onboarding-create-issue":e=>{r_(e)}});const Sf="/oauth/consent/";function l_(e){if(!e||!e.startsWith(Sf))return null;const t=e.slice(Sf.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function c_(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function d_(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function u_(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Tf={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function Io(e){const t=Tf[e.trust]||Tf.unverified,n=e.host?` · ${p(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${p(t)}${n}</span>`}function p_(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${p(n.name)}</option>`).join("")}function m_(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${p(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Lf(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${p(i.name+a)}</option>`)}return n.join("")}function Af(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${p(t.name)} <span class="oauth-muted">${p(t.key)}</span>
        </label>`).join("")}function f_(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${p(t.name)}${p(i)}
        </label>`}).join("")}function g_(e,t){const n=p(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${Io(t.client)}</p>
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
        </div>`}function h_(e,t){if(t.acts_as==="person"){g_(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=p(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${p(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${Io(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${p(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${p_(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Lf(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Af(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${f_(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Ec(e,t)}function Ec(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=m_(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function v_(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function b_(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Hs(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${p(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function y_(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{v.logout(),t()})}function w_(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=Lf(d,null),e.querySelector("#oauth-projects").innerHTML=Af(d),Ec(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Ec(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await v.approveOAuthRequest(t,v_(e)):await v.denyOAuthRequest(t);if(!c_(u.redirect)){Hs(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){Hs(e,"It has expired, was already answered, or belongs to someone else.");return}b_(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function $_(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=d_();u_(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await v.getOAuthRequest(e)}catch(a){a&&a.status===404?Hs(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?y_(i,n):a&&a.status===403?Hs(i,"Only a person signed in to Chaotic can approve an app."):Hs(i,a&&a.message||"Something went wrong");return}h_(i,s),w_(i,e,s,t)}const _c="/invite/",Fs="/invite",xc="chaotic.inviteToken",Cf="invite-auth-notice";let Ic=null;const k_="This invitation is no longer valid.",E_={owner:"an owner",admin:"an admin",member:"a member"};function __(e){if(!e||!e.startsWith(_c))return null;const t=e.slice(_c.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function Bf(){const{pathname:e}=window.location,t=__(e);if(t){Ic=t;try{sessionStorage.setItem(xc,t)}catch{}return history.replaceState(null,"",Fs),t}if(!Df(e))return null;let n=null;try{n=sessionStorage.getItem(xc)}catch{}const i=n||Ic;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function Df(e){return e===Fs||e===`${Fs}/`}function Mf(e){return Df(e)||!!(e&&e.startsWith(_c))}function Sc(){Ic=null;try{sessionStorage.removeItem(xc)}catch{}}function x_(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function I_(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Tc(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function jf(){const e=I_();return So(),Tc(e),e}function S_(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),So()}function So(){var e;(e=document.getElementById(Cf))==null||e.remove()}function Lc(e){const t=e.invited_by_name?`<strong>${p(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=E_[e.role]||`a ${p(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${p(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${p(e.email_hint)}</strong>${T_(e)}</p>`}function T_(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${p(n)}`}const L_="Ask whoever invited you to send a new invitation.",A_="Reload the page to try again.";function Ac(e,t=k_,n=L_){e.innerHTML=`
        <div class="invite-page">
            <h1>${p(t)}</h1>
            <p class="invite-muted">${p(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function C_(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Rf(){window.location.pathname!==Fs&&history.replaceState(null,"",Fs),C_(jf())}function B_(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Lc(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function D_(e,t,n){const i=x_(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${p(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Lc(t)}
                ${s}
                <p class="invite-warning" role="alert">This invitation is for a different email address.
                    Only <strong>${p(t.email_hint)}</strong> can accept it. Sign out, then sign in
                    or create an account with that address.</p>
                <div class="invite-actions">
                    <a class="btn btn-secondary" href="/">Not now</a>
                    <button type="button" id="invite-sign-out" class="btn btn-primary">Sign out</button>
                </div>
            </div>`;return}e.innerHTML=`
        <div class="invite-page">
            ${Lc(t)}
            ${s}
            <p id="invite-error" class="invite-warning hidden" role="alert"></p>
            <div id="invite-verify" class="invite-verify hidden">
                <p>Verify your email address to continue: we will email a six-digit code to
                    <strong>${p(n.email)}</strong>.</p>
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
        </div>`}function M_(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function j_(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await v.requestEmailVerification(),f=M_(u.expires_at);c(`We sent a code to ${u.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(u){const f=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(f==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await v.confirmEmailVerification(f)}catch(b){r.disabled=!1;const y=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():y==="email_already_verified"?t():(c(b&&b.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function R_(e,t){So();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=Cf,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${p(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${p(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),So(),t()})}function To(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function P_(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=jf();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await v.getInvitation(e)}catch(f){f&&f.status===404?(Sc(),Ac(a)):Ac(a,f&&f.message||"Something went wrong.",A_);return}if(!t){B_(a,o);const f=g=>{R_(o,()=>Tc(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}D_(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var b,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await v.acceptInvitation(e):await v.acceptInvitation(e,f)}catch(w){l=!1,r.disabled=!1;const S=w&&w.detail&&w.detail.error_code;if(f!==void 0&&(S==="invalid_verification_code"||S==="invitation_code_expired"||w&&w.status===429)){To(a,w&&w.message||"That code did not work."),(y=(b=a.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||y.call(b);return}w&&w.status===401?s():w&&(w.status===404||w.status===400)?(Sc(),Ac(a)):w&&w.status===403&&w.detail&&w.detail.error_code==="email_unverified"?(To(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):w&&w.status===403?To(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):To(a,w&&w.message||"Something went wrong");return}Sc(),Pf(a,o);try{await i(g.team_id,o.team_name)}catch(w){console.error("Joined the team but could not open it:",w),Tc(a),Pf(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",f=>{f.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),j_(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Pf(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${p(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${p(t.team_name)}</a>
            </div>
        </div>`}function Cc(e){return P_(e,{user:be(),showAuth:t=>{zs(),t==="signup"?Ff():Hf()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),S_(),await Hn({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{v.logout(),It(null),Qn(null),Cc(e)}})}async function qf(){const e=Bf();if(e){await Cc(e);return}if(Mf(window.location.pathname)){Rf();return}zs()}async function Hn({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=l_(window.location.pathname);if(i){await $_(i);return}const s=Bf();if(s){await Cc(s);return}if(Mf(window.location.pathname)){Rf();return}z_(),Ym(),Lo(),F_();const a=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(a){await q_(n,a,t);return}await ko(t);const o=fc();if(o.length===0&&!e_()){_f();return}o.length===0&&Ji("my-issues");try{if(o.length>0){const c=e&&o.find(d=>d.id===e)||o[0];await Eo(c,!0)}}finally{Xm()}}async function q_(e,t,n){df(e.teams);try{await Eo(t,!0,{seed:e})}finally{Xm()}Promise.resolve(n||ko().then(fc)).then(async i=>{var a;if(!Array.isArray(i))return;df(i);const s=i.find(o=>o.id===t.id);if(!s){await O_(),window.location.reload();return}if(((a=T())==null?void 0:a.id)===s.id&&s.name!==T().name){Qn(s);const o=document.getElementById("current-team-name");o&&(o.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const N_=2e3;let Si=null,Nf=!1,Of=!1;function O_(){return Of=!0,clearTimeout(Si),Si=null,Ir()}function Bc(){if(clearTimeout(Si),Si=null,Of)return Promise.resolve();const e=be(),t=T();return!(e!=null&&e.id)||!(t!=null&&t.id)||uu(kr())!==e.id||BE()!==t.id?Promise.resolve():Mv(e.id,{user:e,teams:fc(),teamId:t.id,projects:X(),labels:Br(),members:fn(),agents:Dn(),issues:ub({maxQueries:3})})}function H_(){clearTimeout(Si),Si=setTimeout(Bc,N_)}function F_(){Nf||(Nf=!0,ab(H_),document.addEventListener("visibilitychange",U_),window.addEventListener("pagehide",G_))}function U_(){document.visibilityState==="hidden"&&Bc()}function G_(){Bc()}let Ti=null,Us=null,wt=null,$t=null;function Gs(){Ti||(Ti=document.getElementById("auth-screen"),Us=document.getElementById("main-screen"),wt=document.getElementById("login-form"),$t=document.getElementById("signup-form"))}function zs(){Gs(),Ti&&Ti.classList.remove("hidden"),Us&&Us.classList.add("hidden")}function z_(){Gs(),Ti&&Ti.classList.add("hidden"),Us&&Us.classList.remove("hidden")}function Hf(){Gs(),wt&&wt.classList.remove("hidden"),$t&&$t.classList.add("hidden")}function Ff(){Gs(),wt&&wt.classList.add("hidden"),$t&&$t.classList.remove("hidden")}async function V_(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),It(await v.getMe()),await Hn(),$("Welcome back!","success")}catch(i){k("log in",i)}return!1}async function W_(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await v.signup(t,n,i),await v.login(n,i),It(await v.getMe()),await Hn(),$("Account created successfully!","success")}catch(s){k("sign up",s)}return!1}function Uf(){v.logout(),It(null),Qn(null),zs(),$("Signed out","success")}function K_(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function Lo(){var i;const e=be();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Ar(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?K_(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Y_(){Gs();const e=wt==null?void 0:wt.querySelector("form");e&&e.addEventListener("submit",s=>V_(s));const t=$t==null?void 0:$t.querySelector("form");t&&t.addEventListener("submit",s=>W_(s));const n=wt==null?void 0:wt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Ff()});const i=$t==null?void 0:$t.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Hf()})}let Dc=[];async function Mc(){try{Dc=await v.getApiKeys(),Q_()}catch(e){k("load API keys",e)}}function Q_(){const e=document.getElementById("api-keys-list");if(e){if(Dc.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Dc.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${p(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${p(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${nt(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${nt(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${m(t.id)}" data-key-name="${m(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function Z_(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,z()}async function X_(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);H(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,z()}catch(n){k("create API key",n)}return!1}async function J_(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function ex(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),$("API key revoked","success"),await Mc()}catch(n){k("revoke API key",n)}}ie({"create-api-key":e=>{X_(e)},"copy-api-key":()=>{J_()},"dismiss-api-key-modal":()=>{H(),Mc()},"revoke-api-key":(e,t)=>{ex(t.keyId,t.keyName)}});let jc=[];async function Gf(){try{jc=await v.getConnections(),nx()}catch(e){k("load connected apps",e)}}function Rc(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function tx(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function nx(){const e=document.getElementById("connected-apps-list");if(e){if(jc.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=jc.map(t=>t.acts_as==="person"?ix(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${p(Rc(t))} ${Io(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${p(t.agent?t.agent.name:"an agent")}</span>
                    <span>${p(tx(t))}</span>
                    <span>policy ${p(t.policy)}</span>
                    <span class="api-key-date">Connected ${nt(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${nt(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${p(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(Rc(t))}">Disconnect</button>
        </div>
    `).join("")}}function ix(e){const n=`${e.device_name||"A device"} · ${Rc(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${p(n)} ${Io(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${nt(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${nt(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function sx(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await v.revokeConnection(e),$("App disconnected","success"),await Gf()}catch(n){k("disconnect app",n)}}ie({"revoke-connection":(e,t)=>{sx(t.connectionId,t.connectionName)}});let Pc=[];async function zf(){try{Pc=await v.getPushDevices(),ax()}catch(e){k("load push devices",e)}}const Vf={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function Wf(e){return e.label||e.platform||"Unnamed device"}function ax(){const e=document.getElementById("push-devices-list");if(e){if(Pc.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Pc.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${p(Wf(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${p(t.platform)}</span>`:""}
                    <span>via ${p(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${nt(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${nt(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${p(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Vf[t.status]?`<span class="push-device-status">${p(Vf[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(Wf(t))}">Remove</button>
        </div>
    `).join("")}}async function ox(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await v.deletePushDevice(e),$("Device removed","success"),await zf()}catch(n){k("remove push device",n)}}ie({"remove-push-device":(e,t)=>{ox(t.installationId,t.deviceName)}});let Ao=!1,Zt=0,gn=[],Co=[];function rx(e){Co=e,gn=[...e]}function hn(){return Ao}function lx(){if(Ao)return;Ao=!0,Zt=0,gn=[...Co];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Bo()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>cx(n.target.value)),t.addEventListener("keydown",ux),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&dx(Number(i.dataset.commandIndex))}),Vs(),requestAnimationFrame(()=>t.focus())}function Bo(){Ao=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function cx(e){const t=e.toLowerCase().trim();t?gn=Co.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):gn=[...Co],Zt=0,Vs()}function Vs(){const e=document.getElementById("command-results");if(!e)return;if(gn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};gn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Zt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function dx(e){Zt=e,Vs()}function Kf(e){const t=gn[e];t&&(Bo(),t.action())}function ux(e){switch(e.key){case"ArrowDown":e.preventDefault(),Zt=Math.min(Zt+1,gn.length-1),Vs();break;case"ArrowUp":e.preventDefault(),Zt=Math.max(Zt-1,0),Vs();break;case"Enter":e.preventDefault(),Kf(Zt);break;case"Escape":e.preventDefault(),Bo();break}}ie({"execute-command":(e,t)=>{Kf(Number(t.commandIndex))}});const px=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function mx(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${p(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${p(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function fx(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${p(e.title)}</h4>
        ${e.shortcuts.map(mx).join("")}
    </div>`}function Yf(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${px.map(fx).join("")}
        </div>
    `,z()}const Do=100,qc="status!=done,canceled",gx=["created","updated","priority","status","title","estimate"];function ke(e){return e==null?"":p(String(e))}function Qf(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${ke(n)}</a>`}function Zf(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Nc=[{id:"identifier",label:"ID",fixed:!0,render:e=>Qf(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Qf(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>ke(Ie(e.status))},{id:"priority",label:"Priority",render:e=>ke(De(e.priority))},{id:"type",label:"Type",render:e=>ke(bt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>ke(Zf(e,"assignee"))},{id:"creator",label:"Creator",render:e=>ke(Zf(e,"creator"))},{id:"project",label:"Project",render:e=>ke(e.project_key)},{id:"sprint",label:"Sprint",render:e=>ke(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ee(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${ke(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>ke(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${ke(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>ke(nt(e.created_at))},{id:"updated",label:"Updated",render:e=>ke(nt(e.updated_at))},{id:"completed",label:"Completed",render:e=>ke(nt(e.completed_at))},{id:"due",label:"Due",render:e=>ke(nt(e.due_date))}],Mo=Object.fromEntries(Nc.map(e=>[e.id,e])),hx=Nc.filter(e=>e.fixed).map(e=>e.id),Oc=["identifier","title","status","priority","assignee","updated"];function Hc(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!Mo[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Oc]:[...hx.filter(s=>!t.has(s)),...n]}function vx(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function bx(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Hc(t.get("cols").split(",")):[...Oc],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function yx(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!vx(e.cols,Oc)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function wx(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function $x({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Do,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",wx(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;gx.includes(f)?(o.push("--sort",f,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function kx(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function Ex(e,t){const n=Hc(t).map(a=>Mo[a]),i=n.map(a=>`<th data-col="${m(a.id)}">${ke(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${m(a.id)}">${n.map(o=>`<td class="query-col-${m(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function _x(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let O=null,Fc=null,Je=null,Uc=0,Li=!1,Xf=!1;function re(e){return document.getElementById(e)}function Jf(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function eg(e){const t=yx({...Fc,cols:O.cols,group:O.group,view:O.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function xx(){const e=re("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(X().map(n=>`<option value="${m(n.id)}">${ke(n.name)}</option>`));e.innerHTML=t.join(""),e.value=O.teamScope?"":O.projectId||""}function Ix(){const e=re("query-columns-menu");e&&(e.innerHTML=Nc.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${O.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${ke(t.label)}
        </label>`).join(""))}function jo(e){const t=re("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${ke(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function tg(e){const t=re("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Gc(e){var t;(t=re("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function Ws(){const e=re("query-results"),t=re("query-pager");if(!e)return;if(!Je){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=Je;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=Ex(n,O.cols),t&&(t.innerHTML=_x(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Li&&Gc(!0))}async function Ro(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!O)return;const i=T(),s=O.teamScope?{teamId:i==null?void 0:i.id}:{projectId:O.projectId};if(!s.teamId&&!s.projectId){Je=null,Ws(),jo(O.teamScope?"Select a team first.":"Select a project.");return}const a=++Uc,o=O.where===null?qc:O.where,r=re("query-results");Li=!0,r&&r.classList.add("loading"),Gc(!0);const l=()=>a===Uc&&A()==="query";try{const c=await v.queryIssues({...s,where:o,order:O.order,skip:(O.page-1)*Do,limit:Do});if(!l())return;O.where=c.where,O.order=c.order||null,Fc=Jf(O),Je={issues:c.issues||[],total:c.total,skip:c.skip};const d=re("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),jo(null),Li=!1,Ws(),eg(e),t&&t()}catch(c){if(!l())return;Li=!1,n?n():Je=null,Ws(),jo(kx(c))}finally{a===Uc&&(Li=!1,r&&r.classList.remove("loading"),Gc(!1))}}function ng(){if(!O)return;const e=re("query-where");return O.where=e?e.value.trim():"",O.page=1,Ro("push")}function Sx(e){if(O)return O.teamScope=!e,e&&(O.projectId=e),O.page=1,tg(null),Ro("push",{onSuccess:()=>{e&&lt(e)}})}function Tx(e,t){if(!O||!Mo[e]||Mo[e].fixed)return;const n=O.cols.filter(i=>i!==e);O.cols=Hc(t?[...n,e]:n),Ws(),eg("replace")}function Lx(e){if(!O||!Je||Li)return;const t=O.page+e;if(t<1||e>0&&Je.skip+Je.issues.length>=Je.total)return;const n={page:O.page,result:Je};return O.page=t,Ro("push",{onFailure:()=>{O.page=n.page,Je=n.result}})}async function Ax(){if(!O)return null;const e=re("query-where"),t=e?e.value.trim():O.where??qc,n=O.teamScope?null:X().find(o=>o.id===O.projectId),{command:i,warning:s}=$x({where:t,order:O.order,teamScope:O.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Do,skip:Je?Je.skip:0}),a=re("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function Cx(){var e,t,n,i,s,a,o;Xf||(Xf=!0,(e=re("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),ng())}),(t=re("query-run-btn"))==null||t.addEventListener("click",()=>ng()),(n=re("query-copy-cli-btn"))==null||n.addEventListener("click",()=>Ax()),(i=re("query-project-filter"))==null||i.addEventListener("change",r=>Sx(r.target.value)),(s=re("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=re("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=re("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&Tx(r.target.value,r.target.checked)}),(o=re("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||Lx(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=re("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=re("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function Bx(){var s,a;Cx();const e=bx(window.location.search),t=X();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(K())?K():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}O=e,Fc=Jf(O),Je=null;const i=re("query-where");return i&&(i.value=O.where===null?qc:O.where),(s=re("query-cli-preview"))==null||s.classList.add("hidden"),(a=re("query-columns-menu"))==null||a.classList.add("hidden"),xx(),Ix(),jo(null),tg(n),Ws(),Ro("replace")}let Po=[];function Dx(){return Po}rt(e=>{e==="currentProject"&&A()==="epics"&&vn()});let zc=0;const Ks=new Set(["done","canceled"]);let qo=!1;async function vn({fromMemory:e=!1}={}){var a;Dr(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++zc,i=dl(),s=e?Wa("epics",i):void 0;s?ig(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=T())!=null&&a.id)){Po=[],t.innerHTML=F({icon:N.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=K(),r=o?await v.getProjectEpicProgress(o):await v.getTeamEpicProgress(T().id);if(n!==zc||(mi("epics",i,r),s&&Ka(s,r)))return;ig(r,t)}catch(o){if(n!==zc)return;t.innerHTML=F({icon:N.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),k("load epics",o)}}function ig(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){Po=[],t.innerHTML=F({icon:N.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}lg(e,t)}function Vc(e,t){return`${e} ${t}${e===1?"":"s"}`}function sg(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function Mx(e){const t=e.children||{},n=(t.total||0)-(t.canceled||0);if(n<=0)return'<span class="epic-progress-text">No tickets</span>';const i=Math.round((t.done||0)/n*100),s=Math.round(((t.in_progress||0)+(t.in_review||0))/n*100),a=t.done===n,o=`${t.done||0} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="epic-progress-bar-container" title="${m(o)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${a?" epic-progress-complete":""}" style="width: ${i}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(s,100-i)}%"></div>
            </div>
            <span class="epic-progress-pct" title="Tickets done">${sg(t.done||0,n)}</span>
            <span class="epic-progress-text">${t.done||0}/${n}</span>
        </div>
    `}function ag(e){if(!e||e.length===0)return'<span class="text-muted">-</span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${Vc(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function og(e,t){return e?`<span class="epic-this-sprint">+${e} <span class="text-muted">(${t} pts)</span></span>`:'<span class="text-muted">-</span>'}function jx(e){const t=e.status_pinned&&!Ks.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",n=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",i=(e.points_total||0)>0?`${e.points_done||0}/${e.points_total} pts`:"-",s=Ys(e)<=0;return`
        <tr class="epic-row${Ks.has(e.status)?" epic-row-closed":""}${s?" epic-row-empty":""}" data-identifier="${m(e.identifier)}">
            <td class="epic-identifier">${p(e.identifier)}</td>
            <td class="epic-title">${p(e.title)}${t}${n}</td>
            <td class="epic-progress">${Mx(e)}</td>
            <td class="epic-points">${i}</td>
            <td class="epic-sprint">${og(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${ag(e.sprints)}</td>
        </tr>
    `}function Rx(e){return!e||!e.open&&!e.closed_this_sprint&&!(e.sprints||[]).some(t=>t.closed)?"":`
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${p(e.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${Vc(e.open||0,"open ticket")}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${og(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${ag(e.sprints)}</td>
        </tr>
    `}function Ys(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function rg(e){var n;const t=Ys(e);return t>0?(((n=e.children)==null?void 0:n.done)||0)/t:0}const Wc=[{key:"active",label:"In progress",statuses:["in_progress","in_review"]},{key:"todo",label:"Todo",statuses:["todo"]},{key:"backlog",label:"Backlog",statuses:["backlog"]},{key:"closed",label:"Closed",statuses:["done","canceled"]}];function Px(e){const t=e.status||"backlog";return Wc.find(n=>n.statuses.includes(t))||Wc[2]}function qx(e,t){const n=Ys(e)<=0,i=Ys(t)<=0;if(n!==i)return n?1:-1;const s=(t.points_this_sprint||0)-(e.points_this_sprint||0);if(s)return s;const a=(t.closed_this_sprint||0)-(e.closed_this_sprint||0);return a||rg(t)-rg(e)}function Nx(e){return Wc.map(t=>({group:t,epics:e.filter(n=>Px(n)===t).sort(qx)})).filter(t=>t.epics.length)}function Ox(e,t){const n=e.filter(u=>!Ks.has(u.status)),i=n.filter(u=>(u.closed_this_sprint||0)>0).length,s=n.reduce((u,f)=>{var g;return u+(((g=f.children)==null?void 0:g.done)||0)},0),a=n.reduce((u,f)=>u+Ys(f),0),o=[...e,...t],r=o.reduce((u,f)=>u+(f.closed_this_sprint||0),0),l=o.reduce((u,f)=>u+(f.points_this_sprint||0),0),c=t.reduce((u,f)=>u+(f.open||0),0);if(!n.length&&!r&&!c)return"";const d=(u,f,g="")=>`
        <div class="epic-stat${g}">
            <div class="epic-stat-value">${u}</div>
            <div class="epic-stat-label">${f}</div>
        </div>`;return`
        <div class="epic-summary" role="group" aria-label="Progress summary">
            ${n.length?d(`${i}<span class="epic-stat-of"> / ${n.length}</span>`,"open epics moved this sprint"):""}
            ${n.length?d(sg(s,a),a?`of their tickets done (${s}/${a})`:"no tickets yet"):""}
            ${d(r?`+${r}`:"0",`${r===1?"ticket":"tickets"} closed this sprint (${l} pts)`,r?" epic-stat-up":"")}
            ${c?d(String(c),`open ${c===1?"ticket":"tickets"} under no epic`," epic-stat-warn"):""}
        </div>`}const Kc=6;function lg(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=n.filter(f=>Ks.has(f.status)).length,a=qo?n:n.filter(f=>!Ks.has(f.status)),o=[...new Set([...n.map(f=>f.project_key),...i.map(f=>f.project_key)])],r=o.length>1,l=[],c=o.map(f=>{const b=Nx(a.filter(S=>S.project_key===f)).map(({group:S,epics:_})=>(l.push(..._),`<tr class="epic-state-row epic-state-${S.key}"><th colspan="${Kc}" scope="colgroup"><span class="epic-state-dot" aria-hidden="true"></span>${S.label}<span class="epic-state-count">${_.length}</span></th></tr>`+_.map(jx).join(""))).join(""),y=Rx(i.find(S=>S.project_key===f));return!b&&!y?"":(r?`<tr class="epic-group-row"><th colspan="${Kc}" scope="colgroup">${p(f)}</th></tr>`:"")+b+y}).join("");Po=l;const d=!c.trim()&&s>0?`<tr class="epic-empty-row"><td colspan="${Kc}" class="text-muted">Every epic here is closed.</td></tr>`:"",u=s>0?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${qo?"Hide":"Show"} ${Vc(s,"closed epic")}</button>`:"";t.innerHTML=`
        ${Ox(n,i)}
        <table class="epic-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Progress</th>
                    <th>Points</th>
                    <th title="Closed while the current sprint is active">This sprint</th>
                    <th title="Points closed in each recent sprint, oldest first">Sprints</th>
                </tr>
            </thead>
            <tbody>
                ${c}${d}
            </tbody>
        </table>
        ${u?`<div class="epic-table-footer">${u}</div>`:""}
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=f=>{if(f.target.closest("[data-epics-toggle-closed]")){qo=!qo,Dr(-1),lg(t._epicProgress,t);return}const g=f.target.closest(".epic-row");g&&g.dataset.identifier&&Qm(g.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Hx(){const e=K(),t=X().map(n=>`
        <option value="${m(n.id)}" ${n.id===e?"selected":""}>${p(n.name)}</option>
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
    `,z(),document.getElementById("create-epic-form").addEventListener("submit",Fx),document.getElementById("create-epic-title").focus()}async function Fx(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await v.createIssue(t,{title:n,description:i||null,issue_type:"epic"});H(),$(`Created epic ${s.identifier}`,"success"),vn()}catch(s){k("create epic",s)}}async function cg(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){oe(t.id,!1);return}await No(t.id,!1)}else q("epics",!1)}catch{q("epics",!1)}}async function No(e,t=!0){var n;try{t&&pn();const[i,s,a,o]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(i.issue_type!=="epic"){oe(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=A()||"epics",c=X().find(E=>E.id===i.project_id),d=i.assignee_id?ct(i.assignee_id):null,u=d?dt(d):null,f=Dx(),g=(n=f.find(E=>E.id===i.id))==null?void 0:n.children,b=g?(g.total||0)-(g.canceled||0):s.filter(E=>E.status!=="canceled").length,y=g?g.done||0:s.filter(E=>E.status==="done").length,w=b>0?Math.round(y/b*100):0,S=f.findIndex(E=>E.id===i.id),_=S>0?f[S-1]:null,D=S>=0&&S<f.length-1?f[S+1]:null,M=S>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${M?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${_?`data-action="navigate-epic" data-epic-id="${m(_.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${S+1} / ${f.length}</span>
                            <button class="issue-nav-btn" ${D?`data-action="navigate-epic" data-epic-id="${m(D.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?p(c.name):"Project"} › ${p(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(i.title)}</h1>

                    ${i.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Cn(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${w===100?" epic-progress-complete":""}" style="width: ${w}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${y} of ${b} done</span>
                                <span>${w}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?F({icon:N.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(E=>{const P=E.assignee_id?ct(E.assignee_id):null,U=P?dt(P):null;return`
                                <div class="sub-issue-item" data-issue-id="${m(E.id)}" data-identifier="${m(E.identifier)}">
                                    <span class="sub-issue-status">${We(E.status)}</span>
                                    <span class="sub-issue-id">${p(E.identifier)}</span>
                                    <span class="sub-issue-title">${p(E.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(E.status||"backlog").replace(/_/g,"-")}">${Ie(E.status)}</span>
                                    ${U?`<span class="sub-issue-assignee">${p(U)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?F({icon:N.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(E=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${dm(E.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ll(E)}</span>
                                        <span class="activity-actor">by ${p(Sl(E))}</span>
                                        <span class="activity-time">${ot(E.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${o.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${o.map(E=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(E.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${p(E.author_name||"User")}</span>
                                            <span class="comment-date">${ot(E.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${p(E.content||"")}</div>
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
                                ${We(i.status)}
                                ${Ie(i.status)}
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
                                ${pt(i.priority)}
                                ${De(i.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${u?p(u):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${un(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(E=>`
                                    <span class="issue-label" style="background: ${ee(E.color)}20; color: ${ee(E.color)}">${p(E.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(i.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const ne=r.querySelector(".sub-issues-list");ne&&ne.addEventListener("click",E=>{const P=E.target.closest(".sub-issue-item");P&&P.dataset.issueId&&oe(P.dataset.issueId)})}catch(i){k("load epic",i)}}ie({"navigate-epic":(e,t)=>{No(t.epicId)},"epic-follow-children":async(e,t)=>{try{await v.updateIssue(t.epicId,{status_follows_children:!0}),$("Status now follows sub-issues"),await No(t.epicId,!1)}catch(n){k("update epic",n)}}});function Ux(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,f;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function Gx(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Xt(e,t,n=$a){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function dg(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function Qs(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(dg(),!1):!0:!1}function zx(e){const t=$a;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||Qs(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((f=e.beforeNavigate)==null||f.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Xt(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Xt(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Vx(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Qs(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Xt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Xt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Fn(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function Wx(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Qs(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var y,w,S,_;const b=!!((w=(y=document.activeElement)==null?void 0:y.closest)!=null&&w.call(y,"#inbox-list"));if((S=e.collapseInboxExpand)==null||S.call(e),Xt(a+g,e.setSelectedIndex,t),b){const D=document.querySelector(`${t}.keyboard-selected`);(_=(D==null?void 0:D.querySelector(".inbox-row-toggle"))||D)==null||_.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((u=e.isEscapeLayerAbove)!=null&&u.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Kx(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Qs(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Xt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Xt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Yx(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function Yc(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d,u;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||Qs(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Xt(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Xt(r-1,e.setSelectedIndex,n);break;case"Enter":if((u=(d=a.target).closest)!=null&&u.call(d,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const Qx=7,Qc=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),ug=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),Zx='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',Xx='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let pg=!1;function Jx(){pg||(pg=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...Qc,set(e){var t;Qc.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...ug,set(e){var t;ug.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let Ae=null,eI=0;function mg({restoreFocus:e=!0}={}){return Ae?(Ae.close(e),!0):!1}function tI(e=document){e.querySelectorAll("select[data-picker]").forEach(nI)}function nI(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${Zx}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{fg(e,t),(Ae==null?void 0:Ae.select)===e&&Ae.refresh()};return e._picker={button:t,sync:n},Jx(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(Ae==null?void 0:Ae.select)===e?mg():hg(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(Ae==null?void 0:Ae.select)!==e&&hg(e,t)):s.key.length===1&&s.stopPropagation())}),n(),t}function fg(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"";t.querySelector(".picker-label").textContent=i,t.disabled=e.disabled,t.title=i;const s=e.getAttribute("aria-label");s&&t.setAttribute("aria-label",i?`${s}: ${i}`:s)}function gg(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),disabled:t.disabled}))}function hg(e,t){mg({restoreFocus:!1});const n=gg(e),i=`picker-list-${++eI}`,s=n.length>=Qx,a=e.getAttribute("aria-label")||"Options",o=document.createElement("div");o.className="picker-popover",o.tabIndex=-1,o.innerHTML=`
        ${s?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(a)}"
            role="combobox" aria-expanded="true" aria-controls="${i}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${i}" tabindex="-1" aria-label="${m(a)}"></ul>
    `,document.body.appendChild(o);const r=o.querySelector(".picker-list"),l=o.querySelector(".picker-search"),c=x=>Math.max(0,x.findIndex(R=>!R.disabled));let d=n.findIndex(x=>x.value===e.value&&!x.disabled);d===-1&&(d=c(n));let u=n;const f=()=>{var R;r.innerHTML=u.length?u.map((C,Q)=>`
                <li role="option" id="${i}-${Q}" class="picker-option${Q===d?" active":""}${C.disabled?" disabled":""}"
                    data-index="${Q}" data-value="${m(C.value)}"
                    aria-selected="${C.value===e.value?"true":"false"}"${C.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${p(C.text)}</span>
                    ${C.value===e.value?`<span class="picker-check">${Xx}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const x=r.querySelector(".picker-option.active");x?(l||r).setAttribute("aria-activedescendant",x.id):(l||r).removeAttribute("aria-activedescendant"),(R=x==null?void 0:x.scrollIntoView)==null||R.call(x,{block:"nearest"})},g=()=>{var L,de;const x=t.getBoundingClientRect(),R=((L=window.visualViewport)==null?void 0:L.width)||window.innerWidth,C=((de=window.visualViewport)==null?void 0:de.height)||window.innerHeight;o.style.minWidth=`${Math.min(Math.max(x.width,220),R-16)}px`,o.style.maxHeight="",o.style.top="0px";const Q=o.offsetWidth||Math.max(x.width,220),_e=o.offsetHeight;o.style.left=`${Math.max(8,Math.min(x.left,R-Q-8))}px`;const ce=C-x.bottom-12,ht=x.top-12;if(_e>ce&&ht>ce){const fe=Math.max(120,ht);o.style.maxHeight=`${fe}px`,o.style.top=`${Math.max(8,x.top-4-Math.min(_e,fe))}px`}else o.style.maxHeight=`${Math.max(120,ce)}px`,o.style.top=`${x.bottom+4}px`},b=x=>{if(!x||x.disabled||e.disabled)return;if(![...e.options].some(C=>C.value===x.value&&!C.disabled)){W(!0);return}const R=x.value!==e.value;Qc.set.call(e,x.value),fg(e,t),W(!0),R&&e.dispatchEvent(new Event("change",{bubbles:!0}))},y=x=>{let R=d+x;for(;R>=0&&R<u.length&&u[R].disabled;)R+=x;R<0||R>=u.length||(d=R,f())},w=(x,R)=>{let C=x;for(;C>=0&&C<u.length&&u[C].disabled;)C+=R;C>=0&&C<u.length&&(d=C,f())},S=x=>{if(!(x.metaKey||x.ctrlKey))switch(x.stopPropagation(),x.key){case"ArrowDown":x.preventDefault(),y(1);break;case"ArrowUp":x.preventDefault(),y(-1);break;case"Home":l||(x.preventDefault(),w(0,1));break;case"End":l||(x.preventDefault(),w(u.length-1,-1));break;case"PageDown":x.preventDefault(),w(Math.min(u.length-1,d+8),-1);break;case"PageUp":x.preventDefault(),w(Math.max(0,d-8),1);break;case"Enter":x.preventDefault(),b(u[d]);break;case"Escape":x.preventDefault(),W(!0);break;case"Tab":W(!0);break;case" ":l||(x.preventDefault(),b(u[d]));break;default:if(!l&&x.key.length===1&&!x.metaKey&&!x.ctrlKey&&!x.altKey){_=(Date.now()-D<700?_:"")+x.key.toLowerCase(),D=Date.now();const R=u.findIndex(C=>!C.disabled&&C.text.toLowerCase().startsWith(_));R!==-1&&(d=R,f())}}};let _="",D=0;const M=()=>{const x=l.value.trim().toLowerCase();u=x?n.filter(C=>C.text.toLowerCase().includes(x)):n;const R=u.findIndex(C=>C.value===e.value&&!C.disabled);d=!x&&R!==-1?R:c(u),f()},ne=x=>{o.contains(x.target)||t.contains(x.target)||W(!1)},E=()=>g(),P=x=>{x.key!=="Escape"||o.contains(x.target)||(x.preventDefault(),x.stopPropagation(),W(!0))},U=()=>W(!1);function W(x){(Ae==null?void 0:Ae.popover)===o&&(Ae=null,o.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",ne,!0),document.removeEventListener("keydown",P,!0),window.removeEventListener("popstate",U),window.removeEventListener("resize",E),window.removeEventListener("scroll",E,!0),x&&t.focus({preventScroll:!0}))}r.addEventListener("click",x=>{const R=x.target.closest(".picker-option");R&&b(u[Number(R.dataset.index)])}),r.addEventListener("mousemove",x=>{const R=x.target.closest(".picker-option");if(!R)return;const C=Number(R.dataset.index);C!==d&&(d=C,f())}),o.addEventListener("keydown",S),l&&l.addEventListener("input",M),document.addEventListener("pointerdown",ne,!0),document.addEventListener("keydown",P,!0),window.addEventListener("popstate",U),window.addEventListener("resize",E),window.addEventListener("scroll",E,!0),Ae={select:e,button:t,popover:o,close:W,refresh:()=>{const x=gg(e);!(x.length===n.length&&x.every((C,Q)=>C.value===n[Q].value&&C.text===n[Q].text&&C.disabled===n[Q].disabled))||e.disabled?W(!1):f()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",i),t.classList.add("open"),f(),g(),(l||r).focus({preventScroll:!0})}const iI={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>v.getDocumentRevisions(e),fetchOne:(e,t)=>v.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>v.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>v.getIssueDescriptionRevision(e,t)}};let V=null,bn=0;async function vg(e,t){var a,o;const n=iI[e];if(!n){k("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++bn;V=null;let s;try{s=await n.fetchList(t)}catch(r){k("load revision history",r);return}if(i===bn){if(V={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},V.viewVersion!=null)try{const r=await n.fetchOne(t,V.viewVersion);if(i!==bn)return;V.cache.set(V.viewVersion,r)}catch(r){i===bn&&k("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),Oo(),z()}}function Oo(){const e=document.getElementById("modal-content");if(!e||!V)return;if(V.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=sI(),n=V.mode==="compare"?oI():aI();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function sI(){const e=V.revisions.map(n=>{const i=V.mode==="view"?n.version===V.viewVersion:n.version===V.compareFromVersion||n.version===V.compareToVersion,s=V.mode==="compare"?n.version===V.compareFromVersion?' <span class="rev-tag">from</span>':n.version===V.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${p(n.author_name||"Unknown")} ${Yn(n.author)}</span>
          <span class="revision-time">${ot(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${V.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function aI(){const e=V.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=V.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${p(t.title)}</h3>`:"",i=t[V.adapter.bodyField]||"",s=i?`<div class="markdown-body">${mt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${p(t.author_name||"Unknown")} &middot; ${ot(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function oI(){const e=V.compareFromVersion,t=V.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=V.cache.get(e),i=V.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[V.adapter.bodyField]||"",a=i[V.adapter.bodyField]||"",o=rI(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
      <div class="revision-title-change">
        Title: <span class="diff-del">${p(n.title||"")}</span>
        &rarr; <span class="diff-add">${p(i.title||"")}</span>
      </div>
    `),`
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${e}</strong> &rarr; <strong>v${t}</strong>
      </div>
    </div>
    ${r}
    ${o}
  `}function rI(e,t){const n=e.split(`
`),i=t.split(`
`),s=lI(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${p(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${p(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${p(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function lI(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(Zs(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(Zs(a,"del",e[o]),o++):(Zs(a,"add",t[r]),r++);for(;o<n;)Zs(a,"del",e[o++]);for(;r<i;)Zs(a,"add",t[r++]);return a}function Zs(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function cI(e){if(!V)return;const t=V.token,n=V;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(V!==n||bn!==t)return;n.cache.set(e,i)}catch(i){V===n&&bn===t&&k("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Oo()}function dI(){if(!V)return;const e=V.token,t=V;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{V===t&&bn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{V!==t||bn!==e||(s&&k("load revisions to compare",s),Oo())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Oo()}ie({"show-document-revisions":(e,t)=>{vg("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{vg("issue",t.issueId)},"select-revision-version":(e,t)=>{cI(Number(t.version))},"toggle-revision-compare":()=>{dI()},"close-revision-viewer":()=>{V=null,H()}});const Ho={bio:4e3,pronouns:40,tagline:120,name:255};let Rt=[],Zc=null,Xc=!1,Jc=0,Fo=null,Ai=null,Xs=null,Uo=!1,ed=0;async function bg(e,t){return v.getTeamRoster(e,{includeIdle:t})}function uI(e,t){!t||Zc!==e||(Rt=Rt.map(n=>n.user_id===t.user_id?t:n))}function pI(){return Array(4).fill(0).map(()=>`
        <div class="person-card person-card-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function td(){const e=T();if(!e)return;const t=++Jc,n=Xc,i=document.getElementById("people-list");i&&(i.innerHTML=pI(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=Xc);try{const a=await bg(e.id,n);if(t!==Jc)return;Rt=a,Zc=e.id,$g()}catch(a){if(t!==Jc)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=F({icon:N.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),k("load the roster",a)}}function yg(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function wg(e){const t=m(e.user_id),n=e.pronouns?`<span class="person-pronouns">${p(e.pronouns)}</span>`:"",i=e.mention_handle?`<div class="person-handle">@${p(e.mention_handle)}</div>`:"",s=e.tagline?`<div class="person-tagline">${p(e.tagline)}</div>`:"";return`
        <a class="person-card${e.is_agent?" person-card-agent":""}${e.idle?" person-card-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-card-avatar" aria-hidden="true">${Ut(e,"avatar person-avatar")}</span>
            <div class="person-card-body">
                <div class="person-name">${p(e.name)}${n}</div>
                ${i}
                ${s}
                <div class="person-role">${p(yg(e))}</div>
            </div>
        </a>
    `}function $g(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=Rt.filter(a=>!a.is_agent),n=Rt.filter(a=>a.is_agent),i=be(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=`
        <div class="people-section-header"><h3>People</h3>${s}</div>
        <div class="people-grid">${t.map(wg).join("")||'<p class="people-empty">No one yet.</p>'}</div>
        <div class="people-section-header"><h3>Agents</h3></div>
        <div class="people-grid">${n.map(wg).join("")||'<p class="people-empty">No agents yet.</p>'}</div>
    `}function kg(e,t=be()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function Eg(e,t,{fresh:n=!1}={}){if(!n&&Zc===e){const a=Rt.find(o=>o.user_id===t);if(a)return a}const s=(await bg(e,!0)).find(a=>a.user_id===t)||null;return uI(e,s),s}let _g=0,nd=null;async function Go(e,t=!0){var r;t&&pn(),Km();const n=++_g,i=T();if(!i)return;const s=window.location.pathname,a=()=>{var l;return n!==_g||((l=T())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let o;try{o=await Eg(i.id,e)}catch(l){if(a())return;k("load this profile",l),t||history.replaceState({view:"people"},"","/people"),q("people",t);return}if(!a()){if(!o){$("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),q("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),Ji("people"),As("people"),xg(o),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function mI(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function xg(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=mI();n.classList.remove("hidden"),n.dataset.userId=e.user_id,nd=e;const i=m(e.user_id),s=kg(e),a=e.user_id===((l=be())==null?void 0:l.id),o=e.bio?`<div class="person-bio markdown-body">${Cn(e.bio)}</div>`:`<p class="person-bio-empty">${a?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${p(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${a?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${Ut(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${p(e.name)}${e.pronouns?`<span class="person-pronouns">${p(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${p(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${p(e.tagline)}</div>`:""}
                <div class="person-role">${p(yg(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${o}
        <section class="person-work">
            <h3>Working on</h3>
            <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
        </section>
    `,t&&fI(e.user_id)}const Ig=["in_progress","in_review","todo"];let Sg=0;async function fI(e){const t=T();if(!t)return;const n=++Sg;let i;try{i=await v.getTeamIssues(t.id,{assignee_id:e,status:Ig,sort_by:"status",order:"asc",limit:20})}catch(o){i=null,console.error("Failed to load their issues:",o)}if(n!==Sg)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const a=o=>Ig.indexOf(o.status);s.innerHTML=[...i].sort((o,r)=>a(o)-a(r)).map(o=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(o.identifier)}" data-action="person-open-issue" data-identifier="${m(o.identifier)}">
            <span class="person-issue-id">${p(o.identifier)}</span>
            <span class="person-issue-title">${p(o.title)}</span>
            <span class="person-issue-status">${p(String(o.status).replace("_"," "))}</span>
        </a>
    `).join("")}const id=["name","avatar_url","pronouns","tagline","bio"];function gI(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(id.map(n=>[n,t(n,e==null?void 0:e[n])]))}let sd=0;async function hI(e){var l;const t=be(),n=T();if(!t||!n)return;const i=++sd,s=window.location.pathname;let a;try{a=await Eg(n.id,e,{fresh:!0})}catch(c){i===sd&&k("load this profile",c);return}if(i!==sd||window.location.pathname!==s||((l=T())==null?void 0:l.id)!==n.id||(!a&&e===t.id&&(a={...t,user_id:t.id}),!a||!kg(a,t)))return;Fo=e,Xs=a,Ai=gI(a),ed++;const o=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=o?"Edit your profile":`Edit ${a.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(a.name)}" maxlength="${Ho.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(a.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            ${o?`<div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${Js?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${Lr.test(a.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${Js?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${Cg}px.</p>
            </div>`:""}
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(a.pronouns)}" maxlength="${Ho.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(a.tagline)}" maxlength="${Ho.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${Ho.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${p(a.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${Uo?" disabled":""}>Save</button>
        </form>
    `,z()}function vI(e,t=null){const n=a=>{var o;return((o=e.querySelector(`#${a}`))==null?void 0:o.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const a of id){const o=t?String(t[a]??""):null;(a==="avatar_url"?i[a]===(o==null?void 0:o.trim()):i[a]===o)||(s[a]=a==="avatar_url"?i[a]||null:i[a])}return s}function Tg(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");xg(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function Lg(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function Ag(){Fo=null,Ai=null,Xs=null,H()}async function bI(e){e.preventDefault();const t=Fo;if(!t||Uo)return;const n=e.target.closest("form")||e.target,i=vI(n,Ai);if(!Object.keys(i).length){Ag();return}const s=be(),a=t===(s==null?void 0:s.id),o=Xs,r=ed,l=n.querySelector('button[type="submit"]');Uo=!0,l&&(l.disabled=!0);try{const c=a?await v.updateMe(i):await v.updateAgent(t,i),d=Object.fromEntries(id.map(u=>[u,(c==null?void 0:c[u])??null]));Rt=Rt.map(u=>u.user_id===t?{...u,...d}:u),a&&(It({...s,...d}),Lo()),r===ed&&Ag(),$("Profile saved","success"),Lg(t)?Tg({...o,...d}):$g()}catch(c){k("save the profile",c)}finally{Uo=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const Cg=256;async function yI(e,t=Cg){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const a=c=>new Promise(d=>s.toBlob(d,c,.9)),o=await a("image/webp");let r=o&&o.type==="image/webp"?o:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await a("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let Js=!1;function Bg(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function wI(e){var i;const t=be();if(!t||!e||e.id&&e.id!==t.id)return;const n=e.avatar_url??null;if(Rt=Rt.map(s=>s.user_id===t.id?{...s,avatar_url:n}:s),It({...t,avatar_url:n}),Lo(),Fo===t.id&&Ai){const s=document.getElementById("profile-avatar");s&&(s.value=n||""),Ai={...Ai,avatar_url:n||""},Xs={...Xs,avatar_url:n},(i=document.getElementById("profile-photo-remove"))==null||i.classList.toggle("hidden",!Lr.test(n||""))}nd&&Lg(t.id)&&Tg({...nd,avatar_url:n})}async function Dg(e,t,n){if(!Js){Js=!0,Bg(!0);try{wI(await e()),$(t,"success")}catch(i){k(n,i)}finally{Js=!1,Bg(!1)}}}async function $I(e,t=yI){var i;const n=(i=e.files)==null?void 0:i[0];if(n)try{await Dg(async()=>v.uploadAvatar(await t(n)),"Photo uploaded","upload the photo")}finally{e.value=""}}function kI(){return Dg(()=>v.deleteAvatar(),"Photo removed","remove the photo")}function ad(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}ie({"view-person":(e,t)=>{e.type!=="click"||ad(e)||(e.preventDefault(),Go(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),hI(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=be();t&&Go(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&$I(n)},"remove-profile-photo":e=>{e.type==="click"&&kI()},"save-profile":e=>{bI(e)},"retry-load-people":e=>{e.type==="click"&&td()},"person-open-issue":(e,t)=>{e.type!=="click"||ad(e)||(e.preventDefault(),rc(t.identifier))},"back-to-roster":e=>{e.type!=="click"||ad(e)||(e.preventDefault(),q("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(Xc=!!n.checked,td())}});const EI=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let kt=[],zo=null,Vo=null,od=0;rt(e=>{e==="currentProject"&&A()==="board"&&ea()});async function ea({fromMemory:e=!1}={}){ba(-1);const t=++od,n=K();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=X().length===0?F({icon:N.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):F({icon:N.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const i=document.getElementById("kanban-board"),s=dl(),a=e?Wa("board",s):void 0;a?(kt=a,zo=s,A()==="board"&&St(kt),Ci()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await v.getIssues({project_id:n});if(t!==od)return;const r=a&&Ka(kt,o);kt=o,zo=s,mi("board",s,o),A()==="board"&&St(kt),r||Ci()}catch(o){if(t!==od)return;i&&(i.innerHTML=F({icon:N.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),k("load board",o)}}const rd=Fv(()=>ea(),200);function Ci(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;zo&&mi("board",zo,kt),e.innerHTML=EI.map(i=>{const s=kt.filter(a=>a.status===i.key);return`
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
                    `:s.map(_I).join("")}
                </div>
            </div>
        `}).join(""),xI(t)}function _I(e){const t=e.assignee_id?ct(e.assignee_id):null,n=t?dt(t):null,i=e.estimate!=null?un(e.estimate,e.project_id):"",s=vo(e.estimate,e.project_id),a=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${p(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${Ut(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${p(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(De(e.priority))}">${pt(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${p(i)}</span>`:""}
                ${a.map(o=>`<span class="issue-label" title="${m(o.name)}" style="background: ${ee(o.color)}20; color: ${ee(o.color)}">${p(o.name)}</span>`).join("")}
            </div>
        </div>
    `}function xI(e){const t=bu();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){ba(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),ba(i),n[i].classList.add("keyboard-selected")}function II(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Vo=t.dataset.id,t.classList.add("dragging")}function SI(e,t){t.classList.remove("dragging"),Vo=null}function Mg(e){const t=kt.find(n=>n.id===Vo);return!!t&&t.status===e}function TI(e,t){e.preventDefault(),!Mg(t.dataset.status)&&t.classList.add("drag-over")}function LI(e,t){t.classList.remove("drag-over")}function AI(e,t){e.preventDefault();const n=kt.find(i=>i.id===t.dataset.id);n&&Mg(n.status)||t.classList.add("drag-over")}function CI(e,t){t.classList.remove("drag-over")}async function BI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=kt.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,Ci();try{const o=await v.updateIssue(n,{status:i});$("Status updated","success"),ls(o)}catch(o){s.status=a,Ci(),k("update status",o)}}}async function DI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Vo||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=kt.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Ci();try{const l=await v.updateIssue(n,{status:a});$("Status updated","success"),ls(l)}catch(l){o.status=r,Ci(),k("update status",l)}}}ie({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),oe(t.id)):e.type==="dragstart"?II(e,n):e.type==="dragend"?SI(e,n):e.type==="dragover"?AI(e,n):e.type==="dragleave"?CI(e,n):e.type==="drop"&&DI(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?TI(e,n):e.type==="dragleave"?LI(e,n):e.type==="drop"&&BI(e,n)},"retry-load-board":()=>ea()});const yn=new Map,jg=6e4,ld=100;let Re=null,Wo=null,Ko=null,ta=null,Rg=!1;const MI={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},jI={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Pg={api:null};let cd={...Pg};function RI(e={}){cd={...Pg,...e},Re||(Re=document.createElement("div"),Re.className="issue-tooltip",Re.style.display="none",document.body.appendChild(Re),Re.addEventListener("mouseenter",()=>{clearTimeout(Wo)}),Re.addEventListener("mouseleave",()=>{dd()})),Rg||(document.addEventListener("mouseover",PI),document.addEventListener("mouseout",qI),Rg=!0)}function PI(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=NI(t);if(n){if(n===ta&&Re.style.display!=="none"){clearTimeout(Wo);return}clearTimeout(Ko),Ko=setTimeout(()=>{OI(t,n)},200)}}function qI(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Ko),Wo=setTimeout(()=>{dd()},150))}function NI(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function OI(e,t){ta=t;const n=e.getBoundingClientRect();Re.style.left=`${n.left+window.scrollX}px`,Re.style.top=`${n.bottom+window.scrollY+8}px`,Re.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Re.style.display="block";try{const i=await FI(t);if(ta!==t)return;UI(i)}catch{if(ta!==t)return;Re.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function dd(){clearTimeout(Ko),clearTimeout(Wo),Re&&(Re.style.display="none"),ta=null}function HI(){const e=Date.now();for(const[t,n]of yn.entries())e-n.timestamp>=jg&&yn.delete(t)}async function FI(e){yn.size>ld/2&&HI();const t=yn.get(e);if(t&&Date.now()-t.timestamp<jg)return t.issue;if(!cd.api)throw new Error("API not initialized");const n=await cd.api.getIssueByIdentifier(e);if(yn.size>=ld){const i=Array.from(yn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,ld/2);for(const[a]of s)yn.delete(a)}return yn.set(e,{issue:n,timestamp:Date.now()}),n}function UI(e){const t=MI[e.status]||"#6b7280",n=jI[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Re.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${p(e.identifier)}</span>
            <span class="issue-tooltip-type">${p(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${p(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${GI(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${zI(e.priority)}</span>
        </div>
    `}function GI(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function zI(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function qg(){return!!document.querySelector(".description-inline-editor")}function ud(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function pd(){var e;return ud("issue-detail-view")?((e=we())==null?void 0:e.id)??null:null}function Un(e){return!!e&&pd()===e}function VI(){Ke("issue:created",QI),Ke("issue:updated",ZI),Ke("issue:deleted",XI),Ke("comment",t0),Ke("relation",i0),Ke("attestation",s0),Ke("activity",o0),Ke("project",r0),Ke("sprint",l0),Ke("document",n0),Ke("inbox",a0),Ke("connection:reconnected",c0),Ke("connection:unauthorized",KI),Ke("connection:forbidden",YI),Ke("connection:superseded",WI)}function WI(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function KI(){v.logout(),It(null),Qn(null),zs(),$("Your session has ended. Please sign in again.","warning")}function YI(){$("Live updates stopped: you no longer have access to this team.","error")}function QI(e){var s;hs(A(),"board","sprints","epics");const t=te(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Qe(a),A()==="issues"&&ut()}else Qe([e,...t]),A()==="issues"&&ut(),$(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=be())==null?void 0:s.id)){const a=Xe(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)In([e,...a]),A()==="my-issues"&&Sn();else if(r>=0){const l=[...a];l[r]=e,In(l),A()==="my-issues"&&Sn()}}A()==="board"?rd():A()==="sprints"?na():A()==="epics"&&vn(),Un(e.parent_id)&&Gn(e.parent_id)}function ZI(e){hs(A(),"board","sprints","epics"),Ea(e);const t=te();t.some(s=>s.id===e.id)&&Qe(t.map(s=>s.id===e.id?e:s));const n=Xe();n.some(s=>s.id===e.id)&&In(n.map(s=>s.id===e.id?e:s));const i=es();i.some(s=>s.id===e.id)&&St(i.map(s=>s.id===e.id?e:s)),A()==="issues"?ut():A()==="my-issues"?Sn():A()==="board"?rd():A()==="sprints"?na():A()==="epics"&&vn(),Un(e.id)&&(qg()?Il(e):Gn(e.id))}function XI(e){hs(A(),"board","sprints","epics"),lb(e.id),Qe(te().filter(n=>n.id!==e.id)),In(Xe().filter(n=>n.id!==e.id));const t=es();t.some(n=>n.id===e.id)&&St(t.filter(n=>n.id!==e.id)),A()==="issues"?ut():A()==="my-issues"?(Sn(),ei({showLoading:!1})):A()==="board"?rd():A()==="sprints"?na():A()==="epics"&&vn(),$(`Issue ${e.identifier} deleted`,"info"),Un(e.id)&&($(`Issue ${e.identifier} was deleted`,"warning"),q("my-issues"))}const Ng=250,JI=1e3,Bi=new Map;function Gn(e){qg()?Il():md(e,Ng)}function md(e,t){let n=Bi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Bi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>e0(e),t))}async function e0(e){const t=Bi.get(e);if(!t)return;if(t.timer=null,!Un(e)){Bi.delete(e);return}t.inFlight=!0;let n;try{n=await oe(e,!1,{refresh:!0})}finally{t.inFlight=!1}Bi.get(e)===t&&(t.again?(t.again=!1,md(e,Ng)):n==="retry"?md(e,JI):Bi.delete(e))}function t0(e){A()==="my-issues"&&ei({showLoading:!1}),Un(e.issue_id)&&Gn(e.issue_id),e.document_id&&am(e.document_id)}function n0(e,{type:t}={}){hs(A(),"documents"),sm(),t==="deleted"?Qw(e.id,e.title):am(e.id)}function i0(e){const t=pd();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Gn(t)}function s0(e){A()==="approvals"&&Bt(),Un(e.issue_id)&&Gn(e.issue_id)}function a0(e,t){var n;e.recipient_user_id===((n=be())==null?void 0:n.id)&&(ki(),cE(t==null?void 0:t.type,e),A()==="inbox"&&!pE(t==null?void 0:t.type,e)&&js({background:!0}))}function o0(e){A()==="my-issues"&&ei({showLoading:!1}),Un(e.issue_id)&&Gn(e.issue_id)}function r0(e,{type:t}){ft().then(()=>{A()==="projects"&&Pn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function na(){const e=F$();e&&ud("sprint-detail-view")?vi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):ud("sprints-view")&&dn().catch(t=>console.error("Failed to reload sprints:",t))}function l0(e,{type:t}={}){hs(A(),"sprints"),Em(),A()==="sprints"?na():A()==="my-issues"&&os(),t==="created"?$(`New sprint: ${e.name}`,"info"):t==="closed"&&$(`Sprint ${e.name} closed`,"info")}function c0(){const e=A();ul(),ki(),e==="issues"?At().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Jn().catch(n=>console.error("Failed to resync my issues:",n)),os().catch(n=>console.error("Failed to resync sprint status:",n)),ei({showLoading:!1})):e==="board"?ea():e==="sprints"?na():e==="epics"?vn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?ft().then(()=>{A()==="projects"&&Pn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?sm():e==="approvals"?Bt():e==="inbox"&&js({background:!0});const t=pd();t&&Gn(t)}const d0='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Og(e){return Array.from(e.querySelectorAll(d0)).filter(t=>!t.closest(".hidden, [hidden]"))}function Hg(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function u0(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Hg(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=Og(t);n&&n.focus()}}}function Yo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Hg(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=Og(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Yo()});async function p0(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=K();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=X().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Qe([r,...te()]),ut();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await v.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=te();d.some(u=>u.id===c.id)?Qe(d.filter(u=>u.id!==a)):d.some(u=>u.id===a)&&Qe(d.map(u=>u.id===a?c:u)),ut(),ft(),$("Issue created!","success")}catch(c){Qe(te().filter(d=>d.id!==a)),ut(),k("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Xk({beforeScrollRestore:il,beforeNavigate:()=>{L$(),qk(),Mm(null),Zn(null),wu(null),Yo(),dd()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return cg(e[1]),!0;if(e[0]==="issue"&&e[1])return io(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(io(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(E0(e[1]),!0):e[0]==="sprint"&&e[1]?(z$(e[1]),!0):e[0]==="people"&&e[1]?(Go(decodeURIComponent(e[1]),!1),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Om(e[1]),!0):!1},detailPopstate:e=>e.epicId?(No(e.epicId,!1),!0):e.issueId?(oe(e.issueId,!1),!0):e.identifier?(io(e.identifier),!0):e.documentId?(Le(e.documentId,!1),!0):e.sprintId?(vi(e.sprintId,!1),!0):e.personId?(Go(e.personId,!1),!0):!1,restoreProject:()=>{const e=Zl();e&&X().some(t=>t.id===e)&&lt(e)},issueNavigate:e=>io(e),epicNavigate:e=>cg(e)}),Zk({"my-issues":()=>{os(),Jn(),ei()},approvals:()=>{Bt()},inbox:()=>{js({focusFirst:!0})},issues:()=>{var r;Ty(),Dy(),Ry();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Ln().length>0||An().length>0;s||At();const a=tp().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Aa())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),Ca())}}),o=$p().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>At()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{Bx()},epics:()=>{vn({fromMemory:!0})},board:()=>{ea({fromMemory:!0})},projects:()=>{Pn(),ft().then(Pn)},sprints:()=>{dn({fromMemory:!0})},rituals:()=>{ck()},documents:()=>{Rn(null,null,{fromMemory:!0})},people:td,team:()=>{vc(),gf(),xo()},settings:()=>{Mc(),Gf(),zf(),Ua()}});function m0(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||H()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>H())}function f0(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Hm(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Hk());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Fk()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>Fm(a))})}function g0(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>nm("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>nm("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>im());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Uw());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Vt())}function h0(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Ou())}function v0(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>jy());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>gy());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>hy()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Ma("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Ma("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Ma("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Ma("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>ja())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ra())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Jr())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>el())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Pa())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>qa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>it());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>it());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>it());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>At());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>Sp());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>p0(g))}function b0(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>uk(t.dataset.tab))})}function y0(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>mf());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>rs()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),q(o.dataset.view),r.detail>0&&dg())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>jE());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Yo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>u0());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>rs())}ie({"navigate-to":(e,t)=>{q(t.view)},"set-current-project":(e,t,n)=>{lt(n.value)},showCreateIssueModal:()=>rs(),showCreateEpicModal:()=>Hx(),"retry-load-epics":()=>vn(),showCreateProjectModal:()=>qm(),showCreateDocumentModal:()=>rm(),showCreateTeamModal:()=>yf(),showEditTeamModal:()=>QE(),showInviteModal:()=>hf(),showCreateApiKeyModal:()=>Z_(),showCreateAgentModal:()=>$w(),resetOnboarding:()=>If(),logout:()=>Uf(),navigateToProjects:()=>q("projects")});async function w0(){if(!v.getToken()){await qf();return}Ym();const e=v.getMyTeams();e.catch(()=>{});const t=v.getMe(),n=await Dv(uu(v.getToken()));if(n){t.then(i=>{It(i),Lo()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){v.logout(),await Ir(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),$("Showing saved data — check your connection and reload","error")}),It(n.user),await Hn({teamsRequest:e,snapshot:n});return}try{const i=await t;It(i),await Hn({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){v.logout(),await qf();return}console.error("Failed to load current user on boot:",i),zs(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{tb(),Y_(),y0(),m0(),h0(),v0(),b0(),f0(),g0(),$0(),tI(),k0(),RI({api:v}),VI(),await w0()});function $0(){const e=document.getElementById("theme-toggle");if(!e)return;const t=fv()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),gv(n?"light":"dark")})}function k0(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");rc(i)}}})}async function E0(e){try{await Le(e,!1)}catch{q("documents",!1)}}document.addEventListener("keydown",zx({getCurrentView:A,getSelectedIndex:hu,setSelectedIndex:_n,viewIssue:oe,showEditIssueModal:cm,showInlineDropdown:Yr,isInlineDropdownOpen:ni,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn,beforeNavigate:il})),document.addEventListener("keydown",Vx({getCurrentView:A,getSelectedIndex:Gv,setSelectedIndex:vu,viewDocument:Le,showEditDocumentModal:lm,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Kx({getCurrentView:A,getSelectedIndex:bu,setSelectedIndex:ba,viewIssue:oe,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Wx({getCurrentView:A,getSelectedIndex:zv,setSelectedIndex:ya,toggleInboxExpand:TE,collapseInboxExpand:gE,archiveInboxEntry:SE,isInlineDropdownOpen:ni,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Yx()),document.addEventListener("keydown",Yc({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&vi(e.dataset.sprintId)},getCurrentView:A,getSelectedIndex:Vv,setSelectedIndex:yu,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Yc({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Qm(e.dataset.identifier)},getCurrentView:A,getSelectedIndex:Wv,setSelectedIndex:Dr,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Yc({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:A,getSelectedIndex:kb,setSelectedIndex:Eb,isInlineDropdownOpen:ni,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn}));function Fg(){var e;q("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function _0(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||!!document.querySelector("#issue-detail-view details.related-add[open]")||Nw()}document.addEventListener("keydown",Ux({closeModal:H,closeSidebar:Yo,navigateTo:q,showCreateIssueModal:rs,showKeyboardShortcutsHelp:Yf,isModalOpen:tt,focusSearch:Fg,isInlineDropdownOpen:ni,closeInlineDropdowns:Hv,isModalDirty:Nv,focusModalField:pu,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Bn();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:_0,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),rx([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>q("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>q("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>q("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>q("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>q("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>q("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>q("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>q("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>q("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>q("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>q("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>q("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{q("issues"),setTimeout(rs,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{q("projects"),setTimeout(qm,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{q("documents"),setTimeout(rm,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>yf(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Fg,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{q("team"),setTimeout(hf,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Yf(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>If(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Uf(),category:"Account"}]),document.addEventListener("keydown",Gx({isModalOpen:tt,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:hn,openCommandPalette:lx,closeCommandPalette:Bo})),window.marked=Y,window.DOMPurify=nu,console.log("Chaotic frontend loaded via Vite")})();
