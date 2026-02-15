var Zm=Object.defineProperty;var Ym=(De,le,rt)=>le in De?Zm(De,le,{enumerable:!0,configurable:!0,writable:!0,value:rt}):De[le]=rt;var q=(De,le,rt)=>Ym(De,typeof le!="symbol"?le+"":le,rt);(function(){"use strict";var Wi;function De(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var le=De();function rt(e){le=e}var zt={exec:()=>null};function P(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ce.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ce={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},al=/^(?:[ \t]*(?:\n|$))+/,ol=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,rl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Kt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ll=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ws=/(?:[*+-]|\d{1,9}[.)])/,la=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ca=P(la).replace(/bull/g,ws).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),cl=P(la).replace(/bull/g,ws).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ks=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,dl=/^[^\n]+/,$s=/(?!\s*\])(?:\\.|[^\[\]\\])+/,ul=P(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",$s).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),pl=P(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ws).getRegex(),xn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Es=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ml=P("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Es).replace("tag",xn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),da=P(ks).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex(),gl=P(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",da).getRegex(),Is={blockquote:gl,code:ol,def:ul,fences:rl,heading:ll,hr:Kt,html:ml,lheading:ca,list:pl,newline:al,paragraph:da,table:zt,text:dl},ua=P("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex(),fl={...Is,lheading:cl,table:ua,paragraph:P(ks).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ua).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex()},hl={...Is,html:P(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Es).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:zt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:P(ks).replace("hr",Kt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ca).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},vl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,bl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pa=/^( {2,}|\\)\n(?!\s*$)/,yl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Sn=/[\p{P}\p{S}]/u,Ts=/[\s\p{P}\p{S}]/u,ma=/[^\s\p{P}\p{S}]/u,wl=P(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ts).getRegex(),ga=/(?!~)[\p{P}\p{S}]/u,kl=/(?!~)[\s\p{P}\p{S}]/u,$l=/(?:[^\s\p{P}\p{S}]|~)/u,El=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,fa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Il=P(fa,"u").replace(/punct/g,Sn).getRegex(),Tl=P(fa,"u").replace(/punct/g,ga).getRegex(),ha="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",_l=P(ha,"gu").replace(/notPunctSpace/g,ma).replace(/punctSpace/g,Ts).replace(/punct/g,Sn).getRegex(),xl=P(ha,"gu").replace(/notPunctSpace/g,$l).replace(/punctSpace/g,kl).replace(/punct/g,ga).getRegex(),Sl=P("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ma).replace(/punctSpace/g,Ts).replace(/punct/g,Sn).getRegex(),Cl=P(/\\(punct)/,"gu").replace(/punct/g,Sn).getRegex(),Ll=P(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Al=P(Es).replace("(?:-->|$)","-->").getRegex(),Bl=P("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Al).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Cn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Dl=P(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Cn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),va=P(/^!?\[(label)\]\[(ref)\]/).replace("label",Cn).replace("ref",$s).getRegex(),ba=P(/^!?\[(ref)\](?:\[\])?/).replace("ref",$s).getRegex(),Ml=P("reflink|nolink(?!\\()","g").replace("reflink",va).replace("nolink",ba).getRegex(),_s={_backpedal:zt,anyPunctuation:Cl,autolink:Ll,blockSkip:El,br:pa,code:bl,del:zt,emStrongLDelim:Il,emStrongRDelimAst:_l,emStrongRDelimUnd:Sl,escape:vl,link:Dl,nolink:ba,punctuation:wl,reflink:va,reflinkSearch:Ml,tag:Bl,text:yl,url:zt},jl={..._s,link:P(/^!?\[(label)\]\((.*?)\)/).replace("label",Cn).getRegex(),reflink:P(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Cn).getRegex()},xs={..._s,emStrongRDelimAst:xl,emStrongLDelim:Tl,url:P(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Rl={...xs,br:P(pa).replace("{2,}","*").getRegex(),text:P(xs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ln={normal:Is,gfm:fl,pedantic:hl},Wt={normal:_s,gfm:xs,breaks:Rl,pedantic:jl},Pl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ya=e=>Pl[e];function _e(e,t){if(t){if(ce.escapeTest.test(e))return e.replace(ce.escapeReplace,ya)}else if(ce.escapeTestNoEncode.test(e))return e.replace(ce.escapeReplaceNoEncode,ya);return e}function wa(e){try{e=encodeURI(e).replace(ce.percentDecode,"%")}catch{return null}return e}function ka(e,t){var a;const n=e.replace(ce.findPipe,(o,r,c)=>{let l=!1,d=r;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),s=n.split(ce.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ce.slashPipe,"|");return s}function Vt(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Nl(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function $a(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function Hl(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var An=class{constructor(e){q(this,"options");q(this,"rules");q(this,"lexer");this.options=e||le}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Vt(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Hl(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=Vt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Vt(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Vt(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const l=r.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const v=m,y=v.raw+`
`+n.join(`
`),b=this.blockquote(y);a[a.length-1]=b,s=s.substring(0,s.length-v.raw.length)+b.raw,i=i.substring(0,i.length-v.text.length)+b.text;break}else if((m==null?void 0:m.type)==="list"){const v=m,y=v.raw+`
`+n.join(`
`),b=this.list(y);a[a.length-1]=b,s=s.substring(0,s.length-m.raw.length)+b.raw,i=i.substring(0,i.length-v.raw.length)+b.raw,n=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),m=e.split(`
`,1)[0],v=!u.trim(),y=0;if(this.options.pedantic?(y=2,d=u.trimStart()):v?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,d=u.slice(y),y+=t[1].length),v&&this.rules.other.blankLine.test(m)&&(l+=m+`
`,e=e.substring(m.length+1),c=!0),!c){const C=this.rules.other.nextBulletRegex(y),j=this.rules.other.hrRegex(y),O=this.rules.other.fencesBeginRegex(y),D=this.rules.other.headingBeginRegex(y),U=this.rules.other.htmlBeginRegex(y);for(;e;){const k=e.split(`
`,1)[0];let W;if(m=k,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),W=m):W=m.replace(this.rules.other.tabCharGlobal,"    "),O.test(m)||D.test(m)||U.test(m)||C.test(m)||j.test(m))break;if(W.search(this.rules.other.nonSpaceChar)>=y||!m.trim())d+=`
`+W.slice(y);else{if(v||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||O.test(u)||D.test(u)||j.test(u))break;d+=`
`+m}!v&&!m.trim()&&(v=!0),l+=k+`
`,e=e.substring(k.length+1),u=W.slice(y)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let b=null,x;this.options.gfm&&(b=this.rules.other.listIsTask.exec(d),b&&(x=b[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!b,checked:x,loose:!1,text:d,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const l=i.items[c].tokens.filter(u=>u.type==="space"),d=l.length>0&&l.some(u=>this.rules.other.anyLine.test(u.raw));i.loose=d}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=ka(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(ka(r,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Vt(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Nl(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),$a(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return $a(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,l=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);const u=[...s[0]][0].length,m=e.slice(0,a+s.index+u+r);if(Math.min(a,r)%2){const y=m.slice(1,-1);return{type:"em",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}const v=m.slice(2,-2);return{type:"strong",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Me=class oa{constructor(t){q(this,"tokens");q(this,"options");q(this,"state");q(this,"tokenizer");q(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||le,this.options.tokenizer=this.options.tokenizer||new An,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ce,block:Ln.normal,inline:Wt.normal};this.options.pedantic?(n.block=Ln.pedantic,n.inline=Wt.pedantic):this.options.gfm&&(n.block=Ln.gfm,this.options.breaks?n.inline=Wt.breaks:n.inline=Wt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ln,inline:Wt}}static lex(t,n){return new oa(n).lex(t)}static lexInline(t,n){return new oa(n).inlineTokens(t)}lex(t){t=t.replace(ce.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ce.tabCharGlobal,"    ").replace(ce.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(m=>{u=m.call({lexer:this},d),typeof u=="number"&&u>=0&&(l=Math.min(l,u))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,l;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(m=>(d=m.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const m=n.at(-1);d.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((l=this.options.extensions)!=null&&l.startInline){let m=1/0;const v=t.slice(1);let y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},v),typeof y=="number"&&y>=0&&(m=Math.min(m,y))}),m<1/0&&m>=0&&(u=t.substring(0,m+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},Bn=class{constructor(e){q(this,"options");q(this,"parser");this.options=e||le}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ce.notSpaceStart))==null?void 0:a[0],i=e.replace(ce.endingNewline,"")+`
`;return s?'<pre><code class="language-'+_e(s)+'">'+(n?i:_e(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:_e(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+_e(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${_e(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=wa(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+_e(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=wa(e);if(i===null)return _e(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${_e(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:_e(e.text)}},Ss=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},je=class ra{constructor(t){q(this,"options");q(this,"renderer");q(this,"textRenderer");this.options=t||le,this.options.renderer=this.options.renderer||new Bn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ss}static parse(t,n){return new ra(n).parse(t)}static parseInline(t,n){return new ra(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=d||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],d+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Dn=(Wi=class{constructor(e){q(this,"options");q(this,"block");this.options=e||le}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Me.lex:Me.lexInline}provideParser(){return this.block?je.parse:je.parseInline}},q(Wi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Wi),Ol=class{constructor(...e){q(this,"defaults",De());q(this,"options",this.setOptions);q(this,"parse",this.parseMarkdown(!0));q(this,"parseInline",this.parseMarkdown(!1));q(this,"Parser",je);q(this,"Renderer",Bn);q(this,"TextRenderer",Ss);q(this,"Lexer",Me);q(this,"Tokenizer",An);q(this,"Hooks",Dn);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Bn(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new An(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new Dn;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];Dn.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(u=>c.call(i,u));const d=r.call(i,l);return c.call(i,d)}:i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Me.lex(e,t??this.defaults)}parser(e,t){return je.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Me.lex:Me.lexInline,c=a.hooks?a.hooks.provideParser():e?je.parse:je.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+_e(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},lt=new Ol;function R(e,t){return lt.parse(e,t)}R.options=R.setOptions=function(e){return lt.setOptions(e),R.defaults=lt.defaults,rt(R.defaults),R},R.getDefaults=De,R.defaults=le,R.use=function(...e){return lt.use(...e),R.defaults=lt.defaults,rt(R.defaults),R},R.walkTokens=function(e,t){return lt.walkTokens(e,t)},R.parseInline=lt.parseInline,R.Parser=je,R.parser=je.parse,R.Renderer=Bn,R.TextRenderer=Ss,R.Lexer=Me,R.lexer=Me.lex,R.Tokenizer=An,R.Hooks=Dn,R.parse=R,R.options,R.setOptions,R.use,R.walkTokens,R.parseInline,je.parse,Me.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Ea,setPrototypeOf:Ia,isFrozen:ql,getPrototypeOf:Fl,getOwnPropertyDescriptor:Ul}=Object;let{freeze:de,seal:ye,create:Cs}=Object,{apply:Ls,construct:As}=typeof Reflect<"u"&&Reflect;de||(de=function(t){return t}),ye||(ye=function(t){return t}),Ls||(Ls=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),As||(As=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const Mn=pe(Array.prototype.forEach),Gl=pe(Array.prototype.lastIndexOf),Ta=pe(Array.prototype.pop),Jt=pe(Array.prototype.push),zl=pe(Array.prototype.splice),jn=pe(String.prototype.toLowerCase),Bs=pe(String.prototype.toString),Ds=pe(String.prototype.match),Zt=pe(String.prototype.replace),Kl=pe(String.prototype.indexOf),Wl=pe(String.prototype.trim),Ee=pe(Object.prototype.hasOwnProperty),ue=pe(RegExp.prototype.test),Yt=Vl(TypeError);function pe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Ls(e,t,s)}}function Vl(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return As(e,n)}}function B(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:jn;Ia&&Ia(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(ql(t)||(t[s]=a),i=a)}e[i]=!0}return e}function Jl(e){for(let t=0;t<e.length;t++)Ee(e,t)||(e[t]=null);return e}function xe(e){const t=Cs(null);for(const[n,s]of Ea(e))Ee(e,n)&&(Array.isArray(s)?t[n]=Jl(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=xe(s):t[n]=s);return t}function Xt(e,t){for(;e!==null;){const s=Ul(e,t);if(s){if(s.get)return pe(s.get);if(typeof s.value=="function")return pe(s.value)}e=Fl(e)}function n(){return null}return n}const _a=de(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ms=de(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),js=de(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Zl=de(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Rs=de(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Yl=de(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),xa=de(["#text"]),Sa=de(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ps=de(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ca=de(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Rn=de(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xl=ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ql=ye(/<%[\w\W]*|[\w\W]*%>/gm),ec=ye(/\$\{[\w\W]*/gm),tc=ye(/^data-[\-\w.\u00B7-\uFFFF]+$/),nc=ye(/^aria-[\-\w]+$/),La=ye(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),sc=ye(/^(?:\w+script|data):/i),ic=ye(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Aa=ye(/^html$/i),ac=ye(/^[a-z][.\w]*(-[.\w]+)+$/i);var Ba=Object.freeze({__proto__:null,ARIA_ATTR:nc,ATTR_WHITESPACE:ic,CUSTOM_ELEMENT:ac,DATA_ATTR:tc,DOCTYPE_NAME:Aa,ERB_EXPR:Ql,IS_ALLOWED_URI:La,IS_SCRIPT_OR_DATA:sc,MUSTACHE_EXPR:Xl,TMPLIT_EXPR:ec});const Qt={element:1,text:3,progressingInstruction:7,comment:8,document:9},oc=function(){return typeof window>"u"?null:window},rc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Da=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ma(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:oc();const t=S=>Ma(S);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Qt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:m,trustedTypes:v}=e,y=c.prototype,b=Xt(y,"cloneNode"),x=Xt(y,"remove"),C=Xt(y,"nextSibling"),j=Xt(y,"childNodes"),O=Xt(y,"parentNode");if(typeof o=="function"){const S=n.createElement("template");S.content&&S.content.ownerDocument&&(n=S.content.ownerDocument)}let D,U="";const{implementation:k,createNodeIterator:W,createDocumentFragment:Te,getElementsByTagName:ae}=n,{importNode:oe}=s;let V=Da();t.isSupported=typeof Ea=="function"&&typeof O=="function"&&k&&k.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Je,ERB_EXPR:Pt,TMPLIT_EXPR:ht,DATA_ATTR:Nm,ARIA_ATTR:Hm,IS_SCRIPT_OR_DATA:Om,ATTR_WHITESPACE:jr,CUSTOM_ELEMENT:qm}=Ba;let{IS_ALLOWED_URI:Rr}=Ba,te=null;const Pr=B({},[..._a,...Ms,...js,...Rs,...xa]);let ne=null;const Nr=B({},[...Sa,...Ps,...Ca,...Rn]);let J=Object.seal(Cs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),In=null,Vi=null;const Nt=Object.seal(Cs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Hr=!0,Ji=!0,Or=!1,qr=!0,Ht=!1,ms=!0,vt=!1,Zi=!1,Yi=!1,Ot=!1,gs=!1,fs=!1,Fr=!0,Ur=!1;const Fm="user-content-";let Xi=!0,Tn=!1,qt={},Ae=null;const Qi=B({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Gr=null;const zr=B({},["audio","video","img","source","image","track"]);let ea=null;const Kr=B({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),hs="http://www.w3.org/1998/Math/MathML",vs="http://www.w3.org/2000/svg",Ze="http://www.w3.org/1999/xhtml";let Ft=Ze,ta=!1,na=null;const Um=B({},[hs,vs,Ze],Bs);let bs=B({},["mi","mo","mn","ms","mtext"]),ys=B({},["annotation-xml"]);const Gm=B({},["title","style","font","a","script"]);let _n=null;const zm=["application/xhtml+xml","text/html"],Km="text/html";let Q=null,Ut=null;const Wm=n.createElement("form"),Wr=function(p){return p instanceof RegExp||p instanceof Function},sa=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ut&&Ut===p)){if((!p||typeof p!="object")&&(p={}),p=xe(p),_n=zm.indexOf(p.PARSER_MEDIA_TYPE)===-1?Km:p.PARSER_MEDIA_TYPE,Q=_n==="application/xhtml+xml"?Bs:jn,te=Ee(p,"ALLOWED_TAGS")?B({},p.ALLOWED_TAGS,Q):Pr,ne=Ee(p,"ALLOWED_ATTR")?B({},p.ALLOWED_ATTR,Q):Nr,na=Ee(p,"ALLOWED_NAMESPACES")?B({},p.ALLOWED_NAMESPACES,Bs):Um,ea=Ee(p,"ADD_URI_SAFE_ATTR")?B(xe(Kr),p.ADD_URI_SAFE_ATTR,Q):Kr,Gr=Ee(p,"ADD_DATA_URI_TAGS")?B(xe(zr),p.ADD_DATA_URI_TAGS,Q):zr,Ae=Ee(p,"FORBID_CONTENTS")?B({},p.FORBID_CONTENTS,Q):Qi,In=Ee(p,"FORBID_TAGS")?B({},p.FORBID_TAGS,Q):xe({}),Vi=Ee(p,"FORBID_ATTR")?B({},p.FORBID_ATTR,Q):xe({}),qt=Ee(p,"USE_PROFILES")?p.USE_PROFILES:!1,Hr=p.ALLOW_ARIA_ATTR!==!1,Ji=p.ALLOW_DATA_ATTR!==!1,Or=p.ALLOW_UNKNOWN_PROTOCOLS||!1,qr=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ht=p.SAFE_FOR_TEMPLATES||!1,ms=p.SAFE_FOR_XML!==!1,vt=p.WHOLE_DOCUMENT||!1,Ot=p.RETURN_DOM||!1,gs=p.RETURN_DOM_FRAGMENT||!1,fs=p.RETURN_TRUSTED_TYPE||!1,Yi=p.FORCE_BODY||!1,Fr=p.SANITIZE_DOM!==!1,Ur=p.SANITIZE_NAMED_PROPS||!1,Xi=p.KEEP_CONTENT!==!1,Tn=p.IN_PLACE||!1,Rr=p.ALLOWED_URI_REGEXP||La,Ft=p.NAMESPACE||Ze,bs=p.MATHML_TEXT_INTEGRATION_POINTS||bs,ys=p.HTML_INTEGRATION_POINTS||ys,J=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Wr(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(J.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Wr(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(J.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(J.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ht&&(Ji=!1),gs&&(Ot=!0),qt&&(te=B({},xa),ne=[],qt.html===!0&&(B(te,_a),B(ne,Sa)),qt.svg===!0&&(B(te,Ms),B(ne,Ps),B(ne,Rn)),qt.svgFilters===!0&&(B(te,js),B(ne,Ps),B(ne,Rn)),qt.mathMl===!0&&(B(te,Rs),B(ne,Ca),B(ne,Rn))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Nt.tagCheck=p.ADD_TAGS:(te===Pr&&(te=xe(te)),B(te,p.ADD_TAGS,Q))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Nt.attributeCheck=p.ADD_ATTR:(ne===Nr&&(ne=xe(ne)),B(ne,p.ADD_ATTR,Q))),p.ADD_URI_SAFE_ATTR&&B(ea,p.ADD_URI_SAFE_ATTR,Q),p.FORBID_CONTENTS&&(Ae===Qi&&(Ae=xe(Ae)),B(Ae,p.FORBID_CONTENTS,Q)),p.ADD_FORBID_CONTENTS&&(Ae===Qi&&(Ae=xe(Ae)),B(Ae,p.ADD_FORBID_CONTENTS,Q)),Xi&&(te["#text"]=!0),vt&&B(te,["html","head","body"]),te.table&&(B(te,["tbody"]),delete In.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Yt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Yt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=p.TRUSTED_TYPES_POLICY,U=D.createHTML("")}else D===void 0&&(D=rc(v,i)),D!==null&&typeof U=="string"&&(U=D.createHTML(""));de&&de(p),Ut=p}},Vr=B({},[...Ms,...js,...Zl]),Jr=B({},[...Rs,...Yl]),Vm=function(p){let $=O(p);(!$||!$.tagName)&&($={namespaceURI:Ft,tagName:"template"});const T=jn(p.tagName),G=jn($.tagName);return na[p.namespaceURI]?p.namespaceURI===vs?$.namespaceURI===Ze?T==="svg":$.namespaceURI===hs?T==="svg"&&(G==="annotation-xml"||bs[G]):!!Vr[T]:p.namespaceURI===hs?$.namespaceURI===Ze?T==="math":$.namespaceURI===vs?T==="math"&&ys[G]:!!Jr[T]:p.namespaceURI===Ze?$.namespaceURI===vs&&!ys[G]||$.namespaceURI===hs&&!bs[G]?!1:!Jr[T]&&(Gm[T]||!Vr[T]):!!(_n==="application/xhtml+xml"&&na[p.namespaceURI]):!1},Be=function(p){Jt(t.removed,{element:p});try{O(p).removeChild(p)}catch{x(p)}},bt=function(p,$){try{Jt(t.removed,{attribute:$.getAttributeNode(p),from:$})}catch{Jt(t.removed,{attribute:null,from:$})}if($.removeAttribute(p),p==="is")if(Ot||gs)try{Be($)}catch{}else try{$.setAttribute(p,"")}catch{}},Zr=function(p){let $=null,T=null;if(Yi)p="<remove></remove>"+p;else{const Z=Ds(p,/^[\r\n\t ]+/);T=Z&&Z[0]}_n==="application/xhtml+xml"&&Ft===Ze&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");const G=D?D.createHTML(p):p;if(Ft===Ze)try{$=new m().parseFromString(G,_n)}catch{}if(!$||!$.documentElement){$=k.createDocument(Ft,"template",null);try{$.documentElement.innerHTML=ta?U:G}catch{}}const re=$.body||$.documentElement;return p&&T&&re.insertBefore(n.createTextNode(T),re.childNodes[0]||null),Ft===Ze?ae.call($,vt?"html":"body")[0]:vt?$.documentElement:re},Yr=function(p){return W.call(p.ownerDocument||p,p,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},ia=function(p){return p instanceof u&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof d)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Xr=function(p){return typeof r=="function"&&p instanceof r};function Ye(S,p,$){Mn(S,T=>{T.call(t,p,$,Ut)})}const Qr=function(p){let $=null;if(Ye(V.beforeSanitizeElements,p,null),ia(p))return Be(p),!0;const T=Q(p.nodeName);if(Ye(V.uponSanitizeElement,p,{tagName:T,allowedTags:te}),ms&&p.hasChildNodes()&&!Xr(p.firstElementChild)&&ue(/<[/\w!]/g,p.innerHTML)&&ue(/<[/\w!]/g,p.textContent)||p.nodeType===Qt.progressingInstruction||ms&&p.nodeType===Qt.comment&&ue(/<[/\w]/g,p.data))return Be(p),!0;if(!(Nt.tagCheck instanceof Function&&Nt.tagCheck(T))&&(!te[T]||In[T])){if(!In[T]&&tl(T)&&(J.tagNameCheck instanceof RegExp&&ue(J.tagNameCheck,T)||J.tagNameCheck instanceof Function&&J.tagNameCheck(T)))return!1;if(Xi&&!Ae[T]){const G=O(p)||p.parentNode,re=j(p)||p.childNodes;if(re&&G){const Z=re.length;for(let fe=Z-1;fe>=0;--fe){const Xe=b(re[fe],!0);Xe.__removalCount=(p.__removalCount||0)+1,G.insertBefore(Xe,C(p))}}}return Be(p),!0}return p instanceof c&&!Vm(p)||(T==="noscript"||T==="noembed"||T==="noframes")&&ue(/<\/no(script|embed|frames)/i,p.innerHTML)?(Be(p),!0):(Ht&&p.nodeType===Qt.text&&($=p.textContent,Mn([Je,Pt,ht],G=>{$=Zt($,G," ")}),p.textContent!==$&&(Jt(t.removed,{element:p.cloneNode()}),p.textContent=$)),Ye(V.afterSanitizeElements,p,null),!1)},el=function(p,$,T){if(Fr&&($==="id"||$==="name")&&(T in n||T in Wm))return!1;if(!(Ji&&!Vi[$]&&ue(Nm,$))){if(!(Hr&&ue(Hm,$))){if(!(Nt.attributeCheck instanceof Function&&Nt.attributeCheck($,p))){if(!ne[$]||Vi[$]){if(!(tl(p)&&(J.tagNameCheck instanceof RegExp&&ue(J.tagNameCheck,p)||J.tagNameCheck instanceof Function&&J.tagNameCheck(p))&&(J.attributeNameCheck instanceof RegExp&&ue(J.attributeNameCheck,$)||J.attributeNameCheck instanceof Function&&J.attributeNameCheck($,p))||$==="is"&&J.allowCustomizedBuiltInElements&&(J.tagNameCheck instanceof RegExp&&ue(J.tagNameCheck,T)||J.tagNameCheck instanceof Function&&J.tagNameCheck(T))))return!1}else if(!ea[$]){if(!ue(Rr,Zt(T,jr,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&p!=="script"&&Kl(T,"data:")===0&&Gr[p])){if(!(Or&&!ue(Om,Zt(T,jr,"")))){if(T)return!1}}}}}}}return!0},tl=function(p){return p!=="annotation-xml"&&Ds(p,qm)},nl=function(p){Ye(V.beforeSanitizeAttributes,p,null);const{attributes:$}=p;if(!$||ia(p))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ne,forceKeepAttr:void 0};let G=$.length;for(;G--;){const re=$[G],{name:Z,namespaceURI:fe,value:Xe}=re,Gt=Q(Z),aa=Xe;let se=Z==="value"?aa:Wl(aa);if(T.attrName=Gt,T.attrValue=se,T.keepAttr=!0,T.forceKeepAttr=void 0,Ye(V.uponSanitizeAttribute,p,T),se=T.attrValue,Ur&&(Gt==="id"||Gt==="name")&&(bt(Z,p),se=Fm+se),ms&&ue(/((--!?|])>)|<\/(style|title|textarea)/i,se)){bt(Z,p);continue}if(Gt==="attributename"&&Ds(se,"href")){bt(Z,p);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){bt(Z,p);continue}if(!qr&&ue(/\/>/i,se)){bt(Z,p);continue}Ht&&Mn([Je,Pt,ht],il=>{se=Zt(se,il," ")});const sl=Q(p.nodeName);if(!el(sl,Gt,se)){bt(Z,p);continue}if(D&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!fe)switch(v.getAttributeType(sl,Gt)){case"TrustedHTML":{se=D.createHTML(se);break}case"TrustedScriptURL":{se=D.createScriptURL(se);break}}if(se!==aa)try{fe?p.setAttributeNS(fe,Z,se):p.setAttribute(Z,se),ia(p)?Be(p):Ta(t.removed)}catch{bt(Z,p)}}Ye(V.afterSanitizeAttributes,p,null)},Jm=function S(p){let $=null;const T=Yr(p);for(Ye(V.beforeSanitizeShadowDOM,p,null);$=T.nextNode();)Ye(V.uponSanitizeShadowNode,$,null),Qr($),nl($),$.content instanceof a&&S($.content);Ye(V.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(S){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,T=null,G=null,re=null;if(ta=!S,ta&&(S="<!-->"),typeof S!="string"&&!Xr(S))if(typeof S.toString=="function"){if(S=S.toString(),typeof S!="string")throw Yt("dirty is not a string, aborting")}else throw Yt("toString is not a function");if(!t.isSupported)return S;if(Zi||sa(p),t.removed=[],typeof S=="string"&&(Tn=!1),Tn){if(S.nodeName){const Xe=Q(S.nodeName);if(!te[Xe]||In[Xe])throw Yt("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof r)$=Zr("<!---->"),T=$.ownerDocument.importNode(S,!0),T.nodeType===Qt.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?$=T:$.appendChild(T);else{if(!Ot&&!Ht&&!vt&&S.indexOf("<")===-1)return D&&fs?D.createHTML(S):S;if($=Zr(S),!$)return Ot?null:fs?U:""}$&&Yi&&Be($.firstChild);const Z=Yr(Tn?S:$);for(;G=Z.nextNode();)Qr(G),nl(G),G.content instanceof a&&Jm(G.content);if(Tn)return S;if(Ot){if(gs)for(re=Te.call($.ownerDocument);$.firstChild;)re.appendChild($.firstChild);else re=$;return(ne.shadowroot||ne.shadowrootmode)&&(re=oe.call(s,re,!0)),re}let fe=vt?$.outerHTML:$.innerHTML;return vt&&te["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&ue(Aa,$.ownerDocument.doctype.name)&&(fe="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+fe),Ht&&Mn([Je,Pt,ht],Xe=>{fe=Zt(fe,Xe," ")}),D&&fs?D.createHTML(fe):fe},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};sa(S),Zi=!0},t.clearConfig=function(){Ut=null,Zi=!1},t.isValidAttribute=function(S,p,$){Ut||sa({});const T=Q(S),G=Q(p);return el(T,G,$)},t.addHook=function(S,p){typeof p=="function"&&Jt(V[S],p)},t.removeHook=function(S,p){if(p!==void 0){const $=Gl(V[S],p);return $===-1?void 0:zl(V[S],$,1)[0]}return Ta(V[S])},t.removeHooks=function(S){V[S]=[]},t.removeAllHooks=function(){V=Da()},t}var ja=Ma();const lc="/api";class cc{constructor(){try{this.token=localStorage.getItem("chaotic_token")}catch(t){console.warn("Failed to access localStorage:",t),this.token=null}}setToken(t){this.token=t;try{t?localStorage.setItem("chaotic_token",t):localStorage.removeItem("chaotic_token")}catch(n){console.warn("Failed to persist token to localStorage:",n)}}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${lc}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){const c=typeof r.detail=="string"?r.detail:"An error occurred";throw new Error(c)}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const E=new cc;window.api=E;let yt=null;function M(){document.getElementById("modal-overlay").classList.remove("hidden")}function H(){document.getElementById("modal-overlay").classList.add("hidden")}function Ns(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function f(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.remove()},3e3)}function en(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),yt&&(document.removeEventListener("keydown",yt),yt=null)}function dc(e){yt&&document.removeEventListener("keydown",yt),yt=e,e&&document.addEventListener("keydown",e)}function Pn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(en(),document.removeEventListener("click",s))};return setTimeout(()=>document.addEventListener("click",s),0),()=>document.removeEventListener("click",s)}Object.assign(window,{showModal:M,closeModal:H,showToast:f,closeAllDropdowns:en,registerDropdownClickOutside:Pn});function Re(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Se(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Hs(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ge(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function g(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function _(e){return g(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function wt(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function I(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}let kt=null,tn=null,nn=null,sn=null;function Nn(){kt||(kt=document.getElementById("auth-screen"),tn=document.getElementById("main-screen"),nn=document.getElementById("login-form"),sn=document.getElementById("signup-form"))}function Hn(){Nn(),kt&&kt.classList.remove("hidden"),tn&&tn.classList.add("hidden")}function Ra(){Nn(),kt&&kt.classList.add("hidden"),tn&&tn.classList.remove("hidden")}function Pa(){Nn(),nn&&nn.classList.remove("hidden"),sn&&sn.classList.add("hidden")}function Na(){Nn(),nn&&nn.classList.add("hidden"),sn&&sn.classList.remove("hidden")}async function Ha(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await E.login(t,n),window.currentUser=await E.getMe(),window.initApp&&await window.initApp(),f("Welcome back!","success")}catch(s){f(`Login failed: ${s.message}`,"error")}return!1}async function Oa(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await E.signup(t,n,s),await E.login(n,s),window.currentUser=await E.getMe(),window.initApp&&await window.initApp(),f("Account created successfully!","success")}catch(i){f(`Signup failed: ${i.message}`,"error")}return!1}function Os(){E.logout(),window.currentUser=null,window.currentTeam=null,Hn(),f("Signed out","success")}function qa(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Fa(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?qa(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${_(s)}" alt="${_(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}Object.assign(window,{showAuthScreen:Hn,showMainScreen:Ra,showLogin:Pa,showSignup:Na,handleLogin:Ha,handleSignup:Oa,logout:Os,updateUserInfo:Fa,isImageAvatar:qa});function Ua(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let $t=[],On=[],z=new Set,Et="list",ct=!1,qs=null;try{const e=localStorage.getItem("chaotic_doc_view_mode");(e==="list"||e==="grid")&&(Et=e)}catch{}function uc(e){if(e!=="list"&&e!=="grid")return;Et=e,e==="grid"&&ct&&qn();try{localStorage.setItem("chaotic_doc_view_mode",e)}catch{}const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),Pe()}function Ga(){if(Et!=="list")return;ct=!0,z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=qn),Pe(),Tt()}function qn(){ct=!1,z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=Ga),Pe(),Tt()}function pc(){qs&&clearTimeout(qs),qs=setTimeout(()=>{Pe()},300)}function mc(){const e=document.getElementById("doc-search");e&&(e.value=""),Pe()}function gc(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),Pe()}function fc(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),Pe()}function hc(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${g(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),c=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${g(c)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Pe(){var s,i,a,o;const e=((i=(s=document.getElementById("doc-search"))==null?void 0:s.value)==null?void 0:i.toLowerCase())||"",t=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",n=((o=document.getElementById("doc-sort"))==null?void 0:o.value)||"updated_desc";hc(),On=$t.filter(r=>{var c,l;if(e){const d=(c=r.title)==null?void 0:c.toLowerCase().includes(e),u=(l=r.content)==null?void 0:l.toLowerCase().includes(e);if(!d&&!u)return!1}return!(t&&r.project_id!==t)}),On.sort((r,c)=>{switch(n){case"title_asc":return(r.title||"").localeCompare(c.title||"");case"title_desc":return(c.title||"").localeCompare(r.title||"");case"updated_asc":return new Date(r.updated_at)-new Date(c.updated_at);case"updated_desc":default:return new Date(c.updated_at)-new Date(r.updated_at)}}),za("",Et)}async function It(e,t=null){var n;if(e||(e=(n=window.currentTeam)==null?void 0:n.id),!!e){if(t===null){const s=document.getElementById("doc-project-filter");s!=null&&s.value&&(t=s.value)}try{$t=await E.getDocuments(e,t);const s=document.getElementById("doc-view-list"),i=document.getElementById("doc-view-grid");s&&i&&(s.classList.toggle("active",Et==="list"),i.classList.toggle("active",Et==="grid")),Pe()}catch(s){f(s.message,"error")}}}function vc(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${ge(t.color)}; color: white;">${g(t.name)}</span>`).join(" ")}function bc(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${vc(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${_(e.id)}" onclick="viewDocument('${I(e.id)}')">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${g(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${g(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?g(Ua(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${g(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function yc(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${ge(r.color)}; color: white;">${g(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Ua(e.content).substring(0,80):"No content",i=ct?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${I(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${z.has(e.id)?"checked":""}>
       </div>`:"",a=ct&&z.has(e.id)?" selected":"",o=ct?`toggleDocSelection('${I(e.id)}')`:`viewDocument('${I(e.id)}')`;return`
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
  `}function za(e="",t="list"){var l,d;const n=document.getElementById("documents-list");if(!n)return;z.clear(),Tt();const s=On.length>0||(l=document.getElementById("doc-search"))!=null&&l.value?On:$t;if(s.length===0){const u=(d=document.getElementById("doc-search"))==null?void 0:d.value;n.innerHTML=`
      <div class="empty-state">
        <h3>${u?"No documents match your search":"No documents yet"}</h3>
        <p>${u?"Try a different search term":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?bc:yc,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=window.getProjects?window.getProjects():[];s.forEach(u=>{let m,v;if(e==="project")if(m=u.project_id||"__global__",m==="__global__")v="Global (Team-wide)";else{const y=r.find(b=>b.id===u.project_id);v=y?y.name:"Unknown Project"}else e==="sprint"&&(m=u.sprint_id||"__no_sprint__",v=u.sprint_id?"Sprint":"No Sprint");o[m]||(o[m]={label:v,docs:[]}),o[m].docs.push(u)});let c="";for(const[u,m]of Object.entries(o)){const v=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${g(m.label)}</span>
          <span class="doc-group-count">${m.docs.length}</span>
        </div>
        <div class="${v}">
          ${m.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function wc(e){z.has(e)?z.delete(e):z.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=z.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",z.has(e)),Tt()}function kc(){$t.forEach(e=>z.add(e.id)),$t.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Tt()}function Ka(){z.clear(),$t.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.remove("selected")}),Tt()}function Tt(){const e=document.getElementById("doc-bulk-actions");e&&(ct?(e.classList.remove("hidden"),z.size>0?e.innerHTML=`
        <span class="bulk-count">${z.size} selected</span>
        <button class="btn btn-secondary btn-small" onclick="showBulkMoveModal()">Move to Project</button>
        <button class="btn btn-danger btn-small" onclick="bulkDeleteDocuments()">Delete</button>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="clearDocSelection()">Clear</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function $c(){if(z.size===0){f("No documents selected","error");return}const t=(window.getProjects?window.getProjects():[]).map(n=>`<option value="${n.id}">${g(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${z.size} Document${z.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleBulkMove(event)">
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
  `,M()}async function Ec(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(z);let s=0,i=0;for(const r of n)try{await E.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}H(),Ka(),i===0?f(`Moved ${s} document${s>1?"s":""}!`,"success"):f(`Moved ${s}, failed ${i}`,"warning");const a=(o=window.currentTeam)==null?void 0:o.id;return await It(a),!1}async function Ic(){var a;if(z.size===0){f("No documents selected","error");return}const e=z.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(z);let n=0,s=0;for(const o of t)try{await E.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}qn(),s===0?f(`Deleted ${n} document${n>1?"s":""}!`,"success"):f(`Deleted ${n}, failed ${s}`,"warning");const i=(a=window.currentTeam)==null?void 0:a.id;await It(i)}async function Ie(e,t=!0){try{const n=await E.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(u=>u.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(u=>g(u));let a="";try{const u=await E.getDocumentIssues(n.id);u.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${u.map(v=>`
          <div class="linked-item">
            <span class="linked-item-id">${g(v.identifier)}</span>
            <span class="linked-item-title">${g(v.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${I(n.id)}', '${I(v.id)}')" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${I(n.id)}')">+ Link Issue</button>
          </div>
        `:a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <p class="empty-state-small">No linked issues</p>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${I(n.id)}')">+ Link Issue</button>
          </div>
        `}catch{}let o="";try{const u=await E.getDocumentComments(n.id);o=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${u.length===0?'<div class="comments-empty">No comments yet</div>':u.map(v=>{var y,b;return`
            <div class="comment" data-comment-id="${_(v.id)}">
              <div class="comment-avatar">${((b=(y=v.author_name)==null?void 0:y.charAt(0))==null?void 0:b.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${g(v.author_name||"Unknown")}</span>
                  <span class="comment-date">${wt(v.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(v.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${I(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(u){console.error("Failed to load comments:",u)}let r=null,c=null;if(n.project_id){const m=(window.getProjects?window.getProjects():[]).find(v=>v.id===n.project_id);if(r=m?m.name:null,n.sprint_id)try{const v=await E.getSprint(n.sprint_id);c=v?v.name:null}catch{}}let l="";r?(l=`<span class="badge badge-primary">${g(r)}</span>`,c&&(l+=` <span class="badge badge-info">${g(c)}</span>`)):l='<span class="badge badge-secondary">Global</span>';let d="";n.labels&&n.labels.length>0?d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(m=>`
        <span class="label-badge" style="background-color: ${ge(m.color)}; color: white;">
          ${g(m.name)}
          <button class="btn-remove-label" onclick="removeLabelFromDoc('${I(n.id)}', '${I(m.id)}')" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${I(n.id)}')">+ Add Label</button>
        </div>
      `:d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <p class="empty-state-small">No labels</p>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${I(n.id)}')">+ Add Label</button>
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
          <button class="btn btn-secondary btn-small" onclick="showEditDocumentModal('${I(n.id)}')">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteDocument('${I(n.id)}')">Delete</button>
        </div>
      </div>
      <div class="document-content markdown-body">${n.content?i(n.content):"No content"}</div>
      ${d}
      ${a}
      ${o}
    `}catch(n){f(n.message,"error")}}async function Fs(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await E.getSprints(t);let o=n;if(s&&!n){const c=a.find(l=>l.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${g(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Us(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${g(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,M(),t&&await Fs("doc-sprint",t,null,!0)}async function Tc(e){var a;e.preventDefault();const t=(a=window.currentTeam)==null?void 0:a.id;if(!t)return f("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await E.createDocument(t,i),await It(t),H(),f("Document created!","success")}catch(o){f(o.message,"error")}return!1}async function _c(e){try{const t=await E.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${g(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
          <textarea id="edit-doc-content" style="min-height: 200px">${g(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${_(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,M(),t.project_id&&await Fs("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){f(t.message,"error")}}async function xc(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await E.updateDocument(t,i),H(),await Ie(t),f("Document updated!","success")}catch(a){f(a.message,"error")}return!1}async function Sc(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await E.deleteDocument(e);const n=(t=window.currentTeam)==null?void 0:t.id;await It(n),window.navigateTo&&window.navigateTo("documents"),f("Document deleted!","success")}catch(n){f(n.message,"error")}}function Cc(e,t){Fs(e,t)}async function Lc(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${I(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${I(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,M()}async function Ac(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,a=await E.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" onclick="linkToIssue('${I(t)}', '${I(o.id)}')">
        <span class="link-result-id">${g(o.identifier)}</span>
        <span class="link-result-title">${g(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Bc(e,t){try{await E.linkDocumentToIssue(e,t),H(),f("Issue linked!","success"),await Ie(e,!1)}catch(n){f(n.message,"error")}}async function Dc(e,t){if(confirm("Unlink this issue from the document?"))try{await E.unlinkDocumentFromIssue(e,t),f("Issue unlinked!","success"),await Ie(e,!1)}catch(n){f(n.message,"error")}}async function Mc(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return f("Please enter a comment","error"),!1;try{await E.createDocumentComment(t,s),n.value="",f("Comment added!","success"),await Ie(t,!1)}catch(i){f(i.message,"error")}return!1}async function jc(e){var n;const t=(n=window.currentTeam)==null?void 0:n.id;if(!t){f("No team selected","error");return}try{const s=await E.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,M();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${I(e)}', '${I(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ge(a.color)}; color: white;">${g(a.name)}</span>
        ${a.description?`<span class="text-muted">${g(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,M()}catch(s){f(s.message,"error")}}async function Rc(e,t){try{await E.addLabelToDocument(e,t),H(),f("Label added!","success"),await Ie(e,!1)}catch(n){f(n.message,"error")}}async function Pc(e,t){try{await E.removeLabelFromDocument(e,t),f("Label removed!","success"),await Ie(e,!1)}catch(n){f(n.message,"error")}}Object.assign(window,{loadDocuments:It,filterDocuments:Pe,renderDocuments:za,viewDocument:Ie,showCreateDocumentModal:Us,handleCreateDocument:Tc,showEditDocumentModal:_c,handleUpdateDocument:xc,deleteDocument:Sc,updateDocSprintDropdown:Cc,showLinkIssueModal:Lc,searchIssuesToLink:Ac,linkToIssue:Bc,unlinkDocumentFromIssue:Dc,toggleDocSelection:wc,selectAllDocs:kc,clearDocSelection:Ka,showBulkMoveModal:$c,handleBulkMove:Ec,bulkDeleteDocuments:Ic,handleAddDocumentComment:Mc,showAddLabelToDocModal:jc,addLabelToDoc:Rc,removeLabelFromDoc:Pc,setDocViewMode:uc,enterSelectionMode:Ga,exitSelectionMode:qn,debounceDocSearch:pc,clearDocSearch:mc,clearDocProjectFilter:gc,clearAllDocFilters:fc});let an=[];function Nc(){return an}function Hc(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Wa(e){const t=e==null?void 0:e.avatar_url,n=_((e==null?void 0:e.name)||"Agent");return t?Hc(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${_(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${g(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Oc(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{an=await E.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function Gs(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{an=await E.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Va()}catch(n){f(n.message,"error")}}function Va(){const e=document.getElementById("agents-list");if(e){if(an.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=an.map(t=>{const n=g(t.name),s=g(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Wa(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Hs(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${I(t.id)}', '${I(t.name||"Agent")}')">Delete</button>
      </div>
    `}).join("")}}function Ja(){const e=window.projects||[];document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),M()}async function qc(e){var o,r,c;e.preventDefault();const t=(o=window.currentTeam)==null?void 0:o.id;if(!t)return f("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;i&&a?l=await E.createProjectAgent(a,n,s):l=await E.createTeamAgent(t,n,s),H();const d=g(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,M()}catch(l){f(`Failed to create agent: ${l.message}`,"error")}return!1}function Fc(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{f("Agent API key copied to clipboard","success")}).catch(()=>{f("Failed to copy","error")})}async function Uc(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await E.deleteAgent(e),f("Agent deleted","success"),Gs()}catch(n){f(`Failed to delete agent: ${n.message}`,"error")}}Object.assign(window,{loadTeamAgentsQuiet:Oc,loadAgents:Gs,renderAgents:Va,showCreateAgentModal:Ja,handleCreateAgent:qc,copyAgentKey:Fc,deleteAgent:Uc,renderAgentAvatar:Wa});let Fn=[],on=[],zs=[],Ks=[];function Za(){return Fn}function _t(){return on}function Gc(e){on=e}async function Un(){try{Fn=await E.getMyTeams(),Ya()}catch(e){f(e.message,"error")}}function Ya(){const e=document.getElementById("team-list");Fn.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Fn.map(t=>`
            <button class="dropdown-item" data-team-json="${_(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${g(t.name)}</button>
        `).join("")}async function Ws(e,t=!1){window.currentTeam=e,document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),Qa(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function Vs(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Xa(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Qa(){if(window.currentTeam)try{on=await E.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function Js(){if(window.currentTeam)try{on=await E.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),eo()}catch(e){f(e.message,"error")}}function eo(){const e=document.getElementById("team-members-list");e.innerHTML=on.map(t=>`
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
                    <button class="btn btn-danger btn-small" onclick="removeMember('${I(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function Gn(){if(window.currentTeam)try{zs=await E.getTeamInvitations(window.currentTeam.id),to()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function to(){const e=document.getElementById("team-invitations-list");if(zs.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=zs.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${g(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${g(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${I(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function no(){if(window.currentTeam)try{Ks=await E.getTeamAgents(window.currentTeam.id),so()}catch(e){f(e.message,"error")}}function so(){const e=document.getElementById("team-agents-list");if(e){if(Ks.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=Ks.map(t=>{const n=g(t.name),s=g(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Zs(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,M()}async function zc(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await E.createInvitation(window.currentTeam.id,t,n),await Gn(),H(),f("Invitation sent!","success")}catch(s){f(`Failed to send invitation: ${s.message}`,"error")}return!1}async function Kc(e){if(confirm("Are you sure you want to remove this member?"))try{await E.removeMember(window.currentTeam.id,e),await Js(),f("Member removed!","success")}catch(t){f(`Failed to remove member: ${t.message}`,"error")}}async function Wc(e){try{await E.deleteInvitation(window.currentTeam.id,e),await Gn(),f("Invitation canceled!","success")}catch(t){f(`Failed to cancel invitation: ${t.message}`,"error")}}function Ys(){Vs(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,M()}function io(){window.currentTeam&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
    `,M())}async function Vc(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await E.createTeam(t);await Un(),await Ws(n),H(),f("Team created!","success")}catch(n){f(`Failed to create team: ${n.message}`,"error")}return!1}async function Jc(e){if(e.preventDefault(),!window.currentTeam)return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await E.updateTeam(window.currentTeam.id,t);window.currentTeam=n,document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await Un(),H(),f("Team updated!","success")}catch(n){f(`Failed to update team: ${n.message}`,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:Un,renderTeamList:Ya,selectTeam:Ws,toggleTeamDropdown:Vs,toggleUserDropdown:Xa,loadTeamMembersQuiet:Qa,loadTeamMembers:Js,renderTeamMembers:eo,loadTeamInvitations:Gn,renderTeamInvitations:to,loadTeamAgents:no,renderTeamAgents:so,showInviteModal:Zs,handleInvite:zc,removeMember:Kc,deleteInvitation:Wc,showCreateTeamModal:Ys,showEditTeamModal:io,handleCreateTeam:Vc,handleUpdateTeam:Jc,getTeams:Za,getMembers:_t,setMembers:Gc});let K=[];const rn={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Y(){return K}function Zc(e){K=e}function zn(e){const t=K.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return rn[n]||rn.fibonacci}function ln(e,t){if(!e)return"No estimate";const s=zn(t).find(i=>i.value===e);return s?s.label:`${e} points`}function ao(e){const t=K.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(rn[n]||rn.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function he(){if(window.currentTeam)try{K=await E.getProjects(window.currentTeam.id),oo()}catch(e){f(e.message,"error")}}function oo(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=e==null?void 0:e.value,a=t==null?void 0:t.value,o=n==null?void 0:n.value,r=s==null?void 0:s.value,c='<option value="">All Projects</option>'+K.map(u=>`<option value="${u.id}">${g(u.name)}</option>`).join(""),l='<option value="">Select Project</option>'+K.map(u=>`<option value="${u.id}">${g(u.name)}</option>`).join(""),d=cn();if(e){e.innerHTML=c;let u=i;if(!u||!K.some(m=>m.id===u))if(d&&K.some(m=>m.id===d))u=d;else{const v=new URLSearchParams(window.location.search).get("project");v&&K.some(y=>y.id===v)?u=v:K.length>0&&(u=K[0].id)}u&&(e.value=u,localStorage.setItem("chaotic_last_project",u))}if(t){t.innerHTML=l;const u=a||d;u&&K.some(m=>m.id===u)&&(t.value=u)}if(n){n.innerHTML=l;const u=o||d;u&&K.some(m=>m.id===u)&&(n.value=u)}s&&(s.innerHTML=c,r&&K.some(u=>u.id===r)&&(s.value=r))}function cn(){return localStorage.getItem("chaotic_last_project")}function dt(e){if(!e)return;localStorage.setItem("chaotic_last_project",e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function dn(){const e=document.getElementById("projects-list");if(K.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=K.map(t=>`
        <div class="grid-item" onclick="viewProject('${I(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ge(t.color)}20; color: ${ge(t.color)}">
                    ${g(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${g(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${I(t.id)}')" title="Project settings">
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
    `).join("")}function Yc(e){dt(e),window.navigateTo&&window.navigateTo("issues")}function Xs(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,M()}async function Xc(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await E.createProject(window.currentTeam.id,t),await he(),dn(),H(),f("Project created!","success")}catch(n){f(`Failed to create project: ${n.message}`,"error")}return!1}function Qc(e){const t=K.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
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
                <button type="button" class="btn btn-danger-outline" onclick="confirmDeleteProject('${I(t.id)}')">Delete Project</button>
            </div>
        </form>
    `,M()}async function ed(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await E.updateProject(t,n),await he(),dn(),H(),f("Project updated!","success")}catch(s){f(`Failed to update project: ${s.message}`,"error")}return!1}async function td(e){const t=K.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await E.deleteProject(e),await he(),dn(),H(),f("Project deleted","success")}catch(n){f(`Failed to delete project: ${n.message}`,"error")}}let me=null;async function ro(e){me=e,K.length===0&&await he();const t=K.find(n=>n.id===e);if(!t){f("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),lo("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function lo(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Ne||Ne.length===0)&&xt()}function co(){me=null,Ne=[]}function uo(e){me=e}function po(){return Ne}async function nd(){if(!me)return;const e=document.getElementById("ps-name").value.trim();if(!e){f("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await E.updateProject(me,t),await he(),f("Settings saved","success");const n=K.find(s=>s.id===me);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){f(n.message,"error")}}async function sd(){if(!me)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await E.updateProject(me,n),await he(),f("Settings saved","success")}catch(s){f(`Failed to save settings: ${s.message}`,"error")}}let Ne=[];async function xt(){if(me)try{Ne=await E.getRituals(me),id(),typeof window._onRitualsChanged=="function"&&window._onRitualsChanged()}catch(e){f(e.message,"error")}}function id(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Ne.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=Ne.filter(s=>s.trigger==="ticket_close"),n=Ne.filter(s=>s.trigger==="ticket_claim");St("ps-sprint-rituals-list",e,"sprint"),St("ps-close-rituals-list",t,"close"),St("ps-claim-rituals-list",n,"claim")}function St(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>_(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${g(a.group_name)}${r}</span>`}return`
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
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${I(a.id)}')">Edit</button>
        <button class="btn btn-danger btn-small" data-ritual-id="${_(a.id)}" data-ritual-name="${_(a.name)}" onclick="deleteProjectRitual(this.dataset.ritualId, this.dataset.ritualName)">Delete</button>
      </div>
    </div>
  `}).join("")}async function ad(e){if(!me)return;let t=[];try{t=await E.getRitualGroups(me)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
  `,M()}function od(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function mo(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw f("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await E.createRitualGroup(me,{name:t,selection_mode:n})).id}return e.value||null}async function rd(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}let n;try{n=await mo()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await E.createRitual(me,s),await xt(),H(),f("Ritual created!","success")}catch(i){f(`Failed to create ritual: ${i.message}`,"error")}return!1}async function ld(e){const t=Ne.find(o=>o.id===e);if(!t)return;let n=[];try{n=await E.getRitualGroups(me)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${I(e)}')">
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
  `,M()}async function cd(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}let s;try{s=await mo()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await E.updateRitual(t,i),await xt(),H(),f("Ritual updated!","success")}catch(a){f(`Failed to update ritual: ${a.message}`,"error")}return!1}async function dd(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await E.deleteRitual(e),await xt(),f("Ritual deleted","success")}catch(n){f(`Failed to delete ritual: ${n.message}`,"error")}}Object.assign(window,{loadProjects:he,updateProjectFilters:oo,getSavedProjectId:cn,setGlobalProjectSelection:dt,renderProjects:dn,viewProject:Yc,showCreateProjectModal:Xs,handleCreateProject:Xc,viewProjectSettings:ro,switchProjectSettingsTab:lo,saveProjectSettingsGeneral:nd,saveProjectSettingsRules:sd,clearProjectSettingsState:co,showEditProjectModal:Qc,handleUpdateProject:ed,confirmDeleteProject:td,getEstimateOptions:zn,formatEstimate:ln,getEstimateScaleHint:ao,getProjects:Y,setProjects:Zc,ESTIMATE_SCALES:rn,showCreateProjectRitualModal:ad,handleCreateProjectRitual:rd,showEditProjectRitualModal:ld,handleUpdateProjectRitual:cd,deleteProjectRitual:dd,setCurrentSettingsProjectId:uo,getProjectRituals:po,loadProjectSettingsRituals:xt,onRitualGroupChange:od});const Kn={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Wn={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let go=0;function ud(e){go=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=fo(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function fo(e="",t="",n=""){const s=go++,i=Object.keys(Kn).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?Kn[e]:Kn.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${Wn[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
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
    `}function pd(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",fo()),Vn()}function md(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Vn()}function gd(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Kn[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Wn[o]}</option>`).join(""),ho(e),Vn()}function ho(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function un(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Vn(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function fd(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw un("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw un("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${c}`;if(n.has(u))throw un(`Duplicate condition: ${r} ${Wn[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),c==="isnull")t[u]=!0;else if(c==="in"||c==="contains")t[u]=d?d.split(",").map(m=>m.trim()).filter(m=>m):[];else if(c==="gte"||c==="lte"){if(!d)throw un(`Please enter a numeric value for ${r} ${Wn[c]}.`),new Error(`Missing numeric value for ${u}`);const m=parseInt(d,10);if(isNaN(m))throw un(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=m}else t[u]=d}return Vn(),Object.keys(t).length>0?t:null}Object.assign(window,{renderConditionBuilder:ud,addConditionRow:pd,removeConditionRow:md,updateOperatorOptions:gd,toggleValueInput:ho,collectConditions:fd});function hd(e){if(!e)return"";try{R.setOptions({breaks:!0,gfm:!0});const t=R.parse(e);return ja.sanitize(t,{FORCE_BODY:!0})}catch{return g(e)}}function vo(e){if(!e)return"";const t=new Date(e),s=new Date-t,i=Math.floor(s/6e4),a=Math.floor(i/60),o=Math.floor(a/24);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function vd(e,t,n,s,i,a,o,r){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${g(i)}</span>
                    <span class="gate-approval-issue-title">${g(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${I(t)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${g(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${g(o)}</strong>${r?` ${vo(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{bd(c,e,t,n)}),M()}async function bd(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await E.completeTicketGateRitual(t,n,i||null),f(`GATE ritual "${s}" approved!`,"success"),H(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(a){f(`Failed to complete gate ritual: ${a.message}`,"error")}}function bo(e,t,n,s,i,a,o,r){vd(e,t,n,s,i,a,o,r)}function yd(e,t,n,s,i,a,o,r,c){document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${g(i)}</span>
                    <span class="gate-approval-issue-title">${g(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${I(t)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${g(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${g(o)}</strong>${r?` ${vo(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${hd(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{wd(l,e,t,n)}),M()}async function wd(e,t,n,s){e.preventDefault();try{await E.approveTicketRitual(t,n),f(`Review ritual "${s}" approved!`,"success"),H(),typeof window.loadGateApprovals=="function"&&window.loadGateApprovals()}catch(i){f(`Failed to approve review ritual: ${i.message}`,"error")}}function yo(e,t,n,s,i,a,o,r,c){yd(e,t,n,s,i,a,o,r,c)}window.completeGateFromList=bo,window.approveReviewFromList=yo;let Qs=[];async function ei(){try{Qs=await E.getApiKeys(),kd()}catch(e){f(e.message,"error")}}function kd(){const e=document.getElementById("api-keys-list");if(e){if(Qs.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=Qs.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${g(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${g(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Hs(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Hs(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${I(t.id)}', '${I(t.name)}')">Revoke</button>
            `:""}
        </div>
    `).join("")}}function wo(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateApiKey(event)">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,M()}async function $d(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await E.createApiKey(t);H(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,M()}catch(n){f(n.message,"error")}return!1}async function ko(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),f("API key copied to clipboard","success")}catch{f("Failed to copy","error")}}async function $o(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await E.revokeApiKey(e),f("API key revoked","success"),await ei()}catch(n){f(n.message,"error")}}window.loadApiKeys=ei,window.showCreateApiKeyModal=wo,window.handleCreateApiKey=$d,window.copyApiKey=ko,window.revokeApiKey=$o;let Jn=!1,He=0,Qe=[],Zn=[];function Ed(e){Zn=e,Qe=[...e]}function Eo(){return Jn}function Id(){if(Jn)return;Jn=!0,He=0,Qe=[...Zn];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Yn()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Td(n.target.value)),t.addEventListener("keydown",xd),pn(),requestAnimationFrame(()=>t.focus())}function Yn(){Jn=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Td(e){const t=e.toLowerCase().trim();t?Qe=Zn.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Qe=[...Zn],He=0,pn()}function pn(){const e=document.getElementById("command-results");if(!e)return;if(Qe.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Qe.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===He?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function _d(e){He=e,pn()}function Io(e){const t=Qe[e];t&&(Yn(),t.action())}function xd(e){switch(e.key){case"ArrowDown":e.preventDefault(),He=Math.min(He+1,Qe.length-1),pn();break;case"ArrowUp":e.preventDefault(),He=Math.max(He-1,0),pn();break;case"Enter":e.preventDefault(),Io(He);break;case"Escape":e.preventDefault(),Yn();break}}window.selectCommand=_d,window.executeCommand=Io;let mn=[],ti=[],Oe={getCurrentUser:()=>null,getCurrentTeam:()=>null,renderIssueRow:()=>"",formatActivityText:()=>"",formatActivityActor:()=>"",getActivityIcon:()=>"📝",navigateToIssueByIdentifier:()=>{},viewDocument:()=>{}};function Sd(e){Oe={...Oe,...e}}function Xn(){return mn}function gn(e){mn=e}async function ni(){var s;const e=Oe.getCurrentTeam(),t=Oe.getCurrentUser();if(!e||!t)return;const n=(s=document.getElementById("my-issues-status-filter"))==null?void 0:s.value;Ld();try{mn=await E.getTeamIssues(e.id,{assignee_id:t.id,status:n||void 0,limit:1e3}),fn()}catch(i){f(i.message,"error")}}async function Ct(){const e=Oe.getCurrentTeam();if(!e)return;const t=document.getElementById("dashboard-activity-list");t&&(t.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{ti=await E.getTeamActivities(e.id,0,10),Cd()}catch{t&&(t.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function Cd(){const e=document.getElementById("dashboard-activity-list");if(e){if(!ti.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=ti.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${I(t.issue_identifier)}'); return false;"><strong>${g(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${I(t.document_id)}'); return false;"><strong>${s} ${g(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${g(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Oe.getActivityIcon(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Oe.formatActivityText(t)}${n}</span>
                <span class="activity-actor">by ${g(Oe.formatActivityActor(t))}</span>
                <span class="activity-time">${wt(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Ld(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function To(){ni()}function fn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),mn.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=mn.map(t=>Oe.renderIssueRow(t)).join("")}}window.filterMyIssues=To;let Ce=null,qe=0,Lt=null,At=null,hn=null,si=!1;function _o(){try{return localStorage.getItem("chaotic_onboarding_complete")==="true"}catch{return!1}}function xo(){try{localStorage.setItem("chaotic_onboarding_complete","true")}catch{}}function So(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Ad(){Ce||(Ce=document.createElement("div"),Ce.id="onboarding-overlay",Ce.className="onboarding-overlay",document.getElementById("app").appendChild(Ce))}function vn(){if(!Ce)return;const e=si?Lo():Co(),t=e[qe],n=e.map((s,i)=>`<span class="onboarding-dot${i===qe?" active":""}${i<qe?" completed":""}"></span>`).join("");Ce.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Co(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=So(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=So(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Lt&&(e.textContent=`${Lt.name} (${Lt.key})`),t&&At&&(t.textContent=`${At.name} (${At.key})`),n&&hn&&(n.textContent=`${hn.identifier} - ${hn.title}`)}}]}function Lo(){const e='<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';return[{html:`
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
            `}]}function ii(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ai(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Bt(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=si?Lo():Co();qe<e.length-1&&(qe++,vn())},window._onboardingSkip=function(){xo(),ri(),window.initApp&&window.initApp()},window._onboardingFinish=function(){xo(),ri(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),ai("onboarding-team-error"),Bt("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Lt=await api.createTeam({name:t,key:n}),qe++,vn()}catch(s){ii("onboarding-team-error",s.message||"Failed to create team"),Bt("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),ai("onboarding-project-error"),Bt("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{At=await api.createProject(Lt.id,{name:t,key:n}),qe++,vn()}catch(s){ii("onboarding-project-error",s.message||"Failed to create project"),Bt("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),ai("onboarding-issue-error"),Bt("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{hn=await api.createIssue(At.id,{title:t}),qe++,vn()}catch(n){ii("onboarding-issue-error",n.message||"Failed to create issue"),Bt("onboarding-issue-submit",!1)}};function oi(e=!1){si=e,qe=0,Lt=null,At=null,hn=null,Ad(),vn()}function ri(){Ce&&(Ce.remove(),Ce=null)}function li(){try{localStorage.removeItem("chaotic_onboarding_complete")}catch{}oi(!0)}window.showOnboarding=oi,window.hideOnboarding=ri,window.resetOnboarding=li,window.hasCompletedOnboarding=_o;let we={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null}};const Bd=new Set;function et(e,t){if(typeof e=="string"){const n=we[e];we[e]=t,Ao(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=we[s];we[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Ao(s,i,a)})}}function Ao(e,t,n){t!==n&&Bd.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const ci=()=>we.currentUser,Dd=e=>et("currentUser",e),N=()=>we.currentView,Md=e=>et("currentView",e),Fe=()=>we.issues,Ue=e=>et("issues",e),Bo=()=>we.activeFilterCategory,jd=e=>et("activeFilterCategory",e),Rd=()=>we.selectedIssueIndex,Do=e=>et("selectedIssueIndex",e),Pd=()=>we.pendingGates,Nd=e=>et("pendingGates",e),Hd=()=>we.searchDebounceTimer,Od=e=>et("searchDebounceTimer",e),qd=()=>we.websocket,Mo=e=>et("websocket",e);function ut(){const t=new URLSearchParams(window.location.search).get("project");return t||cn()}function Qn(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let Dt=[],es={},ts=new Set,Ge=null,jo=null,di=[],bn=[],ui=[];function Fd(){return es}function Ud(){return Ge}function Ro(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=ut();t&&Y().some(n=>n.id===t)&&(e.value=t)}e.value?tt(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function Gd(){const e=document.getElementById("sprint-project-filter").value;e&&(dt(e),Qn(e)),tt(e)}async function tt(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){ou();try{await E.getCurrentSprint(t),Dt=await E.getSprints(t),zd(),await ns()}catch(n){f(n.message,"error")}}}function zd(){const e=document.getElementById("sprints-list");if(!e)return;const t=Dt.find(a=>a.status==="active"),n=Dt.find(a=>a.status==="planned"),s=Dt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${I(t.id)}'); } else { window.open('/sprint/${t.id}', '_blank'); }" style="cursor: pointer;">
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
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${I(t.id)}', '${I(t.name)}', ${t.budget||"null"}, '${I(t.project_id)}')">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${I(t.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=Kd(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${I(n.id)}'); } else { window.open('/sprint/${n.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${g(n.name)}</div>
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
    `}function Kd(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((W,Te,ae)=>Math.min(Math.max(W,Te),ae))((new Date-o)/(r-o),0,1),u=360,m=120,v=16,y=v,b=u-v,x=v,C=m-v,j=W=>s===0?C:x+(1-W/s)*(C-x),O=j(s),D=j(0),U=y+(b-y)*d,k=j(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${ss(e.start_date)} → ${ss(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${u} ${m}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${y}" y1="${O}" x2="${b}" y2="${D}" class="burndown-ideal" />
                <line x1="${y}" y1="${O}" x2="${U}" y2="${k}" class="burndown-actual" />
                <circle cx="${U}" cy="${k}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function pi(e,t=!0){var n;try{const s=await E.getSprint(e);if(!s){f("Sprint not found","error"),window.navigateTo("sprints");return}jo=s;const i=(n=window.currentTeam)==null?void 0:n.id,[a,o,r]=await Promise.all([E.getIssues({sprint_id:e,limit:500}),E.getSprintTransactions(e).catch(()=>[]),i?E.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);di=a,ui=o,bn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Vd()}catch(s){console.error("Failed to load sprint:",s),f("Failed to load sprint","error"),window.navigateTo("sprints")}}async function Wd(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){f("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await pi(e,!1)}catch{window.navigateTo("sprints",!1)}}function Vd(){const e=jo,t=di;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(d=>s.includes(d.status)),a=t.filter(d=>d.status==="done"),o=t.reduce((d,u)=>d+(u.estimate||0),0),r=a.reduce((d,u)=>d+(u.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const l=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${ss(e.start_date)} → ${ss(e.end_date)}
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
                        ${i.map(d=>Po(d)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${a.map(d=>Po(d)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Zd()}
            </div>

            ${bn.length>0?`
            <div class="sprint-detail-section">
                <h3>Documents (${bn.length})</h3>
                <div class="sprint-issues-list">
                    ${bn.map(d=>Jd(d)).join("")}
                </div>
            </div>
            `:""}
        </div>
    `}function Po(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${I(e.id)}'); } else { window.open('/issue/${encodeURIComponent(e.identifier)}', '_blank'); }">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${g(e.identifier)}</span>
            <span class="sprint-issue-title">${g(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${lu(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Jd(e){const t=g(e.icon)||"📄";return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewDocument('${I(e.id)}'); } else { window.open('/document/${I(encodeURIComponent(e.id))}', '_blank'); }">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${g(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${wt(e.created_at)}</span>
            </span>
        </div>
    `}function Zd(){const e=ui;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Yd(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Yd(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Xd(e,t,n,s){const i=s?ao(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateBudget(event, '${I(e)}', '${I(s)}')">
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
    `,M()}async function Qd(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await E.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const c=Dt.filter(l=>l.status==="planned"&&l.id!==t);for(const l of c)await E.updateSprint(l.id,{budget:i})}a==="default"&&n&&await E.updateProject(n,{default_sprint_budget:i}),await tt(),H(),f(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){f(`Failed to update budget: ${r.message}`,"error")}return!1}async function eu(e){const t=Dt.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,M();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[c,l]=await Promise.all([E.getIssues({sprint_id:e,limit:500}),E.getRituals(t.project_id)]);s=c.filter(d=>n.includes(d.status)).length,i=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${g(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${I(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function tu(e){try{const t=await E.closeSprint(e);await tt(),t.limbo?su(t):f("Sprint completed!","success")}catch(t){f(`Failed to complete sprint: ${t.message}`,"error")}}async function ns(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{Ge=await E.getLimboStatus(e),nu()}catch(n){console.error("Failed to load limbo status:",n)}}function nu(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Ge||!Ge.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Ge.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function su(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,M(),iu(t)}async function iu(e){try{const t=await E.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${g(s.name)} <span class="ritual-mode">(${g(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(s.prompt):g(s.prompt)}</div>
                    ${gi(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function mi(){var t,n,s;if(!Ge)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Ge.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${g(i.name)}</strong>
                            <span class="badge badge-ritual-${_(i.approval_mode)}">${g(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(i.prompt):g(i.prompt)}</div>
                        ${gi(i.attestation)}
                        ${au(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((s=Ge.completed_rituals)==null?void 0:s.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Ge.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${g(i.name)}</div>
                            ${gi(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,M()}function gi(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${g(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${g(wt(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${window.renderMarkdown?window.renderMarkdown(e.note):g(e.note)}</div>
        </div>
    `}function au(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" onclick="approveRitual('${I(e.id)}', '${I(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${I(e.id)}', '${I(t)}', '${I(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function No(e){for(const t of e)if(!ts.has(t))try{(await E.getSprints(t)).forEach(s=>{es[s.id]=s}),ts.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function ou(){es={},ts=new Set,di=[],ui=[],bn=[]}function ru(e,t){t.forEach(n=>{es[n.id]=n}),ts.add(e)}function ss(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function lu(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}const Ho=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let nt=[],fi=null,X={api:null,showToast:()=>{},getProjects:()=>[],getProjectFromUrl:()=>null,setGlobalProjectSelection:()=>{},updateUrlWithProject:()=>{},escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,formatPriority:e=>e};function cu(e){X={...X,...e}}function hi(){const e=document.getElementById("board-project-filter");if(!e)return;const t=X.getProjects();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${X.escapeHtml(n.name)}</option>`).join(""),!e.value){const n=X.getProjectFromUrl();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)vi(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function du(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(X.setGlobalProjectSelection(e),X.updateUrlWithProject(e)),vi(e)}async function vi(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){hi();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{nt=await X.api.getIssues({project_id:t}),st()}catch(i){X.showToast(`Failed to load board: ${i.message}`,"error")}}function st(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=Ho.map(t=>{const n=nt.filter(s=>s.status===t.key);return`
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
                             onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${X.escapeJsString(s.id)}'); } else { window.open('/issue/${encodeURIComponent(s.identifier)}', '_blank'); }">
                            <div class="kanban-card-title">${X.escapeHtml(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${X.formatPriority(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function uu(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),fi=e.target.dataset.id,e.target.classList.add("dragging")}function pu(e){e.target.classList.remove("dragging"),fi=null}function mu(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function gu(e){e.currentTarget.classList.remove("drag-over")}function fu(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function hu(e){e.currentTarget.classList.remove("drag-over")}async function vu(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=nt.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,Oo(n,t),st(),i!==n)try{await X.api.updateIssue(t,{status:n}),X.showToast("Status updated","success")}catch(a){s.status=i,st(),X.showToast(`Failed to update status: ${a.message}`,"error")}}async function bu(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=fi||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=nt.find(r=>r.id===t);if(!a)return;const o=a.status;if(a.status=i,Oo(i,t,n),st(),o!==i)try{await X.api.updateIssue(t,{status:i}),X.showToast("Status updated","success")}catch(r){a.status=o,st(),X.showToast(`Failed to update status: ${r.message}`,"error")}}function Oo(e,t,n=null){const s=nt.filter(o=>o.status===e&&o.id!==t),i=nt.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];Ho.forEach(o=>{o.key===e?a.push(...s):a.push(...nt.filter(r=>r.status===o.key))}),nt=a}const qo=["backlog","todo","in_progress","in_review","done","canceled"],Fo=["urgent","high","medium","low","no_priority"],Uo=["task","bug","feature","chore","docs","tech_debt","epic"];let A={getIssues:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatEstimate:()=>"",getSprintCache:()=>({}),formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",escapeHtml:e=>e||"",escapeAttr:e=>e||"",escapeJsString:e=>e||"",sanitizeColor:e=>e||"#888",renderAvatar:()=>"",getAssigneeOptionList:()=>[],getGroupByValue:()=>""};function yu(e){A={...A,...e}}function ze(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=A.getIssues();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=A.getGroupByValue();n==="status"?wu(e,t):n==="priority"?ku(e,t):n==="type"?$u(e,t):n==="assignee"?Eu(e,t):n==="sprint"?Iu(e,t):e.innerHTML=t.map(s=>Le(s)).join("")}function wu(e,t){const n={};qo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s="";qo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${We(i)}</span>
                    <span class="group-title">${A.formatStatus(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Le(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function ku(e,t){const n={};Fo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s="";Fo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ke(i)}</span>
                    <span class="group-title">${A.formatPriority(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Le(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function $u(e,t){const n={};Uo.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s="";Uo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${A.formatIssueType(i)}</span></span>
                    <span class="group-title">${A.formatIssueType(i)}</span>
                    <span class="group-count">${a.length}</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Le(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Eu(e,t){const n={},s="__unassigned__";n[s]=[];const i=A.getAssigneeOptionList();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a="";n[s].length>0&&(a+=`
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
                    ${n[s].map(o=>Le(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=A.formatAssigneeName(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" onclick="toggleGroup('${A.escapeJsString(o.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${A.renderAvatar(o,"avatar-small")}</span>
                    <span class="group-title">${A.escapeHtml(c)}${A.escapeHtml(l)}</span>
                    <span class="group-count">${r.length}</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Le(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Iu(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=A.getSprintCache();i.sort((c,l)=>{const d=o[c],u=o[l],m=d?a[d.status]??3:3,v=u?a[u.status]??3:3;return m-v});let r="";i.forEach(c=>{const l=s[c];if(l.length===0)return;const d=o[c],u=d?d.name:c,m=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",v=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${v}">
                <div class="issue-group-header" onclick="toggleGroup('${v}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${A.escapeHtml(u)}${m}</span>
                    <span class="group-count">${l.length}</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(y=>Le(y)).join("")}
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
                    ${s[n].map(c=>Le(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function Tu(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Le(e){const t=e.assignee_id?A.getAssigneeById(e.assignee_id):null,n=t?A.formatAssigneeName(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?A.formatEstimate(e.estimate,e.project_id):"",a=e.sprint_id?A.getSprintCache()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${A.escapeAttr(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${A.escapeAttr(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${A.escapeJsString(e.id)}')" title="Priority: ${A.formatPriority(e.priority)}">
                    ${Ke(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${A.escapeJsString(e.id)}')" title="Status: ${A.formatStatus(e.status)}">
                    ${We(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${A.formatIssueType(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${A.escapeJsString(e.id)}'); }">${A.escapeHtml(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${A.sanitizeColor(r.color)}20; color: ${A.sanitizeColor(r.color)}">${A.escapeHtml(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${A.escapeJsString(e.id)}')" title="Sprint: ${o?A.escapeHtml(o):"None"}">
                    ${o?`<span class="sprint-badge">${A.escapeHtml(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'estimate', '${A.escapeJsString(e.id)}')" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'assignee', '${A.escapeJsString(e.id)}')" title="${A.escapeAttr(n||"Unassigned")}">
                    ${n?A.renderAvatar(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Ke(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function We(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}function _u(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Go)},0))}function Go(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Go))}function pt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function mt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function gt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function bi(){const e=pt(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Re(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Ve(),ve(),be()}function yi(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),bi()}function wi(){const e=mt(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Se(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Ve(),ve(),be()}function ki(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),wi()}function $i(){var s,i;const e=gt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Ve(),ve(),be()}function Ei(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),$i()}function zo(){var s,i;const e=gt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function xu(){const e=document.getElementById("label-filter-dropdown");if(!e||!window.currentTeam)return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(window.currentTeam.id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${ge(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${g(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Ko(){var u,m,v,y,b;const e=new URLSearchParams,t=pt(),n=mt(),s=gt(),i=(u=document.getElementById("assignee-filter"))==null?void 0:u.value,a=(m=document.getElementById("project-filter"))==null?void 0:m.value,o=(v=document.getElementById("sprint-filter"))==null?void 0:v.value,r=(y=document.getElementById("issue-type-filter"))==null?void 0:y.value,c=(b=document.getElementById("group-by-select"))==null?void 0:b.value;t.forEach(x=>e.append("status",x)),n.forEach(x=>e.append("priority",x)),s.forEach(x=>e.append("label",x)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),c&&e.set("groupBy",c);const l=e.toString(),d=l?`/issues?${l}`:"/issues";history.replaceState({view:"issues"},"",d)}function Su(){const e=new URLSearchParams(window.location.search),t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=t.includes(u.value)}),Cu())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=n.includes(u.value)}),Lu())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const o=e.get("issue_type");if(o){const l=document.getElementById("issue-type-filter");l&&(l.value=o)}const r=e.getAll("label");if(r.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=r.includes(u.value)}),zo())}const c=e.get("groupBy");if(c){const l=document.getElementById("group-by-select");l&&(l.value=c)}}function Cu(){const e=pt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Re(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Lu(){const e=mt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Se(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const Wo=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function Au(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Mt)):(t.classList.remove("hidden"),ke(),$e(Bo()),setTimeout(()=>{document.addEventListener("click",Mt)},0))}function Bu(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Mt)):(t.classList.remove("hidden"),Yu(),setTimeout(()=>{document.addEventListener("click",Mt)},0))}function Mt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Mt))}function Vo(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Mt)}function Jo(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return pt().length;case"priority":return mt().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return gt().length;default:return 0}}function Du(){let e=0;return Wo.forEach(t=>{e+=Jo(t.key)}),e}function ke(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=Wo.map(t=>{const n=Jo(t.key);return`
            <div class="filter-menu-category ${Bo()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function $e(e){jd(e),ke();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":Mu(t);break;case"status":ju(t);break;case"priority":Ru(t);break;case"type":Pu(t);break;case"assignee":Nu(t);break;case"sprint":Hu(t);break;case"labels":Ou(t);break}}function Mu(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=Y()||[];let i=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ge(a.color)};"></span>
                <span class="filter-option-label">${g(a.name)}</span>
            </label>
        `}),e.innerHTML=i}function ju(e){const t=pt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function Ru(e){const t=mt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function Pu(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setTypeFilter('${a.value}')">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Nu(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=_t()||[];let i=`
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
                <span class="filter-option-label">${g(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Hu(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${I(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${_(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${g(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function Ou(e){const t=gt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${_(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${I(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ge(d)};"></span>
                    <span class="filter-option-label">${g(l)}</span>
                </label>
            `}),e.innerHTML=i}function Zo(e){const t=document.getElementById("project-filter");t&&(t.value=e,tr()),ke(),$e("project"),ve(),be()}function qu(){Zo("")}function Fu(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,bi()),ke(),$e("status")}function Uu(){yi(),ke(),$e("status"),ve(),be()}function Gu(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,wi()),ke(),$e("priority")}function zu(){ki(),ke(),$e("priority"),ve(),be()}function Yo(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ve()),ke(),$e("type"),ve(),be()}function Ku(){Yo("")}function Xo(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ve()),ke(),$e("assignee"),ve(),be()}function Wu(){Xo("")}function Qo(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ve()),ke(),$e("sprint"),ve(),be()}function Vu(){Qo("")}function Ju(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,$i()),ke(),$e("labels")}function Zu(){Ei(),ke(),$e("labels"),ve(),be()}function Yu(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Xu(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,ft()),Vo()}function Qu(e){const t=document.getElementById("group-by-select");t&&(t.value=e,nr()),Vo()}function ve(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const u=(Y()||[]).find(m=>m.id===n.value);t.push({category:"project",label:"Project",value:(u==null?void 0:u.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=pt();if(s.length>0){const d=s.map(u=>Re(u)).join(", ");t.push({category:"status",label:"Status",value:d,clearFn:"clearStatusFilterNew()"})}const i=mt();if(i.length>0){const d=i.map(u=>Se(u)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:a.value,clearFn:"clearTypeFilter()"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;if(o.value==="me")d="Me";else if(o.value==="unassigned")d="Unassigned";else{const m=(_t()||[]).find(v=>v.user_id===o.value);d=(m==null?void 0:m.name)||(m==null?void 0:m.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:d,clearFn:"clearAssigneeFilter()"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const d=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||r.value,clearFn:"clearSprintFilter()"})}const c=gt();if(c.length>0){const d=document.getElementById("label-filter-dropdown"),u=c.map(m=>{var b;const v=d==null?void 0:d.querySelector(`input[value="${m}"]`),y=(b=v==null?void 0:v.closest("label"))==null?void 0:b.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:u,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(d=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${g(d.value)}</span>
            <button class="filter-chip-remove" onclick="${d.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=l}function ep(){const e=document.getElementById("project-filter");e&&(e.value=""),yi(),ki();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),Ei(),Ve(),ve(),be()}function be(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Du();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function tp(){ve(),be();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function er(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||Ii(null),t)try{const a=await api.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${g(o.name)})</option>`),Ii(o||null),a.forEach(r=>{const c=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${g(r.name)}${c}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function Ii(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${g(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${g(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function ft(){var u,m,v,y,b,x,C;if(Do(-1),!window.currentTeam)return;const e=document.getElementById("project-filter").value,t=pt(),n=mt(),s=(u=document.getElementById("assignee-filter"))==null?void 0:u.value,i=(v=(m=document.getElementById("issue-search"))==null?void 0:m.value)==null?void 0:v.trim();if(!e&&Y().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}sp();const a={limit:1e3},o=((y=document.getElementById("sort-by-select"))==null?void 0:y.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(b=ci())==null?void 0:b.id:a.assignee_id=s);const l=(x=document.getElementById("sprint-filter"))==null?void 0:x.value;if(l)if(l==="current"){if(e)try{const O=(await api.getSprints(e)).find(D=>D.status==="active");O&&(a.sprint_id=O.id)}catch(j){console.error("Failed to resolve current sprint:",j)}}else a.sprint_id=l;const d=(C=document.getElementById("issue-type-filter"))==null?void 0:C.value;d&&(a.issue_type=d),i&&i.length>=2&&(a.search=i);try{let j;e?(a.project_id=e,j=await api.getIssues(a)):Y().length>0&&(j=await api.getTeamIssues(window.currentTeam.id,a));const O=gt();O.length>0&&(j=j.filter(U=>!U.labels||U.labels.length===0?!1:U.labels.some(k=>O.includes(k.id)))),Ue(j);const D=[...new Set(j.map(U=>U.project_id))];await No(D),ze()}catch(j){f(j.message,"error")}}function np(){clearTimeout(Hd()),Od(setTimeout(()=>{ft()},300))}function sp(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Ve(){Ko(),ft()}async function tr(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&dt(e),await er(),hi(),Ro(),Ve()}async function nr(){if(Ko(),sr()==="sprint"){const e=Fe(),t=[...new Set(e.map(n=>n.project_id))];await No(t)}ze()}function sr(){const e=document.getElementById("group-by-select");return e?e.value:""}const Ti={};let _i=null,xi=null,Si=null,Ci=null,Li=null,Ai=null,ir=!1;function ip(e){Object.assign(Ti,e)}function ap({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(_i=e),t&&(xi=t),n&&(Si=n),s&&(Ci=s),i&&(Li=i),a&&(Ai=a)}function op(){return Object.keys(Ti)}function F(e,t=!0){if(Md(e),t){let i;const a=ut(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),_i&&_i(),document.querySelectorAll(".view").forEach(i=>i.classList.add("hidden"));const n=document.getElementById(`${e}-view`);n&&n.classList.remove("hidden");const s=Ti[e];s&&s()}function ar(){var s;const t=window.location.pathname.split("/").filter(Boolean);Ci&&Ci();let n="my-issues";if(t.length===0||t[0]==="")F("my-issues",!1);else{if(xi&&xi(t))return;n=t[0],op().includes(n)?F(n,!1):(n="my-issues",F("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function Bi(e){history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Li&&Li(e)}function rp(e){history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Ai&&Ai(e)}function lp(){ir||(ir=!0,window.addEventListener("popstate",e=>{var t;e.state&&Si&&Si(e.state)||((t=e.state)!=null&&t.view?F(e.state.view,!1):ar())}))}async function cp(){const e=document.getElementById("epics-project-filter");if(!e)return;await he(),e.innerHTML='<option value="">All Projects</option>'+Y().map(n=>`<option value="${_(n.id)}">${g(n.name)}</option>`).join("");const t=ut()||cn();t&&Y().some(n=>n.id===t)&&(e.value=t),or()}function dp(){var t;const e=(t=document.getElementById("epics-project-filter"))==null?void 0:t.value;e&&(dt(e),Qn(e)),or()}async function or(){var t,n;const e=document.getElementById("epics-list");if(e){e.innerHTML='<div class="loading">Loading epics...</div>';try{if(!((t=window.currentTeam)!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value;let i;if(s?i=await E.getIssues({project_id:s,issue_type:"epic"}):i=await E.getTeamIssues(window.currentTeam.id,{issue_type:"epic"}),!i||i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Create one from the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await E.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));up(a,e)}catch(s){e.innerHTML=`<div class="empty-state">Failed to load epics: ${g(s.message||String(s))}</div>`}}}function up(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(u=>u.status==="done"||u.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,l=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase()),d=s.estimate!=null?`${s.estimate}pts`:"-";return`
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
    `,t.addEventListener("click",s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&rp(i.dataset.identifier)})}let it=!0,is=null,h={api:null,getCurrentView:()=>"my-issues",showToast:()=>{},showModal:()=>{},closeModal:()=>{},navigateTo:()=>{},getProjects:()=>[],getMembers:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",renderMarkdown:e=>e,renderAvatar:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",showDetailDropdown:()=>{},setupMentionAutocomplete:()=>{},renderTicketRitualActions:()=>""};function pp(e){h={...h,...e}}function Di(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Mi(e){return e.user_name||e.user_email||"Unknown"}function ji(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?h.escapeHtml(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?h.escapeAttr(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" onclick="event.preventDefault(); document.getElementById('comments-section')?.scrollIntoView({behavior: 'smooth'})">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${h.escapeHtml(h.formatStatus(t(e.old_value)))}</strong> to <strong>${h.escapeHtml(h.formatStatus(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${h.escapeHtml(h.formatPriority(t(e.old_value)))}</strong> to <strong>${h.escapeHtml(h.formatPriority(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${h.escapeHtml(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${h.escapeHtml(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=h.escapeHtml(e.field_name||"ritual"),i=e.new_value?h.escapeAttr(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||h.escapeHtml(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||h.escapeHtml(e.field_name)}`:"Updated issue"}}function rr(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function mp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],m=document.createElement("a");m.href=`#/issue/${u}`,m.className="issue-link",m.textContent=u,o.appendChild(m),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function gp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function fp(e){if(!e)return"";const t=h.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,rr(n,mp),n.innerHTML}function Ri(e){if(!e)return"";const t=h.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,rr(n,gp),n.innerHTML}function lr(e,t){const n=e.target;n.tagName==="A"||n.closest("a")||window.editDescription&&window.editDescription(t)}function cr(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function dr(){it=!it;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",it),n&&n.classList.toggle("rotated",it)}async function yn(e){try{is=await h.api.getTicketRitualsStatus(e),hp(e)}catch(t){console.error("Failed to load ticket rituals:",t),is=null}}function hp(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!is){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=is;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(it=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",it);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",it);const r=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">○</span>
                            <span class="ticket-ritual-name">${h.escapeHtml(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?h.renderMarkdown(d.prompt):""}</div>
                        <div class="ticket-ritual-actions">
                            ${h.renderTicketRitualActions(d,e)}
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
                            <span class="ticket-ritual-name">${h.escapeHtml(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${h.escapeHtml(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${h.formatTimeAgo(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function as(e){try{let t;e.includes("-")?t=await h.api.getIssueByIdentifier(e):t=await h.api.getIssue(e),t?await ee(t.id,!1):h.navigateTo("my-issues",!1)}catch{h.navigateTo("my-issues",!1)}}async function ee(e,t=!0){try{it=!0;const[n,s,i,a,o,r]=await Promise.all([h.api.getIssue(e),h.api.getComments(e),h.api.getActivities(e),h.api.getSubIssues(e),h.api.getRelations(e),h.api.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),c=(r.completed_rituals||[]).filter(k=>k.attestation&&k.attestation.note).map(k=>({id:`attestation-${k.attestation.id}`,author_name:k.attestation.attested_by_name||"Unknown",content:k.attestation.note,created_at:k.attestation.attested_at,is_attestation:!0,ritual_name:k.name})),l=[...s,...c].sort((k,W)=>new Date(k.created_at)-new Date(W.created_at)),d=[n.parent_id?h.api.getIssue(n.parent_id):Promise.resolve(null),h.api.getSprints(n.project_id).catch(k=>(console.error("Failed to load sprints:",k),[]))],[u,m]=await Promise.all(d),v=o.filter(k=>k.relation_type==="blocks"&&k.direction==="outgoing"),y=o.filter(k=>k.relation_type==="blocked_by"||k.relation_type==="blocks"&&k.direction==="incoming"),b=o.filter(k=>k.relation_type==="relates_to");t&&history.pushState({issueId:e,view:h.getCurrentView()},"",`/issue/${n.identifier}`),window.currentDetailIssue=n,window.currentDetailSprints=m,document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const x=document.getElementById("issue-detail-view");x.classList.remove("hidden");const C=h.getCurrentView()||"my-issues",j=h.getProjects().find(k=>k.id===n.project_id),O=n.assignee_id?h.getAssigneeById(n.assignee_id):null,D=O?h.formatAssigneeName(O):null,U=n.sprint_id?m.find(k=>k.id===n.sprint_id):null;x.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${C}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${j?h.escapeHtml(j.name):"Project"} › ${h.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${h.escapeHtml(n.title)}</h1>

                    ${u?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(u.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(u.id)}'); }">${u.identifier}: ${h.escapeHtml(u.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body ${n.description?"":"empty"}" onclick="handleDescriptionClick(event, '${h.escapeJsString(n.id)}')">
                            ${n.description?Ri(n.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${v.length===0&&y.length===0&&b.length===0?`
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
                            ${v.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${v.map(k=>`
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
                            ${b.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${b.map(k=>`
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
                                    <div class="activity-icon">${Di(k.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ji(k)}</span>
                                        <span class="activity-actor">by ${h.escapeHtml(Mi(k))}</span>
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
                                <div class="comment ${k.is_attestation?"comment-attestation":""}">
                                    <div class="comment-avatar ${k.is_attestation?"avatar-attestation":""}">${k.is_attestation?"✓":(k.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${h.escapeHtml(k.author_name||"User")}</span>
                                            ${k.is_attestation?`<span class="comment-ritual-badge">Ritual: ${h.escapeHtml(k.ritual_name)}</span>`:""}
                                            <span class="comment-date">${h.formatTimeAgo(k.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${fp(k.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                        <form class="comment-form" onsubmit="return handleAddComment(event, '${h.escapeJsString(n.id)}')">
                            <textarea id="new-comment" placeholder="Write a comment..." rows="3"></textarea>
                            <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                            <button type="submit" class="btn btn-primary">Comment</button>
                        </form>
                    </div>
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" onclick="showDetailDropdown(event, 'status', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${h.getStatusIcon(n.status)}
                                <span>${h.formatStatus(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'priority', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${h.getPriorityIcon(n.priority)}
                                <span>${h.formatPriority(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'type', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${h.formatIssueType(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'assignee', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${D?`${h.renderAvatar(O,"avatar-small")}<span>${h.escapeHtml(D)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'sprint', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${U?h.escapeHtml(U.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'labels', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(k=>`
                                        <span class="issue-label" style="background: ${h.sanitizeColor(k.color)}20; color: ${h.sanitizeColor(k.color)}">${h.escapeHtml(k.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${j?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${h.escapeHtml(j.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" onclick="showDetailDropdown(event, 'estimate', '${h.escapeJsString(n.id)}')">
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
                        <button class="btn btn-secondary btn-block" onclick="showEditIssueModal('${h.escapeJsString(n.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            Edit Issue
                        </button>
                        <button class="btn btn-danger-outline btn-block" onclick="deleteIssue('${h.escapeJsString(n.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            Delete
                        </button>
                    </div>
                </aside>
            </div>
        `,yn(n.id),h.setupMentionAutocomplete()}catch(n){h.showToast(`Failed to load issue: ${n.message}`,"error")}}async function vp(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;try{await h.api.createComment(t,n),await ee(t),h.showToast("Comment added!","success")}catch(s){h.showToast(`Failed to add comment: ${s.message}`,"error")}return!1}async function bp(e){const t=window.currentDetailIssue||await h.api.getIssue(e);document.getElementById("modal-title").textContent="Edit Description",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateDescription(event, '${h.escapeJsString(e)}')">
            <div class="form-group description-editor">
                <div class="editor-tabs">
                    <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                    <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
                </div>
                <textarea id="edit-description" rows="10" placeholder="Add a description...">${h.escapeHtml(t.description||"")}</textarea>
                <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    `,h.showModal();const n=document.getElementById("edit-description");n.addEventListener("input",()=>{const s=document.getElementById("edit-description-preview");s&&s.style.display!=="none"&&ur()}),n.focus()}function ur(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Ri(n):'<span class="text-muted">Nothing to preview.</span>'}function yp(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?ur():s.focus()}async function wp(e,t){e.preventDefault();try{const n=document.getElementById("edit-description");if(!n)throw new Error("Description field not found");const s=n.value;await h.api.updateIssue(t,{description:s}),h.closeModal(),h.showToast("Description updated","success"),ee(t,!1)}catch(n){h.showToast(`Failed to update description: ${n.message}`,"error")}return!1}function kp(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,h.showModal(),document.getElementById("relation-issue-search").focus()}async function $p(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,o=(await h.api.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" onclick="selectIssueForRelation('${h.escapeJsString(r.id)}', '${h.escapeJsString(r.identifier)}', '${h.escapeJsString(r.title)}')">
                <span class="link-result-id">${h.escapeHtml(r.identifier)}</span>
                <span class="link-result-title">${h.escapeHtml(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Ep(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Ip(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Tp(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return h.showToast("Please select an issue","error"),!1;try{n==="blocked_by"?await h.api.createRelation(s,t,"blocks"):await h.api.createRelation(t,s,n),h.closeModal(),h.showToast("Relation added","success"),ee(t)}catch(i){h.showToast(`Failed to add relation: ${i.message}`,"error")}return!1}async function _p(e,t){try{await h.api.deleteRelation(e,t),h.showToast("Relation removed","success"),ee(e)}catch(n){h.showToast(`Failed to remove relation: ${n.message}`,"error")}}let L={api:null,getCurrentView:()=>"epics",showToast:()=>{},navigateTo:()=>{},getProjects:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888"};function xp(e){L={...L,...e}}async function Pi(e){try{let t;if(e.includes("-")?t=await L.api.getIssueByIdentifier(e):t=await L.api.getIssue(e),t){if(t.issue_type!=="epic"){window.viewIssue?window.viewIssue(t.id,!1):L.navigateTo("epics",!1);return}await Ni(t.id,!1)}else L.navigateTo("epics",!1)}catch{L.navigateTo("epics",!1)}}async function Ni(e,t=!0){try{const[n,s,i,a]=await Promise.all([L.api.getIssue(e),L.api.getSubIssues(e),L.api.getActivities(e),L.api.getComments(e)]);if(n.issue_type!=="epic"){window.viewIssue?window.viewIssue(e,t):L.navigateTo("epics",!1);return}t&&history.pushState({epicId:e,view:L.getCurrentView()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(b=>b.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=L.getCurrentView()||"epics",c=L.getProjects().find(b=>b.id===n.project_id),l=n.assignee_id?L.getAssigneeById(n.assignee_id):null,d=l?L.formatAssigneeName(l):null,u=s.length,m=s.filter(b=>b.status==="done"||b.status==="canceled").length,v=u>0?Math.round(m/u*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${r}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${c?L.escapeHtml(c.name):"Project"} › ${L.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${L.escapeHtml(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Ri(n.description)}
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
                            ${s.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:s.map(b=>{const x=b.assignee_id?L.getAssigneeById(b.assignee_id):null,C=x?L.formatAssigneeName(x):null;return`
                                <div class="sub-issue-item" data-issue-id="${L.escapeAttr(b.id)}" data-identifier="${L.escapeAttr(b.identifier)}">
                                    <span class="sub-issue-status">${L.getStatusIcon(b.status)}</span>
                                    <span class="sub-issue-id">${L.escapeHtml(b.identifier)}</span>
                                    <span class="sub-issue-title">${L.escapeHtml(b.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(b.status||"backlog").replace(/_/g,"-")}">${L.formatStatus(b.status)}</span>
                                    ${C?`<span class="sub-issue-assignee">${L.escapeHtml(C)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(b=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Di(b.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ji(b)}</span>
                                        <span class="activity-actor">by ${L.escapeHtml(Mi(b))}</span>
                                        <span class="activity-time">${L.formatTimeAgo(b.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(b=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(b.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${L.escapeHtml(b.author_name||"User")}</span>
                                            <span class="comment-date">${L.formatTimeAgo(b.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${L.escapeHtml(b.content||"")}</div>
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
                                ${L.getStatusIcon(n.status)}
                                ${L.formatStatus(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${L.getPriorityIcon(n.priority)}
                                ${L.formatPriority(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${d?L.escapeHtml(d):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${L.formatEstimate(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(b=>`
                                    <span class="issue-label" style="background: ${L.sanitizeColor(b.color)}20; color: ${L.sanitizeColor(b.color)}">${L.escapeHtml(b.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${L.escapeHtml(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const y=o.querySelector(".sub-issues-list");y&&y.addEventListener("click",b=>{const x=b.target.closest(".sub-issue-item");x&&x.dataset.issueId&&window.viewIssue&&window.viewIssue(x.dataset.issueId)})}catch(n){L.showToast(`Failed to load epic: ${n.message}`,"error")}}function Sp(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function Cp(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function pr(e,t,n="#issues-list .list-item"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Lp(e){return function(n){if(e.getCurrentView()!=="issues"||n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll("#issues-list .list-item");if(s.length===0)return;const i=e.getSelectedIndex();switch(n.key){case"j":n.preventDefault(),pr(i+1,e.setSelectedIndex);break;case"k":n.preventDefault(),pr(i-1,e.setSelectedIndex);break;case"Enter":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.viewIssue(a)}break;case"e":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.showEditIssueModal(a)}break}}}async function Ap(){const e=document.getElementById("ritual-project-filter");e&&(await he(),e.innerHTML='<option value="">Select Project</option>'+Y().map(t=>`<option value="${_(t.id)}">${g(t.name)}</option>`).join(""))}async function mr(){const e=document.getElementById("rituals-project-filter");if(!e)return;window._onRitualsChanged=Bp,await he(),e.innerHTML='<option value="">Select a project</option>'+Y().map(n=>`<option value="${_(n.id)}">${g(n.name)}</option>`).join("");const t=ut()||cn();t&&Y().some(n=>n.id===t)?(e.value=t,gr()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function gr(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){document.getElementById("rituals-tabs").classList.add("hidden"),t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}uo(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await xt()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${g(n.message)}</div>`}}function Bp(){const e=document.getElementById("rituals-content"),t=po(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,St("rv-sprint-rituals-list",n,"sprint"),St("rv-close-rituals-list",s,"close"),St("rv-claim-rituals-list",i,"claim")}function Dp(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Mp(e,t){try{await E.approveAttestation(e,t),f("Ritual approved!","success"),await ns(),mi()}catch(n){f(n.message,"error")}}async function jp(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Rp(s,e,t)}),M()}async function Rp(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await E.completeGateRitual(t,n,s||null),f("Ritual completed!","success"),await ns();const i=Ud();i&&!i.in_limbo?(H(),f("Limbo cleared! Next sprint is now active.","success")):mi()}catch(i){f(i.message,"error")}return!1}function Pp(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" data-ritual-name="${_(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" data-ritual-name="${_(e.name)}" data-ritual-prompt="${_(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function Np(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${g(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Hp(i,e,t)}),M()}async function Hp(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return f("A note is required for this attestation.","error"),!1;try{await E.attestTicketRitual(t,n,s),f("Ritual attested!","success"),H(),await yn(n)}catch(i){f(i.message,"error")}return!1}async function Op(e,t){try{await E.attestTicketRitual(e,t),f("Ritual attested!","success"),await yn(t)}catch(n){f(n.message,"error")}}async function qp(e,t){try{await E.approveTicketRitual(e,t),f("Ritual approved!","success"),await yn(t)}catch(n){f(n.message,"error")}}function Fp(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Up(s,e,t)}),M()}async function Up(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await E.completeTicketGateRitual(t,n,s||null),f("Ritual completed!","success"),H(),await yn(n)}catch(i){f(i.message,"error")}return!1}const fr=["backlog","todo","in_progress","in_review","done","canceled"],hr=["no_priority","urgent","high","medium","low"],Gp=["task","bug","feature","chore","docs","tech_debt","epic"];let at=[],vr=Promise.resolve(),w={api:null,getIssues:()=>[],setIssues:()=>{},getMyIssues:()=>[],setMyIssues:()=>{},getCurrentDetailIssue:()=>null,setCurrentDetailIssue:()=>{},getLabels:()=>[],setLabels:()=>{},getCurrentTeam:()=>null,getCurrentDetailSprints:()=>[],closeAllDropdowns:()=>{},registerDropdownClickOutside:()=>{},setDropdownKeyHandler:()=>{},showToast:()=>{},getStatusIcon:()=>"",getPriorityIcon:()=>"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatAssigneeOptionLabel:e=>(e==null?void 0:e.name)||"",getAssigneeOptionList:()=>[],getAssigneeById:()=>null,getEstimateOptions:()=>[],renderAvatar:()=>"",renderIssueRow:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",updateSprintCacheForProject:()=>{},updateSprintBudgetBar:()=>{}};function zp(e){w={...w,...e}}async function br(e,t,n){var d,u;e.preventDefault(),w.closeAllDropdowns();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${fr.map((m,v)=>`
                <button class="dropdown-option" data-value="${m}" onclick="updateIssueField('${w.escapeJsString(n)}', 'status', '${m}')">
                    ${w.getStatusIcon(m)}
                    <span>${w.formatStatus(m)}</span>
                    <span class="dropdown-shortcut">${v+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${hr.map((m,v)=>`
                <button class="dropdown-option" data-value="${m}" onclick="updateIssueField('${w.escapeJsString(n)}', 'priority', '${m}')">
                    ${w.getPriorityIcon(m)}
                    <span>${w.formatPriority(m)}</span>
                    <span class="dropdown-shortcut">${v}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Gp.map(m=>`
                <button class="dropdown-option" data-value="${m}" onclick="updateIssueField('${w.escapeJsString(n)}', 'issue_type', '${m}')">
                    <span class="issue-type-badge type-${m}">${w.formatIssueType(m)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const m=w.getAssigneeOptionList();a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'assignee_id', null)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${m.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:m.map(({assignee:v,indent:y},b)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'assignee_id', '${w.escapeJsString(v.id)}')">
                    ${w.renderAvatar(v,"avatar-small")}
                    <span>${w.formatAssigneeOptionLabel(v,y)}</span>
                    ${b<9?`<span class="dropdown-shortcut">${b+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const m=document.querySelector(`.issue-row[data-issue-id="${n}"]`),v=(m==null?void 0:m.dataset.projectId)||((d=w.getCurrentDetailIssue())==null?void 0:d.project_id),y=w.getEstimateOptions(v);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${y.map((b,x)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'estimate', ${b.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${b.label}</span>
                    ${x<9?`<span class="dropdown-shortcut">${x}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const m=w.getIssues(),v=w.getMyIssues(),y=w.getCurrentDetailIssue(),b=m.find(ae=>ae.id===n)||v.find(ae=>ae.id===n)||y,x=new Set(((b==null?void 0:b.labels)||[]).map(ae=>ae.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const C=a.getBoundingClientRect();let j=i.bottom+4,O=i.left;O+C.width>window.innerWidth-8&&(O=i.right-C.width),j+C.height>window.innerHeight-8&&(j=i.top-C.height-4),a.style.top=`${j}px`,a.style.left=`${Math.max(8,O)}px`,w.registerDropdownClickOutside(a,{multiSelect:!0});let D=[];const U=w.getCurrentTeam();if(U)try{D=await w.api.getLabels(U.id)}catch(ae){console.error("Failed to load labels:",ae)}if(!a.parentNode)return;kr(a,n,D,x);const k=a.getBoundingClientRect();let W=i.bottom+4,Te=i.left;Te+k.width>window.innerWidth-8&&(Te=i.right-k.width),W+k.height>window.innerHeight-8&&(W=i.top-k.height-4),a.style.top=`${W}px`,a.style.left=`${Math.max(8,Te)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const m=w.getIssues(),v=w.getMyIssues(),y=w.getCurrentDetailIssue(),b=m.find(oe=>oe.id===n)||v.find(oe=>oe.id===n)||y,x=(b==null?void 0:b.project_id)||((u=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:u.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const C=a.getBoundingClientRect();let j=i.bottom+4,O=i.left;O+C.width>window.innerWidth-8&&(O=i.right-C.width),j+C.height>window.innerHeight-8&&(j=i.top-C.height-4),a.style.top=`${j}px`,a.style.left=`${Math.max(8,O)}px`,w.registerDropdownClickOutside(a);let D=[];if(x)try{D=await w.api.getSprints(x),w.updateSprintCacheForProject(x,D)}catch(oe){console.error("Failed to load sprints:",oe)}if(!a.parentNode)return;const U=D.filter(oe=>oe.status!=="completed"||oe.id===(b==null?void 0:b.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${U.map((oe,V)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'sprint_id', '${w.escapeJsString(oe.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${w.escapeHtml(oe.name)}${oe.status==="active"?" (Active)":""}</span>
                    ${V<9?`<span class="dropdown-shortcut">${V+1}</span>`:""}
                </button>
            `).join("")}
        `;const k=a.getBoundingClientRect();let W=i.bottom+4,Te=i.left;Te+k.width>window.innerWidth-8&&(Te=i.right-k.width),W+k.height>window.innerHeight-8&&(W=i.top-k.height-4),a.style.top=`${W}px`,a.style.left=`${Math.max(8,Te)}px`,a.classList.remove("dropdown-positioning");const ae=oe=>{const V=oe.key;if(V==="Escape"){w.closeAllDropdowns(),document.removeEventListener("keydown",ae),w.setDropdownKeyHandler(null);return}const Je=parseInt(V);if(isNaN(Je))return;const Pt=a.querySelectorAll(".dropdown-option");let ht=!1;Je===0?(wn(n,"sprint_id",null),ht=!0):Je>=1&&Je<Pt.length&&(Pt[Je].click(),ht=!0),ht&&(document.removeEventListener("keydown",ae),w.setDropdownKeyHandler(null))};w.setDropdownKeyHandler(ae),document.addEventListener("keydown",ae);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const o=a.getBoundingClientRect();let r=i.bottom+4,c=i.left;c+o.width>window.innerWidth-8&&(c=i.right-o.width),r+o.height>window.innerHeight-8&&(r=i.top-o.height-4),a.style.top=`${r}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const l=m=>{const v=m.key;if(v==="Escape"){w.closeAllDropdowns(),document.removeEventListener("keydown",l);return}const y=parseInt(v);if(isNaN(y))return;let b=!1;if(t==="status"&&y>=1&&y<=6)wn(n,"status",fr[y-1]),b=!0;else if(t==="priority"&&y>=0&&y<=4)wn(n,"priority",hr[y]),b=!0;else if(t==="estimate"){const x=w.getCurrentDetailIssue(),C=w.getEstimateOptions(x==null?void 0:x.project_id);y>=0&&y<C.length&&(wn(n,"estimate",C[y].value),b=!0)}b&&(document.removeEventListener("keydown",l),w.setDropdownKeyHandler(null))};w.setDropdownKeyHandler(l),document.addEventListener("keydown",l),w.registerDropdownClickOutside(a)}function yr(e,t,n){e.stopPropagation(),br(e,t,n)}function Kp(e,t,n){vr=vr.then(()=>wr(e,t,n))}async function wr(e,t,n){const s=w.getIssues(),i=w.getMyIssues(),a=w.getCurrentDetailIssue(),o=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),c=r.indexOf(t);let l;if(c>=0?l=r.filter(d=>d!==t):l=[...r,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const u=(await w.api.updateIssue(e,{label_ids:l})).labels||[],m=s.findIndex(x=>x.id===e);m!==-1&&(s[m].labels=u,w.setIssues([...s]));const v=i.findIndex(x=>x.id===e);v!==-1&&(i[v].labels=u,w.setMyIssues([...i])),(a==null?void 0:a.id)===e&&w.setCurrentDetailIssue({...a,labels:u});const y=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(y&&y.parentNode){const x=s.find(C=>C.id===e)||i.find(C=>C.id===e);x&&(y.outerHTML=w.renderIssueRow(x))}const b=document.querySelector(".property-labels-btn");b&&(b.innerHTML=u.length>0?u.map(x=>`
                    <span class="issue-label" style="background: ${w.sanitizeColor(x.color)}20; color: ${w.sanitizeColor(x.color)}">${w.escapeHtml(x.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(w.showToast("Failed to update labels","error"),n){const d=c>=0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}}}function kr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
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
    `}async function Wp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=w.getCurrentTeam();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await w.api.createLabel(s.id,{name:i}),o=await w.api.getLabels(s.id);w.setLabels(o),a!=null&&a.id&&await wr(e,a.id,null);const r=w.getIssues(),c=w.getMyIssues(),l=w.getCurrentDetailIssue(),d=r.find(m=>m.id===e)||c.find(m=>m.id===e)||l,u=new Set(((d==null?void 0:d.labels)||[]).map(m=>m.id));t&&kr(t,e,o,u),n.value=""}catch(a){w.showToast(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function os(){const e=document.getElementById("create-issue-labels-label");e&&(at.length===0?e.textContent="Labels":e.textContent=`Labels (${at.length})`)}function Hi(e){const t=w.getLabels();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=at.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${w.escapeJsString(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${w.sanitizeColor(n.color)}20; color: ${w.sanitizeColor(n.color)}">${w.escapeHtml(n.name)}</span>
                </button>
            `}).join("")}
    `}function Vp(e){const t=at.indexOf(e);t>=0?at.splice(t,1):at.push(e),os();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Hi(n)}async function Jp(){const e=w.getCurrentTeam();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await w.api.createLabel(e.id,{name:s}),a=await w.api.getLabels(e.id);w.setLabels(a),i!=null&&i.id&&!at.includes(i.id)&&at.push(i.id),os(),t&&Hi(t),n.value=""}catch(i){w.showToast(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function wn(e,t,n){var i;w.closeAllDropdowns();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await w.api.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=w.getIssues(),c=r.findIndex(m=>m.id===e);c!==-1&&(r[c]=o,w.setIssues([...r]));const l=w.getMyIssues(),d=l.findIndex(m=>m.id===e);d!==-1&&(l[d]=o,w.setMyIssues([...l]));const u=w.getCurrentDetailIssue();if((u==null?void 0:u.id)===e&&w.setCurrentDetailIssue(o),s&&s.parentNode){const m=r.find(v=>v.id===e)||l.find(v=>v.id===e)||o;if(m){s.outerHTML=w.renderIssueRow(m);const v=document.querySelector(`.issue-row[data-issue-id="${e}"]`);v&&(v.classList.add("updated"),setTimeout(()=>v.classList.remove("updated"),500))}}if(w.showToast("Issue updated","success"),t==="status"){const m=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(m)try{const y=(await w.api.getSprints(m)).find(b=>b.status==="active");w.updateSprintBudgetBar(y||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const m=document.getElementById("issue-detail-view");m&&!m.classList.contains("hidden")&&Zp(t,o)}}catch(a){w.showToast(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function Zp(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${w.getStatusIcon(t.status)}
            <span>${w.formatStatus(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${w.getPriorityIcon(t.priority)}
            <span>${w.formatPriority(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${w.formatIssueType(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?w.getAssigneeById(t.assignee_id):null,l=c?w.formatAssigneeName(c):null;r.innerHTML=l?`${w.renderAvatar(c,"avatar-small")}<span>${w.escapeHtml(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=w.getCurrentDetailSprints(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?w.escapeHtml(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${w.formatEstimate(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}const ot=new Map,$r=6e4,Oi=100;let ie=null,qi=null,Fi=null,kn=null,Er=!1;const Yp={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Xp={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Ir={api:null};let Ui={...Ir};function Qp(e={}){Ui={...Ir,...e},ie||(ie=document.createElement("div"),ie.className="issue-tooltip",ie.style.display="none",document.body.appendChild(ie),ie.addEventListener("mouseenter",()=>{clearTimeout(qi)}),ie.addEventListener("mouseleave",()=>{Tr()})),Er||(document.addEventListener("mouseover",em),document.addEventListener("mouseout",tm),Er=!0)}function em(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=nm(t);if(n){if(n===kn&&ie.style.display!=="none"){clearTimeout(qi);return}clearTimeout(Fi),Fi=setTimeout(()=>{sm(t,n)},200)}}function tm(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Fi),qi=setTimeout(()=>{Tr()},150))}function nm(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function sm(e,t){kn=t;const n=e.getBoundingClientRect();ie.style.left=`${n.left+window.scrollX}px`,ie.style.top=`${n.bottom+window.scrollY+8}px`,ie.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ie.style.display="block";try{const s=await am(t);if(kn!==t)return;om(s)}catch{if(kn!==t)return;ie.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Tr(){ie&&(ie.style.display="none"),kn=null}function im(){const e=Date.now();for(const[t,n]of ot.entries())e-n.timestamp>=$r&&ot.delete(t)}async function am(e){ot.size>Oi/2&&im();const t=ot.get(e);if(t&&Date.now()-t.timestamp<$r)return t.issue;if(!Ui.api)throw new Error("API not initialized");const n=await Ui.api.getIssueByIdentifier(e);if(ot.size>=Oi){const s=Array.from(ot.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Oi/2);for(const[a]of i)ot.delete(a)}return ot.set(e,{issue:n,timestamp:Date.now()}),n}function om(e){const t=Yp[e.status]||"#6b7280",n=Xp[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";ie.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${g(e.identifier)}</span>
            <span class="issue-tooltip-type">${g(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${g(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${rm(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${lm(e.priority)}</span>
        </div>
    `}function rm(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function lm(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}let rs=0;function _r(e){const t=qd();t&&(t.close(),Mo(null));const n=api.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Mo(a),a.onopen=()=>{console.log("WebSocket connected"),rs>0&&f("Live updates reconnected","success"),rs=0},a.onmessage=o=>{const r=JSON.parse(o.data);cm(r)},a.onclose=()=>{console.log("WebSocket disconnected"),rs++,rs===1&&f("Live updates disconnected. Reconnecting...","warning"),setTimeout(()=>{window.currentTeam&&window.currentTeam.id===e&&_r(e)},5e3)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function cm(e){var i,a,o,r,c,l,d;const{type:t,entity:n,data:s}=e;if(n==="issue"){if(t==="created"){const u=Fe(),m=u.findIndex(y=>y.id===s.id),v=u.findIndex(y=>y._isOptimistic&&y.title===s.title);if(!(m>=0))if(v>=0){const y=[...u];y[v]=s,Ue(y),N()==="issues"&&ze()}else Ue([s,...u]),N()==="issues"&&ze(),f(`New issue: ${s.identifier}`,"info");if(s.assignee_id===((i=ci())==null?void 0:i.id)){const y=Xn(),b=y.findIndex(C=>C.id===s.id),x=y.findIndex(C=>C._isOptimistic&&C.title===s.title);if(b===-1&&x===-1)gn([s,...y]),N()==="my-issues"&&fn();else if(x>=0){const C=[...y];C[x]=s,gn(C),N()==="my-issues"&&fn()}}N()==="my-issues"&&Ct(),N()==="board"?st():N()==="sprints"&&tt(),N()==="issue-detail"&&s.parent_id===((a=window.currentDetailIssue)==null?void 0:a.id)&&ee(window.currentDetailIssue.id,!1)}else if(t==="updated"){const u=Fe(),m=u.findIndex(b=>b.id===s.id);if(m>=0){const b=[...u];b[m]=s,Ue(b)}const v=Xn(),y=v.findIndex(b=>b.id===s.id);if(y>=0){const b=[...v];b[y]=s,gn(b)}if(N()==="issues")ze();else if(N()==="my-issues")fn(),Ct();else if(N()==="board")st();else if(N()==="sprints")tt();else if(N()==="issue-detail"){const b=document.getElementById("issue-detail-content");b&&b.dataset.issueId===s.id&&ee(s.id)}}else t==="deleted"&&(Ue(Fe().filter(u=>u.id!==s.id)),gn(Xn().filter(u=>u.id!==s.id)),N()==="issues"?ze():N()==="my-issues"?(fn(),Ct()):N()==="board"?st():N()==="sprints"&&tt(),f(`Issue ${s.identifier} deleted`,"info"));N()==="issue-detail"&&((o=window.currentDetailIssue)==null?void 0:o.id)===s.id&&(f(`Issue ${s.identifier} was deleted`,"warning"),F("my-issues"))}else if(n==="comment")N()==="my-issues"&&Ct(),N()==="issue-detail"&&((r=window.currentDetailIssue)==null?void 0:r.id)===s.issue_id&&ee(s.issue_id,!1);else if(n==="relation"){if(N()==="issue-detail"){const u=(c=window.currentDetailIssue)==null?void 0:c.id;u&&(s.source_issue_id===u||s.target_issue_id===u)&&ee(u,!1)}}else n==="attestation"?(N()==="gate-approvals"&&typeof window.loadGateApprovals=="function"&&window.loadGateApprovals(),N()==="issue-detail"&&((l=window.currentDetailIssue)==null?void 0:l.id)===s.issue_id&&ee(s.issue_id,!1)):n==="activity"&&(N()==="my-issues"&&Ct(),N()==="issue-detail"&&((d=window.currentDetailIssue)==null?void 0:d.id)===s.issue_id&&ee(s.issue_id,!1))}window.currentTeam=null;let $n=[],En=[],ls=[];function xr(){const e=document.getElementById("hamburger-btn");e&&e.setAttribute("aria-expanded",String(document.body.classList.contains("sidebar-open")))}function dm(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),xr(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Sr);n&&n.focus()}}}function cs(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),xr(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}const Sr='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(Sr);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&cs()});function Cr(e){if(!e)return"";if(typeof marked<"u"&&typeof DOMPurify<"u")try{marked.setOptions({breaks:!0,gfm:!0});const n=marked.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return DOMPurify.sanitize(n,{FORCE_BODY:!0})}catch(t){console.error("Markdown parsing error:",t)}return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const Lr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];ap({beforeNavigate:()=>{co(),window._onRitualsChanged=null,window.currentDetailIssue=null,window.currentDetailSprints=null,cs()},detailRoute:e=>e[0]==="epic"&&e[1]?(Pi(e[1]),!0):e[0]==="issue"&&e[1]?(as(e[1]),!0):e[0]==="document"&&e[1]?(mm(e[1]),!0):e[0]==="sprint"&&e[1]?(Wd(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(ro(e[1]),!0):!1,detailPopstate:e=>e.epicId?(Ni(e.epicId,!1),!0):e.issueId?(ee(e.issueId,!1),!0):e.identifier?(as(e.identifier),!0):e.documentId?(Ie(e.documentId,!1),!0):e.sprintId?(pi(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=ut();e&&Y().some(t=>t.id===e)&&dt(e)},issueNavigate:e=>as(e),epicNavigate:e=>Pi(e)}),ip({"my-issues":()=>{ni(),Ct()},"gate-approvals":()=>{bm()},issues:()=>{Su(),tp(),xu().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),zo())}}),er().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}ft()})},epics:()=>{cp()},board:()=>{hi()},projects:()=>{he().then(dn)},sprints:()=>{Ro()},rituals:()=>{mr()},documents:()=>{It()},team:()=>{Js(),no(),Gn()},settings:()=>{ei(),Gs(),Ap()}}),document.addEventListener("DOMContentLoaded",async()=>{if(um(),pm(),Qp({api}),lp(),api.getToken())try{const e=await api.getMe();Dd(e),window.currentUser=e,await Ar()}catch{api.logout(),Hn()}else Hn()});function um(){const e=document.getElementById("theme-toggle");if(!e)return;const n=localStorage.getItem("chaotic_theme")==="light";document.body.classList.toggle("theme-light",n),e.checked=n,e.addEventListener("change",()=>{const s=e.checked;document.body.classList.toggle("theme-light",s),localStorage.setItem("chaotic_theme",s?"light":"dark")})}function pm(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");Bi(s)}}})}async function Ar(){Ra(),Fa(),await Un();const e=Za();if(e.length===0&&!_o()){oi();return}e.length>0&&await Ws(e[0],!0)}window.initApp=Ar,window.viewIssue=ee,window.viewIssueByPath=as,window.viewEpic=Ni,window.viewEpicByPath=Pi,window.handleDescriptionClick=lr,window.toggleTicketRituals=dr,window.toggleSection=cr,window.toggleCreateIssueOptions=Em,window.connectWebSocket=_r,window.buildAssignees=hm,window.updateAssigneeFilter=vm,window.loadLabels=Mm,window.resetOnboarding=li,window.viewDocument=Ie;async function mm(e){try{await Ie(e,!1)}catch{F("documents",!1)}}function gm(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function fm(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function hm(){const e=_t().map(gm),t=Nc().map(fm);$n=[...e,...t]}function ds(e){return e&&$n.find(t=>t.id===e)||null}function jt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Gi(e,t=!1){const n=g(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${g(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function us(){const e=$n.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));$n.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=$n.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function vm(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;us().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Gi(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}async function bm(){if(!window.currentTeam)return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=[];for(const n of Y()){const s=await api.getPendingApprovals(n.id);t.push(...s)}Nd(t),ym()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${g(t.message)}</p></div>`}}}function ym(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=Pd();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No pending approvals</h3>
                <p>All rituals have been completed. Nice work!</p>
            </div>
        `;return}const n=c=>c.pending_approvals||[],s=c=>l=>{const d=n(l).filter(c);return d.length>0?{...l,_filteredApprovals:d}:null},i=t.map(s(c=>c.approval_mode==="gate"&&c.limbo_type==="claim")).filter(Boolean),a=t.map(s(c=>c.approval_mode==="gate"&&c.limbo_type==="close")).filter(Boolean),o=t.map(s(c=>c.approval_mode==="review")).filter(Boolean);let r="";i.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${i.map(zi).join("")}
                </div>
            </div>
        `),a.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${a.map(zi).join("")}
                </div>
            </div>
        `),o.length>0&&(r+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${o.map(zi).join("")}
                </div>
            </div>
        `),e.innerHTML=r,e.querySelectorAll(".gate-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;bo(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset;yo(l.ritualId,l.issueId,l.ritualName,l.ritualPrompt,l.issueIdentifier,l.issueTitle,l.requestedBy,l.requestedAt,l.attestationNote)})})}function zi(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${g(s.requested_by_name)}</strong>${s.requested_at?` (${Rm(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note"><em>${g(s.attestation_note)}</em></div>`:"",c=i?"review-approve-btn":"gate-approve-btn",l=i?"Approve":"Complete",d=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
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
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${I(e.issue_id)}')" class="gate-issue-link">
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
    `}function Rt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function wm(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ps(e,t="avatar-small"){const n=jt(e)||"User",s=e==null?void 0:e.avatar_url;return s?wm(s)?`<img class="${t} avatar-img" src="${_(s)}" alt="${_(n)}">`:`<div class="${t} avatar-emoji">${g(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function km(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function $m(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=_t().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:km(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${_(l.handle)}">
                <span class="mention-name">${g(l.name)}</span>
                <span class="mention-handle">@${g(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.handle,u=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),m=e.value.slice(i);e.value=u+m,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}function Ki(e=null){var s;const t=e||((s=document.getElementById("project-filter"))==null?void 0:s.value);ls=[];const n=Y().map(i=>`
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
                            ${Lr.map(i=>`<option value="${i.id}">${i.label}</option>`).join("")}
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
                            ${We("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${Ke("no_priority")}
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
    `,M(),os(),document.getElementById("create-issue-title").focus()}function Em(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Im(e){const t=Lr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function Tm(e,t){const n=Y().find(s=>s.id===t);ls=[],document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                            ${We("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${Ke("no_priority")}
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
                <button type="button" class="btn btn-primary" onclick="handleCreateSubIssue('${I(e)}', '${I(t)}')">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,M(),os(),document.getElementById("create-issue-title").focus()}async function _m(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null;if(!n){f("Please enter a title","error");return}try{const d=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:ls,parent_id:e});H(),f(`Created sub-issue ${d.identifier}`,"success"),ee(e)}catch(d){f(`Failed to create sub-issue: ${d.message}`,"error")}}async function xm(e,t){var a,o;en();const s=t.currentTarget.getBoundingClientRect(),i=document.createElement("div");if(i.className="inline-dropdown dropdown-positioning",i.style.top=`${s.top-8}px`,i.style.left=`${s.left}px`,i.style.transform="translateY(-100%)",i.style.animation="none",e==="status"){const r=document.getElementById("create-issue-status").value;i.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('status', '${c}', '${Re(c)}')">
                    ${We(c)}
                    <span>${Re(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const r=document.getElementById("create-issue-priority").value;i.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('priority', '${c}', '${Se(c)}')">
                    ${Ke(c)}
                    <span>${Se(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const r=document.getElementById("create-issue-type").value;i.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('type', '${c}', '${Rt(c)}')">
                    <span class="issue-type-badge type-${c}">${Rt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!window.currentTeam)i.innerHTML='<div class="dropdown-header">Select a team first</div>';else{if(En.length===0)try{En=await api.getLabels(window.currentTeam.id)}catch(r){console.error("Failed to load labels:",r)}Hi(i),document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Pn(i,{multiSelect:!0});return}else if(e==="assignee"){const r=document.getElementById("create-issue-assignee").value,c=us();i.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${r?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:l,indent:d})=>{const u=jt(l)||"User";return`
                <button class="dropdown-option ${l.id===r?"selected":""}" onclick="setCreateIssueField('assignee', '${I(l.id)}', '${I(u)}')">
                    ${ps(l,"avatar-small")}
                    <span>${Gi(l,d)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const r=document.getElementById("create-issue-estimate").value,c=(a=document.getElementById("create-issue-project"))==null?void 0:a.value,l=zn(c);i.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(d=>{const u=d.value===null?"":String(d.value);return`
                <button class="dropdown-option ${u===r?"selected":""}" onclick="setCreateIssueField('estimate', '${u}', '${d.value?d.label:"Estimate"}')">
                    <span>${d.label}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const r=document.getElementById("create-issue-sprint").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value;if(!c)i.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const d=(await api.getSprints(c)).filter(u=>u.status!=="completed");i.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${r?"":"selected"}" onclick="setCreateIssueField('sprint', '', 'Sprint')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${d.map(u=>`
                        <button class="dropdown-option ${u.id===r?"selected":""}" onclick="setCreateIssueField('sprint', '${I(u.id)}', '${I(u.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${g(u.name)}${u.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{i.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Pn(i)}function Sm(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Cm(e,t,n){if(document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,e==="status"){const s=document.querySelector(".toolbar-btn:first-child");s.innerHTML=`${We(t)}<span id="create-issue-status-label">${n}</span>`}else if(e==="priority"){const s=document.querySelectorAll(".toolbar-btn")[1];s.innerHTML=`${Ke(t)}<span id="create-issue-priority-label">${n}</span>`}else if(e==="type"){const s=document.getElementById("create-issue-type-btn");s&&(s.innerHTML=`<span class="issue-type-badge type-${t}">${Rt(t)}</span><span id="create-issue-type-label">${n}</span>`)}en()}async function Br({keepOpen:e=!1}={}){var b,x;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null,d=((b=document.getElementById("create-issue-sprint"))==null?void 0:b.value)||null,u=(x=document.getElementById("create-issue-due-date"))==null?void 0:x.value,m=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){f("Please select a project","error");return}if(!n){f("Please enter a title","error");return}const v=document.getElementById("btn-create-issue"),y=document.getElementById("btn-create-and-new");v&&(v.disabled=!0),y&&(y.disabled=!0);try{const C=await api.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:d,label_ids:ls,due_date:m});f(`Created ${C.identifier}`,"success"),N()==="issues"?ft():N()==="my-issues"&&ni(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(H(),ee(C.id))}catch(C){f(`Failed to create issue: ${C.message}`,"error")}finally{v&&(v.disabled=!1),y&&(y.disabled=!1)}}async function Lm(){await Br({keepOpen:!1})}async function Am(){await Br({keepOpen:!0})}async function Dr(e){try{const t=await api.getIssue(e),n=await api.getSprints(t.project_id),i=(window.getEstimateOptions?window.getEstimateOptions(t.project_id):[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}]).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${g(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${I(e)}')">
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
        `,M()}catch(t){f(`Failed to load issue: ${t.message}`,"error")}}async function Bm(e,t){e.preventDefault();try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await api.updateIssue(t,l),H(),await ee(t),f("Issue updated!","success")}catch(n){f(`Failed to update issue: ${n.message}`,"error")}return!1}async function Dm(e){if(confirm("Are you sure you want to delete this issue?"))try{await api.deleteIssue(e),await ft(),await he(),F("issues"),f("Issue deleted!","success")}catch(t){f(`Failed to delete issue: ${t.message}`,"error")}}async function Mm(){if(window.currentTeam)try{En=await api.getLabels(window.currentTeam.id)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("keydown",Sp({closeModal:H,closeSidebar:cs,navigateTo:F,showCreateIssueModal:Ki,showKeyboardShortcutsHelp:Mr,isModalOpen:Ns,focusSearch:()=>{F("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function Mr(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,M()}Ed([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>F("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>F("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>F("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>F("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>F("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>F("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>F("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{F("issues"),setTimeout(Ki,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{F("projects"),setTimeout(Xs,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{F("documents"),setTimeout(Us,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Ys(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{F("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{F("team"),setTimeout(Zs,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Mr(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>li(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Os(),category:"Account"}]),Sd({getCurrentUser:ci,getCurrentTeam:()=>window.currentTeam,renderIssueRow:Le,formatActivityText:ji,formatActivityActor:Mi,getActivityIcon:Di,navigateToIssueByIdentifier:Bi,viewDocument:Ie}),cu({api,showToast:f,getProjects:Y,getProjectFromUrl:ut,setGlobalProjectSelection:dt,updateUrlWithProject:Qn,escapeHtml:g,escapeAttr:_,escapeJsString:I,formatPriority:Se}),yu({getIssues:Fe,getAssigneeById:ds,formatAssigneeName:jt,formatEstimate:ln,getSprintCache:Fd,formatStatus:Re,formatPriority:Se,formatIssueType:Rt,escapeHtml:g,escapeAttr:_,escapeJsString:I,sanitizeColor:ge,renderAvatar:ps,getAssigneeOptionList:us,getGroupByValue:sr}),zp({api,getIssues:Fe,setIssues:Ue,getMyIssues:Xn,setMyIssues:gn,getCurrentDetailIssue:()=>window.currentDetailIssue,setCurrentDetailIssue:e=>{window.currentDetailIssue=e},getLabels:()=>En,setLabels:e=>{En=e},getCurrentTeam:()=>window.currentTeam,getCurrentDetailSprints:()=>window.currentDetailSprints,closeAllDropdowns:en,registerDropdownClickOutside:Pn,setDropdownKeyHandler:dc,showToast:f,getStatusIcon:We,getPriorityIcon:Ke,formatStatus:Re,formatPriority:Se,formatIssueType:Rt,formatEstimate:ln,formatAssigneeName:jt,formatAssigneeOptionLabel:Gi,getAssigneeOptionList:us,getAssigneeById:ds,getEstimateOptions:zn,renderAvatar:ps,renderIssueRow:Le,escapeHtml:g,escapeAttr:_,escapeJsString:I,sanitizeColor:ge,updateSprintCacheForProject:ru,updateSprintBudgetBar:Ii}),pp({api,getCurrentView:N,showToast:f,showModal:M,closeModal:H,navigateTo:F,getProjects:Y,getMembers:_t,getAssigneeById:ds,formatAssigneeName:jt,formatStatus:Re,formatPriority:Se,formatIssueType:Rt,formatEstimate:ln,formatTimeAgo:wt,getStatusIcon:We,getPriorityIcon:Ke,renderMarkdown:Cr,renderAvatar:ps,escapeHtml:g,escapeAttr:_,escapeJsString:I,sanitizeColor:ge,showDetailDropdown:yr,setupMentionAutocomplete:$m,renderTicketRitualActions:Pp}),xp({api,getCurrentView:N,showToast:f,navigateTo:F,getProjects:Y,getAssigneeById:ds,formatAssigneeName:jt,formatStatus:Re,formatPriority:Se,formatEstimate:ln,formatTimeAgo:wt,getStatusIcon:We,getPriorityIcon:Ke,escapeHtml:g,escapeAttr:_,escapeJsString:I,sanitizeColor:ge});const jm=M;window.showModal=function(){jm(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",Cp({isModalOpen:Ns,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Eo,openCommandPalette:Id,closeCommandPalette:Yn}));function Rm(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}async function Pm(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){f("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=Y().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ue([r,...Fe()]),ze();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=Fe(),u=d.findIndex(m=>m.id===a);u!==-1&&(d[u]=l,Ue(d)),ze(),he(),f("Issue created!","success")}catch(l){Ue(Fe().filter(d=>d.id!==a)),ze(),f(`Failed to create issue: ${l.message}`,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}document.addEventListener("keydown",Lp({getCurrentView:N,getSelectedIndex:Rd,setSelectedIndex:Do,viewIssue:ee,showEditIssueModal:Dr,isModalOpen:Ns,isCommandPaletteOpen:Eo})),Object.assign(window,{escapeHtml:g,renderMarkdown:Cr,handleLogin:Ha,handleSignup:Oa,showLogin:Pa,showSignup:Na,logout:Os,navigateTo:F,handleRoute:ar,closeModal:H,toggleSidebar:dm,closeSidebar:cs,getProjectFromUrl:ut,updateUrlWithProject:Qn,toggleTeamDropdown:Vs,toggleUserDropdown:Xa,showCreateTeamModal:Ys,showEditTeamModal:io,showInviteModal:Zs,showCreateIssueModal:Ki,loadIssues:ft,filterIssues:Ve,filterMyIssues:To,debounceSearch:np,handleQuickCreate:Pm,onProjectFilterChange:tr,updateGroupBy:nr,toggleGroup:Tu,viewIssue:ee,showEditIssueModal:Dr,editDescription:bp,handleDescriptionClick:lr,setDescriptionEditorMode:yp,updateIssueField:wn,handleUpdateDescription:wp,handleUpdateIssue:Bm,deleteIssue:Dm,navigateToIssueByIdentifier:Bi,handleCreateIssueNew:Lm,handleCreateIssueAndNew:Am,setCreateIssueField:Cm,toggleCreateIssueDropdown:xm,toggleCreateIssueLabelSelection:Vp,createLabelForCreateIssue:Jp,createLabelFromDropdown:Wp,handleAddComment:vp,showCreateSubIssueModal:Tm,handleCreateSubIssue:_m,showAddRelationModal:kp,handleAddRelation:Tp,deleteRelation:_p,searchIssuesToRelate:$p,selectIssueForRelation:Ep,clearSelectedRelation:Ip,showDetailDropdown:yr,showInlineDropdown:br,toggleIssueLabel:Kp,toggleMultiSelect:_u,updateStatusFilter:bi,updatePriorityFilter:wi,updateLabelFilter:$i,clearStatusFilter:yi,clearPriorityFilter:ki,clearLabelFilter:Ei,toggleFilterMenu:Au,toggleDisplayMenu:Bu,showFilterCategoryOptions:$e,setProjectFilter:Zo,clearProjectFilter:qu,toggleStatusOption:Fu,clearStatusFilterNew:Uu,togglePriorityOption:Gu,clearPriorityFilterNew:zu,setTypeFilter:Yo,clearTypeFilter:Ku,setAssigneeFilter:Xo,clearAssigneeFilter:Wu,setSprintFilter:Qo,clearSprintFilter:Vu,toggleLabelOption:Ju,clearLabelFilterNew:Zu,setSort:Xu,setGroupBy:Qu,clearAllFilters:ep,updateFilterChips:ve,updateFilterCountBadge:be,loadBoard:vi,onBoardProjectChange:du,handleDragStart:uu,handleDragEnd:pu,handleDragOver:mu,handleDragLeave:gu,handleCardDragOver:fu,handleCardDragLeave:hu,handleDrop:vu,handleCardDrop:bu,loadSprints:tt,onSprintProjectChange:Gd,viewSprint:pi,showEditBudgetModal:Xd,handleUpdateBudget:Qd,showCloseSprintConfirmation:eu,completeSprint:tu,loadLimboStatus:ns,showLimboDetailsModal:mi,showCreateDocumentModal:Us,showCreateProjectModal:Xs,onEpicsProjectChange:dp,loadRitualsView:mr,onRitualsProjectChange:gr,switchRitualsTab:Dp,approveRitual:Mp,completeGateRitual:jp,toggleSection:cr,toggleTicketRituals:dr,attestTicketRitual:Op,approveTicketRitual:qp,showCompleteTicketRitualModal:Fp,showAttestTicketRitualModal:Np,showCreateApiKeyModal:wo,copyApiKey:ko,revokeApiKey:$o,showCreateAgentModal:Ja,applyIssueTemplate:Im,updateCreateIssueProject:Sm}),window.marked=R,window.DOMPurify=ja,console.log("Chaotic frontend loaded via Vite")})();
