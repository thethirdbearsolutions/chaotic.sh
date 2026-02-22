var $f=Object.defineProperty;var Ef=(We,fe,kt)=>fe in We?$f(We,fe,{enumerable:!0,configurable:!0,writable:!0,value:kt}):We[fe]=kt;var J=(We,fe,kt)=>Ef(We,typeof fe!="symbol"?fe+"":fe,kt);(function(){"use strict";var Fa;function We(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var fe=We();function kt(e){fe=e}var rn={exec:()=>null};function K(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(he.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var he={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},rc=/^(?:[ \t]*(?:\n|$))+/,lc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,cc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ln=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,dc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ni=/(?:[*+-]|\d{1,9}[.)])/,so=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,io=K(so).replace(/bull/g,ni).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),uc=K(so).replace(/bull/g,ni).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),si=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,pc=/^[^\n]+/,ii=/(?!\s*\])(?:\\.|[^\[\]\\])+/,mc=K(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ii).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),gc=K(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ni).getRegex(),Wn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ai=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,fc=K("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ai).replace("tag",Wn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ao=K(si).replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex(),hc=K(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ao).getRegex(),oi={blockquote:hc,code:lc,def:mc,fences:cc,heading:dc,hr:ln,html:fc,lheading:io,list:gc,newline:rc,paragraph:ao,table:rn,text:pc},oo=K("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex(),vc={...oi,lheading:uc,table:oo,paragraph:K(si).replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",oo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex()},bc={...oi,html:K(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ai).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:rn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:K(si).replace("hr",ln).replace("heading",` *#{1,6} *[^
]`).replace("lheading",io).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},yc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,wc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ro=/^( {2,}|\\)\n(?!\s*$)/,kc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Vn=/[\p{P}\p{S}]/u,ri=/[\s\p{P}\p{S}]/u,lo=/[^\s\p{P}\p{S}]/u,$c=K(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ri).getRegex(),co=/(?!~)[\p{P}\p{S}]/u,Ec=/(?!~)[\s\p{P}\p{S}]/u,Ic=/(?:[^\s\p{P}\p{S}]|~)/u,_c=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,uo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Tc=K(uo,"u").replace(/punct/g,Vn).getRegex(),xc=K(uo,"u").replace(/punct/g,co).getRegex(),po="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sc=K(po,"gu").replace(/notPunctSpace/g,lo).replace(/punctSpace/g,ri).replace(/punct/g,Vn).getRegex(),Lc=K(po,"gu").replace(/notPunctSpace/g,Ic).replace(/punctSpace/g,Ec).replace(/punct/g,co).getRegex(),Cc=K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,lo).replace(/punctSpace/g,ri).replace(/punct/g,Vn).getRegex(),Ac=K(/\\(punct)/,"gu").replace(/punct/g,Vn).getRegex(),Bc=K(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Dc=K(ai).replace("(?:-->|$)","-->").getRegex(),jc=K("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Dc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Jn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Mc=K(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Jn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),mo=K(/^!?\[(label)\]\[(ref)\]/).replace("label",Jn).replace("ref",ii).getRegex(),go=K(/^!?\[(ref)\](?:\[\])?/).replace("ref",ii).getRegex(),Pc=K("reflink|nolink(?!\\()","g").replace("reflink",mo).replace("nolink",go).getRegex(),li={_backpedal:rn,anyPunctuation:Ac,autolink:Bc,blockSkip:_c,br:ro,code:wc,del:rn,emStrongLDelim:Tc,emStrongRDelimAst:Sc,emStrongRDelimUnd:Cc,escape:yc,link:Mc,nolink:go,punctuation:$c,reflink:mo,reflinkSearch:Pc,tag:jc,text:kc,url:rn},Rc={...li,link:K(/^!?\[(label)\]\((.*?)\)/).replace("label",Jn).getRegex(),reflink:K(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Jn).getRegex()},ci={...li,emStrongRDelimAst:Lc,emStrongLDelim:xc,url:K(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Nc={...ci,br:K(ro).replace("{2,}","*").getRegex(),text:K(ci.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Yn={normal:oi,gfm:vc,pedantic:bc},cn={normal:li,gfm:ci,breaks:Nc,pedantic:Rc},Hc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},fo=e=>Hc[e];function He(e,t){if(t){if(he.escapeTest.test(e))return e.replace(he.escapeReplace,fo)}else if(he.escapeTestNoEncode.test(e))return e.replace(he.escapeReplaceNoEncode,fo);return e}function ho(e){try{e=encodeURI(e).replace(he.percentDecode,"%")}catch{return null}return e}function vo(e,t){var a;const n=e.replace(he.findPipe,(o,r,c)=>{let d=!1,l=r;for(;--l>=0&&c[l]==="\\";)d=!d;return d?"|":" |"}),s=n.split(he.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(he.slashPipe,"|");return s}function dn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function qc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function bo(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function Oc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var Zn=class{constructor(e){J(this,"options");J(this,"rules");J(this,"lexer");this.options=e||fe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:dn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Oc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=dn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:dn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=dn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const d=r.join(`
`),l=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${d}`:d,i=i?`${i}
${l}`:l;const m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,a,!0),this.lexer.state.top=m,n.length===0)break;const u=a.at(-1);if((u==null?void 0:u.type)==="code")break;if((u==null?void 0:u.type)==="blockquote"){const g=u,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,s=s.substring(0,s.length-g.raw.length)+y.raw,i=i.substring(0,i.length-g.text.length)+y.text;break}else if((u==null?void 0:u.type)==="list"){const g=u,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,s=s.substring(0,s.length-u.raw.length)+y.raw,i=i.substring(0,i.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,d="",l="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),u=e.split(`
`,1)[0],g=!m.trim(),b=0;if(this.options.pedantic?(b=2,l=m.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,l=m.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(u)&&(d+=u+`
`,e=e.substring(u.length+1),c=!0),!c){const L=this.rules.other.nextBulletRegex(b),N=this.rules.other.hrRegex(b),q=this.rules.other.fencesBeginRegex(b),j=this.rules.other.headingBeginRegex(b),O=this.rules.other.htmlBeginRegex(b);for(;e;){const C=e.split(`
`,1)[0];let z;if(u=C,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),z=u):z=u.replace(this.rules.other.tabCharGlobal,"    "),q.test(u)||j.test(u)||O.test(u)||L.test(u)||N.test(u))break;if(z.search(this.rules.other.nonSpaceChar)>=b||!u.trim())l+=`
`+z.slice(b);else{if(g||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||q.test(m)||j.test(m)||N.test(m))break;l+=`
`+u}!g&&!u.trim()&&(g=!0),d+=C+`
`,e=e.substring(C.length+1),m=z.slice(b)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0));let y=null,x;this.options.gfm&&(y=this.rules.other.listIsTask.exec(l),y&&(x=y[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:d,task:!!y,checked:x,loose:!1,text:l,tokens:[]}),i.raw+=d}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const d=i.items[c].tokens.filter(m=>m.type==="space"),l=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=l}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=vo(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(vo(r,a.header.length).map((c,d)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[d]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=dn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=qc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),bo(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return bo(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,d=0;const l=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+a);(s=l.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){d+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+d);const m=[...s[0]][0].length,u=e.slice(0,a+s.index+m+r);if(Math.min(a,r)%2){const b=u.slice(1,-1);return{type:"em",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}const g=u.slice(2,-2);return{type:"strong",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ve=class to{constructor(t){J(this,"tokens");J(this,"options");J(this,"state");J(this,"tokenizer");J(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||fe,this.options.tokenizer=this.options.tokenizer||new Zn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:he,block:Yn.normal,inline:cn.normal};this.options.pedantic?(n.block=Yn.pedantic,n.inline=cn.pedantic):this.options.gfm&&(n.block=Yn.gfm,this.options.breaks?n.inline=cn.breaks:n.inline=cn.gfm),this.tokenizer.rules=n}static get rules(){return{block:Yn,inline:cn}}static lex(t,n){return new to(n).lex(t)}static lexInline(t,n){return new to(n).inlineTokens(t)}lex(t){t=t.replace(he.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(he.tabCharGlobal,"    ").replace(he.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(d=>(r=d.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const d=n.at(-1);r.raw.length===1&&d!==void 0?d.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let d=1/0;const l=t.slice(1);let m;this.options.extensions.startBlock.forEach(u=>{m=u.call({lexer:this},l),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const d=n.at(-1);s&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(t){const d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,d;let s=t,i=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(u=>(l=u.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);const u=n.at(-1);l.type==="text"&&(u==null?void 0:u.type)==="text"?(u.raw+=l.raw,u.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,s,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let m=t;if((d=this.options.extensions)!=null&&d.startInline){let u=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(m=t.substring(0,u+1))}if(l=this.tokenizer.inlineText(m)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;const u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=l.raw,u.text+=l.text):n.push(l);continue}if(t){const u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Xn=class{constructor(e){J(this,"options");J(this,"parser");this.options=e||fe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(he.notSpaceStart))==null?void 0:a[0],i=e.replace(he.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${He(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=ho(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+He(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=ho(e);if(i===null)return He(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${He(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:He(e.text)}},di=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Je=class no{constructor(t){J(this,"options");J(this,"renderer");J(this,"textRenderer");this.options=t||fe,this.options.renderer=this.options.renderer||new Xn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new di}static parse(t,n){return new no(n).parse(t)}static parseInline(t,n){return new no(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const d=r,l=this.options.extensions.renderers[d.type].call({parser:this},d);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type)){s+=l||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let d=c,l=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],l+=`
`+this.renderer.text(d);n?s+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):s+=l;continue}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const d=this.options.extensions.renderers[r.type].call({parser:this},r);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=d||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return s}},Qn=(Fa=class{constructor(e){J(this,"options");J(this,"block");this.options=e||fe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ve.lex:Ve.lexInline}provideParser(){return this.block?Je.parse:Je.parseInline}},J(Fa,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Fa),Fc=class{constructor(...e){J(this,"defaults",We());J(this,"options",this.setOptions);J(this,"parse",this.parseMarkdown(!0));J(this,"parseInline",this.parseMarkdown(!1));J(this,"Parser",Je);J(this,"Renderer",Xn);J(this,"TextRenderer",di);J(this,"Lexer",Ve);J(this,"Tokenizer",Zn);J(this,"Hooks",Qn);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Xn(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Zn(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new Qn;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];Qn.passThroughHooks.has(a)?i[o]=d=>{if(this.defaults.async)return Promise.resolve(r.call(i,d)).then(m=>c.call(i,m));const l=r.call(i,d);return c.call(i,l)}:i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ve.lex(e,t??this.defaults)}parser(e,t){return Je.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ve.lex:Ve.lexInline,c=a.hooks?a.hooks.provideParser():e?Je.parse:Je.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(d=>r(d,a)).then(d=>a.hooks?a.hooks.processAllTokens(d):d).then(d=>a.walkTokens?Promise.all(this.walkTokens(d,a.walkTokens)).then(()=>d):d).then(d=>c(d,a)).then(d=>a.hooks?a.hooks.postprocess(d):d).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let d=r(n,a);a.hooks&&(d=a.hooks.processAllTokens(d)),a.walkTokens&&this.walkTokens(d,a.walkTokens);let l=c(d,a);return a.hooks&&(l=a.hooks.postprocess(l)),l}catch(d){return o(d)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+He(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},$t=new Fc;function U(e,t){return $t.parse(e,t)}U.options=U.setOptions=function(e){return $t.setOptions(e),U.defaults=$t.defaults,kt(U.defaults),U},U.getDefaults=We,U.defaults=fe,U.use=function(...e){return $t.use(...e),U.defaults=$t.defaults,kt(U.defaults),U},U.walkTokens=function(e,t){return $t.walkTokens(e,t)},U.parseInline=$t.parseInline,U.Parser=Je,U.parser=Je.parse,U.Renderer=Xn,U.TextRenderer=di,U.Lexer=Ve,U.lexer=Ve.lex,U.Tokenizer=Zn,U.Hooks=Qn,U.parse=U,U.options,U.setOptions,U.use,U.walkTokens,U.parseInline,Je.parse,Ve.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:yo,setPrototypeOf:wo,isFrozen:Uc,getPrototypeOf:Gc,getOwnPropertyDescriptor:zc}=Object;let{freeze:ve,seal:Le,create:ui}=Object,{apply:pi,construct:mi}=typeof Reflect<"u"&&Reflect;ve||(ve=function(t){return t}),Le||(Le=function(t){return t}),pi||(pi=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),mi||(mi=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const es=ye(Array.prototype.forEach),Kc=ye(Array.prototype.lastIndexOf),ko=ye(Array.prototype.pop),un=ye(Array.prototype.push),Wc=ye(Array.prototype.splice),ts=ye(String.prototype.toLowerCase),gi=ye(String.prototype.toString),fi=ye(String.prototype.match),pn=ye(String.prototype.replace),Vc=ye(String.prototype.indexOf),Jc=ye(String.prototype.trim),Be=ye(Object.prototype.hasOwnProperty),be=ye(RegExp.prototype.test),mn=Yc(TypeError);function ye(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return pi(e,t,s)}}function Yc(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return mi(e,n)}}function R(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ts;wo&&wo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Uc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function Zc(e){for(let t=0;t<e.length;t++)Be(e,t)||(e[t]=null);return e}function qe(e){const t=ui(null);for(const[n,s]of yo(e))Be(e,n)&&(Array.isArray(s)?t[n]=Zc(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=qe(s):t[n]=s);return t}function gn(e,t){for(;e!==null;){const s=zc(e,t);if(s){if(s.get)return ye(s.get);if(typeof s.value=="function")return ye(s.value)}e=Gc(e)}function n(){return null}return n}const $o=ve(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hi=ve(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),vi=ve(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xc=ve(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),bi=ve(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Qc=ve(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Eo=ve(["#text"]),Io=ve(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yi=ve(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),_o=ve(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ns=ve(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ed=Le(/\{\{[\w\W]*|[\w\W]*\}\}/gm),td=Le(/<%[\w\W]*|[\w\W]*%>/gm),nd=Le(/\$\{[\w\W]*/gm),sd=Le(/^data-[\-\w.\u00B7-\uFFFF]+$/),id=Le(/^aria-[\-\w]+$/),To=Le(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ad=Le(/^(?:\w+script|data):/i),od=Le(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xo=Le(/^html$/i),rd=Le(/^[a-z][.\w]*(-[.\w]+)+$/i);var So=Object.freeze({__proto__:null,ARIA_ATTR:id,ATTR_WHITESPACE:od,CUSTOM_ELEMENT:rd,DATA_ATTR:sd,DOCTYPE_NAME:xo,ERB_EXPR:td,IS_ALLOWED_URI:To,IS_SCRIPT_OR_DATA:ad,MUSTACHE_EXPR:ed,TMPLIT_EXPR:nd});const fn={element:1,text:3,progressingInstruction:7,comment:8,document:9},ld=function(){return typeof window>"u"?null:window},cd=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Lo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Co(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ld();const t=S=>Co(S);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==fn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:d,NamedNodeMap:l=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:u,trustedTypes:g}=e,b=c.prototype,y=gn(b,"cloneNode"),x=gn(b,"remove"),L=gn(b,"nextSibling"),N=gn(b,"childNodes"),q=gn(b,"parentNode");if(typeof o=="function"){const S=n.createElement("template");S.content&&S.content.ownerDocument&&(n=S.content.ownerDocument)}let j,O="";const{implementation:C,createNodeIterator:z,createDocumentFragment:V,getElementsByTagName:P}=n,{importNode:A}=s;let F=Lo();t.isSupported=typeof yo=="function"&&typeof q=="function"&&C&&C.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Z,ERB_EXPR:X,TMPLIT_EXPR:Ee,DATA_ATTR:k,ARIA_ATTR:Ne,IS_SCRIPT_OR_DATA:re,ATTR_WHITESPACE:wt,CUSTOM_ELEMENT:mf}=So;let{IS_ALLOWED_URI:Nl}=So,ce=null;const Hl=R({},[...$o,...hi,...vi,...bi,...Eo]);let de=null;const ql=R({},[...Io,...yi,..._o,...ns]);let ne=Object.seal(ui(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Gn=null,Ua=null;const Qt=Object.seal(ui(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ol=!0,Ga=!0,Fl=!1,Ul=!0,en=!1,Js=!0,At=!1,za=!1,Ka=!1,tn=!1,Ys=!1,Zs=!1,Gl=!0,zl=!1;const gf="user-content-";let Wa=!0,zn=!1,nn={},ze=null;const Va=R({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Kl=null;const Wl=R({},["audio","video","img","source","image","track"]);let Ja=null;const Vl=R({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Xs="http://www.w3.org/1998/Math/MathML",Qs="http://www.w3.org/2000/svg",ct="http://www.w3.org/1999/xhtml";let sn=ct,Ya=!1,Za=null;const ff=R({},[Xs,Qs,ct],gi);let ei=R({},["mi","mo","mn","ms","mtext"]),ti=R({},["annotation-xml"]);const hf=R({},["title","style","font","a","script"]);let Kn=null;const vf=["application/xhtml+xml","text/html"],bf="text/html";let le=null,an=null;const yf=n.createElement("form"),Jl=function(p){return p instanceof RegExp||p instanceof Function},Xa=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(an&&an===p)){if((!p||typeof p!="object")&&(p={}),p=qe(p),Kn=vf.indexOf(p.PARSER_MEDIA_TYPE)===-1?bf:p.PARSER_MEDIA_TYPE,le=Kn==="application/xhtml+xml"?gi:ts,ce=Be(p,"ALLOWED_TAGS")?R({},p.ALLOWED_TAGS,le):Hl,de=Be(p,"ALLOWED_ATTR")?R({},p.ALLOWED_ATTR,le):ql,Za=Be(p,"ALLOWED_NAMESPACES")?R({},p.ALLOWED_NAMESPACES,gi):ff,Ja=Be(p,"ADD_URI_SAFE_ATTR")?R(qe(Vl),p.ADD_URI_SAFE_ATTR,le):Vl,Kl=Be(p,"ADD_DATA_URI_TAGS")?R(qe(Wl),p.ADD_DATA_URI_TAGS,le):Wl,ze=Be(p,"FORBID_CONTENTS")?R({},p.FORBID_CONTENTS,le):Va,Gn=Be(p,"FORBID_TAGS")?R({},p.FORBID_TAGS,le):qe({}),Ua=Be(p,"FORBID_ATTR")?R({},p.FORBID_ATTR,le):qe({}),nn=Be(p,"USE_PROFILES")?p.USE_PROFILES:!1,Ol=p.ALLOW_ARIA_ATTR!==!1,Ga=p.ALLOW_DATA_ATTR!==!1,Fl=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Ul=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,en=p.SAFE_FOR_TEMPLATES||!1,Js=p.SAFE_FOR_XML!==!1,At=p.WHOLE_DOCUMENT||!1,tn=p.RETURN_DOM||!1,Ys=p.RETURN_DOM_FRAGMENT||!1,Zs=p.RETURN_TRUSTED_TYPE||!1,Ka=p.FORCE_BODY||!1,Gl=p.SANITIZE_DOM!==!1,zl=p.SANITIZE_NAMED_PROPS||!1,Wa=p.KEEP_CONTENT!==!1,zn=p.IN_PLACE||!1,Nl=p.ALLOWED_URI_REGEXP||To,sn=p.NAMESPACE||ct,ei=p.MATHML_TEXT_INTEGRATION_POINTS||ei,ti=p.HTML_INTEGRATION_POINTS||ti,ne=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Jl(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ne.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Jl(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ne.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ne.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),en&&(Ga=!1),Ys&&(tn=!0),nn&&(ce=R({},Eo),de=[],nn.html===!0&&(R(ce,$o),R(de,Io)),nn.svg===!0&&(R(ce,hi),R(de,yi),R(de,ns)),nn.svgFilters===!0&&(R(ce,vi),R(de,yi),R(de,ns)),nn.mathMl===!0&&(R(ce,bi),R(de,_o),R(de,ns))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Qt.tagCheck=p.ADD_TAGS:(ce===Hl&&(ce=qe(ce)),R(ce,p.ADD_TAGS,le))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Qt.attributeCheck=p.ADD_ATTR:(de===ql&&(de=qe(de)),R(de,p.ADD_ATTR,le))),p.ADD_URI_SAFE_ATTR&&R(Ja,p.ADD_URI_SAFE_ATTR,le),p.FORBID_CONTENTS&&(ze===Va&&(ze=qe(ze)),R(ze,p.FORBID_CONTENTS,le)),p.ADD_FORBID_CONTENTS&&(ze===Va&&(ze=qe(ze)),R(ze,p.ADD_FORBID_CONTENTS,le)),Wa&&(ce["#text"]=!0),At&&R(ce,["html","head","body"]),ce.table&&(R(ce,["tbody"]),delete Gn.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw mn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw mn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=p.TRUSTED_TYPES_POLICY,O=j.createHTML("")}else j===void 0&&(j=cd(g,i)),j!==null&&typeof O=="string"&&(O=j.createHTML(""));ve&&ve(p),an=p}},Yl=R({},[...hi,...vi,...Xc]),Zl=R({},[...bi,...Qc]),wf=function(p){let E=q(p);(!E||!E.tagName)&&(E={namespaceURI:sn,tagName:"template"});const T=ts(p.tagName),ee=ts(E.tagName);return Za[p.namespaceURI]?p.namespaceURI===Qs?E.namespaceURI===ct?T==="svg":E.namespaceURI===Xs?T==="svg"&&(ee==="annotation-xml"||ei[ee]):!!Yl[T]:p.namespaceURI===Xs?E.namespaceURI===ct?T==="math":E.namespaceURI===Qs?T==="math"&&ti[ee]:!!Zl[T]:p.namespaceURI===ct?E.namespaceURI===Qs&&!ti[ee]||E.namespaceURI===Xs&&!ei[ee]?!1:!Zl[T]&&(hf[T]||!Yl[T]):!!(Kn==="application/xhtml+xml"&&Za[p.namespaceURI]):!1},Ke=function(p){un(t.removed,{element:p});try{q(p).removeChild(p)}catch{x(p)}},Bt=function(p,E){try{un(t.removed,{attribute:E.getAttributeNode(p),from:E})}catch{un(t.removed,{attribute:null,from:E})}if(E.removeAttribute(p),p==="is")if(tn||Ys)try{Ke(E)}catch{}else try{E.setAttribute(p,"")}catch{}},Xl=function(p){let E=null,T=null;if(Ka)p="<remove></remove>"+p;else{const se=fi(p,/^[\r\n\t ]+/);T=se&&se[0]}Kn==="application/xhtml+xml"&&sn===ct&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");const ee=j?j.createHTML(p):p;if(sn===ct)try{E=new u().parseFromString(ee,Kn)}catch{}if(!E||!E.documentElement){E=C.createDocument(sn,"template",null);try{E.documentElement.innerHTML=Ya?O:ee}catch{}}const ge=E.body||E.documentElement;return p&&T&&ge.insertBefore(n.createTextNode(T),ge.childNodes[0]||null),sn===ct?P.call(E,At?"html":"body")[0]:At?E.documentElement:ge},Ql=function(p){return z.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Qa=function(p){return p instanceof m&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof l)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},ec=function(p){return typeof r=="function"&&p instanceof r};function dt(S,p,E){es(S,T=>{T.call(t,p,E,an)})}const tc=function(p){let E=null;if(dt(F.beforeSanitizeElements,p,null),Qa(p))return Ke(p),!0;const T=le(p.nodeName);if(dt(F.uponSanitizeElement,p,{tagName:T,allowedTags:ce}),Js&&p.hasChildNodes()&&!ec(p.firstElementChild)&&be(/<[/\w!]/g,p.innerHTML)&&be(/<[/\w!]/g,p.textContent)||p.nodeType===fn.progressingInstruction||Js&&p.nodeType===fn.comment&&be(/<[/\w]/g,p.data))return Ke(p),!0;if(!(Qt.tagCheck instanceof Function&&Qt.tagCheck(T))&&(!ce[T]||Gn[T])){if(!Gn[T]&&sc(T)&&(ne.tagNameCheck instanceof RegExp&&be(ne.tagNameCheck,T)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(T)))return!1;if(Wa&&!ze[T]){const ee=q(p)||p.parentNode,ge=N(p)||p.childNodes;if(ge&&ee){const se=ge.length;for(let Ie=se-1;Ie>=0;--Ie){const ut=y(ge[Ie],!0);ut.__removalCount=(p.__removalCount||0)+1,ee.insertBefore(ut,L(p))}}}return Ke(p),!0}return p instanceof c&&!wf(p)||(T==="noscript"||T==="noembed"||T==="noframes")&&be(/<\/no(script|embed|frames)/i,p.innerHTML)?(Ke(p),!0):(en&&p.nodeType===fn.text&&(E=p.textContent,es([Z,X,Ee],ee=>{E=pn(E,ee," ")}),p.textContent!==E&&(un(t.removed,{element:p.cloneNode()}),p.textContent=E)),dt(F.afterSanitizeElements,p,null),!1)},nc=function(p,E,T){if(Gl&&(E==="id"||E==="name")&&(T in n||T in yf))return!1;if(!(Ga&&!Ua[E]&&be(k,E))){if(!(Ol&&be(Ne,E))){if(!(Qt.attributeCheck instanceof Function&&Qt.attributeCheck(E,p))){if(!de[E]||Ua[E]){if(!(sc(p)&&(ne.tagNameCheck instanceof RegExp&&be(ne.tagNameCheck,p)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(p))&&(ne.attributeNameCheck instanceof RegExp&&be(ne.attributeNameCheck,E)||ne.attributeNameCheck instanceof Function&&ne.attributeNameCheck(E,p))||E==="is"&&ne.allowCustomizedBuiltInElements&&(ne.tagNameCheck instanceof RegExp&&be(ne.tagNameCheck,T)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(T))))return!1}else if(!Ja[E]){if(!be(Nl,pn(T,wt,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&p!=="script"&&Vc(T,"data:")===0&&Kl[p])){if(!(Fl&&!be(re,pn(T,wt,"")))){if(T)return!1}}}}}}}return!0},sc=function(p){return p!=="annotation-xml"&&fi(p,mf)},ic=function(p){dt(F.beforeSanitizeAttributes,p,null);const{attributes:E}=p;if(!E||Qa(p))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0};let ee=E.length;for(;ee--;){const ge=E[ee],{name:se,namespaceURI:Ie,value:ut}=ge,on=le(se),eo=ut;let ue=se==="value"?eo:Jc(eo);if(T.attrName=on,T.attrValue=ue,T.keepAttr=!0,T.forceKeepAttr=void 0,dt(F.uponSanitizeAttribute,p,T),ue=T.attrValue,zl&&(on==="id"||on==="name")&&(Bt(se,p),ue=gf+ue),Js&&be(/((--!?|])>)|<\/(style|title|textarea)/i,ue)){Bt(se,p);continue}if(on==="attributename"&&fi(ue,"href")){Bt(se,p);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){Bt(se,p);continue}if(!Ul&&be(/\/>/i,ue)){Bt(se,p);continue}en&&es([Z,X,Ee],oc=>{ue=pn(ue,oc," ")});const ac=le(p.nodeName);if(!nc(ac,on,ue)){Bt(se,p);continue}if(j&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Ie)switch(g.getAttributeType(ac,on)){case"TrustedHTML":{ue=j.createHTML(ue);break}case"TrustedScriptURL":{ue=j.createScriptURL(ue);break}}if(ue!==eo)try{Ie?p.setAttributeNS(Ie,se,ue):p.setAttribute(se,ue),Qa(p)?Ke(p):ko(t.removed)}catch{Bt(se,p)}}dt(F.afterSanitizeAttributes,p,null)},kf=function S(p){let E=null;const T=Ql(p);for(dt(F.beforeSanitizeShadowDOM,p,null);E=T.nextNode();)dt(F.uponSanitizeShadowNode,E,null),tc(E),ic(E),E.content instanceof a&&S(E.content);dt(F.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(S){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,T=null,ee=null,ge=null;if(Ya=!S,Ya&&(S="<!-->"),typeof S!="string"&&!ec(S))if(typeof S.toString=="function"){if(S=S.toString(),typeof S!="string")throw mn("dirty is not a string, aborting")}else throw mn("toString is not a function");if(!t.isSupported)return S;if(za||Xa(p),t.removed=[],typeof S=="string"&&(zn=!1),zn){if(S.nodeName){const ut=le(S.nodeName);if(!ce[ut]||Gn[ut])throw mn("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof r)E=Xl("<!---->"),T=E.ownerDocument.importNode(S,!0),T.nodeType===fn.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?E=T:E.appendChild(T);else{if(!tn&&!en&&!At&&S.indexOf("<")===-1)return j&&Zs?j.createHTML(S):S;if(E=Xl(S),!E)return tn?null:Zs?O:""}E&&Ka&&Ke(E.firstChild);const se=Ql(zn?S:E);for(;ee=se.nextNode();)tc(ee),ic(ee),ee.content instanceof a&&kf(ee.content);if(zn)return S;if(tn){if(Ys)for(ge=V.call(E.ownerDocument);E.firstChild;)ge.appendChild(E.firstChild);else ge=E;return(de.shadowroot||de.shadowrootmode)&&(ge=A.call(s,ge,!0)),ge}let Ie=At?E.outerHTML:E.innerHTML;return At&&ce["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&be(xo,E.ownerDocument.doctype.name)&&(Ie="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+Ie),en&&es([Z,X,Ee],ut=>{Ie=pn(Ie,ut," ")}),j&&Zs?j.createHTML(Ie):Ie},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Xa(S),za=!0},t.clearConfig=function(){an=null,za=!1},t.isValidAttribute=function(S,p,E){an||Xa({});const T=le(S),ee=le(p);return nc(T,ee,E)},t.addHook=function(S,p){typeof p=="function"&&un(F[S],p)},t.removeHook=function(S,p){if(p!==void 0){const E=Kc(F[S],p);return E===-1?void 0:Wc(F[S],E,1)[0]}return ko(F[S])},t.removeHooks=function(S){F[S]=[]},t.removeAllHooks=function(){F=Lo()},t}var Ao=Co();const wi="chaotic_";function De(e){try{return localStorage.getItem(wi+e)}catch{return null}}function je(e,t){try{localStorage.setItem(wi+e,t)}catch{}}function Ye(e){try{localStorage.removeItem(wi+e)}catch{}}function dd(){return De("token")}function ud(e){e?je("token",e):Ye("token")}function pd(){return De("theme")}function md(e){je("theme",e)}function gd(){return De("last_project")}function Bo(e){je("last_project",e)}function fd(){return De("onboarding_complete")==="true"}function hd(){je("onboarding_complete","true")}function vd(){Ye("onboarding_complete")}function bd(e){return e?De(`issues_filters_${e}`):null}function yd(e,t){e&&(t?je(`issues_filters_${e}`,t):Ye(`issues_filters_${e}`))}function wd(e){return De(`comment_draft_${e}`)}function ki(e,t){t?je(`comment_draft_${e}`,t):Ye(`comment_draft_${e}`)}function kd(e){return De(`description_draft_${e}`)}function ss(e,t){t?je(`description_draft_${e}`,t):Ye(`description_draft_${e}`)}function $d(){return{title:De("create_issue_title"),description:De("create_issue_description")}}function Do(e,t){e?je("create_issue_title",e):Ye("create_issue_title"),t?je("create_issue_description",t):Ye("create_issue_description")}function Ed(){Ye("create_issue_title"),Ye("create_issue_description")}function Id(){return De("doc_view_mode")}function _d(e){je("doc_view_mode",e)}function Td(){return De("approvals_explainer_dismissed")==="1"}function xd(){je("approvals_explainer_dismissed","1")}const Sd="/api";class Ld{constructor(){this.token=dd()}setToken(t){this.token=t,ud(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Sd}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const d=new Error(c);throw d.status=o.status,d.detail=r.detail,d}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const $=new Ld;window.api=$;let Dt=null;function H(){document.getElementById("modal-overlay").classList.remove("hidden")}function W(){var e;hn(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function $i(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function v(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function hn(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Dt&&(document.removeEventListener("keydown",Dt),Dt=null)}function Cd(e){Dt&&document.removeEventListener("keydown",Dt),Dt=e,e&&document.addEventListener("keydown",e)}function Ei(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(hn(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}Object.assign(window,{showModal:H,closeModal:W,showToast:v,closeAllDropdowns:hn,registerDropdownClickOutside:Ei});function pt(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ze(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ii(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ke(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function _(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function jt(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function I(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}function is(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function Ad(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function as(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?Ad(s)?`<img class="${t} avatar-img" src="${_(s)}" alt="${_(n)}">`:`<div class="${t} avatar-emoji">${f(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let pe={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentDetailIssue:null,currentDetailSprints:null}};const Bd=new Set;function Ce(e,t){if(typeof e=="string"){const n=pe[e];pe[e]=t,jo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=pe[s];pe[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{jo(s,i,a)})}}function jo(e,t,n){t!==n&&Bd.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const _i=()=>pe.currentUser,Dd=e=>Ce("currentUser",e),G=()=>pe.currentView,jd=e=>Ce("currentView",e),Oe=()=>pe.issues,Xe=e=>Ce("issues",e),Md=()=>pe.labels,Mo=e=>Ce("labels",e),Po=()=>pe.activeFilterCategory,Pd=e=>Ce("activeFilterCategory",e),Rd=()=>pe.selectedIssueIndex,Ro=e=>Ce("selectedIssueIndex",e),Nd=()=>pe.pendingGates,Hd=e=>Ce("pendingGates",e),qd=()=>pe.searchDebounceTimer,Od=e=>Ce("searchDebounceTimer",e),Fd=()=>pe.websocket,No=e=>Ce("websocket",e),B=()=>pe.currentTeam,Ti=e=>Ce("currentTeam",e),Qe=()=>pe.currentDetailIssue,xi=e=>Ce("currentDetailIssue",e),Ud=()=>pe.currentDetailSprints,Ho=e=>Ce("currentDetailSprints",e);let Mt=null,vn=null,Me=null,Pe=null;function bn(){Mt||(Mt=document.getElementById("auth-screen"),vn=document.getElementById("main-screen"),Me=document.getElementById("login-form"),Pe=document.getElementById("signup-form"))}function os(){bn(),Mt&&Mt.classList.remove("hidden"),vn&&vn.classList.add("hidden")}function qo(){bn(),Mt&&Mt.classList.add("hidden"),vn&&vn.classList.remove("hidden")}function Si(){bn(),Me&&Me.classList.remove("hidden"),Pe&&Pe.classList.add("hidden")}function Li(){bn(),Me&&Me.classList.add("hidden"),Pe&&Pe.classList.remove("hidden")}async function Ci(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await $.login(t,n),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),v("Welcome back!","success")}catch(s){v(`Login failed: ${s.message}`,"error")}return!1}async function Ai(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await $.signup(t,n,s),await $.login(n,s),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),v("Account created successfully!","success")}catch(i){v(`Signup failed: ${i.message}`,"error")}return!1}function rs(){$.logout(),window.currentUser=null,Ti(null),os(),v("Signed out","success")}function Oo(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Fo(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Oo(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${_(s)}" alt="${_(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Gd(){bn();const e=Me==null?void 0:Me.querySelector("form");e&&e.addEventListener("submit",i=>Ci(i));const t=Pe==null?void 0:Pe.querySelector("form");t&&t.addEventListener("submit",i=>Ai(i));const n=Me==null?void 0:Me.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),Li()});const s=Pe==null?void 0:Pe.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),Si()})}Object.assign(window,{showAuthScreen:os,showMainScreen:qo,showLogin:Si,showSignup:Li,handleLogin:Ci,handleSignup:Ai,logout:rs,updateUserInfo:Fo,isImageAvatar:Oo});function Uo(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Bi=[],yn=[],Go=null,Q=new Set,Pt="list",Et=!1,Di=null;const ji=Id();(ji==="list"||ji==="grid")&&(Pt=ji);function Mi(e){if(e!=="list"&&e!=="grid")return;Pt=e,e==="grid"&&Et&&ls(),_d(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),et()}function Pi(){if(Pt!=="list")return;Et=!0,Q.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=ls),et(),Nt()}function ls(){Et=!1,Q.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=Pi),et(),Nt()}function zo(){Di&&clearTimeout(Di),Di=setTimeout(()=>{et()},300)}function zd(){const e=document.getElementById("doc-search");e&&(e.value=""),et()}async function Kd(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),await cs()}async function Wd(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),await cs()}function Vd(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),c=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${f(c)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function et(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";Vd(),yn=Bi.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),d=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!d)return!1}return!0}),yn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Ko("",Pt)}async function cs(){var n,s;const e=Go||((n=B())==null?void 0:n.id);if(!e)return;const t=((s=document.getElementById("doc-project-filter"))==null?void 0:s.value)||null;try{Bi=await $.getDocuments(e,t),et()}catch(i){v(i.message,"error")}}async function Rt(e,t=null){var s;if(e||(e=(s=B())==null?void 0:s.id),!e)return;Go=e;const n=document.getElementById("documents-list");if(n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null){const i=document.getElementById("doc-project-filter");i!=null&&i.value&&(t=i.value)}try{Bi=await $.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",Pt==="list"),a.classList.toggle("active",Pt==="grid")),et()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),v(i.message,"error")}}function Jd(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${ke(t.color)}; color: white;">${f(t.name)}</span>`).join(" ")}function Yd(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Jd(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${_(e.id)}" onclick="viewDocument('${I(e.id)}')">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${f(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${f(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?f(Uo(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${f(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Zd(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${ke(r.color)}; color: white;">${f(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Uo(e.content).substring(0,80):"No content",i=Et?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${I(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${Q.has(e.id)?"checked":""}>
       </div>`:"",a=Et&&Q.has(e.id)?" selected":"",o=Et?`toggleDocSelection('${I(e.id)}')`:`viewDocument('${I(e.id)}')`;return`
    <div class="list-item document-list-item${a}" onclick="${o}">
      ${i}
      <div class="document-list-icon">${f(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${f(e.title)}</div>
        <div class="document-list-snippet text-muted">${f(s)}${e.content&&e.content.length>80?"...":""}</div>
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
  `}function Ko(e="",t="list"){var d,l;const n=document.getElementById("documents-list");if(!n)return;Q.clear(),Nt();const s=yn;if(s.length===0){const m=(d=document.getElementById("doc-search"))==null?void 0:d.value,u=(l=document.getElementById("doc-project-filter"))==null?void 0:l.value,g=m||u;n.innerHTML=`
      <div class="empty-state">
        <h3>${g?"No documents match your filters":"No documents yet"}</h3>
        <p>${g?"Try different search terms or filters":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?Yd:Zd,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=window.getProjects?window.getProjects():[];s.forEach(m=>{let u,g;if(e==="project")if(u=m.project_id||"__global__",u==="__global__")g="Global (Team-wide)";else{const b=r.find(y=>y.id===m.project_id);g=b?b.name:"Unknown Project"}else e==="sprint"&&(u=m.sprint_id||"__no_sprint__",g=m.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:g,docs:[]}),o[u].docs.push(m)});let c="";for(const[m,u]of Object.entries(o)){const g=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${g}">
          ${u.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function Xd(e){Q.has(e)?Q.delete(e):Q.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=Q.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",Q.has(e)),Nt()}function Qd(){yn.forEach(e=>Q.add(e.id)),yn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Nt()}function Wo(){Q.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),Q.clear(),Nt()}function Nt(){const e=document.getElementById("doc-bulk-actions");e&&(Et?(e.classList.remove("hidden"),Q.size>0?e.innerHTML=`
        <span class="bulk-count">${Q.size} selected</span>
        <button class="btn btn-secondary btn-small" onclick="showBulkMoveModal()">Move to Project</button>
        <button class="btn btn-danger btn-small" onclick="bulkDeleteDocuments()">Delete</button>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="clearDocSelection()">Clear</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function eu(){if(Q.size===0){v("No documents selected","error");return}const t=(window.getProjects?window.getProjects():[]).map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${Q.size} Document${Q.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleBulkMove(event)">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${Q.size} selected document${Q.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,H()}async function tu(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(Q);let s=0,i=0;for(const r of n)try{await $.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}W(),Wo(),i===0?v(`Moved ${s} document${s>1?"s":""}!`,"success"):v(`Moved ${s}, failed ${i}`,"warning");const a=(o=B())==null?void 0:o.id;return await Rt(a),!1}async function nu(){var a;if(Q.size===0){v("No documents selected","error");return}const e=Q.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(Q);let n=0,s=0;for(const o of t)try{await $.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}ls(),s===0?v(`Deleted ${n} document${n>1?"s":""}!`,"success"):v(`Deleted ${n}, failed ${s}`,"warning");const i=(a=B())==null?void 0:a.id;await Rt(i)}async function Re(e,t=!0){try{const n=await $.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(g=>f(g));let a="";try{const g=await $.getDocumentIssues(n.id);g.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${g.map(y=>`
          <div class="linked-item">
            <span class="linked-item-id">${f(y.identifier)}</span>
            <span class="linked-item-title">${f(y.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${I(n.id)}', '${I(y.id)}')" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${I(n.id)}')">+ Link Issue</button>
          </div>
        `:a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${I(n.id)}')">+ Link Issue</button>
          </div>
        `}catch{}let o="";try{const g=await $.getDocumentComments(n.id);o=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${g.length===0?'<div class="comments-empty">No comments yet</div>':g.map(y=>{var x,L;return`
            <div class="comment" data-comment-id="${_(y.id)}">
              <div class="comment-avatar">${((L=(x=y.author_name)==null?void 0:x.charAt(0))==null?void 0:L.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${f(y.author_name||"Unknown")}</span>
                  <span class="comment-date">${jt(y.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(y.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${I(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(g){console.error("Failed to load comments:",g)}let r=null,c=null;if(n.project_id){const b=(window.getProjects?window.getProjects():[]).find(y=>y.id===n.project_id);if(r=b?b.name:null,n.sprint_id)try{const y=await $.getSprint(n.sprint_id);c=y?y.name:null}catch{}}let d="";r?(d=`<span class="badge badge-primary">${f(r)}</span>`,c&&(d+=` <span class="badge badge-info">${f(c)}</span>`)):d='<span class="badge badge-secondary">Global</span>';let l="";n.labels&&n.labels.length>0?l=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(b=>`
        <span class="label-badge" style="background-color: ${ke(b.color)}; color: white;">
          ${f(b.name)}
          <button class="btn-remove-label" onclick="removeLabelFromDoc('${I(n.id)}', '${I(b.id)}')" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${I(n.id)}')">+ Add Label</button>
        </div>
      `:l=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${I(n.id)}')">+ Add Label</button>
        </div>
      `;let m=n.content||"";const u=m.match(/^\s*#\s+(.+?)(\n|$)/);u&&u[1].trim()===n.title.trim()&&(m=m.replace(/^\s*#\s+[^\n]*\n?/,"").trimStart()),s.querySelector("#document-detail-content").innerHTML=`
      <div class="back-button" onclick="navigateTo('documents')">
        ← Back to Documents
      </div>
      <div class="document-detail-header">
        <div class="document-detail-header-top">
          <div>
            <h2 class="document-title">${f(n.title)}</h2>
            <div class="document-meta">
              ${d}${n.author_name?` · By ${f(n.author_name)}`:""} · Last updated ${new Date(n.updated_at).toLocaleString()}
            </div>
          </div>
          <div class="document-actions">
            <button class="btn btn-secondary btn-small" onclick="showEditDocumentModal('${I(n.id)}')">Edit</button>
            <button class="btn btn-danger btn-small" onclick="deleteDocument('${I(n.id)}')">Delete</button>
          </div>
        </div>
      </div>
      <div class="document-content markdown-body">${m?i(m):"No content"}</div>
      ${l}
      ${a}
      ${o}
    `}catch(n){v(n.message,"error")}}async function Ri(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await $.getSprints(t);let o=n;if(s&&!n){const c=a.find(d=>d.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${f(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function ds(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,H(),t&&await Ri("doc-sprint",t,null,!0)}async function su(e){var a;e.preventDefault();const t=(a=B())==null?void 0:a.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await $.createDocument(t,i),await Rt(t),W(),v("Document created!","success")}catch(o){v(o.message,"error")}return!1}async function iu(e){try{const t=await $.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form onsubmit="return handleUpdateDocument(event, '${I(e)}')">
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
          <textarea id="edit-doc-content" style="min-height: 200px">${f(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${_(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,H(),t.project_id&&await Ri("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){v(t.message,"error")}}async function au(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await $.updateDocument(t,i),W(),await Re(t),v("Document updated!","success")}catch(a){v(a.message,"error")}return!1}async function ou(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await $.deleteDocument(e);const n=(t=B())==null?void 0:t.id;await Rt(n),window.navigateTo&&window.navigateTo("documents"),v("Document deleted!","success")}catch(n){v(n.message,"error")}}function ru(e,t){Ri(e,t)}async function lu(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${I(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${I(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,H()}async function cu(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=B())==null?void 0:s.id,a=await $.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" onclick="linkToIssue('${I(t)}', '${I(o.id)}')">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function du(e,t){try{await $.linkDocumentToIssue(e,t),W(),v("Issue linked!","success"),await Re(e,!1)}catch(n){v(n.message,"error")}}async function uu(e,t){if(confirm("Unlink this issue from the document?"))try{await $.unlinkDocumentFromIssue(e,t),v("Issue unlinked!","success"),await Re(e,!1)}catch(n){v(n.message,"error")}}async function pu(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return v("Please enter a comment","error"),!1;try{await $.createDocumentComment(t,s),n.value="",v("Comment added!","success"),await Re(t,!1)}catch(i){v(i.message,"error")}return!1}async function mu(e){var n;const t=(n=B())==null?void 0:n.id;if(!t){v("No team selected","error");return}try{const s=await $.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,H();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${I(e)}', '${I(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ke(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,H()}catch(s){v(s.message,"error")}}async function gu(e,t){try{await $.addLabelToDocument(e,t),W(),v("Label added!","success"),await Re(e,!1)}catch(n){v(n.message,"error")}}async function fu(e,t){try{await $.removeLabelFromDocument(e,t),v("Label removed!","success"),await Re(e,!1)}catch(n){v(n.message,"error")}}Object.assign(window,{loadDocuments:Rt,filterDocuments:et,renderDocuments:Ko,viewDocument:Re,showCreateDocumentModal:ds,handleCreateDocument:su,showEditDocumentModal:iu,handleUpdateDocument:au,deleteDocument:ou,updateDocSprintDropdown:ru,showLinkIssueModal:lu,searchIssuesToLink:cu,linkToIssue:du,unlinkDocumentFromIssue:uu,toggleDocSelection:Xd,selectAllDocs:Qd,clearDocSelection:Wo,showBulkMoveModal:eu,handleBulkMove:tu,bulkDeleteDocuments:nu,handleAddDocumentComment:pu,showAddLabelToDocModal:mu,addLabelToDoc:gu,removeLabelFromDoc:fu,setDocViewMode:Mi,enterSelectionMode:Pi,exitSelectionMode:ls,debounceDocSearch:zo,clearDocSearch:zd,clearDocProjectFilter:Kd,clearAllDocFilters:Wd,onDocProjectFilterChange:cs});let wn=[];function hu(){return wn}function vu(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Vo(e){const t=e==null?void 0:e.avatar_url,n=_((e==null?void 0:e.name)||"Agent");return t?vu(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${_(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function bu(e){var t;if(e||(e=(t=B())==null?void 0:t.id),!!e)try{wn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function Ni(e){var t;if(e||(e=(t=B())==null?void 0:t.id),!!e)try{wn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Jo()}catch(n){v(n.message,"error")}}function Jo(){const e=document.getElementById("agents-list");if(e){if(wn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=wn.map(t=>{const n=f(t.name),s=f(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Vo(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Ii(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${I(t.id)}', '${I(t.name||"Agent")}')">Delete</button>
      </div>
    `}).join("")}}function Hi(){const e=window.projects||[];document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),H()}async function yu(e){var o,r,c;e.preventDefault();const t=(o=B())==null?void 0:o.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let d;i&&a?d=await $.createProjectAgent(a,n,s):d=await $.createTeamAgent(t,n,s),W();const l=f(d.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${l}</code>
          <button type="button" class="btn btn-secondary" onclick="copyAgentKey()">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${l}</code>
        </div>
        <button type="button" class="btn btn-primary" onclick="closeModal(); loadAgents();">Done</button>
      </div>
    `,H()}catch(d){v(`Failed to create agent: ${d.message}`,"error")}return!1}function wu(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{v("Agent API key copied to clipboard","success")}).catch(()=>{v("Failed to copy","error")})}async function ku(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await $.deleteAgent(e),v("Agent deleted","success"),Ni()}catch(n){v(`Failed to delete agent: ${n.message}`,"error")}}Object.assign(window,{loadTeamAgentsQuiet:bu,loadAgents:Ni,renderAgents:Jo,showCreateAgentModal:Hi,handleCreateAgent:yu,copyAgentKey:wu,deleteAgent:ku,renderAgentAvatar:Vo});let us=[],kn=[],qi=[],Oi=[];function Yo(){return us}function Ht(){return kn}function $u(e){kn=e}async function ps(){try{us=await $.getMyTeams(),Zo()}catch(e){v(e.message,"error")}}function Zo(){const e=document.getElementById("team-list");us.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=us.map(t=>`
            <button class="dropdown-item" data-team-json="${_(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${f(t.name)}</button>
        `).join("")}async function Fi(e,t=!1){Ti(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),Xo(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function ms(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Ui(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Xo(){if(B())try{kn=await $.getTeamMembers(B().id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function Gi(){if(B())try{kn=await $.getTeamMembers(B().id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Qo()}catch(e){v(e.message,"error")}}function Qo(){const e=document.getElementById("team-members-list");e.innerHTML=kn.map(t=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${f(t.user_name||"Unknown")}</span>
                    <span class="member-email">${f(t.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${t.role}</span>
                ${t.user_id!==window.currentUser.id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" onclick="removeMember('${I(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function gs(){if(B())try{qi=await $.getTeamInvitations(B().id),er()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function er(){const e=document.getElementById("team-invitations-list");if(qi.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=qi.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${f(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${f(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${I(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function tr(){if(B())try{Oi=await $.getTeamAgents(B().id),nr()}catch(e){v(e.message,"error")}}function nr(){const e=document.getElementById("team-agents-list");if(e){if(Oi.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=Oi.map(t=>{const n=f(t.name),s=f(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${f(i)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${s} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function fs(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function Eu(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await $.createInvitation(B().id,t,n),await gs(),W(),v("Invitation sent!","success")}catch(s){v(`Failed to send invitation: ${s.message}`,"error")}return!1}async function Iu(e){if(confirm("Are you sure you want to remove this member?"))try{await $.removeMember(B().id,e),await Gi(),v("Member removed!","success")}catch(t){v(`Failed to remove member: ${t.message}`,"error")}}async function _u(e){try{await $.deleteInvitation(B().id,e),await gs(),v("Invitation canceled!","success")}catch(t){v(`Failed to cancel invitation: ${t.message}`,"error")}}function hs(){ms(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,H()}function zi(){B()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateTeam(event)">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${_(B().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${_(B().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${f(B().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,H())}async function Tu(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await $.createTeam(t);await ps(),await Fi(n),W(),v("Team created!","success")}catch(n){v(`Failed to create team: ${n.message}`,"error")}return!1}async function xu(e){if(e.preventDefault(),!B())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await $.updateTeam(B().id,t);Ti(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await ps(),W(),v("Team updated!","success")}catch(n){v(`Failed to update team: ${n.message}`,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:ps,renderTeamList:Zo,selectTeam:Fi,toggleTeamDropdown:ms,toggleUserDropdown:Ui,loadTeamMembersQuiet:Xo,loadTeamMembers:Gi,renderTeamMembers:Qo,loadTeamInvitations:gs,renderTeamInvitations:er,loadTeamAgents:tr,renderTeamAgents:nr,showInviteModal:fs,handleInvite:Eu,removeMember:Iu,deleteInvitation:_u,showCreateTeamModal:hs,showEditTeamModal:zi,handleCreateTeam:Tu,handleUpdateTeam:xu,getTeams:Yo,getMembers:Ht,setMembers:$u});let te=[];const $n={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function ie(){return te}function Su(e){te=e}function En(e){const t=te.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return $n[n]||$n.fibonacci}function In(e,t){if(!e)return"No estimate";const s=En(t).find(i=>i.value===e);return s?s.label:`${e} points`}function sr(e){const t=te.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=($n[n]||$n.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function $e(){if(B())try{te=await $.getProjects(B().id),ir()}catch(e){v(e.message,"error")}}function ir(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=document.getElementById("dashboard-project-filter"),a=e==null?void 0:e.value,o=t==null?void 0:t.value,r=n==null?void 0:n.value,c=s==null?void 0:s.value,d=i==null?void 0:i.value,l='<option value="">All Projects</option>'+te.map(g=>`<option value="${g.id}">${f(g.name)}</option>`).join(""),m='<option value="">Select Project</option>'+te.map(g=>`<option value="${g.id}">${f(g.name)}</option>`).join(""),u=_n();if(e){e.innerHTML=l;let g=a;if(!g||!te.some(b=>b.id===g))if(u&&te.some(b=>b.id===u))g=u;else{const y=new URLSearchParams(window.location.search).get("project");y&&te.some(x=>x.id===y)?g=y:te.length>0&&(g=te[0].id)}g&&(e.value=g,Bo(g))}if(t){t.innerHTML=m;const g=o||u;g&&te.some(b=>b.id===g)&&(t.value=g)}if(n){n.innerHTML=m;const g=r||u;g&&te.some(b=>b.id===g)&&(n.value=g)}if(s){s.innerHTML=l;const g=c||u;g&&te.some(b=>b.id===g)&&(s.value=g)}if(i){i.innerHTML=l;const g=d||u;g&&te.some(b=>b.id===g)&&(i.value=g)}}function _n(){return gd()}function It(e){if(!e)return;Bo(e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function qt(){const e=document.getElementById("projects-list");if(te.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=te.map(t=>`
        <div class="grid-item" onclick="viewProject('${I(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ke(t.color)}20; color: ${ke(t.color)}">
                    ${f(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${f(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${I(t.id)}')" title="Project settings">
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
    `).join("")}function Lu(e){It(e),window.navigateTo&&window.navigateTo("issues")}function vs(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function Cu(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.createProject(B().id,t),await $e(),qt(),W(),v("Project created!","success")}catch(n){v(`Failed to create project: ${n.message}`,"error")}return!1}function Au(e){const t=te.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateProject(event, '${I(t.id)}')">
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
                <textarea id="project-description">${f(t.description||"")}</textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="${ke(t.color)}">
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
                <button type="button" class="btn btn-danger-outline" onclick="confirmDeleteProject('${I(t.id)}')">Delete Project</button>
            </div>
        </form>
    `,H()}async function Bu(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.updateProject(t,n),await $e(),qt(),W(),v("Project updated!","success")}catch(s){v(`Failed to update project: ${s.message}`,"error")}return!1}async function Du(e){const t=te.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await $.deleteProject(e),await $e(),qt(),W(),v("Project deleted","success")}catch(n){v(`Failed to delete project: ${n.message}`,"error")}}let we=null;async function ar(e){we=e,te.length===0&&await $e();const t=te.find(n=>n.id===e);if(!t){v("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Ki("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Ki(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!tt||tt.length===0)&&Ot()}function or(){we=null,tt=[]}function rr(e){we=e}function lr(){return tt}async function cr(){if(!we)return;const e=document.getElementById("ps-name").value.trim();if(!e){v("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await $.updateProject(we,t),await $e(),v("Settings saved","success");const n=te.find(s=>s.id===we);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){v(n.message,"error")}}async function dr(){if(!we)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await $.updateProject(we,n),await $e(),v("Settings saved","success")}catch(s){v(`Failed to save settings: ${s.message}`,"error")}}let tt=[];async function Ot(){if(we)try{tt=await $.getRituals(we),ju(),typeof window._onRitualsChanged=="function"&&window._onRitualsChanged()}catch(e){v(e.message,"error")}}function ju(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=tt.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=tt.filter(s=>s.trigger==="ticket_close"),n=tt.filter(s=>s.trigger==="ticket_claim");Ft("ps-sprint-rituals-list",e,"sprint"),Ft("ps-close-rituals-list",t,"close"),Ft("ps-claim-rituals-list",n,"claim")}function Ft(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>_(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${f(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):f(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${i(a.approval_mode)}">${f(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${I(a.id)}')">Edit</button>
        <button class="btn btn-danger btn-small" data-ritual-id="${_(a.id)}" data-ritual-name="${_(a.name)}" onclick="deleteProjectRitual(this.dataset.ritualId, this.dataset.ritualName)">Delete</button>
      </div>
    </div>
  `}).join("")}async function ur(e){if(!we)return;let t=[];try{t=await $.getRitualGroups(we)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        <select id="ritual-trigger" onchange="toggleRitualConditions()">
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
          ${t.map(n=>`<option value="${_(n.id)}" data-mode="${_(n.selection_mode)}">${f(n.name)} (${f(n.selection_mode)})</option>`).join("")}
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
        ${window.renderConditionBuilder?window.renderConditionBuilder(null):""}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,H()}function Mu(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Pu(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function pr(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw v("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await $.createRitualGroup(we,{name:t,selection_mode:n})).id}return e.value||null}async function Ru(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}let n;try{n=await pr()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await $.createRitual(we,s),await Ot(),W(),v("Ritual created!","success")}catch(i){v(`Failed to create ritual: ${i.message}`,"error")}return!1}async function Nu(e){const t=tt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await $.getRitualGroups(we)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${I(e)}')">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${_(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${f(t.prompt)}</textarea>
      </div>
      <div class="form-group">
        <label for="ritual-trigger">Trigger</label>
        <select id="ritual-trigger" onchange="toggleRitualConditions()">
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
          ${n.map(o=>`<option value="${_(o.id)}" data-mode="${_(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${f(o.name)} (${f(o.selection_mode)})</option>`).join("")}
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
        ${window.renderConditionBuilder?window.renderConditionBuilder(t.conditions):""}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,H()}async function Hu(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}let s;try{s=await pr()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await $.updateRitual(t,i),await Ot(),W(),v("Ritual updated!","success")}catch(a){v(`Failed to update ritual: ${a.message}`,"error")}return!1}async function qu(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await $.deleteRitual(e),await Ot(),v("Ritual deleted","success")}catch(n){v(`Failed to delete ritual: ${n.message}`,"error")}}Object.assign(window,{loadProjects:$e,updateProjectFilters:ir,getSavedProjectId:_n,setGlobalProjectSelection:It,renderProjects:qt,viewProject:Lu,showCreateProjectModal:vs,handleCreateProject:Cu,viewProjectSettings:ar,switchProjectSettingsTab:Ki,saveProjectSettingsGeneral:cr,saveProjectSettingsRules:dr,clearProjectSettingsState:or,showEditProjectModal:Au,handleUpdateProject:Bu,confirmDeleteProject:Du,getEstimateOptions:En,formatEstimate:In,getEstimateScaleHint:sr,getProjects:ie,setProjects:Su,ESTIMATE_SCALES:$n,showCreateProjectRitualModal:ur,handleCreateProjectRitual:Ru,showEditProjectRitualModal:Nu,handleUpdateProjectRitual:Hu,deleteProjectRitual:qu,setCurrentSettingsProjectId:rr,getProjectRituals:lr,loadProjectSettingsRituals:Ot,onRitualGroupChange:Pu});const bs={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},ys={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let mr=0;function Ou(e){mr=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=gr(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function gr(e="",t="",n=""){const s=mr++,i=Object.keys(bs).map(d=>`<option value="${d}" ${d===e?"selected":""}>${d}</option>`).join(""),o=(e?bs[e]:bs.estimate).map(d=>`<option value="${d}" ${d===t?"selected":""}>${ys[d]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
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
    `}function Fu(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",gr()),ws()}function Uu(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),ws()}function Gu(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=bs[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${ys[o]}</option>`).join(""),fr(e),ws()}function fr(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Tn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function ws(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function zu(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,d=o.querySelector(".condition-value");let l=(a=d==null?void 0:d.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw Tn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw Tn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const m=`${r}__${c}`;if(n.has(m))throw Tn(`Duplicate condition: ${r} ${ys[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${m}`);if(n.add(m),c==="isnull")t[m]=!0;else if(c==="in"||c==="contains")t[m]=l?l.split(",").map(u=>u.trim()).filter(u=>u):[];else if(c==="gte"||c==="lte"){if(!l)throw Tn(`Please enter a numeric value for ${r} ${ys[c]}.`),new Error(`Missing numeric value for ${m}`);const u=parseInt(l,10);if(isNaN(u))throw Tn(`Invalid number "${l}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${m}: ${l}`);t[m]=u}else t[m]=l}return ws(),Object.keys(t).length>0?t:null}Object.assign(window,{renderConditionBuilder:Ou,addConditionRow:Fu,removeConditionRow:Uu,updateOperatorOptions:Gu,toggleValueInput:fr,collectConditions:zu});function _t(){const t=new URLSearchParams(window.location.search).get("project");return t||_n()}function ks(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let Ut=[],$s={},Es=new Set,nt=null,hr=null,Wi=[],xn=[],Vi=[];function Ku(){return $s}function Wu(){return nt}function vr(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=_t();t&&ie().some(n=>n.id===t)&&(e.value=t)}e.value?st(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function br(){const e=document.getElementById("sprint-project-filter").value;e&&(It(e),ks(e)),st(e)}async function st(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){cp();try{await $.getCurrentSprint(t),Ut=await $.getSprints(t),Vu(),await Is()}catch(n){v(n.message,"error")}}}function Vu(){const e=document.getElementById("sprints-list");if(!e)return;const t=Ut.find(a=>a.status==="active"),n=Ut.find(a=>a.status==="planned"),s=Ut.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${I(t.id)}'); } else { window.open('/sprint/${t.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${f(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${I(t.id)}', '${I(t.name)}', ${t.budget||"null"}, '${I(t.project_id)}')">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${I(t.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=Ju(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${I(n.id)}'); } else { window.open('/sprint/${n.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${f(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${I(n.id)}', '${I(n.name)}', ${n.budget||"null"}, '${I(n.project_id)}')">Edit Budget</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${I(a.id)}'); } else { window.open('/sprint/${a.id}', '_blank'); }" style="cursor: pointer;">
                            <span class="sprint-history-name">${f(a.name)}</span>
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
    `}function Ju(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),l=((z,V,P)=>Math.min(Math.max(z,V),P))((new Date-o)/(r-o),0,1),m=360,u=120,g=16,b=g,y=m-g,x=g,L=u-g,N=z=>s===0?L:x+(1-z/s)*(L-x),q=N(s),j=N(0),O=b+(y-b)*l,C=N(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${_s(e.start_date)} → ${_s(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${m} ${u}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${q}" x2="${y}" y2="${j}" class="burndown-ideal" />
                <line x1="${b}" y1="${q}" x2="${O}" y2="${C}" class="burndown-actual" />
                <circle cx="${O}" cy="${C}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function Ji(e,t=!0){var n;try{const s=await $.getSprint(e);if(!s){v("Sprint not found","error"),window.navigateTo("sprints");return}hr=s;const i=(n=B())==null?void 0:n.id,[a,o,r]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getSprintTransactions(e).catch(()=>[]),i?$.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);Wi=a,Vi=o,xn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Zu()}catch(s){console.error("Failed to load sprint:",s),v("Failed to load sprint","error"),window.navigateTo("sprints")}}async function Yu(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){v("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await Ji(e,!1)}catch{window.navigateTo("sprints",!1)}}function Zu(){const e=hr,t=Wi;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(l=>s.includes(l.status)),a=t.filter(l=>l.status==="done"),o=t.reduce((l,m)=>l+(m.estimate||0),0),r=a.reduce((l,m)=>l+(m.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const d=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" onclick="navigateTo('sprints')">
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
                    ${_s(e.start_date)} → ${_s(e.end_date)}
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
                <div class="stat-value">${d}</div>
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
                        ${i.map(l=>yr(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${a.map(l=>yr(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Qu()}
            </div>

            ${xn.length>0?`
            <div class="sprint-detail-section">
                <h3>Documents (${xn.length})</h3>
                <div class="sprint-issues-list">
                    ${xn.map(l=>Xu(l)).join("")}
                </div>
            </div>
            `:""}
        </div>
    `}function yr(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${I(e.id)}'); } else { window.open('/issue/${encodeURIComponent(e.identifier)}', '_blank'); }">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${up(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Xu(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewDocument('${I(e.id)}'); } else { window.open('/document/${I(encodeURIComponent(e.id))}', '_blank'); }">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${jt(e.created_at)}</span>
            </span>
        </div>
    `}function Qu(){const e=Vi;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${f(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${f(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${ep(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function ep(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function tp(e,t,n,s){const i=s?sr(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateBudget(event, '${I(e)}', '${I(s)}')">
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${i?`<small class="form-hint">${f(i)}</small>`:""}
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
    `,H()}async function np(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await $.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const c=Ut.filter(d=>d.status==="planned"&&d.id!==t);for(const d of c)await $.updateSprint(d.id,{budget:i})}a==="default"&&n&&await $.updateProject(n,{default_sprint_budget:i}),await st(),W(),v(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){v(`Failed to update budget: ${r.message}`,"error")}return!1}async function sp(e){const t=Ut.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,H();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[c,d]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getRituals(t.project_id)]);s=c.filter(l=>n.includes(l.status)).length,i=d.some(l=>l.is_active&&l.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${f(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${I(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function ip(e){try{const t=await $.closeSprint(e);await st(),t.limbo?op(t):v("Sprint completed!","success")}catch(t){v(`Failed to complete sprint: ${t.message}`,"error")}}async function Is(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{nt=await $.getLimboStatus(e),ap()}catch(n){console.error("Failed to load limbo status:",n)}}function ap(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!nt||!nt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${nt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function op(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
            <button type="button" class="btn btn-primary" onclick="closeModal(); loadLimboStatus();">Got it</button>
        </div>
    `,H(),rp(t)}async function rp(e){try{const t=await $.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${f(s.name)} <span class="ritual-mode">(${f(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(s.prompt):f(s.prompt)}</div>
                    ${Zi(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Yi(){var t,n,s,i;if(!nt)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",(s=document.querySelector(".modal"))==null||s.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${nt.pending_rituals.map(a=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${a.attestation?a.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(a.name)}</strong>
                            <span class="badge badge-ritual-${_(a.approval_mode)}">${f(a.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):f(a.prompt)}</div>
                        ${Zi(a.attestation)}
                        ${lp(a,e)}
                    </div>
                `).join("")}
            </div>
            ${((i=nt.completed_rituals)==null?void 0:i.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${nt.completed_rituals.map(a=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(a.name)}</div>
                            ${Zi(a.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,H()}function Zi(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${f(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${f(jt(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${window.renderMarkdown?window.renderMarkdown(e.note):f(e.note)}</div>
        </div>
    `}function lp(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" onclick="approveRitual('${I(e.id)}', '${I(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${I(e.id)}', '${I(t)}', '${I(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function wr(e){for(const t of e)if(!Es.has(t))try{(await $.getSprints(t)).forEach(s=>{$s[s.id]=s}),Es.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function cp(){$s={},Es=new Set,Wi=[],Vi=[],xn=[]}function dp(e,t){t.forEach(n=>{$s[n.id]=n}),Es.add(e)}function _s(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function up(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}let mt=!0,Sn=null,Xi=null,Qi=null,Ts=null,h={api:null,getCurrentView:()=>"my-issues",showToast:()=>{},showModal:()=>{},closeModal:()=>{},navigateTo:()=>{},getProjects:()=>[],getMembers:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",renderMarkdown:e=>e,renderAvatar:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",showDetailDropdown:()=>{},setupMentionAutocomplete:()=>{},renderTicketRitualActions:()=>"",getIssues:()=>[]};function pp(e){h={...h,...e}}function ea(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function ta(e){return e.user_name||e.user_email||"Unknown"}function na(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?h.escapeHtml(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?h.escapeAttr(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" onclick="event.preventDefault(); document.getElementById('comments-section')?.scrollIntoView({behavior: 'smooth'})">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${h.escapeHtml(h.formatStatus(t(e.old_value)))}</strong> to <strong>${h.escapeHtml(h.formatStatus(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${h.escapeHtml(h.formatPriority(t(e.old_value)))}</strong> to <strong>${h.escapeHtml(h.formatPriority(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${h.escapeHtml(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${h.escapeHtml(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=h.escapeHtml(e.field_name||"ritual"),i=e.new_value?h.escapeAttr(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||h.escapeHtml(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||h.escapeHtml(e.field_name)}`:"Updated issue"}}function kr(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function mp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const d=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let l;for(;(l=d.exec(t))!==null;)if(c=!0,l.index>r&&o.appendChild(document.createTextNode(t.slice(r,l.index))),l[1]){const m=l[1],u=document.createElement("a");u.href=`#/issue/${m}`,u.className="issue-link",u.textContent=m,o.appendChild(u),r=l.index+l[0].length}else if(l[3]){l[2]&&o.appendChild(document.createTextNode(l[2]));const m=document.createElement("span");m.className="mention",m.textContent="@"+l[3],o.appendChild(m),r=l.index+l[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function gp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function fp(e){if(!e)return"";const t=h.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,kr(n,mp),n.innerHTML}function xs(e){if(!e)return"";const t=h.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,kr(n,gp),n.innerHTML}function $r(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function Er(){mt=!mt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",mt),n&&n.classList.toggle("rotated",mt)}async function Ss(e){try{Sn=await h.api.getTicketRitualsStatus(e),Ir(e)}catch(t){console.error("Failed to load ticket rituals:",t),Sn=null}}function Ir(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Sn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=Sn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(l=>l.approval_mode==="gate")&&(mt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",mt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",mt);const r=n.some(l=>l.trigger==="ticket_close"),c=n.some(l=>l.trigger==="ticket_claim");let d="⚠️ Complete these rituals:";r&&c?d="⚠️ Pending rituals (claim before starting, close before completing):":c?d="⚠️ Complete these rituals before claiming this ticket:":r&&(d="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${d}</p>
                ${n.map(l=>`
                    <div class="ticket-ritual-item pending${l.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${l.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${h.escapeHtml(l.name)}</span>
                            <span class="badge badge-trigger-${l.trigger||"ticket_close"}">${l.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${l.approval_mode||"auto"}">${l.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${l.prompt?h.renderMarkdown(l.prompt):""}</div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${h.escapeHtml(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${h.formatTimeAgo(l.attestation.attested_at)}</span>
                                ${l.attestation.note?`<div class="attestation-note markdown-body">${h.renderMarkdown(l.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${h.renderTicketRitualActions(l,e)}
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
                            <span class="ticket-ritual-name">${h.escapeHtml(l.name)}</span>
                        </div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${h.escapeHtml(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${h.formatTimeAgo(l.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Ls(e){try{let t;e.includes("-")?t=await h.api.getIssueByIdentifier(e):t=await h.api.getIssue(e),t?await ae(t.id,!1):h.navigateTo("my-issues",!1)}catch{h.navigateTo("my-issues",!1)}}async function ae(e,t=!0){try{mt=!0;const[n,s,i,a,o,r]=await Promise.all([h.api.getIssue(e),h.api.getComments(e),h.api.getActivities(e),h.api.getSubIssues(e),h.api.getRelations(e),h.api.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),d=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(k=>k.attestation&&k.attestation.note).map(k=>({id:`attestation-${k.attestation.id}`,author_name:k.attestation.attested_by_name||"Unknown",content:k.attestation.note,created_at:k.attestation.attested_at,is_attestation:!0,ritual_name:k.name,is_pending:!k.attestation.approved_at}));Sn=r;const l=[...s,...d].sort((k,Ne)=>new Date(k.created_at)-new Date(Ne.created_at)),m=[n.parent_id?h.api.getIssue(n.parent_id):Promise.resolve(null),h.api.getSprints(n.project_id).catch(k=>(console.error("Failed to load sprints:",k),[]))],[u,g]=await Promise.all(m),b=o.filter(k=>k.relation_type==="blocks"&&k.direction==="outgoing"),y=o.filter(k=>k.relation_type==="blocked_by"||k.relation_type==="blocks"&&k.direction==="incoming"),x=o.filter(k=>k.relation_type==="relates_to");t&&history.pushState({issueId:e,view:h.getCurrentView()},"",`/issue/${n.identifier}`),xi(n),Ho(g),document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const L=document.getElementById("issue-detail-view");L.classList.remove("hidden");const N=h.getCurrentView()||"my-issues",q=h.getProjects().find(k=>k.id===n.project_id),j=n.assignee_id?h.getAssigneeById(n.assignee_id):null,O=j?h.formatAssigneeName(j):null,C=n.sprint_id?g.find(k=>k.id===n.sprint_id):null,z=h.getIssues(),V=z.findIndex(k=>k.id===n.id),P=V>0?z[V-1]:null,A=V>=0&&V<z.length-1?z[V+1]:null,F=V>=0;L.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${N}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${F?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${P?`onclick="viewIssue('${h.escapeJsString(P.id)}')"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${V+1} / ${z.length}</span>
                            <button class="issue-nav-btn" ${A?`onclick="viewIssue('${h.escapeJsString(A.id)}')"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${q?h.escapeHtml(q.name):"Project"} › ${h.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${h.escapeHtml(n.title)}</h1>

                    ${u?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(u.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(u.id)}'); }">${u.identifier}: ${h.escapeHtml(u.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" onclick="editDescription('${h.escapeJsString(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </button>
                        </div>
                        <div class="description-content markdown-body ${n.description?"":"empty"}"${n.description?"":` onclick="editDescription('${h.escapeJsString(n.id)}')"`}>
                            ${n.description?xs(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showCreateSubIssueModal('${h.escapeJsString(n.id)}', '${h.escapeJsString(n.project_id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(k=>`
                                <div class="sub-issue-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${h.escapeJsString(k.id)}'); } else { window.open('/issue/${encodeURIComponent(k.identifier)}', '_blank'); }">
                                    <span class="sub-issue-status">${h.getStatusIcon(k.status)}</span>
                                    <span class="sub-issue-id">${k.identifier}</span>
                                    <span class="sub-issue-title">${h.escapeHtml(k.title)}</span>
                                    ${k.estimate?`<span class="sub-issue-estimate">${k.estimate}pts</span>`:""}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showAddRelationModal('${h.escapeJsString(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${b.length===0&&y.length===0&&x.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${y.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${y.map(k=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${h.getStatusIcon(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${h.escapeHtml(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${h.escapeJsString(n.id)}', '${h.escapeJsString(k.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${b.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${b.map(k=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${h.getStatusIcon(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${h.escapeHtml(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${h.escapeJsString(n.id)}', '${h.escapeJsString(k.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${x.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${x.map(k=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${h.getStatusIcon(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${h.escapeHtml(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${h.escapeJsString(n.id)}', '${h.escapeJsString(k.id)}'); event.stopPropagation();" title="Remove relation">
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
                            `:i.map(k=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ea(k.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${na(k)}</span>
                                        <span class="activity-actor">by ${h.escapeHtml(ta(k))}</span>
                                        <span class="activity-time">${h.formatTimeAgo(k.created_at)}</span>
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
                            `:l.map(k=>`
                                <div class="comment ${k.is_attestation?"comment-attestation":""} ${k.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${k.is_attestation?"avatar-attestation":""}">${k.is_attestation?k.is_pending?"⏳":"✓":(k.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${h.escapeHtml(k.author_name||"User")}</span>
                                            ${k.is_attestation?`<span class="comment-ritual-badge">${k.is_pending?"Pending approval — ":""}Ritual: ${h.escapeHtml(k.ritual_name)}</span>`:""}
                                            <span class="comment-date">${h.formatTimeAgo(k.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${fp(k.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" onsubmit="return handleAddComment(event, '${h.escapeJsString(n.id)}')">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" onclick="showDetailDropdown(event, 'status', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${h.getStatusIcon(n.status)}
                                <span>${h.formatStatus(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" onclick="showDetailDropdown(event, 'priority', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${h.getPriorityIcon(n.priority)}
                                <span>${h.formatPriority(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" onclick="showDetailDropdown(event, 'type', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${h.formatIssueType(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" onclick="showDetailDropdown(event, 'assignee', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${O?`${h.renderAvatar(j,"avatar-small")}<span>${h.escapeHtml(O)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" onclick="showDetailDropdown(event, 'sprint', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${C?h.escapeHtml(C.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" onclick="showDetailDropdown(event, 'labels', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(k=>`
                                        <span class="issue-label" style="background: ${h.sanitizeColor(k.color)}20; color: ${h.sanitizeColor(k.color)}">${h.escapeHtml(k.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${q?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${h.escapeHtml(q.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" onclick="showDetailDropdown(event, 'estimate', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${h.formatEstimate(n.estimate,n.project_id)}</span>
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
                            <span class="property-value-static">${h.escapeHtml(n.creator_name||"Unknown")}</span>
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
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${h.escapeAttr(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${h.escapeAttr(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `;const Z=document.querySelector(".sidebar-overflow-trigger"),X=document.querySelector(".overflow-menu-dropdown");if(Z&&X){const k=()=>{X.classList.add("hidden"),Z.setAttribute("aria-expanded","false")},Ne=()=>{const re=X.classList.toggle("hidden");Z.setAttribute("aria-expanded",String(!re))};Z.addEventListener("click",Ne),document.addEventListener("click",re=>{!Z.contains(re.target)&&!X.contains(re.target)&&k()}),X.addEventListener("keydown",re=>{re.key==="Escape"&&(k(),Z.focus())}),X.querySelectorAll(".overflow-menu-item").forEach(re=>{re.addEventListener("click",()=>{const wt=re.dataset.issueId;k(),re.dataset.action==="edit"?window.showEditIssueModal(wt):re.dataset.action==="delete"&&window.deleteIssue(wt)})})}Ir(n.id),h.setupMentionAutocomplete();const Ee=document.getElementById("new-comment");if(Ee){const k=wd(n.id);k&&(Ee.value=k),Ee.addEventListener("input",()=>{ki(n.id,Ee.value)}),Ee.addEventListener("keydown",Ne=>{var re;Ne.key==="Enter"&&(Ne.metaKey||Ne.ctrlKey)&&(Ne.preventDefault(),(re=Ee.closest("form"))==null||re.requestSubmit())})}Xi=P?P.id:null,Qi=A?A.id:null,Ts&&document.removeEventListener("keydown",Ts),Ts=k=>{if(k.metaKey||k.ctrlKey||k.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||k.target.tagName==="INPUT"||k.target.tagName==="TEXTAREA"||k.target.tagName==="SELECT"||k.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;k.key==="ArrowLeft"&&Xi?(k.preventDefault(),ae(Xi)):k.key==="ArrowRight"&&Qi&&(k.preventDefault(),ae(Qi));const re={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[k.key];if(re){const wt=document.querySelector(`.property-row[data-field="${re}"]`);wt&&(k.preventDefault(),wt.click())}},document.addEventListener("keydown",Ts)}catch(n){h.showToast(`Failed to load issue: ${n.message}`,"error")}}async function hp(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;ki(t,null);try{await h.api.createComment(t,n),await ae(t),h.showToast("Comment added!","success")}catch(s){ki(t,n),h.showToast(`Failed to add comment: ${s.message}`,"error")}return!1}async function vp(e){const t=Qe()||await h.api.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
            </div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${h.escapeHtml(t.description||"")}</textarea>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=kd(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?ss(e,r):ss(e,null);const c=document.getElementById("edit-description-preview");c&&c.style.display!=="none"&&_r()}),a.addEventListener("keydown",r=>{var c,d;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(c=document.getElementById("save-description-edit"))==null||c.click()),r.key==="Escape"&&(r.preventDefault(),(d=document.getElementById("cancel-description-edit"))==null||d.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{ss(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||i.setAttribute("onclick",`editDescription('${h.escapeJsString(t.id)}')`),i.innerHTML=t.description?xs(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var c;const r=(c=document.getElementById("edit-description"))==null?void 0:c.value;if(r!==void 0)try{await h.api.updateIssue(e,{description:r}),ss(e,null),h.showToast("Description updated","success"),ae(e,!1)}catch(d){h.showToast(`Failed to update description: ${d.message}`,"error")}})}function _r(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?xs(n):'<span class="text-muted">Nothing to preview.</span>'}function bp(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?_r():s.focus()}function yp(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleAddRelation(event, '${h.escapeJsString(e)}')">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${h.escapeJsString(e)}')">
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
    `,h.showModal(),document.getElementById("relation-issue-search").focus()}async function wp(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=B())==null?void 0:s.id,o=(await h.api.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" onclick="selectIssueForRelation('${h.escapeJsString(r.id)}', '${h.escapeJsString(r.identifier)}', '${h.escapeJsString(r.title)}')">
                <span class="link-result-id">${h.escapeHtml(r.identifier)}</span>
                <span class="link-result-title">${h.escapeHtml(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function kp(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function $p(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Ep(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return h.showToast("Please select an issue","error"),!1;try{n==="blocked_by"?await h.api.createRelation(s,t,"blocks"):await h.api.createRelation(t,s,n),h.closeModal(),h.showToast("Relation added","success"),ae(t)}catch(i){h.showToast(`Failed to add relation: ${i.message}`,"error")}return!1}async function Ip(e,t){try{await h.api.deleteRelation(e,t),h.showToast("Relation removed","success"),ae(e)}catch(n){h.showToast(`Failed to remove relation: ${n.message}`,"error")}}async function _p(){const e=document.getElementById("ritual-project-filter");e&&(await $e(),e.innerHTML='<option value="">Select Project</option>'+ie().map(t=>`<option value="${_(t.id)}">${f(t.name)}</option>`).join(""))}async function Tr(){const e=document.getElementById("rituals-project-filter");if(!e)return;window._onRitualsChanged=Tp,await $e(),e.innerHTML='<option value="">Select a project</option>'+ie().map(n=>`<option value="${_(n.id)}">${f(n.name)}</option>`).join("");const t=_t()||_n();t&&ie().some(n=>n.id===t)?(e.value=t,sa()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function sa(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){document.getElementById("rituals-tabs").classList.add("hidden"),t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}rr(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await Ot()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${f(n.message)}</div>`}}function Tp(){const e=document.getElementById("rituals-content"),t=lr(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Ft("rv-sprint-rituals-list",n,"sprint"),Ft("rv-close-rituals-list",s,"close"),Ft("rv-claim-rituals-list",i,"claim")}function xr(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function xp(e,t){try{await $.approveAttestation(e,t),v("Ritual approved!","success"),await Is(),Yi()}catch(n){v(n.message,"error")}}async function Sr(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Sp(s,e,t)}),H()}async function Sp(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await $.completeGateRitual(t,n,s||null),v("Ritual completed!","success"),await Is();const i=Wu();i&&!i.in_limbo?(W(),v("Limbo cleared! Next sprint is now active.","success")):Yi()}catch(i){v(i.message,"error")}return!1}function Lp(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" data-ritual-name="${_(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" data-ritual-name="${_(e.name)}" data-ritual-prompt="${_(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function Cp(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${f(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Ap(i,e,t)}),H()}async function Ap(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return v("A note is required for this attestation.","error"),!1;try{await $.attestTicketRitual(t,n,s),v("Ritual attested!","success"),W(),await Ss(n)}catch(i){v(i.message,"error")}return!1}async function Bp(e,t){try{await $.attestTicketRitual(e,t),v("Ritual attested!","success"),await Ss(t)}catch(n){v(n.message,"error")}}async function Dp(e,t){try{await $.approveTicketRitual(e,t),v("Ritual approved!","success"),await Ss(t)}catch(n){v(n.message,"error")}}function jp(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Mp(s,e,t)}),H()}async function Mp(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await $.completeTicketGateRitual(t,n,s||null),v("Ritual completed!","success"),W(),await Ss(n)}catch(i){v(i.message,"error")}return!1}function Cs(e){if(!e)return"";try{U.setOptions({breaks:!0,gfm:!0});const n=U.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Ao.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ia(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Pp(e,t,n,s,i,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(i)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${I(t)}')">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${f(o)}</strong>${r?` ${ia(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",d=>{Rp(d,e,t,n)}),H(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Rp(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await $.completeTicketGateRitual(t,n,i||null),v(`GATE ritual "${s}" approved!`,"success"),W(),Ln()}catch(a){v(`Failed to complete gate ritual: ${a.message}`,"error")}}function Lr(e,t,n,s,i,a,o,r){Pp(e,t,n,s,i,a,o,r)}function Np(e,t,n,s,i,a,o,r,c){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(i)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${I(t)}')">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${ia(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${Cs(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{Hp(l,e,t,n)}),H(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function Hp(e,t,n,s){e.preventDefault();try{await $.approveTicketRitual(t,n),v(`Review ritual "${s}" approved!`,"success"),W(),Ln()}catch(i){v(`Failed to approve review ritual: ${i.message}`,"error")}}function Cr(e,t,n,s,i,a,o,r,c){Np(e,t,n,s,i,a,o,r,c)}let aa=[];async function Ln(){if(!B())return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=await Promise.all(ie().map(async i=>{const[a,o]=await Promise.all([$.getPendingApprovals(i.id),$.getLimboStatus(i.id)]);return{project:i,approvals:a,limbo:o}})),n=[],s=[];for(const{project:i,approvals:a,limbo:o}of t)if(n.push(...a),o&&o.in_limbo){const r=(o.pending_rituals||[]).filter(c=>{var d;return(d=c.attestation)!=null&&d.approved_at?!1:c.approval_mode==="gate"||!!c.attestation});r.length>0&&s.push({project:i,rituals:r})}Hd(n),aa=s,Ar()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${f(t.message)}</p></div>`}}}function Ar(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=Nd(),n=aa.length>0,s=!Td();if(t.length===0&&!n){s?e.innerHTML=`
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
                    <button class="btn btn-secondary" onclick="dismissApprovalsExplainer()">Got it!</button>
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
                    ${aa.map(({project:l,rituals:m})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${f(l.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${m.map(u=>{const g=u.attestation&&!u.attestation.approved_at,b=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${f(u.attestation.attested_by_name||"Unknown")}</strong></span>`:u.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',x=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${_(u.id)}"
                                            data-project-id="${_(l.id)}">Approve</button>`:u.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${_(u.id)}"
                                                data-project-id="${_(l.id)}"
                                                data-ritual-name="${_(u.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${f(u.name)}
                                                    <span class="badge badge-ritual-${_(u.approval_mode)}">${f(u.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${f(u.prompt)}</span>
                                                ${y}
                                            </div>
                                            ${x}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=l=>l.pending_approvals||[],o=l=>m=>{const u=a(m).filter(l);return u.length>0?{...m,_filteredApprovals:u}:null},r=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="claim")).filter(Boolean),c=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="close")).filter(Boolean),d=t.map(o(l=>l.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(oa).join("")}
                </div>
            </div>
        `),c.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map(oa).join("")}
                </div>
            </div>
        `),d.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${d.map(oa).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const m=l.dataset;Lr(m.ritualId,m.issueId,m.ritualName,m.ritualPrompt,m.issueIdentifier,m.issueTitle,m.requestedBy,m.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const m=l.dataset;Cr(m.ritualId,m.issueId,m.ritualName,m.ritualPrompt,m.issueIdentifier,m.issueTitle,m.requestedBy,m.requestedAt,m.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0;try{await $.approveAttestation(l.dataset.ritualId,l.dataset.projectId),v("Sprint ritual approved!","success"),await Ln()}catch(m){l.disabled=!1,v(m.message,"error")}})}),e.querySelectorAll(".sprint-complete-btn").forEach(l=>{l.addEventListener("click",()=>{Sr(l.dataset.ritualId,l.dataset.projectId,l.dataset.ritualName)})})}function qp(){xd(),Ar()}function oa(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(s.requested_by_name)}</strong>${s.requested_at?` (${ia(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${Cs(s.attestation_note)}</div>`:"",c=i?"review-approve-btn":"gate-approve-btn",d=i?"Approve":"Complete",l=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${f(s.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${f(s.ritual_prompt)}</span>
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
                    data-attestation-note="${_(s.attestation_note||"")}">${d}</button>
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${I(e.issue_id)}')" class="gate-issue-link">
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
    `}window.completeGateFromList=Lr,window.approveReviewFromList=Cr;let ra=[];async function la(){try{ra=await $.getApiKeys(),Op()}catch(e){v(e.message,"error")}}function Op(){const e=document.getElementById("api-keys-list");if(e){if(ra.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=ra.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Ii(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ii(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${I(t.id)}', '${I(t.name)}')">Revoke</button>
            `:""}
        </div>
    `).join("")}}function ca(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateApiKey(event)">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,H()}async function Fp(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await $.createApiKey(t);W(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,H()}catch(n){v(n.message,"error")}return!1}async function Br(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),v("API key copied to clipboard","success")}catch{v("Failed to copy","error")}}async function Dr(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await $.revokeApiKey(e),v("API key revoked","success"),await la()}catch(n){v(n.message,"error")}}window.loadApiKeys=la,window.showCreateApiKeyModal=ca,window.handleCreateApiKey=Fp,window.copyApiKey=Br,window.revokeApiKey=Dr;let As=!1,it=0,gt=[],Bs=[];function Up(e){Bs=e,gt=[...e]}function jr(){return As}function Gp(){if(As)return;As=!0,it=0,gt=[...Bs];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Ds()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>zp(n.target.value)),t.addEventListener("keydown",Wp),Cn(),requestAnimationFrame(()=>t.focus())}function Ds(){As=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function zp(e){const t=e.toLowerCase().trim();t?gt=Bs.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):gt=[...Bs],it=0,Cn()}function Cn(){const e=document.getElementById("command-results");if(!e)return;if(gt.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};gt.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===it?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function Kp(e){it=e,Cn()}function Mr(e){const t=gt[e];t&&(Ds(),t.action())}function Wp(e){switch(e.key){case"ArrowDown":e.preventDefault(),it=Math.min(it+1,gt.length-1),Cn();break;case"ArrowUp":e.preventDefault(),it=Math.max(it-1,0),Cn();break;case"Enter":e.preventDefault(),Mr(it);break;case"Escape":e.preventDefault(),Ds();break}}window.selectCommand=Kp,window.executeCommand=Mr;let An=[],da=[],at={getCurrentUser:()=>null,getCurrentTeam:()=>null,renderIssueRow:()=>"",formatActivityText:()=>"",formatActivityActor:()=>"",getActivityIcon:()=>"📝",navigateToIssueByIdentifier:()=>{},viewDocument:()=>{}};function Vp(e){at={...at,...e}}function js(){return An}function Bn(e){An=e}async function ua(){var i,a;const e=at.getCurrentTeam(),t=at.getCurrentUser();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=(a=document.getElementById("dashboard-project-filter"))==null?void 0:a.value;Yp();try{const o={assignee_id:t.id,status:n||void 0,limit:1e3};let r;s?r=await $.getIssues({...o,project_id:s}):r=await $.getTeamIssues(e.id,o),An=r,Dn()}catch(o){v(o.message,"error")}}async function Gt({showLoading:e=!0}={}){const t=at.getCurrentTeam();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{da=await $.getTeamActivities(t.id,0,10),Jp()}catch{n&&(n.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function Jp(){const e=document.getElementById("dashboard-activity-list");if(e){if(!da.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=da.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${I(t.issue_identifier)}'); return false;"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${I(t.document_id)}'); return false;"><strong>${s} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${at.getActivityIcon(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${at.formatActivityText(t)}${n}</span>
                <span class="activity-actor">by ${f(at.formatActivityActor(t))}</span>
                <span class="activity-time">${jt(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Yp(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Ms(){ua()}function Dn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),An.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=An.map(t=>at.renderIssueRow(t)).join("")}}window.filterMyIssues=Ms;let Fe=null,ot=0,zt=null,Kt=null,jn=null,pa=!1;function Pr(){return fd()}function Rr(){hd()}function Nr(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Zp(){Fe||(Fe=document.createElement("div"),Fe.id="onboarding-overlay",Fe.className="onboarding-overlay",document.getElementById("app").appendChild(Fe))}function Mn(){if(!Fe)return;const e=pa?qr():Hr(),t=e[ot],n=e.map((s,i)=>`<span class="onboarding-dot${i===ot?" active":""}${i<ot?" completed":""}"></span>`).join("");Fe.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Hr(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Nr(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Nr(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&zt&&(e.textContent=`${zt.name} (${zt.key})`),t&&Kt&&(t.textContent=`${Kt.name} (${Kt.key})`),n&&jn&&(n.textContent=`${jn.identifier} - ${jn.title}`)}}]}function qr(){const e='<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';return[{html:`
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
            `}]}function ma(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ga(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Wt(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=pa?qr():Hr();ot<e.length-1&&(ot++,Mn())},window._onboardingSkip=function(){Rr(),ha(),window.initApp&&window.initApp()},window._onboardingFinish=function(){Rr(),ha(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),ga("onboarding-team-error"),Wt("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{zt=await api.createTeam({name:t,key:n}),ot++,Mn()}catch(s){ma("onboarding-team-error",s.message||"Failed to create team"),Wt("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),ga("onboarding-project-error"),Wt("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Kt=await api.createProject(zt.id,{name:t,key:n}),ot++,Mn()}catch(s){ma("onboarding-project-error",s.message||"Failed to create project"),Wt("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),ga("onboarding-issue-error"),Wt("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{jn=await api.createIssue(Kt.id,{title:t}),ot++,Mn()}catch(n){ma("onboarding-issue-error",n.message||"Failed to create issue"),Wt("onboarding-issue-submit",!1)}};function fa(e=!1){pa=e,ot=0,zt=null,Kt=null,jn=null,Zp(),Mn()}function ha(){Fe&&(Fe.remove(),Fe=null)}function Ps(){vd(),fa(!0)}window.showOnboarding=fa,window.hideOnboarding=ha,window.resetOnboarding=Ps,window.hasCompletedOnboarding=Pr;let Pn=[];function Xp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Qp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function em(e,t){const n=e().map(Xp),s=t().map(Qp);Pn=[...n,...s]}function Rs(e){return e&&Pn.find(t=>t.id===e)||null}function Rn(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function va(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function Ns(){const e=Pn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));Pn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=Pn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function tm(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;Ns().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${va(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}const Or=["backlog","todo","in_progress","in_review","done","canceled"],Fr=["no_priority","urgent","high","medium","low"],nm=["task","bug","feature","chore","docs","tech_debt","epic"];let Ue=[],Ur=Promise.resolve(),w={api:null,getIssues:()=>[],setIssues:()=>{},getMyIssues:()=>[],setMyIssues:()=>{},getCurrentDetailIssue:()=>null,setCurrentDetailIssue:()=>{},getLabels:()=>[],setLabels:()=>{},getCurrentTeam:()=>null,getCurrentDetailSprints:()=>[],closeAllDropdowns:()=>{},registerDropdownClickOutside:()=>{},setDropdownKeyHandler:()=>{},showToast:()=>{},getStatusIcon:()=>"",getPriorityIcon:()=>"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatAssigneeOptionLabel:e=>(e==null?void 0:e.name)||"",getAssigneeOptionList:()=>[],getAssigneeById:()=>null,getEstimateOptions:()=>[],renderAvatar:()=>"",renderIssueRow:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",updateSprintCacheForProject:()=>{},updateSprintBudgetBar:()=>{}};function sm(e){w={...w,...e}}function Gr(){return Ue}function zr(e){Ue=e}async function Kr(e,t,n){var l,m;e.preventDefault(),w.closeAllDropdowns();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Or.map((u,g)=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${w.escapeJsString(n)}', 'status', '${u}')">
                    ${w.getStatusIcon(u)}
                    <span>${w.formatStatus(u)}</span>
                    <span class="dropdown-shortcut">${g+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Fr.map((u,g)=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${w.escapeJsString(n)}', 'priority', '${u}')">
                    ${w.getPriorityIcon(u)}
                    <span>${w.formatPriority(u)}</span>
                    <span class="dropdown-shortcut">${g}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${nm.map(u=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${w.escapeJsString(n)}', 'issue_type', '${u}')">
                    <span class="issue-type-badge type-${u}">${w.formatIssueType(u)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const u=w.getAssigneeOptionList();a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'assignee_id', null)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${u.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:u.map(({assignee:g,indent:b},y)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'assignee_id', '${w.escapeJsString(g.id)}')">
                    ${w.renderAvatar(g,"avatar-small")}
                    <span>${w.formatAssigneeOptionLabel(g,b)}</span>
                    ${y<9?`<span class="dropdown-shortcut">${y+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const u=document.querySelector(`.issue-row[data-issue-id="${n}"]`),g=(u==null?void 0:u.dataset.projectId)||((l=w.getCurrentDetailIssue())==null?void 0:l.project_id),b=w.getEstimateOptions(g);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${b.map((y,x)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'estimate', ${y.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${y.label}</span>
                    ${x<9?`<span class="dropdown-shortcut">${x}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const u=w.getIssues(),g=w.getMyIssues(),b=w.getCurrentDetailIssue(),y=u.find(P=>P.id===n)||g.find(P=>P.id===n)||b,x=new Set(((y==null?void 0:y.labels)||[]).map(P=>P.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const L=a.getBoundingClientRect();let N=i.bottom+4,q=i.left;q+L.width>window.innerWidth-8&&(q=i.right-L.width),N+L.height>window.innerHeight-8&&(N=i.top-L.height-4),a.style.top=`${N}px`,a.style.left=`${Math.max(8,q)}px`,w.registerDropdownClickOutside(a,{multiSelect:!0});let j=[];const O=w.getCurrentTeam();if(O)try{j=await w.api.getLabels(O.id)}catch(P){console.error("Failed to load labels:",P)}if(!a.parentNode)return;Jr(a,n,j,x);const C=a.getBoundingClientRect();let z=i.bottom+4,V=i.left;V+C.width>window.innerWidth-8&&(V=i.right-C.width),z+C.height>window.innerHeight-8&&(z=i.top-C.height-4),a.style.top=`${z}px`,a.style.left=`${Math.max(8,V)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const u=w.getIssues(),g=w.getMyIssues(),b=w.getCurrentDetailIssue(),y=u.find(A=>A.id===n)||g.find(A=>A.id===n)||b,x=(y==null?void 0:y.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const L=a.getBoundingClientRect();let N=i.bottom+4,q=i.left;q+L.width>window.innerWidth-8&&(q=i.right-L.width),N+L.height>window.innerHeight-8&&(N=i.top-L.height-4),a.style.top=`${N}px`,a.style.left=`${Math.max(8,q)}px`,w.registerDropdownClickOutside(a);let j=[];if(x)try{j=await w.api.getSprints(x),w.updateSprintCacheForProject(x,j)}catch(A){console.error("Failed to load sprints:",A)}if(!a.parentNode)return;const O=j.filter(A=>A.status!=="completed"||A.id===(y==null?void 0:y.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${O.map((A,F)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'sprint_id', '${w.escapeJsString(A.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${w.escapeHtml(A.name)}${A.status==="active"?" (Active)":""}</span>
                    ${F<9?`<span class="dropdown-shortcut">${F+1}</span>`:""}
                </button>
            `).join("")}
        `;const C=a.getBoundingClientRect();let z=i.bottom+4,V=i.left;V+C.width>window.innerWidth-8&&(V=i.right-C.width),z+C.height>window.innerHeight-8&&(z=i.top-C.height-4),a.style.top=`${z}px`,a.style.left=`${Math.max(8,V)}px`,a.classList.remove("dropdown-positioning");const P=A=>{const F=A.key;if(F==="Escape"){w.closeAllDropdowns(),document.removeEventListener("keydown",P),w.setDropdownKeyHandler(null);return}const Z=parseInt(F);if(isNaN(Z))return;const X=a.querySelectorAll(".dropdown-option");let Ee=!1;Z===0?(Nn(n,"sprint_id",null),Ee=!0):Z>=1&&Z<X.length&&(X[Z].click(),Ee=!0),Ee&&(document.removeEventListener("keydown",P),w.setDropdownKeyHandler(null))};w.setDropdownKeyHandler(P),document.addEventListener("keydown",P);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const o=a.getBoundingClientRect();let r=i.bottom+4,c=i.left;c+o.width>window.innerWidth-8&&(c=i.right-o.width),r+o.height>window.innerHeight-8&&(r=i.top-o.height-4),a.style.top=`${r}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const d=u=>{const g=u.key;if(g==="Escape"){w.closeAllDropdowns(),document.removeEventListener("keydown",d);return}const b=parseInt(g);if(isNaN(b))return;let y=!1;if(t==="status"&&b>=1&&b<=6)Nn(n,"status",Or[b-1]),y=!0;else if(t==="priority"&&b>=0&&b<=4)Nn(n,"priority",Fr[b]),y=!0;else if(t==="estimate"){const x=w.getCurrentDetailIssue(),L=w.getEstimateOptions(x==null?void 0:x.project_id);b>=0&&b<L.length&&(Nn(n,"estimate",L[b].value),y=!0)}y&&(document.removeEventListener("keydown",d),w.setDropdownKeyHandler(null))};w.setDropdownKeyHandler(d),document.addEventListener("keydown",d),w.registerDropdownClickOutside(a)}function Wr(e,t,n){e.stopPropagation(),Kr(e,t,n)}function im(e,t,n){Ur=Ur.then(()=>Vr(e,t,n))}async function Vr(e,t,n){const s=w.getIssues(),i=w.getMyIssues(),a=w.getCurrentDetailIssue(),o=s.find(l=>l.id===e)||i.find(l=>l.id===e)||a;if(!o)return;const r=(o.labels||[]).map(l=>l.id),c=r.indexOf(t);let d;if(c>=0?d=r.filter(l=>l!==t):d=[...r,t],n){const l=c<0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}try{const m=(await w.api.updateIssue(e,{label_ids:d})).labels||[],u=s.findIndex(x=>x.id===e);u!==-1&&(s[u].labels=m,w.setIssues([...s]));const g=i.findIndex(x=>x.id===e);g!==-1&&(i[g].labels=m,w.setMyIssues([...i])),(a==null?void 0:a.id)===e&&w.setCurrentDetailIssue({...a,labels:m});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const x=s.find(L=>L.id===e)||i.find(L=>L.id===e);x&&(b.outerHTML=w.renderIssueRow(x))}const y=document.querySelector(".property-labels-btn");y&&(y.innerHTML=m.length>0?m.map(x=>`
                    <span class="issue-label" style="background: ${w.sanitizeColor(x.color)}20; color: ${w.sanitizeColor(x.color)}">${w.escapeHtml(x.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(w.showToast("Failed to update labels","error"),n){const l=c>=0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}}}function Jr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleLabelCreateKey(event, '${w.escapeJsString(t)}')">
            <button class="btn btn-small" onclick="createLabelFromDropdown('${w.escapeJsString(t)}')">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-label-id="${i.id}" onclick="event.stopPropagation(); toggleIssueLabel('${w.escapeJsString(t)}', '${w.escapeJsString(i.id)}', this)">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${w.sanitizeColor(i.color)}20; color: ${w.sanitizeColor(i.color)}">${w.escapeHtml(i.name)}</span>
                </button>
            `}).join("")}
    `}function am(e,t){e.key==="Enter"&&(e.preventDefault(),Yr(t))}async function Yr(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=w.getCurrentTeam();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await w.api.createLabel(s.id,{name:i}),o=await w.api.getLabels(s.id);w.setLabels(o),a!=null&&a.id&&await Vr(e,a.id,null);const r=w.getIssues(),c=w.getMyIssues(),d=w.getCurrentDetailIssue(),l=r.find(u=>u.id===e)||c.find(u=>u.id===e)||d,m=new Set(((l==null?void 0:l.labels)||[]).map(u=>u.id));t&&Jr(t,e,o,m),n.value=""}catch(a){w.showToast(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function Hs(){const e=document.getElementById("create-issue-labels-label");e&&(Ue.length===0?e.textContent="Labels":e.textContent=`Labels (${Ue.length})`)}function ba(e){const t=w.getLabels();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Ue.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${w.escapeJsString(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${w.sanitizeColor(n.color)}20; color: ${w.sanitizeColor(n.color)}">${w.escapeHtml(n.name)}</span>
                </button>
            `}).join("")}
    `}function om(e){const t=Ue.indexOf(e);t>=0?Ue.splice(t,1):Ue.push(e),Hs();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&ba(n)}function rm(e){e.key==="Enter"&&(e.preventDefault(),Zr())}async function Zr(){const e=w.getCurrentTeam();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await w.api.createLabel(e.id,{name:s}),a=await w.api.getLabels(e.id);w.setLabels(a),i!=null&&i.id&&!Ue.includes(i.id)&&Ue.push(i.id),Hs(),t&&ba(t),n.value=""}catch(i){w.showToast(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function Nn(e,t,n){var i;w.closeAllDropdowns();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await w.api.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=w.getIssues(),c=r.findIndex(u=>u.id===e);c!==-1&&(r[c]=o,w.setIssues([...r]));const d=w.getMyIssues(),l=d.findIndex(u=>u.id===e);l!==-1&&(d[l]=o,w.setMyIssues([...d]));const m=w.getCurrentDetailIssue();if((m==null?void 0:m.id)===e&&w.setCurrentDetailIssue(o),s&&s.parentNode){const u=r.find(g=>g.id===e)||d.find(g=>g.id===e)||o;if(u){s.outerHTML=w.renderIssueRow(u);const g=document.querySelector(`.issue-row[data-issue-id="${e}"]`);g&&(g.classList.add("updated"),setTimeout(()=>g.classList.remove("updated"),500))}}if(w.showToast("Issue updated","success"),t==="status"){const u=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(u)try{const b=(await w.api.getSprints(u)).find(y=>y.status==="active");w.updateSprintBudgetBar(b||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&lm(t,o)}}catch(a){w.showToast(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function lm(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${w.getStatusIcon(t.status)}
            <span>${w.formatStatus(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${w.getPriorityIcon(t.priority)}
            <span>${w.formatPriority(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${w.formatIssueType(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?w.getAssigneeById(t.assignee_id):null,d=c?w.formatAssigneeName(c):null;r.innerHTML=d?`${w.renderAvatar(c,"avatar-small")}<span>${w.escapeHtml(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=w.getCurrentDetailSprints(),d=t.sprint_id&&c?c.find(l=>l.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?w.escapeHtml(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${w.formatEstimate(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}let Tt={};function cm(e){Tt=e}const Xr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Vt(e=null){var m;const{getProjects:t,escapeHtml:n,getStatusIcon:s,getPriorityIcon:i,showModal:a}=Tt,o=e||((m=document.getElementById("project-filter"))==null?void 0:m.value);zr([]);const r=t().map(u=>`
        <option value="${u.id}" ${u.id===o?"selected":""}>${n(u.name)}</option>
    `).join("");document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <select id="create-issue-project" class="project-select" onchange="updateCreateIssueProject()">
                    <option value="">Select project</option>
                    ${r}
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
                            ${Xr.map(u=>`<option value="${u.id}">${u.label}</option>`).join("")}
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
                            ${s("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${i("no_priority")}
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
    `,a(),Hs();const c=document.getElementById("create-issue-title"),d=document.getElementById("create-issue-description"),l=$d();l.title&&(c.value=l.title),l.description&&(d.value=l.description),c.addEventListener("input",()=>{Do(c.value,d.value)}),d.addEventListener("input",()=>{Do(c.value,d.value)}),c.focus()}function dm(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function um(e){const t=Xr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function pm(e,t){const{getProjects:n,escapeHtml:s,escapeJsString:i,getStatusIcon:a,getPriorityIcon:o,showModal:r}=Tt,c=n().find(d=>d.id===t);zr([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${c?s(c.name):"Project"}</span>
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
                            ${a("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${o("no_priority")}
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
                <button type="button" class="btn btn-primary" onclick="handleCreateSubIssue('${i(e)}', '${i(t)}')">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,r(),Hs(),document.getElementById("create-issue-title").focus()}async function mm(e,t){const{api:n,showToast:s,closeModal:i,viewIssue:a}=Tt,o=document.getElementById("create-issue-title").value.trim(),r=document.getElementById("create-issue-description").value.trim(),c=document.getElementById("create-issue-status").value,d=document.getElementById("create-issue-priority").value,l=document.getElementById("create-issue-type").value||"task",m=document.getElementById("create-issue-assignee").value||null,u=document.getElementById("create-issue-estimate").value,g=u?parseInt(u):null;if(!o){s("Please enter a title","error");return}try{const b=await n.createIssue(t,{title:o,description:r||null,status:c,priority:d,issue_type:l,assignee_id:m,estimate:g,label_ids:Gr(),parent_id:e});i(),s(`Created sub-issue ${b.identifier}`,"success"),a(e)}catch(b){s(`Failed to create sub-issue: ${b.message}`,"error")}}async function gm(e,t){var z,V;const{api:n,closeAllDropdowns:s,registerDropdownClickOutside:i,getLabels:a,formatStatus:o,formatPriority:r,formatIssueType:c,getStatusIcon:d,getPriorityIcon:l,formatAssigneeName:m,formatAssigneeOptionLabel:u,getAssigneeOptionList:g,getEstimateOptions:b,renderAvatar:y,escapeHtml:x,escapeJsString:L,getCurrentTeam:N,setLabels:q}=Tt;s();const O=t.currentTarget.getBoundingClientRect(),C=document.createElement("div");if(C.className="inline-dropdown dropdown-positioning",C.style.top=`${O.top-8}px`,C.style.left=`${O.left}px`,C.style.transform="translateY(-100%)",C.style.animation="none",e==="status"){const P=document.getElementById("create-issue-status").value;C.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(A=>`
                <button class="dropdown-option ${A===P?"selected":""}" onclick="setCreateIssueField('status', '${A}', '${o(A)}')">
                    ${d(A)}
                    <span>${o(A)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const P=document.getElementById("create-issue-priority").value;C.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(A=>`
                <button class="dropdown-option ${A===P?"selected":""}" onclick="setCreateIssueField('priority', '${A}', '${r(A)}')">
                    ${l(A)}
                    <span>${r(A)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const P=document.getElementById("create-issue-type").value;C.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(A=>`
                <button class="dropdown-option ${A===P?"selected":""}" onclick="setCreateIssueField('type', '${A}', '${c(A)}')">
                    <span class="issue-type-badge type-${A}">${c(A)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!N())C.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let P=a();if(P.length===0)try{P=await n.getLabels(N().id),q(P)}catch(A){console.error("Failed to load labels:",A)}ba(C),document.body.appendChild(C),requestAnimationFrame(()=>{requestAnimationFrame(()=>{C.classList.remove("dropdown-positioning")})}),i(C,{multiSelect:!0});return}else if(e==="assignee"){const P=document.getElementById("create-issue-assignee").value,A=g();C.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${P?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${A.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:A.map(({assignee:F,indent:Z})=>{const X=m(F)||"User";return`
                <button class="dropdown-option ${F.id===P?"selected":""}" onclick="setCreateIssueField('assignee', '${L(F.id)}', '${L(X)}')">
                    ${y(F,"avatar-small")}
                    <span>${u(F,Z)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const P=document.getElementById("create-issue-estimate").value,A=(z=document.getElementById("create-issue-project"))==null?void 0:z.value,F=b(A);C.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${F.map(Z=>{const X=Z.value===null?"":String(Z.value);return`
                <button class="dropdown-option ${X===P?"selected":""}" onclick="setCreateIssueField('estimate', '${X}', '${L(Z.value?Z.label:"Estimate")}')">
                    <span>${x(Z.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const P=document.getElementById("create-issue-sprint").value,A=(V=document.getElementById("create-issue-project"))==null?void 0:V.value;if(!A)C.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const Z=(await n.getSprints(A)).filter(X=>X.status!=="completed");C.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${P?"":"selected"}" onclick="setCreateIssueField('sprint', '', 'Sprint')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${Z.map(X=>`
                        <button class="dropdown-option ${X.id===P?"selected":""}" onclick="setCreateIssueField('sprint', '${L(X.id)}', '${L(X.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${x(X.name)}${X.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{C.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(C),requestAnimationFrame(()=>{requestAnimationFrame(()=>{C.classList.remove("dropdown-positioning")})}),i(C)}function fm(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function hm(e,t,n){const{getStatusIcon:s,getPriorityIcon:i,formatIssueType:a,closeAllDropdowns:o,escapeHtml:r}=Tt;document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const c=r(n);if(e==="status"){const d=document.querySelector(".toolbar-btn:first-child");d.innerHTML=`${s(t)}<span id="create-issue-status-label">${c}</span>`}else if(e==="priority"){const d=document.querySelectorAll(".toolbar-btn")[1];d.innerHTML=`${i(t)}<span id="create-issue-priority-label">${c}</span>`}else if(e==="type"){const d=document.getElementById("create-issue-type-btn");d&&(d.innerHTML=`<span class="issue-type-badge type-${t}">${a(t)}</span><span id="create-issue-type-label">${c}</span>`)}o()}async function Qr({keepOpen:e=!1}={}){var C,z;const{api:t,showToast:n,closeModal:s,viewIssue:i,getCurrentView:a,loadIssues:o,loadMyIssues:r}=Tt,c=document.getElementById("create-issue-project").value,d=document.getElementById("create-issue-title").value.trim(),l=document.getElementById("create-issue-description").value.trim(),m=document.getElementById("create-issue-status").value,u=document.getElementById("create-issue-priority").value,g=document.getElementById("create-issue-type").value||"task",b=document.getElementById("create-issue-assignee").value||null,y=document.getElementById("create-issue-estimate").value,x=y?parseInt(y):null,L=((C=document.getElementById("create-issue-sprint"))==null?void 0:C.value)||null,N=(z=document.getElementById("create-issue-due-date"))==null?void 0:z.value,q=N?new Date(`${N}T00:00:00Z`).toISOString():null;if(!c){n("Please select a project","error");return}if(!d){n("Please enter a title","error");return}const j=document.getElementById("btn-create-issue"),O=document.getElementById("btn-create-and-new");j&&(j.disabled=!0),O&&(O.disabled=!0);try{const V=await t.createIssue(c,{title:d,description:l||null,status:m,priority:u,issue_type:g,assignee_id:b,estimate:x,sprint_id:L,label_ids:Gr(),due_date:q});n(`Created ${V.identifier}`,"success"),Ed(),a()==="issues"?o():a()==="my-issues"&&r(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(s(),i(V.id))}catch(V){n(`Failed to create issue: ${V.message}`,"error")}finally{j&&(j.disabled=!1),O&&(O.disabled=!1)}}async function vm(){await Qr({keepOpen:!1})}async function bm(){await Qr({keepOpen:!0})}let qs={};function ym(e){qs=e}async function el(e){const{api:t,showModal:n,showToast:s,escapeHtml:i,escapeAttr:a,escapeJsString:o,getEstimateOptions:r}=qs;try{const c=await t.getIssue(e),d=await t.getSprints(c.project_id),m=r(c.project_id).map(u=>`
            <option value="${u.value===null?"":u.value}" ${c.estimate===u.value?"selected":""}>${i(u.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${o(e)}')">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${a(c.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${i(c.description||"")}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-issue-status">Status</label>
                    <select id="edit-issue-status">
                        <option value="backlog" ${c.status==="backlog"?"selected":""}>Backlog</option>
                        <option value="todo" ${c.status==="todo"?"selected":""}>Todo</option>
                        <option value="in_progress" ${c.status==="in_progress"?"selected":""}>In Progress</option>
                        <option value="in_review" ${c.status==="in_review"?"selected":""}>In Review</option>
                        <option value="done" ${c.status==="done"?"selected":""}>Done</option>
                        <option value="canceled" ${c.status==="canceled"?"selected":""}>Canceled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-priority">Priority</label>
                    <select id="edit-issue-priority">
                        <option value="no_priority" ${c.priority==="no_priority"?"selected":""}>No Priority</option>
                        <option value="low" ${c.priority==="low"?"selected":""}>Low</option>
                        <option value="medium" ${c.priority==="medium"?"selected":""}>Medium</option>
                        <option value="high" ${c.priority==="high"?"selected":""}>High</option>
                        <option value="urgent" ${c.priority==="urgent"?"selected":""}>Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-type">Type</label>
                    <select id="edit-issue-type">
                        <option value="task" ${c.issue_type==="task"?"selected":""}>Task</option>
                        <option value="bug" ${c.issue_type==="bug"?"selected":""}>Bug</option>
                        <option value="feature" ${c.issue_type==="feature"?"selected":""}>Feature</option>
                        <option value="chore" ${c.issue_type==="chore"?"selected":""}>Chore</option>
                        <option value="docs" ${c.issue_type==="docs"?"selected":""}>Docs</option>
                        <option value="tech_debt" ${c.issue_type==="tech_debt"?"selected":""}>Tech Debt</option>
                        <option value="epic" ${c.issue_type==="epic"?"selected":""}>Epic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-estimate">Estimate</label>
                    <select id="edit-issue-estimate">
                        ${m}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${d.filter(u=>u.status!=="completed").map(u=>`
                            <option value="${u.id}" ${c.sprint_id===u.id?"selected":""}>${i(u.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,n()}catch(c){s(`Failed to load issue: ${c.message}`,"error")}}async function wm(e,t){const{api:n,showToast:s,closeModal:i,viewIssue:a}=qs;e.preventDefault();try{const o=document.getElementById("edit-issue-title"),r=document.getElementById("edit-issue-description"),c=document.getElementById("edit-issue-status"),d=document.getElementById("edit-issue-priority"),l=document.getElementById("edit-issue-type"),m=document.getElementById("edit-issue-estimate"),u=document.getElementById("edit-issue-sprint");if(!o||!c||!d||!l)throw new Error("Required form fields not found");const g={title:o.value,description:r?r.value:"",status:c.value,priority:d.value,issue_type:l.value,estimate:m&&m.value?parseInt(m.value):null,sprint_id:u&&u.value?u.value:null};await n.updateIssue(t,g),i(),await a(t),s("Issue updated!","success")}catch(o){s(`Failed to update issue: ${o.message}`,"error")}}async function km(e){const{api:t,showToast:n,loadIssues:s,loadProjects:i,navigateTo:a}=qs;if(confirm("Are you sure you want to delete this issue?"))try{await t.deleteIssue(e),await s(),await i(),a("issues"),n("Issue deleted!","success")}catch(o){n(`Failed to delete issue: ${o.message}`,"error")}}const tl=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let ft=[],ya=null,oe={api:null,showToast:()=>{},getProjects:()=>[],getProjectFromUrl:()=>null,setGlobalProjectSelection:()=>{},updateUrlWithProject:()=>{},escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,formatPriority:e=>e};function $m(e){oe={...oe,...e}}function wa(){const e=document.getElementById("board-project-filter");if(!e)return;const t=oe.getProjects();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${oe.escapeHtml(n.name)}</option>`).join(""),!e.value){const n=oe.getProjectFromUrl();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)ka(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function nl(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(oe.setGlobalProjectSelection(e),oe.updateUrlWithProject(e)),ka(e)}async function ka(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){wa();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{ft=await oe.api.getIssues({project_id:t}),ht()}catch(i){oe.showToast(`Failed to load board: ${i.message}`,"error")}}function ht(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=tl.map(t=>{const n=ft.filter(s=>s.status===t.key);return`
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
                        <div class="kanban-card" draggable="true" data-id="${oe.escapeAttr(s.id)}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             ondragover="handleCardDragOver(event)" ondragleave="handleCardDragLeave(event)" ondrop="handleCardDrop(event)"
                             onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${oe.escapeJsString(s.id)}'); } else { window.open('/issue/${encodeURIComponent(s.identifier)}', '_blank'); }">
                            <div class="kanban-card-title">${oe.escapeHtml(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${oe.formatPriority(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function Em(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),ya=e.target.dataset.id,e.target.classList.add("dragging")}function Im(e){e.target.classList.remove("dragging"),ya=null}function _m(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function Tm(e){e.currentTarget.classList.remove("drag-over")}function xm(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function Sm(e){e.currentTarget.classList.remove("drag-over")}async function Lm(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=ft.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,sl(n,t),ht(),i!==n)try{await oe.api.updateIssue(t,{status:n}),oe.showToast("Status updated","success")}catch(a){s.status=i,ht(),oe.showToast(`Failed to update status: ${a.message}`,"error")}}async function Cm(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=ya||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=ft.find(r=>r.id===t);if(!a)return;const o=a.status;if(a.status=i,sl(i,t,n),ht(),o!==i)try{await oe.api.updateIssue(t,{status:i}),oe.showToast("Status updated","success")}catch(r){a.status=o,ht(),oe.showToast(`Failed to update status: ${r.message}`,"error")}}function sl(e,t,n=null){const s=ft.filter(o=>o.status===e&&o.id!==t),i=ft.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];tl.forEach(o=>{o.key===e?a.push(...s):a.push(...ft.filter(r=>r.status===o.key))}),ft=a}const il=["backlog","todo","in_progress","in_review","done","canceled"],al=["urgent","high","medium","low","no_priority"],ol=["task","bug","feature","chore","docs","tech_debt","epic"];let M={getIssues:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatEstimate:()=>"",getSprintCache:()=>({}),formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",escapeHtml:e=>e||"",escapeAttr:e=>e||"",escapeJsString:e=>e||"",sanitizeColor:e=>e||"#888",renderAvatar:()=>"",getAssigneeOptionList:()=>[],getGroupByValue:()=>""};function Am(e){M={...M,...e}}function vt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Jt(e){const t=vt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function rt(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=M.getIssues();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=M.getGroupByValue();n==="status"?Bm(e,t):n==="priority"?Dm(e,t):n==="type"?jm(e,t):n==="assignee"?Mm(e,t):n==="sprint"?Pm(e,t):e.innerHTML=Jt(t)+t.map(s=>Ge(s)).join("")}function Bm(e,t){const n={};il.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Jt(t);il.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Zt(i)}</span>
                    <span class="group-title">${M.formatStatus(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${vt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ge(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Dm(e,t){const n={};al.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Jt(t);al.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Yt(i)}</span>
                    <span class="group-title">${M.formatPriority(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${vt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ge(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function jm(e,t){const n={};ol.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Jt(t);ol.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${M.formatIssueType(i)}</span></span>
                    <span class="group-title">${M.formatIssueType(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${vt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ge(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Mm(e,t){const n={},s="__unassigned__";n[s]=[];const i=M.getAssigneeOptionList();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Jt(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" onclick="toggleGroup('${s}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${vt(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Ge(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=M.formatAssigneeName(o)||"Unknown",d=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" onclick="toggleGroup('${M.escapeJsString(o.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${M.renderAvatar(o,"avatar-small")}</span>
                    <span class="group-title">${M.escapeHtml(c)}${M.escapeHtml(d)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${vt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(l=>Ge(l)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Pm(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=M.getSprintCache();i.sort((c,d)=>{const l=o[c],m=o[d],u=l?a[l.status]??3:3,g=m?a[m.status]??3:3;return u-g});let r=Jt(t);i.forEach(c=>{const d=s[c];if(d.length===0)return;const l=o[c],m=l?l.name:c,u=l?l.status==="active"?" (Active)":l.status==="completed"?" (Done)":"":"",g=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" onclick="toggleGroup('${g}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${M.escapeHtml(m)}${u}</span>
                    <span class="group-count">${d.length}</span>
                    <span class="group-points">${vt(d)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${d.map(b=>Ge(b)).join("")}
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
                    <span class="group-points">${vt(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(c=>Ge(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function Rm(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Ge(e){const t=e.assignee_id?M.getAssigneeById(e.assignee_id):null,n=t?M.formatAssigneeName(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?M.formatEstimate(e.estimate,e.project_id):"",a=e.sprint_id?M.getSprintCache()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${M.escapeAttr(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${M.escapeAttr(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${M.escapeJsString(e.id)}')" title="Priority: ${M.formatPriority(e.priority)}">
                    ${Yt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${M.escapeJsString(e.id)}')" title="Status: ${M.formatStatus(e.status)}">
                    ${Zt(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${M.formatIssueType(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${M.escapeJsString(e.id)}'); }">${M.escapeHtml(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${M.sanitizeColor(r.color)}20; color: ${M.sanitizeColor(r.color)}">${M.escapeHtml(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${M.escapeJsString(e.id)}')" title="Sprint: ${o?M.escapeHtml(o):"None"}">
                    ${o?`<span class="sprint-badge">${M.escapeHtml(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'estimate', '${M.escapeJsString(e.id)}')" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'assignee', '${M.escapeJsString(e.id)}')" title="${M.escapeAttr(n||"Unassigned")}">
                    ${n?M.renderAvatar(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Yt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Zt(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}function Os(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",rl)},0))}function rl(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",rl))}function xt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function St(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Lt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Hn(){const e=xt(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=pt(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Ae(),xe(),Se()}function Fs(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Hn()}function Us(){const e=St(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ze(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Ae(),xe(),Se()}function Gs(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Us()}function $a(){var s,i;const e=Lt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Ae(),xe(),Se()}function zs(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),$a()}function ll(){var s,i;const e=Lt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function Nm(){const e=document.getElementById("label-filter-dropdown");if(!e||!B())return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(B().id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${ke(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${f(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function cl(){var m,u,g,b,y,x;const e=new URLSearchParams,t=xt(),n=St(),s=Lt(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(u=document.getElementById("project-filter"))==null?void 0:u.value,o=(g=document.getElementById("sprint-filter"))==null?void 0:g.value,r=(b=document.getElementById("issue-type-filter"))==null?void 0:b.value,c=(y=document.getElementById("group-by-select"))==null?void 0:y.value;t.forEach(L=>e.append("status",L)),n.forEach(L=>e.append("priority",L)),s.forEach(L=>e.append("label",L)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),c&&e.set("groupBy",c);const d=e.toString(),l=d?`/issues?${d}`:"/issues";history.replaceState({view:"issues"},"",l),yd((x=B())==null?void 0:x.id,d)}function Hm(){var d;let e=new URLSearchParams(window.location.search);if(e.toString()===""){const l=bd((d=B())==null?void 0:d.id);if(l){e=new URLSearchParams(l);const m=`/issues?${l}`;history.replaceState({view:"issues"},"",m)}}const t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=t.includes(u.value)}),qm())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=n.includes(u.value)}),Om())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const o=e.get("issue_type");if(o){const l=document.getElementById("issue-type-filter");l&&(l.value=o)}const r=e.getAll("label");if(r.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=r.includes(u.value)}),ll())}const c=e.get("groupBy");if(c){const l=document.getElementById("group-by-select");l&&(l.value=c)}}function qm(){const e=xt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=pt(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Om(){const e=St(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ze(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const dl=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function ul(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Xt)):(t.classList.remove("hidden"),_e(),Te(Po()),setTimeout(()=>{document.addEventListener("click",Xt)},0))}function pl(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Xt)):(t.classList.remove("hidden"),rg(),setTimeout(()=>{document.addEventListener("click",Xt)},0))}function Xt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Xt))}function ml(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Xt)}function gl(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return xt().length;case"priority":return St().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Lt().length;default:return 0}}function Fm(){let e=0;return dl.forEach(t=>{e+=gl(t.key)}),e}function _e(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=dl.map(t=>{const n=gl(t.key);return`
            <div class="filter-menu-category ${Po()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function Te(e){Pd(e),_e();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":Um(t);break;case"status":Gm(t);break;case"priority":zm(t);break;case"type":Km(t);break;case"assignee":Wm(t);break;case"sprint":Vm(t);break;case"labels":Jm(t);break}}function Um(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=ie()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" onclick="clearProjectFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setProjectFilter('')">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setProjectFilter('${I(a.id)}')">
                <input type="radio" name="project-filter-radio" value="${_(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ke(a.color)};"></span>
                <span class="filter-option-label">${f(a.name)}</span>
            </label>
        `}),e.innerHTML=i}const Ks=["backlog","todo","in_progress","in_review"],Ws=["done","canceled"];function Gm(e){const t=xt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=Ks.every(o=>t.includes(o))&&!Ws.some(o=>t.includes(o))&&t.length===Ks.length,i=Ws.every(o=>t.includes(o))&&!Ks.some(o=>t.includes(o))&&t.length===Ws.length;let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearStatusFilterNew()">Clear</button>':""}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${s?"active":""}" onclick="setStatusPreset('open')">Open</button>
            <button class="filter-preset-btn ${i?"active":""}" onclick="setStatusPreset('closed')">Closed</button>
        </div>
    `;n.forEach(o=>{a+=`
            <label class="filter-option">
                <input type="checkbox" value="${o.value}" ${t.includes(o.value)?"checked":""} onchange="toggleStatusOption('${o.value}', event)">
                <span class="filter-option-icon">${o.icon}</span>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=a}function zm(e){const t=St(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function Km(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setTypeFilter('${a.value}')">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Wm(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Ht()||[];let i=`
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
            <label class="filter-option" onclick="setAssigneeFilter('${I(a.user_id)}')">
                <input type="radio" name="assignee-filter-radio" value="${_(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${f(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Vm(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${I(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${_(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${f(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function Jm(e){const t=Lt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",l=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${_(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${I(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ke(l)};"></span>
                    <span class="filter-option-label">${f(d)}</span>
                </label>
            `}),e.innerHTML=i}function fl(e){const t=document.getElementById("project-filter");t&&(t.value=e,Ia()),_e(),Te("project"),xe(),Se()}function Ym(){fl("")}function Zm(e){const t=e==="open"?Ks:Ws,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Hn(),_e(),Te("status")}function Xm(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Hn()),_e(),Te("status")}function Qm(){Fs(),_e(),Te("status"),xe(),Se()}function eg(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Us()),_e(),Te("priority")}function tg(){Gs(),_e(),Te("priority"),xe(),Se()}function hl(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ae()),_e(),Te("type"),xe(),Se()}function ng(){hl("")}function vl(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ae()),_e(),Te("assignee"),xe(),Se()}function sg(){vl("")}function bl(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ae()),_e(),Te("sprint"),xe(),Se()}function ig(){bl("")}function ag(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,$a()),_e(),Te("labels")}function og(){zs(),_e(),Te("labels"),xe(),Se()}function rg(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function lg(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,bt()),ml()}function cg(e){const t=document.getElementById("group-by-select");t&&(t.value=e,_a()),ml()}function xe(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const m=(ie()||[]).find(u=>u.id===n.value);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=xt();if(s.length>0){const l=s.map(m=>pt(m)).join(", ");t.push({category:"status",label:"Status",value:l,clearFn:"clearStatusFilterNew()"})}const i=St();if(i.length>0){const l=i.map(m=>Ze(m)).join(", ");t.push({category:"priority",label:"Priority",value:l,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const l=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:l?l.text:a.value,clearFn:"clearTypeFilter()"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let l;if(o.value==="me")l="Me";else if(o.value==="unassigned")l="Unassigned";else{const u=(Ht()||[]).find(g=>g.user_id===o.value);l=(u==null?void 0:u.name)||(u==null?void 0:u.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:l,clearFn:"clearAssigneeFilter()"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const l=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(l==null?void 0:l.text)||r.value,clearFn:"clearSprintFilter()"})}const c=Lt();if(c.length>0){const l=document.getElementById("label-filter-dropdown"),m=c.map(u=>{var y;const g=l==null?void 0:l.querySelector(`input[value="${u}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(l=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${l.label}:</span>
            <span class="filter-chip-value">${f(l.value)}</span>
            <button class="filter-chip-remove" onclick="${l.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=d}function dg(){const e=document.getElementById("project-filter");e&&(e.value=""),Fs(),Gs();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),zs(),Ae(),xe(),Se()}function Se(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Fm();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function ug(){xe(),Se();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function yl(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||Ea(null),t)try{const a=await api.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${f(o.name)})</option>`),Ea(o||null),a.forEach(r=>{const c=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${f(r.name)}${c}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function Ea(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function bt(){var m,u,g,b,y,x,L;if(Ro(-1),!B())return;const e=document.getElementById("project-filter").value,t=xt(),n=St(),s=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,i=(g=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:g.trim();if(!e&&ie().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}pg();const a={limit:1e3},o=((b=document.getElementById("sort-by-select"))==null?void 0:b.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(y=_i())==null?void 0:y.id:a.assignee_id=s);const d=(x=document.getElementById("sprint-filter"))==null?void 0:x.value;if(d)if(d==="current"){if(e)try{const q=(await api.getSprints(e)).find(j=>j.status==="active");q&&(a.sprint_id=q.id)}catch(N){console.error("Failed to resolve current sprint:",N)}}else a.sprint_id=d;const l=(L=document.getElementById("issue-type-filter"))==null?void 0:L.value;l&&(a.issue_type=l),i&&i.length>=2&&(a.search=i);try{let N;e?(a.project_id=e,N=await api.getIssues(a)):ie().length>0&&(N=await api.getTeamIssues(B().id,a));const q=Lt();q.length>0&&(N=N.filter(O=>!O.labels||O.labels.length===0?!1:O.labels.some(C=>q.includes(C.id)))),Xe(N);const j=[...new Set(N.map(O=>O.project_id))];await wr(j),rt()}catch(N){v(N.message,"error")}}function wl(){clearTimeout(qd()),Od(setTimeout(()=>{bt()},300))}function pg(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Ae(){cl(),bt()}async function Ia(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&It(e),await yl(),wa(),vr(),Ae()}async function _a(){if(cl(),kl()==="sprint"){const e=Oe(),t=[...new Set(e.map(n=>n.project_id))];await wr(t)}rt()}function kl(){const e=document.getElementById("group-by-select");return e?e.value:""}const Ta={},Vs=new Map;let xa=null,Sa=null,La=null,Ca=null,Aa=null,Ba=null,$l=!1;function mg(e){Object.assign(Ta,e)}function gg({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(xa=e),t&&(Sa=t),n&&(La=n),s&&(Ca=s),i&&(Aa=i),a&&(Ba=a)}function fg(){return Object.keys(Ta)}function Y(e,t=!0){if(t&&Vs.set(window.location.href,window.scrollY),jd(e),t){let i;const a=_t(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),xa&&xa();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=Ta[e];s&&s(),t&&window.scrollTo(0,0)}function El(){var s;const t=window.location.pathname.split("/").filter(Boolean);Ca&&Ca();let n="my-issues";if(t.length===0||t[0]==="")Y("my-issues",!1);else{if(Sa&&Sa(t))return;n=t[0],fg().includes(n)?Y(n,!1):(n="my-issues",Y("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function Da(e){Vs.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Aa&&Aa(e)}function hg(e){Vs.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Ba&&Ba(e)}function Il(){const e=Vs.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function vg(){$l||($l=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&La&&La(e.state)){Il();return}(t=e.state)!=null&&t.view?Y(e.state.view,!1):El(),Il()}))}async function bg(){const e=document.getElementById("epics-project-filter");if(!e)return;await $e(),e.innerHTML='<option value="">All Projects</option>'+ie().map(n=>`<option value="${_(n.id)}">${f(n.name)}</option>`).join("");const t=_t()||_n();t&&ie().some(n=>n.id===t)&&(e.value=t),ja()}function _l(){var t;const e=(t=document.getElementById("epics-project-filter"))==null?void 0:t.value;e&&(It(e),ks(e)),ja()}async function ja(){var t,n;const e=document.getElementById("epics-list");if(e){e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((t=B())!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value;let i;if(s?i=await $.getIssues({project_id:s,issue_type:"epic"}):i=await $.getTeamIssues(B().id,{issue_type:"epic"}),!i||i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Click "+ New Epic" above or use the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await $.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));yg(a,e)}catch(s){e.innerHTML=`<div class="empty-state">Failed to load epics: ${f(s.message||String(s))}</div>`}}}function yg(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(m=>m.status==="done"||m.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,d=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase()),l=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${_(s.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${f(s.identifier)}</td>
                <td class="epic-title">${f(s.title)}</td>
                <td class="epic-progress">
                    <div class="epic-progress-bar-container">
                        <div class="epic-progress-bar">
                            <div class="epic-progress-fill${o===100?" epic-progress-complete":""}" style="width: ${o}%"></div>
                        </div>
                        <span class="epic-progress-text">${r}</span>
                    </div>
                </td>
                <td class="epic-estimate">${l}</td>
                <td class="epic-status"><span class="status-badge ${c}">${d}</span></td>
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&hg(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Tl(){var n;const e=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value,t=ie().map(s=>`
        <option value="${_(s.id)}" ${s.id===e?"selected":""}>${f(s.name)}</option>
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
    `,H(),document.getElementById("create-epic-form").addEventListener("submit",wg),document.getElementById("create-epic-title").focus()}async function wg(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){v("Please select a project","error");return}if(!n){v("Please enter a title","error");return}try{const i=await $.createIssue(t,{title:n,description:s||null,issue_type:"epic"});W(),v(`Created epic ${i.identifier}`,"success"),ja()}catch(i){v(`Failed to create epic: ${i.message}`,"error")}}let D={api:null,getCurrentView:()=>"epics",showToast:()=>{},navigateTo:()=>{},getProjects:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888"};function kg(e){D={...D,...e}}async function Ma(e){try{let t;if(e.includes("-")?t=await D.api.getIssueByIdentifier(e):t=await D.api.getIssue(e),t){if(t.issue_type!=="epic"){window.viewIssue?window.viewIssue(t.id,!1):D.navigateTo("epics",!1);return}await Pa(t.id,!1)}else D.navigateTo("epics",!1)}catch{D.navigateTo("epics",!1)}}async function Pa(e,t=!0){try{const[n,s,i,a]=await Promise.all([D.api.getIssue(e),D.api.getSubIssues(e),D.api.getActivities(e),D.api.getComments(e)]);if(n.issue_type!=="epic"){window.viewIssue?window.viewIssue(e,t):D.navigateTo("epics",!1);return}t&&history.pushState({epicId:e,view:D.getCurrentView()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=D.getCurrentView()||"epics",c=D.getProjects().find(y=>y.id===n.project_id),d=n.assignee_id?D.getAssigneeById(n.assignee_id):null,l=d?D.formatAssigneeName(d):null,m=s.length,u=s.filter(y=>y.status==="done"||y.status==="canceled").length,g=m>0?Math.round(u/m*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${r}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${c?D.escapeHtml(c.name):"Project"} › ${D.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${D.escapeHtml(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${xs(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${g===100?" epic-progress-complete":""}" style="width: ${g}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${u} of ${m} done</span>
                                <span>${g}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:s.map(y=>{const x=y.assignee_id?D.getAssigneeById(y.assignee_id):null,L=x?D.formatAssigneeName(x):null;return`
                                <div class="sub-issue-item" data-issue-id="${D.escapeAttr(y.id)}" data-identifier="${D.escapeAttr(y.identifier)}">
                                    <span class="sub-issue-status">${D.getStatusIcon(y.status)}</span>
                                    <span class="sub-issue-id">${D.escapeHtml(y.identifier)}</span>
                                    <span class="sub-issue-title">${D.escapeHtml(y.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(y.status||"backlog").replace(/_/g,"-")}">${D.formatStatus(y.status)}</span>
                                    ${L?`<span class="sub-issue-assignee">${D.escapeHtml(L)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ea(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${na(y)}</span>
                                        <span class="activity-actor">by ${D.escapeHtml(ta(y))}</span>
                                        <span class="activity-time">${D.formatTimeAgo(y.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(y=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${D.escapeHtml(y.author_name||"User")}</span>
                                            <span class="comment-date">${D.formatTimeAgo(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${D.escapeHtml(y.content||"")}</div>
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
                                ${D.getStatusIcon(n.status)}
                                ${D.formatStatus(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${D.getPriorityIcon(n.priority)}
                                ${D.formatPriority(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${l?D.escapeHtml(l):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${D.formatEstimate(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(y=>`
                                    <span class="issue-label" style="background: ${D.sanitizeColor(y.color)}20; color: ${D.sanitizeColor(y.color)}">${D.escapeHtml(y.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${D.escapeHtml(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const b=o.querySelector(".sub-issues-list");b&&b.addEventListener("click",y=>{const x=y.target.closest(".sub-issue-item");x&&x.dataset.issueId&&window.viewIssue&&window.viewIssue(x.dataset.issueId)})}catch(n){D.showToast(`Failed to load epic: ${n.message}`,"error")}}function $g(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function Eg(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function xl(e,t,n="#issues-list .list-item"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Ig(e){return function(n){if(e.getCurrentView()!=="issues"||n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll("#issues-list .list-item");if(s.length===0)return;const i=e.getSelectedIndex();switch(n.key){case"j":n.preventDefault(),xl(i+1,e.setSelectedIndex);break;case"k":n.preventDefault(),xl(i-1,e.setSelectedIndex);break;case"Enter":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.viewIssue(a)}break;case"e":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.showEditIssueModal(a)}break;case"Escape":i>=0&&(n.preventDefault(),s.forEach(a=>a.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const yt=new Map,Sl=6e4,Ra=100;let me=null,Na=null,Ha=null,qn=null,Ll=!1;const _g={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Tg={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Cl={api:null};let qa={...Cl};function xg(e={}){qa={...Cl,...e},me||(me=document.createElement("div"),me.className="issue-tooltip",me.style.display="none",document.body.appendChild(me),me.addEventListener("mouseenter",()=>{clearTimeout(Na)}),me.addEventListener("mouseleave",()=>{Oa()})),Ll||(document.addEventListener("mouseover",Sg),document.addEventListener("mouseout",Lg),Ll=!0)}function Sg(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Cg(t);if(n){if(n===qn&&me.style.display!=="none"){clearTimeout(Na);return}clearTimeout(Ha),Ha=setTimeout(()=>{Ag(t,n)},200)}}function Lg(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Ha),Na=setTimeout(()=>{Oa()},150))}function Cg(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Ag(e,t){qn=t;const n=e.getBoundingClientRect();me.style.left=`${n.left+window.scrollX}px`,me.style.top=`${n.bottom+window.scrollY+8}px`,me.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',me.style.display="block";try{const s=await Dg(t);if(qn!==t)return;jg(s)}catch{if(qn!==t)return;me.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Oa(){me&&(me.style.display="none"),qn=null}function Bg(){const e=Date.now();for(const[t,n]of yt.entries())e-n.timestamp>=Sl&&yt.delete(t)}async function Dg(e){yt.size>Ra/2&&Bg();const t=yt.get(e);if(t&&Date.now()-t.timestamp<Sl)return t.issue;if(!qa.api)throw new Error("API not initialized");const n=await qa.api.getIssueByIdentifier(e);if(yt.size>=Ra){const s=Array.from(yt.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Ra/2);for(const[a]of i)yt.delete(a)}return yt.set(e,{issue:n,timestamp:Date.now()}),n}function jg(e){const t=_g[e.status]||"#6b7280",n=Tg[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";me.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${f(e.identifier)}</span>
            <span class="issue-tooltip-type">${f(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${f(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Mg(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Pg(e.priority)}</span>
        </div>
    `}function Mg(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Pg(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}let On=0,Fn=null;const Ct=new Map;function lt(e,t){return Ct.has(e)||Ct.set(e,new Set),Ct.get(e).add(t),()=>{var n;return(n=Ct.get(e))==null?void 0:n.delete(t)}}function Rg(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function Al(e){Fn&&(clearTimeout(Fn),Fn=null);const t=Fd();t&&(t.close(),No(null));const n=api.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);No(a),a.onopen=()=>{console.log("WebSocket connected"),On>0&&v("Live updates reconnected","success"),On=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(c){console.error("WebSocket: malformed message",c);return}Ng(r)},a.onclose=()=>{console.log("WebSocket disconnected"),On++,On===1&&v("Live updates disconnected. Reconnecting...","warning");const o=Rg(On-1);Fn=setTimeout(()=>{Fn=null,B()&&B().id===e&&Al(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Ng(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Ct.get(`${n}:${t}`);if(a)for(const c of a)try{c(s,i)}catch(d){console.error(`WebSocket handler error (${n}:${t}):`,d)}const o=Ct.get(n);if(o)for(const c of o)try{c(s,i)}catch(d){console.error(`WebSocket handler error (${n}):`,d)}const r=Ct.get("*");if(r)for(const c of r)try{c(s,i)}catch(d){console.error("WebSocket handler error (*):",d)}}function Hg(){lt("issue:created",qg),lt("issue:updated",Og),lt("issue:deleted",Fg),lt("comment",Ug),lt("relation",Gg),lt("attestation",zg),lt("activity",Kg),lt("project",Wg),lt("sprint",Vg)}function qg(e){var i,a,o;const t=Oe(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,Xe(r),G()==="issues"&&rt()}else Xe([e,...t]),G()==="issues"&&rt(),v(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=_i())==null?void 0:i.id)){const r=js(),c=r.findIndex(l=>l.id===e.id),d=r.findIndex(l=>l._isOptimistic&&l.title===e.title);if(c===-1&&d===-1)Bn([e,...r]),G()==="my-issues"&&Dn();else if(d>=0){const l=[...r];l[d]=e,Bn(l),G()==="my-issues"&&Dn()}}G()==="my-issues"&&Gt({showLoading:!1}),G()==="board"?ht():G()==="sprints"&&st(),G()==="issue-detail"&&e.parent_id===((a=Qe())==null?void 0:a.id)&&ae((o=Qe())==null?void 0:o.id,!1)}function Og(e){const t=Oe();t.some(s=>s.id===e.id)&&Xe(t.map(s=>s.id===e.id?e:s));const n=js();if(n.some(s=>s.id===e.id)&&Bn(n.map(s=>s.id===e.id?e:s)),G()==="issues")rt();else if(G()==="my-issues")Dn(),Gt({showLoading:!1});else if(G()==="board")ht();else if(G()==="sprints")st();else if(G()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&ae(e.id)}}function Fg(e){var t;Xe(Oe().filter(n=>n.id!==e.id)),Bn(js().filter(n=>n.id!==e.id)),G()==="issues"?rt():G()==="my-issues"?(Dn(),Gt({showLoading:!1})):G()==="board"?ht():G()==="sprints"&&st(),v(`Issue ${e.identifier} deleted`,"info"),G()==="issue-detail"&&((t=Qe())==null?void 0:t.id)===e.id&&(v(`Issue ${e.identifier} was deleted`,"warning"),Y("my-issues"))}function Ug(e){var t;G()==="my-issues"&&Gt({showLoading:!1}),G()==="issue-detail"&&((t=Qe())==null?void 0:t.id)===e.issue_id&&ae(e.issue_id,!1)}function Gg(e){var t;if(G()==="issue-detail"){const n=(t=Qe())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&ae(n,!1)}}function zg(e){var t;G()==="gate-approvals"&&typeof window.loadGateApprovals=="function"&&window.loadGateApprovals(),G()==="issue-detail"&&((t=Qe())==null?void 0:t.id)===e.issue_id&&ae(e.issue_id,!1)}function Kg(e){var t;G()==="my-issues"&&Gt({showLoading:!1}),G()==="issue-detail"&&((t=Qe())==null?void 0:t.id)===e.issue_id&&ae(e.issue_id,!1)}function Wg(e,{type:t}){$e().then(()=>{G()==="projects"&&qt()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?v(`New project: ${e.name}`,"info"):t==="deleted"&&v(`Project ${e.name} deleted`,"info")}function Vg(){G()==="sprints"&&st()}function Jg(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Yg(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=Ht().map(d=>({id:d.id,name:d.name||d.email||"User",email:d.email||"",handle:Jg(d)})).filter(d=>!r||d.handle.includes(r)||d.name.toLowerCase().includes(r)||d.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(d=>`
            <button type="button" class="mention-suggestion" data-handle="${_(d.handle)}">
                <span class="mention-name">${f(d.name)}</span>
                <span class="mention-handle">@${f(d.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(d=>{d.addEventListener("click",()=>{const l=d.dataset.handle,m=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${l} `),u=e.value.slice(i);e.value=m+u,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}function Zg(e){const{getLabels:t,setLabels:n,getCurrentTeam:s,getCurrentDetailIssue:i,setCurrentDetailIssue:a,getCurrentDetailSprints:o}=e;Vp({getCurrentUser:_i,getCurrentTeam:s,renderIssueRow:Ge,formatActivityText:na,formatActivityActor:ta,getActivityIcon:ea,navigateToIssueByIdentifier:Da,viewDocument:Re}),$m({api,showToast:v,getProjects:ie,getProjectFromUrl:_t,setGlobalProjectSelection:It,updateUrlWithProject:ks,escapeHtml:f,escapeAttr:_,escapeJsString:I,formatPriority:Ze}),Am({getIssues:Oe,getAssigneeById:Rs,formatAssigneeName:Rn,formatEstimate:In,getSprintCache:Ku,formatStatus:pt,formatPriority:Ze,formatIssueType:is,escapeHtml:f,escapeAttr:_,escapeJsString:I,sanitizeColor:ke,renderAvatar:as,getAssigneeOptionList:Ns,getGroupByValue:kl}),sm({api,getIssues:Oe,setIssues:Xe,getMyIssues:js,setMyIssues:Bn,getCurrentDetailIssue:i,setCurrentDetailIssue:a,getLabels:t,setLabels:n,getCurrentTeam:s,getCurrentDetailSprints:o,closeAllDropdowns:hn,registerDropdownClickOutside:Ei,setDropdownKeyHandler:Cd,showToast:v,getStatusIcon:Zt,getPriorityIcon:Yt,formatStatus:pt,formatPriority:Ze,formatIssueType:is,formatEstimate:In,formatAssigneeName:Rn,formatAssigneeOptionLabel:va,getAssigneeOptionList:Ns,getAssigneeById:Rs,getEstimateOptions:En,renderAvatar:as,renderIssueRow:Ge,escapeHtml:f,escapeAttr:_,escapeJsString:I,sanitizeColor:ke,updateSprintCacheForProject:dp,updateSprintBudgetBar:Ea}),cm({api,getProjects:ie,getEstimateOptions:En,getCurrentView:G,showModal:H,closeModal:W,showToast:v,viewIssue:ae,loadIssues:bt,loadMyIssues:ua,closeAllDropdowns:hn,registerDropdownClickOutside:Ei,getLabels:t,setLabels:n,getCurrentTeam:s,getStatusIcon:Zt,getPriorityIcon:Yt,formatStatus:pt,formatPriority:Ze,formatIssueType:is,formatAssigneeName:Rn,formatAssigneeOptionLabel:va,getAssigneeOptionList:Ns,renderAvatar:as,escapeHtml:f,escapeAttr:_,escapeJsString:I}),ym({api,showModal:H,closeModal:W,showToast:v,viewIssue:ae,navigateTo:Y,loadIssues:bt,loadProjects:$e,getEstimateOptions:En,escapeHtml:f,escapeAttr:_,escapeJsString:I}),pp({api,getCurrentView:G,showToast:v,showModal:H,closeModal:W,navigateTo:Y,getProjects:ie,getMembers:Ht,getAssigneeById:Rs,formatAssigneeName:Rn,formatStatus:pt,formatPriority:Ze,formatIssueType:is,formatEstimate:In,formatTimeAgo:jt,getStatusIcon:Zt,getPriorityIcon:Yt,renderMarkdown:Cs,renderAvatar:as,escapeHtml:f,escapeAttr:_,escapeJsString:I,sanitizeColor:ke,showDetailDropdown:Wr,setupMentionAutocomplete:Yg,renderTicketRitualActions:Lp,getIssues:Oe}),kg({api,getCurrentView:G,showToast:v,navigateTo:Y,getProjects:ie,getAssigneeById:Rs,formatAssigneeName:Rn,formatStatus:pt,formatPriority:Ze,formatEstimate:In,formatTimeAgo:jt,getStatusIcon:Zt,getPriorityIcon:Yt,escapeHtml:f,escapeAttr:_,escapeJsString:I,sanitizeColor:ke})}const Bl='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Dl(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function jl(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Dl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Bl);n&&n.focus()}}}function Un(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Dl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(Bl);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Un()});async function Ml(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){v("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=ie().find(d=>d.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Xe([r,...Oe()]),rt();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const d=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const l=Oe(),m=l.findIndex(u=>u.id===a);m!==-1&&(l[m]=d,Xe(l)),rt(),$e(),v("Issue created!","success")}catch(d){Xe(Oe().filter(l=>l.id!==a)),rt(),v(`Failed to create issue: ${d.message}`,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}gg({beforeNavigate:()=>{or(),window._onRitualsChanged=null,xi(null),Ho(null),Un(),Oa()},detailRoute:e=>e[0]==="epic"&&e[1]?(Ma(e[1]),!0):e[0]==="issue"&&e[1]?(Ls(e[1]),!0):e[0]==="document"&&e[1]?(df(e[1]),!0):e[0]==="sprint"&&e[1]?(Yu(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(ar(e[1]),!0):!1,detailPopstate:e=>e.epicId?(Pa(e.epicId,!1),!0):e.issueId?(ae(e.issueId,!1),!0):e.identifier?(Ls(e.identifier),!0):e.documentId?(Re(e.documentId,!1),!0):e.sprintId?(Ji(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=_t();e&&ie().some(t=>t.id===e)&&It(e)},issueNavigate:e=>Ls(e),epicNavigate:e=>Ma(e)}),mg({"my-issues":()=>{ua(),Gt()},"gate-approvals":()=>{Ln()},issues:()=>{Hm(),ug(),Nm().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),ll())}}),yl().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}bt()})},epics:()=>{bg()},board:()=>{wa()},projects:()=>{$e().then(qt)},sprints:()=>{vr()},rituals:()=>{Tr()},documents:()=>{Rt()},team:()=>{Gi(),tr(),gs()},settings:()=>{la(),Ni(),_p()}});function Xg(){const e=document.getElementById("modal-overlay");if(e){e.addEventListener("click",()=>W());const n=e.querySelector(".modal");n&&n.addEventListener("click",s=>s.stopPropagation())}const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>W())}function Qg(){const e={showCreateIssueModal:Vt,showCreateEpicModal:Tl,showCreateProjectModal:vs,showCreateDocumentModal:ds,showCreateTeamModal:hs,showEditTeamModal:zi,showInviteModal:fs,showCreateApiKeyModal:ca,showCreateAgentModal:Hi,resetOnboarding:Ps,logout:rs,navigateToProjects:()=>Y("projects")};document.querySelectorAll("[data-action]").forEach(t=>{const n=e[t.dataset.action];n&&t.addEventListener("click",()=>n())})}function ef(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>Ki(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>cr());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>dr()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>ur(a))})}function tf(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Mi("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Mi("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Pi());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>zo());const i=document.getElementById("doc-project-filter");i&&i.addEventListener("change",()=>cs());const a=document.getElementById("doc-sort");a&&a.addEventListener("change",()=>et())}function nf(){const e=document.getElementById("dashboard-project-filter");e&&e.addEventListener("change",()=>Ms());const t=document.getElementById("my-issues-status-filter");t&&t.addEventListener("change",()=>Ms())}function sf(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>wl());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",g=>ul(g));const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",g=>pl(g));const s=document.getElementById("project-filter");s&&s.addEventListener("change",()=>Ia()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Os("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Os("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")&&g.addEventListener("click",()=>Os("label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Hn())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Fs())}const a=document.getElementById("priority-filter-dropdown");if(a){a.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Us())});const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Gs())}const o=document.getElementById("label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>zs())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Ae());const c=document.getElementById("assignee-filter");c&&c.addEventListener("change",()=>Ae());const d=document.getElementById("sprint-filter");d&&d.addEventListener("change",()=>Ae());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>bt());const m=document.getElementById("group-by-select");m&&m.addEventListener("change",()=>_a());const u=document.querySelector(".quick-create-input");u&&u.addEventListener("keydown",g=>Ml(g))}function af(){const e=document.getElementById("board-project-filter");e&&e.addEventListener("change",()=>nl());const t=document.getElementById("epics-project-filter");t&&t.addEventListener("change",()=>_l());const n=document.getElementById("sprint-project-filter");n&&n.addEventListener("change",()=>br())}function of(){const e=document.getElementById("rituals-project-filter");e&&e.addEventListener("change",()=>sa());const t=document.getElementById("rituals-view");t&&t.querySelectorAll(".settings-tab[data-tab]").forEach(n=>{n.addEventListener("click",()=>xr(n.dataset.tab))})}function rf(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>ms());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Vt()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),Y(o.dataset.view)})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Ui());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>Un());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>jl());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Vt())}document.addEventListener("DOMContentLoaded",async()=>{if(Gd(),rf(),Xg(),Qg(),nf(),sf(),af(),of(),ef(),tf(),lf(),cf(),xg({api}),vg(),Hg(),api.getToken())try{const e=await api.getMe();Dd(e),window.currentUser=e,await Pl()}catch{api.logout(),os()}else os()});function lf(){const e=document.getElementById("theme-toggle");if(!e)return;const t=pd()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),md(n?"light":"dark")})}function cf(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");Da(s)}}})}async function Pl(){qo(),Fo(),await ps();const e=Yo();if(e.length===0&&!Pr()){fa();return}e.length>0&&await Fi(e[0],!0)}window.initApp=Pl,window.viewIssue=ae,window.viewIssueByPath=Ls,window.viewEpic=Pa,window.viewEpicByPath=Ma,window.toggleTicketRituals=Er,window.toggleSection=$r,window.connectWebSocket=Al,window.buildAssignees=()=>em(Ht,hu),window.updateAssigneeFilter=tm,window.loadLabels=uf,window.resetOnboarding=Ps,window.viewDocument=Re;async function df(e){try{await Re(e,!1)}catch{Y("documents",!1)}}async function uf(){if(B())try{const e=await api.getLabels(B().id);Mo(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("keydown",$g({closeModal:W,closeSidebar:Un,navigateTo:Y,showCreateIssueModal:Vt,showKeyboardShortcutsHelp:Rl,isModalOpen:$i,focusSearch:()=>{Y("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function Rl(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,H()}Up([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>Y("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>Y("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>Y("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>Y("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>Y("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>Y("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>Y("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{Y("issues"),setTimeout(Vt,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{Y("projects"),setTimeout(vs,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{Y("documents"),setTimeout(ds,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>hs(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{Y("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{Y("team"),setTimeout(fs,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Rl(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Ps(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>rs(),category:"Account"}]),Zg({getLabels:Md,setLabels:Mo,getCurrentTeam:B,getCurrentDetailIssue:Qe,setCurrentDetailIssue:xi,getCurrentDetailSprints:Ud});const pf=H;window.showModal=function(){pf(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",Eg({isModalOpen:$i,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:jr,openCommandPalette:Gp,closeCommandPalette:Ds})),document.addEventListener("keydown",Ig({getCurrentView:G,getSelectedIndex:Rd,setSelectedIndex:Ro,viewIssue:ae,showEditIssueModal:el,isModalOpen:$i,isCommandPaletteOpen:jr})),Object.assign(window,{escapeHtml:f,renderMarkdown:Cs,handleLogin:Ci,handleSignup:Ai,showLogin:Si,showSignup:Li,logout:rs,navigateTo:Y,handleRoute:El,closeModal:W,toggleSidebar:jl,closeSidebar:Un,getProjectFromUrl:_t,updateUrlWithProject:ks,toggleTeamDropdown:ms,toggleUserDropdown:Ui,showCreateTeamModal:hs,showEditTeamModal:zi,showInviteModal:fs,showCreateIssueModal:Vt,loadIssues:bt,filterIssues:Ae,filterMyIssues:Ms,debounceSearch:wl,handleQuickCreate:Ml,onProjectFilterChange:Ia,updateGroupBy:_a,toggleGroup:Rm,viewIssue:ae,showEditIssueModal:el,editDescription:vp,setDescriptionEditorMode:bp,updateIssueField:Nn,handleUpdateIssue:wm,deleteIssue:km,navigateToIssueByIdentifier:Da,handleCreateIssueNew:vm,handleCreateIssueAndNew:bm,setCreateIssueField:hm,toggleCreateIssueDropdown:gm,toggleCreateIssueLabelSelection:om,createLabelForCreateIssue:Zr,createLabelFromDropdown:Yr,handleAddComment:hp,showCreateSubIssueModal:pm,handleCreateSubIssue:mm,showAddRelationModal:yp,handleAddRelation:Ep,deleteRelation:Ip,searchIssuesToRelate:wp,selectIssueForRelation:kp,clearSelectedRelation:$p,showDetailDropdown:Wr,showInlineDropdown:Kr,toggleIssueLabel:im,toggleMultiSelect:Os,updateStatusFilter:Hn,updatePriorityFilter:Us,updateLabelFilter:$a,clearStatusFilter:Fs,clearPriorityFilter:Gs,clearLabelFilter:zs,toggleFilterMenu:ul,toggleDisplayMenu:pl,showFilterCategoryOptions:Te,setProjectFilter:fl,clearProjectFilter:Ym,toggleStatusOption:Xm,clearStatusFilterNew:Qm,setStatusPreset:Zm,togglePriorityOption:eg,clearPriorityFilterNew:tg,setTypeFilter:hl,clearTypeFilter:ng,setAssigneeFilter:vl,clearAssigneeFilter:sg,setSprintFilter:bl,clearSprintFilter:ig,toggleLabelOption:ag,clearLabelFilterNew:og,setSort:lg,setGroupBy:cg,clearAllFilters:dg,updateFilterChips:xe,updateFilterCountBadge:Se,loadBoard:ka,onBoardProjectChange:nl,handleDragStart:Em,handleDragEnd:Im,handleDragOver:_m,handleDragLeave:Tm,handleCardDragOver:xm,handleCardDragLeave:Sm,handleDrop:Lm,handleCardDrop:Cm,loadSprints:st,onSprintProjectChange:br,viewSprint:Ji,showEditBudgetModal:tp,handleUpdateBudget:np,showCloseSprintConfirmation:sp,completeSprint:ip,loadLimboStatus:Is,showLimboDetailsModal:Yi,showCreateDocumentModal:ds,showCreateProjectModal:vs,onEpicsProjectChange:_l,showCreateEpicModal:Tl,dismissApprovalsExplainer:qp,loadGateApprovals:Ln,loadRitualsView:Tr,onRitualsProjectChange:sa,switchRitualsTab:xr,toggleRitualConditions:Mu,approveRitual:xp,completeGateRitual:Sr,toggleSection:$r,toggleTicketRituals:Er,attestTicketRitual:Bp,approveTicketRitual:Dp,showCompleteTicketRitualModal:jp,showAttestTicketRitualModal:Cp,showCreateApiKeyModal:ca,copyApiKey:Br,revokeApiKey:Dr,showCreateAgentModal:Hi,toggleCreateIssueOptions:dm,applyIssueTemplate:um,updateCreateIssueProject:fm,handleLabelCreateKey:am,handleCreateIssueLabelKey:rm}),window.marked=U,window.DOMPurify=Ao,console.log("Chaotic frontend loaded via Vite")})();
