var Th=Object.defineProperty;var Sh=(nt,ve,Tt)=>ve in nt?Th(nt,ve,{enumerable:!0,configurable:!0,writable:!0,value:Tt}):nt[ve]=Tt;var z=(nt,ve,Tt)=>Sh(nt,typeof ve!="symbol"?ve+"":ve,Tt);(function(){"use strict";var no;function nt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ve=nt();function Tt(e){ve=e}var yn={exec:()=>null};function H(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(be.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var be={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},vc=/^(?:[ \t]*(?:\n|$))+/,bc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,yc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,wn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,wc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,xi=/(?:[*+-]|\d{1,9}[.)])/,bo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,yo=H(bo).replace(/bull/g,xi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),kc=H(bo).replace(/bull/g,xi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),_i=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,$c=/^[^\n]+/,Ii=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ec=H(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ii).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),xc=H(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,xi).getRegex(),rs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ti=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_c=H("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ti).replace("tag",rs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),wo=H(_i).replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rs).getRegex(),Ic=H(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",wo).getRegex(),Si={blockquote:Ic,code:bc,def:Ec,fences:yc,heading:wc,hr:wn,html:_c,lheading:yo,list:xc,newline:vc,paragraph:wo,table:yn,text:$c},ko=H("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rs).getRegex(),Tc={...Si,lheading:kc,table:ko,paragraph:H(_i).replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ko).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rs).getRegex()},Sc={...Si,html:H(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ti).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:yn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:H(_i).replace("hr",wn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",yo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Lc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Cc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,$o=/^( {2,}|\\)\n(?!\s*$)/,Ac=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ls=/[\p{P}\p{S}]/u,Li=/[\s\p{P}\p{S}]/u,Eo=/[^\s\p{P}\p{S}]/u,Bc=H(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Li).getRegex(),xo=/(?!~)[\p{P}\p{S}]/u,jc=/(?!~)[\s\p{P}\p{S}]/u,Mc=/(?:[^\s\p{P}\p{S}]|~)/u,Dc=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,_o=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Rc=H(_o,"u").replace(/punct/g,ls).getRegex(),Pc=H(_o,"u").replace(/punct/g,xo).getRegex(),Io="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Nc=H(Io,"gu").replace(/notPunctSpace/g,Eo).replace(/punctSpace/g,Li).replace(/punct/g,ls).getRegex(),qc=H(Io,"gu").replace(/notPunctSpace/g,Mc).replace(/punctSpace/g,jc).replace(/punct/g,xo).getRegex(),Oc=H("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Eo).replace(/punctSpace/g,Li).replace(/punct/g,ls).getRegex(),Hc=H(/\\(punct)/,"gu").replace(/punct/g,ls).getRegex(),Fc=H(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Uc=H(Ti).replace("(?:-->|$)","-->").getRegex(),Gc=H("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Uc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),cs=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,zc=H(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",cs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),To=H(/^!?\[(label)\]\[(ref)\]/).replace("label",cs).replace("ref",Ii).getRegex(),So=H(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ii).getRegex(),Vc=H("reflink|nolink(?!\\()","g").replace("reflink",To).replace("nolink",So).getRegex(),Ci={_backpedal:yn,anyPunctuation:Hc,autolink:Fc,blockSkip:Dc,br:$o,code:Cc,del:yn,emStrongLDelim:Rc,emStrongRDelimAst:Nc,emStrongRDelimUnd:Oc,escape:Lc,link:zc,nolink:So,punctuation:Bc,reflink:To,reflinkSearch:Vc,tag:Gc,text:Ac,url:yn},Wc={...Ci,link:H(/^!?\[(label)\]\((.*?)\)/).replace("label",cs).getRegex(),reflink:H(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",cs).getRegex()},Ai={...Ci,emStrongRDelimAst:qc,emStrongLDelim:Pc,url:H(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Kc={...Ai,br:H($o).replace("{2,}","*").getRegex(),text:H(Ai.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ds={normal:Si,gfm:Tc,pedantic:Sc},kn={normal:Ci,gfm:Ai,breaks:Kc,pedantic:Wc},Yc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Lo=e=>Yc[e];function Ve(e,t){if(t){if(be.escapeTest.test(e))return e.replace(be.escapeReplace,Lo)}else if(be.escapeTestNoEncode.test(e))return e.replace(be.escapeReplaceNoEncode,Lo);return e}function Co(e){try{e=encodeURI(e).replace(be.percentDecode,"%")}catch{return null}return e}function Ao(e,t){var a;const n=e.replace(be.findPipe,(o,r,c)=>{let d=!1,l=r;for(;--l>=0&&c[l]==="\\";)d=!d;return d?"|":" |"}),s=n.split(be.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(be.slashPipe,"|");return s}function $n(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Zc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Bo(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function Xc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var us=class{constructor(e){z(this,"options");z(this,"rules");z(this,"lexer");this.options=e||ve}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:$n(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Xc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=$n(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:$n(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=$n(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const d=r.join(`
`),l=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${d}`:d,i=i?`${i}
${l}`:l;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,a,!0),this.lexer.state.top=p,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const v=m,b=v.raw+`
`+n.join(`
`),w=this.blockquote(b);a[a.length-1]=w,s=s.substring(0,s.length-v.raw.length)+w.raw,i=i.substring(0,i.length-v.text.length)+w.text;break}else if((m==null?void 0:m.type)==="list"){const v=m,b=v.raw+`
`+n.join(`
`),w=this.list(b);a[a.length-1]=w,s=s.substring(0,s.length-m.raw.length)+w.raw,i=i.substring(0,i.length-v.raw.length)+w.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,d="",l="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),m=e.split(`
`,1)[0],v=!p.trim(),b=0;if(this.options.pedantic?(b=2,l=p.trimStart()):v?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,l=p.slice(b),b+=t[1].length),v&&this.rules.other.blankLine.test(m)&&(d+=m+`
`,e=e.substring(m.length+1),c=!0),!c){const T=this.rules.other.nextBulletRegex(b),R=this.rules.other.hrRegex(b),A=this.rules.other.fencesBeginRegex(b),k=this.rules.other.headingBeginRegex(b),B=this.rules.other.htmlBeginRegex(b);for(;e;){const j=e.split(`
`,1)[0];let U;if(m=j,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),U=m):U=m.replace(this.rules.other.tabCharGlobal,"    "),A.test(m)||k.test(m)||B.test(m)||T.test(m)||R.test(m))break;if(U.search(this.rules.other.nonSpaceChar)>=b||!m.trim())l+=`
`+U.slice(b);else{if(v||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(p)||k.test(p)||R.test(p))break;l+=`
`+m}!v&&!m.trim()&&(v=!0),d+=j+`
`,e=e.substring(j.length+1),p=U.slice(b)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0));let w=null,_;this.options.gfm&&(w=this.rules.other.listIsTask.exec(l),w&&(_=w[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:d,task:!!w,checked:_,loose:!1,text:l,tokens:[]}),i.raw+=d}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const d=i.items[c].tokens.filter(p=>p.type==="space"),l=d.length>0&&d.some(p=>this.rules.other.anyLine.test(p.raw));i.loose=l}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Ao(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(Ao(r,a.header.length).map((c,d)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[d]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=$n(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Zc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Bo(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Bo(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,d=0;const l=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+a);(s=l.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){d+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+d);const p=[...s[0]][0].length,m=e.slice(0,a+s.index+p+r);if(Math.min(a,r)%2){const b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}const v=m.slice(2,-2);return{type:"strong",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},st=class ho{constructor(t){z(this,"tokens");z(this,"options");z(this,"state");z(this,"tokenizer");z(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ve,this.options.tokenizer=this.options.tokenizer||new us,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:be,block:ds.normal,inline:kn.normal};this.options.pedantic?(n.block=ds.pedantic,n.inline=kn.pedantic):this.options.gfm&&(n.block=ds.gfm,this.options.breaks?n.inline=kn.breaks:n.inline=kn.gfm),this.tokenizer.rules=n}static get rules(){return{block:ds,inline:kn}}static lex(t,n){return new ho(n).lex(t)}static lexInline(t,n){return new ho(n).inlineTokens(t)}lex(t){t=t.replace(be.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(be.tabCharGlobal,"    ").replace(be.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(d=>(r=d.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const d=n.at(-1);r.raw.length===1&&d!==void 0?d.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let d=1/0;const l=t.slice(1);let p;this.options.extensions.startBlock.forEach(m=>{p=m.call({lexer:this},l),typeof p=="number"&&p>=0&&(d=Math.min(d,p))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const d=n.at(-1);s&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(t){const d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,d;let s=t,i=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(m=>(l=m.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);const m=n.at(-1);l.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=l.raw,m.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,s,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let p=t;if((d=this.options.extensions)!=null&&d.startInline){let m=1/0;const v=t.slice(1);let b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},v),typeof b=="number"&&b>=0&&(m=Math.min(m,b))}),m<1/0&&m>=0&&(p=t.substring(0,m+1))}if(l=this.tokenizer.inlineText(p)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=l.raw,m.text+=l.text):n.push(l);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},ps=class{constructor(e){z(this,"options");z(this,"parser");this.options=e||ve}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(be.notSpaceStart))==null?void 0:a[0],i=e.replace(be.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ve(s)+'">'+(n?i:Ve(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ve(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Ve(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ve(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=Co(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ve(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=Co(e);if(i===null)return Ve(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ve(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ve(e.text)}},Bi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},it=class vo{constructor(t){z(this,"options");z(this,"renderer");z(this,"textRenderer");this.options=t||ve,this.options.renderer=this.options.renderer||new ps,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Bi}static parse(t,n){return new vo(n).parse(t)}static parseInline(t,n){return new vo(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const d=r,l=this.options.extensions.renderers[d.type].call({parser:this},d);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type)){s+=l||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let d=c,l=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],l+=`
`+this.renderer.text(d);n?s+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):s+=l;continue}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const d=this.options.extensions.renderers[r.type].call({parser:this},r);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=d||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return s}},ms=(no=class{constructor(e){z(this,"options");z(this,"block");this.options=e||ve}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?st.lex:st.lexInline}provideParser(){return this.block?it.parse:it.parseInline}},z(no,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),no),Qc=class{constructor(...e){z(this,"defaults",nt());z(this,"options",this.setOptions);z(this,"parse",this.parseMarkdown(!0));z(this,"parseInline",this.parseMarkdown(!1));z(this,"Parser",it);z(this,"Renderer",ps);z(this,"TextRenderer",Bi);z(this,"Lexer",st);z(this,"Tokenizer",us);z(this,"Hooks",ms);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new ps(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new us(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new ms;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];ms.passThroughHooks.has(a)?i[o]=d=>{if(this.defaults.async)return Promise.resolve(r.call(i,d)).then(p=>c.call(i,p));const l=r.call(i,d);return c.call(i,l)}:i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return st.lex(e,t??this.defaults)}parser(e,t){return it.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?st.lex:st.lexInline,c=a.hooks?a.hooks.provideParser():e?it.parse:it.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(d=>r(d,a)).then(d=>a.hooks?a.hooks.processAllTokens(d):d).then(d=>a.walkTokens?Promise.all(this.walkTokens(d,a.walkTokens)).then(()=>d):d).then(d=>c(d,a)).then(d=>a.hooks?a.hooks.postprocess(d):d).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let d=r(n,a);a.hooks&&(d=a.hooks.processAllTokens(d)),a.walkTokens&&this.walkTokens(d,a.walkTokens);let l=c(d,a);return a.hooks&&(l=a.hooks.postprocess(l)),l}catch(d){return o(d)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Ve(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},St=new Qc;function q(e,t){return St.parse(e,t)}q.options=q.setOptions=function(e){return St.setOptions(e),q.defaults=St.defaults,Tt(q.defaults),q},q.getDefaults=nt,q.defaults=ve,q.use=function(...e){return St.use(...e),q.defaults=St.defaults,Tt(q.defaults),q},q.walkTokens=function(e,t){return St.walkTokens(e,t)},q.parseInline=St.parseInline,q.Parser=it,q.parser=it.parse,q.Renderer=ps,q.TextRenderer=Bi,q.Lexer=st,q.lexer=st.lex,q.Tokenizer=us,q.Hooks=ms,q.parse=q,q.options,q.setOptions,q.use,q.walkTokens,q.parseInline,it.parse,st.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:jo,setPrototypeOf:Mo,isFrozen:Jc,getPrototypeOf:ed,getOwnPropertyDescriptor:td}=Object;let{freeze:ye,seal:Me,create:ji}=Object,{apply:Mi,construct:Di}=typeof Reflect<"u"&&Reflect;ye||(ye=function(t){return t}),Me||(Me=function(t){return t}),Mi||(Mi=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),Di||(Di=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const gs=ke(Array.prototype.forEach),nd=ke(Array.prototype.lastIndexOf),Do=ke(Array.prototype.pop),En=ke(Array.prototype.push),sd=ke(Array.prototype.splice),fs=ke(String.prototype.toLowerCase),Ri=ke(String.prototype.toString),Pi=ke(String.prototype.match),xn=ke(String.prototype.replace),id=ke(String.prototype.indexOf),ad=ke(String.prototype.trim),Re=ke(Object.prototype.hasOwnProperty),we=ke(RegExp.prototype.test),_n=od(TypeError);function ke(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Mi(e,t,s)}}function od(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Di(e,n)}}function D(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:fs;Mo&&Mo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Jc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function rd(e){for(let t=0;t<e.length;t++)Re(e,t)||(e[t]=null);return e}function We(e){const t=ji(null);for(const[n,s]of jo(e))Re(e,n)&&(Array.isArray(s)?t[n]=rd(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=We(s):t[n]=s);return t}function In(e,t){for(;e!==null;){const s=td(e,t);if(s){if(s.get)return ke(s.get);if(typeof s.value=="function")return ke(s.value)}e=ed(e)}function n(){return null}return n}const Ro=ye(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ni=ye(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),qi=ye(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ld=ye(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Oi=ye(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),cd=ye(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Po=ye(["#text"]),No=ye(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Hi=ye(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qo=ye(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),hs=ye(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),dd=Me(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ud=Me(/<%[\w\W]*|[\w\W]*%>/gm),pd=Me(/\$\{[\w\W]*/gm),md=Me(/^data-[\-\w.\u00B7-\uFFFF]+$/),gd=Me(/^aria-[\-\w]+$/),Oo=Me(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),fd=Me(/^(?:\w+script|data):/i),hd=Me(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ho=Me(/^html$/i),vd=Me(/^[a-z][.\w]*(-[.\w]+)+$/i);var Fo=Object.freeze({__proto__:null,ARIA_ATTR:gd,ATTR_WHITESPACE:hd,CUSTOM_ELEMENT:vd,DATA_ATTR:md,DOCTYPE_NAME:Ho,ERB_EXPR:ud,IS_ALLOWED_URI:Oo,IS_SCRIPT_OR_DATA:fd,MUSTACHE_EXPR:dd,TMPLIT_EXPR:pd});const Tn={element:1,text:3,progressingInstruction:7,comment:8,document:9},bd=function(){return typeof window>"u"?null:window},yd=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Uo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Go(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:bd();const t=S=>Go(S);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Tn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:d,NamedNodeMap:l=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:v}=e,b=c.prototype,w=In(b,"cloneNode"),_=In(b,"remove"),T=In(b,"nextSibling"),R=In(b,"childNodes"),A=In(b,"parentNode");if(typeof o=="function"){const S=n.createElement("template");S.content&&S.content.ownerDocument&&(n=S.content.ownerDocument)}let k,B="";const{implementation:j,createNodeIterator:U,createDocumentFragment:le,getElementsByTagName:Se}=n,{importNode:te}=s;let P=Uo();t.isSupported=typeof jo=="function"&&typeof A=="function"&&j&&j.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ge,ERB_EXPR:fe,TMPLIT_EXPR:It,DATA_ATTR:y,ARIA_ATTR:ze,IS_SCRIPT_OR_DATA:Le,ATTR_WHITESPACE:gt,CUSTOM_ELEMENT:bh}=Fo;let{IS_ALLOWED_URI:Kl}=Fo,ae=null;const Yl=D({},[...Ro,...Ni,...qi,...Oi,...Po]);let ce=null;const Zl=D({},[...No,...Hi,...qo,...hs]);let J=Object.seal(ji(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),is=null,so=null;const pn=Object.seal(ji(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Xl=!0,io=!0,Ql=!1,Jl=!0,mn=!1,vi=!0,Nt=!1,ao=!1,oo=!1,gn=!1,bi=!1,yi=!1,ec=!0,tc=!1;const yh="user-content-";let ro=!0,as=!1,fn={},et=null;const lo=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let nc=null;const sc=D({},["audio","video","img","source","image","track"]);let co=null;const ic=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wi="http://www.w3.org/1998/Math/MathML",ki="http://www.w3.org/2000/svg",ft="http://www.w3.org/1999/xhtml";let hn=ft,uo=!1,po=null;const wh=D({},[wi,ki,ft],Ri);let $i=D({},["mi","mo","mn","ms","mtext"]),Ei=D({},["annotation-xml"]);const kh=D({},["title","style","font","a","script"]);let os=null;const $h=["application/xhtml+xml","text/html"],Eh="text/html";let se=null,vn=null;const xh=n.createElement("form"),ac=function(f){return f instanceof RegExp||f instanceof Function},mo=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(vn&&vn===f)){if((!f||typeof f!="object")&&(f={}),f=We(f),os=$h.indexOf(f.PARSER_MEDIA_TYPE)===-1?Eh:f.PARSER_MEDIA_TYPE,se=os==="application/xhtml+xml"?Ri:fs,ae=Re(f,"ALLOWED_TAGS")?D({},f.ALLOWED_TAGS,se):Yl,ce=Re(f,"ALLOWED_ATTR")?D({},f.ALLOWED_ATTR,se):Zl,po=Re(f,"ALLOWED_NAMESPACES")?D({},f.ALLOWED_NAMESPACES,Ri):wh,co=Re(f,"ADD_URI_SAFE_ATTR")?D(We(ic),f.ADD_URI_SAFE_ATTR,se):ic,nc=Re(f,"ADD_DATA_URI_TAGS")?D(We(sc),f.ADD_DATA_URI_TAGS,se):sc,et=Re(f,"FORBID_CONTENTS")?D({},f.FORBID_CONTENTS,se):lo,is=Re(f,"FORBID_TAGS")?D({},f.FORBID_TAGS,se):We({}),so=Re(f,"FORBID_ATTR")?D({},f.FORBID_ATTR,se):We({}),fn=Re(f,"USE_PROFILES")?f.USE_PROFILES:!1,Xl=f.ALLOW_ARIA_ATTR!==!1,io=f.ALLOW_DATA_ATTR!==!1,Ql=f.ALLOW_UNKNOWN_PROTOCOLS||!1,Jl=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,mn=f.SAFE_FOR_TEMPLATES||!1,vi=f.SAFE_FOR_XML!==!1,Nt=f.WHOLE_DOCUMENT||!1,gn=f.RETURN_DOM||!1,bi=f.RETURN_DOM_FRAGMENT||!1,yi=f.RETURN_TRUSTED_TYPE||!1,oo=f.FORCE_BODY||!1,ec=f.SANITIZE_DOM!==!1,tc=f.SANITIZE_NAMED_PROPS||!1,ro=f.KEEP_CONTENT!==!1,as=f.IN_PLACE||!1,Kl=f.ALLOWED_URI_REGEXP||Oo,hn=f.NAMESPACE||ft,$i=f.MATHML_TEXT_INTEGRATION_POINTS||$i,Ei=f.HTML_INTEGRATION_POINTS||Ei,J=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&ac(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(J.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&ac(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(J.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(J.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),mn&&(io=!1),bi&&(gn=!0),fn&&(ae=D({},Po),ce=[],fn.html===!0&&(D(ae,Ro),D(ce,No)),fn.svg===!0&&(D(ae,Ni),D(ce,Hi),D(ce,hs)),fn.svgFilters===!0&&(D(ae,qi),D(ce,Hi),D(ce,hs)),fn.mathMl===!0&&(D(ae,Oi),D(ce,qo),D(ce,hs))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?pn.tagCheck=f.ADD_TAGS:(ae===Yl&&(ae=We(ae)),D(ae,f.ADD_TAGS,se))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?pn.attributeCheck=f.ADD_ATTR:(ce===Zl&&(ce=We(ce)),D(ce,f.ADD_ATTR,se))),f.ADD_URI_SAFE_ATTR&&D(co,f.ADD_URI_SAFE_ATTR,se),f.FORBID_CONTENTS&&(et===lo&&(et=We(et)),D(et,f.FORBID_CONTENTS,se)),f.ADD_FORBID_CONTENTS&&(et===lo&&(et=We(et)),D(et,f.ADD_FORBID_CONTENTS,se)),ro&&(ae["#text"]=!0),Nt&&D(ae,["html","head","body"]),ae.table&&(D(ae,["tbody"]),delete is.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw _n('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw _n('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');k=f.TRUSTED_TYPES_POLICY,B=k.createHTML("")}else k===void 0&&(k=yd(v,i)),k!==null&&typeof B=="string"&&(B=k.createHTML(""));ye&&ye(f),vn=f}},oc=D({},[...Ni,...qi,...ld]),rc=D({},[...Oi,...cd]),_h=function(f){let $=A(f);(!$||!$.tagName)&&($={namespaceURI:hn,tagName:"template"});const I=fs(f.tagName),K=fs($.tagName);return po[f.namespaceURI]?f.namespaceURI===ki?$.namespaceURI===ft?I==="svg":$.namespaceURI===wi?I==="svg"&&(K==="annotation-xml"||$i[K]):!!oc[I]:f.namespaceURI===wi?$.namespaceURI===ft?I==="math":$.namespaceURI===ki?I==="math"&&Ei[K]:!!rc[I]:f.namespaceURI===ft?$.namespaceURI===ki&&!Ei[K]||$.namespaceURI===wi&&!$i[K]?!1:!rc[I]&&(kh[I]||!oc[I]):!!(os==="application/xhtml+xml"&&po[f.namespaceURI]):!1},tt=function(f){En(t.removed,{element:f});try{A(f).removeChild(f)}catch{_(f)}},qt=function(f,$){try{En(t.removed,{attribute:$.getAttributeNode(f),from:$})}catch{En(t.removed,{attribute:null,from:$})}if($.removeAttribute(f),f==="is")if(gn||bi)try{tt($)}catch{}else try{$.setAttribute(f,"")}catch{}},lc=function(f){let $=null,I=null;if(oo)f="<remove></remove>"+f;else{const ne=Pi(f,/^[\r\n\t ]+/);I=ne&&ne[0]}os==="application/xhtml+xml"&&hn===ft&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");const K=k?k.createHTML(f):f;if(hn===ft)try{$=new m().parseFromString(K,os)}catch{}if(!$||!$.documentElement){$=j.createDocument(hn,"template",null);try{$.documentElement.innerHTML=uo?B:K}catch{}}const he=$.body||$.documentElement;return f&&I&&he.insertBefore(n.createTextNode(I),he.childNodes[0]||null),hn===ft?Se.call($,Nt?"html":"body")[0]:Nt?$.documentElement:he},cc=function(f){return U.call(f.ownerDocument||f,f,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},go=function(f){return f instanceof p&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof l)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},dc=function(f){return typeof r=="function"&&f instanceof r};function ht(S,f,$){gs(S,I=>{I.call(t,f,$,vn)})}const uc=function(f){let $=null;if(ht(P.beforeSanitizeElements,f,null),go(f))return tt(f),!0;const I=se(f.nodeName);if(ht(P.uponSanitizeElement,f,{tagName:I,allowedTags:ae}),vi&&f.hasChildNodes()&&!dc(f.firstElementChild)&&we(/<[/\w!]/g,f.innerHTML)&&we(/<[/\w!]/g,f.textContent)||f.nodeType===Tn.progressingInstruction||vi&&f.nodeType===Tn.comment&&we(/<[/\w]/g,f.data))return tt(f),!0;if(!(pn.tagCheck instanceof Function&&pn.tagCheck(I))&&(!ae[I]||is[I])){if(!is[I]&&mc(I)&&(J.tagNameCheck instanceof RegExp&&we(J.tagNameCheck,I)||J.tagNameCheck instanceof Function&&J.tagNameCheck(I)))return!1;if(ro&&!et[I]){const K=A(f)||f.parentNode,he=R(f)||f.childNodes;if(he&&K){const ne=he.length;for(let Ce=ne-1;Ce>=0;--Ce){const vt=w(he[Ce],!0);vt.__removalCount=(f.__removalCount||0)+1,K.insertBefore(vt,T(f))}}}return tt(f),!0}return f instanceof c&&!_h(f)||(I==="noscript"||I==="noembed"||I==="noframes")&&we(/<\/no(script|embed|frames)/i,f.innerHTML)?(tt(f),!0):(mn&&f.nodeType===Tn.text&&($=f.textContent,gs([ge,fe,It],K=>{$=xn($,K," ")}),f.textContent!==$&&(En(t.removed,{element:f.cloneNode()}),f.textContent=$)),ht(P.afterSanitizeElements,f,null),!1)},pc=function(f,$,I){if(ec&&($==="id"||$==="name")&&(I in n||I in xh))return!1;if(!(io&&!so[$]&&we(y,$))){if(!(Xl&&we(ze,$))){if(!(pn.attributeCheck instanceof Function&&pn.attributeCheck($,f))){if(!ce[$]||so[$]){if(!(mc(f)&&(J.tagNameCheck instanceof RegExp&&we(J.tagNameCheck,f)||J.tagNameCheck instanceof Function&&J.tagNameCheck(f))&&(J.attributeNameCheck instanceof RegExp&&we(J.attributeNameCheck,$)||J.attributeNameCheck instanceof Function&&J.attributeNameCheck($,f))||$==="is"&&J.allowCustomizedBuiltInElements&&(J.tagNameCheck instanceof RegExp&&we(J.tagNameCheck,I)||J.tagNameCheck instanceof Function&&J.tagNameCheck(I))))return!1}else if(!co[$]){if(!we(Kl,xn(I,gt,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&f!=="script"&&id(I,"data:")===0&&nc[f])){if(!(Ql&&!we(Le,xn(I,gt,"")))){if(I)return!1}}}}}}}return!0},mc=function(f){return f!=="annotation-xml"&&Pi(f,bh)},gc=function(f){ht(P.beforeSanitizeAttributes,f,null);const{attributes:$}=f;if(!$||go(f))return;const I={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ce,forceKeepAttr:void 0};let K=$.length;for(;K--;){const he=$[K],{name:ne,namespaceURI:Ce,value:vt}=he,bn=se(ne),fo=vt;let de=ne==="value"?fo:ad(fo);if(I.attrName=bn,I.attrValue=de,I.keepAttr=!0,I.forceKeepAttr=void 0,ht(P.uponSanitizeAttribute,f,I),de=I.attrValue,tc&&(bn==="id"||bn==="name")&&(qt(ne,f),de=yh+de),vi&&we(/((--!?|])>)|<\/(style|title|textarea)/i,de)){qt(ne,f);continue}if(bn==="attributename"&&Pi(de,"href")){qt(ne,f);continue}if(I.forceKeepAttr)continue;if(!I.keepAttr){qt(ne,f);continue}if(!Jl&&we(/\/>/i,de)){qt(ne,f);continue}mn&&gs([ge,fe,It],hc=>{de=xn(de,hc," ")});const fc=se(f.nodeName);if(!pc(fc,bn,de)){qt(ne,f);continue}if(k&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!Ce)switch(v.getAttributeType(fc,bn)){case"TrustedHTML":{de=k.createHTML(de);break}case"TrustedScriptURL":{de=k.createScriptURL(de);break}}if(de!==fo)try{Ce?f.setAttributeNS(Ce,ne,de):f.setAttribute(ne,de),go(f)?tt(f):Do(t.removed)}catch{qt(ne,f)}}ht(P.afterSanitizeAttributes,f,null)},Ih=function S(f){let $=null;const I=cc(f);for(ht(P.beforeSanitizeShadowDOM,f,null);$=I.nextNode();)ht(P.uponSanitizeShadowNode,$,null),uc($),gc($),$.content instanceof a&&S($.content);ht(P.afterSanitizeShadowDOM,f,null)};return t.sanitize=function(S){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,I=null,K=null,he=null;if(uo=!S,uo&&(S="<!-->"),typeof S!="string"&&!dc(S))if(typeof S.toString=="function"){if(S=S.toString(),typeof S!="string")throw _n("dirty is not a string, aborting")}else throw _n("toString is not a function");if(!t.isSupported)return S;if(ao||mo(f),t.removed=[],typeof S=="string"&&(as=!1),as){if(S.nodeName){const vt=se(S.nodeName);if(!ae[vt]||is[vt])throw _n("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof r)$=lc("<!---->"),I=$.ownerDocument.importNode(S,!0),I.nodeType===Tn.element&&I.nodeName==="BODY"||I.nodeName==="HTML"?$=I:$.appendChild(I);else{if(!gn&&!mn&&!Nt&&S.indexOf("<")===-1)return k&&yi?k.createHTML(S):S;if($=lc(S),!$)return gn?null:yi?B:""}$&&oo&&tt($.firstChild);const ne=cc(as?S:$);for(;K=ne.nextNode();)uc(K),gc(K),K.content instanceof a&&Ih(K.content);if(as)return S;if(gn){if(bi)for(he=le.call($.ownerDocument);$.firstChild;)he.appendChild($.firstChild);else he=$;return(ce.shadowroot||ce.shadowrootmode)&&(he=te.call(s,he,!0)),he}let Ce=Nt?$.outerHTML:$.innerHTML;return Nt&&ae["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&we(Ho,$.ownerDocument.doctype.name)&&(Ce="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Ce),mn&&gs([ge,fe,It],vt=>{Ce=xn(Ce,vt," ")}),k&&yi?k.createHTML(Ce):Ce},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};mo(S),ao=!0},t.clearConfig=function(){vn=null,ao=!1},t.isValidAttribute=function(S,f,$){vn||mo({});const I=se(S),K=se(f);return pc(I,K,$)},t.addHook=function(S,f){typeof f=="function"&&En(P[S],f)},t.removeHook=function(S,f){if(f!==void 0){const $=nd(P[S],f);return $===-1?void 0:sd(P[S],$,1)[0]}return Do(P[S])},t.removeHooks=function(S){P[S]=[]},t.removeAllHooks=function(){P=Uo()},t}var zo=Go();const Fi="chaotic_";function Pe(e){try{return localStorage.getItem(Fi+e)}catch{return null}}function Ne(e,t){try{localStorage.setItem(Fi+e,t)}catch{}}function at(e){try{localStorage.removeItem(Fi+e)}catch{}}function wd(){return Pe("token")}function kd(e){e?Ne("token",e):at("token")}function $d(){return Pe("theme")}function Ed(e){Ne("theme",e)}function Vo(){return Pe("last_project")}function xd(e){Ne("last_project",e)}function _d(){return Pe("onboarding_complete")==="true"}function Id(){Ne("onboarding_complete","true")}function Td(){at("onboarding_complete")}function Sd(e){return e?Pe(`issues_filters_${e}`):null}function Ld(e,t){e&&(t?Ne(`issues_filters_${e}`,t):at(`issues_filters_${e}`))}function Cd(e){return Pe(`comment_draft_${e}`)}function vs(e,t){t?Ne(`comment_draft_${e}`,t):at(`comment_draft_${e}`)}function Ad(e){return Pe(`description_draft_${e}`)}function bs(e,t){t?Ne(`description_draft_${e}`,t):at(`description_draft_${e}`)}function Bd(){return{title:Pe("create_issue_title"),description:Pe("create_issue_description")}}function Wo(e,t){e?Ne("create_issue_title",e):at("create_issue_title"),t?Ne("create_issue_description",t):at("create_issue_description")}function jd(){at("create_issue_title"),at("create_issue_description")}function Md(){return Pe("doc_view_mode")}function Dd(e){Ne("doc_view_mode",e)}function Rd(){return Pe("approvals_explainer_dismissed")==="1"}function Pd(){Ne("approvals_explainer_dismissed","1")}const Nd="/api";class qd{constructor(){this.token=wd()}setToken(t){this.token=t,kd(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Nd}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const d=new Error(c);throw d.status=o.status,d.detail=r.detail,d}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20,{projectId:i}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const h=new qd;let Ot=null;const Od='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Ht=null;function O(){Ht=document.activeElement,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function N(){var e;bt(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Ht&&document.contains(Ht)&&typeof Ht.focus=="function"&&Ht.focus(),Ht=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,s=n.querySelectorAll(Od);if(s.length===0)return;const i=s[0],a=s[s.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),i.focus();return}e.shiftKey&&document.activeElement===i?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),i.focus())});function Sn(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function E(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function Hd(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function x(e,t){const n=Hd(t);E(`Failed to ${e}: ${n}`,"error")}function bt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Ot&&(document.removeEventListener("keydown",Ot),Ot=null)}function Ln(e){Ot&&document.removeEventListener("keydown",Ot),Ot=e,e&&document.addEventListener("keydown",e)}function Cn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(bt(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}function $e(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ae(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ui(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function V(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,s]=e;return`#${t}${t}${n}${n}${s}${s}`}return e}function g(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function u(e){return g(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ke(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function ot(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function Fd(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Ft(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?Fd(s)?`<img class="${t} avatar-img" src="${u(s)}" alt="${u(n)}">`:`<div class="${t} avatar-emoji">${g(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let ee={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Gi=new Set;function ue(e,t){if(typeof e=="string"){const n=ee[e];ee[e]=t,Ko(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=ee[s];ee[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Ko(s,i,a)})}}function Ye(e){return Gi.add(e),()=>Gi.delete(e)}function Ko(e,t,n){t!==n&&Gi.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const An=()=>ee.currentUser,ys=e=>ue("currentUser",e),L=()=>ee.currentView,Ud=e=>ue("currentView",e),Be=()=>ee.issues,Ze=e=>ue("issues",e),ws=()=>ee.detailNavContext,Ut=e=>ue("detailNavContext",e),Yo=()=>ee.labels,ks=e=>ue("labels",e),Zo=()=>ee.activeFilterCategory,Gd=e=>ue("activeFilterCategory",e),Xo=()=>ee.selectedIssueIndex,Bn=e=>ue("selectedIssueIndex",e),zd=()=>ee.selectedDocIndex,Qo=e=>ue("selectedDocIndex",e),Jo=()=>ee.selectedBoardIndex,$s=e=>ue("selectedBoardIndex",e),Vd=()=>ee.pendingGates,Wd=e=>ue("pendingGates",e),Kd=()=>ee.searchDebounceTimer,Yd=e=>ue("searchDebounceTimer",e),Zd=()=>ee.websocket,er=e=>ue("websocket",e),C=()=>ee.currentTeam,zi=e=>ue("currentTeam",e),F=()=>ee.currentProject,qe=e=>ue("currentProject",e||null),ie=()=>ee.currentDetailIssue,Es=e=>ue("currentDetailIssue",e),Xd=()=>ee.currentDetailSprints,tr=e=>ue("currentDetailSprints",e),Vi={};function Q(e){Object.assign(Vi,e)}function Qd(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const s=t.dataset.action,i=Vi[s];if(!i){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${s}"`);return}i(e,t.dataset,t)}let nr=!1;function Jd(){if(!nr){nr=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Qd);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Vi[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Wi=["backlog","todo","in_progress","in_review","done","canceled"],Gt=["backlog","todo","in_progress","in_review"],sr=["urgent","high","medium","low","no_priority"],Ki=["no_priority","urgent","high","medium","low"],ir=["backlog","todo","in_progress","in_review","done"];function Z({icon:e,heading:t,description:n,cta:s}){const i=s?`
        <button class="btn btn-primary empty-state-cta" data-action="${u(s.action)}"${s.data?Object.entries(s.data).map(([a,o])=>` data-${u(a)}="${u(o)}"`).join(""):""}>${g(s.label)}</button>
    `:"";return`
        <div class="empty-state">
            <div class="empty-state-icon">${e}</div>
            <h3>${g(t)}</h3>
            <p>${g(n)}</p>
            ${i}
        </div>
    `}const Y={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'};let jn=[];function eu(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function tu(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function xs(e,t){const n=e().map(eu),s=t().map(tu);jn=[...n,...s]}function Mn(e){return e&&jn.find(t=>t.id===e)||null}function Lt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Yi(e,t=!1){const n=g(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${g(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function _s(){const e=jn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));jn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=jn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function Is(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;_s().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Yi(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function zt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Vt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Kt(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function ar(){const e=document.getElementById("group-by-select");return e?e.value:""}const or=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Ts=["done","canceled"];function rr(e){var t,n,s;switch(e){case"project":return F()?1:0;case"status":return zt().length;case"priority":return Vt().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(s=document.getElementById("sprint-filter"))!=null&&s.value?1:0;case"labels":return Wt().length;case"exclude_labels":return Kt().length;default:return 0}}function Zi(){let e=0;return or.forEach(t=>{e+=rr(t.key)}),e}function lr(){var v,b,w,_,T,R;const e=new URLSearchParams,t=zt(),n=Vt(),s=Wt(),i=Kt(),a=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,o=F()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,c=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,d=(_=document.getElementById("group-by-select"))==null?void 0:_.value,l=(T=document.getElementById("sort-by-select"))==null?void 0:T.value;t.forEach(A=>e.append("status",A)),n.forEach(A=>e.append("priority",A)),s.forEach(A=>e.append("label",A)),i.forEach(A=>e.append("exclude_label",A)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),c&&e.set("issue_type",c),d&&e.set("groupBy",d),l&&l!=="created-desc"&&e.set("sort",l);const p=e.toString(),m=p?`/issues?${p}`:"/issues";history.replaceState({view:"issues"},"",m),Ld((R=C())==null?void 0:R.id,p)}function nu(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=Sd((b=C())==null?void 0:b.id);if(w){t=new URLSearchParams(w);const _=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",_)}}const i=t.getAll("status");if(i.length>0){const w=document.getElementById("status-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=i.includes(T.value)}),cr())}const a=t.getAll("priority");if(a.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=a.includes(T.value)}),dr())}const o=t.get("assignee");if(o){const w=document.getElementById("assignee-filter");w&&(w.value=o)}const r=t.get("project");r&&(e(!0),qe(r),e(!1));const c=t.get("sprint");if(c){const w=document.getElementById("sprint-filter");w&&(w.value=c)}const d=t.get("issue_type");if(d){const w=document.getElementById("issue-type-filter");w&&(w.value=d)}const l=t.getAll("label");if(l.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=l.includes(T.value)}),Ss())}const p=t.getAll("exclude_label");if(p.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=p.includes(T.value)}),Ls())}const m=t.get("groupBy");if(m){const w=document.getElementById("group-by-select");w&&(w.value=m)}const v=t.get("sort");if(v){const w=document.getElementById("sort-by-select");w&&(w.value=v)}}function cr(){const e=zt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=$e(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function dr(){const e=Vt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ae(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Ss(){var s,i;const e=Wt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Ls(){var s,i;const e=Kt(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function ur(){if(!C())return;let e;try{e=await h.getLabels(C().id)}catch(t){console.error("Failed to load labels for filter:",t);return}pr("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),pr("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function pr(e,t,n,s){const i=document.getElementById(e);if(!i)return;const a=i.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const c=document.createElement("label");c.className="multi-select-option",c.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${V(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${g(r.name)}</span>
                </span>
            `,a.appendChild(c)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${s}">Clear</button>`,a.appendChild(o)}function Cs(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",mr)},0))}function mr(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",mr))}function su(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Yt)):(e.classList.remove("hidden"),e.classList.remove("show-options"),pe(),Ee(Zo()),setTimeout(()=>{document.addEventListener("click",Yt)},0))}function iu(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Yt)):(e.classList.remove("hidden"),gu(),setTimeout(()=>{document.addEventListener("click",Yt)},0))}function Yt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),s=e.composedPath(),i=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=i&&s.includes(i),r=a&&s.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Yt))}function Ct(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Yt)}function pe(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=F();e.innerHTML=or.map(n=>{const s=rr(n.key),i=Zo()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${i?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${u(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${s>0?`<span class="filter-menu-category-count">${s}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ee(e){Gd(e),pe();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":ou(t);break;case"status":ru(t);break;case"priority":lu(t);break;case"type":cu(t);break;case"assignee":du(t);break;case"sprint":uu(t);break;case"labels":pu(t);break;case"exclude_labels":mu(t);break}const n=t.querySelector(".filter-options-header");if(n){const s=document.createElement("button");s.type="button",s.className="filter-options-back",s.dataset.action="filter-menu-back",s.setAttribute("aria-label","Back to filter categories"),s.textContent="←",n.prepend(s)}}function au(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),pe()}function ou(e){const t=F()||"",n=X()||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${t?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${t?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;n.forEach(i=>{s+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${u(i.id)}">
                <input type="radio" name="project-filter-radio" value="${u(i.id)}" ${t===i.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${V(i.color)};"></span>
                <span class="filter-option-label">${g(i.name)}</span>
            </label>
        `}),e.innerHTML=s}function ru(e){const t=zt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=Gt.every(o=>t.includes(o))&&!Ts.some(o=>t.includes(o))&&t.length===Gt.length,i=Ts.every(o=>t.includes(o))&&!Gt.some(o=>t.includes(o))&&t.length===Ts.length;let a=`
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
        `}),e.innerHTML=a}function lu(e){const t=Vt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function cu(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${u(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function du(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Pt()||[];let i=`
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
                <span class="filter-option-label">${g(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function uu(e){if(!F()){e.innerHTML=`
            <div class="filter-options-header">
                <span class="filter-options-title">Sprint</span>
            </div>
            <div class="filter-options-empty">Select a project first</div>
        `;return}const n=document.getElementById("sprint-filter"),s=(n==null?void 0:n.value)||"",i=n?Array.from(n.options):[];let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${s?'<button class="filter-options-clear" data-action="set-sprint-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(o=>{a+=`
            <label class="filter-option" data-action="set-sprint-filter" data-value="${u(o.value)}">
                <input type="radio" name="sprint-filter-radio" value="${u(o.value)}" ${s===o.value?"checked":""}>
                <span class="filter-option-label">${g(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function pu(e){const t=Wt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",l=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${V(l)};"></span>
                    <span class="filter-option-label">${g(d)}</span>
                </label>
            `}),e.innerHTML=i}function mu(e){const t=Kt(),n=document.getElementById("exclude-label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",l=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${V(l)};"></span>
                    <span class="filter-option-label">${g(d)}</span>
                </label>
            `}),e.innerHTML=i}function gu(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(c=>`
                <div class="display-option ${s===c.value?"active":""}" data-action="set-sort" data-value="${u(c.value)}">
                    <span>${c.label}</span>
                    ${s===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(c=>`
                <div class="display-option ${i===c.value?"active":""}" data-action="set-group-by" data-value="${u(c.value)}">
                    <span>${c.label}</span>
                    ${i===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function xe(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=F();if(n){const m=(X()||[]).find(v=>v.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const s=zt();if(s.length>0){const p=s.map(m=>$e(m)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Vt();if(i.length>0){const p=i.map(m=>Ae(m)).join(", ");t.push({category:"priority",label:"Priority",value:p,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const p=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:p?p.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let p;if(o.value==="me")p="Me";else if(o.value==="unassigned")p="Unassigned";else{const v=(Pt()||[]).find(b=>b.user_id===o.value);p=(v==null?void 0:v.name)||(v==null?void 0:v.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:p,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const p=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(p==null?void 0:p.text)||r.value,clearAction:"clear-sprint-filter"})}const c=Wt();if(c.length>0){const p=document.getElementById("label-filter-dropdown"),m=c.map(v=>{var _;const b=p==null?void 0:p.querySelector(`input[value="${v}"]`),w=(_=b==null?void 0:b.closest("label"))==null?void 0:_.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const d=Kt();if(d.length>0){const p=document.getElementById("exclude-label-filter-dropdown"),m=d.map(v=>{var _;const b=p==null?void 0:p.querySelector(`input[value="${v}"]`),w=(_=b==null?void 0:b.closest("label"))==null?void 0:_.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(p=>`
        <span class="filter-chip" title="${u(p.label)}: ${u(p.value)}">
            <span class="filter-chip-label">${p.label}:</span>
            <span class="filter-chip-value">${g(p.value)}</span>
            <button class="filter-chip-remove" data-action="${p.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=l}function _e(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Zi();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function gr(){const e=document.getElementById("sprint-filter");if(!e)return;const t=F(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Xi(null);return}let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const i=await h.getSprints(t),a=i.find(o=>o.status==="active");a&&(s+=`<option value="current">Current Sprint (${g(a.name)})</option>`),tl(t,a==null?void 0:a.id),Xi(a||null),i.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";s+=`<option value="${o.id}">${g(o.name)}${r}</option>`})}catch(i){console.error("Failed to load sprints:",i)}e.innerHTML=s,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Xi(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${g(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${g(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function fr(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let hr=!1;Ye(e=>{if(e!=="currentProject"||L()!=="issues"||hr)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([gr(),ur()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1});const s=document.getElementById("exclude-label-filter-dropdown");s==null||s.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1}),Ss(),Ls(),je(),xe(),_e()}).catch(n=>{console.error("Failed to update filters on project switch:",n),je(),xe(),_e()})});function fu(){nu(e=>{hr=e})}function As(){cr(),je(),xe(),_e()}function Qi(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),As()}function Ji(){dr(),je(),xe(),_e()}function ea(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ji()}function ta(){Ss(),je(),xe(),_e()}function Bs(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ta()}function na(){Ls(),je(),xe(),_e()}function js(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),na()}function hu(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function vr(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(s=>{var i,a,o;return(o=(a=(i=n==null?void 0:n.querySelector(`input[value="${hu(s)}"]`))==null?void 0:i.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Ms=0;async function At(){var m,v,b,w,_,T,R;Bn(-1);const e=++Ms;if(!C())return;const t=F()||"",n=zt(),s=Vt(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(b=(v=document.getElementById("issue-search"))==null?void 0:v.value)==null?void 0:b.trim();if(!t&&X().length===0){document.getElementById("issues-list").innerHTML=Z({icon:Y.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}fr();const o={limit:1e3},r=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[c,d]=r.includes("-")?r.split("-"):[r,null];o.sort_by=c,d&&(o.order=d),n.length>0&&(o.status=n),s.length>0&&(o.priority=s),i&&(i==="me"?o.assignee_id=(_=An())==null?void 0:_.id:o.assignee_id=i);const l=(T=document.getElementById("sprint-filter"))==null?void 0:T.value;if(l)if(l==="current"){if(t){const A=xm(t);if(A!==void 0)A&&(o.sprint_id=A);else try{const B=(await h.getSprints(t)).find(j=>j.status==="active");tl(t,B==null?void 0:B.id),B&&(o.sprint_id=B.id)}catch(k){console.error("Failed to resolve current sprint:",k)}}}else o.sprint_id=l;const p=(R=document.getElementById("issue-type-filter"))==null?void 0:R.value;p&&(o.issue_type=p),a&&a.length>=1&&(o.search=a);try{const A=vr(Wt(),"label-filter-dropdown");A.length>0&&(o.label=A,o.label_match="any");const k=vr(Kt(),"exclude-label-filter-dropdown");k.length>0&&(o.exclude_label=k);let B;if(t?(o.project_id=t,B=await h.getIssues(o)):X().length>0&&(B=await h.getTeamIssues(C().id,o)),e!==Ms)return;Ze(B),L()==="issues"&&Ut(B);const j=[...new Set(B.map(U=>U.project_id))];if(await el(j),e!==Ms)return;rt()}catch(A){if(e!==Ms)return;x("load issues",A)}}function vu(){clearTimeout(Kd()),Yd(setTimeout(()=>{At()},300))}function je(){lr(),At()}async function br(){if(lr(),ar()==="sprint"){const e=Be(),t=[...new Set(e.map(n=>n.project_id))];await el(t)}rt()}function bu(){xe(),_e()}function yr(e){qe(e),pe(),Ee("project"),Ct()}function yu(){yr("")}function wu(e){const t=e==="open"?Gt:Ts,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),As(),pe(),Ee("status")}function ku(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,As()),pe(),Ee("status")}function $u(){Qi(),pe(),Ee("status"),xe(),_e()}function Eu(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Ji()),pe(),Ee("priority")}function xu(){ea(),pe(),Ee("priority"),xe(),_e()}function wr(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,je()),pe(),Ee("type"),xe(),_e(),Ct()}function _u(){wr("")}function kr(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,je()),pe(),Ee("assignee"),xe(),_e(),Ct()}function Iu(){kr("")}function $r(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,je()),pe(),Ee("sprint"),xe(),_e(),Ct()}function Tu(){$r("")}function Su(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,ta()),pe(),Ee("labels")}function Lu(){Bs(),pe(),Ee("labels"),xe(),_e()}function Cu(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,na()),pe(),Ee("exclude_labels")}function Au(){js(),pe(),Ee("exclude_labels"),xe(),_e()}function Bu(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,At()),Ct()}function ju(e){const t=document.getElementById("group-by-select");t&&(t.value=e,br()),Ct()}function Mu(){qe(null),Qi(),ea();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const s=document.getElementById("issue-search");s&&(s.value=""),Bs(),js(),je(),xe(),_e()}Q({"update-label-filter":()=>ta(),"clear-label-filter":()=>Bs(),"update-exclude-label-filter":()=>na(),"clear-exclude-label-filter":()=>js(),"show-filter-category":(e,t)=>{var n,s;Ee(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(s=document.querySelector("#filter-menu-options .filter-options-back"))==null||s.focus()},"filter-menu-back":()=>{au();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>yr(t.value),"clear-project-filter":()=>yu(),"clear-status-filter-new":()=>$u(),"set-status-preset":(e,t)=>wu(t.value),"toggle-status-option":(e,t)=>ku(t.filterValue,e),"clear-priority-filter-new":()=>xu(),"toggle-priority-option":(e,t)=>Eu(t.filterValue,e),"set-type-filter":(e,t)=>wr(t.value),"clear-type-filter":()=>_u(),"set-assignee-filter":(e,t)=>kr(t.value),"clear-assignee-filter":()=>Iu(),"set-sprint-filter":(e,t)=>$r(t.value),"clear-sprint-filter":()=>Tu(),"clear-label-filter-new":()=>Lu(),"toggle-label-option":(e,t)=>Su(t.filterValue,e),"clear-exclude-label-filter-new":()=>Au(),"toggle-exclude-label-option":(e,t)=>Cu(t.filterValue,e),"set-sort":(e,t)=>Bu(t.value),"set-group-by":(e,t)=>ju(t.value),"clear-all-filters":()=>Mu()});let Zt=[],sa=[];Ye(e=>{e==="currentProject"&&L()==="my-issues"&&(Ds(),aa(),Bt())});function yt(){return Zt}function Xt(e){Zt=e}let ia=0;async function Ds(){var a;const e=C(),t=An();if(!e||!t)return;const n=++ia,s=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,i=F();Ru();try{const o={assignee_id:t.id,status:s||void 0,limit:1e3};let r;if(i?r=await h.getIssues({...o,project_id:i}):r=await h.getTeamIssues(e.id,o),n!==ia)return;Zt=r,L()==="my-issues"&&Ut(Zt),Dn()}catch(o){if(n!==ia)return;x("load issues",o)}}async function Bt({showLoading:e=!0}={}){const t=C();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const s=F();sa=await h.getTeamActivities(t.id,0,10,{projectId:s}),Du()}catch{n&&(n.innerHTML=Z({icon:Y.activity,heading:"Failed to load activity",description:"Check your connection and try again"}))}}function Du(){const e=document.getElementById("dashboard-activity-list");if(e){if(!sa.length){e.innerHTML=Z({icon:Y.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=sa.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${u(t.issue_identifier)}"><strong>${g(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${u(t.document_id)}"><strong>${s} ${g(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${g(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${ua(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${ma(t)}${n}</span>
                <span class="activity-actor">by ${g(pa(t))}</span>
                <span class="activity-time">${Ke(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Ru(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Er(){Ds()}function Dn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),Zt.length===0){e.innerHTML=Z({icon:Y.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=Zt.map(t=>Oe(t)).join("")}}async function aa(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=F(),n=X(),s=t?n.filter(i=>i.id===t):n;if(!s.length){e.innerHTML="";return}try{const i=s.map(async o=>{try{const r=await h.getCurrentSprint(o.id);if(!r)return null;let c={};try{const d=await h.getIssues({sprint_id:r.id,project_id:o.id,limit:500});for(const l of d)c[l.status]=(c[l.status]||0)+1}catch{}return{project:o,sprint:r,statusCounts:c}}catch{return null}}),a=(await Promise.all(i)).filter(Boolean);Pu(a)}catch{e.innerHTML=""}}function Pu(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:s,sprint:i,statusCounts:a})=>{const o=i.budget||0,r=i.points_spent||0,c=o>0?Math.min(100,Math.round(r/o*100)):0,d=o>0&&r>o,l=i.limbo?"limbo":d?"arrears":"",p=a||{},m=Object.values(p).reduce((v,b)=>v+b,0);return`
                    <div class="sprint-status-card ${l}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${g(s.name)}</span>
                            ${i.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${d?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${g(i.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${l}" style="width: ${c}%"></div>
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
                                    ${n.filter(v=>p[v]).map(v=>{const b=Math.round(p[v]/m*100);return`<div class="sprint-stacked-segment status-${v}" style="width: ${b}%" title="${$e(v)}: ${p[v]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(v=>p[v]).map(v=>`<span class="sprint-count-label status-${v}">${p[v]} ${$e(v)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}Q({"filter-my-issues":()=>Er(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),$l(t.identifier)}});const xr=Wi,Nu=["task","bug","feature","chore","docs","tech_debt","epic"];let Xe=[],_r=Promise.resolve();function Ir(){return Xe}function Tr(e){Xe=e}async function oa(e,t,n,s){var p,m;e.preventDefault(),bt();const a=(s||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${xr.map((v,b)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="status" data-value="${v}">
                    ${Ie(v)}
                    <span>${$e(v)}</span>
                    <span class="dropdown-shortcut">${b+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Ki.map((v,b)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="priority" data-value="${v}">
                    ${Qe(v)}
                    <span>${Ae(v)}</span>
                    <span class="dropdown-shortcut">${b}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Nu.map(v=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="issue_type" data-value="${v}">
                    <span class="issue-type-badge type-${v}">${ot(v)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const v=_s();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${v.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:v.map(({assignee:b,indent:w},_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="${u(b.id)}">
                    ${Ft(b,"avatar-small")}
                    <span>${Yi(b,w)}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const v=document.querySelector(`.issue-row[data-issue-id="${n}"]`),b=(v==null?void 0:v.dataset.projectId)||((p=ie())==null?void 0:p.project_id),w=an(b);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${w.map((_,T)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="estimate" data-value="${_.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${_.label}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const v=Be(),b=yt(),w=ie(),_=v.find(te=>te.id===n)||b.find(te=>te.id===n)||w,T=new Set(((_==null?void 0:_.labels)||[]).map(te=>te.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const R=o.getBoundingClientRect();let A=a.bottom+4,k=a.left;k+R.width>window.innerWidth-8&&(k=a.right-R.width),A+R.height>window.innerHeight-8&&(A=a.top-R.height-4),o.style.top=`${A}px`,o.style.left=`${Math.max(8,k)}px`,Cn(o,{multiSelect:!0});let B=[];const j=C();if(j)try{B=await h.getLabels(j.id)}catch(te){console.error("Failed to load labels:",te)}if(!o.parentNode)return;Lr(o,n,B,T);const U=o.getBoundingClientRect();let le=a.bottom+4,Se=a.left;Se+U.width>window.innerWidth-8&&(Se=a.right-U.width),le+U.height>window.innerHeight-8&&(le=a.top-U.height-4),o.style.top=`${le}px`,o.style.left=`${Math.max(8,Se)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const v=Be(),b=yt(),w=ie(),_=v.find(P=>P.id===n)||b.find(P=>P.id===n)||w,T=(_==null?void 0:_.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const R=o.getBoundingClientRect();let A=a.bottom+4,k=a.left;k+R.width>window.innerWidth-8&&(k=a.right-R.width),A+R.height>window.innerHeight-8&&(A=a.top-R.height-4),o.style.top=`${A}px`,o.style.left=`${Math.max(8,k)}px`,Cn(o);let B=[];if(T)try{B=await h.getSprints(T),Em(T,B)}catch(P){console.error("Failed to load sprints:",P)}if(!o.parentNode)return;const j=B.filter(P=>P.status!=="completed"||P.id===(_==null?void 0:_.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${j.map((P,ge)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="${u(P.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${g(P.name)}${P.status==="active"?" (Active)":""}</span>
                    ${ge<9?`<span class="dropdown-shortcut">${ge+1}</span>`:""}
                </button>
            `).join("")}
        `;const U=o.getBoundingClientRect();let le=a.bottom+4,Se=a.left;Se+U.width>window.innerWidth-8&&(Se=a.right-U.width),le+U.height>window.innerHeight-8&&(le=a.top-U.height-4),o.style.top=`${le}px`,o.style.left=`${Math.max(8,Se)}px`,o.classList.remove("dropdown-positioning");const te=P=>{const ge=P.key;if(ge==="Escape"||ge==="Tab"){bt(),document.removeEventListener("keydown",te),Ln(null);return}const fe=parseInt(ge);if(isNaN(fe))return;const It=o.querySelectorAll(".dropdown-option");let y=!1;fe===0?(Qt(n,"sprint_id",null),y=!0):fe>=1&&fe<It.length&&(It[fe].click(),y=!0),y&&(document.removeEventListener("keydown",te),Ln(null))};Ln(te),document.addEventListener("keydown",te);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let c=a.bottom+4,d=a.left;d+r.width>window.innerWidth-8&&(d=a.right-r.width),c+r.height>window.innerHeight-8&&(c=a.top-r.height-4),o.style.top=`${c}px`,o.style.left=`${Math.max(8,d)}px`,o.classList.remove("dropdown-positioning");const l=v=>{const b=v.key;if(b==="Escape"||b==="Tab"){bt(),document.removeEventListener("keydown",l);return}const w=parseInt(b);if(isNaN(w))return;let _=!1;if(t==="status"&&w>=1&&w<=6)Qt(n,"status",xr[w-1]),_=!0;else if(t==="priority"&&w>=0&&w<=4)Qt(n,"priority",Ki[w]),_=!0;else if(t==="estimate"){const T=ie(),R=an(T==null?void 0:T.project_id);w>=0&&w<R.length&&(Qt(n,"estimate",R[w].value),_=!0)}_&&(document.removeEventListener("keydown",l),Ln(null))};Ln(l),document.addEventListener("keydown",l),Cn(o)}function qu(e,t,n,s){oa(e,t,n,s)}function Ou(e,t,n){_r=_r.then(()=>Sr(e,t,n))}async function Sr(e,t,n){const s=Be(),i=yt(),a=ie(),o=s.find(l=>l.id===e)||i.find(l=>l.id===e)||a;if(!o)return;const r=(o.labels||[]).map(l=>l.id),c=r.indexOf(t);let d;if(c>=0?d=r.filter(l=>l!==t):d=[...r,t],n){const l=c<0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}try{const p=(await h.updateIssue(e,{label_ids:d})).labels||[],m=s.findIndex(_=>_.id===e);m!==-1&&(s[m].labels=p,Ze([...s]));const v=i.findIndex(_=>_.id===e);v!==-1&&(i[v].labels=p,Xt([...i])),(a==null?void 0:a.id)===e&&Es({...a,labels:p});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const _=s.find(T=>T.id===e)||i.find(T=>T.id===e);_&&(b.outerHTML=Oe(_))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=p.length>0?p.map(_=>`
                    <span class="issue-label" style="background: ${V(_.color)}20; color: ${V(_.color)}">${g(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(l){if(x("update labels",l),n){const p=c>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function Lr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${u(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${u(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${u(t)}" data-label-id="${u(i.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${V(i.color)}20; color: ${V(i.color)}">${g(i.name)}</span>
                </button>
            `}).join("")}
    `}async function Cr(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=C();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await h.createLabel(s.id,{name:i}),o=await h.getLabels(s.id);ks(o),a!=null&&a.id&&await Sr(e,a.id,null);const r=Be(),c=yt(),d=ie(),l=r.find(m=>m.id===e)||c.find(m=>m.id===e)||d,p=new Set(((l==null?void 0:l.labels)||[]).map(m=>m.id));t&&Lr(t,e,o,p),n.value=""}catch(a){x("create label",a)}finally{n.disabled=!1,n.focus()}}}function Rs(){const e=document.getElementById("create-issue-labels-label");e&&(Xe.length===0?e.textContent="Labels":e.textContent=`Labels (${Xe.length})`)}function ra(e){const t=Yo();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Xe.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${u(n.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${V(n.color)}20; color: ${V(n.color)}">${g(n.name)}</span>
                </button>
            `}).join("")}
    `}function Hu(e){const t=Xe.indexOf(e);t>=0?Xe.splice(t,1):Xe.push(e),Rs();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&ra(n)}async function Ar(){const e=C();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await h.createLabel(e.id,{name:s}),a=await h.getLabels(e.id);ks(a),i!=null&&i.id&&!Xe.includes(i.id)&&Xe.push(i.id),Rs(),t&&ra(t),n.value=""}catch(i){x("create label",i)}finally{n.disabled=!1,n.focus()}}}async function Qt(e,t,n){bt();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const i={};i[t]=n;const a=await h.updateIssue(e,i);if(!a||!a.id)throw new Error("Invalid response from server");const o=Be(),r=o.findIndex(p=>p.id===e);r!==-1&&(o[r]=a,Ze([...o]));const c=yt(),d=c.findIndex(p=>p.id===e);d!==-1&&(c[d]=a,Xt([...c]));const l=ie();if((l==null?void 0:l.id)===e&&Es(a),s&&s.parentNode){const p=o.find(m=>m.id===e)||c.find(m=>m.id===e)||a;if(p){s.outerHTML=Oe(p);const m=document.querySelector(`.issue-row[data-issue-id="${e}"]`);m&&(m.classList.add("updated"),setTimeout(()=>m.classList.remove("updated"),500))}}if(E("Issue updated","success"),t==="status"){const p=F();if(p)try{const v=(await h.getSprints(p)).find(b=>b.status==="active");Xi(v||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&Fu(t,a)}}catch(i){x("update issue",i),s&&s.classList.remove("updating")}}function Fu(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Ie(t.status)}
            <span>${$e(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${Qe(t.priority)}
            <span>${Ae(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${ot(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?Mn(t.assignee_id):null,d=c?Lt(c):null;r.innerHTML=d?`${Ft(c,"avatar-small")}<span>${g(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=Xd(),d=t.sprint_id&&c?c.find(l=>l.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?g(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${si(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}Q({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,s=t.field;s==="estimate"?Qt(t.issueId,s,n==="null"?null:Number(n)):Qt(t.issueId,s,n)},"toggle-issue-label":(e,t,n)=>{Ou(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Cr(t.issueId)},"toggle-create-issue-label":(e,t)=>{Hu(t.labelId)},"create-label-for-create-issue":()=>{Ar()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Cr(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Ar())}});const Br=["task","bug","feature","chore","docs","tech_debt","epic"];function wt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Jt(e){const t=wt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function rt(){var i,a,o;const e=document.getElementById("issues-list");if(!e)return;const t=(i=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:i.dataset.issueId;e.classList.add("issue-list-linear");const n=Be();if(n.length===0){const r=(o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim(),c=Zi()>0,d=r&&r.length>=2;if(c||d){const l=Zi(),p=[];d&&p.push(`search "${r}"`),c&&p.push(`${l} active filter${l>1?"s":""}`),e.innerHTML=Z({icon:Y.issues,heading:"No matching issues",description:`No issues match your ${p.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=Z({icon:Y.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Bn(-1);return}const s=ar();s==="status"?Gu(e,n):s==="priority"?zu(e,n):s==="type"?Vu(e,n):s==="assignee"?Wu(e,n):s==="sprint"?Ku(e,n):e.innerHTML=Jt(n)+n.map(r=>Oe(r)).join(""),Uu(t)}function Uu(e){const t=Xo();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){Bn(-1);return}let s=e?Array.prototype.findIndex.call(n,i=>i.dataset.issueId===e):-1;s<0&&(s=Math.min(t,n.length-1)),Bn(s),n[s].classList.add("keyboard-selected")}function Gu(e,t){const n={};Wi.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Jt(t);Wi.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ie(i)}</span>
                    <span class="group-title">${$e(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${wt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Oe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function zu(e,t){const n={};sr.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Jt(t);sr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Qe(i)}</span>
                    <span class="group-title">${Ae(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${wt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Oe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Vu(e,t){const n={};Br.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Jt(t);Br.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${ot(i)}</span></span>
                    <span class="group-title">${ot(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${wt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Oe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Wu(e,t){const n={},s="__unassigned__";n[s]=[];const i=_s();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Jt(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${wt(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Oe(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=Lt(o)||"Unknown",d=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${u(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${u(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ft(o,"avatar-small")}</span>
                    <span class="group-title">${g(c)}${g(d)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${wt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(l=>Oe(l)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Ku(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=Qr();i.sort((c,d)=>{const l=o[c],p=o[d],m=l?a[l.status]??3:3,v=p?a[p.status]??3:3;return m-v});let r=Jt(t);i.forEach(c=>{const d=s[c];if(d.length===0)return;const l=o[c],p=l?l.name:c,m=l?l.status==="active"?" (Active)":l.status==="completed"?" (Done)":"":"",v=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${v}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${v}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${g(p)}${m}</span>
                    <span class="group-count">${d.length}</span>
                    <span class="group-points">${wt(d)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${d.map(b=>Oe(b)).join("")}
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
                    <span class="group-points">${wt(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(c=>Oe(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function Yu(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function jr(e,t){if(!e)return"";if(!t)return g(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return g(e);const s=e.slice(0,n),i=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${g(s)}<mark class="search-match">${g(i)}</mark>${g(a)}`}function Zu(e,t,n=40){if(!e||!t)return null;const s=e.toLowerCase().indexOf(t.toLowerCase());if(s===-1)return null;const i=Math.max(0,s-n),a=Math.min(e.length,s+t.length+n),o=e.slice(i,a),r=jr(o,t);return`${i>0?"…":""}${r}${a<e.length?"…":""}`}function Oe(e){var p,m,v;const t=e.assignee_id?Mn(e.assignee_id):null,n=t?Lt(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?si(e.estimate,e.project_id):"",a=Ta(e.estimate,e.project_id),o=e.sprint_id?Qr()[e.sprint_id]:null,r=o?o.name:null,c=(m=(p=document.getElementById("issue-search"))==null?void 0:p.value)==null?void 0:m.trim(),d=!!c&&((v=e.title)==null?void 0:v.toLowerCase().includes(c.toLowerCase())),l=c&&!d?Zu(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${u(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${u(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${u(e.id)}" title="Priority: ${Ae(e.priority)}">
                    ${Qe(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${u(e.id)}" title="Status: ${$e(e.status)}">
                    ${Ie(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${ot(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.id)}">${jr(e.title,c)}${l?` <span class="issue-search-snippet" title="Matched in description">— ${l}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(b=>`
                            <span class="issue-label" style="background: ${V(b.color)}20; color: ${V(b.color)}">${g(b.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${u(e.id)}" title="Sprint: ${r?g(r):"None"}">
                    ${r?`<span class="sprint-badge">${g(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${u(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${i||"None"}`}">
                    ${i?`<span class="estimate-badge${a?" out-of-scale":""}">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${u(e.id)}" title="${u(n||"Unassigned")}">
                    ${n?Ft(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Qe(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ie(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}Q({"toggle-group":(e,t)=>{Yu(t.group)},"show-inline-dropdown":(e,t,n)=>{oa(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),G(t.issueId))}});function Xu(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Qu(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";let n=-1;const s=()=>{t.classList.add("hidden"),t.innerHTML="",n=-1},i=r=>{var d,l;const c=t.querySelectorAll(".mention-suggestion");c.length!==0&&(n=(r%c.length+c.length)%c.length,c.forEach((p,m)=>p.classList.toggle("highlighted",m===n)),(l=(d=c[n]).scrollIntoView)==null||l.call(d,{block:"nearest"}))},a=r=>{const c=e.selectionStart||0,d=e.value.slice(0,c).replace(/@([a-zA-Z0-9._-]*)$/,`@${r} `),l=e.value.slice(c);e.value=d+l,e.focus(),s()},o=()=>{const r=e.selectionStart||0,d=e.value.slice(0,r).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!d){s();return}const l=d[2].toLowerCase(),p=Pt().map(m=>({id:m.id,name:m.name||m.email||"User",email:m.email||"",handle:Xu(m)})).filter(m=>!l||m.handle.includes(l)||m.name.toLowerCase().includes(l)||m.email.toLowerCase().includes(l)).slice(0,6);if(!p.length){s();return}t.innerHTML=p.map(m=>`
            <button type="button" class="mention-suggestion" data-handle="${u(m.handle)}">
                <span class="mention-name">${g(m.name)}</span>
                <span class="mention-handle">@${g(m.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach((m,v)=>{m.addEventListener("click",()=>a(m.dataset.handle)),m.addEventListener("mouseenter",()=>i(v))}),i(0)};e.addEventListener("input",o),e.addEventListener("click",o),e.addEventListener("keydown",r=>{const c=!t.classList.contains("hidden");if(r.key==="Escape"&&c){r.preventDefault(),r.stopPropagation(),s();return}if(c){if(r.key==="ArrowDown")r.preventDefault(),i(n+1);else if(r.key==="ArrowUp")r.preventDefault(),i(n-1);else if(r.key==="Enter"||r.key==="Tab"){const l=t.querySelectorAll(".mention-suggestion")[n];l&&(r.preventDefault(),a(l.dataset.handle))}}}),e.addEventListener("blur",()=>{setTimeout(s,150)})}const Mr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Rn(e=null){const t=e||F()||"";Tr([]);const n=X().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${g(o.name)}</option>
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
                            ${Mr.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${Ie("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Qe("no_priority")}
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
    `,O(),Rs();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=Bd();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{Wo(s.value,i.value)}),i.addEventListener("input",()=>{Wo(s.value,i.value)}),s.focus()}function Ju(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function ep(e){const t=Mr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function tp(e,t){const n=X().find(s=>s.id===t);Tr([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?g(n.name):"Project"}</span>
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
                            ${Ie("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Qe("no_priority")}
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
    `,O(),Rs(),document.getElementById("create-issue-title").focus()}async function np(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,d=c?parseInt(c):null;if(!n){E("Please enter a title","error");return}try{const l=await h.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:d,label_ids:Ir(),parent_id:e});N(),E(`Created sub-issue ${l.identifier}`,"success"),G(e)}catch(l){x("create sub-issue",l)}}async function sp(e,t,n){var o,r;bt();const i=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${i.top-8}px`,a.style.left=`${i.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const c=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${ir.map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="status" data-value="${d}" data-label="${u($e(d))}">
                    ${Ie(d)}
                    <span>${$e(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const c=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Ki.map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${d}" data-label="${u(Ae(d))}">
                    ${Qe(d)}
                    <span>${Ae(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const c=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="type" data-value="${d}" data-label="${u(ot(d))}">
                    <span class="issue-type-badge type-${d}">${ot(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!C())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let c=Yo();if(c.length===0)try{c=await h.getLabels(C().id),ks(c)}catch(d){console.error("Failed to load labels:",d)}ra(a),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Cn(a,{multiSelect:!0});return}else if(e==="assignee"){const c=document.getElementById("create-issue-assignee").value,d=_s();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${d.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:d.map(({assignee:l,indent:p})=>{const m=Lt(l)||"User";return`
                <button class="dropdown-option ${l.id===c?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${u(l.id)}" data-label="${u(m)}">
                    ${Ft(l,"avatar-small")}
                    <span>${Yi(l,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const c=document.getElementById("create-issue-estimate").value,d=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,l=an(d);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(p=>{const m=p.value===null?"":String(p.value);return`
                <button class="dropdown-option ${m===c?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${u(m)}" data-label="${u(p.value?p.label:"Estimate")}">
                    <span>${g(p.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const c=document.getElementById("create-issue-sprint").value,d=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!d)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const p=(await h.getSprints(d)).filter(m=>m.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${p.map(m=>`
                        <button class="dropdown-option ${m.id===c?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${u(m.id)}" data-label="${u(m.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${g(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Cn(a)}function ip(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function ap(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=g(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${Ie(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${Qe(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${ot(t)}</span><span id="create-issue-type-label">${s}</span>`)}bt()}async function Dr({keepOpen:e=!1}={}){var w,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,d=c?parseInt(c):null,l=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,p=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,m=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){E("Please select a project","error");return}if(!n){E("Please enter a title","error");return}const v=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");v&&(v.disabled=!0),b&&(b.disabled=!0);try{const T=await h.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:d,sprint_id:l,label_ids:Ir(),due_date:m});E(`Created ${T.identifier}`,"success"),jd(),L()==="issues"?At():L()==="my-issues"&&Ds(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(N(),G(T.id))}catch(T){x("create issue",T)}finally{v&&(v.disabled=!1),b&&(b.disabled=!1)}}async function op(){await Dr({keepOpen:!1})}async function rp(){await Dr({keepOpen:!0})}Q({"toggle-create-dropdown":(e,t,n)=>{sp(t.dropdownType,e,n)},"set-create-field":(e,t)=>{ap(t.field,t.value,t.label)},"create-issue-submit":()=>{op()},"create-issue-and-new":()=>{rp()},"update-create-project":()=>{ip()},"apply-template":e=>{ep(e.target.value)},"toggle-create-options":()=>{Ju()},"create-sub-issue-submit":(e,t)=>{np(t.parentId,t.projectId)}});async function Rr(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),i=an(t.project_id).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${g(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${u(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${u(t.title)}" required>
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
        `,O()}catch(t){x("load issue",t)}}async function lp(e,t){try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const d={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await h.updateIssue(t,d),N(),await G(t),E("Issue updated!","success")}catch(n){x("update issue",n)}}async function cp(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await At(),await Fe(),M("issues"),E("Issue deleted!","success")}catch(t){x("delete issue",t)}}Q({"update-issue":(e,t)=>{lp(e,t.issueId)}});let oe=null,Pr=!1,en=!1;function dp(){return oe||(oe=document.createElement("div"),oe.className="quote-tooltip",oe.setAttribute("role","button"),oe.setAttribute("tabindex","0"),oe.setAttribute("aria-label","Quote selection in comment"),oe.textContent="Quote",oe.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),ca())}),oe.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),oe.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ca()}),document.body.appendChild(oe),oe)}function Nr(e,t){const n=dp();n.style.display="flex",en=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!en)return;const s=n.getBoundingClientRect();s.left<4&&(n.style.left=`${4+s.width/2}px`),s.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-s.width/2}px`),s.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Pn(){oe&&(oe.style.display="none"),en=!1}function qr(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content"))||null}function la(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=qr(t.startContainer),s=qr(t.endContainer);return!n||!s||n!==s?null:e.toString().trim()||null}function up(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function ca(){const e=la();if(!e)return!1;const t=document.getElementById("new-comment");if(!t)return!1;const n=up(e),s=t.value,i=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";t.value=s+i+n+`

`;const a=ie();return a&&vs(a.id,t.value),t.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Pn(),t.focus(),t.setSelectionRange(t.value.length,t.value.length),t.scrollIntoView&&t.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function pp(){var s;if(!la())return!1;const t=window.getSelection().getRangeAt(0),n=((s=t.getBoundingClientRect)==null?void 0:s.call(t))??{left:0,width:0,top:0};return Nr(n.left+n.width/2,n.top),!0}function mp(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!la()){Pn();return}Nr(t,n)},10)}function gp({signal:e}={}){const t=document.getElementById("issue-detail-content");t&&(t.addEventListener("mouseup",mp,e?{signal:e}:void 0),Pr||(Pr=!0,document.addEventListener("mousedown",n=>{en&&oe&&!oe.contains(n.target)&&Pn()}),document.addEventListener("selectionchange",()=>{en&&setTimeout(()=>{const n=window.getSelection();(!n||n.isCollapsed)&&Pn()},50)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&en&&Pn()}),document.addEventListener("keyup",n=>{n.key!=="Escape"&&pp()})))}let da=!1,kt=!0,Nn=null,Ps=null,Ns=null,qs=null;function ua(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function pa(e){return e.user_name||e.user_email||"Unknown"}function ma(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?g(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${g($e(t(e.old_value)))}</strong> to <strong>${g($e(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${g(Ae(t(e.old_value)))}</strong> to <strong>${g(Ae(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${g(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${g(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=g(e.field_name||"ritual"),i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||g(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||g(e.field_name)}`:"Updated issue"}}function Or(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function fp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const d=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let l;for(;(l=d.exec(t))!==null;)if(c=!0,l.index>r&&o.appendChild(document.createTextNode(t.slice(r,l.index))),l[1]){const p=l[1],m=document.createElement("a");m.href=`#/issue/${p}`,m.className="issue-link",m.textContent=p,o.appendChild(m),r=l.index+l[0].length}else if(l[3]){l[2]&&o.appendChild(document.createTextNode(l[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+l[3],o.appendChild(p),r=l.index+l[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function hp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function vp(e){if(!e)return"";const t=De(e),n=document.createElement("div");return n.innerHTML=t,Or(n,fp),n.innerHTML}function Os(e){if(!e)return"";const t=De(e),n=document.createElement("div");return n.innerHTML=t,Or(n,hp),n.innerHTML}function bp(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function yp(){kt=!kt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",kt),n&&n.classList.toggle("rotated",kt)}async function Hs(e){try{Nn=await h.getTicketRitualsStatus(e),Hr(e)}catch(t){console.error("Failed to load ticket rituals:",t),Nn=null}}function Hr(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Nn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=Nn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(l=>l.approval_mode==="gate")&&(kt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",kt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",kt);const r=n.some(l=>l.trigger==="ticket_close"),c=n.some(l=>l.trigger==="ticket_claim");let d="⚠️ Complete these rituals:";r&&c?d="⚠️ Pending rituals (claim before starting, close before completing):":c?d="⚠️ Complete these rituals before claiming this ticket:":r&&(d="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${d}</p>
                ${n.map(l=>`
                    <div class="ticket-ritual-item pending${l.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${l.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${g(l.name)}</span>
                            <span class="badge badge-trigger-${l.trigger||"ticket_close"}">${l.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${l.approval_mode||"auto"}">${l.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${l.prompt?De(l.prompt):""}</div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${g(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ke(l.attestation.attested_at)}</span>
                                ${l.attestation.note?`<div class="attestation-note markdown-body">${De(l.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Am(l,e)}
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
                            <span class="ticket-ritual-name">${g(l.name)}</span>
                        </div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${g(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ke(l.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Fs(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await G(t.id,!1),!0):(M("my-issues",!1),!1)}catch{return M("my-issues",!1),!1}}function Fr(e){const t=ws(),n=t.findIndex(s=>s.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Ur({issueList:e,currentIndex:t,prevIssue:n,nextIssue:s,inList:i}){return i?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${u(n.id)}" data-identifier="${u(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${s?`data-action="navigate-issue" data-issue-id="${u(s.id)}" data-identifier="${u(s.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function wp(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=ie();if(!t)return;const n=Fr(t.id);Ps=n.prevIssue?n.prevIssue.id:null,Ns=n.nextIssue?n.nextIssue.id:null;const s=e.querySelector(".issue-detail-nav");if(!s)return;const i=s.querySelector(".issue-nav-arrows"),a=Ur(n);i?a?i.outerHTML=a:i.remove():a&&((o=s.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}Ye(e=>{e==="detailNavContext"&&wp()});async function G(e,t=!0){try{t&&Dt(),kt=!0;const[n,s,i,a,o,r]=await Promise.all([h.getIssue(e),h.getComments(e),h.getActivities(e),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),d=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name,is_pending:!y.attestation.approved_at}));Nn=r;const l=[...s,...d].sort((y,ze)=>new Date(y.created_at)-new Date(ze.created_at)),p=[n.parent_id?h.getIssue(n.parent_id):Promise.resolve(null),h.getSprints(n.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[m,v]=await Promise.all(p),b=o.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),w=o.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),_=o.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:L()},"",`/issue/${n.identifier}`),Es(n),tr(v),document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const T=document.getElementById("issue-detail-view");T.classList.remove("hidden");const R=L()||"my-issues",A=X().find(y=>y.id===n.project_id),k=n.assignee_id?Mn(n.assignee_id):null,B=k?Lt(k):null,j=n.sprint_id?v.find(y=>y.id===n.sprint_id):null,U=Fr(n.id),{prevIssue:le,nextIssue:Se}=U;T.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(R)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Ur(U)}
                        <span class="issue-detail-breadcrumb">${A?g(A.name):"Project"} › ${g(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${g(n.title)}</h1>

                    ${m?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(m.identifier)}" data-action="navigate-issue" data-issue-id="${u(m.id)}" data-identifier="${u(m.identifier)}">${m.identifier}: ${g(m.title)}</a>
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
                            ${n.description?Os(n.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${a.length===0?Z({icon:Y.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):a.map(y=>`
                                <a href="/issue/${encodeURIComponent(y.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${u(y.id)}" data-identifier="${u(y.identifier)}">
                                    <span class="sub-issue-status">${Ie(y.status)}</span>
                                    <span class="sub-issue-id">${y.identifier}</span>
                                    <span class="sub-issue-title">${g(y.title)}</span>
                                    ${y.estimate?`<span class="sub-issue-estimate">${y.estimate}pts</span>`:""}
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
                            ${b.length===0&&w.length===0&&_.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${w.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${w.map(y=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ie(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${g(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${b.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${b.map(y=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ie(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${g(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(y.id)}" title="Remove relation">
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
                                            <span class="relation-status">${Ie(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(y.related_issue_id)}" data-identifier="${u(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${g(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(y.id)}" title="Remove relation">
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
                            <h3>Comments${l.length>0?` <span class="section-count">(${l.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${l.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:l.map(y=>`
                                <div class="comment ${y.is_attestation?"comment-attestation":""} ${y.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${y.is_attestation?"avatar-attestation":""}">${y.is_attestation?y.is_pending?"⏳":"✓":(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${g(y.author_name||"User")}</span>
                                            ${y.is_attestation?`<span class="comment-ritual-badge">${y.is_pending?"Pending approval — ":""}Ritual: ${g(y.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ke(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${vp(y.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${i.length>0?` <span class="section-count">(${i.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${i.length===0?Z({icon:Y.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):i.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ua(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ma(y)}</span>
                                        <span class="activity-actor">by ${g(pa(y))}</span>
                                        <span class="activity-time">${Ke(y.created_at)}</span>
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

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${u(n.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${Ie(n.status)}
                                <span>${$e(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${u(n.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${Qe(n.priority)}
                                <span>${Ae(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${u(n.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${ot(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${u(n.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${B?`${Ft(k,"avatar-small")}<span>${g(B)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${u(n.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${j?g(j.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${u(n.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(y=>`
                                        <span class="issue-label" style="background: ${V(y.color)}20; color: ${V(y.color)}">${g(y.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${A?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${g(A.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${u(n.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${Ta(n.estimate,n.project_id)?" out-of-scale":""}" ${Ta(n.estimate,n.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${si(n.estimate,n.project_id)}</span>
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
                            <span class="property-value-static">${g(n.creator_name||"Unknown")}</span>
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
        `,qs&&qs.abort(),qs=new AbortController;const{signal:te}=qs,P=document.querySelector(".sidebar-overflow-trigger"),ge=document.querySelector(".overflow-menu-dropdown");if(P&&ge){const y=()=>{ge.classList.add("hidden"),P.setAttribute("aria-expanded","false")},ze=()=>{const Le=ge.classList.toggle("hidden");P.setAttribute("aria-expanded",String(!Le))};P.addEventListener("click",ze,{signal:te}),document.addEventListener("click",Le=>{!P.contains(Le.target)&&!ge.contains(Le.target)&&y()},{signal:te}),ge.addEventListener("keydown",Le=>{Le.key==="Escape"&&(y(),P.focus())},{signal:te})}Hr(n.id),Qu(),gp({signal:te});const fe=document.getElementById("new-comment");if(fe){const y=Cd(n.id);y&&(fe.value=y),fe.addEventListener("input",()=>{vs(n.id,fe.value)}),fe.addEventListener("keydown",ze=>{var Le;ze.key==="Enter"&&(ze.metaKey||ze.ctrlKey)&&(ze.preventDefault(),(Le=fe.closest("form"))==null||Le.requestSubmit())})}Ps=le?le.id:null,Ns=Se?Se.id:null;const It=y=>{if((y.metaKey||y.ctrlKey)&&y.shiftKey&&(y.key===">"||y.key==="."||y.code==="Period")&&ca()){y.preventDefault();return}if(y.metaKey||y.ctrlKey||y.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||y.target.tagName==="INPUT"||y.target.tagName==="TEXTAREA"||y.target.tagName==="SELECT"||y.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;if(y.key==="ArrowLeft"&&Ps)y.preventDefault(),G(Ps);else if(y.key==="ArrowRight"&&Ns)y.preventDefault(),G(Ns);else if(y.key==="c"){y.preventDefault(),y.stopImmediatePropagation();const gt=document.getElementById("new-comment");gt&&(gt.focus(),gt.scrollIntoView({behavior:"smooth",block:"nearest"}))}else y.key==="j"?(y.preventDefault(),y.stopImmediatePropagation(),Us(1)):y.key==="k"&&(y.preventDefault(),y.stopImmediatePropagation(),Us(-1));const Le={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[y.key];if(Le){const gt=document.querySelector(`.property-row[data-field="${Le}"]`);gt&&(y.preventDefault(),gt.click())}};document.addEventListener("keydown",It,{signal:te})}catch(n){x("load issue",n)}}async function kp(e,t){if(e.preventDefault(),da)return!1;const n=document.getElementById("new-comment").value;vs(t,null),da=!0;try{await h.createComment(t,n),await G(t),E("Comment added!","success")}catch(s){vs(t,n),x("add comment",s)}finally{da=!1}return!1}async function $p(e){const t=ie()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${g(t.description||"")}</textarea>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=Ad(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?bs(e,r):bs(e,null);const c=document.getElementById("edit-description-preview");c&&c.style.display!=="none"&&Gr()}),a.addEventListener("keydown",r=>{var c,d;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(c=document.getElementById("save-description-edit"))==null||c.click()),r.key==="Escape"&&(r.preventDefault(),(d=document.getElementById("cancel-description-edit"))==null||d.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{bs(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||(i.setAttribute("data-action","edit-description"),i.setAttribute("data-issue-id",t.id)),i.innerHTML=t.description?Os(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var c;const r=(c=document.getElementById("edit-description"))==null?void 0:c.value;if(r!==void 0)try{await h.updateIssue(e,{description:r}),bs(e,null),E("Description updated","success"),G(e,!1)}catch(d){x("update description",d)}})}function Gr(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Os(n):'<span class="text-muted">Nothing to preview.</span>'}function Ep(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?Gr():s.focus()}function xp(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,O(),document.getElementById("relation-issue-search").focus()}async function _p(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=C())==null?void 0:s.id,o=(await h.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${u(r.id)}" data-identifier="${u(r.identifier)}" data-title="${u(r.title)}">
                <span class="link-result-id">${g(r.identifier)}</span>
                <span class="link-result-title">${g(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Ip(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Tp(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Sp(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return E("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(s,t,"blocks"):await h.createRelation(t,s,n),N(),E("Relation added","success"),G(t)}catch(i){x("add relation",i)}return!1}async function Lp(e,t){try{await h.deleteRelation(e,t),E("Relation removed","success"),G(e)}catch(n){x("remove relation",n)}}function Us(e){const t=ie();if(!t)return;const n=ws();if(!n||n.length===0)return;const s=n.findIndex(a=>a.id===t.id);if(s===-1)return;const i=s+e;i<0||i>=n.length||G(n[i].id)}Q({"show-detail-dropdown":(e,t,n)=>{qu(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{$p(t.issueId)},"toggle-section":(e,t)=>{bp(t.section)},"toggle-ticket-rituals":()=>{yp()},"save-comment":(e,t)=>{kp(e,t.issueId)},"show-add-relation-modal":(e,t)=>{xp(t.issueId)},"remove-relation":(e,t)=>{Lp(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{tp(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Sp(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{_p(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Ip(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Tp()},"set-description-editor-mode":(e,t)=>{Ep(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Us(-1),"navigate-next-issue":()=>Us(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Rr(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),cp(t.issueId)}});function zr(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Gs=[],qn=[],Vr=null,W=new Set,tn="list",jt=!1,ga=null,zs=null;const fa=Md();(fa==="list"||fa==="grid")&&(tn=fa);function Wr(e){if(e!=="list"&&e!=="grid")return;tn=e,e==="grid"&&jt&&ha(),Dd(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),$t()}function Kr(){if(tn!=="list")return;jt=!0,W.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),$t(),nn()}function ha(){jt=!1,W.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),$t(),nn()}function Cp(){ga&&clearTimeout(ga),ga=setTimeout(()=>{$t()},300)}function Ap(){const e=document.getElementById("doc-search");e&&(e.value=""),$t()}async function Bp(){qe(null)}async function jp(){const e=document.getElementById("doc-search");e&&(e.value=""),qe(null)}function Mp(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=F()||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${g(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=X().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";s.push(`<span class="filter-chip">Project: ${g(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(s.length>0){let a=s.join(" ");s.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Dp(){return Gs}function $t(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";Mp(),qn=Gs.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),d=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!d)return!1}return!0}),qn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Op("",tn)}async function Rp(){var n;const e=Vr||((n=C())==null?void 0:n.id);if(!e)return;const t=F()||null;try{Gs=await h.getDocuments(e,t),$t()}catch(s){x("load documents",s)}}Ye(e=>{e==="currentProject"&&L()==="documents"&&Rp()});async function On(e,t=null){var s;if(e||(e=(s=C())==null?void 0:s.id),!e)return;Vr=e,Qo(-1);const n=document.getElementById("documents-list");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=F()||null);try{Gs=await h.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",tn==="list"),a.classList.toggle("active",tn==="grid")),$t()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),x("load documents",i)}}function Pp(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${V(t.color)}20; color: ${V(t.color)}">${g(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function Np(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Pp(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${u(e.id)}" data-action="view-document" data-document-id="${u(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${g(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${g(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?g(zr(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${g(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function qp(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${V(r.color)}20; color: ${V(r.color)}">${g(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?zr(e.content).substring(0,80):"No content",i=jt?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${u(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${W.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${jt&&W.has(e.id)?" selected":""}" data-action="${jt?"toggle-doc-selection":"view-document"}" data-document-id="${u(e.id)}" data-doc-id="${u(e.id)}">
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
  `}function Op(e="",t="list"){var d;const n=document.getElementById("documents-list");if(!n)return;W.clear(),nn();const s=qn;if(s.length===0){const l=(d=document.getElementById("doc-search"))==null?void 0:d.value,p=F(),m=l||p;n.innerHTML=Z({icon:m?Y.search:Y.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const i=t==="grid"?Np:qp,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=X();s.forEach(l=>{let p,m;if(e==="project")if(p=l.project_id||"__global__",p==="__global__")m="Global (Team-wide)";else{const v=r.find(b=>b.id===l.project_id);m=v?v.name:"Unknown Project"}else e==="sprint"&&(p=l.sprint_id||"__no_sprint__",m=l.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:m,docs:[]}),o[p].docs.push(l)});let c="";for(const[l,p]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${g(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${m}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function Hp(e){W.has(e)?W.delete(e):W.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=W.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",W.has(e)),nn()}function Fp(){qn.forEach(e=>W.add(e.id)),qn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),nn()}function Yr(){W.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),W.clear(),nn()}function nn(){const e=document.getElementById("doc-bulk-actions");e&&(jt?(e.classList.remove("hidden"),W.size>0?e.innerHTML=`
        <span class="bulk-count">${W.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Up(){if(W.size===0){E("No documents selected","error");return}const t=X().map(n=>`<option value="${n.id}">${g(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${W.size} Document${W.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${W.size} selected document${W.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,O()}async function Gp(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(W);let s=0,i=0;for(const r of n)try{await h.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}N(),Yr(),i===0?E(`Moved ${s} document${s>1?"s":""}!`,"success"):E(`Moved ${s}, failed ${i}`,"warning");const a=(o=C())==null?void 0:o.id;return await On(a),!1}async function zp(){var a;if(W.size===0){E("No documents selected","error");return}const e=W.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(W);let n=0,s=0;for(const o of t)try{await h.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}ha(),s===0?E(`Deleted ${n} document${n>1?"s":""}!`,"success"):E(`Deleted ${n}, failed ${s}`,"warning");const i=(a=C())==null?void 0:a.id;await On(i)}async function He(e,t=!0){try{t&&Dt();const n=await h.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");let i="";try{const k=await h.getDocumentComments(n.id);i=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${k.length===0?'<div class="comments-empty">No comments yet</div>':k.map(j=>{var U,le;return`
            <div class="comment" data-comment-id="${u(j.id)}">
              <div class="comment-avatar">${((le=(U=j.author_name)==null?void 0:U.charAt(0))==null?void 0:le.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${g(j.author_name||"Unknown")}</span>
                  <span class="comment-date">${Ke(j.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${De(j.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${u(n.id)}">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="1"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(k){console.error("Failed to load comments:",k)}let a=null,o=null;if(n.project_id){const B=X().find(j=>j.id===n.project_id);if(a=B?B.name:null,n.sprint_id)try{const j=await h.getSprint(n.sprint_id);o=j?j.name:null}catch{}}let r=n.content||"";const c=q.lexer(r);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(r=r.slice(c[0].raw.length).trimStart());const d=Dp(),l=d.findIndex(k=>k.id===n.id),p=l>0?d[l-1]:null,m=l>=0&&l<d.length-1?d[l+1]:null,v=l>=0,b=L()||"documents",w=n.labels&&n.labels.length>0?n.labels.map(k=>`
          <span class="issue-label" style="background: ${V(k.color)}20; color: ${V(k.color)}">
            ${g(k.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${u(n.id)}" data-label-id="${u(k.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let _='<span class="text-muted">None</span>';try{const k=await h.getDocumentIssues(n.id);k.length>0&&(_=k.map(B=>`
          <div class="linked-item">
            <span class="linked-item-id">${g(B.identifier)}</span>
            <span class="linked-item-title">${g(B.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${u(n.id)}" data-issue-id="${u(B.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch{}s.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${u(b)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${v?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${p?`data-action="view-document" data-document-id="${u(p.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${l+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${m?`data-action="view-document" data-document-id="${u(m.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?g(a)+" ›":""} ${g(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?g(n.icon)+" ":""}${g(n.title)}</h1>

          <div class="document-content markdown-body">${r?De(r):'<p class="text-muted">No content</p>'}</div>

          ${i}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?g(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${g(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${w}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${u(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${g(n.author_name||"Unknown")}</span>
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
            <button class="btn btn-secondary btn-small sidebar-link-btn" data-action="show-link-issue-modal" data-document-id="${u(n.id)}">+ Link Issue</button>
          </div>

          <div class="sidebar-section sidebar-actions">
            <div class="sidebar-overflow-menu">
              <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
              <div class="overflow-menu-dropdown hidden">
                <button class="overflow-menu-item" data-action="show-edit-document-modal" data-document-id="${u(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit document
                </button>
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${u(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `,zs&&zs.abort(),zs=new AbortController;const{signal:T}=zs,R=s.querySelector(".sidebar-overflow-trigger"),A=s.querySelector(".overflow-menu-dropdown");if(R&&A){const k=()=>{A.classList.add("hidden"),R.setAttribute("aria-expanded","false")},B=()=>{const j=A.classList.toggle("hidden");R.setAttribute("aria-expanded",String(!j))};R.addEventListener("click",B,{signal:T}),document.addEventListener("click",j=>{!R.contains(j.target)&&!A.contains(j.target)&&k()},{signal:T}),A.addEventListener("keydown",j=>{j.key==="Escape"&&(k(),R.focus())},{signal:T})}}catch(n){x("load document",n)}}async function Vs(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(s&&!n){const c=a.find(d=>d.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${g(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Zr(){Hn=null;const e=X(),t=ml()||"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${g(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,O(),t&&await Vs("doc-sprint",t,null,!0)}let Hn=null;async function Vp(e,t,n){Hn=n||null;const i=X().map(a=>`<option value="${u(a.id)}" ${a.id===t?"selected":""}>${g(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
    <form data-action="create-document">
      <div class="form-group">
        <label for="doc-title">Title</label>
        <input type="text" id="doc-title" required>
      </div>
      <div class="form-group">
        <label for="doc-project">Project</label>
        <select id="doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="doc-sprint">
          <option value="">Global (Team-wide)</option>
          ${i}
        </select>
      </div>
      <div class="form-group">
        <label for="doc-sprint">Sprint</label>
        <select id="doc-sprint" disabled>
          <option value="">Loading sprints...</option>
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
  `,O(),t&&await Vs("doc-sprint",t,e)}async function Wp(e){var a;e.preventDefault();const t=(a=C())==null?void 0:a.id;if(!t)return E("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{if(await h.createDocument(t,i),await On(t),N(),E("Document created!","success"),Hn){const o=Hn;Hn=null,o()}}catch(o){x("create document",o)}return!1}async function Xr(e){try{const t=await h.getDocument(e),s=X().map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${g(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
          <textarea id="edit-doc-content" style="min-height: 200px">${g(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${u(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,O(),t.project_id&&await Vs("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){x("load document",t)}}async function Kp(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await h.updateDocument(t,i),N(),await He(t),E("Document updated!","success")}catch(a){x("update document",a)}return!1}async function Yp(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=C())==null?void 0:t.id;await On(n),M("documents"),E("Document deleted!","success")}catch(n){x("delete document",n)}}function Zp(e,t){Vs(e,t)}async function Xp(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${u(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,O()}async function Qp(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=C())==null?void 0:s.id,a=await h.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${u(t)}" data-issue-id="${u(o.id)}">
        <span class="link-result-id">${g(o.identifier)}</span>
        <span class="link-result-title">${g(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Jp(e,t){try{await h.linkDocumentToIssue(e,t),N(),E("Issue linked!","success"),await He(e,!1)}catch(n){x("link issue",n)}}async function em(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),E("Issue unlinked!","success"),await He(e,!1)}catch(n){x("unlink issue",n)}}let va=!1;async function tm(e,t){if(e.preventDefault(),va)return!1;const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return E("Please enter a comment","error"),!1;va=!0;try{await h.createDocumentComment(t,s),n.value="",E("Comment added!","success"),await He(t,!1)}catch(i){x("add comment",i)}finally{va=!1}return!1}async function nm(e){var n;const t=(n=C())==null?void 0:n.id;if(!t){E("No team selected","error");return}try{const s=await h.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,O();return}const i=s.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${u(e)}" data-label-id="${u(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${V(a.color)}; color: white;">${g(a.name)}</span>
        ${a.description?`<span class="text-muted">${g(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,O()}catch(s){x("load labels",s)}}async function sm(e,t){try{await h.addLabelToDocument(e,t),N(),E("Label added!","success"),await He(e,!1)}catch(n){x("add label",n)}}async function im(e,t){try{await h.removeLabelFromDocument(e,t),E("Label removed!","success"),await He(e,!1)}catch(n){x("remove label",n)}}Q({"view-document":(e,t)=>{e.preventDefault(),He(t.documentId)},"toggle-doc-selection":(e,t)=>{Hp(t.docId)},"clear-doc-search":()=>{Ap()},"clear-doc-project-filter":()=>{Bp()},"clear-all-doc-filters":()=>{jp()},"show-bulk-move-modal":()=>{Up()},"bulk-delete-documents":()=>{zp()},"select-all-docs":()=>{Fp()},"clear-doc-selection":()=>{Yr()},"exit-selection-mode":()=>{ha()},"enter-selection-mode":()=>{Kr()},"handle-bulk-move":e=>{Gp(e)},"unlink-document-issue":(e,t)=>{em(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Xp(t.documentId)},"add-document-comment":(e,t)=>{tm(e,t.documentId)},"remove-label-from-doc":(e,t)=>{im(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{nm(t.documentId)},"show-edit-document-modal":(e,t)=>{Xr(t.documentId)},"delete-document":(e,t)=>{Yp(t.documentId)},"create-document":e=>{Wp(e)},"update-doc-sprint-dropdown":(e,t,n)=>{Zp(t.sprintSelect,n.value)},"update-document":(e,t)=>{Kp(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Qp(n.value,t.documentId)},"link-to-issue":(e,t)=>{Jp(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{sm(t.documentId,t.labelId)}});let sn=[],Ws={},Ks=new Set,lt=null,ba=null,Ys=[],Fn=[],ya=[];function Qr(){return Ws}function am(){return ba}function om(){return lt}Ye(e=>{e==="currentProject"&&L()==="sprints"&&Un()});async function Un(){const e=F();if(!e){const n=document.getElementById("sprints-list");n&&(n.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}$m();const t=document.getElementById("sprints-list");t&&(t.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await h.getCurrentSprint(e),sn=await h.getSprints(e),rm(),await Zs()}catch(n){t&&(t.innerHTML=Z({icon:Y.sprints,heading:"Failed to load sprints",description:"Check your connection and try again"})),x("load sprints",n)}}function rm(){const e=document.getElementById("sprints-list");if(!e)return;const t=sn.find(a=>a.status==="active"),n=sn.find(a=>a.status==="planned"),s=sn.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${u(t.id)}" data-sprint-url="/sprint/${u(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${g(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(t.id)}" data-sprint-name="${u(t.name)}" data-budget="${t.budget||""}" data-project-id="${u(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${u(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=lm(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${u(n.id)}" data-sprint-url="/sprint/${u(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${g(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(n.id)}" data-sprint-name="${u(n.name)}" data-budget="${n.budget||""}" data-project-id="${u(n.project_id)}">Edit Sprint</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${u(a.id)}" data-sprint-url="/sprint/${u(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${g(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||Z({icon:Y.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function lm(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),l=((U,le,Se)=>Math.min(Math.max(U,le),Se))((new Date-o)/(r-o),0,1),p=360,m=120,v=16,b=v,w=p-v,_=v,T=m-v,R=U=>s===0?T:_+(1-U/s)*(T-_),A=R(s),k=R(0),B=b+(w-b)*l,j=R(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${Qs(e.start_date)} → ${Qs(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${p} ${m}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${A}" x2="${w}" y2="${k}" class="burndown-ideal" />
                <line x1="${b}" y1="${A}" x2="${B}" y2="${j}" class="burndown-actual" />
                <circle cx="${B}" cy="${j}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}let wa=0;async function Gn(e,t=!0){var n;try{t&&Dt();const s=++wa,i=L(),a=await h.getSprint(e);if(s!==wa)return;if(!a){E("Sprint not found","error"),M("sprints");return}ba=a;const o=(n=C())==null?void 0:n.id,[r,c,d]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(()=>[]),o?h.getDocuments(o,a.project_id,null,e).catch(()=>[]):[]]);if(s!==wa)return;Ys=r,ya=c,Fn=d,L()===i&&Ut(Ys),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),dm()}catch(s){console.error("Failed to load sprint:",s),E("Failed to load sprint","error"),M("sprints")}}async function cm(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){E("Invalid sprint ID","error"),M("sprints",!1);return}try{await Gn(e,!1)}catch{M("sprints",!1)}}function dm(){const e=ba,t=Ys;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=L()||"sprints",i=t.filter(l=>Gt.includes(l.status)),a=t.filter(l=>l.status==="done"),o=t.reduce((l,p)=>l+(p.estimate||0),0),r=a.reduce((l,p)=>l+(p.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const d=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${u(s)}">
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
                    ${Qs(e.start_date)} → ${Qs(e.end_date)}
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
                ${i.length===0?Z({icon:Y.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${i.map(l=>Jr(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?Z({icon:Y.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(l=>Jr(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${pm()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Fn.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${u(e.id)}"
                        data-project-id="${u(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Fn.length>0?`
                    <div class="sprint-issues-list">
                        ${Fn.map(l=>um(l)).join("")}
                    </div>
                `:Z({icon:Y.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Jr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",s=ir.includes(e.status)?e.status:"backlog",i=n?`badge-priority-${n}`:"",a=`status-dot-${s}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${u(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${g(e.identifier)}</span>
            <span class="sprint-issue-title">${g(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${i}">${_m(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function um(e){const t=g(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${u(e.id)}" data-document-url="/document/${u(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${g(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ke(e.created_at)}</span>
            </span>
        </div>
    `}function pm(){const e=ya;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${mm(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function mm(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function gm(e,t,n,s){const i=s?Km(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${u(e)}" data-project-id="${u(s)}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${u(t)}" placeholder="Sprint name">
            </div>
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
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `,O()}async function fm(e,t,n){var r,c,d;e.preventDefault();const s=(c=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:c.trim(),i=document.getElementById("sprint-budget").value,a=i?parseInt(i):null,o=((d=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:d.value)||"this";try{const l={budget:a};if(s&&(l.name=s),await h.updateSprint(t,l),o==="planned"||o==="default"){const m=sn.filter(v=>v.status==="planned"&&v.id!==t);for(const v of m)await h.updateSprint(v.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await Un(),N(),E(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(l){x("update budget",l)}return!1}async function hm(e){const t=sn.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,O();const n=Gt;let s=0,i=!1,a=!1;try{const[c,d]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);s=c.filter(l=>n.includes(l.status)).length,i=d.some(l=>l.is_active&&l.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${g(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${u(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function vm(e){try{const t=await h.closeSprint(e);await Un(),nl(),t.limbo?ym(t):E("Sprint completed!","success")}catch(t){x("complete sprint",t)}}async function Zs(){const e=F();if(e)try{lt=await h.getLimboStatus(e),bm()}catch(t){console.error("Failed to load limbo status:",t)}}function bm(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!lt||!lt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${lt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function ym(e){const t=F();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,O(),wm(t)}async function wm(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${g(s.name)} <span class="ritual-mode">(${g(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${De(s.prompt)}</div>
                    ${$a(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function ka(){var t,n;if(!lt)return;const e=F();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${lt.pending_rituals.map(s=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${s.attestation?s.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${g(s.name)}</strong>
                            <span class="badge badge-ritual-${u(s.approval_mode)}">${g(s.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${De(s.prompt)}</div>
                        ${$a(s.attestation)}
                        ${km(s,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=lt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${lt.completed_rituals.map(s=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${g(s.name)}</div>
                            ${$a(s.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,O()}function $a(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${g(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${g(Ke(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${De(e.note)}</div>
        </div>
    `}function km(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function el(e){for(const t of e)if(!Ks.has(t))try{(await h.getSprints(t)).forEach(s=>{Ws[s.id]=s}),Ks.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function $m(){Ws={},Ks=new Set,Ys=[],ya=[],Fn=[],Xs={}}function Em(e,t){t.forEach(n=>{Ws[n.id]=n}),Ks.add(e)}let Xs={};function xm(e){return Xs[e]}function tl(e,t){Xs[e]=t??null}function nl(){Xs={}}Q({"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Gn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;gm(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{ka()},"show-close-sprint-confirmation":(e,t)=>{hm(t.sprintId)},"handle-update-budget":(e,t)=>{fm(e,t.sprintId,t.projectId)},"close-modal":()=>{N()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,N(),vm(t.sprintId)},"dismiss-limbo-modal":()=>{N(),Zs()},"approve-ritual":(e,t)=>{Lm(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{il(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}G(t.issueId)},"create-sprint-document":async(e,t)=>{await Vp(t.sprintId,t.projectId,()=>{Gn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}He(t.documentId)}});function Qs(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function _m(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}Ye(e=>{e==="currentProject"&&L()==="rituals"&&sl()});async function sl(){const e=F(),t=document.getElementById("rituals-content");if(!e){const n=document.getElementById("rituals-tabs");n&&n.classList.add("hidden"),t&&(t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>');return}tg(e),t&&(t.innerHTML='<div class="loading">Loading rituals...</div>');try{await Wn()}catch(n){t&&(t.innerHTML=`<div class="empty-state">Error loading rituals: ${g(n.message)}</div>`)}}async function Im(){pl(Tm),sl()}function Tm(){const e=document.getElementById("rituals-content"),t=ng(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,on("rv-sprint-rituals-list",n,"sprint"),on("rv-close-rituals-list",s,"close"),on("rv-claim-rituals-list",i,"claim")}function Sm(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Lm(e,t){try{await h.approveAttestation(e,t),E("Ritual approved!","success"),await Zs(),ka()}catch(n){x("approve ritual",n)}}async function il(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Cm(s,e,t)}),O()}async function Cm(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await h.completeGateRitual(t,n,s||null),E("Ritual completed!","success"),await Zs();const i=om();i&&!i.in_limbo?(N(),E("Limbo cleared! Next sprint is now active.","success")):ka()}catch(i){x("complete gate ritual",i)}return!1}function Am(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}" data-ritual-prompt="${u(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Attest</button>`}function Bm(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${g(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{jm(i,e,t)}),O()}async function jm(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return E("A note is required for this attestation.","error"),!1;try{await h.attestTicketRitual(t,n,s),E("Ritual attested!","success"),N(),await Hs(n)}catch(i){x("attest ticket ritual",i)}return!1}async function Mm(e,t){try{await h.attestTicketRitual(e,t),E("Ritual attested!","success"),await Hs(t)}catch(n){x("attest ticket ritual",n)}}async function Dm(e,t){try{await h.approveTicketRitual(e,t),E("Ritual approved!","success"),await Hs(t)}catch(n){x("approve ticket ritual",n)}}function Rm(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Pm(s,e,t)}),O()}async function Pm(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await h.completeTicketGateRitual(t,n,s||null),E("Ritual completed!","success"),N(),await Hs(n)}catch(i){x("complete ticket ritual",i)}return!1}Q({"show-create-ritual-modal":(e,t)=>{vl(t.trigger)},"approve-ticket-ritual":(e,t)=>{Dm(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{Rm(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{Bm(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{Mm(t.ritualId,t.issueId)}});function De(e){if(!e)return"";try{q.setOptions({breaks:!0,gfm:!0});const n=q.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return zo.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Ea(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Nm(e,t,n,s,i,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${g(i)}</span>
                    <span class="gate-approval-issue-title">${g(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${g(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${g(o)}</strong>${r?` ${Ea(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",d=>{qm(d,e,t,n)}),O(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function qm(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,i||null),E(`GATE ritual "${s}" approved!`,"success"),N(),Mt()}catch(a){x("complete gate ritual",a)}}function Om(e,t,n,s,i,a,o,r){Nm(e,t,n,s,i,a,o,r)}function Hm(e,t,n,s,i,a,o,r,c){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${g(i)}</span>
                    <span class="gate-approval-issue-title">${g(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${g(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${g(o)}</strong>${r?` ${Ea(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${De(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{Fm(l,e,t,n)}),O(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function Fm(e,t,n,s){var a,o;e.preventDefault();const i=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await h.approveTicketRitual(t,n),i)try{await h.createComment(n,i)}catch(r){console.error("Failed to post approval comment:",r)}E(`Review ritual "${s}" approved!`,"success"),N(),Mt()}catch(r){x("approve review ritual",r)}}function Um(e,t,n,s,i,a,o,r,c){Hm(e,t,n,s,i,a,o,r,c)}Ye(e=>{e==="currentProject"&&L()==="approvals"&&Mt()});let xa=[];async function Mt(){if(!C())return;const e=document.getElementById("approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=F(),n=t?X().filter(o=>o.id===t):X(),s=await Promise.all(n.map(async o=>{const[r,c]=await Promise.all([h.getPendingApprovals(o.id),h.getLimboStatus(o.id)]);return{project:o,approvals:r,limbo:c}})),i=[],a=[];for(const{project:o,approvals:r,limbo:c}of s)if(i.push(...r),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(l=>{var p;return(p=l.attestation)!=null&&p.approved_at?!1:l.approval_mode==="gate"||!!l.attestation});d.length>0&&a.push({project:o,rituals:d})}Wd(i),xa=a,al()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${g(t.message)}</p></div>`}}}function al(){const e=document.getElementById("approvals-list");if(!e)return;const t=Vd(),n=xa.length>0,s=!Rd();if(t.length===0&&!n){s?e.innerHTML=`
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
                    ${xa.map(({project:l,rituals:p})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${g(l.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${p.map(m=>{const v=m.attestation&&!m.attestation.approved_at,b=v?"⏳":"○",w=v?`<span class="gate-waiting-info">Attested by <strong>${g(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',_=v?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${u(m.id)}"
                                            data-project-id="${u(l.id)}">Approve</button>`:m.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${u(m.id)}"
                                                data-project-id="${u(l.id)}"
                                                data-ritual-name="${u(m.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${g(m.name)}
                                                    <span class="badge badge-ritual-${u(m.approval_mode)}">${g(m.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${g(m.prompt)}</span>
                                                ${w}
                                            </div>
                                            ${_}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=l=>l.pending_approvals||[],o=l=>p=>{const m=a(p).filter(l);return m.length>0?{...p,_filteredApprovals:m}:null},r=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="claim")).filter(Boolean),c=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="close")).filter(Boolean),d=t.map(o(l=>l.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(_a).join("")}
                </div>
            </div>
        `),c.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map(_a).join("")}
                </div>
            </div>
        `),d.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${d.map(_a).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset;Om(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{var v;l.disabled=!0;const p=(v=l.closest(".gate-ritual-actions"))==null?void 0:v.querySelector(".review-approve-btn");p&&(p.disabled=!0);const m=l.dataset;try{await h.approveTicketRitual(m.ritualId,m.issueId),E(`Review ritual "${m.ritualName}" approved!`,"success"),await Mt()}catch(b){l.disabled=!1,p&&(p.disabled=!1),x("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset;Um(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt,p.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0;try{await h.approveAttestation(l.dataset.ritualId,l.dataset.projectId),E("Sprint ritual approved!","success"),await Mt()}catch(p){l.disabled=!1,x("approve sprint ritual",p)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(l=>{l.addEventListener("click",()=>{il(l.dataset.ritualId,l.dataset.projectId,l.dataset.ritualName)})})}function Gm(){Pd(),al()}function _a(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${g(s.requested_by_name)}</strong>${s.requested_at?` (${Ea(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${De(s.attestation_note)}</div>`:"",c=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',d=i?`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${u(s.ritual_id)}"
                        data-issue-id="${u(e.issue_id)}"
                        data-ritual-name="${u(s.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${u(s.ritual_id)}"
                        data-issue-id="${u(e.issue_id)}"
                        data-ritual-name="${u(s.ritual_name)}"
                        data-ritual-prompt="${u(s.ritual_prompt)}"
                        data-issue-identifier="${u(e.identifier)}"
                        data-issue-title="${u(e.title)}"
                        data-requested-by="${u(s.requested_by_name||"")}"
                        data-requested-at="${u(s.requested_at||"")}"
                        data-attestation-note="${u(s.attestation_note||"")}">Comment &amp; Approve</button>
                </div>`:`<button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${u(s.ritual_id)}"
                    data-issue-id="${u(e.issue_id)}"
                    data-ritual-name="${u(s.ritual_name)}"
                    data-ritual-prompt="${u(s.ritual_prompt)}"
                    data-issue-identifier="${u(e.identifier)}"
                    data-issue-title="${u(e.title)}"
                    data-requested-by="${u(s.requested_by_name||"")}"
                    data-requested-at="${u(s.requested_at||"")}">Complete</button>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${g(s.ritual_name)} ${c}</span>
                    <span class="gate-ritual-prompt">${g(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                ${d}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.issue_id)}" class="gate-issue-link">
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
    `}Q({"view-issue-from-modal":(e,t)=>{e.preventDefault(),N(),G(t.issueId)},"dismiss-approvals-explainer":()=>{Gm()}});const Js={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},ei={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let ol=0;function rl(e){ol=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=ll(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function ll(e="",t="",n=""){const s=ol++,i=Object.keys(Js).map(d=>`<option value="${d}" ${d===e?"selected":""}>${d}</option>`).join(""),o=(e?Js[e]:Js.estimate).map(d=>`<option value="${d}" ${d===t?"selected":""}>${ei[d]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${s}">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" data-action="toggle-value-input" data-row-id="${s}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${u(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${s}">&times;</button>
        </div>
    `}function zm(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",ll()),ti()}function Vm(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),ti()}function Wm(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Js[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${ei[o]}</option>`).join(""),cl(e),ti()}function cl(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function zn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function ti(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function dl(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,d=o.querySelector(".condition-value");let l=(a=d==null?void 0:d.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw zn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw zn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${c}`;if(n.has(p))throw zn(`Duplicate condition: ${r} ${ei[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),c==="isnull")t[p]=!0;else if(c==="in"||c==="contains")t[p]=l?l.split(",").map(m=>m.trim()).filter(m=>m):[];else if(c==="gte"||c==="lte"){if(!l)throw zn(`Please enter a numeric value for ${r} ${ei[c]}.`),new Error(`Missing numeric value for ${p}`);const m=parseInt(l,10);if(isNaN(m))throw zn(`Invalid number "${l}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${l}`);t[p]=m}else t[p]=l}return ti(),Object.keys(t).length>0?t:null}Q({"add-condition-row":()=>{zm()},"remove-condition-row":(e,t)=>{Vm(Number(t.rowId))},"update-operator-options":(e,t)=>{Wm(Number(t.rowId))},"toggle-value-input":(e,t)=>{cl(Number(t.rowId))}});let re=[],Ia=null;const ul=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];Ye((e,t)=>{e==="currentProject"&&(t&&xd(t),ul.forEach(n=>{const s=document.getElementById(n);s&&(s.value=t||"")}),pg(t||""))});const ni={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function pl(e){Ia=e}function X(){return re}function an(e){const t=re.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return ni[n]||ni.fibonacci}function si(e,t){if(!e)return"No estimate";const s=an(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Ta(e,t){return e?!an(t).some(s=>s.value===e):!1}function Km(e){const t=re.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(ni[n]||ni.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function Fe(){if(C())try{re=await h.getProjects(C().id),Ym();const e=F();if(e&&re.some(s=>s.id===e))return;const t=Sa();if(t&&re.some(s=>s.id===t)){qe(t);return}const n=Vo();if(n&&re.some(s=>s.id===n)){qe(n);return}re.length>0&&qe(re[0].id)}catch(e){x("load projects",e)}}function Ym(){const e='<option value="">All Projects</option>'+re.map(a=>`<option value="${a.id}">${g(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+re.map(a=>`<option value="${a.id}">${g(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],s=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),s.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const i=F();ul.forEach(a=>{const o=document.getElementById(a);o&&(o.value=i||"")})}function ml(){return Vo()}function Vn(){const e=document.getElementById("projects-list");if(re.length===0){e.innerHTML=Z({icon:Y.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=re.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${u(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${V(t.color)}20; color: ${V(t.color)}">
                    ${g(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${g(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${u(t.id)}" title="Project settings">
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
    `).join("")}function Zm(e){qe(e),M("issues")}function gl(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,O()}async function Xm(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(C().id,t),await Fe(),Vn(),N(),E("Project created!","success")}catch(n){x("create project",n)}return!1}async function Qm(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await Fe(),Vn(),N(),E("Project updated!","success")}catch(s){x("update project",s)}return!1}async function Jm(e){const t=re.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await Fe(),Vn(),N(),E("Project deleted","success")}catch(n){x("delete project",n)}}let Te=null;async function fl(e){Te=e,re.length===0&&await Fe();const t=re.find(n=>n.id===e);if(!t){E("Project not found","error"),M("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),hl("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function hl(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!ct||ct.length===0)&&Wn()}function eg(){Te=null,ct=[]}function tg(e){Te=e}function ng(){return ct}async function sg(){if(!Te)return;const e=document.getElementById("ps-name").value.trim();if(!e){E("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Te,t),await Fe(),E("Settings saved","success");const n=re.find(s=>s.id===Te);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){x("save project settings",n)}}async function ig(){if(!Te)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await h.updateProject(Te,n),await Fe(),E("Settings saved","success")}catch(s){x("save settings",s)}}let ct=[];async function Wn(){if(Te)try{ct=await h.getRituals(Te),ag(),typeof Ia=="function"&&Ia()}catch(e){x("load rituals",e)}}function ag(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=ct.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=ct.filter(s=>s.trigger==="ticket_close"),n=ct.filter(s=>s.trigger==="ticket_claim");on("ps-sprint-rituals-list",e,"sprint"),on("ps-close-rituals-list",t,"close"),on("ps-claim-rituals-list",n,"claim")}function on(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>u(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${g(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${g(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${De(a.prompt)}</div>
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
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${u(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${u(a.id)}" data-ritual-name="${u(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function vl(e){if(!Te)return;let t=[];try{t=await h.getRitualGroups(Te)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${u(n.id)}" data-mode="${u(n.selection_mode)}">${g(n.name)} (${g(n.selection_mode)})</option>`).join("")}
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
        ${rl(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,O()}function og(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function rg(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function bl(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw E("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Te,{name:t,selection_mode:n})).id}return e.value||null}async function lg(e){e.preventDefault();let t;try{t=dl()}catch{return!1}let n;try{n=await bl()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await h.createRitual(Te,s),await Wn(),N(),E("Ritual created!","success")}catch(i){x("create ritual",i)}return!1}async function cg(e){const t=ct.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Te)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${u(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${u(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${g(t.prompt)}</textarea>
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
          ${n.map(o=>`<option value="${u(o.id)}" data-mode="${u(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${g(o.name)} (${g(o.selection_mode)})</option>`).join("")}
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
        ${rl(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,O()}async function dg(e,t){e.preventDefault();let n;try{n=dl()}catch{return!1}let s;try{s=await bl()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.updateRitual(t,i),await Wn(),N(),E("Ritual updated!","success")}catch(a){x("update ritual",a)}return!1}async function ug(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Wn(),E("Ritual deleted","success")}catch(n){x("delete ritual",n)}}Q({"view-project":(e,t)=>{Zm(t.projectId)},"view-project-settings":(e,t)=>{fl(t.projectId)},"create-project":e=>{Xm(e)},"update-project":(e,t)=>{Qm(e,t.projectId)},"confirm-delete-project":(e,t)=>{Jm(t.projectId)},"edit-project-ritual":(e,t)=>{cg(t.ritualId)},"delete-project-ritual":(e,t)=>{ug(t.ritualId,t.ritualName)},"create-project-ritual":e=>{lg(e)},"update-project-ritual":(e,t)=>{dg(e,t.ritualId)},"toggle-ritual-conditions":()=>{og()},"ritual-group-change":()=>{rg()}});function Sa(){const t=new URLSearchParams(window.location.search).get("project");return t||ml()}function pg(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}const La={},yl=new Map;let Ca=null,Aa=null,Ba=null,ja=null,Ma=null,Da=null,wl=!1;function mg(e){Object.assign(La,e)}function gg({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(Ca=e),t&&(Aa=t),n&&(Ba=n),s&&(ja=s),i&&(Ma=i),a&&(Da=a)}function fg(){return Object.keys(La)}const hg=["issues","board","sprints","epics","documents","rituals","approvals","my-issues"];function M(e,t=!0){if(t&&Dt(),Ud(e),t){let i;const a=Sa();e==="my-issues"?i=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:hg.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),Ca&&Ca();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=La[e];s&&s(),t&&window.scrollTo(0,0)}function kl(){var s;const t=window.location.pathname.split("/").filter(Boolean);ja&&ja();let n="my-issues";if(t.length===0||t[0]==="")M("my-issues",!1);else{if(Aa&&Aa(t))return;{n=t[0];const i={"gate-approvals":"approvals"};i[n]&&(n=i[n]),fg().includes(n)?M(n,!1):(n="my-issues",M("my-issues",!1))}}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function Dt(){yl.set(window.location.href,window.scrollY)}function $l(e){Dt(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Ma&&Ma(e)}function vg(e){Dt(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Da&&Da(e)}function El(){const e=yl.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function bg(){wl||(wl=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Ba&&Ba(e.state)){El();return}(t=e.state)!=null&&t.view?M(e.state.view,!1):kl(),El()}))}let Kn=[];function ii(){return Kn}function yg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function wg(e){const t=e==null?void 0:e.avatar_url,n=u((e==null?void 0:e.name)||"Agent");return t?yg(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${u(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${g(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function kg(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{Kn=await h.getTeamAgents(e),xs(Pt,ii),Is()}catch(n){console.error("Failed to load team agents:",n)}}async function Ra(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{Kn=await h.getTeamAgents(e),xs(Pt,ii),Is(),$g()}catch(n){x("load agents",n)}}function $g(){const e=document.getElementById("agents-list");if(e){if(Kn.length===0){e.innerHTML=Z({icon:Y.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=Kn.map(t=>{const n=g(t.name),s=g(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${wg(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Ui(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${u(t.id)}" data-agent-name="${u(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function Eg(){const e=X();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${g(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),O()}async function xg(e){var o,r,c;e.preventDefault();const t=(o=C())==null?void 0:o.id;if(!t)return E("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let d;i&&a?d=await h.createProjectAgent(a,n,s):d=await h.createTeamAgent(t,n,s),N();const l=g(d.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,O()}catch(d){x("create agent",d)}return!1}function _g(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{E("Agent API key copied to clipboard","success")}).catch(()=>{E("Failed to copy","error")})}async function Ig(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),E("Agent deleted","success"),Ra()}catch(n){x("delete agent",n)}}Q({"create-agent":e=>{xg(e)},"copy-agent-key":()=>{_g()},"dismiss-agent-modal":()=>{N(),Ra()},"delete-agent":(e,t)=>{Ig(t.agentId,t.agentName)}});let Yn=0,Zn=null;const Rt=new Map;function dt(e,t){return Rt.has(e)||Rt.set(e,new Set),Rt.get(e).add(t),()=>{var n;return(n=Rt.get(e))==null?void 0:n.delete(t)}}function Tg(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function xl(e){Zn&&(clearTimeout(Zn),Zn=null);const t=Zd();t&&(t.close(),er(null));const n=h.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);er(a),a.onopen=()=>{console.log("WebSocket connected"),Yn>0&&E("Live updates reconnected","success"),Yn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(c){console.error("WebSocket: malformed message",c);return}Sg(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Yn++,Yn===1&&E("Live updates disconnected. Reconnecting...","warning");const o=Tg(Yn-1);Zn=setTimeout(()=>{Zn=null,C()&&C().id===e&&xl(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Sg(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Rt.get(`${n}:${t}`);if(a)for(const c of a)try{c(s,i)}catch(d){console.error(`WebSocket handler error (${n}:${t}):`,d)}const o=Rt.get(n);if(o)for(const c of o)try{c(s,i)}catch(d){console.error(`WebSocket handler error (${n}):`,d)}const r=Rt.get("*");if(r)for(const c of r)try{c(s,i)}catch(d){console.error("WebSocket handler error (*):",d)}}let ai=[],oi=[],Pa=[],Na=[];function Lg(){return ai}function Pt(){return oi}async function qa(){try{ai=await h.getMyTeams(),Cg()}catch(e){x("load teams",e)}}function Cg(){const e=document.getElementById("team-list");ai.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=ai.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${u(JSON.stringify(t))}">${g(t.name)}</button>
        `).join("")}async function Oa(e,t=!1){zi(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),xl(e.id),await Promise.all([Fe(),Ug(),Bg(),kg()]),t?kl():M(L())}function _l(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Ag(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Bg(){if(C())try{oi=await h.getTeamMembers(C().id),xs(Pt,ii),Is()}catch(e){console.error("Failed to load team members:",e)}}async function Il(){if(C())try{oi=await h.getTeamMembers(C().id),xs(Pt,ii),Is(),jg()}catch(e){x("load team members",e)}}function jg(){const e=document.getElementById("team-members-list");e.innerHTML=oi.map(t=>`
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
                ${t.user_id!==An().id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${u(t.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function Ha(){if(C())try{Pa=await h.getTeamInvitations(C().id),Mg()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Mg(){const e=document.getElementById("team-invitations-list");if(Pa.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=Pa.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${g(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${g(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${u(t.id)}">Cancel</button>
        </div>
    `).join("")}async function Dg(){if(C())try{Na=await h.getTeamAgents(C().id),Rg()}catch(e){x("load team agents",e)}}function Rg(){const e=document.getElementById("team-agents-list");if(e){if(Na.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=Na.map(t=>{const n=g(t.name),s=g(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Tl(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,O()}async function Pg(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await h.createInvitation(C().id,t,n),await Ha(),N(),E("Invitation sent!","success")}catch(s){x("send invitation",s)}return!1}async function Ng(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(C().id,e),await Il(),E("Member removed!","success")}catch(t){x("remove member",t)}}async function qg(e){try{await h.deleteInvitation(C().id,e),await Ha(),E("Invitation canceled!","success")}catch(t){x("cancel invitation",t)}}function Sl(){_l(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,O()}function Og(){C()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${u(C().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${u(C().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${g(C().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,O())}async function Hg(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await qa(),await Oa(n),N(),E("Team created!","success")}catch(n){x("create team",n)}return!1}async function Fg(e){if(e.preventDefault(),!C())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(C().id,t);zi(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await qa(),N(),E("Team updated!","success")}catch(n){x("update team",n)}return!1}async function Ug(){if(C())try{const e=await h.getLabels(C().id);ks(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Q({"select-team":(e,t)=>{Oa(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Ng(t.userId)},"delete-invitation":(e,t)=>{qg(t.invitationId)},"invite-member":e=>{Pg(e)},"create-team":e=>{Hg(e)},"update-team":e=>{Fg(e)}});let Je=null,ut=0,rn=null,ln=null,Xn=null,Fa=!1;function Gg(){return _d()}function Ll(){Id()}function Cl(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function zg(){Je||(Je=document.createElement("div"),Je.id="onboarding-overlay",Je.className="onboarding-overlay",document.getElementById("app").appendChild(Je))}function Qn(){if(!Je)return;const e=Fa?Bl():Al(),t=e[ut],n=e.map((s,i)=>`<span class="onboarding-dot${i===ut?" active":""}${i<ut?" completed":""}"></span>`).join("");Je.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Al(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Cl(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Cl(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&rn&&(e.textContent=`${rn.name} (${rn.key})`),t&&ln&&(t.textContent=`${ln.name} (${ln.key})`),n&&Xn&&(n.textContent=`${Xn.identifier} - ${Xn.title}`)}}]}function Bl(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Ua(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Ga(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function cn(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Vg(){const e=Fa?Bl():Al();ut<e.length-1&&(ut++,Qn())}function Wg(){Ll(),Ml(),Jn()}function Kg(){Ll(),Ml(),Jn()}async function Yg(e){e.preventDefault(),Ga("onboarding-team-error"),cn("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{rn=await h.createTeam({name:t,key:n}),ut++,Qn()}catch(s){Ua("onboarding-team-error",s.message||"Failed to create team"),cn("onboarding-team-submit",!1)}}async function Zg(e){e.preventDefault(),Ga("onboarding-project-error"),cn("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{ln=await h.createProject(rn.id,{name:t,key:n}),ut++,Qn()}catch(s){Ua("onboarding-project-error",s.message||"Failed to create project"),cn("onboarding-project-submit",!1)}}async function Xg(e){e.preventDefault(),Ga("onboarding-issue-error"),cn("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Xn=await h.createIssue(ln.id,{title:t}),ut++,Qn()}catch(n){Ua("onboarding-issue-error",n.message||"Failed to create issue"),cn("onboarding-issue-submit",!1)}}function jl(e=!1){Fa=e,ut=0,rn=null,ln=null,Xn=null,zg(),Qn()}function Ml(){Je&&(Je.remove(),Je=null)}function Dl(){Td(),jl(!0)}Q({"onboarding-next":e=>{e.preventDefault(),Vg()},"onboarding-skip":e=>{e.preventDefault(),Wg()},"onboarding-finish":e=>{e.preventDefault(),Kg()},"onboarding-create-team":e=>{Yg(e)},"onboarding-create-project":e=>{Zg(e)},"onboarding-create-issue":e=>{Xg(e)}});async function Jn(){Qg(),af(),await qa();const e=Lg();if(e.length===0&&!Gg()){jl();return}e.length>0&&await Oa(e[0],!0)}let dn=null,es=null,Ue=null,Ge=null;function ts(){dn||(dn=document.getElementById("auth-screen"),es=document.getElementById("main-screen"),Ue=document.getElementById("login-form"),Ge=document.getElementById("signup-form"))}function za(){ts(),dn&&dn.classList.remove("hidden"),es&&es.classList.add("hidden")}function Qg(){ts(),dn&&dn.classList.add("hidden"),es&&es.classList.remove("hidden")}function Jg(){ts(),Ue&&Ue.classList.remove("hidden"),Ge&&Ge.classList.add("hidden")}function ef(){ts(),Ue&&Ue.classList.add("hidden"),Ge&&Ge.classList.remove("hidden")}async function tf(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),ys(await h.getMe()),await Jn(),E("Welcome back!","success")}catch(s){x("log in",s)}return!1}async function nf(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await h.signup(t,n,s),await h.login(n,s),ys(await h.getMe()),await Jn(),E("Account created successfully!","success")}catch(i){x("sign up",i)}return!1}function Rl(){h.logout(),ys(null),zi(null),za(),E("Signed out","success")}function sf(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function af(){const e=An();if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?sf(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${u(s)}" alt="${u(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function of(){ts();const e=Ue==null?void 0:Ue.querySelector("form");e&&e.addEventListener("submit",i=>tf(i));const t=Ge==null?void 0:Ge.querySelector("form");t&&t.addEventListener("submit",i=>nf(i));const n=Ue==null?void 0:Ue.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),ef()});const s=Ge==null?void 0:Ge.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),Jg()})}let Va=[];async function Wa(){try{Va=await h.getApiKeys(),rf()}catch(e){x("load API keys",e)}}function rf(){const e=document.getElementById("api-keys-list");if(e){if(Va.length===0){e.innerHTML=Z({icon:Y.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Va.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${g(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${g(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Ui(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ui(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${u(t.id)}" data-key-name="${u(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function lf(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,O()}async function cf(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);N(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,O()}catch(n){x("create API key",n)}return!1}async function df(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),E("API key copied to clipboard","success")}catch{E("Failed to copy","error")}}async function uf(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),E("API key revoked","success"),await Wa()}catch(n){x("revoke API key",n)}}Q({"create-api-key":e=>{cf(e)},"copy-api-key":()=>{df()},"dismiss-api-key-modal":()=>{N(),Wa()},"revoke-api-key":(e,t)=>{uf(t.keyId,t.keyName)}});let ri=!1,pt=0,Et=[],li=[];function pf(e){li=e,Et=[...e]}function ci(){return ri}function mf(){if(ri)return;ri=!0,pt=0,Et=[...li];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&di()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>gf(n.target.value)),t.addEventListener("keydown",hf),e.addEventListener("mouseover",n=>{const s=n.target.closest('[data-action="execute-command"]');s&&ff(Number(s.dataset.commandIndex))}),ns(),requestAnimationFrame(()=>t.focus())}function di(){ri=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function gf(e){const t=e.toLowerCase().trim();t?Et=li.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Et=[...li],pt=0,ns()}function ns(){const e=document.getElementById("command-results");if(!e)return;if(Et.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Et.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===pt?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function ff(e){pt=e,ns()}function Pl(e){const t=Et[e];t&&(di(),t.action())}function hf(e){switch(e.key){case"ArrowDown":e.preventDefault(),pt=Math.min(pt+1,Et.length-1),ns();break;case"ArrowUp":e.preventDefault(),pt=Math.max(pt-1,0),ns();break;case"Enter":e.preventDefault(),Pl(pt);break;case"Escape":e.preventDefault(),di();break}}Q({"execute-command":(e,t)=>{Pl(Number(t.commandIndex))}});const vf=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function bf(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${g(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${g(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function yf(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${g(e.title)}</h4>
        ${e.shortcuts.map(bf).join("")}
    </div>`}function Nl(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${vf.map(yf).join("")}
        </div>
    `,O()}let ui=[];function wf(){return ui}Ye(e=>{e==="currentProject"&&L()==="epics"&&Ka()});let pi=0;async function Ka(){var n;const e=document.getElementById("epics-list");if(!e)return;const t=++pi;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=C())!=null&&n.id)){ui=[],e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=F();let i;if(s?i=await h.getIssues({project_id:s,issue_type:"epic"}):i=await h.getTeamIssues(C().id,{issue_type:"epic"}),t!==pi)return;if(!i||i.length===0){ui=[],e.innerHTML=Z({icon:Y.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await h.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));if(t!==pi)return;ui=a,kf(a,e)}catch(s){if(t!==pi)return;e.innerHTML=`<div class="empty-state">Failed to load epics: ${g(s.message||String(s))}</div>`}}function kf(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(p=>p.status==="done"||p.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,d=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase()),l=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${u(s.identifier)}" style="cursor: pointer;">
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&vg(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function $f(){const e=F(),t=X().map(n=>`
        <option value="${u(n.id)}" ${n.id===e?"selected":""}>${g(n.name)}</option>
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
    `,O(),document.getElementById("create-epic-form").addEventListener("submit",Ef),document.getElementById("create-epic-title").focus()}async function Ef(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){E("Please select a project","error");return}if(!n){E("Please enter a title","error");return}try{const i=await h.createIssue(t,{title:n,description:s||null,issue_type:"epic"});N(),E(`Created epic ${i.identifier}`,"success"),Ka()}catch(i){x("create epic",i)}}async function ql(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){G(t.id,!1);return}await Ya(t.id,!1)}else M("epics",!1)}catch{M("epics",!1)}}async function Ya(e,t=!0){try{t&&Dt();const[n,s,i,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(n.issue_type!=="epic"){G(e,t);return}t&&history.pushState({epicId:e,view:L()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=L()||"epics",c=X().find(k=>k.id===n.project_id),d=n.assignee_id?Mn(n.assignee_id):null,l=d?Lt(d):null,p=s.length,m=s.filter(k=>k.status==="done"||k.status==="canceled").length,v=p>0?Math.round(m/p*100):0,b=wf(),w=b.findIndex(k=>k.id===n.id),_=w>0?b[w-1]:null,T=w>=0&&w<b.length-1?b[w+1]:null,R=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${R?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${_?`data-action="navigate-epic" data-epic-id="${u(_.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${b.length}</span>
                            <button class="issue-nav-btn" ${T?`data-action="navigate-epic" data-epic-id="${u(T.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?g(c.name):"Project"} › ${g(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${g(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Os(n.description)}
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
                                <span>${m} of ${p} done</span>
                                <span>${v}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?Z({icon:Y.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(k=>{const B=k.assignee_id?Mn(k.assignee_id):null,j=B?Lt(B):null;return`
                                <div class="sub-issue-item" data-issue-id="${u(k.id)}" data-identifier="${u(k.identifier)}">
                                    <span class="sub-issue-status">${Ie(k.status)}</span>
                                    <span class="sub-issue-id">${g(k.identifier)}</span>
                                    <span class="sub-issue-title">${g(k.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(k.status||"backlog").replace(/_/g,"-")}">${$e(k.status)}</span>
                                    ${j?`<span class="sub-issue-assignee">${g(j)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?Z({icon:Y.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):i.map(k=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ua(k.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ma(k)}</span>
                                        <span class="activity-actor">by ${g(pa(k))}</span>
                                        <span class="activity-time">${Ke(k.created_at)}</span>
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
                                            <span class="comment-author">${g(k.author_name||"User")}</span>
                                            <span class="comment-date">${Ke(k.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${g(k.content||"")}</div>
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
                                ${Ie(n.status)}
                                ${$e(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${Qe(n.priority)}
                                ${Ae(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${l?g(l):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${si(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(k=>`
                                    <span class="issue-label" style="background: ${V(k.color)}20; color: ${V(k.color)}">${g(k.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${g(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const A=o.querySelector(".sub-issues-list");A&&A.addEventListener("click",k=>{const B=k.target.closest(".sub-issue-item");B&&B.dataset.issueId&&G(B.dataset.issueId)})}catch(n){x("load epic",n)}}Q({"navigate-epic":(e,t)=>{Ya(t.epicId)}});function xf(e){let t=!1,n=null;return function(i){var o,r,c;if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(o=e.isDetailViewActive)!=null&&o.call(e)&&["p","s","t","e","a"].includes(i.key))return;switch(i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case",":e.navigateTo("settings");break}return}switch(i.key){case"c":if((r=e.isDetailViewActive)!=null&&r.call(e))break;i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":if((c=e.isDetailViewActive)!=null&&c.call(e))break;i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function _f(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function un(e,t,n="#issues-list .issue-row"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function If(e){const t="#issues-list .issue-row";function n(i){return i<0?null:document.querySelectorAll(t)[i]||null}function s(i,a,o,r){const c=n(a);if(!c)return;const d=c.dataset.issueId;if(!d||d.startsWith("temp-"))return;i.preventDefault(),i.stopImmediatePropagation();const l=c.querySelector(`.${r}`);l&&e.showInlineDropdown&&e.showInlineDropdown(i,o,d,l)}return function(a){var c;if(e.getCurrentView()!=="issues"||(c=e.isDetailViewActive)!=null&&c.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":a.preventDefault(),un(r+1,e.setSelectedIndex,t);break;case"k":a.preventDefault(),un(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const d=o[r].dataset.issueId;d&&!d.startsWith("temp-")&&e.viewIssue(d)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const d=o[r].dataset.issueId;d&&!d.startsWith("temp-")&&e.showEditIssueModal(d)}break;case"s":s(a,r,"status","status-btn");break;case"p":s(a,r,"priority","priority-btn");break;case"a":s(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(d=>d.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Tf(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(s){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),un(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),un(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Sf(e){const t="#kanban-board .kanban-card";return function(s){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),un(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),un(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const Ol=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let mt=[],Za=null,Xa=0;Ye(e=>{e==="currentProject"&&L()==="board"&&Hl()});async function Hl(){$s(-1);const e=++Xa,t=F();if(!t){const s=document.getElementById("kanban-board");s&&(s.innerHTML=Z({icon:Y.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const s=await h.getIssues({project_id:t});if(e!==Xa)return;mt=s,L()==="board"&&Ut(mt),xt()}catch(s){if(e!==Xa)return;n&&(n.innerHTML=Z({icon:Y.issues,heading:"Failed to load board",description:"Check your connection and try again"})),x("load board",s)}}function xt(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=Ol.map(s=>{const i=mt.filter(a=>a.status===s.key);return`
            <div class="kanban-column" data-action="board-column" data-status="${s.key}">
                <div class="kanban-column-header">
                    <div class="kanban-column-title">
                        <span class="status-dot status-dot-${s.key}"></span>
                        ${s.label}
                    </div>
                    <span class="kanban-column-count">${i.length}</span>
                </div>
                <div class="kanban-column-content">
                    ${i.length===0?`
                        <div class="kanban-column-empty">No issues</div>
                    `:i.map(a=>`
                        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${u(a.id)}" data-identifier="${u(a.identifier)}">
                            <div class="kanban-card-title">${g(a.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${a.identifier}</span>
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Ae(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),Lf(t)}function Lf(e){const t=Jo();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){$s(-1);return}let s=e?Array.prototype.findIndex.call(n,i=>i.dataset.id===e):-1;s<0&&(s=Math.min(t,n.length-1)),$s(s),n[s].classList.add("keyboard-selected")}function Cf(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Za=t.dataset.id,t.classList.add("dragging")}function Af(e,t){t.classList.remove("dragging"),Za=null}function Bf(e,t){e.preventDefault(),t.classList.add("drag-over")}function jf(e,t){t.classList.remove("drag-over")}function Mf(e,t){e.preventDefault(),t.classList.add("drag-over")}function Df(e,t){t.classList.remove("drag-over")}async function Rf(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),s=t.dataset.status,i=mt.find(o=>o.id===n);if(!i)return;const a=i.status;if(i.status=s,Fl(s,n),xt(),a!==s)try{await h.updateIssue(n,{status:s}),E("Status updated","success")}catch(o){i.status=a,xt(),x("update status",o)}}async function Pf(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Za||e.dataTransfer.getData("text/plain"),s=t.dataset.id;if(!n||!s||n===s)return;const i=t.closest(".kanban-column"),a=i==null?void 0:i.dataset.status;if(!a)return;const o=mt.find(c=>c.id===n);if(!o)return;const r=o.status;if(o.status=a,Fl(a,n,s),xt(),r!==a)try{await h.updateIssue(n,{status:a}),E("Status updated","success")}catch(c){o.status=r,xt(),x("update status",c)}}function Fl(e,t,n=null){const s=mt.filter(o=>o.status===e&&o.id!==t),i=mt.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];Ol.forEach(o=>{o.key===e?a.push(...s):a.push(...mt.filter(r=>r.status===o.key))}),mt=a}Q({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),G(t.id)):e.type==="dragstart"?Cf(e,n):e.type==="dragend"?Af(e,n):e.type==="dragover"?Mf(e,n):e.type==="dragleave"?Df(e,n):e.type==="drop"&&Pf(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Bf(e,n):e.type==="dragleave"?jf(e,n):e.type==="drop"&&Rf(e,n)}});const _t=new Map,Ul=6e4,Qa=100;let me=null,mi=null,gi=null,ss=null,Gl=!1;const Nf={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},qf={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},zl={api:null};let Ja={...zl};function Of(e={}){Ja={...zl,...e},me||(me=document.createElement("div"),me.className="issue-tooltip",me.style.display="none",document.body.appendChild(me),me.addEventListener("mouseenter",()=>{clearTimeout(mi)}),me.addEventListener("mouseleave",()=>{eo()})),Gl||(document.addEventListener("mouseover",Hf),document.addEventListener("mouseout",Ff),Gl=!0)}function Hf(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Uf(t);if(n){if(n===ss&&me.style.display!=="none"){clearTimeout(mi);return}clearTimeout(gi),gi=setTimeout(()=>{Gf(t,n)},200)}}function Ff(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(gi),mi=setTimeout(()=>{eo()},150))}function Uf(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Gf(e,t){ss=t;const n=e.getBoundingClientRect();me.style.left=`${n.left+window.scrollX}px`,me.style.top=`${n.bottom+window.scrollY+8}px`,me.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',me.style.display="block";try{const s=await Vf(t);if(ss!==t)return;Wf(s)}catch{if(ss!==t)return;me.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function eo(){clearTimeout(gi),clearTimeout(mi),me&&(me.style.display="none"),ss=null}function zf(){const e=Date.now();for(const[t,n]of _t.entries())e-n.timestamp>=Ul&&_t.delete(t)}async function Vf(e){_t.size>Qa/2&&zf();const t=_t.get(e);if(t&&Date.now()-t.timestamp<Ul)return t.issue;if(!Ja.api)throw new Error("API not initialized");const n=await Ja.api.getIssueByIdentifier(e);if(_t.size>=Qa){const s=Array.from(_t.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Qa/2);for(const[a]of i)_t.delete(a)}return _t.set(e,{issue:n,timestamp:Date.now()}),n}function Wf(e){const t=Nf[e.status]||"#6b7280",n=qf[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";me.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${g(e.identifier)}</span>
            <span class="issue-tooltip-type">${g(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${g(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Kf(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Yf(e.priority)}</span>
        </div>
    `}function Kf(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Yf(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Zf(){dt("issue:created",Xf),dt("issue:updated",Qf),dt("issue:deleted",Jf),dt("comment",eh),dt("relation",th),dt("attestation",nh),dt("activity",sh),dt("project",ih),dt("sprint",ah)}function Xf(e){var i,a,o;const t=Be(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,Ze(r),L()==="issues"&&rt()}else Ze([e,...t]),L()==="issues"&&rt(),E(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=An())==null?void 0:i.id)){const r=yt(),c=r.findIndex(l=>l.id===e.id),d=r.findIndex(l=>l._isOptimistic&&l.title===e.title);if(c===-1&&d===-1)Xt([e,...r]),L()==="my-issues"&&Dn();else if(d>=0){const l=[...r];l[d]=e,Xt(l),L()==="my-issues"&&Dn()}}L()==="my-issues"&&Bt({showLoading:!1}),L()==="board"?xt():L()==="sprints"&&fi(),L()==="issue-detail"&&e.parent_id===((a=ie())==null?void 0:a.id)&&G((o=ie())==null?void 0:o.id,!1)}function Qf(e){const t=Be();t.some(i=>i.id===e.id)&&Ze(t.map(i=>i.id===e.id?e:i));const n=yt();n.some(i=>i.id===e.id)&&Xt(n.map(i=>i.id===e.id?e:i));const s=ws();if(s.some(i=>i.id===e.id)&&Ut(s.map(i=>i.id===e.id?e:i)),L()==="issues")rt();else if(L()==="my-issues")Dn(),Bt({showLoading:!1});else if(L()==="board")xt();else if(L()==="sprints")fi();else if(L()==="issue-detail"){const i=document.getElementById("issue-detail-content");i&&i.dataset.issueId===e.id&&G(e.id)}}function Jf(e){var n;Ze(Be().filter(s=>s.id!==e.id)),Xt(yt().filter(s=>s.id!==e.id));const t=ws();t.some(s=>s.id===e.id)&&Ut(t.filter(s=>s.id!==e.id)),L()==="issues"?rt():L()==="my-issues"?(Dn(),Bt({showLoading:!1})):L()==="board"?xt():L()==="sprints"&&fi(),E(`Issue ${e.identifier} deleted`,"info"),L()==="issue-detail"&&((n=ie())==null?void 0:n.id)===e.id&&(E(`Issue ${e.identifier} was deleted`,"warning"),M("my-issues"))}function eh(e){var t;L()==="my-issues"&&Bt({showLoading:!1}),L()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function th(e){var t;if(L()==="issue-detail"){const n=(t=ie())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&G(n,!1)}}function nh(e){var t;L()==="approvals"&&Mt(),L()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function sh(e){var t;L()==="my-issues"&&Bt({showLoading:!1}),L()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function ih(e,{type:t}){Fe().then(()=>{L()==="projects"&&Vn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?E(`New project: ${e.name}`,"info"):t==="deleted"&&E(`Project ${e.name} deleted`,"info")}function fi(){const e=am();e?Gn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Un().catch(t=>console.error("Failed to reload sprints:",t))}function ah(){nl(),L()==="sprints"?fi():L()==="my-issues"&&aa()}const Vl='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Wl(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function oh(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Wl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Vl);n&&n.focus()}}}function hi(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Wl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const s=n.querySelectorAll(Vl);if(s.length===0)return;const i=s[0],a=s[s.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),i.focus();return}e.shiftKey&&document.activeElement===i?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),i.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&hi()});async function rh(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=F();if(!s){E("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=X().find(d=>d.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ze([r,...Be()]),rt();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const d=await h.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const l=Be(),p=l.findIndex(m=>m.id===a);p!==-1&&(l[p]=d,Ze(l)),rt(),Fe(),E("Issue created!","success")}catch(d){Ze(Be().filter(l=>l.id!==a)),rt(),x("create issue",d)}finally{t.disabled=!1,t.placeholder=i,t.focus()}}gg({beforeNavigate:()=>{eg(),pl(null),Es(null),tr(null),hi(),eo()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return ql(e[1]),!0;if(e[0]==="issue"&&e[1])return Fs(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(Fs(t)).then(s=>{s&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(vh(e[1]),!0):e[0]==="sprint"&&e[1]?(cm(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(fl(e[1]),!0):!1},detailPopstate:e=>e.epicId?(Ya(e.epicId,!1),!0):e.issueId?(G(e.issueId,!1),!0):e.identifier?(Fs(e.identifier),!0):e.documentId?(He(e.documentId,!1),!0):e.sprintId?(Gn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Sa();e&&X().some(t=>t.id===e)&&qe(e)},issueNavigate:e=>Fs(e),epicNavigate:e=>ql(e)}),mg({"my-issues":()=>{aa(),Ds(),Bt()},approvals:()=>{Mt()},issues:()=>{fr(),fu(),bu(),ur().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const s=document.getElementById("label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),Ss())}const n=e.getAll("exclude_label");if(n.length>0){const s=document.getElementById("exclude-label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),Ls())}}),gr().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}At()})},epics:()=>{Ka()},board:()=>{Hl()},projects:()=>{Fe().then(Vn)},sprints:()=>{Un()},rituals:()=>{Im()},documents:()=>{On()},team:()=>{Il(),Dg(),Ha()},settings:()=>{Wa(),Ra()}});function lh(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||N()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>N())}function ch(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>hl(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>sg());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>ig()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>vl(a))})}function dh(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Wr("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Wr("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Kr());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>Cp());const i=document.getElementById("doc-sort");i&&i.addEventListener("change",()=>$t())}function uh(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Er())}function ph(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>vu());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>su());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>iu()),document.querySelectorAll(".multi-select-btn").forEach(v=>{const b=v.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?v.addEventListener("click",()=>Cs("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?v.addEventListener("click",()=>Cs("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?v.addEventListener("click",()=>Cs("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&v.addEventListener("click",()=>Cs("exclude-label-filter-dropdown"))});const s=document.getElementById("status-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>As())});const v=s.querySelector(".btn-small");v&&v.addEventListener("click",()=>Qi())}const i=document.getElementById("priority-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Ji())});const v=i.querySelector(".btn-small");v&&v.addEventListener("click",()=>ea())}const a=document.getElementById("label-filter-dropdown");if(a){const v=a.querySelector(".btn-small");v&&v.addEventListener("click",()=>Bs())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const v=o.querySelector(".btn-small");v&&v.addEventListener("click",()=>js())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>je());const c=document.getElementById("assignee-filter");c&&c.addEventListener("change",()=>je());const d=document.getElementById("sprint-filter");d&&d.addEventListener("change",()=>je());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>At());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>br());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",v=>rh(v))}function mh(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Sm(t.dataset.tab))})}function gh(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>_l());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Rn()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),M(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Ag());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>hi());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>oh());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Rn())}Q({"navigate-to":(e,t)=>{M(t.view)},"set-current-project":(e,t,n)=>{qe(n.value)},showCreateIssueModal:()=>Rn(),showCreateEpicModal:()=>$f(),showCreateProjectModal:()=>gl(),showCreateDocumentModal:()=>Zr(),showCreateTeamModal:()=>Sl(),showEditTeamModal:()=>Og(),showInviteModal:()=>Tl(),showCreateApiKeyModal:()=>lf(),showCreateAgentModal:()=>Eg(),resetOnboarding:()=>Dl(),logout:()=>Rl(),navigateToProjects:()=>M("projects")}),document.addEventListener("DOMContentLoaded",async()=>{if(Jd(),of(),gh(),lh(),uh(),ph(),mh(),ch(),dh(),fh(),hh(),Of({api:h}),bg(),Zf(),h.getToken())try{const e=await h.getMe();ys(e),await Jn()}catch{h.logout(),za()}else za()});function fh(){const e=document.getElementById("theme-toggle");if(!e)return;const t=$d()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Ed(n?"light":"dark")})}function hh(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");$l(s)}}})}async function vh(e){try{await He(e,!1)}catch{M("documents",!1)}}const to=()=>["issue-detail-view","epic-detail-view","document-detail-view"].some(e=>{const t=document.getElementById(e);return t&&!t.classList.contains("hidden")});document.addEventListener("keydown",If({getCurrentView:L,getSelectedIndex:Xo,setSelectedIndex:Bn,viewIssue:G,showEditIssueModal:Rr,showInlineDropdown:oa,isModalOpen:Sn,isCommandPaletteOpen:ci,isDetailViewActive:to})),document.addEventListener("keydown",Tf({getCurrentView:L,getSelectedIndex:zd,setSelectedIndex:Qo,viewDocument:He,showEditDocumentModal:Xr,isModalOpen:Sn,isCommandPaletteOpen:ci,isDetailViewActive:to})),document.addEventListener("keydown",Sf({getCurrentView:L,getSelectedIndex:Jo,setSelectedIndex:$s,viewIssue:G,isModalOpen:Sn,isCommandPaletteOpen:ci,isDetailViewActive:to})),document.addEventListener("keydown",xf({closeModal:N,closeSidebar:hi,navigateTo:M,showCreateIssueModal:Rn,showKeyboardShortcutsHelp:Nl,isModalOpen:Sn,focusSearch:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Ct()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))}})),pf([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>M("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>M("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>M("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>M("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>M("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>M("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>M("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>M("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>M("approvals"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>M("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>M("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{M("issues"),setTimeout(Rn,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{M("projects"),setTimeout(gl,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{M("documents"),setTimeout(Zr,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Sl(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{M("team"),setTimeout(Tl,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Nl(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Dl(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Rl(),category:"Account"}]),document.addEventListener("keydown",_f({isModalOpen:Sn,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:ci,openCommandPalette:mf,closeCommandPalette:di})),window.marked=q,window.DOMPurify=zo,console.log("Chaotic frontend loaded via Vite")})();
